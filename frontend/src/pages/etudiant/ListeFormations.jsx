import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ListeFormations() {
  const [formations, setFormations] = useState([]);
  const [inscription, setInscription] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/formations').then(r => setFormations(r.data));
    api.get('/inscriptions/moi').then(r => setInscription(r.data));
  }, []);

  const sInscrire = async (formation_id) => {
    try {
      await api.post('/inscriptions', { formation_id });
      alert('Inscription réussie !');
      const { data } = await api.get('/inscriptions/moi');
      setInscription(data);
    } catch {
      alert('Vous êtes déjà inscrit à une formation');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Formations disponibles</h2>
        <button onClick={() => { logout(); navigate('/login'); }}>Déconnexion</button>
      </div>

      {inscription && (
        <div style={{ background: '#d4edda', padding: 10, marginBottom: 20, borderRadius: 5 }}>
          Vous êtes inscrit à : <strong>{inscription.titre}</strong> ({inscription.duree}h)
        </div>
      )}

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr>
            <th>Titre</th>
            <th>Durée (h)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formations.map(f => (
            <tr key={f.id}>
              <td>{f.titre}</td>
              <td>{f.duree}</td>
              <td>
                {!inscription ? (
                  <button onClick={() => sInscrire(f.id)}>S'inscrire</button>
                ) : inscription.id === f.id ? (
                  <span style={{ color: 'green' }}>✓ Inscrit</span>
                ) : (
                  <span style={{ color: 'gray' }}>Non disponible</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
