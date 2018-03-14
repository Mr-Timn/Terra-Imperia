

function getAnimationTime(a,p,l,h){
	var t = p[a].frames * p[a].speed;
		
	t += p[a].par[0] * l.frames * l.speed + 425;
	t += p[a].par[1] * h.frames * h.speed + 425;
	if (p[a].par[2]){
		for (var i = 2; i < p[a].par.length; i++){
			//console.log("Getting child " + p[a].par[i]);
			t += getAnimationTime(p[a].par[i],p,l,h);
		}
		return t;
	}
	return t - (p[a].frames * p[a].speed);
}

function returnFirstOpponent(plr){
	for (var i = 0; i < players.length; i++){
		if (players[i].name == plr.name){ continue; }
		return players[i];
	}
	return false;
}

function returnPlayer(name){
	for (var i = 0; i < players.length; i++){
		if (players[i].name == name){
			return players[i];
		}
	}
	return false;
}

function comparePlayers(){
	for (var i in players[0],players[1]){
		if (typeof i != 'function'){
			if (!(players[0][i] == players[1][i])){
				console.log(i);
			}
		}
	}
}

function Player(Name, X, Y, Width, Height, Speed, Ground, Friction, Gravity, JumpPower, MaxHealth, MaxEnergy, EnergyGain, ChargeSpeed, HealthPos, StartAnimation, StartDirection, mKeys, Character, IsAI){
	this.name = Name;
	this.x = X;
	this.y = Y;
	this.width = Width;
	this.height = Height;
	this.speed = Speed;
	this.friction = Friction;
	this.gravity = Gravity;
	this.character = Character;
	this.jumpPower = JumpPower;
	this.health = MaxHealth;
	this.maxHealth = MaxHealth;
	this.energy = MaxEnergy;
	this.maxEnergy = MaxEnergy;
	this.healthPos = HealthPos;
	this.dir = StartDirection;
	this.currentAnimation = StartAnimation;
	this.energyGain = EnergyGain;
	this.chargeSpeed = ChargeSpeed;
	
	this.canBeStunned = true;
	this.canBeUnstunned = true;
	this.jumping = false;
	this.platform = false;
	this.falling = false;
	this.waitForFrame = false;
	this.stunned = false;
	this.dead = false;
	this.checked = false;
	this.isCombo = false; 
	this.blocking = false;
	this.charging = false;
	this.running = false;
	this.attacking = false;
	this.comboList = false;
	this.animationList = false;
	this.currentAttack = false;
	
	this.lastAttack = "";
	this.currentFrame = 0;
	this.animationSpeed = 0;
	this.ground = 10000;
	this.resetComboTime = 0;
	this.velX = 0;
	this.velY = 0;
	this.wasDamagedBy = [];
	this.combo = [];
	this.lastCombo = [];
	
	this.keys = [];
	
	this.controls = {
		"up": getKeyCode(mKeys[0]) || mKeys[0],
		"down": getKeyCode(mKeys[1]) || mKeys[1],
		"right": getKeyCode(mKeys[2]) || mKeys[2],
		"left": getKeyCode(mKeys[3]) || mKeys[3],
		"jump": getKeyCode(mKeys[4]) || mKeys[4],
		"light": getKeyCode(mKeys[5]) || mKeys[5],
		"heavy": getKeyCode(mKeys[6]) || mKeys[6],
		"special": getKeyCode(mKeys[7]) || mKeys[7]
	}
	
	if (IsAI == "AI"){ 
		this.AI = true; 
		this.ignoreKeyInput = true; 
		this.difficulty = -5; 
		this.keys = []; 
		this.action = "MoveToPlayer"; 
		this.actionObj = []; 
	} else if (IsAI == "Player"){ 
		this.AI = false; 
		this.ignoreKeyInput = false; 
	}
	
	this.changeAnimation = function(ani){
		this.currentAnimation = ani + this.dir.substring(0,1).toUpperCase();
	}
	this.hasDied = function(){
		if (this.health <= 0){
			this.dead = true;
			this.stunned = true;
			this.isCombo = false;
			this.velX = 0;
			this.velY = 0;
			this.changeAnimation("dead");
			this.ignoreKeyInput = true;
		}
	}
	this.changeEnergy = function(e){
		if (e > 0){
			this.energy += e;
			if (this.energy > this.maxEnergy){ this.energy = this.maxEnergy; }
		} else {
			this.energy += e;
			if (this.energy < 0){ this.energy = 0; }
		}
	}
	this.checkWasDamagedBy = function(key){
		for (var i in this.wasDamagedBy){ if (this.wasDamagedBy[i] == key){ return true; } } return false;
	}
	this.removeDamageKey = function(key){
		for (var i in this.wasDamagedBy){ if (key == this.wasDamagedBy[i]){ this.wasDamagedBy.splice(i,1); } }
	}	
	this.attacked = function(d){
		var key = d.name + " " + d.owner;
		if (!(this.checkWasDamagedBy(key)) && !(this.dead) && !(this.blocking)){
			this.wasDamagedBy.push(key);
			this.health -= d.damage;
			this.changeAnimation("hurt");
			this.changeEnergy(this.energyGain);
			returnPlayer(d.owner).changeEnergy((returnFirstOpponent(d.owner).energyGain)*2);
			this.velY += d.push[1]; switch (d.direction){ case "right": this.velX += d.push[0]; break; case "left": this.velX -= d.push[0]; break; }
			if (this.canBeStunned){ this.stunned = true; var s = function(p){ setTimeout(function(){ if (p.canBeUnstunned){ p.stunned = false; } },285) }; s(this); }
			var r = function(p,key){ setTimeout(function(){ p.removeDamageKey(key); },d.duration); }; r(this,key); 
		}
	}
	this.AIFunction1 = function(pp){
		if (typeof pp.resetKeys == "undefined"){ 
			pp.resetKeys = function(){ 
				for (var i = 0; i < pp.keys.length; i++){ 
					if (pp.keys[i] == true){ 
						pp.keys[i] = false; 
					} 
				} 
			} 
		} 
		if (typeof pp.checkDistance == "undefined"){ 
			pp.checkDistance = function(cp,d){ 
				var opp = returnFirstOpponent(cp);
				//console.log(Math.abs(cp.x-opp.x)); 
				if (Math.abs(cp.x-opp.x) < d){ 
					return true; 
				} else{ 
					return false;
				} 
			} 
		}
		if (typeof pp.keyDown == "undefined"){ 
			pp.keyDown = function(key,ud){
				switch(key){
					case "right": 
						pp.dir = "right"; 
						pp.keys[pp.controls.right] = ud; 
						break;
					case "left": 
						pp.dir = "left"; 
						pp.keys[pp.controls.left] = ud; 
						break;
					case "up": 
						pp.keys[pp.controls.up] = ud; 
						break;
					case "down": 
						pp.keys[pp.controls.down] = ud; 
						break;
					case "punch": 
						pp.keys[pp.controls.light] = ud; 
						break;
					case "kick": 
						pp.keys[pp.controls.heavy] = ud; 
						break;
					default: 
						console.log("Error Incorrect AI key pressed: " + key); 
						break;
				}
			}
		}
		
		var options = ["RunFromPlayer","Punch","Kick","Block"/*,"TryToCombo"*/];
		
		//console.log("CURRENT ACTION: " + pp.action);
		switch (pp.action){ 
			case "Stand": 
				if (pp.dir == "right"){ 
					pp.currentAnimation = "standR"; 
				} else { 
					pp.currentAnimation = "standL"; 
				} 
				break;
			case "Choose": 
				pp.resetKeys(); 
				pp.action = options[Math.floor(Math.random()*options.length)]; 
				break;
			case "MoveToPlayer": 
				pp.action = "MovingToPlayer"; 
				setTimeout(function(){ 
					var opp = returnFirstOpponent(pp); 
					if (opp.x > pp.x){ 
						pp.keyDown("right",true); 
					} else { 
						pp.keyDown("left",true); 
					} 
				},Math.random()*(this.difficulty*350) + 100 ); 
				break;
			case "MovingToPlayer": 
				if (pp.checkDistance(pp,15)){ 
					pp.action = "Choose"; 
				} 
				break;
			case "RunFromPlayer": 
				var dir; 
				if (Math.random() > .5){ 
					dir = "right" 
				} else { 
					dir = "left" 
				} 
				var len = Math.random()*500 + (Math.random()*300);
				if (pp.checkDistance(pp,300) == false){ 
					pp.action = "MoveToPlayer"; 
				} else { 
					pp.actionObj = [dir,len]; 
					pp.action = "RunningFromPlayer"; 
					if (dir === "right"){ 
						pp.keyDown("right",true); 
					} else { 
						pp.keyDown("left",true);
					} 
					setTimeout(function(){ 
						pp.action = "Choose"; 
					},len); 
				}
				break;
			case "RunningFromPlayer":  
				if (pp.checkDistance(pp,500) == false){ 
					pp.action = "MoveToPlayer";
				}
				break;
			case "Block": 
				pp.action = "Blocking"; 
				pp.keyDown("down",true); 
				setTimeout(function(){ 
					pp.action = "Choose"; 
				},Math.random()*700+450); 
				break;
			case "Blocking": 
			
				break;
			case "Punch": 
				if (pp.checkDistance(pp,100)){ 
					pp.keyDown("punch",true); 
					pp.action = "Punching"; 
				} else { 
				console.log("Too far to punch");
					pp.action = "MoveToPlayer"; 
				} 
				break;
			case "Punching": 
				if (pp.currentAnimation == "standR" || pp.currentAnimation == "standL"){ 
					pp.keyDown("kick",false); 
					pp.action = "Choose"; 
				} 
				break;
			case "Kick": 
				if (pp.checkDistance(pp,50)){ 
					pp.keyDown("kick",true); 
					pp.action = "Kicking"; 
				} else { 
					pp.action = "MoveToPlayer"; 
				} 
				break;
			case "Kicking": 
				if (pp.currentAnimation == "standR" || pp.currentAnimation == "standL"){ 
					pp.keyDown("kick",false); 
					pp.action = "Choose"; 
				} 
				break;
			case "TryToCombo": 
				
				pp.action = "Comboing";
				break;
			case "Comboing":
				
				break;
			
			default: 
				console.log("Error: Action " + pp.action + " was called."); 
				break;
		}	
	}
	this.softResetValues = function(){ 
		this.speed = Speed; 
		this.velX = 0; 
		this.velY = 0; 
		this.friction = Friction; 
		this.gravity = Gravity; 
		this.jumpPower = JumpPower;
		this.attacking = false;
		this.charging = false;
		this.changeAnimation("stand");
	}
	this.checkLastAttack = function(){
		if (this.lastAttack == "l" || this.lastAttack == "h"){ return true; } else { return false; }
	}
	this.createComboObj = function(k,n){
		var t = new Date().getTime();
		var newComboObj = { key: k, time: t }
		if (n == 1){ this.combo.push(newComboObj); } 
		else if (n == 2){ this.checkIfCombo(newComboObj,this); }  
	}
	this.checkIfCombo = function(nKey,plr){ 
		setTimeout(function(){
			if (plr.lastCombo.length < plr.combo.length){ plr.lastCombo.push(nKey); }
			if (plr.combo.length == plr.lastCombo.length){ 
				var allSame = true; for (var i in plr.combo){ if (!compareObjects(plr.combo[i],plr.lastCombo[i])){ allSame = false; } }
				if (allSame){ plr.combo = []; plr.lastCombo = []; }
			} 
		},plr.resetComboTime);
	}
	this.checkForCombo = function(){
		if (this.isCombo){ return; }
		
		var up = 		this.controls.up;
		var down = 		this.controls.down;
		var right = 	this.controls.right;
		var left = 		this.controls.left;
		var jump = 		this.controls.jump;
		var lak = 		this.controls.light;
		var hak = 		this.controls.heavy;
		var spl =		this.controls.special;
		
		var newAnimation = "nothing";
		for (var i = 0; i < this.comboList.length; i++){
			var cc = this.comboList[i]; if (cc.hasOwnProperty("src") || cc.cooldown.hasRun || this.combo.length < cc.combination.length){ continue; }
						
			/* Check requirments */
			var keysAreDown = true; 
			if (cc.requirements.keysDown.active){
				for (var o = 0; o < cc.requirements.keysDown.keys.length; o++){
					var cKey;
					if (typeof cc.requirements.keysDown.keys[o] != "number"){
						cKey = getKeyCode(cc.requirements.keysDown.keys[o]);
						if (!cKey){
							switch (cc.requirements.keysDown.keys[o]){
								case "l": cKey = lak; break; 
								case "h": cKey = hak; break; 
								case "u": cKey = up; break;
								case "d": cKey = down; break;
								case "r": cKey = right; break;
								case "lf": cKey = left; break;
								case "rl": if (this.dir == "right"){ cKey = right; } else { cKey = left; } break;
								default: break;
							}
						}
					} else { cKey = cc.requirements.keysDown.keys[o]; }
					if (typeof cKey == "number"){ if (keys[cKey] == false){ keysAreDown = false; } }
				}
			}
			/* Is jumping */
			var jumped = false; if ((!(cc.requirements.inAir) && !(this.jumping)) || (cc.requirements.inAir && (this.jumping || this.falling) )){ jumped = true; }
			
			/* Is running */
			var running = false; if ((!(cc.requirements.running) && !(this.running)) || (cc.requirements.running && this.running)){ running = true; }
			
			/* Use Arrow keys */
			var c = [];	var ct = [];
			if (cc.requirements.useArrows.active == false){
				var chkA = []; 
				for (var o = 0; o < this.combo.length; o++){
					if (this.combo[o].key != up && this.combo[o].key != down && this.combo[o].key != right && this.combo[o].key != left && this.combo[o].key != jump){
						chkA.push(this.combo[o].key);
						ct.push(this.combo[o].time);
					}
				}
				c = chkA;
			} else {
				var ck = cc.requirements.useArrows.keys;
				var chkA = [];
				var uArrows = { up:false, down:false, right:false, left:false, jump:false };
				for (var p = 0; p < ck.length; p++){
					switch (ck[p]){
						case "u": uArrows.up = true; break;
						case "d": uArrows.down = true; break;
						case "r": uArrows.right = true; break;
						case "lf": uArrows.left = true; break;
						case "j": uArrows.jump = true; break;
						case "rl": if (this.dir == "right"){ uArrows.right = true; } else { uArrows.left = true; } break;
						default: break;
					}
				}
				for (var o = 0; o < this.combo.length; o++){
					if ((this.combo[o].key == up && uArrows.up) || (this.combo[o].key == down && uArrows.down) || (this.combo[o].key == right && uArrows.right) || (this.combo[o].key == left && uArrows.left) || (this.combo[o].key == jump && uArrows.jump) || this.combo[o].key == lak || this.combo[o].key == hak || this.combo[o].key == spl){
						chkA.push(this.combo[o].key);
						ct.push(this.combo[o].time);
					}
				}
				c = chkA;
			}
			
			/* Set combo to check */
			var v = [];
			for (var o = 0; o < cc.combination.length; o++){
				switch (cc.combination[o]){
					case "l": v.push(lak); break;
					case "h": v.push(hak); break;
					case "u": if (cc.requirements.useArrows.active){ v.push(up); } break;
					case "d": if (cc.requirements.useArrows.active){ v.push(down); } break;
					case "r": if (cc.requirements.useArrows.active){ v.push(right); } break;
					case "lf": if (cc.requirements.useArrows.active){ v.push(left); } break;
					case "j": if (cc.requirements.useArrows.active){ v.push(jump); } break;
					case "rl": if (cc.requirements.useArrows.active){ if (this.dir == "right"){ v.push(right); } else { v.push(left); } } break;
					case "s": if (cc.isSpecial){ v.push(spl); }
					default: break;
				} 
			}
			/* Too late to combo */	
			var chkTime = ((ct[ct.length-cc.combination.length] + cc.requirements.timeToRun) - new Date().getTime());
			/* Check last attack */
			var lastAtk = true; 
			if (cc.requirements.hasOwnProperty("lastAttack") || !(cc.requirements.lastAttak == "None")){ lastAttack = (this.lastAttack == cc.requirements.lastAttack); }
			
			/* Is combo */
			var ComboToCheck = v.reverse().toString();
			var PlayerCombo = c.reverse().toString().substring(0,ComboToCheck.length);
			if (ComboToCheck === PlayerCombo && keysAreDown && jumped && running && chkTime >= 0 && lastAtk){
				if (cc.effect.active){ cc.effect.func(this); }
				if (this.energy >= cc.energy.needed /*&& (!(this.lastAttack == cc.name))*/){
					var resetCD = function(ncc){ cc.cooldown.hasRun = true; setTimeout(function(){ ncc.cooldown.hasRun = false; },ncc.cooldown.time); }; resetCD(cc);
					this.changeEnergy(-cc.energy.needed);
					this.isCombo = true;
					this.changeAnimation(cc.name); //console.log(cc.name);
					this.lastAttack = cc.name;
					if (cc.playScene){ playingUltScene = true; ultScene = characterScene[this.character]; }
					return true;
				} else {
					this.changeAnimation("stand");
				}
			} 
		}
		return false;
	}
	this.addToCombo = function(key){
		if (this.combo.length > 7){ this.combo.shift(); }
		this.createComboObj(key,1);
		this.checkIfCombo(key,this);
		var chk = this.checkForCombo(); if (!chk){ switch (key){ case this.controls.light: this.lastAttack = "l"; break; case this.controls.heavy: this.lastAttack = "h"; break; default: break; } }
		
		if ( (!chk) && ((this.animationList.hasOwnProperty("LightEffect") && key == this.controls.light) || (this.animationList.hasOwnProperty("HeavyEffect") && key == this.controls.heavy)) ){ 
			var z; if (this.lastAttack == "l"){ z = this.animationList.LightEffect; } else { z = this.animationList.HeavyEffect; } var x; if (this.dir == "right"){ x = z.x[0]; } else { x = z.x[1]; } 
			var p = new Particle(z.name, this.name, this.x+x, this.y+z.y, z.texture, z.speed, z.height, z.lifetime, z.delay, z.loop, z.frames, z.damage, z.projectile); 
		} 
	}
}

function setAnimationFromInput(plr,override){
	if (plr.stunned || plr.isCombo || plr.ignoreKeyInput || plr.dead) { if (typeof !(override == "undefined") && !(override)) { return; } }
	//if (plr.AI == true){ plr.setAnimationFromInput(plr); return; }
	
	var rightKey = 			plr.controls.right;
	var leftKey = 			plr.controls.left;
	
	if (plr.blocking){
		plr.changeAnimation("block");
	} else if (plr.charging){
		plr.changeAnimation("charge");
	} else if (plr.attacking){
		plr.changeAnimation(plr.currentAttack);
	} else {
		if (keys[rightKey] && plr.velX < plr.speed){ plr.dir = "right"; plr.velX+=plr.speed/3; }
		if (keys[leftKey] && plr.velX > -plr.speed){ plr.dir = "left"; plr.velX-=plr.speed/3; } 
		
		if (plr.jumping){
			plr.changeAnimation("jump");
		} else if (Math.abs(plr.velX) > plr.speed){
			plr.changeAnimation("run");
		} else {
			plr.changeAnimation("stand");
		}
	}
}

function checkPlayerInput(plr,override){
	if (plr.stunned || plr.isCombo || plr.ignoreKeyInput || plr.dead){ if (typeof !(override == "undefined") && !(override)) { return; } }
	//if (plr.AI == true){ plr.checkPlayerInput(plr); return; }
	
	var upKey = 		plr.controls.up;
	var downKey = 		plr.controls.down;
	var rightKey = 		plr.controls.right;
	var leftKey = 		plr.controls.left;
	var jumpKey = 		plr.controls.jump;
	var lightKey = 		plr.controls.light;
	var heavyKey = 		plr.controls.heavy;
	var spAttack =		plr.controls.special;
	
	
	if (keys[jumpKey] && !plr.jumping && plr.platform){ plr.jumping = true; plr.platform = false; plr.velY = -1 * plr.jumpPower; }
	
	/* Double clicked keys */
	if (doubleClicked[rightKey]){ if (!plr.running){ plr.running = true; plr.speed *= 1.35; } }
	if (doubleClicked[leftKey]){ if (!plr.running){ plr.running = true; plr.speed *= 1.35; } }
	if (!keys[leftKey] && !keys[rightKey] && plr.running){ plr.running = false; plr.softResetValues(); }
	
	if (keys[downKey] && plr.energy > 0){ plr.blocking = true;  plr.changeEnergy(-.085); return; } else { plr.blocking = false; } 
	
	if (plr.attacking || plr.isCombo){ return; }
	if (keys[spAttack]){ plr.charging = true; plr.speed = plr.speed / 20; if (plr.combo.length > 0 && plr.combo[plr.combo.length-1].key != spAttack){ plr.addToCombo(spAttack,plr); }; plr.changeEnergy(plr.chargeSpeed); }	
	else if ((keys[lightKey] || keys[heavyKey])){ plr.attacking = true; plr.currentFrame = 0; plr.speed = plr.speed / 20; if (keys[lightKey]){ plr.currentAttack = "light"; plr.addToCombo(lightKey); } else { plr.currentAttack = "heavy"; plr.addToCombo(heavyKey); } }
	else if (clickedKeys[spAttack]){ plr.charging = false; plr.softResetValues(); }
	else if (clickedKeys[upKey]){ plr.addToCombo(upKey,plr); clickedKeys[upKey] = false; }
	else if (clickedKeys[downKey]){ plr.addToCombo(downKey,plr); clickedKeys[downKey] = false; }
	else if (clickedKeys[rightKey]){ plr.addToCombo(rightKey,plr); clickedKeys[rightKey] = false; }
	else if (clickedKeys[leftKey]){ plr.addToCombo(leftKey,plr); clickedKeys[leftKey] = false; }
	else if (clickedKeys[jumpKey]){ plr.addToCombo(jumpKey,plr); clickedKeys[jumpKey] = false; }
}

function playerPhysicsAndBoundries(plr){
	plr.velX *= plr.friction;
	plr.velY += plr.gravity;
	
	plr.x += plr.velX;
	plr.y += plr.velY;
	
	if (plr.velY > 0){ plr.falling = true; } 
	
	if (plr.y + plr.height > plr.ground){
		plr.y = plr.ground - plr.height;
		plr.platform = true;
		plr.jumping = false;
		plr.falling = false;
		plr.velY = 0;
	}
	
	if (plr.x >= width-plr.width) {
        plr.x = width-plr.width;
    } else if (plr.x <= 0) {         
        plr.x = 0;     
    } 
}
