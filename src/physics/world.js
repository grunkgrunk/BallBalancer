const World = function(PX_PR_METER, gravity) {
  this.objects = []
  this.PX_PR_METER = PX_PR_METER
  this.gravity = gravity
}

World.prototype.push = function(obj) {
  this.objects.push(obj)
}

World.prototype.update = function(elapsed) {
  this.objects.forEach(o => o.body.update(elapsed))
}
