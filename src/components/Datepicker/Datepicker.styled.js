import styled from 'styled-components';

export const DatepickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  @media screen and (min-width: 748px) {
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }
`;
export const SelectWrapper = styled.div`
  width: 300px;
  @media screen and (min-width: 748px) {
  }
`;
