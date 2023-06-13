import React, { useState } from 'react'
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
  }
}