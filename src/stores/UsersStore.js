import { isEmpty } from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';
import { makePersistable, PersistStoreMap } from 'mobx-persist-store';
import { v4 as uuidv4 } from 'uuid';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

class UsersStore {
  users = {};
  isLoading = false;
  dirtyFields = {};
  errors = {};
  searchTerm = '';

  constructor() {
    makeObservable(this, {
      users: observable,
      isLoading: observable,
      dirtyFields: observable,
      errors: observable,
      searchTerm: observable,

      setUsers: action,
      addUser: action,
      removeUser: action,
      saveUsers: action,
      initUsers: action,
      setIsLoading: action,
      addDirtyField: action,
      resetDirtyFields: action,
      setErrorsByUserIdAndField: action,
      setSearchTerm: action,

      activeUsers: computed,
      usersIds: computed,
      IsNewInDirtyFields: computed,
    });

    if (
      !Array.from(PersistStoreMap.values()).some(
        ({ storageName }) => storageName === 'UsersStore'
      )
    ) {
      makePersistable(this, {
        name: 'UsersStore',
        properties: ['users'],
        storage: {
          getItem: (key) => localStorage.getItem(key),
          setItem: (key, value) => localStorage.setItem(key, value),
          removeItem: (key) => localStorage.removeItem(key),
        },
        expireIn: DAY_IN_MS,
        removeOnExpiration: true,
        stringify: true,
        debugMode: false,
      });
    }
  }

  setUsers = (users) => {
    this.users = users;
  };

  addUser = () => {
    const user = {
      id: uuidv4(),
      createdAt: new Date().getTime(),
    };

    this.setUsers({
      [user.id]: user,
      ...this.users,
    });

    this.dirtyFields = {
      ...this.dirtyFields,
      [user.id]: {
        name: '',
        country: '',
        email: '',
        phone: '',
        isNew: true,
      },
    };
  };

  removeUser = (userId) => {
    this.setUsers({ ...this.users, [userId]: { ...this.users, isDeleted: true } });
    delete this.dirtyFields[userId];
    this.dirtyFields = { ...this.dirtyFields };
    delete this.errors[userId];
    this.errors = { ...this.errors };
  };

  initUsers = (users) => {
    this.setUsers({
      ...users,
      ...this.users,
    });
  };

  saveUsers = (users) => {
    this.setUsers({
      ...this.users,
      ...users,
    });
  };

  setIsLoading = (loading) => {
    this.isLoading = loading;
  };

  addDirtyField = (userId, field, value) => {
    if (this.dirtyFields?.[userId]?.isNew) delete this.dirtyFields[userId].isNew;

    this.dirtyFields = {
      ...this.dirtyFields,
      [userId]: {
        ...this.dirtyFields[userId],
        [field]: value,
      },
    };
  };

  resetDirtyFields = () => {
    this.dirtyFields = {};
  };

  setErrorsByUserIdAndField = (userId, field, error) => {
    if (!this.errors[userId] && !error) return;

    const userErrors = { ...this.errors[userId] };
    if (error) {
      this.errors = {
        ...this.errors,
        [userId]: {
          ...userErrors,
          [field]: error,
        },
      };
      return;
    }

    delete userErrors[field];
    if (isEmpty(userErrors)) {
      delete this.errors[userId];
      this.errors = { ...this.errors };
      return;
    }

    this.errors = {
      ...this.errors,
      [userId]: userErrors,
    };
  };

  setSearchTerm = (searchTerm) => {
    this.searchTerm = searchTerm;
  };

  get activeUsers() {
    return Object.values(this.users).filter(({ isDeleted }) => !isDeleted);
  }

  get usersIds() {
    return this.activeUsers
      .filter((user) =>
        Object.values(user)
          .join(' ')
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      )
      .sort(
        ({ createdAt: aCreatedAt = 0 }, { createdAt: bCreatedAt = 0 }) =>
          bCreatedAt - aCreatedAt
      )
      .map(({ id }) => id);
  }

  get IsNewInDirtyFields() {
    return Object.values(this.dirtyFields).some(({ isNew }) => isNew);
  }
}

export default UsersStore;
