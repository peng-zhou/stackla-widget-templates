import type { Sdk } from "@stackla/ugc-widgets"
import { Tile } from "@stackla/ugc-widgets"
import { IWidgetSettings } from "../../../../types/IWidgetSettings"
import { getTimephrase } from "../../../libs/tile.lib"
import { createElement, createFragment } from "jsx-html"

export const tileTemplate = (sdk: Sdk, widgetSettings: IWidgetSettings, tile: Tile) => {
    const shopspotEnabled = sdk.isComponentLoaded("shopspots") && widgetSettings.expanded_tile_show_shopspots
    const productsEnabled = sdk.isComponentLoaded("products") && widgetSettings.expanded_tile_show_products
    const parent = sdk.getNodeId()
    return (
        <div className="panel">
            <a className="exit" href="#">
                <span className="widget-icon close-white"></span>
            </a>
            <div className="tile-arrows">
                <button className="tile-arrows-btn tile-arrows-left">
                    <span className="widget-icon chevron-left"></span>
                </button>
                <button className="tile-arrows-btn tile-arrows-right">
                    <span className="widget-icon chevron-right"></span>
                </button>
            </div>
            <div className="panel-left">
                <div className="image-wrapper">
                    <div className="image-wrapper-inner">
                        <div className="image">
                            {shopspotEnabled ? <shopspot-flyout parent={parent}></shopspot-flyout> : null}
                            {shopspotEnabled ? <shopspot-icon parent={parent}/> : null}
                            {tile.image ? <img className="image-element" src={tile.image} /> : null}
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
                                    {tile.avatar && (
                                        <span className="avatar-wrapper">
                                            <a className="avatar-link" href={tile.original_url} target="_blank" rel="noopener noreferrer">
                                                <img src={tile.avatar} alt="User Avatar"/>
                                            </a>
                                        </span>
                                    )}
                                    {tile.user && (
                                        <a className="user-link" href={tile.original_url} target="_blank" rel="noopener noreferrer">
                                            <div className="user-top">
                                                <span className="user-name">{tile.user}</span>
                                            </div>
                                            <div className="user-bottom">
                                                <span className="user-handle">@{tile.user}</span>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="tile-timestamp">
                                {tile.source_created_at && widgetSettings.expanded_tile_show_timestamp ? getTimephrase(tile.source_created_at) : ""}
                            </div>
                            <div className="caption">
                                <p className="caption-paragraph">
                                    {tile.message && widgetSettings.expanded_tile_show_caption ? tile.message : ""}
                                </p>
                                {widgetSettings.expanded_tile_show_sharing && (
                                    <div className="ugc-inline-share-buttons">
                                        <a href={`https://www.addtoany.com/add_to/facebook?linkurl=${tile.original_url}&linkname=${tile.name}`} target="_blank" rel="noopener noreferrer">
                                            <img src="https://static.addtoany.com/buttons/facebook.svg" width="32" height="32" style={{backgroundColor:"#333"}} alt="Share on Facebook"/>
                                        </a>
                                        <a href={`https://www.addtoany.com/add_to/x?linkurl=${tile.original_url}&linkname=${tile.name}`} target="_blank" rel="noopener noreferrer">
                                            <img src="https://static.addtoany.com/buttons/x.svg" width="32" height="32" style={{backgroundColor:"#333"}} alt="Share on X"/>
                                        </a>
                                        <a href={`https://www.addtoany.com/add_to/pinterest?linkurl=${tile.original_url}&linkname=${tile.name}`} target="_blank" rel="noopener noreferrer">
                                            <img src="https://static.addtoany.com/buttons/pinterest.svg" width="32" height="32" style={{backgroundColor:"#333"}} alt="Share on Pinterest"/>
                                        </a>
                                        <a href={`https://www.addtoany.com/add_to/linkedin?linkurl=${tile.original_url}&linkname=${tile.name}`} target="_blank" rel="noopener noreferrer">
                                            <img src="https://static.addtoany.com/buttons/linkedin.svg" width="32" height="32" style={{backgroundColor:"#333"}} alt="Share on LinkedIn"/>
                                        </a>
                                        <a href={`https://www.addtoany.com/add_to/email?linkurl=${tile.original_url}&linkname=${tile.name}`} target="_blank" rel="noopener noreferrer">
                                            <img src="https://static.addtoany.com/buttons/email.svg" width="32" height="32" style={{backgroundColor:"#333"}} alt="Share via Email"/>
                                        </a>
                                    </div>
                                )}
                                {productsEnabled && <ugc-products parent={parent}></ugc-products>}
                            </div>
                            <div className="sharethis-inline-share-buttons"></div>
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