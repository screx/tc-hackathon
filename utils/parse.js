/*
    PROPER SYNTAX TO INSTANTIATE POLL:
    #poll "What's your favorite color?" "Blue" "Red" "Green" "Yellow"

*/

async function parsePoll(str) {
    console.log('STRING!', str);
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
                    emoteName : newString,
                    emoteTally : 0
                }))
                openQuote = false;
            }
        }
        
    }
    return({ question : question, options : options });
};

module.exports = {
    parsePoll
}