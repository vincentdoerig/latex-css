# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/vincentdoerig/latex-css/compare/v1.5.0...master)

## [1.5.0](https://github.com/vincentdoerig/latex-css/compare/v1.4.0...v1.5.0) 2020-25-12

### Added
- Hungarian language support

## [1.4.0](https://github.com/vincentdoerig/latex-css/compare/v1.3.0...v1.4.0) 2020-15-12

### Added
- [Libertinus](https://github.com/alerque/libertinus) font family as an alternative to Latin Modern. Can be used by adding a class of `libertinus` to the `<body>` element.

## [1.3.0](https://github.com/vincentdoerig/latex-css/compare/v1.2.0...v1.3.0) 2020-04-12

### Added
- PrismJS syntax highlighting theme imitating [minted](https://github.com/gpoore/minted)
- Turkish language support

## [1.2.0](https://github.com/vincentdoerig/latex-css/compare/v1.1.0...v1.2.0) 2020-08-11

### Added
- Sidenotes. See https://latex.now.sh/#sidenotes for more information
- `scroll-wrapper` class
- Add support for the following languages
  - Simplified and Traditional Chinese
  - Czech
  - Japanese

### Changed
- Tables now better represent actual LaTeX Tables
  - width auto instead of 100%
  - borders on top and bottom
  - caption styles + caption counter

### Fixed
- errors in the Italian and Romanian language files

## [1.1.0](https://github.com/vincentdoerig/latex-css/compare/v1.0.2...v1.1.0) 2020-05-24

### Added

- Add multi-language support (lemma, definition, etc. can be changed to a supported language)
- Add support for the following languages
  - Danish
  - French
  - German
  - Italian
  - Mirandese
  - Portuguese
  - Spanish
- Add 2px border on links on focus (accessibility)

## [1.0.2](https://github.com/vincentdoerig/latex-css/compare/v1.0.1...v1.0.2) - 2020-05-24

### Changed

- Remove border on `<pre>` and add more contrast to the background (https://news.ycombinator.com/item?id=23290907)
- Tweak properties for the LaTeX logo

## 1.0.1 - 2020-05-24

### Fixed

- Fix NPM package entry point
