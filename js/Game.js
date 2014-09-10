Game = function(game) {
	cursors = null;
	sky = null;
	map = null;
	layer = null;
	snow = null;
	bear = null;
	hardRain = null;
	iceberg = null;
	chaser = null;
	pole = null;
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

Bear.prototype.die = function(){
	this.game.add.text(this.position.x, 300, 'YOU DIED!\n    :(', { fill: '#ffffff' });
	this.kill();
	this.game.state.start("Over");
};

Bear.prototype.win = function(){
    this.game.add.text(this.position.x, 300, 'You Made It!\n    :)', { fill: '#ffffff' });
    this.game.state.start("Over");
};

Game.prototype = {

	restartGame: function() {
		this.game.state.start('Game');
	},

	makeSnow: function(object) {
		object.makeParticles('snow');
		object.width = this.world.width;
		object.minParticleScale = 0.4;
		object.maxParticleScale = 0.8;
		object.setYSpeed(300, 500);
		object.setXSpeed(-500, -1000);
		object.minRotation = 0;
		object.maxRotation = 0;
		object.start(false, 1600, 5, 0);
	},

	makeRain: function(object) {
		this.physics.enable(object, Phaser.Physics.ARCADE)
		object.width = this.world.width;
		object.makeParticles('fish');
		object.setYSpeed(300, 500);
		object.setXSpeed(-500, -1000);
		object.minRotation = 360;
		object.maxRotation = 90;
		object.start(false, 1600, 5, 0);
	},

	chase: function(object) {
		object.animations.add('chase');
		object.animations.play('chase', 7, true);
		this.game.physics.enable(object, Phaser.Physics.ARCADE);
		object.body.collideWorldBounds = true;
	},

	create: function() {

		playerLocations = new Firebase("https://fiery-inferno-6891.firebaseio.com");

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	    this.game.physics.arcade.gravity.y = 300;

	    cursors = this.input.keyboard.createCursorKeys();

	    sky = this.add.image(0, 0, 'sky');
	    sky.fixedToCamera = true;

	    map = this.game.add.tilemap('map');
	    map.addTilesetImage('kenney');
	    layer = map.createLayer('Tile Layer 1');
	    this.physics.enable(layer, Phaser.Physics.ARCADE);
	    map.setCollisionBetween(1, 100000, true, 'Tile Layer 1');
	    layer.resizeWorld();

		bear = new Bear(this.game, 900, 500);
		this.game.add.existing(bear);
		playerLocation = playerLocations.push(0);

		snow = this.add.emitter(this.world.centerX, 0, 1000);
	    this.makeSnow(snow);

	    hardRain = this.add.emitter(this.world.centerX, 0, 100);
	    this.makeRain(hardRain);

	    chaser = this.add.sprite(0, 0, 'chaser');
	    this.chase(chaser);

	    pole = this.add.sprite( 11715, 200, 'pole');
	    this.game.physics.enable(pole, Phaser.Physics.ARCADE);

	},

	createBear: function() {
		playerLocations.once('child_added', function(childSnapshot) {
			foe = childSnapshot.ref();
			foeBear = new Bear(this.game, 900, 500);
			if (foeBear !== undefined) {
				this.game.add.existing(foeBear);
			}
			openSockets();
		});
	},

	openSockets: function() {
		playerLocation.on('value', function(snapshot) {

		  	if (snapshot.val() === 1) {
	        	bear.runLeft();

	    	} else if (snapshot.val() === 2) {
	        	bear.jump();

	    	} else if (snapshot.val() === 3) {
	        	bear.runRight();

	    	} else if (snapshot.val() === 0) {
	        	bear.stopNow();

	    	}

		});

	    foe.on('value', function(snapshot) {
			if (snapshot.val() === 1) {
	        	foeBear.runLeft();
	    	} else if (snapshot.val() === 2) {
	        	foeBear.jump();
	    	} else if (snapshot.val() === 3) {
	        	foeBear.runRight();
	    	} else if (snapshot.val() === 0) {
	        	foeBear.stopNow();
	        }
	    });
	},

	update: function() {

		this.game.physics.arcade.collide(bear, layer);
	    this.game.physics.arcade.collide(bear, hardRain);
	    this.game.physics.arcade.collide(pole, layer);

	    chaser.body.velocity.x = 0;

        if (this.game.physics.arcade.overlap(bear, chaser)) {
        	bear.die();
        }

        if (this.game.physics.arcade.overlap(bear, pole)) {
        	bear.win();
        }

        if (cursors.left.isDown) {

	        playerLocation.set(1);

	    } else if (cursors.up.isDown && bear.body.onFloor()) {

	        playerLocation.set(2);

	    } else if (cursors.right.isDown) {

	  		playerLocation.set(3);

	    } else {

	        playerLocation.set(0);

	    }

	    this.createBear();

	}
};