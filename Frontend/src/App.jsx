import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

//** Styles
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

//**Components */
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
