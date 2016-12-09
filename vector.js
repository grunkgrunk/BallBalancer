function createVector(x, y) {
  let v = {
    x: x || 0,
    y: y || 0
  }

  v.add = function(u) {
    return createVector(v.x + u.x, v.y + u.y)
  }

  v.sub = function(u) {
    return createVector(v.x - u.x, u.y - v.y)
  }

  v.mult = function(k) {
    return createVector(v.x * k, v.y * k)
  }

  v.copy = function() {
    return createVector(v.x, v.y)
  }

  v.mag = function() {
    return Math.pow(v.x * v.x + v.y * v.y, 0.5)
  }

  v.dist = function(target) {
    return target.sub(v).mag()
  }

  v.set = function(u) {
    return createVector(u.x, u.y)
  }

  v.setMag = function(mag) {
    return v.normalize().mult(mag)
  }

  v.normalize = function() {
    return v.mult(1/v.mag())
  }

  v.limit = function(maxMag) {
    if (v.mag() > maxMag) {
      v.setMag(maxMag)
    }
  }

  v.limitAxis = function(axis, max) {
    let limited = v.copy()
    if (limited[axis] > max) {
      limited[axis] = max
    }
    return limited
  }

  v.dot = function(u) {
    return v.x * u.x + v.y * u.y
  }

  v.projected = function(u) {
    return v.mult(v.dot(v) / Math.pow(v.mag(), 2))
  }

  v.toAngle = function(a) {
    let mag = v.mag()
    return createVector(Math.cos(a), Math.sin(a)).mult(mag)
  }

  v.hat = function() {
    return createVector(-v.y, v.x)
  }

  return v
}

function createVectorAngle(angle, mag) {
  return createVector(Math.cos(angle), Math.sin(angle)).mult(mag || 1)
}
