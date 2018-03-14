var particles = [];

function findParticle(n){
	for (var i = 0; i < particles.length; i++){ 
		if (particles[i].name == n && !particles[i].ignore){ 
			return particles[i];
		} 
	} 
	return false;
}

function Particle(Name, Owner, X, Y, Texture, Speed, Height, Lifetime, Delay, Loop, Frames, DamageObj, ProjectileObj){
	if (findParticle(Name)){ return; }
	this.name = Name;
	this.x = X;
	this.y = Y;
	this.owner = Owner;
	this.texture = Texture;
	this.frameSpeed = Speed;
	this.height = height;
	this.delay = Delay;
	this.loop = Loop;
	this.frames = Frames;
	this.damageObj = DamageObj;
	this.projectileObj = ProjectileObj;
	
	this.ignore = false;
	this.framePassed = true;
	this.onFrame = 0;
	
	this.remove = function(){ for (var i = 0; i < particles.length; i++){ if (particles[i] == this){ particles.splice(i,1); } } }
	this.activateParticle = function(p,t){ setTimeout(function(){ p.ignore = false; p.removeParticle(p); },t); }
	this.removeParticle = function(p){ setTimeout(function(){ if (p){ p.remove(); } },Lifetime); };
	this.timeParticle = function(p){ setTimeout(function(){ p.framePassed = true; },Speed); }
	
	if (Delay > 0){ this.ignore = true; this.activateParticle(this,Delay); } else { this.removeParticle(this); }
	
	particles.push(this);
}

function particleCollision(cpj,w,h){
	for (var o = 0; o < players.length; o++){
		if (players[o].name == cpj.owner){ continue; } var plr = players[o]; var user = returnPlayer(cpj.owner);

		var distFromX = Math.abs(cpj.x - plr.x);
		var distFromY = Math.abs(cpj.y - plr.y);
		
		if (distFromX < w && distFromY < h){
			/* Deal Damage */
			var dmgObj = { name: cpj.name, owner: cpj.owner, damage: cpj.damageObj.value, push: cpj.damageObj.push, duration: cpj.damageObj.duration, direction: returnPlayer(cpj.owner).dir };
			plr.attacked(dmgObj);
			/* Remove Particle */
			if (cpj.damageObj.remove){ cpj.removeParticle(); }
			/* On Hit */
			if (cpj.projectileObj.onHit.active){
				var ch = cpj.projectileObj.onHit;
				var op = new Particle(cpj.name+1, cpj.x + (w/2), cpj.y + (h/2), "None", ch.texture, ch.speed, ch.height, ch.lifetime, ch.delay, [false,0,0], ch.frames, {active:false}, [false] );
				var tempDir = cpj.projectileObj.direction; if (tempDir == "rightleft"){ if (user.dir == "right"){ tempDir = "right"; } else if (user.dir == "left"){ tempDir = "left"; } }
				if (tempDir == "right"){ op.texture += "/R/"; } else if (tempDir == "left"){ op.texture += "/L/"; }
				if (cpj.projectileObj.direction == "")
				if (cpj.projectileObj.onHit.effect.active){ cpj.projectileObj.onHit.effect.func(returnPlayer(cpj.owner)); }
				cpj.removeParticle();
			}
		}
	}
}

function drawParticle(){
	for (var i = 0; i < particles.length; i++){
		var cp = particles[i]; if (cp.ignore){ continue; } var user = returnPlayer(cp.owner); if (!(user)){ continue; }
		
		/*Move Projectile */
		var pr = cp.projectileObj;
		if (pr.active == true){
			if (pr.direction != "none"){
				var tempDir = pr.direction; if (tempDir == "rightleft"){ if (user.dir == "right"){ tempDir = "right"; } else if (user.dir == "left"){ tempDir = "left"; } }
				switch(tempDir){
					case "right": cp.x += pr.speed; break;
					case "left": cp.x -= pr.speed; break;
					case "up": cp.y -= pr.speed; break;
					case "down": cp.y += pr.speed; break;
					default: break;
				}
			} else {
				if (!(pr.hasOwnProperty("moveX")) || !(pr.hasOwnProperty("moveY"))){
					var distX = (pr.moveTo[0] - cp.x);
					var distY = (pr.moveTo[1] - cp.y);
					
					var lineDist = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2)) / pr.speed;
					
					var lineXDist = (distX / lineDist);
					var lineYDist = (distY / lineDist);
					
					Object.defineProperty(pr, "moveX", { value: lineXDist });
					Object.defineProperty(pr, "moveY", { value: lineYDist });
				}
				cp.x += pr.moveX;
				cp.y += pr.moveY;
			}
		}
		
		/* Draw Image */
		var ptImgg = new Image();
		switch (tempDir){
			case "right": ptImgg.src = cp.texture + "/R/" + cp.onFrame + ".png"; break;
			case "left": ptImgg.src = cp.texture + "/L/" + cp.onFrame + ".png"; break;
			default: ptImgg.src = cp.texture + "/" + cp.onFrame + ".png"; break;
		}
		var pWidth = ptImgg.width;
		var pHeight = ptImgg.height;
		
		ctx.drawImage(ptImgg, cp.x - (pWidth/2), cp.y);
		if (cp.onFrame == cp.frames){
			if ((cp.loop.active == true) && (cp.loop.loops < cp.loop.max || cp.loop.max == -1)){
				cp.onFrame = 0;
				if (!(cp.loop.max == -1)){ cp.loop.loops++; }
			} else {
				cp.ignore = true;
				for (var o = 0; o < particles.length; o++){
					if (particles[o].toString() == cp.toString()){
						particles.splice(o,1);
					}
				}
			}
		}
		if (typeof particles[i] == "undefined"){ continue; }
		if (particles[i].framePassed){
			particles[i].framePassed = false;
			particles[i].onFrame++;
			particles[i].timeParticle(particles[i]);
		}
		
		/* Particle Damage */
		if (cp.damageObj.active){
			particleCollision(cp,pWidth,pHeight);
		}
	}
}