(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

var moveScreen = true;

function update() {
	/* Clear canvas */
	if (!playingUltScene){ ctx.restore(); ctx.transform(1,0,0,1,0,0); ctx.clearRect(0,0,width,height); }

	/* Menu screen */
	if (menuScreen){
		var menuImg = new Image(); menuImg.src = "Images/MainMenu/MenuBackground.jpg";
		ctx.drawImage(menuImg,0,0,width,height);
		drawButtons();
		drawMenuObjects();
	/* Playing PvP or PvC */
	} else if (!menuScreen && (currentScreen == "PlayPvP" || currentScreen == "PlayPvC")){
		/*Paused Game */
		if (playing && paused){
			var im = new Image(); im.src = bg; ctx.drawImage(im,0,0,width,height);
			drawButtons();
			drawMenuObjects();
		/* Draw Character Select */
		} else if (!playing && !paused){
			drawButtons();
			drawOptions();
			drawSelectedCharacter();
			drawVs();
		/* Draw Scene */
		} else if (playing && !paused && ultScene.active){
			ctx.clearRect((canvasWidth/2)-(ultScene.width/2),(canvasHeight/2)-(ultScene.height/2),ultScene.width,ultScene.height);
			var nSceneImage = new Image(); nSceneImage.src = ultScene.src + "/" + ultScene.currentFrame + ".png"
			ctx.drawImage(nSceneImage,(canvasWidth/2)-(ultScene.width/2),(canvasHeight/2)-(ultScene.height/2),ultScene.width,ultScene.height);
			if (!(ultScene.framePassed)){
				ultScene.framePassed = true;
				ultScene.currentFrame++;
				setTimeout(function(){
					ultScene.framePassed = false;
				},ultScene.speed);
			}
			if (ultScene.currentFrame > ultScene.frames){
				ultScene.active = false;
				ultScene.currentFrame = 0;
				ultScene.framePassed = false;
			}
		/* Draw Game */
		} else if (playing && !paused){
			/* Draw Background */
			var im = new Image(); im.src = bg; ctx.drawImage(im,0,0,width,height);
			/* Draw Platforms */
			drawPlatforms();
			/* Draw Particles */
			drawParticle();
			/* Draw Player */
			for (var i in players){ var cp = players[i];
				cp.platform = false; for (var o in platforms){ checkSollidPlatformCollision(cp, platforms[o]); if (cp.platfom){ break; } }
				checkPlayerInput(cp);
				setAnimationFromInput(cp);
				playerPhysicsAndBoundries(cp);
				drawHealthBar(cp);
				cp.hasDied();
			}
			for (var i in players){ var cp = players[i]; drawPlayer(cp); }
		}
	}
	fps++;
	requestAnimationFrame(update);
}
