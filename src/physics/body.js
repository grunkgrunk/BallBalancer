const Body = function(x, y, type) {
  // make enum for types
  this.type = type || "dynamic"

  this.pos = new Vector(x || 0, y || 0)
  this.vel = new Vector(0,0)
  this.acc = new Vector(0,0)

  this.rot = 0
  this.rotVel = 0
  this.rotAcc = 0

  this.mass = 1
}

Body.prototype.update = function(elapsed) {
  if (this.type == "dynamic") {
    // update position
    this.vel = this.vel.add(this.acc.mult(elapsed))
    this.pos = this.pos.add(this.vel.mult(elapsed))
    this.acc = this.acc.mult(0)
  }

  if (this.type == "dynamic" || "rotationOnly") {
    // update rotation
    this.rotVel += this.rotAcc * elapsed
    this.rot += this.rotVel * elapsed
    this.rotAcc = 0
  }
}

Body.prototype.applyForce = function(f) {
  // not using mass yet
  this.acc = this.acc.add(f)
}

Body.prototype.applyTorque = function(t) {
  // not using mass yet
  this.rotAcc += t
}
