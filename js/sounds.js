class Sound {
  constructor() {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    his.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }

  play() {
    this.sound.currentTime = 0;
    this.sound.play();
  }

  stop() {
    this.sound.pause();
    this,this.sound.currentTime = 0;
  }
}

//Create sound elements
const jumpSound = new Audio("./sounds/jump.mp3");
const gameOverSound = new Audio("./sounds/gameover.mp3");

//Set audio properties
jumpSound.preload = "auto";
gameOverSound.preload = "auto";
