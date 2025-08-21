import { Hono } from 'hono';

const app = new Hono();

const rapidTransit = require('./Data/rapid-transit.json');

const rapidTransitStops = rapidTransit.data.map(stop => {
  return {
    id: stop.id,
    name: stop.attributes.name,
    latitude: stop.attributes.latitude,
    longitude: stop.attributes.longitude,
    stop: stop.attributes.description

  };
});


// Basic routes
app.get('/', (c) => {
  return c.text('Welcome to MBTA Middle API!');
});

app.get('/api/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/hello', (c) => {
  const name = c.req.query('name') || 'World';
  return c.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString()
  });
});
// Start the server
const port = 3000;
console.log(`🚀 Server running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
