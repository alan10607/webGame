class Player{
	constructor(){
		this.startX = 0;
		this.startY = 0;
		this.endX = 0;
		this.endY = 0;
		this.status = "stop"
	
	}
}
class Box{
	constructor(tabX, tabY){
		this.tabX = tabX;
		this.tabY = tabY;
		this.w = playBoardWidth / playBoardSize;
		this.h = playBoardWidth / playBoardSize;
		this.x = (tabX - 1) * this.w;
		this.y = (tabY - 1) * this.h;
		this.color = "#5f5f5f";

	}
	draw(){
	
		ctx.lineWidth = 3;
		ctx.strokeStyle = this.color;
		ctx.strokeRect(this.x, this.y, this.w, this.h);
		ctx.lineWidth = 1;
	}
}


class Brick{
	constructor(tabX, tabY){
		this.tabX = tabX;
		this.tabY = tabY;
		this.w = playBoardWidth / playBoardSize;
		this.h = playBoardWidth / playBoardSize;
		this.x = tabX * this.w;
		this.y = tabY * this.w;
		this.num = 2;
		this.toX = this.x;
		this.toY = this.y;
		this.lastToX = this.x;
		this.lastToY = this.y;
		this.centerX = this.x + this.w/2;
		this.centerY = this.y + this.h/2;
		this.dx = 0;
		this.dy = 0;
		this.moveTime = 0;
		this.delayTime = 0;
		this.r = brickR - 18;
		this.getColor();
		this.fontColor = "#ffffff";
		this.status = "";
	}
	draw(){	
		//刪除
		if(this.status == "delayRemove"){
			if(this.delayTime == 0){
				this.delayTime = 10;
			}
			if(this.delayTime > 0){
				if(this.delayTime == 1){
					this.status = "remove";
				}
				this.delayTime--;
				ctx.globalAlpha = (this.delayTime + 2) * 0.1;
			}
		}

		
		//移動
		this.toX = this.tabX * this.w;
		this.toY = this.tabY * this.w;
		if(this.lastToX != this.toX || this.lastToY != this.toY){
			this.lastToX = this.toX;
			this.lastToY = this.toY;
			this.dx = (this.toX - this.x)/10;
			this.dy = (this.toY - this.y)/10;
			this.moveTime = 10;
		}
		if(this.moveTime > 0){
			if(this.moveTime == 1){
				this.dx = 0;
				this.dy = 0;
				this.x = this.toX;
				this.y = this.toY;
			}else{
				this.x += this.dx;
				this.y += this.dy;
			}
			this.moveTime--;			
		}
		this.centerX = this.x + this.w/2;
		this.centerY = this.y + this.h/2;
		
		//顏色
		this.getColor();
		
		//選擇顯示樣式
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		
		ctx.font = "50px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = this.fontColor;
		ctx.fillText(this.num, this.centerX, this.centerY + 32);
		
		ctx.globalAlpha = 1;
	}
	getColor(){
		if(this.num == 2){
			this.color = "#174665";
		}else if(this.num == 4){
			this.color = "#172565";
		}else if(this.num == 8){
			this.color = "#320c50";
		}else if(this.num == 16){
			this.color = "#01403f";
		}else if(this.num == 32){
			this.color = "#034c04";
		}else if(this.num == 64){
			this.color = "#b37305";
		}else if(this.num == 128){
			this.color = "#b31a05";
		}else if(this.num == 256){
			this.color = "#b30538";
		}else if(this.num == 512){
			this.color = "#174665";
		}else if(this.num == 1024){
			this.color = "#4e4e4e";
		}else if(this.num == 2048){
			this.color = "#1d1d1d";
		}else if(this.num == 4096){
			this.color = "#ffc502";
		}else{
		}
	}
}

function tes(){
for(let i=0; i<15; i++){
	toDirection("right");
	toDirection("bottom");
	createBrick();
	}
}

class Score {
	constructor(){
		this.color = "#111111";
	}
	draw(){
	
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
	constructor(x, y, w, h, type, chooseNum){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.centerX = this.x + (this.w / 2);
		this.centerY = this.y + (this.h / 2);
		this.type = type;
		this.choose = 0;
		this.chooseNum = chooseNum;
		this.color = "#252525";
		this.fontSize = "40px";
		this.status = "";
		
		if(this.type == "fun"){
			this.text = "++";
		}
	}
	draw(){
		ctx.strokeStyle = this.color;
		ctx.strokeRect(this.x, this.y, this.w, this.h);
		
		ctx.fillStyle = this.color;
		ctx.font = this.fontSize + " Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.text, this.centerX, this.centerY + 16);
	}
	tap(){
		this.choose++;
		if(this.choose >= this.chooseNum){
			this.choose = 0;
		}
	
		if(this.type == "fun"){
			
		}
	}
}



function createBox(){
	var size = playBoardSize;
	for(let i=1; i<=size; i++){
		for(let j=1; j<=size; j++){
			boxes.push(new Box(i, j));
		}
	}
}

function createBrick(){
	var num = playBoardSize;
	var tempX = [];
	var tempY = [];
	var tabX = 0;
	var tabY = 0;
	var indexX = 0;
	var indexY = 0;
	
	//初始化陣列
	for(let i=0; i<num; i++){
		tempX.push(i);
		tempY.push(i);
	}
	
	//先確認X有空位
	do{
		indexX = getRandomInt(tempX.length);
		tabX = tempX.splice(indexX, 1)[0];
		var flag = true;
		for(let i=0; i<tempY.length; i++){
			if(findBrickByTab(tabX, i) == null){
				flag = false;
				break;
			}
		}
		//已無空位
		if(tempX.length == 0){
			return;
		}
	}while(flag)
	
	//確認Y有空位
	do{
		indexY = getRandomInt(tempY.length);
		tabY = tempY.splice(indexY, 1)[0];
	}while(findBrickByTab(tabX, tabY) != null)
	
	bricks.push(new Brick(tabX, tabY));
}

function createController(){
	controllers.push(new Controller(playBoardWidth - 250, 1600, 150, 80, "fun", 2));
}
function createElement(){
	createBox();
	createBrick();
	createBrick();
	player = new Player();
	score = new Score();
	createController();
}

function drawAll(eles){
	for(e of eles){
		e.draw();
	}
}
function draw(){
	drawAll(bricks);
	drawAll(boxes);
	score.draw();
	drawAll(controllers);
}

function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); 
}


function deleteElement(){
	var newBricks = [];
	for(brick of bricks){
		if(brick.status == "remove"){
			brick = null;
			delete brick;
		}else{
			newBricks.push(brick);
		}
	}
	bricks = newBricks;	


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

//產生0<=return<max的整數
function getRandomInt(max){
	return Math.floor(Math.random() * Math.floor(max));
}
//找方塊
function findBrickByTab(tabX, tabY){
	for(brick of bricks){
		if(brick.tabX == tabX && brick.tabY == tabY){
			return brick;
		}
	}
	return null;
}
//找方塊
function findBrickByTabX(tabX){
	var temp = []
	for(brick of bricks){
		if(brick.tabX == tabX){
			temp.push(brick);
		}
	}
	return temp;
}
//找方塊
function findBrickByTabY(tabY){
	var temp = []
	for(brick of bricks){
		if(brick.tabY == tabY){
			temp.push(brick);
		}
	}
	return temp;
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

function toDirection(type){
	var size = playBoardSize;
	var lines = [];
	var temp = 0;
	var next = null;
	for(let i=0; i<size; i++){
		var line = [];
		for(let j=0; j<size; j++){
			var brick;
			if(type == "right" || type == "left"){
				brick = findBrickByTab(j, i);
			}else if(type == "top" || type == "bottom"){
				brick = findBrickByTab(i, j);
			}
			line.push(brick);
		}
		lines.push(line);
	}

	if(type == "right" || type == "bottom"){
		for(line of lines){
			temp = line.length-1;
			for(let i=line.length-1; i>-1; i--){
				if(line[i] != null){
					if(type == "right"){
						line[i].tabX = temp;
						next = findBrickByTab(line[i].tabX+1, line[i].tabY);
						if(next != null && next.status == "" && line[i].num == next.num){
							line[i].tabX = temp+1;
							line[i].num += next.num;
							next.status = "delayRemove";
						}else{
							temp--;
						}
					}else if(type == "bottom"){
						line[i].tabY = temp;
						next = findBrickByTab(line[i].tabX, line[i].tabY+1);
						if(next != null && next.status == "" && line[i].num == next.num){
							line[i].tabY = temp+1;
							line[i].num += next.num;
							next.status = "delayRemove";
						}else{
							temp--;
						}
					}
				}
			}
		}
	}else if(type == "left" || type == "top" ){
		for(line of lines){
			temp = 0;
			for(let i=0; i<line.length; i++){
				if(line[i] != null){
				
					if(type == "left"){
						line[i].tabX = temp;
						next = findBrickByTab(line[i].tabX-1, line[i].tabY);
						if(next != null && next.status == "" && line[i].num == next.num){
							line[i].tabX = temp-1;
							line[i].num += next.num;
							next.status = "delayRemove";
						}else{
							temp++;
						}
					}else if(type == "top"){
						line[i].tabY = temp;
						next = findBrickByTab(line[i].tabX, line[i].tabY-1);
						if(next != null && next.status == "" && line[i].num == next.num){
							line[i].tabY = temp-1;
							line[i].num += next.num;
							next.status = "delayRemove";
						}else{
							temp++;
						}
					}
				}
			}
		}
	}

}

//點選菜單
function onTouchController(x, y){
	for(controller of controllers){
		if(x > controller.x && x < controller.x + controller.w && y > controller.y && y < controller.y + controller.h){
			controller.tap();
		}
	}
}
//手指拖移主方法
function onTouchBrick(x, y){
	if(player.status == "stop"){
		player.startX = x;
		player.startY = y;
		player.status = "move";
	}
}
//手指離開主方法
function onTouchEndBrick(x, y){
	if(player.status == "move"){
		player.endX = x;
		player.endY = y;
		player.status = "stop";
		var gapX = player.endX - player.startX;
		var gapY = player.endY - player.startY;
		if(Math.abs(gapX) >= Math.abs(gapY)){
			if(gapX > 0){//向右
				toDirection("right");
			}else{//向左
				toDirection("left");
			}
		}else{
			if(gapY > 0){//向下
				toDirection("bottom");
			}else{//向上
				toDirection("top");
			}
		}
		//生成方塊
		createBrick();
	}
}

function main(){
	time++;
	clear();
	draw();
	deleteElement();
	if(controllers[0].choose == 1){
		tes();
	}
	
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
	var playBoardWidth = 1200;
	var playBoardHeight = playBoardWidth * (16 / 9);
	var playBoardSize = 4;
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
	var boxes = [];
	var tips = [];
	var logs = [];//遊戲紀錄
	var player;
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
	var y = e.changedTouches[0].pageY - document.documentElement.scrollTop;
	onTouchBrick(x * (1 / scale), y * (1 / scale));
},{passive: false});

window.addEventListener("touchend", function(e){
	e.preventDefault();
	var x = e.changedTouches[0].pageX;
	var y = e.changedTouches[0].pageY - document.documentElement.scrollTop;
	onTouchEndBrick(x * (1 / scale), y * (1 / scale));
	onTouchController(x * (1 / scale), y * (1 / scale));
});


//用來消除行動裝置瀏覽器拖移時的頁面飄移
window.addEventListener("scroll", function(e){
	var center = document.getElementById("center");
	if(document.documentElement.scrollTop > center.offsetTop + 100 || document.documentElement.scrollTop < center.offsetTop - 100){
		document.documentElement.scrollTop = center.offsetTop;
	}
});