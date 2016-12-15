function createBlock(x, y) {
  let state = {
    pos: createVector(x, y),
    scl: createVector(5000, 100),
    angle: 0,
    angleVel: 0,
    angleAcc: 0,
    angleLimit: Math.PI / 5,
    angleVelLimit: 5,
    angleAccLimit: 10,
    color: "grey",
    isTriggered: false,
    b: 0
  }

  state.render = function(ctx) {
    ctx.save()
    ctx.translate(state.pos.x, state.pos.y)
    ctx.rotate(state.angle)
    ctx.fillStyle = state.color
    ctx.fillRect(-state.scl.x/2, -state.scl.y/2, state.scl.x, state.scl.y)

    //draw the setpoint
    ctx.beginPath()
    ctx.arc(state.controller.setpoint, -state.scl.y / 2-50 , 25, 0, 2*Math.PI)
    ctx.strokeWeight = 10
    ctx.stroke()
    ctx.restore()
  }

  state.limit = function(value, max) {
    if (Math.abs(value) > max) {
      return Math.sign(value) * max
    }
    return value
  }

  state.controller = new Controller(state)

  state.update = function() {

    let normal = collisionBallBlock({r: 2, pos: mousePosition}, state)

    if (normal && isMouseDown) {
      state.isTriggered = true
      offset = 0
    }

    if (!isMouseDown) {
      state.isTriggered = false
    }

    if (state.isTriggered) {
      state.angle = Math.atan2(mousePosition.y - state.pos.y, mousePosition.x - state.pos.x)
    } else {
      // here i find the the torque and set the angle of the plane
      // to that torque
      // let acc = state.controller.getTorque()
      // console.log(acc)
      // let a = Math.asin(acc/gravity)
      // state.angle = a

      // this was what i had previously. I would find the torque from the
      // controller, then add that acceelration to the plane.


      state.angleAcc += state.controller.getTorque() * deltaTime
      state.angleAcc = state.limit(state.angleAcc, state.angleAccLimit)
      state.angleVel += state.angleAcc * deltaTime
      state.angleVel = state.limit(state.angleVel, state.angleVelLimit)
      state.angle += state.angleVel * deltaTime

      if (Math.abs(state.angle) > state.angleLimit) {
        state.angle = Math.sign(state.angle) * state.angleLimit
        state.angleVel = 0
      }



      state.angleAcc = 0
    }


  }

  state.readSensor = function(ball) {
    let dist = distBallBlock(ball, state)
    let ballBlock = state.pos.sub(ball.pos)
    //a^2 + b^2 = c^2
    //multiply with sign of x comp of ball block to know on what side of the desired point the ball is
    let distAlongBlock = Math.sqrt(Math.pow(ballBlock.mag(), 2) - dist * dist) * Math.sign(-ballBlock.x)
    //error relative to center of block
    let blockNormal = createVectorAngle(state.angle).hat().mult(-dist-ball.r-state.scl.y/2)


    let pointOfTouch = ball.pos.add(blockNormal)

    // this returns an object with posOnBlock as a property which is a single number
    // ranging from (-block.scl.x/2 ; block.scl.x/2)
    return {posOnBlock: distAlongBlock , pointOfTouch: pointOfTouch, blockNormal: blockNormal}

  }


  return state

}
