var startingSel1 = [0,0];
var startingSel2 = [0,0];

function createPlayer(p){
	if (p[0] == "1"){
		var cc = pControls["Player 1"];
		players[0] = new Player( "Player 1", 100, height/2, 50, 65, 6.5, height+65, .9, .2, 6, 100, 100, 3, 1, [1,0], "standR", "right", [cc.up,cc.down,cc.right,cc.left,cc.jump,cc.light,cc.heavy,cc.special], selectedChar1, p[1]);
	} else if (p[0] == "2"){
		var cc = pControls["Player 2"];
		players[1] = new Player("Player 2", width-100, height/2, 50, 65, 6.5, height+65, .9, .2, 6, 100, 100, 3, 1, [2,0], "standR", "right", [cc.up,cc.down,cc.right,cc.left,cc.jump,cc.light,cc.heavy,cc.special], selectedChar2, p[1]);
	}
}

function changeSelChar(c){
	var countX = 0; var countY = 0;
	for (var i in co){
		if (countX == window["startingSel"+c][0] && countY == window["startingSel"+c][1]){
			window["selectedChar"+c] = i;
		}
		countX++;
		if (countX > maxPerRow){
			countX = 0; countY++;
		}
	}
}

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
	clickedKeys[e.keyCode] = true;
	setTimeout(function(){
		clickedKeys[e.keyCode] = false;
		if (keys[e.keyCode]){
			doubleClicked[e.keyCode] = true;
			setTimeout(function(){
				doubleClicked[e.keyCode] = false;
			},dKeyTimer);
		}
	},uKeyTimer);
});

document.body.addEventListener("keydown", function(e){
	if(keysToIgnore.indexOf(e.keyCode) > -1) { e.preventDefault(); }
	keys[e.keyCode] = true;

	/* Main Menu */
	if (menuScreen){
		/* Change player key */
		if (changingKey.active){ pControls[changingKey.player][changingKey.key] = e.keyCode; var bKey = changingKey.player + " " + changingKey.key; changeButtonProperty(bKey, "text", e.keyCode); changingKey = {active:false, player:"", key:""} }
	}
	/* PvP and PvC */
	if (!menuScreen && (currentScreen == "PlayPvP" || currentScreen == "PlayPvC")){
		/* Pause */
		if (paused){ if (changingKey.active){ var pl = returnPlayer(changingKey.player); pl.controls[changingKey.key] = e.keyCode; var bKey = changingKey.player + " " + (changingKey.key.substring(0,1).toUpperCase() + changingKey.key.substring(1)); changeButtonProperty(bKey, "text", e.keyCode); changingKey = {active:false, player:"", key:""}; } }
		if (e.keyCode == 27){ if (paused){ paused = false; } else { clearMenu(); pauseButtons(); paused = true;  } }
		/* Change Character */
		if (!currentPlr1){
			if (e.keyCode == pControls["Player 1"]["left"]){  if (startingSel1[0] > 0){ startingSel1[0] -= 1; } }
			else if (e.keyCode == pControls["Player 1"]["down"]){    if (startingSel1[1] < maxPerCol){ startingSel1[1] += 1; } }
			else if (e.keyCode == pControls["Player 1"]["right"]){ if (startingSel1[0] < maxPerRow){ startingSel1[0] += 1; } }
			else if (e.keyCode == pControls["Player 1"]["up"]){  if (startingSel1[1] > 0){ startingSel1[1] -= 1; } }
		}
		if (!currentPlr2){
			if (e.keyCode == pControls["Player 2"]["right"]){  if (startingSel2[0] > 0){ startingSel2[0] -= 1; } }
			else if (e.keyCode == pControls["Player 2"]["up"]){    if (startingSel2[1] > 0){ startingSel2[1] -= 1; } }
			else if (e.keyCode == pControls["Player 2"]["left"]){ if (startingSel2[0] < maxPerRow){ startingSel2[0] += 1; } }
			else if (e.keyCode == pControls["Player 2"]["down"]){  if (startingSel2[1] < maxPerCol){ startingSel2[1] += 1; } }
		}
		/* Random Character */
		if (e.keyCode == 13){
			if (currentPlr1 && currentPlr2){
				if (players[0].character == "Random"){
					var countC = 0; var randNum =  Math.ceil(Math.random() * (coLen-1));
					console.log(randNum);
					for (var i in co){
						if (countC++ == randNum){
							players[0].character = i; break;
						}
					}
				}
				if (players[1].character == "Random"){
					var countC = 0; var randNum =  Math.ceil(Math.random() * (coLen-1));
					console.log(randNum);
					for (var i in co){
						if (countC++ == randNum){
							players[1].character = i; break;
						}
					}
				}
				playing = true;
			}
		}
		/* Select Character */
		if (e.keyCode == pControls["Player 1"]["light"] && !playing){ currentPlr1 = selectedChar1; createPlayer(["1","Player"]); }
		if (e.keyCode == pControls["Player 1"]["heavy"] && !playing){ currentPlr1 = false; }
		if (e.keyCode == pControls["Player 2"]["light"] && !playing){ currentPlr2 = selectedChar2; if (currentScreen == "PlayPvP"){ createPlayer(["2","Player"]); } else if (currentScreen == "PlayPvC"){ createPlayer(["2","AI"]); } }
		if (e.keyCode == pControls["Player 2"]["heavy"] && !playing){ currentPlr2 = false; }
	}
});
