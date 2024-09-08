import { useEffect, useRef } from "react";
import { Board } from "./game/Board";
import { blockSize } from "./game/constants";

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleStart = () => {
    const height = 20;
    const width = 20;
    const canvas = canvasRef.current;
    if (!window.ctx2d || !canvas) {
      throw Error("Canvas not initiated");
    }
    canvas.width = width * blockSize;
    canvas.height = height * blockSize;
    canvas.style.border = "1px solid black";
    canvas.style.display = "block";
    const board = new Board(width, height, window.ctx2d);
    board.start();
  };

  /// canvas init
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw Error("Canvas not initiated");
    }
    const canvasCtx = canvas.getContext("2d");

    if (!canvasCtx) {
      throw Error("Canvas context not initiated");
    }
    window.ctx2d = canvasCtx;
  }, []);

  return (
    <div>
      <button onClick={handleStart}>Start</button>
      <canvas
        ref={canvasRef}
        style={{
          display: "none",
        }}
      ></canvas>
    </div>
  );
}
