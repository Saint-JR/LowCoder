import { startServer } from '@low-coder/dev-server';
import { Command } from 'clipanion';

export class DevCommand extends Command {
  static paths: string[][] = [['dev']];

  async execute(): Promise<number | void> {
    Object.assign(process.env, {
      DEVSERVER: 'true',
    });

    startServer();
  }
}
