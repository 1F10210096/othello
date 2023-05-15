import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    const box = [];
    if (board[y][x] === 0) {
      console.log('a');
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let y_i = y + i;
          let x_j = x + j;
          {
            console.log('b');
            for (let g = 0; g < 7; g++) {
              console.log('aaaaa');
              if (board[y_i] === undefined || board[x_j] === undefined || board[y_i][x_j] === 0) {
                console.log('c');
                box.length = 0;
                break;
              } else if (board[y_i][x_j] === turnColor) {
                console.log('c');
                break;
              } else {
                console.log('d');
                box.push([y_i, x_j]);
                y_i += i;
                x_j += j;
              }
            }
            if (box.length > 0) {
              box.forEach(([y_i, x_j]) => {
                newBoard[y_i][x_j] = turnColor;
              });

              console.log('e');
            }
            if (box.length > 0) {
              box.forEach(([y2, x2]) => {
                newBoard[y2][x2] = turnColor;
              });
              newBoard[y][x] = turnColor;
              console.log(y, x);
              console.log('f');
            }
          }
          if (box.length > 0) {
            setBoard(newBoard);
            setTurnColor(2 / turnColor);
            console.log('g');
          }
        }
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.me} />
      <div className={styles.text1} />
      <div className={styles.component} />

      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
