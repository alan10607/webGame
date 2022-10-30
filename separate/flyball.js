class Player{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.oriX = x;
		this.oriY = y;
		this.r = 40;
		this.life = 3;
		this.hp = 5;
		this.toHp = 5;
		this.scoreAniFlag = false;//分數動畫
		this.skill = 2;
		this.oriHp = this.hp;
		this.color = "#5f5f5f";
		this.borderColor = "#ffffff";
		this.bufferColor = "#652e2e";
		this.status = "stop";
		this.dx = 0;
		this.dy = 0;
		this.speed = 12;
		this.minSpeed = 2;
		this.maxSpeed = 12;
		this.point = 0;
		this.attack = 0;
		this.bufferTime = 0;
		this.invisiableTime = 0;
		this.offset = 0;
		this.fightBossId = 0;//現在的王
		//移動
		this.startX = x;
		this.startY = y;
		this.lastX = null;
		this.lastY = null;
		//打王相關
		this.fightBossId = -1;
		this.fightBossTime = 0;
		this.fightBossFlag = false;
		
	}
	draw(){
		this.runShield();
	
		if(this.scoreAniFlag){
			if(this.hp < this.toHp){
				this.hp++;
			}else if(this.hp > this.toHp){
				this.hp--;
			}else{
				this.scoreAniFlag = false;
			}
		}
		if(this.invisiableTime > 0){
			this.invisiableTime--;
			
			this.offset= this.offset + 5;
			if(this.offset > 60){
				this.offset = 0;
			}
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r+50, Math.PI*(-0.5), Math.PI*(1.5), true);
			ctx.closePath();
			ctx.setLineDash([30, 30]);
			ctx.lineDashOffset = this.offset;
			ctx.lineWidth = 1;
			ctx.strokeStyle = this.color;
			ctx.stroke();
			//返回原設定
			ctx.lineWidth = 1;
			ctx.setLineDash([]);
			
			
			if(this.invisiableTime % 3 == 0){
				return;//閃爍
			}
			
		}
		if(this.bufferTime > 0){
			playerHpLoseDetail();
			this.bufferTime--;
		}
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.closePath();	
		ctx.fillStyle = this.bufferTime==0? this.color:this.bufferColor;
		ctx.fill();
		ctx.strokeStyle = this.borderColor;
		ctx.stroke();
		
	}
	runShield(){
		shield.x = this.x;
		shield.y = this.y;	
	}

}

class Ball{
	constructor(x, y, ro){
		this.x = x;
		this.y = y;
		this.r = 5;
		this.color = "#5f5f5f";
		this.speed = 20;
		this.ro = ro;
		this.status = "";
		this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
		this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
	}
	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.closePath();	
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}

class Attack{
	constructor(x, y, type, ro, speed){
		this.x = x;
		this.y = y;
		this.type = type;
		this.ro = ro;
		this.oriRo = this.ro;
		this.r = 15;
		this.color = "#712d00";
		this.status = "";
		this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
		this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
		
		this.speed = speed;
		this.delayTime = 0;
		
		/*
		if(this.type == "ro"){
			this.speed = 6;
		}else if(this.type == "focus"){
			this.speed = 10;
		}else if(this.type == "track"){
			this.speed = 5;
		}*/
		
		
		this.path();//初始化路徑

	}
	draw(){
		if(this.type == "track" || this.type == "delay" || this.type.indexOf("spin") != -1){
			this.path();
		}
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.closePath();	
		ctx.fillStyle = this.color;
		ctx.fill();
	}
	//aaaaaaaaa
	path(){
		if(this.type == "ro"){
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			
			this.color = "#712d00";
		}if(this.type == "roRandomColor"){
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;

			this.color = "rgb(" + (getRandomInt(155)+100) + ", " + (getRandomInt(155)+100) + ", " + (getRandomInt(155)+100) + ")";
		}else if(this.type == "roRed"){
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			
			this.color = "#6c1f1f";
		}else if(this.type == "roDarkRed"){
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			
			this.color = "#b50000";
		}else if(this.type == "roYellow"){
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			
			this.color = "#ffc52e";
		}else if(this.type == "roPurple"){
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			
			this.color = "#2b0047";
		}else if(this.type == "roBlue"){
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;

			this.color = "#151558";
		}else if(this.type == "roWhite"){
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;

			this.color = "#ffffff";
		}else if(this.type == "roBigBlue"){
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			this.r = 100;
			this.color = "#2c3047";
		}else if(this.type == "delay"){
			if(this.delayTime < 300){
				this.delayTime++;
				this.dx = 0;
				this.dy = 0;
			}else{
				this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
				this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			}
			this.color = "#ffffff";
		}else if(this.type == "focus"){
			this.ro = degree(this.x, this.y, player.x ,player.y);
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			
			this.color = "#9e0362";
		}else if(this.type == "focusSide1"){
			this.ro = degree(this.x, this.y, player.x ,player.y) + 20;
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			this.color = "#9e0362";
		}else if(this.type == "focusSide2"){
			this.ro = degree(this.x, this.y, player.x ,player.y) - 20;
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			this.color = "#9e0362";
		}else if(this.type == "track"){
			this.ro = degree(this.x, this.y, player.x ,player.y);
			if(distance(this.x, this.y, player.x ,player.y) < 180 && this.status != "remove"){
				this.status = "tracked";//不繼續追蹤了
			}
			if(this.status != "tracked"){
				this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
				this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			}
			
			this.color = "#024d02";
		}else if(this.type == "spinRight"){
			if(this.ro < this.oriRo + 180)
				this.ro = this.ro + 0.5;
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			
			this.color = "#001368";
		}else if(this.type == "spinLeft"){
			if(this.ro > this.oriRo - 180)
				this.ro = this.ro - 0.5;
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			
			this.color = "#001368";
		}else if(this.type == "spinRightFast"){
			if(this.ro < this.oriRo + 270)
				this.ro = this.ro + 1;
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			
			this.color = "#244da2";
		}else if(this.type == "spinLeftFast"){
			if(this.ro > this.oriRo - 270)
				this.ro = this.ro - 1;
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			
			this.color = "#244da2";
		}
	}
}

class Brick {
	constructor(id, x, y, dx, dy, hp, param){
		this.id = id;
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.speed = Math.max(this.dx, this.dy);
		this.hp = Math.ceil((difficulty*0.5+1)*hp);//普通:1 困難:1.5 x:2
		this.status = "";
		this.attackTime = 0;
		this.moveRo = 0;
		this.attackRo = 0;
		this.attackDelay = 0;
		this.loadingTime = 0;
		this.param = param == null? null:param;
		this.init();
		this.bonus = "";
	}
	init(){
		if(this.id == 1){
			this.w = 100;
			this.h = 100;
			this.color = "#a28471";
			this.shape = "brick";
			this.pointMax = 10;
			this.pointMin = 1;
		}else if(this.id == 2){
			this.w = 60;
			this.h = 60;
			this.color = "#e0afd6";
			this.shape = "brick";
			this.pointMax = 8;
			this.pointMin = 1;
		}else if(this.id == 3){
			this.r = 80;
			this.color = "#82bba2";
			this.shape = "circle";
			this.pointMax = 15;
			this.pointMin = 5;
		}else if(this.id == 4){
			this.r = 50;
			this.color = "#8388dd";
			this.shape = "circle";
			this.pointMax = 10;
			this.pointMin = 5;
			this.moveRo = degree(this.x, this.y, player.x ,player.y);
		}else if(this.id == 5){
			this.r = 45;
			this.color = "#ffbe13";
			this.shape = "circle";
			this.pointMax = 10;
			this.pointMin = 5;
			this.attackRo = getRandomInt(360);
			this.attackDelay = 60;
			if(this.param == null){
				this.param = 300;
			}
		}else if(this.id == 6){
			this.r = 40;
			this.color = "#d95045";
			this.shape = "circle";
			this.pointMax = 10;
			this.pointMin = 5;
		}
		if(this.shape == "brick"){
			this.x = this.x - (this.w / 2);
			this.y = this.y - (this.h / 2);
		}
	
	}
	draw(){
		if(this.loadingTime > 0){
			this.loadingTime--;
		}else{
			this.attackTime++;
		}
		this.posiUpdate();
		this.attack();

		
		if(this.shape == "brick"){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.w, this.h);
		}else if(this.shape == "circle"){
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
			ctx.closePath();	
			ctx.fillStyle = this.color;
			ctx.fill();
		}

		//bbbbbbbb
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "30px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.hp, this.centerX, this.centerY + 10);
	}
	posiUpdate(){
		if(this.w == null || this.w == 0){
			this.attackX = this.x;
		}else{
			this.attackX = this.x + (this.w / 2);
		}
		
		if(this.h == null || this.h == 0){
			this.attackY = this.y;
		}else{
			this.attackY = this.y + this.h;
		}
		
		if(this.w == null || this.w == 0){
			this.centerX = this.x;
		}else{
			this.centerX = this.x + (this.w / 2);
		}
		
		if(this.h == null || this.h == 0){
			this.centerY = this.y;
		}else{
			this.centerY = this.y + (this.h / 2);
		}
		
		if(this.id == 4){
			if(this.attackTime % 150 == 0){
				this.moveRo = degree(this.x, this.y, player.x ,player.y);
			}else if(this.attackTime % 150 == 1){
				this.dx = Math.cos(Math.PI * this.moveRo / 180) * this.speed;
				this.dy = -Math.sin(Math.PI * this.moveRo / 180) * this.speed;
			}else if(this.attackTime % 150 == 20){
				this.dx = Math.cos(Math.PI * this.moveRo / 180) * this.speed * 0.8;
				this.dy = -Math.sin(Math.PI * this.moveRo / 180) * this.speed * 0.8;
			}else if(this.attackTime % 150 == 40){
				this.dx = Math.cos(Math.PI * this.moveRo / 180) * this.speed * 0.6;
				this.dy = -Math.sin(Math.PI * this.moveRo / 180) * this.speed * 0.6;
			}else if(this.attackTime % 150 == 60){
				this.dx = Math.cos(Math.PI * this.moveRo / 180) * this.speed * 0.4;
				this.dy = -Math.sin(Math.PI * this.moveRo / 180) * this.speed * 0.4;
			}else if(this.attackTime % 150 == 80){
				this.dx = Math.cos(Math.PI * this.moveRo / 180) * this.speed * 0.2;
				this.dy = -Math.sin(Math.PI * this.moveRo / 180) * this.speed * 0.2;
			}else if(this.attackTime % 150 == 120){
				this.dx = Math.cos(Math.PI * this.moveRo / 180) * this.speed * 0.01;
				this.dy = -Math.sin(Math.PI * this.moveRo / 180) * this.speed * 0.01;
			}
		}else if(this.id == 5){
			if(this.attackTime > 500){
				this.dy = 1;
			}else if(this.y >= this.param[0]){
				this.dx = 0;
				this.dy = 0;
			}else if(this.dy < 20){
				this.dy = this.dy * 1.02;
			}
		}else if(this.id == 6){
			this.moveRo = degree(this.x, this.y, player.x ,player.y);
			this.dx = Math.cos(Math.PI * this.moveRo / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.moveRo / 180) * this.speed;
		}
	}
	attack(){
		if(this.id == 1){
			if(this.attackTime % 100 == 0){
				attacks.push(new Attack(this.attackX, this.attackY, "ro", 270, 7));
				attacks.push(new Attack(this.attackX, this.attackY, "ro", 290, 7));
				attacks.push(new Attack(this.attackX, this.attackY, "ro", 250, 7));
			}
		}else if(this.id == 2){
			if(this.attackTime % 50 == 0 && this.y + this.h < player.y){
				attacks.push(new Attack(this.attackX, this.attackY, "focus", 270, 15));
			}
		}else if(this.id == 3){
			if(this.attackTime % 200 == 0){
				attacks.push(new Attack(this.attackX, this.attackY, "track", 270, 6));
			}
		}else if(this.id == 4){
			if(this.attackTime % 150 == 140){
				attacks.push(new Attack(this.attackX, this.attackY, "focusSide1", 270, 10));
				attacks.push(new Attack(this.attackX, this.attackY, "focusSide2", 270, 10));
			}
		}else if(this.id == 5){
			if(this.y >= this.param[0] && this.attackTime <= 500){
				this.attackDelay--;
				if(this.attackDelay <= 0){
					if(this.attackTime % 8 == 0){
						for(let i=0; i<6; i++){
							attacks.push(new Attack(this.attackX, this.attackY, "roYellow", this.attackRo + i * 60, 15));
						}
					}
				}
			}
		}else if(this.id == 6){
			if(this.hp <= 0){
				var temp = getRandomInt(360);
				for(let i=0; i<6; i++){
					attacks.push(new Attack(this.attackX, this.attackY, "roDarkRed", temp + i * 60, 17));
				}
			
			}
		}

	
	}
}


class Boss {
	constructor(id, x, y, dx, dy, hp, param){
		this.id = id;
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.speed = Math.max(this.dx, this.dy);
		this.oriSpeed = this.speed;
		this.hp = Math.ceil((difficulty*0.25+1)*hp);//普通:1 困難:1.25 x:1.5
		this.oriHp = hp;
		this.status = "";
		this.param = param == null? null:param;
		this.bonus = "";
		this.attackFrequence = 0;
		this.attackTime = 0;
		this.attackType = "";
		this.attackRo = 0;
		this.focusAttackTime = 0;
		this.focusAttackRo = 0;
		this.loadingTime = 0;
		this.init();
	}
	init(){
		if(this.id == 100){
			this.r = 125;
			this.color = "#844e0f";
			this.shape = "circle";
			this.pointMax = 80;
			this.pointMin = 75;
		}else if(this.id == 101){
			this.r = 70;
			this.color = "#7633a2";
			this.shape = "circle";
			this.pointMax = 80;
			this.pointMin = 75;
			this.attackFrequence = 500;
		}else if(this.id == 91){
			this.r = 55;
			this.color = "#4e0d77";
			this.shape = "circle";
			this.pointMax = 20;
			this.pointMin = 15;
			this.attackFrequence = 600;
		}else if(this.id == 92){
			this.r = 40;
			this.color = "#2e0747";
			this.shape = "circle";
			this.pointMax = 10;
			this.pointMin = 8;
			this.attackFrequence = 600;
		}else if(this.id == 102){
			this.r = 140;
			this.color = "#2f51c1";
			this.shape = "circle";
			this.pointMax = 105;
			this.pointMin = 100;
		}
		
		if(this.shape == "brick"){
			this.x = this.x - (this.w / 2);
			this.y = this.y - (this.h / 2);
		}
	
	}
	draw(){
		if(this.loadingTime > 0){
			this.loadingTime--;
		}else{
			this.attackTime++;
		}
		this.posiUpdate();
		this.attack();
		this.realDraw();
	}
	
	realDraw(){
		if(this.status != "invisiable"){
			if(this.shape == "brick"){
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.w, this.h);
			}else if(this.shape == "circle"){
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
				ctx.closePath();	
				ctx.fillStyle = this.color;
				ctx.fill();
			}

			ctx.fillStyle = "#FFFFFF";
			ctx.font = "30px Arial";
			ctx.textAlign = "center";
			ctx.fillText(this.hp, this.centerX, this.centerY + 10);
		}
	}
	posiUpdate(){
		if(this.w == null || this.w == 0){
			this.attackX = this.x;
		}else{
			this.attackX = this.x + (this.w / 2);
		}
		
		if(this.h == null || this.h == 0){
			this.attackY = this.y;
		}else{
			this.attackY = this.y + this.h;
		}
		
		if(this.w == null || this.w == 0){
			this.centerX = this.x;
		}else{
			this.centerX = this.x + (this.w / 2);
		}
		
		if(this.h == null || this.h == 0){
			this.centerY = this.y;
		}else{
			this.centerY = this.y + (this.h / 2);
		}
		
		if(this.id == 100){
			if(this.y >= 250 && this.dx == 0){
				this.dy = 0;
				this.dx = 0;
			}
		}else if(this.id == 101 || this.id == 91 ||this.id == 92){
			if(this.hp <= 0 && this.status != "invisiable"){
				if(this.id == 101){
					this.hp = 1;
					this.r = 0; //無法被打到
					this.status = "invisiable";
					var temp = getRandomInt(360);
					bricks.push(new Boss(91, this.x, this.y, 0, 8, 100, temp));
					bricks.push(new Boss(91, this.x, this.y, 0, 8, 100, temp + 180));
				}else if(this.id == 91){
					var temp = getRandomInt(360);
					for(let i=0; i<4; i++){
						bricks.push(new Boss(92, this.x, this.y, 0, 8, 30, temp + 90*i));
					}
				}else if(this.id == 92){
					var count91 = 0;
					var count92 = 0;
					for(brick of bricks){
						if(brick.id == 91){
							count91++;
						}else if(brick.id == 92){
							count92++;
						}
					}
					if(count91 == 0 && count92 == 1){
						getBrickById(101).hp = 0;
						getBrickById(101).status = "remove";
					}
				}
				return;
			}

			if(this.param != null && this.attackTime == 1){//第一次可控制方向
				this.speed = this.oriSpeed;
				this.moveRo = this.param;
				if(this.id != 101){
					this.attackTime += getRandomInt(80);
				}
			}else if(this.attackTime % this.attackFrequence == this.attackFrequence * (1/5)+5){
				this.moveRo = degree(this.x, this.y, player.x ,player.y);
				this.speed = this.oriSpeed;
			}else if(this.attackTime % this.attackFrequence == this.attackFrequence * (2/5)+5){
				this.moveRo = degree(this.x, this.y, player.x ,player.y);
				this.speed = this.oriSpeed;
			}else if(this.attackTime % this.attackFrequence == this.attackFrequence * (3/5)+5){
				this.moveRo = degree(this.x, this.y, player.x ,player.y);
				this.speed = this.oriSpeed;	
			}else if(this.attackTime % this.attackFrequence == this.attackFrequence * (4/5)+5){
				this.speed = 0;
			}
			
			this.speed = this.speed * 0.97;
			this.dx = Math.cos(Math.PI * this.moveRo / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.moveRo / 180) * this.speed;
			
			if(this.x + this.dx < 0){
				this.dx = -this.x;
			}else if(this.x + this.dx > playBoardWidth){
				this.dx = playBoardWidth - this.x;
			}
			if(this.y + this.dy < 0){
				this.dy = -this.y;
			}else if(this.y + this.dy > playBoardHeight){
				this.dy = playBoardHeight - this.y;
			}
			
		}else if(this.id == 102){
			if(this.y >= 250 && this.dx == 0){
				this.dy = 0;
				this.dx = (getRandomInt(10)>4? 0.5:-0.5);
			}
			if(this.hp <= this.oriHp * 0.35 && this.x == playBoardWidth / 2){
				this.dx = 0;
			}else if(this.x >= playBoardWidth - 400){
				this.dx = -0.5;
			}else if(this.x <= 400){
				this.dx = 0.5;
			}
		}
	}
	attack(){
		if(this.id == 100){
			if(this.attackTime % 15 == 0){
				this.attackRo = this.attackRo + 10;
				for(let i=0; i<8; i++){
					var x = this.x + Math.cos(Math.PI * (this.attackRo+45*i) / 180) * this.r;
					var y = this.y - Math.sin(Math.PI * (this.attackRo+45*i) / 180) * this.r;
					attacks.push(new Attack(x, y, "ro", (this.attackRo+45*i), 8));
				}
			}
			if(this.hp < this.oriHp * 0.667){
				if(this.attackTime % 100 == 0){
					this.focusAttackTime = 20;
					this.focusAttackRo = degree(this.x, this.y, player.x ,player.y);
				}
				if(this.focusAttackTime > 0){
					if(this.focusAttackTime % 5 == 0){			
						//修正為只鎖定一次角度
						var att = new Attack(this.attackX, this.attackY, "focus", 270, 15);
						att.dx = Math.cos(Math.PI * this.focusAttackRo / 180) * att.speed;
						att.dy = -Math.sin(Math.PI * this.focusAttackRo / 180) * att.speed;
						attacks.push(att);
					}
					this.focusAttackTime--;
				}
			}
			
			if(this.hp < this.oriHp * 0.333){
				if(this.attackTime % 22 == 0){
					for(let i=0; i<6; i++){
						var x = this.x + Math.cos(Math.PI * (this.attackRo+60*i) / 180) * this.r;
						var y = this.y - Math.sin(Math.PI * (this.attackRo+60*i) / 180) * this.r;
						var att = new Attack(x, y, "ro", (this.attackRo+60*i), 12)
						att.color = "#ea5970";
						attacks.push(att);
					}
				}
			}
		}else if(this.id == 101 || this.id == 91 ||this.id == 92){
			if(this.status != "invisiable"){
				if(this.attackTime % this.attackFrequence == this.attackFrequence*(1/5)
					|| this.attackTime % this.attackFrequence == this.attackFrequence*(2/5)
					|| this.attackTime % this.attackFrequence == this.attackFrequence*(3/5)){
					if(this.id == 101){
						for(let i=0; i<18; i++){
							attacks.push(new Attack(this.x, this.y, "roPurple", 20*i, 8));
						}
					}else if(this.id == 91){
						var temp = getRandomInt(360);
						for(let i=0; i<6; i++){
							attacks.push(new Attack(this.x, this.y, "roPurple", temp+60*i, 8));
						}
					}else if(this.id == 92){
						var temp = getRandomInt(360);
						for(let i=0; i<3; i++){
							attacks.push(new Attack(this.x, this.y, "roPurple", temp+120*i, 8));
						}
					}
				}
			
			}
		}else if(this.id == 102){
			if(this.loadingTime > 0){
				return;
			}
			if(this.hp > this.oriHp * 0.95){//1-1
				if(this.attackType != 1){
					this.attackType = 1;
					this.attackTime = 1;
					this.loadingTime = 200;
					bgColor.setOri();
				}
				if(this.attackTime % 20 == 0){
					this.attackRo = this.attackRo + 7;
					for(let i=0; i<18; i++){
						attacks.push(new Attack(this.x, this.y, "roRandomColor", this.attackRo+20*i, 15));
					}
				}
			}else if(this.hp > this.oriHp * 0.7){//1-2
				if(this.attackType != 2){
					this.attackType = 2;
					this.attackTime = 1;
					this.loadingTime = 200;
					createCoin(this.x, this.y, 40, 12);
					bgColor.setColor("#9ba5b8");
				}
				var temp = 600;
				if(this.attackTime % temp == 1 || this.attackTime % temp == 201 ||　this.attackTime % temp == 401){
					this.focusAttackRo = degree(this.x, this.y, player.x ,player.y);
				}
				if(this.attackTime % temp == 10){
						attacks.push(new Attack(this.x, this.y, "roBigBlue", this.focusAttackRo, 13));
				}
				if(this.attackTime % temp == 201){
						attacks.push(new Attack(this.x, this.y, "roBigBlue", this.focusAttackRo+15, 13));
						attacks.push(new Attack(this.x, this.y, "roBigBlue", this.focusAttackRo-15, 13));
				}
				if(this.attackTime % temp == 401){
						attacks.push(new Attack(this.x, this.y, "roBigBlue", this.focusAttackRo, 13));
						attacks.push(new Attack(this.x, this.y, "roBigBlue", this.focusAttackRo+30, 13));
						attacks.push(new Attack(this.x, this.y, "roBigBlue", this.focusAttackRo-30, 13));
				}
				if(this.attackTime % temp >= 5 && this.attackTime % temp < 60){
					if(this.attackTime % 5 == 0){
						attacks.push(new Attack(this.x, this.y, (getRandomInt(10)>4? "roBlue":"roWhite"), this.focusAttackRo+(getRandomInt(24)-12), 10));
					}
				}
				if(this.attackTime % temp >= 205 && this.attackTime % temp < 260){
					if(this.attackTime % 5 == 0){
						attacks.push(new Attack(this.x, this.y, (getRandomInt(10)>4? "roBlue":"roWhite"), this.focusAttackRo+(getRandomInt(24)-12)+15, 10));
						attacks.push(new Attack(this.x, this.y, (getRandomInt(10)>4? "roBlue":"roWhite"), this.focusAttackRo+(getRandomInt(24)-12)-15, 10));
					}
				}
				if(this.attackTime % temp >= 405 && this.attackTime % temp < 460){
					if(this.attackTime % 5 == 0){
						attacks.push(new Attack(this.x, this.y, (getRandomInt(10)>4? "roBlue":"roWhite"), this.focusAttackRo+(getRandomInt(24)-12), 10));
						attacks.push(new Attack(this.x, this.y, (getRandomInt(10)>4? "roBlue":"roWhite"), this.focusAttackRo+(getRandomInt(24)-12)+30, 10));
						attacks.push(new Attack(this.x, this.y, (getRandomInt(10)>4? "roBlue":"roWhite"), this.focusAttackRo+(getRandomInt(24)-12)-30, 10));
					}
				}
			
			}else if(this.hp > this.oriHp * 0.65){//2-1
				if(this.attackType != 3){
					this.attackType = 3;
					this.attackTime = 1;
					this.loadingTime = 200;
					createCoin(this.x, this.y, 25, 12);
					bgColor.setOri();
				}
				if(this.attackTime % 10 == 0){
					this.attackRo = this.attackRo + 9;
					for(let i=0; i<20; i++){
						attacks.push(new Attack(this.x, this.y, (i%2==0? "roBlue":"roWhite"), this.attackRo+18*i, 12));
					}
				}
			}else if(this.hp > this.oriHp * 0.4){//2-2
				if(this.attackType != 4){
					this.attackType = 4;
					this.attackTime = 1;
					this.loadingTime = 200;
					bgColor.setColor("#090909");
					this.param = {
						x : 0,
						y : 0,
						type : "t"
					};
				}
				var gap = 230;
				var x = 0;
				var y = 0
				if(this.attackTime % 3 == 0){
					if(this.param.type == "t"){
						x = -50 + this.param.x * gap;
						y = -50;
						this.param.x++;
						if(x > playBoardWidth + 50){
							this.param.type = "r";
						}
					}else if(this.param.type == "b"){
						x = -50 + this.param.x * gap;
						y = playBoardHeight + 50;
						this.param.x--;
						if(x < -50){
							this.param.type = "l";
						}
					}else if(this.param.type == "r"){
						x = playBoardWidth + 50;
						y = -50 + this.param.y * gap;
						this.param.y++;
						if(y > playBoardHeight + 50){
							this.param.type = "b";
						}
					}else if(this.param.type == "l"){
						x = -50;
						y = -50 + this.param.y * gap;
						this.param.y--;
						if(y < -50){
							this.param.type = "t";
						}
					}
					var ro = degree(x, y, playBoardWidth / 2, playBoardHeight / 2);
					attacks.push(new Attack(x, y, "roWhite", ro, 2));
				}
			}else if(this.hp > this.oriHp * 0.35){//3-1
				if(this.attackType != 5){
					this.attackType = 5;
					this.attackTime = 1;
					this.loadingTime = 200;
					createCoin(this.x, this.y, 25, 12);
					bgColor.setOri();
				}
				if(this.attackTime % 5 == 0){
					this.attackRo = 0;
					for(let i=0; i<45; i++){
						attacks.push(new Attack(this.x, this.y, "roWhite", this.attackRo+8*i, 25));
					}
				}
			}else{//3-2
				if(this.attackType != 6 && this.attackType != 7){
					this.attackType = 6;
					this.attackTime = 1;
					this.loadingTime = 200;
					bgColor.setColor("#ddefff");
					this.ro = 0;
				}

				if(this.attackTime % 50 == 0){
				this.ro++;
					for(let i=0; i<15; i++){
						attacks.push(new Attack(this.attackX, this.attackY, "spinRight", this.ro+24*i, 7));
						attacks.push(new Attack(this.attackX, this.attackY, "spinLeft", this.ro+24*i, 7));
						
					}
				}
				if(this.attackTime % 2 == 0){
					for(let i=0; i<6; i++){
						attacks.push(new Attack(this.attackX, this.attackY, "spinRightFast", 60*i, 5));
						attacks.push(new Attack(this.attackX, this.attackY, "spinLeftFast", 60*i, 5));
					}
				}
				
				

				if(this.hp < this.oriHp * 0.1){	
					if(this.attackType != 7){
						this.attackType = 7;
						bgColor.setColor("#ddefff");
					}			
					bgColor.setColor("#4871c7");
					if(this.attackTime % 1 == 0){
						attacks.push(new Attack(this.attackX, this.attackY, "roWhite", getRandomInt(360), 20));
					}
				}
				//ooooooooo
			}
			
		}
		
	}


	
	
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

class Background {
	constructor(){
		this.dx = 0;
		this.dy = 1;
		this.w = getRandomInt(1000) + 300; //300~1300
		this.h = getRandomInt(1000) + 300;
		this.x = getRandomInt(playBoardWidth -300) + 150 - (this.w / 2);
		this.y = -1200;
		this.radius = 30
		this.color = "#969696d4";
	}
	draw(){
		ctx.globalAlpha = 0.3;		
		this.roundRect(this.x, this.y, this.w, this.h, this.radius);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.globalAlpha = 1;
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


class BgColor {
	constructor(color){
		this.color = color;
		this.oriColor = color;
		this.toColor = this.color;
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.dr = 0;
		this.dg = 0;
		this.db = 0;
		this.time = 0;
	}
	draw(){
		if(this.color != this.toColor){
			this.time = 200;
			var rgb = this.hexToRgb(this.color);
			var toRgb = this.hexToRgb(this.toColor);
			this.r = rgb[0];
			this.g = rgb[1];
			this.b = rgb[2];
			this.dr = (toRgb[0] - rgb[0]) / this.time;
			this.dg = (toRgb[1] - rgb[1]) / this.time;
			this.db = (toRgb[2] - rgb[2]) / this.time;
			this.color = this.toColor;
		}
	
		if(this.time > 0){
			this.r = this.r + this.dr;
			this.g = this.g + this.dg;
			this.b = this.b + this.db;
			document.body.style.backgroundColor = this.rgbToHex(this.r, this.g, this.b);
			if(this.time == 1){//最後一次
				document.body.style.backgroundColor = this.toColor;
			}
			this.time--;
		}
	}
	hexToRgb(color){
		return [parseInt(color.substr(1, 2), 16), parseInt(color.substr(3, 2), 16), parseInt(color.substr(5, 2), 16)];
	}
	rgbToHex(r, g, b){
		var rgb = [Math.round(r), Math.round(g), Math.round(b)];
		var hex = [];
		for(let x of rgb){
			if(x > 255){
				x = 255;
			}else if(x < 0){
				x = 0;
			}
			x = Number(x).toString(16);
			hex.push((x.length==1? "0"+x:x));
		}
		
		return "#" + hex[0] + hex[1] + hex[2];
	}
	setColor(color){
		this.toColor = color;
	}
	setOri(){
		this.toColor = this.oriColor;
	}
}



class Power {
	constructor(x, y, type){
		this.x = x;
		this.y = y;
		this.name = name;
		this.type = type;
		this.speed = 2;
		this.trackSpeed = 20;
		this.r = 30;
		this.color = "#424242";
		this.status = "";
		this.ro = getRandomInt(360);
		this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
		this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
		this.trackFlag = false;
		if(type == "hp"){
			this.name = "H";
		}else if(type == "skill"){
			this.name = "★";
		}
	}
	draw(){
		//玩家直接吸
		if(distance(player.x, player.y, this.x, this.y) < player.r + this.r + 65){
			this.trackFlag = true;
		}
		if(this.trackFlag){//追蹤
			this.ro = degree(this.x, this.y, player.x ,player.y);
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.trackSpeed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.trackSpeed;
		}else{//一般
			if((this.x - this.r <= 0 && this.dx < 0)	|| (this.x + this.r >= playBoardWidth && this.dx > 0)) {
				this.dx = -this.dx;
			}		
			if((this.y - this.r <= 0 && this.dy < 0)	|| (this.y + this.r >= playBoardHeight && this.dy > 0)){
				this.dy = -this.dy;
			}
			if(this.dx == 0){
				this.dx = 2;
			}
			if(this.dy == 0 || this.y < this.r){
				this.dy = 2;
			}
		}
	
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.closePath();	
		ctx.fillStyle = this.color;
		ctx.fill();
		
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "30px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.name, this.x, this.y + 10);
	}
}

class Shield {
	constructor(x, y, r, time){
		this.x = x;
		this.y = y;
		this.r = 0;
		this.aniRunTime = 20;
		this.toR = r;
		this.dr = this.toR / this.aniRunTime;
		this.time = 0;
		this.speed = 2;
		this.color = "#424242";
		this.offset = 0;
		this.status = "close";
	}
	draw(){
		if(this.status == "open"){
			this.time++;
			if(this.time < this.aniRunTime){
				this.r = this.r + this.dr;
				if(this.time == this.aniRunTime){
					this.r = this.toR;
				}
			}else if(this.time > 150){
				this.r = this.r - this.dr;
				if(this.r < 0){
					this.r = 0;
					this.status = "close";
					this.time = 0;
				}
				
			}
			
			this.offset++;
			if(this.offset > 200){
				this.offset = 0;
			}
			//圓
			ctx.beginPath();
			ctx.strokeStyle = this.color;
			ctx.lineDashOffset = -this.offset;
			ctx.setLineDash([150, 50]);
			ctx.arc(this.x, this.y, this.r, Math.PI*(-0.5), Math.PI*(1.5), true);
			ctx.closePath();
			ctx.stroke();

			ctx.beginPath();
			ctx.setLineDash([10, 10]);
			ctx.arc(this.x, this.y, (this.r<10? 1:this.r-10), Math.PI*(-0.5), Math.PI*(1.5), true);
			ctx.closePath();
			ctx.stroke();

			ctx.beginPath();
			ctx.setLineDash([30, 10]);
			ctx.arc(this.x, this.y, (this.r<30? 1:this.r-30), Math.PI*(-0.5), Math.PI*(1.5), true);
			ctx.closePath();
			ctx.stroke();
			
			var gradient = ctx.createRadialGradient(this.x, this.y, this.r/2, this.x, this.y, this.r);
			gradient.addColorStop(0, "#ffffff33");
			gradient.addColorStop(1, "#00000061");
			ctx.beginPath();
			ctx.arc(this.x, this.y, (this.r<5? 1:this.r-5), Math.PI*(-0.5), Math.PI*(1.5), true);
			ctx.closePath();	
			ctx.fillStyle = gradient;
			ctx.fill();
			//返回原設定
			ctx.setLineDash([]);
		}
	}
}

class Point {
	constructor(x, y, speed){
		this.x = x;
		this.y = y;
		this.r = 15;
		this.color = "#d3c7b5";
		this.status = "";
		if(speed == null){
			this.speed = getRandomInt(3) + 3;
		}else{
			this.speed = getRandomInt(speed - 3) + 3;
		}
		this.ro = getRandomInt(360);
		this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
		this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
		this.value = 1;
		this.time = 1;
		this.downFlag = false;
		this.trackFlag = false;
		this.trackSpeed = 20;
		this.name = "| |";
	}
	draw(){
		this.setMove();
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.closePath();	
		ctx.fillStyle = this.color;
		ctx.fill();
		
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "10px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.name, this.x, this.y+3);
	}
	setMove(){
		//玩家直接吸
		if(player.y < 500 || distance(player.x, player.y, this.x, this.y) < 120){
			this.trackFlag = true;
		}
		if(this.trackFlag){
			this.ro = degree(this.x, this.y, player.x ,player.y);
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.trackSpeed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.trackSpeed;
			return;
		}
		
		if(!this.downFlag){
			this.time++;
			this.speed = this.speed * 0.96;
			this.dx = Math.cos(Math.PI * this.ro / 180) * this.speed;
			this.dy = -Math.sin(Math.PI * this.ro / 180) * this.speed;
			if(this.speed < 1.2){
				this.downFlag = true;
			}
		}else{
			if(this.speed <= 3){
				this.speed = this.speed * 1.01;
			}else if(this.speed > 3 && this.speed <= 4){
				this.speed = this.speed * 1.015;
			}else if(this.speed > 4 && this.speed <= 5){
				this.speed = this.speed * 1.02;
			}else if(this.speed > 5 && this.speed <= 6){
				this.speed = this.speed * 1.04;
			}
			this.dx = 0;
			this.dy = this.speed;
		}
	}
}


class Fire {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.speed = 3;
		this.r = 4;
		this.time = 0;
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
		this.time++;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.closePath();	
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}



class Score{
	constructor(){
		this.color = "#111111";
		this.gameoverFlag = false;
		if(localStorage.getItem("flyballMasterMaxScore") != null){
			banner.findData();
			this.historyScore = banner.dataArr[0].score;
		}else{
			this.historyScore = 0;
		}
	}
	draw(){
		ctx.fillStyle = this.color;
		ctx.font = "30px Arial";
		ctx.textAlign = "left";
		var gap = 40;
		var x = 20;
		ctx.fillText("MAX RECORD : " + this.historyScore, x, gap);
		ctx.fillText("SCORE : " + player.point, x, 2*gap);
		ctx.fillText("HP : " + player.hp, x, 3*gap);
		var attack = Math.floor(player.attack / 20);
		if(attack == 5){
			attack = "MAX";
		}
		ctx.fillText("ATTACK : " + attack, x, 4*gap);
		ctx.fillText("★ : " + player.skill, x, 5*gap);
		if(player.hp <= 0){
			if(!this.gameoverFlag){
				this.gameoverFlag = true;
				showMsg("GAME OVER!!")
			}
			//this.msg();
		}
	}
	msg(name){
		ctx.fillStyle = this.color;
		ctx.font = "80px Arial";
		ctx.textAlign = "center";
		ctx.fillText("GAME OVER!!", canvas.width / 2, canvas.height / 2 - 50);
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
		
		if(this.type == "difficulty"){
			this.text = "簡單";
		}else if(this.type == "stage"){
			this.text = "stage1";
		}else if(this.type == "start"){
			this.text = "開始";
		}else if(this.type == "pause"){
			this.text = "| |";
			//修正字型大小與位置
			this.fontSize = "30px";
			this.centerY = this.centerY - 6;
		}else if(this.type == "reStart"){
			this.text = "重新開始";
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
	
		if(this.type == "difficulty"){
			if(this.choose == 0){
				this.text = "簡單";
				difficulty = 0;
			}else if(this.choose == 1){
				this.text = "困難";
				difficulty = 1;
			}
		}else if(this.type == "stage"){
			this.text = "stage" + (this.choose + 1);
		}else if(this.type == "start"){
			startPlayFlag = true;
			var stage = this.getStageChoose();
			time = this.getStageChoose() * 10000; 
			if(stage > 0){
				player.attack = 100;
			}			
			//刪除選單
			this.removeController(["start", "difficulty", "stage"]);
			//	var s =  new sound("bg.mp3");
			//s.play();
		}else if(this.type == "pause"){
			if(this.choose == 0){
				this.text = "| |";
				pauseFlag = false;
				//刪除重新開始
				this.removeController(["reStart"]);
				//繼續遊戲
				raf = window.requestAnimationFrame(main);;
			}else if(this.choose == 1){
				this.text = ">>";
				pauseFlag = true;
				clear();
				controllers.push(new Controller(playBoardWidth - 360, 50, 200, 80, "reStart", 1));//加入重新開始
				draw();//最後一畫
				banner.draw();
				//暫停遊戲
				window.cancelAnimationFrame(raf);
			}
		}else if(this.type == "reStart"){
			window.location.reload();
		}
	}
	getStageChoose(){
		for(controller of controllers){
			if(controller.type == "stage"){
				return controller.choose;
			}
		}
	}
	removeController(typeArr){
		for(controller of controllers){
			for(let type of typeArr){
				if(controller.type == type){
					controller.status = "remove";
				}
			}
		}
	}
}



class Slower{
	constructor(x, y, chooseNum){
		this.x = x;
		this.y = y;
		this.r = 110;
		this.choose = 0;
		this.chooseNum = chooseNum;
		this.color = "#252525";
		this.slowColor = "#00000044";
		this.slowTextColor = "#ffffff";
		this.text = ["精準", "移動"];
		this.status = "noTouch";
	}
	draw(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		if(this.choose == 0){
			ctx.strokeStyle = this.color;
			ctx.stroke();
		}else if(this.choose == 1){
			ctx.fillStyle = this.slowColor;
			ctx.fill();
		}

		ctx.fillStyle = this.choose == 0? this.color:this.slowTextColor;
		ctx.font = "38px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.text[0], this.x, this.y -4);
		ctx.fillText(this.text[1], this.x, this.y +36);
	}
	slow(){
		this.choose = 1;
		player.speed = player.minSpeed;
	}
	normal(){
		this.choose = 0;
		player.speed = player.maxSpeed;
	}
}



class Banner{
	constructor(){
		this.x = canvas.width / 2;
		this.y = canvas.height / 2 + 50;
		this.str = "";
		this.fontSize = "50px";
		this.color = "#eeeeee";
		this.bgColor = "#333333bb";
		this.textAlign = "center";
		this.dataArr = null;

	}
	draw(){
		//背景
		ctx.fillStyle = this.bgColor;
		ctx.fillRect(25, 250, playBoardWidth - 50, playBoardHeight - 500);
		
		//顏色
		this.findData();
		var strArr = this.str.split("\n");
		var gap = 90;
		ctx.fillStyle = this.color;
		ctx.font = this.fontSize + " serif";
		ctx.textAlign = this.textAlign;
		for(let i=0; i<strArr.length; i++){
			ctx.fillText(strArr[i], this.x, this.y + (i-(strArr.length-1)/2)*gap);
		}
	}
	findData(){
		try{
			var str = "----------HIGHEST SCORE----------\n";
			var count = 0;
			var history = localStorage.getItem("flyballMasterMaxScore");
			if(history != null && history != ""){
				var json = JSON.parse(history);
				this.dataArr = json.main;
				for(var data of this.dataArr){
					count++;
					str += "(" + count + ")  " + data.time + " ... " + data.score.toString().padStart(8, "0") + "\n";
				}
			}	
			for(let i=0; i<10-count; i++){
				str += "(_)  " + "____/__/__ __:__:__" + " ... " + "00000000" + "\n";
			}
			this.str = str;
		}catch(e){
			console.log(e);
		}
	}
}


class SkillBtn{
	constructor(x, y, type,  chooseNum){
		this.x = x;
		this.y = y;
		this.r = 80;
		this.choose = 0;
		this.chooseNum = chooseNum;
		this.ableColor = "#5f5f5fbb";
		this.color = this.ableColor;
		this.protectColor = "#ffffff";
		this.disableColor = "#25252544";
		this.touchColor = "#00000044";
		this.touchTextColor = "#ffffff";
		this.status = "";
		this.time = 0;
		this.offset = 0;
		if(type == "shield"){
			this.text = ["★☆★"];
		}
	}
	draw(){
		if(this.choose == 1){
			this.time--;
			if(this.time <= 0){
				this.choose = 0;
				this.status = "close";
			}
		}
		
		
		//繪圖開始
		ctx.beginPath();
		ctx.lineDashOffset = this.offset;
		ctx.arc(this.x, this.y, this.r, Math.PI*(-0.5), Math.PI*(1.5), true);
		ctx.closePath();
		 if(this.choose == 0){//一般情況
			if(player.skill == 0){
				ctx.setLineDash([30, 10]);
				ctx.strokeStyle = this.disableColor;
				ctx.stroke();
				this.text = "☆";
			}else{
				//動畫
				this.offset++;
				if(this.offset > 40){
					this.offset = 0;
				}
				
				ctx.setLineDash([30, 10]);
				ctx.strokeStyle = this.ableColor;
				ctx.stroke();
				this.text = "";
				if(player.skill > 0 && player.skill <= 3){
					for(let i=0; i<player.skill; i++){
						this.text += "★";
					}
				}else if(player.skill > 3){
					this.text = player.skill + "★";
				}
			}
		
		}else if(this.choose == 1){//按下去當中
			ctx.strokeStyle = this.ableColor;
			ctx.stroke();
			ctx.fillStyle = this.touchColor;
			ctx.fill();
		}
		
		ctx.font = "40px Arial";
		ctx.textAlign = "center";
		ctx.fillText(this.text, this.x, this.y + 16);
		
		//返回原設定
		ctx.setLineDash([]);
		
		//保護色
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r - 5, 0, Math.PI*(2), true);
		ctx.closePath();
		ctx.strokeStyle = this.protectColor;
		ctx.stroke();
	}
	start(){
		if(player.skill > 0 && shield.status != "open"){
			this.choose = 1;
			this.time = 10;
			player.skill--;
			shield.status = "open";
		}
	}

}


class Toucher{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.touchX = x;
		this.touchY = y;
		this.r = 50;
		this.pathlength = 18;
		this.innerR = 9;
		this.ro = 0;
		this.color = "#000000aa";
		this.lineWidth = 4;
		this.offset = 0;
		this.distance = 0;
	}
	draw(){
		//十字
		ctx.beginPath();
		ctx.moveTo(this.x - this.pathlength, this.y);
		ctx.lineTo(this.x + this.pathlength, this.y);
		ctx.moveTo(this.x, this.y - this.pathlength);
		ctx.lineTo(this.x, this.y + this.pathlength);
		ctx.strokeStyle = this.color;
		ctx.stroke();

		//圓
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.arc(this.touchX, this.touchY, this.innerR, 0, Math.PI*2, true);
		ctx.stroke();

		//線
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.touchX, this.touchY);
		ctx.strokeStyle = this.color;
		ctx.setLineDash([12, 4]);
		this.offset++;
		if(this.offset > 32){
			this.offset = 0;
		}
		ctx.lineDashOffset = -this.offset;
		ctx.fill();
		ctx.stroke();

		//返回原設定
		ctx.setLineDash([]);
	}

	move(x, y){
		this.distance = distance(player.startX, player.startY, x, y);
		if(this.distance > 0){
			this.ro = degree(player.startX, player.startY, x, y);
			this.touchX = this.x + Math.cos(Math.PI * this.ro / 180) * this.r;
			this.touchY = this.y + -Math.sin(Math.PI * this.ro / 180) * this.r;
		}else{
			this.stop();
		}
	
	}
	stop(){
		this.touchX = this.x;
		this.touchY = this.y;	
	}
	
	/*
	touch(x, y){
		this.ro = degree(this.x, this.y, x, y);
		this.distance = distance(this.x, this.y, x, y);
		if(this.distance > this.r){
			this.touchX = this.x + Math.cos(Math.PI * this.ro / 180) * this.r;
			this.touchY = this.y + -Math.sin(Math.PI * this.ro / 180) * this.r;
		}else{
			this.touchX = x;
			this.touchY = y;
		}
	}*/
}

function getRandomX(gap){
	return getRandomInt(playBoardWidth - gap*2) + gap;
}
function getRandomY(gap){
	return getRandomInt(playBoardHeight - gap*2) + gap;
}



function runBoss(){
	if(player.fightBossFlag){
		player.fightBossTime++;
		
		player.fightBossFlag = false;
		for(brick of bricks){
			if(brick.id == player.fightBossId){
				player.fightBossFlag = true;
			}
		}
		if(player.fightBossFlag == false && player.fightBossId > 99){
			time = (player.fightBossId - 99) * 10000 - 1;
			player.fightBossTime = 0;//重新計時
			showMsg("STAGE " + (player.fightBossId - 99) + " CLEAR!!");
			bgColor.setOri();//背景恢復
			if(player.fightBossId - 99 == maxStageNum){
				allStageClear();
			}
		}
	}
			//console.log(time);
}
function runStage(start, continueTime, frequence, eles, bonus){
	var stageTime = time - start - player.fightBossTime;
	
	if((stageTime >= 0 && stageTime < continueTime) || (stageTime == 0 && typeof frequence == "string")){
		console.log(stageTime);
		if(frequence == "boss"){
			for(oneEle of eles){
				oneEle.bonus = bonus;
				bricks.push(oneEle);
				player.fightBossId = oneEle.id;
				player.fightBossFlag = true;
				time++;//for卡控
			}
		}else{
			if(stageTime % frequence == 0){
				for(oneEle of eles){
					if(bonus != null && bonus != ""){
						oneEle.bonus = bonus;
					}
					bricks.push(oneEle);
				}
			}
		}
	}
}

function allStageClear(){
	var hpScore = ((difficulty/2)+1)*player.hp*100000;
	var attackScore = ((difficulty/2)+1)*(Math.floor(player.attack / 20))*5000;
	var skillScore = ((difficulty/2)+1)*player.skill*10000;
	var score = player.point;
	var stageClearScore = 10000 * 3;
	var totalScore = hpScore + attackScore + skillScore + score + stageClearScore;
	var main = new Tip("ALL STAGE CLEAR!!!\n", false);
	main.y = main.y - 280;
	main.existTime = 99999;
	tips.push(main);
	var detail = new Tip(
	"------CLEAR BONUS--------------------------------\n"
	+ "  DIFFICULTY x HP x 100000 ............ = " + hpScore + "\n"
	+ "  DIFFICULTY x ATTACK x 5000 ...... = " + attackScore + "\n"
	+ "  DIFFICULTY x SKILL x 10000 ........ = " + skillScore + "\n"
	+ "  SCORE ............................................... = " + score + "\n"
	+ "  STAGE x 10000................................... = " + stageClearScore + "\n"
	+ "-----------------------------------------------------------\n"
	+ "  TOTAL SCORE ................................. = " + totalScore + "\n"
	, false);
	detail.y = detail.y + 150;
	detail.x = 50;
	detail.textAlign = "left";
	detail.fontSize = "40px";
	detail.existTime = 99999;
	tips.push(detail);
	player.point = totalScore;
	
	//成績紀錄
	if(totalScore < 0){
		return;//防錯
	}
	try{
		var temp={
			score : player.point,
			time : findNowCalendar()
		};
		banner.findData();
		var dataArr = banner.dataArr;
		var newArr = [];
		var insertFlag = false;
		if(dataArr != null){
			for(let i=0; i<dataArr.length; i++){
				if(player.point > dataArr[i].score){
					dataArr.splice(i, 0, temp);
					insertFlag = true;
					break;
				}
			}
			if(!insertFlag){//若為最小
				dataArr.push(temp);
			}
			//只取前十
			for(let i=0; i<10; i++){
				if(dataArr[i] != null){
					newArr.push(dataArr[i]);
				}
			}
		}else{
			newArr.push(temp);
		}

		var newJson = {
			"main" : newArr
		};
		localStorage.setItem("flyballMasterMaxScore", JSON.stringify(newJson));
	}catch(e){
		console.log(e);
	}
}

function createBrick(){
	var r = playBoardWidth;
	var b = playBoardHeight;
	var i = playBoardHeight;
	if(!startPlayFlag){
		tips.push(new Tip("FLYBALL MASTER", false));
		return;
	}
	//if(time<100){
		//time = 29000;
		//player.attack = 100;
	//}
	//開始時間 持續時間(關卡ID) 生成頻率(類型) 物件
	//類型 "" "once" "boss" ssssss
	if(time >= 0 && time < 10000){
		runStage(0, 2000, 240, [new Brick(1, 200, -100, 0, 3, 3), new Brick(1, r-200, -100, 0, 3, 3)]);

		runStage(2000, 1800, 50, [getRandomInt(10)>4? new Brick(2, -100, 30, 6, 2, 5):new Brick(2, r+100, 30, -6, 2, 5)]);

		runStage(3800, 1700, 240, [new Brick(3, getRandomX(100), -100, 0, 2, 20)]);
		runStage(4000, 1500, 240, [new Brick(3, -200, 30, 3, 2, 20)]);
		runStage(4200, 1300, 240, [new Brick(3, r+200, 30, -3, 2, 20)]);

		runStage(5500, 500, 50, [new Brick(1, getRandomX(100), -100, 0, 3, 10)]);
		runStage(5500, 500, 40, [getRandomInt(10)>4? new Brick(2, -100, 30, 6, 2, 8):new Brick(2, r+100, 30, -6, 2, 8)]);
		runStage(5500, 500, 70, [new Brick(3, getRandomX(100), -100, 0, 2, 20)]);
		runStage(5800, 1, 1, [new Brick(1, getRandomX(100), -100, 0, 3, 10)], "hp");
		runStage(6700, 1, "boss", [new Boss(100, 450, -100, 0, 2, 800)], "hp");
	}else if(time >= 10000 && time < 20000){
		runStage(10000, 1500, 70, [new Brick(1, getRandomX(100), -100, 0, 3, 10)]);
		runStage(10500, 1000, 50, [getRandomInt(10)>4? new Brick(2, -100, 30, 6, 2, 8):new Brick(2, r+100, 30, -6, 2, 8)]);
		
		runStage(11800, 2000, 260, [new Brick(4, -20, -100, 0, 10, 30), new Brick(4, r+20, -100, 0, 10, 30)]);
		runStage(12500, 1500, 80, [new Brick(1, getRandomX(100), -100, 0, 3, 10)]);
		runStage(13000, 1000, 60, [getRandomInt(10)>4? new Brick(2, -100, 30, 6, 2, 8):new Brick(2, r+100, 30, -6, 2, 8)]);
		
		runStage(14000, 1, 1, [new Brick(5, 450, -100, 0, 5, 50, [300])]);
		runStage(14300, 1, 1, [new Brick(5, 150, -100, 0, 10, 50, [b-300]), new Brick(5, r-150, -100, 0, 10, 50, [b-300])]);
		runStage(14800, 1, 1, [new Brick(5, 450, -100, 0, 5, 50, [300]), new Brick(5, 200, -100, 0, 5, 50, [300]), new Brick(5, r-200, -100, 0, 5, 50, [300])]);
		runStage(15500, 1, 1, [new Brick(5, 450, -100, 0, 5, 500, [300])], "hp");
		runStage(15800, 1, 1, [new Brick(5, 150, -100, 0, 10, 100, [400]), new Brick(5, r-150, -100, 0, 10, 100, [400])
		, new Brick(5, 300, -100, 0, 10, 100, [350]), new Brick(5, r-300, -100, 0, 10, 100, [350])]);
		
		runStage(17100, 1, "boss", [new Boss(101, 450, -100, 0, 18, 500, 270)], "hp");
	}else if(time >= 20000 && time < 30000){
		runStage(20300, 1000, 80, [new Brick(5, getRandomX(100), -100, 0, 5, 10, [getRandomInt(200)+100])]);
		runStage(20800, 1000, 40, [getRandomInt(10)>4? new Brick(2, -100, 30, 6, 2, 5):new Brick(2, r+100, 30, -6, 2, 5)]);
		
		runStage(22000, 1, 1, [new Brick(5, 450, -100, 0, 5, 100, [700])]);
		runStage(22300, 1, 1, [new Brick(5, 450, -100, 0, 5, 100, [700])]);
		runStage(22600, 1, 1, [new Brick(5, 450, -100, 0, 5, 100, [b-100])]);
		runStage(22650, 1, 1, [new Brick(5, 150, -100, 0, 5, 100, [b-300]), new Brick(5, r-150, -100, 0, 5, 100, [b-300])]);
		runStage(22700, 1, 1, [new Brick(5, 150, -100, 0, 5, 100, [500]), new Brick(5, r-150, -100, 0, 5, 100, [500])]);
		runStage(22750, 1, 1, [new Brick(5, 450, -100, 0, 5, 100, [300])]);
		
		runStage(23300, 2000, 80, [new Brick(4, getRandomX(100), -100, 0, 10, 30)]);
		runStage(23600, 1700, 80, [new Brick(3, getRandomX(100), -100, 0, 2, 20)]);
		runStage(23600, 1700, 700, [new Brick(5, 450, -100, 0, 5, 100, [300])]);
		runStage(24900, 400, 60, [new Brick(1, getRandomX(100), -100, 0, 3, 10)]);
		runStage(25000, 300, 80, [getRandomInt(10)>4? new Brick(2, -100, 30, 6, 2, 8):new Brick(2, r+100, 30, -6, 2, 8)]);
		
		runStage(25700, 2200, 500, [new Brick(3, getRandomX(100), b+100, 0, -3, 20)]);
		runStage(26200, 1700, 100, [new Brick(6, getRandomX(100), -100, 0, 5, 20)]);
		runStage(26700, 1200, 400, [getRandomInt(10)>4? new Brick(4, -20, getRandomY(500), 0, 10, 30):new Brick(4, r+20, getRandomY(500), 0, 10, 30)]);
		runStage(28300, 1, 1, [new Brick(5, 450, -100, 0, 5, 300, [300])], "hp");
		
		runStage(29000, 1, "boss", [new Boss(102, 450, -100, 0, 2, 3000)]);
	}
	
	
	
	
	
	
	
	
	runBoss();
	
	
	/*
	var autoBreakTime = 999;
	var repeatFlag = false;
	var temp = 0;
	var w = 80;
	var h = 80;
	
	if(time % 70 == 0){
		do{
		temp = getRandomInt(playBoardWidth - 100 - 20) + 20;
			for(brick of bricks){
				if(checkInsideEle(brick, temp, -100) || checkInsideEle(brick + w, temp, -100)
					|| checkInsideEle(brick, temp, -100 + h) || checkInsideEle(brick + w, temp, -100 + h)){//重疊了
					repeatFlag = true;
				}
			}
			autoBreakTime--;
		}while(repeatFlag && autoBreakTime > 0);
		
		var id = getRandomInt(10);
		if(id >= 0 && id < 5){
			bricks.push(new Brick(1,temp, -100, 0, 3, 20));//id x y dx dy hp
		}else if(id >= 5 && id < 8){
			if(getRandomInt(10)>4){
				bricks.push(new Brick(2, -100, 30, 6, 2, 10));
			}else{
				bricks.push(new Brick(2, playBoardWidth+100, 30, -6, 2, 10));
			}
		}else if(id >= 8 && id < 10){
			bricks.push(new Brick(3,temp, -100, 0, 2, 30));
		}
	}*/
}



function createBall(){
	var attack = Math.floor(player.attack / 20);//無條件捨去
	var x = player.x;
	var y = player.y - player.r;
	
	if(time % 5 == 0){
		if(attack == 0){
			balls.push(new Ball(x, y, 90));	
		}else if(attack == 1){
			balls.push(new Ball(x+15, y, 90));
			balls.push(new Ball(x-15, y, 90));
		}else if(attack == 2){
			balls.push(new Ball(x+15, y, 90));
			balls.push(new Ball(x-15, y, 90));
			balls.push(new Ball(x, y, 100));
			balls.push(new Ball(x, y, 80));
		}else if(attack == 3){
			balls.push(new Ball(x, y, 90));		
			balls.push(new Ball(x+30, y, 90));
			balls.push(new Ball(x-30, y, 90));
			balls.push(new Ball(x, y, 100));
			balls.push(new Ball(x, y, 80));
		}else if(attack == 4){
			balls.push(new Ball(x, y, 90));		
			balls.push(new Ball(x+30, y, 90));
			balls.push(new Ball(x-30, y, 90));
			balls.push(new Ball(x, y, 100));
			balls.push(new Ball(x, y, 80));
			balls.push(new Ball(x, y, 110));
			balls.push(new Ball(x, y, 70));
		}else if(attack >= 5){
			balls.push(new Ball(x+15, y, 90));
			balls.push(new Ball(x-15, y, 90));
			balls.push(new Ball(x+45, y, 90));
			balls.push(new Ball(x-45, y, 90));
			balls.push(new Ball(x, y, 100));
			balls.push(new Ball(x, y, 80));
			balls.push(new Ball(x, y, 110));
			balls.push(new Ball(x, y, 70));
		}
	}

}

function createBackgrounds(){
	if(time % 500 == 0 || (backgrounds.length < 2 && time % 100 == 0)){
		backgrounds.push(new Background());
	}
}

function createController(){
	var gap = 180;
	controllers.push(new Controller(playBoardWidth - 250, 1500, 150, 80, "start", 1));
	controllers.push(new Controller(playBoardWidth - (250+gap), 1500, 150, 80, "difficulty", 2));
	controllers.push(new Controller(playBoardWidth - (250+2*gap), 1500, 150, 80, "stage", 3));
	var pause = new Controller(playBoardWidth - 130, 50, 80, 80, "pause", 2);
	pause.w = 80;
	controllers.push(pause);
}
function createElement(){
	createBall();
	createBrick();
	createBackgrounds();
}
function iniCreateElement(){
	player = new Player(playBoardWidth / 2, playBoardHeight - 250);
	backgrounds.push(new Background());
	bgColor = new BgColor("#e0e0e0");
	toucher = new Toucher(playBoardWidth / 2, 80);
	skillBtn = new SkillBtn(100, playBoardHeight - 300, "shield");
	shield = new Shield(player.x, player.y, 250);
	banner = new Banner();
	score = new Score();
	createController();
}

function brickHit(){
	for(brick of bricks){
		for(ball of balls){
			var insideFlag = false;
			
			if(brick.r == null || brick.r == 0){
				if(checkBallTouchBrick(ball, brick, 0)){
					insideFlag = true;
				}
			}else{
				if(distance(ball.x, ball.y, brick.x, brick.y) <= brick.r + ball.r){
					insideFlag = true;
				}
			}
			if(insideFlag){
				if(brick.loadingTime == null || brick.loadingTime <= 0){//怪的緩衝時間
					brick.hp--;
					player.point++;//得分
				}
				ball.status = "remove";
				fires.push(new Fire(ball.x, ball.y));
			}
		}
		if(brick.hp <= 0){
			brick.status = "remove";
			//掉落經驗
			var coinTemp = getRandomInt(brick.pointMax - brick.pointMin + 1) + brick.pointMin;
			for(let i=0; i<coinTemp; i++){
				if(brick.id < 100){
					points.push(new Point(brick.centerX, brick.centerY, 6));
				}else{
					points.push(new Point(brick.centerX, brick.centerY, 12));
				}
			}
			//指定生成
			if(brick.bonus != null && brick.bonus != ""){
				powers.push(new Power(brick.centerX, brick.centerY, brick.bonus));
			}else{
				//機率生成S
				if(getRandomInt(50) == 0){
					powers.push(new Power(brick.centerX, brick.centerY, "skill"));
				}
			}
			//王關生成H
			/*
			if(brick.id > 99 && (brick.id - 99) < maxStageNum){
				powers.push(new Power(brick.centerX, brick.centerY, "hp"));
			}
			*/
		}
	}
}
function createCoin(x, y, number, speed){
	for(let i=0; i<number; i++){
		points.push(new Point(x, y, speed));
	}
}
function playerHpLoseDetail(){
	if(player.bufferTime == 1 && shield.status != "open"){//到1時觸發
		player.invisiableTime = 200;
		player.hp--;
		player.point = (player.point-5000<0? 0:player.point-5000);//扣分
		for(let i=0; i<100; i++){
			fires.push(new Fire(player.x, player.y));
		}
		if(player.attack > 20){
			createCoin(player.x, player.y, 10, 6);
			player.attack = player.attack - 20;
		}else{
			createCoin(player.x, player.y, player.attack, 6);
			player.attack = 0;
		}
		
		player.x = player.oriX;
		player.y = player.oriY;
		player.skill = 2;
	
	}
	
}
function playerHpLose(){
	if(player.invisiableTime == 0 && player.bufferTime == 0){
		player.bufferTime = 11;//緩衝時間
	}
}

function playerHit(){
	var fix = 3;
	for(attack of attacks){
		if(shield.r > 0 && distance(shield.x, shield.y, attack.x, attack.y) <= shield.r + attack.r){
			attack.status = "remove";
		}
		if(distance(player.x, player.y, attack.x, attack.y) <= player.r + attack.r - fix){
			playerHpLose();
			attack.status = "remove";
		}
	}
	for(power of powers){
		if(distance(player.x, player.y, power.x, power.y) <= player.r + power.r){
			if(power.type == "hp"){
				player.hp++;
			}else if(power.type == "skill"){
				player.skill++;
			}
			power.status = "remove";
		}
	}
	for(point of points){
		if(distance(player.x, player.y, point.x, point.y) <= player.r + point.r){
			player.point = player.point + 100;//一點一百分
			if(player.attack < 100){
				player.attack++;
			}
			point.status = "remove";
		}
	}
	for(brick of bricks){
		var insideFlag = false;
		if(brick.r == null || brick.r == 0){
			if(checkBallTouchBrick(player, brick, fix)){
				insideFlag = true;
			}
		}else{
			if(distance(player.x, player.y, brick.x, brick.y) <= player.r + brick.r - fix){
				insideFlag = true;
			}
		}
		if(insideFlag && shield.status != "open"){//如果護盾沒開
			playerHpLose();
			fires.push(new Fire((player.x + brick.centerX) / 2, (player.y + brick.centerY) / 2));
		}
	}
}
function drawAll(eles){
	for(e of eles){
		e.draw();
	}
}
function draw(){
	drawAll(backgrounds);
	drawAll(points);
	drawAll(bricks);
	player.draw();
	drawAll(balls);
	drawAll(attacks);
	drawAll(powers);
	drawAll(fires);
	drawAll(tips);
	drawAll(controllers);
	score.draw();
	bgColor.draw();
	toucher.draw();
	skillBtn.draw();
	shield.draw();
}

function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); 
}


function moveAll(eles){
	for(e of eles){
		e.x += e.dx;
		e.y += e.dy;
	}
}
function move(){
	if(player.x - player.r + player.dx < 0){
		player.x = player.r;
	}else if(player.x + player.r + player.dx > playBoardWidth){
		player.x = playBoardWidth - player.r;
	}else{
		player.x += player.dx;
	}
	if(player.y - player.r + player.dy < 0){
		player.y = player.r;
	}else if(player.y + player.r + player.dy > playBoardHeight){
		player.y = playBoardHeight - player.r;
	}else{
		player.y += player.dy;
	}
	
	moveAll(bricks);
	brickHit();
	moveAll(balls);
	moveAll(attacks);
	moveAll(powers);
	moveAll(points);
	moveAll(fires);
	moveAll(backgrounds);
	moveAll(tips);
	playerHit();

}
function deleteOld(eles, delCondition){
	var newEles = [];
	for(e of eles){
		if(delCondition){
			e = null;
			delete e;
		}else{
			newEles.push(e);
		}
	}
	eles = newEles;

}
function deleteElement(){
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
	
	var newBricks = [];
	for(brick of bricks){
		if(checkOutside(brick, 200) || brick.status == "remove"){
			brick = null;
			delete brick;
		}else{
			newBricks.push(brick);
		}
	}
	bricks = newBricks;	
	
	var newAttacks = [];
	for(attack of attacks){
		if(checkOutside(attack, 200) || attack.status == "remove"){
			attack = null;
			delete attack;
		}else{
			newAttacks.push(attack);
		}
	}
	attacks = newAttacks;
	
	var newPowers = [];
	for(power of powers){
		if(checkOutside(power, 200) || power.status == "remove"){
			power = null;
			delete power;
		}else{
			newPowers.push(power);
		}
	}
	powers = newPowers;
	
	var newPoints = [];
	for(point of points){
		if(checkOutside(point, 350) || point.status == "remove"){
			point = null;
			delete point;
		}else{
			newPoints.push(point);
		}
	}
	points = newPoints;
	
	var newFires = [];
	for(fire of fires){
		if(fire.time > 10){
			fire = null;
			delete fire;
		}else{
			newFires.push(fire);
		}
	}
	fires = newFires;
	
	var newBackgrounds = [];
	for(background of backgrounds){
		if(background.y > playBoardHeight + 100){
			background = null;
			delete background;
		}else{
			newBackgrounds.push(background);
		}
	}
	backgrounds = newBackgrounds;
	
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
	
	var newControllers = [];
	for(controller of controllers){
		if(controller.status == "remove"){
			console.log("remove" + controller.type);
			controller = null;
			delete controller;
		}else{
			newControllers.push(controller);
		}
	}
	controllers = newControllers;
	
	
	if(shield.status == "remove"){
		shield = null;
	}
	
	
}

function checkOutside(e, gap){
	if(e.x < -gap || e.x > playBoardWidth + gap || e.y < -gap || e.y > playBoardHeight + gap){
		return true;
	}
	return false;
}

function showMsg(str){
	tips.push(new Tip(str));
}

function checkInsideEle(ele, x, y, fix){
	if(x-fix >= ele.x && x+fix <= ele.x + ele.w && y-fix >= ele.y && y+fix <= ele.y + ele.h){
		return true;
	}
	return false;
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
	
	return yyyy + "/" + mm + "/" + dd + " " + hh + ":" + mi + ":" + ss;
}
function getRandomColor(){
	var color = [];
	var str = "";
	for(let i=0; i<6; i++){
		var temp = getRandomInt(16);
		if(temp == 10){
			temp = "a";
		}else if(temp == 11){
			temp = "b";
		}else if(temp == 12){
			temp = "c";
		}else if(temp == 13){
			temp = "d";
		}else if(temp == 14){
			temp = "e";
		}else if(temp == 15){
			temp = "f";
		}
		color.push(temp);
	}
	for(c of color){
		str += c;
	}
	return "#" + str;
}
function getBrickById(id){
	for(brick of bricks){
		if(brick.id = id){
			return brick;
		}
	}
	returnnull;
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
//產生0<=return<max的整數
function getRandomInt(max){
	return Math.floor(Math.random() * Math.floor(max));
}

//點選菜單
function onTouchController(x, y){
	for(controller of controllers){
		if(x > controller.x && x < controller.x + controller.w && y > controller.y && y < controller.y + controller.h){
			controller.tap();
		}
	}
}

//手指玩家減速
function onTouchSlower(x, y, type){//type = start move end
	if(type == "move" && slower.status == "touchIn"){//移動時 有標記才觸發
		if(distance(x, y, slower.x, slower.y) < slower.r){
			slower.status = "touchIn";//在範圍內 不改標記
		}else{
			slower.status = "touchOut";//在範圍外 改標記
		}
		//繼續減速
		slower.slow();
		return true;
	}else if(type == "start"){//點下時
		if(distance(x, y, slower.x, slower.y) < slower.r){//點擊時給予標記
			slower.status = "touchIn";
			//減速
			slower.slow();
			shield.status = "open";
			return true;
		}
	}else if(type == "end"){//放開時
		if(distance(x, y, slower.x, slower.y) < slower.r//在範圍內 解除標記
			|| slower.status == "touchOut"){//在範圍外 但從內往外移出過
			slower.status = "noTouch";
			//正常
			slower.normal();
			return true;
		}
	}
	return false;
}

//手指玩家技能
function onTouchSkill(x, y){//type = start move end
	if(!pauseFlag && startPlayFlag){
		if(distance(x, y, skillBtn.x, skillBtn.y) < skillBtn.r){
			if(player.invisiableTime < 190){
				skillBtn.start();
			}
		}
	}

}

//手指拖移主方法
function onTouchPlayer(x, y){
	if(player.status == "stop"){
		player.startX = x;
		player.startY = y;
		player.status = "move";
	}
/*
	toucher.touch(x, y);

	if(toucher.distance > 0){
		player.dx = Math.cos(Math.PI * toucher.ro / 180) * player.speed;
		player.dy = -Math.sin(Math.PI * toucher.ro / 180) * player.speed;
		x =toucher.touchX;
		y =toucher.touchY;
	}
*/
	var gapX = x - player.startX;
	var gapY = player.startY - y;

	//判斷有無改變方向
	if(player.lastX != null && player.lastY != null){
		var lastGapX = player.lastX - player.startX;
		var lastGapY = player.startY - player.lastY;
		
		if((gapX > 0 && gapX < lastGapX) || (gapX < 0 && gapX > lastGapX)){
			player.startX = player.lastX;//立刻修正
		}
		if((gapY > 0 && gapY < lastGapY) || (gapY < 0 && gapY > lastGapY)){
			player.startY = player.lastY;//立刻修正
		}
	}	

	//角度捨去
	if(gapX > -0.01 && gapX < 0.01){
		x = player.startX;
	}
	if(gapY > -0.01 && gapY < 0.01){
		y = player.startY;
	}
	
	//位移
	if(distance(player.startX, player.startY, x, y) > 0){
		var ro = degree(player.startX, player.startY, x, y);
		player.dx = Math.cos(Math.PI * ro / 180) * player.speed;
		player.dy = -Math.sin(Math.PI * ro / 180) * player.speed;
	}

	//紀錄上次位置
	player.lastX = x;
	player.lastY = y;
	
	//繪製方向儀
	toucher.move(x, y);

/*
	if(x > player.startX + 2){//往右
		if(x < player.lastToX){//停止
			player.startX = x;
		}else{
			player.move("r");
		}
	}else if(x < player.startX - 2){//往左
		if(x > player.lastToX){//停止
			player.startX = x;
		}else{
			player.move("l");
		}
	}else{
		player.move("stopX");
	}
	
	if(y > player.startY + 2){//往下
		if(y < player.lastToY){//停止
			player.startY = y;
		}else{
			player.move("b");
		}
	}else if(y < player.startY - 2){//往左
		if(y > player.lastToY){//停止
			player.startY = y;
		}else{
			player.move("t");
		}
	}else{
		player.move("stopY");
	}

	player.lastToX = x;
	player.lastToY = y;
*/
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
	var paush;
	var playBoardScale = 1;//縮放
	var playBoardWidth = 900;
	var playBoardHeight = playBoardWidth * (16 / 9);
	var time = 0;
	var scale = 0;
	var startPlayFlag = false;//開始遊戲
	var pauseFlag = false;//暫停
	var difficulty = 0;//難易度
	var maxStageNum = 3; //最大關卡數
	
	//物件類別
	var player
	var bricks = [];
	var balls = [];
	var attacks = [];
	var powers = [];
	var points = [];
	var fires = [];
	var backgrounds = [];
	var tips = [];
	var logs = [];//遊戲紀錄
	var score;
	var bgColor;//背景顏色設定
	var banner;//暫停顯示
	var toucher;//控制器
	var slower;//減速控制
	var skillBtn//玩家防護控制
	var shield;//玩家防護
	var controllers = [];
	
	init();
	

window.addEventListener("mousemove", function(e){
});
window.addEventListener("click", function(e){
	e.preventDefault();	
	var x = e.offsetX;
	var y = e.offsetY - document.documentElement.scrollTop;
});

window.addEventListener("touchstart", function(e){
	//e.preventDefault();
	/*for(t of e.changedTouches){
		var x = t.pageX;
		var y = t.pageY - document.documentElement.scrollTop;
		if(!onTouchSlower(x * (1 / scale), y * (1 / scale), "start")){
			onTouchPlayer(x * (1 / scale), y * (1 / scale));
		}
		
		onTouchPlayer(x * (1 / scale), y * (1 / scale));
	}*/
	
	
	var x = e.changedTouches[0].pageX;
	var y = e.changedTouches[0].pageY - document.documentElement.scrollTop;
	onTouchPlayer(x * (1 / scale), y * (1 / scale));

});

window.addEventListener("touchmove", function(e){
	e.preventDefault();
	/*for(t of e.changedTouches){
		var x = t.pageX;
		var y = t.pageY - document.documentElement.scrollTop;
		//if(!onTouchSlower(x * (1 / scale), y * (1 / scale), "move")){
		//	onTouchPlayer(x * (1 / scale), y * (1 / scale));
		//}
		onTouchPlayer(x * (1 / scale), y * (1 / scale));
	}*/
	
	var x = e.changedTouches[0].pageX;
	var y = e.changedTouches[0].pageY - document.documentElement.scrollTop;
	onTouchPlayer(x * (1 / scale), y * (1 / scale));
},{passive: false});

window.addEventListener("touchend", function(e){
	e.preventDefault();//防止click與touchend衝突
	var x = e.changedTouches[0].pageX;
	var y = e.changedTouches[0].pageY - document.documentElement.scrollTop;
	//玩家停止
	player.status = "stop";
	player.dx = 0;
	player.dy = 0;
	//繪製初始方向儀
	toucher.stop();
	//速度設正常
	onTouchSkill(x * (1 / scale), y * (1 / scale));

	//選單
	onTouchController(x * (1 / scale), y * (1 / scale));
});

//用來消除行動裝置瀏覽器拖移時的頁面飄移
window.addEventListener("scroll", function(e){
	var center = document.getElementById("center");
	if(document.documentElement.scrollTop > center.offsetTop + 100 || document.documentElement.scrollTop < center.offsetTop - 100){
		document.documentElement.scrollTop = center.offsetTop;
	}
});