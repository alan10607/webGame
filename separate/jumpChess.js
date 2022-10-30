class Brick {
	constructor(x, y, lineTL, lineTR, lineL, lineR, lineBL, lineBR, type){
		this.x = x;
		this.y = y;
		this.r = brickR;
		this.lineL = lineL;
		this.lineR = lineR;
		this.lineTR = lineTR;
		this.lineTL = lineTL;
		this.lineBR = lineBR;
		this.lineBL = lineBL;
		this.color = "#111111";
		this.lineWidth = 3;
		if(type == null){
			this.type = [""];
		}else{
			this.type = type;
		}
		
	}
	draw(){
		if(this.lineL != ""){
			this.drawLine(180, this.lineL);
		}
		if(this.lineR != ""){
			this.drawLine(0, this.lineR);
		}
		if(this.lineTR != ""){
			this.drawLine(60, this.lineTR);
		}
		if(this.lineTL != ""){
			this.drawLine(120, this.lineTL);
		}
		if(this.lineBR != ""){
			this.drawLine(300, this.lineBR);
		}
		if(this.lineBL != ""){
			this.drawLine(240, this.lineBL);
		}

	}
	drawLine(ro, type){
		ctx.beginPath();
		ctx.lineWidth = this.lineWidth;
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + Math.cos(Math.PI * ro / 180) * this.r, this.y - Math.sin(Math.PI * ro / 180) * this.r);
		if(type == "B"){
			ctx.strokeStyle = "#3c78b5";
		}else if(type == "R"){
			ctx.strokeStyle = "#b53c6b";
		}else if(type == "G"){
			ctx.strokeStyle = "#93b53c";
		}else{
			ctx.strokeStyle = this.color;
		}
		ctx.stroke();
	}
}


class Chess{
	constructor(id, x, y, group){
		this.group = group;
		this.x = x;
		this.y = y;
		this.toX = x;
		this.toY = y;
		this.lastToX = x;
		this.lastToY = y;
		this.id = id;
		this.clicked = false;
		this.dx = 0;
		this.dy = 0;
		this.moveTime = 0;
		this.r = brickR - 18;
		if(this.group == "B"){
			this.color = "#072061";
		}else if(this.group == "R"){
			this.color = "#651743";
		}else if(this.group == "G"){
			this.color = "#486517";
		}
		this.clickedColor = "#ffcdcd";
		this.lastMoveColor = "#b59999";
	}
	draw(){	
		//移動
		if(this.lastToX != this.toX || this.lastToY != this.toY){
			this.lastToX = this.toX;
			this.lastToY = this.toY;
			this.dx = (this.toX - this.x)/10;
			this.dy = (this.toY - this.y)/10;
			this.moveTime = 10;
		}
		if(this.moveTime > 0){
			this.x += this.dx;
			this.y += this.dy;
			this.moveTime--;
			console.log("move");
		}else if(this.moveTime == 0){
			this.dx = 0;
			this.dy = 0;
			this.moveTime = 0;
			this.x = this.toX;
			this.y = this.toY;
		}
		
		//選擇顯示樣式
		if(chessStyle == "symbol"){
			ctx.font = "90px Arial";
			ctx.textAlign = "center";
			ctx.fillStyle = this.getColor();
			ctx.fillText("\u265F", this.x, this.y + 12);
		}else{
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
			ctx.fillStyle = this.getColor();
			ctx.fill();
		}
	}
	getColor(){
		if(this.clicked){
			return this.clickedColor;
		}else if(logs.length > 0 && this.id == logs[logs.length - 1].id){//如果是上一個移動的棋子
			return this.color + "99";
		}else{
			return this.color;
		}
	
	}
}


class Score {
	constructor(){
		this.color = "#111111";
	}
	draw(){
		var bScore = 0;
		var rScore = 0;
		var gScore = 0;
		var chess = null;
		for(brick of bricks){
			for(type of brick.type){
				if(type == "bEnd"){
					chess = getChessByBrick(brick);
					if(chess != null && chess.group == "B"){
						bScore++;
					}
				}else if(type == "rEnd"){
					chess = getChessByBrick(brick);
					if(chess != null && chess.group == "R"){
						rScore++;
					}
				}else if(type == "gEnd"){
					chess = getChessByBrick(brick);
					if(chess != null && chess.group == "G"){
						gScore++;
					}
				}
			}
		}
		
		if(bScore == chessNum){
			this.win("藍方");
		}else if(bScore == chessNum){
			this.win("紅方");
		}else if(gScore == chessNum){
			this.win("綠方");
		}
	}
	win(name){
		ctx.fillStyle = this.color;
		ctx.font = "80px Arial";
		ctx.textAlign = "center";
		ctx.fillText(name + "獲勝!!", canvas.width / 2, 775);
	}
}


class Tip{
	constructor(x, y, str){
		this.x = x;
		this.y = y;
		this.str = str;
		this.fontSize = "60px";
		this.existTime = 30;
		this.color = "#111111";
		this.alpha = 1;
		this.dx = 0;
		this.dy = -0.5;
	}
	draw(){
		this.y += this.dy;
		ctx.golbalAlpha = this.alpha * this.existTime / 50;
		ctx.fillStyle = this.color;
		ctx.font = this.fontSize + " Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.str, this.x, this.y);
		this.existTime--;
	}
}

class Log{
	constructor(chessTimeNo, id, toX, toY){
		this.chessTimeNo = chessTimeNo;
		this.id = id;
		this.toX = toX;
		this.toY = toY;
	}
	back(){
		for(chess of chesses){
			if(chess.id == this.id){
				chess.toX = this.toX;
				chess.toY = this.toY;
			}
		}
	}
}

class Controller{
	constructor(x, y, type){
		this.w = 150;
		this.h = 80;
		this.x = x;
		this.y = y;
		this.type = type;
		this.centerX = this.x + (this.w / 2);
		this.centerY = this.y + (this.h / 2);
		this.color = "#252525";
		
		if(this.type == "replay"){
			this.text = "重下";
		}else if(this.type == "player"){
			this.text = "人數";
		}else if(this.type == "style"){
			this.text = "樣式";
		}
	}
	draw(){
		ctx.strokeStyle = this.color;
		ctx.strokeRect(this.x, this.y, this.w, this.h);
		
		ctx.fillStyle = this.color;
		ctx.font = "50px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.text, this.centerX, this.centerY + 20);
	}
}

function createBrick(){
	var x = playBoardWidth / 2;
	var y = brickR;
	var i = 0;
	var gapX = 100;
	var gapY = Math.sqrt(Math.pow(gapX, 2) - Math.pow(gapX / 2, 2));
	
	i = 0;
	bricks.push(new Brick(x, y+i*gapY, "", "", "", "", "B", "B", ["bEnd"]));
	i = 1;
	bricks.push(new Brick(x+0.5*gapX, y+i*gapY, "B", "", "B", "", "B", "B", ["bEnd"]));
	bricks.push(new Brick(x-0.5*gapX, y+i*gapY, "", "B", "", "B", "B", "B", ["bEnd"]));
	i = 2;
	bricks.push(new Brick(x, y+i*gapY, "B", "B", "B", "B", "B", "B", ["bEnd"]));
	bricks.push(new Brick(x+gapX, y+i*gapY, "B", "", "B", "", "B", "B", ["bEnd"]));
	bricks.push(new Brick(x-gapX, y+i*gapY, "", "B", "", "B", "B", "B", ["bEnd"]));
	i = 3;
	bricks.push(new Brick(x+0.5*gapX, y+i*gapY, "B", "B", "B", "B", "B", "B", ["bEnd"]));
	bricks.push(new Brick(x-0.5*gapX, y+i*gapY, "B", "B", "B", "B", "B", "B", ["bEnd"]));
	bricks.push(new Brick(x+1.5*gapX, y+i*gapY, "B", "", "B", "", "B", "B", ["bEnd"]));
	bricks.push(new Brick(x-1.5*gapX, y+i*gapY, "", "B", "", "B", "B", "B", ["bEnd"]));
	i = 4;
	bricks.push(new Brick(x, y+i*gapY, "B", "B", "B", "B", "X", "X", ["bEnd"]));
	bricks.push(new Brick(x+gapX, y+i*gapY, "B", "B", "B", "B", "X", "X", ["bEnd"]));
	bricks.push(new Brick(x-gapX, y+i*gapY, "B", "B", "B", "B", "X", "X", ["bEnd"]));
	bricks.push(new Brick(x+2*gapX, y+i*gapY, "B", "", "B", "G", "X", "G", ["bEnd", "gStart"]));
	bricks.push(new Brick(x-2*gapX, y+i*gapY, "", "B", "R", "B", "R", "X", ["bEnd", "rStart"]));
	bricks.push(new Brick(x+3*gapX, y+i*gapY, "", "", "G", "G", "G", "G", ["gStart"]));
	bricks.push(new Brick(x-3*gapX, y+i*gapY, "", "", "R", "R", "R", "R", ["rStart"]));
	bricks.push(new Brick(x+4*gapX, y+i*gapY, "", "", "G", "G", "G", "G", ["gStart"]));
	bricks.push(new Brick(x-4*gapX, y+i*gapY, "", "", "R", "R", "R", "R", ["rStart"]));
	bricks.push(new Brick(x+5*gapX, y+i*gapY, "", "", "G", "G", "G", "G", ["gStart"]));
	bricks.push(new Brick(x-5*gapX, y+i*gapY, "", "", "R", "R", "R", "R", ["rStart"]));
	bricks.push(new Brick(x+6*gapX, y+i*gapY, "", "", "G", "", "G", "", ["gStart"]));
	bricks.push(new Brick(x-6*gapX, y+i*gapY, "", "", "", "R", "", "R", ["rStart"]));
	i = 5;
	bricks.push(new Brick(x+0.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-0.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+1.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-1.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+2.5*gapX, y+i*gapY, "G", "G", "X", "G", "X", "G", ["gStart"]));
	bricks.push(new Brick(x-2.5*gapX, y+i*gapY, "R", "R", "R", "X", "R", "X", ["rStart"]));
	bricks.push(new Brick(x+3.5*gapX, y+i*gapY, "G", "G", "G", "G", "G", "G", ["gStart"]));
	bricks.push(new Brick(x-3.5*gapX, y+i*gapY, "R", "R", "R", "R", "R", "R", ["rStart"]));
	bricks.push(new Brick(x+4.5*gapX, y+i*gapY, "G", "G", "G", "G", "G", "G", ["gStart"]));
	bricks.push(new Brick(x-4.5*gapX, y+i*gapY, "R", "R", "R", "R", "R", "R", ["rStart"]));
	bricks.push(new Brick(x+5.5*gapX, y+i*gapY, "G", "G", "G", "", "G", "", ["gStart"]));
	bricks.push(new Brick(x-5.5*gapX, y+i*gapY, "R", "R", "", "R", "", "R", ["rStart"]));
	i = 6;
	bricks.push(new Brick(x, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+2*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-2*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+3*gapX, y+i*gapY, "G", "G", "X", "G", "X", "G", ["gStart"]));
	bricks.push(new Brick(x-3*gapX, y+i*gapY, "R", "R", "R", "X", "R", "X", ["rStart"]));
	bricks.push(new Brick(x+4*gapX, y+i*gapY, "G", "G", "G", "G", "G", "G", ["gStart"]));
	bricks.push(new Brick(x-4*gapX, y+i*gapY, "R", "R", "R", "R", "R", "R", ["rStart"]));
	bricks.push(new Brick(x+5*gapX, y+i*gapY, "G", "G", "G", "", "G", "", ["gStart"]));
	bricks.push(new Brick(x-5*gapX, y+i*gapY, "R", "R", "", "R", "", "R", ["rStart"]));
	i = 7;
	bricks.push(new Brick(x+0.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-0.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+1.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-1.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+2.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-2.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+3.5*gapX, y+i*gapY, "G", "G", "X", "G", "X", "G", ["gStart"]));
	bricks.push(new Brick(x-3.5*gapX, y+i*gapY, "R", "R", "R", "X", "R", "X", ["rStart"]));
	bricks.push(new Brick(x+4.5*gapX, y+i*gapY, "G", "G", "G", "", "G", "", ["gStart"]));
	bricks.push(new Brick(x-4.5*gapX, y+i*gapY, "R", "R", "", "R", "", "R", ["rStart"]));
	i = 8;
	bricks.push(new Brick(x, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+2*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-2*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+3*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-3*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+4*gapX, y+i*gapY, "G", "G", "X", "", "R", "R", ["gStart", "rEnd"]));
	bricks.push(new Brick(x-4*gapX, y+i*gapY, "R", "R", "", "X", "G", "G", ["rStart", "gEnd"]));
	i = 9;
	bricks.push(new Brick(x+0.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-0.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+1.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-1.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+2.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-2.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+3.5*gapX, y+i*gapY, "X", "R", "X", "R", "R", "R", ["rEnd"]));
	bricks.push(new Brick(x-3.5*gapX, y+i*gapY, "G", "X", "G", "X", "G", "G", ["gEnd"]));
	bricks.push(new Brick(x+4.5*gapX, y+i*gapY, "R", "", "R", "", "R", "R", ["rEnd"]));
	bricks.push(new Brick(x-4.5*gapX, y+i*gapY, "", "G", "", "G", "G", "G", ["gEnd"]));
	i = 10;
	bricks.push(new Brick(x, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+2*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-2*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+3*gapX, y+i*gapY, "X", "R", "X", "R", "R", "R", ["rEnd"]));
	bricks.push(new Brick(x-3*gapX, y+i*gapY, "G", "X", "G", "X", "G", "G", ["gEnd"]));
	bricks.push(new Brick(x+4*gapX, y+i*gapY, "R", "R", "R", "R", "R", "R", ["rEnd"]));
	bricks.push(new Brick(x-4*gapX, y+i*gapY, "G", "G", "G", "G", "G", "G", ["gEnd"]));
	bricks.push(new Brick(x+5*gapX, y+i*gapY, "R", "", "R", "", "R", "R", ["rEnd"]));
	bricks.push(new Brick(x-5*gapX, y+i*gapY, "", "G", "", "G", "G", "G", ["gEnd"]));
	i = 11;
	bricks.push(new Brick(x+0.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-0.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+1.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x-1.5*gapX, y+i*gapY, "X", "X", "X", "X", "X", "X"));
	bricks.push(new Brick(x+2.5*gapX, y+i*gapY, "X", "R", "X", "R", "R", "R", ["rEnd"]));
	bricks.push(new Brick(x-2.5*gapX, y+i*gapY, "G", "X", "G", "X", "G", "G", ["gEnd"]));
	bricks.push(new Brick(x+3.5*gapX, y+i*gapY, "R", "R", "R", "R", "R", "R", ["rEnd"]));
	bricks.push(new Brick(x-3.5*gapX, y+i*gapY, "G", "G", "G", "G", "G", "G", ["gEnd"]));
	bricks.push(new Brick(x+4.5*gapX, y+i*gapY, "R", "R", "R", "R", "R", "R", ["rEnd"]));
	bricks.push(new Brick(x-4.5*gapX, y+i*gapY, "G", "G", "G", "G", "G", "G", ["gEnd"]));
	bricks.push(new Brick(x+5.5*gapX, y+i*gapY, "R", "", "R", "", "R", "R", ["rEnd"]));
	bricks.push(new Brick(x-5.5*gapX, y+i*gapY, "", "G", "", "G", "G", "G", ["gEnd"]));
	i = 12;
	bricks.push(new Brick(x, y+i*gapY, "X", "X", "X", "X", "B", "B", ["bStart"]));
	bricks.push(new Brick(x+gapX, y+i*gapY, "X", "X", "X", "X", "B", "B", ["bStart"]));
	bricks.push(new Brick(x-gapX, y+i*gapY, "X", "X", "X", "X", "B", "B", ["bStart"]));
	bricks.push(new Brick(x+2*gapX, y+i*gapY, "X", "R", "X", "R", "B", "", ["rEnd", "bStart"]));
	bricks.push(new Brick(x-2*gapX, y+i*gapY, "G", "X", "G", "X", "", "B", ["gEnd", "bStart"]));
	bricks.push(new Brick(x+3*gapX, y+i*gapY, "R", "R", "R", "R", "", "", ["rEnd"]));
	bricks.push(new Brick(x-3*gapX, y+i*gapY, "G", "G", "G", "G", "", "", ["gEnd"]));
	bricks.push(new Brick(x+4*gapX, y+i*gapY, "R", "R", "R", "R", "", "", ["rEnd"]));
	bricks.push(new Brick(x-4*gapX, y+i*gapY, "G", "G", "G", "G", "", "", ["gEnd"]));
	bricks.push(new Brick(x+5*gapX, y+i*gapY, "R", "R", "R", "R", "", "", ["rEnd"]));
	bricks.push(new Brick(x-5*gapX, y+i*gapY, "G", "G", "G", "G", "", "", ["gEnd"]));
	bricks.push(new Brick(x+6*gapX, y+i*gapY, "R", "", "R", "", "", "", ["rEnd"]));
	bricks.push(new Brick(x-6*gapX, y+i*gapY, "", "G", "", "G", "", "", ["gEnd"]));
	i = 13;
	bricks.push(new Brick(x+0.5*gapX, y+i*gapY, "B", "B", "B", "B", "B", "B", ["bStart"]));
	bricks.push(new Brick(x-0.5*gapX, y+i*gapY, "B", "B", "B", "B", "B", "B", ["bStart"]));
	bricks.push(new Brick(x+1.5*gapX, y+i*gapY, "B", "B", "B", "", "B", "", ["bStart"]));
	bricks.push(new Brick(x-1.5*gapX, y+i*gapY, "B", "B", "", "B", "", "B", ["bStart"]));
	i = 14;
	bricks.push(new Brick(x, y+i*gapY, "B", "B", "B", "B", "B", "B", ["bStart"]));
	bricks.push(new Brick(x+gapX, y+i*gapY, "B", "B", "B", "", "B", "", ["bStart"]));
	bricks.push(new Brick(x-gapX, y+i*gapY, "B", "B", "", "B", "", "B", ["bStart"]));
	i = 15;
	bricks.push(new Brick(x+0.5*gapX, y+i*gapY, "B", "B", "B", "", "B", "", ["bStart"]));
	bricks.push(new Brick(x-0.5*gapX, y+i*gapY, "B", "B", "", "B", "", "B", ["bStart"]));
	i = 16;
	bricks.push(new Brick(x, y+i*gapY, "B", "B", "", "", "", "", ["bStart"]));
}

function createChess(way){
	var id = 0;
	var bFlag = false;
	var rFlag = false;
	var gFlag = false;
	if(way == "all"){
		bFlag = true;
		rFlag = true;
		gFlag = true;
	}else{
		var temp = way.split("");
		if(temp.indexOf("b") != -1){
			bFlag = true;
		}
		if(temp.indexOf("r") != -1){
			rFlag = true;
		}
		if(temp.indexOf("g") != -1){
			gFlag = true;
		}
	}
	for(brick of bricks){
		for(type of brick.type){
			if(type == "bStart" && bFlag){
				chesses.push(new Chess(id++, brick.x, brick.y, "B"));
			}else if(type == "rStart" && rFlag){
				chesses.push(new Chess(id++, brick.x, brick.y, "R"));
			}else if(type == "gStart" && gFlag){
				chesses.push(new Chess(id++, brick.x, brick.y, "G"));
			}
		}
	}
}

function createController(){
	controllers.push(new Controller(playBoardWidth - 250, 1600, "replay"));
	controllers.push(new Controller(playBoardWidth - 430, 1600, "player"));
	controllers.push(new Controller(playBoardWidth - 610, 1600, "style"));
}
function createElement(){
	createBrick();
	createChess("all");
	score = new Score();
	createController();
}

function draw(){
	for(brick of bricks){
		brick.draw();
	}
	for(chess of chesses){
		chess.draw();
	}
	for(tip of tips){
		tip.draw();
	}
	score.draw();
	for(controller of controllers){
		if(!(controller.type == "player" && startPlayFlag || controller.type == "style" && startPlayFlag)){
			controller.draw();
		}
	}
}

function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); 
}


function deleteElement(){
	var newTips = [];
	for(tip of tips){
		if(tip.existTime <= 0){
			tip = null;
			delete tip;
		}else{
			newTips.push(tip);
		}
	}
	tips = newTips;
	
	
	if(nowChessTimeNo < logs.length){
		var newLogs = [];
		for(log of logs){
			if(log.chessTimeNo >= nowChessTimeNo){
				log = null;
				delete log;
			}else{
				newLogs.push(log);
			}
		}
		logs = newLogs;
	}
}

function deleteChess(){
	for(chess of chesses){
		chess = null;
		delete chess;
	}
	chesses = [];
}

function showMsg(str){
	tips.push(new Tip(canvas.width / 2, canvas.height / 2 - 265, str));
}

//原始位置, 角度, 半徑
function toX(x, degree, r){
	return x + Math.cos(Math.PI * degree/ 180) * r;
}
//原始位置, 角度, 半徑
function toY(y, degree, r){
	return y - Math.sin(Math.PI * degree / 180) * r;
}

//檢查是否可走或跳
function checkChessMove(chess, toBrick){
	var x = chess.x;
	var y = chess.y;
	var rr = brickR * 2;//查一直徑距離
	var status = "x";//預設靜止
		
	if(getBrickByClick(toX(x, 0, rr), toY(y, 0, rr)) == toBrick
		||getBrickByClick(toX(x, 60, rr), toY(y, 60, rr)) == toBrick
		||getBrickByClick(toX(x, 120, rr), toY(y, 120, rr)) == toBrick
		||getBrickByClick(toX(x, 180, rr), toY(y, 180, rr)) == toBrick
		||getBrickByClick(toX(x, 240, rr), toY(y, 240, rr)) == toBrick
		||getBrickByClick(toX(x, 300, rr), toY(y, 300, rr)) == toBrick
	){//走
		status = "walk";
	}else if((getBrickByClick(toX(x, 0, rr*2), toY(y, 0, rr*2)) == toBrick && getChessByClick(toX(x, 0, rr), toY(y, 0, rr)) != null)
		||(getBrickByClick(toX(x, 60, rr*2), toY(y, 60, rr*2)) == toBrick && getChessByClick(toX(x, 60, rr), toY(y, 60, rr)) != null)
		||(getBrickByClick(toX(x, 120, rr*2), toY(y, 120, rr*2)) == toBrick && getChessByClick(toX(x, 120, rr), toY(y, 120, rr)) != null)
		||(getBrickByClick(toX(x, 180, rr*2), toY(y, 180, rr*2)) == toBrick && getChessByClick(toX(x, 180, rr), toY(y, 180, rr)) != null)
		||(getBrickByClick(toX(x, 240, rr*2), toY(y, 240, rr*2)) == toBrick && getChessByClick(toX(x, 240, rr), toY(y, 240, rr)) != null)
		||(getBrickByClick(toX(x, 300, rr*2), toY(y, 300, rr*2)) == toBrick && getChessByClick(toX(x, 300, rr), toY(y, 300, rr)) != null)
	){//跳
		status = "jump";
	}
	
	return status;
}


//檢查是否可以繼續跳
function checkStillMove(chess, toBrick){
	var x = toBrick.x;
	var y = toBrick.y;
	var rr = brickR * 2;
	var ros = [0, 60, 120, 180, 240, 300];
	var checkBrick = null;
	var checkChess = null;
	var checkBrickX = 0;
	var checkBrickY = 0;
	var checkChessX = 0;
	var checkChessY = 0;
	for(ro of ros){
		checkBrickX = toX(x, ro, rr*2);
		checkBrickY = toY(y, ro, rr*2);
		//不判定原本自己的位子
		//if(!(checkBrickX + 0.1 > chess.x && checkBrickX - 0.1 < chess.x && checkBrickY + 0.1 > chess.y && checkBrickY - 0.1 < chess.y)){
		if(1 == 1){
			checkBrick = getBrickByPosi(checkBrickX, checkBrickY);
			if(checkBrick != null && getChessByBrick(checkBrick) == null){
				//隔兩格有位子
				checkChessX = toX(x, ro, rr);
				checkChessY = toY(y, ro, rr);
				checkChess = getChessByClick(checkChessX, checkChessY);
				if(checkChess != null){//隔一格有棋子
					//可以再跳
					return true;
				}
			}
		}
	}
	
	return false;
}

function getBrickByPosi(x, y){
	for(brick of bricks){
		if((brick.x + 0.1 > x && brick.x - 0.1 < x) 
			&& (brick.y + 0.1 > y && brick.y - 0.1 < y) ){
			return brick;
		}
	}
	return null;
}

function getBrickByClick(x, y){
	var min = 9999;
	var returnBrick = null
	var z = 0;
	for(brick of bricks){
		z = Math.sqrt(Math.pow(x - brick.x, 2) + Math.pow(y - brick.y, 2));
		if(z < brickR){
			if(min > z){
				min = z;
				returnBrick = brick;
			}
		}
	}
	return returnBrick;
}

function getChessByClick(x, y){
	var brick = getBrickByClick(x, y);
	if(brick != null){
		for(chess of chesses){
			if(brick.x == chess.x && brick.y == chess.y){
				return chess;
			}
		}
	}
	return null;
}

function getChessByBrick(brick){
	//用brick找chess
	if(brick != null){
		for(chess of chesses){
			if(brick.x == chess.x && brick.y == chess.y){
				return chess;
			}
		}
	}
	return null;
}

//點選主方法
function onClickChess(x, y){
	var clickBrick = getBrickByClick(x, y);
	var clickChess = getChessByBrick(clickBrick);
	var check = "";
	console.log(x, y,clickBrick, clickChess);
	if(nowClicked){//已經選取
		if(nowChessStatus == "touchMoveJump" || nowChessStatus == "touchMoveWalk"){//正在連續移動
				//更新狀態為正常
				nowChessStatus = "";
				//直接結束選取狀態
				nowChess.clicked = false;
				nowClicked = false;
		}else if(clickChess != null){//點到棋子
			if(clickChess == nowChess){//點自己
				//結束選取狀態
				nowChess.clicked = false;
				nowClicked = false;
			}else if(clickChess.group == nowChess.group){//點同國無效
				//交換狀態
				nowChess.clicked = false;
				clickChess.clicked = true;
				//持續選取狀態
				nowChess = clickChess;
				nowClicked = true;
			}
		}else{//沒點到棋子=移動
			if(clickBrick != null){
				check = checkChessMove(nowChess, clickBrick)
				if(check != "x"){
					//移動前加入紀錄檔
					logs.push(new Log(nowChessTimeNo++, nowChess.id, nowChess.toX, nowChess.toY));
					//選中棋子移動
					nowChess.toX = clickBrick.x;
					nowChess.toY = clickBrick.y;
					//判定結束選取狀態
					if(!checkStillMove(nowChess, clickBrick)){
						//不能再跳 結束選取狀態
						nowChess.clicked = false;
						nowClicked = false;
					}
				}
			}
		}
	}else{//尚未選取
		if(clickChess != null){//點到棋子
			clickChess.clicked = true;
			nowChess = clickChess;
			nowClicked = true;//開始選取狀態
			
			startPlayFlag = true;//開始下棋
		}
	}

	for(controller of controllers){
		if(x > controller.x && x < controller.x + controller.w
		&& y > controller.y && y < controller.y + controller.h){
			if(controller.type == "replay"){//重下
				if(nowChessTimeNo > 0){
					for(log of logs){
						if(log.chessTimeNo == nowChessTimeNo - 1){
							log.back();
						}
					}
					nowChessTimeNo--;
				}
			}else if(!startPlayFlag && controller.type == "player"){//人數
				deleteChess();
				if(playMode == "all"){
					createChess("br");
					playMode = "br";
				}else if(playMode == "br"){
					createChess("rg");
					playMode = "rg";
				}else if(playMode == "rg"){
					createChess("gb");
					playMode = "gb";
				}else if(playMode == "gb"){
					createChess("all");
					playMode = "all";
				}
			}else if(!startPlayFlag && controller.type == "style"){//樣式
				if(chessStyle == "normal"){
					chessStyle = "symbol";
				}else if(chessStyle == "symbol"){
					chessStyle = "normal";
				}
			}
		}
	}

}

//手指拖移主方法
function onTouchChess(x, y){
	var clickBrick = getBrickByClick(x, y);
	var clickChess = getChessByBrick(clickBrick);
	var check = "";
	if(nowClicked){//已經選取
		if(clickChess == null){//沒點到棋子=移動
			if(clickBrick != null){
				check = checkChessMove(nowChess, clickBrick)
				if(check != "x"){
					console.log(check, nowChessStatus);
					if(nowChessStatus == "" || (check == "jump" &&  nowChessStatus == "touchMoveJump")){//可以連跳
						if(nowChessStatus == ""){
							//只記錄最一開始的位置
							logs.push(new Log(nowChessTimeNo++, nowChess.id, nowChess.toX, nowChess.toY));
							//只記錄一次移動狀態
							if(check == "jump"){
								nowChessStatus = "touchMoveJump";
							}else if(check == "walk"){
								nowChessStatus = "touchMoveWalk";
							}
						}
						//選中棋子移動
						nowChess.toX = clickBrick.x;
						nowChess.toY = clickBrick.y;
						//不結束選取狀態
					}
				}
			}
		}
	}

}

function main(){
	time++;
	clear();
	draw();
	deleteElement();
	
	raf = window.requestAnimationFrame(main);
	
	
}


function init(){
	//ui初始化 大小調整
	var clientWidth = document.documentElement.clientWidth;
	var clientHeight = document.documentElement.clientHeight;
	canvas.width = playBoardWidth;
	canvas.height = playBoardHeight;
	if(clientWidth * (16 / 9) < clientHeight){
		scale = clientWidth / playBoardWidth;
	}else{
		scale = clientHeight / playBoardHeight;
	}
	canvas.style.transform = "scale(" + scale + ")";
	canvas.style.left = (clientWidth - (playBoardWidth * scale)) / 2 + "px";
	playBoardScale = scale;
	

	createElement();

	raf = window.requestAnimationFrame(main);
	
}	

function restart(){
}

	var canvas = document.getElementById("mainCanvas");
	var ctx;
	if (canvas.getContext){
		ctx = canvas.getContext("2d");
	}else{
		alert("瀏覽器不支援");
	}
	var raf;
	var paush;
	var playBoardScale = 1;//縮放
	var playBoardWidth = 1300;
	var playBoardHeight = playBoardWidth * (16 / 9);
	var time = 0;
	var scale = 0;
	var nowClicked = false;//已經選取的狀態
	var nowChess = null;//現在選取的棋子
	var nowChessTimeNo = 0;//現在的移動紀錄
	var nowChessStatus = "";
	var brickR = 50;//棋格半徑
	var chessNum = 15;//棋子數量
	var chessStyle = "normal";//棋子樣式
	var startPlayFlag = false;//下了第一顆子了
	var playMode = "all";//玩家人數
	
	//物件類別
	var bricks = [];
	var chesses = [];
	var tips = [];
	var logs = [];//遊戲紀錄
	var score;
	var controllers = [];
	
	init();
	

window.addEventListener("mousemove", function(e){
});
window.addEventListener("click", function(e){
	e.preventDefault();	
	var x = e.offsetX;
	var y = e.offsetY - document.documentElement.scrollTop;
	onClickChess(x , y );	
});

window.addEventListener("touchstart", function(e){
});

window.addEventListener("touchmove", function(e){
	e.preventDefault();
	var x = e.changedTouches[0].pageX;
	var y = e.changedTouches[0].pageY - document.documentElement.scrollTop;;
	onTouchChess(x * (1 / scale), y * (1 / scale));	
},{passive: false});
window.addEventListener("touchend", function(e){
	e.preventDefault();//防止click與touchend衝突
	var x = e.changedTouches[0].pageX;
	var y = e.changedTouches[0].pageY - document.documentElement.scrollTop;
	onClickChess(x * (1 / scale), y * (1 / scale));	
});

//用來消除行動裝置瀏覽器拖移時的頁面飄移
window.addEventListener("scroll", function(e){
	var center = document.getElementById("center");
	if(document.documentElement.scrollTop > center.offsetTop + 100 || document.documentElement.scrollTop < center.offsetTop - 100){
		document.documentElement.scrollTop = center.offsetTop;
	}
});