import type { Tile } from "@stackla/ugc-widgets"
import { createElement } from "jsx-html"

interface SmallTileProps {
  tile: Tile
  clickHandler: (id: number) => void
}

export function SmallTile({ tile, clickHandler }: SmallTileProps): JSX.Element {
  return (
    <div className="grid-item" onClick={() => clickHandler(Number(tile.id))}>
      <div className="tile-image-wrapper">
        <img src={tile.image} alt={tile.name} />
      </div>
      <div className="tile-info-overlay">
        <h3>{tile.name}</h3>
        <p>{tile.message}</p>
      </div>
    </div>
  )
}
