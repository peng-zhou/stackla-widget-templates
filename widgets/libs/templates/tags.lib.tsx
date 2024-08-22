import { Tile } from "@stackla/ugc-widgets"
import { createElement } from "jsx-html"

type TagsProps = {
  tile: Tile
}

export const Tags = ({ tile }: TagsProps) => {
  return tile.tags_extended && (
    <div class="tags">
      {tile.tags_extended.map(tag => (
        <div class="tag">
          <span>
            <a href={tag.custom_url ?? "#"}>{tag.tag}</a>
          </span>
        </div>
      ))}
    </div>
  )
}
