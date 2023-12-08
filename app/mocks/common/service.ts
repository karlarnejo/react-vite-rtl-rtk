export const handleEndpoints = (server, api) => {
    const { requestMethod, request, path } = api;

    switch(requestMethod) {
        case 'GET':
            handleGetEndpoint(server, path, request)
            return
        default:
            //TODO: add proper return data for 405
            return { status: 405, data:{ }}
    }
};

export const handleGetEndpoint = (server, path, request) => {
    server.get(path, (req, res) => {
        const { status, data } = request(req);

        res.set('Content-Type', 'application/json');                      
        res.status(status).json(data);
    });
};