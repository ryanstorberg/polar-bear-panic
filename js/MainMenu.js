MainMenu = function(game) {};
MainMenu.prototype = {
	create: function() {
		this.add.sprite(80, 100, 'screenMainmenu');
		this.startButton = this.add.button(215, 230, 'singlePlayer', this.startGame, this, 1, 0, 2);
		this.instructions = this.add.button(230, 300, 'instructions', this.startInstructions, this, 1, 0, 2);
		this.aboutUs = this.add.button(270, 370, 'aboutUs', this.startAboutUs, this, 1, 0, 2);
	},

	startGame: function() {
		this.game.state.start('Levels');
	},

	startInstructions: function() {
		this.game.state.start('Instructions');
	},

	startAboutUs: function() {
		this.game.state.start('AboutUs');
	},
};
