var ADSRCanvas = function(element, max) {
  this.height = element.height;
  // each param gets 1/4th the width of the window
  this.width = element.width / 4;
  this.ctx = element.getContext("2d");
  var font_size = Math.round(this.height * 0.6);
  this.ctx.font = font_size + 'px arial';
  this.max = max;
};

ADSRCanvas.prototype.set_values = function (a,d,s,r) {
  var ctx = this.ctx;
  ctx.beginPath();
  
  var offset = 0;

  // attack goes to top, start from bottom of canvas
  ctx.moveTo(0, this.height);
  var atx = (a / this.max) * this.width;
  ctx.lineTo(atx, 0);
  offset += atx;
  
  // decay is the time to reach sustain level
  var susy = this.height - (s / this.max) * this.height;
  var dx = (d / this.max) * this.width;
  ctx.lineTo(offset + dx, susy);
  offset += dx;
  
  // draw the sustain line
  ctx.lineTo(offset + this.width, susy);
  offset += this.width;
  
  // release
  var rx = (r / this.max) * this.width;
  ctx.lineTo(offset + rx, this.height);
  
  // draw it
  ctx.stroke();
  ctx.strokeText('oh shit', 2, this.height-2);
};