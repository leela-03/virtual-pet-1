var dog,happydog;
var dogImg,happydogImg;
var database;
var foods, foodStock;



function preload()
{
	dogImg=loadImage("dogImg.png");
  happydogImg=loadImage("dogImg1.png");
}

function setup() {

  database=firebase.database();

	createCanvas(500, 500);
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(250,300,100,100);
  dog.addImage(dogImg);
  dog.scale=0.15;
}


function draw() {  
  background(46,139,87);

   if(keyWentDown(UP_ARROW)){
     writeStock(foodStock);
     dog.addImage(happydogImg);
   }


  drawSprites();
    textSize(15);
    fill("white");
    text("Food Remaining:" +foodStock , 150,200);
    text("Press UP arrow key to feed the dog",150,60);
  }

  function readStock(data){
    foodStock=data.val();
  
  }
  
  function writeStock(x){

    if(x<=0){
      x=0;
    }else{
      x=x-1;
    }

    database.ref('/').update({
      Food:x
    })
  }





