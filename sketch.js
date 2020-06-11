// module aliases
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var rows = 10;
var cols = 11;

function setup() {
  createCanvas(600,700);
  engine = Engine.create();
  world = engine.world;
  
  world.gravity.y = 3;
  
  var spacing = width / cols;
  for(var j = 0; j < rows; j++){
    for(var i = 0; i < cols + 1; i++){
      var x = i * spacing;
      if(j % 2 == 1){
        x += spacing / 2;
      }
      var y = spacing + j * spacing; 
      var p = new Plinko(x, y, 4);
      plinkos.push(p);
    }
  }
  var b = new Boundary(width/2, height+50, width, 100);
  bounds.push(b);
  for(var i = 0; i < cols + 1; i++){
    var x = i * spacing;
    var h = 100;
    var w = 10;
    var y = height - h / 2;
    var b = new Boundary(x, y, w, h);
    bounds.push(b);
  }
}
function newParticle(){
  var p = new Particle(300, 0 ,10);
  particles.push(p);
}
function draw() {
  if(frameCount % 60 == 0){
    newParticle();
  }
  background(51);
  Engine.update(engine);
  for(var i = 0; i < particles.length; i++){
    if(particles[i].isOffScreen()){
      particles[i].splice(i,1);
      World.remove(world, particles[i].body);
      i--;
    }
    particles[i].show();
  }
  for(var i = 0; i < plinkos.length; i++){
    plinkos[i].show();
  }
  for(var i = 0; i < bounds.length; i++){
    bounds[i].show();
  }
}