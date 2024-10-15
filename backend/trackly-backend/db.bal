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


isolated function selectBus(string vehicleNumber) returns sql:Error|BusInput {
    // Create a variable to hold the bus input
    BusInput busInput = { 
        firstName: "", 
        lastName: "", 
        phoneNumber: "", 
        vehicleNumber: vehicleNumber, 
        route: {legs: [], bounds: {northeast: {lat: 0.0, lng: 0.0}, southwest: {lat: 0.0, lng: 0.0}}, waypointOrder: (), polyline: ""}, 
        schedules: [
                        {day: "monday", entries: []},
                        {day: "tuesday", entries: []},
                        {day: "wednesday", entries: []},
                        {day: "thursday", entries: []},
                        {day: "friday", entries: []},
                        {day: "saturday", entries: []},
                        {day: "sunday", entries: []}
                    ] 
    };

    sql:ParameterizedQuery selectBusQuery = `SELECT first_name, last_name, phone_number FROM buses WHERE vehicle_number = ${vehicleNumber}`;
    sql:ParameterizedQuery selectRouteQuery = `SELECT polyline, northeast_lat, northeast_lng, southwest_lat, southwest_lng FROM routes WHERE vehicle_number = ${vehicleNumber}`;
    
    // Get basic bus info
    Bus|sql:Error busStream = dbClient->queryRow(selectBusQuery);

    if busStream is Bus {
        busInput.firstName = busStream.firstName;
        busInput.lastName = busStream.lastName;
        busInput.phoneNumber = busStream.phoneNumber;
    } 

    // Get route info
    Route|sql:Error routeStream = dbClient->queryRow(selectRouteQuery);

    if routeStream is Route {
        Route route = {
            polyline: routeStream.polyline,
            bounds: routeStream.bounds,
            legs: routeStream.legs,
            waypointOrder: routeStream.waypointOrder // Assuming legs will be filled later or are not needed in this query
        };

        busInput.route = route;
    }

    // Get schedule info
    sql:ParameterizedQuery selectScheduleQuery = `SELECT day_of_week, departure_time, departure_place, arrival_time, arrival_place FROM schedules WHERE vehicle_number = ${vehicleNumber}`;
    stream<ScheduleEntry, error?> scheduleStream = dbClient->query(selectScheduleQuery);

    // Iterate through the schedule stream and update busInput.schedules
    while (scheduleStream.next() !== null) {
        record {|ScheduleEntry value;|}|error? entry = scheduleStream.next();
        if entry is ScheduleEntry {
            // Find the correct schedule day and append the entry
            foreach var schedule in busInput.schedules {
                if schedule.day == entry.day_of_week {
                    schedule.entries.push({
                        departureTime: entry.departure_time,
                        departurePlace: entry.departure_place,
                        arrivalTime: entry.arrival_time,
                        arrivalPlace: entry.arrival_place
                    });
                }
            }
        } if entry is error {
            return sql:NoRowsError;
        }
    }

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