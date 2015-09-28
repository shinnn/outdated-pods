/*!
 * outdated-pods | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/outdated-pods
*/
const outdatedPodRegex = require('outdated-pod-regex');
const stripAnsi = require('strip-ansi');

module.exports = function outdatedPods(log) {
  'use strict';

  if (typeof log !== 'string') {
    throw new TypeError(
      String(log) +
      ' is not a string. Expected a log of `pod outdated` command.'
    );
  }

  log = stripAnsi(log);

  const regex = outdatedPodRegex();
  const results = [];
  let matched;

  while ((matched = regex.exec(log)) !== null) {
    results.push({
      name: matched[1],
      current: matched[2],
      wanted: matched[3],
      latest: matched[4]
    });
  }

  return results;
};
