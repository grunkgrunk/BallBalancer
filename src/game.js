const game = (function() {
  const MS_PR_UPDATE = 17
  let previous = Date.now()
  let lag = 0

  function run() {

    let current = Date.now()
    let elapsed = current - previous
    previous = current
    lag += elapsed

    // Update all objects and take lag into account
    //while (lag >= MS_PR_UPDATE) {
      // convert time to to seconds
      objects.forEach(o => o.update(elapsed / 1000))
      lag -= MS_PR_UPDATE
    //}

    renderer.render(objects)

    requestAnimationFrame(run)
  }

  return {
    run
  }
})()
