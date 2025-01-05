// Ini Final dari Tic Tac Toe Game ReactJS

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
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill("")]);
  console.log("History: ", history);
  const [stepNumber, setStepNumber] = useState(0);

  const currentSquares = history[stepNumber];

  // Function ketika di click
  function handleClick(i) {
    // Potong Riwayat kalau perlu
    const newHistory = history.slice(0, stepNumber + 1);

    const lastSquares = newHistory[newHistory.length - 1];

    // Salin state board saat ini
    const squares = [...lastSquares];

    if (squares[i] || calculateTheWinner(squares)) return; //ini membuat ketika kotak (array di dalam square bukan null) makan akan di return tanpa menjalanin coding yang di bawahnya

    // Isi kotak dengan X atau O
    squares[i] = xIsNext ? "X" : "O";

    // Perbaruin state board
    setHistory([...newHistory, squares]); // Tambahkan Langkah Baru ke Riwayat
    setStepNumber(newHistory.length); // update stepNumber
    setXIsNext(!xIsNext); // Ganti X dan O

    console.log("Step : ", stepNumber);
    console.log("new History : ", newHistory);
    console.log("currentSquares : ", currentSquares);
    console.log("squares : ", squares);
  }

  // Navigasi ke Langkah Sebelumnya
  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  // Tentukan Status Pemain
  const winner = calculateTheWinner(currentSquares);
  const statusPlayer = winner
    ? `The Winner is ${winner}`
    : `Next Turn is ${xIsNext ? "X" : "O"}`;

  // Menampilkan Riwayat Langkah
  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <>
      <div className="statusPlayer">{statusPlayer}</div>
      <div className="board">
        {currentSquares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
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
      <div className="history">
        <ol>{moves}</ol>
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
  // console.log("No Winner yet");
  return false;
}
