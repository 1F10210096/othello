import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  let green_stone = 0;
  let black_stone = 0;
  let white_stone = 0;
  const onClick = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    const box = [];
    const box2 = [];
    if (board[y][x] === 3) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let y_i = y + i;
          let x_j = x + j;
          {
            for (let g = 0; g < 8; g++) {
              if (
                board[y_i] === undefined ||
                board[y_i][x_j] === undefined ||
                board[y_i][x_j] === 0 ||
                board[y_i][x_j] === 3
              ) {
                box.length = 0;
                break;
              } else if (board[y_i][x_j] === turnColor) {
                break;
              } else {
                box.push([y_i, x_j]);
                y_i += i;
                x_j += j;
              }
            }
            if (box.length > 0) {
              box.forEach(([y_i, x_j]) => {
                newBoard[y_i][x_j] = turnColor;
              });
            }
            if (box.length > 0) {
              newBoard[y][x] = turnColor;
              setBoard(newBoard);
            }
          }
          if (box.length > 0) {
            setBoard(newBoard);
            setTurnColor(2 / turnColor);
          }
        }
      }
      const j = y;
      const l = x;
      const nextColor = 3 - turnColor;
      setBoard(newBoard);
      //全てのマスを調べる
      for (let o = 0; o < 8; o++) {
        for (let p = 0; p < 8; p++) {
          y = o;
          x = p;
          if (newBoard[y][x] === 3) {
            newBoard[y][x] = 0;
          }
          if (newBoard[y] === undefined || newBoard[y][x] === undefined || newBoard[y][x] !== 0) {
            continue;
          } else if (y === j && x === l) {
            continue;
          } else {
            for (let r = -1; r <= 1; r++) {
              for (let t = -1; t <= 1; t++) {
                let y_r = y + r;
                let x_t = x + t;
                for (let g = 0; g < 8; g++) {
                  if (
                    newBoard[y_r] === undefined ||
                    newBoard[y_r][x_t] === undefined ||
                    newBoard[y_r][x_t] === 0 ||
                    newBoard[y_r][x_t] === 3
                  ) {
                    box2.length = 0;
                    break;
                  } else if (newBoard[y_r][x_t] === nextColor) {
                    break;
                  } else {
                    box2.push([y_r, x_t]);
                    y_r += r;
                    x_t += t;
                  }
                }
                if (box2.length > 0) {
                  newBoard[y][x] = 3;
                  setBoard(newBoard);
                }
              }
            }
          }
        }
      }
    }
    for (let m = 0; m < 8; m++) {
      for (let n = 0; n < 8; n++) {
        y = m;
        x = n;
        if (board[y][x] === 3) {
          green_stone += 1;
        } else if (board[y][x] === 1) {
          black_stone += 1;
        } else if (board[y][x] === 2) {
          white_stone += 1;
        } else {
          continue;
        }
      }
    }
    console.log(green_stone)
    console.log(white_stone)
    console.log(black_stone)
    let text = '';
    if (green_stone === 3) {
      if (black_stone < white_stone) {
        text = '黒の勝ちです！';
        console.log("a");
      } else if (black_stone > white_stone) {
        text = '白の勝ちです！';
        console.log(text);
      } else {
        text = '引き分け！';
        console.log(text);
      }
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.me} />
      <div className={styles.component} />

      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : color === 2 ? '#fff' : '#0f0' }}
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
