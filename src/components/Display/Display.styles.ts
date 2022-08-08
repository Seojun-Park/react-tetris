import React from 'react';
import styled, { StyledComponent } from 'styled-components';

interface Props {
	Wrapper: StyledComponent<'div', any, WrapperProps, never>
}

interface WrapperProps {
	gameOver?: boolean;
}

export const StyledDisplay: Props = {
	Wrapper: styled.div<WrapperProps>`
	box-sizing: border-box;
  display: flex;
  align-items: space-between;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 2px solid #777;
  min-height: 20px;
  width: 120px;
  border-radius: 10px;
  color: ${props => (props.gameOver ? 'red' : '#999')};
  background: #000;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
	`
}