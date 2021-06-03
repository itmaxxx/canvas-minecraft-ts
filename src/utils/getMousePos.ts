import Coords from "../classes/coords";

function getMousePos(canvas: HTMLCanvasElement, e: MouseEvent, offset: Coords): Coords {
  let rect = canvas.getBoundingClientRect();
  
  return new Coords(
    e.clientX - rect.left + offset.x,
    e.clientY - rect.top + offset.y
  );
}

export default getMousePos;