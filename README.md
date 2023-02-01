# LaTeX page styles

🎨 Make your HTML pages look like LaTeX documents

<div align="center">

![](https://user-images.githubusercontent.com/61068799/216159720-9ddda0c2-a3c9-4ce9-972c-4338564aec00.png)

[Live demo](https://latex.now.sh/)

</div>

📄 Really does look like a LaTeX document \
📱 Responsive on screens of all sizes \
🌐 Internationalized labels \
⚖️ 2.3 KiB minzipped[^1]

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![jsDelivr](https://img.shields.io/static/v1?style=for-the-badge&message=jsDelivr&color=E84D3D&logo=jsDelivr&logoColor=FFFFFF&label=)

If you're using a bundler like [Vite], you can install this npm package locally
and rely on your build tool to bundle it for you.

```sh
npm install latex.css
```

You can also use an npm CDN to hotload the CSS directly from the npm registry.

```html
<link rel="stylesheet" href="https://unpkg.com/latex.css" />
```

⚠️ [esm.sh] doesn't support CSS exports. If you use it, you'll need to add the
`/dist/style.css` path to the URL.

## Usage

![HTML5](https://img.shields.io/static/v1?style=for-the-badge&message=HTML5&color=E34F26&logo=HTML5&logoColor=FFFFFF&label=)
![CSS3](https://img.shields.io/static/v1?style=for-the-badge&message=CSS3&color=1572B6&logo=CSS3&logoColor=FFFFFF&label=)

After applying the CSS styles globally, there's not much left for you to do! As
long as your document is _somewhat_ basic (no nested tables, flat paragraph
structure, etc.), it should look like a LaTeX document. We do provide some
special extra class names for elements that need special styling, like the
author subtitle, abstract, lemmas, theorems, etc. You can find the [complete
index of classes] on the [docs website].

### Internationalization

We have provided some custom extension styles in the `lang/` folder for other
languages. You can apply these styles to your document by importing
`/lang/<lang>.css` in addition to the main CSS file.

```html
<link rel="stylesheet" href="https://unpkg.com/latex.css" />
<link rel="stylesheet" href="https://unpkg.com/latex.css/lang/es.css" />
```

This will change the labels of theorems, definitions, lemmas and proofs to
Spanish when the `:lang(es)` CSS pseudo-class matches. Remember to set that
`lang="es"` attribute on your `<html>` element!

You can find a [demo of supported languages] on the [docs website].

## Development

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Vite](https://img.shields.io/static/v1?style=for-the-badge&message=Vite&color=646CFF&logo=Vite&logoColor=FFFFFF&label=)

❤️ Contributions, feedback and issues are welcome! If you want to see something
improved, you can [open an Issue] or [do it yourself]!

This project is built with [Vite] and vanilla CSS. In the future we might
transition to SCSS or even SASS as our base language. Right now, though, the
important commands that are relevant to building, testing, etc. are:

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run build` | Bundle everything into the main CSS file |

## Acknowledgements

This project was originally inspired by [LatexCSS] which we used as a starting
point. From there, elements from the [modern css reset] were incorporated. We
even integrated a sidenote system based on work from the [Tufte CSS] project.
Our [HTML5 markup test page] is also based on [@cbracco]'s [HTML5 Test Page].

[^1]: Not including fonts

<!-- prettier-ignore-start -->
[vite]: https://vitejs.dev/
[esm.sh]: https://esm.sh/
[complete index of classes]: https://latex.now.sh/#class-based-elements
[docs website]: https://latex.now.sh/
[demo of supported languages]: https://latex.now.sh/languages
[latexcss]: https://github.com/davidrzs/latexcss#readme
[modern css reset]: https://andy-bell.co.uk/a-modern-css-reset/
[html5 test page]: https://github.com/cbracco/html5-test-page#readme
[tufte css]: https://edwardtufte.github.io/tufte-css/
[html5 markup test page]: https://latex.now.sh/elements
[cbracco]: https://github.com/cbracco
[open an issue]: https://github.com/vincentdoerig/latex-css/issues/new
[do it yourself]: https://github.com/vincentdoerig/latex-css/blob/main/CONTRIBUTING.md
<!-- prettier-ignore-end -->
