# Create Custom templates Guide

Prepare development environment:

1) Clone your Forked repo of stackla/stackla-widget-templates. You can do this by executing git clone https://github.com/Stackla/stackla-widget-templates

2) Utilise a code editor such as VSCode to prepare your IDE for development

3) Inside the folder, fetch the latest widget-utils repository submodule.

Execute the following;

`git submodule init && git submodule update`

4) Install all packages by executing: npm install

5) Execute npm run start to see our gallery of widgets in action.

6) Access the following URL, substituting the widgetType with any widget you wish to preview.

http://localhost:4003/preview?widgetType=carousel


# File Structure Overview

```
/custom-widget
├── _dimens.scss
├── _inline-tile.scss
├── _oneractive.scss
├── _styles.scss
├── widget.scss
├── expanded-tile.template.tsx
├── products.template.tsx
├── tile.template.tsx
├── inline-carousel-swiper.loader.ts
├── oneractive.lib.ts
├── widget.tsx (main widget entry)
├── config.ts
├── layout.hbs
└── tile.hbs
```

1) Load the Widget (widget.tsx)

```
loadWidget({
  config: {
    ...config
  },
  extensions: {
    swiper: true
  },
  features: {
    handleLoadMore: false
  },
  templates: {
    "expanded-tiles": {
      template: ExpandedTiles
    }
  }
})
```

Extras:
    •	Add custom header
    •	Hook event listener
    •	Call Swiper listener initializer

2) Initialize Swiper Inline (inline-carousel-swiper.loader.ts)

```
export function initializeInlineSwiperListeners() {
  const swiper = sdk.querySelector(".carousel-inline.swiper-inline")

  if (!swiper) {
    throw new Error("Failed to find swiper element")
  }

  initializeSwiperForInlineTiles()
}
```
3) Config Swiper
```
initializeSwiper({
    id: "inline-carousel",
    mode: "inline",
    widgetSelector,
    prevButton: "swiper-inline-carousel-button-prev",
    nextButton: "swiper-inline-carousel-button-next",
    paramsOverrides: {
      loop: false,
      slidesPerView: "auto",
      grabCursor: false,
      allowTouchMove: false,
      breakpointsBase: "container",
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        537: {
          slidesPerView: 3
        },
        952: {
          slidesPerView: 7
        }
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      on: {
        reachEnd: () => {
          sdk.triggerEvent(EVENT_LOAD_MORE)
        },
        beforeInit: (swiper: Swiper) => {
          enableLoadedTiles()
          swiper.slideToLoop(0, 0, false)
        },
        afterInit: (swiper: Swiper) => {
          setSwiperLoadingStatus("inline-carousel", true)
          void loadTilesAsync(swiper)
        },
        activeIndexChange: (swiper: Swiper) => {
          if (swiper.navigation.prevEl) {
            if (swiper.realIndex === 0 && isSwiperLoading("inline-carousel")) {
              disablePrevNavigation(swiper)
            } else {
              enablePrevNavigation(swiper)
            }
          }
        }
      }
    }
  })
  ```

  4) JSX Templates
    a: ExpandedTiles()

        •	Renders each tile’s content:
        •	Media (image, video, text, html)
        •	Tags (via <tile-tags>)
        •	Products (via <ugc-products>)
        •	Sharing tools (tile-content)

    b: ProductsTemplate()
    	•	Pulls tags_extended from the tile and filters for type: "product".
        •	Displays:
        •	ProductHeader (name/price)
        •	ProductImages (with Swiper nav)
        •	ProductDetails (description + CTA)

5) Handlebars Templates Overview

    a: Template1:  Inline Tile Layout
    ```
    <div class="track swiper carousel-inline swiper-inline" style="display:none;">
        <div class="swiper-wrapper ugc-tiles">
            {{#tiles}}
            {{>tpl-tile options=../options.config}}
            {{/tiles}}
        </div>
    </div>
    <div class="swiper-inline-carousel-button-prev swiper-button-prev btn-lg">
        <span class="swiper-nav-icon icon-prev-circle" />
    </div>
    <div class="swiper-inline-carousel-button-next swiper-button-next btn-lg">
        <span class="swiper-nav-icon icon-next-circle" />
    </div>
    ```

	•	This is the outer Swiper container for the inline tile carousel.
	•	Tiles are looped with {{#tiles}} and rendered via a partial called tpl-tile.
	•	Prev/Next buttons are included for manual navigation.
	•	The whole thing is initially display:none; (likely shown when tiles are present + Swiper initialized).

    b: Template2:  Tile template

    ```
    {{#tile class="swiper-slide" }}
        <div class="tile">
        {{#ifequals media "video"}}
            {{#unless options.tile_options.auto_play_video }}
                <div class="tile-loading"></div>
            {{/unless}}
            {{/ifequals}}
            <div class="icon-section hidden">
            <div class="top-section">
                {{#if carousel_children.length}}
                    <div class="content-icon icon-carousel-grouping"></div>
                {{/if}}
                {{#ifequals media "video"}}
                    <div class="content-icon icon-video"></div>
                {{/ifequals}}
            </div>
            <div class="bottom-section">
                <div class="network-icon icon-{{source}}"></div>
            </div>
            </div>
            <div class="tile-image-wrapper">
            {{#ifAutoPlayVideo media options.tile_options.auto_play_video }}
                {{playVideo this "100%" "100%"}}
            {{else}}
                <shopspot-icon tile-id={{id}}></shopspot-icon>
                {{#lazy image_thumbnail_url }}{{/lazy}}
            {{/ifAutoPlayVideo}}
            <div class="swiper-lazy-preloader"></div>
            <div class="description overlay">
                <div class="caption">
                <div class="caption-paragraph">{{message}}</div>
                </div>
            </div>
            </div>
        </div>
    {{/tile}}
    ```

    •	Wrapped in {{#tile}} with class="swiper-slide" — makes this compatible with Swiper.
	•	Supports:
	•	Conditional video loading (autoplay toggle)
	•	Icons (e.g., carousel group or video)
	•	Source icons (e.g., Instagram, TikTok, YouTube)
	•	Lazy image loading
	•	Optional ShopSpot tag
	•	Caption overlay with tile message