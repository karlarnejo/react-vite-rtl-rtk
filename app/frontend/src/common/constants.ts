//Dummy json data
export const REST_SERVICE_URL_ROOT = import.meta.env.REACT_APP_API_URL;
//Root Client
export const URL_ROOT = import.meta.env.REACT_APP_URL;
//Persisted key 
export const PERSISTED_STATE_KEY = import.meta.env.REACT_APP_PERSISTED_KEY;
//Client Id
export const CLIENT_ID = import.meta.env.REACT_APP_CLIENT_ID;
//Client Secret
export const CLIENT_SECRET = import.meta.env.REACT_APP_CLIENT_SECRET;
//Root
export const ROOT = '/';
//Customer route
export const CUSTOMER = "/customer"
//Orders route
export const ORDER = "/order"

export const graphqlPath = 'http://localhost:4000/graphql';
export const regExpAlphanumericWithSpacesOnly: RegExp = /^[a-zA-Z0-9\s]+$/;
export const regExpPositiveFloatOnly: RegExp = /^\d+(\.\d+)?$/;
export const regExpPositiveWholeNumbersOnly: RegExp = /^\d+$/;