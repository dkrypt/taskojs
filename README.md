![Build Status](https://github.com/dkrypt/taskojs/actions/workflows/main.yml/badge.svg)
# Tasko

## Prerequisites
This project requires NodeJS(version 8 or later) and NPM. [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) are really easy to install and work with. To make sure you have them available on your machine, try running the following commands:
```shell
$ npm -v && node -v
7.19.1
v12.22.2
```

## Table of Content
- [Tasko](#tasko)
    - [Prerequisites](#prerequisites)
    - [Table of Content](#table-of-content)
    - [Overview](#overview)
    - [Getting Started](#getting-started)
    - [Developer Guide](#developer-guide)
    - [Authors](#authors)
## Overview
Tasko is a CLI based task management utility. Once installed, you can use Tasko from your OS terminal. It gives you capability to add, delete and update tasks. Works on current day's tasks.

## Getting Started

### Installing
Tasko is provided as a NodeJS module. This works seamlessly, once installed globally.

To install Tasko:
```sh
$ npm install tasko -g
```

### Usage
Tasko provides various capabilities to manage your daily tasks. For usage instructions run 
```shell
$ tasko help

  Usage: tasko [command] [args]

   a, add       : Add new task
   d, done      : Mark task as done
   l, list      : List today's tasks
   e, export [duration] : Export tasks to .txt file
   del, delete  : Delete task
   h, help      : Show help
   v, version: Show version for tasko
```

## Developer Guide
For developers, who intend to extend this project or use it in their *awseome* projects, get started with cloning the source repository.
```sh
$ git clone https://github.com/dkrypt/tasko
$ cd tasko
$ npm install
```

## Authors

- Deepak Kumar - *initial work* - [dkrypt](https://github.com/dkrypt)