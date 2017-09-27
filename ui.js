//The user-interface will work this way :
//You create an interface with createInterface()
//It creates a timeline with adjustable width.
//It also creates a div called "panels"
//Inside the panels div, you can create many collapsible panels, with "createPanel() function".
//Then, when you create sliders, you can pass to your slider constructor a reference to which
//panel you want to associate your slider.

var interface;

//I have a sliders array and a global object called "sliders" to which I can add sliders as needed
// with this code: sliders.zoom = new Slider("Canvas scale", 0, 20, 1, 0.01);
//This was done this way so that all the sliders values can be accessed easily (in the global namespace)
//yet they are still sorted (they are contained inside the sliders objects, not just all freely named).
//In the following code, this is made very clear :
//this.localValues.zoom = sliders.zoom.value;


//slidersArray doesn't seem to be doing anything. Needs more investigating.
// var slidersArray = [];
var sliders = {};

Slider = function(name, min, max, start, step, parent) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.start = start;
    this.value = start;
    this.step = step;

    this.paragraph = sketch.createP(this.name + " : " + this.start);
    this.paragraph.parent(parent);
    this.paragraph.style("line-height", "0.5em");
    this.paragraph.style("margin-bottom", "0.5em");

    this.slider = sketch.createSlider(min, max, start, step);
    this.slider.parent(parent);
    this.slider.style('width', '100%');
    this.slider.style('margin-top', '-15px');
    this.slider.style('opacity', '0.55');
    // this.slider.style('margin-bottom', '-25px');

    var that = this;
    this.slider.input(function() {
        that.value = that.slider.value();
        that.connection = that.value;
        that.paragraph.html(that.name + " : " + that.value);
    });
    // slidersArray.push(this);
}

Slider.prototype.set = function(val) {
    this.slider.value(val);
    this.value = val;
    this.paragraph.html(this.name + " : " + this.value);
};

var folders = {};

Folder = function(name, open) {
    this.name = name;
    this.open = open;
    this.container = sketch.createDiv('');
    this.container.parent(interface);
    this.container.style("border", "solid 1px rgba(195, 195, 195, 0.25)");
    this.container.style("margin-bottom", "0.25em");

    this.titleDiv = sketch.createDiv(name);
    this.titleDiv.parent(this.container);
    this.titleDiv.style('background-color', 'rgba(195, 195, 195, 0.25)');
    this.titleDiv.style("color", 'rgba(255, 255, 255, 0.55');
    this.titleDiv.style("padding", "0.25em 0.5em");
    this.div = sketch.createDiv('');
    this.div.parent(this.container);
    this.div.style("padding", "0em 0.75em 0.5em 0.65em");

    var that = this;
    this.titleDiv.mouseClicked(function() {
        that.toggleHide();
    });
    if (this.open === true) {
        this.div.style("display", "block");
    } else {
        this.div.style("display", "none");
    }
};

Folder.prototype.toggleHide = function() {
    if (this.open === true) {
        this.open = false
        this.div.style("display", "none");
    } else {
        this.open = true;
        this.div.style("display", "block");
    }
};

var buttons = {};

Button = function(name, parent, func) {
    this.button = sketch.createButton(name);
    this.button.parent(parent);
    this.button.style("margin", "1em 0 0em 0");
    this.button.style('opacity', '0.55');
    if (func) {
        this.button.mousePressed(func);
    }
};

var menus = {};

Menu = function(name, parent) {
    this.div = sketch.createDiv('');
    this.div.parent(parent);
    this.nameDiv = sketch.createDiv(name + ' : ');
    this.nameDiv.parent(this.div);
    this.nameDiv.style('float', 'left');
    this.nameDiv.style('padding-right', '0.5em');
    this.containerDiv = sketch.createDiv('');
    this.containerDiv.parent(this.div);
    this.containerDiv.style('float', 'left');
    // this.containerDiv.style('margin-top', '-0.4em');

    this.menu = sketch.createSelect();
    this.menu.parent(this.containerDiv);
    this.menu.style('float', 'left');
    this.menu.style('opacity', '0.55');
    this.div.style("padding", "10px 0 15px 0");
};

function createInterface() {
    interface = sketch.createDiv('');
    interface.style('position', 'absolute');
    interface.style('z-index', '2');
    interface.style('width', '325px');
    interface.style('bottom', '0em');
    interface.style('padding', '5px 5px 0px 5px');
    interface.style('opacity', '1');
    interface.style('background-color', 'rgba(65, 65, 65, 0.5)');
    interface.style('font-family', 'Inconsolata', 'Helvetica', 'Arial');
    // interface.style('line-height', '0.75em');
    var calculateHeight = sketch.windowHeight - 50;
    interface.style("max-height", calculateHeight + "px");
    interface.style("overflow", "auto");
    interface.style('color', 'rgba(255, 255, 255, 0.5');
}

function configureInterface() {
    folders.test = new Folder("Joli test", false);
    folders.test2 = new Folder("Un autre test", false);
    folders.test3 = new Folder("Un autre test", false);
    sliders.s = new Slider("Dot size", 0, 40, 2.5, 0.1, folders.test.div);
    menus.tester = new Menu("Testing", folders.test.div);
    sliders.b = new Slider("Acceleration", 0, 40, 2.5, 0.1, folders.test.div);
    sliders.x = new Slider("Dot size", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.y = new Slider("Acceleration", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.xx = new Slider("Dot size", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.yy = new Slider("Acceleration", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.xxx = new Slider("Dot size", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.yyy = new Slider("Acceleration", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.xxxx = new Slider("Dot size", 0, 40, 2.5, 0.1, folders.test3.div);
    buttons.adjuster = new Button("Adjustments", folders.test3.div, function() {
        console.log("This is working!");
    });
    sliders.yyyy = new Slider("Acceleration", 0, 40, 2.5, 0.1, folders.test3.div);
    buttons.adjuster2 = new Button("Adjustments", folders.test3.div, function() {
        console.log("This is working!");
    });
    folders.cols = new Folder("Color adjustments", true);
    sliders.dark = new Slider("Dark", -100, 100, 0, 1, folders.cols.div);
    sliders.mid = new Slider("Mid", -100, 100, 0, 1, folders.cols.div);
    sliders.light = new Slider("Light", -100, 100, 0, 1, folders.cols.div);
    sliders.hue = new Slider("Hue", -360, 360, 0, 1, folders.cols.div);
    sliders.sat = new Slider("Saturation", -100, 100, 0, 1, folders.cols.div);
    sliders.brightness = new Slider("Brightness", -100, 100, 0, 1, folders.cols.div);
}