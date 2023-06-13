import { useState } from 'react'
import './App.css';

type Player = 'X' | '0' | 'Draw' | '';
const initialBoard: Player[] = Array(9).fill('');

const App = () => {
  const [board, setBoard] = useState<Player[]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player>('');
  const [movesPlayed, setMovesPlayed] = useState<number>(0);

  const handleCellClick = (index: number) => {
    if (board[index] !== '' || winner !== '') {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    checkWinner(newBoard, currentPlayer);
    setCurrentPlayer(currentPlayer === 'X' ? '0' : 'X');
    setMovesPlayed(movesPlayed + 1);
  };

  const checkWinner = (board: Player[], player: Player) => {
    const winningCombinations = [
       // Lines
      [0,1,2],
      [3,4,5],
      [6,7,8],
       // Columns
       [0,3,6],
       [1,4,7],
       [2,5,8],
       // Diagonals
       [0,4,8],
       [2,4,6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        break;
      }
    }

    if (movesPlayed === 8){
      setWinner('Draw');
    }
  };

  const renderCell = (index: number) => {
    return (
      <div
        className='cell'
        onClick={() => handleCellClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div className='board'>
        {board.map((_, index) => renderCell(index))}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner('');
  };
  
  return (
    <div className='app'>
      <h1>
        Tic Tac Toc !!
      </h1>
      {winner ? (
        <div>
          {winner === 'Draw' ? (
            <h2>
              It's a draw !
            </h2>
          ) : (
            <h2>
              Winner : {winner}
            </h2>
          )}
          <button onClick={resetGame}>
            Play Again
          </button>
        </div>
      ) : (
        <>
          <h2>
            Current Player: {currentPlayer}
          </h2>
          {renderBoard()}
        </>
      )}
    </div>
  );
};

export default App;