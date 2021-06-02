const getMousePos = require("../utils/getMousePos.ts");
const Camera = require("./camera.ts");
const Coords = require("./coords.ts");
const Inventory = require("./inventory.ts");
const Player = require("./player.ts");
const World = require("./world.ts");

class Game {
  static GRAVITY = 1.3;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  world: typeof World;
  camera: typeof Camera;
  player: typeof Player;
  inventory: typeof Inventory;

  secondsPassed: number;
  oldTimeStamp: number;
  fps: number;

  constructor(canvasName: string) {
    this.canvas = document.getElementById(canvasName) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.world = new World();
    this.camera = new Camera(new Coords(0, 0));
    this.player = new Player();
    this.inventory = new Inventory();

    this.secondsPassed = 0;
    this.oldTimeStamp = 0;
    this.fps = 0;
  }

  handleMouseClick(e: MouseEvent) {
    let pos = getMousePos(this.canvas, e, this.camera.offset);
    let blockPos = new Coords((pos.x - (pos.x % World.BLOCK_SIZE)) / World.BLOCK_SIZE, (pos.y - (pos.y % World.BLOCK_SIZE)) / World.BLOCK_SIZE);
  
    if (this.world.world[blockPos.x][blockPos.y] !== -1) {
      this.world.world[blockPos.x][blockPos.y] = -1;
    }
  }

  handleContextMenuClick(e: MouseEvent) {
    e.preventDefault();
  
    let pos = getMousePos(this.canvas, e, this.camera.offset);
    let blockPos = new Coords((pos.x - (pos.x % World.BLOCK_SIZE)) / World.BLOCK_SIZE, (pos.y - (pos.y % World.BLOCK_SIZE)) / World.BLOCK_SIZE);
  
    if (this.world.world[blockPos.x][blockPos.y] === -1) {
      this.world.world[blockPos.x][blockPos.y] = this.inventory.getActiveSlot().id;
    }
  }

  handleKeyDown(e: KeyboardEvent) {
    if (parseInt(e.key) >= 1 && parseInt(e.key) <= 9) {
      this.inventory.setActiveSlotNum(parseInt(e.key));
    } else {
      switch (e.code) {
        case 'KeyA':
          this.player.moveDirection.left = true;
          break;
        case 'KeyD':
          this.player.moveDirection.right = true;
          break;
        case 'KeyW':
          this.player.moveDirection.up = true;
          break;
        case 'KeyS':
          this.player.moveDirection.down = true;
          break;
        case 'ArrowLeft':
          this.camera.moveDirection.left = true;
          break;
        case 'ArrowRight':
          this.camera.moveDirection.right = true;
          break;
        case 'ArrowUp':
          this.camera.moveDirection.up = true;
          break;
        case 'ArrowDown':
          this.camera.moveDirection.down = true;
          break;
      }
    }
  }
  
  handleKeyUp(e: KeyboardEvent) {
    switch (e.code) {
      case 'KeyA':
        this.player.moveDirection.left = false;
        break;
      case 'KeyD':
        this.player.moveDirection.right = false;
        break;
      case 'KeyW':
        this.player.moveDirection.up = false;
        break;
      case 'KeyS':
        this.player.moveDirection.down = false;
        break;
      case 'ArrowLeft':
        this.camera.moveDirection.left = false;
        break;
      case 'ArrowRight':
        this.camera.moveDirection.right = false;
        break;
      case 'ArrowUp':
        this.camera.moveDirection.up = false;
        break;
      case 'ArrowDown':
        this.camera.moveDirection.down = false;
        break;
    }
  }

  gameLoop(timeStamp: number) {
    this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;
  
    this.fps = Math.round(1 / this.secondsPassed);
  
    this.player.move(this.world);
  
    this.camera.move();
  
    this.ctx.fillStyle = '#87ceeb';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
    this.world.renderBlocks(this.camera, this.canvas, this.ctx);
  
    this.player.drawPlayer(this.ctx, this.camera);
  
    // drawInventoryBar();
  
    this.ctx.font = '25px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`FPS: ${this.fps} X: ${this.player.position.x.toFixed(2)} Y: ${this.player.position.y.toFixed(2)} OX: ${this.camera.offset.x} OY: ${this.camera.offset.y}`, 10, 30);
  
    window.requestAnimationFrame((timeStamp: number) => this.gameLoop(timeStamp));
  }

  init() {
    this.canvas.addEventListener('click', (e: MouseEvent) => this.handleMouseClick(e));
    this.canvas.addEventListener('contextmenu', (e: MouseEvent) => this.handleContextMenuClick(e));
    document.getElementsByTagName('body')[0].addEventListener('keydown', (e:KeyboardEvent) => this.handleKeyDown(e));
    document.getElementsByTagName('body')[0].addEventListener('keyup', (e: KeyboardEvent) => this.handleKeyUp(e));

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.world.generateWorld();

    window.requestAnimationFrame((timeStamp: number) => this.gameLoop(timeStamp));
  }
}

export = Game;