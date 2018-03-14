

canvas.addEventListener("click", function(e){
	if (playing && !paused) { return; }
	var mouseXY = getXY(canvas,e)
	mouseClicked(mouseXY.x,mouseXY.y);
});

window.addEventListener('wheel', function(e){
	if (!canScroll){ return; } 
	if (e.deltaY < 0){ scrollRelY--; } else if (e.deltaY > 0){ scrollRelY++; }
});

function getXY(Canvas, event){ var rect = canvas.getBoundingClientRect(), x = event.clientX - rect.left, y = event.clientY - rect.top; return {x:x, y:y}; }
function clearMenu(){ buttons  = []; menuImages = []; menuTexts = []; }
function changeScreen(screen){ lastScreen = currentScreen; currentScreen = screen; }
function returnButton(name){ for (var i in buttons){ if (buttons[i].name == name){ return buttons[i]; } }; return false; }
function returnImage(name){ for (var i in menuImages){ if (menuImages[i].name == name){ return menuImages[i]; } }; return false; }
function returnText(name){ for (var i in menuTexts){ if (menuTexts[i].name == name){ return menuTexts[i]; } }; return false; }
function removeButton(bb){ for (var i in buttons){ if (buttons[i].name == bb.name || bb == buttons[i]){ buttons.splice(i,1); } } }
function changeButtonProperty(Name, Prop, Value){ for (var i in buttons){ if (buttons[i].name == Name){ buttons[i][Prop] = returnKeyValue(Value); } } }
function removeAllButtons(){ buttons = []; }
function removeAllText(){ menuTexts = []; }

function mainMenuButtons(){
	var story =      new Button("Story",  		0,			canvasHeight/2-135+(bSize[1]*0+(5*0)),	bSize[0],bSize[1],"green","Story",	  [canvasWidth/2-bSize[0]/2, canvasHeight/2-135+(bSize[1]*0+(5*0)), 80,  0],[25,"Ariel","black"], [true,"Images/MainMenu/MenuButton1.png"])
	var vs =		 new Button("VS",			canvasWidth,canvasHeight/2-135+(bSize[1]*1+(5*1)),	bSize[0],bSize[1],"green","VS",		  [canvasWidth/2-bSize[0]/2, canvasHeight/2-135+(bSize[1]*1+(5*1)), 80, 80],[25,"Ariel","black"], [true,"Images/MainMenu/MenuButton1.png"]);
	var tutorial =   new Button("Tutorial",		0,			canvasHeight/2-135+(bSize[1]*2+(5*2)),	bSize[0],bSize[1],"green","Tutorial", [canvasWidth/2-bSize[0]/2, canvasHeight/2-135+(bSize[1]*2+(5*2)), 80,160],[25,"Ariel","black"], [true,"Images/MainMenu/MenuButton1.png"]);
	var settings =   new Button("Settings",		canvasWidth,canvasHeight/2-135+(bSize[1]*3+(5*3)),	bSize[0],bSize[1],"green","Settings", [canvasWidth/2-bSize[0]/2, canvasHeight/2-135+(bSize[1]*3+(5*3)), 80,240],[25,"Ariel","black"], [true,"Images/MainMenu/MenuButton1.png"]);
}

function pauseButtons(){
	var settings =  new Button("SettingsPaused", canvasWidth, canvasHeight/2-100+(bSize[1]*0+(5*0)), bSize[0],bSize[1],"green","Settings", [canvasWidth/2-bSize[0]/2, canvasHeight/2-100+(bSize[1]*0+(5*0)), 80,0], [25,"Ariel","black"], [true,"Images/MainMenu/MenuButton1.png"]);
	var combos = 	new Button("DisplayCombos",  0, 		  canvasHeight/2-100+(bSize[1]*1+(5*1)), bSize[0],bSize[1],"green","Combos",   [canvasWidth/2-bSize[0]/2, canvasHeight/2-100+(bSize[1]*1+(5*1)), 80,0], [25,"Ariel","black"], [true,"Images/MainMenu/MenuButton1.png"]);
	var back =		new Button("Unpause",	 canvasWidth, canvasHeight/2-100+(bSize[1]*2+(5*2)), bSize[0],bSize[1],"green","Back",	   [canvasWidth/2-bSize[0]/2, canvasHeight/2-100+(bSize[1]*2+(5*2)), 80,0], [25,"Ariel","black"], [true,"Images/MainMenu/MenuButton1.png"]);
}

function returnComboText(t){
	switch (t){
		case "l": return "L"; break;
		case "h": return "H"; break;
		case "r": return returnKeyValue(39);  break;
		case "l": return returnKeyValue(37); break;
		case "u": return returnKeyValue(38);  break;
		case "d": return returnKeyValue(40);  break;
		case "j": return "J"; break;
		case "s": return "S"; break;
		case "rl": return returnKeyValue(39); break;
		default: break;
	}
}

function displayPlayerCombos(plr){
	var combos = returnPlayer(plr).comboList;
	
	var id = new menuText("PlrCombo",0,0,returnPlayer(plr).name,[1,"Ariel","black"],[false,true]);
	
	/* Name Var */
	var startX = 80;
	var startY = 150;
	/* Move Var */
	var bSize = 70;
	var between = 15;
	var space = bSize + between;
	var fontS = 35;
	var font = "bold One Piece";
	var baseY = 150; 
	var baseX = 0; ctx.font = fontS + "px " + font; for (var i in combos){ if (ctx.measureText(combos[i].id).width > baseX){ baseX = ctx.measureText(combos[i].id).width; } }; baseX += startX + 50;
	
	var sp = 0;
	for (var i in combos){
		var nc = new menuText("Move Name", startX, (startY+(space*sp))+(between/2), combos[i].id, [fontS, "One Piece", "black"], [false,true]);
		
		var req = 0;
		if (combos[i].requirements.inAir){ 
			var im = new menuImage("Img", baseX+(space*(req)), 											  baseY+(space*sp)-fontS, bSize, bSize, "Images/PauseMenu/InAir.png", [false,true]);
			ctx.font = "25px " + font;
			var mt = new menuText("Text", baseX+(space*(req))+(bSize/2)-(ctx.measureText("In").width/2),  baseY+(space*sp)-5, "In", [25,font,"black"], [false,true]); 
			var mt = new menuText("Text", baseX+(space*(req))+(bSize/2)-(ctx.measureText("Air").width/2), baseY+(space*sp)+15, "Air", [25,font,"black"], [false,true]); 
			req++; 
		}
		if (combos[i].requirements.running){ 
			ctx.font = "25px " + font;
			var im = new menuImage("Img", baseX+(space*(req)), 			  								   baseY+(space*sp)-fontS, bSize, bSize, "Images/PauseMenu/Running.png", [false,true]); 
			var mt = new menuText("Text", baseX+(space*(req))+(bSize/2)-(ctx.measureText("Run").width/2),  baseY+(space*sp)+6, "Run", [25,font,"black"], [false,true]); 
			req++; 
		}
		if (combos[i].requirements.keysDown.active){ 
			for (var o in combos[i].requirements.keysDown.keys){
				var key = returnComboText(combos[i].requirements.keysDown.keys[o]);
				ctx.font = fontS + "px " + font;
				
				var im = new menuImage("Img", baseX+(space*(req)), 			 								baseY+(space*sp)-fontS, bSize, bSize, "Images/PauseMenu/KeyDown.png", [false,true]); 
				var mt = new menuText("Text", baseX+(space*(req))+(bSize/2)-(ctx.measureText(key).width/2), baseY+(space*sp)+10, key, [fontS,"bold One Piece", "black"], [false,true]); 
				req++; 
			}
		}
		for (var o = 0; o < combos[i].combination.length; o++){
			var key = returnComboText(combos[i].combination[o]);
			ctx.font = fontS + "px " + font;
			if (combos[i].combination[o] == "l" || combos[i].combination[o] == "h"){ var im = new menuImage("Img", baseX+(space*(req)), baseY+(space*sp)-fontS, bSize, bSize, "Images/PauseMenu/Attack.png", [false,true]); }
			else if (combos[i].combination[o] == "s"){								 var im = new menuImage("Img", baseX+(space*(req)), baseY+(space*sp)-fontS, bSize, bSize, "Images/PauseMenu/Special.png", [false,true]); }
			else { 								 									 var im = new menuImage("Img", baseX+(space*(req)), baseY+(space*sp)-fontS, bSize, bSize, "Images/PauseMenu/Arrow.png", [false,true]); }
			var mt = new menuText("Text", baseX+(space*(req))+(bSize/2)-(ctx.measureText(key).width/2), baseY+(space*sp)+10, key, [fontS,"bold One Piece", "black"], [false,true]);
			req++;
		}
		sp++;
	}
}

function controlsButtons(){
	var p1c = new menuImage("P1C", 100, 75, 200, 40, "Images/MainMenu/P1ControlsImage.png");
	var p2c = new menuImage("P2C",canvasWidth-300,75,200,40,"Images/MainMenu/P2ControlsImage.png");
		var p1B = new Button("Player 1 Up", 0, 120, 50, 50, "black", returnKeyValue(pControls["Player 1"]["up"]), [230, 120, 80,   0], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 1", "up"]; }); 
		var p1B = new Button("Player 1 Down", 0, 175, 50, 50, "black", returnKeyValue(pControls["Player 1"]["down"]), [230, 175, 80, 100], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 1", "down"]; });
		var p1B = new Button("Player 1 Left", 0, 230, 50, 50, "black", returnKeyValue(pControls["Player 1"]["left"]), [230, 175, 80, 200], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 1", "left"]; });						
		var p1B = new Button("Player 1 Right", 0, 285, 50, 50, "black", returnKeyValue(pControls["Player 1"]["right"]), [230, 175, 80, 300], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 1", "right"]; });
		var p1B = new Button("Player 1 Light", 0, 340, 50, 50, "black", returnKeyValue(pControls["Player 1"]["light"]), [230, 175, 80, 400], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 1", "light"]; });
		var p1B = new Button("Player 1 Heavy", 0, 395, 50, 50, "black", returnKeyValue(pControls["Player 1"]["heavy"]), [230, 175, 80, 500], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 1", "heavy"]; });
		var p1B = new Button("Player 1 Special", 0, 450, 50, 50, "black", returnKeyValue(pControls["Player 1"]["special"]), [230, 175, 80, 600], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 1", "special"]; });
			var p1BText = new menuText("Up", 100, 155, "Up", [30, "One Piece", "black"]);
			var p1BText = new menuText("Down", 100, 210, "Down", [30, "One Piece", "black"]);
			var p1BText = new menuText("Left", 100, 265, "Left", [30, "One Piece", "black"]);
			var p1BText = new menuText("Right", 100, 320, "Right", [30, "One Piece", "black"]);
			var p1BText = new menuText("Light", 100, 375, "Light", [30, "One Piece", "black"]);
			var p1BText = new menuText("Heavy", 100, 430, "Heavy", [30, "One Piece", "black"]);
			var p1BText = new menuText("Special", 100, 485, "Special", [30, "One Piece", "black"]);
		var p2B = new Button("Player 2 Up", canvasWidth, 120, 50, 50, "black", returnKeyValue(pControls["Player 2"]["up"]), [canvasWidth-175, 120, 80, 700], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 2", "up"]; });
		var p2B = new Button("Player 2 Down", canvasWidth, 175, 50, 50, "black", returnKeyValue(pControls["Player 2"]["down"]), [canvasWidth-175, 175, 80, 800], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 2", "down"]; });
		var p2B = new Button("Player 2 Left", canvasWidth, 230, 50, 50, "black", returnKeyValue(pControls["Player 2"]["left"]), [canvasWidth-175, 175, 80, 900], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 2", "left"]; });
		var p2B = new Button("Player 2 Down", canvasWidth, 285, 50, 50, "black", returnKeyValue(pControls["Player 2"]["right"]),	[canvasWidth-175, 175, 80, 1000], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 2", "right"]; });
		var p2B = new Button("Player 2 Light", canvasWidth, 340, 50, 50, "black", returnKeyValue(pControls["Player 2"]["light"]), [canvasWidth-175, 175, 80, 1100], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 2", "light"]; });
		var p2B = new Button("Player 2 Heavy", canvasWidth, 395, 50, 50, "black", returnKeyValue(pControls["Player 2"]["heavy"]), 	[canvasWidth-175, 175, 80, 1200], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 2", "heavy"]; });
		var p2B = new Button("Player 2 Special", canvasWidth, 450, 50, 50, "black", returnKeyValue(pControls["Player 2"]["special"]), [canvasWidth-175, 175, 80, 1300], [30,"Ariel","black"], [true, "Images/MainMenu/ControlsButton.png"], function(){ changingKey = [true, "Player 2", "special"]; });	
			var p2BText = new menuText("Up", canvasWidth-300, 155, "Up", [30, "One Piece", "black"]);
			var p2BText = new menuText("Down", canvasWidth-300, 210, "Down", [30, "One Piece", "black"]);
			var p2BText = new menuText("Left", canvasWidth-300, 265, "Left", [30, "One Piece", "black"]);
			var p2BText = new menuText("Right", canvasWidth-300, 320, "Right", [30, "One Piece", "black"]);
			var p2BText = new menuText("Light", canvasWidth-300, 375, "Light", [30, "One Piece", "black"]);
			var p2BText = new menuText("Heavy", canvasWidth-300, 430, "Heavy", [30, "One Piece", "black"]);
			var p2BText = new menuText("Special", canvasWidth-300, 485, "Special", [30, "One Piece", "black"]);
	if (paused){	
		var back = new Button("BackPaused",canvasWidth/2-bSize[0]/2,canvasHeight-150,bSize[0],bSize[1],"green","Back",[[canvasWidth/2-bSize[0]/2,canvasHeight-150],80, 80],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"], function(){ paused = false; });
	} else {
		var back = new Button("Back",canvasWidth/2-bSize[0]/2,canvasHeight-150,bSize[0],bSize[1],"green","Back",[[canvasWidth/2-bSize[0]/2,canvasHeight-150],80, 80],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"]);
	}
}

function menuImage(Name, X, Y, Width, Height, Image, Scroll){
	this.name = Name;
	this.x = X;
	this.y = Y;
	this.width = Width;
	this.height = Height;
	this.img = Image;
	this.relative = Scroll;
	menuImages.push(this);
}

function menuText(Name, X, Y, Text, TextObj, Scroll){
	this.name = Name;
	this.x = X;
	this.y = Y;
	this.content = Text;
	this.textObj = TextObj;
	this.relative = Scroll;
	menuTexts.push(this);
}

function Button(Name, X, Y, Width, Height, Color, Text, SlideObj, TextObj, Image, buttonFunction, Scroll){
	this.name = Name;
	this.x = X;
	this.y = Y;
	this.width = Width;
	this.height = Height;
	this.color = Color;
	this.content = Text;
	this.slideObj = SlideObj;
	this.textObj = TextObj; //fontsize fontfamily fontcolor
	this.img = Image;
	this.delayTime = SlideObj[3];
	this.ignore = true;
	this.relative = Scroll;
	if (typeof buttonFunction != "undefined"){
		this.pressed = buttonFunction;
	} else {
		this.pressed = function(){ }
	}
	
	this.removeDelay = function(b){
		setTimeout(function(){
			b.ignore = false;
		},b.delayTime);
	}
	this.removeDelay(this);
	
	this.ticked = [
		Math.floor((SlideObj[0]-X)/SlideObj[2]),
		Math.floor((SlideObj[1]-Y)/SlideObj[2]) 
	];
	this.slide = function(bb){
		if (bb.ignore){ return; }
		if (bb.ticked[0] < 0){ 
			var bSlide = setInterval(function(){ 
				bb.x += bb.ticked[0]; 
				if (bb.x < bb.slideObj[0]){ 
					bb.x = bb.slideObj[0]; 
					clearInterval(bSlide); 
				} 
			},bb.slideObj[2]); 
		}
		if (bb.ticked[0] > 0){ 
			var bSlide = setInterval(function(){ 
				bb.x += bb.ticked[0]; 
				if (bb.x > bb.slideObj[0]){ 
					bb.x = bb.slideObj[0]; 
					clearInterval(bSlide); 
				} 
			},bb.slideObj[2]); 
		}
	}
	this.remove = function(bb){
		for (var i = 0; i < buttons.length; i++){
			if (bb == buttons[i]){ buttons.splice(i,1); }
		}
	}
	this.clicked = function(bb){
		switch (bb.name){
			case "Menu":
				mainMenuButtons();
				break;
			case "Arcade":  
				
				break;
			case "VS": 
				changeScreen("VS");
				clearMenu();
				var pvp = new Button("PVP",0,		    canvasHeight/2-100+(bSize[1]*0+(5*0)),bSize[0],bSize[1],"green","PvP",[canvasWidth/2-bSize[0]/2,canvasHeight/2-135+(bSize[1]*0+(5*0)),80,  0],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"]);
				var pvc = new Button("PVC",canvasWidth, canvasHeight/2-100+(bSize[1]*1+(5*1)),bSize[0],bSize[1],"green","PvC",[canvasWidth/2-bSize[0]/2,canvasHeight/2-135+(bSize[1]*1+(5*1)),80, 80],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"]);
				var back = new Button("Back",0,			canvasHeight/2-100+(bSize[1]*2+(5*2)),bSize[0],bSize[1],"green","Back",[canvasWidth/2-bSize[0]/2,canvasHeight/2-135+(bSize[1]*2+(5*2)),80, 80],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"]);
				break;
			case "PVC": 
				menuScreen = false; 
				changeScreen("PlayPvC");
				break;
			case "PVP": 
				menuScreen = false; 
				changeScreen("PlayPvP");
				break;
			case "Story":
				changeScreen("Story");
				break;
			case "Tutorial":
				changeScreen("Tutorial");
				break;
			case "Settings":
				changeScreen("Settings");
				clearMenu();
				var controls = new Button("Controls",0,canvasHeight/2-100+(bSize[1]*0+(5*0)),bSize[0],bSize[1],"green","Controls",[canvasWidth/2-bSize[0]/2,canvasHeight/2-135+(bSize[1]*0+(5*0)),80,  0],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"],
					function(){
						clearMenu();
						controlsButtons();
					}
				);
				var back = new Button("Back",canvasWidth,canvasHeight/2-100+(bSize[1]*1+(5*1)),bSize[0],bSize[1],"green","Back",[canvasWidth/2-bSize[0]/2,canvasHeight/2-135+(bSize[1]*1+(5*1)),80, 80],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"]);
				break;
			case "Back": 
				clearMenu();
				changeScreen(lastScreen);
				bb.clicked({name:currentScreen});
				break;
			/* Paused Buttons */
			case "SettingsPaused":
				clearMenu();
				var controls = new Button("Controls",0,canvasHeight/2-100+(bSize[1]*0+(5*0)),bSize[0],bSize[1],"green","Controls",[canvasWidth/2-bSize[0]/2,canvasHeight/2-135+(bSize[1]*0+(5*0)),80,  0],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"], function(){ clearMenu(); controlsButtons(); });
				var back = new Button("BackPaused",canvasWidth,canvasHeight/2-100+(bSize[1]*1+(5*1)),bSize[0],bSize[1],"green","Back",[canvasWidth/2-bSize[0]/2,canvasHeight/2-135+(bSize[1]*1+(5*1)),80, 80],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"], function(){  });
				break;
			case "DisplayCombos":
				clearMenu();
				var p1controls = new Button("p1",0,			 canvasHeight/2-100+(bSize[1]*0+(5*0)),bSize[0],bSize[1],"green","Player 1", [canvasWidth/2-bSize[0]/2-bSize[0],canvasHeight/2-100+(bSize[1]*0+(5*0)),80,0],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"], function(){ clearMenu(); displayPlayerCombos("Player 1"); } );
				var p2controls = new Button("p2",canvasWidth,canvasHeight/2-100+(bSize[1]*0+(5*0)),bSize[0],bSize[1],"green","Player 2", [canvasWidth/2-bSize[0]/2+bSize[0],canvasHeight/2-100+(bSize[1]*0+(5*0)),80,0],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"], function(){ clearMenu(); displayPlayerCombos("Player 2"); });
				var back = new Button("BackPaused",canvasWidth,canvasHeight/2-100+(bSize[1]*1+(5*1)),bSize[0],bSize[1],"green","Back",[canvasWidth/2-bSize[0]/2,canvasHeight/2-135+(bSize[1]*1+(5*1)),80, 80],[25,"Ariel","black"],[true,"Images/MainMenu/MenuButton1.png"]);
				break;
			case "BackPaused":
				clearMenu(); 
				pauseButtons();
				break;
			case "Unpause":
				paused = false;
				break;
			default: /*console.log(bb.name + " is not a button"); */ break;
		}
	}
	buttons.push(this);
}

function mouseClicked(cordX, cordY){
	var hasClicked = false;
	for (var i = 0; i < buttons.length; i++){
		if (typeof buttons[i] == "undefined"){ continue; }
		var bX = buttons[i].x; 
		var bY = buttons[i].y; 
		var bWidth = buttons[i].width; 
		var bHeight = buttons[i].height;
		if (cordX > bX && cordX < bX + bWidth && cordY > bY && cordY < bY + bHeight){
			if (buttons[i]){ buttons[i].pressed(); }
			if (buttons[i]){ buttons[i].clicked(buttons[i]); }
			hasClicked = true;
		}
		if (hasClicked){ break; }
	}
}
