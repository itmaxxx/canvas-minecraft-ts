import Camera from './camera';
import Coords from './coords';
import Direction from './direction';
import World from './world';

class Player {
	static PLAYER_SCALE = 0.4;
	static PLAYER_WIDTH = 128 * Player.PLAYER_SCALE;
	static PLAYER_HEIGHT = 260 * Player.PLAYER_SCALE;
	static PLAYER_GRAVITY = 4;

	position: Coords;
	moveDirection: Direction;
	velocity: Coords;

	isFalling: boolean;
	jumpStrength: number;
	moveSpeed: number;

	skin: HTMLImageElement;

	constructor() {
		this.position = new Coords(0, 0);
		this.moveDirection = new Direction();
		this.velocity = new Coords(0, 0);

		this.isFalling = false;
		this.jumpStrength = 26;
		this.moveSpeed = 3;

		this.skin = new Image();
		this.skin.src = 'img/skin.png';
	}

	drawPlayer(ctx: CanvasRenderingContext2D, camera: Camera) {
		ctx.drawImage(
			this.skin,
			0,
			0,
			128,
			260,
			this.position.x - camera.offset.x,
			this.position.y - camera.offset.y,
			Player.PLAYER_WIDTH,
			Player.PLAYER_HEIGHT
		);
	}

	move(world: World) {
		if (this.isFalling) {
			this.velocity.y += Player.PLAYER_GRAVITY;
		} else if (this.moveDirection.up) {
			this.velocity.y -= this.jumpStrength;
		}

    this.position.y += this.velocity.y;

		this.checkPlayerCollisionTop(world);
		this.checkPlayerCollisionBottom(world);

		if (this.moveDirection.left) {
			this.velocity.x -= this.moveSpeed;
		}
		if (this.moveDirection.right) {
			this.velocity.x += this.moveSpeed;
		}

		if (this.velocity.x < 0) {
			this.position.x += this.velocity.x;
			this.velocity.x += this.moveSpeed;

			this.checkPlayerCanMoveLeft(world);
		} else if (this.velocity.x > 0) {
			this.position.x += this.velocity.x;
			this.velocity.x -= this.moveSpeed;

			this.checkPlayerCanMoveRight(world);
		}
	}

	getPlayerBottomCoords(rightSide: boolean = false): Coords {
		return new Coords(
			rightSide ? this.position.x + Player.PLAYER_WIDTH : this.position.x,
			this.position.y + Player.PLAYER_HEIGHT
		);
	}

	setPlayerPositionByBottomCoords(coords: Coords) {
		this.position.x = coords.x;
		this.position.y = coords.y + Player.PLAYER_HEIGHT + (World.BLOCK_SIZE * 2 - Player.PLAYER_HEIGHT) * 2;
	}

	checkPlayerCanMoveLeft(world: World): boolean {
		let pBottomPos = this.getPlayerBottomCoords();
		let blockBottomPos = World.getBlockPositionByCoords(new Coords(this.position.x, pBottomPos.y - 1));
		let blockMiddlePos = World.getBlockPositionByCoords(
			new Coords(this.position.x, this.position.y + Player.PLAYER_HEIGHT / 2)
		);
		let blockTopPos = World.getBlockPositionByCoords(this.position);

		if (
			world.world[blockBottomPos.x][blockBottomPos.y] !== -1 ||
			world.world[blockMiddlePos.x][blockMiddlePos.y] !== -1 ||
			world.world[blockTopPos.x][blockTopPos.y] !== -1
		) {
			this.position.x = blockBottomPos.x * World.BLOCK_SIZE + World.BLOCK_SIZE;

			return false;
		}

		return true;
	}

	checkPlayerCanMoveRight(world: World): boolean {
		let pBottomPos = this.getPlayerBottomCoords(true);
		let blockBottomPos = World.getBlockPositionByCoords(
			new Coords(this.position.x + Player.PLAYER_WIDTH, pBottomPos.y - 1)
		);
		let blockMiddlePos = World.getBlockPositionByCoords(
			new Coords(this.position.x + Player.PLAYER_WIDTH, this.position.y + Player.PLAYER_HEIGHT / 2)
		);
		let blockTopPos = World.getBlockPositionByCoords(
			new Coords(this.position.x + Player.PLAYER_WIDTH, this.position.y)
		);

		if (
			world.world[blockBottomPos.x][blockBottomPos.y] !== -1 ||
			world.world[blockMiddlePos.x][blockMiddlePos.y] !== -1 ||
			world.world[blockTopPos.x][blockTopPos.y] !== -1
		) {
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

			this.velocity.y = 0;
		}
	}

	checkPlayerCollisionBottom(world: World) {
		let pLeftPos = this.getPlayerBottomCoords(false);
		let blockLeftPos = World.getBlockPositionByCoords(pLeftPos);
		let pRightPos = this.getPlayerBottomCoords(true);
		let blockRightPos = World.getBlockPositionByCoords(pRightPos);

		if (world.world[blockLeftPos.x][blockLeftPos.y] !== -1 || world.world[blockRightPos.x][blockRightPos.y] !== -1) {
			this.isFalling = false;
      this.velocity.y = 0;

			this.setPlayerPositionByBottomCoords(
				new Coords(this.position.x, blockLeftPos.y * World.BLOCK_SIZE - World.BLOCK_SIZE * 4)
			);
		} else {
			this.isFalling = true;
		}
	}
}

export default Player;
