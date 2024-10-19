import React, { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import InputErrorWrapper from './InputErrorWrapper';
import { colors } from '../../utils/colors.utils';

const StyledAutocomplete = styled(Autocomplete)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: colors.inputBackground,
  borderRadius: '4px',
  width: 180,
});

const AutocompleteField = ({
  options = [],
  onChangeHandler = () => {},
  onBlurHandler = () => {},
  error = null,
  placeholder = 'Select...',
  name = 'autocomplete_field_name',
  value = null,
}) => {
  const [optionValue, setOptionValue] = useState(value || null);

  const onChange = useCallback(
    (_event, value) => {
      setOptionValue(value);
      onChangeHandler(name, value || '');
    },
    [onChangeHandler, name]
  );

  const onBlur = useCallback(() => {
    onBlurHandler(name, optionValue || '');
  }, [name, optionValue, onBlurHandler]);

  return (
    <InputErrorWrapper error={error}>
      <StyledAutocomplete
        size="small"
        onBlur={onBlur}
        onChange={onChange}
        value={optionValue}
        disablePortal
        options={options}
        renderInput={(params) => (
          <TextField {...params} error={!!error} placeholder={placeholder} />
        )}
      />
    </InputErrorWrapper>
  );
};

export default AutocompleteField;
