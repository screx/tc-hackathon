var SerialPort = require('serialport');
var port = new SerialPort('/dev/cu.usbmodem1441');

port.write('1', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});
 
// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

// a is rainbow strobe
// b is red
// c is green
// d is blue
// e is yellow