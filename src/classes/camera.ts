const Coords = require("./coords.ts");
const Direction = require("./direction.ts");

class Camera {
  offset: typeof Coords;
  moveDirection: typeof Direction;
  moveSpeed: number;

  constructor(offset: typeof Coords) {
    this.offset = offset;
    this.moveDirection = new Direction();
    this.moveSpeed = 6;
  }

  move() {
    if (this.moveDirection.left) {
      this.offset.x -= this.moveSpeed;
    }
    if (this.moveDirection.right) {
      this.offset.x += this.moveSpeed;
    }
    if (this.moveDirection.up) {
      this.offset.y -= this.moveSpeed;
    }
    if (this.moveDirection.down) {
      this.offset.y += this.moveSpeed;
    }
  }
}

export = Camera;