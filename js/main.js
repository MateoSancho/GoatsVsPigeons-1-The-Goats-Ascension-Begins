//* GLOBAL DOM ELEMENTS

//Screens
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

//Buttons
const startBtnNode = document.querySelector("#start-btn");

//Game box
const gameBoxNode = document.querySelector("#game-box");

//* GLOBAL GAME VARIABLES

//The images must be loaded to erase all delays (AI response)
//Preload images
function preloadImages() {
  const images = [
    "./images/Goat.png",
    "./images/goatjump.png",
    "./images/Worm.png",
    "./images/PigeonAttack.png",
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

window.addEventListener('load', preloadImages);

//Same size for all entities
const ENTITY_SIZE = 50;

let goatObj = null; //The goat isn't at the beginnig yet
let pigeonObj = null;
let pigeonsArr = []; //Column of pigeons array
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

  //Column of 6 pigeons
  pigeonsArr = [];
  const baseX = 520; //Starting x point from top pigeon
  const baseY = 25; //Starting y point from top pigeon
  const spacing = ENTITY_SIZE + 10; //Spacing between pigeons
  for (let i = 0; i < 6; i++) {
    const p = new Pigeon();
    p.x = baseX;
    p.y = baseY + i * spacing;
    p.node.style.left = `${p.x}px`;
    p.node.style.top = `${p.y}px`;
    pigeonsArr.push(p);
  }

  //Store a reference to the rightmost (they all share same x) pigeon for fallback
  pigeonObj = pigeonsArr[pigeonsArr.length - 1];

  //Create a floor bottom floor tha will be right below the goat initial bottom
  floorNode = document.createElement("div");
  floorNode.id = "floor";

  //Placement of the floor using absolute coordinates inside the game box
  floorNode.style.position = "absolute";
  floorNode.style.left = "0px";
  floorNode.style.width = "100%";
  floorNode.style.height = "10px";

  //Placement of the floor right under the goat
  floorNode.style.top = `${goatObj.y + goatObj.height}px`;
  gameBoxNode.append(floorNode);

  //Start the main game loop
  gameIntervalID = setInterval(gameLoop, Math.floor(1000 / 60)); //60fps

  //Start the extra intervals of the game
  wormIntervalID = setInterval(wormSpawn, 1000); //each second
}

//Function to spawn worms
function wormSpawn() {
  //Spawn the worm randomly aligned with one of the pigeons in the column
  let spawnX = 500;
  let spawnY = 200;
  if (pigeonsArr && pigeonsArr.length > 0) {
    const idx = Math.floor(Math.random() * pigeonsArr.length); //Random X position
    const p = pigeonsArr[idx];
    spawnX = p.x + p.width + 10;
    spawnY = p.y;
  } else if (pigeonObj) {
    spawnX = pigeonObj.x + pigeonObj.width + 10;
    spawnY = pigeonObj.y;
  }
  let wormObj = new Worm(spawnX, spawnY);
  wormArr.push(wormObj);
}

//Despawn worm at certain point of the screen
function checkwormDespwan() {
  if (wormArr.length !== 0 && wormArr[0].x < -100) {
    wormArr[0].node.remove();
    wormArr.shift();
  }
}

//Colision detection between the goat and the worms
function checkGoatWormCollision() {
  //Use DOM bounding boxes for collision detection to be more robust
  if (!goatObj) return;
  const goatRect = goatObj.node.getBoundingClientRect();

  //Compare with each worm's rect
  for (let eachwormObj of wormArr) {
    if (!eachwormObj || !eachwormObj.node) continue;
    const wormRect = eachwormObj.node.getBoundingClientRect();

    //Check intersection
    const intersect = !(
      goatRect.right < wormRect.left ||
      goatRect.left > wormRect.right ||
      goatRect.bottom < wormRect.top ||
      goatRect.top > wormRect.bottom
    );
    if (intersect) {
      console.log("the goat collided with the worm (DOM collision)");
      gameOver();
      break;
    }
  }
}

function gameOver() {
  //Stop all Intervals
  clearInterval(gameIntervalID);
  clearInterval(wormIntervalID);

  //Stop the game screen and show game over screen
  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";
}

//Reset game state and return to start screen (beginner-friendly)
function resetGame() {
  //Clear intervals
  if (gameIntervalID) {
    clearInterval(gameIntervalID);
    gameIntervalID = null;
  }
  if (wormIntervalID) {
    clearInterval(wormIntervalID);
    wormIntervalID = null;
  }

  //Remove worms
  if (wormArr && wormArr.length > 0) {
    wormArr.forEach((w) => {
      if (w && w.node) w.node.remove();
    });
  }
  wormArr = [];

  //Remove pigeons
  if (pigeonsArr && pigeonsArr.length > 0) {
    pigeonsArr.forEach((p) => {
      if (p && p.node) p.node.remove();
    });
  }
  pigeonsArr = [];
  pigeonObj = null;

  //Remove goat
  if (goatObj && goatObj.node) {
    goatObj.node.remove();
  }
  goatObj = null;

  //Remove floor
  if (floorNode) {
    floorNode.remove();
    floorNode = null;
  }

  //Remove restart button if present
  const btn = document.querySelector("#restart-btn");
  if (btn) btn.remove();

  //Show start screen and hide game over screen
  gameOverScreenNode.style.display = "none";
  startScreenNode.style.display = "flex";
}

//Main game loop
function gameLoop() {
  checkwormDespwan();

  //Remove worms that passed the game box (left)
  for (let i = wormArr.length - 1; i >= 0; i--) {
    wormArr[i].automaticMovement();
  }

  //Completely left side remove worm (AI help)
  if (wormArr[i].x + wormArr[i].width < 0) {
    wormArr[i].node.remove();
    wormArr.splice(i, 1);
  }
}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", startGame);

//Restart button
const staticRestartBtn = document.querySelector("#restart-btn"); //Make it static on browser
if (staticRestartBtn) {
  staticRestartBtn.addEventListener("click", () => {
    resetGame();
  });
}

//Detectors of key pressing for the goat movement (wasd)
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (!goatObj) return;
  if (key === "w") {
    e.preventDefault();
    goatObj.jump();
  } else if (key === "s") {
    e.preventDefault();
    if (typeof goatObj.fall === "function") goatObj.fall();
  } else if (key === "a") {
    e.preventDefault();
    if (typeof goatObj.left === "function") goatObj.left();
  } else if (key === "d") {
    e.preventDefault();
    if (typeof goatObj.right === "function") goatObj.right();
  }
});

/*✅
List of remaining things:
  Important:
    - Ceiling on game screen
    - Styling:
      - main screen
      - game screen 

    - End Game screen improvement:
      - css
      - buttons
      - others

    - Improve coding:
      - main
      - goat
      - pigeon
      - worm
      - others

  Improvement:
    - Difficulty levels:
      - noob(0)
      - normal(1)
      - difficult(2)
      - insane(3)

    - Personalize goat:
      - pink
      - normal
      - blue
      - red

    - Life system:
      - 3 lifes
      - shown on game screen
      - when hit, remove 1
      - when killed, stop game

    - Timer:
      -timer shown on game screen, and result when dead
      -styles

    - Music effects:
      - goat jump
      - in game
      - main screen
      - hit
      - shooting
      - others

    - Screen with creator things
    - Screen with game explanation
*/