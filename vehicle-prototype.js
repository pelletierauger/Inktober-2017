var vehicles = [];

var Vehicle = function(x, y, mS, mF, d) {
    this.pos = new p5.Vector(x, y);
    this.vel = new p5.Vector(0, 0);
    this.acc = new p5.Vector(0, 0);
    this.maxSpeed = mS || 150;
    this.maxForce = mF || 10;
    this.desiredSeparation = d || 50;
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
    return (steering);
};

Vehicle.prototype.separate = function(vehicles) {
    var sum = new p5.Vector(0, 0);
    var count = 0;
    for (var i = 0; i < vehicles.length; i++) {
        var d = p5.Vector.dist(this.pos, vehicles[i].pos);
        if (d > 0 && d < this.desiredSeparation) {
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
        return (steer);
    }
    return (new p5.Vector(0, 0));
};

Vehicle.prototype.applyBehaviors = function(repellers, attractors) {
    if (repellers) {
        for (let i = 0; i < repellers.length; i++) {
            var separateForce = this.separate(repellers[i].f.graph);
            var mult = repellers[i].mult;
            separateForce.mult(mult);
            this.applyForce(separateForce);
        }
    }
    if (attractors) {
        for (let i = 0; i < attractors.length; i++) {
            var seekForce = this.seek(attractors[i].f);
            var mult = attractors[i].mult;
            seekForce.mult(mult);
            this.applyForce(seekForce);
        }
    }
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