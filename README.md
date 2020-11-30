# kyanite
![version v1.0.0](https://img.shields.io/github/package-json/v/xVyre/kyanite) ![requires node.js >= 14](https://img.shields.io/badge/requires%20node.js-%3E%3D14-yellowgreen) ![license mit](https://img.shields.io/github/license/xVyre/kyanite)

A simple SHA256 hash brute-forcer written in Node.js

## Installation

1. Clone the repo
```sh
git clone https://github.com/xVyre/kyanite.git
```
2. Install NPM packages
```sh
npm install
```

## Usage

Run the main file
```sh
node index.js
```
A few general notes:
- It only tries combinations that are up to 8 characters long
- Sometimes, it may be better to use less threads instead of more, due to the order in which the combinations are generated
- There are no hard-coded limits, so be sure not to spawn too many threads and end up freezing your computer