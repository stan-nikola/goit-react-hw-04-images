import { Button } from './ViewerNavButton';
import styled from '@emotion/styled';

export const ViewerBtn = styled(Button)`
  position: absolute;
  top: 0;
  height: 100%;
  border: none;
  margin: 0;
  cursor: pointer;

  background-color: transparent;
  transition: background-color 250ms linear;
  svg {
    color: aqua;
    width: 30px;
    height: 30px;
  }
  &:disabled {
    svg {
      color: grey;
    }
  }
  &:hover,
  &:focus {
    background-color: #00ffff52;
    &:disabled {
      background-color: #52525252;
    }
  }
`;
