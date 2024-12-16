(() => {
      const ws = new WebSocket("ws://localhost:3001");
      ws.onmessage = () => {
        location.reload();
      };
    })();
"use strict";
(() => {
  // packages/widget-utils/dist/esm/index.js
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  function getTileSize(settings) {
    const style = sdk.getStyleConfig();
    const { inline_tile_size } = style;
    const tileSizes = {
      small: settings?.small ?? "173px",
      medium: settings?.medium ?? "265.5px",
      large: settings?.large ?? "400px"
    };
    if (!inline_tile_size) {
      return tileSizes["medium"];
    }
    return tileSizes[inline_tile_size];
  }
  function getTileSizeByWidget(tileSizeSettings) {
    const sizeWithUnit = getTileSize(tileSizeSettings);
    const sizeUnitless = sizeWithUnit.replace("px", "");
    return { "--tile-size": sizeWithUnit, "--tile-size-unitless": sizeUnitless };
  }
  function trimHashValuesFromObject(obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = typeof value === "string" && value.startsWith("#") ? value.replace("#", "") : value;
      return acc;
    }, {});
  }
  function getCSSVariables(features) {
    const { tileSizeSettings, cssVariables } = features || {};
    const styles = sdk.getStyleConfig();
    const inlineTileSettings = sdk.getInlineTileConfig();
    const {
      widget_background,
      tile_background,
      text_tile_background,
      text_tile_link_color,
      text_tile_user_handle_font_color,
      shopspot_btn_background,
      shopspot_btn_font_color,
      margin,
      text_tile_font_size,
      text_tile_user_name_font_size,
      text_tile_user_handle_font_size,
      shopspot_icon,
      expanded_tile_border_radius,
      inline_tile_border_radius,
      inline_tile_margin,
      shopspot_btn_font_size,
      text_tile_font_color,
      text_tile_user_name_font_color
    } = trimHashValuesFromObject(styles);
    const { show_tags: show_tags_expanded } = sdk.getExpandedTileConfig();
    const { show_caption, show_tags: show_tags_inline, show_shopspots, show_timestamp, show_sharing } = inlineTileSettings;
    const mutatedCssVariables = {
      ...cssVariables,
      "--widget-background": `#${widget_background}`,
      "--inline-tile-background": `#${tile_background}`,
      "--text-tile-background": `#${text_tile_background}`,
      "--shopspot-btn-background": `#${shopspot_btn_background}`,
      "--cta-button-background-color": `#${shopspot_btn_background}`,
      "--tile-tag-background": `#bcbbbc`,
      "--text-tile-link-color": `#${text_tile_link_color}`,
      "--text-tile-user-handle-font-color": `#${text_tile_user_handle_font_color}`,
      "--shopspot-btn-font-color": `#${shopspot_btn_font_color}`,
      "--margin": `${margin ? margin : 0}px`,
      "--text-tile-font-size": `${text_tile_font_size}px`,
      "--text-caption-paragraph-font-size": `${text_tile_font_size || 12}px`,
      "--text-tile-user-name-font-size": `${text_tile_user_name_font_size}px`,
      "--text-tile-user-name-font-color": `#${text_tile_user_name_font_color}`,
      "--text-tile-user-handle-font-size": `${text_tile_user_handle_font_size || 12}px`,
      "--text-tile-font-color": `#${text_tile_font_color}`,
      "--show-caption": `${show_caption ? "block" : "none"}`,
      "--show-caption-webkit": `${show_caption ? "-webkit-box" : "none"}`,
      "--shopspot-icon": shopspot_icon ? shopspot_icon : `#000`,
      "--tags-gap": `4px`,
      // TODO - Replace these with cta_button_font_color and cta_button_font_size @Peng Zhou
      "--cta-button-font-color": `#${shopspot_btn_font_color}`,
      "--cta-button-font-size": `${shopspot_btn_font_size}px`,
      "--expanded-tile-border-radius": `${expanded_tile_border_radius}px`,
      ...getTileSizeByWidget(tileSizeSettings),
      "--inline-tile-border-radius": `${inline_tile_border_radius}px`,
      "--inline-tile-margin": `${inline_tile_margin}px`,
      "--tags-display-inline": `${show_tags_inline ? "flex" : "none"}`,
      "--tags-display-expanded": `${show_tags_expanded ? "flex" : "none"}`,
      "--shopspots-display": `${show_shopspots ? "block" : "none"}`,
      "--timephrase-display": `${show_timestamp ? "block" : "none"}`,
      "--share-icon-display": `${show_sharing ? "inline-block" : "none"}`
    };
    return Object.entries(mutatedCssVariables).map(([key, value]) => `${key}: ${value};`).join("\n");
  }
  var init_css_variables = __esm({
    "src/libs/css-variables.ts"() {
      "use strict";
    }
  });
  function createElement(type, props, ...children) {
    if (typeof type === "function") {
      return children?.length ? type({ ...props, children }) : type(props);
    }
    const element = document.createElement(type);
    applyProperties(element, props ?? {});
    children?.forEach((child) => appendChild(element, child));
    return element;
  }
  function createFragment(arg) {
    const { children, ...props } = arg ?? { children: [] };
    const fragment = document.createDocumentFragment();
    Object.assign(fragment, props);
    children?.forEach((child) => appendChild(fragment, child));
    return fragment;
  }
  function isEventListener(key, value) {
    return key.startsWith("on") && typeof value === "function";
  }
  function applyProperties(element, props) {
    Object.entries(props).forEach(([key, value]) => {
      if (isEventListener(key, value)) {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === "style") {
        Object.assign(element.style, value);
      } else {
        const normKey = aliases[key] ?? key;
        element.setAttribute(normKey, String(value));
      }
    });
  }
  function appendChild(element, child) {
    if (Array.isArray(child)) {
      child.forEach((c) => appendChild(element, c));
    } else if (child instanceof DocumentFragment) {
      Array.from(child.children).forEach((c) => element.appendChild(c));
    } else if (child instanceof HTMLElement) {
      element.appendChild(child);
    } else if (child !== void 0 && child !== null && child !== false) {
      element.appendChild(document.createTextNode(String(child)));
    }
  }
  var aliases;
  var init_jsx_html = __esm({
    "src/libs/jsx-html.ts"() {
      "use strict";
      aliases = {
        className: "class",
        htmlFor: "for"
      };
    }
  });
  function handleTileClick(e, widgetUrl) {
    const ugcTiles = sdk.tiles.tiles;
    const clickedElement = e.target;
    const clickedTile = clickedElement.closest(".ugc-tile");
    if (!clickedTile) {
      throw new Error("Failed to find clicked tile");
    }
    const tileId = clickedTile.getAttribute("data-id");
    if (!tileId) {
      throw new Error("Failed to find tile ID");
    }
    const tileData = ugcTiles[tileId];
    const tileLink = widgetUrl || tileData.original_url || tileData.original_link;
    if (tileLink) {
      window.open(tileLink, "_blank");
    }
  }
  var init_tile_lib = __esm({
    "src/libs/tile.lib.ts"() {
      "use strict";
    }
  });
  function loadExpandSettingComponents() {
    const { show_shopspots, show_products, show_add_to_cart } = sdk.getExpandedTileConfig();
    if (show_shopspots) {
      sdk.addLoadedComponents(["shopspots"]);
    }
    sdk.addLoadedComponents(["expanded-tile"]);
    if (show_products) {
      sdk.addLoadedComponents(["products"]);
    }
    if (show_add_to_cart) {
      sdk.addLoadedComponents(["add-to-cart"]);
    }
  }
  var init_widget_components = __esm({
    "src/libs/widget.components.ts"() {
      "use strict";
    }
  });
  function addCSSVariablesToPlacement(cssVariables) {
    const shadowRoot = sdk.placement.getShadowRoot();
    const style = document.createElement("style");
    style.innerHTML = `
      :host {
          ${cssVariables}
      }`;
    shadowRoot.appendChild(style);
  }
  function isEnabled() {
    const { enabled } = sdk.getWidgetOptions();
    return enabled && hasMinimumTilesRequired();
  }
  function hasMinimumTilesRequired() {
    const { minimal_tiles } = sdk.getStyleConfig();
    const minimalTiles = parseInt(minimal_tiles);
    if (minimalTiles && minimalTiles > 0) {
      const tiles = sdk.querySelectorAll(".ugc-tile");
      if (tiles && tiles.length >= minimalTiles) {
        return true;
      }
      throw new Error(`Not enough tiles to render widget. Expected ${minimalTiles} but found ${tiles.length}`);
    }
    return true;
  }
  var init_widget_layout = __esm({
    "src/libs/widget.layout.ts"() {
      "use strict";
    }
  });
  function isObject(obj) {
    return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
  }
  function extend(target, src) {
    if (target === void 0) {
      target = {};
    }
    if (src === void 0) {
      src = {};
    }
    Object.keys(src).forEach((key) => {
      if (typeof target[key] === "undefined")
        target[key] = src[key];
      else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
        extend(target[key], src[key]);
      }
    });
  }
  function getDocument() {
    const doc = typeof document !== "undefined" ? document : {};
    extend(doc, ssrDocument);
    return doc;
  }
  function getWindow() {
    const win = typeof window !== "undefined" ? window : {};
    extend(win, ssrWindow);
    return win;
  }
  var ssrDocument;
  var ssrWindow;
  var init_ssr_window_esm = __esm({
    "../../node_modules/swiper/shared/ssr-window.esm.mjs"() {
      ssrDocument = {
        body: {},
        addEventListener() {
        },
        removeEventListener() {
        },
        activeElement: {
          blur() {
          },
          nodeName: ""
        },
        querySelector() {
          return null;
        },
        querySelectorAll() {
          return [];
        },
        getElementById() {
          return null;
        },
        createEvent() {
          return {
            initEvent() {
            }
          };
        },
        createElement() {
          return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {
            },
            getElementsByTagName() {
              return [];
            }
          };
        },
        createElementNS() {
          return {};
        },
        importNode() {
          return null;
        },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: ""
        }
      };
      ssrWindow = {
        document: ssrDocument,
        navigator: {
          userAgent: ""
        },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: ""
        },
        history: {
          replaceState() {
          },
          pushState() {
          },
          go() {
          },
          back() {
          }
        },
        CustomEvent: function CustomEvent() {
          return this;
        },
        addEventListener() {
        },
        removeEventListener() {
        },
        getComputedStyle() {
          return {
            getPropertyValue() {
              return "";
            }
          };
        },
        Image() {
        },
        Date() {
        },
        screen: {},
        setTimeout() {
        },
        clearTimeout() {
        },
        matchMedia() {
          return {};
        },
        requestAnimationFrame(callback) {
          if (typeof setTimeout === "undefined") {
            callback();
            return null;
          }
          return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
          if (typeof setTimeout === "undefined") {
            return;
          }
          clearTimeout(id);
        }
      };
    }
  });
  function classesToTokens(classes2) {
    if (classes2 === void 0) {
      classes2 = "";
    }
    return classes2.trim().split(" ").filter((c) => !!c.trim());
  }
  function deleteProps(obj) {
    const object = obj;
    Object.keys(object).forEach((key) => {
      try {
        object[key] = null;
      } catch (e) {
      }
      try {
        delete object[key];
      } catch (e) {
      }
    });
  }
  function nextTick(callback, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return setTimeout(callback, delay);
  }
  function now() {
    return Date.now();
  }
  function getComputedStyle2(el) {
    const window2 = getWindow();
    let style;
    if (window2.getComputedStyle) {
      style = window2.getComputedStyle(el, null);
    }
    if (!style && el.currentStyle) {
      style = el.currentStyle;
    }
    if (!style) {
      style = el.style;
    }
    return style;
  }
  function getTranslate(el, axis) {
    if (axis === void 0) {
      axis = "x";
    }
    const window2 = getWindow();
    let matrix;
    let curTransform;
    let transformMatrix;
    const curStyle = getComputedStyle2(el);
    if (window2.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(",").length > 6) {
        curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
      }
      transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
      matrix = transformMatrix.toString().split(",");
    }
    if (axis === "x") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m41;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[12]);
      else
        curTransform = parseFloat(matrix[4]);
    }
    if (axis === "y") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m42;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[13]);
      else
        curTransform = parseFloat(matrix[5]);
    }
    return curTransform || 0;
  }
  function isObject2(o) {
    return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
  }
  function isNode(node) {
    if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
      return node instanceof HTMLElement;
    }
    return node && (node.nodeType === 1 || node.nodeType === 11);
  }
  function extend2() {
    const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
    const noExtend = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
        const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable) {
            if (isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else if (!isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              to[nextKey] = {};
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  }
  function setCSSProperty(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }
  function animateCSSModeScroll(_ref) {
    let {
      swiper,
      targetPosition,
      side
    } = _ref;
    const window2 = getWindow();
    const startPosition = -swiper.translate;
    let startTime = null;
    let time;
    const duration = swiper.params.speed;
    swiper.wrapperEl.style.scrollSnapType = "none";
    window2.cancelAnimationFrame(swiper.cssModeFrameID);
    const dir = targetPosition > startPosition ? "next" : "prev";
    const isOutOfBound = (current, target) => {
      return dir === "next" && current >= target || dir === "prev" && current <= target;
    };
    const animate = () => {
      time = (/* @__PURE__ */ new Date()).getTime();
      if (startTime === null) {
        startTime = time;
      }
      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
      if (isOutOfBound(currentPosition, targetPosition)) {
        currentPosition = targetPosition;
      }
      swiper.wrapperEl.scrollTo({
        [side]: currentPosition
      });
      if (isOutOfBound(currentPosition, targetPosition)) {
        swiper.wrapperEl.style.overflow = "hidden";
        swiper.wrapperEl.style.scrollSnapType = "";
        setTimeout(() => {
          swiper.wrapperEl.style.overflow = "";
          swiper.wrapperEl.scrollTo({
            [side]: currentPosition
          });
        });
        window2.cancelAnimationFrame(swiper.cssModeFrameID);
        return;
      }
      swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
    };
    animate();
  }
  function elementChildren(element, selector) {
    if (selector === void 0) {
      selector = "";
    }
    const children = [...element.children];
    if (element instanceof HTMLSlotElement) {
      children.push(...element.assignedElements());
    }
    if (!selector) {
      return children;
    }
    return children.filter((el) => el.matches(selector));
  }
  function elementIsChildOf(el, parent) {
    const isChild = parent.contains(el);
    if (!isChild && parent instanceof HTMLSlotElement) {
      const children = [...parent.assignedElements()];
      return children.includes(el);
    }
    return isChild;
  }
  function showWarning(text) {
    try {
      console.warn(text);
      return;
    } catch (err) {
    }
  }
  function createElement2(tag, classes2) {
    if (classes2 === void 0) {
      classes2 = [];
    }
    const el = document.createElement(tag);
    el.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2));
    return el;
  }
  function elementOffset(el) {
    const window2 = getWindow();
    const document2 = getDocument();
    const box = el.getBoundingClientRect();
    const body = document2.body;
    const clientTop = el.clientTop || body.clientTop || 0;
    const clientLeft = el.clientLeft || body.clientLeft || 0;
    const scrollTop = el === window2 ? window2.scrollY : el.scrollTop;
    const scrollLeft = el === window2 ? window2.scrollX : el.scrollLeft;
    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  }
  function elementPrevAll(el, selector) {
    const prevEls = [];
    while (el.previousElementSibling) {
      const prev = el.previousElementSibling;
      if (selector) {
        if (prev.matches(selector))
          prevEls.push(prev);
      } else
        prevEls.push(prev);
      el = prev;
    }
    return prevEls;
  }
  function elementNextAll(el, selector) {
    const nextEls = [];
    while (el.nextElementSibling) {
      const next = el.nextElementSibling;
      if (selector) {
        if (next.matches(selector))
          nextEls.push(next);
      } else
        nextEls.push(next);
      el = next;
    }
    return nextEls;
  }
  function elementStyle(el, prop) {
    const window2 = getWindow();
    return window2.getComputedStyle(el, null).getPropertyValue(prop);
  }
  function elementIndex(el) {
    let child = el;
    let i;
    if (child) {
      i = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1)
          i += 1;
      }
      return i;
    }
    return void 0;
  }
  function elementParents(el, selector) {
    const parents = [];
    let parent = el.parentElement;
    while (parent) {
      if (selector) {
        if (parent.matches(selector))
          parents.push(parent);
      } else {
        parents.push(parent);
      }
      parent = parent.parentElement;
    }
    return parents;
  }
  function elementOuterSize(el, size, includeMargins) {
    const window2 = getWindow();
    if (includeMargins) {
      return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
    }
    return el.offsetWidth;
  }
  function makeElementsArray(el) {
    return (Array.isArray(el) ? el : [el]).filter((e) => !!e);
  }
  var init_utils = __esm({
    "../../node_modules/swiper/shared/utils.mjs"() {
      init_ssr_window_esm();
    }
  });
  function calcSupport() {
    const window2 = getWindow();
    const document2 = getDocument();
    return {
      smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
      touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
    };
  }
  function getSupport() {
    if (!support) {
      support = calcSupport();
    }
    return support;
  }
  function calcDevice(_temp) {
    let {
      userAgent
    } = _temp === void 0 ? {} : _temp;
    const support2 = getSupport();
    const window2 = getWindow();
    const platform = window2.navigator.platform;
    const ua = userAgent || window2.navigator.userAgent;
    const device = {
      ios: false,
      android: false
    };
    const screenWidth2 = window2.screen.width;
    const screenHeight = window2.screen.height;
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    const windows = platform === "Win32";
    let macos = platform === "MacIntel";
    const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth2}x${screenHeight}`) >= 0) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad)
        ipad = [0, 1, "13_0_0"];
      macos = false;
    }
    if (android && !windows) {
      device.os = "android";
      device.android = true;
    }
    if (ipad || iphone || ipod) {
      device.os = "ios";
      device.ios = true;
    }
    return device;
  }
  function getDevice(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }
    if (!deviceCached) {
      deviceCached = calcDevice(overrides);
    }
    return deviceCached;
  }
  function calcBrowser() {
    const window2 = getWindow();
    const device = getDevice();
    let needPerspectiveFix = false;
    function isSafari() {
      const ua = window2.navigator.userAgent.toLowerCase();
      return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
    }
    if (isSafari()) {
      const ua = String(window2.navigator.userAgent);
      if (ua.includes("Version/")) {
        const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
        needPerspectiveFix = major < 16 || major === 16 && minor < 2;
      }
    }
    const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent);
    const isSafariBrowser = isSafari();
    const need3dFix = isSafariBrowser || isWebView && device.ios;
    return {
      isSafari: needPerspectiveFix || isSafariBrowser,
      needPerspectiveFix,
      need3dFix,
      isWebView
    };
  }
  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }
    return browser;
  }
  function Resize(_ref) {
    let {
      swiper,
      on,
      emit
    } = _ref;
    const window2 = getWindow();
    let observer = null;
    let animationFrame = null;
    const resizeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      emit("beforeResize");
      emit("resize");
    };
    const createObserver = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      observer = new ResizeObserver((entries) => {
        animationFrame = window2.requestAnimationFrame(() => {
          const {
            width,
            height
          } = swiper;
          let newWidth = width;
          let newHeight = height;
          entries.forEach((_ref2) => {
            let {
              contentBoxSize,
              contentRect,
              target
            } = _ref2;
            if (target && target !== swiper.el)
              return;
            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
          });
          if (newWidth !== width || newHeight !== height) {
            resizeHandler();
          }
        });
      });
      observer.observe(swiper.el);
    };
    const removeObserver = () => {
      if (animationFrame) {
        window2.cancelAnimationFrame(animationFrame);
      }
      if (observer && observer.unobserve && swiper.el) {
        observer.unobserve(swiper.el);
        observer = null;
      }
    };
    const orientationChangeHandler = () => {
      if (!swiper || swiper.destroyed || !swiper.initialized)
        return;
      emit("orientationchange");
    };
    on("init", () => {
      if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
        createObserver();
        return;
      }
      window2.addEventListener("resize", resizeHandler);
      window2.addEventListener("orientationchange", orientationChangeHandler);
    });
    on("destroy", () => {
      removeObserver();
      window2.removeEventListener("resize", resizeHandler);
      window2.removeEventListener("orientationchange", orientationChangeHandler);
    });
  }
  function Observer(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const observers = [];
    const window2 = getWindow();
    const attach = function(target, options) {
      if (options === void 0) {
        options = {};
      }
      const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
      const observer = new ObserverFunc((mutations) => {
        if (swiper.__preventObserver__)
          return;
        if (mutations.length === 1) {
          emit("observerUpdate", mutations[0]);
          return;
        }
        const observerUpdate = function observerUpdate2() {
          emit("observerUpdate", mutations[0]);
        };
        if (window2.requestAnimationFrame) {
          window2.requestAnimationFrame(observerUpdate);
        } else {
          window2.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === "undefined" ? true : options.attributes,
        childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
        characterData: typeof options.characterData === "undefined" ? true : options.characterData
      });
      observers.push(observer);
    };
    const init = () => {
      if (!swiper.params.observer)
        return;
      if (swiper.params.observeParents) {
        const containerParents = elementParents(swiper.hostEl);
        for (let i = 0; i < containerParents.length; i += 1) {
          attach(containerParents[i]);
        }
      }
      attach(swiper.hostEl, {
        childList: swiper.params.observeSlideChildren
      });
      attach(swiper.wrapperEl, {
        attributes: false
      });
    };
    const destroy = () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
      observers.splice(0, observers.length);
    };
    extendParams({
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    });
    on("init", init);
    on("destroy", destroy);
  }
  function updateSize() {
    const swiper = this;
    let width;
    let height;
    const el = swiper.el;
    if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
      width = swiper.params.width;
    } else {
      width = el.clientWidth;
    }
    if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
      height = swiper.params.height;
    } else {
      height = el.clientHeight;
    }
    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    }
    width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
    height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
    if (Number.isNaN(width))
      width = 0;
    if (Number.isNaN(height))
      height = 0;
    Object.assign(swiper, {
      width,
      height,
      size: swiper.isHorizontal() ? width : height
    });
  }
  function updateSlides() {
    const swiper = this;
    function getDirectionPropertyValue(node, label) {
      return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
    }
    const params = swiper.params;
    const {
      wrapperEl,
      slidesEl,
      size: swiperSize,
      rtlTranslate: rtl,
      wrongRTL
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
    const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    let snapGrid = [];
    const slidesGrid = [];
    const slidesSizesGrid = [];
    let offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === "function") {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }
    let offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === "function") {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }
    const previousSnapGridLength = swiper.snapGrid.length;
    const previousSlidesGridLength = swiper.slidesGrid.length;
    let spaceBetween = params.spaceBetween;
    let slidePosition = -offsetBefore;
    let prevSlideSize = 0;
    let index = 0;
    if (typeof swiperSize === "undefined") {
      return;
    }
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    swiper.virtualSize = -spaceBetween;
    slides.forEach((slideEl) => {
      if (rtl) {
        slideEl.style.marginLeft = "";
      } else {
        slideEl.style.marginRight = "";
      }
      slideEl.style.marginBottom = "";
      slideEl.style.marginTop = "";
    });
    if (params.centeredSlides && params.cssMode) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
    }
    const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
    if (gridEnabled) {
      swiper.grid.initSlides(slides);
    } else if (swiper.grid) {
      swiper.grid.unsetSlides();
    }
    let slideSize;
    const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
      return typeof params.breakpoints[key].slidesPerView !== "undefined";
    }).length > 0;
    for (let i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      let slide2;
      if (slides[i])
        slide2 = slides[i];
      if (gridEnabled) {
        swiper.grid.updateSlide(i, slide2, slides);
      }
      if (slides[i] && elementStyle(slide2, "display") === "none")
        continue;
      if (params.slidesPerView === "auto") {
        if (shouldResetSlideSize) {
          slides[i].style[swiper.getDirectionLabel("width")] = ``;
        }
        const slideStyles = getComputedStyle(slide2);
        const currentTransform = slide2.style.transform;
        const currentWebKitTransform = slide2.style.webkitTransform;
        if (currentTransform) {
          slide2.style.transform = "none";
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = "none";
        }
        if (params.roundLengths) {
          slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
        } else {
          const width = getDirectionPropertyValue(slideStyles, "width");
          const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
          const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
          const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
          const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
          const boxSizing = slideStyles.getPropertyValue("box-sizing");
          if (boxSizing && boxSizing === "border-box") {
            slideSize = width + marginLeft + marginRight;
          } else {
            const {
              clientWidth,
              offsetWidth
            } = slide2;
            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
          }
        }
        if (currentTransform) {
          slide2.style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
        if (slides[i]) {
          slides[i].style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
        }
      }
      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);
      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1e3)
          slidePosition = 0;
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }
      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
      wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
    }
    if (params.setWrapperSize) {
      wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
    }
    if (gridEnabled) {
      swiper.grid.updateWrapperSize(slideSize, snapGrid);
    }
    if (!params.centeredSlides) {
      const newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (params.roundLengths)
          slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
    if (isVirtual && params.loop) {
      const size = slidesSizesGrid[0] + spaceBetween;
      if (params.slidesPerGroup > 1) {
        const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
        const groupSize = size * params.slidesPerGroup;
        for (let i = 0; i < groups; i += 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
        }
      }
      for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
        if (params.slidesPerGroup === 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + size);
        }
        slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
        swiper.virtualSize += size;
      }
    }
    if (snapGrid.length === 0)
      snapGrid = [0];
    if (spaceBetween !== 0) {
      const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
      slides.filter((_, slideIndex) => {
        if (!params.cssMode || params.loop)
          return true;
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      }).forEach((slideEl) => {
        slideEl.style[key] = `${spaceBetween}px`;
      });
    }
    if (params.centeredSlides && params.centeredSlidesBounds) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
      snapGrid = snapGrid.map((snap) => {
        if (snap <= 0)
          return -offsetBefore;
        if (snap > maxSnap)
          return maxSnap + offsetAfter;
        return snap;
      });
    }
    if (params.centerInsufficientSlides) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      const offsetSize = (params.slidesOffsetBefore || 0) + (params.slidesOffsetAfter || 0);
      if (allSlidesSize + offsetSize < swiperSize) {
        const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
        snapGrid.forEach((snap, snapIndex) => {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach((snap, snapIndex) => {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }
    Object.assign(swiper, {
      slides,
      snapGrid,
      slidesGrid,
      slidesSizesGrid
    });
    if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
      const addToSnapGrid = -swiper.snapGrid[0];
      const addToSlidesGrid = -swiper.slidesGrid[0];
      swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
      swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
    }
    if (slidesLength !== previousSlidesLength) {
      swiper.emit("slidesLengthChange");
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow)
        swiper.checkOverflow();
      swiper.emit("snapGridLengthChange");
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit("slidesGridLengthChange");
    }
    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }
    swiper.emit("slidesUpdated");
    if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
      const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
      const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
      if (slidesLength <= params.maxBackfaceHiddenSlides) {
        if (!hasClassBackfaceClassAdded)
          swiper.el.classList.add(backFaceHiddenClass);
      } else if (hasClassBackfaceClassAdded) {
        swiper.el.classList.remove(backFaceHiddenClass);
      }
    }
  }
  function updateAutoHeight(speed) {
    const swiper = this;
    const activeSlides = [];
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    let newHeight = 0;
    let i;
    if (typeof speed === "number") {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }
    const getSlideByIndex = (index) => {
      if (isVirtual) {
        return swiper.slides[swiper.getSlideIndexByData(index)];
      }
      return swiper.slides[index];
    };
    if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
      if (swiper.params.centeredSlides) {
        (swiper.visibleSlides || []).forEach((slide2) => {
          activeSlides.push(slide2);
        });
      } else {
        for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
          const index = swiper.activeIndex + i;
          if (index > swiper.slides.length && !isVirtual)
            break;
          activeSlides.push(getSlideByIndex(index));
        }
      }
    } else {
      activeSlides.push(getSlideByIndex(swiper.activeIndex));
    }
    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== "undefined") {
        const height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }
    if (newHeight || newHeight === 0)
      swiper.wrapperEl.style.height = `${newHeight}px`;
  }
  function updateSlidesOffset() {
    const swiper = this;
    const slides = swiper.slides;
    const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
    for (let i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
  }
  function updateSlidesProgress(translate2) {
    if (translate2 === void 0) {
      translate2 = this && this.translate || 0;
    }
    const swiper = this;
    const params = swiper.params;
    const {
      slides,
      rtlTranslate: rtl,
      snapGrid
    } = swiper;
    if (slides.length === 0)
      return;
    if (typeof slides[0].swiperSlideOffset === "undefined")
      swiper.updateSlidesOffset();
    let offsetCenter = -translate2;
    if (rtl)
      offsetCenter = translate2;
    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];
    let spaceBetween = params.spaceBetween;
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slide2 = slides[i];
      let slideOffset = slide2.swiperSlideOffset;
      if (params.cssMode && params.centeredSlides) {
        slideOffset -= slides[0].swiperSlideOffset;
      }
      const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const slideBefore = -(offsetCenter - slideOffset);
      const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
      const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
      if (isVisible) {
        swiper.visibleSlides.push(slide2);
        swiper.visibleSlidesIndexes.push(i);
      }
      toggleSlideClasses$1(slide2, isVisible, params.slideVisibleClass);
      toggleSlideClasses$1(slide2, isFullyVisible, params.slideFullyVisibleClass);
      slide2.progress = rtl ? -slideProgress : slideProgress;
      slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
    }
  }
  function updateProgress(translate2) {
    const swiper = this;
    if (typeof translate2 === "undefined") {
      const multiplier = swiper.rtlTranslate ? -1 : 1;
      translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
    }
    const params = swiper.params;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    let {
      progress,
      isBeginning,
      isEnd,
      progressLoop
    } = swiper;
    const wasBeginning = isBeginning;
    const wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate2 - swiper.minTranslate()) / translatesDiff;
      const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
      const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
      isBeginning = isBeginningRounded || progress <= 0;
      isEnd = isEndRounded || progress >= 1;
      if (isBeginningRounded)
        progress = 0;
      if (isEndRounded)
        progress = 1;
    }
    if (params.loop) {
      const firstSlideIndex = swiper.getSlideIndexByData(0);
      const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
      const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
      const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
      const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
      const translateAbs = Math.abs(translate2);
      if (translateAbs >= firstSlideTranslate) {
        progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
      } else {
        progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
      }
      if (progressLoop > 1)
        progressLoop -= 1;
    }
    Object.assign(swiper, {
      progress,
      progressLoop,
      isBeginning,
      isEnd
    });
    if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
      swiper.updateSlidesProgress(translate2);
    if (isBeginning && !wasBeginning) {
      swiper.emit("reachBeginning toEdge");
    }
    if (isEnd && !wasEnd) {
      swiper.emit("reachEnd toEdge");
    }
    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit("fromEdge");
    }
    swiper.emit("progress", progress);
  }
  function updateSlidesClasses() {
    const swiper = this;
    const {
      slides,
      params,
      slidesEl,
      activeIndex
    } = swiper;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    const getFilteredSlide = (selector) => {
      return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
    };
    let activeSlide;
    let prevSlide;
    let nextSlide;
    if (isVirtual) {
      if (params.loop) {
        let slideIndex = activeIndex - swiper.virtual.slidesBefore;
        if (slideIndex < 0)
          slideIndex = swiper.virtual.slides.length + slideIndex;
        if (slideIndex >= swiper.virtual.slides.length)
          slideIndex -= swiper.virtual.slides.length;
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
      } else {
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
      }
    } else {
      if (gridEnabled) {
        activeSlide = slides.filter((slideEl) => slideEl.column === activeIndex)[0];
        nextSlide = slides.filter((slideEl) => slideEl.column === activeIndex + 1)[0];
        prevSlide = slides.filter((slideEl) => slideEl.column === activeIndex - 1)[0];
      } else {
        activeSlide = slides[activeIndex];
      }
    }
    if (activeSlide) {
      if (!gridEnabled) {
        nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
        if (params.loop && !nextSlide) {
          nextSlide = slides[0];
        }
        prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
        if (params.loop && !prevSlide === 0) {
          prevSlide = slides[slides.length - 1];
        }
      }
    }
    slides.forEach((slideEl) => {
      toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
      toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
      toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
    });
    swiper.emitSlidesClasses();
  }
  function getActiveIndexByTranslate(swiper) {
    const {
      slidesGrid,
      params
    } = swiper;
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    let activeIndex;
    for (let i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate2 >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === "undefined")
        activeIndex = 0;
    }
    return activeIndex;
  }
  function updateActiveIndex(newActiveIndex) {
    const swiper = this;
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    const {
      snapGrid,
      params,
      activeIndex: previousIndex,
      realIndex: previousRealIndex,
      snapIndex: previousSnapIndex
    } = swiper;
    let activeIndex = newActiveIndex;
    let snapIndex;
    const getVirtualRealIndex = (aIndex) => {
      let realIndex2 = aIndex - swiper.virtual.slidesBefore;
      if (realIndex2 < 0) {
        realIndex2 = swiper.virtual.slides.length + realIndex2;
      }
      if (realIndex2 >= swiper.virtual.slides.length) {
        realIndex2 -= swiper.virtual.slides.length;
      }
      return realIndex2;
    };
    if (typeof activeIndex === "undefined") {
      activeIndex = getActiveIndexByTranslate(swiper);
    }
    if (snapGrid.indexOf(translate2) >= 0) {
      snapIndex = snapGrid.indexOf(translate2);
    } else {
      const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    if (activeIndex === previousIndex && !swiper.params.loop) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit("snapIndexChange");
      }
      return;
    }
    if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.realIndex = getVirtualRealIndex(activeIndex);
      return;
    }
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    let realIndex;
    if (swiper.virtual && params.virtual.enabled && params.loop) {
      realIndex = getVirtualRealIndex(activeIndex);
    } else if (gridEnabled) {
      const firstSlideInColumn = swiper.slides.filter((slideEl) => slideEl.column === activeIndex)[0];
      let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
      if (Number.isNaN(activeSlideIndex)) {
        activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
      }
      realIndex = Math.floor(activeSlideIndex / params.grid.rows);
    } else if (swiper.slides[activeIndex]) {
      const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
      if (slideIndex) {
        realIndex = parseInt(slideIndex, 10);
      } else {
        realIndex = activeIndex;
      }
    } else {
      realIndex = activeIndex;
    }
    Object.assign(swiper, {
      previousSnapIndex,
      snapIndex,
      previousRealIndex,
      realIndex,
      previousIndex,
      activeIndex
    });
    if (swiper.initialized) {
      preload(swiper);
    }
    swiper.emit("activeIndexChange");
    swiper.emit("snapIndexChange");
    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      if (previousRealIndex !== realIndex) {
        swiper.emit("realIndexChange");
      }
      swiper.emit("slideChange");
    }
  }
  function updateClickedSlide(el, path) {
    const swiper = this;
    const params = swiper.params;
    let slide2 = el.closest(`.${params.slideClass}, swiper-slide`);
    if (!slide2 && swiper.isElement && path && path.length > 1 && path.includes(el)) {
      [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
        if (!slide2 && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) {
          slide2 = pathEl;
        }
      });
    }
    let slideFound = false;
    let slideIndex;
    if (slide2) {
      for (let i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide2) {
          slideFound = true;
          slideIndex = i;
          break;
        }
      }
    }
    if (slide2 && slideFound) {
      swiper.clickedSlide = slide2;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
      } else {
        swiper.clickedIndex = slideIndex;
      }
    } else {
      swiper.clickedSlide = void 0;
      swiper.clickedIndex = void 0;
      return;
    }
    if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }
  function getSwiperTranslate(axis) {
    if (axis === void 0) {
      axis = this.isHorizontal() ? "x" : "y";
    }
    const swiper = this;
    const {
      params,
      rtlTranslate: rtl,
      translate: translate2,
      wrapperEl
    } = swiper;
    if (params.virtualTranslate) {
      return rtl ? -translate2 : translate2;
    }
    if (params.cssMode) {
      return translate2;
    }
    let currentTranslate = getTranslate(wrapperEl, axis);
    currentTranslate += swiper.cssOverflowAdjustment();
    if (rtl)
      currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }
  function setTranslate(translate2, byController) {
    const swiper = this;
    const {
      rtlTranslate: rtl,
      params,
      wrapperEl,
      progress
    } = swiper;
    let x = 0;
    let y = 0;
    const z = 0;
    if (swiper.isHorizontal()) {
      x = rtl ? -translate2 : translate2;
    } else {
      y = translate2;
    }
    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;
    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      if (swiper.isHorizontal()) {
        x -= swiper.cssOverflowAdjustment();
      } else {
        y -= swiper.cssOverflowAdjustment();
      }
      wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    }
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate2);
    }
    swiper.emit("setTranslate", swiper.translate, byController);
  }
  function minTranslate() {
    return -this.snapGrid[0];
  }
  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }
  function translateTo(translate2, speed, runCallbacks, translateBounds, internal) {
    if (translate2 === void 0) {
      translate2 = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (translateBounds === void 0) {
      translateBounds = true;
    }
    const swiper = this;
    const {
      params,
      wrapperEl
    } = swiper;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }
    const minTranslate2 = swiper.minTranslate();
    const maxTranslate2 = swiper.maxTranslate();
    let newTranslate;
    if (translateBounds && translate2 > minTranslate2)
      newTranslate = minTranslate2;
    else if (translateBounds && translate2 < maxTranslate2)
      newTranslate = maxTranslate2;
    else
      newTranslate = translate2;
    swiper.updateProgress(newTranslate);
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      if (speed === 0) {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: -newTranslate,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: -newTranslate,
          behavior: "smooth"
        });
      }
      return true;
    }
    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionEnd");
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.emit("transitionStart");
      }
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
            if (!swiper || swiper.destroyed)
              return;
            if (e.target !== this)
              return;
            swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;
            swiper.animating = false;
            if (runCallbacks) {
              swiper.emit("transitionEnd");
            }
          };
        }
        swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
      }
    }
    return true;
  }
  function setTransition(duration, byController) {
    const swiper = this;
    if (!swiper.params.cssMode) {
      swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
      swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
    }
    swiper.emit("setTransition", duration, byController);
  }
  function transitionEmit(_ref) {
    let {
      swiper,
      runCallbacks,
      direction,
      step
    } = _ref;
    const {
      activeIndex,
      previousIndex
    } = swiper;
    let dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex)
        dir = "next";
      else if (activeIndex < previousIndex)
        dir = "prev";
      else
        dir = "reset";
    }
    swiper.emit(`transition${step}`);
    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === "reset") {
        swiper.emit(`slideResetTransition${step}`);
        return;
      }
      swiper.emit(`slideChangeTransition${step}`);
      if (dir === "next") {
        swiper.emit(`slideNextTransition${step}`);
      } else {
        swiper.emit(`slidePrevTransition${step}`);
      }
    }
  }
  function transitionStart(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params
    } = swiper;
    if (params.cssMode)
      return;
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "Start"
    });
  }
  function transitionEnd(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params
    } = swiper;
    swiper.animating = false;
    if (params.cssMode)
      return;
    swiper.setTransition(0);
    transitionEmit({
      swiper,
      runCallbacks,
      direction,
      step: "End"
    });
  }
  function slideTo(index, speed, runCallbacks, internal, initial) {
    if (index === void 0) {
      index = 0;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      index = parseInt(index, 10);
    }
    const swiper = this;
    let slideIndex = index;
    if (slideIndex < 0)
      slideIndex = 0;
    const {
      params,
      snapGrid,
      slidesGrid,
      previousIndex,
      activeIndex,
      rtlTranslate: rtl,
      wrapperEl,
      enabled
    } = swiper;
    if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    const translate2 = -snapGrid[snapIndex];
    if (params.normalizeSlideIndex) {
      for (let i = 0; i < slidesGrid.length; i += 1) {
        const normalizedTranslate = -Math.floor(translate2 * 100);
        const normalizedGrid = Math.floor(slidesGrid[i] * 100);
        const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
        if (typeof slidesGrid[i + 1] !== "undefined") {
          if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
            slideIndex = i;
          } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
            slideIndex = i + 1;
          }
        } else if (normalizedTranslate >= normalizedGrid) {
          slideIndex = i;
        }
      }
    }
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && (rtl ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate())) {
        return false;
      }
      if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) {
          return false;
        }
      }
    }
    if (slideIndex !== (previousIndex || 0) && runCallbacks) {
      swiper.emit("beforeSlideChangeStart");
    }
    swiper.updateProgress(translate2);
    let direction;
    if (slideIndex > activeIndex)
      direction = "next";
    else if (slideIndex < activeIndex)
      direction = "prev";
    else
      direction = "reset";
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    const isInitialVirtual = isVirtual && initial;
    if (!isInitialVirtual && (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate)) {
      swiper.updateActiveIndex(slideIndex);
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params.effect !== "slide") {
        swiper.setTranslate(translate2);
      }
      if (direction !== "reset") {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }
    if (params.cssMode) {
      const isH = swiper.isHorizontal();
      const t = rtl ? translate2 : -translate2;
      if (speed === 0) {
        if (isVirtual) {
          swiper.wrapperEl.style.scrollSnapType = "none";
          swiper._immediateVirtual = true;
        }
        if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
          swiper._cssModeVirtualInitialSet = true;
          requestAnimationFrame(() => {
            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
          });
        } else {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
        }
        if (isVirtual) {
          requestAnimationFrame(() => {
            swiper.wrapperEl.style.scrollSnapType = "";
            swiper._immediateVirtual = false;
          });
        }
      } else {
        if (!swiper.support.smoothScroll) {
          animateCSSModeScroll({
            swiper,
            targetPosition: t,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: t,
          behavior: "smooth"
        });
      }
      return true;
    }
    swiper.setTransition(speed);
    swiper.setTranslate(translate2);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit("beforeTransitionStart", speed, internal);
    swiper.transitionStart(runCallbacks, direction);
    if (speed === 0) {
      swiper.transitionEnd(runCallbacks, direction);
    } else if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onSlideToWrapperTransitionEnd) {
        swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper || swiper.destroyed)
            return;
          if (e.target !== this)
            return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
          swiper.onSlideToWrapperTransitionEnd = null;
          delete swiper.onSlideToWrapperTransitionEnd;
          swiper.transitionEnd(runCallbacks, direction);
        };
      }
      swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
    }
    return true;
  }
  function slideToLoop(index, speed, runCallbacks, internal) {
    if (index === void 0) {
      index = 0;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      const indexAsNumber = parseInt(index, 10);
      index = indexAsNumber;
    }
    const swiper = this;
    if (swiper.destroyed)
      return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
    let newIndex = index;
    if (swiper.params.loop) {
      if (swiper.virtual && swiper.params.virtual.enabled) {
        newIndex = newIndex + swiper.virtual.slidesBefore;
      } else {
        let targetSlideIndex;
        if (gridEnabled) {
          const slideIndex = newIndex * swiper.params.grid.rows;
          targetSlideIndex = swiper.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)[0].column;
        } else {
          targetSlideIndex = swiper.getSlideIndexByData(newIndex);
        }
        const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
        const {
          centeredSlides
        } = swiper.params;
        let slidesPerView = swiper.params.slidesPerView;
        if (slidesPerView === "auto") {
          slidesPerView = swiper.slidesPerViewDynamic();
        } else {
          slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
          if (centeredSlides && slidesPerView % 2 === 0) {
            slidesPerView = slidesPerView + 1;
          }
        }
        let needLoopFix = cols - targetSlideIndex < slidesPerView;
        if (centeredSlides) {
          needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
        }
        if (internal && centeredSlides && swiper.params.slidesPerView !== "auto" && !gridEnabled) {
          needLoopFix = false;
        }
        if (needLoopFix) {
          const direction = centeredSlides ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
          swiper.loopFix({
            direction,
            slideTo: true,
            activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
            slideRealIndex: direction === "next" ? swiper.realIndex : void 0
          });
        }
        if (gridEnabled) {
          const slideIndex = newIndex * swiper.params.grid.rows;
          newIndex = swiper.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)[0].column;
        } else {
          newIndex = swiper.getSlideIndexByData(newIndex);
        }
      }
    }
    requestAnimationFrame(() => {
      swiper.slideTo(newIndex, speed, runCallbacks, internal);
    });
    return swiper;
  }
  function slideNext(speed, runCallbacks, internal) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      enabled,
      params,
      animating
    } = swiper;
    if (!enabled || swiper.destroyed)
      return swiper;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    let perGroup = params.slidesPerGroup;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
    }
    const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
    const isVirtual = swiper.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding)
        return false;
      swiper.loopFix({
        direction: "next"
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
      if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
        requestAnimationFrame(() => {
          swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        });
        return true;
      }
    }
    if (params.rewind && swiper.isEnd) {
      return swiper.slideTo(0, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }
  function slidePrev(speed, runCallbacks, internal) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    const {
      params,
      snapGrid,
      slidesGrid,
      rtlTranslate,
      enabled,
      animating
    } = swiper;
    if (!enabled || swiper.destroyed)
      return swiper;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    const isVirtual = swiper.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding)
        return false;
      swiper.loopFix({
        direction: "prev"
      });
      swiper._clientLeft = swiper.wrapperEl.clientLeft;
    }
    const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize(val) {
      if (val < 0)
        return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }
    const normalizedTranslate = normalize(translate2);
    const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
    let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    if (typeof prevSnap === "undefined" && params.cssMode) {
      let prevSnapIndex;
      snapGrid.forEach((snap, snapIndex) => {
        if (normalizedTranslate >= snap) {
          prevSnapIndex = snapIndex;
        }
      });
      if (typeof prevSnapIndex !== "undefined") {
        prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
      }
    }
    let prevIndex = 0;
    if (typeof prevSnap !== "undefined") {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0)
        prevIndex = swiper.activeIndex - 1;
      if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
        prevIndex = Math.max(prevIndex, 0);
      }
    }
    if (params.rewind && swiper.isBeginning) {
      const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
    } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
      requestAnimationFrame(() => {
        swiper.slideTo(prevIndex, speed, runCallbacks, internal);
      });
      return true;
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  function slideReset(speed, runCallbacks, internal) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper = this;
    if (swiper.destroyed)
      return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }
  function slideToClosest(speed, runCallbacks, internal, threshold) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (threshold === void 0) {
      threshold = 0.5;
    }
    const swiper = this;
    if (swiper.destroyed)
      return;
    if (typeof speed === "undefined") {
      speed = swiper.params.speed;
    }
    let index = swiper.activeIndex;
    const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
    const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    if (translate2 >= swiper.snapGrid[snapIndex]) {
      const currentSnap = swiper.snapGrid[snapIndex];
      const nextSnap = swiper.snapGrid[snapIndex + 1];
      if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper.params.slidesPerGroup;
      }
    } else {
      const prevSnap = swiper.snapGrid[snapIndex - 1];
      const currentSnap = swiper.snapGrid[snapIndex];
      if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
        index -= swiper.params.slidesPerGroup;
      }
    }
    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);
    return swiper.slideTo(index, speed, runCallbacks, internal);
  }
  function slideToClickedSlide() {
    const swiper = this;
    if (swiper.destroyed)
      return;
    const {
      params,
      slidesEl
    } = swiper;
    const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    let slideToIndex = swiper.clickedIndex;
    let realIndex;
    const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
    if (params.loop) {
      if (swiper.animating)
        return;
      realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
      if (params.centeredSlides) {
        if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
          swiper.loopFix();
          slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
          nextTick(() => {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick(() => {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }
  function loopCreate(slideRealIndex) {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
      return;
    const initSlides = () => {
      const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
      slides.forEach((el, index) => {
        el.setAttribute("data-swiper-slide-index", index);
      });
    };
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
    const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
    const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
    const addBlankSlides = (amountOfSlides) => {
      for (let i = 0; i < amountOfSlides; i += 1) {
        const slideEl = swiper.isElement ? createElement2("swiper-slide", [params.slideBlankClass]) : createElement2("div", [params.slideClass, params.slideBlankClass]);
        swiper.slidesEl.append(slideEl);
      }
    };
    if (shouldFillGroup) {
      if (params.loopAddBlankSlides) {
        const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
        addBlankSlides(slidesToAdd);
        swiper.recalcSlides();
        swiper.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else if (shouldFillGrid) {
      if (params.loopAddBlankSlides) {
        const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
        addBlankSlides(slidesToAdd);
        swiper.recalcSlides();
        swiper.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else {
      initSlides();
    }
    swiper.loopFix({
      slideRealIndex,
      direction: params.centeredSlides ? void 0 : "next"
    });
  }
  function loopFix(_temp) {
    let {
      slideRealIndex,
      slideTo: slideTo2 = true,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController,
      byMousewheel
    } = _temp === void 0 ? {} : _temp;
    const swiper = this;
    if (!swiper.params.loop)
      return;
    swiper.emit("beforeLoopFix");
    const {
      slides,
      allowSlidePrev,
      allowSlideNext,
      slidesEl,
      params
    } = swiper;
    const {
      centeredSlides
    } = params;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    if (swiper.virtual && params.virtual.enabled) {
      if (slideTo2) {
        if (!params.centeredSlides && swiper.snapIndex === 0) {
          swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
        } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
          swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
        } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
          swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
        }
      }
      swiper.allowSlidePrev = allowSlidePrev;
      swiper.allowSlideNext = allowSlideNext;
      swiper.emit("loopFix");
      return;
    }
    let slidesPerView = params.slidesPerView;
    if (slidesPerView === "auto") {
      slidesPerView = swiper.slidesPerViewDynamic();
    } else {
      slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
      if (centeredSlides && slidesPerView % 2 === 0) {
        slidesPerView = slidesPerView + 1;
      }
    }
    const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
    let loopedSlides = slidesPerGroup;
    if (loopedSlides % slidesPerGroup !== 0) {
      loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
    }
    loopedSlides += params.loopAdditionalSlides;
    swiper.loopedSlides = loopedSlides;
    const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
    if (slides.length < slidesPerView + loopedSlides) {
      showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters");
    } else if (gridEnabled && params.grid.fill === "row") {
      showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
    }
    const prependSlidesIndexes = [];
    const appendSlidesIndexes = [];
    let activeIndex = swiper.activeIndex;
    if (typeof activeSlideIndex === "undefined") {
      activeSlideIndex = swiper.getSlideIndex(slides.filter((el) => el.classList.contains(params.slideActiveClass))[0]);
    } else {
      activeIndex = activeSlideIndex;
    }
    const isNext = direction === "next" || !direction;
    const isPrev = direction === "prev" || !direction;
    let slidesPrepended = 0;
    let slidesAppended = 0;
    const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
    const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
    const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate2 === "undefined" ? -slidesPerView / 2 + 0.5 : 0);
    if (activeColIndexWithShift < loopedSlides) {
      slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
      for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
        const index = i - Math.floor(i / cols) * cols;
        if (gridEnabled) {
          const colIndexToPrepend = cols - index - 1;
          for (let i2 = slides.length - 1; i2 >= 0; i2 -= 1) {
            if (slides[i2].column === colIndexToPrepend)
              prependSlidesIndexes.push(i2);
          }
        } else {
          prependSlidesIndexes.push(cols - index - 1);
        }
      }
    } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
      slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
      for (let i = 0; i < slidesAppended; i += 1) {
        const index = i - Math.floor(i / cols) * cols;
        if (gridEnabled) {
          slides.forEach((slide2, slideIndex) => {
            if (slide2.column === index)
              appendSlidesIndexes.push(slideIndex);
          });
        } else {
          appendSlidesIndexes.push(index);
        }
      }
    }
    swiper.__preventObserver__ = true;
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
    if (isPrev) {
      prependSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.prepend(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    if (isNext) {
      appendSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.append(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    swiper.recalcSlides();
    if (params.slidesPerView === "auto") {
      swiper.updateSlides();
    } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
      swiper.slides.forEach((slide2, slideIndex) => {
        swiper.grid.updateSlide(slideIndex, slide2, swiper.slides);
      });
    }
    if (params.watchSlidesProgress) {
      swiper.updateSlidesOffset();
    }
    if (slideTo2) {
      if (prependSlidesIndexes.length > 0 && isPrev) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - diff);
          } else {
            swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
            if (setTranslate2) {
              swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
              swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
            }
          }
        } else {
          if (setTranslate2) {
            const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
            swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
            swiper.touchEventsData.currentTranslate = swiper.translate;
          }
        }
      } else if (appendSlidesIndexes.length > 0 && isNext) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper.slidesGrid[activeIndex];
          const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper.setTranslate(swiper.translate - diff);
          } else {
            swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
            if (setTranslate2) {
              swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
              swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
            }
          }
        } else {
          const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
          swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
        }
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.controller && swiper.controller.control && !byController) {
      const loopParams = {
        slideRealIndex,
        direction,
        setTranslate: setTranslate2,
        activeSlideIndex,
        byController: true
      };
      if (Array.isArray(swiper.controller.control)) {
        swiper.controller.control.forEach((c) => {
          if (!c.destroyed && c.params.loop)
            c.loopFix({
              ...loopParams,
              slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo2 : false
            });
        });
      } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
        swiper.controller.control.loopFix({
          ...loopParams,
          slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo2 : false
        });
      }
    }
    swiper.emit("loopFix");
  }
  function loopDestroy() {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    if (!params.loop || swiper.virtual && swiper.params.virtual.enabled)
      return;
    swiper.recalcSlides();
    const newSlidesOrder = [];
    swiper.slides.forEach((slideEl) => {
      const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
      newSlidesOrder[index] = slideEl;
    });
    swiper.slides.forEach((slideEl) => {
      slideEl.removeAttribute("data-swiper-slide-index");
    });
    newSlidesOrder.forEach((slideEl) => {
      slidesEl.append(slideEl);
    });
    swiper.recalcSlides();
    swiper.slideTo(swiper.realIndex, 0);
  }
  function setGrabCursor(moving) {
    const swiper = this;
    if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode)
      return;
    const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }
    el.style.cursor = "move";
    el.style.cursor = moving ? "grabbing" : "grab";
    if (swiper.isElement) {
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
    }
  }
  function unsetGrabCursor() {
    const swiper = this;
    if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
      return;
    }
    if (swiper.isElement) {
      swiper.__preventObserver__ = true;
    }
    swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
    if (swiper.isElement) {
      requestAnimationFrame(() => {
        swiper.__preventObserver__ = false;
      });
    }
  }
  function closestElement(selector, base) {
    if (base === void 0) {
      base = this;
    }
    function __closestFrom(el) {
      if (!el || el === getDocument() || el === getWindow())
        return null;
      if (el.assignedSlot)
        el = el.assignedSlot;
      const found = el.closest(selector);
      if (!found && !el.getRootNode) {
        return null;
      }
      return found || __closestFrom(el.getRootNode().host);
    }
    return __closestFrom(base);
  }
  function preventEdgeSwipe(swiper, event2, startX) {
    const window2 = getWindow();
    const {
      params
    } = swiper;
    const edgeSwipeDetection = params.edgeSwipeDetection;
    const edgeSwipeThreshold = params.edgeSwipeThreshold;
    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
      if (edgeSwipeDetection === "prevent") {
        event2.preventDefault();
        return true;
      }
      return false;
    }
    return true;
  }
  function onTouchStart(event2) {
    const swiper = this;
    const document2 = getDocument();
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    const data = swiper.touchEventsData;
    if (e.type === "pointerdown") {
      if (data.pointerId !== null && data.pointerId !== e.pointerId) {
        return;
      }
      data.pointerId = e.pointerId;
    } else if (e.type === "touchstart" && e.targetTouches.length === 1) {
      data.touchId = e.targetTouches[0].identifier;
    }
    if (e.type === "touchstart") {
      preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
      return;
    }
    const {
      params,
      touches,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params.simulateTouch && e.pointerType === "mouse")
      return;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }
    if (!swiper.animating && params.cssMode && params.loop) {
      swiper.loopFix();
    }
    let targetEl = e.target;
    if (params.touchEventsTarget === "wrapper") {
      if (!elementIsChildOf(targetEl, swiper.wrapperEl))
        return;
    }
    if ("which" in e && e.which === 3)
      return;
    if ("button" in e && e.button > 0)
      return;
    if (data.isTouched && data.isMoved)
      return;
    const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
    const eventPath = e.composedPath ? e.composedPath() : e.path;
    if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
      targetEl = eventPath[0];
    }
    const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
    const isTargetShadow = !!(e.target && e.target.shadowRoot);
    if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!targetEl.closest(params.swipeHandler))
        return;
    }
    touches.currentX = e.pageX;
    touches.currentY = e.pageY;
    const startX = touches.currentX;
    const startY = touches.currentY;
    if (!preventEdgeSwipe(swiper, e, startX)) {
      return;
    }
    Object.assign(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: void 0,
      startMoving: void 0
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = void 0;
    if (params.threshold > 0)
      data.allowThresholdMove = false;
    let preventDefault = true;
    if (targetEl.matches(data.focusableElements)) {
      preventDefault = false;
      if (targetEl.nodeName === "SELECT") {
        data.isTouched = false;
      }
    }
    if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) {
      document2.activeElement.blur();
    }
    const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
      e.preventDefault();
    }
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
      swiper.freeMode.onTouchStart();
    }
    swiper.emit("touchStart", e);
  }
  function onTouchMove(event2) {
    const document2 = getDocument();
    const swiper = this;
    const data = swiper.touchEventsData;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params.simulateTouch && event2.pointerType === "mouse")
      return;
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    if (e.type === "pointermove") {
      if (data.touchId !== null)
        return;
      const id = e.pointerId;
      if (id !== data.pointerId)
        return;
    }
    let targetTouch;
    if (e.type === "touchmove") {
      targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
      if (!targetTouch || targetTouch.identifier !== data.touchId)
        return;
    } else {
      targetTouch = e;
    }
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit("touchMoveOpposite", e);
      }
      return;
    }
    const pageX = targetTouch.pageX;
    const pageY = targetTouch.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      if (!e.target.matches(data.focusableElements)) {
        swiper.allowClick = false;
      }
      if (data.isTouched) {
        Object.assign(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = now();
      }
      return;
    }
    if (params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
        return;
      }
    }
    if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== e.target && e.pointerType !== "mouse") {
      document2.activeElement.blur();
    }
    if (document2.activeElement) {
      if (e.target === document2.activeElement && e.target.matches(data.focusableElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper.emit("touchMove", e);
    }
    touches.previousX = touches.currentX;
    touches.previousY = touches.currentY;
    touches.currentX = pageX;
    touches.currentY = pageY;
    const diffX = touches.currentX - touches.startX;
    const diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold)
      return;
    if (typeof data.isScrolling === "undefined") {
      let touchAngle;
      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }
    if (data.isScrolling) {
      swiper.emit("touchMoveOpposite", e);
    }
    if (typeof data.startMoving === "undefined") {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper.allowClick = false;
    if (!params.cssMode && e.cancelable) {
      e.preventDefault();
    }
    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }
    let diff = swiper.isHorizontal() ? diffX : diffY;
    let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
    if (params.oneWayMovement) {
      diff = Math.abs(diff) * (rtl ? 1 : -1);
      touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
    }
    touches.diff = diff;
    diff *= params.touchRatio;
    if (rtl) {
      diff = -diff;
      touchesDiff = -touchesDiff;
    }
    const prevTouchesDirection = swiper.touchesDirection;
    swiper.swipeDirection = diff > 0 ? "prev" : "next";
    swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
    const isLoop = swiper.params.loop && !params.cssMode;
    const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
    if (!data.isMoved) {
      if (isLoop && allowLoopFix) {
        swiper.loopFix({
          direction: swiper.swipeDirection
        });
      }
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true,
          detail: {
            bySwiperTouchMove: true
          }
        });
        swiper.wrapperEl.dispatchEvent(evt);
      }
      data.allowMomentumBounce = false;
      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit("sliderFirstMove", e);
    }
    let loopFixed;
    (/* @__PURE__ */ new Date()).getTime();
    if (data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY,
        startTranslate: data.currentTranslate
      });
      data.loopSwapReset = true;
      data.startTranslate = data.currentTranslate;
      return;
    }
    swiper.emit("sliderMove", e);
    data.isMoved = true;
    data.currentTranslate = diff + data.startTranslate;
    let disableParentSwiper = true;
    let resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if (diff > 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) {
        swiper.loopFix({
          direction: "prev",
          setTranslate: true,
          activeSlideIndex: 0
        });
      }
      if (data.currentTranslate > swiper.minTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
        }
      }
    } else if (diff < 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) {
        swiper.loopFix({
          direction: "next",
          setTranslate: true,
          activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
        });
      }
      if (data.currentTranslate < swiper.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
        }
      }
    }
    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    }
    if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
      data.currentTranslate = data.startTranslate;
    }
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }
    if (!params.followFinger || params.cssMode)
      return;
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
      swiper.freeMode.onTouchMove();
    }
    swiper.updateProgress(data.currentTranslate);
    swiper.setTranslate(data.currentTranslate);
  }
  function onTouchEnd(event2) {
    const swiper = this;
    const data = swiper.touchEventsData;
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    let targetTouch;
    const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
    if (!isTouchEvent) {
      if (data.touchId !== null)
        return;
      if (e.pointerId !== data.pointerId)
        return;
      targetTouch = e;
    } else {
      targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
      if (!targetTouch || targetTouch.identifier !== data.touchId)
        return;
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(e.type)) {
      const proceed = ["pointercancel", "contextmenu"].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
      if (!proceed) {
        return;
      }
    }
    data.pointerId = null;
    data.touchId = null;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      slidesGrid,
      enabled
    } = swiper;
    if (!enabled)
      return;
    if (!params.simulateTouch && e.pointerType === "mouse")
      return;
    if (data.allowTouchCallbacks) {
      swiper.emit("touchEnd", e);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }
    const touchEndTime = now();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (swiper.allowClick) {
      const pathTree = e.path || e.composedPath && e.composedPath();
      swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
      swiper.emit("tap click", e);
      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper.emit("doubleTap doubleClick", e);
      }
    }
    data.lastClickTime = now();
    nextTick(() => {
      if (!swiper.destroyed)
        swiper.allowClick = true;
    });
    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    let currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }
    if (params.cssMode) {
      return;
    }
    if (params.freeMode && params.freeMode.enabled) {
      swiper.freeMode.onTouchEnd({
        currentPos
      });
      return;
    }
    const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
    let stopIndex = 0;
    let groupSize = swiper.slidesSizesGrid[0];
    for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
      const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
      if (typeof slidesGrid[i + increment2] !== "undefined") {
        if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
          stopIndex = i;
          groupSize = slidesGrid[i + increment2] - slidesGrid[i];
        }
      } else if (swipeToLast || currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }
    let rewindFirstIndex = null;
    let rewindLastIndex = null;
    if (params.rewind) {
      if (swiper.isBeginning) {
        rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
      } else if (swiper.isEnd) {
        rewindFirstIndex = 0;
      }
    }
    const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (timeDiff > params.longSwipesMs) {
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === "next") {
        if (ratio >= params.longSwipesRatio)
          swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
        else
          swiper.slideTo(stopIndex);
      }
      if (swiper.swipeDirection === "prev") {
        if (ratio > 1 - params.longSwipesRatio) {
          swiper.slideTo(stopIndex + increment);
        } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
          swiper.slideTo(rewindLastIndex);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    } else {
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === "next") {
          swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
        }
        if (swiper.swipeDirection === "prev") {
          swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
        }
      } else if (e.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  }
  function onResize() {
    const swiper = this;
    const {
      params,
      el
    } = swiper;
    if (el && el.offsetWidth === 0)
      return;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    const {
      allowSlideNext,
      allowSlidePrev,
      snapGrid
    } = swiper;
    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateSlidesClasses();
    const isVirtualLoop = isVirtual && params.loop;
    if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      if (swiper.params.loop && !isVirtual) {
        swiper.slideToLoop(swiper.realIndex, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    }
    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      clearTimeout(swiper.autoplay.resizeTimeout);
      swiper.autoplay.resizeTimeout = setTimeout(() => {
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
          swiper.autoplay.resume();
        }
      }, 500);
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }
  function onClick(e) {
    const swiper = this;
    if (!swiper.enabled)
      return;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks)
        e.preventDefault();
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }
  function onScroll() {
    const swiper = this;
    const {
      wrapperEl,
      rtlTranslate,
      enabled
    } = swiper;
    if (!enabled)
      return;
    swiper.previousTranslate = swiper.translate;
    if (swiper.isHorizontal()) {
      swiper.translate = -wrapperEl.scrollLeft;
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    }
    if (swiper.translate === 0)
      swiper.translate = 0;
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
    let newProgress;
    const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
    }
    if (newProgress !== swiper.progress) {
      swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
    }
    swiper.emit("setTranslate", swiper.translate, false);
  }
  function onLoad(e) {
    const swiper = this;
    processLazyPreloader(swiper, e.target);
    if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
      return;
    }
    swiper.update();
  }
  function onDocumentTouchStart() {
    const swiper = this;
    if (swiper.documentTouchHandlerProceeded)
      return;
    swiper.documentTouchHandlerProceeded = true;
    if (swiper.params.touchReleaseOnEdges) {
      swiper.el.style.touchAction = "auto";
    }
  }
  function attachEvents() {
    const swiper = this;
    const {
      params
    } = swiper;
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
    swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }
    swiper.onClick = onClick.bind(swiper);
    swiper.onLoad = onLoad.bind(swiper);
    events(swiper, "on");
  }
  function detachEvents() {
    const swiper = this;
    events(swiper, "off");
  }
  function setBreakpoint() {
    const swiper = this;
    const {
      realIndex,
      initialized,
      params,
      el
    } = swiper;
    const breakpoints2 = params.breakpoints;
    if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
      return;
    const breakpoint = swiper.getBreakpoint(breakpoints2, swiper.params.breakpointsBase, swiper.el);
    if (!breakpoint || swiper.currentBreakpoint === breakpoint)
      return;
    const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
    const breakpointParams = breakpointOnlyParams || swiper.originalParams;
    const wasMultiRow = isGridEnabled(swiper, params);
    const isMultiRow = isGridEnabled(swiper, breakpointParams);
    const wasGrabCursor = swiper.params.grabCursor;
    const isGrabCursor = breakpointParams.grabCursor;
    const wasEnabled = params.enabled;
    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
      swiper.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params.containerModifierClass}grid`);
      if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
        el.classList.add(`${params.containerModifierClass}grid-column`);
      }
      swiper.emitContainerClasses();
    }
    if (wasGrabCursor && !isGrabCursor) {
      swiper.unsetGrabCursor();
    } else if (!wasGrabCursor && isGrabCursor) {
      swiper.setGrabCursor();
    }
    ["navigation", "pagination", "scrollbar"].forEach((prop) => {
      if (typeof breakpointParams[prop] === "undefined")
        return;
      const wasModuleEnabled = params[prop] && params[prop].enabled;
      const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
      if (wasModuleEnabled && !isModuleEnabled) {
        swiper[prop].disable();
      }
      if (!wasModuleEnabled && isModuleEnabled) {
        swiper[prop].enable();
      }
    });
    const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
    const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
    const wasLoop = params.loop;
    if (directionChanged && initialized) {
      swiper.changeDirection();
    }
    extend2(swiper.params, breakpointParams);
    const isEnabled2 = swiper.params.enabled;
    const hasLoop = swiper.params.loop;
    Object.assign(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev
    });
    if (wasEnabled && !isEnabled2) {
      swiper.disable();
    } else if (!wasEnabled && isEnabled2) {
      swiper.enable();
    }
    swiper.currentBreakpoint = breakpoint;
    swiper.emit("_beforeBreakpoint", breakpointParams);
    if (initialized) {
      if (needsReLoop) {
        swiper.loopDestroy();
        swiper.loopCreate(realIndex);
        swiper.updateSlides();
      } else if (!wasLoop && hasLoop) {
        swiper.loopCreate(realIndex);
        swiper.updateSlides();
      } else if (wasLoop && !hasLoop) {
        swiper.loopDestroy();
      }
    }
    swiper.emit("breakpoint", breakpointParams);
  }
  function getBreakpoint(breakpoints2, base, containerEl) {
    if (base === void 0) {
      base = "window";
    }
    if (!breakpoints2 || base === "container" && !containerEl)
      return void 0;
    let breakpoint = false;
    const window2 = getWindow();
    const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
    const points = Object.keys(breakpoints2).map((point) => {
      if (typeof point === "string" && point.indexOf("@") === 0) {
        const minRatio = parseFloat(point.substr(1));
        const value = currentHeight * minRatio;
        return {
          value,
          point
        };
      }
      return {
        value: point,
        point
      };
    });
    points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
    for (let i = 0; i < points.length; i += 1) {
      const {
        point,
        value
      } = points[i];
      if (base === "window") {
        if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
          breakpoint = point;
        }
      } else if (value <= containerEl.clientWidth) {
        breakpoint = point;
      }
    }
    return breakpoint || "max";
  }
  function prepareClasses(entries, prefix) {
    const resultClasses = [];
    entries.forEach((item) => {
      if (typeof item === "object") {
        Object.keys(item).forEach((classNames) => {
          if (item[classNames]) {
            resultClasses.push(prefix + classNames);
          }
        });
      } else if (typeof item === "string") {
        resultClasses.push(prefix + item);
      }
    });
    return resultClasses;
  }
  function addClasses() {
    const swiper = this;
    const {
      classNames,
      params,
      rtl,
      el,
      device
    } = swiper;
    const suffixes = prepareClasses(["initialized", params.direction, {
      "free-mode": swiper.params.freeMode && params.freeMode.enabled
    }, {
      "autoheight": params.autoHeight
    }, {
      "rtl": rtl
    }, {
      "grid": params.grid && params.grid.rows > 1
    }, {
      "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
    }, {
      "android": device.android
    }, {
      "ios": device.ios
    }, {
      "css-mode": params.cssMode
    }, {
      "centered": params.cssMode && params.centeredSlides
    }, {
      "watch-progress": params.watchSlidesProgress
    }], params.containerModifierClass);
    classNames.push(...suffixes);
    el.classList.add(...classNames);
    swiper.emitContainerClasses();
  }
  function removeClasses() {
    const swiper = this;
    const {
      el,
      classNames
    } = swiper;
    if (!el || typeof el === "string")
      return;
    el.classList.remove(...classNames);
    swiper.emitContainerClasses();
  }
  function checkOverflow() {
    const swiper = this;
    const {
      isLocked: wasLocked,
      params
    } = swiper;
    const {
      slidesOffsetBefore
    } = params;
    if (slidesOffsetBefore) {
      const lastSlideIndex = swiper.slides.length - 1;
      const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
      swiper.isLocked = swiper.size > lastSlideRightEdge;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }
    if (params.allowSlideNext === true) {
      swiper.allowSlideNext = !swiper.isLocked;
    }
    if (params.allowSlidePrev === true) {
      swiper.allowSlidePrev = !swiper.isLocked;
    }
    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
    }
    if (wasLocked !== swiper.isLocked) {
      swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
  }
  function moduleExtendParams(params, allModulesParams) {
    return function extendParams(obj) {
      if (obj === void 0) {
        obj = {};
      }
      const moduleParamName = Object.keys(obj)[0];
      const moduleParams = obj[moduleParamName];
      if (typeof moduleParams !== "object" || moduleParams === null) {
        extend2(allModulesParams, obj);
        return;
      }
      if (params[moduleParamName] === true) {
        params[moduleParamName] = {
          enabled: true
        };
      }
      if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) {
        params[moduleParamName].auto = true;
      }
      if (["pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) {
        params[moduleParamName].auto = true;
      }
      if (!(moduleParamName in params && "enabled" in moduleParams)) {
        extend2(allModulesParams, obj);
        return;
      }
      if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
        params[moduleParamName].enabled = true;
      }
      if (!params[moduleParamName])
        params[moduleParamName] = {
          enabled: false
        };
      extend2(allModulesParams, obj);
    };
  }
  var support;
  var deviceCached;
  var browser;
  var eventsEmitter;
  var toggleSlideClasses$1;
  var toggleSlideClasses;
  var processLazyPreloader;
  var unlazy;
  var preload;
  var update;
  var translate;
  var transition;
  var slide;
  var loop;
  var grabCursor;
  var events;
  var events$1;
  var isGridEnabled;
  var breakpoints;
  var classes;
  var checkOverflow$1;
  var defaults;
  var prototypes;
  var extendedDefaults;
  var Swiper;
  var init_swiper_core = __esm({
    "../../node_modules/swiper/shared/swiper-core.mjs"() {
      init_ssr_window_esm();
      init_utils();
      eventsEmitter = {
        on(events2, handler, priority) {
          const self = this;
          if (!self.eventsListeners || self.destroyed)
            return self;
          if (typeof handler !== "function")
            return self;
          const method = priority ? "unshift" : "push";
          events2.split(" ").forEach((event2) => {
            if (!self.eventsListeners[event2])
              self.eventsListeners[event2] = [];
            self.eventsListeners[event2][method](handler);
          });
          return self;
        },
        once(events2, handler, priority) {
          const self = this;
          if (!self.eventsListeners || self.destroyed)
            return self;
          if (typeof handler !== "function")
            return self;
          function onceHandler() {
            self.off(events2, onceHandler);
            if (onceHandler.__emitterProxy) {
              delete onceHandler.__emitterProxy;
            }
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            handler.apply(self, args);
          }
          onceHandler.__emitterProxy = handler;
          return self.on(events2, onceHandler, priority);
        },
        onAny(handler, priority) {
          const self = this;
          if (!self.eventsListeners || self.destroyed)
            return self;
          if (typeof handler !== "function")
            return self;
          const method = priority ? "unshift" : "push";
          if (self.eventsAnyListeners.indexOf(handler) < 0) {
            self.eventsAnyListeners[method](handler);
          }
          return self;
        },
        offAny(handler) {
          const self = this;
          if (!self.eventsListeners || self.destroyed)
            return self;
          if (!self.eventsAnyListeners)
            return self;
          const index = self.eventsAnyListeners.indexOf(handler);
          if (index >= 0) {
            self.eventsAnyListeners.splice(index, 1);
          }
          return self;
        },
        off(events2, handler) {
          const self = this;
          if (!self.eventsListeners || self.destroyed)
            return self;
          if (!self.eventsListeners)
            return self;
          events2.split(" ").forEach((event2) => {
            if (typeof handler === "undefined") {
              self.eventsListeners[event2] = [];
            } else if (self.eventsListeners[event2]) {
              self.eventsListeners[event2].forEach((eventHandler, index) => {
                if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
                  self.eventsListeners[event2].splice(index, 1);
                }
              });
            }
          });
          return self;
        },
        emit() {
          const self = this;
          if (!self.eventsListeners || self.destroyed)
            return self;
          if (!self.eventsListeners)
            return self;
          let events2;
          let data;
          let context;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          if (typeof args[0] === "string" || Array.isArray(args[0])) {
            events2 = args[0];
            data = args.slice(1, args.length);
            context = self;
          } else {
            events2 = args[0].events;
            data = args[0].data;
            context = args[0].context || self;
          }
          data.unshift(context);
          const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
          eventsArray.forEach((event2) => {
            if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
              self.eventsAnyListeners.forEach((eventHandler) => {
                eventHandler.apply(context, [event2, ...data]);
              });
            }
            if (self.eventsListeners && self.eventsListeners[event2]) {
              self.eventsListeners[event2].forEach((eventHandler) => {
                eventHandler.apply(context, data);
              });
            }
          });
          return self;
        }
      };
      toggleSlideClasses$1 = (slideEl, condition, className) => {
        if (condition && !slideEl.classList.contains(className)) {
          slideEl.classList.add(className);
        } else if (!condition && slideEl.classList.contains(className)) {
          slideEl.classList.remove(className);
        }
      };
      toggleSlideClasses = (slideEl, condition, className) => {
        if (condition && !slideEl.classList.contains(className)) {
          slideEl.classList.add(className);
        } else if (!condition && slideEl.classList.contains(className)) {
          slideEl.classList.remove(className);
        }
      };
      processLazyPreloader = (swiper, imageEl) => {
        if (!swiper || swiper.destroyed || !swiper.params)
          return;
        const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
        const slideEl = imageEl.closest(slideSelector());
        if (slideEl) {
          let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
          if (!lazyEl && swiper.isElement) {
            if (slideEl.shadowRoot) {
              lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            } else {
              requestAnimationFrame(() => {
                if (slideEl.shadowRoot) {
                  lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                  if (lazyEl)
                    lazyEl.remove();
                }
              });
            }
          }
          if (lazyEl)
            lazyEl.remove();
        }
      };
      unlazy = (swiper, index) => {
        if (!swiper.slides[index])
          return;
        const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
        if (imageEl)
          imageEl.removeAttribute("loading");
      };
      preload = (swiper) => {
        if (!swiper || swiper.destroyed || !swiper.params)
          return;
        let amount = swiper.params.lazyPreloadPrevNext;
        const len = swiper.slides.length;
        if (!len || !amount || amount < 0)
          return;
        amount = Math.min(amount, len);
        const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
        const activeIndex = swiper.activeIndex;
        if (swiper.params.grid && swiper.params.grid.rows > 1) {
          const activeColumn = activeIndex;
          const preloadColumns = [activeColumn - amount];
          preloadColumns.push(...Array.from({
            length: amount
          }).map((_, i) => {
            return activeColumn + slidesPerView + i;
          }));
          swiper.slides.forEach((slideEl, i) => {
            if (preloadColumns.includes(slideEl.column))
              unlazy(swiper, i);
          });
          return;
        }
        const slideIndexLastInView = activeIndex + slidesPerView - 1;
        if (swiper.params.rewind || swiper.params.loop) {
          for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
            const realIndex = (i % len + len) % len;
            if (realIndex < activeIndex || realIndex > slideIndexLastInView)
              unlazy(swiper, realIndex);
          }
        } else {
          for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
            if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
              unlazy(swiper, i);
            }
          }
        }
      };
      update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
      };
      translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
      };
      transition = {
        setTransition,
        transitionStart,
        transitionEnd
      };
      slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
      };
      loop = {
        loopCreate,
        loopFix,
        loopDestroy
      };
      grabCursor = {
        setGrabCursor,
        unsetGrabCursor
      };
      events = (swiper, method) => {
        const document2 = getDocument();
        const {
          params,
          el,
          wrapperEl,
          device
        } = swiper;
        const capture = !!params.nested;
        const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        if (!el || typeof el === "string")
          return;
        document2[domMethod]("touchstart", swiper.onDocumentTouchStart, {
          passive: false,
          capture
        });
        el[domMethod]("touchstart", swiper.onTouchStart, {
          passive: false
        });
        el[domMethod]("pointerdown", swiper.onTouchStart, {
          passive: false
        });
        document2[domMethod]("touchmove", swiper.onTouchMove, {
          passive: false,
          capture
        });
        document2[domMethod]("pointermove", swiper.onTouchMove, {
          passive: false,
          capture
        });
        document2[domMethod]("touchend", swiper.onTouchEnd, {
          passive: true
        });
        document2[domMethod]("pointerup", swiper.onTouchEnd, {
          passive: true
        });
        document2[domMethod]("pointercancel", swiper.onTouchEnd, {
          passive: true
        });
        document2[domMethod]("touchcancel", swiper.onTouchEnd, {
          passive: true
        });
        document2[domMethod]("pointerout", swiper.onTouchEnd, {
          passive: true
        });
        document2[domMethod]("pointerleave", swiper.onTouchEnd, {
          passive: true
        });
        document2[domMethod]("contextmenu", swiper.onTouchEnd, {
          passive: true
        });
        if (params.preventClicks || params.preventClicksPropagation) {
          el[domMethod]("click", swiper.onClick, true);
        }
        if (params.cssMode) {
          wrapperEl[domMethod]("scroll", swiper.onScroll);
        }
        if (params.updateOnWindowResize) {
          swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
        } else {
          swiper[swiperMethod]("observerUpdate", onResize, true);
        }
        el[domMethod]("load", swiper.onLoad, {
          capture: true
        });
      };
      events$1 = {
        attachEvents,
        detachEvents
      };
      isGridEnabled = (swiper, params) => {
        return swiper.grid && params.grid && params.grid.rows > 1;
      };
      breakpoints = {
        setBreakpoint,
        getBreakpoint
      };
      classes = {
        addClasses,
        removeClasses
      };
      checkOverflow$1 = {
        checkOverflow
      };
      defaults = {
        init: true,
        direction: "horizontal",
        oneWayMovement: false,
        swiperElementNodeName: "SWIPER-CONTAINER",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        eventsPrefix: "swiper",
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        // Overrides
        width: null,
        height: null,
        //
        preventInteractionOnTransition: false,
        // ssr
        userAgent: null,
        url: null,
        // To support iOS's swipe-to-go-back gesture (when being used in-app).
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        // Autoheight
        autoHeight: false,
        // Set wrapper width
        setWrapperSize: false,
        // Virtual Translate
        virtualTranslate: false,
        // Effects
        effect: "slide",
        // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
        // Breakpoints
        breakpoints: void 0,
        breakpointsBase: "window",
        // Slides grid
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        // in px
        slidesOffsetAfter: 0,
        // in px
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        // Disable swiper and hide navigation when container not overflow
        watchOverflow: true,
        // Round length
        roundLengths: false,
        // Touches
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 5,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        // Unique Navigation Elements
        uniqueNavElements: true,
        // Resistance
        resistance: true,
        resistanceRatio: 0.85,
        // Progress
        watchSlidesProgress: false,
        // Cursor
        grabCursor: false,
        // Clicks
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        // loop
        loop: false,
        loopAddBlankSlides: true,
        loopAdditionalSlides: 0,
        loopPreventsSliding: true,
        // rewind
        rewind: false,
        // Swiping/no swiping
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        // '.swipe-handler',
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        // Passive Listeners
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        // NS
        containerModifierClass: "swiper-",
        // NEW
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        // Callbacks
        runCallbacksOnInit: true,
        // Internals
        _emitClasses: false
      };
      prototypes = {
        eventsEmitter,
        update,
        translate,
        transition,
        slide,
        loop,
        grabCursor,
        events: events$1,
        breakpoints,
        checkOverflow: checkOverflow$1,
        classes
      };
      extendedDefaults = {};
      Swiper = class _Swiper {
        constructor() {
          let el;
          let params;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
            params = args[0];
          } else {
            [el, params] = args;
          }
          if (!params)
            params = {};
          params = extend2({}, params);
          if (el && !params.el)
            params.el = el;
          const document2 = getDocument();
          if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
            const swipers = [];
            document2.querySelectorAll(params.el).forEach((containerEl) => {
              const newParams = extend2({}, params, {
                el: containerEl
              });
              swipers.push(new _Swiper(newParams));
            });
            return swipers;
          }
          const swiper = this;
          swiper.__swiper__ = true;
          swiper.support = getSupport();
          swiper.device = getDevice({
            userAgent: params.userAgent
          });
          swiper.browser = getBrowser();
          swiper.eventsListeners = {};
          swiper.eventsAnyListeners = [];
          swiper.modules = [...swiper.__modules__];
          if (params.modules && Array.isArray(params.modules)) {
            swiper.modules.push(...params.modules);
          }
          const allModulesParams = {};
          swiper.modules.forEach((mod) => {
            mod({
              params,
              swiper,
              extendParams: moduleExtendParams(params, allModulesParams),
              on: swiper.on.bind(swiper),
              once: swiper.once.bind(swiper),
              off: swiper.off.bind(swiper),
              emit: swiper.emit.bind(swiper)
            });
          });
          const swiperParams = extend2({}, defaults, allModulesParams);
          swiper.params = extend2({}, swiperParams, extendedDefaults, params);
          swiper.originalParams = extend2({}, swiper.params);
          swiper.passedParams = extend2({}, params);
          if (swiper.params && swiper.params.on) {
            Object.keys(swiper.params.on).forEach((eventName) => {
              swiper.on(eventName, swiper.params.on[eventName]);
            });
          }
          if (swiper.params && swiper.params.onAny) {
            swiper.onAny(swiper.params.onAny);
          }
          Object.assign(swiper, {
            enabled: swiper.params.enabled,
            el,
            // Classes
            classNames: [],
            // Slides
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            // isDirection
            isHorizontal() {
              return swiper.params.direction === "horizontal";
            },
            isVertical() {
              return swiper.params.direction === "vertical";
            },
            // Indexes
            activeIndex: 0,
            realIndex: 0,
            //
            isBeginning: true,
            isEnd: false,
            // Props
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: false,
            cssOverflowAdjustment() {
              return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
            },
            // Locks
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev,
            // Touch Events
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              // Form elements to match
              focusableElements: swiper.params.focusableElements,
              // Last click time
              lastClickTime: 0,
              clickTimeout: void 0,
              // Velocities
              velocities: [],
              allowMomentumBounce: void 0,
              startMoving: void 0,
              pointerId: null,
              touchId: null
            },
            // Clicks
            allowClick: true,
            // Touches
            allowTouchMove: swiper.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0
            },
            // Images
            imagesToLoad: [],
            imagesLoaded: 0
          });
          swiper.emit("_swiper");
          if (swiper.params.init) {
            swiper.init();
          }
          return swiper;
        }
        getDirectionLabel(property) {
          if (this.isHorizontal()) {
            return property;
          }
          return {
            "width": "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            "marginRight": "marginBottom"
          }[property];
        }
        getSlideIndex(slideEl) {
          const {
            slidesEl,
            params
          } = this;
          const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
          const firstSlideIndex = elementIndex(slides[0]);
          return elementIndex(slideEl) - firstSlideIndex;
        }
        getSlideIndexByData(index) {
          return this.getSlideIndex(this.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index)[0]);
        }
        recalcSlides() {
          const swiper = this;
          const {
            slidesEl,
            params
          } = swiper;
          swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        }
        enable() {
          const swiper = this;
          if (swiper.enabled)
            return;
          swiper.enabled = true;
          if (swiper.params.grabCursor) {
            swiper.setGrabCursor();
          }
          swiper.emit("enable");
        }
        disable() {
          const swiper = this;
          if (!swiper.enabled)
            return;
          swiper.enabled = false;
          if (swiper.params.grabCursor) {
            swiper.unsetGrabCursor();
          }
          swiper.emit("disable");
        }
        setProgress(progress, speed) {
          const swiper = this;
          progress = Math.min(Math.max(progress, 0), 1);
          const min = swiper.minTranslate();
          const max = swiper.maxTranslate();
          const current = (max - min) * progress + min;
          swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
          const swiper = this;
          if (!swiper.params._emitClasses || !swiper.el)
            return;
          const cls = swiper.el.className.split(" ").filter((className) => {
            return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
          });
          swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
          const swiper = this;
          if (swiper.destroyed)
            return "";
          return slideEl.className.split(" ").filter((className) => {
            return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
          }).join(" ");
        }
        emitSlidesClasses() {
          const swiper = this;
          if (!swiper.params._emitClasses || !swiper.el)
            return;
          const updates = [];
          swiper.slides.forEach((slideEl) => {
            const classNames = swiper.getSlideClasses(slideEl);
            updates.push({
              slideEl,
              classNames
            });
            swiper.emit("_slideClass", slideEl, classNames);
          });
          swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view, exact) {
          if (view === void 0) {
            view = "current";
          }
          if (exact === void 0) {
            exact = false;
          }
          const swiper = this;
          const {
            params,
            slides,
            slidesGrid,
            slidesSizesGrid,
            size: swiperSize,
            activeIndex
          } = swiper;
          let spv = 1;
          if (typeof params.slidesPerView === "number")
            return params.slidesPerView;
          if (params.centeredSlides) {
            let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
            let breakLoop;
            for (let i = activeIndex + 1; i < slides.length; i += 1) {
              if (slides[i] && !breakLoop) {
                slideSize += Math.ceil(slides[i].swiperSlideSize);
                spv += 1;
                if (slideSize > swiperSize)
                  breakLoop = true;
              }
            }
            for (let i = activeIndex - 1; i >= 0; i -= 1) {
              if (slides[i] && !breakLoop) {
                slideSize += slides[i].swiperSlideSize;
                spv += 1;
                if (slideSize > swiperSize)
                  breakLoop = true;
              }
            }
          } else {
            if (view === "current") {
              for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) {
                  spv += 1;
                }
              }
            } else {
              for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) {
                  spv += 1;
                }
              }
            }
          }
          return spv;
        }
        update() {
          const swiper = this;
          if (!swiper || swiper.destroyed)
            return;
          const {
            snapGrid,
            params
          } = swiper;
          if (params.breakpoints) {
            swiper.setBreakpoint();
          }
          [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
            if (imageEl.complete) {
              processLazyPreloader(swiper, imageEl);
            }
          });
          swiper.updateSize();
          swiper.updateSlides();
          swiper.updateProgress();
          swiper.updateSlidesClasses();
          function setTranslate2() {
            const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
            const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
            swiper.setTranslate(newTranslate);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
          }
          let translated;
          if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
            setTranslate2();
            if (params.autoHeight) {
              swiper.updateAutoHeight();
            }
          } else {
            if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
              const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
              translated = swiper.slideTo(slides.length - 1, 0, false, true);
            } else {
              translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
            }
            if (!translated) {
              setTranslate2();
            }
          }
          if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
            swiper.checkOverflow();
          }
          swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate) {
          if (needUpdate === void 0) {
            needUpdate = true;
          }
          const swiper = this;
          const currentDirection = swiper.params.direction;
          if (!newDirection) {
            newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
          }
          if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
            return swiper;
          }
          swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
          swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
          swiper.emitContainerClasses();
          swiper.params.direction = newDirection;
          swiper.slides.forEach((slideEl) => {
            if (newDirection === "vertical") {
              slideEl.style.width = "";
            } else {
              slideEl.style.height = "";
            }
          });
          swiper.emit("changeDirection");
          if (needUpdate)
            swiper.update();
          return swiper;
        }
        changeLanguageDirection(direction) {
          const swiper = this;
          if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr")
            return;
          swiper.rtl = direction === "rtl";
          swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
          if (swiper.rtl) {
            swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
            swiper.el.dir = "rtl";
          } else {
            swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
            swiper.el.dir = "ltr";
          }
          swiper.update();
        }
        mount(element) {
          const swiper = this;
          if (swiper.mounted)
            return true;
          let el = element || swiper.params.el;
          if (typeof el === "string") {
            el = document.querySelector(el);
          }
          if (!el) {
            return false;
          }
          el.swiper = swiper;
          if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) {
            swiper.isElement = true;
          }
          const getWrapperSelector = () => {
            return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
          };
          const getWrapper = () => {
            if (el && el.shadowRoot && el.shadowRoot.querySelector) {
              const res = el.shadowRoot.querySelector(getWrapperSelector());
              return res;
            }
            return elementChildren(el, getWrapperSelector())[0];
          };
          let wrapperEl = getWrapper();
          if (!wrapperEl && swiper.params.createElements) {
            wrapperEl = createElement2("div", swiper.params.wrapperClass);
            el.append(wrapperEl);
            elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl) => {
              wrapperEl.append(slideEl);
            });
          }
          Object.assign(swiper, {
            el,
            wrapperEl,
            slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
            hostEl: swiper.isElement ? el.parentNode.host : el,
            mounted: true,
            // RTL
            rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
            rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
            wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
          });
          return true;
        }
        init(el) {
          const swiper = this;
          if (swiper.initialized)
            return swiper;
          const mounted = swiper.mount(el);
          if (mounted === false)
            return swiper;
          swiper.emit("beforeInit");
          if (swiper.params.breakpoints) {
            swiper.setBreakpoint();
          }
          swiper.addClasses();
          swiper.updateSize();
          swiper.updateSlides();
          if (swiper.params.watchOverflow) {
            swiper.checkOverflow();
          }
          if (swiper.params.grabCursor && swiper.enabled) {
            swiper.setGrabCursor();
          }
          if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
            swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
          } else {
            swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
          }
          if (swiper.params.loop) {
            swiper.loopCreate();
          }
          swiper.attachEvents();
          const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
          if (swiper.isElement) {
            lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
          }
          lazyElements.forEach((imageEl) => {
            if (imageEl.complete) {
              processLazyPreloader(swiper, imageEl);
            } else {
              imageEl.addEventListener("load", (e) => {
                processLazyPreloader(swiper, e.target);
              });
            }
          });
          preload(swiper);
          swiper.initialized = true;
          preload(swiper);
          swiper.emit("init");
          swiper.emit("afterInit");
          return swiper;
        }
        destroy(deleteInstance, cleanStyles) {
          if (deleteInstance === void 0) {
            deleteInstance = true;
          }
          if (cleanStyles === void 0) {
            cleanStyles = true;
          }
          const swiper = this;
          const {
            params,
            el,
            wrapperEl,
            slides
          } = swiper;
          if (typeof swiper.params === "undefined" || swiper.destroyed) {
            return null;
          }
          swiper.emit("beforeDestroy");
          swiper.initialized = false;
          swiper.detachEvents();
          if (params.loop) {
            swiper.loopDestroy();
          }
          if (cleanStyles) {
            swiper.removeClasses();
            if (el && typeof el !== "string") {
              el.removeAttribute("style");
            }
            if (wrapperEl) {
              wrapperEl.removeAttribute("style");
            }
            if (slides && slides.length) {
              slides.forEach((slideEl) => {
                slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                slideEl.removeAttribute("style");
                slideEl.removeAttribute("data-swiper-slide-index");
              });
            }
          }
          swiper.emit("destroy");
          Object.keys(swiper.eventsListeners).forEach((eventName) => {
            swiper.off(eventName);
          });
          if (deleteInstance !== false) {
            if (swiper.el && typeof swiper.el !== "string") {
              swiper.el.swiper = null;
            }
            deleteProps(swiper);
          }
          swiper.destroyed = true;
          return null;
        }
        static extendDefaults(newDefaults) {
          extend2(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
          return extendedDefaults;
        }
        static get defaults() {
          return defaults;
        }
        static installModule(mod) {
          if (!_Swiper.prototype.__modules__)
            _Swiper.prototype.__modules__ = [];
          const modules = _Swiper.prototype.__modules__;
          if (typeof mod === "function" && modules.indexOf(mod) < 0) {
            modules.push(mod);
          }
        }
        static use(module) {
          if (Array.isArray(module)) {
            module.forEach((m) => _Swiper.installModule(m));
            return _Swiper;
          }
          _Swiper.installModule(module);
          return _Swiper;
        }
      };
      Object.keys(prototypes).forEach((prototypeGroup) => {
        Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
          Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        });
      });
      Swiper.use([Resize, Observer]);
    }
  });
  var init_swiper = __esm({
    "../../node_modules/swiper/swiper.mjs"() {
      init_swiper_core();
    }
  });
  var init_virtual = __esm({
    "../../node_modules/swiper/modules/virtual.mjs"() {
      init_ssr_window_esm();
      init_utils();
    }
  });
  function Keyboard(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const document2 = getDocument();
    const window2 = getWindow();
    swiper.keyboard = {
      enabled: false
    };
    extendParams({
      keyboard: {
        enabled: false,
        onlyInViewport: true,
        pageUpDown: true
      }
    });
    function handle(event2) {
      if (!swiper.enabled)
        return;
      const {
        rtlTranslate: rtl
      } = swiper;
      let e = event2;
      if (e.originalEvent)
        e = e.originalEvent;
      const kc = e.keyCode || e.charCode;
      const pageUpDown = swiper.params.keyboard.pageUpDown;
      const isPageUp = pageUpDown && kc === 33;
      const isPageDown = pageUpDown && kc === 34;
      const isArrowLeft = kc === 37;
      const isArrowRight = kc === 39;
      const isArrowUp = kc === 38;
      const isArrowDown = kc === 40;
      if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
        return false;
      }
      if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
        return false;
      }
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return void 0;
      }
      if (document2.activeElement && document2.activeElement.nodeName && (document2.activeElement.nodeName.toLowerCase() === "input" || document2.activeElement.nodeName.toLowerCase() === "textarea")) {
        return void 0;
      }
      if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
        let inView = false;
        if (elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) {
          return void 0;
        }
        const el = swiper.el;
        const swiperWidth = el.clientWidth;
        const swiperHeight = el.clientHeight;
        const windowWidth = window2.innerWidth;
        const windowHeight = window2.innerHeight;
        const swiperOffset = elementOffset(el);
        if (rtl)
          swiperOffset.left -= el.scrollLeft;
        const swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
        for (let i = 0; i < swiperCoord.length; i += 1) {
          const point = swiperCoord[i];
          if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
            if (point[0] === 0 && point[1] === 0)
              continue;
            inView = true;
          }
        }
        if (!inView)
          return void 0;
      }
      if (swiper.isHorizontal()) {
        if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
          if (e.preventDefault)
            e.preventDefault();
          else
            e.returnValue = false;
        }
        if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl)
          swiper.slideNext();
        if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl)
          swiper.slidePrev();
      } else {
        if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
          if (e.preventDefault)
            e.preventDefault();
          else
            e.returnValue = false;
        }
        if (isPageDown || isArrowDown)
          swiper.slideNext();
        if (isPageUp || isArrowUp)
          swiper.slidePrev();
      }
      emit("keyPress", kc);
      return void 0;
    }
    function enable() {
      if (swiper.keyboard.enabled)
        return;
      document2.addEventListener("keydown", handle);
      swiper.keyboard.enabled = true;
    }
    function disable() {
      if (!swiper.keyboard.enabled)
        return;
      document2.removeEventListener("keydown", handle);
      swiper.keyboard.enabled = false;
    }
    on("init", () => {
      if (swiper.params.keyboard.enabled) {
        enable();
      }
    });
    on("destroy", () => {
      if (swiper.keyboard.enabled) {
        disable();
      }
    });
    Object.assign(swiper.keyboard, {
      enable,
      disable
    });
  }
  var init_keyboard = __esm({
    "../../node_modules/swiper/modules/keyboard.mjs"() {
      init_ssr_window_esm();
      init_utils();
    }
  });
  function Mousewheel(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    const window2 = getWindow();
    extendParams({
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarget: "container",
        thresholdDelta: null,
        thresholdTime: null,
        noMousewheelClass: "swiper-no-mousewheel"
      }
    });
    swiper.mousewheel = {
      enabled: false
    };
    let timeout;
    let lastScrollTime = now();
    let lastEventBeforeSnap;
    const recentWheelEvents = [];
    function normalize(e) {
      const PIXEL_STEP = 10;
      const LINE_HEIGHT = 40;
      const PAGE_HEIGHT = 800;
      let sX = 0;
      let sY = 0;
      let pX = 0;
      let pY = 0;
      if ("detail" in e) {
        sY = e.detail;
      }
      if ("wheelDelta" in e) {
        sY = -e.wheelDelta / 120;
      }
      if ("wheelDeltaY" in e) {
        sY = -e.wheelDeltaY / 120;
      }
      if ("wheelDeltaX" in e) {
        sX = -e.wheelDeltaX / 120;
      }
      if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }
      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;
      if ("deltaY" in e) {
        pY = e.deltaY;
      }
      if ("deltaX" in e) {
        pX = e.deltaX;
      }
      if (e.shiftKey && !pX) {
        pX = pY;
        pY = 0;
      }
      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) {
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }
      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }
      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }
      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    }
    function handleMouseEnter() {
      if (!swiper.enabled)
        return;
      swiper.mouseEntered = true;
    }
    function handleMouseLeave() {
      if (!swiper.enabled)
        return;
      swiper.mouseEntered = false;
    }
    function animateSlider(newEvent) {
      if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
        return false;
      }
      if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
        return false;
      }
      if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
        return true;
      }
      if (newEvent.direction < 0) {
        if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
          swiper.slideNext();
          emit("scroll", newEvent.raw);
        }
      } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
        swiper.slidePrev();
        emit("scroll", newEvent.raw);
      }
      lastScrollTime = new window2.Date().getTime();
      return false;
    }
    function releaseScroll(newEvent) {
      const params = swiper.params.mousewheel;
      if (newEvent.direction < 0) {
        if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
          return true;
        }
      } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
        return true;
      }
      return false;
    }
    function handle(event2) {
      let e = event2;
      let disableParentSwiper = true;
      if (!swiper.enabled)
        return;
      if (event2.target.closest(`.${swiper.params.mousewheel.noMousewheelClass}`))
        return;
      const params = swiper.params.mousewheel;
      if (swiper.params.cssMode) {
        e.preventDefault();
      }
      let targetEl = swiper.el;
      if (swiper.params.mousewheel.eventsTarget !== "container") {
        targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
      }
      const targetElContainsTarget = targetEl && targetEl.contains(e.target);
      if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges)
        return true;
      if (e.originalEvent)
        e = e.originalEvent;
      let delta = 0;
      const rtlFactor = swiper.rtlTranslate ? -1 : 1;
      const data = normalize(e);
      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY))
            delta = -data.pixelX * rtlFactor;
          else
            return true;
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX))
          delta = -data.pixelY;
        else
          return true;
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }
      if (delta === 0)
        return true;
      if (params.invert)
        delta = -delta;
      let positions = swiper.getTranslate() + delta * params.sensitivity;
      if (positions >= swiper.minTranslate())
        positions = swiper.minTranslate();
      if (positions <= swiper.maxTranslate())
        positions = swiper.maxTranslate();
      disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
      if (disableParentSwiper && swiper.params.nested)
        e.stopPropagation();
      if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
        const newEvent = {
          time: now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta),
          raw: event2
        };
        if (recentWheelEvents.length >= 2) {
          recentWheelEvents.shift();
        }
        const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
        recentWheelEvents.push(newEvent);
        if (prevEvent) {
          if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
            animateSlider(newEvent);
          }
        } else {
          animateSlider(newEvent);
        }
        if (releaseScroll(newEvent)) {
          return true;
        }
      } else {
        const newEvent = {
          time: now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta)
        };
        const ignoreWheelEvents = lastEventBeforeSnap && newEvent.time < lastEventBeforeSnap.time + 500 && newEvent.delta <= lastEventBeforeSnap.delta && newEvent.direction === lastEventBeforeSnap.direction;
        if (!ignoreWheelEvents) {
          lastEventBeforeSnap = void 0;
          let position = swiper.getTranslate() + delta * params.sensitivity;
          const wasBeginning = swiper.isBeginning;
          const wasEnd = swiper.isEnd;
          if (position >= swiper.minTranslate())
            position = swiper.minTranslate();
          if (position <= swiper.maxTranslate())
            position = swiper.maxTranslate();
          swiper.setTransition(0);
          swiper.setTranslate(position);
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();
          if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
            swiper.updateSlidesClasses();
          }
          if (swiper.params.loop) {
            swiper.loopFix({
              direction: newEvent.direction < 0 ? "next" : "prev",
              byMousewheel: true
            });
          }
          if (swiper.params.freeMode.sticky) {
            clearTimeout(timeout);
            timeout = void 0;
            if (recentWheelEvents.length >= 15) {
              recentWheelEvents.shift();
            }
            const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : void 0;
            const firstEvent = recentWheelEvents[0];
            recentWheelEvents.push(newEvent);
            if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
              recentWheelEvents.splice(0);
            } else if (recentWheelEvents.length >= 15 && newEvent.time - firstEvent.time < 500 && firstEvent.delta - newEvent.delta >= 1 && newEvent.delta <= 6) {
              const snapToThreshold = delta > 0 ? 0.8 : 0.2;
              lastEventBeforeSnap = newEvent;
              recentWheelEvents.splice(0);
              timeout = nextTick(() => {
                if (swiper.destroyed || !swiper.params)
                  return;
                swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
              }, 0);
            }
            if (!timeout) {
              timeout = nextTick(() => {
                if (swiper.destroyed || !swiper.params)
                  return;
                const snapToThreshold = 0.5;
                lastEventBeforeSnap = newEvent;
                recentWheelEvents.splice(0);
                swiper.slideToClosest(swiper.params.speed, true, void 0, snapToThreshold);
              }, 500);
            }
          }
          if (!ignoreWheelEvents)
            emit("scroll", e);
          if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction)
            swiper.autoplay.stop();
          if (params.releaseOnEdges && (position === swiper.minTranslate() || position === swiper.maxTranslate())) {
            return true;
          }
        }
      }
      if (e.preventDefault)
        e.preventDefault();
      else
        e.returnValue = false;
      return false;
    }
    function events2(method) {
      let targetEl = swiper.el;
      if (swiper.params.mousewheel.eventsTarget !== "container") {
        targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
      }
      targetEl[method]("mouseenter", handleMouseEnter);
      targetEl[method]("mouseleave", handleMouseLeave);
      targetEl[method]("wheel", handle);
    }
    function enable() {
      if (swiper.params.cssMode) {
        swiper.wrapperEl.removeEventListener("wheel", handle);
        return true;
      }
      if (swiper.mousewheel.enabled)
        return false;
      events2("addEventListener");
      swiper.mousewheel.enabled = true;
      return true;
    }
    function disable() {
      if (swiper.params.cssMode) {
        swiper.wrapperEl.addEventListener(event, handle);
        return true;
      }
      if (!swiper.mousewheel.enabled)
        return false;
      events2("removeEventListener");
      swiper.mousewheel.enabled = false;
      return true;
    }
    on("init", () => {
      if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
        disable();
      }
      if (swiper.params.mousewheel.enabled)
        enable();
    });
    on("destroy", () => {
      if (swiper.params.cssMode) {
        enable();
      }
      if (swiper.mousewheel.enabled)
        disable();
    });
    Object.assign(swiper.mousewheel, {
      enable,
      disable
    });
  }
  var init_mousewheel = __esm({
    "../../node_modules/swiper/modules/mousewheel.mjs"() {
      init_ssr_window_esm();
      init_utils();
    }
  });
  function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
    if (swiper.params.createElements) {
      Object.keys(checkProps).forEach((key) => {
        if (!params[key] && params.auto === true) {
          let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
          if (!element) {
            element = createElement2("div", checkProps[key]);
            element.className = checkProps[key];
            swiper.el.append(element);
          }
          params[key] = element;
          originalParams[key] = element;
        }
      });
    }
    return params;
  }
  var init_create_element_if_not_defined = __esm({
    "../../node_modules/swiper/shared/create-element-if-not-defined.mjs"() {
      init_utils();
    }
  });
  function Navigation(_ref) {
    let {
      swiper,
      extendParams,
      on,
      emit
    } = _ref;
    extendParams({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled"
      }
    });
    swiper.navigation = {
      nextEl: null,
      prevEl: null
    };
    function getEl(el) {
      let res;
      if (el && typeof el === "string" && swiper.isElement) {
        res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
        if (res)
          return res;
      }
      if (el) {
        if (typeof el === "string")
          res = [...document.querySelectorAll(el)];
        if (swiper.params.uniqueNavElements && typeof el === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
          res = swiper.el.querySelector(el);
        } else if (res && res.length === 1) {
          res = res[0];
        }
      }
      if (el && !res)
        return el;
      return res;
    }
    function toggleEl(el, disabled) {
      const params = swiper.params.navigation;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (subEl) {
          subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
          if (subEl.tagName === "BUTTON")
            subEl.disabled = disabled;
          if (swiper.params.watchOverflow && swiper.enabled) {
            subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
          }
        }
      });
    }
    function update2() {
      const {
        nextEl,
        prevEl
      } = swiper.navigation;
      if (swiper.params.loop) {
        toggleEl(prevEl, false);
        toggleEl(nextEl, false);
        return;
      }
      toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
      toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
    }
    function onPrevClick(e) {
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind)
        return;
      swiper.slidePrev();
      emit("navigationPrev");
    }
    function onNextClick(e) {
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind)
        return;
      swiper.slideNext();
      emit("navigationNext");
    }
    function init() {
      const params = swiper.params.navigation;
      swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev"
      });
      if (!(params.nextEl || params.prevEl))
        return;
      let nextEl = getEl(params.nextEl);
      let prevEl = getEl(params.prevEl);
      Object.assign(swiper.navigation, {
        nextEl,
        prevEl
      });
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const initButton = (el, dir) => {
        if (el) {
          el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        }
        if (!swiper.enabled && el) {
          el.classList.add(...params.lockClass.split(" "));
        }
      };
      nextEl.forEach((el) => initButton(el, "next"));
      prevEl.forEach((el) => initButton(el, "prev"));
    }
    function destroy() {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const destroyButton = (el, dir) => {
        el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
      };
      nextEl.forEach((el) => destroyButton(el, "next"));
      prevEl.forEach((el) => destroyButton(el, "prev"));
    }
    on("init", () => {
      if (swiper.params.navigation.enabled === false) {
        disable();
      } else {
        init();
        update2();
      }
    });
    on("toEdge fromEdge lock unlock", () => {
      update2();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      if (swiper.enabled) {
        update2();
        return;
      }
      [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.add(swiper.params.navigation.lockClass));
    });
    on("click", (_s, e) => {
      let {
        nextEl,
        prevEl
      } = swiper.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const targetEl = e.target;
      let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
      if (swiper.isElement && !targetIsButton) {
        const path = e.path || e.composedPath && e.composedPath();
        if (path) {
          targetIsButton = path.find((pathEl) => nextEl.includes(pathEl) || prevEl.includes(pathEl));
        }
      }
      if (swiper.params.navigation.hideOnClick && !targetIsButton) {
        if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl)))
          return;
        let isHidden;
        if (nextEl.length) {
          isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        } else if (prevEl.length) {
          isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
        }
        if (isHidden === true) {
          emit("navigationShow");
        } else {
          emit("navigationHide");
        }
        [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper.params.navigation.hiddenClass));
      }
    });
    const enable = () => {
      swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
      init();
      update2();
    };
    const disable = () => {
      swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
      destroy();
    };
    Object.assign(swiper.navigation, {
      enable,
      disable,
      update: update2,
      init,
      destroy
    });
  }
  var init_navigation = __esm({
    "../../node_modules/swiper/modules/navigation.mjs"() {
      init_create_element_if_not_defined();
      init_utils();
    }
  });
  var init_classes_to_selector = __esm({
    "../../node_modules/swiper/shared/classes-to-selector.mjs"() {
    }
  });
  var init_pagination = __esm({
    "../../node_modules/swiper/modules/pagination.mjs"() {
      init_classes_to_selector();
      init_create_element_if_not_defined();
      init_utils();
    }
  });
  var init_scrollbar = __esm({
    "../../node_modules/swiper/modules/scrollbar.mjs"() {
      init_ssr_window_esm();
      init_utils();
      init_create_element_if_not_defined();
      init_classes_to_selector();
    }
  });
  var init_parallax = __esm({
    "../../node_modules/swiper/modules/parallax.mjs"() {
      init_utils();
    }
  });
  var init_zoom = __esm({
    "../../node_modules/swiper/modules/zoom.mjs"() {
      init_ssr_window_esm();
      init_utils();
    }
  });
  var init_controller = __esm({
    "../../node_modules/swiper/modules/controller.mjs"() {
      init_utils();
    }
  });
  var init_a11y = __esm({
    "../../node_modules/swiper/modules/a11y.mjs"() {
      init_ssr_window_esm();
      init_classes_to_selector();
      init_utils();
    }
  });
  var init_history = __esm({
    "../../node_modules/swiper/modules/history.mjs"() {
      init_ssr_window_esm();
    }
  });
  var init_hash_navigation = __esm({
    "../../node_modules/swiper/modules/hash-navigation.mjs"() {
      init_ssr_window_esm();
      init_utils();
    }
  });
  var init_autoplay = __esm({
    "../../node_modules/swiper/modules/autoplay.mjs"() {
      init_ssr_window_esm();
    }
  });
  var init_thumbs = __esm({
    "../../node_modules/swiper/modules/thumbs.mjs"() {
      init_ssr_window_esm();
      init_utils();
    }
  });
  var init_free_mode = __esm({
    "../../node_modules/swiper/modules/free-mode.mjs"() {
      init_utils();
    }
  });
  var init_grid = __esm({
    "../../node_modules/swiper/modules/grid.mjs"() {
    }
  });
  function appendSlide(slides) {
    const swiper = this;
    const {
      params,
      slidesEl
    } = swiper;
    if (params.loop) {
      swiper.loopDestroy();
    }
    const appendElement = (slideEl) => {
      if (typeof slideEl === "string") {
        const tempDOM = document.createElement("div");
        tempDOM.innerHTML = slideEl;
        slidesEl.append(tempDOM.children[0]);
        tempDOM.innerHTML = "";
      } else {
        slidesEl.append(slideEl);
      }
    };
    if (typeof slides === "object" && "length" in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i])
          appendElement(slides[i]);
      }
    } else {
      appendElement(slides);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
  }
  function prependSlide(slides) {
    const swiper = this;
    const {
      params,
      activeIndex,
      slidesEl
    } = swiper;
    if (params.loop) {
      swiper.loopDestroy();
    }
    let newActiveIndex = activeIndex + 1;
    const prependElement = (slideEl) => {
      if (typeof slideEl === "string") {
        const tempDOM = document.createElement("div");
        tempDOM.innerHTML = slideEl;
        slidesEl.prepend(tempDOM.children[0]);
        tempDOM.innerHTML = "";
      } else {
        slidesEl.prepend(slideEl);
      }
    };
    if (typeof slides === "object" && "length" in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i])
          prependElement(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
    } else {
      prependElement(slides);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
    swiper.slideTo(newActiveIndex, 0, false);
  }
  function addSlide(index, slides) {
    const swiper = this;
    const {
      params,
      activeIndex,
      slidesEl
    } = swiper;
    let activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.recalcSlides();
    }
    const baseLength = swiper.slides.length;
    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }
    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }
    let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
    const slidesBuffer = [];
    for (let i = baseLength - 1; i >= index; i -= 1) {
      const currentSlide = swiper.slides[i];
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }
    if (typeof slides === "object" && "length" in slides) {
      for (let i = 0; i < slides.length; i += 1) {
        if (slides[i])
          slidesEl.append(slides[i]);
      }
      newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    } else {
      slidesEl.append(slides);
    }
    for (let i = 0; i < slidesBuffer.length; i += 1) {
      slidesEl.append(slidesBuffer[i]);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }
  function removeSlide(slidesIndexes) {
    const swiper = this;
    const {
      params,
      activeIndex
    } = swiper;
    let activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
    }
    let newActiveIndex = activeIndexBuffer;
    let indexToRemove;
    if (typeof slidesIndexes === "object" && "length" in slidesIndexes) {
      for (let i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];
        if (swiper.slides[indexToRemove])
          swiper.slides[indexToRemove].remove();
        if (indexToRemove < newActiveIndex)
          newActiveIndex -= 1;
      }
      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove])
        swiper.slides[indexToRemove].remove();
      if (indexToRemove < newActiveIndex)
        newActiveIndex -= 1;
      newActiveIndex = Math.max(newActiveIndex, 0);
    }
    swiper.recalcSlides();
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }
  function removeAllSlides() {
    const swiper = this;
    const slidesIndexes = [];
    for (let i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }
    swiper.removeSlide(slidesIndexes);
  }
  function Manipulation(_ref) {
    let {
      swiper
    } = _ref;
    Object.assign(swiper, {
      appendSlide: appendSlide.bind(swiper),
      prependSlide: prependSlide.bind(swiper),
      addSlide: addSlide.bind(swiper),
      removeSlide: removeSlide.bind(swiper),
      removeAllSlides: removeAllSlides.bind(swiper)
    });
  }
  var init_manipulation = __esm({
    "../../node_modules/swiper/modules/manipulation.mjs"() {
    }
  });
  var init_effect_init = __esm({
    "../../node_modules/swiper/shared/effect-init.mjs"() {
    }
  });
  var init_effect_target = __esm({
    "../../node_modules/swiper/shared/effect-target.mjs"() {
      init_utils();
    }
  });
  var init_effect_virtual_transition_end = __esm({
    "../../node_modules/swiper/shared/effect-virtual-transition-end.mjs"() {
      init_utils();
    }
  });
  var init_effect_fade = __esm({
    "../../node_modules/swiper/modules/effect-fade.mjs"() {
      init_effect_init();
      init_effect_target();
      init_effect_virtual_transition_end();
      init_utils();
    }
  });
  var init_effect_cube = __esm({
    "../../node_modules/swiper/modules/effect-cube.mjs"() {
      init_effect_init();
      init_utils();
    }
  });
  var init_create_shadow = __esm({
    "../../node_modules/swiper/shared/create-shadow.mjs"() {
      init_utils();
    }
  });
  var init_effect_flip = __esm({
    "../../node_modules/swiper/modules/effect-flip.mjs"() {
      init_create_shadow();
      init_effect_init();
      init_effect_target();
      init_effect_virtual_transition_end();
      init_utils();
    }
  });
  var init_effect_coverflow = __esm({
    "../../node_modules/swiper/modules/effect-coverflow.mjs"() {
      init_create_shadow();
      init_effect_init();
      init_effect_target();
      init_utils();
    }
  });
  var init_effect_creative = __esm({
    "../../node_modules/swiper/modules/effect-creative.mjs"() {
      init_create_shadow();
      init_effect_init();
      init_effect_target();
      init_effect_virtual_transition_end();
      init_utils();
    }
  });
  var init_effect_cards = __esm({
    "../../node_modules/swiper/modules/effect-cards.mjs"() {
      init_create_shadow();
      init_effect_init();
      init_effect_target();
      init_effect_virtual_transition_end();
      init_utils();
    }
  });
  var init_modules = __esm({
    "../../node_modules/swiper/modules/index.mjs"() {
      init_virtual();
      init_keyboard();
      init_mousewheel();
      init_navigation();
      init_pagination();
      init_scrollbar();
      init_parallax();
      init_zoom();
      init_controller();
      init_a11y();
      init_history();
      init_hash_navigation();
      init_autoplay();
      init_thumbs();
      init_free_mode();
      init_grid();
      init_manipulation();
      init_effect_fade();
      init_effect_cube();
      init_effect_flip();
      init_effect_coverflow();
      init_effect_creative();
      init_effect_cards();
    }
  });
  function initializeSwiper({
    id,
    widgetSelector,
    prevButton = "swiper-button-prev",
    nextButton = "swiper-button-next",
    paramsOverrides
  }) {
    const prev = widgetSelector.parentNode.querySelector(`.${prevButton}`);
    const next = widgetSelector.parentNode.querySelector(`.${nextButton}`);
    if (!swiperContainer[id]) {
      swiperContainer[id] = {};
    }
    const swiperInstance = swiperContainer[id]?.instance;
    if (swiperInstance) {
      if (!swiperInstance.params?.enabled) {
        enableSwiper(id);
        return;
      }
      swiperInstance.destroy(true);
    } else {
      swiperContainer[id] = { pageIndex: 1 };
    }
    swiperContainer[id].instance = new Swiper(widgetSelector, {
      modules: [Navigation, Manipulation, Keyboard, Mousewheel],
      spaceBetween: 10,
      observer: true,
      grabCursor: true,
      allowTouchMove: true,
      direction: "horizontal",
      watchSlidesProgress: true,
      normalizeSlideIndex: true,
      watchOverflow: true,
      mousewheel: {
        enabled: false
      },
      navigation: {
        enabled: !!(prev && next),
        nextEl: next,
        prevEl: prev
      },
      resizeObserver: true,
      ...paramsOverrides
    });
  }
  function getSwiperIndexforTile(swiperSelector, tileId, lookupAttr) {
    const slideElements = swiperSelector.querySelectorAll(".swiper-slide");
    const index = (() => {
      if (lookupAttr) {
        return Array.from(slideElements).findIndex(
          (element) => element.getAttribute("data-id") === tileId && element.getAttribute(lookupAttr.name) === lookupAttr.value
        );
      }
      return Array.from(slideElements).findIndex((element) => element.getAttribute("data-id") === tileId);
    })();
    return index < 0 ? 0 : index;
  }
  function enableSwiper(id) {
    swiperContainer[id]?.instance?.enable();
  }
  function destroySwiper(id) {
    if (swiperContainer[id]?.instance) {
      swiperContainer[id].instance.destroy(true, true);
      delete swiperContainer[id];
    }
  }
  function getInstance(id) {
    return swiperContainer[id]?.instance;
  }
  function getActiveSlide(id) {
    return swiperContainer[id]?.instance?.realIndex || 0;
  }
  function getActiveSlideElement(id) {
    return swiperContainer[id]?.instance?.slides[getActiveSlide(id) || 0];
  }
  var swiperContainer;
  var init_swiper_extension = __esm({
    "src/libs/extensions/swiper/swiper.extension.ts"() {
      "use strict";
      init_swiper();
      init_modules();
      swiperContainer = {};
    }
  });
  function playTiktokVideo(frameWindow) {
    postTiktokMessage(frameWindow, "unMute");
    postTiktokMessage(frameWindow, "play");
  }
  function pauseTiktokVideo(frameWindow) {
    postTiktokMessage(frameWindow, "mute");
    postTiktokMessage(frameWindow, "pause");
    postTiktokMessage(frameWindow, "seekTo", 0);
  }
  function postTiktokMessage(frameWindow, type, value) {
    frameWindow.postMessage({ type, value, "x-tiktok-player": true }, "https://www.tiktok.com");
  }
  var init_tiktok_message = __esm({
    "src/libs/components/expanded-tile-swiper/tiktok-message.ts"() {
      "use strict";
    }
  });
  function initializeSwiperForExpandedTiles(initialTileId, lookupAttr) {
    const expandedTile = sdk.querySelector("expanded-tiles");
    if (!expandedTile) {
      throw new Error("The expanded tile element not found");
    }
    const widgetSelector = expandedTile.querySelector(".swiper-expanded");
    if (!widgetSelector) {
      throw new Error("Failed to find widget UI element. Failed to initialise Glide");
    }
    initializeSwiper({
      id: "expanded",
      widgetSelector,
      mode: "expanded",
      prevButton: "swiper-expanded-button-prev",
      nextButton: "swiper-expanded-button-next",
      paramsOverrides: {
        slidesPerView: 1,
        keyboard: {
          enabled: true,
          onlyInViewport: false
        },
        on: {
          beforeInit: (swiper) => {
            const tileIndex = initialTileId ? getSwiperIndexforTile(widgetSelector, initialTileId, lookupAttr) : 0;
            swiper.slideToLoop(tileIndex, 0, false);
          },
          navigationNext: controlVideoPlayback,
          navigationPrev: controlVideoPlayback
        }
      }
    });
  }
  function playMediaOnLoad() {
    const swiper = getInstance("expanded");
    if (swiper) {
      const activeElementData = getSwiperVideoElement(swiper, swiper.realIndex);
      triggerPlay(activeElementData);
    }
  }
  function controlVideoPlayback(swiper) {
    const activeElement = getSwiperVideoElement(swiper, swiper.realIndex);
    const previousElement = getSwiperVideoElement(swiper, swiper.previousIndex);
    triggerPlay(activeElement);
    triggerPause(previousElement);
  }
  function triggerPlay(elementData) {
    if (!elementData) {
      return;
    }
    switch (elementData.source) {
      case "video": {
        const videoElement = elementData.element;
        videoElement.play();
        break;
      }
      case "youtube": {
        const YoutubeContentWindow = elementData.element;
        YoutubeContentWindow.play();
        break;
      }
      case "tiktok": {
        const tiktokFrameWindow = elementData.element;
        playTiktokVideo(tiktokFrameWindow);
        break;
      }
      default:
        throw new Error(`unsupported video source ${elementData.source}`);
    }
  }
  function triggerPause(elementData) {
    if (!elementData) {
      return;
    }
    switch (elementData.source) {
      case "video": {
        const videoElement = elementData.element;
        videoElement.pause();
        videoElement.currentTime = 0;
        break;
      }
      case "youtube": {
        const YoutubeContentWindow = elementData.element;
        YoutubeContentWindow.pause();
        YoutubeContentWindow.reset();
        break;
      }
      case "tiktok": {
        const tiktokFrameWindow = elementData.element;
        pauseTiktokVideo(tiktokFrameWindow);
        break;
      }
      default:
        throw new Error(`unsupported video source ${elementData.source}`);
    }
  }
  function getSwiperVideoElement(swiper, index) {
    const element = swiper.slides[index];
    const tileId = element.getAttribute("data-id");
    const youtubeId = element.getAttribute("data-yt-id");
    if (youtubeId) {
      const youtubeFrame = element.querySelector(`iframe#yt-frame-${tileId}-${youtubeId}`);
      if (youtubeFrame) {
        return { element: youtubeFrame.contentWindow, source: "youtube" };
      }
    }
    const tiktokId = element.getAttribute("data-tiktok-id");
    if (tiktokId) {
      const tiktokFrame = element.querySelector(`iframe#tiktok-frame-${tileId}-${tiktokId}`);
      if (tiktokFrame && tiktokFrame.contentWindow) {
        return { element: tiktokFrame.contentWindow, source: "tiktok" };
      }
    }
    const videoElement = element.querySelector(".panel .panel-left .video-content-wrapper video");
    if (videoElement) {
      return { element: videoElement, source: "video" };
    }
    return void 0;
  }
  function onTileExpand(tileId) {
    const expandedTile = sdk.querySelector("expanded-tiles");
    if (!expandedTile) {
      throw new Error("The expanded tile element not found");
    }
    expandedTile.parentElement.classList.add("expanded-tile-overlay");
    waitForElm(expandedTile, [".swiper-expanded"], () => {
      const tileElement = expandedTile.shadowRoot?.querySelector(`.swiper-slide[data-id="${tileId}"]`);
      const youtubeId = tileElement?.getAttribute("data-yt-id");
      const tiktokId = tileElement?.getAttribute("data-tiktok-id");
      if (youtubeId) {
        const lookupYtAttr = { name: "data-yt-id", value: youtubeId };
        initializeSwiperForExpandedTiles(tileId, lookupYtAttr);
      } else if (tiktokId) {
        const lookupTiktokAttr = { name: "data-tiktok-id", value: tiktokId };
        initializeSwiperForExpandedTiles(tileId, lookupTiktokAttr);
      } else {
        initializeSwiperForExpandedTiles(tileId);
      }
    });
  }
  function onTileRendered() {
    const expandedTilesElement = sdk.querySelector("expanded-tiles");
    if (!expandedTilesElement) {
      throw new Error("Expanded tiles element not found");
    }
    const tiles = expandedTilesElement.querySelectorAll(".swiper-slide");
    const widgetSelector = expandedTilesElement.querySelector(".swiper-expanded");
    if (!widgetSelector) {
      throw new Error("Widget selector for expanded tile (swiper-expanded) is not found");
    }
    setupTikTokPlayerReadyEvent();
    tiles?.forEach((tile) => {
      setupVideoEvents(tile, widgetSelector);
      setupYoutubeEvents(tile, widgetSelector);
    });
  }
  function reduceBackgroundControlsVisibility(sourceId) {
    if (!isValidEventSource(sourceId)) {
      return;
    }
    const expandedTilesElement = sdk.querySelector("expanded-tiles");
    const wrapper = expandedTilesElement.querySelector(".expanded-tile-wrapper");
    if (!wrapper) {
      return;
    }
    const navigationPrevButton = wrapper.querySelector(".swiper-expanded-button-prev");
    const navigationNextButton = wrapper.querySelector(".swiper-expanded-button-next");
    const exitTileButton = wrapper.querySelector(".exit");
    navigationNextButton?.classList.add("swiper-button-disabled");
    navigationPrevButton?.classList.add("swiper-button-disabled");
    if (exitTileButton) {
      exitTileButton.style.opacity = "0.4";
    }
  }
  function resetBackgroundControlsVisibility(sourceId) {
    if (!isValidEventSource(sourceId)) {
      return;
    }
    const expandedTilesElement = sdk.querySelector("expanded-tiles");
    const wrapper = expandedTilesElement.querySelector(".expanded-tile-wrapper");
    if (!wrapper) {
      return;
    }
    const navigationPrevButton = wrapper.querySelector(".swiper-expanded-button-prev");
    const navigationNextButton = wrapper.querySelector(".swiper-expanded-button-next");
    const exitTileButton = wrapper.querySelector(".exit");
    navigationNextButton?.classList.remove("swiper-button-disabled");
    navigationPrevButton?.classList.remove("swiper-button-disabled");
    if (exitTileButton) {
      exitTileButton.removeAttribute("style");
    }
  }
  function isValidEventSource(sourceId) {
    const activeSlideElement = getActiveSlideElement("expanded");
    return activeSlideElement?.getAttribute("data-id") === sourceId;
  }
  function setupVideoEvents(tile, widgetSelector) {
    const videoSourceElement = tile.querySelector("video.video-content > source");
    if (videoSourceElement) {
      videoSourceElement.addEventListener("load", () => {
        playActiveMediaTileOnLoad(tile, widgetSelector);
      });
      videoSourceElement.addEventListener("error", () => {
        videoSourceElement.closest(".video-content-wrapper")?.classList.add("hidden");
        tile.querySelector(".video-fallback-content")?.classList.remove("hidden");
      });
    }
  }
  function setupYoutubeEvents(tile, widgetSelector) {
    const tileId = tile.getAttribute("data-id");
    const youtubeId = tile.getAttribute("data-yt-id");
    if (youtubeId && tileId) {
      const youtubeFrame = tile.querySelector(`iframe#yt-frame-${tileId}-${youtubeId}`);
      youtubeFrame?.addEventListener("load", () => {
        playActiveMediaTileOnLoad(tile, widgetSelector, { name: "data-yt-id", value: youtubeId });
      });
      youtubeFrame?.addEventListener("yt-video-error", () => {
        youtubeFrame.closest(".video-content-wrapper")?.classList.add("hidden");
        tile.querySelector(".video-fallback-content")?.classList.remove("hidden");
      });
    }
  }
  function setupTikTokPlayerReadyEvent() {
    tiktokDefaultPlayed = false;
    window.onmessage = (event2) => {
      if (event2.data["x-tiktok-player"] && event2.data.type === "onPlayerReady") {
        const frameWindow = event2.source;
        pauseTiktokVideo(frameWindow);
        if (!tiktokDefaultPlayed) {
          tiktokDefaultPlayed = true;
          setTimeout(() => playMediaOnLoad(), 300);
        }
      }
    };
  }
  function playActiveMediaTileOnLoad(tile, widgetSelector, lookupAttr) {
    if (isActiveTile(tile, widgetSelector, lookupAttr)) {
      playMediaOnLoad();
    }
  }
  function isActiveTile(tile, widgetSelector, lookupAttr) {
    const tileId = tile.getAttribute("data-id");
    const tileIndex = tileId ? getSwiperIndexforTile(widgetSelector, tileId, lookupAttr) : 0;
    return getActiveSlide("expanded") === tileIndex;
  }
  function onTileClosed() {
    const expandedTile = sdk.querySelector("expanded-tiles");
    if (!expandedTile) {
      throw new Error("The expanded tile element not found");
    }
    expandedTile.parentElement.classList.remove("expanded-tile-overlay");
    destroySwiper("expanded");
  }
  var tiktokDefaultPlayed;
  var init_expanded_swiper_loader = __esm({
    "src/libs/components/expanded-tile-swiper/expanded-swiper.loader.ts"() {
      "use strict";
      init_swiper_extension();
      init_widget_features();
      init_tiktok_message();
      tiktokDefaultPlayed = false;
    }
  });
  function onExpandedTileCrossSellersRendered(tileId, target) {
    if (target) {
      const swiperCrossSell = target.querySelector(".swiper-expanded-product-recs");
      if (swiperCrossSell) {
        initializeSwiper({
          id: `expanded-product-recs-${tileId}`,
          mode: "expanded-product-recs",
          widgetSelector: swiperCrossSell,
          prevButton: "swiper-exp-product-recs-button-prev",
          nextButton: "swiper-exp-product-recs-button-next",
          paramsOverrides: {
            slidesPerView: "auto",
            mousewheel: {
              enabled: false
            },
            grabCursor: false,
            on: {
              beforeInit: (swiper) => {
                swiper.slideToLoop(0, 0, false);
              }
            }
          }
        });
      }
    }
  }
  var init_product_recs_swiper_loader = __esm({
    "src/libs/components/expanded-tile-swiper/product-recs-swiper.loader.ts"() {
      "use strict";
      init_swiper_extension();
    }
  });
  function addAutoAddTileFeature() {
    const { auto_refresh } = sdk.getStyleConfig();
    if (Boolean(auto_refresh) === true) {
      sdk.tiles.enableAutoAddNewTiles();
    }
  }
  function loadWidgetIsEnabled() {
    if (isEnabled()) {
      return true;
    }
    const ugcContainer = sdk.querySelector("#nosto-ugc-container");
    if (!ugcContainer) {
      throw new Error("Failed to find Nosto UGC container");
    }
    ugcContainer.style.display = "none";
    throw new Error("Widget is not enabled");
  }
  function loadExpandedTileFeature() {
    const widgetContainer = sdk.getStyleConfig();
    const { click_through_url } = widgetContainer;
    if (click_through_url === "[EXPAND]") {
      loadExpandSettingComponents();
      registerTileExpandListener(onTileExpand);
      registerGenericEventListener(EXPANDED_TILE_CLOSE, onTileClosed);
      registerGenericEventListener(EVENT_TILE_EXPAND_RENDERED, onTileRendered);
      registerShareMenuOpenedListener(reduceBackgroundControlsVisibility);
      registerShareMenuClosedListener(resetBackgroundControlsVisibility);
      registerCrossSellersLoadListener(onExpandedTileCrossSellersRendered);
    } else if (click_through_url === "[ORIGINAL_URL]" || /^https?:\/\/.+/.test(click_through_url ?? "")) {
      registerDefaultClickEvents();
    } else if (click_through_url === "[CUSTOM]") {
      alert("Custom URL integration Not implemented yet");
    }
  }
  function loadMore() {
    if (window.__isLoading) {
      return;
    }
    window.__isLoading = true;
    const loadMoreButton = getLoadMoreButton();
    sdk.triggerEvent(EVENT_LOAD_MORE);
    if (!sdk.tiles.hasMorePages()) {
      loadMoreButton.classList.add("hidden");
    }
    setTimeout(() => {
      window.__isLoading = false;
    }, 500);
  }
  function addLoadMoreButtonFeature() {
    const { load_more_type } = sdk.getStyleConfig();
    const loadMoreType = load_more_type;
    switch (loadMoreType) {
      case "button":
        attachLoadMoreButtonListener();
        sdk.addEventListener(EVENT_TILES_UPDATED, () => {
          const loadMoreLoader = getLoadMoreLoader();
          const loadMoreButton = getLoadMoreButton();
          loadMoreLoader.classList.add("hidden");
          loadMoreButton.classList.remove("hidden");
        });
        break;
      case "scroll":
        disableLoadMoreButtonIfExists();
        sdk.addEventListener(EVENT_TILES_UPDATED, () => {
          const loadMoreLoader = getLoadMoreLoader();
          loadMoreLoader.classList.add("hidden");
        });
        useInfiniteScroller_default(sdk, window, loadMoreWrappedWithEasedLoader);
        break;
      case "static":
        disableLoadMoreLoaderIfExists();
        disableLoadMoreButtonIfExists();
        break;
      default:
        throw new Error("Invalid load more type");
    }
    if (!sdk.tiles.hasMorePages()) {
      disableLoadMoreButtonIfExists();
      disableLoadMoreLoaderIfExists();
    }
  }
  function attachLoadMoreButtonListener() {
    const loadMoreButton = getLoadMoreButton();
    loadMoreButton.onclick = loadMoreWrappedWithEasedLoader;
  }
  function disableLoadMoreButtonIfExists() {
    const loadMoreButton = getLoadMoreButton();
    loadMoreButton.classList.add("hidden");
  }
  function disableLoadMoreLoaderIfExists() {
    getLoadMoreLoader().classList.add("hidden");
  }
  function hideAllTilesAfterNTiles(numberTiles) {
    const tiles = sdk.querySelectorAll(".ugc-tile");
    if (!tiles) {
      throw new Error("Failed to find tiles");
    }
    tiles.forEach((tile, index) => {
      if (index >= numberTiles) {
        tile.classList.add("hidden");
      }
    });
  }
  function addTilesPerPageFeature() {
    const { enable_custom_tiles_per_page, tiles_per_page } = sdk.getStyleConfig();
    if (enable_custom_tiles_per_page) {
      sdk.tiles.setVisibleTilesCount(parseInt(tiles_per_page));
      hideAllTilesAfterNTiles(parseInt(tiles_per_page));
    } else {
      sdk.tiles.setVisibleTilesCount(40);
    }
  }
  function loadTitle() {
    const widgetTitle = document.createElement("p");
    const widgetContainer = sdk.placement.getWidgetContainer();
    const title = widgetContainer.title;
    if (title) {
      widgetTitle.innerHTML = title;
    }
  }
  function waitForElm(parent, targets, callback) {
    if (targets.every((it) => !!parent.querySelector(it))) {
      callback(targets.map((it) => parent.querySelector(it)));
    }
    const observer = new MutationObserver((_, observer2) => {
      if (targets.every((it) => !!parent.querySelector(it))) {
        observer2.disconnect();
        callback(targets.map((it) => parent.querySelector(it)));
      }
    });
    observer.observe(parent, {
      childList: true,
      subtree: true
    });
  }
  var getNextNavigatedTile;
  var getNextTile;
  var getPreviousTile;
  var arrowClickListener;
  var getLoadMoreButton;
  var getLoadMoreLoader;
  var loadMoreWrappedWithEasedLoader;
  var init_widget_features = __esm({
    "src/libs/widget.features.ts"() {
      "use strict";
      init_src();
      init_widget_components();
      init_widget_layout();
      init_hooks();
      init_expanded_swiper_loader();
      init_product_recs_swiper_loader();
      getNextNavigatedTile = (currentTile, enabledTiles, direction) => {
        const currentIndex = enabledTiles.findIndex((tile) => tile.getAttribute("data-id") === currentTile.id);
        if (direction === "previous") {
          const previousTile = getPreviousTile(enabledTiles, currentIndex);
          if (!previousTile) {
            throw new Error("Failed to find previous tile");
          }
          return previousTile.getAttribute("data-id");
        } else if (direction === "next") {
          const nextTile = getNextTile(enabledTiles, currentIndex);
          if (!nextTile) {
            throw new Error("Failed to find next tile");
          }
          return nextTile.getAttribute("data-id");
        }
        return null;
      };
      getNextTile = (enabledTiles, currentIndex) => enabledTiles[currentIndex + 1];
      getPreviousTile = (enabledTiles, currentIndex) => enabledTiles[currentIndex - 1];
      arrowClickListener = (e) => {
        if (!e.target) {
          throw new Error("Failed to find target element for arrow click listener");
        }
        const target = e.target;
        const type = target.classList.contains("tile-arrows-left") ? "previous" : "next";
        const currentTile = sdk.tiles.getTile();
        if (!currentTile) {
          throw new Error("Failed to find current tile");
        }
        const tilesAsHtml = sdk.querySelectorAll(".ugc-tile");
        if (!tilesAsHtml) {
          throw new Error("Failed to find tiles for arrow initialisation");
        }
        const tilesAsHtmlArray = Array.from(tilesAsHtml);
        const tileId = getNextNavigatedTile(currentTile, tilesAsHtmlArray, type);
        const tilesStore = Object.values(sdk.tiles.tiles);
        const tileData = {
          tileData: tilesStore.find((tile) => tile.id === tileId),
          widgetId: sdk.placement.getWidgetId(),
          filterId: sdk.placement.getWidgetContainer().widgetOptions?.filter_id
        };
        sdk.triggerEvent(EXPANDED_TILE_CLOSE);
        sdk.triggerEvent(EVENT_TILE_EXPAND, tileData);
      };
      getLoadMoreButton = () => {
        const loadMoreComponent = sdk.querySelector("load-more");
        if (!loadMoreComponent) {
          throw new Error("Failed to find load more component");
        }
        const loadMoreButton = loadMoreComponent?.querySelector("#load-more");
        if (!loadMoreButton) {
          throw new Error("Failed to find load more button");
        }
        return loadMoreButton;
      };
      getLoadMoreLoader = () => {
        const loadMoreLoader = sdk.querySelector("#load-more-loader");
        if (!loadMoreLoader) {
          throw new Error("Failed to find load more loader");
        }
        return loadMoreLoader;
      };
      loadMoreWrappedWithEasedLoader = () => {
        const loadMoreButton = getLoadMoreButton();
        loadMoreButton.classList.add("hidden");
        const loadMoreLoader = getLoadMoreLoader();
        loadMoreLoader.classList.remove("hidden");
        loadMore();
      };
    }
  });
  var init_widget_utils = __esm({
    "src/libs/widget.utils.ts"() {
      "use strict";
    }
  });
  function handleAllTileImageRendered() {
    const tileLoadingElements = sdk.placement.getShadowRoot().querySelectorAll(".grid-item .tile-loading.loading");
    tileLoadingElements?.forEach((element) => element.classList.remove("loading"));
    const loadMoreHiddenElement = sdk.placement.getShadowRoot().querySelector("#buttons > #load-more.hidden");
    loadMoreHiddenElement?.classList.remove(".hidden");
  }
  function getGridItemRowIds() {
    const gridItems = sdk.placement.getShadowRoot().querySelectorAll(".grid-item:not(hidden)[row-id]");
    const allRowIds = Array.from(gridItems).map((item) => item.getAttribute("row-id")).filter((rowIdString) => rowIdString && !Number.isNaN(+rowIdString)).map((rowId) => +rowId);
    return [...new Set(allRowIds)];
  }
  function handleTileImageError(tileWithError) {
    const errorTileRowIdString = tileWithError.getAttribute("row-id");
    tileWithError.classList.remove("grid-item");
    tileWithError.classList.remove("ugc-tile");
    tileWithError.classList.add("grid-item-error");
    tileWithError.classList.add("ugc-tile-error");
    tileWithError.classList.add("hidden");
    if (!errorTileRowIdString || Number.isNaN(+errorTileRowIdString)) {
      return;
    }
    const errorTileRowId = +errorTileRowIdString;
    const uniqueRowIds = getGridItemRowIds();
    const rowIdSelectors = uniqueRowIds.filter((rowId) => rowId >= errorTileRowId).map((matched) => `[row-id="${matched}"]`);
    const matchedGridItems = Array.from(
      sdk.placement.getShadowRoot().querySelectorAll(`.grid-item:is(${rowIdSelectors})`)
    );
    resizeTiles(matchedGridItems);
  }
  function renderMasonryLayout(reset = false, resize = false) {
    if (resize || reset) {
      screenWidth = 0;
    }
    const ugcContainer = sdk.querySelector("#nosto-ugc-container");
    if (!ugcContainer) {
      throw new Error("Failed to find Nosto UGC container");
    }
    const currentScreenWidth = ugcContainer.clientWidth;
    if (currentScreenWidth === 0) {
      return;
    }
    if (resize && previousWidthHandled === currentScreenWidth) {
      return;
    }
    if (screenWidth == 0) {
      screenWidth = currentScreenWidth;
      previousWidthHandled = currentScreenWidth;
    }
    const allTiles = Array.from(sdk.querySelectorAll(".grid-item") ?? []);
    const ugcTiles = reset || resize ? allTiles : allTiles.filter(
      (tile) => tile.getAttribute("width-set") !== "true" && tile.getAttribute("set-for-width") !== screenWidth.toString()
    );
    resizeTiles(ugcTiles);
  }
  function resizeTiles(ugcTiles) {
    if (!ugcTiles || ugcTiles.length === 0) {
      return;
    }
    ugcTiles.forEach((tile) => {
      const randomFlexGrow = Math.random() * 2 + 1;
      const randomWidth = Math.random() * 200 + 150;
      tile.style.flex = `${randomFlexGrow} 1 auto`;
      tile.style.width = `${randomWidth}px`;
      tile.setAttribute("width-set", "true");
      tile.setAttribute("set-for-width", screenWidth.toString());
    });
  }
  var screenWidth;
  var previousWidthHandled;
  var init_masonry_extension = __esm({
    "src/libs/extensions/masonry/masonry.extension.ts"() {
      "use strict";
      screenWidth = 0;
      previousWidthHandled = 0;
    }
  });
  var font_default;
  var init_font = __esm({
    "src/libs/extensions/swiper/font.scss"() {
      "use strict";
      font_default = `@font-face {
  font-family: swiper-icons;
  src: url("data:application/font-woff;charset=utf-8;base64, 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");
  font-weight: 400;
  font-style: normal;
}`;
    }
  });
  var swiper_bundle_default;
  var init_swiper_bundle = __esm({
    "../../node_modules/swiper/swiper-bundle.css"() {
      swiper_bundle_default = `/**
 * Swiper 11.1.14
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2024 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 12, 2024
 */

/* FONT_START */
@font-face {
  font-family: 'swiper-icons';
  src: url('data:application/font-woff;charset=utf-8;base64, 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');
  font-weight: 400;
  font-style: normal;
}
/* FONT_END */
:root {
  --swiper-theme-color: #007aff;
  /*
  --swiper-preloader-color: var(--swiper-theme-color);
  --swiper-wrapper-transition-timing-function: initial;
  */
}
:host {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
}
.swiper {
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  list-style: none;
  padding: 0;
  /* Fix of Webkit flickering */
  z-index: 1;
  display: block;
}
.swiper-vertical > .swiper-wrapper {
  flex-direction: column;
}
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  transition-timing-function: var(--swiper-wrapper-transition-timing-function, initial);
  box-sizing: content-box;
}
.swiper-android .swiper-slide,
.swiper-ios .swiper-slide,
.swiper-wrapper {
  transform: translate3d(0px, 0, 0);
}
.swiper-horizontal {
  touch-action: pan-y;
}
.swiper-vertical {
  touch-action: pan-x;
}
.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
  display: block;
}
.swiper-slide-invisible-blank {
  visibility: hidden;
}
/* Auto Height */
.swiper-autoheight,
.swiper-autoheight .swiper-slide {
  height: auto;
}
.swiper-autoheight .swiper-wrapper {
  align-items: flex-start;
  transition-property: transform, height;
}
.swiper-backface-hidden .swiper-slide {
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}
/* 3D Effects */
.swiper-3d.swiper-css-mode .swiper-wrapper {
  perspective: 1200px;
}
.swiper-3d .swiper-wrapper {
  transform-style: preserve-3d;
}
.swiper-3d {
  perspective: 1200px;
}
.swiper-3d .swiper-slide,
.swiper-3d .swiper-cube-shadow {
  transform-style: preserve-3d;
}
/* CSS Mode */
.swiper-css-mode > .swiper-wrapper {
  overflow: auto;
  scrollbar-width: none;
  /* For Firefox */
  -ms-overflow-style: none;
  /* For Internet Explorer and Edge */
}
.swiper-css-mode > .swiper-wrapper::-webkit-scrollbar {
  display: none;
}
.swiper-css-mode > .swiper-wrapper > .swiper-slide {
  scroll-snap-align: start start;
}
.swiper-css-mode.swiper-horizontal > .swiper-wrapper {
  scroll-snap-type: x mandatory;
}
.swiper-css-mode.swiper-vertical > .swiper-wrapper {
  scroll-snap-type: y mandatory;
}
.swiper-css-mode.swiper-free-mode > .swiper-wrapper {
  scroll-snap-type: none;
}
.swiper-css-mode.swiper-free-mode > .swiper-wrapper > .swiper-slide {
  scroll-snap-align: none;
}
.swiper-css-mode.swiper-centered > .swiper-wrapper::before {
  content: '';
  flex-shrink: 0;
  order: 9999;
}
.swiper-css-mode.swiper-centered > .swiper-wrapper > .swiper-slide {
  scroll-snap-align: center center;
  scroll-snap-stop: always;
}
.swiper-css-mode.swiper-centered.swiper-horizontal > .swiper-wrapper > .swiper-slide:first-child {
  margin-inline-start: var(--swiper-centered-offset-before);
}
.swiper-css-mode.swiper-centered.swiper-horizontal > .swiper-wrapper::before {
  height: 100%;
  min-height: 1px;
  width: var(--swiper-centered-offset-after);
}
.swiper-css-mode.swiper-centered.swiper-vertical > .swiper-wrapper > .swiper-slide:first-child {
  margin-block-start: var(--swiper-centered-offset-before);
}
.swiper-css-mode.swiper-centered.swiper-vertical > .swiper-wrapper::before {
  width: 100%;
  min-width: 1px;
  height: var(--swiper-centered-offset-after);
}
/* Slide styles start */
/* 3D Shadows */
.swiper-3d .swiper-slide-shadow,
.swiper-3d .swiper-slide-shadow-left,
.swiper-3d .swiper-slide-shadow-right,
.swiper-3d .swiper-slide-shadow-top,
.swiper-3d .swiper-slide-shadow-bottom,
.swiper-3d .swiper-slide-shadow,
.swiper-3d .swiper-slide-shadow-left,
.swiper-3d .swiper-slide-shadow-right,
.swiper-3d .swiper-slide-shadow-top,
.swiper-3d .swiper-slide-shadow-bottom {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}
.swiper-3d .swiper-slide-shadow {
  background: rgba(0, 0, 0, 0.15);
}
.swiper-3d .swiper-slide-shadow-left {
  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
.swiper-3d .swiper-slide-shadow-right {
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
.swiper-3d .swiper-slide-shadow-top {
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
.swiper-3d .swiper-slide-shadow-bottom {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}
.swiper-lazy-preloader {
  width: 42px;
  height: 42px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -21px;
  margin-top: -21px;
  z-index: 10;
  transform-origin: 50%;
  box-sizing: border-box;
  border: 4px solid var(--swiper-preloader-color, var(--swiper-theme-color));
  border-radius: 50%;
  border-top-color: transparent;
}
.swiper:not(.swiper-watch-progress) .swiper-lazy-preloader,
.swiper-watch-progress .swiper-slide-visible .swiper-lazy-preloader {
  animation: swiper-preloader-spin 1s infinite linear;
}
.swiper-lazy-preloader-white {
  --swiper-preloader-color: #fff;
}
.swiper-lazy-preloader-black {
  --swiper-preloader-color: #000;
}
@keyframes swiper-preloader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* Slide styles end */
.swiper-virtual .swiper-slide {
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}
.swiper-virtual.swiper-css-mode .swiper-wrapper::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}
.swiper-virtual.swiper-css-mode.swiper-horizontal .swiper-wrapper::after {
  height: 1px;
  width: var(--swiper-virtual-size);
}
.swiper-virtual.swiper-css-mode.swiper-vertical .swiper-wrapper::after {
  width: 1px;
  height: var(--swiper-virtual-size);
}
:root {
  --swiper-navigation-size: 44px;
  /*
  --swiper-navigation-top-offset: 50%;
  --swiper-navigation-sides-offset: 10px;
  --swiper-navigation-color: var(--swiper-theme-color);
  */
}
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: var(--swiper-navigation-top-offset, 50%);
  width: calc(var(--swiper-navigation-size) / 44 * 27);
  height: var(--swiper-navigation-size);
  margin-top: calc(0px - (var(--swiper-navigation-size) / 2));
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--swiper-navigation-color, var(--swiper-theme-color));
}
.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0.35;
  cursor: auto;
  pointer-events: none;
}
.swiper-button-prev.swiper-button-hidden,
.swiper-button-next.swiper-button-hidden {
  opacity: 0;
  cursor: auto;
  pointer-events: none;
}
.swiper-navigation-disabled .swiper-button-prev,
.swiper-navigation-disabled .swiper-button-next {
  display: none !important;
}
.swiper-button-prev svg,
.swiper-button-next svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform-origin: center;
}
.swiper-rtl .swiper-button-prev svg,
.swiper-rtl .swiper-button-next svg {
  transform: rotate(180deg);
}
.swiper-button-prev,
.swiper-rtl .swiper-button-next {
  left: var(--swiper-navigation-sides-offset, 10px);
  right: auto;
}
.swiper-button-next,
.swiper-rtl .swiper-button-prev {
  right: var(--swiper-navigation-sides-offset, 10px);
  left: auto;
}
.swiper-button-lock {
  display: none;
}
/* Navigation font start */
.swiper-button-prev:after,
.swiper-button-next:after {
  font-family: swiper-icons;
  font-size: var(--swiper-navigation-size);
  text-transform: none !important;
  letter-spacing: 0;
  font-variant: initial;
  line-height: 1;
}
.swiper-button-prev:after,
.swiper-rtl .swiper-button-next:after {
  content: 'prev';
}
.swiper-button-next,
.swiper-rtl .swiper-button-prev {
  right: var(--swiper-navigation-sides-offset, 10px);
  left: auto;
}
.swiper-button-next:after,
.swiper-rtl .swiper-button-prev:after {
  content: 'next';
}
/* Navigation font end */
:root {
  /*
  --swiper-pagination-color: var(--swiper-theme-color);
  --swiper-pagination-left: auto;
  --swiper-pagination-right: 8px;
  --swiper-pagination-bottom: 8px;
  --swiper-pagination-top: auto;
  --swiper-pagination-fraction-color: inherit;
  --swiper-pagination-progressbar-bg-color: rgba(0,0,0,0.25);
  --swiper-pagination-progressbar-size: 4px;
  --swiper-pagination-bullet-size: 8px;
  --swiper-pagination-bullet-width: 8px;
  --swiper-pagination-bullet-height: 8px;
  --swiper-pagination-bullet-border-radius: 50%;
  --swiper-pagination-bullet-inactive-color: #000;
  --swiper-pagination-bullet-inactive-opacity: 0.2;
  --swiper-pagination-bullet-opacity: 1;
  --swiper-pagination-bullet-horizontal-gap: 4px;
  --swiper-pagination-bullet-vertical-gap: 6px;
  */
}
.swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 300ms opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
}
.swiper-pagination.swiper-pagination-hidden {
  opacity: 0;
}
.swiper-pagination-disabled > .swiper-pagination,
.swiper-pagination.swiper-pagination-disabled {
  display: none !important;
}
/* Common Styles */
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: var(--swiper-pagination-bottom, 8px);
  top: var(--swiper-pagination-top, auto);
  left: 0;
  width: 100%;
}
/* Bullets */
.swiper-pagination-bullets-dynamic {
  overflow: hidden;
  font-size: 0;
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transform: scale(0.33);
  position: relative;
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {
  transform: scale(1);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {
  transform: scale(1);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
  transform: scale(0.66);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
  transform: scale(0.33);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {
  transform: scale(0.66);
}
.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next {
  transform: scale(0.33);
}
.swiper-pagination-bullet {
  width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 8px));
  height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 8px));
  display: inline-block;
  border-radius: var(--swiper-pagination-bullet-border-radius, 50%);
  background: var(--swiper-pagination-bullet-inactive-color, #000);
  opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2);
}
button.swiper-pagination-bullet {
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  -webkit-appearance: none;
          appearance: none;
}
.swiper-pagination-clickable .swiper-pagination-bullet {
  cursor: pointer;
}
.swiper-pagination-bullet:only-child {
  display: none !important;
}
.swiper-pagination-bullet-active {
  opacity: var(--swiper-pagination-bullet-opacity, 1);
  background: var(--swiper-pagination-color, var(--swiper-theme-color));
}
.swiper-vertical > .swiper-pagination-bullets,
.swiper-pagination-vertical.swiper-pagination-bullets {
  right: var(--swiper-pagination-right, 8px);
  left: var(--swiper-pagination-left, auto);
  top: 50%;
  transform: translate3d(0px, -50%, 0);
}
.swiper-vertical > .swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: var(--swiper-pagination-bullet-vertical-gap, 6px) 0;
  display: block;
}
.swiper-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic,
.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
}
.swiper-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,
.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  display: inline-block;
  transition: 200ms transform,
        200ms top;
}
.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 4px);
}
.swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic,
.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
.swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transition: 200ms transform,
        200ms left;
}
.swiper-horizontal.swiper-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
  transition: 200ms transform,
    200ms right;
}
/* Fraction */
.swiper-pagination-fraction {
  color: var(--swiper-pagination-fraction-color, inherit);
}
/* Progress */
.swiper-pagination-progressbar {
  background: var(--swiper-pagination-progressbar-bg-color, rgba(0, 0, 0, 0.25));
  position: absolute;
}
.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: var(--swiper-pagination-color, var(--swiper-theme-color));
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transform-origin: left top;
}
.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  transform-origin: right top;
}
.swiper-horizontal > .swiper-pagination-progressbar,
.swiper-pagination-progressbar.swiper-pagination-horizontal,
.swiper-vertical > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,
.swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite {
  width: 100%;
  height: var(--swiper-pagination-progressbar-size, 4px);
  left: 0;
  top: 0;
}
.swiper-vertical > .swiper-pagination-progressbar,
.swiper-pagination-progressbar.swiper-pagination-vertical,
.swiper-horizontal > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,
.swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite {
  width: var(--swiper-pagination-progressbar-size, 4px);
  height: 100%;
  left: 0;
  top: 0;
}
.swiper-pagination-lock {
  display: none;
}
:root {
  /*
  --swiper-scrollbar-border-radius: 10px;
  --swiper-scrollbar-top: auto;
  --swiper-scrollbar-bottom: 4px;
  --swiper-scrollbar-left: auto;
  --swiper-scrollbar-right: 4px;
  --swiper-scrollbar-sides-offset: 1%;
  --swiper-scrollbar-bg-color: rgba(0, 0, 0, 0.1);
  --swiper-scrollbar-drag-bg-color: rgba(0, 0, 0, 0.5);
  --swiper-scrollbar-size: 4px;
  */
}
.swiper-scrollbar {
  border-radius: var(--swiper-scrollbar-border-radius, 10px);
  position: relative;
  touch-action: none;
  background: var(--swiper-scrollbar-bg-color, rgba(0, 0, 0, 0.1));
}
.swiper-scrollbar-disabled > .swiper-scrollbar,
.swiper-scrollbar.swiper-scrollbar-disabled {
  display: none !important;
}
.swiper-horizontal > .swiper-scrollbar,
.swiper-scrollbar.swiper-scrollbar-horizontal {
  position: absolute;
  left: var(--swiper-scrollbar-sides-offset, 1%);
  bottom: var(--swiper-scrollbar-bottom, 4px);
  top: var(--swiper-scrollbar-top, auto);
  z-index: 50;
  height: var(--swiper-scrollbar-size, 4px);
  width: calc(100% - 2 * var(--swiper-scrollbar-sides-offset, 1%));
}
.swiper-vertical > .swiper-scrollbar,
.swiper-scrollbar.swiper-scrollbar-vertical {
  position: absolute;
  left: var(--swiper-scrollbar-left, auto);
  right: var(--swiper-scrollbar-right, 4px);
  top: var(--swiper-scrollbar-sides-offset, 1%);
  z-index: 50;
  width: var(--swiper-scrollbar-size, 4px);
  height: calc(100% - 2 * var(--swiper-scrollbar-sides-offset, 1%));
}
.swiper-scrollbar-drag {
  height: 100%;
  width: 100%;
  position: relative;
  background: var(--swiper-scrollbar-drag-bg-color, rgba(0, 0, 0, 0.5));
  border-radius: var(--swiper-scrollbar-border-radius, 10px);
  left: 0;
  top: 0;
}
.swiper-scrollbar-cursor-drag {
  cursor: move;
}
.swiper-scrollbar-lock {
  display: none;
}
/* Zoom container styles start */
.swiper-zoom-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.swiper-zoom-container > img,
.swiper-zoom-container > svg,
.swiper-zoom-container > canvas {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
/* Zoom container styles end */
.swiper-slide-zoomed {
  cursor: move;
  touch-action: none;
}
/* a11y */
.swiper .swiper-notification {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  opacity: 0;
  z-index: -1000;
}
.swiper-free-mode > .swiper-wrapper {
  transition-timing-function: ease-out;
  margin: 0 auto;
}
.swiper-grid > .swiper-wrapper {
  flex-wrap: wrap;
}
.swiper-grid-column > .swiper-wrapper {
  flex-wrap: wrap;
  flex-direction: column;
}
.swiper-fade.swiper-free-mode .swiper-slide {
  transition-timing-function: ease-out;
}
.swiper-fade .swiper-slide {
  pointer-events: none;
  transition-property: opacity;
}
.swiper-fade .swiper-slide .swiper-slide {
  pointer-events: none;
}
.swiper-fade .swiper-slide-active {
  pointer-events: auto;
}
.swiper-fade .swiper-slide-active .swiper-slide-active {
  pointer-events: auto;
}
.swiper.swiper-cube {
  overflow: visible;
}
.swiper-cube .swiper-slide {
  pointer-events: none;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  z-index: 1;
  visibility: hidden;
  transform-origin: 0 0;
  width: 100%;
  height: 100%;
}
.swiper-cube .swiper-slide .swiper-slide {
  pointer-events: none;
}
.swiper-cube.swiper-rtl .swiper-slide {
  transform-origin: 100% 0;
}
.swiper-cube .swiper-slide-active,
.swiper-cube .swiper-slide-active .swiper-slide-active {
  pointer-events: auto;
}
.swiper-cube .swiper-slide-active,
.swiper-cube .swiper-slide-next,
.swiper-cube .swiper-slide-prev {
  pointer-events: auto;
  visibility: visible;
}
.swiper-cube .swiper-cube-shadow {
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  z-index: 0;
}
.swiper-cube .swiper-cube-shadow:before {
  content: '';
  background: #000;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  filter: blur(50px);
}
.swiper-cube .swiper-slide-next + .swiper-slide {
  pointer-events: auto;
  visibility: visible;
}
/* Cube slide shadows start */
.swiper-cube .swiper-slide-shadow-cube.swiper-slide-shadow-top,
.swiper-cube .swiper-slide-shadow-cube.swiper-slide-shadow-bottom,
.swiper-cube .swiper-slide-shadow-cube.swiper-slide-shadow-left,
.swiper-cube .swiper-slide-shadow-cube.swiper-slide-shadow-right {
  z-index: 0;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}
/* Cube slide shadows end */
.swiper.swiper-flip {
  overflow: visible;
}
.swiper-flip .swiper-slide {
  pointer-events: none;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  z-index: 1;
}
.swiper-flip .swiper-slide .swiper-slide {
  pointer-events: none;
}
.swiper-flip .swiper-slide-active,
.swiper-flip .swiper-slide-active .swiper-slide-active {
  pointer-events: auto;
}
/* Flip slide shadows start */
.swiper-flip .swiper-slide-shadow-flip.swiper-slide-shadow-top,
.swiper-flip .swiper-slide-shadow-flip.swiper-slide-shadow-bottom,
.swiper-flip .swiper-slide-shadow-flip.swiper-slide-shadow-left,
.swiper-flip .swiper-slide-shadow-flip.swiper-slide-shadow-right {
  z-index: 0;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}
/* Flip slide shadows end */
.swiper-creative .swiper-slide {
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  overflow: hidden;
  transition-property: transform, opacity, height;
}
.swiper.swiper-cards {
  overflow: visible;
}
.swiper-cards .swiper-slide {
  transform-origin: center bottom;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  overflow: hidden;
}
`;
    }
  });
  var init_loader_extension = __esm({
    "src/libs/extensions/swiper/loader.extension.ts"() {
      "use strict";
    }
  });
  function loadSwiperStyles() {
    sdk.addWidgetCustomStyles(font_default);
    sdk.addSharedCssCustomStyles("swiper-bundle", swiper_bundle_default, [
      sdk.placement.getWidgetId(),
      "expanded-tiles",
      "ugc-products"
    ]);
  }
  var init_swiper2 = __esm({
    "src/libs/extensions/swiper/index.ts"() {
      "use strict";
      init_font();
      init_swiper_bundle();
      init_loader_extension();
      init_swiper_extension();
    }
  });
  var init_extensions = __esm({
    "src/libs/extensions/index.ts"() {
      "use strict";
      init_masonry_extension();
      init_swiper2();
    }
  });
  function EmbedYoutube({ tileId, videoId }) {
    const contentElement = loadYoutubeIframeContent(tileId, videoId);
    return /* @__PURE__ */ createElement(
      "iframe",
      {
        loading: "lazy",
        id: `yt-frame-${tileId}-${videoId}`,
        class: "video-content",
        frameborder: "0",
        srcdoc: contentElement.innerHTML
      }
    );
  }
  function loadYoutubeIframeContent(tileId, videoId) {
    const scriptId = `yt-script-${tileId}-${videoId}`;
    const playerId = `yt-player-${tileId}-${videoId}`;
    return /* @__PURE__ */ createElement("html", null, /* @__PURE__ */ createElement("head", null, /* @__PURE__ */ createElement("script", { id: scriptId, src: "https://www.youtube.com/iframe_api" }), /* @__PURE__ */ createElement("script", null, loadYoutubePlayerAPI(playerId, videoId))), /* @__PURE__ */ createElement("body", null, /* @__PURE__ */ createElement("div", { id: playerId })));
  }
  function loadYoutubePlayerAPI(playerId, videoId) {
    return `
  let player

  function loadPlayer(playDefault = false) {
    player = new YT.Player("${playerId}", {
      width: "100%",
      videoId: "${videoId}",
      playerVars: {
        playsinline: 1
      },
      events: {
        onReady: playDefault ? play : pause,
        onError: errorHandler
      }
    })
  }

  // API runs automatically once the iframe-api JS is downloaded.
  // This will not run when re-opening expanded tile
  function onYouTubeIframeAPIReady() {
    loadPlayer()
  }

  function errorHandler(e) {
   player?.getIframe().dispatchEvent(new CustomEvent("yt-video-error", { detail: e }))
  }

  function pause() {
    if (!player) {
      loadPlayer(false) //needed when expanded tile re-opened
    } else {
      player.mute()
      player.pauseVideo()
    }
  }

  function destroy() {
    player?.destroy()
  }

  function reset() {
    player?.seekTo(0, false)
  }

  function play() {
    if (!player) {
      loadPlayer(true) //needed when expanded tile re-opened
    } else {
     setTimeout(() => {
      if (player.isMuted()) {
        player.unMute()
      }
      player.playVideo()
      }, 500)
    }
  } `;
  }
  var init_embed_youtube_template = __esm({
    "src/libs/components/expanded-tile-swiper/embed-youtube.template.tsx"() {
      "use strict";
      init_libs();
    }
  });
  function ExpandedTile({ sdk: sdk2, tile }) {
    const { show_shopspots, show_products, show_tags, show_sharing, show_caption, show_timestamp } = sdk2.getExpandedTileConfig();
    const shopspotEnabled = sdk2.isComponentLoaded("shopspots") && show_shopspots && !!tile.hotspots?.length;
    const productsEnabled = sdk2.isComponentLoaded("products") && show_products && !!tile.tags_extended?.length;
    const tagsEnabled = show_tags;
    const sharingToolsEnabled = show_sharing;
    const parent = sdk2.getNodeId();
    return /* @__PURE__ */ createElement(createFragment, null, /* @__PURE__ */ createElement("div", { class: "panel" }, /* @__PURE__ */ createElement("div", { class: "panel-left" }, /* @__PURE__ */ createElement(IconSection, { tile, productsEnabled }), /* @__PURE__ */ createElement("div", { class: "image-wrapper" }, /* @__PURE__ */ createElement("div", { class: "image-wrapper-inner" }, tile.media === "video" ? /* @__PURE__ */ createElement(createFragment, null, /* @__PURE__ */ createElement(VideoContainer, { tile, parent }), /* @__PURE__ */ createElement(VideoErrorFallbackTemplate, { tile })) : tile.media === "image" ? /* @__PURE__ */ createElement(ImageTemplate, { tile, image: tile.image, shopspotEnabled, parent }) : tile.media === "text" ? /* @__PURE__ */ createElement("span", { class: "content-text" }, tile.message) : tile.media === "html" ? /* @__PURE__ */ createElement("span", { class: "content-html" }, tile.html) : /* @__PURE__ */ createElement(createFragment, null)))), /* @__PURE__ */ createElement("div", { class: "panel-right" }, /* @__PURE__ */ createElement("div", { class: "panel-right-wrapper" }, /* @__PURE__ */ createElement("div", { class: "content-wrapper" }, /* @__PURE__ */ createElement("div", { class: "content-inner-wrapper" }, /* @__PURE__ */ createElement(
      "tile-content",
      {
        tileId: tile.id,
        "render-share-menu": sharingToolsEnabled,
        "render-caption": show_caption,
        "render-timephrase": show_timestamp
      }
    ), tagsEnabled && /* @__PURE__ */ createElement("tile-tags", { "tile-id": tile.id, mode: "swiper", context: "expanded", "navigation-arrows": "true" }), productsEnabled && /* @__PURE__ */ createElement(createFragment, null, /* @__PURE__ */ createElement("ugc-products", { parent, "tile-id": tile.id }))))))));
  }
  function IconSection({ tile, productsEnabled }) {
    const topSectionIconContent = [];
    const bottomSectionIconContent = [];
    if (tile.attrs.includes("instagram.reel")) {
      topSectionIconContent.push(/* @__PURE__ */ createElement("div", { class: "content-icon icon-reel" }));
    } else if (tile.attrs.includes("youtube.short")) {
      topSectionIconContent.push(/* @__PURE__ */ createElement("div", { class: "content-icon icon-youtube-short" }));
    }
    if (productsEnabled) {
      topSectionIconContent.push(/* @__PURE__ */ createElement("div", { class: "shopping-icon icon-products" }));
    }
    bottomSectionIconContent.push(/* @__PURE__ */ createElement("div", { class: `network-icon icon-${tile.source}` }));
    return /* @__PURE__ */ createElement("div", { class: "icon-section" }, /* @__PURE__ */ createElement("div", { class: "top-section" }, ...topSectionIconContent), /* @__PURE__ */ createElement("div", { class: "bottom-section" }, ...bottomSectionIconContent));
  }
  function ShopSpotTemplate({ shopspotEnabled, parent, tileId }) {
    return shopspotEnabled ? /* @__PURE__ */ createElement(createFragment, null, /* @__PURE__ */ createElement("shopspot-icon", { parent, mode: "expanded", "tile-id": tileId })) : /* @__PURE__ */ createElement(createFragment, null);
  }
  function ImageTemplate({
    tile,
    image,
    shopspotEnabled = false,
    parent
  }) {
    return image ? /* @__PURE__ */ createElement(createFragment, null, /* @__PURE__ */ createElement("div", { class: "image-filler", style: { "background-image": `url('${image}')` } }), /* @__PURE__ */ createElement("div", { class: "image" }, shopspotEnabled ? /* @__PURE__ */ createElement(ShopSpotTemplate, { shopspotEnabled, parent, tileId: tile.id }) : /* @__PURE__ */ createElement(createFragment, null), /* @__PURE__ */ createElement("img", { class: "image-element", src: image, loading: "lazy", alt: tile.description || "Image" }))) : /* @__PURE__ */ createElement(createFragment, null);
  }
  function VideoContainer({ tile, parent }) {
    return /* @__PURE__ */ createElement("div", { class: "video-content-wrapper" }, /* @__PURE__ */ createElement("div", { class: "image-filler", style: { "background-image": `url('${tile.original_image_url}')` } }), /* @__PURE__ */ createElement(SourceVideoContent, { tile, parent }));
  }
  function SourceVideoContent({ tile, parent }) {
    if (tile.source === "tiktok" || tile.video_source === "tiktok") {
      return /* @__PURE__ */ createElement(TikTokTemplate, { tile });
    }
    if (tile.source === "youtube" && tile.youtube_id) {
      return /* @__PURE__ */ createElement(EmbedYoutube, { tileId: tile.id, videoId: tile.youtube_id });
    }
    if (tile.source === "facebook") {
      const videoUrlPattern = /videos\/(\d)+?/;
      if (!tile.video_files?.length || !videoUrlPattern.test(tile.video_files[0].url)) {
        return /* @__PURE__ */ createElement(VideoErrorFallbackTemplate, { tile, parent, defaultHidden: false });
      }
    }
    if (tile.source === "twitter") {
      return /* @__PURE__ */ createElement(TwitterTemplate, { tile });
    }
    if (tile.video_files?.length || tile.video && tile.video.standard_resolution) {
      return /* @__PURE__ */ createElement(UgcVideoTemplate, { tile });
    }
    return /* @__PURE__ */ createElement(FacebookFallbackTemplate, { tile });
  }
  function getVideoData(tile) {
    if (tile.video_files?.length) {
      return tile.video_files[0];
    }
    if (tile.video && tile.video.standard_resolution) {
      return {
        width: "auto",
        height: "auto",
        mime: "video/mp4",
        url: tile.video.standard_resolution.url
      };
    }
    throw new Error("Failed to find video data");
  }
  function UgcVideoTemplate({ tile }) {
    const { url, width, height, mime } = getVideoData(tile);
    return /* @__PURE__ */ createElement(
      "video",
      {
        muted: true,
        tileid: tile.id,
        class: "video-content",
        controls: true,
        preload: "none",
        playsinline: "playsinline",
        oncanplay: "this.muted=true"
      },
      /* @__PURE__ */ createElement("source", { src: url, width: width.toString(), height: height.toString(), type: mime })
    );
  }
  function TwitterTemplate({ tile }) {
    const { standard_resolution } = tile.video;
    return /* @__PURE__ */ createElement(
      "video",
      {
        tileid: tile.id,
        class: "video-content",
        controls: true,
        preload: "none",
        playsinline: "playsinline",
        oncanplay: "this.muted=true"
      },
      /* @__PURE__ */ createElement("source", { src: standard_resolution.url })
    );
  }
  function TikTokTemplate({ tile }) {
    const tiktokId = tile.tiktok_id;
    return /* @__PURE__ */ createElement(
      "iframe",
      {
        id: `tiktok-frame-${tile.id}-${tiktokId}`,
        loading: "lazy",
        class: "video-content",
        frameborder: "0",
        allowfullscreen: true,
        allow: "autoplay",
        src: `https://www.tiktok.com/player/v1/${tiktokId}?rel=0`
      }
    );
  }
  function FacebookFallbackTemplate({ tile }) {
    const embedBlock = /* @__PURE__ */ createElement("div", { class: "fb-content-wrapper" }, /* @__PURE__ */ createElement("div", { id: "fb-root" }), /* @__PURE__ */ createElement(
      "script",
      {
        async: true,
        defer: true,
        crossorigin: "anonymous",
        src: "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v21.0"
      }
    ), /* @__PURE__ */ createElement("div", { class: "fb-video", "data-href": tile.original_link, "data-width": "500", "data-show-text": "false" }, /* @__PURE__ */ createElement("blockquote", { cite: tile.original_link, class: "fb-xfbml-parse-ignore" }, /* @__PURE__ */ createElement("a", { href: tile.original_link }), /* @__PURE__ */ createElement("p", null), "Posted by ", /* @__PURE__ */ createElement("a", { href: `https://www.facebook.com/$${tile.source_user_id}` }, tile.name), " on", tile.time_ago)));
    return /* @__PURE__ */ createElement("iframe", { loading: "lazy", class: "video-content", frameborder: "0", allowfullscreen: true, srcdoc: embedBlock.innerHTML });
  }
  function VideoErrorFallbackTemplate({
    tile,
    defaultHidden = true
  }) {
    const originalImageUrl = tile.original_image_url;
    const fallbackCss = `video-fallback-content${defaultHidden ? " hidden" : ""}`;
    return /* @__PURE__ */ createElement("div", { class: fallbackCss }, /* @__PURE__ */ createElement("div", { class: "center-section" }, /* @__PURE__ */ createElement("div", { class: "play-icon" })), /* @__PURE__ */ createElement("a", { href: tile.original_url || tile.original_link, target: "_blank" }, /* @__PURE__ */ createElement(ImageTemplate, { image: originalImageUrl, tile }), /* @__PURE__ */ createElement("div", { class: "play-icon" })));
  }
  var init_tile_template = __esm({
    "src/libs/components/expanded-tile-swiper/tile.template.tsx"() {
      "use strict";
      init_libs();
      init_embed_youtube_template();
    }
  });
  function ExpandedTiles(sdk2) {
    const tiles = sdk2.tiles.tiles;
    const { show_nav } = sdk2.getExpandedTileConfig();
    const navigationArrowsEnabled = show_nav;
    return /* @__PURE__ */ createElement("div", { class: "expanded-tile-wrapper" }, /* @__PURE__ */ createElement("a", { class: "exit", href: "#" }, /* @__PURE__ */ createElement("span", { class: "widget-icon close-white" })), /* @__PURE__ */ createElement(BackArrowIcon, null), /* @__PURE__ */ createElement("div", { class: "swiper swiper-expanded" }, /* @__PURE__ */ createElement("div", { class: "swiper-wrapper ugc-tiles" }, Object.values(tiles).map((tile) => /* @__PURE__ */ createElement(
      "div",
      {
        class: "ugc-tile swiper-slide",
        "data-id": tile.id,
        "data-yt-id": tile.youtube_id || "",
        "data-tiktok-id": tile.tiktok_id || ""
      },
      /* @__PURE__ */ createElement(ExpandedTile, { sdk: sdk2, tile })
    )))), /* @__PURE__ */ createElement(
      "div",
      {
        class: "swiper-expanded-button-prev swiper-button-prev btn-lg",
        style: { display: navigationArrowsEnabled ? "flex" : "none" }
      },
      /* @__PURE__ */ createElement("span", { class: "chevron-left", alt: "Previous arrow" })
    ), /* @__PURE__ */ createElement(
      "div",
      {
        class: "swiper-expanded-button-next swiper-button-next btn-lg",
        style: { display: navigationArrowsEnabled ? "flex" : "none" }
      },
      /* @__PURE__ */ createElement("span", { class: "chevron-right", alt: "Next arrow" })
    ));
  }
  function BackArrowIcon() {
    return /* @__PURE__ */ createElement("a", { class: "back", href: "#" }, /* @__PURE__ */ createElement("span", { class: "widget-icon back-arrow" }));
  }
  var init_base_template = __esm({
    "src/libs/components/expanded-tile-swiper/base.template.tsx"() {
      "use strict";
      init_tile_template();
      init_libs();
    }
  });
  function loadDefaultExpandedTileTemplates(addExpandedTileTemplates) {
    if (addExpandedTileTemplates) {
      sdk.addTemplateToComponent(ExpandedTiles, "expanded-tiles");
    }
  }
  function loadWidgetFonts(defaultFont) {
    sdk.addWidgetCustomStyles(` 
    @import url('${defaultFont}');
  body {
    font-family: 'Inter', sans-serif;
  }`);
  }
  function loadExpandedTileTemplates(settings) {
    loadDefaultExpandedTileTemplates(settings.useDefaultExpandedTileTemplates);
    loadWidgetFonts(settings.defaultFont);
    if (settings.useDefaultSwiperStyles) {
      loadSwiperStyles();
    }
  }
  var init_expanded_tile_swiper = __esm({
    "src/libs/components/expanded-tile-swiper/index.ts"() {
      "use strict";
      init_base_template();
      init_swiper2();
    }
  });
  function LoadMoreTemplate() {
    return /* @__PURE__ */ createElement("div", { id: "buttons" }, /* @__PURE__ */ createElement("a", { id: "load-more" }, "LOAD MORE"));
  }
  var init_load_more_template = __esm({
    "src/libs/components/load-more/load-more.template.tsx"() {
      "use strict";
      init_libs();
    }
  });
  var LoadMoreComponent;
  var init_load_more_component = __esm({
    "src/libs/components/load-more/load-more.component.ts"() {
      "use strict";
      init_load_more_template();
      LoadMoreComponent = class extends HTMLElement {
        constructor() {
          super();
        }
        connectedCallback() {
          this.appendChild(LoadMoreTemplate());
        }
        disconnectedCallback() {
          this.replaceChildren();
        }
      };
      try {
        customElements.define("load-more", LoadMoreComponent);
      } catch (err) {
      }
    }
  });
  var load_more_exports = {};
  __export(load_more_exports, {
    default: () => load_more_default
  });
  var load_more_default;
  var init_load_more = __esm({
    "src/libs/components/load-more/index.ts"() {
      "use strict";
      init_load_more_component();
      load_more_default = LoadMoreComponent;
    }
  });
  var init_components = __esm({
    "src/libs/components/index.ts"() {
      "use strict";
      init_expanded_tile_swiper();
      init_load_more();
    }
  });
  var init_libs = __esm({
    "src/libs/index.ts"() {
      "use strict";
      init_css_variables();
      init_jsx_html();
      init_tile_lib();
      init_widget_components();
      init_widget_features();
      init_widget_layout();
      init_widget_utils();
      init_extensions();
      init_components();
    }
  });
  function loadListeners(settings) {
    const {
      onLoad: onLoad2,
      onExpandTile,
      onTileClose,
      onTileRendered: onTileRendered2,
      onCrossSellersRendered,
      onTilesUpdated,
      onWidgetInitComplete,
      onTileBgImgRenderComplete,
      onTileBgImageError,
      onResize: onResize2,
      onLoadMore,
      onProductActionClick,
      onExpandedTileImageLoad,
      onExpandedTileOpen,
      onExpandedTileClose,
      onBeforeExpandedTileImageResize,
      onBeforeExpandedTileClose,
      onBeforeExpandedTileOpen,
      onShopspotFlyoutExpand,
      onShopspotToggle,
      onShopspotOpen,
      onShopspotActionClick,
      onUserClick,
      onShareClick,
      onImpression,
      onLike,
      onDislike,
      onHover,
      onProductClick,
      onProductPinClick,
      onProductUserClick,
      onShopspotFlyout,
      onTileMetadataLoaded,
      onTileDataSet,
      onHtmlRendered,
      onJsRendered,
      onGlobalsLoaded,
      onProductPageLoaded,
      onProductsUpdated,
      onAddToCartFailed,
      onEmailTileLoad,
      onEmailTileClick,
      onLikeClick,
      onDislikeClick,
      onTileExpandProductRecsRendered,
      onTileExpandCrossSellersRendered,
      onShareMenuOpened,
      onShareMenuClosed
    } = settings.callbacks;
    onLoad2?.forEach((event2) => registerGenericEventListener(EVENT_LOAD, event2));
    onExpandTile?.forEach((event2) => registerGenericEventListener(EVENT_TILE_EXPAND_RENDERED, event2));
    onTileClose?.forEach((event2) => registerGenericEventListener("onTileClose", event2));
    onTileRendered2?.forEach((event2) => registerTileExpandListener(event2));
    onCrossSellersRendered?.forEach((event2) => registerGenericEventListener("crossSellersRendered", event2));
    onWidgetInitComplete?.forEach((event2) => registerGenericEventListener("widgetInit", event2));
    onTileBgImgRenderComplete?.forEach((event2) => registerGenericEventListener(EVENT_TILE_BG_IMG_RENDER_COMPLETE, event2));
    onTileBgImageError?.forEach((event2) => registerGenericEventListener(EVENT_TILE_BG_IMG_ERROR, event2));
    onResize2?.forEach((event2) => window.addEventListener("resize", event2));
    onTilesUpdated?.forEach((event2) => registerGenericEventListener(EVENT_TILES_UPDATED, event2));
    onLoadMore?.forEach((event2) => registerGenericEventListener("loadMore", event2));
    onProductActionClick?.forEach((event2) => registerGenericEventListener(PRODUCT_ACTION_CLICK, event2));
    onExpandedTileImageLoad?.forEach((event2) => registerGenericEventListener(EXPANDED_TILE_IMAGE_LOAD, event2));
    onExpandedTileOpen?.forEach((event2) => registerGenericEventListener(EXPANDED_TILE_OPEN, event2));
    onExpandedTileClose?.forEach((event2) => registerGenericEventListener(EXPANDED_TILE_CLOSE, event2));
    onBeforeExpandedTileImageResize?.forEach(
      (event2) => registerGenericEventListener(BEFORE_EXPANDED_TILE_IMAGE_RESIZE, event2)
    );
    onBeforeExpandedTileClose?.forEach((event2) => registerGenericEventListener(BEFORE_EXPANDED_TILE_CLOSE, event2));
    onBeforeExpandedTileOpen?.forEach((event2) => registerGenericEventListener(BEFORE_EXPANDED_TILE_OPEN, event2));
    onShopspotFlyoutExpand?.forEach((event2) => registerGenericEventListener(SHOPSPOT_FLYOUT_EXPAND, event2));
    onShopspotToggle?.forEach((event2) => registerGenericEventListener(SHOPSPOT_TOGGLE, event2));
    onShopspotOpen?.forEach((event2) => registerGenericEventListener(SHOPSPOT_OPEN, event2));
    onShopspotActionClick?.forEach((event2) => registerGenericEventListener(SHOPSPOT_ACTION_CLICK, event2));
    onUserClick?.forEach((event2) => registerGenericEventListener(USER_CLICK, event2));
    onShareClick?.forEach((event2) => registerGenericEventListener(EVENT_SHARE_CLICK, event2));
    onImpression?.forEach((event2) => registerGenericEventListener(EVENT_IMPRESSION, event2));
    onLike?.forEach((event2) => registerGenericEventListener(EVENT_LIKE, event2));
    onDislike?.forEach((event2) => registerGenericEventListener(EVENT_DISLIKE, event2));
    onHover?.forEach((event2) => registerGenericEventListener(EVENT_HOVER, event2));
    onProductClick?.forEach((event2) => registerGenericEventListener(EVENT_PRODUCT_CLICK, event2));
    onProductPinClick?.forEach((event2) => registerGenericEventListener(EVENT_PRODUCT_PINCLICK, event2));
    onProductUserClick?.forEach((event2) => registerGenericEventListener(EVENT_PRODUCT_USER_CLICK, event2));
    onShopspotFlyout?.forEach((event2) => registerGenericEventListener(EVENT_SHOPSPOT_FLYOUT, event2));
    onTileMetadataLoaded?.forEach((event2) => registerGenericEventListener(EVENT_TILE_METADATA_LOADED, event2));
    onTileDataSet?.forEach((event2) => registerGenericEventListener(EVENT_TILE_DATA_SET, event2));
    onHtmlRendered?.forEach((event2) => registerGenericEventListener(EVENT_HTML_RENDERED, event2));
    onJsRendered?.forEach((event2) => registerGenericEventListener(EVENT_JS_RENDERED, event2));
    onGlobalsLoaded?.forEach((event2) => registerGenericEventListener(EVENT_GLOBALS_LOADED, event2));
    onProductPageLoaded?.forEach((event2) => registerGenericEventListener(EVENT_PRODUCT_PAGE_LOADED, event2));
    onProductsUpdated?.forEach((event2) => registerGenericEventListener(EVENT_PRODUCTS_UPDATED, event2));
    onAddToCartFailed?.forEach((event2) => registerGenericEventListener(EVENT_ADD_TO_CART_FAILED, event2));
    onEmailTileLoad?.forEach((event2) => registerGenericEventListener(EMAIL_TILE_LOAD, event2));
    onEmailTileClick?.forEach((event2) => registerGenericEventListener(EMAIL_TILE_CLICK, event2));
    onLikeClick?.forEach((event2) => registerGenericEventListener(LIKE_CLICK, event2));
    onDislikeClick?.forEach((event2) => registerGenericEventListener(DISLIKE_CLICK, event2));
    onTileExpandProductRecsRendered?.forEach(
      (event2) => registerGenericEventListener(EVENT_TILE_EXPAND_PROD_RECS_RENDERED, event2)
    );
    onTileExpandCrossSellersRendered?.forEach(
      (event2) => registerGenericEventListener(EVENT_TILE_EXPAND_CROSS_SELLERS_RENDERED, event2)
    );
    onShareMenuOpened?.forEach((event2) => registerGenericEventListener(EVENT_SHARE_MENU_OPENED, event2));
    onShareMenuClosed?.forEach((event2) => registerGenericEventListener(EVENT_SHARE_MENU_CLOSED, event2));
  }
  function registerDefaultClickEvents() {
    const tiles = sdk.querySelectorAll(".ugc-tile");
    if (!tiles) {
      throw new Error("Failed to find tiles UI element");
    }
    tiles.forEach((tile) => {
      const tileDataId = tile.getAttribute("data-id");
      if (!tileDataId) {
        throw new Error("Failed to find tile data ID");
      }
      const url = sdk.tiles.getTile(tileDataId)?.original_url;
      if (!url) {
        console.warn("Failed to find tile URL", tile);
        return;
      }
      tile.onclick = (e) => {
        handleTileClick(e, url);
      };
    });
  }
  function registerTileExpandListener(fn = () => {
  }) {
    sdk.addEventListener(EVENT_TILE_EXPAND, (event2) => {
      const customEvent = event2;
      const tileId = customEvent.detail.data.tileId;
      fn(tileId);
    });
  }
  function registerCrossSellersLoadListener(fn = () => {
  }) {
    sdk.addEventListener(EVENT_TILE_EXPAND_CROSS_SELLERS_RENDERED, (event2) => {
      const customEvent = event2;
      const tileId = customEvent.detail.data;
      const target = customEvent.detail.target;
      fn(tileId, target);
    });
  }
  function registerGenericEventListener(eventName, fn) {
    sdk.addEventListener(eventName, fn);
  }
  function registerShareMenuOpenedListener(fn = () => {
  }) {
    sdk.addEventListener(EVENT_SHARE_MENU_OPENED, (event2) => {
      const customEvent = event2;
      const sourceId = customEvent.detail.sourceId;
      fn(sourceId);
    });
  }
  function registerShareMenuClosedListener(fn = () => {
  }) {
    sdk.addEventListener(EVENT_SHARE_MENU_CLOSED, (event2) => {
      const customEvent = event2;
      const sourceId = customEvent.detail.sourceId;
      fn(sourceId);
    });
  }
  var PRODUCT_ACTION_CLICK;
  var EXPANDED_TILE_IMAGE_LOAD;
  var EXPANDED_TILE_OPEN;
  var EXPANDED_TILE_CLOSE;
  var BEFORE_EXPANDED_TILE_IMAGE_RESIZE;
  var EXPANDED_TILE_IMAGE_RESIZE;
  var BEFORE_EXPANDED_TILE_CLOSE;
  var BEFORE_EXPANDED_TILE_OPEN;
  var SHOPSPOT_FLYOUT_EXPAND;
  var SHOPSPOT_TOGGLE;
  var SHOPSPOT_OPEN;
  var SHOPSPOT_ACTION_CLICK;
  var USER_CLICK;
  var EVENT_IMPRESSION;
  var EVENT_LOAD;
  var EVENT_LOAD_MORE;
  var EVENT_LIKE;
  var EVENT_DISLIKE;
  var EVENT_HOVER;
  var EVENT_PRODUCT_CLICK;
  var EVENT_PRODUCT_PINCLICK;
  var EVENT_TILE_EXPAND;
  var EVENT_PRODUCT_USER_CLICK;
  var EVENT_SHARE_CLICK;
  var EVENT_SHOPSPOT_FLYOUT;
  var EVENT_TILE_METADATA_LOADED;
  var EVENT_TILE_DATA_SET;
  var EVENT_HTML_RENDERED;
  var EVENT_JS_RENDERED;
  var EVENT_GLOBALS_LOADED;
  var CROSS_SELLERS_LOADED;
  var EVENT_PRODUCT_PAGE_LOADED;
  var EVENT_PRODUCTS_UPDATED;
  var EVENT_ADD_TO_CART_FAILED;
  var EVENT_TILES_UPDATED;
  var WIDGET_INIT_COMPLETE;
  var EMAIL_TILE_LOAD;
  var EMAIL_TILE_CLICK;
  var LIKE_CLICK;
  var DISLIKE_CLICK;
  var EVENT_TILE_EXPAND_RENDERED;
  var EVENT_TILE_EXPAND_PROD_RECS_RENDERED;
  var EVENT_TILE_EXPAND_CROSS_SELLERS_RENDERED;
  var EVENT_TILE_BG_IMG_ERROR;
  var EVENT_TILE_BG_IMG_RENDER_COMPLETE;
  var EVENT_SHARE_MENU_OPENED;
  var EVENT_SHARE_MENU_CLOSED;
  var allEvents;
  var callbackDefaults;
  var init_events = __esm({
    "src/events/index.ts"() {
      "use strict";
      init_libs();
      PRODUCT_ACTION_CLICK = "productActionClick";
      EXPANDED_TILE_IMAGE_LOAD = "expandedTileImageLoad";
      EXPANDED_TILE_OPEN = "expandedTileOpen";
      EXPANDED_TILE_CLOSE = "expandedTileClose";
      BEFORE_EXPANDED_TILE_IMAGE_RESIZE = "beforeExpandedTileImageResize";
      EXPANDED_TILE_IMAGE_RESIZE = "expandedTileImageResize";
      BEFORE_EXPANDED_TILE_CLOSE = "beforeExpandedTileClose";
      BEFORE_EXPANDED_TILE_OPEN = "beforeExpandedTileOpen";
      SHOPSPOT_FLYOUT_EXPAND = "shopspotFlyoutExpand";
      SHOPSPOT_TOGGLE = "shopspotToggle";
      SHOPSPOT_OPEN = "shopspotOpen";
      SHOPSPOT_ACTION_CLICK = "shopspotActionClick";
      USER_CLICK = "userClick";
      EVENT_IMPRESSION = "impression";
      EVENT_LOAD = "load";
      EVENT_LOAD_MORE = "moreLoad";
      EVENT_LIKE = "like";
      EVENT_DISLIKE = "dislike";
      EVENT_HOVER = "tileHover";
      EVENT_PRODUCT_CLICK = "productClick";
      EVENT_PRODUCT_PINCLICK = "pinClick";
      EVENT_TILE_EXPAND = "tileExpand";
      EVENT_PRODUCT_USER_CLICK = "userClick";
      EVENT_SHARE_CLICK = "shareClick";
      EVENT_SHOPSPOT_FLYOUT = "shopspotFlyout";
      EVENT_TILE_METADATA_LOADED = "tileMetadataLoaded";
      EVENT_TILE_DATA_SET = "tileDataSet";
      EVENT_HTML_RENDERED = "htmlRendered";
      EVENT_JS_RENDERED = "jsRendered";
      EVENT_GLOBALS_LOADED = "globalsLoaded";
      CROSS_SELLERS_LOADED = "crossSellersLoaded";
      EVENT_PRODUCT_PAGE_LOADED = "productPageLoaded";
      EVENT_PRODUCTS_UPDATED = "productsUpdated";
      EVENT_ADD_TO_CART_FAILED = "addToCartFailed";
      EVENT_TILES_UPDATED = "tilesUpdated";
      WIDGET_INIT_COMPLETE = "widgetInitComplete";
      EMAIL_TILE_LOAD = "emailTileLoad";
      EMAIL_TILE_CLICK = "emailTileClick";
      LIKE_CLICK = "likeClick";
      DISLIKE_CLICK = "dislikeClick";
      EVENT_TILE_EXPAND_RENDERED = "expandedTileRendered";
      EVENT_TILE_EXPAND_PROD_RECS_RENDERED = "tileExpandProductRecsRendered";
      EVENT_TILE_EXPAND_CROSS_SELLERS_RENDERED = "tileExpandCrossSellersRendered";
      EVENT_TILE_BG_IMG_ERROR = "tileBgImageError";
      EVENT_TILE_BG_IMG_RENDER_COMPLETE = "tileBgImgRenderComplete";
      EVENT_SHARE_MENU_OPENED = "shareMenuOpened";
      EVENT_SHARE_MENU_CLOSED = "shareMenuClosed";
      allEvents = [
        PRODUCT_ACTION_CLICK,
        EXPANDED_TILE_IMAGE_LOAD,
        EXPANDED_TILE_OPEN,
        EXPANDED_TILE_CLOSE,
        BEFORE_EXPANDED_TILE_IMAGE_RESIZE,
        EXPANDED_TILE_IMAGE_RESIZE,
        BEFORE_EXPANDED_TILE_CLOSE,
        BEFORE_EXPANDED_TILE_OPEN,
        SHOPSPOT_FLYOUT_EXPAND,
        SHOPSPOT_TOGGLE,
        SHOPSPOT_OPEN,
        SHOPSPOT_ACTION_CLICK,
        USER_CLICK,
        EVENT_IMPRESSION,
        EVENT_LOAD,
        EVENT_LOAD_MORE,
        EVENT_LIKE,
        EVENT_DISLIKE,
        EVENT_HOVER,
        EVENT_PRODUCT_CLICK,
        EVENT_PRODUCT_PINCLICK,
        EVENT_TILE_EXPAND,
        EVENT_PRODUCT_USER_CLICK,
        EVENT_SHARE_CLICK,
        EVENT_SHOPSPOT_FLYOUT,
        EVENT_TILE_METADATA_LOADED,
        EVENT_TILE_DATA_SET,
        EVENT_HTML_RENDERED,
        EVENT_JS_RENDERED,
        EVENT_GLOBALS_LOADED,
        CROSS_SELLERS_LOADED,
        EVENT_PRODUCT_PAGE_LOADED,
        EVENT_PRODUCTS_UPDATED,
        EVENT_ADD_TO_CART_FAILED,
        EVENT_TILES_UPDATED,
        WIDGET_INIT_COMPLETE,
        EMAIL_TILE_LOAD,
        EMAIL_TILE_CLICK,
        LIKE_CLICK,
        DISLIKE_CLICK,
        EVENT_TILE_EXPAND_RENDERED,
        EVENT_TILE_EXPAND_PROD_RECS_RENDERED,
        EVENT_TILE_EXPAND_CROSS_SELLERS_RENDERED,
        EVENT_TILE_BG_IMG_ERROR,
        EVENT_TILE_BG_IMG_RENDER_COMPLETE,
        EVENT_SHARE_MENU_OPENED,
        EVENT_SHARE_MENU_CLOSED
      ];
      callbackDefaults = {
        onResize: [],
        onLoad: [],
        onExpandTile: [],
        onTileClose: [],
        onTileRendered: [],
        onTilesUpdated: [],
        onCrossSellersRendered: [],
        onWidgetInitComplete: [],
        onTileBgImgRenderComplete: [],
        onTileBgImageError: [],
        onProductActionClick: [],
        onExpandedTileImageLoad: [],
        onExpandedTileOpen: [],
        onExpandedTileClose: [],
        onBeforeExpandedTileImageResize: [],
        onBeforeExpandedTileClose: [],
        onBeforeExpandedTileOpen: [],
        onShopspotFlyoutExpand: [],
        onShopspotToggle: [],
        onShopspotOpen: [],
        onShopspotActionClick: [],
        onUserClick: [],
        onShareClick: [],
        onImpression: [],
        onLoadMore: [],
        onLike: [],
        onDislike: [],
        onHover: [],
        onProductClick: [],
        onProductPinClick: [],
        onProductUserClick: [],
        onShopspotFlyout: [],
        onTileMetadataLoaded: [],
        onTileDataSet: [],
        onHtmlRendered: [],
        onJsRendered: [],
        onGlobalsLoaded: [],
        onProductPageLoaded: [],
        onProductsUpdated: [],
        onAddToCartFailed: [],
        onEmailTileLoad: [],
        onEmailTileClick: [],
        onLikeClick: [],
        onDislikeClick: [],
        onTileExpandProductRecsRendered: [],
        onTileExpandCrossSellersRendered: [],
        onShareMenuOpened: [],
        onShareMenuClosed: []
      };
    }
  });
  function exceedsBoundaries(sdk2, windowInstance) {
    const tiles = sdk2.querySelectorAll(".ugc-tile");
    if (!tiles) {
      throw new Error("Failed to find tiles for boundary check");
    }
    const lastTile = tiles.item(tiles.length - 1);
    if (!lastTile) {
      throw new Error("Failed to find last tile");
    }
    const lastTilePosition = lastTile.getBoundingClientRect().top + lastTile.offsetHeight;
    return lastTilePosition <= windowInstance.innerHeight + 100;
  }
  function useInfiniteScroller(sdk2, windowInstance = window, onLoadMore = () => {
    sdk2.triggerEvent(EVENT_LOAD_MORE);
  }) {
    function onScroll2() {
      if (windowInstance.scrollLocked)
        return;
      windowInstance.scrollLocked = true;
      if (exceedsBoundaries(sdk2, windowInstance)) {
        onLoadMore();
      }
      windowInstance.scrollLocked = false;
    }
    windowInstance.addEventListener("scroll", onScroll2);
  }
  var useInfiniteScroller_default;
  var init_useInfiniteScroller = __esm({
    "src/hooks/useInfiniteScroller.ts"() {
      "use strict";
      init_events();
      useInfiniteScroller_default = useInfiniteScroller;
    }
  });
  var init_hooks = __esm({
    "src/hooks/index.ts"() {
      "use strict";
      init_useInfiniteScroller();
    }
  });
  var init_widgets = __esm({
    "src/types/widgets.ts"() {
      "use strict";
    }
  });
  var init_types = __esm({
    "src/types/types.ts"() {
      "use strict";
    }
  });
  var init_ugc_component = __esm({
    "src/types/components/ugc.component.ts"() {
      "use strict";
    }
  });
  var init_products_component = __esm({
    "src/types/components/products.component.ts"() {
      "use strict";
    }
  });
  var init_share_menu_component = __esm({
    "src/types/components/share-menu.component.ts"() {
      "use strict";
    }
  });
  var init_static_component = __esm({
    "src/types/components/static.component.ts"() {
      "use strict";
    }
  });
  var init_tile_component = __esm({
    "src/types/components/tile-component.ts"() {
      "use strict";
    }
  });
  var init_components2 = __esm({
    "src/types/components/index.ts"() {
      "use strict";
      init_ugc_component();
      init_products_component();
      init_share_menu_component();
      init_static_component();
      init_tile_component();
    }
  });
  var init_placement = __esm({
    "src/types/core/placement.ts"() {
      "use strict";
    }
  });
  var init_sdk = __esm({
    "src/types/core/sdk.ts"() {
      "use strict";
    }
  });
  var init_tile = __esm({
    "src/types/core/tile.ts"() {
      "use strict";
    }
  });
  var init_widget_request = __esm({
    "src/types/core/widget-request.ts"() {
      "use strict";
    }
  });
  var init_core = __esm({
    "src/types/core/index.ts"() {
      "use strict";
      init_placement();
      init_sdk();
      init_tile();
      init_widget_request();
    }
  });
  var init_base_service = __esm({
    "src/types/services/base.service.ts"() {
      "use strict";
    }
  });
  var init_event_service = __esm({
    "src/types/services/event.service.ts"() {
      "use strict";
    }
  });
  var init_tiles_service = __esm({
    "src/types/services/tiles.service.ts"() {
      "use strict";
    }
  });
  var init_widget_service = __esm({
    "src/types/services/widget.service.ts"() {
      "use strict";
    }
  });
  var init_tile_event = __esm({
    "src/types/services/events/tile-event.ts"() {
      "use strict";
    }
  });
  var init_widget_event = __esm({
    "src/types/services/events/widget-event.ts"() {
      "use strict";
    }
  });
  var init_services = __esm({
    "src/types/services/index.ts"() {
      "use strict";
      init_base_service();
      init_event_service();
      init_tiles_service();
      init_widget_service();
      init_tile_event();
      init_widget_event();
    }
  });
  var init_SdkSwiper = __esm({
    "src/types/SdkSwiper.ts"() {
      "use strict";
    }
  });
  var init_types2 = __esm({
    "src/types/index.ts"() {
      "use strict";
      init_widgets();
      init_types();
      init_components2();
      init_core();
      init_services();
      init_SdkSwiper();
    }
  });
  function loadMasonryCallbacks(settings) {
    settings.callbacks.onTilesUpdated.push(() => {
      renderMasonryLayout();
    });
    settings.callbacks.onTileBgImgRenderComplete.push(() => {
      handleAllTileImageRendered();
      setTimeout(handleAllTileImageRendered, 1e3);
    });
    settings.callbacks.onTileBgImageError.push((event2) => {
      const customEvent = event2;
      const tileWithError = customEvent.detail.data.target;
      handleTileImageError(tileWithError);
    });
    const grid = sdk.querySelector(".grid");
    const observer = new ResizeObserver(() => {
      renderMasonryLayout(false, true);
    });
    observer.observe(grid);
    return settings;
  }
  function mergeSettingsWithDefaults(settings) {
    return {
      features: {
        showTitle: true,
        preloadImages: true,
        disableWidgetIfNotEnabled: true,
        addNewTilesAutomatically: true,
        handleLoadMore: true,
        limitTilesPerPage: true,
        hideBrokenImages: true,
        loadExpandedTileSlider: true,
        loadTileContent: true,
        loadTimephrase: true,
        expandedTileSettings: {
          useDefaultExpandedTileStyles: true,
          useDefaultProductStyles: true,
          useDefaultAddToCartStyles: true,
          useDefaultExpandedTileTemplates: true,
          useDefaultSwiperStyles: true,
          defaultFont: settings?.font ?? "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
        },
        ...settings?.features
      },
      callbacks: {
        ...callbackDefaults,
        ...settings?.callbacks
      },
      extensions: {
        swiper: false,
        masonry: false,
        ...settings?.extensions
      },
      templates: settings?.templates ?? {}
    };
  }
  async function loadFeatures(settings) {
    const {
      showTitle,
      preloadImages,
      disableWidgetIfNotEnabled,
      addNewTilesAutomatically,
      handleLoadMore,
      limitTilesPerPage,
      hideBrokenImages,
      loadTileContent,
      loadTimephrase
    } = settings.features;
    sdk.tiles.preloadImages = preloadImages;
    sdk.tiles.hideBrokenTiles = hideBrokenImages;
    if (loadTileContent) {
      sdk.addLoadedComponents(["tile-content", "timephrase", "tags", "share-menu"]);
    } else if (loadTimephrase) {
      sdk.addLoadedComponents(["timephrase"]);
    }
    if (disableWidgetIfNotEnabled) {
      loadWidgetIsEnabled();
    }
    if (showTitle) {
      loadTitle();
    }
    loadExpandedTileFeature();
    if (addNewTilesAutomatically) {
      addAutoAddTileFeature();
    }
    if (handleLoadMore) {
      await Promise.resolve().then(() => (init_load_more(), load_more_exports));
      addLoadMoreButtonFeature();
    }
    if (limitTilesPerPage) {
      addTilesPerPageFeature();
    }
    return settings;
  }
  function loadExtensions(settings) {
    const { extensions } = settings;
    if (extensions?.masonry) {
      settings = loadMasonryCallbacks(settings);
      renderMasonryLayout();
    }
    return settings;
  }
  function loadTemplates(settings) {
    const { expandedTileSettings } = settings.features;
    const {
      useDefaultExpandedTileStyles,
      useDefaultProductStyles,
      useDefaultAddToCartStyles,
      useDefaultExpandedTileTemplates,
      defaultFont,
      useDefaultSwiperStyles
    } = expandedTileSettings;
    if (settings.features.loadExpandedTileSlider) {
      loadExpandedTileTemplates({
        useDefaultExpandedTileStyles,
        useDefaultProductStyles,
        useDefaultAddToCartStyles,
        useDefaultExpandedTileTemplates,
        defaultFont,
        useDefaultSwiperStyles
      });
    }
    if (settings.templates && Object.keys(settings.templates).length) {
      Object.entries(settings.templates).forEach(([key, customTemplate]) => {
        if (!customTemplate) {
          return;
        }
        const { template } = customTemplate;
        if (template) {
          sdk.addTemplateToComponent(template, key);
        }
      });
    }
  }
  function loadWidget(settings) {
    const settingsWithDefaults = mergeSettingsWithDefaults(settings);
    addCSSVariablesToPlacement(getCSSVariables(settings?.features));
    loadTemplates(settingsWithDefaults);
    loadFeatures(settingsWithDefaults);
    loadExtensions(settingsWithDefaults);
    loadListeners(settingsWithDefaults);
  }
  var init_widget_loader = __esm({
    "src/widget-loader.ts"() {
      "use strict";
      init_libs();
      init_css_variables();
      init_masonry_extension();
      init_expanded_tile_swiper();
      init_events();
    }
  });
  var init_src = __esm({
    "src/index.ts"() {
      init_hooks();
      init_types2();
      init_events();
      init_libs();
      init_widget_loader();
    }
  });
  init_src();

  // widgets/nightfall/waterfall.lib.ts
  function loadWaterfallLayout(reset = false) {
    const allTiles = Array.from(sdk.querySelectorAll(".grid-item") ?? []);
    const ugcTiles = reset ? allTiles : allTiles.filter((tile) => tile.getAttribute("height-set") !== "true");
    const { inline_tile_size } = sdk.getStyleConfig();
    if (!ugcTiles || ugcTiles.length === 0) {
      return;
    }
    const rowHeight = 10;
    const { margin } = sdk.getStyleConfig();
    const gap = parseInt(margin);
    ugcTiles.forEach((tile) => {
      const hasUserHandle = tile.querySelector(".user-handle") !== null;
      const hasTimePhrase = tile.querySelector(".tile-timephrase") !== null;
      const bottomContainer = tile.querySelector(".tile-bottom-container");
      const caption = tile.querySelector(".caption");
      const icons = tile.querySelectorAll(".icon-share, .network-icon, .content-icon, .icon-products");
      if (inline_tile_size === "small") {
        bottomContainer.classList.add("small");
      }
      icons.forEach((icon) => icon.classList.add(`${inline_tile_size}`));
      if (caption) {
        if (hasUserHandle || hasTimePhrase) {
          caption.classList.add("lines-4");
        } else {
          caption.classList.add("lines-5");
        }
      }
      const tileTop = tile.querySelector(".tile-top");
      const tileBottom = tile.querySelector(".tile-bottom");
      if (tileTop && tileBottom) {
        const imageElement = tileTop.querySelector("img");
        const calculateHeight = () => {
          const topHeight = tileTop.scrollHeight;
          const bottomHeight = tileBottom.scrollHeight;
          const totalHeight = topHeight + bottomHeight;
          const rowSpan = Math.ceil(totalHeight / (rowHeight + gap));
          tile.style.gridRowEnd = `span ${rowSpan}`;
        };
        if (imageElement && !imageElement.complete) {
          imageElement.onload = calculateHeight;
          imageElement.onerror = () => imageElement.parentElement?.remove();
        } else {
          calculateHeight();
        }
      }
    });
  }

  // widgets/nightfall/products.template.tsx
  function ProductHeader({ product }) {
    if (!product)
      return /* @__PURE__ */ createElement(createFragment, null);
    const { id, tag, custom_url, target, price, currency } = product;
    const titleContent = tag && /* @__PURE__ */ createElement("a", { href: custom_url, target, class: "stacklapopup-products-item-title" }, tag);
    const priceContent = price && /* @__PURE__ */ createElement("div", { class: "stacklapopup-products-item-price" }, currency === "EUR" ? `${price} EUR` : `${currency ?? ""}${price}`);
    return /* @__PURE__ */ createElement("div", { class: "stacklapopup-products-header" }, /* @__PURE__ */ createElement("div", { class: "stacklapopup-products-item-header stacklapopup-products-item-active", "data-tag-id": id }, titleContent, priceContent));
  }
  function ProductCTA({ sdk: sdk2, product }) {
    const { custom_url, target, availability, cta_text = "Buy Now", currency, id } = product;
    const addToCart = sdk2.getLoadedComponents().includes("add-to-cart");
    const parentNodeId = sdk2.getNodeId();
    if (addToCart) {
      return /* @__PURE__ */ createElement(createFragment, null, /* @__PURE__ */ createElement(
        "a",
        {
          href: custom_url,
          target,
          class: "stacklapopup-products-item-button-wrap",
          style: {
            display: "none"
          }
        },
        /* @__PURE__ */ createElement("span", { className: `stacklapopup-products-item-button${availability ? "" : " disabled"}` }, cta_text)
      ), /* @__PURE__ */ createElement(
        "add-to-cart",
        {
          productId: id,
          id: `stacklapopup-add-to-cart-${id}`,
          url: custom_url,
          target,
          availability,
          cta: cta_text,
          currency,
          parent: parentNodeId
        }
      ));
    }
    return /* @__PURE__ */ createElement("a", { href: custom_url, target, class: "stacklapopup-products-item-button-wrap" }, /* @__PURE__ */ createElement("span", { className: `stacklapopup-products-item-button${availability ? "" : " disabled"}` }, cta_text));
  }
  function ProductDetails({ sdk: sdk2, product }) {
    const selectedProductId = sdk2.tiles.getSelectedProduct() ? sdk2.tiles.getSelectedProduct().id : null;
    const { custom_url, description = "Buy Now", id } = product;
    const descriptionContent = description ? /* @__PURE__ */ createElement("p", { class: "stacklapopup-products-item-description" }, description) : /* @__PURE__ */ createElement(createFragment, null);
    const itemActive = id == selectedProductId ? "stacklapopup-products-item-active" : "";
    return /* @__PURE__ */ createElement("div", { className: `stacklapopup-products-item-content ${itemActive}`, "data-tag-id": id, "data-custom-url": custom_url }, /* @__PURE__ */ createElement("div", { className: "stacklapopup-products-item-description-wrapper" }, descriptionContent), /* @__PURE__ */ createElement(ProductCTA, { sdk: sdk2, product }));
  }
  function ProductWrapper({
    products,
    selectedProductId
  }) {
    return /* @__PURE__ */ createElement(createFragment, null, products.map(({ id, image_small_url, is_cross_seller }) => /* @__PURE__ */ createElement("div", { className: "swiper-slide stacklapopup-product-wrapper" }, is_cross_seller && /* @__PURE__ */ createElement("div", { className: "stacklapopup-products-item-image-recommendation-label" }, /* @__PURE__ */ createElement("p", null, /* @__PURE__ */ createElement("span", { class: "icon-like" }), " great with")), /* @__PURE__ */ createElement(
      "div",
      {
        className: `stacklapopup-products-item ${is_cross_seller ? "cross-seller" : ""} ${id == selectedProductId ? "stacklapopup-products-item-active" : ""}`,
        "data-tag-id": id
      },
      /* @__PURE__ */ createElement(
        "img",
        {
          loading: "lazy",
          class: "stacklapopup-products-item-image",
          src: image_small_url,
          onerror: "this.src='https://placehold.co/160x200'"
        }
      )
    ))));
  }
  function ProductImages({
    products,
    selectedProduct
  }) {
    return /* @__PURE__ */ createElement(createFragment, null, products.length > 3 ? /* @__PURE__ */ createElement("div", { class: "recommendations-text" }, "see recommendations") : /* @__PURE__ */ createElement(createFragment, null), /* @__PURE__ */ createElement("div", { class: "stacklapopup-product-images-wrapper" }, /* @__PURE__ */ createElement("div", { class: "swiper swiper-expanded-product-recs stacklapopup-products" }, /* @__PURE__ */ createElement("div", { class: "swiper-wrapper" }, selectedProduct && /* @__PURE__ */ createElement(ProductWrapper, { products, selectedProductId: selectedProduct.id }))), /* @__PURE__ */ createElement("div", { class: "swiper-exp-product-recs-button-prev swiper-button-prev" }, /* @__PURE__ */ createElement("span", { class: "swiper-nav-icon icon-prev-white" })), /* @__PURE__ */ createElement("div", { class: "swiper-exp-product-recs-button-next swiper-button-next" }, /* @__PURE__ */ createElement("span", { class: "swiper-nav-icon icon-next-white" }))));
  }
  function ProductsTemplate(sdk2, component) {
    if (!component) {
      throw new Error("Products component incorrectly passed.");
    }
    const tileId = component.getTileId();
    const tile = sdk2.tiles.getTile(tileId);
    const selectedProductState = sdk2.tiles.getSelectedProduct();
    if (!tile) {
      throw new Error("No tile found");
    }
    const products = (tile.tags_extended || []).filter(({ type }) => type === "product");
    if (!products.length) {
      return /* @__PURE__ */ createElement(createFragment, null);
    }
    const selectedProductById = selectedProductState ? products.find(({ id }) => id == selectedProductState.id.toString()) : null;
    const selectedProduct = selectedProductById || products[0];
    const mappedProducts = products.map((product) => /* @__PURE__ */ createElement(ProductDetails, { sdk: sdk2, product }));
    return /* @__PURE__ */ createElement(createFragment, null, /* @__PURE__ */ createElement(ProductHeader, { product: selectedProduct }), /* @__PURE__ */ createElement(ProductImages, { products, selectedProduct }), mappedProducts);
  }

  // widgets/nightfall/widget.tsx
  loadWidget({
    callbacks: {
      onLoadMore: [() => loadWaterfallLayout()],
      onTilesUpdated: [() => loadWaterfallLayout()],
      onResize: [() => loadWaterfallLayout()],
      onLoad: [() => loadWaterfallLayout()]
    },
    templates: {
      "ugc-products": {
        template: ProductsTemplate
      }
    },
    features: {},
    extensions: {}
  });
  loadWaterfallLayout();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFja2FnZXMvd2lkZ2V0LXV0aWxzL2Rpc3QvZXNtL2luZGV4LmpzIiwgIi4uLy4uL3dpZGdldHMvbmlnaHRmYWxsL3dhdGVyZmFsbC5saWIudHMiLCAiLi4vLi4vd2lkZ2V0cy9uaWdodGZhbGwvcHJvZHVjdHMudGVtcGxhdGUudHN4IiwgIi4uLy4uL3dpZGdldHMvbmlnaHRmYWxsL3dpZGdldC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbInZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19nZXRPd25Qcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbnZhciBfX2VzbSA9IChmbiwgcmVzKSA9PiBmdW5jdGlvbiBfX2luaXQoKSB7XG4gIHJldHVybiBmbiAmJiAocmVzID0gKDAsIGZuW19fZ2V0T3duUHJvcE5hbWVzKGZuKVswXV0pKGZuID0gMCkpLCByZXM7XG59O1xudmFyIF9fZXhwb3J0ID0gKHRhcmdldCwgYWxsKSA9PiB7XG4gIGZvciAodmFyIG5hbWUgaW4gYWxsKVxuICAgIF9fZGVmUHJvcCh0YXJnZXQsIG5hbWUsIHsgZ2V0OiBhbGxbbmFtZV0sIGVudW1lcmFibGU6IHRydWUgfSk7XG59O1xuXG4vLyBzcmMvbGlicy9jc3MtdmFyaWFibGVzLnRzXG5mdW5jdGlvbiBnZXRUaWxlU2l6ZShzZXR0aW5ncykge1xuICBjb25zdCBzdHlsZSA9IHNkay5nZXRTdHlsZUNvbmZpZygpO1xuICBjb25zdCB7IGlubGluZV90aWxlX3NpemUgfSA9IHN0eWxlO1xuICBjb25zdCB0aWxlU2l6ZXMgPSB7XG4gICAgc21hbGw6IHNldHRpbmdzPy5zbWFsbCA/PyBcIjE3M3B4XCIsXG4gICAgbWVkaXVtOiBzZXR0aW5ncz8ubWVkaXVtID8/IFwiMjY1LjVweFwiLFxuICAgIGxhcmdlOiBzZXR0aW5ncz8ubGFyZ2UgPz8gXCI0MDBweFwiXG4gIH07XG4gIGlmICghaW5saW5lX3RpbGVfc2l6ZSkge1xuICAgIHJldHVybiB0aWxlU2l6ZXNbXCJtZWRpdW1cIl07XG4gIH1cbiAgcmV0dXJuIHRpbGVTaXplc1tpbmxpbmVfdGlsZV9zaXplXTtcbn1cbmZ1bmN0aW9uIGdldFRpbGVTaXplQnlXaWRnZXQodGlsZVNpemVTZXR0aW5ncykge1xuICBjb25zdCBzaXplV2l0aFVuaXQgPSBnZXRUaWxlU2l6ZSh0aWxlU2l6ZVNldHRpbmdzKTtcbiAgY29uc3Qgc2l6ZVVuaXRsZXNzID0gc2l6ZVdpdGhVbml0LnJlcGxhY2UoXCJweFwiLCBcIlwiKTtcbiAgcmV0dXJuIHsgXCItLXRpbGUtc2l6ZVwiOiBzaXplV2l0aFVuaXQsIFwiLS10aWxlLXNpemUtdW5pdGxlc3NcIjogc2l6ZVVuaXRsZXNzIH07XG59XG5mdW5jdGlvbiB0cmltSGFzaFZhbHVlc0Zyb21PYmplY3Qob2JqKSB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhvYmopLnJlZHVjZSgoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBhY2Nba2V5XSA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS5zdGFydHNXaXRoKFwiI1wiKSA/IHZhbHVlLnJlcGxhY2UoXCIjXCIsIFwiXCIpIDogdmFsdWU7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufVxuZnVuY3Rpb24gZ2V0Q1NTVmFyaWFibGVzKGZlYXR1cmVzKSB7XG4gIGNvbnN0IHsgdGlsZVNpemVTZXR0aW5ncywgY3NzVmFyaWFibGVzIH0gPSBmZWF0dXJlcyB8fCB7fTtcbiAgY29uc3Qgc3R5bGVzID0gc2RrLmdldFN0eWxlQ29uZmlnKCk7XG4gIGNvbnN0IGlubGluZVRpbGVTZXR0aW5ncyA9IHNkay5nZXRJbmxpbmVUaWxlQ29uZmlnKCk7XG4gIGNvbnN0IHtcbiAgICB3aWRnZXRfYmFja2dyb3VuZCxcbiAgICB0aWxlX2JhY2tncm91bmQsXG4gICAgdGV4dF90aWxlX2JhY2tncm91bmQsXG4gICAgdGV4dF90aWxlX2xpbmtfY29sb3IsXG4gICAgdGV4dF90aWxlX3VzZXJfaGFuZGxlX2ZvbnRfY29sb3IsXG4gICAgc2hvcHNwb3RfYnRuX2JhY2tncm91bmQsXG4gICAgc2hvcHNwb3RfYnRuX2ZvbnRfY29sb3IsXG4gICAgbWFyZ2luLFxuICAgIHRleHRfdGlsZV9mb250X3NpemUsXG4gICAgdGV4dF90aWxlX3VzZXJfbmFtZV9mb250X3NpemUsXG4gICAgdGV4dF90aWxlX3VzZXJfaGFuZGxlX2ZvbnRfc2l6ZSxcbiAgICBzaG9wc3BvdF9pY29uLFxuICAgIGV4cGFuZGVkX3RpbGVfYm9yZGVyX3JhZGl1cyxcbiAgICBpbmxpbmVfdGlsZV9ib3JkZXJfcmFkaXVzLFxuICAgIGlubGluZV90aWxlX21hcmdpbixcbiAgICBzaG9wc3BvdF9idG5fZm9udF9zaXplLFxuICAgIHRleHRfdGlsZV9mb250X2NvbG9yLFxuICAgIHRleHRfdGlsZV91c2VyX25hbWVfZm9udF9jb2xvclxuICB9ID0gdHJpbUhhc2hWYWx1ZXNGcm9tT2JqZWN0KHN0eWxlcyk7XG4gIGNvbnN0IHsgc2hvd190YWdzOiBzaG93X3RhZ3NfZXhwYW5kZWQgfSA9IHNkay5nZXRFeHBhbmRlZFRpbGVDb25maWcoKTtcbiAgY29uc3QgeyBzaG93X2NhcHRpb24sIHNob3dfdGFnczogc2hvd190YWdzX2lubGluZSwgc2hvd19zaG9wc3BvdHMsIHNob3dfdGltZXN0YW1wLCBzaG93X3NoYXJpbmcgfSA9IGlubGluZVRpbGVTZXR0aW5ncztcbiAgY29uc3QgbXV0YXRlZENzc1ZhcmlhYmxlcyA9IHtcbiAgICAuLi5jc3NWYXJpYWJsZXMsXG4gICAgXCItLXdpZGdldC1iYWNrZ3JvdW5kXCI6IGAjJHt3aWRnZXRfYmFja2dyb3VuZH1gLFxuICAgIFwiLS1pbmxpbmUtdGlsZS1iYWNrZ3JvdW5kXCI6IGAjJHt0aWxlX2JhY2tncm91bmR9YCxcbiAgICBcIi0tdGV4dC10aWxlLWJhY2tncm91bmRcIjogYCMke3RleHRfdGlsZV9iYWNrZ3JvdW5kfWAsXG4gICAgXCItLXNob3BzcG90LWJ0bi1iYWNrZ3JvdW5kXCI6IGAjJHtzaG9wc3BvdF9idG5fYmFja2dyb3VuZH1gLFxuICAgIFwiLS1jdGEtYnV0dG9uLWJhY2tncm91bmQtY29sb3JcIjogYCMke3Nob3BzcG90X2J0bl9iYWNrZ3JvdW5kfWAsXG4gICAgXCItLXRpbGUtdGFnLWJhY2tncm91bmRcIjogYCNiY2JiYmNgLFxuICAgIFwiLS10ZXh0LXRpbGUtbGluay1jb2xvclwiOiBgIyR7dGV4dF90aWxlX2xpbmtfY29sb3J9YCxcbiAgICBcIi0tdGV4dC10aWxlLXVzZXItaGFuZGxlLWZvbnQtY29sb3JcIjogYCMke3RleHRfdGlsZV91c2VyX2hhbmRsZV9mb250X2NvbG9yfWAsXG4gICAgXCItLXNob3BzcG90LWJ0bi1mb250LWNvbG9yXCI6IGAjJHtzaG9wc3BvdF9idG5fZm9udF9jb2xvcn1gLFxuICAgIFwiLS1tYXJnaW5cIjogYCR7bWFyZ2luID8gbWFyZ2luIDogMH1weGAsXG4gICAgXCItLXRleHQtdGlsZS1mb250LXNpemVcIjogYCR7dGV4dF90aWxlX2ZvbnRfc2l6ZX1weGAsXG4gICAgXCItLXRleHQtY2FwdGlvbi1wYXJhZ3JhcGgtZm9udC1zaXplXCI6IGAke3RleHRfdGlsZV9mb250X3NpemUgfHwgMTJ9cHhgLFxuICAgIFwiLS10ZXh0LXRpbGUtdXNlci1uYW1lLWZvbnQtc2l6ZVwiOiBgJHt0ZXh0X3RpbGVfdXNlcl9uYW1lX2ZvbnRfc2l6ZX1weGAsXG4gICAgXCItLXRleHQtdGlsZS11c2VyLW5hbWUtZm9udC1jb2xvclwiOiBgIyR7dGV4dF90aWxlX3VzZXJfbmFtZV9mb250X2NvbG9yfWAsXG4gICAgXCItLXRleHQtdGlsZS11c2VyLWhhbmRsZS1mb250LXNpemVcIjogYCR7dGV4dF90aWxlX3VzZXJfaGFuZGxlX2ZvbnRfc2l6ZSB8fCAxMn1weGAsXG4gICAgXCItLXRleHQtdGlsZS1mb250LWNvbG9yXCI6IGAjJHt0ZXh0X3RpbGVfZm9udF9jb2xvcn1gLFxuICAgIFwiLS1zaG93LWNhcHRpb25cIjogYCR7c2hvd19jYXB0aW9uID8gXCJibG9ja1wiIDogXCJub25lXCJ9YCxcbiAgICBcIi0tc2hvdy1jYXB0aW9uLXdlYmtpdFwiOiBgJHtzaG93X2NhcHRpb24gPyBcIi13ZWJraXQtYm94XCIgOiBcIm5vbmVcIn1gLFxuICAgIFwiLS1zaG9wc3BvdC1pY29uXCI6IHNob3BzcG90X2ljb24gPyBzaG9wc3BvdF9pY29uIDogYCMwMDBgLFxuICAgIFwiLS10YWdzLWdhcFwiOiBgNHB4YCxcbiAgICAvLyBUT0RPIC0gUmVwbGFjZSB0aGVzZSB3aXRoIGN0YV9idXR0b25fZm9udF9jb2xvciBhbmQgY3RhX2J1dHRvbl9mb250X3NpemUgQFBlbmcgWmhvdVxuICAgIFwiLS1jdGEtYnV0dG9uLWZvbnQtY29sb3JcIjogYCMke3Nob3BzcG90X2J0bl9mb250X2NvbG9yfWAsXG4gICAgXCItLWN0YS1idXR0b24tZm9udC1zaXplXCI6IGAke3Nob3BzcG90X2J0bl9mb250X3NpemV9cHhgLFxuICAgIFwiLS1leHBhbmRlZC10aWxlLWJvcmRlci1yYWRpdXNcIjogYCR7ZXhwYW5kZWRfdGlsZV9ib3JkZXJfcmFkaXVzfXB4YCxcbiAgICAuLi5nZXRUaWxlU2l6ZUJ5V2lkZ2V0KHRpbGVTaXplU2V0dGluZ3MpLFxuICAgIFwiLS1pbmxpbmUtdGlsZS1ib3JkZXItcmFkaXVzXCI6IGAke2lubGluZV90aWxlX2JvcmRlcl9yYWRpdXN9cHhgLFxuICAgIFwiLS1pbmxpbmUtdGlsZS1tYXJnaW5cIjogYCR7aW5saW5lX3RpbGVfbWFyZ2lufXB4YCxcbiAgICBcIi0tdGFncy1kaXNwbGF5LWlubGluZVwiOiBgJHtzaG93X3RhZ3NfaW5saW5lID8gXCJmbGV4XCIgOiBcIm5vbmVcIn1gLFxuICAgIFwiLS10YWdzLWRpc3BsYXktZXhwYW5kZWRcIjogYCR7c2hvd190YWdzX2V4cGFuZGVkID8gXCJmbGV4XCIgOiBcIm5vbmVcIn1gLFxuICAgIFwiLS1zaG9wc3BvdHMtZGlzcGxheVwiOiBgJHtzaG93X3Nob3BzcG90cyA/IFwiYmxvY2tcIiA6IFwibm9uZVwifWAsXG4gICAgXCItLXRpbWVwaHJhc2UtZGlzcGxheVwiOiBgJHtzaG93X3RpbWVzdGFtcCA/IFwiYmxvY2tcIiA6IFwibm9uZVwifWAsXG4gICAgXCItLXNoYXJlLWljb24tZGlzcGxheVwiOiBgJHtzaG93X3NoYXJpbmcgPyBcImlubGluZS1ibG9ja1wiIDogXCJub25lXCJ9YFxuICB9O1xuICByZXR1cm4gT2JqZWN0LmVudHJpZXMobXV0YXRlZENzc1ZhcmlhYmxlcykubWFwKChba2V5LCB2YWx1ZV0pID0+IGAke2tleX06ICR7dmFsdWV9O2ApLmpvaW4oXCJcXG5cIik7XG59XG52YXIgaW5pdF9jc3NfdmFyaWFibGVzID0gX19lc20oe1xuICBcInNyYy9saWJzL2Nzcy12YXJpYWJsZXMudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2pzeC1odG1sLnRzXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCAuLi5jaGlsZHJlbikge1xuICBpZiAodHlwZW9mIHR5cGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBjaGlsZHJlbj8ubGVuZ3RoID8gdHlwZSh7IC4uLnByb3BzLCBjaGlsZHJlbiB9KSA6IHR5cGUocHJvcHMpO1xuICB9XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICBhcHBseVByb3BlcnRpZXMoZWxlbWVudCwgcHJvcHMgPz8ge30pO1xuICBjaGlsZHJlbj8uZm9yRWFjaCgoY2hpbGQpID0+IGFwcGVuZENoaWxkKGVsZW1lbnQsIGNoaWxkKSk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnQoYXJnKSB7XG4gIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnByb3BzIH0gPSBhcmcgPz8geyBjaGlsZHJlbjogW10gfTtcbiAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIE9iamVjdC5hc3NpZ24oZnJhZ21lbnQsIHByb3BzKTtcbiAgY2hpbGRyZW4/LmZvckVhY2goKGNoaWxkKSA9PiBhcHBlbmRDaGlsZChmcmFnbWVudCwgY2hpbGQpKTtcbiAgcmV0dXJuIGZyYWdtZW50O1xufVxuZnVuY3Rpb24gaXNFdmVudExpc3RlbmVyKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGtleS5zdGFydHNXaXRoKFwib25cIikgJiYgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG59XG5mdW5jdGlvbiBhcHBseVByb3BlcnRpZXMoZWxlbWVudCwgcHJvcHMpIHtcbiAgT2JqZWN0LmVudHJpZXMocHJvcHMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGlmIChpc0V2ZW50TGlzdGVuZXIoa2V5LCB2YWx1ZSkpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihrZXkuc2xpY2UoMikudG9Mb3dlckNhc2UoKSwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInN0eWxlXCIpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub3JtS2V5ID0gYWxpYXNlc1trZXldID8/IGtleTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5vcm1LZXksIFN0cmluZyh2YWx1ZSkpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBhcHBlbmRDaGlsZChlbGVtZW50LCBjaGlsZCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHtcbiAgICBjaGlsZC5mb3JFYWNoKChjKSA9PiBhcHBlbmRDaGlsZChlbGVtZW50LCBjKSk7XG4gIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgQXJyYXkuZnJvbShjaGlsZC5jaGlsZHJlbikuZm9yRWFjaCgoYykgPT4gZWxlbWVudC5hcHBlbmRDaGlsZChjKSk7XG4gIH0gZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICB9IGVsc2UgaWYgKGNoaWxkICE9PSB2b2lkIDAgJiYgY2hpbGQgIT09IG51bGwgJiYgY2hpbGQgIT09IGZhbHNlKSB7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcoY2hpbGQpKSk7XG4gIH1cbn1cbnZhciBhbGlhc2VzO1xudmFyIGluaXRfanN4X2h0bWwgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvanN4LWh0bWwudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBhbGlhc2VzID0ge1xuICAgICAgY2xhc3NOYW1lOiBcImNsYXNzXCIsXG4gICAgICBodG1sRm9yOiBcImZvclwiXG4gICAgfTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL3RpbGUubGliLnRzXG5mdW5jdGlvbiBoYW5kbGVUaWxlQ2xpY2soZSwgd2lkZ2V0VXJsKSB7XG4gIGNvbnN0IHVnY1RpbGVzID0gc2RrLnRpbGVzLnRpbGVzO1xuICBjb25zdCBjbGlja2VkRWxlbWVudCA9IGUudGFyZ2V0O1xuICBjb25zdCBjbGlja2VkVGlsZSA9IGNsaWNrZWRFbGVtZW50LmNsb3Nlc3QoXCIudWdjLXRpbGVcIik7XG4gIGlmICghY2xpY2tlZFRpbGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBjbGlja2VkIHRpbGVcIik7XG4gIH1cbiAgY29uc3QgdGlsZUlkID0gY2xpY2tlZFRpbGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgaWYgKCF0aWxlSWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCB0aWxlIElEXCIpO1xuICB9XG4gIGNvbnN0IHRpbGVEYXRhID0gdWdjVGlsZXNbdGlsZUlkXTtcbiAgY29uc3QgdGlsZUxpbmsgPSB3aWRnZXRVcmwgfHwgdGlsZURhdGEub3JpZ2luYWxfdXJsIHx8IHRpbGVEYXRhLm9yaWdpbmFsX2xpbms7XG4gIGlmICh0aWxlTGluaykge1xuICAgIHdpbmRvdy5vcGVuKHRpbGVMaW5rLCBcIl9ibGFua1wiKTtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0VGltZXBocmFzZSh0aW1lc3RhbXApIHtcbiAgaWYgKCF0aW1lc3RhbXApIHtcbiAgICByZXR1cm4gXCJqdXN0IG5vd1wiO1xuICB9XG4gIGNvbnN0IG5vdzIgPSBNYXRoLnJvdW5kKCgvKiBAX19QVVJFX18gKi8gbmV3IERhdGUoKSkuZ2V0VGltZSgpIC8gMWUzKTtcbiAgY29uc3QgdGhlbiA9IE1hdGgucm91bmQodGltZXN0YW1wKTtcbiAgaWYgKGlzTmFOKHRoZW4pKSB7XG4gICAgcmV0dXJuIFwiYSB3aGlsZSBhZ29cIjtcbiAgfVxuICBjb25zdCBkaWZmID0gbm93MiAtIHRoZW47XG4gIGxldCB0aW1lTnVtYmVyID0gZGlmZjtcbiAgbGV0IHRpbWVXb3JkID0gXCJcIjtcbiAgaWYgKGRpZmYgPj0gMjU5MmUzKSB7XG4gICAgdGltZU51bWJlciA9IE1hdGgucm91bmQoZGlmZiAvIDI1OTJlMyk7XG4gICAgdGltZVdvcmQgPSBcIm1vbnRoXCI7XG4gIH0gZWxzZSBpZiAoZGlmZiA+PSA2MDQ4MDApIHtcbiAgICB0aW1lTnVtYmVyID0gTWF0aC5yb3VuZChkaWZmIC8gNjA0ODAwKTtcbiAgICB0aW1lV29yZCA9IFwid2Vla1wiO1xuICB9IGVsc2UgaWYgKGRpZmYgPj0gODY0MDApIHtcbiAgICB0aW1lTnVtYmVyID0gTWF0aC5yb3VuZChkaWZmIC8gODY0MDApO1xuICAgIHRpbWVXb3JkID0gXCJkYXlcIjtcbiAgfSBlbHNlIGlmIChkaWZmID49IDM2MDApIHtcbiAgICB0aW1lTnVtYmVyID0gTWF0aC5yb3VuZChkaWZmIC8gMzYwMCk7XG4gICAgdGltZVdvcmQgPSBcImhvdXJcIjtcbiAgfSBlbHNlIGlmIChkaWZmID49IDYwKSB7XG4gICAgdGltZU51bWJlciA9IE1hdGgucm91bmQoZGlmZiAvIDYwKTtcbiAgICB0aW1lV29yZCA9IFwibWludXRlXCI7XG4gIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcbiAgICB0aW1lTnVtYmVyID0gZGlmZjtcbiAgICB0aW1lV29yZCA9IFwic2Vjb25kXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFwianVzdCBub3dcIjtcbiAgfVxuICBpZiAodGltZU51bWJlciAhPT0gMSkge1xuICAgIHRpbWVXb3JkICs9IFwic1wiO1xuICB9XG4gIHJldHVybiB0aW1lTnVtYmVyICsgXCIgXCIgKyB0aW1lV29yZCArIFwiIGFnb1wiO1xufVxudmFyIGluaXRfdGlsZV9saWIgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvdGlsZS5saWIudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL3dpZGdldC5jb21wb25lbnRzLnRzXG5mdW5jdGlvbiBsb2FkRXhwYW5kU2V0dGluZ0NvbXBvbmVudHMoKSB7XG4gIGNvbnN0IHsgc2hvd19zaG9wc3BvdHMsIHNob3dfcHJvZHVjdHMsIHNob3dfYWRkX3RvX2NhcnQgfSA9IHNkay5nZXRFeHBhbmRlZFRpbGVDb25maWcoKTtcbiAgaWYgKHNob3dfc2hvcHNwb3RzKSB7XG4gICAgc2RrLmFkZExvYWRlZENvbXBvbmVudHMoW1wic2hvcHNwb3RzXCJdKTtcbiAgfVxuICBzZGsuYWRkTG9hZGVkQ29tcG9uZW50cyhbXCJleHBhbmRlZC10aWxlXCJdKTtcbiAgaWYgKHNob3dfcHJvZHVjdHMpIHtcbiAgICBzZGsuYWRkTG9hZGVkQ29tcG9uZW50cyhbXCJwcm9kdWN0c1wiXSk7XG4gIH1cbiAgaWYgKHNob3dfYWRkX3RvX2NhcnQpIHtcbiAgICBzZGsuYWRkTG9hZGVkQ29tcG9uZW50cyhbXCJhZGQtdG8tY2FydFwiXSk7XG4gIH1cbn1cbnZhciBpbml0X3dpZGdldF9jb21wb25lbnRzID0gX19lc20oe1xuICBcInNyYy9saWJzL3dpZGdldC5jb21wb25lbnRzLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy93aWRnZXQubGF5b3V0LnRzXG5mdW5jdGlvbiBhZGRDU1NWYXJpYWJsZXNUb1BsYWNlbWVudChjc3NWYXJpYWJsZXMpIHtcbiAgY29uc3Qgc2hhZG93Um9vdCA9IHNkay5wbGFjZW1lbnQuZ2V0U2hhZG93Um9vdCgpO1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgc3R5bGUuaW5uZXJIVE1MID0gYFxuICAgICAgOmhvc3Qge1xuICAgICAgICAgICR7Y3NzVmFyaWFibGVzfVxuICAgICAgfWA7XG4gIHNoYWRvd1Jvb3QuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuZnVuY3Rpb24gaXNFbmFibGVkKCkge1xuICBjb25zdCB7IGVuYWJsZWQgfSA9IHNkay5nZXRXaWRnZXRPcHRpb25zKCk7XG4gIHJldHVybiBlbmFibGVkICYmIGhhc01pbmltdW1UaWxlc1JlcXVpcmVkKCk7XG59XG5mdW5jdGlvbiBoYXNNaW5pbXVtVGlsZXNSZXF1aXJlZCgpIHtcbiAgY29uc3QgeyBtaW5pbWFsX3RpbGVzIH0gPSBzZGsuZ2V0U3R5bGVDb25maWcoKTtcbiAgY29uc3QgbWluaW1hbFRpbGVzID0gcGFyc2VJbnQobWluaW1hbF90aWxlcyk7XG4gIGlmIChtaW5pbWFsVGlsZXMgJiYgbWluaW1hbFRpbGVzID4gMCkge1xuICAgIGNvbnN0IHRpbGVzID0gc2RrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudWdjLXRpbGVcIik7XG4gICAgaWYgKHRpbGVzICYmIHRpbGVzLmxlbmd0aCA+PSBtaW5pbWFsVGlsZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYE5vdCBlbm91Z2ggdGlsZXMgdG8gcmVuZGVyIHdpZGdldC4gRXhwZWN0ZWQgJHttaW5pbWFsVGlsZXN9IGJ1dCBmb3VuZCAke3RpbGVzLmxlbmd0aH1gKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbnZhciBpbml0X3dpZGdldF9sYXlvdXQgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvd2lkZ2V0LmxheW91dC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvc3NyLXdpbmRvdy5lc20ubWpzXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICYmIFwiY29uc3RydWN0b3JcIiBpbiBvYmogJiYgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG59XG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0LCBzcmMpIHtcbiAgaWYgKHRhcmdldCA9PT0gdm9pZCAwKSB7XG4gICAgdGFyZ2V0ID0ge307XG4gIH1cbiAgaWYgKHNyYyA9PT0gdm9pZCAwKSB7XG4gICAgc3JjID0ge307XG4gIH1cbiAgT2JqZWN0LmtleXMoc3JjKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBpZiAodHlwZW9mIHRhcmdldFtrZXldID09PSBcInVuZGVmaW5lZFwiKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaWYgKGlzT2JqZWN0KHNyY1trZXldKSAmJiBpc09iamVjdCh0YXJnZXRba2V5XSkgJiYgT2JqZWN0LmtleXMoc3JjW2tleV0pLmxlbmd0aCA+IDApIHtcbiAgICAgIGV4dGVuZCh0YXJnZXRba2V5XSwgc3JjW2tleV0pO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBnZXREb2N1bWVudCgpIHtcbiAgY29uc3QgZG9jID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQgOiB7fTtcbiAgZXh0ZW5kKGRvYywgc3NyRG9jdW1lbnQpO1xuICByZXR1cm4gZG9jO1xufVxuZnVuY3Rpb24gZ2V0V2luZG93KCkge1xuICBjb25zdCB3aW4gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge307XG4gIGV4dGVuZCh3aW4sIHNzcldpbmRvdyk7XG4gIHJldHVybiB3aW47XG59XG52YXIgc3NyRG9jdW1lbnQsIHNzcldpbmRvdztcbnZhciBpbml0X3Nzcl93aW5kb3dfZXNtID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL3Nzci13aW5kb3cuZXNtLm1qc1wiKCkge1xuICAgIHNzckRvY3VtZW50ID0ge1xuICAgICAgYm9keToge30sXG4gICAgICBhZGRFdmVudExpc3RlbmVyKCkge1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICB9LFxuICAgICAgYWN0aXZlRWxlbWVudDoge1xuICAgICAgICBibHVyKCkge1xuICAgICAgICB9LFxuICAgICAgICBub2RlTmFtZTogXCJcIlxuICAgICAgfSxcbiAgICAgIHF1ZXJ5U2VsZWN0b3IoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIHF1ZXJ5U2VsZWN0b3JBbGwoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0sXG4gICAgICBnZXRFbGVtZW50QnlJZCgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuICAgICAgY3JlYXRlRXZlbnQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5pdEV2ZW50KCkge1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBjcmVhdGVFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICBjaGlsZE5vZGVzOiBbXSxcbiAgICAgICAgICBzdHlsZToge30sXG4gICAgICAgICAgc2V0QXR0cmlidXRlKCkge1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0RWxlbWVudHNCeVRhZ05hbWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGNyZWF0ZUVsZW1lbnROUygpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSxcbiAgICAgIGltcG9ydE5vZGUoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgIGhhc2g6IFwiXCIsXG4gICAgICAgIGhvc3Q6IFwiXCIsXG4gICAgICAgIGhvc3RuYW1lOiBcIlwiLFxuICAgICAgICBocmVmOiBcIlwiLFxuICAgICAgICBvcmlnaW46IFwiXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIlwiLFxuICAgICAgICBwcm90b2NvbDogXCJcIixcbiAgICAgICAgc2VhcmNoOiBcIlwiXG4gICAgICB9XG4gICAgfTtcbiAgICBzc3JXaW5kb3cgPSB7XG4gICAgICBkb2N1bWVudDogc3NyRG9jdW1lbnQsXG4gICAgICBuYXZpZ2F0b3I6IHtcbiAgICAgICAgdXNlckFnZW50OiBcIlwiXG4gICAgICB9LFxuICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgaGFzaDogXCJcIixcbiAgICAgICAgaG9zdDogXCJcIixcbiAgICAgICAgaG9zdG5hbWU6IFwiXCIsXG4gICAgICAgIGhyZWY6IFwiXCIsXG4gICAgICAgIG9yaWdpbjogXCJcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiXCIsXG4gICAgICAgIHByb3RvY29sOiBcIlwiLFxuICAgICAgICBzZWFyY2g6IFwiXCJcbiAgICAgIH0sXG4gICAgICBoaXN0b3J5OiB7XG4gICAgICAgIHJlcGxhY2VTdGF0ZSgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgcHVzaFN0YXRlKCkge1xuICAgICAgICB9LFxuICAgICAgICBnbygpIHtcbiAgICAgICAgfSxcbiAgICAgICAgYmFjaygpIHtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIEN1c3RvbUV2ZW50OiBmdW5jdGlvbiBDdXN0b21FdmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9LFxuICAgICAgYWRkRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgIH0sXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyKCkge1xuICAgICAgfSxcbiAgICAgIGdldENvbXB1dGVkU3R5bGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZ2V0UHJvcGVydHlWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBJbWFnZSgpIHtcbiAgICAgIH0sXG4gICAgICBEYXRlKCkge1xuICAgICAgfSxcbiAgICAgIHNjcmVlbjoge30sXG4gICAgICBzZXRUaW1lb3V0KCkge1xuICAgICAgfSxcbiAgICAgIGNsZWFyVGltZW91dCgpIHtcbiAgICAgIH0sXG4gICAgICBtYXRjaE1lZGlhKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9LFxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIDApO1xuICAgICAgfSxcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC91dGlscy5tanNcbmZ1bmN0aW9uIGNsYXNzZXNUb1Rva2VucyhjbGFzc2VzMikge1xuICBpZiAoY2xhc3NlczIgPT09IHZvaWQgMCkge1xuICAgIGNsYXNzZXMyID0gXCJcIjtcbiAgfVxuICByZXR1cm4gY2xhc3NlczIudHJpbSgpLnNwbGl0KFwiIFwiKS5maWx0ZXIoKGMpID0+ICEhYy50cmltKCkpO1xufVxuZnVuY3Rpb24gZGVsZXRlUHJvcHMob2JqKSB7XG4gIGNvbnN0IG9iamVjdCA9IG9iajtcbiAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICB0cnkge1xuICAgICAgb2JqZWN0W2tleV0gPSBudWxsO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIG5leHRUaWNrKGNhbGxiYWNrLCBkZWxheSkge1xuICBpZiAoZGVsYXkgPT09IHZvaWQgMCkge1xuICAgIGRlbGF5ID0gMDtcbiAgfVxuICByZXR1cm4gc2V0VGltZW91dChjYWxsYmFjaywgZGVsYXkpO1xufVxuZnVuY3Rpb24gbm93KCkge1xuICByZXR1cm4gRGF0ZS5ub3coKTtcbn1cbmZ1bmN0aW9uIGdldENvbXB1dGVkU3R5bGUyKGVsKSB7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgbGV0IHN0eWxlO1xuICBpZiAod2luZG93Mi5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgc3R5bGUgPSB3aW5kb3cyLmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpO1xuICB9XG4gIGlmICghc3R5bGUgJiYgZWwuY3VycmVudFN0eWxlKSB7XG4gICAgc3R5bGUgPSBlbC5jdXJyZW50U3R5bGU7XG4gIH1cbiAgaWYgKCFzdHlsZSkge1xuICAgIHN0eWxlID0gZWwuc3R5bGU7XG4gIH1cbiAgcmV0dXJuIHN0eWxlO1xufVxuZnVuY3Rpb24gZ2V0VHJhbnNsYXRlKGVsLCBheGlzKSB7XG4gIGlmIChheGlzID09PSB2b2lkIDApIHtcbiAgICBheGlzID0gXCJ4XCI7XG4gIH1cbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBsZXQgbWF0cml4O1xuICBsZXQgY3VyVHJhbnNmb3JtO1xuICBsZXQgdHJhbnNmb3JtTWF0cml4O1xuICBjb25zdCBjdXJTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUyKGVsKTtcbiAgaWYgKHdpbmRvdzIuV2ViS2l0Q1NTTWF0cml4KSB7XG4gICAgY3VyVHJhbnNmb3JtID0gY3VyU3R5bGUudHJhbnNmb3JtIHx8IGN1clN0eWxlLndlYmtpdFRyYW5zZm9ybTtcbiAgICBpZiAoY3VyVHJhbnNmb3JtLnNwbGl0KFwiLFwiKS5sZW5ndGggPiA2KSB7XG4gICAgICBjdXJUcmFuc2Zvcm0gPSBjdXJUcmFuc2Zvcm0uc3BsaXQoXCIsIFwiKS5tYXAoKGEpID0+IGEucmVwbGFjZShcIixcIiwgXCIuXCIpKS5qb2luKFwiLCBcIik7XG4gICAgfVxuICAgIHRyYW5zZm9ybU1hdHJpeCA9IG5ldyB3aW5kb3cyLldlYktpdENTU01hdHJpeChjdXJUcmFuc2Zvcm0gPT09IFwibm9uZVwiID8gXCJcIiA6IGN1clRyYW5zZm9ybSk7XG4gIH0gZWxzZSB7XG4gICAgdHJhbnNmb3JtTWF0cml4ID0gY3VyU3R5bGUuTW96VHJhbnNmb3JtIHx8IGN1clN0eWxlLk9UcmFuc2Zvcm0gfHwgY3VyU3R5bGUuTXNUcmFuc2Zvcm0gfHwgY3VyU3R5bGUubXNUcmFuc2Zvcm0gfHwgY3VyU3R5bGUudHJhbnNmb3JtIHx8IGN1clN0eWxlLmdldFByb3BlcnR5VmFsdWUoXCJ0cmFuc2Zvcm1cIikucmVwbGFjZShcInRyYW5zbGF0ZShcIiwgXCJtYXRyaXgoMSwgMCwgMCwgMSxcIik7XG4gICAgbWF0cml4ID0gdHJhbnNmb3JtTWF0cml4LnRvU3RyaW5nKCkuc3BsaXQoXCIsXCIpO1xuICB9XG4gIGlmIChheGlzID09PSBcInhcIikge1xuICAgIGlmICh3aW5kb3cyLldlYktpdENTU01hdHJpeCkgY3VyVHJhbnNmb3JtID0gdHJhbnNmb3JtTWF0cml4Lm00MTtcbiAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNikgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTJdKTtcbiAgICBlbHNlIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzRdKTtcbiAgfVxuICBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICBpZiAod2luZG93Mi5XZWJLaXRDU1NNYXRyaXgpIGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDI7XG4gICAgZWxzZSBpZiAobWF0cml4Lmxlbmd0aCA9PT0gMTYpIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzEzXSk7XG4gICAgZWxzZSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs1XSk7XG4gIH1cbiAgcmV0dXJuIGN1clRyYW5zZm9ybSB8fCAwO1xufVxuZnVuY3Rpb24gaXNPYmplY3QyKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSBcIm9iamVjdFwiICYmIG8gIT09IG51bGwgJiYgby5jb25zdHJ1Y3RvciAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpID09PSBcIk9iamVjdFwiO1xufVxuZnVuY3Rpb24gaXNOb2RlKG5vZGUpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5IVE1MRWxlbWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIG5vZGUgJiYgKG5vZGUubm9kZVR5cGUgPT09IDEgfHwgbm9kZS5ub2RlVHlwZSA9PT0gMTEpO1xufVxuZnVuY3Rpb24gZXh0ZW5kMigpIHtcbiAgY29uc3QgdG8gPSBPYmplY3QoYXJndW1lbnRzLmxlbmd0aCA8PSAwID8gdm9pZCAwIDogYXJndW1lbnRzWzBdKTtcbiAgY29uc3Qgbm9FeHRlbmQgPSBbXCJfX3Byb3RvX19cIiwgXCJjb25zdHJ1Y3RvclwiLCBcInByb3RvdHlwZVwiXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBuZXh0U291cmNlID0gaSA8IDAgfHwgYXJndW1lbnRzLmxlbmd0aCA8PSBpID8gdm9pZCAwIDogYXJndW1lbnRzW2ldO1xuICAgIGlmIChuZXh0U291cmNlICE9PSB2b2lkIDAgJiYgbmV4dFNvdXJjZSAhPT0gbnVsbCAmJiAhaXNOb2RlKG5leHRTb3VyY2UpKSB7XG4gICAgICBjb25zdCBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpLmZpbHRlcigoa2V5KSA9PiBub0V4dGVuZC5pbmRleE9mKGtleSkgPCAwKTtcbiAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4ICs9IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dEtleSA9IGtleXNBcnJheVtuZXh0SW5kZXhdO1xuICAgICAgICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuZXh0U291cmNlLCBuZXh0S2V5KTtcbiAgICAgICAgaWYgKGRlc2MgIT09IHZvaWQgMCAmJiBkZXNjLmVudW1lcmFibGUpIHtcbiAgICAgICAgICBpZiAoaXNPYmplY3QyKHRvW25leHRLZXldKSAmJiBpc09iamVjdDIobmV4dFNvdXJjZVtuZXh0S2V5XSkpIHtcbiAgICAgICAgICAgIGlmIChuZXh0U291cmNlW25leHRLZXldLl9fc3dpcGVyX18pIHtcbiAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXh0ZW5kMih0b1tuZXh0S2V5XSwgbmV4dFNvdXJjZVtuZXh0S2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICghaXNPYmplY3QyKHRvW25leHRLZXldKSAmJiBpc09iamVjdDIobmV4dFNvdXJjZVtuZXh0S2V5XSkpIHtcbiAgICAgICAgICAgIHRvW25leHRLZXldID0ge307XG4gICAgICAgICAgICBpZiAobmV4dFNvdXJjZVtuZXh0S2V5XS5fX3N3aXBlcl9fKSB7XG4gICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGV4dGVuZDIodG9bbmV4dEtleV0sIG5leHRTb3VyY2VbbmV4dEtleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0bztcbn1cbmZ1bmN0aW9uIHNldENTU1Byb3BlcnR5KGVsLCB2YXJOYW1lLCB2YXJWYWx1ZSkge1xuICBlbC5zdHlsZS5zZXRQcm9wZXJ0eSh2YXJOYW1lLCB2YXJWYWx1ZSk7XG59XG5mdW5jdGlvbiBhbmltYXRlQ1NTTW9kZVNjcm9sbChfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIHRhcmdldFBvc2l0aW9uLFxuICAgIHNpZGVcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IC1zd2lwZXIudHJhbnNsYXRlO1xuICBsZXQgc3RhcnRUaW1lID0gbnVsbDtcbiAgbGV0IHRpbWU7XG4gIGNvbnN0IGR1cmF0aW9uID0gc3dpcGVyLnBhcmFtcy5zcGVlZDtcbiAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9IFwibm9uZVwiO1xuICB3aW5kb3cyLmNhbmNlbEFuaW1hdGlvbkZyYW1lKHN3aXBlci5jc3NNb2RlRnJhbWVJRCk7XG4gIGNvbnN0IGRpciA9IHRhcmdldFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbiA/IFwibmV4dFwiIDogXCJwcmV2XCI7XG4gIGNvbnN0IGlzT3V0T2ZCb3VuZCA9IChjdXJyZW50LCB0YXJnZXQpID0+IHtcbiAgICByZXR1cm4gZGlyID09PSBcIm5leHRcIiAmJiBjdXJyZW50ID49IHRhcmdldCB8fCBkaXIgPT09IFwicHJldlwiICYmIGN1cnJlbnQgPD0gdGFyZ2V0O1xuICB9O1xuICBjb25zdCBhbmltYXRlID0gKCkgPT4ge1xuICAgIHRpbWUgPSAoLyogQF9fUFVSRV9fICovIG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICBpZiAoc3RhcnRUaW1lID09PSBudWxsKSB7XG4gICAgICBzdGFydFRpbWUgPSB0aW1lO1xuICAgIH1cbiAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWF4KE1hdGgubWluKCh0aW1lIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uLCAxKSwgMCk7XG4gICAgY29uc3QgZWFzZVByb2dyZXNzID0gMC41IC0gTWF0aC5jb3MocHJvZ3Jlc3MgKiBNYXRoLlBJKSAvIDI7XG4gICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb24gKyBlYXNlUHJvZ3Jlc3MgKiAodGFyZ2V0UG9zaXRpb24gLSBzdGFydFBvc2l0aW9uKTtcbiAgICBpZiAoaXNPdXRPZkJvdW5kKGN1cnJlbnRQb3NpdGlvbiwgdGFyZ2V0UG9zaXRpb24pKSB7XG4gICAgICBjdXJyZW50UG9zaXRpb24gPSB0YXJnZXRQb3NpdGlvbjtcbiAgICB9XG4gICAgc3dpcGVyLndyYXBwZXJFbC5zY3JvbGxUbyh7XG4gICAgICBbc2lkZV06IGN1cnJlbnRQb3NpdGlvblxuICAgIH0pO1xuICAgIGlmIChpc091dE9mQm91bmQoY3VycmVudFBvc2l0aW9uLCB0YXJnZXRQb3NpdGlvbikpIHtcbiAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9IFwiXCI7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5vdmVyZmxvdyA9IFwiXCI7XG4gICAgICAgIHN3aXBlci53cmFwcGVyRWwuc2Nyb2xsVG8oe1xuICAgICAgICAgIFtzaWRlXTogY3VycmVudFBvc2l0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB3aW5kb3cyLmNhbmNlbEFuaW1hdGlvbkZyYW1lKHN3aXBlci5jc3NNb2RlRnJhbWVJRCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXBlci5jc3NNb2RlRnJhbWVJRCA9IHdpbmRvdzIucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICB9O1xuICBhbmltYXRlKCk7XG59XG5mdW5jdGlvbiBlbGVtZW50Q2hpbGRyZW4oZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgaWYgKHNlbGVjdG9yID09PSB2b2lkIDApIHtcbiAgICBzZWxlY3RvciA9IFwiXCI7XG4gIH1cbiAgY29uc3QgY2hpbGRyZW4gPSBbLi4uZWxlbWVudC5jaGlsZHJlbl07XG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTFNsb3RFbGVtZW50KSB7XG4gICAgY2hpbGRyZW4ucHVzaCguLi5lbGVtZW50LmFzc2lnbmVkRWxlbWVudHMoKSk7XG4gIH1cbiAgaWYgKCFzZWxlY3Rvcikge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICByZXR1cm4gY2hpbGRyZW4uZmlsdGVyKChlbCkgPT4gZWwubWF0Y2hlcyhzZWxlY3RvcikpO1xufVxuZnVuY3Rpb24gZWxlbWVudElzQ2hpbGRPZihlbCwgcGFyZW50KSB7XG4gIGNvbnN0IGlzQ2hpbGQgPSBwYXJlbnQuY29udGFpbnMoZWwpO1xuICBpZiAoIWlzQ2hpbGQgJiYgcGFyZW50IGluc3RhbmNlb2YgSFRNTFNsb3RFbGVtZW50KSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbLi4ucGFyZW50LmFzc2lnbmVkRWxlbWVudHMoKV07XG4gICAgcmV0dXJuIGNoaWxkcmVuLmluY2x1ZGVzKGVsKTtcbiAgfVxuICByZXR1cm4gaXNDaGlsZDtcbn1cbmZ1bmN0aW9uIHNob3dXYXJuaW5nKHRleHQpIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLndhcm4odGV4dCk7XG4gICAgcmV0dXJuO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgfVxufVxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudDIodGFnLCBjbGFzc2VzMikge1xuICBpZiAoY2xhc3NlczIgPT09IHZvaWQgMCkge1xuICAgIGNsYXNzZXMyID0gW107XG4gIH1cbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gIGVsLmNsYXNzTGlzdC5hZGQoLi4uQXJyYXkuaXNBcnJheShjbGFzc2VzMikgPyBjbGFzc2VzMiA6IGNsYXNzZXNUb1Rva2VucyhjbGFzc2VzMikpO1xuICByZXR1cm4gZWw7XG59XG5mdW5jdGlvbiBlbGVtZW50T2Zmc2V0KGVsKSB7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgY29uc3QgZG9jdW1lbnQyID0gZ2V0RG9jdW1lbnQoKTtcbiAgY29uc3QgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudDIuYm9keTtcbiAgY29uc3QgY2xpZW50VG9wID0gZWwuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XG4gIGNvbnN0IGNsaWVudExlZnQgPSBlbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuICBjb25zdCBzY3JvbGxUb3AgPSBlbCA9PT0gd2luZG93MiA/IHdpbmRvdzIuc2Nyb2xsWSA6IGVsLnNjcm9sbFRvcDtcbiAgY29uc3Qgc2Nyb2xsTGVmdCA9IGVsID09PSB3aW5kb3cyID8gd2luZG93Mi5zY3JvbGxYIDogZWwuc2Nyb2xsTGVmdDtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IGJveC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3AsXG4gICAgbGVmdDogYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdFxuICB9O1xufVxuZnVuY3Rpb24gZWxlbWVudFByZXZBbGwoZWwsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IHByZXZFbHMgPSBbXTtcbiAgd2hpbGUgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICBjb25zdCBwcmV2ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmIChwcmV2Lm1hdGNoZXMoc2VsZWN0b3IpKSBwcmV2RWxzLnB1c2gocHJldik7XG4gICAgfSBlbHNlIHByZXZFbHMucHVzaChwcmV2KTtcbiAgICBlbCA9IHByZXY7XG4gIH1cbiAgcmV0dXJuIHByZXZFbHM7XG59XG5mdW5jdGlvbiBlbGVtZW50TmV4dEFsbChlbCwgc2VsZWN0b3IpIHtcbiAgY29uc3QgbmV4dEVscyA9IFtdO1xuICB3aGlsZSAoZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgY29uc3QgbmV4dCA9IGVsLm5leHRFbGVtZW50U2libGluZztcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmIChuZXh0Lm1hdGNoZXMoc2VsZWN0b3IpKSBuZXh0RWxzLnB1c2gobmV4dCk7XG4gICAgfSBlbHNlIG5leHRFbHMucHVzaChuZXh0KTtcbiAgICBlbCA9IG5leHQ7XG4gIH1cbiAgcmV0dXJuIG5leHRFbHM7XG59XG5mdW5jdGlvbiBlbGVtZW50U3R5bGUoZWwsIHByb3ApIHtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICByZXR1cm4gd2luZG93Mi5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApO1xufVxuZnVuY3Rpb24gZWxlbWVudEluZGV4KGVsKSB7XG4gIGxldCBjaGlsZCA9IGVsO1xuICBsZXQgaTtcbiAgaWYgKGNoaWxkKSB7XG4gICAgaSA9IDA7XG4gICAgd2hpbGUgKChjaGlsZCA9IGNoaWxkLnByZXZpb3VzU2libGluZykgIT09IG51bGwpIHtcbiAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gMSkgaSArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gdm9pZCAwO1xufVxuZnVuY3Rpb24gZWxlbWVudFBhcmVudHMoZWwsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IHBhcmVudHMgPSBbXTtcbiAgbGV0IHBhcmVudCA9IGVsLnBhcmVudEVsZW1lbnQ7XG4gIHdoaWxlIChwYXJlbnQpIHtcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmIChwYXJlbnQubWF0Y2hlcyhzZWxlY3RvcikpIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICB9XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIHBhcmVudHM7XG59XG5mdW5jdGlvbiBlbGVtZW50T3V0ZXJTaXplKGVsLCBzaXplLCBpbmNsdWRlTWFyZ2lucykge1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGlmIChpbmNsdWRlTWFyZ2lucykge1xuICAgIHJldHVybiBlbFtzaXplID09PSBcIndpZHRoXCIgPyBcIm9mZnNldFdpZHRoXCIgOiBcIm9mZnNldEhlaWdodFwiXSArIHBhcnNlRmxvYXQod2luZG93Mi5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHNpemUgPT09IFwid2lkdGhcIiA/IFwibWFyZ2luLXJpZ2h0XCIgOiBcIm1hcmdpbi10b3BcIikpICsgcGFyc2VGbG9hdCh3aW5kb3cyLmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc2l6ZSA9PT0gXCJ3aWR0aFwiID8gXCJtYXJnaW4tbGVmdFwiIDogXCJtYXJnaW4tYm90dG9tXCIpKTtcbiAgfVxuICByZXR1cm4gZWwub2Zmc2V0V2lkdGg7XG59XG5mdW5jdGlvbiBtYWtlRWxlbWVudHNBcnJheShlbCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkoZWwpID8gZWwgOiBbZWxdKS5maWx0ZXIoKGUpID0+ICEhZSk7XG59XG52YXIgaW5pdF91dGlscyA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC91dGlscy5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9zd2lwZXItY29yZS5tanNcbmZ1bmN0aW9uIGNhbGNTdXBwb3J0KCkge1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IGRvY3VtZW50MiA9IGdldERvY3VtZW50KCk7XG4gIHJldHVybiB7XG4gICAgc21vb3RoU2Nyb2xsOiBkb2N1bWVudDIuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50Mi5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgXCJzY3JvbGxCZWhhdmlvclwiIGluIGRvY3VtZW50Mi5kb2N1bWVudEVsZW1lbnQuc3R5bGUsXG4gICAgdG91Y2g6ICEhKFwib250b3VjaHN0YXJ0XCIgaW4gd2luZG93MiB8fCB3aW5kb3cyLkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQyIGluc3RhbmNlb2Ygd2luZG93Mi5Eb2N1bWVudFRvdWNoKVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0U3VwcG9ydCgpIHtcbiAgaWYgKCFzdXBwb3J0KSB7XG4gICAgc3VwcG9ydCA9IGNhbGNTdXBwb3J0KCk7XG4gIH1cbiAgcmV0dXJuIHN1cHBvcnQ7XG59XG5mdW5jdGlvbiBjYWxjRGV2aWNlKF90ZW1wKSB7XG4gIGxldCB7XG4gICAgdXNlckFnZW50XG4gIH0gPSBfdGVtcCA9PT0gdm9pZCAwID8ge30gOiBfdGVtcDtcbiAgY29uc3Qgc3VwcG9ydDIgPSBnZXRTdXBwb3J0KCk7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgY29uc3QgcGxhdGZvcm0gPSB3aW5kb3cyLm5hdmlnYXRvci5wbGF0Zm9ybTtcbiAgY29uc3QgdWEgPSB1c2VyQWdlbnQgfHwgd2luZG93Mi5uYXZpZ2F0b3IudXNlckFnZW50O1xuICBjb25zdCBkZXZpY2UgPSB7XG4gICAgaW9zOiBmYWxzZSxcbiAgICBhbmRyb2lkOiBmYWxzZVxuICB9O1xuICBjb25zdCBzY3JlZW5XaWR0aDIgPSB3aW5kb3cyLnNjcmVlbi53aWR0aDtcbiAgY29uc3Qgc2NyZWVuSGVpZ2h0ID0gd2luZG93Mi5zY3JlZW4uaGVpZ2h0O1xuICBjb25zdCBhbmRyb2lkID0gdWEubWF0Y2goLyhBbmRyb2lkKTs/W1xcc1xcL10rKFtcXGQuXSspPy8pO1xuICBsZXQgaXBhZCA9IHVhLm1hdGNoKC8oaVBhZCkuKk9TXFxzKFtcXGRfXSspLyk7XG4gIGNvbnN0IGlwb2QgPSB1YS5tYXRjaCgvKGlQb2QpKC4qT1NcXHMoW1xcZF9dKykpPy8pO1xuICBjb25zdCBpcGhvbmUgPSAhaXBhZCAmJiB1YS5tYXRjaCgvKGlQaG9uZVxcc09TfGlPUylcXHMoW1xcZF9dKykvKTtcbiAgY29uc3Qgd2luZG93cyA9IHBsYXRmb3JtID09PSBcIldpbjMyXCI7XG4gIGxldCBtYWNvcyA9IHBsYXRmb3JtID09PSBcIk1hY0ludGVsXCI7XG4gIGNvbnN0IGlQYWRTY3JlZW5zID0gW1wiMTAyNHgxMzY2XCIsIFwiMTM2NngxMDI0XCIsIFwiODM0eDExOTRcIiwgXCIxMTk0eDgzNFwiLCBcIjgzNHgxMTEyXCIsIFwiMTExMng4MzRcIiwgXCI3Njh4MTAyNFwiLCBcIjEwMjR4NzY4XCIsIFwiODIweDExODBcIiwgXCIxMTgweDgyMFwiLCBcIjgxMHgxMDgwXCIsIFwiMTA4MHg4MTBcIl07XG4gIGlmICghaXBhZCAmJiBtYWNvcyAmJiBzdXBwb3J0Mi50b3VjaCAmJiBpUGFkU2NyZWVucy5pbmRleE9mKGAke3NjcmVlbldpZHRoMn14JHtzY3JlZW5IZWlnaHR9YCkgPj0gMCkge1xuICAgIGlwYWQgPSB1YS5tYXRjaCgvKFZlcnNpb24pXFwvKFtcXGQuXSspLyk7XG4gICAgaWYgKCFpcGFkKSBpcGFkID0gWzAsIDEsIFwiMTNfMF8wXCJdO1xuICAgIG1hY29zID0gZmFsc2U7XG4gIH1cbiAgaWYgKGFuZHJvaWQgJiYgIXdpbmRvd3MpIHtcbiAgICBkZXZpY2Uub3MgPSBcImFuZHJvaWRcIjtcbiAgICBkZXZpY2UuYW5kcm9pZCA9IHRydWU7XG4gIH1cbiAgaWYgKGlwYWQgfHwgaXBob25lIHx8IGlwb2QpIHtcbiAgICBkZXZpY2Uub3MgPSBcImlvc1wiO1xuICAgIGRldmljZS5pb3MgPSB0cnVlO1xuICB9XG4gIHJldHVybiBkZXZpY2U7XG59XG5mdW5jdGlvbiBnZXREZXZpY2Uob3ZlcnJpZGVzKSB7XG4gIGlmIChvdmVycmlkZXMgPT09IHZvaWQgMCkge1xuICAgIG92ZXJyaWRlcyA9IHt9O1xuICB9XG4gIGlmICghZGV2aWNlQ2FjaGVkKSB7XG4gICAgZGV2aWNlQ2FjaGVkID0gY2FsY0RldmljZShvdmVycmlkZXMpO1xuICB9XG4gIHJldHVybiBkZXZpY2VDYWNoZWQ7XG59XG5mdW5jdGlvbiBjYWxjQnJvd3NlcigpIHtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBjb25zdCBkZXZpY2UgPSBnZXREZXZpY2UoKTtcbiAgbGV0IG5lZWRQZXJzcGVjdGl2ZUZpeCA9IGZhbHNlO1xuICBmdW5jdGlvbiBpc1NhZmFyaSgpIHtcbiAgICBjb25zdCB1YSA9IHdpbmRvdzIubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiB1YS5pbmRleE9mKFwic2FmYXJpXCIpID49IDAgJiYgdWEuaW5kZXhPZihcImNocm9tZVwiKSA8IDAgJiYgdWEuaW5kZXhPZihcImFuZHJvaWRcIikgPCAwO1xuICB9XG4gIGlmIChpc1NhZmFyaSgpKSB7XG4gICAgY29uc3QgdWEgPSBTdHJpbmcod2luZG93Mi5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBpZiAodWEuaW5jbHVkZXMoXCJWZXJzaW9uL1wiKSkge1xuICAgICAgY29uc3QgW21ham9yLCBtaW5vcl0gPSB1YS5zcGxpdChcIlZlcnNpb24vXCIpWzFdLnNwbGl0KFwiIFwiKVswXS5zcGxpdChcIi5cIikubWFwKChudW0pID0+IE51bWJlcihudW0pKTtcbiAgICAgIG5lZWRQZXJzcGVjdGl2ZUZpeCA9IG1ham9yIDwgMTYgfHwgbWFqb3IgPT09IDE2ICYmIG1pbm9yIDwgMjtcbiAgICB9XG4gIH1cbiAgY29uc3QgaXNXZWJWaWV3ID0gLyhpUGhvbmV8aVBvZHxpUGFkKS4qQXBwbGVXZWJLaXQoPyEuKlNhZmFyaSkvaS50ZXN0KHdpbmRvdzIubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIGNvbnN0IGlzU2FmYXJpQnJvd3NlciA9IGlzU2FmYXJpKCk7XG4gIGNvbnN0IG5lZWQzZEZpeCA9IGlzU2FmYXJpQnJvd3NlciB8fCBpc1dlYlZpZXcgJiYgZGV2aWNlLmlvcztcbiAgcmV0dXJuIHtcbiAgICBpc1NhZmFyaTogbmVlZFBlcnNwZWN0aXZlRml4IHx8IGlzU2FmYXJpQnJvd3NlcixcbiAgICBuZWVkUGVyc3BlY3RpdmVGaXgsXG4gICAgbmVlZDNkRml4LFxuICAgIGlzV2ViVmlld1xuICB9O1xufVxuZnVuY3Rpb24gZ2V0QnJvd3NlcigpIHtcbiAgaWYgKCFicm93c2VyKSB7XG4gICAgYnJvd3NlciA9IGNhbGNCcm93c2VyKCk7XG4gIH1cbiAgcmV0dXJuIGJyb3dzZXI7XG59XG5mdW5jdGlvbiBSZXNpemUoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBvbixcbiAgICBlbWl0XG4gIH0gPSBfcmVmO1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGxldCBvYnNlcnZlciA9IG51bGw7XG4gIGxldCBhbmltYXRpb25GcmFtZSA9IG51bGw7XG4gIGNvbnN0IHJlc2l6ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm47XG4gICAgZW1pdChcImJlZm9yZVJlc2l6ZVwiKTtcbiAgICBlbWl0KFwicmVzaXplXCIpO1xuICB9O1xuICBjb25zdCBjcmVhdGVPYnNlcnZlciA9ICgpID0+IHtcbiAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHJldHVybjtcbiAgICBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoZW50cmllcykgPT4ge1xuICAgICAgYW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cyLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHRcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgbGV0IG5ld1dpZHRoID0gd2lkdGg7XG4gICAgICAgIGxldCBuZXdIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoX3JlZjIpID0+IHtcbiAgICAgICAgICBsZXQge1xuICAgICAgICAgICAgY29udGVudEJveFNpemUsXG4gICAgICAgICAgICBjb250ZW50UmVjdCxcbiAgICAgICAgICAgIHRhcmdldFxuICAgICAgICAgIH0gPSBfcmVmMjtcbiAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldCAhPT0gc3dpcGVyLmVsKSByZXR1cm47XG4gICAgICAgICAgbmV3V2lkdGggPSBjb250ZW50UmVjdCA/IGNvbnRlbnRSZWN0LndpZHRoIDogKGNvbnRlbnRCb3hTaXplWzBdIHx8IGNvbnRlbnRCb3hTaXplKS5pbmxpbmVTaXplO1xuICAgICAgICAgIG5ld0hlaWdodCA9IGNvbnRlbnRSZWN0ID8gY29udGVudFJlY3QuaGVpZ2h0IDogKGNvbnRlbnRCb3hTaXplWzBdIHx8IGNvbnRlbnRCb3hTaXplKS5ibG9ja1NpemU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobmV3V2lkdGggIT09IHdpZHRoIHx8IG5ld0hlaWdodCAhPT0gaGVpZ2h0KSB7XG4gICAgICAgICAgcmVzaXplSGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHN3aXBlci5lbCk7XG4gIH07XG4gIGNvbnN0IHJlbW92ZU9ic2VydmVyID0gKCkgPT4ge1xuICAgIGlmIChhbmltYXRpb25GcmFtZSkge1xuICAgICAgd2luZG93Mi5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZSk7XG4gICAgfVxuICAgIGlmIChvYnNlcnZlciAmJiBvYnNlcnZlci51bm9ic2VydmUgJiYgc3dpcGVyLmVsKSB7XG4gICAgICBvYnNlcnZlci51bm9ic2VydmUoc3dpcGVyLmVsKTtcbiAgICAgIG9ic2VydmVyID0gbnVsbDtcbiAgICB9XG4gIH07XG4gIGNvbnN0IG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlciA9ICgpID0+IHtcbiAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHJldHVybjtcbiAgICBlbWl0KFwib3JpZW50YXRpb25jaGFuZ2VcIik7XG4gIH07XG4gIG9uKFwiaW5pdFwiLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMucmVzaXplT2JzZXJ2ZXIgJiYgdHlwZW9mIHdpbmRvdzIuUmVzaXplT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGNyZWF0ZU9ic2VydmVyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbmRvdzIuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZXNpemVIYW5kbGVyKTtcbiAgICB3aW5kb3cyLmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIpO1xuICB9KTtcbiAgb24oXCJkZXN0cm95XCIsICgpID0+IHtcbiAgICByZW1vdmVPYnNlcnZlcigpO1xuICAgIHdpbmRvdzIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZXNpemVIYW5kbGVyKTtcbiAgICB3aW5kb3cyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIE9ic2VydmVyKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgZXh0ZW5kUGFyYW1zLFxuICAgIG9uLFxuICAgIGVtaXRcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IG9ic2VydmVycyA9IFtdO1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IGF0dGFjaCA9IGZ1bmN0aW9uKHRhcmdldCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgT2JzZXJ2ZXJGdW5jID0gd2luZG93Mi5NdXRhdGlvbk9ic2VydmVyIHx8IHdpbmRvdzIuV2Via2l0TXV0YXRpb25PYnNlcnZlcjtcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBPYnNlcnZlckZ1bmMoKG11dGF0aW9ucykgPT4ge1xuICAgICAgaWYgKHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fKSByZXR1cm47XG4gICAgICBpZiAobXV0YXRpb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBlbWl0KFwib2JzZXJ2ZXJVcGRhdGVcIiwgbXV0YXRpb25zWzBdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2JzZXJ2ZXJVcGRhdGUgPSBmdW5jdGlvbiBvYnNlcnZlclVwZGF0ZTIoKSB7XG4gICAgICAgIGVtaXQoXCJvYnNlcnZlclVwZGF0ZVwiLCBtdXRhdGlvbnNbMF0pO1xuICAgICAgfTtcbiAgICAgIGlmICh3aW5kb3cyLnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICB3aW5kb3cyLnJlcXVlc3RBbmltYXRpb25GcmFtZShvYnNlcnZlclVwZGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cyLnNldFRpbWVvdXQob2JzZXJ2ZXJVcGRhdGUsIDApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7XG4gICAgICBhdHRyaWJ1dGVzOiB0eXBlb2Ygb3B0aW9ucy5hdHRyaWJ1dGVzID09PSBcInVuZGVmaW5lZFwiID8gdHJ1ZSA6IG9wdGlvbnMuYXR0cmlidXRlcyxcbiAgICAgIGNoaWxkTGlzdDogc3dpcGVyLmlzRWxlbWVudCB8fCAodHlwZW9mIG9wdGlvbnMuY2hpbGRMaXN0ID09PSBcInVuZGVmaW5lZFwiID8gdHJ1ZSA6IG9wdGlvbnMpLmNoaWxkTGlzdCxcbiAgICAgIGNoYXJhY3RlckRhdGE6IHR5cGVvZiBvcHRpb25zLmNoYXJhY3RlckRhdGEgPT09IFwidW5kZWZpbmVkXCIgPyB0cnVlIDogb3B0aW9ucy5jaGFyYWN0ZXJEYXRhXG4gICAgfSk7XG4gICAgb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICB9O1xuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5vYnNlcnZlcikgcmV0dXJuO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLm9ic2VydmVQYXJlbnRzKSB7XG4gICAgICBjb25zdCBjb250YWluZXJQYXJlbnRzID0gZWxlbWVudFBhcmVudHMoc3dpcGVyLmhvc3RFbCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRhaW5lclBhcmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXR0YWNoKGNvbnRhaW5lclBhcmVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBhdHRhY2goc3dpcGVyLmhvc3RFbCwge1xuICAgICAgY2hpbGRMaXN0OiBzd2lwZXIucGFyYW1zLm9ic2VydmVTbGlkZUNoaWxkcmVuXG4gICAgfSk7XG4gICAgYXR0YWNoKHN3aXBlci53cmFwcGVyRWwsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlXG4gICAgfSk7XG4gIH07XG4gIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgb2JzZXJ2ZXJzLmZvckVhY2goKG9ic2VydmVyKSA9PiB7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXJzLnNwbGljZSgwLCBvYnNlcnZlcnMubGVuZ3RoKTtcbiAgfTtcbiAgZXh0ZW5kUGFyYW1zKHtcbiAgICBvYnNlcnZlcjogZmFsc2UsXG4gICAgb2JzZXJ2ZVBhcmVudHM6IGZhbHNlLFxuICAgIG9ic2VydmVTbGlkZUNoaWxkcmVuOiBmYWxzZVxuICB9KTtcbiAgb24oXCJpbml0XCIsIGluaXQpO1xuICBvbihcImRlc3Ryb3lcIiwgZGVzdHJveSk7XG59XG5mdW5jdGlvbiB1cGRhdGVTaXplKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBsZXQgd2lkdGg7XG4gIGxldCBoZWlnaHQ7XG4gIGNvbnN0IGVsID0gc3dpcGVyLmVsO1xuICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMud2lkdGggIT09IFwidW5kZWZpbmVkXCIgJiYgc3dpcGVyLnBhcmFtcy53aWR0aCAhPT0gbnVsbCkge1xuICAgIHdpZHRoID0gc3dpcGVyLnBhcmFtcy53aWR0aDtcbiAgfSBlbHNlIHtcbiAgICB3aWR0aCA9IGVsLmNsaWVudFdpZHRoO1xuICB9XG4gIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcy5oZWlnaHQgIT09IFwidW5kZWZpbmVkXCIgJiYgc3dpcGVyLnBhcmFtcy5oZWlnaHQgIT09IG51bGwpIHtcbiAgICBoZWlnaHQgPSBzd2lwZXIucGFyYW1zLmhlaWdodDtcbiAgfSBlbHNlIHtcbiAgICBoZWlnaHQgPSBlbC5jbGllbnRIZWlnaHQ7XG4gIH1cbiAgaWYgKHdpZHRoID09PSAwICYmIHN3aXBlci5pc0hvcml6b250YWwoKSB8fCBoZWlnaHQgPT09IDAgJiYgc3dpcGVyLmlzVmVydGljYWwoKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB3aWR0aCA9IHdpZHRoIC0gcGFyc2VJbnQoZWxlbWVudFN0eWxlKGVsLCBcInBhZGRpbmctbGVmdFwiKSB8fCAwLCAxMCkgLSBwYXJzZUludChlbGVtZW50U3R5bGUoZWwsIFwicGFkZGluZy1yaWdodFwiKSB8fCAwLCAxMCk7XG4gIGhlaWdodCA9IGhlaWdodCAtIHBhcnNlSW50KGVsZW1lbnRTdHlsZShlbCwgXCJwYWRkaW5nLXRvcFwiKSB8fCAwLCAxMCkgLSBwYXJzZUludChlbGVtZW50U3R5bGUoZWwsIFwicGFkZGluZy1ib3R0b21cIikgfHwgMCwgMTApO1xuICBpZiAoTnVtYmVyLmlzTmFOKHdpZHRoKSkgd2lkdGggPSAwO1xuICBpZiAoTnVtYmVyLmlzTmFOKGhlaWdodCkpIGhlaWdodCA9IDA7XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHNpemU6IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHdpZHRoIDogaGVpZ2h0XG4gIH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlU2xpZGVzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBmdW5jdGlvbiBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKG5vZGUsIGxhYmVsKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQobm9kZS5nZXRQcm9wZXJ0eVZhbHVlKHN3aXBlci5nZXREaXJlY3Rpb25MYWJlbChsYWJlbCkpIHx8IDApO1xuICB9XG4gIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIGNvbnN0IHtcbiAgICB3cmFwcGVyRWwsXG4gICAgc2xpZGVzRWwsXG4gICAgc2l6ZTogc3dpcGVyU2l6ZSxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICB3cm9uZ1JUTFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBjb25zdCBwcmV2aW91c1NsaWRlc0xlbmd0aCA9IGlzVmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgY29uc3Qgc2xpZGVzID0gZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCk7XG4gIGNvbnN0IHNsaWRlc0xlbmd0aCA9IGlzVmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzbGlkZXMubGVuZ3RoO1xuICBsZXQgc25hcEdyaWQgPSBbXTtcbiAgY29uc3Qgc2xpZGVzR3JpZCA9IFtdO1xuICBjb25zdCBzbGlkZXNTaXplc0dyaWQgPSBbXTtcbiAgbGV0IG9mZnNldEJlZm9yZSA9IHBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmU7XG4gIGlmICh0eXBlb2Ygb2Zmc2V0QmVmb3JlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBvZmZzZXRCZWZvcmUgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlLmNhbGwoc3dpcGVyKTtcbiAgfVxuICBsZXQgb2Zmc2V0QWZ0ZXIgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QWZ0ZXI7XG4gIGlmICh0eXBlb2Ygb2Zmc2V0QWZ0ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIG9mZnNldEFmdGVyID0gcGFyYW1zLnNsaWRlc09mZnNldEFmdGVyLmNhbGwoc3dpcGVyKTtcbiAgfVxuICBjb25zdCBwcmV2aW91c1NuYXBHcmlkTGVuZ3RoID0gc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcbiAgY29uc3QgcHJldmlvdXNTbGlkZXNHcmlkTGVuZ3RoID0gc3dpcGVyLnNsaWRlc0dyaWQubGVuZ3RoO1xuICBsZXQgc3BhY2VCZXR3ZWVuID0gcGFyYW1zLnNwYWNlQmV0d2VlbjtcbiAgbGV0IHNsaWRlUG9zaXRpb24gPSAtb2Zmc2V0QmVmb3JlO1xuICBsZXQgcHJldlNsaWRlU2l6ZSA9IDA7XG4gIGxldCBpbmRleCA9IDA7XG4gIGlmICh0eXBlb2Ygc3dpcGVyU2l6ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gXCJzdHJpbmdcIiAmJiBzcGFjZUJldHdlZW4uaW5kZXhPZihcIiVcIikgPj0gMCkge1xuICAgIHNwYWNlQmV0d2VlbiA9IHBhcnNlRmxvYXQoc3BhY2VCZXR3ZWVuLnJlcGxhY2UoXCIlXCIsIFwiXCIpKSAvIDEwMCAqIHN3aXBlclNpemU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gXCJzdHJpbmdcIikge1xuICAgIHNwYWNlQmV0d2VlbiA9IHBhcnNlRmxvYXQoc3BhY2VCZXR3ZWVuKTtcbiAgfVxuICBzd2lwZXIudmlydHVhbFNpemUgPSAtc3BhY2VCZXR3ZWVuO1xuICBzbGlkZXMuZm9yRWFjaCgoc2xpZGVFbCkgPT4ge1xuICAgIGlmIChydGwpIHtcbiAgICAgIHNsaWRlRWwuc3R5bGUubWFyZ2luTGVmdCA9IFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsaWRlRWwuc3R5bGUubWFyZ2luUmlnaHQgPSBcIlwiO1xuICAgIH1cbiAgICBzbGlkZUVsLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiXCI7XG4gICAgc2xpZGVFbC5zdHlsZS5tYXJnaW5Ub3AgPSBcIlwiO1xuICB9KTtcbiAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuY3NzTW9kZSkge1xuICAgIHNldENTU1Byb3BlcnR5KHdyYXBwZXJFbCwgXCItLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYmVmb3JlXCIsIFwiXCIpO1xuICAgIHNldENTU1Byb3BlcnR5KHdyYXBwZXJFbCwgXCItLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYWZ0ZXJcIiwgXCJcIik7XG4gIH1cbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMSAmJiBzd2lwZXIuZ3JpZDtcbiAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgc3dpcGVyLmdyaWQuaW5pdFNsaWRlcyhzbGlkZXMpO1xuICB9IGVsc2UgaWYgKHN3aXBlci5ncmlkKSB7XG4gICAgc3dpcGVyLmdyaWQudW5zZXRTbGlkZXMoKTtcbiAgfVxuICBsZXQgc2xpZGVTaXplO1xuICBjb25zdCBzaG91bGRSZXNldFNsaWRlU2l6ZSA9IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIiAmJiBwYXJhbXMuYnJlYWtwb2ludHMgJiYgT2JqZWN0LmtleXMocGFyYW1zLmJyZWFrcG9pbnRzKS5maWx0ZXIoKGtleSkgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgcGFyYW1zLmJyZWFrcG9pbnRzW2tleV0uc2xpZGVzUGVyVmlldyAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgfSkubGVuZ3RoID4gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNMZW5ndGg7IGkgKz0gMSkge1xuICAgIHNsaWRlU2l6ZSA9IDA7XG4gICAgbGV0IHNsaWRlMjtcbiAgICBpZiAoc2xpZGVzW2ldKSBzbGlkZTIgPSBzbGlkZXNbaV07XG4gICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICBzd2lwZXIuZ3JpZC51cGRhdGVTbGlkZShpLCBzbGlkZTIsIHNsaWRlcyk7XG4gICAgfVxuICAgIGlmIChzbGlkZXNbaV0gJiYgZWxlbWVudFN0eWxlKHNsaWRlMiwgXCJkaXNwbGF5XCIpID09PSBcIm5vbmVcIikgY29udGludWU7XG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIikge1xuICAgICAgaWYgKHNob3VsZFJlc2V0U2xpZGVTaXplKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZVtzd2lwZXIuZ2V0RGlyZWN0aW9uTGFiZWwoXCJ3aWR0aFwiKV0gPSBgYDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNsaWRlU3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShzbGlkZTIpO1xuICAgICAgY29uc3QgY3VycmVudFRyYW5zZm9ybSA9IHNsaWRlMi5zdHlsZS50cmFuc2Zvcm07XG4gICAgICBjb25zdCBjdXJyZW50V2ViS2l0VHJhbnNmb3JtID0gc2xpZGUyLnN0eWxlLndlYmtpdFRyYW5zZm9ybTtcbiAgICAgIGlmIChjdXJyZW50VHJhbnNmb3JtKSB7XG4gICAgICAgIHNsaWRlMi5zdHlsZS50cmFuc2Zvcm0gPSBcIm5vbmVcIjtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50V2ViS2l0VHJhbnNmb3JtKSB7XG4gICAgICAgIHNsaWRlMi5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcIm5vbmVcIjtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7XG4gICAgICAgIHNsaWRlU2l6ZSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IGVsZW1lbnRPdXRlclNpemUoc2xpZGUyLCBcIndpZHRoXCIsIHRydWUpIDogZWxlbWVudE91dGVyU2l6ZShzbGlkZTIsIFwiaGVpZ2h0XCIsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCBcIndpZHRoXCIpO1xuICAgICAgICBjb25zdCBwYWRkaW5nTGVmdCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsIFwicGFkZGluZy1sZWZ0XCIpO1xuICAgICAgICBjb25zdCBwYWRkaW5nUmlnaHQgPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCBcInBhZGRpbmctcmlnaHRcIik7XG4gICAgICAgIGNvbnN0IG1hcmdpbkxlZnQgPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCBcIm1hcmdpbi1sZWZ0XCIpO1xuICAgICAgICBjb25zdCBtYXJnaW5SaWdodCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsIFwibWFyZ2luLXJpZ2h0XCIpO1xuICAgICAgICBjb25zdCBib3hTaXppbmcgPSBzbGlkZVN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwiYm94LXNpemluZ1wiKTtcbiAgICAgICAgaWYgKGJveFNpemluZyAmJiBib3hTaXppbmcgPT09IFwiYm9yZGVyLWJveFwiKSB7XG4gICAgICAgICAgc2xpZGVTaXplID0gd2lkdGggKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBvZmZzZXRXaWR0aFxuICAgICAgICAgIH0gPSBzbGlkZTI7XG4gICAgICAgICAgc2xpZGVTaXplID0gd2lkdGggKyBwYWRkaW5nTGVmdCArIHBhZGRpbmdSaWdodCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodCArIChvZmZzZXRXaWR0aCAtIGNsaWVudFdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgc2xpZGUyLnN0eWxlLnRyYW5zZm9ybSA9IGN1cnJlbnRUcmFuc2Zvcm07XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFdlYktpdFRyYW5zZm9ybSkge1xuICAgICAgICBzbGlkZTIuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gY3VycmVudFdlYktpdFRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVNpemUgPSBNYXRoLmZsb29yKHNsaWRlU2l6ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsaWRlU2l6ZSA9IChzd2lwZXJTaXplIC0gKHBhcmFtcy5zbGlkZXNQZXJWaWV3IC0gMSkgKiBzcGFjZUJldHdlZW4pIC8gcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVTaXplID0gTWF0aC5mbG9vcihzbGlkZVNpemUpO1xuICAgICAgaWYgKHNsaWRlc1tpXSkge1xuICAgICAgICBzbGlkZXNbaV0uc3R5bGVbc3dpcGVyLmdldERpcmVjdGlvbkxhYmVsKFwid2lkdGhcIildID0gYCR7c2xpZGVTaXplfXB4YDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNsaWRlc1tpXSkge1xuICAgICAgc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcbiAgICB9XG4gICAgc2xpZGVzU2l6ZXNHcmlkLnB1c2goc2xpZGVTaXplKTtcbiAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiArIHNsaWRlU2l6ZSAvIDIgKyBwcmV2U2xpZGVTaXplIC8gMiArIHNwYWNlQmV0d2VlbjtcbiAgICAgIGlmIChwcmV2U2xpZGVTaXplID09PSAwICYmIGkgIT09IDApIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gc3dpcGVyU2l6ZSAvIDIgLSBzcGFjZUJldHdlZW47XG4gICAgICBpZiAoaSA9PT0gMCkgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gLSBzd2lwZXJTaXplIC8gMiAtIHNwYWNlQmV0d2VlbjtcbiAgICAgIGlmIChNYXRoLmFicyhzbGlkZVBvc2l0aW9uKSA8IDEgLyAxZTMpIHNsaWRlUG9zaXRpb24gPSAwO1xuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlUG9zaXRpb24gPSBNYXRoLmZsb29yKHNsaWRlUG9zaXRpb24pO1xuICAgICAgaWYgKGluZGV4ICUgcGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAwKSBzbmFwR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgc2xpZGVzR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVQb3NpdGlvbiA9IE1hdGguZmxvb3Ioc2xpZGVQb3NpdGlvbik7XG4gICAgICBpZiAoKGluZGV4IC0gTWF0aC5taW4oc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsIGluZGV4KSkgJSBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAwKSBzbmFwR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgc2xpZGVzR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gKyBzbGlkZVNpemUgKyBzcGFjZUJldHdlZW47XG4gICAgfVxuICAgIHN3aXBlci52aXJ0dWFsU2l6ZSArPSBzbGlkZVNpemUgKyBzcGFjZUJldHdlZW47XG4gICAgcHJldlNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcbiAgICBpbmRleCArPSAxO1xuICB9XG4gIHN3aXBlci52aXJ0dWFsU2l6ZSA9IE1hdGgubWF4KHN3aXBlci52aXJ0dWFsU2l6ZSwgc3dpcGVyU2l6ZSkgKyBvZmZzZXRBZnRlcjtcbiAgaWYgKHJ0bCAmJiB3cm9uZ1JUTCAmJiAocGFyYW1zLmVmZmVjdCA9PT0gXCJzbGlkZVwiIHx8IHBhcmFtcy5lZmZlY3QgPT09IFwiY292ZXJmbG93XCIpKSB7XG4gICAgd3JhcHBlckVsLnN0eWxlLndpZHRoID0gYCR7c3dpcGVyLnZpcnR1YWxTaXplICsgc3BhY2VCZXR3ZWVufXB4YDtcbiAgfVxuICBpZiAocGFyYW1zLnNldFdyYXBwZXJTaXplKSB7XG4gICAgd3JhcHBlckVsLnN0eWxlW3N3aXBlci5nZXREaXJlY3Rpb25MYWJlbChcIndpZHRoXCIpXSA9IGAke3N3aXBlci52aXJ0dWFsU2l6ZSArIHNwYWNlQmV0d2Vlbn1weGA7XG4gIH1cbiAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgc3dpcGVyLmdyaWQudXBkYXRlV3JhcHBlclNpemUoc2xpZGVTaXplLCBzbmFwR3JpZCk7XG4gIH1cbiAgaWYgKCFwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICBjb25zdCBuZXdTbGlkZXNHcmlkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbmFwR3JpZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgbGV0IHNsaWRlc0dyaWRJdGVtID0gc25hcEdyaWRbaV07XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVzR3JpZEl0ZW0gPSBNYXRoLmZsb29yKHNsaWRlc0dyaWRJdGVtKTtcbiAgICAgIGlmIChzbmFwR3JpZFtpXSA8PSBzd2lwZXIudmlydHVhbFNpemUgLSBzd2lwZXJTaXplKSB7XG4gICAgICAgIG5ld1NsaWRlc0dyaWQucHVzaChzbGlkZXNHcmlkSXRlbSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNuYXBHcmlkID0gbmV3U2xpZGVzR3JpZDtcbiAgICBpZiAoTWF0aC5mbG9vcihzd2lwZXIudmlydHVhbFNpemUgLSBzd2lwZXJTaXplKSAtIE1hdGguZmxvb3Ioc25hcEdyaWRbc25hcEdyaWQubGVuZ3RoIC0gMV0pID4gMSkge1xuICAgICAgc25hcEdyaWQucHVzaChzd2lwZXIudmlydHVhbFNpemUgLSBzd2lwZXJTaXplKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzVmlydHVhbCAmJiBwYXJhbXMubG9vcCkge1xuICAgIGNvbnN0IHNpemUgPSBzbGlkZXNTaXplc0dyaWRbMF0gKyBzcGFjZUJldHdlZW47XG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJHcm91cCA+IDEpIHtcbiAgICAgIGNvbnN0IGdyb3VwcyA9IE1hdGguY2VpbCgoc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlICsgc3dpcGVyLnZpcnR1YWwuc2xpZGVzQWZ0ZXIpIC8gcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgIGNvbnN0IGdyb3VwU2l6ZSA9IHNpemUgKiBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwczsgaSArPSAxKSB7XG4gICAgICAgIHNuYXBHcmlkLnB1c2goc25hcEdyaWRbc25hcEdyaWQubGVuZ3RoIC0gMV0gKyBncm91cFNpemUpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZSArIHN3aXBlci52aXJ0dWFsLnNsaWRlc0FmdGVyOyBpICs9IDEpIHtcbiAgICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDEpIHtcbiAgICAgICAgc25hcEdyaWQucHVzaChzbmFwR3JpZFtzbmFwR3JpZC5sZW5ndGggLSAxXSArIHNpemUpO1xuICAgICAgfVxuICAgICAgc2xpZGVzR3JpZC5wdXNoKHNsaWRlc0dyaWRbc2xpZGVzR3JpZC5sZW5ndGggLSAxXSArIHNpemUpO1xuICAgICAgc3dpcGVyLnZpcnR1YWxTaXplICs9IHNpemU7XG4gICAgfVxuICB9XG4gIGlmIChzbmFwR3JpZC5sZW5ndGggPT09IDApIHNuYXBHcmlkID0gWzBdO1xuICBpZiAoc3BhY2VCZXR3ZWVuICE9PSAwKSB7XG4gICAgY29uc3Qga2V5ID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIHJ0bCA/IFwibWFyZ2luTGVmdFwiIDogc3dpcGVyLmdldERpcmVjdGlvbkxhYmVsKFwibWFyZ2luUmlnaHRcIik7XG4gICAgc2xpZGVzLmZpbHRlcigoXywgc2xpZGVJbmRleCkgPT4ge1xuICAgICAgaWYgKCFwYXJhbXMuY3NzTW9kZSB8fCBwYXJhbXMubG9vcCkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAoc2xpZGVJbmRleCA9PT0gc2xpZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSkuZm9yRWFjaCgoc2xpZGVFbCkgPT4ge1xuICAgICAgc2xpZGVFbC5zdHlsZVtrZXldID0gYCR7c3BhY2VCZXR3ZWVufXB4YDtcbiAgICB9KTtcbiAgfVxuICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHBhcmFtcy5jZW50ZXJlZFNsaWRlc0JvdW5kcykge1xuICAgIGxldCBhbGxTbGlkZXNTaXplID0gMDtcbiAgICBzbGlkZXNTaXplc0dyaWQuZm9yRWFjaCgoc2xpZGVTaXplVmFsdWUpID0+IHtcbiAgICAgIGFsbFNsaWRlc1NpemUgKz0gc2xpZGVTaXplVmFsdWUgKyAoc3BhY2VCZXR3ZWVuIHx8IDApO1xuICAgIH0pO1xuICAgIGFsbFNsaWRlc1NpemUgLT0gc3BhY2VCZXR3ZWVuO1xuICAgIGNvbnN0IG1heFNuYXAgPSBhbGxTbGlkZXNTaXplID4gc3dpcGVyU2l6ZSA/IGFsbFNsaWRlc1NpemUgLSBzd2lwZXJTaXplIDogMDtcbiAgICBzbmFwR3JpZCA9IHNuYXBHcmlkLm1hcCgoc25hcCkgPT4ge1xuICAgICAgaWYgKHNuYXAgPD0gMCkgcmV0dXJuIC1vZmZzZXRCZWZvcmU7XG4gICAgICBpZiAoc25hcCA+IG1heFNuYXApIHJldHVybiBtYXhTbmFwICsgb2Zmc2V0QWZ0ZXI7XG4gICAgICByZXR1cm4gc25hcDtcbiAgICB9KTtcbiAgfVxuICBpZiAocGFyYW1zLmNlbnRlckluc3VmZmljaWVudFNsaWRlcykge1xuICAgIGxldCBhbGxTbGlkZXNTaXplID0gMDtcbiAgICBzbGlkZXNTaXplc0dyaWQuZm9yRWFjaCgoc2xpZGVTaXplVmFsdWUpID0+IHtcbiAgICAgIGFsbFNsaWRlc1NpemUgKz0gc2xpZGVTaXplVmFsdWUgKyAoc3BhY2VCZXR3ZWVuIHx8IDApO1xuICAgIH0pO1xuICAgIGFsbFNsaWRlc1NpemUgLT0gc3BhY2VCZXR3ZWVuO1xuICAgIGNvbnN0IG9mZnNldFNpemUgPSAocGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZSB8fCAwKSArIChwYXJhbXMuc2xpZGVzT2Zmc2V0QWZ0ZXIgfHwgMCk7XG4gICAgaWYgKGFsbFNsaWRlc1NpemUgKyBvZmZzZXRTaXplIDwgc3dpcGVyU2l6ZSkge1xuICAgICAgY29uc3QgYWxsU2xpZGVzT2Zmc2V0ID0gKHN3aXBlclNpemUgLSBhbGxTbGlkZXNTaXplIC0gb2Zmc2V0U2l6ZSkgLyAyO1xuICAgICAgc25hcEdyaWQuZm9yRWFjaCgoc25hcCwgc25hcEluZGV4KSA9PiB7XG4gICAgICAgIHNuYXBHcmlkW3NuYXBJbmRleF0gPSBzbmFwIC0gYWxsU2xpZGVzT2Zmc2V0O1xuICAgICAgfSk7XG4gICAgICBzbGlkZXNHcmlkLmZvckVhY2goKHNuYXAsIHNuYXBJbmRleCkgPT4ge1xuICAgICAgICBzbGlkZXNHcmlkW3NuYXBJbmRleF0gPSBzbmFwICsgYWxsU2xpZGVzT2Zmc2V0O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgc2xpZGVzLFxuICAgIHNuYXBHcmlkLFxuICAgIHNsaWRlc0dyaWQsXG4gICAgc2xpZGVzU2l6ZXNHcmlkXG4gIH0pO1xuICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHBhcmFtcy5jc3NNb2RlICYmICFwYXJhbXMuY2VudGVyZWRTbGlkZXNCb3VuZHMpIHtcbiAgICBzZXRDU1NQcm9wZXJ0eSh3cmFwcGVyRWwsIFwiLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWJlZm9yZVwiLCBgJHstc25hcEdyaWRbMF19cHhgKTtcbiAgICBzZXRDU1NQcm9wZXJ0eSh3cmFwcGVyRWwsIFwiLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWFmdGVyXCIsIGAke3N3aXBlci5zaXplIC8gMiAtIHNsaWRlc1NpemVzR3JpZFtzbGlkZXNTaXplc0dyaWQubGVuZ3RoIC0gMV0gLyAyfXB4YCk7XG4gICAgY29uc3QgYWRkVG9TbmFwR3JpZCA9IC1zd2lwZXIuc25hcEdyaWRbMF07XG4gICAgY29uc3QgYWRkVG9TbGlkZXNHcmlkID0gLXN3aXBlci5zbGlkZXNHcmlkWzBdO1xuICAgIHN3aXBlci5zbmFwR3JpZCA9IHN3aXBlci5zbmFwR3JpZC5tYXAoKHYpID0+IHYgKyBhZGRUb1NuYXBHcmlkKTtcbiAgICBzd2lwZXIuc2xpZGVzR3JpZCA9IHN3aXBlci5zbGlkZXNHcmlkLm1hcCgodikgPT4gdiArIGFkZFRvU2xpZGVzR3JpZCk7XG4gIH1cbiAgaWYgKHNsaWRlc0xlbmd0aCAhPT0gcHJldmlvdXNTbGlkZXNMZW5ndGgpIHtcbiAgICBzd2lwZXIuZW1pdChcInNsaWRlc0xlbmd0aENoYW5nZVwiKTtcbiAgfVxuICBpZiAoc25hcEdyaWQubGVuZ3RoICE9PSBwcmV2aW91c1NuYXBHcmlkTGVuZ3RoKSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdykgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgICBzd2lwZXIuZW1pdChcInNuYXBHcmlkTGVuZ3RoQ2hhbmdlXCIpO1xuICB9XG4gIGlmIChzbGlkZXNHcmlkLmxlbmd0aCAhPT0gcHJldmlvdXNTbGlkZXNHcmlkTGVuZ3RoKSB7XG4gICAgc3dpcGVyLmVtaXQoXCJzbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlXCIpO1xuICB9XG4gIGlmIChwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcykge1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNPZmZzZXQoKTtcbiAgfVxuICBzd2lwZXIuZW1pdChcInNsaWRlc1VwZGF0ZWRcIik7XG4gIGlmICghaXNWaXJ0dWFsICYmICFwYXJhbXMuY3NzTW9kZSAmJiAocGFyYW1zLmVmZmVjdCA9PT0gXCJzbGlkZVwiIHx8IHBhcmFtcy5lZmZlY3QgPT09IFwiZmFkZVwiKSkge1xuICAgIGNvbnN0IGJhY2tGYWNlSGlkZGVuQ2xhc3MgPSBgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31iYWNrZmFjZS1oaWRkZW5gO1xuICAgIGNvbnN0IGhhc0NsYXNzQmFja2ZhY2VDbGFzc0FkZGVkID0gc3dpcGVyLmVsLmNsYXNzTGlzdC5jb250YWlucyhiYWNrRmFjZUhpZGRlbkNsYXNzKTtcbiAgICBpZiAoc2xpZGVzTGVuZ3RoIDw9IHBhcmFtcy5tYXhCYWNrZmFjZUhpZGRlblNsaWRlcykge1xuICAgICAgaWYgKCFoYXNDbGFzc0JhY2tmYWNlQ2xhc3NBZGRlZCkgc3dpcGVyLmVsLmNsYXNzTGlzdC5hZGQoYmFja0ZhY2VIaWRkZW5DbGFzcyk7XG4gICAgfSBlbHNlIGlmIChoYXNDbGFzc0JhY2tmYWNlQ2xhc3NBZGRlZCkge1xuICAgICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5yZW1vdmUoYmFja0ZhY2VIaWRkZW5DbGFzcyk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVBdXRvSGVpZ2h0KHNwZWVkKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IGFjdGl2ZVNsaWRlcyA9IFtdO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgbGV0IG5ld0hlaWdodCA9IDA7XG4gIGxldCBpO1xuICBpZiAodHlwZW9mIHNwZWVkID09PSBcIm51bWJlclwiKSB7XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3BlZWQpO1xuICB9IGVsc2UgaWYgKHNwZWVkID09PSB0cnVlKSB7XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3dpcGVyLnBhcmFtcy5zcGVlZCk7XG4gIH1cbiAgY29uc3QgZ2V0U2xpZGVCeUluZGV4ID0gKGluZGV4KSA9PiB7XG4gICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgcmV0dXJuIHN3aXBlci5zbGlkZXNbc3dpcGVyLmdldFNsaWRlSW5kZXhCeURhdGEoaW5kZXgpXTtcbiAgICB9XG4gICAgcmV0dXJuIHN3aXBlci5zbGlkZXNbaW5kZXhdO1xuICB9O1xuICBpZiAoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSBcImF1dG9cIiAmJiBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIChzd2lwZXIudmlzaWJsZVNsaWRlcyB8fCBbXSkuZm9yRWFjaCgoc2xpZGUyKSA9PiB7XG4gICAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKHNsaWRlMik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChpID0gMDsgaSA8IE1hdGguY2VpbChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcpOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXggKyBpO1xuICAgICAgICBpZiAoaW5kZXggPiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAmJiAhaXNWaXJ0dWFsKSBicmVhaztcbiAgICAgICAgYWN0aXZlU2xpZGVzLnB1c2goZ2V0U2xpZGVCeUluZGV4KGluZGV4KSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFjdGl2ZVNsaWRlcy5wdXNoKGdldFNsaWRlQnlJbmRleChzd2lwZXIuYWN0aXZlSW5kZXgpKTtcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgYWN0aXZlU2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHR5cGVvZiBhY3RpdmVTbGlkZXNbaV0gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGFjdGl2ZVNsaWRlc1tpXS5vZmZzZXRIZWlnaHQ7XG4gICAgICBuZXdIZWlnaHQgPSBoZWlnaHQgPiBuZXdIZWlnaHQgPyBoZWlnaHQgOiBuZXdIZWlnaHQ7XG4gICAgfVxuICB9XG4gIGlmIChuZXdIZWlnaHQgfHwgbmV3SGVpZ2h0ID09PSAwKSBzd2lwZXIud3JhcHBlckVsLnN0eWxlLmhlaWdodCA9IGAke25ld0hlaWdodH1weGA7XG59XG5mdW5jdGlvbiB1cGRhdGVTbGlkZXNPZmZzZXQoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XG4gIGNvbnN0IG1pbnVzT2Zmc2V0ID0gc3dpcGVyLmlzRWxlbWVudCA/IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHN3aXBlci53cmFwcGVyRWwub2Zmc2V0TGVmdCA6IHN3aXBlci53cmFwcGVyRWwub2Zmc2V0VG9wIDogMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzbGlkZXNbaV0uc3dpcGVyU2xpZGVPZmZzZXQgPSAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gc2xpZGVzW2ldLm9mZnNldExlZnQgOiBzbGlkZXNbaV0ub2Zmc2V0VG9wKSAtIG1pbnVzT2Zmc2V0IC0gc3dpcGVyLmNzc092ZXJmbG93QWRqdXN0bWVudCgpO1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVTbGlkZXNQcm9ncmVzcyh0cmFuc2xhdGUyKSB7XG4gIGlmICh0cmFuc2xhdGUyID09PSB2b2lkIDApIHtcbiAgICB0cmFuc2xhdGUyID0gdGhpcyAmJiB0aGlzLnRyYW5zbGF0ZSB8fCAwO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIGNvbnN0IHtcbiAgICBzbGlkZXMsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgc25hcEdyaWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKHNsaWRlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgaWYgKHR5cGVvZiBzbGlkZXNbMF0uc3dpcGVyU2xpZGVPZmZzZXQgPT09IFwidW5kZWZpbmVkXCIpIHN3aXBlci51cGRhdGVTbGlkZXNPZmZzZXQoKTtcbiAgbGV0IG9mZnNldENlbnRlciA9IC10cmFuc2xhdGUyO1xuICBpZiAocnRsKSBvZmZzZXRDZW50ZXIgPSB0cmFuc2xhdGUyO1xuICBzd2lwZXIudmlzaWJsZVNsaWRlc0luZGV4ZXMgPSBbXTtcbiAgc3dpcGVyLnZpc2libGVTbGlkZXMgPSBbXTtcbiAgbGV0IHNwYWNlQmV0d2VlbiA9IHBhcmFtcy5zcGFjZUJldHdlZW47XG4gIGlmICh0eXBlb2Ygc3BhY2VCZXR3ZWVuID09PSBcInN0cmluZ1wiICYmIHNwYWNlQmV0d2Vlbi5pbmRleE9mKFwiJVwiKSA+PSAwKSB7XG4gICAgc3BhY2VCZXR3ZWVuID0gcGFyc2VGbG9hdChzcGFjZUJldHdlZW4ucmVwbGFjZShcIiVcIiwgXCJcIikpIC8gMTAwICogc3dpcGVyLnNpemU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gXCJzdHJpbmdcIikge1xuICAgIHNwYWNlQmV0d2VlbiA9IHBhcnNlRmxvYXQoc3BhY2VCZXR3ZWVuKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHNsaWRlMiA9IHNsaWRlc1tpXTtcbiAgICBsZXQgc2xpZGVPZmZzZXQgPSBzbGlkZTIuc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgaWYgKHBhcmFtcy5jc3NNb2RlICYmIHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgc2xpZGVPZmZzZXQgLT0gc2xpZGVzWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgIH1cbiAgICBjb25zdCBzbGlkZVByb2dyZXNzID0gKG9mZnNldENlbnRlciArIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWluVHJhbnNsYXRlKCkgOiAwKSAtIHNsaWRlT2Zmc2V0KSAvIChzbGlkZTIuc3dpcGVyU2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuKTtcbiAgICBjb25zdCBvcmlnaW5hbFNsaWRlUHJvZ3Jlc3MgPSAob2Zmc2V0Q2VudGVyIC0gc25hcEdyaWRbMF0gKyAocGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIDogMCkgLSBzbGlkZU9mZnNldCkgLyAoc2xpZGUyLnN3aXBlclNsaWRlU2l6ZSArIHNwYWNlQmV0d2Vlbik7XG4gICAgY29uc3Qgc2xpZGVCZWZvcmUgPSAtKG9mZnNldENlbnRlciAtIHNsaWRlT2Zmc2V0KTtcbiAgICBjb25zdCBzbGlkZUFmdGVyID0gc2xpZGVCZWZvcmUgKyBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW2ldO1xuICAgIGNvbnN0IGlzRnVsbHlWaXNpYmxlID0gc2xpZGVCZWZvcmUgPj0gMCAmJiBzbGlkZUJlZm9yZSA8PSBzd2lwZXIuc2l6ZSAtIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbaV07XG4gICAgY29uc3QgaXNWaXNpYmxlID0gc2xpZGVCZWZvcmUgPj0gMCAmJiBzbGlkZUJlZm9yZSA8IHN3aXBlci5zaXplIC0gMSB8fCBzbGlkZUFmdGVyID4gMSAmJiBzbGlkZUFmdGVyIDw9IHN3aXBlci5zaXplIHx8IHNsaWRlQmVmb3JlIDw9IDAgJiYgc2xpZGVBZnRlciA+PSBzd2lwZXIuc2l6ZTtcbiAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICBzd2lwZXIudmlzaWJsZVNsaWRlcy5wdXNoKHNsaWRlMik7XG4gICAgICBzd2lwZXIudmlzaWJsZVNsaWRlc0luZGV4ZXMucHVzaChpKTtcbiAgICB9XG4gICAgdG9nZ2xlU2xpZGVDbGFzc2VzJDEoc2xpZGUyLCBpc1Zpc2libGUsIHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyk7XG4gICAgdG9nZ2xlU2xpZGVDbGFzc2VzJDEoc2xpZGUyLCBpc0Z1bGx5VmlzaWJsZSwgcGFyYW1zLnNsaWRlRnVsbHlWaXNpYmxlQ2xhc3MpO1xuICAgIHNsaWRlMi5wcm9ncmVzcyA9IHJ0bCA/IC1zbGlkZVByb2dyZXNzIDogc2xpZGVQcm9ncmVzcztcbiAgICBzbGlkZTIub3JpZ2luYWxQcm9ncmVzcyA9IHJ0bCA/IC1vcmlnaW5hbFNsaWRlUHJvZ3Jlc3MgOiBvcmlnaW5hbFNsaWRlUHJvZ3Jlc3M7XG4gIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzKHRyYW5zbGF0ZTIpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKHR5cGVvZiB0cmFuc2xhdGUyID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyAtMSA6IDE7XG4gICAgdHJhbnNsYXRlMiA9IHN3aXBlciAmJiBzd2lwZXIudHJhbnNsYXRlICYmIHN3aXBlci50cmFuc2xhdGUgKiBtdWx0aXBsaWVyIHx8IDA7XG4gIH1cbiAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgY29uc3QgdHJhbnNsYXRlc0RpZmYgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gIGxldCB7XG4gICAgcHJvZ3Jlc3MsXG4gICAgaXNCZWdpbm5pbmcsXG4gICAgaXNFbmQsXG4gICAgcHJvZ3Jlc3NMb29wXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IHdhc0JlZ2lubmluZyA9IGlzQmVnaW5uaW5nO1xuICBjb25zdCB3YXNFbmQgPSBpc0VuZDtcbiAgaWYgKHRyYW5zbGF0ZXNEaWZmID09PSAwKSB7XG4gICAgcHJvZ3Jlc3MgPSAwO1xuICAgIGlzQmVnaW5uaW5nID0gdHJ1ZTtcbiAgICBpc0VuZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcHJvZ3Jlc3MgPSAodHJhbnNsYXRlMiAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyB0cmFuc2xhdGVzRGlmZjtcbiAgICBjb25zdCBpc0JlZ2lubmluZ1JvdW5kZWQgPSBNYXRoLmFicyh0cmFuc2xhdGUyIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSA8IDE7XG4gICAgY29uc3QgaXNFbmRSb3VuZGVkID0gTWF0aC5hYnModHJhbnNsYXRlMiAtIHN3aXBlci5tYXhUcmFuc2xhdGUoKSkgPCAxO1xuICAgIGlzQmVnaW5uaW5nID0gaXNCZWdpbm5pbmdSb3VuZGVkIHx8IHByb2dyZXNzIDw9IDA7XG4gICAgaXNFbmQgPSBpc0VuZFJvdW5kZWQgfHwgcHJvZ3Jlc3MgPj0gMTtcbiAgICBpZiAoaXNCZWdpbm5pbmdSb3VuZGVkKSBwcm9ncmVzcyA9IDA7XG4gICAgaWYgKGlzRW5kUm91bmRlZCkgcHJvZ3Jlc3MgPSAxO1xuICB9XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIGNvbnN0IGZpcnN0U2xpZGVJbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4QnlEYXRhKDApO1xuICAgIGNvbnN0IGxhc3RTbGlkZUluZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXhCeURhdGEoc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxKTtcbiAgICBjb25zdCBmaXJzdFNsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbZmlyc3RTbGlkZUluZGV4XTtcbiAgICBjb25zdCBsYXN0U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFtsYXN0U2xpZGVJbmRleF07XG4gICAgY29uc3QgdHJhbnNsYXRlTWF4ID0gc3dpcGVyLnNsaWRlc0dyaWRbc3dpcGVyLnNsaWRlc0dyaWQubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgdHJhbnNsYXRlQWJzID0gTWF0aC5hYnModHJhbnNsYXRlMik7XG4gICAgaWYgKHRyYW5zbGF0ZUFicyA+PSBmaXJzdFNsaWRlVHJhbnNsYXRlKSB7XG4gICAgICBwcm9ncmVzc0xvb3AgPSAodHJhbnNsYXRlQWJzIC0gZmlyc3RTbGlkZVRyYW5zbGF0ZSkgLyB0cmFuc2xhdGVNYXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2dyZXNzTG9vcCA9ICh0cmFuc2xhdGVBYnMgKyB0cmFuc2xhdGVNYXggLSBsYXN0U2xpZGVUcmFuc2xhdGUpIC8gdHJhbnNsYXRlTWF4O1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NMb29wID4gMSkgcHJvZ3Jlc3NMb29wIC09IDE7XG4gIH1cbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICBwcm9ncmVzcyxcbiAgICBwcm9ncmVzc0xvb3AsXG4gICAgaXNCZWdpbm5pbmcsXG4gICAgaXNFbmRcbiAgfSk7XG4gIGlmIChwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyB8fCBwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgcGFyYW1zLmF1dG9IZWlnaHQpIHN3aXBlci51cGRhdGVTbGlkZXNQcm9ncmVzcyh0cmFuc2xhdGUyKTtcbiAgaWYgKGlzQmVnaW5uaW5nICYmICF3YXNCZWdpbm5pbmcpIHtcbiAgICBzd2lwZXIuZW1pdChcInJlYWNoQmVnaW5uaW5nIHRvRWRnZVwiKTtcbiAgfVxuICBpZiAoaXNFbmQgJiYgIXdhc0VuZCkge1xuICAgIHN3aXBlci5lbWl0KFwicmVhY2hFbmQgdG9FZGdlXCIpO1xuICB9XG4gIGlmICh3YXNCZWdpbm5pbmcgJiYgIWlzQmVnaW5uaW5nIHx8IHdhc0VuZCAmJiAhaXNFbmQpIHtcbiAgICBzd2lwZXIuZW1pdChcImZyb21FZGdlXCIpO1xuICB9XG4gIHN3aXBlci5lbWl0KFwicHJvZ3Jlc3NcIiwgcHJvZ3Jlc3MpO1xufVxuZnVuY3Rpb24gdXBkYXRlU2xpZGVzQ2xhc3NlcygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHNsaWRlcyxcbiAgICBwYXJhbXMsXG4gICAgc2xpZGVzRWwsXG4gICAgYWN0aXZlSW5kZXhcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBzd2lwZXIuZ3JpZCAmJiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMTtcbiAgY29uc3QgZ2V0RmlsdGVyZWRTbGlkZSA9IChzZWxlY3RvcikgPT4ge1xuICAgIHJldHVybiBlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30ke3NlbGVjdG9yfSwgc3dpcGVyLXNsaWRlJHtzZWxlY3Rvcn1gKVswXTtcbiAgfTtcbiAgbGV0IGFjdGl2ZVNsaWRlO1xuICBsZXQgcHJldlNsaWRlO1xuICBsZXQgbmV4dFNsaWRlO1xuICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICBsZXQgc2xpZGVJbmRleCA9IGFjdGl2ZUluZGV4IC0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlO1xuICAgICAgaWYgKHNsaWRlSW5kZXggPCAwKSBzbGlkZUluZGV4ID0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCArIHNsaWRlSW5kZXg7XG4gICAgICBpZiAoc2xpZGVJbmRleCA+PSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoKSBzbGlkZUluZGV4IC09IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGg7XG4gICAgICBhY3RpdmVTbGlkZSA9IGdldEZpbHRlcmVkU2xpZGUoYFtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7c2xpZGVJbmRleH1cIl1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlU2xpZGUgPSBnZXRGaWx0ZXJlZFNsaWRlKGBbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke2FjdGl2ZUluZGV4fVwiXWApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgIGFjdGl2ZVNsaWRlID0gc2xpZGVzLmZpbHRlcigoc2xpZGVFbCkgPT4gc2xpZGVFbC5jb2x1bW4gPT09IGFjdGl2ZUluZGV4KVswXTtcbiAgICAgIG5leHRTbGlkZSA9IHNsaWRlcy5maWx0ZXIoKHNsaWRlRWwpID0+IHNsaWRlRWwuY29sdW1uID09PSBhY3RpdmVJbmRleCArIDEpWzBdO1xuICAgICAgcHJldlNsaWRlID0gc2xpZGVzLmZpbHRlcigoc2xpZGVFbCkgPT4gc2xpZGVFbC5jb2x1bW4gPT09IGFjdGl2ZUluZGV4IC0gMSlbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVNsaWRlID0gc2xpZGVzW2FjdGl2ZUluZGV4XTtcbiAgICB9XG4gIH1cbiAgaWYgKGFjdGl2ZVNsaWRlKSB7XG4gICAgaWYgKCFncmlkRW5hYmxlZCkge1xuICAgICAgbmV4dFNsaWRlID0gZWxlbWVudE5leHRBbGwoYWN0aXZlU2xpZGUsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApWzBdO1xuICAgICAgaWYgKHBhcmFtcy5sb29wICYmICFuZXh0U2xpZGUpIHtcbiAgICAgICAgbmV4dFNsaWRlID0gc2xpZGVzWzBdO1xuICAgICAgfVxuICAgICAgcHJldlNsaWRlID0gZWxlbWVudFByZXZBbGwoYWN0aXZlU2xpZGUsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApWzBdO1xuICAgICAgaWYgKHBhcmFtcy5sb29wICYmICFwcmV2U2xpZGUgPT09IDApIHtcbiAgICAgICAgcHJldlNsaWRlID0gc2xpZGVzW3NsaWRlcy5sZW5ndGggLSAxXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2xpZGVzLmZvckVhY2goKHNsaWRlRWwpID0+IHtcbiAgICB0b2dnbGVTbGlkZUNsYXNzZXMoc2xpZGVFbCwgc2xpZGVFbCA9PT0gYWN0aXZlU2xpZGUsIHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKTtcbiAgICB0b2dnbGVTbGlkZUNsYXNzZXMoc2xpZGVFbCwgc2xpZGVFbCA9PT0gbmV4dFNsaWRlLCBwYXJhbXMuc2xpZGVOZXh0Q2xhc3MpO1xuICAgIHRvZ2dsZVNsaWRlQ2xhc3NlcyhzbGlkZUVsLCBzbGlkZUVsID09PSBwcmV2U2xpZGUsIHBhcmFtcy5zbGlkZVByZXZDbGFzcyk7XG4gIH0pO1xuICBzd2lwZXIuZW1pdFNsaWRlc0NsYXNzZXMoKTtcbn1cbmZ1bmN0aW9uIGdldEFjdGl2ZUluZGV4QnlUcmFuc2xhdGUoc3dpcGVyKSB7XG4gIGNvbnN0IHtcbiAgICBzbGlkZXNHcmlkLFxuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBjb25zdCB0cmFuc2xhdGUyID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgbGV0IGFjdGl2ZUluZGV4O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAodHlwZW9mIHNsaWRlc0dyaWRbaSArIDFdICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAodHJhbnNsYXRlMiA+PSBzbGlkZXNHcmlkW2ldICYmIHRyYW5zbGF0ZTIgPCBzbGlkZXNHcmlkW2kgKyAxXSAtIChzbGlkZXNHcmlkW2kgKyAxXSAtIHNsaWRlc0dyaWRbaV0pIC8gMikge1xuICAgICAgICBhY3RpdmVJbmRleCA9IGk7XG4gICAgICB9IGVsc2UgaWYgKHRyYW5zbGF0ZTIgPj0gc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUyIDwgc2xpZGVzR3JpZFtpICsgMV0pIHtcbiAgICAgICAgYWN0aXZlSW5kZXggPSBpICsgMTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRyYW5zbGF0ZTIgPj0gc2xpZGVzR3JpZFtpXSkge1xuICAgICAgYWN0aXZlSW5kZXggPSBpO1xuICAgIH1cbiAgfVxuICBpZiAocGFyYW1zLm5vcm1hbGl6ZVNsaWRlSW5kZXgpIHtcbiAgICBpZiAoYWN0aXZlSW5kZXggPCAwIHx8IHR5cGVvZiBhY3RpdmVJbmRleCA9PT0gXCJ1bmRlZmluZWRcIikgYWN0aXZlSW5kZXggPSAwO1xuICB9XG4gIHJldHVybiBhY3RpdmVJbmRleDtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZUluZGV4KG5ld0FjdGl2ZUluZGV4KSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHRyYW5zbGF0ZTIgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICBjb25zdCB7XG4gICAgc25hcEdyaWQsXG4gICAgcGFyYW1zLFxuICAgIGFjdGl2ZUluZGV4OiBwcmV2aW91c0luZGV4LFxuICAgIHJlYWxJbmRleDogcHJldmlvdXNSZWFsSW5kZXgsXG4gICAgc25hcEluZGV4OiBwcmV2aW91c1NuYXBJbmRleFxuICB9ID0gc3dpcGVyO1xuICBsZXQgYWN0aXZlSW5kZXggPSBuZXdBY3RpdmVJbmRleDtcbiAgbGV0IHNuYXBJbmRleDtcbiAgY29uc3QgZ2V0VmlydHVhbFJlYWxJbmRleCA9IChhSW5kZXgpID0+IHtcbiAgICBsZXQgcmVhbEluZGV4MiA9IGFJbmRleCAtIHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZTtcbiAgICBpZiAocmVhbEluZGV4MiA8IDApIHtcbiAgICAgIHJlYWxJbmRleDIgPSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoICsgcmVhbEluZGV4MjtcbiAgICB9XG4gICAgaWYgKHJlYWxJbmRleDIgPj0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgcmVhbEluZGV4MiAtPSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gcmVhbEluZGV4MjtcbiAgfTtcbiAgaWYgKHR5cGVvZiBhY3RpdmVJbmRleCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGFjdGl2ZUluZGV4ID0gZ2V0QWN0aXZlSW5kZXhCeVRyYW5zbGF0ZShzd2lwZXIpO1xuICB9XG4gIGlmIChzbmFwR3JpZC5pbmRleE9mKHRyYW5zbGF0ZTIpID49IDApIHtcbiAgICBzbmFwSW5kZXggPSBzbmFwR3JpZC5pbmRleE9mKHRyYW5zbGF0ZTIpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHNraXAgPSBNYXRoLm1pbihwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLCBhY3RpdmVJbmRleCk7XG4gICAgc25hcEluZGV4ID0gc2tpcCArIE1hdGguZmxvb3IoKGFjdGl2ZUluZGV4IC0gc2tpcCkgLyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICB9XG4gIGlmIChzbmFwSW5kZXggPj0gc25hcEdyaWQubGVuZ3RoKSBzbmFwSW5kZXggPSBzbmFwR3JpZC5sZW5ndGggLSAxO1xuICBpZiAoYWN0aXZlSW5kZXggPT09IHByZXZpb3VzSW5kZXggJiYgIXN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgIGlmIChzbmFwSW5kZXggIT09IHByZXZpb3VzU25hcEluZGV4KSB7XG4gICAgICBzd2lwZXIuc25hcEluZGV4ID0gc25hcEluZGV4O1xuICAgICAgc3dpcGVyLmVtaXQoXCJzbmFwSW5kZXhDaGFuZ2VcIik7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoYWN0aXZlSW5kZXggPT09IHByZXZpb3VzSW5kZXggJiYgc3dpcGVyLnBhcmFtcy5sb29wICYmIHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgc3dpcGVyLnJlYWxJbmRleCA9IGdldFZpcnR1YWxSZWFsSW5kZXgoYWN0aXZlSW5kZXgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBncmlkRW5hYmxlZCA9IHN3aXBlci5ncmlkICYmIHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuICBsZXQgcmVhbEluZGV4O1xuICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZCAmJiBwYXJhbXMubG9vcCkge1xuICAgIHJlYWxJbmRleCA9IGdldFZpcnR1YWxSZWFsSW5kZXgoYWN0aXZlSW5kZXgpO1xuICB9IGVsc2UgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgY29uc3QgZmlyc3RTbGlkZUluQ29sdW1uID0gc3dpcGVyLnNsaWRlcy5maWx0ZXIoKHNsaWRlRWwpID0+IHNsaWRlRWwuY29sdW1uID09PSBhY3RpdmVJbmRleClbMF07XG4gICAgbGV0IGFjdGl2ZVNsaWRlSW5kZXggPSBwYXJzZUludChmaXJzdFNsaWRlSW5Db2x1bW4uZ2V0QXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIiksIDEwKTtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKGFjdGl2ZVNsaWRlSW5kZXgpKSB7XG4gICAgICBhY3RpdmVTbGlkZUluZGV4ID0gTWF0aC5tYXgoc3dpcGVyLnNsaWRlcy5pbmRleE9mKGZpcnN0U2xpZGVJbkNvbHVtbiksIDApO1xuICAgIH1cbiAgICByZWFsSW5kZXggPSBNYXRoLmZsb29yKGFjdGl2ZVNsaWRlSW5kZXggLyBwYXJhbXMuZ3JpZC5yb3dzKTtcbiAgfSBlbHNlIGlmIChzd2lwZXIuc2xpZGVzW2FjdGl2ZUluZGV4XSkge1xuICAgIGNvbnN0IHNsaWRlSW5kZXggPSBzd2lwZXIuc2xpZGVzW2FjdGl2ZUluZGV4XS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKTtcbiAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgcmVhbEluZGV4ID0gcGFyc2VJbnQoc2xpZGVJbmRleCwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFsSW5kZXggPSBhY3RpdmVJbmRleDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVhbEluZGV4ID0gYWN0aXZlSW5kZXg7XG4gIH1cbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICBwcmV2aW91c1NuYXBJbmRleCxcbiAgICBzbmFwSW5kZXgsXG4gICAgcHJldmlvdXNSZWFsSW5kZXgsXG4gICAgcmVhbEluZGV4LFxuICAgIHByZXZpb3VzSW5kZXgsXG4gICAgYWN0aXZlSW5kZXhcbiAgfSk7XG4gIGlmIChzd2lwZXIuaW5pdGlhbGl6ZWQpIHtcbiAgICBwcmVsb2FkKHN3aXBlcik7XG4gIH1cbiAgc3dpcGVyLmVtaXQoXCJhY3RpdmVJbmRleENoYW5nZVwiKTtcbiAgc3dpcGVyLmVtaXQoXCJzbmFwSW5kZXhDaGFuZ2VcIik7XG4gIGlmIChzd2lwZXIuaW5pdGlhbGl6ZWQgfHwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpIHtcbiAgICBpZiAocHJldmlvdXNSZWFsSW5kZXggIT09IHJlYWxJbmRleCkge1xuICAgICAgc3dpcGVyLmVtaXQoXCJyZWFsSW5kZXhDaGFuZ2VcIik7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KFwic2xpZGVDaGFuZ2VcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZUNsaWNrZWRTbGlkZShlbCwgcGF0aCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICBsZXQgc2xpZGUyID0gZWwuY2xvc2VzdChgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKTtcbiAgaWYgKCFzbGlkZTIgJiYgc3dpcGVyLmlzRWxlbWVudCAmJiBwYXRoICYmIHBhdGgubGVuZ3RoID4gMSAmJiBwYXRoLmluY2x1ZGVzKGVsKSkge1xuICAgIFsuLi5wYXRoLnNsaWNlKHBhdGguaW5kZXhPZihlbCkgKyAxLCBwYXRoLmxlbmd0aCldLmZvckVhY2goKHBhdGhFbCkgPT4ge1xuICAgICAgaWYgKCFzbGlkZTIgJiYgcGF0aEVsLm1hdGNoZXMgJiYgcGF0aEVsLm1hdGNoZXMoYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCkpIHtcbiAgICAgICAgc2xpZGUyID0gcGF0aEVsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGxldCBzbGlkZUZvdW5kID0gZmFsc2U7XG4gIGxldCBzbGlkZUluZGV4O1xuICBpZiAoc2xpZGUyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoc3dpcGVyLnNsaWRlc1tpXSA9PT0gc2xpZGUyKSB7XG4gICAgICAgIHNsaWRlRm91bmQgPSB0cnVlO1xuICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChzbGlkZTIgJiYgc2xpZGVGb3VuZCkge1xuICAgIHN3aXBlci5jbGlja2VkU2xpZGUgPSBzbGlkZTI7XG4gICAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICBzd2lwZXIuY2xpY2tlZEluZGV4ID0gcGFyc2VJbnQoc2xpZGUyLmdldEF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSBzbGlkZUluZGV4O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuY2xpY2tlZFNsaWRlID0gdm9pZCAwO1xuICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSB2b2lkIDA7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXJhbXMuc2xpZGVUb0NsaWNrZWRTbGlkZSAmJiBzd2lwZXIuY2xpY2tlZEluZGV4ICE9PSB2b2lkIDAgJiYgc3dpcGVyLmNsaWNrZWRJbmRleCAhPT0gc3dpcGVyLmFjdGl2ZUluZGV4KSB7XG4gICAgc3dpcGVyLnNsaWRlVG9DbGlja2VkU2xpZGUoKTtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0U3dpcGVyVHJhbnNsYXRlKGF4aXMpIHtcbiAgaWYgKGF4aXMgPT09IHZvaWQgMCkge1xuICAgIGF4aXMgPSB0aGlzLmlzSG9yaXpvbnRhbCgpID8gXCJ4XCIgOiBcInlcIjtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlMixcbiAgICB3cmFwcGVyRWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKHBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7XG4gICAgcmV0dXJuIHJ0bCA/IC10cmFuc2xhdGUyIDogdHJhbnNsYXRlMjtcbiAgfVxuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICByZXR1cm4gdHJhbnNsYXRlMjtcbiAgfVxuICBsZXQgY3VycmVudFRyYW5zbGF0ZSA9IGdldFRyYW5zbGF0ZSh3cmFwcGVyRWwsIGF4aXMpO1xuICBjdXJyZW50VHJhbnNsYXRlICs9IHN3aXBlci5jc3NPdmVyZmxvd0FkanVzdG1lbnQoKTtcbiAgaWYgKHJ0bCkgY3VycmVudFRyYW5zbGF0ZSA9IC1jdXJyZW50VHJhbnNsYXRlO1xuICByZXR1cm4gY3VycmVudFRyYW5zbGF0ZSB8fCAwO1xufVxuZnVuY3Rpb24gc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZTIsIGJ5Q29udHJvbGxlcikge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgcGFyYW1zLFxuICAgIHdyYXBwZXJFbCxcbiAgICBwcm9ncmVzc1xuICB9ID0gc3dpcGVyO1xuICBsZXQgeCA9IDA7XG4gIGxldCB5ID0gMDtcbiAgY29uc3QgeiA9IDA7XG4gIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICB4ID0gcnRsID8gLXRyYW5zbGF0ZTIgOiB0cmFuc2xhdGUyO1xuICB9IGVsc2Uge1xuICAgIHkgPSB0cmFuc2xhdGUyO1xuICB9XG4gIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7XG4gICAgeCA9IE1hdGguZmxvb3IoeCk7XG4gICAgeSA9IE1hdGguZmxvb3IoeSk7XG4gIH1cbiAgc3dpcGVyLnByZXZpb3VzVHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgc3dpcGVyLnRyYW5zbGF0ZSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHggOiB5O1xuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICB3cmFwcGVyRWxbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gXCJzY3JvbGxMZWZ0XCIgOiBcInNjcm9sbFRvcFwiXSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IC14IDogLXk7XG4gIH0gZWxzZSBpZiAoIXBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7XG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgeCAtPSBzd2lwZXIuY3NzT3ZlcmZsb3dBZGp1c3RtZW50KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHkgLT0gc3dpcGVyLmNzc092ZXJmbG93QWRqdXN0bWVudCgpO1xuICAgIH1cbiAgICB3cmFwcGVyRWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7eH1weCwgJHt5fXB4LCAke3p9cHgpYDtcbiAgfVxuICBsZXQgbmV3UHJvZ3Jlc3M7XG4gIGNvbnN0IHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICBuZXdQcm9ncmVzcyA9IDA7XG4gIH0gZWxzZSB7XG4gICAgbmV3UHJvZ3Jlc3MgPSAodHJhbnNsYXRlMiAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyB0cmFuc2xhdGVzRGlmZjtcbiAgfVxuICBpZiAobmV3UHJvZ3Jlc3MgIT09IHByb2dyZXNzKSB7XG4gICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHRyYW5zbGF0ZTIpO1xuICB9XG4gIHN3aXBlci5lbWl0KFwic2V0VHJhbnNsYXRlXCIsIHN3aXBlci50cmFuc2xhdGUsIGJ5Q29udHJvbGxlcik7XG59XG5mdW5jdGlvbiBtaW5UcmFuc2xhdGUoKSB7XG4gIHJldHVybiAtdGhpcy5zbmFwR3JpZFswXTtcbn1cbmZ1bmN0aW9uIG1heFRyYW5zbGF0ZSgpIHtcbiAgcmV0dXJuIC10aGlzLnNuYXBHcmlkW3RoaXMuc25hcEdyaWQubGVuZ3RoIC0gMV07XG59XG5mdW5jdGlvbiB0cmFuc2xhdGVUbyh0cmFuc2xhdGUyLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCB0cmFuc2xhdGVCb3VuZHMsIGludGVybmFsKSB7XG4gIGlmICh0cmFuc2xhdGUyID09PSB2b2lkIDApIHtcbiAgICB0cmFuc2xhdGUyID0gMDtcbiAgfVxuICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBpZiAodHJhbnNsYXRlQm91bmRzID09PSB2b2lkIDApIHtcbiAgICB0cmFuc2xhdGVCb3VuZHMgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgd3JhcHBlckVsXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChzd2lwZXIuYW5pbWF0aW5nICYmIHBhcmFtcy5wcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb24pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgbWluVHJhbnNsYXRlMiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgY29uc3QgbWF4VHJhbnNsYXRlMiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgbGV0IG5ld1RyYW5zbGF0ZTtcbiAgaWYgKHRyYW5zbGF0ZUJvdW5kcyAmJiB0cmFuc2xhdGUyID4gbWluVHJhbnNsYXRlMikgbmV3VHJhbnNsYXRlID0gbWluVHJhbnNsYXRlMjtcbiAgZWxzZSBpZiAodHJhbnNsYXRlQm91bmRzICYmIHRyYW5zbGF0ZTIgPCBtYXhUcmFuc2xhdGUyKSBuZXdUcmFuc2xhdGUgPSBtYXhUcmFuc2xhdGUyO1xuICBlbHNlIG5ld1RyYW5zbGF0ZSA9IHRyYW5zbGF0ZTI7XG4gIHN3aXBlci51cGRhdGVQcm9ncmVzcyhuZXdUcmFuc2xhdGUpO1xuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICBjb25zdCBpc0ggPSBzd2lwZXIuaXNIb3Jpem9udGFsKCk7XG4gICAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgICB3cmFwcGVyRWxbaXNIID8gXCJzY3JvbGxMZWZ0XCIgOiBcInNjcm9sbFRvcFwiXSA9IC1uZXdUcmFuc2xhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghc3dpcGVyLnN1cHBvcnQuc21vb3RoU2Nyb2xsKSB7XG4gICAgICAgIGFuaW1hdGVDU1NNb2RlU2Nyb2xsKHtcbiAgICAgICAgICBzd2lwZXIsXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb246IC1uZXdUcmFuc2xhdGUsXG4gICAgICAgICAgc2lkZTogaXNIID8gXCJsZWZ0XCIgOiBcInRvcFwiXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHdyYXBwZXJFbC5zY3JvbGxUbyh7XG4gICAgICAgIFtpc0ggPyBcImxlZnRcIiA6IFwidG9wXCJdOiAtbmV3VHJhbnNsYXRlLFxuICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChzcGVlZCA9PT0gMCkge1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3VHJhbnNsYXRlKTtcbiAgICBpZiAocnVuQ2FsbGJhY2tzKSB7XG4gICAgICBzd2lwZXIuZW1pdChcImJlZm9yZVRyYW5zaXRpb25TdGFydFwiLCBzcGVlZCwgaW50ZXJuYWwpO1xuICAgICAgc3dpcGVyLmVtaXQoXCJ0cmFuc2l0aW9uRW5kXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihzcGVlZCk7XG4gICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgIGlmIChydW5DYWxsYmFja3MpIHtcbiAgICAgIHN3aXBlci5lbWl0KFwiYmVmb3JlVHJhbnNpdGlvblN0YXJ0XCIsIHNwZWVkLCBpbnRlcm5hbCk7XG4gICAgICBzd2lwZXIuZW1pdChcInRyYW5zaXRpb25TdGFydFwiKTtcbiAgICB9XG4gICAgaWYgKCFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgIGlmICghc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCkge1xuICAgICAgICBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gdHJhbnNpdGlvbkVuZDIoZSkge1xuICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpIHJldHVybjtcbiAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICAgICAgICAgIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQgPSBudWxsO1xuICAgICAgICAgIGRlbGV0ZSBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kO1xuICAgICAgICAgIHN3aXBlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBpZiAocnVuQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBzd2lwZXIuZW1pdChcInRyYW5zaXRpb25FbmRcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgc3dpcGVyLndyYXBwZXJFbC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKCFzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAke2R1cmF0aW9ufW1zYDtcbiAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnRyYW5zaXRpb25EZWxheSA9IGR1cmF0aW9uID09PSAwID8gYDBtc2AgOiBcIlwiO1xuICB9XG4gIHN3aXBlci5lbWl0KFwic2V0VHJhbnNpdGlvblwiLCBkdXJhdGlvbiwgYnlDb250cm9sbGVyKTtcbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb25FbWl0KF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgcnVuQ2FsbGJhY2tzLFxuICAgIGRpcmVjdGlvbixcbiAgICBzdGVwXG4gIH0gPSBfcmVmO1xuICBjb25zdCB7XG4gICAgYWN0aXZlSW5kZXgsXG4gICAgcHJldmlvdXNJbmRleFxuICB9ID0gc3dpcGVyO1xuICBsZXQgZGlyID0gZGlyZWN0aW9uO1xuICBpZiAoIWRpcikge1xuICAgIGlmIChhY3RpdmVJbmRleCA+IHByZXZpb3VzSW5kZXgpIGRpciA9IFwibmV4dFwiO1xuICAgIGVsc2UgaWYgKGFjdGl2ZUluZGV4IDwgcHJldmlvdXNJbmRleCkgZGlyID0gXCJwcmV2XCI7XG4gICAgZWxzZSBkaXIgPSBcInJlc2V0XCI7XG4gIH1cbiAgc3dpcGVyLmVtaXQoYHRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gIGlmIChydW5DYWxsYmFja3MgJiYgYWN0aXZlSW5kZXggIT09IHByZXZpb3VzSW5kZXgpIHtcbiAgICBpZiAoZGlyID09PSBcInJlc2V0XCIpIHtcbiAgICAgIHN3aXBlci5lbWl0KGBzbGlkZVJlc2V0VHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoYHNsaWRlQ2hhbmdlVHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgICBpZiAoZGlyID09PSBcIm5leHRcIikge1xuICAgICAgc3dpcGVyLmVtaXQoYHNsaWRlTmV4dFRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5lbWl0KGBzbGlkZVByZXZUcmFuc2l0aW9uJHtzdGVwfWApO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gdHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKSB7XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBpZiAocGFyYW1zLmNzc01vZGUpIHJldHVybjtcbiAgaWYgKHBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgfVxuICB0cmFuc2l0aW9uRW1pdCh7XG4gICAgc3dpcGVyLFxuICAgIHJ1bkNhbGxiYWNrcyxcbiAgICBkaXJlY3Rpb24sXG4gICAgc3RlcDogXCJTdGFydFwiXG4gIH0pO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MsIGRpcmVjdGlvbikge1xuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgc3dpcGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICBpZiAocGFyYW1zLmNzc01vZGUpIHJldHVybjtcbiAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gIHRyYW5zaXRpb25FbWl0KHtcbiAgICBzd2lwZXIsXG4gICAgcnVuQ2FsbGJhY2tzLFxuICAgIGRpcmVjdGlvbixcbiAgICBzdGVwOiBcIkVuZFwiXG4gIH0pO1xufVxuZnVuY3Rpb24gc2xpZGVUbyhpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwsIGluaXRpYWwpIHtcbiAgaWYgKGluZGV4ID09PSB2b2lkIDApIHtcbiAgICBpbmRleCA9IDA7XG4gIH1cbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBpZiAodHlwZW9mIGluZGV4ID09PSBcInN0cmluZ1wiKSB7XG4gICAgaW5kZXggPSBwYXJzZUludChpbmRleCwgMTApO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGxldCBzbGlkZUluZGV4ID0gaW5kZXg7XG4gIGlmIChzbGlkZUluZGV4IDwgMCkgc2xpZGVJbmRleCA9IDA7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgc25hcEdyaWQsXG4gICAgc2xpZGVzR3JpZCxcbiAgICBwcmV2aW91c0luZGV4LFxuICAgIGFjdGl2ZUluZGV4LFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHdyYXBwZXJFbCxcbiAgICBlbmFibGVkXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCAmJiAhaW50ZXJuYWwgJiYgIWluaXRpYWwgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCBzd2lwZXIuYW5pbWF0aW5nICYmIHBhcmFtcy5wcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb24pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNwZWVkID0gc3dpcGVyLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBjb25zdCBza2lwID0gTWF0aC5taW4oc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsIHNsaWRlSW5kZXgpO1xuICBsZXQgc25hcEluZGV4ID0gc2tpcCArIE1hdGguZmxvb3IoKHNsaWRlSW5kZXggLSBza2lwKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICBpZiAoc25hcEluZGV4ID49IHNuYXBHcmlkLmxlbmd0aCkgc25hcEluZGV4ID0gc25hcEdyaWQubGVuZ3RoIC0gMTtcbiAgY29uc3QgdHJhbnNsYXRlMiA9IC1zbmFwR3JpZFtzbmFwSW5kZXhdO1xuICBpZiAocGFyYW1zLm5vcm1hbGl6ZVNsaWRlSW5kZXgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc2xhdGUgPSAtTWF0aC5mbG9vcih0cmFuc2xhdGUyICogMTAwKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRHcmlkID0gTWF0aC5mbG9vcihzbGlkZXNHcmlkW2ldICogMTAwKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRHcmlkTmV4dCA9IE1hdGguZmxvb3Ioc2xpZGVzR3JpZFtpICsgMV0gKiAxMDApO1xuICAgICAgaWYgKHR5cGVvZiBzbGlkZXNHcmlkW2kgKyAxXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAobm9ybWFsaXplZFRyYW5zbGF0ZSA+PSBub3JtYWxpemVkR3JpZCAmJiBub3JtYWxpemVkVHJhbnNsYXRlIDwgbm9ybWFsaXplZEdyaWROZXh0IC0gKG5vcm1hbGl6ZWRHcmlkTmV4dCAtIG5vcm1hbGl6ZWRHcmlkKSAvIDIpIHtcbiAgICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgICAgfSBlbHNlIGlmIChub3JtYWxpemVkVHJhbnNsYXRlID49IG5vcm1hbGl6ZWRHcmlkICYmIG5vcm1hbGl6ZWRUcmFuc2xhdGUgPCBub3JtYWxpemVkR3JpZE5leHQpIHtcbiAgICAgICAgICBzbGlkZUluZGV4ID0gaSArIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobm9ybWFsaXplZFRyYW5zbGF0ZSA+PSBub3JtYWxpemVkR3JpZCkge1xuICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHN3aXBlci5pbml0aWFsaXplZCAmJiBzbGlkZUluZGV4ICE9PSBhY3RpdmVJbmRleCkge1xuICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVOZXh0ICYmIChydGwgPyB0cmFuc2xhdGUyID4gc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUyID4gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIDogdHJhbnNsYXRlMiA8IHN3aXBlci50cmFuc2xhdGUgJiYgdHJhbnNsYXRlMiA8IHN3aXBlci5taW5UcmFuc2xhdGUoKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgdHJhbnNsYXRlMiA+IHN3aXBlci50cmFuc2xhdGUgJiYgdHJhbnNsYXRlMiA+IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgaWYgKChhY3RpdmVJbmRleCB8fCAwKSAhPT0gc2xpZGVJbmRleCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChzbGlkZUluZGV4ICE9PSAocHJldmlvdXNJbmRleCB8fCAwKSAmJiBydW5DYWxsYmFja3MpIHtcbiAgICBzd2lwZXIuZW1pdChcImJlZm9yZVNsaWRlQ2hhbmdlU3RhcnRcIik7XG4gIH1cbiAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHRyYW5zbGF0ZTIpO1xuICBsZXQgZGlyZWN0aW9uO1xuICBpZiAoc2xpZGVJbmRleCA+IGFjdGl2ZUluZGV4KSBkaXJlY3Rpb24gPSBcIm5leHRcIjtcbiAgZWxzZSBpZiAoc2xpZGVJbmRleCA8IGFjdGl2ZUluZGV4KSBkaXJlY3Rpb24gPSBcInByZXZcIjtcbiAgZWxzZSBkaXJlY3Rpb24gPSBcInJlc2V0XCI7XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBjb25zdCBpc0luaXRpYWxWaXJ0dWFsID0gaXNWaXJ0dWFsICYmIGluaXRpYWw7XG4gIGlmICghaXNJbml0aWFsVmlydHVhbCAmJiAocnRsICYmIC10cmFuc2xhdGUyID09PSBzd2lwZXIudHJhbnNsYXRlIHx8ICFydGwgJiYgdHJhbnNsYXRlMiA9PT0gc3dpcGVyLnRyYW5zbGF0ZSkpIHtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoc2xpZGVJbmRleCk7XG4gICAgaWYgKHBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgIH1cbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgIGlmIChwYXJhbXMuZWZmZWN0ICE9PSBcInNsaWRlXCIpIHtcbiAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlMik7XG4gICAgfVxuICAgIGlmIChkaXJlY3Rpb24gIT09IFwicmVzZXRcIikge1xuICAgICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgICBzd2lwZXIudHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICBjb25zdCBpc0ggPSBzd2lwZXIuaXNIb3Jpem9udGFsKCk7XG4gICAgY29uc3QgdCA9IHJ0bCA/IHRyYW5zbGF0ZTIgOiAtdHJhbnNsYXRlMjtcbiAgICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9IFwibm9uZVwiO1xuICAgICAgICBzd2lwZXIuX2ltbWVkaWF0ZVZpcnR1YWwgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGlzVmlydHVhbCAmJiAhc3dpcGVyLl9jc3NNb2RlVmlydHVhbEluaXRpYWxTZXQgJiYgc3dpcGVyLnBhcmFtcy5pbml0aWFsU2xpZGUgPiAwKSB7XG4gICAgICAgIHN3aXBlci5fY3NzTW9kZVZpcnR1YWxJbml0aWFsU2V0ID0gdHJ1ZTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICB3cmFwcGVyRWxbaXNIID8gXCJzY3JvbGxMZWZ0XCIgOiBcInNjcm9sbFRvcFwiXSA9IHQ7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JhcHBlckVsW2lzSCA/IFwic2Nyb2xsTGVmdFwiIDogXCJzY3JvbGxUb3BcIl0gPSB0O1xuICAgICAgfVxuICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuc2Nyb2xsU25hcFR5cGUgPSBcIlwiO1xuICAgICAgICAgIHN3aXBlci5faW1tZWRpYXRlVmlydHVhbCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFzd2lwZXIuc3VwcG9ydC5zbW9vdGhTY3JvbGwpIHtcbiAgICAgICAgYW5pbWF0ZUNTU01vZGVTY3JvbGwoe1xuICAgICAgICAgIHN3aXBlcixcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbjogdCxcbiAgICAgICAgICBzaWRlOiBpc0ggPyBcImxlZnRcIiA6IFwidG9wXCJcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgd3JhcHBlckVsLnNjcm9sbFRvKHtcbiAgICAgICAgW2lzSCA/IFwibGVmdFwiIDogXCJ0b3BcIl06IHQsXG4gICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3BlZWQpO1xuICBzd2lwZXIuc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZTIpO1xuICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoc2xpZGVJbmRleCk7XG4gIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gIHN3aXBlci5lbWl0KFwiYmVmb3JlVHJhbnNpdGlvblN0YXJ0XCIsIHNwZWVkLCBpbnRlcm5hbCk7XG4gIHN3aXBlci50cmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICBzd2lwZXIudHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gIH0gZWxzZSBpZiAoIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICBpZiAoIXN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCkge1xuICAgICAgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gdHJhbnNpdGlvbkVuZDIoZSkge1xuICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgcmV0dXJuO1xuICAgICAgICBzd2lwZXIud3JhcHBlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IG51bGw7XG4gICAgICAgIGRlbGV0ZSBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQ7XG4gICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHN3aXBlci53cmFwcGVyRWwuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHNsaWRlVG9Mb29wKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICBpZiAoaW5kZXggPT09IHZvaWQgMCkge1xuICAgIGluZGV4ID0gMDtcbiAgfVxuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGlmICh0eXBlb2YgaW5kZXggPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBpbmRleEFzTnVtYmVyID0gcGFyc2VJbnQoaW5kZXgsIDEwKTtcbiAgICBpbmRleCA9IGluZGV4QXNOdW1iZXI7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNwZWVkID0gc3dpcGVyLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBjb25zdCBncmlkRW5hYmxlZCA9IHN3aXBlci5ncmlkICYmIHN3aXBlci5wYXJhbXMuZ3JpZCAmJiBzd2lwZXIucGFyYW1zLmdyaWQucm93cyA+IDE7XG4gIGxldCBuZXdJbmRleCA9IGluZGV4O1xuICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICBuZXdJbmRleCA9IG5ld0luZGV4ICsgc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdGFyZ2V0U2xpZGVJbmRleDtcbiAgICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgICBjb25zdCBzbGlkZUluZGV4ID0gbmV3SW5kZXggKiBzd2lwZXIucGFyYW1zLmdyaWQucm93cztcbiAgICAgICAgdGFyZ2V0U2xpZGVJbmRleCA9IHN3aXBlci5zbGlkZXMuZmlsdGVyKChzbGlkZUVsKSA9PiBzbGlkZUVsLmdldEF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpICogMSA9PT0gc2xpZGVJbmRleClbMF0uY29sdW1uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0U2xpZGVJbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4QnlEYXRhKG5ld0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbHMgPSBncmlkRW5hYmxlZCA/IE1hdGguY2VpbChzd2lwZXIuc2xpZGVzLmxlbmd0aCAvIHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzKSA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICAgICAgY29uc3Qge1xuICAgICAgICBjZW50ZXJlZFNsaWRlc1xuICAgICAgfSA9IHN3aXBlci5wYXJhbXM7XG4gICAgICBsZXQgc2xpZGVzUGVyVmlldyA9IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgIGlmIChzbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIikge1xuICAgICAgICBzbGlkZXNQZXJWaWV3ID0gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZXNQZXJWaWV3ID0gTWF0aC5jZWlsKHBhcnNlRmxvYXQoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3LCAxMCkpO1xuICAgICAgICBpZiAoY2VudGVyZWRTbGlkZXMgJiYgc2xpZGVzUGVyVmlldyAlIDIgPT09IDApIHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3ID0gc2xpZGVzUGVyVmlldyArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxldCBuZWVkTG9vcEZpeCA9IGNvbHMgLSB0YXJnZXRTbGlkZUluZGV4IDwgc2xpZGVzUGVyVmlldztcbiAgICAgIGlmIChjZW50ZXJlZFNsaWRlcykge1xuICAgICAgICBuZWVkTG9vcEZpeCA9IG5lZWRMb29wRml4IHx8IHRhcmdldFNsaWRlSW5kZXggPCBNYXRoLmNlaWwoc2xpZGVzUGVyVmlldyAvIDIpO1xuICAgICAgfVxuICAgICAgaWYgKGludGVybmFsICYmIGNlbnRlcmVkU2xpZGVzICYmIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gXCJhdXRvXCIgJiYgIWdyaWRFbmFibGVkKSB7XG4gICAgICAgIG5lZWRMb29wRml4ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExvb3BGaXgpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gY2VudGVyZWRTbGlkZXMgPyB0YXJnZXRTbGlkZUluZGV4IDwgc3dpcGVyLmFjdGl2ZUluZGV4ID8gXCJwcmV2XCIgOiBcIm5leHRcIiA6IHRhcmdldFNsaWRlSW5kZXggLSBzd2lwZXIuYWN0aXZlSW5kZXggLSAxIDwgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID8gXCJuZXh0XCIgOiBcInByZXZcIjtcbiAgICAgICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgICBzbGlkZVRvOiB0cnVlLFxuICAgICAgICAgIGFjdGl2ZVNsaWRlSW5kZXg6IGRpcmVjdGlvbiA9PT0gXCJuZXh0XCIgPyB0YXJnZXRTbGlkZUluZGV4ICsgMSA6IHRhcmdldFNsaWRlSW5kZXggLSBjb2xzICsgMSxcbiAgICAgICAgICBzbGlkZVJlYWxJbmRleDogZGlyZWN0aW9uID09PSBcIm5leHRcIiA/IHN3aXBlci5yZWFsSW5kZXggOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IG5ld0luZGV4ICogc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3M7XG4gICAgICAgIG5ld0luZGV4ID0gc3dpcGVyLnNsaWRlcy5maWx0ZXIoKHNsaWRlRWwpID0+IHNsaWRlRWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIikgKiAxID09PSBzbGlkZUluZGV4KVswXS5jb2x1bW47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdJbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4QnlEYXRhKG5ld0luZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICBzd2lwZXIuc2xpZGVUbyhuZXdJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICB9KTtcbiAgcmV0dXJuIHN3aXBlcjtcbn1cbmZ1bmN0aW9uIHNsaWRlTmV4dChzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBlbmFibGVkLFxuICAgIHBhcmFtcyxcbiAgICBhbmltYXRpbmdcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybiBzd2lwZXI7XG4gIGlmICh0eXBlb2Ygc3BlZWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzcGVlZCA9IHN3aXBlci5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgbGV0IHBlckdyb3VwID0gcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiICYmIHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMSAmJiBwYXJhbXMuc2xpZGVzUGVyR3JvdXBBdXRvKSB7XG4gICAgcGVyR3JvdXAgPSBNYXRoLm1heChzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoXCJjdXJyZW50XCIsIHRydWUpLCAxKTtcbiAgfVxuICBjb25zdCBpbmNyZW1lbnQgPSBzd2lwZXIuYWN0aXZlSW5kZXggPCBwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwID8gMSA6IHBlckdyb3VwO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoYW5pbWF0aW5nICYmICFpc1ZpcnR1YWwgJiYgcGFyYW1zLmxvb3BQcmV2ZW50c1NsaWRpbmcpIHJldHVybiBmYWxzZTtcbiAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICBkaXJlY3Rpb246IFwibmV4dFwiXG4gICAgfSk7XG4gICAgc3dpcGVyLl9jbGllbnRMZWZ0ID0gc3dpcGVyLndyYXBwZXJFbC5jbGllbnRMZWZ0O1xuICAgIGlmIChzd2lwZXIuYWN0aXZlSW5kZXggPT09IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSAmJiBwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4ICsgaW5jcmVtZW50LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAocGFyYW1zLnJld2luZCAmJiBzd2lwZXIuaXNFbmQpIHtcbiAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oMCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICB9XG4gIHJldHVybiBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXggKyBpbmNyZW1lbnQsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbn1cbmZ1bmN0aW9uIHNsaWRlUHJldihzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgc25hcEdyaWQsXG4gICAgc2xpZGVzR3JpZCxcbiAgICBydGxUcmFuc2xhdGUsXG4gICAgZW5hYmxlZCxcbiAgICBhbmltYXRpbmdcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybiBzd2lwZXI7XG4gIGlmICh0eXBlb2Ygc3BlZWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzcGVlZCA9IHN3aXBlci5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgaWYgKGFuaW1hdGluZyAmJiAhaXNWaXJ0dWFsICYmIHBhcmFtcy5sb29wUHJldmVudHNTbGlkaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgZGlyZWN0aW9uOiBcInByZXZcIlxuICAgIH0pO1xuICAgIHN3aXBlci5fY2xpZW50TGVmdCA9IHN3aXBlci53cmFwcGVyRWwuY2xpZW50TGVmdDtcbiAgfVxuICBjb25zdCB0cmFuc2xhdGUyID0gcnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICBmdW5jdGlvbiBub3JtYWxpemUodmFsKSB7XG4gICAgaWYgKHZhbCA8IDApIHJldHVybiAtTWF0aC5mbG9vcihNYXRoLmFicyh2YWwpKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih2YWwpO1xuICB9XG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc2xhdGUgPSBub3JtYWxpemUodHJhbnNsYXRlMik7XG4gIGNvbnN0IG5vcm1hbGl6ZWRTbmFwR3JpZCA9IHNuYXBHcmlkLm1hcCgodmFsKSA9PiBub3JtYWxpemUodmFsKSk7XG4gIGxldCBwcmV2U25hcCA9IHNuYXBHcmlkW25vcm1hbGl6ZWRTbmFwR3JpZC5pbmRleE9mKG5vcm1hbGl6ZWRUcmFuc2xhdGUpIC0gMV07XG4gIGlmICh0eXBlb2YgcHJldlNuYXAgPT09IFwidW5kZWZpbmVkXCIgJiYgcGFyYW1zLmNzc01vZGUpIHtcbiAgICBsZXQgcHJldlNuYXBJbmRleDtcbiAgICBzbmFwR3JpZC5mb3JFYWNoKChzbmFwLCBzbmFwSW5kZXgpID0+IHtcbiAgICAgIGlmIChub3JtYWxpemVkVHJhbnNsYXRlID49IHNuYXApIHtcbiAgICAgICAgcHJldlNuYXBJbmRleCA9IHNuYXBJbmRleDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIHByZXZTbmFwSW5kZXggIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHByZXZTbmFwID0gc25hcEdyaWRbcHJldlNuYXBJbmRleCA+IDAgPyBwcmV2U25hcEluZGV4IC0gMSA6IHByZXZTbmFwSW5kZXhdO1xuICAgIH1cbiAgfVxuICBsZXQgcHJldkluZGV4ID0gMDtcbiAgaWYgKHR5cGVvZiBwcmV2U25hcCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHByZXZJbmRleCA9IHNsaWRlc0dyaWQuaW5kZXhPZihwcmV2U25hcCk7XG4gICAgaWYgKHByZXZJbmRleCA8IDApIHByZXZJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleCAtIDE7XG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIiAmJiBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDEgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwQXV0bykge1xuICAgICAgcHJldkluZGV4ID0gcHJldkluZGV4IC0gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKFwicHJldmlvdXNcIiwgdHJ1ZSkgKyAxO1xuICAgICAgcHJldkluZGV4ID0gTWF0aC5tYXgocHJldkluZGV4LCAwKTtcbiAgICB9XG4gIH1cbiAgaWYgKHBhcmFtcy5yZXdpbmQgJiYgc3dpcGVyLmlzQmVnaW5uaW5nKSB7XG4gICAgY29uc3QgbGFzdEluZGV4ID0gc3dpcGVyLnBhcmFtcy52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkICYmIHN3aXBlci52aXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCAtIDEgOiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKGxhc3RJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICB9IGVsc2UgaWYgKHBhcmFtcy5sb29wICYmIHN3aXBlci5hY3RpdmVJbmRleCA9PT0gMCAmJiBwYXJhbXMuY3NzTW9kZSkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhwcmV2SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gc3dpcGVyLnNsaWRlVG8ocHJldkluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG59XG5mdW5jdGlvbiBzbGlkZVJlc2V0KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNwZWVkID0gc3dpcGVyLnBhcmFtcy5zcGVlZDtcbiAgfVxuICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG59XG5mdW5jdGlvbiBzbGlkZVRvQ2xvc2VzdChzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCwgdGhyZXNob2xkKSB7XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgaWYgKHRocmVzaG9sZCA9PT0gdm9pZCAwKSB7XG4gICAgdGhyZXNob2xkID0gMC41O1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmIChzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gIGlmICh0eXBlb2Ygc3BlZWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzcGVlZCA9IHN3aXBlci5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgbGV0IGluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICBjb25zdCBza2lwID0gTWF0aC5taW4oc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsIGluZGV4KTtcbiAgY29uc3Qgc25hcEluZGV4ID0gc2tpcCArIE1hdGguZmxvb3IoKGluZGV4IC0gc2tpcCkgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgY29uc3QgdHJhbnNsYXRlMiA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIGlmICh0cmFuc2xhdGUyID49IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXhdKSB7XG4gICAgY29uc3QgY3VycmVudFNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4XTtcbiAgICBjb25zdCBuZXh0U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXggKyAxXTtcbiAgICBpZiAodHJhbnNsYXRlMiAtIGN1cnJlbnRTbmFwID4gKG5leHRTbmFwIC0gY3VycmVudFNuYXApICogdGhyZXNob2xkKSB7XG4gICAgICBpbmRleCArPSBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBwcmV2U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXggLSAxXTtcbiAgICBjb25zdCBjdXJyZW50U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXhdO1xuICAgIGlmICh0cmFuc2xhdGUyIC0gcHJldlNuYXAgPD0gKGN1cnJlbnRTbmFwIC0gcHJldlNuYXApICogdGhyZXNob2xkKSB7XG4gICAgICBpbmRleCAtPSBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgIH1cbiAgfVxuICBpbmRleCA9IE1hdGgubWF4KGluZGV4LCAwKTtcbiAgaW5kZXggPSBNYXRoLm1pbihpbmRleCwgc3dpcGVyLnNsaWRlc0dyaWQubGVuZ3RoIC0gMSk7XG4gIHJldHVybiBzd2lwZXIuc2xpZGVUbyhpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufVxuZnVuY3Rpb24gc2xpZGVUb0NsaWNrZWRTbGlkZSgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBzbGlkZXNFbFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBzbGlkZXNQZXJWaWV3ID0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiID8gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCkgOiBwYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgbGV0IHNsaWRlVG9JbmRleCA9IHN3aXBlci5jbGlja2VkSW5kZXg7XG4gIGxldCByZWFsSW5kZXg7XG4gIGNvbnN0IHNsaWRlU2VsZWN0b3IgPSBzd2lwZXIuaXNFbGVtZW50ID8gYHN3aXBlci1zbGlkZWAgOiBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9YDtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgaWYgKHN3aXBlci5hbmltYXRpbmcpIHJldHVybjtcbiAgICByZWFsSW5kZXggPSBwYXJzZUludChzd2lwZXIuY2xpY2tlZFNsaWRlLmdldEF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpLCAxMCk7XG4gICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgaWYgKHNsaWRlVG9JbmRleCA8IHN3aXBlci5sb29wZWRTbGlkZXMgLSBzbGlkZXNQZXJWaWV3IC8gMiB8fCBzbGlkZVRvSW5kZXggPiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIHN3aXBlci5sb29wZWRTbGlkZXMgKyBzbGlkZXNQZXJWaWV3IC8gMikge1xuICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICBzbGlkZVRvSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleChlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAke3NsaWRlU2VsZWN0b3J9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtyZWFsSW5kZXh9XCJdYClbMF0pO1xuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2xpZGVUb0luZGV4ID4gc3dpcGVyLnNsaWRlcy5sZW5ndGggLSBzbGlkZXNQZXJWaWV3KSB7XG4gICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgc2xpZGVUb0luZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXgoZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgJHtzbGlkZVNlbGVjdG9yfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7cmVhbEluZGV4fVwiXWApWzBdKTtcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICB9XG59XG5mdW5jdGlvbiBsb29wQ3JlYXRlKHNsaWRlUmVhbEluZGV4KSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgc2xpZGVzRWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFwYXJhbXMubG9vcCB8fCBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkgcmV0dXJuO1xuICBjb25zdCBpbml0U2xpZGVzID0gKCkgPT4ge1xuICAgIGNvbnN0IHNsaWRlcyA9IGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCk7XG4gICAgc2xpZGVzLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIiwgaW5kZXgpO1xuICAgIH0pO1xuICB9O1xuICBjb25zdCBncmlkRW5hYmxlZCA9IHN3aXBlci5ncmlkICYmIHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuICBjb25zdCBzbGlkZXNQZXJHcm91cCA9IHBhcmFtcy5zbGlkZXNQZXJHcm91cCAqIChncmlkRW5hYmxlZCA/IHBhcmFtcy5ncmlkLnJvd3MgOiAxKTtcbiAgY29uc3Qgc2hvdWxkRmlsbEdyb3VwID0gc3dpcGVyLnNsaWRlcy5sZW5ndGggJSBzbGlkZXNQZXJHcm91cCAhPT0gMDtcbiAgY29uc3Qgc2hvdWxkRmlsbEdyaWQgPSBncmlkRW5hYmxlZCAmJiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAlIHBhcmFtcy5ncmlkLnJvd3MgIT09IDA7XG4gIGNvbnN0IGFkZEJsYW5rU2xpZGVzID0gKGFtb3VudE9mU2xpZGVzKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbW91bnRPZlNsaWRlczsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzbGlkZUVsID0gc3dpcGVyLmlzRWxlbWVudCA/IGNyZWF0ZUVsZW1lbnQyKFwic3dpcGVyLXNsaWRlXCIsIFtwYXJhbXMuc2xpZGVCbGFua0NsYXNzXSkgOiBjcmVhdGVFbGVtZW50MihcImRpdlwiLCBbcGFyYW1zLnNsaWRlQ2xhc3MsIHBhcmFtcy5zbGlkZUJsYW5rQ2xhc3NdKTtcbiAgICAgIHN3aXBlci5zbGlkZXNFbC5hcHBlbmQoc2xpZGVFbCk7XG4gICAgfVxuICB9O1xuICBpZiAoc2hvdWxkRmlsbEdyb3VwKSB7XG4gICAgaWYgKHBhcmFtcy5sb29wQWRkQmxhbmtTbGlkZXMpIHtcbiAgICAgIGNvbnN0IHNsaWRlc1RvQWRkID0gc2xpZGVzUGVyR3JvdXAgLSBzd2lwZXIuc2xpZGVzLmxlbmd0aCAlIHNsaWRlc1Blckdyb3VwO1xuICAgICAgYWRkQmxhbmtTbGlkZXMoc2xpZGVzVG9BZGQpO1xuICAgICAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaG93V2FybmluZyhcIlN3aXBlciBMb29wIFdhcm5pbmc6IFRoZSBudW1iZXIgb2Ygc2xpZGVzIGlzIG5vdCBldmVuIHRvIHNsaWRlc1Blckdyb3VwLCBsb29wIG1vZGUgbWF5IG5vdCBmdW5jdGlvbiBwcm9wZXJseS4gWW91IG5lZWQgdG8gYWRkIG1vcmUgc2xpZGVzIChvciBtYWtlIGR1cGxpY2F0ZXMsIG9yIGVtcHR5IHNsaWRlcylcIik7XG4gICAgfVxuICAgIGluaXRTbGlkZXMoKTtcbiAgfSBlbHNlIGlmIChzaG91bGRGaWxsR3JpZCkge1xuICAgIGlmIChwYXJhbXMubG9vcEFkZEJsYW5rU2xpZGVzKSB7XG4gICAgICBjb25zdCBzbGlkZXNUb0FkZCA9IHBhcmFtcy5ncmlkLnJvd3MgLSBzd2lwZXIuc2xpZGVzLmxlbmd0aCAlIHBhcmFtcy5ncmlkLnJvd3M7XG4gICAgICBhZGRCbGFua1NsaWRlcyhzbGlkZXNUb0FkZCk7XG4gICAgICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dXYXJuaW5nKFwiU3dpcGVyIExvb3AgV2FybmluZzogVGhlIG51bWJlciBvZiBzbGlkZXMgaXMgbm90IGV2ZW4gdG8gZ3JpZC5yb3dzLCBsb29wIG1vZGUgbWF5IG5vdCBmdW5jdGlvbiBwcm9wZXJseS4gWW91IG5lZWQgdG8gYWRkIG1vcmUgc2xpZGVzIChvciBtYWtlIGR1cGxpY2F0ZXMsIG9yIGVtcHR5IHNsaWRlcylcIik7XG4gICAgfVxuICAgIGluaXRTbGlkZXMoKTtcbiAgfSBlbHNlIHtcbiAgICBpbml0U2xpZGVzKCk7XG4gIH1cbiAgc3dpcGVyLmxvb3BGaXgoe1xuICAgIHNsaWRlUmVhbEluZGV4LFxuICAgIGRpcmVjdGlvbjogcGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gdm9pZCAwIDogXCJuZXh0XCJcbiAgfSk7XG59XG5mdW5jdGlvbiBsb29wRml4KF90ZW1wKSB7XG4gIGxldCB7XG4gICAgc2xpZGVSZWFsSW5kZXgsXG4gICAgc2xpZGVUbzogc2xpZGVUbzIgPSB0cnVlLFxuICAgIGRpcmVjdGlvbixcbiAgICBzZXRUcmFuc2xhdGU6IHNldFRyYW5zbGF0ZTIsXG4gICAgYWN0aXZlU2xpZGVJbmRleCxcbiAgICBieUNvbnRyb2xsZXIsXG4gICAgYnlNb3VzZXdoZWVsXG4gIH0gPSBfdGVtcCA9PT0gdm9pZCAwID8ge30gOiBfdGVtcDtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKCFzd2lwZXIucGFyYW1zLmxvb3ApIHJldHVybjtcbiAgc3dpcGVyLmVtaXQoXCJiZWZvcmVMb29wRml4XCIpO1xuICBjb25zdCB7XG4gICAgc2xpZGVzLFxuICAgIGFsbG93U2xpZGVQcmV2LFxuICAgIGFsbG93U2xpZGVOZXh0LFxuICAgIHNsaWRlc0VsLFxuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBjb25zdCB7XG4gICAgY2VudGVyZWRTbGlkZXNcbiAgfSA9IHBhcmFtcztcbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gdHJ1ZTtcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gdHJ1ZTtcbiAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICBpZiAoc2xpZGVUbzIpIHtcbiAgICAgIGlmICghcGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHN3aXBlci5zbmFwSW5kZXggPT09IDApIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgc3dpcGVyLnNuYXBJbmRleCA8IHBhcmFtcy5zbGlkZXNQZXJWaWV3KSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggKyBzd2lwZXIuc25hcEluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHN3aXBlci5zbmFwSW5kZXggPT09IHN3aXBlci5zbmFwR3JpZC5sZW5ndGggLSAxKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZSwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSBhbGxvd1NsaWRlUHJldjtcbiAgICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSBhbGxvd1NsaWRlTmV4dDtcbiAgICBzd2lwZXIuZW1pdChcImxvb3BGaXhcIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBzbGlkZXNQZXJWaWV3ID0gcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gIGlmIChzbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIikge1xuICAgIHNsaWRlc1BlclZpZXcgPSBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKTtcbiAgfSBlbHNlIHtcbiAgICBzbGlkZXNQZXJWaWV3ID0gTWF0aC5jZWlsKHBhcnNlRmxvYXQocGFyYW1zLnNsaWRlc1BlclZpZXcsIDEwKSk7XG4gICAgaWYgKGNlbnRlcmVkU2xpZGVzICYmIHNsaWRlc1BlclZpZXcgJSAyID09PSAwKSB7XG4gICAgICBzbGlkZXNQZXJWaWV3ID0gc2xpZGVzUGVyVmlldyArIDE7XG4gICAgfVxuICB9XG4gIGNvbnN0IHNsaWRlc1Blckdyb3VwID0gcGFyYW1zLnNsaWRlc1Blckdyb3VwQXV0byA/IHNsaWRlc1BlclZpZXcgOiBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gIGxldCBsb29wZWRTbGlkZXMgPSBzbGlkZXNQZXJHcm91cDtcbiAgaWYgKGxvb3BlZFNsaWRlcyAlIHNsaWRlc1Blckdyb3VwICE9PSAwKSB7XG4gICAgbG9vcGVkU2xpZGVzICs9IHNsaWRlc1Blckdyb3VwIC0gbG9vcGVkU2xpZGVzICUgc2xpZGVzUGVyR3JvdXA7XG4gIH1cbiAgbG9vcGVkU2xpZGVzICs9IHBhcmFtcy5sb29wQWRkaXRpb25hbFNsaWRlcztcbiAgc3dpcGVyLmxvb3BlZFNsaWRlcyA9IGxvb3BlZFNsaWRlcztcbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBzd2lwZXIuZ3JpZCAmJiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMTtcbiAgaWYgKHNsaWRlcy5sZW5ndGggPCBzbGlkZXNQZXJWaWV3ICsgbG9vcGVkU2xpZGVzKSB7XG4gICAgc2hvd1dhcm5pbmcoXCJTd2lwZXIgTG9vcCBXYXJuaW5nOiBUaGUgbnVtYmVyIG9mIHNsaWRlcyBpcyBub3QgZW5vdWdoIGZvciBsb29wIG1vZGUsIGl0IHdpbGwgYmUgZGlzYWJsZWQgYW5kIG5vdCBmdW5jdGlvbiBwcm9wZXJseS4gWW91IG5lZWQgdG8gYWRkIG1vcmUgc2xpZGVzIChvciBtYWtlIGR1cGxpY2F0ZXMpIG9yIGxvd2VyIHRoZSB2YWx1ZXMgb2Ygc2xpZGVzUGVyVmlldyBhbmQgc2xpZGVzUGVyR3JvdXAgcGFyYW1ldGVyc1wiKTtcbiAgfSBlbHNlIGlmIChncmlkRW5hYmxlZCAmJiBwYXJhbXMuZ3JpZC5maWxsID09PSBcInJvd1wiKSB7XG4gICAgc2hvd1dhcm5pbmcoXCJTd2lwZXIgTG9vcCBXYXJuaW5nOiBMb29wIG1vZGUgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBncmlkLmZpbGwgPSBgcm93YFwiKTtcbiAgfVxuICBjb25zdCBwcmVwZW5kU2xpZGVzSW5kZXhlcyA9IFtdO1xuICBjb25zdCBhcHBlbmRTbGlkZXNJbmRleGVzID0gW107XG4gIGxldCBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgaWYgKHR5cGVvZiBhY3RpdmVTbGlkZUluZGV4ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgYWN0aXZlU2xpZGVJbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4KHNsaWRlcy5maWx0ZXIoKGVsKSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMocGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpKVswXSk7XG4gIH0gZWxzZSB7XG4gICAgYWN0aXZlSW5kZXggPSBhY3RpdmVTbGlkZUluZGV4O1xuICB9XG4gIGNvbnN0IGlzTmV4dCA9IGRpcmVjdGlvbiA9PT0gXCJuZXh0XCIgfHwgIWRpcmVjdGlvbjtcbiAgY29uc3QgaXNQcmV2ID0gZGlyZWN0aW9uID09PSBcInByZXZcIiB8fCAhZGlyZWN0aW9uO1xuICBsZXQgc2xpZGVzUHJlcGVuZGVkID0gMDtcbiAgbGV0IHNsaWRlc0FwcGVuZGVkID0gMDtcbiAgY29uc3QgY29scyA9IGdyaWRFbmFibGVkID8gTWF0aC5jZWlsKHNsaWRlcy5sZW5ndGggLyBwYXJhbXMuZ3JpZC5yb3dzKSA6IHNsaWRlcy5sZW5ndGg7XG4gIGNvbnN0IGFjdGl2ZUNvbEluZGV4ID0gZ3JpZEVuYWJsZWQgPyBzbGlkZXNbYWN0aXZlU2xpZGVJbmRleF0uY29sdW1uIDogYWN0aXZlU2xpZGVJbmRleDtcbiAgY29uc3QgYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQgPSBhY3RpdmVDb2xJbmRleCArIChjZW50ZXJlZFNsaWRlcyAmJiB0eXBlb2Ygc2V0VHJhbnNsYXRlMiA9PT0gXCJ1bmRlZmluZWRcIiA/IC1zbGlkZXNQZXJWaWV3IC8gMiArIDAuNSA6IDApO1xuICBpZiAoYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQgPCBsb29wZWRTbGlkZXMpIHtcbiAgICBzbGlkZXNQcmVwZW5kZWQgPSBNYXRoLm1heChsb29wZWRTbGlkZXMgLSBhY3RpdmVDb2xJbmRleFdpdGhTaGlmdCwgc2xpZGVzUGVyR3JvdXApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcGVkU2xpZGVzIC0gYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQ7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaW5kZXggPSBpIC0gTWF0aC5mbG9vcihpIC8gY29scykgKiBjb2xzO1xuICAgICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICAgIGNvbnN0IGNvbEluZGV4VG9QcmVwZW5kID0gY29scyAtIGluZGV4IC0gMTtcbiAgICAgICAgZm9yIChsZXQgaTIgPSBzbGlkZXMubGVuZ3RoIC0gMTsgaTIgPj0gMDsgaTIgLT0gMSkge1xuICAgICAgICAgIGlmIChzbGlkZXNbaTJdLmNvbHVtbiA9PT0gY29sSW5kZXhUb1ByZXBlbmQpIHByZXBlbmRTbGlkZXNJbmRleGVzLnB1c2goaTIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmVwZW5kU2xpZGVzSW5kZXhlcy5wdXNoKGNvbHMgLSBpbmRleCAtIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChhY3RpdmVDb2xJbmRleFdpdGhTaGlmdCArIHNsaWRlc1BlclZpZXcgPiBjb2xzIC0gbG9vcGVkU2xpZGVzKSB7XG4gICAgc2xpZGVzQXBwZW5kZWQgPSBNYXRoLm1heChhY3RpdmVDb2xJbmRleFdpdGhTaGlmdCAtIChjb2xzIC0gbG9vcGVkU2xpZGVzICogMiksIHNsaWRlc1Blckdyb3VwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0FwcGVuZGVkOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gaSAtIE1hdGguZmxvb3IoaSAvIGNvbHMpICogY29scztcbiAgICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUyLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKHNsaWRlMi5jb2x1bW4gPT09IGluZGV4KSBhcHBlbmRTbGlkZXNJbmRleGVzLnB1c2goc2xpZGVJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBwZW5kU2xpZGVzSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSB0cnVlO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gZmFsc2U7XG4gIH0pO1xuICBpZiAoaXNQcmV2KSB7XG4gICAgcHJlcGVuZFNsaWRlc0luZGV4ZXMuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgIHNsaWRlc1tpbmRleF0uc3dpcGVyTG9vcE1vdmVET00gPSB0cnVlO1xuICAgICAgc2xpZGVzRWwucHJlcGVuZChzbGlkZXNbaW5kZXhdKTtcbiAgICAgIHNsaWRlc1tpbmRleF0uc3dpcGVyTG9vcE1vdmVET00gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNOZXh0KSB7XG4gICAgYXBwZW5kU2xpZGVzSW5kZXhlcy5mb3JFYWNoKChpbmRleCkgPT4ge1xuICAgICAgc2xpZGVzW2luZGV4XS5zd2lwZXJMb29wTW92ZURPTSA9IHRydWU7XG4gICAgICBzbGlkZXNFbC5hcHBlbmQoc2xpZGVzW2luZGV4XSk7XG4gICAgICBzbGlkZXNbaW5kZXhdLnN3aXBlckxvb3BNb3ZlRE9NID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbiAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiKSB7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICB9IGVsc2UgaWYgKGdyaWRFbmFibGVkICYmIChwcmVwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggPiAwICYmIGlzUHJldiB8fCBhcHBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCA+IDAgJiYgaXNOZXh0KSkge1xuICAgIHN3aXBlci5zbGlkZXMuZm9yRWFjaCgoc2xpZGUyLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICBzd2lwZXIuZ3JpZC51cGRhdGVTbGlkZShzbGlkZUluZGV4LCBzbGlkZTIsIHN3aXBlci5zbGlkZXMpO1xuICAgIH0pO1xuICB9XG4gIGlmIChwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcykge1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNPZmZzZXQoKTtcbiAgfVxuICBpZiAoc2xpZGVUbzIpIHtcbiAgICBpZiAocHJlcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoID4gMCAmJiBpc1ByZXYpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2xpZGVSZWFsSW5kZXggPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdO1xuICAgICAgICBjb25zdCBuZXdTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2FjdGl2ZUluZGV4ICsgc2xpZGVzUHJlcGVuZGVkXTtcbiAgICAgICAgY29uc3QgZGlmZiA9IG5ld1NsaWRlVHJhbnNsYXRlIC0gY3VycmVudFNsaWRlVHJhbnNsYXRlO1xuICAgICAgICBpZiAoYnlNb3VzZXdoZWVsKSB7XG4gICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShzd2lwZXIudHJhbnNsYXRlIC0gZGlmZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oYWN0aXZlSW5kZXggKyBNYXRoLmNlaWwoc2xpZGVzUHJlcGVuZGVkKSwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgIGlmIChzZXRUcmFuc2xhdGUyKSB7XG4gICAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEYXRhLnN0YXJ0VHJhbnNsYXRlID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5zdGFydFRyYW5zbGF0ZSAtIGRpZmY7XG4gICAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhLmN1cnJlbnRUcmFuc2xhdGUgLSBkaWZmO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNldFRyYW5zbGF0ZTIpIHtcbiAgICAgICAgICBjb25zdCBzaGlmdCA9IGdyaWRFbmFibGVkID8gcHJlcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoIC8gcGFyYW1zLmdyaWQucm93cyA6IHByZXBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aDtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXggKyBzaGlmdCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgIHN3aXBlci50b3VjaEV2ZW50c0RhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci50cmFuc2xhdGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFwcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoID4gMCAmJiBpc05leHQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2xpZGVSZWFsSW5kZXggPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdO1xuICAgICAgICBjb25zdCBuZXdTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2FjdGl2ZUluZGV4IC0gc2xpZGVzQXBwZW5kZWRdO1xuICAgICAgICBjb25zdCBkaWZmID0gbmV3U2xpZGVUcmFuc2xhdGUgLSBjdXJyZW50U2xpZGVUcmFuc2xhdGU7XG4gICAgICAgIGlmIChieU1vdXNld2hlZWwpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHN3aXBlci50cmFuc2xhdGUgLSBkaWZmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhhY3RpdmVJbmRleCAtIHNsaWRlc0FwcGVuZGVkLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgaWYgKHNldFRyYW5zbGF0ZTIpIHtcbiAgICAgICAgICAgIHN3aXBlci50b3VjaEV2ZW50c0RhdGEuc3RhcnRUcmFuc2xhdGUgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhLnN0YXJ0VHJhbnNsYXRlIC0gZGlmZjtcbiAgICAgICAgICAgIHN3aXBlci50b3VjaEV2ZW50c0RhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGEuY3VycmVudFRyYW5zbGF0ZSAtIGRpZmY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzaGlmdCA9IGdyaWRFbmFibGVkID8gYXBwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggLyBwYXJhbXMuZ3JpZC5yb3dzIDogYXBwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGg7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCAtIHNoaWZ0LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IGFsbG93U2xpZGVQcmV2O1xuICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSBhbGxvd1NsaWRlTmV4dDtcbiAgaWYgKHN3aXBlci5jb250cm9sbGVyICYmIHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wgJiYgIWJ5Q29udHJvbGxlcikge1xuICAgIGNvbnN0IGxvb3BQYXJhbXMgPSB7XG4gICAgICBzbGlkZVJlYWxJbmRleCxcbiAgICAgIGRpcmVjdGlvbixcbiAgICAgIHNldFRyYW5zbGF0ZTogc2V0VHJhbnNsYXRlMixcbiAgICAgIGFjdGl2ZVNsaWRlSW5kZXgsXG4gICAgICBieUNvbnRyb2xsZXI6IHRydWVcbiAgICB9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wpKSB7XG4gICAgICBzd2lwZXIuY29udHJvbGxlci5jb250cm9sLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgaWYgKCFjLmRlc3Ryb3llZCAmJiBjLnBhcmFtcy5sb29wKSBjLmxvb3BGaXgoe1xuICAgICAgICAgIC4uLmxvb3BQYXJhbXMsXG4gICAgICAgICAgc2xpZGVUbzogYy5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPyBzbGlkZVRvMiA6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChzd2lwZXIuY29udHJvbGxlci5jb250cm9sIGluc3RhbmNlb2Ygc3dpcGVyLmNvbnN0cnVjdG9yICYmIHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wucGFyYW1zLmxvb3ApIHtcbiAgICAgIHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wubG9vcEZpeCh7XG4gICAgICAgIC4uLmxvb3BQYXJhbXMsXG4gICAgICAgIHNsaWRlVG86IHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID8gc2xpZGVUbzIgOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHN3aXBlci5lbWl0KFwibG9vcEZpeFwiKTtcbn1cbmZ1bmN0aW9uIGxvb3BEZXN0cm95KCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHNsaWRlc0VsXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghcGFyYW1zLmxvb3AgfHwgc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHJldHVybjtcbiAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICBjb25zdCBuZXdTbGlkZXNPcmRlciA9IFtdO1xuICBzd2lwZXIuc2xpZGVzLmZvckVhY2goKHNsaWRlRWwpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHR5cGVvZiBzbGlkZUVsLnN3aXBlclNsaWRlSW5kZXggPT09IFwidW5kZWZpbmVkXCIgPyBzbGlkZUVsLmdldEF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpICogMSA6IHNsaWRlRWwuc3dpcGVyU2xpZGVJbmRleDtcbiAgICBuZXdTbGlkZXNPcmRlcltpbmRleF0gPSBzbGlkZUVsO1xuICB9KTtcbiAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKChzbGlkZUVsKSA9PiB7XG4gICAgc2xpZGVFbC5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKTtcbiAgfSk7XG4gIG5ld1NsaWRlc09yZGVyLmZvckVhY2goKHNsaWRlRWwpID0+IHtcbiAgICBzbGlkZXNFbC5hcHBlbmQoc2xpZGVFbCk7XG4gIH0pO1xuICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gIHN3aXBlci5zbGlkZVRvKHN3aXBlci5yZWFsSW5kZXgsIDApO1xufVxuZnVuY3Rpb24gc2V0R3JhYkN1cnNvcihtb3ZpbmcpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKCFzd2lwZXIucGFyYW1zLnNpbXVsYXRlVG91Y2ggfHwgc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5pc0xvY2tlZCB8fCBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHJldHVybjtcbiAgY29uc3QgZWwgPSBzd2lwZXIucGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSBcImNvbnRhaW5lclwiID8gc3dpcGVyLmVsIDogc3dpcGVyLndyYXBwZXJFbDtcbiAgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IHRydWU7XG4gIH1cbiAgZWwuc3R5bGUuY3Vyc29yID0gXCJtb3ZlXCI7XG4gIGVsLnN0eWxlLmN1cnNvciA9IG1vdmluZyA/IFwiZ3JhYmJpbmdcIiA6IFwiZ3JhYlwiO1xuICBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG59XG5mdW5jdGlvbiB1bnNldEdyYWJDdXJzb3IoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkIHx8IHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gdHJ1ZTtcbiAgfVxuICBzd2lwZXJbc3dpcGVyLnBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gXCJjb250YWluZXJcIiA/IFwiZWxcIiA6IFwid3JhcHBlckVsXCJdLnN0eWxlLmN1cnNvciA9IFwiXCI7XG4gIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNsb3Nlc3RFbGVtZW50KHNlbGVjdG9yLCBiYXNlKSB7XG4gIGlmIChiYXNlID09PSB2b2lkIDApIHtcbiAgICBiYXNlID0gdGhpcztcbiAgfVxuICBmdW5jdGlvbiBfX2Nsb3Nlc3RGcm9tKGVsKSB7XG4gICAgaWYgKCFlbCB8fCBlbCA9PT0gZ2V0RG9jdW1lbnQoKSB8fCBlbCA9PT0gZ2V0V2luZG93KCkpIHJldHVybiBudWxsO1xuICAgIGlmIChlbC5hc3NpZ25lZFNsb3QpIGVsID0gZWwuYXNzaWduZWRTbG90O1xuICAgIGNvbnN0IGZvdW5kID0gZWwuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgaWYgKCFmb3VuZCAmJiAhZWwuZ2V0Um9vdE5vZGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQgfHwgX19jbG9zZXN0RnJvbShlbC5nZXRSb290Tm9kZSgpLmhvc3QpO1xuICB9XG4gIHJldHVybiBfX2Nsb3Nlc3RGcm9tKGJhc2UpO1xufVxuZnVuY3Rpb24gcHJldmVudEVkZ2VTd2lwZShzd2lwZXIsIGV2ZW50Miwgc3RhcnRYKSB7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgY29uc3Qge1xuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBjb25zdCBlZGdlU3dpcGVEZXRlY3Rpb24gPSBwYXJhbXMuZWRnZVN3aXBlRGV0ZWN0aW9uO1xuICBjb25zdCBlZGdlU3dpcGVUaHJlc2hvbGQgPSBwYXJhbXMuZWRnZVN3aXBlVGhyZXNob2xkO1xuICBpZiAoZWRnZVN3aXBlRGV0ZWN0aW9uICYmIChzdGFydFggPD0gZWRnZVN3aXBlVGhyZXNob2xkIHx8IHN0YXJ0WCA+PSB3aW5kb3cyLmlubmVyV2lkdGggLSBlZGdlU3dpcGVUaHJlc2hvbGQpKSB7XG4gICAgaWYgKGVkZ2VTd2lwZURldGVjdGlvbiA9PT0gXCJwcmV2ZW50XCIpIHtcbiAgICAgIGV2ZW50Mi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIG9uVG91Y2hTdGFydChldmVudDIpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgZG9jdW1lbnQyID0gZ2V0RG9jdW1lbnQoKTtcbiAgbGV0IGUgPSBldmVudDI7XG4gIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gIGNvbnN0IGRhdGEgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhO1xuICBpZiAoZS50eXBlID09PSBcInBvaW50ZXJkb3duXCIpIHtcbiAgICBpZiAoZGF0YS5wb2ludGVySWQgIT09IG51bGwgJiYgZGF0YS5wb2ludGVySWQgIT09IGUucG9pbnRlcklkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRhdGEucG9pbnRlcklkID0gZS5wb2ludGVySWQ7XG4gIH0gZWxzZSBpZiAoZS50eXBlID09PSBcInRvdWNoc3RhcnRcIiAmJiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgZGF0YS50b3VjaElkID0gZS50YXJnZXRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG4gIH1cbiAgaWYgKGUudHlwZSA9PT0gXCJ0b3VjaHN0YXJ0XCIpIHtcbiAgICBwcmV2ZW50RWRnZVN3aXBlKHN3aXBlciwgZSwgZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICB0b3VjaGVzLFxuICAgIGVuYWJsZWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkKSByZXR1cm47XG4gIGlmICghcGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgZS5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiKSByZXR1cm47XG4gIGlmIChzd2lwZXIuYW5pbWF0aW5nICYmIHBhcmFtcy5wcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFzd2lwZXIuYW5pbWF0aW5nICYmIHBhcmFtcy5jc3NNb2RlICYmIHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgfVxuICBsZXQgdGFyZ2V0RWwgPSBlLnRhcmdldDtcbiAgaWYgKHBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gXCJ3cmFwcGVyXCIpIHtcbiAgICBpZiAoIWVsZW1lbnRJc0NoaWxkT2YodGFyZ2V0RWwsIHN3aXBlci53cmFwcGVyRWwpKSByZXR1cm47XG4gIH1cbiAgaWYgKFwid2hpY2hcIiBpbiBlICYmIGUud2hpY2ggPT09IDMpIHJldHVybjtcbiAgaWYgKFwiYnV0dG9uXCIgaW4gZSAmJiBlLmJ1dHRvbiA+IDApIHJldHVybjtcbiAgaWYgKGRhdGEuaXNUb3VjaGVkICYmIGRhdGEuaXNNb3ZlZCkgcmV0dXJuO1xuICBjb25zdCBzd2lwaW5nQ2xhc3NIYXNWYWx1ZSA9ICEhcGFyYW1zLm5vU3dpcGluZ0NsYXNzICYmIHBhcmFtcy5ub1N3aXBpbmdDbGFzcyAhPT0gXCJcIjtcbiAgY29uc3QgZXZlbnRQYXRoID0gZS5jb21wb3NlZFBhdGggPyBlLmNvbXBvc2VkUGF0aCgpIDogZS5wYXRoO1xuICBpZiAoc3dpcGluZ0NsYXNzSGFzVmFsdWUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQuc2hhZG93Um9vdCAmJiBldmVudFBhdGgpIHtcbiAgICB0YXJnZXRFbCA9IGV2ZW50UGF0aFswXTtcbiAgfVxuICBjb25zdCBub1N3aXBpbmdTZWxlY3RvciA9IHBhcmFtcy5ub1N3aXBpbmdTZWxlY3RvciA/IHBhcmFtcy5ub1N3aXBpbmdTZWxlY3RvciA6IGAuJHtwYXJhbXMubm9Td2lwaW5nQ2xhc3N9YDtcbiAgY29uc3QgaXNUYXJnZXRTaGFkb3cgPSAhIShlLnRhcmdldCAmJiBlLnRhcmdldC5zaGFkb3dSb290KTtcbiAgaWYgKHBhcmFtcy5ub1N3aXBpbmcgJiYgKGlzVGFyZ2V0U2hhZG93ID8gY2xvc2VzdEVsZW1lbnQobm9Td2lwaW5nU2VsZWN0b3IsIHRhcmdldEVsKSA6IHRhcmdldEVsLmNsb3Nlc3Qobm9Td2lwaW5nU2VsZWN0b3IpKSkge1xuICAgIHN3aXBlci5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHBhcmFtcy5zd2lwZUhhbmRsZXIpIHtcbiAgICBpZiAoIXRhcmdldEVsLmNsb3Nlc3QocGFyYW1zLnN3aXBlSGFuZGxlcikpIHJldHVybjtcbiAgfVxuICB0b3VjaGVzLmN1cnJlbnRYID0gZS5wYWdlWDtcbiAgdG91Y2hlcy5jdXJyZW50WSA9IGUucGFnZVk7XG4gIGNvbnN0IHN0YXJ0WCA9IHRvdWNoZXMuY3VycmVudFg7XG4gIGNvbnN0IHN0YXJ0WSA9IHRvdWNoZXMuY3VycmVudFk7XG4gIGlmICghcHJldmVudEVkZ2VTd2lwZShzd2lwZXIsIGUsIHN0YXJ0WCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgT2JqZWN0LmFzc2lnbihkYXRhLCB7XG4gICAgaXNUb3VjaGVkOiB0cnVlLFxuICAgIGlzTW92ZWQ6IGZhbHNlLFxuICAgIGFsbG93VG91Y2hDYWxsYmFja3M6IHRydWUsXG4gICAgaXNTY3JvbGxpbmc6IHZvaWQgMCxcbiAgICBzdGFydE1vdmluZzogdm9pZCAwXG4gIH0pO1xuICB0b3VjaGVzLnN0YXJ0WCA9IHN0YXJ0WDtcbiAgdG91Y2hlcy5zdGFydFkgPSBzdGFydFk7XG4gIGRhdGEudG91Y2hTdGFydFRpbWUgPSBub3coKTtcbiAgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPSB2b2lkIDA7XG4gIGlmIChwYXJhbXMudGhyZXNob2xkID4gMCkgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgPSBmYWxzZTtcbiAgbGV0IHByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgaWYgKHRhcmdldEVsLm1hdGNoZXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykpIHtcbiAgICBwcmV2ZW50RGVmYXVsdCA9IGZhbHNlO1xuICAgIGlmICh0YXJnZXRFbC5ub2RlTmFtZSA9PT0gXCJTRUxFQ1RcIikge1xuICAgICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50Lm1hdGNoZXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykgJiYgZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQgIT09IHRhcmdldEVsICYmIChlLnBvaW50ZXJUeXBlID09PSBcIm1vdXNlXCIgfHwgZS5wb2ludGVyVHlwZSAhPT0gXCJtb3VzZVwiICYmICF0YXJnZXRFbC5tYXRjaGVzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpKSkge1xuICAgIGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuICBjb25zdCBzaG91bGRQcmV2ZW50RGVmYXVsdCA9IHByZXZlbnREZWZhdWx0ICYmIHN3aXBlci5hbGxvd1RvdWNoTW92ZSAmJiBwYXJhbXMudG91Y2hTdGFydFByZXZlbnREZWZhdWx0O1xuICBpZiAoKHBhcmFtcy50b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdCB8fCBzaG91bGRQcmV2ZW50RGVmYXVsdCkgJiYgIXRhcmdldEVsLmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGlmIChwYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgc3dpcGVyLmZyZWVNb2RlICYmIHN3aXBlci5hbmltYXRpbmcgJiYgIXBhcmFtcy5jc3NNb2RlKSB7XG4gICAgc3dpcGVyLmZyZWVNb2RlLm9uVG91Y2hTdGFydCgpO1xuICB9XG4gIHN3aXBlci5lbWl0KFwidG91Y2hTdGFydFwiLCBlKTtcbn1cbmZ1bmN0aW9uIG9uVG91Y2hNb3ZlKGV2ZW50Mikge1xuICBjb25zdCBkb2N1bWVudDIgPSBnZXREb2N1bWVudCgpO1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBkYXRhID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YTtcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICB0b3VjaGVzLFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIGVuYWJsZWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkKSByZXR1cm47XG4gIGlmICghcGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgZXZlbnQyLnBvaW50ZXJUeXBlID09PSBcIm1vdXNlXCIpIHJldHVybjtcbiAgbGV0IGUgPSBldmVudDI7XG4gIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gIGlmIChlLnR5cGUgPT09IFwicG9pbnRlcm1vdmVcIikge1xuICAgIGlmIChkYXRhLnRvdWNoSWQgIT09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCBpZCA9IGUucG9pbnRlcklkO1xuICAgIGlmIChpZCAhPT0gZGF0YS5wb2ludGVySWQpIHJldHVybjtcbiAgfVxuICBsZXQgdGFyZ2V0VG91Y2g7XG4gIGlmIChlLnR5cGUgPT09IFwidG91Y2htb3ZlXCIpIHtcbiAgICB0YXJnZXRUb3VjaCA9IFsuLi5lLmNoYW5nZWRUb3VjaGVzXS5maWx0ZXIoKHQpID0+IHQuaWRlbnRpZmllciA9PT0gZGF0YS50b3VjaElkKVswXTtcbiAgICBpZiAoIXRhcmdldFRvdWNoIHx8IHRhcmdldFRvdWNoLmlkZW50aWZpZXIgIT09IGRhdGEudG91Y2hJZCkgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldFRvdWNoID0gZTtcbiAgfVxuICBpZiAoIWRhdGEuaXNUb3VjaGVkKSB7XG4gICAgaWYgKGRhdGEuc3RhcnRNb3ZpbmcgJiYgZGF0YS5pc1Njcm9sbGluZykge1xuICAgICAgc3dpcGVyLmVtaXQoXCJ0b3VjaE1vdmVPcHBvc2l0ZVwiLCBlKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHBhZ2VYID0gdGFyZ2V0VG91Y2gucGFnZVg7XG4gIGNvbnN0IHBhZ2VZID0gdGFyZ2V0VG91Y2gucGFnZVk7XG4gIGlmIChlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyKSB7XG4gICAgdG91Y2hlcy5zdGFydFggPSBwYWdlWDtcbiAgICB0b3VjaGVzLnN0YXJ0WSA9IHBhZ2VZO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXN3aXBlci5hbGxvd1RvdWNoTW92ZSkge1xuICAgIGlmICghZS50YXJnZXQubWF0Y2hlcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSkge1xuICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGRhdGEuaXNUb3VjaGVkKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRvdWNoZXMsIHtcbiAgICAgICAgc3RhcnRYOiBwYWdlWCxcbiAgICAgICAgc3RhcnRZOiBwYWdlWSxcbiAgICAgICAgY3VycmVudFg6IHBhZ2VYLFxuICAgICAgICBjdXJyZW50WTogcGFnZVlcbiAgICAgIH0pO1xuICAgICAgZGF0YS50b3VjaFN0YXJ0VGltZSA9IG5vdygpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHBhcmFtcy50b3VjaFJlbGVhc2VPbkVkZ2VzICYmICFwYXJhbXMubG9vcCkge1xuICAgIGlmIChzd2lwZXIuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICBpZiAocGFnZVkgPCB0b3VjaGVzLnN0YXJ0WSAmJiBzd2lwZXIudHJhbnNsYXRlIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSB8fCBwYWdlWSA+IHRvdWNoZXMuc3RhcnRZICYmIHN3aXBlci50cmFuc2xhdGUgPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYWdlWCA8IHRvdWNoZXMuc3RhcnRYICYmIHN3aXBlci50cmFuc2xhdGUgPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIHx8IHBhZ2VYID4gdG91Y2hlcy5zdGFydFggJiYgc3dpcGVyLnRyYW5zbGF0ZSA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50Lm1hdGNoZXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykgJiYgZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQgIT09IGUudGFyZ2V0ICYmIGUucG9pbnRlclR5cGUgIT09IFwibW91c2VcIikge1xuICAgIGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuICBpZiAoZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQpIHtcbiAgICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50ICYmIGUudGFyZ2V0Lm1hdGNoZXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykpIHtcbiAgICAgIGRhdGEuaXNNb3ZlZCA9IHRydWU7XG4gICAgICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpZiAoZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzKSB7XG4gICAgc3dpcGVyLmVtaXQoXCJ0b3VjaE1vdmVcIiwgZSk7XG4gIH1cbiAgdG91Y2hlcy5wcmV2aW91c1ggPSB0b3VjaGVzLmN1cnJlbnRYO1xuICB0b3VjaGVzLnByZXZpb3VzWSA9IHRvdWNoZXMuY3VycmVudFk7XG4gIHRvdWNoZXMuY3VycmVudFggPSBwYWdlWDtcbiAgdG91Y2hlcy5jdXJyZW50WSA9IHBhZ2VZO1xuICBjb25zdCBkaWZmWCA9IHRvdWNoZXMuY3VycmVudFggLSB0b3VjaGVzLnN0YXJ0WDtcbiAgY29uc3QgZGlmZlkgPSB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5zdGFydFk7XG4gIGlmIChzd2lwZXIucGFyYW1zLnRocmVzaG9sZCAmJiBNYXRoLnNxcnQoZGlmZlggKiogMiArIGRpZmZZICoqIDIpIDwgc3dpcGVyLnBhcmFtcy50aHJlc2hvbGQpIHJldHVybjtcbiAgaWYgKHR5cGVvZiBkYXRhLmlzU2Nyb2xsaW5nID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbGV0IHRvdWNoQW5nbGU7XG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSAmJiB0b3VjaGVzLmN1cnJlbnRZID09PSB0b3VjaGVzLnN0YXJ0WSB8fCBzd2lwZXIuaXNWZXJ0aWNhbCgpICYmIHRvdWNoZXMuY3VycmVudFggPT09IHRvdWNoZXMuc3RhcnRYKSB7XG4gICAgICBkYXRhLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkaWZmWCAqIGRpZmZYICsgZGlmZlkgKiBkaWZmWSA+PSAyNSkge1xuICAgICAgICB0b3VjaEFuZ2xlID0gTWF0aC5hdGFuMihNYXRoLmFicyhkaWZmWSksIE1hdGguYWJzKGRpZmZYKSkgKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICBkYXRhLmlzU2Nyb2xsaW5nID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hBbmdsZSA+IHBhcmFtcy50b3VjaEFuZ2xlIDogOTAgLSB0b3VjaEFuZ2xlID4gcGFyYW1zLnRvdWNoQW5nbGU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChkYXRhLmlzU2Nyb2xsaW5nKSB7XG4gICAgc3dpcGVyLmVtaXQoXCJ0b3VjaE1vdmVPcHBvc2l0ZVwiLCBlKTtcbiAgfVxuICBpZiAodHlwZW9mIGRhdGEuc3RhcnRNb3ZpbmcgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAodG91Y2hlcy5jdXJyZW50WCAhPT0gdG91Y2hlcy5zdGFydFggfHwgdG91Y2hlcy5jdXJyZW50WSAhPT0gdG91Y2hlcy5zdGFydFkpIHtcbiAgICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAoZGF0YS5pc1Njcm9sbGluZyB8fCBlLnR5cGUgPT09IFwidG91Y2htb3ZlXCIgJiYgZGF0YS5wcmV2ZW50VG91Y2hNb3ZlRnJvbVBvaW50ZXJNb3ZlKSB7XG4gICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFkYXRhLnN0YXJ0TW92aW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gIGlmICghcGFyYW1zLmNzc01vZGUgJiYgZS5jYW5jZWxhYmxlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGlmIChwYXJhbXMudG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uICYmICFwYXJhbXMubmVzdGVkKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuICBsZXQgZGlmZiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IGRpZmZYIDogZGlmZlk7XG4gIGxldCB0b3VjaGVzRGlmZiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHRvdWNoZXMuY3VycmVudFggLSB0b3VjaGVzLnByZXZpb3VzWCA6IHRvdWNoZXMuY3VycmVudFkgLSB0b3VjaGVzLnByZXZpb3VzWTtcbiAgaWYgKHBhcmFtcy5vbmVXYXlNb3ZlbWVudCkge1xuICAgIGRpZmYgPSBNYXRoLmFicyhkaWZmKSAqIChydGwgPyAxIDogLTEpO1xuICAgIHRvdWNoZXNEaWZmID0gTWF0aC5hYnModG91Y2hlc0RpZmYpICogKHJ0bCA/IDEgOiAtMSk7XG4gIH1cbiAgdG91Y2hlcy5kaWZmID0gZGlmZjtcbiAgZGlmZiAqPSBwYXJhbXMudG91Y2hSYXRpbztcbiAgaWYgKHJ0bCkge1xuICAgIGRpZmYgPSAtZGlmZjtcbiAgICB0b3VjaGVzRGlmZiA9IC10b3VjaGVzRGlmZjtcbiAgfVxuICBjb25zdCBwcmV2VG91Y2hlc0RpcmVjdGlvbiA9IHN3aXBlci50b3VjaGVzRGlyZWN0aW9uO1xuICBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPSBkaWZmID4gMCA/IFwicHJldlwiIDogXCJuZXh0XCI7XG4gIHN3aXBlci50b3VjaGVzRGlyZWN0aW9uID0gdG91Y2hlc0RpZmYgPiAwID8gXCJwcmV2XCIgOiBcIm5leHRcIjtcbiAgY29uc3QgaXNMb29wID0gc3dpcGVyLnBhcmFtcy5sb29wICYmICFwYXJhbXMuY3NzTW9kZTtcbiAgY29uc3QgYWxsb3dMb29wRml4ID0gc3dpcGVyLnRvdWNoZXNEaXJlY3Rpb24gPT09IFwibmV4dFwiICYmIHN3aXBlci5hbGxvd1NsaWRlTmV4dCB8fCBzd2lwZXIudG91Y2hlc0RpcmVjdGlvbiA9PT0gXCJwcmV2XCIgJiYgc3dpcGVyLmFsbG93U2xpZGVQcmV2O1xuICBpZiAoIWRhdGEuaXNNb3ZlZCkge1xuICAgIGlmIChpc0xvb3AgJiYgYWxsb3dMb29wRml4KSB7XG4gICAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICAgIGRpcmVjdGlvbjogc3dpcGVyLnN3aXBlRGlyZWN0aW9uXG4gICAgICB9KTtcbiAgICB9XG4gICAgZGF0YS5zdGFydFRyYW5zbGF0ZSA9IHN3aXBlci5nZXRUcmFuc2xhdGUoKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICBpZiAoc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgY29uc3QgZXZ0ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChcInRyYW5zaXRpb25lbmRcIiwge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICBieVN3aXBlclRvdWNoTW92ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHN3aXBlci53cmFwcGVyRWwuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cbiAgICBkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UgPSBmYWxzZTtcbiAgICBpZiAocGFyYW1zLmdyYWJDdXJzb3IgJiYgKHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9PT0gdHJ1ZSB8fCBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPT09IHRydWUpKSB7XG4gICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcih0cnVlKTtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoXCJzbGlkZXJGaXJzdE1vdmVcIiwgZSk7XG4gIH1cbiAgbGV0IGxvb3BGaXhlZDtcbiAgKC8qIEBfX1BVUkVfXyAqLyBuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gIGlmIChkYXRhLmlzTW92ZWQgJiYgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgJiYgcHJldlRvdWNoZXNEaXJlY3Rpb24gIT09IHN3aXBlci50b3VjaGVzRGlyZWN0aW9uICYmIGlzTG9vcCAmJiBhbGxvd0xvb3BGaXggJiYgTWF0aC5hYnMoZGlmZikgPj0gMSkge1xuICAgIE9iamVjdC5hc3NpZ24odG91Y2hlcywge1xuICAgICAgc3RhcnRYOiBwYWdlWCxcbiAgICAgIHN0YXJ0WTogcGFnZVksXG4gICAgICBjdXJyZW50WDogcGFnZVgsXG4gICAgICBjdXJyZW50WTogcGFnZVksXG4gICAgICBzdGFydFRyYW5zbGF0ZTogZGF0YS5jdXJyZW50VHJhbnNsYXRlXG4gICAgfSk7XG4gICAgZGF0YS5sb29wU3dhcFJlc2V0ID0gdHJ1ZTtcbiAgICBkYXRhLnN0YXJ0VHJhbnNsYXRlID0gZGF0YS5jdXJyZW50VHJhbnNsYXRlO1xuICAgIHJldHVybjtcbiAgfVxuICBzd2lwZXIuZW1pdChcInNsaWRlck1vdmVcIiwgZSk7XG4gIGRhdGEuaXNNb3ZlZCA9IHRydWU7XG4gIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRpZmYgKyBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICBsZXQgZGlzYWJsZVBhcmVudFN3aXBlciA9IHRydWU7XG4gIGxldCByZXNpc3RhbmNlUmF0aW8gPSBwYXJhbXMucmVzaXN0YW5jZVJhdGlvO1xuICBpZiAocGFyYW1zLnRvdWNoUmVsZWFzZU9uRWRnZXMpIHtcbiAgICByZXNpc3RhbmNlUmF0aW8gPSAwO1xuICB9XG4gIGlmIChkaWZmID4gMCkge1xuICAgIGlmIChpc0xvb3AgJiYgYWxsb3dMb29wRml4ICYmICFsb29wRml4ZWQgJiYgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlID4gKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5taW5UcmFuc2xhdGUoKSAtIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbc3dpcGVyLmFjdGl2ZUluZGV4ICsgMV0gLSAocGFyYW1zLnNsaWRlc1BlclZpZXcgIT09IFwiYXV0b1wiICYmIHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPj0gMiA/IHN3aXBlci5zbGlkZXNTaXplc0dyaWRbc3dpcGVyLmFjdGl2ZUluZGV4ICsgMV0gKyBzd2lwZXIucGFyYW1zLnNwYWNlQmV0d2VlbiA6IDApIC0gc3dpcGVyLnBhcmFtcy5zcGFjZUJldHdlZW4gOiBzd2lwZXIubWluVHJhbnNsYXRlKCkpKSB7XG4gICAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICAgIGRpcmVjdGlvbjogXCJwcmV2XCIsXG4gICAgICAgIHNldFRyYW5zbGF0ZTogdHJ1ZSxcbiAgICAgICAgYWN0aXZlU2xpZGVJbmRleDogMFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPiBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgIGRpc2FibGVQYXJlbnRTd2lwZXIgPSBmYWxzZTtcbiAgICAgIGlmIChwYXJhbXMucmVzaXN0YW5jZSkge1xuICAgICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBzd2lwZXIubWluVHJhbnNsYXRlKCkgLSAxICsgKC1zd2lwZXIubWluVHJhbnNsYXRlKCkgKyBkYXRhLnN0YXJ0VHJhbnNsYXRlICsgZGlmZikgKiogcmVzaXN0YW5jZVJhdGlvO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChkaWZmIDwgMCkge1xuICAgIGlmIChpc0xvb3AgJiYgYWxsb3dMb29wRml4ICYmICFsb29wRml4ZWQgJiYgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlIDwgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5tYXhUcmFuc2xhdGUoKSArIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbc3dpcGVyLnNsaWRlc1NpemVzR3JpZC5sZW5ndGggLSAxXSArIHN3aXBlci5wYXJhbXMuc3BhY2VCZXR3ZWVuICsgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSBcImF1dG9cIiAmJiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIHBhcmFtcy5zbGlkZXNQZXJWaWV3ID49IDIgPyBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW3N3aXBlci5zbGlkZXNTaXplc0dyaWQubGVuZ3RoIC0gMV0gKyBzd2lwZXIucGFyYW1zLnNwYWNlQmV0d2VlbiA6IDApIDogc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSkge1xuICAgICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgICBkaXJlY3Rpb246IFwibmV4dFwiLFxuICAgICAgICBzZXRUcmFuc2xhdGU6IHRydWUsXG4gICAgICAgIGFjdGl2ZVNsaWRlSW5kZXg6IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIiA/IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpIDogTWF0aC5jZWlsKHBhcnNlRmxvYXQocGFyYW1zLnNsaWRlc1BlclZpZXcsIDEwKSkpXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGRhdGEuY3VycmVudFRyYW5zbGF0ZSA8IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IGZhbHNlO1xuICAgICAgaWYgKHBhcmFtcy5yZXNpc3RhbmNlKSB7XG4gICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSArIDEgLSAoc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gZGF0YS5zdGFydFRyYW5zbGF0ZSAtIGRpZmYpICoqIHJlc2lzdGFuY2VSYXRpbztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGRpc2FibGVQYXJlbnRTd2lwZXIpIHtcbiAgICBlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyID0gdHJ1ZTtcbiAgfVxuICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09IFwibmV4dFwiICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA8IGRhdGEuc3RhcnRUcmFuc2xhdGUpIHtcbiAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICB9XG4gIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gXCJwcmV2XCIgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlID4gZGF0YS5zdGFydFRyYW5zbGF0ZSkge1xuICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gIH1cbiAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgIXN3aXBlci5hbGxvd1NsaWRlTmV4dCkge1xuICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gIH1cbiAgaWYgKHBhcmFtcy50aHJlc2hvbGQgPiAwKSB7XG4gICAgaWYgKE1hdGguYWJzKGRpZmYpID4gcGFyYW1zLnRocmVzaG9sZCB8fCBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSkge1xuICAgICAgaWYgKCFkYXRhLmFsbG93VGhyZXNob2xkTW92ZSkge1xuICAgICAgICBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSA9IHRydWU7XG4gICAgICAgIHRvdWNoZXMuc3RhcnRYID0gdG91Y2hlcy5jdXJyZW50WDtcbiAgICAgICAgdG91Y2hlcy5zdGFydFkgPSB0b3VjaGVzLmN1cnJlbnRZO1xuICAgICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICAgICAgICB0b3VjaGVzLmRpZmYgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB0b3VjaGVzLmN1cnJlbnRYIC0gdG91Y2hlcy5zdGFydFggOiB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5zdGFydFk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKCFwYXJhbXMuZm9sbG93RmluZ2VyIHx8IHBhcmFtcy5jc3NNb2RlKSByZXR1cm47XG4gIGlmIChwYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgc3dpcGVyLmZyZWVNb2RlIHx8IHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSB7XG4gICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgfVxuICBpZiAocGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmIHN3aXBlci5mcmVlTW9kZSkge1xuICAgIHN3aXBlci5mcmVlTW9kZS5vblRvdWNoTW92ZSgpO1xuICB9XG4gIHN3aXBlci51cGRhdGVQcm9ncmVzcyhkYXRhLmN1cnJlbnRUcmFuc2xhdGUpO1xuICBzd2lwZXIuc2V0VHJhbnNsYXRlKGRhdGEuY3VycmVudFRyYW5zbGF0ZSk7XG59XG5mdW5jdGlvbiBvblRvdWNoRW5kKGV2ZW50Mikge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBkYXRhID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YTtcbiAgbGV0IGUgPSBldmVudDI7XG4gIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gIGxldCB0YXJnZXRUb3VjaDtcbiAgY29uc3QgaXNUb3VjaEV2ZW50ID0gZS50eXBlID09PSBcInRvdWNoZW5kXCIgfHwgZS50eXBlID09PSBcInRvdWNoY2FuY2VsXCI7XG4gIGlmICghaXNUb3VjaEV2ZW50KSB7XG4gICAgaWYgKGRhdGEudG91Y2hJZCAhPT0gbnVsbCkgcmV0dXJuO1xuICAgIGlmIChlLnBvaW50ZXJJZCAhPT0gZGF0YS5wb2ludGVySWQpIHJldHVybjtcbiAgICB0YXJnZXRUb3VjaCA9IGU7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0VG91Y2ggPSBbLi4uZS5jaGFuZ2VkVG91Y2hlc10uZmlsdGVyKCh0KSA9PiB0LmlkZW50aWZpZXIgPT09IGRhdGEudG91Y2hJZClbMF07XG4gICAgaWYgKCF0YXJnZXRUb3VjaCB8fCB0YXJnZXRUb3VjaC5pZGVudGlmaWVyICE9PSBkYXRhLnRvdWNoSWQpIHJldHVybjtcbiAgfVxuICBpZiAoW1wicG9pbnRlcmNhbmNlbFwiLCBcInBvaW50ZXJvdXRcIiwgXCJwb2ludGVybGVhdmVcIiwgXCJjb250ZXh0bWVudVwiXS5pbmNsdWRlcyhlLnR5cGUpKSB7XG4gICAgY29uc3QgcHJvY2VlZCA9IFtcInBvaW50ZXJjYW5jZWxcIiwgXCJjb250ZXh0bWVudVwiXS5pbmNsdWRlcyhlLnR5cGUpICYmIChzd2lwZXIuYnJvd3Nlci5pc1NhZmFyaSB8fCBzd2lwZXIuYnJvd3Nlci5pc1dlYlZpZXcpO1xuICAgIGlmICghcHJvY2VlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBkYXRhLnBvaW50ZXJJZCA9IG51bGw7XG4gIGRhdGEudG91Y2hJZCA9IG51bGw7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgdG91Y2hlcyxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICBzbGlkZXNHcmlkLFxuICAgIGVuYWJsZWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkKSByZXR1cm47XG4gIGlmICghcGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgZS5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiKSByZXR1cm47XG4gIGlmIChkYXRhLmFsbG93VG91Y2hDYWxsYmFja3MpIHtcbiAgICBzd2lwZXIuZW1pdChcInRvdWNoRW5kXCIsIGUpO1xuICB9XG4gIGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcyA9IGZhbHNlO1xuICBpZiAoIWRhdGEuaXNUb3VjaGVkKSB7XG4gICAgaWYgKGRhdGEuaXNNb3ZlZCAmJiBwYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoZmFsc2UpO1xuICAgIH1cbiAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICBkYXRhLnN0YXJ0TW92aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXJhbXMuZ3JhYkN1cnNvciAmJiBkYXRhLmlzTW92ZWQgJiYgZGF0YS5pc1RvdWNoZWQgJiYgKHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9PT0gdHJ1ZSB8fCBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPT09IHRydWUpKSB7XG4gICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoZmFsc2UpO1xuICB9XG4gIGNvbnN0IHRvdWNoRW5kVGltZSA9IG5vdygpO1xuICBjb25zdCB0aW1lRGlmZiA9IHRvdWNoRW5kVGltZSAtIGRhdGEudG91Y2hTdGFydFRpbWU7XG4gIGlmIChzd2lwZXIuYWxsb3dDbGljaykge1xuICAgIGNvbnN0IHBhdGhUcmVlID0gZS5wYXRoIHx8IGUuY29tcG9zZWRQYXRoICYmIGUuY29tcG9zZWRQYXRoKCk7XG4gICAgc3dpcGVyLnVwZGF0ZUNsaWNrZWRTbGlkZShwYXRoVHJlZSAmJiBwYXRoVHJlZVswXSB8fCBlLnRhcmdldCwgcGF0aFRyZWUpO1xuICAgIHN3aXBlci5lbWl0KFwidGFwIGNsaWNrXCIsIGUpO1xuICAgIGlmICh0aW1lRGlmZiA8IDMwMCAmJiB0b3VjaEVuZFRpbWUgLSBkYXRhLmxhc3RDbGlja1RpbWUgPCAzMDApIHtcbiAgICAgIHN3aXBlci5lbWl0KFwiZG91YmxlVGFwIGRvdWJsZUNsaWNrXCIsIGUpO1xuICAgIH1cbiAgfVxuICBkYXRhLmxhc3RDbGlja1RpbWUgPSBub3coKTtcbiAgbmV4dFRpY2soKCkgPT4ge1xuICAgIGlmICghc3dpcGVyLmRlc3Ryb3llZCkgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICB9KTtcbiAgaWYgKCFkYXRhLmlzVG91Y2hlZCB8fCAhZGF0YS5pc01vdmVkIHx8ICFzd2lwZXIuc3dpcGVEaXJlY3Rpb24gfHwgdG91Y2hlcy5kaWZmID09PSAwICYmICFkYXRhLmxvb3BTd2FwUmVzZXQgfHwgZGF0YS5jdXJyZW50VHJhbnNsYXRlID09PSBkYXRhLnN0YXJ0VHJhbnNsYXRlICYmICFkYXRhLmxvb3BTd2FwUmVzZXQpIHtcbiAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbiAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcbiAgbGV0IGN1cnJlbnRQb3M7XG4gIGlmIChwYXJhbXMuZm9sbG93RmluZ2VyKSB7XG4gICAgY3VycmVudFBvcyA9IHJ0bCA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50UG9zID0gLWRhdGEuY3VycmVudFRyYW5zbGF0ZTtcbiAgfVxuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCkge1xuICAgIHN3aXBlci5mcmVlTW9kZS5vblRvdWNoRW5kKHtcbiAgICAgIGN1cnJlbnRQb3NcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgc3dpcGVUb0xhc3QgPSBjdXJyZW50UG9zID49IC1zd2lwZXIubWF4VHJhbnNsYXRlKCkgJiYgIXN3aXBlci5wYXJhbXMubG9vcDtcbiAgbGV0IHN0b3BJbmRleCA9IDA7XG4gIGxldCBncm91cFNpemUgPSBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkWzBdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IGkgPCBwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwID8gMSA6IHBhcmFtcy5zbGlkZXNQZXJHcm91cCkge1xuICAgIGNvbnN0IGluY3JlbWVudDIgPSBpIDwgcGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCAtIDEgPyAxIDogcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgIGlmICh0eXBlb2Ygc2xpZGVzR3JpZFtpICsgaW5jcmVtZW50Ml0gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmIChzd2lwZVRvTGFzdCB8fCBjdXJyZW50UG9zID49IHNsaWRlc0dyaWRbaV0gJiYgY3VycmVudFBvcyA8IHNsaWRlc0dyaWRbaSArIGluY3JlbWVudDJdKSB7XG4gICAgICAgIHN0b3BJbmRleCA9IGk7XG4gICAgICAgIGdyb3VwU2l6ZSA9IHNsaWRlc0dyaWRbaSArIGluY3JlbWVudDJdIC0gc2xpZGVzR3JpZFtpXTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN3aXBlVG9MYXN0IHx8IGN1cnJlbnRQb3MgPj0gc2xpZGVzR3JpZFtpXSkge1xuICAgICAgc3RvcEluZGV4ID0gaTtcbiAgICAgIGdyb3VwU2l6ZSA9IHNsaWRlc0dyaWRbc2xpZGVzR3JpZC5sZW5ndGggLSAxXSAtIHNsaWRlc0dyaWRbc2xpZGVzR3JpZC5sZW5ndGggLSAyXTtcbiAgICB9XG4gIH1cbiAgbGV0IHJld2luZEZpcnN0SW5kZXggPSBudWxsO1xuICBsZXQgcmV3aW5kTGFzdEluZGV4ID0gbnVsbDtcbiAgaWYgKHBhcmFtcy5yZXdpbmQpIHtcbiAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nKSB7XG4gICAgICByZXdpbmRMYXN0SW5kZXggPSBwYXJhbXMudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkICYmIHN3aXBlci52aXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCAtIDEgOiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIGlmIChzd2lwZXIuaXNFbmQpIHtcbiAgICAgIHJld2luZEZpcnN0SW5kZXggPSAwO1xuICAgIH1cbiAgfVxuICBjb25zdCByYXRpbyA9IChjdXJyZW50UG9zIC0gc2xpZGVzR3JpZFtzdG9wSW5kZXhdKSAvIGdyb3VwU2l6ZTtcbiAgY29uc3QgaW5jcmVtZW50ID0gc3RvcEluZGV4IDwgcGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCAtIDEgPyAxIDogcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICBpZiAodGltZURpZmYgPiBwYXJhbXMubG9uZ1N3aXBlc01zKSB7XG4gICAgaWYgKCFwYXJhbXMubG9uZ1N3aXBlcykge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gXCJuZXh0XCIpIHtcbiAgICAgIGlmIChyYXRpbyA+PSBwYXJhbXMubG9uZ1N3aXBlc1JhdGlvKSBzd2lwZXIuc2xpZGVUbyhwYXJhbXMucmV3aW5kICYmIHN3aXBlci5pc0VuZCA/IHJld2luZEZpcnN0SW5kZXggOiBzdG9wSW5kZXggKyBpbmNyZW1lbnQpO1xuICAgICAgZWxzZSBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSBcInByZXZcIikge1xuICAgICAgaWYgKHJhdGlvID4gMSAtIHBhcmFtcy5sb25nU3dpcGVzUmF0aW8pIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4ICsgaW5jcmVtZW50KTtcbiAgICAgIH0gZWxzZSBpZiAocmV3aW5kTGFzdEluZGV4ICE9PSBudWxsICYmIHJhdGlvIDwgMCAmJiBNYXRoLmFicyhyYXRpbykgPiBwYXJhbXMubG9uZ1N3aXBlc1JhdGlvKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHJld2luZExhc3RJbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoIXBhcmFtcy5zaG9ydFN3aXBlcykge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaXNOYXZCdXR0b25UYXJnZXQgPSBzd2lwZXIubmF2aWdhdGlvbiAmJiAoZS50YXJnZXQgPT09IHN3aXBlci5uYXZpZ2F0aW9uLm5leHRFbCB8fCBlLnRhcmdldCA9PT0gc3dpcGVyLm5hdmlnYXRpb24ucHJldkVsKTtcbiAgICBpZiAoIWlzTmF2QnV0dG9uVGFyZ2V0KSB7XG4gICAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSBcIm5leHRcIikge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhyZXdpbmRGaXJzdEluZGV4ICE9PSBudWxsID8gcmV3aW5kRmlyc3RJbmRleCA6IHN0b3BJbmRleCArIGluY3JlbWVudCk7XG4gICAgICB9XG4gICAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSBcInByZXZcIikge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhyZXdpbmRMYXN0SW5kZXggIT09IG51bGwgPyByZXdpbmRMYXN0SW5kZXggOiBzdG9wSW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQgPT09IHN3aXBlci5uYXZpZ2F0aW9uLm5leHRFbCkge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4ICsgaW5jcmVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIG9uUmVzaXplKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIGVsXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChlbCAmJiBlbC5vZmZzZXRXaWR0aCA9PT0gMCkgcmV0dXJuO1xuICBpZiAocGFyYW1zLmJyZWFrcG9pbnRzKSB7XG4gICAgc3dpcGVyLnNldEJyZWFrcG9pbnQoKTtcbiAgfVxuICBjb25zdCB7XG4gICAgYWxsb3dTbGlkZU5leHQsXG4gICAgYWxsb3dTbGlkZVByZXYsXG4gICAgc25hcEdyaWRcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IHRydWU7XG4gIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IHRydWU7XG4gIHN3aXBlci51cGRhdGVTaXplKCk7XG4gIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgY29uc3QgaXNWaXJ0dWFsTG9vcCA9IGlzVmlydHVhbCAmJiBwYXJhbXMubG9vcDtcbiAgaWYgKChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIgfHwgcGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSAmJiBzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5pc0JlZ2lubmluZyAmJiAhc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiAhaXNWaXJ0dWFsTG9vcCkge1xuICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSwgMCwgZmFsc2UsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3AgJiYgIWlzVmlydHVhbCkge1xuICAgICAgc3dpcGVyLnNsaWRlVG9Mb29wKHN3aXBlci5yZWFsSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG4gIGlmIChzd2lwZXIuYXV0b3BsYXkgJiYgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgJiYgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkge1xuICAgIGNsZWFyVGltZW91dChzd2lwZXIuYXV0b3BsYXkucmVzaXplVGltZW91dCk7XG4gICAgc3dpcGVyLmF1dG9wbGF5LnJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkgJiYgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgJiYgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkge1xuICAgICAgICBzd2lwZXIuYXV0b3BsYXkucmVzdW1lKCk7XG4gICAgICB9XG4gICAgfSwgNTAwKTtcbiAgfVxuICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSBhbGxvd1NsaWRlUHJldjtcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gYWxsb3dTbGlkZU5leHQ7XG4gIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc25hcEdyaWQgIT09IHN3aXBlci5zbmFwR3JpZCkge1xuICAgIHN3aXBlci5jaGVja092ZXJmbG93KCk7XG4gIH1cbn1cbmZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoIXN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gIGlmICghc3dpcGVyLmFsbG93Q2xpY2spIHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5wcmV2ZW50Q2xpY2tzKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uICYmIHN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICB3cmFwcGVyRWwsXG4gICAgcnRsVHJhbnNsYXRlLFxuICAgIGVuYWJsZWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkKSByZXR1cm47XG4gIHN3aXBlci5wcmV2aW91c1RyYW5zbGF0ZSA9IHN3aXBlci50cmFuc2xhdGU7XG4gIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICBzd2lwZXIudHJhbnNsYXRlID0gLXdyYXBwZXJFbC5zY3JvbGxMZWZ0O1xuICB9IGVsc2Uge1xuICAgIHN3aXBlci50cmFuc2xhdGUgPSAtd3JhcHBlckVsLnNjcm9sbFRvcDtcbiAgfVxuICBpZiAoc3dpcGVyLnRyYW5zbGF0ZSA9PT0gMCkgc3dpcGVyLnRyYW5zbGF0ZSA9IDA7XG4gIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICBsZXQgbmV3UHJvZ3Jlc3M7XG4gIGNvbnN0IHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICBuZXdQcm9ncmVzcyA9IDA7XG4gIH0gZWxzZSB7XG4gICAgbmV3UHJvZ3Jlc3MgPSAoc3dpcGVyLnRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyB0cmFuc2xhdGVzRGlmZjtcbiAgfVxuICBpZiAobmV3UHJvZ3Jlc3MgIT09IHN3aXBlci5wcm9ncmVzcykge1xuICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhydGxUcmFuc2xhdGUgPyAtc3dpcGVyLnRyYW5zbGF0ZSA6IHN3aXBlci50cmFuc2xhdGUpO1xuICB9XG4gIHN3aXBlci5lbWl0KFwic2V0VHJhbnNsYXRlXCIsIHN3aXBlci50cmFuc2xhdGUsIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIG9uTG9hZChlKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIHByb2Nlc3NMYXp5UHJlbG9hZGVyKHN3aXBlciwgZS50YXJnZXQpO1xuICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlIHx8IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gXCJhdXRvXCIgJiYgIXN3aXBlci5wYXJhbXMuYXV0b0hlaWdodCkge1xuICAgIHJldHVybjtcbiAgfVxuICBzd2lwZXIudXBkYXRlKCk7XG59XG5mdW5jdGlvbiBvbkRvY3VtZW50VG91Y2hTdGFydCgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKHN3aXBlci5kb2N1bWVudFRvdWNoSGFuZGxlclByb2NlZWRlZCkgcmV0dXJuO1xuICBzd2lwZXIuZG9jdW1lbnRUb3VjaEhhbmRsZXJQcm9jZWVkZWQgPSB0cnVlO1xuICBpZiAoc3dpcGVyLnBhcmFtcy50b3VjaFJlbGVhc2VPbkVkZ2VzKSB7XG4gICAgc3dpcGVyLmVsLnN0eWxlLnRvdWNoQWN0aW9uID0gXCJhdXRvXCI7XG4gIH1cbn1cbmZ1bmN0aW9uIGF0dGFjaEV2ZW50cygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBzd2lwZXIub25Ub3VjaFN0YXJ0ID0gb25Ub3VjaFN0YXJ0LmJpbmQoc3dpcGVyKTtcbiAgc3dpcGVyLm9uVG91Y2hNb3ZlID0gb25Ub3VjaE1vdmUuYmluZChzd2lwZXIpO1xuICBzd2lwZXIub25Ub3VjaEVuZCA9IG9uVG91Y2hFbmQuYmluZChzd2lwZXIpO1xuICBzd2lwZXIub25Eb2N1bWVudFRvdWNoU3RhcnQgPSBvbkRvY3VtZW50VG91Y2hTdGFydC5iaW5kKHN3aXBlcik7XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIHN3aXBlci5vblNjcm9sbCA9IG9uU2Nyb2xsLmJpbmQoc3dpcGVyKTtcbiAgfVxuICBzd2lwZXIub25DbGljayA9IG9uQ2xpY2suYmluZChzd2lwZXIpO1xuICBzd2lwZXIub25Mb2FkID0gb25Mb2FkLmJpbmQoc3dpcGVyKTtcbiAgZXZlbnRzKHN3aXBlciwgXCJvblwiKTtcbn1cbmZ1bmN0aW9uIGRldGFjaEV2ZW50cygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgZXZlbnRzKHN3aXBlciwgXCJvZmZcIik7XG59XG5mdW5jdGlvbiBzZXRCcmVha3BvaW50KCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcmVhbEluZGV4LFxuICAgIGluaXRpYWxpemVkLFxuICAgIHBhcmFtcyxcbiAgICBlbFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBicmVha3BvaW50czIgPSBwYXJhbXMuYnJlYWtwb2ludHM7XG4gIGlmICghYnJlYWtwb2ludHMyIHx8IGJyZWFrcG9pbnRzMiAmJiBPYmplY3Qua2V5cyhicmVha3BvaW50czIpLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICBjb25zdCBicmVha3BvaW50ID0gc3dpcGVyLmdldEJyZWFrcG9pbnQoYnJlYWtwb2ludHMyLCBzd2lwZXIucGFyYW1zLmJyZWFrcG9pbnRzQmFzZSwgc3dpcGVyLmVsKTtcbiAgaWYgKCFicmVha3BvaW50IHx8IHN3aXBlci5jdXJyZW50QnJlYWtwb2ludCA9PT0gYnJlYWtwb2ludCkgcmV0dXJuO1xuICBjb25zdCBicmVha3BvaW50T25seVBhcmFtcyA9IGJyZWFrcG9pbnQgaW4gYnJlYWtwb2ludHMyID8gYnJlYWtwb2ludHMyW2JyZWFrcG9pbnRdIDogdm9pZCAwO1xuICBjb25zdCBicmVha3BvaW50UGFyYW1zID0gYnJlYWtwb2ludE9ubHlQYXJhbXMgfHwgc3dpcGVyLm9yaWdpbmFsUGFyYW1zO1xuICBjb25zdCB3YXNNdWx0aVJvdyA9IGlzR3JpZEVuYWJsZWQoc3dpcGVyLCBwYXJhbXMpO1xuICBjb25zdCBpc011bHRpUm93ID0gaXNHcmlkRW5hYmxlZChzd2lwZXIsIGJyZWFrcG9pbnRQYXJhbXMpO1xuICBjb25zdCB3YXNHcmFiQ3Vyc29yID0gc3dpcGVyLnBhcmFtcy5ncmFiQ3Vyc29yO1xuICBjb25zdCBpc0dyYWJDdXJzb3IgPSBicmVha3BvaW50UGFyYW1zLmdyYWJDdXJzb3I7XG4gIGNvbnN0IHdhc0VuYWJsZWQgPSBwYXJhbXMuZW5hYmxlZDtcbiAgaWYgKHdhc011bHRpUm93ICYmICFpc011bHRpUm93KSB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkYCwgYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9Z3JpZC1jb2x1bW5gKTtcbiAgICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbiAgfSBlbHNlIGlmICghd2FzTXVsdGlSb3cgJiYgaXNNdWx0aVJvdykge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9Z3JpZGApO1xuICAgIGlmIChicmVha3BvaW50UGFyYW1zLmdyaWQuZmlsbCAmJiBicmVha3BvaW50UGFyYW1zLmdyaWQuZmlsbCA9PT0gXCJjb2x1bW5cIiB8fCAhYnJlYWtwb2ludFBhcmFtcy5ncmlkLmZpbGwgJiYgcGFyYW1zLmdyaWQuZmlsbCA9PT0gXCJjb2x1bW5cIikge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkLWNvbHVtbmApO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbiAgfVxuICBpZiAod2FzR3JhYkN1cnNvciAmJiAhaXNHcmFiQ3Vyc29yKSB7XG4gICAgc3dpcGVyLnVuc2V0R3JhYkN1cnNvcigpO1xuICB9IGVsc2UgaWYgKCF3YXNHcmFiQ3Vyc29yICYmIGlzR3JhYkN1cnNvcikge1xuICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKCk7XG4gIH1cbiAgW1wibmF2aWdhdGlvblwiLCBcInBhZ2luYXRpb25cIiwgXCJzY3JvbGxiYXJcIl0uZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgIGlmICh0eXBlb2YgYnJlYWtwb2ludFBhcmFtc1twcm9wXSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIGNvbnN0IHdhc01vZHVsZUVuYWJsZWQgPSBwYXJhbXNbcHJvcF0gJiYgcGFyYW1zW3Byb3BdLmVuYWJsZWQ7XG4gICAgY29uc3QgaXNNb2R1bGVFbmFibGVkID0gYnJlYWtwb2ludFBhcmFtc1twcm9wXSAmJiBicmVha3BvaW50UGFyYW1zW3Byb3BdLmVuYWJsZWQ7XG4gICAgaWYgKHdhc01vZHVsZUVuYWJsZWQgJiYgIWlzTW9kdWxlRW5hYmxlZCkge1xuICAgICAgc3dpcGVyW3Byb3BdLmRpc2FibGUoKTtcbiAgICB9XG4gICAgaWYgKCF3YXNNb2R1bGVFbmFibGVkICYmIGlzTW9kdWxlRW5hYmxlZCkge1xuICAgICAgc3dpcGVyW3Byb3BdLmVuYWJsZSgpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGRpcmVjdGlvbkNoYW5nZWQgPSBicmVha3BvaW50UGFyYW1zLmRpcmVjdGlvbiAmJiBicmVha3BvaW50UGFyYW1zLmRpcmVjdGlvbiAhPT0gcGFyYW1zLmRpcmVjdGlvbjtcbiAgY29uc3QgbmVlZHNSZUxvb3AgPSBwYXJhbXMubG9vcCAmJiAoYnJlYWtwb2ludFBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSBwYXJhbXMuc2xpZGVzUGVyVmlldyB8fCBkaXJlY3Rpb25DaGFuZ2VkKTtcbiAgY29uc3Qgd2FzTG9vcCA9IHBhcmFtcy5sb29wO1xuICBpZiAoZGlyZWN0aW9uQ2hhbmdlZCAmJiBpbml0aWFsaXplZCkge1xuICAgIHN3aXBlci5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgfVxuICBleHRlbmQyKHN3aXBlci5wYXJhbXMsIGJyZWFrcG9pbnRQYXJhbXMpO1xuICBjb25zdCBpc0VuYWJsZWQyID0gc3dpcGVyLnBhcmFtcy5lbmFibGVkO1xuICBjb25zdCBoYXNMb29wID0gc3dpcGVyLnBhcmFtcy5sb29wO1xuICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgIGFsbG93VG91Y2hNb3ZlOiBzd2lwZXIucGFyYW1zLmFsbG93VG91Y2hNb3ZlLFxuICAgIGFsbG93U2xpZGVOZXh0OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVOZXh0LFxuICAgIGFsbG93U2xpZGVQcmV2OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVQcmV2XG4gIH0pO1xuICBpZiAod2FzRW5hYmxlZCAmJiAhaXNFbmFibGVkMikge1xuICAgIHN3aXBlci5kaXNhYmxlKCk7XG4gIH0gZWxzZSBpZiAoIXdhc0VuYWJsZWQgJiYgaXNFbmFibGVkMikge1xuICAgIHN3aXBlci5lbmFibGUoKTtcbiAgfVxuICBzd2lwZXIuY3VycmVudEJyZWFrcG9pbnQgPSBicmVha3BvaW50O1xuICBzd2lwZXIuZW1pdChcIl9iZWZvcmVCcmVha3BvaW50XCIsIGJyZWFrcG9pbnRQYXJhbXMpO1xuICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICBpZiAobmVlZHNSZUxvb3ApIHtcbiAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgICAgc3dpcGVyLmxvb3BDcmVhdGUocmVhbEluZGV4KTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICB9IGVsc2UgaWYgKCF3YXNMb29wICYmIGhhc0xvb3ApIHtcbiAgICAgIHN3aXBlci5sb29wQ3JlYXRlKHJlYWxJbmRleCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgfSBlbHNlIGlmICh3YXNMb29wICYmICFoYXNMb29wKSB7XG4gICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICB9XG4gIH1cbiAgc3dpcGVyLmVtaXQoXCJicmVha3BvaW50XCIsIGJyZWFrcG9pbnRQYXJhbXMpO1xufVxuZnVuY3Rpb24gZ2V0QnJlYWtwb2ludChicmVha3BvaW50czIsIGJhc2UsIGNvbnRhaW5lckVsKSB7XG4gIGlmIChiYXNlID09PSB2b2lkIDApIHtcbiAgICBiYXNlID0gXCJ3aW5kb3dcIjtcbiAgfVxuICBpZiAoIWJyZWFrcG9pbnRzMiB8fCBiYXNlID09PSBcImNvbnRhaW5lclwiICYmICFjb250YWluZXJFbCkgcmV0dXJuIHZvaWQgMDtcbiAgbGV0IGJyZWFrcG9pbnQgPSBmYWxzZTtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gYmFzZSA9PT0gXCJ3aW5kb3dcIiA/IHdpbmRvdzIuaW5uZXJIZWlnaHQgOiBjb250YWluZXJFbC5jbGllbnRIZWlnaHQ7XG4gIGNvbnN0IHBvaW50cyA9IE9iamVjdC5rZXlzKGJyZWFrcG9pbnRzMikubWFwKChwb2ludCkgPT4ge1xuICAgIGlmICh0eXBlb2YgcG9pbnQgPT09IFwic3RyaW5nXCIgJiYgcG9pbnQuaW5kZXhPZihcIkBcIikgPT09IDApIHtcbiAgICAgIGNvbnN0IG1pblJhdGlvID0gcGFyc2VGbG9hdChwb2ludC5zdWJzdHIoMSkpO1xuICAgICAgY29uc3QgdmFsdWUgPSBjdXJyZW50SGVpZ2h0ICogbWluUmF0aW87XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgcG9pbnRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogcG9pbnQsXG4gICAgICBwb2ludFxuICAgIH07XG4gIH0pO1xuICBwb2ludHMuc29ydCgoYSwgYikgPT4gcGFyc2VJbnQoYS52YWx1ZSwgMTApIC0gcGFyc2VJbnQoYi52YWx1ZSwgMTApKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCB7XG4gICAgICBwb2ludCxcbiAgICAgIHZhbHVlXG4gICAgfSA9IHBvaW50c1tpXTtcbiAgICBpZiAoYmFzZSA9PT0gXCJ3aW5kb3dcIikge1xuICAgICAgaWYgKHdpbmRvdzIubWF0Y2hNZWRpYShgKG1pbi13aWR0aDogJHt2YWx1ZX1weClgKS5tYXRjaGVzKSB7XG4gICAgICAgIGJyZWFrcG9pbnQgPSBwb2ludDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZhbHVlIDw9IGNvbnRhaW5lckVsLmNsaWVudFdpZHRoKSB7XG4gICAgICBicmVha3BvaW50ID0gcG9pbnQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBicmVha3BvaW50IHx8IFwibWF4XCI7XG59XG5mdW5jdGlvbiBwcmVwYXJlQ2xhc3NlcyhlbnRyaWVzLCBwcmVmaXgpIHtcbiAgY29uc3QgcmVzdWx0Q2xhc3NlcyA9IFtdO1xuICBlbnRyaWVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIE9iamVjdC5rZXlzKGl0ZW0pLmZvckVhY2goKGNsYXNzTmFtZXMpID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bY2xhc3NOYW1lc10pIHtcbiAgICAgICAgICByZXN1bHRDbGFzc2VzLnB1c2gocHJlZml4ICsgY2xhc3NOYW1lcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJlc3VsdENsYXNzZXMucHVzaChwcmVmaXggKyBpdGVtKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0Q2xhc3Nlcztcbn1cbmZ1bmN0aW9uIGFkZENsYXNzZXMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBjbGFzc05hbWVzLFxuICAgIHBhcmFtcyxcbiAgICBydGwsXG4gICAgZWwsXG4gICAgZGV2aWNlXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IHN1ZmZpeGVzID0gcHJlcGFyZUNsYXNzZXMoW1wiaW5pdGlhbGl6ZWRcIiwgcGFyYW1zLmRpcmVjdGlvbiwge1xuICAgIFwiZnJlZS1tb2RlXCI6IHN3aXBlci5wYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWRcbiAgfSwge1xuICAgIFwiYXV0b2hlaWdodFwiOiBwYXJhbXMuYXV0b0hlaWdodFxuICB9LCB7XG4gICAgXCJydGxcIjogcnRsXG4gIH0sIHtcbiAgICBcImdyaWRcIjogcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDFcbiAgfSwge1xuICAgIFwiZ3JpZC1jb2x1bW5cIjogcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDEgJiYgcGFyYW1zLmdyaWQuZmlsbCA9PT0gXCJjb2x1bW5cIlxuICB9LCB7XG4gICAgXCJhbmRyb2lkXCI6IGRldmljZS5hbmRyb2lkXG4gIH0sIHtcbiAgICBcImlvc1wiOiBkZXZpY2UuaW9zXG4gIH0sIHtcbiAgICBcImNzcy1tb2RlXCI6IHBhcmFtcy5jc3NNb2RlXG4gIH0sIHtcbiAgICBcImNlbnRlcmVkXCI6IHBhcmFtcy5jc3NNb2RlICYmIHBhcmFtcy5jZW50ZXJlZFNsaWRlc1xuICB9LCB7XG4gICAgXCJ3YXRjaC1wcm9ncmVzc1wiOiBwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzc1xuICB9XSwgcGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MpO1xuICBjbGFzc05hbWVzLnB1c2goLi4uc3VmZml4ZXMpO1xuICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZXMpO1xuICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzZXMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBlbCxcbiAgICBjbGFzc05hbWVzXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZWwgfHwgdHlwZW9mIGVsID09PSBcInN0cmluZ1wiKSByZXR1cm47XG4gIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3NOYW1lcyk7XG4gIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xufVxuZnVuY3Rpb24gY2hlY2tPdmVyZmxvdygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIGlzTG9ja2VkOiB3YXNMb2NrZWQsXG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IHtcbiAgICBzbGlkZXNPZmZzZXRCZWZvcmVcbiAgfSA9IHBhcmFtcztcbiAgaWYgKHNsaWRlc09mZnNldEJlZm9yZSkge1xuICAgIGNvbnN0IGxhc3RTbGlkZUluZGV4ID0gc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGxhc3RTbGlkZVJpZ2h0RWRnZSA9IHN3aXBlci5zbGlkZXNHcmlkW2xhc3RTbGlkZUluZGV4XSArIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbbGFzdFNsaWRlSW5kZXhdICsgc2xpZGVzT2Zmc2V0QmVmb3JlICogMjtcbiAgICBzd2lwZXIuaXNMb2NrZWQgPSBzd2lwZXIuc2l6ZSA+IGxhc3RTbGlkZVJpZ2h0RWRnZTtcbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuaXNMb2NrZWQgPSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoID09PSAxO1xuICB9XG4gIGlmIChwYXJhbXMuYWxsb3dTbGlkZU5leHQgPT09IHRydWUpIHtcbiAgICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSAhc3dpcGVyLmlzTG9ja2VkO1xuICB9XG4gIGlmIChwYXJhbXMuYWxsb3dTbGlkZVByZXYgPT09IHRydWUpIHtcbiAgICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSAhc3dpcGVyLmlzTG9ja2VkO1xuICB9XG4gIGlmICh3YXNMb2NrZWQgJiYgd2FzTG9ja2VkICE9PSBzd2lwZXIuaXNMb2NrZWQpIHtcbiAgICBzd2lwZXIuaXNFbmQgPSBmYWxzZTtcbiAgfVxuICBpZiAod2FzTG9ja2VkICE9PSBzd2lwZXIuaXNMb2NrZWQpIHtcbiAgICBzd2lwZXIuZW1pdChzd2lwZXIuaXNMb2NrZWQgPyBcImxvY2tcIiA6IFwidW5sb2NrXCIpO1xuICB9XG59XG5mdW5jdGlvbiBtb2R1bGVFeHRlbmRQYXJhbXMocGFyYW1zLCBhbGxNb2R1bGVzUGFyYW1zKSB7XG4gIHJldHVybiBmdW5jdGlvbiBleHRlbmRQYXJhbXMob2JqKSB7XG4gICAgaWYgKG9iaiA9PT0gdm9pZCAwKSB7XG4gICAgICBvYmogPSB7fTtcbiAgICB9XG4gICAgY29uc3QgbW9kdWxlUGFyYW1OYW1lID0gT2JqZWN0LmtleXMob2JqKVswXTtcbiAgICBjb25zdCBtb2R1bGVQYXJhbXMgPSBvYmpbbW9kdWxlUGFyYW1OYW1lXTtcbiAgICBpZiAodHlwZW9mIG1vZHVsZVBhcmFtcyAhPT0gXCJvYmplY3RcIiB8fCBtb2R1bGVQYXJhbXMgPT09IG51bGwpIHtcbiAgICAgIGV4dGVuZDIoYWxsTW9kdWxlc1BhcmFtcywgb2JqKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID09PSB0cnVlKSB7XG4gICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKG1vZHVsZVBhcmFtTmFtZSA9PT0gXCJuYXZpZ2F0aW9uXCIgJiYgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gJiYgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uZW5hYmxlZCAmJiAhcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0ucHJldkVsICYmICFwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5uZXh0RWwpIHtcbiAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmF1dG8gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoW1wicGFnaW5hdGlvblwiLCBcInNjcm9sbGJhclwiXS5pbmRleE9mKG1vZHVsZVBhcmFtTmFtZSkgPj0gMCAmJiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSAmJiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbmFibGVkICYmICFwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbCkge1xuICAgICAgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uYXV0byA9IHRydWU7XG4gICAgfVxuICAgIGlmICghKG1vZHVsZVBhcmFtTmFtZSBpbiBwYXJhbXMgJiYgXCJlbmFibGVkXCIgaW4gbW9kdWxlUGFyYW1zKSkge1xuICAgICAgZXh0ZW5kMihhbGxNb2R1bGVzUGFyYW1zLCBvYmopO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID09PSBcIm9iamVjdFwiICYmICEoXCJlbmFibGVkXCIgaW4gcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0pKSB7XG4gICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSkgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPSB7XG4gICAgICBlbmFibGVkOiBmYWxzZVxuICAgIH07XG4gICAgZXh0ZW5kMihhbGxNb2R1bGVzUGFyYW1zLCBvYmopO1xuICB9O1xufVxudmFyIHN1cHBvcnQsIGRldmljZUNhY2hlZCwgYnJvd3NlciwgZXZlbnRzRW1pdHRlciwgdG9nZ2xlU2xpZGVDbGFzc2VzJDEsIHRvZ2dsZVNsaWRlQ2xhc3NlcywgcHJvY2Vzc0xhenlQcmVsb2FkZXIsIHVubGF6eSwgcHJlbG9hZCwgdXBkYXRlLCB0cmFuc2xhdGUsIHRyYW5zaXRpb24sIHNsaWRlLCBsb29wLCBncmFiQ3Vyc29yLCBldmVudHMsIGV2ZW50cyQxLCBpc0dyaWRFbmFibGVkLCBicmVha3BvaW50cywgY2xhc3NlcywgY2hlY2tPdmVyZmxvdyQxLCBkZWZhdWx0cywgcHJvdG90eXBlcywgZXh0ZW5kZWREZWZhdWx0cywgU3dpcGVyO1xudmFyIGluaXRfc3dpcGVyX2NvcmUgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvc3dpcGVyLWNvcmUubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgICBldmVudHNFbWl0dGVyID0ge1xuICAgICAgb24oZXZlbnRzMiwgaGFuZGxlciwgcHJpb3JpdHkpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHNlbGY7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHByaW9yaXR5ID8gXCJ1bnNoaWZ0XCIgOiBcInB1c2hcIjtcbiAgICAgICAgZXZlbnRzMi5zcGxpdChcIiBcIikuZm9yRWFjaCgoZXZlbnQyKSA9PiB7XG4gICAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudDJdKSBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudDJdID0gW107XG4gICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnQyXVttZXRob2RdKGhhbmRsZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9LFxuICAgICAgb25jZShldmVudHMyLCBoYW5kbGVyLCBwcmlvcml0eSkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gc2VsZjtcbiAgICAgICAgZnVuY3Rpb24gb25jZUhhbmRsZXIoKSB7XG4gICAgICAgICAgc2VsZi5vZmYoZXZlbnRzMiwgb25jZUhhbmRsZXIpO1xuICAgICAgICAgIGlmIChvbmNlSGFuZGxlci5fX2VtaXR0ZXJQcm94eSkge1xuICAgICAgICAgICAgZGVsZXRlIG9uY2VIYW5kbGVyLl9fZW1pdHRlclByb3h5O1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGhhbmRsZXIuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgb25jZUhhbmRsZXIuX19lbWl0dGVyUHJveHkgPSBoYW5kbGVyO1xuICAgICAgICByZXR1cm4gc2VsZi5vbihldmVudHMyLCBvbmNlSGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgfSxcbiAgICAgIG9uQW55KGhhbmRsZXIsIHByaW9yaXR5KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBzZWxmO1xuICAgICAgICBjb25zdCBtZXRob2QgPSBwcmlvcml0eSA/IFwidW5zaGlmdFwiIDogXCJwdXNoXCI7XG4gICAgICAgIGlmIChzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5pbmRleE9mKGhhbmRsZXIpIDwgMCkge1xuICAgICAgICAgIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzW21ldGhvZF0oaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9LFxuICAgICAgb2ZmQW55KGhhbmRsZXIpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzQW55TGlzdGVuZXJzKSByZXR1cm4gc2VsZjtcbiAgICAgICAgY29uc3QgaW5kZXggPSBzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5pbmRleE9mKGhhbmRsZXIpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9LFxuICAgICAgb2ZmKGV2ZW50czIsIGhhbmRsZXIpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzKSByZXR1cm4gc2VsZjtcbiAgICAgICAgZXZlbnRzMi5zcGxpdChcIiBcIikuZm9yRWFjaCgoZXZlbnQyKSA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudDJdID0gW107XG4gICAgICAgICAgfSBlbHNlIGlmIChzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudDJdKSB7XG4gICAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudDJdLmZvckVhY2goKGV2ZW50SGFuZGxlciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50SGFuZGxlciA9PT0gaGFuZGxlciB8fCBldmVudEhhbmRsZXIuX19lbWl0dGVyUHJveHkgJiYgZXZlbnRIYW5kbGVyLl9fZW1pdHRlclByb3h5ID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnQyXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0sXG4gICAgICBlbWl0KCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMpIHJldHVybiBzZWxmO1xuICAgICAgICBsZXQgZXZlbnRzMjtcbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIGxldCBjb250ZXh0O1xuICAgICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSBcInN0cmluZ1wiIHx8IEFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgICAgICBldmVudHMyID0gYXJnc1swXTtcbiAgICAgICAgICBkYXRhID0gYXJncy5zbGljZSgxLCBhcmdzLmxlbmd0aCk7XG4gICAgICAgICAgY29udGV4dCA9IHNlbGY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXZlbnRzMiA9IGFyZ3NbMF0uZXZlbnRzO1xuICAgICAgICAgIGRhdGEgPSBhcmdzWzBdLmRhdGE7XG4gICAgICAgICAgY29udGV4dCA9IGFyZ3NbMF0uY29udGV4dCB8fCBzZWxmO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEudW5zaGlmdChjb250ZXh0KTtcbiAgICAgICAgY29uc3QgZXZlbnRzQXJyYXkgPSBBcnJheS5pc0FycmF5KGV2ZW50czIpID8gZXZlbnRzMiA6IGV2ZW50czIuc3BsaXQoXCIgXCIpO1xuICAgICAgICBldmVudHNBcnJheS5mb3JFYWNoKChldmVudDIpID0+IHtcbiAgICAgICAgICBpZiAoc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMgJiYgc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5mb3JFYWNoKChldmVudEhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyLmFwcGx5KGNvbnRleHQsIFtldmVudDIsIC4uLmRhdGFdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VsZi5ldmVudHNMaXN0ZW5lcnMgJiYgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnQyXSkge1xuICAgICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnQyXS5mb3JFYWNoKChldmVudEhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyLmFwcGx5KGNvbnRleHQsIGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG4gICAgfTtcbiAgICB0b2dnbGVTbGlkZUNsYXNzZXMkMSA9IChzbGlkZUVsLCBjb25kaXRpb24sIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgaWYgKGNvbmRpdGlvbiAmJiAhc2xpZGVFbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgICAgICBzbGlkZUVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoIWNvbmRpdGlvbiAmJiBzbGlkZUVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICAgIHNsaWRlRWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgdG9nZ2xlU2xpZGVDbGFzc2VzID0gKHNsaWRlRWwsIGNvbmRpdGlvbiwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICBpZiAoY29uZGl0aW9uICYmICFzbGlkZUVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICAgIHNsaWRlRWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgfSBlbHNlIGlmICghY29uZGl0aW9uICYmIHNsaWRlRWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgc2xpZGVFbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBwcm9jZXNzTGF6eVByZWxvYWRlciA9IChzd2lwZXIsIGltYWdlRWwpID0+IHtcbiAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5wYXJhbXMpIHJldHVybjtcbiAgICAgIGNvbnN0IHNsaWRlU2VsZWN0b3IgPSAoKSA9PiBzd2lwZXIuaXNFbGVtZW50ID8gYHN3aXBlci1zbGlkZWAgOiBgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWA7XG4gICAgICBjb25zdCBzbGlkZUVsID0gaW1hZ2VFbC5jbG9zZXN0KHNsaWRlU2VsZWN0b3IoKSk7XG4gICAgICBpZiAoc2xpZGVFbCkge1xuICAgICAgICBsZXQgbGF6eUVsID0gc2xpZGVFbC5xdWVyeVNlbGVjdG9yKGAuJHtzd2lwZXIucGFyYW1zLmxhenlQcmVsb2FkZXJDbGFzc31gKTtcbiAgICAgICAgaWYgKCFsYXp5RWwgJiYgc3dpcGVyLmlzRWxlbWVudCkge1xuICAgICAgICAgIGlmIChzbGlkZUVsLnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgIGxhenlFbCA9IHNsaWRlRWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKGAuJHtzd2lwZXIucGFyYW1zLmxhenlQcmVsb2FkZXJDbGFzc31gKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlRWwuc2hhZG93Um9vdCkge1xuICAgICAgICAgICAgICAgIGxhenlFbCA9IHNsaWRlRWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKGAuJHtzd2lwZXIucGFyYW1zLmxhenlQcmVsb2FkZXJDbGFzc31gKTtcbiAgICAgICAgICAgICAgICBpZiAobGF6eUVsKSBsYXp5RWwucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobGF6eUVsKSBsYXp5RWwucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB1bmxhenkgPSAoc3dpcGVyLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKCFzd2lwZXIuc2xpZGVzW2luZGV4XSkgcmV0dXJuO1xuICAgICAgY29uc3QgaW1hZ2VFbCA9IHN3aXBlci5zbGlkZXNbaW5kZXhdLnF1ZXJ5U2VsZWN0b3IoJ1tsb2FkaW5nPVwibGF6eVwiXScpO1xuICAgICAgaWYgKGltYWdlRWwpIGltYWdlRWwucmVtb3ZlQXR0cmlidXRlKFwibG9hZGluZ1wiKTtcbiAgICB9O1xuICAgIHByZWxvYWQgPSAoc3dpcGVyKSA9PiB7XG4gICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIucGFyYW1zKSByZXR1cm47XG4gICAgICBsZXQgYW1vdW50ID0gc3dpcGVyLnBhcmFtcy5sYXp5UHJlbG9hZFByZXZOZXh0O1xuICAgICAgY29uc3QgbGVuID0gc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG4gICAgICBpZiAoIWxlbiB8fCAhYW1vdW50IHx8IGFtb3VudCA8IDApIHJldHVybjtcbiAgICAgIGFtb3VudCA9IE1hdGgubWluKGFtb3VudCwgbGVuKTtcbiAgICAgIGNvbnN0IHNsaWRlc1BlclZpZXcgPSBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiID8gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCkgOiBNYXRoLmNlaWwoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3KTtcbiAgICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZ3JpZCAmJiBzd2lwZXIucGFyYW1zLmdyaWQucm93cyA+IDEpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlQ29sdW1uID0gYWN0aXZlSW5kZXg7XG4gICAgICAgIGNvbnN0IHByZWxvYWRDb2x1bW5zID0gW2FjdGl2ZUNvbHVtbiAtIGFtb3VudF07XG4gICAgICAgIHByZWxvYWRDb2x1bW5zLnB1c2goLi4uQXJyYXkuZnJvbSh7XG4gICAgICAgICAgbGVuZ3RoOiBhbW91bnRcbiAgICAgICAgfSkubWFwKChfLCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGFjdGl2ZUNvbHVtbiArIHNsaWRlc1BlclZpZXcgKyBpO1xuICAgICAgICB9KSk7XG4gICAgICAgIHN3aXBlci5zbGlkZXMuZm9yRWFjaCgoc2xpZGVFbCwgaSkgPT4ge1xuICAgICAgICAgIGlmIChwcmVsb2FkQ29sdW1ucy5pbmNsdWRlcyhzbGlkZUVsLmNvbHVtbikpIHVubGF6eShzd2lwZXIsIGkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2xpZGVJbmRleExhc3RJblZpZXcgPSBhY3RpdmVJbmRleCArIHNsaWRlc1BlclZpZXcgLSAxO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMucmV3aW5kIHx8IHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggLSBhbW91bnQ7IGkgPD0gc2xpZGVJbmRleExhc3RJblZpZXcgKyBhbW91bnQ7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IHJlYWxJbmRleCA9IChpICUgbGVuICsgbGVuKSAlIGxlbjtcbiAgICAgICAgICBpZiAocmVhbEluZGV4IDwgYWN0aXZlSW5kZXggfHwgcmVhbEluZGV4ID4gc2xpZGVJbmRleExhc3RJblZpZXcpIHVubGF6eShzd2lwZXIsIHJlYWxJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBNYXRoLm1heChhY3RpdmVJbmRleCAtIGFtb3VudCwgMCk7IGkgPD0gTWF0aC5taW4oc2xpZGVJbmRleExhc3RJblZpZXcgKyBhbW91bnQsIGxlbiAtIDEpOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoaSAhPT0gYWN0aXZlSW5kZXggJiYgKGkgPiBzbGlkZUluZGV4TGFzdEluVmlldyB8fCBpIDwgYWN0aXZlSW5kZXgpKSB7XG4gICAgICAgICAgICB1bmxhenkoc3dpcGVyLCBpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHVwZGF0ZSA9IHtcbiAgICAgIHVwZGF0ZVNpemUsXG4gICAgICB1cGRhdGVTbGlkZXMsXG4gICAgICB1cGRhdGVBdXRvSGVpZ2h0LFxuICAgICAgdXBkYXRlU2xpZGVzT2Zmc2V0LFxuICAgICAgdXBkYXRlU2xpZGVzUHJvZ3Jlc3MsXG4gICAgICB1cGRhdGVQcm9ncmVzcyxcbiAgICAgIHVwZGF0ZVNsaWRlc0NsYXNzZXMsXG4gICAgICB1cGRhdGVBY3RpdmVJbmRleCxcbiAgICAgIHVwZGF0ZUNsaWNrZWRTbGlkZVxuICAgIH07XG4gICAgdHJhbnNsYXRlID0ge1xuICAgICAgZ2V0VHJhbnNsYXRlOiBnZXRTd2lwZXJUcmFuc2xhdGUsXG4gICAgICBzZXRUcmFuc2xhdGUsXG4gICAgICBtaW5UcmFuc2xhdGUsXG4gICAgICBtYXhUcmFuc2xhdGUsXG4gICAgICB0cmFuc2xhdGVUb1xuICAgIH07XG4gICAgdHJhbnNpdGlvbiA9IHtcbiAgICAgIHNldFRyYW5zaXRpb24sXG4gICAgICB0cmFuc2l0aW9uU3RhcnQsXG4gICAgICB0cmFuc2l0aW9uRW5kXG4gICAgfTtcbiAgICBzbGlkZSA9IHtcbiAgICAgIHNsaWRlVG8sXG4gICAgICBzbGlkZVRvTG9vcCxcbiAgICAgIHNsaWRlTmV4dCxcbiAgICAgIHNsaWRlUHJldixcbiAgICAgIHNsaWRlUmVzZXQsXG4gICAgICBzbGlkZVRvQ2xvc2VzdCxcbiAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGVcbiAgICB9O1xuICAgIGxvb3AgPSB7XG4gICAgICBsb29wQ3JlYXRlLFxuICAgICAgbG9vcEZpeCxcbiAgICAgIGxvb3BEZXN0cm95XG4gICAgfTtcbiAgICBncmFiQ3Vyc29yID0ge1xuICAgICAgc2V0R3JhYkN1cnNvcixcbiAgICAgIHVuc2V0R3JhYkN1cnNvclxuICAgIH07XG4gICAgZXZlbnRzID0gKHN3aXBlciwgbWV0aG9kKSA9PiB7XG4gICAgICBjb25zdCBkb2N1bWVudDIgPSBnZXREb2N1bWVudCgpO1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIGVsLFxuICAgICAgICB3cmFwcGVyRWwsXG4gICAgICAgIGRldmljZVxuICAgICAgfSA9IHN3aXBlcjtcbiAgICAgIGNvbnN0IGNhcHR1cmUgPSAhIXBhcmFtcy5uZXN0ZWQ7XG4gICAgICBjb25zdCBkb21NZXRob2QgPSBtZXRob2QgPT09IFwib25cIiA/IFwiYWRkRXZlbnRMaXN0ZW5lclwiIDogXCJyZW1vdmVFdmVudExpc3RlbmVyXCI7XG4gICAgICBjb25zdCBzd2lwZXJNZXRob2QgPSBtZXRob2Q7XG4gICAgICBpZiAoIWVsIHx8IHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikgcmV0dXJuO1xuICAgICAgZG9jdW1lbnQyW2RvbU1ldGhvZF0oXCJ0b3VjaHN0YXJ0XCIsIHN3aXBlci5vbkRvY3VtZW50VG91Y2hTdGFydCwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgICAgY2FwdHVyZVxuICAgICAgfSk7XG4gICAgICBlbFtkb21NZXRob2RdKFwidG91Y2hzdGFydFwiLCBzd2lwZXIub25Ub3VjaFN0YXJ0LCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIGVsW2RvbU1ldGhvZF0oXCJwb2ludGVyZG93blwiLCBzd2lwZXIub25Ub3VjaFN0YXJ0LCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50Mltkb21NZXRob2RdKFwidG91Y2htb3ZlXCIsIHN3aXBlci5vblRvdWNoTW92ZSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgICAgY2FwdHVyZVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudDJbZG9tTWV0aG9kXShcInBvaW50ZXJtb3ZlXCIsIHN3aXBlci5vblRvdWNoTW92ZSwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgICAgY2FwdHVyZVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudDJbZG9tTWV0aG9kXShcInRvdWNoZW5kXCIsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgICAgIHBhc3NpdmU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQyW2RvbU1ldGhvZF0oXCJwb2ludGVydXBcIiwgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudDJbZG9tTWV0aG9kXShcInBvaW50ZXJjYW5jZWxcIiwgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudDJbZG9tTWV0aG9kXShcInRvdWNoY2FuY2VsXCIsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgICAgIHBhc3NpdmU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQyW2RvbU1ldGhvZF0oXCJwb2ludGVyb3V0XCIsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgICAgIHBhc3NpdmU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQyW2RvbU1ldGhvZF0oXCJwb2ludGVybGVhdmVcIiwgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudDJbZG9tTWV0aG9kXShcImNvbnRleHRtZW51XCIsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgICAgIHBhc3NpdmU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgaWYgKHBhcmFtcy5wcmV2ZW50Q2xpY2tzIHx8IHBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24pIHtcbiAgICAgICAgZWxbZG9tTWV0aG9kXShcImNsaWNrXCIsIHN3aXBlci5vbkNsaWNrLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICB3cmFwcGVyRWxbZG9tTWV0aG9kXShcInNjcm9sbFwiLCBzd2lwZXIub25TY3JvbGwpO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy51cGRhdGVPbldpbmRvd1Jlc2l6ZSkge1xuICAgICAgICBzd2lwZXJbc3dpcGVyTWV0aG9kXShkZXZpY2UuaW9zIHx8IGRldmljZS5hbmRyb2lkID8gXCJyZXNpemUgb3JpZW50YXRpb25jaGFuZ2Ugb2JzZXJ2ZXJVcGRhdGVcIiA6IFwicmVzaXplIG9ic2VydmVyVXBkYXRlXCIsIG9uUmVzaXplLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlcltzd2lwZXJNZXRob2RdKFwib2JzZXJ2ZXJVcGRhdGVcIiwgb25SZXNpemUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxbZG9tTWV0aG9kXShcImxvYWRcIiwgc3dpcGVyLm9uTG9hZCwge1xuICAgICAgICBjYXB0dXJlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGV2ZW50cyQxID0ge1xuICAgICAgYXR0YWNoRXZlbnRzLFxuICAgICAgZGV0YWNoRXZlbnRzXG4gICAgfTtcbiAgICBpc0dyaWRFbmFibGVkID0gKHN3aXBlciwgcGFyYW1zKSA9PiB7XG4gICAgICByZXR1cm4gc3dpcGVyLmdyaWQgJiYgcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDE7XG4gICAgfTtcbiAgICBicmVha3BvaW50cyA9IHtcbiAgICAgIHNldEJyZWFrcG9pbnQsXG4gICAgICBnZXRCcmVha3BvaW50XG4gICAgfTtcbiAgICBjbGFzc2VzID0ge1xuICAgICAgYWRkQ2xhc3NlcyxcbiAgICAgIHJlbW92ZUNsYXNzZXNcbiAgICB9O1xuICAgIGNoZWNrT3ZlcmZsb3ckMSA9IHtcbiAgICAgIGNoZWNrT3ZlcmZsb3dcbiAgICB9O1xuICAgIGRlZmF1bHRzID0ge1xuICAgICAgaW5pdDogdHJ1ZSxcbiAgICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICBvbmVXYXlNb3ZlbWVudDogZmFsc2UsXG4gICAgICBzd2lwZXJFbGVtZW50Tm9kZU5hbWU6IFwiU1dJUEVSLUNPTlRBSU5FUlwiLFxuICAgICAgdG91Y2hFdmVudHNUYXJnZXQ6IFwid3JhcHBlclwiLFxuICAgICAgaW5pdGlhbFNsaWRlOiAwLFxuICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgIGNzc01vZGU6IGZhbHNlLFxuICAgICAgdXBkYXRlT25XaW5kb3dSZXNpemU6IHRydWUsXG4gICAgICByZXNpemVPYnNlcnZlcjogdHJ1ZSxcbiAgICAgIG5lc3RlZDogZmFsc2UsXG4gICAgICBjcmVhdGVFbGVtZW50czogZmFsc2UsXG4gICAgICBldmVudHNQcmVmaXg6IFwic3dpcGVyXCIsXG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgZm9jdXNhYmxlRWxlbWVudHM6IFwiaW5wdXQsIHNlbGVjdCwgb3B0aW9uLCB0ZXh0YXJlYSwgYnV0dG9uLCB2aWRlbywgbGFiZWxcIixcbiAgICAgIC8vIE92ZXJyaWRlc1xuICAgICAgd2lkdGg6IG51bGwsXG4gICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICAvL1xuICAgICAgcHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uOiBmYWxzZSxcbiAgICAgIC8vIHNzclxuICAgICAgdXNlckFnZW50OiBudWxsLFxuICAgICAgdXJsOiBudWxsLFxuICAgICAgLy8gVG8gc3VwcG9ydCBpT1MncyBzd2lwZS10by1nby1iYWNrIGdlc3R1cmUgKHdoZW4gYmVpbmcgdXNlZCBpbi1hcHApLlxuICAgICAgZWRnZVN3aXBlRGV0ZWN0aW9uOiBmYWxzZSxcbiAgICAgIGVkZ2VTd2lwZVRocmVzaG9sZDogMjAsXG4gICAgICAvLyBBdXRvaGVpZ2h0XG4gICAgICBhdXRvSGVpZ2h0OiBmYWxzZSxcbiAgICAgIC8vIFNldCB3cmFwcGVyIHdpZHRoXG4gICAgICBzZXRXcmFwcGVyU2l6ZTogZmFsc2UsXG4gICAgICAvLyBWaXJ0dWFsIFRyYW5zbGF0ZVxuICAgICAgdmlydHVhbFRyYW5zbGF0ZTogZmFsc2UsXG4gICAgICAvLyBFZmZlY3RzXG4gICAgICBlZmZlY3Q6IFwic2xpZGVcIixcbiAgICAgIC8vICdzbGlkZScgb3IgJ2ZhZGUnIG9yICdjdWJlJyBvciAnY292ZXJmbG93JyBvciAnZmxpcCdcbiAgICAgIC8vIEJyZWFrcG9pbnRzXG4gICAgICBicmVha3BvaW50czogdm9pZCAwLFxuICAgICAgYnJlYWtwb2ludHNCYXNlOiBcIndpbmRvd1wiLFxuICAgICAgLy8gU2xpZGVzIGdyaWRcbiAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgIHNsaWRlc1Blckdyb3VwU2tpcDogMCxcbiAgICAgIHNsaWRlc1Blckdyb3VwQXV0bzogZmFsc2UsXG4gICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICBjZW50ZXJlZFNsaWRlc0JvdW5kczogZmFsc2UsXG4gICAgICBzbGlkZXNPZmZzZXRCZWZvcmU6IDAsXG4gICAgICAvLyBpbiBweFxuICAgICAgc2xpZGVzT2Zmc2V0QWZ0ZXI6IDAsXG4gICAgICAvLyBpbiBweFxuICAgICAgbm9ybWFsaXplU2xpZGVJbmRleDogdHJ1ZSxcbiAgICAgIGNlbnRlckluc3VmZmljaWVudFNsaWRlczogZmFsc2UsXG4gICAgICAvLyBEaXNhYmxlIHN3aXBlciBhbmQgaGlkZSBuYXZpZ2F0aW9uIHdoZW4gY29udGFpbmVyIG5vdCBvdmVyZmxvd1xuICAgICAgd2F0Y2hPdmVyZmxvdzogdHJ1ZSxcbiAgICAgIC8vIFJvdW5kIGxlbmd0aFxuICAgICAgcm91bmRMZW5ndGhzOiBmYWxzZSxcbiAgICAgIC8vIFRvdWNoZXNcbiAgICAgIHRvdWNoUmF0aW86IDEsXG4gICAgICB0b3VjaEFuZ2xlOiA0NSxcbiAgICAgIHNpbXVsYXRlVG91Y2g6IHRydWUsXG4gICAgICBzaG9ydFN3aXBlczogdHJ1ZSxcbiAgICAgIGxvbmdTd2lwZXM6IHRydWUsXG4gICAgICBsb25nU3dpcGVzUmF0aW86IDAuNSxcbiAgICAgIGxvbmdTd2lwZXNNczogMzAwLFxuICAgICAgZm9sbG93RmluZ2VyOiB0cnVlLFxuICAgICAgYWxsb3dUb3VjaE1vdmU6IHRydWUsXG4gICAgICB0aHJlc2hvbGQ6IDUsXG4gICAgICB0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb246IGZhbHNlLFxuICAgICAgdG91Y2hTdGFydFByZXZlbnREZWZhdWx0OiB0cnVlLFxuICAgICAgdG91Y2hTdGFydEZvcmNlUHJldmVudERlZmF1bHQ6IGZhbHNlLFxuICAgICAgdG91Y2hSZWxlYXNlT25FZGdlczogZmFsc2UsXG4gICAgICAvLyBVbmlxdWUgTmF2aWdhdGlvbiBFbGVtZW50c1xuICAgICAgdW5pcXVlTmF2RWxlbWVudHM6IHRydWUsXG4gICAgICAvLyBSZXNpc3RhbmNlXG4gICAgICByZXNpc3RhbmNlOiB0cnVlLFxuICAgICAgcmVzaXN0YW5jZVJhdGlvOiAwLjg1LFxuICAgICAgLy8gUHJvZ3Jlc3NcbiAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IGZhbHNlLFxuICAgICAgLy8gQ3Vyc29yXG4gICAgICBncmFiQ3Vyc29yOiBmYWxzZSxcbiAgICAgIC8vIENsaWNrc1xuICAgICAgcHJldmVudENsaWNrczogdHJ1ZSxcbiAgICAgIHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IGZhbHNlLFxuICAgICAgLy8gbG9vcFxuICAgICAgbG9vcDogZmFsc2UsXG4gICAgICBsb29wQWRkQmxhbmtTbGlkZXM6IHRydWUsXG4gICAgICBsb29wQWRkaXRpb25hbFNsaWRlczogMCxcbiAgICAgIGxvb3BQcmV2ZW50c1NsaWRpbmc6IHRydWUsXG4gICAgICAvLyByZXdpbmRcbiAgICAgIHJld2luZDogZmFsc2UsXG4gICAgICAvLyBTd2lwaW5nL25vIHN3aXBpbmdcbiAgICAgIGFsbG93U2xpZGVQcmV2OiB0cnVlLFxuICAgICAgYWxsb3dTbGlkZU5leHQ6IHRydWUsXG4gICAgICBzd2lwZUhhbmRsZXI6IG51bGwsXG4gICAgICAvLyAnLnN3aXBlLWhhbmRsZXInLFxuICAgICAgbm9Td2lwaW5nOiB0cnVlLFxuICAgICAgbm9Td2lwaW5nQ2xhc3M6IFwic3dpcGVyLW5vLXN3aXBpbmdcIixcbiAgICAgIG5vU3dpcGluZ1NlbGVjdG9yOiBudWxsLFxuICAgICAgLy8gUGFzc2l2ZSBMaXN0ZW5lcnNcbiAgICAgIHBhc3NpdmVMaXN0ZW5lcnM6IHRydWUsXG4gICAgICBtYXhCYWNrZmFjZUhpZGRlblNsaWRlczogMTAsXG4gICAgICAvLyBOU1xuICAgICAgY29udGFpbmVyTW9kaWZpZXJDbGFzczogXCJzd2lwZXItXCIsXG4gICAgICAvLyBORVdcbiAgICAgIHNsaWRlQ2xhc3M6IFwic3dpcGVyLXNsaWRlXCIsXG4gICAgICBzbGlkZUJsYW5rQ2xhc3M6IFwic3dpcGVyLXNsaWRlLWJsYW5rXCIsXG4gICAgICBzbGlkZUFjdGl2ZUNsYXNzOiBcInN3aXBlci1zbGlkZS1hY3RpdmVcIixcbiAgICAgIHNsaWRlVmlzaWJsZUNsYXNzOiBcInN3aXBlci1zbGlkZS12aXNpYmxlXCIsXG4gICAgICBzbGlkZUZ1bGx5VmlzaWJsZUNsYXNzOiBcInN3aXBlci1zbGlkZS1mdWxseS12aXNpYmxlXCIsXG4gICAgICBzbGlkZU5leHRDbGFzczogXCJzd2lwZXItc2xpZGUtbmV4dFwiLFxuICAgICAgc2xpZGVQcmV2Q2xhc3M6IFwic3dpcGVyLXNsaWRlLXByZXZcIixcbiAgICAgIHdyYXBwZXJDbGFzczogXCJzd2lwZXItd3JhcHBlclwiLFxuICAgICAgbGF6eVByZWxvYWRlckNsYXNzOiBcInN3aXBlci1sYXp5LXByZWxvYWRlclwiLFxuICAgICAgbGF6eVByZWxvYWRQcmV2TmV4dDogMCxcbiAgICAgIC8vIENhbGxiYWNrc1xuICAgICAgcnVuQ2FsbGJhY2tzT25Jbml0OiB0cnVlLFxuICAgICAgLy8gSW50ZXJuYWxzXG4gICAgICBfZW1pdENsYXNzZXM6IGZhbHNlXG4gICAgfTtcbiAgICBwcm90b3R5cGVzID0ge1xuICAgICAgZXZlbnRzRW1pdHRlcixcbiAgICAgIHVwZGF0ZSxcbiAgICAgIHRyYW5zbGF0ZSxcbiAgICAgIHRyYW5zaXRpb24sXG4gICAgICBzbGlkZSxcbiAgICAgIGxvb3AsXG4gICAgICBncmFiQ3Vyc29yLFxuICAgICAgZXZlbnRzOiBldmVudHMkMSxcbiAgICAgIGJyZWFrcG9pbnRzLFxuICAgICAgY2hlY2tPdmVyZmxvdzogY2hlY2tPdmVyZmxvdyQxLFxuICAgICAgY2xhc3Nlc1xuICAgIH07XG4gICAgZXh0ZW5kZWREZWZhdWx0cyA9IHt9O1xuICAgIFN3aXBlciA9IGNsYXNzIF9Td2lwZXIge1xuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGxldCBlbDtcbiAgICAgICAgbGV0IHBhcmFtcztcbiAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgYXJnc1swXS5jb25zdHJ1Y3RvciAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnc1swXSkuc2xpY2UoOCwgLTEpID09PSBcIk9iamVjdFwiKSB7XG4gICAgICAgICAgcGFyYW1zID0gYXJnc1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBbZWwsIHBhcmFtc10gPSBhcmdzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcGFyYW1zKSBwYXJhbXMgPSB7fTtcbiAgICAgICAgcGFyYW1zID0gZXh0ZW5kMih7fSwgcGFyYW1zKTtcbiAgICAgICAgaWYgKGVsICYmICFwYXJhbXMuZWwpIHBhcmFtcy5lbCA9IGVsO1xuICAgICAgICBjb25zdCBkb2N1bWVudDIgPSBnZXREb2N1bWVudCgpO1xuICAgICAgICBpZiAocGFyYW1zLmVsICYmIHR5cGVvZiBwYXJhbXMuZWwgPT09IFwic3RyaW5nXCIgJiYgZG9jdW1lbnQyLnF1ZXJ5U2VsZWN0b3JBbGwocGFyYW1zLmVsKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29uc3Qgc3dpcGVycyA9IFtdO1xuICAgICAgICAgIGRvY3VtZW50Mi5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtcy5lbCkuZm9yRWFjaCgoY29udGFpbmVyRWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1BhcmFtcyA9IGV4dGVuZDIoe30sIHBhcmFtcywge1xuICAgICAgICAgICAgICBlbDogY29udGFpbmVyRWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3dpcGVycy5wdXNoKG5ldyBfU3dpcGVyKG5ld1BhcmFtcykpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBzd2lwZXJzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIHN3aXBlci5fX3N3aXBlcl9fID0gdHJ1ZTtcbiAgICAgICAgc3dpcGVyLnN1cHBvcnQgPSBnZXRTdXBwb3J0KCk7XG4gICAgICAgIHN3aXBlci5kZXZpY2UgPSBnZXREZXZpY2Uoe1xuICAgICAgICAgIHVzZXJBZ2VudDogcGFyYW1zLnVzZXJBZ2VudFxuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLmJyb3dzZXIgPSBnZXRCcm93c2VyKCk7XG4gICAgICAgIHN3aXBlci5ldmVudHNMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgc3dpcGVyLmV2ZW50c0FueUxpc3RlbmVycyA9IFtdO1xuICAgICAgICBzd2lwZXIubW9kdWxlcyA9IFsuLi5zd2lwZXIuX19tb2R1bGVzX19dO1xuICAgICAgICBpZiAocGFyYW1zLm1vZHVsZXMgJiYgQXJyYXkuaXNBcnJheShwYXJhbXMubW9kdWxlcykpIHtcbiAgICAgICAgICBzd2lwZXIubW9kdWxlcy5wdXNoKC4uLnBhcmFtcy5tb2R1bGVzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxNb2R1bGVzUGFyYW1zID0ge307XG4gICAgICAgIHN3aXBlci5tb2R1bGVzLmZvckVhY2goKG1vZCkgPT4ge1xuICAgICAgICAgIG1vZCh7XG4gICAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgICBzd2lwZXIsXG4gICAgICAgICAgICBleHRlbmRQYXJhbXM6IG1vZHVsZUV4dGVuZFBhcmFtcyhwYXJhbXMsIGFsbE1vZHVsZXNQYXJhbXMpLFxuICAgICAgICAgICAgb246IHN3aXBlci5vbi5iaW5kKHN3aXBlciksXG4gICAgICAgICAgICBvbmNlOiBzd2lwZXIub25jZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgICBvZmY6IHN3aXBlci5vZmYuYmluZChzd2lwZXIpLFxuICAgICAgICAgICAgZW1pdDogc3dpcGVyLmVtaXQuYmluZChzd2lwZXIpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzd2lwZXJQYXJhbXMgPSBleHRlbmQyKHt9LCBkZWZhdWx0cywgYWxsTW9kdWxlc1BhcmFtcyk7XG4gICAgICAgIHN3aXBlci5wYXJhbXMgPSBleHRlbmQyKHt9LCBzd2lwZXJQYXJhbXMsIGV4dGVuZGVkRGVmYXVsdHMsIHBhcmFtcyk7XG4gICAgICAgIHN3aXBlci5vcmlnaW5hbFBhcmFtcyA9IGV4dGVuZDIoe30sIHN3aXBlci5wYXJhbXMpO1xuICAgICAgICBzd2lwZXIucGFzc2VkUGFyYW1zID0gZXh0ZW5kMih7fSwgcGFyYW1zKTtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMgJiYgc3dpcGVyLnBhcmFtcy5vbikge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHN3aXBlci5wYXJhbXMub24pLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xuICAgICAgICAgICAgc3dpcGVyLm9uKGV2ZW50TmFtZSwgc3dpcGVyLnBhcmFtcy5vbltldmVudE5hbWVdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcyAmJiBzd2lwZXIucGFyYW1zLm9uQW55KSB7XG4gICAgICAgICAgc3dpcGVyLm9uQW55KHN3aXBlci5wYXJhbXMub25BbnkpO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgICAgICAgZW5hYmxlZDogc3dpcGVyLnBhcmFtcy5lbmFibGVkLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIC8vIENsYXNzZXNcbiAgICAgICAgICBjbGFzc05hbWVzOiBbXSxcbiAgICAgICAgICAvLyBTbGlkZXNcbiAgICAgICAgICBzbGlkZXM6IFtdLFxuICAgICAgICAgIHNsaWRlc0dyaWQ6IFtdLFxuICAgICAgICAgIHNuYXBHcmlkOiBbXSxcbiAgICAgICAgICBzbGlkZXNTaXplc0dyaWQ6IFtdLFxuICAgICAgICAgIC8vIGlzRGlyZWN0aW9uXG4gICAgICAgICAgaXNIb3Jpem9udGFsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGlzVmVydGljYWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09IFwidmVydGljYWxcIjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIEluZGV4ZXNcbiAgICAgICAgICBhY3RpdmVJbmRleDogMCxcbiAgICAgICAgICByZWFsSW5kZXg6IDAsXG4gICAgICAgICAgLy9cbiAgICAgICAgICBpc0JlZ2lubmluZzogdHJ1ZSxcbiAgICAgICAgICBpc0VuZDogZmFsc2UsXG4gICAgICAgICAgLy8gUHJvcHNcbiAgICAgICAgICB0cmFuc2xhdGU6IDAsXG4gICAgICAgICAgcHJldmlvdXNUcmFuc2xhdGU6IDAsXG4gICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgdmVsb2NpdHk6IDAsXG4gICAgICAgICAgYW5pbWF0aW5nOiBmYWxzZSxcbiAgICAgICAgICBjc3NPdmVyZmxvd0FkanVzdG1lbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC50cnVuYyh0aGlzLnRyYW5zbGF0ZSAvIDIgKiogMjMpICogMiAqKiAyMztcbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIExvY2tzXG4gICAgICAgICAgYWxsb3dTbGlkZU5leHQ6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZU5leHQsXG4gICAgICAgICAgYWxsb3dTbGlkZVByZXY6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZVByZXYsXG4gICAgICAgICAgLy8gVG91Y2ggRXZlbnRzXG4gICAgICAgICAgdG91Y2hFdmVudHNEYXRhOiB7XG4gICAgICAgICAgICBpc1RvdWNoZWQ6IHZvaWQgMCxcbiAgICAgICAgICAgIGlzTW92ZWQ6IHZvaWQgMCxcbiAgICAgICAgICAgIGFsbG93VG91Y2hDYWxsYmFja3M6IHZvaWQgMCxcbiAgICAgICAgICAgIHRvdWNoU3RhcnRUaW1lOiB2b2lkIDAsXG4gICAgICAgICAgICBpc1Njcm9sbGluZzogdm9pZCAwLFxuICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZTogdm9pZCAwLFxuICAgICAgICAgICAgc3RhcnRUcmFuc2xhdGU6IHZvaWQgMCxcbiAgICAgICAgICAgIGFsbG93VGhyZXNob2xkTW92ZTogdm9pZCAwLFxuICAgICAgICAgICAgLy8gRm9ybSBlbGVtZW50cyB0byBtYXRjaFxuICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHM6IHN3aXBlci5wYXJhbXMuZm9jdXNhYmxlRWxlbWVudHMsXG4gICAgICAgICAgICAvLyBMYXN0IGNsaWNrIHRpbWVcbiAgICAgICAgICAgIGxhc3RDbGlja1RpbWU6IDAsXG4gICAgICAgICAgICBjbGlja1RpbWVvdXQ6IHZvaWQgMCxcbiAgICAgICAgICAgIC8vIFZlbG9jaXRpZXNcbiAgICAgICAgICAgIHZlbG9jaXRpZXM6IFtdLFxuICAgICAgICAgICAgYWxsb3dNb21lbnR1bUJvdW5jZTogdm9pZCAwLFxuICAgICAgICAgICAgc3RhcnRNb3Zpbmc6IHZvaWQgMCxcbiAgICAgICAgICAgIHBvaW50ZXJJZDogbnVsbCxcbiAgICAgICAgICAgIHRvdWNoSWQ6IG51bGxcbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIENsaWNrc1xuICAgICAgICAgIGFsbG93Q2xpY2s6IHRydWUsXG4gICAgICAgICAgLy8gVG91Y2hlc1xuICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBzd2lwZXIucGFyYW1zLmFsbG93VG91Y2hNb3ZlLFxuICAgICAgICAgIHRvdWNoZXM6IHtcbiAgICAgICAgICAgIHN0YXJ0WDogMCxcbiAgICAgICAgICAgIHN0YXJ0WTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRYOiAwLFxuICAgICAgICAgICAgY3VycmVudFk6IDAsXG4gICAgICAgICAgICBkaWZmOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyBJbWFnZXNcbiAgICAgICAgICBpbWFnZXNUb0xvYWQ6IFtdLFxuICAgICAgICAgIGltYWdlc0xvYWRlZDogMFxuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLmVtaXQoXCJfc3dpcGVyXCIpO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5pbml0KSB7XG4gICAgICAgICAgc3dpcGVyLmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3dpcGVyO1xuICAgICAgfVxuICAgICAgZ2V0RGlyZWN0aW9uTGFiZWwocHJvcGVydHkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcGVydHk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBcIndpZHRoXCI6IFwiaGVpZ2h0XCIsXG4gICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwibWFyZ2luLWxlZnRcIixcbiAgICAgICAgICBcIm1hcmdpbi1ib3R0b20gXCI6IFwibWFyZ2luLXJpZ2h0XCIsXG4gICAgICAgICAgXCJtYXJnaW4tbGVmdFwiOiBcIm1hcmdpbi10b3BcIixcbiAgICAgICAgICBcIm1hcmdpbi1yaWdodFwiOiBcIm1hcmdpbi1ib3R0b21cIixcbiAgICAgICAgICBcInBhZGRpbmctbGVmdFwiOiBcInBhZGRpbmctdG9wXCIsXG4gICAgICAgICAgXCJwYWRkaW5nLXJpZ2h0XCI6IFwicGFkZGluZy1ib3R0b21cIixcbiAgICAgICAgICBcIm1hcmdpblJpZ2h0XCI6IFwibWFyZ2luQm90dG9tXCJcbiAgICAgICAgfVtwcm9wZXJ0eV07XG4gICAgICB9XG4gICAgICBnZXRTbGlkZUluZGV4KHNsaWRlRWwpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNsaWRlc0VsLFxuICAgICAgICAgIHBhcmFtc1xuICAgICAgICB9ID0gdGhpcztcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKTtcbiAgICAgICAgY29uc3QgZmlyc3RTbGlkZUluZGV4ID0gZWxlbWVudEluZGV4KHNsaWRlc1swXSk7XG4gICAgICAgIHJldHVybiBlbGVtZW50SW5kZXgoc2xpZGVFbCkgLSBmaXJzdFNsaWRlSW5kZXg7XG4gICAgICB9XG4gICAgICBnZXRTbGlkZUluZGV4QnlEYXRhKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNsaWRlSW5kZXgodGhpcy5zbGlkZXMuZmlsdGVyKChzbGlkZUVsKSA9PiBzbGlkZUVsLmdldEF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpICogMSA9PT0gaW5kZXgpWzBdKTtcbiAgICAgIH1cbiAgICAgIHJlY2FsY1NsaWRlcygpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNsaWRlc0VsLFxuICAgICAgICAgIHBhcmFtc1xuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBzd2lwZXIuc2xpZGVzID0gZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKTtcbiAgICAgIH1cbiAgICAgIGVuYWJsZSgpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpcGVyLmVtaXQoXCJlbmFibGVcIik7XG4gICAgICB9XG4gICAgICBkaXNhYmxlKCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgICAgICBzd2lwZXIudW5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpcGVyLmVtaXQoXCJkaXNhYmxlXCIpO1xuICAgICAgfVxuICAgICAgc2V0UHJvZ3Jlc3MocHJvZ3Jlc3MsIHNwZWVkKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIHByb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgocHJvZ3Jlc3MsIDApLCAxKTtcbiAgICAgICAgY29uc3QgbWluID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICBjb25zdCBtYXggPSBzd2lwZXIubWF4VHJhbnNsYXRlKCk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSAobWF4IC0gbWluKSAqIHByb2dyZXNzICsgbWluO1xuICAgICAgICBzd2lwZXIudHJhbnNsYXRlVG8oY3VycmVudCwgdHlwZW9mIHNwZWVkID09PSBcInVuZGVmaW5lZFwiID8gMCA6IHNwZWVkKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICB9XG4gICAgICBlbWl0Q29udGFpbmVyQ2xhc3NlcygpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLl9lbWl0Q2xhc3NlcyB8fCAhc3dpcGVyLmVsKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGNscyA9IHN3aXBlci5lbC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpLmZpbHRlcigoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZS5pbmRleE9mKFwic3dpcGVyXCIpID09PSAwIHx8IGNsYXNzTmFtZS5pbmRleE9mKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgPT09IDA7XG4gICAgICAgIH0pO1xuICAgICAgICBzd2lwZXIuZW1pdChcIl9jb250YWluZXJDbGFzc2VzXCIsIGNscy5qb2luKFwiIFwiKSk7XG4gICAgICB9XG4gICAgICBnZXRTbGlkZUNsYXNzZXMoc2xpZGVFbCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuIFwiXCI7XG4gICAgICAgIHJldHVybiBzbGlkZUVsLmNsYXNzTmFtZS5zcGxpdChcIiBcIikuZmlsdGVyKChjbGFzc05hbWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lLmluZGV4T2YoXCJzd2lwZXItc2xpZGVcIikgPT09IDAgfHwgY2xhc3NOYW1lLmluZGV4T2Yoc3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzKSA9PT0gMDtcbiAgICAgICAgfSkuam9pbihcIiBcIik7XG4gICAgICB9XG4gICAgICBlbWl0U2xpZGVzQ2xhc3NlcygpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLl9lbWl0Q2xhc3NlcyB8fCAhc3dpcGVyLmVsKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHVwZGF0ZXMgPSBbXTtcbiAgICAgICAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKChzbGlkZUVsKSA9PiB7XG4gICAgICAgICAgY29uc3QgY2xhc3NOYW1lcyA9IHN3aXBlci5nZXRTbGlkZUNsYXNzZXMoc2xpZGVFbCk7XG4gICAgICAgICAgdXBkYXRlcy5wdXNoKHtcbiAgICAgICAgICAgIHNsaWRlRWwsXG4gICAgICAgICAgICBjbGFzc05hbWVzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoXCJfc2xpZGVDbGFzc1wiLCBzbGlkZUVsLCBjbGFzc05hbWVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5lbWl0KFwiX3NsaWRlQ2xhc3Nlc1wiLCB1cGRhdGVzKTtcbiAgICAgIH1cbiAgICAgIHNsaWRlc1BlclZpZXdEeW5hbWljKHZpZXcsIGV4YWN0KSB7XG4gICAgICAgIGlmICh2aWV3ID09PSB2b2lkIDApIHtcbiAgICAgICAgICB2aWV3ID0gXCJjdXJyZW50XCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4YWN0ID09PSB2b2lkIDApIHtcbiAgICAgICAgICBleGFjdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgc2xpZGVzLFxuICAgICAgICAgIHNsaWRlc0dyaWQsXG4gICAgICAgICAgc2xpZGVzU2l6ZXNHcmlkLFxuICAgICAgICAgIHNpemU6IHN3aXBlclNpemUsXG4gICAgICAgICAgYWN0aXZlSW5kZXhcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgbGV0IHNwdiA9IDE7XG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IFwibnVtYmVyXCIpIHJldHVybiBwYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgIGxldCBzbGlkZVNpemUgPSBzbGlkZXNbYWN0aXZlSW5kZXhdID8gTWF0aC5jZWlsKHNsaWRlc1thY3RpdmVJbmRleF0uc3dpcGVyU2xpZGVTaXplKSA6IDA7XG4gICAgICAgICAgbGV0IGJyZWFrTG9vcDtcbiAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggKyAxOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoc2xpZGVzW2ldICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICAgICAgc2xpZGVTaXplICs9IE1hdGguY2VpbChzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplKTtcbiAgICAgICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgICAgICAgIGlmIChzbGlkZVNpemUgPiBzd2lwZXJTaXplKSBicmVha0xvb3AgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSAmJiAhYnJlYWtMb29wKSB7XG4gICAgICAgICAgICAgIHNsaWRlU2l6ZSArPSBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlU2l6ZSA+IHN3aXBlclNpemUpIGJyZWFrTG9vcCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2aWV3ID09PSBcImN1cnJlbnRcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4ICsgMTsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBjb25zdCBzbGlkZUluVmlldyA9IGV4YWN0ID8gc2xpZGVzR3JpZFtpXSArIHNsaWRlc1NpemVzR3JpZFtpXSAtIHNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdIDwgc3dpcGVyU2l6ZSA6IHNsaWRlc0dyaWRbaV0gLSBzbGlkZXNHcmlkW2FjdGl2ZUluZGV4XSA8IHN3aXBlclNpemU7XG4gICAgICAgICAgICAgIGlmIChzbGlkZUluVmlldykge1xuICAgICAgICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHNsaWRlSW5WaWV3ID0gc2xpZGVzR3JpZFthY3RpdmVJbmRleF0gLSBzbGlkZXNHcmlkW2ldIDwgc3dpcGVyU2l6ZTtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlSW5WaWV3KSB7XG4gICAgICAgICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwdjtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgc25hcEdyaWQsXG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGlmIChwYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0QnJlYWtwb2ludCgpO1xuICAgICAgICB9XG4gICAgICAgIFsuLi5zd2lwZXIuZWwucXVlcnlTZWxlY3RvckFsbCgnW2xvYWRpbmc9XCJsYXp5XCJdJyldLmZvckVhY2goKGltYWdlRWwpID0+IHtcbiAgICAgICAgICBpZiAoaW1hZ2VFbC5jb21wbGV0ZSkge1xuICAgICAgICAgICAgcHJvY2Vzc0xhenlQcmVsb2FkZXIoc3dpcGVyLCBpbWFnZUVsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgICBmdW5jdGlvbiBzZXRUcmFuc2xhdGUyKCkge1xuICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZVZhbHVlID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgKiAtMSA6IHN3aXBlci50cmFuc2xhdGU7XG4gICAgICAgICAgY29uc3QgbmV3VHJhbnNsYXRlID0gTWF0aC5taW4oTWF0aC5tYXgodHJhbnNsYXRlVmFsdWUsIHN3aXBlci5tYXhUcmFuc2xhdGUoKSksIHN3aXBlci5taW5UcmFuc2xhdGUoKSk7XG4gICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgICAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRyYW5zbGF0ZWQ7XG4gICAgICAgIGlmIChwYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgIXBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgICAgc2V0VHJhbnNsYXRlMigpO1xuICAgICAgICAgIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIgfHwgcGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSAmJiBzd2lwZXIuaXNFbmQgJiYgIXBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVzID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcyA6IHN3aXBlci5zbGlkZXM7XG4gICAgICAgICAgICB0cmFuc2xhdGVkID0gc3dpcGVyLnNsaWRlVG8oc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNsYXRlZCA9IHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXRyYW5zbGF0ZWQpIHtcbiAgICAgICAgICAgIHNldFRyYW5zbGF0ZTIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHNuYXBHcmlkICE9PSBzd2lwZXIuc25hcEdyaWQpIHtcbiAgICAgICAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXBlci5lbWl0KFwidXBkYXRlXCIpO1xuICAgICAgfVxuICAgICAgY2hhbmdlRGlyZWN0aW9uKG5ld0RpcmVjdGlvbiwgbmVlZFVwZGF0ZSkge1xuICAgICAgICBpZiAobmVlZFVwZGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgbmVlZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgY29uc3QgY3VycmVudERpcmVjdGlvbiA9IHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uO1xuICAgICAgICBpZiAoIW5ld0RpcmVjdGlvbikge1xuICAgICAgICAgIG5ld0RpcmVjdGlvbiA9IGN1cnJlbnREaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiID8gXCJ2ZXJ0aWNhbFwiIDogXCJob3Jpem9udGFsXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld0RpcmVjdGlvbiA9PT0gY3VycmVudERpcmVjdGlvbiB8fCBuZXdEaXJlY3Rpb24gIT09IFwiaG9yaXpvbnRhbFwiICYmIG5ld0RpcmVjdGlvbiAhPT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgICAgcmV0dXJuIHN3aXBlcjtcbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9JHtjdXJyZW50RGlyZWN0aW9ufWApO1xuICAgICAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LmFkZChgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9JHtuZXdEaXJlY3Rpb259YCk7XG4gICAgICAgIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xuICAgICAgICBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9IG5ld0RpcmVjdGlvbjtcbiAgICAgICAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKChzbGlkZUVsKSA9PiB7XG4gICAgICAgICAgaWYgKG5ld0RpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgICAgICBzbGlkZUVsLnN0eWxlLndpZHRoID0gXCJcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVFbC5zdHlsZS5oZWlnaHQgPSBcIlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5lbWl0KFwiY2hhbmdlRGlyZWN0aW9uXCIpO1xuICAgICAgICBpZiAobmVlZFVwZGF0ZSkgc3dpcGVyLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gc3dpcGVyO1xuICAgICAgfVxuICAgICAgY2hhbmdlTGFuZ3VhZ2VEaXJlY3Rpb24oZGlyZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucnRsICYmIGRpcmVjdGlvbiA9PT0gXCJydGxcIiB8fCAhc3dpcGVyLnJ0bCAmJiBkaXJlY3Rpb24gPT09IFwibHRyXCIpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLnJ0bCA9IGRpcmVjdGlvbiA9PT0gXCJydGxcIjtcbiAgICAgICAgc3dpcGVyLnJ0bFRyYW5zbGF0ZSA9IHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIiAmJiBzd2lwZXIucnRsO1xuICAgICAgICBpZiAoc3dpcGVyLnJ0bCkge1xuICAgICAgICAgIHN3aXBlci5lbC5jbGFzc0xpc3QuYWRkKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ydGxgKTtcbiAgICAgICAgICBzd2lwZXIuZWwuZGlyID0gXCJydGxcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9cnRsYCk7XG4gICAgICAgICAgc3dpcGVyLmVsLmRpciA9IFwibHRyXCI7XG4gICAgICAgIH1cbiAgICAgICAgc3dpcGVyLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgICAgbW91bnQoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLm1vdW50ZWQpIHJldHVybiB0cnVlO1xuICAgICAgICBsZXQgZWwgPSBlbGVtZW50IHx8IHN3aXBlci5wYXJhbXMuZWw7XG4gICAgICAgIGlmICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZWwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWwuc3dpcGVyID0gc3dpcGVyO1xuICAgICAgICBpZiAoZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLmhvc3QgJiYgZWwucGFyZW50Tm9kZS5ob3N0Lm5vZGVOYW1lID09PSBzd2lwZXIucGFyYW1zLnN3aXBlckVsZW1lbnROb2RlTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgc3dpcGVyLmlzRWxlbWVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ2V0V3JhcHBlclNlbGVjdG9yID0gKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBgLiR7KHN3aXBlci5wYXJhbXMud3JhcHBlckNsYXNzIHx8IFwiXCIpLnRyaW0oKS5zcGxpdChcIiBcIikuam9pbihcIi5cIil9YDtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ2V0V3JhcHBlciA9ICgpID0+IHtcbiAgICAgICAgICBpZiAoZWwgJiYgZWwuc2hhZG93Um9vdCAmJiBlbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGVsLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihnZXRXcmFwcGVyU2VsZWN0b3IoKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZWxlbWVudENoaWxkcmVuKGVsLCBnZXRXcmFwcGVyU2VsZWN0b3IoKSlbMF07XG4gICAgICAgIH07XG4gICAgICAgIGxldCB3cmFwcGVyRWwgPSBnZXRXcmFwcGVyKCk7XG4gICAgICAgIGlmICghd3JhcHBlckVsICYmIHN3aXBlci5wYXJhbXMuY3JlYXRlRWxlbWVudHMpIHtcbiAgICAgICAgICB3cmFwcGVyRWwgPSBjcmVhdGVFbGVtZW50MihcImRpdlwiLCBzd2lwZXIucGFyYW1zLndyYXBwZXJDbGFzcyk7XG4gICAgICAgICAgZWwuYXBwZW5kKHdyYXBwZXJFbCk7XG4gICAgICAgICAgZWxlbWVudENoaWxkcmVuKGVsLCBgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWApLmZvckVhY2goKHNsaWRlRWwpID0+IHtcbiAgICAgICAgICAgIHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVFbCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICAgICAgICBlbCxcbiAgICAgICAgICB3cmFwcGVyRWwsXG4gICAgICAgICAgc2xpZGVzRWw6IHN3aXBlci5pc0VsZW1lbnQgJiYgIWVsLnBhcmVudE5vZGUuaG9zdC5zbGlkZVNsb3RzID8gZWwucGFyZW50Tm9kZS5ob3N0IDogd3JhcHBlckVsLFxuICAgICAgICAgIGhvc3RFbDogc3dpcGVyLmlzRWxlbWVudCA/IGVsLnBhcmVudE5vZGUuaG9zdCA6IGVsLFxuICAgICAgICAgIG1vdW50ZWQ6IHRydWUsXG4gICAgICAgICAgLy8gUlRMXG4gICAgICAgICAgcnRsOiBlbC5kaXIudG9Mb3dlckNhc2UoKSA9PT0gXCJydGxcIiB8fCBlbGVtZW50U3R5bGUoZWwsIFwiZGlyZWN0aW9uXCIpID09PSBcInJ0bFwiLFxuICAgICAgICAgIHJ0bFRyYW5zbGF0ZTogc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiICYmIChlbC5kaXIudG9Mb3dlckNhc2UoKSA9PT0gXCJydGxcIiB8fCBlbGVtZW50U3R5bGUoZWwsIFwiZGlyZWN0aW9uXCIpID09PSBcInJ0bFwiKSxcbiAgICAgICAgICB3cm9uZ1JUTDogZWxlbWVudFN0eWxlKHdyYXBwZXJFbCwgXCJkaXNwbGF5XCIpID09PSBcIi13ZWJraXQtYm94XCJcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaW5pdChlbCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm4gc3dpcGVyO1xuICAgICAgICBjb25zdCBtb3VudGVkID0gc3dpcGVyLm1vdW50KGVsKTtcbiAgICAgICAgaWYgKG1vdW50ZWQgPT09IGZhbHNlKSByZXR1cm4gc3dpcGVyO1xuICAgICAgICBzd2lwZXIuZW1pdChcImJlZm9yZUluaXRcIik7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgc3dpcGVyLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIuYWRkQ2xhc3NlcygpO1xuICAgICAgICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cpIHtcbiAgICAgICAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IgJiYgc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3AgJiYgc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSArIHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZSwgMCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSwgMCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIuYXR0YWNoRXZlbnRzKCk7XG4gICAgICAgIGNvbnN0IGxhenlFbGVtZW50cyA9IFsuLi5zd2lwZXIuZWwucXVlcnlTZWxlY3RvckFsbCgnW2xvYWRpbmc9XCJsYXp5XCJdJyldO1xuICAgICAgICBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgICAgICAgIGxhenlFbGVtZW50cy5wdXNoKC4uLnN3aXBlci5ob3N0RWwucXVlcnlTZWxlY3RvckFsbCgnW2xvYWRpbmc9XCJsYXp5XCJdJykpO1xuICAgICAgICB9XG4gICAgICAgIGxhenlFbGVtZW50cy5mb3JFYWNoKChpbWFnZUVsKSA9PiB7XG4gICAgICAgICAgaWYgKGltYWdlRWwuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3NMYXp5UHJlbG9hZGVyKHN3aXBlciwgaW1hZ2VFbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGltYWdlRWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgcHJvY2Vzc0xhenlQcmVsb2FkZXIoc3dpcGVyLCBlLnRhcmdldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwcmVsb2FkKHN3aXBlcik7XG4gICAgICAgIHN3aXBlci5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIHByZWxvYWQoc3dpcGVyKTtcbiAgICAgICAgc3dpcGVyLmVtaXQoXCJpbml0XCIpO1xuICAgICAgICBzd2lwZXIuZW1pdChcImFmdGVySW5pdFwiKTtcbiAgICAgICAgcmV0dXJuIHN3aXBlcjtcbiAgICAgIH1cbiAgICAgIGRlc3Ryb3koZGVsZXRlSW5zdGFuY2UsIGNsZWFuU3R5bGVzKSB7XG4gICAgICAgIGlmIChkZWxldGVJbnN0YW5jZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgZGVsZXRlSW5zdGFuY2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbGVhblN0eWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgY2xlYW5TdHlsZXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgZWwsXG4gICAgICAgICAgd3JhcHBlckVsLFxuICAgICAgICAgIHNsaWRlc1xuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMgPT09IFwidW5kZWZpbmVkXCIgfHwgc3dpcGVyLmRlc3Ryb3llZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHN3aXBlci5lbWl0KFwiYmVmb3JlRGVzdHJveVwiKTtcbiAgICAgICAgc3dpcGVyLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgIHN3aXBlci5kZXRhY2hFdmVudHMoKTtcbiAgICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsZWFuU3R5bGVzKSB7XG4gICAgICAgICAgc3dpcGVyLnJlbW92ZUNsYXNzZXMoKTtcbiAgICAgICAgICBpZiAoZWwgJiYgdHlwZW9mIGVsICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdyYXBwZXJFbCkge1xuICAgICAgICAgICAgd3JhcHBlckVsLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2xpZGVzICYmIHNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZUVsKSA9PiB7XG4gICAgICAgICAgICAgIHNsaWRlRWwuY2xhc3NMaXN0LnJlbW92ZShwYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MsIHBhcmFtcy5zbGlkZUZ1bGx5VmlzaWJsZUNsYXNzLCBwYXJhbXMuc2xpZGVBY3RpdmVDbGFzcywgcGFyYW1zLnNsaWRlTmV4dENsYXNzLCBwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICAgICAgICAgICAgICBzbGlkZUVsLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuICAgICAgICAgICAgICBzbGlkZUVsLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXBlci5lbWl0KFwiZGVzdHJveVwiKTtcbiAgICAgICAgT2JqZWN0LmtleXMoc3dpcGVyLmV2ZW50c0xpc3RlbmVycykuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICAgICAgc3dpcGVyLm9mZihldmVudE5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGRlbGV0ZUluc3RhbmNlICE9PSBmYWxzZSkge1xuICAgICAgICAgIGlmIChzd2lwZXIuZWwgJiYgdHlwZW9mIHN3aXBlci5lbCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgc3dpcGVyLmVsLnN3aXBlciA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZVByb3BzKHN3aXBlcik7XG4gICAgICAgIH1cbiAgICAgICAgc3dpcGVyLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgc3RhdGljIGV4dGVuZERlZmF1bHRzKG5ld0RlZmF1bHRzKSB7XG4gICAgICAgIGV4dGVuZDIoZXh0ZW5kZWREZWZhdWx0cywgbmV3RGVmYXVsdHMpO1xuICAgICAgfVxuICAgICAgc3RhdGljIGdldCBleHRlbmRlZERlZmF1bHRzKCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kZWREZWZhdWx0cztcbiAgICAgIH1cbiAgICAgIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICAgIH1cbiAgICAgIHN0YXRpYyBpbnN0YWxsTW9kdWxlKG1vZCkge1xuICAgICAgICBpZiAoIV9Td2lwZXIucHJvdG90eXBlLl9fbW9kdWxlc19fKSBfU3dpcGVyLnByb3RvdHlwZS5fX21vZHVsZXNfXyA9IFtdO1xuICAgICAgICBjb25zdCBtb2R1bGVzID0gX1N3aXBlci5wcm90b3R5cGUuX19tb2R1bGVzX187XG4gICAgICAgIGlmICh0eXBlb2YgbW9kID09PSBcImZ1bmN0aW9uXCIgJiYgbW9kdWxlcy5pbmRleE9mKG1vZCkgPCAwKSB7XG4gICAgICAgICAgbW9kdWxlcy5wdXNoKG1vZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YXRpYyB1c2UobW9kdWxlKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG1vZHVsZSkpIHtcbiAgICAgICAgICBtb2R1bGUuZm9yRWFjaCgobSkgPT4gX1N3aXBlci5pbnN0YWxsTW9kdWxlKG0pKTtcbiAgICAgICAgICByZXR1cm4gX1N3aXBlcjtcbiAgICAgICAgfVxuICAgICAgICBfU3dpcGVyLmluc3RhbGxNb2R1bGUobW9kdWxlKTtcbiAgICAgICAgcmV0dXJuIF9Td2lwZXI7XG4gICAgICB9XG4gICAgfTtcbiAgICBPYmplY3Qua2V5cyhwcm90b3R5cGVzKS5mb3JFYWNoKChwcm90b3R5cGVHcm91cCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocHJvdG90eXBlc1twcm90b3R5cGVHcm91cF0pLmZvckVhY2goKHByb3RvTWV0aG9kKSA9PiB7XG4gICAgICAgIFN3aXBlci5wcm90b3R5cGVbcHJvdG9NZXRob2RdID0gcHJvdG90eXBlc1twcm90b3R5cGVHcm91cF1bcHJvdG9NZXRob2RdO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgU3dpcGVyLnVzZShbUmVzaXplLCBPYnNlcnZlcl0pO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zd2lwZXIubWpzXG52YXIgaW5pdF9zd2lwZXIgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zd2lwZXIubWpzXCIoKSB7XG4gICAgaW5pdF9zd2lwZXJfY29yZSgpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3ZpcnR1YWwubWpzXG52YXIgaW5pdF92aXJ0dWFsID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy92aXJ0dWFsLm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMva2V5Ym9hcmQubWpzXG5mdW5jdGlvbiBLZXlib2FyZChfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIGV4dGVuZFBhcmFtcyxcbiAgICBvbixcbiAgICBlbWl0XG4gIH0gPSBfcmVmO1xuICBjb25zdCBkb2N1bWVudDIgPSBnZXREb2N1bWVudCgpO1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIHN3aXBlci5rZXlib2FyZCA9IHtcbiAgICBlbmFibGVkOiBmYWxzZVxuICB9O1xuICBleHRlbmRQYXJhbXMoe1xuICAgIGtleWJvYXJkOiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIG9ubHlJblZpZXdwb3J0OiB0cnVlLFxuICAgICAgcGFnZVVwRG93bjogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGZ1bmN0aW9uIGhhbmRsZShldmVudDIpIHtcbiAgICBpZiAoIXN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gICAgY29uc3Qge1xuICAgICAgcnRsVHJhbnNsYXRlOiBydGxcbiAgICB9ID0gc3dpcGVyO1xuICAgIGxldCBlID0gZXZlbnQyO1xuICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgY29uc3Qga2MgPSBlLmtleUNvZGUgfHwgZS5jaGFyQ29kZTtcbiAgICBjb25zdCBwYWdlVXBEb3duID0gc3dpcGVyLnBhcmFtcy5rZXlib2FyZC5wYWdlVXBEb3duO1xuICAgIGNvbnN0IGlzUGFnZVVwID0gcGFnZVVwRG93biAmJiBrYyA9PT0gMzM7XG4gICAgY29uc3QgaXNQYWdlRG93biA9IHBhZ2VVcERvd24gJiYga2MgPT09IDM0O1xuICAgIGNvbnN0IGlzQXJyb3dMZWZ0ID0ga2MgPT09IDM3O1xuICAgIGNvbnN0IGlzQXJyb3dSaWdodCA9IGtjID09PSAzOTtcbiAgICBjb25zdCBpc0Fycm93VXAgPSBrYyA9PT0gMzg7XG4gICAgY29uc3QgaXNBcnJvd0Rvd24gPSBrYyA9PT0gNDA7XG4gICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZU5leHQgJiYgKHN3aXBlci5pc0hvcml6b250YWwoKSAmJiBpc0Fycm93UmlnaHQgfHwgc3dpcGVyLmlzVmVydGljYWwoKSAmJiBpc0Fycm93RG93biB8fCBpc1BhZ2VEb3duKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlUHJldiAmJiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIGlzQXJyb3dMZWZ0IHx8IHN3aXBlci5pc1ZlcnRpY2FsKCkgJiYgaXNBcnJvd1VwIHx8IGlzUGFnZVVwKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZS5zaGlmdEtleSB8fCBlLmFsdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUgJiYgKGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIiB8fCBkb2N1bWVudDIuYWN0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInRleHRhcmVhXCIpKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5rZXlib2FyZC5vbmx5SW5WaWV3cG9ydCAmJiAoaXNQYWdlVXAgfHwgaXNQYWdlRG93biB8fCBpc0Fycm93TGVmdCB8fCBpc0Fycm93UmlnaHQgfHwgaXNBcnJvd1VwIHx8IGlzQXJyb3dEb3duKSkge1xuICAgICAgbGV0IGluVmlldyA9IGZhbHNlO1xuICAgICAgaWYgKGVsZW1lbnRQYXJlbnRzKHN3aXBlci5lbCwgYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApLmxlbmd0aCA+IDAgJiYgZWxlbWVudFBhcmVudHMoc3dpcGVyLmVsLCBgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzfWApLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgICAgY29uc3QgZWwgPSBzd2lwZXIuZWw7XG4gICAgICBjb25zdCBzd2lwZXJXaWR0aCA9IGVsLmNsaWVudFdpZHRoO1xuICAgICAgY29uc3Qgc3dpcGVySGVpZ2h0ID0gZWwuY2xpZW50SGVpZ2h0O1xuICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cyLmlubmVyV2lkdGg7XG4gICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cyLmlubmVySGVpZ2h0O1xuICAgICAgY29uc3Qgc3dpcGVyT2Zmc2V0ID0gZWxlbWVudE9mZnNldChlbCk7XG4gICAgICBpZiAocnRsKSBzd2lwZXJPZmZzZXQubGVmdCAtPSBlbC5zY3JvbGxMZWZ0O1xuICAgICAgY29uc3Qgc3dpcGVyQ29vcmQgPSBbW3N3aXBlck9mZnNldC5sZWZ0LCBzd2lwZXJPZmZzZXQudG9wXSwgW3N3aXBlck9mZnNldC5sZWZ0ICsgc3dpcGVyV2lkdGgsIHN3aXBlck9mZnNldC50b3BdLCBbc3dpcGVyT2Zmc2V0LmxlZnQsIHN3aXBlck9mZnNldC50b3AgKyBzd2lwZXJIZWlnaHRdLCBbc3dpcGVyT2Zmc2V0LmxlZnQgKyBzd2lwZXJXaWR0aCwgc3dpcGVyT2Zmc2V0LnRvcCArIHN3aXBlckhlaWdodF1dO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2lwZXJDb29yZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBwb2ludCA9IHN3aXBlckNvb3JkW2ldO1xuICAgICAgICBpZiAocG9pbnRbMF0gPj0gMCAmJiBwb2ludFswXSA8PSB3aW5kb3dXaWR0aCAmJiBwb2ludFsxXSA+PSAwICYmIHBvaW50WzFdIDw9IHdpbmRvd0hlaWdodCkge1xuICAgICAgICAgIGlmIChwb2ludFswXSA9PT0gMCAmJiBwb2ludFsxXSA9PT0gMCkgY29udGludWU7XG4gICAgICAgICAgaW5WaWV3ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFpblZpZXcpIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgIGlmIChpc1BhZ2VVcCB8fCBpc1BhZ2VEb3duIHx8IGlzQXJyb3dMZWZ0IHx8IGlzQXJyb3dSaWdodCkge1xuICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICgoaXNQYWdlRG93biB8fCBpc0Fycm93UmlnaHQpICYmICFydGwgfHwgKGlzUGFnZVVwIHx8IGlzQXJyb3dMZWZ0KSAmJiBydGwpIHN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgIGlmICgoaXNQYWdlVXAgfHwgaXNBcnJvd0xlZnQpICYmICFydGwgfHwgKGlzUGFnZURvd24gfHwgaXNBcnJvd1JpZ2h0KSAmJiBydGwpIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzUGFnZVVwIHx8IGlzUGFnZURvd24gfHwgaXNBcnJvd1VwIHx8IGlzQXJyb3dEb3duKSB7XG4gICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGlzUGFnZURvd24gfHwgaXNBcnJvd0Rvd24pIHN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgIGlmIChpc1BhZ2VVcCB8fCBpc0Fycm93VXApIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICB9XG4gICAgZW1pdChcImtleVByZXNzXCIsIGtjKTtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG4gIGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICBpZiAoc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQpIHJldHVybjtcbiAgICBkb2N1bWVudDIuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlKTtcbiAgICBzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCA9IHRydWU7XG4gIH1cbiAgZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICBpZiAoIXN3aXBlci5rZXlib2FyZC5lbmFibGVkKSByZXR1cm47XG4gICAgZG9jdW1lbnQyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZSk7XG4gICAgc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBvbihcImluaXRcIiwgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmtleWJvYXJkLmVuYWJsZWQpIHtcbiAgICAgIGVuYWJsZSgpO1xuICAgIH1cbiAgfSk7XG4gIG9uKFwiZGVzdHJveVwiLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5rZXlib2FyZC5lbmFibGVkKSB7XG4gICAgICBkaXNhYmxlKCk7XG4gICAgfVxuICB9KTtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIua2V5Ym9hcmQsIHtcbiAgICBlbmFibGUsXG4gICAgZGlzYWJsZVxuICB9KTtcbn1cbnZhciBpbml0X2tleWJvYXJkID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9rZXlib2FyZC5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL21vdXNld2hlZWwubWpzXG5mdW5jdGlvbiBNb3VzZXdoZWVsKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgZXh0ZW5kUGFyYW1zLFxuICAgIG9uLFxuICAgIGVtaXRcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgZXh0ZW5kUGFyYW1zKHtcbiAgICBtb3VzZXdoZWVsOiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIHJlbGVhc2VPbkVkZ2VzOiBmYWxzZSxcbiAgICAgIGludmVydDogZmFsc2UsXG4gICAgICBmb3JjZVRvQXhpczogZmFsc2UsXG4gICAgICBzZW5zaXRpdml0eTogMSxcbiAgICAgIGV2ZW50c1RhcmdldDogXCJjb250YWluZXJcIixcbiAgICAgIHRocmVzaG9sZERlbHRhOiBudWxsLFxuICAgICAgdGhyZXNob2xkVGltZTogbnVsbCxcbiAgICAgIG5vTW91c2V3aGVlbENsYXNzOiBcInN3aXBlci1uby1tb3VzZXdoZWVsXCJcbiAgICB9XG4gIH0pO1xuICBzd2lwZXIubW91c2V3aGVlbCA9IHtcbiAgICBlbmFibGVkOiBmYWxzZVxuICB9O1xuICBsZXQgdGltZW91dDtcbiAgbGV0IGxhc3RTY3JvbGxUaW1lID0gbm93KCk7XG4gIGxldCBsYXN0RXZlbnRCZWZvcmVTbmFwO1xuICBjb25zdCByZWNlbnRXaGVlbEV2ZW50cyA9IFtdO1xuICBmdW5jdGlvbiBub3JtYWxpemUoZSkge1xuICAgIGNvbnN0IFBJWEVMX1NURVAgPSAxMDtcbiAgICBjb25zdCBMSU5FX0hFSUdIVCA9IDQwO1xuICAgIGNvbnN0IFBBR0VfSEVJR0hUID0gODAwO1xuICAgIGxldCBzWCA9IDA7XG4gICAgbGV0IHNZID0gMDtcbiAgICBsZXQgcFggPSAwO1xuICAgIGxldCBwWSA9IDA7XG4gICAgaWYgKFwiZGV0YWlsXCIgaW4gZSkge1xuICAgICAgc1kgPSBlLmRldGFpbDtcbiAgICB9XG4gICAgaWYgKFwid2hlZWxEZWx0YVwiIGluIGUpIHtcbiAgICAgIHNZID0gLWUud2hlZWxEZWx0YSAvIDEyMDtcbiAgICB9XG4gICAgaWYgKFwid2hlZWxEZWx0YVlcIiBpbiBlKSB7XG4gICAgICBzWSA9IC1lLndoZWVsRGVsdGFZIC8gMTIwO1xuICAgIH1cbiAgICBpZiAoXCJ3aGVlbERlbHRhWFwiIGluIGUpIHtcbiAgICAgIHNYID0gLWUud2hlZWxEZWx0YVggLyAxMjA7XG4gICAgfVxuICAgIGlmIChcImF4aXNcIiBpbiBlICYmIGUuYXhpcyA9PT0gZS5IT1JJWk9OVEFMX0FYSVMpIHtcbiAgICAgIHNYID0gc1k7XG4gICAgICBzWSA9IDA7XG4gICAgfVxuICAgIHBYID0gc1ggKiBQSVhFTF9TVEVQO1xuICAgIHBZID0gc1kgKiBQSVhFTF9TVEVQO1xuICAgIGlmIChcImRlbHRhWVwiIGluIGUpIHtcbiAgICAgIHBZID0gZS5kZWx0YVk7XG4gICAgfVxuICAgIGlmIChcImRlbHRhWFwiIGluIGUpIHtcbiAgICAgIHBYID0gZS5kZWx0YVg7XG4gICAgfVxuICAgIGlmIChlLnNoaWZ0S2V5ICYmICFwWCkge1xuICAgICAgcFggPSBwWTtcbiAgICAgIHBZID0gMDtcbiAgICB9XG4gICAgaWYgKChwWCB8fCBwWSkgJiYgZS5kZWx0YU1vZGUpIHtcbiAgICAgIGlmIChlLmRlbHRhTW9kZSA9PT0gMSkge1xuICAgICAgICBwWCAqPSBMSU5FX0hFSUdIVDtcbiAgICAgICAgcFkgKj0gTElORV9IRUlHSFQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwWCAqPSBQQUdFX0hFSUdIVDtcbiAgICAgICAgcFkgKj0gUEFHRV9IRUlHSFQ7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwWCAmJiAhc1gpIHtcbiAgICAgIHNYID0gcFggPCAxID8gLTEgOiAxO1xuICAgIH1cbiAgICBpZiAocFkgJiYgIXNZKSB7XG4gICAgICBzWSA9IHBZIDwgMSA/IC0xIDogMTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHNwaW5YOiBzWCxcbiAgICAgIHNwaW5ZOiBzWSxcbiAgICAgIHBpeGVsWDogcFgsXG4gICAgICBwaXhlbFk6IHBZXG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZUVudGVyKCkge1xuICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICBzd2lwZXIubW91c2VFbnRlcmVkID0gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICBzd2lwZXIubW91c2VFbnRlcmVkID0gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gYW5pbWF0ZVNsaWRlcihuZXdFdmVudCkge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwudGhyZXNob2xkRGVsdGEgJiYgbmV3RXZlbnQuZGVsdGEgPCBzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwudGhyZXNob2xkRGVsdGEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC50aHJlc2hvbGRUaW1lICYmIG5vdygpIC0gbGFzdFNjcm9sbFRpbWUgPCBzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwudGhyZXNob2xkVGltZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobmV3RXZlbnQuZGVsdGEgPj0gNiAmJiBub3coKSAtIGxhc3RTY3JvbGxUaW1lIDwgNjApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAobmV3RXZlbnQuZGlyZWN0aW9uIDwgMCkge1xuICAgICAgaWYgKCghc3dpcGVyLmlzRW5kIHx8IHN3aXBlci5wYXJhbXMubG9vcCkgJiYgIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgICBlbWl0KFwic2Nyb2xsXCIsIG5ld0V2ZW50LnJhdyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgoIXN3aXBlci5pc0JlZ2lubmluZyB8fCBzd2lwZXIucGFyYW1zLmxvb3ApICYmICFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgICBlbWl0KFwic2Nyb2xsXCIsIG5ld0V2ZW50LnJhdyk7XG4gICAgfVxuICAgIGxhc3RTY3JvbGxUaW1lID0gbmV3IHdpbmRvdzIuRGF0ZSgpLmdldFRpbWUoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gcmVsZWFzZVNjcm9sbChuZXdFdmVudCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubW91c2V3aGVlbDtcbiAgICBpZiAobmV3RXZlbnQuZGlyZWN0aW9uIDwgMCkge1xuICAgICAgaWYgKHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wICYmIHBhcmFtcy5yZWxlYXNlT25FZGdlcykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN3aXBlci5pc0JlZ2lubmluZyAmJiAhc3dpcGVyLnBhcmFtcy5sb29wICYmIHBhcmFtcy5yZWxlYXNlT25FZGdlcykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBoYW5kbGUoZXZlbnQyKSB7XG4gICAgbGV0IGUgPSBldmVudDI7XG4gICAgbGV0IGRpc2FibGVQYXJlbnRTd2lwZXIgPSB0cnVlO1xuICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICBpZiAoZXZlbnQyLnRhcmdldC5jbG9zZXN0KGAuJHtzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwubm9Nb3VzZXdoZWVsQ2xhc3N9YCkpIHJldHVybjtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm1vdXNld2hlZWw7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBsZXQgdGFyZ2V0RWwgPSBzd2lwZXIuZWw7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZXQgIT09IFwiY29udGFpbmVyXCIpIHtcbiAgICAgIHRhcmdldEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2V0KTtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0RWxDb250YWluc1RhcmdldCA9IHRhcmdldEVsICYmIHRhcmdldEVsLmNvbnRhaW5zKGUudGFyZ2V0KTtcbiAgICBpZiAoIXN3aXBlci5tb3VzZUVudGVyZWQgJiYgIXRhcmdldEVsQ29udGFpbnNUYXJnZXQgJiYgIXBhcmFtcy5yZWxlYXNlT25FZGdlcykgcmV0dXJuIHRydWU7XG4gICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICBsZXQgZGVsdGEgPSAwO1xuICAgIGNvbnN0IHJ0bEZhY3RvciA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyAtMSA6IDE7XG4gICAgY29uc3QgZGF0YSA9IG5vcm1hbGl6ZShlKTtcbiAgICBpZiAocGFyYW1zLmZvcmNlVG9BeGlzKSB7XG4gICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhkYXRhLnBpeGVsWCkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWSkpIGRlbHRhID0gLWRhdGEucGl4ZWxYICogcnRsRmFjdG9yO1xuICAgICAgICBlbHNlIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhkYXRhLnBpeGVsWSkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWCkpIGRlbHRhID0gLWRhdGEucGl4ZWxZO1xuICAgICAgZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsdGEgPSBNYXRoLmFicyhkYXRhLnBpeGVsWCkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWSkgPyAtZGF0YS5waXhlbFggKiBydGxGYWN0b3IgOiAtZGF0YS5waXhlbFk7XG4gICAgfVxuICAgIGlmIChkZWx0YSA9PT0gMCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHBhcmFtcy5pbnZlcnQpIGRlbHRhID0gLWRlbHRhO1xuICAgIGxldCBwb3NpdGlvbnMgPSBzd2lwZXIuZ2V0VHJhbnNsYXRlKCkgKyBkZWx0YSAqIHBhcmFtcy5zZW5zaXRpdml0eTtcbiAgICBpZiAocG9zaXRpb25zID49IHN3aXBlci5taW5UcmFuc2xhdGUoKSkgcG9zaXRpb25zID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgIGlmIChwb3NpdGlvbnMgPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSBwb3NpdGlvbnMgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCk7XG4gICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IHN3aXBlci5wYXJhbXMubG9vcCA/IHRydWUgOiAhKHBvc2l0aW9ucyA9PT0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIHx8IHBvc2l0aW9ucyA9PT0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKTtcbiAgICBpZiAoZGlzYWJsZVBhcmVudFN3aXBlciAmJiBzd2lwZXIucGFyYW1zLm5lc3RlZCkgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuZnJlZU1vZGUgfHwgIXN3aXBlci5wYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCkge1xuICAgICAgY29uc3QgbmV3RXZlbnQgPSB7XG4gICAgICAgIHRpbWU6IG5vdygpLFxuICAgICAgICBkZWx0YTogTWF0aC5hYnMoZGVsdGEpLFxuICAgICAgICBkaXJlY3Rpb246IE1hdGguc2lnbihkZWx0YSksXG4gICAgICAgIHJhdzogZXZlbnQyXG4gICAgICB9O1xuICAgICAgaWYgKHJlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIHJlY2VudFdoZWVsRXZlbnRzLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgICBjb25zdCBwcmV2RXZlbnQgPSByZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggPyByZWNlbnRXaGVlbEV2ZW50c1tyZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggLSAxXSA6IHZvaWQgMDtcbiAgICAgIHJlY2VudFdoZWVsRXZlbnRzLnB1c2gobmV3RXZlbnQpO1xuICAgICAgaWYgKHByZXZFdmVudCkge1xuICAgICAgICBpZiAobmV3RXZlbnQuZGlyZWN0aW9uICE9PSBwcmV2RXZlbnQuZGlyZWN0aW9uIHx8IG5ld0V2ZW50LmRlbHRhID4gcHJldkV2ZW50LmRlbHRhIHx8IG5ld0V2ZW50LnRpbWUgPiBwcmV2RXZlbnQudGltZSArIDE1MCkge1xuICAgICAgICAgIGFuaW1hdGVTbGlkZXIobmV3RXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbmltYXRlU2xpZGVyKG5ld0V2ZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChyZWxlYXNlU2Nyb2xsKG5ld0V2ZW50KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3RXZlbnQgPSB7XG4gICAgICAgIHRpbWU6IG5vdygpLFxuICAgICAgICBkZWx0YTogTWF0aC5hYnMoZGVsdGEpLFxuICAgICAgICBkaXJlY3Rpb246IE1hdGguc2lnbihkZWx0YSlcbiAgICAgIH07XG4gICAgICBjb25zdCBpZ25vcmVXaGVlbEV2ZW50cyA9IGxhc3RFdmVudEJlZm9yZVNuYXAgJiYgbmV3RXZlbnQudGltZSA8IGxhc3RFdmVudEJlZm9yZVNuYXAudGltZSArIDUwMCAmJiBuZXdFdmVudC5kZWx0YSA8PSBsYXN0RXZlbnRCZWZvcmVTbmFwLmRlbHRhICYmIG5ld0V2ZW50LmRpcmVjdGlvbiA9PT0gbGFzdEV2ZW50QmVmb3JlU25hcC5kaXJlY3Rpb247XG4gICAgICBpZiAoIWlnbm9yZVdoZWVsRXZlbnRzKSB7XG4gICAgICAgIGxhc3RFdmVudEJlZm9yZVNuYXAgPSB2b2lkIDA7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHN3aXBlci5nZXRUcmFuc2xhdGUoKSArIGRlbHRhICogcGFyYW1zLnNlbnNpdGl2aXR5O1xuICAgICAgICBjb25zdCB3YXNCZWdpbm5pbmcgPSBzd2lwZXIuaXNCZWdpbm5pbmc7XG4gICAgICAgIGNvbnN0IHdhc0VuZCA9IHN3aXBlci5pc0VuZDtcbiAgICAgICAgaWYgKHBvc2l0aW9uID49IHN3aXBlci5taW5UcmFuc2xhdGUoKSkgcG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gICAgICAgIGlmIChwb3NpdGlvbiA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHBvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShwb3NpdGlvbik7XG4gICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgICAgaWYgKCF3YXNCZWdpbm5pbmcgJiYgc3dpcGVyLmlzQmVnaW5uaW5nIHx8ICF3YXNFbmQgJiYgc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgICAgICAgZGlyZWN0aW9uOiBuZXdFdmVudC5kaXJlY3Rpb24gPCAwID8gXCJuZXh0XCIgOiBcInByZXZcIixcbiAgICAgICAgICAgIGJ5TW91c2V3aGVlbDogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmZyZWVNb2RlLnN0aWNreSkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICB0aW1lb3V0ID0gdm9pZCAwO1xuICAgICAgICAgIGlmIChyZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggPj0gMTUpIHtcbiAgICAgICAgICAgIHJlY2VudFdoZWVsRXZlbnRzLnNoaWZ0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHByZXZFdmVudCA9IHJlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCA/IHJlY2VudFdoZWVsRXZlbnRzW3JlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCAtIDFdIDogdm9pZCAwO1xuICAgICAgICAgIGNvbnN0IGZpcnN0RXZlbnQgPSByZWNlbnRXaGVlbEV2ZW50c1swXTtcbiAgICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5wdXNoKG5ld0V2ZW50KTtcbiAgICAgICAgICBpZiAocHJldkV2ZW50ICYmIChuZXdFdmVudC5kZWx0YSA+IHByZXZFdmVudC5kZWx0YSB8fCBuZXdFdmVudC5kaXJlY3Rpb24gIT09IHByZXZFdmVudC5kaXJlY3Rpb24pKSB7XG4gICAgICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5zcGxpY2UoMCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggPj0gMTUgJiYgbmV3RXZlbnQudGltZSAtIGZpcnN0RXZlbnQudGltZSA8IDUwMCAmJiBmaXJzdEV2ZW50LmRlbHRhIC0gbmV3RXZlbnQuZGVsdGEgPj0gMSAmJiBuZXdFdmVudC5kZWx0YSA8PSA2KSB7XG4gICAgICAgICAgICBjb25zdCBzbmFwVG9UaHJlc2hvbGQgPSBkZWx0YSA+IDAgPyAwLjggOiAwLjI7XG4gICAgICAgICAgICBsYXN0RXZlbnRCZWZvcmVTbmFwID0gbmV3RXZlbnQ7XG4gICAgICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5zcGxpY2UoMCk7XG4gICAgICAgICAgICB0aW1lb3V0ID0gbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLnBhcmFtcykgcmV0dXJuO1xuICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUb0Nsb3Nlc3Qoc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdm9pZCAwLCBzbmFwVG9UaHJlc2hvbGQpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgdGltZW91dCA9IG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5wYXJhbXMpIHJldHVybjtcbiAgICAgICAgICAgICAgY29uc3Qgc25hcFRvVGhyZXNob2xkID0gMC41O1xuICAgICAgICAgICAgICBsYXN0RXZlbnRCZWZvcmVTbmFwID0gbmV3RXZlbnQ7XG4gICAgICAgICAgICAgIHJlY2VudFdoZWVsRXZlbnRzLnNwbGljZSgwKTtcbiAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHZvaWQgMCwgc25hcFRvVGhyZXNob2xkKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghaWdub3JlV2hlZWxFdmVudHMpIGVtaXQoXCJzY3JvbGxcIiwgZSk7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5ICYmIHN3aXBlci5wYXJhbXMuYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbikgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTtcbiAgICAgICAgaWYgKHBhcmFtcy5yZWxlYXNlT25FZGdlcyAmJiAocG9zaXRpb24gPT09IHN3aXBlci5taW5UcmFuc2xhdGUoKSB8fCBwb3NpdGlvbiA9PT0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGV2ZW50czIobWV0aG9kKSB7XG4gICAgbGV0IHRhcmdldEVsID0gc3dpcGVyLmVsO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2V0ICE9PSBcImNvbnRhaW5lclwiKSB7XG4gICAgICB0YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdldCk7XG4gICAgfVxuICAgIHRhcmdldEVsW21ldGhvZF0oXCJtb3VzZWVudGVyXCIsIGhhbmRsZU1vdXNlRW50ZXIpO1xuICAgIHRhcmdldEVsW21ldGhvZF0oXCJtb3VzZWxlYXZlXCIsIGhhbmRsZU1vdXNlTGVhdmUpO1xuICAgIHRhcmdldEVsW21ldGhvZF0oXCJ3aGVlbFwiLCBoYW5kbGUpO1xuICB9XG4gIGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICBzd2lwZXIud3JhcHBlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBoYW5kbGUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkKSByZXR1cm4gZmFsc2U7XG4gICAgZXZlbnRzMihcImFkZEV2ZW50TGlzdGVuZXJcIik7XG4gICAgc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICBzd2lwZXIud3JhcHBlckVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkKSByZXR1cm4gZmFsc2U7XG4gICAgZXZlbnRzMihcInJlbW92ZUV2ZW50TGlzdGVuZXJcIik7XG4gICAgc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCA9IGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIG9uKFwiaW5pdFwiLCAoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIGRpc2FibGUoKTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5lbmFibGVkKSBlbmFibGUoKTtcbiAgfSk7XG4gIG9uKFwiZGVzdHJveVwiLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgZW5hYmxlKCk7XG4gICAgfVxuICAgIGlmIChzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkKSBkaXNhYmxlKCk7XG4gIH0pO1xuICBPYmplY3QuYXNzaWduKHN3aXBlci5tb3VzZXdoZWVsLCB7XG4gICAgZW5hYmxlLFxuICAgIGRpc2FibGVcbiAgfSk7XG59XG52YXIgaW5pdF9tb3VzZXdoZWVsID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9tb3VzZXdoZWVsLm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9jcmVhdGUtZWxlbWVudC1pZi1ub3QtZGVmaW5lZC5tanNcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQoc3dpcGVyLCBvcmlnaW5hbFBhcmFtcywgcGFyYW1zLCBjaGVja1Byb3BzKSB7XG4gIGlmIChzd2lwZXIucGFyYW1zLmNyZWF0ZUVsZW1lbnRzKSB7XG4gICAgT2JqZWN0LmtleXMoY2hlY2tQcm9wcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoIXBhcmFtc1trZXldICYmIHBhcmFtcy5hdXRvID09PSB0cnVlKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZWxlbWVudENoaWxkcmVuKHN3aXBlci5lbCwgYC4ke2NoZWNrUHJvcHNba2V5XX1gKVswXTtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQyKFwiZGl2XCIsIGNoZWNrUHJvcHNba2V5XSk7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBjaGVja1Byb3BzW2tleV07XG4gICAgICAgICAgc3dpcGVyLmVsLmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJhbXNba2V5XSA9IGVsZW1lbnQ7XG4gICAgICAgIG9yaWdpbmFsUGFyYW1zW2tleV0gPSBlbGVtZW50O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBwYXJhbXM7XG59XG52YXIgaW5pdF9jcmVhdGVfZWxlbWVudF9pZl9ub3RfZGVmaW5lZCA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9jcmVhdGUtZWxlbWVudC1pZi1ub3QtZGVmaW5lZC5tanNcIigpIHtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvbmF2aWdhdGlvbi5tanNcbmZ1bmN0aW9uIE5hdmlnYXRpb24oX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBleHRlbmRQYXJhbXMsXG4gICAgb24sXG4gICAgZW1pdFxuICB9ID0gX3JlZjtcbiAgZXh0ZW5kUGFyYW1zKHtcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6IG51bGwsXG4gICAgICBwcmV2RWw6IG51bGwsXG4gICAgICBoaWRlT25DbGljazogZmFsc2UsXG4gICAgICBkaXNhYmxlZENsYXNzOiBcInN3aXBlci1idXR0b24tZGlzYWJsZWRcIixcbiAgICAgIGhpZGRlbkNsYXNzOiBcInN3aXBlci1idXR0b24taGlkZGVuXCIsXG4gICAgICBsb2NrQ2xhc3M6IFwic3dpcGVyLWJ1dHRvbi1sb2NrXCIsXG4gICAgICBuYXZpZ2F0aW9uRGlzYWJsZWRDbGFzczogXCJzd2lwZXItbmF2aWdhdGlvbi1kaXNhYmxlZFwiXG4gICAgfVxuICB9KTtcbiAgc3dpcGVyLm5hdmlnYXRpb24gPSB7XG4gICAgbmV4dEVsOiBudWxsLFxuICAgIHByZXZFbDogbnVsbFxuICB9O1xuICBmdW5jdGlvbiBnZXRFbChlbCkge1xuICAgIGxldCByZXM7XG4gICAgaWYgKGVsICYmIHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIiAmJiBzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgICByZXMgPSBzd2lwZXIuZWwucXVlcnlTZWxlY3RvcihlbCkgfHwgc3dpcGVyLmhvc3RFbC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICAgIGlmIChyZXMpIHJldHVybiByZXM7XG4gICAgfVxuICAgIGlmIChlbCkge1xuICAgICAgaWYgKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikgcmVzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWwpXTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIiAmJiByZXMgJiYgcmVzLmxlbmd0aCA+IDEgJiYgc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoZWwpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXMgPSBzd2lwZXIuZWwucXVlcnlTZWxlY3RvcihlbCk7XG4gICAgICB9IGVsc2UgaWYgKHJlcyAmJiByZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJlcyA9IHJlc1swXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVsICYmICFyZXMpIHJldHVybiBlbDtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGZ1bmN0aW9uIHRvZ2dsZUVsKGVsLCBkaXNhYmxlZCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbjtcbiAgICBlbCA9IG1ha2VFbGVtZW50c0FycmF5KGVsKTtcbiAgICBlbC5mb3JFYWNoKChzdWJFbCkgPT4ge1xuICAgICAgaWYgKHN1YkVsKSB7XG4gICAgICAgIHN1YkVsLmNsYXNzTGlzdFtkaXNhYmxlZCA/IFwiYWRkXCIgOiBcInJlbW92ZVwiXSguLi5wYXJhbXMuZGlzYWJsZWRDbGFzcy5zcGxpdChcIiBcIikpO1xuICAgICAgICBpZiAoc3ViRWwudGFnTmFtZSA9PT0gXCJCVVRUT05cIikgc3ViRWwuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgICAgIHN1YkVsLmNsYXNzTGlzdFtzd2lwZXIuaXNMb2NrZWQgPyBcImFkZFwiIDogXCJyZW1vdmVcIl0ocGFyYW1zLmxvY2tDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiB1cGRhdGUyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIG5leHRFbCxcbiAgICAgIHByZXZFbFxuICAgIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICB0b2dnbGVFbChwcmV2RWwsIGZhbHNlKTtcbiAgICAgIHRvZ2dsZUVsKG5leHRFbCwgZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0b2dnbGVFbChwcmV2RWwsIHN3aXBlci5pc0JlZ2lubmluZyAmJiAhc3dpcGVyLnBhcmFtcy5yZXdpbmQpO1xuICAgIHRvZ2dsZUVsKG5leHRFbCwgc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLnJld2luZCk7XG4gIH1cbiAgZnVuY3Rpb24gb25QcmV2Q2xpY2soZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmxvb3AgJiYgIXN3aXBlci5wYXJhbXMucmV3aW5kKSByZXR1cm47XG4gICAgc3dpcGVyLnNsaWRlUHJldigpO1xuICAgIGVtaXQoXCJuYXZpZ2F0aW9uUHJldlwiKTtcbiAgfVxuICBmdW5jdGlvbiBvbk5leHRDbGljayhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMubG9vcCAmJiAhc3dpcGVyLnBhcmFtcy5yZXdpbmQpIHJldHVybjtcbiAgICBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgZW1pdChcIm5hdmlnYXRpb25OZXh0XCIpO1xuICB9XG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uO1xuICAgIHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbiA9IGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQoc3dpcGVyLCBzd2lwZXIub3JpZ2luYWxQYXJhbXMubmF2aWdhdGlvbiwgc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLCB7XG4gICAgICBuZXh0RWw6IFwic3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gICAgICBwcmV2RWw6IFwic3dpcGVyLWJ1dHRvbi1wcmV2XCJcbiAgICB9KTtcbiAgICBpZiAoIShwYXJhbXMubmV4dEVsIHx8IHBhcmFtcy5wcmV2RWwpKSByZXR1cm47XG4gICAgbGV0IG5leHRFbCA9IGdldEVsKHBhcmFtcy5uZXh0RWwpO1xuICAgIGxldCBwcmV2RWwgPSBnZXRFbChwYXJhbXMucHJldkVsKTtcbiAgICBPYmplY3QuYXNzaWduKHN3aXBlci5uYXZpZ2F0aW9uLCB7XG4gICAgICBuZXh0RWwsXG4gICAgICBwcmV2RWxcbiAgICB9KTtcbiAgICBuZXh0RWwgPSBtYWtlRWxlbWVudHNBcnJheShuZXh0RWwpO1xuICAgIHByZXZFbCA9IG1ha2VFbGVtZW50c0FycmF5KHByZXZFbCk7XG4gICAgY29uc3QgaW5pdEJ1dHRvbiA9IChlbCwgZGlyKSA9PiB7XG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRpciA9PT0gXCJuZXh0XCIgPyBvbk5leHRDbGljayA6IG9uUHJldkNsaWNrKTtcbiAgICAgIH1cbiAgICAgIGlmICghc3dpcGVyLmVuYWJsZWQgJiYgZWwpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCguLi5wYXJhbXMubG9ja0NsYXNzLnNwbGl0KFwiIFwiKSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBuZXh0RWwuZm9yRWFjaCgoZWwpID0+IGluaXRCdXR0b24oZWwsIFwibmV4dFwiKSk7XG4gICAgcHJldkVsLmZvckVhY2goKGVsKSA9PiBpbml0QnV0dG9uKGVsLCBcInByZXZcIikpO1xuICB9XG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgbGV0IHtcbiAgICAgIG5leHRFbCxcbiAgICAgIHByZXZFbFxuICAgIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcbiAgICBuZXh0RWwgPSBtYWtlRWxlbWVudHNBcnJheShuZXh0RWwpO1xuICAgIHByZXZFbCA9IG1ha2VFbGVtZW50c0FycmF5KHByZXZFbCk7XG4gICAgY29uc3QgZGVzdHJveUJ1dHRvbiA9IChlbCwgZGlyKSA9PiB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGlyID09PSBcIm5leHRcIiA/IG9uTmV4dENsaWNrIDogb25QcmV2Q2xpY2spO1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5zd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uZGlzYWJsZWRDbGFzcy5zcGxpdChcIiBcIikpO1xuICAgIH07XG4gICAgbmV4dEVsLmZvckVhY2goKGVsKSA9PiBkZXN0cm95QnV0dG9uKGVsLCBcIm5leHRcIikpO1xuICAgIHByZXZFbC5mb3JFYWNoKChlbCkgPT4gZGVzdHJveUJ1dHRvbihlbCwgXCJwcmV2XCIpKTtcbiAgfVxuICBvbihcImluaXRcIiwgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIGRpc2FibGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdCgpO1xuICAgICAgdXBkYXRlMigpO1xuICAgIH1cbiAgfSk7XG4gIG9uKFwidG9FZGdlIGZyb21FZGdlIGxvY2sgdW5sb2NrXCIsICgpID0+IHtcbiAgICB1cGRhdGUyKCk7XG4gIH0pO1xuICBvbihcImRlc3Ryb3lcIiwgKCkgPT4ge1xuICAgIGRlc3Ryb3koKTtcbiAgfSk7XG4gIG9uKFwiZW5hYmxlIGRpc2FibGVcIiwgKCkgPT4ge1xuICAgIGxldCB7XG4gICAgICBuZXh0RWwsXG4gICAgICBwcmV2RWxcbiAgICB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgbmV4dEVsID0gbWFrZUVsZW1lbnRzQXJyYXkobmV4dEVsKTtcbiAgICBwcmV2RWwgPSBtYWtlRWxlbWVudHNBcnJheShwcmV2RWwpO1xuICAgIGlmIChzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgdXBkYXRlMigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBbLi4ubmV4dEVsLCAuLi5wcmV2RWxdLmZpbHRlcigoZWwpID0+ICEhZWwpLmZvckVhY2goKGVsKSA9PiBlbC5jbGFzc0xpc3QuYWRkKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5sb2NrQ2xhc3MpKTtcbiAgfSk7XG4gIG9uKFwiY2xpY2tcIiwgKF9zLCBlKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgIG5leHRFbCxcbiAgICAgIHByZXZFbFxuICAgIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcbiAgICBuZXh0RWwgPSBtYWtlRWxlbWVudHNBcnJheShuZXh0RWwpO1xuICAgIHByZXZFbCA9IG1ha2VFbGVtZW50c0FycmF5KHByZXZFbCk7XG4gICAgY29uc3QgdGFyZ2V0RWwgPSBlLnRhcmdldDtcbiAgICBsZXQgdGFyZ2V0SXNCdXR0b24gPSBwcmV2RWwuaW5jbHVkZXModGFyZ2V0RWwpIHx8IG5leHRFbC5pbmNsdWRlcyh0YXJnZXRFbCk7XG4gICAgaWYgKHN3aXBlci5pc0VsZW1lbnQgJiYgIXRhcmdldElzQnV0dG9uKSB7XG4gICAgICBjb25zdCBwYXRoID0gZS5wYXRoIHx8IGUuY29tcG9zZWRQYXRoICYmIGUuY29tcG9zZWRQYXRoKCk7XG4gICAgICBpZiAocGF0aCkge1xuICAgICAgICB0YXJnZXRJc0J1dHRvbiA9IHBhdGguZmluZCgocGF0aEVsKSA9PiBuZXh0RWwuaW5jbHVkZXMocGF0aEVsKSB8fCBwcmV2RWwuaW5jbHVkZXMocGF0aEVsKSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZU9uQ2xpY2sgJiYgIXRhcmdldElzQnV0dG9uKSB7XG4gICAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24gJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5jbGlja2FibGUgJiYgKHN3aXBlci5wYWdpbmF0aW9uLmVsID09PSB0YXJnZXRFbCB8fCBzd2lwZXIucGFnaW5hdGlvbi5lbC5jb250YWlucyh0YXJnZXRFbCkpKSByZXR1cm47XG4gICAgICBsZXQgaXNIaWRkZW47XG4gICAgICBpZiAobmV4dEVsLmxlbmd0aCkge1xuICAgICAgICBpc0hpZGRlbiA9IG5leHRFbFswXS5jbGFzc0xpc3QuY29udGFpbnMoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgIH0gZWxzZSBpZiAocHJldkVsLmxlbmd0aCkge1xuICAgICAgICBpc0hpZGRlbiA9IHByZXZFbFswXS5jbGFzc0xpc3QuY29udGFpbnMoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0hpZGRlbiA9PT0gdHJ1ZSkge1xuICAgICAgICBlbWl0KFwibmF2aWdhdGlvblNob3dcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbWl0KFwibmF2aWdhdGlvbkhpZGVcIik7XG4gICAgICB9XG4gICAgICBbLi4ubmV4dEVsLCAuLi5wcmV2RWxdLmZpbHRlcigoZWwpID0+ICEhZWwpLmZvckVhY2goKGVsKSA9PiBlbC5jbGFzc0xpc3QudG9nZ2xlKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcykpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGVuYWJsZSA9ICgpID0+IHtcbiAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5zd2lwZXIucGFyYW1zLm5hdmlnYXRpb24ubmF2aWdhdGlvbkRpc2FibGVkQ2xhc3Muc3BsaXQoXCIgXCIpKTtcbiAgICBpbml0KCk7XG4gICAgdXBkYXRlMigpO1xuICB9O1xuICBjb25zdCBkaXNhYmxlID0gKCkgPT4ge1xuICAgIHN3aXBlci5lbC5jbGFzc0xpc3QuYWRkKC4uLnN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5uYXZpZ2F0aW9uRGlzYWJsZWRDbGFzcy5zcGxpdChcIiBcIikpO1xuICAgIGRlc3Ryb3koKTtcbiAgfTtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIubmF2aWdhdGlvbiwge1xuICAgIGVuYWJsZSxcbiAgICBkaXNhYmxlLFxuICAgIHVwZGF0ZTogdXBkYXRlMixcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfSk7XG59XG52YXIgaW5pdF9uYXZpZ2F0aW9uID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9uYXZpZ2F0aW9uLm1qc1wiKCkge1xuICAgIGluaXRfY3JlYXRlX2VsZW1lbnRfaWZfbm90X2RlZmluZWQoKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9jbGFzc2VzLXRvLXNlbGVjdG9yLm1qc1xudmFyIGluaXRfY2xhc3Nlc190b19zZWxlY3RvciA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9jbGFzc2VzLXRvLXNlbGVjdG9yLm1qc1wiKCkge1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3BhZ2luYXRpb24ubWpzXG52YXIgaW5pdF9wYWdpbmF0aW9uID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9wYWdpbmF0aW9uLm1qc1wiKCkge1xuICAgIGluaXRfY2xhc3Nlc190b19zZWxlY3RvcigpO1xuICAgIGluaXRfY3JlYXRlX2VsZW1lbnRfaWZfbm90X2RlZmluZWQoKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvc2Nyb2xsYmFyLm1qc1xudmFyIGluaXRfc2Nyb2xsYmFyID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9zY3JvbGxiYXIubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgICBpbml0X2NyZWF0ZV9lbGVtZW50X2lmX25vdF9kZWZpbmVkKCk7XG4gICAgaW5pdF9jbGFzc2VzX3RvX3NlbGVjdG9yKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvcGFyYWxsYXgubWpzXG52YXIgaW5pdF9wYXJhbGxheCA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvcGFyYWxsYXgubWpzXCIoKSB7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3pvb20ubWpzXG52YXIgaW5pdF96b29tID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy96b29tLm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvY29udHJvbGxlci5tanNcbnZhciBpbml0X2NvbnRyb2xsZXIgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2NvbnRyb2xsZXIubWpzXCIoKSB7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2ExMXkubWpzXG52YXIgaW5pdF9hMTF5ID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9hMTF5Lm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgICBpbml0X2NsYXNzZXNfdG9fc2VsZWN0b3IoKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvaGlzdG9yeS5tanNcbnZhciBpbml0X2hpc3RvcnkgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2hpc3RvcnkubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2hhc2gtbmF2aWdhdGlvbi5tanNcbnZhciBpbml0X2hhc2hfbmF2aWdhdGlvbiA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvaGFzaC1uYXZpZ2F0aW9uLm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvYXV0b3BsYXkubWpzXG52YXIgaW5pdF9hdXRvcGxheSA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvYXV0b3BsYXkubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3RodW1icy5tanNcbnZhciBpbml0X3RodW1icyA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvdGh1bWJzLm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZnJlZS1tb2RlLm1qc1xudmFyIGluaXRfZnJlZV9tb2RlID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9mcmVlLW1vZGUubWpzXCIoKSB7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2dyaWQubWpzXG52YXIgaW5pdF9ncmlkID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9ncmlkLm1qc1wiKCkge1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL21hbmlwdWxhdGlvbi5tanNcbmZ1bmN0aW9uIGFwcGVuZFNsaWRlKHNsaWRlcykge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHNsaWRlc0VsXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICB9XG4gIGNvbnN0IGFwcGVuZEVsZW1lbnQgPSAoc2xpZGVFbCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygc2xpZGVFbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgdGVtcERPTSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0ZW1wRE9NLmlubmVySFRNTCA9IHNsaWRlRWw7XG4gICAgICBzbGlkZXNFbC5hcHBlbmQodGVtcERPTS5jaGlsZHJlblswXSk7XG4gICAgICB0ZW1wRE9NLmlubmVySFRNTCA9IFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsaWRlc0VsLmFwcGVuZChzbGlkZUVsKTtcbiAgICB9XG4gIH07XG4gIGlmICh0eXBlb2Ygc2xpZGVzID09PSBcIm9iamVjdFwiICYmIFwibGVuZ3RoXCIgaW4gc2xpZGVzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChzbGlkZXNbaV0pIGFwcGVuZEVsZW1lbnQoc2xpZGVzW2ldKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYXBwZW5kRWxlbWVudChzbGlkZXMpO1xuICB9XG4gIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgfVxuICBpZiAoIXBhcmFtcy5vYnNlcnZlciB8fCBzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgc3dpcGVyLnVwZGF0ZSgpO1xuICB9XG59XG5mdW5jdGlvbiBwcmVwZW5kU2xpZGUoc2xpZGVzKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgYWN0aXZlSW5kZXgsXG4gICAgc2xpZGVzRWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gIH1cbiAgbGV0IG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXggKyAxO1xuICBjb25zdCBwcmVwZW5kRWxlbWVudCA9IChzbGlkZUVsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBzbGlkZUVsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCB0ZW1wRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRlbXBET00uaW5uZXJIVE1MID0gc2xpZGVFbDtcbiAgICAgIHNsaWRlc0VsLnByZXBlbmQodGVtcERPTS5jaGlsZHJlblswXSk7XG4gICAgICB0ZW1wRE9NLmlubmVySFRNTCA9IFwiXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsaWRlc0VsLnByZXBlbmQoc2xpZGVFbCk7XG4gICAgfVxuICB9O1xuICBpZiAodHlwZW9mIHNsaWRlcyA9PT0gXCJvYmplY3RcIiAmJiBcImxlbmd0aFwiIGluIHNsaWRlcykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoc2xpZGVzW2ldKSBwcmVwZW5kRWxlbWVudChzbGlkZXNbaV0pO1xuICAgIH1cbiAgICBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgc2xpZGVzLmxlbmd0aDtcbiAgfSBlbHNlIHtcbiAgICBwcmVwZW5kRWxlbWVudChzbGlkZXMpO1xuICB9XG4gIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgfVxuICBpZiAoIXBhcmFtcy5vYnNlcnZlciB8fCBzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgc3dpcGVyLnVwZGF0ZSgpO1xuICB9XG4gIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG59XG5mdW5jdGlvbiBhZGRTbGlkZShpbmRleCwgc2xpZGVzKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgYWN0aXZlSW5kZXgsXG4gICAgc2xpZGVzRWxcbiAgfSA9IHN3aXBlcjtcbiAgbGV0IGFjdGl2ZUluZGV4QnVmZmVyID0gYWN0aXZlSW5kZXg7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIGFjdGl2ZUluZGV4QnVmZmVyIC09IHN3aXBlci5sb29wZWRTbGlkZXM7XG4gICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICB9XG4gIGNvbnN0IGJhc2VMZW5ndGggPSBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgaWYgKGluZGV4IDw9IDApIHtcbiAgICBzd2lwZXIucHJlcGVuZFNsaWRlKHNsaWRlcyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChpbmRleCA+PSBiYXNlTGVuZ3RoKSB7XG4gICAgc3dpcGVyLmFwcGVuZFNsaWRlKHNsaWRlcyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4QnVmZmVyID4gaW5kZXggPyBhY3RpdmVJbmRleEJ1ZmZlciArIDEgOiBhY3RpdmVJbmRleEJ1ZmZlcjtcbiAgY29uc3Qgc2xpZGVzQnVmZmVyID0gW107XG4gIGZvciAobGV0IGkgPSBiYXNlTGVuZ3RoIC0gMTsgaSA+PSBpbmRleDsgaSAtPSAxKSB7XG4gICAgY29uc3QgY3VycmVudFNsaWRlID0gc3dpcGVyLnNsaWRlc1tpXTtcbiAgICBjdXJyZW50U2xpZGUucmVtb3ZlKCk7XG4gICAgc2xpZGVzQnVmZmVyLnVuc2hpZnQoY3VycmVudFNsaWRlKTtcbiAgfVxuICBpZiAodHlwZW9mIHNsaWRlcyA9PT0gXCJvYmplY3RcIiAmJiBcImxlbmd0aFwiIGluIHNsaWRlcykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoc2xpZGVzW2ldKSBzbGlkZXNFbC5hcHBlbmQoc2xpZGVzW2ldKTtcbiAgICB9XG4gICAgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleEJ1ZmZlciA+IGluZGV4ID8gYWN0aXZlSW5kZXhCdWZmZXIgKyBzbGlkZXMubGVuZ3RoIDogYWN0aXZlSW5kZXhCdWZmZXI7XG4gIH0gZWxzZSB7XG4gICAgc2xpZGVzRWwuYXBwZW5kKHNsaWRlcyk7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNCdWZmZXIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzbGlkZXNFbC5hcHBlbmQoc2xpZGVzQnVmZmVyW2ldKTtcbiAgfVxuICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gIH1cbiAgaWYgKCFwYXJhbXMub2JzZXJ2ZXIgfHwgc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHN3aXBlci51cGRhdGUoKTtcbiAgfVxuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCArIHN3aXBlci5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCwgMCwgZmFsc2UpO1xuICB9XG59XG5mdW5jdGlvbiByZW1vdmVTbGlkZShzbGlkZXNJbmRleGVzKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgYWN0aXZlSW5kZXhcbiAgfSA9IHN3aXBlcjtcbiAgbGV0IGFjdGl2ZUluZGV4QnVmZmVyID0gYWN0aXZlSW5kZXg7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIGFjdGl2ZUluZGV4QnVmZmVyIC09IHN3aXBlci5sb29wZWRTbGlkZXM7XG4gICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gIH1cbiAgbGV0IG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXhCdWZmZXI7XG4gIGxldCBpbmRleFRvUmVtb3ZlO1xuICBpZiAodHlwZW9mIHNsaWRlc0luZGV4ZXMgPT09IFwib2JqZWN0XCIgJiYgXCJsZW5ndGhcIiBpbiBzbGlkZXNJbmRleGVzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNJbmRleGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpbmRleFRvUmVtb3ZlID0gc2xpZGVzSW5kZXhlc1tpXTtcbiAgICAgIGlmIChzd2lwZXIuc2xpZGVzW2luZGV4VG9SZW1vdmVdKSBzd2lwZXIuc2xpZGVzW2luZGV4VG9SZW1vdmVdLnJlbW92ZSgpO1xuICAgICAgaWYgKGluZGV4VG9SZW1vdmUgPCBuZXdBY3RpdmVJbmRleCkgbmV3QWN0aXZlSW5kZXggLT0gMTtcbiAgICB9XG4gICAgbmV3QWN0aXZlSW5kZXggPSBNYXRoLm1heChuZXdBY3RpdmVJbmRleCwgMCk7XG4gIH0gZWxzZSB7XG4gICAgaW5kZXhUb1JlbW92ZSA9IHNsaWRlc0luZGV4ZXM7XG4gICAgaWYgKHN3aXBlci5zbGlkZXNbaW5kZXhUb1JlbW92ZV0pIHN3aXBlci5zbGlkZXNbaW5kZXhUb1JlbW92ZV0ucmVtb3ZlKCk7XG4gICAgaWYgKGluZGV4VG9SZW1vdmUgPCBuZXdBY3RpdmVJbmRleCkgbmV3QWN0aXZlSW5kZXggLT0gMTtcbiAgICBuZXdBY3RpdmVJbmRleCA9IE1hdGgubWF4KG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgfVxuICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gIH1cbiAgaWYgKCFwYXJhbXMub2JzZXJ2ZXIgfHwgc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHN3aXBlci51cGRhdGUoKTtcbiAgfVxuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCArIHN3aXBlci5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCwgMCwgZmFsc2UpO1xuICB9XG59XG5mdW5jdGlvbiByZW1vdmVBbGxTbGlkZXMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHNsaWRlc0luZGV4ZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgc2xpZGVzSW5kZXhlcy5wdXNoKGkpO1xuICB9XG4gIHN3aXBlci5yZW1vdmVTbGlkZShzbGlkZXNJbmRleGVzKTtcbn1cbmZ1bmN0aW9uIE1hbmlwdWxhdGlvbihfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyXG4gIH0gPSBfcmVmO1xuICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgIGFwcGVuZFNsaWRlOiBhcHBlbmRTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgcHJlcGVuZFNsaWRlOiBwcmVwZW5kU2xpZGUuYmluZChzd2lwZXIpLFxuICAgIGFkZFNsaWRlOiBhZGRTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgcmVtb3ZlU2xpZGU6IHJlbW92ZVNsaWRlLmJpbmQoc3dpcGVyKSxcbiAgICByZW1vdmVBbGxTbGlkZXM6IHJlbW92ZUFsbFNsaWRlcy5iaW5kKHN3aXBlcilcbiAgfSk7XG59XG52YXIgaW5pdF9tYW5pcHVsYXRpb24gPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL21hbmlwdWxhdGlvbi5tanNcIigpIHtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2VmZmVjdC1pbml0Lm1qc1xudmFyIGluaXRfZWZmZWN0X2luaXQgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvZWZmZWN0LWluaXQubWpzXCIoKSB7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtdGFyZ2V0Lm1qc1xudmFyIGluaXRfZWZmZWN0X3RhcmdldCA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtdGFyZ2V0Lm1qc1wiKCkge1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2VmZmVjdC12aXJ0dWFsLXRyYW5zaXRpb24tZW5kLm1qc1xudmFyIGluaXRfZWZmZWN0X3ZpcnR1YWxfdHJhbnNpdGlvbl9lbmQgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvZWZmZWN0LXZpcnR1YWwtdHJhbnNpdGlvbi1lbmQubWpzXCIoKSB7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1mYWRlLm1qc1xudmFyIGluaXRfZWZmZWN0X2ZhZGUgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1mYWRlLm1qc1wiKCkge1xuICAgIGluaXRfZWZmZWN0X2luaXQoKTtcbiAgICBpbml0X2VmZmVjdF90YXJnZXQoKTtcbiAgICBpbml0X2VmZmVjdF92aXJ0dWFsX3RyYW5zaXRpb25fZW5kKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1jdWJlLm1qc1xudmFyIGluaXRfZWZmZWN0X2N1YmUgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1jdWJlLm1qc1wiKCkge1xuICAgIGluaXRfZWZmZWN0X2luaXQoKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9jcmVhdGUtc2hhZG93Lm1qc1xudmFyIGluaXRfY3JlYXRlX3NoYWRvdyA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9jcmVhdGUtc2hhZG93Lm1qc1wiKCkge1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtZmxpcC5tanNcbnZhciBpbml0X2VmZmVjdF9mbGlwID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtZmxpcC5tanNcIigpIHtcbiAgICBpbml0X2NyZWF0ZV9zaGFkb3coKTtcbiAgICBpbml0X2VmZmVjdF9pbml0KCk7XG4gICAgaW5pdF9lZmZlY3RfdGFyZ2V0KCk7XG4gICAgaW5pdF9lZmZlY3RfdmlydHVhbF90cmFuc2l0aW9uX2VuZCgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtY292ZXJmbG93Lm1qc1xudmFyIGluaXRfZWZmZWN0X2NvdmVyZmxvdyA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWNvdmVyZmxvdy5tanNcIigpIHtcbiAgICBpbml0X2NyZWF0ZV9zaGFkb3coKTtcbiAgICBpbml0X2VmZmVjdF9pbml0KCk7XG4gICAgaW5pdF9lZmZlY3RfdGFyZ2V0KCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1jcmVhdGl2ZS5tanNcbnZhciBpbml0X2VmZmVjdF9jcmVhdGl2ZSA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWNyZWF0aXZlLm1qc1wiKCkge1xuICAgIGluaXRfY3JlYXRlX3NoYWRvdygpO1xuICAgIGluaXRfZWZmZWN0X2luaXQoKTtcbiAgICBpbml0X2VmZmVjdF90YXJnZXQoKTtcbiAgICBpbml0X2VmZmVjdF92aXJ0dWFsX3RyYW5zaXRpb25fZW5kKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1jYXJkcy5tanNcbnZhciBpbml0X2VmZmVjdF9jYXJkcyA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWNhcmRzLm1qc1wiKCkge1xuICAgIGluaXRfY3JlYXRlX3NoYWRvdygpO1xuICAgIGluaXRfZWZmZWN0X2luaXQoKTtcbiAgICBpbml0X2VmZmVjdF90YXJnZXQoKTtcbiAgICBpbml0X2VmZmVjdF92aXJ0dWFsX3RyYW5zaXRpb25fZW5kKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2luZGV4Lm1qc1xudmFyIGluaXRfbW9kdWxlcyA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvaW5kZXgubWpzXCIoKSB7XG4gICAgaW5pdF92aXJ0dWFsKCk7XG4gICAgaW5pdF9rZXlib2FyZCgpO1xuICAgIGluaXRfbW91c2V3aGVlbCgpO1xuICAgIGluaXRfbmF2aWdhdGlvbigpO1xuICAgIGluaXRfcGFnaW5hdGlvbigpO1xuICAgIGluaXRfc2Nyb2xsYmFyKCk7XG4gICAgaW5pdF9wYXJhbGxheCgpO1xuICAgIGluaXRfem9vbSgpO1xuICAgIGluaXRfY29udHJvbGxlcigpO1xuICAgIGluaXRfYTExeSgpO1xuICAgIGluaXRfaGlzdG9yeSgpO1xuICAgIGluaXRfaGFzaF9uYXZpZ2F0aW9uKCk7XG4gICAgaW5pdF9hdXRvcGxheSgpO1xuICAgIGluaXRfdGh1bWJzKCk7XG4gICAgaW5pdF9mcmVlX21vZGUoKTtcbiAgICBpbml0X2dyaWQoKTtcbiAgICBpbml0X21hbmlwdWxhdGlvbigpO1xuICAgIGluaXRfZWZmZWN0X2ZhZGUoKTtcbiAgICBpbml0X2VmZmVjdF9jdWJlKCk7XG4gICAgaW5pdF9lZmZlY3RfZmxpcCgpO1xuICAgIGluaXRfZWZmZWN0X2NvdmVyZmxvdygpO1xuICAgIGluaXRfZWZmZWN0X2NyZWF0aXZlKCk7XG4gICAgaW5pdF9lZmZlY3RfY2FyZHMoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2V4dGVuc2lvbnMvc3dpcGVyL3N3aXBlci5leHRlbnNpb24udHNcbmZ1bmN0aW9uIGluaXRpYWxpemVTd2lwZXIoe1xuICBpZCxcbiAgd2lkZ2V0U2VsZWN0b3IsXG4gIHByZXZCdXR0b24gPSBcInN3aXBlci1idXR0b24tcHJldlwiLFxuICBuZXh0QnV0dG9uID0gXCJzd2lwZXItYnV0dG9uLW5leHRcIixcbiAgcGFyYW1zT3ZlcnJpZGVzXG59KSB7XG4gIGNvbnN0IHByZXYgPSB3aWRnZXRTZWxlY3Rvci5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoYC4ke3ByZXZCdXR0b259YCk7XG4gIGNvbnN0IG5leHQgPSB3aWRnZXRTZWxlY3Rvci5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoYC4ke25leHRCdXR0b259YCk7XG4gIGlmICghc3dpcGVyQ29udGFpbmVyW2lkXSkge1xuICAgIHN3aXBlckNvbnRhaW5lcltpZF0gPSB7fTtcbiAgfVxuICBjb25zdCBzd2lwZXJJbnN0YW5jZSA9IHN3aXBlckNvbnRhaW5lcltpZF0/Lmluc3RhbmNlO1xuICBpZiAoc3dpcGVySW5zdGFuY2UpIHtcbiAgICBpZiAoIXN3aXBlckluc3RhbmNlLnBhcmFtcz8uZW5hYmxlZCkge1xuICAgICAgZW5hYmxlU3dpcGVyKGlkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpcGVySW5zdGFuY2UuZGVzdHJveSh0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBzd2lwZXJDb250YWluZXJbaWRdID0geyBwYWdlSW5kZXg6IDEgfTtcbiAgfVxuICBzd2lwZXJDb250YWluZXJbaWRdLmluc3RhbmNlID0gbmV3IFN3aXBlcih3aWRnZXRTZWxlY3Rvciwge1xuICAgIG1vZHVsZXM6IFtOYXZpZ2F0aW9uLCBNYW5pcHVsYXRpb24sIEtleWJvYXJkLCBNb3VzZXdoZWVsXSxcbiAgICBzcGFjZUJldHdlZW46IDEwLFxuICAgIG9ic2VydmVyOiB0cnVlLFxuICAgIGdyYWJDdXJzb3I6IHRydWUsXG4gICAgYWxsb3dUb3VjaE1vdmU6IHRydWUsXG4gICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgIG5vcm1hbGl6ZVNsaWRlSW5kZXg6IHRydWUsXG4gICAgd2F0Y2hPdmVyZmxvdzogdHJ1ZSxcbiAgICBtb3VzZXdoZWVsOiB7XG4gICAgICBlbmFibGVkOiBmYWxzZVxuICAgIH0sXG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgZW5hYmxlZDogISEocHJldiAmJiBuZXh0KSxcbiAgICAgIG5leHRFbDogbmV4dCxcbiAgICAgIHByZXZFbDogcHJldlxuICAgIH0sXG4gICAgcmVzaXplT2JzZXJ2ZXI6IHRydWUsXG4gICAgLi4ucGFyYW1zT3ZlcnJpZGVzXG4gIH0pO1xufVxuZnVuY3Rpb24gcmVmcmVzaFN3aXBlcihpZCkge1xuICBpZiAoc3dpcGVyQ29udGFpbmVyW2lkXT8uaW5zdGFuY2UpIHtcbiAgICBzd2lwZXJDb250YWluZXJbaWRdLmluc3RhbmNlLnVwZGF0ZSgpO1xuICB9XG59XG5mdW5jdGlvbiBnZXRTd2lwZXJJbmRleGZvclRpbGUoc3dpcGVyU2VsZWN0b3IsIHRpbGVJZCwgbG9va3VwQXR0cikge1xuICBjb25zdCBzbGlkZUVsZW1lbnRzID0gc3dpcGVyU2VsZWN0b3IucXVlcnlTZWxlY3RvckFsbChcIi5zd2lwZXItc2xpZGVcIik7XG4gIGNvbnN0IGluZGV4ID0gKCgpID0+IHtcbiAgICBpZiAobG9va3VwQXR0cikge1xuICAgICAgcmV0dXJuIEFycmF5LmZyb20oc2xpZGVFbGVtZW50cykuZmluZEluZGV4KFxuICAgICAgICAoZWxlbWVudCkgPT4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpID09PSB0aWxlSWQgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUobG9va3VwQXR0ci5uYW1lKSA9PT0gbG9va3VwQXR0ci52YWx1ZVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc2xpZGVFbGVtZW50cykuZmluZEluZGV4KChlbGVtZW50KSA9PiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikgPT09IHRpbGVJZCk7XG4gIH0pKCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyAwIDogaW5kZXg7XG59XG5mdW5jdGlvbiBkaXNhYmxlU3dpcGVyKGlkKSB7XG4gIHN3aXBlckNvbnRhaW5lcltpZF0/Lmluc3RhbmNlPy5kaXNhYmxlKCk7XG59XG5mdW5jdGlvbiBlbmFibGVTd2lwZXIoaWQpIHtcbiAgc3dpcGVyQ29udGFpbmVyW2lkXT8uaW5zdGFuY2U/LmVuYWJsZSgpO1xufVxuZnVuY3Rpb24gZGVzdHJveVN3aXBlcihpZCkge1xuICBpZiAoc3dpcGVyQ29udGFpbmVyW2lkXT8uaW5zdGFuY2UpIHtcbiAgICBzd2lwZXJDb250YWluZXJbaWRdLmluc3RhbmNlLmRlc3Ryb3kodHJ1ZSwgdHJ1ZSk7XG4gICAgZGVsZXRlIHN3aXBlckNvbnRhaW5lcltpZF07XG4gIH1cbn1cbmZ1bmN0aW9uIGdldENsaWNrZWRJbmRleChpZCkge1xuICBpZiAoc3dpcGVyQ29udGFpbmVyW2lkXT8uaW5zdGFuY2UpIHtcbiAgICBjb25zdCBjbGlja2VkU2xpZGUgPSBzd2lwZXJDb250YWluZXJbaWRdLmluc3RhbmNlLmNsaWNrZWRTbGlkZTtcbiAgICBjb25zdCBpbmRleEZyb21BdHRyaWJ1dGUgPSBjbGlja2VkU2xpZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIik7XG4gICAgcmV0dXJuIGluZGV4RnJvbUF0dHJpYnV0ZSAmJiAhTnVtYmVyLmlzTmFOKHBhcnNlSW50KGluZGV4RnJvbUF0dHJpYnV0ZSkpID8gcGFyc2VJbnQoaW5kZXhGcm9tQXR0cmlidXRlKSA6IHN3aXBlckNvbnRhaW5lcltpZF0uaW5zdGFuY2UuY2xpY2tlZEluZGV4O1xuICB9XG4gIHJldHVybiAwO1xufVxuZnVuY3Rpb24gZ2V0SW5zdGFuY2UoaWQpIHtcbiAgcmV0dXJuIHN3aXBlckNvbnRhaW5lcltpZF0/Lmluc3RhbmNlO1xufVxuZnVuY3Rpb24gZ2V0QWN0aXZlU2xpZGUoaWQpIHtcbiAgcmV0dXJuIHN3aXBlckNvbnRhaW5lcltpZF0/Lmluc3RhbmNlPy5yZWFsSW5kZXggfHwgMDtcbn1cbmZ1bmN0aW9uIGdldEFjdGl2ZVNsaWRlRWxlbWVudChpZCkge1xuICByZXR1cm4gc3dpcGVyQ29udGFpbmVyW2lkXT8uaW5zdGFuY2U/LnNsaWRlc1tnZXRBY3RpdmVTbGlkZShpZCkgfHwgMF07XG59XG5mdW5jdGlvbiBpc1N3aXBlckxvYWRpbmcoaWQpIHtcbiAgaWYgKHN3aXBlckNvbnRhaW5lcltpZF0gJiYgc3dpcGVyQ29udGFpbmVyW2lkXS5pbnN0YW5jZSkge1xuICAgIHJldHVybiBzd2lwZXJDb250YWluZXJbaWRdLmlzTG9hZGluZztcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBzZXRTd2lwZXJMb2FkaW5nU3RhdHVzKGlkLCBpc0xvYWRpbmcpIHtcbiAgaWYgKHN3aXBlckNvbnRhaW5lcltpZF0gJiYgc3dpcGVyQ29udGFpbmVyW2lkXS5pbnN0YW5jZSkge1xuICAgIHN3aXBlckNvbnRhaW5lcltpZF0uaXNMb2FkaW5nID0gaXNMb2FkaW5nO1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVTd2lwZXJJbnN0YW5jZShpZCwgdXBkYXRlUHJvcHMpIHtcbiAgaWYgKHN3aXBlckNvbnRhaW5lcltpZF0gJiYgc3dpcGVyQ29udGFpbmVyW2lkXS5pbnN0YW5jZSkge1xuICAgIHVwZGF0ZVByb3BzKHN3aXBlckNvbnRhaW5lcltpZF0pO1xuICB9XG59XG52YXIgc3dpcGVyQ29udGFpbmVyO1xudmFyIGluaXRfc3dpcGVyX2V4dGVuc2lvbiA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9leHRlbnNpb25zL3N3aXBlci9zd2lwZXIuZXh0ZW5zaW9uLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9zd2lwZXIoKTtcbiAgICBpbml0X21vZHVsZXMoKTtcbiAgICBzd2lwZXJDb250YWluZXIgPSB7fTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvdGlrdG9rLW1lc3NhZ2UudHNcbmZ1bmN0aW9uIHBsYXlUaWt0b2tWaWRlbyhmcmFtZVdpbmRvdykge1xuICBwb3N0VGlrdG9rTWVzc2FnZShmcmFtZVdpbmRvdywgXCJ1bk11dGVcIik7XG4gIHBvc3RUaWt0b2tNZXNzYWdlKGZyYW1lV2luZG93LCBcInBsYXlcIik7XG59XG5mdW5jdGlvbiBwYXVzZVRpa3Rva1ZpZGVvKGZyYW1lV2luZG93KSB7XG4gIHBvc3RUaWt0b2tNZXNzYWdlKGZyYW1lV2luZG93LCBcIm11dGVcIik7XG4gIHBvc3RUaWt0b2tNZXNzYWdlKGZyYW1lV2luZG93LCBcInBhdXNlXCIpO1xuICBwb3N0VGlrdG9rTWVzc2FnZShmcmFtZVdpbmRvdywgXCJzZWVrVG9cIiwgMCk7XG59XG5mdW5jdGlvbiBwb3N0VGlrdG9rTWVzc2FnZShmcmFtZVdpbmRvdywgdHlwZSwgdmFsdWUpIHtcbiAgZnJhbWVXaW5kb3cucG9zdE1lc3NhZ2UoeyB0eXBlLCB2YWx1ZSwgXCJ4LXRpa3Rvay1wbGF5ZXJcIjogdHJ1ZSB9LCBcImh0dHBzOi8vd3d3LnRpa3Rvay5jb21cIik7XG59XG52YXIgaW5pdF90aWt0b2tfbWVzc2FnZSA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL3Rpa3Rvay1tZXNzYWdlLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL2V4cGFuZGVkLXN3aXBlci5sb2FkZXIudHNcbmZ1bmN0aW9uIGluaXRpYWxpemVTd2lwZXJGb3JFeHBhbmRlZFRpbGVzKGluaXRpYWxUaWxlSWQsIGxvb2t1cEF0dHIpIHtcbiAgY29uc3QgZXhwYW5kZWRUaWxlID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCJleHBhbmRlZC10aWxlc1wiKTtcbiAgaWYgKCFleHBhbmRlZFRpbGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZXhwYW5kZWQgdGlsZSBlbGVtZW50IG5vdCBmb3VuZFwiKTtcbiAgfVxuICBjb25zdCB3aWRnZXRTZWxlY3RvciA9IGV4cGFuZGVkVGlsZS5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1leHBhbmRlZFwiKTtcbiAgaWYgKCF3aWRnZXRTZWxlY3Rvcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIHdpZGdldCBVSSBlbGVtZW50LiBGYWlsZWQgdG8gaW5pdGlhbGlzZSBHbGlkZVwiKTtcbiAgfVxuICBpbml0aWFsaXplU3dpcGVyKHtcbiAgICBpZDogXCJleHBhbmRlZFwiLFxuICAgIHdpZGdldFNlbGVjdG9yLFxuICAgIG1vZGU6IFwiZXhwYW5kZWRcIixcbiAgICBwcmV2QnV0dG9uOiBcInN3aXBlci1leHBhbmRlZC1idXR0b24tcHJldlwiLFxuICAgIG5leHRCdXR0b246IFwic3dpcGVyLWV4cGFuZGVkLWJ1dHRvbi1uZXh0XCIsXG4gICAgcGFyYW1zT3ZlcnJpZGVzOiB7XG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAga2V5Ym9hcmQ6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgb25seUluVmlld3BvcnQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAgb246IHtcbiAgICAgICAgYmVmb3JlSW5pdDogKHN3aXBlcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHRpbGVJbmRleCA9IGluaXRpYWxUaWxlSWQgPyBnZXRTd2lwZXJJbmRleGZvclRpbGUod2lkZ2V0U2VsZWN0b3IsIGluaXRpYWxUaWxlSWQsIGxvb2t1cEF0dHIpIDogMDtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUb0xvb3AodGlsZUluZGV4LCAwLCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG5hdmlnYXRpb25OZXh0OiBjb250cm9sVmlkZW9QbGF5YmFjayxcbiAgICAgICAgbmF2aWdhdGlvblByZXY6IGNvbnRyb2xWaWRlb1BsYXliYWNrXG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIHBsYXlNZWRpYU9uTG9hZCgpIHtcbiAgY29uc3Qgc3dpcGVyID0gZ2V0SW5zdGFuY2UoXCJleHBhbmRlZFwiKTtcbiAgaWYgKHN3aXBlcikge1xuICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnREYXRhID0gZ2V0U3dpcGVyVmlkZW9FbGVtZW50KHN3aXBlciwgc3dpcGVyLnJlYWxJbmRleCk7XG4gICAgdHJpZ2dlclBsYXkoYWN0aXZlRWxlbWVudERhdGEpO1xuICB9XG59XG5mdW5jdGlvbiBjb250cm9sVmlkZW9QbGF5YmFjayhzd2lwZXIpIHtcbiAgY29uc3QgYWN0aXZlRWxlbWVudCA9IGdldFN3aXBlclZpZGVvRWxlbWVudChzd2lwZXIsIHN3aXBlci5yZWFsSW5kZXgpO1xuICBjb25zdCBwcmV2aW91c0VsZW1lbnQgPSBnZXRTd2lwZXJWaWRlb0VsZW1lbnQoc3dpcGVyLCBzd2lwZXIucHJldmlvdXNJbmRleCk7XG4gIHRyaWdnZXJQbGF5KGFjdGl2ZUVsZW1lbnQpO1xuICB0cmlnZ2VyUGF1c2UocHJldmlvdXNFbGVtZW50KTtcbn1cbmZ1bmN0aW9uIHRyaWdnZXJQbGF5KGVsZW1lbnREYXRhKSB7XG4gIGlmICghZWxlbWVudERhdGEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc3dpdGNoIChlbGVtZW50RGF0YS5zb3VyY2UpIHtcbiAgICBjYXNlIFwidmlkZW9cIjoge1xuICAgICAgY29uc3QgdmlkZW9FbGVtZW50ID0gZWxlbWVudERhdGEuZWxlbWVudDtcbiAgICAgIHZpZGVvRWxlbWVudC5wbGF5KCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcInlvdXR1YmVcIjoge1xuICAgICAgY29uc3QgWW91dHViZUNvbnRlbnRXaW5kb3cgPSBlbGVtZW50RGF0YS5lbGVtZW50O1xuICAgICAgWW91dHViZUNvbnRlbnRXaW5kb3cucGxheSgpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJ0aWt0b2tcIjoge1xuICAgICAgY29uc3QgdGlrdG9rRnJhbWVXaW5kb3cgPSBlbGVtZW50RGF0YS5lbGVtZW50O1xuICAgICAgcGxheVRpa3Rva1ZpZGVvKHRpa3Rva0ZyYW1lV2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCB2aWRlbyBzb3VyY2UgJHtlbGVtZW50RGF0YS5zb3VyY2V9YCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHRyaWdnZXJQYXVzZShlbGVtZW50RGF0YSkge1xuICBpZiAoIWVsZW1lbnREYXRhKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHN3aXRjaCAoZWxlbWVudERhdGEuc291cmNlKSB7XG4gICAgY2FzZSBcInZpZGVvXCI6IHtcbiAgICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IGVsZW1lbnREYXRhLmVsZW1lbnQ7XG4gICAgICB2aWRlb0VsZW1lbnQucGF1c2UoKTtcbiAgICAgIHZpZGVvRWxlbWVudC5jdXJyZW50VGltZSA9IDA7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcInlvdXR1YmVcIjoge1xuICAgICAgY29uc3QgWW91dHViZUNvbnRlbnRXaW5kb3cgPSBlbGVtZW50RGF0YS5lbGVtZW50O1xuICAgICAgWW91dHViZUNvbnRlbnRXaW5kb3cucGF1c2UoKTtcbiAgICAgIFlvdXR1YmVDb250ZW50V2luZG93LnJlc2V0KCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcInRpa3Rva1wiOiB7XG4gICAgICBjb25zdCB0aWt0b2tGcmFtZVdpbmRvdyA9IGVsZW1lbnREYXRhLmVsZW1lbnQ7XG4gICAgICBwYXVzZVRpa3Rva1ZpZGVvKHRpa3Rva0ZyYW1lV2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCB2aWRlbyBzb3VyY2UgJHtlbGVtZW50RGF0YS5zb3VyY2V9YCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFN3aXBlclZpZGVvRWxlbWVudChzd2lwZXIsIGluZGV4KSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBzd2lwZXIuc2xpZGVzW2luZGV4XTtcbiAgY29uc3QgdGlsZUlkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICBjb25zdCB5b3V0dWJlSWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEteXQtaWRcIik7XG4gIGlmICh5b3V0dWJlSWQpIHtcbiAgICBjb25zdCB5b3V0dWJlRnJhbWUgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYGlmcmFtZSN5dC1mcmFtZS0ke3RpbGVJZH0tJHt5b3V0dWJlSWR9YCk7XG4gICAgaWYgKHlvdXR1YmVGcmFtZSkge1xuICAgICAgcmV0dXJuIHsgZWxlbWVudDogeW91dHViZUZyYW1lLmNvbnRlbnRXaW5kb3csIHNvdXJjZTogXCJ5b3V0dWJlXCIgfTtcbiAgICB9XG4gIH1cbiAgY29uc3QgdGlrdG9rSWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGlrdG9rLWlkXCIpO1xuICBpZiAodGlrdG9rSWQpIHtcbiAgICBjb25zdCB0aWt0b2tGcmFtZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgaWZyYW1lI3Rpa3Rvay1mcmFtZS0ke3RpbGVJZH0tJHt0aWt0b2tJZH1gKTtcbiAgICBpZiAodGlrdG9rRnJhbWUgJiYgdGlrdG9rRnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgcmV0dXJuIHsgZWxlbWVudDogdGlrdG9rRnJhbWUuY29udGVudFdpbmRvdywgc291cmNlOiBcInRpa3Rva1wiIH07XG4gICAgfVxuICB9XG4gIGNvbnN0IHZpZGVvRWxlbWVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5wYW5lbCAucGFuZWwtbGVmdCAudmlkZW8tY29udGVudC13cmFwcGVyIHZpZGVvXCIpO1xuICBpZiAodmlkZW9FbGVtZW50KSB7XG4gICAgcmV0dXJuIHsgZWxlbWVudDogdmlkZW9FbGVtZW50LCBzb3VyY2U6IFwidmlkZW9cIiB9O1xuICB9XG4gIHJldHVybiB2b2lkIDA7XG59XG5mdW5jdGlvbiBvblRpbGVFeHBhbmQodGlsZUlkKSB7XG4gIGNvbnN0IGV4cGFuZGVkVGlsZSA9IHNkay5xdWVyeVNlbGVjdG9yKFwiZXhwYW5kZWQtdGlsZXNcIik7XG4gIGlmICghZXhwYW5kZWRUaWxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGV4cGFuZGVkIHRpbGUgZWxlbWVudCBub3QgZm91bmRcIik7XG4gIH1cbiAgZXhwYW5kZWRUaWxlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImV4cGFuZGVkLXRpbGUtb3ZlcmxheVwiKTtcbiAgd2FpdEZvckVsbShleHBhbmRlZFRpbGUsIFtcIi5zd2lwZXItZXhwYW5kZWRcIl0sICgpID0+IHtcbiAgICBjb25zdCB0aWxlRWxlbWVudCA9IGV4cGFuZGVkVGlsZS5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yKGAuc3dpcGVyLXNsaWRlW2RhdGEtaWQ9XCIke3RpbGVJZH1cIl1gKTtcbiAgICBjb25zdCB5b3V0dWJlSWQgPSB0aWxlRWxlbWVudD8uZ2V0QXR0cmlidXRlKFwiZGF0YS15dC1pZFwiKTtcbiAgICBjb25zdCB0aWt0b2tJZCA9IHRpbGVFbGVtZW50Py5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRpa3Rvay1pZFwiKTtcbiAgICBpZiAoeW91dHViZUlkKSB7XG4gICAgICBjb25zdCBsb29rdXBZdEF0dHIgPSB7IG5hbWU6IFwiZGF0YS15dC1pZFwiLCB2YWx1ZTogeW91dHViZUlkIH07XG4gICAgICBpbml0aWFsaXplU3dpcGVyRm9yRXhwYW5kZWRUaWxlcyh0aWxlSWQsIGxvb2t1cFl0QXR0cik7XG4gICAgfSBlbHNlIGlmICh0aWt0b2tJZCkge1xuICAgICAgY29uc3QgbG9va3VwVGlrdG9rQXR0ciA9IHsgbmFtZTogXCJkYXRhLXRpa3Rvay1pZFwiLCB2YWx1ZTogdGlrdG9rSWQgfTtcbiAgICAgIGluaXRpYWxpemVTd2lwZXJGb3JFeHBhbmRlZFRpbGVzKHRpbGVJZCwgbG9va3VwVGlrdG9rQXR0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXRpYWxpemVTd2lwZXJGb3JFeHBhbmRlZFRpbGVzKHRpbGVJZCk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIG9uVGlsZVJlbmRlcmVkKCkge1xuICBjb25zdCBleHBhbmRlZFRpbGVzRWxlbWVudCA9IHNkay5xdWVyeVNlbGVjdG9yKFwiZXhwYW5kZWQtdGlsZXNcIik7XG4gIGlmICghZXhwYW5kZWRUaWxlc0VsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBhbmRlZCB0aWxlcyBlbGVtZW50IG5vdCBmb3VuZFwiKTtcbiAgfVxuICBjb25zdCB0aWxlcyA9IGV4cGFuZGVkVGlsZXNFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3dpcGVyLXNsaWRlXCIpO1xuICBjb25zdCB3aWRnZXRTZWxlY3RvciA9IGV4cGFuZGVkVGlsZXNFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLWV4cGFuZGVkXCIpO1xuICBpZiAoIXdpZGdldFNlbGVjdG9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiV2lkZ2V0IHNlbGVjdG9yIGZvciBleHBhbmRlZCB0aWxlIChzd2lwZXItZXhwYW5kZWQpIGlzIG5vdCBmb3VuZFwiKTtcbiAgfVxuICBzZXR1cFRpa1Rva1BsYXllclJlYWR5RXZlbnQoKTtcbiAgdGlsZXM/LmZvckVhY2goKHRpbGUpID0+IHtcbiAgICBzZXR1cFZpZGVvRXZlbnRzKHRpbGUsIHdpZGdldFNlbGVjdG9yKTtcbiAgICBzZXR1cFlvdXR1YmVFdmVudHModGlsZSwgd2lkZ2V0U2VsZWN0b3IpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJlZHVjZUJhY2tncm91bmRDb250cm9sc1Zpc2liaWxpdHkoc291cmNlSWQpIHtcbiAgaWYgKCFpc1ZhbGlkRXZlbnRTb3VyY2Uoc291cmNlSWQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGV4cGFuZGVkVGlsZXNFbGVtZW50ID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCJleHBhbmRlZC10aWxlc1wiKTtcbiAgY29uc3Qgd3JhcHBlciA9IGV4cGFuZGVkVGlsZXNFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXhwYW5kZWQtdGlsZS13cmFwcGVyXCIpO1xuICBpZiAoIXdyYXBwZXIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgbmF2aWdhdGlvblByZXZCdXR0b24gPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLWV4cGFuZGVkLWJ1dHRvbi1wcmV2XCIpO1xuICBjb25zdCBuYXZpZ2F0aW9uTmV4dEJ1dHRvbiA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItZXhwYW5kZWQtYnV0dG9uLW5leHRcIik7XG4gIGNvbnN0IGV4aXRUaWxlQnV0dG9uID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLmV4aXRcIik7XG4gIG5hdmlnYXRpb25OZXh0QnV0dG9uPy5jbGFzc0xpc3QuYWRkKFwic3dpcGVyLWJ1dHRvbi1kaXNhYmxlZFwiKTtcbiAgbmF2aWdhdGlvblByZXZCdXR0b24/LmNsYXNzTGlzdC5hZGQoXCJzd2lwZXItYnV0dG9uLWRpc2FibGVkXCIpO1xuICBpZiAoZXhpdFRpbGVCdXR0b24pIHtcbiAgICBleGl0VGlsZUJ1dHRvbi5zdHlsZS5vcGFjaXR5ID0gXCIwLjRcIjtcbiAgfVxufVxuZnVuY3Rpb24gcmVzZXRCYWNrZ3JvdW5kQ29udHJvbHNWaXNpYmlsaXR5KHNvdXJjZUlkKSB7XG4gIGlmICghaXNWYWxpZEV2ZW50U291cmNlKHNvdXJjZUlkKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBleHBhbmRlZFRpbGVzRWxlbWVudCA9IHNkay5xdWVyeVNlbGVjdG9yKFwiZXhwYW5kZWQtdGlsZXNcIik7XG4gIGNvbnN0IHdyYXBwZXIgPSBleHBhbmRlZFRpbGVzRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmV4cGFuZGVkLXRpbGUtd3JhcHBlclwiKTtcbiAgaWYgKCF3cmFwcGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IG5hdmlnYXRpb25QcmV2QnV0dG9uID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1leHBhbmRlZC1idXR0b24tcHJldlwiKTtcbiAgY29uc3QgbmF2aWdhdGlvbk5leHRCdXR0b24gPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLWV4cGFuZGVkLWJ1dHRvbi1uZXh0XCIpO1xuICBjb25zdCBleGl0VGlsZUJ1dHRvbiA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi5leGl0XCIpO1xuICBuYXZpZ2F0aW9uTmV4dEJ1dHRvbj8uY2xhc3NMaXN0LnJlbW92ZShcInN3aXBlci1idXR0b24tZGlzYWJsZWRcIik7XG4gIG5hdmlnYXRpb25QcmV2QnV0dG9uPy5jbGFzc0xpc3QucmVtb3ZlKFwic3dpcGVyLWJ1dHRvbi1kaXNhYmxlZFwiKTtcbiAgaWYgKGV4aXRUaWxlQnV0dG9uKSB7XG4gICAgZXhpdFRpbGVCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzVmFsaWRFdmVudFNvdXJjZShzb3VyY2VJZCkge1xuICBjb25zdCBhY3RpdmVTbGlkZUVsZW1lbnQgPSBnZXRBY3RpdmVTbGlkZUVsZW1lbnQoXCJleHBhbmRlZFwiKTtcbiAgcmV0dXJuIGFjdGl2ZVNsaWRlRWxlbWVudD8uZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSA9PT0gc291cmNlSWQ7XG59XG5mdW5jdGlvbiBzZXR1cFZpZGVvRXZlbnRzKHRpbGUsIHdpZGdldFNlbGVjdG9yKSB7XG4gIGNvbnN0IHZpZGVvU291cmNlRWxlbWVudCA9IHRpbGUucXVlcnlTZWxlY3RvcihcInZpZGVvLnZpZGVvLWNvbnRlbnQgPiBzb3VyY2VcIik7XG4gIGlmICh2aWRlb1NvdXJjZUVsZW1lbnQpIHtcbiAgICB2aWRlb1NvdXJjZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgcGxheUFjdGl2ZU1lZGlhVGlsZU9uTG9hZCh0aWxlLCB3aWRnZXRTZWxlY3Rvcik7XG4gICAgfSk7XG4gICAgdmlkZW9Tb3VyY2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCAoKSA9PiB7XG4gICAgICB2aWRlb1NvdXJjZUVsZW1lbnQuY2xvc2VzdChcIi52aWRlby1jb250ZW50LXdyYXBwZXJcIik/LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICB0aWxlLnF1ZXJ5U2VsZWN0b3IoXCIudmlkZW8tZmFsbGJhY2stY29udGVudFwiKT8uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gc2V0dXBZb3V0dWJlRXZlbnRzKHRpbGUsIHdpZGdldFNlbGVjdG9yKSB7XG4gIGNvbnN0IHRpbGVJZCA9IHRpbGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgY29uc3QgeW91dHViZUlkID0gdGlsZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXl0LWlkXCIpO1xuICBpZiAoeW91dHViZUlkICYmIHRpbGVJZCkge1xuICAgIGNvbnN0IHlvdXR1YmVGcmFtZSA9IHRpbGUucXVlcnlTZWxlY3RvcihgaWZyYW1lI3l0LWZyYW1lLSR7dGlsZUlkfS0ke3lvdXR1YmVJZH1gKTtcbiAgICB5b3V0dWJlRnJhbWU/LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgIHBsYXlBY3RpdmVNZWRpYVRpbGVPbkxvYWQodGlsZSwgd2lkZ2V0U2VsZWN0b3IsIHsgbmFtZTogXCJkYXRhLXl0LWlkXCIsIHZhbHVlOiB5b3V0dWJlSWQgfSk7XG4gICAgfSk7XG4gICAgeW91dHViZUZyYW1lPy5hZGRFdmVudExpc3RlbmVyKFwieXQtdmlkZW8tZXJyb3JcIiwgKCkgPT4ge1xuICAgICAgeW91dHViZUZyYW1lLmNsb3Nlc3QoXCIudmlkZW8tY29udGVudC13cmFwcGVyXCIpPy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgdGlsZS5xdWVyeVNlbGVjdG9yKFwiLnZpZGVvLWZhbGxiYWNrLWNvbnRlbnRcIik/LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHNldHVwVGlrVG9rUGxheWVyUmVhZHlFdmVudCgpIHtcbiAgdGlrdG9rRGVmYXVsdFBsYXllZCA9IGZhbHNlO1xuICB3aW5kb3cub25tZXNzYWdlID0gKGV2ZW50MikgPT4ge1xuICAgIGlmIChldmVudDIuZGF0YVtcIngtdGlrdG9rLXBsYXllclwiXSAmJiBldmVudDIuZGF0YS50eXBlID09PSBcIm9uUGxheWVyUmVhZHlcIikge1xuICAgICAgY29uc3QgZnJhbWVXaW5kb3cgPSBldmVudDIuc291cmNlO1xuICAgICAgcGF1c2VUaWt0b2tWaWRlbyhmcmFtZVdpbmRvdyk7XG4gICAgICBpZiAoIXRpa3Rva0RlZmF1bHRQbGF5ZWQpIHtcbiAgICAgICAgdGlrdG9rRGVmYXVsdFBsYXllZCA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGxheU1lZGlhT25Mb2FkKCksIDMwMCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gcGxheUFjdGl2ZU1lZGlhVGlsZU9uTG9hZCh0aWxlLCB3aWRnZXRTZWxlY3RvciwgbG9va3VwQXR0cikge1xuICBpZiAoaXNBY3RpdmVUaWxlKHRpbGUsIHdpZGdldFNlbGVjdG9yLCBsb29rdXBBdHRyKSkge1xuICAgIHBsYXlNZWRpYU9uTG9hZCgpO1xuICB9XG59XG5mdW5jdGlvbiBpc0FjdGl2ZVRpbGUodGlsZSwgd2lkZ2V0U2VsZWN0b3IsIGxvb2t1cEF0dHIpIHtcbiAgY29uc3QgdGlsZUlkID0gdGlsZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICBjb25zdCB0aWxlSW5kZXggPSB0aWxlSWQgPyBnZXRTd2lwZXJJbmRleGZvclRpbGUod2lkZ2V0U2VsZWN0b3IsIHRpbGVJZCwgbG9va3VwQXR0cikgOiAwO1xuICByZXR1cm4gZ2V0QWN0aXZlU2xpZGUoXCJleHBhbmRlZFwiKSA9PT0gdGlsZUluZGV4O1xufVxuZnVuY3Rpb24gb25UaWxlQ2xvc2VkKCkge1xuICBjb25zdCBleHBhbmRlZFRpbGUgPSBzZGsucXVlcnlTZWxlY3RvcihcImV4cGFuZGVkLXRpbGVzXCIpO1xuICBpZiAoIWV4cGFuZGVkVGlsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBleHBhbmRlZCB0aWxlIGVsZW1lbnQgbm90IGZvdW5kXCIpO1xuICB9XG4gIGV4cGFuZGVkVGlsZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJleHBhbmRlZC10aWxlLW92ZXJsYXlcIik7XG4gIGRlc3Ryb3lTd2lwZXIoXCJleHBhbmRlZFwiKTtcbn1cbnZhciB0aWt0b2tEZWZhdWx0UGxheWVkO1xudmFyIGluaXRfZXhwYW5kZWRfc3dpcGVyX2xvYWRlciA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL2V4cGFuZGVkLXN3aXBlci5sb2FkZXIudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X3N3aXBlcl9leHRlbnNpb24oKTtcbiAgICBpbml0X3dpZGdldF9mZWF0dXJlcygpO1xuICAgIGluaXRfdGlrdG9rX21lc3NhZ2UoKTtcbiAgICB0aWt0b2tEZWZhdWx0UGxheWVkID0gZmFsc2U7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL3Byb2R1Y3QtcmVjcy1zd2lwZXIubG9hZGVyLnRzXG5mdW5jdGlvbiBvbkV4cGFuZGVkVGlsZUNyb3NzU2VsbGVyc1JlbmRlcmVkKHRpbGVJZCwgdGFyZ2V0KSB7XG4gIGlmICh0YXJnZXQpIHtcbiAgICBjb25zdCBzd2lwZXJDcm9zc1NlbGwgPSB0YXJnZXQucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItZXhwYW5kZWQtcHJvZHVjdC1yZWNzXCIpO1xuICAgIGlmIChzd2lwZXJDcm9zc1NlbGwpIHtcbiAgICAgIGluaXRpYWxpemVTd2lwZXIoe1xuICAgICAgICBpZDogYGV4cGFuZGVkLXByb2R1Y3QtcmVjcy0ke3RpbGVJZH1gLFxuICAgICAgICBtb2RlOiBcImV4cGFuZGVkLXByb2R1Y3QtcmVjc1wiLFxuICAgICAgICB3aWRnZXRTZWxlY3Rvcjogc3dpcGVyQ3Jvc3NTZWxsLFxuICAgICAgICBwcmV2QnV0dG9uOiBcInN3aXBlci1leHAtcHJvZHVjdC1yZWNzLWJ1dHRvbi1wcmV2XCIsXG4gICAgICAgIG5leHRCdXR0b246IFwic3dpcGVyLWV4cC1wcm9kdWN0LXJlY3MtYnV0dG9uLW5leHRcIixcbiAgICAgICAgcGFyYW1zT3ZlcnJpZGVzOiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogXCJhdXRvXCIsXG4gICAgICAgICAgbW91c2V3aGVlbDoge1xuICAgICAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdyYWJDdXJzb3I6IGZhbHNlLFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBiZWZvcmVJbml0OiAoc3dpcGVyKSA9PiB7XG4gICAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvTG9vcCgwLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbnZhciBpbml0X3Byb2R1Y3RfcmVjc19zd2lwZXJfbG9hZGVyID0gX19lc20oe1xuICBcInNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvcHJvZHVjdC1yZWNzLXN3aXBlci5sb2FkZXIudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X3N3aXBlcl9leHRlbnNpb24oKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL3dpZGdldC5mZWF0dXJlcy50c1xuZnVuY3Rpb24gYWRkQXV0b0FkZFRpbGVGZWF0dXJlKCkge1xuICBjb25zdCB7IGF1dG9fcmVmcmVzaCB9ID0gc2RrLmdldFN0eWxlQ29uZmlnKCk7XG4gIGlmIChCb29sZWFuKGF1dG9fcmVmcmVzaCkgPT09IHRydWUpIHtcbiAgICBzZGsudGlsZXMuZW5hYmxlQXV0b0FkZE5ld1RpbGVzKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGxvYWRXaWRnZXRJc0VuYWJsZWQoKSB7XG4gIGlmIChpc0VuYWJsZWQoKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNvbnN0IHVnY0NvbnRhaW5lciA9IHNkay5xdWVyeVNlbGVjdG9yKFwiI25vc3RvLXVnYy1jb250YWluZXJcIik7XG4gIGlmICghdWdjQ29udGFpbmVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgTm9zdG8gVUdDIGNvbnRhaW5lclwiKTtcbiAgfVxuICB1Z2NDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICB0aHJvdyBuZXcgRXJyb3IoXCJXaWRnZXQgaXMgbm90IGVuYWJsZWRcIik7XG59XG5mdW5jdGlvbiBsb2FkRXhwYW5kZWRUaWxlRmVhdHVyZSgpIHtcbiAgY29uc3Qgd2lkZ2V0Q29udGFpbmVyID0gc2RrLmdldFN0eWxlQ29uZmlnKCk7XG4gIGNvbnN0IHsgY2xpY2tfdGhyb3VnaF91cmwgfSA9IHdpZGdldENvbnRhaW5lcjtcbiAgaWYgKGNsaWNrX3Rocm91Z2hfdXJsID09PSBcIltFWFBBTkRdXCIpIHtcbiAgICBsb2FkRXhwYW5kU2V0dGluZ0NvbXBvbmVudHMoKTtcbiAgICByZWdpc3RlclRpbGVFeHBhbmRMaXN0ZW5lcihvblRpbGVFeHBhbmQpO1xuICAgIHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVhQQU5ERURfVElMRV9DTE9TRSwgb25UaWxlQ2xvc2VkKTtcbiAgICByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVfRVhQQU5EX1JFTkRFUkVELCBvblRpbGVSZW5kZXJlZCk7XG4gICAgcmVnaXN0ZXJTaGFyZU1lbnVPcGVuZWRMaXN0ZW5lcihyZWR1Y2VCYWNrZ3JvdW5kQ29udHJvbHNWaXNpYmlsaXR5KTtcbiAgICByZWdpc3RlclNoYXJlTWVudUNsb3NlZExpc3RlbmVyKHJlc2V0QmFja2dyb3VuZENvbnRyb2xzVmlzaWJpbGl0eSk7XG4gICAgcmVnaXN0ZXJDcm9zc1NlbGxlcnNMb2FkTGlzdGVuZXIob25FeHBhbmRlZFRpbGVDcm9zc1NlbGxlcnNSZW5kZXJlZCk7XG4gIH0gZWxzZSBpZiAoY2xpY2tfdGhyb3VnaF91cmwgPT09IFwiW09SSUdJTkFMX1VSTF1cIiB8fCAvXmh0dHBzPzpcXC9cXC8uKy8udGVzdChjbGlja190aHJvdWdoX3VybCA/PyBcIlwiKSkge1xuICAgIHJlZ2lzdGVyRGVmYXVsdENsaWNrRXZlbnRzKCk7XG4gIH0gZWxzZSBpZiAoY2xpY2tfdGhyb3VnaF91cmwgPT09IFwiW0NVU1RPTV1cIikge1xuICAgIGFsZXJ0KFwiQ3VzdG9tIFVSTCBpbnRlZ3JhdGlvbiBOb3QgaW1wbGVtZW50ZWQgeWV0XCIpO1xuICB9XG59XG5mdW5jdGlvbiBsb2FkTW9yZSgpIHtcbiAgaWYgKHdpbmRvdy5fX2lzTG9hZGluZykge1xuICAgIHJldHVybjtcbiAgfVxuICB3aW5kb3cuX19pc0xvYWRpbmcgPSB0cnVlO1xuICBjb25zdCBsb2FkTW9yZUJ1dHRvbiA9IGdldExvYWRNb3JlQnV0dG9uKCk7XG4gIHNkay50cmlnZ2VyRXZlbnQoRVZFTlRfTE9BRF9NT1JFKTtcbiAgaWYgKCFzZGsudGlsZXMuaGFzTW9yZVBhZ2VzKCkpIHtcbiAgICBsb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB9XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHdpbmRvdy5fX2lzTG9hZGluZyA9IGZhbHNlO1xuICB9LCA1MDApO1xufVxuZnVuY3Rpb24gYWRkTG9hZE1vcmVCdXR0b25GZWF0dXJlKCkge1xuICBjb25zdCB7IGxvYWRfbW9yZV90eXBlIH0gPSBzZGsuZ2V0U3R5bGVDb25maWcoKTtcbiAgY29uc3QgbG9hZE1vcmVUeXBlID0gbG9hZF9tb3JlX3R5cGU7XG4gIHN3aXRjaCAobG9hZE1vcmVUeXBlKSB7XG4gICAgY2FzZSBcImJ1dHRvblwiOlxuICAgICAgYXR0YWNoTG9hZE1vcmVCdXR0b25MaXN0ZW5lcigpO1xuICAgICAgc2RrLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRfVElMRVNfVVBEQVRFRCwgKCkgPT4ge1xuICAgICAgICBjb25zdCBsb2FkTW9yZUxvYWRlciA9IGdldExvYWRNb3JlTG9hZGVyKCk7XG4gICAgICAgIGNvbnN0IGxvYWRNb3JlQnV0dG9uID0gZ2V0TG9hZE1vcmVCdXR0b24oKTtcbiAgICAgICAgbG9hZE1vcmVMb2FkZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgbG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInNjcm9sbFwiOlxuICAgICAgZGlzYWJsZUxvYWRNb3JlQnV0dG9uSWZFeGlzdHMoKTtcbiAgICAgIHNkay5hZGRFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVTX1VQREFURUQsICgpID0+IHtcbiAgICAgICAgY29uc3QgbG9hZE1vcmVMb2FkZXIgPSBnZXRMb2FkTW9yZUxvYWRlcigpO1xuICAgICAgICBsb2FkTW9yZUxvYWRlci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgfSk7XG4gICAgICB1c2VJbmZpbml0ZVNjcm9sbGVyX2RlZmF1bHQoc2RrLCB3aW5kb3csIGxvYWRNb3JlV3JhcHBlZFdpdGhFYXNlZExvYWRlcik7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic3RhdGljXCI6XG4gICAgICBkaXNhYmxlTG9hZE1vcmVMb2FkZXJJZkV4aXN0cygpO1xuICAgICAgZGlzYWJsZUxvYWRNb3JlQnV0dG9uSWZFeGlzdHMoKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGxvYWQgbW9yZSB0eXBlXCIpO1xuICB9XG4gIGlmICghc2RrLnRpbGVzLmhhc01vcmVQYWdlcygpKSB7XG4gICAgZGlzYWJsZUxvYWRNb3JlQnV0dG9uSWZFeGlzdHMoKTtcbiAgICBkaXNhYmxlTG9hZE1vcmVMb2FkZXJJZkV4aXN0cygpO1xuICB9XG59XG5mdW5jdGlvbiBhdHRhY2hMb2FkTW9yZUJ1dHRvbkxpc3RlbmVyKCkge1xuICBjb25zdCBsb2FkTW9yZUJ1dHRvbiA9IGdldExvYWRNb3JlQnV0dG9uKCk7XG4gIGxvYWRNb3JlQnV0dG9uLm9uY2xpY2sgPSBsb2FkTW9yZVdyYXBwZWRXaXRoRWFzZWRMb2FkZXI7XG59XG5mdW5jdGlvbiBkaXNhYmxlTG9hZE1vcmVCdXR0b25JZkV4aXN0cygpIHtcbiAgY29uc3QgbG9hZE1vcmVCdXR0b24gPSBnZXRMb2FkTW9yZUJ1dHRvbigpO1xuICBsb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufVxuZnVuY3Rpb24gZGlzYWJsZUxvYWRNb3JlTG9hZGVySWZFeGlzdHMoKSB7XG4gIGdldExvYWRNb3JlTG9hZGVyKCkuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn1cbmZ1bmN0aW9uIGhpZGVBbGxUaWxlc0FmdGVyTlRpbGVzKG51bWJlclRpbGVzKSB7XG4gIGNvbnN0IHRpbGVzID0gc2RrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudWdjLXRpbGVcIik7XG4gIGlmICghdGlsZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCB0aWxlc1wiKTtcbiAgfVxuICB0aWxlcy5mb3JFYWNoKCh0aWxlLCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCA+PSBudW1iZXJUaWxlcykge1xuICAgICAgdGlsZS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBhZGRUaWxlc1BlclBhZ2VGZWF0dXJlKCkge1xuICBjb25zdCB7IGVuYWJsZV9jdXN0b21fdGlsZXNfcGVyX3BhZ2UsIHRpbGVzX3Blcl9wYWdlIH0gPSBzZGsuZ2V0U3R5bGVDb25maWcoKTtcbiAgaWYgKGVuYWJsZV9jdXN0b21fdGlsZXNfcGVyX3BhZ2UpIHtcbiAgICBzZGsudGlsZXMuc2V0VmlzaWJsZVRpbGVzQ291bnQocGFyc2VJbnQodGlsZXNfcGVyX3BhZ2UpKTtcbiAgICBoaWRlQWxsVGlsZXNBZnRlck5UaWxlcyhwYXJzZUludCh0aWxlc19wZXJfcGFnZSkpO1xuICB9IGVsc2Uge1xuICAgIHNkay50aWxlcy5zZXRWaXNpYmxlVGlsZXNDb3VudCg0MCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGxvYWRUaXRsZSgpIHtcbiAgY29uc3Qgd2lkZ2V0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY29uc3Qgd2lkZ2V0Q29udGFpbmVyID0gc2RrLnBsYWNlbWVudC5nZXRXaWRnZXRDb250YWluZXIoKTtcbiAgY29uc3QgdGl0bGUgPSB3aWRnZXRDb250YWluZXIudGl0bGU7XG4gIGlmICh0aXRsZSkge1xuICAgIHdpZGdldFRpdGxlLmlubmVySFRNTCA9IHRpdGxlO1xuICB9XG59XG5mdW5jdGlvbiB3YWl0Rm9yRWxtKHBhcmVudCwgdGFyZ2V0cywgY2FsbGJhY2spIHtcbiAgaWYgKHRhcmdldHMuZXZlcnkoKGl0KSA9PiAhIXBhcmVudC5xdWVyeVNlbGVjdG9yKGl0KSkpIHtcbiAgICBjYWxsYmFjayh0YXJnZXRzLm1hcCgoaXQpID0+IHBhcmVudC5xdWVyeVNlbGVjdG9yKGl0KSkpO1xuICB9XG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKF8sIG9ic2VydmVyMikgPT4ge1xuICAgIGlmICh0YXJnZXRzLmV2ZXJ5KChpdCkgPT4gISFwYXJlbnQucXVlcnlTZWxlY3RvcihpdCkpKSB7XG4gICAgICBvYnNlcnZlcjIuZGlzY29ubmVjdCgpO1xuICAgICAgY2FsbGJhY2sodGFyZ2V0cy5tYXAoKGl0KSA9PiBwYXJlbnQucXVlcnlTZWxlY3RvcihpdCkpKTtcbiAgICB9XG4gIH0pO1xuICBvYnNlcnZlci5vYnNlcnZlKHBhcmVudCwge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlXG4gIH0pO1xufVxuZnVuY3Rpb24gd2FpdEZvckVsZW1lbnRzKHBhcmVudCwgdGFyZ2V0LCBjYWxsYmFjaykge1xuICBjb25zdCBlbGVtZW50cyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldCk7XG4gIGlmIChlbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgY2FsbGJhY2soZWxlbWVudHMpO1xuICB9XG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgIGNvbnN0IG5ld0VsZW1lbnRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0KTtcbiAgICBpZiAobmV3RWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgY2FsbGJhY2sobmV3RWxlbWVudHMpO1xuICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgfSk7XG4gIG9ic2VydmVyLm9ic2VydmUocGFyZW50LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWVcbiAgfSk7XG59XG52YXIgZ2V0TmV4dE5hdmlnYXRlZFRpbGUsIGdldE5leHRUaWxlLCBnZXRQcmV2aW91c1RpbGUsIGFycm93Q2xpY2tMaXN0ZW5lciwgZ2V0TG9hZE1vcmVCdXR0b24sIGdldExvYWRNb3JlTG9hZGVyLCBsb2FkTW9yZVdyYXBwZWRXaXRoRWFzZWRMb2FkZXI7XG52YXIgaW5pdF93aWRnZXRfZmVhdHVyZXMgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvd2lkZ2V0LmZlYXR1cmVzLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9zcmMoKTtcbiAgICBpbml0X3dpZGdldF9jb21wb25lbnRzKCk7XG4gICAgaW5pdF93aWRnZXRfbGF5b3V0KCk7XG4gICAgaW5pdF9ob29rcygpO1xuICAgIGluaXRfZXhwYW5kZWRfc3dpcGVyX2xvYWRlcigpO1xuICAgIGluaXRfcHJvZHVjdF9yZWNzX3N3aXBlcl9sb2FkZXIoKTtcbiAgICBnZXROZXh0TmF2aWdhdGVkVGlsZSA9IChjdXJyZW50VGlsZSwgZW5hYmxlZFRpbGVzLCBkaXJlY3Rpb24pID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGVuYWJsZWRUaWxlcy5maW5kSW5kZXgoKHRpbGUpID0+IHRpbGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSA9PT0gY3VycmVudFRpbGUuaWQpO1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJwcmV2aW91c1wiKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzVGlsZSA9IGdldFByZXZpb3VzVGlsZShlbmFibGVkVGlsZXMsIGN1cnJlbnRJbmRleCk7XG4gICAgICAgIGlmICghcHJldmlvdXNUaWxlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgcHJldmlvdXMgdGlsZVwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJldmlvdXNUaWxlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgY29uc3QgbmV4dFRpbGUgPSBnZXROZXh0VGlsZShlbmFibGVkVGlsZXMsIGN1cnJlbnRJbmRleCk7XG4gICAgICAgIGlmICghbmV4dFRpbGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBuZXh0IHRpbGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHRUaWxlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIGdldE5leHRUaWxlID0gKGVuYWJsZWRUaWxlcywgY3VycmVudEluZGV4KSA9PiBlbmFibGVkVGlsZXNbY3VycmVudEluZGV4ICsgMV07XG4gICAgZ2V0UHJldmlvdXNUaWxlID0gKGVuYWJsZWRUaWxlcywgY3VycmVudEluZGV4KSA9PiBlbmFibGVkVGlsZXNbY3VycmVudEluZGV4IC0gMV07XG4gICAgYXJyb3dDbGlja0xpc3RlbmVyID0gKGUpID0+IHtcbiAgICAgIGlmICghZS50YXJnZXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgdGFyZ2V0IGVsZW1lbnQgZm9yIGFycm93IGNsaWNrIGxpc3RlbmVyXCIpO1xuICAgICAgfVxuICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICBjb25zdCB0eXBlID0gdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRpbGUtYXJyb3dzLWxlZnRcIikgPyBcInByZXZpb3VzXCIgOiBcIm5leHRcIjtcbiAgICAgIGNvbnN0IGN1cnJlbnRUaWxlID0gc2RrLnRpbGVzLmdldFRpbGUoKTtcbiAgICAgIGlmICghY3VycmVudFRpbGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgY3VycmVudCB0aWxlXCIpO1xuICAgICAgfVxuICAgICAgY29uc3QgdGlsZXNBc0h0bWwgPSBzZGsucXVlcnlTZWxlY3RvckFsbChcIi51Z2MtdGlsZVwiKTtcbiAgICAgIGlmICghdGlsZXNBc0h0bWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgdGlsZXMgZm9yIGFycm93IGluaXRpYWxpc2F0aW9uXCIpO1xuICAgICAgfVxuICAgICAgY29uc3QgdGlsZXNBc0h0bWxBcnJheSA9IEFycmF5LmZyb20odGlsZXNBc0h0bWwpO1xuICAgICAgY29uc3QgdGlsZUlkID0gZ2V0TmV4dE5hdmlnYXRlZFRpbGUoY3VycmVudFRpbGUsIHRpbGVzQXNIdG1sQXJyYXksIHR5cGUpO1xuICAgICAgY29uc3QgdGlsZXNTdG9yZSA9IE9iamVjdC52YWx1ZXMoc2RrLnRpbGVzLnRpbGVzKTtcbiAgICAgIGNvbnN0IHRpbGVEYXRhID0ge1xuICAgICAgICB0aWxlRGF0YTogdGlsZXNTdG9yZS5maW5kKCh0aWxlKSA9PiB0aWxlLmlkID09PSB0aWxlSWQpLFxuICAgICAgICB3aWRnZXRJZDogc2RrLnBsYWNlbWVudC5nZXRXaWRnZXRJZCgpLFxuICAgICAgICBmaWx0ZXJJZDogc2RrLnBsYWNlbWVudC5nZXRXaWRnZXRDb250YWluZXIoKS53aWRnZXRPcHRpb25zPy5maWx0ZXJfaWRcbiAgICAgIH07XG4gICAgICBzZGsudHJpZ2dlckV2ZW50KEVYUEFOREVEX1RJTEVfQ0xPU0UpO1xuICAgICAgc2RrLnRyaWdnZXJFdmVudChFVkVOVF9USUxFX0VYUEFORCwgdGlsZURhdGEpO1xuICAgIH07XG4gICAgZ2V0TG9hZE1vcmVCdXR0b24gPSAoKSA9PiB7XG4gICAgICBjb25zdCBsb2FkTW9yZUNvbXBvbmVudCA9IHNkay5xdWVyeVNlbGVjdG9yKFwibG9hZC1tb3JlXCIpO1xuICAgICAgaWYgKCFsb2FkTW9yZUNvbXBvbmVudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBsb2FkIG1vcmUgY29tcG9uZW50XCIpO1xuICAgICAgfVxuICAgICAgY29uc3QgbG9hZE1vcmVCdXR0b24gPSBsb2FkTW9yZUNvbXBvbmVudD8ucXVlcnlTZWxlY3RvcihcIiNsb2FkLW1vcmVcIik7XG4gICAgICBpZiAoIWxvYWRNb3JlQnV0dG9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIGxvYWQgbW9yZSBidXR0b25cIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gbG9hZE1vcmVCdXR0b247XG4gICAgfTtcbiAgICBnZXRMb2FkTW9yZUxvYWRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGxvYWRNb3JlTG9hZGVyID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCIjbG9hZC1tb3JlLWxvYWRlclwiKTtcbiAgICAgIGlmICghbG9hZE1vcmVMb2FkZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgbG9hZCBtb3JlIGxvYWRlclwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsb2FkTW9yZUxvYWRlcjtcbiAgICB9O1xuICAgIGxvYWRNb3JlV3JhcHBlZFdpdGhFYXNlZExvYWRlciA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGxvYWRNb3JlQnV0dG9uID0gZ2V0TG9hZE1vcmVCdXR0b24oKTtcbiAgICAgIGxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICBjb25zdCBsb2FkTW9yZUxvYWRlciA9IGdldExvYWRNb3JlTG9hZGVyKCk7XG4gICAgICBsb2FkTW9yZUxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgbG9hZE1vcmUoKTtcbiAgICB9O1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvd2lkZ2V0LnV0aWxzLnRzXG5mdW5jdGlvbiB3YWl0Rm9yRWxlbWVudChzZWxlY3RvciwgdGltZW91dCA9IDVlMykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGludGVydmFsID0gMTAwO1xuICAgIGNvbnN0IGVuZFRpbWUgPSBEYXRlLm5vdygpICsgdGltZW91dDtcbiAgICBjb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHNkay5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgICAgIHJlc29sdmUoZWxlbWVudCk7XG4gICAgICB9IGVsc2UgaWYgKERhdGUubm93KCkgPiBlbmRUaW1lKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYEVsZW1lbnQgd2l0aCBzZWxlY3RvciBcIiR7c2VsZWN0b3J9XCIgbm90IGZvdW5kIHdpdGhpbiAke3RpbWVvdXR9bXNgKSk7XG4gICAgICB9XG4gICAgfSwgaW50ZXJ2YWwpO1xuICB9KTtcbn1cbnZhciBpbml0X3dpZGdldF91dGlscyA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy93aWRnZXQudXRpbHMudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2V4dGVuc2lvbnMvbWFzb25yeS9tYXNvbnJ5LmV4dGVuc2lvbi50c1xuZnVuY3Rpb24gaGFuZGxlVGlsZUltYWdlUmVuZGVyZWQodGlsZUlkKSB7XG4gIGlmICghdGlsZUlkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGdyaWRJdGVtRWxlbWVudCA9IHNkay5wbGFjZW1lbnQuZ2V0U2hhZG93Um9vdCgpLnF1ZXJ5U2VsZWN0b3IoYC5ncmlkLWl0ZW1bZGF0YS1pZCo9XCIke3RpbGVJZH1cIl1gKTtcbiAgY29uc3QgdGlsZUxvYWRpbmdFbGVtZW50ID0gZ3JpZEl0ZW1FbGVtZW50Py5xdWVyeVNlbGVjdG9yKFwiLnRpbGUtbG9hZGluZy5sb2FkaW5nXCIpO1xuICB0aWxlTG9hZGluZ0VsZW1lbnQ/LmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkaW5nXCIpO1xufVxuZnVuY3Rpb24gaGFuZGxlQWxsVGlsZUltYWdlUmVuZGVyZWQoKSB7XG4gIGNvbnN0IHRpbGVMb2FkaW5nRWxlbWVudHMgPSBzZGsucGxhY2VtZW50LmdldFNoYWRvd1Jvb3QoKS5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtaXRlbSAudGlsZS1sb2FkaW5nLmxvYWRpbmdcIik7XG4gIHRpbGVMb2FkaW5nRWxlbWVudHM/LmZvckVhY2goKGVsZW1lbnQpID0+IGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIikpO1xuICBjb25zdCBsb2FkTW9yZUhpZGRlbkVsZW1lbnQgPSBzZGsucGxhY2VtZW50LmdldFNoYWRvd1Jvb3QoKS5xdWVyeVNlbGVjdG9yKFwiI2J1dHRvbnMgPiAjbG9hZC1tb3JlLmhpZGRlblwiKTtcbiAgbG9hZE1vcmVIaWRkZW5FbGVtZW50Py5jbGFzc0xpc3QucmVtb3ZlKFwiLmhpZGRlblwiKTtcbn1cbmZ1bmN0aW9uIGdldEdyaWRJdGVtUm93SWRzKCkge1xuICBjb25zdCBncmlkSXRlbXMgPSBzZGsucGxhY2VtZW50LmdldFNoYWRvd1Jvb3QoKS5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtaXRlbTpub3QoaGlkZGVuKVtyb3ctaWRdXCIpO1xuICBjb25zdCBhbGxSb3dJZHMgPSBBcnJheS5mcm9tKGdyaWRJdGVtcykubWFwKChpdGVtKSA9PiBpdGVtLmdldEF0dHJpYnV0ZShcInJvdy1pZFwiKSkuZmlsdGVyKChyb3dJZFN0cmluZykgPT4gcm93SWRTdHJpbmcgJiYgIU51bWJlci5pc05hTigrcm93SWRTdHJpbmcpKS5tYXAoKHJvd0lkKSA9PiArcm93SWQpO1xuICByZXR1cm4gWy4uLm5ldyBTZXQoYWxsUm93SWRzKV07XG59XG5mdW5jdGlvbiBoYW5kbGVUaWxlSW1hZ2VFcnJvcih0aWxlV2l0aEVycm9yKSB7XG4gIGNvbnN0IGVycm9yVGlsZVJvd0lkU3RyaW5nID0gdGlsZVdpdGhFcnJvci5nZXRBdHRyaWJ1dGUoXCJyb3ctaWRcIik7XG4gIHRpbGVXaXRoRXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcImdyaWQtaXRlbVwiKTtcbiAgdGlsZVdpdGhFcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwidWdjLXRpbGVcIik7XG4gIHRpbGVXaXRoRXJyb3IuY2xhc3NMaXN0LmFkZChcImdyaWQtaXRlbS1lcnJvclwiKTtcbiAgdGlsZVdpdGhFcnJvci5jbGFzc0xpc3QuYWRkKFwidWdjLXRpbGUtZXJyb3JcIik7XG4gIHRpbGVXaXRoRXJyb3IuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgaWYgKCFlcnJvclRpbGVSb3dJZFN0cmluZyB8fCBOdW1iZXIuaXNOYU4oK2Vycm9yVGlsZVJvd0lkU3RyaW5nKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBlcnJvclRpbGVSb3dJZCA9ICtlcnJvclRpbGVSb3dJZFN0cmluZztcbiAgY29uc3QgdW5pcXVlUm93SWRzID0gZ2V0R3JpZEl0ZW1Sb3dJZHMoKTtcbiAgY29uc3Qgcm93SWRTZWxlY3RvcnMgPSB1bmlxdWVSb3dJZHMuZmlsdGVyKChyb3dJZCkgPT4gcm93SWQgPj0gZXJyb3JUaWxlUm93SWQpLm1hcCgobWF0Y2hlZCkgPT4gYFtyb3ctaWQ9XCIke21hdGNoZWR9XCJdYCk7XG4gIGNvbnN0IG1hdGNoZWRHcmlkSXRlbXMgPSBBcnJheS5mcm9tKFxuICAgIHNkay5wbGFjZW1lbnQuZ2V0U2hhZG93Um9vdCgpLnF1ZXJ5U2VsZWN0b3JBbGwoYC5ncmlkLWl0ZW06aXMoJHtyb3dJZFNlbGVjdG9yc30pYClcbiAgKTtcbiAgcmVzaXplVGlsZXMobWF0Y2hlZEdyaWRJdGVtcyk7XG59XG5mdW5jdGlvbiByZW5kZXJNYXNvbnJ5TGF5b3V0KHJlc2V0ID0gZmFsc2UsIHJlc2l6ZSA9IGZhbHNlKSB7XG4gIGlmIChyZXNpemUgfHwgcmVzZXQpIHtcbiAgICBzY3JlZW5XaWR0aCA9IDA7XG4gIH1cbiAgY29uc3QgdWdjQ29udGFpbmVyID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCIjbm9zdG8tdWdjLWNvbnRhaW5lclwiKTtcbiAgaWYgKCF1Z2NDb250YWluZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBOb3N0byBVR0MgY29udGFpbmVyXCIpO1xuICB9XG4gIGNvbnN0IGN1cnJlbnRTY3JlZW5XaWR0aCA9IHVnY0NvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgaWYgKGN1cnJlbnRTY3JlZW5XaWR0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocmVzaXplICYmIHByZXZpb3VzV2lkdGhIYW5kbGVkID09PSBjdXJyZW50U2NyZWVuV2lkdGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHNjcmVlbldpZHRoID09IDApIHtcbiAgICBzY3JlZW5XaWR0aCA9IGN1cnJlbnRTY3JlZW5XaWR0aDtcbiAgICBwcmV2aW91c1dpZHRoSGFuZGxlZCA9IGN1cnJlbnRTY3JlZW5XaWR0aDtcbiAgfVxuICBjb25zdCBhbGxUaWxlcyA9IEFycmF5LmZyb20oc2RrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1pdGVtXCIpID8/IFtdKTtcbiAgY29uc3QgdWdjVGlsZXMgPSByZXNldCB8fCByZXNpemUgPyBhbGxUaWxlcyA6IGFsbFRpbGVzLmZpbHRlcihcbiAgICAodGlsZSkgPT4gdGlsZS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aC1zZXRcIikgIT09IFwidHJ1ZVwiICYmIHRpbGUuZ2V0QXR0cmlidXRlKFwic2V0LWZvci13aWR0aFwiKSAhPT0gc2NyZWVuV2lkdGgudG9TdHJpbmcoKVxuICApO1xuICByZXNpemVUaWxlcyh1Z2NUaWxlcyk7XG59XG5mdW5jdGlvbiByZXNpemVUaWxlcyh1Z2NUaWxlcykge1xuICBpZiAoIXVnY1RpbGVzIHx8IHVnY1RpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB1Z2NUaWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgY29uc3QgcmFuZG9tRmxleEdyb3cgPSBNYXRoLnJhbmRvbSgpICogMiArIDE7XG4gICAgY29uc3QgcmFuZG9tV2lkdGggPSBNYXRoLnJhbmRvbSgpICogMjAwICsgMTUwO1xuICAgIHRpbGUuc3R5bGUuZmxleCA9IGAke3JhbmRvbUZsZXhHcm93fSAxIGF1dG9gO1xuICAgIHRpbGUuc3R5bGUud2lkdGggPSBgJHtyYW5kb21XaWR0aH1weGA7XG4gICAgdGlsZS5zZXRBdHRyaWJ1dGUoXCJ3aWR0aC1zZXRcIiwgXCJ0cnVlXCIpO1xuICAgIHRpbGUuc2V0QXR0cmlidXRlKFwic2V0LWZvci13aWR0aFwiLCBzY3JlZW5XaWR0aC50b1N0cmluZygpKTtcbiAgfSk7XG59XG52YXIgc2NyZWVuV2lkdGgsIHByZXZpb3VzV2lkdGhIYW5kbGVkO1xudmFyIGluaXRfbWFzb25yeV9leHRlbnNpb24gPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvZXh0ZW5zaW9ucy9tYXNvbnJ5L21hc29ucnkuZXh0ZW5zaW9uLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgc2NyZWVuV2lkdGggPSAwO1xuICAgIHByZXZpb3VzV2lkdGhIYW5kbGVkID0gMDtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2V4dGVuc2lvbnMvc3dpcGVyL2ZvbnQuc2Nzc1xudmFyIGZvbnRfZGVmYXVsdDtcbnZhciBpbml0X2ZvbnQgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvZXh0ZW5zaW9ucy9zd2lwZXIvZm9udC5zY3NzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgZm9udF9kZWZhdWx0ID0gYEBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogc3dpcGVyLWljb25zO1xuICBzcmM6IHVybChcImRhdGE6YXBwbGljYXRpb24vZm9udC13b2ZmO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCBkMDlHUmdBQkFBQUFBQVpnQUJBQUFBQUFEQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkdSbFJOQUFBR1JBQUFBQm9BQUFBY2k2cUhrVWRFUlVZQUFBV2dBQUFBSXdBQUFDUUFZQUJYUjFCUFV3QUFCaFFBQUFBdUFBQUFOdUFZNyt4SFUxVkNBQUFGeEFBQUFGQUFBQUJtMmZQY3pVOVRMeklBQUFIY0FBQUFTZ0FBQUdCUDlWNVJZMjFoY0FBQUFrUUFBQUNJQUFBQll0NkYwY0JqZG5RZ0FBQUN6QUFBQUFRQUFBQUVBQkVCUkdkaGMzQUFBQVdZQUFBQUNBQUFBQWovL3dBRFoyeDVaZ0FBQXl3QUFBRE1BQUFEMk1IdHJ5Vm9aV0ZrQUFBQmJBQUFBREFBQUFBMkUyK2VvV2hvWldFQUFBR2NBQUFBSHdBQUFDUUM5Z0R6YUcxMGVBQUFBaWdBQUFBWkFBQUFyZ0prQUJGc2IyTmhBQUFDMEFBQUFGb0FBQUJhRlFBVUdHMWhlSEFBQUFHOEFBQUFId0FBQUNBQWNBQkFibUZ0WlFBQUEvZ0FBQUU1QUFBQ1h2RmRCd2x3YjNOMEFBQUZOQUFBQUdJQUFBQ0U1czc0aFhqYVkyQmtZR0FBWXBmNUh1L2orVzIrTW5Bek1ZREF6YVg2UWpENi80Ly9CeGo1R0E4QXVSd01ZR2tBUHl3TDEzamFZMkJrWUdBODhQOEFneDRqKy84ZlFEWWZBMUFFQldnREFJQjJCT29BZU5wallHUmdZTkJoNEdkZ1lnQUJFTW5JQUJKellOQURDUUFBQ1dnQXNRQjQybU5nWWZ6Q09JR0JsWUdCMFljeGpZR0J3UjFLZjJXUVpHaGhZR0JpWUdWbWdBRkdCaVFRa09hYXd0REFvTUJReFhqZy93RUdQY1lEREE0d05VQTJDQ2d3c0FBQU80RUw2Z0FBZU5wajJNMGd5QUFDcXhnR05XQmtaMkQ0L3dNQSt4a0RkZ0FBQUhqYVkyQmdZR2FBWUJrR1JnWVFpQUh5R01GOEZnWUhJTTNEd01IQUJHUXJNT2d5V0RMRU0xVDkvdzhVQmZFTWdMekUvLy8vUC81Ly9mL1YveHYrcjRlYUFBZU1iQXh3SVVZbUlNSEVnS1lBWWpVY3NEQXdzTEt4YzNCeWNmUHc4akVRQS9nWkJBU0ZoRVZFeGNRbEpLV2taV1RsNUJVVWxaUlZWTlhVTlRRWkJnTUFBTVIrRStnQUVRRkVBQUFBS2dBcUFDb0FOQUErQUVnQVVnQmNBR1lBY0FCNkFJUUFqZ0NZQUtJQXJBQzJBTUFBeWdEVUFONEE2QUR5QVB3QkJnRVFBUm9CSkFFdUFUZ0JRZ0ZNQVZZQllBRnFBWFFCZmdHSUFaSUJuQUdtQWJJQnpnSHNBQUI0MnUyTk1RNkNVQXlHVzU2OHg5QW5lWVlnbTRNSmJoS0ZhRXhJT0FWWDhBcGV3U3Q0QmljNEFmZUFpZDNWT0JpeER4ZlBZRXphNU8rWGZpMDRZQURnZ2lVSVVMQ3VFSks4VmhPNGJTdnBkbmt0SEk1UUNZdGRpMnNsOFpuWGFIbHFVck5LemRLY1Q4Y2pscStyd1pTdklWY3pOaWV6c2ZuUC91em5tZlBGQk5PRE0ySzdNVFE0NVlFQVpxR1A4MUFtR0djRjNpUHFPb3AwcjFTUFRhVGJWa2ZVZTRIWGo5N3dZRSt5TndXWXh3V3U0djF1Z1dIZ28zUzFYZFpFVnFXTTdFVDBjZm5MR3hXZmtnUjQybzJQdldyRE1CU0ZqL0lITGFGMHpLalJnZGlWTXdTY05SQW9XVW9INzhZMmljQi95SVkwOUFuNkFIMkJkdS9VQit5eG9wWXNoUWlFdm52dTBkVVJnRHQ4UWVDOFBEdzdGcGppM2ZFQTR6L1BFSjZZT0I1aEtoNGRqM0V2WGh4UHFIL1NLVVkzcko3c3JaNEZabmgxUE1BdFBod1A2ZmwyUE1KTVBEZ2VRNHJZOFlUNkd6YW8wZUFFQTQwOUR1Z2dtVG5Gbk9jU0NpRWlMTWd4Q2lUSTZDcTVEWlVkM1FtcDEwdk8wTGFMVGQyY2pONGZPdW1sYzdsVVliU1FjWkZrdXRSRzdnNkpLWkt5MFJtZExZNjgwQ0RuRUorVU1rcEZGZTFSTjdueGRWcFhyQzRhVHRuYXVyT25ZZXJjWmcyWVZtTE4vZC9nY3pmRWltckUvZnMvYk91cTI5Wm1uOHRsb09SYVhnWmdHYTc4eU85L2NuWG0yQnBhR3ZxMjVEdjlTNEU5KzVTSWM5UHF1cEpLaFlGU1NsNDcrUWNyMW1ZTkFBQUFlTnB0dzBjS3drQUFBTURaSkE4UTdPVUp2a0xzUGZaNnpGVkVSUHk4cUhoMllFUiszaS9CUDgzdklCTEx5U3NvS2ltcnFLcXBhMmhwNitqcTZSc1lHaG1ibUpxWlN5MHNyYXh0Yk8zc0hSeWRuRU1VNHVSNnl4N0pKWHZlUDdXckR5Y0FBQUFBQUFILy93QUNlTnBqWUdSZ1lPQUJZaGtnWmdKQ1pnWk5Ca1lHTFFadElKc0ZMTVlBQUF3M0FMZ0FlTm9saXpFS2dEQVFCQ2NoUmJDMnNGRVIwWUQ2cVZRaUJDdi9IOWV6R0k2WjVYQkF3OENCSy9tNWlRUVZhdVZiWExuT3JNWnYyb0xkS0ZhOFBqdXJ1MmhKekdhYm1PU0x6Tk16dnV0cEIzTjQybU5nWkdCZzRHS1FZekJoWU14SkxNbGo0R0JnQVlvdy9QL1BBSkpoTE02c1NvV0tmV0NBQXdEQWpnYlJBQUI0Mm1OZ1lHQmtBSUliQ1pvNUlQcm1VbjBoR0EwQU84RUZUUUFBXCIpO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59YDtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc3dpcGVyLWJ1bmRsZS5jc3NcbnZhciBzd2lwZXJfYnVuZGxlX2RlZmF1bHQ7XG52YXIgaW5pdF9zd2lwZXJfYnVuZGxlID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc3dpcGVyLWJ1bmRsZS5jc3NcIigpIHtcbiAgICBzd2lwZXJfYnVuZGxlX2RlZmF1bHQgPSBgLyoqXG4gKiBTd2lwZXIgMTEuMS4xNFxuICogTW9zdCBtb2Rlcm4gbW9iaWxlIHRvdWNoIHNsaWRlciBhbmQgZnJhbWV3b3JrIHdpdGggaGFyZHdhcmUgYWNjZWxlcmF0ZWQgdHJhbnNpdGlvbnNcbiAqIGh0dHBzOi8vc3dpcGVyanMuY29tXG4gKlxuICogQ29weXJpZ2h0IDIwMTQtMjAyNCBWbGFkaW1pciBLaGFybGFtcGlkaVxuICpcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuICpcbiAqIFJlbGVhc2VkIG9uOiBTZXB0ZW1iZXIgMTIsIDIwMjRcbiAqL1xuXG4vKiBGT05UX1NUQVJUICovXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6ICdzd2lwZXItaWNvbnMnO1xuICBzcmM6IHVybCgnZGF0YTphcHBsaWNhdGlvbi9mb250LXdvZmY7Y2hhcnNldD11dGYtODtiYXNlNjQsIGQwOUdSZ0FCQUFBQUFBWmdBQkFBQUFBQURBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCR1JsUk5BQUFHUkFBQUFCb0FBQUFjaTZxSGtVZEVSVVlBQUFXZ0FBQUFJd0FBQUNRQVlBQlhSMUJQVXdBQUJoUUFBQUF1QUFBQU51QVk3K3hIVTFWQ0FBQUZ4QUFBQUZBQUFBQm0yZlBjelU5VEx6SUFBQUhjQUFBQVNnQUFBR0JQOVY1UlkyMWhjQUFBQWtRQUFBQ0lBQUFCWXQ2RjBjQmpkblFnQUFBQ3pBQUFBQVFBQUFBRUFCRUJSR2RoYzNBQUFBV1lBQUFBQ0FBQUFBai8vd0FEWjJ4NVpnQUFBeXdBQUFETUFBQUQyTUh0cnlWb1pXRmtBQUFCYkFBQUFEQUFBQUEyRTIrZW9XaG9aV0VBQUFHY0FBQUFId0FBQUNRQzlnRHphRzEwZUFBQUFpZ0FBQUFaQUFBQXJnSmtBQkZzYjJOaEFBQUMwQUFBQUZvQUFBQmFGUUFVR0cxaGVIQUFBQUc4QUFBQUh3QUFBQ0FBY0FCQWJtRnRaUUFBQS9nQUFBRTVBQUFDWHZGZEJ3bHdiM04wQUFBRk5BQUFBR0lBQUFDRTVzNzRoWGphWTJCa1lHQUFZcGY1SHUvaitXMitNbkF6TVlEQXphWDZRakQ2LzQvL0J4ajVHQThBdVJ3TVlHa0FQeXdMMTNqYVkyQmtZR0E4OFA4QWd4NGorLzhmUURZZkExQUVCV2dEQUlCMkJPb0FlTnBqWUdSZ1lOQmg0R2RnWWdBQkVNbklBQkp6WU5BRENRQUFDV2dBc1FCNDJtTmdZZnpDT0lHQmxZR0IwWWN4allHQndSMUtmMldRWkdoaFlHQmlZR1ZtZ0FGR0JpUVFrT2Fhd3REQW9NQlF4WGpnL3dFR1BjWUREQTR3TlVBMkNDZ3dzQUFBTzRFTDZnQUFlTnBqMk0wZ3lBQUNxeGdHTldCa1oyRDQvd01BK3hrRGRnQUFBSGphWTJCZ1lHYUFZQmtHUmdZUWlBSHlHTUY4RmdZSElNM0R3TUhBQkdRck1PZ3lXRExFTTFUOS93OFVCZkVNZ0x6RS8vLy9QLzUvL2YvVi94dityNGVhQUFlTWJBeHdJVVltSU1IRWdLWUFZalVjc0RBd3NMS3hjM0J5Y2ZQdzhqRVFBL2daQkFTRmhFVkV4Y1FsSktXa1pXVGw1QlVVbFpSVlZOWFVOVFFaQmdNQUFNUitFK2dBRVFGRUFBQUFLZ0FxQUNvQU5BQStBRWdBVWdCY0FHWUFjQUI2QUlRQWpnQ1lBS0lBckFDMkFNQUF5Z0RVQU40QTZBRHlBUHdCQmdFUUFSb0JKQUV1QVRnQlFnRk1BVllCWUFGcUFYUUJmZ0dJQVpJQm5BR21BYklCemdIc0FBQjQydTJOTVE2Q1VBeUdXNTY4eDlBbmVZWWdtNE1KYmhLRmFFeElPQVZYOEFwZXdTdDRCaWM0QWZlQWlkM1ZPQml4RHhmUFlFemE1TytYZmkwNFlBRGdnaVVJVUxDdUVKSzhWaE80YlN2cGRua3RISTVRQ1l0ZGkyc2w4Wm5YYUhscVVyTkt6ZEtjVDhjamxxK3J3WlN2SVZjek5pZXpzZm5QL3V6bm1mUEZCTk9ETTJLN01UUTQ1WUVBWnFHUDgxQW1HR2NGM2lQcU9vcDByMVNQVGFUYlZrZlVlNEhYajk3d1lFK3lOd1dZeHdXdTR2MXVnV0hnbzNTMVhkWkVWcVdNN0VUMGNmbkxHeFdma2dSNDJvMlB2V3JETUJTRmovSUhMYUYwektqUmdkaVZNd1NjTlJBb1dVb0g3OFkyaWNCL3lJWTA5QW42QUgyQmR1L1VCK3l4b3BZc2hRaUV2bnZ1MGRVUmdEdDhRZUM4UER3N0ZwamkzZkVBNHovUEVKNllPQjVoS2g0ZGozRXZYaHhQcUgvU0tVWTNySjdzclo0RlpuaDFQTUF0UGh3UDZmbDJQTUpNUERnZVE0clk4WVQ2R3phbzBlQUVBNDA5RHVnZ21UbkZuT2NTQ2lFaUxNZ3hDaVRJNkNxNURaVWQzUW1wMTB2TzBMYUxUZDJjak40Zk91bWxjN2xVWWJTUWNaRmt1dFJHN2c2SktaS3kwUm1kTFk2ODBDRG5FSitVTWtwRkZlMVJON254ZFZwWHJDNGFUdG5hdXJPblllcmNaZzJZVm1MTi9kL2djemZFaW1yRS9mcy9iT3VxMjlabW44dGxvT1JhWGdaZ0dhNzh5TzkvY25YbTJCcGFHdnEyNUR2OVM0RTkrNVNJYzlQcXVwSktoWUZTU2w0NytRY3IxbVlOQUFBQWVOcHR3MGNLd2tBQUFNRFpKQThRN09VSnZrTHNQZlo2ekZWRVJQeThxSGgyWUVSKzNpL0JQODN2SUJMTHlTc29LaW1ycUtxcGEyaHA2K2pxNlJzWUdobWJtSnFaU3kwc3JheHRiTzNzSFJ5ZG5FTVU0dVI2eXg3SkpYdmVQN1dyRHljQUFBQUFBQUgvL3dBQ2VOcGpZR1JnWU9BQlloa2daZ0pDWmdaTkJrWUdMUVp0SUpzRkxNWUFBQXczQUxnQWVOb2xpekVLZ0RBUUJDY2hSYkMyc0ZFUjBZRDZxVlFpQkN2L0g5ZXpHSTZaNVhCQXc4Q0JLL201aVFRVmF1VmJYTG5Pck1adjJvTGRLRmE4UGp1cnUyaEp6R2FibU9TTHpOTXp2dXRwQjNONDJtTmdaR0JnNEdLUVl6QmhZTXhKTE1sajRHQmdBWW93L1AvUEFKSmhMTTZzU29XS2ZXQ0FBd0RBamdiUkFBQjQybU5nWUdCa0FJSWJDWm81SVBybVVuMGhHQTBBTzhFRlRRQUEnKTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLyogRk9OVF9FTkQgKi9cbjpyb290IHtcbiAgLS1zd2lwZXItdGhlbWUtY29sb3I6ICMwMDdhZmY7XG4gIC8qXG4gIC0tc3dpcGVyLXByZWxvYWRlci1jb2xvcjogdmFyKC0tc3dpcGVyLXRoZW1lLWNvbG9yKTtcbiAgLS1zd2lwZXItd3JhcHBlci10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogaW5pdGlhbDtcbiAgKi9cbn1cbjpob3N0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbiAgei1pbmRleDogMTtcbn1cbi5zd2lwZXIge1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIC8qIEZpeCBvZiBXZWJraXQgZmxpY2tlcmluZyAqL1xuICB6LWluZGV4OiAxO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi5zd2lwZXItdmVydGljYWwgPiAuc3dpcGVyLXdyYXBwZXIge1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLnN3aXBlci13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB6LWluZGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm07XG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXIoLS1zd2lwZXItd3JhcHBlci10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbiwgaW5pdGlhbCk7XG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xufVxuLnN3aXBlci1hbmRyb2lkIC5zd2lwZXItc2xpZGUsXG4uc3dpcGVyLWlvcyAuc3dpcGVyLXNsaWRlLFxuLnN3aXBlci13cmFwcGVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDAsIDApO1xufVxuLnN3aXBlci1ob3Jpem9udGFsIHtcbiAgdG91Y2gtYWN0aW9uOiBwYW4teTtcbn1cbi5zd2lwZXItdmVydGljYWwge1xuICB0b3VjaC1hY3Rpb246IHBhbi14O1xufVxuLnN3aXBlci1zbGlkZSB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IHRyYW5zZm9ybTtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4uc3dpcGVyLXNsaWRlLWludmlzaWJsZS1ibGFuayB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cbi8qIEF1dG8gSGVpZ2h0ICovXG4uc3dpcGVyLWF1dG9oZWlnaHQsXG4uc3dpcGVyLWF1dG9oZWlnaHQgLnN3aXBlci1zbGlkZSB7XG4gIGhlaWdodDogYXV0bztcbn1cbi5zd2lwZXItYXV0b2hlaWdodCAuc3dpcGVyLXdyYXBwZXIge1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtLCBoZWlnaHQ7XG59XG4uc3dpcGVyLWJhY2tmYWNlLWhpZGRlbiAuc3dpcGVyLXNsaWRlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG59XG4vKiAzRCBFZmZlY3RzICovXG4uc3dpcGVyLTNkLnN3aXBlci1jc3MtbW9kZSAuc3dpcGVyLXdyYXBwZXIge1xuICBwZXJzcGVjdGl2ZTogMTIwMHB4O1xufVxuLnN3aXBlci0zZCAuc3dpcGVyLXdyYXBwZXIge1xuICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xufVxuLnN3aXBlci0zZCB7XG4gIHBlcnNwZWN0aXZlOiAxMjAwcHg7XG59XG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUsXG4uc3dpcGVyLTNkIC5zd2lwZXItY3ViZS1zaGFkb3cge1xuICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xufVxuLyogQ1NTIE1vZGUgKi9cbi5zd2lwZXItY3NzLW1vZGUgPiAuc3dpcGVyLXdyYXBwZXIge1xuICBvdmVyZmxvdzogYXV0bztcbiAgc2Nyb2xsYmFyLXdpZHRoOiBub25lO1xuICAvKiBGb3IgRmlyZWZveCAqL1xuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IG5vbmU7XG4gIC8qIEZvciBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSAqL1xufVxuLnN3aXBlci1jc3MtbW9kZSA+IC5zd2lwZXItd3JhcHBlcjo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuLnN3aXBlci1jc3MtbW9kZSA+IC5zd2lwZXItd3JhcHBlciA+IC5zd2lwZXItc2xpZGUge1xuICBzY3JvbGwtc25hcC1hbGlnbjogc3RhcnQgc3RhcnQ7XG59XG4uc3dpcGVyLWNzcy1tb2RlLnN3aXBlci1ob3Jpem9udGFsID4gLnN3aXBlci13cmFwcGVyIHtcbiAgc2Nyb2xsLXNuYXAtdHlwZTogeCBtYW5kYXRvcnk7XG59XG4uc3dpcGVyLWNzcy1tb2RlLnN3aXBlci12ZXJ0aWNhbCA+IC5zd2lwZXItd3JhcHBlciB7XG4gIHNjcm9sbC1zbmFwLXR5cGU6IHkgbWFuZGF0b3J5O1xufVxuLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItZnJlZS1tb2RlID4gLnN3aXBlci13cmFwcGVyIHtcbiAgc2Nyb2xsLXNuYXAtdHlwZTogbm9uZTtcbn1cbi5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLWZyZWUtbW9kZSA+IC5zd2lwZXItd3JhcHBlciA+IC5zd2lwZXItc2xpZGUge1xuICBzY3JvbGwtc25hcC1hbGlnbjogbm9uZTtcbn1cbi5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLWNlbnRlcmVkID4gLnN3aXBlci13cmFwcGVyOjpiZWZvcmUge1xuICBjb250ZW50OiAnJztcbiAgZmxleC1zaHJpbms6IDA7XG4gIG9yZGVyOiA5OTk5O1xufVxuLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItY2VudGVyZWQgPiAuc3dpcGVyLXdyYXBwZXIgPiAuc3dpcGVyLXNsaWRlIHtcbiAgc2Nyb2xsLXNuYXAtYWxpZ246IGNlbnRlciBjZW50ZXI7XG4gIHNjcm9sbC1zbmFwLXN0b3A6IGFsd2F5cztcbn1cbi5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLWNlbnRlcmVkLnN3aXBlci1ob3Jpem9udGFsID4gLnN3aXBlci13cmFwcGVyID4gLnN3aXBlci1zbGlkZTpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi1pbmxpbmUtc3RhcnQ6IHZhcigtLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYmVmb3JlKTtcbn1cbi5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLWNlbnRlcmVkLnN3aXBlci1ob3Jpem9udGFsID4gLnN3aXBlci13cmFwcGVyOjpiZWZvcmUge1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDFweDtcbiAgd2lkdGg6IHZhcigtLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYWZ0ZXIpO1xufVxuLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItY2VudGVyZWQuc3dpcGVyLXZlcnRpY2FsID4gLnN3aXBlci13cmFwcGVyID4gLnN3aXBlci1zbGlkZTpmaXJzdC1jaGlsZCB7XG4gIG1hcmdpbi1ibG9jay1zdGFydDogdmFyKC0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1iZWZvcmUpO1xufVxuLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItY2VudGVyZWQuc3dpcGVyLXZlcnRpY2FsID4gLnN3aXBlci13cmFwcGVyOjpiZWZvcmUge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLXdpZHRoOiAxcHg7XG4gIGhlaWdodDogdmFyKC0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1hZnRlcik7XG59XG4vKiBTbGlkZSBzdHlsZXMgc3RhcnQgKi9cbi8qIDNEIFNoYWRvd3MgKi9cbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3csXG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQsXG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0LFxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AsXG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSxcbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3csXG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQsXG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0LFxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AsXG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgei1pbmRleDogMTA7XG59XG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93IHtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjE1KTtcbn1cbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBsZWZ0LCByZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMCkpO1xufVxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgcmdiYSgwLCAwLCAwLCAwLjUpLCByZ2JhKDAsIDAsIDAsIDApKTtcbn1cbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgcmdiYSgwLCAwLCAwLCAwLjUpLCByZ2JhKDAsIDAsIDAsIDApKTtcbn1cbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgwLCAwLCAwLCAwLjUpLCByZ2JhKDAsIDAsIDAsIDApKTtcbn1cbi5zd2lwZXItbGF6eS1wcmVsb2FkZXIge1xuICB3aWR0aDogNDJweDtcbiAgaGVpZ2h0OiA0MnB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwJTtcbiAgdG9wOiA1MCU7XG4gIG1hcmdpbi1sZWZ0OiAtMjFweDtcbiAgbWFyZ2luLXRvcDogLTIxcHg7XG4gIHotaW5kZXg6IDEwO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiA1MCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLXN3aXBlci1wcmVsb2FkZXItY29sb3IsIHZhcigtLXN3aXBlci10aGVtZS1jb2xvcikpO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJvcmRlci10b3AtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuLnN3aXBlcjpub3QoLnN3aXBlci13YXRjaC1wcm9ncmVzcykgLnN3aXBlci1sYXp5LXByZWxvYWRlcixcbi5zd2lwZXItd2F0Y2gtcHJvZ3Jlc3MgLnN3aXBlci1zbGlkZS12aXNpYmxlIC5zd2lwZXItbGF6eS1wcmVsb2FkZXIge1xuICBhbmltYXRpb246IHN3aXBlci1wcmVsb2FkZXItc3BpbiAxcyBpbmZpbml0ZSBsaW5lYXI7XG59XG4uc3dpcGVyLWxhenktcHJlbG9hZGVyLXdoaXRlIHtcbiAgLS1zd2lwZXItcHJlbG9hZGVyLWNvbG9yOiAjZmZmO1xufVxuLnN3aXBlci1sYXp5LXByZWxvYWRlci1ibGFjayB7XG4gIC0tc3dpcGVyLXByZWxvYWRlci1jb2xvcjogIzAwMDtcbn1cbkBrZXlmcmFtZXMgc3dpcGVyLXByZWxvYWRlci1zcGluIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICB9XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gIH1cbn1cbi8qIFNsaWRlIHN0eWxlcyBlbmQgKi9cbi5zd2lwZXItdmlydHVhbCAuc3dpcGVyLXNsaWRlIHtcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcbn1cbi5zd2lwZXItdmlydHVhbC5zd2lwZXItY3NzLW1vZGUgLnN3aXBlci13cmFwcGVyOjphZnRlciB7XG4gIGNvbnRlbnQ6ICcnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uc3dpcGVyLXZpcnR1YWwuc3dpcGVyLWNzcy1tb2RlLnN3aXBlci1ob3Jpem9udGFsIC5zd2lwZXItd3JhcHBlcjo6YWZ0ZXIge1xuICBoZWlnaHQ6IDFweDtcbiAgd2lkdGg6IHZhcigtLXN3aXBlci12aXJ0dWFsLXNpemUpO1xufVxuLnN3aXBlci12aXJ0dWFsLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItdmVydGljYWwgLnN3aXBlci13cmFwcGVyOjphZnRlciB7XG4gIHdpZHRoOiAxcHg7XG4gIGhlaWdodDogdmFyKC0tc3dpcGVyLXZpcnR1YWwtc2l6ZSk7XG59XG46cm9vdCB7XG4gIC0tc3dpcGVyLW5hdmlnYXRpb24tc2l6ZTogNDRweDtcbiAgLypcbiAgLS1zd2lwZXItbmF2aWdhdGlvbi10b3Atb2Zmc2V0OiA1MCU7XG4gIC0tc3dpcGVyLW5hdmlnYXRpb24tc2lkZXMtb2Zmc2V0OiAxMHB4O1xuICAtLXN3aXBlci1uYXZpZ2F0aW9uLWNvbG9yOiB2YXIoLS1zd2lwZXItdGhlbWUtY29sb3IpO1xuICAqL1xufVxuLnN3aXBlci1idXR0b24tcHJldixcbi5zd2lwZXItYnV0dG9uLW5leHQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogdmFyKC0tc3dpcGVyLW5hdmlnYXRpb24tdG9wLW9mZnNldCwgNTAlKTtcbiAgd2lkdGg6IGNhbGModmFyKC0tc3dpcGVyLW5hdmlnYXRpb24tc2l6ZSkgLyA0NCAqIDI3KTtcbiAgaGVpZ2h0OiB2YXIoLS1zd2lwZXItbmF2aWdhdGlvbi1zaXplKTtcbiAgbWFyZ2luLXRvcDogY2FsYygwcHggLSAodmFyKC0tc3dpcGVyLW5hdmlnYXRpb24tc2l6ZSkgLyAyKSk7XG4gIHotaW5kZXg6IDEwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjb2xvcjogdmFyKC0tc3dpcGVyLW5hdmlnYXRpb24tY29sb3IsIHZhcigtLXN3aXBlci10aGVtZS1jb2xvcikpO1xufVxuLnN3aXBlci1idXR0b24tcHJldi5zd2lwZXItYnV0dG9uLWRpc2FibGVkLFxuLnN3aXBlci1idXR0b24tbmV4dC5zd2lwZXItYnV0dG9uLWRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC4zNTtcbiAgY3Vyc29yOiBhdXRvO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cbi5zd2lwZXItYnV0dG9uLXByZXYuc3dpcGVyLWJ1dHRvbi1oaWRkZW4sXG4uc3dpcGVyLWJ1dHRvbi1uZXh0LnN3aXBlci1idXR0b24taGlkZGVuIHtcbiAgb3BhY2l0eTogMDtcbiAgY3Vyc29yOiBhdXRvO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cbi5zd2lwZXItbmF2aWdhdGlvbi1kaXNhYmxlZCAuc3dpcGVyLWJ1dHRvbi1wcmV2LFxuLnN3aXBlci1uYXZpZ2F0aW9uLWRpc2FibGVkIC5zd2lwZXItYnV0dG9uLW5leHQge1xuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG59XG4uc3dpcGVyLWJ1dHRvbi1wcmV2IHN2Zyxcbi5zd2lwZXItYnV0dG9uLW5leHQgc3ZnIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xufVxuLnN3aXBlci1ydGwgLnN3aXBlci1idXR0b24tcHJldiBzdmcsXG4uc3dpcGVyLXJ0bCAuc3dpcGVyLWJ1dHRvbi1uZXh0IHN2ZyB7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG59XG4uc3dpcGVyLWJ1dHRvbi1wcmV2LFxuLnN3aXBlci1ydGwgLnN3aXBlci1idXR0b24tbmV4dCB7XG4gIGxlZnQ6IHZhcigtLXN3aXBlci1uYXZpZ2F0aW9uLXNpZGVzLW9mZnNldCwgMTBweCk7XG4gIHJpZ2h0OiBhdXRvO1xufVxuLnN3aXBlci1idXR0b24tbmV4dCxcbi5zd2lwZXItcnRsIC5zd2lwZXItYnV0dG9uLXByZXYge1xuICByaWdodDogdmFyKC0tc3dpcGVyLW5hdmlnYXRpb24tc2lkZXMtb2Zmc2V0LCAxMHB4KTtcbiAgbGVmdDogYXV0bztcbn1cbi5zd2lwZXItYnV0dG9uLWxvY2sge1xuICBkaXNwbGF5OiBub25lO1xufVxuLyogTmF2aWdhdGlvbiBmb250IHN0YXJ0ICovXG4uc3dpcGVyLWJ1dHRvbi1wcmV2OmFmdGVyLFxuLnN3aXBlci1idXR0b24tbmV4dDphZnRlciB7XG4gIGZvbnQtZmFtaWx5OiBzd2lwZXItaWNvbnM7XG4gIGZvbnQtc2l6ZTogdmFyKC0tc3dpcGVyLW5hdmlnYXRpb24tc2l6ZSk7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lICFpbXBvcnRhbnQ7XG4gIGxldHRlci1zcGFjaW5nOiAwO1xuICBmb250LXZhcmlhbnQ6IGluaXRpYWw7XG4gIGxpbmUtaGVpZ2h0OiAxO1xufVxuLnN3aXBlci1idXR0b24tcHJldjphZnRlcixcbi5zd2lwZXItcnRsIC5zd2lwZXItYnV0dG9uLW5leHQ6YWZ0ZXIge1xuICBjb250ZW50OiAncHJldic7XG59XG4uc3dpcGVyLWJ1dHRvbi1uZXh0LFxuLnN3aXBlci1ydGwgLnN3aXBlci1idXR0b24tcHJldiB7XG4gIHJpZ2h0OiB2YXIoLS1zd2lwZXItbmF2aWdhdGlvbi1zaWRlcy1vZmZzZXQsIDEwcHgpO1xuICBsZWZ0OiBhdXRvO1xufVxuLnN3aXBlci1idXR0b24tbmV4dDphZnRlcixcbi5zd2lwZXItcnRsIC5zd2lwZXItYnV0dG9uLXByZXY6YWZ0ZXIge1xuICBjb250ZW50OiAnbmV4dCc7XG59XG4vKiBOYXZpZ2F0aW9uIGZvbnQgZW5kICovXG46cm9vdCB7XG4gIC8qXG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tY29sb3I6IHZhcigtLXN3aXBlci10aGVtZS1jb2xvcik7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tbGVmdDogYXV0bztcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1yaWdodDogOHB4O1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWJvdHRvbTogOHB4O1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLXRvcDogYXV0bztcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1mcmFjdGlvbi1jb2xvcjogaW5oZXJpdDtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1iZy1jb2xvcjogcmdiYSgwLDAsMCwwLjI1KTtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1zaXplOiA0cHg7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LXNpemU6IDhweDtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtd2lkdGg6IDhweDtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtaGVpZ2h0OiA4cHg7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWJvcmRlci1yYWRpdXM6IDUwJTtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtaW5hY3RpdmUtY29sb3I6ICMwMDA7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWluYWN0aXZlLW9wYWNpdHk6IDAuMjtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtb3BhY2l0eTogMTtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtaG9yaXpvbnRhbC1nYXA6IDRweDtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtdmVydGljYWwtZ2FwOiA2cHg7XG4gICovXG59XG4uc3dpcGVyLXBhZ2luYXRpb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogMzAwbXMgb3BhY2l0eTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgei1pbmRleDogMTA7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24uc3dpcGVyLXBhZ2luYXRpb24taGlkZGVuIHtcbiAgb3BhY2l0eTogMDtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1kaXNhYmxlZCA+IC5zd2lwZXItcGFnaW5hdGlvbixcbi5zd2lwZXItcGFnaW5hdGlvbi5zd2lwZXItcGFnaW5hdGlvbi1kaXNhYmxlZCB7XG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbn1cbi8qIENvbW1vbiBTdHlsZXMgKi9cbi5zd2lwZXItcGFnaW5hdGlvbi1mcmFjdGlvbixcbi5zd2lwZXItcGFnaW5hdGlvbi1jdXN0b20sXG4uc3dpcGVyLWhvcml6b250YWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cyxcbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLnN3aXBlci1wYWdpbmF0aW9uLWhvcml6b250YWwge1xuICBib3R0b206IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWJvdHRvbSwgOHB4KTtcbiAgdG9wOiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi10b3AsIGF1dG8pO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbn1cbi8qIEJ1bGxldHMgKi9cbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBmb250LXNpemU6IDA7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQge1xuICB0cmFuc2Zvcm06IHNjYWxlKDAuMzMpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUtbWFpbiB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlLXByZXYge1xuICB0cmFuc2Zvcm06IHNjYWxlKDAuNjYpO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZS1wcmV2LXByZXYge1xuICB0cmFuc2Zvcm06IHNjYWxlKDAuMzMpO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZS1uZXh0IHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjY2KTtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUtbmV4dC1uZXh0IHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjMzKTtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQge1xuICB3aWR0aDogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LXdpZHRoLCB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtc2l6ZSwgOHB4KSk7XG4gIGhlaWdodDogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWhlaWdodCwgdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LXNpemUsIDhweCkpO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1ib3JkZXItcmFkaXVzLCA1MCUpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtaW5hY3RpdmUtY29sb3IsICMwMDApO1xuICBvcGFjaXR5OiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtaW5hY3RpdmUtb3BhY2l0eSwgMC4yKTtcbn1cbmJ1dHRvbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQge1xuICBib3JkZXI6IG5vbmU7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgICAgIGFwcGVhcmFuY2U6IG5vbmU7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tY2xpY2thYmxlIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0Om9ubHktY2hpbGQge1xuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZSB7XG4gIG9wYWNpdHk6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1vcGFjaXR5LCAxKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tY29sb3IsIHZhcigtLXN3aXBlci10aGVtZS1jb2xvcikpO1xufVxuLnN3aXBlci12ZXJ0aWNhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLFxuLnN3aXBlci1wYWdpbmF0aW9uLXZlcnRpY2FsLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMge1xuICByaWdodDogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tcmlnaHQsIDhweCk7XG4gIGxlZnQ6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWxlZnQsIGF1dG8pO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIC01MCUsIDApO1xufVxuLnN3aXBlci12ZXJ0aWNhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQsXG4uc3dpcGVyLXBhZ2luYXRpb24tdmVydGljYWwuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0IHtcbiAgbWFyZ2luOiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtdmVydGljYWwtZ2FwLCA2cHgpIDA7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLnN3aXBlci12ZXJ0aWNhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyxcbi5zd2lwZXItcGFnaW5hdGlvbi12ZXJ0aWNhbC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyB7XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gIHdpZHRoOiA4cHg7XG59XG4uc3dpcGVyLXZlcnRpY2FsID4gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQsXG4uc3dpcGVyLXBhZ2luYXRpb24tdmVydGljYWwuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdHJhbnNpdGlvbjogMjAwbXMgdHJhbnNmb3JtLFxuICAgICAgICAyMDBtcyB0b3A7XG59XG4uc3dpcGVyLWhvcml6b250YWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LFxuLnN3aXBlci1wYWdpbmF0aW9uLWhvcml6b250YWwuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0IHtcbiAgbWFyZ2luOiAwIHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1ob3Jpem9udGFsLWdhcCwgNHB4KTtcbn1cbi5zd2lwZXItaG9yaXpvbnRhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyxcbi5zd2lwZXItcGFnaW5hdGlvbi1ob3Jpem9udGFsLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIHtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG4uc3dpcGVyLWhvcml6b250YWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCxcbi5zd2lwZXItcGFnaW5hdGlvbi1ob3Jpem9udGFsLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQge1xuICB0cmFuc2l0aW9uOiAyMDBtcyB0cmFuc2Zvcm0sXG4gICAgICAgIDIwMG1zIGxlZnQ7XG59XG4uc3dpcGVyLWhvcml6b250YWwuc3dpcGVyLXJ0bCA+IC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCB7XG4gIHRyYW5zaXRpb246IDIwMG1zIHRyYW5zZm9ybSxcbiAgICAyMDBtcyByaWdodDtcbn1cbi8qIEZyYWN0aW9uICovXG4uc3dpcGVyLXBhZ2luYXRpb24tZnJhY3Rpb24ge1xuICBjb2xvcjogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tZnJhY3Rpb24tY29sb3IsIGluaGVyaXQpO1xufVxuLyogUHJvZ3Jlc3MgKi9cbi5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2JhciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLWJnLWNvbG9yLCByZ2JhKDAsIDAsIDAsIDAuMjUpKTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyIC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1maWxsIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tY29sb3IsIHZhcigtLXN3aXBlci10aGVtZS1jb2xvcikpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCB0b3A7XG59XG4uc3dpcGVyLXJ0bCAuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIgLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLWZpbGwge1xuICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCB0b3A7XG59XG4uc3dpcGVyLWhvcml6b250YWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIsXG4uc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIuc3dpcGVyLXBhZ2luYXRpb24taG9yaXpvbnRhbCxcbi5zd2lwZXItdmVydGljYWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItb3Bwb3NpdGUsXG4uc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIuc3dpcGVyLXBhZ2luYXRpb24tdmVydGljYWwuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItb3Bwb3NpdGUge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1zaXplLCA0cHgpO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG59XG4uc3dpcGVyLXZlcnRpY2FsID4gLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLFxuLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLnN3aXBlci1wYWdpbmF0aW9uLXZlcnRpY2FsLFxuLnN3aXBlci1ob3Jpem9udGFsID4gLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLW9wcG9zaXRlLFxuLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLnN3aXBlci1wYWdpbmF0aW9uLWhvcml6b250YWwuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItb3Bwb3NpdGUge1xuICB3aWR0aDogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItc2l6ZSwgNHB4KTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tbG9jayB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG46cm9vdCB7XG4gIC8qXG4gIC0tc3dpcGVyLXNjcm9sbGJhci1ib3JkZXItcmFkaXVzOiAxMHB4O1xuICAtLXN3aXBlci1zY3JvbGxiYXItdG9wOiBhdXRvO1xuICAtLXN3aXBlci1zY3JvbGxiYXItYm90dG9tOiA0cHg7XG4gIC0tc3dpcGVyLXNjcm9sbGJhci1sZWZ0OiBhdXRvO1xuICAtLXN3aXBlci1zY3JvbGxiYXItcmlnaHQ6IDRweDtcbiAgLS1zd2lwZXItc2Nyb2xsYmFyLXNpZGVzLW9mZnNldDogMSU7XG4gIC0tc3dpcGVyLXNjcm9sbGJhci1iZy1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAtLXN3aXBlci1zY3JvbGxiYXItZHJhZy1iZy1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAtLXN3aXBlci1zY3JvbGxiYXItc2l6ZTogNHB4O1xuICAqL1xufVxuLnN3aXBlci1zY3JvbGxiYXIge1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLWJvcmRlci1yYWRpdXMsIDEwcHgpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvdWNoLWFjdGlvbjogbm9uZTtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1iZy1jb2xvciwgcmdiYSgwLCAwLCAwLCAwLjEpKTtcbn1cbi5zd2lwZXItc2Nyb2xsYmFyLWRpc2FibGVkID4gLnN3aXBlci1zY3JvbGxiYXIsXG4uc3dpcGVyLXNjcm9sbGJhci5zd2lwZXItc2Nyb2xsYmFyLWRpc2FibGVkIHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuLnN3aXBlci1ob3Jpem9udGFsID4gLnN3aXBlci1zY3JvbGxiYXIsXG4uc3dpcGVyLXNjcm9sbGJhci5zd2lwZXItc2Nyb2xsYmFyLWhvcml6b250YWwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IHZhcigtLXN3aXBlci1zY3JvbGxiYXItc2lkZXMtb2Zmc2V0LCAxJSk7XG4gIGJvdHRvbTogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1ib3R0b20sIDRweCk7XG4gIHRvcDogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci10b3AsIGF1dG8pO1xuICB6LWluZGV4OiA1MDtcbiAgaGVpZ2h0OiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLXNpemUsIDRweCk7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAyICogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1zaWRlcy1vZmZzZXQsIDElKSk7XG59XG4uc3dpcGVyLXZlcnRpY2FsID4gLnN3aXBlci1zY3JvbGxiYXIsXG4uc3dpcGVyLXNjcm9sbGJhci5zd2lwZXItc2Nyb2xsYmFyLXZlcnRpY2FsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLWxlZnQsIGF1dG8pO1xuICByaWdodDogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1yaWdodCwgNHB4KTtcbiAgdG9wOiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLXNpZGVzLW9mZnNldCwgMSUpO1xuICB6LWluZGV4OiA1MDtcbiAgd2lkdGg6IHZhcigtLXN3aXBlci1zY3JvbGxiYXItc2l6ZSwgNHB4KTtcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAyICogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1zaWRlcy1vZmZzZXQsIDElKSk7XG59XG4uc3dpcGVyLXNjcm9sbGJhci1kcmFnIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLWRyYWctYmctY29sb3IsIHJnYmEoMCwgMCwgMCwgMC41KSk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXN3aXBlci1zY3JvbGxiYXItYm9yZGVyLXJhZGl1cywgMTBweCk7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbn1cbi5zd2lwZXItc2Nyb2xsYmFyLWN1cnNvci1kcmFnIHtcbiAgY3Vyc29yOiBtb3ZlO1xufVxuLnN3aXBlci1zY3JvbGxiYXItbG9jayB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4vKiBab29tIGNvbnRhaW5lciBzdHlsZXMgc3RhcnQgKi9cbi5zd2lwZXItem9vbS1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnN3aXBlci16b29tLWNvbnRhaW5lciA+IGltZyxcbi5zd2lwZXItem9vbS1jb250YWluZXIgPiBzdmcsXG4uc3dpcGVyLXpvb20tY29udGFpbmVyID4gY2FudmFzIHtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICBvYmplY3QtZml0OiBjb250YWluO1xufVxuLyogWm9vbSBjb250YWluZXIgc3R5bGVzIGVuZCAqL1xuLnN3aXBlci1zbGlkZS16b29tZWQge1xuICBjdXJzb3I6IG1vdmU7XG4gIHRvdWNoLWFjdGlvbjogbm9uZTtcbn1cbi8qIGExMXkgKi9cbi5zd2lwZXIgLnN3aXBlci1ub3RpZmljYXRpb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIG9wYWNpdHk6IDA7XG4gIHotaW5kZXg6IC0xMDAwO1xufVxuLnN3aXBlci1mcmVlLW1vZGUgPiAuc3dpcGVyLXdyYXBwZXIge1xuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuLnN3aXBlci1ncmlkID4gLnN3aXBlci13cmFwcGVyIHtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuLnN3aXBlci1ncmlkLWNvbHVtbiA+IC5zd2lwZXItd3JhcHBlciB7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5zd2lwZXItZmFkZS5zd2lwZXItZnJlZS1tb2RlIC5zd2lwZXItc2xpZGUge1xuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XG59XG4uc3dpcGVyLWZhZGUgLnN3aXBlci1zbGlkZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB0cmFuc2l0aW9uLXByb3BlcnR5OiBvcGFjaXR5O1xufVxuLnN3aXBlci1mYWRlIC5zd2lwZXItc2xpZGUgLnN3aXBlci1zbGlkZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLnN3aXBlci1mYWRlIC5zd2lwZXItc2xpZGUtYWN0aXZlIHtcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XG59XG4uc3dpcGVyLWZhZGUgLnN3aXBlci1zbGlkZS1hY3RpdmUgLnN3aXBlci1zbGlkZS1hY3RpdmUge1xuICBwb2ludGVyLWV2ZW50czogYXV0bztcbn1cbi5zd2lwZXIuc3dpcGVyLWN1YmUge1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbn1cbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgei1pbmRleDogMTtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZSAuc3dpcGVyLXNsaWRlIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uc3dpcGVyLWN1YmUuc3dpcGVyLXJ0bCAuc3dpcGVyLXNsaWRlIHtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMTAwJSAwO1xufVxuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUtYWN0aXZlLFxuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUtYWN0aXZlIC5zd2lwZXItc2xpZGUtYWN0aXZlIHtcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XG59XG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZS1hY3RpdmUsXG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZS1uZXh0LFxuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUtcHJldiB7XG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuLnN3aXBlci1jdWJlIC5zd2lwZXItY3ViZS1zaGFkb3cge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvcGFjaXR5OiAwLjY7XG4gIHotaW5kZXg6IDA7XG59XG4uc3dpcGVyLWN1YmUgLnN3aXBlci1jdWJlLXNoYWRvdzpiZWZvcmUge1xuICBjb250ZW50OiAnJztcbiAgYmFja2dyb3VuZDogIzAwMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIGZpbHRlcjogYmx1cig1MHB4KTtcbn1cbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlLW5leHQgKyAuc3dpcGVyLXNsaWRlIHtcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG4vKiBDdWJlIHNsaWRlIHNoYWRvd3Mgc3RhcnQgKi9cbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlLXNoYWRvdy1jdWJlLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLFxuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUtc2hhZG93LWN1YmUuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20sXG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZS1zaGFkb3ctY3ViZS5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQsXG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZS1zaGFkb3ctY3ViZS5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0IHtcbiAgei1pbmRleDogMDtcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuLyogQ3ViZSBzbGlkZSBzaGFkb3dzIGVuZCAqL1xuLnN3aXBlci5zd2lwZXItZmxpcCB7XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuLnN3aXBlci1mbGlwIC5zd2lwZXItc2xpZGUge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICB6LWluZGV4OiAxO1xufVxuLnN3aXBlci1mbGlwIC5zd2lwZXItc2xpZGUgLnN3aXBlci1zbGlkZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLnN3aXBlci1mbGlwIC5zd2lwZXItc2xpZGUtYWN0aXZlLFxuLnN3aXBlci1mbGlwIC5zd2lwZXItc2xpZGUtYWN0aXZlIC5zd2lwZXItc2xpZGUtYWN0aXZlIHtcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XG59XG4vKiBGbGlwIHNsaWRlIHNoYWRvd3Mgc3RhcnQgKi9cbi5zd2lwZXItZmxpcCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1mbGlwLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLFxuLnN3aXBlci1mbGlwIC5zd2lwZXItc2xpZGUtc2hhZG93LWZsaXAuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20sXG4uc3dpcGVyLWZsaXAgLnN3aXBlci1zbGlkZS1zaGFkb3ctZmxpcC5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQsXG4uc3dpcGVyLWZsaXAgLnN3aXBlci1zbGlkZS1zaGFkb3ctZmxpcC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0IHtcbiAgei1pbmRleDogMDtcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuLyogRmxpcCBzbGlkZSBzaGFkb3dzIGVuZCAqL1xuLnN3aXBlci1jcmVhdGl2ZSAuc3dpcGVyLXNsaWRlIHtcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm0sIG9wYWNpdHksIGhlaWdodDtcbn1cbi5zd2lwZXIuc3dpcGVyLWNhcmRzIHtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG4uc3dpcGVyLWNhcmRzIC5zd2lwZXItc2xpZGUge1xuICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5gO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvZXh0ZW5zaW9ucy9zd2lwZXIvbG9hZGVyLmV4dGVuc2lvbi50c1xuZnVuY3Rpb24gZW5hYmxlVGlsZUNvbnRlbnQoc2xpZGUyKSB7XG4gIHNsaWRlMi5xdWVyeVNlbGVjdG9yKFwiLnRpbGUtbG9hZGluZ1wiKT8uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgc2xpZGUyLnF1ZXJ5U2VsZWN0b3IoXCIuaWNvbi1zZWN0aW9uLmhpZGRlblwiKT8uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbn1cbmZ1bmN0aW9uIGVuYWJsZVRpbGVJbWFnZShzbGlkZTIpIHtcbiAgY29uc3QgdGlsZUltYWdlID0gc2xpZGUyLnF1ZXJ5U2VsZWN0b3IoXCIudGlsZS1pbWFnZS13cmFwcGVyID4gaW1nXCIpO1xuICBpZiAodGlsZUltYWdlKSB7XG4gICAgaWYgKHRpbGVJbWFnZS5jb21wbGV0ZSkge1xuICAgICAgZW5hYmxlVGlsZUNvbnRlbnQoc2xpZGUyKTtcbiAgICB9XG4gICAgdGlsZUltYWdlLm9ubG9hZCA9ICgpID0+IGVuYWJsZVRpbGVDb250ZW50KHNsaWRlMik7XG4gIH1cbn1cbmZ1bmN0aW9uIGVuYWJsZVRpbGVJbWFnZXMod3JhcHBlcikge1xuICBjb25zdCBlbGVtZW50cyA9IHdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi51Z2MtdGlsZTpoYXMoLmljb24tc2VjdGlvbi5oaWRkZW4pXCIpO1xuICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiBlbmFibGVUaWxlSW1hZ2UoZWxlbWVudCkpO1xufVxuZnVuY3Rpb24gbG9hZEFsbFVubG9hZGVkVGlsZXMoKSB7XG4gIGNvbnN0IHRpbGVXcmFwcGVyID0gc2RrLnBsYWNlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnVnYy10aWxlc1wiKTtcbiAgaWYgKHRpbGVXcmFwcGVyKSB7XG4gICAgZW5hYmxlVGlsZUltYWdlcyh0aWxlV3JhcHBlcik7XG4gIH1cbn1cbnZhciBpbml0X2xvYWRlcl9leHRlbnNpb24gPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvZXh0ZW5zaW9ucy9zd2lwZXIvbG9hZGVyLmV4dGVuc2lvbi50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvZXh0ZW5zaW9ucy9zd2lwZXIvaW5kZXgudHNcbmZ1bmN0aW9uIGxvYWRTd2lwZXJTdHlsZXMoKSB7XG4gIHNkay5hZGRXaWRnZXRDdXN0b21TdHlsZXMoZm9udF9kZWZhdWx0KTtcbiAgc2RrLmFkZFNoYXJlZENzc0N1c3RvbVN0eWxlcyhcInN3aXBlci1idW5kbGVcIiwgc3dpcGVyX2J1bmRsZV9kZWZhdWx0LCBbXG4gICAgc2RrLnBsYWNlbWVudC5nZXRXaWRnZXRJZCgpLFxuICAgIFwiZXhwYW5kZWQtdGlsZXNcIixcbiAgICBcInVnYy1wcm9kdWN0c1wiXG4gIF0pO1xufVxudmFyIGluaXRfc3dpcGVyMiA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9leHRlbnNpb25zL3N3aXBlci9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfZm9udCgpO1xuICAgIGluaXRfc3dpcGVyX2J1bmRsZSgpO1xuICAgIGluaXRfbG9hZGVyX2V4dGVuc2lvbigpO1xuICAgIGluaXRfc3dpcGVyX2V4dGVuc2lvbigpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvZXh0ZW5zaW9ucy9pbmRleC50c1xudmFyIGluaXRfZXh0ZW5zaW9ucyA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9leHRlbnNpb25zL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9tYXNvbnJ5X2V4dGVuc2lvbigpO1xuICAgIGluaXRfc3dpcGVyMigpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci9lbWJlZC15b3V0dWJlLnRlbXBsYXRlLnRzeFxuZnVuY3Rpb24gRW1iZWRZb3V0dWJlKHsgdGlsZUlkLCB2aWRlb0lkIH0pIHtcbiAgY29uc3QgY29udGVudEVsZW1lbnQgPSBsb2FkWW91dHViZUlmcmFtZUNvbnRlbnQodGlsZUlkLCB2aWRlb0lkKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFxuICAgIFwiaWZyYW1lXCIsXG4gICAge1xuICAgICAgbG9hZGluZzogXCJsYXp5XCIsXG4gICAgICBpZDogYHl0LWZyYW1lLSR7dGlsZUlkfS0ke3ZpZGVvSWR9YCxcbiAgICAgIGNsYXNzOiBcInZpZGVvLWNvbnRlbnRcIixcbiAgICAgIGZyYW1lYm9yZGVyOiBcIjBcIixcbiAgICAgIHNyY2RvYzogY29udGVudEVsZW1lbnQuaW5uZXJIVE1MXG4gICAgfVxuICApO1xufVxuZnVuY3Rpb24gbG9hZFlvdXR1YmVJZnJhbWVDb250ZW50KHRpbGVJZCwgdmlkZW9JZCkge1xuICBjb25zdCBzY3JpcHRJZCA9IGB5dC1zY3JpcHQtJHt0aWxlSWR9LSR7dmlkZW9JZH1gO1xuICBjb25zdCBwbGF5ZXJJZCA9IGB5dC1wbGF5ZXItJHt0aWxlSWR9LSR7dmlkZW9JZH1gO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJodG1sXCIsIG51bGwsIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiaGVhZFwiLCBudWxsLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCB7IGlkOiBzY3JpcHRJZCwgc3JjOiBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGlcIiB9KSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwgbnVsbCwgbG9hZFlvdXR1YmVQbGF5ZXJBUEkocGxheWVySWQsIHZpZGVvSWQpKSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiYm9keVwiLCBudWxsLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBwbGF5ZXJJZCB9KSkpO1xufVxuZnVuY3Rpb24gbG9hZFlvdXR1YmVQbGF5ZXJBUEkocGxheWVySWQsIHZpZGVvSWQpIHtcbiAgcmV0dXJuIGBcbiAgbGV0IHBsYXllclxuXG4gIGZ1bmN0aW9uIGxvYWRQbGF5ZXIocGxheURlZmF1bHQgPSBmYWxzZSkge1xuICAgIHBsYXllciA9IG5ldyBZVC5QbGF5ZXIoXCIke3BsYXllcklkfVwiLCB7XG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICB2aWRlb0lkOiBcIiR7dmlkZW9JZH1cIixcbiAgICAgIHBsYXllclZhcnM6IHtcbiAgICAgICAgcGxheXNpbmxpbmU6IDFcbiAgICAgIH0sXG4gICAgICBldmVudHM6IHtcbiAgICAgICAgb25SZWFkeTogcGxheURlZmF1bHQgPyBwbGF5IDogcGF1c2UsXG4gICAgICAgIG9uRXJyb3I6IGVycm9ySGFuZGxlclxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBBUEkgcnVucyBhdXRvbWF0aWNhbGx5IG9uY2UgdGhlIGlmcmFtZS1hcGkgSlMgaXMgZG93bmxvYWRlZC5cbiAgLy8gVGhpcyB3aWxsIG5vdCBydW4gd2hlbiByZS1vcGVuaW5nIGV4cGFuZGVkIHRpbGVcbiAgZnVuY3Rpb24gb25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkoKSB7XG4gICAgbG9hZFBsYXllcigpXG4gIH1cblxuICBmdW5jdGlvbiBlcnJvckhhbmRsZXIoZSkge1xuICAgcGxheWVyPy5nZXRJZnJhbWUoKS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcInl0LXZpZGVvLWVycm9yXCIsIHsgZGV0YWlsOiBlIH0pKVxuICB9XG5cbiAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgaWYgKCFwbGF5ZXIpIHtcbiAgICAgIGxvYWRQbGF5ZXIoZmFsc2UpIC8vbmVlZGVkIHdoZW4gZXhwYW5kZWQgdGlsZSByZS1vcGVuZWRcbiAgICB9IGVsc2Uge1xuICAgICAgcGxheWVyLm11dGUoKVxuICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgcGxheWVyPy5kZXN0cm95KClcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHBsYXllcj8uc2Vla1RvKDAsIGZhbHNlKVxuICB9XG5cbiAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICBpZiAoIXBsYXllcikge1xuICAgICAgbG9hZFBsYXllcih0cnVlKSAvL25lZWRlZCB3aGVuIGV4cGFuZGVkIHRpbGUgcmUtb3BlbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAocGxheWVyLmlzTXV0ZWQoKSkge1xuICAgICAgICBwbGF5ZXIudW5NdXRlKClcbiAgICAgIH1cbiAgICAgIHBsYXllci5wbGF5VmlkZW8oKVxuICAgICAgfSwgNTAwKVxuICAgIH1cbiAgfSBgO1xufVxudmFyIGluaXRfZW1iZWRfeW91dHViZV90ZW1wbGF0ZSA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL2VtYmVkLXlvdXR1YmUudGVtcGxhdGUudHN4XCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9saWJzKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL3RpbGUudGVtcGxhdGUudHN4XG5mdW5jdGlvbiBFeHBhbmRlZFRpbGUoeyBzZGs6IHNkazIsIHRpbGUgfSkge1xuICBjb25zdCB7IHNob3dfc2hvcHNwb3RzLCBzaG93X3Byb2R1Y3RzLCBzaG93X3RhZ3MsIHNob3dfc2hhcmluZywgc2hvd19jYXB0aW9uLCBzaG93X3RpbWVzdGFtcCB9ID0gc2RrMi5nZXRFeHBhbmRlZFRpbGVDb25maWcoKTtcbiAgY29uc3Qgc2hvcHNwb3RFbmFibGVkID0gc2RrMi5pc0NvbXBvbmVudExvYWRlZChcInNob3BzcG90c1wiKSAmJiBzaG93X3Nob3BzcG90cyAmJiAhIXRpbGUuaG90c3BvdHM/Lmxlbmd0aDtcbiAgY29uc3QgcHJvZHVjdHNFbmFibGVkID0gc2RrMi5pc0NvbXBvbmVudExvYWRlZChcInByb2R1Y3RzXCIpICYmIHNob3dfcHJvZHVjdHMgJiYgISF0aWxlLnRhZ3NfZXh0ZW5kZWQ/Lmxlbmd0aDtcbiAgY29uc3QgdGFnc0VuYWJsZWQgPSBzaG93X3RhZ3M7XG4gIGNvbnN0IHNoYXJpbmdUb29sc0VuYWJsZWQgPSBzaG93X3NoYXJpbmc7XG4gIGNvbnN0IHBhcmVudCA9IHNkazIuZ2V0Tm9kZUlkKCk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChjcmVhdGVGcmFnbWVudCwgbnVsbCwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJwYW5lbFwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwicGFuZWwtbGVmdFwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KEljb25TZWN0aW9uLCB7IHRpbGUsIHByb2R1Y3RzRW5hYmxlZCB9KSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJpbWFnZS13cmFwcGVyXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJpbWFnZS13cmFwcGVyLWlubmVyXCIgfSwgdGlsZS5tZWRpYSA9PT0gXCJ2aWRlb1wiID8gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoY3JlYXRlRnJhZ21lbnQsIG51bGwsIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFZpZGVvQ29udGFpbmVyLCB7IHRpbGUsIHBhcmVudCB9KSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoVmlkZW9FcnJvckZhbGxiYWNrVGVtcGxhdGUsIHsgdGlsZSB9KSkgOiB0aWxlLm1lZGlhID09PSBcImltYWdlXCIgPyAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChJbWFnZVRlbXBsYXRlLCB7IHRpbGUsIGltYWdlOiB0aWxlLmltYWdlLCBzaG9wc3BvdEVuYWJsZWQsIHBhcmVudCB9KSA6IHRpbGUubWVkaWEgPT09IFwidGV4dFwiID8gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3M6IFwiY29udGVudC10ZXh0XCIgfSwgdGlsZS5tZXNzYWdlKSA6IHRpbGUubWVkaWEgPT09IFwiaHRtbFwiID8gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3M6IFwiY29udGVudC1odG1sXCIgfSwgdGlsZS5odG1sKSA6IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KGNyZWF0ZUZyYWdtZW50LCBudWxsKSkpKSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJwYW5lbC1yaWdodFwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwicGFuZWwtcmlnaHQtd3JhcHBlclwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiY29udGVudC13cmFwcGVyXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJjb250ZW50LWlubmVyLXdyYXBwZXJcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcbiAgICBcInRpbGUtY29udGVudFwiLFxuICAgIHtcbiAgICAgIHRpbGVJZDogdGlsZS5pZCxcbiAgICAgIFwicmVuZGVyLXNoYXJlLW1lbnVcIjogc2hhcmluZ1Rvb2xzRW5hYmxlZCxcbiAgICAgIFwicmVuZGVyLWNhcHRpb25cIjogc2hvd19jYXB0aW9uLFxuICAgICAgXCJyZW5kZXItdGltZXBocmFzZVwiOiBzaG93X3RpbWVzdGFtcFxuICAgIH1cbiAgKSwgdGFnc0VuYWJsZWQgJiYgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJ0aWxlLXRhZ3NcIiwgeyBcInRpbGUtaWRcIjogdGlsZS5pZCwgbW9kZTogXCJzd2lwZXJcIiwgY29udGV4dDogXCJleHBhbmRlZFwiLCBcIm5hdmlnYXRpb24tYXJyb3dzXCI6IFwidHJ1ZVwiIH0pLCBwcm9kdWN0c0VuYWJsZWQgJiYgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoY3JlYXRlRnJhZ21lbnQsIG51bGwsIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwidWdjLXByb2R1Y3RzXCIsIHsgcGFyZW50LCBcInRpbGUtaWRcIjogdGlsZS5pZCB9KSkpKSkpKSk7XG59XG5mdW5jdGlvbiBJY29uU2VjdGlvbih7IHRpbGUsIHByb2R1Y3RzRW5hYmxlZCB9KSB7XG4gIGNvbnN0IHRvcFNlY3Rpb25JY29uQ29udGVudCA9IFtdO1xuICBjb25zdCBib3R0b21TZWN0aW9uSWNvbkNvbnRlbnQgPSBbXTtcbiAgaWYgKHRpbGUuYXR0cnMuaW5jbHVkZXMoXCJpbnN0YWdyYW0ucmVlbFwiKSkge1xuICAgIHRvcFNlY3Rpb25JY29uQ29udGVudC5wdXNoKC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiY29udGVudC1pY29uIGljb24tcmVlbFwiIH0pKTtcbiAgfSBlbHNlIGlmICh0aWxlLmF0dHJzLmluY2x1ZGVzKFwieW91dHViZS5zaG9ydFwiKSkge1xuICAgIHRvcFNlY3Rpb25JY29uQ29udGVudC5wdXNoKC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiY29udGVudC1pY29uIGljb24teW91dHViZS1zaG9ydFwiIH0pKTtcbiAgfVxuICBpZiAocHJvZHVjdHNFbmFibGVkKSB7XG4gICAgdG9wU2VjdGlvbkljb25Db250ZW50LnB1c2goLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJzaG9wcGluZy1pY29uIGljb24tcHJvZHVjdHNcIiB9KSk7XG4gIH1cbiAgYm90dG9tU2VjdGlvbkljb25Db250ZW50LnB1c2goLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogYG5ldHdvcmstaWNvbiBpY29uLSR7dGlsZS5zb3VyY2V9YCB9KSk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImljb24tc2VjdGlvblwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwidG9wLXNlY3Rpb25cIiB9LCAuLi50b3BTZWN0aW9uSWNvbkNvbnRlbnQpLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImJvdHRvbS1zZWN0aW9uXCIgfSwgLi4uYm90dG9tU2VjdGlvbkljb25Db250ZW50KSk7XG59XG5mdW5jdGlvbiBTaG9wU3BvdFRlbXBsYXRlKHsgc2hvcHNwb3RFbmFibGVkLCBwYXJlbnQsIHRpbGVJZCB9KSB7XG4gIHJldHVybiBzaG9wc3BvdEVuYWJsZWQgPyAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChjcmVhdGVGcmFnbWVudCwgbnVsbCwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJzaG9wc3BvdC1pY29uXCIsIHsgcGFyZW50LCBtb2RlOiBcImV4cGFuZGVkXCIsIFwidGlsZS1pZFwiOiB0aWxlSWQgfSkpIDogLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoY3JlYXRlRnJhZ21lbnQsIG51bGwpO1xufVxuZnVuY3Rpb24gSW1hZ2VUZW1wbGF0ZSh7XG4gIHRpbGUsXG4gIGltYWdlLFxuICBzaG9wc3BvdEVuYWJsZWQgPSBmYWxzZSxcbiAgcGFyZW50XG59KSB7XG4gIHJldHVybiBpbWFnZSA/IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KGNyZWF0ZUZyYWdtZW50LCBudWxsLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImltYWdlLWZpbGxlclwiLCBzdHlsZTogeyBcImJhY2tncm91bmQtaW1hZ2VcIjogYHVybCgnJHtpbWFnZX0nKWAgfSB9KSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJpbWFnZVwiIH0sIHNob3BzcG90RW5hYmxlZCA/IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFNob3BTcG90VGVtcGxhdGUsIHsgc2hvcHNwb3RFbmFibGVkLCBwYXJlbnQsIHRpbGVJZDogdGlsZS5pZCB9KSA6IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KGNyZWF0ZUZyYWdtZW50LCBudWxsKSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgeyBjbGFzczogXCJpbWFnZS1lbGVtZW50XCIsIHNyYzogaW1hZ2UsIGxvYWRpbmc6IFwibGF6eVwiLCBhbHQ6IHRpbGUuZGVzY3JpcHRpb24gfHwgXCJJbWFnZVwiIH0pKSkgOiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChjcmVhdGVGcmFnbWVudCwgbnVsbCk7XG59XG5mdW5jdGlvbiBWaWRlb0NvbnRhaW5lcih7IHRpbGUsIHBhcmVudCB9KSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInZpZGVvLWNvbnRlbnQtd3JhcHBlclwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiaW1hZ2UtZmlsbGVyXCIsIHN0eWxlOiB7IFwiYmFja2dyb3VuZC1pbWFnZVwiOiBgdXJsKCcke3RpbGUub3JpZ2luYWxfaW1hZ2VfdXJsfScpYCB9IH0pLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChTb3VyY2VWaWRlb0NvbnRlbnQsIHsgdGlsZSwgcGFyZW50IH0pKTtcbn1cbmZ1bmN0aW9uIFNvdXJjZVZpZGVvQ29udGVudCh7IHRpbGUsIHBhcmVudCB9KSB7XG4gIGlmICh0aWxlLnNvdXJjZSA9PT0gXCJ0aWt0b2tcIiB8fCB0aWxlLnZpZGVvX3NvdXJjZSA9PT0gXCJ0aWt0b2tcIikge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChUaWtUb2tUZW1wbGF0ZSwgeyB0aWxlIH0pO1xuICB9XG4gIGlmICh0aWxlLnNvdXJjZSA9PT0gXCJ5b3V0dWJlXCIgJiYgdGlsZS55b3V0dWJlX2lkKSB7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KEVtYmVkWW91dHViZSwgeyB0aWxlSWQ6IHRpbGUuaWQsIHZpZGVvSWQ6IHRpbGUueW91dHViZV9pZCB9KTtcbiAgfVxuICBpZiAodGlsZS5zb3VyY2UgPT09IFwiZmFjZWJvb2tcIikge1xuICAgIGNvbnN0IHZpZGVvVXJsUGF0dGVybiA9IC92aWRlb3NcXC8oXFxkKSs/LztcbiAgICBpZiAoIXRpbGUudmlkZW9fZmlsZXM/Lmxlbmd0aCB8fCAhdmlkZW9VcmxQYXR0ZXJuLnRlc3QodGlsZS52aWRlb19maWxlc1swXS51cmwpKSB7XG4gICAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoVmlkZW9FcnJvckZhbGxiYWNrVGVtcGxhdGUsIHsgdGlsZSwgcGFyZW50LCBkZWZhdWx0SGlkZGVuOiBmYWxzZSB9KTtcbiAgICB9XG4gIH1cbiAgaWYgKHRpbGUuc291cmNlID09PSBcInR3aXR0ZXJcIikge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChUd2l0dGVyVGVtcGxhdGUsIHsgdGlsZSB9KTtcbiAgfVxuICBpZiAodGlsZS52aWRlb19maWxlcz8ubGVuZ3RoIHx8IHRpbGUudmlkZW8gJiYgdGlsZS52aWRlby5zdGFuZGFyZF9yZXNvbHV0aW9uKSB7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFVnY1ZpZGVvVGVtcGxhdGUsIHsgdGlsZSB9KTtcbiAgfVxuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoRmFjZWJvb2tGYWxsYmFja1RlbXBsYXRlLCB7IHRpbGUgfSk7XG59XG5mdW5jdGlvbiBnZXRWaWRlb0RhdGEodGlsZSkge1xuICBpZiAodGlsZS52aWRlb19maWxlcz8ubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRpbGUudmlkZW9fZmlsZXNbMF07XG4gIH1cbiAgaWYgKHRpbGUudmlkZW8gJiYgdGlsZS52aWRlby5zdGFuZGFyZF9yZXNvbHV0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBcImF1dG9cIixcbiAgICAgIGhlaWdodDogXCJhdXRvXCIsXG4gICAgICBtaW1lOiBcInZpZGVvL21wNFwiLFxuICAgICAgdXJsOiB0aWxlLnZpZGVvLnN0YW5kYXJkX3Jlc29sdXRpb24udXJsXG4gICAgfTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCB2aWRlbyBkYXRhXCIpO1xufVxuZnVuY3Rpb24gVWdjVmlkZW9UZW1wbGF0ZSh7IHRpbGUgfSkge1xuICBjb25zdCB7IHVybCwgd2lkdGgsIGhlaWdodCwgbWltZSB9ID0gZ2V0VmlkZW9EYXRhKHRpbGUpO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXG4gICAgXCJ2aWRlb1wiLFxuICAgIHtcbiAgICAgIG11dGVkOiB0cnVlLFxuICAgICAgdGlsZWlkOiB0aWxlLmlkLFxuICAgICAgY2xhc3M6IFwidmlkZW8tY29udGVudFwiLFxuICAgICAgY29udHJvbHM6IHRydWUsXG4gICAgICBwcmVsb2FkOiBcIm5vbmVcIixcbiAgICAgIHBsYXlzaW5saW5lOiBcInBsYXlzaW5saW5lXCIsXG4gICAgICBvbmNhbnBsYXk6IFwidGhpcy5tdXRlZD10cnVlXCJcbiAgICB9LFxuICAgIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwic291cmNlXCIsIHsgc3JjOiB1cmwsIHdpZHRoOiB3aWR0aC50b1N0cmluZygpLCBoZWlnaHQ6IGhlaWdodC50b1N0cmluZygpLCB0eXBlOiBtaW1lIH0pXG4gICk7XG59XG5mdW5jdGlvbiBUd2l0dGVyVGVtcGxhdGUoeyB0aWxlIH0pIHtcbiAgY29uc3QgeyBzdGFuZGFyZF9yZXNvbHV0aW9uIH0gPSB0aWxlLnZpZGVvO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXG4gICAgXCJ2aWRlb1wiLFxuICAgIHtcbiAgICAgIHRpbGVpZDogdGlsZS5pZCxcbiAgICAgIGNsYXNzOiBcInZpZGVvLWNvbnRlbnRcIixcbiAgICAgIGNvbnRyb2xzOiB0cnVlLFxuICAgICAgcHJlbG9hZDogXCJub25lXCIsXG4gICAgICBwbGF5c2lubGluZTogXCJwbGF5c2lubGluZVwiLFxuICAgICAgb25jYW5wbGF5OiBcInRoaXMubXV0ZWQ9dHJ1ZVwiXG4gICAgfSxcbiAgICAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInNvdXJjZVwiLCB7IHNyYzogc3RhbmRhcmRfcmVzb2x1dGlvbi51cmwgfSlcbiAgKTtcbn1cbmZ1bmN0aW9uIFRpa1Rva1RlbXBsYXRlKHsgdGlsZSB9KSB7XG4gIGNvbnN0IHRpa3Rva0lkID0gdGlsZS50aWt0b2tfaWQ7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcbiAgICBcImlmcmFtZVwiLFxuICAgIHtcbiAgICAgIGlkOiBgdGlrdG9rLWZyYW1lLSR7dGlsZS5pZH0tJHt0aWt0b2tJZH1gLFxuICAgICAgbG9hZGluZzogXCJsYXp5XCIsXG4gICAgICBjbGFzczogXCJ2aWRlby1jb250ZW50XCIsXG4gICAgICBmcmFtZWJvcmRlcjogXCIwXCIsXG4gICAgICBhbGxvd2Z1bGxzY3JlZW46IHRydWUsXG4gICAgICBhbGxvdzogXCJhdXRvcGxheVwiLFxuICAgICAgc3JjOiBgaHR0cHM6Ly93d3cudGlrdG9rLmNvbS9wbGF5ZXIvdjEvJHt0aWt0b2tJZH0/cmVsPTBgXG4gICAgfVxuICApO1xufVxuZnVuY3Rpb24gRmFjZWJvb2tGYWxsYmFja1RlbXBsYXRlKHsgdGlsZSB9KSB7XG4gIGNvbnN0IGVtYmVkQmxvY2sgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImZiLWNvbnRlbnQtd3JhcHBlclwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiZmItcm9vdFwiIH0pLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcbiAgICBcInNjcmlwdFwiLFxuICAgIHtcbiAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgZGVmZXI6IHRydWUsXG4gICAgICBjcm9zc29yaWdpbjogXCJhbm9ueW1vdXNcIixcbiAgICAgIHNyYzogXCJodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX0dCL3Nkay5qcyN4ZmJtbD0xJnZlcnNpb249djIxLjBcIlxuICAgIH1cbiAgKSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJmYi12aWRlb1wiLCBcImRhdGEtaHJlZlwiOiB0aWxlLm9yaWdpbmFsX2xpbmssIFwiZGF0YS13aWR0aFwiOiBcIjUwMFwiLCBcImRhdGEtc2hvdy10ZXh0XCI6IFwiZmFsc2VcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImJsb2NrcXVvdGVcIiwgeyBjaXRlOiB0aWxlLm9yaWdpbmFsX2xpbmssIGNsYXNzOiBcImZiLXhmYm1sLXBhcnNlLWlnbm9yZVwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiYVwiLCB7IGhyZWY6IHRpbGUub3JpZ2luYWxfbGluayB9KSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwpLCBcIlBvc3RlZCBieSBcIiwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgaHJlZjogYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS8kJHt0aWxlLnNvdXJjZV91c2VyX2lkfWAgfSwgdGlsZS5uYW1lKSwgXCIgb25cIiwgdGlsZS50aW1lX2FnbykpKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIsIHsgbG9hZGluZzogXCJsYXp5XCIsIGNsYXNzOiBcInZpZGVvLWNvbnRlbnRcIiwgZnJhbWVib3JkZXI6IFwiMFwiLCBhbGxvd2Z1bGxzY3JlZW46IHRydWUsIHNyY2RvYzogZW1iZWRCbG9jay5pbm5lckhUTUwgfSk7XG59XG5mdW5jdGlvbiBWaWRlb0Vycm9yRmFsbGJhY2tUZW1wbGF0ZSh7XG4gIHRpbGUsXG4gIGRlZmF1bHRIaWRkZW4gPSB0cnVlXG59KSB7XG4gIGNvbnN0IG9yaWdpbmFsSW1hZ2VVcmwgPSB0aWxlLm9yaWdpbmFsX2ltYWdlX3VybDtcbiAgY29uc3QgZmFsbGJhY2tDc3MgPSBgdmlkZW8tZmFsbGJhY2stY29udGVudCR7ZGVmYXVsdEhpZGRlbiA/IFwiIGhpZGRlblwiIDogXCJcIn1gO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogZmFsbGJhY2tDc3MgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJjZW50ZXItc2VjdGlvblwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwicGxheS1pY29uXCIgfSkpLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImFcIiwgeyBocmVmOiB0aWxlLm9yaWdpbmFsX3VybCB8fCB0aWxlLm9yaWdpbmFsX2xpbmssIHRhcmdldDogXCJfYmxhbmtcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChJbWFnZVRlbXBsYXRlLCB7IGltYWdlOiBvcmlnaW5hbEltYWdlVXJsLCB0aWxlIH0pLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInBsYXktaWNvblwiIH0pKSk7XG59XG52YXIgaW5pdF90aWxlX3RlbXBsYXRlID0gX19lc20oe1xuICBcInNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvdGlsZS50ZW1wbGF0ZS50c3hcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2xpYnMoKTtcbiAgICBpbml0X2VtYmVkX3lvdXR1YmVfdGVtcGxhdGUoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvYmFzZS50ZW1wbGF0ZS50c3hcbmZ1bmN0aW9uIEV4cGFuZGVkVGlsZXMoc2RrMikge1xuICBjb25zdCB0aWxlcyA9IHNkazIudGlsZXMudGlsZXM7XG4gIGNvbnN0IHsgc2hvd19uYXYgfSA9IHNkazIuZ2V0RXhwYW5kZWRUaWxlQ29uZmlnKCk7XG4gIGNvbnN0IG5hdmlnYXRpb25BcnJvd3NFbmFibGVkID0gc2hvd19uYXY7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImV4cGFuZGVkLXRpbGUtd3JhcHBlclwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzOiBcImV4aXRcIiwgaHJlZjogXCIjXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3M6IFwid2lkZ2V0LWljb24gY2xvc2Utd2hpdGVcIiB9KSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KEJhY2tBcnJvd0ljb24sIG51bGwpLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInN3aXBlciBzd2lwZXItZXhwYW5kZWRcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInN3aXBlci13cmFwcGVyIHVnYy10aWxlc1wiIH0sIE9iamVjdC52YWx1ZXModGlsZXMpLm1hcCgodGlsZSkgPT4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBjbGFzczogXCJ1Z2MtdGlsZSBzd2lwZXItc2xpZGVcIixcbiAgICAgIFwiZGF0YS1pZFwiOiB0aWxlLmlkLFxuICAgICAgXCJkYXRhLXl0LWlkXCI6IHRpbGUueW91dHViZV9pZCB8fCBcIlwiLFxuICAgICAgXCJkYXRhLXRpa3Rvay1pZFwiOiB0aWxlLnRpa3Rva19pZCB8fCBcIlwiXG4gICAgfSxcbiAgICAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChFeHBhbmRlZFRpbGUsIHsgc2RrOiBzZGsyLCB0aWxlIH0pXG4gICkpKSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgY2xhc3M6IFwic3dpcGVyLWV4cGFuZGVkLWJ1dHRvbi1wcmV2IHN3aXBlci1idXR0b24tcHJldiBidG4tbGdcIixcbiAgICAgIHN0eWxlOiB7IGRpc3BsYXk6IG5hdmlnYXRpb25BcnJvd3NFbmFibGVkID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9XG4gICAgfSxcbiAgICAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzczogXCJjaGV2cm9uLWxlZnRcIiwgYWx0OiBcIlByZXZpb3VzIGFycm93XCIgfSlcbiAgKSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBjbGFzczogXCJzd2lwZXItZXhwYW5kZWQtYnV0dG9uLW5leHQgc3dpcGVyLWJ1dHRvbi1uZXh0IGJ0bi1sZ1wiLFxuICAgICAgc3R5bGU6IHsgZGlzcGxheTogbmF2aWdhdGlvbkFycm93c0VuYWJsZWQgPyBcImZsZXhcIiA6IFwibm9uZVwiIH1cbiAgICB9LFxuICAgIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcImNoZXZyb24tcmlnaHRcIiwgYWx0OiBcIk5leHQgYXJyb3dcIiB9KVxuICApKTtcbn1cbmZ1bmN0aW9uIEJhY2tBcnJvd0ljb24oKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzczogXCJiYWNrXCIsIGhyZWY6IFwiI1wiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcIndpZGdldC1pY29uIGJhY2stYXJyb3dcIiB9KSk7XG59XG52YXIgaW5pdF9iYXNlX3RlbXBsYXRlID0gX19lc20oe1xuICBcInNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvYmFzZS50ZW1wbGF0ZS50c3hcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X3RpbGVfdGVtcGxhdGUoKTtcbiAgICBpbml0X2xpYnMoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvaW5kZXgudHNcbmZ1bmN0aW9uIGxvYWREZWZhdWx0RXhwYW5kZWRUaWxlVGVtcGxhdGVzKGFkZEV4cGFuZGVkVGlsZVRlbXBsYXRlcykge1xuICBpZiAoYWRkRXhwYW5kZWRUaWxlVGVtcGxhdGVzKSB7XG4gICAgc2RrLmFkZFRlbXBsYXRlVG9Db21wb25lbnQoRXhwYW5kZWRUaWxlcywgXCJleHBhbmRlZC10aWxlc1wiKTtcbiAgfVxufVxuZnVuY3Rpb24gbG9hZFdpZGdldEZvbnRzKGRlZmF1bHRGb250KSB7XG4gIHNkay5hZGRXaWRnZXRDdXN0b21TdHlsZXMoYCBcbiAgICBAaW1wb3J0IHVybCgnJHtkZWZhdWx0Rm9udH0nKTtcbiAgYm9keSB7XG4gICAgZm9udC1mYW1pbHk6ICdJbnRlcicsIHNhbnMtc2VyaWY7XG4gIH1gKTtcbn1cbmZ1bmN0aW9uIGxvYWRFeHBhbmRlZFRpbGVUZW1wbGF0ZXMoc2V0dGluZ3MpIHtcbiAgbG9hZERlZmF1bHRFeHBhbmRlZFRpbGVUZW1wbGF0ZXMoc2V0dGluZ3MudXNlRGVmYXVsdEV4cGFuZGVkVGlsZVRlbXBsYXRlcyk7XG4gIGxvYWRXaWRnZXRGb250cyhzZXR0aW5ncy5kZWZhdWx0Rm9udCk7XG4gIGlmIChzZXR0aW5ncy51c2VEZWZhdWx0U3dpcGVyU3R5bGVzKSB7XG4gICAgbG9hZFN3aXBlclN0eWxlcygpO1xuICB9XG59XG52YXIgaW5pdF9leHBhbmRlZF90aWxlX3N3aXBlciA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9iYXNlX3RlbXBsYXRlKCk7XG4gICAgaW5pdF9zd2lwZXIyKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9jb21wb25lbnRzL2xvYWQtbW9yZS9sb2FkLW1vcmUudGVtcGxhdGUudHN4XG5mdW5jdGlvbiBMb2FkTW9yZVRlbXBsYXRlKCkge1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJidXR0b25zXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgaWQ6IFwibG9hZC1tb3JlXCIgfSwgXCJMT0FEIE1PUkVcIikpO1xufVxudmFyIGluaXRfbG9hZF9tb3JlX3RlbXBsYXRlID0gX19lc20oe1xuICBcInNyYy9saWJzL2NvbXBvbmVudHMvbG9hZC1tb3JlL2xvYWQtbW9yZS50ZW1wbGF0ZS50c3hcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2xpYnMoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2NvbXBvbmVudHMvbG9hZC1tb3JlL2xvYWQtbW9yZS5jb21wb25lbnQudHNcbnZhciBMb2FkTW9yZUNvbXBvbmVudDtcbnZhciBpbml0X2xvYWRfbW9yZV9jb21wb25lbnQgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY29tcG9uZW50cy9sb2FkLW1vcmUvbG9hZC1tb3JlLmNvbXBvbmVudC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfbG9hZF9tb3JlX3RlbXBsYXRlKCk7XG4gICAgTG9hZE1vcmVDb21wb25lbnQgPSBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgfVxuICAgICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoTG9hZE1vcmVUZW1wbGF0ZSgpKTtcbiAgICAgIH1cbiAgICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgfVxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZShcImxvYWQtbW9yZVwiLCBMb2FkTW9yZUNvbXBvbmVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgfVxuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvY29tcG9uZW50cy9sb2FkLW1vcmUvaW5kZXgudHNcbnZhciBsb2FkX21vcmVfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQobG9hZF9tb3JlX2V4cG9ydHMsIHtcbiAgZGVmYXVsdDogKCkgPT4gbG9hZF9tb3JlX2RlZmF1bHRcbn0pO1xudmFyIGxvYWRfbW9yZV9kZWZhdWx0O1xudmFyIGluaXRfbG9hZF9tb3JlID0gX19lc20oe1xuICBcInNyYy9saWJzL2NvbXBvbmVudHMvbG9hZC1tb3JlL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9sb2FkX21vcmVfY29tcG9uZW50KCk7XG4gICAgbG9hZF9tb3JlX2RlZmF1bHQgPSBMb2FkTW9yZUNvbXBvbmVudDtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2NvbXBvbmVudHMvaW5kZXgudHNcbnZhciBpbml0X2NvbXBvbmVudHMgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY29tcG9uZW50cy9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfZXhwYW5kZWRfdGlsZV9zd2lwZXIoKTtcbiAgICBpbml0X2xvYWRfbW9yZSgpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvaW5kZXgudHNcbnZhciBpbml0X2xpYnMgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2Nzc192YXJpYWJsZXMoKTtcbiAgICBpbml0X2pzeF9odG1sKCk7XG4gICAgaW5pdF90aWxlX2xpYigpO1xuICAgIGluaXRfd2lkZ2V0X2NvbXBvbmVudHMoKTtcbiAgICBpbml0X3dpZGdldF9mZWF0dXJlcygpO1xuICAgIGluaXRfd2lkZ2V0X2xheW91dCgpO1xuICAgIGluaXRfd2lkZ2V0X3V0aWxzKCk7XG4gICAgaW5pdF9leHRlbnNpb25zKCk7XG4gICAgaW5pdF9jb21wb25lbnRzKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvZXZlbnRzL2luZGV4LnRzXG5mdW5jdGlvbiBsb2FkTGlzdGVuZXJzKHNldHRpbmdzKSB7XG4gIGNvbnN0IHtcbiAgICBvbkxvYWQ6IG9uTG9hZDIsXG4gICAgb25FeHBhbmRUaWxlLFxuICAgIG9uVGlsZUNsb3NlLFxuICAgIG9uVGlsZVJlbmRlcmVkOiBvblRpbGVSZW5kZXJlZDIsXG4gICAgb25Dcm9zc1NlbGxlcnNSZW5kZXJlZCxcbiAgICBvblRpbGVzVXBkYXRlZCxcbiAgICBvbldpZGdldEluaXRDb21wbGV0ZSxcbiAgICBvblRpbGVCZ0ltZ1JlbmRlckNvbXBsZXRlLFxuICAgIG9uVGlsZUJnSW1hZ2VFcnJvcixcbiAgICBvblJlc2l6ZTogb25SZXNpemUyLFxuICAgIG9uTG9hZE1vcmUsXG4gICAgb25Qcm9kdWN0QWN0aW9uQ2xpY2ssXG4gICAgb25FeHBhbmRlZFRpbGVJbWFnZUxvYWQsXG4gICAgb25FeHBhbmRlZFRpbGVPcGVuLFxuICAgIG9uRXhwYW5kZWRUaWxlQ2xvc2UsXG4gICAgb25CZWZvcmVFeHBhbmRlZFRpbGVJbWFnZVJlc2l6ZSxcbiAgICBvbkJlZm9yZUV4cGFuZGVkVGlsZUNsb3NlLFxuICAgIG9uQmVmb3JlRXhwYW5kZWRUaWxlT3BlbixcbiAgICBvblNob3BzcG90Rmx5b3V0RXhwYW5kLFxuICAgIG9uU2hvcHNwb3RUb2dnbGUsXG4gICAgb25TaG9wc3BvdE9wZW4sXG4gICAgb25TaG9wc3BvdEFjdGlvbkNsaWNrLFxuICAgIG9uVXNlckNsaWNrLFxuICAgIG9uU2hhcmVDbGljayxcbiAgICBvbkltcHJlc3Npb24sXG4gICAgb25MaWtlLFxuICAgIG9uRGlzbGlrZSxcbiAgICBvbkhvdmVyLFxuICAgIG9uUHJvZHVjdENsaWNrLFxuICAgIG9uUHJvZHVjdFBpbkNsaWNrLFxuICAgIG9uUHJvZHVjdFVzZXJDbGljayxcbiAgICBvblNob3BzcG90Rmx5b3V0LFxuICAgIG9uVGlsZU1ldGFkYXRhTG9hZGVkLFxuICAgIG9uVGlsZURhdGFTZXQsXG4gICAgb25IdG1sUmVuZGVyZWQsXG4gICAgb25Kc1JlbmRlcmVkLFxuICAgIG9uR2xvYmFsc0xvYWRlZCxcbiAgICBvblByb2R1Y3RQYWdlTG9hZGVkLFxuICAgIG9uUHJvZHVjdHNVcGRhdGVkLFxuICAgIG9uQWRkVG9DYXJ0RmFpbGVkLFxuICAgIG9uRW1haWxUaWxlTG9hZCxcbiAgICBvbkVtYWlsVGlsZUNsaWNrLFxuICAgIG9uTGlrZUNsaWNrLFxuICAgIG9uRGlzbGlrZUNsaWNrLFxuICAgIG9uVGlsZUV4cGFuZFByb2R1Y3RSZWNzUmVuZGVyZWQsXG4gICAgb25UaWxlRXhwYW5kQ3Jvc3NTZWxsZXJzUmVuZGVyZWQsXG4gICAgb25TaGFyZU1lbnVPcGVuZWQsXG4gICAgb25TaGFyZU1lbnVDbG9zZWRcbiAgfSA9IHNldHRpbmdzLmNhbGxiYWNrcztcbiAgb25Mb2FkMj8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX0xPQUQsIGV2ZW50MikpO1xuICBvbkV4cGFuZFRpbGU/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFX0VYUEFORF9SRU5ERVJFRCwgZXZlbnQyKSk7XG4gIG9uVGlsZUNsb3NlPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoXCJvblRpbGVDbG9zZVwiLCBldmVudDIpKTtcbiAgb25UaWxlUmVuZGVyZWQyPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyVGlsZUV4cGFuZExpc3RlbmVyKGV2ZW50MikpO1xuICBvbkNyb3NzU2VsbGVyc1JlbmRlcmVkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoXCJjcm9zc1NlbGxlcnNSZW5kZXJlZFwiLCBldmVudDIpKTtcbiAgb25XaWRnZXRJbml0Q29tcGxldGU/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihcIndpZGdldEluaXRcIiwgZXZlbnQyKSk7XG4gIG9uVGlsZUJnSW1nUmVuZGVyQ29tcGxldGU/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFX0JHX0lNR19SRU5ERVJfQ09NUExFVEUsIGV2ZW50MikpO1xuICBvblRpbGVCZ0ltYWdlRXJyb3I/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFX0JHX0lNR19FUlJPUiwgZXZlbnQyKSk7XG4gIG9uUmVzaXplMj8uZm9yRWFjaCgoZXZlbnQyKSA9PiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBldmVudDIpKTtcbiAgb25UaWxlc1VwZGF0ZWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFU19VUERBVEVELCBldmVudDIpKTtcbiAgb25Mb2FkTW9yZT8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKFwibG9hZE1vcmVcIiwgZXZlbnQyKSk7XG4gIG9uUHJvZHVjdEFjdGlvbkNsaWNrPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoUFJPRFVDVF9BQ1RJT05fQ0xJQ0ssIGV2ZW50MikpO1xuICBvbkV4cGFuZGVkVGlsZUltYWdlTG9hZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVYUEFOREVEX1RJTEVfSU1BR0VfTE9BRCwgZXZlbnQyKSk7XG4gIG9uRXhwYW5kZWRUaWxlT3Blbj8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVYUEFOREVEX1RJTEVfT1BFTiwgZXZlbnQyKSk7XG4gIG9uRXhwYW5kZWRUaWxlQ2xvc2U/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFWFBBTkRFRF9USUxFX0NMT1NFLCBldmVudDIpKTtcbiAgb25CZWZvcmVFeHBhbmRlZFRpbGVJbWFnZVJlc2l6ZT8uZm9yRWFjaChcbiAgICAoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEJFRk9SRV9FWFBBTkRFRF9USUxFX0lNQUdFX1JFU0laRSwgZXZlbnQyKVxuICApO1xuICBvbkJlZm9yZUV4cGFuZGVkVGlsZUNsb3NlPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoQkVGT1JFX0VYUEFOREVEX1RJTEVfQ0xPU0UsIGV2ZW50MikpO1xuICBvbkJlZm9yZUV4cGFuZGVkVGlsZU9wZW4/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihCRUZPUkVfRVhQQU5ERURfVElMRV9PUEVOLCBldmVudDIpKTtcbiAgb25TaG9wc3BvdEZseW91dEV4cGFuZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKFNIT1BTUE9UX0ZMWU9VVF9FWFBBTkQsIGV2ZW50MikpO1xuICBvblNob3BzcG90VG9nZ2xlPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoU0hPUFNQT1RfVE9HR0xFLCBldmVudDIpKTtcbiAgb25TaG9wc3BvdE9wZW4/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihTSE9QU1BPVF9PUEVOLCBldmVudDIpKTtcbiAgb25TaG9wc3BvdEFjdGlvbkNsaWNrPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoU0hPUFNQT1RfQUNUSU9OX0NMSUNLLCBldmVudDIpKTtcbiAgb25Vc2VyQ2xpY2s/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihVU0VSX0NMSUNLLCBldmVudDIpKTtcbiAgb25TaGFyZUNsaWNrPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfU0hBUkVfQ0xJQ0ssIGV2ZW50MikpO1xuICBvbkltcHJlc3Npb24/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9JTVBSRVNTSU9OLCBldmVudDIpKTtcbiAgb25MaWtlPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfTElLRSwgZXZlbnQyKSk7XG4gIG9uRGlzbGlrZT8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX0RJU0xJS0UsIGV2ZW50MikpO1xuICBvbkhvdmVyPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfSE9WRVIsIGV2ZW50MikpO1xuICBvblByb2R1Y3RDbGljaz8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1BST0RVQ1RfQ0xJQ0ssIGV2ZW50MikpO1xuICBvblByb2R1Y3RQaW5DbGljaz8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1BST0RVQ1RfUElOQ0xJQ0ssIGV2ZW50MikpO1xuICBvblByb2R1Y3RVc2VyQ2xpY2s/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9QUk9EVUNUX1VTRVJfQ0xJQ0ssIGV2ZW50MikpO1xuICBvblNob3BzcG90Rmx5b3V0Py5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfU0hPUFNQT1RfRkxZT1VULCBldmVudDIpKTtcbiAgb25UaWxlTWV0YWRhdGFMb2FkZWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFX01FVEFEQVRBX0xPQURFRCwgZXZlbnQyKSk7XG4gIG9uVGlsZURhdGFTZXQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFX0RBVEFfU0VULCBldmVudDIpKTtcbiAgb25IdG1sUmVuZGVyZWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9IVE1MX1JFTkRFUkVELCBldmVudDIpKTtcbiAgb25Kc1JlbmRlcmVkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfSlNfUkVOREVSRUQsIGV2ZW50MikpO1xuICBvbkdsb2JhbHNMb2FkZWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9HTE9CQUxTX0xPQURFRCwgZXZlbnQyKSk7XG4gIG9uUHJvZHVjdFBhZ2VMb2FkZWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9QUk9EVUNUX1BBR0VfTE9BREVELCBldmVudDIpKTtcbiAgb25Qcm9kdWN0c1VwZGF0ZWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9QUk9EVUNUU19VUERBVEVELCBldmVudDIpKTtcbiAgb25BZGRUb0NhcnRGYWlsZWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9BRERfVE9fQ0FSVF9GQUlMRUQsIGV2ZW50MikpO1xuICBvbkVtYWlsVGlsZUxvYWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFTUFJTF9USUxFX0xPQUQsIGV2ZW50MikpO1xuICBvbkVtYWlsVGlsZUNsaWNrPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRU1BSUxfVElMRV9DTElDSywgZXZlbnQyKSk7XG4gIG9uTGlrZUNsaWNrPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoTElLRV9DTElDSywgZXZlbnQyKSk7XG4gIG9uRGlzbGlrZUNsaWNrPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRElTTElLRV9DTElDSywgZXZlbnQyKSk7XG4gIG9uVGlsZUV4cGFuZFByb2R1Y3RSZWNzUmVuZGVyZWQ/LmZvckVhY2goXG4gICAgKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFX0VYUEFORF9QUk9EX1JFQ1NfUkVOREVSRUQsIGV2ZW50MilcbiAgKTtcbiAgb25UaWxlRXhwYW5kQ3Jvc3NTZWxsZXJzUmVuZGVyZWQ/LmZvckVhY2goXG4gICAgKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFX0VYUEFORF9DUk9TU19TRUxMRVJTX1JFTkRFUkVELCBldmVudDIpXG4gICk7XG4gIG9uU2hhcmVNZW51T3BlbmVkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfU0hBUkVfTUVOVV9PUEVORUQsIGV2ZW50MikpO1xuICBvblNoYXJlTWVudUNsb3NlZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1NIQVJFX01FTlVfQ0xPU0VELCBldmVudDIpKTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdENsaWNrRXZlbnRzKCkge1xuICBjb25zdCB0aWxlcyA9IHNkay5xdWVyeVNlbGVjdG9yQWxsKFwiLnVnYy10aWxlXCIpO1xuICBpZiAoIXRpbGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgdGlsZXMgVUkgZWxlbWVudFwiKTtcbiAgfVxuICB0aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgY29uc3QgdGlsZURhdGFJZCA9IHRpbGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgICBpZiAoIXRpbGVEYXRhSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIHRpbGUgZGF0YSBJRFwiKTtcbiAgICB9XG4gICAgY29uc3QgdXJsID0gc2RrLnRpbGVzLmdldFRpbGUodGlsZURhdGFJZCk/Lm9yaWdpbmFsX3VybDtcbiAgICBpZiAoIXVybCkge1xuICAgICAgY29uc29sZS53YXJuKFwiRmFpbGVkIHRvIGZpbmQgdGlsZSBVUkxcIiwgdGlsZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRpbGUub25jbGljayA9IChlKSA9PiB7XG4gICAgICBoYW5kbGVUaWxlQ2xpY2soZSwgdXJsKTtcbiAgICB9O1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyVGlsZUV4cGFuZExpc3RlbmVyKGZuID0gKCkgPT4ge1xufSkge1xuICBzZGsuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFX0VYUEFORCwgKGV2ZW50MikgPT4ge1xuICAgIGNvbnN0IGN1c3RvbUV2ZW50ID0gZXZlbnQyO1xuICAgIGNvbnN0IHRpbGVJZCA9IGN1c3RvbUV2ZW50LmRldGFpbC5kYXRhLnRpbGVJZDtcbiAgICBmbih0aWxlSWQpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyQ3Jvc3NTZWxsZXJzTG9hZExpc3RlbmVyKGZuID0gKCkgPT4ge1xufSkge1xuICBzZGsuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFX0VYUEFORF9DUk9TU19TRUxMRVJTX1JFTkRFUkVELCAoZXZlbnQyKSA9PiB7XG4gICAgY29uc3QgY3VzdG9tRXZlbnQgPSBldmVudDI7XG4gICAgY29uc3QgdGlsZUlkID0gY3VzdG9tRXZlbnQuZGV0YWlsLmRhdGE7XG4gICAgY29uc3QgdGFyZ2V0ID0gY3VzdG9tRXZlbnQuZGV0YWlsLnRhcmdldDtcbiAgICBmbih0aWxlSWQsIHRhcmdldCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZuKSB7XG4gIHNkay5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZm4pO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJTaGFyZU1lbnVPcGVuZWRMaXN0ZW5lcihmbiA9ICgpID0+IHtcbn0pIHtcbiAgc2RrLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRfU0hBUkVfTUVOVV9PUEVORUQsIChldmVudDIpID0+IHtcbiAgICBjb25zdCBjdXN0b21FdmVudCA9IGV2ZW50MjtcbiAgICBjb25zdCBzb3VyY2VJZCA9IGN1c3RvbUV2ZW50LmRldGFpbC5zb3VyY2VJZDtcbiAgICBmbihzb3VyY2VJZCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJTaGFyZU1lbnVDbG9zZWRMaXN0ZW5lcihmbiA9ICgpID0+IHtcbn0pIHtcbiAgc2RrLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRfU0hBUkVfTUVOVV9DTE9TRUQsIChldmVudDIpID0+IHtcbiAgICBjb25zdCBjdXN0b21FdmVudCA9IGV2ZW50MjtcbiAgICBjb25zdCBzb3VyY2VJZCA9IGN1c3RvbUV2ZW50LmRldGFpbC5zb3VyY2VJZDtcbiAgICBmbihzb3VyY2VJZCk7XG4gIH0pO1xufVxudmFyIFBST0RVQ1RfQUNUSU9OX0NMSUNLLCBFWFBBTkRFRF9USUxFX0lNQUdFX0xPQUQsIEVYUEFOREVEX1RJTEVfT1BFTiwgRVhQQU5ERURfVElMRV9DTE9TRSwgQkVGT1JFX0VYUEFOREVEX1RJTEVfSU1BR0VfUkVTSVpFLCBFWFBBTkRFRF9USUxFX0lNQUdFX1JFU0laRSwgQkVGT1JFX0VYUEFOREVEX1RJTEVfQ0xPU0UsIEJFRk9SRV9FWFBBTkRFRF9USUxFX09QRU4sIFNIT1BTUE9UX0ZMWU9VVF9FWFBBTkQsIFNIT1BTUE9UX1RPR0dMRSwgU0hPUFNQT1RfT1BFTiwgU0hPUFNQT1RfQUNUSU9OX0NMSUNLLCBVU0VSX0NMSUNLLCBFVkVOVF9JTVBSRVNTSU9OLCBFVkVOVF9MT0FELCBFVkVOVF9MT0FEX01PUkUsIEVWRU5UX0xJS0UsIEVWRU5UX0RJU0xJS0UsIEVWRU5UX0hPVkVSLCBFVkVOVF9QUk9EVUNUX0NMSUNLLCBFVkVOVF9QUk9EVUNUX1BJTkNMSUNLLCBFVkVOVF9USUxFX0VYUEFORCwgRVZFTlRfUFJPRFVDVF9VU0VSX0NMSUNLLCBFVkVOVF9TSEFSRV9DTElDSywgRVZFTlRfU0hPUFNQT1RfRkxZT1VULCBFVkVOVF9USUxFX01FVEFEQVRBX0xPQURFRCwgRVZFTlRfVElMRV9EQVRBX1NFVCwgRVZFTlRfSFRNTF9SRU5ERVJFRCwgRVZFTlRfSlNfUkVOREVSRUQsIEVWRU5UX0dMT0JBTFNfTE9BREVELCBDUk9TU19TRUxMRVJTX0xPQURFRCwgRVZFTlRfUFJPRFVDVF9QQUdFX0xPQURFRCwgRVZFTlRfUFJPRFVDVFNfVVBEQVRFRCwgRVZFTlRfQUREX1RPX0NBUlRfRkFJTEVELCBFVkVOVF9USUxFU19VUERBVEVELCBXSURHRVRfSU5JVF9DT01QTEVURSwgRU1BSUxfVElMRV9MT0FELCBFTUFJTF9USUxFX0NMSUNLLCBMSUtFX0NMSUNLLCBESVNMSUtFX0NMSUNLLCBFVkVOVF9USUxFX0VYUEFORF9SRU5ERVJFRCwgRVZFTlRfVElMRV9FWFBBTkRfUFJPRF9SRUNTX1JFTkRFUkVELCBFVkVOVF9USUxFX0VYUEFORF9DUk9TU19TRUxMRVJTX1JFTkRFUkVELCBFVkVOVF9USUxFX0JHX0lNR19FUlJPUiwgRVZFTlRfVElMRV9CR19JTUdfUkVOREVSX0NPTVBMRVRFLCBFVkVOVF9TSEFSRV9NRU5VX09QRU5FRCwgRVZFTlRfU0hBUkVfTUVOVV9DTE9TRUQsIGFsbEV2ZW50cywgY2FsbGJhY2tEZWZhdWx0cztcbnZhciBpbml0X2V2ZW50cyA9IF9fZXNtKHtcbiAgXCJzcmMvZXZlbnRzL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9saWJzKCk7XG4gICAgUFJPRFVDVF9BQ1RJT05fQ0xJQ0sgPSBcInByb2R1Y3RBY3Rpb25DbGlja1wiO1xuICAgIEVYUEFOREVEX1RJTEVfSU1BR0VfTE9BRCA9IFwiZXhwYW5kZWRUaWxlSW1hZ2VMb2FkXCI7XG4gICAgRVhQQU5ERURfVElMRV9PUEVOID0gXCJleHBhbmRlZFRpbGVPcGVuXCI7XG4gICAgRVhQQU5ERURfVElMRV9DTE9TRSA9IFwiZXhwYW5kZWRUaWxlQ2xvc2VcIjtcbiAgICBCRUZPUkVfRVhQQU5ERURfVElMRV9JTUFHRV9SRVNJWkUgPSBcImJlZm9yZUV4cGFuZGVkVGlsZUltYWdlUmVzaXplXCI7XG4gICAgRVhQQU5ERURfVElMRV9JTUFHRV9SRVNJWkUgPSBcImV4cGFuZGVkVGlsZUltYWdlUmVzaXplXCI7XG4gICAgQkVGT1JFX0VYUEFOREVEX1RJTEVfQ0xPU0UgPSBcImJlZm9yZUV4cGFuZGVkVGlsZUNsb3NlXCI7XG4gICAgQkVGT1JFX0VYUEFOREVEX1RJTEVfT1BFTiA9IFwiYmVmb3JlRXhwYW5kZWRUaWxlT3BlblwiO1xuICAgIFNIT1BTUE9UX0ZMWU9VVF9FWFBBTkQgPSBcInNob3BzcG90Rmx5b3V0RXhwYW5kXCI7XG4gICAgU0hPUFNQT1RfVE9HR0xFID0gXCJzaG9wc3BvdFRvZ2dsZVwiO1xuICAgIFNIT1BTUE9UX09QRU4gPSBcInNob3BzcG90T3BlblwiO1xuICAgIFNIT1BTUE9UX0FDVElPTl9DTElDSyA9IFwic2hvcHNwb3RBY3Rpb25DbGlja1wiO1xuICAgIFVTRVJfQ0xJQ0sgPSBcInVzZXJDbGlja1wiO1xuICAgIEVWRU5UX0lNUFJFU1NJT04gPSBcImltcHJlc3Npb25cIjtcbiAgICBFVkVOVF9MT0FEID0gXCJsb2FkXCI7XG4gICAgRVZFTlRfTE9BRF9NT1JFID0gXCJtb3JlTG9hZFwiO1xuICAgIEVWRU5UX0xJS0UgPSBcImxpa2VcIjtcbiAgICBFVkVOVF9ESVNMSUtFID0gXCJkaXNsaWtlXCI7XG4gICAgRVZFTlRfSE9WRVIgPSBcInRpbGVIb3ZlclwiO1xuICAgIEVWRU5UX1BST0RVQ1RfQ0xJQ0sgPSBcInByb2R1Y3RDbGlja1wiO1xuICAgIEVWRU5UX1BST0RVQ1RfUElOQ0xJQ0sgPSBcInBpbkNsaWNrXCI7XG4gICAgRVZFTlRfVElMRV9FWFBBTkQgPSBcInRpbGVFeHBhbmRcIjtcbiAgICBFVkVOVF9QUk9EVUNUX1VTRVJfQ0xJQ0sgPSBcInVzZXJDbGlja1wiO1xuICAgIEVWRU5UX1NIQVJFX0NMSUNLID0gXCJzaGFyZUNsaWNrXCI7XG4gICAgRVZFTlRfU0hPUFNQT1RfRkxZT1VUID0gXCJzaG9wc3BvdEZseW91dFwiO1xuICAgIEVWRU5UX1RJTEVfTUVUQURBVEFfTE9BREVEID0gXCJ0aWxlTWV0YWRhdGFMb2FkZWRcIjtcbiAgICBFVkVOVF9USUxFX0RBVEFfU0VUID0gXCJ0aWxlRGF0YVNldFwiO1xuICAgIEVWRU5UX0hUTUxfUkVOREVSRUQgPSBcImh0bWxSZW5kZXJlZFwiO1xuICAgIEVWRU5UX0pTX1JFTkRFUkVEID0gXCJqc1JlbmRlcmVkXCI7XG4gICAgRVZFTlRfR0xPQkFMU19MT0FERUQgPSBcImdsb2JhbHNMb2FkZWRcIjtcbiAgICBDUk9TU19TRUxMRVJTX0xPQURFRCA9IFwiY3Jvc3NTZWxsZXJzTG9hZGVkXCI7XG4gICAgRVZFTlRfUFJPRFVDVF9QQUdFX0xPQURFRCA9IFwicHJvZHVjdFBhZ2VMb2FkZWRcIjtcbiAgICBFVkVOVF9QUk9EVUNUU19VUERBVEVEID0gXCJwcm9kdWN0c1VwZGF0ZWRcIjtcbiAgICBFVkVOVF9BRERfVE9fQ0FSVF9GQUlMRUQgPSBcImFkZFRvQ2FydEZhaWxlZFwiO1xuICAgIEVWRU5UX1RJTEVTX1VQREFURUQgPSBcInRpbGVzVXBkYXRlZFwiO1xuICAgIFdJREdFVF9JTklUX0NPTVBMRVRFID0gXCJ3aWRnZXRJbml0Q29tcGxldGVcIjtcbiAgICBFTUFJTF9USUxFX0xPQUQgPSBcImVtYWlsVGlsZUxvYWRcIjtcbiAgICBFTUFJTF9USUxFX0NMSUNLID0gXCJlbWFpbFRpbGVDbGlja1wiO1xuICAgIExJS0VfQ0xJQ0sgPSBcImxpa2VDbGlja1wiO1xuICAgIERJU0xJS0VfQ0xJQ0sgPSBcImRpc2xpa2VDbGlja1wiO1xuICAgIEVWRU5UX1RJTEVfRVhQQU5EX1JFTkRFUkVEID0gXCJleHBhbmRlZFRpbGVSZW5kZXJlZFwiO1xuICAgIEVWRU5UX1RJTEVfRVhQQU5EX1BST0RfUkVDU19SRU5ERVJFRCA9IFwidGlsZUV4cGFuZFByb2R1Y3RSZWNzUmVuZGVyZWRcIjtcbiAgICBFVkVOVF9USUxFX0VYUEFORF9DUk9TU19TRUxMRVJTX1JFTkRFUkVEID0gXCJ0aWxlRXhwYW5kQ3Jvc3NTZWxsZXJzUmVuZGVyZWRcIjtcbiAgICBFVkVOVF9USUxFX0JHX0lNR19FUlJPUiA9IFwidGlsZUJnSW1hZ2VFcnJvclwiO1xuICAgIEVWRU5UX1RJTEVfQkdfSU1HX1JFTkRFUl9DT01QTEVURSA9IFwidGlsZUJnSW1nUmVuZGVyQ29tcGxldGVcIjtcbiAgICBFVkVOVF9TSEFSRV9NRU5VX09QRU5FRCA9IFwic2hhcmVNZW51T3BlbmVkXCI7XG4gICAgRVZFTlRfU0hBUkVfTUVOVV9DTE9TRUQgPSBcInNoYXJlTWVudUNsb3NlZFwiO1xuICAgIGFsbEV2ZW50cyA9IFtcbiAgICAgIFBST0RVQ1RfQUNUSU9OX0NMSUNLLFxuICAgICAgRVhQQU5ERURfVElMRV9JTUFHRV9MT0FELFxuICAgICAgRVhQQU5ERURfVElMRV9PUEVOLFxuICAgICAgRVhQQU5ERURfVElMRV9DTE9TRSxcbiAgICAgIEJFRk9SRV9FWFBBTkRFRF9USUxFX0lNQUdFX1JFU0laRSxcbiAgICAgIEVYUEFOREVEX1RJTEVfSU1BR0VfUkVTSVpFLFxuICAgICAgQkVGT1JFX0VYUEFOREVEX1RJTEVfQ0xPU0UsXG4gICAgICBCRUZPUkVfRVhQQU5ERURfVElMRV9PUEVOLFxuICAgICAgU0hPUFNQT1RfRkxZT1VUX0VYUEFORCxcbiAgICAgIFNIT1BTUE9UX1RPR0dMRSxcbiAgICAgIFNIT1BTUE9UX09QRU4sXG4gICAgICBTSE9QU1BPVF9BQ1RJT05fQ0xJQ0ssXG4gICAgICBVU0VSX0NMSUNLLFxuICAgICAgRVZFTlRfSU1QUkVTU0lPTixcbiAgICAgIEVWRU5UX0xPQUQsXG4gICAgICBFVkVOVF9MT0FEX01PUkUsXG4gICAgICBFVkVOVF9MSUtFLFxuICAgICAgRVZFTlRfRElTTElLRSxcbiAgICAgIEVWRU5UX0hPVkVSLFxuICAgICAgRVZFTlRfUFJPRFVDVF9DTElDSyxcbiAgICAgIEVWRU5UX1BST0RVQ1RfUElOQ0xJQ0ssXG4gICAgICBFVkVOVF9USUxFX0VYUEFORCxcbiAgICAgIEVWRU5UX1BST0RVQ1RfVVNFUl9DTElDSyxcbiAgICAgIEVWRU5UX1NIQVJFX0NMSUNLLFxuICAgICAgRVZFTlRfU0hPUFNQT1RfRkxZT1VULFxuICAgICAgRVZFTlRfVElMRV9NRVRBREFUQV9MT0FERUQsXG4gICAgICBFVkVOVF9USUxFX0RBVEFfU0VULFxuICAgICAgRVZFTlRfSFRNTF9SRU5ERVJFRCxcbiAgICAgIEVWRU5UX0pTX1JFTkRFUkVELFxuICAgICAgRVZFTlRfR0xPQkFMU19MT0FERUQsXG4gICAgICBDUk9TU19TRUxMRVJTX0xPQURFRCxcbiAgICAgIEVWRU5UX1BST0RVQ1RfUEFHRV9MT0FERUQsXG4gICAgICBFVkVOVF9QUk9EVUNUU19VUERBVEVELFxuICAgICAgRVZFTlRfQUREX1RPX0NBUlRfRkFJTEVELFxuICAgICAgRVZFTlRfVElMRVNfVVBEQVRFRCxcbiAgICAgIFdJREdFVF9JTklUX0NPTVBMRVRFLFxuICAgICAgRU1BSUxfVElMRV9MT0FELFxuICAgICAgRU1BSUxfVElMRV9DTElDSyxcbiAgICAgIExJS0VfQ0xJQ0ssXG4gICAgICBESVNMSUtFX0NMSUNLLFxuICAgICAgRVZFTlRfVElMRV9FWFBBTkRfUkVOREVSRUQsXG4gICAgICBFVkVOVF9USUxFX0VYUEFORF9QUk9EX1JFQ1NfUkVOREVSRUQsXG4gICAgICBFVkVOVF9USUxFX0VYUEFORF9DUk9TU19TRUxMRVJTX1JFTkRFUkVELFxuICAgICAgRVZFTlRfVElMRV9CR19JTUdfRVJST1IsXG4gICAgICBFVkVOVF9USUxFX0JHX0lNR19SRU5ERVJfQ09NUExFVEUsXG4gICAgICBFVkVOVF9TSEFSRV9NRU5VX09QRU5FRCxcbiAgICAgIEVWRU5UX1NIQVJFX01FTlVfQ0xPU0VEXG4gICAgXTtcbiAgICBjYWxsYmFja0RlZmF1bHRzID0ge1xuICAgICAgb25SZXNpemU6IFtdLFxuICAgICAgb25Mb2FkOiBbXSxcbiAgICAgIG9uRXhwYW5kVGlsZTogW10sXG4gICAgICBvblRpbGVDbG9zZTogW10sXG4gICAgICBvblRpbGVSZW5kZXJlZDogW10sXG4gICAgICBvblRpbGVzVXBkYXRlZDogW10sXG4gICAgICBvbkNyb3NzU2VsbGVyc1JlbmRlcmVkOiBbXSxcbiAgICAgIG9uV2lkZ2V0SW5pdENvbXBsZXRlOiBbXSxcbiAgICAgIG9uVGlsZUJnSW1nUmVuZGVyQ29tcGxldGU6IFtdLFxuICAgICAgb25UaWxlQmdJbWFnZUVycm9yOiBbXSxcbiAgICAgIG9uUHJvZHVjdEFjdGlvbkNsaWNrOiBbXSxcbiAgICAgIG9uRXhwYW5kZWRUaWxlSW1hZ2VMb2FkOiBbXSxcbiAgICAgIG9uRXhwYW5kZWRUaWxlT3BlbjogW10sXG4gICAgICBvbkV4cGFuZGVkVGlsZUNsb3NlOiBbXSxcbiAgICAgIG9uQmVmb3JlRXhwYW5kZWRUaWxlSW1hZ2VSZXNpemU6IFtdLFxuICAgICAgb25CZWZvcmVFeHBhbmRlZFRpbGVDbG9zZTogW10sXG4gICAgICBvbkJlZm9yZUV4cGFuZGVkVGlsZU9wZW46IFtdLFxuICAgICAgb25TaG9wc3BvdEZseW91dEV4cGFuZDogW10sXG4gICAgICBvblNob3BzcG90VG9nZ2xlOiBbXSxcbiAgICAgIG9uU2hvcHNwb3RPcGVuOiBbXSxcbiAgICAgIG9uU2hvcHNwb3RBY3Rpb25DbGljazogW10sXG4gICAgICBvblVzZXJDbGljazogW10sXG4gICAgICBvblNoYXJlQ2xpY2s6IFtdLFxuICAgICAgb25JbXByZXNzaW9uOiBbXSxcbiAgICAgIG9uTG9hZE1vcmU6IFtdLFxuICAgICAgb25MaWtlOiBbXSxcbiAgICAgIG9uRGlzbGlrZTogW10sXG4gICAgICBvbkhvdmVyOiBbXSxcbiAgICAgIG9uUHJvZHVjdENsaWNrOiBbXSxcbiAgICAgIG9uUHJvZHVjdFBpbkNsaWNrOiBbXSxcbiAgICAgIG9uUHJvZHVjdFVzZXJDbGljazogW10sXG4gICAgICBvblNob3BzcG90Rmx5b3V0OiBbXSxcbiAgICAgIG9uVGlsZU1ldGFkYXRhTG9hZGVkOiBbXSxcbiAgICAgIG9uVGlsZURhdGFTZXQ6IFtdLFxuICAgICAgb25IdG1sUmVuZGVyZWQ6IFtdLFxuICAgICAgb25Kc1JlbmRlcmVkOiBbXSxcbiAgICAgIG9uR2xvYmFsc0xvYWRlZDogW10sXG4gICAgICBvblByb2R1Y3RQYWdlTG9hZGVkOiBbXSxcbiAgICAgIG9uUHJvZHVjdHNVcGRhdGVkOiBbXSxcbiAgICAgIG9uQWRkVG9DYXJ0RmFpbGVkOiBbXSxcbiAgICAgIG9uRW1haWxUaWxlTG9hZDogW10sXG4gICAgICBvbkVtYWlsVGlsZUNsaWNrOiBbXSxcbiAgICAgIG9uTGlrZUNsaWNrOiBbXSxcbiAgICAgIG9uRGlzbGlrZUNsaWNrOiBbXSxcbiAgICAgIG9uVGlsZUV4cGFuZFByb2R1Y3RSZWNzUmVuZGVyZWQ6IFtdLFxuICAgICAgb25UaWxlRXhwYW5kQ3Jvc3NTZWxsZXJzUmVuZGVyZWQ6IFtdLFxuICAgICAgb25TaGFyZU1lbnVPcGVuZWQ6IFtdLFxuICAgICAgb25TaGFyZU1lbnVDbG9zZWQ6IFtdXG4gICAgfTtcbiAgfVxufSk7XG5cbi8vIHNyYy9ob29rcy91c2VJbmZpbml0ZVNjcm9sbGVyLnRzXG5mdW5jdGlvbiBleGNlZWRzQm91bmRhcmllcyhzZGsyLCB3aW5kb3dJbnN0YW5jZSkge1xuICBjb25zdCB0aWxlcyA9IHNkazIucXVlcnlTZWxlY3RvckFsbChcIi51Z2MtdGlsZVwiKTtcbiAgaWYgKCF0aWxlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIHRpbGVzIGZvciBib3VuZGFyeSBjaGVja1wiKTtcbiAgfVxuICBjb25zdCBsYXN0VGlsZSA9IHRpbGVzLml0ZW0odGlsZXMubGVuZ3RoIC0gMSk7XG4gIGlmICghbGFzdFRpbGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBsYXN0IHRpbGVcIik7XG4gIH1cbiAgY29uc3QgbGFzdFRpbGVQb3NpdGlvbiA9IGxhc3RUaWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGxhc3RUaWxlLm9mZnNldEhlaWdodDtcbiAgcmV0dXJuIGxhc3RUaWxlUG9zaXRpb24gPD0gd2luZG93SW5zdGFuY2UuaW5uZXJIZWlnaHQgKyAxMDA7XG59XG5mdW5jdGlvbiB1c2VJbmZpbml0ZVNjcm9sbGVyKHNkazIsIHdpbmRvd0luc3RhbmNlID0gd2luZG93LCBvbkxvYWRNb3JlID0gKCkgPT4ge1xuICBzZGsyLnRyaWdnZXJFdmVudChFVkVOVF9MT0FEX01PUkUpO1xufSkge1xuICBmdW5jdGlvbiBvblNjcm9sbDIoKSB7XG4gICAgaWYgKHdpbmRvd0luc3RhbmNlLnNjcm9sbExvY2tlZCkgcmV0dXJuO1xuICAgIHdpbmRvd0luc3RhbmNlLnNjcm9sbExvY2tlZCA9IHRydWU7XG4gICAgaWYgKGV4Y2VlZHNCb3VuZGFyaWVzKHNkazIsIHdpbmRvd0luc3RhbmNlKSkge1xuICAgICAgb25Mb2FkTW9yZSgpO1xuICAgIH1cbiAgICB3aW5kb3dJbnN0YW5jZS5zY3JvbGxMb2NrZWQgPSBmYWxzZTtcbiAgfVxuICB3aW5kb3dJbnN0YW5jZS5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsMik7XG59XG52YXIgdXNlSW5maW5pdGVTY3JvbGxlcl9kZWZhdWx0O1xudmFyIGluaXRfdXNlSW5maW5pdGVTY3JvbGxlciA9IF9fZXNtKHtcbiAgXCJzcmMvaG9va3MvdXNlSW5maW5pdGVTY3JvbGxlci50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfZXZlbnRzKCk7XG4gICAgdXNlSW5maW5pdGVTY3JvbGxlcl9kZWZhdWx0ID0gdXNlSW5maW5pdGVTY3JvbGxlcjtcbiAgfVxufSk7XG5cbi8vIHNyYy9ob29rcy9pbmRleC50c1xudmFyIGluaXRfaG9va3MgPSBfX2VzbSh7XG4gIFwic3JjL2hvb2tzL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF91c2VJbmZpbml0ZVNjcm9sbGVyKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvd2lkZ2V0cy50c1xudmFyIGluaXRfd2lkZ2V0cyA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvd2lkZ2V0cy50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL3R5cGVzLnRzXG52YXIgaW5pdF90eXBlcyA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvdHlwZXMudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9jb21wb25lbnRzL3VnYy5jb21wb25lbnQudHNcbnZhciBpbml0X3VnY19jb21wb25lbnQgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2NvbXBvbmVudHMvdWdjLmNvbXBvbmVudC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2NvbXBvbmVudHMvcHJvZHVjdHMuY29tcG9uZW50LnRzXG52YXIgaW5pdF9wcm9kdWN0c19jb21wb25lbnQgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2NvbXBvbmVudHMvcHJvZHVjdHMuY29tcG9uZW50LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvY29tcG9uZW50cy9zaGFyZS1tZW51LmNvbXBvbmVudC50c1xudmFyIGluaXRfc2hhcmVfbWVudV9jb21wb25lbnQgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2NvbXBvbmVudHMvc2hhcmUtbWVudS5jb21wb25lbnQudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9jb21wb25lbnRzL3N0YXRpYy5jb21wb25lbnQudHNcbnZhciBpbml0X3N0YXRpY19jb21wb25lbnQgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2NvbXBvbmVudHMvc3RhdGljLmNvbXBvbmVudC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2NvbXBvbmVudHMvdGlsZS1jb21wb25lbnQudHNcbnZhciBpbml0X3RpbGVfY29tcG9uZW50ID0gX19lc20oe1xuICBcInNyYy90eXBlcy9jb21wb25lbnRzL3RpbGUtY29tcG9uZW50LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvY29tcG9uZW50cy9pbmRleC50c1xudmFyIGluaXRfY29tcG9uZW50czIgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2NvbXBvbmVudHMvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X3VnY19jb21wb25lbnQoKTtcbiAgICBpbml0X3Byb2R1Y3RzX2NvbXBvbmVudCgpO1xuICAgIGluaXRfc2hhcmVfbWVudV9jb21wb25lbnQoKTtcbiAgICBpbml0X3N0YXRpY19jb21wb25lbnQoKTtcbiAgICBpbml0X3RpbGVfY29tcG9uZW50KCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvY29yZS9wbGFjZW1lbnQudHNcbnZhciBpbml0X3BsYWNlbWVudCA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvY29yZS9wbGFjZW1lbnQudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9jb3JlL3Nkay50c1xudmFyIGluaXRfc2RrID0gX19lc20oe1xuICBcInNyYy90eXBlcy9jb3JlL3Nkay50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2NvcmUvdGlsZS50c1xudmFyIGluaXRfdGlsZSA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvY29yZS90aWxlLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvY29yZS93aWRnZXQtcmVxdWVzdC50c1xudmFyIGluaXRfd2lkZ2V0X3JlcXVlc3QgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2NvcmUvd2lkZ2V0LXJlcXVlc3QudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9jb3JlL2luZGV4LnRzXG52YXIgaW5pdF9jb3JlID0gX19lc20oe1xuICBcInNyYy90eXBlcy9jb3JlL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9wbGFjZW1lbnQoKTtcbiAgICBpbml0X3NkaygpO1xuICAgIGluaXRfdGlsZSgpO1xuICAgIGluaXRfd2lkZ2V0X3JlcXVlc3QoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9zZXJ2aWNlcy9iYXNlLnNlcnZpY2UudHNcbnZhciBpbml0X2Jhc2Vfc2VydmljZSA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvc2VydmljZXMvYmFzZS5zZXJ2aWNlLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvc2VydmljZXMvZXZlbnQuc2VydmljZS50c1xudmFyIGluaXRfZXZlbnRfc2VydmljZSA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvc2VydmljZXMvZXZlbnQuc2VydmljZS50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL3NlcnZpY2VzL3RpbGVzLnNlcnZpY2UudHNcbnZhciBpbml0X3RpbGVzX3NlcnZpY2UgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL3NlcnZpY2VzL3RpbGVzLnNlcnZpY2UudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9zZXJ2aWNlcy93aWRnZXQuc2VydmljZS50c1xudmFyIGluaXRfd2lkZ2V0X3NlcnZpY2UgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL3NlcnZpY2VzL3dpZGdldC5zZXJ2aWNlLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvc2VydmljZXMvZXZlbnRzL3RpbGUtZXZlbnQudHNcbnZhciBpbml0X3RpbGVfZXZlbnQgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL3NlcnZpY2VzL2V2ZW50cy90aWxlLWV2ZW50LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvc2VydmljZXMvZXZlbnRzL3dpZGdldC1ldmVudC50c1xudmFyIGluaXRfd2lkZ2V0X2V2ZW50ID0gX19lc20oe1xuICBcInNyYy90eXBlcy9zZXJ2aWNlcy9ldmVudHMvd2lkZ2V0LWV2ZW50LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvc2VydmljZXMvaW5kZXgudHNcbnZhciBpbml0X3NlcnZpY2VzID0gX19lc20oe1xuICBcInNyYy90eXBlcy9zZXJ2aWNlcy9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfYmFzZV9zZXJ2aWNlKCk7XG4gICAgaW5pdF9ldmVudF9zZXJ2aWNlKCk7XG4gICAgaW5pdF90aWxlc19zZXJ2aWNlKCk7XG4gICAgaW5pdF93aWRnZXRfc2VydmljZSgpO1xuICAgIGluaXRfdGlsZV9ldmVudCgpO1xuICAgIGluaXRfd2lkZ2V0X2V2ZW50KCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvU2RrU3dpcGVyLnRzXG52YXIgaW5pdF9TZGtTd2lwZXIgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL1Nka1N3aXBlci50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2luZGV4LnRzXG52YXIgaW5pdF90eXBlczIgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF93aWRnZXRzKCk7XG4gICAgaW5pdF90eXBlcygpO1xuICAgIGluaXRfY29tcG9uZW50czIoKTtcbiAgICBpbml0X2NvcmUoKTtcbiAgICBpbml0X3NlcnZpY2VzKCk7XG4gICAgaW5pdF9TZGtTd2lwZXIoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy93aWRnZXQtbG9hZGVyLnRzXG5mdW5jdGlvbiBsb2FkTWFzb25yeUNhbGxiYWNrcyhzZXR0aW5ncykge1xuICBzZXR0aW5ncy5jYWxsYmFja3Mub25UaWxlc1VwZGF0ZWQucHVzaCgoKSA9PiB7XG4gICAgcmVuZGVyTWFzb25yeUxheW91dCgpO1xuICB9KTtcbiAgc2V0dGluZ3MuY2FsbGJhY2tzLm9uVGlsZUJnSW1nUmVuZGVyQ29tcGxldGUucHVzaCgoKSA9PiB7XG4gICAgaGFuZGxlQWxsVGlsZUltYWdlUmVuZGVyZWQoKTtcbiAgICBzZXRUaW1lb3V0KGhhbmRsZUFsbFRpbGVJbWFnZVJlbmRlcmVkLCAxZTMpO1xuICB9KTtcbiAgc2V0dGluZ3MuY2FsbGJhY2tzLm9uVGlsZUJnSW1hZ2VFcnJvci5wdXNoKChldmVudDIpID0+IHtcbiAgICBjb25zdCBjdXN0b21FdmVudCA9IGV2ZW50MjtcbiAgICBjb25zdCB0aWxlV2l0aEVycm9yID0gY3VzdG9tRXZlbnQuZGV0YWlsLmRhdGEudGFyZ2V0O1xuICAgIGhhbmRsZVRpbGVJbWFnZUVycm9yKHRpbGVXaXRoRXJyb3IpO1xuICB9KTtcbiAgY29uc3QgZ3JpZCA9IHNkay5xdWVyeVNlbGVjdG9yKFwiLmdyaWRcIik7XG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICByZW5kZXJNYXNvbnJ5TGF5b3V0KGZhbHNlLCB0cnVlKTtcbiAgfSk7XG4gIG9ic2VydmVyLm9ic2VydmUoZ3JpZCk7XG4gIHJldHVybiBzZXR0aW5ncztcbn1cbmZ1bmN0aW9uIG1lcmdlU2V0dGluZ3NXaXRoRGVmYXVsdHMoc2V0dGluZ3MpIHtcbiAgcmV0dXJuIHtcbiAgICBmZWF0dXJlczoge1xuICAgICAgc2hvd1RpdGxlOiB0cnVlLFxuICAgICAgcHJlbG9hZEltYWdlczogdHJ1ZSxcbiAgICAgIGRpc2FibGVXaWRnZXRJZk5vdEVuYWJsZWQ6IHRydWUsXG4gICAgICBhZGROZXdUaWxlc0F1dG9tYXRpY2FsbHk6IHRydWUsXG4gICAgICBoYW5kbGVMb2FkTW9yZTogdHJ1ZSxcbiAgICAgIGxpbWl0VGlsZXNQZXJQYWdlOiB0cnVlLFxuICAgICAgaGlkZUJyb2tlbkltYWdlczogdHJ1ZSxcbiAgICAgIGxvYWRFeHBhbmRlZFRpbGVTbGlkZXI6IHRydWUsXG4gICAgICBsb2FkVGlsZUNvbnRlbnQ6IHRydWUsXG4gICAgICBsb2FkVGltZXBocmFzZTogdHJ1ZSxcbiAgICAgIGV4cGFuZGVkVGlsZVNldHRpbmdzOiB7XG4gICAgICAgIHVzZURlZmF1bHRFeHBhbmRlZFRpbGVTdHlsZXM6IHRydWUsXG4gICAgICAgIHVzZURlZmF1bHRQcm9kdWN0U3R5bGVzOiB0cnVlLFxuICAgICAgICB1c2VEZWZhdWx0QWRkVG9DYXJ0U3R5bGVzOiB0cnVlLFxuICAgICAgICB1c2VEZWZhdWx0RXhwYW5kZWRUaWxlVGVtcGxhdGVzOiB0cnVlLFxuICAgICAgICB1c2VEZWZhdWx0U3dpcGVyU3R5bGVzOiB0cnVlLFxuICAgICAgICBkZWZhdWx0Rm9udDogc2V0dGluZ3M/LmZvbnQgPz8gXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyOndnaHRANDAwOzUwMDs3MDAmZGlzcGxheT1zd2FwXCJcbiAgICAgIH0sXG4gICAgICAuLi5zZXR0aW5ncz8uZmVhdHVyZXNcbiAgICB9LFxuICAgIGNhbGxiYWNrczoge1xuICAgICAgLi4uY2FsbGJhY2tEZWZhdWx0cyxcbiAgICAgIC4uLnNldHRpbmdzPy5jYWxsYmFja3NcbiAgICB9LFxuICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgIHN3aXBlcjogZmFsc2UsXG4gICAgICBtYXNvbnJ5OiBmYWxzZSxcbiAgICAgIC4uLnNldHRpbmdzPy5leHRlbnNpb25zXG4gICAgfSxcbiAgICB0ZW1wbGF0ZXM6IHNldHRpbmdzPy50ZW1wbGF0ZXMgPz8ge31cbiAgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGxvYWRGZWF0dXJlcyhzZXR0aW5ncykge1xuICBjb25zdCB7XG4gICAgc2hvd1RpdGxlLFxuICAgIHByZWxvYWRJbWFnZXMsXG4gICAgZGlzYWJsZVdpZGdldElmTm90RW5hYmxlZCxcbiAgICBhZGROZXdUaWxlc0F1dG9tYXRpY2FsbHksXG4gICAgaGFuZGxlTG9hZE1vcmUsXG4gICAgbGltaXRUaWxlc1BlclBhZ2UsXG4gICAgaGlkZUJyb2tlbkltYWdlcyxcbiAgICBsb2FkVGlsZUNvbnRlbnQsXG4gICAgbG9hZFRpbWVwaHJhc2VcbiAgfSA9IHNldHRpbmdzLmZlYXR1cmVzO1xuICBzZGsudGlsZXMucHJlbG9hZEltYWdlcyA9IHByZWxvYWRJbWFnZXM7XG4gIHNkay50aWxlcy5oaWRlQnJva2VuVGlsZXMgPSBoaWRlQnJva2VuSW1hZ2VzO1xuICBpZiAobG9hZFRpbGVDb250ZW50KSB7XG4gICAgc2RrLmFkZExvYWRlZENvbXBvbmVudHMoW1widGlsZS1jb250ZW50XCIsIFwidGltZXBocmFzZVwiLCBcInRhZ3NcIiwgXCJzaGFyZS1tZW51XCJdKTtcbiAgfSBlbHNlIGlmIChsb2FkVGltZXBocmFzZSkge1xuICAgIHNkay5hZGRMb2FkZWRDb21wb25lbnRzKFtcInRpbWVwaHJhc2VcIl0pO1xuICB9XG4gIGlmIChkaXNhYmxlV2lkZ2V0SWZOb3RFbmFibGVkKSB7XG4gICAgbG9hZFdpZGdldElzRW5hYmxlZCgpO1xuICB9XG4gIGlmIChzaG93VGl0bGUpIHtcbiAgICBsb2FkVGl0bGUoKTtcbiAgfVxuICBsb2FkRXhwYW5kZWRUaWxlRmVhdHVyZSgpO1xuICBpZiAoYWRkTmV3VGlsZXNBdXRvbWF0aWNhbGx5KSB7XG4gICAgYWRkQXV0b0FkZFRpbGVGZWF0dXJlKCk7XG4gIH1cbiAgaWYgKGhhbmRsZUxvYWRNb3JlKSB7XG4gICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiAoaW5pdF9sb2FkX21vcmUoKSwgbG9hZF9tb3JlX2V4cG9ydHMpKTtcbiAgICBhZGRMb2FkTW9yZUJ1dHRvbkZlYXR1cmUoKTtcbiAgfVxuICBpZiAobGltaXRUaWxlc1BlclBhZ2UpIHtcbiAgICBhZGRUaWxlc1BlclBhZ2VGZWF0dXJlKCk7XG4gIH1cbiAgcmV0dXJuIHNldHRpbmdzO1xufVxuZnVuY3Rpb24gbG9hZEV4dGVuc2lvbnMoc2V0dGluZ3MpIHtcbiAgY29uc3QgeyBleHRlbnNpb25zIH0gPSBzZXR0aW5ncztcbiAgaWYgKGV4dGVuc2lvbnM/Lm1hc29ucnkpIHtcbiAgICBzZXR0aW5ncyA9IGxvYWRNYXNvbnJ5Q2FsbGJhY2tzKHNldHRpbmdzKTtcbiAgICByZW5kZXJNYXNvbnJ5TGF5b3V0KCk7XG4gIH1cbiAgcmV0dXJuIHNldHRpbmdzO1xufVxuZnVuY3Rpb24gaW5pdGlhbGlzZUZlYXR1cmVzKHNldHRpbmdzKSB7XG4gIGlmIChPYmplY3Qua2V5cyhzZXR0aW5ncy5mZWF0dXJlcyA/PyB7fSkubGVuZ3RoID09PSAwKSB7XG4gICAgc2V0dGluZ3MuZmVhdHVyZXMgPSB7XG4gICAgICBzaG93VGl0bGU6IHRydWUsXG4gICAgICBwcmVsb2FkSW1hZ2VzOiB0cnVlLFxuICAgICAgZGlzYWJsZVdpZGdldElmTm90RW5hYmxlZDogdHJ1ZSxcbiAgICAgIGFkZE5ld1RpbGVzQXV0b21hdGljYWxseTogdHJ1ZSxcbiAgICAgIGhhbmRsZUxvYWRNb3JlOiB0cnVlLFxuICAgICAgbGltaXRUaWxlc1BlclBhZ2U6IHRydWVcbiAgICB9O1xuICB9XG4gIHJldHVybiBzZXR0aW5ncztcbn1cbmZ1bmN0aW9uIGxvYWRUZW1wbGF0ZXMoc2V0dGluZ3MpIHtcbiAgY29uc3QgeyBleHBhbmRlZFRpbGVTZXR0aW5ncyB9ID0gc2V0dGluZ3MuZmVhdHVyZXM7XG4gIGNvbnN0IHtcbiAgICB1c2VEZWZhdWx0RXhwYW5kZWRUaWxlU3R5bGVzLFxuICAgIHVzZURlZmF1bHRQcm9kdWN0U3R5bGVzLFxuICAgIHVzZURlZmF1bHRBZGRUb0NhcnRTdHlsZXMsXG4gICAgdXNlRGVmYXVsdEV4cGFuZGVkVGlsZVRlbXBsYXRlcyxcbiAgICBkZWZhdWx0Rm9udCxcbiAgICB1c2VEZWZhdWx0U3dpcGVyU3R5bGVzXG4gIH0gPSBleHBhbmRlZFRpbGVTZXR0aW5ncztcbiAgaWYgKHNldHRpbmdzLmZlYXR1cmVzLmxvYWRFeHBhbmRlZFRpbGVTbGlkZXIpIHtcbiAgICBsb2FkRXhwYW5kZWRUaWxlVGVtcGxhdGVzKHtcbiAgICAgIHVzZURlZmF1bHRFeHBhbmRlZFRpbGVTdHlsZXMsXG4gICAgICB1c2VEZWZhdWx0UHJvZHVjdFN0eWxlcyxcbiAgICAgIHVzZURlZmF1bHRBZGRUb0NhcnRTdHlsZXMsXG4gICAgICB1c2VEZWZhdWx0RXhwYW5kZWRUaWxlVGVtcGxhdGVzLFxuICAgICAgZGVmYXVsdEZvbnQsXG4gICAgICB1c2VEZWZhdWx0U3dpcGVyU3R5bGVzXG4gICAgfSk7XG4gIH1cbiAgaWYgKHNldHRpbmdzLnRlbXBsYXRlcyAmJiBPYmplY3Qua2V5cyhzZXR0aW5ncy50ZW1wbGF0ZXMpLmxlbmd0aCkge1xuICAgIE9iamVjdC5lbnRyaWVzKHNldHRpbmdzLnRlbXBsYXRlcykuZm9yRWFjaCgoW2tleSwgY3VzdG9tVGVtcGxhdGVdKSA9PiB7XG4gICAgICBpZiAoIWN1c3RvbVRlbXBsYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgdGVtcGxhdGUgfSA9IGN1c3RvbVRlbXBsYXRlO1xuICAgICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICAgIHNkay5hZGRUZW1wbGF0ZVRvQ29tcG9uZW50KHRlbXBsYXRlLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5mdW5jdGlvbiBsb2FkV2lkZ2V0KHNldHRpbmdzKSB7XG4gIGNvbnN0IHNldHRpbmdzV2l0aERlZmF1bHRzID0gbWVyZ2VTZXR0aW5nc1dpdGhEZWZhdWx0cyhzZXR0aW5ncyk7XG4gIGFkZENTU1ZhcmlhYmxlc1RvUGxhY2VtZW50KGdldENTU1ZhcmlhYmxlcyhzZXR0aW5ncz8uZmVhdHVyZXMpKTtcbiAgbG9hZFRlbXBsYXRlcyhzZXR0aW5nc1dpdGhEZWZhdWx0cyk7XG4gIGxvYWRGZWF0dXJlcyhzZXR0aW5nc1dpdGhEZWZhdWx0cyk7XG4gIGxvYWRFeHRlbnNpb25zKHNldHRpbmdzV2l0aERlZmF1bHRzKTtcbiAgbG9hZExpc3RlbmVycyhzZXR0aW5nc1dpdGhEZWZhdWx0cyk7XG59XG52YXIgaW5pdF93aWRnZXRfbG9hZGVyID0gX19lc20oe1xuICBcInNyYy93aWRnZXQtbG9hZGVyLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9saWJzKCk7XG4gICAgaW5pdF9jc3NfdmFyaWFibGVzKCk7XG4gICAgaW5pdF9tYXNvbnJ5X2V4dGVuc2lvbigpO1xuICAgIGluaXRfZXhwYW5kZWRfdGlsZV9zd2lwZXIoKTtcbiAgICBpbml0X2V2ZW50cygpO1xuICB9XG59KTtcblxuLy8gc3JjL2luZGV4LnRzXG52YXIgaW5pdF9zcmMgPSBfX2VzbSh7XG4gIFwic3JjL2luZGV4LnRzXCIoKSB7XG4gICAgaW5pdF9ob29rcygpO1xuICAgIGluaXRfdHlwZXMyKCk7XG4gICAgaW5pdF9ldmVudHMoKTtcbiAgICBpbml0X2xpYnMoKTtcbiAgICBpbml0X3dpZGdldF9sb2FkZXIoKTtcbiAgfVxufSk7XG5pbml0X3NyYygpO1xuZXhwb3J0IHtcbiAgQkVGT1JFX0VYUEFOREVEX1RJTEVfQ0xPU0UsXG4gIEJFRk9SRV9FWFBBTkRFRF9USUxFX0lNQUdFX1JFU0laRSxcbiAgQkVGT1JFX0VYUEFOREVEX1RJTEVfT1BFTixcbiAgQ1JPU1NfU0VMTEVSU19MT0FERUQsXG4gIERJU0xJS0VfQ0xJQ0ssXG4gIEVNQUlMX1RJTEVfQ0xJQ0ssXG4gIEVNQUlMX1RJTEVfTE9BRCxcbiAgRVZFTlRfQUREX1RPX0NBUlRfRkFJTEVELFxuICBFVkVOVF9ESVNMSUtFLFxuICBFVkVOVF9HTE9CQUxTX0xPQURFRCxcbiAgRVZFTlRfSE9WRVIsXG4gIEVWRU5UX0hUTUxfUkVOREVSRUQsXG4gIEVWRU5UX0lNUFJFU1NJT04sXG4gIEVWRU5UX0pTX1JFTkRFUkVELFxuICBFVkVOVF9MSUtFLFxuICBFVkVOVF9MT0FELFxuICBFVkVOVF9MT0FEX01PUkUsXG4gIEVWRU5UX1BST0RVQ1RTX1VQREFURUQsXG4gIEVWRU5UX1BST0RVQ1RfQ0xJQ0ssXG4gIEVWRU5UX1BST0RVQ1RfUEFHRV9MT0FERUQsXG4gIEVWRU5UX1BST0RVQ1RfUElOQ0xJQ0ssXG4gIEVWRU5UX1BST0RVQ1RfVVNFUl9DTElDSyxcbiAgRVZFTlRfU0hBUkVfQ0xJQ0ssXG4gIEVWRU5UX1NIQVJFX01FTlVfQ0xPU0VELFxuICBFVkVOVF9TSEFSRV9NRU5VX09QRU5FRCxcbiAgRVZFTlRfU0hPUFNQT1RfRkxZT1VULFxuICBFVkVOVF9USUxFU19VUERBVEVELFxuICBFVkVOVF9USUxFX0JHX0lNR19FUlJPUixcbiAgRVZFTlRfVElMRV9CR19JTUdfUkVOREVSX0NPTVBMRVRFLFxuICBFVkVOVF9USUxFX0RBVEFfU0VULFxuICBFVkVOVF9USUxFX0VYUEFORCxcbiAgRVZFTlRfVElMRV9FWFBBTkRfQ1JPU1NfU0VMTEVSU19SRU5ERVJFRCxcbiAgRVZFTlRfVElMRV9FWFBBTkRfUFJPRF9SRUNTX1JFTkRFUkVELFxuICBFVkVOVF9USUxFX0VYUEFORF9SRU5ERVJFRCxcbiAgRVZFTlRfVElMRV9NRVRBREFUQV9MT0FERUQsXG4gIEVYUEFOREVEX1RJTEVfQ0xPU0UsXG4gIEVYUEFOREVEX1RJTEVfSU1BR0VfTE9BRCxcbiAgRVhQQU5ERURfVElMRV9JTUFHRV9SRVNJWkUsXG4gIEVYUEFOREVEX1RJTEVfT1BFTixcbiAgTElLRV9DTElDSyxcbiAgUFJPRFVDVF9BQ1RJT05fQ0xJQ0ssXG4gIFNIT1BTUE9UX0FDVElPTl9DTElDSyxcbiAgU0hPUFNQT1RfRkxZT1VUX0VYUEFORCxcbiAgU0hPUFNQT1RfT1BFTixcbiAgU0hPUFNQT1RfVE9HR0xFLFxuICBVU0VSX0NMSUNLLFxuICBXSURHRVRfSU5JVF9DT01QTEVURSxcbiAgYWRkQXV0b0FkZFRpbGVGZWF0dXJlLFxuICBhZGRDU1NWYXJpYWJsZXNUb1BsYWNlbWVudCxcbiAgYWRkTG9hZE1vcmVCdXR0b25GZWF0dXJlLFxuICBhZGRUaWxlc1BlclBhZ2VGZWF0dXJlLFxuICBhbGxFdmVudHMsXG4gIGFycm93Q2xpY2tMaXN0ZW5lcixcbiAgYXR0YWNoTG9hZE1vcmVCdXR0b25MaXN0ZW5lcixcbiAgY2FsbGJhY2tEZWZhdWx0cyxcbiAgY3JlYXRlRWxlbWVudCxcbiAgY3JlYXRlRnJhZ21lbnQsXG4gIGRlc3Ryb3lTd2lwZXIsXG4gIGRpc2FibGVMb2FkTW9yZUJ1dHRvbklmRXhpc3RzLFxuICBkaXNhYmxlTG9hZE1vcmVMb2FkZXJJZkV4aXN0cyxcbiAgZGlzYWJsZVN3aXBlcixcbiAgZW5hYmxlU3dpcGVyLFxuICBlbmFibGVUaWxlSW1hZ2VzLFxuICBnZXRBY3RpdmVTbGlkZSxcbiAgZ2V0QWN0aXZlU2xpZGVFbGVtZW50LFxuICBnZXRDbGlja2VkSW5kZXgsXG4gIGdldEluc3RhbmNlLFxuICBnZXROZXh0TmF2aWdhdGVkVGlsZSxcbiAgZ2V0TmV4dFRpbGUsXG4gIGdldFByZXZpb3VzVGlsZSxcbiAgZ2V0U3dpcGVySW5kZXhmb3JUaWxlLFxuICBnZXRUaWxlU2l6ZSxcbiAgZ2V0VGlsZVNpemVCeVdpZGdldCxcbiAgZ2V0VGltZXBocmFzZSxcbiAgaGFuZGxlQWxsVGlsZUltYWdlUmVuZGVyZWQsXG4gIGhhbmRsZVRpbGVDbGljayxcbiAgaGFuZGxlVGlsZUltYWdlRXJyb3IsXG4gIGhhbmRsZVRpbGVJbWFnZVJlbmRlcmVkLFxuICBoYXNNaW5pbXVtVGlsZXNSZXF1aXJlZCxcbiAgaGlkZUFsbFRpbGVzQWZ0ZXJOVGlsZXMsXG4gIGluaXRpYWxpc2VGZWF0dXJlcyxcbiAgaW5pdGlhbGl6ZVN3aXBlcixcbiAgaXNFbmFibGVkLFxuICBpc1N3aXBlckxvYWRpbmcsXG4gIGxvYWRBbGxVbmxvYWRlZFRpbGVzLFxuICBsb2FkRXhwYW5kU2V0dGluZ0NvbXBvbmVudHMsXG4gIGxvYWRFeHBhbmRlZFRpbGVGZWF0dXJlLFxuICBsb2FkRXhwYW5kZWRUaWxlVGVtcGxhdGVzLFxuICBsb2FkTGlzdGVuZXJzLFxuICBsb2FkU3dpcGVyU3R5bGVzLFxuICBsb2FkVGVtcGxhdGVzLFxuICBsb2FkVGl0bGUsXG4gIGxvYWRXaWRnZXQsXG4gIGxvYWRXaWRnZXRJc0VuYWJsZWQsXG4gIHJlZnJlc2hTd2lwZXIsXG4gIHJlZ2lzdGVyQ3Jvc3NTZWxsZXJzTG9hZExpc3RlbmVyLFxuICByZWdpc3RlckRlZmF1bHRDbGlja0V2ZW50cyxcbiAgcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcixcbiAgcmVnaXN0ZXJTaGFyZU1lbnVDbG9zZWRMaXN0ZW5lcixcbiAgcmVnaXN0ZXJTaGFyZU1lbnVPcGVuZWRMaXN0ZW5lcixcbiAgcmVnaXN0ZXJUaWxlRXhwYW5kTGlzdGVuZXIsXG4gIHJlbmRlck1hc29ucnlMYXlvdXQsXG4gIHNldFN3aXBlckxvYWRpbmdTdGF0dXMsXG4gIHRyaW1IYXNoVmFsdWVzRnJvbU9iamVjdCxcbiAgdXBkYXRlU3dpcGVySW5zdGFuY2UsXG4gIHVzZUluZmluaXRlU2Nyb2xsZXJfZGVmYXVsdCBhcyB1c2VJbmZpbml0ZVNjcm9sbGVyLFxuICB3YWl0Rm9yRWxlbWVudCxcbiAgd2FpdEZvckVsZW1lbnRzLFxuICB3YWl0Rm9yRWxtXG59O1xuIiwgImltcG9ydCB7IElTZGsgfSBmcm9tIFwiQHN0YWNrbGEvd2lkZ2V0LXV0aWxzXCJcblxuZGVjbGFyZSBjb25zdCBzZGs6IElTZGtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRXYXRlcmZhbGxMYXlvdXQocmVzZXQgPSBmYWxzZSkge1xuICBjb25zdCBhbGxUaWxlcyA9IEFycmF5LmZyb20oc2RrLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLmdyaWQtaXRlbVwiKSA/PyBbXSlcbiAgY29uc3QgdWdjVGlsZXMgPSByZXNldCA/IGFsbFRpbGVzIDogYWxsVGlsZXMuZmlsdGVyKHRpbGUgPT4gdGlsZS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHQtc2V0XCIpICE9PSBcInRydWVcIilcbiAgY29uc3QgeyBpbmxpbmVfdGlsZV9zaXplIH0gPSBzZGsuZ2V0U3R5bGVDb25maWcoKVxuXG4gIGlmICghdWdjVGlsZXMgfHwgdWdjVGlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCByb3dIZWlnaHQgPSAxMFxuICBjb25zdCB7IG1hcmdpbiB9ID0gc2RrLmdldFN0eWxlQ29uZmlnKClcbiAgY29uc3QgZ2FwID0gcGFyc2VJbnQobWFyZ2luKVxuXG4gIHVnY1RpbGVzLmZvckVhY2goKHRpbGU6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgY29uc3QgaGFzVXNlckhhbmRsZSA9IHRpbGUucXVlcnlTZWxlY3RvcihcIi51c2VyLWhhbmRsZVwiKSAhPT0gbnVsbFxuICAgIGNvbnN0IGhhc1RpbWVQaHJhc2UgPSB0aWxlLnF1ZXJ5U2VsZWN0b3IoXCIudGlsZS10aW1lcGhyYXNlXCIpICE9PSBudWxsXG4gICAgY29uc3QgYm90dG9tQ29udGFpbmVyID0gdGlsZS5xdWVyeVNlbGVjdG9yKFwiLnRpbGUtYm90dG9tLWNvbnRhaW5lclwiKSBhcyBIVE1MRWxlbWVudFxuICAgIGNvbnN0IGNhcHRpb24gPSB0aWxlLnF1ZXJ5U2VsZWN0b3IoXCIuY2FwdGlvblwiKVxuICAgIGNvbnN0IGljb25zID0gdGlsZS5xdWVyeVNlbGVjdG9yQWxsKFwiLmljb24tc2hhcmUsIC5uZXR3b3JrLWljb24sIC5jb250ZW50LWljb24sIC5pY29uLXByb2R1Y3RzXCIpXG5cbiAgICBpZiAoaW5saW5lX3RpbGVfc2l6ZSA9PT0gXCJzbWFsbFwiKSB7XG4gICAgICBib3R0b21Db250YWluZXIuY2xhc3NMaXN0LmFkZChcInNtYWxsXCIpXG4gICAgfVxuXG4gICAgaWNvbnMuZm9yRWFjaChpY29uID0+IGljb24uY2xhc3NMaXN0LmFkZChgJHtpbmxpbmVfdGlsZV9zaXplfWApKVxuXG4gICAgaWYgKGNhcHRpb24pIHtcbiAgICAgIGlmIChoYXNVc2VySGFuZGxlIHx8IGhhc1RpbWVQaHJhc2UpIHtcbiAgICAgICAgY2FwdGlvbi5jbGFzc0xpc3QuYWRkKFwibGluZXMtNFwiKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FwdGlvbi5jbGFzc0xpc3QuYWRkKFwibGluZXMtNVwiKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHRpbGVUb3AgPSB0aWxlLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLnRpbGUtdG9wXCIpXG4gICAgY29uc3QgdGlsZUJvdHRvbSA9IHRpbGUucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCIudGlsZS1ib3R0b21cIilcblxuICAgIGlmICh0aWxlVG9wICYmIHRpbGVCb3R0b20pIHtcbiAgICAgIGNvbnN0IGltYWdlRWxlbWVudCA9IHRpbGVUb3AucXVlcnlTZWxlY3RvcjxIVE1MSW1hZ2VFbGVtZW50PihcImltZ1wiKVxuXG4gICAgICBjb25zdCBjYWxjdWxhdGVIZWlnaHQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvcEhlaWdodCA9IHRpbGVUb3Auc2Nyb2xsSGVpZ2h0XG4gICAgICAgIGNvbnN0IGJvdHRvbUhlaWdodCA9IHRpbGVCb3R0b20uc2Nyb2xsSGVpZ2h0XG4gICAgICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gdG9wSGVpZ2h0ICsgYm90dG9tSGVpZ2h0XG5cbiAgICAgICAgY29uc3Qgcm93U3BhbiA9IE1hdGguY2VpbCh0b3RhbEhlaWdodCAvIChyb3dIZWlnaHQgKyBnYXApKVxuICAgICAgICB0aWxlLnN0eWxlLmdyaWRSb3dFbmQgPSBgc3BhbiAke3Jvd1NwYW59YFxuICAgICAgfVxuXG4gICAgICBpZiAoaW1hZ2VFbGVtZW50ICYmICFpbWFnZUVsZW1lbnQuY29tcGxldGUpIHtcbiAgICAgICAgaW1hZ2VFbGVtZW50Lm9ubG9hZCA9IGNhbGN1bGF0ZUhlaWdodFxuICAgICAgICBpbWFnZUVsZW1lbnQub25lcnJvciA9ICgpID0+IGltYWdlRWxlbWVudC5wYXJlbnRFbGVtZW50Py5yZW1vdmUoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsY3VsYXRlSGVpZ2h0KClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG4iLCAiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgY3JlYXRlRnJhZ21lbnQsIFNkaywgVGFnRXh0ZW5kZWQsIElQcm9kdWN0c0NvbXBvbmVudCB9IGZyb20gXCJAc3RhY2tsYS93aWRnZXQtdXRpbHNcIlxuXG5leHBvcnQgZnVuY3Rpb24gUHJvZHVjdEhlYWRlcih7IHByb2R1Y3QgfTogeyBwcm9kdWN0OiBUYWdFeHRlbmRlZCB9KSB7XG4gIGlmICghcHJvZHVjdCkgcmV0dXJuIDw+PC8+XG5cbiAgY29uc3QgeyBpZCwgdGFnLCBjdXN0b21fdXJsLCB0YXJnZXQsIHByaWNlLCBjdXJyZW5jeSB9ID0gcHJvZHVjdFxuXG4gIGNvbnN0IHRpdGxlQ29udGVudCA9IHRhZyAmJiAoXG4gICAgPGEgaHJlZj17Y3VzdG9tX3VybH0gdGFyZ2V0PXt0YXJnZXR9IGNsYXNzPVwic3RhY2tsYXBvcHVwLXByb2R1Y3RzLWl0ZW0tdGl0bGVcIj5cbiAgICAgIHt0YWd9XG4gICAgPC9hPlxuICApXG5cbiAgY29uc3QgcHJpY2VDb250ZW50ID0gcHJpY2UgJiYgKFxuICAgIDxkaXYgY2xhc3M9XCJzdGFja2xhcG9wdXAtcHJvZHVjdHMtaXRlbS1wcmljZVwiPlxuICAgICAge2N1cnJlbmN5ID09PSBcIkVVUlwiID8gYCR7cHJpY2V9IEVVUmAgOiBgJHtjdXJyZW5jeSA/PyBcIlwifSR7cHJpY2V9YH1cbiAgICA8L2Rpdj5cbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzcz1cInN0YWNrbGFwb3B1cC1wcm9kdWN0cy1oZWFkZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzdGFja2xhcG9wdXAtcHJvZHVjdHMtaXRlbS1oZWFkZXIgc3RhY2tsYXBvcHVwLXByb2R1Y3RzLWl0ZW0tYWN0aXZlXCIgZGF0YS10YWctaWQ9e2lkfT5cbiAgICAgICAge3RpdGxlQ29udGVudH1cbiAgICAgICAge3ByaWNlQ29udGVudH1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQcm9kdWN0Q1RBKHsgc2RrLCBwcm9kdWN0IH06IHsgc2RrOiBTZGs7IHByb2R1Y3Q6IFRhZ0V4dGVuZGVkIH0pIHtcbiAgY29uc3QgeyBjdXN0b21fdXJsLCB0YXJnZXQsIGF2YWlsYWJpbGl0eSwgY3RhX3RleHQgPSBcIkJ1eSBOb3dcIiwgY3VycmVuY3ksIGlkIH0gPSBwcm9kdWN0XG4gIGNvbnN0IGFkZFRvQ2FydCA9IHNkay5nZXRMb2FkZWRDb21wb25lbnRzKCkuaW5jbHVkZXMoXCJhZGQtdG8tY2FydFwiKVxuICBjb25zdCBwYXJlbnROb2RlSWQgPSBzZGsuZ2V0Tm9kZUlkKClcbiAgaWYgKGFkZFRvQ2FydCkge1xuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9e2N1c3RvbV91cmx9XG4gICAgICAgICAgdGFyZ2V0PXt0YXJnZXR9XG4gICAgICAgICAgY2xhc3M9XCJzdGFja2xhcG9wdXAtcHJvZHVjdHMtaXRlbS1idXR0b24td3JhcFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGRpc3BsYXk6IFwibm9uZVwiXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgc3RhY2tsYXBvcHVwLXByb2R1Y3RzLWl0ZW0tYnV0dG9uJHthdmFpbGFiaWxpdHkgPyBcIlwiIDogXCIgZGlzYWJsZWRcIn1gfT57Y3RhX3RleHR9PC9zcGFuPlxuICAgICAgICA8L2E+XG4gICAgICAgIDxhZGQtdG8tY2FydFxuICAgICAgICAgIHByb2R1Y3RJZD17aWR9XG4gICAgICAgICAgaWQ9e2BzdGFja2xhcG9wdXAtYWRkLXRvLWNhcnQtJHtpZH1gfVxuICAgICAgICAgIHVybD17Y3VzdG9tX3VybH1cbiAgICAgICAgICB0YXJnZXQ9e3RhcmdldH1cbiAgICAgICAgICBhdmFpbGFiaWxpdHk9e2F2YWlsYWJpbGl0eX1cbiAgICAgICAgICBjdGE9e2N0YV90ZXh0fVxuICAgICAgICAgIGN1cnJlbmN5PXtjdXJyZW5jeX1cbiAgICAgICAgICBwYXJlbnQ9e3BhcmVudE5vZGVJZH0+PC9hZGQtdG8tY2FydD5cbiAgICAgIDwvPlxuICAgIClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGEgaHJlZj17Y3VzdG9tX3VybH0gdGFyZ2V0PXt0YXJnZXR9IGNsYXNzPVwic3RhY2tsYXBvcHVwLXByb2R1Y3RzLWl0ZW0tYnV0dG9uLXdyYXBcIj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHN0YWNrbGFwb3B1cC1wcm9kdWN0cy1pdGVtLWJ1dHRvbiR7YXZhaWxhYmlsaXR5ID8gXCJcIiA6IFwiIGRpc2FibGVkXCJ9YH0+e2N0YV90ZXh0fTwvc3Bhbj5cbiAgICA8L2E+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFByb2R1Y3REZXRhaWxzKHsgc2RrLCBwcm9kdWN0IH06IHsgc2RrOiBTZGs7IHByb2R1Y3Q6IFRhZ0V4dGVuZGVkIH0pIHtcbiAgY29uc3Qgc2VsZWN0ZWRQcm9kdWN0SWQgPSBzZGsudGlsZXMuZ2V0U2VsZWN0ZWRQcm9kdWN0KCkgPyBzZGsudGlsZXMuZ2V0U2VsZWN0ZWRQcm9kdWN0KCkuaWQgOiBudWxsXG4gIGNvbnN0IHsgY3VzdG9tX3VybCwgZGVzY3JpcHRpb24gPSBcIkJ1eSBOb3dcIiwgaWQgfSA9IHByb2R1Y3RcblxuICBjb25zdCBkZXNjcmlwdGlvbkNvbnRlbnQgPSBkZXNjcmlwdGlvbiA/IDxwIGNsYXNzPVwic3RhY2tsYXBvcHVwLXByb2R1Y3RzLWl0ZW0tZGVzY3JpcHRpb25cIj57ZGVzY3JpcHRpb259PC9wPiA6IDw+PC8+XG5cbiAgY29uc3QgaXRlbUFjdGl2ZSA9IGlkID09IHNlbGVjdGVkUHJvZHVjdElkID8gXCJzdGFja2xhcG9wdXAtcHJvZHVjdHMtaXRlbS1hY3RpdmVcIiA6IFwiXCJcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgc3RhY2tsYXBvcHVwLXByb2R1Y3RzLWl0ZW0tY29udGVudCAke2l0ZW1BY3RpdmV9YH0gZGF0YS10YWctaWQ9e2lkfSBkYXRhLWN1c3RvbS11cmw9e2N1c3RvbV91cmx9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGFja2xhcG9wdXAtcHJvZHVjdHMtaXRlbS1kZXNjcmlwdGlvbi13cmFwcGVyXCI+e2Rlc2NyaXB0aW9uQ29udGVudH08L2Rpdj5cbiAgICAgIDxQcm9kdWN0Q1RBIHNkaz17c2RrfSBwcm9kdWN0PXtwcm9kdWN0fT48L1Byb2R1Y3RDVEE+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFByb2R1Y3RXcmFwcGVyKHtcbiAgcHJvZHVjdHMsXG4gIHNlbGVjdGVkUHJvZHVjdElkXG59OiB7XG4gIHByb2R1Y3RzOiBUYWdFeHRlbmRlZFtdXG4gIHNlbGVjdGVkUHJvZHVjdElkOiBzdHJpbmdcbn0pIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3Byb2R1Y3RzLm1hcCgoeyBpZCwgaW1hZ2Vfc21hbGxfdXJsLCBpc19jcm9zc19zZWxsZXIgfSkgPT4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN3aXBlci1zbGlkZSBzdGFja2xhcG9wdXAtcHJvZHVjdC13cmFwcGVyXCI+XG4gICAgICAgICAge2lzX2Nyb3NzX3NlbGxlciAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YWNrbGFwb3B1cC1wcm9kdWN0cy1pdGVtLWltYWdlLXJlY29tbWVuZGF0aW9uLWxhYmVsXCI+XG4gICAgICAgICAgICAgIDxwPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1saWtlXCI+PC9zcGFuPiBncmVhdCB3aXRoXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgc3RhY2tsYXBvcHVwLXByb2R1Y3RzLWl0ZW0gJHtpc19jcm9zc19zZWxsZXIgPyBcImNyb3NzLXNlbGxlclwiIDogXCJcIn0gJHtpZCA9PSBzZWxlY3RlZFByb2R1Y3RJZCA/IFwic3RhY2tsYXBvcHVwLXByb2R1Y3RzLWl0ZW0tYWN0aXZlXCIgOiBcIlwifWB9XG4gICAgICAgICAgICBkYXRhLXRhZy1pZD17aWR9PlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBsb2FkaW5nPVwibGF6eVwiXG4gICAgICAgICAgICAgIGNsYXNzPVwic3RhY2tsYXBvcHVwLXByb2R1Y3RzLWl0ZW0taW1hZ2VcIlxuICAgICAgICAgICAgICBzcmM9e2ltYWdlX3NtYWxsX3VybH1cbiAgICAgICAgICAgICAgb25lcnJvcj1cInRoaXMuc3JjPSdodHRwczovL3BsYWNlaG9sZC5jby8xNjB4MjAwJ1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkpfVxuICAgIDwvPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQcm9kdWN0SW1hZ2VzKHtcbiAgcHJvZHVjdHMsXG4gIHNlbGVjdGVkUHJvZHVjdFxufToge1xuICBwcm9kdWN0czogVGFnRXh0ZW5kZWRbXVxuICBzZWxlY3RlZFByb2R1Y3Q6IFRhZ0V4dGVuZGVkXG59KSB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtwcm9kdWN0cy5sZW5ndGggPiAzID8gPGRpdiBjbGFzcz1cInJlY29tbWVuZGF0aW9ucy10ZXh0XCI+c2VlIHJlY29tbWVuZGF0aW9uczwvZGl2PiA6IDw+PC8+fVxuICAgICAgPGRpdiBjbGFzcz1cInN0YWNrbGFwb3B1cC1wcm9kdWN0LWltYWdlcy13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzd2lwZXIgc3dpcGVyLWV4cGFuZGVkLXByb2R1Y3QtcmVjcyBzdGFja2xhcG9wdXAtcHJvZHVjdHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpcGVyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgIHtzZWxlY3RlZFByb2R1Y3QgJiYgKFxuICAgICAgICAgICAgICA8UHJvZHVjdFdyYXBwZXIgcHJvZHVjdHM9e3Byb2R1Y3RzfSBzZWxlY3RlZFByb2R1Y3RJZD17c2VsZWN0ZWRQcm9kdWN0LmlkfT48L1Byb2R1Y3RXcmFwcGVyPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzd2lwZXItZXhwLXByb2R1Y3QtcmVjcy1idXR0b24tcHJldiBzd2lwZXItYnV0dG9uLXByZXZcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInN3aXBlci1uYXYtaWNvbiBpY29uLXByZXYtd2hpdGVcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN3aXBlci1leHAtcHJvZHVjdC1yZWNzLWJ1dHRvbi1uZXh0IHN3aXBlci1idXR0b24tbmV4dFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3dpcGVyLW5hdi1pY29uIGljb24tbmV4dC13aGl0ZVwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUHJvZHVjdHNUZW1wbGF0ZShzZGs6IFNkaywgY29tcG9uZW50PzogSVByb2R1Y3RzQ29tcG9uZW50KSB7XG4gIGlmICghY29tcG9uZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiUHJvZHVjdHMgY29tcG9uZW50IGluY29ycmVjdGx5IHBhc3NlZC5cIilcbiAgfVxuXG4gIGNvbnN0IHRpbGVJZCA9IGNvbXBvbmVudC5nZXRUaWxlSWQoKVxuICBjb25zdCB0aWxlID0gc2RrLnRpbGVzLmdldFRpbGUodGlsZUlkKVxuICBjb25zdCBzZWxlY3RlZFByb2R1Y3RTdGF0ZSA9IHNkay50aWxlcy5nZXRTZWxlY3RlZFByb2R1Y3QoKVxuXG4gIGlmICghdGlsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRpbGUgZm91bmRcIilcbiAgfVxuXG4gIGNvbnN0IHByb2R1Y3RzOiBUYWdFeHRlbmRlZFtdID0gKHRpbGUudGFnc19leHRlbmRlZCB8fCBbXSkuZmlsdGVyKCh7IHR5cGUgfSkgPT4gdHlwZSA9PT0gXCJwcm9kdWN0XCIpXG5cbiAgaWYgKCFwcm9kdWN0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gPD48Lz5cbiAgfVxuXG4gIGNvbnN0IHNlbGVjdGVkUHJvZHVjdEJ5SWQgPSBzZWxlY3RlZFByb2R1Y3RTdGF0ZVxuICAgID8gcHJvZHVjdHMuZmluZCgoeyBpZCB9KSA9PiBpZCA9PSBzZWxlY3RlZFByb2R1Y3RTdGF0ZS5pZC50b1N0cmluZygpKVxuICAgIDogbnVsbFxuXG4gIGNvbnN0IHNlbGVjdGVkUHJvZHVjdDogVGFnRXh0ZW5kZWQgPSBzZWxlY3RlZFByb2R1Y3RCeUlkIHx8IHByb2R1Y3RzWzBdXG4gIGNvbnN0IG1hcHBlZFByb2R1Y3RzID0gcHJvZHVjdHMubWFwKHByb2R1Y3QgPT4gPFByb2R1Y3REZXRhaWxzIHNkaz17c2RrfSBwcm9kdWN0PXtwcm9kdWN0fT48L1Byb2R1Y3REZXRhaWxzPilcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8UHJvZHVjdEhlYWRlciBwcm9kdWN0PXtzZWxlY3RlZFByb2R1Y3R9PjwvUHJvZHVjdEhlYWRlcj5cbiAgICAgIDxQcm9kdWN0SW1hZ2VzIHByb2R1Y3RzPXtwcm9kdWN0c30gc2VsZWN0ZWRQcm9kdWN0PXtzZWxlY3RlZFByb2R1Y3R9PjwvUHJvZHVjdEltYWdlcz5cbiAgICAgIHttYXBwZWRQcm9kdWN0c31cbiAgICA8Lz5cbiAgKVxufVxuIiwgImltcG9ydCB7IGxvYWRXaWRnZXQgfSBmcm9tIFwiQHN0YWNrbGEvd2lkZ2V0LXV0aWxzXCJcbmltcG9ydCB7IGxvYWRXYXRlcmZhbGxMYXlvdXQgfSBmcm9tIFwiLi93YXRlcmZhbGwubGliXCJcbmltcG9ydCBQcm9kdWN0c1RlbXBsYXRlIGZyb20gXCIuL3Byb2R1Y3RzLnRlbXBsYXRlXCJcblxubG9hZFdpZGdldCh7XG4gIGNhbGxiYWNrczoge1xuICAgIG9uTG9hZE1vcmU6IFsoKSA9PiBsb2FkV2F0ZXJmYWxsTGF5b3V0KCldLFxuICAgIG9uVGlsZXNVcGRhdGVkOiBbKCkgPT4gbG9hZFdhdGVyZmFsbExheW91dCgpXSxcbiAgICBvblJlc2l6ZTogWygpID0+IGxvYWRXYXRlcmZhbGxMYXlvdXQoKV0sXG4gICAgb25Mb2FkOiBbKCkgPT4gbG9hZFdhdGVyZmFsbExheW91dCgpXVxuICB9LFxuICB0ZW1wbGF0ZXM6IHtcbiAgICBcInVnYy1wcm9kdWN0c1wiOiB7XG4gICAgICB0ZW1wbGF0ZTogUHJvZHVjdHNUZW1wbGF0ZVxuICAgIH1cbiAgfSxcbiAgZmVhdHVyZXM6IHt9LFxuICBleHRlbnNpb25zOiB7fVxufSlcblxubG9hZFdhdGVyZmFsbExheW91dCgpXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7QUFBQSxNQUFJLFlBQVksT0FBTztBQUN2QixNQUFJLG9CQUFvQixPQUFPO0FBQy9CLE1BQUksUUFBUSxDQUFDLElBQUksUUFBUSxTQUFTLFNBQVM7QUFDekMsV0FBTyxPQUFPLE9BQU8sR0FBRyxHQUFHLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUk7QUFBQSxFQUNsRTtBQUNBLE1BQUksV0FB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QUFBQSxFQUNGLENBQUM7QUFHRCxNQUFJO0FBQ0osTUFBSSxxQkFBcUIsTUFBTTtBQUFBLElBQzdCLGdEQUFnRDtBQUM5Qyw4QkFBd0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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
