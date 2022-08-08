import React, { FC, useRef, useState } from 'react'
import styled, { StyledComponent } from 'styled-components';
import { createStage, isColliding } from './utils';
import { Display, Stage, StartButton } from './components';
import { useInterval, usePlayer, useStage } from './hooks';
import { useGameStatus } from './hooks/useGameStatus';

interface StyledAppProps {
  Wrapper: StyledComponent<"div", any, {}, never>
  Tetris: StyledComponent<"div", any, {}, never>
}


export const StyledApp: StyledAppProps = {
  Wrapper: styled.div`
  width:100%;
  height:100vh;
  overflow:hidden;
  outline:none; 
  `,
  Tetris: styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:40px;
  margin: 0 auto;
  
  .display {
    display: flex;
    justify-content: space-between;
    width:380px;
  }
  
  `,
}

const App: FC = () => {
  const gameArea = useRef<HTMLDivElement>(null);
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const { player, updatePlayerPosition, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared);

  const movePlayer = (direction: number) => {
    if (!isColliding(player, stage, { x: direction, y: 0 })) {
      updatePlayerPosition({ x: direction, y: 0, collided: false });
    };
  };

  const keyUp = ({ keyCode }: { keyCode: number }): void => {
    if (!gameOver) {
      // change the droptime speed when user releases down arrow
      if (keyCode === 40) {
        setDropTime(1000 / level + 200);
      }
    }
  }

  const handleStartGame = (): void => {
    // need to focus the window with the key events on start
    if (gameArea.current) {
      gameArea.current.focus();
    }
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setRows(0);
    setGameOver(false);
  }

  const move = ({ keyCode, repeat }: { keyCode: number, repeat: boolean }): void => {
    if (!gameOver) {
      //left arrow
      if (keyCode === 37) {
        movePlayer(-1);
        // right array
      } else if (keyCode === 39) {
        movePlayer(1);
        // down arrow
      } else if (keyCode === 40) {
        if (repeat) return;
        setDropTime(30);
        // up arrow
      } else if (keyCode === 38) {
        playerRotate(stage)
      }
    }
  };

  const drop = (): void => {
    // increase level when player has cleared 10 rows
    if (rows > level * 20) {
      setLevel(prev => prev + 1);
      setDropTime(1000 / level + 200);
    }

    if (!isColliding(player, stage, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false })
    } else {
      // game over
      if (player.pos.y < 1) {
        console.log('game over');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  };

  useInterval(() => {
    drop()
  }, dropTime)

  return (
    <StyledApp.Wrapper
      role={'button'}
      tabIndex={0}
      onKeyDown={move}
      onKeyUp={keyUp}
      ref={gameArea}
    >
      <StyledApp.Tetris>
        <div className='display'>
          {gameOver ? (
            <>
              <Display gameOver={gameOver} text="Game Over!" />
              <StartButton onClick={handleStartGame} />
            </>
          )
            :
            (
              <>
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </>
            )}
        </div>
        <Stage stage={stage} />
      </StyledApp.Tetris>
    </StyledApp.Wrapper>
  )
}

export default App
