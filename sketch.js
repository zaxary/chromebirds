const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
const boxes = [];
let bird;
let world, engine;
let mConstraint;
let slingshot;
const trojas = [];
let dotImg;
let boxImg;
let song;
let bkgImg;
var trjCounter = 0;
var timer;
var dmg = 0;
var virusTime;
let trjImg;
var counter = 0;
var seconds, minutes;
var x = 450;
var y = 300;
var i = 0;
var level = 30;
function preload() {
  dotImg = loadImage('dot.png');
  boxImg = loadImage('equals.png');
  bkgImg = loadImage('skyBackground.png');
  trjImg = loadImage("https://cdn.glitch.com/e5bb5639-016c-48c6-a0e6-cd1519067779%2Ftrojan.png?1596222184516");
}

function setup() {
  const canvas = createCanvas(800, 500);
   song = loadSound("https://cdn.glitch.com/e5bb5639-016c-48c6-a0e6-cd1519067779%2Fagbird.mp3?v=1596230903476");
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);
  
  bird = new Bird(150, 300, 25);

  slingshot = new SlingShot(150, 300, bird.body);
  
while (i < 3) {
    boxes[i] = new Box(x, y - i * 75, 84, 100);
    i = i+1;
  }
  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse,
  }

  // A fix for HiDPI displays
  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  
  timer = createP("Running Google Chrome...");
  setInterval(timeIt, 1000);
  virusTime = createP("Virus Respawn Increases Longer you Live");
}
function timeIt() {
    counter++;
  let lmnop = Math.round(Math.random() * 800);
      let qrst = Math.round(Math.random() * 500);
	minutes = floor(counter/60);
  seconds = counter % 60;
  
  // if (counter < 60)
  
  timer.html("Computer Run Time : " + minutes + ":" + seconds);
  if (counter % 5 == 0)
    {
      
      trojas[trjCounter] = new Trojan(lmnop, qrst, 84, 100);
      trjCounter++;
      dmg = Math.random();
    }
  
  if( (counter) > 30 && (counter) < 45)
    {
      level = 20;
    }
  else if ( counter > 45 && counter < 60)
    {
      level = 15;
    }
  else if ( counter > 60 && counter < 90)
    {
      level = 10;
    }
  else if ( counter > 90 && counter < 120)
    {
      level = 5;
    }
  else if (counter > 120)
    {
      level = 0;
    }
  if (level != 0){
  virusTime.html("Virus Repawn: " + level + " seconds")
  }
  if (level == 0)
    {
      virusTime.html("SUDDENT DEATH! VIRUS RESPAWN 0 SECONDS!!!!!")
    }
  if(seconds % level == 0){
   let j = i*2;
  while (j > i) {
    boxes[i] = new Box(x, y - i * 75, 84, 100);
    i = i+1;
  }
}

}
function keyPressed() {
  if (keyCode == TAB) {
   if (dmg < .10)
    {
      World.remove(world, bird.body);
      bird = new Bird(150, 300, 75);
    slingshot.attach(bird.body);
    }
    else{
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 25);
    slingshot.attach(bird.body);
    }
  }
  if (key == 's')
    {
      song.play();
    }

}

function mouseReleased() {
 /* let j = i;
  while (j > 0){
  var d = dist(bird.x, bird.y, box[j].x, box[j].y);
    if (d < bird.r + box[j].r){
      i = 0;
      while (i < 3) {
    boxes[i] = new Box(x, y - i * 75, 84, 100);
    i = i+1;
  }
    }
  j--;
  }
  */
 
  setTimeout(() => {
    slingshot.fly();
  }, 100);
  
}
  
function draw() {
  background(bkgImg);
  Matter.Engine.update(engine);
  ground.show();
  
  for (let box of boxes) {
    box.show();
  }
  for (let trojan of trojas) {
    trojan.show();
  }
  slingshot.show();
  bird.show();
  if(mouseX > 350 && mouseY > 299)
    {
      if (dmg > .75){
      while (trjCounter > -1)
        {
          trojas.splice(trjCounter,1);
          trjCounter--;
        }
    }
      
      let ttit = trjCounter + 15;
       if (dmg < .5)
        {
          if (trjCounter < ttit){
          trojas[trjCounter] = new Trojan(200, 300, 84, 100);
      trjCounter++;
          }
        }
    }
  /*checkGameStatus();

  function checkGameStatus() {
 // if () {
   //noLoop();
   // const scoreVal = (timer.html().substring(8));
    var countTwo = counter;
    var minutesTwo = floor(countTwo/60);
    var secondsTwo = countTwo % 60;
    timer.html('Game ended! Your survival time was : ' + minutesTwo + ":" + secondsTwo);
  }
  */
}