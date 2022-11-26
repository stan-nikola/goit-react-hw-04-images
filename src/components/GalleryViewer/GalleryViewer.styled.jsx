import styled from '@emotion/styled';
import { ViewerBtn } from 'components/Button/ViewerNavButton.styled';
export const ViewerImgPosition = styled.p`
  position: absolute;
  top: -31px;
  left: 67px;
  z-index: 999;
  font-size: 22px;

  text-shadow: 0px 0px 20px #6affde;
`;

export const ViewerImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NextViewerBtn = styled(ViewerBtn)`
  right: -42px;
`;
export const PrevViewerBtn = styled(ViewerBtn)`
  left: -42px;
`;
