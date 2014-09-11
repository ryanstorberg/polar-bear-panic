Levels = function(game) {};

Levels.prototype = {
	create: function() {
    this.add.sprite(150, 60, 'stageSelect');
		this.startButton1 = this.add.button(50, 133, 'map1', this.stageOne, this, 1, 0, 2);
    this.startButton2 = this.add.button(415, 183, 'map2', this.stageTwo, this, 1, 0, 2);
    this.startButton3 = this.add.button(50, 383, 'map3', this.stageThree, this, 1, 0, 2);
    this.startButton4 = this.add.button(415, 383, 'map4', this.stageFour, this, 1, 0, 2);
	},

	stageOne: function() {
		this.game.state.start('MapOne');
	},

  stageTwo: function() {
    this.game.state.start('MapTwo');
  },

  stageThree: function() {
    this.game.state.start('MapThree');
  },

  stageFour: function() {
    this.game.state.start('MapFour');
  },

};
