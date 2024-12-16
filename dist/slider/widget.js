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
  function getTileSizeByWidget(tileSizeSettings2) {
    const sizeWithUnit = getTileSize(tileSizeSettings2);
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
    const { tileSizeSettings: tileSizeSettings2, cssVariables } = features || {};
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
      ...getTileSizeByWidget(tileSizeSettings2),
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

  // widgets/slider/utils.ts
  function getTileSizeUnitless(settings) {
    const tileSizeConfig = getTileSizeByWidget(settings);
    return Number(tileSizeConfig["--tile-size-unitless"]);
  }
  function gridGap(containerElement) {
    const parsed = parseInt(getComputedStyle(containerElement).gap);
    return isNaN(parsed) ? 0 : parsed;
  }
  function getTopElementHeight(containerElement, defaultValue) {
    const elements = Array.from(containerElement.querySelectorAll(".ugc-tile"));
    const topElement = elements.find((element) => {
      const top = element.getBoundingClientRect().top;
      return top > 0 && top < 50;
    });
    return topElement?.getBoundingClientRect().height || defaultValue;
  }
  function getRenderMode(element) {
    return getComputedStyle(element).getPropertyValue("--render-mode");
  }
  function getSliderElement() {
    return sdk.querySelector(".slider-inline");
  }
  function getTileContainerElement() {
    return sdk.querySelector(".slider-inline .ugc-tiles");
  }
  function getTileElements() {
    return sdk.querySelectorAll(".slider-inline .ugc-tiles > .ugc-tile");
  }

  // widgets/slider/slider-design.ts
  var COLUMN_INDENT_CLASS = "grid-column-indent";
  function getColumnCount(settings) {
    const availableWidth = window.screen.availWidth * 95 / 100;
    const tileRenderingWidth = getTileSizeUnitless(settings) * 2 + 20;
    return Math.floor(availableWidth / tileRenderingWidth);
  }
  function markTileFromInitialRowOffsets(tileElement, indentedOffsets, verticalRender) {
    const actualLeft = Math.floor(tileElement.getBoundingClientRect().left);
    if (indentedOffsets.includes(actualLeft)) {
      toggleIndentAttribute(tileElement, true, verticalRender);
    } else {
      toggleIndentAttribute(tileElement, false, verticalRender);
    }
  }
  function toggleIndentAttribute(tileElement, flag, verticalRender) {
    tileElement?.toggleAttribute(COLUMN_INDENT_CLASS, flag);
    if (verticalRender) {
      tileElement?.nextElementSibling?.toggleAttribute(COLUMN_INDENT_CLASS, flag);
    }
  }
  function getIndentationProps(settings) {
    const targetColumnCount = getColumnCount(settings);
    return {
      targetColumnCount,
      totalExpectedIndentedColumns: Math.floor(targetColumnCount / 2),
      totalTileWidth: getTileSizeUnitless(settings) * 2 + 20
    };
  }
  function markColumnsForIndent(settings) {
    const sliderInline = sdk.querySelector(".slider-inline");
    const tilesContainer = sliderInline.querySelector(".ugc-tiles");
    const tiles = tilesContainer.querySelectorAll(".ugc-tile");
    const leftOffset = tiles[0].getBoundingClientRect().left;
    const { targetColumnCount, totalExpectedIndentedColumns, totalTileWidth } = getIndentationProps(settings);
    const indentedOffsets = [];
    let skipNext = false;
    let columnCounter = 0;
    let columnCount = targetColumnCount;
    let verticalTileCounter = 0;
    tiles.forEach((tileElement) => {
      const isRowSpanCurrent = getComputedStyle(tileElement).gridRow === "span 2";
      const isRowSpanNext = tileElement.nextElementSibling ? getComputedStyle(tileElement.nextElementSibling).gridRow === "span 2" : false;
      const verticalRender = isRowSpanCurrent && isRowSpanNext;
      if (skipNext) {
        skipNext = false;
        return;
      }
      if (columnCounter === 0) {
        columnCount = targetColumnCount - verticalTileCounter;
        verticalTileCounter = 0;
      }
      columnCounter++;
      if (columnCounter > 0 && (columnCounter % 2 === 0 || indentedOffsets.length === totalExpectedIndentedColumns) && columnCounter <= columnCount) {
        if (isRowSpanCurrent && !isRowSpanNext) {
          return;
        }
        if (!skipNext) {
          const actualLeft = Math.floor(tileElement.getBoundingClientRect().left);
          const expectedLeft = Math.floor(leftOffset + totalTileWidth * (columnCounter - 1));
          if (indentedOffsets.length === totalExpectedIndentedColumns) {
            markTileFromInitialRowOffsets(tileElement, indentedOffsets, verticalRender);
          } else if (actualLeft === expectedLeft) {
            toggleIndentAttribute(tileElement, true, verticalRender);
            if (indentedOffsets.length < totalExpectedIndentedColumns) {
              indentedOffsets.push(actualLeft);
            }
          } else {
            toggleIndentAttribute(tileElement, false, verticalRender);
          }
        }
      } else {
        toggleIndentAttribute(tileElement, false, verticalRender);
      }
      if (verticalRender) {
        skipNext = true;
        verticalTileCounter++;
      }
      if (columnCounter === columnCount) {
        columnCounter = 0;
      }
    });
  }

  // widgets/slider/navigator.ts
  function navigator_default(settings) {
    const sliderElement = getSliderElement();
    const tilesContainerElement = getTileContainerElement();
    const scrollHistory = [];
    const tileSizeUnitless = getTileSizeUnitless(settings);
    const defaultBlockHeight = isNaN(tileSizeUnitless) ? 220 : tileSizeUnitless;
    const scrollerHandler = scroller(sliderElement);
    const swipeDetectHandler = swipeDetect(tilesContainerElement, (direction) => {
      if (direction === "up") {
        scrollDown();
      } else if (direction === "down") {
        scrollUp();
      }
    });
    const screenResizeObserver = new ResizeObserver(
      () => requestAnimationFrame(() => {
        tilesContainerElement.scrollTop = 0;
        if (getRenderMode(sliderElement) === "desktop") {
          controlNavigationButtonVisibility();
          swipeDetectHandler.unregister();
          scrollerHandler.register();
        } else {
          swipeDetectHandler.register();
          scrollerHandler.unregister();
        }
      })
    );
    screenResizeObserver.observe(tilesContainerElement);
    controlNavigationButtonVisibility();
    function scroller(el) {
      const sliderScrollUpButton = el.querySelector("#scroll-up");
      const sliderScrollDownButton = el.querySelector("#scroll-down");
      if (!sliderScrollUpButton) {
        throw new Error("Slider Tiles Scroll Up Button not found");
      }
      if (!sliderScrollDownButton) {
        throw new Error("Slider Tiles Scroll Down Button not found");
      }
      function scrollUpEventHandler(event2) {
        event2.preventDefault();
        event2.stopImmediatePropagation();
        event2.stopPropagation();
        if (tilesContainerElement.scrollTop > 0) {
          scrollUp();
        }
      }
      function scrollDownEventHandler(event2) {
        event2.preventDefault();
        event2.stopImmediatePropagation();
        event2.stopPropagation();
        scrollDown();
      }
      function register() {
        toggleScrollUp("visible");
        toggleScrollDown("visible");
        sliderScrollUpButton.addEventListener("click", scrollUpEventHandler);
        sliderScrollDownButton.addEventListener("click", scrollDownEventHandler);
      }
      function unregister() {
        toggleScrollUp("hidden");
        toggleScrollDown("hidden");
        sliderScrollUpButton.removeEventListener("click", scrollUpEventHandler);
        sliderScrollDownButton.removeEventListener("click", scrollDownEventHandler);
      }
      function toggleScrollUp(visibility) {
        sliderScrollUpButton.style.visibility = visibility;
      }
      function toggleScrollDown(visibility) {
        sliderScrollDownButton.style.visibility = visibility;
      }
      return {
        register,
        unregister,
        toggleScrollUp,
        toggleScrollDown
      };
    }
    function swipeDetect(el, callback) {
      const allowedTime = 1500, threshold = 150, restraint = 100;
      let startX, startY, startTime;
      function registerTouchStart(event2) {
        requestAnimationFrame(() => {
          const touchObject = event2.changedTouches[0];
          startX = touchObject.pageX;
          startY = touchObject.pageY;
          startTime = (/* @__PURE__ */ new Date()).getTime();
          event2.preventDefault();
        });
      }
      function registerTouchEnd(event2) {
        requestAnimationFrame(() => {
          const touchObject = event2.changedTouches[0];
          const distX = touchObject.pageX - startX;
          const distY = touchObject.pageY - startY;
          const elapsedTime = (/* @__PURE__ */ new Date()).getTime() - startTime;
          if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
              callback(distX < 0 ? "left" : "right");
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
              callback(distY < 0 ? "up" : "down");
            }
          }
          event2.preventDefault();
        });
      }
      return {
        register: () => {
          el.addEventListener("touchstart", registerTouchStart, false);
          el.addEventListener("touchmove", (event2) => event2.preventDefault());
          el.addEventListener("touchend", registerTouchEnd);
        },
        unregister: () => {
          el.removeEventListener("touchstart", registerTouchStart, false);
          el.removeEventListener("touchmove", (event2) => event2.preventDefault());
          el.removeEventListener("touchend", registerTouchEnd);
        }
      };
    }
    function scrollUp() {
      tilesContainerElement.scrollTo({
        top: scrollHistory.pop(),
        left: 0,
        behavior: "smooth"
      });
      setTimeout(() => controlNavigationButtonVisibility(), 500);
    }
    function scrollDown() {
      tilesContainerElement.scrollTo({
        top: getBlockHeight(),
        left: 0,
        behavior: "smooth"
      });
      setTimeout(() => controlNavigationButtonVisibility(), 500);
    }
    function controlNavigationButtonVisibility() {
      if (getRenderMode(sliderElement) !== "desktop") {
        return;
      }
      if (tilesContainerElement.scrollTop > 0 && scrollHistory.length > 0) {
        scrollerHandler.toggleScrollUp("visible");
      } else {
        scrollerHandler.toggleScrollUp("hidden");
      }
      const offset = tilesContainerElement.scrollHeight - tilesContainerElement.scrollTop - tilesContainerElement.offsetHeight;
      if (offset === 0 || tilesContainerElement.scrollHeight > 0 && offset >= defaultBlockHeight / 2) {
        scrollerHandler.toggleScrollDown("visible");
      } else {
        scrollerHandler.toggleScrollDown("hidden");
      }
    }
    function calcHeightAndRecordHistory(value) {
      if (!scrollHistory.length) {
        scrollHistory.push(0);
        return value + gridGap(tilesContainerElement);
      } else {
        const totalHeight = tilesContainerElement.scrollTop + value + gridGap(tilesContainerElement);
        scrollHistory.push(tilesContainerElement.scrollTop);
        return totalHeight;
      }
    }
    function getBlockHeight() {
      switch (getRenderMode(sliderElement)) {
        case "mobile": {
          return calcHeightAndRecordHistory(window.screen.height ?? defaultBlockHeight);
        }
        case "tablet": {
          return calcHeightAndRecordHistory(getTopElementHeight(tilesContainerElement, defaultBlockHeight));
        }
        default:
          return calcHeightAndRecordHistory(defaultBlockHeight * 2);
      }
    }
  }

  // widgets/slider/observers.ts
  function initObservers({ settings, resizeCb, intersectionCb }) {
    const animationClasses = { up: "tile-animate-up", down: "tile-animate-down" };
    const partiallyVisibleClass = "partially-visible";
    const tilesContainerElement = getTileContainerElement();
    const sliderInlineElement = getSliderElement();
    let previousPosition = tilesContainerElement.scrollTop;
    const resizeObserver = new ResizeObserver(
      () => requestAnimationFrame(() => {
        if (getRenderMode(sliderInlineElement) === "desktop") {
          markColumnsForIndent(settings);
        } else {
          tilesIntersectionObserver.disconnect();
        }
        resizeCb?.();
      })
    );
    const tilesIntersectionObserver = new IntersectionObserver(
      (entries) => {
        filterRecentEntries(entries).forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains(partiallyVisibleClass)) {
              if (entry.intersectionRatio === 1) {
                enableAnimation(entry.target);
                entry.target.classList.remove(partiallyVisibleClass);
              }
            }
          } else if (!entry.target.classList.contains(partiallyVisibleClass)) {
            entry.target.classList.add(partiallyVisibleClass);
          }
        });
        intersectionCb?.();
        previousPosition = tilesContainerElement.scrollTop;
      },
      { root: tilesContainerElement, rootMargin: "0px", threshold: 1 }
    );
    configObserverTargets();
    function filterRecentEntries(entries) {
      const uniqueEntries = [];
      for (const entry of entries) {
        const existingIndex = uniqueEntries.findIndex((uniqEntry) => uniqEntry.target.isSameNode(entry.target));
        if (existingIndex >= 0) {
          uniqueEntries.splice(existingIndex, 1, entry);
        } else {
          uniqueEntries.push(entry);
        }
      }
      return uniqueEntries;
    }
    function enableAnimation(element) {
      if (previousPosition === tilesContainerElement.scrollTop) {
        return;
      }
      const animationClass = previousPosition < tilesContainerElement.scrollTop ? animationClasses.up : animationClasses.down;
      const removeClass = animationClass === animationClasses.up ? animationClasses.down : animationClasses.up;
      element.classList.remove(removeClass);
      if (!element.classList.contains(animationClass)) {
        element.classList.add(animationClass);
      }
    }
    function configObserverTargets() {
      configTileIntersectionTargets();
      resizeObserver.observe(tilesContainerElement);
    }
    function configTileIntersectionTargets() {
      if (getRenderMode(sliderInlineElement) === "desktop") {
        getTileElements().forEach((tile) => tilesIntersectionObserver.observe(tile));
      }
    }
    function disconnect() {
      tilesIntersectionObserver.disconnect();
      resizeObserver.disconnect();
    }
    return { configObserverTargets, configTileIntersectionTargets, disconnect };
  }

  // widgets/slider/load-slider.ts
  function loadSlider(settings) {
    const tileBlockElement = sdk.querySelector(".ugc-tile-wrapper");
    const sliderInline = sdk.querySelector(".slider-inline");
    const loadingElement = sliderInline.querySelector(".slider-loading.loading");
    const tilesContainer = sliderInline.querySelector(".ugc-tiles");
    if (!sliderInline) {
      throw new Error("Slider inline container not found");
    }
    if (!tileBlockElement) {
      throw new Error("Slider Tiles Scroll Container not found");
    }
    if (!tilesContainer) {
      throw new Error("Slider Tiles Scroll Container not found");
    }
    const style = sdk.getStyleConfig();
    const { inline_tile_size, inline_tile_margin } = style;
    tilesContainer.setAttribute("variation", inline_tile_size);
    sliderInline.parentElement?.style.setProperty("--container-width", calculateContainerWidth());
    window.CSS.registerProperty({
      name: "--tile-size-prop",
      syntax: "<length>",
      inherits: false,
      initialValue: `${getTileSizeUnitless(settings)}px`
    });
    const observers = initObservers({ settings, resizeCb: () => calculateContainerWidth() });
    navigator_default(settings);
    markColumnsForIndent(settings);
    loadingElement?.classList.add("hidden");
    function inlineTileGap() {
      const value = Number(inline_tile_margin);
      return isNaN(value) ? 10 : value;
    }
    function calculateContainerWidth() {
      const tileGap = inlineTileGap();
      const renderedTileSize = getTileSizeUnitless(settings) * 2 + tileGap * 2;
      const availableWidth = window.screen.width * 95 / 100;
      const widthAdjusted = availableWidth - availableWidth % renderedTileSize;
      const possibleColumns = Math.round(availableWidth / renderedTileSize);
      const veriticalColumnsAdjustment = tileGap * Math.round(possibleColumns / 3);
      return `${widthAdjusted + tileGap - veriticalColumnsAdjustment}px`;
    }
    function tilesUpdatedEventHandler() {
      markColumnsForIndent(settings);
      observers.configTileIntersectionTargets();
    }
    return { tilesUpdatedEventHandler };
  }

  // widgets/slider/widget.tsx
  var tileSizeSettings = {
    small: "148.34px",
    medium: "225px",
    large: "435px"
  };
  var sliderCallbacks;
  loadWidget({
    features: {
      handleLoadMore: false,
      addNewTilesAutomatically: true,
      tileSizeSettings
    },
    callbacks: {
      onLoad: [
        () => void setTimeout(() => {
          sliderCallbacks = loadSlider(tileSizeSettings);
        }, 500)
      ],
      onTilesUpdated: [() => sliderCallbacks?.tilesUpdatedEventHandler()]
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcGFja2FnZXMvd2lkZ2V0LXV0aWxzL2Rpc3QvZXNtL2luZGV4LmpzIiwgIi4uLy4uL3dpZGdldHMvc2xpZGVyL3V0aWxzLnRzIiwgIi4uLy4uL3dpZGdldHMvc2xpZGVyL3NsaWRlci1kZXNpZ24udHMiLCAiLi4vLi4vd2lkZ2V0cy9zbGlkZXIvbmF2aWdhdG9yLnRzIiwgIi4uLy4uL3dpZGdldHMvc2xpZGVyL29ic2VydmVycy50cyIsICIuLi8uLi93aWRnZXRzL3NsaWRlci9sb2FkLXNsaWRlci50cyIsICIuLi8uLi93aWRnZXRzL3NsaWRlci93aWRnZXQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJ2YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19lc20gPSAoZm4sIHJlcykgPT4gZnVuY3Rpb24gX19pbml0KCkge1xuICByZXR1cm4gZm4gJiYgKHJlcyA9ICgwLCBmbltfX2dldE93blByb3BOYW1lcyhmbilbMF1dKShmbiA9IDApKSwgcmVzO1xufTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcblxuLy8gc3JjL2xpYnMvY3NzLXZhcmlhYmxlcy50c1xuZnVuY3Rpb24gZ2V0VGlsZVNpemUoc2V0dGluZ3MpIHtcbiAgY29uc3Qgc3R5bGUgPSBzZGsuZ2V0U3R5bGVDb25maWcoKTtcbiAgY29uc3QgeyBpbmxpbmVfdGlsZV9zaXplIH0gPSBzdHlsZTtcbiAgY29uc3QgdGlsZVNpemVzID0ge1xuICAgIHNtYWxsOiBzZXR0aW5ncz8uc21hbGwgPz8gXCIxNzNweFwiLFxuICAgIG1lZGl1bTogc2V0dGluZ3M/Lm1lZGl1bSA/PyBcIjI2NS41cHhcIixcbiAgICBsYXJnZTogc2V0dGluZ3M/LmxhcmdlID8/IFwiNDAwcHhcIlxuICB9O1xuICBpZiAoIWlubGluZV90aWxlX3NpemUpIHtcbiAgICByZXR1cm4gdGlsZVNpemVzW1wibWVkaXVtXCJdO1xuICB9XG4gIHJldHVybiB0aWxlU2l6ZXNbaW5saW5lX3RpbGVfc2l6ZV07XG59XG5mdW5jdGlvbiBnZXRUaWxlU2l6ZUJ5V2lkZ2V0KHRpbGVTaXplU2V0dGluZ3MpIHtcbiAgY29uc3Qgc2l6ZVdpdGhVbml0ID0gZ2V0VGlsZVNpemUodGlsZVNpemVTZXR0aW5ncyk7XG4gIGNvbnN0IHNpemVVbml0bGVzcyA9IHNpemVXaXRoVW5pdC5yZXBsYWNlKFwicHhcIiwgXCJcIik7XG4gIHJldHVybiB7IFwiLS10aWxlLXNpemVcIjogc2l6ZVdpdGhVbml0LCBcIi0tdGlsZS1zaXplLXVuaXRsZXNzXCI6IHNpemVVbml0bGVzcyB9O1xufVxuZnVuY3Rpb24gdHJpbUhhc2hWYWx1ZXNGcm9tT2JqZWN0KG9iaikge1xuICByZXR1cm4gT2JqZWN0LmVudHJpZXMob2JqKS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgYWNjW2tleV0gPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUuc3RhcnRzV2l0aChcIiNcIikgPyB2YWx1ZS5yZXBsYWNlKFwiI1wiLCBcIlwiKSA6IHZhbHVlO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn1cbmZ1bmN0aW9uIGdldENTU1ZhcmlhYmxlcyhmZWF0dXJlcykge1xuICBjb25zdCB7IHRpbGVTaXplU2V0dGluZ3MsIGNzc1ZhcmlhYmxlcyB9ID0gZmVhdHVyZXMgfHwge307XG4gIGNvbnN0IHN0eWxlcyA9IHNkay5nZXRTdHlsZUNvbmZpZygpO1xuICBjb25zdCBpbmxpbmVUaWxlU2V0dGluZ3MgPSBzZGsuZ2V0SW5saW5lVGlsZUNvbmZpZygpO1xuICBjb25zdCB7XG4gICAgd2lkZ2V0X2JhY2tncm91bmQsXG4gICAgdGlsZV9iYWNrZ3JvdW5kLFxuICAgIHRleHRfdGlsZV9iYWNrZ3JvdW5kLFxuICAgIHRleHRfdGlsZV9saW5rX2NvbG9yLFxuICAgIHRleHRfdGlsZV91c2VyX2hhbmRsZV9mb250X2NvbG9yLFxuICAgIHNob3BzcG90X2J0bl9iYWNrZ3JvdW5kLFxuICAgIHNob3BzcG90X2J0bl9mb250X2NvbG9yLFxuICAgIG1hcmdpbixcbiAgICB0ZXh0X3RpbGVfZm9udF9zaXplLFxuICAgIHRleHRfdGlsZV91c2VyX25hbWVfZm9udF9zaXplLFxuICAgIHRleHRfdGlsZV91c2VyX2hhbmRsZV9mb250X3NpemUsXG4gICAgc2hvcHNwb3RfaWNvbixcbiAgICBleHBhbmRlZF90aWxlX2JvcmRlcl9yYWRpdXMsXG4gICAgaW5saW5lX3RpbGVfYm9yZGVyX3JhZGl1cyxcbiAgICBpbmxpbmVfdGlsZV9tYXJnaW4sXG4gICAgc2hvcHNwb3RfYnRuX2ZvbnRfc2l6ZSxcbiAgICB0ZXh0X3RpbGVfZm9udF9jb2xvcixcbiAgICB0ZXh0X3RpbGVfdXNlcl9uYW1lX2ZvbnRfY29sb3JcbiAgfSA9IHRyaW1IYXNoVmFsdWVzRnJvbU9iamVjdChzdHlsZXMpO1xuICBjb25zdCB7IHNob3dfdGFnczogc2hvd190YWdzX2V4cGFuZGVkIH0gPSBzZGsuZ2V0RXhwYW5kZWRUaWxlQ29uZmlnKCk7XG4gIGNvbnN0IHsgc2hvd19jYXB0aW9uLCBzaG93X3RhZ3M6IHNob3dfdGFnc19pbmxpbmUsIHNob3dfc2hvcHNwb3RzLCBzaG93X3RpbWVzdGFtcCwgc2hvd19zaGFyaW5nIH0gPSBpbmxpbmVUaWxlU2V0dGluZ3M7XG4gIGNvbnN0IG11dGF0ZWRDc3NWYXJpYWJsZXMgPSB7XG4gICAgLi4uY3NzVmFyaWFibGVzLFxuICAgIFwiLS13aWRnZXQtYmFja2dyb3VuZFwiOiBgIyR7d2lkZ2V0X2JhY2tncm91bmR9YCxcbiAgICBcIi0taW5saW5lLXRpbGUtYmFja2dyb3VuZFwiOiBgIyR7dGlsZV9iYWNrZ3JvdW5kfWAsXG4gICAgXCItLXRleHQtdGlsZS1iYWNrZ3JvdW5kXCI6IGAjJHt0ZXh0X3RpbGVfYmFja2dyb3VuZH1gLFxuICAgIFwiLS1zaG9wc3BvdC1idG4tYmFja2dyb3VuZFwiOiBgIyR7c2hvcHNwb3RfYnRuX2JhY2tncm91bmR9YCxcbiAgICBcIi0tY3RhLWJ1dHRvbi1iYWNrZ3JvdW5kLWNvbG9yXCI6IGAjJHtzaG9wc3BvdF9idG5fYmFja2dyb3VuZH1gLFxuICAgIFwiLS10aWxlLXRhZy1iYWNrZ3JvdW5kXCI6IGAjYmNiYmJjYCxcbiAgICBcIi0tdGV4dC10aWxlLWxpbmstY29sb3JcIjogYCMke3RleHRfdGlsZV9saW5rX2NvbG9yfWAsXG4gICAgXCItLXRleHQtdGlsZS11c2VyLWhhbmRsZS1mb250LWNvbG9yXCI6IGAjJHt0ZXh0X3RpbGVfdXNlcl9oYW5kbGVfZm9udF9jb2xvcn1gLFxuICAgIFwiLS1zaG9wc3BvdC1idG4tZm9udC1jb2xvclwiOiBgIyR7c2hvcHNwb3RfYnRuX2ZvbnRfY29sb3J9YCxcbiAgICBcIi0tbWFyZ2luXCI6IGAke21hcmdpbiA/IG1hcmdpbiA6IDB9cHhgLFxuICAgIFwiLS10ZXh0LXRpbGUtZm9udC1zaXplXCI6IGAke3RleHRfdGlsZV9mb250X3NpemV9cHhgLFxuICAgIFwiLS10ZXh0LWNhcHRpb24tcGFyYWdyYXBoLWZvbnQtc2l6ZVwiOiBgJHt0ZXh0X3RpbGVfZm9udF9zaXplIHx8IDEyfXB4YCxcbiAgICBcIi0tdGV4dC10aWxlLXVzZXItbmFtZS1mb250LXNpemVcIjogYCR7dGV4dF90aWxlX3VzZXJfbmFtZV9mb250X3NpemV9cHhgLFxuICAgIFwiLS10ZXh0LXRpbGUtdXNlci1uYW1lLWZvbnQtY29sb3JcIjogYCMke3RleHRfdGlsZV91c2VyX25hbWVfZm9udF9jb2xvcn1gLFxuICAgIFwiLS10ZXh0LXRpbGUtdXNlci1oYW5kbGUtZm9udC1zaXplXCI6IGAke3RleHRfdGlsZV91c2VyX2hhbmRsZV9mb250X3NpemUgfHwgMTJ9cHhgLFxuICAgIFwiLS10ZXh0LXRpbGUtZm9udC1jb2xvclwiOiBgIyR7dGV4dF90aWxlX2ZvbnRfY29sb3J9YCxcbiAgICBcIi0tc2hvdy1jYXB0aW9uXCI6IGAke3Nob3dfY2FwdGlvbiA/IFwiYmxvY2tcIiA6IFwibm9uZVwifWAsXG4gICAgXCItLXNob3ctY2FwdGlvbi13ZWJraXRcIjogYCR7c2hvd19jYXB0aW9uID8gXCItd2Via2l0LWJveFwiIDogXCJub25lXCJ9YCxcbiAgICBcIi0tc2hvcHNwb3QtaWNvblwiOiBzaG9wc3BvdF9pY29uID8gc2hvcHNwb3RfaWNvbiA6IGAjMDAwYCxcbiAgICBcIi0tdGFncy1nYXBcIjogYDRweGAsXG4gICAgLy8gVE9ETyAtIFJlcGxhY2UgdGhlc2Ugd2l0aCBjdGFfYnV0dG9uX2ZvbnRfY29sb3IgYW5kIGN0YV9idXR0b25fZm9udF9zaXplIEBQZW5nIFpob3VcbiAgICBcIi0tY3RhLWJ1dHRvbi1mb250LWNvbG9yXCI6IGAjJHtzaG9wc3BvdF9idG5fZm9udF9jb2xvcn1gLFxuICAgIFwiLS1jdGEtYnV0dG9uLWZvbnQtc2l6ZVwiOiBgJHtzaG9wc3BvdF9idG5fZm9udF9zaXplfXB4YCxcbiAgICBcIi0tZXhwYW5kZWQtdGlsZS1ib3JkZXItcmFkaXVzXCI6IGAke2V4cGFuZGVkX3RpbGVfYm9yZGVyX3JhZGl1c31weGAsXG4gICAgLi4uZ2V0VGlsZVNpemVCeVdpZGdldCh0aWxlU2l6ZVNldHRpbmdzKSxcbiAgICBcIi0taW5saW5lLXRpbGUtYm9yZGVyLXJhZGl1c1wiOiBgJHtpbmxpbmVfdGlsZV9ib3JkZXJfcmFkaXVzfXB4YCxcbiAgICBcIi0taW5saW5lLXRpbGUtbWFyZ2luXCI6IGAke2lubGluZV90aWxlX21hcmdpbn1weGAsXG4gICAgXCItLXRhZ3MtZGlzcGxheS1pbmxpbmVcIjogYCR7c2hvd190YWdzX2lubGluZSA/IFwiZmxleFwiIDogXCJub25lXCJ9YCxcbiAgICBcIi0tdGFncy1kaXNwbGF5LWV4cGFuZGVkXCI6IGAke3Nob3dfdGFnc19leHBhbmRlZCA/IFwiZmxleFwiIDogXCJub25lXCJ9YCxcbiAgICBcIi0tc2hvcHNwb3RzLWRpc3BsYXlcIjogYCR7c2hvd19zaG9wc3BvdHMgPyBcImJsb2NrXCIgOiBcIm5vbmVcIn1gLFxuICAgIFwiLS10aW1lcGhyYXNlLWRpc3BsYXlcIjogYCR7c2hvd190aW1lc3RhbXAgPyBcImJsb2NrXCIgOiBcIm5vbmVcIn1gLFxuICAgIFwiLS1zaGFyZS1pY29uLWRpc3BsYXlcIjogYCR7c2hvd19zaGFyaW5nID8gXCJpbmxpbmUtYmxvY2tcIiA6IFwibm9uZVwifWBcbiAgfTtcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKG11dGF0ZWRDc3NWYXJpYWJsZXMpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiBgJHtrZXl9OiAke3ZhbHVlfTtgKS5qb2luKFwiXFxuXCIpO1xufVxudmFyIGluaXRfY3NzX3ZhcmlhYmxlcyA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jc3MtdmFyaWFibGVzLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9qc3gtaHRtbC50c1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgLi4uY2hpbGRyZW4pIHtcbiAgaWYgKHR5cGVvZiB0eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gY2hpbGRyZW4/Lmxlbmd0aCA/IHR5cGUoeyAuLi5wcm9wcywgY2hpbGRyZW4gfSkgOiB0eXBlKHByb3BzKTtcbiAgfVxuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0eXBlKTtcbiAgYXBwbHlQcm9wZXJ0aWVzKGVsZW1lbnQsIHByb3BzID8/IHt9KTtcbiAgY2hpbGRyZW4/LmZvckVhY2goKGNoaWxkKSA9PiBhcHBlbmRDaGlsZChlbGVtZW50LCBjaGlsZCkpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50KGFyZykge1xuICBjb25zdCB7IGNoaWxkcmVuLCAuLi5wcm9wcyB9ID0gYXJnID8/IHsgY2hpbGRyZW46IFtdIH07XG4gIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBPYmplY3QuYXNzaWduKGZyYWdtZW50LCBwcm9wcyk7XG4gIGNoaWxkcmVuPy5mb3JFYWNoKChjaGlsZCkgPT4gYXBwZW5kQ2hpbGQoZnJhZ21lbnQsIGNoaWxkKSk7XG4gIHJldHVybiBmcmFnbWVudDtcbn1cbmZ1bmN0aW9uIGlzRXZlbnRMaXN0ZW5lcihrZXksIHZhbHVlKSB7XG4gIHJldHVybiBrZXkuc3RhcnRzV2l0aChcIm9uXCIpICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiO1xufVxuZnVuY3Rpb24gYXBwbHlQcm9wZXJ0aWVzKGVsZW1lbnQsIHByb3BzKSB7XG4gIE9iamVjdC5lbnRyaWVzKHByb3BzKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAoaXNFdmVudExpc3RlbmVyKGtleSwgdmFsdWUpKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoa2V5LnNsaWNlKDIpLnRvTG93ZXJDYXNlKCksIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgbm9ybUtleSA9IGFsaWFzZXNba2V5XSA/PyBrZXk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShub3JtS2V5LCBTdHJpbmcodmFsdWUpKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gYXBwZW5kQ2hpbGQoZWxlbWVudCwgY2hpbGQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSB7XG4gICAgY2hpbGQuZm9yRWFjaCgoYykgPT4gYXBwZW5kQ2hpbGQoZWxlbWVudCwgYykpO1xuICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgIEFycmF5LmZyb20oY2hpbGQuY2hpbGRyZW4pLmZvckVhY2goKGMpID0+IGVsZW1lbnQuYXBwZW5kQ2hpbGQoYykpO1xuICB9IGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgfSBlbHNlIGlmIChjaGlsZCAhPT0gdm9pZCAwICYmIGNoaWxkICE9PSBudWxsICYmIGNoaWxkICE9PSBmYWxzZSkge1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoU3RyaW5nKGNoaWxkKSkpO1xuICB9XG59XG52YXIgYWxpYXNlcztcbnZhciBpbml0X2pzeF9odG1sID0gX19lc20oe1xuICBcInNyYy9saWJzL2pzeC1odG1sLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgYWxpYXNlcyA9IHtcbiAgICAgIGNsYXNzTmFtZTogXCJjbGFzc1wiLFxuICAgICAgaHRtbEZvcjogXCJmb3JcIlxuICAgIH07XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy90aWxlLmxpYi50c1xuZnVuY3Rpb24gaGFuZGxlVGlsZUNsaWNrKGUsIHdpZGdldFVybCkge1xuICBjb25zdCB1Z2NUaWxlcyA9IHNkay50aWxlcy50aWxlcztcbiAgY29uc3QgY2xpY2tlZEVsZW1lbnQgPSBlLnRhcmdldDtcbiAgY29uc3QgY2xpY2tlZFRpbGUgPSBjbGlja2VkRWxlbWVudC5jbG9zZXN0KFwiLnVnYy10aWxlXCIpO1xuICBpZiAoIWNsaWNrZWRUaWxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgY2xpY2tlZCB0aWxlXCIpO1xuICB9XG4gIGNvbnN0IHRpbGVJZCA9IGNsaWNrZWRUaWxlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gIGlmICghdGlsZUlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgdGlsZSBJRFwiKTtcbiAgfVxuICBjb25zdCB0aWxlRGF0YSA9IHVnY1RpbGVzW3RpbGVJZF07XG4gIGNvbnN0IHRpbGVMaW5rID0gd2lkZ2V0VXJsIHx8IHRpbGVEYXRhLm9yaWdpbmFsX3VybCB8fCB0aWxlRGF0YS5vcmlnaW5hbF9saW5rO1xuICBpZiAodGlsZUxpbmspIHtcbiAgICB3aW5kb3cub3Blbih0aWxlTGluaywgXCJfYmxhbmtcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFRpbWVwaHJhc2UodGltZXN0YW1wKSB7XG4gIGlmICghdGltZXN0YW1wKSB7XG4gICAgcmV0dXJuIFwianVzdCBub3dcIjtcbiAgfVxuICBjb25zdCBub3cyID0gTWF0aC5yb3VuZCgoLyogQF9fUFVSRV9fICovIG5ldyBEYXRlKCkpLmdldFRpbWUoKSAvIDFlMyk7XG4gIGNvbnN0IHRoZW4gPSBNYXRoLnJvdW5kKHRpbWVzdGFtcCk7XG4gIGlmIChpc05hTih0aGVuKSkge1xuICAgIHJldHVybiBcImEgd2hpbGUgYWdvXCI7XG4gIH1cbiAgY29uc3QgZGlmZiA9IG5vdzIgLSB0aGVuO1xuICBsZXQgdGltZU51bWJlciA9IGRpZmY7XG4gIGxldCB0aW1lV29yZCA9IFwiXCI7XG4gIGlmIChkaWZmID49IDI1OTJlMykge1xuICAgIHRpbWVOdW1iZXIgPSBNYXRoLnJvdW5kKGRpZmYgLyAyNTkyZTMpO1xuICAgIHRpbWVXb3JkID0gXCJtb250aFwiO1xuICB9IGVsc2UgaWYgKGRpZmYgPj0gNjA0ODAwKSB7XG4gICAgdGltZU51bWJlciA9IE1hdGgucm91bmQoZGlmZiAvIDYwNDgwMCk7XG4gICAgdGltZVdvcmQgPSBcIndlZWtcIjtcbiAgfSBlbHNlIGlmIChkaWZmID49IDg2NDAwKSB7XG4gICAgdGltZU51bWJlciA9IE1hdGgucm91bmQoZGlmZiAvIDg2NDAwKTtcbiAgICB0aW1lV29yZCA9IFwiZGF5XCI7XG4gIH0gZWxzZSBpZiAoZGlmZiA+PSAzNjAwKSB7XG4gICAgdGltZU51bWJlciA9IE1hdGgucm91bmQoZGlmZiAvIDM2MDApO1xuICAgIHRpbWVXb3JkID0gXCJob3VyXCI7XG4gIH0gZWxzZSBpZiAoZGlmZiA+PSA2MCkge1xuICAgIHRpbWVOdW1iZXIgPSBNYXRoLnJvdW5kKGRpZmYgLyA2MCk7XG4gICAgdGltZVdvcmQgPSBcIm1pbnV0ZVwiO1xuICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XG4gICAgdGltZU51bWJlciA9IGRpZmY7XG4gICAgdGltZVdvcmQgPSBcInNlY29uZFwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBcImp1c3Qgbm93XCI7XG4gIH1cbiAgaWYgKHRpbWVOdW1iZXIgIT09IDEpIHtcbiAgICB0aW1lV29yZCArPSBcInNcIjtcbiAgfVxuICByZXR1cm4gdGltZU51bWJlciArIFwiIFwiICsgdGltZVdvcmQgKyBcIiBhZ29cIjtcbn1cbnZhciBpbml0X3RpbGVfbGliID0gX19lc20oe1xuICBcInNyYy9saWJzL3RpbGUubGliLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy93aWRnZXQuY29tcG9uZW50cy50c1xuZnVuY3Rpb24gbG9hZEV4cGFuZFNldHRpbmdDb21wb25lbnRzKCkge1xuICBjb25zdCB7IHNob3dfc2hvcHNwb3RzLCBzaG93X3Byb2R1Y3RzLCBzaG93X2FkZF90b19jYXJ0IH0gPSBzZGsuZ2V0RXhwYW5kZWRUaWxlQ29uZmlnKCk7XG4gIGlmIChzaG93X3Nob3BzcG90cykge1xuICAgIHNkay5hZGRMb2FkZWRDb21wb25lbnRzKFtcInNob3BzcG90c1wiXSk7XG4gIH1cbiAgc2RrLmFkZExvYWRlZENvbXBvbmVudHMoW1wiZXhwYW5kZWQtdGlsZVwiXSk7XG4gIGlmIChzaG93X3Byb2R1Y3RzKSB7XG4gICAgc2RrLmFkZExvYWRlZENvbXBvbmVudHMoW1wicHJvZHVjdHNcIl0pO1xuICB9XG4gIGlmIChzaG93X2FkZF90b19jYXJ0KSB7XG4gICAgc2RrLmFkZExvYWRlZENvbXBvbmVudHMoW1wiYWRkLXRvLWNhcnRcIl0pO1xuICB9XG59XG52YXIgaW5pdF93aWRnZXRfY29tcG9uZW50cyA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy93aWRnZXQuY29tcG9uZW50cy50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvd2lkZ2V0LmxheW91dC50c1xuZnVuY3Rpb24gYWRkQ1NTVmFyaWFibGVzVG9QbGFjZW1lbnQoY3NzVmFyaWFibGVzKSB7XG4gIGNvbnN0IHNoYWRvd1Jvb3QgPSBzZGsucGxhY2VtZW50LmdldFNoYWRvd1Jvb3QoKTtcbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIHN0eWxlLmlubmVySFRNTCA9IGBcbiAgICAgIDpob3N0IHtcbiAgICAgICAgICAke2Nzc1ZhcmlhYmxlc31cbiAgICAgIH1gO1xuICBzaGFkb3dSb290LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbmZ1bmN0aW9uIGlzRW5hYmxlZCgpIHtcbiAgY29uc3QgeyBlbmFibGVkIH0gPSBzZGsuZ2V0V2lkZ2V0T3B0aW9ucygpO1xuICByZXR1cm4gZW5hYmxlZCAmJiBoYXNNaW5pbXVtVGlsZXNSZXF1aXJlZCgpO1xufVxuZnVuY3Rpb24gaGFzTWluaW11bVRpbGVzUmVxdWlyZWQoKSB7XG4gIGNvbnN0IHsgbWluaW1hbF90aWxlcyB9ID0gc2RrLmdldFN0eWxlQ29uZmlnKCk7XG4gIGNvbnN0IG1pbmltYWxUaWxlcyA9IHBhcnNlSW50KG1pbmltYWxfdGlsZXMpO1xuICBpZiAobWluaW1hbFRpbGVzICYmIG1pbmltYWxUaWxlcyA+IDApIHtcbiAgICBjb25zdCB0aWxlcyA9IHNkay5xdWVyeVNlbGVjdG9yQWxsKFwiLnVnYy10aWxlXCIpO1xuICAgIGlmICh0aWxlcyAmJiB0aWxlcy5sZW5ndGggPj0gbWluaW1hbFRpbGVzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBOb3QgZW5vdWdoIHRpbGVzIHRvIHJlbmRlciB3aWRnZXQuIEV4cGVjdGVkICR7bWluaW1hbFRpbGVzfSBidXQgZm91bmQgJHt0aWxlcy5sZW5ndGh9YCk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG52YXIgaW5pdF93aWRnZXRfbGF5b3V0ID0gX19lc20oe1xuICBcInNyYy9saWJzL3dpZGdldC5sYXlvdXQudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL3Nzci13aW5kb3cuZXNtLm1qc1xuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiBcImNvbnN0cnVjdG9yXCIgaW4gb2JqICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xufVxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCwgc3JjKSB7XG4gIGlmICh0YXJnZXQgPT09IHZvaWQgMCkge1xuICAgIHRhcmdldCA9IHt9O1xuICB9XG4gIGlmIChzcmMgPT09IHZvaWQgMCkge1xuICAgIHNyYyA9IHt9O1xuICB9XG4gIE9iamVjdC5rZXlzKHNyYykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXRba2V5XSA9PT0gXCJ1bmRlZmluZWRcIikgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGlmIChpc09iamVjdChzcmNba2V5XSkgJiYgaXNPYmplY3QodGFyZ2V0W2tleV0pICYmIE9iamVjdC5rZXlzKHNyY1trZXldKS5sZW5ndGggPiAwKSB7XG4gICAgICBleHRlbmQodGFyZ2V0W2tleV0sIHNyY1trZXldKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gZ2V0RG9jdW1lbnQoKSB7XG4gIGNvbnN0IGRvYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiA/IGRvY3VtZW50IDoge307XG4gIGV4dGVuZChkb2MsIHNzckRvY3VtZW50KTtcbiAgcmV0dXJuIGRvYztcbn1cbmZ1bmN0aW9uIGdldFdpbmRvdygpIHtcbiAgY29uc3Qgd2luID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9O1xuICBleHRlbmQod2luLCBzc3JXaW5kb3cpO1xuICByZXR1cm4gd2luO1xufVxudmFyIHNzckRvY3VtZW50LCBzc3JXaW5kb3c7XG52YXIgaW5pdF9zc3Jfd2luZG93X2VzbSA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9zc3Itd2luZG93LmVzbS5tanNcIigpIHtcbiAgICBzc3JEb2N1bWVudCA9IHtcbiAgICAgIGJvZHk6IHt9LFxuICAgICAgYWRkRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgIH0sXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyKCkge1xuICAgICAgfSxcbiAgICAgIGFjdGl2ZUVsZW1lbnQ6IHtcbiAgICAgICAgYmx1cigpIHtcbiAgICAgICAgfSxcbiAgICAgICAgbm9kZU5hbWU6IFwiXCJcbiAgICAgIH0sXG4gICAgICBxdWVyeVNlbGVjdG9yKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgICBxdWVyeVNlbGVjdG9yQWxsKCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9LFxuICAgICAgZ2V0RWxlbWVudEJ5SWQoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIGNyZWF0ZUV2ZW50KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluaXRFdmVudCgpIHtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY3JlYXRlRWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgICAgY2hpbGROb2RlczogW10sXG4gICAgICAgICAgc3R5bGU6IHt9LFxuICAgICAgICAgIHNldEF0dHJpYnV0ZSgpIHtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lKCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBjcmVhdGVFbGVtZW50TlMoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0sXG4gICAgICBpbXBvcnROb2RlKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgICBsb2NhdGlvbjoge1xuICAgICAgICBoYXNoOiBcIlwiLFxuICAgICAgICBob3N0OiBcIlwiLFxuICAgICAgICBob3N0bmFtZTogXCJcIixcbiAgICAgICAgaHJlZjogXCJcIixcbiAgICAgICAgb3JpZ2luOiBcIlwiLFxuICAgICAgICBwYXRobmFtZTogXCJcIixcbiAgICAgICAgcHJvdG9jb2w6IFwiXCIsXG4gICAgICAgIHNlYXJjaDogXCJcIlxuICAgICAgfVxuICAgIH07XG4gICAgc3NyV2luZG93ID0ge1xuICAgICAgZG9jdW1lbnQ6IHNzckRvY3VtZW50LFxuICAgICAgbmF2aWdhdG9yOiB7XG4gICAgICAgIHVzZXJBZ2VudDogXCJcIlxuICAgICAgfSxcbiAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgIGhhc2g6IFwiXCIsXG4gICAgICAgIGhvc3Q6IFwiXCIsXG4gICAgICAgIGhvc3RuYW1lOiBcIlwiLFxuICAgICAgICBocmVmOiBcIlwiLFxuICAgICAgICBvcmlnaW46IFwiXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIlwiLFxuICAgICAgICBwcm90b2NvbDogXCJcIixcbiAgICAgICAgc2VhcmNoOiBcIlwiXG4gICAgICB9LFxuICAgICAgaGlzdG9yeToge1xuICAgICAgICByZXBsYWNlU3RhdGUoKSB7XG4gICAgICAgIH0sXG4gICAgICAgIHB1c2hTdGF0ZSgpIHtcbiAgICAgICAgfSxcbiAgICAgICAgZ28oKSB7XG4gICAgICAgIH0sXG4gICAgICAgIGJhY2soKSB7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBDdXN0b21FdmVudDogZnVuY3Rpb24gQ3VzdG9tRXZlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgIH0sXG4gICAgICBnZXRDb21wdXRlZFN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGdldFByb3BlcnR5VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgSW1hZ2UoKSB7XG4gICAgICB9LFxuICAgICAgRGF0ZSgpIHtcbiAgICAgIH0sXG4gICAgICBzY3JlZW46IHt9LFxuICAgICAgc2V0VGltZW91dCgpIHtcbiAgICAgIH0sXG4gICAgICBjbGVhclRpbWVvdXQoKSB7XG4gICAgICB9LFxuICAgICAgbWF0Y2hNZWRpYSgpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSxcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcbiAgICAgIH0sXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShpZCkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvdXRpbHMubWpzXG5mdW5jdGlvbiBjbGFzc2VzVG9Ub2tlbnMoY2xhc3NlczIpIHtcbiAgaWYgKGNsYXNzZXMyID09PSB2b2lkIDApIHtcbiAgICBjbGFzc2VzMiA9IFwiXCI7XG4gIH1cbiAgcmV0dXJuIGNsYXNzZXMyLnRyaW0oKS5zcGxpdChcIiBcIikuZmlsdGVyKChjKSA9PiAhIWMudHJpbSgpKTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZVByb3BzKG9iaikge1xuICBjb25zdCBvYmplY3QgPSBvYmo7XG4gIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIG9iamVjdFtrZXldID0gbnVsbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBkZWxldGUgb2JqZWN0W2tleV07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBuZXh0VGljayhjYWxsYmFjaywgZGVsYXkpIHtcbiAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHtcbiAgICBkZWxheSA9IDA7XG4gIH1cbiAgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIGRlbGF5KTtcbn1cbmZ1bmN0aW9uIG5vdygpIHtcbiAgcmV0dXJuIERhdGUubm93KCk7XG59XG5mdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlMihlbCkge1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGxldCBzdHlsZTtcbiAgaWYgKHdpbmRvdzIuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgIHN0eWxlID0gd2luZG93Mi5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKTtcbiAgfVxuICBpZiAoIXN0eWxlICYmIGVsLmN1cnJlbnRTdHlsZSkge1xuICAgIHN0eWxlID0gZWwuY3VycmVudFN0eWxlO1xuICB9XG4gIGlmICghc3R5bGUpIHtcbiAgICBzdHlsZSA9IGVsLnN0eWxlO1xuICB9XG4gIHJldHVybiBzdHlsZTtcbn1cbmZ1bmN0aW9uIGdldFRyYW5zbGF0ZShlbCwgYXhpcykge1xuICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7XG4gICAgYXhpcyA9IFwieFwiO1xuICB9XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgbGV0IG1hdHJpeDtcbiAgbGV0IGN1clRyYW5zZm9ybTtcbiAgbGV0IHRyYW5zZm9ybU1hdHJpeDtcbiAgY29uc3QgY3VyU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlMihlbCk7XG4gIGlmICh3aW5kb3cyLldlYktpdENTU01hdHJpeCkge1xuICAgIGN1clRyYW5zZm9ybSA9IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS53ZWJraXRUcmFuc2Zvcm07XG4gICAgaWYgKGN1clRyYW5zZm9ybS5zcGxpdChcIixcIikubGVuZ3RoID4gNikge1xuICAgICAgY3VyVHJhbnNmb3JtID0gY3VyVHJhbnNmb3JtLnNwbGl0KFwiLCBcIikubWFwKChhKSA9PiBhLnJlcGxhY2UoXCIsXCIsIFwiLlwiKSkuam9pbihcIiwgXCIpO1xuICAgIH1cbiAgICB0cmFuc2Zvcm1NYXRyaXggPSBuZXcgd2luZG93Mi5XZWJLaXRDU1NNYXRyaXgoY3VyVHJhbnNmb3JtID09PSBcIm5vbmVcIiA/IFwiXCIgOiBjdXJUcmFuc2Zvcm0pO1xuICB9IGVsc2Uge1xuICAgIHRyYW5zZm9ybU1hdHJpeCA9IGN1clN0eWxlLk1velRyYW5zZm9ybSB8fCBjdXJTdHlsZS5PVHJhbnNmb3JtIHx8IGN1clN0eWxlLk1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLm1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFwidHJhbnNmb3JtXCIpLnJlcGxhY2UoXCJ0cmFuc2xhdGUoXCIsIFwibWF0cml4KDEsIDAsIDAsIDEsXCIpO1xuICAgIG1hdHJpeCA9IHRyYW5zZm9ybU1hdHJpeC50b1N0cmluZygpLnNwbGl0KFwiLFwiKTtcbiAgfVxuICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICBpZiAod2luZG93Mi5XZWJLaXRDU1NNYXRyaXgpIGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDE7XG4gICAgZWxzZSBpZiAobWF0cml4Lmxlbmd0aCA9PT0gMTYpIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzEyXSk7XG4gICAgZWxzZSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs0XSk7XG4gIH1cbiAgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgaWYgKHdpbmRvdzIuV2ViS2l0Q1NTTWF0cml4KSBjdXJUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1NYXRyaXgubTQyO1xuICAgIGVsc2UgaWYgKG1hdHJpeC5sZW5ndGggPT09IDE2KSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFsxM10pO1xuICAgIGVsc2UgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbNV0pO1xuICB9XG4gIHJldHVybiBjdXJUcmFuc2Zvcm0gfHwgMDtcbn1cbmZ1bmN0aW9uIGlzT2JqZWN0MihvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gXCJvYmplY3RcIiAmJiBvICE9PSBudWxsICYmIG8uY29uc3RydWN0b3IgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKSA9PT0gXCJPYmplY3RcIjtcbn1cbmZ1bmN0aW9uIGlzTm9kZShub2RlKSB7XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB3aW5kb3cuSFRNTEVsZW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xuICB9XG4gIHJldHVybiBub2RlICYmIChub2RlLm5vZGVUeXBlID09PSAxIHx8IG5vZGUubm9kZVR5cGUgPT09IDExKTtcbn1cbmZ1bmN0aW9uIGV4dGVuZDIoKSB7XG4gIGNvbnN0IHRvID0gT2JqZWN0KGFyZ3VtZW50cy5sZW5ndGggPD0gMCA/IHZvaWQgMCA6IGFyZ3VtZW50c1swXSk7XG4gIGNvbnN0IG5vRXh0ZW5kID0gW1wiX19wcm90b19fXCIsIFwiY29uc3RydWN0b3JcIiwgXCJwcm90b3R5cGVcIl07XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgbmV4dFNvdXJjZSA9IGkgPCAwIHx8IGFyZ3VtZW50cy5sZW5ndGggPD0gaSA/IHZvaWQgMCA6IGFyZ3VtZW50c1tpXTtcbiAgICBpZiAobmV4dFNvdXJjZSAhPT0gdm9pZCAwICYmIG5leHRTb3VyY2UgIT09IG51bGwgJiYgIWlzTm9kZShuZXh0U291cmNlKSkge1xuICAgICAgY29uc3Qga2V5c0FycmF5ID0gT2JqZWN0LmtleXMoT2JqZWN0KG5leHRTb3VyY2UpKS5maWx0ZXIoKGtleSkgPT4gbm9FeHRlbmQuaW5kZXhPZihrZXkpIDwgMCk7XG4gICAgICBmb3IgKGxldCBuZXh0SW5kZXggPSAwLCBsZW4gPSBrZXlzQXJyYXkubGVuZ3RoOyBuZXh0SW5kZXggPCBsZW47IG5leHRJbmRleCArPSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHRLZXkgPSBrZXlzQXJyYXlbbmV4dEluZGV4XTtcbiAgICAgICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmV4dFNvdXJjZSwgbmV4dEtleSk7XG4gICAgICAgIGlmIChkZXNjICE9PSB2b2lkIDAgJiYgZGVzYy5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgaWYgKGlzT2JqZWN0Mih0b1tuZXh0S2V5XSkgJiYgaXNPYmplY3QyKG5leHRTb3VyY2VbbmV4dEtleV0pKSB7XG4gICAgICAgICAgICBpZiAobmV4dFNvdXJjZVtuZXh0S2V5XS5fX3N3aXBlcl9fKSB7XG4gICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGV4dGVuZDIodG9bbmV4dEtleV0sIG5leHRTb3VyY2VbbmV4dEtleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoIWlzT2JqZWN0Mih0b1tuZXh0S2V5XSkgJiYgaXNPYmplY3QyKG5leHRTb3VyY2VbbmV4dEtleV0pKSB7XG4gICAgICAgICAgICB0b1tuZXh0S2V5XSA9IHt9O1xuICAgICAgICAgICAgaWYgKG5leHRTb3VyY2VbbmV4dEtleV0uX19zd2lwZXJfXykge1xuICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBleHRlbmQyKHRvW25leHRLZXldLCBuZXh0U291cmNlW25leHRLZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdG87XG59XG5mdW5jdGlvbiBzZXRDU1NQcm9wZXJ0eShlbCwgdmFyTmFtZSwgdmFyVmFsdWUpIHtcbiAgZWwuc3R5bGUuc2V0UHJvcGVydHkodmFyTmFtZSwgdmFyVmFsdWUpO1xufVxuZnVuY3Rpb24gYW5pbWF0ZUNTU01vZGVTY3JvbGwoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICB0YXJnZXRQb3NpdGlvbixcbiAgICBzaWRlXG4gIH0gPSBfcmVmO1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IHN0YXJ0UG9zaXRpb24gPSAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgbGV0IHN0YXJ0VGltZSA9IG51bGw7XG4gIGxldCB0aW1lO1xuICBjb25zdCBkdXJhdGlvbiA9IHN3aXBlci5wYXJhbXMuc3BlZWQ7XG4gIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuc2Nyb2xsU25hcFR5cGUgPSBcIm5vbmVcIjtcbiAgd2luZG93Mi5jYW5jZWxBbmltYXRpb25GcmFtZShzd2lwZXIuY3NzTW9kZUZyYW1lSUQpO1xuICBjb25zdCBkaXIgPSB0YXJnZXRQb3NpdGlvbiA+IHN0YXJ0UG9zaXRpb24gPyBcIm5leHRcIiA6IFwicHJldlwiO1xuICBjb25zdCBpc091dE9mQm91bmQgPSAoY3VycmVudCwgdGFyZ2V0KSA9PiB7XG4gICAgcmV0dXJuIGRpciA9PT0gXCJuZXh0XCIgJiYgY3VycmVudCA+PSB0YXJnZXQgfHwgZGlyID09PSBcInByZXZcIiAmJiBjdXJyZW50IDw9IHRhcmdldDtcbiAgfTtcbiAgY29uc3QgYW5pbWF0ZSA9ICgpID0+IHtcbiAgICB0aW1lID0gKC8qIEBfX1BVUkVfXyAqLyBuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgaWYgKHN0YXJ0VGltZSA9PT0gbnVsbCkge1xuICAgICAgc3RhcnRUaW1lID0gdGltZTtcbiAgICB9XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1heChNYXRoLm1pbigodGltZSAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvbiwgMSksIDApO1xuICAgIGNvbnN0IGVhc2VQcm9ncmVzcyA9IDAuNSAtIE1hdGguY29zKHByb2dyZXNzICogTWF0aC5QSSkgLyAyO1xuICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uICsgZWFzZVByb2dyZXNzICogKHRhcmdldFBvc2l0aW9uIC0gc3RhcnRQb3NpdGlvbik7XG4gICAgaWYgKGlzT3V0T2ZCb3VuZChjdXJyZW50UG9zaXRpb24sIHRhcmdldFBvc2l0aW9uKSkge1xuICAgICAgY3VycmVudFBvc2l0aW9uID0gdGFyZ2V0UG9zaXRpb247XG4gICAgfVxuICAgIHN3aXBlci53cmFwcGVyRWwuc2Nyb2xsVG8oe1xuICAgICAgW3NpZGVdOiBjdXJyZW50UG9zaXRpb25cbiAgICB9KTtcbiAgICBpZiAoaXNPdXRPZkJvdW5kKGN1cnJlbnRQb3NpdGlvbiwgdGFyZ2V0UG9zaXRpb24pKSB7XG4gICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbiAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuc2Nyb2xsU25hcFR5cGUgPSBcIlwiO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUub3ZlcmZsb3cgPSBcIlwiO1xuICAgICAgICBzd2lwZXIud3JhcHBlckVsLnNjcm9sbFRvKHtcbiAgICAgICAgICBbc2lkZV06IGN1cnJlbnRQb3NpdGlvblxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgd2luZG93Mi5jYW5jZWxBbmltYXRpb25GcmFtZShzd2lwZXIuY3NzTW9kZUZyYW1lSUQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2lwZXIuY3NzTW9kZUZyYW1lSUQgPSB3aW5kb3cyLnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgfTtcbiAgYW5pbWF0ZSgpO1xufVxuZnVuY3Rpb24gZWxlbWVudENoaWxkcmVuKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gIGlmIChzZWxlY3RvciA9PT0gdm9pZCAwKSB7XG4gICAgc2VsZWN0b3IgPSBcIlwiO1xuICB9XG4gIGNvbnN0IGNoaWxkcmVuID0gWy4uLmVsZW1lbnQuY2hpbGRyZW5dO1xuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxTbG90RWxlbWVudCkge1xuICAgIGNoaWxkcmVuLnB1c2goLi4uZWxlbWVudC5hc3NpZ25lZEVsZW1lbnRzKCkpO1xuICB9XG4gIGlmICghc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgcmV0dXJuIGNoaWxkcmVuLmZpbHRlcigoZWwpID0+IGVsLm1hdGNoZXMoc2VsZWN0b3IpKTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRJc0NoaWxkT2YoZWwsIHBhcmVudCkge1xuICBjb25zdCBpc0NoaWxkID0gcGFyZW50LmNvbnRhaW5zKGVsKTtcbiAgaWYgKCFpc0NoaWxkICYmIHBhcmVudCBpbnN0YW5jZW9mIEhUTUxTbG90RWxlbWVudCkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gWy4uLnBhcmVudC5hc3NpZ25lZEVsZW1lbnRzKCldO1xuICAgIHJldHVybiBjaGlsZHJlbi5pbmNsdWRlcyhlbCk7XG4gIH1cbiAgcmV0dXJuIGlzQ2hpbGQ7XG59XG5mdW5jdGlvbiBzaG93V2FybmluZyh0ZXh0KSB7XG4gIHRyeSB7XG4gICAgY29uc29sZS53YXJuKHRleHQpO1xuICAgIHJldHVybjtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQyKHRhZywgY2xhc3NlczIpIHtcbiAgaWYgKGNsYXNzZXMyID09PSB2b2lkIDApIHtcbiAgICBjbGFzc2VzMiA9IFtdO1xuICB9XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICBlbC5jbGFzc0xpc3QuYWRkKC4uLkFycmF5LmlzQXJyYXkoY2xhc3NlczIpID8gY2xhc3NlczIgOiBjbGFzc2VzVG9Ub2tlbnMoY2xhc3NlczIpKTtcbiAgcmV0dXJuIGVsO1xufVxuZnVuY3Rpb24gZWxlbWVudE9mZnNldChlbCkge1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IGRvY3VtZW50MiA9IGdldERvY3VtZW50KCk7XG4gIGNvbnN0IGJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQyLmJvZHk7XG4gIGNvbnN0IGNsaWVudFRvcCA9IGVsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuICBjb25zdCBjbGllbnRMZWZ0ID0gZWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcbiAgY29uc3Qgc2Nyb2xsVG9wID0gZWwgPT09IHdpbmRvdzIgPyB3aW5kb3cyLnNjcm9sbFkgOiBlbC5zY3JvbGxUb3A7XG4gIGNvbnN0IHNjcm9sbExlZnQgPSBlbCA9PT0gd2luZG93MiA/IHdpbmRvdzIuc2Nyb2xsWCA6IGVsLnNjcm9sbExlZnQ7XG4gIHJldHVybiB7XG4gICAgdG9wOiBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wLFxuICAgIGxlZnQ6IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnRcbiAgfTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRQcmV2QWxsKGVsLCBzZWxlY3Rvcikge1xuICBjb25zdCBwcmV2RWxzID0gW107XG4gIHdoaWxlIChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgY29uc3QgcHJldiA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICBpZiAocHJldi5tYXRjaGVzKHNlbGVjdG9yKSkgcHJldkVscy5wdXNoKHByZXYpO1xuICAgIH0gZWxzZSBwcmV2RWxzLnB1c2gocHJldik7XG4gICAgZWwgPSBwcmV2O1xuICB9XG4gIHJldHVybiBwcmV2RWxzO1xufVxuZnVuY3Rpb24gZWxlbWVudE5leHRBbGwoZWwsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IG5leHRFbHMgPSBbXTtcbiAgd2hpbGUgKGVsLm5leHRFbGVtZW50U2libGluZykge1xuICAgIGNvbnN0IG5leHQgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICBpZiAobmV4dC5tYXRjaGVzKHNlbGVjdG9yKSkgbmV4dEVscy5wdXNoKG5leHQpO1xuICAgIH0gZWxzZSBuZXh0RWxzLnB1c2gobmV4dCk7XG4gICAgZWwgPSBuZXh0O1xuICB9XG4gIHJldHVybiBuZXh0RWxzO1xufVxuZnVuY3Rpb24gZWxlbWVudFN0eWxlKGVsLCBwcm9wKSB7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgcmV0dXJuIHdpbmRvdzIuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRJbmRleChlbCkge1xuICBsZXQgY2hpbGQgPSBlbDtcbiAgbGV0IGk7XG4gIGlmIChjaGlsZCkge1xuICAgIGkgPSAwO1xuICAgIHdoaWxlICgoY2hpbGQgPSBjaGlsZC5wcmV2aW91c1NpYmxpbmcpICE9PSBudWxsKSB7XG4gICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIGkgKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIHZvaWQgMDtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRQYXJlbnRzKGVsLCBzZWxlY3Rvcikge1xuICBjb25zdCBwYXJlbnRzID0gW107XG4gIGxldCBwYXJlbnQgPSBlbC5wYXJlbnRFbGVtZW50O1xuICB3aGlsZSAocGFyZW50KSB7XG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICBpZiAocGFyZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgfVxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBwYXJlbnRzO1xufVxuZnVuY3Rpb24gZWxlbWVudE91dGVyU2l6ZShlbCwgc2l6ZSwgaW5jbHVkZU1hcmdpbnMpIHtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBpZiAoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICByZXR1cm4gZWxbc2l6ZSA9PT0gXCJ3aWR0aFwiID8gXCJvZmZzZXRXaWR0aFwiIDogXCJvZmZzZXRIZWlnaHRcIl0gKyBwYXJzZUZsb2F0KHdpbmRvdzIuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzaXplID09PSBcIndpZHRoXCIgPyBcIm1hcmdpbi1yaWdodFwiIDogXCJtYXJnaW4tdG9wXCIpKSArIHBhcnNlRmxvYXQod2luZG93Mi5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHNpemUgPT09IFwid2lkdGhcIiA/IFwibWFyZ2luLWxlZnRcIiA6IFwibWFyZ2luLWJvdHRvbVwiKSk7XG4gIH1cbiAgcmV0dXJuIGVsLm9mZnNldFdpZHRoO1xufVxuZnVuY3Rpb24gbWFrZUVsZW1lbnRzQXJyYXkoZWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGVsKSA/IGVsIDogW2VsXSkuZmlsdGVyKChlKSA9PiAhIWUpO1xufVxudmFyIGluaXRfdXRpbHMgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvdXRpbHMubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvc3dpcGVyLWNvcmUubWpzXG5mdW5jdGlvbiBjYWxjU3VwcG9ydCgpIHtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBjb25zdCBkb2N1bWVudDIgPSBnZXREb2N1bWVudCgpO1xuICByZXR1cm4ge1xuICAgIHNtb290aFNjcm9sbDogZG9jdW1lbnQyLmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudDIuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIFwic2Nyb2xsQmVoYXZpb3JcIiBpbiBkb2N1bWVudDIuZG9jdW1lbnRFbGVtZW50LnN0eWxlLFxuICAgIHRvdWNoOiAhIShcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdzIgfHwgd2luZG93Mi5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50MiBpbnN0YW5jZW9mIHdpbmRvdzIuRG9jdW1lbnRUb3VjaClcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldFN1cHBvcnQoKSB7XG4gIGlmICghc3VwcG9ydCkge1xuICAgIHN1cHBvcnQgPSBjYWxjU3VwcG9ydCgpO1xuICB9XG4gIHJldHVybiBzdXBwb3J0O1xufVxuZnVuY3Rpb24gY2FsY0RldmljZShfdGVtcCkge1xuICBsZXQge1xuICAgIHVzZXJBZ2VudFxuICB9ID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXA7XG4gIGNvbnN0IHN1cHBvcnQyID0gZ2V0U3VwcG9ydCgpO1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IHBsYXRmb3JtID0gd2luZG93Mi5uYXZpZ2F0b3IucGxhdGZvcm07XG4gIGNvbnN0IHVhID0gdXNlckFnZW50IHx8IHdpbmRvdzIubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgY29uc3QgZGV2aWNlID0ge1xuICAgIGlvczogZmFsc2UsXG4gICAgYW5kcm9pZDogZmFsc2VcbiAgfTtcbiAgY29uc3Qgc2NyZWVuV2lkdGgyID0gd2luZG93Mi5zY3JlZW4ud2lkdGg7XG4gIGNvbnN0IHNjcmVlbkhlaWdodCA9IHdpbmRvdzIuc2NyZWVuLmhlaWdodDtcbiAgY29uc3QgYW5kcm9pZCA9IHVhLm1hdGNoKC8oQW5kcm9pZCk7P1tcXHNcXC9dKyhbXFxkLl0rKT8vKTtcbiAgbGV0IGlwYWQgPSB1YS5tYXRjaCgvKGlQYWQpLipPU1xccyhbXFxkX10rKS8pO1xuICBjb25zdCBpcG9kID0gdWEubWF0Y2goLyhpUG9kKSguKk9TXFxzKFtcXGRfXSspKT8vKTtcbiAgY29uc3QgaXBob25lID0gIWlwYWQgJiYgdWEubWF0Y2goLyhpUGhvbmVcXHNPU3xpT1MpXFxzKFtcXGRfXSspLyk7XG4gIGNvbnN0IHdpbmRvd3MgPSBwbGF0Zm9ybSA9PT0gXCJXaW4zMlwiO1xuICBsZXQgbWFjb3MgPSBwbGF0Zm9ybSA9PT0gXCJNYWNJbnRlbFwiO1xuICBjb25zdCBpUGFkU2NyZWVucyA9IFtcIjEwMjR4MTM2NlwiLCBcIjEzNjZ4MTAyNFwiLCBcIjgzNHgxMTk0XCIsIFwiMTE5NHg4MzRcIiwgXCI4MzR4MTExMlwiLCBcIjExMTJ4ODM0XCIsIFwiNzY4eDEwMjRcIiwgXCIxMDI0eDc2OFwiLCBcIjgyMHgxMTgwXCIsIFwiMTE4MHg4MjBcIiwgXCI4MTB4MTA4MFwiLCBcIjEwODB4ODEwXCJdO1xuICBpZiAoIWlwYWQgJiYgbWFjb3MgJiYgc3VwcG9ydDIudG91Y2ggJiYgaVBhZFNjcmVlbnMuaW5kZXhPZihgJHtzY3JlZW5XaWR0aDJ9eCR7c2NyZWVuSGVpZ2h0fWApID49IDApIHtcbiAgICBpcGFkID0gdWEubWF0Y2goLyhWZXJzaW9uKVxcLyhbXFxkLl0rKS8pO1xuICAgIGlmICghaXBhZCkgaXBhZCA9IFswLCAxLCBcIjEzXzBfMFwiXTtcbiAgICBtYWNvcyA9IGZhbHNlO1xuICB9XG4gIGlmIChhbmRyb2lkICYmICF3aW5kb3dzKSB7XG4gICAgZGV2aWNlLm9zID0gXCJhbmRyb2lkXCI7XG4gICAgZGV2aWNlLmFuZHJvaWQgPSB0cnVlO1xuICB9XG4gIGlmIChpcGFkIHx8IGlwaG9uZSB8fCBpcG9kKSB7XG4gICAgZGV2aWNlLm9zID0gXCJpb3NcIjtcbiAgICBkZXZpY2UuaW9zID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZGV2aWNlO1xufVxuZnVuY3Rpb24gZ2V0RGV2aWNlKG92ZXJyaWRlcykge1xuICBpZiAob3ZlcnJpZGVzID09PSB2b2lkIDApIHtcbiAgICBvdmVycmlkZXMgPSB7fTtcbiAgfVxuICBpZiAoIWRldmljZUNhY2hlZCkge1xuICAgIGRldmljZUNhY2hlZCA9IGNhbGNEZXZpY2Uob3ZlcnJpZGVzKTtcbiAgfVxuICByZXR1cm4gZGV2aWNlQ2FjaGVkO1xufVxuZnVuY3Rpb24gY2FsY0Jyb3dzZXIoKSB7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgY29uc3QgZGV2aWNlID0gZ2V0RGV2aWNlKCk7XG4gIGxldCBuZWVkUGVyc3BlY3RpdmVGaXggPSBmYWxzZTtcbiAgZnVuY3Rpb24gaXNTYWZhcmkoKSB7XG4gICAgY29uc3QgdWEgPSB3aW5kb3cyLm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gdWEuaW5kZXhPZihcInNhZmFyaVwiKSA+PSAwICYmIHVhLmluZGV4T2YoXCJjaHJvbWVcIikgPCAwICYmIHVhLmluZGV4T2YoXCJhbmRyb2lkXCIpIDwgMDtcbiAgfVxuICBpZiAoaXNTYWZhcmkoKSkge1xuICAgIGNvbnN0IHVhID0gU3RyaW5nKHdpbmRvdzIubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgaWYgKHVhLmluY2x1ZGVzKFwiVmVyc2lvbi9cIikpIHtcbiAgICAgIGNvbnN0IFttYWpvciwgbWlub3JdID0gdWEuc3BsaXQoXCJWZXJzaW9uL1wiKVsxXS5zcGxpdChcIiBcIilbMF0uc3BsaXQoXCIuXCIpLm1hcCgobnVtKSA9PiBOdW1iZXIobnVtKSk7XG4gICAgICBuZWVkUGVyc3BlY3RpdmVGaXggPSBtYWpvciA8IDE2IHx8IG1ham9yID09PSAxNiAmJiBtaW5vciA8IDI7XG4gICAgfVxuICB9XG4gIGNvbnN0IGlzV2ViVmlldyA9IC8oaVBob25lfGlQb2R8aVBhZCkuKkFwcGxlV2ViS2l0KD8hLipTYWZhcmkpL2kudGVzdCh3aW5kb3cyLm5hdmlnYXRvci51c2VyQWdlbnQpO1xuICBjb25zdCBpc1NhZmFyaUJyb3dzZXIgPSBpc1NhZmFyaSgpO1xuICBjb25zdCBuZWVkM2RGaXggPSBpc1NhZmFyaUJyb3dzZXIgfHwgaXNXZWJWaWV3ICYmIGRldmljZS5pb3M7XG4gIHJldHVybiB7XG4gICAgaXNTYWZhcmk6IG5lZWRQZXJzcGVjdGl2ZUZpeCB8fCBpc1NhZmFyaUJyb3dzZXIsXG4gICAgbmVlZFBlcnNwZWN0aXZlRml4LFxuICAgIG5lZWQzZEZpeCxcbiAgICBpc1dlYlZpZXdcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldEJyb3dzZXIoKSB7XG4gIGlmICghYnJvd3Nlcikge1xuICAgIGJyb3dzZXIgPSBjYWxjQnJvd3NlcigpO1xuICB9XG4gIHJldHVybiBicm93c2VyO1xufVxuZnVuY3Rpb24gUmVzaXplKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgb24sXG4gICAgZW1pdFxuICB9ID0gX3JlZjtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBsZXQgb2JzZXJ2ZXIgPSBudWxsO1xuICBsZXQgYW5pbWF0aW9uRnJhbWUgPSBudWxsO1xuICBjb25zdCByZXNpemVIYW5kbGVyID0gKCkgPT4ge1xuICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuO1xuICAgIGVtaXQoXCJiZWZvcmVSZXNpemVcIik7XG4gICAgZW1pdChcInJlc2l6ZVwiKTtcbiAgfTtcbiAgY29uc3QgY3JlYXRlT2JzZXJ2ZXIgPSAoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm47XG4gICAgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgIGFuaW1hdGlvbkZyYW1lID0gd2luZG93Mi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgaGVpZ2h0XG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGxldCBuZXdXaWR0aCA9IHdpZHRoO1xuICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goKF9yZWYyKSA9PiB7XG4gICAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIGNvbnRlbnRCb3hTaXplLFxuICAgICAgICAgICAgY29udGVudFJlY3QsXG4gICAgICAgICAgICB0YXJnZXRcbiAgICAgICAgICB9ID0gX3JlZjI7XG4gICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IHN3aXBlci5lbCkgcmV0dXJuO1xuICAgICAgICAgIG5ld1dpZHRoID0gY29udGVudFJlY3QgPyBjb250ZW50UmVjdC53aWR0aCA6IChjb250ZW50Qm94U2l6ZVswXSB8fCBjb250ZW50Qm94U2l6ZSkuaW5saW5lU2l6ZTtcbiAgICAgICAgICBuZXdIZWlnaHQgPSBjb250ZW50UmVjdCA/IGNvbnRlbnRSZWN0LmhlaWdodCA6IChjb250ZW50Qm94U2l6ZVswXSB8fCBjb250ZW50Qm94U2l6ZSkuYmxvY2tTaXplO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5ld1dpZHRoICE9PSB3aWR0aCB8fCBuZXdIZWlnaHQgIT09IGhlaWdodCkge1xuICAgICAgICAgIHJlc2l6ZUhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShzd2lwZXIuZWwpO1xuICB9O1xuICBjb25zdCByZW1vdmVPYnNlcnZlciA9ICgpID0+IHtcbiAgICBpZiAoYW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgIHdpbmRvdzIuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWUpO1xuICAgIH1cbiAgICBpZiAob2JzZXJ2ZXIgJiYgb2JzZXJ2ZXIudW5vYnNlcnZlICYmIHN3aXBlci5lbCkge1xuICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKHN3aXBlci5lbCk7XG4gICAgICBvYnNlcnZlciA9IG51bGw7XG4gICAgfVxuICB9O1xuICBjb25zdCBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm47XG4gICAgZW1pdChcIm9yaWVudGF0aW9uY2hhbmdlXCIpO1xuICB9O1xuICBvbihcImluaXRcIiwgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnJlc2l6ZU9ic2VydmVyICYmIHR5cGVvZiB3aW5kb3cyLlJlc2l6ZU9ic2VydmVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjcmVhdGVPYnNlcnZlcigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aW5kb3cyLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplSGFuZGxlcik7XG4gICAgd2luZG93Mi5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgb3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyKTtcbiAgfSk7XG4gIG9uKFwiZGVzdHJveVwiLCAoKSA9PiB7XG4gICAgcmVtb3ZlT2JzZXJ2ZXIoKTtcbiAgICB3aW5kb3cyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplSGFuZGxlcik7XG4gICAgd2luZG93Mi5yZW1vdmVFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgb3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBPYnNlcnZlcihfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIGV4dGVuZFBhcmFtcyxcbiAgICBvbixcbiAgICBlbWl0XG4gIH0gPSBfcmVmO1xuICBjb25zdCBvYnNlcnZlcnMgPSBbXTtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBjb25zdCBhdHRhY2ggPSBmdW5jdGlvbih0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGNvbnN0IE9ic2VydmVyRnVuYyA9IHdpbmRvdzIuTXV0YXRpb25PYnNlcnZlciB8fCB3aW5kb3cyLldlYmtpdE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXJGdW5jKChtdXRhdGlvbnMpID0+IHtcbiAgICAgIGlmIChzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXykgcmV0dXJuO1xuICAgICAgaWYgKG11dGF0aW9ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgZW1pdChcIm9ic2VydmVyVXBkYXRlXCIsIG11dGF0aW9uc1swXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9ic2VydmVyVXBkYXRlID0gZnVuY3Rpb24gb2JzZXJ2ZXJVcGRhdGUyKCkge1xuICAgICAgICBlbWl0KFwib2JzZXJ2ZXJVcGRhdGVcIiwgbXV0YXRpb25zWzBdKTtcbiAgICAgIH07XG4gICAgICBpZiAod2luZG93Mi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgd2luZG93Mi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUob2JzZXJ2ZXJVcGRhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93Mi5zZXRUaW1lb3V0KG9ic2VydmVyVXBkYXRlLCAwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwge1xuICAgICAgYXR0cmlidXRlczogdHlwZW9mIG9wdGlvbnMuYXR0cmlidXRlcyA9PT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBvcHRpb25zLmF0dHJpYnV0ZXMsXG4gICAgICBjaGlsZExpc3Q6IHN3aXBlci5pc0VsZW1lbnQgfHwgKHR5cGVvZiBvcHRpb25zLmNoaWxkTGlzdCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRydWUgOiBvcHRpb25zKS5jaGlsZExpc3QsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0eXBlb2Ygb3B0aW9ucy5jaGFyYWN0ZXJEYXRhID09PSBcInVuZGVmaW5lZFwiID8gdHJ1ZSA6IG9wdGlvbnMuY2hhcmFjdGVyRGF0YVxuICAgIH0pO1xuICAgIG9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgfTtcbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMub2JzZXJ2ZXIpIHJldHVybjtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5vYnNlcnZlUGFyZW50cykge1xuICAgICAgY29uc3QgY29udGFpbmVyUGFyZW50cyA9IGVsZW1lbnRQYXJlbnRzKHN3aXBlci5ob3N0RWwpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWluZXJQYXJlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGF0dGFjaChjb250YWluZXJQYXJlbnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXR0YWNoKHN3aXBlci5ob3N0RWwsIHtcbiAgICAgIGNoaWxkTGlzdDogc3dpcGVyLnBhcmFtcy5vYnNlcnZlU2xpZGVDaGlsZHJlblxuICAgIH0pO1xuICAgIGF0dGFjaChzd2lwZXIud3JhcHBlckVsLCB7XG4gICAgICBhdHRyaWJ1dGVzOiBmYWxzZVxuICAgIH0pO1xuICB9O1xuICBjb25zdCBkZXN0cm95ID0gKCkgPT4ge1xuICAgIG9ic2VydmVycy5mb3JFYWNoKChvYnNlcnZlcikgPT4ge1xuICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH0pO1xuICAgIG9ic2VydmVycy5zcGxpY2UoMCwgb2JzZXJ2ZXJzLmxlbmd0aCk7XG4gIH07XG4gIGV4dGVuZFBhcmFtcyh7XG4gICAgb2JzZXJ2ZXI6IGZhbHNlLFxuICAgIG9ic2VydmVQYXJlbnRzOiBmYWxzZSxcbiAgICBvYnNlcnZlU2xpZGVDaGlsZHJlbjogZmFsc2VcbiAgfSk7XG4gIG9uKFwiaW5pdFwiLCBpbml0KTtcbiAgb24oXCJkZXN0cm95XCIsIGRlc3Ryb3kpO1xufVxuZnVuY3Rpb24gdXBkYXRlU2l6ZSgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgbGV0IHdpZHRoO1xuICBsZXQgaGVpZ2h0O1xuICBjb25zdCBlbCA9IHN3aXBlci5lbDtcbiAgaWYgKHR5cGVvZiBzd2lwZXIucGFyYW1zLndpZHRoICE9PSBcInVuZGVmaW5lZFwiICYmIHN3aXBlci5wYXJhbXMud2lkdGggIT09IG51bGwpIHtcbiAgICB3aWR0aCA9IHN3aXBlci5wYXJhbXMud2lkdGg7XG4gIH0gZWxzZSB7XG4gICAgd2lkdGggPSBlbC5jbGllbnRXaWR0aDtcbiAgfVxuICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMuaGVpZ2h0ICE9PSBcInVuZGVmaW5lZFwiICYmIHN3aXBlci5wYXJhbXMuaGVpZ2h0ICE9PSBudWxsKSB7XG4gICAgaGVpZ2h0ID0gc3dpcGVyLnBhcmFtcy5oZWlnaHQ7XG4gIH0gZWxzZSB7XG4gICAgaGVpZ2h0ID0gZWwuY2xpZW50SGVpZ2h0O1xuICB9XG4gIGlmICh3aWR0aCA9PT0gMCAmJiBzd2lwZXIuaXNIb3Jpem9udGFsKCkgfHwgaGVpZ2h0ID09PSAwICYmIHN3aXBlci5pc1ZlcnRpY2FsKCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgd2lkdGggPSB3aWR0aCAtIHBhcnNlSW50KGVsZW1lbnRTdHlsZShlbCwgXCJwYWRkaW5nLWxlZnRcIikgfHwgMCwgMTApIC0gcGFyc2VJbnQoZWxlbWVudFN0eWxlKGVsLCBcInBhZGRpbmctcmlnaHRcIikgfHwgMCwgMTApO1xuICBoZWlnaHQgPSBoZWlnaHQgLSBwYXJzZUludChlbGVtZW50U3R5bGUoZWwsIFwicGFkZGluZy10b3BcIikgfHwgMCwgMTApIC0gcGFyc2VJbnQoZWxlbWVudFN0eWxlKGVsLCBcInBhZGRpbmctYm90dG9tXCIpIHx8IDAsIDEwKTtcbiAgaWYgKE51bWJlci5pc05hTih3aWR0aCkpIHdpZHRoID0gMDtcbiAgaWYgKE51bWJlci5pc05hTihoZWlnaHQpKSBoZWlnaHQgPSAwO1xuICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBzaXplOiBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB3aWR0aCA6IGhlaWdodFxuICB9KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVNsaWRlcygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgZnVuY3Rpb24gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShub2RlLCBsYWJlbCkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KG5vZGUuZ2V0UHJvcGVydHlWYWx1ZShzd2lwZXIuZ2V0RGlyZWN0aW9uTGFiZWwobGFiZWwpKSB8fCAwKTtcbiAgfVxuICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICBjb25zdCB7XG4gICAgd3JhcHBlckVsLFxuICAgIHNsaWRlc0VsLFxuICAgIHNpemU6IHN3aXBlclNpemUsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgd3JvbmdSVExcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgY29uc3QgcHJldmlvdXNTbGlkZXNMZW5ndGggPSBpc1ZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG4gIGNvbnN0IHNsaWRlcyA9IGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApO1xuICBjb25zdCBzbGlkZXNMZW5ndGggPSBpc1ZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc2xpZGVzLmxlbmd0aDtcbiAgbGV0IHNuYXBHcmlkID0gW107XG4gIGNvbnN0IHNsaWRlc0dyaWQgPSBbXTtcbiAgY29uc3Qgc2xpZGVzU2l6ZXNHcmlkID0gW107XG4gIGxldCBvZmZzZXRCZWZvcmUgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlO1xuICBpZiAodHlwZW9mIG9mZnNldEJlZm9yZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgb2Zmc2V0QmVmb3JlID0gcGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZS5jYWxsKHN3aXBlcik7XG4gIH1cbiAgbGV0IG9mZnNldEFmdGVyID0gcGFyYW1zLnNsaWRlc09mZnNldEFmdGVyO1xuICBpZiAodHlwZW9mIG9mZnNldEFmdGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBvZmZzZXRBZnRlciA9IHBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlci5jYWxsKHN3aXBlcik7XG4gIH1cbiAgY29uc3QgcHJldmlvdXNTbmFwR3JpZExlbmd0aCA9IHN3aXBlci5zbmFwR3JpZC5sZW5ndGg7XG4gIGNvbnN0IHByZXZpb3VzU2xpZGVzR3JpZExlbmd0aCA9IHN3aXBlci5zbGlkZXNHcmlkLmxlbmd0aDtcbiAgbGV0IHNwYWNlQmV0d2VlbiA9IHBhcmFtcy5zcGFjZUJldHdlZW47XG4gIGxldCBzbGlkZVBvc2l0aW9uID0gLW9mZnNldEJlZm9yZTtcbiAgbGV0IHByZXZTbGlkZVNpemUgPSAwO1xuICBsZXQgaW5kZXggPSAwO1xuICBpZiAodHlwZW9mIHN3aXBlclNpemUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHR5cGVvZiBzcGFjZUJldHdlZW4gPT09IFwic3RyaW5nXCIgJiYgc3BhY2VCZXR3ZWVuLmluZGV4T2YoXCIlXCIpID49IDApIHtcbiAgICBzcGFjZUJldHdlZW4gPSBwYXJzZUZsb2F0KHNwYWNlQmV0d2Vlbi5yZXBsYWNlKFwiJVwiLCBcIlwiKSkgLyAxMDAgKiBzd2lwZXJTaXplO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzcGFjZUJldHdlZW4gPT09IFwic3RyaW5nXCIpIHtcbiAgICBzcGFjZUJldHdlZW4gPSBwYXJzZUZsb2F0KHNwYWNlQmV0d2Vlbik7XG4gIH1cbiAgc3dpcGVyLnZpcnR1YWxTaXplID0gLXNwYWNlQmV0d2VlbjtcbiAgc2xpZGVzLmZvckVhY2goKHNsaWRlRWwpID0+IHtcbiAgICBpZiAocnRsKSB7XG4gICAgICBzbGlkZUVsLnN0eWxlLm1hcmdpbkxlZnQgPSBcIlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZUVsLnN0eWxlLm1hcmdpblJpZ2h0ID0gXCJcIjtcbiAgICB9XG4gICAgc2xpZGVFbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIlwiO1xuICAgIHNsaWRlRWwuc3R5bGUubWFyZ2luVG9wID0gXCJcIjtcbiAgfSk7XG4gIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgcGFyYW1zLmNzc01vZGUpIHtcbiAgICBzZXRDU1NQcm9wZXJ0eSh3cmFwcGVyRWwsIFwiLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWJlZm9yZVwiLCBcIlwiKTtcbiAgICBzZXRDU1NQcm9wZXJ0eSh3cmFwcGVyRWwsIFwiLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWFmdGVyXCIsIFwiXCIpO1xuICB9XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDEgJiYgc3dpcGVyLmdyaWQ7XG4gIGlmIChncmlkRW5hYmxlZCkge1xuICAgIHN3aXBlci5ncmlkLmluaXRTbGlkZXMoc2xpZGVzKTtcbiAgfSBlbHNlIGlmIChzd2lwZXIuZ3JpZCkge1xuICAgIHN3aXBlci5ncmlkLnVuc2V0U2xpZGVzKCk7XG4gIH1cbiAgbGV0IHNsaWRlU2l6ZTtcbiAgY29uc3Qgc2hvdWxkUmVzZXRTbGlkZVNpemUgPSBwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIgJiYgcGFyYW1zLmJyZWFrcG9pbnRzICYmIE9iamVjdC5rZXlzKHBhcmFtcy5icmVha3BvaW50cykuZmlsdGVyKChrZXkpID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHBhcmFtcy5icmVha3BvaW50c1trZXldLnNsaWRlc1BlclZpZXcgIT09IFwidW5kZWZpbmVkXCI7XG4gIH0pLmxlbmd0aCA+IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzTGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzbGlkZVNpemUgPSAwO1xuICAgIGxldCBzbGlkZTI7XG4gICAgaWYgKHNsaWRlc1tpXSkgc2xpZGUyID0gc2xpZGVzW2ldO1xuICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgc3dpcGVyLmdyaWQudXBkYXRlU2xpZGUoaSwgc2xpZGUyLCBzbGlkZXMpO1xuICAgIH1cbiAgICBpZiAoc2xpZGVzW2ldICYmIGVsZW1lbnRTdHlsZShzbGlkZTIsIFwiZGlzcGxheVwiKSA9PT0gXCJub25lXCIpIGNvbnRpbnVlO1xuICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIpIHtcbiAgICAgIGlmIChzaG91bGRSZXNldFNsaWRlU2l6ZSkge1xuICAgICAgICBzbGlkZXNbaV0uc3R5bGVbc3dpcGVyLmdldERpcmVjdGlvbkxhYmVsKFwid2lkdGhcIildID0gYGA7XG4gICAgICB9XG4gICAgICBjb25zdCBzbGlkZVN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoc2xpZGUyKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRUcmFuc2Zvcm0gPSBzbGlkZTIuc3R5bGUudHJhbnNmb3JtO1xuICAgICAgY29uc3QgY3VycmVudFdlYktpdFRyYW5zZm9ybSA9IHNsaWRlMi5zdHlsZS53ZWJraXRUcmFuc2Zvcm07XG4gICAgICBpZiAoY3VycmVudFRyYW5zZm9ybSkge1xuICAgICAgICBzbGlkZTIuc3R5bGUudHJhbnNmb3JtID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFdlYktpdFRyYW5zZm9ybSkge1xuICAgICAgICBzbGlkZTIuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykge1xuICAgICAgICBzbGlkZVNpemUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBlbGVtZW50T3V0ZXJTaXplKHNsaWRlMiwgXCJ3aWR0aFwiLCB0cnVlKSA6IGVsZW1lbnRPdXRlclNpemUoc2xpZGUyLCBcImhlaWdodFwiLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgXCJ3aWR0aFwiKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ0xlZnQgPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCBcInBhZGRpbmctbGVmdFwiKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ1JpZ2h0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgXCJwYWRkaW5nLXJpZ2h0XCIpO1xuICAgICAgICBjb25zdCBtYXJnaW5MZWZ0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgXCJtYXJnaW4tbGVmdFwiKTtcbiAgICAgICAgY29uc3QgbWFyZ2luUmlnaHQgPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCBcIm1hcmdpbi1yaWdodFwiKTtcbiAgICAgICAgY29uc3QgYm94U2l6aW5nID0gc2xpZGVTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcImJveC1zaXppbmdcIik7XG4gICAgICAgIGlmIChib3hTaXppbmcgJiYgYm94U2l6aW5nID09PSBcImJvcmRlci1ib3hcIikge1xuICAgICAgICAgIHNsaWRlU2l6ZSA9IHdpZHRoICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNsaWVudFdpZHRoLFxuICAgICAgICAgICAgb2Zmc2V0V2lkdGhcbiAgICAgICAgICB9ID0gc2xpZGUyO1xuICAgICAgICAgIHNsaWRlU2l6ZSA9IHdpZHRoICsgcGFkZGluZ0xlZnQgKyBwYWRkaW5nUmlnaHQgKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQgKyAob2Zmc2V0V2lkdGggLSBjbGllbnRXaWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50VHJhbnNmb3JtKSB7XG4gICAgICAgIHNsaWRlMi5zdHlsZS50cmFuc2Zvcm0gPSBjdXJyZW50VHJhbnNmb3JtO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm0pIHtcbiAgICAgICAgc2xpZGUyLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm07XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVTaXplID0gTWF0aC5mbG9vcihzbGlkZVNpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZVNpemUgPSAoc3dpcGVyU2l6ZSAtIChwYXJhbXMuc2xpZGVzUGVyVmlldyAtIDEpICogc3BhY2VCZXR3ZWVuKSAvIHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlU2l6ZSA9IE1hdGguZmxvb3Ioc2xpZGVTaXplKTtcbiAgICAgIGlmIChzbGlkZXNbaV0pIHtcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlW3N3aXBlci5nZXREaXJlY3Rpb25MYWJlbChcIndpZHRoXCIpXSA9IGAke3NsaWRlU2l6ZX1weGA7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzbGlkZXNbaV0pIHtcbiAgICAgIHNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemUgPSBzbGlkZVNpemU7XG4gICAgfVxuICAgIHNsaWRlc1NpemVzR3JpZC5wdXNoKHNsaWRlU2l6ZSk7XG4gICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gKyBzbGlkZVNpemUgLyAyICsgcHJldlNsaWRlU2l6ZSAvIDIgKyBzcGFjZUJldHdlZW47XG4gICAgICBpZiAocHJldlNsaWRlU2l6ZSA9PT0gMCAmJiBpICE9PSAwKSBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiAtIHN3aXBlclNpemUgLyAyIC0gc3BhY2VCZXR3ZWVuO1xuICAgICAgaWYgKGkgPT09IDApIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gc3dpcGVyU2l6ZSAvIDIgLSBzcGFjZUJldHdlZW47XG4gICAgICBpZiAoTWF0aC5hYnMoc2xpZGVQb3NpdGlvbikgPCAxIC8gMWUzKSBzbGlkZVBvc2l0aW9uID0gMDtcbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVBvc2l0aW9uID0gTWF0aC5mbG9vcihzbGlkZVBvc2l0aW9uKTtcbiAgICAgIGlmIChpbmRleCAlIHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMCkgc25hcEdyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgIHNsaWRlc0dyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlUG9zaXRpb24gPSBNYXRoLmZsb29yKHNsaWRlUG9zaXRpb24pO1xuICAgICAgaWYgKChpbmRleCAtIE1hdGgubWluKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLCBpbmRleCkpICUgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMCkgc25hcEdyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgIHNsaWRlc0dyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uICsgc2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuO1xuICAgIH1cbiAgICBzd2lwZXIudmlydHVhbFNpemUgKz0gc2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuO1xuICAgIHByZXZTbGlkZVNpemUgPSBzbGlkZVNpemU7XG4gICAgaW5kZXggKz0gMTtcbiAgfVxuICBzd2lwZXIudmlydHVhbFNpemUgPSBNYXRoLm1heChzd2lwZXIudmlydHVhbFNpemUsIHN3aXBlclNpemUpICsgb2Zmc2V0QWZ0ZXI7XG4gIGlmIChydGwgJiYgd3JvbmdSVEwgJiYgKHBhcmFtcy5lZmZlY3QgPT09IFwic2xpZGVcIiB8fCBwYXJhbXMuZWZmZWN0ID09PSBcImNvdmVyZmxvd1wiKSkge1xuICAgIHdyYXBwZXJFbC5zdHlsZS53aWR0aCA9IGAke3N3aXBlci52aXJ0dWFsU2l6ZSArIHNwYWNlQmV0d2Vlbn1weGA7XG4gIH1cbiAgaWYgKHBhcmFtcy5zZXRXcmFwcGVyU2l6ZSkge1xuICAgIHdyYXBwZXJFbC5zdHlsZVtzd2lwZXIuZ2V0RGlyZWN0aW9uTGFiZWwoXCJ3aWR0aFwiKV0gPSBgJHtzd2lwZXIudmlydHVhbFNpemUgKyBzcGFjZUJldHdlZW59cHhgO1xuICB9XG4gIGlmIChncmlkRW5hYmxlZCkge1xuICAgIHN3aXBlci5ncmlkLnVwZGF0ZVdyYXBwZXJTaXplKHNsaWRlU2l6ZSwgc25hcEdyaWQpO1xuICB9XG4gIGlmICghcGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgY29uc3QgbmV3U2xpZGVzR3JpZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25hcEdyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGxldCBzbGlkZXNHcmlkSXRlbSA9IHNuYXBHcmlkW2ldO1xuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlc0dyaWRJdGVtID0gTWF0aC5mbG9vcihzbGlkZXNHcmlkSXRlbSk7XG4gICAgICBpZiAoc25hcEdyaWRbaV0gPD0gc3dpcGVyLnZpcnR1YWxTaXplIC0gc3dpcGVyU2l6ZSkge1xuICAgICAgICBuZXdTbGlkZXNHcmlkLnB1c2goc2xpZGVzR3JpZEl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICBzbmFwR3JpZCA9IG5ld1NsaWRlc0dyaWQ7XG4gICAgaWYgKE1hdGguZmxvb3Ioc3dpcGVyLnZpcnR1YWxTaXplIC0gc3dpcGVyU2l6ZSkgLSBNYXRoLmZsb29yKHNuYXBHcmlkW3NuYXBHcmlkLmxlbmd0aCAtIDFdKSA+IDEpIHtcbiAgICAgIHNuYXBHcmlkLnB1c2goc3dpcGVyLnZpcnR1YWxTaXplIC0gc3dpcGVyU2l6ZSk7XG4gICAgfVxuICB9XG4gIGlmIChpc1ZpcnR1YWwgJiYgcGFyYW1zLmxvb3ApIHtcbiAgICBjb25zdCBzaXplID0gc2xpZGVzU2l6ZXNHcmlkWzBdICsgc3BhY2VCZXR3ZWVuO1xuICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPiAxKSB7XG4gICAgICBjb25zdCBncm91cHMgPSBNYXRoLmNlaWwoKHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZSArIHN3aXBlci52aXJ0dWFsLnNsaWRlc0FmdGVyKSAvIHBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gICAgICBjb25zdCBncm91cFNpemUgPSBzaXplICogcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cHM7IGkgKz0gMSkge1xuICAgICAgICBzbmFwR3JpZC5wdXNoKHNuYXBHcmlkW3NuYXBHcmlkLmxlbmd0aCAtIDFdICsgZ3JvdXBTaXplKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmUgKyBzd2lwZXIudmlydHVhbC5zbGlkZXNBZnRlcjsgaSArPSAxKSB7XG4gICAgICBpZiAocGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAxKSB7XG4gICAgICAgIHNuYXBHcmlkLnB1c2goc25hcEdyaWRbc25hcEdyaWQubGVuZ3RoIC0gMV0gKyBzaXplKTtcbiAgICAgIH1cbiAgICAgIHNsaWRlc0dyaWQucHVzaChzbGlkZXNHcmlkW3NsaWRlc0dyaWQubGVuZ3RoIC0gMV0gKyBzaXplKTtcbiAgICAgIHN3aXBlci52aXJ0dWFsU2l6ZSArPSBzaXplO1xuICAgIH1cbiAgfVxuICBpZiAoc25hcEdyaWQubGVuZ3RoID09PSAwKSBzbmFwR3JpZCA9IFswXTtcbiAgaWYgKHNwYWNlQmV0d2VlbiAhPT0gMCkge1xuICAgIGNvbnN0IGtleSA9IHN3aXBlci5pc0hvcml6b250YWwoKSAmJiBydGwgPyBcIm1hcmdpbkxlZnRcIiA6IHN3aXBlci5nZXREaXJlY3Rpb25MYWJlbChcIm1hcmdpblJpZ2h0XCIpO1xuICAgIHNsaWRlcy5maWx0ZXIoKF8sIHNsaWRlSW5kZXgpID0+IHtcbiAgICAgIGlmICghcGFyYW1zLmNzc01vZGUgfHwgcGFyYW1zLmxvb3ApIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHNsaWRlSW5kZXggPT09IHNsaWRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pLmZvckVhY2goKHNsaWRlRWwpID0+IHtcbiAgICAgIHNsaWRlRWwuc3R5bGVba2V5XSA9IGAke3NwYWNlQmV0d2Vlbn1weGA7XG4gICAgfSk7XG4gIH1cbiAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXNCb3VuZHMpIHtcbiAgICBsZXQgYWxsU2xpZGVzU2l6ZSA9IDA7XG4gICAgc2xpZGVzU2l6ZXNHcmlkLmZvckVhY2goKHNsaWRlU2l6ZVZhbHVlKSA9PiB7XG4gICAgICBhbGxTbGlkZXNTaXplICs9IHNsaWRlU2l6ZVZhbHVlICsgKHNwYWNlQmV0d2VlbiB8fCAwKTtcbiAgICB9KTtcbiAgICBhbGxTbGlkZXNTaXplIC09IHNwYWNlQmV0d2VlbjtcbiAgICBjb25zdCBtYXhTbmFwID0gYWxsU2xpZGVzU2l6ZSA+IHN3aXBlclNpemUgPyBhbGxTbGlkZXNTaXplIC0gc3dpcGVyU2l6ZSA6IDA7XG4gICAgc25hcEdyaWQgPSBzbmFwR3JpZC5tYXAoKHNuYXApID0+IHtcbiAgICAgIGlmIChzbmFwIDw9IDApIHJldHVybiAtb2Zmc2V0QmVmb3JlO1xuICAgICAgaWYgKHNuYXAgPiBtYXhTbmFwKSByZXR1cm4gbWF4U25hcCArIG9mZnNldEFmdGVyO1xuICAgICAgcmV0dXJuIHNuYXA7XG4gICAgfSk7XG4gIH1cbiAgaWYgKHBhcmFtcy5jZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXMpIHtcbiAgICBsZXQgYWxsU2xpZGVzU2l6ZSA9IDA7XG4gICAgc2xpZGVzU2l6ZXNHcmlkLmZvckVhY2goKHNsaWRlU2l6ZVZhbHVlKSA9PiB7XG4gICAgICBhbGxTbGlkZXNTaXplICs9IHNsaWRlU2l6ZVZhbHVlICsgKHNwYWNlQmV0d2VlbiB8fCAwKTtcbiAgICB9KTtcbiAgICBhbGxTbGlkZXNTaXplIC09IHNwYWNlQmV0d2VlbjtcbiAgICBjb25zdCBvZmZzZXRTaXplID0gKHBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmUgfHwgMCkgKyAocGFyYW1zLnNsaWRlc09mZnNldEFmdGVyIHx8IDApO1xuICAgIGlmIChhbGxTbGlkZXNTaXplICsgb2Zmc2V0U2l6ZSA8IHN3aXBlclNpemUpIHtcbiAgICAgIGNvbnN0IGFsbFNsaWRlc09mZnNldCA9IChzd2lwZXJTaXplIC0gYWxsU2xpZGVzU2l6ZSAtIG9mZnNldFNpemUpIC8gMjtcbiAgICAgIHNuYXBHcmlkLmZvckVhY2goKHNuYXAsIHNuYXBJbmRleCkgPT4ge1xuICAgICAgICBzbmFwR3JpZFtzbmFwSW5kZXhdID0gc25hcCAtIGFsbFNsaWRlc09mZnNldDtcbiAgICAgIH0pO1xuICAgICAgc2xpZGVzR3JpZC5mb3JFYWNoKChzbmFwLCBzbmFwSW5kZXgpID0+IHtcbiAgICAgICAgc2xpZGVzR3JpZFtzbmFwSW5kZXhdID0gc25hcCArIGFsbFNsaWRlc09mZnNldDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgIHNsaWRlcyxcbiAgICBzbmFwR3JpZCxcbiAgICBzbGlkZXNHcmlkLFxuICAgIHNsaWRlc1NpemVzR3JpZFxuICB9KTtcbiAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuY3NzTW9kZSAmJiAhcGFyYW1zLmNlbnRlcmVkU2xpZGVzQm91bmRzKSB7XG4gICAgc2V0Q1NTUHJvcGVydHkod3JhcHBlckVsLCBcIi0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1iZWZvcmVcIiwgYCR7LXNuYXBHcmlkWzBdfXB4YCk7XG4gICAgc2V0Q1NTUHJvcGVydHkod3JhcHBlckVsLCBcIi0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1hZnRlclwiLCBgJHtzd2lwZXIuc2l6ZSAvIDIgLSBzbGlkZXNTaXplc0dyaWRbc2xpZGVzU2l6ZXNHcmlkLmxlbmd0aCAtIDFdIC8gMn1weGApO1xuICAgIGNvbnN0IGFkZFRvU25hcEdyaWQgPSAtc3dpcGVyLnNuYXBHcmlkWzBdO1xuICAgIGNvbnN0IGFkZFRvU2xpZGVzR3JpZCA9IC1zd2lwZXIuc2xpZGVzR3JpZFswXTtcbiAgICBzd2lwZXIuc25hcEdyaWQgPSBzd2lwZXIuc25hcEdyaWQubWFwKCh2KSA9PiB2ICsgYWRkVG9TbmFwR3JpZCk7XG4gICAgc3dpcGVyLnNsaWRlc0dyaWQgPSBzd2lwZXIuc2xpZGVzR3JpZC5tYXAoKHYpID0+IHYgKyBhZGRUb1NsaWRlc0dyaWQpO1xuICB9XG4gIGlmIChzbGlkZXNMZW5ndGggIT09IHByZXZpb3VzU2xpZGVzTGVuZ3RoKSB7XG4gICAgc3dpcGVyLmVtaXQoXCJzbGlkZXNMZW5ndGhDaGFuZ2VcIik7XG4gIH1cbiAgaWYgKHNuYXBHcmlkLmxlbmd0aCAhPT0gcHJldmlvdXNTbmFwR3JpZExlbmd0aCkge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cpIHN3aXBlci5jaGVja092ZXJmbG93KCk7XG4gICAgc3dpcGVyLmVtaXQoXCJzbmFwR3JpZExlbmd0aENoYW5nZVwiKTtcbiAgfVxuICBpZiAoc2xpZGVzR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU2xpZGVzR3JpZExlbmd0aCkge1xuICAgIHN3aXBlci5lbWl0KFwic2xpZGVzR3JpZExlbmd0aENoYW5nZVwiKTtcbiAgfVxuICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MpIHtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzT2Zmc2V0KCk7XG4gIH1cbiAgc3dpcGVyLmVtaXQoXCJzbGlkZXNVcGRhdGVkXCIpO1xuICBpZiAoIWlzVmlydHVhbCAmJiAhcGFyYW1zLmNzc01vZGUgJiYgKHBhcmFtcy5lZmZlY3QgPT09IFwic2xpZGVcIiB8fCBwYXJhbXMuZWZmZWN0ID09PSBcImZhZGVcIikpIHtcbiAgICBjb25zdCBiYWNrRmFjZUhpZGRlbkNsYXNzID0gYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9YmFja2ZhY2UtaGlkZGVuYDtcbiAgICBjb25zdCBoYXNDbGFzc0JhY2tmYWNlQ2xhc3NBZGRlZCA9IHN3aXBlci5lbC5jbGFzc0xpc3QuY29udGFpbnMoYmFja0ZhY2VIaWRkZW5DbGFzcyk7XG4gICAgaWYgKHNsaWRlc0xlbmd0aCA8PSBwYXJhbXMubWF4QmFja2ZhY2VIaWRkZW5TbGlkZXMpIHtcbiAgICAgIGlmICghaGFzQ2xhc3NCYWNrZmFjZUNsYXNzQWRkZWQpIHN3aXBlci5lbC5jbGFzc0xpc3QuYWRkKGJhY2tGYWNlSGlkZGVuQ2xhc3MpO1xuICAgIH0gZWxzZSBpZiAoaGFzQ2xhc3NCYWNrZmFjZUNsYXNzQWRkZWQpIHtcbiAgICAgIHN3aXBlci5lbC5jbGFzc0xpc3QucmVtb3ZlKGJhY2tGYWNlSGlkZGVuQ2xhc3MpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gdXBkYXRlQXV0b0hlaWdodChzcGVlZCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBhY3RpdmVTbGlkZXMgPSBbXTtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIGxldCBuZXdIZWlnaHQgPSAwO1xuICBsZXQgaTtcbiAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gXCJudW1iZXJcIikge1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcbiAgfSBlbHNlIGlmIChzcGVlZCA9PT0gdHJ1ZSkge1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHN3aXBlci5wYXJhbXMuc3BlZWQpO1xuICB9XG4gIGNvbnN0IGdldFNsaWRlQnlJbmRleCA9IChpbmRleCkgPT4ge1xuICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVzW3N3aXBlci5nZXRTbGlkZUluZGV4QnlEYXRhKGluZGV4KV07XG4gICAgfVxuICAgIHJldHVybiBzd2lwZXIuc2xpZGVzW2luZGV4XTtcbiAgfTtcbiAgaWYgKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gXCJhdXRvXCIgJiYgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAoc3dpcGVyLnZpc2libGVTbGlkZXMgfHwgW10pLmZvckVhY2goKHNsaWRlMikgPT4ge1xuICAgICAgICBhY3RpdmVTbGlkZXMucHVzaChzbGlkZTIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBNYXRoLmNlaWwoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3KTsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4ICsgaTtcbiAgICAgICAgaWYgKGluZGV4ID4gc3dpcGVyLnNsaWRlcy5sZW5ndGggJiYgIWlzVmlydHVhbCkgYnJlYWs7XG4gICAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKGdldFNsaWRlQnlJbmRleChpbmRleCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhY3RpdmVTbGlkZXMucHVzaChnZXRTbGlkZUJ5SW5kZXgoc3dpcGVyLmFjdGl2ZUluZGV4KSk7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IGFjdGl2ZVNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICh0eXBlb2YgYWN0aXZlU2xpZGVzW2ldICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSBhY3RpdmVTbGlkZXNbaV0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgbmV3SGVpZ2h0ID0gaGVpZ2h0ID4gbmV3SGVpZ2h0ID8gaGVpZ2h0IDogbmV3SGVpZ2h0O1xuICAgIH1cbiAgfVxuICBpZiAobmV3SGVpZ2h0IHx8IG5ld0hlaWdodCA9PT0gMCkgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5oZWlnaHQgPSBgJHtuZXdIZWlnaHR9cHhgO1xufVxuZnVuY3Rpb24gdXBkYXRlU2xpZGVzT2Zmc2V0KCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICBjb25zdCBtaW51c09mZnNldCA9IHN3aXBlci5pc0VsZW1lbnQgPyBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBzd2lwZXIud3JhcHBlckVsLm9mZnNldExlZnQgOiBzd2lwZXIud3JhcHBlckVsLm9mZnNldFRvcCA6IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgc2xpZGVzW2ldLnN3aXBlclNsaWRlT2Zmc2V0ID0gKHN3aXBlci5pc0hvcml6b250YWwoKSA/IHNsaWRlc1tpXS5vZmZzZXRMZWZ0IDogc2xpZGVzW2ldLm9mZnNldFRvcCkgLSBtaW51c09mZnNldCAtIHN3aXBlci5jc3NPdmVyZmxvd0FkanVzdG1lbnQoKTtcbiAgfVxufVxuZnVuY3Rpb24gdXBkYXRlU2xpZGVzUHJvZ3Jlc3ModHJhbnNsYXRlMikge1xuICBpZiAodHJhbnNsYXRlMiA9PT0gdm9pZCAwKSB7XG4gICAgdHJhbnNsYXRlMiA9IHRoaXMgJiYgdGhpcy50cmFuc2xhdGUgfHwgMDtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICBjb25zdCB7XG4gICAgc2xpZGVzLFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHNuYXBHcmlkXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChzbGlkZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gIGlmICh0eXBlb2Ygc2xpZGVzWzBdLnN3aXBlclNsaWRlT2Zmc2V0ID09PSBcInVuZGVmaW5lZFwiKSBzd2lwZXIudXBkYXRlU2xpZGVzT2Zmc2V0KCk7XG4gIGxldCBvZmZzZXRDZW50ZXIgPSAtdHJhbnNsYXRlMjtcbiAgaWYgKHJ0bCkgb2Zmc2V0Q2VudGVyID0gdHJhbnNsYXRlMjtcbiAgc3dpcGVyLnZpc2libGVTbGlkZXNJbmRleGVzID0gW107XG4gIHN3aXBlci52aXNpYmxlU2xpZGVzID0gW107XG4gIGxldCBzcGFjZUJldHdlZW4gPSBwYXJhbXMuc3BhY2VCZXR3ZWVuO1xuICBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gXCJzdHJpbmdcIiAmJiBzcGFjZUJldHdlZW4uaW5kZXhPZihcIiVcIikgPj0gMCkge1xuICAgIHNwYWNlQmV0d2VlbiA9IHBhcnNlRmxvYXQoc3BhY2VCZXR3ZWVuLnJlcGxhY2UoXCIlXCIsIFwiXCIpKSAvIDEwMCAqIHN3aXBlci5zaXplO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzcGFjZUJldHdlZW4gPT09IFwic3RyaW5nXCIpIHtcbiAgICBzcGFjZUJldHdlZW4gPSBwYXJzZUZsb2F0KHNwYWNlQmV0d2Vlbik7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBzbGlkZTIgPSBzbGlkZXNbaV07XG4gICAgbGV0IHNsaWRlT2Zmc2V0ID0gc2xpZGUyLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgIGlmIChwYXJhbXMuY3NzTW9kZSAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIHNsaWRlT2Zmc2V0IC09IHNsaWRlc1swXS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICB9XG4gICAgY29uc3Qgc2xpZGVQcm9ncmVzcyA9IChvZmZzZXRDZW50ZXIgKyAocGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIDogMCkgLSBzbGlkZU9mZnNldCkgLyAoc2xpZGUyLnN3aXBlclNsaWRlU2l6ZSArIHNwYWNlQmV0d2Vlbik7XG4gICAgY29uc3Qgb3JpZ2luYWxTbGlkZVByb2dyZXNzID0gKG9mZnNldENlbnRlciAtIHNuYXBHcmlkWzBdICsgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5taW5UcmFuc2xhdGUoKSA6IDApIC0gc2xpZGVPZmZzZXQpIC8gKHNsaWRlMi5zd2lwZXJTbGlkZVNpemUgKyBzcGFjZUJldHdlZW4pO1xuICAgIGNvbnN0IHNsaWRlQmVmb3JlID0gLShvZmZzZXRDZW50ZXIgLSBzbGlkZU9mZnNldCk7XG4gICAgY29uc3Qgc2xpZGVBZnRlciA9IHNsaWRlQmVmb3JlICsgc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtpXTtcbiAgICBjb25zdCBpc0Z1bGx5VmlzaWJsZSA9IHNsaWRlQmVmb3JlID49IDAgJiYgc2xpZGVCZWZvcmUgPD0gc3dpcGVyLnNpemUgLSBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW2ldO1xuICAgIGNvbnN0IGlzVmlzaWJsZSA9IHNsaWRlQmVmb3JlID49IDAgJiYgc2xpZGVCZWZvcmUgPCBzd2lwZXIuc2l6ZSAtIDEgfHwgc2xpZGVBZnRlciA+IDEgJiYgc2xpZGVBZnRlciA8PSBzd2lwZXIuc2l6ZSB8fCBzbGlkZUJlZm9yZSA8PSAwICYmIHNsaWRlQWZ0ZXIgPj0gc3dpcGVyLnNpemU7XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgc3dpcGVyLnZpc2libGVTbGlkZXMucHVzaChzbGlkZTIpO1xuICAgICAgc3dpcGVyLnZpc2libGVTbGlkZXNJbmRleGVzLnB1c2goaSk7XG4gICAgfVxuICAgIHRvZ2dsZVNsaWRlQ2xhc3NlcyQxKHNsaWRlMiwgaXNWaXNpYmxlLCBwYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MpO1xuICAgIHRvZ2dsZVNsaWRlQ2xhc3NlcyQxKHNsaWRlMiwgaXNGdWxseVZpc2libGUsIHBhcmFtcy5zbGlkZUZ1bGx5VmlzaWJsZUNsYXNzKTtcbiAgICBzbGlkZTIucHJvZ3Jlc3MgPSBydGwgPyAtc2xpZGVQcm9ncmVzcyA6IHNsaWRlUHJvZ3Jlc3M7XG4gICAgc2xpZGUyLm9yaWdpbmFsUHJvZ3Jlc3MgPSBydGwgPyAtb3JpZ2luYWxTbGlkZVByb2dyZXNzIDogb3JpZ2luYWxTbGlkZVByb2dyZXNzO1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUyKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmICh0eXBlb2YgdHJhbnNsYXRlMiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gLTEgOiAxO1xuICAgIHRyYW5zbGF0ZTIgPSBzd2lwZXIgJiYgc3dpcGVyLnRyYW5zbGF0ZSAmJiBzd2lwZXIudHJhbnNsYXRlICogbXVsdGlwbGllciB8fCAwO1xuICB9XG4gIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIGNvbnN0IHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICBsZXQge1xuICAgIHByb2dyZXNzLFxuICAgIGlzQmVnaW5uaW5nLFxuICAgIGlzRW5kLFxuICAgIHByb2dyZXNzTG9vcFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCB3YXNCZWdpbm5pbmcgPSBpc0JlZ2lubmluZztcbiAgY29uc3Qgd2FzRW5kID0gaXNFbmQ7XG4gIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgIHByb2dyZXNzID0gMDtcbiAgICBpc0JlZ2lubmluZyA9IHRydWU7XG4gICAgaXNFbmQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHByb2dyZXNzID0gKHRyYW5zbGF0ZTIgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIC8gdHJhbnNsYXRlc0RpZmY7XG4gICAgY29uc3QgaXNCZWdpbm5pbmdSb3VuZGVkID0gTWF0aC5hYnModHJhbnNsYXRlMiAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgPCAxO1xuICAgIGNvbnN0IGlzRW5kUm91bmRlZCA9IE1hdGguYWJzKHRyYW5zbGF0ZTIgLSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIDwgMTtcbiAgICBpc0JlZ2lubmluZyA9IGlzQmVnaW5uaW5nUm91bmRlZCB8fCBwcm9ncmVzcyA8PSAwO1xuICAgIGlzRW5kID0gaXNFbmRSb3VuZGVkIHx8IHByb2dyZXNzID49IDE7XG4gICAgaWYgKGlzQmVnaW5uaW5nUm91bmRlZCkgcHJvZ3Jlc3MgPSAwO1xuICAgIGlmIChpc0VuZFJvdW5kZWQpIHByb2dyZXNzID0gMTtcbiAgfVxuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBjb25zdCBmaXJzdFNsaWRlSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleEJ5RGF0YSgwKTtcbiAgICBjb25zdCBsYXN0U2xpZGVJbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4QnlEYXRhKHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgZmlyc3RTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2ZpcnN0U2xpZGVJbmRleF07XG4gICAgY29uc3QgbGFzdFNsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbbGFzdFNsaWRlSW5kZXhdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZU1heCA9IHN3aXBlci5zbGlkZXNHcmlkW3N3aXBlci5zbGlkZXNHcmlkLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZUFicyA9IE1hdGguYWJzKHRyYW5zbGF0ZTIpO1xuICAgIGlmICh0cmFuc2xhdGVBYnMgPj0gZmlyc3RTbGlkZVRyYW5zbGF0ZSkge1xuICAgICAgcHJvZ3Jlc3NMb29wID0gKHRyYW5zbGF0ZUFicyAtIGZpcnN0U2xpZGVUcmFuc2xhdGUpIC8gdHJhbnNsYXRlTWF4O1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9ncmVzc0xvb3AgPSAodHJhbnNsYXRlQWJzICsgdHJhbnNsYXRlTWF4IC0gbGFzdFNsaWRlVHJhbnNsYXRlKSAvIHRyYW5zbGF0ZU1heDtcbiAgICB9XG4gICAgaWYgKHByb2dyZXNzTG9vcCA+IDEpIHByb2dyZXNzTG9vcCAtPSAxO1xuICB9XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgcHJvZ3Jlc3MsXG4gICAgcHJvZ3Jlc3NMb29wLFxuICAgIGlzQmVnaW5uaW5nLFxuICAgIGlzRW5kXG4gIH0pO1xuICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgfHwgcGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHBhcmFtcy5hdXRvSGVpZ2h0KSBzd2lwZXIudXBkYXRlU2xpZGVzUHJvZ3Jlc3ModHJhbnNsYXRlMik7XG4gIGlmIChpc0JlZ2lubmluZyAmJiAhd2FzQmVnaW5uaW5nKSB7XG4gICAgc3dpcGVyLmVtaXQoXCJyZWFjaEJlZ2lubmluZyB0b0VkZ2VcIik7XG4gIH1cbiAgaWYgKGlzRW5kICYmICF3YXNFbmQpIHtcbiAgICBzd2lwZXIuZW1pdChcInJlYWNoRW5kIHRvRWRnZVwiKTtcbiAgfVxuICBpZiAod2FzQmVnaW5uaW5nICYmICFpc0JlZ2lubmluZyB8fCB3YXNFbmQgJiYgIWlzRW5kKSB7XG4gICAgc3dpcGVyLmVtaXQoXCJmcm9tRWRnZVwiKTtcbiAgfVxuICBzd2lwZXIuZW1pdChcInByb2dyZXNzXCIsIHByb2dyZXNzKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVNsaWRlc0NsYXNzZXMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBzbGlkZXMsXG4gICAgcGFyYW1zLFxuICAgIHNsaWRlc0VsLFxuICAgIGFjdGl2ZUluZGV4XG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gc3dpcGVyLmdyaWQgJiYgcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDE7XG4gIGNvbnN0IGdldEZpbHRlcmVkU2xpZGUgPSAoc2VsZWN0b3IpID0+IHtcbiAgICByZXR1cm4gZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9JHtzZWxlY3Rvcn0sIHN3aXBlci1zbGlkZSR7c2VsZWN0b3J9YClbMF07XG4gIH07XG4gIGxldCBhY3RpdmVTbGlkZTtcbiAgbGV0IHByZXZTbGlkZTtcbiAgbGV0IG5leHRTbGlkZTtcbiAgaWYgKGlzVmlydHVhbCkge1xuICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgbGV0IHNsaWRlSW5kZXggPSBhY3RpdmVJbmRleCAtIHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZTtcbiAgICAgIGlmIChzbGlkZUluZGV4IDwgMCkgc2xpZGVJbmRleCA9IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggKyBzbGlkZUluZGV4O1xuICAgICAgaWYgKHNsaWRlSW5kZXggPj0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCkgc2xpZGVJbmRleCAtPSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoO1xuICAgICAgYWN0aXZlU2xpZGUgPSBnZXRGaWx0ZXJlZFNsaWRlKGBbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3NsaWRlSW5kZXh9XCJdYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVNsaWRlID0gZ2V0RmlsdGVyZWRTbGlkZShgW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHthY3RpdmVJbmRleH1cIl1gKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICBhY3RpdmVTbGlkZSA9IHNsaWRlcy5maWx0ZXIoKHNsaWRlRWwpID0+IHNsaWRlRWwuY29sdW1uID09PSBhY3RpdmVJbmRleClbMF07XG4gICAgICBuZXh0U2xpZGUgPSBzbGlkZXMuZmlsdGVyKChzbGlkZUVsKSA9PiBzbGlkZUVsLmNvbHVtbiA9PT0gYWN0aXZlSW5kZXggKyAxKVswXTtcbiAgICAgIHByZXZTbGlkZSA9IHNsaWRlcy5maWx0ZXIoKHNsaWRlRWwpID0+IHNsaWRlRWwuY29sdW1uID09PSBhY3RpdmVJbmRleCAtIDEpWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVTbGlkZSA9IHNsaWRlc1thY3RpdmVJbmRleF07XG4gICAgfVxuICB9XG4gIGlmIChhY3RpdmVTbGlkZSkge1xuICAgIGlmICghZ3JpZEVuYWJsZWQpIHtcbiAgICAgIG5leHRTbGlkZSA9IGVsZW1lbnROZXh0QWxsKGFjdGl2ZVNsaWRlLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKVswXTtcbiAgICAgIGlmIChwYXJhbXMubG9vcCAmJiAhbmV4dFNsaWRlKSB7XG4gICAgICAgIG5leHRTbGlkZSA9IHNsaWRlc1swXTtcbiAgICAgIH1cbiAgICAgIHByZXZTbGlkZSA9IGVsZW1lbnRQcmV2QWxsKGFjdGl2ZVNsaWRlLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKVswXTtcbiAgICAgIGlmIChwYXJhbXMubG9vcCAmJiAhcHJldlNsaWRlID09PSAwKSB7XG4gICAgICAgIHByZXZTbGlkZSA9IHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0gMV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHNsaWRlcy5mb3JFYWNoKChzbGlkZUVsKSA9PiB7XG4gICAgdG9nZ2xlU2xpZGVDbGFzc2VzKHNsaWRlRWwsIHNsaWRlRWwgPT09IGFjdGl2ZVNsaWRlLCBwYXJhbXMuc2xpZGVBY3RpdmVDbGFzcyk7XG4gICAgdG9nZ2xlU2xpZGVDbGFzc2VzKHNsaWRlRWwsIHNsaWRlRWwgPT09IG5leHRTbGlkZSwgcGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcbiAgICB0b2dnbGVTbGlkZUNsYXNzZXMoc2xpZGVFbCwgc2xpZGVFbCA9PT0gcHJldlNsaWRlLCBwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICB9KTtcbiAgc3dpcGVyLmVtaXRTbGlkZXNDbGFzc2VzKCk7XG59XG5mdW5jdGlvbiBnZXRBY3RpdmVJbmRleEJ5VHJhbnNsYXRlKHN3aXBlcikge1xuICBjb25zdCB7XG4gICAgc2xpZGVzR3JpZCxcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgdHJhbnNsYXRlMiA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIGxldCBhY3RpdmVJbmRleDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHR5cGVvZiBzbGlkZXNHcmlkW2kgKyAxXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKHRyYW5zbGF0ZTIgPj0gc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUyIDwgc2xpZGVzR3JpZFtpICsgMV0gLSAoc2xpZGVzR3JpZFtpICsgMV0gLSBzbGlkZXNHcmlkW2ldKSAvIDIpIHtcbiAgICAgICAgYWN0aXZlSW5kZXggPSBpO1xuICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGUyID49IHNsaWRlc0dyaWRbaV0gJiYgdHJhbnNsYXRlMiA8IHNsaWRlc0dyaWRbaSArIDFdKSB7XG4gICAgICAgIGFjdGl2ZUluZGV4ID0gaSArIDE7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0cmFuc2xhdGUyID49IHNsaWRlc0dyaWRbaV0pIHtcbiAgICAgIGFjdGl2ZUluZGV4ID0gaTtcbiAgICB9XG4gIH1cbiAgaWYgKHBhcmFtcy5ub3JtYWxpemVTbGlkZUluZGV4KSB7XG4gICAgaWYgKGFjdGl2ZUluZGV4IDwgMCB8fCB0eXBlb2YgYWN0aXZlSW5kZXggPT09IFwidW5kZWZpbmVkXCIpIGFjdGl2ZUluZGV4ID0gMDtcbiAgfVxuICByZXR1cm4gYWN0aXZlSW5kZXg7XG59XG5mdW5jdGlvbiB1cGRhdGVBY3RpdmVJbmRleChuZXdBY3RpdmVJbmRleCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB0cmFuc2xhdGUyID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgY29uc3Qge1xuICAgIHNuYXBHcmlkLFxuICAgIHBhcmFtcyxcbiAgICBhY3RpdmVJbmRleDogcHJldmlvdXNJbmRleCxcbiAgICByZWFsSW5kZXg6IHByZXZpb3VzUmVhbEluZGV4LFxuICAgIHNuYXBJbmRleDogcHJldmlvdXNTbmFwSW5kZXhcbiAgfSA9IHN3aXBlcjtcbiAgbGV0IGFjdGl2ZUluZGV4ID0gbmV3QWN0aXZlSW5kZXg7XG4gIGxldCBzbmFwSW5kZXg7XG4gIGNvbnN0IGdldFZpcnR1YWxSZWFsSW5kZXggPSAoYUluZGV4KSA9PiB7XG4gICAgbGV0IHJlYWxJbmRleDIgPSBhSW5kZXggLSBzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmU7XG4gICAgaWYgKHJlYWxJbmRleDIgPCAwKSB7XG4gICAgICByZWFsSW5kZXgyID0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCArIHJlYWxJbmRleDI7XG4gICAgfVxuICAgIGlmIChyZWFsSW5kZXgyID49IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgIHJlYWxJbmRleDIgLT0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHJlYWxJbmRleDI7XG4gIH07XG4gIGlmICh0eXBlb2YgYWN0aXZlSW5kZXggPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBhY3RpdmVJbmRleCA9IGdldEFjdGl2ZUluZGV4QnlUcmFuc2xhdGUoc3dpcGVyKTtcbiAgfVxuICBpZiAoc25hcEdyaWQuaW5kZXhPZih0cmFuc2xhdGUyKSA+PSAwKSB7XG4gICAgc25hcEluZGV4ID0gc25hcEdyaWQuaW5kZXhPZih0cmFuc2xhdGUyKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBza2lwID0gTWF0aC5taW4ocGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgYWN0aXZlSW5kZXgpO1xuICAgIHNuYXBJbmRleCA9IHNraXAgKyBNYXRoLmZsb29yKChhY3RpdmVJbmRleCAtIHNraXApIC8gcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgfVxuICBpZiAoc25hcEluZGV4ID49IHNuYXBHcmlkLmxlbmd0aCkgc25hcEluZGV4ID0gc25hcEdyaWQubGVuZ3RoIC0gMTtcbiAgaWYgKGFjdGl2ZUluZGV4ID09PSBwcmV2aW91c0luZGV4ICYmICFzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoc25hcEluZGV4ICE9PSBwcmV2aW91c1NuYXBJbmRleCkge1xuICAgICAgc3dpcGVyLnNuYXBJbmRleCA9IHNuYXBJbmRleDtcbiAgICAgIHN3aXBlci5lbWl0KFwic25hcEluZGV4Q2hhbmdlXCIpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGFjdGl2ZUluZGV4ID09PSBwcmV2aW91c0luZGV4ICYmIHN3aXBlci5wYXJhbXMubG9vcCAmJiBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgIHN3aXBlci5yZWFsSW5kZXggPSBnZXRWaXJ0dWFsUmVhbEluZGV4KGFjdGl2ZUluZGV4KTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBzd2lwZXIuZ3JpZCAmJiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMTtcbiAgbGV0IHJlYWxJbmRleDtcbiAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgJiYgcGFyYW1zLmxvb3ApIHtcbiAgICByZWFsSW5kZXggPSBnZXRWaXJ0dWFsUmVhbEluZGV4KGFjdGl2ZUluZGV4KTtcbiAgfSBlbHNlIGlmIChncmlkRW5hYmxlZCkge1xuICAgIGNvbnN0IGZpcnN0U2xpZGVJbkNvbHVtbiA9IHN3aXBlci5zbGlkZXMuZmlsdGVyKChzbGlkZUVsKSA9PiBzbGlkZUVsLmNvbHVtbiA9PT0gYWN0aXZlSW5kZXgpWzBdO1xuICAgIGxldCBhY3RpdmVTbGlkZUluZGV4ID0gcGFyc2VJbnQoZmlyc3RTbGlkZUluQ29sdW1uLmdldEF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpLCAxMCk7XG4gICAgaWYgKE51bWJlci5pc05hTihhY3RpdmVTbGlkZUluZGV4KSkge1xuICAgICAgYWN0aXZlU2xpZGVJbmRleCA9IE1hdGgubWF4KHN3aXBlci5zbGlkZXMuaW5kZXhPZihmaXJzdFNsaWRlSW5Db2x1bW4pLCAwKTtcbiAgICB9XG4gICAgcmVhbEluZGV4ID0gTWF0aC5mbG9vcihhY3RpdmVTbGlkZUluZGV4IC8gcGFyYW1zLmdyaWQucm93cyk7XG4gIH0gZWxzZSBpZiAoc3dpcGVyLnNsaWRlc1thY3RpdmVJbmRleF0pIHtcbiAgICBjb25zdCBzbGlkZUluZGV4ID0gc3dpcGVyLnNsaWRlc1thY3RpdmVJbmRleF0uZ2V0QXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIik7XG4gICAgaWYgKHNsaWRlSW5kZXgpIHtcbiAgICAgIHJlYWxJbmRleCA9IHBhcnNlSW50KHNsaWRlSW5kZXgsIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVhbEluZGV4ID0gYWN0aXZlSW5kZXg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlYWxJbmRleCA9IGFjdGl2ZUluZGV4O1xuICB9XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgcHJldmlvdXNTbmFwSW5kZXgsXG4gICAgc25hcEluZGV4LFxuICAgIHByZXZpb3VzUmVhbEluZGV4LFxuICAgIHJlYWxJbmRleCxcbiAgICBwcmV2aW91c0luZGV4LFxuICAgIGFjdGl2ZUluZGV4XG4gIH0pO1xuICBpZiAoc3dpcGVyLmluaXRpYWxpemVkKSB7XG4gICAgcHJlbG9hZChzd2lwZXIpO1xuICB9XG4gIHN3aXBlci5lbWl0KFwiYWN0aXZlSW5kZXhDaGFuZ2VcIik7XG4gIHN3aXBlci5lbWl0KFwic25hcEluZGV4Q2hhbmdlXCIpO1xuICBpZiAoc3dpcGVyLmluaXRpYWxpemVkIHx8IHN3aXBlci5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0KSB7XG4gICAgaWYgKHByZXZpb3VzUmVhbEluZGV4ICE9PSByZWFsSW5kZXgpIHtcbiAgICAgIHN3aXBlci5lbWl0KFwicmVhbEluZGV4Q2hhbmdlXCIpO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdChcInNsaWRlQ2hhbmdlXCIpO1xuICB9XG59XG5mdW5jdGlvbiB1cGRhdGVDbGlja2VkU2xpZGUoZWwsIHBhdGgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgbGV0IHNsaWRlMiA9IGVsLmNsb3Nlc3QoYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCk7XG4gIGlmICghc2xpZGUyICYmIHN3aXBlci5pc0VsZW1lbnQgJiYgcGF0aCAmJiBwYXRoLmxlbmd0aCA+IDEgJiYgcGF0aC5pbmNsdWRlcyhlbCkpIHtcbiAgICBbLi4ucGF0aC5zbGljZShwYXRoLmluZGV4T2YoZWwpICsgMSwgcGF0aC5sZW5ndGgpXS5mb3JFYWNoKChwYXRoRWwpID0+IHtcbiAgICAgIGlmICghc2xpZGUyICYmIHBhdGhFbC5tYXRjaGVzICYmIHBhdGhFbC5tYXRjaGVzKGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApKSB7XG4gICAgICAgIHNsaWRlMiA9IHBhdGhFbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBsZXQgc2xpZGVGb3VuZCA9IGZhbHNlO1xuICBsZXQgc2xpZGVJbmRleDtcbiAgaWYgKHNsaWRlMikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyLnNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHN3aXBlci5zbGlkZXNbaV0gPT09IHNsaWRlMikge1xuICAgICAgICBzbGlkZUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoc2xpZGUyICYmIHNsaWRlRm91bmQpIHtcbiAgICBzd2lwZXIuY2xpY2tlZFNsaWRlID0gc2xpZGUyO1xuICAgIGlmIChzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9IHBhcnNlSW50KHNsaWRlMi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuY2xpY2tlZEluZGV4ID0gc2xpZGVJbmRleDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLmNsaWNrZWRTbGlkZSA9IHZvaWQgMDtcbiAgICBzd2lwZXIuY2xpY2tlZEluZGV4ID0gdm9pZCAwO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLnNsaWRlVG9DbGlja2VkU2xpZGUgJiYgc3dpcGVyLmNsaWNrZWRJbmRleCAhPT0gdm9pZCAwICYmIHN3aXBlci5jbGlja2VkSW5kZXggIT09IHN3aXBlci5hY3RpdmVJbmRleCkge1xuICAgIHN3aXBlci5zbGlkZVRvQ2xpY2tlZFNsaWRlKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFN3aXBlclRyYW5zbGF0ZShheGlzKSB7XG4gIGlmIChheGlzID09PSB2b2lkIDApIHtcbiAgICBheGlzID0gdGhpcy5pc0hvcml6b250YWwoKSA/IFwieFwiIDogXCJ5XCI7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZTIsXG4gICAgd3JhcHBlckVsXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChwYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkge1xuICAgIHJldHVybiBydGwgPyAtdHJhbnNsYXRlMiA6IHRyYW5zbGF0ZTI7XG4gIH1cbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgcmV0dXJuIHRyYW5zbGF0ZTI7XG4gIH1cbiAgbGV0IGN1cnJlbnRUcmFuc2xhdGUgPSBnZXRUcmFuc2xhdGUod3JhcHBlckVsLCBheGlzKTtcbiAgY3VycmVudFRyYW5zbGF0ZSArPSBzd2lwZXIuY3NzT3ZlcmZsb3dBZGp1c3RtZW50KCk7XG4gIGlmIChydGwpIGN1cnJlbnRUcmFuc2xhdGUgPSAtY3VycmVudFRyYW5zbGF0ZTtcbiAgcmV0dXJuIGN1cnJlbnRUcmFuc2xhdGUgfHwgMDtcbn1cbmZ1bmN0aW9uIHNldFRyYW5zbGF0ZSh0cmFuc2xhdGUyLCBieUNvbnRyb2xsZXIpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHBhcmFtcyxcbiAgICB3cmFwcGVyRWwsXG4gICAgcHJvZ3Jlc3NcbiAgfSA9IHN3aXBlcjtcbiAgbGV0IHggPSAwO1xuICBsZXQgeSA9IDA7XG4gIGNvbnN0IHogPSAwO1xuICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgeCA9IHJ0bCA/IC10cmFuc2xhdGUyIDogdHJhbnNsYXRlMjtcbiAgfSBlbHNlIHtcbiAgICB5ID0gdHJhbnNsYXRlMjtcbiAgfVxuICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykge1xuICAgIHggPSBNYXRoLmZsb29yKHgpO1xuICAgIHkgPSBNYXRoLmZsb29yKHkpO1xuICB9XG4gIHN3aXBlci5wcmV2aW91c1RyYW5zbGF0ZSA9IHN3aXBlci50cmFuc2xhdGU7XG4gIHN3aXBlci50cmFuc2xhdGUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB4IDogeTtcbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgd3JhcHBlckVsW3N3aXBlci5pc0hvcml6b250YWwoKSA/IFwic2Nyb2xsTGVmdFwiIDogXCJzY3JvbGxUb3BcIl0gPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAteCA6IC15O1xuICB9IGVsc2UgaWYgKCFwYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkge1xuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgIHggLT0gc3dpcGVyLmNzc092ZXJmbG93QWRqdXN0bWVudCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB5IC09IHN3aXBlci5jc3NPdmVyZmxvd0FkanVzdG1lbnQoKTtcbiAgICB9XG4gICAgd3JhcHBlckVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgJHt6fXB4KWA7XG4gIH1cbiAgbGV0IG5ld1Byb2dyZXNzO1xuICBjb25zdCB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgaWYgKHRyYW5zbGF0ZXNEaWZmID09PSAwKSB7XG4gICAgbmV3UHJvZ3Jlc3MgPSAwO1xuICB9IGVsc2Uge1xuICAgIG5ld1Byb2dyZXNzID0gKHRyYW5zbGF0ZTIgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIC8gdHJhbnNsYXRlc0RpZmY7XG4gIH1cbiAgaWYgKG5ld1Byb2dyZXNzICE9PSBwcm9ncmVzcykge1xuICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUyKTtcbiAgfVxuICBzd2lwZXIuZW1pdChcInNldFRyYW5zbGF0ZVwiLCBzd2lwZXIudHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpO1xufVxuZnVuY3Rpb24gbWluVHJhbnNsYXRlKCkge1xuICByZXR1cm4gLXRoaXMuc25hcEdyaWRbMF07XG59XG5mdW5jdGlvbiBtYXhUcmFuc2xhdGUoKSB7XG4gIHJldHVybiAtdGhpcy5zbmFwR3JpZFt0aGlzLnNuYXBHcmlkLmxlbmd0aCAtIDFdO1xufVxuZnVuY3Rpb24gdHJhbnNsYXRlVG8odHJhbnNsYXRlMiwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgdHJhbnNsYXRlQm91bmRzLCBpbnRlcm5hbCkge1xuICBpZiAodHJhbnNsYXRlMiA9PT0gdm9pZCAwKSB7XG4gICAgdHJhbnNsYXRlMiA9IDA7XG4gIH1cbiAgaWYgKHNwZWVkID09PSB2b2lkIDApIHtcbiAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICB9XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgaWYgKHRyYW5zbGF0ZUJvdW5kcyA9PT0gdm9pZCAwKSB7XG4gICAgdHJhbnNsYXRlQm91bmRzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHdyYXBwZXJFbFxuICB9ID0gc3dpcGVyO1xuICBpZiAoc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IG1pblRyYW5zbGF0ZTIgPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gIGNvbnN0IG1heFRyYW5zbGF0ZTIgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCk7XG4gIGxldCBuZXdUcmFuc2xhdGU7XG4gIGlmICh0cmFuc2xhdGVCb3VuZHMgJiYgdHJhbnNsYXRlMiA+IG1pblRyYW5zbGF0ZTIpIG5ld1RyYW5zbGF0ZSA9IG1pblRyYW5zbGF0ZTI7XG4gIGVsc2UgaWYgKHRyYW5zbGF0ZUJvdW5kcyAmJiB0cmFuc2xhdGUyIDwgbWF4VHJhbnNsYXRlMikgbmV3VHJhbnNsYXRlID0gbWF4VHJhbnNsYXRlMjtcbiAgZWxzZSBuZXdUcmFuc2xhdGUgPSB0cmFuc2xhdGUyO1xuICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MobmV3VHJhbnNsYXRlKTtcbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgY29uc3QgaXNIID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpO1xuICAgIGlmIChzcGVlZCA9PT0gMCkge1xuICAgICAgd3JhcHBlckVsW2lzSCA/IFwic2Nyb2xsTGVmdFwiIDogXCJzY3JvbGxUb3BcIl0gPSAtbmV3VHJhbnNsYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXN3aXBlci5zdXBwb3J0LnNtb290aFNjcm9sbCkge1xuICAgICAgICBhbmltYXRlQ1NTTW9kZVNjcm9sbCh7XG4gICAgICAgICAgc3dpcGVyLFxuICAgICAgICAgIHRhcmdldFBvc2l0aW9uOiAtbmV3VHJhbnNsYXRlLFxuICAgICAgICAgIHNpZGU6IGlzSCA/IFwibGVmdFwiIDogXCJ0b3BcIlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICB3cmFwcGVyRWwuc2Nyb2xsVG8oe1xuICAgICAgICBbaXNIID8gXCJsZWZ0XCIgOiBcInRvcFwiXTogLW5ld1RyYW5zbGF0ZSxcbiAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG4gICAgaWYgKHJ1bkNhbGxiYWNrcykge1xuICAgICAgc3dpcGVyLmVtaXQoXCJiZWZvcmVUcmFuc2l0aW9uU3RhcnRcIiwgc3BlZWQsIGludGVybmFsKTtcbiAgICAgIHN3aXBlci5lbWl0KFwidHJhbnNpdGlvbkVuZFwiKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3BlZWQpO1xuICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3VHJhbnNsYXRlKTtcbiAgICBpZiAocnVuQ2FsbGJhY2tzKSB7XG4gICAgICBzd2lwZXIuZW1pdChcImJlZm9yZVRyYW5zaXRpb25TdGFydFwiLCBzcGVlZCwgaW50ZXJuYWwpO1xuICAgICAgc3dpcGVyLmVtaXQoXCJ0cmFuc2l0aW9uU3RhcnRcIik7XG4gICAgfVxuICAgIGlmICghc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICBpZiAoIXN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpIHtcbiAgICAgICAgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQyKGUpIHtcbiAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSByZXR1cm47XG4gICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gbnVsbDtcbiAgICAgICAgICBkZWxldGUgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZDtcbiAgICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHJ1bkNhbGxiYWNrcykge1xuICAgICAgICAgICAgc3dpcGVyLmVtaXQoXCJ0cmFuc2l0aW9uRW5kXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHN3aXBlci53cmFwcGVyRWwuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmICghc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtkdXJhdGlvbn1tc2A7XG4gICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS50cmFuc2l0aW9uRGVsYXkgPSBkdXJhdGlvbiA9PT0gMCA/IGAwbXNgIDogXCJcIjtcbiAgfVxuICBzd2lwZXIuZW1pdChcInNldFRyYW5zaXRpb25cIiwgZHVyYXRpb24sIGJ5Q29udHJvbGxlcik7XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uRW1pdChfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIHJ1bkNhbGxiYWNrcyxcbiAgICBkaXJlY3Rpb24sXG4gICAgc3RlcFxuICB9ID0gX3JlZjtcbiAgY29uc3Qge1xuICAgIGFjdGl2ZUluZGV4LFxuICAgIHByZXZpb3VzSW5kZXhcbiAgfSA9IHN3aXBlcjtcbiAgbGV0IGRpciA9IGRpcmVjdGlvbjtcbiAgaWYgKCFkaXIpIHtcbiAgICBpZiAoYWN0aXZlSW5kZXggPiBwcmV2aW91c0luZGV4KSBkaXIgPSBcIm5leHRcIjtcbiAgICBlbHNlIGlmIChhY3RpdmVJbmRleCA8IHByZXZpb3VzSW5kZXgpIGRpciA9IFwicHJldlwiO1xuICAgIGVsc2UgZGlyID0gXCJyZXNldFwiO1xuICB9XG4gIHN3aXBlci5lbWl0KGB0cmFuc2l0aW9uJHtzdGVwfWApO1xuICBpZiAocnVuQ2FsbGJhY2tzICYmIGFjdGl2ZUluZGV4ICE9PSBwcmV2aW91c0luZGV4KSB7XG4gICAgaWYgKGRpciA9PT0gXCJyZXNldFwiKSB7XG4gICAgICBzd2lwZXIuZW1pdChgc2xpZGVSZXNldFRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KGBzbGlkZUNoYW5nZVRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gICAgaWYgKGRpciA9PT0gXCJuZXh0XCIpIHtcbiAgICAgIHN3aXBlci5lbWl0KGBzbGlkZU5leHRUcmFuc2l0aW9uJHtzdGVwfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuZW1pdChgc2xpZGVQcmV2VHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbikge1xuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSByZXR1cm47XG4gIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gIH1cbiAgdHJhbnNpdGlvbkVtaXQoe1xuICAgIHN3aXBlcixcbiAgICBydW5DYWxsYmFja3MsXG4gICAgZGlyZWN0aW9uLFxuICAgIHN0ZXA6IFwiU3RhcnRcIlxuICB9KTtcbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pIHtcbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIHN3aXBlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSByZXR1cm47XG4gIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuICB0cmFuc2l0aW9uRW1pdCh7XG4gICAgc3dpcGVyLFxuICAgIHJ1bkNhbGxiYWNrcyxcbiAgICBkaXJlY3Rpb24sXG4gICAgc3RlcDogXCJFbmRcIlxuICB9KTtcbn1cbmZ1bmN0aW9uIHNsaWRlVG8oaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsLCBpbml0aWFsKSB7XG4gIGlmIChpbmRleCA9PT0gdm9pZCAwKSB7XG4gICAgaW5kZXggPSAwO1xuICB9XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgaWYgKHR5cGVvZiBpbmRleCA9PT0gXCJzdHJpbmdcIikge1xuICAgIGluZGV4ID0gcGFyc2VJbnQoaW5kZXgsIDEwKTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBsZXQgc2xpZGVJbmRleCA9IGluZGV4O1xuICBpZiAoc2xpZGVJbmRleCA8IDApIHNsaWRlSW5kZXggPSAwO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHNuYXBHcmlkLFxuICAgIHNsaWRlc0dyaWQsXG4gICAgcHJldmlvdXNJbmRleCxcbiAgICBhY3RpdmVJbmRleCxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICB3cmFwcGVyRWwsXG4gICAgZW5hYmxlZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQgJiYgIWludGVybmFsICYmICFpbml0aWFsIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2Ygc3BlZWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzcGVlZCA9IHN3aXBlci5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgY29uc3Qgc2tpcCA9IE1hdGgubWluKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLCBzbGlkZUluZGV4KTtcbiAgbGV0IHNuYXBJbmRleCA9IHNraXAgKyBNYXRoLmZsb29yKChzbGlkZUluZGV4IC0gc2tpcCkgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgaWYgKHNuYXBJbmRleCA+PSBzbmFwR3JpZC5sZW5ndGgpIHNuYXBJbmRleCA9IHNuYXBHcmlkLmxlbmd0aCAtIDE7XG4gIGNvbnN0IHRyYW5zbGF0ZTIgPSAtc25hcEdyaWRbc25hcEluZGV4XTtcbiAgaWYgKHBhcmFtcy5ub3JtYWxpemVTbGlkZUluZGV4KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBub3JtYWxpemVkVHJhbnNsYXRlID0gLU1hdGguZmxvb3IodHJhbnNsYXRlMiAqIDEwMCk7XG4gICAgICBjb25zdCBub3JtYWxpemVkR3JpZCA9IE1hdGguZmxvb3Ioc2xpZGVzR3JpZFtpXSAqIDEwMCk7XG4gICAgICBjb25zdCBub3JtYWxpemVkR3JpZE5leHQgPSBNYXRoLmZsb29yKHNsaWRlc0dyaWRbaSArIDFdICogMTAwKTtcbiAgICAgIGlmICh0eXBlb2Ygc2xpZGVzR3JpZFtpICsgMV0gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKG5vcm1hbGl6ZWRUcmFuc2xhdGUgPj0gbm9ybWFsaXplZEdyaWQgJiYgbm9ybWFsaXplZFRyYW5zbGF0ZSA8IG5vcm1hbGl6ZWRHcmlkTmV4dCAtIChub3JtYWxpemVkR3JpZE5leHQgLSBub3JtYWxpemVkR3JpZCkgLyAyKSB7XG4gICAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9ybWFsaXplZFRyYW5zbGF0ZSA+PSBub3JtYWxpemVkR3JpZCAmJiBub3JtYWxpemVkVHJhbnNsYXRlIDwgbm9ybWFsaXplZEdyaWROZXh0KSB7XG4gICAgICAgICAgc2xpZGVJbmRleCA9IGkgKyAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5vcm1hbGl6ZWRUcmFuc2xhdGUgPj0gbm9ybWFsaXplZEdyaWQpIHtcbiAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChzd2lwZXIuaW5pdGlhbGl6ZWQgJiYgc2xpZGVJbmRleCAhPT0gYWN0aXZlSW5kZXgpIHtcbiAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiAocnRsID8gdHJhbnNsYXRlMiA+IHN3aXBlci50cmFuc2xhdGUgJiYgdHJhbnNsYXRlMiA+IHN3aXBlci5taW5UcmFuc2xhdGUoKSA6IHRyYW5zbGF0ZTIgPCBzd2lwZXIudHJhbnNsYXRlICYmIHRyYW5zbGF0ZTIgPCBzd2lwZXIubWluVHJhbnNsYXRlKCkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmIHRyYW5zbGF0ZTIgPiBzd2lwZXIudHJhbnNsYXRlICYmIHRyYW5zbGF0ZTIgPiBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgIGlmICgoYWN0aXZlSW5kZXggfHwgMCkgIT09IHNsaWRlSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoc2xpZGVJbmRleCAhPT0gKHByZXZpb3VzSW5kZXggfHwgMCkgJiYgcnVuQ2FsbGJhY2tzKSB7XG4gICAgc3dpcGVyLmVtaXQoXCJiZWZvcmVTbGlkZUNoYW5nZVN0YXJ0XCIpO1xuICB9XG4gIHN3aXBlci51cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUyKTtcbiAgbGV0IGRpcmVjdGlvbjtcbiAgaWYgKHNsaWRlSW5kZXggPiBhY3RpdmVJbmRleCkgZGlyZWN0aW9uID0gXCJuZXh0XCI7XG4gIGVsc2UgaWYgKHNsaWRlSW5kZXggPCBhY3RpdmVJbmRleCkgZGlyZWN0aW9uID0gXCJwcmV2XCI7XG4gIGVsc2UgZGlyZWN0aW9uID0gXCJyZXNldFwiO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgY29uc3QgaXNJbml0aWFsVmlydHVhbCA9IGlzVmlydHVhbCAmJiBpbml0aWFsO1xuICBpZiAoIWlzSW5pdGlhbFZpcnR1YWwgJiYgKHJ0bCAmJiAtdHJhbnNsYXRlMiA9PT0gc3dpcGVyLnRyYW5zbGF0ZSB8fCAhcnRsICYmIHRyYW5zbGF0ZTIgPT09IHN3aXBlci50cmFuc2xhdGUpKSB7XG4gICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KHNsaWRlSW5kZXgpO1xuICAgIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICB9XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICBpZiAocGFyYW1zLmVmZmVjdCAhPT0gXCJzbGlkZVwiKSB7XG4gICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZTIpO1xuICAgIH1cbiAgICBpZiAoZGlyZWN0aW9uICE9PSBcInJlc2V0XCIpIHtcbiAgICAgIHN3aXBlci50cmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgY29uc3QgaXNIID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpO1xuICAgIGNvbnN0IHQgPSBydGwgPyB0cmFuc2xhdGUyIDogLXRyYW5zbGF0ZTI7XG4gICAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuc2Nyb2xsU25hcFR5cGUgPSBcIm5vbmVcIjtcbiAgICAgICAgc3dpcGVyLl9pbW1lZGlhdGVWaXJ0dWFsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ZpcnR1YWwgJiYgIXN3aXBlci5fY3NzTW9kZVZpcnR1YWxJbml0aWFsU2V0ICYmIHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlID4gMCkge1xuICAgICAgICBzd2lwZXIuX2Nzc01vZGVWaXJ0dWFsSW5pdGlhbFNldCA9IHRydWU7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgd3JhcHBlckVsW2lzSCA/IFwic2Nyb2xsTGVmdFwiIDogXCJzY3JvbGxUb3BcIl0gPSB0O1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyYXBwZXJFbFtpc0ggPyBcInNjcm9sbExlZnRcIiA6IFwic2Nyb2xsVG9wXCJdID0gdDtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnNjcm9sbFNuYXBUeXBlID0gXCJcIjtcbiAgICAgICAgICBzd2lwZXIuX2ltbWVkaWF0ZVZpcnR1YWwgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghc3dpcGVyLnN1cHBvcnQuc21vb3RoU2Nyb2xsKSB7XG4gICAgICAgIGFuaW1hdGVDU1NNb2RlU2Nyb2xsKHtcbiAgICAgICAgICBzd2lwZXIsXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb246IHQsXG4gICAgICAgICAgc2lkZTogaXNIID8gXCJsZWZ0XCIgOiBcInRvcFwiXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHdyYXBwZXJFbC5zY3JvbGxUbyh7XG4gICAgICAgIFtpc0ggPyBcImxlZnRcIiA6IFwidG9wXCJdOiB0LFxuICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcbiAgc3dpcGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUyKTtcbiAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KHNsaWRlSW5kZXgpO1xuICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICBzd2lwZXIuZW1pdChcImJlZm9yZVRyYW5zaXRpb25TdGFydFwiLCBzcGVlZCwgaW50ZXJuYWwpO1xuICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICB9IGVsc2UgaWYgKCFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgc3dpcGVyLmFuaW1hdGluZyA9IHRydWU7XG4gICAgaWYgKCFzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpIHtcbiAgICAgIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQyKGUpIHtcbiAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICAgICAgICBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQgPSBudWxsO1xuICAgICAgICBkZWxldGUgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kO1xuICAgICAgICBzd2lwZXIudHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgICB9O1xuICAgIH1cbiAgICBzd2lwZXIud3JhcHBlckVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBzbGlkZVRvTG9vcChpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgaWYgKGluZGV4ID09PSB2b2lkIDApIHtcbiAgICBpbmRleCA9IDA7XG4gIH1cbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBpZiAodHlwZW9mIGluZGV4ID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3QgaW5kZXhBc051bWJlciA9IHBhcnNlSW50KGluZGV4LCAxMCk7XG4gICAgaW5kZXggPSBpbmRleEFzTnVtYmVyO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmIChzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gIGlmICh0eXBlb2Ygc3BlZWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzcGVlZCA9IHN3aXBlci5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBzd2lwZXIuZ3JpZCAmJiBzd2lwZXIucGFyYW1zLmdyaWQgJiYgc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuICBsZXQgbmV3SW5kZXggPSBpbmRleDtcbiAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgIGlmIChzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgbmV3SW5kZXggPSBuZXdJbmRleCArIHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRhcmdldFNsaWRlSW5kZXg7XG4gICAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IG5ld0luZGV4ICogc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3M7XG4gICAgICAgIHRhcmdldFNsaWRlSW5kZXggPSBzd2lwZXIuc2xpZGVzLmZpbHRlcigoc2xpZGVFbCkgPT4gc2xpZGVFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSAqIDEgPT09IHNsaWRlSW5kZXgpWzBdLmNvbHVtbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFNsaWRlSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleEJ5RGF0YShuZXdJbmRleCk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb2xzID0gZ3JpZEVuYWJsZWQgPyBNYXRoLmNlaWwoc3dpcGVyLnNsaWRlcy5sZW5ndGggLyBzd2lwZXIucGFyYW1zLmdyaWQucm93cykgOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2VudGVyZWRTbGlkZXNcbiAgICAgIH0gPSBzd2lwZXIucGFyYW1zO1xuICAgICAgbGV0IHNsaWRlc1BlclZpZXcgPSBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICBpZiAoc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIpIHtcbiAgICAgICAgc2xpZGVzUGVyVmlldyA9IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGVzUGVyVmlldyA9IE1hdGguY2VpbChwYXJzZUZsb2F0KHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldywgMTApKTtcbiAgICAgICAgaWYgKGNlbnRlcmVkU2xpZGVzICYmIHNsaWRlc1BlclZpZXcgJSAyID09PSAwKSB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldyA9IHNsaWRlc1BlclZpZXcgKyAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsZXQgbmVlZExvb3BGaXggPSBjb2xzIC0gdGFyZ2V0U2xpZGVJbmRleCA8IHNsaWRlc1BlclZpZXc7XG4gICAgICBpZiAoY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgbmVlZExvb3BGaXggPSBuZWVkTG9vcEZpeCB8fCB0YXJnZXRTbGlkZUluZGV4IDwgTWF0aC5jZWlsKHNsaWRlc1BlclZpZXcgLyAyKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnRlcm5hbCAmJiBjZW50ZXJlZFNsaWRlcyAmJiBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09IFwiYXV0b1wiICYmICFncmlkRW5hYmxlZCkge1xuICAgICAgICBuZWVkTG9vcEZpeCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMb29wRml4KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGNlbnRlcmVkU2xpZGVzID8gdGFyZ2V0U2xpZGVJbmRleCA8IHN3aXBlci5hY3RpdmVJbmRleCA/IFwicHJldlwiIDogXCJuZXh0XCIgOiB0YXJnZXRTbGlkZUluZGV4IC0gc3dpcGVyLmFjdGl2ZUluZGV4IC0gMSA8IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA/IFwibmV4dFwiIDogXCJwcmV2XCI7XG4gICAgICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgICAgc2xpZGVUbzogdHJ1ZSxcbiAgICAgICAgICBhY3RpdmVTbGlkZUluZGV4OiBkaXJlY3Rpb24gPT09IFwibmV4dFwiID8gdGFyZ2V0U2xpZGVJbmRleCArIDEgOiB0YXJnZXRTbGlkZUluZGV4IC0gY29scyArIDEsXG4gICAgICAgICAgc2xpZGVSZWFsSW5kZXg6IGRpcmVjdGlvbiA9PT0gXCJuZXh0XCIgPyBzd2lwZXIucmVhbEluZGV4IDogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBuZXdJbmRleCAqIHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzO1xuICAgICAgICBuZXdJbmRleCA9IHN3aXBlci5zbGlkZXMuZmlsdGVyKChzbGlkZUVsKSA9PiBzbGlkZUVsLmdldEF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpICogMSA9PT0gc2xpZGVJbmRleClbMF0uY29sdW1uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3SW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleEJ5RGF0YShuZXdJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgc3dpcGVyLnNsaWRlVG8obmV3SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfSk7XG4gIHJldHVybiBzd2lwZXI7XG59XG5mdW5jdGlvbiBzbGlkZU5leHQoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgZW5hYmxlZCxcbiAgICBwYXJhbXMsXG4gICAgYW5pbWF0aW5nXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm4gc3dpcGVyO1xuICBpZiAodHlwZW9mIHNwZWVkID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgc3BlZWQgPSBzd2lwZXIucGFyYW1zLnNwZWVkO1xuICB9XG4gIGxldCBwZXJHcm91cCA9IHBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIiAmJiBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDEgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwQXV0bykge1xuICAgIHBlckdyb3VwID0gTWF0aC5tYXgoc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKFwiY3VycmVudFwiLCB0cnVlKSwgMSk7XG4gIH1cbiAgY29uc3QgaW5jcmVtZW50ID0gc3dpcGVyLmFjdGl2ZUluZGV4IDwgcGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCA/IDEgOiBwZXJHcm91cDtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgaWYgKGFuaW1hdGluZyAmJiAhaXNWaXJ0dWFsICYmIHBhcmFtcy5sb29wUHJldmVudHNTbGlkaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgZGlyZWN0aW9uOiBcIm5leHRcIlxuICAgIH0pO1xuICAgIHN3aXBlci5fY2xpZW50TGVmdCA9IHN3aXBlci53cmFwcGVyRWwuY2xpZW50TGVmdDtcbiAgICBpZiAoc3dpcGVyLmFjdGl2ZUluZGV4ID09PSBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEgJiYgcGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCArIGluY3JlbWVudCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKHBhcmFtcy5yZXdpbmQgJiYgc3dpcGVyLmlzRW5kKSB7XG4gICAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKDAsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfVxuICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4ICsgaW5jcmVtZW50LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG59XG5mdW5jdGlvbiBzbGlkZVByZXYoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHNuYXBHcmlkLFxuICAgIHNsaWRlc0dyaWQsXG4gICAgcnRsVHJhbnNsYXRlLFxuICAgIGVuYWJsZWQsXG4gICAgYW5pbWF0aW5nXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm4gc3dpcGVyO1xuICBpZiAodHlwZW9mIHNwZWVkID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgc3BlZWQgPSBzd2lwZXIucGFyYW1zLnNwZWVkO1xuICB9XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIGlmIChhbmltYXRpbmcgJiYgIWlzVmlydHVhbCAmJiBwYXJhbXMubG9vcFByZXZlbnRzU2xpZGluZykgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgIGRpcmVjdGlvbjogXCJwcmV2XCJcbiAgICB9KTtcbiAgICBzd2lwZXIuX2NsaWVudExlZnQgPSBzd2lwZXIud3JhcHBlckVsLmNsaWVudExlZnQ7XG4gIH1cbiAgY29uc3QgdHJhbnNsYXRlMiA9IHJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgZnVuY3Rpb24gbm9ybWFsaXplKHZhbCkge1xuICAgIGlmICh2YWwgPCAwKSByZXR1cm4gLU1hdGguZmxvb3IoTWF0aC5hYnModmFsKSk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodmFsKTtcbiAgfVxuICBjb25zdCBub3JtYWxpemVkVHJhbnNsYXRlID0gbm9ybWFsaXplKHRyYW5zbGF0ZTIpO1xuICBjb25zdCBub3JtYWxpemVkU25hcEdyaWQgPSBzbmFwR3JpZC5tYXAoKHZhbCkgPT4gbm9ybWFsaXplKHZhbCkpO1xuICBsZXQgcHJldlNuYXAgPSBzbmFwR3JpZFtub3JtYWxpemVkU25hcEdyaWQuaW5kZXhPZihub3JtYWxpemVkVHJhbnNsYXRlKSAtIDFdO1xuICBpZiAodHlwZW9mIHByZXZTbmFwID09PSBcInVuZGVmaW5lZFwiICYmIHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgbGV0IHByZXZTbmFwSW5kZXg7XG4gICAgc25hcEdyaWQuZm9yRWFjaCgoc25hcCwgc25hcEluZGV4KSA9PiB7XG4gICAgICBpZiAobm9ybWFsaXplZFRyYW5zbGF0ZSA+PSBzbmFwKSB7XG4gICAgICAgIHByZXZTbmFwSW5kZXggPSBzbmFwSW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBwcmV2U25hcEluZGV4ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBwcmV2U25hcCA9IHNuYXBHcmlkW3ByZXZTbmFwSW5kZXggPiAwID8gcHJldlNuYXBJbmRleCAtIDEgOiBwcmV2U25hcEluZGV4XTtcbiAgICB9XG4gIH1cbiAgbGV0IHByZXZJbmRleCA9IDA7XG4gIGlmICh0eXBlb2YgcHJldlNuYXAgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBwcmV2SW5kZXggPSBzbGlkZXNHcmlkLmluZGV4T2YocHJldlNuYXApO1xuICAgIGlmIChwcmV2SW5kZXggPCAwKSBwcmV2SW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXggLSAxO1xuICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAxICYmIHBhcmFtcy5zbGlkZXNQZXJHcm91cEF1dG8pIHtcbiAgICAgIHByZXZJbmRleCA9IHByZXZJbmRleCAtIHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYyhcInByZXZpb3VzXCIsIHRydWUpICsgMTtcbiAgICAgIHByZXZJbmRleCA9IE1hdGgubWF4KHByZXZJbmRleCwgMCk7XG4gICAgfVxuICB9XG4gIGlmIChwYXJhbXMucmV3aW5kICYmIHN3aXBlci5pc0JlZ2lubmluZykge1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHN3aXBlci5wYXJhbXMudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCAmJiBzd2lwZXIudmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggLSAxIDogc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxO1xuICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhsYXN0SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfSBlbHNlIGlmIChwYXJhbXMubG9vcCAmJiBzd2lwZXIuYWN0aXZlSW5kZXggPT09IDAgJiYgcGFyYW1zLmNzc01vZGUpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgc3dpcGVyLnNsaWRlVG8ocHJldkluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHByZXZJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufVxuZnVuY3Rpb24gc2xpZGVSZXNldChzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmIChzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gIGlmICh0eXBlb2Ygc3BlZWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzcGVlZCA9IHN3aXBlci5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufVxuZnVuY3Rpb24gc2xpZGVUb0Nsb3Nlc3Qoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwsIHRocmVzaG9sZCkge1xuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGlmICh0aHJlc2hvbGQgPT09IHZvaWQgMCkge1xuICAgIHRocmVzaG9sZCA9IDAuNTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICBpZiAodHlwZW9mIHNwZWVkID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgc3BlZWQgPSBzd2lwZXIucGFyYW1zLnNwZWVkO1xuICB9XG4gIGxldCBpbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgY29uc3Qgc2tpcCA9IE1hdGgubWluKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLCBpbmRleCk7XG4gIGNvbnN0IHNuYXBJbmRleCA9IHNraXAgKyBNYXRoLmZsb29yKChpbmRleCAtIHNraXApIC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gIGNvbnN0IHRyYW5zbGF0ZTIgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICBpZiAodHJhbnNsYXRlMiA+PSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4XSkge1xuICAgIGNvbnN0IGN1cnJlbnRTbmFwID0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleF07XG4gICAgY29uc3QgbmV4dFNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4ICsgMV07XG4gICAgaWYgKHRyYW5zbGF0ZTIgLSBjdXJyZW50U25hcCA+IChuZXh0U25hcCAtIGN1cnJlbnRTbmFwKSAqIHRocmVzaG9sZCkge1xuICAgICAgaW5kZXggKz0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcHJldlNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4IC0gMV07XG4gICAgY29uc3QgY3VycmVudFNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4XTtcbiAgICBpZiAodHJhbnNsYXRlMiAtIHByZXZTbmFwIDw9IChjdXJyZW50U25hcCAtIHByZXZTbmFwKSAqIHRocmVzaG9sZCkge1xuICAgICAgaW5kZXggLT0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICB9XG4gIH1cbiAgaW5kZXggPSBNYXRoLm1heChpbmRleCwgMCk7XG4gIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIHN3aXBlci5zbGlkZXNHcmlkLmxlbmd0aCAtIDEpO1xuICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbn1cbmZ1bmN0aW9uIHNsaWRlVG9DbGlja2VkU2xpZGUoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmIChzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgc2xpZGVzRWxcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3Qgc2xpZGVzUGVyVmlldyA9IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIiA/IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpIDogcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gIGxldCBzbGlkZVRvSW5kZXggPSBzd2lwZXIuY2xpY2tlZEluZGV4O1xuICBsZXQgcmVhbEluZGV4O1xuICBjb25zdCBzbGlkZVNlbGVjdG9yID0gc3dpcGVyLmlzRWxlbWVudCA/IGBzd2lwZXItc2xpZGVgIDogYC4ke3BhcmFtcy5zbGlkZUNsYXNzfWA7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIGlmIChzd2lwZXIuYW5pbWF0aW5nKSByZXR1cm47XG4gICAgcmVhbEluZGV4ID0gcGFyc2VJbnQoc3dpcGVyLmNsaWNrZWRTbGlkZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSwgMTApO1xuICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIGlmIChzbGlkZVRvSW5kZXggPCBzd2lwZXIubG9vcGVkU2xpZGVzIC0gc2xpZGVzUGVyVmlldyAvIDIgfHwgc2xpZGVUb0luZGV4ID4gc3dpcGVyLnNsaWRlcy5sZW5ndGggLSBzd2lwZXIubG9vcGVkU2xpZGVzICsgc2xpZGVzUGVyVmlldyAvIDIpIHtcbiAgICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgICAgc2xpZGVUb0luZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXgoZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgJHtzbGlkZVNlbGVjdG9yfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7cmVhbEluZGV4fVwiXWApWzBdKTtcbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNsaWRlVG9JbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gc2xpZGVzUGVyVmlldykge1xuICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgIHNsaWRlVG9JbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4KGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYCR7c2xpZGVTZWxlY3Rvcn1bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3JlYWxJbmRleH1cIl1gKVswXSk7XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgfVxufVxuZnVuY3Rpb24gbG9vcENyZWF0ZShzbGlkZVJlYWxJbmRleCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHNsaWRlc0VsXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghcGFyYW1zLmxvb3AgfHwgc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHJldHVybjtcbiAgY29uc3QgaW5pdFNsaWRlcyA9ICgpID0+IHtcbiAgICBjb25zdCBzbGlkZXMgPSBlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApO1xuICAgIHNsaWRlcy5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIsIGluZGV4KTtcbiAgICB9KTtcbiAgfTtcbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBzd2lwZXIuZ3JpZCAmJiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMTtcbiAgY29uc3Qgc2xpZGVzUGVyR3JvdXAgPSBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgKiAoZ3JpZEVuYWJsZWQgPyBwYXJhbXMuZ3JpZC5yb3dzIDogMSk7XG4gIGNvbnN0IHNob3VsZEZpbGxHcm91cCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoICUgc2xpZGVzUGVyR3JvdXAgIT09IDA7XG4gIGNvbnN0IHNob3VsZEZpbGxHcmlkID0gZ3JpZEVuYWJsZWQgJiYgc3dpcGVyLnNsaWRlcy5sZW5ndGggJSBwYXJhbXMuZ3JpZC5yb3dzICE9PSAwO1xuICBjb25zdCBhZGRCbGFua1NsaWRlcyA9IChhbW91bnRPZlNsaWRlcykgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW1vdW50T2ZTbGlkZXM7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc2xpZGVFbCA9IHN3aXBlci5pc0VsZW1lbnQgPyBjcmVhdGVFbGVtZW50MihcInN3aXBlci1zbGlkZVwiLCBbcGFyYW1zLnNsaWRlQmxhbmtDbGFzc10pIDogY3JlYXRlRWxlbWVudDIoXCJkaXZcIiwgW3BhcmFtcy5zbGlkZUNsYXNzLCBwYXJhbXMuc2xpZGVCbGFua0NsYXNzXSk7XG4gICAgICBzd2lwZXIuc2xpZGVzRWwuYXBwZW5kKHNsaWRlRWwpO1xuICAgIH1cbiAgfTtcbiAgaWYgKHNob3VsZEZpbGxHcm91cCkge1xuICAgIGlmIChwYXJhbXMubG9vcEFkZEJsYW5rU2xpZGVzKSB7XG4gICAgICBjb25zdCBzbGlkZXNUb0FkZCA9IHNsaWRlc1Blckdyb3VwIC0gc3dpcGVyLnNsaWRlcy5sZW5ndGggJSBzbGlkZXNQZXJHcm91cDtcbiAgICAgIGFkZEJsYW5rU2xpZGVzKHNsaWRlc1RvQWRkKTtcbiAgICAgIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd1dhcm5pbmcoXCJTd2lwZXIgTG9vcCBXYXJuaW5nOiBUaGUgbnVtYmVyIG9mIHNsaWRlcyBpcyBub3QgZXZlbiB0byBzbGlkZXNQZXJHcm91cCwgbG9vcCBtb2RlIG1heSBub3QgZnVuY3Rpb24gcHJvcGVybHkuIFlvdSBuZWVkIHRvIGFkZCBtb3JlIHNsaWRlcyAob3IgbWFrZSBkdXBsaWNhdGVzLCBvciBlbXB0eSBzbGlkZXMpXCIpO1xuICAgIH1cbiAgICBpbml0U2xpZGVzKCk7XG4gIH0gZWxzZSBpZiAoc2hvdWxkRmlsbEdyaWQpIHtcbiAgICBpZiAocGFyYW1zLmxvb3BBZGRCbGFua1NsaWRlcykge1xuICAgICAgY29uc3Qgc2xpZGVzVG9BZGQgPSBwYXJhbXMuZ3JpZC5yb3dzIC0gc3dpcGVyLnNsaWRlcy5sZW5ndGggJSBwYXJhbXMuZ3JpZC5yb3dzO1xuICAgICAgYWRkQmxhbmtTbGlkZXMoc2xpZGVzVG9BZGQpO1xuICAgICAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaG93V2FybmluZyhcIlN3aXBlciBMb29wIFdhcm5pbmc6IFRoZSBudW1iZXIgb2Ygc2xpZGVzIGlzIG5vdCBldmVuIHRvIGdyaWQucm93cywgbG9vcCBtb2RlIG1heSBub3QgZnVuY3Rpb24gcHJvcGVybHkuIFlvdSBuZWVkIHRvIGFkZCBtb3JlIHNsaWRlcyAob3IgbWFrZSBkdXBsaWNhdGVzLCBvciBlbXB0eSBzbGlkZXMpXCIpO1xuICAgIH1cbiAgICBpbml0U2xpZGVzKCk7XG4gIH0gZWxzZSB7XG4gICAgaW5pdFNsaWRlcygpO1xuICB9XG4gIHN3aXBlci5sb29wRml4KHtcbiAgICBzbGlkZVJlYWxJbmRleCxcbiAgICBkaXJlY3Rpb246IHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHZvaWQgMCA6IFwibmV4dFwiXG4gIH0pO1xufVxuZnVuY3Rpb24gbG9vcEZpeChfdGVtcCkge1xuICBsZXQge1xuICAgIHNsaWRlUmVhbEluZGV4LFxuICAgIHNsaWRlVG86IHNsaWRlVG8yID0gdHJ1ZSxcbiAgICBkaXJlY3Rpb24sXG4gICAgc2V0VHJhbnNsYXRlOiBzZXRUcmFuc2xhdGUyLFxuICAgIGFjdGl2ZVNsaWRlSW5kZXgsXG4gICAgYnlDb250cm9sbGVyLFxuICAgIGJ5TW91c2V3aGVlbFxuICB9ID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXA7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmICghc3dpcGVyLnBhcmFtcy5sb29wKSByZXR1cm47XG4gIHN3aXBlci5lbWl0KFwiYmVmb3JlTG9vcEZpeFwiKTtcbiAgY29uc3Qge1xuICAgIHNsaWRlcyxcbiAgICBhbGxvd1NsaWRlUHJldixcbiAgICBhbGxvd1NsaWRlTmV4dCxcbiAgICBzbGlkZXNFbCxcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3Qge1xuICAgIGNlbnRlcmVkU2xpZGVzXG4gIH0gPSBwYXJhbXM7XG4gIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IHRydWU7XG4gIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IHRydWU7XG4gIGlmIChzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgaWYgKHNsaWRlVG8yKSB7XG4gICAgICBpZiAoIXBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBzd2lwZXIuc25hcEluZGV4ID09PSAwKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHN3aXBlci5zbmFwSW5kZXggPCBwYXJhbXMuc2xpZGVzUGVyVmlldykge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoICsgc3dpcGVyLnNuYXBJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChzd2lwZXIuc25hcEluZGV4ID09PSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoIC0gMSkge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmUsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gYWxsb3dTbGlkZVByZXY7XG4gICAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gYWxsb3dTbGlkZU5leHQ7XG4gICAgc3dpcGVyLmVtaXQoXCJsb29wRml4XCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgc2xpZGVzUGVyVmlldyA9IHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICBpZiAoc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIpIHtcbiAgICBzbGlkZXNQZXJWaWV3ID0gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCk7XG4gIH0gZWxzZSB7XG4gICAgc2xpZGVzUGVyVmlldyA9IE1hdGguY2VpbChwYXJzZUZsb2F0KHBhcmFtcy5zbGlkZXNQZXJWaWV3LCAxMCkpO1xuICAgIGlmIChjZW50ZXJlZFNsaWRlcyAmJiBzbGlkZXNQZXJWaWV3ICUgMiA9PT0gMCkge1xuICAgICAgc2xpZGVzUGVyVmlldyA9IHNsaWRlc1BlclZpZXcgKyAxO1xuICAgIH1cbiAgfVxuICBjb25zdCBzbGlkZXNQZXJHcm91cCA9IHBhcmFtcy5zbGlkZXNQZXJHcm91cEF1dG8gPyBzbGlkZXNQZXJWaWV3IDogcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICBsZXQgbG9vcGVkU2xpZGVzID0gc2xpZGVzUGVyR3JvdXA7XG4gIGlmIChsb29wZWRTbGlkZXMgJSBzbGlkZXNQZXJHcm91cCAhPT0gMCkge1xuICAgIGxvb3BlZFNsaWRlcyArPSBzbGlkZXNQZXJHcm91cCAtIGxvb3BlZFNsaWRlcyAlIHNsaWRlc1Blckdyb3VwO1xuICB9XG4gIGxvb3BlZFNsaWRlcyArPSBwYXJhbXMubG9vcEFkZGl0aW9uYWxTbGlkZXM7XG4gIHN3aXBlci5sb29wZWRTbGlkZXMgPSBsb29wZWRTbGlkZXM7XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gc3dpcGVyLmdyaWQgJiYgcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDE7XG4gIGlmIChzbGlkZXMubGVuZ3RoIDwgc2xpZGVzUGVyVmlldyArIGxvb3BlZFNsaWRlcykge1xuICAgIHNob3dXYXJuaW5nKFwiU3dpcGVyIExvb3AgV2FybmluZzogVGhlIG51bWJlciBvZiBzbGlkZXMgaXMgbm90IGVub3VnaCBmb3IgbG9vcCBtb2RlLCBpdCB3aWxsIGJlIGRpc2FibGVkIGFuZCBub3QgZnVuY3Rpb24gcHJvcGVybHkuIFlvdSBuZWVkIHRvIGFkZCBtb3JlIHNsaWRlcyAob3IgbWFrZSBkdXBsaWNhdGVzKSBvciBsb3dlciB0aGUgdmFsdWVzIG9mIHNsaWRlc1BlclZpZXcgYW5kIHNsaWRlc1Blckdyb3VwIHBhcmFtZXRlcnNcIik7XG4gIH0gZWxzZSBpZiAoZ3JpZEVuYWJsZWQgJiYgcGFyYW1zLmdyaWQuZmlsbCA9PT0gXCJyb3dcIikge1xuICAgIHNob3dXYXJuaW5nKFwiU3dpcGVyIExvb3AgV2FybmluZzogTG9vcCBtb2RlIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggZ3JpZC5maWxsID0gYHJvd2BcIik7XG4gIH1cbiAgY29uc3QgcHJlcGVuZFNsaWRlc0luZGV4ZXMgPSBbXTtcbiAgY29uc3QgYXBwZW5kU2xpZGVzSW5kZXhlcyA9IFtdO1xuICBsZXQgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gIGlmICh0eXBlb2YgYWN0aXZlU2xpZGVJbmRleCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGFjdGl2ZVNsaWRlSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleChzbGlkZXMuZmlsdGVyKChlbCkgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKSlbMF0pO1xuICB9IGVsc2Uge1xuICAgIGFjdGl2ZUluZGV4ID0gYWN0aXZlU2xpZGVJbmRleDtcbiAgfVxuICBjb25zdCBpc05leHQgPSBkaXJlY3Rpb24gPT09IFwibmV4dFwiIHx8ICFkaXJlY3Rpb247XG4gIGNvbnN0IGlzUHJldiA9IGRpcmVjdGlvbiA9PT0gXCJwcmV2XCIgfHwgIWRpcmVjdGlvbjtcbiAgbGV0IHNsaWRlc1ByZXBlbmRlZCA9IDA7XG4gIGxldCBzbGlkZXNBcHBlbmRlZCA9IDA7XG4gIGNvbnN0IGNvbHMgPSBncmlkRW5hYmxlZCA/IE1hdGguY2VpbChzbGlkZXMubGVuZ3RoIC8gcGFyYW1zLmdyaWQucm93cykgOiBzbGlkZXMubGVuZ3RoO1xuICBjb25zdCBhY3RpdmVDb2xJbmRleCA9IGdyaWRFbmFibGVkID8gc2xpZGVzW2FjdGl2ZVNsaWRlSW5kZXhdLmNvbHVtbiA6IGFjdGl2ZVNsaWRlSW5kZXg7XG4gIGNvbnN0IGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0ID0gYWN0aXZlQ29sSW5kZXggKyAoY2VudGVyZWRTbGlkZXMgJiYgdHlwZW9mIHNldFRyYW5zbGF0ZTIgPT09IFwidW5kZWZpbmVkXCIgPyAtc2xpZGVzUGVyVmlldyAvIDIgKyAwLjUgOiAwKTtcbiAgaWYgKGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0IDwgbG9vcGVkU2xpZGVzKSB7XG4gICAgc2xpZGVzUHJlcGVuZGVkID0gTWF0aC5tYXgobG9vcGVkU2xpZGVzIC0gYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQsIHNsaWRlc1Blckdyb3VwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvb3BlZFNsaWRlcyAtIGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0OyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gaSAtIE1hdGguZmxvb3IoaSAvIGNvbHMpICogY29scztcbiAgICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgICBjb25zdCBjb2xJbmRleFRvUHJlcGVuZCA9IGNvbHMgLSBpbmRleCAtIDE7XG4gICAgICAgIGZvciAobGV0IGkyID0gc2xpZGVzLmxlbmd0aCAtIDE7IGkyID49IDA7IGkyIC09IDEpIHtcbiAgICAgICAgICBpZiAoc2xpZGVzW2kyXS5jb2x1bW4gPT09IGNvbEluZGV4VG9QcmVwZW5kKSBwcmVwZW5kU2xpZGVzSW5kZXhlcy5wdXNoKGkyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJlcGVuZFNsaWRlc0luZGV4ZXMucHVzaChjb2xzIC0gaW5kZXggLSAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQgKyBzbGlkZXNQZXJWaWV3ID4gY29scyAtIGxvb3BlZFNsaWRlcykge1xuICAgIHNsaWRlc0FwcGVuZGVkID0gTWF0aC5tYXgoYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQgLSAoY29scyAtIGxvb3BlZFNsaWRlcyAqIDIpLCBzbGlkZXNQZXJHcm91cCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNBcHBlbmRlZDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGkgLSBNYXRoLmZsb29yKGkgLyBjb2xzKSAqIGNvbHM7XG4gICAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlMiwgc2xpZGVJbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChzbGlkZTIuY29sdW1uID09PSBpbmRleCkgYXBwZW5kU2xpZGVzSW5kZXhlcy5wdXNoKHNsaWRlSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwcGVuZFNsaWRlc0luZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gdHJ1ZTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IGZhbHNlO1xuICB9KTtcbiAgaWYgKGlzUHJldikge1xuICAgIHByZXBlbmRTbGlkZXNJbmRleGVzLmZvckVhY2goKGluZGV4KSA9PiB7XG4gICAgICBzbGlkZXNbaW5kZXhdLnN3aXBlckxvb3BNb3ZlRE9NID0gdHJ1ZTtcbiAgICAgIHNsaWRlc0VsLnByZXBlbmQoc2xpZGVzW2luZGV4XSk7XG4gICAgICBzbGlkZXNbaW5kZXhdLnN3aXBlckxvb3BNb3ZlRE9NID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzTmV4dCkge1xuICAgIGFwcGVuZFNsaWRlc0luZGV4ZXMuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgIHNsaWRlc1tpbmRleF0uc3dpcGVyTG9vcE1vdmVET00gPSB0cnVlO1xuICAgICAgc2xpZGVzRWwuYXBwZW5kKHNsaWRlc1tpbmRleF0pO1xuICAgICAgc2xpZGVzW2luZGV4XS5zd2lwZXJMb29wTW92ZURPTSA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG4gIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIikge1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgfSBlbHNlIGlmIChncmlkRW5hYmxlZCAmJiAocHJlcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoID4gMCAmJiBpc1ByZXYgfHwgYXBwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggPiAwICYmIGlzTmV4dCkpIHtcbiAgICBzd2lwZXIuc2xpZGVzLmZvckVhY2goKHNsaWRlMiwgc2xpZGVJbmRleCkgPT4ge1xuICAgICAgc3dpcGVyLmdyaWQudXBkYXRlU2xpZGUoc2xpZGVJbmRleCwgc2xpZGUyLCBzd2lwZXIuc2xpZGVzKTtcbiAgICB9KTtcbiAgfVxuICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MpIHtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzT2Zmc2V0KCk7XG4gIH1cbiAgaWYgKHNsaWRlVG8yKSB7XG4gICAgaWYgKHByZXBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCA+IDAgJiYgaXNQcmV2KSB7XG4gICAgICBpZiAodHlwZW9mIHNsaWRlUmVhbEluZGV4ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2FjdGl2ZUluZGV4XTtcbiAgICAgICAgY29uc3QgbmV3U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFthY3RpdmVJbmRleCArIHNsaWRlc1ByZXBlbmRlZF07XG4gICAgICAgIGNvbnN0IGRpZmYgPSBuZXdTbGlkZVRyYW5zbGF0ZSAtIGN1cnJlbnRTbGlkZVRyYW5zbGF0ZTtcbiAgICAgICAgaWYgKGJ5TW91c2V3aGVlbCkge1xuICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUoc3dpcGVyLnRyYW5zbGF0ZSAtIGRpZmYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKGFjdGl2ZUluZGV4ICsgTWF0aC5jZWlsKHNsaWRlc1ByZXBlbmRlZCksIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICBpZiAoc2V0VHJhbnNsYXRlMikge1xuICAgICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5zdGFydFRyYW5zbGF0ZSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGEuc3RhcnRUcmFuc2xhdGUgLSBkaWZmO1xuICAgICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5jdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5jdXJyZW50VHJhbnNsYXRlIC0gZGlmZjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZXRUcmFuc2xhdGUyKSB7XG4gICAgICAgICAgY29uc3Qgc2hpZnQgPSBncmlkRW5hYmxlZCA/IHByZXBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCAvIHBhcmFtcy5ncmlkLnJvd3MgOiBwcmVwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGg7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4ICsgc2hpZnQsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBzd2lwZXIudHJhbnNsYXRlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhcHBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCA+IDAgJiYgaXNOZXh0KSB7XG4gICAgICBpZiAodHlwZW9mIHNsaWRlUmVhbEluZGV4ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2FjdGl2ZUluZGV4XTtcbiAgICAgICAgY29uc3QgbmV3U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFthY3RpdmVJbmRleCAtIHNsaWRlc0FwcGVuZGVkXTtcbiAgICAgICAgY29uc3QgZGlmZiA9IG5ld1NsaWRlVHJhbnNsYXRlIC0gY3VycmVudFNsaWRlVHJhbnNsYXRlO1xuICAgICAgICBpZiAoYnlNb3VzZXdoZWVsKSB7XG4gICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShzd2lwZXIudHJhbnNsYXRlIC0gZGlmZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oYWN0aXZlSW5kZXggLSBzbGlkZXNBcHBlbmRlZCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgIGlmIChzZXRUcmFuc2xhdGUyKSB7XG4gICAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEYXRhLnN0YXJ0VHJhbnNsYXRlID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5zdGFydFRyYW5zbGF0ZSAtIGRpZmY7XG4gICAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhLmN1cnJlbnRUcmFuc2xhdGUgLSBkaWZmO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2hpZnQgPSBncmlkRW5hYmxlZCA/IGFwcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoIC8gcGFyYW1zLmdyaWQucm93cyA6IGFwcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoO1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXggLSBzaGlmdCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSBhbGxvd1NsaWRlUHJldjtcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gYWxsb3dTbGlkZU5leHQ7XG4gIGlmIChzd2lwZXIuY29udHJvbGxlciAmJiBzd2lwZXIuY29udHJvbGxlci5jb250cm9sICYmICFieUNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBsb29wUGFyYW1zID0ge1xuICAgICAgc2xpZGVSZWFsSW5kZXgsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBzZXRUcmFuc2xhdGU6IHNldFRyYW5zbGF0ZTIsXG4gICAgICBhY3RpdmVTbGlkZUluZGV4LFxuICAgICAgYnlDb250cm9sbGVyOiB0cnVlXG4gICAgfTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzd2lwZXIuY29udHJvbGxlci5jb250cm9sKSkge1xuICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbC5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGlmICghYy5kZXN0cm95ZWQgJiYgYy5wYXJhbXMubG9vcCkgYy5sb29wRml4KHtcbiAgICAgICAgICAuLi5sb29wUGFyYW1zLFxuICAgICAgICAgIHNsaWRlVG86IGMucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID8gc2xpZGVUbzIgOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCBpbnN0YW5jZW9mIHN3aXBlci5jb25zdHJ1Y3RvciAmJiBzd2lwZXIuY29udHJvbGxlci5jb250cm9sLnBhcmFtcy5sb29wKSB7XG4gICAgICBzd2lwZXIuY29udHJvbGxlci5jb250cm9sLmxvb3BGaXgoe1xuICAgICAgICAuLi5sb29wUGFyYW1zLFxuICAgICAgICBzbGlkZVRvOiBzd2lwZXIuY29udHJvbGxlci5jb250cm9sLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBwYXJhbXMuc2xpZGVzUGVyVmlldyA/IHNsaWRlVG8yIDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBzd2lwZXIuZW1pdChcImxvb3BGaXhcIik7XG59XG5mdW5jdGlvbiBsb29wRGVzdHJveSgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBzbGlkZXNFbFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIXBhcmFtcy5sb29wIHx8IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSByZXR1cm47XG4gIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgY29uc3QgbmV3U2xpZGVzT3JkZXIgPSBbXTtcbiAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKChzbGlkZUVsKSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSB0eXBlb2Ygc2xpZGVFbC5zd2lwZXJTbGlkZUluZGV4ID09PSBcInVuZGVmaW5lZFwiID8gc2xpZGVFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSAqIDEgOiBzbGlkZUVsLnN3aXBlclNsaWRlSW5kZXg7XG4gICAgbmV3U2xpZGVzT3JkZXJbaW5kZXhdID0gc2xpZGVFbDtcbiAgfSk7XG4gIHN3aXBlci5zbGlkZXMuZm9yRWFjaCgoc2xpZGVFbCkgPT4ge1xuICAgIHNsaWRlRWwucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhcIik7XG4gIH0pO1xuICBuZXdTbGlkZXNPcmRlci5mb3JFYWNoKChzbGlkZUVsKSA9PiB7XG4gICAgc2xpZGVzRWwuYXBwZW5kKHNsaWRlRWwpO1xuICB9KTtcbiAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIucmVhbEluZGV4LCAwKTtcbn1cbmZ1bmN0aW9uIHNldEdyYWJDdXJzb3IobW92aW5nKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmICghc3dpcGVyLnBhcmFtcy5zaW11bGF0ZVRvdWNoIHx8IHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuaXNMb2NrZWQgfHwgc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSByZXR1cm47XG4gIGNvbnN0IGVsID0gc3dpcGVyLnBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gXCJjb250YWluZXJcIiA/IHN3aXBlci5lbCA6IHN3aXBlci53cmFwcGVyRWw7XG4gIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSB0cnVlO1xuICB9XG4gIGVsLnN0eWxlLmN1cnNvciA9IFwibW92ZVwiO1xuICBlbC5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyBcImdyYWJiaW5nXCIgOiBcImdyYWJcIjtcbiAgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gdW5zZXRHcmFiQ3Vyc29yKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5pc0xvY2tlZCB8fCBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IHRydWU7XG4gIH1cbiAgc3dpcGVyW3N3aXBlci5wYXJhbXMudG91Y2hFdmVudHNUYXJnZXQgPT09IFwiY29udGFpbmVyXCIgPyBcImVsXCIgOiBcIndyYXBwZXJFbFwiXS5zdHlsZS5jdXJzb3IgPSBcIlwiO1xuICBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG59XG5mdW5jdGlvbiBjbG9zZXN0RWxlbWVudChzZWxlY3RvciwgYmFzZSkge1xuICBpZiAoYmFzZSA9PT0gdm9pZCAwKSB7XG4gICAgYmFzZSA9IHRoaXM7XG4gIH1cbiAgZnVuY3Rpb24gX19jbG9zZXN0RnJvbShlbCkge1xuICAgIGlmICghZWwgfHwgZWwgPT09IGdldERvY3VtZW50KCkgfHwgZWwgPT09IGdldFdpbmRvdygpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoZWwuYXNzaWduZWRTbG90KSBlbCA9IGVsLmFzc2lnbmVkU2xvdDtcbiAgICBjb25zdCBmb3VuZCA9IGVsLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgIGlmICghZm91bmQgJiYgIWVsLmdldFJvb3ROb2RlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kIHx8IF9fY2xvc2VzdEZyb20oZWwuZ2V0Um9vdE5vZGUoKS5ob3N0KTtcbiAgfVxuICByZXR1cm4gX19jbG9zZXN0RnJvbShiYXNlKTtcbn1cbmZ1bmN0aW9uIHByZXZlbnRFZGdlU3dpcGUoc3dpcGVyLCBldmVudDIsIHN0YXJ0WCkge1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgZWRnZVN3aXBlRGV0ZWN0aW9uID0gcGFyYW1zLmVkZ2VTd2lwZURldGVjdGlvbjtcbiAgY29uc3QgZWRnZVN3aXBlVGhyZXNob2xkID0gcGFyYW1zLmVkZ2VTd2lwZVRocmVzaG9sZDtcbiAgaWYgKGVkZ2VTd2lwZURldGVjdGlvbiAmJiAoc3RhcnRYIDw9IGVkZ2VTd2lwZVRocmVzaG9sZCB8fCBzdGFydFggPj0gd2luZG93Mi5pbm5lcldpZHRoIC0gZWRnZVN3aXBlVGhyZXNob2xkKSkge1xuICAgIGlmIChlZGdlU3dpcGVEZXRlY3Rpb24gPT09IFwicHJldmVudFwiKSB7XG4gICAgICBldmVudDIucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBvblRvdWNoU3RhcnQoZXZlbnQyKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IGRvY3VtZW50MiA9IGdldERvY3VtZW50KCk7XG4gIGxldCBlID0gZXZlbnQyO1xuICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICBjb25zdCBkYXRhID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YTtcbiAgaWYgKGUudHlwZSA9PT0gXCJwb2ludGVyZG93blwiKSB7XG4gICAgaWYgKGRhdGEucG9pbnRlcklkICE9PSBudWxsICYmIGRhdGEucG9pbnRlcklkICE9PSBlLnBvaW50ZXJJZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkYXRhLnBvaW50ZXJJZCA9IGUucG9pbnRlcklkO1xuICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gXCJ0b3VjaHN0YXJ0XCIgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIGRhdGEudG91Y2hJZCA9IGUudGFyZ2V0VG91Y2hlc1swXS5pZGVudGlmaWVyO1xuICB9XG4gIGlmIChlLnR5cGUgPT09IFwidG91Y2hzdGFydFwiKSB7XG4gICAgcHJldmVudEVkZ2VTd2lwZShzd2lwZXIsIGUsIGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgdG91Y2hlcyxcbiAgICBlbmFibGVkXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCkgcmV0dXJuO1xuICBpZiAoIXBhcmFtcy5zaW11bGF0ZVRvdWNoICYmIGUucG9pbnRlclR5cGUgPT09IFwibW91c2VcIikgcmV0dXJuO1xuICBpZiAoc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMuY3NzTW9kZSAmJiBwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wRml4KCk7XG4gIH1cbiAgbGV0IHRhcmdldEVsID0gZS50YXJnZXQ7XG4gIGlmIChwYXJhbXMudG91Y2hFdmVudHNUYXJnZXQgPT09IFwid3JhcHBlclwiKSB7XG4gICAgaWYgKCFlbGVtZW50SXNDaGlsZE9mKHRhcmdldEVsLCBzd2lwZXIud3JhcHBlckVsKSkgcmV0dXJuO1xuICB9XG4gIGlmIChcIndoaWNoXCIgaW4gZSAmJiBlLndoaWNoID09PSAzKSByZXR1cm47XG4gIGlmIChcImJ1dHRvblwiIGluIGUgJiYgZS5idXR0b24gPiAwKSByZXR1cm47XG4gIGlmIChkYXRhLmlzVG91Y2hlZCAmJiBkYXRhLmlzTW92ZWQpIHJldHVybjtcbiAgY29uc3Qgc3dpcGluZ0NsYXNzSGFzVmFsdWUgPSAhIXBhcmFtcy5ub1N3aXBpbmdDbGFzcyAmJiBwYXJhbXMubm9Td2lwaW5nQ2xhc3MgIT09IFwiXCI7XG4gIGNvbnN0IGV2ZW50UGF0aCA9IGUuY29tcG9zZWRQYXRoID8gZS5jb21wb3NlZFBhdGgoKSA6IGUucGF0aDtcbiAgaWYgKHN3aXBpbmdDbGFzc0hhc1ZhbHVlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnNoYWRvd1Jvb3QgJiYgZXZlbnRQYXRoKSB7XG4gICAgdGFyZ2V0RWwgPSBldmVudFBhdGhbMF07XG4gIH1cbiAgY29uc3Qgbm9Td2lwaW5nU2VsZWN0b3IgPSBwYXJhbXMubm9Td2lwaW5nU2VsZWN0b3IgPyBwYXJhbXMubm9Td2lwaW5nU2VsZWN0b3IgOiBgLiR7cGFyYW1zLm5vU3dpcGluZ0NsYXNzfWA7XG4gIGNvbnN0IGlzVGFyZ2V0U2hhZG93ID0gISEoZS50YXJnZXQgJiYgZS50YXJnZXQuc2hhZG93Um9vdCk7XG4gIGlmIChwYXJhbXMubm9Td2lwaW5nICYmIChpc1RhcmdldFNoYWRvdyA/IGNsb3Nlc3RFbGVtZW50KG5vU3dpcGluZ1NlbGVjdG9yLCB0YXJnZXRFbCkgOiB0YXJnZXRFbC5jbG9zZXN0KG5vU3dpcGluZ1NlbGVjdG9yKSkpIHtcbiAgICBzd2lwZXIuYWxsb3dDbGljayA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXJhbXMuc3dpcGVIYW5kbGVyKSB7XG4gICAgaWYgKCF0YXJnZXRFbC5jbG9zZXN0KHBhcmFtcy5zd2lwZUhhbmRsZXIpKSByZXR1cm47XG4gIH1cbiAgdG91Y2hlcy5jdXJyZW50WCA9IGUucGFnZVg7XG4gIHRvdWNoZXMuY3VycmVudFkgPSBlLnBhZ2VZO1xuICBjb25zdCBzdGFydFggPSB0b3VjaGVzLmN1cnJlbnRYO1xuICBjb25zdCBzdGFydFkgPSB0b3VjaGVzLmN1cnJlbnRZO1xuICBpZiAoIXByZXZlbnRFZGdlU3dpcGUoc3dpcGVyLCBlLCBzdGFydFgpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgIGlzVG91Y2hlZDogdHJ1ZSxcbiAgICBpc01vdmVkOiBmYWxzZSxcbiAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzOiB0cnVlLFxuICAgIGlzU2Nyb2xsaW5nOiB2b2lkIDAsXG4gICAgc3RhcnRNb3Zpbmc6IHZvaWQgMFxuICB9KTtcbiAgdG91Y2hlcy5zdGFydFggPSBzdGFydFg7XG4gIHRvdWNoZXMuc3RhcnRZID0gc3RhcnRZO1xuICBkYXRhLnRvdWNoU3RhcnRUaW1lID0gbm93KCk7XG4gIHN3aXBlci5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID0gdm9pZCAwO1xuICBpZiAocGFyYW1zLnRocmVzaG9sZCA+IDApIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlID0gZmFsc2U7XG4gIGxldCBwcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gIGlmICh0YXJnZXRFbC5tYXRjaGVzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpKSB7XG4gICAgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcbiAgICBpZiAodGFyZ2V0RWwubm9kZU5hbWUgPT09IFwiU0VMRUNUXCIpIHtcbiAgICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChkb2N1bWVudDIuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudDIuYWN0aXZlRWxlbWVudC5tYXRjaGVzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpICYmIGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50ICE9PSB0YXJnZXRFbCAmJiAoZS5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiIHx8IGUucG9pbnRlclR5cGUgIT09IFwibW91c2VcIiAmJiAhdGFyZ2V0RWwubWF0Y2hlcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSkpIHtcbiAgICBkb2N1bWVudDIuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gIH1cbiAgY29uc3Qgc2hvdWxkUHJldmVudERlZmF1bHQgPSBwcmV2ZW50RGVmYXVsdCAmJiBzd2lwZXIuYWxsb3dUb3VjaE1vdmUgJiYgcGFyYW1zLnRvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdDtcbiAgaWYgKChwYXJhbXMudG91Y2hTdGFydEZvcmNlUHJldmVudERlZmF1bHQgfHwgc2hvdWxkUHJldmVudERlZmF1bHQpICYmICF0YXJnZXRFbC5pc0NvbnRlbnRFZGl0YWJsZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBpZiAocGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmIHN3aXBlci5mcmVlTW9kZSAmJiBzd2lwZXIuYW5pbWF0aW5nICYmICFwYXJhbXMuY3NzTW9kZSkge1xuICAgIHN3aXBlci5mcmVlTW9kZS5vblRvdWNoU3RhcnQoKTtcbiAgfVxuICBzd2lwZXIuZW1pdChcInRvdWNoU3RhcnRcIiwgZSk7XG59XG5mdW5jdGlvbiBvblRvdWNoTW92ZShldmVudDIpIHtcbiAgY29uc3QgZG9jdW1lbnQyID0gZ2V0RG9jdW1lbnQoKTtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgdG91Y2hlcyxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICBlbmFibGVkXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCkgcmV0dXJuO1xuICBpZiAoIXBhcmFtcy5zaW11bGF0ZVRvdWNoICYmIGV2ZW50Mi5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiKSByZXR1cm47XG4gIGxldCBlID0gZXZlbnQyO1xuICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICBpZiAoZS50eXBlID09PSBcInBvaW50ZXJtb3ZlXCIpIHtcbiAgICBpZiAoZGF0YS50b3VjaElkICE9PSBudWxsKSByZXR1cm47XG4gICAgY29uc3QgaWQgPSBlLnBvaW50ZXJJZDtcbiAgICBpZiAoaWQgIT09IGRhdGEucG9pbnRlcklkKSByZXR1cm47XG4gIH1cbiAgbGV0IHRhcmdldFRvdWNoO1xuICBpZiAoZS50eXBlID09PSBcInRvdWNobW92ZVwiKSB7XG4gICAgdGFyZ2V0VG91Y2ggPSBbLi4uZS5jaGFuZ2VkVG91Y2hlc10uZmlsdGVyKCh0KSA9PiB0LmlkZW50aWZpZXIgPT09IGRhdGEudG91Y2hJZClbMF07XG4gICAgaWYgKCF0YXJnZXRUb3VjaCB8fCB0YXJnZXRUb3VjaC5pZGVudGlmaWVyICE9PSBkYXRhLnRvdWNoSWQpIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXRUb3VjaCA9IGU7XG4gIH1cbiAgaWYgKCFkYXRhLmlzVG91Y2hlZCkge1xuICAgIGlmIChkYXRhLnN0YXJ0TW92aW5nICYmIGRhdGEuaXNTY3JvbGxpbmcpIHtcbiAgICAgIHN3aXBlci5lbWl0KFwidG91Y2hNb3ZlT3Bwb3NpdGVcIiwgZSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBwYWdlWCA9IHRhcmdldFRvdWNoLnBhZ2VYO1xuICBjb25zdCBwYWdlWSA9IHRhcmdldFRvdWNoLnBhZ2VZO1xuICBpZiAoZS5wcmV2ZW50ZWRCeU5lc3RlZFN3aXBlcikge1xuICAgIHRvdWNoZXMuc3RhcnRYID0gcGFnZVg7XG4gICAgdG91Y2hlcy5zdGFydFkgPSBwYWdlWTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFzd2lwZXIuYWxsb3dUb3VjaE1vdmUpIHtcbiAgICBpZiAoIWUudGFyZ2V0Lm1hdGNoZXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykpIHtcbiAgICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChkYXRhLmlzVG91Y2hlZCkge1xuICAgICAgT2JqZWN0LmFzc2lnbih0b3VjaGVzLCB7XG4gICAgICAgIHN0YXJ0WDogcGFnZVgsXG4gICAgICAgIHN0YXJ0WTogcGFnZVksXG4gICAgICAgIGN1cnJlbnRYOiBwYWdlWCxcbiAgICAgICAgY3VycmVudFk6IHBhZ2VZXG4gICAgICB9KTtcbiAgICAgIGRhdGEudG91Y2hTdGFydFRpbWUgPSBub3coKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcyAmJiAhcGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoc3dpcGVyLmlzVmVydGljYWwoKSkge1xuICAgICAgaWYgKHBhZ2VZIDwgdG91Y2hlcy5zdGFydFkgJiYgc3dpcGVyLnRyYW5zbGF0ZSA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgfHwgcGFnZVkgPiB0b3VjaGVzLnN0YXJ0WSAmJiBzd2lwZXIudHJhbnNsYXRlID49IHN3aXBlci5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFnZVggPCB0b3VjaGVzLnN0YXJ0WCAmJiBzd2lwZXIudHJhbnNsYXRlIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSB8fCBwYWdlWCA+IHRvdWNoZXMuc3RhcnRYICYmIHN3aXBlci50cmFuc2xhdGUgPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGlmIChkb2N1bWVudDIuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudDIuYWN0aXZlRWxlbWVudC5tYXRjaGVzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpICYmIGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50ICE9PSBlLnRhcmdldCAmJiBlLnBvaW50ZXJUeXBlICE9PSBcIm1vdXNlXCIpIHtcbiAgICBkb2N1bWVudDIuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gIH1cbiAgaWYgKGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50KSB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudDIuYWN0aXZlRWxlbWVudCAmJiBlLnRhcmdldC5tYXRjaGVzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpKSB7XG4gICAgICBkYXRhLmlzTW92ZWQgPSB0cnVlO1xuICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcykge1xuICAgIHN3aXBlci5lbWl0KFwidG91Y2hNb3ZlXCIsIGUpO1xuICB9XG4gIHRvdWNoZXMucHJldmlvdXNYID0gdG91Y2hlcy5jdXJyZW50WDtcbiAgdG91Y2hlcy5wcmV2aW91c1kgPSB0b3VjaGVzLmN1cnJlbnRZO1xuICB0b3VjaGVzLmN1cnJlbnRYID0gcGFnZVg7XG4gIHRvdWNoZXMuY3VycmVudFkgPSBwYWdlWTtcbiAgY29uc3QgZGlmZlggPSB0b3VjaGVzLmN1cnJlbnRYIC0gdG91Y2hlcy5zdGFydFg7XG4gIGNvbnN0IGRpZmZZID0gdG91Y2hlcy5jdXJyZW50WSAtIHRvdWNoZXMuc3RhcnRZO1xuICBpZiAoc3dpcGVyLnBhcmFtcy50aHJlc2hvbGQgJiYgTWF0aC5zcXJ0KGRpZmZYICoqIDIgKyBkaWZmWSAqKiAyKSA8IHN3aXBlci5wYXJhbXMudGhyZXNob2xkKSByZXR1cm47XG4gIGlmICh0eXBlb2YgZGF0YS5pc1Njcm9sbGluZyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGxldCB0b3VjaEFuZ2xlO1xuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYgdG91Y2hlcy5jdXJyZW50WSA9PT0gdG91Y2hlcy5zdGFydFkgfHwgc3dpcGVyLmlzVmVydGljYWwoKSAmJiB0b3VjaGVzLmN1cnJlbnRYID09PSB0b3VjaGVzLnN0YXJ0WCkge1xuICAgICAgZGF0YS5pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZGlmZlggKiBkaWZmWCArIGRpZmZZICogZGlmZlkgPj0gMjUpIHtcbiAgICAgICAgdG91Y2hBbmdsZSA9IE1hdGguYXRhbjIoTWF0aC5hYnMoZGlmZlkpLCBNYXRoLmFicyhkaWZmWCkpICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgZGF0YS5pc1Njcm9sbGluZyA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHRvdWNoQW5nbGUgPiBwYXJhbXMudG91Y2hBbmdsZSA6IDkwIC0gdG91Y2hBbmdsZSA+IHBhcmFtcy50b3VjaEFuZ2xlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoZGF0YS5pc1Njcm9sbGluZykge1xuICAgIHN3aXBlci5lbWl0KFwidG91Y2hNb3ZlT3Bwb3NpdGVcIiwgZSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBkYXRhLnN0YXJ0TW92aW5nID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHRvdWNoZXMuY3VycmVudFggIT09IHRvdWNoZXMuc3RhcnRYIHx8IHRvdWNoZXMuY3VycmVudFkgIT09IHRvdWNoZXMuc3RhcnRZKSB7XG4gICAgICBkYXRhLnN0YXJ0TW92aW5nID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKGRhdGEuaXNTY3JvbGxpbmcgfHwgZS50eXBlID09PSBcInRvdWNobW92ZVwiICYmIGRhdGEucHJldmVudFRvdWNoTW92ZUZyb21Qb2ludGVyTW92ZSkge1xuICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghZGF0YS5zdGFydE1vdmluZykge1xuICAgIHJldHVybjtcbiAgfVxuICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xuICBpZiAoIXBhcmFtcy5jc3NNb2RlICYmIGUuY2FuY2VsYWJsZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBpZiAocGFyYW1zLnRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbiAmJiAhcGFyYW1zLm5lc3RlZCkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbiAgbGV0IGRpZmYgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBkaWZmWCA6IGRpZmZZO1xuICBsZXQgdG91Y2hlc0RpZmYgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB0b3VjaGVzLmN1cnJlbnRYIC0gdG91Y2hlcy5wcmV2aW91c1ggOiB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5wcmV2aW91c1k7XG4gIGlmIChwYXJhbXMub25lV2F5TW92ZW1lbnQpIHtcbiAgICBkaWZmID0gTWF0aC5hYnMoZGlmZikgKiAocnRsID8gMSA6IC0xKTtcbiAgICB0b3VjaGVzRGlmZiA9IE1hdGguYWJzKHRvdWNoZXNEaWZmKSAqIChydGwgPyAxIDogLTEpO1xuICB9XG4gIHRvdWNoZXMuZGlmZiA9IGRpZmY7XG4gIGRpZmYgKj0gcGFyYW1zLnRvdWNoUmF0aW87XG4gIGlmIChydGwpIHtcbiAgICBkaWZmID0gLWRpZmY7XG4gICAgdG91Y2hlc0RpZmYgPSAtdG91Y2hlc0RpZmY7XG4gIH1cbiAgY29uc3QgcHJldlRvdWNoZXNEaXJlY3Rpb24gPSBzd2lwZXIudG91Y2hlc0RpcmVjdGlvbjtcbiAgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID0gZGlmZiA+IDAgPyBcInByZXZcIiA6IFwibmV4dFwiO1xuICBzd2lwZXIudG91Y2hlc0RpcmVjdGlvbiA9IHRvdWNoZXNEaWZmID4gMCA/IFwicHJldlwiIDogXCJuZXh0XCI7XG4gIGNvbnN0IGlzTG9vcCA9IHN3aXBlci5wYXJhbXMubG9vcCAmJiAhcGFyYW1zLmNzc01vZGU7XG4gIGNvbnN0IGFsbG93TG9vcEZpeCA9IHN3aXBlci50b3VjaGVzRGlyZWN0aW9uID09PSBcIm5leHRcIiAmJiBzd2lwZXIuYWxsb3dTbGlkZU5leHQgfHwgc3dpcGVyLnRvdWNoZXNEaXJlY3Rpb24gPT09IFwicHJldlwiICYmIHN3aXBlci5hbGxvd1NsaWRlUHJldjtcbiAgaWYgKCFkYXRhLmlzTW92ZWQpIHtcbiAgICBpZiAoaXNMb29wICYmIGFsbG93TG9vcEZpeCkge1xuICAgICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgICBkaXJlY3Rpb246IHN3aXBlci5zd2lwZURpcmVjdGlvblxuICAgICAgfSk7XG4gICAgfVxuICAgIGRhdGEuc3RhcnRUcmFuc2xhdGUgPSBzd2lwZXIuZ2V0VHJhbnNsYXRlKCk7XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gICAgaWYgKHN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgIGNvbnN0IGV2dCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoXCJ0cmFuc2l0aW9uZW5kXCIsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgYnlTd2lwZXJUb3VjaE1vdmU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzd2lwZXIud3JhcHBlckVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9XG4gICAgZGF0YS5hbGxvd01vbWVudHVtQm91bmNlID0gZmFsc2U7XG4gICAgaWYgKHBhcmFtcy5ncmFiQ3Vyc29yICYmIChzd2lwZXIuYWxsb3dTbGlkZU5leHQgPT09IHRydWUgfHwgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID09PSB0cnVlKSkge1xuICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IodHJ1ZSk7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KFwic2xpZGVyRmlyc3RNb3ZlXCIsIGUpO1xuICB9XG4gIGxldCBsb29wRml4ZWQ7XG4gICgvKiBAX19QVVJFX18gKi8gbmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICBpZiAoZGF0YS5pc01vdmVkICYmIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlICYmIHByZXZUb3VjaGVzRGlyZWN0aW9uICE9PSBzd2lwZXIudG91Y2hlc0RpcmVjdGlvbiAmJiBpc0xvb3AgJiYgYWxsb3dMb29wRml4ICYmIE1hdGguYWJzKGRpZmYpID49IDEpIHtcbiAgICBPYmplY3QuYXNzaWduKHRvdWNoZXMsIHtcbiAgICAgIHN0YXJ0WDogcGFnZVgsXG4gICAgICBzdGFydFk6IHBhZ2VZLFxuICAgICAgY3VycmVudFg6IHBhZ2VYLFxuICAgICAgY3VycmVudFk6IHBhZ2VZLFxuICAgICAgc3RhcnRUcmFuc2xhdGU6IGRhdGEuY3VycmVudFRyYW5zbGF0ZVxuICAgIH0pO1xuICAgIGRhdGEubG9vcFN3YXBSZXNldCA9IHRydWU7XG4gICAgZGF0YS5zdGFydFRyYW5zbGF0ZSA9IGRhdGEuY3VycmVudFRyYW5zbGF0ZTtcbiAgICByZXR1cm47XG4gIH1cbiAgc3dpcGVyLmVtaXQoXCJzbGlkZXJNb3ZlXCIsIGUpO1xuICBkYXRhLmlzTW92ZWQgPSB0cnVlO1xuICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkaWZmICsgZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgbGV0IGRpc2FibGVQYXJlbnRTd2lwZXIgPSB0cnVlO1xuICBsZXQgcmVzaXN0YW5jZVJhdGlvID0gcGFyYW1zLnJlc2lzdGFuY2VSYXRpbztcbiAgaWYgKHBhcmFtcy50b3VjaFJlbGVhc2VPbkVkZ2VzKSB7XG4gICAgcmVzaXN0YW5jZVJhdGlvID0gMDtcbiAgfVxuICBpZiAoZGlmZiA+IDApIHtcbiAgICBpZiAoaXNMb29wICYmIGFsbG93TG9vcEZpeCAmJiAhbG9vcEZpeGVkICYmIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA+IChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWluVHJhbnNsYXRlKCkgLSBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW3N3aXBlci5hY3RpdmVJbmRleCArIDFdIC0gKHBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSBcImF1dG9cIiAmJiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIHBhcmFtcy5zbGlkZXNQZXJWaWV3ID49IDIgPyBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW3N3aXBlci5hY3RpdmVJbmRleCArIDFdICsgc3dpcGVyLnBhcmFtcy5zcGFjZUJldHdlZW4gOiAwKSAtIHN3aXBlci5wYXJhbXMuc3BhY2VCZXR3ZWVuIDogc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSkge1xuICAgICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgICBkaXJlY3Rpb246IFwicHJldlwiLFxuICAgICAgICBzZXRUcmFuc2xhdGU6IHRydWUsXG4gICAgICAgIGFjdGl2ZVNsaWRlSW5kZXg6IDBcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZGF0YS5jdXJyZW50VHJhbnNsYXRlID4gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gZmFsc2U7XG4gICAgICBpZiAocGFyYW1zLnJlc2lzdGFuY2UpIHtcbiAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIC0gMSArICgtc3dpcGVyLm1pblRyYW5zbGF0ZSgpICsgZGF0YS5zdGFydFRyYW5zbGF0ZSArIGRpZmYpICoqIHJlc2lzdGFuY2VSYXRpbztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoZGlmZiA8IDApIHtcbiAgICBpZiAoaXNMb29wICYmIGFsbG93TG9vcEZpeCAmJiAhbG9vcEZpeGVkICYmIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA8IChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWF4VHJhbnNsYXRlKCkgKyBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW3N3aXBlci5zbGlkZXNTaXplc0dyaWQubGVuZ3RoIC0gMV0gKyBzd2lwZXIucGFyYW1zLnNwYWNlQmV0d2VlbiArIChwYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gXCJhdXRvXCIgJiYgc3dpcGVyLnNsaWRlcy5sZW5ndGggLSBwYXJhbXMuc2xpZGVzUGVyVmlldyA+PSAyID8gc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkLmxlbmd0aCAtIDFdICsgc3dpcGVyLnBhcmFtcy5zcGFjZUJldHdlZW4gOiAwKSA6IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkpIHtcbiAgICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgICAgZGlyZWN0aW9uOiBcIm5leHRcIixcbiAgICAgICAgc2V0VHJhbnNsYXRlOiB0cnVlLFxuICAgICAgICBhY3RpdmVTbGlkZUluZGV4OiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gXCJhdXRvXCIgPyBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKSA6IE1hdGguY2VpbChwYXJzZUZsb2F0KHBhcmFtcy5zbGlkZXNQZXJWaWV3LCAxMCkpKVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgIGRpc2FibGVQYXJlbnRTd2lwZXIgPSBmYWxzZTtcbiAgICAgIGlmIChwYXJhbXMucmVzaXN0YW5jZSkge1xuICAgICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgKyAxIC0gKHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIGRhdGEuc3RhcnRUcmFuc2xhdGUgLSBkaWZmKSAqKiByZXNpc3RhbmNlUmF0aW87XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChkaXNhYmxlUGFyZW50U3dpcGVyKSB7XG4gICAgZS5wcmV2ZW50ZWRCeU5lc3RlZFN3aXBlciA9IHRydWU7XG4gIH1cbiAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZU5leHQgJiYgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSBcIm5leHRcIiAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCBkYXRhLnN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgfVxuICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlUHJldiAmJiBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09IFwicHJldlwiICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA+IGRhdGEuc3RhcnRUcmFuc2xhdGUpIHtcbiAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICB9XG4gIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmICFzd2lwZXIuYWxsb3dTbGlkZU5leHQpIHtcbiAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICB9XG4gIGlmIChwYXJhbXMudGhyZXNob2xkID4gMCkge1xuICAgIGlmIChNYXRoLmFicyhkaWZmKSA+IHBhcmFtcy50aHJlc2hvbGQgfHwgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUpIHtcbiAgICAgIGlmICghZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUpIHtcbiAgICAgICAgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgPSB0cnVlO1xuICAgICAgICB0b3VjaGVzLnN0YXJ0WCA9IHRvdWNoZXMuY3VycmVudFg7XG4gICAgICAgIHRvdWNoZXMuc3RhcnRZID0gdG91Y2hlcy5jdXJyZW50WTtcbiAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICAgICAgdG91Y2hlcy5kaWZmID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hlcy5jdXJyZW50WCAtIHRvdWNoZXMuc3RhcnRYIDogdG91Y2hlcy5jdXJyZW50WSAtIHRvdWNoZXMuc3RhcnRZO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGlmICghcGFyYW1zLmZvbGxvd0ZpbmdlciB8fCBwYXJhbXMuY3NzTW9kZSkgcmV0dXJuO1xuICBpZiAocGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmIHN3aXBlci5mcmVlTW9kZSB8fCBwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcykge1xuICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gIH1cbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiBzd2lwZXIuZnJlZU1vZGUpIHtcbiAgICBzd2lwZXIuZnJlZU1vZGUub25Ub3VjaE1vdmUoKTtcbiAgfVxuICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoZGF0YS5jdXJyZW50VHJhbnNsYXRlKTtcbiAgc3dpcGVyLnNldFRyYW5zbGF0ZShkYXRhLmN1cnJlbnRUcmFuc2xhdGUpO1xufVxuZnVuY3Rpb24gb25Ub3VjaEVuZChldmVudDIpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG4gIGxldCBlID0gZXZlbnQyO1xuICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICBsZXQgdGFyZ2V0VG91Y2g7XG4gIGNvbnN0IGlzVG91Y2hFdmVudCA9IGUudHlwZSA9PT0gXCJ0b3VjaGVuZFwiIHx8IGUudHlwZSA9PT0gXCJ0b3VjaGNhbmNlbFwiO1xuICBpZiAoIWlzVG91Y2hFdmVudCkge1xuICAgIGlmIChkYXRhLnRvdWNoSWQgIT09IG51bGwpIHJldHVybjtcbiAgICBpZiAoZS5wb2ludGVySWQgIT09IGRhdGEucG9pbnRlcklkKSByZXR1cm47XG4gICAgdGFyZ2V0VG91Y2ggPSBlO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldFRvdWNoID0gWy4uLmUuY2hhbmdlZFRvdWNoZXNdLmZpbHRlcigodCkgPT4gdC5pZGVudGlmaWVyID09PSBkYXRhLnRvdWNoSWQpWzBdO1xuICAgIGlmICghdGFyZ2V0VG91Y2ggfHwgdGFyZ2V0VG91Y2guaWRlbnRpZmllciAhPT0gZGF0YS50b3VjaElkKSByZXR1cm47XG4gIH1cbiAgaWYgKFtcInBvaW50ZXJjYW5jZWxcIiwgXCJwb2ludGVyb3V0XCIsIFwicG9pbnRlcmxlYXZlXCIsIFwiY29udGV4dG1lbnVcIl0uaW5jbHVkZXMoZS50eXBlKSkge1xuICAgIGNvbnN0IHByb2NlZWQgPSBbXCJwb2ludGVyY2FuY2VsXCIsIFwiY29udGV4dG1lbnVcIl0uaW5jbHVkZXMoZS50eXBlKSAmJiAoc3dpcGVyLmJyb3dzZXIuaXNTYWZhcmkgfHwgc3dpcGVyLmJyb3dzZXIuaXNXZWJWaWV3KTtcbiAgICBpZiAoIXByb2NlZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgZGF0YS5wb2ludGVySWQgPSBudWxsO1xuICBkYXRhLnRvdWNoSWQgPSBudWxsO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHRvdWNoZXMsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgc2xpZGVzR3JpZCxcbiAgICBlbmFibGVkXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCkgcmV0dXJuO1xuICBpZiAoIXBhcmFtcy5zaW11bGF0ZVRvdWNoICYmIGUucG9pbnRlclR5cGUgPT09IFwibW91c2VcIikgcmV0dXJuO1xuICBpZiAoZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzKSB7XG4gICAgc3dpcGVyLmVtaXQoXCJ0b3VjaEVuZFwiLCBlKTtcbiAgfVxuICBkYXRhLmFsbG93VG91Y2hDYWxsYmFja3MgPSBmYWxzZTtcbiAgaWYgKCFkYXRhLmlzVG91Y2hlZCkge1xuICAgIGlmIChkYXRhLmlzTW92ZWQgJiYgcGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKGZhbHNlKTtcbiAgICB9XG4gICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgZGF0YS5zdGFydE1vdmluZyA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLmdyYWJDdXJzb3IgJiYgZGF0YS5pc01vdmVkICYmIGRhdGEuaXNUb3VjaGVkICYmIChzd2lwZXIuYWxsb3dTbGlkZU5leHQgPT09IHRydWUgfHwgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID09PSB0cnVlKSkge1xuICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKGZhbHNlKTtcbiAgfVxuICBjb25zdCB0b3VjaEVuZFRpbWUgPSBub3coKTtcbiAgY29uc3QgdGltZURpZmYgPSB0b3VjaEVuZFRpbWUgLSBkYXRhLnRvdWNoU3RhcnRUaW1lO1xuICBpZiAoc3dpcGVyLmFsbG93Q2xpY2spIHtcbiAgICBjb25zdCBwYXRoVHJlZSA9IGUucGF0aCB8fCBlLmNvbXBvc2VkUGF0aCAmJiBlLmNvbXBvc2VkUGF0aCgpO1xuICAgIHN3aXBlci51cGRhdGVDbGlja2VkU2xpZGUocGF0aFRyZWUgJiYgcGF0aFRyZWVbMF0gfHwgZS50YXJnZXQsIHBhdGhUcmVlKTtcbiAgICBzd2lwZXIuZW1pdChcInRhcCBjbGlja1wiLCBlKTtcbiAgICBpZiAodGltZURpZmYgPCAzMDAgJiYgdG91Y2hFbmRUaW1lIC0gZGF0YS5sYXN0Q2xpY2tUaW1lIDwgMzAwKSB7XG4gICAgICBzd2lwZXIuZW1pdChcImRvdWJsZVRhcCBkb3VibGVDbGlja1wiLCBlKTtcbiAgICB9XG4gIH1cbiAgZGF0YS5sYXN0Q2xpY2tUaW1lID0gbm93KCk7XG4gIG5leHRUaWNrKCgpID0+IHtcbiAgICBpZiAoIXN3aXBlci5kZXN0cm95ZWQpIHN3aXBlci5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgfSk7XG4gIGlmICghZGF0YS5pc1RvdWNoZWQgfHwgIWRhdGEuaXNNb3ZlZCB8fCAhc3dpcGVyLnN3aXBlRGlyZWN0aW9uIHx8IHRvdWNoZXMuZGlmZiA9PT0gMCAmJiAhZGF0YS5sb29wU3dhcFJlc2V0IHx8IGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9PT0gZGF0YS5zdGFydFRyYW5zbGF0ZSAmJiAhZGF0YS5sb29wU3dhcFJlc2V0KSB7XG4gICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICBkYXRhLnN0YXJ0TW92aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuICBkYXRhLnN0YXJ0TW92aW5nID0gZmFsc2U7XG4gIGxldCBjdXJyZW50UG9zO1xuICBpZiAocGFyYW1zLmZvbGxvd0Zpbmdlcikge1xuICAgIGN1cnJlbnRQb3MgPSBydGwgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudFBvcyA9IC1kYXRhLmN1cnJlbnRUcmFuc2xhdGU7XG4gIH1cbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQpIHtcbiAgICBzd2lwZXIuZnJlZU1vZGUub25Ub3VjaEVuZCh7XG4gICAgICBjdXJyZW50UG9zXG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHN3aXBlVG9MYXN0ID0gY3VycmVudFBvcyA+PSAtc3dpcGVyLm1heFRyYW5zbGF0ZSgpICYmICFzd2lwZXIucGFyYW1zLmxvb3A7XG4gIGxldCBzdG9wSW5kZXggPSAwO1xuICBsZXQgZ3JvdXBTaXplID0gc3dpcGVyLnNsaWRlc1NpemVzR3JpZFswXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSBpIDwgcGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCA/IDEgOiBwYXJhbXMuc2xpZGVzUGVyR3JvdXApIHtcbiAgICBjb25zdCBpbmNyZW1lbnQyID0gaSA8IHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAgLSAxID8gMSA6IHBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICBpZiAodHlwZW9mIHNsaWRlc0dyaWRbaSArIGluY3JlbWVudDJdICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAoc3dpcGVUb0xhc3QgfHwgY3VycmVudFBvcyA+PSBzbGlkZXNHcmlkW2ldICYmIGN1cnJlbnRQb3MgPCBzbGlkZXNHcmlkW2kgKyBpbmNyZW1lbnQyXSkge1xuICAgICAgICBzdG9wSW5kZXggPSBpO1xuICAgICAgICBncm91cFNpemUgPSBzbGlkZXNHcmlkW2kgKyBpbmNyZW1lbnQyXSAtIHNsaWRlc0dyaWRbaV07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzd2lwZVRvTGFzdCB8fCBjdXJyZW50UG9zID49IHNsaWRlc0dyaWRbaV0pIHtcbiAgICAgIHN0b3BJbmRleCA9IGk7XG4gICAgICBncm91cFNpemUgPSBzbGlkZXNHcmlkW3NsaWRlc0dyaWQubGVuZ3RoIC0gMV0gLSBzbGlkZXNHcmlkW3NsaWRlc0dyaWQubGVuZ3RoIC0gMl07XG4gICAgfVxuICB9XG4gIGxldCByZXdpbmRGaXJzdEluZGV4ID0gbnVsbDtcbiAgbGV0IHJld2luZExhc3RJbmRleCA9IG51bGw7XG4gIGlmIChwYXJhbXMucmV3aW5kKSB7XG4gICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZykge1xuICAgICAgcmV3aW5kTGFzdEluZGV4ID0gcGFyYW1zLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZCAmJiBzd2lwZXIudmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggLSAxIDogc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSBpZiAoc3dpcGVyLmlzRW5kKSB7XG4gICAgICByZXdpbmRGaXJzdEluZGV4ID0gMDtcbiAgICB9XG4gIH1cbiAgY29uc3QgcmF0aW8gPSAoY3VycmVudFBvcyAtIHNsaWRlc0dyaWRbc3RvcEluZGV4XSkgLyBncm91cFNpemU7XG4gIGNvbnN0IGluY3JlbWVudCA9IHN0b3BJbmRleCA8IHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAgLSAxID8gMSA6IHBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgaWYgKHRpbWVEaWZmID4gcGFyYW1zLmxvbmdTd2lwZXNNcykge1xuICAgIGlmICghcGFyYW1zLmxvbmdTd2lwZXMpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09IFwibmV4dFwiKSB7XG4gICAgICBpZiAocmF0aW8gPj0gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykgc3dpcGVyLnNsaWRlVG8ocGFyYW1zLnJld2luZCAmJiBzd2lwZXIuaXNFbmQgPyByZXdpbmRGaXJzdEluZGV4IDogc3RvcEluZGV4ICsgaW5jcmVtZW50KTtcbiAgICAgIGVsc2Ugc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gXCJwcmV2XCIpIHtcbiAgICAgIGlmIChyYXRpbyA+IDEgLSBwYXJhbXMubG9uZ1N3aXBlc1JhdGlvKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCArIGluY3JlbWVudCk7XG4gICAgICB9IGVsc2UgaWYgKHJld2luZExhc3RJbmRleCAhPT0gbnVsbCAmJiByYXRpbyA8IDAgJiYgTWF0aC5hYnMocmF0aW8pID4gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhyZXdpbmRMYXN0SW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFwYXJhbXMuc2hvcnRTd2lwZXMpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGlzTmF2QnV0dG9uVGFyZ2V0ID0gc3dpcGVyLm5hdmlnYXRpb24gJiYgKGUudGFyZ2V0ID09PSBzd2lwZXIubmF2aWdhdGlvbi5uZXh0RWwgfHwgZS50YXJnZXQgPT09IHN3aXBlci5uYXZpZ2F0aW9uLnByZXZFbCk7XG4gICAgaWYgKCFpc05hdkJ1dHRvblRhcmdldCkge1xuICAgICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8ocmV3aW5kRmlyc3RJbmRleCAhPT0gbnVsbCA/IHJld2luZEZpcnN0SW5kZXggOiBzdG9wSW5kZXggKyBpbmNyZW1lbnQpO1xuICAgICAgfVxuICAgICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gXCJwcmV2XCIpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8ocmV3aW5kTGFzdEluZGV4ICE9PSBudWxsID8gcmV3aW5kTGFzdEluZGV4IDogc3RvcEluZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0ID09PSBzd2lwZXIubmF2aWdhdGlvbi5uZXh0RWwpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCArIGluY3JlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBvblJlc2l6ZSgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBlbFxuICB9ID0gc3dpcGVyO1xuICBpZiAoZWwgJiYgZWwub2Zmc2V0V2lkdGggPT09IDApIHJldHVybjtcbiAgaWYgKHBhcmFtcy5icmVha3BvaW50cykge1xuICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gIH1cbiAgY29uc3Qge1xuICAgIGFsbG93U2xpZGVOZXh0LFxuICAgIGFsbG93U2xpZGVQcmV2LFxuICAgIHNuYXBHcmlkXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSB0cnVlO1xuICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSB0cnVlO1xuICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gIGNvbnN0IGlzVmlydHVhbExvb3AgPSBpc1ZpcnR1YWwgJiYgcGFyYW1zLmxvb3A7XG4gIGlmICgocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiIHx8IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkgJiYgc3dpcGVyLmlzRW5kICYmICFzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgIWlzVmlydHVhbExvb3ApIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wICYmICFpc1ZpcnR1YWwpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvTG9vcChzd2lwZXIucmVhbEluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgIH1cbiAgfVxuICBpZiAoc3dpcGVyLmF1dG9wbGF5ICYmIHN3aXBlci5hdXRvcGxheS5ydW5uaW5nICYmIHN3aXBlci5hdXRvcGxheS5wYXVzZWQpIHtcbiAgICBjbGVhclRpbWVvdXQoc3dpcGVyLmF1dG9wbGF5LnJlc2l6ZVRpbWVvdXQpO1xuICAgIHN3aXBlci5hdXRvcGxheS5yZXNpemVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoc3dpcGVyLmF1dG9wbGF5ICYmIHN3aXBlci5hdXRvcGxheS5ydW5uaW5nICYmIHN3aXBlci5hdXRvcGxheS5wYXVzZWQpIHtcbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnJlc3VtZSgpO1xuICAgICAgfVxuICAgIH0sIDUwMCk7XG4gIH1cbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gYWxsb3dTbGlkZVByZXY7XG4gIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xuICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHNuYXBHcmlkICE9PSBzd2lwZXIuc25hcEdyaWQpIHtcbiAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICB9XG59XG5mdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICBpZiAoIXN3aXBlci5hbGxvd0NsaWNrKSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMucHJldmVudENsaWNrcykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbiAmJiBzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgd3JhcHBlckVsLFxuICAgIHJ0bFRyYW5zbGF0ZSxcbiAgICBlbmFibGVkXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCkgcmV0dXJuO1xuICBzd2lwZXIucHJldmlvdXNUcmFuc2xhdGUgPSBzd2lwZXIudHJhbnNsYXRlO1xuICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgc3dpcGVyLnRyYW5zbGF0ZSA9IC13cmFwcGVyRWwuc2Nyb2xsTGVmdDtcbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIudHJhbnNsYXRlID0gLXdyYXBwZXJFbC5zY3JvbGxUb3A7XG4gIH1cbiAgaWYgKHN3aXBlci50cmFuc2xhdGUgPT09IDApIHN3aXBlci50cmFuc2xhdGUgPSAwO1xuICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgbGV0IG5ld1Byb2dyZXNzO1xuICBjb25zdCB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgaWYgKHRyYW5zbGF0ZXNEaWZmID09PSAwKSB7XG4gICAgbmV3UHJvZ3Jlc3MgPSAwO1xuICB9IGVsc2Uge1xuICAgIG5ld1Byb2dyZXNzID0gKHN3aXBlci50cmFuc2xhdGUgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIC8gdHJhbnNsYXRlc0RpZmY7XG4gIH1cbiAgaWYgKG5ld1Byb2dyZXNzICE9PSBzd2lwZXIucHJvZ3Jlc3MpIHtcbiAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MocnRsVHJhbnNsYXRlID8gLXN3aXBlci50cmFuc2xhdGUgOiBzd2lwZXIudHJhbnNsYXRlKTtcbiAgfVxuICBzd2lwZXIuZW1pdChcInNldFRyYW5zbGF0ZVwiLCBzd2lwZXIudHJhbnNsYXRlLCBmYWxzZSk7XG59XG5mdW5jdGlvbiBvbkxvYWQoZSkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBwcm9jZXNzTGF6eVByZWxvYWRlcihzd2lwZXIsIGUudGFyZ2V0KTtcbiAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSB8fCBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09IFwiYXV0b1wiICYmICFzd2lwZXIucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc3dpcGVyLnVwZGF0ZSgpO1xufVxuZnVuY3Rpb24gb25Eb2N1bWVudFRvdWNoU3RhcnQoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmIChzd2lwZXIuZG9jdW1lbnRUb3VjaEhhbmRsZXJQcm9jZWVkZWQpIHJldHVybjtcbiAgc3dpcGVyLmRvY3VtZW50VG91Y2hIYW5kbGVyUHJvY2VlZGVkID0gdHJ1ZTtcbiAgaWYgKHN3aXBlci5wYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcykge1xuICAgIHN3aXBlci5lbC5zdHlsZS50b3VjaEFjdGlvbiA9IFwiYXV0b1wiO1xuICB9XG59XG5mdW5jdGlvbiBhdHRhY2hFdmVudHMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgc3dpcGVyLm9uVG91Y2hTdGFydCA9IG9uVG91Y2hTdGFydC5iaW5kKHN3aXBlcik7XG4gIHN3aXBlci5vblRvdWNoTW92ZSA9IG9uVG91Y2hNb3ZlLmJpbmQoc3dpcGVyKTtcbiAgc3dpcGVyLm9uVG91Y2hFbmQgPSBvblRvdWNoRW5kLmJpbmQoc3dpcGVyKTtcbiAgc3dpcGVyLm9uRG9jdW1lbnRUb3VjaFN0YXJ0ID0gb25Eb2N1bWVudFRvdWNoU3RhcnQuYmluZChzd2lwZXIpO1xuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICBzd2lwZXIub25TY3JvbGwgPSBvblNjcm9sbC5iaW5kKHN3aXBlcik7XG4gIH1cbiAgc3dpcGVyLm9uQ2xpY2sgPSBvbkNsaWNrLmJpbmQoc3dpcGVyKTtcbiAgc3dpcGVyLm9uTG9hZCA9IG9uTG9hZC5iaW5kKHN3aXBlcik7XG4gIGV2ZW50cyhzd2lwZXIsIFwib25cIik7XG59XG5mdW5jdGlvbiBkZXRhY2hFdmVudHMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGV2ZW50cyhzd2lwZXIsIFwib2ZmXCIpO1xufVxuZnVuY3Rpb24gc2V0QnJlYWtwb2ludCgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHJlYWxJbmRleCxcbiAgICBpbml0aWFsaXplZCxcbiAgICBwYXJhbXMsXG4gICAgZWxcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgYnJlYWtwb2ludHMyID0gcGFyYW1zLmJyZWFrcG9pbnRzO1xuICBpZiAoIWJyZWFrcG9pbnRzMiB8fCBicmVha3BvaW50czIgJiYgT2JqZWN0LmtleXMoYnJlYWtwb2ludHMyKS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgY29uc3QgYnJlYWtwb2ludCA9IHN3aXBlci5nZXRCcmVha3BvaW50KGJyZWFrcG9pbnRzMiwgc3dpcGVyLnBhcmFtcy5icmVha3BvaW50c0Jhc2UsIHN3aXBlci5lbCk7XG4gIGlmICghYnJlYWtwb2ludCB8fCBzd2lwZXIuY3VycmVudEJyZWFrcG9pbnQgPT09IGJyZWFrcG9pbnQpIHJldHVybjtcbiAgY29uc3QgYnJlYWtwb2ludE9ubHlQYXJhbXMgPSBicmVha3BvaW50IGluIGJyZWFrcG9pbnRzMiA/IGJyZWFrcG9pbnRzMlticmVha3BvaW50XSA6IHZvaWQgMDtcbiAgY29uc3QgYnJlYWtwb2ludFBhcmFtcyA9IGJyZWFrcG9pbnRPbmx5UGFyYW1zIHx8IHN3aXBlci5vcmlnaW5hbFBhcmFtcztcbiAgY29uc3Qgd2FzTXVsdGlSb3cgPSBpc0dyaWRFbmFibGVkKHN3aXBlciwgcGFyYW1zKTtcbiAgY29uc3QgaXNNdWx0aVJvdyA9IGlzR3JpZEVuYWJsZWQoc3dpcGVyLCBicmVha3BvaW50UGFyYW1zKTtcbiAgY29uc3Qgd2FzR3JhYkN1cnNvciA9IHN3aXBlci5wYXJhbXMuZ3JhYkN1cnNvcjtcbiAgY29uc3QgaXNHcmFiQ3Vyc29yID0gYnJlYWtwb2ludFBhcmFtcy5ncmFiQ3Vyc29yO1xuICBjb25zdCB3YXNFbmFibGVkID0gcGFyYW1zLmVuYWJsZWQ7XG4gIGlmICh3YXNNdWx0aVJvdyAmJiAhaXNNdWx0aVJvdykge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9Z3JpZGAsIGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWdyaWQtY29sdW1uYCk7XG4gICAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG4gIH0gZWxzZSBpZiAoIXdhc011bHRpUm93ICYmIGlzTXVsdGlSb3cpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWdyaWRgKTtcbiAgICBpZiAoYnJlYWtwb2ludFBhcmFtcy5ncmlkLmZpbGwgJiYgYnJlYWtwb2ludFBhcmFtcy5ncmlkLmZpbGwgPT09IFwiY29sdW1uXCIgfHwgIWJyZWFrcG9pbnRQYXJhbXMuZ3JpZC5maWxsICYmIHBhcmFtcy5ncmlkLmZpbGwgPT09IFwiY29sdW1uXCIpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9Z3JpZC1jb2x1bW5gKTtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG4gIH1cbiAgaWYgKHdhc0dyYWJDdXJzb3IgJiYgIWlzR3JhYkN1cnNvcikge1xuICAgIHN3aXBlci51bnNldEdyYWJDdXJzb3IoKTtcbiAgfSBlbHNlIGlmICghd2FzR3JhYkN1cnNvciAmJiBpc0dyYWJDdXJzb3IpIHtcbiAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcigpO1xuICB9XG4gIFtcIm5hdmlnYXRpb25cIiwgXCJwYWdpbmF0aW9uXCIsIFwic2Nyb2xsYmFyXCJdLmZvckVhY2goKHByb3ApID0+IHtcbiAgICBpZiAodHlwZW9mIGJyZWFrcG9pbnRQYXJhbXNbcHJvcF0gPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICBjb25zdCB3YXNNb2R1bGVFbmFibGVkID0gcGFyYW1zW3Byb3BdICYmIHBhcmFtc1twcm9wXS5lbmFibGVkO1xuICAgIGNvbnN0IGlzTW9kdWxlRW5hYmxlZCA9IGJyZWFrcG9pbnRQYXJhbXNbcHJvcF0gJiYgYnJlYWtwb2ludFBhcmFtc1twcm9wXS5lbmFibGVkO1xuICAgIGlmICh3YXNNb2R1bGVFbmFibGVkICYmICFpc01vZHVsZUVuYWJsZWQpIHtcbiAgICAgIHN3aXBlcltwcm9wXS5kaXNhYmxlKCk7XG4gICAgfVxuICAgIGlmICghd2FzTW9kdWxlRW5hYmxlZCAmJiBpc01vZHVsZUVuYWJsZWQpIHtcbiAgICAgIHN3aXBlcltwcm9wXS5lbmFibGUoKTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBkaXJlY3Rpb25DaGFuZ2VkID0gYnJlYWtwb2ludFBhcmFtcy5kaXJlY3Rpb24gJiYgYnJlYWtwb2ludFBhcmFtcy5kaXJlY3Rpb24gIT09IHBhcmFtcy5kaXJlY3Rpb247XG4gIGNvbnN0IG5lZWRzUmVMb29wID0gcGFyYW1zLmxvb3AgJiYgKGJyZWFrcG9pbnRQYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gcGFyYW1zLnNsaWRlc1BlclZpZXcgfHwgZGlyZWN0aW9uQ2hhbmdlZCk7XG4gIGNvbnN0IHdhc0xvb3AgPSBwYXJhbXMubG9vcDtcbiAgaWYgKGRpcmVjdGlvbkNoYW5nZWQgJiYgaW5pdGlhbGl6ZWQpIHtcbiAgICBzd2lwZXIuY2hhbmdlRGlyZWN0aW9uKCk7XG4gIH1cbiAgZXh0ZW5kMihzd2lwZXIucGFyYW1zLCBicmVha3BvaW50UGFyYW1zKTtcbiAgY29uc3QgaXNFbmFibGVkMiA9IHN3aXBlci5wYXJhbXMuZW5hYmxlZDtcbiAgY29uc3QgaGFzTG9vcCA9IHN3aXBlci5wYXJhbXMubG9vcDtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICBhbGxvd1RvdWNoTW92ZTogc3dpcGVyLnBhcmFtcy5hbGxvd1RvdWNoTW92ZSxcbiAgICBhbGxvd1NsaWRlTmV4dDogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlTmV4dCxcbiAgICBhbGxvd1NsaWRlUHJldjogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlUHJldlxuICB9KTtcbiAgaWYgKHdhc0VuYWJsZWQgJiYgIWlzRW5hYmxlZDIpIHtcbiAgICBzd2lwZXIuZGlzYWJsZSgpO1xuICB9IGVsc2UgaWYgKCF3YXNFbmFibGVkICYmIGlzRW5hYmxlZDIpIHtcbiAgICBzd2lwZXIuZW5hYmxlKCk7XG4gIH1cbiAgc3dpcGVyLmN1cnJlbnRCcmVha3BvaW50ID0gYnJlYWtwb2ludDtcbiAgc3dpcGVyLmVtaXQoXCJfYmVmb3JlQnJlYWtwb2ludFwiLCBicmVha3BvaW50UGFyYW1zKTtcbiAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgaWYgKG5lZWRzUmVMb29wKSB7XG4gICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICAgIHN3aXBlci5sb29wQ3JlYXRlKHJlYWxJbmRleCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgfSBlbHNlIGlmICghd2FzTG9vcCAmJiBoYXNMb29wKSB7XG4gICAgICBzd2lwZXIubG9vcENyZWF0ZShyZWFsSW5kZXgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgIH0gZWxzZSBpZiAod2FzTG9vcCAmJiAhaGFzTG9vcCkge1xuICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgfVxuICB9XG4gIHN3aXBlci5lbWl0KFwiYnJlYWtwb2ludFwiLCBicmVha3BvaW50UGFyYW1zKTtcbn1cbmZ1bmN0aW9uIGdldEJyZWFrcG9pbnQoYnJlYWtwb2ludHMyLCBiYXNlLCBjb250YWluZXJFbCkge1xuICBpZiAoYmFzZSA9PT0gdm9pZCAwKSB7XG4gICAgYmFzZSA9IFwid2luZG93XCI7XG4gIH1cbiAgaWYgKCFicmVha3BvaW50czIgfHwgYmFzZSA9PT0gXCJjb250YWluZXJcIiAmJiAhY29udGFpbmVyRWwpIHJldHVybiB2b2lkIDA7XG4gIGxldCBicmVha3BvaW50ID0gZmFsc2U7XG4gIGNvbnN0IHdpbmRvdzIgPSBnZXRXaW5kb3coKTtcbiAgY29uc3QgY3VycmVudEhlaWdodCA9IGJhc2UgPT09IFwid2luZG93XCIgPyB3aW5kb3cyLmlubmVySGVpZ2h0IDogY29udGFpbmVyRWwuY2xpZW50SGVpZ2h0O1xuICBjb25zdCBwb2ludHMgPSBPYmplY3Qua2V5cyhicmVha3BvaW50czIpLm1hcCgocG9pbnQpID0+IHtcbiAgICBpZiAodHlwZW9mIHBvaW50ID09PSBcInN0cmluZ1wiICYmIHBvaW50LmluZGV4T2YoXCJAXCIpID09PSAwKSB7XG4gICAgICBjb25zdCBtaW5SYXRpbyA9IHBhcnNlRmxvYXQocG9pbnQuc3Vic3RyKDEpKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVudEhlaWdodCAqIG1pblJhdGlvO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHBvaW50XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHBvaW50LFxuICAgICAgcG9pbnRcbiAgICB9O1xuICB9KTtcbiAgcG9pbnRzLnNvcnQoKGEsIGIpID0+IHBhcnNlSW50KGEudmFsdWUsIDEwKSAtIHBhcnNlSW50KGIudmFsdWUsIDEwKSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3Qge1xuICAgICAgcG9pbnQsXG4gICAgICB2YWx1ZVxuICAgIH0gPSBwb2ludHNbaV07XG4gICAgaWYgKGJhc2UgPT09IFwid2luZG93XCIpIHtcbiAgICAgIGlmICh3aW5kb3cyLm1hdGNoTWVkaWEoYChtaW4td2lkdGg6ICR7dmFsdWV9cHgpYCkubWF0Y2hlcykge1xuICAgICAgICBicmVha3BvaW50ID0gcG9pbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA8PSBjb250YWluZXJFbC5jbGllbnRXaWR0aCkge1xuICAgICAgYnJlYWtwb2ludCA9IHBvaW50O1xuICAgIH1cbiAgfVxuICByZXR1cm4gYnJlYWtwb2ludCB8fCBcIm1heFwiO1xufVxuZnVuY3Rpb24gcHJlcGFyZUNsYXNzZXMoZW50cmllcywgcHJlZml4KSB7XG4gIGNvbnN0IHJlc3VsdENsYXNzZXMgPSBbXTtcbiAgZW50cmllcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBpdGVtID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBPYmplY3Qua2V5cyhpdGVtKS5mb3JFYWNoKChjbGFzc05hbWVzKSA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NsYXNzTmFtZXNdKSB7XG4gICAgICAgICAgcmVzdWx0Q2xhc3Nlcy5wdXNoKHByZWZpeCArIGNsYXNzTmFtZXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXN1bHRDbGFzc2VzLnB1c2gocHJlZml4ICsgaXRlbSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdENsYXNzZXM7XG59XG5mdW5jdGlvbiBhZGRDbGFzc2VzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgY2xhc3NOYW1lcyxcbiAgICBwYXJhbXMsXG4gICAgcnRsLFxuICAgIGVsLFxuICAgIGRldmljZVxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBzdWZmaXhlcyA9IHByZXBhcmVDbGFzc2VzKFtcImluaXRpYWxpemVkXCIsIHBhcmFtcy5kaXJlY3Rpb24sIHtcbiAgICBcImZyZWUtbW9kZVwiOiBzd2lwZXIucGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkXG4gIH0sIHtcbiAgICBcImF1dG9oZWlnaHRcIjogcGFyYW1zLmF1dG9IZWlnaHRcbiAgfSwge1xuICAgIFwicnRsXCI6IHJ0bFxuICB9LCB7XG4gICAgXCJncmlkXCI6IHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxXG4gIH0sIHtcbiAgICBcImdyaWQtY29sdW1uXCI6IHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxICYmIHBhcmFtcy5ncmlkLmZpbGwgPT09IFwiY29sdW1uXCJcbiAgfSwge1xuICAgIFwiYW5kcm9pZFwiOiBkZXZpY2UuYW5kcm9pZFxuICB9LCB7XG4gICAgXCJpb3NcIjogZGV2aWNlLmlvc1xuICB9LCB7XG4gICAgXCJjc3MtbW9kZVwiOiBwYXJhbXMuY3NzTW9kZVxuICB9LCB7XG4gICAgXCJjZW50ZXJlZFwiOiBwYXJhbXMuY3NzTW9kZSAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXNcbiAgfSwge1xuICAgIFwid2F0Y2gtcHJvZ3Jlc3NcIjogcGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3NcbiAgfV0sIHBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKTtcbiAgY2xhc3NOYW1lcy5wdXNoKC4uLnN1ZmZpeGVzKTtcbiAgZWwuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVzKTtcbiAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG59XG5mdW5jdGlvbiByZW1vdmVDbGFzc2VzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgZWwsXG4gICAgY2xhc3NOYW1lc1xuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVsIHx8IHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikgcmV0dXJuO1xuICBlbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzTmFtZXMpO1xuICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbn1cbmZ1bmN0aW9uIGNoZWNrT3ZlcmZsb3coKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBpc0xvY2tlZDogd2FzTG9ja2VkLFxuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBjb25zdCB7XG4gICAgc2xpZGVzT2Zmc2V0QmVmb3JlXG4gIH0gPSBwYXJhbXM7XG4gIGlmIChzbGlkZXNPZmZzZXRCZWZvcmUpIHtcbiAgICBjb25zdCBsYXN0U2xpZGVJbmRleCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBsYXN0U2xpZGVSaWdodEVkZ2UgPSBzd2lwZXIuc2xpZGVzR3JpZFtsYXN0U2xpZGVJbmRleF0gKyBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW2xhc3RTbGlkZUluZGV4XSArIHNsaWRlc09mZnNldEJlZm9yZSAqIDI7XG4gICAgc3dpcGVyLmlzTG9ja2VkID0gc3dpcGVyLnNpemUgPiBsYXN0U2xpZGVSaWdodEVkZ2U7XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLmlzTG9ja2VkID0gc3dpcGVyLnNuYXBHcmlkLmxlbmd0aCA9PT0gMTtcbiAgfVxuICBpZiAocGFyYW1zLmFsbG93U2xpZGVOZXh0ID09PSB0cnVlKSB7XG4gICAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gIXN3aXBlci5pc0xvY2tlZDtcbiAgfVxuICBpZiAocGFyYW1zLmFsbG93U2xpZGVQcmV2ID09PSB0cnVlKSB7XG4gICAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gIXN3aXBlci5pc0xvY2tlZDtcbiAgfVxuICBpZiAod2FzTG9ja2VkICYmIHdhc0xvY2tlZCAhPT0gc3dpcGVyLmlzTG9ja2VkKSB7XG4gICAgc3dpcGVyLmlzRW5kID0gZmFsc2U7XG4gIH1cbiAgaWYgKHdhc0xvY2tlZCAhPT0gc3dpcGVyLmlzTG9ja2VkKSB7XG4gICAgc3dpcGVyLmVtaXQoc3dpcGVyLmlzTG9ja2VkID8gXCJsb2NrXCIgOiBcInVubG9ja1wiKTtcbiAgfVxufVxuZnVuY3Rpb24gbW9kdWxlRXh0ZW5kUGFyYW1zKHBhcmFtcywgYWxsTW9kdWxlc1BhcmFtcykge1xuICByZXR1cm4gZnVuY3Rpb24gZXh0ZW5kUGFyYW1zKG9iaikge1xuICAgIGlmIChvYmogPT09IHZvaWQgMCkge1xuICAgICAgb2JqID0ge307XG4gICAgfVxuICAgIGNvbnN0IG1vZHVsZVBhcmFtTmFtZSA9IE9iamVjdC5rZXlzKG9iailbMF07XG4gICAgY29uc3QgbW9kdWxlUGFyYW1zID0gb2JqW21vZHVsZVBhcmFtTmFtZV07XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVQYXJhbXMgIT09IFwib2JqZWN0XCIgfHwgbW9kdWxlUGFyYW1zID09PSBudWxsKSB7XG4gICAgICBleHRlbmQyKGFsbE1vZHVsZXNQYXJhbXMsIG9iaik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9PT0gdHJ1ZSkge1xuICAgICAgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPSB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChtb2R1bGVQYXJhbU5hbWUgPT09IFwibmF2aWdhdGlvblwiICYmIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdICYmIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmVuYWJsZWQgJiYgIXBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLnByZXZFbCAmJiAhcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0ubmV4dEVsKSB7XG4gICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5hdXRvID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKFtcInBhZ2luYXRpb25cIiwgXCJzY3JvbGxiYXJcIl0uaW5kZXhPZihtb2R1bGVQYXJhbU5hbWUpID49IDAgJiYgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gJiYgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uZW5hYmxlZCAmJiAhcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uZWwpIHtcbiAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmF1dG8gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoIShtb2R1bGVQYXJhbU5hbWUgaW4gcGFyYW1zICYmIFwiZW5hYmxlZFwiIGluIG1vZHVsZVBhcmFtcykpIHtcbiAgICAgIGV4dGVuZDIoYWxsTW9kdWxlc1BhcmFtcywgb2JqKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9PT0gXCJvYmplY3RcIiAmJiAhKFwiZW5hYmxlZFwiIGluIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdKSkge1xuICAgICAgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmICghcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0pIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID0ge1xuICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICB9O1xuICAgIGV4dGVuZDIoYWxsTW9kdWxlc1BhcmFtcywgb2JqKTtcbiAgfTtcbn1cbnZhciBzdXBwb3J0LCBkZXZpY2VDYWNoZWQsIGJyb3dzZXIsIGV2ZW50c0VtaXR0ZXIsIHRvZ2dsZVNsaWRlQ2xhc3NlcyQxLCB0b2dnbGVTbGlkZUNsYXNzZXMsIHByb2Nlc3NMYXp5UHJlbG9hZGVyLCB1bmxhenksIHByZWxvYWQsIHVwZGF0ZSwgdHJhbnNsYXRlLCB0cmFuc2l0aW9uLCBzbGlkZSwgbG9vcCwgZ3JhYkN1cnNvciwgZXZlbnRzLCBldmVudHMkMSwgaXNHcmlkRW5hYmxlZCwgYnJlYWtwb2ludHMsIGNsYXNzZXMsIGNoZWNrT3ZlcmZsb3ckMSwgZGVmYXVsdHMsIHByb3RvdHlwZXMsIGV4dGVuZGVkRGVmYXVsdHMsIFN3aXBlcjtcbnZhciBpbml0X3N3aXBlcl9jb3JlID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL3N3aXBlci1jb3JlLm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gICAgZXZlbnRzRW1pdHRlciA9IHtcbiAgICAgIG9uKGV2ZW50czIsIGhhbmRsZXIsIHByaW9yaXR5KSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBzZWxmO1xuICAgICAgICBjb25zdCBtZXRob2QgPSBwcmlvcml0eSA/IFwidW5zaGlmdFwiIDogXCJwdXNoXCI7XG4gICAgICAgIGV2ZW50czIuc3BsaXQoXCIgXCIpLmZvckVhY2goKGV2ZW50MikgPT4ge1xuICAgICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnQyXSkgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnQyXSA9IFtdO1xuICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50Ml1bbWV0aG9kXShoYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSxcbiAgICAgIG9uY2UoZXZlbnRzMiwgaGFuZGxlciwgcHJpb3JpdHkpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHNlbGY7XG4gICAgICAgIGZ1bmN0aW9uIG9uY2VIYW5kbGVyKCkge1xuICAgICAgICAgIHNlbGYub2ZmKGV2ZW50czIsIG9uY2VIYW5kbGVyKTtcbiAgICAgICAgICBpZiAob25jZUhhbmRsZXIuX19lbWl0dGVyUHJveHkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvbmNlSGFuZGxlci5fX2VtaXR0ZXJQcm94eTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgICBoYW5kbGVyLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIG9uY2VIYW5kbGVyLl9fZW1pdHRlclByb3h5ID0gaGFuZGxlcjtcbiAgICAgICAgcmV0dXJuIHNlbGYub24oZXZlbnRzMiwgb25jZUhhbmRsZXIsIHByaW9yaXR5KTtcbiAgICAgIH0sXG4gICAgICBvbkFueShoYW5kbGVyLCBwcmlvcml0eSkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gc2VsZjtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gcHJpb3JpdHkgPyBcInVuc2hpZnRcIiA6IFwicHVzaFwiO1xuICAgICAgICBpZiAoc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMuaW5kZXhPZihoYW5kbGVyKSA8IDApIHtcbiAgICAgICAgICBzZWxmLmV2ZW50c0FueUxpc3RlbmVyc1ttZXRob2RdKGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSxcbiAgICAgIG9mZkFueShoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0FueUxpc3RlbmVycykgcmV0dXJuIHNlbGY7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMuaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICBzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSxcbiAgICAgIG9mZihldmVudHMyLCBoYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycykgcmV0dXJuIHNlbGY7XG4gICAgICAgIGV2ZW50czIuc3BsaXQoXCIgXCIpLmZvckVhY2goKGV2ZW50MikgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnQyXSA9IFtdO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnQyXSkge1xuICAgICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnQyXS5mb3JFYWNoKChldmVudEhhbmRsZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChldmVudEhhbmRsZXIgPT09IGhhbmRsZXIgfHwgZXZlbnRIYW5kbGVyLl9fZW1pdHRlclByb3h5ICYmIGV2ZW50SGFuZGxlci5fX2VtaXR0ZXJQcm94eSA9PT0gaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50Ml0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9LFxuICAgICAgZW1pdCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzKSByZXR1cm4gc2VsZjtcbiAgICAgICAgbGV0IGV2ZW50czI7XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICBsZXQgY29udGV4dDtcbiAgICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gXCJzdHJpbmdcIiB8fCBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICAgICAgZXZlbnRzMiA9IGFyZ3NbMF07XG4gICAgICAgICAgZGF0YSA9IGFyZ3Muc2xpY2UoMSwgYXJncy5sZW5ndGgpO1xuICAgICAgICAgIGNvbnRleHQgPSBzZWxmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZW50czIgPSBhcmdzWzBdLmV2ZW50cztcbiAgICAgICAgICBkYXRhID0gYXJnc1swXS5kYXRhO1xuICAgICAgICAgIGNvbnRleHQgPSBhcmdzWzBdLmNvbnRleHQgfHwgc2VsZjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLnVuc2hpZnQoY29udGV4dCk7XG4gICAgICAgIGNvbnN0IGV2ZW50c0FycmF5ID0gQXJyYXkuaXNBcnJheShldmVudHMyKSA/IGV2ZW50czIgOiBldmVudHMyLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgZXZlbnRzQXJyYXkuZm9yRWFjaCgoZXZlbnQyKSA9PiB7XG4gICAgICAgICAgaWYgKHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzICYmIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMuZm9yRWFjaCgoZXZlbnRIYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICAgIGV2ZW50SGFuZGxlci5hcHBseShjb250ZXh0LCBbZXZlbnQyLCAuLi5kYXRhXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlbGYuZXZlbnRzTGlzdGVuZXJzICYmIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50Ml0pIHtcbiAgICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50Ml0uZm9yRWFjaCgoZXZlbnRIYW5kbGVyKSA9PiB7XG4gICAgICAgICAgICAgIGV2ZW50SGFuZGxlci5hcHBseShjb250ZXh0LCBkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuICAgIH07XG4gICAgdG9nZ2xlU2xpZGVDbGFzc2VzJDEgPSAoc2xpZGVFbCwgY29uZGl0aW9uLCBjbGFzc05hbWUpID0+IHtcbiAgICAgIGlmIChjb25kaXRpb24gJiYgIXNsaWRlRWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgc2xpZGVFbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICB9IGVsc2UgaWYgKCFjb25kaXRpb24gJiYgc2xpZGVFbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgICAgICBzbGlkZUVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRvZ2dsZVNsaWRlQ2xhc3NlcyA9IChzbGlkZUVsLCBjb25kaXRpb24sIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgaWYgKGNvbmRpdGlvbiAmJiAhc2xpZGVFbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xuICAgICAgICBzbGlkZUVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoIWNvbmRpdGlvbiAmJiBzbGlkZUVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICAgIHNsaWRlRWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgcHJvY2Vzc0xhenlQcmVsb2FkZXIgPSAoc3dpcGVyLCBpbWFnZUVsKSA9PiB7XG4gICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIucGFyYW1zKSByZXR1cm47XG4gICAgICBjb25zdCBzbGlkZVNlbGVjdG9yID0gKCkgPT4gc3dpcGVyLmlzRWxlbWVudCA/IGBzd2lwZXItc2xpZGVgIDogYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31gO1xuICAgICAgY29uc3Qgc2xpZGVFbCA9IGltYWdlRWwuY2xvc2VzdChzbGlkZVNlbGVjdG9yKCkpO1xuICAgICAgaWYgKHNsaWRlRWwpIHtcbiAgICAgICAgbGV0IGxhenlFbCA9IHNsaWRlRWwucXVlcnlTZWxlY3RvcihgLiR7c3dpcGVyLnBhcmFtcy5sYXp5UHJlbG9hZGVyQ2xhc3N9YCk7XG4gICAgICAgIGlmICghbGF6eUVsICYmIHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICAgICAgICBpZiAoc2xpZGVFbC5zaGFkb3dSb290KSB7XG4gICAgICAgICAgICBsYXp5RWwgPSBzbGlkZUVsLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihgLiR7c3dpcGVyLnBhcmFtcy5sYXp5UHJlbG9hZGVyQ2xhc3N9YCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChzbGlkZUVsLnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgICAgICBsYXp5RWwgPSBzbGlkZUVsLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihgLiR7c3dpcGVyLnBhcmFtcy5sYXp5UHJlbG9hZGVyQ2xhc3N9YCk7XG4gICAgICAgICAgICAgICAgaWYgKGxhenlFbCkgbGF6eUVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhenlFbCkgbGF6eUVsLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgdW5sYXp5ID0gKHN3aXBlciwgaW5kZXgpID0+IHtcbiAgICAgIGlmICghc3dpcGVyLnNsaWRlc1tpbmRleF0pIHJldHVybjtcbiAgICAgIGNvbnN0IGltYWdlRWwgPSBzd2lwZXIuc2xpZGVzW2luZGV4XS5xdWVyeVNlbGVjdG9yKCdbbG9hZGluZz1cImxhenlcIl0nKTtcbiAgICAgIGlmIChpbWFnZUVsKSBpbWFnZUVsLnJlbW92ZUF0dHJpYnV0ZShcImxvYWRpbmdcIik7XG4gICAgfTtcbiAgICBwcmVsb2FkID0gKHN3aXBlcikgPT4ge1xuICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLnBhcmFtcykgcmV0dXJuO1xuICAgICAgbGV0IGFtb3VudCA9IHN3aXBlci5wYXJhbXMubGF6eVByZWxvYWRQcmV2TmV4dDtcbiAgICAgIGNvbnN0IGxlbiA9IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICAgICAgaWYgKCFsZW4gfHwgIWFtb3VudCB8fCBhbW91bnQgPCAwKSByZXR1cm47XG4gICAgICBhbW91bnQgPSBNYXRoLm1pbihhbW91bnQsIGxlbik7XG4gICAgICBjb25zdCBzbGlkZXNQZXJWaWV3ID0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBcImF1dG9cIiA/IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpIDogTWF0aC5jZWlsKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyk7XG4gICAgICBjb25zdCBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmdyaWQgJiYgc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3MgPiAxKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUNvbHVtbiA9IGFjdGl2ZUluZGV4O1xuICAgICAgICBjb25zdCBwcmVsb2FkQ29sdW1ucyA9IFthY3RpdmVDb2x1bW4gLSBhbW91bnRdO1xuICAgICAgICBwcmVsb2FkQ29sdW1ucy5wdXNoKC4uLkFycmF5LmZyb20oe1xuICAgICAgICAgIGxlbmd0aDogYW1vdW50XG4gICAgICAgIH0pLm1hcCgoXywgaSkgPT4ge1xuICAgICAgICAgIHJldHVybiBhY3RpdmVDb2x1bW4gKyBzbGlkZXNQZXJWaWV3ICsgaTtcbiAgICAgICAgfSkpO1xuICAgICAgICBzd2lwZXIuc2xpZGVzLmZvckVhY2goKHNsaWRlRWwsIGkpID0+IHtcbiAgICAgICAgICBpZiAocHJlbG9hZENvbHVtbnMuaW5jbHVkZXMoc2xpZGVFbC5jb2x1bW4pKSB1bmxhenkoc3dpcGVyLCBpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNsaWRlSW5kZXhMYXN0SW5WaWV3ID0gYWN0aXZlSW5kZXggKyBzbGlkZXNQZXJWaWV3IC0gMTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnJld2luZCB8fCBzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4IC0gYW1vdW50OyBpIDw9IHNsaWRlSW5kZXhMYXN0SW5WaWV3ICsgYW1vdW50OyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCByZWFsSW5kZXggPSAoaSAlIGxlbiArIGxlbikgJSBsZW47XG4gICAgICAgICAgaWYgKHJlYWxJbmRleCA8IGFjdGl2ZUluZGV4IHx8IHJlYWxJbmRleCA+IHNsaWRlSW5kZXhMYXN0SW5WaWV3KSB1bmxhenkoc3dpcGVyLCByZWFsSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gTWF0aC5tYXgoYWN0aXZlSW5kZXggLSBhbW91bnQsIDApOyBpIDw9IE1hdGgubWluKHNsaWRlSW5kZXhMYXN0SW5WaWV3ICsgYW1vdW50LCBsZW4gLSAxKTsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKGkgIT09IGFjdGl2ZUluZGV4ICYmIChpID4gc2xpZGVJbmRleExhc3RJblZpZXcgfHwgaSA8IGFjdGl2ZUluZGV4KSkge1xuICAgICAgICAgICAgdW5sYXp5KHN3aXBlciwgaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB1cGRhdGUgPSB7XG4gICAgICB1cGRhdGVTaXplLFxuICAgICAgdXBkYXRlU2xpZGVzLFxuICAgICAgdXBkYXRlQXV0b0hlaWdodCxcbiAgICAgIHVwZGF0ZVNsaWRlc09mZnNldCxcbiAgICAgIHVwZGF0ZVNsaWRlc1Byb2dyZXNzLFxuICAgICAgdXBkYXRlUHJvZ3Jlc3MsXG4gICAgICB1cGRhdGVTbGlkZXNDbGFzc2VzLFxuICAgICAgdXBkYXRlQWN0aXZlSW5kZXgsXG4gICAgICB1cGRhdGVDbGlja2VkU2xpZGVcbiAgICB9O1xuICAgIHRyYW5zbGF0ZSA9IHtcbiAgICAgIGdldFRyYW5zbGF0ZTogZ2V0U3dpcGVyVHJhbnNsYXRlLFxuICAgICAgc2V0VHJhbnNsYXRlLFxuICAgICAgbWluVHJhbnNsYXRlLFxuICAgICAgbWF4VHJhbnNsYXRlLFxuICAgICAgdHJhbnNsYXRlVG9cbiAgICB9O1xuICAgIHRyYW5zaXRpb24gPSB7XG4gICAgICBzZXRUcmFuc2l0aW9uLFxuICAgICAgdHJhbnNpdGlvblN0YXJ0LFxuICAgICAgdHJhbnNpdGlvbkVuZFxuICAgIH07XG4gICAgc2xpZGUgPSB7XG4gICAgICBzbGlkZVRvLFxuICAgICAgc2xpZGVUb0xvb3AsXG4gICAgICBzbGlkZU5leHQsXG4gICAgICBzbGlkZVByZXYsXG4gICAgICBzbGlkZVJlc2V0LFxuICAgICAgc2xpZGVUb0Nsb3Nlc3QsXG4gICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlXG4gICAgfTtcbiAgICBsb29wID0ge1xuICAgICAgbG9vcENyZWF0ZSxcbiAgICAgIGxvb3BGaXgsXG4gICAgICBsb29wRGVzdHJveVxuICAgIH07XG4gICAgZ3JhYkN1cnNvciA9IHtcbiAgICAgIHNldEdyYWJDdXJzb3IsXG4gICAgICB1bnNldEdyYWJDdXJzb3JcbiAgICB9O1xuICAgIGV2ZW50cyA9IChzd2lwZXIsIG1ldGhvZCkgPT4ge1xuICAgICAgY29uc3QgZG9jdW1lbnQyID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBlbCxcbiAgICAgICAgd3JhcHBlckVsLFxuICAgICAgICBkZXZpY2VcbiAgICAgIH0gPSBzd2lwZXI7XG4gICAgICBjb25zdCBjYXB0dXJlID0gISFwYXJhbXMubmVzdGVkO1xuICAgICAgY29uc3QgZG9tTWV0aG9kID0gbWV0aG9kID09PSBcIm9uXCIgPyBcImFkZEV2ZW50TGlzdGVuZXJcIiA6IFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiO1xuICAgICAgY29uc3Qgc3dpcGVyTWV0aG9kID0gbWV0aG9kO1xuICAgICAgaWYgKCFlbCB8fCB0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpIHJldHVybjtcbiAgICAgIGRvY3VtZW50Mltkb21NZXRob2RdKFwidG91Y2hzdGFydFwiLCBzd2lwZXIub25Eb2N1bWVudFRvdWNoU3RhcnQsIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICAgIGNhcHR1cmVcbiAgICAgIH0pO1xuICAgICAgZWxbZG9tTWV0aG9kXShcInRvdWNoc3RhcnRcIiwgc3dpcGVyLm9uVG91Y2hTdGFydCwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICBlbFtkb21NZXRob2RdKFwicG9pbnRlcmRvd25cIiwgc3dpcGVyLm9uVG91Y2hTdGFydCwge1xuICAgICAgICBwYXNzaXZlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICBkb2N1bWVudDJbZG9tTWV0aG9kXShcInRvdWNobW92ZVwiLCBzd2lwZXIub25Ub3VjaE1vdmUsIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICAgIGNhcHR1cmVcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQyW2RvbU1ldGhvZF0oXCJwb2ludGVybW92ZVwiLCBzd2lwZXIub25Ub3VjaE1vdmUsIHtcbiAgICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICAgIGNhcHR1cmVcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQyW2RvbU1ldGhvZF0oXCJ0b3VjaGVuZFwiLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgICAgICBwYXNzaXZlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50Mltkb21NZXRob2RdKFwicG9pbnRlcnVwXCIsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgICAgIHBhc3NpdmU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQyW2RvbU1ldGhvZF0oXCJwb2ludGVyY2FuY2VsXCIsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgICAgIHBhc3NpdmU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQyW2RvbU1ldGhvZF0oXCJ0b3VjaGNhbmNlbFwiLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgICAgICBwYXNzaXZlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50Mltkb21NZXRob2RdKFwicG9pbnRlcm91dFwiLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgICAgICBwYXNzaXZlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGRvY3VtZW50Mltkb21NZXRob2RdKFwicG9pbnRlcmxlYXZlXCIsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgICAgIHBhc3NpdmU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgZG9jdW1lbnQyW2RvbU1ldGhvZF0oXCJjb250ZXh0bWVudVwiLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgICAgICBwYXNzaXZlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGlmIChwYXJhbXMucHJldmVudENsaWNrcyB8fCBwYXJhbXMucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uKSB7XG4gICAgICAgIGVsW2RvbU1ldGhvZF0oXCJjbGlja1wiLCBzd2lwZXIub25DbGljaywgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgd3JhcHBlckVsW2RvbU1ldGhvZF0oXCJzY3JvbGxcIiwgc3dpcGVyLm9uU2Nyb2xsKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMudXBkYXRlT25XaW5kb3dSZXNpemUpIHtcbiAgICAgICAgc3dpcGVyW3N3aXBlck1ldGhvZF0oZGV2aWNlLmlvcyB8fCBkZXZpY2UuYW5kcm9pZCA/IFwicmVzaXplIG9yaWVudGF0aW9uY2hhbmdlIG9ic2VydmVyVXBkYXRlXCIgOiBcInJlc2l6ZSBvYnNlcnZlclVwZGF0ZVwiLCBvblJlc2l6ZSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXJbc3dpcGVyTWV0aG9kXShcIm9ic2VydmVyVXBkYXRlXCIsIG9uUmVzaXplLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsW2RvbU1ldGhvZF0oXCJsb2FkXCIsIHN3aXBlci5vbkxvYWQsIHtcbiAgICAgICAgY2FwdHVyZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfTtcbiAgICBldmVudHMkMSA9IHtcbiAgICAgIGF0dGFjaEV2ZW50cyxcbiAgICAgIGRldGFjaEV2ZW50c1xuICAgIH07XG4gICAgaXNHcmlkRW5hYmxlZCA9IChzd2lwZXIsIHBhcmFtcykgPT4ge1xuICAgICAgcmV0dXJuIHN3aXBlci5ncmlkICYmIHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuICAgIH07XG4gICAgYnJlYWtwb2ludHMgPSB7XG4gICAgICBzZXRCcmVha3BvaW50LFxuICAgICAgZ2V0QnJlYWtwb2ludFxuICAgIH07XG4gICAgY2xhc3NlcyA9IHtcbiAgICAgIGFkZENsYXNzZXMsXG4gICAgICByZW1vdmVDbGFzc2VzXG4gICAgfTtcbiAgICBjaGVja092ZXJmbG93JDEgPSB7XG4gICAgICBjaGVja092ZXJmbG93XG4gICAgfTtcbiAgICBkZWZhdWx0cyA9IHtcbiAgICAgIGluaXQ6IHRydWUsXG4gICAgICBkaXJlY3Rpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgb25lV2F5TW92ZW1lbnQ6IGZhbHNlLFxuICAgICAgc3dpcGVyRWxlbWVudE5vZGVOYW1lOiBcIlNXSVBFUi1DT05UQUlORVJcIixcbiAgICAgIHRvdWNoRXZlbnRzVGFyZ2V0OiBcIndyYXBwZXJcIixcbiAgICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICAgIHNwZWVkOiAzMDAsXG4gICAgICBjc3NNb2RlOiBmYWxzZSxcbiAgICAgIHVwZGF0ZU9uV2luZG93UmVzaXplOiB0cnVlLFxuICAgICAgcmVzaXplT2JzZXJ2ZXI6IHRydWUsXG4gICAgICBuZXN0ZWQ6IGZhbHNlLFxuICAgICAgY3JlYXRlRWxlbWVudHM6IGZhbHNlLFxuICAgICAgZXZlbnRzUHJlZml4OiBcInN3aXBlclwiLFxuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIGZvY3VzYWJsZUVsZW1lbnRzOiBcImlucHV0LCBzZWxlY3QsIG9wdGlvbiwgdGV4dGFyZWEsIGJ1dHRvbiwgdmlkZW8sIGxhYmVsXCIsXG4gICAgICAvLyBPdmVycmlkZXNcbiAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgLy9cbiAgICAgIHByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbjogZmFsc2UsXG4gICAgICAvLyBzc3JcbiAgICAgIHVzZXJBZ2VudDogbnVsbCxcbiAgICAgIHVybDogbnVsbCxcbiAgICAgIC8vIFRvIHN1cHBvcnQgaU9TJ3Mgc3dpcGUtdG8tZ28tYmFjayBnZXN0dXJlICh3aGVuIGJlaW5nIHVzZWQgaW4tYXBwKS5cbiAgICAgIGVkZ2VTd2lwZURldGVjdGlvbjogZmFsc2UsXG4gICAgICBlZGdlU3dpcGVUaHJlc2hvbGQ6IDIwLFxuICAgICAgLy8gQXV0b2hlaWdodFxuICAgICAgYXV0b0hlaWdodDogZmFsc2UsXG4gICAgICAvLyBTZXQgd3JhcHBlciB3aWR0aFxuICAgICAgc2V0V3JhcHBlclNpemU6IGZhbHNlLFxuICAgICAgLy8gVmlydHVhbCBUcmFuc2xhdGVcbiAgICAgIHZpcnR1YWxUcmFuc2xhdGU6IGZhbHNlLFxuICAgICAgLy8gRWZmZWN0c1xuICAgICAgZWZmZWN0OiBcInNsaWRlXCIsXG4gICAgICAvLyAnc2xpZGUnIG9yICdmYWRlJyBvciAnY3ViZScgb3IgJ2NvdmVyZmxvdycgb3IgJ2ZsaXAnXG4gICAgICAvLyBCcmVha3BvaW50c1xuICAgICAgYnJlYWtwb2ludHM6IHZvaWQgMCxcbiAgICAgIGJyZWFrcG9pbnRzQmFzZTogXCJ3aW5kb3dcIixcbiAgICAgIC8vIFNsaWRlcyBncmlkXG4gICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICBzbGlkZXNQZXJHcm91cFNraXA6IDAsXG4gICAgICBzbGlkZXNQZXJHcm91cEF1dG86IGZhbHNlLFxuICAgICAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxuICAgICAgY2VudGVyZWRTbGlkZXNCb3VuZHM6IGZhbHNlLFxuICAgICAgc2xpZGVzT2Zmc2V0QmVmb3JlOiAwLFxuICAgICAgLy8gaW4gcHhcbiAgICAgIHNsaWRlc09mZnNldEFmdGVyOiAwLFxuICAgICAgLy8gaW4gcHhcbiAgICAgIG5vcm1hbGl6ZVNsaWRlSW5kZXg6IHRydWUsXG4gICAgICBjZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXM6IGZhbHNlLFxuICAgICAgLy8gRGlzYWJsZSBzd2lwZXIgYW5kIGhpZGUgbmF2aWdhdGlvbiB3aGVuIGNvbnRhaW5lciBub3Qgb3ZlcmZsb3dcbiAgICAgIHdhdGNoT3ZlcmZsb3c6IHRydWUsXG4gICAgICAvLyBSb3VuZCBsZW5ndGhcbiAgICAgIHJvdW5kTGVuZ3RoczogZmFsc2UsXG4gICAgICAvLyBUb3VjaGVzXG4gICAgICB0b3VjaFJhdGlvOiAxLFxuICAgICAgdG91Y2hBbmdsZTogNDUsXG4gICAgICBzaW11bGF0ZVRvdWNoOiB0cnVlLFxuICAgICAgc2hvcnRTd2lwZXM6IHRydWUsXG4gICAgICBsb25nU3dpcGVzOiB0cnVlLFxuICAgICAgbG9uZ1N3aXBlc1JhdGlvOiAwLjUsXG4gICAgICBsb25nU3dpcGVzTXM6IDMwMCxcbiAgICAgIGZvbGxvd0ZpbmdlcjogdHJ1ZSxcbiAgICAgIGFsbG93VG91Y2hNb3ZlOiB0cnVlLFxuICAgICAgdGhyZXNob2xkOiA1LFxuICAgICAgdG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uOiBmYWxzZSxcbiAgICAgIHRvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdDogdHJ1ZSxcbiAgICAgIHRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0OiBmYWxzZSxcbiAgICAgIHRvdWNoUmVsZWFzZU9uRWRnZXM6IGZhbHNlLFxuICAgICAgLy8gVW5pcXVlIE5hdmlnYXRpb24gRWxlbWVudHNcbiAgICAgIHVuaXF1ZU5hdkVsZW1lbnRzOiB0cnVlLFxuICAgICAgLy8gUmVzaXN0YW5jZVxuICAgICAgcmVzaXN0YW5jZTogdHJ1ZSxcbiAgICAgIHJlc2lzdGFuY2VSYXRpbzogMC44NSxcbiAgICAgIC8vIFByb2dyZXNzXG4gICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiBmYWxzZSxcbiAgICAgIC8vIEN1cnNvclxuICAgICAgZ3JhYkN1cnNvcjogZmFsc2UsXG4gICAgICAvLyBDbGlja3NcbiAgICAgIHByZXZlbnRDbGlja3M6IHRydWUsXG4gICAgICBwcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb246IHRydWUsXG4gICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBmYWxzZSxcbiAgICAgIC8vIGxvb3BcbiAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgbG9vcEFkZEJsYW5rU2xpZGVzOiB0cnVlLFxuICAgICAgbG9vcEFkZGl0aW9uYWxTbGlkZXM6IDAsXG4gICAgICBsb29wUHJldmVudHNTbGlkaW5nOiB0cnVlLFxuICAgICAgLy8gcmV3aW5kXG4gICAgICByZXdpbmQ6IGZhbHNlLFxuICAgICAgLy8gU3dpcGluZy9ubyBzd2lwaW5nXG4gICAgICBhbGxvd1NsaWRlUHJldjogdHJ1ZSxcbiAgICAgIGFsbG93U2xpZGVOZXh0OiB0cnVlLFxuICAgICAgc3dpcGVIYW5kbGVyOiBudWxsLFxuICAgICAgLy8gJy5zd2lwZS1oYW5kbGVyJyxcbiAgICAgIG5vU3dpcGluZzogdHJ1ZSxcbiAgICAgIG5vU3dpcGluZ0NsYXNzOiBcInN3aXBlci1uby1zd2lwaW5nXCIsXG4gICAgICBub1N3aXBpbmdTZWxlY3RvcjogbnVsbCxcbiAgICAgIC8vIFBhc3NpdmUgTGlzdGVuZXJzXG4gICAgICBwYXNzaXZlTGlzdGVuZXJzOiB0cnVlLFxuICAgICAgbWF4QmFja2ZhY2VIaWRkZW5TbGlkZXM6IDEwLFxuICAgICAgLy8gTlNcbiAgICAgIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6IFwic3dpcGVyLVwiLFxuICAgICAgLy8gTkVXXG4gICAgICBzbGlkZUNsYXNzOiBcInN3aXBlci1zbGlkZVwiLFxuICAgICAgc2xpZGVCbGFua0NsYXNzOiBcInN3aXBlci1zbGlkZS1ibGFua1wiLFxuICAgICAgc2xpZGVBY3RpdmVDbGFzczogXCJzd2lwZXItc2xpZGUtYWN0aXZlXCIsXG4gICAgICBzbGlkZVZpc2libGVDbGFzczogXCJzd2lwZXItc2xpZGUtdmlzaWJsZVwiLFxuICAgICAgc2xpZGVGdWxseVZpc2libGVDbGFzczogXCJzd2lwZXItc2xpZGUtZnVsbHktdmlzaWJsZVwiLFxuICAgICAgc2xpZGVOZXh0Q2xhc3M6IFwic3dpcGVyLXNsaWRlLW5leHRcIixcbiAgICAgIHNsaWRlUHJldkNsYXNzOiBcInN3aXBlci1zbGlkZS1wcmV2XCIsXG4gICAgICB3cmFwcGVyQ2xhc3M6IFwic3dpcGVyLXdyYXBwZXJcIixcbiAgICAgIGxhenlQcmVsb2FkZXJDbGFzczogXCJzd2lwZXItbGF6eS1wcmVsb2FkZXJcIixcbiAgICAgIGxhenlQcmVsb2FkUHJldk5leHQ6IDAsXG4gICAgICAvLyBDYWxsYmFja3NcbiAgICAgIHJ1bkNhbGxiYWNrc09uSW5pdDogdHJ1ZSxcbiAgICAgIC8vIEludGVybmFsc1xuICAgICAgX2VtaXRDbGFzc2VzOiBmYWxzZVxuICAgIH07XG4gICAgcHJvdG90eXBlcyA9IHtcbiAgICAgIGV2ZW50c0VtaXR0ZXIsXG4gICAgICB1cGRhdGUsXG4gICAgICB0cmFuc2xhdGUsXG4gICAgICB0cmFuc2l0aW9uLFxuICAgICAgc2xpZGUsXG4gICAgICBsb29wLFxuICAgICAgZ3JhYkN1cnNvcixcbiAgICAgIGV2ZW50czogZXZlbnRzJDEsXG4gICAgICBicmVha3BvaW50cyxcbiAgICAgIGNoZWNrT3ZlcmZsb3c6IGNoZWNrT3ZlcmZsb3ckMSxcbiAgICAgIGNsYXNzZXNcbiAgICB9O1xuICAgIGV4dGVuZGVkRGVmYXVsdHMgPSB7fTtcbiAgICBTd2lwZXIgPSBjbGFzcyBfU3dpcGVyIHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBsZXQgZWw7XG4gICAgICAgIGxldCBwYXJhbXM7XG4gICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGFyZ3NbMF0uY29uc3RydWN0b3IgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3NbMF0pLnNsaWNlKDgsIC0xKSA9PT0gXCJPYmplY3RcIikge1xuICAgICAgICAgIHBhcmFtcyA9IGFyZ3NbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgW2VsLCBwYXJhbXNdID0gYXJncztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXBhcmFtcykgcGFyYW1zID0ge307XG4gICAgICAgIHBhcmFtcyA9IGV4dGVuZDIoe30sIHBhcmFtcyk7XG4gICAgICAgIGlmIChlbCAmJiAhcGFyYW1zLmVsKSBwYXJhbXMuZWwgPSBlbDtcbiAgICAgICAgY29uc3QgZG9jdW1lbnQyID0gZ2V0RG9jdW1lbnQoKTtcbiAgICAgICAgaWYgKHBhcmFtcy5lbCAmJiB0eXBlb2YgcGFyYW1zLmVsID09PSBcInN0cmluZ1wiICYmIGRvY3VtZW50Mi5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtcy5lbCkubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGNvbnN0IHN3aXBlcnMgPSBbXTtcbiAgICAgICAgICBkb2N1bWVudDIucXVlcnlTZWxlY3RvckFsbChwYXJhbXMuZWwpLmZvckVhY2goKGNvbnRhaW5lckVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdQYXJhbXMgPSBleHRlbmQyKHt9LCBwYXJhbXMsIHtcbiAgICAgICAgICAgICAgZWw6IGNvbnRhaW5lckVsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN3aXBlcnMucHVzaChuZXcgX1N3aXBlcihuZXdQYXJhbXMpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gc3dpcGVycztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBzd2lwZXIuX19zd2lwZXJfXyA9IHRydWU7XG4gICAgICAgIHN3aXBlci5zdXBwb3J0ID0gZ2V0U3VwcG9ydCgpO1xuICAgICAgICBzd2lwZXIuZGV2aWNlID0gZ2V0RGV2aWNlKHtcbiAgICAgICAgICB1c2VyQWdlbnQ6IHBhcmFtcy51c2VyQWdlbnRcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5icm93c2VyID0gZ2V0QnJvd3NlcigpO1xuICAgICAgICBzd2lwZXIuZXZlbnRzTGlzdGVuZXJzID0ge307XG4gICAgICAgIHN3aXBlci5ldmVudHNBbnlMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgc3dpcGVyLm1vZHVsZXMgPSBbLi4uc3dpcGVyLl9fbW9kdWxlc19fXTtcbiAgICAgICAgaWYgKHBhcmFtcy5tb2R1bGVzICYmIEFycmF5LmlzQXJyYXkocGFyYW1zLm1vZHVsZXMpKSB7XG4gICAgICAgICAgc3dpcGVyLm1vZHVsZXMucHVzaCguLi5wYXJhbXMubW9kdWxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWxsTW9kdWxlc1BhcmFtcyA9IHt9O1xuICAgICAgICBzd2lwZXIubW9kdWxlcy5mb3JFYWNoKChtb2QpID0+IHtcbiAgICAgICAgICBtb2Qoe1xuICAgICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICAgc3dpcGVyLFxuICAgICAgICAgICAgZXh0ZW5kUGFyYW1zOiBtb2R1bGVFeHRlbmRQYXJhbXMocGFyYW1zLCBhbGxNb2R1bGVzUGFyYW1zKSxcbiAgICAgICAgICAgIG9uOiBzd2lwZXIub24uYmluZChzd2lwZXIpLFxuICAgICAgICAgICAgb25jZTogc3dpcGVyLm9uY2UuYmluZChzd2lwZXIpLFxuICAgICAgICAgICAgb2ZmOiBzd2lwZXIub2ZmLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICAgIGVtaXQ6IHN3aXBlci5lbWl0LmJpbmQoc3dpcGVyKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgc3dpcGVyUGFyYW1zID0gZXh0ZW5kMih7fSwgZGVmYXVsdHMsIGFsbE1vZHVsZXNQYXJhbXMpO1xuICAgICAgICBzd2lwZXIucGFyYW1zID0gZXh0ZW5kMih7fSwgc3dpcGVyUGFyYW1zLCBleHRlbmRlZERlZmF1bHRzLCBwYXJhbXMpO1xuICAgICAgICBzd2lwZXIub3JpZ2luYWxQYXJhbXMgPSBleHRlbmQyKHt9LCBzd2lwZXIucGFyYW1zKTtcbiAgICAgICAgc3dpcGVyLnBhc3NlZFBhcmFtcyA9IGV4dGVuZDIoe30sIHBhcmFtcyk7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zICYmIHN3aXBlci5wYXJhbXMub24pIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhzd2lwZXIucGFyYW1zLm9uKS5mb3JFYWNoKChldmVudE5hbWUpID0+IHtcbiAgICAgICAgICAgIHN3aXBlci5vbihldmVudE5hbWUsIHN3aXBlci5wYXJhbXMub25bZXZlbnROYW1lXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMgJiYgc3dpcGVyLnBhcmFtcy5vbkFueSkge1xuICAgICAgICAgIHN3aXBlci5vbkFueShzd2lwZXIucGFyYW1zLm9uQW55KTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgICAgICAgIGVuYWJsZWQ6IHN3aXBlci5wYXJhbXMuZW5hYmxlZCxcbiAgICAgICAgICBlbCxcbiAgICAgICAgICAvLyBDbGFzc2VzXG4gICAgICAgICAgY2xhc3NOYW1lczogW10sXG4gICAgICAgICAgLy8gU2xpZGVzXG4gICAgICAgICAgc2xpZGVzOiBbXSxcbiAgICAgICAgICBzbGlkZXNHcmlkOiBbXSxcbiAgICAgICAgICBzbmFwR3JpZDogW10sXG4gICAgICAgICAgc2xpZGVzU2l6ZXNHcmlkOiBbXSxcbiAgICAgICAgICAvLyBpc0RpcmVjdGlvblxuICAgICAgICAgIGlzSG9yaXpvbnRhbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCI7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBpc1ZlcnRpY2FsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCI7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyBJbmRleGVzXG4gICAgICAgICAgYWN0aXZlSW5kZXg6IDAsXG4gICAgICAgICAgcmVhbEluZGV4OiAwLFxuICAgICAgICAgIC8vXG4gICAgICAgICAgaXNCZWdpbm5pbmc6IHRydWUsXG4gICAgICAgICAgaXNFbmQ6IGZhbHNlLFxuICAgICAgICAgIC8vIFByb3BzXG4gICAgICAgICAgdHJhbnNsYXRlOiAwLFxuICAgICAgICAgIHByZXZpb3VzVHJhbnNsYXRlOiAwLFxuICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgIHZlbG9jaXR5OiAwLFxuICAgICAgICAgIGFuaW1hdGluZzogZmFsc2UsXG4gICAgICAgICAgY3NzT3ZlcmZsb3dBZGp1c3RtZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgudHJ1bmModGhpcy50cmFuc2xhdGUgLyAyICoqIDIzKSAqIDIgKiogMjM7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyBMb2Nrc1xuICAgICAgICAgIGFsbG93U2xpZGVOZXh0OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVOZXh0LFxuICAgICAgICAgIGFsbG93U2xpZGVQcmV2OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVQcmV2LFxuICAgICAgICAgIC8vIFRvdWNoIEV2ZW50c1xuICAgICAgICAgIHRvdWNoRXZlbnRzRGF0YToge1xuICAgICAgICAgICAgaXNUb3VjaGVkOiB2b2lkIDAsXG4gICAgICAgICAgICBpc01vdmVkOiB2b2lkIDAsXG4gICAgICAgICAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzOiB2b2lkIDAsXG4gICAgICAgICAgICB0b3VjaFN0YXJ0VGltZTogdm9pZCAwLFxuICAgICAgICAgICAgaXNTY3JvbGxpbmc6IHZvaWQgMCxcbiAgICAgICAgICAgIGN1cnJlbnRUcmFuc2xhdGU6IHZvaWQgMCxcbiAgICAgICAgICAgIHN0YXJ0VHJhbnNsYXRlOiB2b2lkIDAsXG4gICAgICAgICAgICBhbGxvd1RocmVzaG9sZE1vdmU6IHZvaWQgMCxcbiAgICAgICAgICAgIC8vIEZvcm0gZWxlbWVudHMgdG8gbWF0Y2hcbiAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzOiBzd2lwZXIucGFyYW1zLmZvY3VzYWJsZUVsZW1lbnRzLFxuICAgICAgICAgICAgLy8gTGFzdCBjbGljayB0aW1lXG4gICAgICAgICAgICBsYXN0Q2xpY2tUaW1lOiAwLFxuICAgICAgICAgICAgY2xpY2tUaW1lb3V0OiB2b2lkIDAsXG4gICAgICAgICAgICAvLyBWZWxvY2l0aWVzXG4gICAgICAgICAgICB2ZWxvY2l0aWVzOiBbXSxcbiAgICAgICAgICAgIGFsbG93TW9tZW50dW1Cb3VuY2U6IHZvaWQgMCxcbiAgICAgICAgICAgIHN0YXJ0TW92aW5nOiB2b2lkIDAsXG4gICAgICAgICAgICBwb2ludGVySWQ6IG51bGwsXG4gICAgICAgICAgICB0b3VjaElkOiBudWxsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyBDbGlja3NcbiAgICAgICAgICBhbGxvd0NsaWNrOiB0cnVlLFxuICAgICAgICAgIC8vIFRvdWNoZXNcbiAgICAgICAgICBhbGxvd1RvdWNoTW92ZTogc3dpcGVyLnBhcmFtcy5hbGxvd1RvdWNoTW92ZSxcbiAgICAgICAgICB0b3VjaGVzOiB7XG4gICAgICAgICAgICBzdGFydFg6IDAsXG4gICAgICAgICAgICBzdGFydFk6IDAsXG4gICAgICAgICAgICBjdXJyZW50WDogMCxcbiAgICAgICAgICAgIGN1cnJlbnRZOiAwLFxuICAgICAgICAgICAgZGlmZjogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8gSW1hZ2VzXG4gICAgICAgICAgaW1hZ2VzVG9Mb2FkOiBbXSxcbiAgICAgICAgICBpbWFnZXNMb2FkZWQ6IDBcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci5lbWl0KFwiX3N3aXBlclwiKTtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaW5pdCkge1xuICAgICAgICAgIHN3aXBlci5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN3aXBlcjtcbiAgICAgIH1cbiAgICAgIGdldERpcmVjdGlvbkxhYmVsKHByb3BlcnR5KSB7XG4gICAgICAgIGlmICh0aGlzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BlcnR5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgXCJ3aWR0aFwiOiBcImhlaWdodFwiLFxuICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIm1hcmdpbi1sZWZ0XCIsXG4gICAgICAgICAgXCJtYXJnaW4tYm90dG9tIFwiOiBcIm1hcmdpbi1yaWdodFwiLFxuICAgICAgICAgIFwibWFyZ2luLWxlZnRcIjogXCJtYXJnaW4tdG9wXCIsXG4gICAgICAgICAgXCJtYXJnaW4tcmlnaHRcIjogXCJtYXJnaW4tYm90dG9tXCIsXG4gICAgICAgICAgXCJwYWRkaW5nLWxlZnRcIjogXCJwYWRkaW5nLXRvcFwiLFxuICAgICAgICAgIFwicGFkZGluZy1yaWdodFwiOiBcInBhZGRpbmctYm90dG9tXCIsXG4gICAgICAgICAgXCJtYXJnaW5SaWdodFwiOiBcIm1hcmdpbkJvdHRvbVwiXG4gICAgICAgIH1bcHJvcGVydHldO1xuICAgICAgfVxuICAgICAgZ2V0U2xpZGVJbmRleChzbGlkZUVsKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzbGlkZXNFbCxcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHNsaWRlcyA9IGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCk7XG4gICAgICAgIGNvbnN0IGZpcnN0U2xpZGVJbmRleCA9IGVsZW1lbnRJbmRleChzbGlkZXNbMF0pO1xuICAgICAgICByZXR1cm4gZWxlbWVudEluZGV4KHNsaWRlRWwpIC0gZmlyc3RTbGlkZUluZGV4O1xuICAgICAgfVxuICAgICAgZ2V0U2xpZGVJbmRleEJ5RGF0YShpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTbGlkZUluZGV4KHRoaXMuc2xpZGVzLmZpbHRlcigoc2xpZGVFbCkgPT4gc2xpZGVFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKSAqIDEgPT09IGluZGV4KVswXSk7XG4gICAgICB9XG4gICAgICByZWNhbGNTbGlkZXMoKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzbGlkZXNFbCxcbiAgICAgICAgICBwYXJhbXNcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgc3dpcGVyLnNsaWRlcyA9IGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCk7XG4gICAgICB9XG4gICAgICBlbmFibGUoKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcigpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXBlci5lbWl0KFwiZW5hYmxlXCIpO1xuICAgICAgfVxuICAgICAgZGlzYWJsZSgpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgICAgICBzd2lwZXIuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICAgICAgc3dpcGVyLnVuc2V0R3JhYkN1cnNvcigpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXBlci5lbWl0KFwiZGlzYWJsZVwiKTtcbiAgICAgIH1cbiAgICAgIHNldFByb2dyZXNzKHByb2dyZXNzLCBzcGVlZCkge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBwcm9ncmVzcyA9IE1hdGgubWluKE1hdGgubWF4KHByb2dyZXNzLCAwKSwgMSk7XG4gICAgICAgIGNvbnN0IG1pbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgY29uc3QgbWF4ID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gKG1heCAtIG1pbikgKiBwcm9ncmVzcyArIG1pbjtcbiAgICAgICAgc3dpcGVyLnRyYW5zbGF0ZVRvKGN1cnJlbnQsIHR5cGVvZiBzcGVlZCA9PT0gXCJ1bmRlZmluZWRcIiA/IDAgOiBzcGVlZCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgfVxuICAgICAgZW1pdENvbnRhaW5lckNsYXNzZXMoKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5fZW1pdENsYXNzZXMgfHwgIXN3aXBlci5lbCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBjbHMgPSBzd2lwZXIuZWwuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKS5maWx0ZXIoKGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBjbGFzc05hbWUuaW5kZXhPZihcInN3aXBlclwiKSA9PT0gMCB8fCBjbGFzc05hbWUuaW5kZXhPZihzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MpID09PSAwO1xuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLmVtaXQoXCJfY29udGFpbmVyQ2xhc3Nlc1wiLCBjbHMuam9pbihcIiBcIikpO1xuICAgICAgfVxuICAgICAgZ2V0U2xpZGVDbGFzc2VzKHNsaWRlRWwpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5kZXN0cm95ZWQpIHJldHVybiBcIlwiO1xuICAgICAgICByZXR1cm4gc2xpZGVFbC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpLmZpbHRlcigoY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZS5pbmRleE9mKFwic3dpcGVyLXNsaWRlXCIpID09PSAwIHx8IGNsYXNzTmFtZS5pbmRleE9mKHN3aXBlci5wYXJhbXMuc2xpZGVDbGFzcykgPT09IDA7XG4gICAgICAgIH0pLmpvaW4oXCIgXCIpO1xuICAgICAgfVxuICAgICAgZW1pdFNsaWRlc0NsYXNzZXMoKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5fZW1pdENsYXNzZXMgfHwgIXN3aXBlci5lbCkgcmV0dXJuO1xuICAgICAgICBjb25zdCB1cGRhdGVzID0gW107XG4gICAgICAgIHN3aXBlci5zbGlkZXMuZm9yRWFjaCgoc2xpZGVFbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBzd2lwZXIuZ2V0U2xpZGVDbGFzc2VzKHNsaWRlRWwpO1xuICAgICAgICAgIHVwZGF0ZXMucHVzaCh7XG4gICAgICAgICAgICBzbGlkZUVsLFxuICAgICAgICAgICAgY2xhc3NOYW1lc1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHN3aXBlci5lbWl0KFwiX3NsaWRlQ2xhc3NcIiwgc2xpZGVFbCwgY2xhc3NOYW1lcyk7XG4gICAgICAgIH0pO1xuICAgICAgICBzd2lwZXIuZW1pdChcIl9zbGlkZUNsYXNzZXNcIiwgdXBkYXRlcyk7XG4gICAgICB9XG4gICAgICBzbGlkZXNQZXJWaWV3RHluYW1pYyh2aWV3LCBleGFjdCkge1xuICAgICAgICBpZiAodmlldyA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgdmlldyA9IFwiY3VycmVudFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleGFjdCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgZXhhY3QgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgIHNsaWRlcyxcbiAgICAgICAgICBzbGlkZXNHcmlkLFxuICAgICAgICAgIHNsaWRlc1NpemVzR3JpZCxcbiAgICAgICAgICBzaXplOiBzd2lwZXJTaXplLFxuICAgICAgICAgIGFjdGl2ZUluZGV4XG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGxldCBzcHYgPSAxO1xuICAgICAgICBpZiAodHlwZW9mIHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBcIm51bWJlclwiKSByZXR1cm4gcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICBsZXQgc2xpZGVTaXplID0gc2xpZGVzW2FjdGl2ZUluZGV4XSA/IE1hdGguY2VpbChzbGlkZXNbYWN0aXZlSW5kZXhdLnN3aXBlclNsaWRlU2l6ZSkgOiAwO1xuICAgICAgICAgIGxldCBicmVha0xvb3A7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4ICsgMTsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSAmJiAhYnJlYWtMb29wKSB7XG4gICAgICAgICAgICAgIHNsaWRlU2l6ZSArPSBNYXRoLmNlaWwoc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZSk7XG4gICAgICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgICAgICBpZiAoc2xpZGVTaXplID4gc3dpcGVyU2l6ZSkgYnJlYWtMb29wID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4IC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgICAgIGlmIChzbGlkZXNbaV0gJiYgIWJyZWFrTG9vcCkge1xuICAgICAgICAgICAgICBzbGlkZVNpemUgKz0gc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZTtcbiAgICAgICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgICAgICAgIGlmIChzbGlkZVNpemUgPiBzd2lwZXJTaXplKSBicmVha0xvb3AgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmlldyA9PT0gXCJjdXJyZW50XCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCArIDE7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2xpZGVJblZpZXcgPSBleGFjdCA/IHNsaWRlc0dyaWRbaV0gKyBzbGlkZXNTaXplc0dyaWRbaV0gLSBzbGlkZXNHcmlkW2FjdGl2ZUluZGV4XSA8IHN3aXBlclNpemUgOiBzbGlkZXNHcmlkW2ldIC0gc2xpZGVzR3JpZFthY3RpdmVJbmRleF0gPCBzd2lwZXJTaXplO1xuICAgICAgICAgICAgICBpZiAoc2xpZGVJblZpZXcpIHtcbiAgICAgICAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAgICAgICBjb25zdCBzbGlkZUluVmlldyA9IHNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdIC0gc2xpZGVzR3JpZFtpXSA8IHN3aXBlclNpemU7XG4gICAgICAgICAgICAgIGlmIChzbGlkZUluVmlldykge1xuICAgICAgICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcHY7XG4gICAgICB9XG4gICAgICB1cGRhdGUoKSB7XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHNuYXBHcmlkLFxuICAgICAgICAgIHBhcmFtc1xuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBpZiAocGFyYW1zLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgc3dpcGVyLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgICAgfVxuICAgICAgICBbLi4uc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tsb2FkaW5nPVwibGF6eVwiXScpXS5mb3JFYWNoKChpbWFnZUVsKSA9PiB7XG4gICAgICAgICAgaWYgKGltYWdlRWwuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3NMYXp5UHJlbG9hZGVyKHN3aXBlciwgaW1hZ2VFbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgICAgZnVuY3Rpb24gc2V0VHJhbnNsYXRlMigpIHtcbiAgICAgICAgICBjb25zdCB0cmFuc2xhdGVWYWx1ZSA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlICogLTEgOiBzd2lwZXIudHJhbnNsYXRlO1xuICAgICAgICAgIGNvbnN0IG5ld1RyYW5zbGF0ZSA9IE1hdGgubWluKE1hdGgubWF4KHRyYW5zbGF0ZVZhbHVlLCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpLCBzd2lwZXIubWluVHJhbnNsYXRlKCkpO1xuICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3VHJhbnNsYXRlKTtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0cmFuc2xhdGVkO1xuICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmICFwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgIHNldFRyYW5zbGF0ZTIoKTtcbiAgICAgICAgICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICgocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IFwiYXV0b1wiIHx8IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkgJiYgc3dpcGVyLmlzRW5kICYmICFwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlcyA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMgOiBzd2lwZXIuc2xpZGVzO1xuICAgICAgICAgICAgdHJhbnNsYXRlZCA9IHN3aXBlci5zbGlkZVRvKHNsaWRlcy5sZW5ndGggLSAxLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZWQgPSBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0cmFuc2xhdGVkKSB7XG4gICAgICAgICAgICBzZXRUcmFuc2xhdGUyKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzbmFwR3JpZCAhPT0gc3dpcGVyLnNuYXBHcmlkKSB7XG4gICAgICAgICAgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIuZW1pdChcInVwZGF0ZVwiKTtcbiAgICAgIH1cbiAgICAgIGNoYW5nZURpcmVjdGlvbihuZXdEaXJlY3Rpb24sIG5lZWRVcGRhdGUpIHtcbiAgICAgICAgaWYgKG5lZWRVcGRhdGUgPT09IHZvaWQgMCkge1xuICAgICAgICAgIG5lZWRVcGRhdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREaXJlY3Rpb24gPSBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbjtcbiAgICAgICAgaWYgKCFuZXdEaXJlY3Rpb24pIHtcbiAgICAgICAgICBuZXdEaXJlY3Rpb24gPSBjdXJyZW50RGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIiA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdEaXJlY3Rpb24gPT09IGN1cnJlbnREaXJlY3Rpb24gfHwgbmV3RGlyZWN0aW9uICE9PSBcImhvcml6b250YWxcIiAmJiBuZXdEaXJlY3Rpb24gIT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgIHJldHVybiBzd2lwZXI7XG4gICAgICAgIH1cbiAgICAgICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfSR7Y3VycmVudERpcmVjdGlvbn1gKTtcbiAgICAgICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5hZGQoYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfSR7bmV3RGlyZWN0aW9ufWApO1xuICAgICAgICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPSBuZXdEaXJlY3Rpb247XG4gICAgICAgIHN3aXBlci5zbGlkZXMuZm9yRWFjaCgoc2xpZGVFbCkgPT4ge1xuICAgICAgICAgIGlmIChuZXdEaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgICAgc2xpZGVFbC5zdHlsZS53aWR0aCA9IFwiXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWRlRWwuc3R5bGUuaGVpZ2h0ID0gXCJcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzd2lwZXIuZW1pdChcImNoYW5nZURpcmVjdGlvblwiKTtcbiAgICAgICAgaWYgKG5lZWRVcGRhdGUpIHN3aXBlci51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHN3aXBlcjtcbiAgICAgIH1cbiAgICAgIGNoYW5nZUxhbmd1YWdlRGlyZWN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnJ0bCAmJiBkaXJlY3Rpb24gPT09IFwicnRsXCIgfHwgIXN3aXBlci5ydGwgJiYgZGlyZWN0aW9uID09PSBcImx0clwiKSByZXR1cm47XG4gICAgICAgIHN3aXBlci5ydGwgPSBkaXJlY3Rpb24gPT09IFwicnRsXCI7XG4gICAgICAgIHN3aXBlci5ydGxUcmFuc2xhdGUgPSBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgJiYgc3dpcGVyLnJ0bDtcbiAgICAgICAgaWYgKHN3aXBlci5ydGwpIHtcbiAgICAgICAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LmFkZChgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9cnRsYCk7XG4gICAgICAgICAgc3dpcGVyLmVsLmRpciA9IFwicnRsXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfXJ0bGApO1xuICAgICAgICAgIHN3aXBlci5lbC5kaXIgPSBcImx0clwiO1xuICAgICAgICB9XG4gICAgICAgIHN3aXBlci51cGRhdGUoKTtcbiAgICAgIH1cbiAgICAgIG1vdW50KGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5tb3VudGVkKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgbGV0IGVsID0gZWxlbWVudCB8fCBzd2lwZXIucGFyYW1zLmVsO1xuICAgICAgICBpZiAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsLnN3aXBlciA9IHN3aXBlcjtcbiAgICAgICAgaWYgKGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5ob3N0ICYmIGVsLnBhcmVudE5vZGUuaG9zdC5ub2RlTmFtZSA9PT0gc3dpcGVyLnBhcmFtcy5zd2lwZXJFbGVtZW50Tm9kZU5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgIHN3aXBlci5pc0VsZW1lbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdldFdyYXBwZXJTZWxlY3RvciA9ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gYC4keyhzd2lwZXIucGFyYW1zLndyYXBwZXJDbGFzcyB8fCBcIlwiKS50cmltKCkuc3BsaXQoXCIgXCIpLmpvaW4oXCIuXCIpfWA7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGdldFdyYXBwZXIgPSAoKSA9PiB7XG4gICAgICAgICAgaWYgKGVsICYmIGVsLnNoYWRvd1Jvb3QgJiYgZWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBlbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoZ2V0V3JhcHBlclNlbGVjdG9yKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnRDaGlsZHJlbihlbCwgZ2V0V3JhcHBlclNlbGVjdG9yKCkpWzBdO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgd3JhcHBlckVsID0gZ2V0V3JhcHBlcigpO1xuICAgICAgICBpZiAoIXdyYXBwZXJFbCAmJiBzd2lwZXIucGFyYW1zLmNyZWF0ZUVsZW1lbnRzKSB7XG4gICAgICAgICAgd3JhcHBlckVsID0gY3JlYXRlRWxlbWVudDIoXCJkaXZcIiwgc3dpcGVyLnBhcmFtcy53cmFwcGVyQ2xhc3MpO1xuICAgICAgICAgIGVsLmFwcGVuZCh3cmFwcGVyRWwpO1xuICAgICAgICAgIGVsZW1lbnRDaGlsZHJlbihlbCwgYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31gKS5mb3JFYWNoKChzbGlkZUVsKSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVyRWwuYXBwZW5kKHNsaWRlRWwpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgICAgICAgZWwsXG4gICAgICAgICAgd3JhcHBlckVsLFxuICAgICAgICAgIHNsaWRlc0VsOiBzd2lwZXIuaXNFbGVtZW50ICYmICFlbC5wYXJlbnROb2RlLmhvc3Quc2xpZGVTbG90cyA/IGVsLnBhcmVudE5vZGUuaG9zdCA6IHdyYXBwZXJFbCxcbiAgICAgICAgICBob3N0RWw6IHN3aXBlci5pc0VsZW1lbnQgPyBlbC5wYXJlbnROb2RlLmhvc3QgOiBlbCxcbiAgICAgICAgICBtb3VudGVkOiB0cnVlLFxuICAgICAgICAgIC8vIFJUTFxuICAgICAgICAgIHJ0bDogZWwuZGlyLnRvTG93ZXJDYXNlKCkgPT09IFwicnRsXCIgfHwgZWxlbWVudFN0eWxlKGVsLCBcImRpcmVjdGlvblwiKSA9PT0gXCJydGxcIixcbiAgICAgICAgICBydGxUcmFuc2xhdGU6IHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIiAmJiAoZWwuZGlyLnRvTG93ZXJDYXNlKCkgPT09IFwicnRsXCIgfHwgZWxlbWVudFN0eWxlKGVsLCBcImRpcmVjdGlvblwiKSA9PT0gXCJydGxcIiksXG4gICAgICAgICAgd3JvbmdSVEw6IGVsZW1lbnRTdHlsZSh3cmFwcGVyRWwsIFwiZGlzcGxheVwiKSA9PT0gXCItd2Via2l0LWJveFwiXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGluaXQoZWwpIHtcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuIHN3aXBlcjtcbiAgICAgICAgY29uc3QgbW91bnRlZCA9IHN3aXBlci5tb3VudChlbCk7XG4gICAgICAgIGlmIChtb3VudGVkID09PSBmYWxzZSkgcmV0dXJuIHN3aXBlcjtcbiAgICAgICAgc3dpcGVyLmVtaXQoXCJiZWZvcmVJbml0XCIpO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpcGVyLmFkZENsYXNzZXMoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93KSB7XG4gICAgICAgICAgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5ncmFiQ3Vyc29yICYmIHN3aXBlci5lbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wICYmIHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnBhcmFtcy5pbml0aWFsU2xpZGUgKyBzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmUsIDAsIHN3aXBlci5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnBhcmFtcy5pbml0aWFsU2xpZGUsIDAsIHN3aXBlci5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpcGVyLmF0dGFjaEV2ZW50cygpO1xuICAgICAgICBjb25zdCBsYXp5RWxlbWVudHMgPSBbLi4uc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tsb2FkaW5nPVwibGF6eVwiXScpXTtcbiAgICAgICAgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICAgICAgICBsYXp5RWxlbWVudHMucHVzaCguLi5zd2lwZXIuaG9zdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tsb2FkaW5nPVwibGF6eVwiXScpKTtcbiAgICAgICAgfVxuICAgICAgICBsYXp5RWxlbWVudHMuZm9yRWFjaCgoaW1hZ2VFbCkgPT4ge1xuICAgICAgICAgIGlmIChpbWFnZUVsLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICBwcm9jZXNzTGF6eVByZWxvYWRlcihzd2lwZXIsIGltYWdlRWwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbWFnZUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgIHByb2Nlc3NMYXp5UHJlbG9hZGVyKHN3aXBlciwgZS50YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcHJlbG9hZChzd2lwZXIpO1xuICAgICAgICBzd2lwZXIuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICBwcmVsb2FkKHN3aXBlcik7XG4gICAgICAgIHN3aXBlci5lbWl0KFwiaW5pdFwiKTtcbiAgICAgICAgc3dpcGVyLmVtaXQoXCJhZnRlckluaXRcIik7XG4gICAgICAgIHJldHVybiBzd2lwZXI7XG4gICAgICB9XG4gICAgICBkZXN0cm95KGRlbGV0ZUluc3RhbmNlLCBjbGVhblN0eWxlcykge1xuICAgICAgICBpZiAoZGVsZXRlSW5zdGFuY2UgPT09IHZvaWQgMCkge1xuICAgICAgICAgIGRlbGV0ZUluc3RhbmNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xlYW5TdHlsZXMgPT09IHZvaWQgMCkge1xuICAgICAgICAgIGNsZWFuU3R5bGVzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgIGVsLFxuICAgICAgICAgIHdyYXBwZXJFbCxcbiAgICAgICAgICBzbGlkZXNcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgaWYgKHR5cGVvZiBzd2lwZXIucGFyYW1zID09PSBcInVuZGVmaW5lZFwiIHx8IHN3aXBlci5kZXN0cm95ZWQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIuZW1pdChcImJlZm9yZURlc3Ryb3lcIik7XG4gICAgICAgIHN3aXBlci5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICBzd2lwZXIuZGV0YWNoRXZlbnRzKCk7XG4gICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbGVhblN0eWxlcykge1xuICAgICAgICAgIHN3aXBlci5yZW1vdmVDbGFzc2VzKCk7XG4gICAgICAgICAgaWYgKGVsICYmIHR5cGVvZiBlbCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh3cmFwcGVyRWwpIHtcbiAgICAgICAgICAgIHdyYXBwZXJFbC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNsaWRlcyAmJiBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGVFbCkgPT4ge1xuICAgICAgICAgICAgICBzbGlkZUVsLmNsYXNzTGlzdC5yZW1vdmUocGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzLCBwYXJhbXMuc2xpZGVGdWxseVZpc2libGVDbGFzcywgcGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MsIHBhcmFtcy5zbGlkZU5leHRDbGFzcywgcGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgICAgICAgICAgICAgc2xpZGVFbC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgICAgICAgICAgICAgc2xpZGVFbC5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLXN3aXBlci1zbGlkZS1pbmRleFwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIuZW1pdChcImRlc3Ryb3lcIik7XG4gICAgICAgIE9iamVjdC5rZXlzKHN3aXBlci5ldmVudHNMaXN0ZW5lcnMpLmZvckVhY2goKGV2ZW50TmFtZSkgPT4ge1xuICAgICAgICAgIHN3aXBlci5vZmYoZXZlbnROYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChkZWxldGVJbnN0YW5jZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBpZiAoc3dpcGVyLmVsICYmIHR5cGVvZiBzd2lwZXIuZWwgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHN3aXBlci5lbC5zd2lwZXIgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWxldGVQcm9wcyhzd2lwZXIpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXBlci5kZXN0cm95ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHN0YXRpYyBleHRlbmREZWZhdWx0cyhuZXdEZWZhdWx0cykge1xuICAgICAgICBleHRlbmQyKGV4dGVuZGVkRGVmYXVsdHMsIG5ld0RlZmF1bHRzKTtcbiAgICAgIH1cbiAgICAgIHN0YXRpYyBnZXQgZXh0ZW5kZWREZWZhdWx0cygpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZGVkRGVmYXVsdHM7XG4gICAgICB9XG4gICAgICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgICB9XG4gICAgICBzdGF0aWMgaW5zdGFsbE1vZHVsZShtb2QpIHtcbiAgICAgICAgaWYgKCFfU3dpcGVyLnByb3RvdHlwZS5fX21vZHVsZXNfXykgX1N3aXBlci5wcm90b3R5cGUuX19tb2R1bGVzX18gPSBbXTtcbiAgICAgICAgY29uc3QgbW9kdWxlcyA9IF9Td2lwZXIucHJvdG90eXBlLl9fbW9kdWxlc19fO1xuICAgICAgICBpZiAodHlwZW9mIG1vZCA9PT0gXCJmdW5jdGlvblwiICYmIG1vZHVsZXMuaW5kZXhPZihtb2QpIDwgMCkge1xuICAgICAgICAgIG1vZHVsZXMucHVzaChtb2QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdGF0aWMgdXNlKG1vZHVsZSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShtb2R1bGUpKSB7XG4gICAgICAgICAgbW9kdWxlLmZvckVhY2goKG0pID0+IF9Td2lwZXIuaW5zdGFsbE1vZHVsZShtKSk7XG4gICAgICAgICAgcmV0dXJuIF9Td2lwZXI7XG4gICAgICAgIH1cbiAgICAgICAgX1N3aXBlci5pbnN0YWxsTW9kdWxlKG1vZHVsZSk7XG4gICAgICAgIHJldHVybiBfU3dpcGVyO1xuICAgICAgfVxuICAgIH07XG4gICAgT2JqZWN0LmtleXMocHJvdG90eXBlcykuZm9yRWFjaCgocHJvdG90eXBlR3JvdXApID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKHByb3RvdHlwZXNbcHJvdG90eXBlR3JvdXBdKS5mb3JFYWNoKChwcm90b01ldGhvZCkgPT4ge1xuICAgICAgICBTd2lwZXIucHJvdG90eXBlW3Byb3RvTWV0aG9kXSA9IHByb3RvdHlwZXNbcHJvdG90eXBlR3JvdXBdW3Byb3RvTWV0aG9kXTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIFN3aXBlci51c2UoW1Jlc2l6ZSwgT2JzZXJ2ZXJdKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc3dpcGVyLm1qc1xudmFyIGluaXRfc3dpcGVyID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc3dpcGVyLm1qc1wiKCkge1xuICAgIGluaXRfc3dpcGVyX2NvcmUoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy92aXJ0dWFsLm1qc1xudmFyIGluaXRfdmlydHVhbCA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvdmlydHVhbC5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2tleWJvYXJkLm1qc1xuZnVuY3Rpb24gS2V5Ym9hcmQoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBleHRlbmRQYXJhbXMsXG4gICAgb24sXG4gICAgZW1pdFxuICB9ID0gX3JlZjtcbiAgY29uc3QgZG9jdW1lbnQyID0gZ2V0RG9jdW1lbnQoKTtcbiAgY29uc3Qgd2luZG93MiA9IGdldFdpbmRvdygpO1xuICBzd2lwZXIua2V5Ym9hcmQgPSB7XG4gICAgZW5hYmxlZDogZmFsc2VcbiAgfTtcbiAgZXh0ZW5kUGFyYW1zKHtcbiAgICBrZXlib2FyZDoge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICBvbmx5SW5WaWV3cG9ydDogdHJ1ZSxcbiAgICAgIHBhZ2VVcERvd246IHRydWVcbiAgICB9XG4gIH0pO1xuICBmdW5jdGlvbiBoYW5kbGUoZXZlbnQyKSB7XG4gICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgIGNvbnN0IHtcbiAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsXG4gICAgfSA9IHN3aXBlcjtcbiAgICBsZXQgZSA9IGV2ZW50MjtcbiAgICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICAgIGNvbnN0IGtjID0gZS5rZXlDb2RlIHx8IGUuY2hhckNvZGU7XG4gICAgY29uc3QgcGFnZVVwRG93biA9IHN3aXBlci5wYXJhbXMua2V5Ym9hcmQucGFnZVVwRG93bjtcbiAgICBjb25zdCBpc1BhZ2VVcCA9IHBhZ2VVcERvd24gJiYga2MgPT09IDMzO1xuICAgIGNvbnN0IGlzUGFnZURvd24gPSBwYWdlVXBEb3duICYmIGtjID09PSAzNDtcbiAgICBjb25zdCBpc0Fycm93TGVmdCA9IGtjID09PSAzNztcbiAgICBjb25zdCBpc0Fycm93UmlnaHQgPSBrYyA9PT0gMzk7XG4gICAgY29uc3QgaXNBcnJvd1VwID0ga2MgPT09IDM4O1xuICAgIGNvbnN0IGlzQXJyb3dEb3duID0ga2MgPT09IDQwO1xuICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVOZXh0ICYmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYgaXNBcnJvd1JpZ2h0IHx8IHN3aXBlci5pc1ZlcnRpY2FsKCkgJiYgaXNBcnJvd0Rvd24gfHwgaXNQYWdlRG93bikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgKHN3aXBlci5pc0hvcml6b250YWwoKSAmJiBpc0Fycm93TGVmdCB8fCBzd2lwZXIuaXNWZXJ0aWNhbCgpICYmIGlzQXJyb3dVcCB8fCBpc1BhZ2VVcCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGUuc2hpZnRLZXkgfHwgZS5hbHRLZXkgfHwgZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgaWYgKGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50Mi5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lICYmIChkb2N1bWVudDIuYWN0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgfHwgZG9jdW1lbnQyLmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJ0ZXh0YXJlYVwiKSkge1xuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMua2V5Ym9hcmQub25seUluVmlld3BvcnQgJiYgKGlzUGFnZVVwIHx8IGlzUGFnZURvd24gfHwgaXNBcnJvd0xlZnQgfHwgaXNBcnJvd1JpZ2h0IHx8IGlzQXJyb3dVcCB8fCBpc0Fycm93RG93bikpIHtcbiAgICAgIGxldCBpblZpZXcgPSBmYWxzZTtcbiAgICAgIGlmIChlbGVtZW50UGFyZW50cyhzd2lwZXIuZWwsIGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKS5sZW5ndGggPiAwICYmIGVsZW1lbnRQYXJlbnRzKHN3aXBlci5lbCwgYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzc31gKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVsID0gc3dpcGVyLmVsO1xuICAgICAgY29uc3Qgc3dpcGVyV2lkdGggPSBlbC5jbGllbnRXaWR0aDtcbiAgICAgIGNvbnN0IHN3aXBlckhlaWdodCA9IGVsLmNsaWVudEhlaWdodDtcbiAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93Mi5pbm5lcldpZHRoO1xuICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93Mi5pbm5lckhlaWdodDtcbiAgICAgIGNvbnN0IHN3aXBlck9mZnNldCA9IGVsZW1lbnRPZmZzZXQoZWwpO1xuICAgICAgaWYgKHJ0bCkgc3dpcGVyT2Zmc2V0LmxlZnQgLT0gZWwuc2Nyb2xsTGVmdDtcbiAgICAgIGNvbnN0IHN3aXBlckNvb3JkID0gW1tzd2lwZXJPZmZzZXQubGVmdCwgc3dpcGVyT2Zmc2V0LnRvcF0sIFtzd2lwZXJPZmZzZXQubGVmdCArIHN3aXBlcldpZHRoLCBzd2lwZXJPZmZzZXQudG9wXSwgW3N3aXBlck9mZnNldC5sZWZ0LCBzd2lwZXJPZmZzZXQudG9wICsgc3dpcGVySGVpZ2h0XSwgW3N3aXBlck9mZnNldC5sZWZ0ICsgc3dpcGVyV2lkdGgsIHN3aXBlck9mZnNldC50b3AgKyBzd2lwZXJIZWlnaHRdXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyQ29vcmQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgcG9pbnQgPSBzd2lwZXJDb29yZFtpXTtcbiAgICAgICAgaWYgKHBvaW50WzBdID49IDAgJiYgcG9pbnRbMF0gPD0gd2luZG93V2lkdGggJiYgcG9pbnRbMV0gPj0gMCAmJiBwb2ludFsxXSA8PSB3aW5kb3dIZWlnaHQpIHtcbiAgICAgICAgICBpZiAocG9pbnRbMF0gPT09IDAgJiYgcG9pbnRbMV0gPT09IDApIGNvbnRpbnVlO1xuICAgICAgICAgIGluVmlldyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghaW5WaWV3KSByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICBpZiAoaXNQYWdlVXAgfHwgaXNQYWdlRG93biB8fCBpc0Fycm93TGVmdCB8fCBpc0Fycm93UmlnaHQpIHtcbiAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoKGlzUGFnZURvd24gfHwgaXNBcnJvd1JpZ2h0KSAmJiAhcnRsIHx8IChpc1BhZ2VVcCB8fCBpc0Fycm93TGVmdCkgJiYgcnRsKSBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICBpZiAoKGlzUGFnZVVwIHx8IGlzQXJyb3dMZWZ0KSAmJiAhcnRsIHx8IChpc1BhZ2VEb3duIHx8IGlzQXJyb3dSaWdodCkgJiYgcnRsKSBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc1BhZ2VVcCB8fCBpc1BhZ2VEb3duIHx8IGlzQXJyb3dVcCB8fCBpc0Fycm93RG93bikge1xuICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1BhZ2VEb3duIHx8IGlzQXJyb3dEb3duKSBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgICBpZiAoaXNQYWdlVXAgfHwgaXNBcnJvd1VwKSBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgfVxuICAgIGVtaXQoXCJrZXlQcmVzc1wiLCBrYyk7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgaWYgKHN3aXBlci5rZXlib2FyZC5lbmFibGVkKSByZXR1cm47XG4gICAgZG9jdW1lbnQyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZSk7XG4gICAgc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQgPSB0cnVlO1xuICB9XG4gIGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgaWYgKCFzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCkgcmV0dXJuO1xuICAgIGRvY3VtZW50Mi5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGUpO1xuICAgIHN3aXBlci5rZXlib2FyZC5lbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgb24oXCJpbml0XCIsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5rZXlib2FyZC5lbmFibGVkKSB7XG4gICAgICBlbmFibGUoKTtcbiAgICB9XG4gIH0pO1xuICBvbihcImRlc3Ryb3lcIiwgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCkge1xuICAgICAgZGlzYWJsZSgpO1xuICAgIH1cbiAgfSk7XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLmtleWJvYXJkLCB7XG4gICAgZW5hYmxlLFxuICAgIGRpc2FibGVcbiAgfSk7XG59XG52YXIgaW5pdF9rZXlib2FyZCA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMva2V5Ym9hcmQubWpzXCIoKSB7XG4gICAgaW5pdF9zc3Jfd2luZG93X2VzbSgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9tb3VzZXdoZWVsLm1qc1xuZnVuY3Rpb24gTW91c2V3aGVlbChfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIGV4dGVuZFBhcmFtcyxcbiAgICBvbixcbiAgICBlbWl0XG4gIH0gPSBfcmVmO1xuICBjb25zdCB3aW5kb3cyID0gZ2V0V2luZG93KCk7XG4gIGV4dGVuZFBhcmFtcyh7XG4gICAgbW91c2V3aGVlbDoge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICByZWxlYXNlT25FZGdlczogZmFsc2UsXG4gICAgICBpbnZlcnQ6IGZhbHNlLFxuICAgICAgZm9yY2VUb0F4aXM6IGZhbHNlLFxuICAgICAgc2Vuc2l0aXZpdHk6IDEsXG4gICAgICBldmVudHNUYXJnZXQ6IFwiY29udGFpbmVyXCIsXG4gICAgICB0aHJlc2hvbGREZWx0YTogbnVsbCxcbiAgICAgIHRocmVzaG9sZFRpbWU6IG51bGwsXG4gICAgICBub01vdXNld2hlZWxDbGFzczogXCJzd2lwZXItbm8tbW91c2V3aGVlbFwiXG4gICAgfVxuICB9KTtcbiAgc3dpcGVyLm1vdXNld2hlZWwgPSB7XG4gICAgZW5hYmxlZDogZmFsc2VcbiAgfTtcbiAgbGV0IHRpbWVvdXQ7XG4gIGxldCBsYXN0U2Nyb2xsVGltZSA9IG5vdygpO1xuICBsZXQgbGFzdEV2ZW50QmVmb3JlU25hcDtcbiAgY29uc3QgcmVjZW50V2hlZWxFdmVudHMgPSBbXTtcbiAgZnVuY3Rpb24gbm9ybWFsaXplKGUpIHtcbiAgICBjb25zdCBQSVhFTF9TVEVQID0gMTA7XG4gICAgY29uc3QgTElORV9IRUlHSFQgPSA0MDtcbiAgICBjb25zdCBQQUdFX0hFSUdIVCA9IDgwMDtcbiAgICBsZXQgc1ggPSAwO1xuICAgIGxldCBzWSA9IDA7XG4gICAgbGV0IHBYID0gMDtcbiAgICBsZXQgcFkgPSAwO1xuICAgIGlmIChcImRldGFpbFwiIGluIGUpIHtcbiAgICAgIHNZID0gZS5kZXRhaWw7XG4gICAgfVxuICAgIGlmIChcIndoZWVsRGVsdGFcIiBpbiBlKSB7XG4gICAgICBzWSA9IC1lLndoZWVsRGVsdGEgLyAxMjA7XG4gICAgfVxuICAgIGlmIChcIndoZWVsRGVsdGFZXCIgaW4gZSkge1xuICAgICAgc1kgPSAtZS53aGVlbERlbHRhWSAvIDEyMDtcbiAgICB9XG4gICAgaWYgKFwid2hlZWxEZWx0YVhcIiBpbiBlKSB7XG4gICAgICBzWCA9IC1lLndoZWVsRGVsdGFYIC8gMTIwO1xuICAgIH1cbiAgICBpZiAoXCJheGlzXCIgaW4gZSAmJiBlLmF4aXMgPT09IGUuSE9SSVpPTlRBTF9BWElTKSB7XG4gICAgICBzWCA9IHNZO1xuICAgICAgc1kgPSAwO1xuICAgIH1cbiAgICBwWCA9IHNYICogUElYRUxfU1RFUDtcbiAgICBwWSA9IHNZICogUElYRUxfU1RFUDtcbiAgICBpZiAoXCJkZWx0YVlcIiBpbiBlKSB7XG4gICAgICBwWSA9IGUuZGVsdGFZO1xuICAgIH1cbiAgICBpZiAoXCJkZWx0YVhcIiBpbiBlKSB7XG4gICAgICBwWCA9IGUuZGVsdGFYO1xuICAgIH1cbiAgICBpZiAoZS5zaGlmdEtleSAmJiAhcFgpIHtcbiAgICAgIHBYID0gcFk7XG4gICAgICBwWSA9IDA7XG4gICAgfVxuICAgIGlmICgocFggfHwgcFkpICYmIGUuZGVsdGFNb2RlKSB7XG4gICAgICBpZiAoZS5kZWx0YU1vZGUgPT09IDEpIHtcbiAgICAgICAgcFggKj0gTElORV9IRUlHSFQ7XG4gICAgICAgIHBZICo9IExJTkVfSEVJR0hUO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcFggKj0gUEFHRV9IRUlHSFQ7XG4gICAgICAgIHBZICo9IFBBR0VfSEVJR0hUO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocFggJiYgIXNYKSB7XG4gICAgICBzWCA9IHBYIDwgMSA/IC0xIDogMTtcbiAgICB9XG4gICAgaWYgKHBZICYmICFzWSkge1xuICAgICAgc1kgPSBwWSA8IDEgPyAtMSA6IDE7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBzcGluWDogc1gsXG4gICAgICBzcGluWTogc1ksXG4gICAgICBwaXhlbFg6IHBYLFxuICAgICAgcGl4ZWxZOiBwWVxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VFbnRlcigpIHtcbiAgICBpZiAoIXN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gICAgc3dpcGVyLm1vdXNlRW50ZXJlZCA9IHRydWU7XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VMZWF2ZSgpIHtcbiAgICBpZiAoIXN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gICAgc3dpcGVyLm1vdXNlRW50ZXJlZCA9IGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGFuaW1hdGVTbGlkZXIobmV3RXZlbnQpIHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLnRocmVzaG9sZERlbHRhICYmIG5ld0V2ZW50LmRlbHRhIDwgc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLnRocmVzaG9sZERlbHRhKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwudGhyZXNob2xkVGltZSAmJiBub3coKSAtIGxhc3RTY3JvbGxUaW1lIDwgc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLnRocmVzaG9sZFRpbWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG5ld0V2ZW50LmRlbHRhID49IDYgJiYgbm93KCkgLSBsYXN0U2Nyb2xsVGltZSA8IDYwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG5ld0V2ZW50LmRpcmVjdGlvbiA8IDApIHtcbiAgICAgIGlmICgoIXN3aXBlci5pc0VuZCB8fCBzd2lwZXIucGFyYW1zLmxvb3ApICYmICFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgICAgZW1pdChcInNjcm9sbFwiLCBuZXdFdmVudC5yYXcpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoKCFzd2lwZXIuaXNCZWdpbm5pbmcgfHwgc3dpcGVyLnBhcmFtcy5sb29wKSAmJiAhc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgc3dpcGVyLnNsaWRlUHJldigpO1xuICAgICAgZW1pdChcInNjcm9sbFwiLCBuZXdFdmVudC5yYXcpO1xuICAgIH1cbiAgICBsYXN0U2Nyb2xsVGltZSA9IG5ldyB3aW5kb3cyLkRhdGUoKS5nZXRUaW1lKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIHJlbGVhc2VTY3JvbGwobmV3RXZlbnQpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm1vdXNld2hlZWw7XG4gICAgaWYgKG5ld0V2ZW50LmRpcmVjdGlvbiA8IDApIHtcbiAgICAgIGlmIChzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMubG9vcCAmJiBwYXJhbXMucmVsZWFzZU9uRWRnZXMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMubG9vcCAmJiBwYXJhbXMucmVsZWFzZU9uRWRnZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gaGFuZGxlKGV2ZW50Mikge1xuICAgIGxldCBlID0gZXZlbnQyO1xuICAgIGxldCBkaXNhYmxlUGFyZW50U3dpcGVyID0gdHJ1ZTtcbiAgICBpZiAoIXN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gICAgaWYgKGV2ZW50Mi50YXJnZXQuY2xvc2VzdChgLiR7c3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLm5vTW91c2V3aGVlbENsYXNzfWApKSByZXR1cm47XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgbGV0IHRhcmdldEVsID0gc3dpcGVyLmVsO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2V0ICE9PSBcImNvbnRhaW5lclwiKSB7XG4gICAgICB0YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdldCk7XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldEVsQ29udGFpbnNUYXJnZXQgPSB0YXJnZXRFbCAmJiB0YXJnZXRFbC5jb250YWlucyhlLnRhcmdldCk7XG4gICAgaWYgKCFzd2lwZXIubW91c2VFbnRlcmVkICYmICF0YXJnZXRFbENvbnRhaW5zVGFyZ2V0ICYmICFwYXJhbXMucmVsZWFzZU9uRWRnZXMpIHJldHVybiB0cnVlO1xuICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgbGV0IGRlbHRhID0gMDtcbiAgICBjb25zdCBydGxGYWN0b3IgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gLTEgOiAxO1xuICAgIGNvbnN0IGRhdGEgPSBub3JtYWxpemUoZSk7XG4gICAgaWYgKHBhcmFtcy5mb3JjZVRvQXhpcykge1xuICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGF0YS5waXhlbFgpID4gTWF0aC5hYnMoZGF0YS5waXhlbFkpKSBkZWx0YSA9IC1kYXRhLnBpeGVsWCAqIHJ0bEZhY3RvcjtcbiAgICAgICAgZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoZGF0YS5waXhlbFkpID4gTWF0aC5hYnMoZGF0YS5waXhlbFgpKSBkZWx0YSA9IC1kYXRhLnBpeGVsWTtcbiAgICAgIGVsc2UgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbHRhID0gTWF0aC5hYnMoZGF0YS5waXhlbFgpID4gTWF0aC5hYnMoZGF0YS5waXhlbFkpID8gLWRhdGEucGl4ZWxYICogcnRsRmFjdG9yIDogLWRhdGEucGl4ZWxZO1xuICAgIH1cbiAgICBpZiAoZGVsdGEgPT09IDApIHJldHVybiB0cnVlO1xuICAgIGlmIChwYXJhbXMuaW52ZXJ0KSBkZWx0YSA9IC1kZWx0YTtcbiAgICBsZXQgcG9zaXRpb25zID0gc3dpcGVyLmdldFRyYW5zbGF0ZSgpICsgZGVsdGEgKiBwYXJhbXMuc2Vuc2l0aXZpdHk7XG4gICAgaWYgKHBvc2l0aW9ucyA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHBvc2l0aW9ucyA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICBpZiAocG9zaXRpb25zIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkgcG9zaXRpb25zID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICAgIGRpc2FibGVQYXJlbnRTd2lwZXIgPSBzd2lwZXIucGFyYW1zLmxvb3AgPyB0cnVlIDogIShwb3NpdGlvbnMgPT09IHN3aXBlci5taW5UcmFuc2xhdGUoKSB8fCBwb3NpdGlvbnMgPT09IHN3aXBlci5tYXhUcmFuc2xhdGUoKSk7XG4gICAgaWYgKGRpc2FibGVQYXJlbnRTd2lwZXIgJiYgc3dpcGVyLnBhcmFtcy5uZXN0ZWQpIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLmZyZWVNb2RlIHx8ICFzd2lwZXIucGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQpIHtcbiAgICAgIGNvbnN0IG5ld0V2ZW50ID0ge1xuICAgICAgICB0aW1lOiBub3coKSxcbiAgICAgICAgZGVsdGE6IE1hdGguYWJzKGRlbHRhKSxcbiAgICAgICAgZGlyZWN0aW9uOiBNYXRoLnNpZ24oZGVsdGEpLFxuICAgICAgICByYXc6IGV2ZW50MlxuICAgICAgfTtcbiAgICAgIGlmIChyZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggPj0gMikge1xuICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgcHJldkV2ZW50ID0gcmVjZW50V2hlZWxFdmVudHMubGVuZ3RoID8gcmVjZW50V2hlZWxFdmVudHNbcmVjZW50V2hlZWxFdmVudHMubGVuZ3RoIC0gMV0gOiB2b2lkIDA7XG4gICAgICByZWNlbnRXaGVlbEV2ZW50cy5wdXNoKG5ld0V2ZW50KTtcbiAgICAgIGlmIChwcmV2RXZlbnQpIHtcbiAgICAgICAgaWYgKG5ld0V2ZW50LmRpcmVjdGlvbiAhPT0gcHJldkV2ZW50LmRpcmVjdGlvbiB8fCBuZXdFdmVudC5kZWx0YSA+IHByZXZFdmVudC5kZWx0YSB8fCBuZXdFdmVudC50aW1lID4gcHJldkV2ZW50LnRpbWUgKyAxNTApIHtcbiAgICAgICAgICBhbmltYXRlU2xpZGVyKG5ld0V2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW5pbWF0ZVNsaWRlcihuZXdFdmVudCk7XG4gICAgICB9XG4gICAgICBpZiAocmVsZWFzZVNjcm9sbChuZXdFdmVudCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld0V2ZW50ID0ge1xuICAgICAgICB0aW1lOiBub3coKSxcbiAgICAgICAgZGVsdGE6IE1hdGguYWJzKGRlbHRhKSxcbiAgICAgICAgZGlyZWN0aW9uOiBNYXRoLnNpZ24oZGVsdGEpXG4gICAgICB9O1xuICAgICAgY29uc3QgaWdub3JlV2hlZWxFdmVudHMgPSBsYXN0RXZlbnRCZWZvcmVTbmFwICYmIG5ld0V2ZW50LnRpbWUgPCBsYXN0RXZlbnRCZWZvcmVTbmFwLnRpbWUgKyA1MDAgJiYgbmV3RXZlbnQuZGVsdGEgPD0gbGFzdEV2ZW50QmVmb3JlU25hcC5kZWx0YSAmJiBuZXdFdmVudC5kaXJlY3Rpb24gPT09IGxhc3RFdmVudEJlZm9yZVNuYXAuZGlyZWN0aW9uO1xuICAgICAgaWYgKCFpZ25vcmVXaGVlbEV2ZW50cykge1xuICAgICAgICBsYXN0RXZlbnRCZWZvcmVTbmFwID0gdm9pZCAwO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBzd2lwZXIuZ2V0VHJhbnNsYXRlKCkgKyBkZWx0YSAqIHBhcmFtcy5zZW5zaXRpdml0eTtcbiAgICAgICAgY29uc3Qgd2FzQmVnaW5uaW5nID0gc3dpcGVyLmlzQmVnaW5uaW5nO1xuICAgICAgICBjb25zdCB3YXNFbmQgPSBzd2lwZXIuaXNFbmQ7XG4gICAgICAgIGlmIChwb3NpdGlvbiA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHBvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICBpZiAocG9zaXRpb24gPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSBwb3NpdGlvbiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUocG9zaXRpb24pO1xuICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICAgIGlmICghd2FzQmVnaW5uaW5nICYmIHN3aXBlci5pc0JlZ2lubmluZyB8fCAhd2FzRW5kICYmIHN3aXBlci5pc0VuZCkge1xuICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogbmV3RXZlbnQuZGlyZWN0aW9uIDwgMCA/IFwibmV4dFwiIDogXCJwcmV2XCIsXG4gICAgICAgICAgICBieU1vdXNld2hlZWw6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mcmVlTW9kZS5zdGlja3kpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgdGltZW91dCA9IHZvaWQgMDtcbiAgICAgICAgICBpZiAocmVjZW50V2hlZWxFdmVudHMubGVuZ3RoID49IDE1KSB7XG4gICAgICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5zaGlmdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBwcmV2RXZlbnQgPSByZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggPyByZWNlbnRXaGVlbEV2ZW50c1tyZWNlbnRXaGVlbEV2ZW50cy5sZW5ndGggLSAxXSA6IHZvaWQgMDtcbiAgICAgICAgICBjb25zdCBmaXJzdEV2ZW50ID0gcmVjZW50V2hlZWxFdmVudHNbMF07XG4gICAgICAgICAgcmVjZW50V2hlZWxFdmVudHMucHVzaChuZXdFdmVudCk7XG4gICAgICAgICAgaWYgKHByZXZFdmVudCAmJiAobmV3RXZlbnQuZGVsdGEgPiBwcmV2RXZlbnQuZGVsdGEgfHwgbmV3RXZlbnQuZGlyZWN0aW9uICE9PSBwcmV2RXZlbnQuZGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgcmVjZW50V2hlZWxFdmVudHMuc3BsaWNlKDApO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVjZW50V2hlZWxFdmVudHMubGVuZ3RoID49IDE1ICYmIG5ld0V2ZW50LnRpbWUgLSBmaXJzdEV2ZW50LnRpbWUgPCA1MDAgJiYgZmlyc3RFdmVudC5kZWx0YSAtIG5ld0V2ZW50LmRlbHRhID49IDEgJiYgbmV3RXZlbnQuZGVsdGEgPD0gNikge1xuICAgICAgICAgICAgY29uc3Qgc25hcFRvVGhyZXNob2xkID0gZGVsdGEgPiAwID8gMC44IDogMC4yO1xuICAgICAgICAgICAgbGFzdEV2ZW50QmVmb3JlU25hcCA9IG5ld0V2ZW50O1xuICAgICAgICAgICAgcmVjZW50V2hlZWxFdmVudHMuc3BsaWNlKDApO1xuICAgICAgICAgICAgdGltZW91dCA9IG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5wYXJhbXMpIHJldHVybjtcbiAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHZvaWQgMCwgc25hcFRvVGhyZXNob2xkKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIucGFyYW1zKSByZXR1cm47XG4gICAgICAgICAgICAgIGNvbnN0IHNuYXBUb1RocmVzaG9sZCA9IDAuNTtcbiAgICAgICAgICAgICAgbGFzdEV2ZW50QmVmb3JlU25hcCA9IG5ld0V2ZW50O1xuICAgICAgICAgICAgICByZWNlbnRXaGVlbEV2ZW50cy5zcGxpY2UoMCk7XG4gICAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvQ2xvc2VzdChzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB2b2lkIDAsIHNuYXBUb1RocmVzaG9sZCk7XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlnbm9yZVdoZWVsRXZlbnRzKSBlbWl0KFwic2Nyb2xsXCIsIGUpO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheSAmJiBzd2lwZXIucGFyYW1zLmF1dG9wbGF5RGlzYWJsZU9uSW50ZXJhY3Rpb24pIHN3aXBlci5hdXRvcGxheS5zdG9wKCk7XG4gICAgICAgIGlmIChwYXJhbXMucmVsZWFzZU9uRWRnZXMgJiYgKHBvc2l0aW9uID09PSBzd2lwZXIubWluVHJhbnNsYXRlKCkgfHwgcG9zaXRpb24gPT09IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBldmVudHMyKG1ldGhvZCkge1xuICAgIGxldCB0YXJnZXRFbCA9IHN3aXBlci5lbDtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdldCAhPT0gXCJjb250YWluZXJcIikge1xuICAgICAgdGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZXQpO1xuICAgIH1cbiAgICB0YXJnZXRFbFttZXRob2RdKFwibW91c2VlbnRlclwiLCBoYW5kbGVNb3VzZUVudGVyKTtcbiAgICB0YXJnZXRFbFttZXRob2RdKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVNb3VzZUxlYXZlKTtcbiAgICB0YXJnZXRFbFttZXRob2RdKFwid2hlZWxcIiwgaGFuZGxlKTtcbiAgfVxuICBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgc3dpcGVyLndyYXBwZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgaGFuZGxlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCkgcmV0dXJuIGZhbHNlO1xuICAgIGV2ZW50czIoXCJhZGRFdmVudExpc3RlbmVyXCIpO1xuICAgIHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgc3dpcGVyLndyYXBwZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCkgcmV0dXJuIGZhbHNlO1xuICAgIGV2ZW50czIoXCJyZW1vdmVFdmVudExpc3RlbmVyXCIpO1xuICAgIHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBvbihcImluaXRcIiwgKCkgPT4ge1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmVuYWJsZWQgJiYgc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICBkaXNhYmxlKCk7XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZW5hYmxlZCkgZW5hYmxlKCk7XG4gIH0pO1xuICBvbihcImRlc3Ryb3lcIiwgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIGVuYWJsZSgpO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCkgZGlzYWJsZSgpO1xuICB9KTtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIubW91c2V3aGVlbCwge1xuICAgIGVuYWJsZSxcbiAgICBkaXNhYmxlXG4gIH0pO1xufVxudmFyIGluaXRfbW91c2V3aGVlbCA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvbW91c2V3aGVlbC5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvY3JlYXRlLWVsZW1lbnQtaWYtbm90LWRlZmluZWQubWpzXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkKHN3aXBlciwgb3JpZ2luYWxQYXJhbXMsIHBhcmFtcywgY2hlY2tQcm9wcykge1xuICBpZiAoc3dpcGVyLnBhcmFtcy5jcmVhdGVFbGVtZW50cykge1xuICAgIE9iamVjdC5rZXlzKGNoZWNrUHJvcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKCFwYXJhbXNba2V5XSAmJiBwYXJhbXMuYXV0byA9PT0gdHJ1ZSkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGVsZW1lbnRDaGlsZHJlbihzd2lwZXIuZWwsIGAuJHtjaGVja1Byb3BzW2tleV19YClbMF07XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50MihcImRpdlwiLCBjaGVja1Byb3BzW2tleV0pO1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gY2hlY2tQcm9wc1trZXldO1xuICAgICAgICAgIHN3aXBlci5lbC5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcGFyYW1zW2tleV0gPSBlbGVtZW50O1xuICAgICAgICBvcmlnaW5hbFBhcmFtc1trZXldID0gZWxlbWVudDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcGFyYW1zO1xufVxudmFyIGluaXRfY3JlYXRlX2VsZW1lbnRfaWZfbm90X2RlZmluZWQgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvY3JlYXRlLWVsZW1lbnQtaWYtbm90LWRlZmluZWQubWpzXCIoKSB7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL25hdmlnYXRpb24ubWpzXG5mdW5jdGlvbiBOYXZpZ2F0aW9uKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgZXh0ZW5kUGFyYW1zLFxuICAgIG9uLFxuICAgIGVtaXRcbiAgfSA9IF9yZWY7XG4gIGV4dGVuZFBhcmFtcyh7XG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiBudWxsLFxuICAgICAgcHJldkVsOiBudWxsLFxuICAgICAgaGlkZU9uQ2xpY2s6IGZhbHNlLFxuICAgICAgZGlzYWJsZWRDbGFzczogXCJzd2lwZXItYnV0dG9uLWRpc2FibGVkXCIsXG4gICAgICBoaWRkZW5DbGFzczogXCJzd2lwZXItYnV0dG9uLWhpZGRlblwiLFxuICAgICAgbG9ja0NsYXNzOiBcInN3aXBlci1idXR0b24tbG9ja1wiLFxuICAgICAgbmF2aWdhdGlvbkRpc2FibGVkQ2xhc3M6IFwic3dpcGVyLW5hdmlnYXRpb24tZGlzYWJsZWRcIlxuICAgIH1cbiAgfSk7XG4gIHN3aXBlci5uYXZpZ2F0aW9uID0ge1xuICAgIG5leHRFbDogbnVsbCxcbiAgICBwcmV2RWw6IG51bGxcbiAgfTtcbiAgZnVuY3Rpb24gZ2V0RWwoZWwpIHtcbiAgICBsZXQgcmVzO1xuICAgIGlmIChlbCAmJiB0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIgJiYgc3dpcGVyLmlzRWxlbWVudCkge1xuICAgICAgcmVzID0gc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3IoZWwpIHx8IHN3aXBlci5ob3N0RWwucXVlcnlTZWxlY3RvcihlbCk7XG4gICAgICBpZiAocmVzKSByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoZWwpIHtcbiAgICAgIGlmICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpIHJlcyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsKV07XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJiB0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIgJiYgcmVzICYmIHJlcy5sZW5ndGggPiAxICYmIHN3aXBlci5lbC5xdWVyeVNlbGVjdG9yQWxsKGVsKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmVzID0gc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgICAgfSBlbHNlIGlmIChyZXMgJiYgcmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXMgPSByZXNbMF07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbCAmJiAhcmVzKSByZXR1cm4gZWw7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBmdW5jdGlvbiB0b2dnbGVFbChlbCwgZGlzYWJsZWQpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb247XG4gICAgZWwgPSBtYWtlRWxlbWVudHNBcnJheShlbCk7XG4gICAgZWwuZm9yRWFjaCgoc3ViRWwpID0+IHtcbiAgICAgIGlmIChzdWJFbCkge1xuICAgICAgICBzdWJFbC5jbGFzc0xpc3RbZGlzYWJsZWQgPyBcImFkZFwiIDogXCJyZW1vdmVcIl0oLi4ucGFyYW1zLmRpc2FibGVkQ2xhc3Muc3BsaXQoXCIgXCIpKTtcbiAgICAgICAgaWYgKHN1YkVsLnRhZ05hbWUgPT09IFwiQlVUVE9OXCIpIHN1YkVsLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgICAgICBzdWJFbC5jbGFzc0xpc3Rbc3dpcGVyLmlzTG9ja2VkID8gXCJhZGRcIiA6IFwicmVtb3ZlXCJdKHBhcmFtcy5sb2NrQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gdXBkYXRlMigpIHtcbiAgICBjb25zdCB7XG4gICAgICBuZXh0RWwsXG4gICAgICBwcmV2RWxcbiAgICB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgdG9nZ2xlRWwocHJldkVsLCBmYWxzZSk7XG4gICAgICB0b2dnbGVFbChuZXh0RWwsIGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdG9nZ2xlRWwocHJldkVsLCBzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMucmV3aW5kKTtcbiAgICB0b2dnbGVFbChuZXh0RWwsIHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5yZXdpbmQpO1xuICB9XG4gIGZ1bmN0aW9uIG9uUHJldkNsaWNrKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZyAmJiAhc3dpcGVyLnBhcmFtcy5sb29wICYmICFzd2lwZXIucGFyYW1zLnJld2luZCkgcmV0dXJuO1xuICAgIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICBlbWl0KFwibmF2aWdhdGlvblByZXZcIik7XG4gIH1cbiAgZnVuY3Rpb24gb25OZXh0Q2xpY2soZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmxvb3AgJiYgIXN3aXBlci5wYXJhbXMucmV3aW5kKSByZXR1cm47XG4gICAgc3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgIGVtaXQoXCJuYXZpZ2F0aW9uTmV4dFwiKTtcbiAgfVxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbjtcbiAgICBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24gPSBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkKHN3aXBlciwgc3dpcGVyLm9yaWdpbmFsUGFyYW1zLm5hdmlnYXRpb24sIHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbiwge1xuICAgICAgbmV4dEVsOiBcInN3aXBlci1idXR0b24tbmV4dFwiLFxuICAgICAgcHJldkVsOiBcInN3aXBlci1idXR0b24tcHJldlwiXG4gICAgfSk7XG4gICAgaWYgKCEocGFyYW1zLm5leHRFbCB8fCBwYXJhbXMucHJldkVsKSkgcmV0dXJuO1xuICAgIGxldCBuZXh0RWwgPSBnZXRFbChwYXJhbXMubmV4dEVsKTtcbiAgICBsZXQgcHJldkVsID0gZ2V0RWwocGFyYW1zLnByZXZFbCk7XG4gICAgT2JqZWN0LmFzc2lnbihzd2lwZXIubmF2aWdhdGlvbiwge1xuICAgICAgbmV4dEVsLFxuICAgICAgcHJldkVsXG4gICAgfSk7XG4gICAgbmV4dEVsID0gbWFrZUVsZW1lbnRzQXJyYXkobmV4dEVsKTtcbiAgICBwcmV2RWwgPSBtYWtlRWxlbWVudHNBcnJheShwcmV2RWwpO1xuICAgIGNvbnN0IGluaXRCdXR0b24gPSAoZWwsIGRpcikgPT4ge1xuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkaXIgPT09IFwibmV4dFwiID8gb25OZXh0Q2xpY2sgOiBvblByZXZDbGljayk7XG4gICAgICB9XG4gICAgICBpZiAoIXN3aXBlci5lbmFibGVkICYmIGVsKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4ucGFyYW1zLmxvY2tDbGFzcy5zcGxpdChcIiBcIikpO1xuICAgICAgfVxuICAgIH07XG4gICAgbmV4dEVsLmZvckVhY2goKGVsKSA9PiBpbml0QnV0dG9uKGVsLCBcIm5leHRcIikpO1xuICAgIHByZXZFbC5mb3JFYWNoKChlbCkgPT4gaW5pdEJ1dHRvbihlbCwgXCJwcmV2XCIpKTtcbiAgfVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGxldCB7XG4gICAgICBuZXh0RWwsXG4gICAgICBwcmV2RWxcbiAgICB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgbmV4dEVsID0gbWFrZUVsZW1lbnRzQXJyYXkobmV4dEVsKTtcbiAgICBwcmV2RWwgPSBtYWtlRWxlbWVudHNBcnJheShwcmV2RWwpO1xuICAgIGNvbnN0IGRlc3Ryb3lCdXR0b24gPSAoZWwsIGRpcikgPT4ge1xuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRpciA9PT0gXCJuZXh0XCIgPyBvbk5leHRDbGljayA6IG9uUHJldkNsaWNrKTtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmRpc2FibGVkQ2xhc3Muc3BsaXQoXCIgXCIpKTtcbiAgICB9O1xuICAgIG5leHRFbC5mb3JFYWNoKChlbCkgPT4gZGVzdHJveUJ1dHRvbihlbCwgXCJuZXh0XCIpKTtcbiAgICBwcmV2RWwuZm9yRWFjaCgoZWwpID0+IGRlc3Ryb3lCdXR0b24oZWwsIFwicHJldlwiKSk7XG4gIH1cbiAgb24oXCJpbml0XCIsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICBkaXNhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXQoKTtcbiAgICAgIHVwZGF0ZTIoKTtcbiAgICB9XG4gIH0pO1xuICBvbihcInRvRWRnZSBmcm9tRWRnZSBsb2NrIHVubG9ja1wiLCAoKSA9PiB7XG4gICAgdXBkYXRlMigpO1xuICB9KTtcbiAgb24oXCJkZXN0cm95XCIsICgpID0+IHtcbiAgICBkZXN0cm95KCk7XG4gIH0pO1xuICBvbihcImVuYWJsZSBkaXNhYmxlXCIsICgpID0+IHtcbiAgICBsZXQge1xuICAgICAgbmV4dEVsLFxuICAgICAgcHJldkVsXG4gICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgIG5leHRFbCA9IG1ha2VFbGVtZW50c0FycmF5KG5leHRFbCk7XG4gICAgcHJldkVsID0gbWFrZUVsZW1lbnRzQXJyYXkocHJldkVsKTtcbiAgICBpZiAoc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgIHVwZGF0ZTIoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgWy4uLm5leHRFbCwgLi4ucHJldkVsXS5maWx0ZXIoKGVsKSA9PiAhIWVsKS5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LmFkZChzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24ubG9ja0NsYXNzKSk7XG4gIH0pO1xuICBvbihcImNsaWNrXCIsIChfcywgZSkgPT4ge1xuICAgIGxldCB7XG4gICAgICBuZXh0RWwsXG4gICAgICBwcmV2RWxcbiAgICB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgbmV4dEVsID0gbWFrZUVsZW1lbnRzQXJyYXkobmV4dEVsKTtcbiAgICBwcmV2RWwgPSBtYWtlRWxlbWVudHNBcnJheShwcmV2RWwpO1xuICAgIGNvbnN0IHRhcmdldEVsID0gZS50YXJnZXQ7XG4gICAgbGV0IHRhcmdldElzQnV0dG9uID0gcHJldkVsLmluY2x1ZGVzKHRhcmdldEVsKSB8fCBuZXh0RWwuaW5jbHVkZXModGFyZ2V0RWwpO1xuICAgIGlmIChzd2lwZXIuaXNFbGVtZW50ICYmICF0YXJnZXRJc0J1dHRvbikge1xuICAgICAgY29uc3QgcGF0aCA9IGUucGF0aCB8fCBlLmNvbXBvc2VkUGF0aCAmJiBlLmNvbXBvc2VkUGF0aCgpO1xuICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgdGFyZ2V0SXNCdXR0b24gPSBwYXRoLmZpbmQoKHBhdGhFbCkgPT4gbmV4dEVsLmluY2x1ZGVzKHBhdGhFbCkgfHwgcHJldkVsLmluY2x1ZGVzKHBhdGhFbCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGVPbkNsaWNrICYmICF0YXJnZXRJc0J1dHRvbikge1xuICAgICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbiAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uY2xpY2thYmxlICYmIChzd2lwZXIucGFnaW5hdGlvbi5lbCA9PT0gdGFyZ2V0RWwgfHwgc3dpcGVyLnBhZ2luYXRpb24uZWwuY29udGFpbnModGFyZ2V0RWwpKSkgcmV0dXJuO1xuICAgICAgbGV0IGlzSGlkZGVuO1xuICAgICAgaWYgKG5leHRFbC5sZW5ndGgpIHtcbiAgICAgICAgaXNIaWRkZW4gPSBuZXh0RWxbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcyk7XG4gICAgICB9IGVsc2UgaWYgKHByZXZFbC5sZW5ndGgpIHtcbiAgICAgICAgaXNIaWRkZW4gPSBwcmV2RWxbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcyk7XG4gICAgICB9XG4gICAgICBpZiAoaXNIaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgZW1pdChcIm5hdmlnYXRpb25TaG93XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW1pdChcIm5hdmlnYXRpb25IaWRlXCIpO1xuICAgICAgfVxuICAgICAgWy4uLm5leHRFbCwgLi4ucHJldkVsXS5maWx0ZXIoKGVsKSA9PiAhIWVsKS5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LnRvZ2dsZShzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpKTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBlbmFibGUgPSAoKSA9PiB7XG4gICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLm5hdmlnYXRpb25EaXNhYmxlZENsYXNzLnNwbGl0KFwiIFwiKSk7XG4gICAgaW5pdCgpO1xuICAgIHVwZGF0ZTIoKTtcbiAgfTtcbiAgY29uc3QgZGlzYWJsZSA9ICgpID0+IHtcbiAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LmFkZCguLi5zd2lwZXIucGFyYW1zLm5hdmlnYXRpb24ubmF2aWdhdGlvbkRpc2FibGVkQ2xhc3Muc3BsaXQoXCIgXCIpKTtcbiAgICBkZXN0cm95KCk7XG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLm5hdmlnYXRpb24sIHtcbiAgICBlbmFibGUsXG4gICAgZGlzYWJsZSxcbiAgICB1cGRhdGU6IHVwZGF0ZTIsXG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH0pO1xufVxudmFyIGluaXRfbmF2aWdhdGlvbiA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvbmF2aWdhdGlvbi5tanNcIigpIHtcbiAgICBpbml0X2NyZWF0ZV9lbGVtZW50X2lmX25vdF9kZWZpbmVkKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvY2xhc3Nlcy10by1zZWxlY3Rvci5tanNcbnZhciBpbml0X2NsYXNzZXNfdG9fc2VsZWN0b3IgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvY2xhc3Nlcy10by1zZWxlY3Rvci5tanNcIigpIHtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9wYWdpbmF0aW9uLm1qc1xudmFyIGluaXRfcGFnaW5hdGlvbiA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvcGFnaW5hdGlvbi5tanNcIigpIHtcbiAgICBpbml0X2NsYXNzZXNfdG9fc2VsZWN0b3IoKTtcbiAgICBpbml0X2NyZWF0ZV9lbGVtZW50X2lmX25vdF9kZWZpbmVkKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3Njcm9sbGJhci5tanNcbnZhciBpbml0X3Njcm9sbGJhciA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvc2Nyb2xsYmFyLm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gICAgaW5pdF9jcmVhdGVfZWxlbWVudF9pZl9ub3RfZGVmaW5lZCgpO1xuICAgIGluaXRfY2xhc3Nlc190b19zZWxlY3RvcigpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3BhcmFsbGF4Lm1qc1xudmFyIGluaXRfcGFyYWxsYXggPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3BhcmFsbGF4Lm1qc1wiKCkge1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy96b29tLm1qc1xudmFyIGluaXRfem9vbSA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvem9vbS5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2NvbnRyb2xsZXIubWpzXG52YXIgaW5pdF9jb250cm9sbGVyID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9jb250cm9sbGVyLm1qc1wiKCkge1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9hMTF5Lm1qc1xudmFyIGluaXRfYTExeSA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvYTExeS5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gICAgaW5pdF9jbGFzc2VzX3RvX3NlbGVjdG9yKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2hpc3RvcnkubWpzXG52YXIgaW5pdF9oaXN0b3J5ID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9oaXN0b3J5Lm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9oYXNoLW5hdmlnYXRpb24ubWpzXG52YXIgaW5pdF9oYXNoX25hdmlnYXRpb24gPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2hhc2gtbmF2aWdhdGlvbi5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2F1dG9wbGF5Lm1qc1xudmFyIGluaXRfYXV0b3BsYXkgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2F1dG9wbGF5Lm1qc1wiKCkge1xuICAgIGluaXRfc3NyX3dpbmRvd19lc20oKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy90aHVtYnMubWpzXG52YXIgaW5pdF90aHVtYnMgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL3RodW1icy5tanNcIigpIHtcbiAgICBpbml0X3Nzcl93aW5kb3dfZXNtKCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2ZyZWUtbW9kZS5tanNcbnZhciBpbml0X2ZyZWVfbW9kZSA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZnJlZS1tb2RlLm1qc1wiKCkge1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9ncmlkLm1qc1xudmFyIGluaXRfZ3JpZCA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZ3JpZC5tanNcIigpIHtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9tYW5pcHVsYXRpb24ubWpzXG5mdW5jdGlvbiBhcHBlbmRTbGlkZShzbGlkZXMpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBzbGlkZXNFbFxuICB9ID0gc3dpcGVyO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgfVxuICBjb25zdCBhcHBlbmRFbGVtZW50ID0gKHNsaWRlRWwpID0+IHtcbiAgICBpZiAodHlwZW9mIHNsaWRlRWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IHRlbXBET00gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdGVtcERPTS5pbm5lckhUTUwgPSBzbGlkZUVsO1xuICAgICAgc2xpZGVzRWwuYXBwZW5kKHRlbXBET00uY2hpbGRyZW5bMF0pO1xuICAgICAgdGVtcERPTS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZXNFbC5hcHBlbmQoc2xpZGVFbCk7XG4gICAgfVxuICB9O1xuICBpZiAodHlwZW9mIHNsaWRlcyA9PT0gXCJvYmplY3RcIiAmJiBcImxlbmd0aFwiIGluIHNsaWRlcykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoc2xpZGVzW2ldKSBhcHBlbmRFbGVtZW50KHNsaWRlc1tpXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFwcGVuZEVsZW1lbnQoc2xpZGVzKTtcbiAgfVxuICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gIH1cbiAgaWYgKCFwYXJhbXMub2JzZXJ2ZXIgfHwgc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHN3aXBlci51cGRhdGUoKTtcbiAgfVxufVxuZnVuY3Rpb24gcHJlcGVuZFNsaWRlKHNsaWRlcykge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIGFjdGl2ZUluZGV4LFxuICAgIHNsaWRlc0VsXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICB9XG4gIGxldCBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgMTtcbiAgY29uc3QgcHJlcGVuZEVsZW1lbnQgPSAoc2xpZGVFbCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygc2xpZGVFbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgdGVtcERPTSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0ZW1wRE9NLmlubmVySFRNTCA9IHNsaWRlRWw7XG4gICAgICBzbGlkZXNFbC5wcmVwZW5kKHRlbXBET00uY2hpbGRyZW5bMF0pO1xuICAgICAgdGVtcERPTS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZXNFbC5wcmVwZW5kKHNsaWRlRWwpO1xuICAgIH1cbiAgfTtcbiAgaWYgKHR5cGVvZiBzbGlkZXMgPT09IFwib2JqZWN0XCIgJiYgXCJsZW5ndGhcIiBpbiBzbGlkZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHNsaWRlc1tpXSkgcHJlcGVuZEVsZW1lbnQoc2xpZGVzW2ldKTtcbiAgICB9XG4gICAgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleCArIHNsaWRlcy5sZW5ndGg7XG4gIH0gZWxzZSB7XG4gICAgcHJlcGVuZEVsZW1lbnQoc2xpZGVzKTtcbiAgfVxuICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gIH1cbiAgaWYgKCFwYXJhbXMub2JzZXJ2ZXIgfHwgc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHN3aXBlci51cGRhdGUoKTtcbiAgfVxuICBzd2lwZXIuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCwgMCwgZmFsc2UpO1xufVxuZnVuY3Rpb24gYWRkU2xpZGUoaW5kZXgsIHNsaWRlcykge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIGFjdGl2ZUluZGV4LFxuICAgIHNsaWRlc0VsXG4gIH0gPSBzd2lwZXI7XG4gIGxldCBhY3RpdmVJbmRleEJ1ZmZlciA9IGFjdGl2ZUluZGV4O1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBhY3RpdmVJbmRleEJ1ZmZlciAtPSBzd2lwZXIubG9vcGVkU2xpZGVzO1xuICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgfVxuICBjb25zdCBiYXNlTGVuZ3RoID0gc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG4gIGlmIChpbmRleCA8PSAwKSB7XG4gICAgc3dpcGVyLnByZXBlbmRTbGlkZShzbGlkZXMpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaW5kZXggPj0gYmFzZUxlbmd0aCkge1xuICAgIHN3aXBlci5hcHBlbmRTbGlkZShzbGlkZXMpO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleEJ1ZmZlciA+IGluZGV4ID8gYWN0aXZlSW5kZXhCdWZmZXIgKyAxIDogYWN0aXZlSW5kZXhCdWZmZXI7XG4gIGNvbnN0IHNsaWRlc0J1ZmZlciA9IFtdO1xuICBmb3IgKGxldCBpID0gYmFzZUxlbmd0aCAtIDE7IGkgPj0gaW5kZXg7IGkgLT0gMSkge1xuICAgIGNvbnN0IGN1cnJlbnRTbGlkZSA9IHN3aXBlci5zbGlkZXNbaV07XG4gICAgY3VycmVudFNsaWRlLnJlbW92ZSgpO1xuICAgIHNsaWRlc0J1ZmZlci51bnNoaWZ0KGN1cnJlbnRTbGlkZSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBzbGlkZXMgPT09IFwib2JqZWN0XCIgJiYgXCJsZW5ndGhcIiBpbiBzbGlkZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHNsaWRlc1tpXSkgc2xpZGVzRWwuYXBwZW5kKHNsaWRlc1tpXSk7XG4gICAgfVxuICAgIG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXhCdWZmZXIgPiBpbmRleCA/IGFjdGl2ZUluZGV4QnVmZmVyICsgc2xpZGVzLmxlbmd0aCA6IGFjdGl2ZUluZGV4QnVmZmVyO1xuICB9IGVsc2Uge1xuICAgIHNsaWRlc0VsLmFwcGVuZChzbGlkZXMpO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzQnVmZmVyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgc2xpZGVzRWwuYXBwZW5kKHNsaWRlc0J1ZmZlcltpXSk7XG4gIH1cbiAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICB9XG4gIGlmICghcGFyYW1zLm9ic2VydmVyIHx8IHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICBzd2lwZXIudXBkYXRlKCk7XG4gIH1cbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXggKyBzd2lwZXIubG9vcGVkU2xpZGVzLCAwLCBmYWxzZSk7XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXgsIDAsIGZhbHNlKTtcbiAgfVxufVxuZnVuY3Rpb24gcmVtb3ZlU2xpZGUoc2xpZGVzSW5kZXhlcykge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIGFjdGl2ZUluZGV4XG4gIH0gPSBzd2lwZXI7XG4gIGxldCBhY3RpdmVJbmRleEJ1ZmZlciA9IGFjdGl2ZUluZGV4O1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBhY3RpdmVJbmRleEJ1ZmZlciAtPSBzd2lwZXIubG9vcGVkU2xpZGVzO1xuICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICB9XG4gIGxldCBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4QnVmZmVyO1xuICBsZXQgaW5kZXhUb1JlbW92ZTtcbiAgaWYgKHR5cGVvZiBzbGlkZXNJbmRleGVzID09PSBcIm9iamVjdFwiICYmIFwibGVuZ3RoXCIgaW4gc2xpZGVzSW5kZXhlcykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzSW5kZXhlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaW5kZXhUb1JlbW92ZSA9IHNsaWRlc0luZGV4ZXNbaV07XG4gICAgICBpZiAoc3dpcGVyLnNsaWRlc1tpbmRleFRvUmVtb3ZlXSkgc3dpcGVyLnNsaWRlc1tpbmRleFRvUmVtb3ZlXS5yZW1vdmUoKTtcbiAgICAgIGlmIChpbmRleFRvUmVtb3ZlIDwgbmV3QWN0aXZlSW5kZXgpIG5ld0FjdGl2ZUluZGV4IC09IDE7XG4gICAgfVxuICAgIG5ld0FjdGl2ZUluZGV4ID0gTWF0aC5tYXgobmV3QWN0aXZlSW5kZXgsIDApO1xuICB9IGVsc2Uge1xuICAgIGluZGV4VG9SZW1vdmUgPSBzbGlkZXNJbmRleGVzO1xuICAgIGlmIChzd2lwZXIuc2xpZGVzW2luZGV4VG9SZW1vdmVdKSBzd2lwZXIuc2xpZGVzW2luZGV4VG9SZW1vdmVdLnJlbW92ZSgpO1xuICAgIGlmIChpbmRleFRvUmVtb3ZlIDwgbmV3QWN0aXZlSW5kZXgpIG5ld0FjdGl2ZUluZGV4IC09IDE7XG4gICAgbmV3QWN0aXZlSW5kZXggPSBNYXRoLm1heChuZXdBY3RpdmVJbmRleCwgMCk7XG4gIH1cbiAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICB9XG4gIGlmICghcGFyYW1zLm9ic2VydmVyIHx8IHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICBzd2lwZXIudXBkYXRlKCk7XG4gIH1cbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXggKyBzd2lwZXIubG9vcGVkU2xpZGVzLCAwLCBmYWxzZSk7XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXgsIDAsIGZhbHNlKTtcbiAgfVxufVxuZnVuY3Rpb24gcmVtb3ZlQWxsU2xpZGVzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBzbGlkZXNJbmRleGVzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyLnNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHNsaWRlc0luZGV4ZXMucHVzaChpKTtcbiAgfVxuICBzd2lwZXIucmVtb3ZlU2xpZGUoc2xpZGVzSW5kZXhlcyk7XG59XG5mdW5jdGlvbiBNYW5pcHVsYXRpb24oX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlclxuICB9ID0gX3JlZjtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICBhcHBlbmRTbGlkZTogYXBwZW5kU2xpZGUuYmluZChzd2lwZXIpLFxuICAgIHByZXBlbmRTbGlkZTogcHJlcGVuZFNsaWRlLmJpbmQoc3dpcGVyKSxcbiAgICBhZGRTbGlkZTogYWRkU2xpZGUuYmluZChzd2lwZXIpLFxuICAgIHJlbW92ZVNsaWRlOiByZW1vdmVTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgcmVtb3ZlQWxsU2xpZGVzOiByZW1vdmVBbGxTbGlkZXMuYmluZChzd2lwZXIpXG4gIH0pO1xufVxudmFyIGluaXRfbWFuaXB1bGF0aW9uID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9tYW5pcHVsYXRpb24ubWpzXCIoKSB7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtaW5pdC5tanNcbnZhciBpbml0X2VmZmVjdF9pbml0ID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2VmZmVjdC1pbml0Lm1qc1wiKCkge1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvZWZmZWN0LXRhcmdldC5tanNcbnZhciBpbml0X2VmZmVjdF90YXJnZXQgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvZWZmZWN0LXRhcmdldC5tanNcIigpIHtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtdmlydHVhbC10cmFuc2l0aW9uLWVuZC5tanNcbnZhciBpbml0X2VmZmVjdF92aXJ0dWFsX3RyYW5zaXRpb25fZW5kID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2VmZmVjdC12aXJ0dWFsLXRyYW5zaXRpb24tZW5kLm1qc1wiKCkge1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtZmFkZS5tanNcbnZhciBpbml0X2VmZmVjdF9mYWRlID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtZmFkZS5tanNcIigpIHtcbiAgICBpbml0X2VmZmVjdF9pbml0KCk7XG4gICAgaW5pdF9lZmZlY3RfdGFyZ2V0KCk7XG4gICAgaW5pdF9lZmZlY3RfdmlydHVhbF90cmFuc2l0aW9uX2VuZCgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtY3ViZS5tanNcbnZhciBpbml0X2VmZmVjdF9jdWJlID0gX19lc20oe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtY3ViZS5tanNcIigpIHtcbiAgICBpbml0X2VmZmVjdF9pbml0KCk7XG4gICAgaW5pdF91dGlscygpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvY3JlYXRlLXNoYWRvdy5tanNcbnZhciBpbml0X2NyZWF0ZV9zaGFkb3cgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvY3JlYXRlLXNoYWRvdy5tanNcIigpIHtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWZsaXAubWpzXG52YXIgaW5pdF9lZmZlY3RfZmxpcCA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWZsaXAubWpzXCIoKSB7XG4gICAgaW5pdF9jcmVhdGVfc2hhZG93KCk7XG4gICAgaW5pdF9lZmZlY3RfaW5pdCgpO1xuICAgIGluaXRfZWZmZWN0X3RhcmdldCgpO1xuICAgIGluaXRfZWZmZWN0X3ZpcnR1YWxfdHJhbnNpdGlvbl9lbmQoKTtcbiAgICBpbml0X3V0aWxzKCk7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvZWZmZWN0LWNvdmVyZmxvdy5tanNcbnZhciBpbml0X2VmZmVjdF9jb3ZlcmZsb3cgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1jb3ZlcmZsb3cubWpzXCIoKSB7XG4gICAgaW5pdF9jcmVhdGVfc2hhZG93KCk7XG4gICAgaW5pdF9lZmZlY3RfaW5pdCgpO1xuICAgIGluaXRfZWZmZWN0X3RhcmdldCgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtY3JlYXRpdmUubWpzXG52YXIgaW5pdF9lZmZlY3RfY3JlYXRpdmUgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1jcmVhdGl2ZS5tanNcIigpIHtcbiAgICBpbml0X2NyZWF0ZV9zaGFkb3coKTtcbiAgICBpbml0X2VmZmVjdF9pbml0KCk7XG4gICAgaW5pdF9lZmZlY3RfdGFyZ2V0KCk7XG4gICAgaW5pdF9lZmZlY3RfdmlydHVhbF90cmFuc2l0aW9uX2VuZCgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9lZmZlY3QtY2FyZHMubWpzXG52YXIgaW5pdF9lZmZlY3RfY2FyZHMgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1jYXJkcy5tanNcIigpIHtcbiAgICBpbml0X2NyZWF0ZV9zaGFkb3coKTtcbiAgICBpbml0X2VmZmVjdF9pbml0KCk7XG4gICAgaW5pdF9lZmZlY3RfdGFyZ2V0KCk7XG4gICAgaW5pdF9lZmZlY3RfdmlydHVhbF90cmFuc2l0aW9uX2VuZCgpO1xuICAgIGluaXRfdXRpbHMoKTtcbiAgfVxufSk7XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9pbmRleC5tanNcbnZhciBpbml0X21vZHVsZXMgPSBfX2VzbSh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2luZGV4Lm1qc1wiKCkge1xuICAgIGluaXRfdmlydHVhbCgpO1xuICAgIGluaXRfa2V5Ym9hcmQoKTtcbiAgICBpbml0X21vdXNld2hlZWwoKTtcbiAgICBpbml0X25hdmlnYXRpb24oKTtcbiAgICBpbml0X3BhZ2luYXRpb24oKTtcbiAgICBpbml0X3Njcm9sbGJhcigpO1xuICAgIGluaXRfcGFyYWxsYXgoKTtcbiAgICBpbml0X3pvb20oKTtcbiAgICBpbml0X2NvbnRyb2xsZXIoKTtcbiAgICBpbml0X2ExMXkoKTtcbiAgICBpbml0X2hpc3RvcnkoKTtcbiAgICBpbml0X2hhc2hfbmF2aWdhdGlvbigpO1xuICAgIGluaXRfYXV0b3BsYXkoKTtcbiAgICBpbml0X3RodW1icygpO1xuICAgIGluaXRfZnJlZV9tb2RlKCk7XG4gICAgaW5pdF9ncmlkKCk7XG4gICAgaW5pdF9tYW5pcHVsYXRpb24oKTtcbiAgICBpbml0X2VmZmVjdF9mYWRlKCk7XG4gICAgaW5pdF9lZmZlY3RfY3ViZSgpO1xuICAgIGluaXRfZWZmZWN0X2ZsaXAoKTtcbiAgICBpbml0X2VmZmVjdF9jb3ZlcmZsb3coKTtcbiAgICBpbml0X2VmZmVjdF9jcmVhdGl2ZSgpO1xuICAgIGluaXRfZWZmZWN0X2NhcmRzKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9leHRlbnNpb25zL3N3aXBlci9zd2lwZXIuZXh0ZW5zaW9uLnRzXG5mdW5jdGlvbiBpbml0aWFsaXplU3dpcGVyKHtcbiAgaWQsXG4gIHdpZGdldFNlbGVjdG9yLFxuICBwcmV2QnV0dG9uID0gXCJzd2lwZXItYnV0dG9uLXByZXZcIixcbiAgbmV4dEJ1dHRvbiA9IFwic3dpcGVyLWJ1dHRvbi1uZXh0XCIsXG4gIHBhcmFtc092ZXJyaWRlc1xufSkge1xuICBjb25zdCBwcmV2ID0gd2lkZ2V0U2VsZWN0b3IucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKGAuJHtwcmV2QnV0dG9ufWApO1xuICBjb25zdCBuZXh0ID0gd2lkZ2V0U2VsZWN0b3IucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKGAuJHtuZXh0QnV0dG9ufWApO1xuICBpZiAoIXN3aXBlckNvbnRhaW5lcltpZF0pIHtcbiAgICBzd2lwZXJDb250YWluZXJbaWRdID0ge307XG4gIH1cbiAgY29uc3Qgc3dpcGVySW5zdGFuY2UgPSBzd2lwZXJDb250YWluZXJbaWRdPy5pbnN0YW5jZTtcbiAgaWYgKHN3aXBlckluc3RhbmNlKSB7XG4gICAgaWYgKCFzd2lwZXJJbnN0YW5jZS5wYXJhbXM/LmVuYWJsZWQpIHtcbiAgICAgIGVuYWJsZVN3aXBlcihpZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXBlckluc3RhbmNlLmRlc3Ryb3kodHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyQ29udGFpbmVyW2lkXSA9IHsgcGFnZUluZGV4OiAxIH07XG4gIH1cbiAgc3dpcGVyQ29udGFpbmVyW2lkXS5pbnN0YW5jZSA9IG5ldyBTd2lwZXIod2lkZ2V0U2VsZWN0b3IsIHtcbiAgICBtb2R1bGVzOiBbTmF2aWdhdGlvbiwgTWFuaXB1bGF0aW9uLCBLZXlib2FyZCwgTW91c2V3aGVlbF0sXG4gICAgc3BhY2VCZXR3ZWVuOiAxMCxcbiAgICBvYnNlcnZlcjogdHJ1ZSxcbiAgICBncmFiQ3Vyc29yOiB0cnVlLFxuICAgIGFsbG93VG91Y2hNb3ZlOiB0cnVlLFxuICAgIGRpcmVjdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICBub3JtYWxpemVTbGlkZUluZGV4OiB0cnVlLFxuICAgIHdhdGNoT3ZlcmZsb3c6IHRydWUsXG4gICAgbW91c2V3aGVlbDoge1xuICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICB9LFxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIGVuYWJsZWQ6ICEhKHByZXYgJiYgbmV4dCksXG4gICAgICBuZXh0RWw6IG5leHQsXG4gICAgICBwcmV2RWw6IHByZXZcbiAgICB9LFxuICAgIHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxuICAgIC4uLnBhcmFtc092ZXJyaWRlc1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJlZnJlc2hTd2lwZXIoaWQpIHtcbiAgaWYgKHN3aXBlckNvbnRhaW5lcltpZF0/Lmluc3RhbmNlKSB7XG4gICAgc3dpcGVyQ29udGFpbmVyW2lkXS5pbnN0YW5jZS51cGRhdGUoKTtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0U3dpcGVySW5kZXhmb3JUaWxlKHN3aXBlclNlbGVjdG9yLCB0aWxlSWQsIGxvb2t1cEF0dHIpIHtcbiAgY29uc3Qgc2xpZGVFbGVtZW50cyA9IHN3aXBlclNlbGVjdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3dpcGVyLXNsaWRlXCIpO1xuICBjb25zdCBpbmRleCA9ICgoKSA9PiB7XG4gICAgaWYgKGxvb2t1cEF0dHIpIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHNsaWRlRWxlbWVudHMpLmZpbmRJbmRleChcbiAgICAgICAgKGVsZW1lbnQpID0+IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKSA9PT0gdGlsZUlkICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGxvb2t1cEF0dHIubmFtZSkgPT09IGxvb2t1cEF0dHIudmFsdWVcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHNsaWRlRWxlbWVudHMpLmZpbmRJbmRleCgoZWxlbWVudCkgPT4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpID09PSB0aWxlSWQpO1xuICB9KSgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gMCA6IGluZGV4O1xufVxuZnVuY3Rpb24gZGlzYWJsZVN3aXBlcihpZCkge1xuICBzd2lwZXJDb250YWluZXJbaWRdPy5pbnN0YW5jZT8uZGlzYWJsZSgpO1xufVxuZnVuY3Rpb24gZW5hYmxlU3dpcGVyKGlkKSB7XG4gIHN3aXBlckNvbnRhaW5lcltpZF0/Lmluc3RhbmNlPy5lbmFibGUoKTtcbn1cbmZ1bmN0aW9uIGRlc3Ryb3lTd2lwZXIoaWQpIHtcbiAgaWYgKHN3aXBlckNvbnRhaW5lcltpZF0/Lmluc3RhbmNlKSB7XG4gICAgc3dpcGVyQ29udGFpbmVyW2lkXS5pbnN0YW5jZS5kZXN0cm95KHRydWUsIHRydWUpO1xuICAgIGRlbGV0ZSBzd2lwZXJDb250YWluZXJbaWRdO1xuICB9XG59XG5mdW5jdGlvbiBnZXRDbGlja2VkSW5kZXgoaWQpIHtcbiAgaWYgKHN3aXBlckNvbnRhaW5lcltpZF0/Lmluc3RhbmNlKSB7XG4gICAgY29uc3QgY2xpY2tlZFNsaWRlID0gc3dpcGVyQ29udGFpbmVyW2lkXS5pbnN0YW5jZS5jbGlja2VkU2xpZGU7XG4gICAgY29uc3QgaW5kZXhGcm9tQXR0cmlidXRlID0gY2xpY2tlZFNsaWRlLmdldEF0dHJpYnV0ZShcImRhdGEtc3dpcGVyLXNsaWRlLWluZGV4XCIpO1xuICAgIHJldHVybiBpbmRleEZyb21BdHRyaWJ1dGUgJiYgIU51bWJlci5pc05hTihwYXJzZUludChpbmRleEZyb21BdHRyaWJ1dGUpKSA/IHBhcnNlSW50KGluZGV4RnJvbUF0dHJpYnV0ZSkgOiBzd2lwZXJDb250YWluZXJbaWRdLmluc3RhbmNlLmNsaWNrZWRJbmRleDtcbiAgfVxuICByZXR1cm4gMDtcbn1cbmZ1bmN0aW9uIGdldEluc3RhbmNlKGlkKSB7XG4gIHJldHVybiBzd2lwZXJDb250YWluZXJbaWRdPy5pbnN0YW5jZTtcbn1cbmZ1bmN0aW9uIGdldEFjdGl2ZVNsaWRlKGlkKSB7XG4gIHJldHVybiBzd2lwZXJDb250YWluZXJbaWRdPy5pbnN0YW5jZT8ucmVhbEluZGV4IHx8IDA7XG59XG5mdW5jdGlvbiBnZXRBY3RpdmVTbGlkZUVsZW1lbnQoaWQpIHtcbiAgcmV0dXJuIHN3aXBlckNvbnRhaW5lcltpZF0/Lmluc3RhbmNlPy5zbGlkZXNbZ2V0QWN0aXZlU2xpZGUoaWQpIHx8IDBdO1xufVxuZnVuY3Rpb24gaXNTd2lwZXJMb2FkaW5nKGlkKSB7XG4gIGlmIChzd2lwZXJDb250YWluZXJbaWRdICYmIHN3aXBlckNvbnRhaW5lcltpZF0uaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gc3dpcGVyQ29udGFpbmVyW2lkXS5pc0xvYWRpbmc7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gc2V0U3dpcGVyTG9hZGluZ1N0YXR1cyhpZCwgaXNMb2FkaW5nKSB7XG4gIGlmIChzd2lwZXJDb250YWluZXJbaWRdICYmIHN3aXBlckNvbnRhaW5lcltpZF0uaW5zdGFuY2UpIHtcbiAgICBzd2lwZXJDb250YWluZXJbaWRdLmlzTG9hZGluZyA9IGlzTG9hZGluZztcbiAgfVxufVxuZnVuY3Rpb24gdXBkYXRlU3dpcGVySW5zdGFuY2UoaWQsIHVwZGF0ZVByb3BzKSB7XG4gIGlmIChzd2lwZXJDb250YWluZXJbaWRdICYmIHN3aXBlckNvbnRhaW5lcltpZF0uaW5zdGFuY2UpIHtcbiAgICB1cGRhdGVQcm9wcyhzd2lwZXJDb250YWluZXJbaWRdKTtcbiAgfVxufVxudmFyIHN3aXBlckNvbnRhaW5lcjtcbnZhciBpbml0X3N3aXBlcl9leHRlbnNpb24gPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvZXh0ZW5zaW9ucy9zd2lwZXIvc3dpcGVyLmV4dGVuc2lvbi50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfc3dpcGVyKCk7XG4gICAgaW5pdF9tb2R1bGVzKCk7XG4gICAgc3dpcGVyQ29udGFpbmVyID0ge307XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL3Rpa3Rvay1tZXNzYWdlLnRzXG5mdW5jdGlvbiBwbGF5VGlrdG9rVmlkZW8oZnJhbWVXaW5kb3cpIHtcbiAgcG9zdFRpa3Rva01lc3NhZ2UoZnJhbWVXaW5kb3csIFwidW5NdXRlXCIpO1xuICBwb3N0VGlrdG9rTWVzc2FnZShmcmFtZVdpbmRvdywgXCJwbGF5XCIpO1xufVxuZnVuY3Rpb24gcGF1c2VUaWt0b2tWaWRlbyhmcmFtZVdpbmRvdykge1xuICBwb3N0VGlrdG9rTWVzc2FnZShmcmFtZVdpbmRvdywgXCJtdXRlXCIpO1xuICBwb3N0VGlrdG9rTWVzc2FnZShmcmFtZVdpbmRvdywgXCJwYXVzZVwiKTtcbiAgcG9zdFRpa3Rva01lc3NhZ2UoZnJhbWVXaW5kb3csIFwic2Vla1RvXCIsIDApO1xufVxuZnVuY3Rpb24gcG9zdFRpa3Rva01lc3NhZ2UoZnJhbWVXaW5kb3csIHR5cGUsIHZhbHVlKSB7XG4gIGZyYW1lV2luZG93LnBvc3RNZXNzYWdlKHsgdHlwZSwgdmFsdWUsIFwieC10aWt0b2stcGxheWVyXCI6IHRydWUgfSwgXCJodHRwczovL3d3dy50aWt0b2suY29tXCIpO1xufVxudmFyIGluaXRfdGlrdG9rX21lc3NhZ2UgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci90aWt0b2stbWVzc2FnZS50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci9leHBhbmRlZC1zd2lwZXIubG9hZGVyLnRzXG5mdW5jdGlvbiBpbml0aWFsaXplU3dpcGVyRm9yRXhwYW5kZWRUaWxlcyhpbml0aWFsVGlsZUlkLCBsb29rdXBBdHRyKSB7XG4gIGNvbnN0IGV4cGFuZGVkVGlsZSA9IHNkay5xdWVyeVNlbGVjdG9yKFwiZXhwYW5kZWQtdGlsZXNcIik7XG4gIGlmICghZXhwYW5kZWRUaWxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGV4cGFuZGVkIHRpbGUgZWxlbWVudCBub3QgZm91bmRcIik7XG4gIH1cbiAgY29uc3Qgd2lkZ2V0U2VsZWN0b3IgPSBleHBhbmRlZFRpbGUucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItZXhwYW5kZWRcIik7XG4gIGlmICghd2lkZ2V0U2VsZWN0b3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCB3aWRnZXQgVUkgZWxlbWVudC4gRmFpbGVkIHRvIGluaXRpYWxpc2UgR2xpZGVcIik7XG4gIH1cbiAgaW5pdGlhbGl6ZVN3aXBlcih7XG4gICAgaWQ6IFwiZXhwYW5kZWRcIixcbiAgICB3aWRnZXRTZWxlY3RvcixcbiAgICBtb2RlOiBcImV4cGFuZGVkXCIsXG4gICAgcHJldkJ1dHRvbjogXCJzd2lwZXItZXhwYW5kZWQtYnV0dG9uLXByZXZcIixcbiAgICBuZXh0QnV0dG9uOiBcInN3aXBlci1leHBhbmRlZC1idXR0b24tbmV4dFwiLFxuICAgIHBhcmFtc092ZXJyaWRlczoge1xuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIGtleWJvYXJkOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG9ubHlJblZpZXdwb3J0OiBmYWxzZVxuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIGJlZm9yZUluaXQ6IChzd2lwZXIpID0+IHtcbiAgICAgICAgICBjb25zdCB0aWxlSW5kZXggPSBpbml0aWFsVGlsZUlkID8gZ2V0U3dpcGVySW5kZXhmb3JUaWxlKHdpZGdldFNlbGVjdG9yLCBpbml0aWFsVGlsZUlkLCBsb29rdXBBdHRyKSA6IDA7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG9Mb29wKHRpbGVJbmRleCwgMCwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBuYXZpZ2F0aW9uTmV4dDogY29udHJvbFZpZGVvUGxheWJhY2ssXG4gICAgICAgIG5hdmlnYXRpb25QcmV2OiBjb250cm9sVmlkZW9QbGF5YmFja1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBwbGF5TWVkaWFPbkxvYWQoKSB7XG4gIGNvbnN0IHN3aXBlciA9IGdldEluc3RhbmNlKFwiZXhwYW5kZWRcIik7XG4gIGlmIChzd2lwZXIpIHtcbiAgICBjb25zdCBhY3RpdmVFbGVtZW50RGF0YSA9IGdldFN3aXBlclZpZGVvRWxlbWVudChzd2lwZXIsIHN3aXBlci5yZWFsSW5kZXgpO1xuICAgIHRyaWdnZXJQbGF5KGFjdGl2ZUVsZW1lbnREYXRhKTtcbiAgfVxufVxuZnVuY3Rpb24gY29udHJvbFZpZGVvUGxheWJhY2soc3dpcGVyKSB7XG4gIGNvbnN0IGFjdGl2ZUVsZW1lbnQgPSBnZXRTd2lwZXJWaWRlb0VsZW1lbnQoc3dpcGVyLCBzd2lwZXIucmVhbEluZGV4KTtcbiAgY29uc3QgcHJldmlvdXNFbGVtZW50ID0gZ2V0U3dpcGVyVmlkZW9FbGVtZW50KHN3aXBlciwgc3dpcGVyLnByZXZpb3VzSW5kZXgpO1xuICB0cmlnZ2VyUGxheShhY3RpdmVFbGVtZW50KTtcbiAgdHJpZ2dlclBhdXNlKHByZXZpb3VzRWxlbWVudCk7XG59XG5mdW5jdGlvbiB0cmlnZ2VyUGxheShlbGVtZW50RGF0YSkge1xuICBpZiAoIWVsZW1lbnREYXRhKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHN3aXRjaCAoZWxlbWVudERhdGEuc291cmNlKSB7XG4gICAgY2FzZSBcInZpZGVvXCI6IHtcbiAgICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IGVsZW1lbnREYXRhLmVsZW1lbnQ7XG4gICAgICB2aWRlb0VsZW1lbnQucGxheSgpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJ5b3V0dWJlXCI6IHtcbiAgICAgIGNvbnN0IFlvdXR1YmVDb250ZW50V2luZG93ID0gZWxlbWVudERhdGEuZWxlbWVudDtcbiAgICAgIFlvdXR1YmVDb250ZW50V2luZG93LnBsYXkoKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIFwidGlrdG9rXCI6IHtcbiAgICAgIGNvbnN0IHRpa3Rva0ZyYW1lV2luZG93ID0gZWxlbWVudERhdGEuZWxlbWVudDtcbiAgICAgIHBsYXlUaWt0b2tWaWRlbyh0aWt0b2tGcmFtZVdpbmRvdyk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgdmlkZW8gc291cmNlICR7ZWxlbWVudERhdGEuc291cmNlfWApO1xuICB9XG59XG5mdW5jdGlvbiB0cmlnZ2VyUGF1c2UoZWxlbWVudERhdGEpIHtcbiAgaWYgKCFlbGVtZW50RGF0YSkge1xuICAgIHJldHVybjtcbiAgfVxuICBzd2l0Y2ggKGVsZW1lbnREYXRhLnNvdXJjZSkge1xuICAgIGNhc2UgXCJ2aWRlb1wiOiB7XG4gICAgICBjb25zdCB2aWRlb0VsZW1lbnQgPSBlbGVtZW50RGF0YS5lbGVtZW50O1xuICAgICAgdmlkZW9FbGVtZW50LnBhdXNlKCk7XG4gICAgICB2aWRlb0VsZW1lbnQuY3VycmVudFRpbWUgPSAwO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJ5b3V0dWJlXCI6IHtcbiAgICAgIGNvbnN0IFlvdXR1YmVDb250ZW50V2luZG93ID0gZWxlbWVudERhdGEuZWxlbWVudDtcbiAgICAgIFlvdXR1YmVDb250ZW50V2luZG93LnBhdXNlKCk7XG4gICAgICBZb3V0dWJlQ29udGVudFdpbmRvdy5yZXNldCgpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJ0aWt0b2tcIjoge1xuICAgICAgY29uc3QgdGlrdG9rRnJhbWVXaW5kb3cgPSBlbGVtZW50RGF0YS5lbGVtZW50O1xuICAgICAgcGF1c2VUaWt0b2tWaWRlbyh0aWt0b2tGcmFtZVdpbmRvdyk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgdmlkZW8gc291cmNlICR7ZWxlbWVudERhdGEuc291cmNlfWApO1xuICB9XG59XG5mdW5jdGlvbiBnZXRTd2lwZXJWaWRlb0VsZW1lbnQoc3dpcGVyLCBpbmRleCkge1xuICBjb25zdCBlbGVtZW50ID0gc3dpcGVyLnNsaWRlc1tpbmRleF07XG4gIGNvbnN0IHRpbGVJZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgY29uc3QgeW91dHViZUlkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXl0LWlkXCIpO1xuICBpZiAoeW91dHViZUlkKSB7XG4gICAgY29uc3QgeW91dHViZUZyYW1lID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKGBpZnJhbWUjeXQtZnJhbWUtJHt0aWxlSWR9LSR7eW91dHViZUlkfWApO1xuICAgIGlmICh5b3V0dWJlRnJhbWUpIHtcbiAgICAgIHJldHVybiB7IGVsZW1lbnQ6IHlvdXR1YmVGcmFtZS5jb250ZW50V2luZG93LCBzb3VyY2U6IFwieW91dHViZVwiIH07XG4gICAgfVxuICB9XG4gIGNvbnN0IHRpa3Rva0lkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRpa3Rvay1pZFwiKTtcbiAgaWYgKHRpa3Rva0lkKSB7XG4gICAgY29uc3QgdGlrdG9rRnJhbWUgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYGlmcmFtZSN0aWt0b2stZnJhbWUtJHt0aWxlSWR9LSR7dGlrdG9rSWR9YCk7XG4gICAgaWYgKHRpa3Rva0ZyYW1lICYmIHRpa3Rva0ZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcbiAgICAgIHJldHVybiB7IGVsZW1lbnQ6IHRpa3Rva0ZyYW1lLmNvbnRlbnRXaW5kb3csIHNvdXJjZTogXCJ0aWt0b2tcIiB9O1xuICAgIH1cbiAgfVxuICBjb25zdCB2aWRlb0VsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGFuZWwgLnBhbmVsLWxlZnQgLnZpZGVvLWNvbnRlbnQtd3JhcHBlciB2aWRlb1wiKTtcbiAgaWYgKHZpZGVvRWxlbWVudCkge1xuICAgIHJldHVybiB7IGVsZW1lbnQ6IHZpZGVvRWxlbWVudCwgc291cmNlOiBcInZpZGVvXCIgfTtcbiAgfVxuICByZXR1cm4gdm9pZCAwO1xufVxuZnVuY3Rpb24gb25UaWxlRXhwYW5kKHRpbGVJZCkge1xuICBjb25zdCBleHBhbmRlZFRpbGUgPSBzZGsucXVlcnlTZWxlY3RvcihcImV4cGFuZGVkLXRpbGVzXCIpO1xuICBpZiAoIWV4cGFuZGVkVGlsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBleHBhbmRlZCB0aWxlIGVsZW1lbnQgbm90IGZvdW5kXCIpO1xuICB9XG4gIGV4cGFuZGVkVGlsZS5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJleHBhbmRlZC10aWxlLW92ZXJsYXlcIik7XG4gIHdhaXRGb3JFbG0oZXhwYW5kZWRUaWxlLCBbXCIuc3dpcGVyLWV4cGFuZGVkXCJdLCAoKSA9PiB7XG4gICAgY29uc3QgdGlsZUVsZW1lbnQgPSBleHBhbmRlZFRpbGUuc2hhZG93Um9vdD8ucXVlcnlTZWxlY3RvcihgLnN3aXBlci1zbGlkZVtkYXRhLWlkPVwiJHt0aWxlSWR9XCJdYCk7XG4gICAgY29uc3QgeW91dHViZUlkID0gdGlsZUVsZW1lbnQ/LmdldEF0dHJpYnV0ZShcImRhdGEteXQtaWRcIik7XG4gICAgY29uc3QgdGlrdG9rSWQgPSB0aWxlRWxlbWVudD8uZ2V0QXR0cmlidXRlKFwiZGF0YS10aWt0b2staWRcIik7XG4gICAgaWYgKHlvdXR1YmVJZCkge1xuICAgICAgY29uc3QgbG9va3VwWXRBdHRyID0geyBuYW1lOiBcImRhdGEteXQtaWRcIiwgdmFsdWU6IHlvdXR1YmVJZCB9O1xuICAgICAgaW5pdGlhbGl6ZVN3aXBlckZvckV4cGFuZGVkVGlsZXModGlsZUlkLCBsb29rdXBZdEF0dHIpO1xuICAgIH0gZWxzZSBpZiAodGlrdG9rSWQpIHtcbiAgICAgIGNvbnN0IGxvb2t1cFRpa3Rva0F0dHIgPSB7IG5hbWU6IFwiZGF0YS10aWt0b2staWRcIiwgdmFsdWU6IHRpa3Rva0lkIH07XG4gICAgICBpbml0aWFsaXplU3dpcGVyRm9yRXhwYW5kZWRUaWxlcyh0aWxlSWQsIGxvb2t1cFRpa3Rva0F0dHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbml0aWFsaXplU3dpcGVyRm9yRXhwYW5kZWRUaWxlcyh0aWxlSWQpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBvblRpbGVSZW5kZXJlZCgpIHtcbiAgY29uc3QgZXhwYW5kZWRUaWxlc0VsZW1lbnQgPSBzZGsucXVlcnlTZWxlY3RvcihcImV4cGFuZGVkLXRpbGVzXCIpO1xuICBpZiAoIWV4cGFuZGVkVGlsZXNFbGVtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwYW5kZWQgdGlsZXMgZWxlbWVudCBub3QgZm91bmRcIik7XG4gIH1cbiAgY29uc3QgdGlsZXMgPSBleHBhbmRlZFRpbGVzRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnN3aXBlci1zbGlkZVwiKTtcbiAgY29uc3Qgd2lkZ2V0U2VsZWN0b3IgPSBleHBhbmRlZFRpbGVzRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1leHBhbmRlZFwiKTtcbiAgaWYgKCF3aWRnZXRTZWxlY3Rvcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIldpZGdldCBzZWxlY3RvciBmb3IgZXhwYW5kZWQgdGlsZSAoc3dpcGVyLWV4cGFuZGVkKSBpcyBub3QgZm91bmRcIik7XG4gIH1cbiAgc2V0dXBUaWtUb2tQbGF5ZXJSZWFkeUV2ZW50KCk7XG4gIHRpbGVzPy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgc2V0dXBWaWRlb0V2ZW50cyh0aWxlLCB3aWRnZXRTZWxlY3Rvcik7XG4gICAgc2V0dXBZb3V0dWJlRXZlbnRzKHRpbGUsIHdpZGdldFNlbGVjdG9yKTtcbiAgfSk7XG59XG5mdW5jdGlvbiByZWR1Y2VCYWNrZ3JvdW5kQ29udHJvbHNWaXNpYmlsaXR5KHNvdXJjZUlkKSB7XG4gIGlmICghaXNWYWxpZEV2ZW50U291cmNlKHNvdXJjZUlkKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBleHBhbmRlZFRpbGVzRWxlbWVudCA9IHNkay5xdWVyeVNlbGVjdG9yKFwiZXhwYW5kZWQtdGlsZXNcIik7XG4gIGNvbnN0IHdyYXBwZXIgPSBleHBhbmRlZFRpbGVzRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmV4cGFuZGVkLXRpbGUtd3JhcHBlclwiKTtcbiAgaWYgKCF3cmFwcGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IG5hdmlnYXRpb25QcmV2QnV0dG9uID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1leHBhbmRlZC1idXR0b24tcHJldlwiKTtcbiAgY29uc3QgbmF2aWdhdGlvbk5leHRCdXR0b24gPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLWV4cGFuZGVkLWJ1dHRvbi1uZXh0XCIpO1xuICBjb25zdCBleGl0VGlsZUJ1dHRvbiA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi5leGl0XCIpO1xuICBuYXZpZ2F0aW9uTmV4dEJ1dHRvbj8uY2xhc3NMaXN0LmFkZChcInN3aXBlci1idXR0b24tZGlzYWJsZWRcIik7XG4gIG5hdmlnYXRpb25QcmV2QnV0dG9uPy5jbGFzc0xpc3QuYWRkKFwic3dpcGVyLWJ1dHRvbi1kaXNhYmxlZFwiKTtcbiAgaWYgKGV4aXRUaWxlQnV0dG9uKSB7XG4gICAgZXhpdFRpbGVCdXR0b24uc3R5bGUub3BhY2l0eSA9IFwiMC40XCI7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlc2V0QmFja2dyb3VuZENvbnRyb2xzVmlzaWJpbGl0eShzb3VyY2VJZCkge1xuICBpZiAoIWlzVmFsaWRFdmVudFNvdXJjZShzb3VyY2VJZCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZXhwYW5kZWRUaWxlc0VsZW1lbnQgPSBzZGsucXVlcnlTZWxlY3RvcihcImV4cGFuZGVkLXRpbGVzXCIpO1xuICBjb25zdCB3cmFwcGVyID0gZXhwYW5kZWRUaWxlc0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5leHBhbmRlZC10aWxlLXdyYXBwZXJcIik7XG4gIGlmICghd3JhcHBlcikge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBuYXZpZ2F0aW9uUHJldkJ1dHRvbiA9IHdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItZXhwYW5kZWQtYnV0dG9uLXByZXZcIik7XG4gIGNvbnN0IG5hdmlnYXRpb25OZXh0QnV0dG9uID0gd3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1leHBhbmRlZC1idXR0b24tbmV4dFwiKTtcbiAgY29uc3QgZXhpdFRpbGVCdXR0b24gPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIuZXhpdFwiKTtcbiAgbmF2aWdhdGlvbk5leHRCdXR0b24/LmNsYXNzTGlzdC5yZW1vdmUoXCJzd2lwZXItYnV0dG9uLWRpc2FibGVkXCIpO1xuICBuYXZpZ2F0aW9uUHJldkJ1dHRvbj8uY2xhc3NMaXN0LnJlbW92ZShcInN3aXBlci1idXR0b24tZGlzYWJsZWRcIik7XG4gIGlmIChleGl0VGlsZUJ1dHRvbikge1xuICAgIGV4aXRUaWxlQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuICB9XG59XG5mdW5jdGlvbiBpc1ZhbGlkRXZlbnRTb3VyY2Uoc291cmNlSWQpIHtcbiAgY29uc3QgYWN0aXZlU2xpZGVFbGVtZW50ID0gZ2V0QWN0aXZlU2xpZGVFbGVtZW50KFwiZXhwYW5kZWRcIik7XG4gIHJldHVybiBhY3RpdmVTbGlkZUVsZW1lbnQ/LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikgPT09IHNvdXJjZUlkO1xufVxuZnVuY3Rpb24gc2V0dXBWaWRlb0V2ZW50cyh0aWxlLCB3aWRnZXRTZWxlY3Rvcikge1xuICBjb25zdCB2aWRlb1NvdXJjZUVsZW1lbnQgPSB0aWxlLnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlby52aWRlby1jb250ZW50ID4gc291cmNlXCIpO1xuICBpZiAodmlkZW9Tb3VyY2VFbGVtZW50KSB7XG4gICAgdmlkZW9Tb3VyY2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgIHBsYXlBY3RpdmVNZWRpYVRpbGVPbkxvYWQodGlsZSwgd2lkZ2V0U2VsZWN0b3IpO1xuICAgIH0pO1xuICAgIHZpZGVvU291cmNlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgKCkgPT4ge1xuICAgICAgdmlkZW9Tb3VyY2VFbGVtZW50LmNsb3Nlc3QoXCIudmlkZW8tY29udGVudC13cmFwcGVyXCIpPy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgdGlsZS5xdWVyeVNlbGVjdG9yKFwiLnZpZGVvLWZhbGxiYWNrLWNvbnRlbnRcIik/LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHNldHVwWW91dHViZUV2ZW50cyh0aWxlLCB3aWRnZXRTZWxlY3Rvcikge1xuICBjb25zdCB0aWxlSWQgPSB0aWxlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gIGNvbnN0IHlvdXR1YmVJZCA9IHRpbGUuZ2V0QXR0cmlidXRlKFwiZGF0YS15dC1pZFwiKTtcbiAgaWYgKHlvdXR1YmVJZCAmJiB0aWxlSWQpIHtcbiAgICBjb25zdCB5b3V0dWJlRnJhbWUgPSB0aWxlLnF1ZXJ5U2VsZWN0b3IoYGlmcmFtZSN5dC1mcmFtZS0ke3RpbGVJZH0tJHt5b3V0dWJlSWR9YCk7XG4gICAgeW91dHViZUZyYW1lPy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICBwbGF5QWN0aXZlTWVkaWFUaWxlT25Mb2FkKHRpbGUsIHdpZGdldFNlbGVjdG9yLCB7IG5hbWU6IFwiZGF0YS15dC1pZFwiLCB2YWx1ZTogeW91dHViZUlkIH0pO1xuICAgIH0pO1xuICAgIHlvdXR1YmVGcmFtZT8uYWRkRXZlbnRMaXN0ZW5lcihcInl0LXZpZGVvLWVycm9yXCIsICgpID0+IHtcbiAgICAgIHlvdXR1YmVGcmFtZS5jbG9zZXN0KFwiLnZpZGVvLWNvbnRlbnQtd3JhcHBlclwiKT8uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIHRpbGUucXVlcnlTZWxlY3RvcihcIi52aWRlby1mYWxsYmFjay1jb250ZW50XCIpPy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIH0pO1xuICB9XG59XG5mdW5jdGlvbiBzZXR1cFRpa1Rva1BsYXllclJlYWR5RXZlbnQoKSB7XG4gIHRpa3Rva0RlZmF1bHRQbGF5ZWQgPSBmYWxzZTtcbiAgd2luZG93Lm9ubWVzc2FnZSA9IChldmVudDIpID0+IHtcbiAgICBpZiAoZXZlbnQyLmRhdGFbXCJ4LXRpa3Rvay1wbGF5ZXJcIl0gJiYgZXZlbnQyLmRhdGEudHlwZSA9PT0gXCJvblBsYXllclJlYWR5XCIpIHtcbiAgICAgIGNvbnN0IGZyYW1lV2luZG93ID0gZXZlbnQyLnNvdXJjZTtcbiAgICAgIHBhdXNlVGlrdG9rVmlkZW8oZnJhbWVXaW5kb3cpO1xuICAgICAgaWYgKCF0aWt0b2tEZWZhdWx0UGxheWVkKSB7XG4gICAgICAgIHRpa3Rva0RlZmF1bHRQbGF5ZWQgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBsYXlNZWRpYU9uTG9hZCgpLCAzMDApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIHBsYXlBY3RpdmVNZWRpYVRpbGVPbkxvYWQodGlsZSwgd2lkZ2V0U2VsZWN0b3IsIGxvb2t1cEF0dHIpIHtcbiAgaWYgKGlzQWN0aXZlVGlsZSh0aWxlLCB3aWRnZXRTZWxlY3RvciwgbG9va3VwQXR0cikpIHtcbiAgICBwbGF5TWVkaWFPbkxvYWQoKTtcbiAgfVxufVxuZnVuY3Rpb24gaXNBY3RpdmVUaWxlKHRpbGUsIHdpZGdldFNlbGVjdG9yLCBsb29rdXBBdHRyKSB7XG4gIGNvbnN0IHRpbGVJZCA9IHRpbGUuZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgY29uc3QgdGlsZUluZGV4ID0gdGlsZUlkID8gZ2V0U3dpcGVySW5kZXhmb3JUaWxlKHdpZGdldFNlbGVjdG9yLCB0aWxlSWQsIGxvb2t1cEF0dHIpIDogMDtcbiAgcmV0dXJuIGdldEFjdGl2ZVNsaWRlKFwiZXhwYW5kZWRcIikgPT09IHRpbGVJbmRleDtcbn1cbmZ1bmN0aW9uIG9uVGlsZUNsb3NlZCgpIHtcbiAgY29uc3QgZXhwYW5kZWRUaWxlID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCJleHBhbmRlZC10aWxlc1wiKTtcbiAgaWYgKCFleHBhbmRlZFRpbGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZXhwYW5kZWQgdGlsZSBlbGVtZW50IG5vdCBmb3VuZFwiKTtcbiAgfVxuICBleHBhbmRlZFRpbGUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZXhwYW5kZWQtdGlsZS1vdmVybGF5XCIpO1xuICBkZXN0cm95U3dpcGVyKFwiZXhwYW5kZWRcIik7XG59XG52YXIgdGlrdG9rRGVmYXVsdFBsYXllZDtcbnZhciBpbml0X2V4cGFuZGVkX3N3aXBlcl9sb2FkZXIgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci9leHBhbmRlZC1zd2lwZXIubG9hZGVyLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9zd2lwZXJfZXh0ZW5zaW9uKCk7XG4gICAgaW5pdF93aWRnZXRfZmVhdHVyZXMoKTtcbiAgICBpbml0X3Rpa3Rva19tZXNzYWdlKCk7XG4gICAgdGlrdG9rRGVmYXVsdFBsYXllZCA9IGZhbHNlO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci9wcm9kdWN0LXJlY3Mtc3dpcGVyLmxvYWRlci50c1xuZnVuY3Rpb24gb25FeHBhbmRlZFRpbGVDcm9zc1NlbGxlcnNSZW5kZXJlZCh0aWxlSWQsIHRhcmdldCkge1xuICBpZiAodGFyZ2V0KSB7XG4gICAgY29uc3Qgc3dpcGVyQ3Jvc3NTZWxsID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLWV4cGFuZGVkLXByb2R1Y3QtcmVjc1wiKTtcbiAgICBpZiAoc3dpcGVyQ3Jvc3NTZWxsKSB7XG4gICAgICBpbml0aWFsaXplU3dpcGVyKHtcbiAgICAgICAgaWQ6IGBleHBhbmRlZC1wcm9kdWN0LXJlY3MtJHt0aWxlSWR9YCxcbiAgICAgICAgbW9kZTogXCJleHBhbmRlZC1wcm9kdWN0LXJlY3NcIixcbiAgICAgICAgd2lkZ2V0U2VsZWN0b3I6IHN3aXBlckNyb3NzU2VsbCxcbiAgICAgICAgcHJldkJ1dHRvbjogXCJzd2lwZXItZXhwLXByb2R1Y3QtcmVjcy1idXR0b24tcHJldlwiLFxuICAgICAgICBuZXh0QnV0dG9uOiBcInN3aXBlci1leHAtcHJvZHVjdC1yZWNzLWJ1dHRvbi1uZXh0XCIsXG4gICAgICAgIHBhcmFtc092ZXJyaWRlczoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IFwiYXV0b1wiLFxuICAgICAgICAgIG1vdXNld2hlZWw6IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBncmFiQ3Vyc29yOiBmYWxzZSxcbiAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgYmVmb3JlSW5pdDogKHN3aXBlcikgPT4ge1xuICAgICAgICAgICAgICBzd2lwZXIuc2xpZGVUb0xvb3AoMCwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG52YXIgaW5pdF9wcm9kdWN0X3JlY3Nfc3dpcGVyX2xvYWRlciA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL3Byb2R1Y3QtcmVjcy1zd2lwZXIubG9hZGVyLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9zd2lwZXJfZXh0ZW5zaW9uKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy93aWRnZXQuZmVhdHVyZXMudHNcbmZ1bmN0aW9uIGFkZEF1dG9BZGRUaWxlRmVhdHVyZSgpIHtcbiAgY29uc3QgeyBhdXRvX3JlZnJlc2ggfSA9IHNkay5nZXRTdHlsZUNvbmZpZygpO1xuICBpZiAoQm9vbGVhbihhdXRvX3JlZnJlc2gpID09PSB0cnVlKSB7XG4gICAgc2RrLnRpbGVzLmVuYWJsZUF1dG9BZGROZXdUaWxlcygpO1xuICB9XG59XG5mdW5jdGlvbiBsb2FkV2lkZ2V0SXNFbmFibGVkKCkge1xuICBpZiAoaXNFbmFibGVkKCkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBjb25zdCB1Z2NDb250YWluZXIgPSBzZGsucXVlcnlTZWxlY3RvcihcIiNub3N0by11Z2MtY29udGFpbmVyXCIpO1xuICBpZiAoIXVnY0NvbnRhaW5lcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIE5vc3RvIFVHQyBjb250YWluZXJcIik7XG4gIH1cbiAgdWdjQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgdGhyb3cgbmV3IEVycm9yKFwiV2lkZ2V0IGlzIG5vdCBlbmFibGVkXCIpO1xufVxuZnVuY3Rpb24gbG9hZEV4cGFuZGVkVGlsZUZlYXR1cmUoKSB7XG4gIGNvbnN0IHdpZGdldENvbnRhaW5lciA9IHNkay5nZXRTdHlsZUNvbmZpZygpO1xuICBjb25zdCB7IGNsaWNrX3Rocm91Z2hfdXJsIH0gPSB3aWRnZXRDb250YWluZXI7XG4gIGlmIChjbGlja190aHJvdWdoX3VybCA9PT0gXCJbRVhQQU5EXVwiKSB7XG4gICAgbG9hZEV4cGFuZFNldHRpbmdDb21wb25lbnRzKCk7XG4gICAgcmVnaXN0ZXJUaWxlRXhwYW5kTGlzdGVuZXIob25UaWxlRXhwYW5kKTtcbiAgICByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVYUEFOREVEX1RJTEVfQ0xPU0UsIG9uVGlsZUNsb3NlZCk7XG4gICAgcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFX0VYUEFORF9SRU5ERVJFRCwgb25UaWxlUmVuZGVyZWQpO1xuICAgIHJlZ2lzdGVyU2hhcmVNZW51T3BlbmVkTGlzdGVuZXIocmVkdWNlQmFja2dyb3VuZENvbnRyb2xzVmlzaWJpbGl0eSk7XG4gICAgcmVnaXN0ZXJTaGFyZU1lbnVDbG9zZWRMaXN0ZW5lcihyZXNldEJhY2tncm91bmRDb250cm9sc1Zpc2liaWxpdHkpO1xuICAgIHJlZ2lzdGVyQ3Jvc3NTZWxsZXJzTG9hZExpc3RlbmVyKG9uRXhwYW5kZWRUaWxlQ3Jvc3NTZWxsZXJzUmVuZGVyZWQpO1xuICB9IGVsc2UgaWYgKGNsaWNrX3Rocm91Z2hfdXJsID09PSBcIltPUklHSU5BTF9VUkxdXCIgfHwgL15odHRwcz86XFwvXFwvLisvLnRlc3QoY2xpY2tfdGhyb3VnaF91cmwgPz8gXCJcIikpIHtcbiAgICByZWdpc3RlckRlZmF1bHRDbGlja0V2ZW50cygpO1xuICB9IGVsc2UgaWYgKGNsaWNrX3Rocm91Z2hfdXJsID09PSBcIltDVVNUT01dXCIpIHtcbiAgICBhbGVydChcIkN1c3RvbSBVUkwgaW50ZWdyYXRpb24gTm90IGltcGxlbWVudGVkIHlldFwiKTtcbiAgfVxufVxuZnVuY3Rpb24gbG9hZE1vcmUoKSB7XG4gIGlmICh3aW5kb3cuX19pc0xvYWRpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgd2luZG93Ll9faXNMb2FkaW5nID0gdHJ1ZTtcbiAgY29uc3QgbG9hZE1vcmVCdXR0b24gPSBnZXRMb2FkTW9yZUJ1dHRvbigpO1xuICBzZGsudHJpZ2dlckV2ZW50KEVWRU5UX0xPQURfTU9SRSk7XG4gIGlmICghc2RrLnRpbGVzLmhhc01vcmVQYWdlcygpKSB7XG4gICAgbG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfVxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB3aW5kb3cuX19pc0xvYWRpbmcgPSBmYWxzZTtcbiAgfSwgNTAwKTtcbn1cbmZ1bmN0aW9uIGFkZExvYWRNb3JlQnV0dG9uRmVhdHVyZSgpIHtcbiAgY29uc3QgeyBsb2FkX21vcmVfdHlwZSB9ID0gc2RrLmdldFN0eWxlQ29uZmlnKCk7XG4gIGNvbnN0IGxvYWRNb3JlVHlwZSA9IGxvYWRfbW9yZV90eXBlO1xuICBzd2l0Y2ggKGxvYWRNb3JlVHlwZSkge1xuICAgIGNhc2UgXCJidXR0b25cIjpcbiAgICAgIGF0dGFjaExvYWRNb3JlQnV0dG9uTGlzdGVuZXIoKTtcbiAgICAgIHNkay5hZGRFdmVudExpc3RlbmVyKEVWRU5UX1RJTEVTX1VQREFURUQsICgpID0+IHtcbiAgICAgICAgY29uc3QgbG9hZE1vcmVMb2FkZXIgPSBnZXRMb2FkTW9yZUxvYWRlcigpO1xuICAgICAgICBjb25zdCBsb2FkTW9yZUJ1dHRvbiA9IGdldExvYWRNb3JlQnV0dG9uKCk7XG4gICAgICAgIGxvYWRNb3JlTG9hZGVyLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgICAgIGxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgIGRpc2FibGVMb2FkTW9yZUJ1dHRvbklmRXhpc3RzKCk7XG4gICAgICBzZGsuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVF9USUxFU19VUERBVEVELCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxvYWRNb3JlTG9hZGVyID0gZ2V0TG9hZE1vcmVMb2FkZXIoKTtcbiAgICAgICAgbG9hZE1vcmVMb2FkZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIH0pO1xuICAgICAgdXNlSW5maW5pdGVTY3JvbGxlcl9kZWZhdWx0KHNkaywgd2luZG93LCBsb2FkTW9yZVdyYXBwZWRXaXRoRWFzZWRMb2FkZXIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInN0YXRpY1wiOlxuICAgICAgZGlzYWJsZUxvYWRNb3JlTG9hZGVySWZFeGlzdHMoKTtcbiAgICAgIGRpc2FibGVMb2FkTW9yZUJ1dHRvbklmRXhpc3RzKCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsb2FkIG1vcmUgdHlwZVwiKTtcbiAgfVxuICBpZiAoIXNkay50aWxlcy5oYXNNb3JlUGFnZXMoKSkge1xuICAgIGRpc2FibGVMb2FkTW9yZUJ1dHRvbklmRXhpc3RzKCk7XG4gICAgZGlzYWJsZUxvYWRNb3JlTG9hZGVySWZFeGlzdHMoKTtcbiAgfVxufVxuZnVuY3Rpb24gYXR0YWNoTG9hZE1vcmVCdXR0b25MaXN0ZW5lcigpIHtcbiAgY29uc3QgbG9hZE1vcmVCdXR0b24gPSBnZXRMb2FkTW9yZUJ1dHRvbigpO1xuICBsb2FkTW9yZUJ1dHRvbi5vbmNsaWNrID0gbG9hZE1vcmVXcmFwcGVkV2l0aEVhc2VkTG9hZGVyO1xufVxuZnVuY3Rpb24gZGlzYWJsZUxvYWRNb3JlQnV0dG9uSWZFeGlzdHMoKSB7XG4gIGNvbnN0IGxvYWRNb3JlQnV0dG9uID0gZ2V0TG9hZE1vcmVCdXR0b24oKTtcbiAgbG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbn1cbmZ1bmN0aW9uIGRpc2FibGVMb2FkTW9yZUxvYWRlcklmRXhpc3RzKCkge1xuICBnZXRMb2FkTW9yZUxvYWRlcigpLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG59XG5mdW5jdGlvbiBoaWRlQWxsVGlsZXNBZnRlck5UaWxlcyhudW1iZXJUaWxlcykge1xuICBjb25zdCB0aWxlcyA9IHNkay5xdWVyeVNlbGVjdG9yQWxsKFwiLnVnYy10aWxlXCIpO1xuICBpZiAoIXRpbGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgdGlsZXNcIik7XG4gIH1cbiAgdGlsZXMuZm9yRWFjaCgodGlsZSwgaW5kZXgpID0+IHtcbiAgICBpZiAoaW5kZXggPj0gbnVtYmVyVGlsZXMpIHtcbiAgICAgIHRpbGUuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gYWRkVGlsZXNQZXJQYWdlRmVhdHVyZSgpIHtcbiAgY29uc3QgeyBlbmFibGVfY3VzdG9tX3RpbGVzX3Blcl9wYWdlLCB0aWxlc19wZXJfcGFnZSB9ID0gc2RrLmdldFN0eWxlQ29uZmlnKCk7XG4gIGlmIChlbmFibGVfY3VzdG9tX3RpbGVzX3Blcl9wYWdlKSB7XG4gICAgc2RrLnRpbGVzLnNldFZpc2libGVUaWxlc0NvdW50KHBhcnNlSW50KHRpbGVzX3Blcl9wYWdlKSk7XG4gICAgaGlkZUFsbFRpbGVzQWZ0ZXJOVGlsZXMocGFyc2VJbnQodGlsZXNfcGVyX3BhZ2UpKTtcbiAgfSBlbHNlIHtcbiAgICBzZGsudGlsZXMuc2V0VmlzaWJsZVRpbGVzQ291bnQoNDApO1xuICB9XG59XG5mdW5jdGlvbiBsb2FkVGl0bGUoKSB7XG4gIGNvbnN0IHdpZGdldFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IHdpZGdldENvbnRhaW5lciA9IHNkay5wbGFjZW1lbnQuZ2V0V2lkZ2V0Q29udGFpbmVyKCk7XG4gIGNvbnN0IHRpdGxlID0gd2lkZ2V0Q29udGFpbmVyLnRpdGxlO1xuICBpZiAodGl0bGUpIHtcbiAgICB3aWRnZXRUaXRsZS5pbm5lckhUTUwgPSB0aXRsZTtcbiAgfVxufVxuZnVuY3Rpb24gd2FpdEZvckVsbShwYXJlbnQsIHRhcmdldHMsIGNhbGxiYWNrKSB7XG4gIGlmICh0YXJnZXRzLmV2ZXJ5KChpdCkgPT4gISFwYXJlbnQucXVlcnlTZWxlY3RvcihpdCkpKSB7XG4gICAgY2FsbGJhY2sodGFyZ2V0cy5tYXAoKGl0KSA9PiBwYXJlbnQucXVlcnlTZWxlY3RvcihpdCkpKTtcbiAgfVxuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChfLCBvYnNlcnZlcjIpID0+IHtcbiAgICBpZiAodGFyZ2V0cy5ldmVyeSgoaXQpID0+ICEhcGFyZW50LnF1ZXJ5U2VsZWN0b3IoaXQpKSkge1xuICAgICAgb2JzZXJ2ZXIyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIGNhbGxiYWNrKHRhcmdldHMubWFwKChpdCkgPT4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoaXQpKSk7XG4gICAgfVxuICB9KTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShwYXJlbnQsIHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZVxuICB9KTtcbn1cbmZ1bmN0aW9uIHdhaXRGb3JFbGVtZW50cyhwYXJlbnQsIHRhcmdldCwgY2FsbGJhY2spIHtcbiAgY29uc3QgZWxlbWVudHMgPSBwYXJlbnQucXVlcnlTZWxlY3RvckFsbCh0YXJnZXQpO1xuICBpZiAoZWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgIGNhbGxiYWNrKGVsZW1lbnRzKTtcbiAgfVxuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBjb25zdCBuZXdFbGVtZW50cyA9IHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldCk7XG4gICAgaWYgKG5ld0VsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNhbGxiYWNrKG5ld0VsZW1lbnRzKTtcbiAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gIH0pO1xuICBvYnNlcnZlci5vYnNlcnZlKHBhcmVudCwge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlXG4gIH0pO1xufVxudmFyIGdldE5leHROYXZpZ2F0ZWRUaWxlLCBnZXROZXh0VGlsZSwgZ2V0UHJldmlvdXNUaWxlLCBhcnJvd0NsaWNrTGlzdGVuZXIsIGdldExvYWRNb3JlQnV0dG9uLCBnZXRMb2FkTW9yZUxvYWRlciwgbG9hZE1vcmVXcmFwcGVkV2l0aEVhc2VkTG9hZGVyO1xudmFyIGluaXRfd2lkZ2V0X2ZlYXR1cmVzID0gX19lc20oe1xuICBcInNyYy9saWJzL3dpZGdldC5mZWF0dXJlcy50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfc3JjKCk7XG4gICAgaW5pdF93aWRnZXRfY29tcG9uZW50cygpO1xuICAgIGluaXRfd2lkZ2V0X2xheW91dCgpO1xuICAgIGluaXRfaG9va3MoKTtcbiAgICBpbml0X2V4cGFuZGVkX3N3aXBlcl9sb2FkZXIoKTtcbiAgICBpbml0X3Byb2R1Y3RfcmVjc19zd2lwZXJfbG9hZGVyKCk7XG4gICAgZ2V0TmV4dE5hdmlnYXRlZFRpbGUgPSAoY3VycmVudFRpbGUsIGVuYWJsZWRUaWxlcywgZGlyZWN0aW9uKSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBlbmFibGVkVGlsZXMuZmluZEluZGV4KCh0aWxlKSA9PiB0aWxlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIikgPT09IGN1cnJlbnRUaWxlLmlkKTtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwicHJldmlvdXNcIikge1xuICAgICAgICBjb25zdCBwcmV2aW91c1RpbGUgPSBnZXRQcmV2aW91c1RpbGUoZW5hYmxlZFRpbGVzLCBjdXJyZW50SW5kZXgpO1xuICAgICAgICBpZiAoIXByZXZpb3VzVGlsZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIHByZXZpb3VzIHRpbGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByZXZpb3VzVGlsZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwibmV4dFwiKSB7XG4gICAgICAgIGNvbnN0IG5leHRUaWxlID0gZ2V0TmV4dFRpbGUoZW5hYmxlZFRpbGVzLCBjdXJyZW50SW5kZXgpO1xuICAgICAgICBpZiAoIW5leHRUaWxlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgbmV4dCB0aWxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0VGlsZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBnZXROZXh0VGlsZSA9IChlbmFibGVkVGlsZXMsIGN1cnJlbnRJbmRleCkgPT4gZW5hYmxlZFRpbGVzW2N1cnJlbnRJbmRleCArIDFdO1xuICAgIGdldFByZXZpb3VzVGlsZSA9IChlbmFibGVkVGlsZXMsIGN1cnJlbnRJbmRleCkgPT4gZW5hYmxlZFRpbGVzW2N1cnJlbnRJbmRleCAtIDFdO1xuICAgIGFycm93Q2xpY2tMaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgICBpZiAoIWUudGFyZ2V0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIHRhcmdldCBlbGVtZW50IGZvciBhcnJvdyBjbGljayBsaXN0ZW5lclwiKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgY29uc3QgdHlwZSA9IHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0aWxlLWFycm93cy1sZWZ0XCIpID8gXCJwcmV2aW91c1wiIDogXCJuZXh0XCI7XG4gICAgICBjb25zdCBjdXJyZW50VGlsZSA9IHNkay50aWxlcy5nZXRUaWxlKCk7XG4gICAgICBpZiAoIWN1cnJlbnRUaWxlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIGN1cnJlbnQgdGlsZVwiKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRpbGVzQXNIdG1sID0gc2RrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudWdjLXRpbGVcIik7XG4gICAgICBpZiAoIXRpbGVzQXNIdG1sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIHRpbGVzIGZvciBhcnJvdyBpbml0aWFsaXNhdGlvblwiKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRpbGVzQXNIdG1sQXJyYXkgPSBBcnJheS5mcm9tKHRpbGVzQXNIdG1sKTtcbiAgICAgIGNvbnN0IHRpbGVJZCA9IGdldE5leHROYXZpZ2F0ZWRUaWxlKGN1cnJlbnRUaWxlLCB0aWxlc0FzSHRtbEFycmF5LCB0eXBlKTtcbiAgICAgIGNvbnN0IHRpbGVzU3RvcmUgPSBPYmplY3QudmFsdWVzKHNkay50aWxlcy50aWxlcyk7XG4gICAgICBjb25zdCB0aWxlRGF0YSA9IHtcbiAgICAgICAgdGlsZURhdGE6IHRpbGVzU3RvcmUuZmluZCgodGlsZSkgPT4gdGlsZS5pZCA9PT0gdGlsZUlkKSxcbiAgICAgICAgd2lkZ2V0SWQ6IHNkay5wbGFjZW1lbnQuZ2V0V2lkZ2V0SWQoKSxcbiAgICAgICAgZmlsdGVySWQ6IHNkay5wbGFjZW1lbnQuZ2V0V2lkZ2V0Q29udGFpbmVyKCkud2lkZ2V0T3B0aW9ucz8uZmlsdGVyX2lkXG4gICAgICB9O1xuICAgICAgc2RrLnRyaWdnZXJFdmVudChFWFBBTkRFRF9USUxFX0NMT1NFKTtcbiAgICAgIHNkay50cmlnZ2VyRXZlbnQoRVZFTlRfVElMRV9FWFBBTkQsIHRpbGVEYXRhKTtcbiAgICB9O1xuICAgIGdldExvYWRNb3JlQnV0dG9uID0gKCkgPT4ge1xuICAgICAgY29uc3QgbG9hZE1vcmVDb21wb25lbnQgPSBzZGsucXVlcnlTZWxlY3RvcihcImxvYWQtbW9yZVwiKTtcbiAgICAgIGlmICghbG9hZE1vcmVDb21wb25lbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgbG9hZCBtb3JlIGNvbXBvbmVudFwiKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxvYWRNb3JlQnV0dG9uID0gbG9hZE1vcmVDb21wb25lbnQ/LnF1ZXJ5U2VsZWN0b3IoXCIjbG9hZC1tb3JlXCIpO1xuICAgICAgaWYgKCFsb2FkTW9yZUJ1dHRvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBsb2FkIG1vcmUgYnV0dG9uXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxvYWRNb3JlQnV0dG9uO1xuICAgIH07XG4gICAgZ2V0TG9hZE1vcmVMb2FkZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCBsb2FkTW9yZUxvYWRlciA9IHNkay5xdWVyeVNlbGVjdG9yKFwiI2xvYWQtbW9yZS1sb2FkZXJcIik7XG4gICAgICBpZiAoIWxvYWRNb3JlTG9hZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIGxvYWQgbW9yZSBsb2FkZXJcIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gbG9hZE1vcmVMb2FkZXI7XG4gICAgfTtcbiAgICBsb2FkTW9yZVdyYXBwZWRXaXRoRWFzZWRMb2FkZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCBsb2FkTW9yZUJ1dHRvbiA9IGdldExvYWRNb3JlQnV0dG9uKCk7XG4gICAgICBsb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgY29uc3QgbG9hZE1vcmVMb2FkZXIgPSBnZXRMb2FkTW9yZUxvYWRlcigpO1xuICAgICAgbG9hZE1vcmVMb2FkZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICAgIGxvYWRNb3JlKCk7XG4gICAgfTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL3dpZGdldC51dGlscy50c1xuZnVuY3Rpb24gd2FpdEZvckVsZW1lbnQoc2VsZWN0b3IsIHRpbWVvdXQgPSA1ZTMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBpbnRlcnZhbCA9IDEwMDtcbiAgICBjb25zdCBlbmRUaW1lID0gRGF0ZS5ub3coKSArIHRpbWVvdXQ7XG4gICAgY29uc3QgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBzZGsucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgICAgICByZXNvbHZlKGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIGlmIChEYXRlLm5vdygpID4gZW5kVGltZSkge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgICAgICByZWplY3QobmV3IEVycm9yKGBFbGVtZW50IHdpdGggc2VsZWN0b3IgXCIke3NlbGVjdG9yfVwiIG5vdCBmb3VuZCB3aXRoaW4gJHt0aW1lb3V0fW1zYCkpO1xuICAgICAgfVxuICAgIH0sIGludGVydmFsKTtcbiAgfSk7XG59XG52YXIgaW5pdF93aWRnZXRfdXRpbHMgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvd2lkZ2V0LnV0aWxzLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9leHRlbnNpb25zL21hc29ucnkvbWFzb25yeS5leHRlbnNpb24udHNcbmZ1bmN0aW9uIGhhbmRsZVRpbGVJbWFnZVJlbmRlcmVkKHRpbGVJZCkge1xuICBpZiAoIXRpbGVJZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBncmlkSXRlbUVsZW1lbnQgPSBzZGsucGxhY2VtZW50LmdldFNoYWRvd1Jvb3QoKS5xdWVyeVNlbGVjdG9yKGAuZ3JpZC1pdGVtW2RhdGEtaWQqPVwiJHt0aWxlSWR9XCJdYCk7XG4gIGNvbnN0IHRpbGVMb2FkaW5nRWxlbWVudCA9IGdyaWRJdGVtRWxlbWVudD8ucXVlcnlTZWxlY3RvcihcIi50aWxlLWxvYWRpbmcubG9hZGluZ1wiKTtcbiAgdGlsZUxvYWRpbmdFbGVtZW50Py5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGluZ1wiKTtcbn1cbmZ1bmN0aW9uIGhhbmRsZUFsbFRpbGVJbWFnZVJlbmRlcmVkKCkge1xuICBjb25zdCB0aWxlTG9hZGluZ0VsZW1lbnRzID0gc2RrLnBsYWNlbWVudC5nZXRTaGFkb3dSb290KCkucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWl0ZW0gLnRpbGUtbG9hZGluZy5sb2FkaW5nXCIpO1xuICB0aWxlTG9hZGluZ0VsZW1lbnRzPy5mb3JFYWNoKChlbGVtZW50KSA9PiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkaW5nXCIpKTtcbiAgY29uc3QgbG9hZE1vcmVIaWRkZW5FbGVtZW50ID0gc2RrLnBsYWNlbWVudC5nZXRTaGFkb3dSb290KCkucXVlcnlTZWxlY3RvcihcIiNidXR0b25zID4gI2xvYWQtbW9yZS5oaWRkZW5cIik7XG4gIGxvYWRNb3JlSGlkZGVuRWxlbWVudD8uY2xhc3NMaXN0LnJlbW92ZShcIi5oaWRkZW5cIik7XG59XG5mdW5jdGlvbiBnZXRHcmlkSXRlbVJvd0lkcygpIHtcbiAgY29uc3QgZ3JpZEl0ZW1zID0gc2RrLnBsYWNlbWVudC5nZXRTaGFkb3dSb290KCkucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWl0ZW06bm90KGhpZGRlbilbcm93LWlkXVwiKTtcbiAgY29uc3QgYWxsUm93SWRzID0gQXJyYXkuZnJvbShncmlkSXRlbXMpLm1hcCgoaXRlbSkgPT4gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3ctaWRcIikpLmZpbHRlcigocm93SWRTdHJpbmcpID0+IHJvd0lkU3RyaW5nICYmICFOdW1iZXIuaXNOYU4oK3Jvd0lkU3RyaW5nKSkubWFwKChyb3dJZCkgPT4gK3Jvd0lkKTtcbiAgcmV0dXJuIFsuLi5uZXcgU2V0KGFsbFJvd0lkcyldO1xufVxuZnVuY3Rpb24gaGFuZGxlVGlsZUltYWdlRXJyb3IodGlsZVdpdGhFcnJvcikge1xuICBjb25zdCBlcnJvclRpbGVSb3dJZFN0cmluZyA9IHRpbGVXaXRoRXJyb3IuZ2V0QXR0cmlidXRlKFwicm93LWlkXCIpO1xuICB0aWxlV2l0aEVycm9yLmNsYXNzTGlzdC5yZW1vdmUoXCJncmlkLWl0ZW1cIik7XG4gIHRpbGVXaXRoRXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcInVnYy10aWxlXCIpO1xuICB0aWxlV2l0aEVycm9yLmNsYXNzTGlzdC5hZGQoXCJncmlkLWl0ZW0tZXJyb3JcIik7XG4gIHRpbGVXaXRoRXJyb3IuY2xhc3NMaXN0LmFkZChcInVnYy10aWxlLWVycm9yXCIpO1xuICB0aWxlV2l0aEVycm9yLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIGlmICghZXJyb3JUaWxlUm93SWRTdHJpbmcgfHwgTnVtYmVyLmlzTmFOKCtlcnJvclRpbGVSb3dJZFN0cmluZykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZXJyb3JUaWxlUm93SWQgPSArZXJyb3JUaWxlUm93SWRTdHJpbmc7XG4gIGNvbnN0IHVuaXF1ZVJvd0lkcyA9IGdldEdyaWRJdGVtUm93SWRzKCk7XG4gIGNvbnN0IHJvd0lkU2VsZWN0b3JzID0gdW5pcXVlUm93SWRzLmZpbHRlcigocm93SWQpID0+IHJvd0lkID49IGVycm9yVGlsZVJvd0lkKS5tYXAoKG1hdGNoZWQpID0+IGBbcm93LWlkPVwiJHttYXRjaGVkfVwiXWApO1xuICBjb25zdCBtYXRjaGVkR3JpZEl0ZW1zID0gQXJyYXkuZnJvbShcbiAgICBzZGsucGxhY2VtZW50LmdldFNoYWRvd1Jvb3QoKS5xdWVyeVNlbGVjdG9yQWxsKGAuZ3JpZC1pdGVtOmlzKCR7cm93SWRTZWxlY3RvcnN9KWApXG4gICk7XG4gIHJlc2l6ZVRpbGVzKG1hdGNoZWRHcmlkSXRlbXMpO1xufVxuZnVuY3Rpb24gcmVuZGVyTWFzb25yeUxheW91dChyZXNldCA9IGZhbHNlLCByZXNpemUgPSBmYWxzZSkge1xuICBpZiAocmVzaXplIHx8IHJlc2V0KSB7XG4gICAgc2NyZWVuV2lkdGggPSAwO1xuICB9XG4gIGNvbnN0IHVnY0NvbnRhaW5lciA9IHNkay5xdWVyeVNlbGVjdG9yKFwiI25vc3RvLXVnYy1jb250YWluZXJcIik7XG4gIGlmICghdWdjQ29udGFpbmVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgTm9zdG8gVUdDIGNvbnRhaW5lclwiKTtcbiAgfVxuICBjb25zdCBjdXJyZW50U2NyZWVuV2lkdGggPSB1Z2NDb250YWluZXIuY2xpZW50V2lkdGg7XG4gIGlmIChjdXJyZW50U2NyZWVuV2lkdGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHJlc2l6ZSAmJiBwcmV2aW91c1dpZHRoSGFuZGxlZCA9PT0gY3VycmVudFNjcmVlbldpZHRoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChzY3JlZW5XaWR0aCA9PSAwKSB7XG4gICAgc2NyZWVuV2lkdGggPSBjdXJyZW50U2NyZWVuV2lkdGg7XG4gICAgcHJldmlvdXNXaWR0aEhhbmRsZWQgPSBjdXJyZW50U2NyZWVuV2lkdGg7XG4gIH1cbiAgY29uc3QgYWxsVGlsZXMgPSBBcnJheS5mcm9tKHNkay5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtaXRlbVwiKSA/PyBbXSk7XG4gIGNvbnN0IHVnY1RpbGVzID0gcmVzZXQgfHwgcmVzaXplID8gYWxsVGlsZXMgOiBhbGxUaWxlcy5maWx0ZXIoXG4gICAgKHRpbGUpID0+IHRpbGUuZ2V0QXR0cmlidXRlKFwid2lkdGgtc2V0XCIpICE9PSBcInRydWVcIiAmJiB0aWxlLmdldEF0dHJpYnV0ZShcInNldC1mb3Itd2lkdGhcIikgIT09IHNjcmVlbldpZHRoLnRvU3RyaW5nKClcbiAgKTtcbiAgcmVzaXplVGlsZXModWdjVGlsZXMpO1xufVxuZnVuY3Rpb24gcmVzaXplVGlsZXModWdjVGlsZXMpIHtcbiAgaWYgKCF1Z2NUaWxlcyB8fCB1Z2NUaWxlcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdWdjVGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgIGNvbnN0IHJhbmRvbUZsZXhHcm93ID0gTWF0aC5yYW5kb20oKSAqIDIgKyAxO1xuICAgIGNvbnN0IHJhbmRvbVdpZHRoID0gTWF0aC5yYW5kb20oKSAqIDIwMCArIDE1MDtcbiAgICB0aWxlLnN0eWxlLmZsZXggPSBgJHtyYW5kb21GbGV4R3Jvd30gMSBhdXRvYDtcbiAgICB0aWxlLnN0eWxlLndpZHRoID0gYCR7cmFuZG9tV2lkdGh9cHhgO1xuICAgIHRpbGUuc2V0QXR0cmlidXRlKFwid2lkdGgtc2V0XCIsIFwidHJ1ZVwiKTtcbiAgICB0aWxlLnNldEF0dHJpYnV0ZShcInNldC1mb3Itd2lkdGhcIiwgc2NyZWVuV2lkdGgudG9TdHJpbmcoKSk7XG4gIH0pO1xufVxudmFyIHNjcmVlbldpZHRoLCBwcmV2aW91c1dpZHRoSGFuZGxlZDtcbnZhciBpbml0X21hc29ucnlfZXh0ZW5zaW9uID0gX19lc20oe1xuICBcInNyYy9saWJzL2V4dGVuc2lvbnMvbWFzb25yeS9tYXNvbnJ5LmV4dGVuc2lvbi50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHNjcmVlbldpZHRoID0gMDtcbiAgICBwcmV2aW91c1dpZHRoSGFuZGxlZCA9IDA7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9leHRlbnNpb25zL3N3aXBlci9mb250LnNjc3NcbnZhciBmb250X2RlZmF1bHQ7XG52YXIgaW5pdF9mb250ID0gX19lc20oe1xuICBcInNyYy9saWJzL2V4dGVuc2lvbnMvc3dpcGVyL2ZvbnQuc2Nzc1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZvbnRfZGVmYXVsdCA9IGBAZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IHN3aXBlci1pY29ucztcbiAgc3JjOiB1cmwoXCJkYXRhOmFwcGxpY2F0aW9uL2ZvbnQtd29mZjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwgZDA5R1JnQUJBQUFBQUFaZ0FCQUFBQUFBREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJHUmxSTkFBQUdSQUFBQUJvQUFBQWNpNnFIa1VkRVJVWUFBQVdnQUFBQUl3QUFBQ1FBWUFCWFIxQlBVd0FBQmhRQUFBQXVBQUFBTnVBWTcreEhVMVZDQUFBRnhBQUFBRkFBQUFCbTJmUGN6VTlUTHpJQUFBSGNBQUFBU2dBQUFHQlA5VjVSWTIxaGNBQUFBa1FBQUFDSUFBQUJZdDZGMGNCamRuUWdBQUFDekFBQUFBUUFBQUFFQUJFQlJHZGhjM0FBQUFXWUFBQUFDQUFBQUFqLy93QURaMng1WmdBQUF5d0FBQURNQUFBRDJNSHRyeVZvWldGa0FBQUJiQUFBQURBQUFBQTJFMitlb1dob1pXRUFBQUdjQUFBQUh3QUFBQ1FDOWdEemFHMTBlQUFBQWlnQUFBQVpBQUFBcmdKa0FCRnNiMk5oQUFBQzBBQUFBRm9BQUFCYUZRQVVHRzFoZUhBQUFBRzhBQUFBSHdBQUFDQUFjQUJBYm1GdFpRQUFBL2dBQUFFNUFBQUNYdkZkQndsd2IzTjBBQUFGTkFBQUFHSUFBQUNFNXM3NGhYamFZMkJrWUdBQVlwZjVIdS9qK1cyK01uQXpNWURBemFYNlFqRDYvNC8vQnhqNUdBOEF1UndNWUdrQVB5d0wxM2phWTJCa1lHQTg4UDhBZ3g0aisvOGZRRFlmQTFBRUJXZ0RBSUIyQk9vQWVOcGpZR1JnWU5CaDRHZGdZZ0FCRU1uSUFCSnpZTkFEQ1FBQUNXZ0FzUUI0Mm1OZ1lmekNPSUdCbFlHQjBZY3hqWUdCd1IxS2YyV1FaR2hoWUdCaVlHVm1nQUZHQmlRUWtPYWF3dERBb01CUXhYamcvd0VHUGNZRERBNHdOVUEyQ0Nnd3NBQUFPNEVMNmdBQWVOcGoyTTBneUFBQ3F4Z0dOV0JrWjJENC93TUEreGtEZGdBQUFIamFZMkJnWUdhQVlCa0dSZ1lRaUFIeUdNRjhGZ1lISU0zRHdNSEFCR1FyTU9neVdETEVNMVQ5L3c4VUJmRU1nTHpFLy8vL1AvNS8vZi9WL3h2K3I0ZWFBQWVNYkF4d0lVWW1JTUhFZ0tZQVlqVWNzREF3c0xLeGMzQnljZlB3OGpFUUEvZ1pCQVNGaEVWRXhjUWxKS1drWldUbDVCVVVsWlJWVk5YVU5UUVpCZ01BQU1SK0UrZ0FFUUZFQUFBQUtnQXFBQ29BTkFBK0FFZ0FVZ0JjQUdZQWNBQjZBSVFBamdDWUFLSUFyQUMyQU1BQXlnRFVBTjRBNkFEeUFQd0JCZ0VRQVJvQkpBRXVBVGdCUWdGTUFWWUJZQUZxQVhRQmZnR0lBWklCbkFHbUFiSUJ6Z0hzQUFCNDJ1Mk5NUTZDVUF5R1c1Njh4OUFuZVlZZ200TUpiaEtGYUV4SU9BVlg4QXBld1N0NEJpYzRBZmVBaWQzVk9CaXhEeGZQWUV6YTVPK1hmaTA0WUFEZ2dpVUlVTEN1RUpLOFZoTzRiU3ZwZG5rdEhJNVFDWXRkaTJzbDhablhhSGxxVXJOS3pkS2NUOGNqbHErcndaU3ZJVmN6TmllenNmblAvdXpubWZQRkJOT0RNMks3TVRRNDVZRUFacUdQODFBbUdHY0YzaVBxT29wMHIxU1BUYVRiVmtmVWU0SFhqOTd3WUUreU53V1l4d1d1NHYxdWdXSGdvM1MxWGRaRVZxV003RVQwY2ZuTEd4V2ZrZ1I0Mm8yUHZXckRNQlNGai9JSExhRjB6S2pSZ2RpVk13U2NOUkFvV1VvSDc4WTJpY0IveUlZMDlBbjZBSDJCZHUvVUIreXhvcFlzaFFpRXZudnUwZFVSZ0R0OFFlQzhQRHc3RnBqaTNmRUE0ei9QRUo2WU9CNWhLaDRkajNFdlhoeFBxSC9TS1VZM3JKN3NyWjRGWm5oMVBNQXRQaHdQNmZsMlBNSk1QRGdlUTRyWThZVDZHemFvMGVBRUE0MDlEdWdnbVRuRm5PY1NDaUVpTE1neENpVEk2Q3E1RFpVZDNRbXAxMHZPMExhTFRkMmNqTjRmT3VtbGM3bFVZYlNRY1pGa3V0Ukc3ZzZKS1pLeTBSbWRMWTY4MENEbkVKK1VNa3BGRmUxUk43bnhkVnBYckM0YVR0bmF1ck9uWWVyY1pnMllWbUxOL2QvZ2N6ZkVpbXJFL2ZzL2JPdXEyOVptbjh0bG9PUmFYZ1pnR2E3OHlPOS9jblhtMkJwYUd2cTI1RHY5UzRFOSs1U0ljOVBxdXBKS2hZRlNTbDQ3K1FjcjFtWU5BQUFBZU5wdHcwY0t3a0FBQU1EWkpBOFE3T1VKdmtMc1BmWjZ6RlZFUlB5OHFIaDJZRVIrM2kvQlA4M3ZJQkxMeVNzb0tpbXJxS3FwYTJocDYranE2UnNZR2htYm1KcVpTeTBzcmF4dGJPM3NIUnlkbkVNVTR1UjZ5eDdKSlh2ZVA3V3JEeWNBQUFBQUFBSC8vd0FDZU5wallHUmdZT0FCWWhrZ1pnSkNaZ1pOQmtZR0xRWnRJSnNGTE1ZQUFBdzNBTGdBZU5vbGl6RUtnREFRQkNjaFJiQzJzRkVSMFlENnFWUWlCQ3YvSDllekdJNlo1WEJBdzhDQksvbTVpUVFWYXVWYlhMbk9yTVp2Mm9MZEtGYThQanVydTJoSnpHYWJtT1NMek5NenZ1dHBCM040Mm1OZ1pHQmc0R0tRWXpCaFlNeEpMTWxqNEdCZ0FZb3cvUC9QQUpKaExNNnNTb1dLZldDQUF3REFqZ2JSQUFCNDJtTmdZR0JrQUlJYkNabzVJUHJtVW4waEdBMEFPOEVGVFFBQVwiKTtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufWA7XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3N3aXBlci1idW5kbGUuY3NzXG52YXIgc3dpcGVyX2J1bmRsZV9kZWZhdWx0O1xudmFyIGluaXRfc3dpcGVyX2J1bmRsZSA9IF9fZXNtKHtcbiAgXCIuLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3N3aXBlci1idW5kbGUuY3NzXCIoKSB7XG4gICAgc3dpcGVyX2J1bmRsZV9kZWZhdWx0ID0gYC8qKlxuICogU3dpcGVyIDExLjEuMTRcbiAqIE1vc3QgbW9kZXJuIG1vYmlsZSB0b3VjaCBzbGlkZXIgYW5kIGZyYW1ld29yayB3aXRoIGhhcmR3YXJlIGFjY2VsZXJhdGVkIHRyYW5zaXRpb25zXG4gKiBodHRwczovL3N3aXBlcmpzLmNvbVxuICpcbiAqIENvcHlyaWdodCAyMDE0LTIwMjQgVmxhZGltaXIgS2hhcmxhbXBpZGlcbiAqXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqXG4gKiBSZWxlYXNlZCBvbjogU2VwdGVtYmVyIDEyLCAyMDI0XG4gKi9cblxuLyogRk9OVF9TVEFSVCAqL1xuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiAnc3dpcGVyLWljb25zJztcbiAgc3JjOiB1cmwoJ2RhdGE6YXBwbGljYXRpb24vZm9udC13b2ZmO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCBkMDlHUmdBQkFBQUFBQVpnQUJBQUFBQUFEQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkdSbFJOQUFBR1JBQUFBQm9BQUFBY2k2cUhrVWRFUlVZQUFBV2dBQUFBSXdBQUFDUUFZQUJYUjFCUFV3QUFCaFFBQUFBdUFBQUFOdUFZNyt4SFUxVkNBQUFGeEFBQUFGQUFBQUJtMmZQY3pVOVRMeklBQUFIY0FBQUFTZ0FBQUdCUDlWNVJZMjFoY0FBQUFrUUFBQUNJQUFBQll0NkYwY0JqZG5RZ0FBQUN6QUFBQUFRQUFBQUVBQkVCUkdkaGMzQUFBQVdZQUFBQUNBQUFBQWovL3dBRFoyeDVaZ0FBQXl3QUFBRE1BQUFEMk1IdHJ5Vm9aV0ZrQUFBQmJBQUFBREFBQUFBMkUyK2VvV2hvWldFQUFBR2NBQUFBSHdBQUFDUUM5Z0R6YUcxMGVBQUFBaWdBQUFBWkFBQUFyZ0prQUJGc2IyTmhBQUFDMEFBQUFGb0FBQUJhRlFBVUdHMWhlSEFBQUFHOEFBQUFId0FBQUNBQWNBQkFibUZ0WlFBQUEvZ0FBQUU1QUFBQ1h2RmRCd2x3YjNOMEFBQUZOQUFBQUdJQUFBQ0U1czc0aFhqYVkyQmtZR0FBWXBmNUh1L2orVzIrTW5Bek1ZREF6YVg2UWpENi80Ly9CeGo1R0E4QXVSd01ZR2tBUHl3TDEzamFZMkJrWUdBODhQOEFneDRqKy84ZlFEWWZBMUFFQldnREFJQjJCT29BZU5wallHUmdZTkJoNEdkZ1lnQUJFTW5JQUJKellOQURDUUFBQ1dnQXNRQjQybU5nWWZ6Q09JR0JsWUdCMFljeGpZR0J3UjFLZjJXUVpHaGhZR0JpWUdWbWdBRkdCaVFRa09hYXd0REFvTUJReFhqZy93RUdQY1lEREE0d05VQTJDQ2d3c0FBQU80RUw2Z0FBZU5wajJNMGd5QUFDcXhnR05XQmtaMkQ0L3dNQSt4a0RkZ0FBQUhqYVkyQmdZR2FBWUJrR1JnWVFpQUh5R01GOEZnWUhJTTNEd01IQUJHUXJNT2d5V0RMRU0xVDkvdzhVQmZFTWdMekUvLy8vUC81Ly9mL1YveHYrcjRlYUFBZU1iQXh3SVVZbUlNSEVnS1lBWWpVY3NEQXdzTEt4YzNCeWNmUHc4akVRQS9nWkJBU0ZoRVZFeGNRbEpLV2taV1RsNUJVVWxaUlZWTlhVTlRRWkJnTUFBTVIrRStnQUVRRkVBQUFBS2dBcUFDb0FOQUErQUVnQVVnQmNBR1lBY0FCNkFJUUFqZ0NZQUtJQXJBQzJBTUFBeWdEVUFONEE2QUR5QVB3QkJnRVFBUm9CSkFFdUFUZ0JRZ0ZNQVZZQllBRnFBWFFCZmdHSUFaSUJuQUdtQWJJQnpnSHNBQUI0MnUyTk1RNkNVQXlHVzU2OHg5QW5lWVlnbTRNSmJoS0ZhRXhJT0FWWDhBcGV3U3Q0QmljNEFmZUFpZDNWT0JpeER4ZlBZRXphNU8rWGZpMDRZQURnZ2lVSVVMQ3VFSks4VmhPNGJTdnBkbmt0SEk1UUNZdGRpMnNsOFpuWGFIbHFVck5LemRLY1Q4Y2pscStyd1pTdklWY3pOaWV6c2ZuUC91em5tZlBGQk5PRE0ySzdNVFE0NVlFQVpxR1A4MUFtR0djRjNpUHFPb3AwcjFTUFRhVGJWa2ZVZTRIWGo5N3dZRSt5TndXWXh3V3U0djF1Z1dIZ28zUzFYZFpFVnFXTTdFVDBjZm5MR3hXZmtnUjQybzJQdldyRE1CU0ZqL0lITGFGMHpLalJnZGlWTXdTY05SQW9XVW9INzhZMmljQi95SVkwOUFuNkFIMkJkdS9VQit5eG9wWXNoUWlFdm52dTBkVVJnRHQ4UWVDOFBEdzdGcGppM2ZFQTR6L1BFSjZZT0I1aEtoNGRqM0V2WGh4UHFIL1NLVVkzcko3c3JaNEZabmgxUE1BdFBod1A2ZmwyUE1KTVBEZ2VRNHJZOFlUNkd6YW8wZUFFQTQwOUR1Z2dtVG5Gbk9jU0NpRWlMTWd4Q2lUSTZDcTVEWlVkM1FtcDEwdk8wTGFMVGQyY2pONGZPdW1sYzdsVVliU1FjWkZrdXRSRzdnNkpLWkt5MFJtZExZNjgwQ0RuRUorVU1rcEZGZTFSTjdueGRWcFhyQzRhVHRuYXVyT25ZZXJjWmcyWVZtTE4vZC9nY3pmRWltckUvZnMvYk91cTI5Wm1uOHRsb09SYVhnWmdHYTc4eU85L2NuWG0yQnBhR3ZxMjVEdjlTNEU5KzVTSWM5UHF1cEpLaFlGU1NsNDcrUWNyMW1ZTkFBQUFlTnB0dzBjS3drQUFBTURaSkE4UTdPVUp2a0xzUGZaNnpGVkVSUHk4cUhoMllFUiszaS9CUDgzdklCTEx5U3NvS2ltcnFLcXBhMmhwNitqcTZSc1lHaG1ibUpxWlN5MHNyYXh0Yk8zc0hSeWRuRU1VNHVSNnl4N0pKWHZlUDdXckR5Y0FBQUFBQUFILy93QUNlTnBqWUdSZ1lPQUJZaGtnWmdKQ1pnWk5Ca1lHTFFadElKc0ZMTVlBQUF3M0FMZ0FlTm9saXpFS2dEQVFCQ2NoUmJDMnNGRVIwWUQ2cVZRaUJDdi9IOWV6R0k2WjVYQkF3OENCSy9tNWlRUVZhdVZiWExuT3JNWnYyb0xkS0ZhOFBqdXJ1MmhKekdhYm1PU0x6Tk16dnV0cEIzTjQybU5nWkdCZzRHS1FZekJoWU14SkxNbGo0R0JnQVlvdy9QL1BBSkpoTE02c1NvV0tmV0NBQXdEQWpnYlJBQUI0Mm1OZ1lHQmtBSUliQ1pvNUlQcm1VbjBoR0EwQU84RUZUUUFBJyk7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbi8qIEZPTlRfRU5EICovXG46cm9vdCB7XG4gIC0tc3dpcGVyLXRoZW1lLWNvbG9yOiAjMDA3YWZmO1xuICAvKlxuICAtLXN3aXBlci1wcmVsb2FkZXItY29sb3I6IHZhcigtLXN3aXBlci10aGVtZS1jb2xvcik7XG4gIC0tc3dpcGVyLXdyYXBwZXItdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGluaXRpYWw7XG4gICovXG59XG46aG9zdCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIHotaW5kZXg6IDE7XG59XG4uc3dpcGVyIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICAvKiBGaXggb2YgV2Via2l0IGZsaWNrZXJpbmcgKi9cbiAgei1pbmRleDogMTtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4uc3dpcGVyLXZlcnRpY2FsID4gLnN3aXBlci13cmFwcGVyIHtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5zd2lwZXItd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgei1pbmRleDogMTtcbiAgZGlzcGxheTogZmxleDtcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtO1xuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogdmFyKC0tc3dpcGVyLXdyYXBwZXItdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24sIGluaXRpYWwpO1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcbn1cbi5zd2lwZXItYW5kcm9pZCAuc3dpcGVyLXNsaWRlLFxuLnN3aXBlci1pb3MgLnN3aXBlci1zbGlkZSxcbi5zd2lwZXItd3JhcHBlciB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwLCAwKTtcbn1cbi5zd2lwZXItaG9yaXpvbnRhbCB7XG4gIHRvdWNoLWFjdGlvbjogcGFuLXk7XG59XG4uc3dpcGVyLXZlcnRpY2FsIHtcbiAgdG91Y2gtYWN0aW9uOiBwYW4teDtcbn1cbi5zd2lwZXItc2xpZGUge1xuICBmbGV4LXNocmluazogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0cmFuc2l0aW9uLXByb3BlcnR5OiB0cmFuc2Zvcm07XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLnN3aXBlci1zbGlkZS1pbnZpc2libGUtYmxhbmsge1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG4vKiBBdXRvIEhlaWdodCAqL1xuLnN3aXBlci1hdXRvaGVpZ2h0LFxuLnN3aXBlci1hdXRvaGVpZ2h0IC5zd2lwZXItc2xpZGUge1xuICBoZWlnaHQ6IGF1dG87XG59XG4uc3dpcGVyLWF1dG9oZWlnaHQgLnN3aXBlci13cmFwcGVyIHtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IHRyYW5zZm9ybSwgaGVpZ2h0O1xufVxuLnN3aXBlci1iYWNrZmFjZS1oaWRkZW4gLnN3aXBlci1zbGlkZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xufVxuLyogM0QgRWZmZWN0cyAqL1xuLnN3aXBlci0zZC5zd2lwZXItY3NzLW1vZGUgLnN3aXBlci13cmFwcGVyIHtcbiAgcGVyc3BlY3RpdmU6IDEyMDBweDtcbn1cbi5zd2lwZXItM2QgLnN3aXBlci13cmFwcGVyIHtcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcbn1cbi5zd2lwZXItM2Qge1xuICBwZXJzcGVjdGl2ZTogMTIwMHB4O1xufVxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLFxuLnN3aXBlci0zZCAuc3dpcGVyLWN1YmUtc2hhZG93IHtcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcbn1cbi8qIENTUyBNb2RlICovXG4uc3dpcGVyLWNzcy1tb2RlID4gLnN3aXBlci13cmFwcGVyIHtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTtcbiAgLyogRm9yIEZpcmVmb3ggKi9cbiAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lO1xuICAvKiBGb3IgSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgKi9cbn1cbi5zd2lwZXItY3NzLW1vZGUgPiAuc3dpcGVyLXdyYXBwZXI6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi5zd2lwZXItY3NzLW1vZGUgPiAuc3dpcGVyLXdyYXBwZXIgPiAuc3dpcGVyLXNsaWRlIHtcbiAgc2Nyb2xsLXNuYXAtYWxpZ246IHN0YXJ0IHN0YXJ0O1xufVxuLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItaG9yaXpvbnRhbCA+IC5zd2lwZXItd3JhcHBlciB7XG4gIHNjcm9sbC1zbmFwLXR5cGU6IHggbWFuZGF0b3J5O1xufVxuLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItdmVydGljYWwgPiAuc3dpcGVyLXdyYXBwZXIge1xuICBzY3JvbGwtc25hcC10eXBlOiB5IG1hbmRhdG9yeTtcbn1cbi5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLWZyZWUtbW9kZSA+IC5zd2lwZXItd3JhcHBlciB7XG4gIHNjcm9sbC1zbmFwLXR5cGU6IG5vbmU7XG59XG4uc3dpcGVyLWNzcy1tb2RlLnN3aXBlci1mcmVlLW1vZGUgPiAuc3dpcGVyLXdyYXBwZXIgPiAuc3dpcGVyLXNsaWRlIHtcbiAgc2Nyb2xsLXNuYXAtYWxpZ246IG5vbmU7XG59XG4uc3dpcGVyLWNzcy1tb2RlLnN3aXBlci1jZW50ZXJlZCA+IC5zd2lwZXItd3JhcHBlcjo6YmVmb3JlIHtcbiAgY29udGVudDogJyc7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBvcmRlcjogOTk5OTtcbn1cbi5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLWNlbnRlcmVkID4gLnN3aXBlci13cmFwcGVyID4gLnN3aXBlci1zbGlkZSB7XG4gIHNjcm9sbC1zbmFwLWFsaWduOiBjZW50ZXIgY2VudGVyO1xuICBzY3JvbGwtc25hcC1zdG9wOiBhbHdheXM7XG59XG4uc3dpcGVyLWNzcy1tb2RlLnN3aXBlci1jZW50ZXJlZC5zd2lwZXItaG9yaXpvbnRhbCA+IC5zd2lwZXItd3JhcHBlciA+IC5zd2lwZXItc2xpZGU6Zmlyc3QtY2hpbGQge1xuICBtYXJnaW4taW5saW5lLXN0YXJ0OiB2YXIoLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWJlZm9yZSk7XG59XG4uc3dpcGVyLWNzcy1tb2RlLnN3aXBlci1jZW50ZXJlZC5zd2lwZXItaG9yaXpvbnRhbCA+IC5zd2lwZXItd3JhcHBlcjo6YmVmb3JlIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxcHg7XG4gIHdpZHRoOiB2YXIoLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWFmdGVyKTtcbn1cbi5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLWNlbnRlcmVkLnN3aXBlci12ZXJ0aWNhbCA+IC5zd2lwZXItd3JhcHBlciA+IC5zd2lwZXItc2xpZGU6Zmlyc3QtY2hpbGQge1xuICBtYXJnaW4tYmxvY2stc3RhcnQ6IHZhcigtLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYmVmb3JlKTtcbn1cbi5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLWNlbnRlcmVkLnN3aXBlci12ZXJ0aWNhbCA+IC5zd2lwZXItd3JhcHBlcjo6YmVmb3JlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi13aWR0aDogMXB4O1xuICBoZWlnaHQ6IHZhcigtLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYWZ0ZXIpO1xufVxuLyogU2xpZGUgc3R5bGVzIHN0YXJ0ICovXG4vKiAzRCBTaGFkb3dzICovXG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LFxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0LFxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCxcbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLFxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20sXG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LFxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0LFxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCxcbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLFxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIHotaW5kZXg6IDEwO1xufVxuLnN3aXBlci0zZCAuc3dpcGVyLXNsaWRlLXNoYWRvdyB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG59XG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gbGVmdCwgcmdiYSgwLCAwLCAwLCAwLjUpLCByZ2JhKDAsIDAsIDAsIDApKTtcbn1cbi5zd2lwZXItM2QgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMCwgMCwgMCwgMC41KSwgcmdiYSgwLCAwLCAwLCAwKSk7XG59XG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIHJnYmEoMCwgMCwgMCwgMC41KSwgcmdiYSgwLCAwLCAwLCAwKSk7XG59XG4uc3dpcGVyLTNkIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwgMCwgMCwgMC41KSwgcmdiYSgwLCAwLCAwLCAwKSk7XG59XG4uc3dpcGVyLWxhenktcHJlbG9hZGVyIHtcbiAgd2lkdGg6IDQycHg7XG4gIGhlaWdodDogNDJweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA1MCU7XG4gIHRvcDogNTAlO1xuICBtYXJnaW4tbGVmdDogLTIxcHg7XG4gIG1hcmdpbi10b3A6IC0yMXB4O1xuICB6LWluZGV4OiAxMDtcbiAgdHJhbnNmb3JtLW9yaWdpbjogNTAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IDRweCBzb2xpZCB2YXIoLS1zd2lwZXItcHJlbG9hZGVyLWNvbG9yLCB2YXIoLS1zd2lwZXItdGhlbWUtY29sb3IpKTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3JkZXItdG9wLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbi5zd2lwZXI6bm90KC5zd2lwZXItd2F0Y2gtcHJvZ3Jlc3MpIC5zd2lwZXItbGF6eS1wcmVsb2FkZXIsXG4uc3dpcGVyLXdhdGNoLXByb2dyZXNzIC5zd2lwZXItc2xpZGUtdmlzaWJsZSAuc3dpcGVyLWxhenktcHJlbG9hZGVyIHtcbiAgYW5pbWF0aW9uOiBzd2lwZXItcHJlbG9hZGVyLXNwaW4gMXMgaW5maW5pdGUgbGluZWFyO1xufVxuLnN3aXBlci1sYXp5LXByZWxvYWRlci13aGl0ZSB7XG4gIC0tc3dpcGVyLXByZWxvYWRlci1jb2xvcjogI2ZmZjtcbn1cbi5zd2lwZXItbGF6eS1wcmVsb2FkZXItYmxhY2sge1xuICAtLXN3aXBlci1wcmVsb2FkZXItY29sb3I6ICMwMDA7XG59XG5Aa2V5ZnJhbWVzIHN3aXBlci1wcmVsb2FkZXItc3BpbiB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICB9XG59XG4vKiBTbGlkZSBzdHlsZXMgZW5kICovXG4uc3dpcGVyLXZpcnR1YWwgLnN3aXBlci1zbGlkZSB7XG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XG59XG4uc3dpcGVyLXZpcnR1YWwuc3dpcGVyLWNzcy1tb2RlIC5zd2lwZXItd3JhcHBlcjo6YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLnN3aXBlci12aXJ0dWFsLnN3aXBlci1jc3MtbW9kZS5zd2lwZXItaG9yaXpvbnRhbCAuc3dpcGVyLXdyYXBwZXI6OmFmdGVyIHtcbiAgaGVpZ2h0OiAxcHg7XG4gIHdpZHRoOiB2YXIoLS1zd2lwZXItdmlydHVhbC1zaXplKTtcbn1cbi5zd2lwZXItdmlydHVhbC5zd2lwZXItY3NzLW1vZGUuc3dpcGVyLXZlcnRpY2FsIC5zd2lwZXItd3JhcHBlcjo6YWZ0ZXIge1xuICB3aWR0aDogMXB4O1xuICBoZWlnaHQ6IHZhcigtLXN3aXBlci12aXJ0dWFsLXNpemUpO1xufVxuOnJvb3Qge1xuICAtLXN3aXBlci1uYXZpZ2F0aW9uLXNpemU6IDQ0cHg7XG4gIC8qXG4gIC0tc3dpcGVyLW5hdmlnYXRpb24tdG9wLW9mZnNldDogNTAlO1xuICAtLXN3aXBlci1uYXZpZ2F0aW9uLXNpZGVzLW9mZnNldDogMTBweDtcbiAgLS1zd2lwZXItbmF2aWdhdGlvbi1jb2xvcjogdmFyKC0tc3dpcGVyLXRoZW1lLWNvbG9yKTtcbiAgKi9cbn1cbi5zd2lwZXItYnV0dG9uLXByZXYsXG4uc3dpcGVyLWJ1dHRvbi1uZXh0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IHZhcigtLXN3aXBlci1uYXZpZ2F0aW9uLXRvcC1vZmZzZXQsIDUwJSk7XG4gIHdpZHRoOiBjYWxjKHZhcigtLXN3aXBlci1uYXZpZ2F0aW9uLXNpemUpIC8gNDQgKiAyNyk7XG4gIGhlaWdodDogdmFyKC0tc3dpcGVyLW5hdmlnYXRpb24tc2l6ZSk7XG4gIG1hcmdpbi10b3A6IGNhbGMoMHB4IC0gKHZhcigtLXN3aXBlci1uYXZpZ2F0aW9uLXNpemUpIC8gMikpO1xuICB6LWluZGV4OiAxMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY29sb3I6IHZhcigtLXN3aXBlci1uYXZpZ2F0aW9uLWNvbG9yLCB2YXIoLS1zd2lwZXItdGhlbWUtY29sb3IpKTtcbn1cbi5zd2lwZXItYnV0dG9uLXByZXYuc3dpcGVyLWJ1dHRvbi1kaXNhYmxlZCxcbi5zd2lwZXItYnV0dG9uLW5leHQuc3dpcGVyLWJ1dHRvbi1kaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuMzU7XG4gIGN1cnNvcjogYXV0bztcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uc3dpcGVyLWJ1dHRvbi1wcmV2LnN3aXBlci1idXR0b24taGlkZGVuLFxuLnN3aXBlci1idXR0b24tbmV4dC5zd2lwZXItYnV0dG9uLWhpZGRlbiB7XG4gIG9wYWNpdHk6IDA7XG4gIGN1cnNvcjogYXV0bztcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uc3dpcGVyLW5hdmlnYXRpb24tZGlzYWJsZWQgLnN3aXBlci1idXR0b24tcHJldixcbi5zd2lwZXItbmF2aWdhdGlvbi1kaXNhYmxlZCAuc3dpcGVyLWJ1dHRvbi1uZXh0IHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuLnN3aXBlci1idXR0b24tcHJldiBzdmcsXG4uc3dpcGVyLWJ1dHRvbi1uZXh0IHN2ZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcbn1cbi5zd2lwZXItcnRsIC5zd2lwZXItYnV0dG9uLXByZXYgc3ZnLFxuLnN3aXBlci1ydGwgLnN3aXBlci1idXR0b24tbmV4dCBzdmcge1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xufVxuLnN3aXBlci1idXR0b24tcHJldixcbi5zd2lwZXItcnRsIC5zd2lwZXItYnV0dG9uLW5leHQge1xuICBsZWZ0OiB2YXIoLS1zd2lwZXItbmF2aWdhdGlvbi1zaWRlcy1vZmZzZXQsIDEwcHgpO1xuICByaWdodDogYXV0bztcbn1cbi5zd2lwZXItYnV0dG9uLW5leHQsXG4uc3dpcGVyLXJ0bCAuc3dpcGVyLWJ1dHRvbi1wcmV2IHtcbiAgcmlnaHQ6IHZhcigtLXN3aXBlci1uYXZpZ2F0aW9uLXNpZGVzLW9mZnNldCwgMTBweCk7XG4gIGxlZnQ6IGF1dG87XG59XG4uc3dpcGVyLWJ1dHRvbi1sb2NrIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi8qIE5hdmlnYXRpb24gZm9udCBzdGFydCAqL1xuLnN3aXBlci1idXR0b24tcHJldjphZnRlcixcbi5zd2lwZXItYnV0dG9uLW5leHQ6YWZ0ZXIge1xuICBmb250LWZhbWlseTogc3dpcGVyLWljb25zO1xuICBmb250LXNpemU6IHZhcigtLXN3aXBlci1uYXZpZ2F0aW9uLXNpemUpO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZSAhaW1wb3J0YW50O1xuICBsZXR0ZXItc3BhY2luZzogMDtcbiAgZm9udC12YXJpYW50OiBpbml0aWFsO1xuICBsaW5lLWhlaWdodDogMTtcbn1cbi5zd2lwZXItYnV0dG9uLXByZXY6YWZ0ZXIsXG4uc3dpcGVyLXJ0bCAuc3dpcGVyLWJ1dHRvbi1uZXh0OmFmdGVyIHtcbiAgY29udGVudDogJ3ByZXYnO1xufVxuLnN3aXBlci1idXR0b24tbmV4dCxcbi5zd2lwZXItcnRsIC5zd2lwZXItYnV0dG9uLXByZXYge1xuICByaWdodDogdmFyKC0tc3dpcGVyLW5hdmlnYXRpb24tc2lkZXMtb2Zmc2V0LCAxMHB4KTtcbiAgbGVmdDogYXV0bztcbn1cbi5zd2lwZXItYnV0dG9uLW5leHQ6YWZ0ZXIsXG4uc3dpcGVyLXJ0bCAuc3dpcGVyLWJ1dHRvbi1wcmV2OmFmdGVyIHtcbiAgY29udGVudDogJ25leHQnO1xufVxuLyogTmF2aWdhdGlvbiBmb250IGVuZCAqL1xuOnJvb3Qge1xuICAvKlxuICAtLXN3aXBlci1wYWdpbmF0aW9uLWNvbG9yOiB2YXIoLS1zd2lwZXItdGhlbWUtY29sb3IpO1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWxlZnQ6IGF1dG87XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tcmlnaHQ6IDhweDtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi1ib3R0b206IDhweDtcbiAgLS1zd2lwZXItcGFnaW5hdGlvbi10b3A6IGF1dG87XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tZnJhY3Rpb24tY29sb3I6IGluaGVyaXQ7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItYmctY29sb3I6IHJnYmEoMCwwLDAsMC4yNSk7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItc2l6ZTogNHB4O1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1zaXplOiA4cHg7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LXdpZHRoOiA4cHg7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWhlaWdodDogOHB4O1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1ib3JkZXItcmFkaXVzOiA1MCU7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWluYWN0aXZlLWNvbG9yOiAjMDAwO1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1pbmFjdGl2ZS1vcGFjaXR5OiAwLjI7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LW9wYWNpdHk6IDE7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWhvcml6b250YWwtZ2FwOiA0cHg7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LXZlcnRpY2FsLWdhcDogNnB4O1xuICAqL1xufVxuLnN3aXBlci1wYWdpbmF0aW9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246IDMwMG1zIG9wYWNpdHk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gIHotaW5kZXg6IDEwO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLnN3aXBlci1wYWdpbmF0aW9uLWhpZGRlbiB7XG4gIG9wYWNpdHk6IDA7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tZGlzYWJsZWQgPiAuc3dpcGVyLXBhZ2luYXRpb24sXG4uc3dpcGVyLXBhZ2luYXRpb24uc3dpcGVyLXBhZ2luYXRpb24tZGlzYWJsZWQge1xuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG59XG4vKiBDb21tb24gU3R5bGVzICovXG4uc3dpcGVyLXBhZ2luYXRpb24tZnJhY3Rpb24sXG4uc3dpcGVyLXBhZ2luYXRpb24tY3VzdG9tLFxuLnN3aXBlci1ob3Jpem9udGFsID4gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMsXG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy5zd2lwZXItcGFnaW5hdGlvbi1ob3Jpem9udGFsIHtcbiAgYm90dG9tOiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1ib3R0b20sIDhweCk7XG4gIHRvcDogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tdG9wLCBhdXRvKTtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG59XG4vKiBCdWxsZXRzICovXG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZm9udC1zaXplOiAwO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0IHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjMzKTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlLW1haW4ge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZS1wcmV2IHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjY2KTtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUtcHJldi1wcmV2IHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjMzKTtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUtbmV4dCB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC42Nik7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlLW5leHQtbmV4dCB7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC4zMyk7XG59XG4uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0IHtcbiAgd2lkdGg6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC13aWR0aCwgdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LXNpemUsIDhweCkpO1xuICBoZWlnaHQ6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1oZWlnaHQsIHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1zaXplLCA4cHgpKTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYm9yZGVyLXJhZGl1cywgNTAlKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWluYWN0aXZlLWNvbG9yLCAjMDAwKTtcbiAgb3BhY2l0eTogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWluYWN0aXZlLW9wYWNpdHksIDAuMik7XG59XG5idXR0b24uc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0IHtcbiAgYm9yZGVyOiBub25lO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgICBhcHBlYXJhbmNlOiBub25lO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWNsaWNrYWJsZSAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0IHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldDpvbmx5LWNoaWxkIHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUge1xuICBvcGFjaXR5OiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtb3BhY2l0eSwgMSk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWNvbG9yLCB2YXIoLS1zd2lwZXItdGhlbWUtY29sb3IpKTtcbn1cbi5zd2lwZXItdmVydGljYWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cyxcbi5zd2lwZXItcGFnaW5hdGlvbi12ZXJ0aWNhbC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzIHtcbiAgcmlnaHQ6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLXJpZ2h0LCA4cHgpO1xuICBsZWZ0OiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1sZWZ0LCBhdXRvKTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAtNTAlLCAwKTtcbn1cbi5zd2lwZXItdmVydGljYWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LFxuLnN3aXBlci1wYWdpbmF0aW9uLXZlcnRpY2FsLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCB7XG4gIG1hcmdpbjogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LXZlcnRpY2FsLWdhcCwgNnB4KSAwO1xuICBkaXNwbGF5OiBibG9jaztcbn1cbi5zd2lwZXItdmVydGljYWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMsXG4uc3dpcGVyLXBhZ2luYXRpb24tdmVydGljYWwuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMge1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICB3aWR0aDogOHB4O1xufVxuLnN3aXBlci12ZXJ0aWNhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LFxuLnN3aXBlci1wYWdpbmF0aW9uLXZlcnRpY2FsLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHRyYW5zaXRpb246IDIwMG1zIHRyYW5zZm9ybSxcbiAgICAgICAgMjAwbXMgdG9wO1xufVxuLnN3aXBlci1ob3Jpem9udGFsID4gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCxcbi5zd2lwZXItcGFnaW5hdGlvbi1ob3Jpem9udGFsLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMgLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCB7XG4gIG1hcmdpbjogMCB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtaG9yaXpvbnRhbC1nYXAsIDRweCk7XG59XG4uc3dpcGVyLWhvcml6b250YWwgPiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLWR5bmFtaWMsXG4uc3dpcGVyLXBhZ2luYXRpb24taG9yaXpvbnRhbC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyB7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuLnN3aXBlci1ob3Jpem9udGFsID4gLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQsXG4uc3dpcGVyLXBhZ2luYXRpb24taG9yaXpvbnRhbC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXRzLnN3aXBlci1wYWdpbmF0aW9uLWJ1bGxldHMtZHluYW1pYyAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0IHtcbiAgdHJhbnNpdGlvbjogMjAwbXMgdHJhbnNmb3JtLFxuICAgICAgICAyMDBtcyBsZWZ0O1xufVxuLnN3aXBlci1ob3Jpem9udGFsLnN3aXBlci1ydGwgPiAuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0cy1keW5hbWljIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQge1xuICB0cmFuc2l0aW9uOiAyMDBtcyB0cmFuc2Zvcm0sXG4gICAgMjAwbXMgcmlnaHQ7XG59XG4vKiBGcmFjdGlvbiAqL1xuLnN3aXBlci1wYWdpbmF0aW9uLWZyYWN0aW9uIHtcbiAgY29sb3I6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWZyYWN0aW9uLWNvbG9yLCBpbmhlcml0KTtcbn1cbi8qIFByb2dyZXNzICovXG4uc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXIge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1iZy1jb2xvciwgcmdiYSgwLCAwLCAwLCAwLjI1KSk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cbi5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2JhciAuc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItZmlsbCB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLWNvbG9yLCB2YXIoLS1zd2lwZXItdGhlbWUtY29sb3IpKTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQgdG9wO1xufVxuLnN3aXBlci1ydGwgLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyIC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1maWxsIHtcbiAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgdG9wO1xufVxuLnN3aXBlci1ob3Jpem9udGFsID4gLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLFxuLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLnN3aXBlci1wYWdpbmF0aW9uLWhvcml6b250YWwsXG4uc3dpcGVyLXZlcnRpY2FsID4gLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLW9wcG9zaXRlLFxuLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLnN3aXBlci1wYWdpbmF0aW9uLXZlcnRpY2FsLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLW9wcG9zaXRlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogdmFyKC0tc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItc2l6ZSwgNHB4KTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xufVxuLnN3aXBlci12ZXJ0aWNhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhcixcbi5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci5zd2lwZXItcGFnaW5hdGlvbi12ZXJ0aWNhbCxcbi5zd2lwZXItaG9yaXpvbnRhbCA+IC5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1vcHBvc2l0ZSxcbi5zd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci5zd2lwZXItcGFnaW5hdGlvbi1ob3Jpem9udGFsLnN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLW9wcG9zaXRlIHtcbiAgd2lkdGg6IHZhcigtLXN3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyLXNpemUsIDRweCk7XG4gIGhlaWdodDogMTAwJTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xufVxuLnN3aXBlci1wYWdpbmF0aW9uLWxvY2sge1xuICBkaXNwbGF5OiBub25lO1xufVxuOnJvb3Qge1xuICAvKlxuICAtLXN3aXBlci1zY3JvbGxiYXItYm9yZGVyLXJhZGl1czogMTBweDtcbiAgLS1zd2lwZXItc2Nyb2xsYmFyLXRvcDogYXV0bztcbiAgLS1zd2lwZXItc2Nyb2xsYmFyLWJvdHRvbTogNHB4O1xuICAtLXN3aXBlci1zY3JvbGxiYXItbGVmdDogYXV0bztcbiAgLS1zd2lwZXItc2Nyb2xsYmFyLXJpZ2h0OiA0cHg7XG4gIC0tc3dpcGVyLXNjcm9sbGJhci1zaWRlcy1vZmZzZXQ6IDElO1xuICAtLXN3aXBlci1zY3JvbGxiYXItYmctY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgLS1zd2lwZXItc2Nyb2xsYmFyLWRyYWctYmctY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgLS1zd2lwZXItc2Nyb2xsYmFyLXNpemU6IDRweDtcbiAgKi9cbn1cbi5zd2lwZXItc2Nyb2xsYmFyIHtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1ib3JkZXItcmFkaXVzLCAxMHB4KTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3VjaC1hY3Rpb246IG5vbmU7XG4gIGJhY2tncm91bmQ6IHZhcigtLXN3aXBlci1zY3JvbGxiYXItYmctY29sb3IsIHJnYmEoMCwgMCwgMCwgMC4xKSk7XG59XG4uc3dpcGVyLXNjcm9sbGJhci1kaXNhYmxlZCA+IC5zd2lwZXItc2Nyb2xsYmFyLFxuLnN3aXBlci1zY3JvbGxiYXIuc3dpcGVyLXNjcm9sbGJhci1kaXNhYmxlZCB7XG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5zd2lwZXItaG9yaXpvbnRhbCA+IC5zd2lwZXItc2Nyb2xsYmFyLFxuLnN3aXBlci1zY3JvbGxiYXIuc3dpcGVyLXNjcm9sbGJhci1ob3Jpem9udGFsIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLXNpZGVzLW9mZnNldCwgMSUpO1xuICBib3R0b206IHZhcigtLXN3aXBlci1zY3JvbGxiYXItYm90dG9tLCA0cHgpO1xuICB0b3A6IHZhcigtLXN3aXBlci1zY3JvbGxiYXItdG9wLCBhdXRvKTtcbiAgei1pbmRleDogNTA7XG4gIGhlaWdodDogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1zaXplLCA0cHgpO1xuICB3aWR0aDogY2FsYygxMDAlIC0gMiAqIHZhcigtLXN3aXBlci1zY3JvbGxiYXItc2lkZXMtb2Zmc2V0LCAxJSkpO1xufVxuLnN3aXBlci12ZXJ0aWNhbCA+IC5zd2lwZXItc2Nyb2xsYmFyLFxuLnN3aXBlci1zY3JvbGxiYXIuc3dpcGVyLXNjcm9sbGJhci12ZXJ0aWNhbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1sZWZ0LCBhdXRvKTtcbiAgcmlnaHQ6IHZhcigtLXN3aXBlci1zY3JvbGxiYXItcmlnaHQsIDRweCk7XG4gIHRvcDogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1zaWRlcy1vZmZzZXQsIDElKTtcbiAgei1pbmRleDogNTA7XG4gIHdpZHRoOiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLXNpemUsIDRweCk7XG4gIGhlaWdodDogY2FsYygxMDAlIC0gMiAqIHZhcigtLXN3aXBlci1zY3JvbGxiYXItc2lkZXMtb2Zmc2V0LCAxJSkpO1xufVxuLnN3aXBlci1zY3JvbGxiYXItZHJhZyB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZDogdmFyKC0tc3dpcGVyLXNjcm9sbGJhci1kcmFnLWJnLWNvbG9yLCByZ2JhKDAsIDAsIDAsIDAuNSkpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS1zd2lwZXItc2Nyb2xsYmFyLWJvcmRlci1yYWRpdXMsIDEwcHgpO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG59XG4uc3dpcGVyLXNjcm9sbGJhci1jdXJzb3ItZHJhZyB7XG4gIGN1cnNvcjogbW92ZTtcbn1cbi5zd2lwZXItc2Nyb2xsYmFyLWxvY2sge1xuICBkaXNwbGF5OiBub25lO1xufVxuLyogWm9vbSBjb250YWluZXIgc3R5bGVzIHN0YXJ0ICovXG4uc3dpcGVyLXpvb20tY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5zd2lwZXItem9vbS1jb250YWluZXIgPiBpbWcsXG4uc3dpcGVyLXpvb20tY29udGFpbmVyID4gc3ZnLFxuLnN3aXBlci16b29tLWNvbnRhaW5lciA+IGNhbnZhcyB7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMTAwJTtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cbi8qIFpvb20gY29udGFpbmVyIHN0eWxlcyBlbmQgKi9cbi5zd2lwZXItc2xpZGUtem9vbWVkIHtcbiAgY3Vyc29yOiBtb3ZlO1xuICB0b3VjaC1hY3Rpb246IG5vbmU7XG59XG4vKiBhMTF5ICovXG4uc3dpcGVyIC5zd2lwZXItbm90aWZpY2F0aW9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBvcGFjaXR5OiAwO1xuICB6LWluZGV4OiAtMTAwMDtcbn1cbi5zd2lwZXItZnJlZS1tb2RlID4gLnN3aXBlci13cmFwcGVyIHtcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xuICBtYXJnaW46IDAgYXV0bztcbn1cbi5zd2lwZXItZ3JpZCA+IC5zd2lwZXItd3JhcHBlciB7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cbi5zd2lwZXItZ3JpZC1jb2x1bW4gPiAuc3dpcGVyLXdyYXBwZXIge1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4uc3dpcGVyLWZhZGUuc3dpcGVyLWZyZWUtbW9kZSAuc3dpcGVyLXNsaWRlIHtcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xufVxuLnN3aXBlci1mYWRlIC5zd2lwZXItc2xpZGUge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogb3BhY2l0eTtcbn1cbi5zd2lwZXItZmFkZSAuc3dpcGVyLXNsaWRlIC5zd2lwZXItc2xpZGUge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cbi5zd2lwZXItZmFkZSAuc3dpcGVyLXNsaWRlLWFjdGl2ZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xufVxuLnN3aXBlci1mYWRlIC5zd2lwZXItc2xpZGUtYWN0aXZlIC5zd2lwZXItc2xpZGUtYWN0aXZlIHtcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XG59XG4uc3dpcGVyLnN3aXBlci1jdWJlIHtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICAgICAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gIHotaW5kZXg6IDE7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUgLnN3aXBlci1zbGlkZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLnN3aXBlci1jdWJlLnN3aXBlci1ydGwgLnN3aXBlci1zbGlkZSB7XG4gIHRyYW5zZm9ybS1vcmlnaW46IDEwMCUgMDtcbn1cbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlLWFjdGl2ZSxcbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlLWFjdGl2ZSAuc3dpcGVyLXNsaWRlLWFjdGl2ZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xufVxuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUtYWN0aXZlLFxuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUtbmV4dCxcbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlLXByZXYge1xuICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cbi5zd2lwZXItY3ViZSAuc3dpcGVyLWN1YmUtc2hhZG93IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICBib3R0b206IDBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3BhY2l0eTogMC42O1xuICB6LWluZGV4OiAwO1xufVxuLnN3aXBlci1jdWJlIC5zd2lwZXItY3ViZS1zaGFkb3c6YmVmb3JlIHtcbiAgY29udGVudDogJyc7XG4gIGJhY2tncm91bmQ6ICMwMDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICBmaWx0ZXI6IGJsdXIoNTBweCk7XG59XG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZS1uZXh0ICsgLnN3aXBlci1zbGlkZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xufVxuLyogQ3ViZSBzbGlkZSBzaGFkb3dzIHN0YXJ0ICovXG4uc3dpcGVyLWN1YmUgLnN3aXBlci1zbGlkZS1zaGFkb3ctY3ViZS5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCxcbi5zd2lwZXItY3ViZSAuc3dpcGVyLXNsaWRlLXNoYWRvdy1jdWJlLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLFxuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUtc2hhZG93LWN1YmUuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0LFxuLnN3aXBlci1jdWJlIC5zd2lwZXItc2xpZGUtc2hhZG93LWN1YmUuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCB7XG4gIHotaW5kZXg6IDA7XG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbn1cbi8qIEN1YmUgc2xpZGUgc2hhZG93cyBlbmQgKi9cbi5zd2lwZXIuc3dpcGVyLWZsaXAge1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbn1cbi5zd2lwZXItZmxpcCAuc3dpcGVyLXNsaWRlIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgei1pbmRleDogMTtcbn1cbi5zd2lwZXItZmxpcCAuc3dpcGVyLXNsaWRlIC5zd2lwZXItc2xpZGUge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cbi5zd2lwZXItZmxpcCAuc3dpcGVyLXNsaWRlLWFjdGl2ZSxcbi5zd2lwZXItZmxpcCAuc3dpcGVyLXNsaWRlLWFjdGl2ZSAuc3dpcGVyLXNsaWRlLWFjdGl2ZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xufVxuLyogRmxpcCBzbGlkZSBzaGFkb3dzIHN0YXJ0ICovXG4uc3dpcGVyLWZsaXAgLnN3aXBlci1zbGlkZS1zaGFkb3ctZmxpcC5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCxcbi5zd2lwZXItZmxpcCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1mbGlwLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLFxuLnN3aXBlci1mbGlwIC5zd2lwZXItc2xpZGUtc2hhZG93LWZsaXAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0LFxuLnN3aXBlci1mbGlwIC5zd2lwZXItc2xpZGUtc2hhZG93LWZsaXAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCB7XG4gIHotaW5kZXg6IDA7XG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbn1cbi8qIEZsaXAgc2xpZGUgc2hhZG93cyBlbmQgKi9cbi5zd2lwZXItY3JlYXRpdmUgLnN3aXBlci1zbGlkZSB7XG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogdHJhbnNmb3JtLCBvcGFjaXR5LCBoZWlnaHQ7XG59XG4uc3dpcGVyLnN3aXBlci1jYXJkcyB7XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuLnN3aXBlci1jYXJkcyAuc3dpcGVyLXNsaWRlIHtcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcbiAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICAgICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuYDtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2V4dGVuc2lvbnMvc3dpcGVyL2xvYWRlci5leHRlbnNpb24udHNcbmZ1bmN0aW9uIGVuYWJsZVRpbGVDb250ZW50KHNsaWRlMikge1xuICBzbGlkZTIucXVlcnlTZWxlY3RvcihcIi50aWxlLWxvYWRpbmdcIik/LmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gIHNsaWRlMi5xdWVyeVNlbGVjdG9yKFwiLmljb24tc2VjdGlvbi5oaWRkZW5cIik/LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG59XG5mdW5jdGlvbiBlbmFibGVUaWxlSW1hZ2Uoc2xpZGUyKSB7XG4gIGNvbnN0IHRpbGVJbWFnZSA9IHNsaWRlMi5xdWVyeVNlbGVjdG9yKFwiLnRpbGUtaW1hZ2Utd3JhcHBlciA+IGltZ1wiKTtcbiAgaWYgKHRpbGVJbWFnZSkge1xuICAgIGlmICh0aWxlSW1hZ2UuY29tcGxldGUpIHtcbiAgICAgIGVuYWJsZVRpbGVDb250ZW50KHNsaWRlMik7XG4gICAgfVxuICAgIHRpbGVJbWFnZS5vbmxvYWQgPSAoKSA9PiBlbmFibGVUaWxlQ29udGVudChzbGlkZTIpO1xuICB9XG59XG5mdW5jdGlvbiBlbmFibGVUaWxlSW1hZ2VzKHdyYXBwZXIpIHtcbiAgY29uc3QgZWxlbWVudHMgPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudWdjLXRpbGU6aGFzKC5pY29uLXNlY3Rpb24uaGlkZGVuKVwiKTtcbiAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4gZW5hYmxlVGlsZUltYWdlKGVsZW1lbnQpKTtcbn1cbmZ1bmN0aW9uIGxvYWRBbGxVbmxvYWRlZFRpbGVzKCkge1xuICBjb25zdCB0aWxlV3JhcHBlciA9IHNkay5wbGFjZW1lbnQucXVlcnlTZWxlY3RvcihcIi51Z2MtdGlsZXNcIik7XG4gIGlmICh0aWxlV3JhcHBlcikge1xuICAgIGVuYWJsZVRpbGVJbWFnZXModGlsZVdyYXBwZXIpO1xuICB9XG59XG52YXIgaW5pdF9sb2FkZXJfZXh0ZW5zaW9uID0gX19lc20oe1xuICBcInNyYy9saWJzL2V4dGVuc2lvbnMvc3dpcGVyL2xvYWRlci5leHRlbnNpb24udHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2V4dGVuc2lvbnMvc3dpcGVyL2luZGV4LnRzXG5mdW5jdGlvbiBsb2FkU3dpcGVyU3R5bGVzKCkge1xuICBzZGsuYWRkV2lkZ2V0Q3VzdG9tU3R5bGVzKGZvbnRfZGVmYXVsdCk7XG4gIHNkay5hZGRTaGFyZWRDc3NDdXN0b21TdHlsZXMoXCJzd2lwZXItYnVuZGxlXCIsIHN3aXBlcl9idW5kbGVfZGVmYXVsdCwgW1xuICAgIHNkay5wbGFjZW1lbnQuZ2V0V2lkZ2V0SWQoKSxcbiAgICBcImV4cGFuZGVkLXRpbGVzXCIsXG4gICAgXCJ1Z2MtcHJvZHVjdHNcIlxuICBdKTtcbn1cbnZhciBpbml0X3N3aXBlcjIgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvZXh0ZW5zaW9ucy9zd2lwZXIvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2ZvbnQoKTtcbiAgICBpbml0X3N3aXBlcl9idW5kbGUoKTtcbiAgICBpbml0X2xvYWRlcl9leHRlbnNpb24oKTtcbiAgICBpbml0X3N3aXBlcl9leHRlbnNpb24oKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2V4dGVuc2lvbnMvaW5kZXgudHNcbnZhciBpbml0X2V4dGVuc2lvbnMgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvZXh0ZW5zaW9ucy9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfbWFzb25yeV9leHRlbnNpb24oKTtcbiAgICBpbml0X3N3aXBlcjIoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2NvbXBvbmVudHMvZXhwYW5kZWQtdGlsZS1zd2lwZXIvZW1iZWQteW91dHViZS50ZW1wbGF0ZS50c3hcbmZ1bmN0aW9uIEVtYmVkWW91dHViZSh7IHRpbGVJZCwgdmlkZW9JZCB9KSB7XG4gIGNvbnN0IGNvbnRlbnRFbGVtZW50ID0gbG9hZFlvdXR1YmVJZnJhbWVDb250ZW50KHRpbGVJZCwgdmlkZW9JZCk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcbiAgICBcImlmcmFtZVwiLFxuICAgIHtcbiAgICAgIGxvYWRpbmc6IFwibGF6eVwiLFxuICAgICAgaWQ6IGB5dC1mcmFtZS0ke3RpbGVJZH0tJHt2aWRlb0lkfWAsXG4gICAgICBjbGFzczogXCJ2aWRlby1jb250ZW50XCIsXG4gICAgICBmcmFtZWJvcmRlcjogXCIwXCIsXG4gICAgICBzcmNkb2M6IGNvbnRlbnRFbGVtZW50LmlubmVySFRNTFxuICAgIH1cbiAgKTtcbn1cbmZ1bmN0aW9uIGxvYWRZb3V0dWJlSWZyYW1lQ29udGVudCh0aWxlSWQsIHZpZGVvSWQpIHtcbiAgY29uc3Qgc2NyaXB0SWQgPSBgeXQtc2NyaXB0LSR7dGlsZUlkfS0ke3ZpZGVvSWR9YDtcbiAgY29uc3QgcGxheWVySWQgPSBgeXQtcGxheWVyLSR7dGlsZUlkfS0ke3ZpZGVvSWR9YDtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiaHRtbFwiLCBudWxsLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImhlYWRcIiwgbnVsbCwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwgeyBpZDogc2NyaXB0SWQsIHNyYzogXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCIgfSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwic2NyaXB0XCIsIG51bGwsIGxvYWRZb3V0dWJlUGxheWVyQVBJKHBsYXllcklkLCB2aWRlb0lkKSkpLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImJvZHlcIiwgbnVsbCwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBpZDogcGxheWVySWQgfSkpKTtcbn1cbmZ1bmN0aW9uIGxvYWRZb3V0dWJlUGxheWVyQVBJKHBsYXllcklkLCB2aWRlb0lkKSB7XG4gIHJldHVybiBgXG4gIGxldCBwbGF5ZXJcblxuICBmdW5jdGlvbiBsb2FkUGxheWVyKHBsYXlEZWZhdWx0ID0gZmFsc2UpIHtcbiAgICBwbGF5ZXIgPSBuZXcgWVQuUGxheWVyKFwiJHtwbGF5ZXJJZH1cIiwge1xuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgdmlkZW9JZDogXCIke3ZpZGVvSWR9XCIsXG4gICAgICBwbGF5ZXJWYXJzOiB7XG4gICAgICAgIHBsYXlzaW5saW5lOiAxXG4gICAgICB9LFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIG9uUmVhZHk6IHBsYXlEZWZhdWx0ID8gcGxheSA6IHBhdXNlLFxuICAgICAgICBvbkVycm9yOiBlcnJvckhhbmRsZXJcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gQVBJIHJ1bnMgYXV0b21hdGljYWxseSBvbmNlIHRoZSBpZnJhbWUtYXBpIEpTIGlzIGRvd25sb2FkZWQuXG4gIC8vIFRoaXMgd2lsbCBub3QgcnVuIHdoZW4gcmUtb3BlbmluZyBleHBhbmRlZCB0aWxlXG4gIGZ1bmN0aW9uIG9uWW91VHViZUlmcmFtZUFQSVJlYWR5KCkge1xuICAgIGxvYWRQbGF5ZXIoKVxuICB9XG5cbiAgZnVuY3Rpb24gZXJyb3JIYW5kbGVyKGUpIHtcbiAgIHBsYXllcj8uZ2V0SWZyYW1lKCkuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJ5dC12aWRlby1lcnJvclwiLCB7IGRldGFpbDogZSB9KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgIGlmICghcGxheWVyKSB7XG4gICAgICBsb2FkUGxheWVyKGZhbHNlKSAvL25lZWRlZCB3aGVuIGV4cGFuZGVkIHRpbGUgcmUtb3BlbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXllci5tdXRlKClcbiAgICAgIHBsYXllci5wYXVzZVZpZGVvKClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHBsYXllcj8uZGVzdHJveSgpXG4gIH1cblxuICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBwbGF5ZXI/LnNlZWtUbygwLCBmYWxzZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgaWYgKCFwbGF5ZXIpIHtcbiAgICAgIGxvYWRQbGF5ZXIodHJ1ZSkgLy9uZWVkZWQgd2hlbiBleHBhbmRlZCB0aWxlIHJlLW9wZW5lZFxuICAgIH0gZWxzZSB7XG4gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHBsYXllci5pc011dGVkKCkpIHtcbiAgICAgICAgcGxheWVyLnVuTXV0ZSgpXG4gICAgICB9XG4gICAgICBwbGF5ZXIucGxheVZpZGVvKClcbiAgICAgIH0sIDUwMClcbiAgICB9XG4gIH0gYDtcbn1cbnZhciBpbml0X2VtYmVkX3lvdXR1YmVfdGVtcGxhdGUgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci9lbWJlZC15b3V0dWJlLnRlbXBsYXRlLnRzeFwiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfbGlicygpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci90aWxlLnRlbXBsYXRlLnRzeFxuZnVuY3Rpb24gRXhwYW5kZWRUaWxlKHsgc2RrOiBzZGsyLCB0aWxlIH0pIHtcbiAgY29uc3QgeyBzaG93X3Nob3BzcG90cywgc2hvd19wcm9kdWN0cywgc2hvd190YWdzLCBzaG93X3NoYXJpbmcsIHNob3dfY2FwdGlvbiwgc2hvd190aW1lc3RhbXAgfSA9IHNkazIuZ2V0RXhwYW5kZWRUaWxlQ29uZmlnKCk7XG4gIGNvbnN0IHNob3BzcG90RW5hYmxlZCA9IHNkazIuaXNDb21wb25lbnRMb2FkZWQoXCJzaG9wc3BvdHNcIikgJiYgc2hvd19zaG9wc3BvdHMgJiYgISF0aWxlLmhvdHNwb3RzPy5sZW5ndGg7XG4gIGNvbnN0IHByb2R1Y3RzRW5hYmxlZCA9IHNkazIuaXNDb21wb25lbnRMb2FkZWQoXCJwcm9kdWN0c1wiKSAmJiBzaG93X3Byb2R1Y3RzICYmICEhdGlsZS50YWdzX2V4dGVuZGVkPy5sZW5ndGg7XG4gIGNvbnN0IHRhZ3NFbmFibGVkID0gc2hvd190YWdzO1xuICBjb25zdCBzaGFyaW5nVG9vbHNFbmFibGVkID0gc2hvd19zaGFyaW5nO1xuICBjb25zdCBwYXJlbnQgPSBzZGsyLmdldE5vZGVJZCgpO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoY3JlYXRlRnJhZ21lbnQsIG51bGwsIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwicGFuZWxcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInBhbmVsLWxlZnRcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChJY29uU2VjdGlvbiwgeyB0aWxlLCBwcm9kdWN0c0VuYWJsZWQgfSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiaW1hZ2Utd3JhcHBlclwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiaW1hZ2Utd3JhcHBlci1pbm5lclwiIH0sIHRpbGUubWVkaWEgPT09IFwidmlkZW9cIiA/IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KGNyZWF0ZUZyYWdtZW50LCBudWxsLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChWaWRlb0NvbnRhaW5lciwgeyB0aWxlLCBwYXJlbnQgfSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFZpZGVvRXJyb3JGYWxsYmFja1RlbXBsYXRlLCB7IHRpbGUgfSkpIDogdGlsZS5tZWRpYSA9PT0gXCJpbWFnZVwiID8gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoSW1hZ2VUZW1wbGF0ZSwgeyB0aWxlLCBpbWFnZTogdGlsZS5pbWFnZSwgc2hvcHNwb3RFbmFibGVkLCBwYXJlbnQgfSkgOiB0aWxlLm1lZGlhID09PSBcInRleHRcIiA/IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcImNvbnRlbnQtdGV4dFwiIH0sIHRpbGUubWVzc2FnZSkgOiB0aWxlLm1lZGlhID09PSBcImh0bWxcIiA/IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcImNvbnRlbnQtaHRtbFwiIH0sIHRpbGUuaHRtbCkgOiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChjcmVhdGVGcmFnbWVudCwgbnVsbCkpKSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwicGFuZWwtcmlnaHRcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInBhbmVsLXJpZ2h0LXdyYXBwZXJcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImNvbnRlbnQtd3JhcHBlclwiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiY29udGVudC1pbm5lci13cmFwcGVyXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXG4gICAgXCJ0aWxlLWNvbnRlbnRcIixcbiAgICB7XG4gICAgICB0aWxlSWQ6IHRpbGUuaWQsXG4gICAgICBcInJlbmRlci1zaGFyZS1tZW51XCI6IHNoYXJpbmdUb29sc0VuYWJsZWQsXG4gICAgICBcInJlbmRlci1jYXB0aW9uXCI6IHNob3dfY2FwdGlvbixcbiAgICAgIFwicmVuZGVyLXRpbWVwaHJhc2VcIjogc2hvd190aW1lc3RhbXBcbiAgICB9XG4gICksIHRhZ3NFbmFibGVkICYmIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwidGlsZS10YWdzXCIsIHsgXCJ0aWxlLWlkXCI6IHRpbGUuaWQsIG1vZGU6IFwic3dpcGVyXCIsIGNvbnRleHQ6IFwiZXhwYW5kZWRcIiB9KSwgcHJvZHVjdHNFbmFibGVkICYmIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KGNyZWF0ZUZyYWdtZW50LCBudWxsLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInVnYy1wcm9kdWN0c1wiLCB7IHBhcmVudCwgXCJ0aWxlLWlkXCI6IHRpbGUuaWQgfSkpKSkpKSkpO1xufVxuZnVuY3Rpb24gSWNvblNlY3Rpb24oeyB0aWxlLCBwcm9kdWN0c0VuYWJsZWQgfSkge1xuICBjb25zdCB0b3BTZWN0aW9uSWNvbkNvbnRlbnQgPSBbXTtcbiAgY29uc3QgYm90dG9tU2VjdGlvbkljb25Db250ZW50ID0gW107XG4gIGlmICh0aWxlLmF0dHJzLmluY2x1ZGVzKFwiaW5zdGFncmFtLnJlZWxcIikpIHtcbiAgICB0b3BTZWN0aW9uSWNvbkNvbnRlbnQucHVzaCgvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImNvbnRlbnQtaWNvbiBpY29uLXJlZWxcIiB9KSk7XG4gIH0gZWxzZSBpZiAodGlsZS5hdHRycy5pbmNsdWRlcyhcInlvdXR1YmUuc2hvcnRcIikpIHtcbiAgICB0b3BTZWN0aW9uSWNvbkNvbnRlbnQucHVzaCgvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImNvbnRlbnQtaWNvbiBpY29uLXlvdXR1YmUtc2hvcnRcIiB9KSk7XG4gIH1cbiAgaWYgKHByb2R1Y3RzRW5hYmxlZCkge1xuICAgIHRvcFNlY3Rpb25JY29uQ29udGVudC5wdXNoKC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwic2hvcHBpbmctaWNvbiBpY29uLXByb2R1Y3RzXCIgfSkpO1xuICB9XG4gIGJvdHRvbVNlY3Rpb25JY29uQ29udGVudC5wdXNoKC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IGBuZXR3b3JrLWljb24gaWNvbi0ke3RpbGUuc291cmNlfWAgfSkpO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJpY29uLXNlY3Rpb25cIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInRvcC1zZWN0aW9uXCIgfSwgLi4udG9wU2VjdGlvbkljb25Db250ZW50KSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJib3R0b20tc2VjdGlvblwiIH0sIC4uLmJvdHRvbVNlY3Rpb25JY29uQ29udGVudCkpO1xufVxuZnVuY3Rpb24gU2hvcFNwb3RUZW1wbGF0ZSh7IHNob3BzcG90RW5hYmxlZCwgcGFyZW50LCB0aWxlSWQgfSkge1xuICByZXR1cm4gc2hvcHNwb3RFbmFibGVkID8gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoY3JlYXRlRnJhZ21lbnQsIG51bGwsIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwic2hvcHNwb3QtaWNvblwiLCB7IHBhcmVudCwgbW9kZTogXCJleHBhbmRlZFwiLCBcInRpbGUtaWRcIjogdGlsZUlkIH0pKSA6IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KGNyZWF0ZUZyYWdtZW50LCBudWxsKTtcbn1cbmZ1bmN0aW9uIEltYWdlVGVtcGxhdGUoe1xuICB0aWxlLFxuICBpbWFnZSxcbiAgc2hvcHNwb3RFbmFibGVkID0gZmFsc2UsXG4gIHBhcmVudFxufSkge1xuICByZXR1cm4gaW1hZ2UgPyAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChjcmVhdGVGcmFnbWVudCwgbnVsbCwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJpbWFnZS1maWxsZXJcIiwgc3R5bGU6IHsgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IGB1cmwoJyR7aW1hZ2V9JylgIH0gfSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiaW1hZ2VcIiB9LCBzaG9wc3BvdEVuYWJsZWQgPyAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChTaG9wU3BvdFRlbXBsYXRlLCB7IHNob3BzcG90RW5hYmxlZCwgcGFyZW50LCB0aWxlSWQ6IHRpbGUuaWQgfSkgOiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChjcmVhdGVGcmFnbWVudCwgbnVsbCksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgY2xhc3M6IFwiaW1hZ2UtZWxlbWVudFwiLCBzcmM6IGltYWdlLCBsb2FkaW5nOiBcImxhenlcIiwgYWx0OiB0aWxlLmRlc2NyaXB0aW9uIHx8IFwiSW1hZ2VcIiB9KSkpIDogLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoY3JlYXRlRnJhZ21lbnQsIG51bGwpO1xufVxuZnVuY3Rpb24gVmlkZW9Db250YWluZXIoeyB0aWxlLCBwYXJlbnQgfSkge1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ2aWRlby1jb250ZW50LXdyYXBwZXJcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImltYWdlLWZpbGxlclwiLCBzdHlsZTogeyBcImJhY2tncm91bmQtaW1hZ2VcIjogYHVybCgnJHt0aWxlLm9yaWdpbmFsX2ltYWdlX3VybH0nKWAgfSB9KSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoU291cmNlVmlkZW9Db250ZW50LCB7IHRpbGUsIHBhcmVudCB9KSk7XG59XG5mdW5jdGlvbiBTb3VyY2VWaWRlb0NvbnRlbnQoeyB0aWxlLCBwYXJlbnQgfSkge1xuICBpZiAodGlsZS5zb3VyY2UgPT09IFwidGlrdG9rXCIgfHwgdGlsZS52aWRlb19zb3VyY2UgPT09IFwidGlrdG9rXCIpIHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoVGlrVG9rVGVtcGxhdGUsIHsgdGlsZSB9KTtcbiAgfVxuICBpZiAodGlsZS5zb3VyY2UgPT09IFwieW91dHViZVwiICYmIHRpbGUueW91dHViZV9pZCkge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChFbWJlZFlvdXR1YmUsIHsgdGlsZUlkOiB0aWxlLmlkLCB2aWRlb0lkOiB0aWxlLnlvdXR1YmVfaWQgfSk7XG4gIH1cbiAgaWYgKHRpbGUuc291cmNlID09PSBcImZhY2Vib29rXCIpIHtcbiAgICBjb25zdCB2aWRlb1VybFBhdHRlcm4gPSAvdmlkZW9zXFwvKFxcZCkrPy87XG4gICAgaWYgKCF0aWxlLnZpZGVvX2ZpbGVzPy5sZW5ndGggfHwgIXZpZGVvVXJsUGF0dGVybi50ZXN0KHRpbGUudmlkZW9fZmlsZXNbMF0udXJsKSkge1xuICAgICAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFZpZGVvRXJyb3JGYWxsYmFja1RlbXBsYXRlLCB7IHRpbGUsIHBhcmVudCwgZGVmYXVsdEhpZGRlbjogZmFsc2UgfSk7XG4gICAgfVxuICB9XG4gIGlmICh0aWxlLnNvdXJjZSA9PT0gXCJ0d2l0dGVyXCIpIHtcbiAgICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoVHdpdHRlclRlbXBsYXRlLCB7IHRpbGUgfSk7XG4gIH1cbiAgaWYgKHRpbGUudmlkZW9fZmlsZXM/Lmxlbmd0aCB8fCB0aWxlLnZpZGVvICYmIHRpbGUudmlkZW8uc3RhbmRhcmRfcmVzb2x1dGlvbikge1xuICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChVZ2NWaWRlb1RlbXBsYXRlLCB7IHRpbGUgfSk7XG4gIH1cbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KEZhY2Vib29rRmFsbGJhY2tUZW1wbGF0ZSwgeyB0aWxlIH0pO1xufVxuZnVuY3Rpb24gZ2V0VmlkZW9EYXRhKHRpbGUpIHtcbiAgaWYgKHRpbGUudmlkZW9fZmlsZXM/Lmxlbmd0aCkge1xuICAgIHJldHVybiB0aWxlLnZpZGVvX2ZpbGVzWzBdO1xuICB9XG4gIGlmICh0aWxlLnZpZGVvICYmIHRpbGUudmlkZW8uc3RhbmRhcmRfcmVzb2x1dGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogXCJhdXRvXCIsXG4gICAgICBoZWlnaHQ6IFwiYXV0b1wiLFxuICAgICAgbWltZTogXCJ2aWRlby9tcDRcIixcbiAgICAgIHVybDogdGlsZS52aWRlby5zdGFuZGFyZF9yZXNvbHV0aW9uLnVybFxuICAgIH07XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgdmlkZW8gZGF0YVwiKTtcbn1cbmZ1bmN0aW9uIFVnY1ZpZGVvVGVtcGxhdGUoeyB0aWxlIH0pIHtcbiAgY29uc3QgeyB1cmwsIHdpZHRoLCBoZWlnaHQsIG1pbWUgfSA9IGdldFZpZGVvRGF0YSh0aWxlKTtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFxuICAgIFwidmlkZW9cIixcbiAgICB7XG4gICAgICBtdXRlZDogdHJ1ZSxcbiAgICAgIHRpbGVpZDogdGlsZS5pZCxcbiAgICAgIGNsYXNzOiBcInZpZGVvLWNvbnRlbnRcIixcbiAgICAgIGNvbnRyb2xzOiB0cnVlLFxuICAgICAgcHJlbG9hZDogXCJub25lXCIsXG4gICAgICBwbGF5c2lubGluZTogXCJwbGF5c2lubGluZVwiLFxuICAgICAgb25jYW5wbGF5OiBcInRoaXMubXV0ZWQ9dHJ1ZVwiXG4gICAgfSxcbiAgICAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInNvdXJjZVwiLCB7IHNyYzogdXJsLCB3aWR0aDogd2lkdGgudG9TdHJpbmcoKSwgaGVpZ2h0OiBoZWlnaHQudG9TdHJpbmcoKSwgdHlwZTogbWltZSB9KVxuICApO1xufVxuZnVuY3Rpb24gVHdpdHRlclRlbXBsYXRlKHsgdGlsZSB9KSB7XG4gIGNvbnN0IHsgc3RhbmRhcmRfcmVzb2x1dGlvbiB9ID0gdGlsZS52aWRlbztcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFxuICAgIFwidmlkZW9cIixcbiAgICB7XG4gICAgICB0aWxlaWQ6IHRpbGUuaWQsXG4gICAgICBjbGFzczogXCJ2aWRlby1jb250ZW50XCIsXG4gICAgICBjb250cm9sczogdHJ1ZSxcbiAgICAgIHByZWxvYWQ6IFwibm9uZVwiLFxuICAgICAgcGxheXNpbmxpbmU6IFwicGxheXNpbmxpbmVcIixcbiAgICAgIG9uY2FucGxheTogXCJ0aGlzLm11dGVkPXRydWVcIlxuICAgIH0sXG4gICAgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJzb3VyY2VcIiwgeyBzcmM6IHN0YW5kYXJkX3Jlc29sdXRpb24udXJsIH0pXG4gICk7XG59XG5mdW5jdGlvbiBUaWtUb2tUZW1wbGF0ZSh7IHRpbGUgfSkge1xuICBjb25zdCB0aWt0b2tJZCA9IHRpbGUudGlrdG9rX2lkO1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXG4gICAgXCJpZnJhbWVcIixcbiAgICB7XG4gICAgICBpZDogYHRpa3Rvay1mcmFtZS0ke3RpbGUuaWR9LSR7dGlrdG9rSWR9YCxcbiAgICAgIGxvYWRpbmc6IFwibGF6eVwiLFxuICAgICAgY2xhc3M6IFwidmlkZW8tY29udGVudFwiLFxuICAgICAgZnJhbWVib3JkZXI6IFwiMFwiLFxuICAgICAgYWxsb3dmdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgYWxsb3c6IFwiYXV0b3BsYXlcIixcbiAgICAgIHNyYzogYGh0dHBzOi8vd3d3LnRpa3Rvay5jb20vcGxheWVyL3YxLyR7dGlrdG9rSWR9P3JlbD0wYFxuICAgIH1cbiAgKTtcbn1cbmZ1bmN0aW9uIEZhY2Vib29rRmFsbGJhY2tUZW1wbGF0ZSh7IHRpbGUgfSkge1xuICBjb25zdCBlbWJlZEJsb2NrID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJmYi1jb250ZW50LXdyYXBwZXJcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGlkOiBcImZiLXJvb3RcIiB9KSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXG4gICAgXCJzY3JpcHRcIixcbiAgICB7XG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICAgIGRlZmVyOiB0cnVlLFxuICAgICAgY3Jvc3NvcmlnaW46IFwiYW5vbnltb3VzXCIsXG4gICAgICBzcmM6IFwiaHR0cHM6Ly9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9HQi9zZGsuanMjeGZibWw9MSZ2ZXJzaW9uPXYyMS4wXCJcbiAgICB9XG4gICksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiZmItdmlkZW9cIiwgXCJkYXRhLWhyZWZcIjogdGlsZS5vcmlnaW5hbF9saW5rLCBcImRhdGEtd2lkdGhcIjogXCI1MDBcIiwgXCJkYXRhLXNob3ctdGV4dFwiOiBcImZhbHNlXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJibG9ja3F1b3RlXCIsIHsgY2l0ZTogdGlsZS5vcmlnaW5hbF9saW5rLCBjbGFzczogXCJmYi14ZmJtbC1wYXJzZS1pZ25vcmVcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImFcIiwgeyBocmVmOiB0aWxlLm9yaWdpbmFsX2xpbmsgfSksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwicFwiLCBudWxsKSwgXCJQb3N0ZWQgYnkgXCIsIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiYVwiLCB7IGhyZWY6IGBodHRwczovL3d3dy5mYWNlYm9vay5jb20vJCR7dGlsZS5zb3VyY2VfdXNlcl9pZH1gIH0sIHRpbGUubmFtZSksIFwiIG9uXCIsIHRpbGUudGltZV9hZ28pKSk7XG4gIHJldHVybiAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImlmcmFtZVwiLCB7IGxvYWRpbmc6IFwibGF6eVwiLCBjbGFzczogXCJ2aWRlby1jb250ZW50XCIsIGZyYW1lYm9yZGVyOiBcIjBcIiwgYWxsb3dmdWxsc2NyZWVuOiB0cnVlLCBzcmNkb2M6IGVtYmVkQmxvY2suaW5uZXJIVE1MIH0pO1xufVxuZnVuY3Rpb24gVmlkZW9FcnJvckZhbGxiYWNrVGVtcGxhdGUoe1xuICB0aWxlLFxuICBkZWZhdWx0SGlkZGVuID0gdHJ1ZVxufSkge1xuICBjb25zdCBvcmlnaW5hbEltYWdlVXJsID0gdGlsZS5vcmlnaW5hbF9pbWFnZV91cmw7XG4gIGNvbnN0IGZhbGxiYWNrQ3NzID0gYHZpZGVvLWZhbGxiYWNrLWNvbnRlbnQke2RlZmF1bHRIaWRkZW4gPyBcIiBoaWRkZW5cIiA6IFwiXCJ9YDtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IGZhbGxiYWNrQ3NzIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiY2VudGVyLXNlY3Rpb25cIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInBsYXktaWNvblwiIH0pKSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgaHJlZjogdGlsZS5vcmlnaW5hbF91cmwgfHwgdGlsZS5vcmlnaW5hbF9saW5rLCB0YXJnZXQ6IFwiX2JsYW5rXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoSW1hZ2VUZW1wbGF0ZSwgeyBpbWFnZTogb3JpZ2luYWxJbWFnZVVybCwgdGlsZSB9KSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJwbGF5LWljb25cIiB9KSkpO1xufVxudmFyIGluaXRfdGlsZV90ZW1wbGF0ZSA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL3RpbGUudGVtcGxhdGUudHN4XCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9saWJzKCk7XG4gICAgaW5pdF9lbWJlZF95b3V0dWJlX3RlbXBsYXRlKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL2Jhc2UudGVtcGxhdGUudHN4XG5mdW5jdGlvbiBFeHBhbmRlZFRpbGVzKHNkazIpIHtcbiAgY29uc3QgdGlsZXMgPSBzZGsyLnRpbGVzLnRpbGVzO1xuICBjb25zdCB7IHNob3dfbmF2IH0gPSBzZGsyLmdldEV4cGFuZGVkVGlsZUNvbmZpZygpO1xuICBjb25zdCBuYXZpZ2F0aW9uQXJyb3dzRW5hYmxlZCA9IHNob3dfbmF2O1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJleHBhbmRlZC10aWxlLXdyYXBwZXJcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcImFcIiwgeyBjbGFzczogXCJleGl0XCIsIGhyZWY6IFwiI1wiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcIndpZGdldC1pY29uIGNsb3NlLXdoaXRlXCIgfSkpLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChCYWNrQXJyb3dJY29uLCBudWxsKSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJzd2lwZXIgc3dpcGVyLWV4cGFuZGVkXCIgfSwgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJzd2lwZXItd3JhcHBlciB1Z2MtdGlsZXNcIiB9LCBPYmplY3QudmFsdWVzKHRpbGVzKS5tYXAoKHRpbGUpID0+IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgY2xhc3M6IFwidWdjLXRpbGUgc3dpcGVyLXNsaWRlXCIsXG4gICAgICBcImRhdGEtaWRcIjogdGlsZS5pZCxcbiAgICAgIFwiZGF0YS15dC1pZFwiOiB0aWxlLnlvdXR1YmVfaWQgfHwgXCJcIixcbiAgICAgIFwiZGF0YS10aWt0b2staWRcIjogdGlsZS50aWt0b2tfaWQgfHwgXCJcIlxuICAgIH0sXG4gICAgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoRXhwYW5kZWRUaWxlLCB7IHNkazogc2RrMiwgdGlsZSB9KVxuICApKSkpLCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcbiAgICBcImRpdlwiLFxuICAgIHtcbiAgICAgIGNsYXNzOiBcInN3aXBlci1leHBhbmRlZC1idXR0b24tcHJldiBzd2lwZXItYnV0dG9uLXByZXYgYnRuLWxnXCIsXG4gICAgICBzdHlsZTogeyBkaXNwbGF5OiBuYXZpZ2F0aW9uQXJyb3dzRW5hYmxlZCA/IFwiZmxleFwiIDogXCJub25lXCIgfVxuICAgIH0sXG4gICAgLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3M6IFwiY2hldnJvbi1sZWZ0XCIsIGFsdDogXCJQcmV2aW91cyBhcnJvd1wiIH0pXG4gICksIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFxuICAgIFwiZGl2XCIsXG4gICAge1xuICAgICAgY2xhc3M6IFwic3dpcGVyLWV4cGFuZGVkLWJ1dHRvbi1uZXh0IHN3aXBlci1idXR0b24tbmV4dCBidG4tbGdcIixcbiAgICAgIHN0eWxlOiB7IGRpc3BsYXk6IG5hdmlnYXRpb25BcnJvd3NFbmFibGVkID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9XG4gICAgfSxcbiAgICAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzczogXCJjaGV2cm9uLXJpZ2h0XCIsIGFsdDogXCJOZXh0IGFycm93XCIgfSlcbiAgKSk7XG59XG5mdW5jdGlvbiBCYWNrQXJyb3dJY29uKCkge1xuICByZXR1cm4gLyogQF9fUFVSRV9fICovIGNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgY2xhc3M6IFwiYmFja1wiLCBocmVmOiBcIiNcIiB9LCAvKiBAX19QVVJFX18gKi8gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzczogXCJ3aWRnZXQtaWNvbiBiYWNrLWFycm93XCIgfSkpO1xufVxudmFyIGluaXRfYmFzZV90ZW1wbGF0ZSA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL2Jhc2UudGVtcGxhdGUudHN4XCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF90aWxlX3RlbXBsYXRlKCk7XG4gICAgaW5pdF9saWJzKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9jb21wb25lbnRzL2V4cGFuZGVkLXRpbGUtc3dpcGVyL2luZGV4LnRzXG5mdW5jdGlvbiBsb2FkRGVmYXVsdEV4cGFuZGVkVGlsZVRlbXBsYXRlcyhhZGRFeHBhbmRlZFRpbGVUZW1wbGF0ZXMpIHtcbiAgaWYgKGFkZEV4cGFuZGVkVGlsZVRlbXBsYXRlcykge1xuICAgIHNkay5hZGRUZW1wbGF0ZVRvQ29tcG9uZW50KEV4cGFuZGVkVGlsZXMsIFwiZXhwYW5kZWQtdGlsZXNcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIGxvYWRXaWRnZXRGb250cyhkZWZhdWx0Rm9udCkge1xuICBzZGsuYWRkV2lkZ2V0Q3VzdG9tU3R5bGVzKGAgXG4gICAgQGltcG9ydCB1cmwoJyR7ZGVmYXVsdEZvbnR9Jyk7XG4gIGJvZHkge1xuICAgIGZvbnQtZmFtaWx5OiAnSW50ZXInLCBzYW5zLXNlcmlmO1xuICB9YCk7XG59XG5mdW5jdGlvbiBsb2FkRXhwYW5kZWRUaWxlVGVtcGxhdGVzKHNldHRpbmdzKSB7XG4gIGxvYWREZWZhdWx0RXhwYW5kZWRUaWxlVGVtcGxhdGVzKHNldHRpbmdzLnVzZURlZmF1bHRFeHBhbmRlZFRpbGVUZW1wbGF0ZXMpO1xuICBsb2FkV2lkZ2V0Rm9udHMoc2V0dGluZ3MuZGVmYXVsdEZvbnQpO1xuICBpZiAoc2V0dGluZ3MudXNlRGVmYXVsdFN3aXBlclN0eWxlcykge1xuICAgIGxvYWRTd2lwZXJTdHlsZXMoKTtcbiAgfVxufVxudmFyIGluaXRfZXhwYW5kZWRfdGlsZV9zd2lwZXIgPSBfX2VzbSh7XG4gIFwic3JjL2xpYnMvY29tcG9uZW50cy9leHBhbmRlZC10aWxlLXN3aXBlci9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfYmFzZV90ZW1wbGF0ZSgpO1xuICAgIGluaXRfc3dpcGVyMigpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYnMvY29tcG9uZW50cy9sb2FkLW1vcmUvbG9hZC1tb3JlLnRlbXBsYXRlLnRzeFxuZnVuY3Rpb24gTG9hZE1vcmVUZW1wbGF0ZSgpIHtcbiAgcmV0dXJuIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiYnV0dG9uc1wiIH0sIC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVFbGVtZW50KFwiYVwiLCB7IGlkOiBcImxvYWQtbW9yZVwiIH0sIFwiTE9BRCBNT1JFXCIpKTtcbn1cbnZhciBpbml0X2xvYWRfbW9yZV90ZW1wbGF0ZSA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jb21wb25lbnRzL2xvYWQtbW9yZS9sb2FkLW1vcmUudGVtcGxhdGUudHN4XCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9saWJzKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9jb21wb25lbnRzL2xvYWQtbW9yZS9sb2FkLW1vcmUuY29tcG9uZW50LnRzXG52YXIgTG9hZE1vcmVDb21wb25lbnQ7XG52YXIgaW5pdF9sb2FkX21vcmVfY29tcG9uZW50ID0gX19lc20oe1xuICBcInNyYy9saWJzL2NvbXBvbmVudHMvbG9hZC1tb3JlL2xvYWQtbW9yZS5jb21wb25lbnQudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2xvYWRfbW9yZV90ZW1wbGF0ZSgpO1xuICAgIExvYWRNb3JlQ29tcG9uZW50ID0gY2xhc3MgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgIH1cbiAgICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKExvYWRNb3JlVGVtcGxhdGUoKSk7XG4gICAgICB9XG4gICAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRyeSB7XG4gICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUoXCJsb2FkLW1vcmVcIiwgTG9hZE1vcmVDb21wb25lbnQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2NvbXBvbmVudHMvbG9hZC1tb3JlL2luZGV4LnRzXG52YXIgbG9hZF9tb3JlX2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KGxvYWRfbW9yZV9leHBvcnRzLCB7XG4gIGRlZmF1bHQ6ICgpID0+IGxvYWRfbW9yZV9kZWZhdWx0XG59KTtcbnZhciBsb2FkX21vcmVfZGVmYXVsdDtcbnZhciBpbml0X2xvYWRfbW9yZSA9IF9fZXNtKHtcbiAgXCJzcmMvbGlicy9jb21wb25lbnRzL2xvYWQtbW9yZS9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfbG9hZF9tb3JlX2NvbXBvbmVudCgpO1xuICAgIGxvYWRfbW9yZV9kZWZhdWx0ID0gTG9hZE1vcmVDb21wb25lbnQ7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGlicy9jb21wb25lbnRzL2luZGV4LnRzXG52YXIgaW5pdF9jb21wb25lbnRzID0gX19lc20oe1xuICBcInNyYy9saWJzL2NvbXBvbmVudHMvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2V4cGFuZGVkX3RpbGVfc3dpcGVyKCk7XG4gICAgaW5pdF9sb2FkX21vcmUoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWJzL2luZGV4LnRzXG52YXIgaW5pdF9saWJzID0gX19lc20oe1xuICBcInNyYy9saWJzL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF9jc3NfdmFyaWFibGVzKCk7XG4gICAgaW5pdF9qc3hfaHRtbCgpO1xuICAgIGluaXRfdGlsZV9saWIoKTtcbiAgICBpbml0X3dpZGdldF9jb21wb25lbnRzKCk7XG4gICAgaW5pdF93aWRnZXRfZmVhdHVyZXMoKTtcbiAgICBpbml0X3dpZGdldF9sYXlvdXQoKTtcbiAgICBpbml0X3dpZGdldF91dGlscygpO1xuICAgIGluaXRfZXh0ZW5zaW9ucygpO1xuICAgIGluaXRfY29tcG9uZW50cygpO1xuICB9XG59KTtcblxuLy8gc3JjL2V2ZW50cy9pbmRleC50c1xuZnVuY3Rpb24gbG9hZExpc3RlbmVycyhzZXR0aW5ncykge1xuICBjb25zdCB7XG4gICAgb25Mb2FkOiBvbkxvYWQyLFxuICAgIG9uRXhwYW5kVGlsZSxcbiAgICBvblRpbGVDbG9zZSxcbiAgICBvblRpbGVSZW5kZXJlZDogb25UaWxlUmVuZGVyZWQyLFxuICAgIG9uQ3Jvc3NTZWxsZXJzUmVuZGVyZWQsXG4gICAgb25UaWxlc1VwZGF0ZWQsXG4gICAgb25XaWRnZXRJbml0Q29tcGxldGUsXG4gICAgb25UaWxlQmdJbWdSZW5kZXJDb21wbGV0ZSxcbiAgICBvblRpbGVCZ0ltYWdlRXJyb3IsXG4gICAgb25SZXNpemU6IG9uUmVzaXplMixcbiAgICBvbkxvYWRNb3JlLFxuICAgIG9uUHJvZHVjdEFjdGlvbkNsaWNrLFxuICAgIG9uRXhwYW5kZWRUaWxlSW1hZ2VMb2FkLFxuICAgIG9uRXhwYW5kZWRUaWxlT3BlbixcbiAgICBvbkV4cGFuZGVkVGlsZUNsb3NlLFxuICAgIG9uQmVmb3JlRXhwYW5kZWRUaWxlSW1hZ2VSZXNpemUsXG4gICAgb25CZWZvcmVFeHBhbmRlZFRpbGVDbG9zZSxcbiAgICBvbkJlZm9yZUV4cGFuZGVkVGlsZU9wZW4sXG4gICAgb25TaG9wc3BvdEZseW91dEV4cGFuZCxcbiAgICBvblNob3BzcG90VG9nZ2xlLFxuICAgIG9uU2hvcHNwb3RPcGVuLFxuICAgIG9uU2hvcHNwb3RBY3Rpb25DbGljayxcbiAgICBvblVzZXJDbGljayxcbiAgICBvblNoYXJlQ2xpY2ssXG4gICAgb25JbXByZXNzaW9uLFxuICAgIG9uTGlrZSxcbiAgICBvbkRpc2xpa2UsXG4gICAgb25Ib3ZlcixcbiAgICBvblByb2R1Y3RDbGljayxcbiAgICBvblByb2R1Y3RQaW5DbGljayxcbiAgICBvblByb2R1Y3RVc2VyQ2xpY2ssXG4gICAgb25TaG9wc3BvdEZseW91dCxcbiAgICBvblRpbGVNZXRhZGF0YUxvYWRlZCxcbiAgICBvblRpbGVEYXRhU2V0LFxuICAgIG9uSHRtbFJlbmRlcmVkLFxuICAgIG9uSnNSZW5kZXJlZCxcbiAgICBvbkdsb2JhbHNMb2FkZWQsXG4gICAgb25Qcm9kdWN0UGFnZUxvYWRlZCxcbiAgICBvblByb2R1Y3RzVXBkYXRlZCxcbiAgICBvbkFkZFRvQ2FydEZhaWxlZCxcbiAgICBvbkVtYWlsVGlsZUxvYWQsXG4gICAgb25FbWFpbFRpbGVDbGljayxcbiAgICBvbkxpa2VDbGljayxcbiAgICBvbkRpc2xpa2VDbGljayxcbiAgICBvblRpbGVFeHBhbmRQcm9kdWN0UmVjc1JlbmRlcmVkLFxuICAgIG9uVGlsZUV4cGFuZENyb3NzU2VsbGVyc1JlbmRlcmVkLFxuICAgIG9uU2hhcmVNZW51T3BlbmVkLFxuICAgIG9uU2hhcmVNZW51Q2xvc2VkXG4gIH0gPSBzZXR0aW5ncy5jYWxsYmFja3M7XG4gIG9uTG9hZDI/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9MT0FELCBldmVudDIpKTtcbiAgb25FeHBhbmRUaWxlPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfVElMRV9FWFBBTkRfUkVOREVSRUQsIGV2ZW50MikpO1xuICBvblRpbGVDbG9zZT8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKFwib25UaWxlQ2xvc2VcIiwgZXZlbnQyKSk7XG4gIG9uVGlsZVJlbmRlcmVkMj8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlclRpbGVFeHBhbmRMaXN0ZW5lcihldmVudDIpKTtcbiAgb25Dcm9zc1NlbGxlcnNSZW5kZXJlZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKFwiY3Jvc3NTZWxsZXJzUmVuZGVyZWRcIiwgZXZlbnQyKSk7XG4gIG9uV2lkZ2V0SW5pdENvbXBsZXRlPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoXCJ3aWRnZXRJbml0XCIsIGV2ZW50MikpO1xuICBvblRpbGVCZ0ltZ1JlbmRlckNvbXBsZXRlPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfVElMRV9CR19JTUdfUkVOREVSX0NPTVBMRVRFLCBldmVudDIpKTtcbiAgb25UaWxlQmdJbWFnZUVycm9yPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfVElMRV9CR19JTUdfRVJST1IsIGV2ZW50MikpO1xuICBvblJlc2l6ZTI/LmZvckVhY2goKGV2ZW50MikgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgZXZlbnQyKSk7XG4gIG9uVGlsZXNVcGRhdGVkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfVElMRVNfVVBEQVRFRCwgZXZlbnQyKSk7XG4gIG9uTG9hZE1vcmU/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihcImxvYWRNb3JlXCIsIGV2ZW50MikpO1xuICBvblByb2R1Y3RBY3Rpb25DbGljaz8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKFBST0RVQ1RfQUNUSU9OX0NMSUNLLCBldmVudDIpKTtcbiAgb25FeHBhbmRlZFRpbGVJbWFnZUxvYWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFWFBBTkRFRF9USUxFX0lNQUdFX0xPQUQsIGV2ZW50MikpO1xuICBvbkV4cGFuZGVkVGlsZU9wZW4/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFWFBBTkRFRF9USUxFX09QRU4sIGV2ZW50MikpO1xuICBvbkV4cGFuZGVkVGlsZUNsb3NlPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVhQQU5ERURfVElMRV9DTE9TRSwgZXZlbnQyKSk7XG4gIG9uQmVmb3JlRXhwYW5kZWRUaWxlSW1hZ2VSZXNpemU/LmZvckVhY2goXG4gICAgKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihCRUZPUkVfRVhQQU5ERURfVElMRV9JTUFHRV9SRVNJWkUsIGV2ZW50MilcbiAgKTtcbiAgb25CZWZvcmVFeHBhbmRlZFRpbGVDbG9zZT8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEJFRk9SRV9FWFBBTkRFRF9USUxFX0NMT1NFLCBldmVudDIpKTtcbiAgb25CZWZvcmVFeHBhbmRlZFRpbGVPcGVuPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoQkVGT1JFX0VYUEFOREVEX1RJTEVfT1BFTiwgZXZlbnQyKSk7XG4gIG9uU2hvcHNwb3RGbHlvdXRFeHBhbmQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihTSE9QU1BPVF9GTFlPVVRfRVhQQU5ELCBldmVudDIpKTtcbiAgb25TaG9wc3BvdFRvZ2dsZT8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKFNIT1BTUE9UX1RPR0dMRSwgZXZlbnQyKSk7XG4gIG9uU2hvcHNwb3RPcGVuPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoU0hPUFNQT1RfT1BFTiwgZXZlbnQyKSk7XG4gIG9uU2hvcHNwb3RBY3Rpb25DbGljaz8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKFNIT1BTUE9UX0FDVElPTl9DTElDSywgZXZlbnQyKSk7XG4gIG9uVXNlckNsaWNrPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoVVNFUl9DTElDSywgZXZlbnQyKSk7XG4gIG9uU2hhcmVDbGljaz8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1NIQVJFX0NMSUNLLCBldmVudDIpKTtcbiAgb25JbXByZXNzaW9uPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfSU1QUkVTU0lPTiwgZXZlbnQyKSk7XG4gIG9uTGlrZT8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX0xJS0UsIGV2ZW50MikpO1xuICBvbkRpc2xpa2U/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9ESVNMSUtFLCBldmVudDIpKTtcbiAgb25Ib3Zlcj8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX0hPVkVSLCBldmVudDIpKTtcbiAgb25Qcm9kdWN0Q2xpY2s/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9QUk9EVUNUX0NMSUNLLCBldmVudDIpKTtcbiAgb25Qcm9kdWN0UGluQ2xpY2s/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9QUk9EVUNUX1BJTkNMSUNLLCBldmVudDIpKTtcbiAgb25Qcm9kdWN0VXNlckNsaWNrPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfUFJPRFVDVF9VU0VSX0NMSUNLLCBldmVudDIpKTtcbiAgb25TaG9wc3BvdEZseW91dD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1NIT1BTUE9UX0ZMWU9VVCwgZXZlbnQyKSk7XG4gIG9uVGlsZU1ldGFkYXRhTG9hZGVkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfVElMRV9NRVRBREFUQV9MT0FERUQsIGV2ZW50MikpO1xuICBvblRpbGVEYXRhU2V0Py5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfVElMRV9EQVRBX1NFVCwgZXZlbnQyKSk7XG4gIG9uSHRtbFJlbmRlcmVkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfSFRNTF9SRU5ERVJFRCwgZXZlbnQyKSk7XG4gIG9uSnNSZW5kZXJlZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX0pTX1JFTkRFUkVELCBldmVudDIpKTtcbiAgb25HbG9iYWxzTG9hZGVkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfR0xPQkFMU19MT0FERUQsIGV2ZW50MikpO1xuICBvblByb2R1Y3RQYWdlTG9hZGVkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfUFJPRFVDVF9QQUdFX0xPQURFRCwgZXZlbnQyKSk7XG4gIG9uUHJvZHVjdHNVcGRhdGVkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfUFJPRFVDVFNfVVBEQVRFRCwgZXZlbnQyKSk7XG4gIG9uQWRkVG9DYXJ0RmFpbGVkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfQUREX1RPX0NBUlRfRkFJTEVELCBldmVudDIpKTtcbiAgb25FbWFpbFRpbGVMb2FkPy5mb3JFYWNoKChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRU1BSUxfVElMRV9MT0FELCBldmVudDIpKTtcbiAgb25FbWFpbFRpbGVDbGljaz8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVNQUlMX1RJTEVfQ0xJQ0ssIGV2ZW50MikpO1xuICBvbkxpa2VDbGljaz8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKExJS0VfQ0xJQ0ssIGV2ZW50MikpO1xuICBvbkRpc2xpa2VDbGljaz8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKERJU0xJS0VfQ0xJQ0ssIGV2ZW50MikpO1xuICBvblRpbGVFeHBhbmRQcm9kdWN0UmVjc1JlbmRlcmVkPy5mb3JFYWNoKFxuICAgIChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfVElMRV9FWFBBTkRfUFJPRF9SRUNTX1JFTkRFUkVELCBldmVudDIpXG4gICk7XG4gIG9uVGlsZUV4cGFuZENyb3NzU2VsbGVyc1JlbmRlcmVkPy5mb3JFYWNoKFxuICAgIChldmVudDIpID0+IHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoRVZFTlRfVElMRV9FWFBBTkRfQ1JPU1NfU0VMTEVSU19SRU5ERVJFRCwgZXZlbnQyKVxuICApO1xuICBvblNoYXJlTWVudU9wZW5lZD8uZm9yRWFjaCgoZXZlbnQyKSA9PiByZWdpc3RlckdlbmVyaWNFdmVudExpc3RlbmVyKEVWRU5UX1NIQVJFX01FTlVfT1BFTkVELCBldmVudDIpKTtcbiAgb25TaGFyZU1lbnVDbG9zZWQ/LmZvckVhY2goKGV2ZW50MikgPT4gcmVnaXN0ZXJHZW5lcmljRXZlbnRMaXN0ZW5lcihFVkVOVF9TSEFSRV9NRU5VX0NMT1NFRCwgZXZlbnQyKSk7XG59XG5mdW5jdGlvbiByZWdpc3RlckRlZmF1bHRDbGlja0V2ZW50cygpIHtcbiAgY29uc3QgdGlsZXMgPSBzZGsucXVlcnlTZWxlY3RvckFsbChcIi51Z2MtdGlsZVwiKTtcbiAgaWYgKCF0aWxlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmaW5kIHRpbGVzIFVJIGVsZW1lbnRcIik7XG4gIH1cbiAgdGlsZXMuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgIGNvbnN0IHRpbGVEYXRhSWQgPSB0aWxlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gICAgaWYgKCF0aWxlRGF0YUlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCB0aWxlIGRhdGEgSURcIik7XG4gICAgfVxuICAgIGNvbnN0IHVybCA9IHNkay50aWxlcy5nZXRUaWxlKHRpbGVEYXRhSWQpPy5vcmlnaW5hbF91cmw7XG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIkZhaWxlZCB0byBmaW5kIHRpbGUgVVJMXCIsIHRpbGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aWxlLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgaGFuZGxlVGlsZUNsaWNrKGUsIHVybCk7XG4gICAgfTtcbiAgfSk7XG59XG5mdW5jdGlvbiByZWdpc3RlclRpbGVFeHBhbmRMaXN0ZW5lcihmbiA9ICgpID0+IHtcbn0pIHtcbiAgc2RrLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRfVElMRV9FWFBBTkQsIChldmVudDIpID0+IHtcbiAgICBjb25zdCBjdXN0b21FdmVudCA9IGV2ZW50MjtcbiAgICBjb25zdCB0aWxlSWQgPSBjdXN0b21FdmVudC5kZXRhaWwuZGF0YS50aWxlSWQ7XG4gICAgZm4odGlsZUlkKTtcbiAgfSk7XG59XG5mdW5jdGlvbiByZWdpc3RlckNyb3NzU2VsbGVyc0xvYWRMaXN0ZW5lcihmbiA9ICgpID0+IHtcbn0pIHtcbiAgc2RrLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRfVElMRV9FWFBBTkRfQ1JPU1NfU0VMTEVSU19SRU5ERVJFRCwgKGV2ZW50MikgPT4ge1xuICAgIGNvbnN0IGN1c3RvbUV2ZW50ID0gZXZlbnQyO1xuICAgIGNvbnN0IHRpbGVJZCA9IGN1c3RvbUV2ZW50LmRldGFpbC5kYXRhO1xuICAgIGNvbnN0IHRhcmdldCA9IGN1c3RvbUV2ZW50LmRldGFpbC50YXJnZXQ7XG4gICAgZm4odGlsZUlkLCB0YXJnZXQpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmbikge1xuICBzZGsuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZuKTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyU2hhcmVNZW51T3BlbmVkTGlzdGVuZXIoZm4gPSAoKSA9PiB7XG59KSB7XG4gIHNkay5hZGRFdmVudExpc3RlbmVyKEVWRU5UX1NIQVJFX01FTlVfT1BFTkVELCAoZXZlbnQyKSA9PiB7XG4gICAgY29uc3QgY3VzdG9tRXZlbnQgPSBldmVudDI7XG4gICAgY29uc3Qgc291cmNlSWQgPSBjdXN0b21FdmVudC5kZXRhaWwuc291cmNlSWQ7XG4gICAgZm4oc291cmNlSWQpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyU2hhcmVNZW51Q2xvc2VkTGlzdGVuZXIoZm4gPSAoKSA9PiB7XG59KSB7XG4gIHNkay5hZGRFdmVudExpc3RlbmVyKEVWRU5UX1NIQVJFX01FTlVfQ0xPU0VELCAoZXZlbnQyKSA9PiB7XG4gICAgY29uc3QgY3VzdG9tRXZlbnQgPSBldmVudDI7XG4gICAgY29uc3Qgc291cmNlSWQgPSBjdXN0b21FdmVudC5kZXRhaWwuc291cmNlSWQ7XG4gICAgZm4oc291cmNlSWQpO1xuICB9KTtcbn1cbnZhciBQUk9EVUNUX0FDVElPTl9DTElDSywgRVhQQU5ERURfVElMRV9JTUFHRV9MT0FELCBFWFBBTkRFRF9USUxFX09QRU4sIEVYUEFOREVEX1RJTEVfQ0xPU0UsIEJFRk9SRV9FWFBBTkRFRF9USUxFX0lNQUdFX1JFU0laRSwgRVhQQU5ERURfVElMRV9JTUFHRV9SRVNJWkUsIEJFRk9SRV9FWFBBTkRFRF9USUxFX0NMT1NFLCBCRUZPUkVfRVhQQU5ERURfVElMRV9PUEVOLCBTSE9QU1BPVF9GTFlPVVRfRVhQQU5ELCBTSE9QU1BPVF9UT0dHTEUsIFNIT1BTUE9UX09QRU4sIFNIT1BTUE9UX0FDVElPTl9DTElDSywgVVNFUl9DTElDSywgRVZFTlRfSU1QUkVTU0lPTiwgRVZFTlRfTE9BRCwgRVZFTlRfTE9BRF9NT1JFLCBFVkVOVF9MSUtFLCBFVkVOVF9ESVNMSUtFLCBFVkVOVF9IT1ZFUiwgRVZFTlRfUFJPRFVDVF9DTElDSywgRVZFTlRfUFJPRFVDVF9QSU5DTElDSywgRVZFTlRfVElMRV9FWFBBTkQsIEVWRU5UX1BST0RVQ1RfVVNFUl9DTElDSywgRVZFTlRfU0hBUkVfQ0xJQ0ssIEVWRU5UX1NIT1BTUE9UX0ZMWU9VVCwgRVZFTlRfVElMRV9NRVRBREFUQV9MT0FERUQsIEVWRU5UX1RJTEVfREFUQV9TRVQsIEVWRU5UX0hUTUxfUkVOREVSRUQsIEVWRU5UX0pTX1JFTkRFUkVELCBFVkVOVF9HTE9CQUxTX0xPQURFRCwgQ1JPU1NfU0VMTEVSU19MT0FERUQsIEVWRU5UX1BST0RVQ1RfUEFHRV9MT0FERUQsIEVWRU5UX1BST0RVQ1RTX1VQREFURUQsIEVWRU5UX0FERF9UT19DQVJUX0ZBSUxFRCwgRVZFTlRfVElMRVNfVVBEQVRFRCwgV0lER0VUX0lOSVRfQ09NUExFVEUsIEVNQUlMX1RJTEVfTE9BRCwgRU1BSUxfVElMRV9DTElDSywgTElLRV9DTElDSywgRElTTElLRV9DTElDSywgRVZFTlRfVElMRV9FWFBBTkRfUkVOREVSRUQsIEVWRU5UX1RJTEVfRVhQQU5EX1BST0RfUkVDU19SRU5ERVJFRCwgRVZFTlRfVElMRV9FWFBBTkRfQ1JPU1NfU0VMTEVSU19SRU5ERVJFRCwgRVZFTlRfVElMRV9CR19JTUdfRVJST1IsIEVWRU5UX1RJTEVfQkdfSU1HX1JFTkRFUl9DT01QTEVURSwgRVZFTlRfU0hBUkVfTUVOVV9PUEVORUQsIEVWRU5UX1NIQVJFX01FTlVfQ0xPU0VELCBhbGxFdmVudHMsIGNhbGxiYWNrRGVmYXVsdHM7XG52YXIgaW5pdF9ldmVudHMgPSBfX2VzbSh7XG4gIFwic3JjL2V2ZW50cy9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfbGlicygpO1xuICAgIFBST0RVQ1RfQUNUSU9OX0NMSUNLID0gXCJwcm9kdWN0QWN0aW9uQ2xpY2tcIjtcbiAgICBFWFBBTkRFRF9USUxFX0lNQUdFX0xPQUQgPSBcImV4cGFuZGVkVGlsZUltYWdlTG9hZFwiO1xuICAgIEVYUEFOREVEX1RJTEVfT1BFTiA9IFwiZXhwYW5kZWRUaWxlT3BlblwiO1xuICAgIEVYUEFOREVEX1RJTEVfQ0xPU0UgPSBcImV4cGFuZGVkVGlsZUNsb3NlXCI7XG4gICAgQkVGT1JFX0VYUEFOREVEX1RJTEVfSU1BR0VfUkVTSVpFID0gXCJiZWZvcmVFeHBhbmRlZFRpbGVJbWFnZVJlc2l6ZVwiO1xuICAgIEVYUEFOREVEX1RJTEVfSU1BR0VfUkVTSVpFID0gXCJleHBhbmRlZFRpbGVJbWFnZVJlc2l6ZVwiO1xuICAgIEJFRk9SRV9FWFBBTkRFRF9USUxFX0NMT1NFID0gXCJiZWZvcmVFeHBhbmRlZFRpbGVDbG9zZVwiO1xuICAgIEJFRk9SRV9FWFBBTkRFRF9USUxFX09QRU4gPSBcImJlZm9yZUV4cGFuZGVkVGlsZU9wZW5cIjtcbiAgICBTSE9QU1BPVF9GTFlPVVRfRVhQQU5EID0gXCJzaG9wc3BvdEZseW91dEV4cGFuZFwiO1xuICAgIFNIT1BTUE9UX1RPR0dMRSA9IFwic2hvcHNwb3RUb2dnbGVcIjtcbiAgICBTSE9QU1BPVF9PUEVOID0gXCJzaG9wc3BvdE9wZW5cIjtcbiAgICBTSE9QU1BPVF9BQ1RJT05fQ0xJQ0sgPSBcInNob3BzcG90QWN0aW9uQ2xpY2tcIjtcbiAgICBVU0VSX0NMSUNLID0gXCJ1c2VyQ2xpY2tcIjtcbiAgICBFVkVOVF9JTVBSRVNTSU9OID0gXCJpbXByZXNzaW9uXCI7XG4gICAgRVZFTlRfTE9BRCA9IFwibG9hZFwiO1xuICAgIEVWRU5UX0xPQURfTU9SRSA9IFwibW9yZUxvYWRcIjtcbiAgICBFVkVOVF9MSUtFID0gXCJsaWtlXCI7XG4gICAgRVZFTlRfRElTTElLRSA9IFwiZGlzbGlrZVwiO1xuICAgIEVWRU5UX0hPVkVSID0gXCJ0aWxlSG92ZXJcIjtcbiAgICBFVkVOVF9QUk9EVUNUX0NMSUNLID0gXCJwcm9kdWN0Q2xpY2tcIjtcbiAgICBFVkVOVF9QUk9EVUNUX1BJTkNMSUNLID0gXCJwaW5DbGlja1wiO1xuICAgIEVWRU5UX1RJTEVfRVhQQU5EID0gXCJ0aWxlRXhwYW5kXCI7XG4gICAgRVZFTlRfUFJPRFVDVF9VU0VSX0NMSUNLID0gXCJ1c2VyQ2xpY2tcIjtcbiAgICBFVkVOVF9TSEFSRV9DTElDSyA9IFwic2hhcmVDbGlja1wiO1xuICAgIEVWRU5UX1NIT1BTUE9UX0ZMWU9VVCA9IFwic2hvcHNwb3RGbHlvdXRcIjtcbiAgICBFVkVOVF9USUxFX01FVEFEQVRBX0xPQURFRCA9IFwidGlsZU1ldGFkYXRhTG9hZGVkXCI7XG4gICAgRVZFTlRfVElMRV9EQVRBX1NFVCA9IFwidGlsZURhdGFTZXRcIjtcbiAgICBFVkVOVF9IVE1MX1JFTkRFUkVEID0gXCJodG1sUmVuZGVyZWRcIjtcbiAgICBFVkVOVF9KU19SRU5ERVJFRCA9IFwianNSZW5kZXJlZFwiO1xuICAgIEVWRU5UX0dMT0JBTFNfTE9BREVEID0gXCJnbG9iYWxzTG9hZGVkXCI7XG4gICAgQ1JPU1NfU0VMTEVSU19MT0FERUQgPSBcImNyb3NzU2VsbGVyc0xvYWRlZFwiO1xuICAgIEVWRU5UX1BST0RVQ1RfUEFHRV9MT0FERUQgPSBcInByb2R1Y3RQYWdlTG9hZGVkXCI7XG4gICAgRVZFTlRfUFJPRFVDVFNfVVBEQVRFRCA9IFwicHJvZHVjdHNVcGRhdGVkXCI7XG4gICAgRVZFTlRfQUREX1RPX0NBUlRfRkFJTEVEID0gXCJhZGRUb0NhcnRGYWlsZWRcIjtcbiAgICBFVkVOVF9USUxFU19VUERBVEVEID0gXCJ0aWxlc1VwZGF0ZWRcIjtcbiAgICBXSURHRVRfSU5JVF9DT01QTEVURSA9IFwid2lkZ2V0SW5pdENvbXBsZXRlXCI7XG4gICAgRU1BSUxfVElMRV9MT0FEID0gXCJlbWFpbFRpbGVMb2FkXCI7XG4gICAgRU1BSUxfVElMRV9DTElDSyA9IFwiZW1haWxUaWxlQ2xpY2tcIjtcbiAgICBMSUtFX0NMSUNLID0gXCJsaWtlQ2xpY2tcIjtcbiAgICBESVNMSUtFX0NMSUNLID0gXCJkaXNsaWtlQ2xpY2tcIjtcbiAgICBFVkVOVF9USUxFX0VYUEFORF9SRU5ERVJFRCA9IFwiZXhwYW5kZWRUaWxlUmVuZGVyZWRcIjtcbiAgICBFVkVOVF9USUxFX0VYUEFORF9QUk9EX1JFQ1NfUkVOREVSRUQgPSBcInRpbGVFeHBhbmRQcm9kdWN0UmVjc1JlbmRlcmVkXCI7XG4gICAgRVZFTlRfVElMRV9FWFBBTkRfQ1JPU1NfU0VMTEVSU19SRU5ERVJFRCA9IFwidGlsZUV4cGFuZENyb3NzU2VsbGVyc1JlbmRlcmVkXCI7XG4gICAgRVZFTlRfVElMRV9CR19JTUdfRVJST1IgPSBcInRpbGVCZ0ltYWdlRXJyb3JcIjtcbiAgICBFVkVOVF9USUxFX0JHX0lNR19SRU5ERVJfQ09NUExFVEUgPSBcInRpbGVCZ0ltZ1JlbmRlckNvbXBsZXRlXCI7XG4gICAgRVZFTlRfU0hBUkVfTUVOVV9PUEVORUQgPSBcInNoYXJlTWVudU9wZW5lZFwiO1xuICAgIEVWRU5UX1NIQVJFX01FTlVfQ0xPU0VEID0gXCJzaGFyZU1lbnVDbG9zZWRcIjtcbiAgICBhbGxFdmVudHMgPSBbXG4gICAgICBQUk9EVUNUX0FDVElPTl9DTElDSyxcbiAgICAgIEVYUEFOREVEX1RJTEVfSU1BR0VfTE9BRCxcbiAgICAgIEVYUEFOREVEX1RJTEVfT1BFTixcbiAgICAgIEVYUEFOREVEX1RJTEVfQ0xPU0UsXG4gICAgICBCRUZPUkVfRVhQQU5ERURfVElMRV9JTUFHRV9SRVNJWkUsXG4gICAgICBFWFBBTkRFRF9USUxFX0lNQUdFX1JFU0laRSxcbiAgICAgIEJFRk9SRV9FWFBBTkRFRF9USUxFX0NMT1NFLFxuICAgICAgQkVGT1JFX0VYUEFOREVEX1RJTEVfT1BFTixcbiAgICAgIFNIT1BTUE9UX0ZMWU9VVF9FWFBBTkQsXG4gICAgICBTSE9QU1BPVF9UT0dHTEUsXG4gICAgICBTSE9QU1BPVF9PUEVOLFxuICAgICAgU0hPUFNQT1RfQUNUSU9OX0NMSUNLLFxuICAgICAgVVNFUl9DTElDSyxcbiAgICAgIEVWRU5UX0lNUFJFU1NJT04sXG4gICAgICBFVkVOVF9MT0FELFxuICAgICAgRVZFTlRfTE9BRF9NT1JFLFxuICAgICAgRVZFTlRfTElLRSxcbiAgICAgIEVWRU5UX0RJU0xJS0UsXG4gICAgICBFVkVOVF9IT1ZFUixcbiAgICAgIEVWRU5UX1BST0RVQ1RfQ0xJQ0ssXG4gICAgICBFVkVOVF9QUk9EVUNUX1BJTkNMSUNLLFxuICAgICAgRVZFTlRfVElMRV9FWFBBTkQsXG4gICAgICBFVkVOVF9QUk9EVUNUX1VTRVJfQ0xJQ0ssXG4gICAgICBFVkVOVF9TSEFSRV9DTElDSyxcbiAgICAgIEVWRU5UX1NIT1BTUE9UX0ZMWU9VVCxcbiAgICAgIEVWRU5UX1RJTEVfTUVUQURBVEFfTE9BREVELFxuICAgICAgRVZFTlRfVElMRV9EQVRBX1NFVCxcbiAgICAgIEVWRU5UX0hUTUxfUkVOREVSRUQsXG4gICAgICBFVkVOVF9KU19SRU5ERVJFRCxcbiAgICAgIEVWRU5UX0dMT0JBTFNfTE9BREVELFxuICAgICAgQ1JPU1NfU0VMTEVSU19MT0FERUQsXG4gICAgICBFVkVOVF9QUk9EVUNUX1BBR0VfTE9BREVELFxuICAgICAgRVZFTlRfUFJPRFVDVFNfVVBEQVRFRCxcbiAgICAgIEVWRU5UX0FERF9UT19DQVJUX0ZBSUxFRCxcbiAgICAgIEVWRU5UX1RJTEVTX1VQREFURUQsXG4gICAgICBXSURHRVRfSU5JVF9DT01QTEVURSxcbiAgICAgIEVNQUlMX1RJTEVfTE9BRCxcbiAgICAgIEVNQUlMX1RJTEVfQ0xJQ0ssXG4gICAgICBMSUtFX0NMSUNLLFxuICAgICAgRElTTElLRV9DTElDSyxcbiAgICAgIEVWRU5UX1RJTEVfRVhQQU5EX1JFTkRFUkVELFxuICAgICAgRVZFTlRfVElMRV9FWFBBTkRfUFJPRF9SRUNTX1JFTkRFUkVELFxuICAgICAgRVZFTlRfVElMRV9FWFBBTkRfQ1JPU1NfU0VMTEVSU19SRU5ERVJFRCxcbiAgICAgIEVWRU5UX1RJTEVfQkdfSU1HX0VSUk9SLFxuICAgICAgRVZFTlRfVElMRV9CR19JTUdfUkVOREVSX0NPTVBMRVRFLFxuICAgICAgRVZFTlRfU0hBUkVfTUVOVV9PUEVORUQsXG4gICAgICBFVkVOVF9TSEFSRV9NRU5VX0NMT1NFRFxuICAgIF07XG4gICAgY2FsbGJhY2tEZWZhdWx0cyA9IHtcbiAgICAgIG9uUmVzaXplOiBbXSxcbiAgICAgIG9uTG9hZDogW10sXG4gICAgICBvbkV4cGFuZFRpbGU6IFtdLFxuICAgICAgb25UaWxlQ2xvc2U6IFtdLFxuICAgICAgb25UaWxlUmVuZGVyZWQ6IFtdLFxuICAgICAgb25UaWxlc1VwZGF0ZWQ6IFtdLFxuICAgICAgb25Dcm9zc1NlbGxlcnNSZW5kZXJlZDogW10sXG4gICAgICBvbldpZGdldEluaXRDb21wbGV0ZTogW10sXG4gICAgICBvblRpbGVCZ0ltZ1JlbmRlckNvbXBsZXRlOiBbXSxcbiAgICAgIG9uVGlsZUJnSW1hZ2VFcnJvcjogW10sXG4gICAgICBvblByb2R1Y3RBY3Rpb25DbGljazogW10sXG4gICAgICBvbkV4cGFuZGVkVGlsZUltYWdlTG9hZDogW10sXG4gICAgICBvbkV4cGFuZGVkVGlsZU9wZW46IFtdLFxuICAgICAgb25FeHBhbmRlZFRpbGVDbG9zZTogW10sXG4gICAgICBvbkJlZm9yZUV4cGFuZGVkVGlsZUltYWdlUmVzaXplOiBbXSxcbiAgICAgIG9uQmVmb3JlRXhwYW5kZWRUaWxlQ2xvc2U6IFtdLFxuICAgICAgb25CZWZvcmVFeHBhbmRlZFRpbGVPcGVuOiBbXSxcbiAgICAgIG9uU2hvcHNwb3RGbHlvdXRFeHBhbmQ6IFtdLFxuICAgICAgb25TaG9wc3BvdFRvZ2dsZTogW10sXG4gICAgICBvblNob3BzcG90T3BlbjogW10sXG4gICAgICBvblNob3BzcG90QWN0aW9uQ2xpY2s6IFtdLFxuICAgICAgb25Vc2VyQ2xpY2s6IFtdLFxuICAgICAgb25TaGFyZUNsaWNrOiBbXSxcbiAgICAgIG9uSW1wcmVzc2lvbjogW10sXG4gICAgICBvbkxvYWRNb3JlOiBbXSxcbiAgICAgIG9uTGlrZTogW10sXG4gICAgICBvbkRpc2xpa2U6IFtdLFxuICAgICAgb25Ib3ZlcjogW10sXG4gICAgICBvblByb2R1Y3RDbGljazogW10sXG4gICAgICBvblByb2R1Y3RQaW5DbGljazogW10sXG4gICAgICBvblByb2R1Y3RVc2VyQ2xpY2s6IFtdLFxuICAgICAgb25TaG9wc3BvdEZseW91dDogW10sXG4gICAgICBvblRpbGVNZXRhZGF0YUxvYWRlZDogW10sXG4gICAgICBvblRpbGVEYXRhU2V0OiBbXSxcbiAgICAgIG9uSHRtbFJlbmRlcmVkOiBbXSxcbiAgICAgIG9uSnNSZW5kZXJlZDogW10sXG4gICAgICBvbkdsb2JhbHNMb2FkZWQ6IFtdLFxuICAgICAgb25Qcm9kdWN0UGFnZUxvYWRlZDogW10sXG4gICAgICBvblByb2R1Y3RzVXBkYXRlZDogW10sXG4gICAgICBvbkFkZFRvQ2FydEZhaWxlZDogW10sXG4gICAgICBvbkVtYWlsVGlsZUxvYWQ6IFtdLFxuICAgICAgb25FbWFpbFRpbGVDbGljazogW10sXG4gICAgICBvbkxpa2VDbGljazogW10sXG4gICAgICBvbkRpc2xpa2VDbGljazogW10sXG4gICAgICBvblRpbGVFeHBhbmRQcm9kdWN0UmVjc1JlbmRlcmVkOiBbXSxcbiAgICAgIG9uVGlsZUV4cGFuZENyb3NzU2VsbGVyc1JlbmRlcmVkOiBbXSxcbiAgICAgIG9uU2hhcmVNZW51T3BlbmVkOiBbXSxcbiAgICAgIG9uU2hhcmVNZW51Q2xvc2VkOiBbXVxuICAgIH07XG4gIH1cbn0pO1xuXG4vLyBzcmMvaG9va3MvdXNlSW5maW5pdGVTY3JvbGxlci50c1xuZnVuY3Rpb24gZXhjZWVkc0JvdW5kYXJpZXMoc2RrMiwgd2luZG93SW5zdGFuY2UpIHtcbiAgY29uc3QgdGlsZXMgPSBzZGsyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudWdjLXRpbGVcIik7XG4gIGlmICghdGlsZXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmluZCB0aWxlcyBmb3IgYm91bmRhcnkgY2hlY2tcIik7XG4gIH1cbiAgY29uc3QgbGFzdFRpbGUgPSB0aWxlcy5pdGVtKHRpbGVzLmxlbmd0aCAtIDEpO1xuICBpZiAoIWxhc3RUaWxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZpbmQgbGFzdCB0aWxlXCIpO1xuICB9XG4gIGNvbnN0IGxhc3RUaWxlUG9zaXRpb24gPSBsYXN0VGlsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBsYXN0VGlsZS5vZmZzZXRIZWlnaHQ7XG4gIHJldHVybiBsYXN0VGlsZVBvc2l0aW9uIDw9IHdpbmRvd0luc3RhbmNlLmlubmVySGVpZ2h0ICsgMTAwO1xufVxuZnVuY3Rpb24gdXNlSW5maW5pdGVTY3JvbGxlcihzZGsyLCB3aW5kb3dJbnN0YW5jZSA9IHdpbmRvdywgb25Mb2FkTW9yZSA9ICgpID0+IHtcbiAgc2RrMi50cmlnZ2VyRXZlbnQoRVZFTlRfTE9BRF9NT1JFKTtcbn0pIHtcbiAgZnVuY3Rpb24gb25TY3JvbGwyKCkge1xuICAgIGlmICh3aW5kb3dJbnN0YW5jZS5zY3JvbGxMb2NrZWQpIHJldHVybjtcbiAgICB3aW5kb3dJbnN0YW5jZS5zY3JvbGxMb2NrZWQgPSB0cnVlO1xuICAgIGlmIChleGNlZWRzQm91bmRhcmllcyhzZGsyLCB3aW5kb3dJbnN0YW5jZSkpIHtcbiAgICAgIG9uTG9hZE1vcmUoKTtcbiAgICB9XG4gICAgd2luZG93SW5zdGFuY2Uuc2Nyb2xsTG9ja2VkID0gZmFsc2U7XG4gIH1cbiAgd2luZG93SW5zdGFuY2UuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbDIpO1xufVxudmFyIHVzZUluZmluaXRlU2Nyb2xsZXJfZGVmYXVsdDtcbnZhciBpbml0X3VzZUluZmluaXRlU2Nyb2xsZXIgPSBfX2VzbSh7XG4gIFwic3JjL2hvb2tzL3VzZUluZmluaXRlU2Nyb2xsZXIudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2V2ZW50cygpO1xuICAgIHVzZUluZmluaXRlU2Nyb2xsZXJfZGVmYXVsdCA9IHVzZUluZmluaXRlU2Nyb2xsZXI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvaG9va3MvaW5kZXgudHNcbnZhciBpbml0X2hvb2tzID0gX19lc20oe1xuICBcInNyYy9ob29rcy9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfdXNlSW5maW5pdGVTY3JvbGxlcigpO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL3dpZGdldHMudHNcbnZhciBpbml0X3dpZGdldHMgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL3dpZGdldHMudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy90eXBlcy50c1xudmFyIGluaXRfdHlwZXMgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL3R5cGVzLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvY29tcG9uZW50cy91Z2MuY29tcG9uZW50LnRzXG52YXIgaW5pdF91Z2NfY29tcG9uZW50ID0gX19lc20oe1xuICBcInNyYy90eXBlcy9jb21wb25lbnRzL3VnYy5jb21wb25lbnQudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9jb21wb25lbnRzL3Byb2R1Y3RzLmNvbXBvbmVudC50c1xudmFyIGluaXRfcHJvZHVjdHNfY29tcG9uZW50ID0gX19lc20oe1xuICBcInNyYy90eXBlcy9jb21wb25lbnRzL3Byb2R1Y3RzLmNvbXBvbmVudC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2NvbXBvbmVudHMvc2hhcmUtbWVudS5jb21wb25lbnQudHNcbnZhciBpbml0X3NoYXJlX21lbnVfY29tcG9uZW50ID0gX19lc20oe1xuICBcInNyYy90eXBlcy9jb21wb25lbnRzL3NoYXJlLW1lbnUuY29tcG9uZW50LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvY29tcG9uZW50cy9zdGF0aWMuY29tcG9uZW50LnRzXG52YXIgaW5pdF9zdGF0aWNfY29tcG9uZW50ID0gX19lc20oe1xuICBcInNyYy90eXBlcy9jb21wb25lbnRzL3N0YXRpYy5jb21wb25lbnQudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9jb21wb25lbnRzL3RpbGUtY29tcG9uZW50LnRzXG52YXIgaW5pdF90aWxlX2NvbXBvbmVudCA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvY29tcG9uZW50cy90aWxlLWNvbXBvbmVudC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2NvbXBvbmVudHMvaW5kZXgudHNcbnZhciBpbml0X2NvbXBvbmVudHMyID0gX19lc20oe1xuICBcInNyYy90eXBlcy9jb21wb25lbnRzL2luZGV4LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgaW5pdF91Z2NfY29tcG9uZW50KCk7XG4gICAgaW5pdF9wcm9kdWN0c19jb21wb25lbnQoKTtcbiAgICBpbml0X3NoYXJlX21lbnVfY29tcG9uZW50KCk7XG4gICAgaW5pdF9zdGF0aWNfY29tcG9uZW50KCk7XG4gICAgaW5pdF90aWxlX2NvbXBvbmVudCgpO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2NvcmUvcGxhY2VtZW50LnRzXG52YXIgaW5pdF9wbGFjZW1lbnQgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2NvcmUvcGxhY2VtZW50LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvY29yZS9zZGsudHNcbnZhciBpbml0X3NkayA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvY29yZS9zZGsudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9jb3JlL3RpbGUudHNcbnZhciBpbml0X3RpbGUgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL2NvcmUvdGlsZS50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL2NvcmUvd2lkZ2V0LXJlcXVlc3QudHNcbnZhciBpbml0X3dpZGdldF9yZXF1ZXN0ID0gX19lc20oe1xuICBcInNyYy90eXBlcy9jb3JlL3dpZGdldC1yZXF1ZXN0LnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvY29yZS9pbmRleC50c1xudmFyIGluaXRfY29yZSA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvY29yZS9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfcGxhY2VtZW50KCk7XG4gICAgaW5pdF9zZGsoKTtcbiAgICBpbml0X3RpbGUoKTtcbiAgICBpbml0X3dpZGdldF9yZXF1ZXN0KCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvc2VydmljZXMvYmFzZS5zZXJ2aWNlLnRzXG52YXIgaW5pdF9iYXNlX3NlcnZpY2UgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL3NlcnZpY2VzL2Jhc2Uuc2VydmljZS50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL3NlcnZpY2VzL2V2ZW50LnNlcnZpY2UudHNcbnZhciBpbml0X2V2ZW50X3NlcnZpY2UgPSBfX2VzbSh7XG4gIFwic3JjL3R5cGVzL3NlcnZpY2VzL2V2ZW50LnNlcnZpY2UudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9zZXJ2aWNlcy90aWxlcy5zZXJ2aWNlLnRzXG52YXIgaW5pdF90aWxlc19zZXJ2aWNlID0gX19lc20oe1xuICBcInNyYy90eXBlcy9zZXJ2aWNlcy90aWxlcy5zZXJ2aWNlLnRzXCIoKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gIH1cbn0pO1xuXG4vLyBzcmMvdHlwZXMvc2VydmljZXMvd2lkZ2V0LnNlcnZpY2UudHNcbnZhciBpbml0X3dpZGdldF9zZXJ2aWNlID0gX19lc20oe1xuICBcInNyYy90eXBlcy9zZXJ2aWNlcy93aWRnZXQuc2VydmljZS50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL3NlcnZpY2VzL2V2ZW50cy90aWxlLWV2ZW50LnRzXG52YXIgaW5pdF90aWxlX2V2ZW50ID0gX19lc20oe1xuICBcInNyYy90eXBlcy9zZXJ2aWNlcy9ldmVudHMvdGlsZS1ldmVudC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL3NlcnZpY2VzL2V2ZW50cy93aWRnZXQtZXZlbnQudHNcbnZhciBpbml0X3dpZGdldF9ldmVudCA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvc2VydmljZXMvZXZlbnRzL3dpZGdldC1ldmVudC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL3NlcnZpY2VzL2luZGV4LnRzXG52YXIgaW5pdF9zZXJ2aWNlcyA9IF9fZXNtKHtcbiAgXCJzcmMvdHlwZXMvc2VydmljZXMvaW5kZXgudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpbml0X2Jhc2Vfc2VydmljZSgpO1xuICAgIGluaXRfZXZlbnRfc2VydmljZSgpO1xuICAgIGluaXRfdGlsZXNfc2VydmljZSgpO1xuICAgIGluaXRfd2lkZ2V0X3NlcnZpY2UoKTtcbiAgICBpbml0X3RpbGVfZXZlbnQoKTtcbiAgICBpbml0X3dpZGdldF9ldmVudCgpO1xuICB9XG59KTtcblxuLy8gc3JjL3R5cGVzL1Nka1N3aXBlci50c1xudmFyIGluaXRfU2RrU3dpcGVyID0gX19lc20oe1xuICBcInNyYy90eXBlcy9TZGtTd2lwZXIudHNcIigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgfVxufSk7XG5cbi8vIHNyYy90eXBlcy9pbmRleC50c1xudmFyIGluaXRfdHlwZXMyID0gX19lc20oe1xuICBcInNyYy90eXBlcy9pbmRleC50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfd2lkZ2V0cygpO1xuICAgIGluaXRfdHlwZXMoKTtcbiAgICBpbml0X2NvbXBvbmVudHMyKCk7XG4gICAgaW5pdF9jb3JlKCk7XG4gICAgaW5pdF9zZXJ2aWNlcygpO1xuICAgIGluaXRfU2RrU3dpcGVyKCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvd2lkZ2V0LWxvYWRlci50c1xuZnVuY3Rpb24gbG9hZE1hc29ucnlDYWxsYmFja3Moc2V0dGluZ3MpIHtcbiAgc2V0dGluZ3MuY2FsbGJhY2tzLm9uVGlsZXNVcGRhdGVkLnB1c2goKCkgPT4ge1xuICAgIHJlbmRlck1hc29ucnlMYXlvdXQoKTtcbiAgfSk7XG4gIHNldHRpbmdzLmNhbGxiYWNrcy5vblRpbGVCZ0ltZ1JlbmRlckNvbXBsZXRlLnB1c2goKCkgPT4ge1xuICAgIGhhbmRsZUFsbFRpbGVJbWFnZVJlbmRlcmVkKCk7XG4gICAgc2V0VGltZW91dChoYW5kbGVBbGxUaWxlSW1hZ2VSZW5kZXJlZCwgMWUzKTtcbiAgfSk7XG4gIHNldHRpbmdzLmNhbGxiYWNrcy5vblRpbGVCZ0ltYWdlRXJyb3IucHVzaCgoZXZlbnQyKSA9PiB7XG4gICAgY29uc3QgY3VzdG9tRXZlbnQgPSBldmVudDI7XG4gICAgY29uc3QgdGlsZVdpdGhFcnJvciA9IGN1c3RvbUV2ZW50LmRldGFpbC5kYXRhLnRhcmdldDtcbiAgICBoYW5kbGVUaWxlSW1hZ2VFcnJvcih0aWxlV2l0aEVycm9yKTtcbiAgfSk7XG4gIGNvbnN0IGdyaWQgPSBzZGsucXVlcnlTZWxlY3RvcihcIi5ncmlkXCIpO1xuICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgcmVuZGVyTWFzb25yeUxheW91dChmYWxzZSwgdHJ1ZSk7XG4gIH0pO1xuICBvYnNlcnZlci5vYnNlcnZlKGdyaWQpO1xuICByZXR1cm4gc2V0dGluZ3M7XG59XG5mdW5jdGlvbiBtZXJnZVNldHRpbmdzV2l0aERlZmF1bHRzKHNldHRpbmdzKSB7XG4gIHJldHVybiB7XG4gICAgZmVhdHVyZXM6IHtcbiAgICAgIHNob3dUaXRsZTogdHJ1ZSxcbiAgICAgIHByZWxvYWRJbWFnZXM6IHRydWUsXG4gICAgICBkaXNhYmxlV2lkZ2V0SWZOb3RFbmFibGVkOiB0cnVlLFxuICAgICAgYWRkTmV3VGlsZXNBdXRvbWF0aWNhbGx5OiB0cnVlLFxuICAgICAgaGFuZGxlTG9hZE1vcmU6IHRydWUsXG4gICAgICBsaW1pdFRpbGVzUGVyUGFnZTogdHJ1ZSxcbiAgICAgIGhpZGVCcm9rZW5JbWFnZXM6IHRydWUsXG4gICAgICBsb2FkRXhwYW5kZWRUaWxlU2xpZGVyOiB0cnVlLFxuICAgICAgbG9hZFRpbGVDb250ZW50OiB0cnVlLFxuICAgICAgbG9hZFRpbWVwaHJhc2U6IHRydWUsXG4gICAgICBleHBhbmRlZFRpbGVTZXR0aW5nczoge1xuICAgICAgICB1c2VEZWZhdWx0RXhwYW5kZWRUaWxlU3R5bGVzOiB0cnVlLFxuICAgICAgICB1c2VEZWZhdWx0UHJvZHVjdFN0eWxlczogdHJ1ZSxcbiAgICAgICAgdXNlRGVmYXVsdEFkZFRvQ2FydFN0eWxlczogdHJ1ZSxcbiAgICAgICAgdXNlRGVmYXVsdEV4cGFuZGVkVGlsZVRlbXBsYXRlczogdHJ1ZSxcbiAgICAgICAgdXNlRGVmYXVsdFN3aXBlclN0eWxlczogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdEZvbnQ6IHNldHRpbmdzPy5mb250ID8/IFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JbnRlcjp3Z2h0QDQwMDs1MDA7NzAwJmRpc3BsYXk9c3dhcFwiXG4gICAgICB9LFxuICAgICAgLi4uc2V0dGluZ3M/LmZlYXR1cmVzXG4gICAgfSxcbiAgICBjYWxsYmFja3M6IHtcbiAgICAgIC4uLmNhbGxiYWNrRGVmYXVsdHMsXG4gICAgICAuLi5zZXR0aW5ncz8uY2FsbGJhY2tzXG4gICAgfSxcbiAgICBleHRlbnNpb25zOiB7XG4gICAgICBzd2lwZXI6IGZhbHNlLFxuICAgICAgbWFzb25yeTogZmFsc2UsXG4gICAgICAuLi5zZXR0aW5ncz8uZXh0ZW5zaW9uc1xuICAgIH0sXG4gICAgdGVtcGxhdGVzOiBzZXR0aW5ncz8udGVtcGxhdGVzID8/IHt9XG4gIH07XG59XG5hc3luYyBmdW5jdGlvbiBsb2FkRmVhdHVyZXMoc2V0dGluZ3MpIHtcbiAgY29uc3Qge1xuICAgIHNob3dUaXRsZSxcbiAgICBwcmVsb2FkSW1hZ2VzLFxuICAgIGRpc2FibGVXaWRnZXRJZk5vdEVuYWJsZWQsXG4gICAgYWRkTmV3VGlsZXNBdXRvbWF0aWNhbGx5LFxuICAgIGhhbmRsZUxvYWRNb3JlLFxuICAgIGxpbWl0VGlsZXNQZXJQYWdlLFxuICAgIGhpZGVCcm9rZW5JbWFnZXMsXG4gICAgbG9hZFRpbGVDb250ZW50LFxuICAgIGxvYWRUaW1lcGhyYXNlXG4gIH0gPSBzZXR0aW5ncy5mZWF0dXJlcztcbiAgc2RrLnRpbGVzLnByZWxvYWRJbWFnZXMgPSBwcmVsb2FkSW1hZ2VzO1xuICBzZGsudGlsZXMuaGlkZUJyb2tlblRpbGVzID0gaGlkZUJyb2tlbkltYWdlcztcbiAgaWYgKGxvYWRUaWxlQ29udGVudCkge1xuICAgIHNkay5hZGRMb2FkZWRDb21wb25lbnRzKFtcInRpbGUtY29udGVudFwiLCBcInRpbWVwaHJhc2VcIiwgXCJ0YWdzXCIsIFwic2hhcmUtbWVudVwiXSk7XG4gIH0gZWxzZSBpZiAobG9hZFRpbWVwaHJhc2UpIHtcbiAgICBzZGsuYWRkTG9hZGVkQ29tcG9uZW50cyhbXCJ0aW1lcGhyYXNlXCJdKTtcbiAgfVxuICBpZiAoZGlzYWJsZVdpZGdldElmTm90RW5hYmxlZCkge1xuICAgIGxvYWRXaWRnZXRJc0VuYWJsZWQoKTtcbiAgfVxuICBpZiAoc2hvd1RpdGxlKSB7XG4gICAgbG9hZFRpdGxlKCk7XG4gIH1cbiAgbG9hZEV4cGFuZGVkVGlsZUZlYXR1cmUoKTtcbiAgaWYgKGFkZE5ld1RpbGVzQXV0b21hdGljYWxseSkge1xuICAgIGFkZEF1dG9BZGRUaWxlRmVhdHVyZSgpO1xuICB9XG4gIGlmIChoYW5kbGVMb2FkTW9yZSkge1xuICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gKGluaXRfbG9hZF9tb3JlKCksIGxvYWRfbW9yZV9leHBvcnRzKSk7XG4gICAgYWRkTG9hZE1vcmVCdXR0b25GZWF0dXJlKCk7XG4gIH1cbiAgaWYgKGxpbWl0VGlsZXNQZXJQYWdlKSB7XG4gICAgYWRkVGlsZXNQZXJQYWdlRmVhdHVyZSgpO1xuICB9XG4gIHJldHVybiBzZXR0aW5ncztcbn1cbmZ1bmN0aW9uIGxvYWRFeHRlbnNpb25zKHNldHRpbmdzKSB7XG4gIGNvbnN0IHsgZXh0ZW5zaW9ucyB9ID0gc2V0dGluZ3M7XG4gIGlmIChleHRlbnNpb25zPy5tYXNvbnJ5KSB7XG4gICAgc2V0dGluZ3MgPSBsb2FkTWFzb25yeUNhbGxiYWNrcyhzZXR0aW5ncyk7XG4gICAgcmVuZGVyTWFzb25yeUxheW91dCgpO1xuICB9XG4gIHJldHVybiBzZXR0aW5ncztcbn1cbmZ1bmN0aW9uIGluaXRpYWxpc2VGZWF0dXJlcyhzZXR0aW5ncykge1xuICBpZiAoT2JqZWN0LmtleXMoc2V0dGluZ3MuZmVhdHVyZXMgPz8ge30pLmxlbmd0aCA9PT0gMCkge1xuICAgIHNldHRpbmdzLmZlYXR1cmVzID0ge1xuICAgICAgc2hvd1RpdGxlOiB0cnVlLFxuICAgICAgcHJlbG9hZEltYWdlczogdHJ1ZSxcbiAgICAgIGRpc2FibGVXaWRnZXRJZk5vdEVuYWJsZWQ6IHRydWUsXG4gICAgICBhZGROZXdUaWxlc0F1dG9tYXRpY2FsbHk6IHRydWUsXG4gICAgICBoYW5kbGVMb2FkTW9yZTogdHJ1ZSxcbiAgICAgIGxpbWl0VGlsZXNQZXJQYWdlOiB0cnVlXG4gICAgfTtcbiAgfVxuICByZXR1cm4gc2V0dGluZ3M7XG59XG5mdW5jdGlvbiBsb2FkVGVtcGxhdGVzKHNldHRpbmdzKSB7XG4gIGNvbnN0IHsgZXhwYW5kZWRUaWxlU2V0dGluZ3MgfSA9IHNldHRpbmdzLmZlYXR1cmVzO1xuICBjb25zdCB7XG4gICAgdXNlRGVmYXVsdEV4cGFuZGVkVGlsZVN0eWxlcyxcbiAgICB1c2VEZWZhdWx0UHJvZHVjdFN0eWxlcyxcbiAgICB1c2VEZWZhdWx0QWRkVG9DYXJ0U3R5bGVzLFxuICAgIHVzZURlZmF1bHRFeHBhbmRlZFRpbGVUZW1wbGF0ZXMsXG4gICAgZGVmYXVsdEZvbnQsXG4gICAgdXNlRGVmYXVsdFN3aXBlclN0eWxlc1xuICB9ID0gZXhwYW5kZWRUaWxlU2V0dGluZ3M7XG4gIGlmIChzZXR0aW5ncy5mZWF0dXJlcy5sb2FkRXhwYW5kZWRUaWxlU2xpZGVyKSB7XG4gICAgbG9hZEV4cGFuZGVkVGlsZVRlbXBsYXRlcyh7XG4gICAgICB1c2VEZWZhdWx0RXhwYW5kZWRUaWxlU3R5bGVzLFxuICAgICAgdXNlRGVmYXVsdFByb2R1Y3RTdHlsZXMsXG4gICAgICB1c2VEZWZhdWx0QWRkVG9DYXJ0U3R5bGVzLFxuICAgICAgdXNlRGVmYXVsdEV4cGFuZGVkVGlsZVRlbXBsYXRlcyxcbiAgICAgIGRlZmF1bHRGb250LFxuICAgICAgdXNlRGVmYXVsdFN3aXBlclN0eWxlc1xuICAgIH0pO1xuICB9XG4gIGlmIChzZXR0aW5ncy50ZW1wbGF0ZXMgJiYgT2JqZWN0LmtleXMoc2V0dGluZ3MudGVtcGxhdGVzKS5sZW5ndGgpIHtcbiAgICBPYmplY3QuZW50cmllcyhzZXR0aW5ncy50ZW1wbGF0ZXMpLmZvckVhY2goKFtrZXksIGN1c3RvbVRlbXBsYXRlXSkgPT4ge1xuICAgICAgaWYgKCFjdXN0b21UZW1wbGF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB7IHRlbXBsYXRlIH0gPSBjdXN0b21UZW1wbGF0ZTtcbiAgICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgICBzZGsuYWRkVGVtcGxhdGVUb0NvbXBvbmVudCh0ZW1wbGF0ZSwga2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuZnVuY3Rpb24gbG9hZFdpZGdldChzZXR0aW5ncykge1xuICBjb25zdCBzZXR0aW5nc1dpdGhEZWZhdWx0cyA9IG1lcmdlU2V0dGluZ3NXaXRoRGVmYXVsdHMoc2V0dGluZ3MpO1xuICBhZGRDU1NWYXJpYWJsZXNUb1BsYWNlbWVudChnZXRDU1NWYXJpYWJsZXMoc2V0dGluZ3M/LmZlYXR1cmVzKSk7XG4gIGxvYWRUZW1wbGF0ZXMoc2V0dGluZ3NXaXRoRGVmYXVsdHMpO1xuICBsb2FkRmVhdHVyZXMoc2V0dGluZ3NXaXRoRGVmYXVsdHMpO1xuICBsb2FkRXh0ZW5zaW9ucyhzZXR0aW5nc1dpdGhEZWZhdWx0cyk7XG4gIGxvYWRMaXN0ZW5lcnMoc2V0dGluZ3NXaXRoRGVmYXVsdHMpO1xufVxudmFyIGluaXRfd2lkZ2V0X2xvYWRlciA9IF9fZXNtKHtcbiAgXCJzcmMvd2lkZ2V0LWxvYWRlci50c1wiKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGluaXRfbGlicygpO1xuICAgIGluaXRfY3NzX3ZhcmlhYmxlcygpO1xuICAgIGluaXRfbWFzb25yeV9leHRlbnNpb24oKTtcbiAgICBpbml0X2V4cGFuZGVkX3RpbGVfc3dpcGVyKCk7XG4gICAgaW5pdF9ldmVudHMoKTtcbiAgfVxufSk7XG5cbi8vIHNyYy9pbmRleC50c1xudmFyIGluaXRfc3JjID0gX19lc20oe1xuICBcInNyYy9pbmRleC50c1wiKCkge1xuICAgIGluaXRfaG9va3MoKTtcbiAgICBpbml0X3R5cGVzMigpO1xuICAgIGluaXRfZXZlbnRzKCk7XG4gICAgaW5pdF9saWJzKCk7XG4gICAgaW5pdF93aWRnZXRfbG9hZGVyKCk7XG4gIH1cbn0pO1xuaW5pdF9zcmMoKTtcbmV4cG9ydCB7XG4gIEJFRk9SRV9FWFBBTkRFRF9USUxFX0NMT1NFLFxuICBCRUZPUkVfRVhQQU5ERURfVElMRV9JTUFHRV9SRVNJWkUsXG4gIEJFRk9SRV9FWFBBTkRFRF9USUxFX09QRU4sXG4gIENST1NTX1NFTExFUlNfTE9BREVELFxuICBESVNMSUtFX0NMSUNLLFxuICBFTUFJTF9USUxFX0NMSUNLLFxuICBFTUFJTF9USUxFX0xPQUQsXG4gIEVWRU5UX0FERF9UT19DQVJUX0ZBSUxFRCxcbiAgRVZFTlRfRElTTElLRSxcbiAgRVZFTlRfR0xPQkFMU19MT0FERUQsXG4gIEVWRU5UX0hPVkVSLFxuICBFVkVOVF9IVE1MX1JFTkRFUkVELFxuICBFVkVOVF9JTVBSRVNTSU9OLFxuICBFVkVOVF9KU19SRU5ERVJFRCxcbiAgRVZFTlRfTElLRSxcbiAgRVZFTlRfTE9BRCxcbiAgRVZFTlRfTE9BRF9NT1JFLFxuICBFVkVOVF9QUk9EVUNUU19VUERBVEVELFxuICBFVkVOVF9QUk9EVUNUX0NMSUNLLFxuICBFVkVOVF9QUk9EVUNUX1BBR0VfTE9BREVELFxuICBFVkVOVF9QUk9EVUNUX1BJTkNMSUNLLFxuICBFVkVOVF9QUk9EVUNUX1VTRVJfQ0xJQ0ssXG4gIEVWRU5UX1NIQVJFX0NMSUNLLFxuICBFVkVOVF9TSEFSRV9NRU5VX0NMT1NFRCxcbiAgRVZFTlRfU0hBUkVfTUVOVV9PUEVORUQsXG4gIEVWRU5UX1NIT1BTUE9UX0ZMWU9VVCxcbiAgRVZFTlRfVElMRVNfVVBEQVRFRCxcbiAgRVZFTlRfVElMRV9CR19JTUdfRVJST1IsXG4gIEVWRU5UX1RJTEVfQkdfSU1HX1JFTkRFUl9DT01QTEVURSxcbiAgRVZFTlRfVElMRV9EQVRBX1NFVCxcbiAgRVZFTlRfVElMRV9FWFBBTkQsXG4gIEVWRU5UX1RJTEVfRVhQQU5EX0NST1NTX1NFTExFUlNfUkVOREVSRUQsXG4gIEVWRU5UX1RJTEVfRVhQQU5EX1BST0RfUkVDU19SRU5ERVJFRCxcbiAgRVZFTlRfVElMRV9FWFBBTkRfUkVOREVSRUQsXG4gIEVWRU5UX1RJTEVfTUVUQURBVEFfTE9BREVELFxuICBFWFBBTkRFRF9USUxFX0NMT1NFLFxuICBFWFBBTkRFRF9USUxFX0lNQUdFX0xPQUQsXG4gIEVYUEFOREVEX1RJTEVfSU1BR0VfUkVTSVpFLFxuICBFWFBBTkRFRF9USUxFX09QRU4sXG4gIExJS0VfQ0xJQ0ssXG4gIFBST0RVQ1RfQUNUSU9OX0NMSUNLLFxuICBTSE9QU1BPVF9BQ1RJT05fQ0xJQ0ssXG4gIFNIT1BTUE9UX0ZMWU9VVF9FWFBBTkQsXG4gIFNIT1BTUE9UX09QRU4sXG4gIFNIT1BTUE9UX1RPR0dMRSxcbiAgVVNFUl9DTElDSyxcbiAgV0lER0VUX0lOSVRfQ09NUExFVEUsXG4gIGFkZEF1dG9BZGRUaWxlRmVhdHVyZSxcbiAgYWRkQ1NTVmFyaWFibGVzVG9QbGFjZW1lbnQsXG4gIGFkZExvYWRNb3JlQnV0dG9uRmVhdHVyZSxcbiAgYWRkVGlsZXNQZXJQYWdlRmVhdHVyZSxcbiAgYWxsRXZlbnRzLFxuICBhcnJvd0NsaWNrTGlzdGVuZXIsXG4gIGF0dGFjaExvYWRNb3JlQnV0dG9uTGlzdGVuZXIsXG4gIGNhbGxiYWNrRGVmYXVsdHMsXG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGNyZWF0ZUZyYWdtZW50LFxuICBkZXN0cm95U3dpcGVyLFxuICBkaXNhYmxlTG9hZE1vcmVCdXR0b25JZkV4aXN0cyxcbiAgZGlzYWJsZUxvYWRNb3JlTG9hZGVySWZFeGlzdHMsXG4gIGRpc2FibGVTd2lwZXIsXG4gIGVuYWJsZVN3aXBlcixcbiAgZW5hYmxlVGlsZUltYWdlcyxcbiAgZ2V0QWN0aXZlU2xpZGUsXG4gIGdldEFjdGl2ZVNsaWRlRWxlbWVudCxcbiAgZ2V0Q2xpY2tlZEluZGV4LFxuICBnZXRJbnN0YW5jZSxcbiAgZ2V0TmV4dE5hdmlnYXRlZFRpbGUsXG4gIGdldE5leHRUaWxlLFxuICBnZXRQcmV2aW91c1RpbGUsXG4gIGdldFN3aXBlckluZGV4Zm9yVGlsZSxcbiAgZ2V0VGlsZVNpemUsXG4gIGdldFRpbGVTaXplQnlXaWRnZXQsXG4gIGdldFRpbWVwaHJhc2UsXG4gIGhhbmRsZUFsbFRpbGVJbWFnZVJlbmRlcmVkLFxuICBoYW5kbGVUaWxlQ2xpY2ssXG4gIGhhbmRsZVRpbGVJbWFnZUVycm9yLFxuICBoYW5kbGVUaWxlSW1hZ2VSZW5kZXJlZCxcbiAgaGFzTWluaW11bVRpbGVzUmVxdWlyZWQsXG4gIGhpZGVBbGxUaWxlc0FmdGVyTlRpbGVzLFxuICBpbml0aWFsaXNlRmVhdHVyZXMsXG4gIGluaXRpYWxpemVTd2lwZXIsXG4gIGlzRW5hYmxlZCxcbiAgaXNTd2lwZXJMb2FkaW5nLFxuICBsb2FkQWxsVW5sb2FkZWRUaWxlcyxcbiAgbG9hZEV4cGFuZFNldHRpbmdDb21wb25lbnRzLFxuICBsb2FkRXhwYW5kZWRUaWxlRmVhdHVyZSxcbiAgbG9hZEV4cGFuZGVkVGlsZVRlbXBsYXRlcyxcbiAgbG9hZExpc3RlbmVycyxcbiAgbG9hZFN3aXBlclN0eWxlcyxcbiAgbG9hZFRlbXBsYXRlcyxcbiAgbG9hZFRpdGxlLFxuICBsb2FkV2lkZ2V0LFxuICBsb2FkV2lkZ2V0SXNFbmFibGVkLFxuICByZWZyZXNoU3dpcGVyLFxuICByZWdpc3RlckNyb3NzU2VsbGVyc0xvYWRMaXN0ZW5lcixcbiAgcmVnaXN0ZXJEZWZhdWx0Q2xpY2tFdmVudHMsXG4gIHJlZ2lzdGVyR2VuZXJpY0V2ZW50TGlzdGVuZXIsXG4gIHJlZ2lzdGVyU2hhcmVNZW51Q2xvc2VkTGlzdGVuZXIsXG4gIHJlZ2lzdGVyU2hhcmVNZW51T3BlbmVkTGlzdGVuZXIsXG4gIHJlZ2lzdGVyVGlsZUV4cGFuZExpc3RlbmVyLFxuICByZW5kZXJNYXNvbnJ5TGF5b3V0LFxuICBzZXRTd2lwZXJMb2FkaW5nU3RhdHVzLFxuICB0cmltSGFzaFZhbHVlc0Zyb21PYmplY3QsXG4gIHVwZGF0ZVN3aXBlckluc3RhbmNlLFxuICB1c2VJbmZpbml0ZVNjcm9sbGVyX2RlZmF1bHQgYXMgdXNlSW5maW5pdGVTY3JvbGxlcixcbiAgd2FpdEZvckVsZW1lbnQsXG4gIHdhaXRGb3JFbGVtZW50cyxcbiAgd2FpdEZvckVsbVxufTtcbiIsICJpbXBvcnQgeyBGZWF0dXJlcywgZ2V0VGlsZVNpemVCeVdpZGdldCwgU2RrIH0gZnJvbSBcIkBzdGFja2xhL3dpZGdldC11dGlsc1wiXG5cbmRlY2xhcmUgY29uc3Qgc2RrOiBTZGtcblxuLyoqXG4gKiBnZXRzIHRoZSBjb25maWd1cmVkIHRpbGUgc2l6ZVxuICogQHBhcmFtIHNldHRpbmdzIHRoZSB0aWxlIHNpemUgY29uZmlndXJhdGlvbiBvZiB0aGUgd2lkZ2V0XG4gKiBAcmV0dXJucyB0aGUgdGlsZSBzaXplIHZhbHVlIHdpdGhvdXQgQ1NTIHVuaXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbGVTaXplVW5pdGxlc3Moc2V0dGluZ3M6IEZlYXR1cmVzW1widGlsZVNpemVTZXR0aW5nc1wiXSkge1xuICBjb25zdCB0aWxlU2l6ZUNvbmZpZyA9IGdldFRpbGVTaXplQnlXaWRnZXQoc2V0dGluZ3MpXG4gIHJldHVybiBOdW1iZXIodGlsZVNpemVDb25maWdbXCItLXRpbGUtc2l6ZS11bml0bGVzc1wiXSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyaWRHYXAoY29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXJFbGVtZW50KS5nYXApXG4gIHJldHVybiBpc05hTihwYXJzZWQpID8gMCA6IHBhcnNlZFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9wRWxlbWVudEhlaWdodChjb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCwgZGVmYXVsdFZhbHVlOiBudW1iZXIpIHtcbiAgY29uc3QgZWxlbWVudHMgPSBBcnJheS5mcm9tKGNvbnRhaW5lckVsZW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudWdjLXRpbGVcIikpXG4gIGNvbnN0IHRvcEVsZW1lbnQgPSBlbGVtZW50cy5maW5kKGVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IHRvcCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG4gICAgcmV0dXJuIHRvcCA+IDAgJiYgdG9wIDwgNTBcbiAgfSlcbiAgcmV0dXJuIHRvcEVsZW1lbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCB8fCBkZWZhdWx0VmFsdWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlbmRlck1vZGUoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShcIi0tcmVuZGVyLW1vZGVcIilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNsaWRlckVsZW1lbnQoKSB7XG4gIHJldHVybiBzZGsucXVlcnlTZWxlY3RvcihcIi5zbGlkZXItaW5saW5lXCIpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaWxlQ29udGFpbmVyRWxlbWVudCgpIHtcbiAgcmV0dXJuIHNkay5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlci1pbmxpbmUgLnVnYy10aWxlc1wiKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGlsZUVsZW1lbnRzKCkge1xuICByZXR1cm4gc2RrLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2xpZGVyLWlubGluZSAudWdjLXRpbGVzID4gLnVnYy10aWxlXCIpXG59XG4iLCAiaW1wb3J0IHsgRmVhdHVyZXMsIFNkayB9IGZyb20gXCJAc3RhY2tsYS93aWRnZXQtdXRpbHNcIlxuaW1wb3J0IHsgZ2V0VGlsZVNpemVVbml0bGVzcyB9IGZyb20gXCIuL3V0aWxzXCJcblxuZGVjbGFyZSBjb25zdCBzZGs6IFNka1xuXG5jb25zdCBDT0xVTU5fSU5ERU5UX0NMQVNTID0gXCJncmlkLWNvbHVtbi1pbmRlbnRcIlxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHRvdGFsIGNvbHVtbiBjb3VudHMgdGhhdCBjYW4gYmUgcmVuZGVyZWQgaW4gdGhlIGdyaWRcbiAqXG4gKiBAcGFyYW0gc2V0dGluZ3MgdGhlIHRpbGUgc2l6ZSBjb25maWd1cmF0aW9uIG9mIHRoZSB3aWRnZXRcbiAqIEByZXR1cm5zIHRoZSBwb3NzaWJsZSBudW1iZXIgb2YgZ3JpZCBjb2x1bW5zIGJhc2VkIG9uIHNjcmVlbiBzaXplXG4gKi9cbmZ1bmN0aW9uIGdldENvbHVtbkNvdW50KHNldHRpbmdzOiBGZWF0dXJlc1tcInRpbGVTaXplU2V0dGluZ3NcIl0pIHtcbiAgY29uc3QgYXZhaWxhYmxlV2lkdGggPSAod2luZG93LnNjcmVlbi5hdmFpbFdpZHRoICogOTUpIC8gMTAwXG4gIGNvbnN0IHRpbGVSZW5kZXJpbmdXaWR0aCA9IGdldFRpbGVTaXplVW5pdGxlc3Moc2V0dGluZ3MpICogMiArIDIwXG4gIHJldHVybiBNYXRoLmZsb29yKGF2YWlsYWJsZVdpZHRoIC8gdGlsZVJlbmRlcmluZ1dpZHRoKVxufVxuXG5mdW5jdGlvbiBtYXJrVGlsZUZyb21Jbml0aWFsUm93T2Zmc2V0cyh0aWxlRWxlbWVudDogRWxlbWVudCwgaW5kZW50ZWRPZmZzZXRzOiBudW1iZXJbXSwgdmVydGljYWxSZW5kZXI6IGJvb2xlYW4pIHtcbiAgY29uc3QgYWN0dWFsTGVmdCA9IE1hdGguZmxvb3IodGlsZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdClcblxuICBpZiAoaW5kZW50ZWRPZmZzZXRzLmluY2x1ZGVzKGFjdHVhbExlZnQpKSB7XG4gICAgdG9nZ2xlSW5kZW50QXR0cmlidXRlKHRpbGVFbGVtZW50LCB0cnVlLCB2ZXJ0aWNhbFJlbmRlcilcbiAgfSBlbHNlIHtcbiAgICB0b2dnbGVJbmRlbnRBdHRyaWJ1dGUodGlsZUVsZW1lbnQsIGZhbHNlLCB2ZXJ0aWNhbFJlbmRlcilcbiAgfVxufVxuXG4vKipcbiAqIEFkZHMvUmVtb3ZlcyBncmlkLWNvbHVtbi1pbmRlbnQgYXR0cmlidXRlIHRvIHRoZSBzdXBwbGllZCB0aWxlIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gdGlsZUVsZW1lbnQgdGhlIHRpbGUgZWxlbWVudCB0byB3aGljaCB0aGUgYXR0cmlidXRlIGdldHMgYWRkZWQvcmVtb3ZlZFxuICogQHBhcmFtIGZsYWcgYSBib29sZWFuIHZhbHVlLiBUcnVlIHZhbHVlIGFkZHMgdGhlIGF0dHJpYnV0ZSBhbmQgZmFsc2UgdmFsdWUgcmVtb3ZlcyBpdFxuICovXG5mdW5jdGlvbiB0b2dnbGVJbmRlbnRBdHRyaWJ1dGUodGlsZUVsZW1lbnQ6IEVsZW1lbnQgfCBudWxsLCBmbGFnOiBib29sZWFuLCB2ZXJ0aWNhbFJlbmRlcjogYm9vbGVhbikge1xuICB0aWxlRWxlbWVudD8udG9nZ2xlQXR0cmlidXRlKENPTFVNTl9JTkRFTlRfQ0xBU1MsIGZsYWcpXG5cbiAgaWYgKHZlcnRpY2FsUmVuZGVyKSB7XG4gICAgdGlsZUVsZW1lbnQ/Lm5leHRFbGVtZW50U2libGluZz8udG9nZ2xlQXR0cmlidXRlKENPTFVNTl9JTkRFTlRfQ0xBU1MsIGZsYWcpXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0SW5kZW50YXRpb25Qcm9wcyhzZXR0aW5nczogRmVhdHVyZXNbXCJ0aWxlU2l6ZVNldHRpbmdzXCJdKSB7XG4gIGNvbnN0IHRhcmdldENvbHVtbkNvdW50ID0gZ2V0Q29sdW1uQ291bnQoc2V0dGluZ3MpXG4gIHJldHVybiB7XG4gICAgdGFyZ2V0Q29sdW1uQ291bnQsXG4gICAgdG90YWxFeHBlY3RlZEluZGVudGVkQ29sdW1uczogTWF0aC5mbG9vcih0YXJnZXRDb2x1bW5Db3VudCAvIDIpLFxuICAgIHRvdGFsVGlsZVdpZHRoOiBnZXRUaWxlU2l6ZVVuaXRsZXNzKHNldHRpbmdzKSAqIDIgKyAyMFxuICB9XG59XG5cbi8qKlxuICogTWFya3MgZXZlcnkgZXZlbiBjb2x1bW5zIGZvciB0b3AgaW5kZW50LiBUaGlzIGlzIHRvIGFjaGlldmUgdGhlIFppZy1aYWcgcmVuZGVyaW5nIHBhdHRlcm4gd2l0aCBDU1MgZ3JpZCByZW5kZXJpbmcuXG4gKiBOb3RlOiBtb3N0IG9mIHRoZXNlIGxvZ2ljIGNhbiBiZSBhdm9pZGVkIHdoZW4gbnRoLWNvbCBnZXRzIHdpZGVyIHN1cHBvcnRcbiAqXG4gKiBAcGFyYW0gc2V0dGluZ3MgdGhlIHRpbGUgc2l6ZSBjb25maWd1cmF0aW9uIG9mIHRoZSB3aWRnZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcmtDb2x1bW5zRm9ySW5kZW50KHNldHRpbmdzOiBGZWF0dXJlc1tcInRpbGVTaXplU2V0dGluZ3NcIl0pIHtcbiAgY29uc3Qgc2xpZGVySW5saW5lID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyLWlubGluZVwiKVxuICBjb25zdCB0aWxlc0NvbnRhaW5lciA9IHNsaWRlcklubGluZS5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIi51Z2MtdGlsZXNcIilcbiAgY29uc3QgdGlsZXMgPSB0aWxlc0NvbnRhaW5lciEucXVlcnlTZWxlY3RvckFsbChcIi51Z2MtdGlsZVwiKVxuICBjb25zdCBsZWZ0T2Zmc2V0ID0gdGlsZXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdFxuICBjb25zdCB7IHRhcmdldENvbHVtbkNvdW50LCB0b3RhbEV4cGVjdGVkSW5kZW50ZWRDb2x1bW5zLCB0b3RhbFRpbGVXaWR0aCB9ID0gZ2V0SW5kZW50YXRpb25Qcm9wcyhzZXR0aW5ncylcbiAgY29uc3QgaW5kZW50ZWRPZmZzZXRzOiBudW1iZXJbXSA9IFtdXG5cbiAgbGV0IHNraXBOZXh0ID0gZmFsc2VcbiAgbGV0IGNvbHVtbkNvdW50ZXIgPSAwXG4gIGxldCBjb2x1bW5Db3VudCA9IHRhcmdldENvbHVtbkNvdW50XG4gIGxldCB2ZXJ0aWNhbFRpbGVDb3VudGVyID0gMFxuXG4gIHRpbGVzLmZvckVhY2godGlsZUVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IGlzUm93U3BhbkN1cnJlbnQgPSBnZXRDb21wdXRlZFN0eWxlKHRpbGVFbGVtZW50KS5ncmlkUm93ID09PSBcInNwYW4gMlwiXG4gICAgY29uc3QgaXNSb3dTcGFuTmV4dCA9IHRpbGVFbGVtZW50Lm5leHRFbGVtZW50U2libGluZ1xuICAgICAgPyBnZXRDb21wdXRlZFN0eWxlKHRpbGVFbGVtZW50Lm5leHRFbGVtZW50U2libGluZykuZ3JpZFJvdyA9PT0gXCJzcGFuIDJcIlxuICAgICAgOiBmYWxzZVxuICAgIGNvbnN0IHZlcnRpY2FsUmVuZGVyID0gaXNSb3dTcGFuQ3VycmVudCAmJiBpc1Jvd1NwYW5OZXh0XG5cbiAgICAvLyB2ZXJpdGNhbGx5IGFsaWduZWQgdGlsZXMgYXJlIHByb2Nlc3NlZCB0b2dldGhlci5cbiAgICAvLyBXaGVuIHRoZSBmaXJzdCB2ZXJ0aWNhbCB0aWxlIGlzIHByb2Nlc3NlZCwgdGhlIGZvbGxvd2luZyB2ZXJ0aWNhbCB0aWxlIGNhbiBiZSBpZ25tb3JlZFxuICAgIGlmIChza2lwTmV4dCkge1xuICAgICAgc2tpcE5leHQgPSBmYWxzZVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGNvbHVtbkNvdW50ZXIgPT09IDApIHtcbiAgICAgIGNvbHVtbkNvdW50ID0gdGFyZ2V0Q29sdW1uQ291bnQgLSB2ZXJ0aWNhbFRpbGVDb3VudGVyXG4gICAgICB2ZXJ0aWNhbFRpbGVDb3VudGVyID0gMFxuICAgIH1cblxuICAgIGNvbHVtbkNvdW50ZXIrK1xuXG4gICAgaWYgKFxuICAgICAgY29sdW1uQ291bnRlciA+IDAgJiZcbiAgICAgIChjb2x1bW5Db3VudGVyICUgMiA9PT0gMCB8fCBpbmRlbnRlZE9mZnNldHMubGVuZ3RoID09PSB0b3RhbEV4cGVjdGVkSW5kZW50ZWRDb2x1bW5zKSAmJlxuICAgICAgY29sdW1uQ291bnRlciA8PSBjb2x1bW5Db3VudFxuICAgICkge1xuICAgICAgLy8gc2tpcCB0aWxlIGlmIGl0IGlzIHZlcnRpY2FsbHkgYWxpZ25lZCBidXQgbm90IHRoZSBuZXh0IHRpbGVcbiAgICAgIGlmIChpc1Jvd1NwYW5DdXJyZW50ICYmICFpc1Jvd1NwYW5OZXh0KSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoIXNraXBOZXh0KSB7XG4gICAgICAgIGNvbnN0IGFjdHVhbExlZnQgPSBNYXRoLmZsb29yKHRpbGVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQpXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkTGVmdCA9IE1hdGguZmxvb3IobGVmdE9mZnNldCArIHRvdGFsVGlsZVdpZHRoICogKGNvbHVtbkNvdW50ZXIgLSAxKSlcblxuICAgICAgICBpZiAoaW5kZW50ZWRPZmZzZXRzLmxlbmd0aCA9PT0gdG90YWxFeHBlY3RlZEluZGVudGVkQ29sdW1ucykge1xuICAgICAgICAgIG1hcmtUaWxlRnJvbUluaXRpYWxSb3dPZmZzZXRzKHRpbGVFbGVtZW50LCBpbmRlbnRlZE9mZnNldHMsIHZlcnRpY2FsUmVuZGVyKVxuICAgICAgICB9IGVsc2UgaWYgKGFjdHVhbExlZnQgPT09IGV4cGVjdGVkTGVmdCkge1xuICAgICAgICAgIHRvZ2dsZUluZGVudEF0dHJpYnV0ZSh0aWxlRWxlbWVudCwgdHJ1ZSwgdmVydGljYWxSZW5kZXIpXG5cbiAgICAgICAgICBpZiAoaW5kZW50ZWRPZmZzZXRzLmxlbmd0aCA8IHRvdGFsRXhwZWN0ZWRJbmRlbnRlZENvbHVtbnMpIHtcbiAgICAgICAgICAgIGluZGVudGVkT2Zmc2V0cy5wdXNoKGFjdHVhbExlZnQpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvZ2dsZUluZGVudEF0dHJpYnV0ZSh0aWxlRWxlbWVudCwgZmFsc2UsIHZlcnRpY2FsUmVuZGVyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZ2dsZUluZGVudEF0dHJpYnV0ZSh0aWxlRWxlbWVudCwgZmFsc2UsIHZlcnRpY2FsUmVuZGVyKVxuICAgIH1cblxuICAgIGlmICh2ZXJ0aWNhbFJlbmRlcikge1xuICAgICAgc2tpcE5leHQgPSB0cnVlXG4gICAgICB2ZXJ0aWNhbFRpbGVDb3VudGVyKytcbiAgICB9XG5cbiAgICAvLyByZXNldCBjb3VudGVyIHdoZW4gYWxsIGNvbHVtbnMgYXJlIHJlbmRlcmVkXG4gICAgaWYgKGNvbHVtbkNvdW50ZXIgPT09IGNvbHVtbkNvdW50KSB7XG4gICAgICBjb2x1bW5Db3VudGVyID0gMFxuICAgIH1cbiAgfSlcbn1cbiIsICJpbXBvcnQgeyBGZWF0dXJlcyB9IGZyb20gXCJAc3RhY2tsYS93aWRnZXQtdXRpbHNcIlxuaW1wb3J0IHtcbiAgZ2V0UmVuZGVyTW9kZSxcbiAgZ2V0U2xpZGVyRWxlbWVudCxcbiAgZ2V0VGlsZUNvbnRhaW5lckVsZW1lbnQsXG4gIGdldFRpbGVTaXplVW5pdGxlc3MsXG4gIGdldFRvcEVsZW1lbnRIZWlnaHQsXG4gIGdyaWRHYXBcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG50eXBlIFN3aXBlckRpcmVjdGlvbiA9IFwibm9uZVwiIHwgXCJsZWZ0XCIgfCBcInJpZ2h0XCIgfCBcInVwXCIgfCBcImRvd25cIlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc2V0dGluZ3M6IEZlYXR1cmVzW1widGlsZVNpemVTZXR0aW5nc1wiXSkge1xuICBjb25zdCBzbGlkZXJFbGVtZW50ID0gZ2V0U2xpZGVyRWxlbWVudCgpXG4gIGNvbnN0IHRpbGVzQ29udGFpbmVyRWxlbWVudCA9IGdldFRpbGVDb250YWluZXJFbGVtZW50KClcbiAgY29uc3Qgc2Nyb2xsSGlzdG9yeTogQXJyYXk8bnVtYmVyPiA9IFtdXG4gIGNvbnN0IHRpbGVTaXplVW5pdGxlc3MgPSBnZXRUaWxlU2l6ZVVuaXRsZXNzKHNldHRpbmdzKVxuICBjb25zdCBkZWZhdWx0QmxvY2tIZWlnaHQgPSBpc05hTih0aWxlU2l6ZVVuaXRsZXNzKSA/IDIyMCA6IHRpbGVTaXplVW5pdGxlc3NcblxuICBjb25zdCBzY3JvbGxlckhhbmRsZXIgPSBzY3JvbGxlcihzbGlkZXJFbGVtZW50KVxuXG4gIGNvbnN0IHN3aXBlRGV0ZWN0SGFuZGxlciA9IHN3aXBlRGV0ZWN0KHRpbGVzQ29udGFpbmVyRWxlbWVudCwgZGlyZWN0aW9uID0+IHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInVwXCIpIHtcbiAgICAgIHNjcm9sbERvd24oKVxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImRvd25cIikge1xuICAgICAgc2Nyb2xsVXAoKVxuICAgIH1cbiAgfSlcblxuICBjb25zdCBzY3JlZW5SZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PlxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aWxlc0NvbnRhaW5lckVsZW1lbnQuc2Nyb2xsVG9wID0gMFxuICAgICAgaWYgKGdldFJlbmRlck1vZGUoc2xpZGVyRWxlbWVudCkgPT09IFwiZGVza3RvcFwiKSB7XG4gICAgICAgIGNvbnRyb2xOYXZpZ2F0aW9uQnV0dG9uVmlzaWJpbGl0eSgpXG4gICAgICAgIHN3aXBlRGV0ZWN0SGFuZGxlci51bnJlZ2lzdGVyKClcbiAgICAgICAgc2Nyb2xsZXJIYW5kbGVyLnJlZ2lzdGVyKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlRGV0ZWN0SGFuZGxlci5yZWdpc3RlcigpXG4gICAgICAgIHNjcm9sbGVySGFuZGxlci51bnJlZ2lzdGVyKClcbiAgICAgIH1cbiAgICB9KVxuICApXG5cbiAgc2NyZWVuUmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aWxlc0NvbnRhaW5lckVsZW1lbnQpXG5cbiAgY29udHJvbE5hdmlnYXRpb25CdXR0b25WaXNpYmlsaXR5KClcblxuICBmdW5jdGlvbiBzY3JvbGxlcihlbDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBzbGlkZXJTY3JvbGxVcEJ1dHRvbiA9IGVsLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiI3Njcm9sbC11cFwiKVxuICAgIGNvbnN0IHNsaWRlclNjcm9sbERvd25CdXR0b24gPSBlbC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIiNzY3JvbGwtZG93blwiKVxuXG4gICAgaWYgKCFzbGlkZXJTY3JvbGxVcEJ1dHRvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2xpZGVyIFRpbGVzIFNjcm9sbCBVcCBCdXR0b24gbm90IGZvdW5kXCIpXG4gICAgfVxuXG4gICAgaWYgKCFzbGlkZXJTY3JvbGxEb3duQnV0dG9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTbGlkZXIgVGlsZXMgU2Nyb2xsIERvd24gQnV0dG9uIG5vdCBmb3VuZFwiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFVwRXZlbnRIYW5kbGVyKGV2ZW50OiBFdmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKClcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBpZiAodGlsZXNDb250YWluZXJFbGVtZW50LnNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgc2Nyb2xsVXAoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbERvd25FdmVudEhhbmRsZXIoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKVxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIHNjcm9sbERvd24oKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xuICAgICAgdG9nZ2xlU2Nyb2xsVXAoXCJ2aXNpYmxlXCIpXG4gICAgICB0b2dnbGVTY3JvbGxEb3duKFwidmlzaWJsZVwiKVxuICAgICAgc2xpZGVyU2Nyb2xsVXBCdXR0b24hLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzY3JvbGxVcEV2ZW50SGFuZGxlcilcbiAgICAgIHNsaWRlclNjcm9sbERvd25CdXR0b24hLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzY3JvbGxEb3duRXZlbnRIYW5kbGVyKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVucmVnaXN0ZXIoKSB7XG4gICAgICB0b2dnbGVTY3JvbGxVcChcImhpZGRlblwiKVxuICAgICAgdG9nZ2xlU2Nyb2xsRG93bihcImhpZGRlblwiKVxuICAgICAgc2xpZGVyU2Nyb2xsVXBCdXR0b24hLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzY3JvbGxVcEV2ZW50SGFuZGxlcilcbiAgICAgIHNsaWRlclNjcm9sbERvd25CdXR0b24hLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzY3JvbGxEb3duRXZlbnRIYW5kbGVyKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZVNjcm9sbFVwKHZpc2liaWxpdHk6IHN0cmluZykge1xuICAgICAgc2xpZGVyU2Nyb2xsVXBCdXR0b24hLnN0eWxlLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlU2Nyb2xsRG93bih2aXNpYmlsaXR5OiBzdHJpbmcpIHtcbiAgICAgIHNsaWRlclNjcm9sbERvd25CdXR0b24hLnN0eWxlLnZpc2liaWxpdHkgPSB2aXNpYmlsaXR5XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZ2lzdGVyLFxuICAgICAgdW5yZWdpc3RlcixcbiAgICAgIHRvZ2dsZVNjcm9sbFVwLFxuICAgICAgdG9nZ2xlU2Nyb2xsRG93blxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN3aXBlRGV0ZWN0KGVsOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IChzd2lwZURpcmVjdGlvbjogU3dpcGVyRGlyZWN0aW9uKSA9PiB2b2lkKSB7XG4gICAgY29uc3QgYWxsb3dlZFRpbWUgPSAxNTAwLFxuICAgICAgdGhyZXNob2xkID0gMTUwLFxuICAgICAgcmVzdHJhaW50ID0gMTAwXG4gICAgbGV0IHN0YXJ0WDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgc3RhcnRUaW1lOiBudW1iZXJcblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyVG91Y2hTdGFydChldmVudDogVG91Y2hFdmVudCkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3QgdG91Y2hPYmplY3QgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXVxuICAgICAgICBzdGFydFggPSB0b3VjaE9iamVjdC5wYWdlWFxuICAgICAgICBzdGFydFkgPSB0b3VjaE9iamVjdC5wYWdlWVxuICAgICAgICBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyVG91Y2hFbmQoZXZlbnQ6IFRvdWNoRXZlbnQpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvdWNoT2JqZWN0ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF1cbiAgICAgICAgY29uc3QgZGlzdFggPSB0b3VjaE9iamVjdC5wYWdlWCAtIHN0YXJ0WFxuICAgICAgICBjb25zdCBkaXN0WSA9IHRvdWNoT2JqZWN0LnBhZ2VZIC0gc3RhcnRZXG4gICAgICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydFRpbWVcblxuICAgICAgICBpZiAoZWxhcHNlZFRpbWUgPD0gYWxsb3dlZFRpbWUpIHtcbiAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdFgpID49IHRocmVzaG9sZCAmJiBNYXRoLmFicyhkaXN0WSkgPD0gcmVzdHJhaW50KSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkaXN0WCA8IDAgPyBcImxlZnRcIiA6IFwicmlnaHRcIilcbiAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGRpc3RZKSA+PSB0aHJlc2hvbGQgJiYgTWF0aC5hYnMoZGlzdFgpIDw9IHJlc3RyYWludCkge1xuICAgICAgICAgICAgY2FsbGJhY2soZGlzdFkgPCAwID8gXCJ1cFwiIDogXCJkb3duXCIpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZ2lzdGVyOiAoKSA9PiB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHJlZ2lzdGVyVG91Y2hTdGFydCwgZmFsc2UpXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpKVxuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgcmVnaXN0ZXJUb3VjaEVuZClcbiAgICAgIH0sXG5cbiAgICAgIHVucmVnaXN0ZXI6ICgpID0+IHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgcmVnaXN0ZXJUb3VjaFN0YXJ0LCBmYWxzZSlcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IGV2ZW50LnByZXZlbnREZWZhdWx0KCkpXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCByZWdpc3RlclRvdWNoRW5kKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbFVwKCkge1xuICAgIHRpbGVzQ29udGFpbmVyRWxlbWVudC5zY3JvbGxUbyh7XG4gICAgICB0b3A6IHNjcm9sbEhpc3RvcnkucG9wKCksXG4gICAgICBsZWZ0OiAwLFxuICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcbiAgICB9KVxuICAgIHNldFRpbWVvdXQoKCkgPT4gY29udHJvbE5hdmlnYXRpb25CdXR0b25WaXNpYmlsaXR5KCksIDUwMClcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbERvd24oKSB7XG4gICAgdGlsZXNDb250YWluZXJFbGVtZW50LnNjcm9sbFRvKHtcbiAgICAgIHRvcDogZ2V0QmxvY2tIZWlnaHQoKSxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIlxuICAgIH0pXG4gICAgc2V0VGltZW91dCgoKSA9PiBjb250cm9sTmF2aWdhdGlvbkJ1dHRvblZpc2liaWxpdHkoKSwgNTAwKVxuICB9XG5cbiAgZnVuY3Rpb24gY29udHJvbE5hdmlnYXRpb25CdXR0b25WaXNpYmlsaXR5KCkge1xuICAgIGlmIChnZXRSZW5kZXJNb2RlKHNsaWRlckVsZW1lbnQpICE9PSBcImRlc2t0b3BcIikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHRpbGVzQ29udGFpbmVyRWxlbWVudC5zY3JvbGxUb3AgPiAwICYmIHNjcm9sbEhpc3RvcnkubGVuZ3RoID4gMCkge1xuICAgICAgc2Nyb2xsZXJIYW5kbGVyLnRvZ2dsZVNjcm9sbFVwKFwidmlzaWJsZVwiKVxuICAgIH0gZWxzZSB7XG4gICAgICBzY3JvbGxlckhhbmRsZXIudG9nZ2xlU2Nyb2xsVXAoXCJoaWRkZW5cIilcbiAgICB9XG5cbiAgICBjb25zdCBvZmZzZXQgPVxuICAgICAgdGlsZXNDb250YWluZXJFbGVtZW50LnNjcm9sbEhlaWdodCAtIHRpbGVzQ29udGFpbmVyRWxlbWVudC5zY3JvbGxUb3AgLSB0aWxlc0NvbnRhaW5lckVsZW1lbnQub2Zmc2V0SGVpZ2h0XG5cbiAgICBpZiAob2Zmc2V0ID09PSAwIHx8ICh0aWxlc0NvbnRhaW5lckVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gMCAmJiBvZmZzZXQgPj0gZGVmYXVsdEJsb2NrSGVpZ2h0IC8gMikpIHtcbiAgICAgIHNjcm9sbGVySGFuZGxlci50b2dnbGVTY3JvbGxEb3duKFwidmlzaWJsZVwiKVxuICAgIH0gZWxzZSB7XG4gICAgICBzY3JvbGxlckhhbmRsZXIudG9nZ2xlU2Nyb2xsRG93bihcImhpZGRlblwiKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGNIZWlnaHRBbmRSZWNvcmRIaXN0b3J5KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoIXNjcm9sbEhpc3RvcnkubGVuZ3RoKSB7XG4gICAgICBzY3JvbGxIaXN0b3J5LnB1c2goMClcbiAgICAgIHJldHVybiB2YWx1ZSArIGdyaWRHYXAodGlsZXNDb250YWluZXJFbGVtZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3RhbEhlaWdodCA9IHRpbGVzQ29udGFpbmVyRWxlbWVudC5zY3JvbGxUb3AgKyB2YWx1ZSArIGdyaWRHYXAodGlsZXNDb250YWluZXJFbGVtZW50KVxuICAgICAgc2Nyb2xsSGlzdG9yeS5wdXNoKHRpbGVzQ29udGFpbmVyRWxlbWVudC5zY3JvbGxUb3ApXG4gICAgICByZXR1cm4gdG90YWxIZWlnaHRcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCbG9ja0hlaWdodCgpIHtcbiAgICBzd2l0Y2ggKGdldFJlbmRlck1vZGUoc2xpZGVyRWxlbWVudCkpIHtcbiAgICAgIGNhc2UgXCJtb2JpbGVcIjoge1xuICAgICAgICByZXR1cm4gY2FsY0hlaWdodEFuZFJlY29yZEhpc3Rvcnkod2luZG93LnNjcmVlbi5oZWlnaHQgPz8gZGVmYXVsdEJsb2NrSGVpZ2h0KVxuICAgICAgfVxuICAgICAgY2FzZSBcInRhYmxldFwiOiB7XG4gICAgICAgIHJldHVybiBjYWxjSGVpZ2h0QW5kUmVjb3JkSGlzdG9yeShnZXRUb3BFbGVtZW50SGVpZ2h0KHRpbGVzQ29udGFpbmVyRWxlbWVudCwgZGVmYXVsdEJsb2NrSGVpZ2h0KSlcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBjYWxjSGVpZ2h0QW5kUmVjb3JkSGlzdG9yeShkZWZhdWx0QmxvY2tIZWlnaHQgKiAyKVxuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7IEZlYXR1cmVzIH0gZnJvbSBcInBhY2thZ2VzL3dpZGdldC11dGlsc1wiXG5pbXBvcnQgeyBnZXRSZW5kZXJNb2RlLCBnZXRTbGlkZXJFbGVtZW50LCBnZXRUaWxlQ29udGFpbmVyRWxlbWVudCwgZ2V0VGlsZUVsZW1lbnRzIH0gZnJvbSBcIi4vdXRpbHNcIlxuaW1wb3J0IHsgbWFya0NvbHVtbnNGb3JJbmRlbnQgfSBmcm9tIFwiLi9zbGlkZXItZGVzaWduXCJcblxudHlwZSBTbGlkZXJPYnNlcnZlclByb3BzID0ge1xuICBzZXR0aW5nczogRmVhdHVyZXNbXCJ0aWxlU2l6ZVNldHRpbmdzXCJdXG4gIHJlc2l6ZUNiPzogKCkgPT4gdm9pZFxuICBpbnRlcnNlY3Rpb25DYj86ICgpID0+IHZvaWRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRPYnNlcnZlcnMoeyBzZXR0aW5ncywgcmVzaXplQ2IsIGludGVyc2VjdGlvbkNiIH06IFNsaWRlck9ic2VydmVyUHJvcHMpIHtcbiAgY29uc3QgYW5pbWF0aW9uQ2xhc3NlcyA9IHsgdXA6IFwidGlsZS1hbmltYXRlLXVwXCIsIGRvd246IFwidGlsZS1hbmltYXRlLWRvd25cIiB9XG4gIGNvbnN0IHBhcnRpYWxseVZpc2libGVDbGFzcyA9IFwicGFydGlhbGx5LXZpc2libGVcIlxuICBjb25zdCB0aWxlc0NvbnRhaW5lckVsZW1lbnQgPSBnZXRUaWxlQ29udGFpbmVyRWxlbWVudCgpXG4gIGNvbnN0IHNsaWRlcklubGluZUVsZW1lbnQgPSBnZXRTbGlkZXJFbGVtZW50KClcbiAgbGV0IHByZXZpb3VzUG9zaXRpb24gPSB0aWxlc0NvbnRhaW5lckVsZW1lbnQuc2Nyb2xsVG9wXG5cbiAgY29uc3QgcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKGdldFJlbmRlck1vZGUoc2xpZGVySW5saW5lRWxlbWVudCkgPT09IFwiZGVza3RvcFwiKSB7XG4gICAgICAgIG1hcmtDb2x1bW5zRm9ySW5kZW50KHNldHRpbmdzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGlsZXNJbnRlcnNlY3Rpb25PYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgIH1cbiAgICAgIHJlc2l6ZUNiPy4oKVxuICAgIH0pXG4gIClcblxuICBjb25zdCB0aWxlc0ludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgIChlbnRyaWVzOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5W10pID0+IHtcbiAgICAgIGZpbHRlclJlY2VudEVudHJpZXMoZW50cmllcykuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgIGlmIChlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHBhcnRpYWxseVZpc2libGVDbGFzcykpIHtcbiAgICAgICAgICAgIGlmIChlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA9PT0gMSkge1xuICAgICAgICAgICAgICBlbmFibGVBbmltYXRpb24oZW50cnkudGFyZ2V0KVxuICAgICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShwYXJ0aWFsbHlWaXNpYmxlQ2xhc3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHBhcnRpYWxseVZpc2libGVDbGFzcykpIHtcbiAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZChwYXJ0aWFsbHlWaXNpYmxlQ2xhc3MpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBpbnRlcnNlY3Rpb25DYj8uKClcbiAgICAgIHByZXZpb3VzUG9zaXRpb24gPSB0aWxlc0NvbnRhaW5lckVsZW1lbnQuc2Nyb2xsVG9wXG4gICAgfSxcbiAgICB7IHJvb3Q6IHRpbGVzQ29udGFpbmVyRWxlbWVudCwgcm9vdE1hcmdpbjogXCIwcHhcIiwgdGhyZXNob2xkOiAxIH1cbiAgKVxuXG4gIGNvbmZpZ09ic2VydmVyVGFyZ2V0cygpXG5cbiAgZnVuY3Rpb24gZmlsdGVyUmVjZW50RW50cmllcyhlbnRyaWVzOiBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5W10pIHtcbiAgICBjb25zdCB1bmlxdWVFbnRyaWVzID0gW11cblxuICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgY29uc3QgZXhpc3RpbmdJbmRleCA9IHVuaXF1ZUVudHJpZXMuZmluZEluZGV4KHVuaXFFbnRyeSA9PiB1bmlxRW50cnkudGFyZ2V0LmlzU2FtZU5vZGUoZW50cnkudGFyZ2V0KSlcbiAgICAgIGlmIChleGlzdGluZ0luZGV4ID49IDApIHtcbiAgICAgICAgdW5pcXVlRW50cmllcy5zcGxpY2UoZXhpc3RpbmdJbmRleCwgMSwgZW50cnkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bmlxdWVFbnRyaWVzLnB1c2goZW50cnkpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuaXF1ZUVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuYWJsZUFuaW1hdGlvbihlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKHByZXZpb3VzUG9zaXRpb24gPT09IHRpbGVzQ29udGFpbmVyRWxlbWVudC5zY3JvbGxUb3ApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGFuaW1hdGlvbkNsYXNzID1cbiAgICAgIHByZXZpb3VzUG9zaXRpb24gPCB0aWxlc0NvbnRhaW5lckVsZW1lbnQuc2Nyb2xsVG9wID8gYW5pbWF0aW9uQ2xhc3Nlcy51cCA6IGFuaW1hdGlvbkNsYXNzZXMuZG93blxuXG4gICAgY29uc3QgcmVtb3ZlQ2xhc3MgPSBhbmltYXRpb25DbGFzcyA9PT0gYW5pbWF0aW9uQ2xhc3Nlcy51cCA/IGFuaW1hdGlvbkNsYXNzZXMuZG93biA6IGFuaW1hdGlvbkNsYXNzZXMudXBcblxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShyZW1vdmVDbGFzcylcblxuICAgIGlmICghZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoYW5pbWF0aW9uQ2xhc3MpKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYW5pbWF0aW9uQ2xhc3MpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY29uZmlnT2JzZXJ2ZXJUYXJnZXRzKCkge1xuICAgIGNvbmZpZ1RpbGVJbnRlcnNlY3Rpb25UYXJnZXRzKClcbiAgICByZXNpemVPYnNlcnZlci5vYnNlcnZlKHRpbGVzQ29udGFpbmVyRWxlbWVudClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbmZpZ1RpbGVJbnRlcnNlY3Rpb25UYXJnZXRzKCkge1xuICAgIGlmIChnZXRSZW5kZXJNb2RlKHNsaWRlcklubGluZUVsZW1lbnQpID09PSBcImRlc2t0b3BcIikge1xuICAgICAgZ2V0VGlsZUVsZW1lbnRzKCkuZm9yRWFjaCh0aWxlID0+IHRpbGVzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZSh0aWxlKSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgIHRpbGVzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gIH1cblxuICByZXR1cm4geyBjb25maWdPYnNlcnZlclRhcmdldHMsIGNvbmZpZ1RpbGVJbnRlcnNlY3Rpb25UYXJnZXRzLCBkaXNjb25uZWN0IH1cbn1cbiIsICJpbXBvcnQgeyBTZGsgfSBmcm9tIFwidHlwZXNcIlxuaW1wb3J0IHsgRmVhdHVyZXMgfSBmcm9tIFwiQHN0YWNrbGEvd2lkZ2V0LXV0aWxzXCJcbmltcG9ydCB7IG1hcmtDb2x1bW5zRm9ySW5kZW50IH0gZnJvbSBcIi4vc2xpZGVyLWRlc2lnblwiXG5pbXBvcnQgbmF2aWdhdG9yIGZyb20gXCIuL25hdmlnYXRvclwiXG5pbXBvcnQgeyBnZXRUaWxlU2l6ZVVuaXRsZXNzIH0gZnJvbSBcIi4vdXRpbHNcIlxuaW1wb3J0IHsgaW5pdE9ic2VydmVycyB9IGZyb20gXCIuL29ic2VydmVyc1wiXG5cbmRlY2xhcmUgY29uc3Qgc2RrOiBTZGtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTbGlkZXIoc2V0dGluZ3M6IEZlYXR1cmVzW1widGlsZVNpemVTZXR0aW5nc1wiXSkge1xuICBjb25zdCB0aWxlQmxvY2tFbGVtZW50ID0gc2RrLnF1ZXJ5U2VsZWN0b3IoXCIudWdjLXRpbGUtd3JhcHBlclwiKVxuICBjb25zdCBzbGlkZXJJbmxpbmUgPSBzZGsucXVlcnlTZWxlY3RvcihcIi5zbGlkZXItaW5saW5lXCIpXG4gIGNvbnN0IGxvYWRpbmdFbGVtZW50ID0gc2xpZGVySW5saW5lLnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyLWxvYWRpbmcubG9hZGluZ1wiKVxuXG4gIGNvbnN0IHRpbGVzQ29udGFpbmVyID0gc2xpZGVySW5saW5lLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiLnVnYy10aWxlc1wiKVxuXG4gIGlmICghc2xpZGVySW5saW5lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU2xpZGVyIGlubGluZSBjb250YWluZXIgbm90IGZvdW5kXCIpXG4gIH1cblxuICBpZiAoIXRpbGVCbG9ja0VsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTbGlkZXIgVGlsZXMgU2Nyb2xsIENvbnRhaW5lciBub3QgZm91bmRcIilcbiAgfVxuXG4gIGlmICghdGlsZXNDb250YWluZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTbGlkZXIgVGlsZXMgU2Nyb2xsIENvbnRhaW5lciBub3QgZm91bmRcIilcbiAgfVxuXG4gIGNvbnN0IHN0eWxlID0gc2RrLmdldFN0eWxlQ29uZmlnKClcbiAgY29uc3QgeyBpbmxpbmVfdGlsZV9zaXplLCBpbmxpbmVfdGlsZV9tYXJnaW4gfSA9IHN0eWxlXG5cbiAgdGlsZXNDb250YWluZXIuc2V0QXR0cmlidXRlKFwidmFyaWF0aW9uXCIsIGlubGluZV90aWxlX3NpemUpXG5cbiAgc2xpZGVySW5saW5lLnBhcmVudEVsZW1lbnQ/LnN0eWxlLnNldFByb3BlcnR5KFwiLS1jb250YWluZXItd2lkdGhcIiwgY2FsY3VsYXRlQ29udGFpbmVyV2lkdGgoKSlcblxuICB3aW5kb3cuQ1NTLnJlZ2lzdGVyUHJvcGVydHkoe1xuICAgIG5hbWU6IFwiLS10aWxlLXNpemUtcHJvcFwiLFxuICAgIHN5bnRheDogXCI8bGVuZ3RoPlwiLFxuICAgIGluaGVyaXRzOiBmYWxzZSxcbiAgICBpbml0aWFsVmFsdWU6IGAke2dldFRpbGVTaXplVW5pdGxlc3Moc2V0dGluZ3MpfXB4YFxuICB9KVxuXG4gIGNvbnN0IG9ic2VydmVycyA9IGluaXRPYnNlcnZlcnMoeyBzZXR0aW5ncywgcmVzaXplQ2I6ICgpID0+IGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCkgfSlcblxuICBuYXZpZ2F0b3Ioc2V0dGluZ3MpXG5cbiAgbWFya0NvbHVtbnNGb3JJbmRlbnQoc2V0dGluZ3MpXG4gIGxvYWRpbmdFbGVtZW50Py5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpXG5cbiAgZnVuY3Rpb24gaW5saW5lVGlsZUdhcCgpIHtcbiAgICBjb25zdCB2YWx1ZSA9IE51bWJlcihpbmxpbmVfdGlsZV9tYXJnaW4pXG4gICAgcmV0dXJuIGlzTmFOKHZhbHVlKSA/IDEwIDogdmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZUNvbnRhaW5lcldpZHRoKCkge1xuICAgIGNvbnN0IHRpbGVHYXAgPSBpbmxpbmVUaWxlR2FwKClcbiAgICBjb25zdCByZW5kZXJlZFRpbGVTaXplID0gZ2V0VGlsZVNpemVVbml0bGVzcyhzZXR0aW5ncykgKiAyICsgdGlsZUdhcCAqIDJcbiAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9ICh3aW5kb3cuc2NyZWVuLndpZHRoICogOTUpIC8gMTAwXG4gICAgY29uc3Qgd2lkdGhBZGp1c3RlZCA9IGF2YWlsYWJsZVdpZHRoIC0gKGF2YWlsYWJsZVdpZHRoICUgcmVuZGVyZWRUaWxlU2l6ZSlcbiAgICBjb25zdCBwb3NzaWJsZUNvbHVtbnMgPSBNYXRoLnJvdW5kKGF2YWlsYWJsZVdpZHRoIC8gcmVuZGVyZWRUaWxlU2l6ZSlcbiAgICBjb25zdCB2ZXJpdGljYWxDb2x1bW5zQWRqdXN0bWVudCA9IHRpbGVHYXAgKiBNYXRoLnJvdW5kKHBvc3NpYmxlQ29sdW1ucyAvIDMpXG5cbiAgICAvLyBhZGp1c3RpbmcgdGhlIGdyaWQgZ2FwIG9mIDEwIGZvciB0aGUgbGFzdCBncmlkIGVsZW1lbnQgaW4gdGhlIHJvd1xuICAgIHJldHVybiBgJHt3aWR0aEFkanVzdGVkICsgdGlsZUdhcCAtIHZlcml0aWNhbENvbHVtbnNBZGp1c3RtZW50fXB4YFxuICB9XG5cbiAgZnVuY3Rpb24gdGlsZXNVcGRhdGVkRXZlbnRIYW5kbGVyKCkge1xuICAgIG1hcmtDb2x1bW5zRm9ySW5kZW50KHNldHRpbmdzKVxuICAgIG9ic2VydmVycy5jb25maWdUaWxlSW50ZXJzZWN0aW9uVGFyZ2V0cygpXG4gIH1cblxuICByZXR1cm4geyB0aWxlc1VwZGF0ZWRFdmVudEhhbmRsZXIgfVxufVxuIiwgImltcG9ydCB7IGxvYWRTbGlkZXIgfSBmcm9tIFwiLi9sb2FkLXNsaWRlclwiXG5pbXBvcnQgeyBsb2FkV2lkZ2V0IH0gZnJvbSBcIkBzdGFja2xhL3dpZGdldC11dGlsc1wiXG5cbi8vIGRpbWVuc2lvbnMgZnJvbSBGaWdtYSBkZXNpZ25cbmNvbnN0IHRpbGVTaXplU2V0dGluZ3MgPSB7XG4gIHNtYWxsOiBcIjE0OC4zNHB4XCIsXG4gIG1lZGl1bTogXCIyMjVweFwiLFxuICBsYXJnZTogXCI0MzVweFwiXG59XG5cbmxldCBzbGlkZXJDYWxsYmFja3M6IFJldHVyblR5cGU8dHlwZW9mIGxvYWRTbGlkZXI+XG5cbmxvYWRXaWRnZXQoe1xuICBmZWF0dXJlczoge1xuICAgIGhhbmRsZUxvYWRNb3JlOiBmYWxzZSxcbiAgICBhZGROZXdUaWxlc0F1dG9tYXRpY2FsbHk6IHRydWUsXG4gICAgdGlsZVNpemVTZXR0aW5nc1xuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBvbkxvYWQ6IFtcbiAgICAgICgpID0+XG4gICAgICAgIHZvaWQgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgc2xpZGVyQ2FsbGJhY2tzID0gbG9hZFNsaWRlcih0aWxlU2l6ZVNldHRpbmdzKVxuICAgICAgICB9LCA1MDApXG4gICAgXSxcbiAgICBvblRpbGVzVXBkYXRlZDogWygpID0+IHNsaWRlckNhbGxiYWNrcz8udGlsZXNVcGRhdGVkRXZlbnRIYW5kbGVyKCldXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7QUFBQSxNQUFJLFlBQVksT0FBTztBQUN2QixNQUFJLG9CQUFvQixPQUFPO0FBQy9CLE1BQUksUUFBUSxDQUFDLElBQUksUUFBUSxTQUFTLFNBQVM7QUFDekMsV0FBTyxPQUFPLE9BQU8sR0FBRyxHQUFHLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUk7QUFBQSxFQUNsRTtBQUNBLE1BQUksV0FBVyxDQUFDLFFBQVEsUUFBUTtBQUM5QixhQUFTLFFBQVE7QUFDZixnQkFBVSxRQUFRLE1BQU0sRUFBRSxLQUFLLElBQUksSUFBSSxHQUFHLFlBQVksS0FBSyxDQUFDO0FBQUEsRUFDaEU7QUFHQSxXQUFTLFlBQVksVUFBVTtBQUM3QixVQUFNLFFBQVEsSUFBSSxlQUFlO0FBQ2pDLFVBQU0sRUFBRSxpQkFBaUIsSUFBSTtBQUM3QixVQUFNLFlBQVk7QUFBQSxNQUNoQixPQUFPLFVBQVUsU0FBUztBQUFBLE1BQzFCLFFBQVEsVUFBVSxVQUFVO0FBQUEsTUFDNUIsT0FBTyxVQUFVLFNBQVM7QUFBQSxJQUM1QjtBQUNBLFFBQUksQ0FBQyxrQkFBa0I7QUFDckIsYUFBTyxVQUFVLFFBQVE7QUFBQSxJQUMzQjtBQUNBLFdBQU8sVUFBVSxnQkFBZ0I7QUFBQSxFQUNuQztBQUNBLFdBQVMsb0JBQW9CQSxtQkFBa0I7QUFDN0MsVUFBTSxlQUFlLFlBQVlBLGlCQUFnQjtBQUNqRCxVQUFNLGVBQWUsYUFBYSxRQUFRLE1BQU0sRUFBRTtBQUNsRCxXQUFPLEVBQUUsZUFBZSxjQUFjLHdCQUF3QixhQUFhO0FBQUEsRUFDN0U7QUFDQSxXQUFTLHlCQUF5QixLQUFLO0FBQ3JDLFdBQU8sT0FBTyxR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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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MkJBQTJCO0FBQ2xDLDJCQUFxQixRQUFRO0FBQzdCLGdCQUFVLDhCQUE4QjtBQUFBLElBQzFDO0FBRUEsV0FBTyxFQUFFLHlCQUF5QjtBQUFBLEVBQ3BDOzs7QUNwRUEsTUFBTSxtQkFBbUI7QUFBQSxJQUN2QixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixPQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUk7QUFFSixhQUFXO0FBQUEsSUFDVCxVQUFVO0FBQUEsTUFDUixnQkFBZ0I7QUFBQSxNQUNoQiwwQkFBMEI7QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxNQUNULFFBQVE7QUFBQSxRQUNOLE1BQ0UsS0FBSyxXQUFXLE1BQU07QUFDcEIsNEJBQWtCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDL0MsR0FBRyxHQUFHO0FBQUEsTUFDVjtBQUFBLE1BQ0EsZ0JBQWdCLENBQUMsTUFBTSxpQkFBaUIseUJBQXlCLENBQUM7QUFBQSxJQUNwRTtBQUFBLEVBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsidGlsZVNpemVTZXR0aW5ncyIsICJldmVudCJdCn0K
