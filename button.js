var Button = function(element) {
  this.on = false;
  this.el = element;
  this.triggers = Array(0);
  this.el.onclick = function(e) {
    if (this.on) {
      element.className = "button-on";
    } else {
      element.className = "button-off";
    }
    for (var i=0; i < this.triggers.length; i++) {
      this.triggers[i](this.on);
    }
    this.on = ! this.on;
  };
};

// func should be a function which takes a bool (on/off)
Button.prototype.add_trigger = function(func) {
  this.triggers.push(func);
};