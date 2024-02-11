/*! LatexCss library to configure Paged.js for LaTeX.css paged layout.
 * Adds automatically Prism.js and MathJax startup promises to Paged.js
 * configuration, if they are found.
 *
 * Source: https://github.com/vincentdoerig/latex-css
 * Licensed under MIT (https://github.com/vincentdoerig/latex-css/blob/master/LICENSE)
 */

import { startupPromise } from "./startup.js";
import * as utils from "./utils.js";

// let LatexCssConfig = window.LatexCssConfig || {};

let PagedConfig = window.PagedConfig;

let LatexCss = {};
LatexCss.startupPromise = startupPromise;
LatexCss.utils = utils;
window.LatexCss = LatexCss;

// Scroll to the top of the document
utils.scrollToTop();

// Paged.js default configuration, if `PagedConfig.before` and `PagedConfig.after`
// have not been customized by the user.
// `PagedConfig` is read by Paged.js when starting; although `before` and `after`
// functions are going to be evaluated after the HTML document has been completely
// read.
if (typeof PagedConfig === "undefined") {
  window.PagedConfig = {
    before: () => {
      return startupPromise();
    },
    after: () => {
      // Go to section anchor after Paged.js has been loaded
      utils.fixAnchorReload();
      console.log("LatexCss: Pagedjs script finished");
    },
  };
} else {
  if (typeof PagedConfig.before === "undefined") {
    window.PagedConfig.before = function() {
      return startupPromise();
    };
  }
  if (typeof PagedConfig.after === "undefined") {
    window.PagedConfig.after = function() {
      // Go to section anchor after Paged.js has been loaded
      utils.fixAnchorReload();
      console.log("LatexCss: Pagedjs script finished");
    };
  }
}

