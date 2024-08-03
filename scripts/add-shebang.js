const fs = require('fs');
const path = require('path');

const executablePath = path.resolve(__dirname, '../dist/index.js');

fs.readFile(executablePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading executable file:', err);
    return;
  }

  if (!data.startsWith('#!/usr/bin/env node')) {
    const shebangLine = '#!/usr/bin/env node\n';
    const updatedContents = shebangLine + data;

    fs.writeFile(executablePath, updatedContents, 'utf8', (err) => {
      if (err) {
        console.error('Error writing executable file:', err);
      } else {
        console.log('Shebang line added to the executable file.');
      }
    });
  } else {
    console.log('Shebang line already present in the executable file.');
  }
});
