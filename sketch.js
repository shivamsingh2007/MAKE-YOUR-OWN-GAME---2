var cat,cat_running,cat_collided;
var ground,ground_image;
var coin,coin_image,coGroup,coinsound
var obstacle1,obstacle2,obstacle3,obGroup;
var score=0;
var coin=0;
var lives=3;
var PLAY=0;
var END=1;
var SERVE=2;
var Gamestate=PLAY;
var gameover,gameoverimg,gameoversound;
var restart,restartimg,restartsound;
var won,win;
var playi,playimg,playsound;
var inv_ground;
var stopper;
function preload(){
cat_running=loadAnimation("cat1.png","cat2.png","cat3.png","cat4.png","cat5.png","cat6.png","cat7.png");
cat_collided=loadAnimation("cat1.png")
ground_image=loadImage("ground.png")
coin_image=loadImage("coin_img.png")
obstacle1=loadImage("obstacle1.png")
obstacle3=loadImage("obstacle3.png")
obstacle2=loadImage("obstacle2.png")
gameoverimg=loadImage("game_over.png")
restartimg=loadImage("restart_btn.png")
win=loadImage("you_win.jpg")
playimg=loadImage("play_btn.png")
coinsound=loadSound("coinCollectSound.wav")
gameoversound=loadSound("gameOverSound.wav")
restartsound=loadSound("restartSound.wav")
playsound=loadSound("playSound.wav")

}

function setup() {
createCanvas(500,200)

cat=createSprite(55,120,20,20);
cat.addAnimation("running",cat_running)
cat.addAnimation("collided",cat_collided)
cat.scale=0.5
  
ground=createSprite(245,200,600,30); 
ground.addImage(ground_image)
ground.scale=2
ground.velocityX=-4


stopper = createSprite(55,26,50,10)
stopper.visible = false
  
inv_ground =  createSprite(55,158,30,30)
inv_ground.visible = false

gameover=createSprite(225,70,20,20)
gameover.addImage(gameoverimg)
gameover.scale=0.4
  
restart=createSprite(250,120,20,20)
restart.addImage(restartimg)
restart.scale=0.2

won=createSprite(225,80,30,30)
won.addImage(win)
won.scale=0.5
  
playi=createSprite(225,160,20,20)
playi.addImage(playimg)
playi.scale=0.5
  
obGroup=new Group();
coGroup=new Group();
}

function draw() {
 background("white");
 // cat.debug=true  
textSize(20)
text("Score:"+score,10,20)
text("Lives:"+lives,200,20)
text("Coins:"+coin,400,20)

cat.collide(stopper)

  if(Gamestate===PLAY){

  score=score+Math.round(getFrameRate()/60);

    
     if(touches.length>0||keyDown("space")&&cat.y>=120){
      cat.velocityY=-12 
    }

  cat.velocityY = cat.velocityY + 0.8
    
  if(obGroup.isTouching(cat)){
    Gamestate= END
    lives=lives-1
    gameoversound.play();
  }
    
   if(coGroup.isTouching(cat)){
     coin = coin+1
     coGroup[0].destroy()
     coinsound.play();
   }
    
  if(ground.x<220){
    ground.x=ground.width  
  }
    
   if(lives===0){
   Gamestate=SERVE;
  }
  if(coin===10){
var winner = createSprite(250,100,499,199);
winner.addImage(win)
winner.scale = 1.5
ground.velocityX = 0
ground.destroy();
cat.changeAnimation("collided",cat_collided)
cat.destroy();
obGroup.velocityX = 0
obGroup.setVelocityXEach(0)
coGroup.setVelocityXEach(0)
obGroup.destroyEach();
coGroup.destroyEach();
score = 0
  }
   
    Coin();
  Obstacle();
    
    restart.visible=false;
    gameover.visible=false;
    won.visible=false;
    playi.visible=false
  }

  else if (Gamestate===END){
  restart.visible=true  
 
    
  cat.changeAnimation("collided",cat_collided)
  obGroup.setVelocityXEach(0)
  coGroup.setVelocityXEach(0)
  ground.velocityX=0  
  obGroup.setLifetimeEach(-1);
  coGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(restart)||touches.length>0){
    reset();
    restartsound.play();
   }
  }
  
  else if(Gamestate===SERVE){
    gameover.visible=true
    playi.visible=true
    cat.changeAnimation("collided",cat_collided)
  obGroup.setVelocityXEach(0)
  coGroup.setVelocityXEach(0)
  ground.velocityX=0  
  obGroup.setLifetimeEach(-1);
  coGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(playi)||touches.length>0){
    winning();
    playsound.play();
  }
    
  }
  
cat.collide(inv_ground)
cat.setCollider("rectangle",0,0,cat.width,cat.height) 
  
  
 drawSprites();
}

function Coin() {
if(frameCount % 80 ===0) {
 var coins=createSprite(400,150,20,20) 
 coins.y=Math.round(random(80,150))
 coins.addImage(coin_image)
  coins.scale=0.1
  coins.velocityX=-3
  coins.lifetime=200
  coGroup.add(coins)
}
}


function Obstacle(){
if(frameCount%60===0){
   var obstacles = createSprite(510,145,10,40); 
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacles.addImage(obstacle2);
              break;
      case 2: obstacles.addImage(obstacle1);
              break;
      case 3: obstacles.addImage(obstacle3);
              break;
}
  obstacles.velocityX=-6
  obstacles.scale=0.2
  obstacles.lifetime=300
  obGroup.add(obstacles);
}
}

function reset(){
  Gamestate=PLAY
  gameover.visible=false
  restart.visible=false
  obGroup.destroyEach();
  coGroup.destroyEach();
  score=0
  coin=0
  cat.changeAnimation("running",cat_running);
  ground.velocityX=-4
} 

function winning(){
  Gamestate=PLAY
  gameover.visible=false
  restart.visible=false
  obGroup.destroyEach();
  coGroup.destroyEach();
  score=0
  coin=0
  lives=3
  cat.changeAnimation("running",cat_running);
  ground.velocityX=-4
}
