// LatexCss.js library to load scripts which provide "on-load" promises, before
// Paged.js starts to process the document.
// Loads automatically Prism.js and MathJax startup configuration, if they are
// found.


var LatexCss = window.LatexCss || {};

(function() {
  let onLoadPromises = this.onLoadPromises || [];
  let removeImgLoading = this.removeImgLoading || false;
  
  // Add promise when Mathjax is found
  if (typeof MathJax !== "undefined") {
    onLoadPromises.push(MathJax.startup.promise);
  }

  
  // Add promise when Prism.js is found
  if (typeof Prism !== "undefined") {
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

    let RemoveImgLoadingPromise = function() {
      return new Promise(function(resolve) {
        let ImgElements = document.querySelectorAll("img");
        resolve(ImgElements.forEach((element) => element.removeAttribute("loading")));
      });
    }

    onLoadPromises.push(RemoveImgLoadingPromise());
  }

  // A "container" to insert ToC dotted line is needed
  let bodyDocument = document.getElementById("top");
  let bodyClasses = bodyDocument.classList;
  if (bodyClasses.contains("toc-page-numbers")) {

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

    let addTocNumbersPromise = function() {
      return new Promise(function(resolve) {
        let tocItems = document.querySelectorAll("nav li > a");
        resolve(tocItems.forEach(addTocField));
      });
    }
    onLoadPromises.push(addTocNumbersPromise());
  }
  
  // Paged.js config to start after script promises in `onLoadPromises` are loaded
  PagedConfig = {
    before: () => {
      return Promise.all(onLoadPromises);
    },
    after: () => {
      return console.log("Pagedjs script finished")
    },
  };

}).apply(LatexCss);
