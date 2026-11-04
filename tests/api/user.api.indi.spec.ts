import { test, expect } from "../../src/fixtures/apifixtures";

const TOKEN = process.env.API_Token!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };
let userID: number;

//helper generic function to generate fresh user

async function create_user(apiHelper: any) {
    let userData = {
        name: 'test',
        email: `automtion_${Date.now()}@home.com`,
        gender: 'female',
        status: 'active'
    };

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
};

//Test 1. create a user test and verify : AAA
// POST: UserId, GET /userID , verify
test('POST -create a user', async ({ apiHelper }) => {
    //create user
    let userResponse = await create_user(apiHelper);

    //get the user
    let response = apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect((await response).status).toBe(200);
    expect((await response).body.name).toBe('test');
});





//Test 2. update the user and verify: AAA
//POST : userID, PUT(update), GET : USERID, VERIFY


test('POST -update a user', async ({ apiHelper }) => {
    //create a user
    let userResponse = await create_user(apiHelper);

    let userUpdateData = {
        name: 'test_API_updated',
        status: 'inactive'
    };
    //update the user
    let response =apiHelper.put(`/public/v2/users/${userResponse.id}`,userUpdateData, AUTH_HEADER);
    expect((await response).status).toBe(200);
    expect((await response).body.name).toBe(userUpdateData.name);
    expect((await response).body.status).toBe(userUpdateData.status);

    //get the user
    let getResponse= apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect((await getResponse).status).toBe(200);
    expect((await getResponse).body.name).toBe(userUpdateData.name);
    expect((await getResponse).body.status).toBe(userUpdateData.status);

});



//Test 3- delete the user,response 204
//POST:create user, DELETE(USERID -204),GET(USERID - TOVERIFY - 404)  -AAA

test('DELETE -update a user', async ({ apiHelper }) => {
    //create a user
    let userResponse = await create_user(apiHelper);
   
    //delete the user
    let response =apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect((await response).status).toBe(204);

    //get the user
    let getResponse= apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect((await getResponse).status).toBe(404);
    expect((await getResponse).body.message).toBe('Resource not found');

});

//post-get
//post-put
//post-get
//post-delete