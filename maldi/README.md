[![Tests](https://github.com/lewis785/maldi-end-group-analysis/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/lewis785/maldi-end-group-analysis/actions/workflows/test.yml)

# maldi-end-group-analysis

## Prerequisites

### Volta

This repository uses [Volta](https://volta.sh) to manage its `Node` and `Yarn` versions.

To install Volta run this command

```shell script
curl https://get.volta.sh | bash
```

---

## Command Line Interface (CLI)

### Setup

Install Globally

```shell script
npm install maldi-end-group-analysis -g
```

### Usage

Show all commands:

```shell script
maldi --help

Usage: maldi <command> [options]

Commands:
  maldi analyse [file] [options]  Run maldi end group analysis
  maldi example-file [format]     Generate example import file

Options:
  --version  Show version number                             [boolean]

Examples:
  maldi example-file csv                          Generate an example csv file
  maldi analyse input.csv -t 10 -o test-result    Run analysis on file

```

Show options for `analyse` command:

```shell script
maldi analyse --help

Usage: maldi [options]

Options:
      --version    Show version number                      [boolean]
  -f, --file       Path to file being analysed              [string] [required]
  -t, --threshold  Maximum allowed difference from peak     [number] [required] [default: 0]
  -o, --output     Output file name                         [string] [default: "results"]
  --format     Format of file that should be outputted      [string] [choices: "csv"] [default: "csv"]
```

To analyse a file called `input.csv` with a threshold of `0`, then output the results to a file called `results.csv`:

```shell script
maldi analyse input.csv
```

To analyse a file called `input.csv` with a threshold of `100`, then output the results to a file called `result_file.csv`:

```shell script
maldi analyse input.csv -o result_file -t 100
```

## Development

### Setup CLI

```shell script
yarn install
yarn build
yarn setup-cli
```
