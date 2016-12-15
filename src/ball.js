const Ball = function(x, y) {
  this.pos = new Vector(x || 0, y || 0)
  this.vel = new Vector(0,0)
  this.acc = new Vector(0,0)
  this.r =  10
  this.color = "green"
  this.model = "circle"
}

Ball.prototype.update = function(elapsed) {
  this.acc.y = 100
  this.vel = this.vel.add(this.acc.mult(elapsed))
  this.pos = this.pos.add(this.vel.mult(elapsed))
  this.acc = this.acc.mult(0)
}
