// JavaScript Document
var MessageBoard = function (game){
	this.game =  game;
 	this.messageBoard;
	this.score = 0;
	this.winnings = 0.0;
	this.winningsText; 
 	this.scoreText ;
 	this.starReward=[];
	this.message;

}
MessageBoard.prototype = {
	buildMessageBoard: function(){
		this.buildWinings();
		this.buildBoardBack();
 		this.scoreText = this.game.add.bitmapText(this.game.world.centerX+115, 20,'moonFont','Score: ' +  this.score, 16);
 		if (CircleGame.playType == "MONEY"){
			 	this.winningsText = this.game.add.bitmapText(this.game.world.centerX-80, 55,'moonFont','Winnings $' +  this.winnings, 16);
 				this.starReward[0] = "$.05";
 				this.starReward[1] = "$.10";
 				this.starReward[2] = "$.25";
 				this.starReward[3] = "$.50";
 				this.starReward[4] = "$1";
 				this.starReward[5] = "$5";
 				this.starReward[6] = "$10";
 				this.starReward[7] = "$20";
				
		}else if   (CircleGame.playType == "FREE"){
			 	this.starReward[0] = 50;
 				this.starReward[1] = 100;
 				this.starReward[2] = 250;
 				this.starReward[3] = 500;
 				this.starReward[4] = 1000;
 				this.starReward[5] = 2500;
 				this.starReward[6] = 5000;
 				this.starReward[7] = 10000;
			
		}
  	},
	setBounusType : function (s){

		switch(s) {
			case 'STAR':
				this.game.add.image(5,2, 'starOrange');
				this.game.add.bitmapText(35, 10,'moonFont',""+this.starReward[0]  , 16);
				this.game.add.image(95,2, 'starRed');
				this.game.add.bitmapText(125, 10,'moonFont',""+this.starReward[1] ,16 );
 				this.game.add.image(180,2, 'starAqua');
				this.game.add.bitmapText(210, 10,'moonFont',""+this.starReward[2],16 );
				this.game.add.image(265,2, 'starYellow');
				this.game.add.bitmapText(295, 10,'moonFont',""+this.starReward[3],16 );
				this.game.add.image(5,25, 'starGreen');
				this.game.add.bitmapText(35, 35,'moonFont',""+this.starReward[4] , 16);
				this.game.add.image(95,25, 'starBlue');
				this.game.add.bitmapText(125, 35,'moonFont',""+this.starReward[5] , 16);
				this.game.add.image(180,25, 'starPink');
				this.game.add.bitmapText(210, 35,'moonFont',""+this.starReward[6] , 16);
				this.game.add.image(265,25, 'starPurple');	
				this.game.add.bitmapText(295, 35,'moonFont',""+this.starReward[7] , 16);
			break;
			case 'NEON':
 				break;
			case 'BUBBLE':
 				break;
			case 'ORB':
 				break;		
				
				}		 
	},
	updateScore : function (s){
			this.score += s;
			this.scoreText.text = 'Score: ' +  this.score;	
			return this.score;
	},
	updateWinnings : function (a){
			this.winnings += a;
			this.winningsText.text = 'Winnings $' +  this.winnings;	
			return this.winnings;
	},
	setAmounts : function (){
		
	},
	setFreeMoney : function (){

	},
	
	 buildBoardBack: function (){	
		var boardBack = this.game.add.graphics(0, 0);
 		// set a fill and line style
		boardBack.beginFill(0x000000,.9);
		boardBack.lineStyle(1, 0x9f06d2, 1);
		// draw a shape
		boardBack.moveTo(0,0);
		boardBack.lineTo(0, 50);
		boardBack.lineTo(this.game.world.width-1, 50);
		boardBack.lineTo(this.game.world.width-1, 0);
		boardBack.lineTo(0, 0);
		boardBack.endFill();
		boardBack.moveTo(this.game.world.centerX+105,0);
		boardBack.lineTo(this.game.world.centerX+105, 50);
		boardBack.moveTo(0,50);
		boardBack.lineTo(0,this.game.world.height-1);
		boardBack.lineTo(this.game.world.width-1,this.game.world.height-1);
		boardBack.lineTo(this.game.world.width-1,50);
	 },
	 
	 buildWinings: function (){	
		var winingBack = this.game.add.graphics(0, 0);
 		// set a fill and line style
		winingBack.beginFill(0x33cc33,1);
		winingBack.lineStyle(1, 0x9f06d2, 1);
		// draw a shape
		winingBack.moveTo(100,50);
		winingBack.lineTo(120, 70);
		winingBack.lineTo(this.game.world.width-120, 70);
		winingBack.lineTo(this.game.world.width-100, 50);
		winingBack.lineTo(100, 50);
		winingBack.endFill();
	 },

	sendMessage: function(m){
		this.message = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY,'moonFont',m, 30);
		this.message.scale.x = 0.05;
		this.message.scale.y = 0.05;
		this.message.anchor.x = Math.round(this.message.width * 0.5) / this.message.width;
		this.message.anchor.y = Math.round(this.message.height * 0.5) / this.message.height;
		this.game.physics.enable(this.message, Phaser.Physics.ARCADE);
		speed = 300;
 		t = this.game.add.tween(this.message.scale).to({x:1,y:1},700,Phaser.Easing.Elastic.InOut, true, 0);
		this.game.time.events.add(Phaser.Timer.SECOND * 3, this.fadeText, this);
		//t = this.game.add.tween(this.message).to({x:this.game.world.centerX,y:this.game.world.centerY},speed, Phaser.Easing.Bounce.InOut(5), true, 0);
		this.message.tween = t;
		//setTimeout(this.startNeonCircle(c), cdelay);
		//t.onStart.add(this.startCircle, this);
		//t.onComplete.add(this.stopMessage, this);
	},
	fadeText : function(){
		this.game.add.tween(this.message).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
		//this.game.add.tween(this.message.scale).to( {x:1,y:1 }, 500, Phaser.Easing.Linear.None, true);

	}
}

// Create background: Score,type of Jackpot
// Stars
// 
// Set the current bonus round

// Set Money or points

// Update score

// Update winning




