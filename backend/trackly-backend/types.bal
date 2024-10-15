public type Location record {| 
    float? lat;  // Latitude
    float? lng;  // Longitude
|};

public type Bounds record {| 
    Location? northeast;  
    Location? southwest;  
|};

public type Leg record {| 
    Location start_location;
    Location end_location; 
    string distance; 
    string duration;      
|};

public type Route record {| 
    string polyline;         
    Bounds bounds;         
    Leg[] legs;           
    int[]? waypointOrder;
|};

public type ScheduleEntry record {| 
    string departureTime;
    string departurePlace;
    string arrivalTime;
    string arrivalPlace;
|};

// Define a record for a day's schedule
public type ScheduleDay record {| 
    string day;              
    ScheduleEntry[] entries; 
|};

// Define the main input record for bus details
public type BusInput record {| 
    string firstName;
    string lastName;
    string phoneNumber;
    string vehicleNumber;
    Route route;   
    ScheduleDay[] schedules;
|};



public type BusUpdate record {|
    string firstName;
    string lastName;
    string phoneNumber;
    string vehicleNumber;
    Route route;   
    ScheduleDay[] schedules;
|};

public type Bus record {|
    readonly string id;
    *BusInput;
|};
