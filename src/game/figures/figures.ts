import { Figure } from "./Figure";

export const initFigures = (ctx2d: CanvasRenderingContext2D) => [
  new Figure(
    [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    2,
    3,
    "blue",
    ctx2d
  ),
  new Figure(
    [
      [1, 1],
      [1, 1],
    ],
    2,
    2,
    "red",
    ctx2d
  ),
];
