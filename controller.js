
var sum = (a, b)=> a + b

// Here I am assuming you have some kind of object with a .getPosition() method
// that returns a single number that corresponds to its position.
function Controller(system){

    // We store the system, which has a .getPosition method
    this.system = system


    // Tune these parameters by hand (trial and error)
    // When they throw the ball away, this is called system instability
    // the multiplier is just there to show some more reasonable numbers in the gui.

    this.K = 0.0000
    this.D = 0.0000  // maybe 0.00003
    this.I = 0.0000

    // We store a history of the positions
    this.sLength = 50
    this.p = []
    // this.s = []
    // this.dt = []

    // We store a setpoint that we are trying to reach
    this.setpoint = 0

    // We record the position of the object in fixed time increments
    //setTimeout(this.recordPosition.bind(this), this.dt)
}

Controller.prototype.setParams = function(
  {
    K = this.K,
    D = this.D,
    I = this.I,
    setpoint = 0,
    multiplier = 1
  }) {
  console.log(this.K, this.D, this.I, multiplier);
  this.K = K * multiplier
  this.D = D * multiplier
  this.I = I * multiplier



  this.setpoint = setpoint

  this.p = []
}

// I changed this to be manually updated because i wanted to make sure that the recording was made
// after collision detection and response had occured. To ensure that there is one recording pr. this.dt i
// added deltaTime to the code
Controller.prototype.recordPosition = function (ball, deltaTime) {
  // Get the next position
  var sNext = this.system.readSensor(ball).posOnBlock
  // Store the position
  if (ball.isSticking) {

    this.p.push({pos: sNext, dt: deltaTime})

    if(this.p.length == this.sLength) {
      this.p.shift()
    }
  }
}

// This will return the torque required as long as at least two observations
// of the plant have been made sicne the system started.
Controller.prototype.getTorque = function () {

    // Get the index of the last place
    var iLast = this.p.length - 1
    if(iLast < 1) return 0


    // Find the PID terms
    var error = this.p.map(s=> s.pos-this.setpoint)
    var integral = this.p.map(s => s.pos * s.dt).reduce(sum)
    var derivative = (error[iLast] - error[iLast-1])/this.p[iLast].dt
    var proportional = error[iLast]
    //console.log("prop", this.setpoint, this.p[iLast], proportional)


    //Write the PID torque
    var torque = - this.K * error[iLast]
                 - this.D * derivative
                 - this.I * integral

    return torque
}
