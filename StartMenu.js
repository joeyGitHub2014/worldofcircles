// JavaScript Document

CircleGame.StartMenu = function(game){
	this.startBG;
	this.startPrompt;
	this.howToPlay;
 	//this.gameSound
	
}

CircleGame.StartMenu.prototype={
		create:  function(){
			//this.gameSound = this.add.audio('');
			//startFree.events.onInputDown.addOnce(this.startGame('FREE'), this);
			//startMoney.events.onInputDown.addOnce(this.startGame('MONEY'), this);
			startBG = this.add.image(0,0, 'titlescreen');


			playForFree = this.add.image(this.world.centerX-150, -40, 'playForFree');
			playForMoney = this.add.image(this.world.centerX-192.5,this.world.height +80, 'playForMoney');
			playForFree.inputEnabled = true;
			playForMoney.inputEnabled = true;
			playForMoney.events.onInputDown.addOnce(this.startGameMoney, this);
			playForFree.events.onInputDown.addOnce(this.startGameFree, this);
			this.add.bitmapText(this.world.centerX-240, this.world.centerY-370,'moonFont','WORLD OF',70);
			this.add.bitmapText(this.world.centerX-180, this.world.centerY-300,'moonFont','CIRCLES',70);
		 	this.howToPlay = this.add.bitmapText(this.world.centerX-105, this.world.centerY+280,'moonFont','HOW TO PLAY',24);
			this.howToPlay.inputEnabled = true;
			this.howToPlay.events.onInputDown.addOnce(this.startHowToPlay, this);
			this.game.physics.enable(playForFree, Phaser.Physics.ARCADE);
			this.game.physics.enable(playForMoney, Phaser.Physics.ARCADE);
			t = this.game.add.tween(playForFree).to({x:this.world.centerX-150, y:this.world.centerY+100},1500,Phaser.Easing.Elastic.Out, true, 0);
			playForFree.tween = t;
			t = this.game.add.tween(playForMoney).to({x:this.world.centerX-192.5, y:this.world.centerY+180},1500,Phaser.Easing.Elastic.Out, true, 0);
			playForMoney.tween = t;

		},
		startGameMoney:  function(pointer){
			CircleGame.playType = 'MONEY';
			//this.gameSound.play();
			this.state.start('Game');
		},
		startGameFree:  function(pointer){
			CircleGame.playType = 'FREE';
 			this.state.start('Game');
		},
		startHowToPlay:  function(pointer){
 			this.state.start('HowToPlay');
		}
	
}