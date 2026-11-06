// import { expect, Page, test } from "@playwright/test";

// let AUTH_TOKEN= {Authorization : 'Bearer gorest_2fvibtlNWOm7wTzrh1bt1M918jXF3wRuO960nFeG71F2sWsrr'};


// test('get user test', async( {request }) =>{

//    let response = await request.get('https://gorest.co.in/public/v2/users/8695755', {
//         headers : AUTH_TOKEN
//     });

//     // console.log(response);
//    let jbody = await response.json();
//    console.log(jbody);
//    console.log(response.status());
//    expect(response.status()).toBe(200); 
// });

// test('get all user test', async( {request }) =>{

//    let response = await request.get('https://gorest.co.in/public/v2/users', {
//         headers : AUTH_TOKEN
//     });

//     // console.log(response);
//    let jbody = await response.json();
//    console.log(jbody);
//    console.log(response.status());
//    console.log(response.statusText());
// });



// test('create user test', async( {request }) =>{

//     //JS Object
//     let userData= {
//         name : 'veda',
//         email : `automtion_${Date.now()}@home.com`,
//         gender : 'female',
//         status : 'active'
//     }; 

//     // js object to json - this process is called serilization 


//    let response = await request.post('https://gorest.co.in/public/v2/users', {
//         headers : AUTH_TOKEN,
//         data : userData
//     });

//     // console.log(response);
//    let jbody = await response.json();
//    console.log(jbody);

//    console.log(response.status());  //202
//    console.log(response.statusText());  // created
// });


// test('update user test', async( {request }) =>{

//     //JS Object
//     let userData= {
//         name : 'veda_101',
//         email : `automtion_${Date.now()}@home.com`,
//         gender : 'female',
//         status : 'inactive'
//     }; 

//     // js object to json - this process is called serilization 


//    let response = await request.put('https://gorest.co.in/public/v2/users/8695839', {   //  i can use put or patch
//         headers : AUTH_TOKEN,
//         data : userData
//     });

//     // console.log(response);
//    let jbody = await response.json();
//    console.log(jbody);

//    console.log(response.status());  //200
//    console.log(response.statusText());  // created
// });

// test('delete user test', async( {request }) =>{


//    let response = await request.delete('https://gorest.co.in/public/v2/users/8695839', {
//         headers : AUTH_TOKEN,
        
//     });

//    console.log(response.status());  //204
//    console.log(response.statusText());  // no content
// });