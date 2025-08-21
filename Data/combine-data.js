import fs from 'fs';

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

// Function to combine lines and stops data
function combineLinesAndStops() {
  try {
    console.log('Reading rapid-transit.json...');
    const rapidTransitData = JSON.parse(fs.readFileSync('Data/rapid-transit.json', 'utf8'));
    
    console.log('Reading lines.json...');
    const linesData = JSON.parse(fs.readFileSync('Data/lines.json', 'utf8'));
    
    console.log(`Processing ${rapidTransitData.data.length} stops...`);
    
    // Create a map of line names to line data for easy lookup
    const lineMap = new Map();
    linesData.data.forEach(line => {
      const lineName = line.attributes.long_name;
      lineMap.set(lineName, line);
    });
    
    // Process each stop and add train line information
    const combinedStops = rapidTransitData.data.map(stop => {
      const trainLineName = extractTrainLineName(stop.attributes.description);
      const lineData = trainLineName ? lineMap.get(trainLineName) : null;
      
      return {
        id: stop.id,
        name: stop.attributes.name,
        latitude: stop.attributes.latitude,
        longitude: stop.attributes.longitude,
        stop: stop.attributes.description,
        trainLineName: trainLineName,
        lineColor: lineData ? lineData.attributes.color : null,
        lineTextColor: lineData ? lineData.attributes.text_color : null,
        municipality: stop.attributes.municipality,
        wheelchairBoarding: stop.attributes.wheelchair_boarding,
        vehicleType: stop.attributes.vehicle_type,
        platformName: stop.attributes.platform_name
      };
    });
    
    // Create the combined dataset
    const combinedData = {
      metadata: {
        created_at: new Date().toISOString(),
        total_stops: combinedStops.length,
        description: "Combined rapid transit stops with line information"
      },
      data: combinedStops
    };
    
    // Write the combined data to file
    fs.writeFileSync('Data/combined-rapid-transit.json', JSON.stringify(combinedData, null, 2));
    
    console.log('✅ Successfully created combined dataset');
    
    return {
      success: true,
      total: combinedStops.length
    };
    
  } catch (error) {
    console.error('❌ Error combining data:', error);
    return { success: false, error: error.message };
  }
}

// Execute the combination
console.log('🔄 Starting data combination process...');
const results = combineLinesAndStops();

if (results.success) {
  console.log(`\n📊 Summary:`);
  console.log(`   Total stops processed: ${results.total}`);
  console.log(`   Output file: Data/combined-rapid-transit.json`);
} else {
  console.log(`❌ Failed to combine data: ${results.error}`);
}