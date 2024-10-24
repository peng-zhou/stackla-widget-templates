import { initializeSwiper } from "@libs/extensions/swiper/swiper.extension"

export function onTagsRendered(tagId: string, target: HTMLElement) {
  if (target && target.shadowRoot) {
    const swiperCrossSell = target.shadowRoot.querySelector<HTMLElement>(".swiper-tags")

    if (swiperCrossSell) {
      initializeSwiper({
        id: `tile-tag-${tagId}`,
        mode: "tags",
        widgetSelector: swiperCrossSell,
        prevButton: "swiper-tags-button-prev",
        nextButton: "swiper-tags-recs-button-next",
        paramsOverrides: {
          slidesPerView: "auto",
          grabCursor: false,
          on: {
            beforeInit: swiper => {
              swiper.slideToLoop(0, 0, false)
            }
          }
        }
      })
    }
  }
}
