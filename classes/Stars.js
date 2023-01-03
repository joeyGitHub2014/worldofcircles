minCircleSize =5;
maxCircleSize = 50;
 Stars = function (game){
 	this.starsGroup;
 	this.game =  game;
 	this.colors = ["#00000","#000000","#000000","#000000","#bbbbbb","#cccccc","#dddddd","#eeeeee"];
	this.values = [.05,.10,.25,.50,1.00,5.00,10.00,20.00];

 }
Stars.prototype = {
	
	buildStarsCircles: function(){
		this.starsGroup =  this.game.add.group();
		this.starsGroup.enableBody = true;
		this.starsGroup.physicsBodyType = Phaser.Physics.ARCADE;
		for(var i = 0; i<8; i++){
			var dia =  this.game.rnd.integerInRange(maxCircleSize, minCircleSize);
			bmd = this.game.add.bitmapData(dia,dia);
			var n = this.game.rnd.integerInRange(0, 1);
			var s = this.colors[i];
			var r = dia/2;
			bmd.circle(r, r, r, s );
			var e = this.game.add.sprite(0, 0, bmd);
			this.game.physics.enable(e, Phaser.Physics.ARCADE);
			e.anchor.setTo(0.5 );
			var pos = this.game.utils.setPos(e);
			e.x = pos.x ;
			e.y = pos.y ;	
			e.r = r;
			e.type = "STAR";
			e.value = this.values[i];
			this.starsGroup.add(e);
			this.assignCircleMovement(e);
			var b = e.getBounds();
		}
		 return this.starsGroup;

	},
	assignCircleMovement: function(c){
			var pos = this.game.utils.setPos(c);
  			speed = this.game.rnd.integerInRange(2000, 7000)
			cdelay = this.game.rnd.integerInRange(2000, 6000);
			t = this.game.add.tween(c).to({x:pos.x,y:pos.y},speed, Phaser.Easing.None, true, 0);
			c.tween = t;
			t.onComplete.add(this.stopCircle, this);	
		},
  	stopCircle: function(c){
				//this.game.util.reshape(c);
				var pos = this.game.utils.setPos(c);
				c.x = pos.x;
				c.y = pos.y;
				this.assignCircleMovement(c);
		}

}
Stars.prototype.constructor =  Stars;
 

 


