import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function Etudiants() {
  const [etudiants, setEtudiants] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/etudiants').then(r => setEtudiants(r.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Liste des étudiants</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/admin/formations">Formations</Link>
          <button onClick={() => { logout(); navigate('/login'); }}>Déconnexion</button>
        </div>
      </div>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: 20 }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Formation inscrite</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map(e => (
            <tr key={e.id}>
              <td>{e.nom}</td>
              <td>{e.prenom}</td>
              <td>{e.email}</td>
              <td>
                {e.inscription
                  ? `${e.inscription.formation.titre} (${e.inscription.formation.duree}h)`
                  : <span style={{ color: 'gray' }}>Aucune inscription</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
