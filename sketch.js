var socket;
var looping = true;
var showGeo = true;
var showSketch = true;

var sketch = new p5(function(p) {
    p.setup = function() {
        p.canvas = p.createCanvas(p.windowWidth, p.windowWidth * 9 / 16);
        p.canvas.addClass('sketch');
        p.frameRate(30);
        p.background(0);
        p.fill(255, 0, 0);
        p.noStroke();
        p.ellipse(p.width / 2, p.height / 2, 100);
    };
    p.keyPressed = function() {
        if (p.keyCode === 32) {
            if (looping) {
                p.noLoop();
                geo.noLoop();
                looping = false;
            } else {
                p.loop();
                geo.loop();
                looping = true;
            }
        }
        if (p.key == 'g' || p.key == 'G') {
            if (showSketch) {
                showSketch = false;
                p.canvas.style("display", "none");
            } else {
                showSketch = true;
                p.canvas.style("display", "block");
            }
        }
        if (p.key == 't' || p.key == 'T') {
            if (showGeo) {
                showGeo = false;
                geo.canvas.style("display", "none");
                geo.noLoop();
            } else {
                showGeo = true;
                geo.canvas.style("display", "block");
                geo.loop();
            }
        }
    }
});

var geo = new p5(function(p) {
    p.setup = function() {
        socket = io.connect('http://localhost:8080');
        p.canvas = p.createCanvas(p.windowWidth, p.windowWidth * 9 / 16);
        p.canvas.addClass('geo');
        p.frameRate(30);
    };
    p.draw = function() {
        p.clear();
        p.fill(0, 255, 0);
        p.noStroke();
        p.ellipse(p.width / 2, p.height / 2, 50);
        for (let i = 0; i < system.flocks.length; i++) {
            for (let g = 0; g <  system.flocks[i].graph.length; g++) {
                var color = system.flocks[i].color;
                color = p.color(color[0], color[1], color[2]);
                var x = system.flocks[i].graph[g][0];
                var y = system.flocks[i].graph[g][1];
                p.fill(color);
                p.ellipse(x, y, 50);
            }
        }
    };
});