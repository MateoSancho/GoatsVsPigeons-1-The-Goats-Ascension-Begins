//* GLOBAL DOM ELEMENTS

// screens
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

// buttons
const startBtnNode = document.querySelector("#start-btn");

// game box
const gameBoxNode = document.querySelector("#game-box");

//* GLOBAL GAME VARIABLES

// All entities will share the same size for this request
const ENTITY_SIZE = 140;

let goatObj = null; //the game hasn't yet started, so we don't yet have the bird
let pigeonObj = null;
let wormArr = [];

let gameIntervalID = null;
let wormIntervalID = null;
let floorNode = null; // DOM node for the visual floor (created at game start)


//* GLOBAL GAME FUNCTIONS
function startGame() {
  console.log("starting the game");

  //Hide main screen and show the game screen
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //Adding inicial game elements

  goatObj = new Goat();
  pigeonObj = new Pigeon();

  // create a visual floor at the starting place of the goat so it doesn't fall forever
  // floor top will be right below the goat initial bottom
  floorNode = document.createElement("div");
  floorNode.id = "floor";
  // position the floor using absolute coordinates inside the game box
  floorNode.style.position = "absolute";
  floorNode.style.left = "0px";
  floorNode.style.width = "100%";
  floorNode.style.height = "10px";
  // place floor right under the goat
  floorNode.style.top = `${goatObj.y + goatObj.height}px`;
  floorNode.style.background = "rgba(255,255,255,0.05)";
  gameBoxNode.append(floorNode);

  //Start the main game loop
  gameIntervalID = setInterval(gameLoop, Math.floor(1000 / 60)); //60fps

  //Start the extra intervals of the game
  wormIntervalID = setInterval(wormSpawn, 2000);
}

function wormSpawn() {
  // spawn the worm to the right of the pigeon (as if the pigeon is shooting)
  let spawnX = 600; // fallback spawn X (right side of the box)
  let spawnY = 200; // fallback Y
  if (pigeonObj) {
    spawnX = pigeonObj.x + pigeonObj.width + 10;
    // align vertically with the pigeon
    spawnY = pigeonObj.y;
  }
  let wormObj = new Worm(spawnX, spawnY);
  wormArr.push(wormObj);
}

function checkwormDespwan() {
  if (wormArr.length !== 0 && wormArr[0].x < -100) {
    wormArr[0].node.remove();
    wormArr.shift();
  }
}

function checkGoatWormCollision() {
  // birdObj
  // pipeObj => many inside pipeArr
  wormArr.forEach((eachwormObj) => {
    if (
      goatObj.x < eachwormObj.x + eachwormObj.width &&
      goatObj.x + goatObj.width > eachwormObj.x &&
      goatObj.y < eachwormObj.y + eachwormObj.height &&
      goatObj.y + goatObj.height > eachwormObj.y
    ) {
      console.log("the goat collided with the worm");
      gameOver();
    }
  });
}

function gameOver() {
  //1. we need to stop ALL intervals
  clearInterval(gameIntervalID);
  clearInterval(wormIntervalID);

  //2. toggle the screen
  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";

  //!3. you need to reset all the elements of the game (allows you to restart)
}

function gameLoop() {
  //console.log("game running at 60fps")
  goatObj.gravityEffect();
  //pipeObj.automaticMovement()

  //if(wormArr[wormArr.length - 1].x < 400) {
  //    wormSpawn()
  //}

  checkwormDespwan();
  checkGoatWormCollision();

  wormArr.forEach((eachwormObj) => {
    eachwormObj.automaticMovement();
  });
}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", startGame);

// Replace clicking the game box with pressing Space to make the goat jump
document.addEventListener("keydown", (e) => {
  // use event.code to reliably detect the Space key
  if (e.code === "Space") {
    // prevent default scrolling
    e.preventDefault();
    if (goatObj) goatObj.jump();
  }
});

/*
style: 
    -background ✅
*/
