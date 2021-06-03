import Camera from "./camera";
import Coords from "./coords";
import Direction from "./direction";
import World from "./world";

class Player {
  static PLAYER_SCALE = 0.4;
  static PLAYER_WIDTH = 128 * Player.PLAYER_SCALE;
  static PLAYER_HEIGHT = 260 * Player.PLAYER_SCALE;
  static PLAYER_GRAVITY = 9.8;

  position: Coords;
  moveDirection: Direction;

  isFalling: boolean;
  jumpStrength: number;
  moveSpeed: number;

  delta: Coords;

  skin: HTMLImageElement;

  constructor() {
    this.position = new Coords(0, 0);
    this.moveDirection = new Direction();

    this.isFalling = false;
    this.jumpStrength = 40;
    this.moveSpeed = 3;

    this.delta = new Coords(0, 0);

    this.skin = new Image();
    this.skin.src = 'img/skin.png';
  }

  drawPlayer(ctx: CanvasRenderingContext2D, camera: Camera) {
    ctx.drawImage(this.skin, 0, 0, 128, 260, this.position.x - camera.offset.x, this.position.y - camera.offset.y, Player.PLAYER_WIDTH, Player.PLAYER_HEIGHT);
  }

  move(world: World) {
    this.checkPlayerCollisionTop(world);
    this.checkPlayerCollisionBottom(world);

    if (this.isFalling) {
      this.delta.y -= Player.PLAYER_GRAVITY;
    }
    // else {
    //   this.delta.y = 0;
    // }

    if (this.delta.y < 0) {
      this.position.y -= this.delta.y;

      let newVal = this.delta.y + Player.PLAYER_GRAVITY;

      if (newVal < 0) {
        newVal = 0;
      }

      this.delta.y = newVal;
    } else if (this.delta.y > 0) {
      this.position.y -= this.delta.y;

      let newVal = this.delta.y + Player.PLAYER_GRAVITY;

      if (newVal > 0) {
        newVal = 0;
      }

      this.delta.y = newVal;
    }

    if (this.moveDirection.left) {
      this.position.x -= this.moveSpeed;
  
      this.checkPlayerCanMoveLeft(world);
    }
    if (this.moveDirection.right) {
      this.position.x += this.moveSpeed;
  
      this.checkPlayerCanMoveRight(world);
    }
    if (this.moveDirection.up && !this.isFalling) {
      this.delta.y += this.jumpStrength;
    }
  }

  getPlayerBottomCoords(rightSide: boolean = false): Coords {
    return new Coords(rightSide ? this.position.x + Player.PLAYER_WIDTH : this.position.x, this.position.y + Player.PLAYER_HEIGHT);
  }
  
  setPlayerPositionByBottomCoords(coords: Coords) {
    this.position.x = coords.x;
    this.position.y = coords.y + Player.PLAYER_HEIGHT + ((World.BLOCK_SIZE * 2 - Player.PLAYER_HEIGHT) * 2);
  }

  checkPlayerCanMoveLeft(world: World): boolean {
    let pBottomPos = this.getPlayerBottomCoords();
    let blockBottomPos = World.getBlockPositionByCoords(new Coords(this.position.x, pBottomPos.y - 1));
    let blockMiddlePos = World.getBlockPositionByCoords(new Coords(this.position.x, this.position.y + (Player.PLAYER_HEIGHT / 2)));
    let blockTopPos = World.getBlockPositionByCoords(this.position);
  
    if (world.world[blockBottomPos.x][blockBottomPos.y] !== -1 || world.world[blockMiddlePos.x][blockMiddlePos.y] !== -1 || world.world[blockTopPos.x][blockTopPos.y] !== -1) {
      this.position.x = blockBottomPos.x * World.BLOCK_SIZE + World.BLOCK_SIZE;
      
      return false;
    }
  
    return true;
  }
  
  checkPlayerCanMoveRight(world: World): boolean {
    let pBottomPos = this.getPlayerBottomCoords(true);
    let blockBottomPos = World.getBlockPositionByCoords(new Coords(this.position.x + Player.PLAYER_WIDTH, pBottomPos.y - 1));
    let blockMiddlePos = World.getBlockPositionByCoords(new Coords(this.position.x + Player.PLAYER_WIDTH, this.position.y + (Player.PLAYER_HEIGHT / 2)));
    let blockTopPos = World.getBlockPositionByCoords(new Coords(this.position.x + Player.PLAYER_WIDTH, this.position.y));
  
    if (world.world[blockBottomPos.x][blockBottomPos.y] !== -1 || world.world[blockMiddlePos.x][blockMiddlePos.y] !== -1 || world.world[blockTopPos.x][blockTopPos.y] !== -1) {
      this.position.x = blockBottomPos.x * World.BLOCK_SIZE - Player.PLAYER_WIDTH - 0.1;
          
      return false;
    }
  
    return true;
  }
  
  checkPlayerCollisionTop(world: World) {
    let pLeftPos = new Coords(this.position.x, this.position.y - 1);
    let blockLeftPos = World.getBlockPositionByCoords(pLeftPos);
    let pRightPos = new Coords(this.position.x + Player.PLAYER_WIDTH, this.position.y - 1);
    let blockRightPos = World.getBlockPositionByCoords(pRightPos);
  
    if (world.world[blockLeftPos.x][blockLeftPos.y] !== -1 || world.world[blockRightPos.x][blockRightPos.y] !== -1) {
      this.position.y = blockLeftPos.y * World.BLOCK_SIZE + World.BLOCK_SIZE;

      // this.position.y = blockLeftPos.y * World.BLOCK_SIZE - (World.BLOCK_SIZE * 4);

      this.delta.y = 0;
    }
  }
  
  checkPlayerCollisionBottom(world: World) {
    let pLeftPos = this.getPlayerBottomCoords(false);
    let blockLeftPos = World.getBlockPositionByCoords(pLeftPos);
    let pRightPos = this.getPlayerBottomCoords(true);
    let blockRightPos = World.getBlockPositionByCoords(pRightPos);
  
    if (world.world[blockLeftPos.x][blockLeftPos.y] !== -1 || world.world[blockRightPos.x][blockRightPos.y] !== -1) {
      this.isFalling = false;
      
      this.setPlayerPositionByBottomCoords(new Coords(this.position.x, blockLeftPos.y * World.BLOCK_SIZE - (World.BLOCK_SIZE * 4)));
    } else {
      this.isFalling = true;
    }
  }
}

export default Player;