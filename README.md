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

Run the following command to setup the cli

```shell script
yarn setup-cli
```

### Usage

```shell script
maldi --help
Usage: maldi [options]

Options:
      --version    Show version number                      [boolean]
  -f, --file       Path to file being analysed              [string] [required]
  -t, --threshold  Maximum allowed difference from peak     [number] [required] [default: 0]
  -o, --output     Output file name                         [string] [default: "results"]
  -h               Show help                                [boolean]
```

To analyse a file called `input.csv` with a threshold of `0`, then output the results to a file called `results.csv`:

```shell script
maldi -f input.csv
```

To analyse a file called `input.csv` with a threshold of `100`, then output the results to a file called `result_file.csv`:

```shell script
maldi -f input.csv -o result_file -t 100
```
