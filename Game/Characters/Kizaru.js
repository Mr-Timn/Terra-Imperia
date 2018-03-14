var KizaruAnimations = {
	Stand: { src: "Images/Characters/OnePiece/Kizaru/Stand", 			frames: 4,  height: 64,	 speed: 180 },
	Run : { src: "Images/Characters/OnePiece/Kizaru/Run", 				frames: 8,  height: 60,	 speed: 70  },
	Jump: { src: "Images/Characters/OnePiece/Kizaru/Jump", 				frames: 9,  height: 71,  speed: 250 },
	Hurt: { src: "Images/Characters/OnePiece/Kizaru/Hurt", 				frames: 2,  height: 53,	 speed: 300 },
	Block: { src: "Images/Characters/OnePiece/Kizaru/Block",			frames: 1,  height: 37,	 speed: 100 },
	Dead: { src: "Images/Characters/OnePiece/Kizaru/Dead", 				frames: 1,  height: 17,	 speed: 100 },
	Won: { src: "Images/Characters/OnePiece/Kizaru/Won", 				frames: 5,  height: 65,  speed: 100 },
	Charge: { src: "Images/Characters/OnePiece/Kizaru/Charge",			frames: 4,	height: 85,  speed: 100 },
	Light: { src: "Images/Characters/OnePiece/Kizaru/Light", 			frames: 5,	height: 61,	 speed: 80,  damage: 2,   duration: 350, push: [5,3],   damageOn: [2,3,4] },
	Heavy: { src: "Images/Characters/OnePiece/Kizaru/Heavy", 			frames: 10, height: 69,	 speed: 65,  damage: 3,   duration: 350, push: [6,3],   damageOn: [-1,4,8] },

	Special: { src: "Images/Characters/OnePiece/Kizaru/Special", 		frames: 7,	height: 82,  speed: 150, damage: 0,   duration: 0,   push: [-3,6],  damageOn: [],  		  isCombo: true, reset: true,  par: [1,0] },
	Combo1: { src: "Images/Characters/OnePiece/Kizaru/LightSlash", 		frames: 6,	height: 60,  speed: 60,  damage: 5,   duration: 350, push: [8,4],   damageOn: [-1,2,12],  isCombo: true, reset: false, par: [0,0] },
	Combo2: { src: "Images/Characters/OnePiece/Kizaru/LightCut", 		frames: 11,	height: 60,  speed: 60,  damage: 5,   duration: 350, push: [8,4],   damageOn: [-1,2,12],  isCombo: true, reset: false, par: [0,0,"Combo1"] },
	Combo3: { src: "Images/Characters/OnePiece/Kizaru/LightStab", 		frames: 7,	height: 60,  speed: 60,  damage: 5,   duration: 350, push: [8,4],   damageOn: [-1,2,12],  isCombo: true, reset: true,  par: [0,0,"Combo2"] },
	Combo4: { src: "Images/Characters/OnePiece/Kizaru/KickUp", 			frames: 8,  height: 91,  speed: 60,  damage: 0,	  duration: 350, push: [0,0],	damageOn: [], 		  isCombo: true, reset: false, par: [0,0] },
	Combo5: { src: "Images/Characters/OnePiece/Kizaru/Teleport", 		frames: 1,  height: 91,  speed: 10,  damage: 0,	  duration: 350, push: [0,0],	damageOn: [], 		  isCombo: true, reset: true, par: [0,0] },
	Combo6: { src: "Images/Characters/OnePiece/Kizaru/Teleport", 		frames: 1,  height: 91,  speed: 10,  damage: 0,	  duration: 350, push: [0,0],	damageOn: [], 		  isCombo: true, reset: true, par: [0,0] },
	Combo7: { src: "Images/Characters/OnePiece/Kizaru/Pierce", 			frames: 6,  height: 91,  speed: 90,  damage: 0,   duration: 350, push: [0,0],	damageOn: [], 		  isCombo: true, reset: true, par: [1,0] },
	
	SpecialEffect1: {
		name: "Specialeff",
		texture: "Images/Characters/OnePiece/Kizaru/_Extra/Special1",
		speed: 100,
		frames: 1,
		height: 86,
		lifetime: 500,
		delay: 0,
		loop: { active: true, loops: 0, max: -1 },
		damage: { active: true, value: 25, push: [0,0], stun: 250, duration: 100, remove: false },
		projectile: { active: true, direction: "down", moveTo: [], speed: 35, 
			onHit: { 
				active: true,  
				texture: "Images/Characters/OnePiece/Kizaru/_Extra/Special2",
				frames: 12,
				speed: 80,
				height: 96,
				lifetime: 1250,
				delay: 0,
				effect: { active: false }
			} 
		}
	},
	PierceEffect1: {
		name: "Pierceff",
		texture: "Images/Characters/OnePiece/Kizaru/_Extra/Pierce",
		speed: 100,
		frames: 3,
		height: 86,
		lifetime: 500,
		delay: 0,
		loop: { active: true, loops: 0, max: -1 },
		damage: { active: true, value: 10, push: [0,0], stun: 250, duration: 100, remove: false },
		projectile: { active: true, direction: "rightleft", moveTo: [], speed: 35, 
			onHit: { 
				active: false,  
				texture: "Images/Characters/OnePiece/Kizaru/_Extra/Special2",
				frames: 12,
				speed: 80,
				height: 96,
				lifetime: 1250,
				delay: 0,
				effect: { active: false }
			} 
		}
	},
 	LightEffect: {
		name: "LightEff",
		texture: "Images/Characters/OnePiece/Kizaru/_Extra/Light",
		x: [85,-50],
		y: 10,
		speed: 70,
		frames: 3,
		height: 31,
		lifetime: 500,
		delay: 120,
		loop: { active: false, loops: 0, max: -1 },
		damage: { active: true, value: 3, push: [2,0], stun: 250, duration: 100, remove: false },
		projectile: { active: false, direction: "rightleft", moveTo: [], speed: 23, onHit: { active: false } }
	},
	HeavyEffect: {
		name: "HeavyEff",
		texture: "Images/Characters/OnePiece/Kizaru/_Extra/Heavy",
		x: [115,-80],
		y: -25,
		speed: 65,
		frames: 3,
		height: 97,
		lifetime: 700,
		delay: 65*4,
		loop: { active: false, loops: 0, max: -1 },
		damage: { active: true, value: 3, push: [2,0], stun: 250, duration: 100, remove: false },
		projectile: { active: false, direction: "rightleft", moveTo: [], speed: 23, onHit: { active: false } }
	},
	TeleportProj: {
		name: "Teleproj",
		texture: "Images/Characters/OnePiece/Kizaru/_Extra/Teleport",
		speed: 10000,
		frames: 0,
		height: 62,
		lifetime: 600,
		delay: 0,
		loop: { active: true, loops: 0, max: -1 },
		projectile: { active: true, direction: "up", moveTo: [], speed: 25, onHit: { active: false } },
		damage: { active: true, value: 3, push: [0,0], stun: 100, duration: 300, remove: false },
	}
}; var kizaru = KizaruAnimations;

/* Define each animation run length in milisenconds */
for (var i in KizaruAnimations){ if (!kizaru[i].hasOwnProperty("par")){ continue; }; kizaru[i].aLen = getAnimationTime(i,kizaru, kizaru.Light, kizaru.Heavy); }

var KizaruCombos = [
	/* Special */
	Special = {
		id: "Special",
		name: "special",
		description: "",
		combination: ['s','l'],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: true,
			running: false,
			timeToRun: kizaru.Special.aLen,
		},
		effect: { active: true, func: function(ppl){
			ppl.gravity = 0;
			var sp = setInterval(function(){
				if (!ppl.isCombo){ clearInterval(sp); }
				if (ppl.currentFrame == 3){ 
					var z = kizaru.SpecialEffect1;
					var p = new Particle("TeleportProj", ppl.name, ppl.x+(ppl.width/2), ppl.y+ppl.height, z.texture, z.speed, z.height, z.lifetime, z.delay, z.loop, z.frames, z.damage, z.projectile);
					clearInterval(sp);
				}
			},1);
		} },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 85 },
		isSpecial: true,
		playScene: false
	},
	LightPierce = {
		id: "Special",
		name: "combo7",
		description: "",
		combination: ['s','s','l'],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: false,
			running: false,
			timeToRun: kizaru.Combo7.aLen,
		},
		effect: { active: true, func: function(ppl){
			var sp = setInterval(function(){
				if (!ppl.isCombo){ clearInterval(sp); }
				if (ppl.currentFrame == 3){ 
					var z = kizaru.PierceEffect1;
					var p = new Particle("TeleportProj", ppl.name, ppl.x+(ppl.width/2), ppl.y+ppl.height, z.texture, z.speed, z.height, z.lifetime, z.delay, z.loop, z.frames, z.damage, z.projectile);
					clearInterval(sp);
				}
			},1);
		} },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 15 },
		isSpecial: true,
		playScene: false
	},
	/* Stage 3 */ 
	LightStab = {
		id: "Light Sword Stab",
		name: "combo3",
		description: "",
		combination: ['l','l','l'],
		requirements: {
			keysDown: { active: true, keys: ["rl"] },
			useArrows: { active: false },
			inAir: false,
			running: false,
			timeToRun: kizaru.Combo2.aLen,
			lastAttack: "combo2"
		},
		effect: { active: false },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	/* Stage 2 */ 
	LightCut = {
		id: "Light Sword Cut",
		name: "combo2",
		description: "",
		combination: ['l','l'],
		requirements: {
			keysDown: { active: true, keys: ["rl"] },
			useArrows: { active: false },
			inAir: false,
			running: false,
			timeToRun: kizaru.Combo2.aLen,
			lastAttack: "combo1"
		},
		effect: { active: false },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	UpKick = {
		id: "Up Kick",
		name: "combo4",
		description: "",
		combination: ['u','h'],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: true, keys: ['u'] },
			inAir: false,
			running: false,
			timeToRun: kizaru.Combo4.aLen,
			lastAttack: "None"
		},
		effect: { active: true, func: function(ppl){ 
			var sp = setInterval(function(){
				if (!ppl.isCombo){ clearInterval(sp); }
				if (ppl.currentFrame == 3){ 
					var z = kizaru.TeleportProj;
					var p = new Particle("TeleportProj", ppl.name, ppl.x+(ppl.width/2), ppl.y, z.texture, z.speed, z.height, z.lifetime, 0, z.loop, z.frames, z.damage, z.projectile);
					clearInterval(sp);
				}
			},1);
		} },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	/* Stage 1 */ 
	LightSlash = {
		id: "Light Sword Slash",
		name: "combo1",
		description: "",
		combination: ['l'],
		requirements: {
			keysDown: { active: true, keys: ["rl"] },
			useArrows: { active: false },
			inAir: false,
			running: false,
			timeToRun: kizaru.Combo3.aLen
		},
		effect: { active: false },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false,
		playScene: false
	},
	Teleport = {
		id: "Light Teleport",
		name: "combo5",
		description: "",
		combination: ['s'],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: false,
			running: false,
			timeToRun: kizaru.Combo5.aLen
		},
		effect: { active: true, func: function(ppl){ if (findParticle("TeleportProj")){ ppl.y = findParticle("TeleportProj").y; ppl.gravity = 0; setTimeout(function(){ ppl.softResetValues(); },425); } } },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 5 },
		isSpecial: true,
		playScene: false
	},
	Teleport2 = {
		id: "Side Teleport",
		name: "combo6",
		description: "",
		combination: ['rl','rl'],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: true, keys: ['r','lf'] },
			inAir: true,
			running: false,
			timeToRun: 300
		},
		effect: { active: true, func: function(ppl){ 
			if (ppl.ground-ppl.y < 100){ return; }
			if (ppl.dir == "right"){ if (returnFirstOpponent(ppl) && returnFirstOpponent(ppl).x-ppl.x < 300){ ppl.x = returnFirstOpponent(ppl).x; } else { ppl.x += 80; } } 
			else 				   { if (returnFirstOpponent(ppl) && returnFirstOpponent(ppl).x+ppl.x < 300){ ppl.x = returnFirstOpponent(ppl).x; } else { ppl.x -= 80; } }
		} },
		cooldown: { time: 500, hasRun: false },
		energy: { needed: 5 },
		isSpecial: false,
		playScene: false
	}
];

/*

	MAIN FUNCTION

*/

function Kizaru(plr){
	if (!(compareObjects(plr.comboList,KizaruCombos))){ plr.comboList = KizaruCombos; }
	if (!(compareObjects(plr.animationList,KizaruAnimations))){ plr.animationList = KizaruAnimations; }
	
	if (!(plr.charHealthGui == co["Kizaru"][3])){ plr.charHealthGui = co["Kizaru"][2]; }
	if (!(plr.width == co["Kizaru"][3][0])){ plr.width = co["Kizaru"][3][0]; }  
	if (!(plr.height == co["Kizaru"][3][1])){ plr.height = co["Kizaru"][3][1]; }  
	
	switch (plr.currentAnimation) {
		/* Normal Animations */
		case "standR": case "standL": createNewFrame(plr, kizaru.Stand, 0, 0); break;
		case "runR": case "runL": createNewFrame(plr, kizaru.Run, 0, 0); break;
		case "jumpR": case "jumpL": createNewFrame(plr, kizaru.Jump, 0, 0); break;
		case "hurtR": case "hurtL": createNewFrame(plr, kizaru.Hurt, 0, 0); break;
		case "blockR": case "blockL": createNewFrame(plr, kizaru.Block, 0, 0); break;
		case "deadR": case "deadL": createNewFrame(plr, kizaru.Dead, 0, 0); break;
		case "chargeR": case "chargeL": createNewFrame(plr, kizaru.Charge, 0, 0, { onFrames: [] }); break;
		/* Attack Animations */
		case "lightR": case "lightL": createNewAttackFrame(plr, kizaru.Light, 0, 0, { onFrames: kizaru.Light.damageOn }); break;
		case "heavyR": case "heavyL": createNewAttackFrame(plr, kizaru.Heavy, 0, 0, { onFrames: kizaru.Heavy.damageOn }); break;
		case "combo1R": case "combo1L": createNewAttackFrame(plr, kizaru.Combo1, 0, 0, { onFrames: kizaru.Combo1.damageOn }); break;
		case "combo2R": case "combo2L": createNewAttackFrame(plr, kizaru.Combo2, 0, 0, { onFrames: kizaru.Combo2.damageOn }); break;
		case "combo3R": case "combo3L": createNewAttackFrame(plr, kizaru.Combo3, 0, 0, { onFrames: kizaru.Combo3.damageOn }); break;
		case "combo4R": case "combo4L": createNewAttackFrame(plr, kizaru.Combo4, 0, 0, { onFrames: kizaru.Combo4.damageOn }); break;
		case "combo5R": case "combo5L": createNewAttackFrame(plr, kizaru.Combo5, 0, 0, { onFrames: kizaru.Combo5.damageOn }); break;
		case "combo6R": case "combo6L": createNewAttackFrame(plr, kizaru.Combo6, 0, 0, { onFrames: kizaru.Combo6.damageOn }); break;
		case "combo7R": case "combo7L": createNewAttackFrame(plr, kizaru.Combo7, 0, 0, { onFrames: kizaru.Combo7.damageOn }); break;
		case "specialR": case "specialL": createNewAttackFrame(plr, kizaru.Special, 0, 0, { onFrames: kizaru.Special.damageOn }); break; 
		/* ERROR */
		default: console.log("An error occurred. Invalid animation name was called. " + plr.currentAnimation + " was called."); break;
	}
}