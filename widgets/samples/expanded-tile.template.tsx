import { createElement, createFragment, Sdk, Tile } from "@stackla/widget-utils"

export default (sdk: Sdk) => {
  const tile = sdk.tiles.getTile() as Tile
  const shopspotEnabled = sdk.isComponentLoaded("shopspots")
  const productsEnabled = sdk.isComponentLoaded("products")
  const parent = sdk.getNodeId()
  return (
    <div className="panel">
      <a className="exit" href="#">
        Close
      </a>
      <div className="panel-left">
        <div className="image-wrapper">
          <div className="image-wrapper-inner">
            <div className="image">
              {shopspotEnabled ? <shopspot-flyout parent={parent} /> : <></>}
              {shopspotEnabled ? <shopspot-icon parent={parent} /> : <></>}
              {tile.image ? <img className="image-element" src={tile.image} /> : <></>}
            </div>
          </div>
        </div>
        <div>
          <span className="source">
            <i className={`fs fs-${tile.source}`}></i>
          </span>
        </div>
      </div>
      <div className="panel-right">
        <div className="panel-right-wrapper">
          <div className="content-wrapper">
            <div className="content-inner-wrapper">
              <div className="user-info-wrapper">
                <div className="user-info">
                  {tile.avatar ? (
                    <span className="avatar-wrapper">
                      <a className="avatar-link" href={tile.original_url} target="_blank">
                        <img src={tile.avatar} />
                      </a>
                    </span>
                  ) : null}
                  {tile.user ? (
                    <a className="user-link" href={tile.original_url} target="_blank">
                      <span className="user-name">{tile.user}</span>
                      <span className="user-handle">@{tile.user}</span>
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="caption">
                <p className="caption-paragraph">{tile.message ?? ""}</p>
              </div>
              {productsEnabled ? <ugc-products parent={parent} tile-id={tile.id} /> : null}
              <div className="footer">
                <span className="base-v2 source source-instagram">
                  <i className="fs fs-instagram"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
