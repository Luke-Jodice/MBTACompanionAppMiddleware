// import { Hono } from 'hono';

// const app = new Hono();



// const rapidTransit = require('./Data/rapid-transit.json');

// const rapidTransitStops = rapidTransit.data.map(stop => {
//   return {
//     id: stop.id,
//     name: stop.attributes.name,
//     latitude: stop.attributes.latitude,
//     longitude: stop.attributes.longitude,
//     stop: stop.attributes.description
// }});



// // Basic routes
// app.get('/', (c) => {
//   return c.text('Welcome to MBTA Middle API!');
// });

// app.get('/api/health', (c) => {
//   return c.json({
//     status: 'healthy',
//     timestamp: new Date().toISOString()
//   });
// });

// app.get('/api/hello', (c) => {
//   const name = c.req.query('name') || 'World';
//   return c.json({
//     message: `Hello, ${name}!`,
//     timestamp: new Date().toISOString()
//   });
// });
// // Start the server
// const port = 3000;
// console.log(`🚀 Server running at http://localhost:${port}`);

// export default {
//   port,
//   fetch: app.fetch,
// };


import { Hono } from 'hono';
import fs from 'fs';

const app = new Hono();

// MBTA Line Order Mappings - These define the proper sequence for each line
const LINE_ORDERS = {
  'Red Line': {
    'Alewife': [
      'Alewife', 'Davis', 'Porter', 'Harvard', 'Central', 'Kendall/MIT', 
      'Charles/MGH', 'Park Street', 'Downtown Crossing', 'South Station', 
      'Broadway', 'Andrew', 'JFK/UMass', 'Savin Hill', 'Fields Corner', 
      'Shawmut', 'Ashmont', 'North Quincy', 'Wollaston', 'Quincy Center', 
      'Quincy Adams', 'Braintree'
    ],
    'Ashmont/Braintree': [
      'Braintree', 'Quincy Adams', 'Quincy Center', 'Wollaston', 'North Quincy', 
      'Ashmont', 'Shawmut', 'Fields Corner', 'Savin Hill', 'JFK/UMass', 
      'Andrew', 'Broadway', 'South Station', 'Downtown Crossing', 'Park Street', 
      'Charles/MGH', 'Kendall/MIT', 'Central', 'Harvard', 'Davis', 'Alewife'
    ]
  },
  'Orange Line': {
    'Oak Grove': [
      'Oak Grove', 'Malden Center', 'Wellington', 'Assembly', 'Sullivan Square', 
      'Community College', 'North Station', 'Haymarket', 'State', 'Downtown Crossing', 
      'Chinatown', 'Tufts Medical Center', 'Back Bay', 'Massachusetts Avenue', 
      'Ruggles', 'Roxbury Crossing', 'Jackson Square', 'Stony Brook', 'Green Street', 
      'Forest Hills'
    ],
    'Forest Hills': [
      'Forest Hills', 'Green Street', 'Stony Brook', 'Jackson Square', 
      'Roxbury Crossing', 'Ruggles', 'Massachusetts Avenue', 'Back Bay', 
      'Tufts Medical Center', 'Chinatown', 'Downtown Crossing', 'State', 
      'Haymarket', 'North Station', 'Community College', 'Sullivan Square', 
      'Assembly', 'Wellington', 'Malden Center', 'Oak Grove'
    ]
  },
  'Blue Line': {
    'Wonderland': [
      'Wonderland', 'Revere Beach', 'Beachmont', 'Suffolk Downs', 'Orient Heights', 
      'Wood Island', 'Airport', 'Maverick', 'Aquarium', 'State', 'Government Center', 
      'Bowdoin'
    ],
    'Bowdoin': [
      'Bowdoin', 'Government Center', 'State', 'Aquarium', 'Maverick', 'Airport', 
      'Wood Island', 'Orient Heights', 'Suffolk Downs', 'Beachmont', 'Revere Beach', 
      'Wonderland'
    ]
  },
  'Green Line': {
    'Lechmere & North': [
      'Lechmere', 'Science Park/West End', 'North Station', 'Haymarket', 
      'Government Center', 'Park Street', 'Boylston', 'Arlington', 'Copley', 
      'Hynes Convention Center', 'Kenmore'
    ],
    'Kenmore & West': [
      'Kenmore', 'Hynes Convention Center', 'Copley', 'Arlington', 'Boylston', 
      'Park Street', 'Government Center', 'Haymarket', 'North Station', 
      'Science Park/West End', 'Lechmere'
    ],
    'Cleveland Circle': [
      'Cleveland Circle', 'Dean Road', 'Tappan Street', 'Washington Square', 
      'Fairbanks Street', 'Reservoir', 'Chestnut Hill', 'Newton Centre', 
      'Newton Highlands', 'Eliot', 'Waban', 'Woodland', 'Riverside'
    ],
    'Heath Street': [
      'Heath Street', 'Back of the Hill', 'Riverway', 'Mission Park', 
      'Fenwood Road', 'Brigham Circle', 'Longwood Medical Area', 'Museum of Fine Arts', 
      'Northeastern University', 'Symphony', 'Prudential', 'Copley', 'Arlington', 
      'Boylston', 'Park Street', 'Government Center', 'Haymarket', 'North Station', 
      'Science Park/West End', 'Lechmere'
    ]
  },
  'Silver Line': {
    'South Station': [
      'South Station', 'Silver Line Way', 'Design Center', 'Eastern Avenue', 
      'Box District', 'Airport', 'Chelsea'
    ],
    'Chelsea': [
      'Chelsea', 'Airport', 'Box District', 'Eastern Avenue', 'Design Center', 
      'Silver Line Way', 'South Station'
    ]
  },
  'Mattapan Trolley': {
    'Ashmont': [
      'Ashmont', 'Cedar Grove', 'Butler', 'Milton', 'Central Avenue', 
      'Valley Road', 'Capen Street', 'Mattapan'
    ],
    'Mattapan': [
      'Mattapan', 'Capen Street', 'Valley Road', 'Central Avenue', 'Milton', 
      'Butler', 'Cedar Grove', 'Ashmont'
    ]
  }
};

// Function to extract train line name from stop description
function extractTrainLineName(description) {
  if (!description) return null;
  
  // Look for patterns like "Station Name - Line Name - Direction"
  const match = description.match(/- ([^-]+) -/);
  if (match) {
    return match[1].trim();
  }
  
  // Fallback: look for common line names
  const lineNames = [
    'Red Line', 'Orange Line', 'Blue Line', 'Green Line', 
    'Silver Line', 'Mattapan Trolley'
  ];
  
  for (const lineName of lineNames) {
    if (description.includes(lineName)) {
      return lineName;
    }
  }
  
  return null;
}

// Function to extract direction from platform name or description
function extractDirection(stop) {
  if (stop.attributes.platform_name) {
    return stop.attributes.platform_name;
  }
  
  // Fallback: extract from description
  const description = stop.attributes.description;
  if (description) {
    const match = description.match(/- ([^-]+)$/);
    if (match) {
      return match[1].trim();
    }
  }
  
  return null;
}

// Function to find the order index of a stop in its line sequence
function findStopOrderIndex(stop, lineName, direction) {
  const lineOrder = LINE_ORDERS[lineName]?.[direction];
  if (!lineOrder) return -1;
  
  const stopName = stop.attributes.name;
  return lineOrder.findIndex(name => 
    name.toLowerCase().includes(stopName.toLowerCase()) || 
    stopName.toLowerCase().includes(name.toLowerCase())
  );
}

// Function to get ordered stops for a line and direction
function getOrderedStopsForLine(lineName, direction, allStops) {
  const lineOrder = LINE_ORDERS[lineName]?.[direction];
  if (!lineOrder) return [];
  
  // Filter stops for this line and direction
  const lineStops = allStops.filter(stop => {
    const stopLineName = extractTrainLineName(stop.attributes.description);
    const stopDirection = extractDirection(stop);
    return stopLineName === lineName && stopDirection === direction;
  });
  
  // Sort stops according to the predefined order
  return lineStops.sort((a, b) => {
    const aIndex = findStopOrderIndex(a, lineName, direction);
    const bIndex = findStopOrderIndex(b, lineName, direction);
    return aIndex - bIndex;
  });
}

// Function to find adjacent stops using the ordered sequence
function findAdjacentStopsOrdered(targetStop, allStops) {
  const lineName = extractTrainLineName(targetStop.attributes.description);
  const direction = extractDirection(targetStop);
  
  if (!lineName || !direction) {
    return { previous: null, next: null, orderIndex: -1 };
  }
  
  const orderedStops = getOrderedStopsForLine(lineName, direction, allStops);
  const targetIndex = orderedStops.findIndex(stop => stop.id === targetStop.id);
  
  if (targetIndex === -1) {
    return { previous: null, next: null, orderIndex: -1 };
  }
  
  const previous = targetIndex > 0 ? orderedStops[targetIndex - 1] : null;
  const next = targetIndex < orderedStops.length - 1 ? orderedStops[targetIndex + 1] : null;
  
  return { 
    previous, 
    next, 
    orderIndex: targetIndex,
    totalStops: orderedStops.length
  };
}

// Function to get combined rapid transit data with ordered adjacent stops
function getCombinedRapidTransitData() {
  try {
    const rapidTransitData = JSON.parse(fs.readFileSync('Data/rapid-transit.json', 'utf8'));
    
    const rapidTransitStops = rapidTransitData.data.map(stop => {
      const adjacentInfo = findAdjacentStopsOrdered(stop, rapidTransitData.data);
      
      return {
        id: stop.id,
        name: stop.attributes.name,
        latitude: stop.attributes.latitude,
        longitude: stop.attributes.longitude,
        stop: stop.attributes.description,
        trainLineName: extractTrainLineName(stop.attributes.description),
        direction: extractDirection(stop),
        municipality: stop.attributes.municipality,
        wheelchairBoarding: stop.attributes.wheelchair_boarding,
        vehicleType: stop.attributes.vehicle_type,
        platformName: stop.attributes.platform_name,
        orderIndex: adjacentInfo.orderIndex,
        totalStopsInLine: adjacentInfo.totalStops,
        previousStop: adjacentInfo.previous ? {
          id: adjacentInfo.previous.id,
          name: adjacentInfo.previous.attributes.name,
          description: adjacentInfo.previous.attributes.description,
          orderIndex: adjacentInfo.orderIndex - 1
        } : null,
        nextStop: adjacentInfo.next ? {
          id: adjacentInfo.next.id,
          name: adjacentInfo.next.attributes.name,
          description: adjacentInfo.next.attributes.description,
          orderIndex: adjacentInfo.orderIndex + 1
        } : null
      };
    });
    
    return rapidTransitStops;
  } catch (error) {
    console.error('Error reading rapid transit data:', error);
    return [];
  }
}

// Function to get ordered stops for a specific line and direction
function getOrderedStopsForLineAndDirection(lineName, direction) {
  try {
    const rapidTransitData = JSON.parse(fs.readFileSync('Data/rapid-transit.json', 'utf8'));
    const orderedStops = getOrderedStopsForLine(lineName, direction, rapidTransitData.data);
    
    return orderedStops.map((stop, index) => ({
      orderIndex: index,
      id: stop.id,
      name: stop.attributes.name,
      description: stop.attributes.description,
      latitude: stop.attributes.latitude,
      longitude: stop.attributes.longitude,
      municipality: stop.attributes.municipality,
      wheelchairBoarding: stop.attributes.wheelchair_boarding
    }));
  } catch (error) {
    console.error('Error getting ordered stops:', error);
    return [];
  }
}

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

// Enhanced endpoint with ordered stops
app.get('/api/rapid-transit-stops', (c) => {
  const stops = getCombinedRapidTransitData();
  
  return c.json({
    message: 'Rapid transit stops with ordered adjacent stop information',
    data: stops,
    total: stops.length,
    timestamp: new Date().toISOString()
  });
});

// New endpoint to get ordered stops for a specific line and direction
app.get('/api/ordered-stops/:lineName/:direction', (c) => {
  const lineName = c.req.param('lineName');
  const direction = c.req.param('direction');
  
  const stops = getOrderedStopsForLineAndDirection(lineName, direction);
  
  return c.json({
    message: `Ordered stops for ${lineName} - ${direction}`,
    lineName: lineName,
    direction: direction,
    data: stops,
    total: stops.length,
    timestamp: new Date().toISOString()
  });
});

// New endpoint to get all available line orders
app.get('/api/line-orders', (c) => {
  const lineOrders = Object.keys(LINE_ORDERS).map(lineName => ({
    lineName: lineName,
    directions: Object.keys(LINE_ORDERS[lineName]),
    totalStops: Object.values(LINE_ORDERS[lineName]).reduce((sum, stops) => sum + stops.length, 0)
  }));
  
  return c.json({
    message: 'Available line orders',
    data: lineOrders,
    total: lineOrders.length,
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