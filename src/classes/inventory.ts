import InventorySlot from './inventorySlot';
import { Grass, Dirt, Stone, Air, BackgroundDirt, Ladder } from './blockTypes';

class Inventory {
	activeSlotNum: number;
	slots: Array<InventorySlot>;

	constructor() {
		this.activeSlotNum = 1;
		this.slots = Array(9);

		for (let i = 0; i < 9; i++) {
      this.slots[i] = new InventorySlot(Air, 0);
    }

    this.slots[0] = new InventorySlot(Grass, 64);
		this.slots[1] = new InventorySlot(Dirt, 64);
		this.slots[2] = new InventorySlot(Stone, 64);
		this.slots[3] = new InventorySlot(BackgroundDirt, 64);
		this.slots[4] = new InventorySlot(Ladder, 64);
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
