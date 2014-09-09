Over = function(game) {};

Over.prototype = {
	create: function() {
		this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		label = this.game.add.text(400, 300, 'GAME OVER\nPress SPACE to restart',{ fill: '#fff', align: 'center'});
		label.anchor.setTo(0.5, 0.5);
	},

	update: function() {
		if (this.spacebar.isDown) {
			this.game.state.start('Game');
		}
	}
};