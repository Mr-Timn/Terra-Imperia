var LuffyAnimations = {
	Stand: { src: "Images/Characters/OnePiece/Luffy/Stand", 			frames: 3,  height: 64,	 speed: 180 },
	Run : { src: "Images/Characters/OnePiece/Luffy/Run", 				frames: 8,  height: 60,	 speed: 70  },
	Jump: { src: "Images/Characters/OnePiece/Luffy/Jump", 				frames: 4,  height: 71,  speed: 250 },
	Hurt: { src: "Images/Characters/OnePiece/Luffy/Hurt", 				frames: 1,  height: 53,	 speed: 300 },
	Block: { src: "Images/Characters/OnePiece/Luffy/Block",				frames: 1,  height: 37,	 speed: 100 },
	Dead: { src: "Images/Characters/OnePiece/Luffy/Dead", 				frames: 1,  height: 17,	 speed: 100 },
	Won: { src: "Images/Characters/OnePiece/Luffy/Won", 				frames: 5,  height: 65,  speed: 100 },
	Charge: { src: "Images/Characters/OnePiece/Luffy/Charge",			frames: 4,	height: 85,  speed: 100 },
	Light: { src: "Images/Characters/OnePiece/Luffy/Punch", 			frames: 5,	height: 61,	 speed: 80,  damage: 2,   duration: 350, push: [5,3],   damageOn: [2,3,4] },
	Heavy: { src: "Images/Characters/OnePiece/Luffy/Kick", 				frames: 9, 	height: 69,	 speed: 45,  damage: 3,   duration: 350, push: [6,3],   damageOn: [-1,4,8] },

	Special: { src: "Images/Characters/OnePiece/Luffy/Special", 		frames: 20,	height: 82,  speed: 150, damage: 0,   duration: 0,   push: [-3,6],  damageOn: [],  		  isCombo: true, reset: true, par: [0,2] },
	Combo1: { src: "Images/Characters/OnePiece/Luffy/Pistol", 			frames: 18,	height: 60,  speed: 30,  damage: 5,   duration: 350, push: [8,4],   damageOn: [-1,2,12],  isCombo: true, reset: true, par: [2,0] }, 
	Combo2: { src: "Images/Characters/OnePiece/Luffy/Gear3Kick", 		frames: 20,	height: 77,  speed: 80,  damage: 10,  duration: 350, push: [15,4],  damageOn: [-1,13,17], isCombo: true, reset: true, par: [1,1] }, 
	Combo3: { src: "Images/Characters/OnePiece/Luffy/PunchUp", 			frames: 10, height: 72,  speed: 75,  damage: 0,   duration: 350, push: [0,8],   damageOn: [],  		  isCombo: true, reset: true, par: [2,0] },
	Combo4: { src: "Images/Characters/OnePiece/Luffy/Gear3PunchUp", 	frames: 17, height: 94,  speed: 75,  damage: 15,  duration: 350, push: [10,15], damageOn: [-1,8,16],  isCombo: true, reset: true, par: [0,0] },
	Combo5: { src: "Images/Characters/OnePiece/Luffy/PunchDown", 		frames: 11, height: 72,  speed: 65,  damage: 0,  duration: 350, push: [0,-3], 	damageOn: [],  		  isCombo: true, reset: true, par: [0,0] },
	Combo6: { src: "Images/Characters/OnePiece/Luffy/KickDown",			frames: 4,  height: 116, speed: 70,  damage: 5,   duration: 350, push: [0,-5],  damageOn: [0,1,2],    isCombo: true, reset: true, par: [0,0] },

	PunchUpEffect: {
		name: "PunchUp",
		texture: "Images/Characters/OnePiece/Luffy/_Extra/PunchUp",
		speed: 25,
		frames: 12,
		height: 28,
		lifetime: 1000,
		delay: 0,
		loop: { active: false, loops: 0, max: 0 },
		damage: { active: true, value: 3, push: [0,8], stun: 100, reset: 350, remove: false },
		projectile: { active: true, direction: "up", moveTo: [0,0], speed: .85, onHit: { active: false } }
	},
 	SpecialEffect1: {
		name: "SPPunch",
		texture: "Images/Characters/OnePiece/Luffy/_Extra/Special1",
		speed: 100,
		frames: 1,
		height: 56,
		lifetime: 225,
		delay: 0,
		loop: { active: true, loops: 0, max: -1 },
		damage: { active: true, value: 5, push: [0,0], stun: 250, duration: 100, remove: false },
		projectile: { active: true, direction: "rightleft", moveTo: [], speed: 23, 
			onHit: { 
				active:true,  
				texture: "Images/Characters/OnePiece/Luffy/_Extra/Special2",
				frames: 4,
				speed: 80,
				height: 119,
				lifetime: 1000,
				delay: 0,
				effect: { active:false }
			} 
		}
	},
	PunchDownEffect: {
		name: "PunchDown",
		texture: "Images/Characters/OnePiece/Luffy/_Extra/PunchDown",
		frames: 3,
		speed: 80,
		height: 95,
		lifetime: 1500,
		delay: 65*4,
		loop: { active: false },
		damage: { active: true, value: 10, push: [0,-3], stun: 250, reset: 450, remove: false },
		projectile: { active: false, onHit: { active: false } }
	}
}; var luffy = LuffyAnimations;

/* Define each animation run length in milisenconds */
for (var i in LuffyAnimations){ if (!luffy[i].hasOwnProperty("par")){ continue; }; luffy[i].aLen = getAnimationTime(i,luffy, luffy.Light, luffy.Heavy); }

var LuffyCombos = [
	special = {
		id: "Special",
		name: "special",
		description: "",
		combination: ['l','l','s'],
		requirements: {
			keysDown: { active: false, keys:["rl"] },
			useArrows: { active: false, keys:[] },
			inAir: false,
			running: false,
			timeToRun: luffy.Special.aLen
		},
		effect: { active: true, func: 
			function(ppl){ 
				var z = luffy.SpecialEffect1;
				var punch = setInterval(function(){
					if (!(ppl.isCombo)){ clearInterval(punch); } 
					if (ppl.currentFrame > 10 && ppl.currentFrame < 17){
						var p = new Particle(z.name, ppl.name, ppl.x, ppl.y+Math.random()*(ppl.height/2), z.texture, z.speed, z.height, z.lifetime, 50, z.loop, z.frames, z.damage, z.projectile);
					}
				},1);
			} 
		},
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 100 },
		isSpecial: true,
		playScene: false
	},
	gear3PunchUp = {
		id: "Gear 3 Sky Punch",
		name: "combo4",
		combination: ['u','s','l'],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: true, keys: ["u"] },
			inAir: false,
			running: false,
			timeToRun: luffy.Combo4.aLen
		},
		effect: { active: false },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 50 },
		isSpecial: true
	},
	pistol = {
		id: "Pistol",
		name: "combo1",
		combination: ['l','l','l'],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: false,
			running: false,
			timeToRun: luffy.Combo1.aLen
		},
		effect: { active: false, func: function(ppl){  } },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false
	},
	gear3kick = {
		id: "Gear 3 Kick",
		name: "combo2",
		combination: ['h','l','h'],
		requirements: {
			keysDown: { active: false, keys: []},
			useArrows: { active: false, keys: []},
			inAir: false,
			running: false,
			timeToRun: luffy.Combo2.aLen
		},
		effect: {active: false, func: function(ppl){  } },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false
	},
	upPunch = {
		id: "Sky Punch",
		name: "combo3",
		combination: ['l','l','u'],
		requirements: {
			keysDown: { active: false, keys: [] },
			useArrows: { active: true, keys: ["u"] },
			inAir: false,
			running: false,
			timeToRun: luffy.Combo3.aLen
		},
		effect: { active: true, func: 
			function(ppl){ 
				var z = luffy.PunchUpEffect;
				var punch = setInterval(function(){
					if (!(ppl.isCombo)){ clearInterval(punch); } 
					if (ppl.currentFrame > 3 && ppl.currentFrame < 9){
						var p = new Particle(z.name, ppl.name, ppl.x+(Math.random()*ppl.width), ppl.y, z.texture, z.speed, z.height, z.lifetime, 70, z.loop, z.frames, z.damage, z.projectile);
					}
				},1);
			}
		},
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 0 },
		isSpecial: false
	},
	downPunch = {
		id: "Down Punch",
		name: "combo5",
		combination: ['s','l'],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: true,
			running: true,
			timeToRun: luffy.Combo5.aLen
		},
		effect: { active: true, func: 
			function(ppl){ 
				ppl.y -= 30; 
				ppl.gravity = 0; 
				var z = luffy.PunchDownEffect;
				var p = new Particle(z.name+Math.random(), ppl.name, ppl.x+(ppl.width/2), canvasHeight-z.height, z.texture, z.speed, z.height, z.lifetime, z.delay, z.loop, z.frames, z.damage, z.projectile);
			} 
		},
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 25 },
		isSpecial: true
	},
	downKick = {
		id: "Down Kick",
		name: "combo6",
		combination: ['d','h'],
		requirements: {
			keysDown: { active: false },
			useArrows: { active: false },
			inAir: true,
			running: false,
			timeToRun: luffy.Combo6.aLen
		},
		effect: { active: true, func: function(ppl){ ppl.velY = 0; ppl.gravity = 0; } },
		cooldown: { time: 100, hasRun: false },
		energy: { needed: 10 },
		isSpecial: false
	}
];

/*

	MAIN FUNCTION

*/

function Luffy(plr){
	if (!(compareObjects(plr.comboList,LuffyCombos))){ plr.comboList = LuffyCombos; }
	if (!(compareObjects(plr.animationList,LuffyAnimations))){ plr.animationList = LuffyAnimations; }
	
	if (!(plr.charHealthGui == co["Luffy"][2])){ plr.charHealthGui = co["Luffy"][2]; }
	if (!(plr.width == co["Luffy"][3][0])){ plr.width = co["Luffy"][3][0]; }  
	if (!(plr.height == co["Luffy"][3][1])){ plr.height = co["Luffy"][3][1]; }  
	
	switch (plr.currentAnimation) {
		/* Normal Animations */
		case "standR": case "standL": createNewFrame(plr, luffy.Stand, 0, 0); break;
		case "runR": case "runL": createNewFrame(plr, luffy.Run, 0, 0); break;
		case "jumpR": case "jumpL": createNewFrame(plr, luffy.Jump, 0, 0); break;
		case "hurtR": case "hurtL": createNewFrame(plr, luffy.Hurt, 0, 0); break;
		case "blockR": case "blockL": createNewFrame(plr, luffy.Block, 0, 0); break;
		case "deadR": case "deadL": createNewFrame(plr, luffy.Dead, 0, 0); break;
		case "chargeR": case "chargeL": createNewFrame(plr, luffy.Charge, 0, 0, { onFrames: [] }); break;
		/* Attack Animations */
		case "lightR": case "lightL": createNewAttackFrame(plr, luffy.Light, 0, 0, { onFrames: luffy.Light.damageOn }); break;
		case "heavyR": case "heavyL": createNewAttackFrame(plr, luffy.Heavy, 0, 0, { onFrames: luffy.Heavy.damageOn }); break;
		case "combo1R": case "combo1L": createNewAttackFrame(plr, luffy.Combo1, 0, 0, { onFrames: luffy.Combo1.damageOn }); break;
		case "combo2R": case "combo2L": createNewAttackFrame(plr, luffy.Combo2, 0, 0, { onFrames: luffy.Combo2.damageOn }); break;
		case "combo3R": case "combo3L": createNewAttackFrame(plr, luffy.Combo3, 0, 0, { onFrames: luffy.Combo3.damageOn }); break;
		case "combo4R": case "combo4L": createNewAttackFrame(plr, luffy.Combo4, 0, 0, { onFrames: luffy.Combo4.damageOn }); break;
		case "combo5R": case "combo5L": createNewAttackFrame(plr, luffy.Combo5, 0, 0, { onFrames: luffy.Combo5.damageOn }); break;
		case "combo6R": case "combo6L": createNewAttackFrame(plr, luffy.Combo6, 0, 0, { onFrames: luffy.Combo6.damageOn }); break;
		case "specialR": case "specialL": createNewAttackFrame(plr, luffy.Special, 0, 0, { onFrames: luffy.Special.damageOn }); break; 
		/* ERROR */
		default: console.log("An error occurred. Invalid animation name was called. " + plr.currentAnimation + " was called."); break;
	}
}