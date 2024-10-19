import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCallback, useState } from 'react';
import InputErrorWrapper from './InputErrorWrapper';
import { colors } from '../../utils/colors.utils';

const StyledTextField = styled(TextField)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: colors.inputBackground,
  borderRadius: '4px',
});

const InputField = ({
  name = 'text_field_name',
  value = '',
  onChangeHandler = () => {},
  error = null,
  disabled = false,
  placeholder = '',
  onBlurHandler = () => {},
}) => {
  const [inputValue, setInputValue] = useState(value);

  const onChange = useCallback(
    (e) => {
      setInputValue(e.target.value);
      onChangeHandler(e.target.name, e.target.value);
    },
    [onChangeHandler]
  );

  const onBlur = useCallback(() => {
    onBlurHandler(name, inputValue);
  }, [name, inputValue, onBlurHandler]);

  return (
    <InputErrorWrapper error={error}>
      <StyledTextField
        name={name}
        value={inputValue}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        disabled={disabled}
        placeholder={placeholder}
        variant="outlined"
        size="small"
        fullWidth
        autoComplete="off"
        inputProps={{
          autoComplete: 'off',
        }}
      />
    </InputErrorWrapper>
  );
};

export default InputField;
