//* GLOBAL DOM ELEMENTS

//Screens, Buttons, Game box
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const startBtnNode = document.querySelector("#start-btn");
const gameBoxNode = document.querySelector("#game-box");

//* GLOBAL GAME VARIABLES

const ENTITY_SIZE = 50; //Same size for all entities
let goatObj = null;
let pigeonObj = null;
let pigeonsArr = [];
let wormArr = [];
let gameIntervalID = null;
let wormIntervalID = null;
let floorNode = null; // DOM node for the visual floor (created at game start)

//* GAME STATE VARIABLES

let score = 0;
let lives = 3;
let gameTime = 0;
let isGameRunning = false;
let scoreDisplay = null;
let livesDisplay = null;
let timerDisplay = null;

//* GLOBAL GAME FUNCTIONS

function startGame() {
  console.log("starting the game");

  //Reset game state
  score = 0;
  lives = 3;
  gameTime = 0;
  isGameRunning = true;

  //Hide main screen and show the game screen
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //Create game UI
  createGameUI();

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
  floorNode.style.background = "linear-gradient(45deg, #8B4513, #A0522D";

  //Placement of the floor right under the goat
  floorNode.style.top = `${goatObj.y + goatObj.height}px`;
  gameBoxNode.append(floorNode);

  //Start the main game loop
  gameIntervalID = setInterval(gameLoop, Math.floor(1000 / 60)); //60fps

  //Start the extra intervals of the game
  wormIntervalID = setInterval(wormSpawn, 1000); //each second

  //Start timer
  setInterval(() => {
    if (isGameRunning) {
      gameTime++;
      updateUI();
    }
  }, 1000);
}

//Game UI function
function createGameUI() {
  const uiContainer = document.createElement("div");
  uiContainer.id = "game-ui";
  uiContainer.style.cssText = `
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: #d6a800;
    font-family: Arial, sans-serif;
    font-size: 18px;
    margin-bottom: 10px;
    border-radius: 10px;
  `;

  scoreDisplay = document.createElement("div");
  scoreDisplay.id = "score";
  scoreDisplay.textContent = `Score: ${score}`;

  livesDisplay = document.createElement("div");
  livesDisplay.id = "lives";
  livesDisplay.textContent = `Lives: ${lives}`;

  timerDisplay = document.createElement("div");
  timerDisplay.id = "timer";
  timerDisplay.textContent = `Time: 0s`;

  uiContainer.appendChild(scoreDisplay);
  uiContainer.appendChild(livesDisplay);
  uiContainer.appendChild(timerDisplay);

  gameScreenNode.insertBefore(uiContainer, gameBoxNode);
}

//Update UI function
function updateUI() {
  if (scoreDisplay) scoreDisplay.textContent = `Score: ${score}`;
  if (livesDisplay) livesDisplay.textContent = `Lives: ${lives}`;
  if (timerDisplay) timerDisplay.textContent = `Time: ${gameTime}s`;
}

//Function to spawn worms
function wormSpawn() {
  let spawnX = 500;
  let spawnY = 200;
  //Spawn the worm randomly aligned with one of the pigeons in the column
  if (pigeonsArr && pigeonsArr.length > 0) {
    const idx = Math.floor(Math.random() * pigeonsArr.length);
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
  if (!goatObj || !isGameRunning) return;

  for (let i = wormArr.length - 1; i >= 0; i--) {
    const eachwormObj = wormArr[i];

    // Colision detection view in class
    if (
      goatObj.x < eachwormObj.x + eachwormObj.width &&
      goatObj.x + goatObj.width > eachwormObj.x &&
      goatObj.y < eachwormObj.y + eachwormObj.height &&
      goatObj.y + goatObj.height > eachwormObj.y
    ) {
      console.log("the goat collided with the worm");

      //Remove the worm that hit
      eachwormObj.node.remove();
      wormArr.splice(i, 1);

      //Handle life loss
      loseLife();
      return;
    }
  }
}

//Life system function
function loseLife() {
  lives--;
  updateUI();

  if (lives <= 0) {
    gameOver();
  } else {
    // Brief invincibility with visual feedback
    goatObj.node.style.opacity = "0.5";
    setTimeout(() => {
      if (goatObj && goatObj.node) {
        goatObj.node.style.opacity = "1";
      }
    }, 1000);
  }
}

function gameOver() {
  isGameRunning = false;

  //Stop all Intervals
  clearInterval(gameIntervalID);
  clearInterval(wormIntervalID);

  //Stop the game screen and show game over screen
  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";

  //Add final score display
  const finalScoreDisplay = document.createElement("div");
  finalScoreDisplay.textContent = `Final Score: ${score} | Time: ${gameTime}s`;
  finalScoreDisplay.style.cssText = `
    color: #d6a800;
    font-size: 24px;
    margin: 20px 0;
    font-family: Arial, sans-serif;`;

  //Add final score to game over screen
  gameOverScreenNode.insertBefore(
    finalScoreDisplay,
    gameOverScreenNode.querySelector("button")
  );

  //Restart the game elements
  let restartBtn = document.querySelector("#restart-btn");
  if (!restartBtn) {
    restartBtn = document.createElement("button");
    restartBtn.id = "restart-btn";
    restartBtn.textContent = "Dangerous Button";
    restartBtn.style.padding = "12px 20px";
    restartBtn.style.fontSize = "18px";
    gameOverScreenNode.append(restartBtn);
  }

  //Use resetGame instead of page reload
  restartBtn.onclick = resetGame;
}

//Reset game function
function resetGame() {
  //Clear intervals
  if (gameIntervalID) clearInterval(gameIntervalID);
  if (wormIntervalID) clearInterval(wormIntervalID);

  gameIntervalID = null;
  wormIntervalID = null;
  isGameRunning = false;

  //Remove UI
  const uiContainer = document.querySelector("#game-ui");
  if (uiContainer) uiContainer.remove();

  //Remove game elements
  if (wormArr.length > 0) {
    wormArr.forEach((w) => w.node.remove());
  }
  wormArr = [];

  if (pigeonsArr.length > 0) {
    pigeonsArr.forEach((p) => p.node.remove());
  }
  pigeonsArr = [];
  pigeonObj = null;

  if (goatObj && goatObj.node) {
    goatObj.node.remove();
  }
  goatObj = null;

  if (floorNode) {
    floorNode.remove();
    floorNode = null;
  }

  // emove final score display
  const finalScore = gameOverScreenNode.querySelector("div");
  if (finalScore && !finalScore.querySelector("button")) {
    finalScore.remove();
  }

  //Show start screen
  gameOverScreenNode.style.display = "none";
  startScreenNode.style.display = "flex";
}

//Main game loop
function gameLoop() {
  if (!isGameRunning) return;

  checkwormDespwan();
  checkGoatWormCollision();

  wormArr.forEach((eachwormObj) => {
    eachwormObj.automaticMovement();

    //Add score when worms leave screen safely
    if (eachwormObj.x + eachwormObj.width < 0) {
      score += 10;
      updateUI();
    }
  });
}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", startGame);

//Detectors of key pressing for the goat movement (wasd)
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (!goatObj || !isGameRunning) return;

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
