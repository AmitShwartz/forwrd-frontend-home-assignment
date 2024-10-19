import { Grid, Skeleton } from '@mui/material';
import styles from '../users.module.css';
import { useMemo } from 'react';

const Col = ({ width }) => (
  <Grid item>
    <Skeleton width={width} height={60} sx={{ bgcolor: 'grey.500' }} />
  </Grid>
);

const LoadingList = () => {
  const rows = useMemo(() => Array.from({ length: 7 }), []);
  const columns = useMemo(() => [194, 194, 194, 194, 50], []);

  return rows.map((_, rowIndex) => (
    <Grid key={`s-r-${rowIndex}`} container className={styles.userRow} columns={5}>
      {columns.map((width, colIndex) => (
        <Col key={`s-c-${rowIndex}-${colIndex}`} width={width} />
      ))}
    </Grid>
  ));
};

export default LoadingList;
