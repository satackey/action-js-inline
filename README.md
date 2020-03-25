# Execute JavaScript snippet inline
Use JavaScript instead of shell script.

## Example
```yaml
- name: Output current branch name
  
  uses: satackey/action-js-online@v0.0.1
  with:
    # required-packages: axios
    script: |
      const core = require('@actions/core')

      const ref = process.env.GITHUB_REF
      const branch = ref.split('/').slice(-1)[0]

      core.setOutput('branch', branch)
```

## Inputs
- `package-manager` required, default: `npm`  
  The package manager used to install the required packages.
  Either `npm` or `yarn`.

- `required-package` optinal, default: `@actions/core @actions/exec @actions/github`  
  Required package to run `script`

- `script` **Required**
    The JavaScript snippet to be executed.

## Contribution
PRs are accepted.

If you are having trouble or future request, [post new issue](https://github.com/satackey/action-js-inline/issues/new).

## Another Example