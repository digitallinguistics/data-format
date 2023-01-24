# Contributing

- Schemas are written as YAML for easy editing, and stored in the `schemas/` folder. (The exceptions are third-party schemas, which are stored in the `schemas/` folder as JSON and simply copied to the `json/` folder during build.) During the build process, these are converted to JSON and saved to the `json/` folder.
- You will need to build the JSON versions of the schemas before running other scripts. You can do this by running the file `build/convert.js` in Node, or running `npm run build` on the command line.

## Schema Conventions

- `$ref`: Include `title`, `type`, `description` fields for any referenced schema, except when used for `items`. Include the description in the superordinate array property instead. This is useful because the use/interpretation of a schema varies by context. It's also necessary for pointers to DatabaseReference objects.
- Vertically align property values for better readability.
- `DatabaseReference`: When referencing the DatabaseReference schema, the title of the referencing schema should be `{Title} (Database Reference(s): {Type})`.
- The `description` field should end in a period, even when it's not a complete sentence.

## Third-Party Schemas

The following third-party schemas are also used in this project (and copies of those schemas are saved as JSON in the `schemas/` folder.)

- [CSL Bibliographic Resource](): Saved as `BibItem.json`.
- [CSL Cite Item](): Saved as `CiteItem.json`.
