import { Outlet, useLocation } from 'react-router-dom';
import Nav from './pages/Auth/nav';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Load from './components/Load';

function App() {
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className='overflow-x-hidden'>
      <Load />
      <ToastContainer position='bottom-right'/>
      {!isAuthPage && <Nav />} 
      <main className={isAuthPage ? '' : 'mt-[0.1rem]'}> 
        <Outlet />
      </main>
    </div>
  );
}

export default App;
