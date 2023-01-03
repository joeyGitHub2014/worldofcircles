
CircleGame.LeaderBoard  = function(game){
		this.score1 = 0;
		this.score2 = 0;
		this.score3 = 0;
	}
CircleGame.LeaderBoard.prototype={
	init: function(score){
		if (score >  CircleGame.score1){
			this.score1 = score;
			CircleGame.score1 = score;
		}else if (score > CircleGame.score2 ){
			this.score2 = score;
			CircleGame.score2 = score;
		}else if (score > CircleGame.score3 ){
			this.score3 = score;
			CircleGame.score3 = score;			
		}
	
 	},
	create:  function(){
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();
				if(dd<10){
					dd='0'+dd
				} 
				if(mm<10){
					mm='0'+mm
				} 
				var today = dd+'/'+mm+'/'+yyyy;
				startBG = this.add.image(0,0, 'leaderBoardBg');
				startBG.inputEnabled = true;
				startBG.events.onInputDown.addOnce(this.startGame, this);
				startPrompt = this.add.bitmapText(this.world.centerX-205, this.world.centerY-400,'moonFont','Leader Board',50);
				this.add.bitmapText(this.world.centerX-170, this.world.centerY-200,'moonFont','1. '+this.score1+'  '+today,30);
				this.add.bitmapText(this.world.centerX-170, this.world.centerY-100,'moonFont','2. '+this.score2+'  '+today,30);
				this.add.bitmapText(this.world.centerX-170, this.world.centerY,'moonFont',    '3. '+this.score3+'  '+today,30);
     	},
	startGame:  function(){
 			this.state.start('Game');
 		}
}