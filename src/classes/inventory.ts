import InventorySlot from './inventorySlot';
import {
	Grass,
	Air,
	Planks,
	WoodenLog,
	BackgroundWoodenLog,
	BackgroundPlanks,
	BackgroundGlass,
	Ladder,
	Dirt,
	BackgroundBookshelf
} from './blocksTypes';

class Inventory {
	activeSlotNum: number;
	slots: Array<InventorySlot>;

	constructor() {
		this.activeSlotNum = 1;
		this.slots = Array(9);

		// for (let i = 0; i < 9; i++) {
		// 	this.slots[i] = new InventorySlot(Air, 0);
		// }

		this.slots[0] = new InventorySlot(Grass, 64);
		this.slots[1] = new InventorySlot(BackgroundBookshelf, 64);
		this.slots[2] = new InventorySlot(Planks, 64);
		this.slots[3] = new InventorySlot(BackgroundPlanks, 64);
		this.slots[4] = new InventorySlot(WoodenLog, 64);
		this.slots[5] = new InventorySlot(BackgroundWoodenLog, 64);
		this.slots[6] = new InventorySlot(BackgroundGlass, 64);
		this.slots[7] = new InventorySlot(Ladder, 64);
		this.slots[8] = new InventorySlot(Dirt, 64);
	}

	getActiveSlot(): InventorySlot {
		return this.slots[this.activeSlotNum - 1];
	}

	setActiveSlotNum(num: number) {
		if (num < 1 || num > 9) return;

		this.activeSlotNum = num;
	}
}

export default Inventory;
