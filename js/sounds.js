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

class BackgroundMusic {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.loop = true;
    this.sound.volume = 0.3; // Lower volume for background music
    document.body.appendChild(this.sound);
  }

  play() {
    this.sound.play();
  }

  stop() {
    this.sound.pause();
    this.sound.currentTime = 0;
  }
}

//Create sound effects
const jumpSound = new Sound("./sounds/jump.mp3");
const gameOverSound = new Sound("./sounds/gameover.mp3");
const shootingSound = new Sound("./sounds/shooting.mp3");
const backgroundSound = new BackgroundMusic("./sounds/background.mp3");
