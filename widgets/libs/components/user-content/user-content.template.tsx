import { createElement, createFragment } from "jsx-html"
import { getTimephrase } from "@libs/tile.lib"

type UserInfoTemplateProps = {
  avatar: string | null
  user: string | null
  originalUrl: string
}

type UserContentTemplateProps = UserInfoTemplateProps & {
  message: string
  sourceCreatedAt?: number
}
export function UserContentTemplate({ avatar, user, originalUrl, message, sourceCreatedAt }: UserContentTemplateProps) {
  return (
    <div class="user-content-wrapper">
      <UserInfoTemplate avatar={avatar} user={user} originalUrl={originalUrl} />
      <div class="description">
        <div class="caption">
          <p class="caption-paragraph">{message}</p>
        </div>

        <div class="tile-timephrase">{sourceCreatedAt && getTimephrase(sourceCreatedAt)}</div>
      </div>
    </div>
  )
}

function UserInfoTemplate({ avatar, user, originalUrl }: UserInfoTemplateProps) {
  const tileAvatar = avatar ? (
    <span class="avatar-wrapper">
      <a class="avatar-link" href={originalUrl} target="_blank">
        <img
          loading="lazy"
          src={avatar}
          onerror={`this.src = "https://web-assets.stackla.com/app.stackla.com/media/images/default-avatars/default-avatar.png";`}
        />
      </a>
    </span>
  ) : (
    <></>
  )
  const tileUser = user ? (
    <a class="user-link" href={originalUrl} target="_blank">
      <span class="user-name">{user}</span>
      <span class="user-handle">@{user}</span>
    </a>
  ) : (
    <></>
  )
  return (
    <div class="user-info">
      {tileAvatar}
      {tileUser}
    </div>
  )
}
