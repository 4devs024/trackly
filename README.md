# Bus Tracking Application

## Overview

The **Bus Tracking Application** is a web-based system designed to provide *real-time tracking* of public buses. The application enables passengers to easily locate buses based on their current location and intended destination. By leveraging Google Maps API and a custom backend built with Ballerina, the app calculates bus schedules, real-time positions, and provides users with an interactive experience similar to popular ride-hailing services like Uber.

## Features

- **Real-Time Bus Tracking**: Passengers can view the real-time location of buses on a map, ensuring they have accurate information about bus arrivals and departures.
- **Dynamic Schedule Calculation**: The application allows passengers to select their start and end locations along a bus route. It calculates relevant bus schedules, taking into account the current time, and shows only upcoming trips.
- **Polyline Navigation**: The app simulates the bus's movement along predefined routes using polyline data. This gives passengers a visual representation of the bus's journey.
- **WebSocket Integration**: Real-time updates of bus positions are sent to the frontend using WebSockets, ensuring seamless communication between the backend and the client.

## How It Works

1. **User Input**: Passengers input their current location and desired destination. The application uses this information to determine the relevant bus route and schedules.
2. **Schedule Retrieval**: The application queries the backend to fetch bus schedules based on the passenger's selected route. The schedules are filtered to skip past trips and show only the upcoming departures.
3. **Bus Location Updates**:
   - The backend retrieves the current bus position based on the selected route's polyline data.
   - The bus's location is updated periodically, simulating movement along the route.
   - Each update consists of latitude and longitude values, which are sent to the frontend every second.
4. **Visual Representation**: The frontend displays the bus's current location on Google Maps, along with the route polyline, giving passengers a clear visual of where the bus is and when it is expected to arrive at their stop.

## Technical Stack

- **Frontend**: Built using React, providing a responsive and dynamic user interface.
- **Backend**: Developed with Ballerina, utilizing WebSockets for real-time communication and MySQL for data storage.
- **APIs**: Google Maps API for route visualization and real-time traffic information.

## Getting Started

To get started with the application, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bus-tracking-app

2. Install the necessary dependencies:
   ```bash
   npm install
   
3. Start the backend server:
   ```bash
   ballerina run <backend-file.bal>

4. Start the frontend application:
   ```bash
   npm start

5. Open your browser and navigate to http://localhost:3000 to access the application.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.
