import styled from '@emotion/styled';

export const LoadMoreBtn = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 140px;
  height: 30px;
  cursor: pointer;
  border: none;

  border-radius: 4px;
  background-color: #3ca1a1;
  color: #fff;
  transition: color 250ms linear, background-color 250ms linear;
  svg {
    width: 22px;
    height: 22px;
  }

  &:hover,
  &:focus {
    color: #374e4e;
    background-color: #56c6c6;
  }
`;
export const UpBtn = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 140px;
  height: 30px;
  margin-left: 20px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #3ca1a1;
  color: #fff;
  transition: color 250ms linear, background-color 250ms linear;
  svg {
    width: 22px;
    height: 22px;
  }

  &:hover,
  &:focus {
    color: #374e4e;
    background-color: #56c6c6;
  }
`;
