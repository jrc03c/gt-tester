(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
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
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.DOMPurify = factory());
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
          freeze = function freeze2(x) {
            return x;
          };
        }
        if (!seal) {
          seal = function seal2(x) {
            return x;
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
          let l = array.length;
          while (l--) {
            let element = array[l];
            if (typeof element === "string") {
              const lcElement = transformCaseFunc(element);
              if (lcElement !== element) {
                if (!isFrozen(array)) {
                  array[l] = lcElement;
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
          } catch (_) {
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
            Element,
            NodeFilter,
            NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
            HTMLFormElement,
            DOMParser,
            trustedTypes
          } = window2;
          const ElementPrototype = Element.prototype;
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
            } catch (_) {
              remove(node);
            }
          };
          const _removeAttribute = function _removeAttribute2(name, node) {
            try {
              arrayPush(DOMPurify.removed, {
                attribute: node.getAttributeNode(name),
                from: node
              });
            } catch (_) {
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
                } catch (_) {
                }
              } else {
                try {
                  node.setAttribute(name, "");
                } catch (_) {
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
              } catch (_) {
              }
            }
            if (!doc || !doc.documentElement) {
              doc = implementation.createDocument(NAMESPACE, "template", null);
              try {
                doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
              } catch (_) {
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
                  for (let i = childCount - 1; i >= 0; --i) {
                    const childClone = cloneNode(childNodes[i], true);
                    childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
                    parentNode.insertBefore(childClone, getNextSibling(currentNode));
                  }
                }
              }
              _forceRemove(currentNode);
              return true;
            }
            if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
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
            let l = attributes.length;
            while (l--) {
              const attr = attributes[l];
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
              } catch (_) {
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
    for (let i = 0; i < container2.children.length; i++) {
      const child = container2.children[i];
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
      const el = getElementContainingText(value);
      if (el) options.push(el);
    }
    if (options.length === 0) {
      console.warn(errorMessage);
      return;
    }
    if (value) {
      options = options.filter((el) => el.textContent.includes(value));
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
    for (let i = 0; i < container2.children.length; i++) {
      const child = container2.children[i];
      const results = getTextInputElements(child);
      results.forEach((el) => out.push(el));
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
      } catch (e) {
        return reject(e);
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
  function remap(x, a, b, c, d) {
    return c + (d - c) * (x - a) / (b - a);
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
    } catch (e) {
    }
    try {
      max = JSON.parse(max);
    } catch (e) {
    }
    const sliderRect = slider.getBoundingClientRect();
    const x = remap(
      value,
      min,
      max,
      sliderRect.x,
      sliderRect.x + sliderRect.width
    );
    const y = sliderRect.y + sliderRect.height / 2;
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
          new MouseEvent("mousedown", { clientX: x, clientY: y })
        );
      } catch (e) {
      }
      $(window).off("before-submit-responses", callback);
    };
    $(window).on("before-submit-responses", callback);
  }

  // test/res/js/src/actions/show-alert.mjs
  var import_dompurify = __toESM(require_purify(), 1);
  var css = (
    /* css */
    `
  .modal,
  .modal *,
  .modal button {
    --border-radius: 0.5em;
    --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

    --color-danger-dark: hsl(1.7deg, 63.6%, 15%);
    --color-danger-light: hsl(1.7deg, 63.6%, 90%);
    --color-danger-medium: hsl(1.7deg, 63.6%, 60%);
    --color-danger: hsl(1.7deg, 63.6%, 40%);

    --color-info-dark: hsl(207.7deg, 72.1%, 15%);
    --color-info-light: hsl(207.7deg, 72.1%, 90%);
    --color-info-medium: hsl(207.7deg, 72.1%, 60%);
    --color-info: hsl(207.7deg, 72.1%, 40%);

    --color-success-dark: hsl(120deg, 50%, 15%);
    --color-success-light: hsl(120deg, 50%, 90%);
    --color-success-medium: hsl(120deg, 50%, 60%);
    --color-success: hsl(120deg, 50%, 40%);

    --color-warning-dark: hsl(35.2deg, 67.5%, 15%);
    --color-warning-light: hsl(35.2deg, 67.5%, 90%);
    --color-warning-medium: hsl(35.2deg, 67.5%, 60%);
    --color-warning: hsl(35.2deg, 67.5%, 40%);

    --padding: 1.5em;
    font-family: system-ui, sans-serif;
    font-weight: normal;
  }

  .modal,
  .modal-backdrop,
  .modal-body {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    min-width: 100vw;
    max-width: 100vw;
    height: 100vh;
    min-height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    z-index: 999997;
  }

  .modal-backdrop {
    background-color: rgb(0, 0, 0, 0.5);
    z-index: 999998;
  }

  .modal-body {
    padding: var(--padding);
    box-sizing: border-box;
    z-index: 999999;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    pointer-events: none;
  }

  .modal-content {
    padding: var(--padding);
    border-radius: var(--border-radius);
    min-width: 384px;
    max-width: 768px;
    max-height: calc(100vh - calc(2 * var(--padding)));
    overflow-y: auto;
    background-color: white;
    box-shadow: var(--box-shadow);
    pointer-events: all;
  }

  .modal.alert-level-info .modal-content {
    background-color: var(--color-info-light);
    color: var(--color-info-dark);
  }

  .modal.alert-level-success .modal-content {
    background-color: var(--color-success-light);
    color: var(--color-success-dark);
  }

  .modal.alert-level-warning .modal-content {
    background-color: var(--color-warning-light);
    color: var(--color-warning-dark);
  }

  .modal.alert-level-danger .modal-content {
    background-color: var(--color-danger-light);
    color: var(--color-danger-dark);
  }

  .modal-message {
    margin-bottom: var(--padding);
  }

  .modal-buttons {
    text-align: right;
  }

  button {
    font-size: 1em;
    font-weight: bold !important;
    padding: calc(var(--padding) / 2);
    background-color: rgb(235, 235, 235);
    border: 0;
    border-radius: var(--border-radius);
    cursor: pointer;
    width: 100%;
  }

  button:hover {
    filter: brightness(102.5%);
  }

  button:active {
    filter: brightness(90%);
  }

  button.btn-info {
    background-color: var(--color-info-medium);
    color: var(--color-info-dark);
  }

  button.btn-success {
    background-color: var(--color-success-medium);
    color: var(--color-success-dark);
  }

  button.btn-warning {
    background-color: var(--color-warning-medium);
    color: var(--color-warning-dark);
  }

  button.btn-danger {
    background-color: var(--color-danger-medium);
    color: var(--color-danger-dark);
  }

  @media (max-width: 768px) {
    .modal-body {
      width: 100vw;
      min-width: 100vw;
      max-width: 100vw;
    }

    .modal-content {
      width: calc(100vw - calc(2 * var(--padding)));
      min-width: calc(100vw - calc(2 * var(--padding)));
      max-width: calc(100vw - calc(2 * var(--padding)));
      box-sizing: border-box;
    }
  }
`
  );
  var template = (
    /* html */
    `
  <div class="modal">
    <div class="modal-backdrop"></div>

    <div class="modal-body">
      <div class="modal-content">
        <div class="modal-message">
          {{ cleanedMessage }}
        </div>
        
        <div class="modal-buttons">
          <button class="btn">
            Okay
          </button>
        </div>
      </div>
    </div>
  </div>
`
  );
  var AlertComponent = class extends HTMLElement {
    _eventListeners = [];
    constructor(message, level) {
      super();
      document.body.appendChild(this);
      this.level = level || "info";
      const cleanedMessage = (0, import_dompurify.sanitize)(message);
      this.message = cleanedMessage;
      console.log("showing alert:", cleanedMessage, level);
      const temp = document.createElement("template");
      temp.innerHTML = `
      <style>${css}</style>
      ${template}
    `;
      const deep = true;
      const clone = document.importNode(temp.content, deep);
      const shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(clone);
      const root = shadow.querySelector(".modal");
      root.classList.add("alert-level-" + this.level);
      const messageContainer = root.querySelector(".modal-message");
      messageContainer.innerHTML = cleanedMessage;
      const button = root.querySelector(".btn");
      button.classList.add("btn-" + this.level);
      const buttonCallback = () => this.parentElement.removeChild(this);
      button.addEventListener("click", buttonCallback);
      this._eventListeners.push({
        target: button,
        event: "click",
        callback: buttonCallback
      });
      const backdrop = root.querySelector(".modal-backdrop");
      const backdropCallback = () => this.parentElement.removeChild(this);
      backdrop.addEventListener("click", backdropCallback);
      this._eventListeners.push({
        target: backdrop,
        event: "click",
        callback: backdropCallback
      });
      const escapeKeyCallback = (event) => {
        if (event.key === "Escape") {
          this.parentElement.removeChild(this);
        }
      };
      window.addEventListener("keydown", escapeKeyCallback);
      this._eventListeners.push({
        target: window,
        event: "keydown",
        callback: escapeKeyCallback
      });
    }
    disconnectedCallback() {
      this._eventListeners.forEach((listener) => {
        try {
          listener.target.removeEventListener(listener.event, listener.callback);
        } catch (e) {
        }
      });
    }
  };
  async function showAlert(message, level) {
    new AlertComponent(message, level);
  }
  customElements.define("x-alert", AlertComponent);

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
  var id = params.get("id");
  var mode = params.get("mode") || "preview";
  if (!id) {
    window.location.href = window.location.protocol + "//" + window.location.host;
  } else {
    container.id = id;
    localStorage.setItem("last-id", id);
  }
  if (mode === "preview") {
    container.setAttribute("data-mode", "test");
    document.getElementById("mode").innerHTML = "\u{1F6A7}&nbsp; PREVIEW MODE &nbsp;\u{1F6A7}";
    localStorage.setItem("last-mode", "preview");
  } else {
    document.getElementById("mode").innerHTML = "\u{1F3C1}&nbsp; RUN MODE &nbsp;\u{1F3C1}";
    localStorage.setItem("last-mode", "run");
  }
  async function run(_, data) {
    canRun = false;
    const events = data.events;
    const timeBetweenEvents = 100;
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
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
      } else if (event.type === "show-alert") {
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
})();
/*! Bundled license information:

dompurify/dist/purify.js:
  (*! @license DOMPurify 3.1.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.7/LICENSE *)
*/
