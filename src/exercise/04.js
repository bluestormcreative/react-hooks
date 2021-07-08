// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import { useLocalStorageState } from '../utils';

function Board({ squares, selectSquare }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Info({ status, moves, currentStep, setCurrentStep }) {
  function goToMove(step) {
    setCurrentStep(step);
  }
  return (
    <div>
      <div className="status">{status}</div>
      <ol>
        {moves.map((move, step) => {
          let buttonText = step ? `Go to move #${step}` : `Go to start`;
          let isCurrentStep = currentStep === step;
          return (
            <li key={move}>
              <button
                disabled={isCurrentStep}
                onClick={() => goToMove(step)}
              >
                {buttonText} {isCurrentStep ? `(current)` : null}
              </button>
            </li>
          );
        }
        )}
      </ol>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useLocalStorageState('history', [Array(9).fill(null)]); // Set this to an empty array with nine slots.
  const [currentStep, setCurrentStep] = useLocalStorageState('currentStep', 0);

  const squares = history[currentStep]; // Use history state instead of original squares state.
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (winner || squares[square] ) {
      return;
    }

    const currentSquares = [...squares];
    currentSquares[square] = nextValue;

    const moves = [...history];
    const thisMove = moves[square] = currentSquares;
    const newHistory = [...history, thisMove];

    let prevStep = currentStep;
    prevStep++;

    setHistory(newHistory);
    setCurrentStep(prevStep);
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          selectSquare={selectSquare}
        />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <Info
          status={status}
          moves={history}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
