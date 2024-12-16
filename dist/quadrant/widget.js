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
    const tileSizes2 = {
      small: settings?.small ?? "173px",
      medium: settings?.medium ?? "265.5px",
      large: settings?.large ?? "400px"
    };
    if (!inline_tile_size) {
      return tileSizes2["medium"];
    }
    return tileSizes2[inline_tile_size];
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
  function waitForElements(parent, target, callback) {
    const elements = parent.querySelectorAll(target);
    if (elements.length > 0) {
      callback(elements);
    }
    const observer = new MutationObserver(() => {
      const newElements = parent.querySelectorAll(target);
      if (newElements.length > 0) {
        callback(newElements);
        observer.disconnect();
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
  src: url("data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA");
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
    ), tagsEnabled && /* @__PURE__ */ createElement("tile-tags", { "tile-id": tile.id, mode: "swiper", context: "expanded" }), productsEnabled && /* @__PURE__ */ createElement(createFragment, null, /* @__PURE__ */ createElement("ugc-products", { parent, "tile-id": tile.id }))))))));
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

  // widgets/quadrant/quadrant.lib.ts
  var tileSizes = {
    small: 88.5,
    medium: 133.5,
    large: 269.2
  };
  var tilesContainer = sdk.querySelector(".ugc-tiles");
  function removeEmptyTileGroups() {
    const tileGroups = sdk.querySelectorAll(".tile-group");
    tileGroups.forEach((tileGroup) => {
      if (tileGroup.children.length === 0) {
        tileGroup.remove();
      }
    });
  }
  function getTileRowHeight() {
    const style = sdk.getStyleConfig();
    const { inline_tile_size } = style;
    const tileSizes2 = {
      small: "15vw",
      medium: "25vw",
      large: "50vw"
    };
    if (!inline_tile_size) {
      return tileSizes2["medium"];
    }
    return tileSizes2[inline_tile_size];
  }
  function createTileGroup(tiles, groupStartIndex, tileSize) {
    if (tiles.length - groupStartIndex < 5) {
      return;
    }
    const tileGroup = document.createElement("div");
    tileGroup.classList.add("tile-group");
    const isLargeFirst = tileSize === tileSizes.large;
    const largeTileIndex = isLargeFirst ? 4 : 0;
    const largeTile = tiles[groupStartIndex + largeTileIndex];
    largeTile.classList.add("large", "processed");
    tileGroup.appendChild(largeTile);
    const startOffset = isLargeFirst ? 0 : 1;
    for (let tileOffset = startOffset; tileOffset < startOffset + 4; tileOffset++) {
      const smallTile = tiles[groupStartIndex + tileOffset];
      smallTile.classList.add("small", "processed");
      tileGroup.appendChild(smallTile);
    }
    return tileGroup;
  }
  function addQuadrantTiles(tiles, tileSize, startIndex = 0) {
    if (tilesContainer) {
      for (let groupStartIndex = startIndex; groupStartIndex < tiles.length; groupStartIndex += 5) {
        const tileGroup = createTileGroup(tiles, groupStartIndex, tileSize);
        if (tileGroup) {
          tilesContainer?.appendChild(tileGroup);
        }
      }
    }
  }
  async function preloadTileImagesAndRemoveBrokenTiles(tiles) {
    sdk.querySelector("#load-more").style.opacity = "0";
    sdk.querySelector("#load-more-loader").classList.remove("hidden");
    const promises = Array.from(tiles).map(async (tile) => {
      const tileElement = tile.querySelector(".tile");
      const tileImage = tileElement?.getAttribute("data-background-image") ?? "";
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(tile);
        image.onerror = () => {
          tile.remove();
          resolve(null);
        };
        if (!tileImage) {
          resolve(null);
        }
        image.src = tileImage;
        if (!tileElement) {
          resolve(null);
          return;
        }
        tileElement.style.backgroundImage = `url(${tileImage})`;
      });
    });
    const loadedTiles = await Promise.all(promises);
    sdk.querySelector("#load-more").style.opacity = "1";
    sdk.querySelector("#load-more-loader").classList.add("hidden");
    return loadedTiles.filter((tile) => tile !== null);
  }
  function getQuadrantTiles() {
    const { inline_tile_size } = sdk.getStyleConfig();
    sdk.addEventListener("moreLoad", () => {
      const tileSize = tileSizes[inline_tile_size ?? "medium"];
      waitForElements(tilesContainer, ".ugc-tile:not(.processed)", async (newTiles) => {
        if (newTiles && newTiles.length >= 5) {
          const loadedTiles = await preloadTileImagesAndRemoveBrokenTiles(newTiles);
          addQuadrantTiles(loadedTiles, tileSize);
          removeEmptyTileGroups();
        }
      });
    });
    sdk.addEventListener("load", async () => {
      const tiles = sdk.querySelectorAll(".ugc-tile");
      if (!tiles || tiles.length === 0) {
        return;
      }
      const loadedTiles = await preloadTileImagesAndRemoveBrokenTiles(tiles);
      const tileSize = tileSizes[inline_tile_size ?? "medium"];
      if (tiles && tiles.length > 0) {
        addQuadrantTiles(loadedTiles, tileSize);
      }
    });
  }

  // widgets/quadrant/widget.tsx
  loadWidget({
    features: {
      preloadImages: false,
      hideBrokenImages: true,
      tileSizeSettings: {
        small: "1fr 1fr 1fr",
        medium: "1fr 1fr",
        large: "1fr"
      },
      cssVariables: {
        "--tile-size-column-height": getTileRowHeight()
      }
    }
  });
  getQuadrantTiles();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFja2FnZXMvd2lkZ2V0LXV0aWxzL2Rpc3QvZXNtL2luZGV4LmpzIiwgIi4uLy4uL3dpZGdldHMvcXVhZHJhbnQvcXVhZHJhbnQubGliLnRzIiwgIi4uLy4uL3dpZGdldHMvcXVhZHJhbnQvd2lkZ2V0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsidmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2dldE93blByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIF9fZXNtID0gKGZuLCByZXMpID0+IGZ1bmN0aW9uIF9faW5pdCgpIHtcbiAgcmV0dXJuIGZuICYmIChyZXMgPSAoMCwgZm5bX19nZXRPd25Qcm9wTmFtZXMoZm4pWzBdXSkoZm4gPSAwKSksIHJlcztcbn07XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG5cbi8vIHNyYy9saWJzL2Nzcy12YXJpYWJsZXMudHNcbmZ1bmN0aW9uIGdldFRpbGVTaXplKHNldHRpbmdzKSB7XG4gIGNvbnN0IHN0eWxlID0gc2RrLmdldFN0eWxlQ29uZmlnKCk7XG4gIGNvbnN0IHsgaW5saW5lX3RpbGVfc2l6ZSB9ID0gc3R5bGU7XG4gIGNvbnN0IHRpbGVTaXplcyA9IHtcbiAgICBzbWFsbDogc2V0dGluZ3M/LnNtYWxsID8/IFwiMTczcHhcIixcbiAgICBtZWRpdW06IHNldHRpbmdzPy5tZWRpdW0gPz8gXCIyNjUuNXB4XCIsXG4gICAgbGFyZ2U6IHNldHRpbmdzPy5sYXJnZSA/PyBcIjQwMHB4XCJcbiAgfTtcbiAgaWYgKCFpbmxpbmVfdGlsZV9zaXplKSB7XG4gICAgcmV0dXJuIHRpbGVTaXplc1tcIm1lZGl1bVwiXTtcbiAgfVxuICByZXR1cm4gdGlsZVNpemVzW2lubGluZV90aWxlX3NpemVdO1xufVxuZnVuY3Rpb24gZ2V0VGlsZVNpemVCeVdpZGdldCh0aWxlU2l6ZVNldHRpbmdzKSB7XG4gIGNvbnN0IHNpemVXaXRoVW5pdCA9IGdldFRpbGVTaXplKHRpbGVTaXplU2V0dGluZ3MpO1xuICBjb25zdCBzaXplVW5pdGxlc3MgPSBzaXplV2l0aFVuaXQucmVwbGFjZShcInB4XCIsIFwiXCIpO1xuICByZXR1cm4geyBcIi0tdGlsZS1zaXplXCI6IHNpemVXaXRoVW5pdCwgXCItLXRpbGUtc2l6ZS11bml0bGVzc1wiOiBzaXplVW5pdGxlc3MgfTtcbn1cbmZ1bmN0aW9uIHRyaW1IYXNoVmFsdWVzRnJvbU9iamVjdChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG9iaikucmVkdWNlKChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGFjY1trZXldID0gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnN0YXJ0c1dpdGgoXCIjXCIpID8gdmFsdWUucmVwbGFjZShcIiNcIiwgXCJcIikgOiB2YWx1ZTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG59XG5mdW5jdGlvbiBnZXRDU1NWYXJpYWJsZXMoZmVhdHVyZXMpIHtcbiAgY29uc3QgeyB0aWxlU2l6ZVNldHRpbmdzLCBjc3NWYXJpYWJsZXMgfSA9IGZlYXR1cmVzIHx8IHt9O1xuICBjb25zdCBzdHlsZXMgPSBzZGsuZ2V0U3R5bGVDb25maWcoKTtcbiAgY29uc3QgaW5saW5lVGlsZVNldHRpbmdzID0gc2RrLmdldElubGluZVRpbGVDb25maWcoKTtcbiAgY29uc3Qge1xuICAgIHdpZGdldF9iYWNrZ3JvdW5kLFxuICAgIHRpbGVfYmFja2dyb3VuZCxcbiAgICB0ZXh0X3RpbGVfYmFja2dyb3VuZCxcbiAgICB0ZXh0X3RpbGVfbGlua19jb2xvcixcbiAgICB0ZXh0X3RpbGVfdXNlcl9oYW5kbGVfZm9udF9jb2xvcixcbiAgICBzaG9wc3BvdF9idG5fYmFja2dyb3VuZCxcbiAgICBzaG9wc3BvdF9idG5fZm9udF9jb2xvcixcbiAgICBtYXJnaW4sXG4gICAgdGV4dF90aWxlX2ZvbnRfc2l6ZSxcbiAgICB0ZXh0X3RpbGVfdXNlcl9uYW1lX2ZvbnRfc2l6ZSxcbiAgICB0ZXh0X3RpbGVfdXNlcl9oYW5kbGVfZm9udF9zaXplLFxuICAgIHNob3BzcG90X2ljb24sXG4gICAgZXhwYW5kZWRfdGlsZV9ib3JkZXJfcmFkaXVzLFxuICAgIGlubGluZV90aWxlX2JvcmRlcl9yYWRpdXMsXG4gICAgaW5saW5lX3RpbGVfbWFyZ2luLFxuICAgIHNob3BzcG90X2J0bl9mb250X3NpemUsXG4gICAgdGV4dF90aWxlX2ZvbnRfY29sb3IsXG4gICAgdGV4dF90aWxlX3VzZXJfbmFtZV9mb250X2NvbG9yXG4gIH0gPSB0cmltSGFzaFZhbHVlc0Zyb21PYmplY3Qoc3R5bGVzKTtcbiAgY29uc3QgeyBzaG93X3RhZ3M6IHNob3dfdGFnc19leHBhbmRlZCB9ID0gc2RrLmdldEV4cGFuZGVkVGlsZUNvbmZpZygpO1xuICBjb25zdCB7IHNob3dfY2FwdGlvbiwgc2hvd190YWdzOiBzaG93X3RhZ3NfaW5saW5lLCBzaG93X3Nob3BzcG90cywgc2hvd190aW1lc3RhbXAsIHNob3dfc2hhcmluZyB9ID0gaW5saW5lVGlsZVNldHRpbmdzO1xuICBjb25zdCBtdXRhdGVkQ3NzVmFyaWFibGVzID0ge1xuICAgIC4uLmNzc1ZhcmlhYmxlcyxcbiAgICBcIi0td2lkZ2V0LWJhY2tncm91bmRcIjogYCMke3dpZGdldF9iYWNrZ3JvdW5kfWAsXG4gICAgXCItLWlubGluZS10aWxlLWJhY2tncm91bmRcIjogYCMke3RpbGVfYmFja2dyb3VuZH1gLFxuICAgIFwiLS10ZXh0LXRpbGUtYmFja2dyb3VuZFwiOiBgIyR7dGV4dF90aWxlX2JhY2tncm91bmR9YCxcbiAgICBcIi0tc2hvcHNwb3QtYnRuLWJhY2tncm91bmRcIjogYCMke3Nob3BzcG90X2J0bl9iYWNrZ3JvdW5kfWAsXG4gICAgXCItLWN0YS1idXR0b24tYmFja2dyb3VuZC1jb2xvclwiOiBgIyR7c2hvcHNwb3RfYnRuX2JhY2tncm91bmR9YCxcbiAgICBcIi0tdGlsZS10YWctYmFja2dyb3VuZFwiOiBgI2JjYmJiY2AsXG4gICAgXCItLXRleHQtdGlsZS1saW5rLWNvbG9yXCI6IGAjJHt0ZXh0X3RpbGVfbGlua19jb2xvcn1gLFxuICAgIFwiLS10ZXh0LXRpbGUtdXNlci1oYW5kbGUtZm9udC1jb2xvclwiOiBgIyR7dGV4dF90aWxlX3VzZXJfaGFuZGxlX2ZvbnRfY29sb3J9YCxcbiAgICBcIi0tc2hvcHNwb3QtYnRuLWZvbnQtY29sb3JcIjogYCMke3Nob3BzcG90X2J0bl9mb250X2NvbG9yfWAsXG4gICAgXCItLW1hcmdpblwiOiBgJHttYXJnaW4gPyBtYXJnaW4gOiAwfXB4YCxcbiAgICBcIi0tdGV4dC10aWxlLWZvbnQtc2l6ZVwiOiBgJHt0ZXh0X3RpbGVfZm9udF9zaXplfXB4YCxcbiAgICBcIi0tdGV4dC1jYXB0aW9uLXBhcmFncmFwaC1mb250LXNpemVcIjogYCR7dGV4dF90aWxlX2ZvbnRfc2l6ZSB8fCAxMn1weGAsXG4gICAgXCItLXRleHQtdGlsZS11c2VyLW5hbWUtZm9udC1zaXplXCI6IGAke3RleHRfdGlsZV91c2VyX25hbWVfZm9udF9zaXplfXB4YCxcbiAgICBcIi0tdGV4dC10aWxlLXVzZXItbmFtZS1mb250LWNvbG9yXCI6IGAjJHt0ZXh0X3RpbGVfdXNlcl9uYW1lX2ZvbnRfY29sb3J9YCxcbiAgICBcIi0tdGV4dC10aWxlLXVzZXItaGFuZGxlLWZvbnQtc2l6ZVwiOiBgJHt0ZXh0X3RpbGVfdXNlcl9oYW5kbGVfZm9udF9zaXplIHx8IDEyfXB4YCxcbiAgICBcIi0tdGV4dC10aWxlLWZvbnQtY29sb3JcIjogYCMke3RleHRfdGlsZV9mb250X2NvbG9yfWAsXG4gICAgXCItLXNob3ctY2FwdGlvblwiOiBgJHtzaG93X2NhcHRpb24gPyBcImJsb2NrXCIgOiBcIm5vbmVcIn1gLFxuICAgIFwiLS1zaG93LWNhcHRpb24td2Via2l0XCI6IGAke3Nob3dfY2FwdGlvbiA/IFwiLXdlYmtpdC1ib3hcIiA6IFwibm9uZVwifWAsXG4gICAgXCItLXNob3BzcG90LWljb25cIjogc2hvcHNwb3RfaWNvbiA/IHNob3BzcG90X2ljb24gOiBgIzAwMGAsXG4gICAgXCItLXRhZ3MtZ2FwXCI6IGA0cHhgLFxuICAgIC8vIFRPRE8gLSBSZXBsYWNlIHRoZXNlIHdpdGggY3RhX2J1dHRvbl9mb250X2NvbG9yIGFuZCBjdGFfYnV0dG9uX2ZvbnRfc2l6ZSBAUGVuZyBaaG91XG4gICAgXCItLWN0YS1idXR0b24tZm9udC1jb2xvclwiOiBgIyR7c2hvcHNwb3RfYnRuX2ZvbnRfY29sb3J9YCxcbiAgICBcIi0tY3RhLWJ1dHRvbi1mb250LXNpemVcIjogYCR7c2hvcHNwb3RfYnRuX2ZvbnRfc2l6ZX1weGAsXG4gICAgXCItLWV4cGFuZGVkLXRpbGUtYm9yZGVyLXJhZGl1c1wiOiBgJHtleHBhbmRlZF90aWxlX2JvcmRlcl9yYWRpdXN9cHhgLFxuICAgIC4uLmdldFRpbGVTaXplQnlXaWRnZXQodGlsZVNpemVTZXR0aW5ncyksXG4gICAgXCItLWlubGluZS10aWxlLWJvcmRlci1yYWRpdXNcIjogYCR7aW5saW5lX3RpbGVfYm9yZGVyX3JhZGl1c31weGAsXG4gICAgXCItLWlubGluZS10aWxlLW1hcmdpblwiOiBgJHtpbmxpbmVfdGlsZV9tYXJnaW59cHhgLFxuICAgIFwiLS10YWdzLWRpc3BsYXktaW5saW5lXCI6IGAke3Nob3dfdGFnc19pbmxpbmUgPyBcImZsZXhcIiA6IFwibm9uZVwifWAsXG4gICAgXCItLXRhZ3MtZGlzcGxheS1leHBhbmRlZFwiOiBgJHtzaG93X3RhZ3NfZXhwYW5kZWQgPyBcImZsZXhcIiA6IFwibm9uZVwifWAsXG4gICAgXCItLXNob3BzcG90cy1kaXNwbGF5XCI6IGAke3Nob3dfc2hvcHNwb3RzID8gXCJibG9ja1wiIDogXCJub25lXCJ9YCxcbiAgICBcIi0tdGltZXBocmFzZS1kaXNwbGF5XCI6IGAke3Nob3dfdGltZXN0YW1wID8gXCJibG9ja1wiIDogXCJub25lXCJ9YCxcbiAgICBcIi0tc2hhcmUtaWNvbi1kaXNwbGF5XCI6IGAke3Nob3dfc2hhcmluZyA/IFwiaW5saW5lLWJsb2NrXCIgOiBcIm5vbmVcIn1gXG4gIH07XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhtdXRhdGVkQ3NzVmFyaWFibGVzKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gYCR7a2V5fTogJHt2YWx1ZX07YCkuam9pbihcIlxcblwiKTtcbn1cbnZhciBpbml0X2Nzc192YXJpYWJsZXMgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY3NzLXZhcmlhYmxlcy50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvanN4LWh0bWwudHNcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuPy5sZW5ndGggPyB0eXBlKHsgLi4ucHJvcHMsIGNoaWxkcmVuIH0pIDogdHlwZShwcm9wcyk7XG4gIH1cbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodHlwZSk7XG4gIGFwcGx5UHJvcGVydGllcyhlbGVtZW50LCBwcm9wcyA/PyB7fSk7XG4gIGNoaWxkcmVuPy5mb3JFYWNoKChjaGlsZCkgPT4gYXBwZW5kQ2hpbGQoZWxlbWVudCwgY2hpbGQpKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudChhcmcpIHtcbiAgY29uc3QgeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSA9IGFyZyA/PyB7IGNoaWxkcmVuOiBbXSB9O1xuICBjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgT2JqZWN0LmFzc2lnbihmcmFnbWVudCwgcHJvcHMpO1xuICBjaGlsZHJlbj8uZm9yRWFjaCgoY2hpbGQpID0+IGFwcGVuZENoaWxkKGZyYWdtZW50LCBjaGlsZCkpO1xuICByZXR1cm4gZnJhZ21lbnQ7XG59XG5mdW5jdGlvbiBpc0V2ZW50TGlzdGVuZXIoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4ga2V5LnN0YXJ0c1dpdGgoXCJvblwiKSAmJiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIjtcbn1cbmZ1bmN0aW9uIGFwcGx5UHJvcGVydGllcyhlbGVtZW50LCBwcm9wcykge1xuICBPYmplY3QuZW50cmllcyhwcm9wcykuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKGlzRXZlbnRMaXN0ZW5lcihrZXksIHZhbHVlKSkge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGtleS5zbGljZSgyKS50b0xvd2VyQ2FzZSgpLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwic3R5bGVcIikge1xuICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5vcm1LZXkgPSBhbGlhc2VzW2tleV0gPz8ga2V5O1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobm9ybUtleSwgU3RyaW5nKHZhbHVlKSk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIGFwcGVuZENoaWxkKGVsZW1lbnQsIGNoaWxkKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkge1xuICAgIGNoaWxkLmZvckVhY2goKGMpID0+IGFwcGVuZENoaWxkKGVsZW1lbnQsIGMpKTtcbiAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICBBcnJheS5mcm9tKGNoaWxkLmNoaWxkcmVuKS5mb3JFYWNoKChjKSA9PiBlbGVtZW50LmFwcGVuZENoaWxkKGMpKTtcbiAgfSBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gIH0gZWxzZSBpZiAoY2hpbGQgIT09IHZvaWQgMCAmJiBjaGlsZCAhPT0gbnVsbCAmJiBjaGlsZCAhPT0gZmFsc2UpIHtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyhjaGlsZCkpKTtcbiAgfVxufVxudmFyIGFsaWFzZXM7XG52YXIgaW5pdF9qc3hfaHRtbCA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9qc3gtaHRtbC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGFsaWFzZXMgPSB7XG4gICAgICBjbGFzc05hbWU6IFwiY2xhc3NcIixcbiAgICAgIGh0bWxGb3I6IFwiZm9yXCJcbiAgICB9O1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvdGlsZS5saWIudHNcbmZ1bmN0aW9uIGhhbmRsZVRpbGVDbGljayhlLCB3aWRnZXRVcmwpIHtcbiAgY29uc3QgdWdjVGlsZXMgPSBzZGsudGlsZXMudGlsZXM7XG4gIGNvbnN0IGNsaWNrZWRFbGVtZW50ID0gZS50YXJnZXQ7XG4gIGNvbnN0IGNsaWNrZWRUaWxlID0gY2xpY2tlZEVsZW1lbnQuY2xvc2VzdChcIi51Z2MtdGlsZVwiKTtcbiAgaWYgKCFjbGlja2VkVGlsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIGNsaWNrZWQgdGlsZVwiKTtcbiAgfVxuICBjb25zdCB0aWxlSWQgPSBjbGlja2VkVGlsZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICBpZiAoIXRpbGVJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIHRpbGUgSURcIik7XG4gIH1cbiAgY29uc3QgdGlsZURhdGEgPSB1Z2NUaWxlc1t0aWxlSWRdO1xuICBjb25zdCB0aWxlTGluayA9IHdpZGdldFVybCB8fCB0aWxlRGF0YS5vcmlnaW5hbF91cmwgfHwgdGlsZURhdGEub3JpZ2luYWxfbGluaztcbiAgaWYgKHRpbGVMaW5rKSB7XG4gICAgd2luZG93Lm9wZW4odGlsZUxpbmssIFwiX2JsYW5rXCIpO1xuICB9XG59XG5mdW5jdGlvbiBnZXRUaW1lcGhyYXNlKHRpbWVzdGFtcCkge1xuICBpZiAoIXRpbWVzdGFtcCkge1xuICAgIHJldHVybiBcImp1c3Qgbm93XCI7XG4gIH1cbiAgY29uc3Qgbm93MiA9IE1hdGgucm91bmQoKC8qIEBfX1BVUkVfXyAqLyBuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLyAxZTMpO1xuICBjb25zdCB0aGVuID0gTWF0aC5yb3VuZCh0aW1lc3RhbXApO1xuICBpZiAoaXNOYU4odGhlbikpIHtcbiAgICByZXR1cm4gXCJhIHdoaWxlIGFnb1wiO1xuICB9XG4gIGNvbnN0IGRpZmYgPSBub3cyIC0gdGhlbjtcbiAgbGV0IHRpbWVOdW1iZXIgPSBkaWZmO1xuICBsZXQgdGltZVdvcmQgPSBcIlwiO1xuICBpZiAoZGlmZiA+PSAyNTkyZTMpIHtcbiAgICB0aW1lTnVtYmVyID0gTWF0aC5yb3VuZChkaWZmIC8gMjU5MmUzKTtcbiAgICB0aW1lV29yZCA9IFwibW9udGhcIjtcbiAgfSBlbHNlIGlmIChkaWZmID49IDYwNDgwMCkge1xuICAgIHRpbWVOdW1iZXIgPSBNYXRoLnJvdW5kKGRpZmYgLyA2MDQ4MDApO1xuICAgIHRpbWVXb3JkID0gXCJ3ZWVrXCI7XG4gIH0gZWxzZSBpZiAoZGlmZiA+PSA4NjQwMCkge1xuICAgIHRpbWVOdW1iZXIgPSBNYXRoLnJvdW5kKGRpZmYgLyA4NjQwMCk7XG4gICAgdGltZVdvcmQgPSBcImRheVwiO1xuICB9IGVsc2UgaWYgKGRpZmYgPj0gMzYwMCkge1xuICAgIHRpbWVOdW1iZXIgPSBNYXRoLnJvdW5kKGRpZmYgLyAzNjAwKTtcbiAgICB0aW1lV29yZCA9IFwiaG91clwiO1xuICB9IGVsc2UgaWYgKGRpZmYgPj0gNjApIHtcbiAgICB0aW1lTnVtYmVyID0gTWF0aC5yb3VuZChkaWZmIC8gNjApO1xuICAgIHRpbWVXb3JkID0gXCJtaW51dGVcIjtcbiAgfSBlbHNlIGlmIChkaWZmID4gMCkge1xuICAgIHRpbWVOdW1iZXIgPSBkaWZmO1xuICAgIHRpbWVXb3JkID0gXCJzZWNvbmRcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCJqdXN0IG5vd1wiO1xuICB9XG4gIGlmICh0aW1lTnVtYmVyICE9PSAxKSB7XG4gICAgdGltZVdvcmQgKz0gXCJzXCI7XG4gIH1cbiAgcmV0dXJuIHRpbWVOdW1iZXIgKyBcIiBcIiArIHRpbWVXb3JkICsgXCIgYWdvXCI7XG59XG52YXIgaW5pdF90aWxlX2xpYiA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy90aWxlLmxpYi50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvd2lkZ2V0LmNvbXBvbmVudHMudHNcbmZ1bmN0aW9uIGxvYWRFeHBhbmRTZXR0aW5nQ29tcG9uZW50cygpIHtcbiAgY29uc3QgeyBzaG93X3Nob3BzcG90cywgc2hvd19wcm9kdWN0cywgc2hvd19hZGRfdG9fY2FydCB9ID0gc2RrLmdldEV4cGFuZGVkVGlsZUNvbmZpZygpO1xuICBpZiAoc2hvd19zaG9wc3BvdHMpIHtcbiAgICBzZGsuYWRkTG9hZGVkQ29tcG9uZW50cyhbXCJzaG9wc3BvdHNcIl0pO1xuICB9XG4gIHNkay5hZGRMb2FkZWRDb21wb25lbnRzKFtcImV4cGFuZGVkLXRpbGVcIl0pO1xuICBpZiAoc2hvd19wcm9kdWN0cykge1xuICAgIHNkay5hZGRMb2FkZWRDb21wb25lbnRzKFtcInByb2R1Y3RzXCJdKTtcbiAgfVxuICBpZiAoc2hvd19hZGRfdG9fY2FydCkge1xuICAgIHNkay5hZGRMb2FkZWRDb21wb25lbnRzKFtcImFkZC10by1jYXJ0XCJdKTtcbiAgfVxufVxudmFyIGluaXRfd2lkZ2V0X2NvbXBvbmVudHMgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvd2lkZ2V0LmNvbXBvbmVudHMudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL3dpZGdldC5sYXlvdXQudHNcbmZ1bmN0aW9uIGFkZENTU1ZhcmlhYmxlc1RvUGxhY2VtZW50KGNzc1ZhcmlhYmxlcykge1xuICBjb25zdCBzaGFkb3dSb290ID0gc2RrLnBsYWNlbWVudC5nZXRTaGFkb3dSb290KCk7XG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBzdHlsZS5pbm5lckhUTUwgPSBgXG4gICAgICA6aG9zdCB7XG4gICAgICAgICAgJHtjc3NWYXJpYWJsZXN9XG4gICAgICB9YDtcbiAgc2hhZG93Um9vdC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5mdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gIGNvbnN0IHsgZW5hYmxlZCB9ID0gc2RrLmdldFdpZGdldE9wdGlvbnMoKTtcbiAgcmV0dXJuIGVuYWJsZWQgJiYgaGFzTWluaW11bVRpbGVzUmVxdWlyZWQoKTtcbn1cbmZ1bmN0aW9uIGhhc01pbmltdW1UaWxlc1JlcXVpcmVkKCkge1xuICBjb25zdCB7IG1pbmltYWxfdGlsZXMgfSA9IHNkay5nZXRTdHlsZUNvbmZpZygpO1xuICBjb25zdCBtaW5pbWFsVGlsZXMgPSBwYXJzZUludChtaW5pbWFsX3RpbGVzKTtcbiAgaWYgKG1pbmltYWxUaWxlcyAmJiBtaW5pbWFsVGlsZXMgPiAwKSB7XG4gICAgY29uc3QgdGlsZXMgPSBzZGsucXVlcnlTZWxlY3RvckFsbChcIi51Z2MtdGlsZVwiKTtcbiAgICBpZiAodGlsZXMgJiYgdGlsZXMubGVuZ3RoID49IG1pbmltYWxUaWxlcykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihgTm90IGVub3VnaCB0aWxlcyB0byByZW5kZXIgd2lkZ2V0LiBFeHBlY3RlZCAke21pbmltYWxUaWxlc30gYnV0IGZvdW5kICR7dGlsZXMubGVuZ3RofWApO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxudmFyIGluaXRfd2lkZ2V0X2xheW91dCA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy93aWRnZXQubGF5b3V0LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9zc3Itd2luZG93LmVzbS5tanNcbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgXCJjb25zdHJ1Y3RvclwiIGluIG9iaiAmJiBvYmouY29uc3RydWN0b3IgPT09IE9iamVjdDtcbn1cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQsIHNyYykge1xuICBpZiAodGFyZ2V0ID09PSB2b2lkIDApIHtcbiAgICB0YXJnZXQgPSB7fTtcbiAgfVxuICBpZiAoc3JjID09PSB2b2lkIDApIHtcbiAgICBzcmMgPSB7fTtcbiAgfVxuICBPYmplY3Qua2V5cyhzcmMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0W2tleV0gPT09IFwidW5kZWZpbmVkXCIpIHRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBpZiAoaXNPYmplY3Qoc3JjW2tleV0pICYmIGlzT2JqZWN0KHRhcmdldFtrZXldKSAmJiBPYmplY3Qua2V5cyhzcmNba2V5XSkubGVuZ3RoID4gMCkge1xuICAgICAgZXh0ZW5kKHRhcmdldFtrZXldLCBzcmNba2V5XSk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIGdldERvY3VtZW50KCkge1xuICBjb25zdCBkb2MgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBkb2N1bWVudCA6IHt9O1xuICBleHRlbmQoZG9jLCBzc3JEb2N1bWVudCk7XG4gIHJldHVybiBkb2M7XG59XG5mdW5jdGlvbiBnZXRXaW5kb3coKSB7XG4gIGNvbnN0IHdpbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fTtcbiAgZXh0ZW5kKHdpbiwgc3NyV2luZG93KTtcbiAgcmV0dXJuIHdpbjtcbn1cbnZhciBzc3JEb2N1bWVudCwgc3NyV2luZG93O1xudmFyIGluaXRfc3NyX3dpbmRvd19lc20gPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvc3NyLXdpbmRvdy5lc20ubWpzXCIoKSB7XG4gICAgc3NyRG9jdW1lbnQgPSB7XG4gICAgICBib2R5OiB7fSxcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgIH0sXG4gICAgICBhY3RpdmVFbGVtZW50OiB7XG4gICAgICAgIGJsdXIoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIG5vZGVOYW1lOiBcIlwiXG4gICAgICB9LFxuICAgICAgcXVlcnlTZWxlY3RvcigpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuICAgICAgcXVlcnlTZWxlY3RvckFsbCgpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSxcbiAgICAgIGdldEVsZW1lbnRCeUlkKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgICBjcmVhdGVFdmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbml0RXZlbnQoKSB7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgIGNoaWxkTm9kZXM6IFtdLFxuICAgICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgICBzZXRBdHRyaWJ1dGUoKSB7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRFbGVtZW50c0J5VGFnTmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY3JlYXRlRWxlbWVudE5TKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9LFxuICAgICAgaW1wb3J0Tm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgaGFzaDogXCJcIixcbiAgICAgICAgaG9zdDogXCJcIixcbiAgICAgICAgaG9zdG5hbWU6IFwiXCIsXG4gICAgICAgIGhyZWY6IFwiXCIsXG4gICAgICAgIG9yaWdpbjogXCJcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiXCIsXG4gICAgICAgIHByb3RvY29sOiBcIlwiLFxuICAgICAgICBzZWFyY2g6IFwiXCJcbiAgICAgIH1cbiAgICB9O1xuICAgIHNzcldpbmRvdyA9IHtcbiAgICAgIGRvY3VtZW50OiBzc3JEb2N1bWVudCxcbiAgICAgIG5hdmlnYXRvcjoge1xuICAgICAgICB1c2VyQWdlbnQ6IFwiXCJcbiAgICAgIH0sXG4gICAgICBsb2NhdGlvbjoge1xuICAgICAgICBoYXNoOiBcIlwiLFxuICAgICAgICBob3N0OiBcIlwiLFxuICAgICAgICBob3N0bmFtZTogXCJcIixcbiAgICAgICAgaHJlZjogXCJcIixcbiAgICAgICAgb3JpZ2luOiBcIlwiLFxuICAgICAgICBwYXRobmFtZTogXCJcIixcbiAgICAgICAgcHJvdG9jb2w6IFwiXCIsXG4gICAgICAgIHNlYXJjaDogXCJcIlxuICAgICAgfSxcbiAgICAgIGhpc3Rvcnk6IHtcbiAgICAgICAgcmVwbGFjZVN0YXRlKCkge1xuICAgICAgICB9LFxuICAgICAgICBwdXNoU3RhdGUoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGdvKCkge1xuICAgICAgICB9LFxuICAgICAgICBiYWNrKCkge1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgQ3VzdG9tRXZlbnQ6IGZ1bmN0aW9uIEN1c3RvbUV2ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0sXG4gICAgICBhZGRFdmVudExpc3RlbmVyKCkge1xuICAgICAgfSxcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICB9LFxuICAgICAgZ2V0Q29tcHV0ZWRTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBnZXRQcm9wZXJ0eVZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIEltYWdlKCkge1xuICAgICAgfSxcbiAgICAgIERhdGUoKSB7XG4gICAgICB9LFxuICAgICAgc2NyZWVuOiB7fSxcbiAgICAgIHNldFRpbWVvdXQoKSB7XG4gICAgICB9LFxuICAgICAgY2xlYXJUaW1lb3V0KCkge1xuICAgICAgfSxcbiAgICAgIG1hdGNoTWVkaWEoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0sXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gICAgICB9LFxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL3V0aWxzLm1qc1xuZnVuY3Rpb24gY2xhc3Nlc1RvVG9rZW5zKGNsYXNzZXMyKSB7XG4gIGlmIChjbGFzc2VzMiA9PT0gdm9pZCAwKSB7XG4gICAgY2xhc3NlczIgPSBcIlwiO1xuICB9XG4gIHJldHVybiBjbGFzc2VzMi50cmltKCkuc3BsaXQoXCIgXCIpLmZpbHRlcigoYykgPT4gISFjLnRyaW0oKSk7XG59XG5mdW5jdGlvbiBkZWxldGVQcm9wcyhvYmopIHtcbiAgY29uc3Qgb2JqZWN0ID0gb2JqO1xuICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBvYmplY3Rba2V5XSA9IG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgZGVsZXRlIG9iamVjdFtrZXldO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gbmV4dFRpY2soY2FsbGJhY2ssIGRlbGF5KSB7XG4gIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7XG4gICAgZGVsYXkgPSAwO1xuICB9XG4gIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkZWxheSk7XG59XG5mdW5jdGlvbiBub3coKSB7XG4gIHJldHVybiBEYXRlLm5vdygpO1xufVxuZnVuY3Rpb24gZ2V0Q29tcHV0ZWRTdHlsZTIoZWwpIHtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBsZXQgc3R5bGU7XG4gIGlmICh3aW5kb3cyLmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICBzdHlsZSA9IHdpbmRvdzIuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCk7XG4gIH1cbiAgaWYgKCFzdHlsZSAmJiBlbC5jdXJyZW50U3R5bGUpIHtcbiAgICBzdHlsZSA9IGVsLmN1cnJlbnRTdHlsZTtcbiAgfVxuICBpZiAoIXN0eWxlKSB7XG4gICAgc3R5bGUgPSBlbC5zdHlsZTtcbiAgfVxuICByZXR1cm4gc3R5bGU7XG59XG5mdW5jdGlvbiBnZXRUcmFuc2xhdGUoZWwsIGF4aXMpIHtcbiAgaWYgKGF4aXMgPT09IHZvaWQgMCkge1xuICAgIGF4aXMgPSBcInhcIjtcbiAgfVxuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGxldCBtYXRyaXg7XG4gIGxldCBjdXJUcmFuc2Zvcm07XG4gIGxldCB0cmFuc2Zvcm1NYXRyaXg7XG4gIGNvbnN0IGN1clN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZTIoZWwpO1xuICBpZiAod2luZG93Mi5XZWJLaXRDU1NNYXRyaXgpIHtcbiAgICBjdXJUcmFuc2Zvcm0gPSBjdXJTdHlsZS50cmFuc2Zvcm0gfHwgY3VyU3R5bGUud2Via2l0VHJhbnNmb3JtO1xuICAgIGlmIChjdXJUcmFuc2Zvcm0uc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDYpIHtcbiAgICAgIGN1clRyYW5zZm9ybSA9IGN1clRyYW5zZm9ybS5zcGxpdChcIiwgXCIpLm1hcCgoYSkgPT4gYS5yZXBsYWNlKFwiLFwiLCBcIi5cIikpLmpvaW4oXCIsIFwiKTtcbiAgICB9XG4gICAgdHJhbnNmb3JtTWF0cml4ID0gbmV3IHdpbmRvdzIuV2ViS2l0Q1NTTWF0cml4KGN1clRyYW5zZm9ybSA9PT0gXCJub25lXCIgPyBcIlwiIDogY3VyVHJhbnNmb3JtKTtcbiAgfSBlbHNlIHtcbiAgICB0cmFuc2Zvcm1NYXRyaXggPSBjdXJTdHlsZS5Nb3pUcmFuc2Zvcm0gfHwgY3VyU3R5bGUuT1RyYW5zZm9ybSB8fCBjdXJTdHlsZS5Nc1RyYW5zZm9ybSB8fCBjdXJTdHlsZS5tc1RyYW5zZm9ybSB8fCBjdXJTdHlsZS50cmFuc2Zvcm0gfHwgY3VyU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShcInRyYW5zZm9ybVwiKS5yZXBsYWNlKFwidHJhbnNsYXRlKFwiLCBcIm1hdHJpeCgxLCAwLCAwLCAxLFwiKTtcbiAgICBtYXRyaXggPSB0cmFuc2Zvcm1NYXRyaXgudG9TdHJpbmcoKS5zcGxpdChcIixcIik7XG4gIH1cbiAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgaWYgKHdpbmRvdzIuV2ViS2l0Q1NTTWF0cml4KSBjdXJUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1NYXRyaXgubTQxO1xuICAgIGVsc2UgaWYgKG1hdHJpeC5sZW5ndGggPT09IDE2KSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFsxMl0pO1xuICAgIGVsc2UgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbNF0pO1xuICB9XG4gIGlmIChheGlzID09PSBcInlcIikge1xuICAgIGlmICh3aW5kb3cyLldlYktpdENTU01hdHJpeCkgY3VyVHJhbnNmb3JtID0gdHJhbnNmb3JtTWF0cml4Lm00MjtcbiAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNikgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTNdKTtcbiAgICBlbHNlIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzVdKTtcbiAgfVxuICByZXR1cm4gY3VyVHJhbnNmb3JtIHx8IDA7XG59XG5mdW5jdGlvbiBpc09iamVjdDIobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09IFwib2JqZWN0XCIgJiYgbyAhPT0gbnVsbCAmJiBvLmNvbnN0cnVjdG9yICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSkgPT09IFwiT2JqZWN0XCI7XG59XG5mdW5jdGlvbiBpc05vZGUobm9kZSkge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93LkhUTUxFbGVtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgfVxuICByZXR1cm4gbm9kZSAmJiAobm9kZS5ub2RlVHlwZSA9PT0gMSB8fCBub2RlLm5vZGVUeXBlID09PSAxMSk7XG59XG5mdW5jdGlvbiBleHRlbmQyKCkge1xuICBjb25zdCB0byA9IE9iamVjdChhcmd1bWVudHMubGVuZ3RoIDw9IDAgPyB2b2lkIDAgOiBhcmd1bWVudHNbMF0pO1xuICBjb25zdCBub0V4dGVuZCA9IFtcIl9fcHJvdG9fX1wiLCBcImNvbnN0cnVjdG9yXCIsIFwicHJvdG90eXBlXCJdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IG5leHRTb3VyY2UgPSBpIDwgMCB8fCBhcmd1bWVudHMubGVuZ3RoIDw9IGkgPyB2b2lkIDAgOiBhcmd1bWVudHNbaV07XG4gICAgaWYgKG5leHRTb3VyY2UgIT09IHZvaWQgMCAmJiBuZXh0U291cmNlICE9PSBudWxsICYmICFpc05vZGUobmV4dFNvdXJjZSkpIHtcbiAgICAgIGNvbnN0IGtleXNBcnJheSA9IE9iamVjdC5rZXlzKE9iamVjdChuZXh0U291cmNlKSkuZmlsdGVyKChrZXkpID0+IG5vRXh0ZW5kLmluZGV4T2Yoa2V5KSA8IDApO1xuICAgICAgZm9yIChsZXQgbmV4dEluZGV4ID0gMCwgbGVuID0ga2V5c0FycmF5Lmxlbmd0aDsgbmV4dEluZGV4IDwgbGVuOyBuZXh0SW5kZXggKz0gMSkge1xuICAgICAgICBjb25zdCBuZXh0S2V5ID0ga2V5c0FycmF5W25leHRJbmRleF07XG4gICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuICAgICAgICBpZiAoZGVzYyAhPT0gdm9pZCAwICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICAgIGlmIChpc09iamVjdDIodG9bbmV4dEtleV0pICYmIGlzT2JqZWN0MihuZXh0U291cmNlW25leHRLZXldKSkge1xuICAgICAgICAgICAgaWYgKG5leHRTb3VyY2VbbmV4dEtleV0uX19zd2lwZXJfXykge1xuICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBleHRlbmQyKHRvW25leHRLZXldLCBuZXh0U291cmNlW25leHRLZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKCFpc09iamVjdDIodG9bbmV4dEtleV0pICYmIGlzT2JqZWN0MihuZXh0U291cmNlW25leHRLZXldKSkge1xuICAgICAgICAgICAgdG9bbmV4dEtleV0gPSB7fTtcbiAgICAgICAgICAgIGlmIChuZXh0U291cmNlW25leHRLZXldLl9fc3dpcGVyX18pIHtcbiAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXh0ZW5kMih0b1tuZXh0S2V5XSwgbmV4dFNvdXJjZVtuZXh0S2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvO1xufVxuZnVuY3Rpb24gc2V0Q1NTUHJvcGVydHkoZWwsIHZhck5hbWUsIHZhclZhbHVlKSB7XG4gIGVsLnN0eWxlLnNldFByb3BlcnR5KHZhck5hbWUsIHZhclZhbHVlKTtcbn1cbmZ1bmN0aW9uIGFuaW1hdGVDU1NNb2RlU2Nyb2xsKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgdGFyZ2V0UG9zaXRpb24sXG4gICAgc2lkZVxuICB9ID0gX3JlZjtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBjb25zdCBzdGFydFBvc2l0aW9uID0gLXN3aXBlci50cmFuc2xhdGU7XG4gIGxldCBzdGFydFRpbWUgPSBudWxsO1xuICBsZXQgdGltZTtcbiAgY29uc3QgZHVyYXRpb24gPSBzd2lwZXIucGFyYW1zLnNwZWVkO1xuICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnNjcm9sbFNuYXBUeXBlID0gXCJub25lXCI7XG4gIHdpbmRvdzIuY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3dpcGVyLmNzc01vZGVGcmFtZUlEKTtcbiAgY29uc3QgZGlyID0gdGFyZ2V0UG9zaXRpb24gPiBzdGFydFBvc2l0aW9uID8gXCJuZXh0XCIgOiBcInByZXZcIjtcbiAgY29uc3QgaXNPdXRPZkJvdW5kID0gKGN1cnJlbnQsIHRhcmdldCkgPT4ge1xuICAgIHJldHVybiBkaXIgPT09IFwibmV4dFwiICYmIGN1cnJlbnQgPj0gdGFyZ2V0IHx8IGRpciA9PT0gXCJwcmV2XCIgJiYgY3VycmVudCA8PSB0YXJnZXQ7XG4gIH07XG4gIGNvbnN0IGFuaW1hdGUgPSAoKSA9PiB7XG4gICAgdGltZSA9ICgvKiBAX19QVVJFX18gKi8gbmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgIGlmIChzdGFydFRpbWUgPT09IG51bGwpIHtcbiAgICAgIHN0YXJ0VGltZSA9IHRpbWU7XG4gICAgfVxuICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oKHRpbWUgLSBzdGFydFRpbWUpIC8gZHVyYXRpb24sIDEpLCAwKTtcbiAgICBjb25zdCBlYXNlUHJvZ3Jlc3MgPSAwLjUgLSBNYXRoLmNvcyhwcm9ncmVzcyAqIE1hdGguUEkpIC8gMjtcbiAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbiArIGVhc2VQcm9ncmVzcyAqICh0YXJnZXRQb3NpdGlvbiAtIHN0YXJ0UG9zaXRpb24pO1xuICAgIGlmIChpc091dE9mQm91bmQoY3VycmVudFBvc2l0aW9uLCB0YXJnZXRQb3NpdGlvbikpIHtcbiAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IHRhcmdldFBvc2l0aW9uO1xuICAgIH1cbiAgICBzd2lwZXIud3JhcHBlckVsLnNjcm9sbFRvKHtcbiAgICAgIFtzaWRlXTogY3VycmVudFBvc2l0aW9uXG4gICAgfSk7XG4gICAgaWYgKGlzT3V0T2ZCb3VuZChjdXJyZW50UG9zaXRpb24sIHRhcmdldFBvc2l0aW9uKSkge1xuICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnNjcm9sbFNuYXBUeXBlID0gXCJcIjtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLm92ZXJmbG93ID0gXCJcIjtcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zY3JvbGxUbyh7XG4gICAgICAgICAgW3NpZGVdOiBjdXJyZW50UG9zaXRpb25cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHdpbmRvdzIuY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3dpcGVyLmNzc01vZGVGcmFtZUlEKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpcGVyLmNzc01vZGVGcmFtZUlEID0gd2luZG93Mi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gIH07XG4gIGFuaW1hdGUoKTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRDaGlsZHJlbihlbGVtZW50LCBzZWxlY3Rvcikge1xuICBpZiAoc2VsZWN0b3IgPT09IHZvaWQgMCkge1xuICAgIHNlbGVjdG9yID0gXCJcIjtcbiAgfVxuICBjb25zdCBjaGlsZHJlbiA9IFsuLi5lbGVtZW50LmNoaWxkcmVuXTtcbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MU2xvdEVsZW1lbnQpIHtcbiAgICBjaGlsZHJlbi5wdXNoKC4uLmVsZW1lbnQuYXNzaWduZWRFbGVtZW50cygpKTtcbiAgfVxuICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHJldHVybiBjaGlsZHJlbi5maWx0ZXIoKGVsKSA9PiBlbC5tYXRjaGVzKHNlbGVjdG9yKSk7XG59XG5mdW5jdGlvbiBlbGVtZW50SXNDaGlsZE9mKGVsLCBwYXJlbnQpIHtcbiAgY29uc3QgaXNDaGlsZCA9IHBhcmVudC5jb250YWlucyhlbCk7XG4gIGlmICghaXNDaGlsZCAmJiBwYXJlbnQgaW5zdGFuY2VvZiBIVE1MU2xvdEVsZW1lbnQpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFsuLi5wYXJlbnQuYXNzaWduZWRFbGVtZW50cygpXTtcbiAgICByZXR1cm4gY2hpbGRyZW4uaW5jbHVkZXMoZWwpO1xuICB9XG4gIHJldHVybiBpc0NoaWxkO1xufVxuZnVuY3Rpb24gc2hvd1dhcm5pbmcodGV4dCkge1xuICB0cnkge1xuICAgIGNvbnNvbGUud2Fybih0ZXh0KTtcbiAgICByZXR1cm47XG4gIH0gY2F0Y2ggKGVycikge1xuICB9XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50Mih0YWcsIGNsYXNzZXMyKSB7XG4gIGlmIChjbGFzc2VzMiA9PT0gdm9pZCAwKSB7XG4gICAgY2xhc3NlczIgPSBbXTtcbiAgfVxuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgZWwuY2xhc3NMaXN0LmFkZCguLi5BcnJheS5pc0FycmF5KGNsYXNzZXMyKSA/IGNsYXNzZXMyIDogY2xhc3Nlc1RvVG9rZW5zKGNsYXNzZXMyKSk7XG4gIHJldHVybiBlbDtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRPZmZzZXQoZWwpIHtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBjb25zdCBkb2N1bWVudDIgPSBnZXREb2N1bWVudCgpO1xuICBjb25zdCBib3ggPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50Mi5ib2R5O1xuICBjb25zdCBjbGllbnRUb3AgPSBlbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgY29uc3QgY2xpZW50TGVmdCA9IGVsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG4gIGNvbnN0IHNjcm9sbFRvcCA9IGVsID09PSB3aW5kb3cyID8gd2luZG93Mi5zY3JvbGxZIDogZWwuc2Nyb2xsVG9wO1xuICBjb25zdCBzY3JvbGxMZWZ0ID0gZWwgPT09IHdpbmRvdzIgPyB3aW5kb3cyLnNjcm9sbFggOiBlbC5zY3JvbGxMZWZ0O1xuICByZXR1cm4ge1xuICAgIHRvcDogYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcCxcbiAgICBsZWZ0OiBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0XG4gIH07XG59XG5mdW5jdGlvbiBlbGVtZW50UHJldkFsbChlbCwgc2VsZWN0b3IpIHtcbiAgY29uc3QgcHJldkVscyA9IFtdO1xuICB3aGlsZSAoZWwucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgIGNvbnN0IHByZXYgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgaWYgKHByZXYubWF0Y2hlcyhzZWxlY3RvcikpIHByZXZFbHMucHVzaChwcmV2KTtcbiAgICB9IGVsc2UgcHJldkVscy5wdXNoKHByZXYpO1xuICAgIGVsID0gcHJldjtcbiAgfVxuICByZXR1cm4gcHJldkVscztcbn1cbmZ1bmN0aW9uIGVsZW1lbnROZXh0QWxsKGVsLCBzZWxlY3Rvcikge1xuICBjb25zdCBuZXh0RWxzID0gW107XG4gIHdoaWxlIChlbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICBjb25zdCBuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgaWYgKG5leHQubWF0Y2hlcyhzZWxlY3RvcikpIG5leHRFbHMucHVzaChuZXh0KTtcbiAgICB9IGVsc2UgbmV4dEVscy5wdXNoKG5leHQpO1xuICAgIGVsID0gbmV4dDtcbiAgfVxuICByZXR1cm4gbmV4dEVscztcbn1cbmZ1bmN0aW9uIGVsZW1lbnRTdHlsZShlbCwgcHJvcCkge1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIHJldHVybiB3aW5kb3cyLmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUocHJvcCk7XG59XG5mdW5jdGlvbiBlbGVtZW50SW5kZXgoZWwpIHtcbiAgbGV0IGNoaWxkID0gZWw7XG4gIGxldCBpO1xuICBpZiAoY2hpbGQpIHtcbiAgICBpID0gMDtcbiAgICB3aGlsZSAoKGNoaWxkID0gY2hpbGQucHJldmlvdXNTaWJsaW5nKSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAxKSBpICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBpO1xuICB9XG4gIHJldHVybiB2b2lkIDA7XG59XG5mdW5jdGlvbiBlbGVtZW50UGFyZW50cyhlbCwgc2VsZWN0b3IpIHtcbiAgY29uc3QgcGFyZW50cyA9IFtdO1xuICBsZXQgcGFyZW50ID0gZWwucGFyZW50RWxlbWVudDtcbiAgd2hpbGUgKHBhcmVudCkge1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgaWYgKHBhcmVudC5tYXRjaGVzKHNlbGVjdG9yKSkgcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgIH1cbiAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gcGFyZW50cztcbn1cbmZ1bmN0aW9uIGVsZW1lbnRPdXRlclNpemUoZWwsIHNpemUsIGluY2x1ZGVNYXJnaW5zKSB7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgaWYgKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgcmV0dXJuIGVsW3NpemUgPT09IFwid2lkdGhcIiA/IFwib2Zmc2V0V2lkdGhcIiA6IFwib2Zmc2V0SGVpZ2h0XCJdICsgcGFyc2VGbG9hdCh3aW5kb3cyLmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc2l6ZSA9PT0gXCJ3aWR0aFwiID8gXCJtYXJnaW4tcmlnaHRcIiA6IFwibWFyZ2luLXRvcFwiKSkgKyBwYXJzZUZsb2F0KHdpbmRvdzIuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzaXplID09PSBcIndpZHRoXCIgPyBcIm1hcmdpbi1sZWZ0XCIgOiBcIm1hcmdpbi1ib3R0b21cIikpO1xuICB9XG4gIHJldHVybiBlbC5vZmZzZXRXaWR0aDtcbn1cbmZ1bmN0aW9uIG1ha2VFbGVtZW50c0FycmF5KGVsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheShlbCkgPyBlbCA6IFtlbF0pLmZpbHRlcigoZSkgPT4gISFlKTtcbn1cbnZhciBpbml0X3V0aWxzID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL3V0aWxzLm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL3N3aXBlci1jb3JlLm1qc1xuZnVuY3Rpb24gY2FsY1N1cHBvcnQoKSB7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgY29uc3QgZG9jdW1lbnQyID0gZ2V0RG9jdW1lbnQoKTtcbiAgcmV0dXJuIHtcbiAgICBzbW9vdGhTY3JvbGw6IGRvY3VtZW50Mi5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQyLmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBcInNjcm9sbEJlaGF2aW9yXCIgaW4gZG9jdW1lbnQyLmRvY3VtZW50RWxlbWVudC5zdHlsZSxcbiAgICB0b3VjaDogISEoXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3cyIHx8IHdpbmRvdzIuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudDIgaW5zdGFuY2VvZiB3aW5kb3cyLkRvY3VtZW50VG91Y2gpXG4gIH07XG59XG5mdW5jdGlvbiBnZXRTdXBwb3J0KCkge1xuICBpZiAoIXN1cHBvcnQpIHtcbiAgICBzdXBwb3J0ID0gY2FsY1N1cHBvcnQoKTtcbiAgfVxuICByZXR1cm4gc3VwcG9ydDtcbn1cbmZ1bmN0aW9uIGNhbGNEZXZpY2UoX3RlbXApIHtcbiAgbGV0IHtcbiAgICB1c2VyQWdlbnRcbiAgfSA9IF90ZW1wID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wO1xuICBjb25zdCBzdXBwb3J0MiA9IGdldFN1cHBvcnQoKTtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvdzIubmF2aWdhdG9yLnBsYXRmb3JtO1xuICBjb25zdCB1YSA9IHVzZXJBZ2VudCB8fCB3aW5kb3cyLm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIGNvbnN0IGRldmljZSA9IHtcbiAgICBpb3M6IGZhbHNlLFxuICAgIGFuZHJvaWQ6IGZhbHNlXG4gIH07XG4gIGNvbnN0IHNjcmVlbldpZHRoMiA9IHdpbmRvdzIuc2NyZWVuLndpZHRoO1xuICBjb25zdCBzY3JlZW5IZWlnaHQgPSB3aW5kb3cyLnNjcmVlbi5oZWlnaHQ7XG4gIGNvbnN0IGFuZHJvaWQgPSB1YS5tYXRjaCgvKEFuZHJvaWQpOz9bXFxzXFwvXSsoW1xcZC5dKyk/Lyk7XG4gIGxldCBpcGFkID0gdWEubWF0Y2goLyhpUGFkKS4qT1NcXHMoW1xcZF9dKykvKTtcbiAgY29uc3QgaXBvZCA9IHVhLm1hdGNoKC8oaVBvZCkoLipPU1xccyhbXFxkX10rKSk/Lyk7XG4gIGNvbnN0IGlwaG9uZSA9ICFpcGFkICYmIHVhLm1hdGNoKC8oaVBob25lXFxzT1N8aU9TKVxccyhbXFxkX10rKS8pO1xuICBjb25zdCB3aW5kb3dzID0gcGxhdGZvcm0gPT09IFwiV2luMzJcIjtcbiAgbGV0IG1hY29zID0gcGxhdGZvcm0gPT09IFwiTWFjSW50ZWxcIjtcbiAgY29uc3QgaVBhZFNjcmVlbnMgPSBbXCIxMDI0eDEzNjZcIiwgXCIxMzY2eDEwMjRcIiwgXCI4MzR4MTE5NFwiLCBcIjExOTR4ODM0XCIsIFwiODM0eDExMTJcIiwgXCIxMTEyeDgzNFwiLCBcIjc2OHgxMDI0XCIsIFwiMTAyNHg3NjhcIiwgXCI4MjB4MTE4MFwiLCBcIjExODB4ODIwXCIsIFwiODEweDEwODBcIiwgXCIxMDgweDgxMFwiXTtcbiAgaWYgKCFpcGFkICYmIG1hY29zICYmIHN1cHBvcnQyLnRvdWNoICYmIGlQYWRTY3JlZW5zLmluZGV4T2YoYCR7c2NyZWVuV2lkdGgyfXgke3NjcmVlbkhlaWdodH1gKSA+PSAwKSB7XG4gICAgaXBhZCA9IHVhLm1hdGNoKC8oVmVyc2lvbilcXC8oW1xcZC5dKykvKTtcbiAgICBpZiAoIWlwYWQpIGlwYWQgPSBbMCwgMSwgXCIxM18wXzBcIl07XG4gICAgbWFjb3MgPSBmYWxzZTtcbiAgfVxuICBpZiAoYW5kcm9pZCAmJiAhd2luZG93cykge1xuICAgIGRldmljZS5vcyA9IFwiYW5kcm9pZFwiO1xuICAgIGRldmljZS5hbmRyb2lkID0gdHJ1ZTtcbiAgfVxuICBpZiAoaXBhZCB8fCBpcGhvbmUgfHwgaXBvZCkge1xuICAgIGRldmljZS5vcyA9IFwiaW9zXCI7XG4gICAgZGV2aWNlLmlvcyA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGRldmljZTtcbn1cbmZ1bmN0aW9uIGdldERldmljZShvdmVycmlkZXMpIHtcbiAgaWYgKG92ZXJyaWRlcyA9PT0gdm9pZCAwKSB7XG4gICAgb3ZlcnJpZGVzID0ge307XG4gIH1cbiAgaWYgKCFkZXZpY2VDYWNoZWQpIHtcbiAgICBkZXZpY2VDYWNoZWQgPSBjYWxjRGV2aWNlKG92ZXJyaWRlcyk7XG4gIH1cbiAgcmV0dXJuIGRldmljZUNhY2hlZDtcbn1cbmZ1bmN0aW9uIGNhbGNCcm93c2VyKCkge1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IGRldmljZSA9IGdldERldmljZSgpO1xuICBsZXQgbmVlZFBlcnNwZWN0aXZlRml4ID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGlzU2FmYXJpKCkge1xuICAgIGNvbnN0IHVhID0gd2luZG93Mi5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHVhLmluZGV4T2YoXCJzYWZhcmlcIikgPj0gMCAmJiB1YS5pbmRleE9mKFwiY2hyb21lXCIpIDwgMCAmJiB1YS5pbmRleE9mKFwiYW5kcm9pZFwiKSA8IDA7XG4gIH1cbiAgaWYgKGlzU2FmYXJpKCkpIHtcbiAgICBjb25zdCB1YSA9IFN0cmluZyh3aW5kb3cyLm5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGlmICh1YS5pbmNsdWRlcyhcIlZlcnNpb24vXCIpKSB7XG4gICAgICBjb25zdCBbbWFqb3IsIG1pbm9yXSA9IHVhLnNwbGl0KFwiVmVyc2lvbi9cIilbMV0uc3BsaXQoXCIgXCIpWzBdLnNwbGl0KFwiLlwiKS5tYXAoKG51bSkgPT4gTnVtYmVyKG51bSkpO1xuICAgICAgbmVlZFBlcnNwZWN0aXZlRml4ID0gbWFqb3IgPCAxNiB8fCBtYWpvciA9PT0gMTYgJiYgbWlub3IgPCAyO1xuICAgIH1cbiAgfVxuICBjb25zdCBpc1dlYlZpZXcgPSAvKGlQaG9uZXxpUG9kfGlQYWQpLipBcHBsZVdlYktpdCg/IS4qU2FmYXJpKS9pLnRlc3Qod2luZG93Mi5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgY29uc3QgaXNTYWZhcmlCcm93c2VyID0gaXNTYWZhcmkoKTtcbiAgY29uc3QgbmVlZDNkRml4ID0gaXNTYWZhcmlCcm93c2VyIHx8IGlzV2ViVmlldyAmJiBkZXZpY2UuaW9zO1xuICByZXR1cm4ge1xuICAgIGlzU2FmYXJpOiBuZWVkUGVyc3BlY3RpdmVGaXggfHwgaXNTYWZhcmlCcm93c2VyLFxuICAgIG5lZWRQZXJzcGVjdGl2ZUZpeCxcbiAgICBuZWVkM2RGaXgsXG4gICAgaXNXZWJWaWV3XG4gIH07XG59XG5mdW5jdGlvbiBnZXRCcm93c2VyKCkge1xuICBpZiAoIWJyb3dzZXIpIHtcbiAgICBicm93c2VyID0gY2FsY0Jyb3dzZXIoKTtcbiAgfVxuICByZXR1cm4gYnJvd3Nlcjtcbn1cbmZ1bmN0aW9uIFJlc2l6ZShfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIG9uLFxuICAgIGVtaXRcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgbGV0IG9ic2VydmVyID0gbnVsbDtcbiAgbGV0IGFuaW1hdGlvbkZyYW1lID0gbnVsbDtcbiAgY29uc3QgcmVzaXplSGFuZGxlciA9ICgpID0+IHtcbiAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHJldHVybjtcbiAgICBlbWl0KFwiYmVmb3JlUmVzaXplXCIpO1xuICAgIGVtaXQoXCJyZXNpemVcIik7XG4gIH07XG4gIGNvbnN0IGNyZWF0ZU9ic2VydmVyID0gKCkgPT4ge1xuICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuO1xuICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICBhbmltYXRpb25GcmFtZSA9IHdpbmRvdzIucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgIGhlaWdodFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBsZXQgbmV3V2lkdGggPSB3aWR0aDtcbiAgICAgICAgbGV0IG5ld0hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChfcmVmMikgPT4ge1xuICAgICAgICAgIGxldCB7XG4gICAgICAgICAgICBjb250ZW50Qm94U2l6ZSxcbiAgICAgICAgICAgIGNvbnRlbnRSZWN0LFxuICAgICAgICAgICAgdGFyZ2V0XG4gICAgICAgICAgfSA9IF9yZWYyO1xuICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBzd2lwZXIuZWwpIHJldHVybjtcbiAgICAgICAgICBuZXdXaWR0aCA9IGNvbnRlbnRSZWN0ID8gY29udGVudFJlY3Qud2lkdGggOiAoY29udGVudEJveFNpemVbMF0gfHwgY29udGVudEJveFNpemUpLmlubGluZVNpemU7XG4gICAgICAgICAgbmV3SGVpZ2h0ID0gY29udGVudFJlY3QgPyBjb250ZW50UmVjdC5oZWlnaHQgOiAoY29udGVudEJveFNpemVbMF0gfHwgY29udGVudEJveFNpemUpLmJsb2NrU2l6ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChuZXdXaWR0aCAhPT0gd2lkdGggfHwgbmV3SGVpZ2h0ICE9PSBoZWlnaHQpIHtcbiAgICAgICAgICByZXNpemVIYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIG9ic2VydmVyLm9ic2VydmUoc3dpcGVyLmVsKTtcbiAgfTtcbiAgY29uc3QgcmVtb3ZlT2JzZXJ2ZXIgPSAoKSA9PiB7XG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICB3aW5kb3cyLmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lKTtcbiAgICB9XG4gICAgaWYgKG9ic2VydmVyICYmIG9ic2VydmVyLnVub2JzZXJ2ZSAmJiBzd2lwZXIuZWwpIHtcbiAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShzd2lwZXIuZWwpO1xuICAgICAgb2JzZXJ2ZXIgPSBudWxsO1xuICAgIH1cbiAgfTtcbiAgY29uc3Qgb3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyID0gKCkgPT4ge1xuICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuO1xuICAgIGVtaXQoXCJvcmllbnRhdGlvbmNoYW5nZVwiKTtcbiAgfTtcbiAgb24oXCJpbml0XCIsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5yZXNpemVPYnNlcnZlciAmJiB0eXBlb2Ygd2luZG93Mi5SZXNpemVPYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgY3JlYXRlT2JzZXJ2ZXIoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luZG93Mi5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlc2l6ZUhhbmRsZXIpO1xuICAgIHdpbmRvdzIuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcik7XG4gIH0pO1xuICBvbihcImRlc3Ryb3lcIiwgKCkgPT4ge1xuICAgIHJlbW92ZU9ic2VydmVyKCk7XG4gICAgd2luZG93Mi5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlc2l6ZUhhbmRsZXIpO1xuICAgIHdpbmRvdzIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcik7XG4gIH0pO1xufVxuZnVuY3Rpb24gT2JzZXJ2ZXIoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBleHRlbmRQYXJhbXMsXG4gICAgb24sXG4gICAgZW1pdFxuICB9ID0gX3JlZjtcbiAgY29uc3Qgb2JzZXJ2ZXJzID0gW107XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgY29uc3QgYXR0YWNoID0gZnVuY3Rpb24odGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBPYnNlcnZlckZ1bmMgPSB3aW5kb3cyLk11dGF0aW9uT2JzZXJ2ZXIgfHwgd2luZG93Mi5XZWJraXRNdXRhdGlvbk9ic2VydmVyO1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE9ic2VydmVyRnVuYygobXV0YXRpb25zKSA9PiB7XG4gICAgICBpZiAoc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18pIHJldHVybjtcbiAgICAgIGlmIChtdXRhdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGVtaXQoXCJvYnNlcnZlclVwZGF0ZVwiLCBtdXRhdGlvbnNbMF0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvYnNlcnZlclVwZGF0ZSA9IGZ1bmN0aW9uIG9ic2VydmVyVXBkYXRlMigpIHtcbiAgICAgICAgZW1pdChcIm9ic2VydmVyVXBkYXRlXCIsIG11dGF0aW9uc1swXSk7XG4gICAgICB9O1xuICAgICAgaWYgKHdpbmRvdzIucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgIHdpbmRvdzIucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9ic2VydmVyVXBkYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdzIuc2V0VGltZW91dChvYnNlcnZlclVwZGF0ZSwgMCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHR5cGVvZiBvcHRpb25zLmF0dHJpYnV0ZXMgPT09IFwidW5kZWZpbmVkXCIgPyB0cnVlIDogb3B0aW9ucy5hdHRyaWJ1dGVzLFxuICAgICAgY2hpbGRMaXN0OiBzd2lwZXIuaXNFbGVtZW50IHx8ICh0eXBlb2Ygb3B0aW9ucy5jaGlsZExpc3QgPT09IFwidW5kZWZpbmVkXCIgPyB0cnVlIDogb3B0aW9ucykuY2hpbGRMaXN0LFxuICAgICAgY2hhcmFjdGVyRGF0YTogdHlwZW9mIG9wdGlvbnMuY2hhcmFjdGVyRGF0YSA9PT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBvcHRpb25zLmNoYXJhY3RlckRhdGFcbiAgICB9KTtcbiAgICBvYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gIH07XG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLm9ic2VydmVyKSByZXR1cm47XG4gICAgaWYgKHN3aXBlci5wYXJhbXMub2JzZXJ2ZVBhcmVudHMpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lclBhcmVudHMgPSBlbGVtZW50UGFyZW50cyhzd2lwZXIuaG9zdEVsKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGFpbmVyUGFyZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhdHRhY2goY29udGFpbmVyUGFyZW50c1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGF0dGFjaChzd2lwZXIuaG9zdEVsLCB7XG4gICAgICBjaGlsZExpc3Q6IHN3aXBlci5wYXJhbXMub2JzZXJ2ZVNsaWRlQ2hpbGRyZW5cbiAgICB9KTtcbiAgICBhdHRhY2goc3dpcGVyLndyYXBwZXJFbCwge1xuICAgICAgYXR0cmlidXRlczogZmFsc2VcbiAgICB9KTtcbiAgfTtcbiAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICBvYnNlcnZlcnMuZm9yRWFjaCgob2JzZXJ2ZXIpID0+IHtcbiAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcbiAgICBvYnNlcnZlcnMuc3BsaWNlKDAsIG9ic2VydmVycy5sZW5ndGgpO1xuICB9O1xuICBleHRlbmRQYXJhbXMoe1xuICAgIG9ic2VydmVyOiBmYWxzZSxcbiAgICBvYnNlcnZlUGFyZW50czogZmFsc2UsXG4gICAgb2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IGZhbHNlXG4gIH0pO1xuICBvbihcImluaXRcIiwgaW5pdCk7XG4gIG9uKFwiZGVzdHJveVwiLCBkZXN0cm95KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVNpemUoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGxldCB3aWR0aDtcbiAgbGV0IGhlaWdodDtcbiAgY29uc3QgZWwgPSBzd2lwZXIuZWw7XG4gIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcy53aWR0aCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzd2lwZXIucGFyYW1zLndpZHRoICE9PSBudWxsKSB7XG4gICAgd2lkdGggPSBzd2lwZXIucGFyYW1zLndpZHRoO1xuICB9IGVsc2Uge1xuICAgIHdpZHRoID0gZWwuY2xpZW50V2lkdGg7XG4gIH1cbiAgaWYgKHR5cGVvZiBzd2lwZXIucGFyYW1zLmhlaWdodCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzd2lwZXIucGFyYW1zLmhlaWdodCAhPT0gbnVsbCkge1xuICAgIGhlaWdodCA9IHN3aXBlci5wYXJhbXMuaGVpZ2h0O1xuICB9IGVsc2Uge1xuICAgIGhlaWdodCA9IGVsLmNsaWVudEhlaWdodDtcbiAgfVxuICBpZiAod2lkdGggPT09IDAgJiYgc3dpcGVyLmlzSG9yaXpvbnRhbCgpIHx8IGhlaWdodCA9PT0gMCAmJiBzd2lwZXIuaXNWZXJ0aWNhbCgpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHdpZHRoID0gd2lkdGggLSBwYXJzZUludChlbGVtZW50U3R5bGUoZWwsIFwicGFkZGluZy1sZWZ0XCIpIHx8IDAsIDEwKSAtIHBhcnNlSW50KGVsZW1lbnRTdHlsZShlbCwgXCJwYWRkaW5nLXJpZ2h0XCIpIHx8IDAsIDEwKTtcbiAgaGVpZ2h0ID0gaGVpZ2h0IC0gcGFyc2VJbnQoZWxlbWVudFN0eWxlKGVsLCBcInBhZGRpbmctdG9wXCIpIHx8IDAsIDEwKSAtIHBhcnNlSW50KGVsZW1lbnRTdHlsZShlbCwgXCJwYWRkaW5nLWJvdHRvbVwiKSB8fCAwLCAxMCk7XG4gIGlmIChOdW1iZXIuaXNOYU4od2lkdGgpKSB3aWR0aCA9IDA7XG4gIGlmIChOdW1iZXIuaXNOYU4oaGVpZ2h0KSkgaGVpZ2h0ID0gMDtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgc2l6ZTogc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gd2lkdGggOiBoZWlnaHRcbiAgfSk7XG59XG5mdW5jdGlvbiB1cGRhdGVTbGlkZXMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGZ1bmN0aW9uIGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUobm9kZSwgbGFiZWwpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChub2RlLmdldFByb3BlcnR5VmFsdWUoc3dpcGVyLmdldERpcmVjdGlvbkxhYmVsKGxhYmVsKSkgfHwgMCk7XG4gIH1cbiAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgY29uc3Qge1xuICAgIHdyYXBwZXJFbCxcbiAgICBzbGlkZXNFbCxcbiAgICBzaXplOiBzd2lwZXJTaXplLFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHdyb25nUlRMXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIGNvbnN0IHByZXZpb3VzU2xpZGVzTGVuZ3RoID0gaXNWaXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICBjb25zdCBzbGlkZXMgPSBlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKTtcbiAgY29uc3Qgc2xpZGVzTGVuZ3RoID0gaXNWaXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHNsaWRlcy5sZW5ndGg7XG4gIGxldCBzbmFwR3JpZCA9IFtdO1xuICBjb25zdCBzbGlkZXNHcmlkID0gW107XG4gIGNvbnN0IHNsaWRlc1NpemVzR3JpZCA9IFtdO1xuICBsZXQgb2Zmc2V0QmVmb3JlID0gcGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZTtcbiAgaWYgKHR5cGVvZiBvZmZzZXRCZWZvcmUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIG9mZnNldEJlZm9yZSA9IHBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmUuY2FsbChzd2lwZXIpO1xuICB9XG4gIGxldCBvZmZzZXRBZnRlciA9IHBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlcjtcbiAgaWYgKHR5cGVvZiBvZmZzZXRBZnRlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgb2Zmc2V0QWZ0ZXIgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QWZ0ZXIuY2FsbChzd2lwZXIpO1xuICB9XG4gIGNvbnN0IHByZXZpb3VzU25hcEdyaWRMZW5ndGggPSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoO1xuICBjb25zdCBwcmV2aW91c1NsaWRlc0dyaWRMZW5ndGggPSBzd2lwZXIuc2xpZGVzR3JpZC5sZW5ndGg7XG4gIGxldCBzcGFjZUJldHdlZW4gPSBwYXJhbXMuc3BhY2VCZXR3ZWVuO1xuICBsZXQgc2xpZGVQb3NpdGlvbiA9IC1vZmZzZXRCZWZvcmU7XG4gIGxldCBwcmV2U2xpZGVTaXplID0gMDtcbiAgbGV0IGluZGV4ID0gMDtcbiAgaWYgKHR5cGVvZiBzd2lwZXJTaXplID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2Ygc3BhY2VCZXR3ZWVuID09PSBcInN0cmluZ1wiICYmIHNwYWNlQmV0d2Vlbi5pbmRleE9mKFwiJVwiKSA+PSAwKSB7XG4gICAgc3BhY2VCZXR3ZWVuID0gcGFyc2VGbG9hdChzcGFjZUJldHdlZW4ucmVwbGFjZShcIiVcIiwgXCJcIikpIC8gMTAwICogc3dpcGVyU2l6ZTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc3BhY2VCZXR3ZWVuID09PSBcInN0cmluZ1wiKSB7XG4gICAgc3BhY2VCZXR3ZWVuID0gcGFyc2VGbG9hdChzcGFjZUJldHdlZW4pO1xuICB9XG4gIHN3aXBlci52aXJ0dWFsU2l6ZSA9IC1zcGFjZUJldHdlZW47XG4gIHNsaWRlcy5mb3JFYWNoKChzbGlkZUVsKSA9PiB7XG4gICAgaWYgKHJ0bCkge1xuICAgICAgc2xpZGVFbC5zdHlsZS5tYXJnaW5MZWZ0ID0gXCJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVFbC5zdHlsZS5tYXJnaW5SaWdodCA9IFwiXCI7XG4gICAgfVxuICAgIHNsaWRlRWwuc3R5bGUubWFyZ2luQm90dG9tID0gXCJcIjtcbiAgICBzbGlkZUVsLnN0eWxlLm1hcmdpblRvcCA9IFwiXCI7XG4gIH0pO1xuICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgc2V0Q1NTUHJvcGVydHkod3JhcHBlckVsLCBcIi0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1iZWZvcmVcIiwgXCJcIik7XG4gICAgc2V0Q1NTUHJvcGVydHkod3JhcHBlckVsLCBcIi0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1hZnRlclwiLCBcIlwiKTtcbiAgfVxuICBjb25zdCBncmlkRW5hYmxlZCA9IHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxICYmIHN3aXBlci5ncmlkO1xuICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICBzd2lwZXIuZ3JpZC5pbml0U2xpZGVzKHNsaWRlcyk7XG4gIH0gZWxzZSBpZiAoc3dpcGVyLmdyaWQpIHtcbiAgICBzd2lwZXIuZ3JpZC51bnNldFNsaWRlcygpO1xuICB9XG4gIGxldCBzbGlkZVNpemU7XG4gIGNvbnN0IHNob3VsZFJlc2V0U2xpZGVTaXplID0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiICYmIHBhcmFtcy5icmVha3BvaW50cyAmJiBPYmplY3Qua2V5cyhwYXJhbXMuYnJlYWtwb2ludHMpLmZpbHRlcigoa2V5KSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBwYXJhbXMuYnJlYWtwb2ludHNba2V5XS5zbGlkZXNQZXJWaWV3ICE9PSBcInVuZGVmaW5lZFwiO1xuICB9KS5sZW5ndGggPiAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0xlbmd0aDsgaSArPSAxKSB7XG4gICAgc2xpZGVTaXplID0gMDtcbiAgICBsZXQgc2xpZGUyO1xuICAgIGlmIChzbGlkZXNbaV0pIHNsaWRlMiA9IHNsaWRlc1tpXTtcbiAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgIHN3aXBlci5ncmlkLnVwZGF0ZVNsaWRlKGksIHNsaWRlMiwgc2xpZGVzKTtcbiAgICB9XG4gICAgaWYgKHNsaWRlc1tpXSAmJiBlbGVtZW50U3R5bGUoc2xpZGUyLCBcImRpc3BsYXlcIikgPT09IFwibm9uZVwiKSBjb250aW51ZTtcbiAgICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiKSB7XG4gICAgICBpZiAoc2hvdWxkUmVzZXRTbGlkZVNpemUpIHtcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlW3N3aXBlci5nZXREaXJlY3Rpb25MYWJlbChcIndpZHRoXCIpXSA9IGBgO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2xpZGVTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKHNsaWRlMik7XG4gICAgICBjb25zdCBjdXJyZW50VHJhbnNmb3JtID0gc2xpZGUyLnN0eWxlLnRyYW5zZm9ybTtcbiAgICAgIGNvbnN0IGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm0gPSBzbGlkZTIuc3R5bGUud2Via2l0VHJhbnNmb3JtO1xuICAgICAgaWYgKGN1cnJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgc2xpZGUyLnN0eWxlLnRyYW5zZm9ybSA9IFwibm9uZVwiO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm0pIHtcbiAgICAgICAgc2xpZGUyLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwibm9uZVwiO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHtcbiAgICAgICAgc2xpZGVTaXplID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gZWxlbWVudE91dGVyU2l6ZShzbGlkZTIsIFwid2lkdGhcIiwgdHJ1ZSkgOiBlbGVtZW50T3V0ZXJTaXplKHNsaWRlMiwgXCJoZWlnaHRcIiwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB3aWR0aCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsIFwid2lkdGhcIik7XG4gICAgICAgIGNvbnN0IHBhZGRpbmdMZWZ0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgXCJwYWRkaW5nLWxlZnRcIik7XG4gICAgICAgIGNvbnN0IHBhZGRpbmdSaWdodCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsIFwicGFkZGluZy1yaWdodFwiKTtcbiAgICAgICAgY29uc3QgbWFyZ2luTGVmdCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsIFwibWFyZ2luLWxlZnRcIik7XG4gICAgICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgXCJtYXJnaW4tcmlnaHRcIik7XG4gICAgICAgIGNvbnN0IGJveFNpemluZyA9IHNsaWRlU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJib3gtc2l6aW5nXCIpO1xuICAgICAgICBpZiAoYm94U2l6aW5nICYmIGJveFNpemluZyA9PT0gXCJib3JkZXItYm94XCIpIHtcbiAgICAgICAgICBzbGlkZVNpemUgPSB3aWR0aCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBjbGllbnRXaWR0aCxcbiAgICAgICAgICAgIG9mZnNldFdpZHRoXG4gICAgICAgICAgfSA9IHNsaWRlMjtcbiAgICAgICAgICBzbGlkZVNpemUgPSB3aWR0aCArIHBhZGRpbmdMZWZ0ICsgcGFkZGluZ1JpZ2h0ICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0ICsgKG9mZnNldFdpZHRoIC0gY2xpZW50V2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFRyYW5zZm9ybSkge1xuICAgICAgICBzbGlkZTIuc3R5bGUudHJhbnNmb3JtID0gY3VycmVudFRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50V2ViS2l0VHJhbnNmb3JtKSB7XG4gICAgICAgIHNsaWRlMi5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBjdXJyZW50V2ViS2l0VHJhbnNmb3JtO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlU2l6ZSA9IE1hdGguZmxvb3Ioc2xpZGVTaXplKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVTaXplID0gKHN3aXBlclNpemUgLSAocGFyYW1zLnNsaWRlc1BlclZpZXcgLSAxKSAqIHNwYWNlQmV0d2VlbikgLyBwYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVNpemUgPSBNYXRoLmZsb29yKHNsaWRlU2l6ZSk7XG4gICAgICBpZiAoc2xpZGVzW2ldKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZVtzd2lwZXIuZ2V0RGlyZWN0aW9uTGFiZWwoXCJ3aWR0aFwiKV0gPSBgJHtzbGlkZVNpemV9cHhgO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2xpZGVzW2ldKSB7XG4gICAgICBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplID0gc2xpZGVTaXplO1xuICAgIH1cbiAgICBzbGlkZXNTaXplc0dyaWQucHVzaChzbGlkZVNpemUpO1xuICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uICsgc2xpZGVTaXplIC8gMiArIHByZXZTbGlkZVNpemUgLyAyICsgc3BhY2VCZXR3ZWVuO1xuICAgICAgaWYgKHByZXZTbGlkZVNpemUgPT09IDAgJiYgaSAhPT0gMCkgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gLSBzd2lwZXJTaXplIC8gMiAtIHNwYWNlQmV0d2VlbjtcbiAgICAgIGlmIChpID09PSAwKSBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiAtIHN3aXBlclNpemUgLyAyIC0gc3BhY2VCZXR3ZWVuO1xuICAgICAgaWYgKE1hdGguYWJzKHNsaWRlUG9zaXRpb24pIDwgMSAvIDFlMykgc2xpZGVQb3NpdGlvbiA9IDA7XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVQb3NpdGlvbiA9IE1hdGguZmxvb3Ioc2xpZGVQb3NpdGlvbik7XG4gICAgICBpZiAoaW5kZXggJSBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDApIHNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICBzbGlkZXNHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVBvc2l0aW9uID0gTWF0aC5mbG9vcihzbGlkZVBvc2l0aW9uKTtcbiAgICAgIGlmICgoaW5kZXggLSBNYXRoLm1pbihzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgaW5kZXgpKSAlIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDApIHNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICBzbGlkZXNHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiArIHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcbiAgICB9XG4gICAgc3dpcGVyLnZpcnR1YWxTaXplICs9IHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcbiAgICBwcmV2U2xpZGVTaXplID0gc2xpZGVTaXplO1xuICAgIGluZGV4ICs9IDE7XG4gIH1cbiAgc3dpcGVyLnZpcnR1YWxTaXplID0gTWF0aC5tYXgoc3dpcGVyLnZpcnR1YWxTaXplLCBzd2lwZXJTaXplKSArIG9mZnNldEFmdGVyO1xuICBpZiAocnRsICYmIHdyb25nUlRMICYmIChwYXJhbXMuZWZmZWN0ID09PSBcInNsaWRlXCIgfHwgcGFyYW1zLmVmZmVjdCA9PT0gXCJjb3ZlcmZsb3dcIikpIHtcbiAgICB3cmFwcGVyRWwuc3R5bGUud2lkdGggPSBgJHtzd2lwZXIudmlydHVhbFNpemUgKyBzcGFjZUJldHdlZW59cHhgO1xuICB9XG4gIGlmIChwYXJhbXMuc2V0V3JhcHBlclNpemUpIHtcbiAgICB3cmFwcGVyRWwuc3R5bGVbc3dpcGVyLmdldERpcmVjdGlvbkxhYmVsKFwid2lkdGhcIildID0gYCR7c3dpcGVyLnZpcnR1YWxTaXplICsgc3BhY2VCZXR3ZWVufXB4YDtcbiAgfVxuICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICBzd2lwZXIuZ3JpZC51cGRhdGVXcmFwcGVyU2l6ZShzbGlkZVNpemUsIHNuYXBHcmlkKTtcbiAgfVxuICBpZiAoIXBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgIGNvbnN0IG5ld1NsaWRlc0dyaWQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNuYXBHcmlkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBsZXQgc2xpZGVzR3JpZEl0ZW0gPSBzbmFwR3JpZFtpXTtcbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZXNHcmlkSXRlbSA9IE1hdGguZmxvb3Ioc2xpZGVzR3JpZEl0ZW0pO1xuICAgICAgaWYgKHNuYXBHcmlkW2ldIDw9IHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIHtcbiAgICAgICAgbmV3U2xpZGVzR3JpZC5wdXNoKHNsaWRlc0dyaWRJdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc25hcEdyaWQgPSBuZXdTbGlkZXNHcmlkO1xuICAgIGlmIChNYXRoLmZsb29yKHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIC0gTWF0aC5mbG9vcihzbmFwR3JpZFtzbmFwR3JpZC5sZW5ndGggLSAxXSkgPiAxKSB7XG4gICAgICBzbmFwR3JpZC5wdXNoKHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNWaXJ0dWFsICYmIHBhcmFtcy5sb29wKSB7XG4gICAgY29uc3Qgc2l6ZSA9IHNsaWRlc1NpemVzR3JpZFswXSArIHNwYWNlQmV0d2VlbjtcbiAgICBpZiAocGFyYW1zLnNsaWRlc1Blckdyb3VwID4gMSkge1xuICAgICAgY29uc3QgZ3JvdXBzID0gTWF0aC5jZWlsKChzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmUgKyBzd2lwZXIudmlydHVhbC5zbGlkZXNBZnRlcikgLyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgY29uc3QgZ3JvdXBTaXplID0gc2l6ZSAqIHBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBzOyBpICs9IDEpIHtcbiAgICAgICAgc25hcEdyaWQucHVzaChzbmFwR3JpZFtzbmFwR3JpZC5sZW5ndGggLSAxXSArIGdyb3VwU2l6ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlICsgc3dpcGVyLnZpcnR1YWwuc2xpZGVzQWZ0ZXI7IGkgKz0gMSkge1xuICAgICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMSkge1xuICAgICAgICBzbmFwR3JpZC5wdXNoKHNuYXBHcmlkW3NuYXBHcmlkLmxlbmd0aCAtIDFdICsgc2l6ZSk7XG4gICAgICB9XG4gICAgICBzbGlkZXNHcmlkLnB1c2goc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDFdICsgc2l6ZSk7XG4gICAgICBzd2lwZXIudmlydHVhbFNpemUgKz0gc2l6ZTtcbiAgICB9XG4gIH1cbiAgaWYgKHNuYXBHcmlkLmxlbmd0aCA9PT0gMCkgc25hcEdyaWQgPSBbMF07XG4gIGlmIChzcGFjZUJldHdlZW4gIT09IDApIHtcbiAgICBjb25zdCBrZXkgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYgcnRsID8gXCJtYXJnaW5MZWZ0XCIgOiBzd2lwZXIuZ2V0RGlyZWN0aW9uTGFiZWwoXCJtYXJnaW5SaWdodFwiKTtcbiAgICBzbGlkZXMuZmlsdGVyKChfLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICBpZiAoIXBhcmFtcy5jc3NNb2RlIHx8IHBhcmFtcy5sb29wKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmIChzbGlkZUluZGV4ID09PSBzbGlkZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KS5mb3JFYWNoKChzbGlkZUVsKSA9PiB7XG4gICAgICBzbGlkZUVsLnN0eWxlW2tleV0gPSBgJHtzcGFjZUJldHdlZW59cHhgO1xuICAgIH0pO1xuICB9XG4gIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgcGFyYW1zLmNlbnRlcmVkU2xpZGVzQm91bmRzKSB7XG4gICAgbGV0IGFsbFNsaWRlc1NpemUgPSAwO1xuICAgIHNsaWRlc1NpemVzR3JpZC5mb3JFYWNoKChzbGlkZVNpemVWYWx1ZSkgPT4ge1xuICAgICAgYWxsU2xpZGVzU2l6ZSArPSBzbGlkZVNpemVWYWx1ZSArIChzcGFjZUJldHdlZW4gfHwgMCk7XG4gICAgfSk7XG4gICAgYWxsU2xpZGVzU2l6ZSAtPSBzcGFjZUJldHdlZW47XG4gICAgY29uc3QgbWF4U25hcCA9IGFsbFNsaWRlc1NpemUgPiBzd2lwZXJTaXplID8gYWxsU2xpZGVzU2l6ZSAtIHN3aXBlclNpemUgOiAwO1xuICAgIHNuYXBHcmlkID0gc25hcEdyaWQubWFwKChzbmFwKSA9PiB7XG4gICAgICBpZiAoc25hcCA8PSAwKSByZXR1cm4gLW9mZnNldEJlZm9yZTtcbiAgICAgIGlmIChzbmFwID4gbWF4U25hcCkgcmV0dXJuIG1heFNuYXAgKyBvZmZzZXRBZnRlcjtcbiAgICAgIHJldHVybiBzbmFwO1xuICAgIH0pO1xuICB9XG4gIGlmIChwYXJhbXMuY2VudGVySW5zdWZmaWNpZW50U2xpZGVzKSB7XG4gICAgbGV0IGFsbFNsaWRlc1NpemUgPSAwO1xuICAgIHNsaWRlc1NpemVzR3JpZC5mb3JFYWNoKChzbGlkZVNpemVWYWx1ZSkgPT4ge1xuICAgICAgYWxsU2xpZGVzU2l6ZSArPSBzbGlkZVNpemVWYWx1ZSArIChzcGFjZUJldHdlZW4gfHwgMCk7XG4gICAgfSk7XG4gICAgYWxsU2xpZGVzU2l6ZSAtPSBzcGFjZUJldHdlZW47XG4gICAgY29uc3Qgb2Zmc2V0U2l6ZSA9IChwYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlIHx8IDApICsgKHBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlciB8fCAwKTtcbiAgICBpZiAoYWxsU2xpZGVzU2l6ZSArIG9mZnNldFNpemUgPCBzd2lwZXJTaXplKSB7XG4gICAgICBjb25zdCBhbGxTbGlkZXNPZmZzZXQgPSAoc3dpcGVyU2l6ZSAtIGFsbFNsaWRlc1NpemUgLSBvZmZzZXRTaXplKSAvIDI7XG4gICAgICBzbmFwR3JpZC5mb3JFYWNoKChzbmFwLCBzbmFwSW5kZXgpID0+IHtcbiAgICAgICAgc25hcEdyaWRbc25hcEluZGV4XSA9IHNuYXAgLSBhbGxTbGlkZXNPZmZzZXQ7XG4gICAgICB9KTtcbiAgICAgIHNsaWRlc0dyaWQuZm9yRWFjaCgoc25hcCwgc25hcEluZGV4KSA9PiB7XG4gICAgICAgIHNsaWRlc0dyaWRbc25hcEluZGV4XSA9IHNuYXAgKyBhbGxTbGlkZXNPZmZzZXQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICBzbGlkZXMsXG4gICAgc25hcEdyaWQsXG4gICAgc2xpZGVzR3JpZCxcbiAgICBzbGlkZXNTaXplc0dyaWRcbiAgfSk7XG4gIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgcGFyYW1zLmNzc01vZGUgJiYgIXBhcmFtcy5jZW50ZXJlZFNsaWRlc0JvdW5kcykge1xuICAgIHNldENTU1Byb3BlcnR5KHdyYXBwZXJFbCwgXCItLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYmVmb3JlXCIsIGAkey1zbmFwR3JpZFswXX1weGApO1xuICAgIHNldENTU1Byb3BlcnR5KHdyYXBwZXJFbCwgXCItLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYWZ0ZXJcIiwgYCR7c3dpcGVyLnNpemUgLyAyIC0gc2xpZGVzU2l6ZXNHcmlkW3NsaWRlc1NpemVzR3JpZC5sZW5ndGggLSAxXSAvIDJ9cHhgKTtcbiAgICBjb25zdCBhZGRUb1NuYXBHcmlkID0gLXN3aXBlci5zbmFwR3JpZFswXTtcbiAgICBjb25zdCBhZGRUb1NsaWRlc0dyaWQgPSAtc3dpcGVyLnNsaWRlc0dyaWRbMF07XG4gICAgc3dpcGVyLnNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkLm1hcCgodikgPT4gdiArIGFkZFRvU25hcEdyaWQpO1xuICAgIHN3aXBlci5zbGlkZXNHcmlkID0gc3dpcGVyLnNsaWRlc0dyaWQubWFwKCh2KSA9PiB2ICsgYWRkVG9TbGlkZXNHcmlkKTtcbiAgfVxuICBpZiAoc2xpZGVzTGVuZ3RoICE9PSBwcmV2aW91c1NsaWRlc0xlbmd0aCkge1xuICAgIHN3aXBlci5lbWl0KFwic2xpZGVzTGVuZ3RoQ2hhbmdlXCIpO1xuICB9XG4gIGlmIChzbmFwR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU25hcEdyaWRMZW5ndGgpIHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93KSBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgIHN3aXBlci5lbWl0KFwic25hcEdyaWRMZW5ndGhDaGFuZ2VcIik7XG4gIH1cbiAgaWYgKHNsaWRlc0dyaWQubGVuZ3RoICE9PSBwcmV2aW91c1NsaWRlc0dyaWRMZW5ndGgpIHtcbiAgICBzd2lwZXIuZW1pdChcInNsaWRlc0dyaWRMZW5ndGhDaGFuZ2VcIik7XG4gIH1cbiAgaWYgKHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSB7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xuICB9XG4gIHN3aXBlci5lbWl0KFwic2xpZGVzVXBkYXRlZFwiKTtcbiAgaWYgKCFpc1ZpcnR1YWwgJiYgIXBhcmFtcy5jc3NNb2RlICYmIChwYXJhbXMuZWZmZWN0ID09PSBcInNsaWRlXCIgfHwgcGFyYW1zLmVmZmVjdCA9PT0gXCJmYWRlXCIpKSB7XG4gICAgY29uc3QgYmFja0ZhY2VIaWRkZW5DbGFzcyA9IGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWJhY2tmYWNlLWhpZGRlbmA7XG4gICAgY29uc3QgaGFzQ2xhc3NCYWNrZmFjZUNsYXNzQWRkZWQgPSBzd2lwZXIuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGJhY2tGYWNlSGlkZGVuQ2xhc3MpO1xuICAgIGlmIChzbGlkZXNMZW5ndGggPD0gcGFyYW1zLm1heEJhY2tmYWNlSGlkZGVuU2xpZGVzKSB7XG4gICAgICBpZiAoIWhhc0NsYXNzQmFja2ZhY2VDbGFzc0FkZGVkKSBzd2lwZXIuZWwuY2xhc3NMaXN0LmFkZChiYWNrRmFjZUhpZGRlbkNsYXNzKTtcbiAgICB9IGVsc2UgaWYgKGhhc0NsYXNzQmFja2ZhY2VDbGFzc0FkZGVkKSB7XG4gICAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LnJlbW92ZShiYWNrRmFjZUhpZGRlbkNsYXNzKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZUF1dG9IZWlnaHQoc3BlZWQpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgYWN0aXZlU2xpZGVzID0gW107XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBsZXQgbmV3SGVpZ2h0ID0gMDtcbiAgbGV0IGk7XG4gIGlmICh0eXBlb2Ygc3BlZWQgPT09IFwibnVtYmVyXCIpIHtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihzcGVlZCk7XG4gIH0gZWxzZSBpZiAoc3BlZWQgPT09IHRydWUpIHtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihzd2lwZXIucGFyYW1zLnNwZWVkKTtcbiAgfVxuICBjb25zdCBnZXRTbGlkZUJ5SW5kZXggPSAoaW5kZXgpID0+IHtcbiAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICByZXR1cm4gc3dpcGVyLnNsaWRlc1tzd2lwZXIuZ2V0U2xpZGVJbmRleEJ5RGF0YShpbmRleCldO1xuICAgIH1cbiAgICByZXR1cm4gc3dpcGVyLnNsaWRlc1tpbmRleF07XG4gIH07XG4gIGlmIChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09IFwiYXV0b1wiICYmIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpIHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgKHN3aXBlci52aXNpYmxlU2xpZGVzIHx8IFtdKS5mb3JFYWNoKChzbGlkZTIpID0+IHtcbiAgICAgICAgYWN0aXZlU2xpZGVzLnB1c2goc2xpZGUyKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5jZWlsKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyk7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleCArIGk7XG4gICAgICAgIGlmIChpbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoICYmICFpc1ZpcnR1YWwpIGJyZWFrO1xuICAgICAgICBhY3RpdmVTbGlkZXMucHVzaChnZXRTbGlkZUJ5SW5kZXgoaW5kZXgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWN0aXZlU2xpZGVzLnB1c2goZ2V0U2xpZGVCeUluZGV4KHN3aXBlci5hY3RpdmVJbmRleCkpO1xuICB9XG4gIGZvciAoaSA9IDA7IGkgPCBhY3RpdmVTbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAodHlwZW9mIGFjdGl2ZVNsaWRlc1tpXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gYWN0aXZlU2xpZGVzW2ldLm9mZnNldEhlaWdodDtcbiAgICAgIG5ld0hlaWdodCA9IGhlaWdodCA+IG5ld0hlaWdodCA/IGhlaWdodCA6IG5ld0hlaWdodDtcbiAgICB9XG4gIH1cbiAgaWYgKG5ld0hlaWdodCB8fCBuZXdIZWlnaHQgPT09IDApIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuaGVpZ2h0ID0gYCR7bmV3SGVpZ2h0fXB4YDtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVNsaWRlc09mZnNldCgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgY29uc3QgbWludXNPZmZzZXQgPSBzd2lwZXIuaXNFbGVtZW50ID8gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gc3dpcGVyLndyYXBwZXJFbC5vZmZzZXRMZWZ0IDogc3dpcGVyLndyYXBwZXJFbC5vZmZzZXRUb3AgOiAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHNsaWRlc1tpXS5zd2lwZXJTbGlkZU9mZnNldCA9IChzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBzbGlkZXNbaV0ub2Zmc2V0TGVmdCA6IHNsaWRlc1tpXS5vZmZzZXRUb3ApIC0gbWludXNPZmZzZXQgLSBzd2lwZXIuY3NzT3ZlcmZsb3dBZGp1c3RtZW50KCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZVNsaWRlc1Byb2dyZXNzKHRyYW5zbGF0ZTIpIHtcbiAgaWYgKHRyYW5zbGF0ZTIgPT09IHZvaWQgMCkge1xuICAgIHRyYW5zbGF0ZTIgPSB0aGlzICYmIHRoaXMudHJhbnNsYXRlIHx8IDA7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgY29uc3Qge1xuICAgIHNsaWRlcyxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICBzbmFwR3JpZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoc2xpZGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICBpZiAodHlwZW9mIHNsaWRlc1swXS5zd2lwZXJTbGlkZU9mZnNldCA9PT0gXCJ1bmRlZmluZWRcIikgc3dpcGVyLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xuICBsZXQgb2Zmc2V0Q2VudGVyID0gLXRyYW5zbGF0ZTI7XG4gIGlmIChydGwpIG9mZnNldENlbnRlciA9IHRyYW5zbGF0ZTI7XG4gIHN3aXBlci52aXNpYmxlU2xpZGVzSW5kZXhlcyA9IFtdO1xuICBzd2lwZXIudmlzaWJsZVNsaWRlcyA9IFtdO1xuICBsZXQgc3BhY2VCZXR3ZWVuID0gcGFyYW1zLnNwYWNlQmV0d2VlbjtcbiAgaWYgKHR5cGVvZiBzcGFjZUJldHdlZW4gPT09IFwic3RyaW5nXCIgJiYgc3BhY2VCZXR3ZWVuLmluZGV4T2YoXCIlXCIpID49IDApIHtcbiAgICBzcGFjZUJldHdlZW4gPSBwYXJzZUZsb2F0KHNwYWNlQmV0d2Vlbi5yZXBsYWNlKFwiJVwiLCBcIlwiKSkgLyAxMDAgKiBzd2lwZXIuc2l6ZTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc3BhY2VCZXR3ZWVuID09PSBcInN0cmluZ1wiKSB7XG4gICAgc3BhY2VCZXR3ZWVuID0gcGFyc2VGbG9hdChzcGFjZUJldHdlZW4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3Qgc2xpZGUyID0gc2xpZGVzW2ldO1xuICAgIGxldCBzbGlkZU9mZnNldCA9IHNsaWRlMi5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICBpZiAocGFyYW1zLmNzc01vZGUgJiYgcGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICBzbGlkZU9mZnNldCAtPSBzbGlkZXNbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgfVxuICAgIGNvbnN0IHNsaWRlUHJvZ3Jlc3MgPSAob2Zmc2V0Q2VudGVyICsgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5taW5UcmFuc2xhdGUoKSA6IDApIC0gc2xpZGVPZmZzZXQpIC8gKHNsaWRlMi5zd2lwZXJTbGlkZVNpemUgKyBzcGFjZUJldHdlZW4pO1xuICAgIGNvbnN0IG9yaWdpbmFsU2xpZGVQcm9ncmVzcyA9IChvZmZzZXRDZW50ZXIgLSBzbmFwR3JpZFswXSArIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWluVHJhbnNsYXRlKCkgOiAwKSAtIHNsaWRlT2Zmc2V0KSAvIChzbGlkZTIuc3dpcGVyU2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuKTtcbiAgICBjb25zdCBzbGlkZUJlZm9yZSA9IC0ob2Zmc2V0Q2VudGVyIC0gc2xpZGVPZmZzZXQpO1xuICAgIGNvbnN0IHNsaWRlQWZ0ZXIgPSBzbGlkZUJlZm9yZSArIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbaV07XG4gICAgY29uc3QgaXNGdWxseVZpc2libGUgPSBzbGlkZUJlZm9yZSA+PSAwICYmIHNsaWRlQmVmb3JlIDw9IHN3aXBlci5zaXplIC0gc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtpXTtcbiAgICBjb25zdCBpc1Zpc2libGUgPSBzbGlkZUJlZm9yZSA+PSAwICYmIHNsaWRlQmVmb3JlIDwgc3dpcGVyLnNpemUgLSAxIHx8IHNsaWRlQWZ0ZXIgPiAxICYmIHNsaWRlQWZ0ZXIgPD0gc3dpcGVyLnNpemUgfHwgc2xpZGVCZWZvcmUgPD0gMCAmJiBzbGlkZUFmdGVyID49IHN3aXBlci5zaXplO1xuICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgIHN3aXBlci52aXNpYmxlU2xpZGVzLnB1c2goc2xpZGUyKTtcbiAgICAgIHN3aXBlci52aXNpYmxlU2xpZGVzSW5kZXhlcy5wdXNoKGkpO1xuICAgIH1cbiAgICB0b2dnbGVTbGlkZUNsYXNzZXMkMShzbGlkZTIsIGlzVmlzaWJsZSwgcGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzKTtcbiAgICB0b2dnbGVTbGlkZUNsYXNzZXMkMShzbGlkZTIsIGlzRnVsbHlWaXNpYmxlLCBwYXJhbXMuc2xpZGVGdWxseVZpc2libGVDbGFzcyk7XG4gICAgc2xpZGUyLnByb2dyZXNzID0gcnRsID8gLXNsaWRlUHJvZ3Jlc3MgOiBzbGlkZVByb2dyZXNzO1xuICAgIHNsaWRlMi5vcmlnaW5hbFByb2dyZXNzID0gcnRsID8gLW9yaWdpbmFsU2xpZGVQcm9ncmVzcyA6IG9yaWdpbmFsU2xpZGVQcm9ncmVzcztcbiAgfVxufVxuZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlMikge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAodHlwZW9mIHRyYW5zbGF0ZTIgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjb25zdCBtdWx0aXBsaWVyID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IC0xIDogMTtcbiAgICB0cmFuc2xhdGUyID0gc3dpcGVyICYmIHN3aXBlci50cmFuc2xhdGUgJiYgc3dpcGVyLnRyYW5zbGF0ZSAqIG11bHRpcGxpZXIgfHwgMDtcbiAgfVxuICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICBjb25zdCB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgbGV0IHtcbiAgICBwcm9ncmVzcyxcbiAgICBpc0JlZ2lubmluZyxcbiAgICBpc0VuZCxcbiAgICBwcm9ncmVzc0xvb3BcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3Qgd2FzQmVnaW5uaW5nID0gaXNCZWdpbm5pbmc7XG4gIGNvbnN0IHdhc0VuZCA9IGlzRW5kO1xuICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICBwcm9ncmVzcyA9IDA7XG4gICAgaXNCZWdpbm5pbmcgPSB0cnVlO1xuICAgIGlzRW5kID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBwcm9ncmVzcyA9ICh0cmFuc2xhdGUyIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAvIHRyYW5zbGF0ZXNEaWZmO1xuICAgIGNvbnN0IGlzQmVnaW5uaW5nUm91bmRlZCA9IE1hdGguYWJzKHRyYW5zbGF0ZTIgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIDwgMTtcbiAgICBjb25zdCBpc0VuZFJvdW5kZWQgPSBNYXRoLmFicyh0cmFuc2xhdGUyIC0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSA8IDE7XG4gICAgaXNCZWdpbm5pbmcgPSBpc0JlZ2lubmluZ1JvdW5kZWQgfHwgcHJvZ3Jlc3MgPD0gMDtcbiAgICBpc0VuZCA9IGlzRW5kUm91bmRlZCB8fCBwcm9ncmVzcyA+PSAxO1xuICAgIGlmIChpc0JlZ2lubmluZ1JvdW5kZWQpIHByb2dyZXNzID0gMDtcbiAgICBpZiAoaXNFbmRSb3VuZGVkKSBwcm9ncmVzcyA9IDE7XG4gIH1cbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgY29uc3QgZmlyc3RTbGlkZUluZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXhCeURhdGEoMCk7XG4gICAgY29uc3QgbGFzdFNsaWRlSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleEJ5RGF0YShzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IGZpcnN0U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFtmaXJzdFNsaWRlSW5kZXhdO1xuICAgIGNvbnN0IGxhc3RTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2xhc3RTbGlkZUluZGV4XTtcbiAgICBjb25zdCB0cmFuc2xhdGVNYXggPSBzd2lwZXIuc2xpZGVzR3JpZFtzd2lwZXIuc2xpZGVzR3JpZC5sZW5ndGggLSAxXTtcbiAgICBjb25zdCB0cmFuc2xhdGVBYnMgPSBNYXRoLmFicyh0cmFuc2xhdGUyKTtcbiAgICBpZiAodHJhbnNsYXRlQWJzID49IGZpcnN0U2xpZGVUcmFuc2xhdGUpIHtcbiAgICAgIHByb2dyZXNzTG9vcCA9ICh0cmFuc2xhdGVBYnMgLSBmaXJzdFNsaWRlVHJhbnNsYXRlKSAvIHRyYW5zbGF0ZU1heDtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvZ3Jlc3NMb29wID0gKHRyYW5zbGF0ZUFicyArIHRyYW5zbGF0ZU1heCAtIGxhc3RTbGlkZVRyYW5zbGF0ZSkgLyB0cmFuc2xhdGVNYXg7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0xvb3AgPiAxKSBwcm9ncmVzc0xvb3AgLT0gMTtcbiAgfVxuICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgIHByb2dyZXNzLFxuICAgIHByb2dyZXNzTG9vcCxcbiAgICBpc0JlZ2lubmluZyxcbiAgICBpc0VuZFxuICB9KTtcbiAgaWYgKHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzIHx8IHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuYXV0b0hlaWdodCkgc3dpcGVyLnVwZGF0ZVNsaWRlc1Byb2dyZXNzKHRyYW5zbGF0ZTIpO1xuICBpZiAoaXNCZWdpbm5pbmcgJiYgIXdhc0JlZ2lubmluZykge1xuICAgIHN3aXBlci5lbWl0KFwicmVhY2hCZWdpbm5pbmcgdG9FZGdlXCIpO1xuICB9XG4gIGlmIChpc0VuZCAmJiAhd2FzRW5kKSB7XG4gICAgc3dpcGVyLmVtaXQoXCJyZWFjaEVuZCB0b0VkZ2VcIik7XG4gIH1cbiAgaWYgKHdhc0JlZ2lubmluZyAmJiAhaXNCZWdpbm5pbmcgfHwgd2FzRW5kICYmICFpc0VuZCkge1xuICAgIHN3aXBlci5lbWl0KFwiZnJvbUVkZ2VcIik7XG4gIH1cbiAgc3dpcGVyLmVtaXQoXCJwcm9ncmVzc1wiLCBwcm9ncmVzcyk7XG59XG5mdW5jdGlvbiB1cGRhdGVTbGlkZXNDbGFzc2VzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgc2xpZGVzLFxuICAgIHBhcmFtcyxcbiAgICBzbGlkZXNFbCxcbiAgICBhY3RpdmVJbmRleFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBjb25zdCBncmlkRW5hYmxlZCA9IHN3aXBlci5ncmlkICYmIHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuICBjb25zdCBnZXRGaWx0ZXJlZFNsaWRlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgcmV0dXJuIGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSR7c2VsZWN0b3J9LCBzd2lwZXItc2xpZGUke3NlbGVjdG9yfWApWzBdO1xuICB9O1xuICBsZXQgYWN0aXZlU2xpZGU7XG4gIGxldCBwcmV2U2xpZGU7XG4gIGxldCBuZXh0U2xpZGU7XG4gIGlmIChpc1ZpcnR1YWwpIHtcbiAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgIGxldCBzbGlkZUluZGV4ID0gYWN0aXZlSW5kZXggLSBzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmU7XG4gICAgICBpZiAoc2xpZGVJbmRleCA8IDApIHNsaWRlSW5kZXggPSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoICsgc2xpZGVJbmRleDtcbiAgICAgIGlmIChzbGlkZUluZGV4ID49IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGgpIHNsaWRlSW5kZXggLT0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aDtcbiAgICAgIGFjdGl2ZVNsaWRlID0gZ2V0RmlsdGVyZWRTbGlkZShgW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtzbGlkZUluZGV4fVwiXWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVTbGlkZSA9IGdldEZpbHRlcmVkU2xpZGUoYFtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7YWN0aXZlSW5kZXh9XCJdYCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZmlsdGVyKChzbGlkZUVsKSA9PiBzbGlkZUVsLmNvbHVtbiA9PT0gYWN0aXZlSW5kZXgpWzBdO1xuICAgICAgbmV4dFNsaWRlID0gc2xpZGVzLmZpbHRlcigoc2xpZGVFbCkgPT4gc2xpZGVFbC5jb2x1bW4gPT09IGFjdGl2ZUluZGV4ICsgMSlbMF07XG4gICAgICBwcmV2U2xpZGUgPSBzbGlkZXMuZmlsdGVyKChzbGlkZUVsKSA9PiBzbGlkZUVsLmNvbHVtbiA9PT0gYWN0aXZlSW5kZXggLSAxKVswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlU2xpZGUgPSBzbGlkZXNbYWN0aXZlSW5kZXhdO1xuICAgIH1cbiAgfVxuICBpZiAoYWN0aXZlU2xpZGUpIHtcbiAgICBpZiAoIWdyaWRFbmFibGVkKSB7XG4gICAgICBuZXh0U2xpZGUgPSBlbGVtZW50TmV4dEFsbChhY3RpdmVTbGlkZSwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYClbMF07XG4gICAgICBpZiAocGFyYW1zLmxvb3AgJiYgIW5leHRTbGlkZSkge1xuICAgICAgICBuZXh0U2xpZGUgPSBzbGlkZXNbMF07XG4gICAgICB9XG4gICAgICBwcmV2U2xpZGUgPSBlbGVtZW50UHJldkFsbChhY3RpdmVTbGlkZSwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYClbMF07XG4gICAgICBpZiAocGFyYW1zLmxvb3AgJiYgIXByZXZTbGlkZSA9PT0gMCkge1xuICAgICAgICBwcmV2U2xpZGUgPSBzbGlkZXNbc2xpZGVzLmxlbmd0aCAtIDFdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzbGlkZXMuZm9yRWFjaCgoc2xpZGVFbCkgPT4ge1xuICAgIHRvZ2dsZVNsaWRlQ2xhc3NlcyhzbGlkZUVsLCBzbGlkZUVsID09PSBhY3RpdmVTbGlkZSwgcGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpO1xuICAgIHRvZ2dsZVNsaWRlQ2xhc3NlcyhzbGlkZUVsLCBzbGlkZUVsID09PSBuZXh0U2xpZGUsIHBhcmFtcy5zbGlkZU5leHRDbGFzcyk7XG4gICAgdG9nZ2xlU2xpZGVDbGFzc2VzKHNsaWRlRWwsIHNsaWRlRWwgPT09IHByZXZTbGlkZSwgcGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgfSk7XG4gIHN3aXBlci5lbWl0U2xpZGVzQ2xhc3NlcygpO1xufVxuZnVuY3Rpb24gZ2V0QWN0aXZlSW5kZXhCeVRyYW5zbGF0ZShzd2lwZXIpIHtcbiAgY29uc3Qge1xuICAgIHNsaWRlc0dyaWQsXG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IHRyYW5zbGF0ZTIgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICBsZXQgYWN0aXZlSW5kZXg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICh0eXBlb2Ygc2xpZGVzR3JpZFtpICsgMV0gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmICh0cmFuc2xhdGUyID49IHNsaWRlc0dyaWRbaV0gJiYgdHJhbnNsYXRlMiA8IHNsaWRlc0dyaWRbaSArIDFdIC0gKHNsaWRlc0dyaWRbaSArIDFdIC0gc2xpZGVzR3JpZFtpXSkgLyAyKSB7XG4gICAgICAgIGFjdGl2ZUluZGV4ID0gaTtcbiAgICAgIH0gZWxzZSBpZiAodHJhbnNsYXRlMiA+PSBzbGlkZXNHcmlkW2ldICYmIHRyYW5zbGF0ZTIgPCBzbGlkZXNHcmlkW2kgKyAxXSkge1xuICAgICAgICBhY3RpdmVJbmRleCA9IGkgKyAxO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHJhbnNsYXRlMiA+PSBzbGlkZXNHcmlkW2ldKSB7XG4gICAgICBhY3RpdmVJbmRleCA9IGk7XG4gICAgfVxuICB9XG4gIGlmIChwYXJhbXMubm9ybWFsaXplU2xpZGVJbmRleCkge1xuICAgIGlmIChhY3RpdmVJbmRleCA8IDAgfHwgdHlwZW9mIGFjdGl2ZUluZGV4ID09PSBcInVuZGVmaW5lZFwiKSBhY3RpdmVJbmRleCA9IDA7XG4gIH1cbiAgcmV0dXJuIGFjdGl2ZUluZGV4O1xufVxuZnVuY3Rpb24gdXBkYXRlQWN0aXZlSW5kZXgobmV3QWN0aXZlSW5kZXgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgdHJhbnNsYXRlMiA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIGNvbnN0IHtcbiAgICBzbmFwR3JpZCxcbiAgICBwYXJhbXMsXG4gICAgYWN0aXZlSW5kZXg6IHByZXZpb3VzSW5kZXgsXG4gICAgcmVhbEluZGV4OiBwcmV2aW91c1JlYWxJbmRleCxcbiAgICBzbmFwSW5kZXg6IHByZXZpb3VzU25hcEluZGV4XG4gIH0gPSBzd2lwZXI7XG4gIGxldCBhY3RpdmVJbmRleCA9IG5ld0FjdGl2ZUluZGV4O1xuICBsZXQgc25hcEluZGV4O1xuICBjb25zdCBnZXRWaXJ0dWFsUmVhbEluZGV4ID0gKGFJbmRleCkgPT4ge1xuICAgIGxldCByZWFsSW5kZXgyID0gYUluZGV4IC0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlO1xuICAgIGlmIChyZWFsSW5kZXgyIDwgMCkge1xuICAgICAgcmVhbEluZGV4MiA9IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggKyByZWFsSW5kZXgyO1xuICAgIH1cbiAgICBpZiAocmVhbEluZGV4MiA+PSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICByZWFsSW5kZXgyIC09IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiByZWFsSW5kZXgyO1xuICB9O1xuICBpZiAodHlwZW9mIGFjdGl2ZUluZGV4ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgYWN0aXZlSW5kZXggPSBnZXRBY3RpdmVJbmRleEJ5VHJhbnNsYXRlKHN3aXBlcik7XG4gIH1cbiAgaWYgKHNuYXBHcmlkLmluZGV4T2YodHJhbnNsYXRlMikgPj0gMCkge1xuICAgIHNuYXBJbmRleCA9IHNuYXBHcmlkLmluZGV4T2YodHJhbnNsYXRlMik7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgc2tpcCA9IE1hdGgubWluKHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsIGFjdGl2ZUluZGV4KTtcbiAgICBzbmFwSW5kZXggPSBza2lwICsgTWF0aC5mbG9vcigoYWN0aXZlSW5kZXggLSBza2lwKSAvIHBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gIH1cbiAgaWYgKHNuYXBJbmRleCA+PSBzbmFwR3JpZC5sZW5ndGgpIHNuYXBJbmRleCA9IHNuYXBHcmlkLmxlbmd0aCAtIDE7XG4gIGlmIChhY3RpdmVJbmRleCA9PT0gcHJldmlvdXNJbmRleCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgaWYgKHNuYXBJbmRleCAhPT0gcHJldmlvdXNTbmFwSW5kZXgpIHtcbiAgICAgIHN3aXBlci5zbmFwSW5kZXggPSBzbmFwSW5kZXg7XG4gICAgICBzd2lwZXIuZW1pdChcInNuYXBJbmRleENoYW5nZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChhY3RpdmVJbmRleCA9PT0gcHJldmlvdXNJbmRleCAmJiBzd2lwZXIucGFyYW1zLmxvb3AgJiYgc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICBzd2lwZXIucmVhbEluZGV4ID0gZ2V0VmlydHVhbFJlYWxJbmRleChhY3RpdmVJbmRleCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gc3dpcGVyLmdyaWQgJiYgcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDE7XG4gIGxldCByZWFsSW5kZXg7XG4gIGlmIChzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkICYmIHBhcmFtcy5sb29wKSB7XG4gICAgcmVhbEluZGV4ID0gZ2V0VmlydHVhbFJlYWxJbmRleChhY3RpdmVJbmRleCk7XG4gIH0gZWxzZSBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICBjb25zdCBmaXJzdFNsaWRlSW5Db2x1bW4gPSBzd2lwZXIuc2xpZGVzLmZpbHRlcigoc2xpZGVFbCkgPT4gc2xpZGVFbC5jb2x1bW4gPT09IGFjdGl2ZUluZGV4KVswXTtcbiAgICBsZXQgYWN0aXZlU2xpZGVJbmRleCA9IHBhcnNlSW50KGZpcnN0U2xpZGVJbkNvbHVtbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSwgMTApO1xuICAgIGlmIChOdW1iZXIuaXNOYU4oYWN0aXZlU2xpZGVJbmRleCkpIHtcbiAgICAgIGFjdGl2ZVNsaWRlSW5kZXggPSBNYXRoLm1heChzd2lwZXIuc2xpZGVzLmluZGV4T2YoZmlyc3RTbGlkZUluQ29sdW1uKSwgMCk7XG4gICAgfVxuICAgIHJlYWxJbmRleCA9IE1hdGguZmxvb3IoYWN0aXZlU2xpZGVJbmRleCAvIHBhcmFtcy5ncmlkLnJvd3MpO1xuICB9IGVsc2UgaWYgKHN3aXBlci5zbGlkZXNbYWN0aXZlSW5kZXhdKSB7XG4gICAgY29uc3Qgc2xpZGVJbmRleCA9IHN3aXBlci5zbGlkZXNbYWN0aXZlSW5kZXhdLmdldEF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpO1xuICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICByZWFsSW5kZXggPSBwYXJzZUludChzbGlkZUluZGV4LCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlYWxJbmRleCA9IGFjdGl2ZUluZGV4O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZWFsSW5kZXggPSBhY3RpdmVJbmRleDtcbiAgfVxuICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgIHByZXZpb3VzU25hcEluZGV4LFxuICAgIHNuYXBJbmRleCxcbiAgICBwcmV2aW91c1JlYWxJbmRleCxcbiAgICByZWFsSW5kZXgsXG4gICAgcHJldmlvdXNJbmRleCxcbiAgICBhY3RpdmVJbmRleFxuICB9KTtcbiAgaWYgKHN3aXBlci5pbml0aWFsaXplZCkge1xuICAgIHByZWxvYWQoc3dpcGVyKTtcbiAgfVxuICBzd2lwZXIuZW1pdChcImFjdGl2ZUluZGV4Q2hhbmdlXCIpO1xuICBzd2lwZXIuZW1pdChcInNuYXBJbmRleENoYW5nZVwiKTtcbiAgaWYgKHN3aXBlci5pbml0aWFsaXplZCB8fCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCkge1xuICAgIGlmIChwcmV2aW91c1JlYWxJbmRleCAhPT0gcmVhbEluZGV4KSB7XG4gICAgICBzd2lwZXIuZW1pdChcInJlYWxJbmRleENoYW5nZVwiKTtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoXCJzbGlkZUNoYW5nZVwiKTtcbiAgfVxufVxuZnVuY3Rpb24gdXBkYXRlQ2xpY2tlZFNsaWRlKGVsLCBwYXRoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIGxldCBzbGlkZTIgPSBlbC5jbG9zZXN0KGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApO1xuICBpZiAoIXNsaWRlMiAmJiBzd2lwZXIuaXNFbGVtZW50ICYmIHBhdGggJiYgcGF0aC5sZW5ndGggPiAxICYmIHBhdGguaW5jbHVkZXMoZWwpKSB7XG4gICAgWy4uLnBhdGguc2xpY2UocGF0aC5pbmRleE9mKGVsKSArIDEsIHBhdGgubGVuZ3RoKV0uZm9yRWFjaCgocGF0aEVsKSA9PiB7XG4gICAgICBpZiAoIXNsaWRlMiAmJiBwYXRoRWwubWF0Y2hlcyAmJiBwYXRoRWwubWF0Y2hlcyhgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKSkge1xuICAgICAgICBzbGlkZTIgPSBwYXRoRWw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbGV0IHNsaWRlRm91bmQgPSBmYWxzZTtcbiAgbGV0IHNsaWRlSW5kZXg7XG4gIGlmIChzbGlkZTIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChzd2lwZXIuc2xpZGVzW2ldID09PSBzbGlkZTIpIHtcbiAgICAgICAgc2xpZGVGb3VuZCA9IHRydWU7XG4gICAgICAgIHNsaWRlSW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHNsaWRlMiAmJiBzbGlkZUZvdW5kKSB7XG4gICAgc3dpcGVyLmNsaWNrZWRTbGlkZSA9IHNsaWRlMjtcbiAgICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSBwYXJzZUludChzbGlkZTIuZ2V0QXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIiksIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9IHNsaWRlSW5kZXg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN3aXBlci5jbGlja2VkU2xpZGUgPSB2b2lkIDA7XG4gICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9IHZvaWQgMDtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHBhcmFtcy5zbGlkZVRvQ2xpY2tlZFNsaWRlICYmIHN3aXBlci5jbGlja2VkSW5kZXggIT09IHZvaWQgMCAmJiBzd2lwZXIuY2xpY2tlZEluZGV4ICE9PSBzd2lwZXIuYWN0aXZlSW5kZXgpIHtcbiAgICBzd2lwZXIuc2xpZGVUb0NsaWNrZWRTbGlkZSgpO1xuICB9XG59XG5mdW5jdGlvbiBnZXRTd2lwZXJUcmFuc2xhdGUoYXhpcykge1xuICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7XG4gICAgYXhpcyA9IHRoaXMuaXNIb3Jpem9udGFsKCkgPyBcInhcIiA6IFwieVwiO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGUyLFxuICAgIHdyYXBwZXJFbFxuICB9ID0gc3dpcGVyO1xuICBpZiAocGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHtcbiAgICByZXR1cm4gcnRsID8gLXRyYW5zbGF0ZTIgOiB0cmFuc2xhdGUyO1xuICB9XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIHJldHVybiB0cmFuc2xhdGUyO1xuICB9XG4gIGxldCBjdXJyZW50VHJhbnNsYXRlID0gZ2V0VHJhbnNsYXRlKHdyYXBwZXJFbCwgYXhpcyk7XG4gIGN1cnJlbnRUcmFuc2xhdGUgKz0gc3dpcGVyLmNzc092ZXJmbG93QWRqdXN0bWVudCgpO1xuICBpZiAocnRsKSBjdXJyZW50VHJhbnNsYXRlID0gLWN1cnJlbnRUcmFuc2xhdGU7XG4gIHJldHVybiBjdXJyZW50VHJhbnNsYXRlIHx8IDA7XG59XG5mdW5jdGlvbiBzZXRUcmFuc2xhdGUodHJhbnNsYXRlMiwgYnlDb250cm9sbGVyKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICBwYXJhbXMsXG4gICAgd3JhcHBlckVsLFxuICAgIHByb2dyZXNzXG4gIH0gPSBzd2lwZXI7XG4gIGxldCB4ID0gMDtcbiAgbGV0IHkgPSAwO1xuICBjb25zdCB6ID0gMDtcbiAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgIHggPSBydGwgPyAtdHJhbnNsYXRlMiA6IHRyYW5zbGF0ZTI7XG4gIH0gZWxzZSB7XG4gICAgeSA9IHRyYW5zbGF0ZTI7XG4gIH1cbiAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHtcbiAgICB4ID0gTWF0aC5mbG9vcih4KTtcbiAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgfVxuICBzd2lwZXIucHJldmlvdXNUcmFuc2xhdGUgPSBzd2lwZXIudHJhbnNsYXRlO1xuICBzd2lwZXIudHJhbnNsYXRlID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8geCA6IHk7XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIHdyYXBwZXJFbFtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBcInNjcm9sbExlZnRcIiA6IFwic2Nyb2xsVG9wXCJdID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gLXggOiAteTtcbiAgfSBlbHNlIGlmICghcGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHtcbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICB4IC09IHN3aXBlci5jc3NPdmVyZmxvd0FkanVzdG1lbnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeSAtPSBzd2lwZXIuY3NzT3ZlcmZsb3dBZGp1c3RtZW50KCk7XG4gICAgfVxuICAgIHdyYXBwZXJFbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt4fXB4LCAke3l9cHgsICR7en1weClgO1xuICB9XG4gIGxldCBuZXdQcm9ncmVzcztcbiAgY29uc3QgdHJhbnNsYXRlc0RpZmYgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgIG5ld1Byb2dyZXNzID0gMDtcbiAgfSBlbHNlIHtcbiAgICBuZXdQcm9ncmVzcyA9ICh0cmFuc2xhdGUyIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAvIHRyYW5zbGF0ZXNEaWZmO1xuICB9XG4gIGlmIChuZXdQcm9ncmVzcyAhPT0gcHJvZ3Jlc3MpIHtcbiAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlMik7XG4gIH1cbiAgc3dpcGVyLmVtaXQoXCJzZXRUcmFuc2xhdGVcIiwgc3dpcGVyLnRyYW5zbGF0ZSwgYnlDb250cm9sbGVyKTtcbn1cbmZ1bmN0aW9uIG1pblRyYW5zbGF0ZSgpIHtcbiAgcmV0dXJuIC10aGlzLnNuYXBHcmlkWzBdO1xufVxuZnVuY3Rpb24gbWF4VHJhbnNsYXRlKCkge1xuICByZXR1cm4gLXRoaXMuc25hcEdyaWRbdGhpcy5zbmFwR3JpZC5sZW5ndGggLSAxXTtcbn1cbmZ1bmN0aW9uIHRyYW5zbGF0ZVRvKHRyYW5zbGF0ZTIsIHNwZWVkLCBydW5DYWxsYmFja3MsIHRyYW5zbGF0ZUJvdW5kcywgaW50ZXJuYWwpIHtcbiAgaWYgKHRyYW5zbGF0ZTIgPT09IHZvaWQgMCkge1xuICAgIHRyYW5zbGF0ZTIgPSAwO1xuICB9XG4gIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGlmICh0cmFuc2xhdGVCb3VuZHMgPT09IHZvaWQgMCkge1xuICAgIHRyYW5zbGF0ZUJvdW5kcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICB3cmFwcGVyRWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBtaW5UcmFuc2xhdGUyID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICBjb25zdCBtYXhUcmFuc2xhdGUyID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICBsZXQgbmV3VHJhbnNsYXRlO1xuICBpZiAodHJhbnNsYXRlQm91bmRzICYmIHRyYW5zbGF0ZTIgPiBtaW5UcmFuc2xhdGUyKSBuZXdUcmFuc2xhdGUgPSBtaW5UcmFuc2xhdGUyO1xuICBlbHNlIGlmICh0cmFuc2xhdGVCb3VuZHMgJiYgdHJhbnNsYXRlMiA8IG1heFRyYW5zbGF0ZTIpIG5ld1RyYW5zbGF0ZSA9IG1heFRyYW5zbGF0ZTI7XG4gIGVsc2UgbmV3VHJhbnNsYXRlID0gdHJhbnNsYXRlMjtcbiAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKG5ld1RyYW5zbGF0ZSk7XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIGNvbnN0IGlzSCA9IHN3aXBlci5pc0hvcml6b250YWwoKTtcbiAgICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICAgIHdyYXBwZXJFbFtpc0ggPyBcInNjcm9sbExlZnRcIiA6IFwic2Nyb2xsVG9wXCJdID0gLW5ld1RyYW5zbGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFzd2lwZXIuc3VwcG9ydC5zbW9vdGhTY3JvbGwpIHtcbiAgICAgICAgYW5pbWF0ZUNTU01vZGVTY3JvbGwoe1xuICAgICAgICAgIHN3aXBlcixcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbjogLW5ld1RyYW5zbGF0ZSxcbiAgICAgICAgICBzaWRlOiBpc0ggPyBcImxlZnRcIiA6IFwidG9wXCJcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgd3JhcHBlckVsLnNjcm9sbFRvKHtcbiAgICAgICAgW2lzSCA/IFwibGVmdFwiIDogXCJ0b3BcIl06IC1uZXdUcmFuc2xhdGUsXG4gICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgIGlmIChydW5DYWxsYmFja3MpIHtcbiAgICAgIHN3aXBlci5lbWl0KFwiYmVmb3JlVHJhbnNpdGlvblN0YXJ0XCIsIHNwZWVkLCBpbnRlcm5hbCk7XG4gICAgICBzd2lwZXIuZW1pdChcInRyYW5zaXRpb25FbmRcIik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG4gICAgaWYgKHJ1bkNhbGxiYWNrcykge1xuICAgICAgc3dpcGVyLmVtaXQoXCJiZWZvcmVUcmFuc2l0aW9uU3RhcnRcIiwgc3BlZWQsIGludGVybmFsKTtcbiAgICAgIHN3aXBlci5lbWl0KFwidHJhbnNpdGlvblN0YXJ0XCIpO1xuICAgIH1cbiAgICBpZiAoIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgIHN3aXBlci5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgaWYgKCFzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKSB7XG4gICAgICAgIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kMihlKSB7XG4gICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgcmV0dXJuO1xuICAgICAgICAgIHN3aXBlci53cmFwcGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgICAgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IG51bGw7XG4gICAgICAgICAgZGVsZXRlIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQ7XG4gICAgICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgIGlmIChydW5DYWxsYmFja3MpIHtcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KFwidHJhbnNpdGlvbkVuZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBzd2lwZXIud3JhcHBlckVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24sIGJ5Q29udHJvbGxlcikge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoIXN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUudHJhbnNpdGlvbkRlbGF5ID0gZHVyYXRpb24gPT09IDAgPyBgMG1zYCA6IFwiXCI7XG4gIH1cbiAgc3dpcGVyLmVtaXQoXCJzZXRUcmFuc2l0aW9uXCIsIGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpO1xufVxuZnVuY3Rpb24gdHJhbnNpdGlvbkVtaXQoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBydW5DYWxsYmFja3MsXG4gICAgZGlyZWN0aW9uLFxuICAgIHN0ZXBcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IHtcbiAgICBhY3RpdmVJbmRleCxcbiAgICBwcmV2aW91c0luZGV4XG4gIH0gPSBzd2lwZXI7XG4gIGxldCBkaXIgPSBkaXJlY3Rpb247XG4gIGlmICghZGlyKSB7XG4gICAgaWYgKGFjdGl2ZUluZGV4ID4gcHJldmlvdXNJbmRleCkgZGlyID0gXCJuZXh0XCI7XG4gICAgZWxzZSBpZiAoYWN0aXZlSW5kZXggPCBwcmV2aW91c0luZGV4KSBkaXIgPSBcInByZXZcIjtcbiAgICBlbHNlIGRpciA9IFwicmVzZXRcIjtcbiAgfVxuICBzd2lwZXIuZW1pdChgdHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgaWYgKHJ1bkNhbGxiYWNrcyAmJiBhY3RpdmVJbmRleCAhPT0gcHJldmlvdXNJbmRleCkge1xuICAgIGlmIChkaXIgPT09IFwicmVzZXRcIikge1xuICAgICAgc3dpcGVyLmVtaXQoYHNsaWRlUmVzZXRUcmFuc2l0aW9uJHtzdGVwfWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdChgc2xpZGVDaGFuZ2VUcmFuc2l0aW9uJHtzdGVwfWApO1xuICAgIGlmIChkaXIgPT09IFwibmV4dFwiKSB7XG4gICAgICBzd2lwZXIuZW1pdChgc2xpZGVOZXh0VHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLmVtaXQoYHNsaWRlUHJldlRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pIHtcbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkgcmV0dXJuO1xuICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xuICB9XG4gIHRyYW5zaXRpb25FbWl0KHtcbiAgICBzd2lwZXIsXG4gICAgcnVuQ2FsbGJhY2tzLFxuICAgIGRpcmVjdGlvbixcbiAgICBzdGVwOiBcIlN0YXJ0XCJcbiAgfSk7XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKSB7XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBzd2lwZXIuYW5pbWF0aW5nID0gZmFsc2U7XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkgcmV0dXJuO1xuICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgdHJhbnNpdGlvbkVtaXQoe1xuICAgIHN3aXBlcixcbiAgICBydW5DYWxsYmFja3MsXG4gICAgZGlyZWN0aW9uLFxuICAgIHN0ZXA6IFwiRW5kXCJcbiAgfSk7XG59XG5mdW5jdGlvbiBzbGlkZVRvKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCwgaW5pdGlhbCkge1xuICBpZiAoaW5kZXggPT09IHZvaWQgMCkge1xuICAgIGluZGV4ID0gMDtcbiAgfVxuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGlmICh0eXBlb2YgaW5kZXggPT09IFwic3RyaW5nXCIpIHtcbiAgICBpbmRleCA9IHBhcnNlSW50KGluZGV4LCAxMCk7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgbGV0IHNsaWRlSW5kZXggPSBpbmRleDtcbiAgaWYgKHNsaWRlSW5kZXggPCAwKSBzbGlkZUluZGV4ID0gMDtcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBzbmFwR3JpZCxcbiAgICBzbGlkZXNHcmlkLFxuICAgIHByZXZpb3VzSW5kZXgsXG4gICAgYWN0aXZlSW5kZXgsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgd3JhcHBlckVsLFxuICAgIGVuYWJsZWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkICYmICFpbnRlcm5hbCAmJiAhaW5pdGlhbCB8fCBzd2lwZXIuZGVzdHJveWVkIHx8IHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIHNwZWVkID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgc3BlZWQgPSBzd2lwZXIucGFyYW1zLnNwZWVkO1xuICB9XG4gIGNvbnN0IHNraXAgPSBNYXRoLm1pbihzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgc2xpZGVJbmRleCk7XG4gIGxldCBzbmFwSW5kZXggPSBza2lwICsgTWF0aC5mbG9vcigoc2xpZGVJbmRleCAtIHNraXApIC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gIGlmIChzbmFwSW5kZXggPj0gc25hcEdyaWQubGVuZ3RoKSBzbmFwSW5kZXggPSBzbmFwR3JpZC5sZW5ndGggLSAxO1xuICBjb25zdCB0cmFuc2xhdGUyID0gLXNuYXBHcmlkW3NuYXBJbmRleF07XG4gIGlmIChwYXJhbXMubm9ybWFsaXplU2xpZGVJbmRleCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFRyYW5zbGF0ZSA9IC1NYXRoLmZsb29yKHRyYW5zbGF0ZTIgKiAxMDApO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEdyaWQgPSBNYXRoLmZsb29yKHNsaWRlc0dyaWRbaV0gKiAxMDApO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEdyaWROZXh0ID0gTWF0aC5mbG9vcihzbGlkZXNHcmlkW2kgKyAxXSAqIDEwMCk7XG4gICAgICBpZiAodHlwZW9mIHNsaWRlc0dyaWRbaSArIDFdICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmIChub3JtYWxpemVkVHJhbnNsYXRlID49IG5vcm1hbGl6ZWRHcmlkICYmIG5vcm1hbGl6ZWRUcmFuc2xhdGUgPCBub3JtYWxpemVkR3JpZE5leHQgLSAobm9ybWFsaXplZEdyaWROZXh0IC0gbm9ybWFsaXplZEdyaWQpIC8gMikge1xuICAgICAgICAgIHNsaWRlSW5kZXggPSBpO1xuICAgICAgICB9IGVsc2UgaWYgKG5vcm1hbGl6ZWRUcmFuc2xhdGUgPj0gbm9ybWFsaXplZEdyaWQgJiYgbm9ybWFsaXplZFRyYW5zbGF0ZSA8IG5vcm1hbGl6ZWRHcmlkTmV4dCkge1xuICAgICAgICAgIHNsaWRlSW5kZXggPSBpICsgMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChub3JtYWxpemVkVHJhbnNsYXRlID49IG5vcm1hbGl6ZWRHcmlkKSB7XG4gICAgICAgIHNsaWRlSW5kZXggPSBpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoc3dpcGVyLmluaXRpYWxpemVkICYmIHNsaWRlSW5kZXggIT09IGFjdGl2ZUluZGV4KSB7XG4gICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZU5leHQgJiYgKHJ0bCA/IHRyYW5zbGF0ZTIgPiBzd2lwZXIudHJhbnNsYXRlICYmIHRyYW5zbGF0ZTIgPiBzd2lwZXIubWluVHJhbnNsYXRlKCkgOiB0cmFuc2xhdGUyIDwgc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUyIDwgc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlUHJldiAmJiB0cmFuc2xhdGUyID4gc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUyID4gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICBpZiAoKGFjdGl2ZUluZGV4IHx8IDApICE9PSBzbGlkZUluZGV4KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHNsaWRlSW5kZXggIT09IChwcmV2aW91c0luZGV4IHx8IDApICYmIHJ1bkNhbGxiYWNrcykge1xuICAgIHN3aXBlci5lbWl0KFwiYmVmb3JlU2xpZGVDaGFuZ2VTdGFydFwiKTtcbiAgfVxuICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlMik7XG4gIGxldCBkaXJlY3Rpb247XG4gIGlmIChzbGlkZUluZGV4ID4gYWN0aXZlSW5kZXgpIGRpcmVjdGlvbiA9IFwibmV4dFwiO1xuICBlbHNlIGlmIChzbGlkZUluZGV4IDwgYWN0aXZlSW5kZXgpIGRpcmVjdGlvbiA9IFwicHJldlwiO1xuICBlbHNlIGRpcmVjdGlvbiA9IFwicmVzZXRcIjtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIGNvbnN0IGlzSW5pdGlhbFZpcnR1YWwgPSBpc1ZpcnR1YWwgJiYgaW5pdGlhbDtcbiAgaWYgKCFpc0luaXRpYWxWaXJ0dWFsICYmIChydGwgJiYgLXRyYW5zbGF0ZTIgPT09IHN3aXBlci50cmFuc2xhdGUgfHwgIXJ0bCAmJiB0cmFuc2xhdGUyID09PSBzd2lwZXIudHJhbnNsYXRlKSkge1xuICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleChzbGlkZUluZGV4KTtcbiAgICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgfVxuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgaWYgKHBhcmFtcy5lZmZlY3QgIT09IFwic2xpZGVcIikge1xuICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUyKTtcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiAhPT0gXCJyZXNldFwiKSB7XG4gICAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIGNvbnN0IGlzSCA9IHN3aXBlci5pc0hvcml6b250YWwoKTtcbiAgICBjb25zdCB0ID0gcnRsID8gdHJhbnNsYXRlMiA6IC10cmFuc2xhdGUyO1xuICAgIGlmIChzcGVlZCA9PT0gMCkge1xuICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnNjcm9sbFNuYXBUeXBlID0gXCJub25lXCI7XG4gICAgICAgIHN3aXBlci5faW1tZWRpYXRlVmlydHVhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoaXNWaXJ0dWFsICYmICFzd2lwZXIuX2Nzc01vZGVWaXJ0dWFsSW5pdGlhbFNldCAmJiBzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSA+IDApIHtcbiAgICAgICAgc3dpcGVyLl9jc3NNb2RlVmlydHVhbEluaXRpYWxTZXQgPSB0cnVlO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIHdyYXBwZXJFbFtpc0ggPyBcInNjcm9sbExlZnRcIiA6IFwic2Nyb2xsVG9wXCJdID0gdDtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cmFwcGVyRWxbaXNIID8gXCJzY3JvbGxMZWZ0XCIgOiBcInNjcm9sbFRvcFwiXSA9IHQ7XG4gICAgICB9XG4gICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9IFwiXCI7XG4gICAgICAgICAgc3dpcGVyLl9pbW1lZGlhdGVWaXJ0dWFsID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXN3aXBlci5zdXBwb3J0LnNtb290aFNjcm9sbCkge1xuICAgICAgICBhbmltYXRlQ1NTTW9kZVNjcm9sbCh7XG4gICAgICAgICAgc3dpcGVyLFxuICAgICAgICAgIHRhcmdldFBvc2l0aW9uOiB0LFxuICAgICAgICAgIHNpZGU6IGlzSCA/IFwibGVmdFwiIDogXCJ0b3BcIlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICB3cmFwcGVyRWwuc2Nyb2xsVG8oe1xuICAgICAgICBbaXNIID8gXCJsZWZ0XCIgOiBcInRvcFwiXTogdCxcbiAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzd2lwZXIuc2V0VHJhbnNpdGlvbihzcGVlZCk7XG4gIHN3aXBlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlMik7XG4gIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleChzbGlkZUluZGV4KTtcbiAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgc3dpcGVyLmVtaXQoXCJiZWZvcmVUcmFuc2l0aW9uU3RhcnRcIiwgc3BlZWQsIGludGVybmFsKTtcbiAgc3dpcGVyLnRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gIGlmIChzcGVlZCA9PT0gMCkge1xuICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgfSBlbHNlIGlmICghc3dpcGVyLmFuaW1hdGluZykge1xuICAgIHN3aXBlci5hbmltYXRpbmcgPSB0cnVlO1xuICAgIGlmICghc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKSB7XG4gICAgICBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kMihlKSB7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSByZXR1cm47XG4gICAgICAgIHN3aXBlci53cmFwcGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gbnVsbDtcbiAgICAgICAgZGVsZXRlIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZDtcbiAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgICAgfTtcbiAgICB9XG4gICAgc3dpcGVyLndyYXBwZXJFbC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gc2xpZGVUb0xvb3AoaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gIGlmIChpbmRleCA9PT0gdm9pZCAwKSB7XG4gICAgaW5kZXggPSAwO1xuICB9XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgaWYgKHR5cGVvZiBpbmRleCA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IGluZGV4QXNOdW1iZXIgPSBwYXJzZUludChpbmRleCwgMTApO1xuICAgIGluZGV4ID0gaW5kZXhBc051bWJlcjtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICBpZiAodHlwZW9mIHNwZWVkID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgc3BlZWQgPSBzd2lwZXIucGFyYW1zLnNwZWVkO1xuICB9XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gc3dpcGVyLmdyaWQgJiYgc3dpcGVyLnBhcmFtcy5ncmlkICYmIHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzID4gMTtcbiAgbGV0IG5ld0luZGV4ID0gaW5kZXg7XG4gIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgIG5ld0luZGV4ID0gbmV3SW5kZXggKyBzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0YXJnZXRTbGlkZUluZGV4O1xuICAgICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBuZXdJbmRleCAqIHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzO1xuICAgICAgICB0YXJnZXRTbGlkZUluZGV4ID0gc3dpcGVyLnNsaWRlcy5maWx0ZXIoKHNsaWRlRWwpID0+IHNsaWRlRWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIikgKiAxID09PSBzbGlkZUluZGV4KVswXS5jb2x1bW47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRTbGlkZUluZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXhCeURhdGEobmV3SW5kZXgpO1xuICAgICAgfVxuICAgICAgY29uc3QgY29scyA9IGdyaWRFbmFibGVkID8gTWF0aC5jZWlsKHN3aXBlci5zbGlkZXMubGVuZ3RoIC8gc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3MpIDogc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNlbnRlcmVkU2xpZGVzXG4gICAgICB9ID0gc3dpcGVyLnBhcmFtcztcbiAgICAgIGxldCBzbGlkZXNQZXJWaWV3ID0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgICAgaWYgKHNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiKSB7XG4gICAgICAgIHNsaWRlc1BlclZpZXcgPSBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlc1BlclZpZXcgPSBNYXRoLmNlaWwocGFyc2VGbG9hdChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcsIDEwKSk7XG4gICAgICAgIGlmIChjZW50ZXJlZFNsaWRlcyAmJiBzbGlkZXNQZXJWaWV3ICUgMiA9PT0gMCkge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXcgPSBzbGlkZXNQZXJWaWV3ICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IG5lZWRMb29wRml4ID0gY29scyAtIHRhcmdldFNsaWRlSW5kZXggPCBzbGlkZXNQZXJWaWV3O1xuICAgICAgaWYgKGNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgIG5lZWRMb29wRml4ID0gbmVlZExvb3BGaXggfHwgdGFyZ2V0U2xpZGVJbmRleCA8IE1hdGguY2VpbChzbGlkZXNQZXJWaWV3IC8gMik7XG4gICAgICB9XG4gICAgICBpZiAoaW50ZXJuYWwgJiYgY2VudGVyZWRTbGlkZXMgJiYgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSBcImF1dG9cIiAmJiAhZ3JpZEVuYWJsZWQpIHtcbiAgICAgICAgbmVlZExvb3BGaXggPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTG9vcEZpeCkge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBjZW50ZXJlZFNsaWRlcyA/IHRhcmdldFNsaWRlSW5kZXggPCBzd2lwZXIuYWN0aXZlSW5kZXggPyBcInByZXZcIiA6IFwibmV4dFwiIDogdGFyZ2V0U2xpZGVJbmRleCAtIHN3aXBlci5hY3RpdmVJbmRleCAtIDEgPCBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICAgICAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICAgIHNsaWRlVG86IHRydWUsXG4gICAgICAgICAgYWN0aXZlU2xpZGVJbmRleDogZGlyZWN0aW9uID09PSBcIm5leHRcIiA/IHRhcmdldFNsaWRlSW5kZXggKyAxIDogdGFyZ2V0U2xpZGVJbmRleCAtIGNvbHMgKyAxLFxuICAgICAgICAgIHNsaWRlUmVhbEluZGV4OiBkaXJlY3Rpb24gPT09IFwibmV4dFwiID8gc3dpcGVyLnJlYWxJbmRleCA6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgICBjb25zdCBzbGlkZUluZGV4ID0gbmV3SW5kZXggKiBzd2lwZXIucGFyYW1zLmdyaWQucm93cztcbiAgICAgICAgbmV3SW5kZXggPSBzd2lwZXIuc2xpZGVzLmZpbHRlcigoc2xpZGVFbCkgPT4gc2xpZGVFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSAqIDEgPT09IHNsaWRlSW5kZXgpWzBdLmNvbHVtbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0luZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXhCeURhdGEobmV3SW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIHN3aXBlci5zbGlkZVRvKG5ld0luZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gIH0pO1xuICByZXR1cm4gc3dpcGVyO1xufVxuZnVuY3Rpb24gc2xpZGVOZXh0KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIGVuYWJsZWQsXG4gICAgcGFyYW1zLFxuICAgIGFuaW1hdGluZ1xuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuIHN3aXBlcjtcbiAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNwZWVkID0gc3dpcGVyLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBsZXQgcGVyR3JvdXAgPSBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAxICYmIHBhcmFtcy5zbGlkZXNQZXJHcm91cEF1dG8pIHtcbiAgICBwZXJHcm91cCA9IE1hdGgubWF4KHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYyhcImN1cnJlbnRcIiwgdHJ1ZSksIDEpO1xuICB9XG4gIGNvbnN0IGluY3JlbWVudCA9IHN3aXBlci5hY3RpdmVJbmRleCA8IHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAgPyAxIDogcGVyR3JvdXA7XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIGlmIChhbmltYXRpbmcgJiYgIWlzVmlydHVhbCAmJiBwYXJhbXMubG9vcFByZXZlbnRzU2xpZGluZykgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgIGRpcmVjdGlvbjogXCJuZXh0XCJcbiAgICB9KTtcbiAgICBzd2lwZXIuX2NsaWVudExlZnQgPSBzd2lwZXIud3JhcHBlckVsLmNsaWVudExlZnQ7XG4gICAgaWYgKHN3aXBlci5hY3RpdmVJbmRleCA9PT0gc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxICYmIHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXggKyBpbmNyZW1lbnQsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIGlmIChwYXJhbXMucmV3aW5kICYmIHN3aXBlci5pc0VuZCkge1xuICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbygwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gIH1cbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCArIGluY3JlbWVudCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufVxuZnVuY3Rpb24gc2xpZGVQcmV2KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBzbmFwR3JpZCxcbiAgICBzbGlkZXNHcmlkLFxuICAgIHJ0bFRyYW5zbGF0ZSxcbiAgICBlbmFibGVkLFxuICAgIGFuaW1hdGluZ1xuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuIHN3aXBlcjtcbiAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNwZWVkID0gc3dpcGVyLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoYW5pbWF0aW5nICYmICFpc1ZpcnR1YWwgJiYgcGFyYW1zLmxvb3BQcmV2ZW50c1NsaWRpbmcpIHJldHVybiBmYWxzZTtcbiAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICBkaXJlY3Rpb246IFwicHJldlwiXG4gICAgfSk7XG4gICAgc3dpcGVyLl9jbGllbnRMZWZ0ID0gc3dpcGVyLndyYXBwZXJFbC5jbGllbnRMZWZ0O1xuICB9XG4gIGNvbnN0IHRyYW5zbGF0ZTIgPSBydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZSh2YWwpIHtcbiAgICBpZiAodmFsIDwgMCkgcmV0dXJuIC1NYXRoLmZsb29yKE1hdGguYWJzKHZhbCkpO1xuICAgIHJldHVybiBNYXRoLmZsb29yKHZhbCk7XG4gIH1cbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zbGF0ZSA9IG5vcm1hbGl6ZSh0cmFuc2xhdGUyKTtcbiAgY29uc3Qgbm9ybWFsaXplZFNuYXBHcmlkID0gc25hcEdyaWQubWFwKCh2YWwpID0+IG5vcm1hbGl6ZSh2YWwpKTtcbiAgbGV0IHByZXZTbmFwID0gc25hcEdyaWRbbm9ybWFsaXplZFNuYXBHcmlkLmluZGV4T2Yobm9ybWFsaXplZFRyYW5zbGF0ZSkgLSAxXTtcbiAgaWYgKHR5cGVvZiBwcmV2U25hcCA9PT0gXCJ1bmRlZmluZWRcIiAmJiBwYXJhbXMuY3NzTW9kZSkge1xuICAgIGxldCBwcmV2U25hcEluZGV4O1xuICAgIHNuYXBHcmlkLmZvckVhY2goKHNuYXAsIHNuYXBJbmRleCkgPT4ge1xuICAgICAgaWYgKG5vcm1hbGl6ZWRUcmFuc2xhdGUgPj0gc25hcCkge1xuICAgICAgICBwcmV2U25hcEluZGV4ID0gc25hcEluZGV4O1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgcHJldlNuYXBJbmRleCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcHJldlNuYXAgPSBzbmFwR3JpZFtwcmV2U25hcEluZGV4ID4gMCA/IHByZXZTbmFwSW5kZXggLSAxIDogcHJldlNuYXBJbmRleF07XG4gICAgfVxuICB9XG4gIGxldCBwcmV2SW5kZXggPSAwO1xuICBpZiAodHlwZW9mIHByZXZTbmFwICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcHJldkluZGV4ID0gc2xpZGVzR3JpZC5pbmRleE9mKHByZXZTbmFwKTtcbiAgICBpZiAocHJldkluZGV4IDwgMCkgcHJldkluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4IC0gMTtcbiAgICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiICYmIHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMSAmJiBwYXJhbXMuc2xpZGVzUGVyR3JvdXBBdXRvKSB7XG4gICAgICBwcmV2SW5kZXggPSBwcmV2SW5kZXggLSBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoXCJwcmV2aW91c1wiLCB0cnVlKSArIDE7XG4gICAgICBwcmV2SW5kZXggPSBNYXRoLm1heChwcmV2SW5kZXgsIDApO1xuICAgIH1cbiAgfVxuICBpZiAocGFyYW1zLnJld2luZCAmJiBzd2lwZXIuaXNCZWdpbm5pbmcpIHtcbiAgICBjb25zdCBsYXN0SW5kZXggPSBzd2lwZXIucGFyYW1zLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgJiYgc3dpcGVyLnZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIC0gMSA6IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8obGFzdEluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gIH0gZWxzZSBpZiAocGFyYW1zLmxvb3AgJiYgc3dpcGVyLmFjdGl2ZUluZGV4ID09PSAwICYmIHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHByZXZJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBzd2lwZXIuc2xpZGVUbyhwcmV2SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbn1cbmZ1bmN0aW9uIHNsaWRlUmVzZXQoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICBpZiAodHlwZW9mIHNwZWVkID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgc3BlZWQgPSBzd2lwZXIucGFyYW1zLnNwZWVkO1xuICB9XG4gIHJldHVybiBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbn1cbmZ1bmN0aW9uIHNsaWRlVG9DbG9zZXN0KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsLCB0aHJlc2hvbGQpIHtcbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBpZiAodGhyZXNob2xkID09PSB2b2lkIDApIHtcbiAgICB0aHJlc2hvbGQgPSAwLjU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNwZWVkID0gc3dpcGVyLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBsZXQgaW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gIGNvbnN0IHNraXAgPSBNYXRoLm1pbihzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgaW5kZXgpO1xuICBjb25zdCBzbmFwSW5kZXggPSBza2lwICsgTWF0aC5mbG9vcigoaW5kZXggLSBza2lwKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICBjb25zdCB0cmFuc2xhdGUyID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgaWYgKHRyYW5zbGF0ZTIgPj0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleF0pIHtcbiAgICBjb25zdCBjdXJyZW50U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXhdO1xuICAgIGNvbnN0IG5leHRTbmFwID0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleCArIDFdO1xuICAgIGlmICh0cmFuc2xhdGUyIC0gY3VycmVudFNuYXAgPiAobmV4dFNuYXAgLSBjdXJyZW50U25hcCkgKiB0aHJlc2hvbGQpIHtcbiAgICAgIGluZGV4ICs9IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHByZXZTbmFwID0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleCAtIDFdO1xuICAgIGNvbnN0IGN1cnJlbnRTbmFwID0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleF07XG4gICAgaWYgKHRyYW5zbGF0ZTIgLSBwcmV2U25hcCA8PSAoY3VycmVudFNuYXAgLSBwcmV2U25hcCkgKiB0aHJlc2hvbGQpIHtcbiAgICAgIGluZGV4IC09IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgfVxuICB9XG4gIGluZGV4ID0gTWF0aC5tYXgoaW5kZXgsIDApO1xuICBpbmRleCA9IE1hdGgubWluKGluZGV4LCBzd2lwZXIuc2xpZGVzR3JpZC5sZW5ndGggLSAxKTtcbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG59XG5mdW5jdGlvbiBzbGlkZVRvQ2xpY2tlZFNsaWRlKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHNsaWRlc0VsXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IHNsaWRlc1BlclZpZXcgPSBwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIgPyBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKSA6IHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICBsZXQgc2xpZGVUb0luZGV4ID0gc3dpcGVyLmNsaWNrZWRJbmRleDtcbiAgbGV0IHJlYWxJbmRleDtcbiAgY29uc3Qgc2xpZGVTZWxlY3RvciA9IHN3aXBlci5pc0VsZW1lbnQgPyBgc3dpcGVyLXNsaWRlYCA6IGAuJHtwYXJhbXMuc2xpZGVDbGFzc31gO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoc3dpcGVyLmFuaW1hdGluZykgcmV0dXJuO1xuICAgIHJlYWxJbmRleCA9IHBhcnNlSW50KHN3aXBlci5jbGlja2VkU2xpZGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIiksIDEwKTtcbiAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICBpZiAoc2xpZGVUb0luZGV4IDwgc3dpcGVyLmxvb3BlZFNsaWRlcyAtIHNsaWRlc1BlclZpZXcgLyAyIHx8IHNsaWRlVG9JbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gc3dpcGVyLmxvb3BlZFNsaWRlcyArIHNsaWRlc1BlclZpZXcgLyAyKSB7XG4gICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgIHNsaWRlVG9JbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4KGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYCR7c2xpZGVTZWxlY3Rvcn1bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3JlYWxJbmRleH1cIl1gKVswXSk7XG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzbGlkZVRvSW5kZXggPiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIHNsaWRlc1BlclZpZXcpIHtcbiAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICBzbGlkZVRvSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleChlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAke3NsaWRlU2VsZWN0b3J9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtyZWFsSW5kZXh9XCJdYClbMF0pO1xuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGxvb3BDcmVhdGUoc2xpZGVSZWFsSW5kZXgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBzbGlkZXNFbFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIXBhcmFtcy5sb29wIHx8IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSByZXR1cm47XG4gIGNvbnN0IGluaXRTbGlkZXMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVzID0gZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKTtcbiAgICBzbGlkZXMuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiLCBpbmRleCk7XG4gICAgfSk7XG4gIH07XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gc3dpcGVyLmdyaWQgJiYgcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDE7XG4gIGNvbnN0IHNsaWRlc1Blckdyb3VwID0gcGFyYW1zLnNsaWRlc1Blckdyb3VwICogKGdyaWRFbmFibGVkID8gcGFyYW1zLmdyaWQucm93cyA6IDEpO1xuICBjb25zdCBzaG91bGRGaWxsR3JvdXAgPSBzd2lwZXIuc2xpZGVzLmxlbmd0aCAlIHNsaWRlc1Blckdyb3VwICE9PSAwO1xuICBjb25zdCBzaG91bGRGaWxsR3JpZCA9IGdyaWRFbmFibGVkICYmIHN3aXBlci5zbGlkZXMubGVuZ3RoICUgcGFyYW1zLmdyaWQucm93cyAhPT0gMDtcbiAgY29uc3QgYWRkQmxhbmtTbGlkZXMgPSAoYW1vdW50T2ZTbGlkZXMpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudE9mU2xpZGVzOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHNsaWRlRWwgPSBzd2lwZXIuaXNFbGVtZW50ID8gY3JlYXRlRWxlbWVudDIoXCJzd2lwZXItc2xpZGVcIiwgW3BhcmFtcy5zbGlkZUJsYW5rQ2xhc3NdKSA6IGNyZWF0ZUVsZW1lbnQyKFwiZGl2XCIsIFtwYXJhbXMuc2xpZGVDbGFzcywgcGFyYW1zLnNsaWRlQmxhbmtDbGFzc10pO1xuICAgICAgc3dpcGVyLnNsaWRlc0VsLmFwcGVuZChzbGlkZUVsKTtcbiAgICB9XG4gIH07XG4gIGlmIChzaG91bGRGaWxsR3JvdXApIHtcbiAgICBpZiAocGFyYW1zLmxvb3BBZGRCbGFua1NsaWRlcykge1xuICAgICAgY29uc3Qgc2xpZGVzVG9BZGQgPSBzbGlkZXNQZXJHcm91cCAtIHN3aXBlci5zbGlkZXMubGVuZ3RoICUgc2xpZGVzUGVyR3JvdXA7XG4gICAgICBhZGRCbGFua1NsaWRlcyhzbGlkZXNUb0FkZCk7XG4gICAgICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dXYXJuaW5nKFwiU3dpcGVyIExvb3AgV2FybmluZzogVGhlIG51bWJlciBvZiBzbGlkZXMgaXMgbm90IGV2ZW4gdG8gc2xpZGVzUGVyR3JvdXAsIGxvb3AgbW9kZSBtYXkgbm90IGZ1bmN0aW9uIHByb3Blcmx5LiBZb3UgbmVlZCB0byBhZGQgbW9yZSBzbGlkZXMgKG9yIG1ha2UgZHVwbGljYXRlcywgb3IgZW1wdHkgc2xpZGVzKVwiKTtcbiAgICB9XG4gICAgaW5pdFNsaWRlcygpO1xuICB9IGVsc2UgaWYgKHNob3VsZEZpbGxHcmlkKSB7XG4gICAgaWYgKHBhcmFtcy5sb29wQWRkQmxhbmtTbGlkZXMpIHtcbiAgICAgIGNvbnN0IHNsaWRlc1RvQWRkID0gcGFyYW1zLmdyaWQucm93cyAtIHN3aXBlci5zbGlkZXMubGVuZ3RoICUgcGFyYW1zLmdyaWQucm93cztcbiAgICAgIGFkZEJsYW5rU2xpZGVzKHNsaWRlc1RvQWRkKTtcbiAgICAgIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd1dhcm5pbmcoXCJTd2lwZXIgTG9vcCBXYXJuaW5nOiBUaGUgbnVtYmVyIG9mIHNsaWRlcyBpcyBub3QgZXZlbiB0byBncmlkLnJvd3MsIGxvb3AgbW9kZSBtYXkgbm90IGZ1bmN0aW9uIHByb3Blcmx5LiBZb3UgbmVlZCB0byBhZGQgbW9yZSBzbGlkZXMgKG9yIG1ha2UgZHVwbGljYXRlcywgb3IgZW1wdHkgc2xpZGVzKVwiKTtcbiAgICB9XG4gICAgaW5pdFNsaWRlcygpO1xuICB9IGVsc2Uge1xuICAgIGluaXRTbGlkZXMoKTtcbiAgfVxuICBzd2lwZXIubG9vcEZpeCh7XG4gICAgc2xpZGVSZWFsSW5kZXgsXG4gICAgZGlyZWN0aW9uOiBwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyB2b2lkIDAgOiBcIm5leHRcIlxuICB9KTtcbn1cbmZ1bmN0aW9uIGxvb3BGaXgoX3RlbXApIHtcbiAgbGV0IHtcbiAgICBzbGlkZVJlYWxJbmRleCxcbiAgICBzbGlkZVRvOiBzbGlkZVRvMiA9IHRydWUsXG4gICAgZGlyZWN0aW9uLFxuICAgIHNldFRyYW5zbGF0ZTogc2V0VHJhbnNsYXRlMixcbiAgICBhY3RpdmVTbGlkZUluZGV4LFxuICAgIGJ5Q29udHJvbGxlcixcbiAgICBieU1vdXNld2hlZWxcbiAgfSA9IF90ZW1wID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wO1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoIXN3aXBlci5wYXJhbXMubG9vcCkgcmV0dXJuO1xuICBzd2lwZXIuZW1pdChcImJlZm9yZUxvb3BGaXhcIik7XG4gIGNvbnN0IHtcbiAgICBzbGlkZXMsXG4gICAgYWxsb3dTbGlkZVByZXYsXG4gICAgYWxsb3dTbGlkZU5leHQsXG4gICAgc2xpZGVzRWwsXG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IHtcbiAgICBjZW50ZXJlZFNsaWRlc1xuICB9ID0gcGFyYW1zO1xuICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSB0cnVlO1xuICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSB0cnVlO1xuICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgIGlmIChzbGlkZVRvMikge1xuICAgICAgaWYgKCFwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgc3dpcGVyLnNuYXBJbmRleCA9PT0gMCkge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBzd2lwZXIuc25hcEluZGV4IDwgcGFyYW1zLnNsaWRlc1BlclZpZXcpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCArIHN3aXBlci5zbmFwSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLnNuYXBJbmRleCA9PT0gc3dpcGVyLnNuYXBHcmlkLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IGFsbG93U2xpZGVQcmV2O1xuICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xuICAgIHN3aXBlci5lbWl0KFwibG9vcEZpeFwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IHNsaWRlc1BlclZpZXcgPSBwYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgaWYgKHNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiKSB7XG4gICAgc2xpZGVzUGVyVmlldyA9IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpO1xuICB9IGVsc2Uge1xuICAgIHNsaWRlc1BlclZpZXcgPSBNYXRoLmNlaWwocGFyc2VGbG9hdChwYXJhbXMuc2xpZGVzUGVyVmlldywgMTApKTtcbiAgICBpZiAoY2VudGVyZWRTbGlkZXMgJiYgc2xpZGVzUGVyVmlldyAlIDIgPT09IDApIHtcbiAgICAgIHNsaWRlc1BlclZpZXcgPSBzbGlkZXNQZXJWaWV3ICsgMTtcbiAgICB9XG4gIH1cbiAgY29uc3Qgc2xpZGVzUGVyR3JvdXAgPSBwYXJhbXMuc2xpZGVzUGVyR3JvdXBBdXRvID8gc2xpZGVzUGVyVmlldyA6IHBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgbGV0IGxvb3BlZFNsaWRlcyA9IHNsaWRlc1Blckdyb3VwO1xuICBpZiAobG9vcGVkU2xpZGVzICUgc2xpZGVzUGVyR3JvdXAgIT09IDApIHtcbiAgICBsb29wZWRTbGlkZXMgKz0gc2xpZGVzUGVyR3JvdXAgLSBsb29wZWRTbGlkZXMgJSBzbGlkZXNQZXJHcm91cDtcbiAgfVxuICBsb29wZWRTbGlkZXMgKz0gcGFyYW1zLmxvb3BBZGRpdGlvbmFsU2xpZGVzO1xuICBzd2lwZXIubG9vcGVkU2xpZGVzID0gbG9vcGVkU2xpZGVzO1xuICBjb25zdCBncmlkRW5hYmxlZCA9IHN3aXBlci5ncmlkICYmIHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuICBpZiAoc2xpZGVzLmxlbmd0aCA8IHNsaWRlc1BlclZpZXcgKyBsb29wZWRTbGlkZXMpIHtcbiAgICBzaG93V2FybmluZyhcIlN3aXBlciBMb29wIFdhcm5pbmc6IFRoZSBudW1iZXIgb2Ygc2xpZGVzIGlzIG5vdCBlbm91Z2ggZm9yIGxvb3AgbW9kZSwgaXQgd2lsbCBiZSBkaXNhYmxlZCBhbmQgbm90IGZ1bmN0aW9uIHByb3Blcmx5LiBZb3UgbmVlZCB0byBhZGQgbW9yZSBzbGlkZXMgKG9yIG1ha2UgZHVwbGljYXRlcykgb3IgbG93ZXIgdGhlIHZhbHVlcyBvZiBzbGlkZXNQZXJWaWV3IGFuZCBzbGlkZXNQZXJHcm91cCBwYXJhbWV0ZXJzXCIpO1xuICB9IGVsc2UgaWYgKGdyaWRFbmFibGVkICYmIHBhcmFtcy5ncmlkLmZpbGwgPT09IFwicm93XCIpIHtcbiAgICBzaG93V2FybmluZyhcIlN3aXBlciBMb29wIFdhcm5pbmc6IExvb3AgbW9kZSBpcyBub3QgY29tcGF0aWJsZSB3aXRoIGdyaWQuZmlsbCA9IGByb3dgXCIpO1xuICB9XG4gIGNvbnN0IHByZXBlbmRTbGlkZXNJbmRleGVzID0gW107XG4gIGNvbnN0IGFwcGVuZFNsaWRlc0luZGV4ZXMgPSBbXTtcbiAgbGV0IGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICBpZiAodHlwZW9mIGFjdGl2ZVNsaWRlSW5kZXggPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBhY3RpdmVTbGlkZUluZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXgoc2xpZGVzLmZpbHRlcigoZWwpID0+IGVsLmNsYXNzTGlzdC5jb250YWlucyhwYXJhbXMuc2xpZGVBY3RpdmVDbGFzcykpWzBdKTtcbiAgfSBlbHNlIHtcbiAgICBhY3RpdmVJbmRleCA9IGFjdGl2ZVNsaWRlSW5kZXg7XG4gIH1cbiAgY29uc3QgaXNOZXh0ID0gZGlyZWN0aW9uID09PSBcIm5leHRcIiB8fCAhZGlyZWN0aW9uO1xuICBjb25zdCBpc1ByZXYgPSBkaXJlY3Rpb24gPT09IFwicHJldlwiIHx8ICFkaXJlY3Rpb247XG4gIGxldCBzbGlkZXNQcmVwZW5kZWQgPSAwO1xuICBsZXQgc2xpZGVzQXBwZW5kZWQgPSAwO1xuICBjb25zdCBjb2xzID0gZ3JpZEVuYWJsZWQgPyBNYXRoLmNlaWwoc2xpZGVzLmxlbmd0aCAvIHBhcmFtcy5ncmlkLnJvd3MpIDogc2xpZGVzLmxlbmd0aDtcbiAgY29uc3QgYWN0aXZlQ29sSW5kZXggPSBncmlkRW5hYmxlZCA/IHNsaWRlc1thY3RpdmVTbGlkZUluZGV4XS5jb2x1bW4gOiBhY3RpdmVTbGlkZUluZGV4O1xuICBjb25zdCBhY3RpdmVDb2xJbmRleFdpdGhTaGlmdCA9IGFjdGl2ZUNvbEluZGV4ICsgKGNlbnRlcmVkU2xpZGVzICYmIHR5cGVvZiBzZXRUcmFuc2xhdGUyID09PSBcInVuZGVmaW5lZFwiID8gLXNsaWRlc1BlclZpZXcgLyAyICsgMC41IDogMCk7XG4gIGlmIChhY3RpdmVDb2xJbmRleFdpdGhTaGlmdCA8IGxvb3BlZFNsaWRlcykge1xuICAgIHNsaWRlc1ByZXBlbmRlZCA9IE1hdGgubWF4KGxvb3BlZFNsaWRlcyAtIGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0LCBzbGlkZXNQZXJHcm91cCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb29wZWRTbGlkZXMgLSBhY3RpdmVDb2xJbmRleFdpdGhTaGlmdDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGkgLSBNYXRoLmZsb29yKGkgLyBjb2xzKSAqIGNvbHM7XG4gICAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgICAgY29uc3QgY29sSW5kZXhUb1ByZXBlbmQgPSBjb2xzIC0gaW5kZXggLSAxO1xuICAgICAgICBmb3IgKGxldCBpMiA9IHNsaWRlcy5sZW5ndGggLSAxOyBpMiA+PSAwOyBpMiAtPSAxKSB7XG4gICAgICAgICAgaWYgKHNsaWRlc1tpMl0uY29sdW1uID09PSBjb2xJbmRleFRvUHJlcGVuZCkgcHJlcGVuZFNsaWRlc0luZGV4ZXMucHVzaChpMik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByZXBlbmRTbGlkZXNJbmRleGVzLnB1c2goY29scyAtIGluZGV4IC0gMSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0ICsgc2xpZGVzUGVyVmlldyA+IGNvbHMgLSBsb29wZWRTbGlkZXMpIHtcbiAgICBzbGlkZXNBcHBlbmRlZCA9IE1hdGgubWF4KGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0IC0gKGNvbHMgLSBsb29wZWRTbGlkZXMgKiAyKSwgc2xpZGVzUGVyR3JvdXApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzQXBwZW5kZWQ7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaW5kZXggPSBpIC0gTWF0aC5mbG9vcihpIC8gY29scykgKiBjb2xzO1xuICAgICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZTIsIHNsaWRlSW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoc2xpZGUyLmNvbHVtbiA9PT0gaW5kZXgpIGFwcGVuZFNsaWRlc0luZGV4ZXMucHVzaChzbGlkZUluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcHBlbmRTbGlkZXNJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IHRydWU7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSBmYWxzZTtcbiAgfSk7XG4gIGlmIChpc1ByZXYpIHtcbiAgICBwcmVwZW5kU2xpZGVzSW5kZXhlcy5mb3JFYWNoKChpbmRleCkgPT4ge1xuICAgICAgc2xpZGVzW2luZGV4XS5zd2lwZXJMb29wTW92ZURPTSA9IHRydWU7XG4gICAgICBzbGlkZXNFbC5wcmVwZW5kKHNsaWRlc1tpbmRleF0pO1xuICAgICAgc2xpZGVzW2luZGV4XS5zd2lwZXJMb29wTW92ZURPTSA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG4gIGlmIChpc05leHQpIHtcbiAgICBhcHBlbmRTbGlkZXNJbmRleGVzLmZvckVhY2goKGluZGV4KSA9PiB7XG4gICAgICBzbGlkZXNbaW5kZXhdLnN3aXBlckxvb3BNb3ZlRE9NID0gdHJ1ZTtcbiAgICAgIHNsaWRlc0VsLmFwcGVuZChzbGlkZXNbaW5kZXhdKTtcbiAgICAgIHNsaWRlc1tpbmRleF0uc3dpcGVyTG9vcE1vdmVET00gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIpIHtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gIH0gZWxzZSBpZiAoZ3JpZEVuYWJsZWQgJiYgKHByZXBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCA+IDAgJiYgaXNQcmV2IHx8IGFwcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoID4gMCAmJiBpc05leHQpKSB7XG4gICAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKChzbGlkZTIsIHNsaWRlSW5kZXgpID0+IHtcbiAgICAgIHN3aXBlci5ncmlkLnVwZGF0ZVNsaWRlKHNsaWRlSW5kZXgsIHNsaWRlMiwgc3dpcGVyLnNsaWRlcyk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSB7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xuICB9XG4gIGlmIChzbGlkZVRvMikge1xuICAgIGlmIChwcmVwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggPiAwICYmIGlzUHJldikge1xuICAgICAgaWYgKHR5cGVvZiBzbGlkZVJlYWxJbmRleCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBjb25zdCBjdXJyZW50U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFthY3RpdmVJbmRleF07XG4gICAgICAgIGNvbnN0IG5ld1NsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbYWN0aXZlSW5kZXggKyBzbGlkZXNQcmVwZW5kZWRdO1xuICAgICAgICBjb25zdCBkaWZmID0gbmV3U2xpZGVUcmFuc2xhdGUgLSBjdXJyZW50U2xpZGVUcmFuc2xhdGU7XG4gICAgICAgIGlmIChieU1vdXNld2hlZWwpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHN3aXBlci50cmFuc2xhdGUgLSBkaWZmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhhY3RpdmVJbmRleCArIE1hdGguY2VpbChzbGlkZXNQcmVwZW5kZWQpLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgaWYgKHNldFRyYW5zbGF0ZTIpIHtcbiAgICAgICAgICAgIHN3aXBlci50b3VjaEV2ZW50c0RhdGEuc3RhcnRUcmFuc2xhdGUgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhLnN0YXJ0VHJhbnNsYXRlIC0gZGlmZjtcbiAgICAgICAgICAgIHN3aXBlci50b3VjaEV2ZW50c0RhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGEuY3VycmVudFRyYW5zbGF0ZSAtIGRpZmY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2V0VHJhbnNsYXRlMikge1xuICAgICAgICAgIGNvbnN0IHNoaWZ0ID0gZ3JpZEVuYWJsZWQgPyBwcmVwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggLyBwYXJhbXMuZ3JpZC5yb3dzIDogcHJlcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoO1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCArIHNoaWZ0LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5jdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXBwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggPiAwICYmIGlzTmV4dCkge1xuICAgICAgaWYgKHR5cGVvZiBzbGlkZVJlYWxJbmRleCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBjb25zdCBjdXJyZW50U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFthY3RpdmVJbmRleF07XG4gICAgICAgIGNvbnN0IG5ld1NsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbYWN0aXZlSW5kZXggLSBzbGlkZXNBcHBlbmRlZF07XG4gICAgICAgIGNvbnN0IGRpZmYgPSBuZXdTbGlkZVRyYW5zbGF0ZSAtIGN1cnJlbnRTbGlkZVRyYW5zbGF0ZTtcbiAgICAgICAgaWYgKGJ5TW91c2V3aGVlbCkge1xuICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUoc3dpcGVyLnRyYW5zbGF0ZSAtIGRpZmYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKGFjdGl2ZUluZGV4IC0gc2xpZGVzQXBwZW5kZWQsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICBpZiAoc2V0VHJhbnNsYXRlMikge1xuICAgICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5zdGFydFRyYW5zbGF0ZSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGEuc3RhcnRUcmFuc2xhdGUgLSBkaWZmO1xuICAgICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5jdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5jdXJyZW50VHJhbnNsYXRlIC0gZGlmZjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNoaWZ0ID0gZ3JpZEVuYWJsZWQgPyBhcHBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCAvIHBhcmFtcy5ncmlkLnJvd3MgOiBhcHBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aDtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4IC0gc2hpZnQsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gYWxsb3dTbGlkZVByZXY7XG4gIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xuICBpZiAoc3dpcGVyLmNvbnRyb2xsZXIgJiYgc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCAmJiAhYnlDb250cm9sbGVyKSB7XG4gICAgY29uc3QgbG9vcFBhcmFtcyA9IHtcbiAgICAgIHNsaWRlUmVhbEluZGV4LFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgc2V0VHJhbnNsYXRlOiBzZXRUcmFuc2xhdGUyLFxuICAgICAgYWN0aXZlU2xpZGVJbmRleCxcbiAgICAgIGJ5Q29udHJvbGxlcjogdHJ1ZVxuICAgIH07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkpIHtcbiAgICAgIHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBpZiAoIWMuZGVzdHJveWVkICYmIGMucGFyYW1zLmxvb3ApIGMubG9vcEZpeCh7XG4gICAgICAgICAgLi4ubG9vcFBhcmFtcyxcbiAgICAgICAgICBzbGlkZVRvOiBjLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBwYXJhbXMuc2xpZGVzUGVyVmlldyA/IHNsaWRlVG8yIDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wgaW5zdGFuY2VvZiBzd2lwZXIuY29uc3RydWN0b3IgJiYgc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbC5wYXJhbXMubG9vcCkge1xuICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbC5sb29wRml4KHtcbiAgICAgICAgLi4ubG9vcFBhcmFtcyxcbiAgICAgICAgc2xpZGVUbzogc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbC5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPyBzbGlkZVRvMiA6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgc3dpcGVyLmVtaXQoXCJsb29wRml4XCIpO1xufVxuZnVuY3Rpb24gbG9vcERlc3Ryb3koKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgc2xpZGVzRWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFwYXJhbXMubG9vcCB8fCBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkgcmV0dXJuO1xuICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gIGNvbnN0IG5ld1NsaWRlc09yZGVyID0gW107XG4gIHN3aXBlci5zbGlkZXMuZm9yRWFjaCgoc2xpZGVFbCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gdHlwZW9mIHNsaWRlRWwuc3dpcGVyU2xpZGVJbmRleCA9PT0gXCJ1bmRlZmluZWRcIiA/IHNsaWRlRWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIikgKiAxIDogc2xpZGVFbC5zd2lwZXJTbGlkZUluZGV4O1xuICAgIG5ld1NsaWRlc09yZGVyW2luZGV4XSA9IHNsaWRlRWw7XG4gIH0pO1xuICBzd2lwZXIuc2xpZGVzLmZvckVhY2goKHNsaWRlRWwpID0+IHtcbiAgICBzbGlkZUVsLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpO1xuICB9KTtcbiAgbmV3U2xpZGVzT3JkZXIuZm9yRWFjaCgoc2xpZGVFbCkgPT4ge1xuICAgIHNsaWRlc0VsLmFwcGVuZChzbGlkZUVsKTtcbiAgfSk7XG4gIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnJlYWxJbmRleCwgMCk7XG59XG5mdW5jdGlvbiBzZXRHcmFiQ3Vyc29yKG1vdmluZykge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoIXN3aXBlci5wYXJhbXMuc2ltdWxhdGVUb3VjaCB8fCBzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkIHx8IHN3aXBlci5wYXJhbXMuY3NzTW9kZSkgcmV0dXJuO1xuICBjb25zdCBlbCA9IHN3aXBlci5wYXJhbXMudG91Y2hFdmVudHNUYXJnZXQgPT09IFwiY29udGFpbmVyXCIgPyBzd2lwZXIuZWwgOiBzd2lwZXIud3JhcHBlckVsO1xuICBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gdHJ1ZTtcbiAgfVxuICBlbC5zdHlsZS5jdXJzb3IgPSBcIm1vdmVcIjtcbiAgZWwuc3R5bGUuY3Vyc29yID0gbW92aW5nID8gXCJncmFiYmluZ1wiIDogXCJncmFiXCI7XG4gIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHVuc2V0R3JhYkN1cnNvcigpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuaXNMb2NrZWQgfHwgc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSB0cnVlO1xuICB9XG4gIHN3aXBlcltzd2lwZXIucGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSBcImNvbnRhaW5lclwiID8gXCJlbFwiIDogXCJ3cmFwcGVyRWxcIl0uc3R5bGUuY3Vyc29yID0gXCJcIjtcbiAgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gY2xvc2VzdEVsZW1lbnQoc2VsZWN0b3IsIGJhc2UpIHtcbiAgaWYgKGJhc2UgPT09IHZvaWQgMCkge1xuICAgIGJhc2UgPSB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIF9fY2xvc2VzdEZyb20oZWwpIHtcbiAgICBpZiAoIWVsIHx8IGVsID09PSBnZXREb2N1bWVudCgpIHx8IGVsID09PSBnZXRXaW5kb3coKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGVsLmFzc2lnbmVkU2xvdCkgZWwgPSBlbC5hc3NpZ25lZFNsb3Q7XG4gICAgY29uc3QgZm91bmQgPSBlbC5jbG9zZXN0KHNlbGVjdG9yKTtcbiAgICBpZiAoIWZvdW5kICYmICFlbC5nZXRSb290Tm9kZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZCB8fCBfX2Nsb3Nlc3RGcm9tKGVsLmdldFJvb3ROb2RlKCkuaG9zdCk7XG4gIH1cbiAgcmV0dXJuIF9fY2xvc2VzdEZyb20oYmFzZSk7XG59XG5mdW5jdGlvbiBwcmV2ZW50RWRnZVN3aXBlKHN3aXBlciwgZXZlbnQyLCBzdGFydFgpIHtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBjb25zdCB7XG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGVkZ2VTd2lwZURldGVjdGlvbiA9IHBhcmFtcy5lZGdlU3dpcGVEZXRlY3Rpb247XG4gIGNvbnN0IGVkZ2VTd2lwZVRocmVzaG9sZCA9IHBhcmFtcy5lZGdlU3dpcGVUaHJlc2hvbGQ7XG4gIGlmIChlZGdlU3dpcGVEZXRlY3Rpb24gJiYgKHN0YXJ0WCA8PSBlZGdlU3dpcGVUaHJlc2hvbGQgfHwgc3RhcnRYID49IHdpbmRvdzIuaW5uZXJXaWR0aCAtIGVkZ2VTd2lwZVRocmVzaG9sZCkpIHtcbiAgICBpZiAoZWRnZVN3aXBlRGV0ZWN0aW9uID09PSBcInByZXZlbnRcIikge1xuICAgICAgZXZlbnQyLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KGV2ZW50Mikge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBkb2N1bWVudDIgPSBnZXREb2N1bWVudCgpO1xuICBsZXQgZSA9IGV2ZW50MjtcbiAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgY29uc3QgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG4gIGlmIChlLnR5cGUgPT09IFwicG9pbnRlcmRvd25cIikge1xuICAgIGlmIChkYXRhLnBvaW50ZXJJZCAhPT0gbnVsbCAmJiBkYXRhLnBvaW50ZXJJZCAhPT0gZS5wb2ludGVySWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGF0YS5wb2ludGVySWQgPSBlLnBvaW50ZXJJZDtcbiAgfSBlbHNlIGlmIChlLnR5cGUgPT09IFwidG91Y2hzdGFydFwiICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICBkYXRhLnRvdWNoSWQgPSBlLnRhcmdldFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbiAgfVxuICBpZiAoZS50eXBlID09PSBcInRvdWNoc3RhcnRcIikge1xuICAgIHByZXZlbnRFZGdlU3dpcGUoc3dpcGVyLCBlLCBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHRvdWNoZXMsXG4gICAgZW5hYmxlZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQpIHJldHVybjtcbiAgaWYgKCFwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiBlLnBvaW50ZXJUeXBlID09PSBcIm1vdXNlXCIpIHJldHVybjtcbiAgaWYgKHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLmNzc01vZGUgJiYgcGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIubG9vcEZpeCgpO1xuICB9XG4gIGxldCB0YXJnZXRFbCA9IGUudGFyZ2V0O1xuICBpZiAocGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSBcIndyYXBwZXJcIikge1xuICAgIGlmICghZWxlbWVudElzQ2hpbGRPZih0YXJnZXRFbCwgc3dpcGVyLndyYXBwZXJFbCkpIHJldHVybjtcbiAgfVxuICBpZiAoXCJ3aGljaFwiIGluIGUgJiYgZS53aGljaCA9PT0gMykgcmV0dXJuO1xuICBpZiAoXCJidXR0b25cIiBpbiBlICYmIGUuYnV0dG9uID4gMCkgcmV0dXJuO1xuICBpZiAoZGF0YS5pc1RvdWNoZWQgJiYgZGF0YS5pc01vdmVkKSByZXR1cm47XG4gIGNvbnN0IHN3aXBpbmdDbGFzc0hhc1ZhbHVlID0gISFwYXJhbXMubm9Td2lwaW5nQ2xhc3MgJiYgcGFyYW1zLm5vU3dpcGluZ0NsYXNzICE9PSBcIlwiO1xuICBjb25zdCBldmVudFBhdGggPSBlLmNvbXBvc2VkUGF0aCA/IGUuY29tcG9zZWRQYXRoKCkgOiBlLnBhdGg7XG4gIGlmIChzd2lwaW5nQ2xhc3NIYXNWYWx1ZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC5zaGFkb3dSb290ICYmIGV2ZW50UGF0aCkge1xuICAgIHRhcmdldEVsID0gZXZlbnRQYXRoWzBdO1xuICB9XG4gIGNvbnN0IG5vU3dpcGluZ1NlbGVjdG9yID0gcGFyYW1zLm5vU3dpcGluZ1NlbGVjdG9yID8gcGFyYW1zLm5vU3dpcGluZ1NlbGVjdG9yIDogYC4ke3BhcmFtcy5ub1N3aXBpbmdDbGFzc31gO1xuICBjb25zdCBpc1RhcmdldFNoYWRvdyA9ICEhKGUudGFyZ2V0ICYmIGUudGFyZ2V0LnNoYWRvd1Jvb3QpO1xuICBpZiAocGFyYW1zLm5vU3dpcGluZyAmJiAoaXNUYXJnZXRTaGFkb3cgPyBjbG9zZXN0RWxlbWVudChub1N3aXBpbmdTZWxlY3RvciwgdGFyZ2V0RWwpIDogdGFyZ2V0RWwuY2xvc2VzdChub1N3aXBpbmdTZWxlY3RvcikpKSB7XG4gICAgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLnN3aXBlSGFuZGxlcikge1xuICAgIGlmICghdGFyZ2V0RWwuY2xvc2VzdChwYXJhbXMuc3dpcGVIYW5kbGVyKSkgcmV0dXJuO1xuICB9XG4gIHRvdWNoZXMuY3VycmVudFggPSBlLnBhZ2VYO1xuICB0b3VjaGVzLmN1cnJlbnRZID0gZS5wYWdlWTtcbiAgY29uc3Qgc3RhcnRYID0gdG91Y2hlcy5jdXJyZW50WDtcbiAgY29uc3Qgc3RhcnRZID0gdG91Y2hlcy5jdXJyZW50WTtcbiAgaWYgKCFwcmV2ZW50RWRnZVN3aXBlKHN3aXBlciwgZSwgc3RhcnRYKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICBpc1RvdWNoZWQ6IHRydWUsXG4gICAgaXNNb3ZlZDogZmFsc2UsXG4gICAgYWxsb3dUb3VjaENhbGxiYWNrczogdHJ1ZSxcbiAgICBpc1Njcm9sbGluZzogdm9pZCAwLFxuICAgIHN0YXJ0TW92aW5nOiB2b2lkIDBcbiAgfSk7XG4gIHRvdWNoZXMuc3RhcnRYID0gc3RhcnRYO1xuICB0b3VjaGVzLnN0YXJ0WSA9IHN0YXJ0WTtcbiAgZGF0YS50b3VjaFN0YXJ0VGltZSA9IG5vdygpO1xuICBzd2lwZXIuYWxsb3dDbGljayA9IHRydWU7XG4gIHN3aXBlci51cGRhdGVTaXplKCk7XG4gIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9IHZvaWQgMDtcbiAgaWYgKHBhcmFtcy50aHJlc2hvbGQgPiAwKSBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSA9IGZhbHNlO1xuICBsZXQgcHJldmVudERlZmF1bHQgPSB0cnVlO1xuICBpZiAodGFyZ2V0RWwubWF0Y2hlcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSkge1xuICAgIHByZXZlbnREZWZhdWx0ID0gZmFsc2U7XG4gICAgaWYgKHRhcmdldEVsLm5vZGVOYW1lID09PSBcIlNFTEVDVFwiKSB7XG4gICAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQubWF0Y2hlcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSAmJiBkb2N1bWVudDIuYWN0aXZlRWxlbWVudCAhPT0gdGFyZ2V0RWwgJiYgKGUucG9pbnRlclR5cGUgPT09IFwibW91c2VcIiB8fCBlLnBvaW50ZXJUeXBlICE9PSBcIm1vdXNlXCIgJiYgIXRhcmdldEVsLm1hdGNoZXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykpKSB7XG4gICAgZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICB9XG4gIGNvbnN0IHNob3VsZFByZXZlbnREZWZhdWx0ID0gcHJldmVudERlZmF1bHQgJiYgc3dpcGVyLmFsbG93VG91Y2hNb3ZlICYmIHBhcmFtcy50b3VjaFN0YXJ0UHJldmVudERlZmF1bHQ7XG4gIGlmICgocGFyYW1zLnRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0IHx8IHNob3VsZFByZXZlbnREZWZhdWx0KSAmJiAhdGFyZ2V0RWwuaXNDb250ZW50RWRpdGFibGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiBzd2lwZXIuZnJlZU1vZGUgJiYgc3dpcGVyLmFuaW1hdGluZyAmJiAhcGFyYW1zLmNzc01vZGUpIHtcbiAgICBzd2lwZXIuZnJlZU1vZGUub25Ub3VjaFN0YXJ0KCk7XG4gIH1cbiAgc3dpcGVyLmVtaXQoXCJ0b3VjaFN0YXJ0XCIsIGUpO1xufVxuZnVuY3Rpb24gb25Ub3VjaE1vdmUoZXZlbnQyKSB7XG4gIGNvbnN0IGRvY3VtZW50MiA9IGdldERvY3VtZW50KCk7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IGRhdGEgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHRvdWNoZXMsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgZW5hYmxlZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQpIHJldHVybjtcbiAgaWYgKCFwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiBldmVudDIucG9pbnRlclR5cGUgPT09IFwibW91c2VcIikgcmV0dXJuO1xuICBsZXQgZSA9IGV2ZW50MjtcbiAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgaWYgKGUudHlwZSA9PT0gXCJwb2ludGVybW92ZVwiKSB7XG4gICAgaWYgKGRhdGEudG91Y2hJZCAhPT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IGlkID0gZS5wb2ludGVySWQ7XG4gICAgaWYgKGlkICE9PSBkYXRhLnBvaW50ZXJJZCkgcmV0dXJuO1xuICB9XG4gIGxldCB0YXJnZXRUb3VjaDtcbiAgaWYgKGUudHlwZSA9PT0gXCJ0b3VjaG1vdmVcIikge1xuICAgIHRhcmdldFRvdWNoID0gWy4uLmUuY2hhbmdlZFRvdWNoZXNdLmZpbHRlcigodCkgPT4gdC5pZGVudGlmaWVyID09PSBkYXRhLnRvdWNoSWQpWzBdO1xuICAgIGlmICghdGFyZ2V0VG91Y2ggfHwgdGFyZ2V0VG91Y2guaWRlbnRpZmllciAhPT0gZGF0YS50b3VjaElkKSByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0VG91Y2ggPSBlO1xuICB9XG4gIGlmICghZGF0YS5pc1RvdWNoZWQpIHtcbiAgICBpZiAoZGF0YS5zdGFydE1vdmluZyAmJiBkYXRhLmlzU2Nyb2xsaW5nKSB7XG4gICAgICBzd2lwZXIuZW1pdChcInRvdWNoTW92ZU9wcG9zaXRlXCIsIGUpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGFnZVggPSB0YXJnZXRUb3VjaC5wYWdlWDtcbiAgY29uc3QgcGFnZVkgPSB0YXJnZXRUb3VjaC5wYWdlWTtcbiAgaWYgKGUucHJldmVudGVkQnlOZXN0ZWRTd2lwZXIpIHtcbiAgICB0b3VjaGVzLnN0YXJ0WCA9IHBhZ2VYO1xuICAgIHRvdWNoZXMuc3RhcnRZID0gcGFnZVk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghc3dpcGVyLmFsbG93VG91Y2hNb3ZlKSB7XG4gICAgaWYgKCFlLnRhcmdldC5tYXRjaGVzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpKSB7XG4gICAgICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZGF0YS5pc1RvdWNoZWQpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odG91Y2hlcywge1xuICAgICAgICBzdGFydFg6IHBhZ2VYLFxuICAgICAgICBzdGFydFk6IHBhZ2VZLFxuICAgICAgICBjdXJyZW50WDogcGFnZVgsXG4gICAgICAgIGN1cnJlbnRZOiBwYWdlWVxuICAgICAgfSk7XG4gICAgICBkYXRhLnRvdWNoU3RhcnRUaW1lID0gbm93KCk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLnRvdWNoUmVsZWFzZU9uRWRnZXMgJiYgIXBhcmFtcy5sb29wKSB7XG4gICAgaWYgKHN3aXBlci5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgIGlmIChwYWdlWSA8IHRvdWNoZXMuc3RhcnRZICYmIHN3aXBlci50cmFuc2xhdGUgPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIHx8IHBhZ2VZID4gdG91Y2hlcy5zdGFydFkgJiYgc3dpcGVyLnRyYW5zbGF0ZSA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhZ2VYIDwgdG91Y2hlcy5zdGFydFggJiYgc3dpcGVyLnRyYW5zbGF0ZSA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgfHwgcGFnZVggPiB0b3VjaGVzLnN0YXJ0WCAmJiBzd2lwZXIudHJhbnNsYXRlID49IHN3aXBlci5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpZiAoZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQubWF0Y2hlcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSAmJiBkb2N1bWVudDIuYWN0aXZlRWxlbWVudCAhPT0gZS50YXJnZXQgJiYgZS5wb2ludGVyVHlwZSAhPT0gXCJtb3VzZVwiKSB7XG4gICAgZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICB9XG4gIGlmIChkb2N1bWVudDIuYWN0aXZlRWxlbWVudCkge1xuICAgIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQgJiYgZS50YXJnZXQubWF0Y2hlcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSkge1xuICAgICAgZGF0YS5pc01vdmVkID0gdHJ1ZTtcbiAgICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGlmIChkYXRhLmFsbG93VG91Y2hDYWxsYmFja3MpIHtcbiAgICBzd2lwZXIuZW1pdChcInRvdWNoTW92ZVwiLCBlKTtcbiAgfVxuICB0b3VjaGVzLnByZXZpb3VzWCA9IHRvdWNoZXMuY3VycmVudFg7XG4gIHRvdWNoZXMucHJldmlvdXNZID0gdG91Y2hlcy5jdXJyZW50WTtcbiAgdG91Y2hlcy5jdXJyZW50WCA9IHBhZ2VYO1xuICB0b3VjaGVzLmN1cnJlbnRZID0gcGFnZVk7XG4gIGNvbnN0IGRpZmZYID0gdG91Y2hlcy5jdXJyZW50WCAtIHRvdWNoZXMuc3RhcnRYO1xuICBjb25zdCBkaWZmWSA9IHRvdWNoZXMuY3VycmVudFkgLSB0b3VjaGVzLnN0YXJ0WTtcbiAgaWYgKHN3aXBlci5wYXJhbXMudGhyZXNob2xkICYmIE1hdGguc3FydChkaWZmWCAqKiAyICsgZGlmZlkgKiogMikgPCBzd2lwZXIucGFyYW1zLnRocmVzaG9sZCkgcmV0dXJuO1xuICBpZiAodHlwZW9mIGRhdGEuaXNTY3JvbGxpbmcgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBsZXQgdG91Y2hBbmdsZTtcbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIHRvdWNoZXMuY3VycmVudFkgPT09IHRvdWNoZXMuc3RhcnRZIHx8IHN3aXBlci5pc1ZlcnRpY2FsKCkgJiYgdG91Y2hlcy5jdXJyZW50WCA9PT0gdG91Y2hlcy5zdGFydFgpIHtcbiAgICAgIGRhdGEuaXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRpZmZYICogZGlmZlggKyBkaWZmWSAqIGRpZmZZID49IDI1KSB7XG4gICAgICAgIHRvdWNoQW5nbGUgPSBNYXRoLmF0YW4yKE1hdGguYWJzKGRpZmZZKSwgTWF0aC5hYnMoZGlmZlgpKSAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgIGRhdGEuaXNTY3JvbGxpbmcgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB0b3VjaEFuZ2xlID4gcGFyYW1zLnRvdWNoQW5nbGUgOiA5MCAtIHRvdWNoQW5nbGUgPiBwYXJhbXMudG91Y2hBbmdsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGRhdGEuaXNTY3JvbGxpbmcpIHtcbiAgICBzd2lwZXIuZW1pdChcInRvdWNoTW92ZU9wcG9zaXRlXCIsIGUpO1xuICB9XG4gIGlmICh0eXBlb2YgZGF0YS5zdGFydE1vdmluZyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGlmICh0b3VjaGVzLmN1cnJlbnRYICE9PSB0b3VjaGVzLnN0YXJ0WCB8fCB0b3VjaGVzLmN1cnJlbnRZICE9PSB0b3VjaGVzLnN0YXJ0WSkge1xuICAgICAgZGF0YS5zdGFydE1vdmluZyA9IHRydWU7XG4gICAgfVxuICB9XG4gIGlmIChkYXRhLmlzU2Nyb2xsaW5nIHx8IGUudHlwZSA9PT0gXCJ0b3VjaG1vdmVcIiAmJiBkYXRhLnByZXZlbnRUb3VjaE1vdmVGcm9tUG9pbnRlck1vdmUpIHtcbiAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWRhdGEuc3RhcnRNb3ZpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgaWYgKCFwYXJhbXMuY3NzTW9kZSAmJiBlLmNhbmNlbGFibGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKHBhcmFtcy50b3VjaE1vdmVTdG9wUHJvcGFnYXRpb24gJiYgIXBhcmFtcy5uZXN0ZWQpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG4gIGxldCBkaWZmID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gZGlmZlggOiBkaWZmWTtcbiAgbGV0IHRvdWNoZXNEaWZmID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hlcy5jdXJyZW50WCAtIHRvdWNoZXMucHJldmlvdXNYIDogdG91Y2hlcy5jdXJyZW50WSAtIHRvdWNoZXMucHJldmlvdXNZO1xuICBpZiAocGFyYW1zLm9uZVdheU1vdmVtZW50KSB7XG4gICAgZGlmZiA9IE1hdGguYWJzKGRpZmYpICogKHJ0bCA/IDEgOiAtMSk7XG4gICAgdG91Y2hlc0RpZmYgPSBNYXRoLmFicyh0b3VjaGVzRGlmZikgKiAocnRsID8gMSA6IC0xKTtcbiAgfVxuICB0b3VjaGVzLmRpZmYgPSBkaWZmO1xuICBkaWZmICo9IHBhcmFtcy50b3VjaFJhdGlvO1xuICBpZiAocnRsKSB7XG4gICAgZGlmZiA9IC1kaWZmO1xuICAgIHRvdWNoZXNEaWZmID0gLXRvdWNoZXNEaWZmO1xuICB9XG4gIGNvbnN0IHByZXZUb3VjaGVzRGlyZWN0aW9uID0gc3dpcGVyLnRvdWNoZXNEaXJlY3Rpb247XG4gIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9IGRpZmYgPiAwID8gXCJwcmV2XCIgOiBcIm5leHRcIjtcbiAgc3dpcGVyLnRvdWNoZXNEaXJlY3Rpb24gPSB0b3VjaGVzRGlmZiA+IDAgPyBcInByZXZcIiA6IFwibmV4dFwiO1xuICBjb25zdCBpc0xvb3AgPSBzd2lwZXIucGFyYW1zLmxvb3AgJiYgIXBhcmFtcy5jc3NNb2RlO1xuICBjb25zdCBhbGxvd0xvb3BGaXggPSBzd2lwZXIudG91Y2hlc0RpcmVjdGlvbiA9PT0gXCJuZXh0XCIgJiYgc3dpcGVyLmFsbG93U2xpZGVOZXh0IHx8IHN3aXBlci50b3VjaGVzRGlyZWN0aW9uID09PSBcInByZXZcIiAmJiBzd2lwZXIuYWxsb3dTbGlkZVByZXY7XG4gIGlmICghZGF0YS5pc01vdmVkKSB7XG4gICAgaWYgKGlzTG9vcCAmJiBhbGxvd0xvb3BGaXgpIHtcbiAgICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgICAgZGlyZWN0aW9uOiBzd2lwZXIuc3dpcGVEaXJlY3Rpb25cbiAgICAgIH0pO1xuICAgIH1cbiAgICBkYXRhLnN0YXJ0VHJhbnNsYXRlID0gc3dpcGVyLmdldFRyYW5zbGF0ZSgpO1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuICAgIGlmIChzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICBjb25zdCBldnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KFwidHJhbnNpdGlvbmVuZFwiLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIGJ5U3dpcGVyVG91Y2hNb3ZlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc3dpcGVyLndyYXBwZXJFbC5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICAgIGRhdGEuYWxsb3dNb21lbnR1bUJvdW5jZSA9IGZhbHNlO1xuICAgIGlmIChwYXJhbXMuZ3JhYkN1cnNvciAmJiAoc3dpcGVyLmFsbG93U2xpZGVOZXh0ID09PSB0cnVlIHx8IHN3aXBlci5hbGxvd1NsaWRlUHJldiA9PT0gdHJ1ZSkpIHtcbiAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKHRydWUpO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdChcInNsaWRlckZpcnN0TW92ZVwiLCBlKTtcbiAgfVxuICBsZXQgbG9vcEZpeGVkO1xuICAoLyogQF9fUFVSRV9fICovIG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgaWYgKGRhdGEuaXNNb3ZlZCAmJiBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSAmJiBwcmV2VG91Y2hlc0RpcmVjdGlvbiAhPT0gc3dpcGVyLnRvdWNoZXNEaXJlY3Rpb24gJiYgaXNMb29wICYmIGFsbG93TG9vcEZpeCAmJiBNYXRoLmFicyhkaWZmKSA+PSAxKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0b3VjaGVzLCB7XG4gICAgICBzdGFydFg6IHBhZ2VYLFxuICAgICAgc3RhcnRZOiBwYWdlWSxcbiAgICAgIGN1cnJlbnRYOiBwYWdlWCxcbiAgICAgIGN1cnJlbnRZOiBwYWdlWSxcbiAgICAgIHN0YXJ0VHJhbnNsYXRlOiBkYXRhLmN1cnJlbnRUcmFuc2xhdGVcbiAgICB9KTtcbiAgICBkYXRhLmxvb3BTd2FwUmVzZXQgPSB0cnVlO1xuICAgIGRhdGEuc3RhcnRUcmFuc2xhdGUgPSBkYXRhLmN1cnJlbnRUcmFuc2xhdGU7XG4gICAgcmV0dXJuO1xuICB9XG4gIHN3aXBlci5lbWl0KFwic2xpZGVyTW92ZVwiLCBlKTtcbiAgZGF0YS5pc01vdmVkID0gdHJ1ZTtcbiAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGlmZiArIGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gIGxldCBkaXNhYmxlUGFyZW50U3dpcGVyID0gdHJ1ZTtcbiAgbGV0IHJlc2lzdGFuY2VSYXRpbyA9IHBhcmFtcy5yZXNpc3RhbmNlUmF0aW87XG4gIGlmIChwYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcykge1xuICAgIHJlc2lzdGFuY2VSYXRpbyA9IDA7XG4gIH1cbiAgaWYgKGRpZmYgPiAwKSB7XG4gICAgaWYgKGlzTG9vcCAmJiBhbGxvd0xvb3BGaXggJiYgIWxvb3BGaXhlZCAmJiBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIC0gc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtzd2lwZXIuYWN0aXZlSW5kZXggKyAxXSAtIChwYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gXCJhdXRvXCIgJiYgc3dpcGVyLnNsaWRlcy5sZW5ndGggLSBwYXJhbXMuc2xpZGVzUGVyVmlldyA+PSAyID8gc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtzd2lwZXIuYWN0aXZlSW5kZXggKyAxXSArIHN3aXBlci5wYXJhbXMuc3BhY2VCZXR3ZWVuIDogMCkgLSBzd2lwZXIucGFyYW1zLnNwYWNlQmV0d2VlbiA6IHN3aXBlci5taW5UcmFuc2xhdGUoKSkpIHtcbiAgICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgICAgZGlyZWN0aW9uOiBcInByZXZcIixcbiAgICAgICAgc2V0VHJhbnNsYXRlOiB0cnVlLFxuICAgICAgICBhY3RpdmVTbGlkZUluZGV4OiAwXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGRhdGEuY3VycmVudFRyYW5zbGF0ZSA+IHN3aXBlci5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IGZhbHNlO1xuICAgICAgaWYgKHBhcmFtcy5yZXNpc3RhbmNlKSB7XG4gICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci5taW5UcmFuc2xhdGUoKSAtIDEgKyAoLXN3aXBlci5taW5UcmFuc2xhdGUoKSArIGRhdGEuc3RhcnRUcmFuc2xhdGUgKyBkaWZmKSAqKiByZXNpc3RhbmNlUmF0aW87XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGRpZmYgPCAwKSB7XG4gICAgaWYgKGlzTG9vcCAmJiBhbGxvd0xvb3BGaXggJiYgIWxvb3BGaXhlZCAmJiBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCAocGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gc3dpcGVyLm1heFRyYW5zbGF0ZSgpICsgc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkLmxlbmd0aCAtIDFdICsgc3dpcGVyLnBhcmFtcy5zcGFjZUJldHdlZW4gKyAocGFyYW1zLnNsaWRlc1BlclZpZXcgIT09IFwiYXV0b1wiICYmIHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPj0gMiA/IHN3aXBlci5zbGlkZXNTaXplc0dyaWRbc3dpcGVyLnNsaWRlc1NpemVzR3JpZC5sZW5ndGggLSAxXSArIHN3aXBlci5wYXJhbXMuc3BhY2VCZXR3ZWVuIDogMCkgOiBzd2lwZXIubWF4VHJhbnNsYXRlKCkpKSB7XG4gICAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICAgIGRpcmVjdGlvbjogXCJuZXh0XCIsXG4gICAgICAgIHNldFRyYW5zbGF0ZTogdHJ1ZSxcbiAgICAgICAgYWN0aXZlU2xpZGVJbmRleDogc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiID8gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCkgOiBNYXRoLmNlaWwocGFyc2VGbG9hdChwYXJhbXMuc2xpZGVzUGVyVmlldywgMTApKSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZGF0YS5jdXJyZW50VHJhbnNsYXRlIDwgc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gZmFsc2U7XG4gICAgICBpZiAocGFyYW1zLnJlc2lzdGFuY2UpIHtcbiAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpICsgMSAtIChzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBkYXRhLnN0YXJ0VHJhbnNsYXRlIC0gZGlmZikgKiogcmVzaXN0YW5jZVJhdGlvO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoZGlzYWJsZVBhcmVudFN3aXBlcikge1xuICAgIGUucHJldmVudGVkQnlOZXN0ZWRTd2lwZXIgPSB0cnVlO1xuICB9XG4gIGlmICghc3dpcGVyLmFsbG93U2xpZGVOZXh0ICYmIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gXCJuZXh0XCIgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlIDwgZGF0YS5zdGFydFRyYW5zbGF0ZSkge1xuICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gIH1cbiAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSBcInByZXZcIiAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPiBkYXRhLnN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgfVxuICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlUHJldiAmJiAhc3dpcGVyLmFsbG93U2xpZGVOZXh0KSB7XG4gICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgfVxuICBpZiAocGFyYW1zLnRocmVzaG9sZCA+IDApIHtcbiAgICBpZiAoTWF0aC5hYnMoZGlmZikgPiBwYXJhbXMudGhyZXNob2xkIHx8IGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlKSB7XG4gICAgICBpZiAoIWRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlKSB7XG4gICAgICAgIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlID0gdHJ1ZTtcbiAgICAgICAgdG91Y2hlcy5zdGFydFggPSB0b3VjaGVzLmN1cnJlbnRYO1xuICAgICAgICB0b3VjaGVzLnN0YXJ0WSA9IHRvdWNoZXMuY3VycmVudFk7XG4gICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gICAgICAgIHRvdWNoZXMuZGlmZiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHRvdWNoZXMuY3VycmVudFggLSB0b3VjaGVzLnN0YXJ0WCA6IHRvdWNoZXMuY3VycmVudFkgLSB0b3VjaGVzLnN0YXJ0WTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpZiAoIXBhcmFtcy5mb2xsb3dGaW5nZXIgfHwgcGFyYW1zLmNzc01vZGUpIHJldHVybjtcbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiBzd2lwZXIuZnJlZU1vZGUgfHwgcGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MpIHtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICB9XG4gIGlmIChwYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgc3dpcGVyLmZyZWVNb2RlKSB7XG4gICAgc3dpcGVyLmZyZWVNb2RlLm9uVG91Y2hNb3ZlKCk7XG4gIH1cbiAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKGRhdGEuY3VycmVudFRyYW5zbGF0ZSk7XG4gIHN3aXBlci5zZXRUcmFuc2xhdGUoZGF0YS5jdXJyZW50VHJhbnNsYXRlKTtcbn1cbmZ1bmN0aW9uIG9uVG91Y2hFbmQoZXZlbnQyKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IGRhdGEgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhO1xuICBsZXQgZSA9IGV2ZW50MjtcbiAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgbGV0IHRhcmdldFRvdWNoO1xuICBjb25zdCBpc1RvdWNoRXZlbnQgPSBlLnR5cGUgPT09IFwidG91Y2hlbmRcIiB8fCBlLnR5cGUgPT09IFwidG91Y2hjYW5jZWxcIjtcbiAgaWYgKCFpc1RvdWNoRXZlbnQpIHtcbiAgICBpZiAoZGF0YS50b3VjaElkICE9PSBudWxsKSByZXR1cm47XG4gICAgaWYgKGUucG9pbnRlcklkICE9PSBkYXRhLnBvaW50ZXJJZCkgcmV0dXJuO1xuICAgIHRhcmdldFRvdWNoID0gZTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXRUb3VjaCA9IFsuLi5lLmNoYW5nZWRUb3VjaGVzXS5maWx0ZXIoKHQpID0+IHQuaWRlbnRpZmllciA9PT0gZGF0YS50b3VjaElkKVswXTtcbiAgICBpZiAoIXRhcmdldFRvdWNoIHx8IHRhcmdldFRvdWNoLmlkZW50aWZpZXIgIT09IGRhdGEudG91Y2hJZCkgcmV0dXJuO1xuICB9XG4gIGlmIChbXCJwb2ludGVyY2FuY2VsXCIsIFwicG9pbnRlcm91dFwiLCBcInBvaW50ZXJsZWF2ZVwiLCBcImNvbnRleHRtZW51XCJdLmluY2x1ZGVzKGUudHlwZSkpIHtcbiAgICBjb25zdCBwcm9jZWVkID0gW1wicG9pbnRlcmNhbmNlbFwiLCBcImNvbnRleHRtZW51XCJdLmluY2x1ZGVzKGUudHlwZSkgJiYgKHN3aXBlci5icm93c2VyLmlzU2FmYXJpIHx8IHN3aXBlci5icm93c2VyLmlzV2ViVmlldyk7XG4gICAgaWYgKCFwcm9jZWVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGRhdGEucG9pbnRlcklkID0gbnVsbDtcbiAgZGF0YS50b3VjaElkID0gbnVsbDtcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICB0b3VjaGVzLFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHNsaWRlc0dyaWQsXG4gICAgZW5hYmxlZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQpIHJldHVybjtcbiAgaWYgKCFwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiBlLnBvaW50ZXJUeXBlID09PSBcIm1vdXNlXCIpIHJldHVybjtcbiAgaWYgKGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcykge1xuICAgIHN3aXBlci5lbWl0KFwidG91Y2hFbmRcIiwgZSk7XG4gIH1cbiAgZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzID0gZmFsc2U7XG4gIGlmICghZGF0YS5pc1RvdWNoZWQpIHtcbiAgICBpZiAoZGF0YS5pc01vdmVkICYmIHBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcihmYWxzZSk7XG4gICAgfVxuICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHBhcmFtcy5ncmFiQ3Vyc29yICYmIGRhdGEuaXNNb3ZlZCAmJiBkYXRhLmlzVG91Y2hlZCAmJiAoc3dpcGVyLmFsbG93U2xpZGVOZXh0ID09PSB0cnVlIHx8IHN3aXBlci5hbGxvd1NsaWRlUHJldiA9PT0gdHJ1ZSkpIHtcbiAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcihmYWxzZSk7XG4gIH1cbiAgY29uc3QgdG91Y2hFbmRUaW1lID0gbm93KCk7XG4gIGNvbnN0IHRpbWVEaWZmID0gdG91Y2hFbmRUaW1lIC0gZGF0YS50b3VjaFN0YXJ0VGltZTtcbiAgaWYgKHN3aXBlci5hbGxvd0NsaWNrKSB7XG4gICAgY29uc3QgcGF0aFRyZWUgPSBlLnBhdGggfHwgZS5jb21wb3NlZFBhdGggJiYgZS5jb21wb3NlZFBhdGgoKTtcbiAgICBzd2lwZXIudXBkYXRlQ2xpY2tlZFNsaWRlKHBhdGhUcmVlICYmIHBhdGhUcmVlWzBdIHx8IGUudGFyZ2V0LCBwYXRoVHJlZSk7XG4gICAgc3dpcGVyLmVtaXQoXCJ0YXAgY2xpY2tcIiwgZSk7XG4gICAgaWYgKHRpbWVEaWZmIDwgMzAwICYmIHRvdWNoRW5kVGltZSAtIGRhdGEubGFzdENsaWNrVGltZSA8IDMwMCkge1xuICAgICAgc3dpcGVyLmVtaXQoXCJkb3VibGVUYXAgZG91YmxlQ2xpY2tcIiwgZSk7XG4gICAgfVxuICB9XG4gIGRhdGEubGFzdENsaWNrVGltZSA9IG5vdygpO1xuICBuZXh0VGljaygoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIuZGVzdHJveWVkKSBzd2lwZXIuYWxsb3dDbGljayA9IHRydWU7XG4gIH0pO1xuICBpZiAoIWRhdGEuaXNUb3VjaGVkIHx8ICFkYXRhLmlzTW92ZWQgfHwgIXN3aXBlci5zd2lwZURpcmVjdGlvbiB8fCB0b3VjaGVzLmRpZmYgPT09IDAgJiYgIWRhdGEubG9vcFN3YXBSZXNldCB8fCBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPT09IGRhdGEuc3RhcnRUcmFuc2xhdGUgJiYgIWRhdGEubG9vcFN3YXBSZXNldCkge1xuICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgZGF0YS5zdGFydE1vdmluZyA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgZGF0YS5zdGFydE1vdmluZyA9IGZhbHNlO1xuICBsZXQgY3VycmVudFBvcztcbiAgaWYgKHBhcmFtcy5mb2xsb3dGaW5nZXIpIHtcbiAgICBjdXJyZW50UG9zID0gcnRsID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRQb3MgPSAtZGF0YS5jdXJyZW50VHJhbnNsYXRlO1xuICB9XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkKSB7XG4gICAgc3dpcGVyLmZyZWVNb2RlLm9uVG91Y2hFbmQoe1xuICAgICAgY3VycmVudFBvc1xuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBzd2lwZVRvTGFzdCA9IGN1cnJlbnRQb3MgPj0gLXN3aXBlci5tYXhUcmFuc2xhdGUoKSAmJiAhc3dpcGVyLnBhcmFtcy5sb29wO1xuICBsZXQgc3RvcEluZGV4ID0gMDtcbiAgbGV0IGdyb3VwU2l6ZSA9IHN3aXBlci5zbGlkZXNTaXplc0dyaWRbMF07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gaSA8IHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAgPyAxIDogcGFyYW1zLnNsaWRlc1Blckdyb3VwKSB7XG4gICAgY29uc3QgaW5jcmVtZW50MiA9IGkgPCBwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwIC0gMSA/IDEgOiBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgaWYgKHR5cGVvZiBzbGlkZXNHcmlkW2kgKyBpbmNyZW1lbnQyXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKHN3aXBlVG9MYXN0IHx8IGN1cnJlbnRQb3MgPj0gc2xpZGVzR3JpZFtpXSAmJiBjdXJyZW50UG9zIDwgc2xpZGVzR3JpZFtpICsgaW5jcmVtZW50Ml0pIHtcbiAgICAgICAgc3RvcEluZGV4ID0gaTtcbiAgICAgICAgZ3JvdXBTaXplID0gc2xpZGVzR3JpZFtpICsgaW5jcmVtZW50Ml0gLSBzbGlkZXNHcmlkW2ldO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3dpcGVUb0xhc3QgfHwgY3VycmVudFBvcyA+PSBzbGlkZXNHcmlkW2ldKSB7XG4gICAgICBzdG9wSW5kZXggPSBpO1xuICAgICAgZ3JvdXBTaXplID0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDFdIC0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDJdO1xuICAgIH1cbiAgfVxuICBsZXQgcmV3aW5kRmlyc3RJbmRleCA9IG51bGw7XG4gIGxldCByZXdpbmRMYXN0SW5kZXggPSBudWxsO1xuICBpZiAocGFyYW1zLnJld2luZCkge1xuICAgIGlmIChzd2lwZXIuaXNCZWdpbm5pbmcpIHtcbiAgICAgIHJld2luZExhc3RJbmRleCA9IHBhcmFtcy52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgJiYgc3dpcGVyLnZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIC0gMSA6IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2UgaWYgKHN3aXBlci5pc0VuZCkge1xuICAgICAgcmV3aW5kRmlyc3RJbmRleCA9IDA7XG4gICAgfVxuICB9XG4gIGNvbnN0IHJhdGlvID0gKGN1cnJlbnRQb3MgLSBzbGlkZXNHcmlkW3N0b3BJbmRleF0pIC8gZ3JvdXBTaXplO1xuICBjb25zdCBpbmNyZW1lbnQgPSBzdG9wSW5kZXggPCBwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwIC0gMSA/IDEgOiBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gIGlmICh0aW1lRGlmZiA+IHBhcmFtcy5sb25nU3dpcGVzTXMpIHtcbiAgICBpZiAoIXBhcmFtcy5sb25nU3dpcGVzKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSBcIm5leHRcIikge1xuICAgICAgaWYgKHJhdGlvID49IHBhcmFtcy5sb25nU3dpcGVzUmF0aW8pIHN3aXBlci5zbGlkZVRvKHBhcmFtcy5yZXdpbmQgJiYgc3dpcGVyLmlzRW5kID8gcmV3aW5kRmlyc3RJbmRleCA6IHN0b3BJbmRleCArIGluY3JlbWVudCk7XG4gICAgICBlbHNlIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgfVxuICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09IFwicHJldlwiKSB7XG4gICAgICBpZiAocmF0aW8gPiAxIC0gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXggKyBpbmNyZW1lbnQpO1xuICAgICAgfSBlbHNlIGlmIChyZXdpbmRMYXN0SW5kZXggIT09IG51bGwgJiYgcmF0aW8gPCAwICYmIE1hdGguYWJzKHJhdGlvKSA+IHBhcmFtcy5sb25nU3dpcGVzUmF0aW8pIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8ocmV3aW5kTGFzdEluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghcGFyYW1zLnNob3J0U3dpcGVzKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpc05hdkJ1dHRvblRhcmdldCA9IHN3aXBlci5uYXZpZ2F0aW9uICYmIChlLnRhcmdldCA9PT0gc3dpcGVyLm5hdmlnYXRpb24ubmV4dEVsIHx8IGUudGFyZ2V0ID09PSBzd2lwZXIubmF2aWdhdGlvbi5wcmV2RWwpO1xuICAgIGlmICghaXNOYXZCdXR0b25UYXJnZXQpIHtcbiAgICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09IFwibmV4dFwiKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHJld2luZEZpcnN0SW5kZXggIT09IG51bGwgPyByZXdpbmRGaXJzdEluZGV4IDogc3RvcEluZGV4ICsgaW5jcmVtZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09IFwicHJldlwiKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHJld2luZExhc3RJbmRleCAhPT0gbnVsbCA/IHJld2luZExhc3RJbmRleCA6IHN0b3BJbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldCA9PT0gc3dpcGVyLm5hdmlnYXRpb24ubmV4dEVsKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXggKyBpbmNyZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgZWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKGVsICYmIGVsLm9mZnNldFdpZHRoID09PSAwKSByZXR1cm47XG4gIGlmIChwYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICBzd2lwZXIuc2V0QnJlYWtwb2ludCgpO1xuICB9XG4gIGNvbnN0IHtcbiAgICBhbGxvd1NsaWRlTmV4dCxcbiAgICBhbGxvd1NsaWRlUHJldixcbiAgICBzbmFwR3JpZFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gdHJ1ZTtcbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gdHJ1ZTtcbiAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICBjb25zdCBpc1ZpcnR1YWxMb29wID0gaXNWaXJ0dWFsICYmIHBhcmFtcy5sb29wO1xuICBpZiAoKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIiB8fCBwYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpICYmIHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmICFpc1ZpcnR1YWxMb29wKSB7XG4gICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCAmJiAhaXNWaXJ0dWFsKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUb0xvb3Aoc3dpcGVyLnJlYWxJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG4gIH1cbiAgaWYgKHN3aXBlci5hdXRvcGxheSAmJiBzd2lwZXIuYXV0b3BsYXkucnVubmluZyAmJiBzd2lwZXIuYXV0b3BsYXkucGF1c2VkKSB7XG4gICAgY2xlYXJUaW1lb3V0KHN3aXBlci5hdXRvcGxheS5yZXNpemVUaW1lb3V0KTtcbiAgICBzd2lwZXIuYXV0b3BsYXkucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHN3aXBlci5hdXRvcGxheSAmJiBzd2lwZXIuYXV0b3BsYXkucnVubmluZyAmJiBzd2lwZXIuYXV0b3BsYXkucGF1c2VkKSB7XG4gICAgICAgIHN3aXBlci5hdXRvcGxheS5yZXN1bWUoKTtcbiAgICAgIH1cbiAgICB9LCA1MDApO1xuICB9XG4gIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IGFsbG93U2xpZGVQcmV2O1xuICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSBhbGxvd1NsaWRlTmV4dDtcbiAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzbmFwR3JpZCAhPT0gc3dpcGVyLnNuYXBHcmlkKSB7XG4gICAgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgfVxufVxuZnVuY3Rpb24gb25DbGljayhlKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgaWYgKCFzd2lwZXIuYWxsb3dDbGljaykge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnByZXZlbnRDbGlja3MpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24gJiYgc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHdyYXBwZXJFbCxcbiAgICBydGxUcmFuc2xhdGUsXG4gICAgZW5hYmxlZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQpIHJldHVybjtcbiAgc3dpcGVyLnByZXZpb3VzVHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgIHN3aXBlci50cmFuc2xhdGUgPSAtd3JhcHBlckVsLnNjcm9sbExlZnQ7XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLnRyYW5zbGF0ZSA9IC13cmFwcGVyRWwuc2Nyb2xsVG9wO1xuICB9XG4gIGlmIChzd2lwZXIudHJhbnNsYXRlID09PSAwKSBzd2lwZXIudHJhbnNsYXRlID0gMDtcbiAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gIGxldCBuZXdQcm9ncmVzcztcbiAgY29uc3QgdHJhbnNsYXRlc0RpZmYgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgIG5ld1Byb2dyZXNzID0gMDtcbiAgfSBlbHNlIHtcbiAgICBuZXdQcm9ncmVzcyA9IChzd2lwZXIudHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAvIHRyYW5zbGF0ZXNEaWZmO1xuICB9XG4gIGlmIChuZXdQcm9ncmVzcyAhPT0gc3dpcGVyLnByb2dyZXNzKSB7XG4gICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHJ0bFRyYW5zbGF0ZSA/IC1zd2lwZXIudHJhbnNsYXRlIDogc3dpcGVyLnRyYW5zbGF0ZSk7XG4gIH1cbiAgc3dpcGVyLmVtaXQoXCJzZXRUcmFuc2xhdGVcIiwgc3dpcGVyLnRyYW5zbGF0ZSwgZmFsc2UpO1xufVxuZnVuY3Rpb24gb25Mb2FkKGUpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgcHJvY2Vzc0xhenlQcmVsb2FkZXIoc3dpcGVyLCBlLnRhcmdldCk7XG4gIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUgfHwgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSBcImF1dG9cIiAmJiAhc3dpcGVyLnBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHN3aXBlci51cGRhdGUoKTtcbn1cbmZ1bmN0aW9uIG9uRG9jdW1lbnRUb3VjaFN0YXJ0KCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoc3dpcGVyLmRvY3VtZW50VG91Y2hIYW5kbGVyUHJvY2VlZGVkKSByZXR1cm47XG4gIHN3aXBlci5kb2N1bWVudFRvdWNoSGFuZGxlclByb2NlZWRlZCA9IHRydWU7XG4gIGlmIChzd2lwZXIucGFyYW1zLnRvdWNoUmVsZWFzZU9uRWRnZXMpIHtcbiAgICBzd2lwZXIuZWwuc3R5bGUudG91Y2hBY3Rpb24gPSBcImF1dG9cIjtcbiAgfVxufVxuZnVuY3Rpb24gYXR0YWNoRXZlbnRzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIHN3aXBlci5vblRvdWNoU3RhcnQgPSBvblRvdWNoU3RhcnQuYmluZChzd2lwZXIpO1xuICBzd2lwZXIub25Ub3VjaE1vdmUgPSBvblRvdWNoTW92ZS5iaW5kKHN3aXBlcik7XG4gIHN3aXBlci5vblRvdWNoRW5kID0gb25Ub3VjaEVuZC5iaW5kKHN3aXBlcik7XG4gIHN3aXBlci5vbkRvY3VtZW50VG91Y2hTdGFydCA9IG9uRG9jdW1lbnRUb3VjaFN0YXJ0LmJpbmQoc3dpcGVyKTtcbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgc3dpcGVyLm9uU2Nyb2xsID0gb25TY3JvbGwuYmluZChzd2lwZXIpO1xuICB9XG4gIHN3aXBlci5vbkNsaWNrID0gb25DbGljay5iaW5kKHN3aXBlcik7XG4gIHN3aXBlci5vbkxvYWQgPSBvbkxvYWQuYmluZChzd2lwZXIpO1xuICBldmVudHMoc3dpcGVyLCBcIm9uXCIpO1xufVxuZnVuY3Rpb24gZGV0YWNoRXZlbnRzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBldmVudHMoc3dpcGVyLCBcIm9mZlwiKTtcbn1cbmZ1bmN0aW9uIHNldEJyZWFrcG9pbnQoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICByZWFsSW5kZXgsXG4gICAgaW5pdGlhbGl6ZWQsXG4gICAgcGFyYW1zLFxuICAgIGVsXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGJyZWFrcG9pbnRzMiA9IHBhcmFtcy5icmVha3BvaW50cztcbiAgaWYgKCFicmVha3BvaW50czIgfHwgYnJlYWtwb2ludHMyICYmIE9iamVjdC5rZXlzKGJyZWFrcG9pbnRzMikubGVuZ3RoID09PSAwKSByZXR1cm47XG4gIGNvbnN0IGJyZWFrcG9pbnQgPSBzd2lwZXIuZ2V0QnJlYWtwb2ludChicmVha3BvaW50czIsIHN3aXBlci5wYXJhbXMuYnJlYWtwb2ludHNCYXNlLCBzd2lwZXIuZWwpO1xuICBpZiAoIWJyZWFrcG9pbnQgfHwgc3dpcGVyLmN1cnJlbnRCcmVha3BvaW50ID09PSBicmVha3BvaW50KSByZXR1cm47XG4gIGNvbnN0IGJyZWFrcG9pbnRPbmx5UGFyYW1zID0gYnJlYWtwb2ludCBpbiBicmVha3BvaW50czIgPyBicmVha3BvaW50czJbYnJlYWtwb2ludF0gOiB2b2lkIDA7XG4gIGNvbnN0IGJyZWFrcG9pbnRQYXJhbXMgPSBicmVha3BvaW50T25seVBhcmFtcyB8fCBzd2lwZXIub3JpZ2luYWxQYXJhbXM7XG4gIGNvbnN0IHdhc011bHRpUm93ID0gaXNHcmlkRW5hYmxlZChzd2lwZXIsIHBhcmFtcyk7XG4gIGNvbnN0IGlzTXVsdGlSb3cgPSBpc0dyaWRFbmFibGVkKHN3aXBlciwgYnJlYWtwb2ludFBhcmFtcyk7XG4gIGNvbnN0IHdhc0dyYWJDdXJzb3IgPSBzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3I7XG4gIGNvbnN0IGlzR3JhYkN1cnNvciA9IGJyZWFrcG9pbnRQYXJhbXMuZ3JhYkN1cnNvcjtcbiAgY29uc3Qgd2FzRW5hYmxlZCA9IHBhcmFtcy5lbmFibGVkO1xuICBpZiAod2FzTXVsdGlSb3cgJiYgIWlzTXVsdGlSb3cpIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWdyaWRgLCBgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkLWNvbHVtbmApO1xuICAgIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xuICB9IGVsc2UgaWYgKCF3YXNNdWx0aVJvdyAmJiBpc011bHRpUm93KSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkYCk7XG4gICAgaWYgKGJyZWFrcG9pbnRQYXJhbXMuZ3JpZC5maWxsICYmIGJyZWFrcG9pbnRQYXJhbXMuZ3JpZC5maWxsID09PSBcImNvbHVtblwiIHx8ICFicmVha3BvaW50UGFyYW1zLmdyaWQuZmlsbCAmJiBwYXJhbXMuZ3JpZC5maWxsID09PSBcImNvbHVtblwiKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWdyaWQtY29sdW1uYCk7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xuICB9XG4gIGlmICh3YXNHcmFiQ3Vyc29yICYmICFpc0dyYWJDdXJzb3IpIHtcbiAgICBzd2lwZXIudW5zZXRHcmFiQ3Vyc29yKCk7XG4gIH0gZWxzZSBpZiAoIXdhc0dyYWJDdXJzb3IgJiYgaXNHcmFiQ3Vyc29yKSB7XG4gICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoKTtcbiAgfVxuICBbXCJuYXZpZ2F0aW9uXCIsIFwicGFnaW5hdGlvblwiLCBcInNjcm9sbGJhclwiXS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBicmVha3BvaW50UGFyYW1zW3Byb3BdID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgY29uc3Qgd2FzTW9kdWxlRW5hYmxlZCA9IHBhcmFtc1twcm9wXSAmJiBwYXJhbXNbcHJvcF0uZW5hYmxlZDtcbiAgICBjb25zdCBpc01vZHVsZUVuYWJsZWQgPSBicmVha3BvaW50UGFyYW1zW3Byb3BdICYmIGJyZWFrcG9pbnRQYXJhbXNbcHJvcF0uZW5hYmxlZDtcbiAgICBpZiAod2FzTW9kdWxlRW5hYmxlZCAmJiAhaXNNb2R1bGVFbmFibGVkKSB7XG4gICAgICBzd2lwZXJbcHJvcF0uZGlzYWJsZSgpO1xuICAgIH1cbiAgICBpZiAoIXdhc01vZHVsZUVuYWJsZWQgJiYgaXNNb2R1bGVFbmFibGVkKSB7XG4gICAgICBzd2lwZXJbcHJvcF0uZW5hYmxlKCk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgZGlyZWN0aW9uQ2hhbmdlZCA9IGJyZWFrcG9pbnRQYXJhbXMuZGlyZWN0aW9uICYmIGJyZWFrcG9pbnRQYXJhbXMuZGlyZWN0aW9uICE9PSBwYXJhbXMuZGlyZWN0aW9uO1xuICBjb25zdCBuZWVkc1JlTG9vcCA9IHBhcmFtcy5sb29wICYmIChicmVha3BvaW50UGFyYW1zLnNsaWRlc1BlclZpZXcgIT09IHBhcmFtcy5zbGlkZXNQZXJWaWV3IHx8IGRpcmVjdGlvbkNoYW5nZWQpO1xuICBjb25zdCB3YXNMb29wID0gcGFyYW1zLmxvb3A7XG4gIGlmIChkaXJlY3Rpb25DaGFuZ2VkICYmIGluaXRpYWxpemVkKSB7XG4gICAgc3dpcGVyLmNoYW5nZURpcmVjdGlvbigpO1xuICB9XG4gIGV4dGVuZDIoc3dpcGVyLnBhcmFtcywgYnJlYWtwb2ludFBhcmFtcyk7XG4gIGNvbnN0IGlzRW5hYmxlZDIgPSBzd2lwZXIucGFyYW1zLmVuYWJsZWQ7XG4gIGNvbnN0IGhhc0xvb3AgPSBzd2lwZXIucGFyYW1zLmxvb3A7XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgYWxsb3dUb3VjaE1vdmU6IHN3aXBlci5wYXJhbXMuYWxsb3dUb3VjaE1vdmUsXG4gICAgYWxsb3dTbGlkZU5leHQ6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZU5leHQsXG4gICAgYWxsb3dTbGlkZVByZXY6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZVByZXZcbiAgfSk7XG4gIGlmICh3YXNFbmFibGVkICYmICFpc0VuYWJsZWQyKSB7XG4gICAgc3dpcGVyLmRpc2FibGUoKTtcbiAgfSBlbHNlIGlmICghd2FzRW5hYmxlZCAmJiBpc0VuYWJsZWQyKSB7XG4gICAgc3dpcGVyLmVuYWJsZSgpO1xuICB9XG4gIHN3aXBlci5jdXJyZW50QnJlYWtwb2ludCA9IGJyZWFrcG9pbnQ7XG4gIHN3aXBlci5lbWl0KFwiX2JlZm9yZUJyZWFrcG9pbnRcIiwgYnJlYWtwb2ludFBhcmFtcyk7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIGlmIChuZWVkc1JlTG9vcCkge1xuICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgICBzd2lwZXIubG9vcENyZWF0ZShyZWFsSW5kZXgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgIH0gZWxzZSBpZiAoIXdhc0xvb3AgJiYgaGFzTG9vcCkge1xuICAgICAgc3dpcGVyLmxvb3BDcmVhdGUocmVhbEluZGV4KTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICB9IGVsc2UgaWYgKHdhc0xvb3AgJiYgIWhhc0xvb3ApIHtcbiAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgIH1cbiAgfVxuICBzd2lwZXIuZW1pdChcImJyZWFrcG9pbnRcIiwgYnJlYWtwb2ludFBhcmFtcyk7XG59XG5mdW5jdGlvbiBnZXRCcmVha3BvaW50KGJyZWFrcG9pbnRzMiwgYmFzZSwgY29udGFpbmVyRWwpIHtcbiAgaWYgKGJhc2UgPT09IHZvaWQgMCkge1xuICAgIGJhc2UgPSBcIndpbmRvd1wiO1xuICB9XG4gIGlmICghYnJlYWtwb2ludHMyIHx8IGJhc2UgPT09IFwiY29udGFpbmVyXCIgJiYgIWNvbnRhaW5lckVsKSByZXR1cm4gdm9pZCAwO1xuICBsZXQgYnJlYWtwb2ludCA9IGZhbHNlO1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IGN1cnJlbnRIZWlnaHQgPSBiYXNlID09PSBcIndpbmRvd1wiID8gd2luZG93Mi5pbm5lckhlaWdodCA6IGNvbnRhaW5lckVsLmNsaWVudEhlaWdodDtcbiAgY29uc3QgcG9pbnRzID0gT2JqZWN0LmtleXMoYnJlYWtwb2ludHMyKS5tYXAoKHBvaW50KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBwb2ludCA9PT0gXCJzdHJpbmdcIiAmJiBwb2ludC5pbmRleE9mKFwiQFwiKSA9PT0gMCkge1xuICAgICAgY29uc3QgbWluUmF0aW8gPSBwYXJzZUZsb2F0KHBvaW50LnN1YnN0cigxKSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnRIZWlnaHQgKiBtaW5SYXRpbztcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICBwb2ludFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBwb2ludCxcbiAgICAgIHBvaW50XG4gICAgfTtcbiAgfSk7XG4gIHBvaW50cy5zb3J0KChhLCBiKSA9PiBwYXJzZUludChhLnZhbHVlLCAxMCkgLSBwYXJzZUludChiLnZhbHVlLCAxMCkpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHBvaW50LFxuICAgICAgdmFsdWVcbiAgICB9ID0gcG9pbnRzW2ldO1xuICAgIGlmIChiYXNlID09PSBcIndpbmRvd1wiKSB7XG4gICAgICBpZiAod2luZG93Mi5tYXRjaE1lZGlhKGAobWluLXdpZHRoOiAke3ZhbHVlfXB4KWApLm1hdGNoZXMpIHtcbiAgICAgICAgYnJlYWtwb2ludCA9IHBvaW50O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsdWUgPD0gY29udGFpbmVyRWwuY2xpZW50V2lkdGgpIHtcbiAgICAgIGJyZWFrcG9pbnQgPSBwb2ludDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJyZWFrcG9pbnQgfHwgXCJtYXhcIjtcbn1cbmZ1bmN0aW9uIHByZXBhcmVDbGFzc2VzKGVudHJpZXMsIHByZWZpeCkge1xuICBjb25zdCByZXN1bHRDbGFzc2VzID0gW107XG4gIGVudHJpZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgT2JqZWN0LmtleXMoaXRlbSkuZm9yRWFjaCgoY2xhc3NOYW1lcykgPT4ge1xuICAgICAgICBpZiAoaXRlbVtjbGFzc05hbWVzXSkge1xuICAgICAgICAgIHJlc3VsdENsYXNzZXMucHVzaChwcmVmaXggKyBjbGFzc05hbWVzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmVzdWx0Q2xhc3Nlcy5wdXNoKHByZWZpeCArIGl0ZW0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHRDbGFzc2VzO1xufVxuZnVuY3Rpb24gYWRkQ2xhc3NlcygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIGNsYXNzTmFtZXMsXG4gICAgcGFyYW1zLFxuICAgIHJ0bCxcbiAgICBlbCxcbiAgICBkZXZpY2VcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3Qgc3VmZml4ZXMgPSBwcmVwYXJlQ2xhc3NlcyhbXCJpbml0aWFsaXplZFwiLCBwYXJhbXMuZGlyZWN0aW9uLCB7XG4gICAgXCJmcmVlLW1vZGVcIjogc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZFxuICB9LCB7XG4gICAgXCJhdXRvaGVpZ2h0XCI6IHBhcmFtcy5hdXRvSGVpZ2h0XG4gIH0sIHtcbiAgICBcInJ0bFwiOiBydGxcbiAgfSwge1xuICAgIFwiZ3JpZFwiOiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMVxuICB9LCB7XG4gICAgXCJncmlkLWNvbHVtblwiOiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMSAmJiBwYXJhbXMuZ3JpZC5maWxsID09PSBcImNvbHVtblwiXG4gIH0sIHtcbiAgICBcImFuZHJvaWRcIjogZGV2aWNlLmFuZHJvaWRcbiAgfSwge1xuICAgIFwiaW9zXCI6IGRldmljZS5pb3NcbiAgfSwge1xuICAgIFwiY3NzLW1vZGVcIjogcGFyYW1zLmNzc01vZGVcbiAgfSwge1xuICAgIFwiY2VudGVyZWRcIjogcGFyYW1zLmNzc01vZGUgJiYgcGFyYW1zLmNlbnRlcmVkU2xpZGVzXG4gIH0sIHtcbiAgICBcIndhdGNoLXByb2dyZXNzXCI6IHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzXG4gIH1dLCBwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcyk7XG4gIGNsYXNzTmFtZXMucHVzaCguLi5zdWZmaXhlcyk7XG4gIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lcyk7XG4gIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xufVxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3NlcygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIGVsLFxuICAgIGNsYXNzTmFtZXNcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbCB8fCB0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpIHJldHVybjtcbiAgZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc05hbWVzKTtcbiAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG59XG5mdW5jdGlvbiBjaGVja092ZXJmbG93KCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgaXNMb2NrZWQ6IHdhc0xvY2tlZCxcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3Qge1xuICAgIHNsaWRlc09mZnNldEJlZm9yZVxuICB9ID0gcGFyYW1zO1xuICBpZiAoc2xpZGVzT2Zmc2V0QmVmb3JlKSB7XG4gICAgY29uc3QgbGFzdFNsaWRlSW5kZXggPSBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgY29uc3QgbGFzdFNsaWRlUmlnaHRFZGdlID0gc3dpcGVyLnNsaWRlc0dyaWRbbGFzdFNsaWRlSW5kZXhdICsgc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtsYXN0U2xpZGVJbmRleF0gKyBzbGlkZXNPZmZzZXRCZWZvcmUgKiAyO1xuICAgIHN3aXBlci5pc0xvY2tlZCA9IHN3aXBlci5zaXplID4gbGFzdFNsaWRlUmlnaHRFZGdlO1xuICB9IGVsc2Uge1xuICAgIHN3aXBlci5pc0xvY2tlZCA9IHN3aXBlci5zbmFwR3JpZC5sZW5ndGggPT09IDE7XG4gIH1cbiAgaWYgKHBhcmFtcy5hbGxvd1NsaWRlTmV4dCA9PT0gdHJ1ZSkge1xuICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9ICFzd2lwZXIuaXNMb2NrZWQ7XG4gIH1cbiAgaWYgKHBhcmFtcy5hbGxvd1NsaWRlUHJldiA9PT0gdHJ1ZSkge1xuICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9ICFzd2lwZXIuaXNMb2NrZWQ7XG4gIH1cbiAgaWYgKHdhc0xvY2tlZCAmJiB3YXNMb2NrZWQgIT09IHN3aXBlci5pc0xvY2tlZCkge1xuICAgIHN3aXBlci5pc0VuZCA9IGZhbHNlO1xuICB9XG4gIGlmICh3YXNMb2NrZWQgIT09IHN3aXBlci5pc0xvY2tlZCkge1xuICAgIHN3aXBlci5lbWl0KHN3aXBlci5pc0xvY2tlZCA/IFwibG9ja1wiIDogXCJ1bmxvY2tcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIG1vZHVsZUV4dGVuZFBhcmFtcyhwYXJhbXMsIGFsbE1vZHVsZXNQYXJhbXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGV4dGVuZFBhcmFtcyhvYmopIHtcbiAgICBpZiAob2JqID09PSB2b2lkIDApIHtcbiAgICAgIG9iaiA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBtb2R1bGVQYXJhbU5hbWUgPSBPYmplY3Qua2V5cyhvYmopWzBdO1xuICAgIGNvbnN0IG1vZHVsZVBhcmFtcyA9IG9ialttb2R1bGVQYXJhbU5hbWVdO1xuICAgIGlmICh0eXBlb2YgbW9kdWxlUGFyYW1zICE9PSBcIm9iamVjdFwiIHx8IG1vZHVsZVBhcmFtcyA9PT0gbnVsbCkge1xuICAgICAgZXh0ZW5kMihhbGxNb2R1bGVzUGFyYW1zLCBvYmopO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPT09IHRydWUpIHtcbiAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID0ge1xuICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAobW9kdWxlUGFyYW1OYW1lID09PSBcIm5hdmlnYXRpb25cIiAmJiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSAmJiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbmFibGVkICYmICFwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5wcmV2RWwgJiYgIXBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLm5leHRFbCkge1xuICAgICAgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uYXV0byA9IHRydWU7XG4gICAgfVxuICAgIGlmIChbXCJwYWdpbmF0aW9uXCIsIFwic2Nyb2xsYmFyXCJdLmluZGV4T2YobW9kdWxlUGFyYW1OYW1lKSA+PSAwICYmIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdICYmIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmVuYWJsZWQgJiYgIXBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmVsKSB7XG4gICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5hdXRvID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCEobW9kdWxlUGFyYW1OYW1lIGluIHBhcmFtcyAmJiBcImVuYWJsZWRcIiBpbiBtb2R1bGVQYXJhbXMpKSB7XG4gICAgICBleHRlbmQyKGFsbE1vZHVsZXNQYXJhbXMsIG9iaik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPT09IFwib2JqZWN0XCIgJiYgIShcImVuYWJsZWRcIiBpbiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSkpIHtcbiAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmVuYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdKSBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgfTtcbiAgICBleHRlbmQyKGFsbE1vZHVsZXNQYXJhbXMsIG9iaik7XG4gIH07XG59XG52YXIgc3VwcG9ydCwgZGV2aWNlQ2FjaGVkLCBicm93c2VyLCBldmVudHNFbWl0dGVyLCB0b2dnbGVTbGlkZUNsYXNzZXMkMSwgdG9nZ2xlU2xpZGVDbGFzc2VzLCBwcm9jZXNzTGF6eVByZWxvYWRlciwgdW5sYXp5LCBwcmVsb2FkLCB1cGRhdGUsIHRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgc2xpZGUsIGxvb3AsIGdyYWJDdXJzb3IsIGV2ZW50cywgZXZlbnRzJDEsIGlzR3JpZEVuYWJsZWQsIGJyZWFrcG9pbnRzLCBjbGFzc2VzLCBjaGVja092ZXJmbG93JDEsIGRlZmF1bHRzLCBwcm90b3R5cGVzLCBleHRlbmRlZERlZmF1bHRzLCBTd2lwZXI7XG52YXIgaW5pdF9zd2lwZXJfY29yZSA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9zd2lwZXItY29yZS5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gICAgaW5pdF91dGlscygpO1xuICAgIGV2ZW50c0VtaXR0ZXIgPSB7XG4gICAgICBvbihldmVudHMyLCBoYW5kbGVyLCBwcmlvcml0eSkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gc2VsZjtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gcHJpb3JpdHkgPyBcInVuc2hpZnRcIiA6IFwicHVzaFwiO1xuICAgICAgICBldmVudHMyLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChldmVudDIpID0+IHtcbiAgICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50Ml0pIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50Ml0gPSBbXTtcbiAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudDJdW21ldGhvZF0oaGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0sXG4gICAgICBvbmNlKGV2ZW50czIsIGhhbmRsZXIsIHByaW9yaXR5KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBzZWxmO1xuICAgICAgICBmdW5jdGlvbiBvbmNlSGFuZGxlcigpIHtcbiAgICAgICAgICBzZWxmLm9mZihldmVudHMyLCBvbmNlSGFuZGxlcik7XG4gICAgICAgICAgaWYgKG9uY2VIYW5kbGVyLl9fZW1pdHRlclByb3h5KSB7XG4gICAgICAgICAgICBkZWxldGUgb25jZUhhbmRsZXIuX19lbWl0dGVyUHJveHk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaGFuZGxlci5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBvbmNlSGFuZGxlci5fX2VtaXR0ZXJQcm94eSA9IGhhbmRsZXI7XG4gICAgICAgIHJldHVybiBzZWxmLm9uKGV2ZW50czIsIG9uY2VIYW5kbGVyLCBwcmlvcml0eSk7XG4gICAgICB9LFxuICAgICAgb25BbnkoaGFuZGxlciwgcHJpb3JpdHkpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHNlbGY7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHByaW9yaXR5ID8gXCJ1bnNoaWZ0XCIgOiBcInB1c2hcIjtcbiAgICAgICAgaWYgKHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLmluZGV4T2YoaGFuZGxlcikgPCAwKSB7XG4gICAgICAgICAgc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnNbbWV0aG9kXShoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0sXG4gICAgICBvZmZBbnkoaGFuZGxlcikge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMpIHJldHVybiBzZWxmO1xuICAgICAgICBjb25zdCBpbmRleCA9IHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0sXG4gICAgICBvZmYoZXZlbnRzMiwgaGFuZGxlcikge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMpIHJldHVybiBzZWxmO1xuICAgICAgICBldmVudHMyLnNwbGl0KFwiIFwiKS5mb3JFYWNoKChldmVudDIpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50Ml0gPSBbXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50Ml0pIHtcbiAgICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50Ml0uZm9yRWFjaCgoZXZlbnRIYW5kbGVyLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyID09PSBoYW5kbGVyIHx8IGV2ZW50SGFuZGxlci5fX2VtaXR0ZXJQcm94eSAmJiBldmVudEhhbmRsZXIuX19lbWl0dGVyUHJveHkgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudDJdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSxcbiAgICAgIGVtaXQoKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycykgcmV0dXJuIHNlbGY7XG4gICAgICAgIGxldCBldmVudHMyO1xuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgbGV0IGNvbnRleHQ7XG4gICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09IFwic3RyaW5nXCIgfHwgQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xuICAgICAgICAgIGV2ZW50czIgPSBhcmdzWzBdO1xuICAgICAgICAgIGRhdGEgPSBhcmdzLnNsaWNlKDEsIGFyZ3MubGVuZ3RoKTtcbiAgICAgICAgICBjb250ZXh0ID0gc2VsZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBldmVudHMyID0gYXJnc1swXS5ldmVudHM7XG4gICAgICAgICAgZGF0YSA9IGFyZ3NbMF0uZGF0YTtcbiAgICAgICAgICBjb250ZXh0ID0gYXJnc1swXS5jb250ZXh0IHx8IHNlbGY7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS51bnNoaWZ0KGNvbnRleHQpO1xuICAgICAgICBjb25zdCBldmVudHNBcnJheSA9IEFycmF5LmlzQXJyYXkoZXZlbnRzMikgPyBldmVudHMyIDogZXZlbnRzMi5zcGxpdChcIiBcIik7XG4gICAgICAgIGV2ZW50c0FycmF5LmZvckVhY2goKGV2ZW50MikgPT4ge1xuICAgICAgICAgIGlmIChzZWxmLmV2ZW50c0FueUxpc3RlbmVycyAmJiBzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLmZvckVhY2goKGV2ZW50SGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgICBldmVudEhhbmRsZXIuYXBwbHkoY29udGV4dCwgW2V2ZW50MiwgLi4uZGF0YV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWxmLmV2ZW50c0xpc3RlbmVycyAmJiBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudDJdKSB7XG4gICAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudDJdLmZvckVhY2goKGV2ZW50SGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgICBldmVudEhhbmRsZXIuYXBwbHkoY29udGV4dCwgZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRvZ2dsZVNsaWRlQ2xhc3NlcyQxID0gKHNsaWRlRWwsIGNvbmRpdGlvbiwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICBpZiAoY29uZGl0aW9uICYmICFzbGlkZUVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICAgIHNsaWRlRWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgfSBlbHNlIGlmICghY29uZGl0aW9uICYmIHNsaWRlRWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgc2xpZGVFbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0b2dnbGVTbGlkZUNsYXNzZXMgPSAoc2xpZGVFbCwgY29uZGl0aW9uLCBjbGFzc05hbWUpID0+IHtcbiAgICAgIGlmIChjb25kaXRpb24gJiYgIXNsaWRlRWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgc2xpZGVFbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICB9IGVsc2UgaWYgKCFjb25kaXRpb24gJiYgc2xpZGVFbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgICAgICBzbGlkZUVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHByb2Nlc3NMYXp5UHJlbG9hZGVyID0gKHN3aXBlciwgaW1hZ2VFbCkgPT4ge1xuICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLnBhcmFtcykgcmV0dXJuO1xuICAgICAgY29uc3Qgc2xpZGVTZWxlY3RvciA9ICgpID0+IHN3aXBlci5pc0VsZW1lbnQgPyBgc3dpcGVyLXNsaWRlYCA6IGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9YDtcbiAgICAgIGNvbnN0IHNsaWRlRWwgPSBpbWFnZUVsLmNsb3Nlc3Qoc2xpZGVTZWxlY3RvcigpKTtcbiAgICAgIGlmIChzbGlkZUVsKSB7XG4gICAgICAgIGxldCBsYXp5RWwgPSBzbGlkZUVsLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3aXBlci5wYXJhbXMubGF6eVByZWxvYWRlckNsYXNzfWApO1xuICAgICAgICBpZiAoIWxhenlFbCAmJiBzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgICAgICAgaWYgKHNsaWRlRWwuc2hhZG93Um9vdCkge1xuICAgICAgICAgICAgbGF6eUVsID0gc2xpZGVFbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoYC4ke3N3aXBlci5wYXJhbXMubGF6eVByZWxvYWRlckNsYXNzfWApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc2xpZGVFbC5zaGFkb3dSb290KSB7XG4gICAgICAgICAgICAgICAgbGF6eUVsID0gc2xpZGVFbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoYC4ke3N3aXBlci5wYXJhbXMubGF6eVByZWxvYWRlckNsYXNzfWApO1xuICAgICAgICAgICAgICAgIGlmIChsYXp5RWwpIGxhenlFbC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChsYXp5RWwpIGxhenlFbC5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHVubGF6eSA9IChzd2lwZXIsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoIXN3aXBlci5zbGlkZXNbaW5kZXhdKSByZXR1cm47XG4gICAgICBjb25zdCBpbWFnZUVsID0gc3dpcGVyLnNsaWRlc1tpbmRleF0ucXVlcnlTZWxlY3RvcignW2xvYWRpbmc9XCJsYXp5XCJdJyk7XG4gICAgICBpZiAoaW1hZ2VFbCkgaW1hZ2VFbC5yZW1vdmVBdHRyaWJ1dGUoXCJsb2FkaW5nXCIpO1xuICAgIH07XG4gICAgcHJlbG9hZCA9IChzd2lwZXIpID0+IHtcbiAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5wYXJhbXMpIHJldHVybjtcbiAgICAgIGxldCBhbW91bnQgPSBzd2lwZXIucGFyYW1zLmxhenlQcmVsb2FkUHJldk5leHQ7XG4gICAgICBjb25zdCBsZW4gPSBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgICAgIGlmICghbGVuIHx8ICFhbW91bnQgfHwgYW1vdW50IDwgMCkgcmV0dXJuO1xuICAgICAgYW1vdW50ID0gTWF0aC5taW4oYW1vdW50LCBsZW4pO1xuICAgICAgY29uc3Qgc2xpZGVzUGVyVmlldyA9IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIgPyBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKSA6IE1hdGguY2VpbChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcpO1xuICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5ncmlkICYmIHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzID4gMSkge1xuICAgICAgICBjb25zdCBhY3RpdmVDb2x1bW4gPSBhY3RpdmVJbmRleDtcbiAgICAgICAgY29uc3QgcHJlbG9hZENvbHVtbnMgPSBbYWN0aXZlQ29sdW1uIC0gYW1vdW50XTtcbiAgICAgICAgcHJlbG9hZENvbHVtbnMucHVzaCguLi5BcnJheS5mcm9tKHtcbiAgICAgICAgICBsZW5ndGg6IGFtb3VudFxuICAgICAgICB9KS5tYXAoKF8sIGkpID0+IHtcbiAgICAgICAgICByZXR1cm4gYWN0aXZlQ29sdW1uICsgc2xpZGVzUGVyVmlldyArIGk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKChzbGlkZUVsLCBpKSA9PiB7XG4gICAgICAgICAgaWYgKHByZWxvYWRDb2x1bW5zLmluY2x1ZGVzKHNsaWRlRWwuY29sdW1uKSkgdW5sYXp5KHN3aXBlciwgaSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzbGlkZUluZGV4TGFzdEluVmlldyA9IGFjdGl2ZUluZGV4ICsgc2xpZGVzUGVyVmlldyAtIDE7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5yZXdpbmQgfHwgc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCAtIGFtb3VudDsgaSA8PSBzbGlkZUluZGV4TGFzdEluVmlldyArIGFtb3VudDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3QgcmVhbEluZGV4ID0gKGkgJSBsZW4gKyBsZW4pICUgbGVuO1xuICAgICAgICAgIGlmIChyZWFsSW5kZXggPCBhY3RpdmVJbmRleCB8fCByZWFsSW5kZXggPiBzbGlkZUluZGV4TGFzdEluVmlldykgdW5sYXp5KHN3aXBlciwgcmVhbEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IE1hdGgubWF4KGFjdGl2ZUluZGV4IC0gYW1vdW50LCAwKTsgaSA8PSBNYXRoLm1pbihzbGlkZUluZGV4TGFzdEluVmlldyArIGFtb3VudCwgbGVuIC0gMSk7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChpICE9PSBhY3RpdmVJbmRleCAmJiAoaSA+IHNsaWRlSW5kZXhMYXN0SW5WaWV3IHx8IGkgPCBhY3RpdmVJbmRleCkpIHtcbiAgICAgICAgICAgIHVubGF6eShzd2lwZXIsIGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdXBkYXRlID0ge1xuICAgICAgdXBkYXRlU2l6ZSxcbiAgICAgIHVwZGF0ZVNsaWRlcyxcbiAgICAgIHVwZGF0ZUF1dG9IZWlnaHQsXG4gICAgICB1cGRhdGVTbGlkZXNPZmZzZXQsXG4gICAgICB1cGRhdGVTbGlkZXNQcm9ncmVzcyxcbiAgICAgIHVwZGF0ZVByb2dyZXNzLFxuICAgICAgdXBkYXRlU2xpZGVzQ2xhc3NlcyxcbiAgICAgIHVwZGF0ZUFjdGl2ZUluZGV4LFxuICAgICAgdXBkYXRlQ2xpY2tlZFNsaWRlXG4gICAgfTtcbiAgICB0cmFuc2xhdGUgPSB7XG4gICAgICBnZXRUcmFuc2xhdGU6IGdldFN3aXBlclRyYW5zbGF0ZSxcbiAgICAgIHNldFRyYW5zbGF0ZSxcbiAgICAgIG1pblRyYW5zbGF0ZSxcbiAgICAgIG1heFRyYW5zbGF0ZSxcbiAgICAgIHRyYW5zbGF0ZVRvXG4gICAgfTtcbiAgICB0cmFuc2l0aW9uID0ge1xuICAgICAgc2V0VHJhbnNpdGlvbixcbiAgICAgIHRyYW5zaXRpb25TdGFydCxcbiAgICAgIHRyYW5zaXRpb25FbmRcbiAgICB9O1xuICAgIHNsaWRlID0ge1xuICAgICAgc2xpZGVUbyxcbiAgICAgIHNsaWRlVG9Mb29wLFxuICAgICAgc2xpZGVOZXh0LFxuICAgICAgc2xpZGVQcmV2LFxuICAgICAgc2xpZGVSZXNldCxcbiAgICAgIHNsaWRlVG9DbG9zZXN0LFxuICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZVxuICAgIH07XG4gICAgbG9vcCA9IHtcbiAgICAgIGxvb3BDcmVhdGUsXG4gICAgICBsb29wRml4LFxuICAgICAgbG9vcERlc3Ryb3lcbiAgICB9O1xuICAgIGdyYWJDdXJzb3IgPSB7XG4gICAgICBzZXRHcmFiQ3Vyc29yLFxuICAgICAgdW5zZXRHcmFiQ3Vyc29yXG4gICAgfTtcbiAgICBldmVudHMgPSAoc3dpcGVyLCBtZXRob2QpID0+IHtcbiAgICAgIGNvbnN0IGRvY3VtZW50MiA9IGdldERvY3VtZW50KCk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgZWwsXG4gICAgICAgIHdyYXBwZXJFbCxcbiAgICAgICAgZGV2aWNlXG4gICAgICB9ID0gc3dpcGVyO1xuICAgICAgY29uc3QgY2FwdHVyZSA9ICEhcGFyYW1zLm5lc3RlZDtcbiAgICAgIGNvbnN0IGRvbU1ldGhvZCA9IG1ldGhvZCA9PT0gXCJvblwiID8gXCJhZGRFdmVudExpc3RlbmVyXCIgOiBcInJlbW92ZUV2ZW50TGlzdGVuZXJcIjtcbiAgICAgIGNvbnN0IHN3aXBlck1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGlmICghZWwgfHwgdHlwZW9mIGVsID09PSBcInN0cmluZ1wiKSByZXR1cm47XG4gICAgICBkb2N1bWVudDJbZG9tTWV0aG9kXShcInRvdWNoc3RhcnRcIiwgc3dpcGVyLm9uRG9jdW1lbnRUb3VjaFN0YXJ0LCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlLFxuICAgICAgICBjYXB0dXJlXG4gICAgICB9KTtcbiAgICAgIGVsW2RvbU1ldGhvZF0oXCJ0b3VjaHN0YXJ0XCIsIHN3aXBlci5vblRvdWNoU3RhcnQsIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgZWxbZG9tTWV0aG9kXShcInBvaW50ZXJkb3duXCIsIHN3aXBlci5vblRvdWNoU3RhcnQsIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQyW2RvbU1ldGhvZF0oXCJ0b3VjaG1vdmVcIiwgc3dpcGVyLm9uVG91Y2hNb3ZlLCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlLFxuICAgICAgICBjYXB0dXJlXG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50Mltkb21NZXRob2RdKFwicG9pbnRlcm1vdmVcIiwgc3dpcGVyLm9uVG91Y2hNb3ZlLCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlLFxuICAgICAgICBjYXB0dXJlXG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50Mltkb21NZXRob2RdKFwidG91Y2hlbmRcIiwgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudDJbZG9tTWV0aG9kXShcInBvaW50ZXJ1cFwiLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgICAgICBwYXNzaXZlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50Mltkb21NZXRob2RdKFwicG9pbnRlcmNhbmNlbFwiLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgICAgICBwYXNzaXZlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50Mltkb21NZXRob2RdKFwidG91Y2hjYW5jZWxcIiwgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudDJbZG9tTWV0aG9kXShcInBvaW50ZXJvdXRcIiwgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudDJbZG9tTWV0aG9kXShcInBvaW50ZXJsZWF2ZVwiLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgICAgICBwYXNzaXZlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50Mltkb21NZXRob2RdKFwiY29udGV4dG1lbnVcIiwgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICAgICAgcGFzc2l2ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBpZiAocGFyYW1zLnByZXZlbnRDbGlja3MgfHwgcGFyYW1zLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbikge1xuICAgICAgICBlbFtkb21NZXRob2RdKFwiY2xpY2tcIiwgc3dpcGVyLm9uQ2xpY2ssIHRydWUpO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgIHdyYXBwZXJFbFtkb21NZXRob2RdKFwic2Nyb2xsXCIsIHN3aXBlci5vblNjcm9sbCk7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnVwZGF0ZU9uV2luZG93UmVzaXplKSB7XG4gICAgICAgIHN3aXBlcltzd2lwZXJNZXRob2RdKGRldmljZS5pb3MgfHwgZGV2aWNlLmFuZHJvaWQgPyBcInJlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZSBvYnNlcnZlclVwZGF0ZVwiIDogXCJyZXNpemUgb2JzZXJ2ZXJVcGRhdGVcIiwgb25SZXNpemUsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyW3N3aXBlck1ldGhvZF0oXCJvYnNlcnZlclVwZGF0ZVwiLCBvblJlc2l6ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbFtkb21NZXRob2RdKFwibG9hZFwiLCBzd2lwZXIub25Mb2FkLCB7XG4gICAgICAgIGNhcHR1cmU6IHRydWVcbiAgICAgIH0pO1xuICAgIH07XG4gICAgZXZlbnRzJDEgPSB7XG4gICAgICBhdHRhY2hFdmVudHMsXG4gICAgICBkZXRhY2hFdmVudHNcbiAgICB9O1xuICAgIGlzR3JpZEVuYWJsZWQgPSAoc3dpcGVyLCBwYXJhbXMpID0+IHtcbiAgICAgIHJldHVybiBzd2lwZXIuZ3JpZCAmJiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMTtcbiAgICB9O1xuICAgIGJyZWFrcG9pbnRzID0ge1xuICAgICAgc2V0QnJlYWtwb2ludCxcbiAgICAgIGdldEJyZWFrcG9pbnRcbiAgICB9O1xuICAgIGNsYXNzZXMgPSB7XG4gICAgICBhZGRDbGFzc2VzLFxuICAgICAgcmVtb3ZlQ2xhc3Nlc1xuICAgIH07XG4gICAgY2hlY2tPdmVyZmxvdyQxID0ge1xuICAgICAgY2hlY2tPdmVyZmxvd1xuICAgIH07XG4gICAgZGVmYXVsdHMgPSB7XG4gICAgICBpbml0OiB0cnVlLFxuICAgICAgZGlyZWN0aW9uOiBcImhvcml6b250YWxcIixcbiAgICAgIG9uZVdheU1vdmVtZW50OiBmYWxzZSxcbiAgICAgIHN3aXBlckVsZW1lbnROb2RlTmFtZTogXCJTV0lQRVItQ09OVEFJTkVSXCIsXG4gICAgICB0b3VjaEV2ZW50c1RhcmdldDogXCJ3cmFwcGVyXCIsXG4gICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICBzcGVlZDogMzAwLFxuICAgICAgY3NzTW9kZTogZmFsc2UsXG4gICAgICB1cGRhdGVPbldpbmRvd1Jlc2l6ZTogdHJ1ZSxcbiAgICAgIHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxuICAgICAgbmVzdGVkOiBmYWxzZSxcbiAgICAgIGNyZWF0ZUVsZW1lbnRzOiBmYWxzZSxcbiAgICAgIGV2ZW50c1ByZWZpeDogXCJzd2lwZXJcIixcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBmb2N1c2FibGVFbGVtZW50czogXCJpbnB1dCwgc2VsZWN0LCBvcHRpb24sIHRleHRhcmVhLCBidXR0b24sIHZpZGVvLCBsYWJlbFwiLFxuICAgICAgLy8gT3ZlcnJpZGVzXG4gICAgICB3aWR0aDogbnVsbCxcbiAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgIC8vXG4gICAgICBwcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb246IGZhbHNlLFxuICAgICAgLy8gc3NyXG4gICAgICB1c2VyQWdlbnQ6IG51bGwsXG4gICAgICB1cmw6IG51bGwsXG4gICAgICAvLyBUbyBzdXBwb3J0IGlPUydzIHN3aXBlLXRvLWdvLWJhY2sgZ2VzdHVyZSAod2hlbiBiZWluZyB1c2VkIGluLWFwcCkuXG4gICAgICBlZGdlU3dpcGVEZXRlY3Rpb246IGZhbHNlLFxuICAgICAgZWRnZVN3aXBlVGhyZXNob2xkOiAyMCxcbiAgICAgIC8vIEF1dG9oZWlnaHRcbiAgICAgIGF1dG9IZWlnaHQ6IGZhbHNlLFxuICAgICAgLy8gU2V0IHdyYXBwZXIgd2lkdGhcbiAgICAgIHNldFdyYXBwZXJTaXplOiBmYWxzZSxcbiAgICAgIC8vIFZpcnR1YWwgVHJhbnNsYXRlXG4gICAgICB2aXJ0dWFsVHJhbnNsYXRlOiBmYWxzZSxcbiAgICAgIC8vIEVmZmVjdHNcbiAgICAgIGVmZmVjdDogXCJzbGlkZVwiLFxuICAgICAgLy8gJ3NsaWRlJyBvciAnZmFkZScgb3IgJ2N1YmUnIG9yICdjb3ZlcmZsb3cnIG9yICdmbGlwJ1xuICAgICAgLy8gQnJlYWtwb2ludHNcbiAgICAgIGJyZWFrcG9pbnRzOiB2b2lkIDAsXG4gICAgICBicmVha3BvaW50c0Jhc2U6IFwid2luZG93XCIsXG4gICAgICAvLyBTbGlkZXMgZ3JpZFxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgc2xpZGVzUGVyR3JvdXBTa2lwOiAwLFxuICAgICAgc2xpZGVzUGVyR3JvdXBBdXRvOiBmYWxzZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgIGNlbnRlcmVkU2xpZGVzQm91bmRzOiBmYWxzZSxcbiAgICAgIHNsaWRlc09mZnNldEJlZm9yZTogMCxcbiAgICAgIC8vIGluIHB4XG4gICAgICBzbGlkZXNPZmZzZXRBZnRlcjogMCxcbiAgICAgIC8vIGluIHB4XG4gICAgICBub3JtYWxpemVTbGlkZUluZGV4OiB0cnVlLFxuICAgICAgY2VudGVySW5zdWZmaWNpZW50U2xpZGVzOiBmYWxzZSxcbiAgICAgIC8vIERpc2FibGUgc3dpcGVyIGFuZCBoaWRlIG5hdmlnYXRpb24gd2hlbiBjb250YWluZXIgbm90IG92ZXJmbG93XG4gICAgICB3YXRjaE92ZXJmbG93OiB0cnVlLFxuICAgICAgLy8gUm91bmQgbGVuZ3RoXG4gICAgICByb3VuZExlbmd0aHM6IGZhbHNlLFxuICAgICAgLy8gVG91Y2hlc1xuICAgICAgdG91Y2hSYXRpbzogMSxcbiAgICAgIHRvdWNoQW5nbGU6IDQ1LFxuICAgICAgc2ltdWxhdGVUb3VjaDogdHJ1ZSxcbiAgICAgIHNob3J0U3dpcGVzOiB0cnVlLFxuICAgICAgbG9uZ1N3aXBlczogdHJ1ZSxcbiAgICAgIGxvbmdTd2lwZXNSYXRpbzogMC41LFxuICAgICAgbG9uZ1N3aXBlc01zOiAzMDAsXG4gICAgICBmb2xsb3dGaW5nZXI6IHRydWUsXG4gICAgICBhbGxvd1RvdWNoTW92ZTogdHJ1ZSxcbiAgICAgIHRocmVzaG9sZDogNSxcbiAgICAgIHRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbjogZmFsc2UsXG4gICAgICB0b3VjaFN0YXJ0UHJldmVudERlZmF1bHQ6IHRydWUsXG4gICAgICB0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdDogZmFsc2UsXG4gICAgICB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBmYWxzZSxcbiAgICAgIC8vIFVuaXF1ZSBOYXZpZ2F0aW9uIEVsZW1lbnRzXG4gICAgICB1bmlxdWVOYXZFbGVtZW50czogdHJ1ZSxcbiAgICAgIC8vIFJlc2lzdGFuY2VcbiAgICAgIHJlc2lzdGFuY2U6IHRydWUsXG4gICAgICByZXNpc3RhbmNlUmF0aW86IDAuODUsXG4gICAgICAvLyBQcm9ncmVzc1xuICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogZmFsc2UsXG4gICAgICAvLyBDdXJzb3JcbiAgICAgIGdyYWJDdXJzb3I6IGZhbHNlLFxuICAgICAgLy8gQ2xpY2tzXG4gICAgICBwcmV2ZW50Q2xpY2tzOiB0cnVlLFxuICAgICAgcHJldmVudENsaWNrc1Byb3BhZ2F0aW9uOiB0cnVlLFxuICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogZmFsc2UsXG4gICAgICAvLyBsb29wXG4gICAgICBsb29wOiBmYWxzZSxcbiAgICAgIGxvb3BBZGRCbGFua1NsaWRlczogdHJ1ZSxcbiAgICAgIGxvb3BBZGRpdGlvbmFsU2xpZGVzOiAwLFxuICAgICAgbG9vcFByZXZlbnRzU2xpZGluZzogdHJ1ZSxcbiAgICAgIC8vIHJld2luZFxuICAgICAgcmV3aW5kOiBmYWxzZSxcbiAgICAgIC8vIFN3aXBpbmcvbm8gc3dpcGluZ1xuICAgICAgYWxsb3dTbGlkZVByZXY6IHRydWUsXG4gICAgICBhbGxvd1NsaWRlTmV4dDogdHJ1ZSxcbiAgICAgIHN3aXBlSGFuZGxlcjogbnVsbCxcbiAgICAgIC8vICcuc3dpcGUtaGFuZGxlcicsXG4gICAgICBub1N3aXBpbmc6IHRydWUsXG4gICAgICBub1N3aXBpbmdDbGFzczogXCJzd2lwZXItbm8tc3dpcGluZ1wiLFxuICAgICAgbm9Td2lwaW5nU2VsZWN0b3I6IG51bGwsXG4gICAgICAvLyBQYXNzaXZlIExpc3RlbmVyc1xuICAgICAgcGFzc2l2ZUxpc3RlbmVyczogdHJ1ZSxcbiAgICAgIG1heEJhY2tmYWNlSGlkZGVuU2xpZGVzOiAxMCxcbiAgICAgIC8vIE5TXG4gICAgICBjb250YWluZXJNb2RpZmllckNsYXNzOiBcInN3aXBlci1cIixcbiAgICAgIC8vIE5FV1xuICAgICAgc2xpZGVDbGFzczogXCJzd2lwZXItc2xpZGVcIixcbiAgICAgIHNsaWRlQmxhbmtDbGFzczogXCJzd2lwZXItc2xpZGUtYmxhbmtcIixcbiAgICAgIHNsaWRlQWN0aXZlQ2xhc3M6IFwic3dpcGVyLXNsaWRlLWFjdGl2ZVwiLFxuICAgICAgc2xpZGVWaXNpYmxlQ2xhc3M6IFwic3dpcGVyLXNsaWRlLXZpc2libGVcIixcbiAgICAgIHNsaWRlRnVsbHlWaXNpYmxlQ2xhc3M6IFwic3dpcGVyLXNsaWRlLWZ1bGx5LXZpc2libGVcIixcbiAgICAgIHNsaWRlTmV4dENsYXNzOiBcInN3aXBlci1zbGlkZS1uZXh0XCIsXG4gICAgICBzbGlkZVByZXZDbGFzczogXCJzd2lwZXItc2xpZGUtcHJldlwiLFxuICAgICAgd3JhcHBlckNsYXNzOiBcInN3aXBlci13cmFwcGVyXCIsXG4gICAgICBsYXp5UHJlbG9hZGVyQ2xhc3M6IFwic3dpcGVyLWxhenktcHJlbG9hZGVyXCIsXG4gICAgICBsYXp5UHJlbG9hZFByZXZOZXh0OiAwLFxuICAgICAgLy8gQ2FsbGJhY2tzXG4gICAgICBydW5DYWxsYmFja3NPbkluaXQ6IHRydWUsXG4gICAgICAvLyBJbnRlcm5hbHNcbiAgICAgIF9lbWl0Q2xhc3NlczogZmFsc2VcbiAgICB9O1xuICAgIHByb3RvdHlwZXMgPSB7XG4gICAgICBldmVudHNFbWl0dGVyLFxuICAgICAgdXBkYXRlLFxuICAgICAgdHJhbnNsYXRlLFxuICAgICAgdHJhbnNpdGlvbixcbiAgICAgIHNsaWRlLFxuICAgICAgbG9vcCxcbiAgICAgIGdyYWJDdXJzb3IsXG4gICAgICBldmVudHM6IGV2ZW50cyQxLFxuICAgICAgYnJlYWtwb2ludHMsXG4gICAgICBjaGVja092ZXJmbG93OiBjaGVja092ZXJmbG93JDEsXG4gICAgICBjbGFzc2VzXG4gICAgfTtcbiAgICBleHRlbmRlZERlZmF1bHRzID0ge307XG4gICAgU3dpcGVyID0gY2xhc3MgX1N3aXBlciB7XG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgbGV0IGVsO1xuICAgICAgICBsZXQgcGFyYW1zO1xuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiBhcmdzWzBdLmNvbnN0cnVjdG9yICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmdzWzBdKS5zbGljZSg4LCAtMSkgPT09IFwiT2JqZWN0XCIpIHtcbiAgICAgICAgICBwYXJhbXMgPSBhcmdzWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFtlbCwgcGFyYW1zXSA9IGFyZ3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwYXJhbXMpIHBhcmFtcyA9IHt9O1xuICAgICAgICBwYXJhbXMgPSBleHRlbmQyKHt9LCBwYXJhbXMpO1xuICAgICAgICBpZiAoZWwgJiYgIXBhcmFtcy5lbCkgcGFyYW1zLmVsID0gZWw7XG4gICAgICAgIGNvbnN0IGRvY3VtZW50MiA9IGdldERvY3VtZW50KCk7XG4gICAgICAgIGlmIChwYXJhbXMuZWwgJiYgdHlwZW9mIHBhcmFtcy5lbCA9PT0gXCJzdHJpbmdcIiAmJiBkb2N1bWVudDIucXVlcnlTZWxlY3RvckFsbChwYXJhbXMuZWwpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBjb25zdCBzd2lwZXJzID0gW107XG4gICAgICAgICAgZG9jdW1lbnQyLnF1ZXJ5U2VsZWN0b3JBbGwocGFyYW1zLmVsKS5mb3JFYWNoKChjb250YWluZXJFbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3UGFyYW1zID0gZXh0ZW5kMih7fSwgcGFyYW1zLCB7XG4gICAgICAgICAgICAgIGVsOiBjb250YWluZXJFbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzd2lwZXJzLnB1c2gobmV3IF9Td2lwZXIobmV3UGFyYW1zKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHN3aXBlcnM7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgc3dpcGVyLl9fc3dpcGVyX18gPSB0cnVlO1xuICAgICAgICBzd2lwZXIuc3VwcG9ydCA9IGdldFN1cHBvcnQoKTtcbiAgICAgICAgc3dpcGVyLmRldmljZSA9IGdldERldmljZSh7XG4gICAgICAgICAgdXNlckFnZW50OiBwYXJhbXMudXNlckFnZW50XG4gICAgICAgIH0pO1xuICAgICAgICBzd2lwZXIuYnJvd3NlciA9IGdldEJyb3dzZXIoKTtcbiAgICAgICAgc3dpcGVyLmV2ZW50c0xpc3RlbmVycyA9IHt9O1xuICAgICAgICBzd2lwZXIuZXZlbnRzQW55TGlzdGVuZXJzID0gW107XG4gICAgICAgIHN3aXBlci5tb2R1bGVzID0gWy4uLnN3aXBlci5fX21vZHVsZXNfX107XG4gICAgICAgIGlmIChwYXJhbXMubW9kdWxlcyAmJiBBcnJheS5pc0FycmF5KHBhcmFtcy5tb2R1bGVzKSkge1xuICAgICAgICAgIHN3aXBlci5tb2R1bGVzLnB1c2goLi4ucGFyYW1zLm1vZHVsZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFsbE1vZHVsZXNQYXJhbXMgPSB7fTtcbiAgICAgICAgc3dpcGVyLm1vZHVsZXMuZm9yRWFjaCgobW9kKSA9PiB7XG4gICAgICAgICAgbW9kKHtcbiAgICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICAgIHN3aXBlcixcbiAgICAgICAgICAgIGV4dGVuZFBhcmFtczogbW9kdWxlRXh0ZW5kUGFyYW1zKHBhcmFtcywgYWxsTW9kdWxlc1BhcmFtcyksXG4gICAgICAgICAgICBvbjogc3dpcGVyLm9uLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICAgIG9uY2U6IHN3aXBlci5vbmNlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICAgIG9mZjogc3dpcGVyLm9mZi5iaW5kKHN3aXBlciksXG4gICAgICAgICAgICBlbWl0OiBzd2lwZXIuZW1pdC5iaW5kKHN3aXBlcilcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHN3aXBlclBhcmFtcyA9IGV4dGVuZDIoe30sIGRlZmF1bHRzLCBhbGxNb2R1bGVzUGFyYW1zKTtcbiAgICAgICAgc3dpcGVyLnBhcmFtcyA9IGV4dGVuZDIoe30sIHN3aXBlclBhcmFtcywgZXh0ZW5kZWREZWZhdWx0cywgcGFyYW1zKTtcbiAgICAgICAgc3dpcGVyLm9yaWdpbmFsUGFyYW1zID0gZXh0ZW5kMih7fSwgc3dpcGVyLnBhcmFtcyk7XG4gICAgICAgIHN3aXBlci5wYXNzZWRQYXJhbXMgPSBleHRlbmQyKHt9LCBwYXJhbXMpO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcyAmJiBzd2lwZXIucGFyYW1zLm9uKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMoc3dpcGVyLnBhcmFtcy5vbikuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICAgICAgICBzd2lwZXIub24oZXZlbnROYW1lLCBzd2lwZXIucGFyYW1zLm9uW2V2ZW50TmFtZV0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zICYmIHN3aXBlci5wYXJhbXMub25BbnkpIHtcbiAgICAgICAgICBzd2lwZXIub25Bbnkoc3dpcGVyLnBhcmFtcy5vbkFueSk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICAgICAgICBlbmFibGVkOiBzd2lwZXIucGFyYW1zLmVuYWJsZWQsXG4gICAgICAgICAgZWwsXG4gICAgICAgICAgLy8gQ2xhc3Nlc1xuICAgICAgICAgIGNsYXNzTmFtZXM6IFtdLFxuICAgICAgICAgIC8vIFNsaWRlc1xuICAgICAgICAgIHNsaWRlczogW10sXG4gICAgICAgICAgc2xpZGVzR3JpZDogW10sXG4gICAgICAgICAgc25hcEdyaWQ6IFtdLFxuICAgICAgICAgIHNsaWRlc1NpemVzR3JpZDogW10sXG4gICAgICAgICAgLy8gaXNEaXJlY3Rpb25cbiAgICAgICAgICBpc0hvcml6b250YWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaXNWZXJ0aWNhbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8gSW5kZXhlc1xuICAgICAgICAgIGFjdGl2ZUluZGV4OiAwLFxuICAgICAgICAgIHJlYWxJbmRleDogMCxcbiAgICAgICAgICAvL1xuICAgICAgICAgIGlzQmVnaW5uaW5nOiB0cnVlLFxuICAgICAgICAgIGlzRW5kOiBmYWxzZSxcbiAgICAgICAgICAvLyBQcm9wc1xuICAgICAgICAgIHRyYW5zbGF0ZTogMCxcbiAgICAgICAgICBwcmV2aW91c1RyYW5zbGF0ZTogMCxcbiAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICB2ZWxvY2l0eTogMCxcbiAgICAgICAgICBhbmltYXRpbmc6IGZhbHNlLFxuICAgICAgICAgIGNzc092ZXJmbG93QWRqdXN0bWVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnRydW5jKHRoaXMudHJhbnNsYXRlIC8gMiAqKiAyMykgKiAyICoqIDIzO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8gTG9ja3NcbiAgICAgICAgICBhbGxvd1NsaWRlTmV4dDogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlTmV4dCxcbiAgICAgICAgICBhbGxvd1NsaWRlUHJldjogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlUHJldixcbiAgICAgICAgICAvLyBUb3VjaCBFdmVudHNcbiAgICAgICAgICB0b3VjaEV2ZW50c0RhdGE6IHtcbiAgICAgICAgICAgIGlzVG91Y2hlZDogdm9pZCAwLFxuICAgICAgICAgICAgaXNNb3ZlZDogdm9pZCAwLFxuICAgICAgICAgICAgYWxsb3dUb3VjaENhbGxiYWNrczogdm9pZCAwLFxuICAgICAgICAgICAgdG91Y2hTdGFydFRpbWU6IHZvaWQgMCxcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nOiB2b2lkIDAsXG4gICAgICAgICAgICBjdXJyZW50VHJhbnNsYXRlOiB2b2lkIDAsXG4gICAgICAgICAgICBzdGFydFRyYW5zbGF0ZTogdm9pZCAwLFxuICAgICAgICAgICAgYWxsb3dUaHJlc2hvbGRNb3ZlOiB2b2lkIDAsXG4gICAgICAgICAgICAvLyBGb3JtIGVsZW1lbnRzIHRvIG1hdGNoXG4gICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50czogc3dpcGVyLnBhcmFtcy5mb2N1c2FibGVFbGVtZW50cyxcbiAgICAgICAgICAgIC8vIExhc3QgY2xpY2sgdGltZVxuICAgICAgICAgICAgbGFzdENsaWNrVGltZTogMCxcbiAgICAgICAgICAgIGNsaWNrVGltZW91dDogdm9pZCAwLFxuICAgICAgICAgICAgLy8gVmVsb2NpdGllc1xuICAgICAgICAgICAgdmVsb2NpdGllczogW10sXG4gICAgICAgICAgICBhbGxvd01vbWVudHVtQm91bmNlOiB2b2lkIDAsXG4gICAgICAgICAgICBzdGFydE1vdmluZzogdm9pZCAwLFxuICAgICAgICAgICAgcG9pbnRlcklkOiBudWxsLFxuICAgICAgICAgICAgdG91Y2hJZDogbnVsbFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8gQ2xpY2tzXG4gICAgICAgICAgYWxsb3dDbGljazogdHJ1ZSxcbiAgICAgICAgICAvLyBUb3VjaGVzXG4gICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IHN3aXBlci5wYXJhbXMuYWxsb3dUb3VjaE1vdmUsXG4gICAgICAgICAgdG91Y2hlczoge1xuICAgICAgICAgICAgc3RhcnRYOiAwLFxuICAgICAgICAgICAgc3RhcnRZOiAwLFxuICAgICAgICAgICAgY3VycmVudFg6IDAsXG4gICAgICAgICAgICBjdXJyZW50WTogMCxcbiAgICAgICAgICAgIGRpZmY6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIC8vIEltYWdlc1xuICAgICAgICAgIGltYWdlc1RvTG9hZDogW10sXG4gICAgICAgICAgaW1hZ2VzTG9hZGVkOiAwXG4gICAgICAgIH0pO1xuICAgICAgICBzd2lwZXIuZW1pdChcIl9zd2lwZXJcIik7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmluaXQpIHtcbiAgICAgICAgICBzd2lwZXIuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzd2lwZXI7XG4gICAgICB9XG4gICAgICBnZXREaXJlY3Rpb25MYWJlbChwcm9wZXJ0eSkge1xuICAgICAgICBpZiAodGhpcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIFwid2lkdGhcIjogXCJoZWlnaHRcIixcbiAgICAgICAgICBcIm1hcmdpbi10b3BcIjogXCJtYXJnaW4tbGVmdFwiLFxuICAgICAgICAgIFwibWFyZ2luLWJvdHRvbSBcIjogXCJtYXJnaW4tcmlnaHRcIixcbiAgICAgICAgICBcIm1hcmdpbi1sZWZ0XCI6IFwibWFyZ2luLXRvcFwiLFxuICAgICAgICAgIFwibWFyZ2luLXJpZ2h0XCI6IFwibWFyZ2luLWJvdHRvbVwiLFxuICAgICAgICAgIFwicGFkZGluZy1sZWZ0XCI6IFwicGFkZGluZy10b3BcIixcbiAgICAgICAgICBcInBhZGRpbmctcmlnaHRcIjogXCJwYWRkaW5nLWJvdHRvbVwiLFxuICAgICAgICAgIFwibWFyZ2luUmlnaHRcIjogXCJtYXJnaW5Cb3R0b21cIlxuICAgICAgICB9W3Byb3BlcnR5XTtcbiAgICAgIH1cbiAgICAgIGdldFNsaWRlSW5kZXgoc2xpZGVFbCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgc2xpZGVzRWwsXG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgIH0gPSB0aGlzO1xuICAgICAgICBjb25zdCBzbGlkZXMgPSBlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApO1xuICAgICAgICBjb25zdCBmaXJzdFNsaWRlSW5kZXggPSBlbGVtZW50SW5kZXgoc2xpZGVzWzBdKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRJbmRleChzbGlkZUVsKSAtIGZpcnN0U2xpZGVJbmRleDtcbiAgICAgIH1cbiAgICAgIGdldFNsaWRlSW5kZXhCeURhdGEoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2xpZGVJbmRleCh0aGlzLnNsaWRlcy5maWx0ZXIoKHNsaWRlRWwpID0+IHNsaWRlRWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIikgKiAxID09PSBpbmRleClbMF0pO1xuICAgICAgfVxuICAgICAgcmVjYWxjU2xpZGVzKCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgc2xpZGVzRWwsXG4gICAgICAgICAgcGFyYW1zXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIHN3aXBlci5zbGlkZXMgPSBlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApO1xuICAgICAgfVxuICAgICAgZW5hYmxlKCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIuZW1pdChcImVuYWJsZVwiKTtcbiAgICAgIH1cbiAgICAgIGRpc2FibGUoKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgICAgIHN3aXBlci51bnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIuZW1pdChcImRpc2FibGVcIik7XG4gICAgICB9XG4gICAgICBzZXRQcm9ncmVzcyhwcm9ncmVzcywgc3BlZWQpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChwcm9ncmVzcywgMCksIDEpO1xuICAgICAgICBjb25zdCBtaW4gPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gICAgICAgIGNvbnN0IG1heCA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IChtYXggLSBtaW4pICogcHJvZ3Jlc3MgKyBtaW47XG4gICAgICAgIHN3aXBlci50cmFuc2xhdGVUbyhjdXJyZW50LCB0eXBlb2Ygc3BlZWQgPT09IFwidW5kZWZpbmVkXCIgPyAwIDogc3BlZWQpO1xuICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIH1cbiAgICAgIGVtaXRDb250YWluZXJDbGFzc2VzKCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuX2VtaXRDbGFzc2VzIHx8ICFzd2lwZXIuZWwpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2xzID0gc3dpcGVyLmVsLmNsYXNzTmFtZS5zcGxpdChcIiBcIikuZmlsdGVyKChjbGFzc05hbWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gY2xhc3NOYW1lLmluZGV4T2YoXCJzd2lwZXJcIikgPT09IDAgfHwgY2xhc3NOYW1lLmluZGV4T2Yoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSA9PT0gMDtcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5lbWl0KFwiX2NvbnRhaW5lckNsYXNzZXNcIiwgY2xzLmpvaW4oXCIgXCIpKTtcbiAgICAgIH1cbiAgICAgIGdldFNsaWRlQ2xhc3NlcyhzbGlkZUVsKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIuZGVzdHJveWVkKSByZXR1cm4gXCJcIjtcbiAgICAgICAgcmV0dXJuIHNsaWRlRWwuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKS5maWx0ZXIoKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBjbGFzc05hbWUuaW5kZXhPZihcInN3aXBlci1zbGlkZVwiKSA9PT0gMCB8fCBjbGFzc05hbWUuaW5kZXhPZihzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3MpID09PSAwO1xuICAgICAgICB9KS5qb2luKFwiIFwiKTtcbiAgICAgIH1cbiAgICAgIGVtaXRTbGlkZXNDbGFzc2VzKCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuX2VtaXRDbGFzc2VzIHx8ICFzd2lwZXIuZWwpIHJldHVybjtcbiAgICAgICAgY29uc3QgdXBkYXRlcyA9IFtdO1xuICAgICAgICBzd2lwZXIuc2xpZGVzLmZvckVhY2goKHNsaWRlRWwpID0+IHtcbiAgICAgICAgICBjb25zdCBjbGFzc05hbWVzID0gc3dpcGVyLmdldFNsaWRlQ2xhc3NlcyhzbGlkZUVsKTtcbiAgICAgICAgICB1cGRhdGVzLnB1c2goe1xuICAgICAgICAgICAgc2xpZGVFbCxcbiAgICAgICAgICAgIGNsYXNzTmFtZXNcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzd2lwZXIuZW1pdChcIl9zbGlkZUNsYXNzXCIsIHNsaWRlRWwsIGNsYXNzTmFtZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLmVtaXQoXCJfc2xpZGVDbGFzc2VzXCIsIHVwZGF0ZXMpO1xuICAgICAgfVxuICAgICAgc2xpZGVzUGVyVmlld0R5bmFtaWModmlldywgZXhhY3QpIHtcbiAgICAgICAgaWYgKHZpZXcgPT09IHZvaWQgMCkge1xuICAgICAgICAgIHZpZXcgPSBcImN1cnJlbnRcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXhhY3QgPT09IHZvaWQgMCkge1xuICAgICAgICAgIGV4YWN0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICBzbGlkZXMsXG4gICAgICAgICAgc2xpZGVzR3JpZCxcbiAgICAgICAgICBzbGlkZXNTaXplc0dyaWQsXG4gICAgICAgICAgc2l6ZTogc3dpcGVyU2l6ZSxcbiAgICAgICAgICBhY3RpdmVJbmRleFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBsZXQgc3B2ID0gMTtcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgICAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgbGV0IHNsaWRlU2l6ZSA9IHNsaWRlc1thY3RpdmVJbmRleF0gPyBNYXRoLmNlaWwoc2xpZGVzW2FjdGl2ZUluZGV4XS5zd2lwZXJTbGlkZVNpemUpIDogMDtcbiAgICAgICAgICBsZXQgYnJlYWtMb29wO1xuICAgICAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCArIDE7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChzbGlkZXNbaV0gJiYgIWJyZWFrTG9vcCkge1xuICAgICAgICAgICAgICBzbGlkZVNpemUgKz0gTWF0aC5jZWlsKHNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemUpO1xuICAgICAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlU2l6ZSA+IHN3aXBlclNpemUpIGJyZWFrTG9vcCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICAgICBpZiAoc2xpZGVzW2ldICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICAgICAgc2xpZGVTaXplICs9IHNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemU7XG4gICAgICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgICAgICBpZiAoc2xpZGVTaXplID4gc3dpcGVyU2l6ZSkgYnJlYWtMb29wID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHZpZXcgPT09IFwiY3VycmVudFwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggKyAxOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHNsaWRlSW5WaWV3ID0gZXhhY3QgPyBzbGlkZXNHcmlkW2ldICsgc2xpZGVzU2l6ZXNHcmlkW2ldIC0gc2xpZGVzR3JpZFthY3RpdmVJbmRleF0gPCBzd2lwZXJTaXplIDogc2xpZGVzR3JpZFtpXSAtIHNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdIDwgc3dpcGVyU2l6ZTtcbiAgICAgICAgICAgICAgaWYgKHNsaWRlSW5WaWV3KSB7XG4gICAgICAgICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4IC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2xpZGVJblZpZXcgPSBzbGlkZXNHcmlkW2FjdGl2ZUluZGV4XSAtIHNsaWRlc0dyaWRbaV0gPCBzd2lwZXJTaXplO1xuICAgICAgICAgICAgICBpZiAoc2xpZGVJblZpZXcpIHtcbiAgICAgICAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3B2O1xuICAgICAgfVxuICAgICAgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzbmFwR3JpZCxcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgaWYgKHBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgWy4uLnN3aXBlci5lbC5xdWVyeVNlbGVjdG9yQWxsKCdbbG9hZGluZz1cImxhenlcIl0nKV0uZm9yRWFjaCgoaW1hZ2VFbCkgPT4ge1xuICAgICAgICAgIGlmIChpbWFnZUVsLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICBwcm9jZXNzTGF6eVByZWxvYWRlcihzd2lwZXIsIGltYWdlRWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTaXplKCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICAgIGZ1bmN0aW9uIHNldFRyYW5zbGF0ZTIoKSB7XG4gICAgICAgICAgY29uc3QgdHJhbnNsYXRlVmFsdWUgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSAqIC0xIDogc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgICAgICBjb25zdCBuZXdUcmFuc2xhdGUgPSBNYXRoLm1pbihNYXRoLm1heCh0cmFuc2xhdGVWYWx1ZSwgc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSwgc3dpcGVyLm1pblRyYW5zbGF0ZSgpKTtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG4gICAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdHJhbnNsYXRlZDtcbiAgICAgICAgaWYgKHBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiAhcGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzZXRUcmFuc2xhdGUyKCk7XG4gICAgICAgICAgaWYgKHBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgICAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIiB8fCBwYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpICYmIHN3aXBlci5pc0VuZCAmJiAhcGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXMgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzIDogc3dpcGVyLnNsaWRlcztcbiAgICAgICAgICAgIHRyYW5zbGF0ZWQgPSBzd2lwZXIuc2xpZGVUbyhzbGlkZXMubGVuZ3RoIC0gMSwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVkID0gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghdHJhbnNsYXRlZCkge1xuICAgICAgICAgICAgc2V0VHJhbnNsYXRlMigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc25hcEdyaWQgIT09IHN3aXBlci5zbmFwR3JpZCkge1xuICAgICAgICAgIHN3aXBlci5jaGVja092ZXJmbG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpcGVyLmVtaXQoXCJ1cGRhdGVcIik7XG4gICAgICB9XG4gICAgICBjaGFuZ2VEaXJlY3Rpb24obmV3RGlyZWN0aW9uLCBuZWVkVXBkYXRlKSB7XG4gICAgICAgIGlmIChuZWVkVXBkYXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgICBuZWVkVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBjb25zdCBjdXJyZW50RGlyZWN0aW9uID0gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb247XG4gICAgICAgIGlmICghbmV3RGlyZWN0aW9uKSB7XG4gICAgICAgICAgbmV3RGlyZWN0aW9uID0gY3VycmVudERpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3RGlyZWN0aW9uID09PSBjdXJyZW50RGlyZWN0aW9uIHx8IG5ld0RpcmVjdGlvbiAhPT0gXCJob3Jpem9udGFsXCIgJiYgbmV3RGlyZWN0aW9uICE9PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgICByZXR1cm4gc3dpcGVyO1xuICAgICAgICB9XG4gICAgICAgIHN3aXBlci5lbC5jbGFzc0xpc3QucmVtb3ZlKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc30ke2N1cnJlbnREaXJlY3Rpb259YCk7XG4gICAgICAgIHN3aXBlci5lbC5jbGFzc0xpc3QuYWRkKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc30ke25ld0RpcmVjdGlvbn1gKTtcbiAgICAgICAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG4gICAgICAgIHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID0gbmV3RGlyZWN0aW9uO1xuICAgICAgICBzd2lwZXIuc2xpZGVzLmZvckVhY2goKHNsaWRlRWwpID0+IHtcbiAgICAgICAgICBpZiAobmV3RGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgICAgIHNsaWRlRWwuc3R5bGUud2lkdGggPSBcIlwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGlkZUVsLnN0eWxlLmhlaWdodCA9IFwiXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLmVtaXQoXCJjaGFuZ2VEaXJlY3Rpb25cIik7XG4gICAgICAgIGlmIChuZWVkVXBkYXRlKSBzd2lwZXIudXBkYXRlKCk7XG4gICAgICAgIHJldHVybiBzd2lwZXI7XG4gICAgICB9XG4gICAgICBjaGFuZ2VMYW5ndWFnZURpcmVjdGlvbihkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5ydGwgJiYgZGlyZWN0aW9uID09PSBcInJ0bFwiIHx8ICFzd2lwZXIucnRsICYmIGRpcmVjdGlvbiA9PT0gXCJsdHJcIikgcmV0dXJuO1xuICAgICAgICBzd2lwZXIucnRsID0gZGlyZWN0aW9uID09PSBcInJ0bFwiO1xuICAgICAgICBzd2lwZXIucnRsVHJhbnNsYXRlID0gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiICYmIHN3aXBlci5ydGw7XG4gICAgICAgIGlmIChzd2lwZXIucnRsKSB7XG4gICAgICAgICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5hZGQoYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfXJ0bGApO1xuICAgICAgICAgIHN3aXBlci5lbC5kaXIgPSBcInJ0bFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5lbC5jbGFzc0xpc3QucmVtb3ZlKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ydGxgKTtcbiAgICAgICAgICBzd2lwZXIuZWwuZGlyID0gXCJsdHJcIjtcbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIudXBkYXRlKCk7XG4gICAgICB9XG4gICAgICBtb3VudChlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIubW91bnRlZCkgcmV0dXJuIHRydWU7XG4gICAgICAgIGxldCBlbCA9IGVsZW1lbnQgfHwgc3dpcGVyLnBhcmFtcy5lbDtcbiAgICAgICAgaWYgKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbC5zd2lwZXIgPSBzd2lwZXI7XG4gICAgICAgIGlmIChlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUuaG9zdCAmJiBlbC5wYXJlbnROb2RlLmhvc3Qubm9kZU5hbWUgPT09IHN3aXBlci5wYXJhbXMuc3dpcGVyRWxlbWVudE5vZGVOYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICBzd2lwZXIuaXNFbGVtZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBnZXRXcmFwcGVyU2VsZWN0b3IgPSAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGAuJHsoc3dpcGVyLnBhcmFtcy53cmFwcGVyQ2xhc3MgfHwgXCJcIikudHJpbSgpLnNwbGl0KFwiIFwiKS5qb2luKFwiLlwiKX1gO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBnZXRXcmFwcGVyID0gKCkgPT4ge1xuICAgICAgICAgIGlmIChlbCAmJiBlbC5zaGFkb3dSb290ICYmIGVsLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcikge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gZWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKGdldFdyYXBwZXJTZWxlY3RvcigpKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBlbGVtZW50Q2hpbGRyZW4oZWwsIGdldFdyYXBwZXJTZWxlY3RvcigpKVswXTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHdyYXBwZXJFbCA9IGdldFdyYXBwZXIoKTtcbiAgICAgICAgaWYgKCF3cmFwcGVyRWwgJiYgc3dpcGVyLnBhcmFtcy5jcmVhdGVFbGVtZW50cykge1xuICAgICAgICAgIHdyYXBwZXJFbCA9IGNyZWF0ZUVsZW1lbnQyKFwiZGl2XCIsIHN3aXBlci5wYXJhbXMud3JhcHBlckNsYXNzKTtcbiAgICAgICAgICBlbC5hcHBlbmQod3JhcHBlckVsKTtcbiAgICAgICAgICBlbGVtZW50Q2hpbGRyZW4oZWwsIGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9YCkuZm9yRWFjaCgoc2xpZGVFbCkgPT4ge1xuICAgICAgICAgICAgd3JhcHBlckVsLmFwcGVuZChzbGlkZUVsKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgICAgICAgIGVsLFxuICAgICAgICAgIHdyYXBwZXJFbCxcbiAgICAgICAgICBzbGlkZXNFbDogc3dpcGVyLmlzRWxlbWVudCAmJiAhZWwucGFyZW50Tm9kZS5ob3N0LnNsaWRlU2xvdHMgPyBlbC5wYXJlbnROb2RlLmhvc3QgOiB3cmFwcGVyRWwsXG4gICAgICAgICAgaG9zdEVsOiBzd2lwZXIuaXNFbGVtZW50ID8gZWwucGFyZW50Tm9kZS5ob3N0IDogZWwsXG4gICAgICAgICAgbW91bnRlZDogdHJ1ZSxcbiAgICAgICAgICAvLyBSVExcbiAgICAgICAgICBydGw6IGVsLmRpci50b0xvd2VyQ2FzZSgpID09PSBcInJ0bFwiIHx8IGVsZW1lbnRTdHlsZShlbCwgXCJkaXJlY3Rpb25cIikgPT09IFwicnRsXCIsXG4gICAgICAgICAgcnRsVHJhbnNsYXRlOiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgJiYgKGVsLmRpci50b0xvd2VyQ2FzZSgpID09PSBcInJ0bFwiIHx8IGVsZW1lbnRTdHlsZShlbCwgXCJkaXJlY3Rpb25cIikgPT09IFwicnRsXCIpLFxuICAgICAgICAgIHdyb25nUlRMOiBlbGVtZW50U3R5bGUod3JhcHBlckVsLCBcImRpc3BsYXlcIikgPT09IFwiLXdlYmtpdC1ib3hcIlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpbml0KGVsKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIuaW5pdGlhbGl6ZWQpIHJldHVybiBzd2lwZXI7XG4gICAgICAgIGNvbnN0IG1vdW50ZWQgPSBzd2lwZXIubW91bnQoZWwpO1xuICAgICAgICBpZiAobW91bnRlZCA9PT0gZmFsc2UpIHJldHVybiBzd2lwZXI7XG4gICAgICAgIHN3aXBlci5lbWl0KFwiYmVmb3JlSW5pdFwiKTtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0QnJlYWtwb2ludCgpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXBlci5hZGRDbGFzc2VzKCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTaXplKCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdykge1xuICAgICAgICAgIHN3aXBlci5jaGVja092ZXJmbG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZ3JhYkN1cnNvciAmJiBzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCAmJiBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlICsgc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlLCAwLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCwgZmFsc2UsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlLCAwLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCwgZmFsc2UsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXBlci5hdHRhY2hFdmVudHMoKTtcbiAgICAgICAgY29uc3QgbGF6eUVsZW1lbnRzID0gWy4uLnN3aXBlci5lbC5xdWVyeVNlbGVjdG9yQWxsKCdbbG9hZGluZz1cImxhenlcIl0nKV07XG4gICAgICAgIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgICAgICAgbGF6eUVsZW1lbnRzLnB1c2goLi4uc3dpcGVyLmhvc3RFbC5xdWVyeVNlbGVjdG9yQWxsKCdbbG9hZGluZz1cImxhenlcIl0nKSk7XG4gICAgICAgIH1cbiAgICAgICAgbGF6eUVsZW1lbnRzLmZvckVhY2goKGltYWdlRWwpID0+IHtcbiAgICAgICAgICBpZiAoaW1hZ2VFbC5jb21wbGV0ZSkge1xuICAgICAgICAgICAgcHJvY2Vzc0xhenlQcmVsb2FkZXIoc3dpcGVyLCBpbWFnZUVsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW1hZ2VFbC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICBwcm9jZXNzTGF6eVByZWxvYWRlcihzd2lwZXIsIGUudGFyZ2V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHByZWxvYWQoc3dpcGVyKTtcbiAgICAgICAgc3dpcGVyLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgcHJlbG9hZChzd2lwZXIpO1xuICAgICAgICBzd2lwZXIuZW1pdChcImluaXRcIik7XG4gICAgICAgIHN3aXBlci5lbWl0KFwiYWZ0ZXJJbml0XCIpO1xuICAgICAgICByZXR1cm4gc3dpcGVyO1xuICAgICAgfVxuICAgICAgZGVzdHJveShkZWxldGVJbnN0YW5jZSwgY2xlYW5TdHlsZXMpIHtcbiAgICAgICAgaWYgKGRlbGV0ZUluc3RhbmNlID09PSB2b2lkIDApIHtcbiAgICAgICAgICBkZWxldGVJbnN0YW5jZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNsZWFuU3R5bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgICBjbGVhblN0eWxlcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICB3cmFwcGVyRWwsXG4gICAgICAgICAgc2xpZGVzXG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcyA9PT0gXCJ1bmRlZmluZWRcIiB8fCBzd2lwZXIuZGVzdHJveWVkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc3dpcGVyLmVtaXQoXCJiZWZvcmVEZXN0cm95XCIpO1xuICAgICAgICBzd2lwZXIuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgc3dpcGVyLmRldGFjaEV2ZW50cygpO1xuICAgICAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xlYW5TdHlsZXMpIHtcbiAgICAgICAgICBzd2lwZXIucmVtb3ZlQ2xhc3NlcygpO1xuICAgICAgICAgIGlmIChlbCAmJiB0eXBlb2YgZWwgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAod3JhcHBlckVsKSB7XG4gICAgICAgICAgICB3cmFwcGVyRWwucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzbGlkZXMgJiYgc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlRWwpID0+IHtcbiAgICAgICAgICAgICAgc2xpZGVFbC5jbGFzc0xpc3QucmVtb3ZlKHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcywgcGFyYW1zLnNsaWRlRnVsbHlWaXNpYmxlQ2xhc3MsIHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzLCBwYXJhbXMuc2xpZGVOZXh0Q2xhc3MsIHBhcmFtcy5zbGlkZVByZXZDbGFzcyk7XG4gICAgICAgICAgICAgIHNsaWRlRWwucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gICAgICAgICAgICAgIHNsaWRlRWwucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3dpcGVyLmVtaXQoXCJkZXN0cm95XCIpO1xuICAgICAgICBPYmplY3Qua2V5cyhzd2lwZXIuZXZlbnRzTGlzdGVuZXJzKS5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcbiAgICAgICAgICBzd2lwZXIub2ZmKGV2ZW50TmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGVsZXRlSW5zdGFuY2UgIT09IGZhbHNlKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5lbCAmJiB0eXBlb2Ygc3dpcGVyLmVsICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBzd2lwZXIuZWwuc3dpcGVyID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVsZXRlUHJvcHMoc3dpcGVyKTtcbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBzdGF0aWMgZXh0ZW5kRGVmYXVsdHMobmV3RGVmYXVsdHMpIHtcbiAgICAgICAgZXh0ZW5kMihleHRlbmRlZERlZmF1bHRzLCBuZXdEZWZhdWx0cyk7XG4gICAgICB9XG4gICAgICBzdGF0aWMgZ2V0IGV4dGVuZGVkRGVmYXVsdHMoKSB7XG4gICAgICAgIHJldHVybiBleHRlbmRlZERlZmF1bHRzO1xuICAgICAgfVxuICAgICAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgICAgfVxuICAgICAgc3RhdGljIGluc3RhbGxNb2R1bGUobW9kKSB7XG4gICAgICAgIGlmICghX1N3aXBlci5wcm90b3R5cGUuX19tb2R1bGVzX18pIF9Td2lwZXIucHJvdG90eXBlLl9fbW9kdWxlc19fID0gW107XG4gICAgICAgIGNvbnN0IG1vZHVsZXMgPSBfU3dpcGVyLnByb3RvdHlwZS5fX21vZHVsZXNfXztcbiAgICAgICAgaWYgKHR5cGVvZiBtb2QgPT09IFwiZnVuY3Rpb25cIiAmJiBtb2R1bGVzLmluZGV4T2YobW9kKSA8IDApIHtcbiAgICAgICAgICBtb2R1bGVzLnB1c2gobW9kKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3RhdGljIHVzZShtb2R1bGUpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobW9kdWxlKSkge1xuICAgICAgICAgIG1vZHVsZS5mb3JFYWNoKChtKSA9PiBfU3dpcGVyLmluc3RhbGxNb2R1bGUobSkpO1xuICAgICAgICAgIHJldHVybiBfU3dpcGVyO1xuICAgICAgICB9XG4gICAgICAgIF9Td2lwZXIuaW5zdGFsbE1vZHVsZShtb2R1bGUpO1xuICAgICAgICByZXR1cm4gX1N3aXBlcjtcbiAgICAgIH1cbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKHByb3RvdHlwZXMpLmZvckVhY2goKHByb3RvdHlwZUdyb3VwKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhwcm90b3R5cGVzW3Byb3RvdHlwZUdyb3VwXSkuZm9yRWFjaCgocHJvdG9NZXRob2QpID0+IHtcbiAgICAgICAgU3dpcGVyLnByb3RvdHlwZVtwcm90b01ldGhvZF0gPSBwcm90b3R5cGVzW3Byb3RvdHlwZUdyb3VwXVtwcm90b01ldGhvZF07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBTd2lwZXIudXNlKFtSZXNpemUsIE9ic2VydmVyXSk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3N3aXBlci5tanNcbnZhciBpbml0X3N3aXBlciA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3N3aXBlci5tanNcIigpIHtcbiAgICBpbml0X3N3aXBlcl9jb3JlKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvdmlydHVhbC5tanNcbnZhciBpbml0X3ZpcnR1YWwgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3ZpcnR1YWwubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9rZXlib2FyZC5tanNcbmZ1bmN0aW9uIEtleWJvYXJkKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgZXh0ZW5kUGFyYW1zLFxuICAgIG9uLFxuICAgIGVtaXRcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IGRvY3VtZW50MiA9IGdldERvY3VtZW50KCk7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgc3dpcGVyLmtleWJvYXJkID0ge1xuICAgIGVuYWJsZWQ6IGZhbHNlXG4gIH07XG4gIGV4dGVuZFBhcmFtcyh7XG4gICAga2V5Ym9hcmQ6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgb25seUluVmlld3BvcnQ6IHRydWUsXG4gICAgICBwYWdlVXBEb3duOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgZnVuY3Rpb24gaGFuZGxlKGV2ZW50Mikge1xuICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICBjb25zdCB7XG4gICAgICBydGxUcmFuc2xhdGU6IHJ0bFxuICAgIH0gPSBzd2lwZXI7XG4gICAgbGV0IGUgPSBldmVudDI7XG4gICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICBjb25zdCBrYyA9IGUua2V5Q29kZSB8fCBlLmNoYXJDb2RlO1xuICAgIGNvbnN0IHBhZ2VVcERvd24gPSBzd2lwZXIucGFyYW1zLmtleWJvYXJkLnBhZ2VVcERvd247XG4gICAgY29uc3QgaXNQYWdlVXAgPSBwYWdlVXBEb3duICYmIGtjID09PSAzMztcbiAgICBjb25zdCBpc1BhZ2VEb3duID0gcGFnZVVwRG93biAmJiBrYyA9PT0gMzQ7XG4gICAgY29uc3QgaXNBcnJvd0xlZnQgPSBrYyA9PT0gMzc7XG4gICAgY29uc3QgaXNBcnJvd1JpZ2h0ID0ga2MgPT09IDM5O1xuICAgIGNvbnN0IGlzQXJyb3dVcCA9IGtjID09PSAzODtcbiAgICBjb25zdCBpc0Fycm93RG93biA9IGtjID09PSA0MDtcbiAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIGlzQXJyb3dSaWdodCB8fCBzd2lwZXIuaXNWZXJ0aWNhbCgpICYmIGlzQXJyb3dEb3duIHx8IGlzUGFnZURvd24pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYgaXNBcnJvd0xlZnQgfHwgc3dpcGVyLmlzVmVydGljYWwoKSAmJiBpc0Fycm93VXAgfHwgaXNQYWdlVXApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5IHx8IGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudDIuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudDIuYWN0aXZlRWxlbWVudC5ub2RlTmFtZSAmJiAoZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiIHx8IGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidGV4dGFyZWFcIikpIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLmtleWJvYXJkLm9ubHlJblZpZXdwb3J0ICYmIChpc1BhZ2VVcCB8fCBpc1BhZ2VEb3duIHx8IGlzQXJyb3dMZWZ0IHx8IGlzQXJyb3dSaWdodCB8fCBpc0Fycm93VXAgfHwgaXNBcnJvd0Rvd24pKSB7XG4gICAgICBsZXQgaW5WaWV3ID0gZmFsc2U7XG4gICAgICBpZiAoZWxlbWVudFBhcmVudHMoc3dpcGVyLmVsLCBgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCkubGVuZ3RoID4gMCAmJiBlbGVtZW50UGFyZW50cyhzd2lwZXIuZWwsIGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3N9YCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG4gICAgICBjb25zdCBlbCA9IHN3aXBlci5lbDtcbiAgICAgIGNvbnN0IHN3aXBlcldpZHRoID0gZWwuY2xpZW50V2lkdGg7XG4gICAgICBjb25zdCBzd2lwZXJIZWlnaHQgPSBlbC5jbGllbnRIZWlnaHQ7XG4gICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdzIuaW5uZXJXaWR0aDtcbiAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdzIuaW5uZXJIZWlnaHQ7XG4gICAgICBjb25zdCBzd2lwZXJPZmZzZXQgPSBlbGVtZW50T2Zmc2V0KGVsKTtcbiAgICAgIGlmIChydGwpIHN3aXBlck9mZnNldC5sZWZ0IC09IGVsLnNjcm9sbExlZnQ7XG4gICAgICBjb25zdCBzd2lwZXJDb29yZCA9IFtbc3dpcGVyT2Zmc2V0LmxlZnQsIHN3aXBlck9mZnNldC50b3BdLCBbc3dpcGVyT2Zmc2V0LmxlZnQgKyBzd2lwZXJXaWR0aCwgc3dpcGVyT2Zmc2V0LnRvcF0sIFtzd2lwZXJPZmZzZXQubGVmdCwgc3dpcGVyT2Zmc2V0LnRvcCArIHN3aXBlckhlaWdodF0sIFtzd2lwZXJPZmZzZXQubGVmdCArIHN3aXBlcldpZHRoLCBzd2lwZXJPZmZzZXQudG9wICsgc3dpcGVySGVpZ2h0XV07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlckNvb3JkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IHBvaW50ID0gc3dpcGVyQ29vcmRbaV07XG4gICAgICAgIGlmIChwb2ludFswXSA+PSAwICYmIHBvaW50WzBdIDw9IHdpbmRvd1dpZHRoICYmIHBvaW50WzFdID49IDAgJiYgcG9pbnRbMV0gPD0gd2luZG93SGVpZ2h0KSB7XG4gICAgICAgICAgaWYgKHBvaW50WzBdID09PSAwICYmIHBvaW50WzFdID09PSAwKSBjb250aW51ZTtcbiAgICAgICAgICBpblZpZXcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWluVmlldykgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgaWYgKGlzUGFnZVVwIHx8IGlzUGFnZURvd24gfHwgaXNBcnJvd0xlZnQgfHwgaXNBcnJvd1JpZ2h0KSB7XG4gICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKChpc1BhZ2VEb3duIHx8IGlzQXJyb3dSaWdodCkgJiYgIXJ0bCB8fCAoaXNQYWdlVXAgfHwgaXNBcnJvd0xlZnQpICYmIHJ0bCkgc3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgaWYgKChpc1BhZ2VVcCB8fCBpc0Fycm93TGVmdCkgJiYgIXJ0bCB8fCAoaXNQYWdlRG93biB8fCBpc0Fycm93UmlnaHQpICYmIHJ0bCkgc3dpcGVyLnNsaWRlUHJldigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNQYWdlVXAgfHwgaXNQYWdlRG93biB8fCBpc0Fycm93VXAgfHwgaXNBcnJvd0Rvd24pIHtcbiAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoaXNQYWdlRG93biB8fCBpc0Fycm93RG93bikgc3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgaWYgKGlzUGFnZVVwIHx8IGlzQXJyb3dVcCkgc3dpcGVyLnNsaWRlUHJldigpO1xuICAgIH1cbiAgICBlbWl0KFwia2V5UHJlc3NcIiwga2MpO1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbiAgZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgIGlmIChzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCkgcmV0dXJuO1xuICAgIGRvY3VtZW50Mi5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGUpO1xuICAgIHN3aXBlci5rZXlib2FyZC5lbmFibGVkID0gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgIGlmICghc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQpIHJldHVybjtcbiAgICBkb2N1bWVudDIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlKTtcbiAgICBzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCA9IGZhbHNlO1xuICB9XG4gIG9uKFwiaW5pdFwiLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMua2V5Ym9hcmQuZW5hYmxlZCkge1xuICAgICAgZW5hYmxlKCk7XG4gICAgfVxuICB9KTtcbiAgb24oXCJkZXN0cm95XCIsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQpIHtcbiAgICAgIGRpc2FibGUoKTtcbiAgICB9XG4gIH0pO1xuICBPYmplY3QuYXNzaWduKHN3aXBlci5rZXlib2FyZCwge1xuICAgIGVuYWJsZSxcbiAgICBkaXNhYmxlXG4gIH0pO1xufVxudmFyIGluaXRfa2V5Ym9hcmQgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2tleWJvYXJkLm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvbW91c2V3aGVlbC5tanNcbmZ1bmN0aW9uIE1vdXNld2hlZWwoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBleHRlbmRQYXJhbXMsXG4gICAgb24sXG4gICAgZW1pdFxuICB9ID0gX3JlZjtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBleHRlbmRQYXJhbXMoe1xuICAgIG1vdXNld2hlZWw6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgcmVsZWFzZU9uRWRnZXM6IGZhbHNlLFxuICAgICAgaW52ZXJ0OiBmYWxzZSxcbiAgICAgIGZvcmNlVG9BeGlzOiBmYWxzZSxcbiAgICAgIHNlbnNpdGl2aXR5OiAxLFxuICAgICAgZXZlbnRzVGFyZ2V0OiBcImNvbnRhaW5lclwiLFxuICAgICAgdGhyZXNob2xkRGVsdGE6IG51bGwsXG4gICAgICB0aHJlc2hvbGRUaW1lOiBudWxsLFxuICAgICAgbm9Nb3VzZXdoZWVsQ2xhc3M6IFwic3dpcGVyLW5vLW1vdXNld2hlZWxcIlxuICAgIH1cbiAgfSk7XG4gIHN3aXBlci5tb3VzZXdoZWVsID0ge1xuICAgIGVuYWJsZWQ6IGZhbHNlXG4gIH07XG4gIGxldCB0aW1lb3V0O1xuICBsZXQgbGFzdFNjcm9sbFRpbWUgPSBub3coKTtcbiAgbGV0IGxhc3RFdmVudEJlZm9yZVNuYXA7XG4gIGNvbnN0IHJlY2VudFdoZWVsRXZlbnRzID0gW107XG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZShlKSB7XG4gICAgY29uc3QgUElYRUxfU1RFUCA9IDEwO1xuICAgIGNvbnN0IExJTkVfSEVJR0hUID0gNDA7XG4gICAgY29uc3QgUEFHRV9IRUlHSFQgPSA4MDA7XG4gICAgbGV0IHNYID0gMDtcbiAgICBsZXQgc1kgPSAwO1xuICAgIGxldCBwWCA9IDA7XG4gICAgbGV0IHBZID0gMDtcbiAgICBpZiAoXCJkZXRhaWxcIiBpbiBlKSB7XG4gICAgICBzWSA9IGUuZGV0YWlsO1xuICAgIH1cbiAgICBpZiAoXCJ3aGVlbERlbHRhXCIgaW4gZSkge1xuICAgICAgc1kgPSAtZS53aGVlbERlbHRhIC8gMTIwO1xuICAgIH1cbiAgICBpZiAoXCJ3aGVlbERlbHRhWVwiIGluIGUpIHtcbiAgICAgIHNZID0gLWUud2hlZWxEZWx0YVkgLyAxMjA7XG4gICAgfVxuICAgIGlmIChcIndoZWVsRGVsdGFYXCIgaW4gZSkge1xuICAgICAgc1ggPSAtZS53aGVlbERlbHRhWCAvIDEyMDtcbiAgICB9XG4gICAgaWYgKFwiYXhpc1wiIGluIGUgJiYgZS5heGlzID09PSBlLkhPUklaT05UQUxfQVhJUykge1xuICAgICAgc1ggPSBzWTtcbiAgICAgIHNZID0gMDtcbiAgICB9XG4gICAgcFggPSBzWCAqIFBJWEVMX1NURVA7XG4gICAgcFkgPSBzWSAqIFBJWEVMX1NURVA7XG4gICAgaWYgKFwiZGVsdGFZXCIgaW4gZSkge1xuICAgICAgcFkgPSBlLmRlbHRhWTtcbiAgICB9XG4gICAgaWYgKFwiZGVsdGFYXCIgaW4gZSkge1xuICAgICAgcFggPSBlLmRlbHRhWDtcbiAgICB9XG4gICAgaWYgKGUuc2hpZnRLZXkgJiYgIXBYKSB7XG4gICAgICBwWCA9IHBZO1xuICAgICAgcFkgPSAwO1xuICAgIH1cbiAgICBpZiAoKHBYIHx8IHBZKSAmJiBlLmRlbHRhTW9kZSkge1xuICAgICAgaWYgKGUuZGVsdGFNb2RlID09PSAxKSB7XG4gICAgICAgIHBYICo9IExJTkVfSEVJR0hUO1xuICAgICAgICBwWSAqPSBMSU5FX0hFSUdIVDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBYICo9IFBBR0VfSEVJR0hUO1xuICAgICAgICBwWSAqPSBQQUdFX0hFSUdIVDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBYICYmICFzWCkge1xuICAgICAgc1ggPSBwWCA8IDEgPyAtMSA6IDE7XG4gICAgfVxuICAgIGlmIChwWSAmJiAhc1kpIHtcbiAgICAgIHNZID0gcFkgPCAxID8gLTEgOiAxO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgc3Bpblg6IHNYLFxuICAgICAgc3Bpblk6IHNZLFxuICAgICAgcGl4ZWxYOiBwWCxcbiAgICAgIHBpeGVsWTogcFlcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZU1vdXNlRW50ZXIoKSB7XG4gICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgIHN3aXBlci5tb3VzZUVudGVyZWQgPSB0cnVlO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZU1vdXNlTGVhdmUoKSB7XG4gICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgIHN3aXBlci5tb3VzZUVudGVyZWQgPSBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBhbmltYXRlU2xpZGVyKG5ld0V2ZW50KSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC50aHJlc2hvbGREZWx0YSAmJiBuZXdFdmVudC5kZWx0YSA8IHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC50aHJlc2hvbGREZWx0YSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLnRocmVzaG9sZFRpbWUgJiYgbm93KCkgLSBsYXN0U2Nyb2xsVGltZSA8IHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC50aHJlc2hvbGRUaW1lKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChuZXdFdmVudC5kZWx0YSA+PSA2ICYmIG5vdygpIC0gbGFzdFNjcm9sbFRpbWUgPCA2MCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChuZXdFdmVudC5kaXJlY3Rpb24gPCAwKSB7XG4gICAgICBpZiAoKCFzd2lwZXIuaXNFbmQgfHwgc3dpcGVyLnBhcmFtcy5sb29wKSAmJiAhc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgICBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICAgIGVtaXQoXCJzY3JvbGxcIiwgbmV3RXZlbnQucmF3KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCghc3dpcGVyLmlzQmVnaW5uaW5nIHx8IHN3aXBlci5wYXJhbXMubG9vcCkgJiYgIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICAgIGVtaXQoXCJzY3JvbGxcIiwgbmV3RXZlbnQucmF3KTtcbiAgICB9XG4gICAgbGFzdFNjcm9sbFRpbWUgPSBuZXcgd2luZG93Mi5EYXRlKCkuZ2V0VGltZSgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiByZWxlYXNlU2Nyb2xsKG5ld0V2ZW50KSB7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsO1xuICAgIGlmIChuZXdFdmVudC5kaXJlY3Rpb24gPCAwKSB7XG4gICAgICBpZiAoc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmxvb3AgJiYgcGFyYW1zLnJlbGVhc2VPbkVkZ2VzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmxvb3AgJiYgcGFyYW1zLnJlbGVhc2VPbkVkZ2VzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGhhbmRsZShldmVudDIpIHtcbiAgICBsZXQgZSA9IGV2ZW50MjtcbiAgICBsZXQgZGlzYWJsZVBhcmVudFN3aXBlciA9IHRydWU7XG4gICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgIGlmIChldmVudDIudGFyZ2V0LmNsb3Nlc3QoYC4ke3N3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ub01vdXNld2hlZWxDbGFzc31gKSkgcmV0dXJuO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubW91c2V3aGVlbDtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGxldCB0YXJnZXRFbCA9IHN3aXBlci5lbDtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdldCAhPT0gXCJjb250YWluZXJcIikge1xuICAgICAgdGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZXQpO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXRFbENvbnRhaW5zVGFyZ2V0ID0gdGFyZ2V0RWwgJiYgdGFyZ2V0RWwuY29udGFpbnMoZS50YXJnZXQpO1xuICAgIGlmICghc3dpcGVyLm1vdXNlRW50ZXJlZCAmJiAhdGFyZ2V0RWxDb250YWluc1RhcmdldCAmJiAhcGFyYW1zLnJlbGVhc2VPbkVkZ2VzKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICAgIGxldCBkZWx0YSA9IDA7XG4gICAgY29uc3QgcnRsRmFjdG9yID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IC0xIDogMTtcbiAgICBjb25zdCBkYXRhID0gbm9ybWFsaXplKGUpO1xuICAgIGlmIChwYXJhbXMuZm9yY2VUb0F4aXMpIHtcbiAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRhdGEucGl4ZWxYKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxZKSkgZGVsdGEgPSAtZGF0YS5waXhlbFggKiBydGxGYWN0b3I7XG4gICAgICAgIGVsc2UgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGRhdGEucGl4ZWxZKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxYKSkgZGVsdGEgPSAtZGF0YS5waXhlbFk7XG4gICAgICBlbHNlIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWx0YSA9IE1hdGguYWJzKGRhdGEucGl4ZWxYKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxZKSA/IC1kYXRhLnBpeGVsWCAqIHJ0bEZhY3RvciA6IC1kYXRhLnBpeGVsWTtcbiAgICB9XG4gICAgaWYgKGRlbHRhID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAocGFyYW1zLmludmVydCkgZGVsdGEgPSAtZGVsdGE7XG4gICAgbGV0IHBvc2l0aW9ucyA9IHN3aXBlci5nZXRUcmFuc2xhdGUoKSArIGRlbHRhICogcGFyYW1zLnNlbnNpdGl2aXR5O1xuICAgIGlmIChwb3NpdGlvbnMgPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSBwb3NpdGlvbnMgPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gICAgaWYgKHBvc2l0aW9ucyA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHBvc2l0aW9ucyA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gc3dpcGVyLnBhcmFtcy5sb29wID8gdHJ1ZSA6ICEocG9zaXRpb25zID09PSBzd2lwZXIubWluVHJhbnNsYXRlKCkgfHwgcG9zaXRpb25zID09PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpO1xuICAgIGlmIChkaXNhYmxlUGFyZW50U3dpcGVyICYmIHN3aXBlci5wYXJhbXMubmVzdGVkKSBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSB8fCAhc3dpcGVyLnBhcmFtcy5mcmVlTW9kZS5lbmFibGVkKSB7XG4gICAgICBjb25zdCBuZXdFdmVudCA9IHtcbiAgICAgICAgdGltZTogbm93KCksXG4gICAgICAgIGRlbHRhOiBNYXRoLmFicyhkZWx0YSksXG4gICAgICAgIGRpcmVjdGlvbjogTWF0aC5zaWduKGRlbHRhKSxcbiAgICAgICAgcmF3OiBldmVudDJcbiAgICAgIH07XG4gICAgICBpZiAocmVjZW50V2hlZWxFdmVudHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgcmVjZW50V2hlZWxFdmVudHMuc2hpZnQoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByZXZFdmVudCA9IHJlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCA/IHJlY2VudFdoZWVsRXZlbnRzW3JlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCAtIDFdIDogdm9pZCAwO1xuICAgICAgcmVjZW50V2hlZWxFdmVudHMucHVzaChuZXdFdmVudCk7XG4gICAgICBpZiAocHJldkV2ZW50KSB7XG4gICAgICAgIGlmIChuZXdFdmVudC5kaXJlY3Rpb24gIT09IHByZXZFdmVudC5kaXJlY3Rpb24gfHwgbmV3RXZlbnQuZGVsdGEgPiBwcmV2RXZlbnQuZGVsdGEgfHwgbmV3RXZlbnQudGltZSA+IHByZXZFdmVudC50aW1lICsgMTUwKSB7XG4gICAgICAgICAgYW5pbWF0ZVNsaWRlcihuZXdFdmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuaW1hdGVTbGlkZXIobmV3RXZlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKHJlbGVhc2VTY3JvbGwobmV3RXZlbnQpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdFdmVudCA9IHtcbiAgICAgICAgdGltZTogbm93KCksXG4gICAgICAgIGRlbHRhOiBNYXRoLmFicyhkZWx0YSksXG4gICAgICAgIGRpcmVjdGlvbjogTWF0aC5zaWduKGRlbHRhKVxuICAgICAgfTtcbiAgICAgIGNvbnN0IGlnbm9yZVdoZWVsRXZlbnRzID0gbGFzdEV2ZW50QmVmb3JlU25hcCAmJiBuZXdFdmVudC50aW1lIDwgbGFzdEV2ZW50QmVmb3JlU25hcC50aW1lICsgNTAwICYmIG5ld0V2ZW50LmRlbHRhIDw9IGxhc3RFdmVudEJlZm9yZVNuYXAuZGVsdGEgJiYgbmV3RXZlbnQuZGlyZWN0aW9uID09PSBsYXN0RXZlbnRCZWZvcmVTbmFwLmRpcmVjdGlvbjtcbiAgICAgIGlmICghaWdub3JlV2hlZWxFdmVudHMpIHtcbiAgICAgICAgbGFzdEV2ZW50QmVmb3JlU25hcCA9IHZvaWQgMDtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gc3dpcGVyLmdldFRyYW5zbGF0ZSgpICsgZGVsdGEgKiBwYXJhbXMuc2Vuc2l0aXZpdHk7XG4gICAgICAgIGNvbnN0IHdhc0JlZ2lubmluZyA9IHN3aXBlci5pc0JlZ2lubmluZztcbiAgICAgICAgY29uc3Qgd2FzRW5kID0gc3dpcGVyLmlzRW5kO1xuICAgICAgICBpZiAocG9zaXRpb24gPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSBwb3NpdGlvbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgaWYgKHBvc2l0aW9uIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkgcG9zaXRpb24gPSBzd2lwZXIubWF4VHJhbnNsYXRlKCk7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHBvc2l0aW9uKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgICBpZiAoIXdhc0JlZ2lubmluZyAmJiBzd2lwZXIuaXNCZWdpbm5pbmcgfHwgIXdhc0VuZCAmJiBzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICAgICAgICBkaXJlY3Rpb246IG5ld0V2ZW50LmRpcmVjdGlvbiA8IDAgPyBcIm5leHRcIiA6IFwicHJldlwiLFxuICAgICAgICAgICAgYnlNb3VzZXdoZWVsOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGUuc3RpY2t5KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgIHRpbWVvdXQgPSB2b2lkIDA7XG4gICAgICAgICAgaWYgKHJlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCA+PSAxNSkge1xuICAgICAgICAgICAgcmVjZW50V2hlZWxFdmVudHMuc2hpZnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcHJldkV2ZW50ID0gcmVjZW50V2hlZWxFdmVudHMubGVuZ3RoID8gcmVjZW50V2hlZWxFdmVudHNbcmVjZW50V2hlZWxFdmVudHMubGVuZ3RoIC0gMV0gOiB2b2lkIDA7XG4gICAgICAgICAgY29uc3QgZmlyc3RFdmVudCA9IHJlY2VudFdoZWVsRXZlbnRzWzBdO1xuICAgICAgICAgIHJlY2VudFdoZWVsRXZlbnRzLnB1c2gobmV3RXZlbnQpO1xuICAgICAgICAgIGlmIChwcmV2RXZlbnQgJiYgKG5ld0V2ZW50LmRlbHRhID4gcHJldkV2ZW50LmRlbHRhIHx8IG5ld0V2ZW50LmRpcmVjdGlvbiAhPT0gcHJldkV2ZW50LmRpcmVjdGlvbikpIHtcbiAgICAgICAgICAgIHJlY2VudFdoZWVsRXZlbnRzLnNwbGljZSgwKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlY2VudFdoZWVsRXZlbnRzLmxlbmd0aCA+PSAxNSAmJiBuZXdFdmVudC50aW1lIC0gZmlyc3RFdmVudC50aW1lIDwgNTAwICYmIGZpcnN0RXZlbnQuZGVsdGEgLSBuZXdFdmVudC5kZWx0YSA+PSAxICYmIG5ld0V2ZW50LmRlbHRhIDw9IDYpIHtcbiAgICAgICAgICAgIGNvbnN0IHNuYXBUb1RocmVzaG9sZCA9IGRlbHRhID4gMCA/IDAuOCA6IDAuMjtcbiAgICAgICAgICAgIGxhc3RFdmVudEJlZm9yZVNuYXAgPSBuZXdFdmVudDtcbiAgICAgICAgICAgIHJlY2VudFdoZWVsRXZlbnRzLnNwbGljZSgwKTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIucGFyYW1zKSByZXR1cm47XG4gICAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvQ2xvc2VzdChzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB2b2lkIDAsIHNuYXBUb1RocmVzaG9sZCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICB0aW1lb3V0ID0gbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLnBhcmFtcykgcmV0dXJuO1xuICAgICAgICAgICAgICBjb25zdCBzbmFwVG9UaHJlc2hvbGQgPSAwLjU7XG4gICAgICAgICAgICAgIGxhc3RFdmVudEJlZm9yZVNuYXAgPSBuZXdFdmVudDtcbiAgICAgICAgICAgICAgcmVjZW50V2hlZWxFdmVudHMuc3BsaWNlKDApO1xuICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUb0Nsb3Nlc3Qoc3dpcGVyLnBhcmFtcy5zcGVlZCwgdHJ1ZSwgdm9pZCAwLCBzbmFwVG9UaHJlc2hvbGQpO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpZ25vcmVXaGVlbEV2ZW50cykgZW1pdChcInNjcm9sbFwiLCBlKTtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkgJiYgc3dpcGVyLnBhcmFtcy5hdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uKSBzd2lwZXIuYXV0b3BsYXkuc3RvcCgpO1xuICAgICAgICBpZiAocGFyYW1zLnJlbGVhc2VPbkVkZ2VzICYmIChwb3NpdGlvbiA9PT0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIHx8IHBvc2l0aW9uID09PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gZXZlbnRzMihtZXRob2QpIHtcbiAgICBsZXQgdGFyZ2V0RWwgPSBzd2lwZXIuZWw7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZXQgIT09IFwiY29udGFpbmVyXCIpIHtcbiAgICAgIHRhcmdldEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2V0KTtcbiAgICB9XG4gICAgdGFyZ2V0RWxbbWV0aG9kXShcIm1vdXNlZW50ZXJcIiwgaGFuZGxlTW91c2VFbnRlcik7XG4gICAgdGFyZ2V0RWxbbWV0aG9kXShcIm1vdXNlbGVhdmVcIiwgaGFuZGxlTW91c2VMZWF2ZSk7XG4gICAgdGFyZ2V0RWxbbWV0aG9kXShcIndoZWVsXCIsIGhhbmRsZSk7XG4gIH1cbiAgZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHN3aXBlci53cmFwcGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIGhhbmRsZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgICBldmVudHMyKFwiYWRkRXZlbnRMaXN0ZW5lclwiKTtcbiAgICBzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHN3aXBlci53cmFwcGVyRWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgICBldmVudHMyKFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiKTtcbiAgICBzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgb24oXCJpbml0XCIsICgpID0+IHtcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5lbmFibGVkICYmIHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgZGlzYWJsZSgpO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmVuYWJsZWQpIGVuYWJsZSgpO1xuICB9KTtcbiAgb24oXCJkZXN0cm95XCIsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICBlbmFibGUoKTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQpIGRpc2FibGUoKTtcbiAgfSk7XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLm1vdXNld2hlZWwsIHtcbiAgICBlbmFibGUsXG4gICAgZGlzYWJsZVxuICB9KTtcbn1cbnZhciBpbml0X21vdXNld2hlZWwgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL21vdXNld2hlZWwubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2NyZWF0ZS1lbGVtZW50LWlmLW5vdC1kZWZpbmVkLm1qc1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZChzd2lwZXIsIG9yaWdpbmFsUGFyYW1zLCBwYXJhbXMsIGNoZWNrUHJvcHMpIHtcbiAgaWYgKHN3aXBlci5wYXJhbXMuY3JlYXRlRWxlbWVudHMpIHtcbiAgICBPYmplY3Qua2V5cyhjaGVja1Byb3BzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICghcGFyYW1zW2tleV0gJiYgcGFyYW1zLmF1dG8gPT09IHRydWUpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBlbGVtZW50Q2hpbGRyZW4oc3dpcGVyLmVsLCBgLiR7Y2hlY2tQcm9wc1trZXldfWApWzBdO1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudDIoXCJkaXZcIiwgY2hlY2tQcm9wc1trZXldKTtcbiAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNoZWNrUHJvcHNba2V5XTtcbiAgICAgICAgICBzd2lwZXIuZWwuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHBhcmFtc1trZXldID0gZWxlbWVudDtcbiAgICAgICAgb3JpZ2luYWxQYXJhbXNba2V5XSA9IGVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBhcmFtcztcbn1cbnZhciBpbml0X2NyZWF0ZV9lbGVtZW50X2lmX25vdF9kZWZpbmVkID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2NyZWF0ZS1lbGVtZW50LWlmLW5vdC1kZWZpbmVkLm1qc1wiKCkge1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9uYXZpZ2F0aW9uLm1qc1xuZnVuY3Rpb24gTmF2aWdhdGlvbihfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIGV4dGVuZFBhcmFtcyxcbiAgICBvbixcbiAgICBlbWl0XG4gIH0gPSBfcmVmO1xuICBleHRlbmRQYXJhbXMoe1xuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogbnVsbCxcbiAgICAgIHByZXZFbDogbnVsbCxcbiAgICAgIGhpZGVPbkNsaWNrOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkQ2xhc3M6IFwic3dpcGVyLWJ1dHRvbi1kaXNhYmxlZFwiLFxuICAgICAgaGlkZGVuQ2xhc3M6IFwic3dpcGVyLWJ1dHRvbi1oaWRkZW5cIixcbiAgICAgIGxvY2tDbGFzczogXCJzd2lwZXItYnV0dG9uLWxvY2tcIixcbiAgICAgIG5hdmlnYXRpb25EaXNhYmxlZENsYXNzOiBcInN3aXBlci1uYXZpZ2F0aW9uLWRpc2FibGVkXCJcbiAgICB9XG4gIH0pO1xuICBzd2lwZXIubmF2aWdhdGlvbiA9IHtcbiAgICBuZXh0RWw6IG51bGwsXG4gICAgcHJldkVsOiBudWxsXG4gIH07XG4gIGZ1bmN0aW9uIGdldEVsKGVsKSB7XG4gICAgbGV0IHJlcztcbiAgICBpZiAoZWwgJiYgdHlwZW9mIGVsID09PSBcInN0cmluZ1wiICYmIHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICAgIHJlcyA9IHN3aXBlci5lbC5xdWVyeVNlbGVjdG9yKGVsKSB8fCBzd2lwZXIuaG9zdEVsLnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgICAgaWYgKHJlcykgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgaWYgKGVsKSB7XG4gICAgICBpZiAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKSByZXMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbCldO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiYgdHlwZW9mIGVsID09PSBcInN0cmluZ1wiICYmIHJlcyAmJiByZXMubGVuZ3RoID4gMSAmJiBzd2lwZXIuZWwucXVlcnlTZWxlY3RvckFsbChlbCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJlcyA9IHN3aXBlci5lbC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAocmVzICYmIHJlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmVzID0gcmVzWzBdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZWwgJiYgIXJlcykgcmV0dXJuIGVsO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgZnVuY3Rpb24gdG9nZ2xlRWwoZWwsIGRpc2FibGVkKSB7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uO1xuICAgIGVsID0gbWFrZUVsZW1lbnRzQXJyYXkoZWwpO1xuICAgIGVsLmZvckVhY2goKHN1YkVsKSA9PiB7XG4gICAgICBpZiAoc3ViRWwpIHtcbiAgICAgICAgc3ViRWwuY2xhc3NMaXN0W2Rpc2FibGVkID8gXCJhZGRcIiA6IFwicmVtb3ZlXCJdKC4uLnBhcmFtcy5kaXNhYmxlZENsYXNzLnNwbGl0KFwiIFwiKSk7XG4gICAgICAgIGlmIChzdWJFbC50YWdOYW1lID09PSBcIkJVVFRPTlwiKSBzdWJFbC5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5lbmFibGVkKSB7XG4gICAgICAgICAgc3ViRWwuY2xhc3NMaXN0W3N3aXBlci5pc0xvY2tlZCA/IFwiYWRkXCIgOiBcInJlbW92ZVwiXShwYXJhbXMubG9ja0NsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZTIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbmV4dEVsLFxuICAgICAgcHJldkVsXG4gICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgIHRvZ2dsZUVsKHByZXZFbCwgZmFsc2UpO1xuICAgICAgdG9nZ2xlRWwobmV4dEVsLCBmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRvZ2dsZUVsKHByZXZFbCwgc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLnJld2luZCk7XG4gICAgdG9nZ2xlRWwobmV4dEVsLCBzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMucmV3aW5kKTtcbiAgfVxuICBmdW5jdGlvbiBvblByZXZDbGljayhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMubG9vcCAmJiAhc3dpcGVyLnBhcmFtcy5yZXdpbmQpIHJldHVybjtcbiAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgZW1pdChcIm5hdmlnYXRpb25QcmV2XCIpO1xuICB9XG4gIGZ1bmN0aW9uIG9uTmV4dENsaWNrKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wICYmICFzd2lwZXIucGFyYW1zLnJld2luZCkgcmV0dXJuO1xuICAgIHN3aXBlci5zbGlkZU5leHQoKTtcbiAgICBlbWl0KFwibmF2aWdhdGlvbk5leHRcIik7XG4gIH1cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb247XG4gICAgc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uID0gY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZChzd2lwZXIsIHN3aXBlci5vcmlnaW5hbFBhcmFtcy5uYXZpZ2F0aW9uLCBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24sIHtcbiAgICAgIG5leHRFbDogXCJzd2lwZXItYnV0dG9uLW5leHRcIixcbiAgICAgIHByZXZFbDogXCJzd2lwZXItYnV0dG9uLXByZXZcIlxuICAgIH0pO1xuICAgIGlmICghKHBhcmFtcy5uZXh0RWwgfHwgcGFyYW1zLnByZXZFbCkpIHJldHVybjtcbiAgICBsZXQgbmV4dEVsID0gZ2V0RWwocGFyYW1zLm5leHRFbCk7XG4gICAgbGV0IHByZXZFbCA9IGdldEVsKHBhcmFtcy5wcmV2RWwpO1xuICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLm5hdmlnYXRpb24sIHtcbiAgICAgIG5leHRFbCxcbiAgICAgIHByZXZFbFxuICAgIH0pO1xuICAgIG5leHRFbCA9IG1ha2VFbGVtZW50c0FycmF5KG5leHRFbCk7XG4gICAgcHJldkVsID0gbWFrZUVsZW1lbnRzQXJyYXkocHJldkVsKTtcbiAgICBjb25zdCBpbml0QnV0dG9uID0gKGVsLCBkaXIpID0+IHtcbiAgICAgIGlmIChlbCkge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZGlyID09PSBcIm5leHRcIiA/IG9uTmV4dENsaWNrIDogb25QcmV2Q2xpY2spO1xuICAgICAgfVxuICAgICAgaWYgKCFzd2lwZXIuZW5hYmxlZCAmJiBlbCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKC4uLnBhcmFtcy5sb2NrQ2xhc3Muc3BsaXQoXCIgXCIpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG5leHRFbC5mb3JFYWNoKChlbCkgPT4gaW5pdEJ1dHRvbihlbCwgXCJuZXh0XCIpKTtcbiAgICBwcmV2RWwuZm9yRWFjaCgoZWwpID0+IGluaXRCdXR0b24oZWwsIFwicHJldlwiKSk7XG4gIH1cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBsZXQge1xuICAgICAgbmV4dEVsLFxuICAgICAgcHJldkVsXG4gICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgIG5leHRFbCA9IG1ha2VFbGVtZW50c0FycmF5KG5leHRFbCk7XG4gICAgcHJldkVsID0gbWFrZUVsZW1lbnRzQXJyYXkocHJldkVsKTtcbiAgICBjb25zdCBkZXN0cm95QnV0dG9uID0gKGVsLCBkaXIpID0+IHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkaXIgPT09IFwibmV4dFwiID8gb25OZXh0Q2xpY2sgOiBvblByZXZDbGljayk7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKC4uLnN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5kaXNhYmxlZENsYXNzLnNwbGl0KFwiIFwiKSk7XG4gICAgfTtcbiAgICBuZXh0RWwuZm9yRWFjaCgoZWwpID0+IGRlc3Ryb3lCdXR0b24oZWwsIFwibmV4dFwiKSk7XG4gICAgcHJldkVsLmZvckVhY2goKGVsKSA9PiBkZXN0cm95QnV0dG9uKGVsLCBcInByZXZcIikpO1xuICB9XG4gIG9uKFwiaW5pdFwiLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5lbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgZGlzYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbml0KCk7XG4gICAgICB1cGRhdGUyKCk7XG4gICAgfVxuICB9KTtcbiAgb24oXCJ0b0VkZ2UgZnJvbUVkZ2UgbG9jayB1bmxvY2tcIiwgKCkgPT4ge1xuICAgIHVwZGF0ZTIoKTtcbiAgfSk7XG4gIG9uKFwiZGVzdHJveVwiLCAoKSA9PiB7XG4gICAgZGVzdHJveSgpO1xuICB9KTtcbiAgb24oXCJlbmFibGUgZGlzYWJsZVwiLCAoKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgIG5leHRFbCxcbiAgICAgIHByZXZFbFxuICAgIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcbiAgICBuZXh0RWwgPSBtYWtlRWxlbWVudHNBcnJheShuZXh0RWwpO1xuICAgIHByZXZFbCA9IG1ha2VFbGVtZW50c0FycmF5KHByZXZFbCk7XG4gICAgaWYgKHN3aXBlci5lbmFibGVkKSB7XG4gICAgICB1cGRhdGUyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFsuLi5uZXh0RWwsIC4uLnByZXZFbF0uZmlsdGVyKChlbCkgPT4gISFlbCkuZm9yRWFjaCgoZWwpID0+IGVsLmNsYXNzTGlzdC5hZGQoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmxvY2tDbGFzcykpO1xuICB9KTtcbiAgb24oXCJjbGlja1wiLCAoX3MsIGUpID0+IHtcbiAgICBsZXQge1xuICAgICAgbmV4dEVsLFxuICAgICAgcHJldkVsXG4gICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgIG5leHRFbCA9IG1ha2VFbGVtZW50c0FycmF5KG5leHRFbCk7XG4gICAgcHJldkVsID0gbWFrZUVsZW1lbnRzQXJyYXkocHJldkVsKTtcbiAgICBjb25zdCB0YXJnZXRFbCA9IGUudGFyZ2V0O1xuICAgIGxldCB0YXJnZXRJc0J1dHRvbiA9IHByZXZFbC5pbmNsdWRlcyh0YXJnZXRFbCkgfHwgbmV4dEVsLmluY2x1ZGVzKHRhcmdldEVsKTtcbiAgICBpZiAoc3dpcGVyLmlzRWxlbWVudCAmJiAhdGFyZ2V0SXNCdXR0b24pIHtcbiAgICAgIGNvbnN0IHBhdGggPSBlLnBhdGggfHwgZS5jb21wb3NlZFBhdGggJiYgZS5jb21wb3NlZFBhdGgoKTtcbiAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgIHRhcmdldElzQnV0dG9uID0gcGF0aC5maW5kKChwYXRoRWwpID0+IG5leHRFbC5pbmNsdWRlcyhwYXRoRWwpIHx8IHByZXZFbC5pbmNsdWRlcyhwYXRoRWwpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRlT25DbGljayAmJiAhdGFyZ2V0SXNCdXR0b24pIHtcbiAgICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbiAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24gJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSAmJiAoc3dpcGVyLnBhZ2luYXRpb24uZWwgPT09IHRhcmdldEVsIHx8IHN3aXBlci5wYWdpbmF0aW9uLmVsLmNvbnRhaW5zKHRhcmdldEVsKSkpIHJldHVybjtcbiAgICAgIGxldCBpc0hpZGRlbjtcbiAgICAgIGlmIChuZXh0RWwubGVuZ3RoKSB7XG4gICAgICAgIGlzSGlkZGVuID0gbmV4dEVsWzBdLmNsYXNzTGlzdC5jb250YWlucyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgfSBlbHNlIGlmIChwcmV2RWwubGVuZ3RoKSB7XG4gICAgICAgIGlzSGlkZGVuID0gcHJldkVsWzBdLmNsYXNzTGlzdC5jb250YWlucyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgfVxuICAgICAgaWYgKGlzSGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgIGVtaXQoXCJuYXZpZ2F0aW9uU2hvd1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVtaXQoXCJuYXZpZ2F0aW9uSGlkZVwiKTtcbiAgICAgIH1cbiAgICAgIFsuLi5uZXh0RWwsIC4uLnByZXZFbF0uZmlsdGVyKChlbCkgPT4gISFlbCkuZm9yRWFjaCgoZWwpID0+IGVsLmNsYXNzTGlzdC50b2dnbGUoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKSk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgZW5hYmxlID0gKCkgPT4ge1xuICAgIHN3aXBlci5lbC5jbGFzc0xpc3QucmVtb3ZlKC4uLnN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5uYXZpZ2F0aW9uRGlzYWJsZWRDbGFzcy5zcGxpdChcIiBcIikpO1xuICAgIGluaXQoKTtcbiAgICB1cGRhdGUyKCk7XG4gIH07XG4gIGNvbnN0IGRpc2FibGUgPSAoKSA9PiB7XG4gICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5hZGQoLi4uc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLm5hdmlnYXRpb25EaXNhYmxlZENsYXNzLnNwbGl0KFwiIFwiKSk7XG4gICAgZGVzdHJveSgpO1xuICB9O1xuICBPYmplY3QuYXNzaWduKHN3aXBlci5uYXZpZ2F0aW9uLCB7XG4gICAgZW5hYmxlLFxuICAgIGRpc2FibGUsXG4gICAgdXBkYXRlOiB1cGRhdGUyLFxuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9KTtcbn1cbnZhciBpbml0X25hdmlnYXRpb24gPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL25hdmlnYXRpb24ubWpzXCIoKSB7XG4gICAgaW5pdF9jcmVhdGVfZWxlbWVudF9pZl9ub3RfZGVmaW5lZCgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2NsYXNzZXMtdG8tc2VsZWN0b3IubWpzXG52YXIgaW5pdF9jbGFzc2VzX3RvX3NlbGVjdG9yID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2NsYXNzZXMtdG8tc2VsZWN0b3IubWpzXCIoKSB7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvcGFnaW5hdGlvbi5tanNcbnZhciBpbml0X3BhZ2luYXRpb24gPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3BhZ2luYXRpb24ubWpzXCIoKSB7XG4gICAgaW5pdF9jbGFzc2VzX3RvX3NlbGVjdG9yKCk7XG4gICAgaW5pdF9jcmVhdGVfZWxlbWVudF9pZl9ub3RfZGVmaW5lZCgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9zY3JvbGxiYXIubWpzXG52YXIgaW5pdF9zY3JvbGxiYXIgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3Njcm9sbGJhci5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gICAgaW5pdF91dGlscygpO1xuICAgIGluaXRfY3JlYXRlX2VsZW1lbnRfaWZfbm90X2RlZmluZWQoKTtcbiAgICBpbml0X2NsYXNzZXNfdG9fc2VsZWN0b3IoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9wYXJhbGxheC5tanNcbnZhciBpbml0X3BhcmFsbGF4ID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9wYXJhbGxheC5tanNcIigpIHtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvem9vbS5tanNcbnZhciBpbml0X3pvb20gPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3pvb20ubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9jb250cm9sbGVyLm1qc1xudmFyIGluaXRfY29udHJvbGxlciA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvY29udHJvbGxlci5tanNcIigpIHtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvYTExeS5tanNcbnZhciBpbml0X2ExMXkgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2ExMXkubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICAgIGluaXRfY2xhc3Nlc190b19zZWxlY3RvcigpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9oaXN0b3J5Lm1qc1xudmFyIGluaXRfaGlzdG9yeSA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvaGlzdG9yeS5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvaGFzaC1uYXZpZ2F0aW9uLm1qc1xudmFyIGluaXRfaGFzaF9uYXZpZ2F0aW9uID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9oYXNoLW5hdmlnYXRpb24ubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9hdXRvcGxheS5tanNcbnZhciBpbml0X2F1dG9wbGF5ID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9hdXRvcGxheS5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvdGh1bWJzLm1qc1xudmFyIGluaXRfdGh1bWJzID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy90aHVtYnMubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9mcmVlLW1vZGUubWpzXG52YXIgaW5pdF9mcmVlX21vZGUgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2ZyZWUtbW9kZS5tanNcIigpIHtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZ3JpZC5tanNcbnZhciBpbml0X2dyaWQgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2dyaWQubWpzXCIoKSB7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvbWFuaXB1bGF0aW9uLm1qc1xuZnVuY3Rpb24gYXBwZW5kU2xpZGUoc2xpZGVzKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgc2xpZGVzRWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gIH1cbiAgY29uc3QgYXBwZW5kRWxlbWVudCA9IChzbGlkZUVsKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBzbGlkZUVsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCB0ZW1wRE9NID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRlbXBET00uaW5uZXJIVE1MID0gc2xpZGVFbDtcbiAgICAgIHNsaWRlc0VsLmFwcGVuZCh0ZW1wRE9NLmNoaWxkcmVuWzBdKTtcbiAgICAgIHRlbXBET00uaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVzRWwuYXBwZW5kKHNsaWRlRWwpO1xuICAgIH1cbiAgfTtcbiAgaWYgKHR5cGVvZiBzbGlkZXMgPT09IFwib2JqZWN0XCIgJiYgXCJsZW5ndGhcIiBpbiBzbGlkZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHNsaWRlc1tpXSkgYXBwZW5kRWxlbWVudChzbGlkZXNbaV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhcHBlbmRFbGVtZW50KHNsaWRlcyk7XG4gIH1cbiAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICB9XG4gIGlmICghcGFyYW1zLm9ic2VydmVyIHx8IHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICBzd2lwZXIudXBkYXRlKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHByZXBlbmRTbGlkZShzbGlkZXMpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBhY3RpdmVJbmRleCxcbiAgICBzbGlkZXNFbFxuICB9ID0gc3dpcGVyO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgfVxuICBsZXQgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCArIDE7XG4gIGNvbnN0IHByZXBlbmRFbGVtZW50ID0gKHNsaWRlRWwpID0+IHtcbiAgICBpZiAodHlwZW9mIHNsaWRlRWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IHRlbXBET00gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGVtcERPTS5pbm5lckhUTUwgPSBzbGlkZUVsO1xuICAgICAgc2xpZGVzRWwucHJlcGVuZCh0ZW1wRE9NLmNoaWxkcmVuWzBdKTtcbiAgICAgIHRlbXBET00uaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVzRWwucHJlcGVuZChzbGlkZUVsKTtcbiAgICB9XG4gIH07XG4gIGlmICh0eXBlb2Ygc2xpZGVzID09PSBcIm9iamVjdFwiICYmIFwibGVuZ3RoXCIgaW4gc2xpZGVzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChzbGlkZXNbaV0pIHByZXBlbmRFbGVtZW50KHNsaWRlc1tpXSk7XG4gICAgfVxuICAgIG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXggKyBzbGlkZXMubGVuZ3RoO1xuICB9IGVsc2Uge1xuICAgIHByZXBlbmRFbGVtZW50KHNsaWRlcyk7XG4gIH1cbiAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICB9XG4gIGlmICghcGFyYW1zLm9ic2VydmVyIHx8IHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICBzd2lwZXIudXBkYXRlKCk7XG4gIH1cbiAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXgsIDAsIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIGFkZFNsaWRlKGluZGV4LCBzbGlkZXMpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBhY3RpdmVJbmRleCxcbiAgICBzbGlkZXNFbFxuICB9ID0gc3dpcGVyO1xuICBsZXQgYWN0aXZlSW5kZXhCdWZmZXIgPSBhY3RpdmVJbmRleDtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgYWN0aXZlSW5kZXhCdWZmZXIgLT0gc3dpcGVyLmxvb3BlZFNsaWRlcztcbiAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gIH1cbiAgY29uc3QgYmFzZUxlbmd0aCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICBpZiAoaW5kZXggPD0gMCkge1xuICAgIHN3aXBlci5wcmVwZW5kU2xpZGUoc2xpZGVzKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGluZGV4ID49IGJhc2VMZW5ndGgpIHtcbiAgICBzd2lwZXIuYXBwZW5kU2xpZGUoc2xpZGVzKTtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXhCdWZmZXIgPiBpbmRleCA/IGFjdGl2ZUluZGV4QnVmZmVyICsgMSA6IGFjdGl2ZUluZGV4QnVmZmVyO1xuICBjb25zdCBzbGlkZXNCdWZmZXIgPSBbXTtcbiAgZm9yIChsZXQgaSA9IGJhc2VMZW5ndGggLSAxOyBpID49IGluZGV4OyBpIC09IDEpIHtcbiAgICBjb25zdCBjdXJyZW50U2xpZGUgPSBzd2lwZXIuc2xpZGVzW2ldO1xuICAgIGN1cnJlbnRTbGlkZS5yZW1vdmUoKTtcbiAgICBzbGlkZXNCdWZmZXIudW5zaGlmdChjdXJyZW50U2xpZGUpO1xuICB9XG4gIGlmICh0eXBlb2Ygc2xpZGVzID09PSBcIm9iamVjdFwiICYmIFwibGVuZ3RoXCIgaW4gc2xpZGVzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChzbGlkZXNbaV0pIHNsaWRlc0VsLmFwcGVuZChzbGlkZXNbaV0pO1xuICAgIH1cbiAgICBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4QnVmZmVyID4gaW5kZXggPyBhY3RpdmVJbmRleEJ1ZmZlciArIHNsaWRlcy5sZW5ndGggOiBhY3RpdmVJbmRleEJ1ZmZlcjtcbiAgfSBlbHNlIHtcbiAgICBzbGlkZXNFbC5hcHBlbmQoc2xpZGVzKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0J1ZmZlci5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHNsaWRlc0VsLmFwcGVuZChzbGlkZXNCdWZmZXJbaV0pO1xuICB9XG4gIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgfVxuICBpZiAoIXBhcmFtcy5vYnNlcnZlciB8fCBzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgc3dpcGVyLnVwZGF0ZSgpO1xuICB9XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4ICsgc3dpcGVyLmxvb3BlZFNsaWRlcywgMCwgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlbW92ZVNsaWRlKHNsaWRlc0luZGV4ZXMpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBhY3RpdmVJbmRleFxuICB9ID0gc3dpcGVyO1xuICBsZXQgYWN0aXZlSW5kZXhCdWZmZXIgPSBhY3RpdmVJbmRleDtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgYWN0aXZlSW5kZXhCdWZmZXIgLT0gc3dpcGVyLmxvb3BlZFNsaWRlcztcbiAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgfVxuICBsZXQgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleEJ1ZmZlcjtcbiAgbGV0IGluZGV4VG9SZW1vdmU7XG4gIGlmICh0eXBlb2Ygc2xpZGVzSW5kZXhlcyA9PT0gXCJvYmplY3RcIiAmJiBcImxlbmd0aFwiIGluIHNsaWRlc0luZGV4ZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0luZGV4ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGluZGV4VG9SZW1vdmUgPSBzbGlkZXNJbmRleGVzW2ldO1xuICAgICAgaWYgKHN3aXBlci5zbGlkZXNbaW5kZXhUb1JlbW92ZV0pIHN3aXBlci5zbGlkZXNbaW5kZXhUb1JlbW92ZV0ucmVtb3ZlKCk7XG4gICAgICBpZiAoaW5kZXhUb1JlbW92ZSA8IG5ld0FjdGl2ZUluZGV4KSBuZXdBY3RpdmVJbmRleCAtPSAxO1xuICAgIH1cbiAgICBuZXdBY3RpdmVJbmRleCA9IE1hdGgubWF4KG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgfSBlbHNlIHtcbiAgICBpbmRleFRvUmVtb3ZlID0gc2xpZGVzSW5kZXhlcztcbiAgICBpZiAoc3dpcGVyLnNsaWRlc1tpbmRleFRvUmVtb3ZlXSkgc3dpcGVyLnNsaWRlc1tpbmRleFRvUmVtb3ZlXS5yZW1vdmUoKTtcbiAgICBpZiAoaW5kZXhUb1JlbW92ZSA8IG5ld0FjdGl2ZUluZGV4KSBuZXdBY3RpdmVJbmRleCAtPSAxO1xuICAgIG5ld0FjdGl2ZUluZGV4ID0gTWF0aC5tYXgobmV3QWN0aXZlSW5kZXgsIDApO1xuICB9XG4gIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgfVxuICBpZiAoIXBhcmFtcy5vYnNlcnZlciB8fCBzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgc3dpcGVyLnVwZGF0ZSgpO1xuICB9XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4ICsgc3dpcGVyLmxvb3BlZFNsaWRlcywgMCwgZmFsc2UpO1xuICB9IGVsc2Uge1xuICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlbW92ZUFsbFNsaWRlcygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qgc2xpZGVzSW5kZXhlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzbGlkZXNJbmRleGVzLnB1c2goaSk7XG4gIH1cbiAgc3dpcGVyLnJlbW92ZVNsaWRlKHNsaWRlc0luZGV4ZXMpO1xufVxuZnVuY3Rpb24gTWFuaXB1bGF0aW9uKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXJcbiAgfSA9IF9yZWY7XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgYXBwZW5kU2xpZGU6IGFwcGVuZFNsaWRlLmJpbmQoc3dpcGVyKSxcbiAgICBwcmVwZW5kU2xpZGU6IHByZXBlbmRTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgYWRkU2xpZGU6IGFkZFNsaWRlLmJpbmQoc3dpcGVyKSxcbiAgICByZW1vdmVTbGlkZTogcmVtb3ZlU2xpZGUuYmluZChzd2lwZXIpLFxuICAgIHJlbW92ZUFsbFNsaWRlczogcmVtb3ZlQWxsU2xpZGVzLmJpbmQoc3dpcGVyKVxuICB9KTtcbn1cbnZhciBpbml0X21hbmlwdWxhdGlvbiA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvbWFuaXB1bGF0aW9uLm1qc1wiKCkge1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvZWZmZWN0LWluaXQubWpzXG52YXIgaW5pdF9lZmZlY3RfaW5pdCA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtaW5pdC5tanNcIigpIHtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2VmZmVjdC10YXJnZXQubWpzXG52YXIgaW5pdF9lZmZlY3RfdGFyZ2V0ID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2VmZmVjdC10YXJnZXQubWpzXCIoKSB7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvZWZmZWN0LXZpcnR1YWwtdHJhbnNpdGlvbi1lbmQubWpzXG52YXIgaW5pdF9lZmZlY3RfdmlydHVhbF90cmFuc2l0aW9uX2VuZCA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtdmlydHVhbC10cmFuc2l0aW9uLWVuZC5tanNcIigpIHtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWZhZGUubWpzXG52YXIgaW5pdF9lZmZlY3RfZmFkZSA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWZhZGUubWpzXCIoKSB7XG4gICAgaW5pdF9lZmZlY3RfaW5pdCgpO1xuICAgIGluaXRfZWZmZWN0X3RhcmdldCgpO1xuICAgIGluaXRfZWZmZWN0X3ZpcnR1YWxfdHJhbnNpdGlvbl9lbmQoKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWN1YmUubWpzXG52YXIgaW5pdF9lZmZlY3RfY3ViZSA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWN1YmUubWpzXCIoKSB7XG4gICAgaW5pdF9lZmZlY3RfaW5pdCgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2NyZWF0ZS1zaGFkb3cubWpzXG52YXIgaW5pdF9jcmVhdGVfc2hhZG93ID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2NyZWF0ZS1zaGFkb3cubWpzXCIoKSB7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1mbGlwLm1qc1xudmFyIGluaXRfZWZmZWN0X2ZsaXAgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1mbGlwLm1qc1wiKCkge1xuICAgIGluaXRfY3JlYXRlX3NoYWRvdygpO1xuICAgIGluaXRfZWZmZWN0X2luaXQoKTtcbiAgICBpbml0X2VmZmVjdF90YXJnZXQoKTtcbiAgICBpbml0X2VmZmVjdF92aXJ0dWFsX3RyYW5zaXRpb25fZW5kKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1jb3ZlcmZsb3cubWpzXG52YXIgaW5pdF9lZmZlY3RfY292ZXJmbG93ID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtY292ZXJmbG93Lm1qc1wiKCkge1xuICAgIGluaXRfY3JlYXRlX3NoYWRvdygpO1xuICAgIGluaXRfZWZmZWN0X2luaXQoKTtcbiAgICBpbml0X2VmZmVjdF90YXJnZXQoKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWNyZWF0aXZlLm1qc1xudmFyIGluaXRfZWZmZWN0X2NyZWF0aXZlID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtY3JlYXRpdmUubWpzXCIoKSB7XG4gICAgaW5pdF9jcmVhdGVfc2hhZG93KCk7XG4gICAgaW5pdF9lZmZlY3RfaW5pdCgpO1xuICAgIGluaXRfZWZmZWN0X3RhcmdldCgpO1xuICAgIGluaXRfZWZmZWN0X3ZpcnR1YWxfdHJhbnNpdGlvbl9lbmQoKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWNhcmRzLm1qc1xudmFyIGluaXRfZWZmZWN0X2NhcmRzID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtY2FyZHMubWpzXCIoKSB7XG4gICAgaW5pdF9jcmVhdGVfc2hhZG93KCk7XG4gICAgaW5pdF9lZmZlY3RfaW5pdCgpO1xuICAgIGluaXRfZWZmZWN0X3RhcmdldCgpO1xuICAgIGluaXRfZWZmZWN0X3ZpcnR1YWxfdHJhbnNpdGlvbl9lbmQoKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvaW5kZXgubWpzXG52YXIgaW5pdF9tb2R1bGVzID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9pbmRleC5tanNcIigpIHtcbiAgICBpbml0X3ZpcnR1YWwoKTtcbiAgICBpbml0X2tleWJvYXJkKCk7XG4gICAgaW5pdF9tb3VzZXdoZWVsKCk7XG4gICAgaW5pdF9uYXZpZ2F0aW9uKCk7XG4gICAgaW5pdF9wYWdpbmF0aW9uKCk7XG4gICAgaW5pdF9zY3JvbGxiYXIoKTtcbiAgICBpbml0X3BhcmFsbGF4KCk7XG4gICAgaW5pdF96b29tKCk7XG4gICAgaW5pdF9jb250cm9sbGVyKCk7XG4gICAgaW5pdF9hMTF5KCk7XG4gICAgaW5pdF9oaXN0b3J5KCk7XG4gICAgaW5pdF9oYXNoX25hdmlnYXRpb24oKTtcbiAgICBpbml0X2F1dG9wbGF5KCk7XG4gICAgaW5pdF90aHVtYnMoKTtcbiAgICBpbml0X2ZyZWVfbW9kZSgpO1xuICAgIGluaXRfZ3JpZCgpO1xuICAgIGluaXRfbWFuaXB1bGF0aW9uKCk7XG4gICAgaW5pdF9lZmZlY3RfZmFkZSgpO1xuICAgIGluaXRfZWZmZWN0X2N1YmUoKTtcbiAgICBpbml0X2VmZmVjdF9mbGlwKCk7XG4gICAgaW5pdF9lZmZlY3RfY292ZXJmbG93KCk7XG4gICAgaW5pdF9lZmZlY3RfY3JlYXRpdmUoKTtcbiAgICBpbml0X2VmZmVjdF9jYXJkcygpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvZXh0ZW5zaW9ucy9zd2lwZXIvc3dpcGVyLmV4dGVuc2lvbi50c1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVN3aXBlcih7XG4gIGlkLFxuICB3aWRnZXRTZWxlY3RvcixcbiAgcHJldkJ1dHRvbiA9IFwic3dpcGVyLWJ1dHRvbi1wcmV2XCIsXG4gIG5leHRCdXR0b24gPSBcInN3aXBlci1idXR0b24tbmV4dFwiLFxuICBwYXJhbXNPdmVycmlkZXNcbn0pIHtcbiAgY29uc3QgcHJldiA9IHdpZGdldFNlbGVjdG9yLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihgLiR7cHJldkJ1dHRvbn1gKTtcbiAgY29uc3QgbmV4dCA9IHdpZGdldFNlbGVjdG9yLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihgLiR7bmV4dEJ1dHRvbn1gKTtcbiAgaWYgKCFzd2lwZXJDb250YWluZXJbaWRdKSB7XG4gICAgc3dpcGVyQ29udGFpbmVyW2lkXSA9IHt9O1xuICB9XG4gIGNvbnN0IHN3aXBlckluc3RhbmNlID0gc3dpcGVyQ29udGFpbmVyW2lkXT8uaW5zdGFuY2U7XG4gIGlmIChzd2lwZXJJbnN0YW5jZSkge1xuICAgIGlmICghc3dpcGVySW5zdGFuY2UucGFyYW1zPy5lbmFibGVkKSB7XG4gICAgICBlbmFibGVTd2lwZXIoaWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2lwZXJJbnN0YW5jZS5kZXN0cm95KHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN3aXBlckNvbnRhaW5lcltpZF0gPSB7IHBhZ2VJbmRleDogMSB9O1xuICB9XG4gIHN3aXBlckNvbnRhaW5lcltpZF0uaW5zdGFuY2UgPSBuZXcgU3dpcGVyKHdpZGdldFNlbGVjdG9yLCB7XG4gICAgbW9kdWxlczogW05hdmlnYXRpb24sIE1hbmlwdWxhdGlvbiwgS2V5Ym9hcmQsIE1vdXNld2hlZWxdLFxuICAgIHNwYWNlQmV0d2VlbjogMTAsXG4gICAgb2JzZXJ2ZXI6IHRydWUsXG4gICAgZ3JhYkN1cnNvcjogdHJ1ZSxcbiAgICBhbGxvd1RvdWNoTW92ZTogdHJ1ZSxcbiAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgbm9ybWFsaXplU2xpZGVJbmRleDogdHJ1ZSxcbiAgICB3YXRjaE92ZXJmbG93OiB0cnVlLFxuICAgIG1vdXNld2hlZWw6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgfSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBlbmFibGVkOiAhIShwcmV2ICYmIG5leHQpLFxuICAgICAgbmV4dEVsOiBuZXh0LFxuICAgICAgcHJldkVsOiBwcmV2XG4gICAgfSxcbiAgICByZXNpemVPYnNlcnZlcjogdHJ1ZSxcbiAgICAuLi5wYXJhbXNPdmVycmlkZXNcbiAgfSk7XG59XG5mdW5jdGlvbiByZWZyZXNoU3dpcGVyKGlkKSB7XG4gIGlmIChzd2lwZXJDb250YWluZXJbaWRdPy5pbnN0YW5jZSkge1xuICAgIHN3aXBlckNvbnRhaW5lcltpZF0uaW5zdGFuY2UudXBkYXRlKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFN3aXBlckluZGV4Zm9yVGlsZShzd2lwZXJTZWxlY3RvciwgdGlsZUlkLCBsb29rdXBBdHRyKSB7XG4gIGNvbnN0IHNsaWRlRWxlbWVudHMgPSBzd2lwZXJTZWxlY3Rvci5xdWVyeVNlbGVjdG9yQWxsKFwiLnN3aXBlci1zbGlkZVwiKTtcbiAgY29uc3QgaW5kZXggPSAoKCkgPT4ge1xuICAgIGlmIChsb29rdXBBdHRyKSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShzbGlkZUVsZW1lbnRzKS5maW5kSW5kZXgoXG4gICAgICAgIChlbGVtZW50KSA9PiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikgPT09IHRpbGVJZCAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZShsb29rdXBBdHRyLm5hbWUpID09PSBsb29rdXBBdHRyLnZhbHVlXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbShzbGlkZUVsZW1lbnRzKS5maW5kSW5kZXgoKGVsZW1lbnQpID0+IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSA9PT0gdGlsZUlkKTtcbiAgfSkoKTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IDAgOiBpbmRleDtcbn1cbmZ1bmN0aW9uIGRpc2FibGVTd2lwZXIoaWQpIHtcbiAgc3dpcGVyQ29udGFpbmVyW2lkXT8uaW5zdGFuY2U/LmRpc2FibGUoKTtcbn1cbmZ1bmN0aW9uIGVuYWJsZVN3aXBlcihpZCkge1xuICBzd2lwZXJDb250YWluZXJbaWRdPy5pbnN0YW5jZT8uZW5hYmxlKCk7XG59XG5mdW5jdGlvbiBkZXN0cm95U3dpcGVyKGlkKSB7XG4gIGlmIChzd2lwZXJDb250YWluZXJbaWRdPy5pbnN0YW5jZSkge1xuICAgIHN3aXBlckNvbnRhaW5lcltpZF0uaW5zdGFuY2UuZGVzdHJveSh0cnVlLCB0cnVlKTtcbiAgICBkZWxldGUgc3dpcGVyQ29udGFpbmVyW2lkXTtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0Q2xpY2tlZEluZGV4KGlkKSB7XG4gIGlmIChzd2lwZXJDb250YWluZXJbaWRdPy5pbnN0YW5jZSkge1xuICAgIGNvbnN0IGNsaWNrZWRTbGlkZSA9IHN3aXBlckNvbnRhaW5lcltpZF0uaW5zdGFuY2UuY2xpY2tlZFNsaWRlO1xuICAgIGNvbnN0IGluZGV4RnJvbUF0dHJpYnV0ZSA9IGNsaWNrZWRTbGlkZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKTtcbiAgICByZXR1cm4gaW5kZXhGcm9tQXR0cmlidXRlICYmICFOdW1iZXIuaXNOYU4ocGFyc2VJbnQoaW5kZXhGcm9tQXR0cmlidXRlKSkgPyBwYXJzZUludChpbmRleEZyb21BdHRyaWJ1dGUpIDogc3dpcGVyQ29udGFpbmVyW2lkXS5pbnN0YW5jZS5jbGlja2VkSW5kZXg7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5mdW5jdGlvbiBnZXRJbnN0YW5jZShpZCkge1xuICByZXR1cm4gc3dpcGVyQ29udGFpbmVyW2lkXT8uaW5zdGFuY2U7XG59XG5mdW5jdGlvbiBnZXRBY3RpdmVTbGlkZShpZCkge1xuICByZXR1cm4gc3dpcGVyQ29udGFpbmVyW2lkXT8uaW5zdGFuY2U/LnJlYWxJbmRleCB8fCAwO1xufVxuZnVuY3Rpb24gZ2V0QWN0aXZlU2xpZGVFbGVtZW50KGlkKSB7XG4gIHJldHVybiBzd2lwZXJDb250YWluZXJbaWRdPy5pbnN0YW5jZT8uc2xpZGVzW2dldEFjdGl2ZVNsaWRlKGlkKSB8fCAwXTtcbn1cbmZ1bmN0aW9uIGlzU3dpcGVyTG9hZGluZyhpZCkge1xuICBpZiAoc3dpcGVyQ29udGFpbmVyW2lkXSAmJiBzd2lwZXJDb250YWluZXJbaWRdLmluc3RhbmNlKSB7XG4gICAgcmV0dXJuIHN3aXBlckNvbnRhaW5lcltpZF0uaXNMb2FkaW5nO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHNldFN3aXBlckxvYWRpbmdTdGF0dXMoaWQsIGlzTG9hZGluZykge1xuICBpZiAoc3dpcGVyQ29udGFpbmVyW2lkXSAmJiBzd2lwZXJDb250YWluZXJbaWRdLmluc3RhbmNlKSB7XG4gICAgc3dpcGVyQ29udGFpbmVyW2lkXS5pc0xvYWRpbmcgPSBpc0xvYWRpbmc7XG4gIH1cbn1cbmZ1bmN0aW9uIHVwZGF0ZVN3aXBlckluc3RhbmNlKGlkLCB1cGRhdGVQcm9wcykge1xuICBpZiAoc3dpcGVyQ29udGFpbmVyW2lkXSAmJiBzd2lwZXJDb250YWluZXJbaWRdLmluc3RhbmNlKSB7XG4gICAgdXBkYXRlUHJvcHMoc3dpcGVyQ29udGFpbmVyW2lkXSk7XG4gIH1cbn1cbnZhciBzd2lwZXJDb250YWluZXI7XG52YXIgaW5pdF9zd2lwZXJfZXh0ZW5zaW9uID0gX19lc20oe1xuICBcInNyYy9saWJzL2V4dGVuc2lvbnMvc3dpcGVyL3N3aXBlci5leHRlbnNpb24udHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X3N3aXBlcigpO1xuICAgIGluaXRfbW9kdWxlcygpO1xuICAgIHN3aXBlckNvbnRhaW5lciA9IHt9O1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci90aWt0b2stbWVzc2FnZS50c1xuZnVuY3Rpb24gcGxheVRpa3Rva1ZpZGVvKGZyYW1lV2luZG93KSB7XG4gIHBvc3RUaWt0b2tNZXNzYWdlKGZyYW1lV2luZG93LCBcInVuTXV0ZVwiKTtcbiAgcG9zdFRpa3Rva01lc3NhZ2UoZnJhbWVXaW5kb3csIFwicGxheVwiKTtcbn1cbmZ1bmN0aW9uIHBhdXNlVGlrdG9rVmlkZW8oZnJhbWVXaW5kb3cpIHtcbiAgcG9zdFRpa3Rva01lc3NhZ2UoZnJhbWVXaW5kb3csIFwibXV0ZVwiKTtcbiAgcG9zdFRpa3Rva01lc3NhZ2UoZnJhbWVXaW5kb3csIFwicGF1c2VcIik7XG4gIHBvc3RUaWt0b2tNZXNzYWdlKGZyYW1lV2luZG93LCBcInNlZWtUb1wiLCAwKTtcbn1cbmZ1bmN0aW9uIHBvc3RUaWt0b2tNZXNzYWdlKGZyYW1lV2luZG93LCB0eXBlLCB2YWx1ZSkge1xuICBmcmFtZVdpbmRvdy5wb3N0TWVzc2FnZSh7IHR5cGUsIHZhbHVlLCBcIngtdGlrdG9rLXBsYXllclwiOiB0cnVlIH0sIFwiaHR0cHM6Ly93d3cudGlrdG9rLmNvbVwiKTtcbn1cbnZhciBpbml0X3Rpa3Rva19tZXNzYWdlID0gX19lc20oe1xuICBcInNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvdGlrdG9rLW1lc3NhZ2UudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvZXhwYW5kZWQtc3dpcGVyLmxvYWRlci50c1xuZnVuY3Rpb24gaW5pdGlhbGl6ZVN3aXBlckZvckV4cGFuZGVkVGlsZXMoaW5pdGlhbFRpbGVJZCwgbG9va3VwQXR0cikge1xuICBjb25zdCBleHBhbmRlZFRpbGUgPSBzZGsucXVlcnlTZWxlY3RvcihcImV4cGFuZGVkLXRpbGVzXCIpO1xuICBpZiAoIWV4cGFuZGVkVGlsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBleHBhbmRlZCB0aWxlIGVsZW1lbnQgbm90IGZvdW5kXCIpO1xuICB9XG4gIGNvbnN0IHdpZGdldFNlbGVjdG9yID0gZXhwYW5kZWRUaWxlLnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLWV4cGFuZGVkXCIpO1xuICBpZiAoIXdpZGdldFNlbGVjdG9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgd2lkZ2V0IFVJIGVsZW1lbnQuIEZhaWxlZCB0byBpbml0aWFsaXNlIEdsaWRlXCIpO1xuICB9XG4gIGluaXRpYWxpemVTd2lwZXIoe1xuICAgIGlkOiBcImV4cGFuZGVkXCIsXG4gICAgd2lkZ2V0U2VsZWN0b3IsXG4gICAgbW9kZTogXCJleHBhbmRlZFwiLFxuICAgIHByZXZCdXR0b246IFwic3dpcGVyLWV4cGFuZGVkLWJ1dHRvbi1wcmV2XCIsXG4gICAgbmV4dEJ1dHRvbjogXCJzd2lwZXItZXhwYW5kZWQtYnV0dG9uLW5leHRcIixcbiAgICBwYXJhbXNPdmVycmlkZXM6IHtcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBrZXlib2FyZDoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICBvbmx5SW5WaWV3cG9ydDogZmFsc2VcbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICBiZWZvcmVJbml0OiAoc3dpcGVyKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGlsZUluZGV4ID0gaW5pdGlhbFRpbGVJZCA/IGdldFN3aXBlckluZGV4Zm9yVGlsZSh3aWRnZXRTZWxlY3RvciwgaW5pdGlhbFRpbGVJZCwgbG9va3VwQXR0cikgOiAwO1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvTG9vcCh0aWxlSW5kZXgsIDAsIGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgbmF2aWdhdGlvbk5leHQ6IGNvbnRyb2xWaWRlb1BsYXliYWNrLFxuICAgICAgICBuYXZpZ2F0aW9uUHJldjogY29udHJvbFZpZGVvUGxheWJhY2tcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gcGxheU1lZGlhT25Mb2FkKCkge1xuICBjb25zdCBzd2lwZXIgPSBnZXRJbnN0YW5jZShcImV4cGFuZGVkXCIpO1xuICBpZiAoc3dpcGVyKSB7XG4gICAgY29uc3QgYWN0aXZlRWxlbWVudERhdGEgPSBnZXRTd2lwZXJWaWRlb0VsZW1lbnQoc3dpcGVyLCBzd2lwZXIucmVhbEluZGV4KTtcbiAgICB0cmlnZ2VyUGxheShhY3RpdmVFbGVtZW50RGF0YSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNvbnRyb2xWaWRlb1BsYXliYWNrKHN3aXBlcikge1xuICBjb25zdCBhY3RpdmVFbGVtZW50ID0gZ2V0U3dpcGVyVmlkZW9FbGVtZW50KHN3aXBlciwgc3dpcGVyLnJlYWxJbmRleCk7XG4gIGNvbnN0IHByZXZpb3VzRWxlbWVudCA9IGdldFN3aXBlclZpZGVvRWxlbWVudChzd2lwZXIsIHN3aXBlci5wcmV2aW91c0luZGV4KTtcbiAgdHJpZ2dlclBsYXkoYWN0aXZlRWxlbWVudCk7XG4gIHRyaWdnZXJQYXVzZShwcmV2aW91c0VsZW1lbnQpO1xufVxuZnVuY3Rpb24gdHJpZ2dlclBsYXkoZWxlbWVudERhdGEpIHtcbiAgaWYgKCFlbGVtZW50RGF0YSkge1xuICAgIHJldHVybjtcbiAgfVxuICBzd2l0Y2ggKGVsZW1lbnREYXRhLnNvdXJjZSkge1xuICAgIGNhc2UgXCJ2aWRlb1wiOiB7XG4gICAgICBjb25zdCB2aWRlb0VsZW1lbnQgPSBlbGVtZW50RGF0YS5lbGVtZW50O1xuICAgICAgdmlkZW9FbGVtZW50LnBsYXkoKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwieW91dHViZVwiOiB7XG4gICAgICBjb25zdCBZb3V0dWJlQ29udGVudFdpbmRvdyA9IGVsZW1lbnREYXRhLmVsZW1lbnQ7XG4gICAgICBZb3V0dWJlQ29udGVudFdpbmRvdy5wbGF5KCk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBcInRpa3Rva1wiOiB7XG4gICAgICBjb25zdCB0aWt0b2tGcmFtZVdpbmRvdyA9IGVsZW1lbnREYXRhLmVsZW1lbnQ7XG4gICAgICBwbGF5VGlrdG9rVmlkZW8odGlrdG9rRnJhbWVXaW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIHZpZGVvIHNvdXJjZSAke2VsZW1lbnREYXRhLnNvdXJjZX1gKTtcbiAgfVxufVxuZnVuY3Rpb24gdHJpZ2dlclBhdXNlKGVsZW1lbnREYXRhKSB7XG4gIGlmICghZWxlbWVudERhdGEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc3dpdGNoIChlbGVtZW50RGF0YS5zb3VyY2UpIHtcbiAgICBjYXNlIFwidmlkZW9cIjoge1xuICAgICAgY29uc3QgdmlkZW9FbGVtZW50ID0gZWxlbWVudERhdGEuZWxlbWVudDtcbiAgICAgIHZpZGVvRWxlbWVudC5wYXVzZSgpO1xuICAgICAgdmlkZW9FbGVtZW50LmN1cnJlbnRUaW1lID0gMDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwieW91dHViZVwiOiB7XG4gICAgICBjb25zdCBZb3V0dWJlQ29udGVudFdpbmRvdyA9IGVsZW1lbnREYXRhLmVsZW1lbnQ7XG4gICAgICBZb3V0dWJlQ29udGVudFdpbmRvdy5wYXVzZSgpO1xuICAgICAgWW91dHViZUNvbnRlbnRXaW5kb3cucmVzZXQoKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwidGlrdG9rXCI6IHtcbiAgICAgIGNvbnN0IHRpa3Rva0ZyYW1lV2luZG93ID0gZWxlbWVudERhdGEuZWxlbWVudDtcbiAgICAgIHBhdXNlVGlrdG9rVmlkZW8odGlrdG9rRnJhbWVXaW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIHZpZGVvIHNvdXJjZSAke2VsZW1lbnREYXRhLnNvdXJjZX1gKTtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0U3dpcGVyVmlkZW9FbGVtZW50KHN3aXBlciwgaW5kZXgpIHtcbiAgY29uc3QgZWxlbWVudCA9IHN3aXBlci5zbGlkZXNbaW5kZXhdO1xuICBjb25zdCB0aWxlSWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gIGNvbnN0IHlvdXR1YmVJZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS15dC1pZFwiKTtcbiAgaWYgKHlvdXR1YmVJZCkge1xuICAgIGNvbnN0IHlvdXR1YmVGcmFtZSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihgaWZyYW1lI3l0LWZyYW1lLSR7dGlsZUlkfS0ke3lvdXR1YmVJZH1gKTtcbiAgICBpZiAoeW91dHViZUZyYW1lKSB7XG4gICAgICByZXR1cm4geyBlbGVtZW50OiB5b3V0dWJlRnJhbWUuY29udGVudFdpbmRvdywgc291cmNlOiBcInlvdXR1YmVcIiB9O1xuICAgIH1cbiAgfVxuICBjb25zdCB0aWt0b2tJZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10aWt0b2staWRcIik7XG4gIGlmICh0aWt0b2tJZCkge1xuICAgIGNvbnN0IHRpa3Rva0ZyYW1lID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGBpZnJhbWUjdGlrdG9rLWZyYW1lLSR7dGlsZUlkfS0ke3Rpa3Rva0lkfWApO1xuICAgIGlmICh0aWt0b2tGcmFtZSAmJiB0aWt0b2tGcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICByZXR1cm4geyBlbGVtZW50OiB0aWt0b2tGcmFtZS5jb250ZW50V2luZG93LCBzb3VyY2U6IFwidGlrdG9rXCIgfTtcbiAgICB9XG4gIH1cbiAgY29uc3QgdmlkZW9FbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnBhbmVsIC5wYW5lbC1sZWZ0IC52aWRlby1jb250ZW50LXdyYXBwZXIgdmlkZW9cIik7XG4gIGlmICh2aWRlb0VsZW1lbnQpIHtcbiAgICByZXR1cm4geyBlbGVtZW50OiB2aWRlb0VsZW1lbnQsIHNvdXJjZTogXCJ2aWRlb1wiIH07XG4gIH1cbiAgcmV0dXJuIHZvaWQgMDtcbn1cbmZ1bmN0aW9uIG9uVGlsZUV4cGFuZCh0aWxlSWQpIHtcbiAgY29uc3QgZXhwYW5kZWRUaWxlID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCJleHBhbmRlZC10aWxlc1wiKTtcbiAgaWYgKCFleHBhbmRlZFRpbGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZXhwYW5kZWQgdGlsZSBlbGVtZW50IG5vdCBmb3VuZFwiKTtcbiAgfVxuICBleHBhbmRlZFRpbGUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZXhwYW5kZWQtdGlsZS1vdmVybGF5XCIpO1xuICB3YWl0Rm9yRWxtKGV4cGFuZGVkVGlsZSwgW1wiLnN3aXBlci1leHBhbmRlZFwiXSwgKCkgPT4ge1xuICAgIGNvbnN0IHRpbGVFbGVtZW50ID0gZXhwYW5kZWRUaWxlLnNoYWRvd1Jvb3Q/LnF1ZXJ5U2VsZWN0b3IoYC5zd2lwZXItc2xpZGVbZGF0YS1pZD1cIiR7dGlsZUlkfVwiXWApO1xuICAgIGNvbnN0IHlvdXR1YmVJZCA9IHRpbGVFbGVtZW50Py5nZXRBdHRyaWJ1dGUoXCJkYXRhLXl0LWlkXCIpO1xuICAgIGNvbnN0IHRpa3Rva0lkID0gdGlsZUVsZW1lbnQ/LmdldEF0dHJpYnV0ZShcImRhdGEtdGlrdG9rLWlkXCIpO1xuICAgIGlmICh5b3V0dWJlSWQpIHtcbiAgICAgIGNvbnN0IGxvb2t1cFl0QXR0ciA9IHsgbmFtZTogXCJkYXRhLXl0LWlkXCIsIHZhbHVlOiB5b3V0dWJlSWQgfTtcbiAgICAgIGluaXRpYWxpemVTd2lwZXJGb3JFeHBhbmRlZFRpbGVzKHRpbGVJZCwgbG9va3VwWXRBdHRyKTtcbiAgICB9IGVsc2UgaWYgKHRpa3Rva0lkKSB7XG4gICAgICBjb25zdCBsb29rdXBUaWt0b2tBdHRyID0geyBuYW1lOiBcImRhdGEtdGlrdG9rLWlkXCIsIHZhbHVlOiB0aWt0b2tJZCB9O1xuICAgICAgaW5pdGlhbGl6ZVN3aXBlckZvckV4cGFuZGVkVGlsZXModGlsZUlkLCBsb29rdXBUaWt0b2tBdHRyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdGlhbGl6ZVN3aXBlckZvckV4cGFuZGVkVGlsZXModGlsZUlkKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gb25UaWxlUmVuZGVyZWQoKSB7XG4gIGNvbnN0IGV4cGFuZGVkVGlsZXNFbGVtZW50ID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCJleHBhbmRlZC10aWxlc1wiKTtcbiAgaWYgKCFleHBhbmRlZFRpbGVzRWxlbWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGFuZGVkIHRpbGVzIGVsZW1lbnQgbm90IGZvdW5kXCIpO1xuICB9XG4gIGNvbnN0IHRpbGVzID0gZXhwYW5kZWRUaWxlc0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zd2lwZXItc2xpZGVcIik7XG4gIGNvbnN0IHdpZGdldFNlbGVjdG9yID0gZXhwYW5kZWRUaWxlc0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItZXhwYW5kZWRcIik7XG4gIGlmICghd2lkZ2V0U2VsZWN0b3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJXaWRnZXQgc2VsZWN0b3IgZm9yIGV4cGFuZGVkIHRpbGUgKHN3aXBlci1leHBhbmRlZCkgaXMgbm90IGZvdW5kXCIpO1xuICB9XG4gIHNldHVwVGlrVG9rUGxheWVyUmVhZHlFdmVudCgpO1xuICB0aWxlcz8uZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgIHNldHVwVmlkZW9FdmVudHModGlsZSwgd2lkZ2V0U2VsZWN0b3IpO1xuICAgIHNldHVwWW91dHViZUV2ZW50cyh0aWxlLCB3aWRnZXRTZWxlY3Rvcik7XG4gIH0pO1xufVxuZnVuY3Rpb24gcmVkdWNlQmFja2dyb3VuZENvbnRyb2xzVmlzaWJpbGl0eShzb3VyY2VJZCkge1xuICBpZiAoIWlzVmFsaWRFdmVudFNvdXJjZShzb3VyY2VJZCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZXhwYW5kZWRUaWxlc0VsZW1lbnQgPSBzZGsucXVlcnlTZWxlY3RvcihcImV4cGFuZGVkLXRpbGVzXCIpO1xuICBjb25zdCB3cmFwcGVyID0gZXhwYW5kZWRUaWxlc0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5leHBhbmRlZC10aWxlLXdyYXBwZXJcIik7XG4gIGlmICghd3JhcHBlcikge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBuYXZpZ2F0aW9uUHJldkJ1dHRvbiA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItZXhwYW5kZWQtYnV0dG9uLXByZXZcIik7XG4gIGNvbnN0IG5hdmlnYXRpb25OZXh0QnV0dG9uID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1leHBhbmRlZC1idXR0b24tbmV4dFwiKTtcbiAgY29uc3QgZXhpdFRpbGVCdXR0b24gPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIuZXhpdFwiKTtcbiAgbmF2aWdhdGlvbk5leHRCdXR0b24/LmNsYXNzTGlzdC5hZGQoXCJzd2lwZXItYnV0dG9uLWRpc2FibGVkXCIpO1xuICBuYXZpZ2F0aW9uUHJldkJ1dHRvbj8uY2xhc3NMaXN0LmFkZChcInN3aXBlci1idXR0b24tZGlzYWJsZWRcIik7XG4gIGlmIChleGl0VGlsZUJ1dHRvbikge1xuICAgIGV4aXRUaWxlQnV0dG9uLnN0eWxlLm9wYWNpdHkgPSBcIjAuNFwiO1xuICB9XG59XG5mdW5jdGlvbiByZXNldEJhY2tncm91bmRDb250cm9sc1Zpc2liaWxpdHkoc291cmNlSWQpIHtcbiAgaWYgKCFpc1ZhbGlkRXZlbnRTb3VyY2Uoc291cmNlSWQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGV4cGFuZGVkVGlsZXNFbGVtZW50ID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCJleHBhbmRlZC10aWxlc1wiKTtcbiAgY29uc3Qgd3JhcHBlciA9IGV4cGFuZGVkVGlsZXNFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXhwYW5kZWQtdGlsZS13cmFwcGVyXCIpO1xuICBpZiAoIXdyYXBwZXIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgbmF2aWdhdGlvblByZXZCdXR0b24gPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLWV4cGFuZGVkLWJ1dHRvbi1wcmV2XCIpO1xuICBjb25zdCBuYXZpZ2F0aW9uTmV4dEJ1dHRvbiA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItZXhwYW5kZWQtYnV0dG9uLW5leHRcIik7XG4gIGNvbnN0IGV4aXRUaWxlQnV0dG9uID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLmV4aXRcIik7XG4gIG5hdmlnYXRpb25OZXh0QnV0dG9uPy5jbGFzc0xpc3QucmVtb3ZlKFwic3dpcGVyLWJ1dHRvbi1kaXNhYmxlZFwiKTtcbiAgbmF2aWdhdGlvblByZXZCdXR0b24/LmNsYXNzTGlzdC5yZW1vdmUoXCJzd2lwZXItYnV0dG9uLWRpc2FibGVkXCIpO1xuICBpZiAoZXhpdFRpbGVCdXR0b24pIHtcbiAgICBleGl0VGlsZUJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgfVxufVxuZnVuY3Rpb24gaXNWYWxpZEV2ZW50U291cmNlKHNvdXJjZUlkKSB7XG4gIGNvbnN0IGFjdGl2ZVNsaWRlRWxlbWVudCA9IGdldEFjdGl2ZVNsaWRlRWxlbWVudChcImV4cGFuZGVkXCIpO1xuICByZXR1cm4gYWN0aXZlU2xpZGVFbGVtZW50Py5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpID09PSBzb3VyY2VJZDtcbn1cbmZ1bmN0aW9uIHNldHVwVmlkZW9FdmVudHModGlsZSwgd2lkZ2V0U2VsZWN0b3IpIHtcbiAgY29uc3QgdmlkZW9Tb3VyY2VFbGVtZW50ID0gdGlsZS5xdWVyeVNlbGVjdG9yKFwidmlkZW8udmlkZW8tY29udGVudCA+IHNvdXJjZVwiKTtcbiAgaWYgKHZpZGVvU291cmNlRWxlbWVudCkge1xuICAgIHZpZGVvU291cmNlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICBwbGF5QWN0aXZlTWVkaWFUaWxlT25Mb2FkKHRpbGUsIHdpZGdldFNlbGVjdG9yKTtcbiAgICB9KTtcbiAgICB2aWRlb1NvdXJjZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsICgpID0+IHtcbiAgICAgIHZpZGVvU291cmNlRWxlbWVudC5jbG9zZXN0KFwiLnZpZGVvLWNvbnRlbnQtd3JhcHBlclwiKT8uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIHRpbGUucXVlcnlTZWxlY3RvcihcIi52aWRlby1mYWxsYmFjay1jb250ZW50XCIpPy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIH0pO1xuICB9XG59XG5mdW5jdGlvbiBzZXR1cFlvdXR1YmVFdmVudHModGlsZSwgd2lkZ2V0U2VsZWN0b3IpIHtcbiAgY29uc3QgdGlsZUlkID0gdGlsZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICBjb25zdCB5b3V0dWJlSWQgPSB0aWxlLmdldEF0dHJpYnV0ZShcImRhdGEteXQtaWRcIik7XG4gIGlmICh5b3V0dWJlSWQgJiYgdGlsZUlkKSB7XG4gICAgY29uc3QgeW91dHViZUZyYW1lID0gdGlsZS5xdWVyeVNlbGVjdG9yKGBpZnJhbWUjeXQtZnJhbWUtJHt0aWxlSWR9LSR7eW91dHViZUlkfWApO1xuICAgIHlvdXR1YmVGcmFtZT8uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICAgICAgcGxheUFjdGl2ZU1lZGlhVGlsZU9uTG9hZCh0aWxlLCB3aWRnZXRTZWxlY3RvciwgeyBuYW1lOiBcImRhdGEteXQtaWRcIiwgdmFsdWU6IHlvdXR1YmVJZCB9KTtcbiAgICB9KTtcbiAgICB5b3V0dWJlRnJhbWU/LmFkZEV2ZW50TGlzdGVuZXIoXCJ5dC12aWRlby1lcnJvclwiLCAoKSA9PiB7XG4gICAgICB5b3V0dWJlRnJhbWUuY2xvc2VzdChcIi52aWRlby1jb250ZW50LXdyYXBwZXJcIik/LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICB0aWxlLnF1ZXJ5U2VsZWN0b3IoXCIudmlkZW8tZmFsbGJhY2stY29udGVudFwiKT8uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gc2V0dXBUaWtUb2tQbGF5ZXJSZWFkeUV2ZW50KCkge1xuICB0aWt0b2tEZWZhdWx0UGxheWVkID0gZmFsc2U7XG4gIHdpbmRvdy5vbm1lc3NhZ2UgPSAoZXZlbnQyKSA9PiB7XG4gICAgaWYgKGV2ZW50Mi5kYXRhW1wieC10aWt0b2stcGxheWVyXCJdICYmIGV2ZW50Mi5kYXRhLnR5cGUgPT09IFwib25QbGF5ZXJSZWFkeVwiKSB7XG4gICAgICBjb25zdCBmcmFtZVdpbmRvdyA9IGV2ZW50Mi5zb3VyY2U7XG4gICAgICBwYXVzZVRpa3Rva1ZpZGVvKGZyYW1lV2luZG93KTtcbiAgICAgIGlmICghdGlrdG9rRGVmYXVsdFBsYXllZCkge1xuICAgICAgICB0aWt0b2tEZWZhdWx0UGxheWVkID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwbGF5TWVkaWFPbkxvYWQoKSwgMzAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBwbGF5QWN0aXZlTWVkaWFUaWxlT25Mb2FkKHRpbGUsIHdpZGdldFNlbGVjdG9yLCBsb29rdXBBdHRyKSB7XG4gIGlmIChpc0FjdGl2ZVRpbGUodGlsZSwgd2lkZ2V0U2VsZWN0b3IsIGxvb2t1cEF0dHIpKSB7XG4gICAgcGxheU1lZGlhT25Mb2FkKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzQWN0aXZlVGlsZSh0aWxlLCB3aWRnZXRTZWxlY3RvciwgbG9va3VwQXR0cikge1xuICBjb25zdCB0aWxlSWQgPSB0aWxlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gIGNvbnN0IHRpbGVJbmRleCA9IHRpbGVJZCA/IGdldFN3aXBlckluZGV4Zm9yVGlsZSh3aWRnZXRTZWxlY3RvciwgdGlsZUlkLCBsb29rdXBBdHRyKSA6IDA7XG4gIHJldHVybiBnZXRBY3RpdmVTbGlkZShcImV4cGFuZGVkXCIpID09PSB0aWxlSW5kZXg7XG59XG5mdW5jdGlvbiBvblRpbGVDbG9zZWQoKSB7XG4gIGNvbnN0IGV4cGFuZGVkVGlsZSA9IHNkay5xdWVyeVNlbGVjdG9yKFwiZXhwYW5kZWQtdGlsZXNcIik7XG4gIGlmICghZXhwYW5kZWRUaWxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGV4cGFuZGVkIHRpbGUgZWxlbWVudCBub3QgZm91bmRcIik7XG4gIH1cbiAgZXhwYW5kZWRUaWxlLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImV4cGFuZGVkLXRpbGUtb3ZlcmxheVwiKTtcbiAgZGVzdHJveVN3aXBlcihcImV4cGFuZGVkXCIpO1xufVxudmFyIHRpa3Rva0RlZmF1bHRQbGF5ZWQ7XG52YXIgaW5pdF9leHBhbmRlZF9zd2lwZXJfbG9hZGVyID0gX19lc20oe1xuICBcInNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvZXhwYW5kZWQtc3dpcGVyLmxvYWRlci50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfc3dpcGVyX2V4dGVuc2lvbigpO1xuICAgIGluaXRfd2lkZ2V0X2ZlYXR1cmVzKCk7XG4gICAgaW5pdF90aWt0b2tfbWVzc2FnZSgpO1xuICAgIHRpa3Rva0RlZmF1bHRQbGF5ZWQgPSBmYWxzZTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvcHJvZHVjdC1yZWNzLXN3aXBlci5sb2FkZXIudHNcbmZ1bmN0aW9uIG9uRXhwYW5kZWRUaWxlQ3Jvc3NTZWxsZXJzUmVuZGVyZWQodGlsZUlkLCB0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCkge1xuICAgIGNvbnN0IHN3aXBlckNyb3NzU2VsbCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1leHBhbmRlZC1wcm9kdWN0LXJlY3NcIik7XG4gICAgaWYgKHN3aXBlckNyb3NzU2VsbCkge1xuICAgICAgaW5pdGlhbGl6ZVN3aXBlcih7XG4gICAgICAgIGlkOiBgZXhwYW5kZWQtcHJvZHVjdC1yZWNzLSR7dGlsZUlkfWAsXG4gICAgICAgIG1vZGU6IFwiZXhwYW5kZWQtcHJvZHVjdC1yZWNzXCIsXG4gICAgICAgIHdpZGdldFNlbGVjdG9yOiBzd2lwZXJDcm9zc1NlbGwsXG4gICAgICAgIHByZXZCdXR0b246IFwic3dpcGVyLWV4cC1wcm9kdWN0LXJlY3MtYnV0dG9uLXByZXZcIixcbiAgICAgICAgbmV4dEJ1dHRvbjogXCJzd2lwZXItZXhwLXByb2R1Y3QtcmVjcy1idXR0b24tbmV4dFwiLFxuICAgICAgICBwYXJhbXNPdmVycmlkZXM6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiBcImF1dG9cIixcbiAgICAgICAgICBtb3VzZXdoZWVsOiB7XG4gICAgICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ3JhYkN1cnNvcjogZmFsc2UsXG4gICAgICAgICAgb246IHtcbiAgICAgICAgICAgIGJlZm9yZUluaXQ6IChzd2lwZXIpID0+IHtcbiAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG9Mb29wKDAsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxudmFyIGluaXRfcHJvZHVjdF9yZWNzX3N3aXBlcl9sb2FkZXIgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci9wcm9kdWN0LXJlY3Mtc3dpcGVyLmxvYWRlci50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfc3dpcGVyX2V4dGVuc2lvbigpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvd2lkZ2V0LmZlYXR1cmVzLnRzXG5mdW5jdGlvbiBhZGRBdXRvQWRkVGlsZUZlYXR1cmUoKSB7XG4gIGNvbnN0IHsgYXV0b19yZWZyZXNoIH0gPSBzZGsuZ2V0U3R5bGVDb25maWcoKTtcbiAgaWYgKEJvb2xlYW4oYXV0b19yZWZyZXNoKSA9PT0gdHJ1ZSkge1xuICAgIHNkay50aWxlcy5lbmFibGVBdXRvQWRkTmV3VGlsZXMoKTtcbiAgfVxufVxuZnVuY3Rpb24gbG9hZFdpZGdldElzRW5hYmxlZCgpIHtcbiAgaWYgKGlzRW5hYmxlZCgpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgY29uc3QgdWdjQ29udGFpbmVyID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCIjbm9zdG8tdWdjLWNvbnRhaW5lclwiKTtcbiAgaWYgKCF1Z2NDb250YWluZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBOb3N0byBVR0MgY29udGFpbmVyXCIpO1xuICB9XG4gIHVnY0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIHRocm93IG5ldyBFcnJvcihcIldpZGdldCBpcyBub3QgZW5hYmxlZFwiKTtcbn1cbmZ1bmN0aW9uIGxvYWRFeHBhbmRlZFRpbGVGZWF0dXJlKCkge1xuICBjb25zdCB3aWRnZXRDb250YWluZXIgPSBzZGsuZ2V0U3R5bGVDb25maWcoKTtcbiAgY29uc3QgeyBjbGlja190aHJvdWdoX3VybCB9ID0gd2lkZ2V0Q29udGFpbmVyO1xuICBpZiAoY2xpY2tfdGhyb3VnaF91cmwgPT09IFwiW0VYUEFORF1cIikge1xuICAgIGxvYWRFeHBhbmRTZXR0aW5nQ29tcG9uZW50cygpO1xuICAgIHJlZ2lzdGVyVGlsZUV4cGFuZExpc3RlbmVyKG9uVGlsZUV4cGFuZCk7XG4gICAgcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFWFBBTkRFRF9USUxFX0NMT1NFLCBvblRpbGVDbG9zZWQpO1xuICAgIHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfVElMRV9FWFBBTkRfUkVOREVSRUQsIG9uVGlsZVJlbmRlcmVkKTtcbiAgICByZWdpc3RlclNoYXJlTWVudU9wZW5lZExpc3RlbmVyKHJlZHVjZUJhY2tncm91bmRDb250cm9sc1Zpc2liaWxpdHkpO1xuICAgIHJlZ2lzdGVyU2hhcmVNZW51Q2xvc2VkTGlzdGVuZXIocmVzZXRCYWNrZ3JvdW5kQ29udHJvbHNWaXNpYmlsaXR5KTtcbiAgICByZWdpc3RlckNyb3NzU2VsbGVyc0xvYWRMaXN0ZW5lcihvbkV4cGFuZGVkVGlsZUNyb3NzU2VsbGVyc1JlbmRlcmVkKTtcbiAgfSBlbHNlIGlmIChjbGlja190aHJvdWdoX3VybCA9PT0gXCJbT1JJR0lOQUxfVVJMXVwiIHx8IC9eaHR0cHM/OlxcL1xcLy4rLy50ZXN0KGNsaWNrX3Rocm91Z2hfdXJsID8/IFwiXCIpKSB7XG4gICAgcmVnaXN0ZXJEZWZhdWx0Q2xpY2tFdmVudHMoKTtcbiAgfSBlbHNlIGlmIChjbGlja190aHJvdWdoX3VybCA9PT0gXCJbQ1VTVE9NXVwiKSB7XG4gICAgYWxlcnQoXCJDdXN0b20gVVJMIGludGVncmF0aW9uIE5vdCBpbXBsZW1lbnRlZCB5ZXRcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIGxvYWRNb3JlKCkge1xuICBpZiAod2luZG93Ll9faXNMb2FkaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHdpbmRvdy5fX2lzTG9hZGluZyA9IHRydWU7XG4gIGNvbnN0IGxvYWRNb3JlQnV0dG9uID0gZ2V0TG9hZE1vcmVCdXR0b24oKTtcbiAgc2RrLnRyaWdnZXJFdmVudChFVkVOVF9MT0FEX01PUkUpO1xuICBpZiAoIXNkay50aWxlcy5oYXNNb3JlUGFnZXMoKSkge1xuICAgIGxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIH1cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgd2luZG93Ll9faXNMb2FkaW5nID0gZmFsc2U7XG4gIH0sIDUwMCk7XG59XG5mdW5jdGlvbiBhZGRMb2FkTW9yZUJ1dHRvbkZlYXR1cmUoKSB7XG4gIGNvbnN0IHsgbG9hZF9tb3JlX3R5cGUgfSA9IHNkay5nZXRTdHlsZUNvbmZpZygpO1xuICBjb25zdCBsb2FkTW9yZVR5cGUgPSBsb2FkX21vcmVfdHlwZTtcbiAgc3dpdGNoIChsb2FkTW9yZVR5cGUpIHtcbiAgICBjYXNlIFwiYnV0dG9uXCI6XG4gICAgICBhdHRhY2hMb2FkTW9yZUJ1dHRvbkxpc3RlbmVyKCk7XG4gICAgICBzZGsuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFU19VUERBVEVELCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvYWRNb3JlTG9hZGVyID0gZ2V0TG9hZE1vcmVMb2FkZXIoKTtcbiAgICAgICAgY29uc3QgbG9hZE1vcmVCdXR0b24gPSBnZXRMb2FkTW9yZUJ1dHRvbigpO1xuICAgICAgICBsb2FkTW9yZUxvYWRlci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICBsb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICBkaXNhYmxlTG9hZE1vcmVCdXR0b25JZkV4aXN0cygpO1xuICAgICAgc2RrLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRfVElMRVNfVVBEQVRFRCwgKCkgPT4ge1xuICAgICAgICBjb25zdCBsb2FkTW9yZUxvYWRlciA9IGdldExvYWRNb3JlTG9hZGVyKCk7XG4gICAgICAgIGxvYWRNb3JlTG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICB9KTtcbiAgICAgIHVzZUluZmluaXRlU2Nyb2xsZXJfZGVmYXVsdChzZGssIHdpbmRvdywgbG9hZE1vcmVXcmFwcGVkV2l0aEVhc2VkTG9hZGVyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJzdGF0aWNcIjpcbiAgICAgIGRpc2FibGVMb2FkTW9yZUxvYWRlcklmRXhpc3RzKCk7XG4gICAgICBkaXNhYmxlTG9hZE1vcmVCdXR0b25JZkV4aXN0cygpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbG9hZCBtb3JlIHR5cGVcIik7XG4gIH1cbiAgaWYgKCFzZGsudGlsZXMuaGFzTW9yZVBhZ2VzKCkpIHtcbiAgICBkaXNhYmxlTG9hZE1vcmVCdXR0b25JZkV4aXN0cygpO1xuICAgIGRpc2FibGVMb2FkTW9yZUxvYWRlcklmRXhpc3RzKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGF0dGFjaExvYWRNb3JlQnV0dG9uTGlzdGVuZXIoKSB7XG4gIGNvbnN0IGxvYWRNb3JlQnV0dG9uID0gZ2V0TG9hZE1vcmVCdXR0b24oKTtcbiAgbG9hZE1vcmVCdXR0b24ub25jbGljayA9IGxvYWRNb3JlV3JhcHBlZFdpdGhFYXNlZExvYWRlcjtcbn1cbmZ1bmN0aW9uIGRpc2FibGVMb2FkTW9yZUJ1dHRvbklmRXhpc3RzKCkge1xuICBjb25zdCBsb2FkTW9yZUJ1dHRvbiA9IGdldExvYWRNb3JlQnV0dG9uKCk7XG4gIGxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59XG5mdW5jdGlvbiBkaXNhYmxlTG9hZE1vcmVMb2FkZXJJZkV4aXN0cygpIHtcbiAgZ2V0TG9hZE1vcmVMb2FkZXIoKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xufVxuZnVuY3Rpb24gaGlkZUFsbFRpbGVzQWZ0ZXJOVGlsZXMobnVtYmVyVGlsZXMpIHtcbiAgY29uc3QgdGlsZXMgPSBzZGsucXVlcnlTZWxlY3RvckFsbChcIi51Z2MtdGlsZVwiKTtcbiAgaWYgKCF0aWxlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIHRpbGVzXCIpO1xuICB9XG4gIHRpbGVzLmZvckVhY2goKHRpbGUsIGluZGV4KSA9PiB7XG4gICAgaWYgKGluZGV4ID49IG51bWJlclRpbGVzKSB7XG4gICAgICB0aWxlLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIGFkZFRpbGVzUGVyUGFnZUZlYXR1cmUoKSB7XG4gIGNvbnN0IHsgZW5hYmxlX2N1c3RvbV90aWxlc19wZXJfcGFnZSwgdGlsZXNfcGVyX3BhZ2UgfSA9IHNkay5nZXRTdHlsZUNvbmZpZygpO1xuICBpZiAoZW5hYmxlX2N1c3RvbV90aWxlc19wZXJfcGFnZSkge1xuICAgIHNkay50aWxlcy5zZXRWaXNpYmxlVGlsZXNDb3VudChwYXJzZUludCh0aWxlc19wZXJfcGFnZSkpO1xuICAgIGhpZGVBbGxUaWxlc0FmdGVyTlRpbGVzKHBhcnNlSW50KHRpbGVzX3Blcl9wYWdlKSk7XG4gIH0gZWxzZSB7XG4gICAgc2RrLnRpbGVzLnNldFZpc2libGVUaWxlc0NvdW50KDQwKTtcbiAgfVxufVxuZnVuY3Rpb24gbG9hZFRpdGxlKCkge1xuICBjb25zdCB3aWRnZXRUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBjb25zdCB3aWRnZXRDb250YWluZXIgPSBzZGsucGxhY2VtZW50LmdldFdpZGdldENvbnRhaW5lcigpO1xuICBjb25zdCB0aXRsZSA9IHdpZGdldENvbnRhaW5lci50aXRsZTtcbiAgaWYgKHRpdGxlKSB7XG4gICAgd2lkZ2V0VGl0bGUuaW5uZXJIVE1MID0gdGl0bGU7XG4gIH1cbn1cbmZ1bmN0aW9uIHdhaXRGb3JFbG0ocGFyZW50LCB0YXJnZXRzLCBjYWxsYmFjaykge1xuICBpZiAodGFyZ2V0cy5ldmVyeSgoaXQpID0+ICEhcGFyZW50LnF1ZXJ5U2VsZWN0b3IoaXQpKSkge1xuICAgIGNhbGxiYWNrKHRhcmdldHMubWFwKChpdCkgPT4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoaXQpKSk7XG4gIH1cbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoXywgb2JzZXJ2ZXIyKSA9PiB7XG4gICAgaWYgKHRhcmdldHMuZXZlcnkoKGl0KSA9PiAhIXBhcmVudC5xdWVyeVNlbGVjdG9yKGl0KSkpIHtcbiAgICAgIG9ic2VydmVyMi5kaXNjb25uZWN0KCk7XG4gICAgICBjYWxsYmFjayh0YXJnZXRzLm1hcCgoaXQpID0+IHBhcmVudC5xdWVyeVNlbGVjdG9yKGl0KSkpO1xuICAgIH1cbiAgfSk7XG4gIG9ic2VydmVyLm9ic2VydmUocGFyZW50LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWVcbiAgfSk7XG59XG5mdW5jdGlvbiB3YWl0Rm9yRWxlbWVudHMocGFyZW50LCB0YXJnZXQsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGVsZW1lbnRzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0KTtcbiAgaWYgKGVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBjYWxsYmFjayhlbGVtZW50cyk7XG4gIH1cbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgY29uc3QgbmV3RWxlbWVudHMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCh0YXJnZXQpO1xuICAgIGlmIChuZXdFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBjYWxsYmFjayhuZXdFbGVtZW50cyk7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9KTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShwYXJlbnQsIHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZVxuICB9KTtcbn1cbnZhciBnZXROZXh0TmF2aWdhdGVkVGlsZSwgZ2V0TmV4dFRpbGUsIGdldFByZXZpb3VzVGlsZSwgYXJyb3dDbGlja0xpc3RlbmVyLCBnZXRMb2FkTW9yZUJ1dHRvbiwgZ2V0TG9hZE1vcmVMb2FkZXIsIGxvYWRNb3JlV3JhcHBlZFdpdGhFYXNlZExvYWRlcjtcbnZhciBpbml0X3dpZGdldF9mZWF0dXJlcyA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy93aWRnZXQuZmVhdHVyZXMudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X3NyYygpO1xuICAgIGluaXRfd2lkZ2V0X2NvbXBvbmVudHMoKTtcbiAgICBpbml0X3dpZGdldF9sYXlvdXQoKTtcbiAgICBpbml0X2hvb2tzKCk7XG4gICAgaW5pdF9leHBhbmRlZF9zd2lwZXJfbG9hZGVyKCk7XG4gICAgaW5pdF9wcm9kdWN0X3JlY3Nfc3dpcGVyX2xvYWRlcigpO1xuICAgIGdldE5leHROYXZpZ2F0ZWRUaWxlID0gKGN1cnJlbnRUaWxlLCBlbmFibGVkVGlsZXMsIGRpcmVjdGlvbikgPT4ge1xuICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gZW5hYmxlZFRpbGVzLmZpbmRJbmRleCgodGlsZSkgPT4gdGlsZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpID09PSBjdXJyZW50VGlsZS5pZCk7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInByZXZpb3VzXCIpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNUaWxlID0gZ2V0UHJldmlvdXNUaWxlKGVuYWJsZWRUaWxlcywgY3VycmVudEluZGV4KTtcbiAgICAgICAgaWYgKCFwcmV2aW91c1RpbGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBwcmV2aW91cyB0aWxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2aW91c1RpbGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcIm5leHRcIikge1xuICAgICAgICBjb25zdCBuZXh0VGlsZSA9IGdldE5leHRUaWxlKGVuYWJsZWRUaWxlcywgY3VycmVudEluZGV4KTtcbiAgICAgICAgaWYgKCFuZXh0VGlsZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIG5leHQgdGlsZVwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dFRpbGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgZ2V0TmV4dFRpbGUgPSAoZW5hYmxlZFRpbGVzLCBjdXJyZW50SW5kZXgpID0+IGVuYWJsZWRUaWxlc1tjdXJyZW50SW5kZXggKyAxXTtcbiAgICBnZXRQcmV2aW91c1RpbGUgPSAoZW5hYmxlZFRpbGVzLCBjdXJyZW50SW5kZXgpID0+IGVuYWJsZWRUaWxlc1tjdXJyZW50SW5kZXggLSAxXTtcbiAgICBhcnJvd0NsaWNrTGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgICAgaWYgKCFlLnRhcmdldCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCB0YXJnZXQgZWxlbWVudCBmb3IgYXJyb3cgY2xpY2sgbGlzdGVuZXJcIik7XG4gICAgICB9XG4gICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgIGNvbnN0IHR5cGUgPSB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGlsZS1hcnJvd3MtbGVmdFwiKSA/IFwicHJldmlvdXNcIiA6IFwibmV4dFwiO1xuICAgICAgY29uc3QgY3VycmVudFRpbGUgPSBzZGsudGlsZXMuZ2V0VGlsZSgpO1xuICAgICAgaWYgKCFjdXJyZW50VGlsZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBjdXJyZW50IHRpbGVcIik7XG4gICAgICB9XG4gICAgICBjb25zdCB0aWxlc0FzSHRtbCA9IHNkay5xdWVyeVNlbGVjdG9yQWxsKFwiLnVnYy10aWxlXCIpO1xuICAgICAgaWYgKCF0aWxlc0FzSHRtbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCB0aWxlcyBmb3IgYXJyb3cgaW5pdGlhbGlzYXRpb25cIik7XG4gICAgICB9XG4gICAgICBjb25zdCB0aWxlc0FzSHRtbEFycmF5ID0gQXJyYXkuZnJvbSh0aWxlc0FzSHRtbCk7XG4gICAgICBjb25zdCB0aWxlSWQgPSBnZXROZXh0TmF2aWdhdGVkVGlsZShjdXJyZW50VGlsZSwgdGlsZXNBc0h0bWxBcnJheSwgdHlwZSk7XG4gICAgICBjb25zdCB0aWxlc1N0b3JlID0gT2JqZWN0LnZhbHVlcyhzZGsudGlsZXMudGlsZXMpO1xuICAgICAgY29uc3QgdGlsZURhdGEgPSB7XG4gICAgICAgIHRpbGVEYXRhOiB0aWxlc1N0b3JlLmZpbmQoKHRpbGUpID0+IHRpbGUuaWQgPT09IHRpbGVJZCksXG4gICAgICAgIHdpZGdldElkOiBzZGsucGxhY2VtZW50LmdldFdpZGdldElkKCksXG4gICAgICAgIGZpbHRlcklkOiBzZGsucGxhY2VtZW50LmdldFdpZGdldENvbnRhaW5lcigpLndpZGdldE9wdGlvbnM/LmZpbHRlcl9pZFxuICAgICAgfTtcbiAgICAgIHNkay50cmlnZ2VyRXZlbnQoRVhQQU5ERURfVElMRV9DTE9TRSk7XG4gICAgICBzZGsudHJpZ2dlckV2ZW50KEVWRU5UX1RJTEVfRVhQQU5ELCB0aWxlRGF0YSk7XG4gICAgfTtcbiAgICBnZXRMb2FkTW9yZUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGxvYWRNb3JlQ29tcG9uZW50ID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCJsb2FkLW1vcmVcIik7XG4gICAgICBpZiAoIWxvYWRNb3JlQ29tcG9uZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIGxvYWQgbW9yZSBjb21wb25lbnRcIik7XG4gICAgICB9XG4gICAgICBjb25zdCBsb2FkTW9yZUJ1dHRvbiA9IGxvYWRNb3JlQ29tcG9uZW50Py5xdWVyeVNlbGVjdG9yKFwiI2xvYWQtbW9yZVwiKTtcbiAgICAgIGlmICghbG9hZE1vcmVCdXR0b24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgbG9hZCBtb3JlIGJ1dHRvblwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsb2FkTW9yZUJ1dHRvbjtcbiAgICB9O1xuICAgIGdldExvYWRNb3JlTG9hZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgbG9hZE1vcmVMb2FkZXIgPSBzZGsucXVlcnlTZWxlY3RvcihcIiNsb2FkLW1vcmUtbG9hZGVyXCIpO1xuICAgICAgaWYgKCFsb2FkTW9yZUxvYWRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBsb2FkIG1vcmUgbG9hZGVyXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxvYWRNb3JlTG9hZGVyO1xuICAgIH07XG4gICAgbG9hZE1vcmVXcmFwcGVkV2l0aEVhc2VkTG9hZGVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgbG9hZE1vcmVCdXR0b24gPSBnZXRMb2FkTW9yZUJ1dHRvbigpO1xuICAgICAgbG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIGNvbnN0IGxvYWRNb3JlTG9hZGVyID0gZ2V0TG9hZE1vcmVMb2FkZXIoKTtcbiAgICAgIGxvYWRNb3JlTG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICBsb2FkTW9yZSgpO1xuICAgIH07XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy93aWRnZXQudXRpbHMudHNcbmZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50KHNlbGVjdG9yLCB0aW1lb3V0ID0gNWUzKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSAxMDA7XG4gICAgY29uc3QgZW5kVGltZSA9IERhdGUubm93KCkgKyB0aW1lb3V0O1xuICAgIGNvbnN0IGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gc2RrLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgcmVzb2x2ZShlbGVtZW50KTtcbiAgICAgIH0gZWxzZSBpZiAoRGF0ZS5ub3coKSA+IGVuZFRpbWUpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgRWxlbWVudCB3aXRoIHNlbGVjdG9yIFwiJHtzZWxlY3Rvcn1cIiBub3QgZm91bmQgd2l0aGluICR7dGltZW91dH1tc2ApKTtcbiAgICAgIH1cbiAgICB9LCBpbnRlcnZhbCk7XG4gIH0pO1xufVxudmFyIGluaXRfd2lkZ2V0X3V0aWxzID0gX19lc20oe1xuICBcInNyYy9saWJzL3dpZGdldC51dGlscy50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvZXh0ZW5zaW9ucy9tYXNvbnJ5L21hc29ucnkuZXh0ZW5zaW9uLnRzXG5mdW5jdGlvbiBoYW5kbGVUaWxlSW1hZ2VSZW5kZXJlZCh0aWxlSWQpIHtcbiAgaWYgKCF0aWxlSWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZ3JpZEl0ZW1FbGVtZW50ID0gc2RrLnBsYWNlbWVudC5nZXRTaGFkb3dSb290KCkucXVlcnlTZWxlY3RvcihgLmdyaWQtaXRlbVtkYXRhLWlkKj1cIiR7dGlsZUlkfVwiXWApO1xuICBjb25zdCB0aWxlTG9hZGluZ0VsZW1lbnQgPSBncmlkSXRlbUVsZW1lbnQ/LnF1ZXJ5U2VsZWN0b3IoXCIudGlsZS1sb2FkaW5nLmxvYWRpbmdcIik7XG4gIHRpbGVMb2FkaW5nRWxlbWVudD8uY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIik7XG59XG5mdW5jdGlvbiBoYW5kbGVBbGxUaWxlSW1hZ2VSZW5kZXJlZCgpIHtcbiAgY29uc3QgdGlsZUxvYWRpbmdFbGVtZW50cyA9IHNkay5wbGFjZW1lbnQuZ2V0U2hhZG93Um9vdCgpLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1pdGVtIC50aWxlLWxvYWRpbmcubG9hZGluZ1wiKTtcbiAgdGlsZUxvYWRpbmdFbGVtZW50cz8uZm9yRWFjaCgoZWxlbWVudCkgPT4gZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGluZ1wiKSk7XG4gIGNvbnN0IGxvYWRNb3JlSGlkZGVuRWxlbWVudCA9IHNkay5wbGFjZW1lbnQuZ2V0U2hhZG93Um9vdCgpLnF1ZXJ5U2VsZWN0b3IoXCIjYnV0dG9ucyA+ICNsb2FkLW1vcmUuaGlkZGVuXCIpO1xuICBsb2FkTW9yZUhpZGRlbkVsZW1lbnQ/LmNsYXNzTGlzdC5yZW1vdmUoXCIuaGlkZGVuXCIpO1xufVxuZnVuY3Rpb24gZ2V0R3JpZEl0ZW1Sb3dJZHMoKSB7XG4gIGNvbnN0IGdyaWRJdGVtcyA9IHNkay5wbGFjZW1lbnQuZ2V0U2hhZG93Um9vdCgpLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1pdGVtOm5vdChoaWRkZW4pW3Jvdy1pZF1cIik7XG4gIGNvbnN0IGFsbFJvd0lkcyA9IEFycmF5LmZyb20oZ3JpZEl0ZW1zKS5tYXAoKGl0ZW0pID0+IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93LWlkXCIpKS5maWx0ZXIoKHJvd0lkU3RyaW5nKSA9PiByb3dJZFN0cmluZyAmJiAhTnVtYmVyLmlzTmFOKCtyb3dJZFN0cmluZykpLm1hcCgocm93SWQpID0+ICtyb3dJZCk7XG4gIHJldHVybiBbLi4ubmV3IFNldChhbGxSb3dJZHMpXTtcbn1cbmZ1bmN0aW9uIGhhbmRsZVRpbGVJbWFnZUVycm9yKHRpbGVXaXRoRXJyb3IpIHtcbiAgY29uc3QgZXJyb3JUaWxlUm93SWRTdHJpbmcgPSB0aWxlV2l0aEVycm9yLmdldEF0dHJpYnV0ZShcInJvdy1pZFwiKTtcbiAgdGlsZVdpdGhFcnJvci5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JpZC1pdGVtXCIpO1xuICB0aWxlV2l0aEVycm9yLmNsYXNzTGlzdC5yZW1vdmUoXCJ1Z2MtdGlsZVwiKTtcbiAgdGlsZVdpdGhFcnJvci5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1pdGVtLWVycm9yXCIpO1xuICB0aWxlV2l0aEVycm9yLmNsYXNzTGlzdC5hZGQoXCJ1Z2MtdGlsZS1lcnJvclwiKTtcbiAgdGlsZVdpdGhFcnJvci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICBpZiAoIWVycm9yVGlsZVJvd0lkU3RyaW5nIHx8IE51bWJlci5pc05hTigrZXJyb3JUaWxlUm93SWRTdHJpbmcpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGVycm9yVGlsZVJvd0lkID0gK2Vycm9yVGlsZVJvd0lkU3RyaW5nO1xuICBjb25zdCB1bmlxdWVSb3dJZHMgPSBnZXRHcmlkSXRlbVJvd0lkcygpO1xuICBjb25zdCByb3dJZFNlbGVjdG9ycyA9IHVuaXF1ZVJvd0lkcy5maWx0ZXIoKHJvd0lkKSA9PiByb3dJZCA+PSBlcnJvclRpbGVSb3dJZCkubWFwKChtYXRjaGVkKSA9PiBgW3Jvdy1pZD1cIiR7bWF0Y2hlZH1cIl1gKTtcbiAgY29uc3QgbWF0Y2hlZEdyaWRJdGVtcyA9IEFycmF5LmZyb20oXG4gICAgc2RrLnBsYWNlbWVudC5nZXRTaGFkb3dSb290KCkucXVlcnlTZWxlY3RvckFsbChgLmdyaWQtaXRlbTppcygke3Jvd0lkU2VsZWN0b3JzfSlgKVxuICApO1xuICByZXNpemVUaWxlcyhtYXRjaGVkR3JpZEl0ZW1zKTtcbn1cbmZ1bmN0aW9uIHJlbmRlck1hc29ucnlMYXlvdXQocmVzZXQgPSBmYWxzZSwgcmVzaXplID0gZmFsc2UpIHtcbiAgaWYgKHJlc2l6ZSB8fCByZXNldCkge1xuICAgIHNjcmVlbldpZHRoID0gMDtcbiAgfVxuICBjb25zdCB1Z2NDb250YWluZXIgPSBzZGsucXVlcnlTZWxlY3RvcihcIiNub3N0by11Z2MtY29udGFpbmVyXCIpO1xuICBpZiAoIXVnY0NvbnRhaW5lcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIE5vc3RvIFVHQyBjb250YWluZXJcIik7XG4gIH1cbiAgY29uc3QgY3VycmVudFNjcmVlbldpZHRoID0gdWdjQ29udGFpbmVyLmNsaWVudFdpZHRoO1xuICBpZiAoY3VycmVudFNjcmVlbldpZHRoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChyZXNpemUgJiYgcHJldmlvdXNXaWR0aEhhbmRsZWQgPT09IGN1cnJlbnRTY3JlZW5XaWR0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoc2NyZWVuV2lkdGggPT0gMCkge1xuICAgIHNjcmVlbldpZHRoID0gY3VycmVudFNjcmVlbldpZHRoO1xuICAgIHByZXZpb3VzV2lkdGhIYW5kbGVkID0gY3VycmVudFNjcmVlbldpZHRoO1xuICB9XG4gIGNvbnN0IGFsbFRpbGVzID0gQXJyYXkuZnJvbShzZGsucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWl0ZW1cIikgPz8gW10pO1xuICBjb25zdCB1Z2NUaWxlcyA9IHJlc2V0IHx8IHJlc2l6ZSA/IGFsbFRpbGVzIDogYWxsVGlsZXMuZmlsdGVyKFxuICAgICh0aWxlKSA9PiB0aWxlLmdldEF0dHJpYnV0ZShcIndpZHRoLXNldFwiKSAhPT0gXCJ0cnVlXCIgJiYgdGlsZS5nZXRBdHRyaWJ1dGUoXCJzZXQtZm9yLXdpZHRoXCIpICE9PSBzY3JlZW5XaWR0aC50b1N0cmluZygpXG4gICk7XG4gIHJlc2l6ZVRpbGVzKHVnY1RpbGVzKTtcbn1cbmZ1bmN0aW9uIHJlc2l6ZVRpbGVzKHVnY1RpbGVzKSB7XG4gIGlmICghdWdjVGlsZXMgfHwgdWdjVGlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHVnY1RpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICBjb25zdCByYW5kb21GbGV4R3JvdyA9IE1hdGgucmFuZG9tKCkgKiAyICsgMTtcbiAgICBjb25zdCByYW5kb21XaWR0aCA9IE1hdGgucmFuZG9tKCkgKiAyMDAgKyAxNTA7XG4gICAgdGlsZS5zdHlsZS5mbGV4ID0gYCR7cmFuZG9tRmxleEdyb3d9IDEgYXV0b2A7XG4gICAgdGlsZS5zdHlsZS53aWR0aCA9IGAke3JhbmRvbVdpZHRofXB4YDtcbiAgICB0aWxlLnNldEF0dHJpYnV0ZShcIndpZHRoLXNldFwiLCBcInRydWVcIik7XG4gICAgdGlsZS5zZXRBdHRyaWJ1dGUoXCJzZXQtZm9yLXdpZHRoXCIsIHNjcmVlbldpZHRoLnRvU3RyaW5nKCkpO1xuICB9KTtcbn1cbnZhciBzY3JlZW5XaWR0aCwgcHJldmlvdXNXaWR0aEhhbmRsZWQ7XG52YXIgaW5pdF9tYXNvbnJ5X2V4dGVuc2lvbiA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9leHRlbnNpb25zL21hc29ucnkvbWFzb25yeS5leHRlbnNpb24udHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBzY3JlZW5XaWR0aCA9IDA7XG4gICAgcHJldmlvdXNXaWR0aEhhbmRsZWQgPSAwO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvZXh0ZW5zaW9ucy9zd2lwZXIvZm9udC5zY3NzXG52YXIgZm9udF9kZWZhdWx0O1xudmFyIGluaXRfZm9udCA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9leHRlbnNpb25zL3N3aXBlci9mb250LnNjc3NcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBmb250X2RlZmF1bHQgPSBgQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBzd2lwZXItaWNvbnM7XG4gIHNyYzogdXJsKFwiZGF0YTphcHBsaWNhdGlvbi9mb250LXdvZmY7Y2hhcnNldD11dGYtODtiYXNlNjQsIGQwOUdSZ0FCQUFBQUFBWmdBQkFBQUFBQURBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCR1JsUk5BQUFHUkFBQUFCb0FBQUFjaTZxSGtVZEVSVVlBQUFXZ0FBQUFJd0FBQUNRQVlBQlhSMUJQVXdBQUJoUUFBQUF1QUFBQU51QVk3K3hIVTFWQ0FBQUZ4QUFBQUZBQUFBQm0yZlBjelU5VEx6SUFBQUhjQUFBQVNnQUFBR0JQOVY1UlkyMWhjQUFBQWtRQUFBQ0lBQUFCWXQ2RjBjQmpkblFnQUFBQ3pBQUFBQVFBQUFBRUFCRUJSR2RoYzNBQUFBV1lBQUFBQ0FBQUFBai8vd0FEWjJ4NVpnQUFBeXdBQUFETUFBQUQyTUh0cnlWb1pXRmtBQUFCYkFBQUFEQUFBQUEyRTIrZW9XaG9aV0VBQUFHY0FBQUFId0FBQUNRQzlnRHphRzEwZUFBQUFpZ0FBQUFaQUFBQXJnSmtBQkZzYjJOaEFBQUMwQUFBQUZvQUFBQmFGUUFVR0cxaGVIQUFBQUc4QUFBQUh3QUFBQ0FBY0FCQWJtRnRaUUFBQS9nQUFBRTVBQUFDWHZGZEJ3bHdiM04wQUFBRk5BQUFBR0lBQUFDRTVzNzRoWGphWTJCa1lHQUFZcGY1SHUvaitXMitNbkF6TVlEQXphWDZRakQ2LzQvL0J4ajVHQThBdVJ3TVlHa0FQeXdMMTNqYVkyQmtZR0E4OFA4QWd4NGorLzhmUURZZkExQUVCV2dEQUlCMkJPb0FlTnBqWUdSZ1lOQmg0R2RnWWdBQkVNbklBQkp6WU5BRENRQUFDV2dBc1FCNDJtTmdZZnpDT0lHQmxZR0IwWWN4allHQndSMUtmMldRWkdoaFlHQmlZR1ZtZ0FGR0JpUVFrT2Fhd3REQW9NQlF4WGpnL3dFR1BjWUREQTR3TlVBMkNDZ3dzQUFBTzRFTDZnQUFlTnBqMk0wZ3lBQUNxeGdHTldCa1oyRDQvd01BK3hrRGRnQUFBSGphWTJCZ1lHYUFZQmtHUmdZUWlBSHlHTUY4RmdZSElNM0R3TUhBQkdRck1PZ3lXRExFTTFUOS93OFVCZkVNZ0x6RS8vLy9QLzUvL2YvVi94dityNGVhQUFlTWJBeHdJVVltSU1IRWdLWUFZalVjc0RBd3NMS3hjM0J5Y2ZQdzhqRVFBL2daQkFTRmhFVkV4Y1FsSktXa1pXVGw1QlVVbFpSVlZOWFVOVFFaQmdNQUFNUitFK2dBRVFGRUFBQUFLZ0FxQUNvQU5BQStBRWdBVWdCY0FHWUFjQUI2QUlRQWpnQ1lBS0lBckFDMkFNQUF5Z0RVQU40QTZBRHlBUHdCQmdFUUFSb0JKQUV1QVRnQlFnRk1BVllCWUFGcUFYUUJmZ0dJQVpJQm5BR21BYklCemdIc0FBQjQydTJOTVE2Q1VBeUdXNTY4eDlBbmVZWWdtNE1KYmhLRmFFeElPQVZYOEFwZXdTdDRCaWM0QWZlQWlkM1ZPQml4RHhmUFlFemE1TytYZmkwNFlBRGdnaVVJVUxDdUVKSzhWaE80YlN2cGRua3RISTVRQ1l0ZGkyc2w4Wm5YYUhscVVyTkt6ZEtjVDhjamxxK3J3WlN2SVZjek5pZXpzZm5QL3V6bm1mUEZCTk9ETTJLN01UUTQ1WUVBWnFHUDgxQW1HR2NGM2lQcU9vcDByMVNQVGFUYlZrZlVlNEhYajk3d1lFK3lOd1dZeHdXdTR2MXVnV0hnbzNTMVhkWkVWcVdNN0VUMGNmbkxHeFdma2dSNDJvMlB2V3JETUJTRmovSUhMYUYwektqUmdkaVZNd1NjTlJBb1dVb0g3OFkyaWNCL3lJWTA5QW42QUgyQmR1L1VCK3l4b3BZc2hRaUV2bnZ1MGRVUmdEdDhRZUM4UER3N0ZwamkzZkVBNHovUEVKNllPQjVoS2g0ZGozRXZYaHhQcUgvU0tVWTNySjdzclo0RlpuaDFQTUF0UGh3UDZmbDJQTUpNUERnZVE0clk4WVQ2R3phbzBlQUVBNDA5RHVnZ21UbkZuT2NTQ2lFaUxNZ3hDaVRJNkNxNURaVWQzUW1wMTB2TzBMYUxUZDJjak40Zk91bWxjN2xVWWJTUWNaRmt1dFJHN2c2SktaS3kwUm1kTFk2ODBDRG5FSitVTWtwRkZlMVJON254ZFZwWHJDNGFUdG5hdXJPblllcmNaZzJZVm1MTi9kL2djemZFaW1yRS9mcy9iT3VxMjlabW44dGxvT1JhWGdaZ0dhNzh5TzkvY25YbTJCcGFHdnEyNUR2OVM0RTkrNVNJYzlQcXVwSktoWUZTU2w0NytRY3IxbVlOQUFBQWVOcHR3MGNLd2tBQUFNRFpKQThRN09VSnZrTHNQZlo2ekZWRVJQeThxSGgyWUVSKzNpL0JQODN2SUJMTHlTc29LaW1ycUtxcGEyaHA2K2pxNlJzWUdobWJtSnFaU3kwc3JheHRiTzNzSFJ5ZG5FTVU0dVI2eXg3SkpYdmVQN1dyRHljQUFBQUFBQUgvL3dBQ2VOcGpZR1JnWU9BQlloa2daZ0pDWmdaTkJrWUdMUVp0SUpzRkxNWUFBQXczQUxnQWVOb2xpekVLZ0RBUUJDY2hSYkMyc0ZFUjBZRDZxVlFpQkN2L0g5ZXpHSTZaNVhCQXc4Q0JLL201aVFRVmF1VmJYTG5Pck1adjJvTGRLRmE4UGp1cnUyaEp6R2FibU9TTHpOTXp2dXRwQjNONDJtTmdaR0JnNEdLUVl6QmhZTXhKTE1sajRHQmdBWW93L1AvUEFKSmhMTTZzU29XS2ZXQ0FBd0RBamdiUkFBQjQybU5nWUdCa0FJSWJDWm81SVBybVVuMGhHQTBBTzhFRlRRQUFcIik7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1gO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zd2lwZXItYnVuZGxlLmNzc1xudmFyIHN3aXBlcl9idW5kbGVfZGVmYXVsdDtcbnZhciBpbml0X3N3aXBlcl9idW5kbGUgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zd2lwZXItYnVuZGxlLmNzc1wiKCkge1xuICAgIHN3aXBlcl9idW5kbGVfZGVmYXVsdCA9IGAvKipcbiAqIFN3aXBlciAxMS4xLjE0XG4gKiBNb3N0IG1vZGVybiBtb2JpbGUgdG91Y2ggc2xpZGVyIGFuZCBmcmFtZXdvcmsgd2l0aCBoYXJkd2FyZSBhY2NlbGVyYXRlZCB0cmFuc2l0aW9uc1xuICogaHR0cHM6Ly9zd2lwZXJqcy5jb21cbiAqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDI0IFZsYWRpbWlyIEtoYXJsYW1waWRpXG4gKlxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKlxuICogUmVsZWFzZWQgb246IFNlcHRlbWJlciAxMiwgMjAyNFxuICovXG5cbi8qIEZPTlRfU1RBUlQgKi9cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogJ3N3aXBlci1pY29ucyc7XG4gIHNyYzogdXJsKCdkYXRhOmFwcGxpY2F0aW9uL2ZvbnQtd29mZjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwgZDA5R1JnQUJBQUFBQUFaZ0FCQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJHUmxSTkFBQUdSQUFBQUJvQUFBQWNpNnFIa1VkRVJVWUFBQVdnQUFBQUl3QUFBQ1FBWUFCWFIxQlBVd0FBQmhRQUFBQXVBQUFBTnVBWTcreEhVMVZDQUFBRnhBQUFBRkFBQUFCbTJmUGN6VTlUTHpJQUFBSGNBQUFBU2dBQUFHQlA5VjVSWTIxaGNBQUFBa1FBQUFDSUFBQUJZdDZGMGNCamRuUWdBQUFDekFBQUFBUUFBQUFFQUJFQlJHZGhjM0FBQUFXWUFBQUFDQUFBQUFqLy93QURaMng1WmdBQUF5d0FBQURNQUFBRDJNSHRyeVZvWldGa0FBQUJiQUFBQURBQUFBQTJFMitlb1dob1pXRUFBQUdjQUFBQUh3QUFBQ1FDOWdEemFHMTBlQUFBQWlnQUFBQVpBQUFBcmdKa0FCRnNiMk5oQUFBQzBBQUFBRm9BQUFCYUZRQVVHRzFoZUhBQUFBRzhBQUFBSHdBQUFDQUFjQUJBYm1GdFpRQUFBL2dBQUFFNUFBQUNYdkZkQndsd2IzTjBBQUFGTkFBQUFHSUFBQUNFNXM3NGhYamFZMkJrWUdBQVlwZjVIdS9qK1cyK01uQXpNWURBemFYNlFqRDYvNC8vQnhqNUdBOEF1UndNWUdrQVB5d0wxM2phWTJCa1lHQTg4UDhBZ3g0aisvOGZRRFlmQTFBRUJXZ0RBSUIyQk9vQWVOcGpZR1JnWU5CaDRHZGdZZ0FCRU1uSUFCSnpZTkFEQ1FBQUNXZ0FzUUI0Mm1OZ1lmekNPSUdCbFlHQjBZY3hqWUdCd1IxS2YyV1FaR2hoWUdCaVlHVm1nQUZHQmlRUWtPYWF3dERBb01CUXhYamcvd0VHUGNZRERBNHdOVUEyQ0Nnd3NBQUFPNEVMNmdBQWVOcGoyTTBneUFBQ3F4Z0dOV0JrWjJENC93TUEreGtEZGdBQUFIamFZMkJnWUdhQVlCa0dSZ1lRaUFIeUdNRjhGZ1lISU0zRHdNSEFCR1FyTU9neVdETEVNMVQ5L3c4VUJmRU1nTHpFLy8vL1AvNS8vZi9WL3h2K3I0ZWFBQWVNYkF4d0lVWW1JTUhFZ0tZQVlqVWNzREF3c0xLeGMzQnljZlB3OGpFUUEvZ1pCQVNGaEVWRXhjUWxKS1drWldUbDVCVVVsWlJWVk5YVU5UUVpCZ01BQU1SK0UrZ0FFUUZFQUFBQUtnQXFBQ29BTkFBK0FFZ0FVZ0JjQUdZQWNBQjZBSVFBamdDWUFLSUFyQUMyQU1BQXlnRFVBTjRBNkFEeUFQd0JCZ0VRQVJvQkpBRXVBVGdCUWdGTUFWWUJZQUZxQVhRQmZnR0lBWklCbkFHbUFiSUJ6Z0hzQUFCNDJ1Mk5NUTZDVUF5R1c1Njh4OUFuZVlZZ200TUpiaEtGYUV4SU9BVlg4QXBld1N0NEJpYzRBZmVBaWQzVk9CaXhEeGZQWUV6YTVPK1hmaTA0WUFEZ2dpVUlVTEN1RUpLOFZoTzRiU3ZwZG5rdEhJNVFDWXRkaTJzbDhablhhSGxxVXJOS3pkS2NUOGNqbHErcndaU3ZJVmN6TmllenNmblAvdXpubWZQRkJOT0RNMks3TVRRNDVZRUFacUdQODFBbUdHY0YzaVBxT29wMHIxU1BUYVRiVmtmVWU0SFhqOTd3WUUreU53V1l4d1d1NHYxdWdXSGdvM1MxWGRaRVZxV003RVQwY2ZuTEd4V2ZrZ1I0Mm8yUHZXckRNQlNGai9JSExhRjB6S2pSZ2RpVk13U2NOUkFvV1VvSDc4WTJpY0IveUlZMDlBbjZBSDJCZHUvVUIreXhvcFlzaFFpRXZudnUwZFVSZ0R0OFFlQzhQRHc3RnBqaTNmRUE0ei9QRUo2WU9CNWhLaDRkajNFdlhoeFBxSC9TS1VZM3JKN3NyWjRGWm5oMVBNQXRQaHdQNmZsMlBNSk1QRGdlUTRyWThZVDZHemFvMGVBRUE0MDlEdWdnbVRuRm5PY1NDaUVpTE1neENpVEk2Q3E1RFpVZDNRbXAxMHZPMExhTFRkMmNqTjRmT3VtbGM3bFVZYlNRY1pGa3V0Ukc3ZzZKS1pLeTBSbWRMWTY4MENEbkVKK1VNa3BGRmUxUk43bnhkVnBYckM0YVR0bmF1ck9uWWVyY1pnMllWbUxOL2QvZ2N6ZkVpbXJFL2ZzL2JPdXEyOVptbjh0bG9PUmFYZ1pnR2E3OHlPOS9jblhtMkJwYUd2cTI1RHY5UzRFOSs1U0ljOVBxdXBKS2hZRlNTbDQ3K1FjcjFtWU5BQUFBZU5wdHcwY0t3a0FBQU1EWkpBOFE3T1VKdmtMc1BmWjZ6RlZFUlB5OHFIaDJZRVIrM2kvQlA4M3ZJQkxMeVNzb0tpbXJxS3FwYTJocDYranE2UnNZR2htYm1KcVpTeTBzcmF4dGJPM3NIUnlkbkVNVTR1UjZ5eDdKSlh2ZVA3V3JEeWNBQUFBQUFBSC8vd0FDZU5wallHUmdZT0FCWWhrZ1pnSkNaZ1pOQmtZR0xRWnRJSnNGTE1ZQUFBdzNBTGdBZU5vbGl6RUtnREFRQkNjaFJiQzJzRkVSMFlENnFWUWlCQ3YvSDllekdJNlo1WEJBdzhDQksvbTVpUVFWYXVWYlhMbk9yTVp2Mm9MZEtGYThQanVydTJoSnpHYWJtT1NMek5NenZ1dHBCM040Mm1OZ1pHQmc0R0tRWXpCaFlNeEpMTWxqNEdCZ0FZb3cvUC9QQUpKaExNNnNTb1dLZldDQUF3REFqZ2JSQUFCNDJtTmdZR0JrQUlJYkNabzVJUHJtVW4waEdBMEFPOEVGVFFBQScpO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4vKiBGT05UX0VORCAqL1xuOnJvb3Qge1xuICAtLXN3aXBlci10aGVtZS1jb2xvcjogIzAwN2FmZjtcbiAgLypcbiAgLS1zd2lwZXItcHJlbG9hZGVyLWNvbG9yOiB2YXIoLS1zd2lwZXItdGhlbWUtY29sb3IpO1xuICAtLXN3aXBlci13cmFwcGVyLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBpbml0aWFsO1xuICAqL1xufVxuOmhvc3Qge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICB6LWluZGV4OiAxO1xufVxuLnN3aXBlciB7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgcGFkZGluZzogMDtcbiAgLyogRml4IG9mIFdlYmtpdCBmbGlja2VyaW5nICovXG4gIHotaW5kZXg6IDE7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLnN3aXBlci12ZXJ0aWNhbCA+IC5zd2lwZXItd3JhcHBlciB7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4uc3dpcGVyLXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHotaW5kZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IHRyYW5zZm9ybTtcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IHZhcigtLXN3aXBlci13cmFwcGVyLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uLCBpbml0aWFsKTtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG59XG4uc3dpcGVyLWFuZHJvaWQgLnN3aXBlci1zbGlkZSxcbi5zd2lwZXItaW9zIC5zd2lwZXItc2xpZGUsXG4uc3dpcGVyLXdyYXBwZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMCwgMCk7XG59XG4uc3dpcGVyLWhvcml6b250YWwge1xuICB0b3VjaC1hY3Rpb246IHBhbi15O1xufVxuLnN3aXBlci12ZXJ0aWNhbCB7XG4gIHRvdWNoLWFjdGlvbjogcGFuLXg7XG59XG4uc3dpcGVyLXNsaWRlIHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi5zd2lwZXItc2xpZGUtaW52aXNpYmxlLWJsYW5rIHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuLyogQXV0byBIZWlnaHQgKi9cbi5zd2lwZXItYXV0b2hlaWdodCxcbi5zd2lwZXItYXV0b2hlaWdodCAuc3dpcGVyLXNsaWRlIHtcbiAgaGVpZ2h0OiBhdXRvO1xufVxuLnN3aXBlci1hdXRvaGVpZ2h0IC5zd2lwZXItd3JhcHBlciB7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm0sIGhlaWdodDtcbn1cbi5zd2lwZXItYmFja2ZhY2UtaGlkZGVuIC5zd2lwZXItc2xpZGUge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbn1cbi8qIDNEIEVmZmVjdHMgKi9cbi5zd2lwZXItM2Quc3dpcGVyLWNzcy1tb2RlIC5zd2lwZXItd3JhcHBlciB7XG4gIHBlcnNwZWN0aXZlOiAxMjAwcHg7XG59XG4uc3dpcGVyLTNkIC5zd2lwZXItd3JhcHBlciB7XG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XG59XG4uc3dpcGVyLTNkIHtcbiAgcGVyc3BlY3RpdmU6IDEyMDBweDtcbn1cbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZSxcbi5zd2lwZXItM2QgLnN3aXBlci1jdWJlLXNoYWRvdyB7XG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XG59XG4vKiBDU1MgTW9kZSAqL1xuLnN3aXBlci1jc3MtbW9kZSA+IC5zd2lwZXItd3JhcHBlciB7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gIC8qIEZvciBGaXJlZm94ICovXG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogbm9uZTtcbiAgLyogRm9yIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlICovXG59XG4uc3dpcGVyLWNzcy1tb2RlID4gLnN3aXBlci13cmFwcGVyOjotd2Via2l0LXNjcm9sbGJhciB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4uc3dpcGVyLWNzcy1tb2RlID4gLnN3aXBlci13cmFwcGVyID4gLnN3aXBlci1zbGlkZSB7XG4gIHNjcm9sbC1zbmFwLWFsaWduOiBzdGFydCBzdGFydDtcbn1cbi5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLWhvcml6b250YWwgPiAuc3dpcGVyLXdyYXBwZXIge1xuICBzY3JvbGwtc25hcC10eXBlOiB4IG1hbmRhdG9yeTtcbn1cbi5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLXZlcnRpY2FsID4gLnN3aXBlci13cmFwcGVyIHtcbiAgc2Nyb2xsLXNuYXAtdHlwZTogeSBtYW5kYXRvcnk7XG59XG4uc3dpcGVyLWNzcy1tb2RlLnN3aXBlci1mcmVlLW1vZGUgPiAuc3dpcGVyLXdyYXBwZXIge1xuICBzY3JvbGwtc25hcC10eXBlOiBub25lO1xufVxuLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItZnJlZS1tb2RlID4gLnN3aXBlci13cmFwcGVyID4gLnN3aXBlci1zbGlkZSB7XG4gIHNjcm9sbC1zbmFwLWFsaWduOiBub25lO1xufVxuLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItY2VudGVyZWQgPiAuc3dpcGVyLXdyYXBwZXI6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcnO1xuICBmbGV4LXNocmluazogMDtcbiAgb3JkZXI6IDk5OTk7XG59XG4uc3dpcGVyLWNzcy1tb2RlLnN3aXBlci1jZW50ZXJlZCA+IC5zd2lwZXItd3JhcHBlciA+IC5zd2lwZXItc2xpZGUge1xuICBzY3JvbGwtc25hcC1hbGlnbjogY2VudGVyIGNlbnRlcjtcbiAgc2Nyb2xsLXNuYXAtc3RvcDogYWx3YXlzO1xufVxuLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItY2VudGVyZWQuc3dpcGVyLWhvcml6b250YWwgPiAuc3dpcGVyLXdyYXBwZXIgPiAuc3dpcGVyLXNsaWRlOmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLWlubGluZS1zdGFydDogdmFyKC0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1iZWZvcmUpO1xufVxuLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItY2VudGVyZWQuc3dpcGVyLWhvcml6b250YWwgPiAuc3dpcGVyLXdyYXBwZXI6OmJlZm9yZSB7XG4gIGhlaWdodDogMTAwJTtcbiAgbWluLWhlaWdodDogMXB4O1xuICB3aWR0aDogdmFyKC0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1hZnRlcik7XG59XG4uc3dpcGVyLWNzcy1tb2RlLnN3aXBlci1jZW50ZXJlZC5zd2lwZXItdmVydGljYWwgPiAuc3dpcGVyLXdyYXBwZXIgPiAuc3dpcGVyLXNsaWRlOmZpcnN0LWNoaWxkIHtcbiAgbWFyZ2luLWJsb2NrLXN0YXJ0OiB2YXIoLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWJlZm9yZSk7XG59XG4uc3dpcGVyLWNzcy1tb2RlLnN3aXBlci1jZW50ZXJlZC5zd2lwZXItdmVydGljYWwgPiAuc3dpcGVyLXdyYXBwZXI6OmJlZm9yZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4td2lkdGg6IDFweDtcbiAgaGVpZ2h0OiB2YXIoLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWFmdGVyKTtcbn1cbi8qIFNsaWRlIHN0eWxlcyBzdGFydCAqL1xuLyogM0QgU2hhZG93cyAqL1xuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdyxcbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCxcbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsXG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCxcbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLFxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdyxcbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCxcbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsXG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCxcbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB6LWluZGV4OiAxMDtcbn1cbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3cge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMTUpO1xufVxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0IHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGxlZnQsIHJnYmEoMCwgMCwgMCwgMC41KSwgcmdiYSgwLCAwLCAwLCAwKSk7XG59XG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0IHtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMCkpO1xufVxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3Age1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCByZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMCkpO1xufVxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20ge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCByZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMCkpO1xufVxuLnN3aXBlci1sYXp5LXByZWxvYWRlciB7XG4gIHdpZHRoOiA0MnB4O1xuICBoZWlnaHQ6IDQycHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNTAlO1xuICB0b3A6IDUwJTtcbiAgbWFyZ2luLWxlZnQ6IC0yMXB4O1xuICBtYXJnaW4tdG9wOiAtMjFweDtcbiAgei1pbmRleDogMTA7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDUwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tc3dpcGVyLXByZWxvYWRlci1jb2xvciwgdmFyKC0tc3dpcGVyLXRoZW1lLWNvbG9yKSk7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYm9yZGVyLXRvcC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4uc3dpcGVyOm5vdCguc3dpcGVyLXdhdGNoLXByb2dyZXNzKSAuc3dpcGVyLWxhenktcHJlbG9hZGVyLFxuLnN3aXBlci13YXRjaC1wcm9ncmVzcyAuc3dpcGVyLXNsaWRlLXZpc2libGUgLnN3aXBlci1sYXp5LXByZWxvYWRlciB7XG4gIGFuaW1hdGlvbjogc3dpcGVyLXByZWxvYWRlci1zcGluIDFzIGluZmluaXRlIGxpbmVhcjtcbn1cbi5zd2lwZXItbGF6eS1wcmVsb2FkZXItd2hpdGUge1xuICAtLXN3aXBlci1wcmVsb2FkZXItY29sb3I6ICNmZmY7XG59XG4uc3dpcGVyLWxhenktcHJlbG9hZGVyLWJsYWNrIHtcbiAgLS1zd2lwZXItcHJlbG9hZGVyLWNvbG9yOiAjMDAwO1xufVxuQGtleWZyYW1lcyBzd2lwZXItcHJlbG9hZGVyLXNwaW4ge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgfVxufVxuLyogU2xpZGUgc3R5bGVzIGVuZCAqL1xuLnN3aXBlci12aXJ0dWFsIC5zd2lwZXItc2xpZGUge1xuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xufVxuLnN3aXBlci12aXJ0dWFsLnN3aXBlci1jc3MtbW9kZSAuc3dpcGVyLXdyYXBwZXI6OmFmdGVyIHtcbiAgY29udGVudDogJyc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cbi5zd2lwZXItdmlydHVhbC5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLWhvcml6b250YWwgLnN3aXBlci13cmFwcGVyOjphZnRlciB7XG4gIGhlaWdodDogMXB4O1xuICB3aWR0aDogdmFyKC0tc3dpcGVyLXZpcnR1YWwtc2l6ZSk7XG59XG4uc3dpcGVyLXZpcnR1YWwuc3dpcGVyLWNzcy1tb2RlLnN3aXBlci12ZXJ0aWNhbCAuc3dpcGVyLXdyYXBwZXI6OmFmdGVyIHtcbiAgd2lkdGg6IDFweDtcbiAgaGVpZ2h0OiB2YXIoLS1zd2lwZXItdmlydHVhbC1zaXplKTtcbn1cbjpyb290IHtcbiAgLS1zd2lwZXItbmF2aWdhdGlvbi1zaXplOiA0NHB4O1xuICAvKlxuICAtLXN3aXBlci1uYXZpZ2F0aW9uLXRvcC1vZmZzZXQ6IDUwJTtcbiAgLS1zd2lwZXItbmF2aWdhdGlvbi1zaWRlcy1vZmZzZXQ6IDEwcHg7XG4gIC0tc3dpcGVyLW5hdmlnYXRpb24tY29sb3I6IHZhcigtLXN3aXBlci10aGVtZS1jb2xvcik7XG4gICovXG59XG4uc3dpcGVyLWJ1dHRvbi1wcmV2LFxuLnN3aXBlci1idXR0b24tbmV4dCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiB2YXIoLS1zd2lwZXItbmF2aWdhdGlvbi10b3Atb2Zmc2V0LCA1MCUpO1xuICB3aWR0aDogY2FsYyh2YXIoLS1zd2lwZXItbmF2aWdhdGlvbi1zaXplKSAvIDQ0ICogMjcpO1xuICBoZWlnaHQ6IHZhcigtLXN3aXBlci1uYXZpZ2F0aW9uLXNpemUpO1xuICBtYXJnaW4tdG9wOiBjYWxjKDBweCAtICh2YXIoLS1zd2lwZXItbmF2aWdhdGlvbi1zaXplKSAvIDIpKTtcbiAgei1pbmRleDogMTA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGNvbG9yOiB2YXIoLS1zd2lwZXItbmF2aWdhdGlvbi1jb2xvciwgdmFyKC0tc3dpcGVyLXRoZW1lLWNvbG9yKSk7XG59XG4uc3dpcGVyLWJ1dHRvbi1wcmV2LnN3aXBlci1idXR0b24tZGlzYWJsZWQsXG4uc3dpcGVyLWJ1dHRvbi1uZXh0LnN3aXBlci1idXR0b24tZGlzYWJsZWQge1xuICBvcGFjaXR5OiAwLjM1O1xuICBjdXJzb3I6IGF1dG87XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLnN3aXBlci1idXR0b24tcHJldi5zd2lwZXItYnV0dG9uLWhpZGRlbixcbi5zd2lwZXItYnV0dG9uLW5leHQuc3dpcGVyLWJ1dHRvbi1oaWRkZW4ge1xuICBvcGFjaXR5OiAwO1xuICBjdXJzb3I6IGF1dG87XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLnN3aXBlci1uYXZpZ2F0aW9uLWRpc2FibGVkIC5zd2lwZXItYnV0dG9uLXByZXYsXG4uc3dpcGVyLW5hdmlnYXRpb24tZGlzYWJsZWQgLnN3aXBlci1idXR0b24tbmV4dCB7XG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5zd2lwZXItYnV0dG9uLXByZXYgc3ZnLFxuLnN3aXBlci1idXR0b24tbmV4dCBzdmcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvYmplY3QtZml0OiBjb250YWluO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XG59XG4uc3dpcGVyLXJ0bCAuc3dpcGVyLWJ1dHRvbi1wcmV2IHN2Zyxcbi5zd2lwZXItcnRsIC5zd2lwZXItYnV0dG9uLW5leHQgc3ZnIHtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbn1cbi5zd2lwZXItYnV0dG9uLXByZXYsXG4uc3dpcGVyLXJ0bCAuc3dpcGVyLWJ1dHRvbi1uZXh0IHtcbiAgbGVmdDogdmFyKC0tc3dpcGVyLW5hdmlnYXRpb24tc2lkZXMtb2Zmc2V0LCAxMHB4KTtcbiAgcmlnaHQ6IGF1dG87XG59XG4uc3dpcGVyLWJ1dHRvbi1uZXh0LFxuLnN3aXBlci1ydGwgLnN3aXBlci1idXR0b24tcHJldiB7XG4gIHJpZ2h0OiB2YXIoLS1zd2lwZXItbmF2aWdhdGlvbi1zaWRlcy1vZmZzZXQsIDEwcHgpO1xuICBsZWZ0OiBhdXRvO1xufVxuLnN3aXBlci1idXR0b24tbG9jayB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG4vKiBOYXZpZ2F0aW9uIGZvbnQgc3RhcnQgKi9cbi5zd2lwZXItYnV0dG9uLXByZXY6YWZ0ZXIsXG4uc3dpcGVyLWJ1dHRvbi1uZXh0OmFmdGVyIHtcbiAgZm9udC1mYW1pbHk6IHN3aXBlci1pY29ucztcbiAgZm9udC1zaXplOiB2YXIoLS1zd2lwZXItbmF2aWdhdGlvbi1zaXplKTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmUgIWltcG9ydGFudDtcbiAgbGV0dGVyLXNwYWNpbmc6IDA7XG4gIGZvbnQtdmFyaWFudDogaW5pdGlhbDtcbiAgbGluZS1oZWlnaHQ6IDE7XG59XG4uc3dpcGVyLWJ1dHRvbi1wcmV2OmFmdGVyLFxuLnN3aXBlci1ydGwgLnN3aXBlci1idXR0b24tbmV4dDphZnRlciB7XG4gIGNvbnRlbnQ6ICdwcmV2Jztcbn1cbi5zd2lwZXItYnV0dG9uLW5leHQsXG4uc3dpcGVyLXJ0bCAuc3dpcGVyLWJ1dHRvbi1wcmV2IHtcbiAgcmlnaHQ6IHZhcigtLXN3aXBlci1uYXZpZ2F0aW9uLXNpZGVzLW9mZnNldCwgMTBweCk7XG4gIGxlZnQ6IGF1dG87XG59XG4uc3dpcGVyLWJ1dHRvbi1uZXh0OmFmdGVyLFxuLnN3aXBlci1ydGwgLnN3aXBlci1idXR0b24tcHJldjphZnRlciB7XG4gIGNvbnRlbnQ6ICduZXh0Jztcbn1cbi8qIE5hdmlnYXRpb24gZm9udCBlbmQgKi9cbjpyb290IHtcbiAgLypcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1jb2xvcjogdmFyKC0tc3dpcGVyLXRoZW1lLWNvbG9yKTtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1sZWZ0OiBhdXRvO1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLXJpZ2h0OiA4cHg7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tYm90dG9tOiA4cHg7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tdG9wOiBhdXRvO1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWZyYWN0aW9uLWNvbG9yOiBpbmhlcml0O1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLWJnLWNvbG9yOiByZ2JhKDAsMCwwLDAuMjUpO1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLXNpemU6IDRweDtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtc2l6ZTogOHB4O1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC13aWR0aDogOHB4O1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1oZWlnaHQ6IDhweDtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYm9yZGVyLXJhZGl1czogNTAlO1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1pbmFjdGl2ZS1jb2xvcjogIzAwMDtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtaW5hY3RpdmUtb3BhY2l0eTogMC4yO1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1vcGFjaXR5OiAxO1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1ob3Jpem9udGFsLWdhcDogNHB4O1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC12ZXJ0aWNhbC1nYXA6IDZweDtcbiAgKi9cbn1cbi5zd2lwZXItcGFnaW5hdGlvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0cmFuc2l0aW9uOiAzMDBtcyBvcGFjaXR5O1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuICB6LWluZGV4OiAxMDtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi5zd2lwZXItcGFnaW5hdGlvbi1oaWRkZW4ge1xuICBvcGFjaXR5OiAwO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWRpc2FibGVkID4gLnN3aXBlci1wYWdpbmF0aW9uLFxuLnN3aXBlci1wYWdpbmF0aW9uLnN3aXBlci1wYWdpbmF0aW9uLWRpc2FibGVkIHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuLyogQ29tbW9uIFN0eWxlcyAqL1xuLnN3aXBlci1wYWdpbmF0aW9uLWZyYWN0aW9uLFxuLnN3aXBlci1wYWdpbmF0aW9uLWN1c3RvbSxcbi5zd2lwZXItaG9yaXpvbnRhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLFxuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMuc3dpcGVyLXBhZ2luYXRpb24taG9yaXpvbnRhbCB7XG4gIGJvdHRvbTogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tYm90dG9tLCA4cHgpO1xuICB0b3A6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLXRvcCwgYXV0byk7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xufVxuLyogQnVsbGV0cyAqL1xuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGZvbnQtc2l6ZTogMDtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC4zMyk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZS1tYWluIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUtcHJldiB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC42Nik7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlLXByZXYtcHJldiB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC4zMyk7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlLW5leHQge1xuICB0cmFuc2Zvcm06IHNjYWxlKDAuNjYpO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZS1uZXh0LW5leHQge1xuICB0cmFuc2Zvcm06IHNjYWxlKDAuMzMpO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCB7XG4gIHdpZHRoOiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtd2lkdGgsIHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1zaXplLCA4cHgpKTtcbiAgaGVpZ2h0OiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtaGVpZ2h0LCB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtc2l6ZSwgOHB4KSk7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWJvcmRlci1yYWRpdXMsIDUwJSk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1pbmFjdGl2ZS1jb2xvciwgIzAwMCk7XG4gIG9wYWNpdHk6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1pbmFjdGl2ZS1vcGFjaXR5LCAwLjIpO1xufVxuYnV0dG9uLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCB7XG4gIGJvcmRlcjogbm9uZTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBib3gtc2hhZG93OiBub25lO1xuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1jbGlja2FibGUgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQ6b25seS1jaGlsZCB7XG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlIHtcbiAgb3BhY2l0eTogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LW9wYWNpdHksIDEpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1jb2xvciwgdmFyKC0tc3dpcGVyLXRoZW1lLWNvbG9yKSk7XG59XG4uc3dpcGVyLXZlcnRpY2FsID4gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMsXG4uc3dpcGVyLXBhZ2luYXRpb24tdmVydGljYWwuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cyB7XG4gIHJpZ2h0OiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1yaWdodCwgOHB4KTtcbiAgbGVmdDogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tbGVmdCwgYXV0byk7XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgLTUwJSwgMCk7XG59XG4uc3dpcGVyLXZlcnRpY2FsID4gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCxcbi5zd2lwZXItcGFnaW5hdGlvbi12ZXJ0aWNhbC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQge1xuICBtYXJnaW46IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC12ZXJ0aWNhbC1nYXAsIDZweCkgMDtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4uc3dpcGVyLXZlcnRpY2FsID4gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljLFxuLnN3aXBlci1wYWdpbmF0aW9uLXZlcnRpY2FsLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIHtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgd2lkdGg6IDhweDtcbn1cbi5zd2lwZXItdmVydGljYWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCxcbi5zd2lwZXItcGFnaW5hdGlvbi12ZXJ0aWNhbC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0IHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB0cmFuc2l0aW9uOiAyMDBtcyB0cmFuc2Zvcm0sXG4gICAgICAgIDIwMG1zIHRvcDtcbn1cbi5zd2lwZXItaG9yaXpvbnRhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQsXG4uc3dpcGVyLXBhZ2luYXRpb24taG9yaXpvbnRhbC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQge1xuICBtYXJnaW46IDAgdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWhvcml6b250YWwtZ2FwLCA0cHgpO1xufVxuLnN3aXBlci1ob3Jpem9udGFsID4gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljLFxuLnN3aXBlci1wYWdpbmF0aW9uLWhvcml6b250YWwuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMge1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cbi5zd2lwZXItaG9yaXpvbnRhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LFxuLnN3aXBlci1wYWdpbmF0aW9uLWhvcml6b250YWwuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCB7XG4gIHRyYW5zaXRpb246IDIwMG1zIHRyYW5zZm9ybSxcbiAgICAgICAgMjAwbXMgbGVmdDtcbn1cbi5zd2lwZXItaG9yaXpvbnRhbC5zd2lwZXItcnRsID4gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0IHtcbiAgdHJhbnNpdGlvbjogMjAwbXMgdHJhbnNmb3JtLFxuICAgIDIwMG1zIHJpZ2h0O1xufVxuLyogRnJhY3Rpb24gKi9cbi5zd2lwZXItcGFnaW5hdGlvbi1mcmFjdGlvbiB7XG4gIGNvbG9yOiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1mcmFjdGlvbi1jb2xvciwgaW5oZXJpdCk7XG59XG4vKiBQcm9ncmVzcyAqL1xuLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItYmctY29sb3IsIHJnYmEoMCwgMCwgMCwgMC4yNSkpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIgLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLWZpbGwge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1jb2xvciwgdmFyKC0tc3dpcGVyLXRoZW1lLWNvbG9yKSk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IHRvcDtcbn1cbi5zd2lwZXItcnRsIC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2JhciAuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItZmlsbCB7XG4gIHRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IHRvcDtcbn1cbi5zd2lwZXItaG9yaXpvbnRhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhcixcbi5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci5zd2lwZXItcGFnaW5hdGlvbi1ob3Jpem9udGFsLFxuLnN3aXBlci12ZXJ0aWNhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1vcHBvc2l0ZSxcbi5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci5zd2lwZXItcGFnaW5hdGlvbi12ZXJ0aWNhbC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1vcHBvc2l0ZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLXNpemUsIDRweCk7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbn1cbi5zd2lwZXItdmVydGljYWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIsXG4uc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIuc3dpcGVyLXBhZ2luYXRpb24tdmVydGljYWwsXG4uc3dpcGVyLWhvcml6b250YWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItb3Bwb3NpdGUsXG4uc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIuc3dpcGVyLXBhZ2luYXRpb24taG9yaXpvbnRhbC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1vcHBvc2l0ZSB7XG4gIHdpZHRoOiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1zaXplLCA0cHgpO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1sb2NrIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbjpyb290IHtcbiAgLypcbiAgLS1zd2lwZXItc2Nyb2xsYmFyLWJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIC0tc3dpcGVyLXNjcm9sbGJhci10b3A6IGF1dG87XG4gIC0tc3dpcGVyLXNjcm9sbGJhci1ib3R0b206IDRweDtcbiAgLS1zd2lwZXItc2Nyb2xsYmFyLWxlZnQ6IGF1dG87XG4gIC0tc3dpcGVyLXNjcm9sbGJhci1yaWdodDogNHB4O1xuICAtLXN3aXBlci1zY3JvbGxiYXItc2lkZXMtb2Zmc2V0OiAxJTtcbiAgLS1zd2lwZXItc2Nyb2xsYmFyLWJnLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIC0tc3dpcGVyLXNjcm9sbGJhci1kcmFnLWJnLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gIC0tc3dpcGVyLXNjcm9sbGJhci1zaXplOiA0cHg7XG4gICovXG59XG4uc3dpcGVyLXNjcm9sbGJhciB7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXN3aXBlci1zY3JvbGxiYXItYm9yZGVyLXJhZGl1cywgMTBweCk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG91Y2gtYWN0aW9uOiBub25lO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLWJnLWNvbG9yLCByZ2JhKDAsIDAsIDAsIDAuMSkpO1xufVxuLnN3aXBlci1zY3JvbGxiYXItZGlzYWJsZWQgPiAuc3dpcGVyLXNjcm9sbGJhcixcbi5zd2lwZXItc2Nyb2xsYmFyLnN3aXBlci1zY3JvbGxiYXItZGlzYWJsZWQge1xuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG59XG4uc3dpcGVyLWhvcml6b250YWwgPiAuc3dpcGVyLXNjcm9sbGJhcixcbi5zd2lwZXItc2Nyb2xsYmFyLnN3aXBlci1zY3JvbGxiYXItaG9yaXpvbnRhbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1zaWRlcy1vZmZzZXQsIDElKTtcbiAgYm90dG9tOiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLWJvdHRvbSwgNHB4KTtcbiAgdG9wOiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLXRvcCwgYXV0byk7XG4gIHotaW5kZXg6IDUwO1xuICBoZWlnaHQ6IHZhcigtLXN3aXBlci1zY3JvbGxiYXItc2l6ZSwgNHB4KTtcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDIgKiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLXNpZGVzLW9mZnNldCwgMSUpKTtcbn1cbi5zd2lwZXItdmVydGljYWwgPiAuc3dpcGVyLXNjcm9sbGJhcixcbi5zd2lwZXItc2Nyb2xsYmFyLnN3aXBlci1zY3JvbGxiYXItdmVydGljYWwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IHZhcigtLXN3aXBlci1zY3JvbGxiYXItbGVmdCwgYXV0byk7XG4gIHJpZ2h0OiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLXJpZ2h0LCA0cHgpO1xuICB0b3A6IHZhcigtLXN3aXBlci1zY3JvbGxiYXItc2lkZXMtb2Zmc2V0LCAxJSk7XG4gIHotaW5kZXg6IDUwO1xuICB3aWR0aDogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1zaXplLCA0cHgpO1xuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDIgKiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLXNpZGVzLW9mZnNldCwgMSUpKTtcbn1cbi5zd2lwZXItc2Nyb2xsYmFyLWRyYWcge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN3aXBlci1zY3JvbGxiYXItZHJhZy1iZy1jb2xvciwgcmdiYSgwLCAwLCAwLCAwLjUpKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1ib3JkZXItcmFkaXVzLCAxMHB4KTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xufVxuLnN3aXBlci1zY3JvbGxiYXItY3Vyc29yLWRyYWcge1xuICBjdXJzb3I6IG1vdmU7XG59XG4uc3dpcGVyLXNjcm9sbGJhci1sb2NrIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi8qIFpvb20gY29udGFpbmVyIHN0eWxlcyBzdGFydCAqL1xuLnN3aXBlci16b29tLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uc3dpcGVyLXpvb20tY29udGFpbmVyID4gaW1nLFxuLnN3aXBlci16b29tLWNvbnRhaW5lciA+IHN2Zyxcbi5zd2lwZXItem9vbS1jb250YWluZXIgPiBjYW52YXMge1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG59XG4vKiBab29tIGNvbnRhaW5lciBzdHlsZXMgZW5kICovXG4uc3dpcGVyLXNsaWRlLXpvb21lZCB7XG4gIGN1cnNvcjogbW92ZTtcbiAgdG91Y2gtYWN0aW9uOiBub25lO1xufVxuLyogYTExeSAqL1xuLnN3aXBlciAuc3dpcGVyLW5vdGlmaWNhdGlvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgb3BhY2l0eTogMDtcbiAgei1pbmRleDogLTEwMDA7XG59XG4uc3dpcGVyLWZyZWUtbW9kZSA+IC5zd2lwZXItd3JhcHBlciB7XG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG4uc3dpcGVyLWdyaWQgPiAuc3dpcGVyLXdyYXBwZXIge1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG4uc3dpcGVyLWdyaWQtY29sdW1uID4gLnN3aXBlci13cmFwcGVyIHtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLnN3aXBlci1mYWRlLnN3aXBlci1mcmVlLW1vZGUgLnN3aXBlci1zbGlkZSB7XG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcbn1cbi5zd2lwZXItZmFkZSAuc3dpcGVyLXNsaWRlIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IG9wYWNpdHk7XG59XG4uc3dpcGVyLWZhZGUgLnN3aXBlci1zbGlkZSAuc3dpcGVyLXNsaWRlIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uc3dpcGVyLWZhZGUgLnN3aXBlci1zbGlkZS1hY3RpdmUge1xuICBwb2ludGVyLWV2ZW50czogYXV0bztcbn1cbi5zd2lwZXItZmFkZSAuc3dpcGVyLXNsaWRlLWFjdGl2ZSAuc3dpcGVyLXNsaWRlLWFjdGl2ZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xufVxuLnN3aXBlci5zd2lwZXItY3ViZSB7XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICB6LWluZGV4OiAxO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlIC5zd2lwZXItc2xpZGUge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cbi5zd2lwZXItY3ViZS5zd2lwZXItcnRsIC5zd2lwZXItc2xpZGUge1xuICB0cmFuc2Zvcm0tb3JpZ2luOiAxMDAlIDA7XG59XG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZS1hY3RpdmUsXG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZS1hY3RpdmUgLnN3aXBlci1zbGlkZS1hY3RpdmUge1xuICBwb2ludGVyLWV2ZW50czogYXV0bztcbn1cbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlLWFjdGl2ZSxcbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlLW5leHQsXG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZS1wcmV2IHtcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG4uc3dpcGVyLWN1YmUgLnN3aXBlci1jdWJlLXNoYWRvdyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgYm90dG9tOiAwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9wYWNpdHk6IDAuNjtcbiAgei1pbmRleDogMDtcbn1cbi5zd2lwZXItY3ViZSAuc3dpcGVyLWN1YmUtc2hhZG93OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcnO1xuICBiYWNrZ3JvdW5kOiAjMDAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgZmlsdGVyOiBibHVyKDUwcHgpO1xufVxuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUtbmV4dCArIC5zd2lwZXItc2xpZGUge1xuICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cbi8qIEN1YmUgc2xpZGUgc2hhZG93cyBzdGFydCAqL1xuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUtc2hhZG93LWN1YmUuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AsXG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZS1zaGFkb3ctY3ViZS5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSxcbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlLXNoYWRvdy1jdWJlLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCxcbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlLXNoYWRvdy1jdWJlLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQge1xuICB6LWluZGV4OiAwO1xuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG59XG4vKiBDdWJlIHNsaWRlIHNoYWRvd3MgZW5kICovXG4uc3dpcGVyLnN3aXBlci1mbGlwIHtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG4uc3dpcGVyLWZsaXAgLnN3aXBlci1zbGlkZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gIHotaW5kZXg6IDE7XG59XG4uc3dpcGVyLWZsaXAgLnN3aXBlci1zbGlkZSAuc3dpcGVyLXNsaWRlIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uc3dpcGVyLWZsaXAgLnN3aXBlci1zbGlkZS1hY3RpdmUsXG4uc3dpcGVyLWZsaXAgLnN3aXBlci1zbGlkZS1hY3RpdmUgLnN3aXBlci1zbGlkZS1hY3RpdmUge1xuICBwb2ludGVyLWV2ZW50czogYXV0bztcbn1cbi8qIEZsaXAgc2xpZGUgc2hhZG93cyBzdGFydCAqL1xuLnN3aXBlci1mbGlwIC5zd2lwZXItc2xpZGUtc2hhZG93LWZsaXAuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AsXG4uc3dpcGVyLWZsaXAgLnN3aXBlci1zbGlkZS1zaGFkb3ctZmxpcC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSxcbi5zd2lwZXItZmxpcCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1mbGlwLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCxcbi5zd2lwZXItZmxpcCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1mbGlwLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQge1xuICB6LWluZGV4OiAwO1xuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG59XG4vKiBGbGlwIHNsaWRlIHNoYWRvd3MgZW5kICovXG4uc3dpcGVyLWNyZWF0aXZlIC5zd2lwZXItc2xpZGUge1xuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IHRyYW5zZm9ybSwgb3BhY2l0eSwgaGVpZ2h0O1xufVxuLnN3aXBlci5zd2lwZXItY2FyZHMge1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbn1cbi5zd2lwZXItY2FyZHMgLnN3aXBlci1zbGlkZSB7XG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbmA7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9leHRlbnNpb25zL3N3aXBlci9sb2FkZXIuZXh0ZW5zaW9uLnRzXG5mdW5jdGlvbiBlbmFibGVUaWxlQ29udGVudChzbGlkZTIpIHtcbiAgc2xpZGUyLnF1ZXJ5U2VsZWN0b3IoXCIudGlsZS1sb2FkaW5nXCIpPy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICBzbGlkZTIucXVlcnlTZWxlY3RvcihcIi5pY29uLXNlY3Rpb24uaGlkZGVuXCIpPy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xufVxuZnVuY3Rpb24gZW5hYmxlVGlsZUltYWdlKHNsaWRlMikge1xuICBjb25zdCB0aWxlSW1hZ2UgPSBzbGlkZTIucXVlcnlTZWxlY3RvcihcIi50aWxlLWltYWdlLXdyYXBwZXIgPiBpbWdcIik7XG4gIGlmICh0aWxlSW1hZ2UpIHtcbiAgICBpZiAodGlsZUltYWdlLmNvbXBsZXRlKSB7XG4gICAgICBlbmFibGVUaWxlQ29udGVudChzbGlkZTIpO1xuICAgIH1cbiAgICB0aWxlSW1hZ2Uub25sb2FkID0gKCkgPT4gZW5hYmxlVGlsZUNvbnRlbnQoc2xpZGUyKTtcbiAgfVxufVxuZnVuY3Rpb24gZW5hYmxlVGlsZUltYWdlcyh3cmFwcGVyKSB7XG4gIGNvbnN0IGVsZW1lbnRzID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFwiLnVnYy10aWxlOmhhcyguaWNvbi1zZWN0aW9uLmhpZGRlbilcIik7XG4gIGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IGVuYWJsZVRpbGVJbWFnZShlbGVtZW50KSk7XG59XG5mdW5jdGlvbiBsb2FkQWxsVW5sb2FkZWRUaWxlcygpIHtcbiAgY29uc3QgdGlsZVdyYXBwZXIgPSBzZGsucGxhY2VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudWdjLXRpbGVzXCIpO1xuICBpZiAodGlsZVdyYXBwZXIpIHtcbiAgICBlbmFibGVUaWxlSW1hZ2VzKHRpbGVXcmFwcGVyKTtcbiAgfVxufVxudmFyIGluaXRfbG9hZGVyX2V4dGVuc2lvbiA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9leHRlbnNpb25zL3N3aXBlci9sb2FkZXIuZXh0ZW5zaW9uLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9leHRlbnNpb25zL3N3aXBlci9pbmRleC50c1xuZnVuY3Rpb24gbG9hZFN3aXBlclN0eWxlcygpIHtcbiAgc2RrLmFkZFdpZGdldEN1c3RvbVN0eWxlcyhmb250X2RlZmF1bHQpO1xuICBzZGsuYWRkU2hhcmVkQ3NzQ3VzdG9tU3R5bGVzKFwic3dpcGVyLWJ1bmRsZVwiLCBzd2lwZXJfYnVuZGxlX2RlZmF1bHQsIFtcbiAgICBzZGsucGxhY2VtZW50LmdldFdpZGdldElkKCksXG4gICAgXCJleHBhbmRlZC10aWxlc1wiLFxuICAgIFwidWdjLXByb2R1Y3RzXCJcbiAgXSk7XG59XG52YXIgaW5pdF9zd2lwZXIyID0gX19lc20oe1xuICBcInNyYy9saWJzL2V4dGVuc2lvbnMvc3dpcGVyL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9mb250KCk7XG4gICAgaW5pdF9zd2lwZXJfYnVuZGxlKCk7XG4gICAgaW5pdF9sb2FkZXJfZXh0ZW5zaW9uKCk7XG4gICAgaW5pdF9zd2lwZXJfZXh0ZW5zaW9uKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9leHRlbnNpb25zL2luZGV4LnRzXG52YXIgaW5pdF9leHRlbnNpb25zID0gX19lc20oe1xuICBcInNyYy9saWJzL2V4dGVuc2lvbnMvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X21hc29ucnlfZXh0ZW5zaW9uKCk7XG4gICAgaW5pdF9zd2lwZXIyKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL2VtYmVkLXlvdXR1YmUudGVtcGxhdGUudHN4XG5mdW5jdGlvbiBFbWJlZFlvdXR1YmUoeyB0aWxlSWQsIHZpZGVvSWQgfSkge1xuICBjb25zdCBjb250ZW50RWxlbWVudCA9IGxvYWRZb3V0dWJlSWZyYW1lQ29udGVudCh0aWxlSWQsIHZpZGVvSWQpO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXG4gICAgXCJpZnJhbWVcIixcbiAgICB7XG4gICAgICBsb2FkaW5nOiBcImxhenlcIixcbiAgICAgIGlkOiBgeXQtZnJhbWUtJHt0aWxlSWR9LSR7dmlkZW9JZH1gLFxuICAgICAgY2xhc3M6IFwidmlkZW8tY29udGVudFwiLFxuICAgICAgZnJhbWVib3JkZXI6IFwiMFwiLFxuICAgICAgc3JjZG9jOiBjb250ZW50RWxlbWVudC5pbm5lckhUTUxcbiAgICB9XG4gICk7XG59XG5mdW5jdGlvbiBsb2FkWW91dHViZUlmcmFtZUNvbnRlbnQodGlsZUlkLCB2aWRlb0lkKSB7XG4gIGNvbnN0IHNjcmlwdElkID0gYHl0LXNjcmlwdC0ke3RpbGVJZH0tJHt2aWRlb0lkfWA7XG4gIGNvbnN0IHBsYXllcklkID0gYHl0LXBsYXllci0ke3RpbGVJZH0tJHt2aWRlb0lkfWA7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImh0bWxcIiwgbnVsbCwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJoZWFkXCIsIG51bGwsIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIHsgaWQ6IHNjcmlwdElkLCBzcmM6IFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaVwiIH0pLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInNjcmlwdFwiLCBudWxsLCBsb2FkWW91dHViZVBsYXllckFQSShwbGF5ZXJJZCwgdmlkZW9JZCkpKSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJib2R5XCIsIG51bGwsIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IHBsYXllcklkIH0pKSk7XG59XG5mdW5jdGlvbiBsb2FkWW91dHViZVBsYXllckFQSShwbGF5ZXJJZCwgdmlkZW9JZCkge1xuICByZXR1cm4gYFxuICBsZXQgcGxheWVyXG5cbiAgZnVuY3Rpb24gbG9hZFBsYXllcihwbGF5RGVmYXVsdCA9IGZhbHNlKSB7XG4gICAgcGxheWVyID0gbmV3IFlULlBsYXllcihcIiR7cGxheWVySWR9XCIsIHtcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIHZpZGVvSWQ6IFwiJHt2aWRlb0lkfVwiLFxuICAgICAgcGxheWVyVmFyczoge1xuICAgICAgICBwbGF5c2lubGluZTogMVxuICAgICAgfSxcbiAgICAgIGV2ZW50czoge1xuICAgICAgICBvblJlYWR5OiBwbGF5RGVmYXVsdCA/IHBsYXkgOiBwYXVzZSxcbiAgICAgICAgb25FcnJvcjogZXJyb3JIYW5kbGVyXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIEFQSSBydW5zIGF1dG9tYXRpY2FsbHkgb25jZSB0aGUgaWZyYW1lLWFwaSBKUyBpcyBkb3dubG9hZGVkLlxuICAvLyBUaGlzIHdpbGwgbm90IHJ1biB3aGVuIHJlLW9wZW5pbmcgZXhwYW5kZWQgdGlsZVxuICBmdW5jdGlvbiBvbllvdVR1YmVJZnJhbWVBUElSZWFkeSgpIHtcbiAgICBsb2FkUGxheWVyKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGVycm9ySGFuZGxlcihlKSB7XG4gICBwbGF5ZXI/LmdldElmcmFtZSgpLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwieXQtdmlkZW8tZXJyb3JcIiwgeyBkZXRhaWw6IGUgfSkpXG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBpZiAoIXBsYXllcikge1xuICAgICAgbG9hZFBsYXllcihmYWxzZSkgLy9uZWVkZWQgd2hlbiBleHBhbmRlZCB0aWxlIHJlLW9wZW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXIubXV0ZSgpXG4gICAgICBwbGF5ZXIucGF1c2VWaWRlbygpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBwbGF5ZXI/LmRlc3Ryb3koKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgcGxheWVyPy5zZWVrVG8oMCwgZmFsc2UpXG4gIH1cblxuICBmdW5jdGlvbiBwbGF5KCkge1xuICAgIGlmICghcGxheWVyKSB7XG4gICAgICBsb2FkUGxheWVyKHRydWUpIC8vbmVlZGVkIHdoZW4gZXhwYW5kZWQgdGlsZSByZS1vcGVuZWRcbiAgICB9IGVsc2Uge1xuICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChwbGF5ZXIuaXNNdXRlZCgpKSB7XG4gICAgICAgIHBsYXllci51bk11dGUoKVxuICAgICAgfVxuICAgICAgcGxheWVyLnBsYXlWaWRlbygpXG4gICAgICB9LCA1MDApXG4gICAgfVxuICB9IGA7XG59XG52YXIgaW5pdF9lbWJlZF95b3V0dWJlX3RlbXBsYXRlID0gX19lc20oe1xuICBcInNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvZW1iZWQteW91dHViZS50ZW1wbGF0ZS50c3hcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2xpYnMoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvdGlsZS50ZW1wbGF0ZS50c3hcbmZ1bmN0aW9uIEV4cGFuZGVkVGlsZSh7IHNkazogc2RrMiwgdGlsZSB9KSB7XG4gIGNvbnN0IHsgc2hvd19zaG9wc3BvdHMsIHNob3dfcHJvZHVjdHMsIHNob3dfdGFncywgc2hvd19zaGFyaW5nLCBzaG93X2NhcHRpb24sIHNob3dfdGltZXN0YW1wIH0gPSBzZGsyLmdldEV4cGFuZGVkVGlsZUNvbmZpZygpO1xuICBjb25zdCBzaG9wc3BvdEVuYWJsZWQgPSBzZGsyLmlzQ29tcG9uZW50TG9hZGVkKFwic2hvcHNwb3RzXCIpICYmIHNob3dfc2hvcHNwb3RzICYmICEhdGlsZS5ob3RzcG90cz8ubGVuZ3RoO1xuICBjb25zdCBwcm9kdWN0c0VuYWJsZWQgPSBzZGsyLmlzQ29tcG9uZW50TG9hZGVkKFwicHJvZHVjdHNcIikgJiYgc2hvd19wcm9kdWN0cyAmJiAhIXRpbGUudGFnc19leHRlbmRlZD8ubGVuZ3RoO1xuICBjb25zdCB0YWdzRW5hYmxlZCA9IHNob3dfdGFncztcbiAgY29uc3Qgc2hhcmluZ1Rvb2xzRW5hYmxlZCA9IHNob3dfc2hhcmluZztcbiAgY29uc3QgcGFyZW50ID0gc2RrMi5nZXROb2RlSWQoKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KGNyZWF0ZUZyYWdtZW50LCBudWxsLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInBhbmVsXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJwYW5lbC1sZWZ0XCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoSWNvblNlY3Rpb24sIHsgdGlsZSwgcHJvZHVjdHNFbmFibGVkIH0pLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImltYWdlLXdyYXBwZXJcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImltYWdlLXdyYXBwZXItaW5uZXJcIiB9LCB0aWxlLm1lZGlhID09PSBcInZpZGVvXCIgPyAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChjcmVhdGVGcmFnbWVudCwgbnVsbCwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoVmlkZW9Db250YWluZXIsIHsgdGlsZSwgcGFyZW50IH0pLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChWaWRlb0Vycm9yRmFsbGJhY2tUZW1wbGF0ZSwgeyB0aWxlIH0pKSA6IHRpbGUubWVkaWEgPT09IFwiaW1hZ2VcIiA/IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KEltYWdlVGVtcGxhdGUsIHsgdGlsZSwgaW1hZ2U6IHRpbGUuaW1hZ2UsIHNob3BzcG90RW5hYmxlZCwgcGFyZW50IH0pIDogdGlsZS5tZWRpYSA9PT0gXCJ0ZXh0XCIgPyAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzczogXCJjb250ZW50LXRleHRcIiB9LCB0aWxlLm1lc3NhZ2UpIDogdGlsZS5tZWRpYSA9PT0gXCJodG1sXCIgPyAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzczogXCJjb250ZW50LWh0bWxcIiB9LCB0aWxlLmh0bWwpIDogLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoY3JlYXRlRnJhZ21lbnQsIG51bGwpKSkpLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInBhbmVsLXJpZ2h0XCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJwYW5lbC1yaWdodC13cmFwcGVyXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJjb250ZW50LXdyYXBwZXJcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImNvbnRlbnQtaW5uZXItd3JhcHBlclwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFxuICAgIFwidGlsZS1jb250ZW50XCIsXG4gICAge1xuICAgICAgdGlsZUlkOiB0aWxlLmlkLFxuICAgICAgXCJyZW5kZXItc2hhcmUtbWVudVwiOiBzaGFyaW5nVG9vbHNFbmFibGVkLFxuICAgICAgXCJyZW5kZXItY2FwdGlvblwiOiBzaG93X2NhcHRpb24sXG4gICAgICBcInJlbmRlci10aW1lcGhyYXNlXCI6IHNob3dfdGltZXN0YW1wXG4gICAgfVxuICApLCB0YWdzRW5hYmxlZCAmJiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInRpbGUtdGFnc1wiLCB7IFwidGlsZS1pZFwiOiB0aWxlLmlkLCBtb2RlOiBcInN3aXBlclwiLCBjb250ZXh0OiBcImV4cGFuZGVkXCIgfSksIHByb2R1Y3RzRW5hYmxlZCAmJiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChjcmVhdGVGcmFnbWVudCwgbnVsbCwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJ1Z2MtcHJvZHVjdHNcIiwgeyBwYXJlbnQsIFwidGlsZS1pZFwiOiB0aWxlLmlkIH0pKSkpKSkpKTtcbn1cbmZ1bmN0aW9uIEljb25TZWN0aW9uKHsgdGlsZSwgcHJvZHVjdHNFbmFibGVkIH0pIHtcbiAgY29uc3QgdG9wU2VjdGlvbkljb25Db250ZW50ID0gW107XG4gIGNvbnN0IGJvdHRvbVNlY3Rpb25JY29uQ29udGVudCA9IFtdO1xuICBpZiAodGlsZS5hdHRycy5pbmNsdWRlcyhcImluc3RhZ3JhbS5yZWVsXCIpKSB7XG4gICAgdG9wU2VjdGlvbkljb25Db250ZW50LnB1c2goLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJjb250ZW50LWljb24gaWNvbi1yZWVsXCIgfSkpO1xuICB9IGVsc2UgaWYgKHRpbGUuYXR0cnMuaW5jbHVkZXMoXCJ5b3V0dWJlLnNob3J0XCIpKSB7XG4gICAgdG9wU2VjdGlvbkljb25Db250ZW50LnB1c2goLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJjb250ZW50LWljb24gaWNvbi15b3V0dWJlLXNob3J0XCIgfSkpO1xuICB9XG4gIGlmIChwcm9kdWN0c0VuYWJsZWQpIHtcbiAgICB0b3BTZWN0aW9uSWNvbkNvbnRlbnQucHVzaCgvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInNob3BwaW5nLWljb24gaWNvbi1wcm9kdWN0c1wiIH0pKTtcbiAgfVxuICBib3R0b21TZWN0aW9uSWNvbkNvbnRlbnQucHVzaCgvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBgbmV0d29yay1pY29uIGljb24tJHt0aWxlLnNvdXJjZX1gIH0pKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiaWNvbi1zZWN0aW9uXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ0b3Atc2VjdGlvblwiIH0sIC4uLnRvcFNlY3Rpb25JY29uQ29udGVudCksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiYm90dG9tLXNlY3Rpb25cIiB9LCAuLi5ib3R0b21TZWN0aW9uSWNvbkNvbnRlbnQpKTtcbn1cbmZ1bmN0aW9uIFNob3BTcG90VGVtcGxhdGUoeyBzaG9wc3BvdEVuYWJsZWQsIHBhcmVudCwgdGlsZUlkIH0pIHtcbiAgcmV0dXJuIHNob3BzcG90RW5hYmxlZCA/IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KGNyZWF0ZUZyYWdtZW50LCBudWxsLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInNob3BzcG90LWljb25cIiwgeyBwYXJlbnQsIG1vZGU6IFwiZXhwYW5kZWRcIiwgXCJ0aWxlLWlkXCI6IHRpbGVJZCB9KSkgOiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChjcmVhdGVGcmFnbWVudCwgbnVsbCk7XG59XG5mdW5jdGlvbiBJbWFnZVRlbXBsYXRlKHtcbiAgdGlsZSxcbiAgaW1hZ2UsXG4gIHNob3BzcG90RW5hYmxlZCA9IGZhbHNlLFxuICBwYXJlbnRcbn0pIHtcbiAgcmV0dXJuIGltYWdlID8gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoY3JlYXRlRnJhZ21lbnQsIG51bGwsIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiaW1hZ2UtZmlsbGVyXCIsIHN0eWxlOiB7IFwiYmFja2dyb3VuZC1pbWFnZVwiOiBgdXJsKCcke2ltYWdlfScpYCB9IH0pLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImltYWdlXCIgfSwgc2hvcHNwb3RFbmFibGVkID8gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoU2hvcFNwb3RUZW1wbGF0ZSwgeyBzaG9wc3BvdEVuYWJsZWQsIHBhcmVudCwgdGlsZUlkOiB0aWxlLmlkIH0pIDogLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoY3JlYXRlRnJhZ21lbnQsIG51bGwpLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImltZ1wiLCB7IGNsYXNzOiBcImltYWdlLWVsZW1lbnRcIiwgc3JjOiBpbWFnZSwgbG9hZGluZzogXCJsYXp5XCIsIGFsdDogdGlsZS5kZXNjcmlwdGlvbiB8fCBcIkltYWdlXCIgfSkpKSA6IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KGNyZWF0ZUZyYWdtZW50LCBudWxsKTtcbn1cbmZ1bmN0aW9uIFZpZGVvQ29udGFpbmVyKHsgdGlsZSwgcGFyZW50IH0pIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwidmlkZW8tY29udGVudC13cmFwcGVyXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJpbWFnZS1maWxsZXJcIiwgc3R5bGU6IHsgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IGB1cmwoJyR7dGlsZS5vcmlnaW5hbF9pbWFnZV91cmx9JylgIH0gfSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFNvdXJjZVZpZGVvQ29udGVudCwgeyB0aWxlLCBwYXJlbnQgfSkpO1xufVxuZnVuY3Rpb24gU291cmNlVmlkZW9Db250ZW50KHsgdGlsZSwgcGFyZW50IH0pIHtcbiAgaWYgKHRpbGUuc291cmNlID09PSBcInRpa3Rva1wiIHx8IHRpbGUudmlkZW9fc291cmNlID09PSBcInRpa3Rva1wiKSB7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFRpa1Rva1RlbXBsYXRlLCB7IHRpbGUgfSk7XG4gIH1cbiAgaWYgKHRpbGUuc291cmNlID09PSBcInlvdXR1YmVcIiAmJiB0aWxlLnlvdXR1YmVfaWQpIHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoRW1iZWRZb3V0dWJlLCB7IHRpbGVJZDogdGlsZS5pZCwgdmlkZW9JZDogdGlsZS55b3V0dWJlX2lkIH0pO1xuICB9XG4gIGlmICh0aWxlLnNvdXJjZSA9PT0gXCJmYWNlYm9va1wiKSB7XG4gICAgY29uc3QgdmlkZW9VcmxQYXR0ZXJuID0gL3ZpZGVvc1xcLyhcXGQpKz8vO1xuICAgIGlmICghdGlsZS52aWRlb19maWxlcz8ubGVuZ3RoIHx8ICF2aWRlb1VybFBhdHRlcm4udGVzdCh0aWxlLnZpZGVvX2ZpbGVzWzBdLnVybCkpIHtcbiAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChWaWRlb0Vycm9yRmFsbGJhY2tUZW1wbGF0ZSwgeyB0aWxlLCBwYXJlbnQsIGRlZmF1bHRIaWRkZW46IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuICBpZiAodGlsZS5zb3VyY2UgPT09IFwidHdpdHRlclwiKSB7XG4gICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFR3aXR0ZXJUZW1wbGF0ZSwgeyB0aWxlIH0pO1xuICB9XG4gIGlmICh0aWxlLnZpZGVvX2ZpbGVzPy5sZW5ndGggfHwgdGlsZS52aWRlbyAmJiB0aWxlLnZpZGVvLnN0YW5kYXJkX3Jlc29sdXRpb24pIHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoVWdjVmlkZW9UZW1wbGF0ZSwgeyB0aWxlIH0pO1xuICB9XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChGYWNlYm9va0ZhbGxiYWNrVGVtcGxhdGUsIHsgdGlsZSB9KTtcbn1cbmZ1bmN0aW9uIGdldFZpZGVvRGF0YSh0aWxlKSB7XG4gIGlmICh0aWxlLnZpZGVvX2ZpbGVzPy5sZW5ndGgpIHtcbiAgICByZXR1cm4gdGlsZS52aWRlb19maWxlc1swXTtcbiAgfVxuICBpZiAodGlsZS52aWRlbyAmJiB0aWxlLnZpZGVvLnN0YW5kYXJkX3Jlc29sdXRpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IFwiYXV0b1wiLFxuICAgICAgaGVpZ2h0OiBcImF1dG9cIixcbiAgICAgIG1pbWU6IFwidmlkZW8vbXA0XCIsXG4gICAgICB1cmw6IHRpbGUudmlkZW8uc3RhbmRhcmRfcmVzb2x1dGlvbi51cmxcbiAgICB9O1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIHZpZGVvIGRhdGFcIik7XG59XG5mdW5jdGlvbiBVZ2NWaWRlb1RlbXBsYXRlKHsgdGlsZSB9KSB7XG4gIGNvbnN0IHsgdXJsLCB3aWR0aCwgaGVpZ2h0LCBtaW1lIH0gPSBnZXRWaWRlb0RhdGEodGlsZSk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcbiAgICBcInZpZGVvXCIsXG4gICAge1xuICAgICAgbXV0ZWQ6IHRydWUsXG4gICAgICB0aWxlaWQ6IHRpbGUuaWQsXG4gICAgICBjbGFzczogXCJ2aWRlby1jb250ZW50XCIsXG4gICAgICBjb250cm9sczogdHJ1ZSxcbiAgICAgIHByZWxvYWQ6IFwibm9uZVwiLFxuICAgICAgcGxheXNpbmxpbmU6IFwicGxheXNpbmxpbmVcIixcbiAgICAgIG9uY2FucGxheTogXCJ0aGlzLm11dGVkPXRydWVcIlxuICAgIH0sXG4gICAgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJzb3VyY2VcIiwgeyBzcmM6IHVybCwgd2lkdGg6IHdpZHRoLnRvU3RyaW5nKCksIGhlaWdodDogaGVpZ2h0LnRvU3RyaW5nKCksIHR5cGU6IG1pbWUgfSlcbiAgKTtcbn1cbmZ1bmN0aW9uIFR3aXR0ZXJUZW1wbGF0ZSh7IHRpbGUgfSkge1xuICBjb25zdCB7IHN0YW5kYXJkX3Jlc29sdXRpb24gfSA9IHRpbGUudmlkZW87XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcbiAgICBcInZpZGVvXCIsXG4gICAge1xuICAgICAgdGlsZWlkOiB0aWxlLmlkLFxuICAgICAgY2xhc3M6IFwidmlkZW8tY29udGVudFwiLFxuICAgICAgY29udHJvbHM6IHRydWUsXG4gICAgICBwcmVsb2FkOiBcIm5vbmVcIixcbiAgICAgIHBsYXlzaW5saW5lOiBcInBsYXlzaW5saW5lXCIsXG4gICAgICBvbmNhbnBsYXk6IFwidGhpcy5tdXRlZD10cnVlXCJcbiAgICB9LFxuICAgIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwic291cmNlXCIsIHsgc3JjOiBzdGFuZGFyZF9yZXNvbHV0aW9uLnVybCB9KVxuICApO1xufVxuZnVuY3Rpb24gVGlrVG9rVGVtcGxhdGUoeyB0aWxlIH0pIHtcbiAgY29uc3QgdGlrdG9rSWQgPSB0aWxlLnRpa3Rva19pZDtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFxuICAgIFwiaWZyYW1lXCIsXG4gICAge1xuICAgICAgaWQ6IGB0aWt0b2stZnJhbWUtJHt0aWxlLmlkfS0ke3Rpa3Rva0lkfWAsXG4gICAgICBsb2FkaW5nOiBcImxhenlcIixcbiAgICAgIGNsYXNzOiBcInZpZGVvLWNvbnRlbnRcIixcbiAgICAgIGZyYW1lYm9yZGVyOiBcIjBcIixcbiAgICAgIGFsbG93ZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgIGFsbG93OiBcImF1dG9wbGF5XCIsXG4gICAgICBzcmM6IGBodHRwczovL3d3dy50aWt0b2suY29tL3BsYXllci92MS8ke3Rpa3Rva0lkfT9yZWw9MGBcbiAgICB9XG4gICk7XG59XG5mdW5jdGlvbiBGYWNlYm9va0ZhbGxiYWNrVGVtcGxhdGUoeyB0aWxlIH0pIHtcbiAgY29uc3QgZW1iZWRCbG9jayA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiZmItY29udGVudC13cmFwcGVyXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogXCJmYi1yb290XCIgfSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFxuICAgIFwic2NyaXB0XCIsXG4gICAge1xuICAgICAgYXN5bmM6IHRydWUsXG4gICAgICBkZWZlcjogdHJ1ZSxcbiAgICAgIGNyb3Nzb3JpZ2luOiBcImFub255bW91c1wiLFxuICAgICAgc3JjOiBcImh0dHBzOi8vY29ubmVjdC5mYWNlYm9vay5uZXQvZW5fR0Ivc2RrLmpzI3hmYm1sPTEmdmVyc2lvbj12MjEuMFwiXG4gICAgfVxuICApLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImZiLXZpZGVvXCIsIFwiZGF0YS1ocmVmXCI6IHRpbGUub3JpZ2luYWxfbGluaywgXCJkYXRhLXdpZHRoXCI6IFwiNTAwXCIsIFwiZGF0YS1zaG93LXRleHRcIjogXCJmYWxzZVwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiYmxvY2txdW90ZVwiLCB7IGNpdGU6IHRpbGUub3JpZ2luYWxfbGluaywgY2xhc3M6IFwiZmIteGZibWwtcGFyc2UtaWdub3JlXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgaHJlZjogdGlsZS5vcmlnaW5hbF9saW5rIH0pLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCksIFwiUG9zdGVkIGJ5IFwiLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImFcIiwgeyBocmVmOiBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tLyQke3RpbGUuc291cmNlX3VzZXJfaWR9YCB9LCB0aWxlLm5hbWUpLCBcIiBvblwiLCB0aWxlLnRpbWVfYWdvKSkpO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIiwgeyBsb2FkaW5nOiBcImxhenlcIiwgY2xhc3M6IFwidmlkZW8tY29udGVudFwiLCBmcmFtZWJvcmRlcjogXCIwXCIsIGFsbG93ZnVsbHNjcmVlbjogdHJ1ZSwgc3JjZG9jOiBlbWJlZEJsb2NrLmlubmVySFRNTCB9KTtcbn1cbmZ1bmN0aW9uIFZpZGVvRXJyb3JGYWxsYmFja1RlbXBsYXRlKHtcbiAgdGlsZSxcbiAgZGVmYXVsdEhpZGRlbiA9IHRydWVcbn0pIHtcbiAgY29uc3Qgb3JpZ2luYWxJbWFnZVVybCA9IHRpbGUub3JpZ2luYWxfaW1hZ2VfdXJsO1xuICBjb25zdCBmYWxsYmFja0NzcyA9IGB2aWRlby1mYWxsYmFjay1jb250ZW50JHtkZWZhdWx0SGlkZGVuID8gXCIgaGlkZGVuXCIgOiBcIlwifWA7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBmYWxsYmFja0NzcyB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImNlbnRlci1zZWN0aW9uXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJwbGF5LWljb25cIiB9KSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiYVwiLCB7IGhyZWY6IHRpbGUub3JpZ2luYWxfdXJsIHx8IHRpbGUub3JpZ2luYWxfbGluaywgdGFyZ2V0OiBcIl9ibGFua1wiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KEltYWdlVGVtcGxhdGUsIHsgaW1hZ2U6IG9yaWdpbmFsSW1hZ2VVcmwsIHRpbGUgfSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwicGxheS1pY29uXCIgfSkpKTtcbn1cbnZhciBpbml0X3RpbGVfdGVtcGxhdGUgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci90aWxlLnRlbXBsYXRlLnRzeFwiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfbGlicygpO1xuICAgIGluaXRfZW1iZWRfeW91dHViZV90ZW1wbGF0ZSgpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci9iYXNlLnRlbXBsYXRlLnRzeFxuZnVuY3Rpb24gRXhwYW5kZWRUaWxlcyhzZGsyKSB7XG4gIGNvbnN0IHRpbGVzID0gc2RrMi50aWxlcy50aWxlcztcbiAgY29uc3QgeyBzaG93X25hdiB9ID0gc2RrMi5nZXRFeHBhbmRlZFRpbGVDb25maWcoKTtcbiAgY29uc3QgbmF2aWdhdGlvbkFycm93c0VuYWJsZWQgPSBzaG93X25hdjtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiZXhwYW5kZWQtdGlsZS13cmFwcGVyXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3M6IFwiZXhpdFwiLCBocmVmOiBcIiNcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzczogXCJ3aWRnZXQtaWNvbiBjbG9zZS13aGl0ZVwiIH0pKSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoQmFja0Fycm93SWNvbiwgbnVsbCksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwic3dpcGVyIHN3aXBlci1leHBhbmRlZFwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwic3dpcGVyLXdyYXBwZXIgdWdjLXRpbGVzXCIgfSwgT2JqZWN0LnZhbHVlcyh0aWxlcykubWFwKCh0aWxlKSA9PiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcbiAgICBcImRpdlwiLFxuICAgIHtcbiAgICAgIGNsYXNzOiBcInVnYy10aWxlIHN3aXBlci1zbGlkZVwiLFxuICAgICAgXCJkYXRhLWlkXCI6IHRpbGUuaWQsXG4gICAgICBcImRhdGEteXQtaWRcIjogdGlsZS55b3V0dWJlX2lkIHx8IFwiXCIsXG4gICAgICBcImRhdGEtdGlrdG9rLWlkXCI6IHRpbGUudGlrdG9rX2lkIHx8IFwiXCJcbiAgICB9LFxuICAgIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KEV4cGFuZGVkVGlsZSwgeyBzZGs6IHNkazIsIHRpbGUgfSlcbiAgKSkpKSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBjbGFzczogXCJzd2lwZXItZXhwYW5kZWQtYnV0dG9uLXByZXYgc3dpcGVyLWJ1dHRvbi1wcmV2IGJ0bi1sZ1wiLFxuICAgICAgc3R5bGU6IHsgZGlzcGxheTogbmF2aWdhdGlvbkFycm93c0VuYWJsZWQgPyBcImZsZXhcIiA6IFwibm9uZVwiIH1cbiAgICB9LFxuICAgIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcImNoZXZyb24tbGVmdFwiLCBhbHQ6IFwiUHJldmlvdXMgYXJyb3dcIiB9KVxuICApLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcbiAgICBcImRpdlwiLFxuICAgIHtcbiAgICAgIGNsYXNzOiBcInN3aXBlci1leHBhbmRlZC1idXR0b24tbmV4dCBzd2lwZXItYnV0dG9uLW5leHQgYnRuLWxnXCIsXG4gICAgICBzdHlsZTogeyBkaXNwbGF5OiBuYXZpZ2F0aW9uQXJyb3dzRW5hYmxlZCA/IFwiZmxleFwiIDogXCJub25lXCIgfVxuICAgIH0sXG4gICAgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3M6IFwiY2hldnJvbi1yaWdodFwiLCBhbHQ6IFwiTmV4dCBhcnJvd1wiIH0pXG4gICkpO1xufVxuZnVuY3Rpb24gQmFja0Fycm93SWNvbigpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiYVwiLCB7IGNsYXNzOiBcImJhY2tcIiwgaHJlZjogXCIjXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3M6IFwid2lkZ2V0LWljb24gYmFjay1hcnJvd1wiIH0pKTtcbn1cbnZhciBpbml0X2Jhc2VfdGVtcGxhdGUgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci9iYXNlLnRlbXBsYXRlLnRzeFwiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfdGlsZV90ZW1wbGF0ZSgpO1xuICAgIGluaXRfbGlicygpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci9pbmRleC50c1xuZnVuY3Rpb24gbG9hZERlZmF1bHRFeHBhbmRlZFRpbGVUZW1wbGF0ZXMoYWRkRXhwYW5kZWRUaWxlVGVtcGxhdGVzKSB7XG4gIGlmIChhZGRFeHBhbmRlZFRpbGVUZW1wbGF0ZXMpIHtcbiAgICBzZGsuYWRkVGVtcGxhdGVUb0NvbXBvbmVudChFeHBhbmRlZFRpbGVzLCBcImV4cGFuZGVkLXRpbGVzXCIpO1xuICB9XG59XG5mdW5jdGlvbiBsb2FkV2lkZ2V0Rm9udHMoZGVmYXVsdEZvbnQpIHtcbiAgc2RrLmFkZFdpZGdldEN1c3RvbVN0eWxlcyhgIFxuICAgIEBpbXBvcnQgdXJsKCcke2RlZmF1bHRGb250fScpO1xuICBib2R5IHtcbiAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcbiAgfWApO1xufVxuZnVuY3Rpb24gbG9hZEV4cGFuZGVkVGlsZVRlbXBsYXRlcyhzZXR0aW5ncykge1xuICBsb2FkRGVmYXVsdEV4cGFuZGVkVGlsZVRlbXBsYXRlcyhzZXR0aW5ncy51c2VEZWZhdWx0RXhwYW5kZWRUaWxlVGVtcGxhdGVzKTtcbiAgbG9hZFdpZGdldEZvbnRzKHNldHRpbmdzLmRlZmF1bHRGb250KTtcbiAgaWYgKHNldHRpbmdzLnVzZURlZmF1bHRTd2lwZXJTdHlsZXMpIHtcbiAgICBsb2FkU3dpcGVyU3R5bGVzKCk7XG4gIH1cbn1cbnZhciBpbml0X2V4cGFuZGVkX3RpbGVfc3dpcGVyID0gX19lc20oe1xuICBcInNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2Jhc2VfdGVtcGxhdGUoKTtcbiAgICBpbml0X3N3aXBlcjIoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2NvbXBvbmVudHMvbG9hZC1tb3JlL2xvYWQtbW9yZS50ZW1wbGF0ZS50c3hcbmZ1bmN0aW9uIExvYWRNb3JlVGVtcGxhdGUoKSB7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcImJ1dHRvbnNcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImFcIiwgeyBpZDogXCJsb2FkLW1vcmVcIiB9LCBcIkxPQUQgTU9SRVwiKSk7XG59XG52YXIgaW5pdF9sb2FkX21vcmVfdGVtcGxhdGUgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY29tcG9uZW50cy9sb2FkLW1vcmUvbG9hZC1tb3JlLnRlbXBsYXRlLnRzeFwiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfbGlicygpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvY29tcG9uZW50cy9sb2FkLW1vcmUvbG9hZC1tb3JlLmNvbXBvbmVudC50c1xudmFyIExvYWRNb3JlQ29tcG9uZW50O1xudmFyIGluaXRfbG9hZF9tb3JlX2NvbXBvbmVudCA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jb21wb25lbnRzL2xvYWQtbW9yZS9sb2FkLW1vcmUuY29tcG9uZW50LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9sb2FkX21vcmVfdGVtcGxhdGUoKTtcbiAgICBMb2FkTW9yZUNvbXBvbmVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICB9XG4gICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChMb2FkTW9yZVRlbXBsYXRlKCkpO1xuICAgICAgfVxuICAgICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwibG9hZC1tb3JlXCIsIExvYWRNb3JlQ29tcG9uZW50KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9jb21wb25lbnRzL2xvYWQtbW9yZS9pbmRleC50c1xudmFyIGxvYWRfbW9yZV9leHBvcnRzID0ge307XG5fX2V4cG9ydChsb2FkX21vcmVfZXhwb3J0cywge1xuICBkZWZhdWx0OiAoKSA9PiBsb2FkX21vcmVfZGVmYXVsdFxufSk7XG52YXIgbG9hZF9tb3JlX2RlZmF1bHQ7XG52YXIgaW5pdF9sb2FkX21vcmUgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY29tcG9uZW50cy9sb2FkLW1vcmUvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2xvYWRfbW9yZV9jb21wb25lbnQoKTtcbiAgICBsb2FkX21vcmVfZGVmYXVsdCA9IExvYWRNb3JlQ29tcG9uZW50O1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvY29tcG9uZW50cy9pbmRleC50c1xudmFyIGluaXRfY29tcG9uZW50cyA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jb21wb25lbnRzL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9leHBhbmRlZF90aWxlX3N3aXBlcigpO1xuICAgIGluaXRfbG9hZF9tb3JlKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9pbmRleC50c1xudmFyIGluaXRfbGlicyA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfY3NzX3ZhcmlhYmxlcygpO1xuICAgIGluaXRfanN4X2h0bWwoKTtcbiAgICBpbml0X3RpbGVfbGliKCk7XG4gICAgaW5pdF93aWRnZXRfY29tcG9uZW50cygpO1xuICAgIGluaXRfd2lkZ2V0X2ZlYXR1cmVzKCk7XG4gICAgaW5pdF93aWRnZXRfbGF5b3V0KCk7XG4gICAgaW5pdF93aWRnZXRfdXRpbHMoKTtcbiAgICBpbml0X2V4dGVuc2lvbnMoKTtcbiAgICBpbml0X2NvbXBvbmVudHMoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9ldmVudHMvaW5kZXgudHNcbmZ1bmN0aW9uIGxvYWRMaXN0ZW5lcnMoc2V0dGluZ3MpIHtcbiAgY29uc3Qge1xuICAgIG9uTG9hZDogb25Mb2FkMixcbiAgICBvbkV4cGFuZFRpbGUsXG4gICAgb25UaWxlQ2xvc2UsXG4gICAgb25UaWxlUmVuZGVyZWQ6IG9uVGlsZVJlbmRlcmVkMixcbiAgICBvbkNyb3NzU2VsbGVyc1JlbmRlcmVkLFxuICAgIG9uVGlsZXNVcGRhdGVkLFxuICAgIG9uV2lkZ2V0SW5pdENvbXBsZXRlLFxuICAgIG9uVGlsZUJnSW1nUmVuZGVyQ29tcGxldGUsXG4gICAgb25UaWxlQmdJbWFnZUVycm9yLFxuICAgIG9uUmVzaXplOiBvblJlc2l6ZTIsXG4gICAgb25Mb2FkTW9yZSxcbiAgICBvblByb2R1Y3RBY3Rpb25DbGljayxcbiAgICBvbkV4cGFuZGVkVGlsZUltYWdlTG9hZCxcbiAgICBvbkV4cGFuZGVkVGlsZU9wZW4sXG4gICAgb25FeHBhbmRlZFRpbGVDbG9zZSxcbiAgICBvbkJlZm9yZUV4cGFuZGVkVGlsZUltYWdlUmVzaXplLFxuICAgIG9uQmVmb3JlRXhwYW5kZWRUaWxlQ2xvc2UsXG4gICAgb25CZWZvcmVFeHBhbmRlZFRpbGVPcGVuLFxuICAgIG9uU2hvcHNwb3RGbHlvdXRFeHBhbmQsXG4gICAgb25TaG9wc3BvdFRvZ2dsZSxcbiAgICBvblNob3BzcG90T3BlbixcbiAgICBvblNob3BzcG90QWN0aW9uQ2xpY2ssXG4gICAgb25Vc2VyQ2xpY2ssXG4gICAgb25TaGFyZUNsaWNrLFxuICAgIG9uSW1wcmVzc2lvbixcbiAgICBvbkxpa2UsXG4gICAgb25EaXNsaWtlLFxuICAgIG9uSG92ZXIsXG4gICAgb25Qcm9kdWN0Q2xpY2ssXG4gICAgb25Qcm9kdWN0UGluQ2xpY2ssXG4gICAgb25Qcm9kdWN0VXNlckNsaWNrLFxuICAgIG9uU2hvcHNwb3RGbHlvdXQsXG4gICAgb25UaWxlTWV0YWRhdGFMb2FkZWQsXG4gICAgb25UaWxlRGF0YVNldCxcbiAgICBvbkh0bWxSZW5kZXJlZCxcbiAgICBvbkpzUmVuZGVyZWQsXG4gICAgb25HbG9iYWxzTG9hZGVkLFxuICAgIG9uUHJvZHVjdFBhZ2VMb2FkZWQsXG4gICAgb25Qcm9kdWN0c1VwZGF0ZWQsXG4gICAgb25BZGRUb0NhcnRGYWlsZWQsXG4gICAgb25FbWFpbFRpbGVMb2FkLFxuICAgIG9uRW1haWxUaWxlQ2xpY2ssXG4gICAgb25MaWtlQ2xpY2ssXG4gICAgb25EaXNsaWtlQ2xpY2ssXG4gICAgb25UaWxlRXhwYW5kUHJvZHVjdFJlY3NSZW5kZXJlZCxcbiAgICBvblRpbGVFeHBhbmRDcm9zc1NlbGxlcnNSZW5kZXJlZCxcbiAgICBvblNoYXJlTWVudU9wZW5lZCxcbiAgICBvblNoYXJlTWVudUNsb3NlZFxuICB9ID0gc2V0dGluZ3MuY2FsbGJhY2tzO1xuICBvbkxvYWQyPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfTE9BRCwgZXZlbnQyKSk7XG4gIG9uRXhwYW5kVGlsZT8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVfRVhQQU5EX1JFTkRFUkVELCBldmVudDIpKTtcbiAgb25UaWxlQ2xvc2U/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihcIm9uVGlsZUNsb3NlXCIsIGV2ZW50MikpO1xuICBvblRpbGVSZW5kZXJlZDI/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJUaWxlRXhwYW5kTGlzdGVuZXIoZXZlbnQyKSk7XG4gIG9uQ3Jvc3NTZWxsZXJzUmVuZGVyZWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihcImNyb3NzU2VsbGVyc1JlbmRlcmVkXCIsIGV2ZW50MikpO1xuICBvbldpZGdldEluaXRDb21wbGV0ZT8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKFwid2lkZ2V0SW5pdFwiLCBldmVudDIpKTtcbiAgb25UaWxlQmdJbWdSZW5kZXJDb21wbGV0ZT8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVfQkdfSU1HX1JFTkRFUl9DT01QTEVURSwgZXZlbnQyKSk7XG4gIG9uVGlsZUJnSW1hZ2VFcnJvcj8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVfQkdfSU1HX0VSUk9SLCBldmVudDIpKTtcbiAgb25SZXNpemUyPy5mb3JFYWNoKChldmVudDIpID0+IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGV2ZW50MikpO1xuICBvblRpbGVzVXBkYXRlZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVTX1VQREFURUQsIGV2ZW50MikpO1xuICBvbkxvYWRNb3JlPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoXCJsb2FkTW9yZVwiLCBldmVudDIpKTtcbiAgb25Qcm9kdWN0QWN0aW9uQ2xpY2s/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihQUk9EVUNUX0FDVElPTl9DTElDSywgZXZlbnQyKSk7XG4gIG9uRXhwYW5kZWRUaWxlSW1hZ2VMb2FkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVhQQU5ERURfVElMRV9JTUFHRV9MT0FELCBldmVudDIpKTtcbiAgb25FeHBhbmRlZFRpbGVPcGVuPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVhQQU5ERURfVElMRV9PUEVOLCBldmVudDIpKTtcbiAgb25FeHBhbmRlZFRpbGVDbG9zZT8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVYUEFOREVEX1RJTEVfQ0xPU0UsIGV2ZW50MikpO1xuICBvbkJlZm9yZUV4cGFuZGVkVGlsZUltYWdlUmVzaXplPy5mb3JFYWNoKFxuICAgIChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoQkVGT1JFX0VYUEFOREVEX1RJTEVfSU1BR0VfUkVTSVpFLCBldmVudDIpXG4gICk7XG4gIG9uQmVmb3JlRXhwYW5kZWRUaWxlQ2xvc2U/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihCRUZPUkVfRVhQQU5ERURfVElMRV9DTE9TRSwgZXZlbnQyKSk7XG4gIG9uQmVmb3JlRXhwYW5kZWRUaWxlT3Blbj8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEJFRk9SRV9FWFBBTkRFRF9USUxFX09QRU4sIGV2ZW50MikpO1xuICBvblNob3BzcG90Rmx5b3V0RXhwYW5kPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoU0hPUFNQT1RfRkxZT1VUX0VYUEFORCwgZXZlbnQyKSk7XG4gIG9uU2hvcHNwb3RUb2dnbGU/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihTSE9QU1BPVF9UT0dHTEUsIGV2ZW50MikpO1xuICBvblNob3BzcG90T3Blbj8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKFNIT1BTUE9UX09QRU4sIGV2ZW50MikpO1xuICBvblNob3BzcG90QWN0aW9uQ2xpY2s/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihTSE9QU1BPVF9BQ1RJT05fQ0xJQ0ssIGV2ZW50MikpO1xuICBvblVzZXJDbGljaz8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKFVTRVJfQ0xJQ0ssIGV2ZW50MikpO1xuICBvblNoYXJlQ2xpY2s/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9TSEFSRV9DTElDSywgZXZlbnQyKSk7XG4gIG9uSW1wcmVzc2lvbj8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX0lNUFJFU1NJT04sIGV2ZW50MikpO1xuICBvbkxpa2U/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9MSUtFLCBldmVudDIpKTtcbiAgb25EaXNsaWtlPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfRElTTElLRSwgZXZlbnQyKSk7XG4gIG9uSG92ZXI/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9IT1ZFUiwgZXZlbnQyKSk7XG4gIG9uUHJvZHVjdENsaWNrPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfUFJPRFVDVF9DTElDSywgZXZlbnQyKSk7XG4gIG9uUHJvZHVjdFBpbkNsaWNrPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfUFJPRFVDVF9QSU5DTElDSywgZXZlbnQyKSk7XG4gIG9uUHJvZHVjdFVzZXJDbGljaz8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1BST0RVQ1RfVVNFUl9DTElDSywgZXZlbnQyKSk7XG4gIG9uU2hvcHNwb3RGbHlvdXQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9TSE9QU1BPVF9GTFlPVVQsIGV2ZW50MikpO1xuICBvblRpbGVNZXRhZGF0YUxvYWRlZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVfTUVUQURBVEFfTE9BREVELCBldmVudDIpKTtcbiAgb25UaWxlRGF0YVNldD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVfREFUQV9TRVQsIGV2ZW50MikpO1xuICBvbkh0bWxSZW5kZXJlZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX0hUTUxfUkVOREVSRUQsIGV2ZW50MikpO1xuICBvbkpzUmVuZGVyZWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9KU19SRU5ERVJFRCwgZXZlbnQyKSk7XG4gIG9uR2xvYmFsc0xvYWRlZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX0dMT0JBTFNfTE9BREVELCBldmVudDIpKTtcbiAgb25Qcm9kdWN0UGFnZUxvYWRlZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1BST0RVQ1RfUEFHRV9MT0FERUQsIGV2ZW50MikpO1xuICBvblByb2R1Y3RzVXBkYXRlZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1BST0RVQ1RTX1VQREFURUQsIGV2ZW50MikpO1xuICBvbkFkZFRvQ2FydEZhaWxlZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX0FERF9UT19DQVJUX0ZBSUxFRCwgZXZlbnQyKSk7XG4gIG9uRW1haWxUaWxlTG9hZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVNQUlMX1RJTEVfTE9BRCwgZXZlbnQyKSk7XG4gIG9uRW1haWxUaWxlQ2xpY2s/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFTUFJTF9USUxFX0NMSUNLLCBldmVudDIpKTtcbiAgb25MaWtlQ2xpY2s/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihMSUtFX0NMSUNLLCBldmVudDIpKTtcbiAgb25EaXNsaWtlQ2xpY2s/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihESVNMSUtFX0NMSUNLLCBldmVudDIpKTtcbiAgb25UaWxlRXhwYW5kUHJvZHVjdFJlY3NSZW5kZXJlZD8uZm9yRWFjaChcbiAgICAoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVfRVhQQU5EX1BST0RfUkVDU19SRU5ERVJFRCwgZXZlbnQyKVxuICApO1xuICBvblRpbGVFeHBhbmRDcm9zc1NlbGxlcnNSZW5kZXJlZD8uZm9yRWFjaChcbiAgICAoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVfRVhQQU5EX0NST1NTX1NFTExFUlNfUkVOREVSRUQsIGV2ZW50MilcbiAgKTtcbiAgb25TaGFyZU1lbnVPcGVuZWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9TSEFSRV9NRU5VX09QRU5FRCwgZXZlbnQyKSk7XG4gIG9uU2hhcmVNZW51Q2xvc2VkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfU0hBUkVfTUVOVV9DTE9TRUQsIGV2ZW50MikpO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0Q2xpY2tFdmVudHMoKSB7XG4gIGNvbnN0IHRpbGVzID0gc2RrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudWdjLXRpbGVcIik7XG4gIGlmICghdGlsZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCB0aWxlcyBVSSBlbGVtZW50XCIpO1xuICB9XG4gIHRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICBjb25zdCB0aWxlRGF0YUlkID0gdGlsZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgIGlmICghdGlsZURhdGFJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgdGlsZSBkYXRhIElEXCIpO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBzZGsudGlsZXMuZ2V0VGlsZSh0aWxlRGF0YUlkKT8ub3JpZ2luYWxfdXJsO1xuICAgIGlmICghdXJsKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJGYWlsZWQgdG8gZmluZCB0aWxlIFVSTFwiLCB0aWxlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGlsZS5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgIGhhbmRsZVRpbGVDbGljayhlLCB1cmwpO1xuICAgIH07XG4gIH0pO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJUaWxlRXhwYW5kTGlzdGVuZXIoZm4gPSAoKSA9PiB7XG59KSB7XG4gIHNkay5hZGRFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVfRVhQQU5ELCAoZXZlbnQyKSA9PiB7XG4gICAgY29uc3QgY3VzdG9tRXZlbnQgPSBldmVudDI7XG4gICAgY29uc3QgdGlsZUlkID0gY3VzdG9tRXZlbnQuZGV0YWlsLmRhdGEudGlsZUlkO1xuICAgIGZuKHRpbGVJZCk7XG4gIH0pO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJDcm9zc1NlbGxlcnNMb2FkTGlzdGVuZXIoZm4gPSAoKSA9PiB7XG59KSB7XG4gIHNkay5hZGRFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVfRVhQQU5EX0NST1NTX1NFTExFUlNfUkVOREVSRUQsIChldmVudDIpID0+IHtcbiAgICBjb25zdCBjdXN0b21FdmVudCA9IGV2ZW50MjtcbiAgICBjb25zdCB0aWxlSWQgPSBjdXN0b21FdmVudC5kZXRhaWwuZGF0YTtcbiAgICBjb25zdCB0YXJnZXQgPSBjdXN0b21FdmVudC5kZXRhaWwudGFyZ2V0O1xuICAgIGZuKHRpbGVJZCwgdGFyZ2V0KTtcbiAgfSk7XG59XG5mdW5jdGlvbiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZm4pIHtcbiAgc2RrLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmbik7XG59XG5mdW5jdGlvbiByZWdpc3RlclNoYXJlTWVudU9wZW5lZExpc3RlbmVyKGZuID0gKCkgPT4ge1xufSkge1xuICBzZGsuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVF9TSEFSRV9NRU5VX09QRU5FRCwgKGV2ZW50MikgPT4ge1xuICAgIGNvbnN0IGN1c3RvbUV2ZW50ID0gZXZlbnQyO1xuICAgIGNvbnN0IHNvdXJjZUlkID0gY3VzdG9tRXZlbnQuZGV0YWlsLnNvdXJjZUlkO1xuICAgIGZuKHNvdXJjZUlkKTtcbiAgfSk7XG59XG5mdW5jdGlvbiByZWdpc3RlclNoYXJlTWVudUNsb3NlZExpc3RlbmVyKGZuID0gKCkgPT4ge1xufSkge1xuICBzZGsuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVF9TSEFSRV9NRU5VX0NMT1NFRCwgKGV2ZW50MikgPT4ge1xuICAgIGNvbnN0IGN1c3RvbUV2ZW50ID0gZXZlbnQyO1xuICAgIGNvbnN0IHNvdXJjZUlkID0gY3VzdG9tRXZlbnQuZGV0YWlsLnNvdXJjZUlkO1xuICAgIGZuKHNvdXJjZUlkKTtcbiAgfSk7XG59XG52YXIgUFJPRFVDVF9BQ1RJT05fQ0xJQ0ssIEVYUEFOREVEX1RJTEVfSU1BR0VfTE9BRCwgRVhQQU5ERURfVElMRV9PUEVOLCBFWFBBTkRFRF9USUxFX0NMT1NFLCBCRUZPUkVfRVhQQU5ERURfVElMRV9JTUFHRV9SRVNJWkUsIEVYUEFOREVEX1RJTEVfSU1BR0VfUkVTSVpFLCBCRUZPUkVfRVhQQU5ERURfVElMRV9DTE9TRSwgQkVGT1JFX0VYUEFOREVEX1RJTEVfT1BFTiwgU0hPUFNQT1RfRkxZT1VUX0VYUEFORCwgU0hPUFNQT1RfVE9HR0xFLCBTSE9QU1BPVF9PUEVOLCBTSE9QU1BPVF9BQ1RJT05fQ0xJQ0ssIFVTRVJfQ0xJQ0ssIEVWRU5UX0lNUFJFU1NJT04sIEVWRU5UX0xPQUQsIEVWRU5UX0xPQURfTU9SRSwgRVZFTlRfTElLRSwgRVZFTlRfRElTTElLRSwgRVZFTlRfSE9WRVIsIEVWRU5UX1BST0RVQ1RfQ0xJQ0ssIEVWRU5UX1BST0RVQ1RfUElOQ0xJQ0ssIEVWRU5UX1RJTEVfRVhQQU5ELCBFVkVOVF9QUk9EVUNUX1VTRVJfQ0xJQ0ssIEVWRU5UX1NIQVJFX0NMSUNLLCBFVkVOVF9TSE9QU1BPVF9GTFlPVVQsIEVWRU5UX1RJTEVfTUVUQURBVEFfTE9BREVELCBFVkVOVF9USUxFX0RBVEFfU0VULCBFVkVOVF9IVE1MX1JFTkRFUkVELCBFVkVOVF9KU19SRU5ERVJFRCwgRVZFTlRfR0xPQkFMU19MT0FERUQsIENST1NTX1NFTExFUlNfTE9BREVELCBFVkVOVF9QUk9EVUNUX1BBR0VfTE9BREVELCBFVkVOVF9QUk9EVUNUU19VUERBVEVELCBFVkVOVF9BRERfVE9fQ0FSVF9GQUlMRUQsIEVWRU5UX1RJTEVTX1VQREFURUQsIFdJREdFVF9JTklUX0NPTVBMRVRFLCBFTUFJTF9USUxFX0xPQUQsIEVNQUlMX1RJTEVfQ0xJQ0ssIExJS0VfQ0xJQ0ssIERJU0xJS0VfQ0xJQ0ssIEVWRU5UX1RJTEVfRVhQQU5EX1JFTkRFUkVELCBFVkVOVF9USUxFX0VYUEFORF9QUk9EX1JFQ1NfUkVOREVSRUQsIEVWRU5UX1RJTEVfRVhQQU5EX0NST1NTX1NFTExFUlNfUkVOREVSRUQsIEVWRU5UX1RJTEVfQkdfSU1HX0VSUk9SLCBFVkVOVF9USUxFX0JHX0lNR19SRU5ERVJfQ09NUExFVEUsIEVWRU5UX1NIQVJFX01FTlVfT1BFTkVELCBFVkVOVF9TSEFSRV9NRU5VX0NMT1NFRCwgYWxsRXZlbnRzLCBjYWxsYmFja0RlZmF1bHRzO1xudmFyIGluaXRfZXZlbnRzID0gX19lc20oe1xuICBcInNyYy9ldmVudHMvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2xpYnMoKTtcbiAgICBQUk9EVUNUX0FDVElPTl9DTElDSyA9IFwicHJvZHVjdEFjdGlvbkNsaWNrXCI7XG4gICAgRVhQQU5ERURfVElMRV9JTUFHRV9MT0FEID0gXCJleHBhbmRlZFRpbGVJbWFnZUxvYWRcIjtcbiAgICBFWFBBTkRFRF9USUxFX09QRU4gPSBcImV4cGFuZGVkVGlsZU9wZW5cIjtcbiAgICBFWFBBTkRFRF9USUxFX0NMT1NFID0gXCJleHBhbmRlZFRpbGVDbG9zZVwiO1xuICAgIEJFRk9SRV9FWFBBTkRFRF9USUxFX0lNQUdFX1JFU0laRSA9IFwiYmVmb3JlRXhwYW5kZWRUaWxlSW1hZ2VSZXNpemVcIjtcbiAgICBFWFBBTkRFRF9USUxFX0lNQUdFX1JFU0laRSA9IFwiZXhwYW5kZWRUaWxlSW1hZ2VSZXNpemVcIjtcbiAgICBCRUZPUkVfRVhQQU5ERURfVElMRV9DTE9TRSA9IFwiYmVmb3JlRXhwYW5kZWRUaWxlQ2xvc2VcIjtcbiAgICBCRUZPUkVfRVhQQU5ERURfVElMRV9PUEVOID0gXCJiZWZvcmVFeHBhbmRlZFRpbGVPcGVuXCI7XG4gICAgU0hPUFNQT1RfRkxZT1VUX0VYUEFORCA9IFwic2hvcHNwb3RGbHlvdXRFeHBhbmRcIjtcbiAgICBTSE9QU1BPVF9UT0dHTEUgPSBcInNob3BzcG90VG9nZ2xlXCI7XG4gICAgU0hPUFNQT1RfT1BFTiA9IFwic2hvcHNwb3RPcGVuXCI7XG4gICAgU0hPUFNQT1RfQUNUSU9OX0NMSUNLID0gXCJzaG9wc3BvdEFjdGlvbkNsaWNrXCI7XG4gICAgVVNFUl9DTElDSyA9IFwidXNlckNsaWNrXCI7XG4gICAgRVZFTlRfSU1QUkVTU0lPTiA9IFwiaW1wcmVzc2lvblwiO1xuICAgIEVWRU5UX0xPQUQgPSBcImxvYWRcIjtcbiAgICBFVkVOVF9MT0FEX01PUkUgPSBcIm1vcmVMb2FkXCI7XG4gICAgRVZFTlRfTElLRSA9IFwibGlrZVwiO1xuICAgIEVWRU5UX0RJU0xJS0UgPSBcImRpc2xpa2VcIjtcbiAgICBFVkVOVF9IT1ZFUiA9IFwidGlsZUhvdmVyXCI7XG4gICAgRVZFTlRfUFJPRFVDVF9DTElDSyA9IFwicHJvZHVjdENsaWNrXCI7XG4gICAgRVZFTlRfUFJPRFVDVF9QSU5DTElDSyA9IFwicGluQ2xpY2tcIjtcbiAgICBFVkVOVF9USUxFX0VYUEFORCA9IFwidGlsZUV4cGFuZFwiO1xuICAgIEVWRU5UX1BST0RVQ1RfVVNFUl9DTElDSyA9IFwidXNlckNsaWNrXCI7XG4gICAgRVZFTlRfU0hBUkVfQ0xJQ0sgPSBcInNoYXJlQ2xpY2tcIjtcbiAgICBFVkVOVF9TSE9QU1BPVF9GTFlPVVQgPSBcInNob3BzcG90Rmx5b3V0XCI7XG4gICAgRVZFTlRfVElMRV9NRVRBREFUQV9MT0FERUQgPSBcInRpbGVNZXRhZGF0YUxvYWRlZFwiO1xuICAgIEVWRU5UX1RJTEVfREFUQV9TRVQgPSBcInRpbGVEYXRhU2V0XCI7XG4gICAgRVZFTlRfSFRNTF9SRU5ERVJFRCA9IFwiaHRtbFJlbmRlcmVkXCI7XG4gICAgRVZFTlRfSlNfUkVOREVSRUQgPSBcImpzUmVuZGVyZWRcIjtcbiAgICBFVkVOVF9HTE9CQUxTX0xPQURFRCA9IFwiZ2xvYmFsc0xvYWRlZFwiO1xuICAgIENST1NTX1NFTExFUlNfTE9BREVEID0gXCJjcm9zc1NlbGxlcnNMb2FkZWRcIjtcbiAgICBFVkVOVF9QUk9EVUNUX1BBR0VfTE9BREVEID0gXCJwcm9kdWN0UGFnZUxvYWRlZFwiO1xuICAgIEVWRU5UX1BST0RVQ1RTX1VQREFURUQgPSBcInByb2R1Y3RzVXBkYXRlZFwiO1xuICAgIEVWRU5UX0FERF9UT19DQVJUX0ZBSUxFRCA9IFwiYWRkVG9DYXJ0RmFpbGVkXCI7XG4gICAgRVZFTlRfVElMRVNfVVBEQVRFRCA9IFwidGlsZXNVcGRhdGVkXCI7XG4gICAgV0lER0VUX0lOSVRfQ09NUExFVEUgPSBcIndpZGdldEluaXRDb21wbGV0ZVwiO1xuICAgIEVNQUlMX1RJTEVfTE9BRCA9IFwiZW1haWxUaWxlTG9hZFwiO1xuICAgIEVNQUlMX1RJTEVfQ0xJQ0sgPSBcImVtYWlsVGlsZUNsaWNrXCI7XG4gICAgTElLRV9DTElDSyA9IFwibGlrZUNsaWNrXCI7XG4gICAgRElTTElLRV9DTElDSyA9IFwiZGlzbGlrZUNsaWNrXCI7XG4gICAgRVZFTlRfVElMRV9FWFBBTkRfUkVOREVSRUQgPSBcImV4cGFuZGVkVGlsZVJlbmRlcmVkXCI7XG4gICAgRVZFTlRfVElMRV9FWFBBTkRfUFJPRF9SRUNTX1JFTkRFUkVEID0gXCJ0aWxlRXhwYW5kUHJvZHVjdFJlY3NSZW5kZXJlZFwiO1xuICAgIEVWRU5UX1RJTEVfRVhQQU5EX0NST1NTX1NFTExFUlNfUkVOREVSRUQgPSBcInRpbGVFeHBhbmRDcm9zc1NlbGxlcnNSZW5kZXJlZFwiO1xuICAgIEVWRU5UX1RJTEVfQkdfSU1HX0VSUk9SID0gXCJ0aWxlQmdJbWFnZUVycm9yXCI7XG4gICAgRVZFTlRfVElMRV9CR19JTUdfUkVOREVSX0NPTVBMRVRFID0gXCJ0aWxlQmdJbWdSZW5kZXJDb21wbGV0ZVwiO1xuICAgIEVWRU5UX1NIQVJFX01FTlVfT1BFTkVEID0gXCJzaGFyZU1lbnVPcGVuZWRcIjtcbiAgICBFVkVOVF9TSEFSRV9NRU5VX0NMT1NFRCA9IFwic2hhcmVNZW51Q2xvc2VkXCI7XG4gICAgYWxsRXZlbnRzID0gW1xuICAgICAgUFJPRFVDVF9BQ1RJT05fQ0xJQ0ssXG4gICAgICBFWFBBTkRFRF9USUxFX0lNQUdFX0xPQUQsXG4gICAgICBFWFBBTkRFRF9USUxFX09QRU4sXG4gICAgICBFWFBBTkRFRF9USUxFX0NMT1NFLFxuICAgICAgQkVGT1JFX0VYUEFOREVEX1RJTEVfSU1BR0VfUkVTSVpFLFxuICAgICAgRVhQQU5ERURfVElMRV9JTUFHRV9SRVNJWkUsXG4gICAgICBCRUZPUkVfRVhQQU5ERURfVElMRV9DTE9TRSxcbiAgICAgIEJFRk9SRV9FWFBBTkRFRF9USUxFX09QRU4sXG4gICAgICBTSE9QU1BPVF9GTFlPVVRfRVhQQU5ELFxuICAgICAgU0hPUFNQT1RfVE9HR0xFLFxuICAgICAgU0hPUFNQT1RfT1BFTixcbiAgICAgIFNIT1BTUE9UX0FDVElPTl9DTElDSyxcbiAgICAgIFVTRVJfQ0xJQ0ssXG4gICAgICBFVkVOVF9JTVBSRVNTSU9OLFxuICAgICAgRVZFTlRfTE9BRCxcbiAgICAgIEVWRU5UX0xPQURfTU9SRSxcbiAgICAgIEVWRU5UX0xJS0UsXG4gICAgICBFVkVOVF9ESVNMSUtFLFxuICAgICAgRVZFTlRfSE9WRVIsXG4gICAgICBFVkVOVF9QUk9EVUNUX0NMSUNLLFxuICAgICAgRVZFTlRfUFJPRFVDVF9QSU5DTElDSyxcbiAgICAgIEVWRU5UX1RJTEVfRVhQQU5ELFxuICAgICAgRVZFTlRfUFJPRFVDVF9VU0VSX0NMSUNLLFxuICAgICAgRVZFTlRfU0hBUkVfQ0xJQ0ssXG4gICAgICBFVkVOVF9TSE9QU1BPVF9GTFlPVVQsXG4gICAgICBFVkVOVF9USUxFX01FVEFEQVRBX0xPQURFRCxcbiAgICAgIEVWRU5UX1RJTEVfREFUQV9TRVQsXG4gICAgICBFVkVOVF9IVE1MX1JFTkRFUkVELFxuICAgICAgRVZFTlRfSlNfUkVOREVSRUQsXG4gICAgICBFVkVOVF9HTE9CQUxTX0xPQURFRCxcbiAgICAgIENST1NTX1NFTExFUlNfTE9BREVELFxuICAgICAgRVZFTlRfUFJPRFVDVF9QQUdFX0xPQURFRCxcbiAgICAgIEVWRU5UX1BST0RVQ1RTX1VQREFURUQsXG4gICAgICBFVkVOVF9BRERfVE9fQ0FSVF9GQUlMRUQsXG4gICAgICBFVkVOVF9USUxFU19VUERBVEVELFxuICAgICAgV0lER0VUX0lOSVRfQ09NUExFVEUsXG4gICAgICBFTUFJTF9USUxFX0xPQUQsXG4gICAgICBFTUFJTF9USUxFX0NMSUNLLFxuICAgICAgTElLRV9DTElDSyxcbiAgICAgIERJU0xJS0VfQ0xJQ0ssXG4gICAgICBFVkVOVF9USUxFX0VYUEFORF9SRU5ERVJFRCxcbiAgICAgIEVWRU5UX1RJTEVfRVhQQU5EX1BST0RfUkVDU19SRU5ERVJFRCxcbiAgICAgIEVWRU5UX1RJTEVfRVhQQU5EX0NST1NTX1NFTExFUlNfUkVOREVSRUQsXG4gICAgICBFVkVOVF9USUxFX0JHX0lNR19FUlJPUixcbiAgICAgIEVWRU5UX1RJTEVfQkdfSU1HX1JFTkRFUl9DT01QTEVURSxcbiAgICAgIEVWRU5UX1NIQVJFX01FTlVfT1BFTkVELFxuICAgICAgRVZFTlRfU0hBUkVfTUVOVV9DTE9TRURcbiAgICBdO1xuICAgIGNhbGxiYWNrRGVmYXVsdHMgPSB7XG4gICAgICBvblJlc2l6ZTogW10sXG4gICAgICBvbkxvYWQ6IFtdLFxuICAgICAgb25FeHBhbmRUaWxlOiBbXSxcbiAgICAgIG9uVGlsZUNsb3NlOiBbXSxcbiAgICAgIG9uVGlsZVJlbmRlcmVkOiBbXSxcbiAgICAgIG9uVGlsZXNVcGRhdGVkOiBbXSxcbiAgICAgIG9uQ3Jvc3NTZWxsZXJzUmVuZGVyZWQ6IFtdLFxuICAgICAgb25XaWRnZXRJbml0Q29tcGxldGU6IFtdLFxuICAgICAgb25UaWxlQmdJbWdSZW5kZXJDb21wbGV0ZTogW10sXG4gICAgICBvblRpbGVCZ0ltYWdlRXJyb3I6IFtdLFxuICAgICAgb25Qcm9kdWN0QWN0aW9uQ2xpY2s6IFtdLFxuICAgICAgb25FeHBhbmRlZFRpbGVJbWFnZUxvYWQ6IFtdLFxuICAgICAgb25FeHBhbmRlZFRpbGVPcGVuOiBbXSxcbiAgICAgIG9uRXhwYW5kZWRUaWxlQ2xvc2U6IFtdLFxuICAgICAgb25CZWZvcmVFeHBhbmRlZFRpbGVJbWFnZVJlc2l6ZTogW10sXG4gICAgICBvbkJlZm9yZUV4cGFuZGVkVGlsZUNsb3NlOiBbXSxcbiAgICAgIG9uQmVmb3JlRXhwYW5kZWRUaWxlT3BlbjogW10sXG4gICAgICBvblNob3BzcG90Rmx5b3V0RXhwYW5kOiBbXSxcbiAgICAgIG9uU2hvcHNwb3RUb2dnbGU6IFtdLFxuICAgICAgb25TaG9wc3BvdE9wZW46IFtdLFxuICAgICAgb25TaG9wc3BvdEFjdGlvbkNsaWNrOiBbXSxcbiAgICAgIG9uVXNlckNsaWNrOiBbXSxcbiAgICAgIG9uU2hhcmVDbGljazogW10sXG4gICAgICBvbkltcHJlc3Npb246IFtdLFxuICAgICAgb25Mb2FkTW9yZTogW10sXG4gICAgICBvbkxpa2U6IFtdLFxuICAgICAgb25EaXNsaWtlOiBbXSxcbiAgICAgIG9uSG92ZXI6IFtdLFxuICAgICAgb25Qcm9kdWN0Q2xpY2s6IFtdLFxuICAgICAgb25Qcm9kdWN0UGluQ2xpY2s6IFtdLFxuICAgICAgb25Qcm9kdWN0VXNlckNsaWNrOiBbXSxcbiAgICAgIG9uU2hvcHNwb3RGbHlvdXQ6IFtdLFxuICAgICAgb25UaWxlTWV0YWRhdGFMb2FkZWQ6IFtdLFxuICAgICAgb25UaWxlRGF0YVNldDogW10sXG4gICAgICBvbkh0bWxSZW5kZXJlZDogW10sXG4gICAgICBvbkpzUmVuZGVyZWQ6IFtdLFxuICAgICAgb25HbG9iYWxzTG9hZGVkOiBbXSxcbiAgICAgIG9uUHJvZHVjdFBhZ2VMb2FkZWQ6IFtdLFxuICAgICAgb25Qcm9kdWN0c1VwZGF0ZWQ6IFtdLFxuICAgICAgb25BZGRUb0NhcnRGYWlsZWQ6IFtdLFxuICAgICAgb25FbWFpbFRpbGVMb2FkOiBbXSxcbiAgICAgIG9uRW1haWxUaWxlQ2xpY2s6IFtdLFxuICAgICAgb25MaWtlQ2xpY2s6IFtdLFxuICAgICAgb25EaXNsaWtlQ2xpY2s6IFtdLFxuICAgICAgb25UaWxlRXhwYW5kUHJvZHVjdFJlY3NSZW5kZXJlZDogW10sXG4gICAgICBvblRpbGVFeHBhbmRDcm9zc1NlbGxlcnNSZW5kZXJlZDogW10sXG4gICAgICBvblNoYXJlTWVudU9wZW5lZDogW10sXG4gICAgICBvblNoYXJlTWVudUNsb3NlZDogW11cbiAgICB9O1xuICB9XG59KTtcblxuLy8gc3JjL2hvb2tzL3VzZUluZmluaXRlU2Nyb2xsZXIudHNcbmZ1bmN0aW9uIGV4Y2VlZHNCb3VuZGFyaWVzKHNkazIsIHdpbmRvd0luc3RhbmNlKSB7XG4gIGNvbnN0IHRpbGVzID0gc2RrMi5xdWVyeVNlbGVjdG9yQWxsKFwiLnVnYy10aWxlXCIpO1xuICBpZiAoIXRpbGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgdGlsZXMgZm9yIGJvdW5kYXJ5IGNoZWNrXCIpO1xuICB9XG4gIGNvbnN0IGxhc3RUaWxlID0gdGlsZXMuaXRlbSh0aWxlcy5sZW5ndGggLSAxKTtcbiAgaWYgKCFsYXN0VGlsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIGxhc3QgdGlsZVwiKTtcbiAgfVxuICBjb25zdCBsYXN0VGlsZVBvc2l0aW9uID0gbGFzdFRpbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgbGFzdFRpbGUub2Zmc2V0SGVpZ2h0O1xuICByZXR1cm4gbGFzdFRpbGVQb3NpdGlvbiA8PSB3aW5kb3dJbnN0YW5jZS5pbm5lckhlaWdodCArIDEwMDtcbn1cbmZ1bmN0aW9uIHVzZUluZmluaXRlU2Nyb2xsZXIoc2RrMiwgd2luZG93SW5zdGFuY2UgPSB3aW5kb3csIG9uTG9hZE1vcmUgPSAoKSA9PiB7XG4gIHNkazIudHJpZ2dlckV2ZW50KEVWRU5UX0xPQURfTU9SRSk7XG59KSB7XG4gIGZ1bmN0aW9uIG9uU2Nyb2xsMigpIHtcbiAgICBpZiAod2luZG93SW5zdGFuY2Uuc2Nyb2xsTG9ja2VkKSByZXR1cm47XG4gICAgd2luZG93SW5zdGFuY2Uuc2Nyb2xsTG9ja2VkID0gdHJ1ZTtcbiAgICBpZiAoZXhjZWVkc0JvdW5kYXJpZXMoc2RrMiwgd2luZG93SW5zdGFuY2UpKSB7XG4gICAgICBvbkxvYWRNb3JlKCk7XG4gICAgfVxuICAgIHdpbmRvd0luc3RhbmNlLnNjcm9sbExvY2tlZCA9IGZhbHNlO1xuICB9XG4gIHdpbmRvd0luc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwyKTtcbn1cbnZhciB1c2VJbmZpbml0ZVNjcm9sbGVyX2RlZmF1bHQ7XG52YXIgaW5pdF91c2VJbmZpbml0ZVNjcm9sbGVyID0gX19lc20oe1xuICBcInNyYy9ob29rcy91c2VJbmZpbml0ZVNjcm9sbGVyLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9ldmVudHMoKTtcbiAgICB1c2VJbmZpbml0ZVNjcm9sbGVyX2RlZmF1bHQgPSB1c2VJbmZpbml0ZVNjcm9sbGVyO1xuICB9XG59KTtcblxuLy8gc3JjL2hvb2tzL2luZGV4LnRzXG52YXIgaW5pdF9ob29rcyA9IF9fZXNtKHtcbiAgXCJzcmMvaG9va3MvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X3VzZUluZmluaXRlU2Nyb2xsZXIoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy93aWRnZXRzLnRzXG52YXIgaW5pdF93aWRnZXRzID0gX19lc20oe1xuICBcInNyYy90eXBlcy93aWRnZXRzLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvdHlwZXMudHNcbnZhciBpbml0X3R5cGVzID0gX19lc20oe1xuICBcInNyYy90eXBlcy90eXBlcy50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2NvbXBvbmVudHMvdWdjLmNvbXBvbmVudC50c1xudmFyIGluaXRfdWdjX2NvbXBvbmVudCA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvY29tcG9uZW50cy91Z2MuY29tcG9uZW50LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvY29tcG9uZW50cy9wcm9kdWN0cy5jb21wb25lbnQudHNcbnZhciBpbml0X3Byb2R1Y3RzX2NvbXBvbmVudCA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvY29tcG9uZW50cy9wcm9kdWN0cy5jb21wb25lbnQudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9jb21wb25lbnRzL3NoYXJlLW1lbnUuY29tcG9uZW50LnRzXG52YXIgaW5pdF9zaGFyZV9tZW51X2NvbXBvbmVudCA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvY29tcG9uZW50cy9zaGFyZS1tZW51LmNvbXBvbmVudC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2NvbXBvbmVudHMvc3RhdGljLmNvbXBvbmVudC50c1xudmFyIGluaXRfc3RhdGljX2NvbXBvbmVudCA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvY29tcG9uZW50cy9zdGF0aWMuY29tcG9uZW50LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvY29tcG9uZW50cy90aWxlLWNvbXBvbmVudC50c1xudmFyIGluaXRfdGlsZV9jb21wb25lbnQgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2NvbXBvbmVudHMvdGlsZS1jb21wb25lbnQudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9jb21wb25lbnRzL2luZGV4LnRzXG52YXIgaW5pdF9jb21wb25lbnRzMiA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvY29tcG9uZW50cy9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfdWdjX2NvbXBvbmVudCgpO1xuICAgIGluaXRfcHJvZHVjdHNfY29tcG9uZW50KCk7XG4gICAgaW5pdF9zaGFyZV9tZW51X2NvbXBvbmVudCgpO1xuICAgIGluaXRfc3RhdGljX2NvbXBvbmVudCgpO1xuICAgIGluaXRfdGlsZV9jb21wb25lbnQoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9jb3JlL3BsYWNlbWVudC50c1xudmFyIGluaXRfcGxhY2VtZW50ID0gX19lc20oe1xuICBcInNyYy90eXBlcy9jb3JlL3BsYWNlbWVudC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2NvcmUvc2RrLnRzXG52YXIgaW5pdF9zZGsgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2NvcmUvc2RrLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvY29yZS90aWxlLnRzXG52YXIgaW5pdF90aWxlID0gX19lc20oe1xuICBcInNyYy90eXBlcy9jb3JlL3RpbGUudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9jb3JlL3dpZGdldC1yZXF1ZXN0LnRzXG52YXIgaW5pdF93aWRnZXRfcmVxdWVzdCA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvY29yZS93aWRnZXQtcmVxdWVzdC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2NvcmUvaW5kZXgudHNcbnZhciBpbml0X2NvcmUgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2NvcmUvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X3BsYWNlbWVudCgpO1xuICAgIGluaXRfc2RrKCk7XG4gICAgaW5pdF90aWxlKCk7XG4gICAgaW5pdF93aWRnZXRfcmVxdWVzdCgpO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL3NlcnZpY2VzL2Jhc2Uuc2VydmljZS50c1xudmFyIGluaXRfYmFzZV9zZXJ2aWNlID0gX19lc20oe1xuICBcInNyYy90eXBlcy9zZXJ2aWNlcy9iYXNlLnNlcnZpY2UudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9zZXJ2aWNlcy9ldmVudC5zZXJ2aWNlLnRzXG52YXIgaW5pdF9ldmVudF9zZXJ2aWNlID0gX19lc20oe1xuICBcInNyYy90eXBlcy9zZXJ2aWNlcy9ldmVudC5zZXJ2aWNlLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvc2VydmljZXMvdGlsZXMuc2VydmljZS50c1xudmFyIGluaXRfdGlsZXNfc2VydmljZSA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvc2VydmljZXMvdGlsZXMuc2VydmljZS50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL3NlcnZpY2VzL3dpZGdldC5zZXJ2aWNlLnRzXG52YXIgaW5pdF93aWRnZXRfc2VydmljZSA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvc2VydmljZXMvd2lkZ2V0LnNlcnZpY2UudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9zZXJ2aWNlcy9ldmVudHMvdGlsZS1ldmVudC50c1xudmFyIGluaXRfdGlsZV9ldmVudCA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvc2VydmljZXMvZXZlbnRzL3RpbGUtZXZlbnQudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9zZXJ2aWNlcy9ldmVudHMvd2lkZ2V0LWV2ZW50LnRzXG52YXIgaW5pdF93aWRnZXRfZXZlbnQgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL3NlcnZpY2VzL2V2ZW50cy93aWRnZXQtZXZlbnQudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9zZXJ2aWNlcy9pbmRleC50c1xudmFyIGluaXRfc2VydmljZXMgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL3NlcnZpY2VzL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9iYXNlX3NlcnZpY2UoKTtcbiAgICBpbml0X2V2ZW50X3NlcnZpY2UoKTtcbiAgICBpbml0X3RpbGVzX3NlcnZpY2UoKTtcbiAgICBpbml0X3dpZGdldF9zZXJ2aWNlKCk7XG4gICAgaW5pdF90aWxlX2V2ZW50KCk7XG4gICAgaW5pdF93aWRnZXRfZXZlbnQoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9TZGtTd2lwZXIudHNcbnZhciBpbml0X1Nka1N3aXBlciA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvU2RrU3dpcGVyLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvaW5kZXgudHNcbnZhciBpbml0X3R5cGVzMiA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X3dpZGdldHMoKTtcbiAgICBpbml0X3R5cGVzKCk7XG4gICAgaW5pdF9jb21wb25lbnRzMigpO1xuICAgIGluaXRfY29yZSgpO1xuICAgIGluaXRfc2VydmljZXMoKTtcbiAgICBpbml0X1Nka1N3aXBlcigpO1xuICB9XG59KTtcblxuLy8gc3JjL3dpZGdldC1sb2FkZXIudHNcbmZ1bmN0aW9uIGxvYWRNYXNvbnJ5Q2FsbGJhY2tzKHNldHRpbmdzKSB7XG4gIHNldHRpbmdzLmNhbGxiYWNrcy5vblRpbGVzVXBkYXRlZC5wdXNoKCgpID0+IHtcbiAgICByZW5kZXJNYXNvbnJ5TGF5b3V0KCk7XG4gIH0pO1xuICBzZXR0aW5ncy5jYWxsYmFja3Mub25UaWxlQmdJbWdSZW5kZXJDb21wbGV0ZS5wdXNoKCgpID0+IHtcbiAgICBoYW5kbGVBbGxUaWxlSW1hZ2VSZW5kZXJlZCgpO1xuICAgIHNldFRpbWVvdXQoaGFuZGxlQWxsVGlsZUltYWdlUmVuZGVyZWQsIDFlMyk7XG4gIH0pO1xuICBzZXR0aW5ncy5jYWxsYmFja3Mub25UaWxlQmdJbWFnZUVycm9yLnB1c2goKGV2ZW50MikgPT4ge1xuICAgIGNvbnN0IGN1c3RvbUV2ZW50ID0gZXZlbnQyO1xuICAgIGNvbnN0IHRpbGVXaXRoRXJyb3IgPSBjdXN0b21FdmVudC5kZXRhaWwuZGF0YS50YXJnZXQ7XG4gICAgaGFuZGxlVGlsZUltYWdlRXJyb3IodGlsZVdpdGhFcnJvcik7XG4gIH0pO1xuICBjb25zdCBncmlkID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCIuZ3JpZFwiKTtcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xuICAgIHJlbmRlck1hc29ucnlMYXlvdXQoZmFsc2UsIHRydWUpO1xuICB9KTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShncmlkKTtcbiAgcmV0dXJuIHNldHRpbmdzO1xufVxuZnVuY3Rpb24gbWVyZ2VTZXR0aW5nc1dpdGhEZWZhdWx0cyhzZXR0aW5ncykge1xuICByZXR1cm4ge1xuICAgIGZlYXR1cmVzOiB7XG4gICAgICBzaG93VGl0bGU6IHRydWUsXG4gICAgICBwcmVsb2FkSW1hZ2VzOiB0cnVlLFxuICAgICAgZGlzYWJsZVdpZGdldElmTm90RW5hYmxlZDogdHJ1ZSxcbiAgICAgIGFkZE5ld1RpbGVzQXV0b21hdGljYWxseTogdHJ1ZSxcbiAgICAgIGhhbmRsZUxvYWRNb3JlOiB0cnVlLFxuICAgICAgbGltaXRUaWxlc1BlclBhZ2U6IHRydWUsXG4gICAgICBoaWRlQnJva2VuSW1hZ2VzOiB0cnVlLFxuICAgICAgbG9hZEV4cGFuZGVkVGlsZVNsaWRlcjogdHJ1ZSxcbiAgICAgIGxvYWRUaWxlQ29udGVudDogdHJ1ZSxcbiAgICAgIGxvYWRUaW1lcGhyYXNlOiB0cnVlLFxuICAgICAgZXhwYW5kZWRUaWxlU2V0dGluZ3M6IHtcbiAgICAgICAgdXNlRGVmYXVsdEV4cGFuZGVkVGlsZVN0eWxlczogdHJ1ZSxcbiAgICAgICAgdXNlRGVmYXVsdFByb2R1Y3RTdHlsZXM6IHRydWUsXG4gICAgICAgIHVzZURlZmF1bHRBZGRUb0NhcnRTdHlsZXM6IHRydWUsXG4gICAgICAgIHVzZURlZmF1bHRFeHBhbmRlZFRpbGVUZW1wbGF0ZXM6IHRydWUsXG4gICAgICAgIHVzZURlZmF1bHRTd2lwZXJTdHlsZXM6IHRydWUsXG4gICAgICAgIGRlZmF1bHRGb250OiBzZXR0aW5ncz8uZm9udCA/PyBcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SW50ZXI6d2dodEA0MDA7NTAwOzcwMCZkaXNwbGF5PXN3YXBcIlxuICAgICAgfSxcbiAgICAgIC4uLnNldHRpbmdzPy5mZWF0dXJlc1xuICAgIH0sXG4gICAgY2FsbGJhY2tzOiB7XG4gICAgICAuLi5jYWxsYmFja0RlZmF1bHRzLFxuICAgICAgLi4uc2V0dGluZ3M/LmNhbGxiYWNrc1xuICAgIH0sXG4gICAgZXh0ZW5zaW9uczoge1xuICAgICAgc3dpcGVyOiBmYWxzZSxcbiAgICAgIG1hc29ucnk6IGZhbHNlLFxuICAgICAgLi4uc2V0dGluZ3M/LmV4dGVuc2lvbnNcbiAgICB9LFxuICAgIHRlbXBsYXRlczogc2V0dGluZ3M/LnRlbXBsYXRlcyA/PyB7fVxuICB9O1xufVxuYXN5bmMgZnVuY3Rpb24gbG9hZEZlYXR1cmVzKHNldHRpbmdzKSB7XG4gIGNvbnN0IHtcbiAgICBzaG93VGl0bGUsXG4gICAgcHJlbG9hZEltYWdlcyxcbiAgICBkaXNhYmxlV2lkZ2V0SWZOb3RFbmFibGVkLFxuICAgIGFkZE5ld1RpbGVzQXV0b21hdGljYWxseSxcbiAgICBoYW5kbGVMb2FkTW9yZSxcbiAgICBsaW1pdFRpbGVzUGVyUGFnZSxcbiAgICBoaWRlQnJva2VuSW1hZ2VzLFxuICAgIGxvYWRUaWxlQ29udGVudCxcbiAgICBsb2FkVGltZXBocmFzZVxuICB9ID0gc2V0dGluZ3MuZmVhdHVyZXM7XG4gIHNkay50aWxlcy5wcmVsb2FkSW1hZ2VzID0gcHJlbG9hZEltYWdlcztcbiAgc2RrLnRpbGVzLmhpZGVCcm9rZW5UaWxlcyA9IGhpZGVCcm9rZW5JbWFnZXM7XG4gIGlmIChsb2FkVGlsZUNvbnRlbnQpIHtcbiAgICBzZGsuYWRkTG9hZGVkQ29tcG9uZW50cyhbXCJ0aWxlLWNvbnRlbnRcIiwgXCJ0aW1lcGhyYXNlXCIsIFwidGFnc1wiLCBcInNoYXJlLW1lbnVcIl0pO1xuICB9IGVsc2UgaWYgKGxvYWRUaW1lcGhyYXNlKSB7XG4gICAgc2RrLmFkZExvYWRlZENvbXBvbmVudHMoW1widGltZXBocmFzZVwiXSk7XG4gIH1cbiAgaWYgKGRpc2FibGVXaWRnZXRJZk5vdEVuYWJsZWQpIHtcbiAgICBsb2FkV2lkZ2V0SXNFbmFibGVkKCk7XG4gIH1cbiAgaWYgKHNob3dUaXRsZSkge1xuICAgIGxvYWRUaXRsZSgpO1xuICB9XG4gIGxvYWRFeHBhbmRlZFRpbGVGZWF0dXJlKCk7XG4gIGlmIChhZGROZXdUaWxlc0F1dG9tYXRpY2FsbHkpIHtcbiAgICBhZGRBdXRvQWRkVGlsZUZlYXR1cmUoKTtcbiAgfVxuICBpZiAoaGFuZGxlTG9hZE1vcmUpIHtcbiAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IChpbml0X2xvYWRfbW9yZSgpLCBsb2FkX21vcmVfZXhwb3J0cykpO1xuICAgIGFkZExvYWRNb3JlQnV0dG9uRmVhdHVyZSgpO1xuICB9XG4gIGlmIChsaW1pdFRpbGVzUGVyUGFnZSkge1xuICAgIGFkZFRpbGVzUGVyUGFnZUZlYXR1cmUoKTtcbiAgfVxuICByZXR1cm4gc2V0dGluZ3M7XG59XG5mdW5jdGlvbiBsb2FkRXh0ZW5zaW9ucyhzZXR0aW5ncykge1xuICBjb25zdCB7IGV4dGVuc2lvbnMgfSA9IHNldHRpbmdzO1xuICBpZiAoZXh0ZW5zaW9ucz8ubWFzb25yeSkge1xuICAgIHNldHRpbmdzID0gbG9hZE1hc29ucnlDYWxsYmFja3Moc2V0dGluZ3MpO1xuICAgIHJlbmRlck1hc29ucnlMYXlvdXQoKTtcbiAgfVxuICByZXR1cm4gc2V0dGluZ3M7XG59XG5mdW5jdGlvbiBpbml0aWFsaXNlRmVhdHVyZXMoc2V0dGluZ3MpIHtcbiAgaWYgKE9iamVjdC5rZXlzKHNldHRpbmdzLmZlYXR1cmVzID8/IHt9KS5sZW5ndGggPT09IDApIHtcbiAgICBzZXR0aW5ncy5mZWF0dXJlcyA9IHtcbiAgICAgIHNob3dUaXRsZTogdHJ1ZSxcbiAgICAgIHByZWxvYWRJbWFnZXM6IHRydWUsXG4gICAgICBkaXNhYmxlV2lkZ2V0SWZOb3RFbmFibGVkOiB0cnVlLFxuICAgICAgYWRkTmV3VGlsZXNBdXRvbWF0aWNhbGx5OiB0cnVlLFxuICAgICAgaGFuZGxlTG9hZE1vcmU6IHRydWUsXG4gICAgICBsaW1pdFRpbGVzUGVyUGFnZTogdHJ1ZVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHNldHRpbmdzO1xufVxuZnVuY3Rpb24gbG9hZFRlbXBsYXRlcyhzZXR0aW5ncykge1xuICBjb25zdCB7IGV4cGFuZGVkVGlsZVNldHRpbmdzIH0gPSBzZXR0aW5ncy5mZWF0dXJlcztcbiAgY29uc3Qge1xuICAgIHVzZURlZmF1bHRFeHBhbmRlZFRpbGVTdHlsZXMsXG4gICAgdXNlRGVmYXVsdFByb2R1Y3RTdHlsZXMsXG4gICAgdXNlRGVmYXVsdEFkZFRvQ2FydFN0eWxlcyxcbiAgICB1c2VEZWZhdWx0RXhwYW5kZWRUaWxlVGVtcGxhdGVzLFxuICAgIGRlZmF1bHRGb250LFxuICAgIHVzZURlZmF1bHRTd2lwZXJTdHlsZXNcbiAgfSA9IGV4cGFuZGVkVGlsZVNldHRpbmdzO1xuICBpZiAoc2V0dGluZ3MuZmVhdHVyZXMubG9hZEV4cGFuZGVkVGlsZVNsaWRlcikge1xuICAgIGxvYWRFeHBhbmRlZFRpbGVUZW1wbGF0ZXMoe1xuICAgICAgdXNlRGVmYXVsdEV4cGFuZGVkVGlsZVN0eWxlcyxcbiAgICAgIHVzZURlZmF1bHRQcm9kdWN0U3R5bGVzLFxuICAgICAgdXNlRGVmYXVsdEFkZFRvQ2FydFN0eWxlcyxcbiAgICAgIHVzZURlZmF1bHRFeHBhbmRlZFRpbGVUZW1wbGF0ZXMsXG4gICAgICBkZWZhdWx0Rm9udCxcbiAgICAgIHVzZURlZmF1bHRTd2lwZXJTdHlsZXNcbiAgICB9KTtcbiAgfVxuICBpZiAoc2V0dGluZ3MudGVtcGxhdGVzICYmIE9iamVjdC5rZXlzKHNldHRpbmdzLnRlbXBsYXRlcykubGVuZ3RoKSB7XG4gICAgT2JqZWN0LmVudHJpZXMoc2V0dGluZ3MudGVtcGxhdGVzKS5mb3JFYWNoKChba2V5LCBjdXN0b21UZW1wbGF0ZV0pID0+IHtcbiAgICAgIGlmICghY3VzdG9tVGVtcGxhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgeyB0ZW1wbGF0ZSB9ID0gY3VzdG9tVGVtcGxhdGU7XG4gICAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgICAgc2RrLmFkZFRlbXBsYXRlVG9Db21wb25lbnQodGVtcGxhdGUsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGxvYWRXaWRnZXQoc2V0dGluZ3MpIHtcbiAgY29uc3Qgc2V0dGluZ3NXaXRoRGVmYXVsdHMgPSBtZXJnZVNldHRpbmdzV2l0aERlZmF1bHRzKHNldHRpbmdzKTtcbiAgYWRkQ1NTVmFyaWFibGVzVG9QbGFjZW1lbnQoZ2V0Q1NTVmFyaWFibGVzKHNldHRpbmdzPy5mZWF0dXJlcykpO1xuICBsb2FkVGVtcGxhdGVzKHNldHRpbmdzV2l0aERlZmF1bHRzKTtcbiAgbG9hZEZlYXR1cmVzKHNldHRpbmdzV2l0aERlZmF1bHRzKTtcbiAgbG9hZEV4dGVuc2lvbnMoc2V0dGluZ3NXaXRoRGVmYXVsdHMpO1xuICBsb2FkTGlzdGVuZXJzKHNldHRpbmdzV2l0aERlZmF1bHRzKTtcbn1cbnZhciBpbml0X3dpZGdldF9sb2FkZXIgPSBfX2VzbSh7XG4gIFwic3JjL3dpZGdldC1sb2FkZXIudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2xpYnMoKTtcbiAgICBpbml0X2Nzc192YXJpYWJsZXMoKTtcbiAgICBpbml0X21hc29ucnlfZXh0ZW5zaW9uKCk7XG4gICAgaW5pdF9leHBhbmRlZF90aWxlX3N3aXBlcigpO1xuICAgIGluaXRfZXZlbnRzKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvaW5kZXgudHNcbnZhciBpbml0X3NyYyA9IF9fZXNtKHtcbiAgXCJzcmMvaW5kZXgudHNcIigpIHtcbiAgICBpbml0X2hvb2tzKCk7XG4gICAgaW5pdF90eXBlczIoKTtcbiAgICBpbml0X2V2ZW50cygpO1xuICAgIGluaXRfbGlicygpO1xuICAgIGluaXRfd2lkZ2V0X2xvYWRlcigpO1xuICB9XG59KTtcbmluaXRfc3JjKCk7XG5leHBvcnQge1xuICBCRUZPUkVfRVhQQU5ERURfVElMRV9DTE9TRSxcbiAgQkVGT1JFX0VYUEFOREVEX1RJTEVfSU1BR0VfUkVTSVpFLFxuICBCRUZPUkVfRVhQQU5ERURfVElMRV9PUEVOLFxuICBDUk9TU19TRUxMRVJTX0xPQURFRCxcbiAgRElTTElLRV9DTElDSyxcbiAgRU1BSUxfVElMRV9DTElDSyxcbiAgRU1BSUxfVElMRV9MT0FELFxuICBFVkVOVF9BRERfVE9fQ0FSVF9GQUlMRUQsXG4gIEVWRU5UX0RJU0xJS0UsXG4gIEVWRU5UX0dMT0JBTFNfTE9BREVELFxuICBFVkVOVF9IT1ZFUixcbiAgRVZFTlRfSFRNTF9SRU5ERVJFRCxcbiAgRVZFTlRfSU1QUkVTU0lPTixcbiAgRVZFTlRfSlNfUkVOREVSRUQsXG4gIEVWRU5UX0xJS0UsXG4gIEVWRU5UX0xPQUQsXG4gIEVWRU5UX0xPQURfTU9SRSxcbiAgRVZFTlRfUFJPRFVDVFNfVVBEQVRFRCxcbiAgRVZFTlRfUFJPRFVDVF9DTElDSyxcbiAgRVZFTlRfUFJPRFVDVF9QQUdFX0xPQURFRCxcbiAgRVZFTlRfUFJPRFVDVF9QSU5DTElDSyxcbiAgRVZFTlRfUFJPRFVDVF9VU0VSX0NMSUNLLFxuICBFVkVOVF9TSEFSRV9DTElDSyxcbiAgRVZFTlRfU0hBUkVfTUVOVV9DTE9TRUQsXG4gIEVWRU5UX1NIQVJFX01FTlVfT1BFTkVELFxuICBFVkVOVF9TSE9QU1BPVF9GTFlPVVQsXG4gIEVWRU5UX1RJTEVTX1VQREFURUQsXG4gIEVWRU5UX1RJTEVfQkdfSU1HX0VSUk9SLFxuICBFVkVOVF9USUxFX0JHX0lNR19SRU5ERVJfQ09NUExFVEUsXG4gIEVWRU5UX1RJTEVfREFUQV9TRVQsXG4gIEVWRU5UX1RJTEVfRVhQQU5ELFxuICBFVkVOVF9USUxFX0VYUEFORF9DUk9TU19TRUxMRVJTX1JFTkRFUkVELFxuICBFVkVOVF9USUxFX0VYUEFORF9QUk9EX1JFQ1NfUkVOREVSRUQsXG4gIEVWRU5UX1RJTEVfRVhQQU5EX1JFTkRFUkVELFxuICBFVkVOVF9USUxFX01FVEFEQVRBX0xPQURFRCxcbiAgRVhQQU5ERURfVElMRV9DTE9TRSxcbiAgRVhQQU5ERURfVElMRV9JTUFHRV9MT0FELFxuICBFWFBBTkRFRF9USUxFX0lNQUdFX1JFU0laRSxcbiAgRVhQQU5ERURfVElMRV9PUEVOLFxuICBMSUtFX0NMSUNLLFxuICBQUk9EVUNUX0FDVElPTl9DTElDSyxcbiAgU0hPUFNQT1RfQUNUSU9OX0NMSUNLLFxuICBTSE9QU1BPVF9GTFlPVVRfRVhQQU5ELFxuICBTSE9QU1BPVF9PUEVOLFxuICBTSE9QU1BPVF9UT0dHTEUsXG4gIFVTRVJfQ0xJQ0ssXG4gIFdJREdFVF9JTklUX0NPTVBMRVRFLFxuICBhZGRBdXRvQWRkVGlsZUZlYXR1cmUsXG4gIGFkZENTU1ZhcmlhYmxlc1RvUGxhY2VtZW50LFxuICBhZGRMb2FkTW9yZUJ1dHRvbkZlYXR1cmUsXG4gIGFkZFRpbGVzUGVyUGFnZUZlYXR1cmUsXG4gIGFsbEV2ZW50cyxcbiAgYXJyb3dDbGlja0xpc3RlbmVyLFxuICBhdHRhY2hMb2FkTW9yZUJ1dHRvbkxpc3RlbmVyLFxuICBjYWxsYmFja0RlZmF1bHRzLFxuICBjcmVhdGVFbGVtZW50LFxuICBjcmVhdGVGcmFnbWVudCxcbiAgZGVzdHJveVN3aXBlcixcbiAgZGlzYWJsZUxvYWRNb3JlQnV0dG9uSWZFeGlzdHMsXG4gIGRpc2FibGVMb2FkTW9yZUxvYWRlcklmRXhpc3RzLFxuICBkaXNhYmxlU3dpcGVyLFxuICBlbmFibGVTd2lwZXIsXG4gIGVuYWJsZVRpbGVJbWFnZXMsXG4gIGdldEFjdGl2ZVNsaWRlLFxuICBnZXRBY3RpdmVTbGlkZUVsZW1lbnQsXG4gIGdldENsaWNrZWRJbmRleCxcbiAgZ2V0SW5zdGFuY2UsXG4gIGdldE5leHROYXZpZ2F0ZWRUaWxlLFxuICBnZXROZXh0VGlsZSxcbiAgZ2V0UHJldmlvdXNUaWxlLFxuICBnZXRTd2lwZXJJbmRleGZvclRpbGUsXG4gIGdldFRpbGVTaXplLFxuICBnZXRUaWxlU2l6ZUJ5V2lkZ2V0LFxuICBnZXRUaW1lcGhyYXNlLFxuICBoYW5kbGVBbGxUaWxlSW1hZ2VSZW5kZXJlZCxcbiAgaGFuZGxlVGlsZUNsaWNrLFxuICBoYW5kbGVUaWxlSW1hZ2VFcnJvcixcbiAgaGFuZGxlVGlsZUltYWdlUmVuZGVyZWQsXG4gIGhhc01pbmltdW1UaWxlc1JlcXVpcmVkLFxuICBoaWRlQWxsVGlsZXNBZnRlck5UaWxlcyxcbiAgaW5pdGlhbGlzZUZlYXR1cmVzLFxuICBpbml0aWFsaXplU3dpcGVyLFxuICBpc0VuYWJsZWQsXG4gIGlzU3dpcGVyTG9hZGluZyxcbiAgbG9hZEFsbFVubG9hZGVkVGlsZXMsXG4gIGxvYWRFeHBhbmRTZXR0aW5nQ29tcG9uZW50cyxcbiAgbG9hZEV4cGFuZGVkVGlsZUZlYXR1cmUsXG4gIGxvYWRFeHBhbmRlZFRpbGVUZW1wbGF0ZXMsXG4gIGxvYWRMaXN0ZW5lcnMsXG4gIGxvYWRTd2lwZXJTdHlsZXMsXG4gIGxvYWRUZW1wbGF0ZXMsXG4gIGxvYWRUaXRsZSxcbiAgbG9hZFdpZGdldCxcbiAgbG9hZFdpZGdldElzRW5hYmxlZCxcbiAgcmVmcmVzaFN3aXBlcixcbiAgcmVnaXN0ZXJDcm9zc1NlbGxlcnNMb2FkTGlzdGVuZXIsXG4gIHJlZ2lzdGVyRGVmYXVsdENsaWNrRXZlbnRzLFxuICByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyLFxuICByZWdpc3RlclNoYXJlTWVudUNsb3NlZExpc3RlbmVyLFxuICByZWdpc3RlclNoYXJlTWVudU9wZW5lZExpc3RlbmVyLFxuICByZWdpc3RlclRpbGVFeHBhbmRMaXN0ZW5lcixcbiAgcmVuZGVyTWFzb25yeUxheW91dCxcbiAgc2V0U3dpcGVyTG9hZGluZ1N0YXR1cyxcbiAgdHJpbUhhc2hWYWx1ZXNGcm9tT2JqZWN0LFxuICB1cGRhdGVTd2lwZXJJbnN0YW5jZSxcbiAgdXNlSW5maW5pdGVTY3JvbGxlcl9kZWZhdWx0IGFzIHVzZUluZmluaXRlU2Nyb2xsZXIsXG4gIHdhaXRGb3JFbGVtZW50LFxuICB3YWl0Rm9yRWxlbWVudHMsXG4gIHdhaXRGb3JFbG1cbn07XG4iLCAiaW1wb3J0IHsgd2FpdEZvckVsZW1lbnRzLCB0eXBlIElTZGsgfSBmcm9tIFwiQHN0YWNrbGEvd2lkZ2V0LXV0aWxzXCJcblxuZGVjbGFyZSBjb25zdCBzZGs6IElTZGtcblxuY29uc3QgdGlsZVNpemVzOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0ge1xuICBzbWFsbDogODguNSxcbiAgbWVkaXVtOiAxMzMuNSxcbiAgbGFyZ2U6IDI2OS4yXG59XG5cbmNvbnN0IHRpbGVzQ29udGFpbmVyID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCIudWdjLXRpbGVzXCIpIVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRW1wdHlUaWxlR3JvdXBzKCkge1xuICBjb25zdCB0aWxlR3JvdXBzID0gc2RrLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnRpbGUtZ3JvdXBcIilcbiAgdGlsZUdyb3Vwcy5mb3JFYWNoKHRpbGVHcm91cCA9PiB7XG4gICAgaWYgKHRpbGVHcm91cC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgIHRpbGVHcm91cC5yZW1vdmUoKVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbGVSb3dIZWlnaHQoKSB7XG4gIGNvbnN0IHN0eWxlID0gc2RrLmdldFN0eWxlQ29uZmlnKClcbiAgY29uc3QgeyBpbmxpbmVfdGlsZV9zaXplIH0gPSBzdHlsZVxuXG4gIGNvbnN0IHRpbGVTaXplczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgICBzbWFsbDogXCIxNXZ3XCIsXG4gICAgbWVkaXVtOiBcIjI1dndcIixcbiAgICBsYXJnZTogXCI1MHZ3XCJcbiAgfVxuXG4gIGlmICghaW5saW5lX3RpbGVfc2l6ZSkge1xuICAgIHJldHVybiB0aWxlU2l6ZXNbXCJtZWRpdW1cIl1cbiAgfVxuXG4gIHJldHVybiB0aWxlU2l6ZXNbaW5saW5lX3RpbGVfc2l6ZV1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVGlsZUdyb3VwKHRpbGVzOiBIVE1MRWxlbWVudFtdLCBncm91cFN0YXJ0SW5kZXg6IG51bWJlciwgdGlsZVNpemU6IG51bWJlcikge1xuICBpZiAodGlsZXMubGVuZ3RoIC0gZ3JvdXBTdGFydEluZGV4IDwgNSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgdGlsZUdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICB0aWxlR3JvdXAuY2xhc3NMaXN0LmFkZChcInRpbGUtZ3JvdXBcIilcblxuICBjb25zdCBpc0xhcmdlRmlyc3QgPSB0aWxlU2l6ZSA9PT0gdGlsZVNpemVzLmxhcmdlXG5cbiAgY29uc3QgbGFyZ2VUaWxlSW5kZXggPSBpc0xhcmdlRmlyc3QgPyA0IDogMFxuXG4gIGNvbnN0IGxhcmdlVGlsZSA9IHRpbGVzW2dyb3VwU3RhcnRJbmRleCArIGxhcmdlVGlsZUluZGV4XVxuICBsYXJnZVRpbGUuY2xhc3NMaXN0LmFkZChcImxhcmdlXCIsIFwicHJvY2Vzc2VkXCIpXG4gIHRpbGVHcm91cC5hcHBlbmRDaGlsZChsYXJnZVRpbGUpXG5cbiAgY29uc3Qgc3RhcnRPZmZzZXQgPSBpc0xhcmdlRmlyc3QgPyAwIDogMVxuICBmb3IgKGxldCB0aWxlT2Zmc2V0ID0gc3RhcnRPZmZzZXQ7IHRpbGVPZmZzZXQgPCBzdGFydE9mZnNldCArIDQ7IHRpbGVPZmZzZXQrKykge1xuICAgIGNvbnN0IHNtYWxsVGlsZSA9IHRpbGVzW2dyb3VwU3RhcnRJbmRleCArIHRpbGVPZmZzZXRdXG4gICAgc21hbGxUaWxlLmNsYXNzTGlzdC5hZGQoXCJzbWFsbFwiLCBcInByb2Nlc3NlZFwiKVxuICAgIHRpbGVHcm91cC5hcHBlbmRDaGlsZChzbWFsbFRpbGUpXG4gIH1cblxuICByZXR1cm4gdGlsZUdyb3VwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRRdWFkcmFudFRpbGVzKHRpbGVzOiBIVE1MRWxlbWVudFtdLCB0aWxlU2l6ZTogbnVtYmVyLCBzdGFydEluZGV4OiBudW1iZXIgPSAwKSB7XG4gIGlmICh0aWxlc0NvbnRhaW5lcikge1xuICAgIGZvciAobGV0IGdyb3VwU3RhcnRJbmRleCA9IHN0YXJ0SW5kZXg7IGdyb3VwU3RhcnRJbmRleCA8IHRpbGVzLmxlbmd0aDsgZ3JvdXBTdGFydEluZGV4ICs9IDUpIHtcbiAgICAgIGNvbnN0IHRpbGVHcm91cCA9IGNyZWF0ZVRpbGVHcm91cCh0aWxlcywgZ3JvdXBTdGFydEluZGV4LCB0aWxlU2l6ZSlcbiAgICAgIGlmICh0aWxlR3JvdXApIHtcbiAgICAgICAgdGlsZXNDb250YWluZXI/LmFwcGVuZENoaWxkKHRpbGVHcm91cClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWxvYWRUaWxlSW1hZ2VzQW5kUmVtb3ZlQnJva2VuVGlsZXModGlsZXM6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+KTogUHJvbWlzZTxIVE1MRWxlbWVudFtdPiB7XG4gIHNkay5xdWVyeVNlbGVjdG9yKFwiI2xvYWQtbW9yZVwiKS5zdHlsZS5vcGFjaXR5ID0gXCIwXCJcbiAgc2RrLnF1ZXJ5U2VsZWN0b3IoXCIjbG9hZC1tb3JlLWxvYWRlclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpXG5cbiAgY29uc3QgcHJvbWlzZXMgPSBBcnJheS5mcm9tKHRpbGVzKS5tYXAoYXN5bmMgdGlsZSA9PiB7XG4gICAgY29uc3QgdGlsZUVsZW1lbnQgPSB0aWxlLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLnRpbGVcIilcbiAgICBjb25zdCB0aWxlSW1hZ2UgPSB0aWxlRWxlbWVudD8uZ2V0QXR0cmlidXRlKFwiZGF0YS1iYWNrZ3JvdW5kLWltYWdlXCIpID8/IFwiXCJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHRpbGUpXG4gICAgICBpbWFnZS5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICB0aWxlLnJlbW92ZSgpXG4gICAgICAgIHJlc29sdmUobnVsbClcbiAgICAgIH1cbiAgICAgIGlmICghdGlsZUltYWdlKSB7XG4gICAgICAgIHJlc29sdmUobnVsbClcbiAgICAgIH1cbiAgICAgIGltYWdlLnNyYyA9IHRpbGVJbWFnZVxuXG4gICAgICBpZiAoIXRpbGVFbGVtZW50KSB7XG4gICAgICAgIHJlc29sdmUobnVsbClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRpbGVFbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHt0aWxlSW1hZ2V9KWBcbiAgICB9KVxuICB9KVxuXG4gIGNvbnN0IGxvYWRlZFRpbGVzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG5cbiAgc2RrLnF1ZXJ5U2VsZWN0b3IoXCIjbG9hZC1tb3JlXCIpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIlxuICBzZGsucXVlcnlTZWxlY3RvcihcIiNsb2FkLW1vcmUtbG9hZGVyXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIilcblxuICByZXR1cm4gbG9hZGVkVGlsZXMuZmlsdGVyKHRpbGUgPT4gdGlsZSAhPT0gbnVsbCkgYXMgSFRNTEVsZW1lbnRbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UXVhZHJhbnRUaWxlcygpIHtcbiAgY29uc3QgeyBpbmxpbmVfdGlsZV9zaXplIH0gPSBzZGsuZ2V0U3R5bGVDb25maWcoKVxuICBzZGsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vcmVMb2FkXCIsICgpID0+IHtcbiAgICBjb25zdCB0aWxlU2l6ZSA9IHRpbGVTaXplc1tpbmxpbmVfdGlsZV9zaXplID8/IFwibWVkaXVtXCJdXG5cbiAgICB3YWl0Rm9yRWxlbWVudHModGlsZXNDb250YWluZXIsIFwiLnVnYy10aWxlOm5vdCgucHJvY2Vzc2VkKVwiLCBhc3luYyBuZXdUaWxlcyA9PiB7XG4gICAgICBpZiAobmV3VGlsZXMgJiYgbmV3VGlsZXMubGVuZ3RoID49IDUpIHtcbiAgICAgICAgY29uc3QgbG9hZGVkVGlsZXMgPSBhd2FpdCBwcmVsb2FkVGlsZUltYWdlc0FuZFJlbW92ZUJyb2tlblRpbGVzKG5ld1RpbGVzKVxuICAgICAgICBhZGRRdWFkcmFudFRpbGVzKGxvYWRlZFRpbGVzLCB0aWxlU2l6ZSlcbiAgICAgICAgcmVtb3ZlRW1wdHlUaWxlR3JvdXBzKClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIHNkay5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgdGlsZXMgPSBzZGsucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudWdjLXRpbGVcIilcblxuICAgIGlmICghdGlsZXMgfHwgdGlsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBsb2FkZWRUaWxlcyA9IGF3YWl0IHByZWxvYWRUaWxlSW1hZ2VzQW5kUmVtb3ZlQnJva2VuVGlsZXModGlsZXMpXG4gICAgY29uc3QgdGlsZVNpemUgPSB0aWxlU2l6ZXNbaW5saW5lX3RpbGVfc2l6ZSA/PyBcIm1lZGl1bVwiXVxuXG4gICAgaWYgKHRpbGVzICYmIHRpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGFkZFF1YWRyYW50VGlsZXMobG9hZGVkVGlsZXMsIHRpbGVTaXplKVxuICAgIH1cbiAgfSlcbn1cbiIsICJpbXBvcnQgeyBsb2FkV2lkZ2V0IH0gZnJvbSBcIkBzdGFja2xhL3dpZGdldC11dGlsc1wiXG5pbXBvcnQgeyBnZXRRdWFkcmFudFRpbGVzLCBnZXRUaWxlUm93SGVpZ2h0IH0gZnJvbSBcIi4vcXVhZHJhbnQubGliXCJcblxubG9hZFdpZGdldCh7XG4gIGZlYXR1cmVzOiB7XG4gICAgcHJlbG9hZEltYWdlczogZmFsc2UsXG4gICAgaGlkZUJyb2tlbkltYWdlczogdHJ1ZSxcbiAgICB0aWxlU2l6ZVNldHRpbmdzOiB7XG4gICAgICBzbWFsbDogXCIxZnIgMWZyIDFmclwiLFxuICAgICAgbWVkaXVtOiBcIjFmciAxZnJcIixcbiAgICAgIGxhcmdlOiBcIjFmclwiXG4gICAgfSxcbiAgICBjc3NWYXJpYWJsZXM6IHtcbiAgICAgIFwiLS10aWxlLXNpemUtY29sdW1uLWhlaWdodFwiOiBnZXRUaWxlUm93SGVpZ2h0KClcbiAgICB9XG4gIH1cbn0pXG5cbmdldFF1YWRyYW50VGlsZXMoKVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQUEsTUFBSSxZQUFZLE9BQU87QUFDdkIsTUFBSSxvQkFBb0IsT0FBTztBQUMvQixNQUFJLFFBQVEsQ0FBQyxJQUFJLFFBQVEsU0FBUyxTQUFTO0FBQ3pDLFdBQU8sT0FBTyxPQUFPLEdBQUcsR0FBRyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJO0FBQUEsRUFDbEU7QUFDQSxNQUFJLFdBQVcsQ0FBQyxRQUFRLFFBQVE7QUFDOUIsYUFBUyxRQUFRO0FBQ2YsZ0JBQVUsUUFBUSxNQUFNLEVBQUUsS0FBSyxJQUFJLElBQUksR0FBRyxZQUFZLEtBQUssQ0FBQztBQUFBLEVBQ2hFO0FBR0EsV0FBUyxZQUFZLFVBQVU7QUFDN0IsVUFBTSxRQUFRLElBQUksZUFBZTtBQUNqQyxVQUFNLEVBQUUsaUJBQWlCLElBQUk7QUFDN0IsVUFBTUEsYUFBWTtBQUFBLE1BQ2hCLE9BQU8sVUFBVSxTQUFTO0FBQUEsTUFDMUIsUUFBUSxVQUFVLFVBQVU7QUFBQSxNQUM1QixPQUFPLFVBQVUsU0FBUztBQUFBLElBQzVCO0FBQ0EsUUFBSSxDQUFDLGtCQUFrQjtBQUNyQixhQUFPQSxXQUFVLFFBQVE7QUFBQSxJQUMzQjtBQUNBLFdBQU9BLFdBQVUsZ0JBQWdCO0FBQUEsRUFDbkM7QUFDQSxXQUFTLG9CQUFvQixrQkFBa0I7QUFDN0MsVUFBTSxlQUFlLFlBQVksZ0JBQWdCO0FBQ2pELFVBQU0sZUFBZSxhQUFhLFFBQVEsTUFBTSxFQUFFO0FBQ2xELFdBQU8sRUFBRSxlQUFlLGNBQWMsd0JBQXdCLGFBQWE7QUFBQSxFQUM3RTtBQUNBLFdBQVMseUJBQXlCLEtBQUs7QUFDckMsV0FBTyxPQUFPLFFBQVEsR0FBRyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLE1BQU07QUFDdkQsVUFBSSxHQUFHLElBQUks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QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQWd1QjFCO0FBQUEsRUFDRixDQUFDO0FBMEJELE1BQUksd0JBQXdCLE1BQU07QUFBQSxJQUNoQyxtREFBbUQ7QUFDakQ7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBR0QsV0FBUyxtQkFBbUI7QUFD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LE1BQU07QUFFWixZQUFJLENBQUMsYUFBYTtBQUNoQixrQkFBUSxJQUFJO0FBQ1o7QUFBQSxRQUNGO0FBRUEsb0JBQVksTUFBTSxrQkFBa0IsT0FBTyxTQUFTO0FBQUEsTUFDdEQsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELFVBQU0sY0FBYyxNQUFNLFFBQVEsSUFBSSxRQUFRO0FBRTlDLFFBQUksY0FBYyxZQUFZLEVBQUUsTUFBTSxVQUFVO0FBQ2hELFFBQUksY0FBYyxtQkFBbUIsRUFBRSxVQUFVLElBQUksUUFBUTtBQUU3RCxXQUFPLFlBQVksT0FBTyxVQUFRLFNBQVMsSUFBSTtBQUFBLEVBQ2pEO0FBRU8sV0FBUyxtQkFBbUI7QUFDakMsVUFBTSxFQUFFLGlCQUFpQixJQUFJLElBQUksZUFBZTtBQUNoRCxRQUFJLGlCQUFpQixZQUFZLE1BQU07QUFDckMsWUFBTSxXQUFXLFVBQVUsb0JBQW9CLFFBQVE7QUFFdkQsc0JBQWdCLGdCQUFnQiw2QkFBNkIsT0FBTSxhQUFZO0FBQzdFLFlBQUksWUFBWSxTQUFTLFVBQVUsR0FBRztBQUNwQyxnQkFBTSxjQUFjLE1BQU0sc0NBQXNDLFFBQVE7QUFDeEUsMkJBQWlCLGFBQWEsUUFBUTtBQUN0QyxnQ0FBc0I7QUFBQSxRQUN4QjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELFFBQUksaUJBQWlCLFFBQVEsWUFBWTtBQUN2QyxZQUFNLFFBQVEsSUFBSSxpQkFBOEIsV0FBVztBQUUzRCxVQUFJLENBQUMsU0FBUyxNQUFNLFdBQVcsR0FBRztBQUNoQztBQUFBLE1BQ0Y7QUFFQSxZQUFNLGNBQWMsTUFBTSxzQ0FBc0MsS0FBSztBQUNyRSxZQUFNLFdBQVcsVUFBVSxvQkFBb0IsUUFBUTtBQUV2RCxVQUFJLFNBQVMsTUFBTSxTQUFTLEdBQUc7QUFDN0IseUJBQWlCLGFBQWEsUUFBUTtBQUFBLE1BQ3hDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDs7O0FDeElBLGFBQVc7QUFBQSxJQUNULFVBQVU7QUFBQSxNQUNSLGVBQWU7QUFBQSxNQUNmLGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLFFBQ2hCLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxjQUFjO0FBQUEsUUFDWiw2QkFBNkIsaUJBQWlCO0FBQUEsTUFDaEQ7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsbUJBQWlCOyIsCiAgIm5hbWVzIjogWyJ0aWxlU2l6ZXMiLCAidGlsZVNpemVzIl0KfQo=
