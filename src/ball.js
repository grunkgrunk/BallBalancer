const Ball = function(x, y) {
  this.color = "green"
  this.model = "circle"

  this.body = new Body(x, y, "dynamic")
  this.shape = new CircleShape(10)
}

Ball.prototype.update = function(elapsed) {
  this.body.applyForce(new Vector(0, 1))
  this.body.update(elapsed)
}
