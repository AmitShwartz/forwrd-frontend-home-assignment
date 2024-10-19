import { useStore } from '../stores/setupContext';

const useUsersStore = () => {
  const { users } = useStore();
  return users;
};

export default useUsersStore;
