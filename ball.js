const Ball = function() {
  this.pos = createVector(x || 0, y || 0)
  this.r =  50
  this.color = "green"
}

state.render = function(ctx) {
  ctx.beginPath()
  ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI)
  ctx.fillStyle = this.color
  ctx.fill()
}

this.update = function() {
  this.vel = this.vel.add(this.acc.mult(deltaTime))
  this.pos = this.pos.add(this.vel.mult(deltaTime))
  this.acc = this.acc.mult(0)
}
