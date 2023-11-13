import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const Datepicker = ({ handleDateChange }) => {
  const startDate = '2019-12-31';
  const endDate = '2020-12-14';

  const fpStart = useRef(null);
  const fpEnd = useRef(null);

  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(startDate)
  );
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(endDate));

  const handleStartDateChange = event => {
    setSelectedStartDate(new Date(event));
    handleDateChange(new Date(event), selectedEndDate);
  };

  const handleEndDateChange = event => {
    setSelectedEndDate(new Date(event));
    handleDateChange(selectedStartDate, new Date(event));
  };

  return (
    <div>
      <div style={{ width: `300px` }}>
        <Flatpickr
          ref={fpStart}
          data-enable-time
          options={{
            minDate: '2019-12-31',
            maxDate: '2020-12-14',
            enableTime: 'false',
            dateFormat: 'Y-m-d',
            defaultDate: startDate,
          }}
          onChange={handleStartDateChange}
          className="form-select"
        />
      </div>
      <div style={{ width: `300px` }}>
        <Flatpickr
          ref={fpEnd}
          data-enable-time
          defaultValue={endDate}
          options={{
            minDate: selectedStartDate,
            maxDate: '2020-12-14',
            enableTime: 'false',
            dateFormat: 'Y-m-d',

            defaultDate: endDate,
          }}
          onChange={handleEndDateChange}
          className="form-select"
        />
      </div>
    </div>
  );
};

Datepicker.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
};
