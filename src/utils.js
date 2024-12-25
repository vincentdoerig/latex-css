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

/**
 * Add simple top banner for print-friendly LaTeX.css documents
 * @param {HTMLElement} bannerHtmlContent - The message for the banner.
 */
const addTopBanner = function(bannerHtmlContent) {
  // Build the banner
  const pagedBanner = document.createElement("div");
  pagedBanner.classList.add("paged-banner");
  const pagedBannerContent = document.createElement("div");
  pagedBannerContent.classList.add("paged-banner-content");
  pagedBanner.append(pagedBannerContent);
  // Banner text
  const pagedBannerText = document.createElement("div");
  pagedBannerText.classList.add("paged-banner-text");
  pagedBannerText.append(bannerHtmlContent);
  pagedBannerContent.append(pagedBannerText);
  // Banner close button
  const pagedBannerClose = document.createElement("button");
  pagedBannerClose.id = "paged-banner-close";
  pagedBannerClose.classList.add("paged-banner-close");
  pagedBannerClose.ariaLabel = "Close";
  pagedBannerContent.append(pagedBannerClose);

  // Add the banner to the document
  const documentPages = document.querySelector(".pagedjs_pages");
  documentPages.before(pagedBanner);
  window.scrollTo(0, 0);
  document.body.classList.add("banner-displayed");

  // Remove the banner when close button is clicked
  pagedBannerClose.addEventListener('click', () => {
    pagedBanner.remove();
    document.body.classList.remove("banner-displayed");
  });

  // Remove the banner before printing (just in case)
  window.addEventListener("beforeprint", (event) => {
    const pagedBannerAdded = document.querySelector(".paged-banner");
    if (pagedBannerAdded) pagedBannerAdded.remove();
    document.body.classList.remove("banner-displayed");
  });

}

/**
 * Add warning top Banner for non-Blink based browsers
 */
const addBrowserWarn = function() {
  // Banner text
  const browserWarningText = document.createElement("span");
  browserWarningText.append(
    document.createTextNode("Print-friendly LaTeX.css documents only support "
      + "Blink-based browsers. Read more about this in "));
  const latexcssDocLink = document.createElement("a");
  // Note: Update to the correct link
  latexcssDocLink.href = "https://latex.vercel.app/#";
  latexcssDocLink.append(document.createTextNode("LaTeX.css documentation"));
  browserWarningText.append(latexcssDocLink);

  addTopBanner(browserWarningText);
}

export { scrollToTop, fixAnchorReload , addBrowserWarn };

