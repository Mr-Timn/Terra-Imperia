
function drawFrame(plr, obj, type, dmg){
	var a = plr.currentFrame;
	plr.animationSpeed = obj.speed;
	plr.resetComboTime = obj.frames * obj.speed + 425;
	
	if (plr.currentFrame >= obj.frames){ plr.currentFrame = 0; }
	
	/* Get image */
	var dir; if (plr.dir == "right"){ dir = obj.src + "/R/"; } else { dir = obj.src + "/L/"; }
	var currentImage = dir + plr.currentFrame + ".png";
	
	/* Create image */
	var img = new Image(); img.src = currentImage;
	
	/* Adjust image */
	var iWidth = img.width;
	var iHeight = img.height;
	var hDiff = (obj.height - iHeight); if (hDiff <= 0){ hDiff /= 2; } 
	var wDiff = iWidth - plr.width; if (plr.dir == "right"){ wDiff = 0; }
	
	ctx.drawImage(img, plr.x - wDiff, plr.y + plr.height - iHeight);

	switch (type){
		case "normal":
			if (plr.waitForFrame !== true){
				plr.waitForFrame = true
				setTimeout(function(){
					if (plr.currentFrame < obj.frames - 1){
						plr.currentFrame += 1; 
					} else {
						plr.currentFrame = 0;
					}
					plr.waitForFrame = false;
				},plr.animationSpeed);
			}
			break;
		case "attack":
			if (plr.waitForFrame !== true){
				plr.waitForFrame = true
				setTimeout(function(){
					if (plr.currentFrame < obj.frames - 1){
						plr.currentFrame += 1; 
					} else {
						plr.attacking = false;
						plr.currentFrame = 0;
						plr.softResetValues();
						
						if (obj.isCombo){
							plr.isCombo = false;
						}
						if (obj.reset){ 
							plr.combo = [];
							plr.lastCombo = [];
						}
						if (obj.isSpecial){
							
						}
					}
					plr.waitForFrame = false;
				},plr.animationSpeed);
			}
			break;
		default: break;
	}
	obj.width = iWidth;
	obj.height = iHeight;
	if (dmg){
		var isDamageFrame = false;
		var dFrames = obj.damageObj.onFrames;
		var index = 0;
		var temp = [];
		while (!(typeof dFrames[index] == "undefined")){
			if (dFrames[index] == -1){ for (var i = dFrames[index+1]; i <= dFrames[index+2]; i++){ temp.push(i); }; }
			index+=3;
		}
		if (temp.length > 0){ dFrames = temp; }
		for (var i in dFrames){ if (dFrames[i] == a){ isDamageFrame = true; } }
		if (isDamageFrame) {checkFrameCollision(plr, obj); }
	}
}


function createNewFrame(plr, obj, xOffset, yOffset){
	drawFrame(plr,obj,"normal",false);
}

function createNewAttackFrame(plr, obj, xOffset, yOffset, DamageObj){
	obj.damageObj = DamageObj; drawFrame(plr,obj,"attack",true);
}

function checkFrameCollision(plyr, obj){
	for (var i = 0; i < players.length; i++){
		var plr; if (players[i].name == plyr.name){ continue; } else { plr = players[i]; }
		
		var yDiff = (plr.height - obj.height);
		var xDiff = obj.width - plr.width; if (plyr.dir == "right") { xDiff = 0; }	
		var objX = plyr.x - xDiff;
		var objY = plyr.y + yDiff;
		var distFromX = Math.abs(plr.x-objX);
		var distFromY = Math.abs(plr.y-objY);
		
		if (distFromX < obj.width && distFromY < obj.height){
			var dmgObj = { name: obj.name, owner: plyr.name, damage: obj.damage, push: obj.push, duration: obj.duration, direction: plyr.dir };
			plr.attacked(dmgObj);
		}
	}
}