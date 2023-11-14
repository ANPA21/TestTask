import { useCallback, useEffect, useMemo, useState, lazy } from 'react';
import _ from 'lodash';

import { Datepicker } from './Datepicker/Datepicker';
import { CountrySelector } from './CountrySelector/CountrySelector';
import { FilterSelector } from './FilterSelector/FilterSelector';
import { PaginatedItems } from './Pagination/Pagination';

import * as st from './App.styled';
import * as helpers from './helpers';
import { startTransition } from 'react';

const Graph = lazy(() => import('./Graph/Graph'));

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
        casesPer1000: helpers.calculateTotalCasesPerThousand(
          data,
          _.sumBy(items, 'cases')
        ),
        deathsPer1000: helpers.calculateTotalDeathsPerThousand(
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
      casesPerPeriod: helpers.calculateCasesPerPeriod(country.data),
      deathsPerPeriod: helpers.calculateDeathsPerPeriod(country.data),
    }));
  };

  // Main Filter Switch

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

  //-------------- Graph ---------------

  function getTotalsPerDayArr(arr) {
    const totalsPerDay = arr.map(country => {
      return country.data.map(item => {
        return {
          cases: item.cases,
          deaths: item.deaths,
          day: item.dateRep,
        };
      });
    });

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
  }
  function getGraphData() {
    return selectedCountry
      ? getTotalsPerDayArr(filterDataByCountry(filterDataByDate))
      : getTotalsPerDayArr(filterDataByDate);
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
    <st.AppWrapper>
      <st.DateSelectorWrapper>
        <st.DateSelectorText>Choose date</st.DateSelectorText>
        <Datepicker handleDateChange={handleDateChange} />
      </st.DateSelectorWrapper>
      <st.BtnsWrapper>
        <st.Btn
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setIsTableActive(true);
          }}
        >
          Table
        </st.Btn>
        <st.Btn
          type="button"
          className="btn btn-primary"
          onClick={() => {
            startTransition(() => {
              setIsTableActive(false);
            });
          }}
        >
          Graph
        </st.Btn>
      </st.BtnsWrapper>
      <st.ControlsContainer>
        <st.CountrySelectorWrapper>
          <CountrySelector
            countryList={helpers.getCountryList(groupedData)}
            handleCountryChange={handleCountryChange}
          />
        </st.CountrySelectorWrapper>
        <st.FilterSelectorWrapper>
          {isTableActive && (
            <FilterSelector handleFilterChange={handleFilterChange} />
          )}
        </st.FilterSelectorWrapper>
      </st.ControlsContainer>

      <st.ContentWrapper>
        {isTableActive ? (
          <PaginatedItems
            itemsPerPage={20}
            data={getFilteredCountries()}
            datesChanged={selectedDates.datesChanged}
            filter={filter}
          />
        ) : (
          <Graph graphData={getGraphData()} />
        )}
      </st.ContentWrapper>
    </st.AppWrapper>
  );
};
