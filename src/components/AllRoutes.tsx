import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import MainPage from '../pages/MainPage/MainPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../main';

const AllRoutes = () => {
    //const user = false; // HERE

    const [user] = useAuthState(auth);

    return (
        <Routes>
            {!user
                ? publicRoutes.map((route) => <Route element={<route.page />} path={route.path} key={route.path} />)
                : privateRoutes.map((route) => <Route element={<route.page />} path={route.path} key={route.path} />)}
            <Route element={<MainPage />} path='*' />
        </Routes>
    );
};

export default AllRoutes;
