import React, { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Time from './components/Timer';
type GameStatus = 'playing' | 'gameOver' | 'cleared';
function App() {
  const [numberOfPoints, setNumberOfPoints] = useState<number>(0);
  const [points, setPoints] = useState<number[]>([]);
  const [currentCircle, setCurrentCircle] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [gameStart, setGameStart] = useState(false);
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value);
    setNumberOfPoints(value);
    if (value > 0) {
      const newPoints = Array.from({ length: value }, (_, i) => i + 1);
      setPoints(newPoints);
      setGameStart(false);
      setGameStatus('playing');
      setCurrentCircle(0);
    } else {
      setPoints([]);
    }
  };
  const startGame = () => {
    if (points.length > 0) {
      setGameStart(true);
      setGameStatus('playing');
      setCurrentCircle(0);
    }
  };
  const restartGame = () => {
    setGameStart(false);
    setGameStatus('playing');
    setCurrentCircle(0);
  };
  const handleOnClickCicle = (circle: number) => {
    if (gameStatus !== 'playing' || !gameStart) return;

    if (circle === currentCircle + 1) {
      setCurrentCircle((prevIndex) => prevIndex + 1);
      if (currentCircle + 1 === points.length) {
        setGameStatus('cleared');
      }
    } else {
      setGameStatus('gameOver');
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-[600px]">
        <h1 className="text-2xl font-bold mb-6 text-center" >LET'S PLAY</h1>

        <div className="mb-4">
          <div className="flex items-center mb-4">
            <span className="w-16 font-medium text-gray-700">Points:</span>
            <input
              type="number"
              min="1"
              value={numberOfPoints || ''}
              onChange={handlePointsChange}
              className="border border-gray-300 px-3 py-2 w-56 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              disabled={gameStart}
            />
          </div>
          <div className="flex items-center gap-5 mb-4">
            <span className="w-16 font-medium text-gray-700">Time:</span>
            <div className="px-3 py-2 w-32 rounded-md bg-gray-100 text-center text-gray-800 shadow-sm">
              <Time gameStart={gameStart} gameStatus={gameStatus} />
            </div>
            <div>
              {!gameStart ? (
                <button
                  onClick={startGame}
                  disabled={points.length === 0}
                  className={`px-6 py-2 rounded-md text-white font-medium shadow-md transition-all duration-300 ${points.length > 0
                    ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                  Play
                </button>
              ) : (
                <button
                  onClick={restartGame}
                  className="px-6 py-2 rounded-md bg-red-500 text-white font-medium shadow-md hover:bg-red-600 transition-all duration-300"
                >
                  Restart
                </button>
              )}
            </div>
          </div>

        </div>
        <GameBoard
          points={points}
          currentCircle={currentCircle}
          handleOnClickCicle={handleOnClickCicle}
          gameStatus={gameStatus}
          gameStart={gameStart}
        />
      </div>
    </div>
  );
}

export default App;
