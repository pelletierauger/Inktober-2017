var vehicles = [];

var Vehicle = function(x, y, mS, mF) {
    this.pos = new p5.Vector(x, y);
    this.vel = new p5.Vector(0, 0);
    this.acc = new p5.Vector(0, 0);
    this.maxSpeed = 150;
    this.maxForce = 10;
    vehicles.push(this);
};

Vehicle.prototype.applyForce = function(force) {
    this.acc.add(force);
};

Vehicle.prototype.seek = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);

    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    // this.applyForce(steering);
    return (steering);
};

Vehicle.prototype.separate = function(vehicles) {
    var desiredSeparation = 50;
    var sum = new p5.Vector(0, 0);
    var count = 0;
    for (var i = 0; i < vehicles.length; i++) {
        var d = p5.Vector.dist(this.pos, vehicles[i].pos);
        if (d > 0 && d < desiredSeparation) {
            var diff = p5.Vector.sub(this.pos, vehicles[i].pos);
            diff.normalize();
            diff.div(d);
            sum.add(diff);
            count++;
        }
    }
    if (count > 0) {
        sum.div(count);
        sum.normalize;
        sum.mult(this.maxSpeed);

        var steer = p5.Vector.sub(sum, this.vel);
        steer.limit(this.maxForce);
        // this.applyForce(steer);
        return (steer);
    }
    return (createVector(0, 0));
};

Vehicle.prototype.applyBehaviors = function(vehicles, target) {
    var separateForce = this.separate(vehicles);
    var seekForce = this.seek(target);

    separateForce.mult(1);
    seekForce.mult(0.4);

    this.applyForce(separateForce);
    this.applyForce(seekForce);
};

Vehicle.prototype.update = function(force) {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
};


Vehicle.prototype.display = function(force) {
    this.acc.add(force);
    fill(255, 255);
    ellipse(this.pos.x, this.pos.y, 2.5);
    // rect(this.pos.x, this.pos.y, 1, 1);
};