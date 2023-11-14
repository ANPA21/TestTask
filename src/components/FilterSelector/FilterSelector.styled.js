import styled from 'styled-components';
import Select from 'react-select';

export const StyledSelect = styled(Select)`
  width: 100%;
  max-width: 300px;
  @media screen and (min-width: 748px) and (max-width: 1024px) {
    max-width: 350px;
  }
`;

export const StyledInput = styled.input`
  margin-top: 5px;

  width: 100%;
  max-width: 300px;
  @media screen and (min-width: 748px) and (max-width: 1024px) {
    max-width: 350px;
  }
  @media screen and (min-width: 1025px) {
    margin-top: 0;
  }
`;
export const StyledBtn = styled.button`
  margin-top: 15px;
  width: 210px;
  @media screen and (max-width: 1024px) {
    align-self: center;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media screen and (min-width: 1025px) {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
`;
export const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 100%;
`;
