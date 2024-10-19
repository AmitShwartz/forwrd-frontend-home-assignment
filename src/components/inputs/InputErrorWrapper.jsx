import emotionStyled from '@emotion/styled';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ErrorMessage = styled(Typography)({
  position: 'absolute',
  bottom: '-17px',
  left: '2px',
  color: 'red',
  fontSize: '12px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
});

const Container = emotionStyled.div({
  position: 'relative',
});

const InputErrorWrapper = ({ error, children }) => {
  return (
    <Container>
      {children}
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

// TODO: Implement passed props
InputErrorWrapper.defaultProps = {
  error: '',
  children: null,
};

export default InputErrorWrapper;
