import { BrowserRouter } from 'react-router-dom';
import AllRoutes from './components/AllRoutes';
import './styles/styles.scss';
import { AuthContext } from './context/AuthContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './main';

function App() {
   const [user, loadingUser, errorUser] = useAuthState(auth);

   return (
      <AuthContext.Provider value={{ user, loadingUser, errorUser }}>
         <BrowserRouter>
            <AllRoutes />
         </BrowserRouter>
      </AuthContext.Provider>
   );
}

export default App;
