import { Hono } from 'hono';
import { StopManager } from './obj/stopmanager';
import { getNextThree } from './livedata';

//
//Load data//
//
import stopdata from './Data/orgstops-e.json';
const stopManager = new StopManager(stopdata.stops);


//
//start//
//
const app = new Hono();

const port = 3000;
console.log(`🚀 Server running at http://localhost:${port}`);

//
//Usage example//
//
// console.log("Example usage of StopManager");
// console.log('Total stops loaded:', stopManager.getAllStops().length);
// console.log('Stop by ID 70041:', stopManager.getById('70041'));
// // console.log('All stops named "State":', stopManager.getByName('State'));
// console.log('All Blue Line stops:', stopManager.getByLine('Blue Line').length);
// console.log('Transfer stations:', stopManager.getTransferStations().length);


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

//get train info by name
app.get('/train/:name', (c) => {
  const trainName = c.req.param('name');
  const stops = stopManager.getByName(trainName);
  
  return c.json({
    status: "200",
    train: trainName,
    stops: stops,
    count: stops.length
  });
});

//get train info by id
app.get('/train/id/:id', (c) => {
  const trainId = c.req.param('id');
  const stop = stopManager.getById(trainId);
  
  if (!stop) {
    return c.json({
      status: "404",
      message: "Stop not found"
    }, 404);
  }
  
  return c.json({
    status: "200",
    stop: stop
  });
});

//gets closest train to your location
app.get('/train/closest/:lat/:long', (c) => {
  const lat = parseFloat(c.req.param('lat'));
  const long = parseFloat(c.req.param('long'));
  
  // Simple distance calculation (you can improve this)
  let closestStop = null;
  let minDistance = Infinity;
  
  stopManager.getAllStops().forEach(stop => {
    const distance = Math.sqrt(
      Math.pow(stop.latitude - lat, 2) + 
      Math.pow(stop.longitude - long, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestStop = stop;
    }
  });
  
  return c.json({
    status: "200",
    closestStop: closestStop,
    distance: minDistance
  });
});


//Lines
//get all stops on line info by name
app.get('/line/:name', (c) => {
  const lineName = c.req.param('name');
  const line = stopManager.getByLine(lineName);
  
  return c.json({
    status: "200",
    line: lineName,
    stops: line,
    count: line.length
  });
});


//Train Route
app.get('/route/:start/:end', (c) =>{
});

//
//Live data
//

app.get('/times/both/:stopId/:nextnum', (c) =>{

});


//given the current stop what are the next 3 trains coming inbound
app.get('/times/in/:stopId/:nextnum', async (c) =>{
  const stopid = c.req.param('stopId');
  const next = c.req.param('nextnum');

  const resp = await getNextThree(stopid,0,next);

  return c.json({
    data : resp
  });
});

//given the current stop, what are the next 3 trains coming outbound
app.get('/times/out/:stopId/:nextnum', (c) =>{
});


export default {
  port,
  fetch: app.fetch,
};