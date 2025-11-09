require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const AWS = require('aws-sdk');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Health
app.get('/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Simple users check (example)
app.get('/api/users/count', async (req, res) => {
  try {
    const r = await pool.query('SELECT count(*) FROM users');
    res.json({ count: Number(r.rows[0].count) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'db error' });
  }
});

// S3 sign URL
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY || '',
  secretAccessKey: process.env.AWS_SECRET_KEY || '',
  region: process.env.AWS_REGION || ''
});

app.post('/api/sign-s3', async (req, res) => {
  const { filename, filetype } = req.body;
  if (!filename || !filetype) return res.status(400).json({ error: 'filename & filetype required' });
  const key = `uploads/${Date.now()}-${filename.replace(/[^a-zA-Z0-9_.-]/g,'_')}`;
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Expires: 60,
    ContentType: filetype,
    ACL: 'private'
  };
  try {
    const url = await s3.getSignedUrlPromise('putObject', params);
    res.json({ url, key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to sign url' });
  }
});

// Basic file list (requires DB entries in files table)
app.get('/api/files', async (req, res) => {
  try {
    const r = await pool.query('SELECT id, original_name, mime_type, created_at FROM files ORDER BY created_at DESC LIMIT 50');
    res.json(r.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'db error' });
  }
});

// Socket.IO realtime
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('join', (room) => {
    socket.join(room);
  });
  socket.on('telemetry', (payload) => {
    // Broadcast to dashboard room
    io.to('dashboard').emit('telemetry', payload);
  });
  socket.on('task_update', (payload) => {
    io.to('notifications').emit('task_update', payload);
  });
  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening ${PORT}`));
