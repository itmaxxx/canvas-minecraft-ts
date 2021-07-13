import getMousePos from '../utils/getMousePos';
import { Block, BlockStrength } from './block';
import { Air, Dirt } from './blocksTypes';
import Camera from './camera';
import Coords from './coords';
import Inventory from './inventory';
import InventorySlot from './inventorySlot';
import Player from './player';
import World from './world';

class Game {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	world: World;
	camera: Camera;
	player: Player;
	inventory: Inventory;
	targetBlockPosition: Coords;
	mousePosition: Coords;

	secondsPassed: number;
	oldTimeStamp: number;
	fps: number;

	constructor(canvasName: string) {
		this.canvas = document.getElementById(canvasName) as HTMLCanvasElement;
		this.ctx = this.canvas.getContext('2d');
		this.world = new World();
		this.camera = new Camera(new Coords(0, 0));
		this.player = new Player();
		this.player.position = new Coords((World.WORLD_WIDTH * World.BLOCK_SIZE) / 2, 0);
		this.inventory = new Inventory();
		this.targetBlockPosition = new Coords(0, 0);
		this.mousePosition = new Coords(0, 0);

		this.secondsPassed = 0;
		this.oldTimeStamp = 0;
		this.fps = 0;
	}

	handleMouseMove(e: MouseEvent) {
		this.mousePosition = getMousePos(this.canvas, e, new Coords(0, 0));
	}

	handleMouseClick(e: MouseEvent) {
		try {
			let pos = getMousePos(this.canvas, e, this.camera.offset);
			let blockPos = new Coords(
				(pos.x - (pos.x % World.BLOCK_SIZE)) / World.BLOCK_SIZE,
				(pos.y - (pos.y % World.BLOCK_SIZE)) / World.BLOCK_SIZE
			);

			if (
				this.world.world[blockPos.x][blockPos.y].id !== -1 &&
				this.world.world[blockPos.x][blockPos.y].strength !== BlockStrength.INDESTRUCTABLE
			) {
				this.world.world[blockPos.x][blockPos.y] = Air;
			}
		} catch (e) {
			console.log(e);
		}
	}

	handleContextMenuClick(e: MouseEvent) {
		try {
			e.preventDefault();

			let pos = getMousePos(this.canvas, e, this.camera.offset);
			let blockPos = new Coords(
				(pos.x - (pos.x % World.BLOCK_SIZE)) / World.BLOCK_SIZE,
				(pos.y - (pos.y % World.BLOCK_SIZE)) / World.BLOCK_SIZE
			);

			if (this.inventory.getActiveSlot().block.solid) {
				if (
					((blockPos.x * World.BLOCK_SIZE >= this.player.position.x &&
						blockPos.x * World.BLOCK_SIZE <= this.player.position.x + Player.PLAYER_WIDTH) ||
						(blockPos.x * World.BLOCK_SIZE + World.BLOCK_SIZE > this.player.position.x &&
							blockPos.x * World.BLOCK_SIZE + World.BLOCK_SIZE <= this.player.position.x + Player.PLAYER_WIDTH) ||
						(blockPos.x * World.BLOCK_SIZE + World.BLOCK_SIZE / 2 >= this.player.position.x &&
							blockPos.x * World.BLOCK_SIZE + World.BLOCK_SIZE / 2 <= this.player.position.x + Player.PLAYER_WIDTH)) &&
					((blockPos.y * World.BLOCK_SIZE > this.player.position.y &&
						blockPos.y * World.BLOCK_SIZE < this.player.position.y + Player.PLAYER_HEIGHT) ||
						(blockPos.y * World.BLOCK_SIZE + World.BLOCK_SIZE > this.player.position.y &&
							blockPos.y * World.BLOCK_SIZE + World.BLOCK_SIZE < this.player.position.y + Player.PLAYER_HEIGHT) ||
						(blockPos.y * World.BLOCK_SIZE + World.BLOCK_SIZE / 2 > this.player.position.y &&
							blockPos.y * World.BLOCK_SIZE + World.BLOCK_SIZE / 2 < this.player.position.y + Player.PLAYER_HEIGHT))
				) {
					return console.log('block intersects with player');
				}
			}

			if (this.world.world[blockPos.x][blockPos.y].id === -1 && this.inventory.getActiveSlot().block.id !== -1) {
				this.world.world[blockPos.x][blockPos.y] = this.inventory.getActiveSlot().block;

				if (
					blockPos.y < World.WORLD_HEIGHT &&
					this.inventory.getActiveSlot().block.name.toLowerCase().indexOf('background') === -1 &&
					this.world.world[blockPos.x][blockPos.y + 1].name === 'Grass'
				) {
					this.world.world[blockPos.x][blockPos.y + 1] = Dirt;
				}
			}
		} catch (e) {
			console.log(e);
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
				case 'Space':
					this.player.jumpPressed = true;
					break;
				case 'Enter':
					let blocksList: Block[] = Object.values(require('./blocksTypes'));
					let blockListText = blocksList.map((b, i) => i + ':' + b.name);

					let blockID = prompt(`Select block id from list:\n${blockListText.join('\n')}`).trim();

					if (parseInt(blockID)) {
						this.inventory.slots[this.inventory.activeSlotNum - 1] = new InventorySlot(
							blocksList[parseInt(blockID)],
							64
						);
					}
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
			case 'Space':
				this.player.jumpPressed = false;
				this.player.canJump = true;
				break;
		}
	}

	checkPlayerClimbing() {
		let playerPos = new Coords(
			this.player.position.x + Player.PLAYER_WIDTH / 2,
			this.player.position.y + Player.PLAYER_HEIGHT / 2
		);
		let playerBlockPos = new Coords(
			(playerPos.x - (playerPos.x % 64)) / World.BLOCK_SIZE,
			(playerPos.y - (playerPos.y % 64)) / World.BLOCK_SIZE
		);

		if (this.world.world[playerBlockPos.x][playerBlockPos.y].climbing) {
			this.player.isClimbing = true;
		} else {
			this.player.isClimbing = false;
		}
	}

	checkPlayerNotFallOutOfWorld() {
		if (this.player.position.x <= World.BLOCK_SIZE * 2) {
			this.player.position.x = World.BLOCK_SIZE * 2;
		} else if (
			this.player.position.x >=
			World.WORLD_WIDTH * World.BLOCK_SIZE - Player.PLAYER_WIDTH - World.BLOCK_SIZE * 2 - 1
		) {
			this.player.position.x = World.WORLD_WIDTH * World.BLOCK_SIZE - Player.PLAYER_WIDTH - World.BLOCK_SIZE * 2 - 1;
		}

		if (this.player.position.y <= World.BLOCK_SIZE) {
			this.player.position.y = World.BLOCK_SIZE;
		} else if (
			this.player.position.y >=
			World.WORLD_HEIGHT * World.BLOCK_SIZE - Player.PLAYER_HEIGHT - World.BLOCK_SIZE * 3
		) {
			this.player.position.y = World.WORLD_HEIGHT * World.BLOCK_SIZE - Player.PLAYER_HEIGHT - World.BLOCK_SIZE * 3;
		}
	}

	gameLoop(timeStamp: number) {
		this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
		this.oldTimeStamp = timeStamp;

		this.fps = Math.round(1 / this.secondsPassed);

		this.checkPlayerClimbing();

		this.player.move(this.world);

		this.checkPlayerNotFallOutOfWorld();

		this.camera.offset = new Coords(
			this.player.position.x - this.canvas.width / 2 + Player.PLAYER_WIDTH,
			this.player.position.y - this.canvas.height / 2 + Player.PLAYER_HEIGHT
		);

		this.ctx.fillStyle = '#87ceeb';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.world.renderBlocks(this.camera, this.canvas, this.ctx);

		this.targetBlockPosition = new Coords(
			(this.camera.offset.x +
				this.mousePosition.x -
				((this.camera.offset.x + this.mousePosition.x) % World.BLOCK_SIZE)) /
				World.BLOCK_SIZE,
			(this.camera.offset.y +
				this.mousePosition.y -
				((this.camera.offset.y + this.mousePosition.y) % World.BLOCK_SIZE)) /
				World.BLOCK_SIZE
		);
		this.world.drawTargetBlock(this.ctx, this.targetBlockPosition, this.camera);

		this.player.drawPlayer(this.ctx, this.camera);

		this.ctx.font = '20px Minecraft, Arial';
		this.ctx.fillStyle = 'white';
		this.ctx.fillText(
			`FPS: ${this.fps} X: ${this.player.position.x.toFixed(2)} Y: ${this.player.position.y.toFixed(2)}`,
			10,
			30
		);

		this.ctx.fillText(`Selected block: ${this.inventory.getActiveSlot().block.name}`, 10, this.canvas.height - 15);

		window.requestAnimationFrame((timeStamp: number) => this.gameLoop(timeStamp));
	}

	init() {
		this.canvas.addEventListener('mousemove', (e: MouseEvent) => this.handleMouseMove(e));
		this.canvas.addEventListener('click', (e: MouseEvent) => this.handleMouseClick(e));
		this.canvas.addEventListener('contextmenu', (e: MouseEvent) => this.handleContextMenuClick(e));
		document.getElementsByTagName('body')[0].addEventListener('keydown', (e: KeyboardEvent) => this.handleKeyDown(e));
		document.getElementsByTagName('body')[0].addEventListener('keyup', (e: KeyboardEvent) => this.handleKeyUp(e));

		this.canvas.setAttribute('style', 'cursor: url("img/crosshair.png") 8 8, default;');

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.world.generateWorld();

		window.requestAnimationFrame((timeStamp: number) => this.gameLoop(timeStamp));
	}
}

export default Game;
