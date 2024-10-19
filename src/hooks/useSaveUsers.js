import { isEmpty } from 'lodash';
import { useCallback, useMemo } from 'react';
import useUsersStore from './useUsersStore';

const useSaveUsers = () => {
  const { dirtyFields, errors, users, saveUsers, resetDirtyFields, IsNewInDirtyFields } =
    useUsersStore();

  const disabled = useMemo(
    () => IsNewInDirtyFields || isEmpty(dirtyFields) || !isEmpty(errors),

    [IsNewInDirtyFields, dirtyFields, errors]
  );

  const onSaveUsers = useCallback(() => {
    const usersToSave = Object.keys(dirtyFields).reduce((acc, userId) => {
      const user = users[userId];
      const dirtyFieldsForUser = dirtyFields[userId];
      const updatedUser = { ...user, ...dirtyFieldsForUser };
      acc[userId] = updatedUser;
      return acc;
    }, {});

    saveUsers(usersToSave);
    resetDirtyFields();
  }, [dirtyFields, resetDirtyFields, saveUsers, users]);

  return {
    disabled,
    onSaveUsers,
  };
};

export default useSaveUsers;
