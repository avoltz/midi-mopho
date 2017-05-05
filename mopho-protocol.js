var _mophoprotocol = {
  'ccs' : [
    { 'name' : 'Osc 1 Freq', 'cc' : 20, 'max' : 120, 'pn' : 1 },
    { 'name' : 'Osc 1 Fine', 'cc' : 21, 'max' : 100, 'pn' : 2 },
    { 'name' : 'Osc 1 Shape', 'cc' : 22, 'max' : 103, 'pn' : 3 },
    { 'name' : 'Osc 1 Glide', 'cc' : 23, 'max' : 127, 'pn' : 4 },
    
    { 'name' : 'Osc 2 Freq', 'cc' : 24, 'max' : 120 },
    { 'name' : 'Osc 2 Fine', 'cc' : 25, 'max' : 100 },
    { 'name' : 'Osc 2 Shape', 'cc' : 26, 'max' : 103 },
    { 'name' : 'Osc 2 Glide', 'cc' : 27, 'max' : 127 },
    
    { 'name' : 'Osc Mix', 'cc' : 28, 'max' : 127 },
    { 'name' : 'Noise Level' , 'cc' : 29, 'max' : 127 },
    { 'name' : 'Sub Osc 1', 'cc' : 30, 'max' : 127 },
    { 'name' : 'Sub Osc 2', 'cc' : 31, 'max' : 127 },

    { 'name' : 'Filter Freq', 'cc' : 102 },
    { 'name' : 'Resonance', 'cc' : 103 },
    { 'name' : 'Filter Key Amt', 'cc' : 104 },
    { 'name' : 'Filter Audio Mod', 'cc' : 105 },
    { 'name' : 'Filter Env Amt', 'cc' : 106 },
    { 'name' : 'Filter Env Vel Amt', 'cc' : 107 },
    { 'name' : 'Filter Delay', 'cc' : 108 },
    { 'name' : 'Filter Attack', 'cc' : 109 },
    { 'name' : 'Filter Decay', 'cc' : 110 },
    { 'name' : 'Filter Sustain', 'cc' : 111 },
    { 'name' : 'Filter Release', 'cc' : 112 },

    { 'name' : 'VCA Level', 'cc' : 113 },
    { 'name' : 'Amp Env Amt', 'cc' : 115 },
    { 'name' : 'Amp Velocity Amt', 'cc' : 116 },
    { 'name' : 'Amp Delay', 'cc' : 117 },
    { 'name' : 'Amp Attack', 'cc' : 118 },
    { 'name' : 'Amp Decay', 'cc' : 119 },
    { 'name' : 'Amp Sustain', 'cc' : 75 },
    { 'name' : 'Amp Release', 'cc' : 76 },

    { 'name' : 'Env 3 Destination', 'cc' : 85 },
    { 'name' : 'Env 3 Amt', 'cc' : 86 },
    { 'name' : 'Env 3 Velocity Amt', 'cc' : 87 },
    { 'name' : 'Env 3 Delay', 'cc' : 88 },
    { 'name' : 'Env 3 Attack', 'cc' : 89 },
    { 'name' : 'Env 3 Decay', 'cc' : 90 },
    { 'name' : 'Env 3 Sustain', 'cc' : 77 },
    { 'name' : 'Env 3 Release', 'cc' : 78 },

    { 'name' : 'BPM', 'cc' : 14 },
    { 'name' : 'Clock Divide', 'cc' : 15 }
    ]
};

var __destinations = [
  "Off",
  "Osc 1 Freq",
  "Osc 2 Freq",
  "Osc 1 & 2 Freq",
  "Osc Mix",
  "Noise Level",
  "Osc 1 Pulse Width",
  "Osc 2 Pulse Width",
  "Osc 1 & 2 Pulse Width",
  "Filter Frequency",
  "Resonance",
  "Filter Audio Mod Amt",
  "VCA Level",
  "Pan Spread",
  "LFO 1 Freq",
  "LFO 2 Freq",
  "LFO 3 Freq",
  "LFO 4 Freq",
  "All LFO Freq",
  "LFO 1 Amt",
  "LFO 2 Amt",
  "LFO 3 Amt",
  "LFO 4 Amt",
  "All LFO Amt",
  "Filter Env Amt",
  "Amp Env Amt",
  "Env 3 Amt",
  "All Env Amounts",
  "Env 1 Attack",
  "Env 2 Attack",
  "Env 3 Attack",
  "All Env Attacks",
  "Env 1 Decay",
  "Env 2 Decay",
  "Env 3 Decay",
  "All Env Decays",
  "Env 1 Release",
  "Env 2 Release",
  "Env 3 Release",
  "All Env Releases",
  "Mod 1 Amt",
  "Mod 2 Amt",
  "Mod 3 Amt",
  "Mod 4 Amt",
  "Ext Audio In Level",
  "Sub Osc 1 Level",
  "Sub Osc 2 Level"
  ];

function setup_rxhandlers(inn) {
  var params = Array(0);
  /* 
  stash references to the input elements for each param so we can update its value
  when we get a program data dump 
  */
  var els = document.getElementsByClassName("param");
  for (var i = 0; i < els.length; i++) {
    var pn = els[i].dataset.pn;
    if (pn !== 'undefined') {
      params[pn] = els[i];
    }
  }
  inn.onmidimessage = function(e) {
    console.log('rx: ' + event.data.length + ' bytes');
  };
}

function setup_handlers(out) {
  /* a common change handler that sends midi messages based on element type & attrs */
  var changeCc = function(el) {
    var src = el.target;
    var value = src.value;
    if (src.type == 'checkbox') {
      value = src.checked ? 1 : 0;
    } else if (src.type == 'select') {
      value = src.options[src.selectedIndex].value;
    }
    if (typeof src.dataset.cc !== 'undefined') {
      send_cc_value(out, src.dataset.cc, value);
    } else if (typeof src.dataset.nrpn !== 'undefined') {
      console.log('setting ' + src.dataset.nrpn);
      send_nrpn_value(out, src.dataset.nrpn, value);
    }
    console.log('set ' + src.name + ' to ' + value);
  };
  
  var changeShape = function(el) {
    
  }
  
  /* add the destinations to affected params */
  var els = document.getElementsByClassName("dest");
  for (var i = 0; i < els.length; i++) {
    for (var j = 0; j < __destinations.length; j++) {
      var newOp = document.createElement("option");
      newOp.text = __destinations[j];
      newOp.value = j;
      els[i].appendChild(newOp);
    }
  }
  
  /* grab all the param elements and set the change event */
  els = document.getElementsByClassName("param");
  for (i = 0; i < els.length; i++) {
    if (!(typeof els[i].dataset.nrpn === 'undefined' && typeof els[i].dataset.cc === 'undefined')) {
      els[i].onchange = changeCc;
      els[i].title = els[i].value;
    }
  }
}