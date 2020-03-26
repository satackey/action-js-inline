# Execute JavaScript snippet inline
Use JavaScript instead of shell script.

## Example
```yaml
- name: Output current branch name & date
  uses: satackey/action-js-online@v0.0.1
  id: output
  with:
    required-packages: axios
    script: |
      const core = require('@actions/core')
      const axios = require('axios')

      # branch
      const ref = process.env.GITHUB_REF
      const branch = ref.split('/').slice(-1)[0]
      console.log(`branch: ${branch}`)
      core.setOutput('branch', branch)

      # date
      const date = await axios('https://ntp-a1.nict.go.jp/cgi-bin/time?TZ=GMT')
      console.log(`date: ${date}`)
      core.setOutput('date', date)


```

## Inputs
- `package-manager` required, default: `npm`  
  The package manager used to install the required packages.
  Either `npm` or `yarn`.

- `required-package` optinal
  Required package to run `script`.
  > Info: The following packages are automatically installed even if you do not write them.
  > - [`@actions/core`](https://github.com/actions/toolkit/tree/master/packages/core)
  > - [`@actions/exec`](https://github.com/actions/toolkit/tree/master/packages/exec)
  > - [`@actions/github`](https://github.com/actions/toolkit/tree/master/packages/github)
  > - [`actions-exec-listener`](https://github.com/satackey/actions-exec-listener)


- `script` **Required**
    The JavaScript snippet to be executed.

## Contribution
PRs are accepted.

If you are having trouble or future request, [post new issue](https://github.com/satackey/action-js-inline/issues/new).

<!-- ## Another Example -->