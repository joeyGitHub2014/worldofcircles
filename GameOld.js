// JavaScript Document

	var minCircleSize =5;
	var maxCircleSize = 50;
	
CircleGame.Game = function(game){
	this.totalNeonCircles;
	this.neonCircleGroup;
	this.orbCircleGroup;
	this.bubbleCircleGroup;
	this.totalEnmeyCircles;
	this.aniNeonCircleGroup;
	this.enmeyCircleGroup;
	this.colors = ["#FF0000", "#B20000", "#FF3333", "#FF3333", "#FF3300" , "#CC2900" , "#FFFF00 ", "#FFFF80 "," #0000FF" , "#000099 ", 	
					"#6666FF" ," #33CC33" , "#70DB70" , "#1F7A1F" ,"#FF00FF" , "#FF4DFF" , "#800080" ,"#33CCFF" , "#85E0FF" , 
					"#1F7A99 ","#FF9900" , "#FFB84D" , "#995C00" ];
	this.colorLen = this.colors.length;
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
	this.winnings = 0;
	this.t;
	this.enmey;
}
CircleGame.Game.prototype = {
 		// create function runs once
		create: function(){
  			    this.totalScore = 0;
			 	this.messageBoard = new MessageBoard(this);
  				minCircleSize =5;
				maxCircleSize = 50;
 				this.startDia = 20;
			   	this.physics.startSystem(Phaser.Physics.ARCADE);
 			    this.time.advancedTiming = true;
				this.secondsElapsed = 0;
				this.totalNeonCircles=3;
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
 				//this.button = this.add.button(10, 110, 'button', this.actionOnClick, this,0,0,0,0);
				//this.button.onInputOver.add(this.over,this);
	 },
	 actionOnClick : function (){
 		 this.t.hi();
  	 },
	  
  		updateSeconds: function(){
			this.secondsElapsed++;
  			this.timePlayed.text = 'Time Played = '+this.secondsElapsed;
    		},
		buildWorld: function(){
				this.filter = new Phaser.Filter(this, null, CircleGame.fragmentSrc);
				this.filter.setResolution(540, 960);
 			  	this.star = this.add.sprite();
			 	this.star.width = 540;
			 	this.star.height = 960;
 			    this.star.filters = [ this.filter ];
 				var im = this.add.image(0,0,'background');
				im.alpha = .3;
				this.buildNeonCircles();
				//this.buildOrbNeonCircles()
				//this.enmeyCircles(this.totalEnmeyCircles);
				this.enmey = new Enmey(this);
				this.enmeyCircleGroup = this.enmey.enmeyCircles(this.totalEnmeyCircles);
				var h = new Hunter(this);
				this.hunter = h.buildHunter();
				
   		},
		buildNeonCircles: function(){
			this.neonCircleGroup =  this.add.group();
			//enableBody: allows to interact with other body's and check for collision detection
			this.neonCircleGroup.enableBody = true;
 			for(var i = 0; i<this.totalNeonCircles; i++){
				// binds circle to circleGroup
				var c = this.neonCircleGroup.create(0,0, 'neon' );
				c.anchor.setTo(0.5,0.5);
				var pos = this.setPos(c);
				c.x = pos.x ;
				c.y = pos.y ;				 
				this.assignNeonCircleMovement(c);
  			}
		},
		buildOrbNeonCircles: function(){
			this.aniNeonCircleGroup =  this.add.group();
			//enableBody: allows to interact with other body's and check for collision detection
			this.aniNeonCircleGroup.enableBody = true;
 			for(var i = 0; i<this.totalNeonCircles; i++){
				// binds circle to circleGroup
				var c = this.aniNeonCircleGroup.create(0,0, 'circleAnimation','animation instance 10000');
				c.anchor.setTo(0.5,0.5);
				var pos = this.setPos(c);
				c.x = pos.x ;
				c.y = pos.y ;				 
      			c.animations.add('orbit', this.game.math.numberArray(1,60));
				c.animations.add('flicker', this.game.math.numberArray(61,65));
				c.animations.play('orbit',60, true)
				this.assignNeonCircleMovement(c);
  			}
		},
		enmeyCircles: function(totalCircles){
			this.enmeyCircleGroup =  this.add.group();
			this.enmeyCircleGroup.enableBody = true;
  			this.enmeyCircleGroup.physicsBodyType = Phaser.Physics.ARCADE;
			for(var i = 0; i<totalCircles; i++){
 				var dia =  this.rnd.integerInRange(maxCircleSize, minCircleSize);
    	   	 	bmd= this.add.bitmapData(dia,dia);
				var n = this.rnd.integerInRange(0, 22);
				var s = this.colors[n];
				var r = dia/2;
 	 			bmd.circle(r, r, r, s );
 				var e = this.add.sprite(0, 0, bmd);
 				this.physics.enable(e, Phaser.Physics.ARCADE);
 				e.anchor.setTo(0.5 )
 				var pos = this.enmey.setPos(e);
				e.x = pos.x ;
				e.y = pos.y ;	
				e.r = r;
 				this.enmeyCircleGroup.add(e);
				this.enmey.assignCircleMovement(e);
				var b = e.getBounds();
   			}
 
		},
		assignNeonCircleMovement: function(c){
			var pos = this.setPos(c);
  			speed = this.rnd.integerInRange(2000, 7000)
			cdelay = this.rnd.integerInRange(2000, 6000);
			t = this.add.tween(c).to({x:pos.x,y:pos.y},speed, Phaser.Easing.None, true, 0);
			c.tween = t;
			setTimeout(this.startNeonCircle(c), cdelay); 
			//t.onStart.add(this.startCircle, this);	
			t.onComplete.add(this.stopNeonCircle, this);	
		},
		startNeonCircle: function(c){
 				c.animations.stop('flicker');
				c.animations.play('orbit',60, true);
		},
		stopNeonCircle: function(c){
				c.animations.stop('orbit');
				c.animations.play('flicker',60, true);
 				var pos = this.setPos(c);
				c.x = pos.x;
				c.y = pos.y;
				this.assignNeonCircleMovement(c);
		},
		assignCircleMovement: function(c){
			var pos = this.setPos(c);
  			speed = this.rnd.integerInRange(2000, 7000)
			cdelay = this.rnd.integerInRange(2000, 6000);
			t = this.add.tween(c).to({x:pos.x,y:pos.y},speed, Phaser.Easing.None, true, 0);
			c.tween = t;
			t.onComplete.add(this.stopCircle, this);	
		},
  		stopCircle: function(c){
  				this.reshape(c);
				var pos = this.setPos(c);
				c.x = pos.x;
				c.y = pos.y;
				this.assignCircleMovement(c);
		}, 	
 		// update function always runs 
		update: function(){
			this.filter.update();
			if (!this.gameOver){
				this.hunter.update();
				this.hunter.x = this.input.activePointer.x;
				this.hunter.y = this.input.activePointer.y - this.hunter.r -20;
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
 					this.enmeyCircleGroup.destroy();
					this.hunter.destroy();
 			}
 		},
		hitCircle: function (_h, _c){
			var minDistance = _h.r + _c.r;
 			var xDist = _c.x - _h.x;
			var yDist = _c.y - _h.y;
			var distance = Math.sqrt(xDist*xDist + yDist*yDist); 
			var explosion;
			if (distance < minDistance) {
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
					this.hunter.y = this.input.activePointer.y-this.hunter.r;
					explosion = this.add.sprite(this.input.activePointer.x -192/2, this.input.activePointer.y-192/2, 'explosion1');
    				explosion.animations.add('exp');
   					explosion.animations.play('exp', 60, false);
					if (this.hunter.r > maxCircleSize/2 + 3 ){
 						maxCircleSize = maxCircleSize + 30;
						minCircleSize = minCircleSize + 25;
					}
					this.tweens.remove(_c.tween);
					this.enmey.reshape(_c);
					var pos = this.enmey.setPos(_c);
					_c.x = pos.x ;
					_c.y = pos.y ;
					this.enmey.assignCircleMovement(_c);
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
		setPos: function (c){
				var x;
				var y;
				var rW = c.width/2;
				var rH = c.height/2;
				var topSide = [((this.rnd.frac() * this.world.width + rW)) - rW , -rW  ];
				var bottom  = [((this.rnd.frac() * this.world.width + c.width/2)) - rW , this.world.height + rW  ]; 
				var left    = [-rH  ,                 (this.rnd.frac()  * this.world.height + rH) - rH ]; 
				var right   = [this.world.width + rW  ,  (this.rnd.frac() * this.world.height + rH) - rH ]; 
				var sides = [topSide,bottom,left,right];
				var i = this.rnd.frac() * sides.length | 0;
 				var a = [];
				a = sides[i];
				x = a[0];
				y = a[1];
				return {x: x, 
						y: y};	
		},
		reshape: function(c){
				c.key.clear();
    			var bmd;
				var dia =  this.rnd.integerInRange(maxCircleSize,minCircleSize);
				var r = dia/2;
    	   	 	bmd= this.add.bitmapData(dia,dia);
				var n = this.rnd.integerInRange(0, 22);
				var s = this.colors[n];
	 			bmd.circle(r, r, r, s );
				c.loadTexture(bmd);
   				c.anchor.setTo(0.5 );
				c.r = r;
  		},
		shutdown: function(){
			console.log("shutting down state");
		}
		
  	}
 	
 