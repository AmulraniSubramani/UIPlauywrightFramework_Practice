import {test as BaseTest} from "@playwright/test";
import { APIHelper } from "../api/APIHelper";
import { from } from "node:stream/iter";



//define types of API  fixtures

type APIFixtures = {
    apiHelper: APIHelper;
    
};

//extends playwright baseTest

export let test=BaseTest.extend<APIFixtures>({
    
    apiHelper : async ( {request}, use) => {
        let apihelper= new APIHelper(
            request,
            process.env.API_BASE_URL!

        );

        await use(apihelper);
        
    },
});

export {expect}  from "@playwright/test";