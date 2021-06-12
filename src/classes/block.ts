export enum BlockStrength { WEAK, NORMAL, STRONG, STRONGER, INDESTRUCTABLE }

export class Block {
  id: number;
  solid: boolean;
  climbing: boolean;
  strength: BlockStrength;

  constructor (id: number, solid: boolean, climbing: boolean, strength: BlockStrength) {
    this.id = id;
    this.solid = solid;
    this.climbing = climbing;
    this.strength = strength;
  }
}
