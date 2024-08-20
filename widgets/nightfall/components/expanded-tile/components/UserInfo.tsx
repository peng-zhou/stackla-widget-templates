import { createElement, createFragment } from "jsx-html"
import { Tile } from "@stackla/ugc-widgets"
import { ExpandedTileProps } from "../../../types/ExpandedTileProps"

function renderAvatar(tile: Tile) {
  return tile.avatar ? (
    <span className="avatar-wrapper">
      <a className="avatar-link" href={tile.original_url} target="_blank">
        <img alt="User's Display Picture" src={tile.avatar} />
      </a>
    </span>
  ) : (
    <></>
  )
}

function renderUser(tile: Tile) {
  return tile.user ? (
    <a className="user-link" href={tile.original_url} target="_blank">
      <div className="user-top">
        <span className="user-name">{tile.user}</span>
      </div>
      <div className="user-bottom">
        <span className="user-handle">@{tile.user}</span>
      </div>
    </a>
  ) : (
    <></>
  )
}

export default ({ tile }: ExpandedTileProps) => (
  <div className="user-info-wrapper">
    <div className="user-info">
      {renderAvatar(tile)}
      {renderUser(tile)}
    </div>
  </div>
)
