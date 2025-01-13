const PATTERN_HORIZONTAL = "pattern-horizontal"
const PATTERN_VERTICAL = "pattern-vertical"
const PATTERN_VERTICAL_REVERSED = "pattern-vertical-reversed"
const PATTERN_HORIZONTAL_REVERSED = "pattern-horizontal-reversed"

const DEFAULT_PATTERN = [
  PATTERN_HORIZONTAL,
  PATTERN_VERTICAL,
  PATTERN_VERTICAL_REVERSED,
  PATTERN_HORIZONTAL,
  PATTERN_VERTICAL,
  PATTERN_VERTICAL_REVERSED,
  PATTERN_HORIZONTAL_REVERSED,
  PATTERN_HORIZONTAL_REVERSED,
  PATTERN_VERTICAL,
  PATTERN_VERTICAL_REVERSED,
  PATTERN_HORIZONTAL,
  PATTERN_VERTICAL,
  PATTERN_VERTICAL_REVERSED
]

function getDeviceType() {
  const innerWidth = window.innerWidth
  if (innerWidth < 544) {
    return "mobile"
  } else if (innerWidth >= 544 && innerWidth < 700) {
    return "small-tablet"
  } else if (innerWidth >= 700 && innerWidth < 1024) {
    return "tablet"
  } else if (innerWidth >= 1024 && innerWidth < 1080) {
    return "x-small-desktop"
  } else if (innerWidth >= 1080 && innerWidth < 1400) {
    return "small-desktop"
  } else if (innerWidth >= 1400 && innerWidth <= 1870) {
    return "desktop"
  } else if (innerWidth > 1870) {
    return "x-large-desktop"
  }

  return "unknown"
}

function getMediumDesktopIndents() {
  return [1, 3, 6, 8]
}

function getDesktopIndents() {
  return [1, 2, 8, 11]
}

function getExtraLargeDesktopIndents() {
  return [1, 2, 4, 5, 10, 13, 14, 15, 17, 18, 20, 21, 26, 29, 30, 31]
}

function getSmallDesktopIndents() {
  return [1, 2, 6, 7]
}

function getExtraSmallDesktopIndents() {
  return [1, 3, 5]
}

function getTabletIndents() {
  return [1]
}

function getExtraLargeDesktopPattern() {
  return [
    ...DEFAULT_PATTERN,
    PATTERN_HORIZONTAL,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_HORIZONTAL,
    PATTERN_VERTICAL,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL,
    PATTERN_VERTICAL,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_VERTICAL,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL,
    PATTERN_VERTICAL,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_HORIZONTAL_REVERSED
  ]
}

function getDesktopPattern() {
  return [
    PATTERN_HORIZONTAL,
    PATTERN_VERTICAL,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_VERTICAL,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL,
    PATTERN_VERTICAL,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL_REVERSED
  ]
}

function getSmallDesktopPattern() {
  return [
    PATTERN_HORIZONTAL,
    PATTERN_VERTICAL,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_VERTICAL,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL,
    PATTERN_HORIZONTAL_REVERSED
  ]
}

function getMediumDesktopPattern() {
  return [
    PATTERN_VERTICAL,
    PATTERN_HORIZONTAL,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_HORIZONTAL,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_HORIZONTAL
  ]
}

function getExtraSmallDesktopPattern() {
  return [
    PATTERN_VERTICAL,
    PATTERN_HORIZONTAL,
    PATTERN_VERTICAL,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL
  ]
}

function getMobilePattern() {
  return [PATTERN_HORIZONTAL, PATTERN_VERTICAL, PATTERN_HORIZONTAL_REVERSED]
}

function getTabletPattern() {
  return [PATTERN_HORIZONTAL, PATTERN_VERTICAL, PATTERN_HORIZONTAL_REVERSED]
}

function getSmallTabletPattern() {
  return [
    PATTERN_HORIZONTAL,
    PATTERN_VERTICAL,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_HORIZONTAL_REVERSED,
    PATTERN_VERTICAL_REVERSED,
    PATTERN_VERTICAL
  ]
}

function getPatternByDeviceType() {
  if (getDeviceType() === "mobile") {
    return getMobilePattern()
  }

  if (getDeviceType() === "tablet") {
    return getTabletPattern()
  }

  if (getDeviceType() === "small-tablet") {
    return getSmallTabletPattern()
  }

  if (getDeviceType() === "x-large-desktop") {
    return getExtraLargeDesktopPattern()
  }

  if (getDeviceType() === "small-desktop") {
    return getSmallDesktopPattern()
  }

  if (getDeviceType() === "x-small-desktop") {
    return getExtraSmallDesktopPattern()
  }

  return getDesktopPattern()
}

export {
  getDeviceType,
  getMediumDesktopIndents,
  getDesktopIndents,
  getExtraLargeDesktopIndents,
  getTabletIndents,
  getSmallDesktopIndents,
  getExtraSmallDesktopIndents,
  getDesktopPattern,
  getSmallDesktopPattern,
  getMediumDesktopPattern,
  getExtraSmallDesktopPattern,
  getMobilePattern,
  getTabletPattern,
  getSmallTabletPattern,
  getPatternByDeviceType,
  getExtraLargeDesktopPattern
}
