var sum = 0;

function dotDetection() {
    // console.log("got none!");
    for (var i = 0; i < 2500; i++) {
        var x = Math.floor(sketch.random(0, sketch.width));
        var y = Math.floor(sketch.random(0, sketch.height));
        // geo.ellipse(x, y, 5);
        // console.log(sketch.pixels[(x + y * sketch.width) * 4]);
        if (sketch.pixels[(x + y * sketch.width) * 4] >= 100) {
            // console.log("got one!");
            if (points.length != 0) {
                var tooClose = false;
                for (var j = 0; j < points.length; j++) {
                    var v = sketch.createVector(x, y);
                    var v2 = sketch.createVector(points[j].x, points[j].y);
                    if (sketch.dist(v.x, v.y, v2.x, v2.y) < 9) {
                        tooClose = true;
                    }
                }
                if (!tooClose) {
                    sum++;
                    points.push({ x: x, y: y });
                }
            } else {
                sum++;
                points.push({ x: x, y: y });
            }
        }
    }
}

function displayArray() {
    if (points.length) {
        // sketch.push();
        // sketch.scale(0.25, 0.25);
        for (var j = 0; j < points.length; j++) {
            if (points[j]) {
                sketch.fill(255);
                sketch.ellipse(points[j].x - sketch.width / 2, points[j].y - sketch.height / 2, 5);
            }
        }
        // sketch.pop();
    }
    pointsDisplay.html(points.length);
}