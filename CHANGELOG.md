## 0.10.1

- Parse Twig block structure before formatting; mismatched or incomplete blocks now leave the document unchanged.
- Preserve unknown custom tags and paired bodies, including indentation, while formatting supported surrounding syntax.
- Keep conditional HTML wrappers working across separate Twig blocks; add shared parser regression coverage.

## 0.10.0

- Replace PrettyDiff with the source-preserving Twig formatter, fixing conditional wrappers, nested expressions, attributes and safe embedded JavaScript/CSS formatting.
- Fix live document settings, selection formatting, indentation, ignore rules and unchanged-document edits. Add worker cancellation, stale-result protection and bounded formatting time/input.
- Require VS Code 1.85+ and document obsolete PrettyDiff settings and migration defaults in README.
- Share the Twig formatter and language assets across both extension IDs while preserving their existing settings and language modes.
- Fix embedded CSS/JavaScript/SCSS scope leakage, escaped strings, compact operators, custom element names, unquoted attributes, verbatim priority and argument-free default filters.
- Fix snippet scopes and the malformed Craft assets query; allow Twig delimiter completion immediately before HTML closing tags.
- Declare untrusted and virtual workspace support and use URI-aware ignore matching.

# Changelog

All notable changes to this project will be documented in this file.

## [0.10.0] - 2026-09-08

### Changed

- Replace PrettyDiff with a source-preserving Twig/HTML formatter. Twig comparisons and nested quotes inside attributes no longer pass through an HTML-only parser.
- Preserve attribute case/order, inline text, trim controls, raw regions and custom embedded blocks. Repeated formatting is stable across the regression corpus.
- Format safely parseable JavaScript/CSS with bundled Prettier; preserve ambiguous Twig-generated bodies.
- Follow current document indentation and apply settings changes immediately. Format selections with surrounding document context and return small edits.
- Isolate formatting in a worker with cancellation, stale-result protection, a time limit and a 2 MiB input limit. Incomplete tokens return no edits.
- Deprecate PrettyDiff-only transformations. Add file ignore globs, ignore regions, `embeddedFormatting` and `formatTimeout`. See README for migration details.
- Require VS Code 1.85+. Keep the existing HTML language mode, HTML IntelliSense, file associations, syntax highlighting, snippets and hover assets. Settings remain under `twig-language.*` and support `[html]` overrides.

### Verification

- Add issue/review-derived regressions, historical source fixtures, repeated-format and literal-preservation checks, official Twig PHP lexer/render checks, and real VS Code document/selection/save tests.
- Add CI checks and verify the packaged extension independently of the development checkout.

## [0.8.0] - 2019-04-17

### Changed

- Pretty Diff formatting bug has been solved correctly

### Added

- Added many more configuration options

## [0.7.0] - 2019-04-01

### Changed

- Fixed bug that clears entire document and only leaves the script tag
- Preserved new lines
- Updated packages
- Converted extension to ES6

## [0.6.0] - 2019-02-26

### Changed

- Updated snippets for Craft CMS 3

## [0.5.1] - 2019-01-31

## Added

- Add changelog (finally)

### Changed

- Update Prettydiff package to 100.1.7

## [0.4.4] - 2019-01-05

### Changed

- Move to Pretty Diff 3
- Clean up package.json
- Refactor format selection based on Unibeautify and Prettier
- Fix extension settings to match Pretty Diff 3's option changes
- Fix tab size issue
- Update readme to be more clear about limitations of the extension

## [0.3.2] - 2018-04-02

### Changed

- Fix issues with snippes
- Refine readme documentation

## [0.2.11] - 2018-01-20

### Added

- Option to disable formatter

### Changed

- Experiment with activation events
- Fix configuration options

## [0.1.5] - 2017-11-13

### Added

- Add options for configuration in VS Code
- Format selection functionality
- Add Prettty Diff 2 as an NPM package
- Create hover features for VS Code

### Changed

- Update readme
- Fix gitignore
- Change extension.js to add configuration to Pretty Diff

### Removed

- Remove Pretty Diff 2 as a library

## [0.1.1] - 2017-11-12

### Added

- Create a comprehensive readme file
- Initial changelog
- Add Craft/Twig snippets
- Syntax highlighting for twig files
- Initialise VS Code extension using Yeoman
- Add icon for Twig Language extension
- Use Pretty Diff 2 as the primary Twig formatter
- Create extension.js file
