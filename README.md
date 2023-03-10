# 2d_latform_game

This is a JavaScript code written in the canvas element of HTML5.
The canvas is an HTML element that is used to draw graphics, animations, and other visual elements on a web page. The canvas is created with the HTML <canvas> tag and has two attributes, width and height, which define the size of the canvas.

The code starts by creating Image objects and loading images into them using the "src" attribute. These images are used later to draw graphics on the canvas.

The "Player" class defines the main character of the game. It has properties such as position, velocity, speed, and sprites that define how the character looks and moves.
The "draw" method of the Player class is responsible for drawing the character on the canvas, and the "update" method is responsible for updating the character's position and animation.

The "Platform" class defines a platform that the player can stand on. It has properties such as position, width, height, and platform image. The "draw" method of the Platform class is responsible for drawing the platform on the canvas.
The "Spike" class defines a spike that the player should avoid. It has properties such as position, width, height, and spike image. The "draw" method of the Spike class is responsible for drawing the spike on the canvas.

The "canvas" variable is used to get the canvas element from the HTML document. The "context" variable is used to get the rendering context of the canvas, which is used to draw on the canvas.

The "gravity" constant is used to define the strength of the gravity in the game.

The code defines a function called animate() that is called recursively using the requestAnimationFrame() function. The animate() function first clears the canvas by filling it with a white color. Then it draws various game objects such as backgrounds, walls, spikes, and platforms using their respective draw() functions.

Next, the function updates the player's position and velocity based on the user's input using the keys object, which keeps track of the pressed keys. If the player is moving left or right, the scrollOffset variable is updated, which determines the position of the game world. The platforms, spikes, and walls are also updated to match the scrolling effect.

After updating the player's position, the function checks for collisions between the player and the platforms using a simple rectangle collision detection algorithm. If the player is standing on a platform, its vertical velocity is set to zero to simulate standing still.

Finally, the function checks for win and lose conditions. If the player falls below the screen, the game is reset by calling the init() function. If the player reaches a certain point in the game, a win message is logged to the console.

The code also defines two event listeners for the keydown and keyup events. These listeners update the keys object based on the user's input and also set the lastKey variable to keep track of the direction the player is facing.

Additionally, the code switches the player's sprite depending on the direction it is moving using a sprite switching algorithm that checks the direction of movement and the last key pressed.
