import loadSlider from "./load-slider"
import { loadWidget } from "@stackla/widget-utils"
import tileContentStylesWithOverrides from "./components/tile-content/overrides.scss"
import shopspotStyle from "../styles/templates/shopspot-icon/styles.scss"
import timephraseStyles from "../styles/templates/time-phrase/styles.scss"
import tagsStyles from "../styles/templates/tags/tags.scss"
import shareMenuStyles from "../styles/templates/share-menu/share-menu.scss"

loadWidget({
  extensions: {},
  features: {
    handleLoadMore: false,
    addNewTilesAutomatically: true
  },
  callbacks: {
    onLoad: [loadSlider]
  },
  templates: {
    "expanded-tiles": {
      styles: [
        {
          css: shopspotStyle,
          global: true
        }
      ]
    },
    "share-menu": {
      styles: [
        {
          css: shareMenuStyles,
          global: false
        }
      ]
    },
    "tile-tags": {
      styles: [
        {
          css: tagsStyles,
          global: false
        }
      ]
    },
    "tile-content": {
      styles: [
        {
          css: tileContentStylesWithOverrides,
          global: false
        }
      ]
    },
    "time-phrase": {
      styles: [
        {
          css: timephraseStyles,
          global: false
        }
      ]
    }
  }
})
