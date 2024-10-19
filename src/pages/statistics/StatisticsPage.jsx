import CountryPieChart from './charts/CountryPieChart';
import styles from './statistics.module.css';

function StatisticsPage() {
  return (
    <div className={styles.pageRoot}>
      <CountryPieChart />
    </div>
  );
}

export default StatisticsPage;
