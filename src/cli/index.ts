import yargs from 'yargs';
import { setup } from '../setup';

const showHelpAndExit = () => {
  yargs.showHelp();
  process.exit(0);
};

const argv = yargs
  .usage('Usage: earth-without-e [options] <path>')
  .command(
    'setup <path>',
    'Setup Project',
    (yargs) => {
      return yargs.positional('path', {
        describe: 'Path of the project',
        type: 'string',
      });
    },
    (argv) => {
      if (!argv.path) {
        console.log("Please provide a path for the project");
        process.exit(1);
      }
      setup(argv.path);
    }
  )
  .option('h', {
    alias: 'help',
    describe: 'Show help',
    type: 'boolean',
  })
  .help('h')
  .version('1.0.0')
  .alias('v', 'version')
  .demandCommand(1, 'Please provide a command')
  .fail((msg, err, yargs) => {
    if (err) throw err;
    console.error('Error:', msg);
    yargs.showHelp();
    process.exit(1);
  })
  .argv;

export const handleCommands = async () => {
  if (argv.h) {
    showHelpAndExit();
  }
};

handleCommands();
