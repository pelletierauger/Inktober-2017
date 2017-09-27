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
            size: 30
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

    return firstSystem;
}