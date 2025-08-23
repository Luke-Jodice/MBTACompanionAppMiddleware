import { Hono } from 'hono';
import fs from 'fs';

const app = new Hono();

// Start the server
const port = 3000;
console.log(`🚀 Server running at http://localhost:${port}`);

//Load data


//Build Doublely Linked List



//
//Endpoints for testing
//

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

//
//Train Endpoints
//


//gives the path from one to another
app.get('/route/:start/:end', (c) =>{

});



export default {
  port,
  fetch: app.fetch,
};