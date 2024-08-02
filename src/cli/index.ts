import yargs from 'yargs';

const showHelpAndExit = () => {
  yargs.showHelp();
  process.exit(0);
};

const argv = yargs
  .usage('Usage: earth-without-e [options] <name>')
  .command(
    'setup <name>',
    'Setup Project',
    (yargs) => {
      return yargs.positional('name', {
        describe: 'Name of the project',
        type: 'string',
      });
    },
    (argv) => {
      console.log(`Setting up project named: ${argv.name}`);
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
