import PropTypes, { shape } from 'prop-types';

export const Table = ({ data, datesChanged }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Cases per selected period</th>
          <th>Deaths per selected period</th>
          <th>Total Cases</th>
          <th>Total Deaths</th>
          <th>Cases per 1000</th>
          <th>Deaths per 1000</th>
        </tr>
      </thead>
      <tbody>
        {data.map((country, index) => (
          <tr key={index}>
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
        ))}
      </tbody>
    </table>
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
};
