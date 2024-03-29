class Brick {
	constructor(tabX, tabY){
		this.tabX = tabX;
		this.tabY = tabY;
		this.x = (this.tabX - 1) * 200 + ((playBoardWidth - 800) / 2);
		this.y = (this.tabY - 1) * 200 + 25;
		this.w = 200;
		this.h = 200;
		this.color = "#111111";
		this.lineWidth = 3;
	}
	draw(){
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.color;
		ctx.strokeRect(this.x, this.y, this.w, this.h);
	}
}

class Chess{
	constructor(id, tabY, tabX, group, type){
		this.id = id;
		this.tabX = tabX;
		this.tabY = tabY;
		this.lastTabX = tabX;
		this.lastTabY = tabY;
		this.group = group;
		this.type = type;
		this.typeNo = 0;
		this.clicked = false;
		this.eated = false;
		this.cover = true;
		this.x = (this.tabX - 1) * 200 + 100 + ((playBoardWidth - 800) / 2);
		this.y = (this.tabY - 1) * 200 + 100 + 25;
		this.toX = this.x;
		this.toY = this.y;
		this.dx = 0;
		this.dy = 0;
		this.moveTime = 0;
		this.delayEatTime = -1;//未翻開被吃的顯示時間 -1:未啟動 0:開吃 >0:倒數
		this.delayEat = null;//要被吃得棋子id
		this.r = 80;
		this.color = "#f9d08b";
		this.clickedColor = "#ffcdcd";
		this.coverCloor = "#d8b455";
		if(this.group == "B"){
			this.fontColor = "#222222";
		}else if(this.group == "R"){
			this.fontColor = "#e00606";
		}
		
		//初始化棋子大小
		if(this.type == "king"){
			this.typeNo = 7;
		}else if(this.type == "guard"){
			this.typeNo = 6;
		}else if(this.type == "elephant"){
			this.typeNo = 5;
		}else if(this.type == "horse"){
			this.typeNo = 4;
		}else if(this.type == "car"){
			this.typeNo = 3;
		}else if(this.type == "cannon"){
			this.typeNo = 2;
		}else if(this.type == "normal"){
			this.typeNo = 1;
		}
	}
	draw(){		
		if(this.delayEatTime > 0){
			this.delayEatTime--;
		}else if(this.delayEatTime == 0){
			this.delayEat.toEated();
			this.delayEat = null;
			this.delayEatTime = -1;
		}
		
		if(this.delayEatTime <= 0 && (this.lastTabX != this.tabX || this.lastTabY != this.tabY)){
			this.lastTabX = this.tabX;
			this.lastTabY = this.tabY;
			this.toX = (this.tabX - 1) * 200 + 100 + ((playBoardWidth - 800) / 2);
			this.toY = (this.tabY - 1) * 200 + 100 + 25;
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
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.closePath();
		if(this.cover){
			ctx.fillStyle = this.coverCloor;
		}else{
			if(this.clicked){
				ctx.fillStyle = this.clickedColor;
			}else{
				ctx.fillStyle = this.color;
			}
		}
		ctx.fill();
		
		if(!this.cover){
			ctx.font = "85px Arial";
			ctx.textAlign = "center";
			ctx.fillStyle = this.fontColor;
			ctx.fillText(this.getChineseWord(), this.x , this.y + 34);
		}
	}
	toEated(){
		this.tabX = 99;
		this.tabY = 99;
		this.eated = true;
	}
	toDelayEated(chess){
		this.delayEatTime = 25;
		this.delayEat = chess;
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
		var bHp = 0;
		var rHp = 0;
		for(chess of chesses){
			if(chess.tabX < 90){
				if(chess.group == "B"){
					bHp++;
				}else if(chess.group == "R"){
					rHp++;
				}
			}
		}
		
		if(bHp == 0){
			this.win("紅方");
		}else if(rHp == 0){
			this.win("黑方");
		}
	}
	win(name){
		ctx.fillStyle = this.color;
		ctx.font = "80px Arial";
		ctx.textAlign = "center";
		ctx.fillText(name + "獲勝!!", canvas.width / 2, canvas.height / 2 - 70);
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
	constructor(chessTimeNo, id, tabX, tabY, action = "move"){
		this.chessTimeNo = chessTimeNo;
		this.id = id;
		this.tabX = tabX;
		this.tabY = tabY;
		this.action = action;
	}
	back(){
		for(chess of chesses){
			if(chess.id == this.id){
				if(this.action == "cover"){
					chess.cover = true;
				}else{
					chess.tabX = this.tabX;
					chess.tabY = this.tabY;
				}
			}
		}

	}
}

class Controller{
	constructor(x, y, type){
		this.w = 150;
		this.h = 60;
		this.x = x;
		this.y = y;
		this.centerX = this.x + (this.w / 2);
		this.centerY = this.y + (this.h / 2);
		this.color = "#252525";
		this.type = type;
		if(this.type == "replay"){
			this.text = "重下";
		}else if(this.type == "dark"){
			this.text = "明單";
		}
	}
	draw(){
		ctx.strokeStyle = this.color;
		ctx.strokeRect(this.x, this.y, this.w, this.h);
		
		ctx.fillStyle = this.color;
		ctx.font = "50px Arial";
		ctx.textAlign = "center";
		
		if(this.type == "dark"){
			this.text = darkEatFlag? "明單":"暗連";
		}
		ctx.fillText(this.text, this.centerX, this.centerY + 20);
	}
}

function createBrick(){
	for(let i=1; i<=4; i++){
		for(let j=1; j<=8; j++){
			bricks.push(new Brick(i, j));
		}
	}	
}
//產生0<=return<max的整數
function getRandomInt(max){
	return Math.floor(Math.random() * Math.floor(max));
}

function getRandomSeries(max){
	var series = [];
	var first = [];
	var second = [];
	var no = -1;
	for(let i=0; i<max; i++){
		first.push(i);
	}
	var j = 0;
	do{
		no = getRandomInt(max - j);
		second.push(first[no]);
		first.splice(no, 1);
		j++;
	}while(j < max)
	
	var k = 0;
	do{
		no = getRandomInt(max - k);
		series.push(second[no]);
		second.splice(no, 1);
		k++;
	}while(k < max)
	
	return series;
}
function createChess(){
	var ids = getRandomSeries(32);
	var i = 0;
	var groups = ["R", "B"];
	
	for(group of groups){
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "car"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "car"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "horse"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "horse"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "elephant"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "elephant"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "guard"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "guard"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "cannon"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "cannon"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "normal"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "normal"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "normal"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "normal"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "normal"));
		chesses.push(new Chess(ids[i], Math.floor(ids[i] / 4) + 1, (ids[i++] % 4) + 1, group, "king"));
	}
}
function createController(){
	controllers.push(new Controller(playBoardWidth - 250, 1635, "replay"));
	controllers.push(new Controller(playBoardWidth - 430, 1635, "dark"));
}
function createElement(){
	createBrick();
	createChess();
	score = new Score();
	createController();
}

function draw(){
	for(brick of bricks){
		brick.draw();
	}
	for(chess of chesses){
		if(chess.tabX < 90){
			chess.draw();
		}
	}
	for(tip of tips){
		tip.draw();
	}
	score.draw();
	for(controller of controllers){
		if(!(controller.type == "dark" && startPlayFlag)){
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

function getChessById(id){
	for(chess of chesses){
		if(chess.id == id){
			return chess;
		}
	}
	return null;
}
//判斷位移
function checkChessPath(chess, toX, toY){
	var pathFlag = false;
	var toEatedChess = getChess(toX , toY);
	var x = chess.tabX;
	var y = chess.tabY;
	console.log(x,y,toX,toY);
		
	if(chess.type == "cannon"){//炮
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
		
		if(count > 1){
			return false;
		}else if(count == 1){
			if(toEatedChess == null){
				return false;
			}else{
				pathFlag = true;//吃
			}
		}else if(count == 0){
			if(toEatedChess == null){//走
				if(x == toX && y + 1 == toY){
					pathFlag = true;
				}else if(x == toX && y - 1 == toY){
					pathFlag = true;
				}else if(x - 1 == toX && y == toY){
					pathFlag = true;
				}else if(x + 1 == toX && y == toY){
					pathFlag = true;
				}
			}else{
				return false;
			}
		}
	}else{
		if(x == toX && y + 1 == toY){
			pathFlag = true;
		}else if(x == toX && y - 1 == toY){
			pathFlag = true;
		}else if(x - 1 == toX && y == toY){
			pathFlag = true;
		}else if(x + 1 == toX && y == toY){
			pathFlag = true;
		}
	}
		
	return pathFlag;
}

//判斷大小
function checkChessEat(chess, toX, toY){
	var eatFlag = false;
	var toEatedChess = getChess(toX , toY);
		
	if(toEatedChess != null){
		if(chess.typeNo == 7){//將
			if(toEatedChess.typeNo != 1){
				eatFlag = true;
			}
		}else if(chess.typeNo == 2){//炮
			eatFlag = true;
		}else if(chess.typeNo == 1){//兵
			if(toEatedChess.typeNo == 7 || toEatedChess.typeNo == 1){
				eatFlag = true;
			}
		}else{
			if(chess.typeNo >= toEatedChess.typeNo){
				eatFlag = true;
			}
		}
	}else{
		eatFlag = true;
	}
	console.log("吃的兵太大了");
	return eatFlag;
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
					}else if(clickChess.cover){//吃未開棋
						if(darkEatFlag){//明吃
							showMsg("該棋尚未翻開");
						}else{//暗吃
							if(checkChessPath(nowChess, brick.tabX, brick.tabY)){
								//翻開加入紀錄檔
								logs.push(new Log(nowChessTimeNo, clickChess.id, 0, 0, "cover"));
								//翻開
								clickChess.cover = false;
								if(clickChess.group == nowChess.group){//暗吃同國
									//結束選取狀態
									nowChess.clicked = false;
									nowClicked = false;
								}else{//暗吃別國
									if(checkChessEat(nowChess, brick.tabX, brick.tabY)){//暗吃成功
										//移動前加入紀錄檔
										logs.push(new Log(nowChessTimeNo, nowChess.id, nowChess.tabX, nowChess.tabY));
										logs.push(new Log(nowChessTimeNo, clickChess.id, clickChess.tabX, clickChess.tabY));
										
										nowChess.toDelayEated(clickChess);//延遲再吃掉;

										//選中棋子移動
										nowChess.tabX = brick.tabX;
										nowChess.tabY = brick.tabY;
									}else{//暗吃失敗
										//結束選取狀態
										nowChess.clicked = false;
										nowClicked = false;
									}
								}
								nowChessTimeNo++;
							}
						}
					}else if(clickChess.group == nowChess.group){//點同國無效
						//交換狀態
						nowChess.clicked = false;
						clickChess.clicked = true;
						//持續選取狀態
						nowChess = clickChess;
						nowClicked = true;
					}else{//吃
						if(checkChessPath(nowChess, brick.tabX, brick.tabY) && checkChessEat(nowChess, brick.tabX, brick.tabY)){
							//移動前加入紀錄檔
							logs.push(new Log(nowChessTimeNo, nowChess.id, nowChess.tabX, nowChess.tabY));
							logs.push(new Log(nowChessTimeNo++, clickChess.id, clickChess.tabX, clickChess.tabY));
							
							clickChess.toEated();

							//選中棋子移動
							nowChess.tabX = brick.tabX;
							nowChess.tabY = brick.tabY;
						}
						if(darkEatFlag){//明吃結束狀態 暗吃繼續
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
					if(clickChess.cover){//如果還沒翻面
						//移動前加入紀錄檔
						logs.push(new Log(nowChessTimeNo++, clickChess.id, 0, 0, "cover"));
						clickChess.cover = false;
						
						startPlayFlag = true;//開始下棋
					}else{
						clickChess.clicked = true;
						nowChess = clickChess;
						nowClicked = true;//開始選取狀態
					}
				}
			}
			break;
		}
	}
	
	if(x > controller.x && x < controller.x + controller.w
		&& y > controller.y && y < controller.y + controller.h){

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
			}else if(!startPlayFlag && controller.type == "dark"){//暗吃
				if(darkEatFlag){
					darkEatFlag = false;
				}else{
					darkEatFlag = true;
				}
				localStorage.setItem("darkEatFlag", darkEatFlag);
			}
		}
	}
}

function aiWalkBug(){//爬蟲

	var allGap = [];
	for(ai of aiChess){
		var gap = [];
		for(player of playerChess){
			gap.push(Math.abs(player.tabX - ai.tabX) + Math.abs(player.tabY - ai.tabY))
		}
		allGap.push(gap);
	}
	console.log(allGap);
}
function aiEatChess(chess, toChess){
		console.log(chess, toChess);
	if(toChess != null && chess.group != toChess.group){
		toChess.toEated();
		chess.tabX = toChess.tabX;
		chess.tabY = toChess.tabY;
	}
}
function ai(){
	//			
	for(chess of chesses){
		if(!chess.cover){
			if(chess.group == aiGroup){
				aiChess.push(chess);
			}else{
				playerChess.push(chess);
			}
		}
	}

	
	if(aiChess.length == 0 || getRandomInt(100) <= (aiChess.length / 16) * 100){
		//翻棋
		var temp = [];
		for(chess of chesses){
			if(chess.cover){
				temp.push(chess);
			}
		}
		var key = getRandomInt(temp.length) - 1;
		temp[key].cover = false;
		//組成電腦棋隊
		if(aiChess.length == 0){
			aiGroup = temp[key].group;
		}
	}else{

	

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
	
	//記憶設定
	if(localStorage.getItem("darkEatFlag") != null){
		if(localStorage.getItem("darkEatFlag") == "true"){
			darkEatFlag = true;
		}else if(localStorage.getItem("darkEatFlag") == "false"){
			darkEatFlag = false;
		}
	}
	
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
	var playBoardHeight = 1700;
	var playBoardWidth = playBoardHeight * (9 / 16);
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
	var controllers = [];
	var aiGroup;//電腦顏色
	var aiChess = [];//電腦的棋子
	var playerChess = [];//玩家的棋子
	var darkEatFlag = true;//是否明吃
	var startPlayFlag = false;//下了第一顆子了
	
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