import React from 'react';
import useCountryPieChart from '../../../hooks/useCountryPieChart';
import PieChartWithAnimation from '../../../components/charts/PieChartWithAnimation';

const CountryPieChart = () => {
  const { options } = useCountryPieChart();
  return <PieChartWithAnimation options={options} />;
};

export default CountryPieChart;
