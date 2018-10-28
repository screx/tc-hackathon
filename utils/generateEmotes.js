//Names of emotes
//Create poll/poll parser  --> create object, randomly picks emotes
//Parse incoming messages, hash username-choice
//Count votes at end

var Chance = require('chance');
var chance = new Chance();

const emoteArray = ['4Head', 'ANELE', 'AngryJack', 'ArgieB8', 'ArigatoNas', 'ArsonNoSexy','AsexualPride','AsianGlow', 'BCWarrior', 'BabyRage','BatChest','BegWan','BibleThump','BigBrother','BigPhish','BisexualPride','BlargNaut','BlessRNG','BloodTrail','BrainSlug','BrokeBack','BuddhaBar','CarlSmile','ChefFrank','ChipotleChip', 'CoolCat', 'CoolStoryBob','CorgiDerp', 'CrreamAwk', 'CurseLit', 'DAESuppy', 'DBstyle','DansGame','DarkMode','DatSheffy','DendiFace','DogFace','DoritosChip','DrinkPurple','DxCat','EarthDay','EleGiggle','EntropyWins','FBBlock','FBBroncos','FBCardinals','FBCatch','FBChallenge','FBDolphins','FBPass','FBPenalty','FBRun','FBSpiral','FBTexans','FBtouchdown','FUNgineer','FailFish','FrankerZ','FreakinStinkin','FunRun','FutureMan','GayPride','GenderFluidPride','GingerPower','GivePLZ','GrammarKing','GreenTeam','HSCheers','HSWP','HappyJack','HassaanChop','HassanChop','HeyGuys','HotPokket','HumbleLife','IntersexPride','InuyoFace','ItsBoshyTime','JKanStyle','Jebaited','JonCarnage','KAPOW','Kappa','KappaClaus','KappaPride','KappaRoss','KappaWealth','Kappu','Keepo','KevinTurtle','Kippa','KomodoHype','KonCha','Kreygasm','LUL','LesbianPride','MVGame','Mau5','MaxLOL','MercyWing1','MercyWing2','MikeHogu','MingLee','MorphinTime','MrDestructoid','NinjaGrumpy','NomNom','NonBinaryPride','NotATK','NotLikeThis','OSFrog','OhMyDog','OneHand','OpieOP','OptimizePrime','PJSalt','PJSugar','PMSTwin','PRChase','PanicVis','PansexualPride','PartyHat','PartyTime','PeoplesChamp','PermaSmug','PeteZaroll','PeteZarollOdyssey','PicoMause','PinkMercy','PipeHype','PogChamp','Poooound','PopCorn','PowerUpL','PowerUpR','PraiseIt','PrimeMe','PunOko','PunchTrees','PurpleStar','RaccAttack','RalpherZ','RedCoat','RedTeam','ResidentSleeper','RitzMitz','RlyTho','RuleFive','SMOrc','SSSsss','SabaPing','SeemsGood','SeriousSloth','ShadyLulu','ShazBotstix','SmoocherZ','SnickersBoom','SnickersGoal','SoBayed','SoonerLater','Squid1','Squid2','Squid3','Squid4','StinkyCheese','StoneLightning','StrawBeary','SuperVinlin','SwiftRage','TBAngel','TF2John','TPFufun','TPcrunchyroll','TTours','TakeNRG','TearGlove','TehePelo','ThankEgg','TheIlluminati','TheRinger','TheTarFu','TheThing','ThunBeast','TinyFace','TombRaid','TooSpicy','TransgenderPride','TriHard','TwitchLit','TwitchRPG','TwitchUnity','TwitchVotes','UWot','UnSane','UncleNox','VoHiYo','VoteNay','VoteYea','WTRuck','WeAreVenom','WholeWheat','WutFace','YouDontSay','YouWHY','bleedPurple','cmonBruh','copyThis','duDudu','imGlitch','mcaT','panicBasket','pastaThat','riPepperonis','twitchRaid']
var generateEmotes = function(numOptions){
    //console.log('NUM OPTIONS:', numOptions);
    var indices = chance.unique(chance.integer, numOptions, {min: 1, max: emoteArray.length});
    //console.log('INDICES:', indices);
    var emotes = indices.map(x => emoteArray[x]);
    //console.log('EMOTES:', emotes);
    return emotes;
}

module.exports = {
    emoteArray,
    generateEmotes
}