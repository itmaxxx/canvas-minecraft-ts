class InventorySlot {
  id: number;
  quantity: number;

  constructor(id: number, quantity: number) {
    this.id = id;
    this.quantity = quantity;
  }
}

export = InventorySlot;