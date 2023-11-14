import PropTypes, { string } from 'prop-types';
import { StyledSelect } from './CountrySelector.styled';

export const CountrySelector = ({ countryList, handleCountryChange }) => {
  const options = [{ label: 'All Countries', value: null }];
  countryList.forEach(item => {
    options.push({ value: `${item}`, label: `${item}` });
  });
  const handleSelectorChange = event => {
    handleCountryChange(event.value);
  };
  return (
    <StyledSelect
      onChange={handleSelectorChange}
      options={options}
      placeholder={'Select country'}
    />
  );
};

CountrySelector.propTypes = {
  countryList: PropTypes.arrayOf(string.isRequired),
  handleCountryChange: PropTypes.func.isRequired,
};
