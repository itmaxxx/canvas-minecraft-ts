const InventorySlot = require("./inventorySlot.ts");

class Inventory {
  activeSlotNum: number;
  slots: Array<typeof InventorySlot>;

  constructor() {
    this.slots = Array(9);

    this.slots.forEach((inventorySlot, i) => {
      inventorySlot = new InventorySlot(i, 64);
    });
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