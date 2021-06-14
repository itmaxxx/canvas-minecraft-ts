import Coords from '../classes/coords';
import World from '../classes/world';

function pixelsToBlockPos(coords: Coords): Coords {
	return new Coords(
		(coords.x - (coords.x % World.BLOCK_SIZE)) / World.BLOCK_SIZE,
		(coords.y - (coords.y % World.BLOCK_SIZE)) / World.BLOCK_SIZE
	);
}

export default pixelsToBlockPos;
