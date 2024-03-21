import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../main';
import NothingPage from '../pages/NothingPage/NothingPage';

const AllRoutes = () => {
    //const user = false; // HERE

    const [user] = useAuthState(auth);

    return (
        <Routes>
            {!user
                ? publicRoutes.map((route) => <Route element={<route.page />} path={route.path} key={route.path} />)
                : privateRoutes.map((route) => <Route element={<route.page />} path={route.path} key={route.path} />)}
            <Route element={<NothingPage />} path='*' />
        </Routes>
    );
};

export default AllRoutes;
