provider "aws" {
  region = "eu-west-2"
  default_tags {
    tags = {
      Project = "Maldi"
    }
  }
}

provider "aws" {
  alias  = "acm"
  region = "us-east-1"
  default_tags {
    tags = {
      Project = "Maldi"
    }
  }
}

locals {
  domain = "maldi.lfm.dev"
}

terraform {
  backend "s3" {
    bucket = "lfm-terraform"
    key    = "maldi/terraform.state"
    region = "eu-west-2"
  }
}

resource "aws_s3_bucket" "maldi_lfm_dev" {
  bucket = local.domain
}

resource "aws_s3_bucket_versioning" "maldi_lfm_dev" {
  bucket = aws_s3_bucket.maldi_lfm_dev.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_website_configuration" "maldi_lfm_dev" {
  bucket = aws_s3_bucket.maldi_lfm_dev.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_acl" "maldi_lfm_dev" {
  bucket = aws_s3_bucket.maldi_lfm_dev.id
  acl    = "private"
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    sid       = "CloudfrontReadGetObject"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.maldi_lfm_dev.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "maldi_lfm_dev" {
  bucket = aws_s3_bucket.maldi_lfm_dev.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

### Certification

resource "aws_acm_certificate" "cert" {
  provider          = aws.acm
  domain_name       = local.domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}


### Cloudfront

resource "aws_cloudfront_distribution" "s3_distribution" {
  depends_on = [
    aws_s3_bucket.maldi_lfm_dev
  ]

  origin {
    domain_name = aws_s3_bucket.maldi_lfm_dev.bucket_regional_domain_name
    origin_id   = local.domain

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [local.domain]

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
    ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    target_origin_id = local.domain

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"

    min_ttl     = 0
    default_ttl = 86400
    max_ttl     = 31536000
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"

  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    error_caching_min_ttl = 10
    response_page_path    = "/index.html"
  }

  wait_for_deployment = false
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "access-identity-${local.domain}.s3.amazonaws.com"
}


### Policies

resource "aws_iam_policy" "s3_malid_write_policy" {
  name = "maldi_s3_write_access"
  path = "/"
  policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : [
            "s3:ListBucket"
          ],
          "Effect" : "Allow",
          "Resource" : "arn:aws:s3:::${aws_s3_bucket.maldi_lfm_dev.id}"
        },
        {
          "Action" : [
            "s3:DeleteObject",
            "s3:PutObject",
            "s3:PutObjectAcl"
          ],
          "Effect" : "Allow",
          "Resource" : "arn:aws:s3:::${aws_s3_bucket.maldi_lfm_dev.id}/*"
        }
      ]
    }
  )
}

resource "aws_iam_policy" "cloudfront_create_invalidation" {
  name = "maldi_cloudfront_create_invalidation"
  path = "/"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
          "cloudfront:CreateInvalidation"
        ],
        "Resource" : aws_cloudfront_distribution.s3_distribution.arn
      }
    ]
  })
}
