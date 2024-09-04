import type { Tile } from "@stackla/ugc-widgets"
import { createElement } from "jsx-html"

interface BigTileProps {
  tile: Tile
  clickHandler: (id: number) => void
}

export function BigTile({ tile, clickHandler }: BigTileProps): JSX.Element {
  const { id, image, name, message } = tile

  return (
    <div className="grid-item large" onClick={() => clickHandler(Number(id ?? 0))} key={id}>
      <div className="tile-image-wrapper">
        <img src={image} alt={`${name}`} />
      </div>
      <div className="tile-info-overlay">
        <h3>{name}</h3>
        <p>{message}</p>
      </div>
    </div>
  )
}
