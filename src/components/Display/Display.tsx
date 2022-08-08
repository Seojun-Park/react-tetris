import React, { FC } from 'react';
import { StyledDisplay } from './Display.styles';

interface DisplayProps {
	gameOver?: boolean;
	text: string;
}

export const Display: FC<DisplayProps> = ({ gameOver, text }) => {
	return (
		<StyledDisplay.Wrapper gameOver={gameOver}>
			{text}
		</StyledDisplay.Wrapper>
	)
}

export default null