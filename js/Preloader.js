
Preloader = function(game) {};

Preloader.prototype = {
	preload:function() {
        this.game.load.image('screen-mainmenu', 'assets/screen-mainmenu.png');
        this.game.load.image('button-start', 'assets/button-start.png');
		this.game.load.image('sky', 'assets/sky2.png');
    	this.game.load.image('kenney', 'assets/kenney.png');
    	this.game.load.tilemap('map', 'assets/final_elongated_course.json', null, Phaser.Tilemap.TILED_JSON);
    	this.game.load.spritesheet('snow', 'assets/snow.png', 17, 17);
    	this.game.load.spritesheet('bear', 'assets/polar_sprite.png', 90, 50, 7);
    	this.game.load.spritesheet('fish', 'assets/fish.png', 25, 45);
    	this.game.load.spritesheet('chaser', 'assets/sunshaftcombo.png', 200, 600, 2);
        this.game.load.spritesheet('pole', 'assets/northPole.png', 25, 200);
	},

	create: function() {
		this.game.state.start('MainMenu');
	}
};