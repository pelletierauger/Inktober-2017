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

    //-----------------First ink system--------------------------------------------------------//

    var firstInk = new System({
        rate: 0,
        name: "first-ink",
        background: true,
        onlyGeo: false
    });
    firstInk.addFlock({
        type: "vehicles",
        color: [0, 255, 0],
        dots: {
            name: "dot",
            amount: 4,
            displayRate: 1,
            size: 6
        },
        vehicleVariables: {
            maxSpeed: 5,
            maxForce: 10,
            desiredSeparation: 10,
            friction: 0.9
        },
        graph: fetchJSON("sun-oct-01-2017-033641")
    });
    firstInk.addFlock({
        type: "static",
        color: [255, 0, 0],
        graph: fetchJSON("sun-oct-01-2017-033909")
    });
    firstInk.addFlock({
        type: "static",
        color: [255, 255, 0],
        graph: [{ x: 650, y: 360 }]
    });
    firstInk.flocks[0].addAttractors(firstInk.flocks[2], 0.05);
    firstInk.flocks[0].addRepellers(firstInk.flocks[0], 0.5, 20);
    firstInk.flocks[0].addRepellers(firstInk.flocks[1], 0.75, 20);

    //-----
    var firstInk2 = new System({
        rate: 0,
        name: "first-ink",
        background: true,
        onlyGeo: false
    });
    firstInk2.addFlock({
        type: "vehicles",
        color: [0, 255, 0],
        dots: {
            name: "dot",
            amount: 4,
            displayRate: 1,
            size: 6
        },
        vehicleVariables: {
            maxSpeed: 5,
            maxForce: 10,
            desiredSeparation: 10,
            friction: 0.9
        },
        graph: fetchJSON("fri-sep-29-2017-011755")
    });
    firstInk2.addFlock({
        type: "static",
        color: [255, 0, 0],
        graph: fetchJSON("fri-sep-29-2017-011938")
    });
    firstInk2.addFlock({
        type: "static",
        color: [255, 255, 0],
        graph: [{ x: 650, y: 360 }]
    });
    firstInk2.addFlock({
        type: "atom",
        color: [0, 0, 255],
        graphLength: 1,
        equation: function(t, i) {
            var r = 400;
            t = t + i;
            var x = sketch.width / 2 + Math.cos(t / 10) * r;
            var y = sketch.height / 2 + Math.sin(t / 10) * r;
            return (new p5.Vector(x, y));
        }
    });
    firstInk2.flocks[0].addAttractors(firstInk2.flocks[3], 0.05);
    firstInk2.flocks[0].addRepellers(firstInk2.flocks[0], 0.5, 30);
    firstInk2.flocks[0].addRepellers(firstInk2.flocks[1], 0.5, 10);


    //-------------Day-Two-----------------------------------------------------------//


    var dayTwo = new System({
        rate: 0,
        name: "day-two",
        background: true,
        onlyGeo: false
    });
    dayTwo.addFlock({
        name: "center",
        type: "vehicles",
        dots: {
            name: "dot",
            amount: 4,
            displayRate: 1,
            size: 6
        },
        vehicleVariables: {
            maxSpeed: 50,
            maxForce: 50,
            desiredSeparation: 10,
            friction: 0.999
        },
        color: [255, 255, 0],
        graph: fetchJSON("mon-oct-02-2017-034048")
    });
    dayTwo.addFlock({
        name: "lines-sides",
        type: "vehicles",
        dots: {
            name: "dot",
            amount: 4,
            displayRate: 1,
            size: 6
        },
        vehicleVariables: {
            maxSpeed: 2,
            maxForce: 10,
            desiredSeparation: 10,
            friction: 0.9
        },
        color: [0, 255, 0],
        graph: fetchJSON("mon-oct-02-2017-034109")
    });
    dayTwo.addFlock({
        name: "ink-repellers",
        type: "static",
        color: [255, 0, 0],
        graph: fetchJSON("mon-oct-02-2017-034016")
    });
    dayTwo.addFlock({
        name: "line-center",
        type: "static",
        color: [0, 255, 255],
        graph: fetchJSON("mon-oct-02-2017-034141")
    });
    dayTwo.flocks[1].addAttractors(dayTwo.flocks[0], 0.005);
    dayTwo.flocks[1].addRepellers(dayTwo.flocks[1], 1, 20);
    dayTwo.flocks[1].addRepellers(dayTwo.flocks[2], 1, 5);
    dayTwo.flocks[0].addRepellers(dayTwo.flocks[1], 1, 40);
    dayTwo.flocks[0].addRepellers(dayTwo.flocks[0], 1, 40);
    dayTwo.flocks[0].addRepellers(dayTwo.flocks[3], 1, 40);
    dayTwo.flocks[0].addRepellers(dayTwo.flocks[2], 1, 40);

    //-------------Day-Two-B----------------------------------------------------------//


    var dayTwoB = new System({
        rate: 0,
        name: "day-two",
        background: true,
        onlyGeo: false
    });
    dayTwoB.addFlock({
        name: "center",
        type: "vehicles",
        dots: {
            name: "dot",
            amount: 4,
            displayRate: 1,
            size: 6
        },
        vehicleVariables: {
            maxSpeed: 50,
            maxForce: 50,
            desiredSeparation: 10,
            friction: 0.999
        },
        color: [255, 255, 0],
        graph: fetchJSON("mon-oct-02-2017-034048")
    });
    dayTwoB.addFlock({
        name: "lines-sides",
        type: "vehicles",
        vehicleVariables: {
            maxSpeed: 2,
            maxForce: 10,
            desiredSeparation: 10,
            friction: 0.9
        },
        color: [0, 255, 0],
        graph: fetchJSON("mon-oct-02-2017-034109")
    });
    dayTwoB.addFlock({
        name: "ink-repellers",
        type: "static",
        color: [255, 0, 0],
        graph: fetchJSON("mon-oct-02-2017-034016")
    });
    dayTwoB.addFlock({
        name: "line-center",
        type: "static",
        color: [0, 255, 255],
        graph: fetchJSON("mon-oct-02-2017-034141")
    });
    dayTwoB.addFlock({
        name: "center",
        type: "vehicles",
        dots: {
            name: "dot",
            amount: 4,
            displayRate: 1,
            size: 6
        },
        vehicleVariables: {
            maxSpeed: 50,
            maxForce: 50,
            desiredSeparation: 10,
            friction: 0.999
        },
        color: [255, 255, 0],
        graph: fetchJSON("mon-oct-02-2017-043020")
    });
    // dayTwoB.flocks[1].addAttractors(dayTwoB.flocks[0], 0.005);
    // dayTwoB.flocks[1].addRepellers(dayTwoB.flocks[1], 1, 20);
    // dayTwoB.flocks[1].addRepellers(dayTwoB.flocks[2], 1, 5);
    // dayTwoB.flocks[0].addRepellers(dayTwoB.flocks[1], 1, 40);
    dayTwoB.flocks[0].addRepellers(dayTwoB.flocks[0], 1, 40);
    dayTwoB.flocks[0].addRepellers(dayTwoB.flocks[3], 1, 40);
    dayTwoB.flocks[0].addRepellers(dayTwoB.flocks[2], 1, 40);
    dayTwoB.flocks[0].addRepellers(dayTwoB.flocks[4], 1, 40);

    dayTwoB.flocks[4].addRepellers(dayTwoB.flocks[4], 1, 40);
    dayTwoB.flocks[4].addRepellers(dayTwoB.flocks[3], 1, 40);
    dayTwoB.flocks[4].addRepellers(dayTwoB.flocks[2], 1, 40);
    dayTwoB.flocks[4].addRepellers(dayTwoB.flocks[0], 1, 40);

    return dayTwoB;
}