import React, { useEffect, useState } from 'react';
import { StageProps } from '../components';
import { createStage, TetrominoProps, TETROMINOS } from '../utils';
import { PlayerType } from './usePlayer';

export type STAGECELL = [string | number, string];
export type STAGE = STAGECELL[][];


export const useStage = (player: PlayerType, resetPlayer: () => void) => {
	const [stage, setStage] = useState(createStage());
	const [rowsCleared, setRowsCleared] = useState(0)

	useEffect(() => {
		if (!player.pos) {
			return;
		}
		setRowsCleared(0);

		const removeRows = (newStage: STAGE): STAGE => {
			return newStage.reduce((acc, row) => {
				// if don't find a 0 it meas that the row is full and should be cleard
				if (row.findIndex(cell => cell[0] === 0) === -1) {
					setRowsCleared(prev => prev + 1);
					// creat an empty row at the beginning of the array to push the Tetrominos down
					// instead of returning the cleared row
					acc.unshift(new Array(newStage[0].length).fill([0, 'clear']) as STAGECELL[]);
					return acc;
				}
				acc.push(row);
				return acc;
			}, [] as STAGE)
		}

		const updateStage = (prevStage: STAGE): STAGE => {
			//first flush the stage
			// if it says 'clear', but don't have a 0, it means that it's the players move and should be cleared
			const newStage = prevStage.map(
				row => row.map(
					cell => cell[1] === 'clear' ? [0, 'clear'] : cell) as STAGECELL[]
			);

			// then draw the tetromino
			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newStage[y + player.pos.y][x + player.pos.x] = [value, `${player.collided ? "merged" : "clear"}`]
					}
				})
			});

			if (player.collided) {
				resetPlayer();
				return removeRows(newStage);
			}
			return newStage;
		};
		setStage(prev => updateStage(prev))
	}, [player.collided, player.pos?.x, player.pos?.y, player.tetromino])

	return { stage, setStage, rowsCleared };
}