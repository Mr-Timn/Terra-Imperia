

var Ground = new Platform("Ground",0, canvasHeight, canvasWidth, 10, "black",true,true,true,true,"",true);

function returnPlatform(n){ for (var i in platforms){ if (platforms[i].name == n){ return platforms[i]; } } }

function drawPlatforms(){
	for (var i in platforms){
		ctx.fillStyle = platforms[i].color;
		if (platforms[i].texture == ""){
			ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
		} else {
			var pImg = new Image(); pImg.src = platforms[i].texture;
			ctx.drawImage(pImg, platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
		}
	} 
}

function Platform(Name, X, Y, Width, Height, Color, CollideTop, CollideBottom, CollideRight, CollideLeft, Texture, Scroll){
	this.x = X;
	this.y = Y;
	this.name = Name;
	this.width = Width;
	this.height = Height;
	this.color = Color;
	this.texture = Texture;
	this.relative = Scroll;
	this.collideTop = CollideTop;
	this.collideBottom = CollideBottom;
	this.collideLeft = CollideLeft;
	this.collideRight = CollideRight;
	
	platforms.push(this);
} 

function checkSollidPlatformCollision(plr, obj){
		 if (obj.collideTop 	&& plr.y + plr.height >= obj.y && plr.y + plr.height <= obj.y + plr.velY 	&& plr.x + plr.width >= obj.x		&& plr.x <= obj.x + obj.width){ plr.ground = obj.y; plr.platform = true; plr.velY = 0; } 
	else if (obj.collideBottom  && plr.y >= obj.y + obj.height && plr.y <= obj.y + obj.height - plr.velY 	&& plr.x + plr.width > obj.x 		&& plr.x <= obj.x + obj.width){ if (!plr.falling){ plr.y = obj.y + obj.height; plr.velY = 0; } } 
	else if (obj.collideLeft 	&& plr.x + plr.width >= obj.x  && plr.x <= obj.x + plr.width 			 	&& plr.y + plr.height - 1 >= obj.y 	&& plr.y <= obj.y + obj.height){ plr.x = obj.x - plr.width; plr.velX = 0; } 
	else if (obj.collideRight 	&& plr.x <= obj.x + obj.width  && plr.x >= obj.x + obj.width - plr.width 	&& plr.y + plr.height - 1 >= obj.y 	&& plr.y <= obj.y + obj.height){ plr.x = obj.x + obj.width; plr.velX = 0; }
	if (!plr.platform){ plr.ground = 1000; }
}
