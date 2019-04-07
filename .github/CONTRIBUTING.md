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

## Scripts

The following scripts can be run from the command line:

- `npm run build`: convert YAML > JSON, regenerate project documentation
- `npm run convert`: convert the YAML schemas to JSON
- `npm run docs`: regenerate the project documentation
- `npm test`: run tests
- `npm run upload`: upload the schemas to the DLx CDN

[checklist]: ./PULL_REQUEST_TEMPLATE.md
[docs]:      https://format.digitallinguistics.io/
[issue]:     https://github.com/digitallinguistics/spec/issues/new
