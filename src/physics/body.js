const Body = function() {
  this.pos = new Vector(x || 0, y || 0)
  this.vel = new Vector(0,0)
  this.acc = new Vector(0,0)

  this.rot = 0
  this.rotVel = 0
  this.rotAcc = 0
}

Body.prototype.update = function (elapsed) {
  this.vel = this.vel.add(this.acc.mult(elapsed))
  this.pos = this.pos.add(this.vel.mult(elapsed))
  this.acc = this.acc.mult(0)
}
