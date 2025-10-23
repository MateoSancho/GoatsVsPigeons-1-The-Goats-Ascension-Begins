class Pigeon {
  constructor() {
    this.node = document.createElement("img");
    this.node.src = "../images/PigeonAttack.png";
    gameBoxNode.append(this.node);

    // add the initial values of position and dimension, using uniformity from main.js
    this.width = ENTITY_SIZE;
    this.height = ENTITY_SIZE;
    this.x = 425;
    this.y = 265;

    // adjust the node with the initial values
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  shoot() {
    //Only for visual effect (help with AI)
    this.node.style.transform = "scale(1.6)";
    setTimeout(() => {
      this.node.style.transform = "scale(1)";
    }, 100);

  }
}
