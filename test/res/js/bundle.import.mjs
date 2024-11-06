var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb2, mod) => function __require() {
  return mod || (0, cb2[__getOwnPropNames(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/dompurify/dist/purify.js
var require_purify = __commonJS({
  "node_modules/dompurify/dist/purify.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.DOMPurify = factory());
    })(exports, function() {
      "use strict";
      const {
        entries,
        setPrototypeOf,
        isFrozen,
        getPrototypeOf,
        getOwnPropertyDescriptor
      } = Object;
      let {
        freeze,
        seal,
        create
      } = Object;
      let {
        apply,
        construct
      } = typeof Reflect !== "undefined" && Reflect;
      if (!freeze) {
        freeze = function freeze2(x2) {
          return x2;
        };
      }
      if (!seal) {
        seal = function seal2(x2) {
          return x2;
        };
      }
      if (!apply) {
        apply = function apply2(fun, thisValue, args) {
          return fun.apply(thisValue, args);
        };
      }
      if (!construct) {
        construct = function construct2(Func, args) {
          return new Func(...args);
        };
      }
      const arrayForEach = unapply(Array.prototype.forEach);
      const arrayPop = unapply(Array.prototype.pop);
      const arrayPush = unapply(Array.prototype.push);
      const stringToLowerCase = unapply(String.prototype.toLowerCase);
      const stringToString = unapply(String.prototype.toString);
      const stringMatch = unapply(String.prototype.match);
      const stringReplace = unapply(String.prototype.replace);
      const stringIndexOf = unapply(String.prototype.indexOf);
      const stringTrim = unapply(String.prototype.trim);
      const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
      const regExpTest = unapply(RegExp.prototype.test);
      const typeErrorCreate = unconstruct(TypeError);
      function unapply(func) {
        return function(thisArg) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return apply(func, thisArg, args);
        };
      }
      function unconstruct(func) {
        return function() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return construct(func, args);
        };
      }
      function addToSet(set, array) {
        let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
        if (setPrototypeOf) {
          setPrototypeOf(set, null);
        }
        let l10 = array.length;
        while (l10--) {
          let element = array[l10];
          if (typeof element === "string") {
            const lcElement = transformCaseFunc(element);
            if (lcElement !== element) {
              if (!isFrozen(array)) {
                array[l10] = lcElement;
              }
              element = lcElement;
            }
          }
          set[element] = true;
        }
        return set;
      }
      function cleanArray(array) {
        for (let index = 0; index < array.length; index++) {
          const isPropertyExist = objectHasOwnProperty(array, index);
          if (!isPropertyExist) {
            array[index] = null;
          }
        }
        return array;
      }
      function clone(object) {
        const newObject = create(null);
        for (const [property, value] of entries(object)) {
          const isPropertyExist = objectHasOwnProperty(object, property);
          if (isPropertyExist) {
            if (Array.isArray(value)) {
              newObject[property] = cleanArray(value);
            } else if (value && typeof value === "object" && value.constructor === Object) {
              newObject[property] = clone(value);
            } else {
              newObject[property] = value;
            }
          }
        }
        return newObject;
      }
      function lookupGetter(object, prop) {
        while (object !== null) {
          const desc = getOwnPropertyDescriptor(object, prop);
          if (desc) {
            if (desc.get) {
              return unapply(desc.get);
            }
            if (typeof desc.value === "function") {
              return unapply(desc.value);
            }
          }
          object = getPrototypeOf(object);
        }
        function fallbackValue() {
          return null;
        }
        return fallbackValue;
      }
      const html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
      const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
      const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
      const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
      const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
      const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
      const text = freeze(["#text"]);
      const html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
      const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
      const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
      const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
      const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
      const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
      const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
      const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
      const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
      const IS_ALLOWED_URI = seal(
        /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
        // eslint-disable-line no-useless-escape
      );
      const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
      const ATTR_WHITESPACE = seal(
        /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
        // eslint-disable-line no-control-regex
      );
      const DOCTYPE_NAME = seal(/^html$/i);
      const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
      var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        MUSTACHE_EXPR,
        ERB_EXPR,
        TMPLIT_EXPR,
        DATA_ATTR,
        ARIA_ATTR,
        IS_ALLOWED_URI,
        IS_SCRIPT_OR_DATA,
        ATTR_WHITESPACE,
        DOCTYPE_NAME,
        CUSTOM_ELEMENT
      });
      const NODE_TYPE = {
        element: 1,
        attribute: 2,
        text: 3,
        cdataSection: 4,
        entityReference: 5,
        // Deprecated
        entityNode: 6,
        // Deprecated
        progressingInstruction: 7,
        comment: 8,
        document: 9,
        documentType: 10,
        documentFragment: 11,
        notation: 12
        // Deprecated
      };
      const getGlobal = function getGlobal2() {
        return typeof window === "undefined" ? null : window;
      };
      const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
        if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
          return null;
        }
        let suffix = null;
        const ATTR_NAME = "data-tt-policy-suffix";
        if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
          suffix = purifyHostElement.getAttribute(ATTR_NAME);
        }
        const policyName = "dompurify" + (suffix ? "#" + suffix : "");
        try {
          return trustedTypes.createPolicy(policyName, {
            createHTML(html2) {
              return html2;
            },
            createScriptURL(scriptUrl) {
              return scriptUrl;
            }
          });
        } catch (_2) {
          console.warn("TrustedTypes policy " + policyName + " could not be created.");
          return null;
        }
      };
      function createDOMPurify() {
        let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
        const DOMPurify = (root) => createDOMPurify(root);
        DOMPurify.version = "3.1.7";
        DOMPurify.removed = [];
        if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document) {
          DOMPurify.isSupported = false;
          return DOMPurify;
        }
        let {
          document: document2
        } = window2;
        const originalDocument = document2;
        const currentScript = originalDocument.currentScript;
        const {
          DocumentFragment,
          HTMLTemplateElement,
          Node,
          Element: Element2,
          NodeFilter,
          NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
          HTMLFormElement,
          DOMParser,
          trustedTypes
        } = window2;
        const ElementPrototype = Element2.prototype;
        const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
        const remove = lookupGetter(ElementPrototype, "remove");
        const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
        const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
        const getParentNode = lookupGetter(ElementPrototype, "parentNode");
        if (typeof HTMLTemplateElement === "function") {
          const template2 = document2.createElement("template");
          if (template2.content && template2.content.ownerDocument) {
            document2 = template2.content.ownerDocument;
          }
        }
        let trustedTypesPolicy;
        let emptyHTML = "";
        const {
          implementation,
          createNodeIterator,
          createDocumentFragment,
          getElementsByTagName
        } = document2;
        const {
          importNode
        } = originalDocument;
        let hooks = {};
        DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
        const {
          MUSTACHE_EXPR: MUSTACHE_EXPR2,
          ERB_EXPR: ERB_EXPR2,
          TMPLIT_EXPR: TMPLIT_EXPR2,
          DATA_ATTR: DATA_ATTR2,
          ARIA_ATTR: ARIA_ATTR2,
          IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
          ATTR_WHITESPACE: ATTR_WHITESPACE2,
          CUSTOM_ELEMENT: CUSTOM_ELEMENT2
        } = EXPRESSIONS;
        let {
          IS_ALLOWED_URI: IS_ALLOWED_URI$1
        } = EXPRESSIONS;
        let ALLOWED_TAGS = null;
        const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
        let ALLOWED_ATTR = null;
        const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
        let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
          tagNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          attributeNameCheck: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: null
          },
          allowCustomizedBuiltInElements: {
            writable: true,
            configurable: false,
            enumerable: true,
            value: false
          }
        }));
        let FORBID_TAGS = null;
        let FORBID_ATTR = null;
        let ALLOW_ARIA_ATTR = true;
        let ALLOW_DATA_ATTR = true;
        let ALLOW_UNKNOWN_PROTOCOLS = false;
        let ALLOW_SELF_CLOSE_IN_ATTR = true;
        let SAFE_FOR_TEMPLATES = false;
        let SAFE_FOR_XML = true;
        let WHOLE_DOCUMENT = false;
        let SET_CONFIG = false;
        let FORCE_BODY = false;
        let RETURN_DOM = false;
        let RETURN_DOM_FRAGMENT = false;
        let RETURN_TRUSTED_TYPE = false;
        let SANITIZE_DOM = true;
        let SANITIZE_NAMED_PROPS = false;
        const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
        let KEEP_CONTENT = true;
        let IN_PLACE = false;
        let USE_PROFILES = {};
        let FORBID_CONTENTS = null;
        const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
        let DATA_URI_TAGS = null;
        const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
        let URI_SAFE_ATTRIBUTES = null;
        const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
        const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
        const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
        const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
        let NAMESPACE = HTML_NAMESPACE;
        let IS_EMPTY_INPUT = false;
        let ALLOWED_NAMESPACES = null;
        const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
        let PARSER_MEDIA_TYPE = null;
        const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
        const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
        let transformCaseFunc = null;
        let CONFIG = null;
        const formElement = document2.createElement("form");
        const isRegexOrFunction = function isRegexOrFunction2(testValue) {
          return testValue instanceof RegExp || testValue instanceof Function;
        };
        const _parseConfig = function _parseConfig2() {
          let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          if (CONFIG && CONFIG === cfg) {
            return;
          }
          if (!cfg || typeof cfg !== "object") {
            cfg = {};
          }
          cfg = clone(cfg);
          PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
          SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
          transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
          ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
          ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
          ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
          URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(
            clone(DEFAULT_URI_SAFE_ATTRIBUTES),
            // eslint-disable-line indent
            cfg.ADD_URI_SAFE_ATTR,
            // eslint-disable-line indent
            transformCaseFunc
            // eslint-disable-line indent
          ) : DEFAULT_URI_SAFE_ATTRIBUTES;
          DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(
            clone(DEFAULT_DATA_URI_TAGS),
            // eslint-disable-line indent
            cfg.ADD_DATA_URI_TAGS,
            // eslint-disable-line indent
            transformCaseFunc
            // eslint-disable-line indent
          ) : DEFAULT_DATA_URI_TAGS;
          FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
          FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
          FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
          USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
          ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
          ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
          ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
          ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
          SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
          SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
          WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
          RETURN_DOM = cfg.RETURN_DOM || false;
          RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
          RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
          FORCE_BODY = cfg.FORCE_BODY || false;
          SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
          SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
          KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
          IN_PLACE = cfg.IN_PLACE || false;
          IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
          NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
          CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
          }
          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
          }
          if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
            CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
          }
          if (SAFE_FOR_TEMPLATES) {
            ALLOW_DATA_ATTR = false;
          }
          if (RETURN_DOM_FRAGMENT) {
            RETURN_DOM = true;
          }
          if (USE_PROFILES) {
            ALLOWED_TAGS = addToSet({}, text);
            ALLOWED_ATTR = [];
            if (USE_PROFILES.html === true) {
              addToSet(ALLOWED_TAGS, html$1);
              addToSet(ALLOWED_ATTR, html);
            }
            if (USE_PROFILES.svg === true) {
              addToSet(ALLOWED_TAGS, svg$1);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }
            if (USE_PROFILES.svgFilters === true) {
              addToSet(ALLOWED_TAGS, svgFilters);
              addToSet(ALLOWED_ATTR, svg);
              addToSet(ALLOWED_ATTR, xml);
            }
            if (USE_PROFILES.mathMl === true) {
              addToSet(ALLOWED_TAGS, mathMl$1);
              addToSet(ALLOWED_ATTR, mathMl);
              addToSet(ALLOWED_ATTR, xml);
            }
          }
          if (cfg.ADD_TAGS) {
            if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
              ALLOWED_TAGS = clone(ALLOWED_TAGS);
            }
            addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
          }
          if (cfg.ADD_ATTR) {
            if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
              ALLOWED_ATTR = clone(ALLOWED_ATTR);
            }
            addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
          }
          if (cfg.ADD_URI_SAFE_ATTR) {
            addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
          }
          if (cfg.FORBID_CONTENTS) {
            if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
              FORBID_CONTENTS = clone(FORBID_CONTENTS);
            }
            addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
          }
          if (KEEP_CONTENT) {
            ALLOWED_TAGS["#text"] = true;
          }
          if (WHOLE_DOCUMENT) {
            addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
          }
          if (ALLOWED_TAGS.table) {
            addToSet(ALLOWED_TAGS, ["tbody"]);
            delete FORBID_TAGS.tbody;
          }
          if (cfg.TRUSTED_TYPES_POLICY) {
            if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
              throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
            }
            if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
              throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
            }
            trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
            emptyHTML = trustedTypesPolicy.createHTML("");
          } else {
            if (trustedTypesPolicy === void 0) {
              trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
            }
            if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
              emptyHTML = trustedTypesPolicy.createHTML("");
            }
          }
          if (freeze) {
            freeze(cfg);
          }
          CONFIG = cfg;
        };
        const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
        const HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
        const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
        const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
        const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
        const _checkValidNamespace = function _checkValidNamespace2(element) {
          let parent = getParentNode(element);
          if (!parent || !parent.tagName) {
            parent = {
              namespaceURI: NAMESPACE,
              tagName: "template"
            };
          }
          const tagName = stringToLowerCase(element.tagName);
          const parentTagName = stringToLowerCase(parent.tagName);
          if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
            return false;
          }
          if (element.namespaceURI === SVG_NAMESPACE) {
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === "svg";
            }
            if (parent.namespaceURI === MATHML_NAMESPACE) {
              return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
            }
            return Boolean(ALL_SVG_TAGS[tagName]);
          }
          if (element.namespaceURI === MATHML_NAMESPACE) {
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === "math";
            }
            if (parent.namespaceURI === SVG_NAMESPACE) {
              return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
            }
            return Boolean(ALL_MATHML_TAGS[tagName]);
          }
          if (element.namespaceURI === HTML_NAMESPACE) {
            if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
              return false;
            }
            if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
              return false;
            }
            return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
          }
          if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
            return true;
          }
          return false;
        };
        const _forceRemove = function _forceRemove2(node) {
          arrayPush(DOMPurify.removed, {
            element: node
          });
          try {
            getParentNode(node).removeChild(node);
          } catch (_2) {
            remove(node);
          }
        };
        const _removeAttribute = function _removeAttribute2(name, node) {
          try {
            arrayPush(DOMPurify.removed, {
              attribute: node.getAttributeNode(name),
              from: node
            });
          } catch (_2) {
            arrayPush(DOMPurify.removed, {
              attribute: null,
              from: node
            });
          }
          node.removeAttribute(name);
          if (name === "is" && !ALLOWED_ATTR[name]) {
            if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
              try {
                _forceRemove(node);
              } catch (_2) {
              }
            } else {
              try {
                node.setAttribute(name, "");
              } catch (_2) {
              }
            }
          }
        };
        const _initDocument = function _initDocument2(dirty) {
          let doc = null;
          let leadingWhitespace = null;
          if (FORCE_BODY) {
            dirty = "<remove></remove>" + dirty;
          } else {
            const matches = stringMatch(dirty, /^[\r\n\t ]+/);
            leadingWhitespace = matches && matches[0];
          }
          if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
            dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
          }
          const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
          if (NAMESPACE === HTML_NAMESPACE) {
            try {
              doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
            } catch (_2) {
            }
          }
          if (!doc || !doc.documentElement) {
            doc = implementation.createDocument(NAMESPACE, "template", null);
            try {
              doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
            } catch (_2) {
            }
          }
          const body = doc.body || doc.documentElement;
          if (dirty && leadingWhitespace) {
            body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
          }
          if (NAMESPACE === HTML_NAMESPACE) {
            return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
          }
          return WHOLE_DOCUMENT ? doc.documentElement : body;
        };
        const _createNodeIterator = function _createNodeIterator2(root) {
          return createNodeIterator.call(
            root.ownerDocument || root,
            root,
            // eslint-disable-next-line no-bitwise
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
            null
          );
        };
        const _isClobbered = function _isClobbered2(elm) {
          return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function" || typeof elm.hasChildNodes !== "function");
        };
        const _isNode = function _isNode2(object) {
          return typeof Node === "function" && object instanceof Node;
        };
        const _executeHook = function _executeHook2(entryPoint, currentNode, data) {
          if (!hooks[entryPoint]) {
            return;
          }
          arrayForEach(hooks[entryPoint], (hook) => {
            hook.call(DOMPurify, currentNode, data, CONFIG);
          });
        };
        const _sanitizeElements = function _sanitizeElements2(currentNode) {
          let content = null;
          _executeHook("beforeSanitizeElements", currentNode, null);
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          const tagName = transformCaseFunc(currentNode.nodeName);
          _executeHook("uponSanitizeElement", currentNode, {
            tagName,
            allowedTags: ALLOWED_TAGS
          });
          if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
            _forceRemove(currentNode);
            return true;
          }
          if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
            _forceRemove(currentNode);
            return true;
          }
          if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
            _forceRemove(currentNode);
            return true;
          }
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
                return false;
              }
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
                return false;
              }
            }
            if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
              const parentNode = getParentNode(currentNode) || currentNode.parentNode;
              const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
              if (childNodes && parentNode) {
                const childCount = childNodes.length;
                for (let i10 = childCount - 1; i10 >= 0; --i10) {
                  const childClone = cloneNode(childNodes[i10], true);
                  childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
                  parentNode.insertBefore(childClone, getNextSibling(currentNode));
                }
              }
            }
            _forceRemove(currentNode);
            return true;
          }
          if (currentNode instanceof Element2 && !_checkValidNamespace(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
            _forceRemove(currentNode);
            return true;
          }
          if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
            content = currentNode.textContent;
            arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
              content = stringReplace(content, expr, " ");
            });
            if (currentNode.textContent !== content) {
              arrayPush(DOMPurify.removed, {
                element: currentNode.cloneNode()
              });
              currentNode.textContent = content;
            }
          }
          _executeHook("afterSanitizeElements", currentNode, null);
          return false;
        };
        const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
          if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
            return false;
          }
          if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
          else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
          else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
            ) ;
            else {
              return false;
            }
          } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
          else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
          else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
          else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
          else if (value) {
            return false;
          } else ;
          return true;
        };
        const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
          return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
        };
        const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
          _executeHook("beforeSanitizeAttributes", currentNode, null);
          const {
            attributes
          } = currentNode;
          if (!attributes) {
            return;
          }
          const hookEvent = {
            attrName: "",
            attrValue: "",
            keepAttr: true,
            allowedAttributes: ALLOWED_ATTR
          };
          let l10 = attributes.length;
          while (l10--) {
            const attr = attributes[l10];
            const {
              name,
              namespaceURI,
              value: attrValue
            } = attr;
            const lcName = transformCaseFunc(name);
            let value = name === "value" ? attrValue : stringTrim(attrValue);
            hookEvent.attrName = lcName;
            hookEvent.attrValue = value;
            hookEvent.keepAttr = true;
            hookEvent.forceKeepAttr = void 0;
            _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
            value = hookEvent.attrValue;
            if (hookEvent.forceKeepAttr) {
              continue;
            }
            _removeAttribute(name, currentNode);
            if (!hookEvent.keepAttr) {
              continue;
            }
            if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
              _removeAttribute(name, currentNode);
              continue;
            }
            if (SAFE_FOR_TEMPLATES) {
              arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
                value = stringReplace(value, expr, " ");
              });
            }
            const lcTag = transformCaseFunc(currentNode.nodeName);
            if (!_isValidAttribute(lcTag, lcName, value)) {
              continue;
            }
            if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
              _removeAttribute(name, currentNode);
              value = SANITIZE_NAMED_PROPS_PREFIX + value;
            }
            if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title)/i, value)) {
              _removeAttribute(name, currentNode);
              continue;
            }
            if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
              if (namespaceURI) ;
              else {
                switch (trustedTypes.getAttributeType(lcTag, lcName)) {
                  case "TrustedHTML": {
                    value = trustedTypesPolicy.createHTML(value);
                    break;
                  }
                  case "TrustedScriptURL": {
                    value = trustedTypesPolicy.createScriptURL(value);
                    break;
                  }
                }
              }
            }
            try {
              if (namespaceURI) {
                currentNode.setAttributeNS(namespaceURI, name, value);
              } else {
                currentNode.setAttribute(name, value);
              }
              if (_isClobbered(currentNode)) {
                _forceRemove(currentNode);
              } else {
                arrayPop(DOMPurify.removed);
              }
            } catch (_2) {
            }
          }
          _executeHook("afterSanitizeAttributes", currentNode, null);
        };
        const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
          let shadowNode = null;
          const shadowIterator = _createNodeIterator(fragment);
          _executeHook("beforeSanitizeShadowDOM", fragment, null);
          while (shadowNode = shadowIterator.nextNode()) {
            _executeHook("uponSanitizeShadowNode", shadowNode, null);
            if (_sanitizeElements(shadowNode)) {
              continue;
            }
            if (shadowNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM2(shadowNode.content);
            }
            _sanitizeAttributes(shadowNode);
          }
          _executeHook("afterSanitizeShadowDOM", fragment, null);
        };
        DOMPurify.sanitize = function(dirty) {
          let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          let body = null;
          let importedNode = null;
          let currentNode = null;
          let returnNode = null;
          IS_EMPTY_INPUT = !dirty;
          if (IS_EMPTY_INPUT) {
            dirty = "<!-->";
          }
          if (typeof dirty !== "string" && !_isNode(dirty)) {
            if (typeof dirty.toString === "function") {
              dirty = dirty.toString();
              if (typeof dirty !== "string") {
                throw typeErrorCreate("dirty is not a string, aborting");
              }
            } else {
              throw typeErrorCreate("toString is not a function");
            }
          }
          if (!DOMPurify.isSupported) {
            return dirty;
          }
          if (!SET_CONFIG) {
            _parseConfig(cfg);
          }
          DOMPurify.removed = [];
          if (typeof dirty === "string") {
            IN_PLACE = false;
          }
          if (IN_PLACE) {
            if (dirty.nodeName) {
              const tagName = transformCaseFunc(dirty.nodeName);
              if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
              }
            }
          } else if (dirty instanceof Node) {
            body = _initDocument("<!---->");
            importedNode = body.ownerDocument.importNode(dirty, true);
            if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
              body = importedNode;
            } else if (importedNode.nodeName === "HTML") {
              body = importedNode;
            } else {
              body.appendChild(importedNode);
            }
          } else {
            if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
            dirty.indexOf("<") === -1) {
              return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
            }
            body = _initDocument(dirty);
            if (!body) {
              return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
            }
          }
          if (body && FORCE_BODY) {
            _forceRemove(body.firstChild);
          }
          const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
          while (currentNode = nodeIterator.nextNode()) {
            if (_sanitizeElements(currentNode)) {
              continue;
            }
            if (currentNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM(currentNode.content);
            }
            _sanitizeAttributes(currentNode);
          }
          if (IN_PLACE) {
            return dirty;
          }
          if (RETURN_DOM) {
            if (RETURN_DOM_FRAGMENT) {
              returnNode = createDocumentFragment.call(body.ownerDocument);
              while (body.firstChild) {
                returnNode.appendChild(body.firstChild);
              }
            } else {
              returnNode = body;
            }
            if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
              returnNode = importNode.call(originalDocument, returnNode, true);
            }
            return returnNode;
          }
          let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
          if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
            serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
          }
          if (SAFE_FOR_TEMPLATES) {
            arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
              serializedHTML = stringReplace(serializedHTML, expr, " ");
            });
          }
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
        };
        DOMPurify.setConfig = function() {
          let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          _parseConfig(cfg);
          SET_CONFIG = true;
        };
        DOMPurify.clearConfig = function() {
          CONFIG = null;
          SET_CONFIG = false;
        };
        DOMPurify.isValidAttribute = function(tag, attr, value) {
          if (!CONFIG) {
            _parseConfig({});
          }
          const lcTag = transformCaseFunc(tag);
          const lcName = transformCaseFunc(attr);
          return _isValidAttribute(lcTag, lcName, value);
        };
        DOMPurify.addHook = function(entryPoint, hookFunction) {
          if (typeof hookFunction !== "function") {
            return;
          }
          hooks[entryPoint] = hooks[entryPoint] || [];
          arrayPush(hooks[entryPoint], hookFunction);
        };
        DOMPurify.removeHook = function(entryPoint) {
          if (hooks[entryPoint]) {
            return arrayPop(hooks[entryPoint]);
          }
        };
        DOMPurify.removeHooks = function(entryPoint) {
          if (hooks[entryPoint]) {
            hooks[entryPoint] = [];
          }
        };
        DOMPurify.removeAllHooks = function() {
          hooks = {};
        };
        return DOMPurify;
      }
      var purify = createDOMPurify();
      return purify;
    });
  }
});

// test/res/js/src/utils/get-element-containing-text.mjs
function getElementContainingText(text, container2) {
  if (typeof container2 === "undefined") {
    container2 = document.body;
  }
  for (let i10 = 0; i10 < container2.children.length; i10++) {
    const child = container2.children[i10];
    if (child.textContent.includes(text)) {
      return getElementContainingText(text, child);
    }
  }
  if (container2.textContent.includes(text)) {
    return container2;
  }
  return null;
}

// test/res/js/src/actions/click.mjs
async function click(value, classname) {
  if (value) value = value.toString();
  let errorMessage = "No clickable elements were found";
  if (value) errorMessage += ` containing the value "${value}"`;
  if (classname) errorMessage += ` with class "${classname}"`;
  errorMessage += "!";
  let options = [];
  if (classname) {
    const els = Array.from(document.getElementsByClassName(classname));
    options = options.concat(els);
  } else if (value) {
    const el2 = getElementContainingText(value);
    if (el2) options.push(el2);
  }
  if (options.length === 0) {
    console.warn(errorMessage);
    return;
  }
  if (value) {
    options = options.filter((el2) => el2.textContent.includes(value));
  }
  if (options.length > 0) {
    const input = options[0];
    $(input).trigger("click");
    console.log(
      [
        "clicking on element",
        value ? `containing value "${value}"` : "",
        classname ? `with class "${classname}"` : ""
      ].join(" ").trim() + "..."
    );
  } else {
    console.warn(errorMessage);
    return;
  }
}

// test/res/js/src/utils/get-text-input-elements.mjs
function getTextInputElements(container2) {
  if (typeof container2 === "undefined") {
    container2 = document.body;
  }
  const out = [];
  const tagName = container2.tagName.toLowerCase();
  if (tagName === "input" && container2.getAttribute("type") === "text") {
    out.push(container2);
  }
  if (tagName === "textarea") {
    out.push(container2);
  }
  for (let i10 = 0; i10 < container2.children.length; i10++) {
    const child = container2.children[i10];
    const results = getTextInputElements(child);
    results.forEach((el2) => out.push(el2));
  }
  return out;
}

// test/res/js/src/actions/enter-text.mjs
async function enterText(text) {
  const textString = text.toString();
  const textInputElements = getTextInputElements();
  if (textInputElements.length === 0) {
    console.warn(
      "No text input fields were found in which to put value:",
      textString
    );
    return;
  }
  const element = textInputElements[0];
  textInputElements.splice(0, 1);
  element.value = textString;
  $(element).trigger("input");
  console.log("entering text:", textString);
}

// node_modules/@jrc03c/pause/dist/pause.import.mjs
function pauseAsync(ms) {
  return new Promise((resolve, reject) => {
    try {
      const start = /* @__PURE__ */ new Date();
      return setTimeout(() => resolve(/* @__PURE__ */ new Date() - start), ms);
    } catch (e10) {
      return reject(e10);
    }
  });
}
function pauseSync(ms) {
  const start = /* @__PURE__ */ new Date();
  let now = /* @__PURE__ */ new Date();
  while (now - start < ms) {
    now = /* @__PURE__ */ new Date();
  }
  return /* @__PURE__ */ new Date() - start;
}
if (typeof window !== "undefined") {
  window.pause = pauseAsync;
  window.pauseAsync = pauseAsync;
  window.pauseSync = pauseSync;
}

// test/res/js/src/actions/select-slider-value.mjs
function remap(x2, a10, b2, c10, d2) {
  return c10 + (d2 - c10) * (x2 - a10) / (b2 - a10);
}
async function selectSliderValue(value, selector) {
  console.log("selecting slider value:", value);
  selector = selector || ".slider";
  let slider = document.querySelector(selector);
  while (!slider) {
    await pauseAsync(100);
    slider = document.querySelector(selector);
  }
  let handle = slider.querySelector(".slider-handle");
  while (!handle) {
    await pauseAsync(100);
    handle = slider.querySelector(".slider-handle");
  }
  let min = handle.getAttribute("aria-valuemin");
  let max = handle.getAttribute("aria-valuemax");
  try {
    min = JSON.parse(min);
  } catch (e10) {
  }
  try {
    max = JSON.parse(max);
  } catch (e10) {
  }
  const sliderRect = slider.getBoundingClientRect();
  const x2 = remap(
    value,
    min,
    max,
    sliderRect.x,
    sliderRect.x + sliderRect.width
  );
  const y2 = sliderRect.y + sliderRect.height / 2;
  const tooltip = slider.querySelector(".tooltip");
  const tooltipInner = tooltip.querySelector(".tooltip-inner");
  const sliderSelection = slider.querySelector(".slider-selection");
  const sliderTrackHigh = slider.querySelector(".slider-track-high");
  const percent = 100 * (value - min) / (max - min);
  handle.style.left = percent.toFixed(2) + "%";
  tooltip.style.left = percent.toFixed(2) + "%";
  sliderSelection.style.width = percent.toFixed(2) + "%";
  sliderTrackHigh.width = (100 - percent).toFixed(2) + "%";
  tooltipInner.textContent = value.toFixed(2);
  const callback = () => {
    try {
      slider.dispatchEvent(
        new MouseEvent("mousedown", { clientX: x2, clientY: y2 })
      );
    } catch (e10) {
    }
    $(window).off("before-submit-responses", callback);
  };
  $(window).on("before-submit-responses", callback);
}

// node_modules/vue/dist/vue.esm-browser.prod.js
var e;
var t;
var n;
var r;
var i;
var l;
var s;
var o;
var a;
var c;
var u;
var d;
var p;
function f(e10) {
  let t10 = /* @__PURE__ */ Object.create(null);
  for (let n10 of e10.split(",")) t10[n10] = 1;
  return (e11) => e11 in t10;
}
var h = {};
var m = [];
var g = () => {
};
var y = () => false;
var b = (e10) => 111 === e10.charCodeAt(0) && 110 === e10.charCodeAt(1) && (e10.charCodeAt(2) > 122 || 97 > e10.charCodeAt(2));
var _ = (e10) => e10.startsWith("onUpdate:");
var S = Object.assign;
var x = (e10, t10) => {
  let n10 = e10.indexOf(t10);
  n10 > -1 && e10.splice(n10, 1);
};
var C = Object.prototype.hasOwnProperty;
var T = (e10, t10) => C.call(e10, t10);
var k = Array.isArray;
var w = (e10) => "[object Map]" === L(e10);
var N = (e10) => "[object Set]" === L(e10);
var E = (e10) => "[object Date]" === L(e10);
var A = (e10) => "[object RegExp]" === L(e10);
var R = (e10) => "function" == typeof e10;
var I = (e10) => "string" == typeof e10;
var O = (e10) => "symbol" == typeof e10;
var P = (e10) => null !== e10 && "object" == typeof e10;
var M = (e10) => (P(e10) || R(e10)) && R(e10.then) && R(e10.catch);
var D = Object.prototype.toString;
var L = (e10) => D.call(e10);
var $2 = (e10) => L(e10).slice(8, -1);
var F = (e10) => "[object Object]" === L(e10);
var V = (e10) => I(e10) && "NaN" !== e10 && "-" !== e10[0] && "" + parseInt(e10, 10) === e10;
var B = /* @__PURE__ */ f(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
var U = /* @__PURE__ */ f("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
var j = (e10) => {
  let t10 = /* @__PURE__ */ Object.create(null);
  return (n10) => t10[n10] || (t10[n10] = e10(n10));
};
var H = /-(\w)/g;
var q = j((e10) => e10.replace(H, (e11, t10) => t10 ? t10.toUpperCase() : ""));
var W = /\B([A-Z])/g;
var K = j((e10) => e10.replace(W, "-$1").toLowerCase());
var z = j((e10) => e10.charAt(0).toUpperCase() + e10.slice(1));
var J = j((e10) => e10 ? `on${z(e10)}` : "");
var G = (e10, t10) => !Object.is(e10, t10);
var Q = (e10, ...t10) => {
  for (let n10 = 0; n10 < e10.length; n10++) e10[n10](...t10);
};
var X = (e10, t10, n10, r10 = false) => {
  Object.defineProperty(e10, t10, { configurable: true, enumerable: false, writable: r10, value: n10 });
};
var Z = (e10) => {
  let t10 = parseFloat(e10);
  return isNaN(t10) ? e10 : t10;
};
var Y = (e10) => {
  let t10 = I(e10) ? Number(e10) : NaN;
  return isNaN(t10) ? e10 : t10;
};
var ee = () => e || (e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {});
var et = /* @__PURE__ */ f("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol");
function en(e10) {
  if (k(e10)) {
    let t10 = {};
    for (let n10 = 0; n10 < e10.length; n10++) {
      let r10 = e10[n10], i10 = I(r10) ? es(r10) : en(r10);
      if (i10) for (let e11 in i10) t10[e11] = i10[e11];
    }
    return t10;
  }
  if (I(e10) || P(e10)) return e10;
}
var er = /;(?![^(]*\))/g;
var ei = /:([^]+)/;
var el = /\/\*[^]*?\*\//g;
function es(e10) {
  let t10 = {};
  return e10.replace(el, "").split(er).forEach((e11) => {
    if (e11) {
      let n10 = e11.split(ei);
      n10.length > 1 && (t10[n10[0].trim()] = n10[1].trim());
    }
  }), t10;
}
function eo(e10) {
  let t10 = "";
  if (I(e10)) t10 = e10;
  else if (k(e10)) for (let n10 = 0; n10 < e10.length; n10++) {
    let r10 = eo(e10[n10]);
    r10 && (t10 += r10 + " ");
  }
  else if (P(e10)) for (let n10 in e10) e10[n10] && (t10 += n10 + " ");
  return t10.trim();
}
function ea(e10) {
  if (!e10) return null;
  let { class: t10, style: n10 } = e10;
  return t10 && !I(t10) && (e10.class = eo(t10)), n10 && (e10.style = en(n10)), e10;
}
var ec = /* @__PURE__ */ f("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot");
var eu = /* @__PURE__ */ f("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view");
var ed = /* @__PURE__ */ f("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics");
var ep = /* @__PURE__ */ f("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr");
var ef = /* @__PURE__ */ f("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");
function eh(e10, t10) {
  if (e10 === t10) return true;
  let n10 = E(e10), r10 = E(t10);
  if (n10 || r10) return !!n10 && !!r10 && e10.getTime() === t10.getTime();
  if (n10 = O(e10), r10 = O(t10), n10 || r10) return e10 === t10;
  if (n10 = k(e10), r10 = k(t10), n10 || r10) return !!n10 && !!r10 && function(e11, t11) {
    if (e11.length !== t11.length) return false;
    let n11 = true;
    for (let r11 = 0; n11 && r11 < e11.length; r11++) n11 = eh(e11[r11], t11[r11]);
    return n11;
  }(e10, t10);
  if (n10 = P(e10), r10 = P(t10), n10 || r10) {
    if (!n10 || !r10 || Object.keys(e10).length !== Object.keys(t10).length) return false;
    for (let n11 in e10) {
      let r11 = e10.hasOwnProperty(n11), i10 = t10.hasOwnProperty(n11);
      if (r11 && !i10 || !r11 && i10 || !eh(e10[n11], t10[n11])) return false;
    }
  }
  return String(e10) === String(t10);
}
function em(e10, t10) {
  return e10.findIndex((e11) => eh(e11, t10));
}
var eg = (e10) => !!(e10 && true === e10.__v_isRef);
var ey = (e10) => I(e10) ? e10 : null == e10 ? "" : k(e10) || P(e10) && (e10.toString === D || !R(e10.toString)) ? eg(e10) ? ey(e10.value) : JSON.stringify(e10, ev, 2) : String(e10);
var ev = (e10, t10) => eg(t10) ? ev(e10, t10.value) : w(t10) ? { [`Map(${t10.size})`]: [...t10.entries()].reduce((e11, [t11, n10], r10) => (e11[eb(t11, r10) + " =>"] = n10, e11), {}) } : N(t10) ? { [`Set(${t10.size})`]: [...t10.values()].map((e11) => eb(e11)) } : O(t10) ? eb(t10) : !P(t10) || k(t10) || F(t10) ? t10 : String(t10);
var eb = (e10, t10 = "") => {
  var n10;
  return O(e10) ? `Symbol(${null != (n10 = e10.description) ? n10 : t10})` : e10;
};
var e_ = class {
  constructor(e10 = false) {
    this.detached = e10, this._active = true, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = t, !e10 && t && (this.index = (t.scopes || (t.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      let e10, t10;
      if (this._isPaused = true, this.scopes) for (e10 = 0, t10 = this.scopes.length; e10 < t10; e10++) this.scopes[e10].pause();
      for (e10 = 0, t10 = this.effects.length; e10 < t10; e10++) this.effects[e10].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      let e10, t10;
      if (this._isPaused = false, this.scopes) for (e10 = 0, t10 = this.scopes.length; e10 < t10; e10++) this.scopes[e10].resume();
      for (e10 = 0, t10 = this.effects.length; e10 < t10; e10++) this.effects[e10].resume();
    }
  }
  run(e10) {
    if (this._active) {
      let n10 = t;
      try {
        return t = this, e10();
      } finally {
        t = n10;
      }
    }
  }
  on() {
    t = this;
  }
  off() {
    t = this.parent;
  }
  stop(e10) {
    if (this._active) {
      let t10, n10;
      for (t10 = 0, n10 = this.effects.length; t10 < n10; t10++) this.effects[t10].stop();
      for (t10 = 0, n10 = this.cleanups.length; t10 < n10; t10++) this.cleanups[t10]();
      if (this.scopes) for (t10 = 0, n10 = this.scopes.length; t10 < n10; t10++) this.scopes[t10].stop(true);
      if (!this.detached && this.parent && !e10) {
        let e11 = this.parent.scopes.pop();
        e11 && e11 !== this && (this.parent.scopes[this.index] = e11, e11.index = this.index);
      }
      this.parent = void 0, this._active = false;
    }
  }
};
function eS(e10) {
  return new e_(e10);
}
function ex() {
  return t;
}
function eC(e10, n10 = false) {
  t && t.cleanups.push(e10);
}
var eT = /* @__PURE__ */ new WeakSet();
var ek = class {
  constructor(e10) {
    this.fn = e10, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, t && t.active && t.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    64 & this.flags && (this.flags &= -65, eT.has(this) && (eT.delete(this), this.trigger()));
  }
  notify() {
    (!(2 & this.flags) || 32 & this.flags) && (8 & this.flags || eN(this));
  }
  run() {
    if (!(1 & this.flags)) return this.fn();
    this.flags |= 2, eB(this), eA(this);
    let e10 = n, t10 = eL;
    n = this, eL = true;
    try {
      return this.fn();
    } finally {
      eR(this), n = e10, eL = t10, this.flags &= -3;
    }
  }
  stop() {
    if (1 & this.flags) {
      for (let e10 = this.deps; e10; e10 = e10.nextDep) eP(e10);
      this.deps = this.depsTail = void 0, eB(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    64 & this.flags ? eT.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    eI(this) && this.run();
  }
  get dirty() {
    return eI(this);
  }
};
var ew = 0;
function eN(e10, t10 = false) {
  if (e10.flags |= 8, t10) {
    e10.next = i, i = e10;
    return;
  }
  e10.next = r, r = e10;
}
function eE() {
  let e10;
  if (!(--ew > 0)) {
    if (i) {
      let e11 = i;
      for (i = void 0; e11; ) {
        let t10 = e11.next;
        e11.next = void 0, e11.flags &= -9, e11 = t10;
      }
    }
    for (; r; ) {
      let t10 = r;
      for (r = void 0; t10; ) {
        let n10 = t10.next;
        if (t10.next = void 0, t10.flags &= -9, 1 & t10.flags) try {
          t10.trigger();
        } catch (t11) {
          e10 || (e10 = t11);
        }
        t10 = n10;
      }
    }
    if (e10) throw e10;
  }
}
function eA(e10) {
  for (let t10 = e10.deps; t10; t10 = t10.nextDep) t10.version = -1, t10.prevActiveLink = t10.dep.activeLink, t10.dep.activeLink = t10;
}
function eR(e10) {
  let t10;
  let n10 = e10.depsTail, r10 = n10;
  for (; r10; ) {
    let e11 = r10.prevDep;
    -1 === r10.version ? (r10 === n10 && (n10 = e11), eP(r10), function(e12) {
      let { prevDep: t11, nextDep: n11 } = e12;
      t11 && (t11.nextDep = n11, e12.prevDep = void 0), n11 && (n11.prevDep = t11, e12.nextDep = void 0);
    }(r10)) : t10 = r10, r10.dep.activeLink = r10.prevActiveLink, r10.prevActiveLink = void 0, r10 = e11;
  }
  e10.deps = t10, e10.depsTail = n10;
}
function eI(e10) {
  for (let t10 = e10.deps; t10; t10 = t10.nextDep) if (t10.dep.version !== t10.version || t10.dep.computed && (eO(t10.dep.computed) || t10.dep.version !== t10.version)) return true;
  return !!e10._dirty;
}
function eO(e10) {
  if (4 & e10.flags && !(16 & e10.flags) || (e10.flags &= -17, e10.globalVersion === eU)) return;
  e10.globalVersion = eU;
  let t10 = e10.dep;
  if (e10.flags |= 2, t10.version > 0 && !e10.isSSR && e10.deps && !eI(e10)) {
    e10.flags &= -3;
    return;
  }
  let r10 = n, i10 = eL;
  n = e10, eL = true;
  try {
    eA(e10);
    let n10 = e10.fn(e10._value);
    (0 === t10.version || G(n10, e10._value)) && (e10._value = n10, t10.version++);
  } catch (e11) {
    throw t10.version++, e11;
  } finally {
    n = r10, eL = i10, eR(e10), e10.flags &= -3;
  }
}
function eP(e10, t10 = false) {
  let { dep: n10, prevSub: r10, nextSub: i10 } = e10;
  if (r10 && (r10.nextSub = i10, e10.prevSub = void 0), i10 && (i10.prevSub = r10, e10.nextSub = void 0), n10.subs === e10 && (n10.subs = r10, !r10 && n10.computed)) {
    n10.computed.flags &= -5;
    for (let e11 = n10.computed.deps; e11; e11 = e11.nextDep) eP(e11, true);
  }
  t10 || --n10.sc || !n10.map || n10.map.delete(n10.key);
}
function eM(e10, t10) {
  e10.effect instanceof ek && (e10 = e10.effect.fn);
  let n10 = new ek(e10);
  t10 && S(n10, t10);
  try {
    n10.run();
  } catch (e11) {
    throw n10.stop(), e11;
  }
  let r10 = n10.run.bind(n10);
  return r10.effect = n10, r10;
}
function eD(e10) {
  e10.effect.stop();
}
var eL = true;
var e$ = [];
function eF() {
  e$.push(eL), eL = false;
}
function eV() {
  let e10 = e$.pop();
  eL = void 0 === e10 || e10;
}
function eB(e10) {
  let { cleanup: t10 } = e10;
  if (e10.cleanup = void 0, t10) {
    let e11 = n;
    n = void 0;
    try {
      t10();
    } finally {
      n = e11;
    }
  }
}
var eU = 0;
var ej = class {
  constructor(e10, t10) {
    this.sub = e10, this.dep = t10, this.version = t10.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
};
var eH = class {
  constructor(e10) {
    this.computed = e10, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(e10) {
    if (!n || !eL || n === this.computed) return;
    let t10 = this.activeLink;
    if (void 0 === t10 || t10.sub !== n) t10 = this.activeLink = new ej(n, this), n.deps ? (t10.prevDep = n.depsTail, n.depsTail.nextDep = t10, n.depsTail = t10) : n.deps = n.depsTail = t10, function e11(t11) {
      if (t11.dep.sc++, 4 & t11.sub.flags) {
        let n10 = t11.dep.computed;
        if (n10 && !t11.dep.subs) {
          n10.flags |= 20;
          for (let t12 = n10.deps; t12; t12 = t12.nextDep) e11(t12);
        }
        let r10 = t11.dep.subs;
        r10 !== t11 && (t11.prevSub = r10, r10 && (r10.nextSub = t11)), t11.dep.subs = t11;
      }
    }(t10);
    else if (-1 === t10.version && (t10.version = this.version, t10.nextDep)) {
      let e11 = t10.nextDep;
      e11.prevDep = t10.prevDep, t10.prevDep && (t10.prevDep.nextDep = e11), t10.prevDep = n.depsTail, t10.nextDep = void 0, n.depsTail.nextDep = t10, n.depsTail = t10, n.deps === t10 && (n.deps = e11);
    }
    return t10;
  }
  trigger(e10) {
    this.version++, eU++, this.notify(e10);
  }
  notify(e10) {
    ew++;
    try {
      for (let e11 = this.subs; e11; e11 = e11.prevSub) e11.sub.notify() && e11.sub.dep.notify();
    } finally {
      eE();
    }
  }
};
var eq = /* @__PURE__ */ new WeakMap();
var eW = Symbol("");
var eK = Symbol("");
var ez = Symbol("");
function eJ(e10, t10, r10) {
  if (eL && n) {
    let t11 = eq.get(e10);
    t11 || eq.set(e10, t11 = /* @__PURE__ */ new Map());
    let n10 = t11.get(r10);
    n10 || (t11.set(r10, n10 = new eH()), n10.map = t11, n10.key = r10), n10.track();
  }
}
function eG(e10, t10, n10, r10, i10, l10) {
  let s10 = eq.get(e10);
  if (!s10) {
    eU++;
    return;
  }
  let o10 = (e11) => {
    e11 && e11.trigger();
  };
  if (ew++, "clear" === t10) s10.forEach(o10);
  else {
    let i11 = k(e10), l11 = i11 && V(n10);
    if (i11 && "length" === n10) {
      let e11 = Number(r10);
      s10.forEach((t11, n11) => {
        ("length" === n11 || n11 === ez || !O(n11) && n11 >= e11) && o10(t11);
      });
    } else switch ((void 0 !== n10 || s10.has(void 0)) && o10(s10.get(n10)), l11 && o10(s10.get(ez)), t10) {
      case "add":
        i11 ? l11 && o10(s10.get("length")) : (o10(s10.get(eW)), w(e10) && o10(s10.get(eK)));
        break;
      case "delete":
        !i11 && (o10(s10.get(eW)), w(e10) && o10(s10.get(eK)));
        break;
      case "set":
        w(e10) && o10(s10.get(eW));
    }
  }
  eE();
}
function eQ(e10) {
  let t10 = tw(e10);
  return t10 === e10 ? t10 : (eJ(t10, "iterate", ez), tT(e10) ? t10 : t10.map(tE));
}
function eX(e10) {
  return eJ(e10 = tw(e10), "iterate", ez), e10;
}
var eZ = { __proto__: null, [Symbol.iterator]() {
  return eY(this, Symbol.iterator, tE);
}, concat(...e10) {
  return eQ(this).concat(...e10.map((e11) => k(e11) ? eQ(e11) : e11));
}, entries() {
  return eY(this, "entries", (e10) => (e10[1] = tE(e10[1]), e10));
}, every(e10, t10) {
  return e1(this, "every", e10, t10, void 0, arguments);
}, filter(e10, t10) {
  return e1(this, "filter", e10, t10, (e11) => e11.map(tE), arguments);
}, find(e10, t10) {
  return e1(this, "find", e10, t10, tE, arguments);
}, findIndex(e10, t10) {
  return e1(this, "findIndex", e10, t10, void 0, arguments);
}, findLast(e10, t10) {
  return e1(this, "findLast", e10, t10, tE, arguments);
}, findLastIndex(e10, t10) {
  return e1(this, "findLastIndex", e10, t10, void 0, arguments);
}, forEach(e10, t10) {
  return e1(this, "forEach", e10, t10, void 0, arguments);
}, includes(...e10) {
  return e6(this, "includes", e10);
}, indexOf(...e10) {
  return e6(this, "indexOf", e10);
}, join(e10) {
  return eQ(this).join(e10);
}, lastIndexOf(...e10) {
  return e6(this, "lastIndexOf", e10);
}, map(e10, t10) {
  return e1(this, "map", e10, t10, void 0, arguments);
}, pop() {
  return e3(this, "pop");
}, push(...e10) {
  return e3(this, "push", e10);
}, reduce(e10, ...t10) {
  return e2(this, "reduce", e10, t10);
}, reduceRight(e10, ...t10) {
  return e2(this, "reduceRight", e10, t10);
}, shift() {
  return e3(this, "shift");
}, some(e10, t10) {
  return e1(this, "some", e10, t10, void 0, arguments);
}, splice(...e10) {
  return e3(this, "splice", e10);
}, toReversed() {
  return eQ(this).toReversed();
}, toSorted(e10) {
  return eQ(this).toSorted(e10);
}, toSpliced(...e10) {
  return eQ(this).toSpliced(...e10);
}, unshift(...e10) {
  return e3(this, "unshift", e10);
}, values() {
  return eY(this, "values", tE);
} };
function eY(e10, t10, n10) {
  let r10 = eX(e10), i10 = r10[t10]();
  return r10 === e10 || tT(e10) || (i10._next = i10.next, i10.next = () => {
    let e11 = i10._next();
    return e11.value && (e11.value = n10(e11.value)), e11;
  }), i10;
}
var e0 = Array.prototype;
function e1(e10, t10, n10, r10, i10, l10) {
  let s10 = eX(e10), o10 = s10 !== e10 && !tT(e10), a10 = s10[t10];
  if (a10 !== e0[t10]) {
    let t11 = a10.apply(e10, l10);
    return o10 ? tE(t11) : t11;
  }
  let c10 = n10;
  s10 !== e10 && (o10 ? c10 = function(t11, r11) {
    return n10.call(this, tE(t11), r11, e10);
  } : n10.length > 2 && (c10 = function(t11, r11) {
    return n10.call(this, t11, r11, e10);
  }));
  let u2 = a10.call(s10, c10, r10);
  return o10 && i10 ? i10(u2) : u2;
}
function e2(e10, t10, n10, r10) {
  let i10 = eX(e10), l10 = n10;
  return i10 !== e10 && (tT(e10) ? n10.length > 3 && (l10 = function(t11, r11, i11) {
    return n10.call(this, t11, r11, i11, e10);
  }) : l10 = function(t11, r11, i11) {
    return n10.call(this, t11, tE(r11), i11, e10);
  }), i10[t10](l10, ...r10);
}
function e6(e10, t10, n10) {
  let r10 = tw(e10);
  eJ(r10, "iterate", ez);
  let i10 = r10[t10](...n10);
  return (-1 === i10 || false === i10) && tk(n10[0]) ? (n10[0] = tw(n10[0]), r10[t10](...n10)) : i10;
}
function e3(e10, t10, n10 = []) {
  eF(), ew++;
  let r10 = tw(e10)[t10].apply(e10, n10);
  return eE(), eV(), r10;
}
var e4 = /* @__PURE__ */ f("__proto__,__v_isRef,__isVue");
var e8 = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e10) => "arguments" !== e10 && "caller" !== e10).map((e10) => Symbol[e10]).filter(O));
function e5(e10) {
  O(e10) || (e10 = String(e10));
  let t10 = tw(this);
  return eJ(t10, "has", e10), t10.hasOwnProperty(e10);
}
var e9 = class {
  constructor(e10 = false, t10 = false) {
    this._isReadonly = e10, this._isShallow = t10;
  }
  get(e10, t10, n10) {
    let r10 = this._isReadonly, i10 = this._isShallow;
    if ("__v_isReactive" === t10) return !r10;
    if ("__v_isReadonly" === t10) return r10;
    if ("__v_isShallow" === t10) return i10;
    if ("__v_raw" === t10) return n10 === (r10 ? i10 ? tg : tm : i10 ? th : tf).get(e10) || Object.getPrototypeOf(e10) === Object.getPrototypeOf(n10) ? e10 : void 0;
    let l10 = k(e10);
    if (!r10) {
      let e11;
      if (l10 && (e11 = eZ[t10])) return e11;
      if ("hasOwnProperty" === t10) return e5;
    }
    let s10 = Reflect.get(e10, t10, tR(e10) ? e10 : n10);
    return (O(t10) ? e8.has(t10) : e4(t10)) ? s10 : (r10 || eJ(e10, "get", t10), i10) ? s10 : tR(s10) ? l10 && V(t10) ? s10 : s10.value : P(s10) ? r10 ? tb(s10) : ty(s10) : s10;
  }
};
var e7 = class extends e9 {
  constructor(e10 = false) {
    super(false, e10);
  }
  set(e10, t10, n10, r10) {
    let i10 = e10[t10];
    if (!this._isShallow) {
      let t11 = tC(i10);
      if (tT(n10) || tC(n10) || (i10 = tw(i10), n10 = tw(n10)), !k(e10) && tR(i10) && !tR(n10)) return !t11 && (i10.value = n10, true);
    }
    let l10 = k(e10) && V(t10) ? Number(t10) < e10.length : T(e10, t10), s10 = Reflect.set(e10, t10, n10, tR(e10) ? e10 : r10);
    return e10 === tw(r10) && (l10 ? G(n10, i10) && eG(e10, "set", t10, n10) : eG(e10, "add", t10, n10)), s10;
  }
  deleteProperty(e10, t10) {
    let n10 = T(e10, t10);
    e10[t10];
    let r10 = Reflect.deleteProperty(e10, t10);
    return r10 && n10 && eG(e10, "delete", t10, void 0), r10;
  }
  has(e10, t10) {
    let n10 = Reflect.has(e10, t10);
    return O(t10) && e8.has(t10) || eJ(e10, "has", t10), n10;
  }
  ownKeys(e10) {
    return eJ(e10, "iterate", k(e10) ? "length" : eW), Reflect.ownKeys(e10);
  }
};
var te = class extends e9 {
  constructor(e10 = false) {
    super(true, e10);
  }
  set(e10, t10) {
    return true;
  }
  deleteProperty(e10, t10) {
    return true;
  }
};
var tt = /* @__PURE__ */ new e7();
var tn = /* @__PURE__ */ new te();
var tr = /* @__PURE__ */ new e7(true);
var ti = /* @__PURE__ */ new te(true);
var tl = (e10) => e10;
var ts = (e10) => Reflect.getPrototypeOf(e10);
function to(e10) {
  return function(...t10) {
    return "delete" !== e10 && ("clear" === e10 ? void 0 : this);
  };
}
function ta(e10, t10) {
  let n10 = function(e11, t11) {
    let n11 = { get(n12) {
      let r10 = this.__v_raw, i10 = tw(r10), l10 = tw(n12);
      e11 || (G(n12, l10) && eJ(i10, "get", n12), eJ(i10, "get", l10));
      let { has: s10 } = ts(i10), o10 = t11 ? tl : e11 ? tA : tE;
      return s10.call(i10, n12) ? o10(r10.get(n12)) : s10.call(i10, l10) ? o10(r10.get(l10)) : void (r10 !== i10 && r10.get(n12));
    }, get size() {
      let t12 = this.__v_raw;
      return e11 || eJ(tw(t12), "iterate", eW), Reflect.get(t12, "size", t12);
    }, has(t12) {
      let n12 = this.__v_raw, r10 = tw(n12), i10 = tw(t12);
      return e11 || (G(t12, i10) && eJ(r10, "has", t12), eJ(r10, "has", i10)), t12 === i10 ? n12.has(t12) : n12.has(t12) || n12.has(i10);
    }, forEach(n12, r10) {
      let i10 = this, l10 = i10.__v_raw, s10 = tw(l10), o10 = t11 ? tl : e11 ? tA : tE;
      return e11 || eJ(s10, "iterate", eW), l10.forEach((e12, t12) => n12.call(r10, o10(e12), o10(t12), i10));
    } };
    return S(n11, e11 ? { add: to("add"), set: to("set"), delete: to("delete"), clear: to("clear") } : { add(e12) {
      t11 || tT(e12) || tC(e12) || (e12 = tw(e12));
      let n12 = tw(this);
      return ts(n12).has.call(n12, e12) || (n12.add(e12), eG(n12, "add", e12, e12)), this;
    }, set(e12, n12) {
      t11 || tT(n12) || tC(n12) || (n12 = tw(n12));
      let r10 = tw(this), { has: i10, get: l10 } = ts(r10), s10 = i10.call(r10, e12);
      s10 || (e12 = tw(e12), s10 = i10.call(r10, e12));
      let o10 = l10.call(r10, e12);
      return r10.set(e12, n12), s10 ? G(n12, o10) && eG(r10, "set", e12, n12) : eG(r10, "add", e12, n12), this;
    }, delete(e12) {
      let t12 = tw(this), { has: n12, get: r10 } = ts(t12), i10 = n12.call(t12, e12);
      i10 || (e12 = tw(e12), i10 = n12.call(t12, e12)), r10 && r10.call(t12, e12);
      let l10 = t12.delete(e12);
      return i10 && eG(t12, "delete", e12, void 0), l10;
    }, clear() {
      let e12 = tw(this), t12 = 0 !== e12.size, n12 = e12.clear();
      return t12 && eG(e12, "clear", void 0, void 0), n12;
    } }), ["keys", "values", "entries", Symbol.iterator].forEach((r10) => {
      n11[r10] = function(...n12) {
        let i10 = this.__v_raw, l10 = tw(i10), s10 = w(l10), o10 = "entries" === r10 || r10 === Symbol.iterator && s10, a10 = i10[r10](...n12), c10 = t11 ? tl : e11 ? tA : tE;
        return e11 || eJ(l10, "iterate", "keys" === r10 && s10 ? eK : eW), { next() {
          let { value: e12, done: t12 } = a10.next();
          return t12 ? { value: e12, done: t12 } : { value: o10 ? [c10(e12[0]), c10(e12[1])] : c10(e12), done: t12 };
        }, [Symbol.iterator]() {
          return this;
        } };
      };
    }), n11;
  }(e10, t10);
  return (t11, r10, i10) => "__v_isReactive" === r10 ? !e10 : "__v_isReadonly" === r10 ? e10 : "__v_raw" === r10 ? t11 : Reflect.get(T(n10, r10) && r10 in t11 ? n10 : t11, r10, i10);
}
var tc = { get: /* @__PURE__ */ ta(false, false) };
var tu = { get: /* @__PURE__ */ ta(false, true) };
var td = { get: /* @__PURE__ */ ta(true, false) };
var tp = { get: /* @__PURE__ */ ta(true, true) };
var tf = /* @__PURE__ */ new WeakMap();
var th = /* @__PURE__ */ new WeakMap();
var tm = /* @__PURE__ */ new WeakMap();
var tg = /* @__PURE__ */ new WeakMap();
function ty(e10) {
  return tC(e10) ? e10 : tS(e10, false, tt, tc, tf);
}
function tv(e10) {
  return tS(e10, false, tr, tu, th);
}
function tb(e10) {
  return tS(e10, true, tn, td, tm);
}
function t_(e10) {
  return tS(e10, true, ti, tp, tg);
}
function tS(e10, t10, n10, r10, i10) {
  if (!P(e10) || e10.__v_raw && !(t10 && e10.__v_isReactive)) return e10;
  let l10 = i10.get(e10);
  if (l10) return l10;
  let s10 = e10.__v_skip || !Object.isExtensible(e10) ? 0 : function(e11) {
    switch (e11) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }($2(e10));
  if (0 === s10) return e10;
  let o10 = new Proxy(e10, 2 === s10 ? r10 : n10);
  return i10.set(e10, o10), o10;
}
function tx(e10) {
  return tC(e10) ? tx(e10.__v_raw) : !!(e10 && e10.__v_isReactive);
}
function tC(e10) {
  return !!(e10 && e10.__v_isReadonly);
}
function tT(e10) {
  return !!(e10 && e10.__v_isShallow);
}
function tk(e10) {
  return !!e10 && !!e10.__v_raw;
}
function tw(e10) {
  let t10 = e10 && e10.__v_raw;
  return t10 ? tw(t10) : e10;
}
function tN(e10) {
  return !T(e10, "__v_skip") && Object.isExtensible(e10) && X(e10, "__v_skip", true), e10;
}
var tE = (e10) => P(e10) ? ty(e10) : e10;
var tA = (e10) => P(e10) ? tb(e10) : e10;
function tR(e10) {
  return !!e10 && true === e10.__v_isRef;
}
function tI(e10) {
  return tP(e10, false);
}
function tO(e10) {
  return tP(e10, true);
}
function tP(e10, t10) {
  return tR(e10) ? e10 : new tM(e10, t10);
}
var tM = class {
  constructor(e10, t10) {
    this.dep = new eH(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = t10 ? e10 : tw(e10), this._value = t10 ? e10 : tE(e10), this.__v_isShallow = t10;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e10) {
    let t10 = this._rawValue, n10 = this.__v_isShallow || tT(e10) || tC(e10);
    G(e10 = n10 ? e10 : tw(e10), t10) && (this._rawValue = e10, this._value = n10 ? e10 : tE(e10), this.dep.trigger());
  }
};
function tD(e10) {
  e10.dep && e10.dep.trigger();
}
function tL(e10) {
  return tR(e10) ? e10.value : e10;
}
function t$(e10) {
  return R(e10) ? e10() : tL(e10);
}
var tF = { get: (e10, t10, n10) => "__v_raw" === t10 ? e10 : tL(Reflect.get(e10, t10, n10)), set: (e10, t10, n10, r10) => {
  let i10 = e10[t10];
  return tR(i10) && !tR(n10) ? (i10.value = n10, true) : Reflect.set(e10, t10, n10, r10);
} };
function tV(e10) {
  return tx(e10) ? e10 : new Proxy(e10, tF);
}
var tB = class {
  constructor(e10) {
    this.__v_isRef = true, this._value = void 0;
    let t10 = this.dep = new eH(), { get: n10, set: r10 } = e10(t10.track.bind(t10), t10.trigger.bind(t10));
    this._get = n10, this._set = r10;
  }
  get value() {
    return this._value = this._get();
  }
  set value(e10) {
    this._set(e10);
  }
};
function tU(e10) {
  return new tB(e10);
}
function tj(e10) {
  let t10 = k(e10) ? Array(e10.length) : {};
  for (let n10 in e10) t10[n10] = tK(e10, n10);
  return t10;
}
var tH = class {
  constructor(e10, t10, n10) {
    this._object = e10, this._key = t10, this._defaultValue = n10, this.__v_isRef = true, this._value = void 0;
  }
  get value() {
    let e10 = this._object[this._key];
    return this._value = void 0 === e10 ? this._defaultValue : e10;
  }
  set value(e10) {
    this._object[this._key] = e10;
  }
  get dep() {
    return function(e10, t10) {
      let n10 = eq.get(e10);
      return n10 && n10.get(t10);
    }(tw(this._object), this._key);
  }
};
var tq = class {
  constructor(e10) {
    this._getter = e10, this.__v_isRef = true, this.__v_isReadonly = true, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
};
function tW(e10, t10, n10) {
  return tR(e10) ? e10 : R(e10) ? new tq(e10) : P(e10) && arguments.length > 1 ? tK(e10, t10, n10) : tI(e10);
}
function tK(e10, t10, n10) {
  let r10 = e10[t10];
  return tR(r10) ? r10 : new tH(e10, t10, n10);
}
var tz = class {
  constructor(e10, t10, n10) {
    this.fn = e10, this.setter = t10, this._value = void 0, this.dep = new eH(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = eU - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t10, this.isSSR = n10;
  }
  notify() {
    if (this.flags |= 16, !(8 & this.flags) && n !== this) return eN(this, true), true;
  }
  get value() {
    let e10 = this.dep.track();
    return eO(this), e10 && (e10.version = this.dep.version), this._value;
  }
  set value(e10) {
    this.setter && this.setter(e10);
  }
};
var tJ = { GET: "get", HAS: "has", ITERATE: "iterate" };
var tG = { SET: "set", ADD: "add", DELETE: "delete", CLEAR: "clear" };
var tQ = {};
var tX = /* @__PURE__ */ new WeakMap();
function tZ() {
  return d;
}
function tY(e10, t10 = false, n10 = d) {
  if (n10) {
    let t11 = tX.get(n10);
    t11 || tX.set(n10, t11 = []), t11.push(e10);
  }
}
function t0(e10, t10 = 1 / 0, n10) {
  if (t10 <= 0 || !P(e10) || e10.__v_skip || (n10 = n10 || /* @__PURE__ */ new Set()).has(e10)) return e10;
  if (n10.add(e10), t10--, tR(e10)) t0(e10.value, t10, n10);
  else if (k(e10)) for (let r10 = 0; r10 < e10.length; r10++) t0(e10[r10], t10, n10);
  else if (N(e10) || w(e10)) e10.forEach((e11) => {
    t0(e11, t10, n10);
  });
  else if (F(e10)) {
    for (let r10 in e10) t0(e10[r10], t10, n10);
    for (let r10 of Object.getOwnPropertySymbols(e10)) Object.prototype.propertyIsEnumerable.call(e10, r10) && t0(e10[r10], t10, n10);
  }
  return e10;
}
function t1(e10, t10) {
}
var t2 = { SETUP_FUNCTION: 0, 0: "SETUP_FUNCTION", RENDER_FUNCTION: 1, 1: "RENDER_FUNCTION", NATIVE_EVENT_HANDLER: 5, 5: "NATIVE_EVENT_HANDLER", COMPONENT_EVENT_HANDLER: 6, 6: "COMPONENT_EVENT_HANDLER", VNODE_HOOK: 7, 7: "VNODE_HOOK", DIRECTIVE_HOOK: 8, 8: "DIRECTIVE_HOOK", TRANSITION_HOOK: 9, 9: "TRANSITION_HOOK", APP_ERROR_HANDLER: 10, 10: "APP_ERROR_HANDLER", APP_WARN_HANDLER: 11, 11: "APP_WARN_HANDLER", FUNCTION_REF: 12, 12: "FUNCTION_REF", ASYNC_COMPONENT_LOADER: 13, 13: "ASYNC_COMPONENT_LOADER", SCHEDULER: 14, 14: "SCHEDULER", COMPONENT_UPDATE: 15, 15: "COMPONENT_UPDATE", APP_UNMOUNT_CLEANUP: 16, 16: "APP_UNMOUNT_CLEANUP" };
function t6(e10, t10, n10, r10) {
  try {
    return r10 ? e10(...r10) : e10();
  } catch (e11) {
    t4(e11, t10, n10);
  }
}
function t3(e10, t10, n10, r10) {
  if (R(e10)) {
    let i10 = t6(e10, t10, n10, r10);
    return i10 && M(i10) && i10.catch((e11) => {
      t4(e11, t10, n10);
    }), i10;
  }
  if (k(e10)) {
    let i10 = [];
    for (let l10 = 0; l10 < e10.length; l10++) i10.push(t3(e10[l10], t10, n10, r10));
    return i10;
  }
}
function t4(e10, t10, n10, r10 = true) {
  t10 && t10.vnode;
  let { errorHandler: i10, throwUnhandledErrorInProduction: l10 } = t10 && t10.appContext.config || h;
  if (t10) {
    let r11 = t10.parent, l11 = t10.proxy, s10 = `https://vuejs.org/error-reference/#runtime-${n10}`;
    for (; r11; ) {
      let t11 = r11.ec;
      if (t11) {
        for (let n11 = 0; n11 < t11.length; n11++) if (false === t11[n11](e10, l11, s10)) return;
      }
      r11 = r11.parent;
    }
    if (i10) {
      eF(), t6(i10, null, 10, [e10, l11, s10]), eV();
      return;
    }
  }
  !function(e11, t11, n11, r11 = true, i11 = false) {
    if (i11) throw e11;
    console.error(e11);
  }(e10, 0, 0, r10, l10);
}
var t8 = [];
var t5 = -1;
var t9 = [];
var t7 = null;
var ne = 0;
var nt = /* @__PURE__ */ Promise.resolve();
var nn = null;
function nr(e10) {
  let t10 = nn || nt;
  return e10 ? t10.then(this ? e10.bind(this) : e10) : t10;
}
function ni(e10) {
  if (!(1 & e10.flags)) {
    let t10 = nc(e10), n10 = t8[t8.length - 1];
    !n10 || !(2 & e10.flags) && t10 >= nc(n10) ? t8.push(e10) : t8.splice(function(e11) {
      let t11 = t5 + 1, n11 = t8.length;
      for (; t11 < n11; ) {
        let r10 = t11 + n11 >>> 1, i10 = t8[r10], l10 = nc(i10);
        l10 < e11 || l10 === e11 && 2 & i10.flags ? t11 = r10 + 1 : n11 = r10;
      }
      return t11;
    }(t10), 0, e10), e10.flags |= 1, nl();
  }
}
function nl() {
  nn || (nn = nt.then(function e10(t10) {
    try {
      for (t5 = 0; t5 < t8.length; t5++) {
        let e11 = t8[t5];
        !e11 || 8 & e11.flags || (4 & e11.flags && (e11.flags &= -2), t6(e11, e11.i, e11.i ? 15 : 14), 4 & e11.flags || (e11.flags &= -2));
      }
    } finally {
      for (; t5 < t8.length; t5++) {
        let e11 = t8[t5];
        e11 && (e11.flags &= -2);
      }
      t5 = -1, t8.length = 0, na(), nn = null, (t8.length || t9.length) && e10();
    }
  }));
}
function ns(e10) {
  k(e10) ? t9.push(...e10) : t7 && -1 === e10.id ? t7.splice(ne + 1, 0, e10) : 1 & e10.flags || (t9.push(e10), e10.flags |= 1), nl();
}
function no(e10, t10, n10 = t5 + 1) {
  for (; n10 < t8.length; n10++) {
    let t11 = t8[n10];
    if (t11 && 2 & t11.flags) {
      if (e10 && t11.id !== e10.uid) continue;
      t8.splice(n10, 1), n10--, 4 & t11.flags && (t11.flags &= -2), t11(), 4 & t11.flags || (t11.flags &= -2);
    }
  }
}
function na(e10) {
  if (t9.length) {
    let e11 = [...new Set(t9)].sort((e12, t10) => nc(e12) - nc(t10));
    if (t9.length = 0, t7) {
      t7.push(...e11);
      return;
    }
    for (ne = 0, t7 = e11; ne < t7.length; ne++) {
      let e12 = t7[ne];
      4 & e12.flags && (e12.flags &= -2), 8 & e12.flags || e12(), e12.flags &= -2;
    }
    t7 = null, ne = 0;
  }
}
var nc = (e10) => null == e10.id ? 2 & e10.flags ? -1 : 1 / 0 : e10.id;
var nu = null;
var nd = null;
function np(e10) {
  let t10 = nu;
  return nu = e10, nd = e10 && e10.type.__scopeId || null, t10;
}
function nf(e10) {
  nd = e10;
}
function nh() {
  nd = null;
}
var nm = (e10) => ng;
function ng(e10, t10 = nu, n10) {
  if (!t10 || e10._n) return e10;
  let r10 = (...n11) => {
    let i10;
    r10._d && ll(-1);
    let l10 = np(t10);
    try {
      i10 = e10(...n11);
    } finally {
      np(l10), r10._d && ll(1);
    }
    return i10;
  };
  return r10._n = true, r10._c = true, r10._d = true, r10;
}
function ny(e10, t10) {
  if (null === nu) return e10;
  let n10 = lj(nu), r10 = e10.dirs || (e10.dirs = []);
  for (let e11 = 0; e11 < t10.length; e11++) {
    let [i10, l10, s10, o10 = h] = t10[e11];
    i10 && (R(i10) && (i10 = { mounted: i10, updated: i10 }), i10.deep && t0(l10), r10.push({ dir: i10, instance: n10, value: l10, oldValue: void 0, arg: s10, modifiers: o10 }));
  }
  return e10;
}
function nv(e10, t10, n10, r10) {
  let i10 = e10.dirs, l10 = t10 && t10.dirs;
  for (let s10 = 0; s10 < i10.length; s10++) {
    let o10 = i10[s10];
    l10 && (o10.oldValue = l10[s10].value);
    let a10 = o10.dir[r10];
    a10 && (eF(), t3(a10, n10, 8, [e10.el, o10, e10, t10]), eV());
  }
}
var nb = Symbol("_vte");
var n_ = (e10) => e10.__isTeleport;
var nS = (e10) => e10 && (e10.disabled || "" === e10.disabled);
var nx = (e10) => e10 && (e10.defer || "" === e10.defer);
var nC = (e10) => "undefined" != typeof SVGElement && e10 instanceof SVGElement;
var nT = (e10) => "function" == typeof MathMLElement && e10 instanceof MathMLElement;
var nk = (e10, t10) => {
  let n10 = e10 && e10.to;
  return I(n10) ? t10 ? t10(n10) : null : n10;
};
function nw(e10, t10, n10, { o: { insert: r10 }, m: i10 }, l10 = 2) {
  0 === l10 && r10(e10.targetAnchor, t10, n10);
  let { el: s10, anchor: o10, shapeFlag: a10, children: c10, props: u2 } = e10, d2 = 2 === l10;
  if (d2 && r10(s10, t10, n10), (!d2 || nS(u2)) && 16 & a10) for (let e11 = 0; e11 < c10.length; e11++) i10(c10[e11], t10, n10, 2);
  d2 && r10(o10, t10, n10);
}
var nN = { name: "Teleport", __isTeleport: true, process(e10, t10, n10, r10, i10, l10, s10, o10, a10, c10) {
  let { mc: u2, pc: d2, pbc: p2, o: { insert: f2, querySelector: h2, createText: m2, createComment: g2 } } = c10, y2 = nS(t10.props), { shapeFlag: b2, children: _2, dynamicChildren: S2 } = t10;
  if (null == e10) {
    let e11 = t10.el = m2(""), c11 = t10.anchor = m2("");
    f2(e11, n10, r10), f2(c11, n10, r10);
    let d3 = (e12, t11) => {
      16 & b2 && (i10 && i10.isCE && (i10.ce._teleportTarget = e12), u2(_2, e12, t11, i10, l10, s10, o10, a10));
    }, p3 = () => {
      let e12 = t10.target = nk(t10.props, h2), n11 = nA(e12, t10, m2, f2);
      e12 && ("svg" !== s10 && nC(e12) ? s10 = "svg" : "mathml" !== s10 && nT(e12) && (s10 = "mathml"), y2 || (d3(e12, n11), nE(t10, false)));
    };
    y2 && (d3(n10, c11), nE(t10, true)), nx(t10.props) ? ik(p3, l10) : p3();
  } else {
    t10.el = e10.el, t10.targetStart = e10.targetStart;
    let r11 = t10.anchor = e10.anchor, u3 = t10.target = e10.target, f3 = t10.targetAnchor = e10.targetAnchor, m3 = nS(e10.props), g3 = m3 ? n10 : u3;
    if ("svg" === s10 || nC(u3) ? s10 = "svg" : ("mathml" === s10 || nT(u3)) && (s10 = "mathml"), S2 ? (p2(e10.dynamicChildren, S2, g3, i10, l10, s10, o10), iO(e10, t10, true)) : a10 || d2(e10, t10, g3, m3 ? r11 : f3, i10, l10, s10, o10, false), y2) m3 ? t10.props && e10.props && t10.props.to !== e10.props.to && (t10.props.to = e10.props.to) : nw(t10, n10, r11, c10, 1);
    else if ((t10.props && t10.props.to) !== (e10.props && e10.props.to)) {
      let e11 = t10.target = nk(t10.props, h2);
      e11 && nw(t10, e11, null, c10, 0);
    } else m3 && nw(t10, u3, f3, c10, 1);
    nE(t10, y2);
  }
}, remove(e10, t10, n10, { um: r10, o: { remove: i10 } }, l10) {
  let { shapeFlag: s10, children: o10, anchor: a10, targetStart: c10, targetAnchor: u2, target: d2, props: p2 } = e10;
  if (d2 && (i10(c10), i10(u2)), l10 && i10(a10), 16 & s10) {
    let e11 = l10 || !nS(p2);
    for (let i11 = 0; i11 < o10.length; i11++) {
      let l11 = o10[i11];
      r10(l11, t10, n10, e11, !!l11.dynamicChildren);
    }
  }
}, move: nw, hydrate: function(e10, t10, n10, r10, i10, l10, { o: { nextSibling: s10, parentNode: o10, querySelector: a10, insert: c10, createText: u2 } }, d2) {
  let p2 = t10.target = nk(t10.props, a10);
  if (p2) {
    let a11 = nS(t10.props), f2 = p2._lpa || p2.firstChild;
    if (16 & t10.shapeFlag) {
      if (a11) t10.anchor = d2(s10(e10), t10, o10(e10), n10, r10, i10, l10), t10.targetStart = f2, t10.targetAnchor = f2 && s10(f2);
      else {
        t10.anchor = s10(e10);
        let o11 = f2;
        for (; o11; ) {
          if (o11 && 8 === o11.nodeType) {
            if ("teleport start anchor" === o11.data) t10.targetStart = o11;
            else if ("teleport anchor" === o11.data) {
              t10.targetAnchor = o11, p2._lpa = t10.targetAnchor && s10(t10.targetAnchor);
              break;
            }
          }
          o11 = s10(o11);
        }
        t10.targetAnchor || nA(p2, t10, u2, c10), d2(f2 && s10(f2), t10, p2, n10, r10, i10, l10);
      }
    }
    nE(t10, a11);
  }
  return t10.anchor && s10(t10.anchor);
} };
function nE(e10, t10) {
  let n10 = e10.ctx;
  if (n10 && n10.ut) {
    let r10, i10;
    for (t10 ? (r10 = e10.el, i10 = e10.anchor) : (r10 = e10.targetStart, i10 = e10.targetAnchor); r10 && r10 !== i10; ) 1 === r10.nodeType && r10.setAttribute("data-v-owner", n10.uid), r10 = r10.nextSibling;
    n10.ut();
  }
}
function nA(e10, t10, n10, r10) {
  let i10 = t10.targetStart = n10(""), l10 = t10.targetAnchor = n10("");
  return i10[nb] = l10, e10 && (r10(i10, e10), r10(l10, e10)), l10;
}
var nR = Symbol("_leaveCb");
var nI = Symbol("_enterCb");
function nO() {
  let e10 = { isMounted: false, isLeaving: false, isUnmounting: false, leavingVNodes: /* @__PURE__ */ new Map() };
  return rm(() => {
    e10.isMounted = true;
  }), rv(() => {
    e10.isUnmounting = true;
  }), e10;
}
var nP = [Function, Array];
var nM = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: nP, onEnter: nP, onAfterEnter: nP, onEnterCancelled: nP, onBeforeLeave: nP, onLeave: nP, onAfterLeave: nP, onLeaveCancelled: nP, onBeforeAppear: nP, onAppear: nP, onAfterAppear: nP, onAppearCancelled: nP };
var nD = (e10) => {
  let t10 = e10.subTree;
  return t10.component ? nD(t10.component) : t10;
};
function nL(e10) {
  let t10 = e10[0];
  if (e10.length > 1) {
    for (let n10 of e10) if (n10.type !== i9) {
      t10 = n10;
      break;
    }
  }
  return t10;
}
var n$ = { name: "BaseTransition", props: nM, setup(e10, { slots: t10 }) {
  let n10 = lR(), r10 = nO();
  return () => {
    let i10 = t10.default && nH(t10.default(), true);
    if (!i10 || !i10.length) return;
    let l10 = nL(i10), s10 = tw(e10), { mode: o10 } = s10;
    if (r10.isLeaving) return nB(l10);
    let a10 = nU(l10);
    if (!a10) return nB(l10);
    let c10 = nV(a10, s10, r10, n10, (e11) => c10 = e11);
    a10.type !== i9 && nj(a10, c10);
    let u2 = n10.subTree, d2 = u2 && nU(u2);
    if (d2 && d2.type !== i9 && !lu(a10, d2) && nD(n10).type !== i9) {
      let e11 = nV(d2, s10, r10, n10);
      if (nj(d2, e11), "out-in" === o10 && a10.type !== i9) return r10.isLeaving = true, e11.afterLeave = () => {
        r10.isLeaving = false, 8 & n10.job.flags || n10.update(), delete e11.afterLeave;
      }, nB(l10);
      "in-out" === o10 && a10.type !== i9 && (e11.delayLeave = (e12, t11, n11) => {
        nF(r10, d2)[String(d2.key)] = d2, e12[nR] = () => {
          t11(), e12[nR] = void 0, delete c10.delayedLeave;
        }, c10.delayedLeave = n11;
      });
    }
    return l10;
  };
} };
function nF(e10, t10) {
  let { leavingVNodes: n10 } = e10, r10 = n10.get(t10.type);
  return r10 || (r10 = /* @__PURE__ */ Object.create(null), n10.set(t10.type, r10)), r10;
}
function nV(e10, t10, n10, r10, i10) {
  let { appear: l10, mode: s10, persisted: o10 = false, onBeforeEnter: a10, onEnter: c10, onAfterEnter: u2, onEnterCancelled: d2, onBeforeLeave: p2, onLeave: f2, onAfterLeave: h2, onLeaveCancelled: m2, onBeforeAppear: g2, onAppear: y2, onAfterAppear: b2, onAppearCancelled: _2 } = t10, S2 = String(e10.key), x2 = nF(n10, e10), C2 = (e11, t11) => {
    e11 && t3(e11, r10, 9, t11);
  }, T2 = (e11, t11) => {
    let n11 = t11[1];
    C2(e11, t11), k(e11) ? e11.every((e12) => e12.length <= 1) && n11() : e11.length <= 1 && n11();
  }, w2 = { mode: s10, persisted: o10, beforeEnter(t11) {
    let r11 = a10;
    if (!n10.isMounted) {
      if (!l10) return;
      r11 = g2 || a10;
    }
    t11[nR] && t11[nR](true);
    let i11 = x2[S2];
    i11 && lu(e10, i11) && i11.el[nR] && i11.el[nR](), C2(r11, [t11]);
  }, enter(e11) {
    let t11 = c10, r11 = u2, i11 = d2;
    if (!n10.isMounted) {
      if (!l10) return;
      t11 = y2 || c10, r11 = b2 || u2, i11 = _2 || d2;
    }
    let s11 = false, o11 = e11[nI] = (t12) => {
      s11 || (s11 = true, t12 ? C2(i11, [e11]) : C2(r11, [e11]), w2.delayedLeave && w2.delayedLeave(), e11[nI] = void 0);
    };
    t11 ? T2(t11, [e11, o11]) : o11();
  }, leave(t11, r11) {
    let i11 = String(e10.key);
    if (t11[nI] && t11[nI](true), n10.isUnmounting) return r11();
    C2(p2, [t11]);
    let l11 = false, s11 = t11[nR] = (n11) => {
      l11 || (l11 = true, r11(), n11 ? C2(m2, [t11]) : C2(h2, [t11]), t11[nR] = void 0, x2[i11] !== e10 || delete x2[i11]);
    };
    x2[i11] = e10, f2 ? T2(f2, [t11, s11]) : s11();
  }, clone(e11) {
    let l11 = nV(e11, t10, n10, r10, i10);
    return i10 && i10(l11), l11;
  } };
  return w2;
}
function nB(e10) {
  if (ri(e10)) return (e10 = ly(e10)).children = null, e10;
}
function nU(e10) {
  if (!ri(e10)) return n_(e10.type) && e10.children ? nL(e10.children) : e10;
  let { shapeFlag: t10, children: n10 } = e10;
  if (n10) {
    if (16 & t10) return n10[0];
    if (32 & t10 && R(n10.default)) return n10.default();
  }
}
function nj(e10, t10) {
  6 & e10.shapeFlag && e10.component ? (e10.transition = t10, nj(e10.component.subTree, t10)) : 128 & e10.shapeFlag ? (e10.ssContent.transition = t10.clone(e10.ssContent), e10.ssFallback.transition = t10.clone(e10.ssFallback)) : e10.transition = t10;
}
function nH(e10, t10 = false, n10) {
  let r10 = [], i10 = 0;
  for (let l10 = 0; l10 < e10.length; l10++) {
    let s10 = e10[l10], o10 = null == n10 ? s10.key : String(n10) + String(null != s10.key ? s10.key : l10);
    s10.type === i8 ? (128 & s10.patchFlag && i10++, r10 = r10.concat(nH(s10.children, t10, o10))) : (t10 || s10.type !== i9) && r10.push(null != o10 ? ly(s10, { key: o10 }) : s10);
  }
  if (i10 > 1) for (let e11 = 0; e11 < r10.length; e11++) r10[e11].patchFlag = -2;
  return r10;
}
// @__NO_SIDE_EFFECTS__
function nq(e10, t10) {
  return R(e10) ? S({ name: e10.name }, t10, { setup: e10 }) : e10;
}
function nW() {
  let e10 = lR();
  return e10 ? (e10.appContext.config.idPrefix || "v") + "-" + e10.ids[0] + e10.ids[1]++ : "";
}
function nK(e10) {
  e10.ids = [e10.ids[0] + e10.ids[2]++ + "-", 0, 0];
}
function nz(e10) {
  let t10 = lR(), n10 = tO(null);
  return t10 && Object.defineProperty(t10.refs === h ? t10.refs = {} : t10.refs, e10, { enumerable: true, get: () => n10.value, set: (e11) => n10.value = e11 }), n10;
}
function nJ(e10, t10, n10, r10, i10 = false) {
  if (k(e10)) {
    e10.forEach((e11, l11) => nJ(e11, t10 && (k(t10) ? t10[l11] : t10), n10, r10, i10));
    return;
  }
  if (rt(r10) && !i10) return;
  let l10 = 4 & r10.shapeFlag ? lj(r10.component) : r10.el, s10 = i10 ? null : l10, { i: o10, r: a10 } = e10, c10 = t10 && t10.r, u2 = o10.refs === h ? o10.refs = {} : o10.refs, d2 = o10.setupState, p2 = tw(d2), f2 = d2 === h ? () => false : (e11) => T(p2, e11);
  if (null != c10 && c10 !== a10 && (I(c10) ? (u2[c10] = null, f2(c10) && (d2[c10] = null)) : tR(c10) && (c10.value = null)), R(a10)) t6(a10, o10, 12, [s10, u2]);
  else {
    let t11 = I(a10), r11 = tR(a10);
    if (t11 || r11) {
      let o11 = () => {
        if (e10.f) {
          let n11 = t11 ? f2(a10) ? d2[a10] : u2[a10] : a10.value;
          i10 ? k(n11) && x(n11, l10) : k(n11) ? n11.includes(l10) || n11.push(l10) : t11 ? (u2[a10] = [l10], f2(a10) && (d2[a10] = u2[a10])) : (a10.value = [l10], e10.k && (u2[e10.k] = a10.value));
        } else t11 ? (u2[a10] = s10, f2(a10) && (d2[a10] = s10)) : r11 && (a10.value = s10, e10.k && (u2[e10.k] = s10));
      };
      s10 ? (o11.id = -1, ik(o11, n10)) : o11();
    }
  }
}
var nG = false;
var nQ = () => {
  nG || (console.error("Hydration completed but contains mismatches."), nG = true);
};
var nX = (e10) => e10.namespaceURI.includes("svg") && "foreignObject" !== e10.tagName;
var nZ = (e10) => e10.namespaceURI.includes("MathML");
var nY = (e10) => {
  if (1 === e10.nodeType) {
    if (nX(e10)) return "svg";
    if (nZ(e10)) return "mathml";
  }
};
var n0 = (e10) => 8 === e10.nodeType;
function n1(e10) {
  let { mt: t10, p: n10, o: { patchProp: r10, createText: i10, nextSibling: l10, parentNode: s10, remove: o10, insert: a10, createComment: c10 } } = e10, u2 = (n11, r11, o11, c11, b2, _2 = false) => {
    _2 = _2 || !!r11.dynamicChildren;
    let S2 = n0(n11) && "[" === n11.data, x2 = () => h2(n11, r11, o11, c11, b2, S2), { type: C2, ref: T2, shapeFlag: k2, patchFlag: w2 } = r11, N2 = n11.nodeType;
    r11.el = n11, -2 === w2 && (_2 = false, r11.dynamicChildren = null);
    let E2 = null;
    switch (C2) {
      case i5:
        3 !== N2 ? "" === r11.children ? (a10(r11.el = i10(""), s10(n11), n11), E2 = n11) : E2 = x2() : (n11.data !== r11.children && (nQ(), n11.data = r11.children), E2 = l10(n11));
        break;
      case i9:
        y2(n11) ? (E2 = l10(n11), g2(r11.el = n11.content.firstChild, n11, o11)) : E2 = 8 !== N2 || S2 ? x2() : l10(n11);
        break;
      case i7:
        if (S2 && (N2 = (n11 = l10(n11)).nodeType), 1 === N2 || 3 === N2) {
          E2 = n11;
          let e11 = !r11.children.length;
          for (let t11 = 0; t11 < r11.staticCount; t11++) e11 && (r11.children += 1 === E2.nodeType ? E2.outerHTML : E2.data), t11 === r11.staticCount - 1 && (r11.anchor = E2), E2 = l10(E2);
          return S2 ? l10(E2) : E2;
        }
        x2();
        break;
      case i8:
        E2 = S2 ? f2(n11, r11, o11, c11, b2, _2) : x2();
        break;
      default:
        if (1 & k2) E2 = 1 === N2 && r11.type.toLowerCase() === n11.tagName.toLowerCase() || y2(n11) ? d2(n11, r11, o11, c11, b2, _2) : x2();
        else if (6 & k2) {
          r11.slotScopeIds = b2;
          let e11 = s10(n11);
          if (E2 = S2 ? m2(n11) : n0(n11) && "teleport start" === n11.data ? m2(n11, n11.data, "teleport end") : l10(n11), t10(r11, e11, null, o11, c11, nY(e11), _2), rt(r11)) {
            let t11;
            S2 ? (t11 = lm(i8)).anchor = E2 ? E2.previousSibling : e11.lastChild : t11 = 3 === n11.nodeType ? lv("") : lm("div"), t11.el = n11, r11.component.subTree = t11;
          }
        } else 64 & k2 ? E2 = 8 !== N2 ? x2() : r11.type.hydrate(n11, r11, o11, c11, b2, _2, e10, p2) : 128 & k2 && (E2 = r11.type.hydrate(n11, r11, o11, c11, nY(s10(n11)), b2, _2, e10, u2));
    }
    return null != T2 && nJ(T2, null, c11, r11), E2;
  }, d2 = (e11, t11, n11, i11, l11, s11) => {
    s11 = s11 || !!t11.dynamicChildren;
    let { type: a11, props: c11, patchFlag: u3, shapeFlag: d3, dirs: f3, transition: h3 } = t11, m3 = "input" === a11 || "option" === a11;
    if (m3 || -1 !== u3) {
      let a12;
      f3 && nv(t11, null, n11, "created");
      let _2 = false;
      if (y2(e11)) {
        _2 = iI(null, h3) && n11 && n11.vnode.props && n11.vnode.props.appear;
        let r11 = e11.content.firstChild;
        _2 && h3.beforeEnter(r11), g2(r11, e11, n11), t11.el = e11 = r11;
      }
      if (16 & d3 && !(c11 && (c11.innerHTML || c11.textContent))) {
        let r11 = p2(e11.firstChild, t11, e11, n11, i11, l11, s11);
        for (; r11; ) {
          n3(e11, 1) || nQ();
          let t12 = r11;
          r11 = r11.nextSibling, o10(t12);
        }
      } else if (8 & d3) {
        let n12 = t11.children;
        "\n" === n12[0] && ("PRE" === e11.tagName || "TEXTAREA" === e11.tagName) && (n12 = n12.slice(1)), e11.textContent !== n12 && (n3(e11, 0) || nQ(), e11.textContent = t11.children);
      }
      if (c11) {
        if (m3 || !s11 || 48 & u3) {
          let t12 = e11.tagName.includes("-");
          for (let i12 in c11) (m3 && (i12.endsWith("value") || "indeterminate" === i12) || b(i12) && !B(i12) || "." === i12[0] || t12) && r10(e11, i12, null, c11[i12], void 0, n11);
        } else if (c11.onClick) r10(e11, "onClick", null, c11.onClick, void 0, n11);
        else if (4 & u3 && tx(c11.style)) for (let e12 in c11.style) c11.style[e12];
      }
      (a12 = c11 && c11.onVnodeBeforeMount) && lk(a12, n11, t11), f3 && nv(t11, null, n11, "beforeMount"), ((a12 = c11 && c11.onVnodeMounted) || f3 || _2) && i3(() => {
        a12 && lk(a12, n11, t11), _2 && h3.enter(e11), f3 && nv(t11, null, n11, "mounted");
      }, i11);
    }
    return e11.nextSibling;
  }, p2 = (e11, t11, r11, s11, o11, c11, d3) => {
    d3 = d3 || !!t11.dynamicChildren;
    let p3 = t11.children, f3 = p3.length;
    for (let t12 = 0; t12 < f3; t12++) {
      let h3 = d3 ? p3[t12] : p3[t12] = lS(p3[t12]), m3 = h3.type === i5;
      e11 ? (m3 && !d3 && t12 + 1 < f3 && lS(p3[t12 + 1]).type === i5 && (a10(i10(e11.data.slice(h3.children.length)), r11, l10(e11)), e11.data = h3.children), e11 = u2(e11, h3, s11, o11, c11, d3)) : m3 && !h3.children ? a10(h3.el = i10(""), r11) : (n3(r11, 1) || nQ(), n10(null, h3, r11, null, s11, o11, nY(r11), c11));
    }
    return e11;
  }, f2 = (e11, t11, n11, r11, i11, o11) => {
    let { slotScopeIds: u3 } = t11;
    u3 && (i11 = i11 ? i11.concat(u3) : u3);
    let d3 = s10(e11), f3 = p2(l10(e11), t11, d3, n11, r11, i11, o11);
    return f3 && n0(f3) && "]" === f3.data ? l10(t11.anchor = f3) : (nQ(), a10(t11.anchor = c10("]"), d3, f3), f3);
  }, h2 = (e11, t11, r11, i11, a11, c11) => {
    if (n3(e11.parentElement, 1) || nQ(), t11.el = null, c11) {
      let t12 = m2(e11);
      for (; ; ) {
        let n11 = l10(e11);
        if (n11 && n11 !== t12) o10(n11);
        else break;
      }
    }
    let u3 = l10(e11), d3 = s10(e11);
    return o10(e11), n10(null, t11, d3, u3, r11, i11, nY(d3), a11), u3;
  }, m2 = (e11, t11 = "[", n11 = "]") => {
    let r11 = 0;
    for (; e11; ) if ((e11 = l10(e11)) && n0(e11) && (e11.data === t11 && r11++, e11.data === n11)) {
      if (0 === r11) return l10(e11);
      r11--;
    }
    return e11;
  }, g2 = (e11, t11, n11) => {
    let r11 = t11.parentNode;
    r11 && r11.replaceChild(e11, t11);
    let i11 = n11;
    for (; i11; ) i11.vnode.el === t11 && (i11.vnode.el = i11.subTree.el = e11), i11 = i11.parent;
  }, y2 = (e11) => 1 === e11.nodeType && "TEMPLATE" === e11.tagName;
  return [(e11, t11) => {
    if (!t11.hasChildNodes()) {
      n10(null, e11, t11), na(), t11._vnode = e11;
      return;
    }
    u2(t11.firstChild, e11, null, null, null), na(), t11._vnode = e11;
  }, u2];
}
var n2 = "data-allow-mismatch";
var n6 = { 0: "text", 1: "children", 2: "class", 3: "style", 4: "attribute" };
function n3(e10, t10) {
  if (0 === t10 || 1 === t10) for (; e10 && !e10.hasAttribute(n2); ) e10 = e10.parentElement;
  let n10 = e10 && e10.getAttribute(n2);
  if (null == n10) return false;
  if ("" === n10) return true;
  {
    let e11 = n10.split(",");
    return !!(0 === t10 && e11.includes("children")) || n10.split(",").includes(n6[t10]);
  }
}
var n4 = ee().requestIdleCallback || ((e10) => setTimeout(e10, 1));
var n8 = ee().cancelIdleCallback || ((e10) => clearTimeout(e10));
var n5 = (e10 = 1e4) => (t10) => {
  let n10 = n4(t10, { timeout: e10 });
  return () => n8(n10);
};
var n9 = (e10) => (t10, n10) => {
  let r10 = new IntersectionObserver((e11) => {
    for (let n11 of e11) if (n11.isIntersecting) {
      r10.disconnect(), t10();
      break;
    }
  }, e10);
  return n10((e11) => {
    if (e11 instanceof Element) {
      if (function(e12) {
        let { top: t11, left: n11, bottom: r11, right: i10 } = e12.getBoundingClientRect(), { innerHeight: l10, innerWidth: s10 } = window;
        return (t11 > 0 && t11 < l10 || r11 > 0 && r11 < l10) && (n11 > 0 && n11 < s10 || i10 > 0 && i10 < s10);
      }(e11)) return t10(), r10.disconnect(), false;
      r10.observe(e11);
    }
  }), () => r10.disconnect();
};
var n7 = (e10) => (t10) => {
  if (e10) {
    let n10 = matchMedia(e10);
    if (!n10.matches) return n10.addEventListener("change", t10, { once: true }), () => n10.removeEventListener("change", t10);
    t10();
  }
};
var re = (e10 = []) => (t10, n10) => {
  I(e10) && (e10 = [e10]);
  let r10 = false, i10 = (e11) => {
    r10 || (r10 = true, l10(), t10(), e11.target.dispatchEvent(new e11.constructor(e11.type, e11)));
  }, l10 = () => {
    n10((t11) => {
      for (let n11 of e10) t11.removeEventListener(n11, i10);
    });
  };
  return n10((t11) => {
    for (let n11 of e10) t11.addEventListener(n11, i10, { once: true });
  }), l10;
};
var rt = (e10) => !!e10.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function rn(e10) {
  let t10;
  R(e10) && (e10 = { loader: e10 });
  let { loader: n10, loadingComponent: r10, errorComponent: i10, delay: l10 = 200, hydrate: s10, timeout: o10, suspensible: a10 = true, onError: c10 } = e10, u2 = null, d2 = 0, p2 = () => (d2++, u2 = null, f2()), f2 = () => {
    let e11;
    return u2 || (e11 = u2 = n10().catch((e12) => {
      if (e12 = e12 instanceof Error ? e12 : Error(String(e12)), c10) return new Promise((t11, n11) => {
        c10(e12, () => t11(p2()), () => n11(e12), d2 + 1);
      });
      throw e12;
    }).then((n11) => e11 !== u2 && u2 ? u2 : (n11 && (n11.__esModule || "Module" === n11[Symbol.toStringTag]) && (n11 = n11.default), t10 = n11, n11)));
  };
  return /* @__PURE__ */ nq({ name: "AsyncComponentWrapper", __asyncLoader: f2, __asyncHydrate(e11, n11, r11) {
    let i11 = s10 ? () => {
      let t11 = s10(r11, (t12) => function(e12, t13) {
        if (n0(e12) && "[" === e12.data) {
          let n12 = 1, r12 = e12.nextSibling;
          for (; r12; ) {
            if (1 === r12.nodeType) {
              if (false === t13(r12)) break;
            } else if (n0(r12)) {
              if ("]" === r12.data) {
                if (0 == --n12) break;
              } else "[" === r12.data && n12++;
            }
            r12 = r12.nextSibling;
          }
        } else t13(e12);
      }(e11, t12));
      t11 && (n11.bum || (n11.bum = [])).push(t11);
    } : r11;
    t10 ? i11() : f2().then(() => !n11.isUnmounted && i11());
  }, get __asyncResolved() {
    return t10;
  }, setup() {
    let e11 = lA;
    if (nK(e11), t10) return () => rr(t10, e11);
    let n11 = (t11) => {
      u2 = null, t4(t11, e11, 13, !i10);
    };
    if (a10 && e11.suspense || lM) return f2().then((t11) => () => rr(t11, e11)).catch((e12) => (n11(e12), () => i10 ? lm(i10, { error: e12 }) : null));
    let s11 = tI(false), c11 = tI(), d3 = tI(!!l10);
    return l10 && setTimeout(() => {
      d3.value = false;
    }, l10), null != o10 && setTimeout(() => {
      if (!s11.value && !c11.value) {
        let e12 = Error(`Async component timed out after ${o10}ms.`);
        n11(e12), c11.value = e12;
      }
    }, o10), f2().then(() => {
      s11.value = true, e11.parent && ri(e11.parent.vnode) && e11.parent.update();
    }).catch((e12) => {
      n11(e12), c11.value = e12;
    }), () => s11.value && t10 ? rr(t10, e11) : c11.value && i10 ? lm(i10, { error: c11.value }) : r10 && !d3.value ? lm(r10) : void 0;
  } });
}
function rr(e10, t10) {
  let { ref: n10, props: r10, children: i10, ce: l10 } = t10.vnode, s10 = lm(e10, r10, i10);
  return s10.ref = n10, s10.ce = l10, delete t10.vnode.ce, s10;
}
var ri = (e10) => e10.type.__isKeepAlive;
var rl = { name: "KeepAlive", __isKeepAlive: true, props: { include: [String, RegExp, Array], exclude: [String, RegExp, Array], max: [String, Number] }, setup(e10, { slots: t10 }) {
  let n10 = lR(), r10 = n10.ctx;
  if (!r10.renderer) return () => {
    let e11 = t10.default && t10.default();
    return e11 && 1 === e11.length ? e11[0] : e11;
  };
  let i10 = /* @__PURE__ */ new Map(), l10 = /* @__PURE__ */ new Set(), s10 = null, o10 = n10.suspense, { renderer: { p: a10, m: c10, um: u2, o: { createElement: d2 } } } = r10, p2 = d2("div");
  function f2(e11) {
    ru(e11), u2(e11, n10, o10, true);
  }
  function h2(e11) {
    i10.forEach((t11, n11) => {
      let r11 = lH(t11.type);
      r11 && !e11(r11) && m2(n11);
    });
  }
  function m2(e11) {
    let t11 = i10.get(e11);
    !t11 || s10 && lu(t11, s10) ? s10 && ru(s10) : f2(t11), i10.delete(e11), l10.delete(e11);
  }
  r10.activate = (e11, t11, n11, r11, i11) => {
    let l11 = e11.component;
    c10(e11, t11, n11, 0, o10), a10(l11.vnode, e11, t11, n11, l11, o10, r11, e11.slotScopeIds, i11), ik(() => {
      l11.isDeactivated = false, l11.a && Q(l11.a);
      let t12 = e11.props && e11.props.onVnodeMounted;
      t12 && lk(t12, l11.parent, e11);
    }, o10);
  }, r10.deactivate = (e11) => {
    let t11 = e11.component;
    iP(t11.m), iP(t11.a), c10(e11, p2, null, 1, o10), ik(() => {
      t11.da && Q(t11.da);
      let n11 = e11.props && e11.props.onVnodeUnmounted;
      n11 && lk(n11, t11.parent, e11), t11.isDeactivated = true;
    }, o10);
  }, iV(() => [e10.include, e10.exclude], ([e11, t11]) => {
    e11 && h2((t12) => rs(e11, t12)), t11 && h2((e12) => !rs(t11, e12));
  }, { flush: "post", deep: true });
  let g2 = null, y2 = () => {
    null != g2 && (iZ(n10.subTree.type) ? ik(() => {
      i10.set(g2, rd(n10.subTree));
    }, n10.subTree.suspense) : i10.set(g2, rd(n10.subTree)));
  };
  return rm(y2), ry(y2), rv(() => {
    i10.forEach((e11) => {
      let { subTree: t11, suspense: r11 } = n10, i11 = rd(t11);
      if (e11.type === i11.type && e11.key === i11.key) {
        ru(i11);
        let e12 = i11.component.da;
        e12 && ik(e12, r11);
        return;
      }
      f2(e11);
    });
  }), () => {
    if (g2 = null, !t10.default) return s10 = null;
    let n11 = t10.default(), r11 = n11[0];
    if (n11.length > 1) return s10 = null, n11;
    if (!lc(r11) || !(4 & r11.shapeFlag) && !(128 & r11.shapeFlag)) return s10 = null, r11;
    let o11 = rd(r11);
    if (o11.type === i9) return s10 = null, o11;
    let a11 = o11.type, c11 = lH(rt(o11) ? o11.type.__asyncResolved || {} : a11), { include: u3, exclude: d3, max: p3 } = e10;
    if (u3 && (!c11 || !rs(u3, c11)) || d3 && c11 && rs(d3, c11)) return o11.shapeFlag &= -257, s10 = o11, r11;
    let f3 = null == o11.key ? a11 : o11.key, h3 = i10.get(f3);
    return o11.el && (o11 = ly(o11), 128 & r11.shapeFlag && (r11.ssContent = o11)), g2 = f3, h3 ? (o11.el = h3.el, o11.component = h3.component, o11.transition && nj(o11, o11.transition), o11.shapeFlag |= 512, l10.delete(f3), l10.add(f3)) : (l10.add(f3), p3 && l10.size > parseInt(p3, 10) && m2(l10.values().next().value)), o11.shapeFlag |= 256, s10 = o11, iZ(r11.type) ? r11 : o11;
  };
} };
function rs(e10, t10) {
  return k(e10) ? e10.some((e11) => rs(e11, t10)) : I(e10) ? e10.split(",").includes(t10) : !!A(e10) && (e10.lastIndex = 0, e10.test(t10));
}
function ro(e10, t10) {
  rc(e10, "a", t10);
}
function ra(e10, t10) {
  rc(e10, "da", t10);
}
function rc(e10, t10, n10 = lA) {
  let r10 = e10.__wdc || (e10.__wdc = () => {
    let t11 = n10;
    for (; t11; ) {
      if (t11.isDeactivated) return;
      t11 = t11.parent;
    }
    return e10();
  });
  if (rp(t10, r10, n10), n10) {
    let e11 = n10.parent;
    for (; e11 && e11.parent; ) ri(e11.parent.vnode) && function(e12, t11, n11, r11) {
      let i10 = rp(t11, e12, r11, true);
      rb(() => {
        x(r11[t11], i10);
      }, n11);
    }(r10, t10, n10, e11), e11 = e11.parent;
  }
}
function ru(e10) {
  e10.shapeFlag &= -257, e10.shapeFlag &= -513;
}
function rd(e10) {
  return 128 & e10.shapeFlag ? e10.ssContent : e10;
}
function rp(e10, t10, n10 = lA, r10 = false) {
  if (n10) {
    let i10 = n10[e10] || (n10[e10] = []), l10 = t10.__weh || (t10.__weh = (...r11) => {
      eF();
      let i11 = lI(n10), l11 = t3(t10, n10, e10, r11);
      return i11(), eV(), l11;
    });
    return r10 ? i10.unshift(l10) : i10.push(l10), l10;
  }
}
var rf = (e10) => (t10, n10 = lA) => {
  lM && "sp" !== e10 || rp(e10, (...e11) => t10(...e11), n10);
};
var rh = rf("bm");
var rm = rf("m");
var rg = rf("bu");
var ry = rf("u");
var rv = rf("bum");
var rb = rf("um");
var r_ = rf("sp");
var rS = rf("rtg");
var rx = rf("rtc");
function rC(e10, t10 = lA) {
  rp("ec", e10, t10);
}
var rT = "components";
function rk(e10, t10) {
  return rA(rT, e10, true, t10) || e10;
}
var rw = Symbol.for("v-ndc");
function rN(e10) {
  return I(e10) ? rA(rT, e10, false) || e10 : e10 || rw;
}
function rE(e10) {
  return rA("directives", e10);
}
function rA(e10, t10, n10 = true, r10 = false) {
  let i10 = nu || lA;
  if (i10) {
    let n11 = i10.type;
    if (e10 === rT) {
      let e11 = lH(n11, false);
      if (e11 && (e11 === t10 || e11 === q(t10) || e11 === z(q(t10)))) return n11;
    }
    let l10 = rR(i10[e10] || n11[e10], t10) || rR(i10.appContext[e10], t10);
    return !l10 && r10 ? n11 : l10;
  }
}
function rR(e10, t10) {
  return e10 && (e10[t10] || e10[q(t10)] || e10[z(q(t10))]);
}
function rI(e10, t10, n10, r10) {
  let i10;
  let l10 = n10 && n10[r10], s10 = k(e10);
  if (s10 || I(e10)) {
    let n11 = s10 && tx(e10), r11 = false;
    n11 && (r11 = !tT(e10), e10 = eX(e10)), i10 = Array(e10.length);
    for (let n12 = 0, s11 = e10.length; n12 < s11; n12++) i10[n12] = t10(r11 ? tE(e10[n12]) : e10[n12], n12, void 0, l10 && l10[n12]);
  } else if ("number" == typeof e10) {
    i10 = Array(e10);
    for (let n11 = 0; n11 < e10; n11++) i10[n11] = t10(n11 + 1, n11, void 0, l10 && l10[n11]);
  } else if (P(e10)) {
    if (e10[Symbol.iterator]) i10 = Array.from(e10, (e11, n11) => t10(e11, n11, void 0, l10 && l10[n11]));
    else {
      let n11 = Object.keys(e10);
      i10 = Array(n11.length);
      for (let r11 = 0, s11 = n11.length; r11 < s11; r11++) {
        let s12 = n11[r11];
        i10[r11] = t10(e10[s12], s12, r11, l10 && l10[r11]);
      }
    }
  } else i10 = [];
  return n10 && (n10[r10] = i10), i10;
}
function rO(e10, t10) {
  for (let n10 = 0; n10 < t10.length; n10++) {
    let r10 = t10[n10];
    if (k(r10)) for (let t11 = 0; t11 < r10.length; t11++) e10[r10[t11].name] = r10[t11].fn;
    else r10 && (e10[r10.name] = r10.key ? (...e11) => {
      let t11 = r10.fn(...e11);
      return t11 && (t11.key = r10.key), t11;
    } : r10.fn);
  }
  return e10;
}
function rP(e10, t10, n10 = {}, r10, i10) {
  if (nu.ce || nu.parent && rt(nu.parent) && nu.parent.ce) return "default" !== t10 && (n10.name = t10), ln(), la(i8, null, [lm("slot", n10, r10 && r10())], 64);
  let l10 = e10[t10];
  l10 && l10._c && (l10._d = false), ln();
  let s10 = l10 && rM(l10(n10)), o10 = n10.key || s10 && s10.key, a10 = la(i8, { key: (o10 && !O(o10) ? o10 : `_${t10}`) + (!s10 && r10 ? "_fb" : "") }, s10 || (r10 ? r10() : []), s10 && 1 === e10._ ? 64 : -2);
  return !i10 && a10.scopeId && (a10.slotScopeIds = [a10.scopeId + "-s"]), l10 && l10._c && (l10._d = true), a10;
}
function rM(e10) {
  return e10.some((e11) => !lc(e11) || !!(e11.type !== i9 && (e11.type !== i8 || rM(e11.children)))) ? e10 : null;
}
function rD(e10, t10) {
  let n10 = {};
  for (let r10 in e10) n10[t10 && /[A-Z]/.test(r10) ? `on:${r10}` : J(r10)] = e10[r10];
  return n10;
}
var rL = (e10) => e10 ? lP(e10) ? lj(e10) : rL(e10.parent) : null;
var r$ = /* @__PURE__ */ S(/* @__PURE__ */ Object.create(null), { $: (e10) => e10, $el: (e10) => e10.vnode.el, $data: (e10) => e10.data, $props: (e10) => e10.props, $attrs: (e10) => e10.attrs, $slots: (e10) => e10.slots, $refs: (e10) => e10.refs, $parent: (e10) => rL(e10.parent), $root: (e10) => rL(e10.root), $host: (e10) => e10.ce, $emit: (e10) => e10.emit, $options: (e10) => r3(e10), $forceUpdate: (e10) => e10.f || (e10.f = () => {
  ni(e10.update);
}), $nextTick: (e10) => e10.n || (e10.n = nr.bind(e10.proxy)), $watch: (e10) => iU.bind(e10) });
var rF = (e10, t10) => e10 !== h && !e10.__isScriptSetup && T(e10, t10);
var rV = { get({ _: e10 }, t10) {
  let n10, r10, i10;
  if ("__v_skip" === t10) return true;
  let { ctx: l10, setupState: s10, data: o10, props: a10, accessCache: c10, type: u2, appContext: d2 } = e10;
  if ("$" !== t10[0]) {
    let r11 = c10[t10];
    if (void 0 !== r11) switch (r11) {
      case 1:
        return s10[t10];
      case 2:
        return o10[t10];
      case 4:
        return l10[t10];
      case 3:
        return a10[t10];
    }
    else {
      if (rF(s10, t10)) return c10[t10] = 1, s10[t10];
      if (o10 !== h && T(o10, t10)) return c10[t10] = 2, o10[t10];
      if ((n10 = e10.propsOptions[0]) && T(n10, t10)) return c10[t10] = 3, a10[t10];
      if (l10 !== h && T(l10, t10)) return c10[t10] = 4, l10[t10];
      r2 && (c10[t10] = 0);
    }
  }
  let p2 = r$[t10];
  return p2 ? ("$attrs" === t10 && eJ(e10.attrs, "get", ""), p2(e10)) : (r10 = u2.__cssModules) && (r10 = r10[t10]) ? r10 : l10 !== h && T(l10, t10) ? (c10[t10] = 4, l10[t10]) : T(i10 = d2.config.globalProperties, t10) ? i10[t10] : void 0;
}, set({ _: e10 }, t10, n10) {
  let { data: r10, setupState: i10, ctx: l10 } = e10;
  return rF(i10, t10) ? (i10[t10] = n10, true) : r10 !== h && T(r10, t10) ? (r10[t10] = n10, true) : !T(e10.props, t10) && !("$" === t10[0] && t10.slice(1) in e10) && (l10[t10] = n10, true);
}, has({ _: { data: e10, setupState: t10, accessCache: n10, ctx: r10, appContext: i10, propsOptions: l10 } }, s10) {
  let o10;
  return !!n10[s10] || e10 !== h && T(e10, s10) || rF(t10, s10) || (o10 = l10[0]) && T(o10, s10) || T(r10, s10) || T(r$, s10) || T(i10.config.globalProperties, s10);
}, defineProperty(e10, t10, n10) {
  return null != n10.get ? e10._.accessCache[t10] = 0 : T(n10, "value") && this.set(e10, t10, n10.value, null), Reflect.defineProperty(e10, t10, n10);
} };
var rB = /* @__PURE__ */ S({}, rV, { get(e10, t10) {
  if (t10 !== Symbol.unscopables) return rV.get(e10, t10, e10);
}, has: (e10, t10) => "_" !== t10[0] && !et(t10) });
function rU() {
  return null;
}
function rj() {
  return null;
}
function rH(e10) {
}
function rq(e10) {
}
function rW() {
  return null;
}
function rK() {
}
function rz(e10, t10) {
  return null;
}
function rJ() {
  return rQ().slots;
}
function rG() {
  return rQ().attrs;
}
function rQ() {
  let e10 = lR();
  return e10.setupContext || (e10.setupContext = lU(e10));
}
function rX(e10) {
  return k(e10) ? e10.reduce((e11, t10) => (e11[t10] = null, e11), {}) : e10;
}
function rZ(e10, t10) {
  let n10 = rX(e10);
  for (let e11 in t10) {
    if (e11.startsWith("__skip")) continue;
    let r10 = n10[e11];
    r10 ? k(r10) || R(r10) ? r10 = n10[e11] = { type: r10, default: t10[e11] } : r10.default = t10[e11] : null === r10 && (r10 = n10[e11] = { default: t10[e11] }), r10 && t10[`__skip_${e11}`] && (r10.skipFactory = true);
  }
  return n10;
}
function rY(e10, t10) {
  return e10 && t10 ? k(e10) && k(t10) ? e10.concat(t10) : S({}, rX(e10), rX(t10)) : e10 || t10;
}
function r0(e10, t10) {
  let n10 = {};
  for (let r10 in e10) t10.includes(r10) || Object.defineProperty(n10, r10, { enumerable: true, get: () => e10[r10] });
  return n10;
}
function r1(e10) {
  let t10 = lR(), n10 = e10();
  return lO(), M(n10) && (n10 = n10.catch((e11) => {
    throw lI(t10), e11;
  })), [n10, () => lI(t10)];
}
var r2 = true;
function r6(e10, t10, n10) {
  t3(k(e10) ? e10.map((e11) => e11.bind(t10.proxy)) : e10.bind(t10.proxy), t10, n10);
}
function r3(e10) {
  let t10;
  let n10 = e10.type, { mixins: r10, extends: i10 } = n10, { mixins: l10, optionsCache: s10, config: { optionMergeStrategies: o10 } } = e10.appContext, a10 = s10.get(n10);
  return a10 ? t10 = a10 : l10.length || r10 || i10 ? (t10 = {}, l10.length && l10.forEach((e11) => r4(t10, e11, o10, true)), r4(t10, n10, o10)) : t10 = n10, P(n10) && s10.set(n10, t10), t10;
}
function r4(e10, t10, n10, r10 = false) {
  let { mixins: i10, extends: l10 } = t10;
  for (let s10 in l10 && r4(e10, l10, n10, true), i10 && i10.forEach((t11) => r4(e10, t11, n10, true)), t10) if (r10 && "expose" === s10) ;
  else {
    let r11 = r8[s10] || n10 && n10[s10];
    e10[s10] = r11 ? r11(e10[s10], t10[s10]) : t10[s10];
  }
  return e10;
}
var r8 = { data: r5, props: it, emits: it, methods: ie, computed: ie, beforeCreate: r7, created: r7, beforeMount: r7, mounted: r7, beforeUpdate: r7, updated: r7, beforeDestroy: r7, beforeUnmount: r7, destroyed: r7, unmounted: r7, activated: r7, deactivated: r7, errorCaptured: r7, serverPrefetch: r7, components: ie, directives: ie, watch: function(e10, t10) {
  if (!e10) return t10;
  if (!t10) return e10;
  let n10 = S(/* @__PURE__ */ Object.create(null), e10);
  for (let r10 in t10) n10[r10] = r7(e10[r10], t10[r10]);
  return n10;
}, provide: r5, inject: function(e10, t10) {
  return ie(r9(e10), r9(t10));
} };
function r5(e10, t10) {
  return t10 ? e10 ? function() {
    return S(R(e10) ? e10.call(this, this) : e10, R(t10) ? t10.call(this, this) : t10);
  } : t10 : e10;
}
function r9(e10) {
  if (k(e10)) {
    let t10 = {};
    for (let n10 = 0; n10 < e10.length; n10++) t10[e10[n10]] = e10[n10];
    return t10;
  }
  return e10;
}
function r7(e10, t10) {
  return e10 ? [...new Set([].concat(e10, t10))] : t10;
}
function ie(e10, t10) {
  return e10 ? S(/* @__PURE__ */ Object.create(null), e10, t10) : t10;
}
function it(e10, t10) {
  return e10 ? k(e10) && k(t10) ? [.../* @__PURE__ */ new Set([...e10, ...t10])] : S(/* @__PURE__ */ Object.create(null), rX(e10), rX(null != t10 ? t10 : {})) : t10;
}
function ir() {
  return { app: null, config: { isNativeTag: y, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
var ii = 0;
var il = null;
function is(e10, t10) {
  if (lA) {
    let n10 = lA.provides, r10 = lA.parent && lA.parent.provides;
    r10 === n10 && (n10 = lA.provides = Object.create(r10)), n10[e10] = t10;
  }
}
function io(e10, t10, n10 = false) {
  let r10 = lA || nu;
  if (r10 || il) {
    let i10 = il ? il._context.provides : r10 ? null == r10.parent ? r10.vnode.appContext && r10.vnode.appContext.provides : r10.parent.provides : void 0;
    if (i10 && e10 in i10) return i10[e10];
    if (arguments.length > 1) return n10 && R(t10) ? t10.call(r10 && r10.proxy) : t10;
  }
}
function ia() {
  return !!(lA || nu || il);
}
var ic = {};
var iu = () => Object.create(ic);
var id = (e10) => Object.getPrototypeOf(e10) === ic;
function ip(e10, t10, n10, r10) {
  let i10;
  let [l10, s10] = e10.propsOptions, o10 = false;
  if (t10) for (let a10 in t10) {
    let c10;
    if (B(a10)) continue;
    let u2 = t10[a10];
    l10 && T(l10, c10 = q(a10)) ? s10 && s10.includes(c10) ? (i10 || (i10 = {}))[c10] = u2 : n10[c10] = u2 : iK(e10.emitsOptions, a10) || a10 in r10 && u2 === r10[a10] || (r10[a10] = u2, o10 = true);
  }
  if (s10) {
    let t11 = tw(n10), r11 = i10 || h;
    for (let i11 = 0; i11 < s10.length; i11++) {
      let o11 = s10[i11];
      n10[o11] = ih(l10, t11, o11, r11[o11], e10, !T(r11, o11));
    }
  }
  return o10;
}
function ih(e10, t10, n10, r10, i10, l10) {
  let s10 = e10[n10];
  if (null != s10) {
    let e11 = T(s10, "default");
    if (e11 && void 0 === r10) {
      let e12 = s10.default;
      if (s10.type !== Function && !s10.skipFactory && R(e12)) {
        let { propsDefaults: l11 } = i10;
        if (n10 in l11) r10 = l11[n10];
        else {
          let s11 = lI(i10);
          r10 = l11[n10] = e12.call(null, t10), s11();
        }
      } else r10 = e12;
      i10.ce && i10.ce._setProp(n10, r10);
    }
    s10[0] && (l10 && !e11 ? r10 = false : s10[1] && ("" === r10 || r10 === K(n10)) && (r10 = true));
  }
  return r10;
}
var im = /* @__PURE__ */ new WeakMap();
function ig(e10) {
  return !("$" === e10[0] || B(e10));
}
var iy = (e10) => "_" === e10[0] || "$stable" === e10;
var iv = (e10) => k(e10) ? e10.map(lS) : [lS(e10)];
var ib = (e10, t10, n10) => {
  if (t10._n) return t10;
  let r10 = ng((...e11) => iv(t10(...e11)), n10);
  return r10._c = false, r10;
};
var i_ = (e10, t10, n10) => {
  let r10 = e10._ctx;
  for (let n11 in e10) {
    if (iy(n11)) continue;
    let i10 = e10[n11];
    if (R(i10)) t10[n11] = ib(n11, i10, r10);
    else if (null != i10) {
      let e11 = iv(i10);
      t10[n11] = () => e11;
    }
  }
};
var iS = (e10, t10) => {
  let n10 = iv(t10);
  e10.slots.default = () => n10;
};
var ix = (e10, t10, n10) => {
  for (let r10 in t10) (n10 || "_" !== r10) && (e10[r10] = t10[r10]);
};
var iC = (e10, t10, n10) => {
  let r10 = e10.slots = iu();
  if (32 & e10.vnode.shapeFlag) {
    let e11 = t10._;
    e11 ? (ix(r10, t10, n10), n10 && X(r10, "_", e11, true)) : i_(t10, r10);
  } else t10 && iS(e10, t10);
};
var iT = (e10, t10, n10) => {
  let { vnode: r10, slots: i10 } = e10, l10 = true, s10 = h;
  if (32 & r10.shapeFlag) {
    let e11 = t10._;
    e11 ? n10 && 1 === e11 ? l10 = false : ix(i10, t10, n10) : (l10 = !t10.$stable, i_(t10, i10)), s10 = t10;
  } else t10 && (iS(e10, t10), s10 = { default: 1 });
  if (l10) for (let e11 in i10) iy(e11) || null != s10[e11] || delete i10[e11];
};
var ik = i3;
function iw(e10) {
  return iE(e10);
}
function iN(e10) {
  return iE(e10, n1);
}
function iE(e10, t10) {
  var n10;
  let r10, i10;
  ee().__VUE__ = true;
  let { insert: l10, remove: s10, patchProp: o10, createElement: a10, createText: c10, createComment: u2, setText: d2, setElementText: p2, parentNode: f2, nextSibling: y2, setScopeId: b2 = g, insertStaticContent: _2 } = e10, x2 = (e11, t11, n11, r11 = null, i11 = null, l11 = null, s11, o11 = null, a11 = !!t11.dynamicChildren) => {
    if (e11 === t11) return;
    e11 && !lu(e11, t11) && (r11 = ei2(e11), Z2(e11, i11, l11, true), e11 = null), -2 === t11.patchFlag && (a11 = false, t11.dynamicChildren = null);
    let { type: c11, ref: u3, shapeFlag: d3 } = t11;
    switch (c11) {
      case i5:
        C2(e11, t11, n11, r11);
        break;
      case i9:
        k2(e11, t11, n11, r11);
        break;
      case i7:
        null == e11 && w2(t11, n11, r11, s11);
        break;
      case i8:
        F2(e11, t11, n11, r11, i11, l11, s11, o11, a11);
        break;
      default:
        1 & d3 ? A2(e11, t11, n11, r11, i11, l11, s11, o11, a11) : 6 & d3 ? V2(e11, t11, n11, r11, i11, l11, s11, o11, a11) : 64 & d3 ? c11.process(e11, t11, n11, r11, i11, l11, s11, o11, a11, eo2) : 128 & d3 && c11.process(e11, t11, n11, r11, i11, l11, s11, o11, a11, eo2);
    }
    null != u3 && i11 && nJ(u3, e11 && e11.ref, l11, t11 || e11, !t11);
  }, C2 = (e11, t11, n11, r11) => {
    if (null == e11) l10(t11.el = c10(t11.children), n11, r11);
    else {
      let n12 = t11.el = e11.el;
      t11.children !== e11.children && d2(n12, t11.children);
    }
  }, k2 = (e11, t11, n11, r11) => {
    null == e11 ? l10(t11.el = u2(t11.children || ""), n11, r11) : t11.el = e11.el;
  }, w2 = (e11, t11, n11, r11) => {
    [e11.el, e11.anchor] = _2(e11.children, t11, n11, r11, e11.el, e11.anchor);
  }, N2 = ({ el: e11, anchor: t11 }, n11, r11) => {
    let i11;
    for (; e11 && e11 !== t11; ) i11 = y2(e11), l10(e11, n11, r11), e11 = i11;
    l10(t11, n11, r11);
  }, E2 = ({ el: e11, anchor: t11 }) => {
    let n11;
    for (; e11 && e11 !== t11; ) n11 = y2(e11), s10(e11), e11 = n11;
    s10(t11);
  }, A2 = (e11, t11, n11, r11, i11, l11, s11, o11, a11) => {
    "svg" === t11.type ? s11 = "svg" : "math" === t11.type && (s11 = "mathml"), null == e11 ? I2(t11, n11, r11, i11, l11, s11, o11, a11) : D2(e11, t11, i11, l11, s11, o11, a11);
  }, I2 = (e11, t11, n11, r11, i11, s11, c11, u3) => {
    let d3, f3;
    let { props: h2, shapeFlag: m2, transition: g2, dirs: y3 } = e11;
    if (d3 = e11.el = a10(e11.type, s11, h2 && h2.is, h2), 8 & m2 ? p2(d3, e11.children) : 16 & m2 && M2(e11.children, d3, null, r11, i11, iA(e11, s11), c11, u3), y3 && nv(e11, null, r11, "created"), O2(d3, e11, e11.scopeId, c11, r11), h2) {
      for (let e12 in h2) "value" === e12 || B(e12) || o10(d3, e12, null, h2[e12], s11, r11);
      "value" in h2 && o10(d3, "value", null, h2.value, s11), (f3 = h2.onVnodeBeforeMount) && lk(f3, r11, e11);
    }
    y3 && nv(e11, null, r11, "beforeMount");
    let b3 = iI(i11, g2);
    b3 && g2.beforeEnter(d3), l10(d3, t11, n11), ((f3 = h2 && h2.onVnodeMounted) || b3 || y3) && ik(() => {
      f3 && lk(f3, r11, e11), b3 && g2.enter(d3), y3 && nv(e11, null, r11, "mounted");
    }, i11);
  }, O2 = (e11, t11, n11, r11, i11) => {
    if (n11 && b2(e11, n11), r11) for (let t12 = 0; t12 < r11.length; t12++) b2(e11, r11[t12]);
    if (i11) {
      let n12 = i11.subTree;
      if (t11 === n12 || iZ(n12.type) && (n12.ssContent === t11 || n12.ssFallback === t11)) {
        let t12 = i11.vnode;
        O2(e11, t12, t12.scopeId, t12.slotScopeIds, i11.parent);
      }
    }
  }, M2 = (e11, t11, n11, r11, i11, l11, s11, o11, a11 = 0) => {
    for (let c11 = a11; c11 < e11.length; c11++) x2(null, e11[c11] = o11 ? lx(e11[c11]) : lS(e11[c11]), t11, n11, r11, i11, l11, s11, o11);
  }, D2 = (e11, t11, n11, r11, i11, l11, s11) => {
    let a11;
    let c11 = t11.el = e11.el, { patchFlag: u3, dynamicChildren: d3, dirs: f3 } = t11;
    u3 |= 16 & e11.patchFlag;
    let m2 = e11.props || h, g2 = t11.props || h;
    if (n11 && iR(n11, false), (a11 = g2.onVnodeBeforeUpdate) && lk(a11, n11, t11, e11), f3 && nv(t11, e11, n11, "beforeUpdate"), n11 && iR(n11, true), (m2.innerHTML && null == g2.innerHTML || m2.textContent && null == g2.textContent) && p2(c11, ""), d3 ? L2(e11.dynamicChildren, d3, c11, n11, r11, iA(t11, i11), l11) : s11 || z2(e11, t11, c11, null, n11, r11, iA(t11, i11), l11, false), u3 > 0) {
      if (16 & u3) $3(c11, m2, g2, n11, i11);
      else if (2 & u3 && m2.class !== g2.class && o10(c11, "class", null, g2.class, i11), 4 & u3 && o10(c11, "style", m2.style, g2.style, i11), 8 & u3) {
        let e12 = t11.dynamicProps;
        for (let t12 = 0; t12 < e12.length; t12++) {
          let r12 = e12[t12], l12 = m2[r12], s12 = g2[r12];
          (s12 !== l12 || "value" === r12) && o10(c11, r12, l12, s12, i11, n11);
        }
      }
      1 & u3 && e11.children !== t11.children && p2(c11, t11.children);
    } else s11 || null != d3 || $3(c11, m2, g2, n11, i11);
    ((a11 = g2.onVnodeUpdated) || f3) && ik(() => {
      a11 && lk(a11, n11, t11, e11), f3 && nv(t11, e11, n11, "updated");
    }, r11);
  }, L2 = (e11, t11, n11, r11, i11, l11, s11) => {
    for (let o11 = 0; o11 < t11.length; o11++) {
      let a11 = e11[o11], c11 = t11[o11], u3 = a11.el && (a11.type === i8 || !lu(a11, c11) || 70 & a11.shapeFlag) ? f2(a11.el) : n11;
      x2(a11, c11, u3, null, r11, i11, l11, s11, true);
    }
  }, $3 = (e11, t11, n11, r11, i11) => {
    if (t11 !== n11) {
      if (t11 !== h) for (let l11 in t11) B(l11) || l11 in n11 || o10(e11, l11, t11[l11], null, i11, r11);
      for (let l11 in n11) {
        if (B(l11)) continue;
        let s11 = n11[l11], a11 = t11[l11];
        s11 !== a11 && "value" !== l11 && o10(e11, l11, a11, s11, i11, r11);
      }
      "value" in n11 && o10(e11, "value", t11.value, n11.value, i11);
    }
  }, F2 = (e11, t11, n11, r11, i11, s11, o11, a11, u3) => {
    let d3 = t11.el = e11 ? e11.el : c10(""), p3 = t11.anchor = e11 ? e11.anchor : c10(""), { patchFlag: f3, dynamicChildren: h2, slotScopeIds: m2 } = t11;
    m2 && (a11 = a11 ? a11.concat(m2) : m2), null == e11 ? (l10(d3, n11, r11), l10(p3, n11, r11), M2(t11.children || [], n11, p3, i11, s11, o11, a11, u3)) : f3 > 0 && 64 & f3 && h2 && e11.dynamicChildren ? (L2(e11.dynamicChildren, h2, n11, i11, s11, o11, a11), (null != t11.key || i11 && t11 === i11.subTree) && iO(e11, t11, true)) : z2(e11, t11, n11, p3, i11, s11, o11, a11, u3);
  }, V2 = (e11, t11, n11, r11, i11, l11, s11, o11, a11) => {
    t11.slotScopeIds = o11, null == e11 ? 512 & t11.shapeFlag ? i11.ctx.activate(t11, n11, r11, s11, a11) : U2(t11, n11, r11, i11, l11, s11, a11) : j2(e11, t11, a11);
  }, U2 = (e11, t11, n11, r11, i11, l11, s11) => {
    let o11 = e11.component = lE(e11, r11, i11);
    ri(e11) && (o11.ctx.renderer = eo2), lD(o11, false, s11), o11.asyncDep ? (i11 && i11.registerDep(o11, H2, s11), e11.el || k2(null, o11.subTree = lm(i9), t11, n11)) : H2(o11, e11, t11, n11, i11, l11, s11);
  }, j2 = (e11, t11, n11) => {
    let r11 = t11.component = e11.component;
    if (function(e12, t12, n12) {
      let { props: r12, children: i11, component: l11 } = e12, { props: s11, children: o11, patchFlag: a11 } = t12, c11 = l11.emitsOptions;
      if (t12.dirs || t12.transition) return true;
      if (!n12 || !(a11 >= 0)) return (!!i11 || !!o11) && (!o11 || !o11.$stable) || r12 !== s11 && (r12 ? !s11 || iQ(r12, s11, c11) : !!s11);
      if (1024 & a11) return true;
      if (16 & a11) return r12 ? iQ(r12, s11, c11) : !!s11;
      if (8 & a11) {
        let e13 = t12.dynamicProps;
        for (let t13 = 0; t13 < e13.length; t13++) {
          let n13 = e13[t13];
          if (s11[n13] !== r12[n13] && !iK(c11, n13)) return true;
        }
      }
      return false;
    }(e11, t11, n11)) {
      if (r11.asyncDep && !r11.asyncResolved) {
        W2(r11, t11, n11);
        return;
      }
      r11.next = t11, r11.update();
    } else t11.el = e11.el, r11.vnode = t11;
  }, H2 = (e11, t11, n11, r11, l11, s11, o11) => {
    let a11 = () => {
      if (e11.isMounted) {
        let t12, { next: n12, bu: r12, u: i11, parent: c12, vnode: u4 } = e11;
        {
          let t13 = function e12(t14) {
            let n13 = t14.subTree.component;
            if (n13) return n13.asyncDep && !n13.asyncResolved ? n13 : e12(n13);
          }(e11);
          if (t13) {
            n12 && (n12.el = u4.el, W2(e11, n12, o11)), t13.asyncDep.then(() => {
              e11.isUnmounted || a11();
            });
            return;
          }
        }
        let d4 = n12;
        iR(e11, false), n12 ? (n12.el = u4.el, W2(e11, n12, o11)) : n12 = u4, r12 && Q(r12), (t12 = n12.props && n12.props.onVnodeBeforeUpdate) && lk(t12, c12, n12, u4), iR(e11, true);
        let p3 = iz(e11), h2 = e11.subTree;
        e11.subTree = p3, x2(h2, p3, f2(h2.el), ei2(h2), e11, l11, s11), n12.el = p3.el, null === d4 && iX(e11, p3.el), i11 && ik(i11, l11), (t12 = n12.props && n12.props.onVnodeUpdated) && ik(() => lk(t12, c12, n12, u4), l11);
      } else {
        let o12;
        let { el: a12, props: c12 } = t11, { bm: u4, m: d4, parent: p3, root: f3, type: h2 } = e11, m2 = rt(t11);
        if (iR(e11, false), u4 && Q(u4), !m2 && (o12 = c12 && c12.onVnodeBeforeMount) && lk(o12, p3, t11), iR(e11, true), a12 && i10) {
          let t12 = () => {
            e11.subTree = iz(e11), i10(a12, e11.subTree, e11, l11, null);
          };
          m2 && h2.__asyncHydrate ? h2.__asyncHydrate(a12, e11, t12) : t12();
        } else {
          f3.ce && f3.ce._injectChildStyle(h2);
          let i11 = e11.subTree = iz(e11);
          x2(null, i11, n11, r11, e11, l11, s11), t11.el = i11.el;
        }
        if (d4 && ik(d4, l11), !m2 && (o12 = c12 && c12.onVnodeMounted)) {
          let e12 = t11;
          ik(() => lk(o12, p3, e12), l11);
        }
        (256 & t11.shapeFlag || p3 && rt(p3.vnode) && 256 & p3.vnode.shapeFlag) && e11.a && ik(e11.a, l11), e11.isMounted = true, t11 = n11 = r11 = null;
      }
    };
    e11.scope.on();
    let c11 = e11.effect = new ek(a11);
    e11.scope.off();
    let u3 = e11.update = c11.run.bind(c11), d3 = e11.job = c11.runIfDirty.bind(c11);
    d3.i = e11, d3.id = e11.uid, c11.scheduler = () => ni(d3), iR(e11, true), u3();
  }, W2 = (e11, t11, n11) => {
    t11.component = e11;
    let r11 = e11.vnode.props;
    e11.vnode = t11, e11.next = null, function(e12, t12, n12, r12) {
      let { props: i11, attrs: l11, vnode: { patchFlag: s11 } } = e12, o11 = tw(i11), [a11] = e12.propsOptions, c11 = false;
      if ((r12 || s11 > 0) && !(16 & s11)) {
        if (8 & s11) {
          let n13 = e12.vnode.dynamicProps;
          for (let r13 = 0; r13 < n13.length; r13++) {
            let s12 = n13[r13];
            if (iK(e12.emitsOptions, s12)) continue;
            let u3 = t12[s12];
            if (a11) {
              if (T(l11, s12)) u3 !== l11[s12] && (l11[s12] = u3, c11 = true);
              else {
                let t13 = q(s12);
                i11[t13] = ih(a11, o11, t13, u3, e12, false);
              }
            } else u3 !== l11[s12] && (l11[s12] = u3, c11 = true);
          }
        }
      } else {
        let r13;
        for (let s12 in ip(e12, t12, i11, l11) && (c11 = true), o11) t12 && (T(t12, s12) || (r13 = K(s12)) !== s12 && T(t12, r13)) || (a11 ? n12 && (void 0 !== n12[s12] || void 0 !== n12[r13]) && (i11[s12] = ih(a11, o11, s12, void 0, e12, true)) : delete i11[s12]);
        if (l11 !== o11) for (let e13 in l11) t12 && T(t12, e13) || (delete l11[e13], c11 = true);
      }
      c11 && eG(e12.attrs, "set", "");
    }(e11, t11.props, r11, n11), iT(e11, t11.children, n11), eF(), no(e11), eV();
  }, z2 = (e11, t11, n11, r11, i11, l11, s11, o11, a11 = false) => {
    let c11 = e11 && e11.children, u3 = e11 ? e11.shapeFlag : 0, d3 = t11.children, { patchFlag: f3, shapeFlag: h2 } = t11;
    if (f3 > 0) {
      if (128 & f3) {
        G2(c11, d3, n11, r11, i11, l11, s11, o11, a11);
        return;
      }
      if (256 & f3) {
        J2(c11, d3, n11, r11, i11, l11, s11, o11, a11);
        return;
      }
    }
    8 & h2 ? (16 & u3 && er2(c11, i11, l11), d3 !== c11 && p2(n11, d3)) : 16 & u3 ? 16 & h2 ? G2(c11, d3, n11, r11, i11, l11, s11, o11, a11) : er2(c11, i11, l11, true) : (8 & u3 && p2(n11, ""), 16 & h2 && M2(d3, n11, r11, i11, l11, s11, o11, a11));
  }, J2 = (e11, t11, n11, r11, i11, l11, s11, o11, a11) => {
    let c11;
    e11 = e11 || m, t11 = t11 || m;
    let u3 = e11.length, d3 = t11.length, p3 = Math.min(u3, d3);
    for (c11 = 0; c11 < p3; c11++) {
      let r12 = t11[c11] = a11 ? lx(t11[c11]) : lS(t11[c11]);
      x2(e11[c11], r12, n11, null, i11, l11, s11, o11, a11);
    }
    u3 > d3 ? er2(e11, i11, l11, true, false, p3) : M2(t11, n11, r11, i11, l11, s11, o11, a11, p3);
  }, G2 = (e11, t11, n11, r11, i11, l11, s11, o11, a11) => {
    let c11 = 0, u3 = t11.length, d3 = e11.length - 1, p3 = u3 - 1;
    for (; c11 <= d3 && c11 <= p3; ) {
      let r12 = e11[c11], u4 = t11[c11] = a11 ? lx(t11[c11]) : lS(t11[c11]);
      if (lu(r12, u4)) x2(r12, u4, n11, null, i11, l11, s11, o11, a11);
      else break;
      c11++;
    }
    for (; c11 <= d3 && c11 <= p3; ) {
      let r12 = e11[d3], c12 = t11[p3] = a11 ? lx(t11[p3]) : lS(t11[p3]);
      if (lu(r12, c12)) x2(r12, c12, n11, null, i11, l11, s11, o11, a11);
      else break;
      d3--, p3--;
    }
    if (c11 > d3) {
      if (c11 <= p3) {
        let e12 = p3 + 1, d4 = e12 < u3 ? t11[e12].el : r11;
        for (; c11 <= p3; ) x2(null, t11[c11] = a11 ? lx(t11[c11]) : lS(t11[c11]), n11, d4, i11, l11, s11, o11, a11), c11++;
      }
    } else if (c11 > p3) for (; c11 <= d3; ) Z2(e11[c11], i11, l11, true), c11++;
    else {
      let f3;
      let h2 = c11, g2 = c11, y3 = /* @__PURE__ */ new Map();
      for (c11 = g2; c11 <= p3; c11++) {
        let e12 = t11[c11] = a11 ? lx(t11[c11]) : lS(t11[c11]);
        null != e12.key && y3.set(e12.key, c11);
      }
      let b3 = 0, _3 = p3 - g2 + 1, S2 = false, C3 = 0, T2 = Array(_3);
      for (c11 = 0; c11 < _3; c11++) T2[c11] = 0;
      for (c11 = h2; c11 <= d3; c11++) {
        let r12;
        let u4 = e11[c11];
        if (b3 >= _3) {
          Z2(u4, i11, l11, true);
          continue;
        }
        if (null != u4.key) r12 = y3.get(u4.key);
        else for (f3 = g2; f3 <= p3; f3++) if (0 === T2[f3 - g2] && lu(u4, t11[f3])) {
          r12 = f3;
          break;
        }
        void 0 === r12 ? Z2(u4, i11, l11, true) : (T2[r12 - g2] = c11 + 1, r12 >= C3 ? C3 = r12 : S2 = true, x2(u4, t11[r12], n11, null, i11, l11, s11, o11, a11), b3++);
      }
      let k3 = S2 ? function(e12) {
        let t12, n12, r12, i12, l12;
        let s12 = e12.slice(), o12 = [0], a12 = e12.length;
        for (t12 = 0; t12 < a12; t12++) {
          let a13 = e12[t12];
          if (0 !== a13) {
            if (e12[n12 = o12[o12.length - 1]] < a13) {
              s12[t12] = n12, o12.push(t12);
              continue;
            }
            for (r12 = 0, i12 = o12.length - 1; r12 < i12; ) e12[o12[l12 = r12 + i12 >> 1]] < a13 ? r12 = l12 + 1 : i12 = l12;
            a13 < e12[o12[r12]] && (r12 > 0 && (s12[t12] = o12[r12 - 1]), o12[r12] = t12);
          }
        }
        for (r12 = o12.length, i12 = o12[r12 - 1]; r12-- > 0; ) o12[r12] = i12, i12 = s12[i12];
        return o12;
      }(T2) : m;
      for (f3 = k3.length - 1, c11 = _3 - 1; c11 >= 0; c11--) {
        let e12 = g2 + c11, d4 = t11[e12], p4 = e12 + 1 < u3 ? t11[e12 + 1].el : r11;
        0 === T2[c11] ? x2(null, d4, n11, p4, i11, l11, s11, o11, a11) : S2 && (f3 < 0 || c11 !== k3[f3] ? X2(d4, n11, p4, 2) : f3--);
      }
    }
  }, X2 = (e11, t11, n11, r11, i11 = null) => {
    let { el: s11, type: o11, transition: a11, children: c11, shapeFlag: u3 } = e11;
    if (6 & u3) {
      X2(e11.component.subTree, t11, n11, r11);
      return;
    }
    if (128 & u3) {
      e11.suspense.move(t11, n11, r11);
      return;
    }
    if (64 & u3) {
      o11.move(e11, t11, n11, eo2);
      return;
    }
    if (o11 === i8) {
      l10(s11, t11, n11);
      for (let e12 = 0; e12 < c11.length; e12++) X2(c11[e12], t11, n11, r11);
      l10(e11.anchor, t11, n11);
      return;
    }
    if (o11 === i7) {
      N2(e11, t11, n11);
      return;
    }
    if (2 !== r11 && 1 & u3 && a11) {
      if (0 === r11) a11.beforeEnter(s11), l10(s11, t11, n11), ik(() => a11.enter(s11), i11);
      else {
        let { leave: e12, delayLeave: r12, afterLeave: i12 } = a11, o12 = () => l10(s11, t11, n11), c12 = () => {
          e12(s11, () => {
            o12(), i12 && i12();
          });
        };
        r12 ? r12(s11, o12, c12) : c12();
      }
    } else l10(s11, t11, n11);
  }, Z2 = (e11, t11, n11, r11 = false, i11 = false) => {
    let l11;
    let { type: s11, props: o11, ref: a11, children: c11, dynamicChildren: u3, shapeFlag: d3, patchFlag: p3, dirs: f3, cacheIndex: h2 } = e11;
    if (-2 === p3 && (i11 = false), null != a11 && nJ(a11, null, n11, e11, true), null != h2 && (t11.renderCache[h2] = void 0), 256 & d3) {
      t11.ctx.deactivate(e11);
      return;
    }
    let m2 = 1 & d3 && f3, g2 = !rt(e11);
    if (g2 && (l11 = o11 && o11.onVnodeBeforeUnmount) && lk(l11, t11, e11), 6 & d3) en2(e11.component, n11, r11);
    else {
      if (128 & d3) {
        e11.suspense.unmount(n11, r11);
        return;
      }
      m2 && nv(e11, null, t11, "beforeUnmount"), 64 & d3 ? e11.type.remove(e11, t11, n11, eo2, r11) : u3 && !u3.hasOnce && (s11 !== i8 || p3 > 0 && 64 & p3) ? er2(u3, t11, n11, false, true) : (s11 === i8 && 384 & p3 || !i11 && 16 & d3) && er2(c11, t11, n11), r11 && Y2(e11);
    }
    (g2 && (l11 = o11 && o11.onVnodeUnmounted) || m2) && ik(() => {
      l11 && lk(l11, t11, e11), m2 && nv(e11, null, t11, "unmounted");
    }, n11);
  }, Y2 = (e11) => {
    let { type: t11, el: n11, anchor: r11, transition: i11 } = e11;
    if (t11 === i8) {
      et2(n11, r11);
      return;
    }
    if (t11 === i7) {
      E2(e11);
      return;
    }
    let l11 = () => {
      s10(n11), i11 && !i11.persisted && i11.afterLeave && i11.afterLeave();
    };
    if (1 & e11.shapeFlag && i11 && !i11.persisted) {
      let { leave: t12, delayLeave: r12 } = i11, s11 = () => t12(n11, l11);
      r12 ? r12(e11.el, l11, s11) : s11();
    } else l11();
  }, et2 = (e11, t11) => {
    let n11;
    for (; e11 !== t11; ) n11 = y2(e11), s10(e11), e11 = n11;
    s10(t11);
  }, en2 = (e11, t11, n11) => {
    let { bum: r11, scope: i11, job: l11, subTree: s11, um: o11, m: a11, a: c11 } = e11;
    iP(a11), iP(c11), r11 && Q(r11), i11.stop(), l11 && (l11.flags |= 8, Z2(s11, e11, t11, n11)), o11 && ik(o11, t11), ik(() => {
      e11.isUnmounted = true;
    }, t11), t11 && t11.pendingBranch && !t11.isUnmounted && e11.asyncDep && !e11.asyncResolved && e11.suspenseId === t11.pendingId && (t11.deps--, 0 === t11.deps && t11.resolve());
  }, er2 = (e11, t11, n11, r11 = false, i11 = false, l11 = 0) => {
    for (let s11 = l11; s11 < e11.length; s11++) Z2(e11[s11], t11, n11, r11, i11);
  }, ei2 = (e11) => {
    if (6 & e11.shapeFlag) return ei2(e11.component.subTree);
    if (128 & e11.shapeFlag) return e11.suspense.next();
    let t11 = y2(e11.anchor || e11.el), n11 = t11 && t11[nb];
    return n11 ? y2(n11) : t11;
  }, el2 = false, es2 = (e11, t11, n11) => {
    null == e11 ? t11._vnode && Z2(t11._vnode, null, null, true) : x2(t11._vnode || null, e11, t11, null, null, null, n11), t11._vnode = e11, el2 || (el2 = true, no(), na(), el2 = false);
  }, eo2 = { p: x2, um: Z2, m: X2, r: Y2, mt: U2, mc: M2, pc: z2, pbc: L2, n: ei2, o: e10 };
  return t10 && ([r10, i10] = t10(eo2)), { render: es2, hydrate: r10, createApp: (n10 = r10, function(e11, t11 = null) {
    R(e11) || (e11 = S({}, e11)), null == t11 || P(t11) || (t11 = null);
    let r11 = ir(), i11 = /* @__PURE__ */ new WeakSet(), l11 = [], s11 = false, o11 = r11.app = { _uid: ii++, _component: e11, _props: t11, _container: null, _context: r11, _instance: null, version: lG, get config() {
      return r11.config;
    }, set config(v) {
    }, use: (e12, ...t12) => (i11.has(e12) || (e12 && R(e12.install) ? (i11.add(e12), e12.install(o11, ...t12)) : R(e12) && (i11.add(e12), e12(o11, ...t12))), o11), mixin: (e12) => (r11.mixins.includes(e12) || r11.mixins.push(e12), o11), component: (e12, t12) => t12 ? (r11.components[e12] = t12, o11) : r11.components[e12], directive: (e12, t12) => t12 ? (r11.directives[e12] = t12, o11) : r11.directives[e12], mount(i12, l12, a11) {
      if (!s11) {
        let c11 = o11._ceVNode || lm(e11, t11);
        return c11.appContext = r11, true === a11 ? a11 = "svg" : false === a11 && (a11 = void 0), l12 && n10 ? n10(c11, i12) : es2(c11, i12, a11), s11 = true, o11._container = i12, i12.__vue_app__ = o11, lj(c11.component);
      }
    }, onUnmount(e12) {
      l11.push(e12);
    }, unmount() {
      s11 && (t3(l11, o11._instance, 16), es2(null, o11._container), delete o11._container.__vue_app__);
    }, provide: (e12, t12) => (r11.provides[e12] = t12, o11), runWithContext(e12) {
      let t12 = il;
      il = o11;
      try {
        return e12();
      } finally {
        il = t12;
      }
    } };
    return o11;
  }) };
}
function iA({ type: e10, props: t10 }, n10) {
  return "svg" === n10 && "foreignObject" === e10 || "mathml" === n10 && "annotation-xml" === e10 && t10 && t10.encoding && t10.encoding.includes("html") ? void 0 : n10;
}
function iR({ effect: e10, job: t10 }, n10) {
  n10 ? (e10.flags |= 32, t10.flags |= 4) : (e10.flags &= -33, t10.flags &= -5);
}
function iI(e10, t10) {
  return (!e10 || e10 && !e10.pendingBranch) && t10 && !t10.persisted;
}
function iO(e10, t10, n10 = false) {
  let r10 = e10.children, i10 = t10.children;
  if (k(r10) && k(i10)) for (let e11 = 0; e11 < r10.length; e11++) {
    let t11 = r10[e11], l10 = i10[e11];
    !(1 & l10.shapeFlag) || l10.dynamicChildren || ((l10.patchFlag <= 0 || 32 === l10.patchFlag) && ((l10 = i10[e11] = lx(i10[e11])).el = t11.el), n10 || -2 === l10.patchFlag || iO(t11, l10)), l10.type === i5 && (l10.el = t11.el);
  }
}
function iP(e10) {
  if (e10) for (let t10 = 0; t10 < e10.length; t10++) e10[t10].flags |= 8;
}
var iM = Symbol.for("v-scx");
var iD = () => io(iM);
function iL(e10, t10) {
  return iB(e10, null, t10);
}
function i$(e10, t10) {
  return iB(e10, null, { flush: "post" });
}
function iF(e10, t10) {
  return iB(e10, null, { flush: "sync" });
}
function iV(e10, t10, n10) {
  return iB(e10, t10, n10);
}
function iB(e10, t10, n10 = h) {
  let r10;
  let { immediate: i10, deep: l10, flush: s10, once: o10 } = n10, a10 = S({}, n10), c10 = t10 && i10 || !t10 && "post" !== s10;
  if (lM) {
    if ("sync" === s10) {
      let e11 = iD();
      r10 = e11.__watcherHandles || (e11.__watcherHandles = []);
    } else if (!c10) {
      let e11 = () => {
      };
      return e11.stop = g, e11.resume = g, e11.pause = g, e11;
    }
  }
  let u2 = lA;
  a10.call = (e11, t11, n11) => t3(e11, u2, t11, n11);
  let p2 = false;
  "post" === s10 ? a10.scheduler = (e11) => {
    ik(e11, u2 && u2.suspense);
  } : "sync" !== s10 && (p2 = true, a10.scheduler = (e11, t11) => {
    t11 ? e11() : ni(e11);
  }), a10.augmentJob = (e11) => {
    t10 && (e11.flags |= 4), p2 && (e11.flags |= 2, u2 && (e11.id = u2.uid, e11.i = u2));
  };
  let f2 = function(e11, t11, n11 = h) {
    let r11, i11, l11, s11;
    let { immediate: o11, deep: a11, once: c11, scheduler: u3, augmentJob: p3, call: f3 } = n11, m2 = (e12) => a11 ? e12 : tT(e12) || false === a11 || 0 === a11 ? t0(e12, 1) : t0(e12), y2 = false, b2 = false;
    if (tR(e11) ? (i11 = () => e11.value, y2 = tT(e11)) : tx(e11) ? (i11 = () => m2(e11), y2 = true) : k(e11) ? (b2 = true, y2 = e11.some((e12) => tx(e12) || tT(e12)), i11 = () => e11.map((e12) => tR(e12) ? e12.value : tx(e12) ? m2(e12) : R(e12) ? f3 ? f3(e12, 2) : e12() : void 0)) : i11 = R(e11) ? t11 ? f3 ? () => f3(e11, 2) : e11 : () => {
      if (l11) {
        eF();
        try {
          l11();
        } finally {
          eV();
        }
      }
      let t12 = d;
      d = r11;
      try {
        return f3 ? f3(e11, 3, [s11]) : e11(s11);
      } finally {
        d = t12;
      }
    } : g, t11 && a11) {
      let e12 = i11, t12 = true === a11 ? 1 / 0 : a11;
      i11 = () => t0(e12(), t12);
    }
    let _2 = ex(), S2 = () => {
      r11.stop(), _2 && x(_2.effects, r11);
    };
    if (c11 && t11) {
      let e12 = t11;
      t11 = (...t12) => {
        e12(...t12), S2();
      };
    }
    let C2 = b2 ? Array(e11.length).fill(tQ) : tQ, T2 = (e12) => {
      if (1 & r11.flags && (r11.dirty || e12)) {
        if (t11) {
          let e13 = r11.run();
          if (a11 || y2 || (b2 ? e13.some((e14, t12) => G(e14, C2[t12])) : G(e13, C2))) {
            l11 && l11();
            let n12 = d;
            d = r11;
            try {
              let n13 = [e13, C2 === tQ ? void 0 : b2 && C2[0] === tQ ? [] : C2, s11];
              f3 ? f3(t11, 3, n13) : t11(...n13), C2 = e13;
            } finally {
              d = n12;
            }
          }
        } else r11.run();
      }
    };
    return p3 && p3(T2), (r11 = new ek(i11)).scheduler = u3 ? () => u3(T2, false) : T2, s11 = (e12) => tY(e12, false, r11), l11 = r11.onStop = () => {
      let e12 = tX.get(r11);
      if (e12) {
        if (f3) f3(e12, 4);
        else for (let t12 of e12) t12();
        tX.delete(r11);
      }
    }, t11 ? o11 ? T2(true) : C2 = r11.run() : u3 ? u3(T2.bind(null, true), true) : r11.run(), S2.pause = r11.pause.bind(r11), S2.resume = r11.resume.bind(r11), S2.stop = S2, S2;
  }(e10, t10, a10);
  return lM && (r10 ? r10.push(f2) : c10 && f2()), f2;
}
function iU(e10, t10, n10) {
  let r10;
  let i10 = this.proxy, l10 = I(e10) ? e10.includes(".") ? ij(i10, e10) : () => i10[e10] : e10.bind(i10, i10);
  R(t10) ? r10 = t10 : (r10 = t10.handler, n10 = t10);
  let s10 = lI(this), o10 = iB(l10, r10.bind(i10), n10);
  return s10(), o10;
}
function ij(e10, t10) {
  let n10 = t10.split(".");
  return () => {
    let t11 = e10;
    for (let e11 = 0; e11 < n10.length && t11; e11++) t11 = t11[n10[e11]];
    return t11;
  };
}
function iH(e10, t10, n10 = h) {
  let r10 = lR(), i10 = q(t10), l10 = K(t10), s10 = iq(e10, i10), o10 = tU((s11, o11) => {
    let a10, c10;
    let u2 = h;
    return iF(() => {
      let t11 = e10[i10];
      G(a10, t11) && (a10 = t11, o11());
    }), { get: () => (s11(), n10.get ? n10.get(a10) : a10), set(e11) {
      let s12 = n10.set ? n10.set(e11) : e11;
      if (!G(s12, a10) && !(u2 !== h && G(e11, u2))) return;
      let d2 = r10.vnode.props;
      d2 && (t10 in d2 || i10 in d2 || l10 in d2) && (`onUpdate:${t10}` in d2 || `onUpdate:${i10}` in d2 || `onUpdate:${l10}` in d2) || (a10 = e11, o11()), r10.emit(`update:${t10}`, s12), G(e11, s12) && G(e11, u2) && !G(s12, c10) && o11(), u2 = e11, c10 = s12;
    } };
  });
  return o10[Symbol.iterator] = () => {
    let e11 = 0;
    return { next: () => e11 < 2 ? { value: e11++ ? s10 || h : o10, done: false } : { done: true } };
  }, o10;
}
var iq = (e10, t10) => "modelValue" === t10 || "model-value" === t10 ? e10.modelModifiers : e10[`${t10}Modifiers`] || e10[`${q(t10)}Modifiers`] || e10[`${K(t10)}Modifiers`];
function iW(e10, t10, ...n10) {
  let r10;
  if (e10.isUnmounted) return;
  let i10 = e10.vnode.props || h, l10 = n10, s10 = t10.startsWith("update:"), o10 = s10 && iq(i10, t10.slice(7));
  o10 && (o10.trim && (l10 = n10.map((e11) => I(e11) ? e11.trim() : e11)), o10.number && (l10 = n10.map(Z)));
  let a10 = i10[r10 = J(t10)] || i10[r10 = J(q(t10))];
  !a10 && s10 && (a10 = i10[r10 = J(K(t10))]), a10 && t3(a10, e10, 6, l10);
  let c10 = i10[r10 + "Once"];
  if (c10) {
    if (e10.emitted) {
      if (e10.emitted[r10]) return;
    } else e10.emitted = {};
    e10.emitted[r10] = true, t3(c10, e10, 6, l10);
  }
}
function iK(e10, t10) {
  return !!(e10 && b(t10)) && (T(e10, (t10 = t10.slice(2).replace(/Once$/, ""))[0].toLowerCase() + t10.slice(1)) || T(e10, K(t10)) || T(e10, t10));
}
function iz(e10) {
  let t10, n10;
  let { type: r10, vnode: i10, proxy: l10, withProxy: s10, propsOptions: [o10], slots: a10, attrs: c10, emit: u2, render: d2, renderCache: p2, props: f2, data: h2, setupState: m2, ctx: g2, inheritAttrs: y2 } = e10, b2 = np(e10);
  try {
    if (4 & i10.shapeFlag) {
      let e11 = s10 || l10;
      t10 = lS(d2.call(e11, e11, p2, f2, m2, h2, g2)), n10 = c10;
    } else t10 = lS(r10.length > 1 ? r10(f2, { attrs: c10, slots: a10, emit: u2 }) : r10(f2, null)), n10 = r10.props ? c10 : iJ(c10);
  } catch (n11) {
    le.length = 0, t4(n11, e10, 1), t10 = lm(i9);
  }
  let S2 = t10;
  if (n10 && false !== y2) {
    let e11 = Object.keys(n10), { shapeFlag: t11 } = S2;
    e11.length && 7 & t11 && (o10 && e11.some(_) && (n10 = iG(n10, o10)), S2 = ly(S2, n10, false, true));
  }
  return i10.dirs && ((S2 = ly(S2, null, false, true)).dirs = S2.dirs ? S2.dirs.concat(i10.dirs) : i10.dirs), i10.transition && nj(S2, i10.transition), t10 = S2, np(b2), t10;
}
var iJ = (e10) => {
  let t10;
  for (let n10 in e10) ("class" === n10 || "style" === n10 || b(n10)) && ((t10 || (t10 = {}))[n10] = e10[n10]);
  return t10;
};
var iG = (e10, t10) => {
  let n10 = {};
  for (let r10 in e10) _(r10) && r10.slice(9) in t10 || (n10[r10] = e10[r10]);
  return n10;
};
function iQ(e10, t10, n10) {
  let r10 = Object.keys(t10);
  if (r10.length !== Object.keys(e10).length) return true;
  for (let i10 = 0; i10 < r10.length; i10++) {
    let l10 = r10[i10];
    if (t10[l10] !== e10[l10] && !iK(n10, l10)) return true;
  }
  return false;
}
function iX({ vnode: e10, parent: t10 }, n10) {
  for (; t10; ) {
    let r10 = t10.subTree;
    if (r10.suspense && r10.suspense.activeBranch === e10 && (r10.el = e10.el), r10 === e10) (e10 = t10.vnode).el = n10, t10 = t10.parent;
    else break;
  }
}
var iZ = (e10) => e10.__isSuspense;
var iY = 0;
var i0 = { name: "Suspense", __isSuspense: true, process(e10, t10, n10, r10, i10, l10, s10, o10, a10, c10) {
  if (null == e10) !function(e11, t11, n11, r11, i11, l11, s11, o11, a11) {
    let { p: c11, o: { createElement: u2 } } = a11, d2 = u2("div"), p2 = e11.suspense = i2(e11, i11, r11, t11, d2, n11, l11, s11, o11, a11);
    c11(null, p2.pendingBranch = e11.ssContent, d2, null, r11, p2, l11, s11), p2.deps > 0 ? (i1(e11, "onPending"), i1(e11, "onFallback"), c11(null, e11.ssFallback, t11, n11, r11, null, l11, s11), i4(p2, e11.ssFallback)) : p2.resolve(false, true);
  }(t10, n10, r10, i10, l10, s10, o10, a10, c10);
  else {
    if (l10 && l10.deps > 0 && !e10.suspense.isInFallback) {
      t10.suspense = e10.suspense, t10.suspense.vnode = t10, t10.el = e10.el;
      return;
    }
    !function(e11, t11, n11, r11, i11, l11, s11, o11, { p: a11, um: c11, o: { createElement: u2 } }) {
      let d2 = t11.suspense = e11.suspense;
      d2.vnode = t11, t11.el = e11.el;
      let p2 = t11.ssContent, f2 = t11.ssFallback, { activeBranch: h2, pendingBranch: m2, isInFallback: g2, isHydrating: y2 } = d2;
      if (m2) d2.pendingBranch = p2, lu(p2, m2) ? (a11(m2, p2, d2.hiddenContainer, null, i11, d2, l11, s11, o11), d2.deps <= 0 ? d2.resolve() : g2 && !y2 && (a11(h2, f2, n11, r11, i11, null, l11, s11, o11), i4(d2, f2))) : (d2.pendingId = iY++, y2 ? (d2.isHydrating = false, d2.activeBranch = m2) : c11(m2, i11, d2), d2.deps = 0, d2.effects.length = 0, d2.hiddenContainer = u2("div"), g2 ? (a11(null, p2, d2.hiddenContainer, null, i11, d2, l11, s11, o11), d2.deps <= 0 ? d2.resolve() : (a11(h2, f2, n11, r11, i11, null, l11, s11, o11), i4(d2, f2))) : h2 && lu(p2, h2) ? (a11(h2, p2, n11, r11, i11, d2, l11, s11, o11), d2.resolve(true)) : (a11(null, p2, d2.hiddenContainer, null, i11, d2, l11, s11, o11), d2.deps <= 0 && d2.resolve()));
      else if (h2 && lu(p2, h2)) a11(h2, p2, n11, r11, i11, d2, l11, s11, o11), i4(d2, p2);
      else if (i1(t11, "onPending"), d2.pendingBranch = p2, 512 & p2.shapeFlag ? d2.pendingId = p2.component.suspenseId : d2.pendingId = iY++, a11(null, p2, d2.hiddenContainer, null, i11, d2, l11, s11, o11), d2.deps <= 0) d2.resolve();
      else {
        let { timeout: e12, pendingId: t12 } = d2;
        e12 > 0 ? setTimeout(() => {
          d2.pendingId === t12 && d2.fallback(f2);
        }, e12) : 0 === e12 && d2.fallback(f2);
      }
    }(e10, t10, n10, r10, i10, s10, o10, a10, c10);
  }
}, hydrate: function(e10, t10, n10, r10, i10, l10, s10, o10, a10) {
  let c10 = t10.suspense = i2(t10, r10, n10, e10.parentNode, document.createElement("div"), null, i10, l10, s10, o10, true), u2 = a10(e10, c10.pendingBranch = t10.ssContent, n10, c10, l10, s10);
  return 0 === c10.deps && c10.resolve(false, true), u2;
}, normalize: function(e10) {
  let { shapeFlag: t10, children: n10 } = e10, r10 = 32 & t10;
  e10.ssContent = i6(r10 ? n10.default : n10), e10.ssFallback = r10 ? i6(n10.fallback) : lm(i9);
} };
function i1(e10, t10) {
  let n10 = e10.props && e10.props[t10];
  R(n10) && n10();
}
function i2(e10, t10, n10, r10, i10, l10, s10, o10, a10, c10, u2 = false) {
  let d2;
  let { p: p2, m: f2, um: h2, n: m2, o: { parentNode: g2, remove: y2 } } = c10, b2 = function(e11) {
    let t11 = e11.props && e11.props.suspensible;
    return null != t11 && false !== t11;
  }(e10);
  b2 && t10 && t10.pendingBranch && (d2 = t10.pendingId, t10.deps++);
  let _2 = e10.props ? Y(e10.props.timeout) : void 0, S2 = l10, x2 = { vnode: e10, parent: t10, parentComponent: n10, namespace: s10, container: r10, hiddenContainer: i10, deps: 0, pendingId: iY++, timeout: "number" == typeof _2 ? _2 : -1, activeBranch: null, pendingBranch: null, isInFallback: !u2, isHydrating: u2, isUnmounted: false, effects: [], resolve(e11 = false, n11 = false) {
    let { vnode: r11, activeBranch: i11, pendingBranch: s11, pendingId: o11, effects: a11, parentComponent: c11, container: u3 } = x2, p3 = false;
    x2.isHydrating ? x2.isHydrating = false : e11 || ((p3 = i11 && s11.transition && "out-in" === s11.transition.mode) && (i11.transition.afterLeave = () => {
      o11 === x2.pendingId && (f2(s11, u3, l10 === S2 ? m2(i11) : l10, 0), ns(a11));
    }), i11 && (g2(i11.el) === u3 && (l10 = m2(i11)), h2(i11, c11, x2, true)), p3 || f2(s11, u3, l10, 0)), i4(x2, s11), x2.pendingBranch = null, x2.isInFallback = false;
    let y3 = x2.parent, _3 = false;
    for (; y3; ) {
      if (y3.pendingBranch) {
        y3.effects.push(...a11), _3 = true;
        break;
      }
      y3 = y3.parent;
    }
    _3 || p3 || ns(a11), x2.effects = [], b2 && t10 && t10.pendingBranch && d2 === t10.pendingId && (t10.deps--, 0 !== t10.deps || n11 || t10.resolve()), i1(r11, "onResolve");
  }, fallback(e11) {
    if (!x2.pendingBranch) return;
    let { vnode: t11, activeBranch: n11, parentComponent: r11, container: i11, namespace: l11 } = x2;
    i1(t11, "onFallback");
    let s11 = m2(n11), c11 = () => {
      x2.isInFallback && (p2(null, e11, i11, s11, r11, null, l11, o10, a10), i4(x2, e11));
    }, u3 = e11.transition && "out-in" === e11.transition.mode;
    u3 && (n11.transition.afterLeave = c11), x2.isInFallback = true, h2(n11, r11, null, true), u3 || c11();
  }, move(e11, t11, n11) {
    x2.activeBranch && f2(x2.activeBranch, e11, t11, n11), x2.container = e11;
  }, next: () => x2.activeBranch && m2(x2.activeBranch), registerDep(e11, t11, n11) {
    let r11 = !!x2.pendingBranch;
    r11 && x2.deps++;
    let i11 = e11.vnode.el;
    e11.asyncDep.catch((t12) => {
      t4(t12, e11, 0);
    }).then((l11) => {
      if (e11.isUnmounted || x2.isUnmounted || x2.pendingId !== e11.suspenseId) return;
      e11.asyncResolved = true;
      let { vnode: o11 } = e11;
      lL(e11, l11, false), i11 && (o11.el = i11);
      let a11 = !i11 && e11.subTree.el;
      t11(e11, o11, g2(i11 || e11.subTree.el), i11 ? null : m2(e11.subTree), x2, s10, n11), a11 && y2(a11), iX(e11, o11.el), r11 && 0 == --x2.deps && x2.resolve();
    });
  }, unmount(e11, t11) {
    x2.isUnmounted = true, x2.activeBranch && h2(x2.activeBranch, n10, e11, t11), x2.pendingBranch && h2(x2.pendingBranch, n10, e11, t11);
  } };
  return x2;
}
function i6(e10) {
  let t10;
  if (R(e10)) {
    let n10 = li && e10._c;
    n10 && (e10._d = false, ln()), e10 = e10(), n10 && (e10._d = true, t10 = lt, lr());
  }
  return k(e10) && (e10 = function(e11, t11 = true) {
    let n10;
    for (let t12 = 0; t12 < e11.length; t12++) {
      let r10 = e11[t12];
      if (!lc(r10)) return;
      if (r10.type !== i9 || "v-if" === r10.children) {
        if (n10) return;
        n10 = r10;
      }
    }
    return n10;
  }(e10)), e10 = lS(e10), t10 && !e10.dynamicChildren && (e10.dynamicChildren = t10.filter((t11) => t11 !== e10)), e10;
}
function i3(e10, t10) {
  t10 && t10.pendingBranch ? k(e10) ? t10.effects.push(...e10) : t10.effects.push(e10) : ns(e10);
}
function i4(e10, t10) {
  e10.activeBranch = t10;
  let { vnode: n10, parentComponent: r10 } = e10, i10 = t10.el;
  for (; !i10 && t10.component; ) i10 = (t10 = t10.component.subTree).el;
  n10.el = i10, r10 && r10.subTree === n10 && (r10.vnode.el = i10, iX(r10, i10));
}
var i8 = Symbol.for("v-fgt");
var i5 = Symbol.for("v-txt");
var i9 = Symbol.for("v-cmt");
var i7 = Symbol.for("v-stc");
var le = [];
var lt = null;
function ln(e10 = false) {
  le.push(lt = e10 ? null : []);
}
function lr() {
  le.pop(), lt = le[le.length - 1] || null;
}
var li = 1;
function ll(e10) {
  li += e10, e10 < 0 && lt && (lt.hasOnce = true);
}
function ls(e10) {
  return e10.dynamicChildren = li > 0 ? lt || m : null, lr(), li > 0 && lt && lt.push(e10), e10;
}
function lo(e10, t10, n10, r10, i10, l10) {
  return ls(lh(e10, t10, n10, r10, i10, l10, true));
}
function la(e10, t10, n10, r10, i10) {
  return ls(lm(e10, t10, n10, r10, i10, true));
}
function lc(e10) {
  return !!e10 && true === e10.__v_isVNode;
}
function lu(e10, t10) {
  return e10.type === t10.type && e10.key === t10.key;
}
function ld(e10) {
}
var lp = ({ key: e10 }) => null != e10 ? e10 : null;
var lf = ({ ref: e10, ref_key: t10, ref_for: n10 }) => ("number" == typeof e10 && (e10 = "" + e10), null != e10 ? I(e10) || tR(e10) || R(e10) ? { i: nu, r: e10, k: t10, f: !!n10 } : e10 : null);
function lh(e10, t10 = null, n10 = null, r10 = 0, i10 = null, l10 = e10 === i8 ? 0 : 1, s10 = false, o10 = false) {
  let a10 = { __v_isVNode: true, __v_skip: true, type: e10, props: t10, key: t10 && lp(t10), ref: t10 && lf(t10), scopeId: nd, slotScopeIds: null, children: n10, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: l10, patchFlag: r10, dynamicProps: i10, dynamicChildren: null, appContext: null, ctx: nu };
  return o10 ? (lC(a10, n10), 128 & l10 && e10.normalize(a10)) : n10 && (a10.shapeFlag |= I(n10) ? 8 : 16), li > 0 && !s10 && lt && (a10.patchFlag > 0 || 6 & l10) && 32 !== a10.patchFlag && lt.push(a10), a10;
}
var lm = function(e10, t10 = null, n10 = null, r10 = 0, i10 = null, l10 = false) {
  var s10;
  if (e10 && e10 !== rw || (e10 = i9), lc(e10)) {
    let r11 = ly(e10, t10, true);
    return n10 && lC(r11, n10), li > 0 && !l10 && lt && (6 & r11.shapeFlag ? lt[lt.indexOf(e10)] = r11 : lt.push(r11)), r11.patchFlag = -2, r11;
  }
  if (R(s10 = e10) && "__vccOpts" in s10 && (e10 = e10.__vccOpts), t10) {
    let { class: e11, style: n11 } = t10 = lg(t10);
    e11 && !I(e11) && (t10.class = eo(e11)), P(n11) && (tk(n11) && !k(n11) && (n11 = S({}, n11)), t10.style = en(n11));
  }
  let o10 = I(e10) ? 1 : iZ(e10) ? 128 : n_(e10) ? 64 : P(e10) ? 4 : R(e10) ? 2 : 0;
  return lh(e10, t10, n10, r10, i10, o10, l10, true);
};
function lg(e10) {
  return e10 ? tk(e10) || id(e10) ? S({}, e10) : e10 : null;
}
function ly(e10, t10, n10 = false, r10 = false) {
  let { props: i10, ref: l10, patchFlag: s10, children: o10, transition: a10 } = e10, c10 = t10 ? lT(i10 || {}, t10) : i10, u2 = { __v_isVNode: true, __v_skip: true, type: e10.type, props: c10, key: c10 && lp(c10), ref: t10 && t10.ref ? n10 && l10 ? k(l10) ? l10.concat(lf(t10)) : [l10, lf(t10)] : lf(t10) : l10, scopeId: e10.scopeId, slotScopeIds: e10.slotScopeIds, children: o10, target: e10.target, targetStart: e10.targetStart, targetAnchor: e10.targetAnchor, staticCount: e10.staticCount, shapeFlag: e10.shapeFlag, patchFlag: t10 && e10.type !== i8 ? -1 === s10 ? 16 : 16 | s10 : s10, dynamicProps: e10.dynamicProps, dynamicChildren: e10.dynamicChildren, appContext: e10.appContext, dirs: e10.dirs, transition: a10, component: e10.component, suspense: e10.suspense, ssContent: e10.ssContent && ly(e10.ssContent), ssFallback: e10.ssFallback && ly(e10.ssFallback), el: e10.el, anchor: e10.anchor, ctx: e10.ctx, ce: e10.ce };
  return a10 && r10 && nj(u2, a10.clone(u2)), u2;
}
function lv(e10 = " ", t10 = 0) {
  return lm(i5, null, e10, t10);
}
function lb(e10, t10) {
  let n10 = lm(i7, null, e10);
  return n10.staticCount = t10, n10;
}
function l_(e10 = "", t10 = false) {
  return t10 ? (ln(), la(i9, null, e10)) : lm(i9, null, e10);
}
function lS(e10) {
  return null == e10 || "boolean" == typeof e10 ? lm(i9) : k(e10) ? lm(i8, null, e10.slice()) : lc(e10) ? lx(e10) : lm(i5, null, String(e10));
}
function lx(e10) {
  return null === e10.el && -1 !== e10.patchFlag || e10.memo ? e10 : ly(e10);
}
function lC(e10, t10) {
  let n10 = 0, { shapeFlag: r10 } = e10;
  if (null == t10) t10 = null;
  else if (k(t10)) n10 = 16;
  else if ("object" == typeof t10) {
    if (65 & r10) {
      let n11 = t10.default;
      n11 && (n11._c && (n11._d = false), lC(e10, n11()), n11._c && (n11._d = true));
      return;
    }
    {
      n10 = 32;
      let r11 = t10._;
      r11 || id(t10) ? 3 === r11 && nu && (1 === nu.slots._ ? t10._ = 1 : (t10._ = 2, e10.patchFlag |= 1024)) : t10._ctx = nu;
    }
  } else R(t10) ? (t10 = { default: t10, _ctx: nu }, n10 = 32) : (t10 = String(t10), 64 & r10 ? (n10 = 16, t10 = [lv(t10)]) : n10 = 8);
  e10.children = t10, e10.shapeFlag |= n10;
}
function lT(...e10) {
  let t10 = {};
  for (let n10 = 0; n10 < e10.length; n10++) {
    let r10 = e10[n10];
    for (let e11 in r10) if ("class" === e11) t10.class !== r10.class && (t10.class = eo([t10.class, r10.class]));
    else if ("style" === e11) t10.style = en([t10.style, r10.style]);
    else if (b(e11)) {
      let n11 = t10[e11], i10 = r10[e11];
      i10 && n11 !== i10 && !(k(n11) && n11.includes(i10)) && (t10[e11] = n11 ? [].concat(n11, i10) : i10);
    } else "" !== e11 && (t10[e11] = r10[e11]);
  }
  return t10;
}
function lk(e10, t10, n10, r10 = null) {
  t3(e10, t10, 7, [n10, r10]);
}
var lw = ir();
var lN = 0;
function lE(e10, t10, n10) {
  let r10 = e10.type, i10 = (t10 ? t10.appContext : e10.appContext) || lw, l10 = { uid: lN++, vnode: e10, type: r10, parent: t10, appContext: i10, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new e_(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t10 ? t10.provides : Object.create(i10.provides), ids: t10 ? t10.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: function e11(t11, n11, r11 = false) {
    let i11 = r11 ? im : n11.propsCache, l11 = i11.get(t11);
    if (l11) return l11;
    let s10 = t11.props, o10 = {}, a10 = [], c10 = false;
    if (!R(t11)) {
      let i12 = (t12) => {
        c10 = true;
        let [r12, i13] = e11(t12, n11, true);
        S(o10, r12), i13 && a10.push(...i13);
      };
      !r11 && n11.mixins.length && n11.mixins.forEach(i12), t11.extends && i12(t11.extends), t11.mixins && t11.mixins.forEach(i12);
    }
    if (!s10 && !c10) return P(t11) && i11.set(t11, m), m;
    if (k(s10)) for (let e12 = 0; e12 < s10.length; e12++) {
      let t12 = q(s10[e12]);
      ig(t12) && (o10[t12] = h);
    }
    else if (s10) for (let e12 in s10) {
      let t12 = q(e12);
      if (ig(t12)) {
        let n12 = s10[e12], r12 = o10[t12] = k(n12) || R(n12) ? { type: n12 } : S({}, n12), i12 = r12.type, l12 = false, c11 = true;
        if (k(i12)) for (let e13 = 0; e13 < i12.length; ++e13) {
          let t13 = i12[e13], n13 = R(t13) && t13.name;
          if ("Boolean" === n13) {
            l12 = true;
            break;
          }
          "String" === n13 && (c11 = false);
        }
        else l12 = R(i12) && "Boolean" === i12.name;
        r12[0] = l12, r12[1] = c11, (l12 || T(r12, "default")) && a10.push(t12);
      }
    }
    let u2 = [o10, a10];
    return P(t11) && i11.set(t11, u2), u2;
  }(r10, i10), emitsOptions: function e11(t11, n11, r11 = false) {
    let i11 = n11.emitsCache, l11 = i11.get(t11);
    if (void 0 !== l11) return l11;
    let s10 = t11.emits, o10 = {}, a10 = false;
    if (!R(t11)) {
      let i12 = (t12) => {
        let r12 = e11(t12, n11, true);
        r12 && (a10 = true, S(o10, r12));
      };
      !r11 && n11.mixins.length && n11.mixins.forEach(i12), t11.extends && i12(t11.extends), t11.mixins && t11.mixins.forEach(i12);
    }
    return s10 || a10 ? (k(s10) ? s10.forEach((e12) => o10[e12] = null) : S(o10, s10), P(t11) && i11.set(t11, o10), o10) : (P(t11) && i11.set(t11, null), null);
  }(r10, i10), emit: null, emitted: null, propsDefaults: h, inheritAttrs: r10.inheritAttrs, ctx: h, data: h, props: h, attrs: h, slots: h, refs: h, setupState: h, setupContext: null, suspense: n10, suspenseId: n10 ? n10.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return l10.ctx = { _: l10 }, l10.root = t10 ? t10.root : l10, l10.emit = iW.bind(null, l10), e10.ce && e10.ce(l10), l10;
}
var lA = null;
var lR = () => lA || nu;
{
  let e10 = ee(), t10 = (t11, n10) => {
    let r10;
    return (r10 = e10[t11]) || (r10 = e10[t11] = []), r10.push(n10), (e11) => {
      r10.length > 1 ? r10.forEach((t12) => t12(e11)) : r10[0](e11);
    };
  };
  l = t10("__VUE_INSTANCE_SETTERS__", (e11) => lA = e11), s = t10("__VUE_SSR_SETTERS__", (e11) => lM = e11);
}
var lI = (e10) => {
  let t10 = lA;
  return l(e10), e10.scope.on(), () => {
    e10.scope.off(), l(t10);
  };
};
var lO = () => {
  lA && lA.scope.off(), l(null);
};
function lP(e10) {
  return 4 & e10.vnode.shapeFlag;
}
var lM = false;
function lD(e10, t10 = false, n10 = false) {
  t10 && s(t10);
  let { props: r10, children: i10 } = e10.vnode, l10 = lP(e10);
  !function(e11, t11, n11, r11 = false) {
    let i11 = {}, l11 = iu();
    for (let n12 in e11.propsDefaults = /* @__PURE__ */ Object.create(null), ip(e11, t11, i11, l11), e11.propsOptions[0]) n12 in i11 || (i11[n12] = void 0);
    n11 ? e11.props = r11 ? i11 : tv(i11) : e11.type.props ? e11.props = i11 : e11.props = l11, e11.attrs = l11;
  }(e10, r10, l10, t10), iC(e10, i10, n10);
  let o10 = l10 ? function(e11, t11) {
    let n11 = e11.type;
    e11.accessCache = /* @__PURE__ */ Object.create(null), e11.proxy = new Proxy(e11.ctx, rV);
    let { setup: r11 } = n11;
    if (r11) {
      eF();
      let n12 = e11.setupContext = r11.length > 1 ? lU(e11) : null, i11 = lI(e11), l11 = t6(r11, e11, 0, [e11.props, n12]), s10 = M(l11);
      if (eV(), i11(), (s10 || e11.sp) && !rt(e11) && nK(e11), s10) {
        if (l11.then(lO, lO), t11) return l11.then((n13) => {
          lL(e11, n13, t11);
        }).catch((t12) => {
          t4(t12, e11, 0);
        });
        e11.asyncDep = l11;
      } else lL(e11, l11, t11);
    } else lV(e11, t11);
  }(e10, t10) : void 0;
  return t10 && s(false), o10;
}
function lL(e10, t10, n10) {
  R(t10) ? e10.type.__ssrInlineRender ? e10.ssrRender = t10 : e10.render = t10 : P(t10) && (e10.setupState = tV(t10)), lV(e10, n10);
}
function l$(e10) {
  o = e10, a = (e11) => {
    e11.render._rc && (e11.withProxy = new Proxy(e11.ctx, rB));
  };
}
var lF = () => !o;
function lV(e10, t10, n10) {
  let r10 = e10.type;
  if (!e10.render) {
    if (!t10 && o && !r10.render) {
      let t11 = r10.template || r3(e10).template;
      if (t11) {
        let { isCustomElement: n11, compilerOptions: i10 } = e10.appContext.config, { delimiters: l10, compilerOptions: s10 } = r10, a10 = S(S({ isCustomElement: n11, delimiters: l10 }, i10), s10);
        r10.render = o(t11, a10);
      }
    }
    e10.render = r10.render || g, a && a(e10);
  }
  {
    let t11 = lI(e10);
    eF();
    try {
      !function(e11) {
        let t12 = r3(e11), n11 = e11.proxy, r11 = e11.ctx;
        r2 = false, t12.beforeCreate && r6(t12.beforeCreate, e11, "bc");
        let { data: i10, computed: l10, methods: s10, watch: o10, provide: a10, inject: c10, created: u2, beforeMount: d2, mounted: p2, beforeUpdate: f2, updated: h2, activated: m2, deactivated: y2, beforeDestroy: b2, beforeUnmount: _2, destroyed: S2, unmounted: x2, render: C2, renderTracked: T2, renderTriggered: w2, errorCaptured: N2, serverPrefetch: E2, expose: A2, inheritAttrs: O2, components: M2, directives: D2, filters: L2 } = t12;
        if (c10 && function(e12, t13, n12 = g) {
          for (let n13 in k(e12) && (e12 = r9(e12)), e12) {
            let r12;
            let i11 = e12[n13];
            tR(r12 = P(i11) ? "default" in i11 ? io(i11.from || n13, i11.default, true) : io(i11.from || n13) : io(i11)) ? Object.defineProperty(t13, n13, { enumerable: true, configurable: true, get: () => r12.value, set: (e13) => r12.value = e13 }) : t13[n13] = r12;
          }
        }(c10, r11, null), s10) for (let e12 in s10) {
          let t13 = s10[e12];
          R(t13) && (r11[e12] = t13.bind(n11));
        }
        if (i10) {
          let t13 = i10.call(n11, n11);
          P(t13) && (e11.data = ty(t13));
        }
        if (r2 = true, l10) for (let e12 in l10) {
          let t13 = l10[e12], i11 = R(t13) ? t13.bind(n11, n11) : R(t13.get) ? t13.get.bind(n11, n11) : g, s11 = lq({ get: i11, set: !R(t13) && R(t13.set) ? t13.set.bind(n11) : g });
          Object.defineProperty(r11, e12, { enumerable: true, configurable: true, get: () => s11.value, set: (e13) => s11.value = e13 });
        }
        if (o10) for (let e12 in o10) !function e13(t13, n12, r12, i11) {
          let l11 = i11.includes(".") ? ij(r12, i11) : () => r12[i11];
          if (I(t13)) {
            let e14 = n12[t13];
            R(e14) && iV(l11, e14);
          } else if (R(t13)) iV(l11, t13.bind(r12));
          else if (P(t13)) {
            if (k(t13)) t13.forEach((t14) => e13(t14, n12, r12, i11));
            else {
              let e14 = R(t13.handler) ? t13.handler.bind(r12) : n12[t13.handler];
              R(e14) && iV(l11, e14, t13);
            }
          }
        }(o10[e12], r11, n11, e12);
        if (a10) {
          let e12 = R(a10) ? a10.call(n11) : a10;
          Reflect.ownKeys(e12).forEach((t13) => {
            is(t13, e12[t13]);
          });
        }
        function $3(e12, t13) {
          k(t13) ? t13.forEach((t14) => e12(t14.bind(n11))) : t13 && e12(t13.bind(n11));
        }
        if (u2 && r6(u2, e11, "c"), $3(rh, d2), $3(rm, p2), $3(rg, f2), $3(ry, h2), $3(ro, m2), $3(ra, y2), $3(rC, N2), $3(rx, T2), $3(rS, w2), $3(rv, _2), $3(rb, x2), $3(r_, E2), k(A2)) {
          if (A2.length) {
            let t13 = e11.exposed || (e11.exposed = {});
            A2.forEach((e12) => {
              Object.defineProperty(t13, e12, { get: () => n11[e12], set: (t14) => n11[e12] = t14 });
            });
          } else e11.exposed || (e11.exposed = {});
        }
        C2 && e11.render === g && (e11.render = C2), null != O2 && (e11.inheritAttrs = O2), M2 && (e11.components = M2), D2 && (e11.directives = D2), E2 && nK(e11);
      }(e10);
    } finally {
      eV(), t11();
    }
  }
}
var lB = { get: (e10, t10) => (eJ(e10, "get", ""), e10[t10]) };
function lU(e10) {
  return { attrs: new Proxy(e10.attrs, lB), slots: e10.slots, emit: e10.emit, expose: (t10) => {
    e10.exposed = t10 || {};
  } };
}
function lj(e10) {
  return e10.exposed ? e10.exposeProxy || (e10.exposeProxy = new Proxy(tV(tN(e10.exposed)), { get: (t10, n10) => n10 in t10 ? t10[n10] : n10 in r$ ? r$[n10](e10) : void 0, has: (e11, t10) => t10 in e11 || t10 in r$ })) : e10.proxy;
}
function lH(e10, t10 = true) {
  return R(e10) ? e10.displayName || e10.name : e10.name || t10 && e10.__name;
}
var lq = (e10, t10) => function(e11, t11, n10 = false) {
  let r10, i10;
  return R(e11) ? r10 = e11 : (r10 = e11.get, i10 = e11.set), new tz(r10, i10, n10);
}(e10, 0, lM);
function lW(e10, t10, n10) {
  let r10 = arguments.length;
  return 2 !== r10 ? (r10 > 3 ? n10 = Array.prototype.slice.call(arguments, 2) : 3 === r10 && lc(n10) && (n10 = [n10]), lm(e10, t10, n10)) : !P(t10) || k(t10) ? lm(e10, null, t10) : lc(t10) ? lm(e10, null, [t10]) : lm(e10, t10);
}
function lK() {
}
function lz(e10, t10, n10, r10) {
  let i10 = n10[r10];
  if (i10 && lJ(i10, e10)) return i10;
  let l10 = t10();
  return l10.memo = e10.slice(), l10.cacheIndex = r10, n10[r10] = l10;
}
function lJ(e10, t10) {
  let n10 = e10.memo;
  if (n10.length != t10.length) return false;
  for (let e11 = 0; e11 < n10.length; e11++) if (G(n10[e11], t10[e11])) return false;
  return li > 0 && lt && lt.push(e10), true;
}
var lG = "3.5.12";
var lQ = g;
var lX = null;
var lZ = void 0;
var lY = g;
var l0 = { createComponentInstance: lE, setupComponent: lD, renderComponentRoot: iz, setCurrentRenderingInstance: np, isVNode: lc, normalizeVNode: lS, getComponentPublicInstance: lj, ensureValidVNode: rM, pushWarningContext: function(e10) {
}, popWarningContext: function() {
} };
var l1 = null;
var l2 = null;
var l6 = null;
var l3 = "undefined" != typeof window && window.trustedTypes;
if (l3) try {
  p = /* @__PURE__ */ l3.createPolicy("vue", { createHTML: (e10) => e10 });
} catch (e10) {
}
var l4 = p ? (e10) => p.createHTML(e10) : (e10) => e10;
var l8 = "undefined" != typeof document ? document : null;
var l5 = l8 && /* @__PURE__ */ l8.createElement("template");
var l9 = "transition";
var l7 = "animation";
var se = Symbol("_vtc");
var st = { name: String, type: String, css: { type: Boolean, default: true }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String };
var sn = /* @__PURE__ */ S({}, nM, st);
var sr = ((oS = (e10, { slots: t10 }) => lW(n$, ss(e10), t10)).displayName = "Transition", oS.props = sn, oS);
var si = (e10, t10 = []) => {
  k(e10) ? e10.forEach((e11) => e11(...t10)) : e10 && e10(...t10);
};
var sl = (e10) => !!e10 && (k(e10) ? e10.some((e11) => e11.length > 1) : e10.length > 1);
function ss(e10) {
  let t10 = {};
  for (let n11 in e10) n11 in st || (t10[n11] = e10[n11]);
  if (false === e10.css) return t10;
  let { name: n10 = "v", type: r10, duration: i10, enterFromClass: l10 = `${n10}-enter-from`, enterActiveClass: s10 = `${n10}-enter-active`, enterToClass: o10 = `${n10}-enter-to`, appearFromClass: a10 = l10, appearActiveClass: c10 = s10, appearToClass: u2 = o10, leaveFromClass: d2 = `${n10}-leave-from`, leaveActiveClass: p2 = `${n10}-leave-active`, leaveToClass: f2 = `${n10}-leave-to` } = e10, h2 = function(e11) {
    if (null == e11) return null;
    if (P(e11)) return [Y(e11.enter), Y(e11.leave)];
    {
      let t11 = Y(e11);
      return [t11, t11];
    }
  }(i10), m2 = h2 && h2[0], g2 = h2 && h2[1], { onBeforeEnter: y2, onEnter: b2, onEnterCancelled: _2, onLeave: x2, onLeaveCancelled: C2, onBeforeAppear: T2 = y2, onAppear: k2 = b2, onAppearCancelled: w2 = _2 } = t10, N2 = (e11, t11, n11) => {
    sa(e11, t11 ? u2 : o10), sa(e11, t11 ? c10 : s10), n11 && n11();
  }, E2 = (e11, t11) => {
    e11._isLeaving = false, sa(e11, d2), sa(e11, f2), sa(e11, p2), t11 && t11();
  }, A2 = (e11) => (t11, n11) => {
    let i11 = e11 ? k2 : b2, s11 = () => N2(t11, e11, n11);
    si(i11, [t11, s11]), sc(() => {
      sa(t11, e11 ? a10 : l10), so(t11, e11 ? u2 : o10), sl(i11) || sd(t11, r10, m2, s11);
    });
  };
  return S(t10, { onBeforeEnter(e11) {
    si(y2, [e11]), so(e11, l10), so(e11, s10);
  }, onBeforeAppear(e11) {
    si(T2, [e11]), so(e11, a10), so(e11, c10);
  }, onEnter: A2(false), onAppear: A2(true), onLeave(e11, t11) {
    e11._isLeaving = true;
    let n11 = () => E2(e11, t11);
    so(e11, d2), so(e11, p2), sm(), sc(() => {
      e11._isLeaving && (sa(e11, d2), so(e11, f2), sl(x2) || sd(e11, r10, g2, n11));
    }), si(x2, [e11, n11]);
  }, onEnterCancelled(e11) {
    N2(e11, false), si(_2, [e11]);
  }, onAppearCancelled(e11) {
    N2(e11, true), si(w2, [e11]);
  }, onLeaveCancelled(e11) {
    E2(e11), si(C2, [e11]);
  } });
}
function so(e10, t10) {
  t10.split(/\s+/).forEach((t11) => t11 && e10.classList.add(t11)), (e10[se] || (e10[se] = /* @__PURE__ */ new Set())).add(t10);
}
function sa(e10, t10) {
  t10.split(/\s+/).forEach((t11) => t11 && e10.classList.remove(t11));
  let n10 = e10[se];
  n10 && (n10.delete(t10), n10.size || (e10[se] = void 0));
}
function sc(e10) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e10);
  });
}
var su = 0;
function sd(e10, t10, n10, r10) {
  let i10 = e10._endId = ++su, l10 = () => {
    i10 === e10._endId && r10();
  };
  if (null != n10) return setTimeout(l10, n10);
  let { type: s10, timeout: o10, propCount: a10 } = sp(e10, t10);
  if (!s10) return r10();
  let c10 = s10 + "end", u2 = 0, d2 = () => {
    e10.removeEventListener(c10, p2), l10();
  }, p2 = (t11) => {
    t11.target === e10 && ++u2 >= a10 && d2();
  };
  setTimeout(() => {
    u2 < a10 && d2();
  }, o10 + 1), e10.addEventListener(c10, p2);
}
function sp(e10, t10) {
  let n10 = window.getComputedStyle(e10), r10 = (e11) => (n10[e11] || "").split(", "), i10 = r10(`${l9}Delay`), l10 = r10(`${l9}Duration`), s10 = sf(i10, l10), o10 = r10(`${l7}Delay`), a10 = r10(`${l7}Duration`), c10 = sf(o10, a10), u2 = null, d2 = 0, p2 = 0;
  t10 === l9 ? s10 > 0 && (u2 = l9, d2 = s10, p2 = l10.length) : t10 === l7 ? c10 > 0 && (u2 = l7, d2 = c10, p2 = a10.length) : p2 = (u2 = (d2 = Math.max(s10, c10)) > 0 ? s10 > c10 ? l9 : l7 : null) ? u2 === l9 ? l10.length : a10.length : 0;
  let f2 = u2 === l9 && /\b(transform|all)(,|$)/.test(r10(`${l9}Property`).toString());
  return { type: u2, timeout: d2, propCount: p2, hasTransform: f2 };
}
function sf(e10, t10) {
  for (; e10.length < t10.length; ) e10 = e10.concat(e10);
  return Math.max(...t10.map((t11, n10) => sh(t11) + sh(e10[n10])));
}
function sh(e10) {
  return "auto" === e10 ? 0 : 1e3 * Number(e10.slice(0, -1).replace(",", "."));
}
function sm() {
  return document.body.offsetHeight;
}
var sg = Symbol("_vod");
var sy = Symbol("_vsh");
var sv = { beforeMount(e10, { value: t10 }, { transition: n10 }) {
  e10[sg] = "none" === e10.style.display ? "" : e10.style.display, n10 && t10 ? n10.beforeEnter(e10) : sb(e10, t10);
}, mounted(e10, { value: t10 }, { transition: n10 }) {
  n10 && t10 && n10.enter(e10);
}, updated(e10, { value: t10, oldValue: n10 }, { transition: r10 }) {
  !t10 != !n10 && (r10 ? t10 ? (r10.beforeEnter(e10), sb(e10, true), r10.enter(e10)) : r10.leave(e10, () => {
    sb(e10, false);
  }) : sb(e10, t10));
}, beforeUnmount(e10, { value: t10 }) {
  sb(e10, t10);
} };
function sb(e10, t10) {
  e10.style.display = t10 ? e10[sg] : "none", e10[sy] = !t10;
}
var s_ = Symbol("");
function sS(e10) {
  let t10 = lR();
  if (!t10) return;
  let n10 = t10.ut = (n11 = e10(t10.proxy)) => {
    Array.from(document.querySelectorAll(`[data-v-owner="${t10.uid}"]`)).forEach((e11) => sx(e11, n11));
  }, r10 = () => {
    let r11 = e10(t10.proxy);
    t10.ce ? sx(t10.ce, r11) : function e11(t11, n11) {
      if (128 & t11.shapeFlag) {
        let r12 = t11.suspense;
        t11 = r12.activeBranch, r12.pendingBranch && !r12.isHydrating && r12.effects.push(() => {
          e11(r12.activeBranch, n11);
        });
      }
      for (; t11.component; ) t11 = t11.component.subTree;
      if (1 & t11.shapeFlag && t11.el) sx(t11.el, n11);
      else if (t11.type === i8) t11.children.forEach((t12) => e11(t12, n11));
      else if (t11.type === i7) {
        let { el: e12, anchor: r12 } = t11;
        for (; e12 && (sx(e12, n11), e12 !== r12); ) e12 = e12.nextSibling;
      }
    }(t10.subTree, r11), n10(r11);
  };
  rh(() => {
    i$(r10);
  }), rm(() => {
    let e11 = new MutationObserver(r10);
    e11.observe(t10.subTree.el.parentNode, { childList: true }), rb(() => e11.disconnect());
  });
}
function sx(e10, t10) {
  if (1 === e10.nodeType) {
    let n10 = e10.style, r10 = "";
    for (let e11 in t10) n10.setProperty(`--${e11}`, t10[e11]), r10 += `--${e11}: ${t10[e11]};`;
    n10[s_] = r10;
  }
}
var sC = /(^|;)\s*display\s*:/;
var sT = /\s*!important$/;
function sk(e10, t10, n10) {
  if (k(n10)) n10.forEach((n11) => sk(e10, t10, n11));
  else if (null == n10 && (n10 = ""), t10.startsWith("--")) e10.setProperty(t10, n10);
  else {
    let r10 = function(e11, t11) {
      let n11 = sN[t11];
      if (n11) return n11;
      let r11 = q(t11);
      if ("filter" !== r11 && r11 in e11) return sN[t11] = r11;
      r11 = z(r11);
      for (let n12 = 0; n12 < sw.length; n12++) {
        let i10 = sw[n12] + r11;
        if (i10 in e11) return sN[t11] = i10;
      }
      return t11;
    }(e10, t10);
    sT.test(n10) ? e10.setProperty(K(r10), n10.replace(sT, ""), "important") : e10[r10] = n10;
  }
}
var sw = ["Webkit", "Moz", "ms"];
var sN = {};
var sE = "http://www.w3.org/1999/xlink";
function sA(e10, t10, n10, r10, i10, l10 = ef(t10)) {
  r10 && t10.startsWith("xlink:") ? null == n10 ? e10.removeAttributeNS(sE, t10.slice(6, t10.length)) : e10.setAttributeNS(sE, t10, n10) : null == n10 || l10 && !(n10 || "" === n10) ? e10.removeAttribute(t10) : e10.setAttribute(t10, l10 ? "" : O(n10) ? String(n10) : n10);
}
function sR(e10, t10, n10, r10, i10) {
  if ("innerHTML" === t10 || "textContent" === t10) {
    null != n10 && (e10[t10] = "innerHTML" === t10 ? l4(n10) : n10);
    return;
  }
  let l10 = e10.tagName;
  if ("value" === t10 && "PROGRESS" !== l10 && !l10.includes("-")) {
    let r11 = "OPTION" === l10 ? e10.getAttribute("value") || "" : e10.value, i11 = null == n10 ? "checkbox" === e10.type ? "on" : "" : String(n10);
    r11 === i11 && "_value" in e10 || (e10.value = i11), null == n10 && e10.removeAttribute(t10), e10._value = n10;
    return;
  }
  let s10 = false;
  if ("" === n10 || null == n10) {
    let r11 = typeof e10[t10];
    if ("boolean" === r11) {
      var o10;
      n10 = !!(o10 = n10) || "" === o10;
    } else null == n10 && "string" === r11 ? (n10 = "", s10 = true) : "number" === r11 && (n10 = 0, s10 = true);
  }
  try {
    e10[t10] = n10;
  } catch (e11) {
  }
  s10 && e10.removeAttribute(i10 || t10);
}
function sI(e10, t10, n10, r10) {
  e10.addEventListener(t10, n10, r10);
}
var sO = Symbol("_vei");
var sP = /(?:Once|Passive|Capture)$/;
var sM = 0;
var sD = /* @__PURE__ */ Promise.resolve();
var sL = () => sM || (sD.then(() => sM = 0), sM = Date.now());
var s$ = (e10) => 111 === e10.charCodeAt(0) && 110 === e10.charCodeAt(1) && e10.charCodeAt(2) > 96 && 123 > e10.charCodeAt(2);
var sF = {};
// @__NO_SIDE_EFFECTS__
function sV(e10, t10, n10) {
  let r10 = /* @__PURE__ */ nq(e10, t10);
  F(r10) && S(r10, t10);
  class i10 extends sj {
    constructor(e11) {
      super(r10, e11, n10);
    }
  }
  return i10.def = r10, i10;
}
var sB = (e10, t10) => /* @__PURE__ */ sV(e10, t10, og);
var sU = "undefined" != typeof HTMLElement ? HTMLElement : class {
};
var sj = class _sj extends sU {
  constructor(e10, t10 = {}, n10 = om) {
    super(), this._def = e10, this._props = t10, this._createApp = n10, this._isVueCE = true, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = false, this._resolved = false, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n10 !== om ? this._root = this.shadowRoot : false !== e10.shadowRoot ? (this.attachShadow({ mode: "open" }), this._root = this.shadowRoot) : this._root = this, this._def.__asyncLoader || this._resolveProps(this._def);
  }
  connectedCallback() {
    if (!this.isConnected) return;
    this.shadowRoot || this._parseSlots(), this._connected = true;
    let e10 = this;
    for (; e10 = e10 && (e10.parentNode || e10.host); ) if (e10 instanceof _sj) {
      this._parent = e10;
      break;
    }
    this._instance || (this._resolved ? (this._setParent(), this._update()) : e10 && e10._pendingResolve ? this._pendingResolve = e10._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(e10 = this._parent) {
    e10 && (this._instance.parent = e10._instance, this._instance.provides = e10._instance.provides);
  }
  disconnectedCallback() {
    this._connected = false, nr(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null);
    });
  }
  _resolveDef() {
    if (this._pendingResolve) return;
    for (let e11 = 0; e11 < this.attributes.length; e11++) this._setAttr(this.attributes[e11].name);
    this._ob = new MutationObserver((e11) => {
      for (let t11 of e11) this._setAttr(t11.attributeName);
    }), this._ob.observe(this, { attributes: true });
    let e10 = (e11, t11 = false) => {
      let n10;
      this._resolved = true, this._pendingResolve = void 0;
      let { props: r10, styles: i10 } = e11;
      if (r10 && !k(r10)) for (let e12 in r10) {
        let t12 = r10[e12];
        (t12 === Number || t12 && t12.type === Number) && (e12 in this._props && (this._props[e12] = Y(this._props[e12])), (n10 || (n10 = /* @__PURE__ */ Object.create(null)))[q(e12)] = true);
      }
      this._numberProps = n10, t11 && this._resolveProps(e11), this.shadowRoot && this._applyStyles(i10), this._mount(e11);
    }, t10 = this._def.__asyncLoader;
    t10 ? this._pendingResolve = t10().then((t11) => e10(this._def = t11, true)) : e10(this._def);
  }
  _mount(e10) {
    this._app = this._createApp(e10), e10.configureApp && e10.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    let t10 = this._instance && this._instance.exposed;
    if (t10) for (let e11 in t10) T(this, e11) || Object.defineProperty(this, e11, { get: () => tL(t10[e11]) });
  }
  _resolveProps(e10) {
    let { props: t10 } = e10, n10 = k(t10) ? t10 : Object.keys(t10 || {});
    for (let e11 of Object.keys(this)) "_" !== e11[0] && n10.includes(e11) && this._setProp(e11, this[e11]);
    for (let e11 of n10.map(q)) Object.defineProperty(this, e11, { get() {
      return this._getProp(e11);
    }, set(t11) {
      this._setProp(e11, t11, true, true);
    } });
  }
  _setAttr(e10) {
    if (e10.startsWith("data-v-")) return;
    let t10 = this.hasAttribute(e10), n10 = t10 ? this.getAttribute(e10) : sF, r10 = q(e10);
    t10 && this._numberProps && this._numberProps[r10] && (n10 = Y(n10)), this._setProp(r10, n10, false, true);
  }
  _getProp(e10) {
    return this._props[e10];
  }
  _setProp(e10, t10, n10 = true, r10 = false) {
    t10 !== this._props[e10] && (t10 === sF ? delete this._props[e10] : (this._props[e10] = t10, "key" === e10 && this._app && (this._app._ceVNode.key = t10)), r10 && this._instance && this._update(), n10 && (true === t10 ? this.setAttribute(K(e10), "") : "string" == typeof t10 || "number" == typeof t10 ? this.setAttribute(K(e10), t10 + "") : t10 || this.removeAttribute(K(e10))));
  }
  _update() {
    of(this._createVNode(), this._root);
  }
  _createVNode() {
    let e10 = {};
    this.shadowRoot || (e10.onVnodeMounted = e10.onVnodeUpdated = this._renderSlots.bind(this));
    let t10 = lm(this._def, S(e10, this._props));
    return this._instance || (t10.ce = (e11) => {
      this._instance = e11, e11.ce = this, e11.isCE = true;
      let t11 = (e12, t12) => {
        this.dispatchEvent(new CustomEvent(e12, F(t12[0]) ? S({ detail: t12 }, t12[0]) : { detail: t12 }));
      };
      e11.emit = (e12, ...n10) => {
        t11(e12, n10), K(e12) !== e12 && t11(K(e12), n10);
      }, this._setParent();
    }), t10;
  }
  _applyStyles(e10, t10) {
    if (!e10) return;
    if (t10) {
      if (t10 === this._def || this._styleChildren.has(t10)) return;
      this._styleChildren.add(t10);
    }
    let n10 = this._nonce;
    for (let t11 = e10.length - 1; t11 >= 0; t11--) {
      let r10 = document.createElement("style");
      n10 && r10.setAttribute("nonce", n10), r10.textContent = e10[t11], this.shadowRoot.prepend(r10);
    }
  }
  _parseSlots() {
    let e10;
    let t10 = this._slots = {};
    for (; e10 = this.firstChild; ) {
      let n10 = 1 === e10.nodeType && e10.getAttribute("slot") || "default";
      (t10[n10] || (t10[n10] = [])).push(e10), this.removeChild(e10);
    }
  }
  _renderSlots() {
    let e10 = (this._teleportTarget || this).querySelectorAll("slot"), t10 = this._instance.type.__scopeId;
    for (let n10 = 0; n10 < e10.length; n10++) {
      let r10 = e10[n10], i10 = r10.getAttribute("name") || "default", l10 = this._slots[i10], s10 = r10.parentNode;
      if (l10) for (let e11 of l10) {
        if (t10 && 1 === e11.nodeType) {
          let n11;
          let r11 = t10 + "-s", i11 = document.createTreeWalker(e11, 1);
          for (e11.setAttribute(r11, ""); n11 = i11.nextNode(); ) n11.setAttribute(r11, "");
        }
        s10.insertBefore(e11, r10);
      }
      else for (; r10.firstChild; ) s10.insertBefore(r10.firstChild, r10);
      s10.removeChild(r10);
    }
  }
  _injectChildStyle(e10) {
    this._applyStyles(e10.styles, e10);
  }
  _removeChildStyle(e10) {
  }
};
function sH(e10) {
  let t10 = lR();
  return t10 && t10.ce || null;
}
function sq() {
  let e10 = sH();
  return e10 && e10.shadowRoot;
}
function sW(e10 = "$style") {
  {
    let t10 = lR();
    if (!t10) return h;
    let n10 = t10.type.__cssModules;
    return n10 && n10[e10] || h;
  }
}
var sK = /* @__PURE__ */ new WeakMap();
var sz = /* @__PURE__ */ new WeakMap();
var sJ = Symbol("_moveCb");
var sG = Symbol("_enterCb");
var sQ = (ox = { name: "TransitionGroup", props: /* @__PURE__ */ S({}, sn, { tag: String, moveClass: String }), setup(e10, { slots: t10 }) {
  let n10, r10;
  let i10 = lR(), l10 = nO();
  return ry(() => {
    if (!n10.length) return;
    let t11 = e10.moveClass || `${e10.name || "v"}-move`;
    if (!function(e11, t12, n11) {
      let r12 = e11.cloneNode(), i11 = e11[se];
      i11 && i11.forEach((e12) => {
        e12.split(/\s+/).forEach((e13) => e13 && r12.classList.remove(e13));
      }), n11.split(/\s+/).forEach((e12) => e12 && r12.classList.add(e12)), r12.style.display = "none";
      let l11 = 1 === t12.nodeType ? t12 : t12.parentNode;
      l11.appendChild(r12);
      let { hasTransform: s10 } = sp(r12);
      return l11.removeChild(r12), s10;
    }(n10[0].el, i10.vnode.el, t11)) return;
    n10.forEach(sX), n10.forEach(sZ);
    let r11 = n10.filter(sY);
    sm(), r11.forEach((e11) => {
      let n11 = e11.el, r12 = n11.style;
      so(n11, t11), r12.transform = r12.webkitTransform = r12.transitionDuration = "";
      let i11 = n11[sJ] = (e12) => {
        (!e12 || e12.target === n11) && (!e12 || /transform$/.test(e12.propertyName)) && (n11.removeEventListener("transitionend", i11), n11[sJ] = null, sa(n11, t11));
      };
      n11.addEventListener("transitionend", i11);
    });
  }), () => {
    let s10 = tw(e10), o10 = ss(s10), a10 = s10.tag || i8;
    if (n10 = [], r10) for (let e11 = 0; e11 < r10.length; e11++) {
      let t11 = r10[e11];
      t11.el && t11.el instanceof Element && (n10.push(t11), nj(t11, nV(t11, o10, l10, i10)), sK.set(t11, t11.el.getBoundingClientRect()));
    }
    r10 = t10.default ? nH(t10.default()) : [];
    for (let e11 = 0; e11 < r10.length; e11++) {
      let t11 = r10[e11];
      null != t11.key && nj(t11, nV(t11, o10, l10, i10));
    }
    return lm(a10, null, r10);
  };
} }, delete ox.props.mode, ox);
function sX(e10) {
  let t10 = e10.el;
  t10[sJ] && t10[sJ](), t10[sG] && t10[sG]();
}
function sZ(e10) {
  sz.set(e10, e10.el.getBoundingClientRect());
}
function sY(e10) {
  let t10 = sK.get(e10), n10 = sz.get(e10), r10 = t10.left - n10.left, i10 = t10.top - n10.top;
  if (r10 || i10) {
    let t11 = e10.el.style;
    return t11.transform = t11.webkitTransform = `translate(${r10}px,${i10}px)`, t11.transitionDuration = "0s", e10;
  }
}
var s0 = (e10) => {
  let t10 = e10.props["onUpdate:modelValue"] || false;
  return k(t10) ? (e11) => Q(t10, e11) : t10;
};
function s1(e10) {
  e10.target.composing = true;
}
function s2(e10) {
  let t10 = e10.target;
  t10.composing && (t10.composing = false, t10.dispatchEvent(new Event("input")));
}
var s6 = Symbol("_assign");
var s3 = { created(e10, { modifiers: { lazy: t10, trim: n10, number: r10 } }, i10) {
  e10[s6] = s0(i10);
  let l10 = r10 || i10.props && "number" === i10.props.type;
  sI(e10, t10 ? "change" : "input", (t11) => {
    if (t11.target.composing) return;
    let r11 = e10.value;
    n10 && (r11 = r11.trim()), l10 && (r11 = Z(r11)), e10[s6](r11);
  }), n10 && sI(e10, "change", () => {
    e10.value = e10.value.trim();
  }), t10 || (sI(e10, "compositionstart", s1), sI(e10, "compositionend", s2), sI(e10, "change", s2));
}, mounted(e10, { value: t10 }) {
  e10.value = null == t10 ? "" : t10;
}, beforeUpdate(e10, { value: t10, oldValue: n10, modifiers: { lazy: r10, trim: i10, number: l10 } }, s10) {
  if (e10[s6] = s0(s10), e10.composing) return;
  let o10 = (l10 || "number" === e10.type) && !/^0\d/.test(e10.value) ? Z(e10.value) : e10.value, a10 = null == t10 ? "" : t10;
  o10 === a10 || document.activeElement === e10 && "range" !== e10.type && (r10 && t10 === n10 || i10 && e10.value.trim() === a10) || (e10.value = a10);
} };
var s4 = { deep: true, created(e10, t10, n10) {
  e10[s6] = s0(n10), sI(e10, "change", () => {
    let t11 = e10._modelValue, n11 = oe(e10), r10 = e10.checked, i10 = e10[s6];
    if (k(t11)) {
      let e11 = em(t11, n11), l10 = -1 !== e11;
      if (r10 && !l10) i10(t11.concat(n11));
      else if (!r10 && l10) {
        let n12 = [...t11];
        n12.splice(e11, 1), i10(n12);
      }
    } else if (N(t11)) {
      let e11 = new Set(t11);
      r10 ? e11.add(n11) : e11.delete(n11), i10(e11);
    } else i10(ot(e10, r10));
  });
}, mounted: s8, beforeUpdate(e10, t10, n10) {
  e10[s6] = s0(n10), s8(e10, t10, n10);
} };
function s8(e10, { value: t10, oldValue: n10 }, r10) {
  let i10;
  if (e10._modelValue = t10, k(t10)) i10 = em(t10, r10.props.value) > -1;
  else if (N(t10)) i10 = t10.has(r10.props.value);
  else {
    if (t10 === n10) return;
    i10 = eh(t10, ot(e10, true));
  }
  e10.checked !== i10 && (e10.checked = i10);
}
var s5 = { created(e10, { value: t10 }, n10) {
  e10.checked = eh(t10, n10.props.value), e10[s6] = s0(n10), sI(e10, "change", () => {
    e10[s6](oe(e10));
  });
}, beforeUpdate(e10, { value: t10, oldValue: n10 }, r10) {
  e10[s6] = s0(r10), t10 !== n10 && (e10.checked = eh(t10, r10.props.value));
} };
var s9 = { deep: true, created(e10, { value: t10, modifiers: { number: n10 } }, r10) {
  let i10 = N(t10);
  sI(e10, "change", () => {
    let t11 = Array.prototype.filter.call(e10.options, (e11) => e11.selected).map((e11) => n10 ? Z(oe(e11)) : oe(e11));
    e10[s6](e10.multiple ? i10 ? new Set(t11) : t11 : t11[0]), e10._assigning = true, nr(() => {
      e10._assigning = false;
    });
  }), e10[s6] = s0(r10);
}, mounted(e10, { value: t10 }) {
  s7(e10, t10);
}, beforeUpdate(e10, t10, n10) {
  e10[s6] = s0(n10);
}, updated(e10, { value: t10 }) {
  e10._assigning || s7(e10, t10);
} };
function s7(e10, t10) {
  let n10 = e10.multiple, r10 = k(t10);
  if (!n10 || r10 || N(t10)) {
    for (let i10 = 0, l10 = e10.options.length; i10 < l10; i10++) {
      let l11 = e10.options[i10], s10 = oe(l11);
      if (n10) {
        if (r10) {
          let e11 = typeof s10;
          "string" === e11 || "number" === e11 ? l11.selected = t10.some((e12) => String(e12) === String(s10)) : l11.selected = em(t10, s10) > -1;
        } else l11.selected = t10.has(s10);
      } else if (eh(oe(l11), t10)) {
        e10.selectedIndex !== i10 && (e10.selectedIndex = i10);
        return;
      }
    }
    n10 || -1 === e10.selectedIndex || (e10.selectedIndex = -1);
  }
}
function oe(e10) {
  return "_value" in e10 ? e10._value : e10.value;
}
function ot(e10, t10) {
  let n10 = t10 ? "_trueValue" : "_falseValue";
  return n10 in e10 ? e10[n10] : t10;
}
var on = { created(e10, t10, n10) {
  oi(e10, t10, n10, null, "created");
}, mounted(e10, t10, n10) {
  oi(e10, t10, n10, null, "mounted");
}, beforeUpdate(e10, t10, n10, r10) {
  oi(e10, t10, n10, r10, "beforeUpdate");
}, updated(e10, t10, n10, r10) {
  oi(e10, t10, n10, r10, "updated");
} };
function or(e10, t10) {
  switch (e10) {
    case "SELECT":
      return s9;
    case "TEXTAREA":
      return s3;
    default:
      switch (t10) {
        case "checkbox":
          return s4;
        case "radio":
          return s5;
        default:
          return s3;
      }
  }
}
function oi(e10, t10, n10, r10, i10) {
  let l10 = or(e10.tagName, n10.props && n10.props.type)[i10];
  l10 && l10(e10, t10, n10, r10);
}
var ol = ["ctrl", "shift", "alt", "meta"];
var os = { stop: (e10) => e10.stopPropagation(), prevent: (e10) => e10.preventDefault(), self: (e10) => e10.target !== e10.currentTarget, ctrl: (e10) => !e10.ctrlKey, shift: (e10) => !e10.shiftKey, alt: (e10) => !e10.altKey, meta: (e10) => !e10.metaKey, left: (e10) => "button" in e10 && 0 !== e10.button, middle: (e10) => "button" in e10 && 1 !== e10.button, right: (e10) => "button" in e10 && 2 !== e10.button, exact: (e10, t10) => ol.some((n10) => e10[`${n10}Key`] && !t10.includes(n10)) };
var oo = (e10, t10) => {
  let n10 = e10._withMods || (e10._withMods = {}), r10 = t10.join(".");
  return n10[r10] || (n10[r10] = (n11, ...r11) => {
    for (let e11 = 0; e11 < t10.length; e11++) {
      let r12 = os[t10[e11]];
      if (r12 && r12(n11, t10)) return;
    }
    return e10(n11, ...r11);
  });
};
var oa = { esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace" };
var oc = (e10, t10) => {
  let n10 = e10._withKeys || (e10._withKeys = {}), r10 = t10.join(".");
  return n10[r10] || (n10[r10] = (n11) => {
    if (!("key" in n11)) return;
    let r11 = K(n11.key);
    if (t10.some((e11) => e11 === r11 || oa[e11] === r11)) return e10(n11);
  });
};
var ou = /* @__PURE__ */ S({ patchProp: (e10, t10, n10, r10, i10, l10) => {
  let s10 = "svg" === i10;
  "class" === t10 ? function(e11, t11, n11) {
    let r11 = e11[se];
    r11 && (t11 = (t11 ? [t11, ...r11] : [...r11]).join(" ")), null == t11 ? e11.removeAttribute("class") : n11 ? e11.setAttribute("class", t11) : e11.className = t11;
  }(e10, r10, s10) : "style" === t10 ? function(e11, t11, n11) {
    let r11 = e11.style, i11 = I(n11), l11 = false;
    if (n11 && !i11) {
      if (t11) {
        if (I(t11)) for (let e12 of t11.split(";")) {
          let t12 = e12.slice(0, e12.indexOf(":")).trim();
          null == n11[t12] && sk(r11, t12, "");
        }
        else for (let e12 in t11) null == n11[e12] && sk(r11, e12, "");
      }
      for (let e12 in n11) "display" === e12 && (l11 = true), sk(r11, e12, n11[e12]);
    } else if (i11) {
      if (t11 !== n11) {
        let e12 = r11[s_];
        e12 && (n11 += ";" + e12), r11.cssText = n11, l11 = sC.test(n11);
      }
    } else t11 && e11.removeAttribute("style");
    sg in e11 && (e11[sg] = l11 ? r11.display : "", e11[sy] && (r11.display = "none"));
  }(e10, n10, r10) : b(t10) ? _(t10) || function(e11, t11, n11, r11, i11 = null) {
    let l11 = e11[sO] || (e11[sO] = {}), s11 = l11[t11];
    if (r11 && s11) s11.value = r11;
    else {
      let [n12, o10] = function(e12) {
        let t12;
        if (sP.test(e12)) {
          let n13;
          for (t12 = {}; n13 = e12.match(sP); ) e12 = e12.slice(0, e12.length - n13[0].length), t12[n13[0].toLowerCase()] = true;
        }
        return [":" === e12[2] ? e12.slice(3) : K(e12.slice(2)), t12];
      }(t11);
      r11 ? sI(e11, n12, l11[t11] = function(e12, t12) {
        let n13 = (e13) => {
          if (e13._vts) {
            if (e13._vts <= n13.attached) return;
          } else e13._vts = Date.now();
          t3(function(e14, t13) {
            if (!k(t13)) return t13;
            {
              let n14 = e14.stopImmediatePropagation;
              return e14.stopImmediatePropagation = () => {
                n14.call(e14), e14._stopped = true;
              }, t13.map((e15) => (t14) => !t14._stopped && e15 && e15(t14));
            }
          }(e13, n13.value), t12, 5, [e13]);
        };
        return n13.value = e12, n13.attached = sL(), n13;
      }(r11, i11), o10) : s11 && (!function(e12, t12, n13, r12) {
        e12.removeEventListener(t12, n13, r12);
      }(e11, n12, s11, o10), l11[t11] = void 0);
    }
  }(e10, t10, 0, r10, l10) : ("." === t10[0] ? (t10 = t10.slice(1), 0) : "^" === t10[0] ? (t10 = t10.slice(1), 1) : !function(e11, t11, n11, r11) {
    if (r11) return !!("innerHTML" === t11 || "textContent" === t11 || t11 in e11 && s$(t11) && R(n11));
    if ("spellcheck" === t11 || "draggable" === t11 || "translate" === t11 || "form" === t11 || "list" === t11 && "INPUT" === e11.tagName || "type" === t11 && "TEXTAREA" === e11.tagName) return false;
    if ("width" === t11 || "height" === t11) {
      let t12 = e11.tagName;
      if ("IMG" === t12 || "VIDEO" === t12 || "CANVAS" === t12 || "SOURCE" === t12) return false;
    }
    return !(s$(t11) && I(n11)) && t11 in e11;
  }(e10, t10, r10, s10)) ? e10._isVueCE && (/[A-Z]/.test(t10) || !I(r10)) ? sR(e10, q(t10), r10, l10, t10) : ("true-value" === t10 ? e10._trueValue = r10 : "false-value" === t10 && (e10._falseValue = r10), sA(e10, t10, r10, s10)) : (sR(e10, t10, r10), e10.tagName.includes("-") || "value" !== t10 && "checked" !== t10 && "selected" !== t10 || sA(e10, t10, r10, s10, l10, "value" !== t10));
} }, { insert: (e10, t10, n10) => {
  t10.insertBefore(e10, n10 || null);
}, remove: (e10) => {
  let t10 = e10.parentNode;
  t10 && t10.removeChild(e10);
}, createElement: (e10, t10, n10, r10) => {
  let i10 = "svg" === t10 ? l8.createElementNS("http://www.w3.org/2000/svg", e10) : "mathml" === t10 ? l8.createElementNS("http://www.w3.org/1998/Math/MathML", e10) : n10 ? l8.createElement(e10, { is: n10 }) : l8.createElement(e10);
  return "select" === e10 && r10 && null != r10.multiple && i10.setAttribute("multiple", r10.multiple), i10;
}, createText: (e10) => l8.createTextNode(e10), createComment: (e10) => l8.createComment(e10), setText: (e10, t10) => {
  e10.nodeValue = t10;
}, setElementText: (e10, t10) => {
  e10.textContent = t10;
}, parentNode: (e10) => e10.parentNode, nextSibling: (e10) => e10.nextSibling, querySelector: (e10) => l8.querySelector(e10), setScopeId(e10, t10) {
  e10.setAttribute(t10, "");
}, insertStaticContent(e10, t10, n10, r10, i10, l10) {
  let s10 = n10 ? n10.previousSibling : t10.lastChild;
  if (i10 && (i10 === l10 || i10.nextSibling)) for (; t10.insertBefore(i10.cloneNode(true), n10), i10 !== l10 && (i10 = i10.nextSibling); ) ;
  else {
    l5.innerHTML = l4("svg" === r10 ? `<svg>${e10}</svg>` : "mathml" === r10 ? `<math>${e10}</math>` : e10);
    let i11 = l5.content;
    if ("svg" === r10 || "mathml" === r10) {
      let e11 = i11.firstChild;
      for (; e11.firstChild; ) i11.appendChild(e11.firstChild);
      i11.removeChild(e11);
    }
    t10.insertBefore(i11, n10);
  }
  return [s10 ? s10.nextSibling : t10.firstChild, n10 ? n10.previousSibling : t10.lastChild];
} });
var od = false;
function op() {
  return c = od ? c : iN(ou), od = true, c;
}
var of = (...e10) => {
  (c || (c = iw(ou))).render(...e10);
};
var oh = (...e10) => {
  op().hydrate(...e10);
};
var om = (...e10) => {
  let t10 = (c || (c = iw(ou))).createApp(...e10), { mount: n10 } = t10;
  return t10.mount = (e11) => {
    let r10 = ov(e11);
    if (!r10) return;
    let i10 = t10._component;
    R(i10) || i10.render || i10.template || (i10.template = r10.innerHTML), 1 === r10.nodeType && (r10.textContent = "");
    let l10 = n10(r10, false, oy(r10));
    return r10 instanceof Element && (r10.removeAttribute("v-cloak"), r10.setAttribute("data-v-app", "")), l10;
  }, t10;
};
var og = (...e10) => {
  let t10 = op().createApp(...e10), { mount: n10 } = t10;
  return t10.mount = (e11) => {
    let t11 = ov(e11);
    if (t11) return n10(t11, true, oy(t11));
  }, t10;
};
function oy(e10) {
  return e10 instanceof SVGElement ? "svg" : "function" == typeof MathMLElement && e10 instanceof MathMLElement ? "mathml" : void 0;
}
function ov(e10) {
  return I(e10) ? document.querySelector(e10) : e10;
}
var ob = false;
var o_ = () => {
  ob || (ob = true, s3.getSSRProps = ({ value: e10 }) => ({ value: e10 }), s5.getSSRProps = ({ value: e10 }, t10) => {
    if (t10.props && eh(t10.props.value, e10)) return { checked: true };
  }, s4.getSSRProps = ({ value: e10 }, t10) => {
    if (k(e10)) {
      if (t10.props && em(e10, t10.props.value) > -1) return { checked: true };
    } else if (N(e10)) {
      if (t10.props && e10.has(t10.props.value)) return { checked: true };
    } else if (e10) return { checked: true };
  }, on.getSSRProps = (e10, t10) => {
    if ("string" != typeof t10.type) return;
    let n10 = or(t10.type.toUpperCase(), t10.props && t10.props.type);
    if (n10.getSSRProps) return n10.getSSRProps(e10, t10);
  }, sv.getSSRProps = ({ value: e10 }) => {
    if (!e10) return { style: { display: "none" } };
  });
};
var oS;
var ox;
var oC = /* @__PURE__ */ Object.freeze({ __proto__: null, BaseTransition: n$, BaseTransitionPropsValidators: nM, Comment: i9, DeprecationTypes: l6, EffectScope: e_, ErrorCodes: t2, ErrorTypeStrings: lX, Fragment: i8, KeepAlive: rl, ReactiveEffect: ek, Static: i7, Suspense: i0, Teleport: nN, Text: i5, TrackOpTypes: tJ, Transition: sr, TransitionGroup: sQ, TriggerOpTypes: tG, VueElement: sj, assertNumber: t1, callWithAsyncErrorHandling: t3, callWithErrorHandling: t6, camelize: q, capitalize: z, cloneVNode: ly, compatUtils: l2, computed: lq, createApp: om, createBlock: la, createCommentVNode: l_, createElementBlock: lo, createElementVNode: lh, createHydrationRenderer: iN, createPropsRestProxy: r0, createRenderer: iw, createSSRApp: og, createSlots: rO, createStaticVNode: lb, createTextVNode: lv, createVNode: lm, customRef: tU, defineAsyncComponent: rn, defineComponent: nq, defineCustomElement: sV, defineEmits: rj, defineExpose: rH, defineModel: rK, defineOptions: rq, defineProps: rU, defineSSRCustomElement: sB, defineSlots: rW, devtools: lZ, effect: eM, effectScope: eS, getCurrentInstance: lR, getCurrentScope: ex, getCurrentWatcher: tZ, getTransitionRawChildren: nH, guardReactiveProps: lg, h: lW, handleError: t4, hasInjectionContext: ia, hydrate: oh, hydrateOnIdle: n5, hydrateOnInteraction: re, hydrateOnMediaQuery: n7, hydrateOnVisible: n9, initCustomFormatter: lK, initDirectivesForSSR: o_, inject: io, isMemoSame: lJ, isProxy: tk, isReactive: tx, isReadonly: tC, isRef: tR, isRuntimeOnly: lF, isShallow: tT, isVNode: lc, markRaw: tN, mergeDefaults: rZ, mergeModels: rY, mergeProps: lT, nextTick: nr, normalizeClass: eo, normalizeProps: ea, normalizeStyle: en, onActivated: ro, onBeforeMount: rh, onBeforeUnmount: rv, onBeforeUpdate: rg, onDeactivated: ra, onErrorCaptured: rC, onMounted: rm, onRenderTracked: rx, onRenderTriggered: rS, onScopeDispose: eC, onServerPrefetch: r_, onUnmounted: rb, onUpdated: ry, onWatcherCleanup: tY, openBlock: ln, popScopeId: nh, provide: is, proxyRefs: tV, pushScopeId: nf, queuePostFlushCb: ns, reactive: ty, readonly: tb, ref: tI, registerRuntimeCompiler: l$, render: of, renderList: rI, renderSlot: rP, resolveComponent: rk, resolveDirective: rE, resolveDynamicComponent: rN, resolveFilter: l1, resolveTransitionHooks: nV, setBlockTracking: ll, setDevtoolsHook: lY, setTransitionHooks: nj, shallowReactive: tv, shallowReadonly: t_, shallowRef: tO, ssrContextKey: iM, ssrUtils: l0, stop: eD, toDisplayString: ey, toHandlerKey: J, toHandlers: rD, toRaw: tw, toRef: tW, toRefs: tj, toValue: t$, transformVNodeArgs: ld, triggerRef: tD, unref: tL, useAttrs: rG, useCssModule: sW, useCssVars: sS, useHost: sH, useId: nW, useModel: iH, useSSRContext: iD, useShadowRoot: sq, useSlots: rJ, useTemplateRef: nz, useTransitionState: nO, vModelCheckbox: s4, vModelDynamic: on, vModelRadio: s5, vModelSelect: s9, vModelText: s3, vShow: sv, version: lG, warn: lQ, watch: iV, watchEffect: iL, watchPostEffect: i$, watchSyncEffect: iF, withAsyncContext: r1, withCtx: ng, withDefaults: rz, withDirectives: ny, withKeys: oc, withMemo: lz, withModifiers: oo, withScopeId: nm });
var oT = Symbol("");
var ok = Symbol("");
var ow = Symbol("");
var oN = Symbol("");
var oE = Symbol("");
var oA = Symbol("");
var oR = Symbol("");
var oI = Symbol("");
var oO = Symbol("");
var oP = Symbol("");
var oM = Symbol("");
var oD = Symbol("");
var oL = Symbol("");
var o$ = Symbol("");
var oF = Symbol("");
var oV = Symbol("");
var oB = Symbol("");
var oU = Symbol("");
var oj = Symbol("");
var oH = Symbol("");
var oq = Symbol("");
var oW = Symbol("");
var oK = Symbol("");
var oz = Symbol("");
var oJ = Symbol("");
var oG = Symbol("");
var oQ = Symbol("");
var oX = Symbol("");
var oZ = Symbol("");
var oY = Symbol("");
var o0 = Symbol("");
var o1 = Symbol("");
var o2 = Symbol("");
var o6 = Symbol("");
var o3 = Symbol("");
var o4 = Symbol("");
var o8 = Symbol("");
var o5 = Symbol("");
var o9 = Symbol("");
var o7 = { [oT]: "Fragment", [ok]: "Teleport", [ow]: "Suspense", [oN]: "KeepAlive", [oE]: "BaseTransition", [oA]: "openBlock", [oR]: "createBlock", [oI]: "createElementBlock", [oO]: "createVNode", [oP]: "createElementVNode", [oM]: "createCommentVNode", [oD]: "createTextVNode", [oL]: "createStaticVNode", [o$]: "resolveComponent", [oF]: "resolveDynamicComponent", [oV]: "resolveDirective", [oB]: "resolveFilter", [oU]: "withDirectives", [oj]: "renderList", [oH]: "renderSlot", [oq]: "createSlots", [oW]: "toDisplayString", [oK]: "mergeProps", [oz]: "normalizeClass", [oJ]: "normalizeStyle", [oG]: "normalizeProps", [oQ]: "guardReactiveProps", [oX]: "toHandlers", [oZ]: "camelize", [oY]: "capitalize", [o0]: "toHandlerKey", [o1]: "setBlockTracking", [o2]: "pushScopeId", [o6]: "popScopeId", [o3]: "withCtx", [o4]: "unref", [o8]: "isRef", [o5]: "withMemo", [o9]: "isMemoSame" };
var ae = { start: { line: 1, column: 1, offset: 0 }, end: { line: 1, column: 1, offset: 0 }, source: "" };
function at(e10, t10, n10, r10, i10, l10, s10, o10 = false, a10 = false, c10 = false, u2 = ae) {
  return e10 && (o10 ? (e10.helper(oA), e10.helper(e10.inSSR || c10 ? oR : oI)) : e10.helper(e10.inSSR || c10 ? oO : oP), s10 && e10.helper(oU)), { type: 13, tag: t10, props: n10, children: r10, patchFlag: i10, dynamicProps: l10, directives: s10, isBlock: o10, disableTracking: a10, isComponent: c10, loc: u2 };
}
function an(e10, t10 = ae) {
  return { type: 17, loc: t10, elements: e10 };
}
function ar(e10, t10 = ae) {
  return { type: 15, loc: t10, properties: e10 };
}
function ai(e10, t10) {
  return { type: 16, loc: ae, key: I(e10) ? al(e10, true) : e10, value: t10 };
}
function al(e10, t10 = false, n10 = ae, r10 = 0) {
  return { type: 4, loc: n10, content: e10, isStatic: t10, constType: t10 ? 3 : r10 };
}
function as(e10, t10 = ae) {
  return { type: 8, loc: t10, children: e10 };
}
function ao(e10, t10 = [], n10 = ae) {
  return { type: 14, loc: n10, callee: e10, arguments: t10 };
}
function aa(e10, t10, n10 = false, r10 = false, i10 = ae) {
  return { type: 18, params: e10, returns: t10, newline: n10, isSlot: r10, loc: i10 };
}
function ac(e10, t10, n10, r10 = true) {
  return { type: 19, test: e10, consequent: t10, alternate: n10, newline: r10, loc: ae };
}
function au(e10, { helper: t10, removeHelper: n10, inSSR: r10 }) {
  if (!e10.isBlock) {
    var i10, l10;
    e10.isBlock = true, n10((i10 = e10.isComponent, r10 || i10 ? oO : oP)), t10(oA), t10((l10 = e10.isComponent, r10 || l10 ? oR : oI));
  }
}
var ad = new Uint8Array([123, 123]);
var ap = new Uint8Array([125, 125]);
function af(e10) {
  return e10 >= 97 && e10 <= 122 || e10 >= 65 && e10 <= 90;
}
function ah(e10) {
  return 32 === e10 || 10 === e10 || 9 === e10 || 12 === e10 || 13 === e10;
}
function am(e10) {
  return 47 === e10 || 62 === e10 || ah(e10);
}
function ag(e10) {
  let t10 = new Uint8Array(e10.length);
  for (let n10 = 0; n10 < e10.length; n10++) t10[n10] = e10.charCodeAt(n10);
  return t10;
}
var ay = { Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]), CdataEnd: new Uint8Array([93, 93, 62]), CommentEnd: new Uint8Array([45, 45, 62]), ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]), StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]), TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]), TextareaEnd: new Uint8Array([60, 47, 116, 101, 120, 116, 97, 114, 101, 97]) };
function av(e10) {
  throw e10;
}
function ab(e10) {
}
function a_(e10, t10, n10, r10) {
  let i10 = SyntaxError(String(`https://vuejs.org/error-reference/#compiler-${e10}`));
  return i10.code = e10, i10.loc = t10, i10;
}
var aS = (e10) => 4 === e10.type && e10.isStatic;
function ax(e10) {
  switch (e10) {
    case "Teleport":
    case "teleport":
      return ok;
    case "Suspense":
    case "suspense":
      return ow;
    case "KeepAlive":
    case "keep-alive":
      return oN;
    case "BaseTransition":
    case "base-transition":
      return oE;
  }
}
var aC = /^\d|[^\$\w\xA0-\uFFFF]/;
var aT = (e10) => !aC.test(e10);
var ak = /[A-Za-z_$\xA0-\uFFFF]/;
var aw = /[\.\?\w$\xA0-\uFFFF]/;
var aN = /\s+[.[]\s*|\s*[.[]\s+/g;
var aE = (e10) => 4 === e10.type ? e10.content : e10.loc.source;
var aA = (e10) => {
  let t10 = aE(e10).trim().replace(aN, (e11) => e11.trim()), n10 = 0, r10 = [], i10 = 0, l10 = 0, s10 = null;
  for (let e11 = 0; e11 < t10.length; e11++) {
    let o10 = t10.charAt(e11);
    switch (n10) {
      case 0:
        if ("[" === o10) r10.push(n10), n10 = 1, i10++;
        else if ("(" === o10) r10.push(n10), n10 = 2, l10++;
        else if (!(0 === e11 ? ak : aw).test(o10)) return false;
        break;
      case 1:
        "'" === o10 || '"' === o10 || "`" === o10 ? (r10.push(n10), n10 = 3, s10 = o10) : "[" === o10 ? i10++ : "]" !== o10 || --i10 || (n10 = r10.pop());
        break;
      case 2:
        if ("'" === o10 || '"' === o10 || "`" === o10) r10.push(n10), n10 = 3, s10 = o10;
        else if ("(" === o10) l10++;
        else if (")" === o10) {
          if (e11 === t10.length - 1) return false;
          --l10 || (n10 = r10.pop());
        }
        break;
      case 3:
        o10 === s10 && (n10 = r10.pop(), s10 = null);
    }
  }
  return !i10 && !l10;
};
var aR = /^\s*(async\s*)?(\([^)]*?\)|[\w$_]+)\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/;
var aI = (e10) => aR.test(aE(e10));
function aO(e10, t10, n10 = false) {
  for (let r10 = 0; r10 < e10.props.length; r10++) {
    let i10 = e10.props[r10];
    if (7 === i10.type && (n10 || i10.exp) && (I(t10) ? i10.name === t10 : t10.test(i10.name))) return i10;
  }
}
function aP(e10, t10, n10 = false, r10 = false) {
  for (let i10 = 0; i10 < e10.props.length; i10++) {
    let l10 = e10.props[i10];
    if (6 === l10.type) {
      if (n10) continue;
      if (l10.name === t10 && (l10.value || r10)) return l10;
    } else if ("bind" === l10.name && (l10.exp || r10) && aM(l10.arg, t10)) return l10;
  }
}
function aM(e10, t10) {
  return !!(e10 && aS(e10) && e10.content === t10);
}
function aD(e10) {
  return 5 === e10.type || 2 === e10.type;
}
function aL(e10) {
  return 7 === e10.type && "slot" === e10.name;
}
function a$(e10) {
  return 1 === e10.type && 3 === e10.tagType;
}
function aF(e10) {
  return 1 === e10.type && 2 === e10.tagType;
}
var aV = /* @__PURE__ */ new Set([oG, oQ]);
function aB(e10, t10, n10) {
  let r10, i10;
  let l10 = 13 === e10.type ? e10.props : e10.arguments[2], s10 = [];
  if (l10 && !I(l10) && 14 === l10.type) {
    let e11 = function e12(t11, n11 = []) {
      if (t11 && !I(t11) && 14 === t11.type) {
        let r11 = t11.callee;
        if (!I(r11) && aV.has(r11)) return e12(t11.arguments[0], n11.concat(t11));
      }
      return [t11, n11];
    }(l10);
    l10 = e11[0], i10 = (s10 = e11[1])[s10.length - 1];
  }
  if (null == l10 || I(l10)) r10 = ar([t10]);
  else if (14 === l10.type) {
    let e11 = l10.arguments[0];
    I(e11) || 15 !== e11.type ? l10.callee === oX ? r10 = ao(n10.helper(oK), [ar([t10]), l10]) : l10.arguments.unshift(ar([t10])) : aU(t10, e11) || e11.properties.unshift(t10), r10 || (r10 = l10);
  } else 15 === l10.type ? (aU(t10, l10) || l10.properties.unshift(t10), r10 = l10) : (r10 = ao(n10.helper(oK), [ar([t10]), l10]), i10 && i10.callee === oQ && (i10 = s10[s10.length - 2]));
  13 === e10.type ? i10 ? i10.arguments[0] = r10 : e10.props = r10 : i10 ? i10.arguments[0] = r10 : e10.arguments[2] = r10;
}
function aU(e10, t10) {
  let n10 = false;
  if (4 === e10.key.type) {
    let r10 = e10.key.content;
    n10 = t10.properties.some((e11) => 4 === e11.key.type && e11.key.content === r10);
  }
  return n10;
}
function aj(e10, t10) {
  return `_${t10}_${e10.replace(/[^\w]/g, (t11, n10) => "-" === t11 ? "_" : e10.charCodeAt(n10).toString())}`;
}
var aH = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/;
var aq = { parseMode: "base", ns: 0, delimiters: ["{{", "}}"], getNamespace: () => 0, isVoidTag: y, isPreTag: y, isIgnoreNewlineTag: y, isCustomElement: y, onError: av, onWarn: ab, comments: false, prefixIdentifiers: false };
var aW = aq;
var aK = null;
var az = "";
var aJ = null;
var aG = null;
var aQ = "";
var aX = -1;
var aZ = -1;
var aY = 0;
var a0 = false;
var a1 = null;
var a2 = [];
var a6 = new class {
  constructor(e10, t10) {
    this.stack = e10, this.cbs = t10, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = false, this.inXML = false, this.inVPre = false, this.newlines = [], this.mode = 0, this.delimiterOpen = ad, this.delimiterClose = ap, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return 2 === this.mode && 0 === this.stack.length;
  }
  reset() {
    this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = false, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = ad, this.delimiterClose = ap;
  }
  getPos(e10) {
    let t10 = 1, n10 = e10 + 1;
    for (let r10 = this.newlines.length - 1; r10 >= 0; r10--) {
      let i10 = this.newlines[r10];
      if (e10 > i10) {
        t10 = r10 + 2, n10 = e10 - i10;
        break;
      }
    }
    return { column: n10, line: t10, offset: e10 };
  }
  peek() {
    return this.buffer.charCodeAt(this.index + 1);
  }
  stateText(e10) {
    60 === e10 ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = 5, this.sectionStart = this.index) : this.inVPre || e10 !== this.delimiterOpen[0] || (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(e10));
  }
  stateInterpolationOpen(e10) {
    if (e10 === this.delimiterOpen[this.delimiterIndex]) {
      if (this.delimiterIndex === this.delimiterOpen.length - 1) {
        let e11 = this.index + 1 - this.delimiterOpen.length;
        e11 > this.sectionStart && this.cbs.ontext(this.sectionStart, e11), this.state = 3, this.sectionStart = e11;
      } else this.delimiterIndex++;
    } else this.inRCDATA ? (this.state = 32, this.stateInRCDATA(e10)) : (this.state = 1, this.stateText(e10));
  }
  stateInterpolation(e10) {
    e10 === this.delimiterClose[0] && (this.state = 4, this.delimiterIndex = 0, this.stateInterpolationClose(e10));
  }
  stateInterpolationClose(e10) {
    e10 === this.delimiterClose[this.delimiterIndex] ? this.delimiterIndex === this.delimiterClose.length - 1 ? (this.cbs.oninterpolation(this.sectionStart, this.index + 1), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : this.delimiterIndex++ : (this.state = 3, this.stateInterpolation(e10));
  }
  stateSpecialStartSequence(e10) {
    let t10 = this.sequenceIndex === this.currentSequence.length;
    if (t10 ? am(e10) : (32 | e10) === this.currentSequence[this.sequenceIndex]) {
      if (!t10) {
        this.sequenceIndex++;
        return;
      }
    } else this.inRCDATA = false;
    this.sequenceIndex = 0, this.state = 6, this.stateInTagName(e10);
  }
  stateInRCDATA(e10) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (62 === e10 || ah(e10)) {
        let t10 = this.index - this.currentSequence.length;
        if (this.sectionStart < t10) {
          let e11 = this.index;
          this.index = t10, this.cbs.ontext(this.sectionStart, t10), this.index = e11;
        }
        this.sectionStart = t10 + 2, this.stateInClosingTagName(e10), this.inRCDATA = false;
        return;
      }
      this.sequenceIndex = 0;
    }
    (32 | e10) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : 0 === this.sequenceIndex ? this.currentSequence !== ay.TitleEnd && (this.currentSequence !== ay.TextareaEnd || this.inSFCRoot) ? this.fastForwardTo(60) && (this.sequenceIndex = 1) : this.inVPre || e10 !== this.delimiterOpen[0] || (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(e10)) : this.sequenceIndex = Number(60 === e10);
  }
  stateCDATASequence(e10) {
    e10 === ay.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === ay.Cdata.length && (this.state = 28, this.currentSequence = ay.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = 23, this.stateInDeclaration(e10));
  }
  fastForwardTo(e10) {
    for (; ++this.index < this.buffer.length; ) {
      let t10 = this.buffer.charCodeAt(this.index);
      if (10 === t10 && this.newlines.push(this.index), t10 === e10) return true;
    }
    return this.index = this.buffer.length - 1, false;
  }
  stateInCommentLike(e10) {
    e10 === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === ay.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index - 2) : this.cbs.oncomment(this.sectionStart, this.index - 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = 1) : 0 === this.sequenceIndex ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : e10 !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  startSpecial(e10, t10) {
    this.enterRCDATA(e10, t10), this.state = 31;
  }
  enterRCDATA(e10, t10) {
    this.inRCDATA = true, this.currentSequence = e10, this.sequenceIndex = t10;
  }
  stateBeforeTagName(e10) {
    33 === e10 ? (this.state = 22, this.sectionStart = this.index + 1) : 63 === e10 ? (this.state = 24, this.sectionStart = this.index + 1) : af(e10) ? (this.sectionStart = this.index, 0 === this.mode ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : 116 === e10 ? this.state = 30 : this.state = 115 === e10 ? 29 : 6) : 47 === e10 ? this.state = 8 : (this.state = 1, this.stateText(e10));
  }
  stateInTagName(e10) {
    am(e10) && this.handleTagName(e10);
  }
  stateInSFCRootTagName(e10) {
    if (am(e10)) {
      let t10 = this.buffer.slice(this.sectionStart, this.index);
      "template" !== t10 && this.enterRCDATA(ag("</" + t10), 0), this.handleTagName(e10);
    }
  }
  handleTagName(e10) {
    this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(e10);
  }
  stateBeforeClosingTagName(e10) {
    ah(e10) || (62 === e10 ? (this.state = 1, this.sectionStart = this.index + 1) : (this.state = af(e10) ? 9 : 27, this.sectionStart = this.index));
  }
  stateInClosingTagName(e10) {
    (62 === e10 || ah(e10)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = 10, this.stateAfterClosingTagName(e10));
  }
  stateAfterClosingTagName(e10) {
    62 === e10 && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeAttrName(e10) {
    62 === e10 ? (this.cbs.onopentagend(this.index), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : 47 === e10 ? this.state = 7 : 60 === e10 && 47 === this.peek() ? (this.cbs.onopentagend(this.index), this.state = 5, this.sectionStart = this.index) : ah(e10) || this.handleAttrStart(e10);
  }
  handleAttrStart(e10) {
    118 === e10 && 45 === this.peek() ? (this.state = 13, this.sectionStart = this.index) : 46 === e10 || 58 === e10 || 64 === e10 || 35 === e10 ? (this.cbs.ondirname(this.index, this.index + 1), this.state = 14, this.sectionStart = this.index + 1) : (this.state = 12, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(e10) {
    62 === e10 ? (this.cbs.onselfclosingtag(this.index), this.state = 1, this.sectionStart = this.index + 1, this.inRCDATA = false) : ah(e10) || (this.state = 11, this.stateBeforeAttrName(e10));
  }
  stateInAttrName(e10) {
    (61 === e10 || am(e10)) && (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(e10));
  }
  stateInDirName(e10) {
    61 === e10 || am(e10) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(e10)) : 58 === e10 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : 46 === e10 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDirArg(e10) {
    61 === e10 || am(e10) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(e10)) : 91 === e10 ? this.state = 15 : 46 === e10 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDynamicDirArg(e10) {
    93 === e10 ? this.state = 14 : (61 === e10 || am(e10)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(e10));
  }
  stateInDirModifier(e10) {
    61 === e10 || am(e10) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(e10)) : 46 === e10 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
  }
  handleAttrNameEnd(e10) {
    this.sectionStart = this.index, this.state = 17, this.cbs.onattribnameend(this.index), this.stateAfterAttrName(e10);
  }
  stateAfterAttrName(e10) {
    61 === e10 ? this.state = 18 : 47 === e10 || 62 === e10 ? (this.cbs.onattribend(0, this.sectionStart), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(e10)) : ah(e10) || (this.cbs.onattribend(0, this.sectionStart), this.handleAttrStart(e10));
  }
  stateBeforeAttrValue(e10) {
    34 === e10 ? (this.state = 19, this.sectionStart = this.index + 1) : 39 === e10 ? (this.state = 20, this.sectionStart = this.index + 1) : ah(e10) || (this.sectionStart = this.index, this.state = 21, this.stateInAttrValueNoQuotes(e10));
  }
  handleInAttrValue(e10, t10) {
    (e10 === t10 || this.fastForwardTo(t10)) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(34 === t10 ? 3 : 2, this.index + 1), this.state = 11);
  }
  stateInAttrValueDoubleQuotes(e10) {
    this.handleInAttrValue(e10, 34);
  }
  stateInAttrValueSingleQuotes(e10) {
    this.handleInAttrValue(e10, 39);
  }
  stateInAttrValueNoQuotes(e10) {
    ah(e10) || 62 === e10 ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(1, this.index), this.state = 11, this.stateBeforeAttrName(e10)) : (39 === e10 || 60 === e10 || 61 === e10 || 96 === e10) && this.cbs.onerr(18, this.index);
  }
  stateBeforeDeclaration(e10) {
    91 === e10 ? (this.state = 26, this.sequenceIndex = 0) : this.state = 45 === e10 ? 25 : 23;
  }
  stateInDeclaration(e10) {
    (62 === e10 || this.fastForwardTo(62)) && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(e10) {
    (62 === e10 || this.fastForwardTo(62)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(e10) {
    45 === e10 ? (this.state = 28, this.currentSequence = ay.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = 23;
  }
  stateInSpecialComment(e10) {
    (62 === e10 || this.fastForwardTo(62)) && (this.cbs.oncomment(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(e10) {
    e10 === ay.ScriptEnd[3] ? this.startSpecial(ay.ScriptEnd, 4) : e10 === ay.StyleEnd[3] ? this.startSpecial(ay.StyleEnd, 4) : (this.state = 6, this.stateInTagName(e10));
  }
  stateBeforeSpecialT(e10) {
    e10 === ay.TitleEnd[3] ? this.startSpecial(ay.TitleEnd, 4) : e10 === ay.TextareaEnd[3] ? this.startSpecial(ay.TextareaEnd, 4) : (this.state = 6, this.stateInTagName(e10));
  }
  startEntity() {
  }
  stateInEntity() {
  }
  parse(e10) {
    for (this.buffer = e10; this.index < this.buffer.length; ) {
      let e11 = this.buffer.charCodeAt(this.index);
      switch (10 === e11 && this.newlines.push(this.index), this.state) {
        case 1:
          this.stateText(e11);
          break;
        case 2:
          this.stateInterpolationOpen(e11);
          break;
        case 3:
          this.stateInterpolation(e11);
          break;
        case 4:
          this.stateInterpolationClose(e11);
          break;
        case 31:
          this.stateSpecialStartSequence(e11);
          break;
        case 32:
          this.stateInRCDATA(e11);
          break;
        case 26:
          this.stateCDATASequence(e11);
          break;
        case 19:
          this.stateInAttrValueDoubleQuotes(e11);
          break;
        case 12:
          this.stateInAttrName(e11);
          break;
        case 13:
          this.stateInDirName(e11);
          break;
        case 14:
          this.stateInDirArg(e11);
          break;
        case 15:
          this.stateInDynamicDirArg(e11);
          break;
        case 16:
          this.stateInDirModifier(e11);
          break;
        case 28:
          this.stateInCommentLike(e11);
          break;
        case 27:
          this.stateInSpecialComment(e11);
          break;
        case 11:
          this.stateBeforeAttrName(e11);
          break;
        case 6:
          this.stateInTagName(e11);
          break;
        case 34:
          this.stateInSFCRootTagName(e11);
          break;
        case 9:
          this.stateInClosingTagName(e11);
          break;
        case 5:
          this.stateBeforeTagName(e11);
          break;
        case 17:
          this.stateAfterAttrName(e11);
          break;
        case 20:
          this.stateInAttrValueSingleQuotes(e11);
          break;
        case 18:
          this.stateBeforeAttrValue(e11);
          break;
        case 8:
          this.stateBeforeClosingTagName(e11);
          break;
        case 10:
          this.stateAfterClosingTagName(e11);
          break;
        case 29:
          this.stateBeforeSpecialS(e11);
          break;
        case 30:
          this.stateBeforeSpecialT(e11);
          break;
        case 21:
          this.stateInAttrValueNoQuotes(e11);
          break;
        case 7:
          this.stateInSelfClosingTag(e11);
          break;
        case 23:
          this.stateInDeclaration(e11);
          break;
        case 22:
          this.stateBeforeDeclaration(e11);
          break;
        case 25:
          this.stateBeforeComment(e11);
          break;
        case 24:
          this.stateInProcessingInstruction(e11);
          break;
        case 33:
          this.stateInEntity();
      }
      this.index++;
    }
    this.cleanup(), this.finish();
  }
  cleanup() {
    this.sectionStart !== this.index && (1 === this.state || 32 === this.state && 0 === this.sequenceIndex ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (19 === this.state || 20 === this.state || 21 === this.state) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  finish() {
    this.handleTrailingData(), this.cbs.onend();
  }
  handleTrailingData() {
    let e10 = this.buffer.length;
    this.sectionStart >= e10 || (28 === this.state ? this.currentSequence === ay.CdataEnd ? this.cbs.oncdata(this.sectionStart, e10) : this.cbs.oncomment(this.sectionStart, e10) : 6 === this.state || 11 === this.state || 18 === this.state || 17 === this.state || 12 === this.state || 13 === this.state || 14 === this.state || 15 === this.state || 16 === this.state || 20 === this.state || 19 === this.state || 21 === this.state || 9 === this.state || this.cbs.ontext(this.sectionStart, e10));
  }
  emitCodePoint(e10, t10) {
  }
}(a2, { onerr: cc, ontext(e10, t10) {
  a9(a8(e10, t10), e10, t10);
}, ontextentity(e10, t10, n10) {
  a9(e10, t10, n10);
}, oninterpolation(e10, t10) {
  if (a0) return a9(a8(e10, t10), e10, t10);
  let n10 = e10 + a6.delimiterOpen.length, r10 = t10 - a6.delimiterClose.length;
  for (; ah(az.charCodeAt(n10)); ) n10++;
  for (; ah(az.charCodeAt(r10 - 1)); ) r10--;
  let i10 = a8(n10, r10);
  i10.includes("&") && (i10 = aW.decodeEntities(i10, false)), cl({ type: 5, content: ca(i10, false, cs(n10, r10)), loc: cs(e10, t10) });
}, onopentagname(e10, t10) {
  let n10 = a8(e10, t10);
  aJ = { type: 1, tag: n10, ns: aW.getNamespace(n10, a2[0], aW.ns), tagType: 0, props: [], children: [], loc: cs(e10 - 1, t10), codegenNode: void 0 };
}, onopentagend(e10) {
  a5(e10);
}, onclosetag(e10, t10) {
  let n10 = a8(e10, t10);
  if (!aW.isVoidTag(n10)) {
    let r10 = false;
    for (let e11 = 0; e11 < a2.length; e11++) if (a2[e11].tag.toLowerCase() === n10.toLowerCase()) {
      r10 = true, e11 > 0 && a2[0].loc.start.offset;
      for (let n11 = 0; n11 <= e11; n11++) a7(a2.shift(), t10, n11 < e11);
      break;
    }
    r10 || /* @__PURE__ */ ce(e10, 60);
  }
}, onselfclosingtag(e10) {
  let t10 = aJ.tag;
  aJ.isSelfClosing = true, a5(e10), a2[0] && a2[0].tag === t10 && a7(a2.shift(), e10);
}, onattribname(e10, t10) {
  aG = { type: 6, name: a8(e10, t10), nameLoc: cs(e10, t10), value: void 0, loc: cs(e10) };
}, ondirname(e10, t10) {
  let n10 = a8(e10, t10), r10 = "." === n10 || ":" === n10 ? "bind" : "@" === n10 ? "on" : "#" === n10 ? "slot" : n10.slice(2);
  if (a0 || "" === r10) aG = { type: 6, name: n10, nameLoc: cs(e10, t10), value: void 0, loc: cs(e10) };
  else if (aG = { type: 7, name: r10, rawName: n10, exp: void 0, arg: void 0, modifiers: "." === n10 ? [al("prop")] : [], loc: cs(e10) }, "pre" === r10) {
    a0 = a6.inVPre = true, a1 = aJ;
    let e11 = aJ.props;
    for (let t11 = 0; t11 < e11.length; t11++) 7 === e11[t11].type && (e11[t11] = function(e12) {
      let t12 = { type: 6, name: e12.rawName, nameLoc: cs(e12.loc.start.offset, e12.loc.start.offset + e12.rawName.length), value: void 0, loc: e12.loc };
      if (e12.exp) {
        let n11 = e12.exp.loc;
        n11.end.offset < e12.loc.end.offset && (n11.start.offset--, n11.start.column--, n11.end.offset++, n11.end.column++), t12.value = { type: 2, content: e12.exp.content, loc: n11 };
      }
      return t12;
    }(e11[t11]));
  }
}, ondirarg(e10, t10) {
  if (e10 === t10) return;
  let n10 = a8(e10, t10);
  if (a0) aG.name += n10, co(aG.nameLoc, t10);
  else {
    let r10 = "[" !== n10[0];
    aG.arg = ca(r10 ? n10 : n10.slice(1, -1), r10, cs(e10, t10), r10 ? 3 : 0);
  }
}, ondirmodifier(e10, t10) {
  let n10 = a8(e10, t10);
  if (a0) aG.name += "." + n10, co(aG.nameLoc, t10);
  else if ("slot" === aG.name) {
    let e11 = aG.arg;
    e11 && (e11.content += "." + n10, co(e11.loc, t10));
  } else {
    let r10 = al(n10, true, cs(e10, t10));
    aG.modifiers.push(r10);
  }
}, onattribdata(e10, t10) {
  aQ += a8(e10, t10), aX < 0 && (aX = e10), aZ = t10;
}, onattribentity(e10, t10, n10) {
  aQ += e10, aX < 0 && (aX = t10), aZ = n10;
}, onattribnameend(e10) {
  let t10 = a8(aG.loc.start.offset, e10);
  7 === aG.type && (aG.rawName = t10), aJ.props.some((e11) => (7 === e11.type ? e11.rawName : e11.name) === t10);
}, onattribend(e10, t10) {
  aJ && aG && (co(aG.loc, t10), 0 !== e10 && (aQ.includes("&") && (aQ = aW.decodeEntities(aQ, true)), 6 === aG.type ? ("class" === aG.name && (aQ = ci(aQ).trim()), aG.value = { type: 2, content: aQ, loc: 1 === e10 ? cs(aX, aZ) : cs(aX - 1, aZ + 1) }, a6.inSFCRoot && "template" === aJ.tag && "lang" === aG.name && aQ && "html" !== aQ && a6.enterRCDATA(ag("</template"), 0)) : (aG.exp = ca(aQ, false, cs(aX, aZ), 0, 0), "for" === aG.name && (aG.forParseResult = function(e11) {
    let t11 = e11.loc, n10 = e11.content, r10 = n10.match(aH);
    if (!r10) return;
    let [, i10, l10] = r10, s10 = (e12, n11, r11 = false) => {
      let i11 = t11.start.offset + n11, l11 = i11 + e12.length;
      return ca(e12, false, cs(i11, l11), 0, r11 ? 1 : 0);
    }, o10 = { source: s10(l10.trim(), n10.indexOf(l10, i10.length)), value: void 0, key: void 0, index: void 0, finalized: false }, a10 = i10.trim().replace(a4, "").trim(), c10 = i10.indexOf(a10), u2 = a10.match(a3);
    if (u2) {
      let e12;
      a10 = a10.replace(a3, "").trim();
      let t12 = u2[1].trim();
      if (t12 && (e12 = n10.indexOf(t12, c10 + a10.length), o10.key = s10(t12, e12, true)), u2[2]) {
        let r11 = u2[2].trim();
        r11 && (o10.index = s10(r11, n10.indexOf(r11, o10.key ? e12 + t12.length : c10 + a10.length), true));
      }
    }
    return a10 && (o10.value = s10(a10, c10, true)), o10;
  }(aG.exp)))), (7 !== aG.type || "pre" !== aG.name) && aJ.props.push(aG)), aQ = "", aX = aZ = -1;
}, oncomment(e10, t10) {
  aW.comments && cl({ type: 3, content: a8(e10, t10), loc: cs(e10 - 4, t10 + 3) });
}, onend() {
  let e10 = az.length;
  for (let t10 = 0; t10 < a2.length; t10++) a7(a2[t10], e10 - 1), a2[t10].loc.start.offset;
}, oncdata(e10, t10) {
  0 !== a2[0].ns && a9(a8(e10, t10), e10, t10);
}, onprocessinginstruction(e10) {
  (a2[0] ? a2[0].ns : aW.ns) === 0 && cc(21, e10 - 1);
} });
var a3 = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var a4 = /^\(|\)$/g;
function a8(e10, t10) {
  return az.slice(e10, t10);
}
function a5(e10) {
  a6.inSFCRoot && (aJ.innerLoc = cs(e10 + 1, e10 + 1)), cl(aJ);
  let { tag: t10, ns: n10 } = aJ;
  0 === n10 && aW.isPreTag(t10) && aY++, aW.isVoidTag(t10) ? a7(aJ, e10) : (a2.unshift(aJ), (1 === n10 || 2 === n10) && (a6.inXML = true)), aJ = null;
}
function a9(e10, t10, n10) {
  {
    let t11 = a2[0] && a2[0].tag;
    "script" !== t11 && "style" !== t11 && e10.includes("&") && (e10 = aW.decodeEntities(e10, false));
  }
  let r10 = a2[0] || aK, i10 = r10.children[r10.children.length - 1];
  i10 && 2 === i10.type ? (i10.content += e10, co(i10.loc, n10)) : r10.children.push({ type: 2, content: e10, loc: cs(t10, n10) });
}
function a7(e10, t10, n10 = false) {
  n10 ? co(e10.loc, ce(t10, 60)) : co(e10.loc, function(e11, t11) {
    let n11 = e11;
    for (; 62 !== az.charCodeAt(n11) && n11 < az.length - 1; ) n11++;
    return n11;
  }(t10, 0) + 1), a6.inSFCRoot && (e10.children.length ? e10.innerLoc.end = S({}, e10.children[e10.children.length - 1].loc.end) : e10.innerLoc.end = S({}, e10.innerLoc.start), e10.innerLoc.source = a8(e10.innerLoc.start.offset, e10.innerLoc.end.offset));
  let { tag: r10, ns: i10, children: l10 } = e10;
  if (!a0 && ("slot" === r10 ? e10.tagType = 2 : function({ tag: e11, props: t11 }) {
    if ("template" === e11) {
      for (let e12 = 0; e12 < t11.length; e12++) if (7 === t11[e12].type && ct.has(t11[e12].name)) return true;
    }
    return false;
  }(e10) ? e10.tagType = 3 : function({ tag: e11, props: t11 }) {
    var n11;
    if (aW.isCustomElement(e11)) return false;
    if ("component" === e11 || (n11 = e11.charCodeAt(0)) > 64 && n11 < 91 || ax(e11) || aW.isBuiltInComponent && aW.isBuiltInComponent(e11) || aW.isNativeTag && !aW.isNativeTag(e11)) return true;
    for (let e12 = 0; e12 < t11.length; e12++) {
      let n12 = t11[e12];
      if (6 === n12.type && "is" === n12.name && n12.value && n12.value.content.startsWith("vue:")) return true;
    }
    return false;
  }(e10) && (e10.tagType = 1)), a6.inRCDATA || (e10.children = cr(l10)), 0 === i10 && aW.isIgnoreNewlineTag(r10)) {
    let e11 = l10[0];
    e11 && 2 === e11.type && (e11.content = e11.content.replace(/^\r?\n/, ""));
  }
  0 === i10 && aW.isPreTag(r10) && aY--, a1 === e10 && (a0 = a6.inVPre = false, a1 = null), a6.inXML && (a2[0] ? a2[0].ns : aW.ns) === 0 && (a6.inXML = false);
}
function ce(e10, t10) {
  let n10 = e10;
  for (; az.charCodeAt(n10) !== t10 && n10 >= 0; ) n10--;
  return n10;
}
var ct = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
var cn = /\r\n/g;
function cr(e10, t10) {
  let n10 = "preserve" !== aW.whitespace, r10 = false;
  for (let t11 = 0; t11 < e10.length; t11++) {
    let i10 = e10[t11];
    if (2 === i10.type) {
      if (aY) i10.content = i10.content.replace(cn, "\n");
      else if (function(e11) {
        for (let t12 = 0; t12 < e11.length; t12++) if (!ah(e11.charCodeAt(t12))) return false;
        return true;
      }(i10.content)) {
        let l10 = e10[t11 - 1] && e10[t11 - 1].type, s10 = e10[t11 + 1] && e10[t11 + 1].type;
        !l10 || !s10 || n10 && (3 === l10 && (3 === s10 || 1 === s10) || 1 === l10 && (3 === s10 || 1 === s10 && function(e11) {
          for (let t12 = 0; t12 < e11.length; t12++) {
            let n11 = e11.charCodeAt(t12);
            if (10 === n11 || 13 === n11) return true;
          }
          return false;
        }(i10.content))) ? (r10 = true, e10[t11] = null) : i10.content = " ";
      } else n10 && (i10.content = ci(i10.content));
    }
  }
  return r10 ? e10.filter(Boolean) : e10;
}
function ci(e10) {
  let t10 = "", n10 = false;
  for (let r10 = 0; r10 < e10.length; r10++) ah(e10.charCodeAt(r10)) ? n10 || (t10 += " ", n10 = true) : (t10 += e10[r10], n10 = false);
  return t10;
}
function cl(e10) {
  (a2[0] || aK).children.push(e10);
}
function cs(e10, t10) {
  return { start: a6.getPos(e10), end: null == t10 ? t10 : a6.getPos(t10), source: null == t10 ? t10 : a8(e10, t10) };
}
function co(e10, t10) {
  e10.end = a6.getPos(t10), e10.source = a8(e10.start.offset, t10);
}
function ca(e10, t10 = false, n10, r10 = 0, i10 = 0) {
  return al(e10, t10, n10, r10);
}
function cc(e10, t10, n10) {
  aW.onError(/* @__PURE__ */ a_(e10, cs(t10, t10)));
}
function cu(e10, t10) {
  let { children: n10 } = e10;
  return 1 === n10.length && 1 === t10.type && !aF(t10);
}
function cd(e10, t10) {
  let { constantCache: n10 } = t10;
  switch (e10.type) {
    case 1:
      if (0 !== e10.tagType) return 0;
      let r10 = n10.get(e10);
      if (void 0 !== r10) return r10;
      let i10 = e10.codegenNode;
      if (13 !== i10.type || i10.isBlock && "svg" !== e10.tag && "foreignObject" !== e10.tag && "math" !== e10.tag) return 0;
      if (void 0 !== i10.patchFlag) return n10.set(e10, 0), 0;
      {
        let r11 = 3, c11 = cf(e10, t10);
        if (0 === c11) return n10.set(e10, 0), 0;
        c11 < r11 && (r11 = c11);
        for (let i11 = 0; i11 < e10.children.length; i11++) {
          let l11 = cd(e10.children[i11], t10);
          if (0 === l11) return n10.set(e10, 0), 0;
          l11 < r11 && (r11 = l11);
        }
        if (r11 > 1) for (let i11 = 0; i11 < e10.props.length; i11++) {
          let l11 = e10.props[i11];
          if (7 === l11.type && "bind" === l11.name && l11.exp) {
            let i12 = cd(l11.exp, t10);
            if (0 === i12) return n10.set(e10, 0), 0;
            i12 < r11 && (r11 = i12);
          }
        }
        if (i10.isBlock) {
          var l10, s10, o10, a10;
          for (let t11 = 0; t11 < e10.props.length; t11++) if (7 === e10.props[t11].type) return n10.set(e10, 0), 0;
          t10.removeHelper(oA), t10.removeHelper((l10 = t10.inSSR, s10 = i10.isComponent, l10 || s10 ? oR : oI)), i10.isBlock = false, t10.helper((o10 = t10.inSSR, a10 = i10.isComponent, o10 || a10 ? oO : oP));
        }
        return n10.set(e10, r11), r11;
      }
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
    default:
      return 0;
    case 5:
    case 12:
      return cd(e10.content, t10);
    case 4:
      return e10.constType;
    case 8:
      let c10 = 3;
      for (let n11 = 0; n11 < e10.children.length; n11++) {
        let r11 = e10.children[n11];
        if (I(r11) || O(r11)) continue;
        let i11 = cd(r11, t10);
        if (0 === i11) return 0;
        i11 < c10 && (c10 = i11);
      }
      return c10;
    case 20:
      return 2;
  }
}
var cp = /* @__PURE__ */ new Set([oz, oJ, oG, oQ]);
function cf(e10, t10) {
  let n10 = 3, r10 = ch(e10);
  if (r10 && 15 === r10.type) {
    let { properties: e11 } = r10;
    for (let r11 = 0; r11 < e11.length; r11++) {
      let i10;
      let { key: l10, value: s10 } = e11[r11], o10 = cd(l10, t10);
      if (0 === o10) return o10;
      if (o10 < n10 && (n10 = o10), 0 === (i10 = 4 === s10.type ? cd(s10, t10) : 14 === s10.type ? function e12(t11, n11) {
        if (14 === t11.type && !I(t11.callee) && cp.has(t11.callee)) {
          let r12 = t11.arguments[0];
          if (4 === r12.type) return cd(r12, n11);
          if (14 === r12.type) return e12(r12, n11);
        }
        return 0;
      }(s10, t10) : 0)) return i10;
      i10 < n10 && (n10 = i10);
    }
  }
  return n10;
}
function ch(e10) {
  let t10 = e10.codegenNode;
  if (13 === t10.type) return t10.props;
}
function cm(e10, t10) {
  t10.currentNode = e10;
  let { nodeTransforms: n10 } = t10, r10 = [];
  for (let i11 = 0; i11 < n10.length; i11++) {
    let l10 = n10[i11](e10, t10);
    if (l10 && (k(l10) ? r10.push(...l10) : r10.push(l10)), !t10.currentNode) return;
    e10 = t10.currentNode;
  }
  switch (e10.type) {
    case 3:
      t10.ssr || t10.helper(oM);
      break;
    case 5:
      t10.ssr || t10.helper(oW);
      break;
    case 9:
      for (let n11 = 0; n11 < e10.branches.length; n11++) cm(e10.branches[n11], t10);
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      !function(e11, t11) {
        let n11 = 0, r11 = () => {
          n11--;
        };
        for (; n11 < e11.children.length; n11++) {
          let i11 = e11.children[n11];
          I(i11) || (t11.grandParent = t11.parent, t11.parent = e11, t11.childIndex = n11, t11.onNodeRemoved = r11, cm(i11, t11));
        }
      }(e10, t10);
  }
  t10.currentNode = e10;
  let i10 = r10.length;
  for (; i10--; ) r10[i10]();
}
function cg(e10, t10) {
  let n10 = I(e10) ? (t11) => t11 === e10 : (t11) => e10.test(t11);
  return (e11, r10) => {
    if (1 === e11.type) {
      let { props: i10 } = e11;
      if (3 === e11.tagType && i10.some(aL)) return;
      let l10 = [];
      for (let s10 = 0; s10 < i10.length; s10++) {
        let o10 = i10[s10];
        if (7 === o10.type && n10(o10.name)) {
          i10.splice(s10, 1), s10--;
          let n11 = t10(e11, o10, r10);
          n11 && l10.push(n11);
        }
      }
      return l10;
    }
  };
}
var cy = "/*@__PURE__*/";
var cv = (e10) => `${o7[e10]}: _${o7[e10]}`;
function cb(e10, t10, { helper: n10, push: r10, newline: i10, isTS: l10 }) {
  let s10 = n10("component" === t10 ? o$ : oV);
  for (let n11 = 0; n11 < e10.length; n11++) {
    let o10 = e10[n11], a10 = o10.endsWith("__self");
    a10 && (o10 = o10.slice(0, -6)), r10(`const ${aj(o10, t10)} = ${s10}(${JSON.stringify(o10)}${a10 ? ", true" : ""})${l10 ? "!" : ""}`), n11 < e10.length - 1 && i10();
  }
}
function c_(e10, t10) {
  let n10 = e10.length > 3;
  t10.push("["), n10 && t10.indent(), cS(e10, t10, n10), n10 && t10.deindent(), t10.push("]");
}
function cS(e10, t10, n10 = false, r10 = true) {
  let { push: i10, newline: l10 } = t10;
  for (let s10 = 0; s10 < e10.length; s10++) {
    let o10 = e10[s10];
    I(o10) ? i10(o10, -3) : k(o10) ? c_(o10, t10) : cx(o10, t10), s10 < e10.length - 1 && (n10 ? (r10 && i10(","), l10()) : r10 && i10(", "));
  }
}
function cx(e10, t10) {
  if (I(e10)) {
    t10.push(e10, -3);
    return;
  }
  if (O(e10)) {
    t10.push(t10.helper(e10));
    return;
  }
  switch (e10.type) {
    case 1:
    case 9:
    case 11:
    case 12:
      cx(e10.codegenNode, t10);
      break;
    case 2:
      !function(e11, t11) {
        t11.push(JSON.stringify(e11.content), -3, e11);
      }(e10, t10);
      break;
    case 4:
      cC(e10, t10);
      break;
    case 5:
      !function(e11, t11) {
        let { push: n10, helper: r10, pure: i10 } = t11;
        i10 && n10(cy), n10(`${r10(oW)}(`), cx(e11.content, t11), n10(")");
      }(e10, t10);
      break;
    case 8:
      cT(e10, t10);
      break;
    case 3:
      !function(e11, t11) {
        let { push: n10, helper: r10, pure: i10 } = t11;
        i10 && n10(cy), n10(`${r10(oM)}(${JSON.stringify(e11.content)})`, -3, e11);
      }(e10, t10);
      break;
    case 13:
      !function(e11, t11) {
        let n10;
        let { push: r10, helper: i10, pure: l10 } = t11, { tag: s10, props: o10, children: a10, patchFlag: c10, dynamicProps: u2, directives: d2, isBlock: p2, disableTracking: f2, isComponent: h2 } = e11;
        c10 && (n10 = String(c10)), d2 && r10(i10(oU) + "("), p2 && r10(`(${i10(oA)}(${f2 ? "true" : ""}), `), l10 && r10(cy), r10(i10(p2 ? t11.inSSR || h2 ? oR : oI : t11.inSSR || h2 ? oO : oP) + "(", -2, e11), cS(function(e12) {
          let t12 = e12.length;
          for (; t12-- && null == e12[t12]; ) ;
          return e12.slice(0, t12 + 1).map((e13) => e13 || "null");
        }([s10, o10, a10, n10, u2]), t11), r10(")"), p2 && r10(")"), d2 && (r10(", "), cx(d2, t11), r10(")"));
      }(e10, t10);
      break;
    case 14:
      !function(e11, t11) {
        let { push: n10, helper: r10, pure: i10 } = t11, l10 = I(e11.callee) ? e11.callee : r10(e11.callee);
        i10 && n10(cy), n10(l10 + "(", -2, e11), cS(e11.arguments, t11), n10(")");
      }(e10, t10);
      break;
    case 15:
      !function(e11, t11) {
        let { push: n10, indent: r10, deindent: i10, newline: l10 } = t11, { properties: s10 } = e11;
        if (!s10.length) {
          n10("{}", -2, e11);
          return;
        }
        let o10 = s10.length > 1;
        n10(o10 ? "{" : "{ "), o10 && r10();
        for (let e12 = 0; e12 < s10.length; e12++) {
          let { key: r11, value: i11 } = s10[e12];
          !function(e13, t12) {
            let { push: n11 } = t12;
            8 === e13.type ? (n11("["), cT(e13, t12), n11("]")) : e13.isStatic ? n11(aT(e13.content) ? e13.content : JSON.stringify(e13.content), -2, e13) : n11(`[${e13.content}]`, -3, e13);
          }(r11, t11), n10(": "), cx(i11, t11), e12 < s10.length - 1 && (n10(","), l10());
        }
        o10 && i10(), n10(o10 ? "}" : " }");
      }(e10, t10);
      break;
    case 17:
      c_(e10.elements, t10);
      break;
    case 18:
      !function(e11, t11) {
        let { push: n10, indent: r10, deindent: i10 } = t11, { params: l10, returns: s10, body: o10, newline: a10, isSlot: c10 } = e11;
        c10 && n10(`_${o7[o3]}(`), n10("(", -2, e11), k(l10) ? cS(l10, t11) : l10 && cx(l10, t11), n10(") => "), (a10 || o10) && (n10("{"), r10()), s10 ? (a10 && n10("return "), k(s10) ? c_(s10, t11) : cx(s10, t11)) : o10 && cx(o10, t11), (a10 || o10) && (i10(), n10("}")), c10 && n10(")");
      }(e10, t10);
      break;
    case 19:
      !function(e11, t11) {
        let { test: n10, consequent: r10, alternate: i10, newline: l10 } = e11, { push: s10, indent: o10, deindent: a10, newline: c10 } = t11;
        if (4 === n10.type) {
          let e12 = !aT(n10.content);
          e12 && s10("("), cC(n10, t11), e12 && s10(")");
        } else s10("("), cx(n10, t11), s10(")");
        l10 && o10(), t11.indentLevel++, l10 || s10(" "), s10("? "), cx(r10, t11), t11.indentLevel--, l10 && c10(), l10 || s10(" "), s10(": ");
        let u2 = 19 === i10.type;
        !u2 && t11.indentLevel++, cx(i10, t11), !u2 && t11.indentLevel--, l10 && a10(true);
      }(e10, t10);
      break;
    case 20:
      !function(e11, t11) {
        let { push: n10, helper: r10, indent: i10, deindent: l10, newline: s10 } = t11, { needPauseTracking: o10, needArraySpread: a10 } = e11;
        a10 && n10("[...("), n10(`_cache[${e11.index}] || (`), o10 && (i10(), n10(`${r10(o1)}(-1),`), s10(), n10("(")), n10(`_cache[${e11.index}] = `), cx(e11.value, t11), o10 && (n10(`).cacheIndex = ${e11.index},`), s10(), n10(`${r10(o1)}(1),`), s10(), n10(`_cache[${e11.index}]`), l10()), n10(")"), a10 && n10(")]");
      }(e10, t10);
      break;
    case 21:
      cS(e10.body, t10, true, false);
  }
}
function cC(e10, t10) {
  let { content: n10, isStatic: r10 } = e10;
  t10.push(r10 ? JSON.stringify(n10) : n10, -3, e10);
}
function cT(e10, t10) {
  for (let n10 = 0; n10 < e10.children.length; n10++) {
    let r10 = e10.children[n10];
    I(r10) ? t10.push(r10, -3) : cx(r10, t10);
  }
}
var ck = cg(/^(if|else|else-if)$/, (e10, t10, n10) => function(e11, t11, n11, r10) {
  if ("else" !== t11.name && (!t11.exp || !t11.exp.content.trim())) {
    let r11 = t11.exp ? t11.exp.loc : e11.loc;
    n11.onError(/* @__PURE__ */ a_(28, t11.loc)), t11.exp = al("true", false, r11);
  }
  if ("if" === t11.name) {
    var i10;
    let l10 = cw(e11, t11), s10 = { type: 9, loc: cs((i10 = e11.loc).start.offset, i10.end.offset), branches: [l10] };
    if (n11.replaceNode(s10), r10) return r10(s10, l10, true);
  } else {
    let i11 = n11.parent.children, l10 = i11.indexOf(e11);
    for (; l10-- >= -1; ) {
      let s10 = i11[l10];
      if (s10 && 3 === s10.type || s10 && 2 === s10.type && !s10.content.trim().length) {
        n11.removeNode(s10);
        continue;
      }
      if (s10 && 9 === s10.type) {
        "else-if" === t11.name && void 0 === s10.branches[s10.branches.length - 1].condition && n11.onError(/* @__PURE__ */ a_(30, e11.loc)), n11.removeNode();
        let i12 = cw(e11, t11);
        s10.branches.push(i12);
        let l11 = r10 && r10(s10, i12, false);
        cm(i12, n11), l11 && l11(), n11.currentNode = null;
      } else n11.onError(/* @__PURE__ */ a_(30, e11.loc));
      break;
    }
  }
}(e10, t10, n10, (e11, t11, r10) => {
  let i10 = n10.parent.children, l10 = i10.indexOf(e11), s10 = 0;
  for (; l10-- >= 0; ) {
    let e12 = i10[l10];
    e12 && 9 === e12.type && (s10 += e12.branches.length);
  }
  return () => {
    r10 ? e11.codegenNode = cN(t11, s10, n10) : function(e12) {
      for (; ; ) if (19 === e12.type) {
        if (19 !== e12.alternate.type) return e12;
        e12 = e12.alternate;
      } else 20 === e12.type && (e12 = e12.value);
    }(e11.codegenNode).alternate = cN(t11, s10 + e11.branches.length - 1, n10);
  };
}));
function cw(e10, t10) {
  let n10 = 3 === e10.tagType;
  return { type: 10, loc: e10.loc, condition: "else" === t10.name ? void 0 : t10.exp, children: n10 && !aO(e10, "for") ? e10.children : [e10], userKey: aP(e10, "key"), isTemplateIf: n10 };
}
function cN(e10, t10, n10) {
  return e10.condition ? ac(e10.condition, cE(e10, t10, n10), ao(n10.helper(oM), ['""', "true"])) : cE(e10, t10, n10);
}
function cE(e10, t10, n10) {
  let { helper: r10 } = n10, i10 = ai("key", al(`${t10}`, false, ae, 2)), { children: l10 } = e10, s10 = l10[0];
  if (1 !== l10.length || 1 !== s10.type) {
    if (1 !== l10.length || 11 !== s10.type) return at(n10, r10(oT), ar([i10]), l10, 64, void 0, void 0, true, false, false, e10.loc);
    {
      let e11 = s10.codegenNode;
      return aB(e11, i10, n10), e11;
    }
  }
  {
    let e11 = s10.codegenNode, t11 = 14 === e11.type && e11.callee === o5 ? e11.arguments[1].returns : e11;
    return 13 === t11.type && au(t11, n10), aB(t11, i10, n10), e11;
  }
}
var cA = (e10, t10, n10) => {
  let { modifiers: r10, loc: i10 } = e10, l10 = e10.arg, { exp: s10 } = e10;
  if (s10 && 4 === s10.type && !s10.content.trim() && (s10 = void 0), !s10) {
    if (4 !== l10.type || !l10.isStatic) return n10.onError(a_(52, l10.loc)), { props: [ai(l10, al("", true, i10))] };
    cR(e10), s10 = e10.exp;
  }
  return 4 !== l10.type ? (l10.children.unshift("("), l10.children.push(') || ""')) : l10.isStatic || (l10.content = `${l10.content} || ""`), r10.some((e11) => "camel" === e11.content) && (4 === l10.type ? l10.isStatic ? l10.content = q(l10.content) : l10.content = `${n10.helperString(oZ)}(${l10.content})` : (l10.children.unshift(`${n10.helperString(oZ)}(`), l10.children.push(")"))), !n10.inSSR && (r10.some((e11) => "prop" === e11.content) && cI(l10, "."), r10.some((e11) => "attr" === e11.content) && cI(l10, "^")), { props: [ai(l10, s10)] };
};
var cR = (e10, t10) => {
  let n10 = e10.arg, r10 = q(n10.content);
  e10.exp = al(r10, false, n10.loc);
};
var cI = (e10, t10) => {
  4 === e10.type ? e10.isStatic ? e10.content = t10 + e10.content : e10.content = `\`${t10}\${${e10.content}}\`` : (e10.children.unshift(`'${t10}' + (`), e10.children.push(")"));
};
var cO = cg("for", (e10, t10, n10) => {
  let { helper: r10, removeHelper: i10 } = n10;
  return function(e11, t11, n11, r11) {
    if (!t11.exp) {
      n11.onError(/* @__PURE__ */ a_(31, t11.loc));
      return;
    }
    let i11 = t11.forParseResult;
    if (!i11) {
      n11.onError(/* @__PURE__ */ a_(32, t11.loc));
      return;
    }
    cP(i11);
    let { addIdentifiers: l10, removeIdentifiers: s10, scopes: o10 } = n11, { source: a10, value: c10, key: u2, index: d2 } = i11, p2 = { type: 11, loc: t11.loc, source: a10, valueAlias: c10, keyAlias: u2, objectIndexAlias: d2, parseResult: i11, children: a$(e11) ? e11.children : [e11] };
    n11.replaceNode(p2), o10.vFor++;
    let f2 = r11 && r11(p2);
    return () => {
      o10.vFor--, f2 && f2();
    };
  }(e10, t10, n10, (t11) => {
    let l10 = ao(r10(oj), [t11.source]), s10 = a$(e10), o10 = aO(e10, "memo"), a10 = aP(e10, "key", false, true);
    a10 && 7 === a10.type && !a10.exp && cR(a10);
    let c10 = a10 && (6 === a10.type ? a10.value ? al(a10.value.content, true) : void 0 : a10.exp), u2 = a10 && c10 ? ai("key", c10) : null, d2 = 4 === t11.source.type && t11.source.constType > 0, p2 = d2 ? 64 : a10 ? 128 : 256;
    return t11.codegenNode = at(n10, r10(oT), void 0, l10, p2, void 0, void 0, true, !d2, false, e10.loc), () => {
      let a11;
      let { children: p3 } = t11, f2 = 1 !== p3.length || 1 !== p3[0].type, h2 = aF(e10) ? e10 : s10 && 1 === e10.children.length && aF(e10.children[0]) ? e10.children[0] : null;
      if (h2) a11 = h2.codegenNode, s10 && u2 && aB(a11, u2, n10);
      else if (f2) a11 = at(n10, r10(oT), u2 ? ar([u2]) : void 0, e10.children, 64, void 0, void 0, true, void 0, false);
      else {
        var m2, g2, y2, b2, _2, S2, x2, C2;
        a11 = p3[0].codegenNode, s10 && u2 && aB(a11, u2, n10), !d2 !== a11.isBlock && (a11.isBlock ? (i10(oA), i10((m2 = n10.inSSR, g2 = a11.isComponent, m2 || g2 ? oR : oI))) : i10((y2 = n10.inSSR, b2 = a11.isComponent, y2 || b2 ? oO : oP))), (a11.isBlock = !d2, a11.isBlock) ? (r10(oA), r10((_2 = n10.inSSR, S2 = a11.isComponent, _2 || S2 ? oR : oI))) : r10((x2 = n10.inSSR, C2 = a11.isComponent, x2 || C2 ? oO : oP));
      }
      if (o10) {
        let e11 = aa(cM(t11.parseResult, [al("_cached")]));
        e11.body = { type: 21, body: [as(["const _memo = (", o10.exp, ")"]), as(["if (_cached", ...c10 ? [" && _cached.key === ", c10] : [], ` && ${n10.helperString(o9)}(_cached, _memo)) return _cached`]), as(["const _item = ", a11]), al("_item.memo = _memo"), al("return _item")], loc: ae }, l10.arguments.push(e11, al("_cache"), al(String(n10.cached.length))), n10.cached.push(null);
      } else l10.arguments.push(aa(cM(t11.parseResult), a11, true));
    };
  });
});
function cP(e10, t10) {
  e10.finalized || (e10.finalized = true);
}
function cM({ value: e10, key: t10, index: n10 }, r10 = []) {
  return function(e11) {
    let t11 = e11.length;
    for (; t11-- && !e11[t11]; ) ;
    return e11.slice(0, t11 + 1).map((e12, t12) => e12 || al("_".repeat(t12 + 1), false));
  }([e10, t10, n10, ...r10]);
}
var cD = al("undefined", false);
var cL = (e10, t10) => {
  if (1 === e10.type && (1 === e10.tagType || 3 === e10.tagType)) {
    let n10 = aO(e10, "slot");
    if (n10) return n10.exp, t10.scopes.vSlot++, () => {
      t10.scopes.vSlot--;
    };
  }
};
var c$ = (e10, t10, n10, r10) => aa(e10, n10, false, true, n10.length ? n10[0].loc : r10);
function cF(e10, t10, n10) {
  let r10 = [ai("name", e10), ai("fn", t10)];
  return null != n10 && r10.push(ai("key", al(String(n10), true))), ar(r10);
}
var cV = /* @__PURE__ */ new WeakMap();
var cB = (e10, t10) => function() {
  let n10, r10, i10, l10, s10;
  if (!(1 === (e10 = t10.currentNode).type && (0 === e10.tagType || 1 === e10.tagType))) return;
  let { tag: o10, props: a10 } = e10, c10 = 1 === e10.tagType, u2 = c10 ? function(e11, t11, n11 = false) {
    let { tag: r11 } = e11, i11 = cH(r11), l11 = aP(e11, "is", false, true);
    if (l11) {
      if (i11) {
        let e12;
        if (6 === l11.type ? e12 = l11.value && al(l11.value.content, true) : (e12 = l11.exp) || (e12 = al("is", false, l11.arg.loc)), e12) return ao(t11.helper(oF), [e12]);
      } else 6 === l11.type && l11.value.content.startsWith("vue:") && (r11 = l11.value.content.slice(4));
    }
    let s11 = ax(r11) || t11.isBuiltInComponent(r11);
    return s11 ? (n11 || t11.helper(s11), s11) : (t11.helper(o$), t11.components.add(r11), aj(r11, "component"));
  }(e10, t10) : `"${o10}"`, d2 = P(u2) && u2.callee === oF, p2 = 0, f2 = d2 || u2 === ok || u2 === ow || !c10 && ("svg" === o10 || "foreignObject" === o10 || "math" === o10);
  if (a10.length > 0) {
    let r11 = cU(e10, t10, void 0, c10, d2);
    n10 = r11.props, p2 = r11.patchFlag, l10 = r11.dynamicPropNames;
    let i11 = r11.directives;
    s10 = i11 && i11.length ? an(i11.map((e11) => function(e12, t11) {
      let n11 = [], r12 = cV.get(e12);
      r12 ? n11.push(t11.helperString(r12)) : (t11.helper(oV), t11.directives.add(e12.name), n11.push(aj(e12.name, "directive")));
      let { loc: i12 } = e12;
      if (e12.exp && n11.push(e12.exp), e12.arg && (e12.exp || n11.push("void 0"), n11.push(e12.arg)), Object.keys(e12.modifiers).length) {
        e12.arg || (e12.exp || n11.push("void 0"), n11.push("void 0"));
        let t12 = al("true", false, i12);
        n11.push(ar(e12.modifiers.map((e13) => ai(e13, t12)), i12));
      }
      return an(n11, e12.loc);
    }(e11, t10))) : void 0, r11.shouldUseBlock && (f2 = true);
  }
  if (e10.children.length > 0) {
    if (u2 === oN && (f2 = true, p2 |= 1024), c10 && u2 !== ok && u2 !== oN) {
      let { slots: n11, hasDynamicSlots: i11 } = function(e11, t11, n12 = c$) {
        t11.helper(o3);
        let { children: r11, loc: i12 } = e11, l11 = [], s11 = [], o11 = t11.scopes.vSlot > 0 || t11.scopes.vFor > 0, a11 = aO(e11, "slot", true);
        if (a11) {
          let { arg: e12, exp: t12 } = a11;
          e12 && !aS(e12) && (o11 = true), l11.push(ai(e12 || al("default", true), n12(t12, void 0, r11, i12)));
        }
        let c11 = false, u3 = false, d3 = [], p3 = /* @__PURE__ */ new Set(), f3 = 0;
        for (let e12 = 0; e12 < r11.length; e12++) {
          let i13, h3, m3, g2;
          let y2 = r11[e12];
          if (!a$(y2) || !(i13 = aO(y2, "slot", true))) {
            3 !== y2.type && d3.push(y2);
            continue;
          }
          if (a11) {
            t11.onError(/* @__PURE__ */ a_(37, i13.loc));
            break;
          }
          c11 = true;
          let { children: b2, loc: _2 } = y2, { arg: S2 = al("default", true), exp: x2, loc: C2 } = i13;
          aS(S2) ? h3 = S2 ? S2.content : "default" : o11 = true;
          let T2 = aO(y2, "for"), k2 = n12(x2, T2, b2, _2);
          if (m3 = aO(y2, "if")) o11 = true, s11.push(ac(m3.exp, cF(S2, k2, f3++), cD));
          else if (g2 = aO(y2, /^else(-if)?$/, true)) {
            let n13, i14 = e12;
            for (; i14-- && 3 === (n13 = r11[i14]).type; ) ;
            if (n13 && a$(n13) && aO(n13, /^(else-)?if$/)) {
              let e13 = s11[s11.length - 1];
              for (; 19 === e13.alternate.type; ) e13 = e13.alternate;
              e13.alternate = g2.exp ? ac(g2.exp, cF(S2, k2, f3++), cD) : cF(S2, k2, f3++);
            } else t11.onError(/* @__PURE__ */ a_(30, g2.loc));
          } else if (T2) {
            o11 = true;
            let e13 = T2.forParseResult;
            e13 ? (cP(e13), s11.push(ao(t11.helper(oj), [e13.source, aa(cM(e13), cF(S2, k2), true)]))) : t11.onError(a_(32, T2.loc));
          } else {
            if (h3) {
              if (p3.has(h3)) {
                t11.onError(a_(38, C2));
                continue;
              }
              p3.add(h3), "default" === h3 && (u3 = true);
            }
            l11.push(ai(S2, k2));
          }
        }
        if (!a11) {
          let e12 = (e13, t12) => ai("default", n12(e13, void 0, t12, i12));
          c11 ? d3.length && d3.some((e13) => function e14(t12) {
            return 2 !== t12.type && 12 !== t12.type || (2 === t12.type ? !!t12.content.trim() : e14(t12.content));
          }(e13)) && (u3 ? t11.onError(a_(39, d3[0].loc)) : l11.push(e12(void 0, d3))) : l11.push(e12(void 0, r11));
        }
        let h2 = o11 ? 2 : !function e12(t12) {
          for (let n13 = 0; n13 < t12.length; n13++) {
            let r12 = t12[n13];
            switch (r12.type) {
              case 1:
                if (2 === r12.tagType || e12(r12.children)) return true;
                break;
              case 9:
                if (e12(r12.branches)) return true;
                break;
              case 10:
              case 11:
                if (e12(r12.children)) return true;
            }
          }
          return false;
        }(e11.children) ? 1 : 3, m2 = ar(l11.concat(ai("_", al(h2 + "", false))), i12);
        return s11.length && (m2 = ao(t11.helper(oq), [m2, an(s11)])), { slots: m2, hasDynamicSlots: o11 };
      }(e10, t10);
      r10 = n11, i11 && (p2 |= 1024);
    } else if (1 === e10.children.length && u2 !== ok) {
      let n11 = e10.children[0], i11 = n11.type, l11 = 5 === i11 || 8 === i11;
      l11 && 0 === cd(n11, t10) && (p2 |= 1), r10 = l11 || 2 === i11 ? n11 : e10.children;
    } else r10 = e10.children;
  }
  l10 && l10.length && (i10 = function(e11) {
    let t11 = "[";
    for (let n11 = 0, r11 = e11.length; n11 < r11; n11++) t11 += JSON.stringify(e11[n11]), n11 < r11 - 1 && (t11 += ", ");
    return t11 + "]";
  }(l10)), e10.codegenNode = at(t10, u2, n10, r10, 0 === p2 ? void 0 : p2, i10, s10, !!f2, false, c10, e10.loc);
};
function cU(e10, t10, n10 = e10.props, r10, i10, l10 = false) {
  let s10;
  let { tag: o10, loc: a10, children: c10 } = e10, u2 = [], d2 = [], p2 = [], f2 = c10.length > 0, h2 = false, m2 = 0, g2 = false, y2 = false, _2 = false, S2 = false, x2 = false, C2 = false, T2 = [], k2 = (e11) => {
    u2.length && (d2.push(ar(cj(u2), a10)), u2 = []), e11 && d2.push(e11);
  }, w2 = () => {
    t10.scopes.vFor > 0 && u2.push(ai(al("ref_for", true), al("true")));
  }, N2 = ({ key: e11, value: n11 }) => {
    if (aS(e11)) {
      let l11 = e11.content, s11 = b(l11);
      s11 && (!r10 || i10) && "onclick" !== l11.toLowerCase() && "onUpdate:modelValue" !== l11 && !B(l11) && (S2 = true), s11 && B(l11) && (C2 = true), s11 && 14 === n11.type && (n11 = n11.arguments[0]), 20 === n11.type || (4 === n11.type || 8 === n11.type) && cd(n11, t10) > 0 || ("ref" === l11 ? g2 = true : "class" === l11 ? y2 = true : "style" === l11 ? _2 = true : "key" === l11 || T2.includes(l11) || T2.push(l11), r10 && ("class" === l11 || "style" === l11) && !T2.includes(l11) && T2.push(l11));
    } else x2 = true;
  };
  for (let i11 = 0; i11 < n10.length; i11++) {
    let s11 = n10[i11];
    if (6 === s11.type) {
      let { loc: e11, name: t11, nameLoc: n11, value: r11 } = s11;
      if ("ref" === t11 && (g2 = true, w2()), "is" === t11 && (cH(o10) || r11 && r11.content.startsWith("vue:"))) continue;
      u2.push(ai(al(t11, true, n11), al(r11 ? r11.content : "", true, r11 ? r11.loc : e11)));
    } else {
      let { name: n11, arg: i12, exp: c11, loc: g3, modifiers: y3 } = s11, b2 = "bind" === n11, _3 = "on" === n11;
      if ("slot" === n11) {
        r10 || t10.onError(/* @__PURE__ */ a_(40, g3));
        continue;
      }
      if ("once" === n11 || "memo" === n11 || "is" === n11 || b2 && aM(i12, "is") && cH(o10) || _3 && l10) continue;
      if ((b2 && aM(i12, "key") || _3 && f2 && aM(i12, "vue:before-update")) && (h2 = true), b2 && aM(i12, "ref") && w2(), !i12 && (b2 || _3)) {
        x2 = true, c11 ? b2 ? (w2(), k2(), d2.push(c11)) : k2({ type: 14, loc: g3, callee: t10.helper(oX), arguments: r10 ? [c11] : [c11, "true"] }) : t10.onError(a_(b2 ? 34 : 35, g3));
        continue;
      }
      b2 && y3.some((e11) => "prop" === e11.content) && (m2 |= 32);
      let S3 = t10.directiveTransforms[n11];
      if (S3) {
        let { props: n12, needRuntime: r11 } = S3(s11, e10, t10);
        l10 || n12.forEach(N2), _3 && i12 && !aS(i12) ? k2(ar(n12, a10)) : u2.push(...n12), r11 && (p2.push(s11), O(r11) && cV.set(s11, r11));
      } else !U(n11) && (p2.push(s11), f2 && (h2 = true));
    }
  }
  if (d2.length ? (k2(), s10 = d2.length > 1 ? ao(t10.helper(oK), d2, a10) : d2[0]) : u2.length && (s10 = ar(cj(u2), a10)), x2 ? m2 |= 16 : (y2 && !r10 && (m2 |= 2), _2 && !r10 && (m2 |= 4), T2.length && (m2 |= 8), S2 && (m2 |= 32)), !h2 && (0 === m2 || 32 === m2) && (g2 || C2 || p2.length > 0) && (m2 |= 512), !t10.inSSR && s10) switch (s10.type) {
    case 15:
      let E2 = -1, A2 = -1, R2 = false;
      for (let e11 = 0; e11 < s10.properties.length; e11++) {
        let t11 = s10.properties[e11].key;
        aS(t11) ? "class" === t11.content ? E2 = e11 : "style" === t11.content && (A2 = e11) : t11.isHandlerKey || (R2 = true);
      }
      let I2 = s10.properties[E2], P2 = s10.properties[A2];
      R2 ? s10 = ao(t10.helper(oG), [s10]) : (I2 && !aS(I2.value) && (I2.value = ao(t10.helper(oz), [I2.value])), P2 && (_2 || 4 === P2.value.type && "[" === P2.value.content.trim()[0] || 17 === P2.value.type) && (P2.value = ao(t10.helper(oJ), [P2.value])));
      break;
    case 14:
      break;
    default:
      s10 = ao(t10.helper(oG), [ao(t10.helper(oQ), [s10])]);
  }
  return { props: s10, directives: p2, patchFlag: m2, dynamicPropNames: T2, shouldUseBlock: h2 };
}
function cj(e10) {
  let t10 = /* @__PURE__ */ new Map(), n10 = [];
  for (let r10 = 0; r10 < e10.length; r10++) {
    let i10 = e10[r10];
    if (8 === i10.key.type || !i10.key.isStatic) {
      n10.push(i10);
      continue;
    }
    let l10 = i10.key.content, s10 = t10.get(l10);
    s10 ? ("style" === l10 || "class" === l10 || b(l10)) && (17 === s10.value.type ? s10.value.elements.push(i10.value) : s10.value = an([s10.value, i10.value], s10.loc)) : (t10.set(l10, i10), n10.push(i10));
  }
  return n10;
}
function cH(e10) {
  return "component" === e10 || "Component" === e10;
}
var cq = (e10, t10) => {
  if (aF(e10)) {
    let { children: n10, loc: r10 } = e10, { slotName: i10, slotProps: l10 } = function(e11, t11) {
      let n11, r11 = '"default"', i11 = [];
      for (let t12 = 0; t12 < e11.props.length; t12++) {
        let n12 = e11.props[t12];
        if (6 === n12.type) n12.value && ("name" === n12.name ? r11 = JSON.stringify(n12.value.content) : (n12.name = q(n12.name), i11.push(n12)));
        else if ("bind" === n12.name && aM(n12.arg, "name")) {
          if (n12.exp) r11 = n12.exp;
          else if (n12.arg && 4 === n12.arg.type) {
            let e12 = q(n12.arg.content);
            r11 = n12.exp = al(e12, false, n12.arg.loc);
          }
        } else "bind" === n12.name && n12.arg && aS(n12.arg) && (n12.arg.content = q(n12.arg.content)), i11.push(n12);
      }
      if (i11.length > 0) {
        let { props: r12, directives: l11 } = cU(e11, t11, i11, false, false);
        n11 = r12, l11.length && t11.onError(a_(36, l11[0].loc));
      }
      return { slotName: r11, slotProps: n11 };
    }(e10, t10), s10 = [t10.prefixIdentifiers ? "_ctx.$slots" : "$slots", i10, "{}", "undefined", "true"], o10 = 2;
    l10 && (s10[2] = l10, o10 = 3), n10.length && (s10[3] = aa([], n10, false, false, r10), o10 = 4), t10.scopeId && !t10.slotted && (o10 = 5), s10.splice(o10), e10.codegenNode = ao(t10.helper(oH), s10, r10);
  }
};
var cW = (e10, t10, n10, r10) => {
  let i10;
  let { loc: l10, modifiers: s10, arg: o10 } = e10;
  if (e10.exp || s10.length, 4 === o10.type) {
    if (o10.isStatic) {
      let e11 = o10.content;
      e11.startsWith("vue:") && (e11 = `vnode-${e11.slice(4)}`), i10 = al(0 !== t10.tagType || e11.startsWith("vnode") || !/[A-Z]/.test(e11) ? J(q(e11)) : `on:${e11}`, true, o10.loc);
    } else i10 = as([`${n10.helperString(o0)}(`, o10, ")"]);
  } else (i10 = o10).children.unshift(`${n10.helperString(o0)}(`), i10.children.push(")");
  let a10 = e10.exp;
  a10 && !a10.content.trim() && (a10 = void 0);
  let c10 = n10.cacheHandlers && !a10 && !n10.inVOnce;
  if (a10) {
    let e11 = aA(a10), t11 = !(e11 || aI(a10)), n11 = a10.content.includes(";");
    (t11 || c10 && e11) && (a10 = as([`${t11 ? "$event" : "(...args)"} => ${n11 ? "{" : "("}`, a10, n11 ? "}" : ")"]));
  }
  let u2 = { props: [ai(i10, a10 || al("() => {}", false, l10))] };
  return r10 && (u2 = r10(u2)), c10 && (u2.props[0].value = n10.cache(u2.props[0].value)), u2.props.forEach((e11) => e11.key.isHandlerKey = true), u2;
};
var cK = (e10, t10) => {
  if (0 === e10.type || 1 === e10.type || 11 === e10.type || 10 === e10.type) return () => {
    let n10;
    let r10 = e10.children, i10 = false;
    for (let e11 = 0; e11 < r10.length; e11++) {
      let t11 = r10[e11];
      if (aD(t11)) {
        i10 = true;
        for (let i11 = e11 + 1; i11 < r10.length; i11++) {
          let l10 = r10[i11];
          if (aD(l10)) n10 || (n10 = r10[e11] = as([t11], t11.loc)), n10.children.push(" + ", l10), r10.splice(i11, 1), i11--;
          else {
            n10 = void 0;
            break;
          }
        }
      }
    }
    if (i10 && (1 !== r10.length || 0 !== e10.type && (1 !== e10.type || 0 !== e10.tagType || e10.props.find((e11) => 7 === e11.type && !t10.directiveTransforms[e11.name])))) for (let e11 = 0; e11 < r10.length; e11++) {
      let n11 = r10[e11];
      if (aD(n11) || 8 === n11.type) {
        let i11 = [];
        (2 !== n11.type || " " !== n11.content) && i11.push(n11), t10.ssr || 0 !== cd(n11, t10) || i11.push("1"), r10[e11] = { type: 12, content: n11, loc: n11.loc, codegenNode: ao(t10.helper(oD), i11) };
      }
    }
  };
};
var cz = /* @__PURE__ */ new WeakSet();
var cJ = (e10, t10) => {
  if (1 === e10.type && aO(e10, "once", true) && !cz.has(e10) && !t10.inVOnce && !t10.inSSR) return cz.add(e10), t10.inVOnce = true, t10.helper(o1), () => {
    t10.inVOnce = false;
    let e11 = t10.currentNode;
    e11.codegenNode && (e11.codegenNode = t10.cache(e11.codegenNode, true));
  };
};
var cG = (e10, t10, n10) => {
  let r10;
  let { exp: i10, arg: l10 } = e10;
  if (!i10) return n10.onError(/* @__PURE__ */ a_(41, e10.loc)), cQ();
  let s10 = i10.loc.source.trim(), o10 = 4 === i10.type ? i10.content : s10, a10 = n10.bindingMetadata[s10];
  if ("props" === a10 || "props-aliased" === a10) return i10.loc, cQ();
  if (!o10.trim() || !aA(i10)) return n10.onError(/* @__PURE__ */ a_(42, i10.loc)), cQ();
  let c10 = l10 || al("modelValue", true), u2 = l10 ? aS(l10) ? `onUpdate:${q(l10.content)}` : as(['"onUpdate:" + ', l10]) : "onUpdate:modelValue", d2 = n10.isTS ? "($event: any)" : "$event";
  r10 = as([`${d2} => ((`, i10, ") = $event)"]);
  let p2 = [ai(c10, e10.exp), ai(u2, r10)];
  if (e10.modifiers.length && 1 === t10.tagType) {
    let t11 = e10.modifiers.map((e11) => e11.content).map((e11) => (aT(e11) ? e11 : JSON.stringify(e11)) + ": true").join(", "), n11 = l10 ? aS(l10) ? `${l10.content}Modifiers` : as([l10, ' + "Modifiers"']) : "modelModifiers";
    p2.push(ai(n11, al(`{ ${t11} }`, false, e10.loc, 2)));
  }
  return cQ(p2);
};
function cQ(e10 = []) {
  return { props: e10 };
}
var cX = /* @__PURE__ */ new WeakSet();
var cZ = (e10, t10) => {
  if (1 === e10.type) {
    let n10 = aO(e10, "memo");
    if (!(!n10 || cX.has(e10))) return cX.add(e10), () => {
      let r10 = e10.codegenNode || t10.currentNode.codegenNode;
      r10 && 13 === r10.type && (1 !== e10.tagType && au(r10, t10), e10.codegenNode = ao(t10.helper(o5), [n10.exp, aa(void 0, r10), "_cache", String(t10.cached.length)]), t10.cached.push(null));
    };
  }
};
var cY = Symbol("");
var c0 = Symbol("");
var c1 = Symbol("");
var c2 = Symbol("");
var c6 = Symbol("");
var c3 = Symbol("");
var c4 = Symbol("");
var c8 = Symbol("");
var c5 = Symbol("");
var c9 = Symbol("");
!function(e10) {
  Object.getOwnPropertySymbols(e10).forEach((t10) => {
    o7[t10] = e10[t10];
  });
}({ [cY]: "vModelRadio", [c0]: "vModelCheckbox", [c1]: "vModelText", [c2]: "vModelSelect", [c6]: "vModelDynamic", [c3]: "withModifiers", [c4]: "withKeys", [c8]: "vShow", [c5]: "Transition", [c9]: "TransitionGroup" });
var c7 = { parseMode: "html", isVoidTag: ep, isNativeTag: (e10) => ec(e10) || eu(e10) || ed(e10), isPreTag: (e10) => "pre" === e10, isIgnoreNewlineTag: (e10) => "pre" === e10 || "textarea" === e10, decodeEntities: function(e10, t10 = false) {
  return (u || (u = document.createElement("div")), t10) ? (u.innerHTML = `<div foo="${e10.replace(/"/g, "&quot;")}">`, u.children[0].getAttribute("foo")) : (u.innerHTML = e10, u.textContent);
}, isBuiltInComponent: (e10) => "Transition" === e10 || "transition" === e10 ? c5 : "TransitionGroup" === e10 || "transition-group" === e10 ? c9 : void 0, getNamespace(e10, t10, n10) {
  let r10 = t10 ? t10.ns : n10;
  if (t10 && 2 === r10) {
    if ("annotation-xml" === t10.tag) {
      if ("svg" === e10) return 1;
      t10.props.some((e11) => 6 === e11.type && "encoding" === e11.name && null != e11.value && ("text/html" === e11.value.content || "application/xhtml+xml" === e11.value.content)) && (r10 = 0);
    } else /^m(?:[ions]|text)$/.test(t10.tag) && "mglyph" !== e10 && "malignmark" !== e10 && (r10 = 0);
  } else t10 && 1 === r10 && ("foreignObject" === t10.tag || "desc" === t10.tag || "title" === t10.tag) && (r10 = 0);
  if (0 === r10) {
    if ("svg" === e10) return 1;
    if ("math" === e10) return 2;
  }
  return r10;
} };
var ue = (e10, t10) => al(JSON.stringify(es(e10)), false, t10, 3);
var ut = /* @__PURE__ */ f("passive,once,capture");
var un = /* @__PURE__ */ f("stop,prevent,self,ctrl,shift,alt,meta,exact,middle");
var ur = /* @__PURE__ */ f("left,right");
var ui = /* @__PURE__ */ f("onkeyup,onkeydown,onkeypress");
var ul = (e10, t10, n10, r10) => {
  let i10 = [], l10 = [], s10 = [];
  for (let n11 = 0; n11 < t10.length; n11++) {
    let r11 = t10[n11].content;
    ut(r11) ? s10.push(r11) : ur(r11) ? aS(e10) ? ui(e10.content.toLowerCase()) ? i10.push(r11) : l10.push(r11) : (i10.push(r11), l10.push(r11)) : un(r11) ? l10.push(r11) : i10.push(r11);
  }
  return { keyModifiers: i10, nonKeyModifiers: l10, eventOptionModifiers: s10 };
};
var us = (e10, t10) => aS(e10) && "onclick" === e10.content.toLowerCase() ? al(t10, true) : 4 !== e10.type ? as(["(", e10, `) === "onClick" ? "${t10}" : (`, e10, ")"]) : e10;
var uo = (e10, t10) => {
  1 === e10.type && 0 === e10.tagType && ("script" === e10.tag || "style" === e10.tag) && t10.removeNode();
};
var ua = [(e10) => {
  1 === e10.type && e10.props.forEach((t10, n10) => {
    6 === t10.type && "style" === t10.name && t10.value && (e10.props[n10] = { type: 7, name: "bind", arg: al("style", true, t10.loc), exp: ue(t10.value.content, t10.loc), modifiers: [], loc: t10.loc });
  });
}];
var uc = { cloak: () => ({ props: [] }), html: (e10, t10, n10) => {
  let { exp: r10, loc: i10 } = e10;
  return r10 || n10.onError(a_(53, i10)), t10.children.length && (n10.onError(a_(54, i10)), t10.children.length = 0), { props: [ai(al("innerHTML", true, i10), r10 || al("", true))] };
}, text: (e10, t10, n10) => {
  let { exp: r10, loc: i10 } = e10;
  return r10 || n10.onError(a_(55, i10)), t10.children.length && (n10.onError(a_(56, i10)), t10.children.length = 0), { props: [ai(al("textContent", true), r10 ? cd(r10, n10) > 0 ? r10 : ao(n10.helperString(oW), [r10], i10) : al("", true))] };
}, model: (e10, t10, n10) => {
  let r10 = cG(e10, t10, n10);
  if (!r10.props.length || 1 === t10.tagType) return r10;
  e10.arg && n10.onError(a_(58, e10.arg.loc));
  let { tag: i10 } = t10, l10 = n10.isCustomElement(i10);
  if ("input" === i10 || "textarea" === i10 || "select" === i10 || l10) {
    let s10 = c1, o10 = false;
    if ("input" === i10 || l10) {
      let r11 = aP(t10, "type");
      if (r11) {
        if (7 === r11.type) s10 = c6;
        else if (r11.value) switch (r11.value.content) {
          case "radio":
            s10 = cY;
            break;
          case "checkbox":
            s10 = c0;
            break;
          case "file":
            o10 = true, n10.onError(a_(59, e10.loc));
        }
      } else t10.props.some((e11) => 7 === e11.type && "bind" === e11.name && (!e11.arg || 4 !== e11.arg.type || !e11.arg.isStatic)) && (s10 = c6);
    } else "select" === i10 && (s10 = c2);
    o10 || (r10.needRuntime = n10.helper(s10));
  } else n10.onError(a_(57, e10.loc));
  return r10.props = r10.props.filter((e11) => !(4 === e11.key.type && "modelValue" === e11.key.content)), r10;
}, on: (e10, t10, n10) => cW(e10, t10, n10, (t11) => {
  let { modifiers: r10 } = e10;
  if (!r10.length) return t11;
  let { key: i10, value: l10 } = t11.props[0], { keyModifiers: s10, nonKeyModifiers: o10, eventOptionModifiers: a10 } = ul(i10, r10, n10, e10.loc);
  if (o10.includes("right") && (i10 = us(i10, "onContextmenu")), o10.includes("middle") && (i10 = us(i10, "onMouseup")), o10.length && (l10 = ao(n10.helper(c3), [l10, JSON.stringify(o10)])), s10.length && (!aS(i10) || ui(i10.content.toLowerCase())) && (l10 = ao(n10.helper(c4), [l10, JSON.stringify(s10)])), a10.length) {
    let e11 = a10.map(z).join("");
    i10 = aS(i10) ? al(`${i10.content}${e11}`, true) : as(["(", i10, `) + "${e11}"`]);
  }
  return { props: [ai(i10, l10)] };
}), show: (e10, t10, n10) => {
  let { exp: r10, loc: i10 } = e10;
  return !r10 && n10.onError(a_(61, i10)), { props: [], needRuntime: n10.helper(c8) };
} };
var uu = /* @__PURE__ */ Object.create(null);
function ud(e10, t10) {
  if (!I(e10)) {
    if (!e10.nodeType) return g;
    e10 = e10.innerHTML;
  }
  let n10 = e10 + JSON.stringify(t10, (e11, t11) => "function" == typeof t11 ? t11.toString() : t11), r10 = uu[n10];
  if (r10) return r10;
  if ("#" === e10[0]) {
    let t11 = document.querySelector(e10);
    e10 = t11 ? t11.innerHTML : "";
  }
  let i10 = S({ hoistStatic: true, onError: void 0, onWarn: g }, t10);
  i10.isCustomElement || "undefined" == typeof customElements || (i10.isCustomElement = (e11) => !!customElements.get(e11));
  let { code: l10 } = function(e11, t11 = {}) {
    return function(e12, t12 = {}) {
      let n11 = t12.onError || av, r11 = "module" === t12.mode;
      true === t12.prefixIdentifiers ? n11(/* @__PURE__ */ a_(47)) : r11 && n11(/* @__PURE__ */ a_(48)), t12.cacheHandlers && n11(/* @__PURE__ */ a_(49)), t12.scopeId && !r11 && n11(/* @__PURE__ */ a_(50));
      let i11 = S({}, t12, { prefixIdentifiers: false }), l11 = I(e12) ? function(e13, t13) {
        if (a6.reset(), aJ = null, aG = null, aQ = "", aX = -1, aZ = -1, a2.length = 0, az = e13, aW = S({}, aq), t13) {
          let e14;
          for (e14 in t13) null != t13[e14] && (aW[e14] = t13[e14]);
        }
        a6.mode = "html" === aW.parseMode ? 1 : "sfc" === aW.parseMode ? 2 : 0, a6.inXML = 1 === aW.ns || 2 === aW.ns;
        let n12 = t13 && t13.delimiters;
        n12 && (a6.delimiterOpen = ag(n12[0]), a6.delimiterClose = ag(n12[1]));
        let r12 = aK = /* @__PURE__ */ function(e14, t14 = "") {
          return { type: 0, source: t14, children: e14, helpers: /* @__PURE__ */ new Set(), components: [], directives: [], hoists: [], imports: [], cached: [], temps: 0, codegenNode: void 0, loc: ae };
        }([], e13);
        return a6.parse(az), r12.loc = cs(0, e13.length), r12.children = cr(r12.children), aK = null, r12;
      }(e12, i11) : e12, [s11, o10] = [[cJ, ck, cZ, cO, cq, cB, cL, cK], { on: cW, bind: cA, model: cG }];
      return !function(e13, t13) {
        let n12 = function(e14, { filename: t14 = "", prefixIdentifiers: n13 = false, hoistStatic: r12 = false, hmr: i12 = false, cacheHandlers: l12 = false, nodeTransforms: s12 = [], directiveTransforms: o11 = {}, transformHoist: a10 = null, isBuiltInComponent: c10 = g, isCustomElement: u2 = g, expressionPlugins: d2 = [], scopeId: p2 = null, slotted: f2 = true, ssr: m2 = false, inSSR: y2 = false, ssrCssVars: b2 = "", bindingMetadata: _2 = h, inline: S2 = false, isTS: x2 = false, onError: C2 = av, onWarn: T2 = ab, compatConfig: k2 }) {
          let w2 = t14.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), N2 = { filename: t14, selfName: w2 && z(q(w2[1])), prefixIdentifiers: n13, hoistStatic: r12, hmr: i12, cacheHandlers: l12, nodeTransforms: s12, directiveTransforms: o11, transformHoist: a10, isBuiltInComponent: c10, isCustomElement: u2, expressionPlugins: d2, scopeId: p2, slotted: f2, ssr: m2, inSSR: y2, ssrCssVars: b2, bindingMetadata: _2, inline: S2, isTS: x2, onError: C2, onWarn: T2, compatConfig: k2, root: e14, helpers: /* @__PURE__ */ new Map(), components: /* @__PURE__ */ new Set(), directives: /* @__PURE__ */ new Set(), hoists: [], imports: [], cached: [], constantCache: /* @__PURE__ */ new WeakMap(), temps: 0, identifiers: /* @__PURE__ */ Object.create(null), scopes: { vFor: 0, vSlot: 0, vPre: 0, vOnce: 0 }, parent: null, grandParent: null, currentNode: e14, childIndex: 0, inVOnce: false, helper(e15) {
            let t15 = N2.helpers.get(e15) || 0;
            return N2.helpers.set(e15, t15 + 1), e15;
          }, removeHelper(e15) {
            let t15 = N2.helpers.get(e15);
            if (t15) {
              let n14 = t15 - 1;
              n14 ? N2.helpers.set(e15, n14) : N2.helpers.delete(e15);
            }
          }, helperString: (e15) => `_${o7[N2.helper(e15)]}`, replaceNode(e15) {
            N2.parent.children[N2.childIndex] = N2.currentNode = e15;
          }, removeNode(e15) {
            let t15 = N2.parent.children, n14 = e15 ? t15.indexOf(e15) : N2.currentNode ? N2.childIndex : -1;
            e15 && e15 !== N2.currentNode ? N2.childIndex > n14 && (N2.childIndex--, N2.onNodeRemoved()) : (N2.currentNode = null, N2.onNodeRemoved()), N2.parent.children.splice(n14, 1);
          }, onNodeRemoved: g, addIdentifiers(e15) {
          }, removeIdentifiers(e15) {
          }, hoist(e15) {
            I(e15) && (e15 = al(e15)), N2.hoists.push(e15);
            let t15 = al(`_hoisted_${N2.hoists.length}`, false, e15.loc, 2);
            return t15.hoisted = e15, t15;
          }, cache(e15, t15 = false) {
            let n14 = /* @__PURE__ */ function(e16, t16, n15 = false) {
              return { type: 20, index: e16, value: t16, needPauseTracking: n15, needArraySpread: false, loc: ae };
            }(N2.cached.length, e15, t15);
            return N2.cached.push(n14), n14;
          } };
          return N2;
        }(e13, t13);
        cm(e13, n12), t13.hoistStatic && function e14(t14, n13, r12, i12 = false, l12 = false) {
          let { children: s12 } = t14, o11 = [];
          for (let n14 = 0; n14 < s12.length; n14++) {
            let a11 = s12[n14];
            if (1 === a11.type && 0 === a11.tagType) {
              let e15 = i12 ? 0 : cd(a11, r12);
              if (e15 > 0) {
                if (e15 >= 2) {
                  a11.codegenNode.patchFlag = -1, o11.push(a11);
                  continue;
                }
              } else {
                let e16 = a11.codegenNode;
                if (13 === e16.type) {
                  let t15 = e16.patchFlag;
                  if ((void 0 === t15 || 512 === t15 || 1 === t15) && cf(a11, r12) >= 2) {
                    let t16 = ch(a11);
                    t16 && (e16.props = r12.hoist(t16));
                  }
                  e16.dynamicProps && (e16.dynamicProps = r12.hoist(e16.dynamicProps));
                }
              }
            } else if (12 === a11.type && (i12 ? 0 : cd(a11, r12)) >= 2) {
              o11.push(a11);
              continue;
            }
            if (1 === a11.type) {
              let n15 = 1 === a11.tagType;
              n15 && r12.scopes.vSlot++, e14(a11, t14, r12, false, l12), n15 && r12.scopes.vSlot--;
            } else if (11 === a11.type) e14(a11, t14, r12, 1 === a11.children.length, true);
            else if (9 === a11.type) for (let n15 = 0; n15 < a11.branches.length; n15++) e14(a11.branches[n15], t14, r12, 1 === a11.branches[n15].children.length, l12);
          }
          let a10 = false;
          if (o11.length === s12.length && 1 === t14.type) {
            if (0 === t14.tagType && t14.codegenNode && 13 === t14.codegenNode.type && k(t14.codegenNode.children)) t14.codegenNode.children = c10(an(t14.codegenNode.children)), a10 = true;
            else if (1 === t14.tagType && t14.codegenNode && 13 === t14.codegenNode.type && t14.codegenNode.children && !k(t14.codegenNode.children) && 15 === t14.codegenNode.children.type) {
              let e15 = u2(t14.codegenNode, "default");
              e15 && (e15.returns = c10(an(e15.returns)), a10 = true);
            } else if (3 === t14.tagType && n13 && 1 === n13.type && 1 === n13.tagType && n13.codegenNode && 13 === n13.codegenNode.type && n13.codegenNode.children && !k(n13.codegenNode.children) && 15 === n13.codegenNode.children.type) {
              let e15 = aO(t14, "slot", true), r13 = e15 && e15.arg && u2(n13.codegenNode, e15.arg);
              r13 && (r13.returns = c10(an(r13.returns)), a10 = true);
            }
          }
          if (!a10) for (let e15 of o11) e15.codegenNode = r12.cache(e15.codegenNode);
          function c10(e15) {
            let t15 = r12.cache(e15);
            return l12 && r12.hmr && (t15.needArraySpread = true), t15;
          }
          function u2(e15, t15) {
            if (e15.children && !k(e15.children) && 15 === e15.children.type) {
              let n14 = e15.children.properties.find((e16) => e16.key === t15 || e16.key.content === t15);
              return n14 && n14.value;
            }
          }
          o11.length && r12.transformHoist && r12.transformHoist(s12, r12, t14);
        }(e13, void 0, n12, cu(e13, e13.children[0])), t13.ssr || function(e14, t14) {
          let { helper: n13 } = t14, { children: r12 } = e14;
          if (1 === r12.length) {
            let n14 = r12[0];
            if (cu(e14, n14) && n14.codegenNode) {
              let r13 = n14.codegenNode;
              13 === r13.type && au(r13, t14), e14.codegenNode = r13;
            } else e14.codegenNode = n14;
          } else r12.length > 1 && (e14.codegenNode = at(t14, n13(oT), void 0, e14.children, 64, void 0, void 0, true, void 0, false));
        }(e13, n12), e13.helpers = /* @__PURE__ */ new Set([...n12.helpers.keys()]), e13.components = [...n12.components], e13.directives = [...n12.directives], e13.imports = n12.imports, e13.hoists = n12.hoists, e13.temps = n12.temps, e13.cached = n12.cached, e13.transformed = true;
      }(l11, S({}, i11, { nodeTransforms: [...s11, ...t12.nodeTransforms || []], directiveTransforms: S({}, o10, t12.directiveTransforms || {}) })), function(e13, t13 = {}) {
        let n12 = function(e14, { mode: t14 = "function", prefixIdentifiers: n13 = "module" === t14, sourceMap: r13 = false, filename: i13 = "template.vue.html", scopeId: l13 = null, optimizeImports: s13 = false, runtimeGlobalName: o12 = "Vue", runtimeModuleName: a11 = "vue", ssrRuntimeModuleName: c11 = "vue/server-renderer", ssr: u3 = false, isTS: d3 = false, inSSR: p3 = false }) {
          let f3 = { mode: t14, prefixIdentifiers: n13, sourceMap: r13, filename: i13, scopeId: l13, optimizeImports: s13, runtimeGlobalName: o12, runtimeModuleName: a11, ssrRuntimeModuleName: c11, ssr: u3, isTS: d3, inSSR: p3, source: e14.source, code: "", column: 1, line: 1, offset: 0, indentLevel: 0, pure: false, map: void 0, helper: (e15) => `_${o7[e15]}`, push(e15, t15 = -2, n14) {
            f3.code += e15;
          }, indent() {
            h3(++f3.indentLevel);
          }, deindent(e15 = false) {
            e15 ? --f3.indentLevel : h3(--f3.indentLevel);
          }, newline() {
            h3(f3.indentLevel);
          } };
          function h3(e15) {
            f3.push("\n" + "  ".repeat(e15), 0);
          }
          return f3;
        }(e13, t13);
        t13.onContextCreated && t13.onContextCreated(n12);
        let { mode: r12, push: i12, prefixIdentifiers: l12, indent: s12, deindent: o11, newline: a10, scopeId: c10, ssr: u2 } = n12, d2 = Array.from(e13.helpers), p2 = d2.length > 0, f2 = !l12 && "module" !== r12;
        (function(e14, t14) {
          let { ssr: n13, prefixIdentifiers: r13, push: i13, newline: l13, runtimeModuleName: s13, runtimeGlobalName: o12, ssrRuntimeModuleName: a11 } = t14, c11 = Array.from(e14.helpers);
          if (c11.length > 0 && (i13(`const _Vue = ${o12}
`, -1), e14.hoists.length)) {
            let e15 = [oO, oP, oM, oD, oL].filter((e16) => c11.includes(e16)).map(cv).join(", ");
            i13(`const { ${e15} } = _Vue
`, -1);
          }
          (function(e15, t15) {
            if (!e15.length) return;
            t15.pure = true;
            let { push: n14, newline: r14 } = t15;
            r14();
            for (let i14 = 0; i14 < e15.length; i14++) {
              let l14 = e15[i14];
              l14 && (n14(`const _hoisted_${i14 + 1} = `), cx(l14, t15), r14());
            }
            t15.pure = false;
          })(e14.hoists, t14), l13(), i13("return ");
        })(e13, n12);
        let h2 = (u2 ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ");
        if (i12(`function ${u2 ? "ssrRender" : "render"}(${h2}) {`), s12(), f2 && (i12("with (_ctx) {"), s12(), p2 && (i12(`const { ${d2.map(cv).join(", ")} } = _Vue
`, -1), a10())), e13.components.length && (cb(e13.components, "component", n12), (e13.directives.length || e13.temps > 0) && a10()), e13.directives.length && (cb(e13.directives, "directive", n12), e13.temps > 0 && a10()), e13.temps > 0) {
          i12("let ");
          for (let t14 = 0; t14 < e13.temps; t14++) i12(`${t14 > 0 ? ", " : ""}_temp${t14}`);
        }
        return (e13.components.length || e13.directives.length || e13.temps) && (i12(`
`, 0), a10()), u2 || i12("return "), e13.codegenNode ? cx(e13.codegenNode, n12) : i12("null"), f2 && (o11(), i12("}")), o11(), i12("}"), { ast: e13, code: n12.code, preamble: "", map: n12.map ? n12.map.toJSON() : void 0 };
      }(l11, i11);
    }(e11, S({}, c7, t11, { nodeTransforms: [uo, ...ua, ...t11.nodeTransforms || []], directiveTransforms: S({}, uc, t11.directiveTransforms || {}), transformHoist: null }));
  }(e10, i10), s10 = Function("Vue", l10)(oC);
  return s10._rc = true, uu[n10] = s10;
}
l$(ud);

// node_modules/@jrc03c/vue-component-with-css/dist/vue-component-with-css.import.mjs
function createVueComponentWithCSS(component) {
  let count = 0;
  let styleElement;
  component = component || {};
  const data = component.data ? component.data : function() {
  };
  const mounted = component.mounted ? component.mounted : function() {
  };
  const unmounted = component.unmounted ? component.unmounted : function() {
  };
  if (!data.css) data.css = "";
  component.data = function() {
    return data.bind(this)();
  };
  component.mounted = function() {
    mounted.bind(this)();
    count++;
    let root = this.$root.$el.getRootNode();
    if (root === document) {
      root = root.body;
    }
    if (!styleElement) {
      styleElement = document.createElement("style");
      root.appendChild(styleElement);
      styleElement.innerHTML = this.css;
    }
  };
  component.unmounted = function() {
    unmounted.bind(this)();
    count--;
    let root = this.$root.$el.getRootNode();
    if (root === document) {
      root = root.body;
    }
    if (count < 1) {
      if (styleElement) {
        try {
          root.removeChild(styleElement);
        } catch (e10) {
          try {
            styleElement.parentElement.removeChild(styleElement);
          } catch (e22) {
          }
        }
      }
      styleElement = null;
    }
  };
  return component;
}
if (typeof window !== "undefined") {
  window.createVueComponentWithCSS = createVueComponentWithCSS;
}

// test/res/js/src/actions/show-alert.mjs
var import_dompurify = __toESM(require_purify(), 1);
var css = (
  /* css */
  ``
);
var template = (
  /* html */
  `
  <div :class="'alert-level-' + level + ' gt-tester-modal'">
    <div class="gt-tester-modal-backdrop"></div>

    <div class="gt-tester-modal-body-container">
      <div class="gt-tester-modal-body">
        <div class="gt-tester-modal-message">
          {{ cleanedMessage }}
        </div>
        
        <button :class="'btn btn-' + level" @click="dismiss">
          Okay
        </button>
      </div>
    </div>
  </div>
`
);
function showAlert(message, level) {
  const cleanedMessage = (0, import_dompurify.sanitize)(message);
  level = level || "info";
  console.log("showing alert:", message, level);
  return new Promise((resolve, reject) => {
    try {
      const container2 = document.createElement("div");
      container2.id = "app";
      document.body.appendChild(container2);
      const app = om(
        createVueComponentWithCSS({
          template,
          data() {
            return {
              cleanedMessage,
              css,
              level
            };
          },
          methods: {
            dismiss() {
              app.unmount();
              document.body.removeChild(container2);
              return resolve();
            }
          }
        })
      );
      app.mount(container2);
    } catch (e10) {
      reject(e10);
    }
  });
}

// test/res/js/src/actions/submit-responses.mjs
async function submitResponses() {
  console.log("submitting responses...");
  let defaultButtons = Array.from(
    document.getElementsByClassName("btn-default")
  );
  let primaryButtons = Array.from(
    document.getElementsByClassName("btn-primary")
  );
  if (defaultButtons.length === 0 && primaryButtons.length === 0) {
    console.warn("No 'submit' buttons were found!");
    return;
  }
  const button = defaultButtons.length > 0 ? defaultButtons[defaultButtons.length - 1] : primaryButtons[primaryButtons.length - 1];
  $(window).trigger("before-submit-responses");
  $(button).click();
}

// test/res/js/src/main.mjs
var GUIDEDTRACK_PAGE_END_EVENT = "guidedtrack:pageEnd";
var container = document.getElementById("REPLACE-ME");
var search = window.location.search;
var params = new URLSearchParams(search);
var id2 = params.get("id");
var mode = params.get("mode") || "preview";
if (!id2) {
  window.location.href = window.location.protocol + "//" + window.location.host;
} else {
  container.id = id2;
  localStorage.setItem("last-id", id2);
}
if (mode === "preview") {
  container.setAttribute("data-mode", "test");
  document.getElementById("mode").innerHTML = "\u{1F6A7}&nbsp; PREVIEW MODE &nbsp;\u{1F6A7}";
  localStorage.setItem("last-mode", "preview");
} else {
  document.getElementById("mode").innerHTML = "\u{1F3C1}&nbsp; RUN MODE &nbsp;\u{1F3C1}";
  localStorage.setItem("last-mode", "run");
}
async function run(_2, data) {
  canRun = false;
  console.log("events:", data.events);
  const events = data.events;
  const timeBetweenEvents = 100;
  for (let i10 = 0; i10 < events.length; i10++) {
    const event = events[i10];
    if (event.type === "enter-text") {
      await enterText(event.value);
    } else if (event.type === "click") {
      await click(event.value, event.class);
    } else if (event.type === "select-slider-value") {
      await selectSliderValue(event.value, event.selector);
    } else if (event.type === "pause") {
      const ms = parseInt(event.value);
      console.log("pausing for milliseconds:", ms);
      await pauseAsync(ms);
    } else if (event.type === "alert") {
      await showAlert(event.value, event.level);
    } else if (event.type === "submit-responses") {
      await submitResponses();
    }
    await pauseAsync(timeBetweenEvents);
  }
}
var canRun = false;
var interval = setInterval(() => {
  if (!$) {
    console.log("waiting for jquery to load...");
    return;
  }
  clearInterval(interval);
  console.log("jquery finished loading!");
  $(window).on(GUIDEDTRACK_PAGE_END_EVENT, () => {
    canRun = true;
  });
  $(window).on("gt-test", async (event, data) => {
    while (!canRun) {
      await pauseAsync(10);
    }
    run(event, data);
  });
}, 1);
/*! Bundled license information:

dompurify/dist/purify.js:
  (*! @license DOMPurify 3.1.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.7/LICENSE *)

vue/dist/vue.esm-browser.prod.js:
  (**
  * vue v3.5.12
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
  (*! #__NO_SIDE_EFFECTS__ *)
*/
