class Pigeon {
  constructor() {
    //this is where the properties will be defined
    this.node = document.createElement("img");
    this.node.src = "../images/PigeonAttack.png";
    gameBoxNode.append(this.node);

    // add the initial values of position and dimension
  this.width = ENTITY_SIZE;
  this.height = ENTITY_SIZE;
  // place the pigeon on the right side of the game box (similar visual position as before)
  this.x = 425;
  this.y = 265;

    // adjust the node with the initial values
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }
}
