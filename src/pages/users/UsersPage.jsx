import { observer } from 'mobx-react';
import SaveUsersButton from './buttons/SaveUsersButton';
import styles from './users.module.css';
import ErrorsContainer from './usersList/ErrorsContainer';
import UsersList from './usersList/UsersList';

function UsersPage() {
  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        <ErrorsContainer />
        <div className={styles.rightButtonContainer}>
          <SaveUsersButton />
        </div>
      </div>
    </div>
  );
}

export default observer(UsersPage);
