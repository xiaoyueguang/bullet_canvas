const scale = 0.5

class Text {
  constructor ({
    text,
    speed = 1,
    time,
    top,
    color,
    size,
    zIndex
  }) {
    this.text = text
    this.speed = speed
    this.time = time
    this.top = top
    this.color = color
    this.size = size
    this.zIndex = zIndex
  }

  getLeft (time, scale) {
    return time * scale
  }
}

export default Text
