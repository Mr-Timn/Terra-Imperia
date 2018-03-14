var ai = [];

function AIPlayer(Name, x, y, Width, Height, Speed, color, velx, vely, Ground, Friction, Gravity, JumpPower, AnimationSpeed, Health, MaxHealth, HealthPos, StartAnimation, StartDirection, mKeys, useKeyCode, Character, IsAI){
	this.name = Name;
	this.x = x;
	this.y = y;
	this.width = Width;
	this.height = Height;
	this.speed = Speed;
	this.velX = velx;
	this.velY = vely;
	this.ground = defaultGround;
	this.friction = Friction;
	this.gravity = Gravity;
	this.color = color;
	this.character = Character;
	this.jumpPower = JumpPower;
	this.health = MaxHealth;
	this.maxHealth = MaxHealth;
	this.healthPos = HealthPos;
	
	this.jumping = false;
	this.grounded = false;
	this.platform = false;
	this.falling = false;
	this.waitForFrame = false;
	this.stunned = false;
	this.dead = false;
	this.checked = false;
	this.isCombo = false; 
	this.blocking = false;
	this.runPunch2 = false;
	
	this.dir = StartDirection;
	this.currentFrame = 0;
	this.currentAnimation = StartAnimation;
	this.animationSpeed = AnimationSpeed;
	
	this.attacking = false;
	this.currentAttack = "";
	this.combo = [];
	this.lastCombo = [];
	this.wasDamagedBy = [];
	this.keys = [];
	this.spAttack = 100;
	this.maxSPAttack = 100;
	this.resetComboTime = 1000;
	this.energyGain = 3;
	
	if(useKeyCode){
		this.controls = [
			movement = {
				up: getKeyCode(mKeys[0]),
				down: getKeyCode(mKeys[1]),
				right: getKeyCode(mKeys[2]),
				light: getKeyCode(mKeys[4]),
				left: getKeyCode(mKeys[3])
			},
			attacks = {
				light: getKeyCode(mKeys[4]),
				heavy: getKeyCode(mKeys[5]),
				special: getKeyCode(mKeys[6])
			}
		]
	} else{
		this.controls = [
			movement = {
				up: mKeys[0],
				down: mKeys[1],
				right: mKeys[2],
				left: mKeys[3]
			},
			attacks = {
				light: mKeys[4],
				heavy: mKeys[5],
				special: mKeys[6]
			}
		]
	}
	
	if (IsAI == "AI"){ 
		this.AI = true; 
		this.ignoreKeyInput = true; 
	} else if (IsAI == "Player"){ 
		this.AI = false; 
		this.ignoreKeyInput = false; 
	}
	if (IsAI == "AI"){ 
		this.difficulty = 5; 
		this.keys = []; 
		this.action = "MoveToPlayer"; 
		this.actionObj = []; 
	}
	
	this.setAnimationFromInput = function(pp){
		if (pp.stunned || pp.isCombo || pp.blocking || pp.currentAnimation == "tryAndAttack") { 
			if (typeof override == "undefined" || override == false) { 
				return; 
			} 
		}
		var upKey = pp.controls[0].up; 
		var downKey = pp.controls[0].down; 
		var rightKey = pp.controls[0].right; 
		var leftKey = pp.controls[0].left; 
		var lightAttackKey = pp.controls[1].light; 
		var heavyAttackKey = pp.controls[1].heavy; 
		var spAttack = pp.controls[1].special;
		if (keys[spAttack]){ 
			if (pp.spAttack >= pp.maxSPAttack){ 
				pp.spAttack = 0; 
				pp.currentAnimation = "tryAndAttack"; 
				return; 
			} 
		}
		if (pp.attacking){
			if (pp.currentAttack == "light"){ 
				if (pp.dir == "right"){ 
					pp.currentAnimation = "lattackR"; 
				} else if (pp.dir == "left"){ 
					pp.currentAnimation = "lattackL"; 
				}
			}
			if (pp.currentAttack == "heavy"){ 
				if (pp.dir == "right"){ 
					pp.currentAnimation = "hattackR"; 
				} else if (pp.dir == "left"){ 
					pp.currentAnimation = "hattackL"; 
				}
			}
		} else {
			if (keys[rightKey] && pp.velX < pp.speed){ 
				var an = pp.currentAnimation; 
				if (!an == "runL" && !an == "runR") { 
					pp.currentFrame = 0; 
				} 
				if (pp.falling !== true){
					pp.currentAnimation = "runR"; 
					pp.dir = "right"; 
				} else { 
					pp.dir = "right"; 
				} 
			}	
			if (keys[leftKey] && pp.velX > -pp.speed){ 
				if (!an == "runL" && !an == "runR"){ 
					pp.currentFrame = 0; 
				} 
				if (pp.falling !== true){
					pp.currentAnimation = "runL"; 
					pp.dir = "left" 
				} else { 
					pp.dir = "left"; 
				} 
			}
			if (pp.velX > -pp.speed/2 && pp.velX < pp.speed/2){ 
				if (pp.dir == "right"){ 
					pp.currentAnimation = "standR"; 
				} else if(pp.dir == "left"){ 
					pp.currentAnimation = "standL"; 
				} 
			}
			if (pp.jumping){ 
				if (pp.dir == "right"){ 
					pp.currentAnimation = "jumpR"; 
				} else if (pp.dir == "left"){ 
					pp.currentAnimation = "jumpL"; 
				} 
			}
		}
	}
	this.checkPlayerInput = function(pp){
		var upKey = pp.controls[0].up;
		var downKey = pp.controls[0].down; 
		var rightKey = pp.controls[0].right; 
		var leftKey = pp.controls[0].left; 
		var lightAttackKey = pp.controls[1].light;
		var heavyAttackKey = pp.controls[1].heavy; 
		var spAttack = pp.controls[1].special;
		if (pp.keys[downKey]){ 
			pp.blocking = true; 
			if (pp.dir == "right"){ 
				pp.currentAnimation = "blockR"; 
			} else if(pp.dir == "left"){ 
				pp.currentAnimation = "blockL"; 
			} 
			return; 
		} else { 
			pp.blocking = false; 
		}
		if (pp.keys[upKey] && !pp.jumping && pp.grounded){ 
			pp.jumping = true; 
			pp.grounded = false; 
			pp.velY = -1 * pp.jumpPower; 
		}	
		if (pp.keys[rightKey] && pp.velX < pp.speed){ 
			pp.velX++; 
		}	
		if (pp.keys[leftKey] && pp.velX > -pp.speed){ 
			pp.velX--; 
		}
		if (pp.keys[lightAttackKey] && !pp.attacking && !pp.isCombo){ 
			pp.attacking = true; 
			pp.currentFrame = 0; 
			pp.speed = pp.speed / 10; 
			pp.currentAttack = "light"; 
			pp.combo[pp.combo.length] = lightAttackKey; 
			setTimeout(function(){ 
				if (!pp.combo[0] || pp.isCombo){ 
					return; 
				}; 
				pp.lastCombo[pp.lastCombo.length] = lightAttackKey; 
				var checkpp = pp.checkIfCombo(); 
			},pp.resetComboTime); 
			return; 
		}
		if (pp.keys[heavyAttackKey] && !pp.attacking && !pp.isCombo){ 
			pp.attacking = true; 
			pp.currentFrame = 0; 
			pp.speed = pp.speed / 10; 
			pp.currentAttack = "heavy"; 
			pp.combo[pp.combo.length] = heavyAttackKey; 
			setTimeout(function(){ 
				if (!pp.combo[0] || pp.isCombo){ 
					return; 
				}; 
				pp.lastCombo[pp.lastCombo.length] = heavyAttackKey; 
				var checkPlr = pp.checkIfCombo(); 
			},pp.resetComboTime); 
			return; 
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
			pp.checkDistance = function(d){ 
				var opp = returnOpponent(pp); 
				console.log(Math.abs(pp.x-opp.x)); 
				if (Math.abs(pp.x-opp.x) < d){ 
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
						pp.keys[pp.controls[0].right] = ud; 
						break;
					case "left": 
						pp.dir = "left"; 
						pp.keys[pp.controls[0].left] = ud; 
						break;
					case "up": 
						pp.keys[pp.controls[0].up] = ud; 
						break;
					case "down": 
						pp.keys[pp.controls[0].down] = ud; 
						break;
					case "punch": 
						pp.keys[pp.controls[1].light] = ud; 
						break;
					case "kick": 
						pp.keys[pp.controls[1].heavy] = ud; 
						break;
					default: 
						console.log("Error Incorrect AI key pressed: " + key); 
						break;
				}
			}
		}
		
		var options = ["RunFromPlayer","Punch","Kick","Block"/*,"TryToCombo"*/];
		
		console.log(pp.action);
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
					var opp = returnOpponent(this); 
					if (opp.x > pp.x){ 
						pp.keyDown("right",true); 
					} else { 
						pp.keyDown("left",true); 
					} 
				},Math.random()*(this.difficulty*825) + 150 ); 
				break;
			case "MovingToPlayer": 
				if (pp.checkDistance(15)){ 
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
				if (pp.checkDistance(300) == false){ 
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
				if (pp.checkDistance(300) == false){ 
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
				if (pp.checkDistance(30)){ 
					pp.keyDown("punch",true); 
					pp.action = "Punching"; 
				} else { 
					pp.action = "MoveToPlayer"; 
				} 
				break;
			case "Punching": 
				if (pp.currentAnimation == "standR" || pp.currentAnimation == "standL"){ 
					pp.action = "Choose"; 
				} 
				break;
			case "Kick": 
				if (pp.checkDistance(30)){ 
					pp.keyDown("kick",true); 
					pp.action = "Kicking"; 
				} else { 
					pp.action = "MoveToPlayer"; 
				} 
				break;
			case "Kicking": 
				if (pp.currentAnimation == "standR" || pp.currentAnimation == "standL"){ 
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
	this.checkIfCombo = function(){ 
		if (this.combo.length >= 4){ 
			this.combo = []; 
			this.lastCombo = []; 
		} 
		if (this.combo.toString() == this.lastCombo.toString()){ 
			this.combo = []; 
			this.lastCombo = []; 
		} 
	}
	this.resetValues = function(){ 
		this.speed = Speed; 
		this.velX = velx; 
		this.velY = vely; 
		this.friction = Friction; 
		this.gravity = Gravity; 
		this.color = color; 
		this.jumpPower = JumpPower; 
		this.animationSpeed = AnimationSpeed; 
	}
	ai.push(this);
}
