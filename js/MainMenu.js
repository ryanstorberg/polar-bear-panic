MainMenu = function(game) {};

MainMenu.prototype = {

	create: function() {

		this.add.sprite(80, 100, 'screen-mainmenu');
		this.startButton = this.add.button(180, 250, 'button-start', this.startGame, this, 1, 0, 2);

	},

	startGame: function() {

		this.game.state.start('Game');
		
	}

};