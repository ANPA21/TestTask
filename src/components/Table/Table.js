import PropTypes, { shape } from 'prop-types';

export const Table = ({ data, datesChanged }) => {
  return (
    <table className="table table-light">
      <thead>
        <tr className="table-dark">
          <th scope="col">Country</th>
          <th scope="col">Cases per selected period</th>
          <th scope="col">Deaths per selected period</th>
          <th scope="col">Total Cases</th>
          <th scope="col">Total Deaths</th>
          <th scope="col">Cases per 1000</th>
          <th scope="col">Deaths per 1000</th>
        </tr>
      </thead>
      <tbody>
        {data.map((country, index) => (
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
  datesChanged: PropTypes.bool.isRequired,
};
