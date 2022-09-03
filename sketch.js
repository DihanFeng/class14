var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;
var cactus;
var cactusGroup;

var gamestate = "play";

var score = 0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");

} function setup() {
  createCanvas(1200, 400);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colided",trex_collided)
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.65;
  
  ground = createSprite(200,270,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,280,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group()
  cactusGroup = new Group()

  console.log("Hello"+ 5)
  


}

function draw() {
  background(0);
  textSize(23)
  text("score: "+ score, 450,50)

  if(gamestate === "play"){
    if(keyDown("space")&& trex.y >= 240) {
      trex.velocityY = -15;
    }
   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    score = score + Math.round(getFrameRate()/60); 
    trex.velocityY = trex.velocityY + 0.8;

    spawnClouds();
    spawnCacti();

    ground.velocityX = -6;
    if(cactusGroup.isTouching(trex)){
      gamestate = "end"
    }

  }
  else if(gamestate === "end"){
    ground.velocityX = 0;
    cactusGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)

    cactusGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)

    trex.changeAnimation("colided",trex_collided);

  }

  
  trex.collide(invisibleGround);
  
  drawSprites();

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % Math.round(random(30,70)) === 0) {
    cloud = createSprite(1240,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.5;
    cloud.velocityX = -Math.round(random(2,4));
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 900
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;

    cloudsGroup.add(cloud)
    }
  
}

function spawnCacti() {
  if(frameCount % Math.round(random(30,80)) === 0) {
    cactus = createSprite(1240,260,20,50);
    cactus.scale = 0.6;
    cactus.lifetime = 480;
    cactus.velocityX = -6;
    var dihan = Math.round(random(1,6));

    cactusGroup.add(cactus)

    switch(dihan){
      case 1: cactus.addImage(cactus1);
      break;
      case 2: cactus.addImage(cactus2);
      break;
      case 3: cactus.addImage(cactus3);
      break;
      case 4: cactus.addImage(cactus4);
      break;      
      case 5: cactus.addImage(cactus5);
      break;
      case 6: cactus.addImage(cactus6);
      break;
      default:break;
                                                                                                                                                                                                                                                                                                                                                                                                                          }

  }

}

