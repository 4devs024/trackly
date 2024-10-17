import ballerinax/mysql;
import ballerina/sql;

configurable int port = ?;
configurable string host = ?;
configurable string user = ?;
configurable string database = ?;
configurable string password = ?;
configurable mysql:Options & readonly connectionOptions = {};

final mysql:Client dbClient = check new(
    host = host,
    port =  port,
    database =  database,
    user =  user,
    password =  password,
    options = connectionOptions
);

isolated function insertBus(BusInput busInput) returns sql:ExecutionResult|error {
    // Insert Bus
    sql:ParameterizedQuery insertBusQuery = `INSERT INTO buses (vehicle_number, first_name, last_name, phone_number) 
                                             VALUES (${busInput.vehicleNumber}, ${busInput.firstName}, ${busInput.lastName}, ${busInput.phoneNumber})`;
    sql:ExecutionResult result = check dbClient->execute(insertBusQuery);

    // Insert Route
    Route route = busInput.route;
    float northeastLat = route.bounds.northeast?.lat ?: 0.0;
    float northeastLng = route.bounds.northeast?.lng ?: 0.0;
    float southwestLat = route.bounds.southwest?.lat ?: 0.0;
    float southwestLng = route.bounds.southwest?.lng ?: 0.0;

    sql:ParameterizedQuery insertRouteQuery = `INSERT INTO routes (vehicle_number, polyline, northeast_lat, northeast_lng, southwest_lat, southwest_lng) 
                                                VALUES (${busInput.vehicleNumber}, ${route.polyline}, ${northeastLat}, ${northeastLng}, ${southwestLat}, ${southwestLng})`;
    result = check dbClient->execute(insertRouteQuery);

    // Retrieve the last inserted route_id
    int routeId = check getLastInsertId(); // Assuming you have a helper function to fetch last inserted id

    // Insert Legs
    foreach Leg leg in route.legs {
        sql:ParameterizedQuery insertLegQuery = `INSERT INTO legs (route_id, start_lat, start_lng, end_lat, end_lng, distance, duration) 
                                                 VALUES (${routeId}, ${leg.start_location.lat}, ${leg.start_location.lng}, 
                                                         ${leg.end_location.lat}, ${leg.end_location.lng}, ${leg.distance}, ${leg.duration})`;
        result = check dbClient->execute(insertLegQuery);
    }

    // Insert Schedule Entries
    foreach ScheduleDay scheduleDay in busInput.schedules {
        foreach ScheduleEntry entry in scheduleDay.entries {
            sql:ParameterizedQuery insertScheduleQuery = `INSERT INTO schedules (vehicle_number, day_of_week, departure_time, departure_place, 
                                                        arrival_time, arrival_place) 
                                                         VALUES (${busInput.vehicleNumber}, ${scheduleDay.day}, 
                                                                 ${entry.departureTime}, ${entry.departurePlace}, 
                                                                 ${entry.arrivalTime}, ${entry.arrivalPlace})`;
            result = check dbClient->execute(insertScheduleQuery);
        }
    }
    return result;
}

// Helper function to get the last inserted ID (route_id)
isolated function getLastInsertId() returns int|error {
    sql:ParameterizedQuery lastInsertIdQuery = `SELECT LAST_INSERT_ID() as id`;
    record {| int id; |} result = check dbClient->queryRow(lastInsertIdQuery);
    return result.id;
}


isolated function selectBus(string vehicleNumber) returns sql:Error | BusInput | error {
    // Initialize BusInput structure with default values
    BusInput busInput = { 
        firstName: "", 
        lastName: "", 
        phoneNumber: "", 
        vehicleNumber: vehicleNumber, 
        route: {
            legs: [], 
            bounds: {
                northeast: {lat: 0.0, lng: 0.0}, 
                southwest: {lat: 0.0, lng: 0.0}
            }, 
            waypointOrder: (), 
            polyline: ""
        }, 
        schedules: [
            {day: "Monday", entries: []},
            {day: "Tuesday", entries: []},
            {day: "Wednesday", entries: []},
            {day: "Thursday", entries: []},
            {day: "Friday", entries: []},
            {day: "Saturday", entries: []},
            {day: "Sunday", entries: []}
        ] 
    };

    // SQL query to retrieve all data at once
    sql:ParameterizedQuery selectBusDataQuery = `SELECT 
        b.vehicle_number, b.first_name, b.last_name, b.phone_number,
        r.polyline, r.northeast_lat, r.northeast_lng, r.southwest_lat, r.southwest_lng,
        l.start_lat, l.start_lng, l.end_lat, l.end_lng, l.distance, l.duration,
        s.day_of_week, s.departure_time, s.departure_place, s.arrival_time, s.arrival_place
        FROM buses b
        LEFT JOIN routes r ON b.vehicle_number = r.vehicle_number
        LEFT JOIN legs l ON r.route_id = l.route_id
        LEFT JOIN schedules s ON b.vehicle_number = s.vehicle_number
        WHERE b.vehicle_number = ${vehicleNumber}`;

    // Stream result from the query
    stream<record {| 
        string vehicle_number; 
        string first_name; 
        string last_name; 
        string phone_number; 
        string polyline; 
        float northeast_lat; 
        float northeast_lng; 
        float southwest_lat; 
        float southwest_lng; 
        float? start_lat; 
        float? start_lng; 
        float? end_lat; 
        float? end_lng; 
        string? distance; 
        string? duration; 
        string? day_of_week; 
        string? departure_time; 
        string? departure_place; 
        string? arrival_time; 
        string? arrival_place; 
    |}, error?> busStream = dbClient->query(selectBusDataQuery);

    // Process the results
    check from var busRecord in busStream
        do {
            // Set bus details (only once)
            if busInput.firstName == "" {
                busInput.firstName = busRecord.first_name;
                busInput.lastName = busRecord.last_name;
                busInput.phoneNumber = busRecord.phone_number;

                // Set route information (also set once)
                busInput.route.polyline = busRecord.polyline;
                busInput.route.bounds.northeast = {
                    lat: busRecord.northeast_lat,
                    lng: busRecord.northeast_lng
                };
                busInput.route.bounds.southwest = {
                    lat: busRecord.southwest_lat,
                    lng: busRecord.southwest_lng
                };
            }

            // Process leg information (optional)
            if busRecord.start_lat is float && busRecord.start_lng is float && busRecord.end_lat is float && busRecord.end_lng is float {
                Leg leg = {
                    start_location: {lat: busRecord.start_lat, lng: busRecord.start_lng},
                    end_location: {lat: busRecord.end_lat, lng: busRecord.end_lng},
                    distance: busRecord.distance ?: "0.0",
                    duration: busRecord.duration ?: "0.0"
                };
                busInput.route.legs.push(leg);
            }

            // Process schedule information (optional)
            if busRecord.day_of_week is string && busRecord.departure_time is string && busRecord.arrival_time is string {
                ScheduleEntry entry = {
                    departureTime: busRecord.departure_time ?: "",
                    departurePlace: busRecord.departure_place ?: "",
                    arrivalTime: busRecord.arrival_time ?: "",
                    arrivalPlace: busRecord.arrival_place ?: ""
                };

                // Add entry to the corresponding day in schedules
                foreach var schedule in busInput.schedules {
                    if schedule.day == busRecord.day_of_week {
                        // Check if the entry already exists to prevent duplication
                        boolean entryExists = false;
                        foreach var existingEntry in schedule.entries {
                            if existingEntry.departureTime == entry.departureTime && 
                            existingEntry.arrivalTime == entry.arrivalTime &&
                            existingEntry.departurePlace == entry.departurePlace &&
                            existingEntry.arrivalPlace == entry.arrivalPlace {
                                entryExists = true;
                                break;
                            }
                        }
                        if !entryExists {
                            // Add the entry if it doesn't already exist
                            schedule.entries.push(entry);
                        }
                        break;
                    }
                }            
            }
        };

    // Close the stream after processing
    check busStream.close();

    // Return the populated BusInput structure
    return busInput;
}





// isolated function selectAllOrders() returns Order[]|error {
//     sql:ParameterizedQuery selectQuery = `SELECT * FROM Orders`;
//     stream<Order, error?> orderStream = dbClient->query(selectQuery);
//     return from Order ord in orderStream select ord;
// }

// isolated function selectOrdersByCargoId(string cargoId) returns Order[]|error {
//     sql:ParameterizedQuery selectQuery = `SELECT * FROM Orders WHERE cargoId = ${cargoId} order by quantity desc`;
//     stream<Order, error?> orderStream = dbClient->query(selectQuery);
//     return from Order ord in orderStream select ord;
// }

// isolated function getLocationOfCargo(string cargoId) returns Location|sql:Error {
//     sql:ParameterizedQuery selectQuery = `SELECT latitude, longitude FROM locations ORDER BY RAND() LIMIT 1`;
//     return dbClient->queryRow(selectQuery);
// }


