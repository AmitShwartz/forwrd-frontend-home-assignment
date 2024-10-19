import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { colors } from '../../utils/colors.utils';

const StyledIconButton = styled(IconButton)({
  color: colors.trashIcon,
  '&:hover': {
    color: colors.trashIconHover,
  },
});

const TrashIconButton = ({ handleClick }) => {
  return (
    <StyledIconButton aria-label="delete" size="large" onClick={handleClick}>
      <DeleteIcon fontSize="inherit" />
    </StyledIconButton>
  );
};

TrashIconButton.defaultProps = {
  handleClick: () => {},
};

export default TrashIconButton;
