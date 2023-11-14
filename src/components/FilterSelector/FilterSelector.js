import { options } from './FilterOptions';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FilterContainer,
  GroupContainer,
  InputsContainer,
  StyledBtn,
  StyledInput,
  StyledSelect,
} from './FilterSelector.styled';

export const FilterSelector = ({ handleFilterChange }) => {
  const [filterStartValue, setFilterStartValue] = useState(null);
  const [filterEndValue, setFilterEndValue] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleSelectorChange = event => {
    setSelectedFilter(event.value);
  };
  const handleStartInputChange = event => {
    setFilterStartValue(event.target.value);
  };
  const handleEndInputChange = event => {
    setFilterEndValue(event.target.value);
  };
  const resetFilters = () => {
    setSelectedFilter(null);
    setFilterStartValue(null);
    setFilterEndValue(null);
  };
  useEffect(() => {
    handleFilterChange({
      selectedFilter,
      filterStartValue,
      filterEndValue,
    });
  }, [selectedFilter, filterStartValue, filterEndValue, handleFilterChange]);
  return (
    <>
      <FilterContainer>
        <StyledSelect
          value={selectedFilter === null ? `` : selectedFilter.value}
          onChange={handleSelectorChange}
          options={options}
          placeholder={'Select filter'}
        />
      </FilterContainer>
      <GroupContainer>
        <InputsContainer>
          <StyledInput
            value={filterStartValue === null ? `` : filterStartValue}
            type="number"
            placeholder="Start Value"
            onChange={handleStartInputChange}
            className="form-control"
          />
          <StyledInput
            value={filterEndValue === null ? `` : filterEndValue}
            type="number"
            placeholder="End Value"
            onChange={handleEndInputChange}
            className="form-control"
          />
        </InputsContainer>

        <StyledBtn
          type="button"
          className="btn btn-primary"
          onClick={resetFilters}
        >
          Reset filters
        </StyledBtn>
      </GroupContainer>
    </>
  );
};

FilterSelector.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};
