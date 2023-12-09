export const handleEndpoints = (server, api) => {
    const { requestMethod, request, path } = api;

    switch(requestMethod) {
        case 'GET':
            handleGetEndpoint(server, path, request)
            return
        case 'POST':
            handlePostEndpoint(server, path, request)
        case 'PUT':
            handlePutEndpoint(server, path, request)
        case 'DELETE':
            handleDeleteEndpoint(server, path, request)
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

export const handlePostEndpoint = (server, path, request) => {
    server.post(path, (req, res) => {
        const { status, data } = request(req);

        res.set('Content-Type', 'application/json');                      
        res.status(status).json(data);
    });
};

export const handlePutEndpoint = (server, path, request) => {
    server.put(path, (req, res) => {
        const { status, data } = request(req);

        res.set('Content-Type', 'application/json');                      
        res.status(status).json(data);
    });
};

export const handleDeleteEndpoint = (server, path, request) => {
    server.delete(path, (req, res) => {
        const { status, data } = request(req);

        res.set('Content-Type', 'application/json');                      
        res.status(status).json(data);
    });
};