import React, { useState, useEffect } from "react";
import "./tic-tac-toe.css";

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe: React.FC = () => {
  const [options, setOptions] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [statusText, setStatusText] = useState<string>(
    `${currentPlayer}'s turn`
  );
  const [running, setRunning] = useState<boolean>(true);

  useEffect(() => {
    setStatusText(`${currentPlayer}'s turn`);
  }, [currentPlayer]);

  const cellClicked = (index: number) => {
    if (options[index] !== "" || !running) {
      return;
    }

    const newOptions = [...options];
    newOptions[index] = currentPlayer;
    setOptions(newOptions);
    checkWinner(newOptions);
  };

  const checkWinner = (options: string[]) => {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      const cellA = options[a];
      const cellB = options[b];
      const cellC = options[c];

      if (cellA === "" || cellB === "" || cellC === "") {
        continue;
      }
      if (cellA === cellB && cellB === cellC) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      setStatusText(`${currentPlayer} wins!`);
      setRunning(false);
    } else if (!options.includes("")) {
      setStatusText(`Draw!`);
      setRunning(false);
    } else {
      changePlayer();
    }
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const restartGame = () => {
    setCurrentPlayer("X");
    setOptions(Array(9).fill(""));
    setStatusText(`X's turn`);
    setRunning(true);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div id="gameContainer">
        <div id="cellContainer">
          {options.map((value, index) => (
            <div key={index} className="cell" onClick={() => cellClicked(index)}>
              <div>{value}</div>
            </div>
          ))}
        </div>
        <h2 id="statusText">{statusText}</h2>
        <button id="restartBtn" onClick={restartGame}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
