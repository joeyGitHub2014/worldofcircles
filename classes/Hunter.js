// JavaScript Document
var Hunter = function (game){
	this.game =  game;
	this.hunter;
	this.startDia = 20;
 }
Hunter.prototype = {
	  	buildHunter: function(){
				var bmd;
    	   	 	bmd = this.game.add.bitmapData(this.startDia,this.startDia);
				bmd.circle(this.startDia/2, this.startDia/2 , this.startDia/2,'#ffffff')
 				this.hunter = this.game.add.sprite(0, 0, bmd);
				this.game.physics.enable(this.hunter, Phaser.Physics.ARCADE);
 				this.hunter.anchor.setTo(0.5 ); 
 				this.hunter.r = this.startDia/2;
				this.hunter.update();
				this.hunter.x = this.game.input.activePointer.x;
				this.hunter.y = this.game.input.activePointer.y-40;
				return this.hunter;
    		}
	 
}

Hunter.prototype.constructor =  Hunter;




