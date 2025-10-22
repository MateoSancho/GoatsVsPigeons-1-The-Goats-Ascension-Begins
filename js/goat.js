class Goat {
  constructor() {
    //Properties defined for the Goat
    this.node = document.createElement("img");
    this.node.src = "../images/Goat.png";
    //To add the node to the game-box on goat creation
    gameBoxNode.append(this.node);

    //Add the initial values of position and dimension, using uniformity from main.js
    this.width = ENTITY_SIZE;
    this.height = ENTITY_SIZE;
    this.x = 50;
    this.y = 275;

    //Adjust the node with the initial values
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    //Movement Speed
    this.jumpSpeed = 50;
    this.fallSpeed = 50;
  }

  //Variable of movement methods for Jump, Fall, Left and Right
  jump() {
    this.y -= this.jumpSpeed;
    this.node.style.top = `${this.y}px`;
    //Change image to jump image while jumping, then revert
    const previousSrc = this.node.src;
    this.node.src = "../images/goatjump.png";
    //After 0,2 seconds the image revert to the initial image
    setTimeout(() => {
      this.node.src = previousSrc;
    }, 200);
  }

  fall() {
    this.y += this.fallSpeed;
    const maxY = gameBoxNode.clientHeight - this.height;
    if (this.y > maxY) this.y = maxY;
    this.node.style.top = `${this.y}px`;
  }

  left() {
    this.x -= 50;
    if (this.x < 0) this.x = 0;
    this.node.style.left = `${this.x}px`;
  }

  right() {
    this.x += 50;
    const maxX = gameBoxNode.clientWidth - this.width;
    if (this.x > maxX) this.x = maxX;
    this.node.style.left = `${this.x}px`;
  }
}
