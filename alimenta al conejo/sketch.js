const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var rope;
var fruit;
var fruit_restriction;
var rabImage;
var melonImage;
var BK;
var rabbit;
var cutImg; 
var blink;
var eat;
var sad;
var blow;

var airS; 
var eatS;
var Bk_Sound;
var sadS;
var cutting;



function preload(){
rabImage= loadImage("Rabbit-01.png");
melonImage= loadImage("melon.png");
BK= loadImage("bkg.jpg");
blow=loadImage("blower.png");

//cargando sonidos 
eatS= loadSound("eating_sound.mp3");
sadS= loadSound("sad.wav");
airS= loadSound("air.wav");
Bk_Sound=loadSound('sound1.mp3');
cutting= loadSound("rope_cut.mp3");
//cutting= loadSound("cutting.mp3");

//cargando animaciones
blink= loadAnimation("blink_1.png","blink_2.png","blink_3.png");
blink.playing=true;
eat= loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
eat.playing=true;
eat.looping=false;
sad= loadAnimation("sad_1.png","sad_2.png","sad_3.png");
sad.playing=true;
sad.looping=false;

}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  Bk_Sound.play();
  engine = Engine.create();
  world = engine.world;
  rabbit= createSprite(250,600,50,50); //x,y,an,al
  rabbit.addImage(rabImage);
  rabbit.scale=0.3;
  //pegando animaciones en el sprite
  blink.frameDelay=20;
  rabbit.addAnimation("blinking",blink);
  rabbit.changeAnimation("blinking");

  rabbit.addAnimation("eating",eat);
  
  rabbit.addAnimation("crying",sad);




  //creandobotones

  cutImg=createImg("cut_btn.png");
  cutImg.position(215,0);
  cutImg.size(70,70);
 cutImg.mouseClicked(drop);

  ground = new Ground(200, 690, 600, 20);
  rope= new Rope(5,{x:250,y:0});
  var fruit_option={
density:0.001
  }
fruit=Bodies.circle(300,300,20,fruit_option);
Matter.Composite.add(rope.body,fruit);
fruit_restriction= new Link(rope,fruit);

imageMode(CENTER);

}

function draw() 
{
  background(51);
  image(BK,width/2,height/2,500,700)
  ground.show();
  rope.show();
  if(fruit!=null){
  image(melonImage,fruit.position.x,fruit.position.y,90,90); 

  }
  
    
  Engine.update(engine);
  if(collide(fruit,rabbit)==true){
 rabbit.changeAnimation("eating");

  }

  drawSprites();
}

function drop(){
rope.break();
fruit_restriction.detach();

fruit_restriction=null


}
function collide(body,sprite){
if(body!=null){
var distance=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
if(distance<=60){
World.remove(engine.world,fruit);
fruit=null
return true

}

}



}



