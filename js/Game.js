Game = function(game) {
	var cursors;
	var sky;
	var map;
	var layer;
	var snow;
	var bear;
	var hardRain;
	var chaser;
	var pole;
  var warmth;
  var jumpSfx;
  var fishSfx;
};

var Lake = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'lakes');
  this.autoScroll(-200,0);

  this.game.physics.arcade.enableBody(this);
  this.body.collideWorldBounds = true;
}

Lake.prototype = Object.create(Phaser.TileSprite.prototype);
Lake.prototype.constructor = Lake;

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

Bear.prototype.stop = function(){
    this.animations.stop();
    this.frame = 0;
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

var Iceberg = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'iceberg', frame);
    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 600;
    this.body.maxVelocity = 0;
    this.physicsBodyType = Phaser.Physics.ARCADE;
};


Iceberg.prototype = Object.create(Phaser.Sprite.prototype);
Iceberg.prototype.constructor = Iceberg;

Game.prototype = {

	restartGame: function() {
		this.game.state.start('Game');
	},

	makeSnow: function(object) {
		object.width = this.world.width;
		object.minParticleScale = 0.1;
		object.maxParticleScale = 0.5;
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

	chase: function(object){
		this.game.physics.enable(object, Phaser.Physics.ARCADE);
		object.body.collideWorldBounds = true;
	},

  warm: function(object){
    this.game.physics.enable(object, Phaser.Physics.ARCADE);
    object.body.collideWorldBounds = true;
  },

	create: function() {

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 300;

    cursors = this.input.keyboard.createCursorKeys();

    jumpSfx = this.game.add.audio('jump1');
    fishSfx = this.game.add.audio('fish');

    sky = this.add.image(0, 0, 'sky');
    sky.fixedToCamera = true;


    map = this.game.add.tilemap('map');
    map.addTilesetImage('kenney');
    layer = map.createLayer('Tile Layer 1');
    this.physics.enable(layer, Phaser.Physics.ARCADE);
    map.setCollisionBetween(1, 100000, true, 'Tile Layer 1');
    layer.resizeWorld();

    this.bear = new Bear(this.game, 900, 500);
    this.game.add.existing(this.bear);

    this.lake = new Lake(this.game, 0, 565, 12600, 70);
    this.game.add.existing(this.lake);

    snowFlakes = this.add.emitter(this.world.centerX, 0, 1000);
    snowFlakes.makeParticles('snowFlakes');
    this.makeSnow(snowFlakes);

    snow = this.add.emitter(this.world.centerX, 0, 1000);
    snow.makeParticles('snow');
    this.makeSnow(snow);

    hardRain = this.add.emitter(this.world.centerX, 0, 100);
    this.makeRain(hardRain);

    iceBergs = this.game.add.group();
    iceBergs.enableBody = true;
    iceBergs.physicsBodyType = Phaser.Physics.ARCADE;

    // for (var i = 0; i < 1; i++){
    iceBergs.add(new Iceberg(this.game, 1475, 50));
    iceBergs.add(new Iceberg(this.game, 2350, 50));
    iceBergs.add(new Iceberg(this.game, 3250, 50));
    iceBergs.add(new Iceberg(this.game, 4550, 50));
    iceBergs.add(new Iceberg(this.game, 5250, 50));
    iceBergs.add(new Iceberg(this.game, 5650, 50));
    iceBergs.add(new Iceberg(this.game, 6250, 50));
    iceBergs.add(new Iceberg(this.game, 6850, 50));
    iceBergs.add(new Iceberg(this.game, 9050, 50));
    iceBergs.add(new Iceberg(this.game, 10450, 50));
    // }

    chaser = this.add.sprite(0, 0, 'chaser');
    this.chase(chaser);

    warmth = this.add.sprite(0,0, 'warmth');
    this.warm(warmth);

    pole = this.add.sprite( 12250, 200, 'pole');
    this.game.physics.enable(pole, Phaser.Physics.ARCADE);
	},

	update : function() {
		var playerLocations = new Firebase("https://fiery-inferno-6891.firebaseio.com");

		this.game.physics.arcade.collide(this.bear, layer);
    this.game.physics.arcade.collide(this.bear, hardRain);
    this.game.physics.arcade.collide(pole, layer);
    this.game.physics.arcade.collide(layer, iceBergs);
 
    globalWarmingSpeed = 300;

    chaser.body.velocity.x = globalWarmingSpeed;
    warmth.body.velocity.x = globalWarmingSpeed;

    if (this.game.physics.arcade.collide(this.bear, hardRain)) {
      fishSfx.play('',0,1,false,false);
    }

      if (this.game.physics.arcade.overlap(this.bear, iceBergs)) {
        this.bear.body.velocity.x = -800;
      }

      if (this.game.physics.arcade.overlap(this.bear, this.lake)) {
        Bear.prototype.runRight = function(){
          this.body.velocity.x = 165;
          this.scale.x = 1;
          this.animations.play('right');
        };
        Bear.prototype.runLeft = function(){
          this.body.velocity.x = -165;
          this.scale.x = -1;
          this.animations.play('left');
        };
        Bear.prototype.jump = function(){
          this.body.velocity.y = -375;
        };
      } else {
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
      }

      if (this.game.physics.arcade.overlap(this.bear, chaser)) {
      	this.bear.die();
      }

      if (this.game.physics.arcade.overlap(this.bear, pole)) {
      	this.bear.win();
      }

    if (cursors.left.isDown) {
      if (this.game.physics.arcade.collide(this.bear, iceBergs) === true){
      }

      this.bear.runLeft();

    } else if (cursors.right.isDown) {
      if (this.game.physics.arcade.collide(this.bear, iceBergs) === true){
      }

      this.bear.runRight();

    } else {
        this.bear.stop();
    }

    if (cursors.up.isDown && this.bear.body.onFloor()) {
        this.bear.jump();
        jumpSfx.play('',0,1,false,false);
    }
	}
};
