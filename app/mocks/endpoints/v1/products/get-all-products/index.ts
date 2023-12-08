import getAllProductsSuccess from './data/success.json' assert { type: "json" };
import getAllProductsFailure from './data/failure.json' assert { type: "json" };

// Just return appropriate status according to your needs i.e. 404, 200, 202, 405, etc.
export const requestHandler = (req) => {
    const { param, path } = req;

    // Write your conditions here in switch depending on what you want to return
    return {
        status: 200,
        data: [...getAllProductsSuccess]
    }
}

export const handler = (req) => {
    // return immediately to force a response
    // return { status: 405, data:{ getAllProductsFailure}}
    switch(req.method) {
        case 'GET':
            return requestHandler(req)
        default:
            return { status: 405, data:{ getAllProductsFailure}}
    }
}

export const path = "/product-list";

export default {
    requestMethod: "GET",
    path: path,
    request: handler
}