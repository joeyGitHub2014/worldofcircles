
minCircleSize =5;
maxCircleSize = 50;
EnmeyCircles = function (game){
	console.log('Game--> ' +game);
	this.totalEnmeyCircles;
	this.enmeyCircleGroup;
 	this.game =  game;

  }
EnmeyCircles.prototype = {
	
	enmeyCircles: function(totalCircles){
		this.enmeyCircleGroup =  this.game.add.group();
		this.enmeyCircleGroup.enableBody = true;
		this.enmeyCircleGroup.physicsBodyType = Phaser.Physics.ARCADE;
		for(var i = 0; i<totalCircles; i++){
			var dia =  this.game.rnd.integerInRange(maxCircleSize, minCircleSize);
			bmd= this.game.add.bitmapData(dia,dia);
 			var s = this.game.utils.getColor();
			var r = dia/2;
			bmd.circle(r, r, r, s );
			var e = this.game.add.sprite(0, 0, bmd);
			this.game.physics.enable(e, Phaser.Physics.ARCADE);
			e.anchor.setTo(0.5 )
			var pos = this.game.utils.setPos(e);
			e.x = pos.x ;
			e.y = pos.y ;	
			e.r = r;
			e.type = "ENMEY";
			this.enmeyCircleGroup.add(e);
			this.assignCircleMovement(e);
			var b = e.getBounds();
		}
 		return this.enmeyCircleGroup;
	},
	assignCircleMovement: function(c){
			var pos = this.game.utils.setPos(c);
  			speed = this.game.rnd.integerInRange(2000, 7000)
			cdelay = this.game.rnd.integerInRange(2000, 6000);
			t = this.game.add.tween(c).to({x:pos.x,y:pos.y},speed, Phaser.Easing.None, true, 0);
			c.tween = t;
			t.onComplete.add(this.stopCircle, this);	
		},
  		stopCircle: function(c) {
			this.game.utils.reshape(c);
			var pos = this.game.utils.setPos(c);
			c.x = pos.x;
			c.y = pos.y;
			this.assignCircleMovement(c);
		}


}
EnmeyCircles.prototype.constructor =  EnmeyCircles;
 

 


