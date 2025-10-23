class Worm {
  constructor(spawnX = 500, spawnY = 200) {
    this.node = document.createElement("img");
    this.node.src = "../images/Worm.png";
    gameBoxNode.append(this.node);

    // add the initial values of position and dimension, using uniformity from main.js    this.width = ENTITY_SIZE;
    this.height = ENTITY_SIZE;
    this.width = ENTITY_SIZE;
    this.x = spawnX;
    this.y = spawnY;

    // adjust the node with the initial values
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.speed = 2;
  }

  automaticMovement() {
    this.x -= this.speed;
    this.node.style.left = `${this.x}px`;
  }
}
