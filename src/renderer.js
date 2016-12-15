const renderer = (function() {
  let canvas = document.getElementById("canvas")
  let ctx = canvas.getContext("2d")
  let width = canvas.width = 800
  let height = canvas.height = 400

  function rectangle(obj, body, shape) {
    ctx.save()
    ctx.fillStyle = obj.color || "white"
    ctx.translate(body.pos.x, body.pos.y)
    ctx.rotate(body.rot || 0)
    ctx.fillRect(0, 0, shape.scale.x, shape.scale.y)
    ctx.restore()
  }

  function circle(obj, body, shape) {
    ctx.save()
    ctx.fillStyle = obj.color || "white"
    ctx.translate(body.pos.x, body.pos.y)
    ctx.beginPath()
    ctx.arc(0, 0, shape.r, 0, 2*Math.PI)
    ctx.fill()
    ctx.restore()
  }


  function render(objects) {
    //draw background
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,width,height)
    // order the objects
    objects
    .sort( (o1, o2) => (o1.z || 0) - (o2.z || 0) )
    .forEach(o => {
      if (o.shape.name  == "rectangle") {
        rectangle(o, o.body, o.shape)
      }
      if (o.shape.name == "circle") {
        circle(o, o.body, o.shape)
      }
    })
  }

  return {
    render,
    width,
    height,
  }
})()
