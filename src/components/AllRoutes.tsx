import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import NothingPage from '../pages/NothingPage/NothingPage';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AllRoutes = () => {
   const { user, loadingUser } = useContext(AuthContext);

   // If user logging shows private routes
   // If user not logging shows public  routes
   return (
      <Routes>
         {loadingUser || !user
            ? publicRoutes.map((route) => <Route element={<route.page />} path={route.path} key={route.path} />)
            : privateRoutes.map((route) => <Route element={<route.page />} path={route.path} key={route.path} />)}
         {loadingUser ? <Route element={<></>} path='*' /> : <Route element={<NothingPage />} path='*' />}
      </Routes>
   );
};

export default AllRoutes;
