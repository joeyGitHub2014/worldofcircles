// JavaScript Document


CircleGame.HowToPlay  = function(game){
 	this.howTo;
	
	}

CircleGame.HowToPlay.prototype={
 		
 	create:  function(){
			this.howTo = this.add.image(0,0,'howToPlay');
			this.howTo.inputEnabled = true;
			this.howTo.events.onInputDown.addOnce(this.startMenu, this);
 	},
	startMenu:  function(){
			this.state.start('StartMenu');
  	}

}