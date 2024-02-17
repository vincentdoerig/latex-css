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

/*
 * Footnotes:
 * It's going to be supposed that each one of the footnotes text is a children
 * of the `div#footnotes` container, and it has an `id` attribute. And the
 * identification is done by the coincidence of the `id` in footnote with the
 * `href` in some link inside `sup` element, obtaining the footnote text and
 * the footnote mark.
 * If there is a remaining HTML content inside `div#footnotes`, not identified
 * with any footnote mark, this content will be ignored/removed.
 */

/**
 * Get footnotes text from `div#footnotes` element in document.
 * @returns {Object.<string, HTMLElement>} Each keys is a footnote `id`, each value is the corresponding footnote content.
 */
const getFootnotesText = function() {
  const fnContentAll = document.querySelectorAll("div.footnotes>[id]");
  const footnotesTextObj = {};
  fnContentAll.forEach((el) => footnotesTextObj[el.id] = el);
  return footnotesTextObj;
}

/**
 * Get the corresponding document footnotes marks (the full link) for each footnote in footnotes `Div`, or `null`.
 * @param {Array.<string>} footnotesTextKeys - An array with the footnotes id's.
 * @returns {Object.<string, HTMLElement|null>} Each key is the corresponding footnote content id, the value is the footnote mark link.
 */
const getFootnotesMark = function(footnotesTextKeys) {
  const footnotesMarkObj = {};
  footnotesTextKeys.forEach((key) => {
    const footnoteMarkLink =
          document.querySelector("sup a[href=\"#" + key + "\"]");
    footnotesMarkObj[key] = footnoteMarkLink;
  });
  return footnotesMarkObj;
}

/**
 * Remove the manual marker from footnote text content.
 * @param {HTMLElement} footnoteContent - The content of the footnote.
 * @param {string} footnoteMarkContent - Text used as footnote mark.
 * @returns {boolean|Error} `true`/`false` depending on whether the footnote content is processed, and error if an invalid character has been used in footnote mark.
 */
const cleanFootnoteText = function(footnoteContent, footnoteMarkContent) {
  const START_CHARS = ["\\(", "\\[", "<", "{"].join("");
  const SEP_CHARS = [".", "-", ">", "}", "\\s", "\\)", "\\]"].join("");
  const CLEAN_CHARS =
        [["(", "\\("], [")", "\\)"], ["[", "\\["], ["]", "\\]"],
         ["*", "\\*"]];
  CLEAN_CHARS.forEach((el) => {
    footnoteMarkContent = footnoteMarkContent.replaceAll(el[0], el[1]);
  });

  // Only one match must happen. Consecutive white spaces are joined into one
  // later, so a simpler regex can be used. The regexp tries to capture the
  // text content in footnote mark until (included) an non-separator character.
  const regExpStr =
        "(\\s?[" + START_CHARS + "]?\\s?" + footnoteMarkContent + "\\s?[" +
        SEP_CHARS + "]?\\s?)[^" + SEP_CHARS + "]+?";

  const footnoteId = footnoteContent.id;
  let regExpMark;
  try {
    regExpMark = new RegExp(regExpStr);
  } catch (err) {
    const errInvalidChar = new Error("Invalid character used in footnote mark #"
                                     + footnoteContent.id + "!");
    errInvalidChar.name = "InvalidMarkCharacter";
    errInvalidChar.cause = err;
    throw errInvalidChar;
  }

  const treeWalker =
        document.createTreeWalker(footnoteContent, NodeFilter.SHOW_ALL);
  let currentNode = treeWalker.currentNode;

  const removeTextNodes = []; // Text nodes marked to be removed
  const walkedNonTextNodes = []; // Non-text nodes marked to be removed
  let footnoteMarkInText = false;
  let currentText = ""; // Aggregated text from the walked nodes

  while(currentNode) {
    let prevText = currentText;
    if (currentNode.nodeType === Node.TEXT_NODE) {
      // Remove line breaks and multiple white spaces to simplify `regExpMark`
      // Regexp for different OS line breaks: /(\r\n|\n|\r)/gm
      currentText =
        currentText + currentNode.nodeValue.replace(/(\r\n|\n|\r)/gm, "");
      currentText = currentText.replace(/\s+/gm, " ");

      if (regExpMark.test(currentText.trimStart())) {
        // If the aggregated text matches "footnote-mark"+"nonsep-character",
        // then clean the footnote mark text inside this last element.
        const textMatch = currentText.match(regExpMark);
        const textMarkPieceToRemove = textMatch[1].replace(prevText.trimStart(), "");
        currentNode.nodeValue =
          currentNode.nodeValue.replace(textMarkPieceToRemove, "").trimStart();
        footnoteMarkInText = true;
        break;
      } else {
        // If the aggregated text does not match the footnote mark, this last
        // text node is marked to be deleted, if there is finally a
        // coincidence.
        removeTextNodes.push(currentNode);
        currentNode = treeWalker.nextNode();
      }

    } else {
      // When it's not a text node (and there is no match for footnote mark
      // yet), this node is marked to be deleted, if footnote mark is finally
      // found in text.
      walkedNonTextNodes.push(currentNode);
      currentNode = treeWalker.nextNode();
    }
  } // while

  // Process (clean) footnote content, if footnote mark has been found in
  // footnote content
  if (footnoteMarkInText) {
    removeTextNodes.reverse().forEach((el) => {
      el.remove();
    });
    walkedNonTextNodes.reverse().forEach((el) => {
      if (el.childNodes.length === 0) {
        el.remove();
      }
    });
    return true;
  } else {
    console.warn("LatexCSS: footnote mark not found in footnote content for `"
                 + footnoteId + "`");
    return false;
  }
}

/**
 * Transform LaTeX.css footnotes to CSS Paged Media footnotes.
 * @returns {HTMLElement} Unmatched footnotes with their corresponding marks.
 */
const processFootnotes = function() {
  const footnotesDiv = document.querySelector("div.footnotes");
  const footnoteTextAll = getFootnotesText();
  const footnoteTextKeyAll = Object.keys(footnoteTextAll);
  const footnoteMarkAll = getFootnotesMark(footnoteTextKeyAll);

  footnoteTextKeyAll.forEach((key) => {
    if (footnoteMarkAll[key] !== null) {
      const footnoteText = footnoteTextAll[key];
      const footnoteMark = footnoteMarkAll[key].parentElement;

      // Remove footnote mark from footnote text content
      try {
        cleanFootnoteText(footnoteText, footnoteMarkAll[key].textContent);
      } catch (err) {
        console.error(err);
        console.warn("LatexCss: footnotetext #" + key + " cannot be processed");
      }

      // Build the CSS Paged Media footnote
      const pagedMediaFootnote = document.createElement("span");
      pagedMediaFootnote.classList.add("footnote");
      footnoteText.childNodes.forEach((el) => {
        // footnotesDiv will be finally removed (=> no duplicate ID's)
        pagedMediaFootnote.append(el.cloneNode(true));
      });

      // Footnote mark wrapper to preserve the original footnote mark `id`
      const pagedMediaFootnoteWrapper = document.createElement("span");
      if (footnoteMarkAll[key].id) {
        pagedMediaFootnoteWrapper.id = footnoteMarkAll[key].id;
      }
      pagedMediaFootnoteWrapper.append(pagedMediaFootnote);

      // Replace footnotemark with CSS Paged Media footnote
      footnoteMark.replaceWith(pagedMediaFootnoteWrapper);
    } else {
      console.warn("LatexCss: The footnote with id", key,
                   "does not have a matching footnote mark, and it will be ignored.");
    }
  });

  // Remove footnotes `div` element
  const footnotesDivRemoved = footnotesDiv.cloneNode(true);
  footnotesDiv.remove();
  return footnotesDivRemoved;
}

/**
 * Process LaTeX.css footnotes.
 */
const processFootnotesStartup = function() {
  return new Promise (function(resolve) {
    const footnotesRemoved = processFootnotes();
    resolve(footnotesRemoved);
  });
}

const PROMS_FUNCS = [mathjaxStartup, prismHighlight, removeImageLoading, addTocNumers,
                     processFootnotesStartup];

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

