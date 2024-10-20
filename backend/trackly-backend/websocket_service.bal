import ballerina/log;
import ballerina/websocket;
import ballerina/lang.runtime;
import ballerina/io;

type BusLocation record {
    string vehicleNumber;
    decimal latitude;
    decimal longitude;
};

service /busTracking on new websocket:Listener(9090) {
    resource function get buses/[string vehicleNumber]() returns websocket:Service {
        return new BusTrackingService(vehicleNumber);
    }
}

distinct service class BusTrackingService {
    *websocket:Service;

    private final string vehicleNumber;
    private decimal latitude;
    private decimal longitude;

    function init(string vehicleNumber) { 
        self.vehicleNumber = vehicleNumber;
        // Initialize with a starting position
        if (vehicleNumber == "Bus101") {
            self.latitude = 6.9271; // Starting latitude for Bus 101
            self.longitude = 79.8612; // Starting longitude for Bus 101
        } else if (vehicleNumber == "Bus102") {
            self.latitude = 6.9358; // Starting latitude for Bus 102
            self.longitude = 79.8528; // Starting longitude for Bus 102
        } else {
            self.latitude = 6.9271; // Default starting latitude
            self.longitude = 79.8612; // Default starting longitude
        }
    }

    remote function onOpen(websocket:Caller caller) returns error? {
        log:printInfo("WebSocket connection established for bus: " + self.vehicleNumber);
        _ = start self.sendBusLocationUpdates(caller, self.vehicleNumber);
        return;
    }

    remote function onClose(websocket:Caller caller) {
        log:printInfo("WebSocket connection closed for bus: " + self.vehicleNumber);
    }

    remote function onError(websocket:Caller caller, error err) {
        log:printInfo("Error occurred for bus: " + self.vehicleNumber + " Error: " + err.message());
    }

    function sendBusLocationUpdates(websocket:Caller caller, string vehicleNumber) returns error? {
        io:print("sendBusCalled");
        decimal latitude = 6.9271; // Initial latitude for Bus101
        decimal longitude = 79.8612; // Initial longitude for Bus101

        while true {
            // Update the bus's position to simulate movement
            if (vehicleNumber == "Bus101") {
                latitude += 0.0001d; // Increment latitude slightly
                longitude += 0.0001d; // Increment longitude slightly
            } else if (vehicleNumber == "Bus102") {
                latitude -= 0.0001d; // Decrement latitude slightly
                longitude += 0.0001d; // Increment longitude slightly
            }
            
            BusLocation currentLocation = {vehicleNumber: vehicleNumber, latitude: latitude, longitude: longitude};
            check caller->writeMessage(currentLocation);
            runtime:sleep(0.5); // Wait for 1 second before sending the next update
        }
    }

}
