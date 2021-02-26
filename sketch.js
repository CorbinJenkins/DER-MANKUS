
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var PLAY=0;
var END=1;
var gameState=PLAY;
var time=0;
var Background
var button
var dino

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_ded=loadImage("sprite_7.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  jungle=loadImage("jungle.jpg");
  
  button=loadImage("download.jpg");
  dino=loadImage("dino.png");
}



function setup() {
  createCanvas(400,400);
  monkey=createSprite(50,200,10,10);
  monkey.addAnimation("run monkey",monkey_running);
  monkey.scale=0.1;
  monkey.addAnimation("dedMonkey",monkey_ded);
  restart=createSprite(200,250,20,20);
  restart.visible=false
  restart.addImage("button",button)
  restart.scale=0.2;
  Background=createSprite(10,10,10,10)
  Background.addImage("jungle",jungle);
  Background.x=Background.width/2;
  Background.velocityX=-5;
  
  
  ground=createSprite(400,350,800,5);
  ground.visible=false;
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background(255);
  drawSprites();
  
  if (gameState===PLAY){
    
     monkey.changeAnimation("run monkey",monkey_running);
    
    if(Background.x<0){
     Background.x=Background.width/2;
      
    }
    
    
      monkey.collide(ground);
  monkey.velocityY+=2;
  Rock();
  Banana();
  
  console.log(monkey.y);
    
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score+=2;
    
  }
  
  if(keyDown("space")&&monkey.y>=300){
   monkey.velocityY=-25;
 }
  
    
    
    switch(score){
      case 10: monkey.scale=0.12
        break;
      case 20: monkey.scale=0.14
        break;
      case 30: monkey.scale=0.16
        break;
      case 40: monkey.scale=0.18
        break;  
        default: break;
        
    }
    if(obstacleGroup.isTouching(monkey)){
      monkey.scale=0.1
      
    }
    if(obstacleGroup.isTouching(monkey)&&monkey.scale==0.1){
      gameState=END
      
    }
    
    if (frameCount%5===0){
      time++;
    }
    
    stroke("yellow");
    textSize(20);
    fill("black");
    text("score: "+score,100,100);
    
    stroke("white")
    textSize(20);
    fill("black");
    text("Survival Time: "+ time,100,50);
    
    monkey.depth=monkey.depth+1
    restart.depth=restart.depth+1
    
  }
  if(gameState===END){
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach();
    obstacleGroup.setLifetimeEach();
    fill("black");
    textSize(15);
    stroke("cyan");
    text("Game Over",200,200);
    monkey.changeAnimation("dedMonkey",monkey_ded);
    Background.velocityX=0;
    restart.visible=true
    if(mousePressedOver(restart)){
      gameState=PLAY
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      score=0
      time=0
      Background.velocityX=-5;
      restart.visible=false;
    }
    
    
  }
  
  
  
  
  
 
}

function Banana(){
  
  if(frameCount%80===0){
     var banana=createSprite(400,10,10,10);
     banana.addImage("banana",bananaImage);
     banana.y=Math.round(random(120,200));
     banana.velocityX=-8;
     banana.lifetime=100;
     banana.scale=0.1;
     FoodGroup.add(banana);
  }
}
function Rock(){
  if (frameCount%50===0){
    var rock=createSprite(400,315,10,100);
    rock.addImage("rock",dino);
    rock.lifetime=100;
    rock.velocityX=-12;
    rock.scale=0.3;
    obstacleGroup.add(rock);
    
    
  }
  
  
}

function BIRD(){
  
  
}



