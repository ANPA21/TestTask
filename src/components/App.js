import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Datepicker } from './Datepicker/Datepicker';
import { Table } from './Table/Table';
// import { Graph } from './Graph/Graph';
import _ from 'lodash';
import { CountrySelector } from './CountrySelector/CountrySelector';
import { FilterSelector } from './FilterSelector/FilterSelector';

import {
  calculateTotalCasesPerThousand,
  calculateTotalDeathsPerThousand,
  getCountryList,
} from './helpers';

export const App = () => {
  // const [isTableActive, setIsTableActive] = useState(true);
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date('2019-12-31'),
    endDate: new Date('2020-12-14'),
    datesChanged: false,
  });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    (async () => {
      const fetchedData = await fetch(
        'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/'
      ).then(res => res.json());

      setData(fetchedData.records);
    })();
  }, []);

  const groupedDataByCountry = useMemo(() => {
    return _.chain(data)
      .groupBy('countriesAndTerritories')
      .map((items, country) => ({
        country,
        data: items.map(({ dateRep, ...rest }) => ({ dateRep, ...rest })),
        totalCases: _.sumBy(items, 'cases'),
        totalDeaths: _.sumBy(items, 'deaths'),
        casesPer1000: calculateTotalCasesPerThousand(
          data,
          _.sumBy(items, 'cases')
        ),
        deathsPer1000: calculateTotalDeathsPerThousand(
          data,
          _.sumBy(items, 'deaths')
        ),
      }))
      .value();
  }, [data]);

  useEffect(() => {
    setGroupedData(groupedDataByCountry);
  }, [groupedDataByCountry]);

  //--------------- Filters -------------------

  function filterDataByDate(newData) {
    return _.map(newData, country => ({
      ...country,
      data: _.filter(country.data, item => {
        const itemDate = new Date(`${item.year}-${item.month}-${item.day}`);
        return (
          itemDate >= selectedDates.startDate &&
          itemDate <= selectedDates.endDate
        );
      }),
    }));
  }

  function filterDataByCountry(dataArr) {
    return [_.find(dataArr, { country: selectedCountry.country })];
  }

  const filterDataByRange = dataArr => {
    return filter && filter.selectedFilter
      ? _.filter(dataArr, country => {
          const countryValue = country[filter.selectedFilter];
          const startCondition =
            filter.filterStartValue == null ||
            countryValue >= filter.filterStartValue;
          const endCondition =
            filter.filterEndValue == null ||
            countryValue <= filter.filterEndValue;
          return startCondition && endCondition;
        })
      : dataArr;
  };

  function getFilteredCountries() {
    switch (true) {
      case selectedCountry != null:
        return filterDataByDate(filterDataByCountry(groupedData));

      case (filter && filter.filterStartValue !== null) ||
        (filter && filter.filterEndValue):
        return filterDataByDate(filterDataByRange(groupedData));

      case selectedDates.datesChanged:
        return filterDataByDate(groupedData);

      default:
        return groupedData;
    }
  }

  //-------------- Handlers ---------------

  const handleDateChange = (startDate, endDate) => {
    setSelectedDates({ startDate, endDate, datesChanged: true });
  };

  const handleCountryChange = country => {
    setSelectedCountry(_.find(groupedData, { country }));
  };
  const handleFilterChange = useCallback(filterObj => {
    setFilter(filter => {
      if (
        filter &&
        filterObj.selectedFilter === filter.selectedFilter &&
        filterObj.filterStartValue === filter.filterStartValue &&
        filterObj.filterEndValue === filter.filterEndValue
      ) {
        return filter;
      }
      return filterObj;
    });
  }, []);

  return (
    <Fragment>
      <Datepicker handleDateChange={handleDateChange} />

      <button
        onClick={() => {
          // setIsTableActive(true);
        }}
      >
        Table
      </button>
      <button
        onClick={() => {
          // setIsTableActive(false);
        }}
      >
        Graph
      </button>
      <CountrySelector
        countryList={getCountryList(groupedData)}
        handleCountryChange={handleCountryChange}
      />
      <FilterSelector handleFilterChange={handleFilterChange} />
      {/* {isTableActive ? <Table /> : <Graph />} */}
      {groupedData ? (
        <Table data={getFilteredCountries()} />
      ) : (
        <div>Loading</div>
      )}
      <button>Reset filters</button>
    </Fragment>
  );
};
