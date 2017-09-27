var System = function(s) {
    this.rate = s.rate;
    this.name = s.name;
    this.onlyGeo = s.onlyGeo;
    this.flocks = [];
    if (s.background && !this.onlyGeo) {
        this.background = sketch.loadImage("./images/" + this.name + "/background.png");
        this.backgroundDisplayedOnce = false;
    } else {
        this.background = false;
        this.backgroundDisplayedOnce = true;
    }
};

System.prototype.addFlock = function(flock) {
    this.flocks.push(new Flock(flock, this.name));
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
    for (let i = 0; i < this.flocks.length; i++) {
        this.flocks[i].displayInkDots();
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

var Flock = function(f, systemName) {
    this.color = f.color;
    if (f.dots) {
        this.dotsDisplayRate = f.dots.displayRate || 1;
        this.dotsReadiness = false;
        this.dotSize = f.dots.size || 20;
        if (f.dots.name && f.dots.amount) {
            this.dots = [];
            for (let i = 0; i < f.dots.amount; i++) {
                var formattedIndex = "" + i;
                while (formattedIndex.length < 3) {
                    formattedIndex = "0" + formattedIndex;
                }
                var path = "./images/" + systemName + "/" + f.dots.name + formattedIndex + ".png";
                var dot = sketch.loadImage(path);
                this.dots.push(dot);
            }
        }
    } else {
        this.dotsReadiness = true;
    }

    this.type = f.type || "static";
    if (this.type == "atom" && f.equation) {
        this.equation = f.equation;
        this.graph = this.makeAtoms(f.graphLength, this.equation);
    } else if (f.type == "vehicles" && f.vehicleVariables) {
        this.graph = this.makeVehicles(f.graph, f.vehicleVariables);
    } else if (f.type == "static") {
        this.graph = this.makeStatics(f.graph);
    } else if (f.type == "turtle" && f.turtleInstructions) {
        this.graph = this.makeTurtles(f.graph, f.turtleInstructions);
    }
    this.attractors = [];
    this.repellers = [];
};

Flock.prototype.displayInkDots = function() {
    if (this.dots && this.dotsReadiness) {
        if (this.dotsDisplayRate == 1 || sketch.frameCount % this.dotsDisplayRate == 0) {
            for (let i = 0; i < this.graph.length; i++) {
                var dotChoice = Math.floor(sketch.random(this.dots.length));
                sketch.push();
                sketch.translate(this.graph[i].pos.x - sketch.width / 2, this.graph[i].pos.y - sketch.height / 2);
                sketch.rotate(sketch.random(0, sketch.TWO_PI));
                sketch.image(this.dots[dotChoice], 0, 0, this.dotSize, this.dotSize);
                sketch.pop();
            }
        }
    }
};

Flock.prototype.testDotsReadiness = function() {
    if (this.dots) {
        var ready = true;
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].width <= 1) {
                ready = false
            }
        }
        if (!ready) {
            this.dotsReadiness = false
        } else {
            this.dotsReadiness = true;
        }
    }
};

Flock.prototype.update = function() {
    if (!this.dotsReadiness) {
        this.testDotsReadiness();
    }
    if (this.dotsReadiness) {
        if (this.type == "vehicles") {
            for (let i = 0; i < this.graph.length; i++) {
                this.graph[i].applyBehaviors(this.repellers, this.attractors);
                this.graph[i].update();
            }
        } else if (this.type == "atom" && this.equation) {
            for (let i = 0; i < this.graph.length; i++) {
                this.graph[i].pos = this.equation(sketch.frameCount, i);
            }
        } else if (this.type == "turtle") {
            for (let i = 0; i < this.graph.length; i++) {
                this.graph[i].walk();
            }
        }
    }
};

Flock.prototype.makeTurtles = function(f, inst) {
    var g = [];
    for (let i = 0; i < f.length; i++) {
        var heading = f[i].a || 0;
        var turtle = new Turtle({
            heading: heading,
            pos: {
                x: f[i].x,
                y: f[i].y
            },
            instructions: inst
        });
        g.push(turtle);
    }
    return g;
};

Flock.prototype.makeAtoms = function(l, eq) {
    var g = [];
    for (let i = 0; i < l; i++) {
        g.push(new Static(eq(0, i)));
    }
    return g;
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