/* Objects to load */
var t = 0;
var SCRIPTS_TO_LOAD = {
	"Game": 						["Debug","InitValues","Main"],
	"Game/Function": 				["Mouse","Player","Draw","Keyboard","Platform"],
	"Game/Characters": 				["Luffy","Mihawk","Kizaru"],
	"Game/Characters/Effects": 		["Particle"],
	"Game/Characters/Animation": 	["Animate"],
	"Game/Characters/AI": 			["AI"]
}
var CHAR_IMAGES_TO_LOAD = {
	"Images/Characters/OnePiece": {
		"Luffy": [
			["Stand", 3],
			["Run", 8],
			["Jump", 4],
			["Hurt", 1]
			["Block", 1],
			["Dead", 1],
			["Won", 5],
			["Charge", 4],
			["Punch", 5],
			["Kick", 9],
			["Special", 20],
			["Pistol", 18],
			["Gear3Kick", 20],
			["PunchUp", 10],
			["Gear3PunchUp", 17],
			["PunchDown", 11],
			["KickDown", 4]
		],
		"Mihawk": [
			["Stand", 3],
			["Run", 8],
			["Jump", 4],
			["Hurt", 1]
			["Block", 1],
			["Dead", 1],
			["Won", 5],
			["Charge", 4],
			["Light", 6],
			["Heavy", 7],
			["Special", 24],
			["Carve", 5],
			["Slice", 7],
			["Chop", 9],
			["UpSlice", 9],
			["DownSlice", 9],
			["JumpCut", 6],
			["JumpSlice", 6]
		],
		"Kizaru": [
			["Stand", 4],
			["Run", 8],
			["Jump", 9],
			["Hurt", 2]
			["Block", 1],
			["Dead", 1],
			["Won", 5],
			["Charge", 3],
			["Light", 5],
			["Heavy", 9],
			["LightSlash", 6],
			["LightCut", 11],
			["LightStab", 7],
		]
	}
}


/* Functions */
function loadImages(rn){
	var timesToRender = rn;
	for (var hasRendered = 0; hasRendered < timesToRender; hasRendered++){
		for (main in CHAR_IMAGES_TO_LOAD){
			//console.log(main);
			for (dir in CHAR_IMAGES_TO_LOAD[main]){ 
				for (file = 0; file < CHAR_IMAGES_TO_LOAD[main][dir].length; file++){
					var numOfFiles = CHAR_IMAGES_TO_LOAD[main][dir][file][1];
					if (!numOfFiles){ continue; }
					for (var i = 0; i < numOfFiles; i++){
						var nFileR = main + "/" + dir + "/" + CHAR_IMAGES_TO_LOAD[main][dir][file][0] + "/R/" + i + ".png";
						var nFileL = main + "/" +  dir + "/" + CHAR_IMAGES_TO_LOAD[main][dir][file][0] + "/L/" + i + ".png";
						
						$('#PreloadImages').append('<img src="' + nFileR + '"/>');
						$('#PreloadImages').append('<img src="' + nFileL + '"/>');
					}
				}
			}
		}
		$('#PreloadImages').empty();
	}
}


function loadScript(CurrentFile,NewFile){
	var nScript = document.createElement("script");
			nScript.type = "text/javascript";
			nScript.id = CurrentFile;
		$('#scripts').append(nScript);
		$('#'+CurrentFile).attr('src',NewFile)
		$('#'+CurrentFile).attr('onerror',function(e){ if (e){ console.log("Failed") } else { console.log("Loaded"); } })
}

for (var dir in SCRIPTS_TO_LOAD){
	for (var file = 0; file < SCRIPTS_TO_LOAD[dir].length; file++){
		var currentFile = SCRIPTS_TO_LOAD[dir][file];
		var newFile = dir + "/" + SCRIPTS_TO_LOAD[dir][file] + ".js";
		loadScript(currentFile,newFile);
	}
}

setTimeout(function(){
	ctx.font = "30px Ariel"
	ctx.fillText("Loading Game...",100,50);
	
	loadImages(15);
	/* Start Menu Screen */
	update();
	mainMenuButtons();
	
	setInterval(function(){
		loadImages(3);
	},5000);
	
},1500);




