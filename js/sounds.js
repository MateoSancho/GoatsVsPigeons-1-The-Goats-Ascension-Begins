class Sounds {
  constructor() {
    this.sound = document.createElement("audio");
    this.sound.src = "./";
    his.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }

  play() {
    this.sound.currentTime = 0;
    this.sound.play();
  }
}

//Create sound effects
const jumpSound = new Sound("./sounds/jump.mp3");
const gameOverSound = new Sound("./sounds/gameover.mp3");
