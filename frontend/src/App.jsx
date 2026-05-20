import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Formations from './pages/admin/Formations';
import Etudiants from './pages/admin/Etudiants';
import ListeFormations from './pages/etudiant/ListeFormations';

function RedirectByRole() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return user.role === 'admin'
    ? <Navigate to="/admin/formations" />
    : <Navigate to="/etudiant/formations" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectByRole />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/formations"
            element={<PrivateRoute role="admin"><Formations /></PrivateRoute>}
          />
          <Route
            path="/admin/etudiants"
            element={<PrivateRoute role="admin"><Etudiants /></PrivateRoute>}
          />
          <Route
            path="/etudiant/formations"
            element={<PrivateRoute role="etudiant"><ListeFormations /></PrivateRoute>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
