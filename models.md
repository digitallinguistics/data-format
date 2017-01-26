### Models & Collections

#### Language
The term *language* is interpreted broadly by DLx, and can be used to represent any language variety at a particular point in time. The DLx `Language` object groups together all the information and utilities you might need when working with a language, including writing systems, transliteration, phonological inventories, and metadata (e.g. names and language codes). See below for more details about these utilities.

###### *Orthography*
Each Language object can contain one or more *orthographies*, i.e. mappings of phonemes to graphemes (written characters). This allows you to represent your data in multiple orthographies, and in some cases automatically transliterate between them.

###### *Phonological Inventory*
Each Language object contains a phonological inventory which defines all the phonemes in the language. (**Note:** The creation of a phonological inventory is currently not automated, but rather up to the linguist's judgement. The user still has to input the phonemes themselves.)

#### Text
A *text* is any document that might be committed to a documentation archive, best conceptualized as an interlinearized text with a phonemic and perhaps other orthographic transcriptions, free translations into one or more languages, and Leipzig-style glosses on words.

#### Phrase
A *phrase* is some unit of segmentation of a text. One way to conceptualize a phrase is as a glossed example in a linguistics article. Exactly how the text is segmented is left up to the linguist: the term *phrase* is intended to be ambiguous enough to allow for different interpretations.

#### Word
A *word* in the DLx framework is an object that represents a particular token in a text, with a gloss and any other accompanying annotations. It typically includes a morpheme breakdown using hyphens `-` and equal signs `=`, and Leipzig-style morphological glosses for each morpheme.

#### Lexeme
A *lexeme* is an object containing information about a single lexical unit / construction (or even morpheme), including its base forms (different forms of the stem; different allomorphs) and all its senses.

#### Lexicon
A *lexicon* is the collection of lexemes, morphemes, or other idiosyncratic constructions that appear in a corpus.

### Data

### Utilities
