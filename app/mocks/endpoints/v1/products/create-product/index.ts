import createProductSuccess from './data/success.json' assert { type: "json" };
import createProductFailure from './data/failure.json' assert { type: "json" };

// Just return appropriate status according to your needs i.e. 404, 200, 202, 405, etc.
export const requestHandler = (req) => {
    // params should identify the resource.
    // query should sort/filter those resource.
    const { params: { userId }, query, body, path } = req;

    // Write your conditions here in switch depending on what you want to return
    switch(userId) {
        case '123':
            return {
                status: 404,
                data: {...createProductFailure}
            }
        default:
            return {
                status: 201,
                data: {...createProductSuccess}
            }
    }
}

// TODO: update handler OR default export for redundancy
export const handler = (req) => {
    // return immediately to force a response
    // return { status: 405, data:{ getAllProductsFailure}}
    switch(req.method) {
        case 'POST':
            return requestHandler(req)
        default:
            return { status: 405, data:{ createProductFailure}}
    }
}

export const path = "/products";

export default {
    requestMethod: "POST",
    path: path,
    request: handler
}