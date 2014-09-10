
Preloader = function(game) {};

Preloader.prototype = {
	preload:function() {
        this.game.load.image('screenMainmenu', 'assets/screenMainmenu.png');
        this.game.load.image('singlePlayer', 'assets/singlePlayer.png');
        this.game.load.image('multiPlayer', 'assets/multiPlayer.png');
        this.game.load.image('instructions', 'assets/instructions.png');


		this.game.load.image('sky', 'assets/sky2.png');
    	this.game.load.image('kenney', 'assets/kenney.png');
    	this.game.load.tilemap('map', 'assets/final_elongated_course.json', null, Phaser.Tilemap.TILED_JSON);
    	this.game.load.spritesheet('snowFlakes', 'assets/snowflake.png', 128, 128);
        this.game.load.spritesheet('snow', 'assets/snow.png', 17, 17);
    	this.game.load.spritesheet('bear', 'assets/polar_sprite.png', 90, 50, 7);
        this.game.load.image('lakes', 'assets/lakes.png');
    	this.game.load.spritesheet('fish', 'assets/fish.png', 25, 45);
    	this.game.load.spritesheet('iceberg', 'assets/iceberg.png', 90, 62);
    	this.game.load.spritesheet('chaser', 'assets/sunKill6.png', 600, 700);
        this.game.load.spritesheet('pole', 'assets/northPole.png', 25, 200);
        this.game.load.spritesheet('warmth', 'assets/bigTransparentcircle.png', 1400, 700);

        this.game.load.audio('jump1', ['assets/jump1.mp3']);
        this.game.load.audio('fish', ['assets/fishslap1.mp3']);
        this.game.load.audio('music', ['assets/chibiNinja.mp3']);


	},

	create: function() {
		this.game.state.start('MainMenu');
        // var Firebase = require("firebase");
        // var playerLocations = new Firebase("https://fiery-inferno-6891.firebaseio.com");
	}
};
