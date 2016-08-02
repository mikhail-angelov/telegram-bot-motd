const Bot = require('node-telegram-bot-api');
const request = require('request');
const MAIN_URL = 'http://fucking-great-advice.ru/api/random/';
function init(token){
	var bot;

	if(process.env.NODE_ENV === 'production') {
	  bot = new Bot(token);
	  bot.setWebHook(process.env.HEROKU_URL + bot.token);
	}
	else {
	  bot = new Bot(token, { polling: true });
	}

	bot.on('message',(msg)=>{
		const commandType = getCommandType(msg.text)
		if(msg.entities && commandType){
			var url = MAIN_URL;
			if(commandType === 'censored'){
				url += 'censored/'
			}
			request(url,(error, response, body)=>{
				if(!error && response.statusCode == 200 && body){
			  		const data = JSON.parse(body)
			  		const text = data.text.split('&nbsp;').join(' ');
			  		bot.sendMessage(msg.chat.id, '<i>'+text+'</i>',{parse_mode:'HTML'}).then(function () {
					    // console.log('op',msg, data)
					});
				}
	  		});
		} else {
			const message = 'неизвесная команда, попробуй /a, /advise, /yo, /с, /censored';
			bot.sendMessage(msg.chat.id, message)
		}
		console.log('op',msg)
	})
	return bot;
}

function getCommandType(text){
	const advise = ['/a','/advise','/yo'];
	const censored = ['/c', '/censored'];
	if(text && advise.indexOf(text)>=0){
		return 'advise';
	}else if(text && censored.indexOf(text)>=0){
		return 'censored';
	}else{
		return null;
	}
}

module.exports = init;