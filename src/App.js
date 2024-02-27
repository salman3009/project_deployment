import './App.css';
import { Navigate,BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Library from './pages/Library';
import axios from 'axios';
import { useUser } from './helpers/UserProvider';

axios.interceptors.request.use(async (config) => {
  config.headers['projectid'] = "f104bi07c490";
  return config;
})

function ProtectedRoute({ children }) {
  const { getUser } = useUser();
  if (getUser && getUser.status == "success") {
    return children;
  }
  else {
    return <Navigate to={"/login"} />
  }
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/library" element={<ProtectedRoute>
            <Library />
          </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
