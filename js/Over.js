Over = function(game) {};

Over.prototype = {
	create: function() {
		this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

		label = this.game.add.text(400, 300, 'GAME OVER\n\n\nPress ENTER to return to level select\nPress ESC to return to main menu',{ fill: '#fff', align: 'center'});
		label.anchor.setTo(0.5, 0.5);
	},

	update: function() {
		if (this.enter.isDown) {
			this.game.state.start('Levels');
		} else if (this.esc.isDown) {
			this.game.state.start('MainMenu');
		}


	},
};
