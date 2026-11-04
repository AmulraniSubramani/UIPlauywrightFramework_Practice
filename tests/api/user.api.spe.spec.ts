
import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_Token!
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };
let userID:number;


test.describe.serial('running end to end test crud api tests', async() =>{  // sesrial for sequential mode


test('GET API- get all usres', async ({ apiHelper }) => {

    let apiresponse = await apiHelper.get('/public/v2/users', AUTH_HEADER);
    expect(apiresponse.status).toBe(200);
   expect(apiresponse.body.length).toBeGreaterThan(0); 
});

//post call
test('POST- create a user', async ({ apiHelper }) => {
     
    let userData= {
        name : 'test',
        email : `automtion_${Date.now()}@home.com`,
        gender : 'female',
        status : 'active'
    };

    let apiresponse = await apiHelper.post('/public/v2/users',userData, AUTH_HEADER);
    expect(apiresponse.status).toBe(201);
    expect(apiresponse.body.name).toBe(userData.name);

     userID = await apiresponse.body.id;
    console.log('user id is:',  userID);

});

test('PUT- update the user', async ({ apiHelper }) => {
     
    let userUpdateData= {
        name : 'test_API',
        status : 'inactive'
    };

    let apiresponse = await apiHelper.put(`/public/v2/users/${userID}`,userUpdateData, AUTH_HEADER);
    expect(apiresponse.status).toBe(200);
    expect(apiresponse.body.name).toBe(userUpdateData.name);
    expect(apiresponse.body.status).toBe(userUpdateData.status);
    
});


});


//when we have update the user, first create id and update
//since userid is globaly delcared, we have to run post fisrst and update , for that we need to group them 
