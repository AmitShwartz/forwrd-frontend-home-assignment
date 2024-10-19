import { useMemo } from 'react';
import useUsersStore from './useUsersStore';
import { colors } from '../utils/colors.utils';
import { TITLE_STATISTICS } from '../utils/strings.utils';

const useCountryPieChart = () => {
  const { activeUsers } = useUsersStore();

  const data = useMemo(() => {
    const countries = activeUsers.map((user) => user.country).filter(Boolean);

    const countriesCount = countries.reduce((acc, country) => {
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(countriesCount).map(([name, y]) => ({ name, y }));
  }, [activeUsers]);

  const options = useMemo(
    () => ({
      chart: {
        type: 'pie',
        backgroundColor: colors.siteBackground,
        borderColor: colors.siteBackground,
        borderWidth: 1,
        animation: {
          duration: 2000,
          easing: 'easeOutBounce',
        },
        style: {
          fontFamily: 'Roboto, sans-serif',
        },
      },
      title: {
        text: TITLE_STATISTICS,
        style: {
          color: colors.white,
          fontWeight: 'bold',
          fontSize: '20px',
        },
      },
      plotOptions: {
        pie: {
          animation: {
            defer: 500,
            duration: 1500,
          },
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: colors.white,
              fontSize: '14px',
            },
          },
          showInLegend: true,
        },
      },
      series: [
        {
          name: 'Users',
          data,
          colorByPoint: true,
        },
      ],
      legend: {
        itemStyle: {
          color: colors.white,
          fontSize: '14px',
        },
        itemHoverStyle: {
          color: colors.strongTeal,
        },
      },
      accessibility: {
        enabled: false,
      },
    }),
    [data]
  );

  return { options };
};

export default useCountryPieChart;
