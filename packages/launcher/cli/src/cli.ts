import { Cli } from 'clipanion';
import { DevCommand } from './dev';

const args = process.argv.slice(2);

const cli = new Cli({
  binaryLabel: 'LowCoder CLI',
  binaryName: 'low-coder-cli',
  binaryVersion: '1.0.0',
});

cli.register(DevCommand);
cli.runExit(args);
