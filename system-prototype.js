var System = function(s) {
    this.rate = s.rate;
    this.name = s.name;
    console.log(s.constructor.name);
    this.flocks = [];
    if (s.background) {
        this.background = sketch.loadImage("./images/" + this.name + "/background.jpg");
        this.backgroundDisplayedOnce = false;
    } else {
        this.background = false;
        this.backgroundDisplayedOnce = true;
    }
};

System.prototype.addFlock = function(flock) {
    this.flocks.push(new Flock(flock));
};

System.prototype.update = function() {
    for (let i = 0; i < this.flocks.length; i++) {
        this.flocks[i].update();
    }
};

System.prototype.displayBackground = function() {
    if (this.background) {
        if (this.background.width > 1) {
            sketch.image(this.background, 0, 0, sketch.width, sketch.height);
            if (!this.backgroundDisplayedOnce) {
                this.backgroundDisplayedOnce = true;
            }
        }
    }
};

System.prototype.displayInkDots = function() {

};

System.prototype.displayGeo = function() {
    for (let i = 0; i < this.flocks.length; i++) {
        var color = this.flocks[i].color;
        color = geo.color(color[0], color[1], color[2]);
        geo.fill(color);
        for (let g = 0; g < this.flocks[i].graph.length; g++) {
            var x = this.flocks[i].graph[g].pos.x;
            var y = this.flocks[i].graph[g].pos.y;
            geo.ellipse(x - geo.width / 2, y - geo.height / 2, 5);
        }
    }
};

//--------------------Flocks-------------------------------------------------//

var Flock = function(f) {
    this.color = f.color;
    this.behaviour = f.behaviour;
    this.graph = f.graph;
    this.type = f.type || "static";
    if (f.type == "vehicles" && f.vehicleVariables) {
        this.graph = this.makeVehicles(this.graph, f.vehicleVariables);
    } else if (f.type == "static" || !f.type) {
        this.graph = this.makeStatics(this.graph);
    }
    this.attractors = [];
    this.repellers = [];
};

Flock.prototype.update = function() {
    if (this.type == "vehicles") {
        for (let i = 0; i < this.graph.length; i++) {
            // console.log("how many times");
            this.graph[i].applyBehaviors(this.repellers, this.attractors);
            this.graph[i].update();
        }
    }
};

Flock.prototype.makeStatics = function(f) {
    var g = [];
    for (let i = 0; i < f.length; i++) {
        var x = f[i].x;
        var y = f[i].y;
        g.push(new Static(x, y));
    }
    return g;
}

Flock.prototype.makeVehicles = function(f, v) {
    var g = [];
    for (let i = 0; i < f.length; i++) {
        var x = f[i].x;
        var y = f[i].y;
        var mS = v.maxSpeed;
        var mF = v.maxForce;
        var d = v.desiredSeparation;
        g.push(new Vehicle(x, y, mS, mF, d));
    }
    return g;
};

Flock.prototype.addAttractors = function(f, mult) {
    this.attractors.push({
        f: f,
        mult: mult
    });
};

Flock.prototype.addRepellers = function(f, mult) {
    this.repellers.push({
        f: f,
        mult: mult
    });
};

//--------------------Other functions-------------------------------------------------//

var Static = function(x, y) {
    this.pos = new p5.Vector(x, y);
};

function fetchJSON(name) {
    for (let i = 0; i < JSONs.length; i++) {
        if (JSONs[i].name == name) {
            console.log("Found a matching JSON name for " + name);
            return JSONs[i].graph;
        }
    }
    console.log("Did not find a matching JSON name for " + name);
    return null;
}