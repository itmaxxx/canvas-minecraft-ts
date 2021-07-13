import randomInteger from '../utils/randomMinMax';
import { Block } from './block';
import { Dirt, Stone, Grass, Air, TargetBlock, Ladder, Bedrock } from './blocksTypes';
import Camera from './camera';
import Coords from './coords';

class World {
	static BLOCK_SIZE = 64;
	static TILE_SIZE = 16;
	static WORLD_WIDTH = 120;
	static WORLD_HEIGHT = 60;

	world: Array<Array<Block>>;
	tileSetForeground: HTMLImageElement;
	tileSetBackground: HTMLImageElement;

	constructor() {
		this.world = new Array();
		this.tileSetForeground = new Image();
		this.tileSetForeground.src = 'img/texturesForeground.png';
		this.tileSetBackground = new Image();
		this.tileSetBackground.src = 'img/texturesBackground.png';
	}

	static getBlockPositionByCoords(coords: Coords): Coords {
		return new Coords(
			(coords.x - (coords.x % World.BLOCK_SIZE)) / World.BLOCK_SIZE,
			(coords.y - (coords.y % World.BLOCK_SIZE)) / World.BLOCK_SIZE
		);
	}

	drawBlock(tileset: HTMLImageElement, ctx: CanvasRenderingContext2D, coords: Coords, block: Block, camera: Camera) {
		let tileOffsetX = (block.id % World.TILE_SIZE) * World.TILE_SIZE * 2;
		let tileOffsetY = (block.id - (block.id % World.TILE_SIZE)) * 2;
		let pos = new Coords(coords.x * World.BLOCK_SIZE, coords.y * World.BLOCK_SIZE);

		ctx.drawImage(
			tileset,
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

	drawTargetBlock(ctx: CanvasRenderingContext2D, coords: Coords, camera: Camera) {
		this.drawBlock(this.tileSetForeground, ctx, coords, TargetBlock, camera);
	}

	renderBlocks(camera: Camera, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		let screenHorizontalStart = camera.offset.x,
			screenHorizontalEnd = camera.offset.x + canvas.width;
		let horizontalBlockStart = (screenHorizontalStart - (screenHorizontalStart % 64)) / 64,
			horizontalBlockEnd = (screenHorizontalEnd - (screenHorizontalEnd % 64)) / 64;
		let screenVerticalStart = camera.offset.y,
			screenVerticalEnd = camera.offset.y + canvas.height;
		let verticalBlockStart = (screenVerticalStart - (screenVerticalStart % 64)) / 64,
			verticalBlockEnd = (screenVerticalEnd - (screenVerticalEnd % 64)) / 64;

		for (let x = 0; x < this.world.length; x++) {
			for (let y = 0; y < this.world[x].length; y++) {
				if (
					x >= horizontalBlockStart &&
					x <= horizontalBlockEnd &&
					y >= verticalBlockStart &&
					y <= verticalBlockEnd + 1
				) {
					if (!this.world[x][y]) {
						continue;
					}

					if (this.world[x][y].id !== -1) {
						this.drawBlock(
							this.world[x][y].solid ? this.tileSetForeground : this.tileSetBackground,
							ctx,
							new Coords(x, y),
							this.world[x][y],
							camera
						);
					}
				}
			}
		}
	}

	generateWorld() {
		let prevHeight = 0;

		for (let x = 0; x < World.WORLD_WIDTH; x++) {
			let row: Array<Block> = [];
			let randHeight = randomInteger(0, 1);
			let height = randHeight === 1 ? prevHeight + 1 : prevHeight - 1;

			if (height >= 3) {
				height = 2;
			}

			prevHeight = height;

			for (let y = 0; y < World.WORLD_HEIGHT; y++) {
				if (y >= World.WORLD_HEIGHT - 4) {
					row.push(Bedrock);
				} else if (y > 13 - height) {
					row.push(Stone);
				} else if (y > 10 - height) {
					row.push(Dirt);
				} else if (y > 9 - height) {
					row.push(Grass);
				} else {
					row.push(Air);
				}
			}

			this.world.push(row);
		}
	}
}

export default World;
