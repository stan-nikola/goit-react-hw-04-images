import styled from '@emotion/styled';

export const CardItem = styled.li`
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 8px #00000026;
  cursor: zoom-in;
  transition: scale 250ms linear;
  background-color: #ffffff;

  &:hover,
  &:focus {
    scale: 1.02;
  }
`;

export const CardImg = styled.img`
  display: block;
  max-width: 100%;
  object-fit: cover;
`;

export const CardData = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  svg {
    fill: #109696;
    width: 20px;
    height: 20px;
  }
`;
