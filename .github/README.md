<!-- This readme is targeted at general users. The developer readme is located in the project root. -->
# The Data Format for Digital Linguistics (DaFoDiL)

## Introduction

This project aims to create a standardized, human-readable, web-compatible format for storing linguistic data, following best practices for managing data on the modern web. It is part of a broader project called Digital Linguistics (DLx), which has the goal of creating web tools for managing linguistic data. This project will be useful for anyone who manages a linguistic database.

This repository contains the specification for the Data Format for Digital Linguistics (abbreviated as DaFoDiL, i.e. Daffodil). This specification is a recommendation for how to store linguistic data in a way that is standardized, human-readable and web-compatible, using a popular data storage format on the web known as [JSON][JSON].

Tools which follow this recommended format will be interoperable, allowing users to migrate their data easily from one tool to another. In addition, this format is compatible with the modern web platform, making it easy to manage linguistic data online or in a browser. All Digital Linguistics projects utilize this data format.

This format also facilitates adherence to the [Austin Principles for Data Citation in Linguistics][Austin] by supporting the use of persistent identifiers, fields for identifying contributors to the data and their role(s), easy searchability, human-readability (in the form of human-readable keys in addition to opaque database IDs), and interoperability between different tools and web technologies more generally.

Please consider citing this specification in scholarly articles using this repository's [Zenodo][Zenodo] DOI:

> Hieber, Daniel W. 2018. _Data Format for Digital Linguistics_. DOI:[10.5281/zenodo.1438589][Zenodo]

[![npm downloads](https://img.shields.io/npm/dt/@digitallinguistics/spec.svg)][npm]
[![DOI](https://zenodo.org/badge/50221632.svg)][Zenodo]
[![license](https://img.shields.io/github/license/digitallinguistics/spec.svg)][License]

## Contents & Quick Links

* [About the Format](#about-the-format): learn what the DLx format is and how it works

* [Schemas](#schemas): read the schemas and get started using the DLx format in your own projects

* [Bugs & Feature Requests][Bugs]: Need to report a bug or suggest a feature? [Open an issue on GitHub][Issues]. Check out the [contributing guidelines][Contributing] for information on the best way to report a bug or request a feature.

* [Contributing][Contributing]: Want to contribute to this project? :star2: Awesome! :star2: [Check out the contributing guidelines to get started][Contributing].

* [Developer Readme][DevReadme]: Are you a developer who wants to work with the data format programmatically? Check out the [Developer Readme][DevReadme].

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
    "spa": "hola me llamo Daniel",
    "ipa": "ola me jamo dænjəl"
  },
  "translation": {
    "eng": "Hello, my name is Daniel.",
  },
  "words": [
    {
      "transcription": {
        "spa": "hola",
        "ipa": "ola"
      },
      "translation": {
        "eng": "hello"
      },
      "morphemes": [
        {
          "transcription": {
            "spa": "hola",
            "ipa": "ola"
          },
          "gloss": {
            "eng": "hello"
          }
        }
      ]
    },
    {
      "transcription": {
        "spa": "me",
        "ipa": "me"
      },
      "translation": {
        "eng": "me"
      },
      "morphemes": [
        {
          "transcription": {
            "spa": "me",
            "ipa": "me"
          },
          "gloss": {
            "eng": "1sg.DO"
          }
        }
      ]
    },
    {
      "transcription": {
        "spa": "llamo",
        "ipa": "jamo"
      },
      "translation": {
        "eng": "I call"
      },
      "morphemes": [
        {
          "transcription": {
            "spa": "llam",
            "ipa": "jam"
          },
          "gloss": {
            "eng": "call"
          }
        },
        {
          "transcription": {
            "spa": "o",
            "ipa": "o"
          },
          "gloss": {
            "eng": "1sg.PRES.IND.SUBJ"
          }
        }
      ]
    },
    {
      "transcription": {
        "spa": "Daniel",
        "ipa": "dænjəl"
      },
      "translation": {
        "eng": "Daniel"
      },
      "morphemes": [
        {
          "transcription": {
            "spa": "Daniel",
            "ipa": "dænjəl"
          },
          "gloss": {
            "eng": "Daniel"
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

* Objects contain a list of properties (also called attributes or fields) and their values, both placed in double quotes `" "` and separated by a colon `:`. Pairs of properties and values are separated by commas `,`. In the example above, the Utterance has a property called `"transcription"`, and the value of that property is an Object containing transcriptions of the Utterance in different orthographies. For example, the `"spa"` property shows a transcription of the Utterance in standard Spanish orthography: `"Hola, me llamo Daniel."`.

* Arrays are a collection of Objects separated by commas `,`. The items in an Array can be strings of text (e.g. `"hola"`), numbers (with no quotes, e.g. `17`), Objects (e.g. `{ }`), or even other Arrays (e.g. `[ ]`). In the example above, the Utterance has a collection called `"words"` containing a list of all the words in the phrase. Notice each word in turn has its own collection, called `"morphemes"`. This nesting of Arrays and Objects allows us to capture the hierarchical nature of linguistic data.

Another great feature of JSON is that adding new properties to an Object doesn't change or in any way disrupt its other properties. This allows you to take your data from tool to tool without any tedious conversion or formatting. For example, say you've transcribed your data using a tool for morphological analysis, and now you want to add time alignment to each phrase using a different tool. If you were using FLEx and ELAN, you would have to first export from FLEx and create an ELAN file. In other words, you have to change the data *format* just to change the type of annotation you want to add. But with JSON, adding time alignment data couldn’t be simpler. The time alignment tool would merely add properties called `"startTime"` and `"endTime"` to the phrase, and enter their values. You could then take your data back to the morphological analysis tool without any converting. The data hasn't been altered, just extended. The underlying format is all the same.

## Schemas

### Linguistic Schemas

The DLx project provides recommendations for how to format linguistic data in JSON for various kinds of linguistic objects, such as Languages, Texts, Orthographies, Lexemes, Phonemes, and many others. Note that working data does *not* need to adhere to these schemas. Only data stored or exchanged in JSON format must follow these specifications. Developers may choose to represent the data internally in their software however they wish.

### Non-Linguistic Schemas

Other non-linguistic objects are given specifications as well, including Abbreviations, Bundles, Locations, Media Files, Notes, Persons, Tags, and many others.

### Using the Schemas

Following the recommended data format in your own project is as easy as making sure you include the required properties in your data, and format them in the recommended ways. For example, if you wish to create a JSON object representing a phrase, you should follow the Utterance schema by making sure you include the `transcription`, `translation`, and `words` properties on the JSON object. And if you want to include additional data, check to see whether there is already a recommended property you can use. For example, if you wish to indicate the time within the audio file that the phrase begins and ends, you would use the `startTime` and `endTime` properties, each of which is a number formatted in seconds and milliseconds (SS.MMM).

Note that most schemas have a strongly-recommended (but optional) `type` property indicating the schema that that object adheres to.

## Want to Contribute?

Check out the [Contributing Guidelines][Contributing] for this project, and the [Developer Readme][DevReadme].

## Maintainers

This repository is maintained by [Daniel W. Hieber][Me] ([@dwhieb][19]).

[Austin]: http://site.uit.no/linguisticsdatacitation/
[Bugs]: https://github.com/digitallinguistics/spec/blob/master/.github/CONTRIBUTING.md#reporting-bugs--other-issues
[Contributing]: https://github.com/digitallinguistics/spec/blob/master/.github/CONTRIBUTING.md
[Developer]: https://github.com/digitallinguistics/spec/blob/master/README.md
[IGL]:  https://en.wikipedia.org/wiki/Interlinear_gloss
[Issues]: https://github.com/digitallinguistics/spec/issues
[JSON]: http://json.org/
[License]: https://github.com/digitallinguistics/spec/blob/master/.github/LICENSE.md
[Me]: https://github.com/dwhieb/
[npm]: https://www.npmjs.com/package/@digitallinguistics/spec
[Zenodo]: http://doi.org/10.5281/zenodo.594557
