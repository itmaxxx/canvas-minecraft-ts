import { Block, BlockStrength } from './block';

export const Air = new Block(-1, false, false, BlockStrength.WEAK);
export const Stone = new Block(1, true, false, BlockStrength.STRONG);
export const Dirt = new Block(2, true, false, BlockStrength.WEAK);
export const BackgroundDirt = new Block(2, false, false, BlockStrength.WEAK);
export const Grass = new Block(3, true, false, BlockStrength.WEAK);
export const TargetBlock = new Block(41, false, false, BlockStrength.INDESTRUCTABLE);
export const Ladder = new Block(83, false, true, BlockStrength.NORMAL);