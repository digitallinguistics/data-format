# Contributing Guidelines

:star2: Thank you for contributing to DLx! :star2:

Below is some information on how you can contribute to the DLx data format, and how to get started.

* [General Guidelines for DLx Projects][1]

* [Code of Conduct][2]

## Questions?

Just have a question you need answered? Consider [joining the DLx Slack channel][3], where you can chat with other users and developers about various DLx projects.

You can also ask a question by [opening an issue in this repository][4].

## Suggesting Features

Have a feature you'd like to suggest? The project would especially benefit from the following types of suggestions (other suggestions are fine too):

- Is there some part of the specification that could be structured more simply, without losing any information?

- Is there a use case, property, or other piece of information that linguists commonly use that hasn't been included in the specification?

- Are there any parts of the specification that are unclear or could be made clearer?

- Is there a type of linguistic object or data that isn't included in the specification?

- Can the documentation be improved?

To suggest a feature, simply [open an issue in the GitHub repository for this project][4], and explain your suggestion. You should provide an example in JSON of how your suggestion would work, and if possible a valid [JSON Schema][5] describing the new format.

If you're suggesting an improvement to the documentation, please include the original wording and how you would change it, or at least a short description of what needs to be changed.

When suggesting a feature, think about whether this would require a major, minor, or patch update to the specification (following [semantic versioning principles][6]), and include that in the comments for your issue.

## Reporting Bugs & Other Issues

Found a problem in the specification? [Open an issue on GitHub][4] describing the problem and its severity. Does the issue affect just a single schema, or several schemas? Does the issue have the potential to cause errors in applications using data in this format? Include as much detail as possible.

## Making Pull Requests

If you'd like to make a pull request and contribute to the code for the DLx specification, first open an issue with information about the feature or fix you'd like to make, following the guidelines in the [suggesting features](#suggesting-features) section above. It is a good idea to have your feature request or bug fix request approved by a maintainer before writing any code.

Once an issue is made and has been assigned to you, you can follow the steps in the [maintainer's guidelines][7] to prepare your pull request (not all of the steps may be applicable).

For this project in particular, you will want to include the following steps:

1. Fork the repository and clone it to your computer.

1. Install project dependencies by running `npm install` in the project folder from the command line.

1. Increment the version number in the `version` field of `package.json`.

1. Increment the version number(s) of the particular schemas you'll be updating, if any.

1. Update any existing documentation (e.g. the readme, or the `description` property of a schema) so that it reflects the changes you'll be making.

1. In the `/test` folder, find (or create) the test file for the schema(s) you made changes to, and update the tests with valid (and invalid) sample data to test against your schema. The tests use the [`ajv` library][7] to validate data against schemas, and are run in Node.

1. Make any necessary changes to the schemas. If adding a new schema, place it in the `/schemas` folder, and name the file with the name of the object, in SnakeCase.

1. Run `npm test` from the command line to check that the schemas are valid and that your new / updated tests pass.

1. Update any documentation again, if needed.

1. Update the documentation by running `npm run docs` from the command line.

1. Add commit message that closes the related issue (e.g. `closes #167`).

1. Commit and push

1. Open a pull request into the `master` branch, and include the release notes in the comments.

1. Address any changes requested by the code reviewer in your pull request.

[1]: https://github.com/digitallinguistics/digitallinguistics.github.io/blob/master/CONTRIBUTING.md
[2]: https://github.com/digitallinguistics/digitallinguistics.github.io/blob/master/CODE_OF_CONDUCT.md
[3]: https://slack.digitallinguistics.io/
[4]: https://github.com/digitallinguistics/spec/issues/
[5]: http://json-schema.org/
[6]: http://semver.org/
[7]: https://www.npmjs.com/package/ajv
