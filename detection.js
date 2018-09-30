function dotDetection() {
    for (var i = 0; i < 2500; i++) {
        var x = Math.floor(sketch.random(0, sketch.width));
        var y = Math.floor(sketch.random(0, sketch.height));
        if (sketch.pixels[(x + y * sketch.width) * 4] >= 100) {
            if (points.length != 0) {
                var tooClose = false;
                for (var j = 0; j < points.length; j++) {
                    var v = sketch.createVector(x, y);
                    var v2 = sketch.createVector(points[j].x, points[j].y);
                    if (sketch.dist(v.x, v.y, v2.x, v2.y) < 4) {
                        tooClose = true;
                    }
                }
                if (!tooClose) {
                    points.push({ x: x, y: y });
                }
            } else {
                points.push({ x: x, y: y });
            }
        }
    }
}

function displayArray() {
    if (points.length) {
        for (var j = 0; j < points.length; j++) {
            if (points[j]) {
                geo.fill(255);
                geo.ellipse(points[j].x - geo.width / 2, points[j].y - geo.height / 2, 2);
            }
        }
    }
    pointsDisplay.html(points.length);
}