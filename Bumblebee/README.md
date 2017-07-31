# Bumblebee

Bumblebee => 大黄蜂：transform/parser，将 swagger 文档解析成 Hulk 配置文件的 node 脚本

### Install

```bash
$ nrm use mi
$ npm install @mi/bumblebee --save-dev
```

### Usage

```bash
$ ./node_modules/.bin/bumblebee --help

  Usage: bumblebee [options] <file ...>

  @mi/Bumblebee: A node script for Hulk.

  Options:
    -V, --version        output the version number
    -S, --source <file>  Your swagger config file
    -T, --target <file>  Your Hulk config: .huckrc.js
    -h, --help           output usage information
```

> example: --target 可以省略，默认为项目根目录下的 .hulkrc.js ，这里需要和 @mi/hulk 一致

```bash
$ ./node_modules/.bin/bumblebee -S ./swagger.json
```
