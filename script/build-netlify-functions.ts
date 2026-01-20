import fs from 'fs';
import path from 'path';

const netlifyDir = path.resolve(process.cwd(), 'netlify');
const functionsDir = path.join(netlifyDir, 'functions');

// Create directories if they don't exist
if (!fs.existsSync(netlifyDir)) {
  fs.mkdirSync(netlifyDir, { recursive: true });
}

if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
}

// Create a main API function that handles all routes
const apiFunction = `
import { handler } from './api-handler.js';

export { handler };
`;

const apiHandler = `
import express from 'express';
import serverless from 'serverless-http';

// Simplified handler for Netlify
const app = express();

// CORS configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is working' });
});

// Catch-all handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    message: 'The requested API endpoint is not available',
    path: req.path
  });
});

// Main handler
export const handler = serverless(async (event, context) => {
  // The serverless-http handler will process the event
  return app;
});
`;

// Write the files
fs.writeFileSync(path.join(functionsDir, 'api.js'), apiFunction);
fs.writeFileSync(path.join(functionsDir, 'api-handler.js'), apiHandler);

// Create a package.json for functions
const functionsPackageJson = {
  "type": "module",
  "dependencies": {
    "express": "^4.21.2",
    "serverless-http": "^3.2.0"
  }
};

fs.writeFileSync(
  path.join(functionsDir, 'package.json'),
  JSON.stringify(functionsPackageJson, null, 2)
);

console.log('Netlify functions built successfully!');
