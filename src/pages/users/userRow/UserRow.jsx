import { Grid } from '@mui/material';
import { observer } from 'mobx-react';
import TrashIconButton from '../../../components/buttons/TrashIconButton';
import AutocompleteField from '../../../components/inputs/AutocompleteField';
import InputField from '../../../components/inputs/InputField';
import countryOptions from '../../../data/countries.json';
import useUserRow from '../../../hooks/useUserRow';
import styles from '../users.module.css';
import {
  PLACEHOLDER_COUNTRY,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_NAME,
  PLACEHOLDER_PHONE,
  USER_FIELDS,
} from '../../../utils/strings.utils';

const UserRow = ({ userId }) => {
  const {
    name,
    country,
    email,
    phone,
    handleRemoveUser,
    onChangeHandler,
    onBlurHandler,
    errorName,
    errorCountry,
    errorEmail,
    errorPhone,
    handleRowBlur,
    rowRef,
  } = useUserRow(userId);

  return (
    <Grid
      ref={rowRef}
      container
      className={styles.userRow}
      columns={5}
      tabIndex={-1}
      onBlur={handleRowBlur}
    >
      <Grid item>
        <InputField
          name={USER_FIELDS.name}
          value={name}
          placeholder={PLACEHOLDER_NAME}
          onChangeHandler={onChangeHandler}
          onBlurHandler={onBlurHandler}
          error={errorName}
        />
      </Grid>
      <Grid item>
        <AutocompleteField
          name={USER_FIELDS.country}
          value={country}
          options={countryOptions}
          placeholder={PLACEHOLDER_COUNTRY}
          onChangeHandler={onChangeHandler}
          onBlurHandler={onBlurHandler}
          error={errorCountry}
        />
      </Grid>
      <Grid item>
        <InputField
          name={USER_FIELDS.email}
          value={email}
          placeholder={PLACEHOLDER_EMAIL}
          onChangeHandler={onChangeHandler}
          onBlurHandler={onBlurHandler}
          error={errorEmail}
        />
      </Grid>
      <Grid item>
        <InputField
          name={USER_FIELDS.phone}
          value={phone}
          placeholder={PLACEHOLDER_PHONE}
          onChangeHandler={onChangeHandler}
          onBlurHandler={onBlurHandler}
          error={errorPhone}
        />
      </Grid>
      <Grid item>
        <TrashIconButton handleClick={handleRemoveUser} />
      </Grid>
    </Grid>
  );
};

export default observer(UserRow);
