import { options } from './FilterOptions';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as st from './FilterSelector.styled';

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
      <st.FilterContainer>
        <st.StyledSelect
          value={selectedFilter === null ? `` : selectedFilter.value}
          onChange={handleSelectorChange}
          options={options}
          placeholder={'Select filter'}
        />
      </st.FilterContainer>
      <st.GroupContainer>
        <st.InputsContainer>
          <st.StyledInput
            value={filterStartValue === null ? `` : filterStartValue}
            type="number"
            placeholder="Start Value"
            onChange={handleStartInputChange}
            className="form-control"
          />
          <st.StyledInput
            value={filterEndValue === null ? `` : filterEndValue}
            type="number"
            placeholder="End Value"
            onChange={handleEndInputChange}
            className="form-control"
          />
        </st.InputsContainer>

        <st.StyledBtn
          type="button"
          className="btn btn-primary"
          onClick={resetFilters}
        >
          Reset filters
        </st.StyledBtn>
      </st.GroupContainer>
    </>
  );
};

FilterSelector.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
};
