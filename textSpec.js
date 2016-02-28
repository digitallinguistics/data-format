var textSpec = {
  "$schema": "http://json-schema.org/schema#",
  "id": "https://digitallinguistics.github.io/spec/textPl.json",

  "title": "Text",
  "description": "The <dfn>text</dfn> is the fundamental unit of documentation. It represents a linguistic performance of a stretch of discourse in context. This may include a wide variety of linguistic genres: an elicitation session, a conversation, a narrative, a song, etc. The DLX <code>Text</code> object consists minimally of a <code>\"title\"</code> and <code>\"phrases\"</code> array.",
  "type": "object",
  "required": ["participants", "phrases", "title"],
  "additionalProperties": true,

  "definitions": {
    "tag": {
      "title": "Tag",
      "description": "A <dfn>tag</dfn> is a piece of metadata that can be applied to any linguistic object, in order to associate related objects together. Each DLX <code>Tag</code> object consists of a <code>\"category\"</code> and an optional <code>\"value\"</code> or subcategory. Both <code>\"category\"</code> and <code>\"value\"</code> must be text (numbers will be converted into text).",
      "type": "object",
      "required": ["category"],
      "additionalProperties": false,

      "properties": {
        "category": { "title": "Category", "type": "string", "description": "The category for this tag." },
        "value": { "title": "Value", "type": "string", "description": "The value for this tag." }
      }
    }
  },

  "oneOf": [
    { "properties": {
        "participants": {
          "description": "One of the persons in the Participants array must have a role of <code>\"speaker\"</code>. A more formalized way of expressing this constraint is given below. In prose form, it says that it must not be the case that every participant in the array does not have a <code>\"speaker\"</code> role (this is simply the inverse of saying that at least one participant in the array has a <code>\"speaker\"</code> role).",
          "not": {
            "items": {
              "title": "Participant",
              "type": "object",
              "not": {
                "properties": {
                  "role": { "title": "Role", "type": "string", "enum": ["speaker"] }
                }
              }
            }
          }
        }
      }
    },

    { "properties": {
        "phrases": {
          "title": "Phrases",
          "description": "Each phrase must have a non-empty <code>\"speaker\"</code> attribute. This is formalized below.",
          "type": "array",
          "allOf": [
            { "$ref": "#/properties/phrases" },
            { "items": { "required": ["speaker"] } }
          ]
        }
      }
    }
  ],

  "properties": {

    "title": {
      "title": "Title",
      "description": "A <dfn>title</dfn> is a human-readable prose description of the content of the text. A <code>Title</code> may either be a simple text string (in the case where the title is only written in one language), or an object whose attributes are different orthographies (in the case where the title has multiple translations or representations).",


      "oneOf": [
        {
          "description": "The single title for this text. If this option is chosen, the <code>Text</code> object must have a <code>Default Transcription</code> specified. If there are multiple translations or representations of this title, <code>\"title\"</code> should be an object instead (see the other option for the <code>Title</code> object).",
          "type": "string"
        },
        {
          "description": "The titles for this text. Use this option when the title has multiple translations in different languages, or representations in different orthographies. The <code>Title</code> object contains each of these different representations. The attribute should be the name of the orthography the title is written in (e.g. <code>\"English\"</code>, <code>\"MixtecPhonemic\"</code>, <code>\"Spanish\"</code>), while the value is the title itself. Each text must have at least 1 title within the <code>Titles</code> object.",
          "type": "object",
          "minProperties": 1,
          "additionalProperties": false,
          "required": ["Orthography"],
          "patternProperties": {
            "^[(a-z)|(A-Z)|(0-9)]+$": { "title": "Orthography", "description": "The title of this text, in the particular orthography specified by the attribute. The field name is the name of the orthography.", "type": "string", "requireSelf": true }
          },
        }
      ]
    },

    "abbreviation": { "title": "Abbreviation", "type": "string", "pattern": "^[(a-z)|(A-Z)|(0-9)]+$", "description": "A human-readable abbreviation for this text, containing only letters a-z, A-Z, and numbers 0-9 (no spaces allowed)." },
    "dateCreated": { "title": "Date Created", "type": "string", "description": "The date (and optionally time) that this <code>Text</code> object or file was created, in <a href=http://tools.ietf.org/html/rfc3339>internet date-time format</a> (NOT the date the text was recorded; for that, see the <code>\"dateRecorded\"</code> property).", "format": "date-time" },
    "dateModified": { "title": "Date Modified", "type": "string", "description": "The date (and optionally time) that this <code>Text</code> object or file was modified, in <a href=http://tools.ietf.org/html/rfc3339>internet date-time format</a>.", "format": "date-time" },
    "dateRecorded": { "title": "Date Recorded", "type": "string", "description": "The date (and optionally time) that this text was recorded, in <a href=http://tools.ietf.org/html/rfc3339>internet date-time format</a>.", "format": "date-time" },
    "discourseType": { "title": "Discourse Type", "type": "string", "description": "The type of discourse event, e.g. monologue, dialogue, or song." },
    "genre": { "title": "Genre", "type": "string", "description": "The genre of the text, e.g. folktale, personal narrative, or expository." },
    "location": { "title": "Location", "type": "string", "description": "A text description of the locale, neighborhood, city, region, locality, and/or country." },
    "note": { "title": "Note", "type": "string", "description": "Any notes about this text." },
    "tags": {
      "title": "Tags",
      "description": "An array of any tags for this text.",
      "type": "array",
      "uniqueItems": true,
      "items": { "$ref": "#/definitions/tag" }
    },

    "access": {
      "title": "Access Rights",
      "description": "The <code>Access Rights</code> object stores information regarding who has permission to access this particular text. Users may choose to follow the access protocol of their archive of choice, or their own custom access protocol. If a specific protocol is selected, possible values for <code>Access Level</code> will be restricted to the appropriate values for that particular access protocol. For instance, specifying <code>\"ELAR\"</code> as the access protocol restricts the possible values of <code>Access Level</code> to <code>\"U\"</code>, <code>\"R\"</code>, <code>\"C\"</code>, or <code>\"S\"</code>. These interdependencies are formalized below.",
      "type": "object",
      "required": ["accessLevel", "protocol"],

      "oneOf": [
        {
          "required": ["accessLevel", "protocol"],
          "properties": {
            "protocol": { "enum": ["ELAR"] },
            "accessLevel": { "enum": ["U", "R", "C", "S"] }
          }
        },
        {
          "required": ["accessLevel", "protocol"],
          "properties": {
            "protocol": { "enum": ["AILLA"] },
            "accessLevel": { "enum": ["Public", "Password", "Time Limit", "Depositor Control"] }
          }
        },
        {
          "required": ["accessLevel", "protocol"],
          "properties": {
            "protocol": { "enum": ["custom"] },
            "accessLevel": { "type": "string", "description": "A description of the level of access allowed for this text." }
          }
        }
      ],

      "properties": {
        "accessLevel": { "title": "Access Level", "type": "string", "description": "The level of access this text adheres to." },
        "note": { "title": "Note", "type": "string", "description": "Any additional notes concerning access to this text." },
        "protocol": { "title": "Protocol", "type": "string", "description": "The access protocol this text follows, e.g. AILLA, ELAR, PARADISEC. May also be set to <code>\"custom\"</code>.", "enum": ["AILLA", "ELAR", "custom"] }
      }
    },

    "coordinates": {
      "title": "GeoJSON Coordinates",
      "description": "A pair of geographic coordinates where this text was recorded, following the GeoJSON specification for recording coordinates in an array: <a href=http://geojson.org/geojson-spec.html#positions>http://geojson.org/geojson-spec.html#positions</a>.",
      "type": "array",
      "minItems": 2,
      "maxItems": 2,
      "items": { "title": "GeoJSON Coordinate", "type": "number", "maximum": 360, "minimum": -360 }
    },

    "mediaFiles": {
      "title": "Media",
      "type": "array",
      "uniqueItems": true,

      "items": {

        "title": "Media File",
        "description": "A <dfn>media file</dfn> is any audiovisual file associated with this text, including audio or video recordings, but also scans of notebook pages where the text was recorded, relevant pictures taken during recording, etc.",
        "type": "object",
        "required": ["docType", "fileType"],
        "additionalProperties": true,

        "properties": {

          "docType": { "title": "Documentation Type", "type": "string", "description": "The type of documentation this file is, e.g. video recording, notebook scan, etc."},
          "fileType": { "title": "File Type", "type": "string", "description": "A valid <a href=https://en.wikipedia.org/wiki/Media_type>internet media type</a>, e.g. <code>\"audio/wav\"</code>." },
          "length": { "title": "File Length", "type": "number", "description": "The length of the media file in seconds and milliseconds.", "pattern": "^[0-9]{1,2}.[0-9]+$" },
          "startTime": { "title": "Start Time", "type": "number", "description": "Within this media file, the time at which the relevant linguistic data starts. For example, if the camera started recording five minutes before the speaker began speaking, the <code>Start Time</code> would be 5 minutes from the start of the file (so 300.00 seconds). The time stamp should be in seconds and milliseconds, separated by a period, e.g. <code>\"12.573\"</code>, or <code>\"1.2\"</code>, or <code>\"167.78012\"</code>, etc.", "pattern": "^[0-9]{1,2}.[0-9]+$" },
          "endTime": { "title": "End Time", "type": "number", "description": "Within this media file, the time at which the relevant linguistic data ends. For example, if the camera recorded for five minutes after the speaker finished talking, the <code>End Time</code> would be the time 5 minutes before the end of the file. The time stamp should be in seconds and milliseconds, separated by a period, e.g. <code>\"12.573\"</code>, or <code>\"1.2\"</code>, or <code>\"167.78012\"</code>, etc.", "pattern": "^[0-9]{1,2}.[0-9]+$" },
          "note": { "title": "Note", "type": "string", "description": "Any notes to accompany this media file." },
          "url": { "title": "URL", "type": "string", "description": "A stable URL where this media item can be found. Must be a valid URI format.", "format": "uri" },

          "tags": {
            "title": "Tags",
            "type": "array",
            "uniqueItems": true,
            "items": { "$ref": "#/definitions/tag" }
          }
        }
      }
    },

    "participants": {
      "title": "Participants",
      "description": "An array of people who contributed to the creation or analysis of the text in some way. Must contain at least one <code>Participant</code> with a role of <code>\"speaker\"</code>.",
      "type": "array",
      "minItems": 1,
      "items": {
        "title": "Participant",
        "description": "A <dfn>participant</dfn> is anyone who contributed to the creation or analysis of the text, and the role they played (e.g. recording, transcribing, speaking, etc.). A <code>Participant</code> is not just a <code>Person</code> object (see the DLX <a href=personSpec.html>Person</a> specification for that), but rather it is an object which specifies the particular role a person played in producing this text. It is a pairing of person and role. The <code>\"person\"</code> field references a <code>Person</code> object, following the DLX <a href=personSpec.html'>Person</a> specification.",
        "type": "object",
        "required": ["name", "role"],

        "properties": {
          "abbreviation": { "title": "Abbreviation", "type": "string", "description": "The participant <dfn>abbreviation</dfn> is a human-readable key for referring to this person, usually but not always consisting of the person’s initials. Other schemas might be <code>\"A\"</code> and <code>\"B\"</code> respectively for speakers A and B, for example. The participant abbreviation may contain only letters a-z, A-Z, and numbers 0-9 (no spaces allowed)." },
          "name": { "title": "Name", "type": "string", "description": "The name of this participant. If a pseudonym is used for this participant, that pseudonym should be used here instead of the participant’s real name. Their real name should be stored in the <code>Person</code> object for that person." },
          "role": { "title": "Role", "type": "string", "description": "The role that this person played in the creation or curation of this text, e.g. speaker, translator, transcriber, rehearer, editor, checker, glosser, researcher, etc." },
          "person": { "title": "Person", "$ref": "http://digitallinguistics.github.io/personSpec.json", "description": "The <code>\"person\"</code> field references a <code>Person</code> object. This must be a valid <code>Person</code> object, following the <a href=personSpec.html>Person</a> specification." }
        }
      }
    },

    "phrases": {
      "title": "Phrases",
      "type": "array",
      "items": {
        "title": "Phrase",
        "description": "A <dfn>phrase</dfn> is a segmentation of a text above the word level. The DLX specification imposes no requirements regarding how linguists should implement this segmentation — a linguist may choose to segement the text based on intonation units, turns, sentences, or any other appropriate subdivision. A <code>Phrase</code> consists minimally of a <code>Transcription</code>, a <code>Translation</code>, and an array of <code>Words</code> (though the words array may be empty).<br>If the <code>\"participants\"</code> array in the <code>Text</code> contains a single <code>Participant</code> with the <code>\"role\"</code> of <code>\"speaker\"</code>, that speaker is assumed to be the speaker for every phrase in the <code>Text</code>. If there is more than one <code>Participant</code> in the text with the <code>\"role\"</code> of <code>\"speaker\"</code>, each <code>Phrase</code> must have its speaker specified in the <code>\"speaker\"</code> property.<br>If a phrase has a <code>\"startTime\"</code>, it must have an <code>\"endTime\"</code>, and vice versa.",
        "type": "object",
        "required": ["transcription", "translation", "words"],
        "dependencies": {
          "startTime": ["endTime"],
          "endTime": ["startTime"]
        },
        "additionalProperties": true,

        "properties": {

          "startTime": { "title": "Start Time", "description": "The starting timestamp for this phrase, in seconds and milliseconds.", "type": "number", "pattern": "^[0-9]{1,2}.[0-9]+$" },
          "endTime": { "title": "End Time", "description": "The ending timestamp for this phrase, in seconds and milliseconds.", "type": "number", "pattern": "^[0-9]{1,2}.[0-9]+$" },
          "note": { "title": "Note", "description": "Any additional notes about this phrase.", "type": "string" },
          "speaker": { "title": "Speaker", "description": "The person who spoke this phrase. This value must match either the <code>\"name\"</code> or <code>\"abbreviation\"</code> of a <code>Participant</code> in the <code>Participants</code> array.", "type": "string" },
          "tags": {
            "title": "Tags",
            "type": "array",
            "uniqueItems": true,
            "items": { "$ref": "#/definitions/tag" }
          },

          "transcription": {

            "title": "Transcription",
            "description": "A <dfn>transcription</dfn> is a phonemic representation of the phrase in a particular orthography. The <code>\"transcription\"</code> attribute may be either a simple text string (when only one orthography is being used for transcription), or an object whose attributes are different orthographies (when multiple orthographies are being used to represent the same phrase). There must be at least one transcription specified for every phrase.",

            "oneOf": [
              {
                "description": "The single transcription for this phrase. If this option is chosen, the <code>Text</code> object must have a <code>Default Transcription</code> specified. If there are multiple translations or representations of this transcription, <code>\"transcription\"</code> should be an object instead (see the other option for the <code>Transcription</code> object).",
                "type": "string"
              },
              {
                "description": "The transcriptions for this phrase. Use this option when the phrase has multiple transcriptions in different orthographies. The <code>\"transcription\"</code> attribute in this case should be an object containing each of these different representations. The attribute of each representation should be the name of the orthography, (e.g. <code>\"MixtecPhonemic\"</code>), while the value is the transcription itself. Each phrase must have at least 1 transcription within the <code>Transcription</code> object if this option is selected.",
                "type": "object",
                "minProperties": 1,
                "patternProperties": {
                  "^[(a-z)|(A-Z)|(0-9)]+$": {
                    "type": "string",
                    "title": "Transcription",
                    "description": "The transcription for this phrase, in the particular orthography specified by the attribute. The field name is the name of the orthography.",
                    "requireSelf": true
                  }
                },
                "additionalProperties": false
              }
            ]
          },

          "translation": {
            "title": "Translation",
            "description": "The translation(s) for this phrase. There may be multiple translations per phrase, in different languages or styles (e.g. literal vs. free translations, English vs. Swahili translations, etc.). The <code>Translation</code> may either be a simple string (when there is only one translation for the phrase), or an object whose attributes are the names of different orthographies (when there are multiple translations or types of translations for the phrase).",

            "oneOf": [
              {
                "type": "string",
                "description": "The single translation for this phrase. If this option is chosen, the <code>Text</code> object must have a <code>Default Translation</code> specified. If there are multiple translations or representations of this translation, <code>\"translation\"</code> should be an object instead (see the other option for the <code>Translation</code> object)."
              },
              {
                "type": "object",
                "description": "The translations for this phrase. Use this option when the phrase has multiple translations in different orthographies or different styles. The <code>\"translation\"</code> attribute in this case should be an object containing each of these different translations. The attribute of each representation should be the name of the orthography, (e.g. <code>\"EnglishLiteral\"</code>), while the value is the translation itself. Each phrase must have at least 1 translation within the <code>Translation</code> object if this option is selected, although the value may be an empty string.",
                "minProperties": 1,
                "patternProperties": {
                  "^[(a-z)|(A-Z)|(0-9)]+$": { "type": "string", "title": "Translation", "description": "The translation for this phrase, in the particular orthography specified by the attribute. The field name is the name of the orthography.", "requireSelf": true }
                },
                "additionalProperties": false
              }
            ]
          },

          "words": {
            "type": "array",
            "items": {

              "title": "Word",
              "description": "A <dfn>word</dfn> is typically defined as the smallest freestanding unit in a language, although this unit varies depending on whether one uses phonological or syntactic criteria. A linguistic word conists of one or more morphemes. A DLX <code>Word</code> object consists minimally of a <code>'token'</code> string and an array of <code>'morphemes'</code> (even if the array is empty).",
              "type": "object",
              "required": ["morphemes", "token"],
              "additionalProperties": true,

              "properties": {

                "note": { "type": "string" },

                "glosses": {
                  "title": "Word Glosses",
                  "description": "A <dfn>word gloss</dfn> is a brief annotation of a word, morpheme, or other linguistic structure in a text. The <code>Word Glosses</code> object contains all the word-level glosses for a given word (glosses for individual morphemes within the word are provided in the <code>Morpheme</code> object; word glosses only gloss the word as a whole). The attribute (key, field name) for each gloss is the type of gloss, e.g. 'pedagogical' or 'Leipzig', while the value for the gloss is the gloss itself, e.g. '<span style='font-variant: small-caps;'>DET</span>' or 'he.eats'.",
                  "type": "object",

                  "patternProperties": {
                    "^[(a-z)|(A-Z)|(0-9)]+$": { "type": "string", "title": "Gloss" }
                  },

                  "additionalProperties": false
                },

                "token": {
                  "title": "Word Token",
                  "description": "A <dfn>word token</dfn> is an individual instance of a word in context (as opposed to an abstract <dfn>word type</dfn> or <dfn>wordform</dfn>). Like phrases, each word token can be transcribed using different orthographies or conventions. The <code>Token</code> object holds all of those transcriptions of the individual token. The <code>Token</code> object is required, and must contain at least 1 representation of the token.",
                  "type": "object",
                  "minProperties": 1,

                  "patternProperties": {
                    "^[(a-z)|(A-Z)|(0-9)]+$": { "type": "string", "title": "Representation" }
                  },

                  "additionalProperties": false
                },

                "tags": {
                  "type": "array",
                  "uniqueItems": true,
                  "items": { "$ref": "#/definitions/tag" }
                },

                "morphemes": {

                  "type": "array",
                  "uniqueItems": false,
                  "items": {

                    "title": "Morpheme",
                    "description": "A <dfn>morpheme</dfn> is generally defined as the smallest grammatical unit, or unit of meaning, in a language. Each <code>Morpheme</code> object within a <code>Text</code> represents a linguistic token of that morpheme, rather than a type. A <code>Morpheme</code> consists minimally of <code>'token'</code> and <code>'gloss'</code> strings.",
                    "type": "object",
                    "required": ["token", "glosses"],
                    "additionalProperties": true,

                    "properties": {

                      "note": { "type": "string" },

                      "token": {
                        "title": "Morpheme Token",
                        "description": "A <dfn>morpheme token</dfn> is a specific instance of a morpheme in context (as opposed to an abstract <dfn>morpheme type</dfn> that you might find in a dictionary). The <code>Morphme Token</code> object contains all the representations/transcriptions of a particular morpheme token. The <code>Morpheme Token</code> object is required, and must have at least 1 representation of the token in it.",
                        "type": "object",
                        "minProperties": 1,

                        "patternProperties": {
                          "^[(a-z)|(A-Z)|(0-9)]+$": { "type": "string", "title": "Representation" }
                        },

                        "additionalProperties": false
                      },

                      "glosses": {
                        "title": "Morpheme Glosses",
                        "description": "A <dfn>morpheme gloss</dfn> is a brief annotation of the meaning of a morpheme. The <code>Morpheme Glosses</code> object contains all the glosses for a given morpheme. The attribute (key, field name) for each gloss is the type of gloss, e.g. 'pedagogical' or 'Leipzig', while the value for the gloss is the gloss itself, e.g. '<span style='font-variant: small-caps;'>DET</span>' or 'hand' or '<span style='font-variant: small-caps;'>CAUS</span>'. Each <code>Morpheme</code> requires a gloss, even if the field is an empty string.",
                        "type": "object",
                        "minProperties": 1,

                        "patternProperties": {
                          "^[(a-z)|(A-Z)|(0-9)]+$": { "type": "string", "title": "Gloss" }
                        },

                        "additionalProperties": false
                      },

                      "tags": {
                        "type": "array",
                        "uniqueItems": true,
                        "items": { "$ref": "#/definitions/tag" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};
