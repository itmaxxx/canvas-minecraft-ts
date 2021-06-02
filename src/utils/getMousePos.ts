const Coords = require("../classes/coords.ts");

function getMousePos(canvas: HTMLCanvasElement, e: MouseEvent, offset: typeof Coords): typeof Coords {
  let rect = canvas.getBoundingClientRect();
  
  return new Coords(
    e.clientX - rect.left + offset.x,
    e.clientY - rect.top + offset.y
  );
}

export = getMousePos;