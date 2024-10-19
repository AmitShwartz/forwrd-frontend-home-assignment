import { observer } from 'mobx-react';
import React from 'react';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import useSaveUsers from '../../../hooks/useSaveUsers';
import { BUTTON_SAVE } from '../../../utils/strings.utils';

const SaveUsersButton = () => {
  const { disabled, onSaveUsers } = useSaveUsers();
  return (
    <PrimaryButton disabled={disabled} handleClick={onSaveUsers}>
      {BUTTON_SAVE}
    </PrimaryButton>
  );
};

export default observer(SaveUsersButton);
