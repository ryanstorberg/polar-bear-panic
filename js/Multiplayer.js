Instructions = function(game) {};

Instructions.prototype = {
	create: function() {
		this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		label = this.game.add.text(400, 300, 
			'Run and jump ahead of global warming to the finish line \n using your arrow keys to dodge the flying fish, icebergs,\n and ice lakes. Press SPACE to go back to the MENU',{ fill: '#fff', align: 'center'});
		label.anchor.setTo(0.5, 0.5);
		},

	update: function() {
		if (this.spacebar.isDown)
			this.game.state.start('MainMenu');

	}
};

