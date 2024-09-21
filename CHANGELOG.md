# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/vincentdoerig/latex-css/compare/v1.12.0...master)

## [1.12.0](https://github.com/vincentdoerig/latex-css/compare/v1.11.0...v1.12.0) 2024-09-21

### Added
- Figure caption counter (#72)

### Fixed
- Replace old one-colon pseudo-element syntax in source CSS file (#70) 
- Replace unsupported image placeholder service (#71)
- Change French table caption from Tableau to Table (#73)

## [1.11.0](https://github.com/vincentdoerig/latex-css/compare/v1.10.0...v1.11.0) 2024-02-19

### Added
- Swedish language support (#65)
- Translated table caption prefix for cs (#63), da, de, es, fr, it

### Fixed
- Explicitly set `hyphens: none;` for inline code (#61)

## [1.10.0](https://github.com/vincentdoerig/latex-css/compare/v1.9.0...v1.10.0) 2023-09-22

### Added

- Allow some few customization options for table borders and column alignment (#60)
  - For custom borders: adds classes `border-<position>-<weight>` for `top`, `right`, `top`, `bottom` and `thin`/`thick` respectively. Use with the `borders-custom` class.
  - For custom column alignment: adds classes `col-<n>-l`, `col-<n>-c`, `col-<n>-r` for `n=1,...,12` and `n` being the n-th column of the table

## [1.9.0](https://github.com/vincentdoerig/latex-css/compare/v1.8.0...v1.9.0) 2023-03-06

### Added

- Use vite as build tool (#52)
- Polish language support (#49)
- First line indent for paragraphs (#50)

## [1.8.0](https://github.com/vincentdoerig/latex-css/compare/v1.7.0...v1.8.0) 2022-10-10

### Added
- Dark mode support
- Dutch language support

### Fixed
- Count-reset bug

## [1.7.1](https://github.com/vincentdoerig/latex-css/compare/v1.7.0...v1.7.1) 2022-06-06

### Fixed
- Incorrect Danish language code selector

## [1.7.0](https://github.com/vincentdoerig/latex-css/compare/v1.6.0...v1.7.0) 2022-06-06

### Fixed
- Only enable smooth scrolling when no preference is set for the `prefers-reduced-motion` media query (make accessible to those who have vestibular motion disorders)
- Rename incorrect Danish language code from `dk` to `da` (ISO 639-1)

## [1.6.0](https://github.com/vincentdoerig/latex-css/compare/v1.5.0...v1.6.0) 2022-27-01

### Added
- Slovenian language support
- Russian language support

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
- Sidenotes. See https://latex.vercel.app/#sidenotes for more information
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
