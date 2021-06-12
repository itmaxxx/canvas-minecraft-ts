import { Block } from "./block";

class InventorySlot {
	block: Block;
	quantity: number;

	constructor(block: Block, quantity: number) {
		this.block = block;
		this.quantity = quantity;
	}
}

export default InventorySlot;
