//* GLOBAL DOM ELEMENTS

// screens
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// buttons
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")


//* GLOBAL GAME VARIABLES

let goatObj = null //the game hasn't yet started, so we don't yet have the bird
let pigeonObj = null 
let pigeonArr = []



//* GLOBAL GAME FUNCTIONS
function startGame() {
    console.log("starting the game")

    //Hide main screen and show the game screen
    startScreenNode.style.display = "none";
    gameScreenNode.style.display = "flex";

    //Adding inicial game elements

    goatObj = new Goat()
    pigeonObj = new Pigeon()
    pigeonArr
    

    //Start the main game loop
    setInterval(gameLoop, Math.floor(1000/60)) //60fps

    //Start the extra intervals of the game
    setInterval(pipeSpawn, 2000)

}
/*
function pipeSpawn() {
    let pipeObjTop = new Pigeon()
    pigeonArr.push(pipeObjTop)
}

function pipeDespwan() {
    if (pigeonArr.length !== 0 && pipeArr[0].x < -100) {
        // how do we"destroy" the pipe?
        pigeonArr.shift()
    }
}

function gameLoop() {
    //console.log("game running at 60fps")
    goatObj.gravityEffect()
    //pipeObj.automaticMovement()

    //if(pipeArr[pipeArr.length - 1].x < 400) {
    //    pipeSpawn()
    //}

    pigeonArr.forEach((eachPigeonObj) => {
        eachPigeonObj.automaticMovement()
    })
}
*/

//* EVENT LISTENERS
startBtnNode.addEventListener("click", startGame)

/*
gameBoxNode.addEventListener("click", () => {
    goatObj.jump()
})
*/

/*
style: 
    -background ✅
*/