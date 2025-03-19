// import { ISdk } from "packages/widget-utils/dist/esm"

// declare const sdk: ISdk

export function getMyMoodBorder(mood: string) {
  switch (mood) {
    case "happy":
      return "3px solid green"
    case "sad":
      return "3px solid red"
    case "angry":
      return "3px solid black"
    default:
      return "blue"
  }
}
