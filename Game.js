
CircleGame.Game = function(game){
	this.orbCircleGroup;
	this.bubbleCircleGroup;
	this.totalEnmeyCircles;
	this.aniNeonCircleGroup;
	this.enmeyCircleGroup;
	this.music;
	this.hit;
	this.gameOverSnd;
	this.gameOver = false;
	this.secondsElapsed;
	this.timePlayed;
	this.timer;
	this.frameRate;
	this.frameRateMin;
	this.grow =  1;	
	this.hunter;
	this.startDia = 20;
 	this.messageBoard;
	this.totalScore;
 	this.star;
	this.filter;
	this.button;
	this.winnings = 0.0;
	this.winningRange = 0;
	this.winningText;
	this.t;
	this.enmey;
	this.setLevel=1;
	this.jackPotInPlay = false;
	this.utils= new Utils(game)

}
CircleGame.Game.prototype = {
 		// create function runs once
		create: function(){
				this.game.forceSingleUpdate = true;

				this.totalScore = 0;
			 	this.messageBoard = new MessageBoard(this);
  				minCircleSize =5;
				maxCircleSize = 50;
 				this.startDia = 20;
			   	this.physics.startSystem(Phaser.Physics.ARCADE);
 			    this.time.advancedTiming = true;
				this.secondsElapsed = 0;
				this.totalEnmeyCircles = 20;
				this.buildWorld();
				this.timer  = this.time.create(false);
				this.timePlayed = this.add.bitmapText(10, 70,'moonFont','Time Played = ' + this.secondsElapsed, 16);
				this.frameRate = this.add.bitmapText(10, 90,'moonFont','Frame Rate = '+ this.time.fps, 16)
				this.music = this.add.audio('game_audio');
				this.hit = this.add.audio('explosion_audio');
				this.gameOverSnd= this.add.audio('gameOver'); 
        		this.music.play('', 0, 1, true);
 				//this.frameRateMin = this.add.bitmapText(this.world.centerX-250, 100,'moonFont','Minimum Frame Rate = '+ this.time.fpsMin, 30)
				this.timePlayed.align = "center";
				this.timer.loop(1000, this.updateSeconds, this);
				this.timer.start();
				this.messageBoard.buildMessageBoard();
				this.messageBoard.setBounusType('STAR');
 				this.button = this.add.button(10, 110, 'button', this.setWinnings, this,0,0,0,0);
				this.winningText = this.add.bitmapText(15, 115,'moonFont','$'+this.winnings, 14);
			    this.messageBoard.sendMessage('HIT STARS! WIN REWARDS');
 	 	},
		 
	setWinnings : function (){
 		switch(this.winningRange) {
			case 0:
				this.winningRange = 1;
				this.winnings = 0.0;
				break;
			case 1:
				this.winningRange = 2;
				this.winnings =  this.math.roundTo(this.rnd.realInRange(.01, 2.0),-2);
 				break;
			case 2:
				this.winningRange = 3;
				this.winnings =  this.math.roundTo(this.rnd.realInRange(2.01, 5.0),-2);
 				break;
			case 3:
				this.winningRange = 4;
				this.winnings =  this.math.roundTo(this.rnd.realInRange(5.01, 10.0),-2);
 				break;	
			case 4:
				this.winningRange = 5;
				this.winnings =  this.math.roundTo(this.rnd.realInRange(10.01, 20.0),-2);
 				break;		
			case 5:
				this.winningRange = 6;
				this.winnings =  this.math.roundTo(this.rnd.realInRange(20.01, 50.0),-2);
 				break;		
			case 6:
				this.winningRange = 7;
				this.winnings =  this.math.roundTo(this.rnd.realInRange(50.01, 100.0),-2);
 				break;	
 			case 7:
				this.winningRange = 0;
				this.winnings =  this.math.roundTo(this.rnd.realInRange(100.01, 1000.0),-2);
 				break;
			default:
				break;
		}		 
		
		this.winningText.text =  '$'+this.winnings;
		
 	  },
  		updateSeconds: function(){
			this.secondsElapsed++;
  			this.timePlayed.text = 'Time Played = '+this.secondsElapsed;
    	},
		buildWorld: function(){
				//this.filter = new Phaser.Filter(this, null, CircleGame.fragmentSrc);
				//this.filter.setResolution(540, 960);
 			  	//this.star = this.add.sprite();
			 	//this.star.width = 540;
			 	//this.star.height = 960;
 			   // this.star.filters = [ this.filter ];
 				var im = this.add.image(0,0,'background');
				im.alpha = .3;
				//this.buildOrbNeonCircles()
 				this.enmey = new EnmeyCircles(this);
				this.enmeyCircleGroup = this.enmey.enmeyCircles(this.totalEnmeyCircles);

				var h = new Hunter(this);
				this.hunter = h.buildHunter();
   		},

		buildOrbNeonCircles: function(){
			this.aniNeonCircleGroup =  this.add.group();
			//enableBody: allows to interact with other body's and check for collision detection
			this.aniNeonCircleGroup.enableBody = true;
 			for(var i = 0; i<this.totalNeonCircles; i++){
				// binds circle to circleGroup
				var c = this.aniNeonCircleGroup.create(0,0, 'circleAnimation','animation instance 10000');
				c.anchor.setTo(0.5,0.5);
				var pos = this.utils.setPos(c);
				c.x = pos.x ;
				c.y = pos.y ;				 
      			c.animations.add('orbit', this.game.math.numberArray(1,60));
				c.animations.add('flicker', this.game.math.numberArray(61,65));
				c.animations.play('orbit',60, true);
				this.assignNeonCircleMovement(c);
  			}
		},

 		// update function always runs 
		update: function(){
			//this.filter.update();
			if (!this.gameOver){
				//this.neon = new Neon(this);
				//this.neonCircleGroup = this.neon.buildNeonCircles();
				//this.stars = new Stars(this);
				//this.starsCircleGroup = this.stars.buildStarsCircles();
				this.checkJackPot();
				this.hunter.update();
				this.hunter.x = this.input.activePointer.x;
				this.hunter.y = this.input.activePointer.y - this.hunter.r -80;
				for(var i = 0; i<this.totalEnmeyCircles; i++){
					var e = this.enmeyCircleGroup.getChildAt(i);
					var boundsA = e.getBounds();
					var boundsB = this.hunter.getBounds();
					if ( Phaser.Rectangle.intersects(boundsA, boundsB)){
						this.hitCircle(this.hunter, e);
					}
				}
 				this.frameRate.text = 'Frame Rate = '+ this.time.fps;
			}else{
 					this.neonCircleGroup.destroy();
 					this.starsCircleGroup.destroy();
 					this.enmeyCircleGroup.destroy();
					this.hunter.destroy();
 			}
 		},
		checkJackPot: function(){
			if (CircleGame.playType == 	'FREE'){

			}else{
				// if you have winnings to collect calculate
				if (this.winnings > 0){

				}  else {

				}
 			}

		},
		hitCircle: function (_h, _c){
			var minDistance = _h.r + _c.r;
 			var xDist = _c.x - _h.x;
			var yDist = _c.y - _h.y;
			var distance = Math.sqrt(xDist*xDist + yDist*yDist); 
			var explosion;
			if (distance < minDistance) {
				// Is it a star or Jackpot
				// if (moneyCircle){
				//}
				// else 
				if (_h.r >= _c.r){
					this.hit.play();
					this.totalScore = this.messageBoard.updateScore(50);  
 					this.hunter.key.clear();
     				this.hunter.destroy();
					this.startDia = this.startDia + 1;
					var r = this.startDia/2;
					var bmd;
					bmd = this.add.bitmapData(r*2,r*2);
					bmd.circle(r, r , r,'#ffffff');
					this.hunter = this.add.sprite(0, 0, bmd);
    				this.hunter.anchor.setTo(0.5 ); 
 					this.hunter.r = r;	
 					this.hunter.update();
					this.hunter.x = this.input.activePointer.x;
					this.hunter.y = this.input.activePointer.y - this.hunter.r -80;
					explosion = this.add.sprite(this.hunter.x -256/2, this.hunter.y-256/2, 'explosion1');
    				explosion.animations.add('exp');
   					explosion.animations.play('exp', 60, false);
					if (this.hunter.r > maxCircleSize/2 + 3 ){
 						maxCircleSize = maxCircleSize + 30;
						minCircleSize = minCircleSize + 25;
					}
					this.tweens.remove(_c.tween);
					this.utils.reshape(_c);
					var pos = this.utils.setPos(_c);
					_c.x = pos.x ;
					_c.y = pos.y ;
					this.enmey.assignCircleMovement(_c);
					if (this.setLevel<4){
						this.checkPoints();
					}
    			}else{
					explosion = this.add.sprite(this.input.activePointer.x -256/2, this.input.activePointer.y-256/2, 'explosion2');
    				explosion.animations.add('exp');
   					explosion.animations.play('exp', 60, false);
      				this.gameOverSnd.play();
					this.music.stop();
 					this.state.start('GameOver',true,false,this.totalScore);
   				}
 			}
   		},
 		shutdown: function(){
			console.log("shutting down state");
		},
		checkPoints: function(){
			
			switch(true){
				//send out neon
				case this.totalScore > 200 :
					this.setLevel = 2;
				break;
				case this.totalScore > 300 :
					this.setLevel = 3; 
				break;				
				case this.totalScore > 400 :
					this.setLevel = 4; 
				break;
				default:
				break;
			}
			
		}
  	}
 	
 