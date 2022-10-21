provider "aws" {
  region = "eu-west-2"
  default_tags {
    tags = {
      Project = "Maldi"
    }
  }
}

terraform {
  backend "s3" {
    bucket = "lfm-terraform"
    key    = "maldi/terraform.state"
    region = "eu-west-2"
  }
}

resource "aws_s3_bucket" "maldi_lfm_dev" {
  bucket = "maldi.lfm.dev"
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

  acl = "public-read"
}

resource "aws_s3_bucket_policy" "maldi_lfm_dev" {
  bucket = aws_s3_bucket.maldi_lfm_dev.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource = [
          "${aws_s3_bucket.maldi_lfm_dev.arn}/*",
        ]
      },
    ]
  })
}
