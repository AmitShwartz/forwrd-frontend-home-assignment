import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import useSearchBar from '../../../hooks/useSearchBar';
import SearchBarInput from '../../../components/inputs/SearchBarInput';

const HoodFinderSearchBar = () => {
  const { onChange } = useSearchBar();
  const handleOnChange = useCallback((e) => onChange(e.target.value), [onChange]);
  return <SearchBarInput onChange={handleOnChange} />;
};

export default observer(HoodFinderSearchBar);
