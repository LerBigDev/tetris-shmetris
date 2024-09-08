import { blockSize } from "../constants";

export class Figure {
  constructor(
    public geometry: number[][],
    public width: number,
    public height: number,
    public fill: string,
    private ctx2d: CanvasRenderingContext2D
  ) {
    this.width = geometry[0].length;
    this.height = geometry.length;
  }

  rotate = (direction: "left" | "right" = "right") => {
    const rotatedGeometry = [];
    for (let x = 0; x < this.geometry.length; x++) {
      for (let y = 0; y < this.geometry[x].length; y++) {}
    }
  };

  draw = ({ x, y }: { x: number; y: number }) => {
    const curX = x;
    const curY = y;

    // this.ctx2d.beginPath();
    for (let y = 0; y < this.geometry.length; y++) {
      for (let x = 0; x < this.geometry[y].length; x++) {
        if (this.geometry[y][x] === 0) continue;

        this.ctx2d.fillStyle = this.fill;
        this.ctx2d.fillRect(
          (curX + x) * blockSize,
          (curY + y) * blockSize,
          blockSize,
          blockSize
        );
      }
    }
    // this.ctx2d.stroke();
  };
}

/*

  |
  |     ---> rotate right --->   ________
  |__                            |    

  */
