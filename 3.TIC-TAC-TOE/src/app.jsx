// Ini app.jsx dari game Tic Tac Toe yang lebih di kembangkan dengan System limit posisi dari tiap player yang dimana setiap user X maupun O hanya boleh maximum 3 posisi aja di dalam tiap square

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
  const [stepNumber, setStepNumber] = useState(0);

  // Track Positions for X dan O
  const [xPositions, setXPositions] = useState([]);
  const [oPositions, setOPositions] = useState([]);

  const currentSquares = history[stepNumber];

  // Function ketika di click
  function handleClick(i) {
    // Potong Riwayat kalau perlu
    const newHistory = history.slice(0, stepNumber + 1);
    const lastSquares = newHistory[newHistory.length - 1];
    // Salin state board saat ini
    const squares = [...lastSquares];

    if (squares[i] || calculateTheWinner(squares)) return; //ini membuat ketika kotak (array di dalam square bukan null) makan akan di return tanpa menjalanin coding yang di bawahnya

    // Determine current player's positions
    const playerPosition = xIsNext ? xPositions : oPositions;
    const setPlayerPosition = xIsNext ? setXPositions : setOPositions;

    if (playerPosition.length >= 3) {
      alert(
        "Maaf, Anda sudah mencapai batas posisi 3 kotak, harus menghilangkan posisi yang sudah ada sebelumnya"
      );
      return;
    }

    // Isi kotak dengan X atau O
    squares[i] = xIsNext ? "X" : "O";

    // Perbaruin state board
    setHistory([...newHistory, squares]); // Tambahkan Langkah Baru ke Riwayat
    setStepNumber(newHistory.length); // update stepNumber
    setXIsNext(!xIsNext); // Ganti X dan O

    setPlayerPosition([...playerPosition, i]);

    console.log("Step : ", stepNumber);
    console.log("new History : ", newHistory);
    console.table({ lastSquares, squares });
    // console.log("Last Squares: ", lastSquares);
    // console.log("squares : ", squares);
    console.log("currentSquares : ", currentSquares);
  }

  function removePiece(i) {
    const currentSquares = [...history[stepNumber]]; // Salin papan saat ini
    const setPlayerPosition = xIsNext ? setXPositions : setOPositions;
    const playerPositions = xIsNext ? xPositions : oPositions;

    // Periksa apakah kotak yang diklik adalah milik pemain saat ini
    if (currentSquares[i] === (xIsNext ? "X" : "O")) {
      currentSquares[i] = "";

      // Perbarui posisi pemain dengan menghapus posisi yang dihapus
      setPlayerPosition(playerPositions.filter((pos) => pos !== i));

      // Perbarui riwayat papan
      const newHistory = [...history.slice(0, stepNumber + 1), currentSquares];
      setHistory(newHistory);
      // Pastikan langkah saat ini diatur ulang ke langkah terakhir
      setStepNumber(newHistory.length - 1);
      console.log(`Remove piece at position : ${i}`);
    }
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
  // Navigasi ke Langkah Sebelumnya
  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  return (
    <>
      <div className="statusPlayer">{statusPlayer}</div>
      <div className="board">
        {currentSquares.map((square, i) => (
          <Square
            key={i}
            value={square}
            onSquareClick={
              () =>
                xIsNext
                  ? xPositions.includes(i)
                    ? removePiece(i) // Hapus bidak jika posisi termasuk milik X
                    : handleClick(i) // Tambahkan bidak jika tidak
                  : oPositions.includes(i)
                  ? removePiece(i) // Hapus bidak jika posisi termasuk milik O
                  : handleClick(i) // Tambahkan bidak jika tidak
            }
          />
        ))}
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
