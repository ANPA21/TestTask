import Select from 'react-select';
import PropTypes, { string } from 'prop-types';

export const CountrySelector = ({ countryList, handleCountryChange }) => {
  const options = [];
  countryList.forEach(item => {
    options.push({ value: `${item}`, label: `${item}` });
  });
  const handleSelectorChange = event => {
    console.log(event.value);
    handleCountryChange(event.value);
  };
  return (
    <div style={{ width: `300px` }}>
      <Select
        onChange={handleSelectorChange}
        options={options}
        placeholder={'Select country'}
      />
    </div>
  );
};

CountrySelector.propTypes = {
  countryList: PropTypes.arrayOf(string.isRequired),
  handleCountryChange: PropTypes.func.isRequired,
};
