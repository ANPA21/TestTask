import { useCallback, useEffect, useMemo, useState } from 'react';
import { Datepicker } from './Datepicker/Datepicker';
import { Graph } from './Graph/Graph';
import _ from 'lodash';
import { CountrySelector } from './CountrySelector/CountrySelector';
import { FilterSelector } from './FilterSelector/FilterSelector';

import {
  calculateCasesPerPeriod,
  calculateDeathsPerPeriod,
  calculateTotalCasesPerThousand,
  calculateTotalDeathsPerThousand,
  getCountryList,
} from './helpers';
import { PaginatedItems } from './Pagination/Pagination';
import {
  AppWrapper,
  DateSelectorWrapper,
  GraphBtn,
  TableBtn,
  BtnsWrapper,
  CountrySelectorWrapper,
  FilterSelectorWrapper,
  ContentWrapper,
  DateSelectorText,
  ControlsContainer,
} from './App.styled';

export const App = () => {
  const [isTableActive, setIsTableActive] = useState(true);
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
        country: country.replace(/_/g, ` `),
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

  const filterDataByDate = useMemo(() => {
    if (selectedDates.datesChanged) {
      return groupedData.map(country => ({
        ...country,
        data: country.data.filter(item => {
          const itemDate = new Date(`${item.year}-${item.month}-${item.day}`);
          return (
            itemDate >= selectedDates.startDate &&
            itemDate <= selectedDates.endDate
          );
        }),
      }));
    } else {
      return groupedData;
    }
  }, [groupedData, selectedDates]);

  function calculateTotalsPerDay(xx) {
    return xx.map(country => {
      return country.data.map(item => {
        return {
          cases: item.cases,
          deaths: item.deaths,
          day: item.dateRep,
        };
      });
    });
  }

  function calculateTotalCasesAndDeathsPerDay(countriesData) {
    return countriesData[0].map((_, index) => {
      const dayData = countriesData.map(country => country[index]);

      const totalCases = dayData.reduce(
        (sum, item) => sum + (item?.cases || 0),
        0
      );
      const totalDeaths = dayData.reduce(
        (sum, item) => sum + (item?.deaths || 0),
        0
      );

      return { totalCases, totalDeaths, day: countriesData[0][index].day };
    });
  }

  function betterCalculateTotalsPerDay(xx) {
    return xx.map(country => {
      const totalsPerDay = country.data.map(item => {
        return {
          cases: item.cases,
          deaths: item.deaths,
          day: item.dateRep,
        };
      });
      console.log(totalsPerDay);
      return totalsPerDay[0].map((_, index) => {
        const dayData = totalsPerDay.map(country => country[index]);

        const totalCases = dayData.reduce(
          (sum, item) => sum + (item?.cases || 0),
          0
        );
        const totalDeaths = dayData.reduce(
          (sum, item) => sum + (item?.deaths || 0),
          0
        );

        return { totalCases, totalDeaths, day: totalsPerDay[0][index].day };
      });
    });
  }

  function testing() {
    console.log('New : ', betterCalculateTotalsPerDay(filterDataByDate));
    console.log(
      'Old : ',
      calculateTotalCasesAndDeathsPerDay(
        calculateTotalsPerDay(filterDataByDate)
      )
    );
  }

  function test() {
    return selectedCountry
      ? calculateTotalCasesAndDeathsPerDay(
          calculateTotalsPerDay(filterDataByCountry(filterDataByDate))
        )
      : calculateTotalCasesAndDeathsPerDay(
          calculateTotalsPerDay(filterDataByDate)
        );
  }

  function filterDataByCountry(dataArr) {
    return [_.find(dataArr, { country: selectedCountry.country })];
  }

  const filterDataByRange = dataArr => {
    return filter && filter.selectedFilter
      ? _.filter(dataArr, country => {
          const countryValue = Number(country[filter.selectedFilter]);

          const startCondition =
            filter.filterStartValue == null ||
            countryValue >= Number(filter.filterStartValue);
          const endCondition =
            filter.filterEndValue == null ||
            countryValue <= Number(filter.filterEndValue);
          return startCondition && endCondition;
        })
      : dataArr;
  };

  const addTotalsPerPeriod = dataArr => {
    return dataArr.map(country => ({
      ...country,
      casesPerPeriod: calculateCasesPerPeriod(country.data),
      deathsPerPeriod: calculateDeathsPerPeriod(country.data),
    }));
  };

  function getFilteredCountries() {
    switch (true) {
      case selectedCountry != null:
        return addTotalsPerPeriod(filterDataByCountry(filterDataByDate));

      case (filter && filter.filterStartValue !== null) ||
        (filter && filter.filterEndValue):
        return filterDataByRange(addTotalsPerPeriod(filterDataByDate));

      case selectedDates.datesChanged:
        return addTotalsPerPeriod(filterDataByDate);

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
    <AppWrapper>
      <button
        style={{ width: `40px` }}
        onClick={() => {
          testing();
        }}
      >
        click me
      </button>
      <DateSelectorWrapper>
        <DateSelectorText>Choose date</DateSelectorText>
        <Datepicker handleDateChange={handleDateChange} />
      </DateSelectorWrapper>
      <BtnsWrapper>
        <TableBtn
          type="StyledButton"
          className="btn btn-primary"
          onClick={() => {
            setIsTableActive(true);
          }}
        >
          Table
        </TableBtn>
        <GraphBtn
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setIsTableActive(false);
          }}
        >
          Graph
        </GraphBtn>
      </BtnsWrapper>
      <ControlsContainer>
        <CountrySelectorWrapper>
          <CountrySelector
            countryList={getCountryList(groupedData)}
            handleCountryChange={handleCountryChange}
          />
        </CountrySelectorWrapper>
        <FilterSelectorWrapper>
          {isTableActive && (
            <FilterSelector handleFilterChange={handleFilterChange} />
          )}
        </FilterSelectorWrapper>
      </ControlsContainer>

      <ContentWrapper>
        {isTableActive ? (
          <PaginatedItems
            itemsPerPage={20}
            data={getFilteredCountries()}
            datesChanged={selectedDates.datesChanged}
          />
        ) : (
          <Graph graphData={test()} />
        )}
      </ContentWrapper>
    </AppWrapper>
  );
};
