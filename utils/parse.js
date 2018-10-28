/*
    PROPER SYNTAX TO INSTANTIATE POLL:
    #poll "What's your favorite color?" "Blue" "Red" "Green" "Yellow"
*/

const {generateEmotes} = require('./generateEmotes');
const emoteArray = [
    'BigPhish', 'BloodTrail', 'FBCardinals', 'FBChallenge', 'HumbleLife', 'TPcrunchyroll', 'VoteNay', 'riPepperonis',
    'BrainSlug', 'GreenTeam', 'MrDestructoid', 'OSFrog', 'SMOrc', 'SSSsss', 'TheIlluminati', 'TwitchRPG', 'VoteYea',
    'EarthDay', 'HotPokket', 'PJSugar', 'PrimeMe', 'Squid1', 'Squid2', 'Squid3', 'Squid4',
    'DxCat', 'FBPenalty', 'ItsBoshyTime','KAPOW', 'MorphinTime','PeteZaroll', 'Praiselt', 'StinkyCheese', 'duDudu', 'pastaThat'
]
const redEmotes = ['BigPhish', 'BloodTrail', 'FBCardinals', 'FBChallenge', 'HumbleLife', 'TPcrunchyroll', 'VoteNay', 'riPepperonis'];
const greenEmotes = [ 'BrainSlug', 'GreenTeam', 'MrDestructoid', 'OSFrog', 'SMOrc', 'SSSsss', 'TheIlluminati', 'TwitchRPG', 'VoteYea' ];
const blueEmotes = ['EarthDay', 'HotPokket', 'PJSugar', 'PrimeMe', 'Squid1', 'Squid2', 'Squid3', 'Squid4'];
const yellowEmotes = ['DxCat', 'FBPenalty', 'ItsBoshyTime','KAPOW', 'MorphinTime','PeteZaroll', 'Praiselt', 'StinkyCheese', 'duDudu', 'pastaThat'];

/*
    PROPER SYNTAX TO INSTANTIATE POLL:
    #poll "Laurel or yanny?" "Lauel=blue" "Yanny=red"
*/

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
                else{
                    var fields = newString.split('='); var color = fields[1].toLowerCase();
                    options.push({
                    optionName : fields[0],
                    emoteColor : color,
                    emoteTally : 0
                })};
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
        });
        setTimeout(() => resolve("done!"), 500)
    });
    let result = await promise;
    return obj;
};

module.exports = {
    emoteArray, redEmotes, greenEmotes, blueEmotes, yellowEmotes,
    populateOptions,
    parsePoll
}