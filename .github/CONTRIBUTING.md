# Contributing Guidelines

:star2: Thank you for contributing to DLx! :star2:

Below is some information on how you can contribute to the DLx data format project, whatever your level of technical expertise.

## Quick Links

[Open an Issue][8] | [User Documentation][3] | [Pull Requests](#contributing-code--changes-to-the-schemas) | [DLx Contributing Guidelines][1] | [Code of Conduct][2]

## Contents

* [General Guidelines for DLx Projects](#general-guidelines-for-dlx-projects)
* [Questions?](#questions)
* [Suggesting Features](#suggesting-features)
* [Reporting Bugs & Other Issues](#reporting-bugs--other-issues)
* [Contributing Code / Changes to Schemas](#contributing-code--changes-to-the-schemas)
* [GitHub Flow / Branching Model](#branching-model)

## General Guidelines for DLx Projects

Here are some general guidelines that apply to all DLx projects:

* [Code of Conduct][2]
* [Contributing Guidelines][1]

## Questions?

Check out the [user documentation][3].

You can also ask a question by [opening an issue in this repository][8].

## Reporting Bugs & Other Issues

Found a problem in the specification? [Open an issue on GitHub][8] describing the problem and its severity. Does the issue affect just a single schema, or several schemas? Does the issue have the potential to cause errors in applications using data in this format? Include as much detail as possible.

## Suggesting Features

Have a feature you'd like to suggest? The project would especially benefit from the following types of suggestions (other suggestions are fine too):

  - Is there some part of the specification that could be structured more simply, without losing any information?

  - Is there a use case, property, or other piece of information that linguists commonly use that hasn't been included in the specification?

  - Are there any parts of the specification that are unclear or could be made clearer?

  - Is there a type of linguistic object or data that isn't included in the specification?

  - Can the documentation be improved?

To suggest a feature, simply [open an issue in the GitHub repository for this project][8], and explain your suggestion. If you are able, consider providing an example in JSON of how your suggestion would work, and if possible a valid [JSON Schema][5] describing the new format.

If you're suggesting an improvement to the documentation, please include the original wording and how you would change it, or at least a short description of what needs to be changed.

When suggesting a feature, think about whether this would require a major, minor, or patch update to the specification (following [semantic versioning principles][6]), and include that in the comments for your issue.

## Contributing Code / Changes to the Schemas

If you'd like to contribute changes to the code or the schemas in the repository, follow these steps:

1. **[Open an issue][8]** with information about the feature, fix, or change you'd like to make. Follow the guidelines in the [Suggesting Features](#suggesting-features) section above.

    **Note:** It is a good idea to wait until your suggested change is approved by a maintainer before writing any code.

1. **Fork the repository** and clone it to your computer.

1. **Create an issue branch** for the particular issue you are addressing. You should only make changes to the code that are directly relevant to this issue.

1. **(Optional) Open a pull request** to track your changes as you work. The pull request will have a simplified version of this checklist that you can follow while working on your code. You will need to make at least one small change before you can open a pull request.

1. **Set up your development environment** by [installing Node.js][4]. Use the latest LTS release.

1. **Install project dependencies** by running `npm install` in the project folder from the command line.

1. **Update project dependencies** by running `npm outdated` in the project folder from the command line.

1. **Update the documentation** (`README.md`, `CONTRIBUTING.md`) to reflect the changes you plan to make.

1. **Write or update tests** for the changes you are going to make.

    - Make sure that your tests fail before writing other code.

    - The tests are located in the `/test` folder. The file `schemas.test.js` checks that all the example data in the schemas is valid against its schema. Other tests only need to be added to check for issues that cannot be checked using the example data. Example data can be added or updated as necessary.

    - Tests are run using [Jasmine][9] for Node.js. See the [Jasmine documentation for Node.js][10] for more information on how to write tests in Jasmine.

    - The tests use the [`ajv` library][7] to validate the schemas against the JSON Schema format, and validate the sample data against the DLx schema. See the [`ajv` documentation][7] for more information on how to use this library to validate schemas.

    - Schemas do not have to be tested against invalid sample data, unless testing for specific issues that have arisen in the past, or common errors that developers are likely to make.

1. **Make changes to the schema(s)**.

    - The schemas are located in `schemas/yaml`. Do not update the schemas in `schemas/json`, or your changes will be overwritten.

    - The schemas use the [JSON Schema format][5] to describe how data should be structured. See the [latest version of the JSON Schema][11] for more details.

    - Update the `"description"` field of any schemas that you change, as needed.

    - Increment the version number of any schemas that you update, following [semantic versioning][6].

        - `major`: When the schema is changed in a way that makes it incompatible with previous versions

        - `minor`: When new properties are added, or optional properties removed, or other changes are made to the schema that are backwards-compatible

        - `patch`: Typos, changes to descriptions, minor bugs and hotfixes, or other changes that do not address the functionality of the schema

1. **Increment the versions** of affected schemas if you didn't in the last step

1. **Run the tests** using `npm test` in the command line. Fix any issues that arise. If you find an issue that is unrelated to the one you are working on, open a new issue for it.

1. **Double-check the documentation** (`README.md`, `CONTRIBUTING.md`) to make sure it still reflects the changes you made.

1. **Get the latest changes from the `master` branch** and resolve any conflicts that arise. Run the tests again.

1. **Run the build script** by running `npm run build` from the command line. This does the following steps for you automatically:

    1. **Generate the JSON versions of the schemas** (`npm run convert`)

    1. **Regenerate the documentation website** (`npm run docs`)

    1. **Run the tests again** (`npm run test`)

1. **Check the documentation for the changes you made** (`/docs`)

1. **Open a pull request** from your issue branch into the `master` branch of the DLx repository. See GitHub's advice on [How to write the perfect pull request][12].

    - While working on your pull request, you should write `[ci skip]` in each of your commit messages to skip automated testing, until you are ready to test your code.

1. **Address any changes requested by the reviewer**

1. **Wait for a maintainer to merge your changes**

_These steps are for maintainers only:_

1. **Write the release note** for the pull request

1. **Squash & merge** the PR into the `master` branch

    - Title: `LABEL: description (#000)`
    - Description
    - Changelog: `LABEL: description (closes #000)`

        - CHANGE: (breaking) changes
        - DEP: changes to dependencies
        - DEV: changes to development environment
        - DOCS: changes to docs
        - FIX: bug fixes
        - IMPROVE: code enhancements
        - NEW: new features
        - REMOVE: removed features
        - TEST: changes to tests

1. **Increment the version number** of the `master` branch by running `npm version {major|minor|patch}` from the command line, and commit the change. Do not include a commit message (it will default to the version number instead).

1. **Create a GitHub release** when the necessary features are ready. This will trigger Travis CI to run the upload script and publish to npm.

    - Title: vX.X.X

    - Description: High-level overview of the changes

    - Changelog:

        - List the changes for each schema separately under its own heading. General project changes get their own heading as well.

        - `LABEL: description (#000)`

    - Compile the list of changes from each of the commits on the master branch

1. **Write a blog post** about the changes (for major/minor updates only)

## Branching Model

This project uses the following branching model:

* The `master` branch is always production-ready

* Each issue receives its own branch

* Each issue branch is tested thoroughly and must be production-ready before being merged

* Issue branches are merged directly into the `master` branch

* The `master` branch is periodically tagged for a release and GitHub release notes made, and the code published to npm at that point

* Releases are managed using GitHub milestones to track when all the relevant issues are completed, and the `master` branch is ready for publishing on npm

(If development needs to happen simultaneously on minor changes / hotfixes and major breaking changes, it may be necessary to switch to a release branch model.)

[1]: https://github.com/digitallinguistics/digitallinguistics.github.io/blob/master/CONTRIBUTING.md
[2]: https://github.com/digitallinguistics/digitallinguistics.github.io/blob/master/CODE_OF_CONDUCT.md
[3]: https://spec.digitallinguistics.io/
[4]: https://nodejs.org/en/
[5]: http://json-schema.org/
[6]: http://semver.org/
[7]: https://www.npmjs.com/package/ajv
[8]: https://github.com/digitallinguistics/spec/issues/new
[9]: https://jasmine.github.io/
[10]: https://jasmine.github.io/setup/nodejs.html
[11]: http://json-schema.org/latest/json-schema-validation.html
[12]: https://blog.github.com/2015-01-21-how-to-write-the-perfect-pull-request/
