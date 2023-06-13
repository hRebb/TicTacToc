import { useState } from 'react'
import './App.css';

type Player = 'X' | '0' | 'Draw' | '';
const initialBoard: Player[] = Array(9).fill('');

const App = () => {
  const [board, setBoard] = useState<Player[]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player>('');
  const [movesPlayed, setMovesPlayed] = useState<number>(0);
  const [playerX, setPlayerX] = useState<string>('');
  const [player0, setPlayer0] = useState<string>('');
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

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
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        break;
      }
    }

    if (movesPlayed === 8) {
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
    setMovesPlayed(0);
    setPlayerX('');
    setPlayer0('');
  };

  const startGame = (event: React.FormEvent) => {
    event.preventDefault();
    if (playerX.trim() !== '' && player0.trim() !== '') {
      setIsGameStarted(true)
      setBoard(initialBoard);
      setCurrentPlayer('X');
      setWinner('');
      setMovesPlayed(0);
    }
  };

  return (
    <div className='app'>
      <h1>Tic Tac Toe</h1>
      {!isGameStarted ? (
        <div>
          <form onSubmit={startGame}>
            <label>
              Player X:
              <br></br>
              <input
                type='text'
                value={playerX}
                onChange={(event) => setPlayerX(event.target.value)}
              />
            </label>
            <br />
            <label>
              Player O: 
              <br></br>
              <input
                type='text'
                value={player0}
                onChange={(event) => setPlayer0(event.target.value)}
              />
            </label>
            <br />
            <button type='submit'>Start Game</button>
          </form>
        </div>
      ) : (
        <div>
          {winner ? (
            <div>
              {winner === 'Draw' ? (
                <h2>It's a draw!</h2>
              ) : (
                <h2>Winner: {winner === 'X' ? playerX : player0}</h2>
              )}
              <button onClick={resetGame}>Play Again</button>
            </div>
          ) : (
            <>
              <h2>Current Player: {currentPlayer === 'X' ? playerX : player0}</h2>
              {renderBoard()}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
