import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../utils/colors.utils';

const StyledButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  backgroundColor: colors.deepBlue,
  '&:hover': {
    backgroundColor: colors.white,
    borderColor: colors.black,
    color: colors.black,
  },
});

const PrimaryButton = ({ children, disabled = false, handleClick = () => {} }) => {
  return (
    <StyledButton variant="contained" disabled={disabled} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;
