import InventorySlot from './inventorySlot';

class Inventory {
	activeSlotNum: number;
	slots: Array<InventorySlot>;

	constructor() {
		this.activeSlotNum = 0;
		this.slots = Array(9);

		for (let i = 0; i < this.slots.length; i++) {
			this.slots[i] = new InventorySlot(i + 1, 64);
		}
	}

	getActiveSlot(): InventorySlot {
		return this.slots[this.activeSlotNum];
	}

	setActiveSlotNum(num: number) {
		if (num < 1 || num > 9) return;

		this.activeSlotNum = num;
	}
}

export default Inventory;
