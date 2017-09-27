var System = function() {
    this.flocks = [];
};

var firstSystem = new System();

firstSystem.flocks[0] = {
    color: [0, 255, 0],
    behaviours: "???",
    graph: [
        [40, 50],
        [140, 150],
        [240, 250],
        [340, 350],
        [440, 450]
    ]
};

let system = firstSystem;