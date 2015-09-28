'use strong';

const outdatedPods = require('.');
const test = require('tape');

const fixture = `
Updating spec repo \`master\`
Updating spec repo \`outdated-pod-regex\`
Analyzing dependencies
The following pod updates are available:
- Foo 4.12.1 -> 4.12.1 (latest version 4.15.0)
- \u001b[32mbaz+qux (unused) -> 2.8.3 (latest version 2.9.0)\u001b[39m
`;

test('outdatedPods()', t => {
  t.plan(5);

  t.equal(outdatedPods.name, 'outdatedPods', 'should have a function name.');

  t.deepEqual(
    outdatedPods(fixture),
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
    ],
    'should extract the information of outdated Pods from a string.'
  );

  t.deepEqual(
    outdatedPods('foo'),
    [],
    'should return an empty array when it cannot find any information of outdated Pods.'
  );

  t.throws(
    () => outdatedPods(1),
    /TypeError.*1 is not a string\. Expected a log of `pod outdated` command\./,
    'should throw a type error when it takes a non-string argument.'
  );

  t.throws(
    () => outdatedPods(),
    /TypeError.*undefined is not a string\. Expected a log of `pod outdated` command\./,
    'should throw a type error when it takes no arguments.'
  );
});
