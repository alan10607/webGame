class Player{
	constructor(){
		this.startX = 0;
		this.startY = 0;
		this.endX = 0;
		this.endY = 0;
		this.status = "stop";
		this.point = 0;
		this.money = 100;
		this.attack = 20;
		this.oriAttack = this.attack;
		this.attackType = getRandomInt(3)+1;
		this.kingAttackType = 0;
		this.bossFlag = false; 
		this.difficulty = 1;
		this.difficultyPoint = -1;
		this.clearBoss = 0;
	}
	changeAttackType(){
		var temp = getRandomInt(100);
		if(temp > 70){
			this.attackType = 3;
		}else if(temp > 35){
			this.attackType = 2;
		}else{
			this.attackType = 1;
		}
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
	constructor(tabX, tabY, type){
		this.tabX = tabX;
		this.tabY = tabY;
		this.type = type;
		this.w = playBoardWidth / playBoardSize;
		this.h = playBoardWidth / playBoardSize;
		this.x = tabX * this.w;
		this.y = tabY * this.w;
		this.toX = this.x;
		this.toY = this.y;
		this.lastToX = this.x;
		this.lastToY = this.y;
		this.centerX = this.x + this.w/2;
		this.centerY = this.y + this.h/2;
		this.dx = 0;
		this.dy = 0;
		this.time = 0;
		this.moveTime = 0;
		this.delayTime = 0;
		this.fontColor = "#ffffff";
		this.hintColor = "#fc7c00";
		this.kingColor = "#ffd000cc";
		this.status = "";
		this.hp = 10;
		this.color = "#174665";
		this.setType();
		this.hitHouseFlag = false;
		this.growTime = 0;
		this.growFerquency = 60
		this.attackTime = -1;
		this.level = 0;
		this.attackType = 0;
		this.attackRo = 0;
		this.cost = 20;
		this.kingType = "";
		this.bossType = "";
	}
	draw(){	
		this.time++;
		if(this.type == 999){		
			//顏色
			if(this.attackType == 1){
				this.color = this.getLevelColor("#ff0062");
			}else if(this.attackType == 2){
				this.color = this.getLevelColor("#2500cb");
			}else if(this.attackType == 3){
				this.color = this.getLevelColor("#ffc400");
			}
			//王的加冕
			if(this.attackType != 0){
				if(this.kingType != "king" && this.attackType == player.kingAttackType){
					if((findBrickByTab(this.tabX+1, this.tabY) != null && findBrickByTab(this.tabX+1, this.tabY).kingType != "")
						|| (findBrickByTab(this.tabX-1, this.tabY) != null && findBrickByTab(this.tabX-1, this.tabY).kingType != "")
						|| (findBrickByTab(this.tabX, this.tabY+1) != null && findBrickByTab(this.tabX, this.tabY+1).kingType != "")
						|| (findBrickByTab(this.tabX, this.tabY-1) != null && findBrickByTab(this.tabX, this.tabY-1).kingType != "")){
						this.kingType = "guard";
					}
				}else if(this.kingType == "king"){
					player.kingAttackType = this.attackType;
				}
			}
			
			
			//攻擊
			if(this.attackType != 0){
				this.attackTime++;
			}	
			if(this.attackType == 1){
				var num = this.level*6;
				var fre = this.kingType != ""? 90:120;
				if(this.level > 5){
					fre = fre - 20;
				}
				if(this.attackTime % fre == 0){
					for(let i=0; i<num; i++){
						balls.push(new Ball(this.centerX, this.centerY, i * (360 / num), 20));
					}
				}
			}else if(this.attackType == 2){
				var temp = playBoardWidth + playBoardHeight;
				var tempBrick = null;
				var num = this.kingType != ""? this.level+3:this.level+1;
				if(this.level > 5){
					num = num + this.level - 5;
				}
				if(this.attackTime % 80 == 0){
					//找最近
					for(brick of bricks){
						var d = distance(this.centerX, this.centerY, brick.centerX, brick.centerY);
						if(d < temp){
							tempBrick = brick;
							temp = d;
						}
					}
					if(tempBrick != null)
						this.attackRo = degree(this.centerX, this.centerY, tempBrick.centerX, tempBrick.centerY);
				}
				
				for(let i=1; i<=num; i++){
					if(this.attackTime % 80 == i*3){
						balls.push(new Ball(this.centerX, this.centerY, this.attackRo, 20));
					}
				}
			}else if(this.attackType == 3){
				if(this.kingType != ""){
					this.growFerquency = Math.floor(60 / (this.level * 2 + 10));
				}else{
					this.growFerquency = Math.floor(60 / (this.level * 1 + 10));
				}
			}
		
			this.growTime++;
			if(this.growTime % this.growFerquency == 0){
				//生長
				var maxHp = 30;
				if(this.attackType == 3){
					if(this.kingType != ""){
						maxHp = 30 + this.level*60;
					}else{
						maxHp = 30 + this.level*30;
					}
				}else{
					maxHp = 30 + this.level*20;
				}
				if(this.hp < maxHp){
					this.hp++;
				}
			}
			
			if(this.hp > 30 && houses.length < 50){
				if(this.growTime % 200 == 0){
					var temp = [];
					if(this.tabX < playBoardSize-1 && findBrickByTab(this.tabX + 1, this.tabY) == null){
						temp.push({x : this.tabX+1, y : this.tabY});
					}
					if(this.tabX > 0 && findBrickByTab(this.tabX - 1, this.tabY) == null){
						temp.push({x : this.tabX-1, y : this.tabY});
					}
					if(this.tabY < playBoardSize*(16/9)-1 && findBrickByTab(this.tabX, this.tabY + 1) == null){
						temp.push({x : this.tabX, y : this.tabY+1});
					}
					if(this.tabY > 0 &&findBrickByTab(this.tabX, this.tabY - 1) == null){
						temp.push({x : this.tabX, y : this.tabY-1});
					}
					if(temp.length > 0){
						var way = temp[getRandomInt(temp.length)];
						houses.push(new Brick(way.x, way.y, 999));
					}
				}
			}
		}
	
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
		
		if(this.type < 99){
			if(this.time % 200 == 0){
				this.moveBrick()
			}
		}
		
		
		//移動
		this.toX = this.tabX * this.w;
		this.toY = this.tabY * this.h;
		if(this.lastToX != this.toX || this.lastToY != this.toY){
			this.lastToX = this.toX;
			this.lastToY = this.toY;
			this.dx = (this.toX - this.x)/80;
			this.dy = (this.toY - this.y)/80;
			this.moveTime = 80;
		}
		if(this.moveTime > 0){
			if(this.moveTime == 1){
				this.dx = 0;
				this.dy = 0;
				this.x = this.toX;
				this.y = this.toY;
				this.hitHouseFlag = false;
			}else{
				this.x += this.dx;
				this.y += this.dy;
			}
			this.moveTime--;			
		}
		this.centerX = this.x + this.w/2;
		this.centerY = this.y + this.h/2;
		
		
		//選擇顯示樣式
		if(this.type < 99){
			ctx.globalAlpha = 0.7;
		}
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.globalAlpha = 1;
		//王
		if(this.kingType == "king"){
			this.drawKing();
		}else if(this.kingType == "guard"){
			this.drawGuard();
		}
		
		ctx.font = "50px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = this.fontColor;
		ctx.fillText(this.hp, this.centerX, this.centerY + 20);
		
		
		//外框
		if(this.attackType != 0 && player.money >= this.cost && this.level < 10){
			ctx.lineWidth = 4;
			ctx.strokeStyle = this.hintColor;
			ctx.strokeRect(this.x+8, this.y+8, this.w-16, this.h-16);
			ctx.lineWidth = 1;
		}
		
		//等級
		if(this.level > 0){
			ctx.font = "32px Arial";
			ctx.textAlign = "center";
			ctx.fillStyle = this.fontColor;
			ctx.fillText((this.level==10? "MAX":"Lv." + this.level), this.centerX, this.centerY -25);
		}
		
		ctx.globalAlpha = 1;
	}
	setType(){
		if(this.type == 0){
			this.color = "#174665";
			this.hp = 5;
		}else if(this.type == 1){
			this.color = "#172565";
			this.hp = 10;
		}else if(this.type == 2){
			this.color = "#320c50";
			this.hp = 20;
		}else if(this.type == 3){
			this.color = "#01403f";
			this.hp = 30;
		}else if(this.type == 4){
			this.color = "#034c04";
			this.hp = 50;
		}else if(this.type == 5){
			this.color = "#b37305";
			this.hp = 100;
		}else if(this.type == 6){
			this.color = "#b31a05";
			this.hp = 200;
		}else if(this.type == 7){
			this.color = "#b30538";
			this.hp = 300;
		}else if(this.type == 8){
			this.color = "#1d1d1d";
			this.hp = 500;
		}else if(this.type == 9){
			this.color = "#000000";
			this.hp = 2000;
		}else if(this.type == 999){
			this.color = "#fbeef3";
			this.hp = 10;
		}
		//增加難度
		if(this.type < 99 && player.difficulty > 1){
			this.hp = Math.floor(this.hp * player.difficulty);
		}
	}
	getLevelColor(color){
		var level = this.level>5? 5:this.level;
		var s = level*2 + 5;
		if(s == 10){
			s = "a";
		}else if(s == 11){
			s = "b";
		}else if(s == 12){
			s = "c";
		}else if(s == 13){
			s = "d";
		}else if(s == 14){
			s = "e";
		}else if(s == 15){
			s = "f";
		}
		return color + String(s) + String(s);
	
	}
	moveBrick(){
		var temp = playBoardWidth + playBoardHeight;
		var tempHouse = null;
		//找最近
		for(let house of houses){
			var d = distance(this.centerX, this.centerY, house.centerX, house.centerY);
			if(d < temp){
				tempHouse = house;
				temp = d;
			}
		}
		if(tempHouse != null){
			if(this.tabY == tempHouse.tabY){
				if(this.tabX > tempHouse.tabX){
					this.tabX = tempHouse.tabX + 1;
				}else if(this.tabX < tempHouse.tabX){
					this.tabX = tempHouse.tabX - 1;
				}
			}else if(this.tabX == tempHouse.tabX){
				if(this.tabY > tempHouse.tabY){
					this.tabY = tempHouse.tabY + 1;
				}else if(this.tabY < tempHouse.tabY){
					this.tabY = tempHouse.tabY - 1;
				}
			}else{
				if(Math.abs(this.centerX - house.centerX) > Math.abs(this.centerY - house.centerY)){//先動Y
					this.tabX = tempHouse.tabX;			
				}else{
					this.tabY = tempHouse.tabY;	
				}
			}
		}
	}
	drawKing(){
		ctx.beginPath();
		ctx.moveTo(this.x + this.w*(9/40), this.y + this.h*(4/5));
		ctx.lineTo(this.x + this.w*(31/40), this.y + this.h*(4/5));
		ctx.lineTo(this.x + this.w*(5/6), this.y + this.h*(2/5));
		ctx.lineTo(this.x + this.w*(4/6), this.y + this.h*(3/5));
		ctx.lineTo(this.x + this.w*(3/6), this.y + this.h*(3/10));
		ctx.lineTo(this.x + this.w*(2/6), this.y + this.h*(3/5));
		ctx.lineTo(this.x + this.w*(1/6), this.y + this.h*(2/5));
		ctx.fillStyle = this.kingColor;
		ctx.fill();
		ctx.lineWidth = 3;
		ctx.strokeStyle = this.fontColor;
		ctx.stroke();
		ctx.lineWidth = 1;
	}
	drawGuard(){
		ctx.beginPath();
		ctx.moveTo(this.x + this.w*(1/3), this.y + this.h*(2/3));
		ctx.lineTo(this.x + this.w*(2/3), this.y + this.h*(2/3));
		ctx.lineTo(this.x + this.w*(1/2), this.y + this.h*(1/3));
		ctx.fillStyle = this.kingColor;
		ctx.fill();
		ctx.lineWidth = 3;
		ctx.strokeStyle = this.fontColor;
		ctx.stroke();
		ctx.lineWidth = 1;
	}
	levelUp(){
		if(this.type > 99){
			if(this.attackType == 0){
					this.levelUpDetail();
			}else if(this.attackType > 0 && this.level < 10){
				if(player.money > 1500){
					do{
						this.levelUpDetail();
					}while(this.level < 10);
				}else{
					this.levelUpDetail();
				}
			}
		}
	}
	levelUpDetail(){
		if(this.attackType == 0){
			this.attackType = player.attackType;
			this.level = 1;
		}else{
			this.level++;
		}
		this.hp = this.hp + 10;
		player.money = player.money - this.cost;
		player.changeAttackType();
		//更新金額
		this.cost = 20 + 5 * this.level;
	}
	
	
}


class Ball{
	constructor(x, y, ro, speed){
		this.x = x;
		this.y = y;
		this.ro = ro;
		this.r = 3;
		this.color = "#032635";
		this.type = "ro";
		this.status = "";
		this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
		this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
		this.speed = speed;
		this.rebound = 0;
		
		
		//初始化路徑
		if(this.type == "ro"){
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
		}

	}
	draw(){
		this.path();

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.closePath();	
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	path(){
		if(this.rebound > 0){
			if((this.x - this.r <= 0 && this.dx < 0) || (this.x + this.r >= playBoardWidth && this.dx > 0)) {
				this.dx = -this.dx;
				this.rebound--;
			}		
			if((this.y - this.r <= 0 && this.dy < 0) || (this.y + this.r >= playBoardHeight && this.dy > 0)){
				this.dy = -this.dy;
				this.rebound--;
			}
		}
	}
}


class Fire {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.speed = getRandomInt(3) + 3;
		this.r = 4;
		this.time = 12;
		this.ro = getRandomInt(360);
		this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
		this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
		var temp = getRandomInt(4);
		if(temp == 0){
			this.color = "#ff2b00";
		}else if(temp == 1){
			this.color = "#f1d455";
		}else if(temp == 2){
			this.color = "#fffef7";
		}else{
			this.color = "#ff9500";
		}
		
	}
	draw(){
		this.time--;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.closePath();	
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}


class Score {
	constructor(){
		this.color = "#111111";
		this.hintColor = "#a9030d";
		this.gameoverFlag = false;
		this.showDifficulty = 0;
	}
	draw(){
		ctx.fillStyle = this.color;
		ctx.font = "40px Arial";
		ctx.textAlign = "left";
		var gap = 50;
		var x = 25;
		ctx.fillText("SCORE : " + player.point, x, 1*gap+10);
		ctx.fillText("HOUSE : " + houses.length + "/50", x, 3*gap+10);
		if(player.money > 1500){
			ctx.fillStyle = this.hintColor;//提示
		}
		ctx.fillText("MONEY : $" + player.money, x, 2*gap+10);
		
		
		var kingFlag = false;
		for(let house of houses){
			if(house.kingType == "king"){
				kingFlag = true;
			}
		}

		if(!kingFlag && !this.gameoverFlag){
			this.gameoverFlag = true;
			saveScore();//儲存紀錄
			showMsg("GAME OVER!!");
		}
		
		if(player.bossFlag && player.difficulty > this.showDifficulty){
			this.showDifficulty = player.difficulty;
			showMsg("Boss arised!! HP: " + (2000 * player.difficulty));
		}
	}
}


class Tip{
	constructor(str, moveFlag){
		this.x = canvas.width / 2;
		this.y = canvas.height / 2 - 50;
		this.str = str;
		this.fontSize = "70px";
		this.existTime = 300;
		this.color = "#111111";
		this.textAlign = "center";
		this.dx = 0;
		this.moveFlag = moveFlag==null? true:moveFlag;
		this.dy = this.moveFlag? -0.1:0;
	}
	draw(){
		var strArr = this.str.split("\n");
		var gap = 100;
		this.y += this.dy;
		ctx.fillStyle = this.color;
		ctx.font = this.fontSize + " serif";
		ctx.textAlign = this.textAlign;
		
		for(let i=0; i<strArr.length; i++){
			ctx.fillText(strArr[i], this.x, this.y + (i-(strArr.length-1)/2)*gap);
		}
		this.existTime--;
	}
}

class Banner{
	constructor(){
		this.x = canvas.width / 2;
		this.y = canvas.height / 2 + 50;
		this.fontSize = "31px";
		this.color = "#eeeeee";
		this.bgColor = "#333333bb";
		this.dataArr = [];
		this.str = "";

	}
	draw(){
		//背景
		ctx.fillStyle = this.bgColor;
		ctx.fillRect(25, 180, playBoardWidth - 50, playBoardHeight - 220);
		
		this.findData();
		this.findStr();
		var strArr = this.str.split("\n");
		var gap = 40;
		ctx.fillStyle = this.color;
		ctx.font = this.fontSize + " monospace";
		ctx.textAlign = "center";
		for(let i=0; i<strArr.length; i++){
			ctx.fillText(strArr[i], playBoardWidth/2, this.y + (i-(strArr.length-1)/2)*gap+50);
		}
		
	}
	findData(){
		try{
			var history = localStorage.getItem("brickMaxScore");
			if(history != null && history != ""){
				var json = JSON.parse(history);
				this.dataArr = json.main;
			}	
		}catch(e){
			console.log(e);
		}
	}
	findStr(){
		var info
			= "遊戲說明：　　　　　　　　　　　　　　　　　　\n"
			+ "主堡：遊戲開始時在地圖隨機一處生成主堡，主堡遭\n"
			+ "　　　破壞即結束遊戲　　　　　　　　　　　　　\n"
			+ "守衛：緊接著主堡或守衛的方塊可升級為守衛，主堡\n"
			+ "　　　與守衛比起一般方塊有額外效果　　　　　　\n"
			+ "　　　　　　　　　　　　　　　　　　　　　　　\n"
			+ "方塊分為以下：　　　　　　　　　　　　　　　　\n"
			+ "　土地：　　　　　　　　　　　　　　　　　　　\n"
			+ "　　　　淺粉紅：表尚無建造設施之新生土地，無功\n"
			+ "　　　　　　　　能，可升級成任意設施，設施生命\n"
			+ "　　　　　　　　達30時自動在周圍生成　　　　　\n"
			+ "　設施：　　　　　　　　　　　　　　　　　　　\n"
			+ "　　　　紅：周圍散射　守衛效果：射擊頻率提升　\n"
			+ "　　　　藍：瞄準連射　守衛效果：連射數提升　　\n"
			+ "　　　　黃：生命、回復速度提高　　　　　　　　\n"
			+ "　　　　　　守衛效果：更高的生命、回復速度　　\n"
			
		var str = "                 城牆保衛者                 \n"
			+ "---------------HIGHEST SCORE---------------\n\n"
			+ "NO"
			+ "|" + "BOSS"
			+ "|" + "SCORE "
			+ "|" + "MONEY " 
			+ "|" + "HOUSE"
			+ "|" + "TIME           "
			+ "\n";
		try{
			for(let i=0; i<10; i++){
				if(this.dataArr[i] != null){
					str += (i+1).toString().padStart(2, " ")
						+ "|" + this.dataArr[i].boss.toString().padStart(4, " ")
						+ "|" + this.dataArr[i].point.toString().padStart(6, " ") 
						+ "|" + ("$" + this.dataArr[i].money.toString()).padStart(6, " ") 
						+ "|" + this.dataArr[i].house.toString().padStart(2, " ") + "/50"
						+ "|" + this.dataArr[i].time
						+ "\n";
				}else{
					str += (i+1).toString().padStart(2, " ")
						+ "|" + "    "
						+ "|" + "      "
						+ "|" + "      " 
						+ "|" + "     "
						+ "|" + "               "
						+ "\n";
				}
			}
			str += "\n-------------------------------------------\n";
			str += info;
			this.str = str;
		}catch(e){
			console.log(e);
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
		this.color = "#111111";
		this.bgColor = "#ffffff77";
		this.fontSize = "60px";
		this.status = "";
		
		if(this.type == "attackType"){
			this.text = "(O)";
			this.bgColor = "#ff006277";
			this.fontSize = "60px";
		}else if(this.type == "pause"){
			this.text = "| |";
			this.bgColor = "#ffffff55";
			this.fontSize = "30px";
		}
	}
	draw(){
		if(this.type == "attackType"){
			if(player.money < 20){	
				ctx.globalAlpha = 0.2;
			}
			if(player.attackType == 1){
				this.text = "(O)";
				this.bgColor = "#ff006277";
			}else if(player.attackType == 2){
				this.text = "->..";
				this.bgColor = "#2500cb77";
			}else if(player.attackType == 3){
				this.text = "[HP]";
				this.bgColor = "#ffc40077";
			}
			
		}
		ctx.strokeStyle = this.color;
		ctx.strokeRect(this.x, this.y, this.w, this.h);
		ctx.fillStyle = this.bgColor;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		
		ctx.fillStyle = this.color;
		ctx.font = this.fontSize + " Arial";
		ctx.textAlign = "center";
		if(this.type == "attackType"){
			ctx.fillText(this.text, this.centerX, this.centerY+20);
			ctx.font = "40px Arial";
			ctx.fillText("Next:", this.centerX, this.centerY-60);
		}else if(this.type == "pause"){
			ctx.fillText(this.text, this.centerX, this.centerY+10);
		}
		
		//回復原設定
		ctx.globalAlpha = 1;
	}
	tap(){
		this.choose++;
		if(this.choose >= this.chooseNum){
			this.choose = 0;
		}
		if(this.type == "pause"){
			if(this.choose == 0){
				this.text = "| |";
				pauseFlag = false;
				//繼續遊戲
				raf = window.requestAnimationFrame(main);
			}else if(this.choose == 1){
				this.text = ">>";
				pauseFlag = true;
				clear();
				draw();//最後一畫
				banner.draw();
				//暫停遊戲
				window.cancelAnimationFrame(raf);
			}
		}
	}
}



function createBox(){
	var size = playBoardSize;
	var sizeY = playBoardSize * (16 / 9);
	for(let i=1; i<=size; i++){
		for(let j=1; j<=sizeY; j++){
			boxes.push(new Box(i, j));
		}
	}
}

function createHouse(){
	var x = getRandomInt(7)+1;
	var y = getRandomInt(14)+1;
	for(let i=-1; i<2; i++){
		for(let j=-1; j<2; j++){
			if(i == 0 && j == 0){
				var king = new Brick(x + i, y + j, 999);
				king.kingType = "king";
				houses.push(king);
			}else{
				houses.push(new Brick(x + i, y + j, 999));
			}
		}
	}
}

function createBrickTypeDetail(arr, num, percent){
	var returnArr = []
	var count = Math.floor(arr.length * percent * 0.01);
	for(let a of arr){
		if(a == 0 && count > 0){
			a = num;
			count--;
		}
		returnArr.push(a);
	}
	return returnArr;
}

function createBrickType(){
	var point = player.point;
	var typeArr = [];
	for(let i=0; i<1000; i++){
		typeArr.push(0);
	}
	
	
	if(point > 50){
		typeArr = createBrickTypeDetail(typeArr, 1 ,10);
	}
	if(point > 75){
		typeArr = createBrickTypeDetail(typeArr, 2 ,10);
	}
	if(point > 100){
		typeArr = createBrickTypeDetail(typeArr, 3 ,5);
	}
	if(point > 300){
		typeArr = createBrickTypeDetail(typeArr, 4 ,5);
	}
	if(point > 1000){
		typeArr = createBrickTypeDetail(typeArr, 5 ,3);
	}
	if(point > 3000){
		typeArr = createBrickTypeDetail(typeArr, 6 ,2);
	}
	if(point > 5000){
		typeArr = createBrickTypeDetail(typeArr, 7 ,1);
	}
	if(point > 6000){
		typeArr = createBrickTypeDetail(typeArr, 8 ,1);
	}

	return typeArr[getRandomInt(1000)];
}

function createBoss(){
	var boss = createBrick("boss");
	if(boss != null){
		boss.bossType = "boss";
		bricks.push(boss);
		player.bossFlag = true;
	}
}
function createBrick(set){
	var num = playBoardSize;
	var numY = playBoardSize * (16 / 9);
	var tempX = [];
	var tempY = [];
	var tabX = 0;
	var tabY = 0;
	var indexX = 0;
	var indexY = 0;
	
	//初始化陣列
	for(let i=0; i<num; i++){
		tempX.push(i);
	}
	for(let i=0; i<numY; i++){
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
	
	if(set == "boss"){
		return new Brick(tabX, tabY, 9);
	}
	
	//生成物件
	var type = createBrickType();
	bricks.push(new Brick(tabX, tabY, type));
}

function createController(){
	controllers.push(new Controller(playBoardWidth-230, playBoardHeight-150, 160, 100, "attackType", 2));
	controllers.push(new Controller(playBoardWidth-60, 10, 50, 50, "pause", 2));
}
function iniCreateElement(){
	player = new Player();
	createBox();
	createHouse();
	score = new Score();
	banner = new Banner();
	createController();
}
function createElement(){
	//建立敵人
	var timeTemp = 200;
	if(player.point > 800){
		timeTemp = 200 - Math.floor((player.point-800)/20);
		if(timeTemp < 25){
			timeTemp = 25;
		}
	}
	if(bricks.length < 3 && player.point > 50){
		timeTemp = 25;
	}
	if(time % timeTemp == 0){
		createBrick();
	}
}

function drawAll(eles){
	for(e of eles){
		e.draw();
	}
}
function draw(){
	drawAll(boxes);
	drawAll(houses);
	drawAll(bricks);
	drawAll(balls);
	drawAll(fires);
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
	moveAll(balls);
	brickHit();
	moveAll(fires);
}
function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); 
}
function checkOutside(e, gap){
	if(e.x < -gap || e.x > playBoardWidth + gap || e.y < -gap || e.y > playBoardHeight + gap){
		return true;
	}
	return false;
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
	
	var newHouses = [];
	for(house of houses){
		if(house.status == "remove"){
			house = null;
			delete house;
		}else{
			newHouses.push(house);
		}
	}
	houses = newHouses;	

	var newBalls = [];
	for(ball of balls){
		if(checkOutside(ball, 10) || ball.status == "remove"){
			ball = null;
			delete ball;
		}else{
			newBalls.push(ball);
		}
	}
	balls = newBalls;

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
	
	var newFires = [];
	for(fire of fires){
		if(fire.time < 0){
			fire = null;
			delete fire;
		}else{
			newFires.push(fire);
		}
	}
	fires = newFires;
	


}

function showMsg(str){
	tips.push(new Tip(str));
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
	for(house of houses){
		if(house.tabX == tabX && house.tabY == tabY){
			return house;
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
//檢查碰撞
function checkBallTouchBrick(ball, brick, fix){
	var insideFlag = false;
	if(ball.y >= brick.y && ball.y <= brick.y + brick.h && ball.x >= brick.x && ball.x <= brick.x + brick.w){
		insideFlag = true;
	}else{
		var xGap = Math.min(Math.abs(ball.x - brick.x), Math.abs(ball.x - (brick.x + brick.w)));
		var yGap = Math.min(Math.abs(ball.y - brick.y), Math.abs(ball.y - (brick.y + brick.h)));
		//原點在磚塊外，但在半徑內
		if(Math.sqrt(Math.pow(xGap, 2) + Math.pow(yGap, 2)) <= ball.r - fix){
			insideFlag = true;
		}
	}
	return insideFlag;
}
//檢查碰撞
function checkPointTouchBrick(x, y, brick){
	if(y >= brick.y && y <= brick.y + brick.h && x >= brick.x && x <= brick.x + brick.w){
		return true;
	}
	return false;
}
//檢查接觸
function checkBrickTouchBrick(brick1, brick2){
	var midX = brick1.x + brick1.w/2;
	var midY = brick1.y + brick1.h/2;
	if(checkPointTouchBrick(midX, brick1.y - 10, brick2) || checkPointTouchBrick(midX, brick1.y + brick1.h + 10, brick2)
	|| checkPointTouchBrick(brick1.x - 10, midY, brick2) || checkPointTouchBrick(brick1.x + brick1.w + 10, midY, brick2)
	){
		return true;
	}
	return false;
}
//檢查碰撞
function checkBrickInBrick(brick1, brick2){
	var midX = brick1.x + brick1.w/2;
	var midY = brick1.y + brick1.h/2;
	if(checkPointTouchBrick(midX, brick1.y + 1, brick2) || checkPointTouchBrick(midX, brick1.y + brick1.h - 1, brick2)
	|| checkPointTouchBrick(brick1.x + 1, midY, brick2) || checkPointTouchBrick(brick1.x + brick1.w - 1, midY, brick2)
	){
		return true;
	}
	return false;
}

function distance(x1, y1, x2, y2){
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
function degree(x1, y1, x2, y2){
	var gapX = x2 - x1;
	var gapY = y1 - y2;
	
	var ro = null;
	var z = Math.sqrt(Math.pow(gapX, 2) + Math.pow(gapY, 2));
	if(z > 0){
		ro = Math.asin(gapY / z) * 180 / Math.PI;
		//修正
		if(gapX < 0){
			ro = 180 - ro;
		}else if(gapX >= 0 && gapY < 0){
			ro = 360 + ro;
		}
	}
	return ro;
}


function findNowCalendar(){
	var date = new Date();
	var yyyy = date.getFullYear().toString();
	var yy = date.getFullYear().toString().slice(2, 4);
	var mm = (date.getMonth() + 1).toString().padStart(2, "0");
	var dd = date.getDate().toString().padStart(2, "0");
	var hh = date.getHours().toString().padStart(2, "0");
	var mi = date.getMinutes().toString().padStart(2, "0");
	var ss = date.getSeconds().toString().padStart(2, "0");
	
	return yyyy + mm + dd + " " + hh + mi + ss;
}
function saveScore(){
	try{
		var newData = {
			boss : player.clearBoss,
			point : player.point,
			money : player.money,
			house : houses.length,
			time : findNowCalendar()
		}
		var newJson = {
			"main" : null
		};
		banner.findData();
		var dataArr = banner.dataArr;
		var newArr = [];
		var insertFlag = true;
		if(dataArr != null && dataArr.length > 0){
			for(let i=0; i<dataArr.length; i++){
				if(insertFlag & newData.point > dataArr[i].point){
					newArr.push(newData);
					insertFlag = false;
					i--;
				}else{
					newArr.push(dataArr[i]);
				}
				//只取前十
				if(newArr.length > 9){
					break;
				}
			}	
		}
		
		if(insertFlag && newArr.length < 10){
			newArr.push(newData);
		}		
				
		newJson.main = newArr;
		localStorage.setItem("brickMaxScore", JSON.stringify(newJson));
	}catch(e){
		console.log(e);
	}
}

function brickHit(){
	for(brick of bricks){
		for(ball of balls){	
			if(checkBallTouchBrick(ball, brick, 0)){
				if(brick.hp > 0){
					brick.hp--;
				}
				player.point++;//得分
				player.money++;
				ball.status = "remove";
				fires.push(new Fire(ball.x, ball.y));
				
				//生成BOSS
				if(player.point == 8000 || (player.difficultyPoint != -1 && player.point - player.difficultyPoint > 5000 && player.bossFlag == false)){
					createBoss();
				}
			}
		}
		if(brick.hp <= 0){
			brick.status = "remove";
			if(brick.bossType == "boss"){
				player.bossFlag = false;
				showMsg("Boss clear!!");
				player.clearBoss++;
				player.difficulty = player.difficulty*2;
				player.difficultyPoint = player.point;
			}			
		}
		
		for(house of houses){	
			if(checkBrickTouchBrick(brick, house)){
				if(house.hp > 0 ){
					house.hp--;
					brick.hitHouseFlag = true;
				}
				fires.push(new Fire(house.centerX, house.centerY));
			}
			if(house.hp <= 0){
				house.status = "remove";
			}
		}
	}
}

function brickMove(){

	/*
		var size = playBoardSize;
		var sizeY = playBoardSize * (16 / 9);
		var way = getRandomInt(4);

		if(way == 0){//右
			for(let i=brick.tabX+1; i<playBoardSize; i++){
				if(findBrickByTab(i, brick.tabY) == null){
					brick.tabX = i;
				}else{
					break;
				}
			}
		}else if(way == 1){//左
			for(let i=brick.tabX-1; i>-1; i--){
				if(findBrickByTab(i, brick.tabY) == null){
					brick.tabX = i;
				}else{
					break;
				}
			}
		}else if(way == 2){//下
			for(let i=brick.tabY+1; i<playBoardSize*(16/9); i++){
				if(findBrickByTab(brick.tabX, i) == null){
					brick.tabY = i;
				}else{
					break;
				}
			}
		}else if(way == 3){//上
			for(let i=brick.tabY-1; i>-1; i--){
				if(findBrickByTab(brick.tabX, i) == null){
					brick.tabY = i;
				}else{
					break;
				}
			}
		}
		*/
}

//點選菜單
function onTouchController(x, y){
	for(controller of controllers){
		if(controller.type != "attackType" && x > controller.x && x < controller.x + controller.w && y > controller.y && y < controller.y + controller.h){
			controller.tap();
		}
	}
}


//手指離開主方法
function onTouchEndBrick(x, y){
	for(house of houses){
		if(player.money < house.cost){
			continue;
		}
		if(checkPointTouchBrick(x, y, house)){
			house.levelUp();
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
	if(clientWidth * (16 / 9) < clientHeight){
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
	var playBoardScale = 1;//縮放
	var playBoardWidth = 900;
	var playBoardHeight = playBoardWidth * (16 / 9);
	var playBoardSize = 9;
	var time = 0;
	var scale = 0;
	var pauseFlag = false;//暫停
	
	//物件類別
	var bricks = [];
	var balls = [];
	var boxes = [];
	var houses = [];
	var fires = [];
	var tips = [];
	var banner;
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
	onTouchEndBrick(x, y);
	onTouchController(x, y);
});

window.addEventListener("touchstart", function(e){
});

window.addEventListener("touchmove", function(e){
	e.preventDefault();
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