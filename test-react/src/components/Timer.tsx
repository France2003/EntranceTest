import React, { useEffect, useState } from 'react';
interface TimeProps {
    gameStart: boolean;
    gameStatus: 'playing' | 'gameOver' | 'cleared';
}
const Time: React.FC<TimeProps> = ({ gameStart, gameStatus }) => {
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        let interval: number;

        if (gameStart && gameStatus === 'playing') {
            interval = window.setInterval(() => {
                setTime(prevTime => prevTime + 0.1);
            }, 100);
        } else if (gameStatus === 'cleared') {
            // Keep the final time when game is cleared
        } else {
            setTime(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [gameStart, gameStatus]);
    return (
        <span>{time.toFixed(1)}s</span>
    );
};
export default Time; 