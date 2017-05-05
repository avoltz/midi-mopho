// a knob should have data-max, data-min, data-offset for turnability
var Knob = function(element) {
  this.element = element;
  // 15 degree min and 345 degree max, appearance wise
  var max = element.dataset.max;
  var min = element.dataset.min;
  if (!max || !min) {
    console.warn('unable to init knob, no max/min set!');
    return;
  }
  // offset is the angle when value is 0
  // max/min are used to divide the angle for turning knob
  // 330 because thats the range between 15deg and 345deg
  if (max - min > 330) {
    console.warn('resolution for knob is too high for 360 degree angle. limiting max');
    max = min + 330;
  }
  this.res = 330 / (max - min);
  this.max = max;
  this.min = min;
  this.set_value(element.dataset.val);
  
  var top = element.offsetTop;
  var bottom = top + element.offsetHeight;
  var radius = (bottom - top) / 2;
  element.onclick = function(e) {
    console.log("radius: " + radius);
  };
  // event handlers
  element.onmousedown = function(e) {
    console.log("mousedown " + element.x + ' ' + element.y);
  };
  element.onmouseup = function(e) {
    console.log("mouseup " + element.x + ' ' + element.y);
  };
  document.onmousemove = function(e) {
    //console.log("mousemove");
  };
};

Knob.initialize = function() {
  var knobs = document.getElementsByClassName("knob");
  for (var i = 0; i < knobs.length; i++) {
    var el = knobs[i];
    var inner = document.createElement("div");
    var dot = document.createElement("div");
    inner.appendChild(dot);
    // clear out any contents
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(inner);
  }
};

Knob.prototype.get_rotation = function(v) {
  // 15 degree minimum location
  return "rotate(" + (Math.round((v-this.min)*this.res)+15) + "deg)";
};

Knob.prototype.set_value = function(v) {
  var r = this.get_rotation(v);
  console.log('setting value: ' + v + '/' + this.max + ', rotation: ' + r);
  this.element.style.transform = r;
};