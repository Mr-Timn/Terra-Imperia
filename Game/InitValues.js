

/* Window */
	var canvasWidth = 1080;
	var canvasHeight = 720;
	var canvas = document.getElementById("game"), ctx = canvas.getContext("2d"), width = canvasWidth, height = canvasHeight; canvas.width = width; canvas.height = height; ctx.save();

/* Game */
	var Map = {
		Intro: {
			Active: false
		},
		Game: {
			Players: [],
			Particles: [],
			Platforms: [],

			CharacterSelect: {
				Panel: {
					Width: 400,
					StartX: 50,
					StartY: 440
				},
				Choose: {
					Width: 50,
					Height: 40
				},
				Chosen: {
					StartX: 100,
					StartY: 100,
					Width: 300,
					Height: 335
				},
				Choosing: {
					SelectingOne: false,
					SelectingTwo: false,
					ChoiceOne: "Random",
					ChoiceTwo: "Random",
					StartChoiceOne: [0,0],
					StartChoiceTwo: [0,0]
				},
				Choices: {
					"Random": 	[ "Images/CharacterSelect/Random_3.png",				"Images/CharacterSelect/Random_1.png"],
					"Luffy":	["Images/Characters/OnePiece/Luffy/SelectChar.png",		"Images/Characters/OnePiece/Luffy/SelectedChar.png", 	"Images/Characters/OnePiece/Luffy/HealthChar.png", 	[41,63]],
					"Mihawk":	["Images/Characters/OnePiece/Mihawk/SelectChar.png",	"Images/Characters/OnePiece/Mihawk/SelectedChar.png", 	"Images/Characters/OnePiece/Mihawk/HealthChar.png", [43,72]],
					"Kizaru":	["Images/Characters/OnePiece/Kizaru/SelectChar.png",	"Images/Characters/OnePiece/Kizaru/SelectedChar.png", 	"Images/Characters/OnePiece/Kizaru/HealthChar.png", [37,78]],
					//"Ace": 		["Images/Characters/OnePiece/Ace/SelectChar.png",		"Images/Characters/OnePiece/Ace/SelectedChar.png", 		"Images/Characters/OnePiece/Ace/HealthChar.png"],
					//"Franky": 	["Images/Characters/OnePiece/Franky/SelectChar.png",	"Images/Characters/OnePiece/Franky/SelectedChar.png", 	"Images/Characters/OnePiece/Franky/HealthChar.png"],
					//"Enel": 	["Images/Characters/OnePiece/Enel/SelectChar.png",		"Images/Characters/OnePiece/Enel/SelectedChar.png",		"Images/Characters/OnePiece/Enel/HealthChar.png"],
				}
			},

			RelativeDisplay: {
				active: true,
				MaxWidth: canvasWidth/2,
				MaxHeight: canvasHeight/2
			},

			Background: "Images/Backgrounds/GameBackground.png",
			UltimateScene: { Active: false },
			Scenes: {
				"Luffy": {
					active: true,
					src: "Images/Characters/OnePiece/Luffy/_Extra/Scene",
					x: canvasWidth/2-300,
					y: canvasHeight/2-300,
					move: [false,0,0],
					width: 300,
					height: 300,
					speed: 85,
					frames: 20,
					currentFrame: 0,
					framePassed: false
				},
				"Mihawk": {
					active: true,
					src: "Images/Char",
					x: 0,
					y: canvasHeight/2-300,
					move: [true, canvasWidth, 0],
					width: 300,
					height: 300,
					speed: 1,
					frames: 1,
					currentFrame: 0,
					framePassed: false
				}
			},
			Paused: false,
			Playing: false
		},
		Menu: {
			Buttons: [],
			MenuTexts: [],
			MenuImages: [],

			ButtonSize: { Width: 120, Height: 40 },

			Active: true
		},
		Control: {
			DownKeys: new Array(255).fill(false),
			UpKeys: new Array(255).fill(false),
			DoubleClickedKeys: new Array(255).fill(false),
			UpKeysTimer: 175,
			DoubleClickedKeysTimer: 200,
			KeysToIgnore: [112,113,114,115,117,118,119,120,121,122,123,13,8,37,38,39,40], // 112-123 f keys, 13 enter, 8, space, 37-40 arrows
			KeyToChange: { active: false, player: "", key: "" },
			DefaultControls: {
				"Player 1": { "up": 87, "down": 83, "right": 68, "left": 65, "jump": 84, "light": 70, "heavy": 71, "special": 72 },
				"Player 2": { "up": 38, "down": 40, "right": 39, "left": 37, "jump": 73, "light": 74, "heavy": 75, "special": 76 }
			},
			Scroll: {
				Active: true,
				ScrolledX: 0,
				ScrolledY: 0,
				IncreaseX: 10,
				IncreaseY: 10
			}
		},

		CurrentScreen: "Menu", LastScreen: "Menu"
	};

	/* My Fetish for weird var names is solved here */

	var playingIntro = 		Map.Intro.Active;

	var currentScreen = 	Map.CurrentScreen;
	var lastScreen = 		Map.LastScreen;

	var players = 			Map.Game.Players;
	var particles = 		Map.Game.Particles;
	var platforms = 		Map.Game.Platforms;
	var bg = 				Map.Game.Background;
	var ultScene =			Map.Game.UltimateScene;
	var playingUltScene = 	Map.Game.UltimateScene.Active;
	var characterScene =	Map.Game.Scene
	var paused = 			Map.Game.Paused;
	var playing = 			Map.Game.Playing;

	var selectedChar1 =		Map.Game.CharacterSelect.Choosing.ChoiceOne;
	var selectedChar2 =		Map.Game.CharacterSelect.Choosing.ChoiceTwo;
	var currentPlr1 = 		Map.Game.CharacterSelect.Choosing.SelectingOne;
	var currentPlr2 = 		Map.Game.CharacterSelect.Choosing.SelectingTwo;
	var startingSel1 = Map.Game.CharacterSelect.Choosing.StartChoiceOne;
	var startingSel2 = Map.Game.CharacterSelect.Choosing.StartChoiceTwo;
	var startX = 			Map.Game.CharacterSelect.Panel.StartX;
	var startY = 			Map.Game.CharacterSelect.Panel.StartY;
	var panelW = 			Map.Game.CharacterSelect.Panel.Width;
	var panelImgWidth = 	Map.Game.CharacterSelect.Choose.Width;
	var panelImgHeight = 	Map.Game.CharacterSelect.Choose.Height;
  var selectedImgX = 		Map.Game.CharacterSelect.Chosen.StartX
	var selectedImgY = 		Map.Game.CharacterSelect.Chosen.StartY;
	var selectedImgWidth = Map.Game.CharacterSelect.Chosen.Width;
	var selectedImgHeight = Map.Game.CharacterSelect.Chosen.Height;
	var panelH =	height - startY;
	var maxPerRow = Math.floor(panelW/panelImgWidth) - 1;
	var maxPerCol = Math.floor(panelH/panelImgHeight) - 1;
	var co = 				Map.Game.CharacterSelect.Choices;

	var buttons = 			Map.Menu.Buttons;
	var menuTexts = 		Map.Menu.MenuTexts;
	var menuImages = 		Map.Menu.MenuImages;
	var menuScreen =		Map.Menu.Active;
	var bSize = 			[Map.Menu.ButtonSize.Width,Map.Menu.ButtonSize.Height];

	var keys = 				Map.Control.DownKeys;
	var clickedKeys = 		Map.Control.UpKeys;
	var doubleClicked = 	Map.Control.DoubleClickedKeys;
	var uKeyTimer = 		Map.Control.UpKeysTimer;
	var dKeyTimer = 		Map.Control.DoubleClickedKeysTimer;
	var keysToIgnore =		Map.Control.KeysToIgnore;
	var changingKey =		Map.Control.KeyToChange;
	var pControls =			Map.Control.DefaultControls;
	var canScroll = 		Map.Control.Scroll.Active;
	var scrollRelX = 		Map.Control.Scroll.ScrolledX;
	var scrollRelY = 		Map.Control.Scroll.ScrolledY;
	var scrollIncX = 		Map.Control.Scroll.IncreaseX;
	var scrollIncY = 		Map.Control.Scroll.IncreaseY;

	var coLen = 0; for (var i in co){ coLen++; }
/* General Functions */
	function returnKeyValue(key){
		var letters = "abcdefghijklmnopqrstuvwxyz".split("");
		for (var i = 0; i < letters.length; i++){ if (i+65 == key){ return letters[i]; } }
		var numbers = "0123456789".split("");
		for (var i = 0; i < numbers.length; i++){ if (i+48 == key){ return numbers[i]; } }
		switch(key){
			case 32: return "space"; break;
			case 37: return "\u21e6"; break;
			case 38: return "\u21e7"; break;
			case 39: return "\u21e8"; break;
			case 40: return "\u21e9"; break;
			case 96: return "numpad0"; break;
			case 97: return "numpad1"; break;
			case 98: return "numpad2"; break;
			case 99: return "numpad3"; break;
			case 100: return "numpad4"; break;
			case 101: return "numpad5"; break;
			case 102: return "numpad6"; break;
			case 103: return "numpad7"; break;
			case 103: return "numpad8"; break;
			case 103: return "numpad9"; break;
			default: break;
		}
	}

	function getKeyCode(l,b){
		var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
		for (var i = 0; i < alphabet.length; i++){ if (alphabet[i] == l){ return i + 65; } }
		switch (l){
			case "up":return 38; break;
			case "down": return 40; break;
			case "right": return 39; break;
			case "left": return 37; break;
			default: break;
		}
		if (b){ return -1; } else { return false; }
	}

	function compareObjects(Object1, Object2){
		var objOne = Object.getOwnPropertyNames(Object1);
		var objTwo = Object.getOwnPropertyNames(Object2);

		if (!(objOne.length == objTwo.length)){ return false; }

		for (var i = 0; i < objOne.length; i++){
			if (!(objOne[i] == objTwo[i])){
				return false;
			}
			if (!(Object1[objOne[i]] == Object2[objTwo[i]])){
				return false;
			}
		}
		return true;
	}
