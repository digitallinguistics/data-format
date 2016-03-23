# The DLx Data Formats

## Introduction
There are many ways a linguist could choose to represent their data in digital form. Not only are many formats are available (a relational database, XML, a tabular spreadsheet, JSON, etc.), but there is significant flexibility in deciding what properties to include in your data and what to call them. For example, does the data about a text have a property specifying the language it was spoken in, and should that property be represented as `"lang"` or `"language"`?

The Digital Linguistics (DLx) project recommends a data format called [**JSON**](http://json.org/) (JavaScript Object Notation) for digitally representing your linguistic data, and in particular, the DLx project has drafted a recommended format for how to structure linguistic data using JSON. This recommended format was designed to capture hierarchical linguistic data in a way that aligns with the descriptive categories that linguists actually use, relying on fundamental linguistic notions such as *text*, *morpheme*, *orthography*, etc. For instance, this schema is capable of capturing the fact that a text contains sentences, sentences contain words, words contains morphemes, and morphemes contain phonemes. This simple capacity actually turns out to be a crucial factor in inputting, editing, searching, and analyzing linguistic data. At the same time, the DLx format is computer-readable, easily searchable, and is natively supported by all modern web-based tools.

The DLx project recommends JSON because it has become the data interchange format for the modern web, and is natively supported by every major programming language. This makes it significantly easier for programmers to develop tools that use the DLx format, meaning that linguists will have a wider variety of options and helpful tools for managing their linguistic data. Moreover, JSON is extremely easy for humans to read. Below is a short phrase represented in JSON. Notice that, even without understanding how the format works, you can see the hierarchical relationship between phrases, words, and morphemes, and you know which piece of data belongs to what kind of linguistic object.

```
{
  "transcription": "Hola, me llamo Daniel.",
  "translation": "Hello, my name is Daniel.",
  "words": [
    {
      "token": "Hola",
      "morphemes": [
        {
          "form": "hola",
          "gloss": "hello"
        }
      ]
    },
    {
      "token": "me",
      "morphemes": [
        {
          "form": "me",
          "gloss": "1sg.OBJ"
        }
      ]
    },
    {
      "word": "llamo",
      "morphemes": [
        {
          "form": "llam-",
          "gloss": "call"
        },
        {
          "form": "-o",
          "gloss": "1sg.PRES.IND.SUBJ"
        }
      ]
    },
    {
      "word": "Daniel",
      "morphemes": [
        {
          "form": "Daniel",
          "gloss": "Daniel"
        }
      ]
    }
  ]
}
```

JSON format is incredibly easy to learn. It consists of just a few simple rules:

* All data in JSON is represented as either an Object, represented by curly braces `{ }`, or a Collection of Objects (also called an Array), represented by square brackets `[ ]`.

* Objects represent a single instance of a type of data. For instance, the example above is an Object that represents a single phrase.

* Objects contain a list of properties (also called attributes or fields) and their values, both placed in double quotes `" "` and separated by a colon `:`. Pairs of properties and values are separated by commas `,`. In the example above, the phrase has a property called `"transcription"`, and the value of that property is `"Hola, me llamo Daniel."`

* Arrays are a collection of Objects separated by commas `,`. The items in an Array can be strings of text `"hola"`, numbers (with no quotes), `17`, Objects `{ }`, or even other Arrays `[ ]`. In the example above, the phrase has a collection called `"words"` containing a list of all the words in the phrase. Notice each word in turn has its own collection, called `"morphemes"`. This nesting of arrays and objects allows us to capture the hierarchical nature of linguistic data.

Another great feature of JSON is that adding new properties to an Object doesn't change or in any way disrupt its other properties. This allows you to take your data from tool to tool without any tedious conversion or formatting. For example, say you've transcribed your data using a tool for morphological analysis, and now you want to add time alignment to each phrase using a different tool. If you were using FLEx and ELAN, you would have to first export from FLEx and create an ELAN file. In other words, you have to change the data *format* just to change the type of annotation you want to add. But with JSON, adding time alignment data couldn’t be simpler. The time alignment tool would merely add properties called `"startTime"` and `"endTime"` to the phrase, and enter their values. You could then take your data back to the morphological analysis tool without any converting, because the data hasn't been altered, just extended. The underlying format is all the same.

## Schemas

### Linguistic Schemas
The DLx project provides recommendations for how to format linguistic data in JSON for the following kinds of linguistic objects. Click each object to see its specification.

* [language](http://digitallinguistics.github.io/dlx-spec/language.html)
* [lexeme](http://digitallinguistics.github.io/dlx-spec/lexeme.html)
* [lexicon](http://digitallinguistics.github.io/dlx-spec/lexicon.html)
* [orthography](http://digitallinguistics.github.io/dlx-spec/orthography.html)
* [phrase](http://digitallinguistics.github.io/dlx-spec/phrase.html)
* [text](http://digitallinguistics.github.io/dlx-spec/text.html)
* [word](http://digitallinguistics.github.io/dlx-spec/word.html)

### Non-Linguistic Schemas
Other non-linguistic objects are given specifications as well (click on the name of each to see its specification):

Schema              | Description
------------------- | -----------
[`abbreviation`][1] | A human-readable abbreviation, containing no spaces, and only letters A-Z or numbers.
[`access`][2]       | Information about who should be allowed to access the current data. Access rights can be specified in many of the formats used by well-known linguistic archives such as ELAR or AILLA.
[`bundle`][3]       | A collection of resources relating to a single event or task, such as all the files relating to a certain elicitation session, or all the field notes from a given day.
[`contributor`][4]  | Information about a person who contributed to the given resource, and the role they played. For example, most texts will have a contributor with the role of `speaker` specified.
[`dateCreated`][10] | The date a database resource was created (*not* the date the item was recorded).
[`media`][5]        | Information and metadata about a media file (e.g. WAV, PDF, or JPEG files, etc.).
[`note`][6]         | Most DLx resources allow you to add notes in different languages, of different types.
[`person`][7]       | Information about a person, e.g. speaker, linguist, editor, translator, etc.
[`project`][8]      | Information about a project. Projects may contain multiple languages and lexicons, e.g 'Comparative Mixtec Dialectology' or 'Documenting Ékegusií Folktales'.
[`tags`][9]         | A collection of tags on the given resource. Particularly useful for tagging instances of a phenomenon in your corpora.

[1]:  http://digitallinguistics.github.io/dlx-spec/abbreviation.html
[2]:  http://digitallinguistics.github.io/dlx-spec/access.html
[3]:  http://digitallinguistics.github.io/dlx-spec/bundle.html
[4]:  http://digitallinguistics.github.io/dlx-spec/contributor.html
[5]:  http://digitallinguistics.github.io/dlx-spec/media.html
[6]:  http://digitallinguistics.github.io/dlx-spec/note.html
[7]:  http://digitallinguistics.github.io/dlx-spec/person.html
[8]:  http://digitallinguistics.github.io/dlx-spec/project.html
[9]:  http://digitallinguistics.github.io/dlx-spec/tags.html
[10]: http://digitallinguistics.github.io/dlx-spec/dateCreated.html
