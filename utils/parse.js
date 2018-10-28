const {generateEmotes} = require('./generateEmotes');

/*
    PROPER SYNTAX TO INSTANTIATE POLL:
    #poll "What's your favorite color?" "Blue" "Red" "Green" "Yellow"
*/

async function populateEmotes(num) {
    return generateEmotes(num);
}

async function populateOptions(str) {
    var question; var options = [];
    var openQuote = false;
    var quoteStartPos = 0;
    for (var i=0; i<str.length; i++) {
        if (str[i]== '"'){
            if (!openQuote) {
                openQuote = true;
                quoteStartPos = i+1;
            } else {
                var newString = str.substring(quoteStartPos, i);
                if (!question) { question = newString; }
                else(options.push({
                    optionName : newString,
                    emoteName : '',
                    emoteTally : 0
                }))
                openQuote = false;
            }
        }  
    }
    return({ question : question, options : options });
}

async function parsePoll(str) {
    var obj;

    let promise = new Promise((resolve, reject) => {
        populateOptions(str).then(function(returnedObj){
            obj = returnedObj;
            return obj.options.length;
        }).then(function(num) {
            populateEmotes(num).then(function(emotes){
                for (var i=0; i<obj.options.length; i++) {
                    obj.options[i].emoteName = emotes[i];
                }
            });
        });
        setTimeout(() => resolve("done!"), 500)
    });
    
    let result = await promise;
    return obj;
};

module.exports = {
    populateEmotes,
    populateOptions,
    parsePoll
}