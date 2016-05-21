const test = require('tape');
const obj2args = require('../');

test('basic obj', t => {
  t.plan(1);

  const args = obj2args({
    a: 1,
    b: 2
  });

  t.equal(args, '-a 1 -b 2');
});

test('if string, just return it', t => {
  t.plan(1);

  const args = obj2args('-a blah');

  t.equal(args, '-a blah');
});

test('boolean', t => {
  t.plan(1);

  const args = obj2args({
    d: true
  });

  t.equal(args, '-d');
});

test('if key longer than one character, use long form', t => {
  t.plan(1);

  const args = obj2args({
    test: 1,
    b: 2
  });

  t.equal(args, '--test 1 -b 2');
});

test('if value is array, output twice', t => {
  t.plan(1);

  const args = obj2args({
    a: [1, 2]
  });

  t.equal(args, '-a 1 -a 2');
});

test('if value is object, iterate over it', t => {
  t.plan(1);

  const args = obj2args({
    a: {
      test: 'a'
    }
  });

  t.equal(args, '-a test=a');
});

test('if value has space, add quotes', t => {
  t.plan(1);

  const args = obj2args({
    a: 'test value'
  });

  t.equal(args, '-a "test value"');
});

test('real example', t => {
  t.plan(1);

  const args = obj2args({
    d: true,
    port: 8000,
    e: {
      VIRTUAL_HOST: 'example.com',
      NODE_ENV: 'production'
    },
    'log-driver': 'awslogs',
    'log-opt': {
      'awslogs-group': 'production',
      'awslogs-stream': 'app'
    }
  });
  t.equal(args, '-d --port 8000 -e VIRTUAL_HOST=example.com -e NODE_ENV=production --log-driver awslogs --log-opt awslogs-group=production --log-opt awslogs-stream=app');
});
