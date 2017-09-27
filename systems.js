function loadSystems() {

    var firstSystem = new System();

    firstSystem.addFlock({
        type: "vehicles",
        vehicleVariables: {
            maxSpeed: 150,
            maxForce: 10,
            desiredSeparation: 150
        },
        color: [0, 255, 0],
        behaviour: function(that) {
            for (let i = 0; i < this.graph.length; i++) {
                this.graph[i].x += Math.random() - 0.5;
                this.graph[i].y += Math.random() - 0.5;
            }
        },
        graph: fetchJSON("wed-sep-27-2017-014236")
    });
    firstSystem.addFlock({
        color: [255, 0, 0],
        behaviour: function() {},
        graph: fetchJSON("wed-sep-27-2017-014506")
    });
    firstSystem.flocks[0].addRepellers(firstSystem.flocks[1], 0.05);

    return firstSystem;
}