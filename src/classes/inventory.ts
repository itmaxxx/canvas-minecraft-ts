const InventorySlot = require("./inventorySlot.ts");

class Inventory {
  activeSlotNum: number;
  slots: Array<typeof InventorySlot>;

  constructor() {
    this.activeSlotNum = 0;
    this.slots = Array(9);

    for (let i = 0; i < this.slots.length; i++) {
      this.slots[i] = new InventorySlot(i + 1, 64);
    }
  }

  getActiveSlot(): typeof InventorySlot {
    return this.slots[this.activeSlotNum];
  }

  setActiveSlotNum(num: number) {
    if (num < 1 || num > 9) return; 

    this.activeSlotNum = num;
  }
}

export = Inventory;