function loadSystems() {

    var firstSystem = new System({
        rate: 0,
        name: "firstSystem",
        background: true,
        onlyGeo: false
    });

    firstSystem.addFlock({
        type: "vehicles",
        color: [0, 255, 0],
        dots: {
            name: "dot",
            amount: 4,
            displayRate: 1,
            size: 3
        },
        vehicleVariables: {
            maxSpeed: 150,
            maxForce: 10,
            desiredSeparation: 150
        },
        graph: fetchJSON("wed-sep-27-2017-014236")
    });
    firstSystem.addFlock({
        type: "static",
        color: [255, 0, 0],
        graph: fetchJSON("wed-sep-27-2017-014506")
    });
    firstSystem.addFlock({
        type: "atom",
        color: [0, 0, 255],
        graphLength: 10,
        equation: function(t, i) {
            t = t + i;
            var x = sketch.width / 2 + Math.cos(t / 10) * 150;
            var y = sketch.height / 2 + Math.sin(t / 10) * 150;
            return (new p5.Vector(x, y));
        }
    });
    firstSystem.flocks[0].addAttractors(firstSystem.flocks[2], 0.015);
    firstSystem.flocks[0].addRepellers(firstSystem.flocks[0], 0.05);

    //-----------------Second system--------------------------------------------------------//

    var secondSystem = new System({
        rate: 0,
        name: "firstSystem",
        background: true,
        onlyGeo: false
    });

    secondSystem.addFlock({
        type: "vehicles",
        color: [0, 255, 0],
        dots: {
            name: "dot",
            amount: 4,
            displayRate: 1,
            size: 6
        },
        vehicleVariables: {
            maxSpeed: 150,
            maxForce: 10,
            desiredSeparation: 300,
            friction: 0.9
        },
        graph: fetchJSON("wed-sep-27-2017-014236")
    });

    secondSystem.addFlock({
        type: "turtle",
        color: [255, 255, 0],
        dots: {
            name: "dot",
            amount: 4,
            displayRate: 1,
            size: 3
        },
        turtleInstructions: function() {
            var s = 5;
            var times = 4;
            repeat(times, function() {
                repeat(60, function() {
                    forward(s);
                    right(20);
                    s += 0.1;
                });
                repeat(60, function() {
                    forward(s);
                    left(20);
                    s -= 0.1;
                });
                forward(60);
                repeat(4, function() {
                    forward(s);
                    left(360 / times / 4);
                });
                forward(60);
            });
        },
        graph: [{ x: 600, y: 500 }]
    });

    secondSystem.flocks[0].addAttractors(secondSystem.flocks[1], 0.015);
    secondSystem.flocks[0].addRepellers(secondSystem.flocks[0], 0.05);

    //-----------------Second system--------------------------------------------------------//

    var thirdSystem = new System({
        rate: 0,
        name: "firstSystem",
        background: true,
        onlyGeo: false
    });

    thirdSystem.addFlock({
        type: "turtle",
        color: [255, 255, 0],
        dots: {
            name: "dot",
            amount: 4,
            displayRate: 1,
            size: 3
        },
        turtleInstructions: function() {
            var s = 5;
            var times = 4;
            repeat(times, function() {
                repeat(60, function() {
                    forward(s);
                    right(20);
                    s += 0.1;
                });
                repeat(60, function() {
                    forward(s);
                    left(20);
                    s -= 0.1;
                });
                forward(60);
                repeat(4, function() {
                    forward(s);
                    left(360 / times / 4);
                });
                forward(60);
            });
        },
        graph: fetchJSON("thu-sep-28-2017-005311")
    });

    return thirdSystem;
}