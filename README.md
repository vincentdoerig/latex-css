# [LaTeX.CSS](https://latex.now.sh/)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![latex.css on NPM](https://img.shields.io/npm/v/latex.css.svg?color=green&label=latex.css)](https://www.npmjs.com/package/latex.css)

> LaTeX.css is a minimal, almost class-less CSS library which makes any website look like a LaTeX document. It is based on @davidrzs' [latexCSS](https://github.com/davidrzs/latexcss).

## Getting Started

### Using the `<link>` tag

Add the following code in the head of your project.

```html
<link rel="stylesheet" href="https://latex.now.sh/style.min.css" />
```

or use a CDN like Unpkg:

```html
<link rel="stylesheet" href="https://unpkg.com/latex.css/style.min.css" />
```

### Using NPM/Yarn

NPM:

```bash
npm install latex.css
```

Yarn:

```bash
yarn add latex.css
```

Add any optional classnames to elements with special styles (author subtitle, abstract, lemmas, theorems, etc.). A list of supported class-based elements can be found [here](https://latex.now.sh/#class-based-elements).

## Languages

The labels of theorems, definitions, lemmas and proofs can be changed to other [supported languages](lang) by including the following snippet in addition to the main CSS file.

```html
<link rel="stylesheet" href="https://latex.now.sh/lang/es.css" />
```

and changing the html `lang` attribute:

```html
<html lang="es">
```

Have a look at the [language support page](https://latex.now.sh/languages) for more info and a demo of the different languages.

## Contributing

Contributions, feedback and issues are welcome. Feel free to fork, comment, critique, or submit a pull request.

## Acknowledgements

This project is based on David Zollikofer's project [latexCSS](https://github.com/davidrzs/latexcss).

Most of the CSS reset is based on Andy Bell's [Modern CSS Reset](https://hankchizljaw.com/wrote/a-modern-css-reset/).

The sample [HTML5 markup test page](https://latex.now.sh/elements) is based on [html5-test-page](https://github.com/cbracco/html5-test-page) by @cbracco.

The idea of sidenotes was taken and adpated from [Tufte CSS](https://edwardtufte.github.io/tufte-css/).

## License

This project is open source and available under the [MIT License](LICENSE).
