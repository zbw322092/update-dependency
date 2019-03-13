const childProcessExec = require('child_process').exec;
const util = require('util');
const path = require('path');
const chalk = require('chalk');

const exec = util.promisify(childProcessExec);
const packageJsonPath = path.join(process.cwd(), './package.json');

checkPackageJsonUpdate();

const depsRegx = /art-lib-common|art-lib-react|art-lib-utils|art-server-mock|art-webpack/g;

async function checkPackageJsonUpdate() {
  try {
    const gitCommand = `git diff ORIG_HEAD HEAD -- ${packageJsonPath}`;
    const packageDiff = await exec(gitCommand);
    const updates = packageDiff.stdout;
    if (!depsRegx.test(updates)) { return; }
  
    console.log(`
      ${chalk.blue('package.json git diff:')}
      ${updates}
      ${chalk.blue('art packages have updates, please check it and execute ')}${chalk.green.bold('yarn install')}${chalk.blue(' when necessary')}
    `);
  } catch (err) {
    console.log('error: ', err);
  }

}