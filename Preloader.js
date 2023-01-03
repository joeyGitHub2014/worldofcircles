 
CircleGame.Preloader = function(game){
		this.preloadBar = null;
		this.titleText = null
		this.ready = false;
	};

CircleGame.Preloader.prototype = {
	preload:  function(){
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,'preloaderBar');
		// sets transform point to center of image
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(this.preloadBar);
		//this.titleText = this.add.image(this.world.centerX, this.world.centerY-220,'titleimage');
		//this.titleText.anchor.setTo(0.5,0.5);
		this.load.image('playForFree','images/playForFree.png');
		this.load.image('button','images/button.jpg');

		this.load.image('playForMoney','images/playForMoney.png');
 		this.load.image('titlescreen','images/startPage01.jpg');
		this.load.image('starBlue','images/starBlue.jpg');
		this.load.image('starGreen','images/starGreen.jpg');
		this.load.image('starRed','images/starRed.jpg');
		this.load.image('starOrange','images/starOrange.jpg');
		this.load.image('starPurple','images/starPurple.jpg');
		this.load.image('starAqua','images/starAqua.jpg');
		this.load.image('starYellow','images/starYellow.jpg');
		this.load.image('starPink','images/starPink.jpg');
		this.load.bitmapFont('moonFont','fonts/font.png','fonts/font.fnt' );
		this.load.image('background','images/starField.png');
		this.load.image('howToPlay','images/howToPlay.jpg');
		this.load.image('leaderBoardBg','images/leaderBoardBg.jpg');
		this.load.image('interstitialPageBg','images/interstitialPageBg.jpg');
		this.load.image('neon','images/neon.png');
		this.load.atlasXML('circleAnimation','images/sprites/graidentMask.png','images/sprites/graidentMask.xml');
   		this.load.spritesheet('explosion1', 'images/sprites/explosion4.png', 256, 256, 49);
		this.load.spritesheet('explosion2', 'images/sprites/explosion2.png', 256, 256, 49);
		//this.load.atlasXML('explosion1','images/sprites/explosion1.png','images/sprites/explosion1.xml');
		//this.load.atlasXML('explosion2','images/sprites/explosion2.png','images/sprites/explosion2.xml');
        this.load.audio('explosion_audio', 'audio/ToneWobble.mp3');
        this.load.audio('gameOver', 'audio/Game-Death.ogg');
        this.load.audio('game_audio', 'audio/Digital-Dew-Drops_v001.mp3');		
   	},
	
	create: function(){
		this.preloadBar.cropEnabled =false;
	},
	
	update: function(){
		//if(this.cache.isSoundDecoded('someSound')&& this.ready == false){
			this.ready = true;
			this.state.start('StartMenu');
		//}
	}

}