import { useState } from 'react'
import './App.css';

type Player = 'X' | '0' | '';
const initialBoard: Player[] = Array(16).fill('');

const App = () => {
  const [board, setBoard] = useState<Player[]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player>('');

  const handleCellClick = (index: number) => {
    if (board[index] !== '' || winner !== '') {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    checkWinner(newBoard, currentPlayer);
    setCurrentPlayer(currentPlayer === 'X' ? '0' : 'X');
  };

  const checkWinner = (board: Player[], player: Player) => {
    if (
      (board[0] === player && board[1] === player && board[2] === player && board[3] === player) ||
      (board[4] === player && board[5] === player && board[6] === player && board[7] === player) ||
      (board[8] === player && board[9] === player && board[10] === player && board[11] === player) ||
      (board[12] === player && board[13] === player && board[14] === player && board[15] === player)
    ) {
      setWinner(player);
      return;
    }
  
    if (
      (board[0] === player && board[4] === player && board[8] === player && board[12] === player) ||
      (board[1] === player && board[5] === player && board[9] === player && board[13] === player) ||
      (board[2] === player && board[6] === player && board[10] === player && board[14] === player) ||
      (board[3] === player && board[7] === player && board[11] === player && board[15] === player)
    ) {
      setWinner(player);
      return;
    }

    if (
      (board[0] === player && board[5] === player && board[10] === player && board[15] === player) ||
      (board[3] === player && board[6] === player && board[9] === player && board[12] === player)
    ) {
      setWinner(player);
      return;
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
          <h2>
            Winner : {winner}
          </h2>
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