// JavaScript Document


CircleGame.GameOver = function(game){

	this.startBG;
	this.startPrompt;
	this.score;
}

CircleGame.GameOver.prototype={
	init: function(score){
		this.score = score;
	}, 		
	
	create:  function(){
			if (CircleGame.playType == "FREE"){
				this.state.start('LeaderBoard',true,false,this.score);

			}else{
				this.state.start('Interstitial');
			}
     	}


}