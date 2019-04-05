# Maintainers

## Merging Pull Requests

- [ ] Merge (or squash) pull request into `master`
  - title: `LABEL: description (#000)`
  - description
  - changelog: `LABEL: description (closes #000)`
- [ ] Create or update release notes for the release that this pull request will be part of

## Releases

- [ ] Check for outdated dependencies and make commits to update them as needed
- [ ] Make a version commit
- [ ] Run upload script from `master` branch
- [ ] Travis CI deploys to npm
- [ ] Travis CI uploads files to DLx CDN
- [ ] Write a blog post
