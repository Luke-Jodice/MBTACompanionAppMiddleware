import { Hono } from 'hono';
import fs from 'fs';

const app = new Hono();

// Basic routes
app.get('/', (c) => {
  return c.text('Welcome to MBTA Middle API!');
});

app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/hello', (c) => {
  const name = c.req.query('name') || 'World';
  return c.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString()
  });
});

// New endpoint to get ordered stops for a specific line and direction
app.get('/ordered-stops/:lineName/:direction', (c) => {
  const lineName = c.req.param('lineName');
  const direction = c.req.param('direction');
  
  const stops = getOrderedStopsForLineAndDirection(lineName, direction);
  
  return c.json({
  });
});

//gives the path from one to another
app.get('/route/:start/:end', (c) =>{

});

// Start the server
const port = 3000;
console.log(`🚀 Server running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};