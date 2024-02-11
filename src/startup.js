/**
 * Add promise when Mathjax is found
 */
const mathjaxStartup = function() {
  let MathJax = window.MathJax || {};
  if (typeof MathJax.typeset !== "undefined") {
    console.log("LatexCss: MathJax script found");
    return MathJax.startup.promise;
  }
}

/**
 * Add promise when Prism.js is found
 */
const prismHighlight = function() {
  let Prism = window.Prism || {};
  if (typeof Prism.highlight !== "undefined") {
    console.log("LatexCss: Prism script found");
    // Variable to save the `resolve` from Prism.js Promise.
    let prismHighlightResolve;

    // Verify when Prism has finished to highlight all elements.
    const numCodeItems = document.querySelectorAll("[class*=language-]").length;
    let numCodeItemsProcessed = 0;

    // Promise with a deferred `resolve` trick.
    const prismHighlightPromise = new Promise(function(resolve) {
      prismHighlightResolve = resolve;
    });

    // Prism runs a hook for every single element highlighted
    Prism.hooks.add('complete', function(env) {
      numCodeItemsProcessed++;
      if (numCodeItemsProcessed == numCodeItems) {
        prismHighlightResolve(numCodeItemsProcessed);
      };
    });
    return prismHighlightPromise;
  };
}

/**
 * Remove `loading` attribute from `img` elements
 */
const removeImageLoading = function() {
  const removeImgLoadingPromise = new Promise(function(resolve) {
    const ImgElements = document.querySelectorAll("img");
    resolve(ImgElements.forEach((element) => element.removeAttribute("loading")));
  });
  return removeImgLoadingPromise;
}

/**
 * Add ToC page numbers if `toc-page-numbers` class is used in `body` (adding a
 * "container" to insert ToC dotted line)
 */
const addTocNumers = function() {
  const bodyClasses = document.body.classList;
  if (bodyClasses.contains("toc-page-numbers")) {
    console.log("LatexCss: add page numbers to ToC")
    const addTocField = function (element){
      // Enclose ToC item content inside a `span` element and add other `span`
      // container to insert the dotted line; both of them inside a `div`.
      const tocItemContent = document.createElement("span");
      tocItemContent.classList.add("toc-item-content");
      element.childNodes.forEach(function(el) {
        tocItemContent.append(el);
      });
      const tocField = document.createElement("span");
      tocField.classList.add("dotted-line");
      const tocItemContainer = document.createElement("div");
      tocItemContainer.classList.add("toc-item-container");
      tocItemContainer.append(tocItemContent, tocField);
      element.textContent = "";
      element.append(tocItemContainer);
    }

    const addTocNumbersPromise = new Promise(function(resolve) {
      const tocItems = document.querySelectorAll("nav li > a");
      resolve(tocItems.forEach(addTocField));
    });
    return addTocNumbersPromise;
  }
}

const PROMS_FUNCS = [mathjaxStartup, prismHighlight, removeImageLoading, addTocNumers];

/**
 * Run all promise functions to build the list of promises that will be applied
 * @returns Single promise constructed with `Promise.all` from the list of
 *     promises applied.
 */
const startupPromise = function() {
  const onLoadPromises = [];

  PROMS_FUNCS.forEach(fun => {
    let currentPromise = fun();
    if (typeof(currentPromise) !== 'undefined') {
      onLoadPromises.push(currentPromise);
    }
  });

  return Promise.all(onLoadPromises);
}

export { startupPromise };

