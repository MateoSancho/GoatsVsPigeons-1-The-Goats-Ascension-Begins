class Worm {
 
    constructor(spawnX = 650, spawnY = 200) {
        // create node and set image
        this.node = document.createElement("img")
        this.node.src = "../images/worm.png"
        gameBoxNode.append(this.node) 

    // add the initial values of position and dimension (use uniform ENTITY_SIZE)
    this.width = ENTITY_SIZE
    this.height = ENTITY_SIZE
    // spawn at provided coordinates
    this.x = spawnX
    this.y = spawnY

        // adjust the node with the initial values
        this.node.style.width = `${this.width}px`
        this.node.style.height = `${this.height}px`
        this.node.style.position = "absolute"
        this.node.style.top = `${this.y}px`
        this.node.style.left = `${this.x}px`

        this.speed = 2
    }

    automaticMovement() {
        this.x -= this.speed
        this.node.style.left = `${this.x}px`
    }
}