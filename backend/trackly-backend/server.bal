import ballerina/http;
import ballerina/sql;

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowMethods: ["GET", "POST", "OPTIONS"]
    }
}

service on new http:Listener(9091) {
    // isolated resource function get orders() returns Order[]|error {
    //     return selectAllOrders();
    // };

    isolated resource function get buses/[string id]() returns BusInput|http:InternalServerError|http:NotFound|error {
        sql:Error|BusInput entry = check selectBus(id);
        if entry is BusInput {
            return entry;
        }
        if (entry is sql:NoRowsError) {
            return <http:NotFound>{body: {message: "Order not found"}};
        }
        return <http:InternalServerError>{body: {message: "Error occurred while retrieving the order"}};
    };

    // isolated resource function get cargos/[string cargoId]/orders() returns Order[]|error {
    //     return selectOrdersByCargoId(cargoId);
    // };

    isolated resource function post buses(BusInput busEntry) returns http:Ok|http:InternalServerError {
        sql:ExecutionResult|error result = insertBus(busEntry);
        if result is sql:ExecutionResult {
            return http:OK;
        }
        return http:INTERNAL_SERVER_ERROR;
    };
}


