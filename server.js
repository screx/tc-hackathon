const tmi = require('tmi.js');
const haikudos = require('haikudos');
var SerialPort = require('serialport');
// change this to connies port path
var port = new SerialPort('/dev/cu.usbmodem1421');
//const io = require('socket.io-client');
//const socket = io.connect('wss://pubsub-edge.twitch.tv', 
//  { secure: true, reconnect: true, rejectUnauthorized: false });
//const fetch = require('node-fetch');
const {emoteArray, generateEmotes} = require('./utils/generateEmotes');
const {populateEmotes, populateOptions, parsePoll} = require('./utils/parse');

var currentPollArr = [];

/*

SHROUD's ID:  37402112

curl -H 'Accept: application/vnd.twitchtv.v5+json' \
-H 'Client-ID: soiv4rk6dw9sr1ih6o77xwu1qcl6kq' \
-X GET https://api.twitch.tv/kraken/users?login=shroud

//CLIENT ID:    soiv4rk6dw9sr1ih6o77xwu1qcl6kq

*/


// Valid commands start with:
let commandPrefix = '!';
// Define configuration options:
let opts = {
  identity: {
    username: 'stephaniekdoan',
    password: 'oauth:' + '2w3qicy2x09arj2lmtkwl180y4j8zg'
  },
  channels: [
    'stephaniekdoan'
    //'shroud'
  ]
}

// These are the commands the bot knows (defined below):
//let knownCommands = { echo, haiku }

// Create a client with our options:
let client = new tmi.client(opts)

// Register our event handlers (defined below):
client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)
client.on('disconnected', onDisconnectedHandler)

// Connect to Twitch:
client.connect()


// Helper function to send the correct type of message:
function sendMessage (target, context, message) {
  if (context['message-type'] === 'whisper') {
    client.whisper(target, message)
  } else {
    client.say(target, message)
  }
}

// Called every time a message comes in:
function onMessageHandler (target, context, msg, self) {
  if (self) { return } // Ignore messages from the bot

  //Handle streamer initiated poll
  if (context.username == 'stephaniekdoan' && msg.substring(0, 5)=='#poll') {
    //INSTANTIATES POLL OBJECT
    parsePoll(msg).then(function(parsedPoll){
      console.log('PARSED POLL:', parsedPoll);
      var voters = new Set();
      var newPoll = {
        question : parsedPoll.question,
        options : parsedPoll.options, 
        open : true,
        voters : voters
      }
      return newPoll;
    }).then(function(newPoll){
      currentPollArr.push(newPoll);
      console.log('NEW ARRAY:', currentPollArr[0]);
    })
  } else if (emoteArray.includes(msg) && !currentPollArr[0].voters.has(context.username)) {
    if (currentPollArr.length>0 && currentPollArr[0].open) { //poll is open
      var targetEmote = currentPollArr[0].options.find(op => op.emoteName==msg);
      if (targetEmote){
        targetEmote.emoteTally++;
        currentPollArr[0].voters.add(context.username);
      }
      console.log('TALLY UPDATED', currentPollArr[0]);
    }
  } else if (msg.includes('subscribe')) {
    port.write('a', function(err) {
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('SUBSCRIPTION');
    });
  }

  // This isn't a command since it has no prefix:
  if (msg.substr(0, 1) !== commandPrefix) {
    console.log(`[${target} (${context['message-type']})] ${context.username}: ${msg}`)
    return
  }
}

 
// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

// Called every time the bot connects to Twitch chat:
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}

// Called every time the bot disconnects from Twitch:
function onDisconnectedHandler (reason) {
  console.log(`Disconnected: ${reason}`)
  process.exit(1)
}
