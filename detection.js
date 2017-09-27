var sum = 0;
var arr = [];

function dotDetection() {
    if (sum < 4000) {
        for (var i = 0; i < 2500; i++) {
            var x = Math.floor(random(0, width));
            var y = Math.floor(random(0, height));
            if (pixels[(x + y * width) * 4] >= 200 && sum < 4000) {
                if (arr.length != 0) {
                    var tooClose = false;
                    for (var j = 0; j < arr.length; j++) {
                        var v = createVector(x, y);
                        var v2 = createVector(arr[j].x, arr[j].y);
                        if (dist(v.x, v.y, v2.x, v2.y) < 9) {
                            tooClose = true;
                        }
                    }
                    if (!tooClose) {
                        sum++;
                        arr.push({ x: x, y: y });
                    }
                } else {
                    sum++;
                    arr.push({ x: x, y: y });
                }
            }
        }
    }
}