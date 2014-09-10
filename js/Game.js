Game = function(game) {
	firebase = new Firebase("https://fiery-inferno-6891.firebaseio.com");

	localActions = null;
	remoteActions = firebase;
	local = null;
	remote = null;

	cursors = null;
	map = null;
	layer = null;
	bear = null;
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

function createOpponent(snapshot) {
	remote = new Bear(this.game, 900, 500);
	this.game.add.existing(remote);
	remoteActions = snapshot.ref();
};

Game.prototype = {

	restartGame: function() {
		this.game.state.start('Game');
	},

	create: function() {

		firebase.on('child_added', function(snapshot) {
	    	createOpponent(snapshot);
	    })

	    local = new Bear(this.game, 900, 500);
		this.game.add.existing(local);
		localActions = firebase.push(0);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	    this.game.physics.arcade.gravity.y = 300;

	    cursors = this.input.keyboard.createCursorKeys();

	    map = this.game.add.tilemap('map');
	    map.addTilesetImage('kenney');
	    layer = map.createLayer('Tile Layer 1');
	    this.physics.enable(layer, Phaser.Physics.ARCADE);
	    map.setCollisionBetween(1, 100000, true, 'Tile Layer 1');
	    layer.resizeWorld();

		localActions.on('value', function(snapshot) {
		  	if (snapshot.val() === 1 || snapshot.val() === 10) {
	        	local.runLeft();
	    	} else if (snapshot.val() === 2 || snapshot.val() === 20) {
	        	local.jump();
	    	} else if (snapshot.val() === 3 || snapshot.val() === 30) {
	        	local.runRight();
	    	} else if (snapshot.val() === 0 || snapshot.val() === 00) {
	        	local.stopNow();
	    	}
		});

	    remoteActions.on('value', function(snapshot) {
		  	if (snapshot.val() === 1 || snapshot.val() === 10) {
	        	remote.runLeft();
	    	} else if (snapshot.val() === 2 || snapshot.val() === 20) {
	        	remote.jump();
	    	} else if (snapshot.val() === 3 || snapshot.val() === 30) {
	        	remote.runRight();
	    	} else if (snapshot.val() === 0 || snapshot.val() === 00) {
	        	remote.stopNow();
	    	} 
		});

	},

	update: function() {

		this.game.physics.arcade.collide(local, layer);
		this.game.physics.arcade.collide(remote, layer);

        if (cursors.left.isDown) {

	        localActions.set(1);
	        localActions.set(10);

	    } else if (cursors.up.isDown && bear.body.onFloor()) {

	        localActions.set(2);
	        localActions.set(20);

	    } else if (cursors.right.isDown) {

	  		localActions.set(3);
	  		localActions.set(30);

	    } else {

	        localActions.set(0);
	        localActions.set(00);

	    }
	}
};