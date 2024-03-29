class Brick {
	constructor(tabX, tabY){
		this.tabX = tabX;
		this.tabY = tabY;
		this.x = (this.tabX - 1) * 100;
		this.y = (this.tabY - 1) * 100;
		this.w = 100;
		this.h = 100;
		this.centerX = this.x + (this.w / 2);
		this.centerY = this.y + (this.h / 2);
		this.lineT = true;
		this.lineB = true;
		this.lineL = true;
		this.lineR = true;
		this.lineTR = false;
		this.lineTL = false;
		this.lineBR = false;
		this.lineBL = false;
		this.color = "#111111";
		this.lineWidth = 3;
	}
	draw(){
		ctx.beginPath();
		if(this.lineT){
			ctx.moveTo(this.centerX, this.centerY);
			ctx.lineTo(this.centerX, this.y);
		}
		if(this.lineB){
			ctx.moveTo(this.centerX, this.centerY);
			ctx.lineTo(this.centerX, this.y + this.h);
		}
		if(this.lineL){
			ctx.moveTo(this.centerX, this.centerY);
			ctx.lineTo(this.x, this.centerY);
		}
		if(this.lineR){
			ctx.moveTo(this.centerX, this.centerY);
			ctx.lineTo(this.x + this.w, this.centerY);
		}
		if(this.lineTR){
			ctx.moveTo(this.centerX, this.centerY);
			ctx.lineTo(this.x + this.w, this.y);
		}
		if(this.lineTL){
			ctx.moveTo(this.centerX, this.centerY);
			ctx.lineTo(this.x, this.y);
		}
		if(this.lineBR){
			ctx.moveTo(this.centerX, this.centerY);
			ctx.lineTo(this.x + this.w, this.y + this.h);
		}
		if(this.lineBL){
			ctx.moveTo(this.centerX, this.centerY);
			ctx.lineTo(this.x, this.y + this.h);
		}
			
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.color;
		ctx.stroke();
	}
}

class Chess{
	constructor(id, tabY, tabX, group, type){
		this.id = id;
		this.tabX = tabX;
		this.tabY = tabY;
		this.group = group;
		this.type = type;
		this.clicked = false;
		this.eated = false;
		this.x = (this.tabX - 1) * 100 + 50;
		this.y = (this.tabY - 1) * 100 + 50;
		this.dx = 0;
		this.dy = 0;
		this.moveTime = 0;//正在移動
		this.r = 40;
		this.color = "#f9d08b";
		this.clickedColor = "#ffcdcd";
		if(this.group == "B"){
			this.fontColor = "#222222";
		}else if(this.group == "R"){
			this.fontColor = "#e00606";
		}
		
	}
	draw(){		
		var toX = (this.tabX - 1) * 100 + 50;
		var toY = (this.tabY - 1) * 100 + 50;

		if((this.x != toX || this.y != toY) && this.moveTime >= 0){
			if(this.moveTime == 0){
				this.dx = (toX - this.x) / 10;
				this.dy = (toY - this.y) / 10;
				this.moveTime = 10;
			}
			this.x+=this.dx;
			this.y+=this.dy;
			this.moveTime--;
			console.log("move");
		}else{
			this.dx = 0;
			this.dy = 0;
			this.moveTime = 0;
		}
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle = this.clicked? this.clickedColor:this.color;
		ctx.fill();
		
		ctx.font = "50px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = this.fontColor;
		
		ctx.fillText(this.getChineseWord(), this.x, this.y + 20);
	}
	toEated(){
		this.tabX = 99;
		this.tabY = 99;
		this.eated = true;
	}
	getChineseWord(){
		var word = "";
		if(this.group == "B"){
			if(this.type == "car"){
				word = "車";
			}else if(this.type == "horse"){
				word = "馬";
			}else if(this.type == "elephant"){
				word = "象";
			}else if(this.type == "guard"){
				word = "士";
			}else if(this.type == "king"){
				word = "將";
			}else if(this.type == "cannon"){
				word = "包";
			}else if(this.type == "normal"){
				word = "卒";
			}
		}else if(this.group == "R"){
			if(this.type == "car"){
				word = "俥";
			}else if(this.type == "horse"){
				word = "傌";
			}else if(this.type == "elephant"){
				word = "相";
			}else if(this.type == "guard"){
				word = "仕";
			}else if(this.type == "king"){
				word = "帥";
			}else if(this.type == "cannon"){
				word = "炮";
			}else if(this.type == "normal"){
				word = "兵";
			}
		}
		return word;
	}
}


class Score {
	constructor(){
		this.color = "#111111";
	}
	draw(){
		if(bKing.tabX > 90){
			this.win("紅方");
		}else if(rKing.tabX > 90){
			this.win("黑方");
		}
	}
	win(name){
		ctx.fillStyle = this.color;
		ctx.font = "80px Arial";
		ctx.textAlign = "center";
		ctx.fillText(name + "獲勝!!", canvas.width / 2, canvas.height / 2 - 270);
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
	constructor(chessTimeNo, id, tabX, tabY){
		this.chessTimeNo = chessTimeNo;
		this.id = id;
		this.tabX = tabX;
		this.tabY = tabY;
	}
	back(){
		for(chess of chesses){
			if(chess.id == this.id){
				chess.tabX = this.tabX;
				chess.tabY = this.tabY;
			}
		}

	}
}

class Controller{
	constructor(){
		this.w = 100;
		this.h = 70;
		this.x = playBoardWidth - this.w - 100;
		this.y = 1200;
		this.centerX = playBoardWidth - (this.w / 2) - 100;
		this.centerY = this.y + (this.h / 2);
		this.color = "#252525";
	}
	draw(){
		ctx.strokeStyle = this.color;
		ctx.strokeRect(this.x, this.y, this.w, this.h);
		
		ctx.fillStyle = this.color;
		ctx.font = "40px Arial";
		ctx.textAlign = "center";
		ctx.fillText("重下", this.centerX, this.centerY + 15);
	}
}


function createBrick(){
	var j = 1;
	for(let i=1; i<=90; i++){
		var brick = new Brick(i - ((j - 1) * 9), j);
		if(i <= 9){
			brick.lineT = false;
		}
		if(i >= 82){
			brick.lineB = false;
		}
		if(i % 9 == 1){
			brick.lineL = false;
		}
		if(i % 9 == 0){
			brick.lineR = false;
			j++;
		}
		if(i >= 38 && i <= 44){
			brick.lineB = false;
		}
		if(i >= 47 && i <= 53){
			brick.lineT = false;
		}
		//王宮
		if(i == 4|| i == 67){
			brick.lineBR = true;
		}
		if(i == 6|| i == 69){
			brick.lineBL = true;
		}
		if(i == 14|| i == 77){
			brick.lineTR = true;
			brick.lineTL = true;
			brick.lineBR = true;
			brick.lineBL = true;
		}
		if(i == 22|| i == 85){
			brick.lineTR = true;
		}
		if(i == 24 || i == 87){
			brick.lineTL = true;
		}
		bricks.push(brick);
	}	
}

function createChess(){
	var i = 0;
	chesses.push(new Chess(i++, 1, 1, "R", "car"));
	chesses.push(new Chess(i++, 1, 9, "R", "car"));
	chesses.push(new Chess(i++, 1, 2, "R", "horse"));
	chesses.push(new Chess(i++, 1, 8, "R", "horse"));
	chesses.push(new Chess(i++, 1, 3, "R", "elephant"));
	chesses.push(new Chess(i++, 1, 7, "R", "elephant"));
	chesses.push(new Chess(i++, 1, 4, "R", "guard"));
	chesses.push(new Chess(i++, 1, 6, "R", "guard"));
	chesses.push(new Chess(i++, 1, 5, "R", "king"));
	chesses.push(new Chess(i++, 3, 2, "R", "cannon"));
	chesses.push(new Chess(i++, 3, 8, "R", "cannon"));
	chesses.push(new Chess(i++, 4, 1, "R", "normal"));
	chesses.push(new Chess(i++, 4, 3, "R", "normal"));
	chesses.push(new Chess(i++, 4, 5, "R", "normal"));
	chesses.push(new Chess(i++, 4, 7, "R", "normal"));
	chesses.push(new Chess(i++, 4, 9, "R", "normal"));
	
	chesses.push(new Chess(i++, 10, 1, "B", "car"));
	chesses.push(new Chess(i++, 10, 9, "B", "car"));
	chesses.push(new Chess(i++, 10, 2, "B", "horse"));
	chesses.push(new Chess(i++, 10, 8, "B", "horse"));
	chesses.push(new Chess(i++, 10, 3, "B", "elephant"));
	chesses.push(new Chess(i++, 10, 7, "B", "elephant"));
	chesses.push(new Chess(i++, 10, 4, "B", "guard"));
	chesses.push(new Chess(i++, 10, 6, "B", "guard"));
	chesses.push(new Chess(i++, 10, 5, "B", "king"));
	chesses.push(new Chess(i++, 8, 2, "B", "cannon"));
	chesses.push(new Chess(i++, 8, 8, "B", "cannon"));
	chesses.push(new Chess(i++, 7, 1, "B", "normal"));
	chesses.push(new Chess(i++, 7, 3, "B", "normal"));
	chesses.push(new Chess(i++, 7, 5, "B", "normal"));
	chesses.push(new Chess(i++, 7, 7, "B", "normal"));
	chesses.push(new Chess(i++, 7, 9, "B", "normal"));
		
	for(chess of chesses){
		if(chess.group == "B" && chess.type == "king")
			bKing = chess;
		if(chess.group == "R" && chess.type == "king")
			rKing = chess;
	}
	
}

function createElement(){
	createBrick();
	createChess();
	score = new Score();
	controller = new Controller();
}

function draw(){
	for(brick of bricks){
		brick.draw();
	}
	for(chess of chesses){
		if(chess.tabX < 90)
			chess.draw();
	}
	for(tip of tips){
		tip.draw();
	}
	score.draw();
	controller.draw();
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

function showMsg(str){
	tips.push(new Tip(canvas.width / 2, canvas.height / 2 - 265, str));
}

function getChess(tabX, tabY){
	for(chess of chesses){
		if(chess.tabX == tabX && chess.tabY == tabY){
			return chess;
		}
	}
	return null;
}

function checkChessPath(chess, toX, toY){
	var pathFlag = false;
	var kingMeetKingFlag = false;
	var x = chess.tabX;
	var y = chess.tabY;
	var tempX = x;
	var tempY = y;
	console.log(x,y,toX,toY);
	if(chess.type == "car"){
		if(x == toX && y > toY){
			for(let i=y-1; i>toY; i--){
				if(getChess(x , i) != null)
					return false;
			}
			pathFlag = true;
		}else if(x == toX && y < toY){
			for(let i=y+1; i<toY; i++){
				if(getChess(x , i) != null)
					return false;
			}
			pathFlag = true;
		}else if(y == toY && x > toX){
			for(let i=x-1; i>toX; i--){
				if(getChess(i , y) != null)
					return false;
			}
			pathFlag = true;
		}else if(y == toY && x < toX){
			for(let i=x+1; i<toX; i++){
				if(getChess(i , y) != null)
					return false;
			}
			pathFlag = true;
		}
	}else if(chess.type == "horse"){
		if(x + 2 == toX && (y + 1 == toY || y - 1 == toY)){
			if(getChess(x + 1 , y) == null){
				pathFlag = true;
			}else{
				showMsg("拐馬腳");
				return false;
			}
		}else if(x - 2 == toX && (y + 1 == toY || y - 1 == toY)){
			if(getChess(x - 1 , y) == null){
				pathFlag = true;
			}else{
				showMsg("拐馬腳");
				return false;
			}
		}else if(y + 2 == toY && (x + 1 == toX || x - 1 == toX)){
			if(getChess(x , y + 1) == null){
				pathFlag = true;
			}else{
				showMsg("拐馬腳");
				return false;
			}
		}else if(y - 2 == toY && (x + 1 == toX || x - 1 == toX)){
			if(getChess(x , y - 1) == null){
				pathFlag = true;
			}else{
				showMsg("拐馬腳");
				return false;
			}
		}
	}else if(chess.type == "elephant"){
		if(chess.group == "B"){
			if(toY < 6){
				showMsg("不可過河");
				return false;
			}
		}else if(chess.group == "R"){
			if(toY > 5){
				showMsg("不可過河");
				return false;
			}
		}
		if(x + 2 == toX && y + 2 == toY){
			if(getChess(x + 1 , y + 1) == null){
				pathFlag = true;
			}else{
				showMsg("塞象眼");
				return false;
			}
		}else if(x + 2 == toX && y - 2 == toY){
			if(getChess(x + 1 , y - 1) == null){
				pathFlag = true;
			}else{
				showMsg("塞象眼");
				return false;
			}
		}else if(x - 2 == toX && y + 2 == toY){
			if(getChess(x - 1 , y + 1) == null){
				pathFlag = true;
			}else{
				showMsg("塞象眼");
				return false;
			}
		}else if(x - 2 == toX && y - 2 == toY){
			if(getChess(x - 1 , y - 1) == null){
				pathFlag = true;
			}else{
				showMsg("塞象眼");
				return false;
			}
		}
	}else if(chess.type == "guard"){
		if(chess.group == "B"){
			if(toX < 4 || toX > 6 || toY < 8){
				showMsg("不可走出王宮");
				return false;
			}
		}else if(chess.group == "R"){
			if(toX < 4 || toX > 6 || toY > 3){
				showMsg("不可走出王宮");
				return false;
			}
		}
		if(x + 1 == toX && y + 1 == toY){
			pathFlag = true;
		}else if(x + 1 == toX && y - 1 == toY){
			pathFlag = true;
		}else if(x - 1 == toX && y + 1 == toY){
			pathFlag = true;
		}else if(x - 1 == toX && y - 1 == toY){
			pathFlag = true;
		}
	}else if(chess.type == "king"){
		if(chess.group == "B"){
			if(toX < 4 || toX > 6 || toY < 8){
				showMsg("不可走出王宮");
				return false;
			}
		}else if(chess.group == "R"){
			if(toX < 4 || toX > 6 || toY > 3){
				showMsg("不可走出王宮");
				return false;
			}
		}
		if(x == toX && y + 1 == toY){
			pathFlag = true;
		}else if(x == toX && y - 1 == toY){
			pathFlag = true;
		}else if(x - 1 == toX && y == toY){
			pathFlag = true;
		}else if(x + 1 == toX && y == toY){
			pathFlag = true;
		}
	}else if(chess.type == "cannon"){
		var count = 0;
		if(x == toX && y > toY){
			for(let i=y-1; i>toY; i--){
				if(getChess(x , i) != null){
					count++;
				}
			}
		}else if(x == toX && y < toY){
			for(let i=y+1; i<toY; i++){
				if(getChess(x , i) != null){
					count++;
				}
			}
		}else if(y == toY && x > toX){
			for(let i=x-1; i>toX; i--){
				if(getChess(i , y) != null){
					count++;
				}
			}
		}else if(y == toY && x < toX){
			for(let i=x+1; i<toX; i++){
				if(getChess(i , y) != null){
					count++;
				}
			}
		}
		if(count == 1){
			var toEatedChess = getChess(toX , toY);
			if(toEatedChess == null){
				return false;
			}else{
				if(toEatedChess.group == chess.group){
					return false;
				}
				pathFlag = true;//吃
			}
		}else if(count == 0){
			if(x == toX || y == toY){
				if(getChess(toX , toY) == null){//沒碰到棋子
					pathFlag = true;//走
				}else{//碰到棋子
					return false;
				}
			}
		}else{
			return false;
		}
	}else if(chess.type == "normal"){
		if(chess.group == "B"){
			if(x == toX && y - 1 == toY){
				pathFlag = true;
			}
			if(y < 6){
				if(x - 1 == toX && y == toY){
					pathFlag = true;
				}else if(x + 1 == toX && y == toY){
					pathFlag = true;
				}
			}
		}else if(chess.group == "R"){
			if(x == toX && y + 1 == toY){
				pathFlag = true;
			}
			if(y > 5){
				if(x - 1 == toX && y == toY){
					pathFlag = true;
				}else if(x + 1 == toX && y == toY){
					pathFlag = true;
				}
			}
		}
	}
	
	//王不見王判定
	if(getChess(toX, toY) == bKing || getChess(toX, toY) == rKing){
		//吃掉棋子的情況
		kingMeetKingFlag = true;
	}
	chess.tabX = toX;
	chess.tabY = toY;
	if(bKing.tabX == rKing.tabX){
		for(let i=rKing.tabY+1; i<bKing.tabY; i++){
			if(getChess(bKing.tabX , i) != null){
				kingMeetKingFlag = true;
			}
		}
	}else{
		kingMeetKingFlag = true;
	}
	if(!kingMeetKingFlag){
		if(pathFlag){
			showMsg("王不見王");
		}
	}
	chess.tabX = tempX;
	chess.tabY = tempY;
	
	return (pathFlag && kingMeetKingFlag);
}

function onClickChess(x, y){
	for(brick of bricks){
		if(x > brick.x && x < brick.x + brick.w
		&& y > brick.y && y < brick.y + brick.h){
			var clickChess = getChess(brick.tabX, brick.tabY);
			if(nowClicked){//已經選取
				if(clickChess != null){//點到棋子
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
					}else{//吃
						if(checkChessPath(nowChess, brick.tabX, brick.tabY)){
							//移動前加入紀錄檔
							logs.push(new Log(nowChessTimeNo, nowChess.id, nowChess.tabX, nowChess.tabY));
							logs.push(new Log(nowChessTimeNo++, clickChess.id, clickChess.tabX, clickChess.tabY));
							
							clickChess.toEated();

							//選中棋子移動
							nowChess.tabX = brick.tabX;
							nowChess.tabY = brick.tabY;
							
							//結束選取狀態
							nowChess.clicked = false;
							nowClicked = false;
						}
					}
				}else{//沒點到棋子
					if(checkChessPath(nowChess, brick.tabX, brick.tabY)){
						//移動前加入紀錄檔
						logs.push(new Log(nowChessTimeNo++, nowChess.id, nowChess.tabX, nowChess.tabY));
						//選中棋子移動
						nowChess.tabX = brick.tabX;
						nowChess.tabY = brick.tabY;
						//結束選取狀態
						nowChess.clicked = false;
						nowClicked = false;
					}
				}
			}else{//尚未選取
				if(clickChess != null){//點到棋子
					clickChess.clicked = true;
					nowChess = clickChess;
					nowClicked = true;//開始選取狀態
				}
			}
			break;
		}
	}
	
	if(x > controller.x && x < controller.x + controller.w
		&& y > controller.y && y < controller.y + controller.h){
		if(nowChessTimeNo > 0){
			for(log of logs){
				if(log.chessTimeNo == nowChessTimeNo - 1){
					log.back();
				}
			}
			nowChessTimeNo--;
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
	var playBoardWidth = 900;
	var playBoardHeight = playBoardWidth * (16 / 9);
	var time = 0;
	var scale = 0;
	var nowClicked = false;//已經選取的狀態
	var nowChess = null;//現在選取的棋子
	var nowChessTimeNo = 0;//現在的移動紀錄
	
	//物件類別
	var bricks = [];
	var chesses = [];
	var tips = [];
	var logs = [];//遊戲紀錄
	var score;
	var controller;
	var bKing = null;//雙方的王
	var rKing = null;
	init();
	
	
	

window.addEventListener("mousemove", function(e){
});
window.addEventListener("click", function(e){
	e.preventDefault();//防止click與touchend衝突
	var x = e.offsetX;
	var y = e.offsetY;
	onClickChess(x, y);	
});

window.addEventListener("touchstart", function(e){
});

window.addEventListener("touchmove", function(e){
});
window.addEventListener("touchend", function(e){
	e.preventDefault();//防止click與touchend衝突
	var x = e.changedTouches[0].pageX ;
	var y = e.changedTouches[0].pageY;
	onClickChess(x * (1 / scale), y * (1 / scale));	
});