
var game = new Phaser.Game(800, 460, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

	game.load.image('dead', "assets/bullFighting/dead.png");
	game.load.image('arena', "assets/bullFighting/arena.png");
    game.load.spritesheet('bull', 'assets/bullFighting/bull.png', 44, 32);
	
	game.load.image('flag', 'assets/bullFighting/flag.png');
	game.load.spritesheet('waveFlag', 'assets/bullFighting/redflag.png', 32, 32);
	
}

var flag = null;
var bull;
var tween;
var counter = 0;
var lock;
var initialDistance;
var points;
var totalPoints = 0;
var alpha = 0;	



function create() {
	this.arena = game.add.image(0,0,'arena');
    bull = game.add.sprite(32, 32, 'bull');
	bull.animations.add('runLeft', [0,1,2,3], 8, true);
	bull.animations.add('runRight', [4,5,6,7], 8, true);
	


    bull.anchor.setTo(0.5, 0.5);


	
		game.input.onDown.add(moveBull, this);
		game.input.onDown.add(setFlag, this);
	
    
	
	
//	this.game.time.advancedTiming = true;
	this.distance = this.game.add.text(
	20, 20, '', { font: '20px Arial', fill: '#ffffff' })
	this.points = this.game.add.text(
	380, 0, '', {font: '30px Arial', fill: '#ffffff'})


}


function update(){
    if (flag != null) {
        //this.distance.setText("Score: " + totalPoints + '\n' + -bull.rotation + "radians" + "\n initial distance " + initialDistance);
		this.distance.setText("Score: " + totalPoints);

	
	}

	

	

	if(game.physics.arcade.distanceToPointer(bull,flag)< 20 && initialDistance != null){
		
		this.dead = game.add.image(0,0,'dead');
		this.gored = this.game.add.text(
		210, 160, '', {font: '42px Arial', fill: '#ffffff'})
		this.gored.setText("You failed to dodge! \nYour score is "+ totalPoints +"\nClick to play again!");
		if(totalPoints > localStorage.getItem("highscore")){
			localStorage.setItem("highscore", totalPoints);
		}
		
		
		
		
		
		
		totalPoints = 0;
		counter = 0;
		this.game.paused = true;
		game.input.onDown.add(restart, this);
	
		
		
	}
		if(bull.rotation < Math.PI/2 && bull.rotation > -Math.PI/2){
			bull.animations.play('runLeft');
		}
		else{
			bull.animations.play('runRight');
		}
	
}

function moveBull (pointer) {

		if (tween && tween.isRunning)
		{
			tween.stop();

		}

		
		bull.rotation = game.physics.arcade.angleToPointer(bull, pointer);

		
		if(flag != null){
			flag.rotation = game.physics.arcade.angleToPointer(bull, pointer);
		}
		

		//  300 = 300 pixels per second = the speed the bull will move at, regardless of the distance it has to travel
		
			var duration = (game.physics.arcade.distanceToPointer(bull, pointer)* 1000/(100+counter));
			initialDistance = game.physics.arcade.distanceToPointer(bull, pointer);
		
			

		

		tween = game.add.tween(bull).to({ x: pointer.x + 50*Math.cos(bull.rotation), y: pointer.y+50*Math.sin(bull.rotation) }, duration, Phaser.Easing.Linear.None, true);
	}


function setFlag (pointer) {
	if(flag != null){

				
		points = Math.floor(Math.max(0,(300-initialDistance)*counter/100));
		this.points.setText("+" + Math.floor(points));
		totalPoints += points;
		this.points.fill = "rgba(255,255,255,1)";
//		this.points.x = flag.x;
//		this.points.y = flag.y;
		
		game.time.events.add(Phaser.Timer.SECOND * 0.1, removePointsText, this).autoDestroy = true;
	}	

		if(flag == null){
			flag = game.add.sprite(32, 32, 'flag');
			flaggy = game.add.sprite(32,32, 'waveFlag');
			flaggy.animations.add('wave', [0,1,2,3], 8, true);
			flaggy.animations.play('wave');
			flag.anchor.setTo(0.5, 0.5);
					flag.rotation = game.physics.arcade.angleToPointer(bull, pointer);
					
			
		}
			flag.x = pointer.x;
			flag.y = pointer.y;
			flaggy.x = flag.x-15;
			flaggy.y = flag.y-15;
			counter += Math.floor((Math.random() * 50) + 0); 
}

function removePointsText(){
	this.points.fill = "rgba(255,255,255,0.7)";
			game.time.events.add(Phaser.Timer.SECOND * 0.05, removePointsText2, this).autoDestroy = true;

}
function removePointsText2(){
	this.points.fill = "rgba(255,255,255,0.3)";
			game.time.events.add(Phaser.Timer.SECOND * 0.05, removePointsText3, this).autoDestroy = true;

}
function removePointsText3(){
	this.points.fill = "rgba(255,255,255,0.0)";
}

function restart(){
	this.game.paused = false;
	this.dead.x = 999;
	this.gored.x = 999;

	
	
			
}
