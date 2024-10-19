import { useDebouncedCallback } from 'use-debounce';
import useUsersStore from './useUsersStore';

const useSearchBar = () => {
  const { setSearchTerm } = useUsersStore();
  const onChange = useDebouncedCallback((value) => {
    setSearchTerm(value);
  }, 300);

  return { onChange };
};

export default useSearchBar;
