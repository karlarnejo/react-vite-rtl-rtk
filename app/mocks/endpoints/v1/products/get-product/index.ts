import getProductSuccess from './data/success.json' assert { type: "json" };
import getProductFailure from './data/failure.json' assert { type: "json" };

// Just return appropriate status according to your needs i.e. 404, 200, 202, 405, etc.
export const requestHandler = (req) => {
    // params should identify the resource.
    // query should sort/filter those resource.
    const { params: { productId }, query, path } = req;

    // Write your conditions here in switch depending on what you want to return
    switch(productId) {
        case '123':
            return {
                status: 404,
                data: {...getProductFailure}
            }
        default:
            return {
                status: 200,
                data: {...getProductSuccess}
            }
    }
}

// TODO: update handler OR default export for redundancy
export const handler = (req) => {
    // return immediately to force a response
    // return { status: 405, data:{ getAllProductsFailure}}
    switch(req.method) {
        case 'GET':
            return requestHandler(req)
        default:
            return { status: 405, data:{ getProductFailure}}
    }
}

export const path = "/product/:productId/view";

export default {
    requestMethod: "GET",
    path: path,
    request: handler
}