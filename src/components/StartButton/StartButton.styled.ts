import styled, { StyledComponent } from 'styled-components';

interface Props {
	Wrapper: StyledComponent<'button', any, {}, never>
}

export const StyledStartButton: Props = {
	Wrapper: styled.button`
  box-sizing: border-box;
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 20px;
  width: 170px;
  border-radius: 10px;
  border: none;
  color: white;
  background: #111;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
	`
};