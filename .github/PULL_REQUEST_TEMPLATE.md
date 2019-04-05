<!--- Provide a general summary of your changes in the Title above -->

## Related Issue
<!-- This project only accepts pull requests related to open issues. -->
<!-- Please link to the issue here, or open an issue if you have not already. -->

## Description
<!-- in 1-3 sentences, please provide a high-level overview of what changes were made. -->
<!-- If appropriate, document your reasoning for why you made the changes the way you did. -->

## Changelog
<!-- What specific changes were made? List each change as a bullet point with a label. -->
<!-- See the issues tracker for a list of labels to use. -->
<!-- Some examples: -->

<!-- DOCS: add documentation about new app.sync() method -->
<!-- NEW: add app.sync() method to App object -->
<!-- CHANGE: update app.init() to call app.sync() -->

## Pull Request Checklist

- [ ] **[Open an issue](https://github.com/digitallinguistics/spec/issues/new)** for the change, if one is not open already. **NOTE:** It is a good idea to wait until your suggested change is approved by a maintainer before writing any code.

- [ ] **Fork the repository** and clone it to your computer.

- [ ] **Create an issue branch** for the changes you are making. You should only make changes on this branch for the issue you are currently working on.

- [ ] **Install [Node.js](https://nodejs.org/en/)**. Use the latest LTS release. If you need to manage multiple versions of Node.js on your computer, install [nvm](https://github.com/creationix/nvm) or [nvm windows](https://github.com/coreybutler/nvm-windows).

- [ ] **Install project dependencies** by running `npm install` from the command line in the project root.

- [ ] **Update the project documentation** (`README.md`, `CONTRIBUTING.md`, etc.) to reflect the changes you plan to make, if applicable.

- [ ] **Write or update (failing) tests** for the changes you are going to make (if needed). Tests only need to be written for issues that cannot be checked using the example data in the schemas.

- [ ] **Make changes to the schemas or code.** The schemas are located in `/schemas/yaml`. Do not update the schemas in `schemas/json`, or your changes will be overwritten.

- [ ] **Update the `"description"` field** of any schemas / properties that you change.

- [ ] **Update examples** in the affected schemas to reflect the changes you made.

- [ ] **Get the latest changes from the `master` branch** and resolve any conflicts that arise. Run the tests again.

- [ ] **Build the project** (`npm run build`)

  - Generates JSON versions of the schemas
  - Regenerates the project documentation

- [ ] **Run the tests** (`npm test`) and fix issues that arise. If you find an issue that is unrelated to the one you are working on, open a new issue for it.

- [ ] **Check the project documentation** for your changes

- [ ] **Open a pull request** from your issue branch into the `master` branch. See GitHub's advice on [How to write the perfect pull request](https://blog.github.com/2015-01-21-how-to-write-the-perfect-pull-request/).

- [ ] **Wait for a reviewer to provide feedback**

- [ ] **Address any changes requested by the reviewer**. While working on your pull request, you can write `[ci skip]` in each of your commit messages to skip automated testing, until you are ready to test your code.

- [ ] **Celebrate!!!** :fireworks: Your work is complete! Thank you for your valuable contribution to DLx!
