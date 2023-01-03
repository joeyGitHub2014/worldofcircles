ClassTest = function (game){
	console.log('Game--> ' +game);
 	this.game =  game;
 	this.messageBoard;
	this.score = 0;
	this.posY = 300;
 	this.scoreText ;
 	this.starReward=[];
 
}
ClassTest.prototype = {
	hi: function(){
		this.posY += 50;
		this.timePlayed = this.game.add.bitmapText(10, this.posY ,'moonFont','SOME TEXT ' , 16);
	},
	create : function(){
		console.log('create is excuted');
 	},
	update : function(){
		console.log('update is excuted');
		console.log(this.score);
		this.score += 1;
 	}
}
ClassTest.prototype.constructor =  ClassTest;
ClassTest.prototype.update = function () {
		console.log('PHASER update is excuted');
}


 


