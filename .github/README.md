<!-- This readme is targeted at general users. The developer readme is located in the project root. -->

# The Data Format for Digital Linguistics (Daffodil)

## Introduction

The DLx data format is a set of recommendations (i.e. schemas or specifications) for how to store linguistic data in JSON- a simple, human-readable text format which is supported by every major programming language, and is widely used for data storage and interchange on the web. The DLx format is useful for anybody who manages a linguistic database.

The format includes recommendations (called "schemas") for storing data about every kind of linguistic entity (e.g. Language, Morpheme, Text, etc.). It is part of a broader project called [Digital Linguistics][About] (DLx), which aims to create web-based tools for managing linguistic data, and to encourage best practices in digital linguistic data management.

This repository contains the schemas themselves (in the `/schemas` folder), as well as more human-readable documentation for them.

[View this project on GitHub.][GitHub]

Please consider citing this specification in scholarly articles using this repository's [Zenodo][Zenodo] DOI:

> Hieber, Daniel W. 2020. _Data Format for Digital Linguistics_. DOI:[10.5281/zenodo.1438589][Zenodo]

[![GitHub stars](https://img.shields.io/github/stars/digitallinguistics/spec.svg?style=social&label=Stars)][GitHub]
[![npm downloads](https://img.shields.io/npm/dt/@digitallinguistics/spec.svg)][npm]
[![DOI](https://zenodo.org/badge/50221632.svg)][Zenodo]
[![license](https://img.shields.io/github/license/digitallinguistics/spec.svg)][License]

## Contents & Quick Links

* [About the Format](#about-the-format): learn what the DLx format is and how it works

* [Schemas](#schemas): read the schemas and get started using the DLx format in your own projects

* [Bugs & Feature Requests][Bugs]: Need to report a bug or suggest a feature? [Open an issue on GitHub][Issues].

* [Contributing][Contributing]: Want to contribute to this project? 🌟 Awesome! 🌟 [Check out the contributing guidelines to get started][Contributing].

* [Developer Readme][Developer]: Are you a developer who wants to work with the data format programmatically? Check out the [Developer Readme][Developer].


## About the DLx Format

The canonical way that linguists represent linguistic data in their publications is with an [interlinear gloss][IGL]. This is typically a 3- or 4-line format that shows a phrase in the language of interest, the words and morphemes inside the phrase, what each of those morphemes means, and its overall translation. Here is a short example of an interlinear gloss for a phrase in a language called Chitimacha:

```
Wetkx hus naancaakamankx weyt hi hokmiqi.                      (Transcription)
wetkx   hus   naancaaka-mank-x   weyt   hi      hok-mi-qi      (Morpheme Breakdown)
then    his   brother-PL-TOP     he     there   leave-PL-3sg   (Glosses)
'Then he left his brothers there.'                             (Translation)
```

While humans look at a representation like this and can see which glosses are associated with which morphemes, computers cannot rely on visual layouts in this way, and require more explicit structure. The purpose of the Digital Linguistics data format is to define a standard for representing interlinear glosses (as well as other linguistic information, such as dictionary entries) in a digital, computer-readable way.

There are many ways a linguist could choose to represent their data in digital form. Not only are many formats are available (a relational database, XML, a tabular spreadsheet, JSON, etc.), but there is significant flexibility in deciding what properties to include in your data and what to call them. For example, does the data about a text have a property specifying the language it was spoken in, and should that property be represented as `"lang"` or `"language"`?

The Digital Linguistics (DLx) project recommends a data format called [**JSON**][JSON] (JavaScript Object Notation) for digitally representing your linguistic data. Moreover, the DLx project has drafted recommendations for how to structure linguistic data using JSON. This recommended format was designed to capture hierarchical linguistic data in a way that aligns with the descriptive categories that linguists actually use, relying on fundamental linguistic notions such as *text*, *morpheme*, *orthography*, etc. For instance, this format is capable of capturing the fact that a text contains utterances, utterances contain words, words contains morphemes, and morphemes contain phonemes. This functionality turns out to be a crucial factor in inputting, editing, searching, and analyzing linguistic data. At the same time, the DLx format is computer-readable, easily searchable, and is natively supported by all modern web-based tools.

The DLx project recommends JSON because it has become the data interchange format for the modern web, and is natively supported by every major programming language. This makes it significantly easier for programmers to develop tools that use the DLx format, meaning that linguists will have a wider variety of options and helpful tools for managing their linguistic data. Moreover, JSON is extremely easy for humans to read. Below is a short phrase represented in JSON. Notice that, even if you don't understand how the format works, you can see the hierarchical relationship between the utterance, its words, and their morphemes, and you know which piece of data belongs to what kind of linguistic object.

```json
{
  "transcription": {
    "es": "hola me llamo Daniel",
    "es-fonipa": "ola me jamo dænjəl"
  },
  "translation": {
    "en": "Hello, my name is Daniel.",
  },
  "words": [
    {
      "transcription": {
        "es": "hola",
        "es-fonipa": "ola"
      },
      "translation": {
        "en": "hello"
      },
      "morphemes": [
        {
          "transcription": {
            "es": "hola",
            "es-fonipa": "ola"
          },
          "gloss": {
            "en": "hello"
          }
        }
      ]
    },
    {
      "transcription": {
        "es": "me",
        "es-fonipa": "me"
      },
      "translation": {
        "en": "me"
      },
      "morphemes": [
        {
          "transcription": {
            "es": "me",
            "es-fonipa": "me"
          },
          "gloss": {
            "en": "1sg.DO"
          }
        }
      ]
    },
    {
      "transcription": {
        "es": "llamo",
        "es-fonipa": "jamo"
      },
      "translation": {
        "en": "I call"
      },
      "morphemes": [
        {
          "transcription": {
            "es": "llam",
            "es-fonipa": "jam"
          },
          "gloss": {
            "en": "call"
          }
        },
        {
          "transcription": {
            "es": "o",
            "es-fonipa": "o"
          },
          "gloss": {
            "en": "1sg.PRES.IND.SUBJ"
          }
        }
      ]
    },
    {
      "transcription": {
        "es": "Daniel",
        "es-fonipa": "dænjəl"
      },
      "translation": {
        "en": "Daniel"
      },
      "morphemes": [
        {
          "transcription": {
            "es": "Daniel",
            "es-fonipa": "dænjəl"
          },
          "gloss": {
            "en": "Daniel"
          }
        }
      ]
    }
  ]
}
```

JSON format is easy to learn. It consists of just a few simple rules:

* All data in JSON is represented as either an Object, represented by curly braces `{ }`, or a Collection of Objects (also called an Array), represented by square brackets `[ ]`.

* Objects represent a single instance of a type of data. For instance, the example above is an Object that represents a single Utterance.

* Objects contain a list of properties (also called attributes or fields) and their values, both placed in double quotes `" "` and separated by a colon `:`. Pairs of properties and values are separated by commas `,`. In the example above, the Utterance has a property called `"transcription"`, and the value of that property is an Object containing transcriptions of the Utterance in different orthographies. For example, the `"es"` property shows a transcription of the Utterance in standard Spanish orthography: `"Hola, me llamo Daniel."`.

* Arrays are a collection of Objects separated by commas `,`. The items in an Array can be strings of text (e.g. `"hola"`), numbers (with no quotes, e.g. `17`), Objects (e.g. `{ }`), or even other Arrays (e.g. `[ ]`). In the example above, the Utterance has a collection called `"words"` containing a list of all the words in the phrase. Notice each word in turn has its own collection, called `"morphemes"`. This nesting of Arrays and Objects allows us to capture the hierarchical nature of linguistic data.

Another great feature of JSON is that adding new properties to an Object doesn't change or in any way disrupt its other properties. This allows you to take your data from tool to tool without any tedious conversion or formatting. For example, say you've transcribed your data using a tool for morphological analysis, and now you want to add time alignment to each phrase using a different tool. If you were using FLEx and ELAN, you would have to first export from FLEx and create an ELAN file. In other words, you have to change the data *format* just to change the type of annotation you want to add. But with JSON, adding time alignment data couldn’t be simpler. The time alignment tool would merely add properties called `"startTime"` and `"endTime"` to the phrase, and enter their values. You could then take your data back to the morphological analysis tool without any converting. The data hasn't been altered, just extended. The underlying format is all the same.

## Why is this format useful?

Tools which adhere to this recommended format will be interoperable, allowing users to migrate their data easily from one tool to another. In addition, this format is compatible with the modern web platform, making it easy to manage linguistic data online or in a browser. JSON (the format underlying DaFoDiL), is extremely easy to use and to write programming scripts with, greatly reducing the time researchers need to spend writing scripts. In fact, even tools which do not adhere to the DLx data format will nonetheless find data stored in this format very easy to work with or support, because of how easy JSON is to use when programming.

DaFoDiL is not intended to be the format that language scientists work in directly. It is a storage format that's designed for use in databases or when working with language data programmatically. That said, because the DLx format uses JSON, it is highly human readable, and users can simply open the text document for the item they are interested in to examine and edit the data firsthand. Since JSON files are just simple text documents with Unicode encoding, this also ensures the longevity of the data beyond any particular tool or user interface.

This format also facilitates adherence to the [Austin Principles for Data Citation in Linguistics][Austin] by supporting the use of persistent identifiers, fields for identifying contributors to the data and their role(s), easy searchability, human-readability (in the form of human-readable keys in addition to opaque database IDs), and interoperability between different tools and web technologies more generally.

## How can I use DaFoDiL in my project?

To use DaFoDiL in your project, all you have to do is store your data in JSON, using the recommended field names and formats listed in this specification. For example, if you were storing metadata about a language, you would go to the [Language schema][Language] and see that each Language object must have a `name` property. That `name` property in turn must be formatted according to the [Multi-Language String schema][MultiLangString], which can be either a string (if that string is English), or an object with strings in multiple languages. It might look like this for the language called Gusii:

```json
{
  "name": {
    "eng": "Gusii",
    "swa": "Kisii"
  }
}
```

### Linguistic Schemas

The DLx project provides recommendations for how to format linguistic data in JSON for various kinds of linguistic objects, such as Languages, Texts, Orthographies, Lexemes, Phonemes, and many others. Note that working data does *not* need to adhere to these schemas. Only data stored or exchanged in JSON format must follow these specifications. Developers may choose to represent the data internally in their software however they wish.

### Non-Linguistic Schemas

Other non-linguistic objects are given specifications as well, including Abbreviations, Bundles, Locations, Media Files, Notes, Persons, Tags, and many others.

## Want to Contribute?

Check out the [Contributing Guidelines][Contributing] for this project, and the [Developer Readme][Developer].

## Maintainers

This repository is maintained by [Daniel W. Hieber][Me] ([@dwhieb][me]).

[About]:           https://digitallinguistics.io/about
[Austin]:          http://site.uit.no/linguisticsdatacitation/
[Bugs]:            https://github.com/digitallinguistics/spec/blob/master/.github/CONTRIBUTING.md#reporting-bugs--other-issues
[Contributing]:    https://github.com/digitallinguistics/spec/blob/master/.github/CONTRIBUTING.md
[Developer]:       https://github.com/digitallinguistics/spec/blob/master/README.md
[GitHub]:          https://github.com/digitallinguistics/spec
[IGL]:             https://en.wikipedia.org/wiki/Interlinear_gloss
[Issues]:          https://github.com/digitallinguistics/spec/issues
[JSON]:            http://json.org/
[Language]:        https://format.digitallinguistics.io/schemas/Language.html
[License]:         https://github.com/digitallinguistics/spec/blob/master/.github/LICENSE.md
[Me]:              https://github.com/dwhieb/
[MultiLangString]: https://format.digitallinguistics.io/schemas/MultiLangString.html
[npm]:             https://www.npmjs.com/package/@digitallinguistics/spec
[Zenodo]:          http://doi.org/10.5281/zenodo.594557
