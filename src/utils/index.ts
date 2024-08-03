import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { exec } from 'child_process';

export const updatePackageJson = async (projectPath: string) => {
  const packageJsonPath = path.join(projectPath, 'package.json');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const prompt = (question: string, defaultValue: string = ''): Promise<string> => {
      return new Promise((resolve) => {
        rl.question(`${question} (${defaultValue}): `, (answer) => {
          resolve(answer || defaultValue);
        });
      });
    };

    packageJson.name = await prompt('Project name', packageJson?.name);
    packageJson.version = await prompt('Project version', packageJson?.version);
    packageJson.description = await prompt('Project description');
    packageJson.author = await prompt('Author');
    
    const repository = await prompt('Repository URL');
    packageJson.repository = repository ? { type: 'git', url: repository } : undefined;
    
    packageJson.homepage = await prompt('Homepage URL');
    
    const bugs = await prompt('Bugs URL');
    packageJson.bugs = bugs ? { url: bugs } : undefined;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
    rl.close();

    console.log('\nExecuting additional setup steps...');

    const commands = [
      `cd "${projectPath}"`,
      'rm -rf .git',
      'git init',
      'cp .env.example .env',
      'npm install'
    ].join(' && ');

    console.log(`\n\x1b[33mExecuting: ${commands}\x1b[0m`);

    exec(commands, (error _, stderr) => {
      if (error) {
        console.error(`\x1b[31mError: ${error.message}\x1b[0m`);
        return;
      }
      if (stderr) console.error(`\x1b[31m${stderr}\x1b[0m`);
      console.log('\n\x1b[32mSetup completed successfully!\x1b[0m');
    });
    
  } catch (error) {
    if (error instanceof Error) {
      console.error(`\x1b[31mFailed to complete setup: ${error.message}\x1b[0m`);
    } else {
      console.error('\x1b[31mFailed to complete setup: Unknown error\x1b[0m');
    }
  }
};
