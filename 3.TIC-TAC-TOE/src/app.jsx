import { useState } from "react";
import PropTypes from "prop-types";

function Square({ value, onSquareClick }) {
  return (
    <button onClick={onSquareClick} className="square">
      {value}
    </button>
  );
}
Square.propTypes = {
  value: PropTypes.string,
  onSquareClick: PropTypes.func.isRequired,
};

function Board() {
  const [history, setHistory] = useState([Array(9).fill("")]);
  const [stepNumber, setStepNumber] = useState(0);
  // ini number biasa dimulai dari 0
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    // Potong Riwayat kalau perlu
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = newHistory[newHistory.length - 1];
    // Salin state board saat ini
    const squares = [...currentSquares];

    if (squares[i] || calculateTheWinner(squares)) return; //ini membuat ketika kotak (array di dalam square bukan null) makan akan di return tanpa menjalanin coding yang di bawahnya

    // Logika, apabila Kondisi xIsNext === true, maka giliran X, dan apabila xIsNext === false, maka giliran O
    newSquares[i] = xIsNext ? "X" : "O";
    // Perbaruin State
    setSquares(newSquares);
    setXIsNext(!xIsNext); // Tukar Giliran Pemain antara "O" dan "X"

    calculateTheWinner(newSquares);
  }
  // Tentukan Status Pemain
  const winner = calculateTheWinner(squares);
  const statusPlayer = winner
    ? `The Winner is ${winner}`
    : `Next Turn is ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="statusPlayer">{statusPlayer}</div>
      <div className="board">
        {squares.map((squares, i) => (
          <Square
            key={i}
            value={squares}
            onSquareClick={() => handleClick(i)}
          />
        ))}
        {/* <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} /> */}
      </div>
    </>
  );
}

export default Board;

function calculateTheWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Kondisi =>
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // Jika [a] dan squares [a] sama dengan squares[b] dan squares [a] sama dengan squares[c] maka ini adalah pemenangnya
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(`Winner is: ${squares[a]}`);
      return squares[a];
    }
  }
  // Jika Kondisi tidak Sesuai=>
  console.log("No Winner yet");
  return false;
}
