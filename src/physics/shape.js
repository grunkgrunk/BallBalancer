// should implement some behaviour that is shared amongst all shapes
const Shape = function() {
}

const CircleShape = function(r) {
  this.name = "circle"
  this.r = r
}

const RectangleShape = function(xs, ys) {
  this.name = "rectangle"
  this.scale = new Vector(xs, ys)
}
