# kyanite
![Logo](https://repository-images.githubusercontent.com/315076796/79043a00-42eb-11eb-8bf2-7920cd8efc66)

![Version](https://img.shields.io/github/package-json/v/xVyre/kyanite)
![Requires node.js](https://img.shields.io/badge/requires%20node.js-%3E%3D14-yellowgreen)
![License](https://img.shields.io/github/license/xVyre/kyanite)

A simple SHA256 hash brute-forcer using worker threads, written in Node.js

## Installation

1. Clone the repo

```sh
git clone https://github.com/0xVR/kyanite.git
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

- Kyanite wasn't made for practical usage, it's more of a fun project
- As such, there are no hard-coded limits, so be sure not to spawn too many threads and end up freezing your computer
- If the program gets to the point where it has tried more than roughly 1.1x10^17 combinations, it switches to using BigInts. You may notice a relevant decrease in performance
