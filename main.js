var __logEl = null;

console.log = function(msg) {
  var newMsg = document.createElement("div");
  newMsg.appendChild(document.createTextNode(msg));
  // circular buffer
  if (__logEl.childNodes.length > 5) {
    __logEl.removeChild(__logEl.firstChild);
  }
  __logEl.appendChild(newMsg);
};

window.onload = function() {
  __logEl = document.getElementById("log");
  
  function listInputsAndOutputs( midiAccess ) {
    for (var entry of midiAccess.inputs) {
      var input = entry[1];
      console.log("Input port [type:'" + input.type + "'] id:'" + input.id +
        "' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
        "' version:'" + input.version + "'");
    }

    for (entry of midiAccess.outputs) {
      var output = entry[1];
      console.log("Output port [type:'" + output.type + "'] id:'" + output.id +
        "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
        "' version:'" + output.version + "'");
    }
  }

  function onMIDISuccess( midiAccess ) {
    listInputsAndOutputs(midiAccess);
    var out = midiAccess.outputs.get('65566A6A5DC53E4F2A4388C80443A9404F9622C4E3F5EBB54E21171A0C289CB4');
    var inn = midiAccess.inputs.get('A0ACE317BAC4FF33DF7EA72A1546231E5210338EF7C2A6CC0BCC813DAE7D97C2');
    enable_keyboard(document.body, 'dvorak', out);
    setup_handlers(out);
    setup_rxhandlers(inn);
  }

  function onMIDIFailure(msg) {
    console.log( "Failed to get MIDI access - " + msg );
  }

  navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );
  
  Knob.initialize();
  var e = document.getElementById("test1");
  var k = new Knob(e);
  e = document.getElementById("test2");
  var lia = new ADSRCanvas(e, 127);
  lia.set_values(50,100,100,10);
  e = document.getElementById("test3");
  var bb = new Button(e);
  bb.add_trigger(function(on) { console.log(on); });
};