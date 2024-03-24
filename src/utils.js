/**
 * Scroll to the top of the document (to mitigate certain auto-scroll effect,
 * when fixing section anchor reload issue with the function
 * `LatexCss.fixAnchorReload()`).
 */
const scrollToTop = function() {
  if (location.hash) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }
}

/**
 * Go to section anchor (after Paged.js has been loaded, to fix section anchor
 * reload issue)
 */
const fixAnchorReload = function() {
  if (location.hash) {
    const hash = location.hash;
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView();
    }
  }
}

export { scrollToTop, fixAnchorReload };

