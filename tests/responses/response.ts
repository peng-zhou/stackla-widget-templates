// eslint-disable-next-line
import nock from "nock"
import { getWidget, prepareTilesAsHTML } from "../../tests/libs/developer"
import path from "node:path"

export function createURLParams(widgetRequest) {
  const urlParams = new URLSearchParams()

  Object.keys(widgetRequest).forEach(key => {
    const parameterValue = widgetRequest[key]

    if (!parameterValue) return

    urlParams.append(key, parameterValue)
  })

  urlParams.delete("draft")

  return urlParams
}

export function createTilesResponse(widgetRequest, limit = 500, page = 1) {
  const requestWithLimitAndPage = {
    ...widgetRequest,
    page: page,
    limit: limit
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const tiles = require(path.resolve(`src/tests/mock/tiles-${page}.json`))

  const params = createURLParams(requestWithLimitAndPage).toString()

  nock("http://localhost:4001").persist().get(`/widgets/${widgetRequest.wid}/tiles?${params}`).reply(200, {
    tiles: tiles
  })

  nock("http://localhost:4001")
    .persist()
    .get(
      `/widgets/${widgetRequest.wid}/tiles?wid=${widgetRequest.wid}&filter_id=2&limit=10&after_id=6438d191b2b25622607edeb7`
    )
    .reply(200, {
      tiles: [tiles[0]]
    })

  nock("http://localhost:4001")
    .persist()
    .get(
      `/widgets/${widgetRequest.wid}/tiles?wid=${widgetRequest.wid}&filter_id=2&limit=10&after_id=64dddc583b925a78748f9112`
    )
    .reply(200, {
      tiles: [tiles[0]]
    })

  nock("http://localhost:4001")
    .persist()
    .get(`/widgets/${widgetRequest.wid}/rendered/tiles?wid=${widgetRequest.wid}&filter_id=2&page=${page}`)
    .reply(200, prepareTilesAsHTML(tiles, page.toString(), limit))

  nock("http://localhost:4001")
    .persist()
    .get(`/widgets/${widgetRequest.wid}/rendered/tiles?wid=${widgetRequest.wid}&filter_id=2&limit=10&page=${page}`)
    .reply(200, prepareTilesAsHTML(tiles, page.toString(), limit))

  nock("http://localhost:4001")
    .persist()
    .get(
      `/widgets/${widgetRequest.wid}/rendered/tiles?wid=${widgetRequest.wid}&filter_id=2&limit=10&after_id=6438d191b2b25622607edeb7`
    )
    .reply(200, prepareTilesAsHTML(tiles, page.toString(), limit))
}

export function createTileResponse(widgetRequest, tileId: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const tiles = require(path.resolve(`src/tests/mock/tiles-1.json`))

  nock("http://localhost:4001").persist().get(`/widgets/${widgetRequest.wid}/tiles/${tileId}`).reply(200, tiles[0])
}

export function createWidgetResponse(widgetRequest) {
  nock("http://localhost:4001")
    .persist()
    .get(`/widgets/${widgetRequest.wid}?${createURLParams(widgetRequest).toString()}`)
    .reply(200, getWidget())
}
