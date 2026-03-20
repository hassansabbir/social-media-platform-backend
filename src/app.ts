import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// Main API Routes
app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nexus API - Backend</title>
      <style>
        body { 
          font-family: 'Inter', system-ui, sans-serif; 
          background-color: #0f172a; 
          color: #f8fafc; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          height: 100vh; 
          margin: 0; 
        }
        h1 { 
          font-size: 3.5rem; 
          margin-bottom: 0.5rem; 
          background: linear-gradient(to right, #3b82f6, #8b5cf6); 
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
        }
        p { 
          font-size: 1.25rem; 
          color: #94a3b8; 
          margin-top: 0; 
        }
        .status { 
          margin-top: 2rem; 
          padding: 0.75rem 1.75rem; 
          background-color: #1e293b; 
          border-radius: 9999px; 
          display: flex; 
          align-items: center; 
          gap: 0.75rem; 
          border: 1px solid #334155; 
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        .dot { 
          width: 12px; 
          height: 12px; 
          background-color: #22c55e; 
          border-radius: 50%; 
          box-shadow: 0 0 12px #22c55e; 
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
      </style>
    </head>
    <body>
      <h1>Nexus API</h1>
      <p>Backend services are running gracefully.</p>
      <div class="status">
        <div class="dot"></div>
        System Online
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nexus API is running' });
});

export default app;
