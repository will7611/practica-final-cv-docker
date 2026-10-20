const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Pool de conexiones apuntando al nombre del servicio: 'database'
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'database',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'cv_db',
  port: 3306,
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Conexión inicial con reintentos (por si MySQL aún no está listo)
function conectarConReintento(intentos = 10) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error(`MySQL no disponible (${err.message}). Reintentando... quedan ${intentos - 1}`);
      if (intentos > 1) {
        setTimeout(() => conectarConReintento(intentos - 1), 3000);
      } else {
        console.error('No se pudo conectar a MySQL después de varios intentos.');
      }
      return;
    }
    console.log('Conectado a MySQL exitosamente.');
    connection.release();
  });
}
conectarConReintento();

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend de CV funcionando correctamente');
});

// Ruta principal: datos de la persona + su formación
app.get('/api/cv', (req, res) => {
  pool.query('SELECT * FROM persona WHERE id = ?', [1], (err, personas) => {
    if (err) {
      console.error('Error consultando persona:', err);
      return res.status(500).json({ error: 'Error al obtener los datos del CV' });
    }
    if (personas.length === 0) {
      return res.status(404).json({ error: 'No hay datos del CV' });
    }

    pool.query('SELECT * FROM formacion WHERE persona_id = ?', [1], (err2, formacion) => {
      if (err2) {
        console.error('Error consultando formación:', err2);
        return res.status(500).json({ error: 'Error al obtener la formación' });
      }
      res.json({ persona: personas[0], formacion });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Backend en puerto ${PORT}`);
});