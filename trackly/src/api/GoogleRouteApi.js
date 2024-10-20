export const fetchAvailableRoutes = async (start, end) => {
    return new Promise((resolve, reject) => {
        const request = {
            origin: start,
            destination: end,
            travelMode: window.google.maps.TravelMode.TRANSIT,
            transitOptions: {
                routingPreference: 'FEWER_TRANSFERS'
            }
        };

        directionsService.current.route(request, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                resolve(result.routes);
            } else {
                reject(`Error fetching routes from Google: ${status}`);
            }
        });
    });
};

export const extractWaypoints = (googleRoutes) => {
    return googleRoutes.flatMap(route => 
        route.legs.flatMap(leg => 
            leg.steps.map(step => step.start_location)
        )
    );
};





