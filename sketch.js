var socket;
var looping = true;
var showGeo = true;
var showPanels = true;
var showSketch = true;
var modes = ["drawGraph", "detectGraph", "animate"];
var mode = 0;
var points = [];
var pointsDisplay;
var JSONFileName;

var sketch = new p5(function(p) {
    p.setup = function() {
        socket = io.connect('http://localhost:8080');
        p.canvas = p.createCanvas(p.windowWidth, p.windowWidth * 9 / 16);
        p.canvas.addClass('sketch');
        p.frameRate(30);
        p.background(0);
        p.fill(255, 0, 0);
        p.noStroke();
        p.ellipse(p.width / 2, p.height / 2, 100);
        createInterface();
        if (!looping) {
            p.noLoop();
        }
        if (mode == 0) {
            folders.pointsDisplay = new Folder("Number of points", true);
            pointsDisplay = p.createP(points.length);
            pointsDisplay.parent(folders.pointsDisplay.div);
            JSONFileName = p.createP("Ceci est éditable.");
            JSONFileName.parent(folders.pointsDisplay.div);
            JSONFileName.style("contenteditable", "true");
            var saveButton = new Button("Save points to JSON", folders.pointsDisplay.div, function() {
                if (points.length) {
                    socket.emit('savePoints', points);
                }
            });
        } else if (mode == 1) {

        } else if (mode == 2) {

        }
    };
    p.draw = function() {
        p.translate(p.width / 2, p.height / 2);
        if (mode == 0) {

        } else if (mode == 1) {

        } else if (mode == 2) {

        }
    };
    p.mousePressed = function() {
        if (mode == 0) {
            if (p.mouseX <= p.width && p.mouseY <= p.height) {
                var newV = [p.mouseX - p.width / 2, p.mouseY - p.height / 2];
                p.ellipse(newV[0], newV[1], 2);
                points.push(newV);
                pointsDisplay.html(points.length);
            }
        }
    };
    p.mouseDragged = function() {
        if (mode == 0) {
            if (p.mouseX <= p.width && p.mouseY <= p.height) {
                var newV = [p.mouseX - p.width / 2, p.mouseY - p.height / 2];
                p.ellipse(newV[0], newV[1], 2);
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
                geo.noLoop();
            } else {
                showGeo = true;
                geo.canvas.style("display", "block");
                geo.loop();
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

            // socket.emit('bounce', "Newer test!");
            if (points.length) {
                socket.emit('savePoints', points);
            }
        }
    }
});

var geo = new p5(function(p) {
    p.setup = function() {
        p.canvas = p.createCanvas(p.windowWidth, p.windowWidth * 9 / 16);
        p.canvas.addClass('geo');
        p.frameRate(30);
        if (!looping) {
            p.noLoop();
        }
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