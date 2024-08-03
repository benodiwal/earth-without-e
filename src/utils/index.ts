import fs from 'fs';
import path from 'path';
import readline from 'readline';

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

    console.log('\n\x1b[33m%s\x1b[0m', `cd ${projectPath}`);
    console.log('\x1b[36m%s\x1b[0m', 'npm install\n');
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update package.json: ${error.message}`);
    } else {
      throw new Error('Failed to update package.json: Unknown error');
    }
  }
};
