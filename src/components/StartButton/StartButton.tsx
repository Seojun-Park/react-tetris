import React, { FC } from 'react';
import { StyledStartButton } from './StartButton.styled';

interface StartButtonProps {
	onClick: () => void;
}

export const StartButton: FC<StartButtonProps> = ({ onClick }) => {
	return (
		<StyledStartButton.Wrapper onClick={onClick}>
			Start Game
		</StyledStartButton.Wrapper>
	)
}

export default null;