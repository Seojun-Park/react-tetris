import React, { FC } from 'react';
import { TETROMINOS } from '../../utils';
import Cell from '../Cell/Cell';
import { StyldStage } from './Stage.styles';

export interface StageProps {
	stageCell: [keyof typeof TETROMINOS, string]; // shape for the and second is for color
	stage: [keyof typeof TETROMINOS, string][][];
}

interface Props {
	stage: StageProps['stage'];
}

export const Stage: FC<Props> = ({ stage }) => {
	return (
		<StyldStage.Wrapper>
			{stage.map(row => row.map((cell, idx) => <Cell key={idx} type={cell[0]} />))}
		</StyldStage.Wrapper>
	)
}

export default null;