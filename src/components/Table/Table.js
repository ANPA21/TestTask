import PropTypes, { shape } from 'prop-types';
import { StyledTable, StyledTh } from './Table.styled';

export const Table = ({ data, datesChanged, filter }) => {
  return (
    <StyledTable className="table table-sm table-light">
      <thead>
        <tr className="table-dark">
          <StyledTh scope="col">Country</StyledTh>
          <th scope="col">Cases per selected period</th>
          <th scope="col">Deaths per selected period</th>
          <th scope="col">Total Cases</th>
          <th scope="col">Total Deaths</th>
          <th scope="col">Cases per 1000</th>
          <th scope="col">Deaths per 1000</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && filter && filter.selectedFilter ? (
          <tr>
            <th>No Data Found</th>
          </tr>
        ) : (
          data.map((country, index) => (
            <tr
              key={index}
              className={index % 2 === 1 ? `table-light` : `table-secondary`}
            >
              <td>{country.country}</td>
              <td>
                {datesChanged ? country.casesPerPeriod : country.totalCases}
              </td>
              <td>
                {datesChanged ? country.deathsPerPeriod : country.totalDeaths}
              </td>
              <td>{country.totalCases}</td>
              <td>{country.totalDeaths}</td>
              <td>{country.casesPer1000}</td>
              <td>{country.deathsPer1000}</td>
            </tr>
          ))
        )}
      </tbody>
    </StyledTable>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    shape({
      country: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        shape({
          dateRep: PropTypes.string.isRequired,
          popData2019: PropTypes.number,
          cases: PropTypes.number.isRequired,
          deaths: PropTypes.number.isRequired,
        })
      ),
      totalCases: PropTypes.number.isRequired,
      casesPer1000: PropTypes.string.isRequired,
      totalDeaths: PropTypes.number.isRequired,
      deathsPer1000: PropTypes.string.isRequired,
    })
  ),
  datesChanged: PropTypes.bool.isRequired,
};
