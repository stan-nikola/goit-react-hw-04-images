import styled from '@emotion/styled';

export const Header = styled.header`
  width: 100%;
  height: 50px;
  background-color: aqua;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;

export const Form = styled.form`
  margin: auto 0;
  position: relative;
`;

export const SearchButton = styled.button`
  width: 35px;
  height: 101%;
  cursor: pointer;
  background-color: transparent;
  border: none;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  display: flex;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  transition: color 250ms linear;

  svg {
    width: 22px;
    height: 22px;
  }
  &:hover,
  &:focus {
    color: #05acac;
  }
`;
export const SearchInput = styled.input`
  min-width: 260px;
  height: 30px;
  border: transparent;
  outline: none;
  border-radius: 4px;
  padding-left: 35px;
`;
