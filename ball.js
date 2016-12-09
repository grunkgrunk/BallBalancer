function createBall(x, y) {
  let state = {
    pos: createVector(x || 0, y || 0),
    vel: createVector(0, 0),
    acc: createVector(0, 0),
    r: 50,
    color: "green",
    isTriggered: false,
    actingForce: createVector(0, 0),
    hasHit: false,
    isSticking: false
  }

  state.render = function(ctx) {
    ctx.beginPath()
    ctx.arc(state.pos.x, state.pos.y, state.r, 0, 2*Math.PI)
    ctx.fillStyle = state.color
    ctx.fill()
  }

  state.update = function() {
    state.vel = state.vel.add(state.acc.mult(deltaTime))
    state.pos = state.pos.add(state.vel.mult(deltaTime))
    //state.vel.limit(100)
    state.acc = state.acc.mult(0)

    if (isMouseDown && mousePosition.dist(state.pos) < state.r) {
      state.isTriggered = true
      state.hasHit = false
    }

    if (!isMouseDown) {
      state.isTriggered = false
    }

    if (state.isTriggered) {
      state.isSticking = false
      state.vel = state.vel.mult(0)
      state.pos = mousePosition.copy()
    }

  }

  //state.stickTo()

  return state
}
