var socket;
var looping = true;
var showGeo = true;
var showPanels = true;
var showSketch = true;
var modes = ["drawGraph", "detectGraph", "animate"];
var mode = 2;
var points = [];
var pointsDisplay;
var img;
var JSONs;
var system;
var graphAngles = false;
var angle = 0;

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

var sketch = new p5(function(p) {
    p.preload = function() {
        img = p.loadImage("./images/polkadot.jpg");
    };
    p.setup = function() {
        socket = io.connect('http://localhost:8080');
        if (mode == 0 || mode == 1) {
            p.pixelDensity(1);
        }
        p.canvas = p.createCanvas(p.windowWidth, p.windowWidth * 9 / 16);
        p.canvas.addClass('sketch');
        p.frameRate(30);
        p.background(0);
        p.fill(255, 0, 0);
        p.noStroke();
        p.imageMode(p.CENTER);
        createInterface();
        if (!looping) {
            p.noLoop();
        }
        if (mode == 0 || mode == 1) {
            folders.pointsDisplay = new Folder("Amount of points", true);
            pointsDisplay = p.createP(points.length);
            pointsDisplay.parent(folders.pointsDisplay.div);
            var saveButton = new Button("Save points to JSON", folders.pointsDisplay.div, function() {
                if (points.length) {
                    socket.emit('savePoints', points);
                }
            });
        }
        if (mode == 1) {
            p.image(img, p.width / 2, p.height / 2, p.width, p.height);
            p.loadPixels();
            p.background(0, 150);
        } else if (mode == 2) {
            socket.on('pushJSONs', function(data) {
                JSONs = data;
                system = loadSystems();
            });
            socket.emit('pullJSONs', "");
        }
    };
    p.draw = function() {
        p.translate(p.width / 2, p.height / 2);
        if (mode == 0) {

        } else if (mode == 1) {
            dotDetection();
            displayArray();
        } else if (mode == 2) {
            if (system) {
                system.applyBehaviours();
            }
        }
    };
    p.mousePressed = function() {
        if (mode == 0) {
            if (p.mouseX <= p.width && p.mouseY <= p.height) {
                var newV = {
                    x: p.mouseX,
                    y: p.mouseY
                };
                p.ellipse(newV.x - p.width / 2, newV.y - p.height / 2, 2);
                points.push(newV);
                pointsDisplay.html(points.length);
            }
        }
    };
    p.mouseDragged = function() {
        if (mode == 0) {
            if (p.mouseX <= p.width && p.mouseY <= p.height) {
                var newV = {
                    x: p.mouseX,
                    y: p.mouseY
                };
                p.ellipse(newV.x - p.width / 2, newV.y - p.height / 2, 2);
                points.push(newV);
                pointsDisplay.html(points.length);
            }
        }
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
            } else {
                showGeo = true;
                geo.canvas.style("display", "block");
            }
        }
        if (p.key == 'f' || p.key == 'F') {
            if (showPanels) {
                showPanels = false;
                interface.style("display", "none");
            } else {
                showPanels = true;
                interface.style("display", "block");
            }
        }
        if (p.key == 'p' || p.key == 'P') {
            if (points.length) {
                socket.emit('savePoints', points);
            }
        }
        if (p.key == 'a' || p.key == 'A') {
            angle -= 10;
        }
        if (p.key == 'd' || p.key == 'D') {
            angle += 10;
        }
    }
});

var geo = new p5(function(p) {
    p.setup = function() {
        if (mode == 0 || mode == 1) {
            p.pixelDensity(1);
        }
        p.canvas = p.createCanvas(p.windowWidth, p.windowWidth * 9 / 16);
        p.canvas.addClass('geo');
        p.frameRate(30);
        if (!looping) {
            p.noLoop();
        }
        if (mode == 0 || mode == 1) {
            p.stroke(255);
            p.noFill();
        }
    };
    p.draw = function() {
        if (mode == 0 && graphAngles) {
            p.clear();
            let triangleSize = 20;
            p.push();
            p.translate(sketch.mouseX, sketch.mouseY);
            p.rotate(angle / 360 * p.TWO_PI);
            p.beginShape();
            p.vertex(triangleSize, 0);
            p.vertex(0, triangleSize / 2);
            p.vertex(0, -triangleSize / 2);
            p.endShape(p.CLOSE);
            p.pop();
        }
        if (mode == 1) {
            p.clear();
            p.translate(p.width / 2, p.height / 2);
        }
        if (mode == 2) {
            p.clear();
            p.translate(p.width / 2, p.height / 2);
            p.noStroke();
            if (system) {
                for (let i = 0; i < system.flocks.length; i++) {
                    var color = system.flocks[i].color;
                    color = p.color(color[0], color[1], color[2]);
                    p.fill(color);
                    for (let g = 0; g < system.flocks[i].graph.length; g++) {
                        var x = system.flocks[i].graph[g].x;
                        var y = system.flocks[i].graph[g].y;
                        p.ellipse(x - p.width / 2, y - p.height / 2, 5);
                    }
                }
            }
        }
    };
});