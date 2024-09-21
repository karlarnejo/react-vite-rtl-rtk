import getAllProductsSuccess from './data/success.json' assert { type: "json" };
import getAllProductsFailure from './data/failure.json' assert { type: "json" };
import { IProduct } from '../../../../common/types'

// Just return appropriate status according to your needs i.e. 404, 200, 202, 405, etc.
export const requestHandler = (req) => {
    const { params, query, path, headers } = req;
    const { page, itemsPerPage, searchQuery } = query;

    const { paginatedData, totalItems, totalPages } = fetchMockData(getAllProductsSuccess, page, itemsPerPage, searchQuery);

    // Write your conditions here in switch depending on what you want to return
    return {
        status: 200,
        data: {
            data: paginatedData,
            totalPages: totalPages,
            totalItems: totalItems
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

export const fetchMockData = (data, page, itemsPerPage, searchQuery) => {
    // Filter data based on search query
    const filteredData = searchQuery ?
        data.filter(item => item.productName.toLowerCase().includes(searchQuery.toLowerCase())) :
        data;

    // Compute totalItems and totalPages
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get the paginated data
    const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Return the paginated data, totalItems, and totalPages
    return {
        paginatedData,
        totalItems,
        totalPages
    };
};

export const path = "/products";

export default {
    requestMethod: "GET",
    path: path,
    request: handler
}