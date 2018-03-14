
function drawPlayer(plr){
	window[plr.character](plr);
}

function drawHealthBar(plr){
	var xpos = plr.healthPos[0];
	var ypos = plr.healthPos[1];

	if (plr.health < 0){
		plr.health = 0;
		plr.dead = true;
	}

	if (xpos == 1){
		ctx.fillStyle = "red";
		ctx.fillRect(60, 10 + (ypos*30), (width/2.5) - 60, (ypos+1)*30);

		ctx.fillStyle = "green";
		ctx.fillRect(60, 10 + (ypos*30), ((width/2.5)-60) * (plr.health / plr.maxHealth), (ypos+1)*30)

		ctx.fillStyle = "yellow";
		ctx.fillRect(60,10 + ((ypos + 1) * 30), 300 * (plr.energy / plr.maxEnergy), (ypos+1)*30);

		ctx.beginPath();
		ctx.moveTo(width/2.5,10 + (ypos * 30));
		ctx.lineTo(60,10 + (ypos * 30));
		ctx.lineTo(60,10 + ((ypos + 1) * 30));
		ctx.lineTo(width/2.5,10 + ((ypos + 1) * 30));
		ctx.lineTo(width/2.5,10 + (ypos * 30));
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(60,10 + ((ypos + 1) * 30));
		ctx.lineTo(360,10 + ((ypos + 1) * 30));
		ctx.lineTo(360,10 + ((ypos + 2) * 30));
		ctx.lineTo(10,10 + ((ypos + 2) * 30));
		ctx.stroke()

		if (!plr.charHealthGui){ return; }
		var img = new Image();
		img.src = plr.charHealthGui;
		ctx.drawImage(img,10,10+(ypos*30),50,68);
	} else{

		ctx.fillStyle = "red";
		ctx.fillRect(width-(width/2.5), 10 + (ypos*30), (width/2.5) - 60, (ypos+1)*30);

		ctx.fillStyle = "green";
		ctx.fillRect(width-60, 10+(ypos*30), -((width/2.5)-60) * (plr.health / plr.maxHealth),(ypos+1)*30);

		ctx.fillStyle = "yellow";
		ctx.fillRect(width-60,10 + ((ypos + 1) * 30), -300 * (plr.energy / plr.maxEnergy), (ypos+1)*30);

		ctx.beginPath();
		ctx.moveTo(width-60,10 + ((ypos + 1) * 30));
		ctx.lineTo(width-360,10 + ((ypos + 1) * 30));
		ctx.lineTo(width-360,10 + ((ypos + 2) * 30));
		ctx.lineTo(width-10,10 + ((ypos + 2) * 30));
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(width-60,10+(ypos*30));
		ctx.lineTo(width-(width/2.5),10+(ypos*30));
		ctx.lineTo(width-(width/2.5),10+((ypos+1)*30));
		ctx.lineTo(width-60,10+((ypos+1)*30));
		ctx.lineTo(width-60,10+(ypos*30));
		ctx.stroke();

		if (!plr.charHealthGui){ return; }
		var img = new Image();
		img.src = plr.charHealthGui;
		ctx.drawImage(img,width-60,10+(ypos*30),50,68);
	}
}

function drawOptions(){
	ctx.fillStyle = "black";

	/* Player One */
	ctx.beginPath();
	ctx.moveTo(startX, canvasHeight);
	ctx.lineTo(startX, startY);
	ctx.lineTo(startX+panelW, startY);
	ctx.lineTo(startX+panelW, canvasHeight);
	ctx.stroke();
	/* Player Two */
	ctx.beginPath();
	ctx.moveTo(canvasWidth-startX, canvasHeight);
	ctx.lineTo(canvasWidth-startX, startY);
	ctx.lineTo(canvasWidth-startX-panelW, startY);
	ctx.lineTo(canvasWidth-startX-panelW, canvasHeight);
	ctx.stroke();

/* var curX = 1; var curY = 0;
	for (var i in co){
		var panelImg = new Image(); panelImg.src = co[i][0];
		ctx.drawImage(panelImg, canvasWidth-startX-curX*panelImgWidth, startY+curY*panelImgHeight, panelImgWidth, panelImgHeight);
		ctx.drawImage(panelImg, curX*panelImgWidth, startY+curY*panelImgHeight, panelImgWidth, panelImgHeight);
		if (curX < maxPerRow){ curX++; } else { curX = 0; curY++; }
	} */

	var curX = 1; var curY = 0;
	for (var i in co){
		if (returnButton("Story") || returnButton("PVP")){ removeAllButtons(); }
		if (returnButton("1"+i)){ continue; }
		var sel1 = new Button(
			"1"+i,
			startX+curX*panelImgWidth,
			startY+curY*panelImgHeight,
			panelImgWidth,
			panelImgHeight,
			"",
			"",
			[curX*panelImgWidth, startY+curY*panelImgHeight, 0, 0],
			[25,"Ariel","black"],
			[true, co[i][0]],
			function(){
				startingSel1 = [(this.x-startX)/panelImgWidth, (this.y-startY)/panelImgHeight];
			}
		);
		var sel2 = new Button(
			"2"+i,
			canvasWidth-startX-curX*panelImgWidth,
			startY+curY*panelImgHeight,
			panelImgWidth,
			panelImgHeight,
			"",
			"",
			[canvasWidth-startX-curX*panelImgWidth, startY+curY*panelImgHeight, 0, 0],
			[25,"Ariel","black"],
			[true, co[i][0]],
			function(){
				startingSel2 = [(((canvasWidth-startX-this.x)/panelImgWidth)-1), (this.y-startY)/panelImgHeight];
			}
		);
		if (curX < maxPerRow){ curX++; } else { curX = 0; curY++; }
	}

}

function drawSelectedCharacter(){
	changeSelChar(1);
	changeSelChar(2);

	if (currentPlr1){
		ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
		ctx.fillRect((startingSel1[0]+1) * panelImgWidth, startY + (startingSel1[1] * panelImgHeight), panelImgWidth, panelImgHeight);
	} else {
		ctx.fillStyle = "rgba(255, 255, 0, 0.3)";
		ctx.fillRect((startingSel1[0]+1) * panelImgWidth, startY + (startingSel1[1] * panelImgHeight), panelImgWidth, panelImgHeight);
	}
	if (currentPlr2){
		ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
		ctx.fillRect(canvasWidth-startX-((startingSel2[0]+1) * panelImgWidth), startY + (startingSel2[1] * panelImgHeight), panelImgWidth, panelImgHeight);
	} else {
		ctx.fillStyle = "rgba(255, 255, 0, 0.3)";
		ctx.fillRect(canvasWidth-startX-((startingSel2[0]+1) * panelImgWidth), startY + (startingSel2[1] * panelImgHeight), panelImgWidth, panelImgHeight);
	}

	for (var i in co){
		if (i == selectedChar1){
			var selImg = new Image();
			selImg.src = co[i][1];
			ctx.drawImage(
				selImg,
				selectedImgX,
				selectedImgY,
				selectedImgWidth,
				selectedImgHeight
			)
		}
		if (i == selectedChar2){
			var selImg = new Image();
			selImg.src = co[i][1];
			ctx.drawImage(
				selImg,
				canvasWidth - (selectedImgX + selectedImgWidth),
				selectedImgY,
				selectedImgWidth,
				selectedImgHeight
			)
		}
	}
}

function drawVs(){
	var cimg = new Image();
	if (currentPlr1 && currentPlr2){ cimg.src = "Images/MainMenu/Ready.png"; var cimgW = 65; } else { cimg.src = ""; var cImgW = 0; }
	ctx.drawImage(cimg,(width/2)-(cimgW/2),0,cimgW,45);

	var vsImg = new Image();
	vsImg.src = "Images/MainMenu/VS.png";
	ctx.drawImage(vsImg,(width/2)-50,200,100,100);
	for (var i = 0; i < co.length; i++){
		if (currentPlr1 == co[i][0]){
			var vsImg = new Image();
			vsImg.src = co[i][2];
			ctx.drawImage(
				vsImg,
				100,
				50,
				300,
				350
			)
		}
		if (currentPlr2 == co[i][0]){
			var vsImg = new Image();
			vsImg.src = co[i][2];
			ctx.drawImage(
				vsImg,
				width-400,
				50,
				300,
				350
			)
		}
	}
}

function drawMenuObjects(){
	var relX = 	scrollRelX * scrollIncX;
	var relY = 	scrollRelY * scrollIncY;

	for (var i = 0; i < menuImages.length; i++){
		var ci = menuImages[i];
		var nImage = new Image();
		nImage.src = menuImages[i].img;
		var adjX = ci.x + 0; if (ci.relative && ci.relative[0]){ adjX += relX; }
		var adjY = ci.y + 0; if (ci.relative && ci.relative[1]){ adjY += relY; }
		ctx.drawImage(nImage, adjX, adjY, ci.width, ci.height);
	}
	for (var i = 0; i < menuTexts.length; i++){
		var ct = menuTexts[i];
		var adjX = ct.x + 0; if (ct.relative && ct.relative[0]){ adjX += relX; }
		var adjY = ct.y + 0; if (ct.relative && ct.relative[1]){ adjY += relY; }
		ctx.font = ct.textObj[0] + "px " + ct.textObj[1];
		ctx.fillStyle = ct.textObj[2];
		ctx.fillText(ct.content, adjX, adjY);
	}
}

function drawButtons(){
	var relX = 	scrollRelX * scrollIncX;
	var relY = 	scrollRelY * scrollIncY;

	for (var i = 0; i < buttons.length; i++){
		var cb = buttons[i];
		if (cb.ignore == false){
			cb.slide(cb);
			var adjX = cb.x + relX; if (!cb.relative || !cb.relative[0]){ adjX = 0; } var adjY = cb.y + relY; if (!cb.relative || !cb.relative[1]){ adjY = 0; }
			if (!cb.img[0]){
				ctx.fillStyle = cb.color;
				ctx.fillRect(cb.x+adjX,cb.y+adjY,cb.width,cb.height);
			} else {
				var bImage = new Image();
				bImage.src = cb.img[1];
				ctx.drawImage(bImage,cb.x+adjX,cb.y+adjY,cb.width,cb.height);
			}
			if (typeof !(cb.content == "undefined")){
				var bTextLen = cb.content.split("");
				var fontSize = cb.textObj[0];
				var font = cb.textObj[1];
				var fontColor = cb.textObj[2];
				ctx.fillStyle = fontColor;
				ctx.font = fontSize + "px " + font;
				var textWidth = ctx.measureText(cb.content).width;

				ctx.fillText( cb.content,
					(((cb.x)+cb.width/2)-(textWidth/2)) + adjX,
					((cb.y)+(cb.height/2)+fontSize/3) + adjY
				);
			}
		}
	}
}
