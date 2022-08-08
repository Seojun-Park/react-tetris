import React, { useEffect, useState } from 'react';
import { ROWPOINTS } from '../utils';

interface ReturnProps {
	score: number;
	setScore: React.Dispatch<React.SetStateAction<number>>;
	rows: number;
	setRows: React.Dispatch<React.SetStateAction<number>>;
	level: number;
	setLevel: React.Dispatch<React.SetStateAction<number>>;
}

export const useGameStatus = (rowsCleard: number): ReturnProps => {
	const [score, setScore] = useState<number>(0);
	const [rows, setRows] = useState<number>(0);
	const [level, setLevel] = useState<number>(1);

	useEffect(() => {
		if (rowsCleard > 0) {
			setScore(prev => prev + ROWPOINTS[rowsCleard - 1] * level);
			setRows(prev => prev + rowsCleard)
		}
	}, [rowsCleard])

	return { score, setScore, rows, setRows, level, setLevel }
}