const calculatePerThousand = (data, totalValue) => {
  return ((totalValue / data[0].popData2019) * 1000).toFixed(2);
};

const calculateTotalDeathsPerThousand = (data, totalDeaths) => {
  return calculatePerThousand(data, totalDeaths);
};

const calculateTotalCasesPerThousand = (data, totalCases) => {
  return calculatePerThousand(data, totalCases);
};

const calculateCasesPerPeriod = data => {
  return data.reduce((cases, entry) => cases + entry.cases, 0);
};

const calculateDeathsPerPeriod = data => {
  return data.reduce((deaths, entry) => deaths + entry.deaths, 0);
};

const getCountryList = data => {
  return data.map(item => item.country);
};

export {
  calculateTotalDeathsPerThousand,
  calculateTotalCasesPerThousand,
  getCountryList,
  calculateCasesPerPeriod,
  calculateDeathsPerPeriod,
};
