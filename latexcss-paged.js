/*! LatexCss library provides some utility functions for LaTeX.css paged layout.
 * Adds automatically Prism.js and MathJax startup promises to Paged.js
 * configuration, if they are found.
 *
 * Source: https://github.com/vincentdoerig/latex-css
 * Licensed under MIT (https://github.com/vincentdoerig/latex-css/blob/master/LICENSE)
 */

var LatexCss = window.LatexCss || {};
var MathJax = window.MathJax || {};
var Prism = window.Prism || {};

// Scroll to the top of the document (to mitigate certain auto-scroll effect,
// when fixing section anchor reload issue with the function
// `LatexCss.fixAnchorReload()`)
if (location.hash) {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
}

(function() {
  const onLoadPromises = [];

  // Add promise when Mathjax is found
  if (typeof MathJax.typeset !== "undefined") {
    console.log("LatexCss: MathJax script found");
    onLoadPromises.push(MathJax.startup.promise);
  }


  // Add promise when Prism.js is found
  if (typeof Prism.highlight !== "undefined") {
    console.log("LatexCss: Prism script found");
    // Variable to salve the `resolve` from Prism.js Promise.
    let prismHighlightResolve;

    // Verify when Prism has finished to highlight all elements.
    const numCodeItems = document.querySelectorAll("[class*=language-]").length;
    let numCodeItemsProcessed = 0;

    // Promise with a deferred `resolve` trick.
    const prismHighlightPromise = new Promise(function(resolve) {
      prismHighlightResolve = resolve;
    });

    // Prisms runs a hook for every single element highlighted
    Prism.hooks.add('complete', function(env) {
      numCodeItemsProcessed++;
      if (numCodeItemsProcessed == numCodeItems) {
        prismHighlightResolve(numCodeItemsProcessed);
      };
    });

    onLoadPromises.push(prismHighlightPromise);
  };


  // Remove `loading` attribute from `img` element
  const removeImgLoadingPromise = new Promise(function(resolve) {
    const ImgElements = document.querySelectorAll("img");
    resolve(ImgElements.forEach((element) => element.removeAttribute("loading")));
  });

  onLoadPromises.push(removeImgLoadingPromise);

  // Add ToC page numbers if `toc-page-numbers` class is used in `body`
  // A "container" to insert ToC dotted line is needed
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
    onLoadPromises.push(addTocNumbersPromise);
  }

  // Make startup promises public
  this.startupPromise = Promise.all(onLoadPromises);

  // Go to section anchor (after Paged.js has been loaded, to fix section anchor
  // reload issue)
  this.fixAnchorReload = function() {
    if (location.hash) {
      const hash = location.hash;
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView();
      }
    }
  }

}).apply(LatexCss);


// Paged.js config to start after startup Promises are loaded, if `PagedConfig.before`
// has not been customized by the user.
if (typeof PagedConfig === "undefined") {
  PagedConfig = {
    before: () => {
      return LatexCss.startupPromise;
    },
    after: () => {
      // Go to section anchor after Paged.js has been loaded
      LatexCss.fixAnchorReload();
      console.log("LatexCss: Pagedjs script finished");
    },
  };
} else {
  if (typeof PagedConfig.before === "undefined") {
    PagedConfig.before = function() {
      return LatexCss.startupPromise;
    };
  }
  if (typeof PagedConfig.after === "undefined") {
    PagedConfig.after = function() {
      // Go to section anchor after Paged.js has been loaded
      LatexCss.fixAnchorReload();
      console.log("LatexCss: Pagedjs script finished");
    };
  }
}
