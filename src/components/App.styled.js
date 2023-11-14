import styled, { css } from 'styled-components';

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  min-height: 100vh;
  height: 100%;
  width: 100%;

  @media screen and (min-width: 748px) {
    padding: 20px;
  }
`;

//Date Selector

export const DateSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;

  @media screen and (min-width: 748px) {
  }
`;

export const DateSelectorText = styled.p`
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 500;
`;

// Buttons

export const BtnsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  gap: 10px;

  @media screen and (min-width: 748px) {
    gap: 20px;
  }

  @media screen and (min-width: 1025px) {
    /* border: 1px solid black; */
    height: 40px;
  }
`;

const buttonStyles = css`
  width: 100px;
  @media screen and (min-width: 748px) {
    width: 165px;
  }
`;

export const TableBtn = styled.button`
  ${buttonStyles}
`;
export const GraphBtn = styled.button`
  ${buttonStyles}
`;

//Controls

export const ControlsContainer = styled.div`
  margin-bottom: 15px;

  @media screen and (min-width: 1025px) {
    /* border: 1px solid tomato; */
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`;

//Country Selector

export const CountrySelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  @media screen and (min-width: 1025px) {
    /* border: 1px solid yellow; */
    /* margin-left: auto; */
    min-width: 300px;
  }
`;

// FIlters

export const FilterSelectorWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 1025px) {
    display: flex;
    flex-direction: row;
    align-items: start;
    /* border: 1px solid teal; */
    /* margin-right: auto; */
    gap: 20px;
  }
`;

//Content

export const ContentWrapper = styled.div``;
