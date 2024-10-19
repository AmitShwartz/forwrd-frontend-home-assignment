import { useEffect } from 'react';
import data from '../data/initialUsersData.json';
import useUsersStore from './useUsersStore';
import { mapKeys } from 'lodash';

const useFetchUsers = () => {
  const { initUsers, setIsLoading } = useUsersStore();

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => {
      initUsers(mapKeys(data, 'id'));
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(t);
      setIsLoading(false);
    };
  }, [setIsLoading, initUsers]);
};

export default useFetchUsers;
