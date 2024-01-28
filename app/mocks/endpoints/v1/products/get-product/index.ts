import successP81B37AC from './data/successP81B37AC.json' assert { type: "json" };
import successP81B37AD from './data/successP81B37AD.json' assert { type: "json" };
import successP81B37AE from './data/successP81B37AE.json' assert { type: "json" };
import getProductFailure from './data/failure.json' assert { type: "json" };

// Just return appropriate status according to your needs i.e. 404, 200, 202, 405, etc.
export const requestHandler = (req) => {
    // params should identify the resource.
    // query should sort/filter those resource.
    const { params: { productId }, query, path } = req;

    // Write your conditions here in switch depending on what you want to return
    switch(productId) {
        case 'P81B37AC':
            return {
                status: 200,
                data: {...successP81B37AC}
            }
        case 'P81B37AD':
            return {
                status: 200,
                data: {...successP81B37AD}
            }
        case 'P81B37AE':
            return {
                status: 200,
                data: {...successP81B37AE}
            }
        default:
            return {
                status: 404,
                data: {...getProductFailure}
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

export const path = "/products/:productId";

export default {
    requestMethod: "GET",
    path: path,
    request: handler
}