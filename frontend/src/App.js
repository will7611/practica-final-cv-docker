import React, { useEffect, useState } from 'react';

function App() {
  const [cv, setCv] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/cv')
      .then(res => res.json())
      .then(data => setCv(data))
      .catch(err => console.error(err));
  }, []);

  if (!cv || !cv.persona) return <div style={{textAlign: 'center', marginTop: '50px'}}>Cargando CV...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial', background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <div style={{ textAlign: 'center', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
        <img src={cv.persona.foto} alt="Foto" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} />
        <h1>{cv.persona.nombre} {cv.persona.apellido}</h1>
        <p>📍 {cv.persona.ciudad}</p>
      </div>
      <div>
        <h2>Formación Académica</h2>
        <ul>
          {cv.formacion.map(item => (
            <li key={item.id} style={{ background: '#f9f9f9', padding: '10px', marginBottom: '8px', borderLeft: '4px solid #007bff', listStyle: 'none' }}>
              <h3>{item.titulo}</h3>
              <p>{item.institucion} — <strong>{item.anio}</strong></p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;