# kyanite

![version](https://img.shields.io/github/package-json/v/xVyre/kyanite) ![requires node.js >= 14](https://img.shields.io/badge/requires%20node.js-%3E%3D14-yellowgreen) ![license mit](https://img.shields.io/github/license/xVyre/kyanite)

A simple SHA256 hash brute-forcer written in Node.js

## Installation

1. Clone the repo

```sh
git clone https://github.com/xVyre/kyanite.git
```

2. Install NPM packages

```sh
cd kyanite && npm install
```

## Usage

```
Usage: npm start -- HASH [OPTIONS]

Options:
      --version  Show version number                                   [boolean]
  -t, --threads  Number of threads to use                  [number] [default: os.cpus().length]
  -h, --help     Show help                                             [boolean]
```

_Or_:

Run the main file

```sh
npm start
```

A few general notes:

- There are no hard-coded limits, so be sure not to spawn too many threads and end up freezing your computer
