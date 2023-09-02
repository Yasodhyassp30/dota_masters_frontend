
import Register from './pages/register/register';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './reducers/combinedReducers';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Navbar from './pages/navbar/navbar';

function App() {
  const logged = useSelector((state: RootState) => state.authreducer.isLoggedIn)
  return (
    <div style={{
      height: '100vh',
      width: "100%",
      display: 'flex',
      flexDirection: 'row',
    }}>
      {logged && <Navbar />} 
      
      <div style={{ flex: 1 }}> 
        <Routes>
          <Route path="/" element={(!logged) ? <Register /> : <Navigate to="dashboard" />} />
          <Route path="/login" element={(!logged) ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={(!logged) ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={(logged) ? <Dashboard/>: <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
