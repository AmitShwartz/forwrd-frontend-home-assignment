import { isEmpty } from 'lodash';
import { useCallback, useMemo } from 'react';
import useUsersStore from './useUsersStore';

const useSaveUsers = () => {
  const {
    dirtyFields,
    errors,
    newAndCurrUsers,
    saveUsers,
    resetDirtyFields,
    IsNewInDirtyFields,
  } = useUsersStore();

  const disabled = useMemo(
    () => IsNewInDirtyFields || isEmpty(dirtyFields) || !isEmpty(errors),

    [IsNewInDirtyFields, dirtyFields, errors]
  );

  const onSaveUsers = useCallback(() => {
    const usersToSave = Object.keys(dirtyFields).reduce((acc, userId) => {
      const user = newAndCurrUsers[userId];
      const dirtyFieldsForUser = dirtyFields[userId];
      const updatedUser = { ...user, ...dirtyFieldsForUser };
      acc[userId] = updatedUser;
      return acc;
    }, {});

    saveUsers(usersToSave);
    resetDirtyFields();
  }, [dirtyFields, newAndCurrUsers, resetDirtyFields, saveUsers]);

  return {
    disabled,
    onSaveUsers,
  };
};

export default useSaveUsers;
