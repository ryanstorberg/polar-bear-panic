AboutUs = function(game) {};

AboutUs.prototype = {
	create: function() {
		this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		label = this.game.add.text(100, 150, 
			'Our names are Alex, Derek, Garrett, \n George, and Ryan.  We worked on and completed\n Polar Bear Panic over a week and a half\n period for our\n teams final project at Dev Boot Camp \n Thank you for playing our game!\n\n\n Level music by Eric Skiff\n\n\nPress SPACEBAR to return to the menu',{ fill: '#fff', align: 'center'});
		// label.anchor.setTo(0.5, 0.5);
		},

	update: function() {
		if (this.spacebar.isDown)
			this.game.state.start('MainMenu');

	}
};