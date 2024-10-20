import { lineString } from '@turf/turf'; // Correct import for lineString
import { point } from '@turf/helpers'; // Correct import for point
import nearestPointOnLine from '@turf/nearest-point-on-line'; // Correct import for nearestPointOnLine
import polyline from '@mapbox/polyline';

// Calculate the nearest point on the bus route to the passenger's location
export const calculateNearestPoint = (startPosition, endPosition, busData) => {
    try {
        const passengerStartPoint = point([startPosition.lng, startPosition.lat]);
        const passengerEndPoint = point([endPosition.lng, endPosition.lat]);

        let nearestBus = null;
        let minDistance = Infinity;

        busData.forEach((bus) => {
            if (!bus.route || !bus.route.polyline) {
                console.error(`Bus route or polyline is missing for vehicle: ${bus.vehicleNumber}`);
                return;
            }

            // Decode the polyline for each bus
            const decodedPolyline = polyline.decode(bus.route.polyline); // Returns [lat, lng] pairs
            const busRouteLine = lineString(
                decodedPolyline.map(([lat, lng]) => [lng, lat]) // Turf.js expects [lng, lat]
            );

            // Find the nearest points on the bus route for the passenger's start and end locations
            const nearestStartPoint = nearestPointOnLine(busRouteLine, passengerStartPoint);
            const nearestEndPoint = nearestPointOnLine(busRouteLine, passengerEndPoint);

            // Compare distances
            const distanceStart = nearestStartPoint.properties.dist;
            const distanceEnd = nearestEndPoint.properties.dist;

            // Determine the closest bus based on either start or end distances
            if (distanceStart < minDistance) {
                minDistance = distanceStart; // Update minimum distance
                nearestBus = bus.vehicleNumber; // Update nearest bus
            }

            if (distanceEnd < minDistance) {
                minDistance = distanceEnd; // Update minimum distance
                nearestBus = bus.vehicleNumber; // Update nearest bus
            }
        });

        if (nearestBus) {
            return nearestBus; // Return the nearest bus
        } else {
            console.error('Could not find a nearest point on any bus route');
            return null; // Return null if no nearest bus is found
        }
    } catch (error) {
        console.error('Error calculating nearest point:', error);
        return null; // Return null in case of error
    }
};
