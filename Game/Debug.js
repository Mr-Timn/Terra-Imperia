

var debugging = false;
var debuggingMode = "PvPCharSelect"
var dCharacter = "Luffy";

function loadDebug(){
	if (debuggingMode == "LoadGame"){
		selectedChar1 = dCharacter;
		selectedChar2 = dCharacter;

		createPlayer(["1","Player"]);
		createPlayer(["2","Player"]);

		currentScreen = "PlayPvP"
		playing = true;
		menuScreen = false;
	} else if (debuggingMode == "PvPCharSelect"){
		removeAllButtons();
		currentScreen = "PlayPvP"
		playing = false;
		paused = false;
		menuScreen = false;
	}
}

if (debugging){
	document.body.addEventListener("keydown", function(e){
		if (e.keyCode == 113){
			loadDebug();
		}
	});

	setTimeout(function(){
		loadDebug();
	},1000);
}
