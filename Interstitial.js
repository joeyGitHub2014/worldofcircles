
CircleGame.Interstitial  = function(game){
 	this.interstitialBg;
}

CircleGame.Interstitial.prototype={
	create:  function(){
 		this.interstitialBg = this.add.image(0,0, 'interstitialPageBg');
		this.interstitialBg.inputEnabled = true;
		this.interstitialBg.events.onInputDown.addOnce(this.startInterPlay, this);
     },
	startInterPlay:  function(){
		this.state.start('InterstitialPlay');
	 }
}