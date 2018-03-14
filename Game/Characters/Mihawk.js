var MihawkAnimations = {
	Stand: { src: "Images/Characters/OnePiece/Mihawk/Stand", 		frames: 3,  height: 64,	 speed: 180 },
	Run: { src: "Images/Characters/OnePiece/Mihawk/Run", 			frames: 8,  height: 60,	 speed: 70  },
	Jump: { src: "Images/Characters/OnePiece/Mihawk/Jump", 			frames: 4,  height: 71,  speed: 250 },
	Hurt: { src: "Images/Characters/OnePiece/Mihawk/Hurt", 			frames: 1,  height: 53,	 speed: 300 },
	Block: { src: "Images/Characters/OnePiece/Mihawk/Block",		frames: 1,  height: 37,	 speed: 100 },
	Dead: { src: "Images/Characters/OnePiece/Mihawk/Dead", 			frames: 1,  height: 17,	 speed: 100 },
	Won: { src: "Images/Characters/OnePiece/Mihawk/Won", 			frames: 5,  height: 65,  speed: 100 },
	Charge: { src: "Images/Characters/OnePiece/Mihawk/Charge",		frames: 4,	height: 85,  speed: 100 },
	Light: { src: "Images/Characters/OnePiece/Mihawk/Light", 		frames: 6,	height: 61,	 speed: 65,  damage: 2,   duration: 350, push: [5,3],   damageOn: [-1,3,4] },
	Heavy: { src: "Images/Characters/OnePiece/Mihawk/Heavy", 		frames: 7, 	height: 69,	 speed: 70,  damage: 3,   duration: 350, push: [6,3],   damageOn: [-1,3,6] },

	Special: { src: "Images/Characters/OnePiece/Mihawk/Special", 	frames: 24,	height: 82,  speed: 80,  damage: 8,   duration: 100, push: [-2,6],  damageOn: [-1,3,8,-1,13,15,-1,19,22], isCombo: true, reset: true, par: [1,1,"Combo1"] },
	Combo1: { src: "Images/Characters/OnePiece/Mihawk/Carve", 		frames: 5,	height: 60,  speed: 110, damage: 4,   duration: 450, push: [1,0],   damageOn: [-1,2,4],  isCombo: true, reset: false, par: [1,0] },
	Combo2: { src: "Images/Characters/OnePiece/Mihawk/Slice", 		frames: 7,	height: 60,  speed: 80,  damage: 4,   duration: 450, push: [1,0],   damageOn: [-1,2,5],  isCombo: true, reset: true, par: [1,0] },
	Combo3: { src: "Images/Characters/OnePiece/Mihawk/Chop", 		frames: 9,	height: 60,  speed: 80,  damage: 4,   duration: 450, push: [1,0],   damageOn: [-1,2,9],  isCombo: true, reset: true,  par: [0,0,"Combo2"] },
	Combo4: { src: "Images/Characters/OnePiece/Mihawk/UpSlice", 	frames: 9,	height: 60,  speed: 80,  damage: 4,   duration: 450, push: [1,0],   damageOn: [-1,3,5],  isCombo: true, reset: false, par: [0,0,"Combo2"] },
	Combo5: { src: "Images/Characters/OnePiece/Mihawk/DownSlice", 	frames: 9,	height: 60,  speed: 55,  damage: 7,   duration: 450, push: [1,0],   damageOn: [-1,6,7],  isCombo: true, reset: true,  par: [0,0,"Combo4"] },
	Combo6: { src: "Images/Characters/OnePiece/Mihawk/JumpCut", 	frames: 6,	height: 60,  speed: 65,  damage: 3,   duration: 450, push: [1,0],   damageOn: [-1,2,3],  isCombo: true, reset: false, par: [1,0] }, 
	Combo7: { src: "Images/Characters/OnePiece/Mihawk/JumpSlice", 	frames: 6,	height: 60,  speed: 65,  damage: 4,   duration: 450, push: [1,0],   damageOn: [-1,3,5],  isCombo: true, reset: true,  par: [0,0,"Combo6"] }, 
	Combo8: { src: "Images/Characters/OnePiece/Mihawk/Slash", 		frames: 7,  height: 60,  speed: 95,  damage: 5,   duration: 350, push: [1,0],   damageOn: [-1,2,4],  isCombo: true, reset: false, par: [0,1] },
	Combo9: { src: "Images/Characters/OnePiece/Mihawk/Cut", 		frames: 7,  height: 60,  speed: 85,  damage: 5,   duration: 350, push: [1,0],   damageOn: [-1,2,4],  isCombo: true, reset: false, par: [0,0,"Combo8"] },
	Combo10: { src: "Images/Characters/OnePiece/Mihawk/UpStab", 	frames: 6,  height: 60,  speed: 85,  damage: 5,   duration: 350, push: [1,0],   damageOn: [-1,2,5],  isCombo: true, reset: false, par: [0,0,"Combo8"] },
	Combo11: { src: "Images/Characters/OnePiece/Mihawk/Stab", 		frames: 7,  height: 60,  speed: 85,  damage: 6,   duration: 350, push: [7,0],   damageOn: [-1,1,6],  isCombo: true, reset: false, par: [0,0,"Combo8"] },
	
	SpecialParticle: {
		name: "SpEff",
		texture: "Images/Characters/OnePiece/Mihawk/_Extra/Special",
		speed: 250,
		frames: 3,
		height: 47,
		lifetime: 1500,
		delay: 0,
		loop: { active: false, loops: 0, max: 0 },
		damage: { active: true, value: 20, push: [0,0], stun: 0, duration: 250, remove: false },
		projectile: { active: true, direction: "rightleft", moveTo: [], speed: 35, onHit: { active: false } }
	},
	DownSliceParticle: {
		name: "SliceEff",
		texture: "Images/Characters/OnePiece/Mihawk/_Extra/DownSlice",
		speed: 90,
		frames: 1,
		height: 104,
		lifetime: 1500,
		delay: 0,
		loop: { active: true, loops: 0, max: -1 },
		damage: { active: true, value: 2, push: [0,0], stun: 0, duration: 250, remove: false },
		projectile: { active: true, direction: "rightleft", moveTo: [], speed: 25, onHit: { active: false } }
	}
}; var mihawk = MihawkAnimations;

/* Define each animation run length in milisenconds */
for (var i in MihawkAnimations){ if (!mihawk[i].hasOwnProperty("par")){ continue; }; mihawk[i].aLen = getAnimationTime(i,mihawk, mihawk.Light, mihawk.Heavy); }

var MihawkCombos = [
	Special = {
		id: "Special",
		name: "special",
		description: "",
		combination: ["l","l","h","l","s"],
		requirements: {
			keysDown: { active: false, keys:[] },
			useArrows: { active: false, keys:[] },
			inAir: false,
			running: false,
			timeToRun: mihawk.Special.aLen
		},
		effect: { active: true, func: function(ppl){ 
			var sp = setInterval(function(){
				if (!ppl.isCombo){ clearInterval(sp); }
				if (ppl.currentFrame == 20){ 
					var z = mihawk.SpecialParticle;
					var p = new Particle(z.name, ppl.name, ppl.x, ppl.y+(z.height/2), z.texture, z.speed, z.height, z.lifetime, 0, z.loop, z.frames, z.damage, z.projectile);
					clearInterval(sp);
				}
			},1);
		} },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 100 },
		isSpecial: true,
		playScene: false
	},
	Chop = {
		id: "Chop",
		name: "combo3",
		description: "",
		combination: ["l","l","l","u"],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: true, keys: ["u"] },
			inAir: false,
			running: false,
			timeToRun: mihawk.Combo3.aLen,
			lastAttack: "combo2"
		},
		effect: { active: false },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false,
	},
	DownSlice = {
		id: "Down Slice",
		name: "combo5",
		description: "",
		combination: ["l","l","u","d"],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: true, keys: ["u","d"] },
			inAir: false,
			running: false,
			timeToRun: mihawk.Combo5.aLen,
			lastAttack: "combo4"
		},
		effect: { active: true, func: 
			function(ppl){
				var hasRun = false;
				var waitForFrame2 = setInterval(function(){
					if (!(ppl.isCombo)){ clearInterval(waitForFrame2); } 
					if (ppl.currentFrame > 6 && ppl.velY < 21){ ppl.velY = 25; if (ppl.currentFrame == 8 && !hasRun){ ppl.currentFrame -=1; hasRun = ppl.platform; }
					} else { ppl.velY = .15; }
					if (hasRun){
						var z = mihawk.DownSliceParticle;
						var p = new Particle(z.name, ppl.name, ppl.x, ppl.y, z.texture, z.speed, z.height, z.lifetime, 0, z.loop, z.frames, z.damage, z.projectile);
						clearInterval(waitForFrame2);
					}
				},1); 
		} },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false,
	},
	UpSlice = {
		id: "Slice",
		name: "combo4",
		description: "",
		combination: ["l","l","u"],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: true, keys: ["u"] },
			inAir: false,
			running: false,
			timeToRun: mihawk.Combo4.aLen,
			lastAttack: "combo1"
		},
		effect: { active: true, func: 
			function(ppl){
				var waitForFrame1 = setInterval(function(){
					if (!(ppl.isCombo)){ clearInterval(waitForFrame1); } 
					if (ppl.currentFrame == 3 && ppl.velY > -1){
						ppl.velY -= 10;
					}
				},1);
			} 
		},
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	Slice = {
		id: "Slice",
		name: "combo2",
		description: "",
		combination: ["l","l","l"],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: false,
			running: false,
			timeToRun: mihawk.Combo2.aLen,
			lastAttack: "combo1"
		},
		effect: { active: false },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	Carve = {
		id: "Carve",
		name: "combo1",
		description: "",
		combination: ["l","l"],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: false,
			running: false,
			timeToRun: mihawk.Combo1.aLen
		},
		effect: { active: false },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	JumpCut = {
		id: "Jump Cut",
		name: "combo6",
		description: "",
		combination: ["l"],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: true,
			running: false,
			timeToRun: mihawk.Combo6.aLen
		},
		effect: { active: true, func: function(ppl){ ppl.velY -= 2; } },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	JumpSlice = {
		id: "Jump Slice",
		name: "combo7",
		description: "",
		combination: ["l","h"],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: true,
			running: false,
			timeToRun: mihawk.Combo7.aLen,
			lastAttack: "combo6"
		},
		effect: { active: true, func: function(ppl){ ppl.velY += 2; } },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	Slash = {
		id: "Slash",
		name: "combo8",
		description: "",
		combination: ["h","h"],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: false,
			running: false,
			timeToRun: mihawk.Combo8.aLen
		},
		effect: { active: false },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	Cut = {
		id: "Cut",
		name: "combo9",
		description: "",
		combination: ["h","h","l"],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: false,
			running: false,
			timeToRun: mihawk.Combo9.aLen
		},
		effect: { active: false },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	Stab = {
		id: "Stab",
		name: "combo11",
		description: "",
		combination: ["h","h","rl","rl"],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: true, keys: ["r","l"] },
			inAir: false,
			running: false,
			timeToRun: mihawk.Combo10.aLen
		},
		effect: { active: true, func: function(ppl){ if (ppl.dir == "right"){ ppl.velX += 15; } else{ ppl.velX -= 15; } } },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	UpStab = {
		id: "UpStab",
		name: "combo9",
		description: "",
		combination: ["h","l","u"],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: true, keys: ["u"] },
			inAir: false,
			running: false,
			timeToRun: mihawk.Combo10.aLen
		},
		effect: { active: false },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	}
];

/*

	MAIN FUNCTION

*/

function Mihawk(plr){
	if (!(compareObjects(plr.comboList,MihawkCombos))){ plr.comboList = MihawkCombos; }
	if (!(compareObjects(plr.animationList,MihawkAnimations))){ plr.animationList = MihawkAnimations; }
	
	if (!(plr.charHealthGui == co["Mihawk"][2])){ plr.charHealthGui = co["Mihawk"][2]; }
	if (!(plr.width == co["Mihawk"][3][0])){ plr.width = co["Mihawk"][3][0]; }  
	if (!(plr.height == co["Mihawk"][3][1])){ plr.height = co["Mihawk"][3][1]; }  
	
	switch (plr.currentAnimation){
		/* Normal Animations */
		case "standR": case "standL": createNewFrame(plr, mihawk.Stand, 0, 0); break;
		case "runR": case "runL": createNewFrame(plr, mihawk.Run, 0, 0); break;
		case "jumpR": case "jumpL": createNewFrame(plr, mihawk.Jump, 0, 0); break;
		case "hurtR": case "hurtL": createNewFrame(plr, mihawk.Hurt, 0, 0); break;
		case "blockR": case "blockL": createNewFrame(plr, mihawk.Block, 0, 0); break;
		case "deadR": case "deadL": createNewFrame(plr, mihawk.Dead, 0, 0); break;
		case "chargeR": case "chargeL": createNewFrame(plr, mihawk.Charge, 0, 0, { onFrames: [] }); break;
		/* Attack Animations */
		case "lightR": case "lightL": createNewAttackFrame(plr, mihawk.Light, 0, 0, { onFrames: mihawk.Light.damageOn }); break;
		case "heavyR": case "heavyL": createNewAttackFrame(plr, mihawk.Heavy, 0, 0, { onFrames: mihawk.Heavy.damageOn }); break;
		case "combo1R": case "combo1L": createNewAttackFrame(plr, mihawk.Combo1, 0, 0, { onFrames: mihawk.Combo1.damageOn }); break;
		case "combo2R": case "combo2L": createNewAttackFrame(plr, mihawk.Combo2, 0, 0, { onFrames: mihawk.Combo2.damageOn }); break;
		case "combo3R": case "combo3L": createNewAttackFrame(plr, mihawk.Combo3, 0, 0, { onFrames: mihawk.Combo3.damageOn }); break;
		case "combo4R": case "combo4L": createNewAttackFrame(plr, mihawk.Combo4, 0, 0, { onFrames: mihawk.Combo4.damageOn }); break;
		case "combo5R": case "combo5L": createNewAttackFrame(plr, mihawk.Combo5, 0, 0, { onFrames: mihawk.Combo5.damageOn }); break;
		case "combo6R": case "combo6L": createNewAttackFrame(plr, mihawk.Combo6, 0, 0, { onFrames: mihawk.Combo6.damageOn }); break;
		case "combo7R": case "combo7L": createNewAttackFrame(plr, mihawk.Combo7, 0, 0, { onFrames: mihawk.Combo7.damageOn }); break;
		case "combo8R": case "combo8L": createNewAttackFrame(plr, mihawk.Combo8, 0, 0, { onFrames: mihawk.Combo8.damageOn }); break;
		case "combo9R": case "combo9L": createNewAttackFrame(plr, mihawk.Combo9, 0, 0, { onFrames: mihawk.Combo9.damageOn }); break;
		case "combo10R": case "combo10L": createNewAttackFrame(plr, mihawk.Combo10, 0, 0, { onFrames: mihawk.Combo10.damageOn }); break;
		case "combo11R": case "combo11L": createNewAttackFrame(plr, mihawk.Combo11, 0, 0, { onFrames: mihawk.Combo11.damageOn }); break;
		case "specialR": case "specialL": createNewAttackFrame(plr, mihawk.Special, 0, 0, { onFrames: mihawk.Special.damageOn }); break; 
		/* ERROR */
		default: console.log("An error occurred. Invalid animation name was called. " + plr.currentAnimation + " was called."); break;
	}
}