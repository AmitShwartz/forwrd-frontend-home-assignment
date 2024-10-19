import { Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AddButton from '../../../components/buttons/AddButton';
import useUsersStore from '../../../hooks/useUsersStore';
import { TITLE_USER_LIST } from '../../../utils/strings.utils';
import UserRow from '../userRow/UserRow';
import styles from '../users.module.css';
import LoadingList from './LoadingList';
import UsersSearchBar from './UsersSearchBar';

function UsersList() {
  const { usersIds, addUser, isLoading } = useUsersStore();

  const title = useMemo(
    () => (usersIds.length ? `${TITLE_USER_LIST} (${usersIds.length})` : TITLE_USER_LIST),
    [usersIds.length]
  );

  const Row = useCallback(
    ({ index, style }) => {
      const userId = usersIds[index];
      return (
        <div style={style}>
          <UserRow key={`UserRow-${userId}`} userId={userId} />
        </div>
      );
    },
    [usersIds]
  );

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">{title}</Typography>
        <div className={styles.usersListHeaderLeft}>
          <UsersSearchBar />
          <AddButton handleClick={addUser} />
        </div>
      </div>
      <div className={styles.usersListContent}>
        {isLoading ? (
          <LoadingList />
        ) : (
          <FixedSizeList
            height={500}
            itemCount={usersIds.length}
            itemSize={64}
            width={'100%'}
            itemKey={(index) => usersIds[index]}
          >
            {Row}
          </FixedSizeList>
        )}
      </div>
    </div>
  );
}

export default observer(UsersList);
