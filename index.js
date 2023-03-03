const platform = new Image();
platform.src = "./images/Pad_3_3.png";

const gameBackground = new Image();
gameBackground.src = "./images/War.JPG";

const spike = new Image();
spike.src = "./images/Pad_3_4.png";

const backWall = new Image();
backWall.src = "./images/Wall1.png";

const spriteIdle = new Image();
spriteIdle.src = "./images/Idle.png";
const spriteIdleLeft = new Image();
spriteIdleLeft.src = "./images/Idleleft.png";
const spriterun = new Image();
spriterun.src = "./images/Run.png";
const spriteRunLeft = new Image();
spriteRunLeft.src = "./images/Runleft.png";
const spriteJump = new Image();
spriteJump.src = "./images/Jump.png";
const spriteJumpLeft = new Image();
spriteJumpLeft.src = "./images/Jumpleft.png";

const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

console.log(context);

const gravity = 1.5;

// x= horizontal cordinate, y = vertical cordinate
class Player {
  constructor() {
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.width = 120;
    this.height = 200;
    this.stand = spriteIdle;
    this.run = spriterun;
    this.standleft = spriteIdleLeft;
    this.runleft = spriteRunLeft;

    this.frames = 0;
    this.sprites = {
      stand: {
        right: spriteIdle,
        left:  spriteIdleLeft,
        cropWith: 67,
        width: 120
        
      },
      run: {
        right: spriterun,
        left:  spriteRunLeft,
        cropWith: 72,
        width: 120
      },
    };

    this.currentSprite = this.sprites.stand.right;
    this.currentCropWith = 67
  }

  

  draw() {
    context.drawImage(
      this.currentSprite,
      this.currentCropWith * this.frames,
      0,
      this.currentCropWith,
      86,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;
    if (this.frames >=  4 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left ))
    this.frames = 0;
    else if (this.frames >= 7 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left))
    this.frames = 0;

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
  }
}

class Platform {
  constructor({ x, y, platform }) {
    this.position = {
      x: x,
      y: y,
    };
    this.platform = platform;
    this.width = platform.width;
    this.height = platform.height;
  }

  draw() {
    context.drawImage(this.platform, this.position.x, this.position.y);
  }
}

class Spike {
  constructor({ x, y, spike }) {
    this.position = {
      x: x,
      y: y,
    };
    this.spike = spike;
    this.width = spike.width * 1.6;
    this.height = spike.height * 2;
  }

  draw() {
    context.drawImage(
      this.spike,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Background {
  constructor({ x, y, gameBackground }) {
    this.position = {
      x: x,
      y: y,
    };
    this.background = gameBackground;
  }

  draw() {
    context.drawImage(
      this.background,
      this.position.x,
      this.position.y,
      canvas.width,
      canvas.height
    );
  }
}

class Wall {
  constructor({ x, y, backWall }) {
    this.position = {
      x: x,
      y: y,
    };
    this.wall = backWall;
  }

  draw() {
    context.drawImage(
      this.wall,
      this.position.x,
      this.position.y,
      canvas.width,
      canvas.height
    );
  }
}

let player = new Player();

let platforms = [
  new Platform({ x: 20, y: 450, platform: platform }),
  new Platform({ x: 500, y: 250, platform: platform }),
  new Platform({ x: 1160, y: 400, platform: platform }),
  new Platform({ x: 1572, y: 400, platform: platform }),
  new Platform({ x: 2000, y: 250, platform: platform }),
  new Platform({ x: 2500, y: 170, platform: platform }),
  new Platform({ x: 3000, y: 400, platform: platform }),
];

let spikes = [
  new Spike({ x: -400, y: 450, spike: spike }),
  new Spike({ x: 500, y: 400, spike: spike }),
  new Spike({ x: 1160, y: 400, spike: spike }),
  new Spike({ x: 1572, y: 450, spike: spike }),
  new Spike({ x: 2000, y: 400, spike: spike }),
];

let background = [new Background({ x: 0, y: 0, gameBackground })];

let wall = [
  new Wall({ x: 0, y: 0, backWall }),
  new Wall({ x: 1000, y: 0, backWall }),
];

let lastKey

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOfSet = 0;

function init() {
  player = new Player();

  platforms = [
    new Platform({ x: 20, y: 450, platform: platform }),
    new Platform({ x: 500, y: 250, platform: platform }),
    new Platform({ x: 1160, y: 400, platform: platform }),
    new Platform({ x: 1572, y: 400, platform: platform }),
    new Platform({ x: 2000, y: 250, platform: platform }),
    new Platform({ x: 2500, y: 170, platform: platform }),
    new Platform({ x: 3000, y: 400, platform: platform }),
  ];

  spikes = [
    new Spike({ x: -400, y: 450, spike: spike }),
    new Spike({ x: 500, y: 400, spike: spike }),
    new Spike({ x: 1160, y: 400, spike: spike }),
    new Spike({ x: 1572, y: 450, spike: spike }),
    new Spike({ x: 2000, y: 400, spike: spike }),
  ];

  background = [new Background({ x: 0, y: 0, gameBackground })];

  wall = [
    new Wall({ x: 0, y: 0, backWall }),
    new Wall({ x: 1000, y: 0, backWall }),
  ];

  scrollOfSet = 0;
}

function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  background.forEach((background) => {
    background.draw();
  });
  wall.forEach((wall) => {
    wall.draw();
  });
  spikes.forEach((spike) => {
    spike.draw();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });

  player.update();

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOfSet += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
    } else if (keys.left.pressed) {
      scrollOfSet -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
    }

    if (keys.right.pressed) {
      scrollOfSet += player.speed * 0.5;
      spikes.forEach((spike) => {
        spike.position.x -= player.speed * 0.5;
      });
    } else if (keys.left.pressed) {
      scrollOfSet -= player.speed * 0.5;
      spikes.forEach((spike) => {
        spike.position.x += 2;
      });
    }

    if (keys.right.pressed) {
      scrollOfSet += player.speed * 0.4;
      wall.forEach((wall) => {
        wall.position.x -= player.speed * 0.4;
      });
    } else if (keys.left.pressed) {
      scrollOfSet -= player.speed * 0.4;
      wall.forEach((wall) => {
        wall.position.x += player.speed * 0.4;
      });
    }
  }

  // platfrom colision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + platform.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

// sprite switching

  if (
    keys.right.pressed &&
    lastKey === 'right' && player.currentSprite !== player.sprites.run.right) {
    player.frames = 1
    player.currentSprite = player.sprites.run.right
      player.currentCropWith = player.sprites.run.cropWith
      player.width = player.sprites.run.width
  } else if (
    keys.left.pressed &&
    lastKey === 'left' && 
    player.currentSprite !== player.sprites.run.left)
     {
    player.currentSprite = player.sprites.run.left
      player.currentCropWith = player.sprites.run.cropWith
      player.width = player.sprites.run.width 
    } else if (
      !keys.left.pressed &&
      lastKey == 'left' && player.currentSprite !== player.sprites.stand.left
    ) {
      player.currentSprite = player.sprites.stand.left
      player.currentCropWith = player.sprites.stand.cropWith
      player.width = player.sprites.stand.width 
      
    } else if (
      !keys.right.pressed &&
      lastKey == 'right' && player.currentSprite !== player.sprites.stand.right
    ) {
      player.currentSprite = player.sprites.stand.right
      player.currentCropWith = player.sprites.stand.cropWith
      player.width = player.sprites.stand.width 
      
    }
    


  


  // win condition
  if (scrollOfSet > 5400) {
    console.log("you win");
  }
  //lose condition
  if (player.position.y > canvas.height) {
    init();
  }
}

init();
animate();

window.addEventListener("keydown", ({ key }) => {
  console.log(key);
  switch (key) {
    case "a":
      console.log("left");
      keys.left.pressed = true;
      lastKey = 'left'
      break;

    case "d":
      console.log("right");
      keys.right.pressed = true;
      lastKey = 'right'
      break;

    case "s":
      console.log("down");
      break;

    case "w":
      console.log("up");
      player.velocity.y -= 25;
      break;
  }
});

window.addEventListener("keyup", ({ key }) => {
  console.log(key);
  switch (key) {
    case "a":
      console.log("left");
      keys.left.pressed = false;
      break;

    case "d":
      console.log("right");
      keys.right.pressed = false;
      
      break;

    case "s":
      console.log("down");
      break;

    case "w":
      console.log("up");

      break;
  }
});
