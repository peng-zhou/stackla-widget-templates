import tiles from "../../../tests/fixtures/tiles.fixtures"
import { getTagsFromTile } from "./expanded-tile.lib"

describe("widgets/nightfall/components/expanded-tile/base.template.ts", () => {
  it("should return empty string if tile does not have extended tags", () => {
    expect(getTagsFromTile(tiles[7])).toBe("<div class='tags'></div>")
  })

  it("should return tags if tile has extended tags", () => {
    const tile = tiles[0]

    expect(getTagsFromTile(tile)).toBe(
      `<div class='tags'><div class='tag'><span><a href="#">Double column span</a></span></div><div class='tag'><span><a href="#">Single column span</a></span></div><div class='tag'><span><a href="#">auto_twitter_user</a></span></div><div class='tag'><span><a href="https://www.topshop.com/webapp/wcs/stores/servlet/ProductDisplay?catalogId=33057&storeId=12556&productId=33834478&langId=-1&cmpId=615&viewAllFlag=false&sort_field=Relevance&beginIndex=1&pageSize=20&categoryId=3497014&parent_categoryId=204484">**Embroidered Watch</a></span></div><div class='tag'><span><a href="https://visual-ugc-staging.myshopify.com/products/lime-cardigannosto=ugc-widget-recommendation-1">Lime Cardigan</a></span></div><div class='tag'><span><a href="https://visual-ugc-staging.myshopify.com/products/sleeveless-cape-jacket-blacknosto=ugc-widget-recommendation-1">Sleeveless Cape Jacket</a></span></div><div class='tag'><span><a href="https://visual-ugc-staging.myshopify.com/products/s14-onl-li-5656-blacknosto=ugc-widget-recommendation-1">Delicious Camisole</a></span></div></div>`
    )
  })
})
