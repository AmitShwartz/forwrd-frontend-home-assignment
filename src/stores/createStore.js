import UsersStore from './UsersStore';

export const createStore = () => {
  return {
    users: new UsersStore(),
  };
};
