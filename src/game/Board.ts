import { blockSize } from "./constants";
import { Figure } from "./figures/Figure";
import { initFigures } from "./figures/figures";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export class Board {
  private field: string[][] = [[]];
  private curFigureX: number = 0;
  private curFigureY: number = 0;
  private figures: Figure[];
  private curFigure: Figure;
  private figuresCount: number;
  private isCollisionCheck: boolean = false;

  constructor(
    private width: number,
    private height: number,
    private ctx2d: CanvasRenderingContext2D
  ) {
    for (let y = 0; y < height; y++) {
      this.field[y] = [];
      for (let x = 0; x < width; x++) {
        this.field[y][x] = "0";
      }
    }
    // console.log({
    //   field: this.field,
    // });
    this.figures = initFigures(this.ctx2d);
    this.figuresCount = this.figures.length;
    this.curFigure = this.figures[getRandomInt(this.figuresCount)];
  }

  collision = ({ curX, curY }: { curX: number; curY: number }) => {
    for (let y = 0; y < this.curFigure.height; y++) {
      for (let x = 0; x < this.curFigure.width; x++) {
        // console.log({
        //   fY: this.curFigureY,
        //   fX: this.curFigureX,
        //   y,
        //   x,
        // });
        const checkX = curX + x;
        const checkY = curY + y;
        if (this.curFigure.geometry[y][x] === 0) continue;
        if (
          checkY === this.height - 1 ||
          checkX === this.width ||
          this.field[checkY + 1][checkX] !== "0"
        ) {
          console.log("collision");
          return true;
        }
      }
    }
    return false;
  };

  merge = () => {
    const w = this.curFigure.width;
    const h = this.curFigure.height;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (this.curFigure.geometry[y][x] === 0) continue;
        this.field[y + this.curFigureY][x + this.curFigureX] =
          this.curFigure.fill;
      }
    }

    // console.log(JSON.stringify(this.field));
  };

  drawField = () => {
    const w = this.width;
    const h = this.height;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (this.field[y][x] === "0") continue;
        this.ctx2d.fillStyle = this.field[y][x];
        this.ctx2d.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  };

  getRandomFigure = () => {
    return this.figures[getRandomInt(this.figuresCount)];
  };

  newFigure = () => {
    this.curFigureX = 0;
    this.curFigureY = 0;
    this.curFigure = this.getRandomFigure();
  };

  clearAndDrawField = () => {
    this.ctx2d.clearRect(0, 0, this.width * blockSize, this.height * blockSize);
    this.drawField();
  };

  start = () => {
    let turn = 0;

    const releaseKey = () => {
      this.isCollisionCheck = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (this.isCollisionCheck) return;
      this.isCollisionCheck = true;

      let newX = this.curFigureX;
      if (e.code === "ArrowRight") {
        newX = this.curFigureX + 1;
      }

      if (e.code === "ArrowLeft") {
        newX = this.curFigureX - 1;
      }

      if (this.curFigure.width + newX > this.width || newX < 0) {
        releaseKey();
        return;
      }

      if (
        this.collision({
          curX: newX,
          curY: this.curFigureY - 1,
        })
      ) {
        releaseKey();
        return;
      }

      this.curFigureX = newX;

      this.clearAndDrawField();
      this.curFigure.draw({
        x: this.curFigureX,
        y: this.curFigureY,
      });

      releaseKey();
    };

    document.addEventListener("keydown", handleKeyDown);

    setInterval(() => {
      if (
        this.collision({
          curX: this.curFigureX,
          curY: this.curFigureY,
        })
      ) {
        this.merge();
        this.drawField();
        this.newFigure();
        return;
      }
      turn++;
      this.curFigureY++;
    }, 500);

    const frame = () => {
      requestAnimationFrame(frame);

      /// time limit
      if (turn > 1000) return;

      if (this.curFigureY + this.curFigure.height > this.height) {
        this.newFigure();
      }

      this.ctx2d.clearRect(
        0,
        0,
        this.width * blockSize,
        this.height * blockSize
      );
      this.drawField();

      this.curFigure.draw({
        x: this.curFigureX,
        y: this.curFigureY,
      });
    };

    frame();
  };
}
