import React, { useEffect, useState } from 'react';
interface GameBoardProps {
    points: number[];
    currentCircle: number;
    handleOnClickCicle: (circle: number) => void;
    gameStatus: 'playing' | 'gameOver' | 'cleared';
    gameStart: boolean;
}
interface CirclePosition {
    left: number;
    top: number;
}
const GameBoard: React.FC<GameBoardProps> = ({ points, handleOnClickCicle, gameStatus, gameStart }) => {
    const [positions, setPositions] = useState<CirclePosition[]>([]);
    const [clickedCircles, setClickedCircles] = useState<number[]>([]);
    const [showCircles, setShowCircles] = useState(false);

    useEffect(() => {
        const newPositions = points.map(() => {
            let left: number, top: number;
            let attempts = 0;
            const maxAttempts = 100;

            do {
                left = Math.random() * 80 + 10;
                top = Math.random() * 80 + 10;
                attempts++;
            } while (
                attempts < maxAttempts &&
                positions.some(pos =>
                    Math.abs(pos.left - left) < 10 &&
                    Math.abs(pos.top - top) < 10
                )
            );
            return { left, top };
        });
        setPositions(newPositions);
    }, [points]);
    useEffect(() => {
        setClickedCircles([]);
    }, [gameStart, points]);
    useEffect(() => {
        if (gameStart) {
            setShowCircles(true);
        }
    }, [gameStart]);
    const handleCircleClick = (circle: number) => {
        if (!gameStart || gameStatus !== 'playing') return;
        handleOnClickCicle(circle);
        setClickedCircles(prev => [...prev, circle]);
    };
    return (
        <div className="relative">
            <div className="w-[600px] h-[500px] border border-gray-300 relative bg-gradient-to-r from-blue-100 to-purple-100">
                {showCircles && points.map((point, index) => (
                    <div
                        key={index}
                        className={`absolute w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer
                            transition-all duration-300 ease-in-out transform hover:scale-110
                            ${clickedCircles.includes(point) ? 'bg-red-500 text-white' : 'bg-gradient-to-r from-purple-400 to-blue-400 text-black'}`}
                        style={{
                            left: `${positions[index]?.left || 50}%`,
                            top: `${positions[index]?.top || 50}%`,
                            transform: 'translate(-50%, -50%)',
                            opacity: showCircles ? 1 : 0,
                            animation: 'fadeIn 0.5s ease-in-out'
                        }}
                        onClick={() => handleCircleClick(point)}
                    >
                        {point}
                    </div>
                ))}
            </div>
            {
                gameStatus === 'gameOver' && (
                    <div className="absolute inset-0 flex items-center justify-center border border-gray-300 bg-white bg-opacity-50 animate-fadeIn">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="text-3xl font-bold text-red-600 text-center">
                                GAME OVER!
                            </div>
                        </div>
                    </div>
                )
            }
            {
                gameStatus === 'cleared' && (
                    <div className="absolute inset-0 flex items-center justify-center border border-gray-300 bg-white bg-opacity-50 animate-fadeIn">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="text-3xl font-bold text-green-600 text-center">
                                ALL CLEARED!
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default GameBoard;