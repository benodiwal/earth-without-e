import { exec } from "child_process";
import { updatePackageJson } from "../utils";
import path from 'path';

export const setup = async (name: string) => {
    console.log(`Setting up project named as ${name}`);
    const repoUrl = 'https://github.com/probablyArth/typescript-nodejs-zod.git';

    exec(`git clone ${repoUrl} ${name}`, async (error, stdout, _) => {
        if (error) {
            console.error(`Error cloning repository ${error.message}`);
            return;
        }
        console.log(`Repository cloned successfully: ${stdout}`);
        await updatePackageJson(path.resolve(name));
        console.log('Project setup complete.');
    });
}
