import React, { FC } from 'react';
import { TETROMINOS } from '../../utils';
import { StyledCell } from './Cell.styles';

interface CellProps {
	type: keyof typeof TETROMINOS;
}

const Cell: FC<CellProps> = ({ type }) =>
	<StyledCell.Wrapper type={type} color={TETROMINOS[type].color} />

export default React.memo(Cell);