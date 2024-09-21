import getAllProductsSuccess from './data/success.json' assert { type: "json" };
import getAllProductsFailure from './data/failure.json' assert { type: "json" };
import { IProduct } from '../../../../common/types'

// Just return appropriate status according to your needs i.e. 404, 200, 202, 405, etc.
export const requestHandler = (req) => {
    const { params, query, path, headers } = req;
    const { page, itemsPerPage } = query;

    // Write your conditions here in switch depending on what you want to return
    return {
        status: 200,
        data: {
            data: fetchMockData(getAllProductsSuccess, page, itemsPerPage),
            totalPages: getAllProductsSuccess.length/itemsPerPage,
            totalItems: getAllProductsSuccess.length
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
            return { status: 405, data:{ getAllProductsFailure}}
    }
}

export const fetchMockData = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // return data.slice(startIndex, endIndex);
    return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
}

export const path = "/products";

export default {
    requestMethod: "GET",
    path: path,
    request: handler
}