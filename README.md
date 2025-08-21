# MBTA Middleware API

A fast, lightweight API server built with Bun and Hono that provides structured access to MBTA (Massachusetts Bay Transportation Authority) rapid transit data. This project serves as a middleware layer that processes and organizes MBTA route and stop information for easy consumption by frontend applications.

## 🚇 Features

- **Rapid Transit Data**: Access to all MBTA rapid transit lines (Red, Orange, Blue, Green, Silver, Mattapan Trolley)
- **Ordered Stop Sequences**: Stops are properly ordered by their sequence in each line and direction
- **Adjacent Stop Information**: Each stop includes data about the previous and next stops
- **Line and Direction Mapping**: Comprehensive mapping of all line directions and their stops
- **Real-time Data Processing**: Dynamic processing of MBTA data with proper error handling
- **Fast Performance**: Built with Bun for optimal performance and Hono for efficient routing

## 🛠️ Tech Stack

- **Runtime**: [Bun](https://bun.sh) - Fast JavaScript runtime
- **Framework**: [Hono](https://hono.dev) - Lightweight web framework
- **Data**: MBTA GTFS data (routes, stops, lines)
- **Language**: JavaScript (ES modules)

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd mbtamiddle

# Install dependencies
bun install
```

## 🚀 Quick Start

```bash
# Start the development server with auto-reload
bun --watch index.js

# Or start in production mode
bun run index.js
```

The server will start on `http://localhost:3000`

## 📊 Data Structure

### Stop Object
```json
{
  "id": "70077",
  "name": "Downtown Crossing",
  "latitude": 42.355518,
  "longitude": -71.060225,
  "stop": "Downtown Crossing - Red Line - Ashmont/Braintree",
  "trainLineName": "Red Line",
  "direction": "Ashmont/Braintree",
  "orderIndex": 8,
  "totalStopsInLine": 22,
  "previousStop": {
    "id": "70078",
    "name": "South Station",
    "orderIndex": 7
  },
  "nextStop": {
    "id": "70076",
    "name": "Park Street",
    "orderIndex": 9
  }
}
```

## 🔧 Development

## 🎯 Use Cases

- **Transit Apps**: Provide structured data for mobile/web transit applications
- **Real-time Updates**: Base layer for real-time transit information
- **Route Planning**: Support for journey planning algorithms
- **Data Analysis**: Clean, structured data for transit analytics
- **Educational Tools**: Teaching resources for MBTA system understanding

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [MBTA](https://www.mbta.com/) for providing the transit data
- [Bun](https://bun.sh) for the fast JavaScript runtime
- [Hono](https://hono.dev) for the lightweight web framework

---

Built with ❤️ for the Boston transit community
