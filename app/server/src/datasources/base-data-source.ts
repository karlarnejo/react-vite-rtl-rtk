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

        // TODO: Retrieve token from localstorae or cookies and pass to Authorization header
        const jwtToken: string = "mockToken";
        request.headers['Content-Type']  = 'application/json';
        request.headers['Authorization'] = `Bearer ${jwtToken}`;

        // Add more headers if needed
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