//Create variables here
var dog
var happyDog
var database
var foods
var foodStock
var fedTime ,lastFed
var foodObj

var dog_img;
var happyDog_img

function preload() {
  dog_img = loadImage("Images/dogImg.png");
  happyDog_img = loadImage("Images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 400);

  dog = createSprite(800,200,150,150)
  dog.addImage(dog_img)
  dog.scale = 0.15;



  foodObj = new Food();

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

    // button
    feed=createButton("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);
  
    addFood=createButton("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);

}


function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
}

function readStock(data) {
  foods = data.val();
  foodObj.updateFoodStock(foods)
}
/*
function writeStock(x) {

  if (x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })

}*/

function feedDog()
{
  dog.addImage(happyDog_img);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  console.log("HIIIIIIIIIIIII")
foods++;
console.log(foods)
database.ref('/').update({
  Food : foods
})

}



