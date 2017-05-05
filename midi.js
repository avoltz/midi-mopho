function msb(n) {
  return (n >>> 7) & 0x7f;
}

function lsb(n) {
  return n & 0x7f;
}

function send_note_on(out, note, velocity) {
  out.send([0x90, note, velocity]);
}

function send_note_off(out, note, velocity) {
  out.send([0x80, note, velocity]);
}

function send_cc_value(out, cc, value) {
  out.send([0xb0, cc, value]);
}

function send_nrpn_increment(out, num) {
  out.send([0xb0,
    0x63, msb(num),
    0x62, lsb(num),
    0x60, 0x00
    ]);
}

function send_nrpn_decrement(out, num) {
    out.send([0xb0,
    0x63, msb(num),
    0x62, lsb(num),
    0x61, 0x00 
    ]);
}

function send_nrpn_value(out, num, val) {
  out.send([0xb0, 0x63, msb(num),
    0xb0, 0x62, lsb(num),
    0xb0, 0x06, msb(val),
    0xb0, 0x26, lsb(val)
    ]);
}

function send_nrpn_reset(out, num) {
  out.send([0xb0,
    0x63, msb(num),
    0x62, lsb(num),
    0x23, 0x7f,
    0x24, 0x7f
    ]);
}
