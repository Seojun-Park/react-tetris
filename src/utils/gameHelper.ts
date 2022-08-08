import { StageProps } from "../components";
import { PlayerType, STAGE } from "../hooks";

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
export const ROWPOINTS = [40, 100, 300, 1200];

export interface TetrominoValueProps {
	shape: (string | number)[][]
	color: string;
}

export interface TetrominoProps {
	0: TetrominoValueProps
	I: TetrominoValueProps
	J: TetrominoValueProps
	L: TetrominoValueProps
	O: TetrominoValueProps
	S: TetrominoValueProps
	T: TetrominoValueProps
	Z: TetrominoValueProps
}

export const TETROMINOS: TetrominoProps = {
	0: { shape: [[0]], color: '0, 0, 0' },
	I: {
		shape: [
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0],
			[0, 'I', 0, 0]
		],
		color: '80, 227, 230'
	},
	J: {
		shape: [
			[0, 'J', 0],
			[0, 'J', 0],
			['J', 'J', 0]
		],
		color: '36, 95, 223'
	},
	L: {
		shape: [
			[0, 'L', 0],
			[0, 'L', 0],
			[0, 'L', 'L']
		],
		color: '223, 173, 36'
	},
	O: {
		shape: [
			['O', 'O'],
			['O', 'O']
		],
		color: '223, 217, 36'
	},
	S: {
		shape: [
			[0, 'S', 'S'],
			['S', 'S', 0],
			[0, 0, 0]
		],
		color: '48, 211, 56'
	},
	T: {
		shape: [
			[0, 0, 0],
			['T', 'T', 'T'],
			[0, 'T', 0]
		],
		color: '132, 61, 198'
	},
	Z: {
		shape: [
			['Z', 'Z', 0],
			[0, 'Z', 'Z'],
			[0, 0, 0]
		],
		color: '227, 78, 78'
	}
};

export const createStage = () => Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']));

export const randomTetromino = (): TetrominoValueProps => {
	const tetrominos = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'] as (keyof typeof TETROMINOS)[];
	const randomTetro = tetrominos[Math.floor(Math.random() * tetrominos.length)];
	return TETROMINOS[randomTetro];
}

export const isColliding = (
	player: PlayerType,
	stage: STAGE,
	{
		x: moveX,
		y: moveY
	}: {
		x: number,
		y: number
	}
) => {
	// using for loops to be able to return (and break). Not possible with forEach method
	for (let y = 0; y < player.tetromino.length; y++) {
		for (let x = 0; x < player.tetromino[y].length; x++) {
			// 1. check that we're on an actual Tetromino cell
			if (player.tetromino[y][x] !== 0) {
				if (
					// 2. Check that movement is inside the game area height
					// That it is not moving through the bottom of the grid;
					!stage[y + player.pos.y + moveY] ||
					// 3. Check that movement is inside the game area width
					!stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
					// 4. Check that the cell moving to isn't set to clear
					stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
				) {
					return true;
				}
			}
		}
	}
	// 5. if everything above is false
	return false;
}