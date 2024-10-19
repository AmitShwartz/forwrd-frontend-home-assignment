import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../utils/colors.utils';
import { PLACEHOLDER_SEARCH } from '../../utils/strings.utils';

const Search = styled('div')({
  position: 'relative',
  borderRadius: '4px',
  marginLeft: 0,
  width: 200,
  backgroundColor: colors.cream,
  margin: '0 8px',
});

const SearchIconWrapper = styled('div')({
  padding: '0 8px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.deepBlue,
});

const StyledInputBase = styled(InputBase)({
  width: '100%',
  paddingLeft: 'calc(1em + 16px)',
});

const SearchBarInput = (props) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={PLACEHOLDER_SEARCH}
        inputProps={{ 'aria-label': 'search' }}
        {...props}
      />
    </Search>
  );
};

export default SearchBarInput;
