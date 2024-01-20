import { AugmentedRequest, RESTDataSource } from "@apollo/datasource-rest";
import { IDataSourceContext, IRequestContext } from "../common/types";
import { AdditionalHeaderKey } from "../common/enums.js";

export class BaseDataSource extends RESTDataSource {
    contextValue?: IRequestContext;

    constructor(options: IDataSourceContext) {
        super();
        this.contextValue = options.contextValue;
    }
    public async willSendRequest(_path: string, request: AugmentedRequest) {
        if(!this.contextValue) {
            throw new Error("Request context not available");
        }

        // TODO: Retrieve token from saved in App.tsx i.e. localstorage or cookies and pass to Authorization header
        // All headers should be in lower case http/2.
        const jwtToken: string = this.contextValue.headers['authorization'];
        request.headers['content-type']  = 'application/json';
        request.headers['authorization'] = jwtToken;

        // Add more headers if needed. Cross check in useApolloClient which header is being added
        if(this.contextValue.headers[AdditionalHeaderKey.SAMPLE_ADDITIONAL_HEADER]) {
            request.headers[AdditionalHeaderKey.SAMPLE_ADDITIONAL_HEADER] = this.contextValue.headers[AdditionalHeaderKey.SAMPLE_ADDITIONAL_HEADER] as string;
        }
    }

    // TODO: Add logger here
    // protected get my_preferred_logger() {
    //     if(!this.contextValue) {
    //         throw new Error('Request context not available')
    //     }

    //     if(this.contextValue) {
    //         return this.contextValue.logger;
    //     }

    //     return logger_util;
    // }
}