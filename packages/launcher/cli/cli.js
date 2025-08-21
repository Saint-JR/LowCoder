#!/usr/bin/env node

require('ts-node').register({
  transpileOnly: true,
  project: __dirname,
});

require('./src');
