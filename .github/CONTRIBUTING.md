# Contributing

## Schema Conventions

- `description`: Always surround with single quotes, and end with a period (even incomplete sentences). This avoids having to constantly check to see whether a string can go unquoted.
- `$ref`: Include `title`, `type`, `description` fields for any referenced schema, except when used for `items`. Include the description in the superordinate array property instead. This is useful because the use/interpretation of a schema varies by context. It's also necessary for pointers to DatabaseReference objects.
- Vertically align property values for better readability.
- `DatabaseReference`: When referencing the DatabaseReference schema, the title of the referencing schema should be `{Title} (Database Reference(s): {Type})`.
