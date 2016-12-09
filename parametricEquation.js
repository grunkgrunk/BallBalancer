function createParametric(dir, point) {
  let para = {
    dir: dir,
    point: point
  }

  para.getPoint = function(t) {
    return createVector(para.dir.x * t + para.point.x, para.dir.y * t + para.point.y)
  }

  para.intersect = function(other) {
    let v = createVector(para.dir.x, para.dir.y)
    let u = createVector(other.dir.x, other.dir.y)

    w = other.sub()

    return para.getPoint(t)
  }

  return para
}
