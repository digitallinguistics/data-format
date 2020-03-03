# Maintainers

## Merging Pull Requests

- [ ] Merge (or squash) pull request into `master`
  - title: `LABEL: description (#000)`
  - description
  - changelog: `LABEL: description (closes #000)`
- [ ] Create or update release notes for the release that this pull request will be part of

## Versioning

- **major:** breaking changes to schemas / properties or functional changes to their descriptions
- **minor:** new properties added, optional properties removed, or other backwards-compatible changes
- **patch:** typos, non-functional changes to descriptions, minor bugs and hotfixes, updates to example data

## Releases

- [ ] Check for outdated dependencies and make commits to update them as needed
- [ ] Make a version commit
  - [ ] Increment version numbers of schemas that changed.
  - [ ] Increment version number of project.
- [ ] Run upload script from `master` branch
- [ ] Travis CI deploys to npm
- [ ] Travis CI uploads files to DLx CDN
- [ ] Write a blog post
