import { Block, BlockStrength } from './block';

export const Air = new Block(-1, false, false, BlockStrength.WEAK, 'Air');
export const Stone = new Block(1, true, false, BlockStrength.STRONG, 'Stone');
export const Dirt = new Block(2, true, false, BlockStrength.WEAK, 'Dirt');
export const BackgroundDirt = new Block(2, false, false, BlockStrength.WEAK, 'Background Dirt');
export const Grass = new Block(3, true, false, BlockStrength.WEAK, 'Grass');
export const Planks = new Block(4, true, false, BlockStrength.NORMAL, 'Planks');
export const BackgroundPlanks = new Block(4, false, false, BlockStrength.NORMAL, 'Background Planks');
export const StoneSlab = new Block(5, true, false, BlockStrength.STRONG, 'Stone Slab');
export const Bricks = new Block(7, true, false, BlockStrength.STRONG, 'Bricks');
export const BackgroundBricks = new Block(7, false, false, BlockStrength.STRONG, 'BackgroundBricks');
export const CobbleStone = new Block(16, true, false, BlockStrength.STRONG, 'Cobblestone');
export const Bedrock = new Block(17, true, false, BlockStrength.INDESTRUCTABLE, 'Bedrock');
export const WoodenLog = new Block(20, true, false, BlockStrength.STRONG, 'Wooden Log');
export const BackgroundWoodenLog = new Block(20, false, false, BlockStrength.STRONG, 'Background Wooden Log');
export const Bookshelf = new Block(35, true, false, BlockStrength.NORMAL, 'Bookshelf');
export const TargetBlock = new Block(41, false, false, BlockStrength.INDESTRUCTABLE, 'Target Block');
export const Glass = new Block(49, true, false, BlockStrength.WEAK, 'Glass');
export const BackgroundGlass = new Block(49, false, false, BlockStrength.WEAK, 'Background Glass');
export const Leaves = new Block(52, false, false, BlockStrength.WEAK, 'Leaves');
export const Ladder = new Block(83, false, true, BlockStrength.NORMAL, 'Ladder');
