import { Block, BlockStrength } from './block';

export const Air = new Block(-1, false, false, BlockStrength.WEAK);
export const Stone = new Block(1, true, false, BlockStrength.STRONG);
export const Dirt = new Block(2, true, false, BlockStrength.WEAK);
export const BackgroundDirt = new Block(2, false, false, BlockStrength.WEAK);
export const Grass = new Block(3, true, false, BlockStrength.WEAK);
export const Planks = new Block(4, true, false, BlockStrength.NORMAL);
export const BackgroundPlanks = new Block(4, false, false, BlockStrength.NORMAL);
export const StoneSlab = new Block(5, true, false, BlockStrength.STRONG);
export const Bricks = new Block(7, true, false, BlockStrength.STRONG);
export const CobbleStone = new Block(16, true, false, BlockStrength.STRONG);
export const WoodenLog = new Block(20, true, false, BlockStrength.STRONG);
export const BackgroundWoodenLog = new Block(20, false, false, BlockStrength.STRONG);
export const Bookshelf = new Block(35, true, false, BlockStrength.NORMAL);
export const TargetBlock = new Block(41, false, false, BlockStrength.INDESTRUCTABLE);
export const Glass = new Block(49, true, false, BlockStrength.WEAK);
export const Leaves = new Block(52, false, false, BlockStrength.WEAK);
export const Ladder = new Block(83, false, true, BlockStrength.NORMAL);
