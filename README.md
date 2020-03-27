# satackey/action-js-inline
Run JavaScript instead of shell script in GitHub Actions.

## Example
```yaml
- name: Output current branch name & date
  uses: satackey/action-js-inline@v0.0.2
  id: getdata
  with:
    # Edit the following line to install packages required to run your script.
    required-packages: axios
    script: |
      const core = require('@actions/core')
      const axios = require('axios')

      // branch
      const ref = process.env.GITHUB_REF
      const branch = ref.split('/').slice(-1)[0]
      console.log(`branch: ${branch}`)
      core.setOutput('branch', branch)

      // date

      const dateResponse = await axios('https://ntp-a1.nict.go.jp/cgi-bin/json')
      /* {
          "id": "ntp-a1.nict.go.jp",
          "it": 0.000,
          "st": 1585285722.922,
          "leap": 36,
          "next": 1483228800,
          "step": 1
      } */
      const date = new Date(dateResponse.data.st)
      console.log(`date: ${date}`)
      core.setOutput('date', date)

# You can use datas as ${{ steps.getdata.outputs.branch }} and ${{ steps.getdata.outputs.date }}
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