# satackey/action-js-inline
Run JavaScript instead of shell script in GitHub Actions.

## Example
```yaml
- name: Output current branch name & date
  # To use latest action, specify "release-master" instead of "v0.0.3"
  uses: satackey/action-js-inline@v0.0.3
  id: getdata
  with:
    # Edit the following line to install packages required to run your script.
    required-packages: axios
    script: |
      const core = require('@actions/core')
      const axios = require('axios')

      // branch
      const ref = process.env.GITHUB_REF // refs/heads/master
      const branch = ref.split('/').slice(-1)[0] // refs/heads/master → master
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

- `required-packages` optional  
  Line or space separated package names required to execute the scirpt.
  > Info: The following packages are automatically installed even if you do not write them.
  > - [`@actions/core`](https://github.com/actions/toolkit/tree/master/packages/core)
  > - [`@actions/exec`](https://github.com/actions/toolkit/tree/master/packages/exec)
  > - [`@actions/github`](https://github.com/actions/toolkit/tree/master/packages/github)
  > - [`actions-exec-listener`](https://github.com/satackey/actions-exec-listener)

- `script` **Required**
    The JavaScript snippet to be executed. The [await](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await) operator is supported.

## Contribution
PRs are accepted.

If you are having trouble or feature request, [post new issue](https://github.com/satackey/action-js-inline/issues/new).

<!-- ## Another Example -->
