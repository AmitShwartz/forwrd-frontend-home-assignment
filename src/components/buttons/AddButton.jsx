import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { colors } from '../../utils/colors.utils';

const StyledAddButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '8px 10px',
  backgroundColor: colors.teal,
  '&:hover': {
    backgroundColor: colors.strongTeal,
  },
});

const AddButton = ({ disabled, handleClick }) => {
  return (
    <StyledAddButton variant="contained" disabled={disabled} onClick={handleClick}>
      <AddIcon fontSize="inherit" />
    </StyledAddButton>
  );
};

AddButton.defaultProps = {
  disabled: false,
  handleClick: () => {},
};

export default AddButton;
