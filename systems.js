function loadSystems() {
    var System = function() {
        this.flocks = [];
        this.applyBehaviours = function() {
            for (let i = 0; i < this.flocks.length; i++) {


                this.flocks[i].behaviour(this);
            }
        };
    };

    var firstSystem = new System();

    firstSystem.flocks[0] = {
        color: [0, 255, 0],
        behaviour: function(that) {
            for (let i = 0; i < this.graph.length; i++) {
                this.graph[i].x += Math.random() - 0.5;
                this.graph[i].y += Math.random() - 0.5;
            }
        },
        graph: fetchJSON("wed-sep-27-2017-014236")
    };
    firstSystem.flocks[1] = {
        color: [255, 0, 0],
        behaviour: function() {},
        graph: fetchJSON("wed-sep-27-2017-014506")
    };

    return firstSystem;
}