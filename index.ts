import * as core from '@actions/core'
import exec from 'actions-exec-wrapper'

// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor

type PackageManager = 'npm' | 'yarn'
function assertIsPackageManager(manager: string): asserts manager is PackageManager {
  if (manager !== 'npm' && manager !== 'yarn') {
    throw new Error(`Specified node package manager is ${manager}, neither npm nor yarn.`)
  }
}

const installPackages = async (manager: PackageManager, packages: string[]) => {
  let command = ''
  if (manager === 'npm') {
    command = 'npm install'
  } else {
    command = 'yarn add'
  }

  if (packages.length < 1) {
    console.log('There is no package to install.')
    return
  }

  core.startGroup(`${command} ${packages.join(' ')}`)
  await exec.exec(command, packages, {
    cwd: __dirname,
  })
  core.endGroup()
}

const runScript = async (script: string) => {
  const args: { [key: string]: any} = {
    Buffer,
    __dirname,
    __filename,
    console,
    exports,
    module,
    process,
    require,
    TextDecoder,
    TextEncoder,
    URL,
    URLSearchParams,
    WebAssembly,
  }
  const scriptFunc = new AsyncFunction(Object.keys(args), script)
  return await scriptFunc(...Object.values(args))
}

const main = async () => {
  const packageManager = core.getInput('package-manager', { required: true })
  assertIsPackageManager(packageManager)
  const requiredPackages = core.getInput('required-packages')
    .split(' ') // 空白で分ける
    .filter(pkg => pkg !== '') // 空文字は消す
  const script = core.getInput('script', { required: true })

  console.log(script)
  await installPackages(packageManager, requiredPackages)
  await runScript(script)
}

main().catch(e => {
  console.error(e)
  core.setFailed(`An error occurred: ${e.message || JSON.stringify(e)}`)
})
