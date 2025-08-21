const mbtaGraph = {
    // ===== RED LINE - Alewife to Ashmont =====
    "Alewife": { "Davis": { lines: ["Red"] } },
    "Davis": { "Alewife": { lines: ["Red"] }, "Porter": { lines: ["Red"] } },
    "Porter": { "Davis": { lines: ["Red"] }, "Harvard": { lines: ["Red"] } },
    "Harvard": { "Porter": { lines: ["Red"] }, "Central": { lines: ["Red"] } },
    "Central": { "Harvard": { lines: ["Red"] }, "Kendall/MIT": { lines: ["Red"] } },
    "Kendall/MIT": { "Central": { lines: ["Red"] }, "Charles/MGH": { lines: ["Red"] } },
    "Charles/MGH": { "Kendall/MIT": { lines: ["Red"] }, "Park Street": { lines: ["Red"] } },
    "Park Street": {
      "Charles/MGH": { lines: ["Red"] },
      "Downtown Crossing": { lines: ["Red"] },
      // Park Street is also a transfer station to the Green Line
      "Park Street": { lines: ["Red", "Green"], isTransfer: true }
    },
    "Downtown Crossing": {
      "Park Street": { lines: ["Red"] },
      "South Station": { lines: ["Red"] },
      // Downtown Crossing is also a transfer station to the Orange Line
      "Downtown Crossing": { lines: ["Red", "Orange"], isTransfer: true }
    },
    "South Station": {
      "Downtown Crossing": { lines: ["Red"] },
      "Broadway": { lines: ["Red"] },
      "South Station": { lines: ["Red", "Silver"], isTransfer: true } // Silver Line connection
    },
    "Broadway": { "South Station": { lines: ["Red"] }, "Andrew": { lines: ["Red"] } },
    "Andrew": { "Broadway": { lines: ["Red"] }, "JFK/UMass": { lines: ["Red"] } },
    "JFK/UMass": {
      "Andrew": { lines: ["Red"] },
      "Savin Hill": { lines: ["Red"] },
      "North Quincy": { lines: ["Red"] },
      "JFK/UMass": { lines: ["Red", "Mattapan"], isTransfer: true } // Transfer to Ashmont platform
    },
    // Ashmont Branch
    "Savin Hill": { "JFK/UMass": { lines: ["Red"] }, "Fields Corner": { lines: ["Red"] } },
    "Fields Corner": { "Savin Hill": { lines: ["Red"] }, "Shawmut": { lines: ["Red"] } },
    "Shawmut": { "Fields Corner": { lines: ["Red"] }, "Ashmont": { lines: ["Red"] } },
    "Ashmont": {
      "Shawmut": { lines: ["Red"] },
      "Ashmont": { lines: ["Red", "Mattapan"], isTransfer: true } // Transfer to Mattapan Trolley
    },
    // Braintree Branch
    "North Quincy": { "JFK/UMass": { lines: ["Red"] }, "Wollaston": { lines: ["Red"] } },
    "Wollaston": { "North Quincy": { lines: ["Red"] }, "Quincy Center": { lines: ["Red"] } },
    "Quincy Center": { "Wollaston": { lines: ["Red"] }, "Quincy Adams": { lines: ["Red"] } },
    "Quincy Adams": { "Quincy Center": { lines: ["Red"] }, "Braintree": { lines: ["Red"] } },
    "Braintree": { "Quincy Adams": { lines: ["Red"] } },
  
    // ===== MATTAPAN TROLLEY =====
    "Cedar Grove": { "Ashmont": { lines: ["Mattapan"] }, "Butler": { lines: ["Mattapan"] } },
    "Butler": { "Cedar Grove": { lines: ["Mattapan"] }, "Milton": { lines: ["Mattapan"] } },
    "Milton": { "Butler": { lines: ["Mattapan"] }, "Central Avenue": { lines: ["Mattapan"] } },
    "Central Avenue": { "Milton": { lines: ["Mattapan"] }, "Valley Road": { lines: ["Mattapan"] } },
    "Valley Road": { "Central Avenue": { lines: ["Mattapan"] }, "Capen Street": { lines: ["Mattapan"] } },
    "Capen Street": { "Valley Road": { lines: ["Mattapan"] }, "Mattapan": { lines: ["Mattapan"] } },
    "Mattapan": { "Capen Street": { lines: ["Mattapan"] } },
  
    // ===== ORANGE LINE =====
    "Oak Grove": { "Malden Center": { lines: ["Orange"] } },
    "Malden Center": { "Oak Grove": { lines: ["Orange"] }, "Wellington": { lines: ["Orange"] } },
    "Wellington": { "Malden Center": { lines: ["Orange"] }, "Assembly": { lines: ["Orange"] } },
    "Assembly": { "Wellington": { lines: ["Orange"] }, "Sullivan Square": { lines: ["Orange"] } },
    "Sullivan Square": { "Assembly": { lines: ["Orange"] }, "Community College": { lines: ["Orange"] } },
    "Community College": { "Sullivan Square": { lines: ["Orange"] }, "North Station": { lines: ["Orange"] } },
    "North Station": {
      "Community College": { lines: ["Orange"] },
      "Haymarket": { lines: ["Orange"] },
      "North Station": { lines: ["Orange", "Green"], isTransfer: true } // Transfer to Green Line
    },
    "Haymarket": {
      "North Station": { lines: ["Orange"] },
      "State": { lines: ["Orange"] },
      "Haymarket": { lines: ["Orange", "Green"], isTransfer: true } // Transfer to Green Line
    },
    "State": {
      "Haymarket": { lines: ["Orange"] },
      "Downtown Crossing": { lines: ["Orange"] },
      "State": { lines: ["Orange", "Blue"], isTransfer: true } // Transfer to Blue Line
    },
    "Downtown Crossing": {
      // Connection to Red Line is already defined above as a transfer
      "State": { lines: ["Orange"] },
      "Chinatown": { lines: ["Orange"] }
    },
    "Chinatown": { "Downtown Crossing": { lines: ["Orange"] }, "Tufts Medical Center": { lines: ["Orange"] } },
    "Tufts Medical Center": { "Chinatown": { lines: ["Orange"] }, "Back Bay": { lines: ["Orange"] } },
    "Back Bay": { "Tufts Medical Center": { lines: ["Orange"] }, "Massachusetts Avenue": { lines: ["Orange"] } },
    "Massachusetts Avenue": { "Back Bay": { lines: ["Orange"] }, "Ruggles": { lines: ["Orange"] } },
    "Ruggles": { "Massachusetts Avenue": { lines: ["Orange"] }, "Roxbury Crossing": { lines: ["Orange"] } },
    "Roxbury Crossing": { "Ruggles": { lines: ["Orange"] }, "Jackson Square": { lines: ["Orange"] } },
    "Jackson Square": { "Roxbury Crossing": { lines: ["Orange"] }, "Stony Brook": { lines: ["Orange"] } },
    "Stony Brook": { "Jackson Square": { lines: ["Orange"] }, "Green Street": { lines: ["Orange"] } },
    "Green Street": { "Stony Brook": { lines: ["Orange"] }, "Forest Hills": { lines: ["Orange"] } },
    "Forest Hills": { "Green Street": { lines: ["Orange"] } },
  
    // ===== BLUE LINE =====
    "Bowdoin": { "Government Center": { lines: ["Blue"] } },
    "Government Center": {
      "Bowdoin": { lines: ["Blue"] },
      "State": { lines: ["Blue"] },
      "Government Center": { lines: ["Blue", "Green"], isTransfer: true } // Transfer to Green Line
    },
    "State": {
      "Government Center": { lines: ["Blue"] },
      "Aquarium": { lines: ["Blue"] }
      // Transfer to Orange is already defined above
    },
    "Aquarium": { "State": { lines: ["Blue"] }, "Maverick": { lines: ["Blue"] } },
    "Maverick": { "Aquarium": { lines: ["Blue"] }, "Airport": { lines: ["Blue"] } },
    "Airport": { "Maverick": { lines: ["Blue"] }, "Wood Island": { lines: ["Blue"] } },
    "Wood Island": { "Airport": { lines: ["Blue"] }, "Orient Heights": { lines: ["Blue"] } },
    "Orient Heights": { "Wood Island": { lines: ["Blue"] }, "Suffolk Downs": { lines: ["Blue"] } },
    "Suffolk Downs": { "Orient Heights": { lines: ["Blue"] }, "Beachmont": { lines: ["Blue"] } },
    "Beachmont": { "Suffolk Downs": { lines: ["Blue"] }, "Revere Beach": { lines: ["Blue"] } },
    "Revere Beach": { "Beachmont": { lines: ["Blue"] }, "Wonderland": { lines: ["Blue"] } },
    "Wonderland": { "Revere Beach": { lines: ["Blue"] } },
  
    // ===== GREEN LINE TRUNK & KEY TRANSFERS =====
    // The trunk line is the shared route in downtown Boston
    "North Station": {
      // Connection to Orange is already defined above as a transfer
      "Haymarket": { lines: ["Green"] }
    },
    "Haymarket": {
      "North Station": { lines: ["Green"] },
      "Government Center": { lines: ["Green"] }
    },
    "Government Center": {
      "Haymarket": { lines: ["Green"] },
      "Park Street": { lines: ["Green"] }
    },
    "Park Street": {
      "Government Center": { lines: ["Green"] },
      "Boylston": { lines: ["Green"] }
    },
    "Boylston": { "Park Street": { lines: ["Green"] }, "Arlington": { lines: ["Green"] } },
    "Arlington": { "Boylston": { lines: ["Green"] }, "Copley": { lines: ["Green"] } },
    "Copley": { "Arlington": { lines: ["Green"] }, "Hynes Convention Center": { lines: ["Green"] } },
    "Hynes Convention Center": { "Copley": { lines: ["Green"] }, "Kenmore": { lines: ["Green"] } },
    "Kenmore": {
      "Hynes Convention Center": { lines: ["Green"] },
      // Kenmore is a surface-level transfer point to all Branches (B, C, D)
      "Kenmore": { lines: ["Green", "Green-B", "Green-C", "Green-D"], isTransfer: true }
    },
  
    // ===== KEY GREEN LINE BRANCH STOPS (for context and major transfers) =====
    "Blandford Street": { "Kenmore": { lines: ["Green-B"] }, "Boston University East": { lines: ["Green-B"] } },
    "Cleveland Circle": { "Englewood Avenue": { lines: ["Green-C"] } },
    "Riverside": { "Woodland": { lines: ["Green-D"] } },
    "Heath Street": { "Back of the Hill": { lines: ["Green-E"] } },
    "Prudential": { "Copley": { lines: ["Green-E"] }, "Symphony": { lines: ["Green-E"] } },
    "Symphony": { "Prudential": { lines: ["Green-E"] }, "Northeastern University": { lines: ["Green-E"] } },
    "Northeastern University": { "Symphony": { lines: ["Green-E"] }, "Museum of Fine Arts": { lines: ["Green-E"] } },
    // ... more Green Line stops can be added here following the same pattern
  };
  
  // How to use this graph:
  // Find all connections from State Street

  //console.log(mbtaGraph["State"]);
  
  
  /* Output:
  {
    "Haymarket": { lines: [ "Orange" ] },
    "Downtown Crossing": { lines: [ "Orange" ] },
    "State": { lines: [ "Orange", "Blue" ], isTransfer: true },
    "Government Center": { lines: [ "Blue" ] },
    "Aquarium": { lines: [ "Blue" ] }
  }
  */
  