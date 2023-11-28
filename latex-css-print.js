// LatexCss.js library provides some utility functions for LaTeX.css printable
// design. Adds automatically Prism.js and MathJax startup promises to Paged.js 
// configuration, if they are found.

var LatexCss = window.LatexCss || {};
var MathJax = window.MathJax || {};
var Prism = window.Prism || {};

(function() {
  let onLoadPromises = [];
  let removeImgLoading = this.removeImgLoading || false;
  
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
    let prismHighlightPromise = new Promise(function(resolve) {
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
  if (removeImgLoading) {
    console.log("LatexCss: remove image `loading` attribute");
    let removeImgLoadingPromise = new Promise(function(resolve) {
      let ImgElements = document.querySelectorAll("img");
      resolve(ImgElements.forEach((element) => element.removeAttribute("loading")));
    });

    onLoadPromises.push(removeImgLoadingPromise);
  }

  // Add ToC page numbers if `toc-page-numbers` class is used in `body`
  // A "container" to insert ToC dotted line is needed
  let bodyClasses = document.body.classList;
  if (bodyClasses.contains("toc-page-numbers")) {
    console.log("LatexCss: add page numbers to ToC")
    let addTocField = function (element){
      // Enclose ToC item content inside a `span` element and add other `span`
      // container to insert the dotted line; both of them inside a `div`.
      let tocItemContent = document.createElement("span");
      tocItemContent.classList.add("toc-item-content");
      element.childNodes.forEach(function(el) {
        tocItemContent.append(el);
      });
      let tocField = document.createElement("span");
      tocField.classList.add("dotted-line");
      let tocItemContainer = document.createElement("div");
      tocItemContainer.classList.add("toc-item-container");
      tocItemContainer.append(tocItemContent, tocField);
      element.textContent = "";
      element.append(tocItemContainer);
    }

    let addTocNumbersPromise = new Promise(function(resolve) {
      let tocItems = document.querySelectorAll("nav li > a");
      resolve(tocItems.forEach(addTocField));
    });
    onLoadPromises.push(addTocNumbersPromise);
  }
  
  // Make startup promises public 
  this.startupPromise = Promise.all(onLoadPromises);

}).apply(LatexCss);


// Paged.js config to start after startup Promises are loaded, if `PagedConfig.before`
// has not been customized by the user.
if (typeof PagedConfig === "undefined") {
  PagedConfig = {
    before: () => {
      return LatexCss.startupPromise;
    },
    after: () => {
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
      console.log("LatexCss: Pagedjs script finished");
    };
  }
}
