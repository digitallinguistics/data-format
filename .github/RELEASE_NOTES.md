# v1.0.0 Release Notes

## General

- **CHANGE:** `BibliographicReference` > `BibliographicSource`
- **CHANGE:** `key` fields now allow underscores and dashes
- **CHANGE:** `references` fields renamed to `bibliography`
- **CHANGE:** `sources` fields now refer to person objects
- **NEW:** `Citation`: citations to bibliographic sources
- **DOCS:** the DLx format is compatible with [NDJSON](http://ndjson.org/) (Newline Delimited JSON)

## Access

- **NEW:** `Access.license`: the license for a resource

## BibliographicSource

- **NEW:** `BibliographicSource.citationKey`: the citation key for the source
- **NEW:** `BibliographicSource.link`: a URL to a web page where this publication may be viewed or downloaded

## Language

- **REMOVE:** `Language.additionalNames` (use `Language.exonyms` instead)
- **REMOVE:** `Language.autonym` (use `Language.autonyms` instead)
- **REMOVE:** `Language.references` (use `Language.bibliography` instead)
- **NEW:** `Language.autonyms`: a list of autonyms for the language
- **NEW:** `Language.bibliography`: citations to bibliographic sources about the language
- **NEW:** `Language.description`: description of the sociohistorical and documentary context of this language data
- **NEW:** `Language.demographics`: an array of demographic information about the language, including level of endangerment, at specific times and places
- **NEW:** `Language.exonyms`: a list of exonyms for the language

## Lexeme

- **REMOVE:** `Lexeme.references` (use `Lexeme.bibliography` instead)
- **CHANGE:** `Lexeme.sources` is now a list of people who were the source of this lexeme
- **NEW:** `Lexeme.alternativeAnalyses`: an array of alternative analyses for this lexeme, each as another Lexeme object (useful when dealing with other researchers' analyses)
- **NEW:** `Lexeme.bibliography`: citations to bibliographic sources about the lexeme
- **NEW:** `Lexeme.lexemeType`: whether the lexeme is `lexical` or `grammatical`
- **NEW:** `Lexeme.morphemeType`: the morphological type for the lexeme (e.g. `stem`, `prefix`, etc.)
- **NEW:** `Lexeme.notes.noteType`: add a new `pragmatic` option
- **DOCS:** `Lexeme.lemma`: clarify that this functions as the headword

## LexemeForm

- **REMOVE:** `LexemeForm.references` (use `LexemeForm.bibliography` instead)
- **CHANGE:** `LexemeForm.sources` is now a list of people who were the source of this lexeme form
- **NEW:** `LexemeForm.bibliography`: citations to bibliographic sources about the lexeme form
- **NEW:** `LexemeForm.usages`: a list of social usages for the given form

## Location

- **REMOVE:** `Location.references` (use `Location.bibliography` instead)
- **NEW:** `Location.bibliography`: a list of citations to bibliographic sources about this location
- **NEW:** `Location.date`: the date that the language was spoken in this location

## Morpheme

- **CHANGE:** `Morpheme.gloss` must be in CAPS for grammatical morphemes

## MultiLangString

- **CHANGE:** keys must be valid IETF language tags

## Orthography

- **NEW:** `Grapheme.description`: a learner-friendly description of the pronunciation of the grapheme
- **NEW:** `Grapheme.pronunciation`: the pronunciation(s) of the grapheme, in IPA

## Phoneme

- **REMOVE:** `Phoneme.references` (use `Phoneme.bibliography` instead)
- **NEW:** `Phoneme.bibliography`: a list of citations to bibliographic sources about the phoneme

## Note

- **CHANGE:** `Note.language` is assumed to be English if a single string
- **CHANGE:** `Note.source` is now a person or reference to a person

## Person

- **NEW:** `Person.startDate`: the date a person began contributing to documentation for a language
- **NEW:** `Person.endDate`: the date a person stopped contributing to documentation for a language

## Sense

- **REMOVE:** `Sense.references` (use `Sense.bibliography` instead)
- **CHANGE:** `Sense.sources` is now a list of people
- **NEW:** `Sense.bibliography`: a list of citations to bibliographic sources about the sense
- **NEW:** `Sense.semanticDomains`: a list of semantic domains for the sense

## Text

- **REMOVE:** `Text.references` (use `Text.bibliography` instead)
- **CHANGE:** `Text.discourseType`: may be either a String or Array
- **CHANGE:** `Text.genre`: may be either a String or Array
- **NEW:** `Text.bibliography`: a list of citations to bibliographic sources about the text

## Translation

- **REMOVE:** `Translation.translationType` (use `Utterance.translation` or `Utterance.literal` instead)
- **CHANGE:** `Translation` may be either a String (in English) or an Object
- **CHANGE:** keys must be valid IETF language tags

## Utterance

- **CHANGE:** `Utterance.translation` is for free translations only
- **CHANGE:** `Utterance.speaker` is now a reference to a person
- **NEW:** `Utterance.literal`: a literal translation of the utterance
- **NEW:** `Utterance.phonetic`: a phonetic transcription of the utterance, in IPA
- **NEW:** `Utterance.source`: a citation to the publication where the utterance was taken from

## Word

- **NEW:** `Word.analysis`: the morpheme breakdown for the word token
- **NEW:** `Word.literal`: a literal translation of the word token

## Development Changes

* use ES modules (in Node 13.x) for build scripts
* documentation for the DLx format is now at `format.digitallinguistics.io`
* docs are no longer checked into `master` branch (only `gh-pages`)
* use GitHub Actions to manage testing and publication
