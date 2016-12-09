
let gravity = 10000,
mousePosition,
isMouseDown = false
lastUpdate = Date.now() / 1000
deltaTime = 0

let gui

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function distBallBlock(ball, block) {
  //Dont understand the negative angle
  let blockDir = createVector(Math.cos(-block.angle), Math.sin(-block.angle))
  let hatBlockDir = blockDir.hat()

  let blockBall = block.pos.sub(ball.pos)

  let dist = blockBall.dot(hatBlockDir.normalize())

  return dist
}

function collisionBallBlock(ball, block) {
  // parameterfremstilling
  let dist = Math.abs(distBallBlock(ball, block))

  if (dist <= ball.r + block.scl.y / 2) {
    return createVector(Math.cos(block.angle), Math.sin(block.angle))
    .hat()
    .mult(dist-ball.r-block.scl.y / 2)
  }
  return false
}

window.onload = function() {
  let canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  width = canvas.width = window.innerWidth / 1.1,
  height = canvas.height = window.innerHeight / 1.5



  mousePosition = createVector(0,0)

  document.body.onmousedown = function() {
    isMouseDown = true
  }

  document.body.onmouseup = function() {
    isMouseDown = false
  }

  document.addEventListener("mousemove", mouseMoveHandler, false)

  let ball = createBall(width/2 + 20, 100)
  let block = createBlock(width/2, height/1.5)

  gui = new dat.GUI()
  //gui.add(text, 'message');

  let controllerParams = {
    K: 0,
    D: 0,
    I: 0,
    multiplier: 100000000,
    setpoint: 0
  }
  let gainSlider = () => block.controller.setParams(controllerParams)
  gui.add(controllerParams, 'K', 0, 1000).onChange(gainSlider)
  gui.add(controllerParams, 'D', 0, 1000).onChange(gainSlider)
  gui.add(controllerParams, 'I', 0, 1000).onChange(gainSlider)
  gui.add(controllerParams, 'setpoint', -width/2 + ball.r, width/2 - ball.r).onChange(gainSlider)
  gui.add(block, 'angleLimit', 0, Math.PI);

  update()

  function update() {
    width = canvas.width = window.innerWidth / 1.1,
    height = canvas.height = window.innerHeight / 1.5
    // delta time
    deltaTime = Date.now() / 1000 - lastUpdate
    lastUpdate = Date.now() / 1000

    block.controller.recordPosition(ball, deltaTime)
    block.pos.x = width / 2
    block.update()
    ball.update()

    let collision = collisionBallBlock(ball, block)
    if (collision) {
      ball.isSticking = true
    }

    if (ball.isSticking) {
      let forceStr = Math.sin(block.angle) * gravity
      let acting = createVector(0, gravity).toAngle(block.angle).setMag(forceStr)
      ball.acc = ball.acc.add(acting.mult(deltaTime))

      //set position of ball to touch the platform
      ball.pos = block.readSensor(ball).pointOfTouch

      let wrongVel = ball.vel.y * Math.cos(-block.angle)
      let blockNormal = createVector(-Math.sin(block.angle), Math.cos(block.angle))
      ball.vel = ball.vel.add(blockNormal.setMag(-wrongVel))
      //ball.vel = ball.vel.y * Math.sin(block.angle)
    }
    else {
      ball.acc = createVector(0, gravity)
    }

    console.log(block.controller.getTorque());

    ctx.clearRect(0,0, width, height)
      //move the platform

    ctx.fillStyle = "red"
    ctx.fill()
    ball.render(ctx)
    block.render(ctx)
    // ctx.beginPath()
    // ctx.arc(mousePosition.x, mousePosition.y, 2, 0, 2*Math.PI)
    // ctx.fillStyle = "red"
    // ctx.fill()
    //
    //
    //
    // let blockDir = createVector(Math.cos(block.angle), Math.sin(block.angle))
    // let hatBlockDir = blockDir.hat().mult(100)
    //
    // // ctx.beginPath()
    // // ctx.moveTo(block.pos.x, block.pos.y)
    // // ctx.lineTo(block.pos.x + hatBlockDir.x, block.pos.y + hatBlockDir.y)
    // // ctx.strokeStyle = "red"
    // // ctx.stroke()
    //
    // ctx.beginPath()
    // ctx.moveTo(ball.pos.x, ball.pos.y)
    // ctx.lineTo(ball.pos.x + ball.vel.x * 100, ball.pos.y + ball.vel.y * 100)
    // ctx.stroke()

    // let sensor = block.readSensor(ball)
    // ctx.beginPath()
    // ctx.arc(sensor.x, sensor.y, 20, 0, 2*Math.PI)
    // ctx.fillStyle = "red"
    // ctx.fill()


    // let blockNormalFromBall = block.readSensor(ball).blockNormal.mult(1)
    let pointOfTouch = block.readSensor(ball).pointOfTouch

    // ctx.beginPath()
    // ctx.moveTo(ball.pos.x, ball.pos.y)
    // ctx.lineTo(blockNormalFromBall.x + ball.pos.x, blockNormalFromBall.y + ball.pos.y)
    // ctx.stroke()



    requestAnimationFrame(update)
  }

  function mouseMoveHandler(e) {
    let rect = canvas.getBoundingClientRect()
    mousePosition.x = e.clientX - rect.left
    mousePosition.y = e.clientY - rect.top
  }
}
