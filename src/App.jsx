import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './stores/setupContext';
import NavBar from './components/NavBar';
import { navBarRoutesConfig } from './config/routes.config';
import useFetchUsers from './hooks/useFetchUsers';

function App() {
  useFetchUsers();
  return (
    <BrowserRouter>
      <NavBar />
      <StoreProvider>
        <Routes>
          {navBarRoutesConfig.map(({ path, Element, exact }) => (
            <Route
              key={`Route-${path}`}
              path={path}
              element={<Element />}
              exact={exact}
            />
          ))}
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
