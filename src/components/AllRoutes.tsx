import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import MainPage from '../pages/MainPage/MainPage';

const AllRoutes = () => {
    const user = false; // HERE

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
