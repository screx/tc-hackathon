const tmi = require('tmi.js');
const haikudos = require('haikudos');
const socket = require('socket.io-client')('wss://pubsub-edge.twitch.tv');

socket.on('connect', function(){
    console.log('* Socket opened');
});
socket.on('event', function(data){
    console.log('* Socket event!');
});
socket.on('disconnect', function(){
    console.log('* Socket closed :(');
});


/*


curl -H 'Authorization: Bearer cfabdegwdoklmawdzdo98xt2fo512y' \
-X GET 'https://api.twitch.tv/helix/users?id=44322889'

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
    'shroud'
  ]
}

// These are the commands the bot knows (defined below):
let knownCommands = { echo, haiku }

// Function called when the "echo" command is issued:
function echo (target, context, params) {
  // If there's something to echo:
  if (params.length) {
    // Join the params into a string:
    var msg = params.join(' ')
    // Interrupt attempted slash and dot commands:
    if (msg.charAt(0) == '/' || msg.charAt(0) == '.') {
      msg = 'Nice try...' 
    }
    // Send it back to the correct place:
    sendMessage(target, context, msg)
  } else { // Nothing to echo
    console.log(`* Nothing to echo`)
  }
}

// Function called when the "haiku" command is issued:
function haiku (target, context) {
  // Generate a new haiku:
  haikudos((newHaiku) => {
    // Split it line-by-line:
    newHaiku.split('\n').forEach((h) => {
    // Send each line separately:
    sendMessage(target, context, h)
    })
  })
}

// Helper function to send the correct type of message:
function sendMessage (target, context, message) {
  if (context['message-type'] === 'whisper') {
    client.whisper(target, message)
  } else {
    client.say(target, message)
  }
}

// Create a client with our options:
let client = new tmi.client(opts)

// Register our event handlers (defined below):
client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)
client.on('disconnected', onDisconnectedHandler)

// Connect to Twitch:
client.connect()

// Called every time a message comes in:
function onMessageHandler (target, context, msg, self) {
  if (self) { return } // Ignore messages from the bot

  // This isn't a command since it has no prefix:
  if (msg.substr(0, 1) !== commandPrefix && msg.includes('subscribe')) {
    console.log(`[${target} (${context['message-type']})] ${context.username}: ${msg}`)
    return
  }

  /*
  // Split the message into individual words:
  const parse = msg.slice(1).split(' ')
  // The command name is the first (0th) one:
  const commandName = parse[0]
  // The rest (if any) are the parameters:
  const params = parse.splice(1)

  // If the command is known, let's execute it:
  if (commandName in knownCommands) {
    // Retrieve the function by its name:
    const command = knownCommands[commandName]
    // Then call the command with parameters:
    command(target, context, params)
    console.log(`* Executed ${commandName} command for ${context.username}`)
  } else {
    console.log(`* Unknown command ${commandName} from ${context.username}`)
  }
  */
}

// Called every time the bot connects to Twitch chat:
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}

// Called every time the bot disconnects from Twitch:
function onDisconnectedHandler (reason) {
  console.log(`Disconnected: ${reason}`)
  process.exit(1)
}

