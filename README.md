# outdated-pods

[![NPM version](https://img.shields.io/npm/v/outdated-pods.svg)](https://www.npmjs.com/package/outdated-pods)
[![Build Status](https://travis-ci.org/shinnn/outdated-pods.svg?branch=master)](https://travis-ci.org/shinnn/outdated-pods)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/outdated-pods.svg)](https://coveralls.io/r/shinnn/outdated-pods)
[![devDependency Status](https://david-dm.org/shinnn/outdated-pods.svg)](https://david-dm.org/shinnn/outdated-pods)
[![devDependency Status](https://david-dm.org/shinnn/outdated-pods/dev-status.svg)](https://david-dm.org/shinnn/outdated-pods#info=devDependencies)

Extract outdated [Pod](https://cocoapods.org/) information from the output of [`pod outdated`](https://guides.cocoapods.org/terminal/commands.html#pod_outdated) command

```javascript
const outdatedPods = require('outdated-pods');

const stdout = `
- Foo 4.12.1 -> 4.12.1 (latest version 4.15.0)
- baz+qux (unused) -> 2.8.3 (latest version 2.9.0)
`;

outdatedPods(stdout)
/* =>
  [
    {
      name: 'Foo',
      current: '4.12.1',
      wanted: '4.12.1',
      latest: '4.15.0'
    },
    {
      name: 'baz+qux',
      current: '(unused)',
      wanted: '2.8.3',
      latest: '2.9.0'
    }
  ]
*/
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install outdated-pods
```

## API

### outdatedPods(*str*)

*str*: `String`  
Return: `Array` of plain objects

It parses a string of the log generated with [`pod install`](https://guides.cocoapods.org/terminal/commands.html#pod_install) command, and returns an array of objects that shows which Pod is outdated. Each of the object has these four properties:

* *name*: `String` (Pod name)
* *current*: `String` (currently installed version)
* *wanted*: `String` (the latest version according to the version specified in the `Podfile`)
* *latest*: `String` (the very latest version)

It automatically strips [ANSI escape codes](https://wikipedia.org/wiki/ANSI_escape_code) before parsing a string.

```javascript
const outdatedPods = ('outdated-pods');

outdatedPods('\u001b[32m- Foo 4.12.1 -> 4.12.1 (latest version 4.15.0)\u001b[39m');
//=> [{name: 'Foo', current: '4.12.1', wanted: '4.12.1', latest: '4.15.0'}]
```

## License

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
