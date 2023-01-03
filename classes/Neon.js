
 Neon = function (game){
 	this.game =  game;
 	this.values = [.05,.10,.25,.50,1.00,5.00,10.00,20.00];
	this.totalNeonCircles = 3;
	this.neonCircleGroup;
   }
Neon.prototype = {
		buildNeonCircles: function(){
			this.neonCircleGroup =  this.game.add.group();
			//enableBody: allows to interact with other body's and check for collision detection
			this.neonCircleGroup.enableBody = true;
			this.neonCircleGroup.physicsBodyType = Phaser.Physics.ARCADE;
 			for(var i = 0; i<this.totalNeonCircles; i++){
				// binds circle to circleGroup
				var c = this.neonCircleGroup.create(0,0, 'neon' );
				c.anchor.setTo(0.5,0.5);
				var pos = this.game.utils.setPos(c);
				c.x = pos.x ;
				c.y = pos.y ;				 
				this.assignNeonCircleMovement(c);
  			}
			return this.neonCircleGroup;
		},
		assignNeonCircleMovement: function(c){
			var pos = this.game.utils.setPos(c);
  			speed = this.game.rnd.integerInRange(2000, 7000);
			cdelay = this.game.rnd.integerInRange(2000, 6000);
			t = this.game.add.tween(c).to({x:pos.x,y:pos.y},speed, Phaser.Easing.None, true, 0);
			c.tween = t;
			//setTimeout(this.startNeonCircle(c), cdelay);
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
 				var pos = this.game.utils.setPos(c);
				c.x = pos.x;
				c.y = pos.y;
				this.assignNeonCircleMovement(c);
		}

}
Neon.prototype.constructor =  Neon;
 

 


