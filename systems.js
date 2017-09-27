function loadSystems() {
    var System = function() {
        this.flocks = [];
    };

    var firstSystem = new System();

    firstSystem.flocks[0] = {
        color: [0, 255, 0],
        behaviours: "???",
        graph: fetchJSON("wed-sep-27-2017-014236")
    };
    firstSystem.flocks[1] = {
        color: [255, 0, 0],
        behaviours: "???",
        graph: fetchJSON("wed-sep-27-2017-014506")
    };

    return firstSystem;
}