"use client";
import React, { useState } from "react";

type PlayerType = "X" | "0";
type BoardType = Array<Array<PlayerType>>;

const getBoard = (n: number): BoardType => {
  return Array.from({ length: n }, () => Array.from({ length: n }));
};

const TicTakToe = () => {
  const [n, setN] = useState(3);
  const [player, setPlayer] = useState<PlayerType>("0");
  const [board, setBoard] = useState<BoardType>(getBoard(n));

  const togglePlayer = () => {
    setPlayer((player) => (player === "0" ? "X" : "0"));
  };

  const handleStart = () => {
    setN(n);
    setBoard(getBoard(n));
  };

  const handleReset = () => {
    setBoard(getBoard(n));
  };

  const handleCellClick = (rowIdx: number, colIdx: number) => {
    if (!board[rowIdx][colIdx]) {
      board[rowIdx][colIdx] = player as PlayerType;
      const winner = checkWinner(board);
      setBoard([...board]);
      console.log(winner);

      if (winner) {
        alert("winner");
      } else {
        togglePlayer();
      }
    }
  };

  const checkWinner = (board: BoardType): PlayerType | null => {
    // check rows
    for (const row of board) {
      if (row.every((cell) => cell === row[0])) {
        return row[0] as PlayerType;
      }
    }

    // check cols
    for (let col = 0; col < n; col++) {
      let isWinner = true;
      for (let row = 0; row < n; row++) {
        if (board[row][col] && board[row][col] !== board[0][col]) {
          isWinner = false;
        }
      }
      if (isWinner && board[0][col]) {
        return board[0][col] as PlayerType;
      }
    }

    // main diagonal
    let winner = true;
    for (let i = 0; i < n; i++) {
      if (board[i][i] !== board[0][0]) {
        winner = false;
      }
    }
    if (winner) return board[0][0] as PlayerType;

    // cross diagonal
    winner = true;
    for (let i = 0; i < n; i++) {
      if (board[i][n - 1 - i] !== board[n - 1][0]) {
        winner = false;
      }
    }
    if (winner) return board[n - 1][0] as PlayerType;

    return null;
  };

  return (
    <div className="container">
      <div className="">
        <input
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          type="number"
          name="value"
        />
        <button onClick={handleStart}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="board">
        {board.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="flex">
              {row.map((val, colIdx) => (
                <div
                  key={colIdx}
                  className="border-2 size-12 flex justify-center items-center"
                  onClick={() => handleCellClick(rowIdx, colIdx)}
                >
                  {val}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicTakToe;
