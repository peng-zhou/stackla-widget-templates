const PATTERN_HORIZONTAL = "pattern-horizontal"
const PATTERN_VERTICAL = "pattern-vertical"
const PATTERN_VERTICAL_REVERSED = "pattern-vertical-reversed"
const PATTERN_HORIZONTAL_REVERSED = "pattern-horizontal-reversed"

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
  } else if (innerWidth >= 1080 && innerWidth < 1160) {
    return "small-desktop"
  } else if (innerWidth >= 1160 && innerWidth < 1400) {
    return "medium-desktop"
  } else {
    return "desktop"
  }
}

function getMediumDesktopIndents() {
  return [1, 3, 6, 8]
}

function getDesktopIndents() {
  return [1, 2, 8, 11]
}

function getTabletIndents() {
  return [1]
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

  if (getDeviceType() === "medium-desktop") {
    return getMediumDesktopPattern()
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
  getTabletIndents,
  getDesktopPattern,
  getSmallDesktopPattern,
  getMediumDesktopPattern,
  getExtraSmallDesktopPattern,
  getMobilePattern,
  getTabletPattern,
  getSmallTabletPattern,
  getPatternByDeviceType
}
