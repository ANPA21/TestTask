import styled from 'styled-components';
import Select from 'react-select';

export const StyledSelect = styled(Select)`
  width: 100%;
  max-width: 300px;
  @media screen and (min-width: 748px) {
    max-width: 350px;
  }

  @media screen and (min-width: 1025px) {
    width: 230px;
  }
  @media screen and (min-width: 1300px) {
    width: 3000px;
  }
`;
