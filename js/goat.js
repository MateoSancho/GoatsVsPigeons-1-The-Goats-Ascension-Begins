class Goat {
    constructor() {
        //this is where the properties will be defined
        this.node = document.createElement("img") // <img />
        this.node.src ="../images/Goat normal.png"  //<img src="./images/flappy.png"/>
        gameBoxNode.append(this.node) // to add the node to the game-box on bird creation

        // add the initial values of position and dimension
        this.width = 100
        this.height = 100
        this.x = 50
        this.y = 275

        // adjust the node with the initial values
        this.node.style.width = `${this.width}px`
        this.node.style.height = `${this.height}px`
        this.node.style.position = "absolute"
        this.node.style.top = `${this.y}px`
        this.node.style.left = `${this.x}px`
    }
}