import Camera from './camera';
import Coords from './coords';

class World {
	static BLOCK_SIZE = 64;
	static TILE_SIZE = 16;
	static WORLD_WIDTH = 120;
	static WORLD_HEIGHT = 60;

	world: Array<Array<number>>;
	tileSet: HTMLImageElement;

	constructor() {
		this.world = new Array();
		this.tileSet = new Image();
		this.tileSet.src = 'img/textures.png';
	}

	static getBlockPositionByCoords(coords: Coords): Coords {
		return new Coords(
			(coords.x - (coords.x % World.BLOCK_SIZE)) / World.BLOCK_SIZE,
			(coords.y - (coords.y % World.BLOCK_SIZE)) / World.BLOCK_SIZE
		);
	}

	drawBlock(ctx: CanvasRenderingContext2D, coords: Coords, blockID: number, camera: Camera) {
		let tileOffsetX = (blockID % World.TILE_SIZE) * World.TILE_SIZE * 2;
		let tileOffsetY = (blockID - (blockID % World.TILE_SIZE)) * 2;
		let pos = new Coords(coords.x * World.BLOCK_SIZE, coords.y * World.BLOCK_SIZE);

		ctx.drawImage(
			this.tileSet,
			tileOffsetX,
			tileOffsetY,
			World.TILE_SIZE * 2,
			World.TILE_SIZE * 2,
			pos.x - camera.offset.x,
			pos.y - camera.offset.y,
			World.BLOCK_SIZE,
			World.BLOCK_SIZE
		);
	}

	renderBlocks(camera: Camera, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		let screenHorizontalStart = camera.offset.x,
			screenHorizontalEnd = camera.offset.x + canvas.width;
		let horizontalBlockStart = (screenHorizontalStart - (screenHorizontalStart % 64)) / 64,
			horizontalBlockEnd = (screenHorizontalEnd - (screenHorizontalEnd % 64)) / 64;
		let screenVerticalStart = camera.offset.y,
			screenVerticalEnd = camera.offset.y + canvas.width;
		let verticalBlockStart = (screenVerticalStart - (screenVerticalStart % 64)) / 64,
			verticalBlockEnd = (screenVerticalEnd - (screenVerticalEnd % 64)) / 64;

		for (let y = 0; y < this.world.length; y++) {
			for (let x = 0; x < this.world[y].length; x++) {
				if (
					x >= horizontalBlockStart &&
					x <= horizontalBlockEnd &&
					y >= verticalBlockStart &&
					y <= verticalBlockEnd + 1
				) {
					if (this.world[x][y] !== -1) {
						this.drawBlock(ctx, new Coords(x, y), this.world[x][y], camera);
					}
				}
			}
		}
	}

	generateWorld() {
		for (let x = 0; x < World.WORLD_WIDTH; x++) {
			let row = [];

			for (let y = 0; y < World.WORLD_HEIGHT; y++) {
				if (y > 10) {
					row.push(1);
				} else if (y > 8) {
					row.push(2);
				} else if (y > 7) {
					row.push(3);
				} else {
					row.push(-1);
				}
			}

			this.world.push(row);
		}
	}
}

export default World;
