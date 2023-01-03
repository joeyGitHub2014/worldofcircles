// JavaScript Document


CircleGame.InterstitialPlay  = function(game){
	this.done;
	this.interstitialBg;
	this.hit = 0;
	this.timeLeft = 10;
	this.numCircles =  10;
	this.timeText
 	this.hitText;
	this.timer;
	this.threeCircleGroup = null;
 	this.hunter=null;
	this.colors = ["#FF0000", "#B20000", "#FF3333", "#FF3333", "#FF3300" , "#CC2900" , "#FFFF00 ", "#FFFF80 "," #0000FF" , "#000099 ", 	
					"#6666FF" ," #33CC33" , "#70DB70" , "#1F7A1F" ,"#FF00FF" , "#FF4DFF" , "#800080" ,"#33CCFF" , "#85E0FF" , 
					"#1F7A99 ","#FF9900" , "#FFB84D" , "#995C00" ];
	}

CircleGame.InterstitialPlay.prototype={
	
	create:  function(){
		this.done = false;
 		this.physics.startSystem(Phaser.Physics.ARCADE);
 		var im = this.add.image(0,0,'background');
		var h = new Hunter(this);
		this.messageBoard = new MessageBoard(this);
		this.messageBoard.buildBoardBack();
 	  	this.timeText = this.game.add.bitmapText(this.game.world.centerX+115, 20,'moonFont','Time left: ' +  this.timeLeft, 22 );
		this.hitText = this.game.add.bitmapText(this.game.world.centerX-180, 20,'moonFont','Number of hits: ' +this.hit, 22);
		this.timer  = this.time.create(false);
		this.timer.loop(1000, this.updateTime, this);
		this.timer.start();
 		this.hunter = h.buildHunter();
		this.enmeyCircles();
	 },
	checkHits : function (){
		this.hit += 1;
		this.hitText.text = 'Number of hits : ' +  this.hit;
		if (this.hit == 3){
		  this.done = true;
		  this.timer.stop();
 		  //this.threeCircleGroup.destroy();
		  //this.hunter.destroy();
		  this.hit = 0;
		  this.timeLeft = 10;
		  this.state.start('Game');
		}
 	},
	updateTime : function (){
		this.timeLeft -= 1;
		this.timeText.text = 'Time left: '  +  this.timeLeft;
		if ((this.timeLeft == 0 ) && 	(this.hit < 3)){
			this.done = true;
			//this.threeCircleGroup.destroy();
		    //this.hunter.destroy();
			this.timer.stop();
			this.hit = 0;
			this.timeLeft = 10;
			this.state.start('StartMenu');
		}
 	},		
	update: function(){
 		if ( !this.done && this.hit < 3 ){
			this.hunter.update();
			this.hunter.x = this.input.activePointer.x;
			this.hunter.y = this.input.activePointer.y - this.hunter.r -80;
			for(var i = 0; i< this.numCircles; i++){
				var e = this.threeCircleGroup.getChildAt(i);
				var boundsA = e.getBounds();
				var boundsB = this.hunter.getBounds();
				if ( Phaser.Rectangle.intersects(boundsA, boundsB)){
					this.hitCircle(this.hunter, e);
				}
			}
		}else{
 		  //this.threeCircleGroup.destroy();
		 // this.hunter.destroy();
		}
	},
	enmeyCircles: function(){
		this.threeCircleGroup =  this.add.group();
		this.threeCircleGroup.enableBody = true;
		this.threeCircleGroup.physicsBodyType = Phaser.Physics.ARCADE;
		for(var i = 0; i< this.numCircles; i++){
			var dia =  this.rnd.integerInRange(7, 20);
			bmd= this.add.bitmapData(dia,dia);
			var n = this.rnd.integerInRange(0, 22);
			var s = this.colors[n];
			var r = dia/2;
			bmd.circle(r, r, r, s );
			var e = this.add.sprite(0, 0, bmd);
			this.physics.enable(e, Phaser.Physics.ARCADE);
			e.anchor.setTo(0.5 )
			var pos = this.setPos(e);
			e.x = pos.x ;
			e.y = pos.y ;	
			e.r = r;
			this.threeCircleGroup.add(e);
			this.assignCircleMovement(e);
			var b = e.getBounds();
		}
	},
	assignCircleMovement: function(c){
			var pos = this.setPos(c);
  			speed = this.rnd.integerInRange(1000, 3000);
			t = this.add.tween(c).to({x:pos.x,y:pos.y},speed, Phaser.Easing.None, true, 0);
			c.tween = t;
			t.onComplete.add(this.stopCircle, this);	
		},
  		stopCircle: function(c){
 				var pos = this.setPos(c);
				c.x = pos.x;
				c.y = pos.y;
				this.assignCircleMovement(c);
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
		hitCircle: function (_h, _c){
			var minDistance = _h.r + _c.r;
 			var xDist = _c.x - _h.x;
			var yDist = _c.y - _h.y;
			var distance = Math.sqrt(xDist*xDist + yDist*yDist); 
 			if (distance < minDistance) {
				this.tweens.remove(_c.tween);
				var pos = this.setPos(_c);
				_c.x = pos.x ;
				_c.y = pos.y ;
				this.assignCircleMovement(_c);
				this.checkHits()
     		} 
    	}
	
}