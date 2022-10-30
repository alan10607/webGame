class Player{
	constructor(){
		this.playTime = -1;
		this.touchCardId = [-1];
		this.okNum = 0;
		this.step = 0;
		this.difficulty = 0;
		this.startPlayFlag = false;
	}
}
class Box{
	constructor(col){
		this.col = col;
		this.w = 90;
		this.h = 140;
		this.x = col * this.w;
		this.y = 250;
		this.color = "#5f5f5f";
		this.borderColor = "#969696";
		this.status = "";

	}
	draw(){
		ctx.strokeStyle = this.borderColor;
		ctx.strokeRect(this.x+5, this.y+5, this.w-10, this.h-10);
	}
	
}
class Card{
	constructor(id, num, type, row, col, status){
		this.num = num;
		this.type = type;
		this.row = row;
		this.col = col;
		this.id = id;
		this.w = 90;
		this.h = 140;
		this.posi();
		this.fullTop = 40;//上方留空
		this.top = 20;//上方留空
		this.pickX = 0;//選取時的誤差
		this.pickY = 0;//選取時的誤差
		this.stack = -1;//堆疊
		this.subStack = -1;//堆疊
		this.oriType = type;
		
		this.color = "#f2f2f2";
		this.coverColor = "#006865";
		this.borderColor = "#002e60";
		this.coverBorderColor = "#ffffff";
		this.status = status==null? "":status;
		this.moveTime = 0;
		this.speed = 15;
		this.dx = 0;
		this.dy = 0;
		this.toX = 0;
		this.toY = 0;
		this.stick();
		this.setFlower();
		this.setText();

		
	}
	draw(){
		this.posi();
		this.move();
		
		ctx.save();
		this.roundRect(this.x+5, this.y+5, this.w-10, this.h-10, 5);
		ctx.lineWidth = 3;
		if(this.status == "cover" || this.status == "stack"){
			ctx.strokeStyle = this.coverBorderColor;
			ctx.stroke();
			ctx.fillStyle = this.coverColor;
			ctx.fill();
		}else{
			ctx.strokeStyle = this.borderColor;
			ctx.stroke();
			ctx.fillStyle = this.color;
			ctx.fill();
			
			ctx.fillStyle = this.fontColor;
			ctx.font = "70px Arial";
			ctx.textAlign = "center";
			
			ctx.fillText(this.flower, this.centerX, this.centerY+22);
			ctx.font = "35px Arial";
			ctx.textAlign = "left";
			ctx.fillText(this.text, this.x+10, this.y+38);
			ctx.font = "45px Arial";
			ctx.textAlign = "right";
			ctx.fillText(this.flower, this.x+this.w-12, this.y+38);
			
			ctx.rotate(Math.PI);
			ctx.translate(-2*this.x-this.w, -2*this.y-this.h);
			ctx.font = "35px Arial";
			ctx.textAlign = "left";
			ctx.fillText(this.text, this.x+10, this.y+38);
			ctx.font = "45px Arial";
			ctx.textAlign = "right";
			ctx.fillText(this.flower, this.x+this.w-12, this.y+38);
			ctx.restore();
		}
		
	}
	posi(){
		this.centerX = this.x + this.w/2;
		this.centerY = this.y + this.h/2;
	}
	stick(){
		if(this.status == "stack"){
			this.x = this.stack * 105 - this.subStack*1.5 + 40;
			this.y = playBoardHeight - 500 + this.subStack*1;		
		}else{
			this.x = this.col * this.w;
			this.y = 250 + this.row * this.fullTop;
		}
	}
	moveStick(){
		if(this.status == "ok"){
			this.toX = playBoardWidth - this.w - this.stack * 105 - this.subStack*1.5 - 20;
			this.toY = playBoardHeight - 500 + this.subStack*1;			
		}else{
			this.toX = this.col * this.w;
			this.toY = 250 + this.row * this.fullTop;
		}
		this.dx = (this.toX - this.x) / this.speed;
		this.dy = (this.toY - this.y) / this.speed;
		this.moveTime = this.speed;
	}
	move(){
		if(this.moveTime > 0){
			this.moveTime--;
			this.x += this.dx;
			this.y += this.dy;
			if(this.moveTime == 0){
				this.x = this.toX;
				this.y = this.toY;
			}
		}
	}
	setType(){
		if(player.difficulty == 0){
			this.type = 0;
		}else if(player.difficulty == 1){
			if(this.oriType == 0 || this.oriType == 3){
				this.type = 0;
			}else if(this.oriType == 1 || this.oriType == 2){
				this.type = 1;
			}
		}else if(player.difficulty == 2){
			this.type = this.oriType;
		}
		this.setFlower();
	}
	setFlower(){
		if(this.type == 0){
			this.flower = "\u2660";//♠
		}else if(this.type == 1){
			this.flower = "\u2665";//♥
		}else if(this.type == 2){
			this.flower = "\u2666";//♦
		}else if(this.type == 3){
			this.flower = "\u2663";//♣
		}
		if(this.type == 0 || this.type == 3){
			this.fontColor = "#1e1e1e";
		}else if(this.type == 1 || this.type == 2){
			this.fontColor = "#b20a0a";
		}
	}
	setText(){
		if(this.num == 1){
			this.text = "A";
		}else if(this.num == 11){
			this.text = "J";
		}else if(this.num == 12){
			this.text = "Q";
		}else if(this.num == 13){
			this.text = "K";
		}else{
			this.text = this.num; 
		}
	}
	roundRect(x, y, w, h, radius){
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.arcTo(x + w, y, x + w, y + h, radius);
		ctx.arcTo(x + w, y + h, x, y + h, radius);
		ctx.arcTo(x, y + h, x, y, radius);
		ctx.arcTo(x, y, x + w, y, radius);
		ctx.closePath();
	}
	
}



class Score {
	constructor(){
		this.color = "#111111";
		this.winFlag = false;
	}	
	draw(){
		ctx.fillStyle = this.color;
		ctx.font = "40px Arial";
		ctx.textAlign = "left";
		var gap = 50;
		var x = 25;
		ctx.fillText("Time: " + this.getDuring(), x, 1*gap+10);
		ctx.fillText("Move: " + player.step, x, 2*gap+10);
		
		if(player.okNum == 8 && !this.winFlag){
			showMsg("YOU WIN !!");
			winFlag = true;
		}
	}
	getDuring(){
		var s = Math.floor((new Date - player.time) / 1000);
		return String(Math.floor(s/60)) + ":" + String(s%60).padStart(2, "0");
	}
	
}



class Tip{
	constructor(str){
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.str = str;
		this.fontSize = "70px";
		this.existTime = 300;
		this.color = "#111111";
		this.textAlign = "center";
		this.status = "";
	}
	draw(){
		ctx.fillStyle = this.color;
		ctx.font = this.fontSize + " serif";
		ctx.textAlign = this.textAlign;
		ctx.fillText(this.str, this.x, this.y);
		
		if(this.existTime > 0){
			this.existTime--;
		}else{
			this.status = "remove";
		}
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
		this.subType = 0;
		this.choose = 0;
		this.chooseNum = chooseNum;
		this.color = "#111111";
		this.bgColor = "#ffffff77";
		this.fontSize = "42px";
		this.status = "";
		this.textAlign = "center";
		
		if(this.type == "difficulty"){
			this.text = "Hard";
			this.choose = 2;
		}
	}
	draw(){
		if(player.startPlayFlag){
			this.status = "remove";
		}
	
		ctx.strokeStyle = this.color;
		ctx.strokeRect(this.x, this.y, this.w, this.h);

		ctx.fillStyle = this.color;
		ctx.font = this.fontSize + " Arial";
		ctx.textAlign = this.textAlign;
		ctx.fillText(this.text, this.centerX, this.centerY+17);
	}
	tap(){
		this.choose++;
		if(this.choose >= this.chooseNum){
			this.choose = 0;
		}
		if(this.type == "difficulty"){
			if(this.choose == 0){
				this.text = "Easy";
				player.difficulty = 0;
			}else if(this.choose == 1){
				this.text = "Normal";
				player.difficulty = 1;
			}else if(this.choose == 2){
				this.text = "Hard";
				player.difficulty = 2;
			}
			for(let card of cards){
				card.setType();
			}
		}
	}
}



function createBox(){
	for(let i=0; i<10; i++){
		boxes.push(new Box(i));
	}
}


function createCard(){
	var first = [];
	var second = [];
	var third = [];
	var no = 0;
	var id = 0;
	var num = 0;
	var type = 0;
	var row = 0;
	var col = 0;
	var status = "";
	for(let i=1; i<=104; i++){
		first.push(i);
	}
	for(let i=0; i<104; i++){
		no = getRandomInt(104 - i);
		second.push(first[no]);
		first.splice(no, 1);
	}
	for(let i=0; i<104; i++){
		no = getRandomInt(104 - i);
		third.push(second[no]);
		second.splice(no, 1);
	}
	
	for(let i=0; i<104; i++){
		num = Math.ceil((third[i]>52? third[i]-52:third[i])/4);
		type = (third[i]>52? third[i]-52:third[i])%4;
		id = String(third[i]>52? 1:0) + String(num).padStart(2, "0") + String(type);

		if(i < 54){
			row = Math.floor(i/10);
			col = i%10;
			status = i<44? "cover":"";
			cards.push(new Card(id, num, type, row, col, status));
		}else{
			var temp = new Card(id, num, type, -1, -1, "stack");
			temp.stack = Math.floor((i-54)/10);
			temp.subStack = (i-54)%10;
			temp.stick();
			cards.push(temp);
		}
	
	}
}



function createController(){
	controllers.push(new Controller(playBoardWidth-220, playBoardHeight-150, 170, 100, "difficulty", 3));
}
function iniCreateElement(){
	player = new Player();
	createBox();
	createCard();
	score = new Score();
	createController();
	player.time = new Date();
}
function createElement(){

}

function drawAll(eles){
	for(let e of eles){
		e.draw();
	}
}
function drawAllCard(){
	var row = 0;
	var count = 0;
	var num = 0;
	var topCard = cards.filter(function (card){
		return card.status == "" || card.status == "cover";
	})
	var okCard = cards.filter(function (card){
		return card.status == "ok";
	})
	var otherCard = cards.filter(function (card){
		return card.status == "stack";
	})
	var moveCard = cards.filter(function (card){
		return card.status == "move";
	})
	var topCardLength = topCard.length;
	var moveCardLength = moveCard.length;
	
	do{
		for(let card of topCard){
			if(card.row == row){
				card.draw();
				count++;
			}
		}
		row++;
	}while(count < topCardLength && row < 104);
	
	//堆疊的卡片
	for(let card of otherCard){
		card.draw();
	}
	
	//ok的卡片
	num = 1;
	do{
		for(let card of okCard){
			if(card.num == num){
				card.draw();
			}
		}
		num++;
	}while(num <= 13);
	
	//正在移動的卡片 再次畫在最上面
	row = 0;
	count = 0;
	do{
		for(let card of moveCard){
			if(card.row == row){
				card.draw();
				count++;
			}
		}
		row++;
	}while(count < topCardLength && row < 104);
}
function draw(){		
	drawAll(boxes);
	drawAllCard();
	score.draw();
	drawAll(tips);
	drawAll(controllers);
}
function moveAll(eles){
	for(e of eles){
		e.x += e.dx;
		e.y += e.dy;
	}
}

function move(){
	
}
function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); 
}

function deleteRemove(objs){
	objs = objs.filter(function (obj){
		return (obj.status != "remove");
	});
}

function deleteElement(){
	tips = tips.filter(function (tip){
		return (tip.status != "remove");
	});
	controllers = controllers.filter(function (controller){
		return (controller.status != "remove");
	});
}

function showMsg(str){
	tips.push(new Tip(str));
}

//產生0<=return<max的整數
function getRandomInt(max){
	return Math.floor(Math.random() * Math.floor(max));
}
//找卡片 ID
function findCardById(id){
	return cards.find(function(card){
		return card.id == id;
	});
}

//找卡片 行列
function findCardByRowAndCol(row, col){
	return cards.find(function(card){
		return card.row == row && card.col == col;
	});
}

//找下一個位子
function findMaxRow(col){
	var max = -1;
	cards.forEach(function(card){
		if(card.col == col){
			if(card.status == "" || card.status == "cover"){//無視移動中的
				if(card.row > max){
					max = card.row;
				}
			}
		}
	});
	return max;
}

//獲取已經組好的卡
function getOkCard(touchCard){
	var okId = [touchCard.id];
	var startRow = touchCard.row+1;
	var col = touchCard.col;
	var startNum = touchCard.num+1;
	for(let i=startRow; i<=13; i++){
		var next = findCardByRowAndCol(i, col);
		if(next != null){
			if(next.num == startNum){
				startNum++;
				okId.push(next.id);
			}else{
				okId = [-1];//取消選取
				break;
			}
		}else{
			break;
		}
	}
	

	return okId;
}


//判定可以接到後面
function checkDragon(lastCard, thisCard){
	if(lastCard.num + 1 == thisCard.num && lastCard.type == thisCard.type){
		return true;
	}
	return false;
}

//檢查接龍
function checkSeriesCard(){
	var aCard = cards.filter(function(card){
		return card.status == "" && card.num == 1
	})
	var subStack = 0;
	
	for(let card of aCard){
		var lastCard = card;
		var okCard = [];
		okCard.push(card);
		for(let i=1; i<=12; i++){
			var checkCard = findCardByRowAndCol(card.row + i, card.col);
			if(checkCard != null && checkDragon(lastCard, checkCard)){
				okCard.push(checkCard);
				lastCard = checkCard;
			}else{
				break;
			}
		}
		
		
		if(okCard.length == 13){
			player.okNum++;
			for(let card of okCard){
				card.status = "ok";
				card.row = -1;
				card.col = -1;
				card.stack = player.okNum - 1;
				card.subStack = subStack++;
				card.moveStick();
			}	
		}
	}
	

}

//點選卡片
function onTouchCard(x, y, way){
	if(way == "start"){
		//找出選取的卡片
		var touchCard = null;
		for(let card of cards){
			if(x > card.x && x < card.x + card.w && y > card.y && y < card.y + card.h){
				if(touchCard == null || card.row > touchCard.row){
					touchCard = card;
				}
			}
		}
		
		if(touchCard != null){
			if(touchCard.status == "stack"){
				//發卡
				for(let card of cards){
					if(card.status == "stack" && card.stack == touchCard.stack){
						card.col = card.subStack;
						card.row = findMaxRow(card.col) + 1;
						card.status = "";
						card.moveStick();
					}
				}		
				//開始遊戲
				player.startPlayFlag = true;
				
				//檢查接龍
				checkSeriesCard();
			}else if(touchCard.status == ""){
				//選取並計算位置誤差
				player.touchCardId = getOkCard(touchCard);
				if(player.touchCardId[0] == -1){
					return;//選取錯誤;
				}else{
					//誤差計算
					for(let id of player.touchCardId){
						var touchCard = findCardById(id);
						touchCard.pickX = touchCard.x - x;
						touchCard.pickY = touchCard.y - y;
					}
				}
			}
		}
	}else if(way == "move"){
		if(player.touchCardId[0] != -1){
			//修正誤差
			for(let id of player.touchCardId){
				var touchCard = findCardById(id);
				touchCard.x = x + touchCard.pickX;
				touchCard.y = y + touchCard.pickY;
				touchCard.status = "move";
			}
		}
	}else if(way == "end"){
		if(player.touchCardId[0] != -1){
			//黏回去
			for(let id of player.touchCardId){
				var touchCard = findCardById(id);
				for(let box of boxes){
					if(touchCard.centerX > box.x && touchCard.centerX < box.x + box.w){
						var checkCard = findCardByRowAndCol(findMaxRow(box.col), box.col);
						//先檢核
						if(box.col != touchCard.col && (checkCard == null || checkDragon(checkCard, touchCard))){
							//翻開原先位置前一張
							if(touchCard.row > 0){
								var coverCard = findCardByRowAndCol(touchCard.row-1, touchCard.col);
								if(coverCard != null && coverCard.status == "cover"){
									coverCard.status = "";
								}
							}
							//位移
							touchCard.col = box.col;
							touchCard.row = findMaxRow(touchCard.col) + 1;
							touchCard.status = "";
							
							
							//紀錄步數
							player.step++;
							
							//開始遊戲
							player.startPlayFlag = true;
						
						}
						break;//抓到卡片就離開
					}
				}
				if(touchCard.status != "ok"){
					touchCard.status = "";
					touchCard.stick();
				}
			}
			//檢查接龍
			checkSeriesCard();
			player.touchCardId = [-1];//回復預設
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

function main(){
	time++;
	clear();
	createElement();
	move();
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
	if(clientWidth * heightRate < clientHeight){
		scale = clientWidth / playBoardWidth;
	}else{
		scale = clientHeight / playBoardHeight;
	}

	canvas.style.transform = "scale(" + scale + ")";
	canvas.style.left = (clientWidth - (playBoardWidth * scale)) / 2 + "px";
	playBoardScale = scale;
	

	iniCreateElement();

	raf = window.requestAnimationFrame(main);
	
}	



	var canvas = document.getElementById("mainCanvas");
	var ctx;
	if (canvas.getContext){
		ctx = canvas.getContext("2d");
	}else{
		alert("瀏覽器不支援");
	}
	var raf;
	var playBoardScale = 1;//縮放
	var heightRate = 16 / 9;
	var playBoardWidth = 900;
	var playBoardHeight = playBoardWidth * heightRate;
	var time = 0;
	var scale = 0;
	var pauseFlag = false;//暫停
	
	//物件類別
	var boxes = [];
	var cards = [];
	var tips = [];
	var player;
	var score;
	var controllers = [];
	
	init();
	

window.addEventListener("mousemove", function(e){
});
window.addEventListener("click", function(e){
	e.preventDefault();	
	var x = e.offsetX;
	var y = e.offsetY;
	onTouchCard(x, y);
});

window.addEventListener("touchstart", function(e){
	//e.preventDefault();
	var x = e.changedTouches[0].pageX;
	var y = e.changedTouches[0].pageY - document.documentElement.scrollTop;
	onTouchCard(x * (1 / scale), y * (1 / scale), "start");
});

window.addEventListener("touchmove", function(e){
	e.preventDefault();
	var x = e.changedTouches[0].pageX;
	var y = e.changedTouches[0].pageY - document.documentElement.scrollTop;
	onTouchCard(x * (1 / scale), y * (1 / scale), "move");

},{passive: false});

window.addEventListener("touchend", function(e){
	e.preventDefault();
	var x = e.changedTouches[0].pageX;
	var y = e.changedTouches[0].pageY - document.documentElement.scrollTop;
	onTouchCard(x * (1 / scale), y * (1 / scale), "end");
	onTouchController(x * (1 / scale), y * (1 / scale));
});


//用來消除行動裝置瀏覽器拖移時的頁面飄移
window.addEventListener("scroll", function(e){
	var center = document.getElementById("center");
	if(document.documentElement.scrollTop > center.offsetTop + 100 || document.documentElement.scrollTop < center.offsetTop - 100){
		document.documentElement.scrollTop = center.offsetTop;
	}
});