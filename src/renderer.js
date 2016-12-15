const renderer = (function() {
  let canvas = document.getElementById("canvas")
  let ctx = canvas.getContext("2d")
  let width = canvas.width = 800
  let height = canvas.height = 400

  function rectangle(obj) {
    ctx.save()
    ctx.fillStyle = obj.color || "white"
    ctx.translate(obj.pos.x, obj.pos.y)
    ctx.rotate(obj.rotation || 0)
    ctx.fillRect(0, 0, obj.scale.x, obj.scale.y)
    ctx.restore()
  }

  function circle(obj) {
    ctx.save()
    ctx.fillStyle = obj.color || "white"
    ctx.translate(obj.pos.x, obj.pos.y)
    ctx.beginPath()
    ctx.arc(0, 0, obj.r, 0, 2*Math.PI)
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
      if (o.model == "rectangle") {
        rectangle(o)
      }
      if (o.model == "circle") {
        circle(o)
      }
    })
  }

  return {
    render,
    width,
    height,
  }
})()
