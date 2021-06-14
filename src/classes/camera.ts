import Coords from './coords';
import Direction from './direction';

class Camera {
	offset: Coords;
	moveDirection: Direction;
	moveSpeed: number;

	constructor(offset: Coords) {
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

export default Camera;
