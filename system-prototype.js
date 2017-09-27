var System = function() {
    this.flocks = [];
};

System.prototype.addFlock = function(flock) {
    this.flocks.push(new Flock(flock));
};

System.prototype.applyBehaviours = function() {
    for (let i = 0; i < this.flocks.length; i++) {
        this.flocks[i].behaviour(this);
    }
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
    if (f.type == "vehicles" && f.vehicleVariables) {
        this.graph = this.makeVehicles(this.graph, f.vehicleVariables);
    } else if (f.type == "static" || !f.type) {
        this.graph = this.makeStatics(this.graph);
    }
    this.attractors = [];
    this.repellers = [];
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

Flock.prototype.addAttractor = function(f, mult) {
    this.attractors.push([f, mult]);
};

Flock.prototype.addRepeller = function(f, mult) {
    this.repellers.push([f, mult]);
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