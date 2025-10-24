GoatsVSPigeons: The Goat Ascension Begins

Play Now: https://mateosancho.github.io/GoatsVsPigeons-1-The-Goats-Ascension-Begins/


Description:
You are a Goat, trying to survive a Pigeon attack. Do you thought i would try to sell my game? Really?


Main Functionalities:
 - Character movement (jump, move left/right, fall down)

 - Collision detection with enemies and projectiles

 - Life system with 3 lives

 - Score tracking and timer

 - Pigeon enemies that shoot worms

 - Game states: Start screen, Game screen, Game over screen

 - Sound effects for actions

 - Local high score storage


Technologies used:
 - HTML5

 - CSS3

 - JavaScript

 - DOM Manipulation


States:
 - Start Screen: Main menu with game title and start button

 - Game Screen: Active gameplay with score, lives, and timer display

 - Game Over Screen: Final score display and restart option

Project Structure:
 - main.js:
  - Global DOM elements and game variables
  - startGame() - Initialize game state and elements
  - createGameUI() - Create game interface elements
  - updateUI() - Update score, lives, and timer displays
  - wormSpawn() - Handle worm projectile spawning
  - checkGoatWormCollision() - Detect collisions with worms
  - loseLife() - Handle life system and visual feedback
  - gameOver() - End game and show results
  - resetGame() - Reset game to initial state
  - gameLoop() - Main game loop (60fps)
  - Event listeners for keyboard controls

 - goat.js:
  - Goat class with position and movement properties
  - jump() - Vertical movement with sound and visual feedback
  - fall() - Downward movement
  - left() - Left movement
  - right() - Right movement

 - pigeon.js
  - Pigeon class with position properties

 - worm.js
  - Worm class with spawn position
  - automaticMovement() - Horizontal movement across screen

 - sounds.js
  - Sound class for audio management
  - Sound effects for jump and game over


Slides
https://docs.google.com/presentation/d/1ccsynOf_VIxXJbnwMrDYzIoxGNyO1zkCmhZvMOKFEyU/edit?slide=id.p#slide=id.p
