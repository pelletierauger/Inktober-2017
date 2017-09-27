var System = function() {
    this.flocks = [];
    this.applyBehaviours = function() {
        for (let i = 0; i < this.flocks.length; i++) {
            this.flocks[i].behaviour(this);
        }
    };
};

function fetchJSON(name) {
    for (let i = 0; i < JSONs.length; i++) {
        if (JSONs[i].name == name) {
            console.log("Found a matching JSON name for " + name);
            return JSONs[i].graph;
        }
    }
    console.log("Did not find a matching JSON name for " + name);
    return null;
}