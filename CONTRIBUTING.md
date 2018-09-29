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

1. **Set up your development environment** by [installing Node.js][4].

1. **Install project dependencies** by running `npm install` in the project folder from the command line.

1. **Update the documentation** (`README.md`, `CONTRIBUTING.md`) to reflect the changes you plan to make.

1. **Write or update tests** for the changes you are going to make.

    - The tests are located in the `/test` folder. Each schema has one test file where all its tests are located. For example, the tests for the Language schema are located in `test/Language.test.js`.

    - Tests are run using [Jasmine][9] for Node.js. See the [Jasmine documentation for Node.js][10] for more information on how to write tests in Jasmine.

    - The tests use the [`ajv` library][7] to validate the schemas against the JSON Schema format, and validate the sample data against the DLx schema. See the [`ajv` documentation][7] for more information on how to use this library to validate schemas.

    - The file `schemas.test.js` checks that each schema is a valid JSON Schema. You should not need to change this file.

    - Each schema should be validated against *both* valid and invalid sample data. Each test file contains some valid sample data in the `data` variable near the top of the file. Update this sample data to match your proposed changes.

    - The first test in each file validates the sample data against its schema using `ajv`. You should not need to change this test.

    - The remaining tests in each file check that the sample data does *not* validate against the schema if the data is formatted incorrectly. Each test generally checks one attribute in the schema. Update these tests as needed.

1. **Make changes to the schema(s)**.

    - The schemas are located in `schemas/yaml`. Do not update the schemas in `schemas/json`, or your changes will be overwritten.

    - The schemas use the [JSON Schema format][5] to describe how data should be structured. See the [latest version of the JSON Schema][11] for more details.

    - Use the file `schemas/template.yml` as a guideline / model for other schemas.

    - Update the `"description"` field of any schemas that you change, as needed.

    - Increment the version number of any schemas that you update, following [semantic versioning][6].

        - `major`: When the schema is changed in a way that makes it incompatible with previous versions

        - `minor`: When new properties are added, or optional properties removed, or other changes are made to the schema that are backwards-compatible

        - `patch`: Typos, changes to descriptions, minor bugs and hotfixes, or other changes that do not address the functionality of the schema

1. **Run the tests** using `npm test` in the command line. Fix any issues that arise.

1. **Double-check the documentation** (`README.md`, `CONTRIBUTING.md`) to make sure it still reflects the changes you made.

1. **Get the latest changes from the `master` branch** and resolve any conflicts that arise. Run the tests again.

1. **Run the build script** by running `npm run build` from the command line. This does the following steps for you automatically:

    1. **Generate the JSON versions of the schemas** (`npm run convert`)

    1. **Regenerate the documentation website** (`npm run docs`)

    1. **Run the tests again** (`npm run test`)

1. **Open a pull request**. See GitHub's advice on [How to write the perfect pull request][12].

1. **Address any changes requested by the reviewer**.

1. **Wait for a maintainer to merge your changes!**

_These steps are for maintainers only:_

1. **Increment the version number** of the branch by running `npm version {major|minor|patch} -m "Your commit message"` from the command line.

    - Include a note closing the associated issue (e.g. `closes #167`).

1. **Run upload script**: `npm run upload`

1. **Open a pull request** into the `master` branch, and include the release notes in the comments.

1. **Squash & merge** the PR into the `master` branch.

1. **Create a release**

    - Title: vX.X.X

    - List the changes for each schema separately under its own heading. General project changes get their own heading as well.

    - Each change should have one of the following labels:

        - CHANGE: (breaking) changes
        - DEP: changes to dependencies
        - DEV: changes to development environment
        - DOCS: changes to docs
        - FIX: bug fixes
        - IMPROVE: code enhancements
        - NEW: new features
        - REMOVE: removed features
        - TEST: changes to tests

1. **Publish to npm**: `npm publish`

1. **Write a blog post** about the changes

[1]: https://github.com/digitallinguistics/digitallinguistics.github.io/blob/master/CONTRIBUTING.md
[2]: https://github.com/digitallinguistics/digitallinguistics.github.io/blob/master/CODE_OF_CONDUCT.md
[3]: https://digitallinguistics.github.io/spec/
[4]: https://nodejs.org/en/
[5]: http://json-schema.org/
[6]: http://semver.org/
[7]: https://www.npmjs.com/package/ajv
[8]: https://github.com/digitallinguistics/spec/issues/new
[9]: https://jasmine.github.io/
[10]: https://jasmine.github.io/setup/nodejs.html
[11]: http://json-schema.org/latest/json-schema-validation.html
[12]: https://blog.github.com/2015-01-21-how-to-write-the-perfect-pull-request/
