// currently let's just support nrpn, 
// not all params are available as CC anyways, like 'o1 kb'


// use this controller
var MophoControl = function(root) {
  // { nrpn : { value : n, name : name, max : max } }
  this.named_params = [
    { 'name' : 'Osc 1 Freq', 'cc' : 20, 'nrpn' : 0, 'max' : 120, 'n' : 0 },
    { 'name' : 'Osc 1 Fine', 'cc' : 21, 'nrpn' : 1, 'max' : 120, 'n' : 1 },
    { 'name' : 'Osc 1 Shape', 'cc' : 22, 'nrpn' : 2, 'max' : 103, 'n' : 2 },
    { 'name' : 'Osc 1 Glide', 'cc' : 23, 'nrpn' : 3, 'max' : 127, 'n' : 3 },
    { 'name' : 'Osc 1 Kb', 'nrpn' : 4, 'max' : 1, 'n' : 4 },
    { 'name' : 'Sub Osc 1', 'cc' : 30, 'nrpn' : 114, 'max' : 127, 'n' : 5 },
    
    { 'name' : 'Osc 2 Freq', 'cc' : 24, 'nrpn' : 5, 'max' : 120, 'n' : 6 },
    { 'name' : 'Osc 2 Fine', 'cc' : 25, 'nrpn' : 6, 'max' : 100, 'n' : 7 },
    { 'name' : 'Osc 2 Shape', 'cc' : 26, 'nrpn' : 7, 'max' : 103, 'n' : 8 },
    { 'name' : 'Osc 2 Glide', 'cc' : 27, 'nrpn' : 8, 'max' : 127, 'n' : 9 },
    { 'name' : 'Osc 2 Kb', 'nrpn' : 9, 'max' : 1, 'n' : 10},
    { 'name' : 'Sub Osc 2', 'cc' : 31, 'nrpn' : 115, 'max' : 127, 'n' : 11},
    
    { 'name' : 'Sync', 'nrpn' : 10, 'max' : 1, 'n' : 12 },
    { 'name' : 'Glide Mode', 'nrpn' : 11, 'max' : 3, 'n' : 13 },
    { 'name' : 'Slop', 'nrpn' : 12, 'max' : 5, 'n' : 14 },
    { 'name' : 'Bend Range', 'nrpn' : 93, 'max' : 12, 'n' : 15 },
    { 'name' : 'Key Assign Mode', 'nrpn' : 96, 'max' : 5, 'n' : 16 },
    
    { 'name' : 'Osc Mix', 'cc' : 28, 'nrpn' : 13, 'max' : 127, 'n' : 17 },
    { 'name' : 'Noise Level' , 'cc' : 29, 'nrpn' : 14, 'max' : 127, 'n' : 18 },
    { 'name' : 'Ext In Level',  'nrpn' : 116, 'max' : 127, 'n' : 19 },

    { 'name' : 'Filter Freq', 'cc' : 102, 'nrpn' : 15, 'max' : 164, 'n' : 20 },
    { 'name' : 'Resonance', 'cc' : 103, 'nrpn' : 16, 'max' : 127, 'n' : 21 },
    { 'name' : 'Filter Key Amt', 'cc' : 104, 'nrpn' : 17, 'max' : 127, 'n' : 22 },
    { 'name' : 'Filter Audio Mod', 'cc' : 105, 'nrpn' : 18, 'max' : 127, 'n' : 23 },
    { 'name' : 'Filter Poles', 'nrpn' : 19, 'max' : 1, 'n' : 24 },
    { 'name' : 'Filter Env Amt', 'cc' : 106, 'nrpn' : 20, 'max' : 254, 'n' : 25 },
    { 'name' : 'Filter Env Vel Amt', 'cc' : 107, 'nrpn' : 21, 'max' : 127, 'n' : 26 },
    { 'name' : 'Filter Delay', 'cc' : 108, 'nrpn' : 22, 'max' : 127, 'n' : 27 },
    { 'name' : 'Filter Attack', 'cc' : 109, 'nrpn' : 23, 'max' : 127, 'n' : 28 },
    { 'name' : 'Filter Decay', 'cc' : 110, 'nrpn' : 24, 'max' : 127, 'n' : 29 },
    { 'name' : 'Filter Sustain', 'cc' : 111, 'nrpn' : 25, 'max' : 127, 'n' : 30 },
    { 'name' : 'Filter Release', 'cc' : 112, 'nrpn' : 26, 'max' : 127, 'n' : 31 },

    { 'name' : 'VCA Level', 'cc' : 113, 'nrpn' : 27, 'max' : 127, 'n' : 32 },
    { 'name' : 'Amp Env Amt', 'cc' : 115, 'nrpn' : 30, 'max' : 127, 'n' : 33 },
    { 'name' : 'Amp Velocity Amt', 'cc' : 116, 'nrpn' : 31, 'max' : 127, 'n' : 34 },
    { 'name' : 'Amp Delay', 'cc' : 117, 'nrpn' : 32, 'max' : 127, 'n' : 35 },
    { 'name' : 'Amp Attack', 'cc' : 118, 'nrpn' : 33, 'max' : 127, 'n' : 36 },
    { 'name' : 'Amp Decay', 'cc' : 119, 'nrpn' : 34, 'max' : 127, 'n' : 37 },
    { 'name' : 'Amp Sustain', 'cc' : 75, 'nrpn' : 35, 'max' : 127, 'n' : 38 },
    { 'name' : 'Amp Release', 'cc' : 76, 'nrpn' : 36, 'max' : 127, 'n' : 39 },
    { 'name' : 'Voice Volume', 'nrpn' : 29, 'max' : 127, 'n' : 40 },
    
    { 'name' : 'LFO 1 Freq', 'nrpn' : 37, 'max' : 166, 'n' : 41 },
    { 'name' : 'LFO 1 Shape', 'nrpn' : 38, 'max' : 4, 'n' : 42 },
    { 'name' : 'LFO 1 Amount', 'nrpn' : 39, 'max' : 127, 'n' : 43 },
    { 'name' : 'LFO 1 Dest', 'nrpn' : 40, 'max' : 46, 'n' : 44 },
    { 'name' : 'LFO 1 Key Sync', 'nrpn' : 41, 'max' : 1, 'n' : 45 },
    
    { 'name' : 'LFO 2 Freq', 'nrpn' : 42, 'max' : 166, 'n' : 46 },
    { 'name' : 'LFO 2 Shape', 'nrpn' : 43, 'max' : 4, 'n' : 47 },
    { 'name' : 'LFO 2 Amount', 'nrpn' : 44, 'max' : 127, 'n' : 48 },
    { 'name' : 'LFO 2 Dest', 'nrpn' : 45, 'max' : 46, 'n' : 49 },
    { 'name' : 'LFO 2 Key Sync', 'nrpn' : 46, 'max' : 1, 'n' : 50 },

    { 'name' : 'LFO 3 Freq', 'nrpn' : 47, 'max' : 166, 'n' : 51 },
    { 'name' : 'LFO 3 Shape', 'nrpn' : 48, 'max' : 4, 'n' : 52 },
    { 'name' : 'LFO 3 Amount', 'nrpn' : 49, 'max' : 127, 'n' : 53 },
    { 'name' : 'LFO 3 Dest', 'nrpn' : 50, 'max' : 46, 'n' : 54 },
    { 'name' : 'LFO 3 Key Sync', 'nrpn' : 51, 'max' : 1, 'n' : 55 },

    { 'name' : 'LFO 4 Freq', 'nrpn' : 52, 'max' : 166, 'n' : 56 },
    { 'name' : 'LFO 4 Shape', 'nrpn' : 53, 'max' : 4, 'n' : 57 },
    { 'name' : 'LFO 4 Amount', 'nrpn' : 54, 'max' : 127, 'n' : 58 },
    { 'name' : 'LFO 4 Dest', 'nrpn' : 55, 'max' : 46, 'n' : 59 },
    { 'name' : 'LFO 4 Key Sync', 'nrpn' : 56, 'max' : 1, 'n' : 60 },

    { 'name' : 'Env 3 Destination', 'cc' : 85, 'nrpn' : 57, 'max' : 46, 'n' : 61 },
    { 'name' : 'Env 3 Amount', 'cc' : 86, 'nrpn' : 58, 'max' : 254, 'n' : 62 },
    { 'name' : 'Env 3 Velocity Amt', 'cc' : 87, 'nrpn' : 59, 'max' : 127, 'n' : 63 },
    { 'name' : 'Env 3 Delay', 'cc' : 88, 'nrpn' : 60, 'max' : 127, 'n' : 64 },
    { 'name' : 'Env 3 Attack', 'cc' : 89, 'nrpn' : 61, 'max' : 127, 'n' : 65 },
    { 'name' : 'Env 3 Decay', 'cc' : 90, 'nrpn' : 62, 'max' : 127, 'n' : 66 },
    { 'name' : 'Env 3 Sustain', 'cc' : 77, 'nrpn' : 63, 'max' : 127, 'n' : 67 },
    { 'name' : 'Env 3 Release', 'cc' : 78, 'nrpn' : 64, 'max' : 127, 'n' : 68 },
    { 'name' : 'Env 3 Repeat', 'nrpn' : 98, 'max' : 1, 'n' : 69 },
    
    { 'name' : 'Mod 1 Src', 'nrpn' : 65, 'max' : 22, 'n' : 70 },
    { 'name' : 'Mod 1 Amount', 'nrpn' : 66, 'max' : 254, 'n' : 71 },
    { 'name' : 'Mod 1 Dest', 'nrpn' : 67, 'max' : 46, 'n' : 72 },
    
    { 'name' : 'Mod 2 Src', 'nrpn' : 68, 'max' : 22, 'n' : 73 },
    { 'name' : 'Mod 2 Amount', 'nrpn' : 69, 'max' : 254, 'n' : 74 },
    { 'name' : 'Mod 2 Dest', 'nrpn' : 70, 'max' : 46, 'n' : 75 },
    
    { 'name' : 'Mod 3 Src', 'nrpn' : 71, 'max' : 22, 'n' : 76 },
    { 'name' : 'Mod 3 Amount', 'nrpn' : 72, 'max' : 254, 'n' : 77 },
    { 'name' : 'Mod 3 Dest', 'nrpn' : 73, 'max' : 46, 'n' : 78 },
    
    { 'name' : 'Mod 4 Src', 'nrpn' : 74, 'max' : 22, 'n' : 79 },
    { 'name' : 'Mod 4 Amount', 'nrpn' : 75, 'max' : 254, 'n' : 80 },
    { 'name' : 'Mod 4 Dest', 'nrpn' : 76, 'max' : 46, 'n' : 81 },
    
    { 'name' : 'Mod Wheel Amount', 'nrpn' : 81, 'max' : 254, 'n' : 82 },
    { 'name' : 'Mod Wheel Dest', 'nrpn' : 82, 'max' : 46, 'n' : 83 },
    
    { 'name' : 'Pressure Amount', 'nrpn' : 83, 'max' : 254, 'n' : 84 },
    { 'name' : 'Pressure Dest', 'nrpn' : 84, 'max' : 46, 'n' : 85 },
    
    { 'name' : 'Breath Amount', 'nrpn' : 85, 'max' : 254, 'n' : 86 },
    { 'name' : 'Breath Dest', 'nrpn' : 86, 'max' : 46, 'n' : 87 },
    
    { 'name' : 'Velocity Amount', 'nrpn' : 87, 'max' : 254, 'n' : 88 },
    { 'name' : 'Velocity Dest', 'nrpn' : 88, 'max' : 46, 'n' : 89 },
    
    { 'name' : 'Foot Control Amount', 'nrpn' : 89, 'max' : 254, 'n' : 90 },
    { 'name' : 'Foot Control Dest', 'nrpn' : 90, 'max' : 46, 'n' : 91 },
    
    { 'name' : 'Push It Note', 'nrpn' : 111, 'max' : 120, 'n' : 92 },
    { 'name' : 'Push It Velocity', 'nrpn' : 112, 'max' : 127, 'n' : 93 },
    { 'name' : 'Push It Mode', 'nrpn' : 113, 'max' : 2, 'n' : 94 },

    { 'name' : 'BPM', 'cc' : 14, 'nrpn' : 91, 'min' : 30, 'max' : 250, 'n' : 95 },
    { 'name' : 'Clock Divide', 'cc' : 15, 'nrpn' : 92, 'max' : 12, 'n' : 96 },
    
    { 'name' : 'Arp Mode', 'nrpn' : 97, 'max' : 3, 'n' : 97 },
    { 'name' : 'Arp On/Off', 'nrpn' : 100, 'max' : 1, 'n' : 98 },
    { 'name' : 'Seq Trigger', 'nrpn' : 94, 'max' : 5, 'n' : 99 },
    { 'name' : 'Gated Seq', 'nrpn' : 101, 'max' : 1, 'n' : 100 },
    
    { 'name' : 'Seq 1 Dest', 'nrpn' : 77, 'max' : 46, 'n' : 101 },
    { 'name' : 'Seq 2 Dest', 'nrpn' : 78, 'max' : 46, 'n' : 102 },
    { 'name' : 'Seq 3 Dest', 'nrpn' : 79, 'max' : 46, 'n' : 103 },
    { 'name' : 'Seq 4 Dest', 'nrpn' : 80, 'max' : 46, 'n' : 104 },

    { 'name' : 'Param 1', 'nrpn' : 105, 'max' : 183, 'n' : 105 },
    { 'name' : 'Param 2', 'nrpn' : 106, 'max' : 183, 'n' : 106 },
    { 'name' : 'Param 3', 'nrpn' : 107, 'max' : 183, 'n' : 107 },
    { 'name' : 'Param 4', 'nrpn' : 108, 'max' : 183, 'n' : 108 }
  ];
  
  // make an index for quick processing of data dumps...
  this.param_index = {};
  for (var p = 0; p < this.named_params.length; p++) {
    if (this.named_params[p].n >= 0) {
      this.param_index[p] = this.named_params[p];
    }
  }
  
  // sequencer params start at n=120, nrpn = 120
  this.sequencer_start = 120;
  // name in ascii starts at 184, up to 15 chars long
  this.name_start = 184;
  this.name_max = 199;
  
  // changed params go in here so the view knows to render them
  this.dirty = [];
  
  // midi i/o
  this.inn = undefined;
  this.out = undefined;
};

MophoControl.prototype.set_input = function(i) {
  this.inn = i;
};

MophoControl.prototype.set_output = function(o) {
  this.out = o;
};

MophoControl.prototype.set_param = function(nrpn, v) {
  // only set valid nrpn and value
  var p = this.params[nrpn];
  if (p !== undefined) {
    var max = (p.max !== undefined) ? p.max : 127;
    if (v < 0 || v > max) {
      console.warn('MophoControl: set_param got value out of range for nrpn: ' + nrpn);
      return false;
    }
  } else {
    console.warn('MophoControl: set_param got invalid nrpn');
    return false;
  }
  p.value = v;
  this.dirty.push(p);
  return true;
};

MophoControl.prototype.get_param = function(nrpn) {
  var p = this.params[nrpn];
  if (p !== undefined) {
    return p.value;
  }
  console.warn('MophoControl: get_param got invalid nrpn');
  return undefined;
};

MophoControl.prototype.handle_program_data = function(data) {
  // 256 bytes which expands out to 293 (packed bit)
};

