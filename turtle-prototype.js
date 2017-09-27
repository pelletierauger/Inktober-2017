var turtles = [];
var instructionBox = [];

var Turtle = function(t) {
    this.heading = t.heading || 0;
    this.pos = new p5.Vector(t.pos.x, t.pos.y) || new p5.Vector(0, 0);
    this.penDown = true;
    this.currentInstruction = 0;
    t.instructions();
    this.states = instructionBox;
    instructionBox = [];
    turtles.push(this);
};

Turtle.prototype.walk = function() {
    var t = this.currentInstruction;
    if (this.states[t]) {
        geo.angleMode(geo.DEGREES);
        var penDown = (this.penDown) ? true : false;
        if (this.states[t].f == "forward" || this.states[t].f == "back") {
            if (penDown) {
                geo.beginShape();
                geo.vertex(this.pos.x, this.pos.y);
            }
        }
        if (this.states[t].f == "forward") {
            var a = this.heading;
            var r = this.states[t].s;
            var x = geo.cos(a) * r;
            var y = geo.sin(a) * r;
            this.pos.x += x;
            this.pos.y += y;
        } else if (this.states[t].f == "back") {
            var a = this.heading;
            var r = this.states[t].s;
            var x = geo.cos(a) * r;
            var y = geo.sin(a) * r;
            this.pos.x -= x;
            this.pos.y -= y;
        } else if (this.states[t].f == "right") {
            var angle = this.states[t].a;
            this.heading += angle;
        } else if (this.states[t].f == "left") {
            var angle = this.states[t].a;
            this.heading -= angle;
        } else if (this.states[t].f == "penUp") {
            this.penDown = false;
        } else if (this.states[t].f == "penDown") {
            this.penDown = true;
        }
        if (this.states[t].f == "forward" || this.states[t].f == "back") {
            if (penDown) {
                geo.vertex(this.pos.x, this.pos.y);
                geo.endShape(geo.LINE);
            }
        }
        this.currentInstruction++;
        if (this.currentInstruction >= this.states.length) {
            this.currentInstruction = 0;
        }
        geo.angleMode(geo.RADIANS);
    }
};

function forward(size) {
    instructionBox.push({
        f: "forward",
        s: size
    });
}

function back(size) {
    instructionBox.push({
        f: "back",
        s: size
    });
}

function right(angle) {
    instructionBox.push({
        f: "right",
        a: angle
    });
}

function left(angle) {
    instructionBox.push({
        f: "left",
        a: angle
    });
}

function penUp() {
    instructionBox.push({
        f: "penUp"
    });
}

function penDown() {
    instructionBox.push({
        f: "penDown"
    });
}

function repeat(n, f) {
    for (var i = 1; i <= n; i++) {
        f(i - 1);
    }
}