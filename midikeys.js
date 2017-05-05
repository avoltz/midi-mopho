/* add the key controller to an element */
function enable_keyboard(el, layout_name, out) {
  /*
    keyboard layout objects:
    
    'octave' array which 'starts' at c3 (midi note 60) going chromatic up the piano
    oup/odown : shift octave up/down by 1
    vup20/vdown20 : shift velocity up/down by 20
    
  */
  var midi_key_layouts = {
    'dvorak' : {
      'octave' : [65, 188, 79, 190, 69, 85, 89, 73, 70, 68, 71, 72, 84, 82, 78],
      'odown' : 186,
      'oup' : 81,
      'vup20' : 74,
      'vdown20' : 75
    },
    'us' : {
      'octave' : [65, 87, 83, 69, 68, 70, 84, 71, 89, 72, 85, 74, 75, 79, 76],
      'odown' : 90,
      'oup' : 88,
      'vup20' : 67,
      'vdown20' : 86 
    }
  };
  
  if (typeof out === 'undefined') {
    console.log('no midi output, could not initialize controller');
    return;
  }
  
  if (!(layout_name in midi_key_layouts)) {
    console.log("layout '" + layout_name + "' not found, defaulting to us/qwerty");
    layout_name = "us";
  }
  // get the current layout object
  var layout = midi_key_layouts[layout_name];
  
  // midi messages for notes [on/off, note (base + index), velocity]
  // set to max velocity initially
  var velocity = 0x7f;
  // octave base / midi note, starts at 60 (c3) (add index of key in octave array)
  var octave_base = 60;
  
  // when a note is pressed, ignore subsequent down events for holding...
  var down_keys = {};

  var keydown = function(e) {
    var key = e.which;
    // ignore repeats, so stash the played key in a hash
    if (key in down_keys) return;
    var noteIndex = layout.octave.indexOf(key);
    if (noteIndex != -1) {
      // a note was played
      down_keys[key] = 1;
      // send the note on message at current velocity
      send_note_on(out, octave_base+noteIndex, velocity);
    }
  };
  
  var keyup = function(e) {
    var key = e.which;
    var noteIndex = layout.octave.indexOf(key);
    if (noteIndex != -1) {
      // a note was released
      delete down_keys[key];
      // send the note off message at current velocity
      send_note_off(out, octave_base+noteIndex, velocity);
    } else {
      switch (key) {
        case layout['odown']:
          octave_base = octave_base < 12 ? 0 : octave_base - 12;
          break;
        case layout['oup']:
          octave_base = octave_base > 115 ? 127 : octave_base + 12;
          break;
        case layout['vup20']:
          velocity = velocity > 107 ? 127 : velocity + 20;
          break;
        case layout['vdown20']:
          velocity = velocity < 20 ? 0 : velocity - 20;
          break;
        default:
      }
    }
  };
  
  el.onkeydown = keydown;
  el.onkeyup = keyup;
}