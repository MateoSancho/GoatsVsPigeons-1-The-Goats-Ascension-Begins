class Goat {
  constructor() {
    //this is where the properties will be defined
    this.node = document.createElement("img"); // <img />
    this.node.src = "../images/Goat normal.png"; //<img src="./images/flappy.png"/>
    gameBoxNode.append(this.node); // to add the node to the game-box on bird creation

    // add the initial values of position and dimension
  // use uniform entity size
  this.width = ENTITY_SIZE;
  this.height = ENTITY_SIZE;
  this.x = 50;
  // y so the goat is sitting in the same visible place as before (adjusted for new height)
  this.y = 275;

    // adjust the node with the initial values
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;

    this.jumpSpeed = 40;
    this.gravitySpeed = 2;
  }

  // this is where the methods will be defined
  gravityEffect() {
    //console.log("trying to move the bird down")
    // apply gravity but stop at the floor if present
    this.y += this.gravitySpeed;
    // if a floor is present in the DOM, prevent falling through it
    const floor = document.querySelector("#floor");
    if (floor) {
      const floorTop = parseFloat(floor.style.top);
      const maxY = floorTop - this.height; // goat should sit on top of the floor
      if (this.y > maxY) this.y = maxY;
    }
    this.node.style.top = `${this.y}px`;
  }

  jump() {
    // console.log("trying to make the bird jump")
    this.y -= this.jumpSpeed;
    this.node.style.top = `${this.y}px`;
  }
}
