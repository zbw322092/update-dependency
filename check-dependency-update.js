const childProcessExec = require('child_process').exec;
const util = require('util');
const path = require('path');

const exec = util.promisify(childProcessExec);
const packageJsonPath = path.join(process.cwd(), './package.json');

checkPackageJsonUpdate();

async function checkPackageJsonUpdate() {
  const packageDiff = await exec(`git diff ORIG_HEAD HEAD --exit-code -- ${packageJsonPath}`);

  if (packageDiff.stderr) {
    throw new Error(packageDiff.stderr);
  }
  const updates = packageDiff.stdout;

  console.log('updates: ', updates);
}