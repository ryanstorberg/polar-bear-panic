Game = function(game) {
	firebase = new Firebase("https://fiery-inferno-6891.firebaseio.com");
	cursors = null;
	map = null;
	layer = null;
	snow = null;
	bear = null;
	local = null;
	remote = null;
};

var Bear = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'bear', frame);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 600;
    this.body.maxVelocity = 1000;
    this.game.camera.follow(this);
    this.animations.add('left', [1, 2, 3, 4, 5, 6], 15, true);
    this.animations.add('right', [1, 2, 3, 4, 5, 6], 15, true);
    this.anchor.setTo(.5);
    this.body.drag.x = 800;
};

Bear.prototype = Object.create(Phaser.Sprite.prototype);
Bear.prototype.constructor = Bear;

Bear.prototype.runRight = function(){
  this.body.velocity.x = 450;
  this.scale.x = 1;
  this.animations.play('right');
};

Bear.prototype.runLeft = function(){
  this.body.velocity.x = -450;
  this.scale.x = -1;
  this.animations.play('left');
};

Bear.prototype.jump = function(){
    this.body.velocity.y = -600;
};

Bear.prototype.stopNow = function(){
    this.animations.stop();
    this.frame = 2;
};

Game.prototype = {

	restartGame: function() {
		this.game.state.start('Game');
	},

	create: function() {

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	    this.game.physics.arcade.gravity.y = 300;

	    cursors = this.input.keyboard.createCursorKeys();

	    playerLocations.on('child_added', function(snappychild) {
	    	otherPlayerLocation = snappychild.ref();
	    	foeBear = new Bear(this.game, 900, 500);
			this.game.add.existing(bear);
	    })

	    map = this.game.add.tilemap('map');
	    map.addTilesetImage('kenney');
	    layer = map.createLayer('Tile Layer 1');
	    this.physics.enable(layer, Phaser.Physics.ARCADE);
	    map.setCollisionBetween(1, 100000, true, 'Tile Layer 1');
	    layer.resizeWorld();

	    local = new Bear(this.game, 900, 500);
		this.game.add.existing(bear);
		playerLocation = playerLocations.push(0);

		remote = new Bear(this.game, 900, 500);
		this.game.add.existing(bear);

		localActions.on('value', function(snapshot) {
		  	if (snapshot.val() === 1) {
	        	local.runLeft();
	    	} else if (snapshot.val() === 2) {
	        	local.jump();
	    	} else if (snapshot.val() === 3) {
	        	local.runRight();
	    	} else if (snapshot.val() === 0) {
	        	local.stopNow();
	    	}
		});

	    remoteActions.on('value', function(snapshot) {
		  	if (snapshot.val() === 1) {
	        	remote.runLeft();
	    	} else if (snapshot.val() === 2) {
	        	remote.jump();
	    	} else if (snapshot.val() === 3) {
	        	remote.runRight();
	    	} else if (snapshot.val() === 0) {
	        	remote.stopNow();
	    	}
		});

	},

	update: function() {

		this.game.physics.arcade.collide(bear, layer);

        if (cursors.left.isDown) {

	        playerLocation.set(1);

	    } else if (cursors.up.isDown && bear.body.onFloor()) {

	        playerLocation.set(2);

	    } else if (cursors.right.isDown) {

	  		playerLocation.set(3);

	    } else {

	        playerLocation.set(0);

	    }
	}
};