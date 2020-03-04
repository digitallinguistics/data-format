# Contributing Guidelines

* To **learn about this project**, check out the [documentation][docs].

* To **ask a question**, **report a bug**, or **request changes to the schemas**, [open an issue on GitHub][issue].

* To **contribute additions/changes to this project**, follow the [Pull Request Checklist][checklist].

## Suggesting Changes

The project would especially benefit from the following types of suggestions:

- Is there some part of the specification that could be structured more simply, without losing any information?

- Is there a use case, property, or other piece of information that linguists commonly use that hasn't been included in the specification?

- Are there any parts of the specification that are unclear or could be made clearer?

- Is there a type of linguistic object or data that isn't included in the specification?

- Can the documentation be improved?

## Development Steps

- [ ] **Fork the repository** and clone it to your computer.

- [ ] **Create an issue branch** for the changes you are making. You should only make changes on this branch for the issue you are currently working on.

- [ ] **Install [Node.js](https://nodejs.org/en/)**. Use the version specified in the `engines` field of the `package.json` file. If you need to manage multiple versions of Node.js on your computer, install [nvm](https://github.com/creationix/nvm) or [nvm windows](https://github.com/coreybutler/nvm-windows).

- [ ] **Install project dependencies** by running `npm install` from the command line in the project root.

## Scripts

The following scripts can be run from the command line:

- `npm run build`: convert YAML > JSON
- `npm run convert`: convert the YAML schemas to JSON
- `npm run docs`: regenerate the project documentation
- `npm test`: run tests
- `npm run upload`: upload the schemas to the DLx CDN

[checklist]: ./PULL_REQUEST_TEMPLATE.md
[docs]:      https://format.digitallinguistics.io/
[issue]:     https://github.com/digitallinguistics/spec/issues/new
