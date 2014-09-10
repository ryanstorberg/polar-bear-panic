Levels = function(game) {};
Levels.prototype = {
	create: function() {
		this.level1 = this.add.button(215, 230, 'level1', this.startGame, this, 1, 0, 2);
	},

	startGame: function() {
		this.game.state.start('Game');
	},
};