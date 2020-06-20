const Discord = require("discord.js");
const client = new Discord.Client();
const music = require('discord.js-musicbot-addon');
const { Pyke } = require('pyke');
const pyke = new Pyke(process.env.RIOT_API); // 10 seconds to cache
var dia, flag, selector, players, turno = "", auxiliar = 0;

let tierSD, rankSD, lpSD, winsSD, lossesSD, winrateSD, tierFlex, rankFlex, lpFlex, winsFlex, lossesFlex, winrateFlex, hotStreak, opgg;



/*
function getLastVersion() {
	request('http://ddragon.leagueoflegends.com/api/versions.json', function (error, response, body) {

		let version = JSON.parse(body);
		console.log("VERSION: " + version)
		return version[0];



	});
}
*/




client.on("ready", () => {
	console.log("Bot iniciado");
	client.user.setActivity(process.env.GAME, { type: 'LISTENING' })
		.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
		.catch(console.error);

});



function getChampionEmote(key) {

	var Emotes = {

		'Challenger': '723808761441157162',
		'Diamond': '723809276841164811',
		'Gold': '723809276920856578',
		'Iron': '723809277902323754',
		'Platinum': '723809277944528922',
		'Grandmaster': '723809278158176266',
		'Silver': '723809278275616819',
		'Master': '723809279135711303',
		'Bronze': '723809588301791272',
		'Aatrox': '723802342453018696',
		'Ahri': '723802348433965067',
		'Alistar': '723802351051472977',
		'Akali': '723802359037165578',
		'Braum': '723802361130385520',
		'Aphelios': '723802362627751966',
		'Ashe': '723802363734917161',
		'Annie': '723802364284370965',
		'Amumu': '723802367736414208',
		'Camille': '723802369262878740',
		'Bard': '723802370466906184',
		'Kindred': '723802371058302978',
		'Azir': '723802372144627732',
		'AurelionSol': '723802372530503740',
		'Elise': '723802372589092895',
		'LeeSin': '723802373042208799',
		'Karthus': '723802374514278423',
		'Cassiopeia': '723802374594101308',
		'Anivia': '723802374673530890',
		'Caitlyn': '723802375059406889',
		'Kled': '723802375110000671',
		'Zac': '723802375453933599',
		'Maokai': '723802375847936072',
		'Fizz': '723802375894073424',
		'Mordekaiser': '723802375982415882',
		'Jayce': '723802376368160798',
		'Diana': '723802376506703912',
		'Kalista': '723802376619950110',
		'TahmKench': '723802377026535494',
		'DrMundo': '723802377311748107',
		'Urgot': '723802377320267857',
		'Ivern': '723802377550954517',
		'Janna': '723802377735634974',
		'Illaoi': '723802377819389952',
		'Ekko': '723802377974448128',
		'Jax': '723802377978773555',
		'Nocturne': '723802378020847676',
		'Yorick': '723802378142482502',
		'Evelynn': '723802378159259688',
		'Draven': '723802378184425482',
		'Khazix': '723802378272243782',
		'Graves': '723802378301866014',
		'Lucian': '723802378465181768',
		'RekSai': '723802378796662854',
		'Swain': '723802378813440010',
		'Lissandra': '723802379043995688',
		'Malphite': '723802379094327336',
		'Orianna': '723802379191058483',
		'Darius': '723802379333664768',
		'Blitzcrank': '723802380071862303',
		'Shen': '723802380080250970',
		'Sion': '723802380117868544',
		'Annie': '723806005359542293',
		'Braum': '723806005686698045',
		'Cassiopeia': '723806006424895529',
		'Brand': '723806008824037506',
		'Chogath': '723806011152138264',
		'Galio': '723806017183285268',
		'Gnar': '723806017326153778',
		'Gragas': '723806017351057488',
		'Jinx': '723806018185855028',
		'JarvanIV': '723806018248769546',
		'Fiora': '723806018269610065',
		'Jhin': '723806018328592386',
		'KogMaw': '723806018479325287',
		'Kennen': '723806018617737227',
		'FiddleSticks': '723806018840035369',
		'Irelia': '723806018957737995',
		'Nidalee': '723806018991030303',
		'Kayle': '723806018995355669',
		'Kayn': '723806019125510174',
		'Pantheon': '723806019167453185',
		'Ornn': '723806019188424765',
		'Karma': '723806019343351878',
		'Kaisa': '723806019347808367',
		'Morgana': '723806019632758784',
		'Nautilus': '723806019838410802',
		'Corki': '723806019846930482',
		'Wukong': '723806019867640081',
		'Garen': '723806020119560192',
		'Nunu': '723806020178018324',
		'MasterYi': '723806020421550101',
		'Nami': '723806020442259496',
		'Quinn': '723806020513824820',
		'Qiyana': '723806020652105759',
		'Lulu': '723806020660494358',
		'Ezreal': '723806020706500719',
		'Leona': '723806020773871678',
		'Hecarim': '723806020895506432',
		'Gangplank': '723806020907958333',
		'Lux': '723806020987650060',
		'Malzahar': '723806021050564651',
		'Nasus': '723806021092638721',
		'Pyke': '723806021159485511',
		'Olaf': '723806021205622836',
		'Kassadin': '723806021264605245',
		'Katarina': '723806021306417172',
		'MissFortune': '723806021323325451',
		'Leblanc': '723806021415469106',
		'Neeko': '723806021440503829',
		'Poppy': '723806021461606450',
		'Heimerdinger': '723806021675384832',
		'Rakan': '723806464174456892',
		'Rammus': '723806464703070230',
		'Renekton': '723806465520959548',
		'Rengar': '723806465864761396',
		'Riven': '723806466212888647',
		'Shaco': '723806474412883979',
		'Singed': '723806475406934026',
		'Sona': '723806475796873217',
		'Sett': '723806475906187274',
		'Senna': '723806476195594330',
		'Volibear': '723806476426280970',
		'Sivir': '723806476526944287',
		'Ryze': '723806476547915798',
		'Tristana': '723806476568887386',
		'Sejuani': '723806476581470249',
		'Syndra': '723806476677677098',
		'Sylas': '723806476795117598',
		'Trundle': '723806476841385987',
		'Warwick': '723806477072072754',
		'Taliyah': '723806477109821440',
		'Rumble': '723806477147570227',
		'TwistedFate': '723806477218873355',
		'Soraka': '723806477285851167',
		'Twitch': '723806477365542994',
		'Skarner': '723806477550354442',
		'Xayah': '723806477567131659',
		'Viktor': '723806477583908927',
		'Udyr': '723806477722320916',
		'Talon': '723806477810139206',
		'Taric': '723806477915127878',
		'Tryndamere': '723806477935968266',
		'Zyra': '723806477990494241',
		'Veigar': '723806478095351828',
		'Varus': '723806478103871498',
		'Zed': '723806478183694356',
		'Vi': '723806478422507570',
		'Ziggs': '723806478506393690',
		'Zilean': '723806478674165790',
		'Yasuo': '723806478753988638',
		'Yuumi': '723806478992932895',
		'Zoe': '723806479018098718',
		'Shyvana': '723806479022293002',
		'Velkoz': '723806479072624662',
		'Xerath': '723806479072886804',
		'Thresh': '723806479081144370',
		'XinZhao': '723806479143927843',
		'Vladimir': '723806479181807666',
		'Vayne': '723806479211167795',
		'Teemo': '723806479307767843',

	}


	Object.freeze(Emotes);


	return Emotes[key];

}








function getChampionName(key) {

	var Champions = {

		'1': 'Annie', '2': 'Olaf', '3': 'Galio', '4': 'TwistedFate', '5': 'XinZhao', '6': 'Urgot', '7': 'Leblanc', '8': 'Vladimir', '9': 'Fiddlesticks', '10': 'Kayle', '11': 'MasterYi', '12': 'Alistar', '13': 'Ryze', '14': 'Sion', '15': 'Sivir', '16': 'Soraka', '17': 'Teemo', '18': 'Tristana', '19': 'Warwick', '20': 'Nunu', '21': 'MissFortune', '22': 'Ashe', '23': 'Tryndamere', '24': 'Jax', '25': 'Morgana', '26': 'Zilean', '27': 'Singed', '28': 'Evelynn', '29': 'Twitch', '30': 'Karthus', '31': 'Chogath', '32': 'Amumu', '33': 'Rammus', '34': 'Anivia', '35': 'Shaco', '36': 'DrMundo', '37': 'Sona', '38': 'Kassadin', '39': 'Irelia', '40': 'Janna', '41': 'Gangplank', '42': 'Corki', '43': 'Karma', '44': 'Taric', '45': 'Veigar', '48': 'Trundle', '50': 'Swain', '51': 'Caitlyn', '53': 'Blitzcrank', '54': 'Malphite', '55': 'Katarina', '56': 'Nocturne', '57': 'Maokai', '58': 'Renekton', '59': 'JarvanIV', '60': 'Elise', '61': 'Orianna', '62': 'Wukong', '63': 'Brand', '64': 'LeeSin', '67': 'Vayne', '68': 'Rumble', '69': 'Cassiopeia', '72': 'Skarner', '74': 'Heimerdinger', '75': 'Nasus', '76': 'Nidalee', '77': 'Udyr', '78': 'Poppy', '79': 'Gragas', '80': 'Pantheon', '81': 'Ezreal', '82': 'Mordekaiser', '83': 'Yorick', '84': 'Akali', '85': 'Kennen', '86': 'Garen', '89': 'Leona', '90': 'Malzahar', '91': 'Talon', '92': 'Riven', '96': 'KogMaw', '98': 'Shen', '99': 'Lux', '101': 'Xerath', '102': 'Shyvana', '103': 'Ahri', '104': 'Graves', '105': 'Fizz', '106': 'Volibear', '107': 'Rengar', '110': 'Varus', '111': 'Nautilus', '112': 'Viktor', '113': 'Sejuani', '114': 'Fiora', '115': 'Ziggs', '117': 'Lulu', '119': 'Draven', '120': 'Hecarim', '121': 'Khazix', '122': 'Darius', '126': 'Jayce', '127': 'Lissandra', '131': 'Diana', '133': 'Quinn', '134': 'Syndra', '136': 'AurelionSol', '141': 'Kayn', '143': 'Zyra', '145': 'Kaisa', '150': 'Gnar', '154': 'Zac', '157': 'Yasuo', '161': 'Velkoz', '163': 'Taliyah', '164': 'Camille', '201': 'Braum', '202': 'Jhin', '203': 'Kindred', '222': 'Jinx', '223': 'TahmKench', '236': 'Lucian', '238': 'Zed', '240': 'Kled', '245': 'Ekko', '246': 'Qiyana', '254': 'Vi', '266': 'Aatrox', '267': 'Nami', '268': 'Azir', '350': 'Yuumi', '412': 'Thresh', '420': 'Illaoi', '421': 'RekSai', '427': 'Ivern', '429': 'Kalista', '432': 'Bard', '497': 'Rakan', '498': 'Xayah', '516': 'Ornn', '517': 'Sylas', '518': 'Neeko', '523': 'Aphelios', '555': 'Pyke', '235': 'Senna', '875': 'Sett'
	}


	Object.freeze(Champions);


	return Champions[key];

}


function hora() {
	var date = new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" });
	date = new Date(date);
	var hour = date.getHours();
	hour = parseInt(hour);
	hour = (hour < 10 ? "0" : "") + hour;
	var min = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;
	return hour + ":" + min;
}

function dia() {
	date = new Date();
	var day = date.getDay()
	return day;
}
function horariosDeSfe(currentDay, flag) {
	var horarios = [];
	var resultado = [];



	switch (currentDay) {
		case 1: //lunes
			horarios = ["05:30", "06:45", "10:10", "12:00", "13:00", "14:00", "15:50", "18:00", "19:15", "21:05", "22:30"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 2: //martes
			horarios = ["05:30", "06:45", "10:10", "12:00", "13:00", "14:00", "15:50", "18:00", "19:15", "21:05", "22:30"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 3: //miercoles
			horarios = ["05:30", "06:45", "10:10", "12:00", "13:00", "14:00", "15:50", "18:00", "19:15", "21:05", "22:30"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 4: //jueves
			horarios = ["05:30", "06:45", "10:10", "12:00", "13:00", "14:00", "15:50", "18:00", "19:15", "21:05", "22:30"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 5: //viernes
			horarios = ["05:30", "06:45", "10:10", "12:00", "13:00", "14:00", "15:50", "18:00", "18:45", "19:45", "21:05", "22:30"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 6: //sabado
			horarios = ["05:30", "10:10", "12:00", "14:00", "18:00", "19:15", "22:30"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 0: //domingo
			horarios = ["08:30", "10:10", "13:30", "17:15", "20:30", "22:30", "23:45"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;



	}

	return 0;

}
function horariosDeSCC(currentDay, flag) {
	var horarios = [];
	var resultado = [];



	switch (parseInt(dia())) {
		case 1: //lunes
			horarios = ["05:35", "06:13", "07:30", "09:00", "12:33", "14:23", "15:05", "15:55", "17:40", "19:45", "21:18"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 2: //martes
			horarios = ["05:35", "06:13", "07:30", "09:00", "12:33", "14:23", "15:05", "15:55", "17:40", "19:45", "21:18"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 3: //miercoles
			horarios = ["05:35", "06:13", "07:30", "09:00", "12:33", "14:23", "15:05", "15:55", "17:40", "19:45", "21:18"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 4: //jueves
			horarios = ["05:35", "06:13", "07:30", "09:00", "12:33", "14:23", "15:05", "15:55", "17:40", "19:45", "21:18"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 5: //viernes
			horarios = ["05:35", "06:13", "07:30", "09:00", "12:33", "14:23", "15:05", "15:55", "17:40", "19:45", "21:18", "22:45"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 6: //sabado
			horarios = ["07:30", "09:00", "12:33", "14:23", "15:55", "19:45", "21:18"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;
		case 0: //domingo
			horarios = ["06:45", "11:00", "15:15", "19:00", "20:50", "22:30"];
			if (flag)
				return horariosAux(horarios);
			else
				return horarios.join(' - ');
			break;



	}

	return 0;

}

function scrap() {




}

function horariosAux(array) {



	var proximos = [];
	var i;
	tam = array.length;
	for (i = 0; i < tam; i++) {
		if (array[i] > hora()) {
			proximos.push(array[i]);

		}
	}

	if (proximos.length == 0) {
		return "No hay proximas salidas para hoy.";

	} else {
		return proximos.join(' - ');;
	}
}


function round(value, precision) {
	var multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
}


client.on("message", async message => {




	if (message.content.startsWith("!test")) {
		//message.channel.send("www.elnortesa.com.ar");

		const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' + e.name).join('\n');
		console.log(emojiList);



	}



	if (message.content.startsWith("!elo")) {


		let args = message.content.substring(1).split(" ");

		args.splice(0, 1);
		const username = args.join(" ");

		const embed = new Discord.RichEmbed();


		var sum;
		var profileImage;
		var regionID = "la2";
		const ayy = client.emojis.get("305818615712579584");

		try {
			sum = await pyke.summoner.getBySummonerName(String(username), regionID);
			profileImage = sum.profileIconId;

		} catch (err) {
			if (err.statuscode == 404) {

				message.channel.send("el jugador " + username + " no existe en LAS. ")
			}
		}


		try {

			let leaguePos;

			leaguePos = await pyke.league.getAllLeaguePositionsForSummoner(sum.id, regionID);


			tierSD = leaguePos.all.RANKED_SOLO_5x5.tier;
			rankSD = leaguePos.all.RANKED_SOLO_5x5.rank;
			lpSD = leaguePos.all.RANKED_SOLO_5x5.leaguePoints;
			winsSD = leaguePos.all.RANKED_SOLO_5x5.wins;
			lossesSD = leaguePos.all.RANKED_SOLO_5x5.losses;
			winrateSD = round([winsSD / (winsSD + lossesSD)] * 100, 1);


			tierFlex = leaguePos.all.RANKED_FLEX_SR.tier;
			rankFlex = leaguePos.all.RANKED_FLEX_SR.rank;
			lpFlex = leaguePos.all.RANKED_FLEX_SR.leaguePoints;
			winsFlex = leaguePos.all.RANKED_FLEX_SR.wins;
			lossesFlex = leaguePos.all.RANKED_FLEX_SR.losses;
			winrateFlex = round([winsFlex / (winsFlex + lossesFlex)] * 100, 1);


			if (tierSD.toString() != "Unranked") {

				lpSD = lpSD.toString() + " PL";

			}


			if (tierFlex.toString() != "Unranked") {

				lpFlex = lpFlex.toString() + " PL";

			}

			if (isNaN(winrateFlex)) {
				winrateFlex = "ND";
			} else {
				winrateFlex = winrateFlex + "%";
			}

			if (isNaN(winrateSD)) {
				winrateSD = "ND";
			} else {
				winrateSD = winrateSD + "%";
			}



			hotStreak = "";
			if (leaguePos.all.RANKED_SOLO_5x5.hotStreak) {
				hotStreak = "Racha de victorias :fire:"
			}


			embed.setAuthor(username, "http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/" + profileImage + ".png")
				.setColor(0x00AE86)
				.setDescription(
					"**Solo/Duo:** " + tierSD + " " + rankSD + " " + lpSD + " **Winrate: **" + winrateSD +
					"\n**Flex: **" + tierFlex + " " + rankFlex + " " + lpFlex + "** Winrate: **" + winrateFlex +
					"\n" + hotStreak)
				.setThumbnail("http://ddragon.leagueoflegends.com/cdn/10.12.1/img/profileicon/" + profileImage + ".png");




			message.channel.send({ embed });

		} catch (err) {
			console.log(err);



		}




	}


	if (message.content.includes("huevo")) {
		message.react("537716624296378399");
	}


	if (message.content.startsWith("!m")) {

		let data;
		let sumAux;
		let args = message.content.substring(1).split(" ");
		args.splice(0, 1);
		const username = args.join(" ");
		let leaguePos;
		let champEmoji;
		let rankEmoji;
		var i;
		hotStreak = "";

		var sum;
		var regionID = "la2";

		//build embed
		const embed = new Discord.RichEmbed()
			.setTitle("Partida de " + username)
			.setColor(0x00AE86)
			.addField("________________________________", "**EQUIPO 1**");




		//get summoner ID

		try {
			sum = await pyke.summoner.getBySummonerName(String(username), regionID);

		} catch (err) {
			if (err.statuscode == 404) {
				message.channel.send("el jugador " + username + " no existe en LAS.")
			}
		}

		//get current game info
		try {

			data = await pyke.spectator.getCurrentGameInfoBySummoner(sum.id, regionID);
		} catch (err) {


			if (err.statuscode == 404) {
				message.channel.send(username + " no está en una partida.")
			}


			data = JSON.parse(data);



			modo = data.gameType;



		}


		for (i = 0; i < 10; i++) {


			hotStreak = "";


			//get summoner ID

			try {
				sumAux = await pyke.summoner.getBySummonerName(data.participants[i].summonerName, regionID);
				sumAux = sumAux.id;

			} catch (err) {
				console.log(err);
			}

			//get ranks

			try {
				//console.log("SUMMMMM ID: "+sum.id);
				leaguePos = await pyke.league.getAllLeaguePositionsForSummoner(sumAux, regionID);


				tierSD = leaguePos.all.RANKED_SOLO_5x5.tier;
				rankSD = leaguePos.all.RANKED_SOLO_5x5.rank;
				lpSD = leaguePos.all.RANKED_SOLO_5x5.leaguePoints;
				winsSD = leaguePos.all.RANKED_SOLO_5x5.wins;
				lossesSD = leaguePos.all.RANKED_SOLO_5x5.losses;

				if (leaguePos.all.RANKED_SOLO_5x5.hotStreak) {
					hotStreak = ":fire:"

				}

				winrateSD = round([winsSD / (winsSD + lossesSD)] * 100, 1);




				if (tierSD.toString() != "Unranked") {

					lpSD = lpSD.toString() + " PL";

				}





				if (isNaN(winrateSD)) {
					winrateSD = "ND";
				} else {
					winrateSD = winrateSD + "%";
				}


			} catch (err) {
				console.log(err);
			}


			opgg = data.participants[i].summonerName.split(' ').join('+');
let championName = getChampionName(data.participants[i].championId);
let champEmoji = client.emojis.get(getChampionEmote(championName));



			embed.addField("**" + data.participants[i].summonerName + "**" + " " + "( <:"+championName+":"+champEmoji+"> " + championName + ")",tierSD + " " + rankSD + " " + lpSD + " | " + winrateSD + " " + hotStreak + " [(OP.GG)](https://las.op.gg/summoner/userName=" + opgg + ") ")
				.setDescription(data.gameMode + " " + data.gameType);

			/*.addBlankField(true)*/

			//	console.log(data.participants[i].summonerName + "(" + getChampionName(data.participants[i].championId) + ")" + " " + tierSD + " " + rankSD + " " + lpSD + " | " + winrateSD);

			if (i == 4) {
				embed.addField("________________________________", "**EQUIPO 2**");
			}

		}

		message.channel.send({ embed });
	}





	if (message.content.startsWith("!norte")) {
		message.channel.send("``Comandos:``\n``!desc`` para ver las proximas salidas desde scc\n``!desf`` para ver las proximas salidas de sf \n``!horarios`` para ver horarios de otros dias");

	}


	if (message.content.startsWith("!desf")) {
		message.channel.send("``Proximas salidas desde SANTA FE:`` " + horariosDeSfe(parseInt(dia()), true));

	}


	if (message.content.startsWith("!desc")) {
		message.channel.send("``Proximas salidas desde SCC:`` " + horariosDeSCC(parseInt(dia()), true));

	}

	if (message.content.startsWith("!horarios")) {
		message.channel.send("``Ingresa !dia+LugarDeOrigen``. \nPor ejemplo para horarios el jueves saliendo desde Santa Fe usa: ``!juevessf``");

	}




	//HORARIOS DESDE SFE   

	if (message.content.startsWith("!lunessf")) {
		message.channel.send("``LUNES | SFE -> SCC:`` " + horariosDeSfe(1, false));
	}
	if (message.content.startsWith("!martessf")) {
		message.channel.send("``MARTES | SFE -> SCC:`` " + horariosDeSfe(2, false));
	}
	if (message.content.startsWith("!miercolessf")) {
		message.channel.send("``MIERCOLES | SFE -> SCC:`` " + horariosDeSfe(3, false));
	}
	if (message.content.startsWith("!juevessf")) {
		message.channel.send("``JUEVES | SFE -> SCC:`` " + horariosDeSfe(4, false));
	}
	if (message.content.startsWith("!viernessf")) {
		message.channel.send("``VIERNES | SFE -> SCC:`` " + horariosDeSfe(5, false));
	}
	if (message.content.startsWith("!sabadosf")) {
		message.channel.send("``SABADO | SFE -> SCC:`` " + horariosDeSfe(6, false));
	}
	if (message.content.startsWith("!domingosf")) {
		message.channel.send("``DOMINGO | SFE -> SCC:`` " + horariosDeSfe(7, false));
	}


	//HORARIOS DESDE SCC
	if (message.content.startsWith("!lunessc")) {
		message.channel.send("``LUNES | SCC -> SFE:`` " + horariosDeSCC(1, false));
	}
	if (message.content.startsWith("!martessc")) {
		message.channel.send("``MARTES | SCC -> SFE:`` " + horariosDeSCC(2, false));
	}
	if (message.content.startsWith("!miercolessc")) {
		message.channel.send("``MIERCOLES | SCC -> SFE:`` " + horariosDeSCC(3, false));
	}
	if (message.content.startsWith("!juevessc")) {
		message.channel.send("``JUEVES | SCC -> SFE:`` " + horariosDeSCC(4, false));
	}
	if (message.content.startsWith("!viernessc")) {
		message.channel.send("``VIERNES | SCC -> SFE:`` " + horariosDeSCC(5, false));
	}
	if (message.content.startsWith("!sabadosc")) {
		message.channel.send("``SABADO | SCC -> SFE:`` " + horariosDeSCC(6, false));
	}
	if (message.content.startsWith("!domingosc")) {
		message.channel.send("``DOMINGO | SCC -> SFE:`` " + horariosDeSCC(7, false));
	}



});





music.start(client, {
	youtubeKey: process.env.YOUTUBE,
	botPrefix: "!",
	botAdmins: ["211602677858172930"],
	bitRate: "120000" //default era 120000

});




function gatherPlayersFromMessage(channel) {
	return new Promise((resolve, reject) => {
		players = [];
		const filter = (msg) => (msg.content.toLowerCase().includes("join") && !msg.author.bot);
		const collector = channel.createMessageCollector(filter, { time: 10000 });
		collector.on('collect', msg => {
			players.push(msg.author);
			msg.delete();
		});
		collector.on('end', async (collected) => {
			resolve(players);
		});
	});
}


const randomWord = require('random-spanish-words');
const hangman = require("./hangman.js");
const prefix = "!jugar"

const figure = [`
+---+      Elector: choosen
|   |      wordHere
    |      Le toca a: turnoA
    |      numerOfLives
    |      missC
    |
=========  gameStatus
`, `
+---+      Elector: choosen
|   |      wordHere
O   |      Le toca a: turnoA
    |      numerOfLives
    |      missC
    |
=========  gameStatus
`, `
+---+      Elector: choosen
|   |      wordHere
O   |      Le toca a: turnoA
|   |      numerOfLives
    |      missC
    |
=========  gameStatus
`, `
 +----+    Elector: choosen
 |    |    wordHere
 O    |    Le toca a: turnoA
/|    |    numerOfLives
      |    missC
      |
=========  gameStatus
`, `
 +----+    Elector: choosen
 |    |    wordHere
 O    |    Le toca a: turnoA
/|\\   |    numerOfLives
      |    missC
      |
=========  gameStatus
`, `
 +----+    Elector: choosen
 |    |    wordHere
 O    |    Le toca a: turnoA
/|\\   |    numerOfLives
/     |    missC
      |
=========  gameStatus
`, `
 +----+    Elector: choosen
 |    |    wordHere
 O    |    Le toca a: turnoA
/|\\   |    numerOfLives
/ \\   |    missC
      |     
=========  gameStatus
`];



const runningGames = new Set();

function gatherPlayersFromMessage(channel) {
	return new Promise((resolve, reject) => {
		players = [];
		const filter = (msg) => (msg.content.toLowerCase().includes("join") && !msg.author.bot);
		const collector = channel.createMessageCollector(filter, { time: 10000 });
		collector.on('collect', msg => {
			players.push(msg.author);
			msg.delete();
		});
		collector.on('end', async (collected) => {
			resolve(players);
		});
	});
}

async function gatherPlayersFromReaction(message, emoji) {

	await message.react(emoji);

	return new Promise(async (resolve, reject) => {
		let players = [];
		const filter = (r) => (r.emoji.name == emoji);
		//const filter = (r) => { return true; };
		await message.awaitReactions(filter, { time: 10000 })
			.then(collected => {
				collected.first().users.forEach((user) => {
					if (!user.bot) {
						players.push(user);
					}
				});
			})
			.catch(err => reject(err));

		resolve(players);
	});
}

async function gatherPlayers(channel) {
	const msg = await channel.send("Reacciona con 📒 para participar del juego! Tenes 10 segundos.");
	let p1 = gatherPlayersFromMessage(channel);
	let p2 = gatherPlayersFromReaction(msg, '📒');
	let aPlayers = await Promise.all([p1, p2]);
	msg.delete();
	let players = [];
	// join both arrays of players into one of unique players.
	aPlayers.forEach(ps => ps.forEach(p => {
		if (!players.find(pOther => pOther.id == p.id)) {
			players.push(p);
		}
	}));
	return players;
}

async function getNextMessage(channel, maxTime) {
	return await channel.awaitMessages((m) => !m.author.bot, { max: 1, time: maxTime, errors: ['time'] })
		.catch((collected) => { throw collected });
}

async function getWordFromPlayers(players, channel) {
	let word;
	let chosenOne;
	while (!word && players.length > 1) {
		let index = Math.floor((Math.random() * 1000) % players.length);
		chosenOne = players[index];
		players.splice(index, 1);

		const dm = await chosenOne.createDM();

		await dm.send("Sos el jugador elegido! Responde con la palabra que elijas. Tenes 30 segundos. Recorda que NO podes participar en el juego.");
		let finish = false;
		let tries = 0;
		let msgCollection;
		while (!finish && tries < 3) {
			try {
				msgCollection = await getNextMessage(dm, 30000);
			} catch (collected) {
				await dm.send("Se terminó el tiempo, estas descalificado.");
				await channel.send("El jugador elegido no respondió, eligiendo a otro.");
				finish = true;
				continue;
			}

			const msg = msgCollection.first().content;
			if (msg.match(/^[A-Za-zÀ-ú]{3,}$/)) {
				word = msg.toLowerCase();
				finish = true;
				dm.send("Palabra aceptada, volviendo al servidor.");
			} else {
				await dm.send("Palabra invalida. No usar espacios, y que tenga al menos 3 letras.");
				++tries;
				if (tries == 3) {
					await dm.send("Demasiadas palabras equivocadas. Estas descalificado.");
				}
			}
		}
	}

	if (!word && players.length <= 1) {
		channel.send("No hay suficientes jugadores.");
		return;
	}

	return { word: word, selector: chosenOne }
}

async function showProgress(channel, game, gameMessage, gameOver) {
	const figureStep = figure[6 - game.lives];
	let progress = game.progress;
	let lives = "";

	if (auxiliar == jugadores.length || auxiliar > jugadores.length) {
		auxiliar = 0;
	}

	if (!jugadores.length == 0) {
		turno = jugadores[auxiliar].username;
		auxiliar++;
	}


	for (let i = 0; i < 6; ++i) {
		if (i < game.lives) {
			lives += "❤️";
		} else {
			lives += "🖤";
		}
	}
	let misses = "Errores: ";
	for (let i = 0; i < game.misses.length; ++i) {
		misses += (game.misses[i] + " ");

	}

	let screen;

	if (typeof selector == 'undefined' || selector == null) {
		screen = figureStep.replace(/wordHere/, progress)
			.replace(/numerOfLives/, lives)
			.replace(/missC/, misses)
			.replace(/turnoA/, turno)
			.replace(/choosen/, "Bot");
	} else {
		screen = figureStep.replace(/wordHere/, progress)
			.replace(/numerOfLives/, lives)
			.replace(/missC/, misses)
			.replace(/turnoA/, turno)
			.replace(/choosen/, selector.username);



	}


	const embed = new Discord.RichEmbed();
	if (gameOver) {
		if (game.status === "won") {
			embed.setColor("#00CC00");
			screen = screen.replace(/gameStatus/, "Ganaste");
		} else {
			embed.setColor("#E50000");
			screen = screen.replace(/gameStatus/, "Perdiste");
		}
	} else {
		screen = screen.replace(/gameStatus/, " ");
		embed.setColor("#FFD700");
	}
	embed.setDescription("```\n" + screen + "```");

	if (gameMessage) {
		await gameMessage.edit({ embed: embed });
	} else {
		return await channel.send({ embed: embed });
	}
}

async function startGame(channel, gameType) {
	const players = await gatherPlayers(channel);
	if (players.length == 0) {
		channel.send("Otra vez será... nadie entró a jugar :(");
		return;
	}
	if (gameType === "custom" && players.length < 2) {
		channel.send("Para una partida custom debe haber al menos 2 jugadores");
		return;
	}

	let word;

	switch (gameType) {
		case "random":

			word = randomWord();
			break;
		case "custom":
			await channel.send(players.length + " jugadores participando. Seleccionando a un jugador para elegir la palabra. Revisen sus mensajes privados!!");
			let userSelection = await getWordFromPlayers(players, channel);
			if (userSelection) {
				word = userSelection.word;
				selector = userSelection.selector;
			} else {
				return;
			}
			break;
	}

	const game = new hangman(word);

	return { game, players, selector };
}

async function runGame(channel, game, players) {
	const gameMessage = await showProgress(channel, game);
	const filter = ((m) =>
		players.find((p) => (p.id == m.author.id)));

	const collector = channel.createMessageCollector(filter, { time: 600000 }); // max of 15 minutes per game

	return new Promise((resolve, reject) => {
		collector.on('collect', async (m) => {
			const c = m.content.toLowerCase();
			m.delete();
			if (m.content.match(/^[A-Za-zÀ-ú]{2,}$/)) {
				if (game.guessAll(c) == false) {
					players.splice(players.find(p => m.author.id == p.id), 1);
				}
			} else if (m.content.match(/^[A-Za-zÀ-ú]{1}$/)) {
				game.guess(c);
			} else {
				return;
			}
			await showProgress(channel, game, gameMessage);

			if (game.status !== "in progress") {
				collector.stop();
			} else if (players.length < 1) {
				collector.stop();
				game.status = "lost";
			}
		});
		collector.on('end', async (collected) => {
			await showProgress(channel, game, gameMessage, true);
			resolve();
		});
	});
}

async function showResult(channel, game, selector) {
	if (game.status === "won") {
		if (selector) {
			channel.send(`Ganaron. ${selector.username} la proxima vez elegi alguna mas difícil!`);
		} else {
			channel.send(`Ganaron, la palabra era ${game.word}!`);
		}
	} else if (game.status === "lost") {
		if (selector) {
			channel.send(`${selector.username} ha ganado!!. La palabra era ${game.word}.`);
		} else {
			channel.send(`Perdieron, la palabra era ${game.word}.`);
		}
	} else {
		channel.send("El juego terminó, limite de tiempo excedido.");
	}
}

client.on('message', async (msg) => {
	if (!msg.author.bot && msg.content.startsWith(prefix) && msg.channel.type === "text") {

		const args = msg.content.slice(prefix.length).trim().split(' ').filter(word => word.trim().length > 0);


		if (args[0] == "stop") {
			runningGames.delete(msg.channel.guild);
			msg.channel.send("Juego terminado.");
		} else {
			if (!runningGames.has(msg.guild)) {
				let gameType = "custom";
				if (args[0]) switch (args[0]) {
					case "random":
						gameType = "random";
						break;
					case "custom":
						gameType = "custom";
						break;
					case "help":
						msg.channel.send("Usa !jugar (modo), podes elegir entre el modo de juego \"custom\" o \"random\". !jugar stop para parar un juego");
						return;

				}

				runningGames.add(msg.channel.guild);

				let game, players;
				selector = null;
				const gameInfo = await startGame(msg.channel, gameType);
				if (gameInfo) {
					game = gameInfo.game;
					players = gameInfo.players;
					jugadores = gameInfo.players;
					selector = gameInfo.selector;
					await runGame(msg.channel, game, players);
					await showResult(msg.channel, game, selector);
				}

				runningGames.delete(msg.channel.guild);
			} else {
				msg.reply("Ya hay un juego en curso.");
			}
		}




	}
});



client.on('error', (err) => console.error(err));



client.login(process.env.BOT_TOKEN);
