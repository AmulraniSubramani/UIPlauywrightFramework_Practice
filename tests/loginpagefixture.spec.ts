import { test, expect } from "../src/fixtures/pagefixtures"
import { CSVHelper } from "../src/utils/CSVHelper";
import { ExcelHelper } from "../src/utils/ExcelHelper";
import { JsonHelper } from "../src/utils/JSONHelper";

//beforeeach 
test.beforeEach(async ({ lpage, homePage }) => {
    await lpage.gotoLoginPage(); //goto method
})

test('@smoke loginpage title test', async ({ lpage }) => {

    const pageTitle = await lpage.getPageTitle();
    console.log('the login page title is :', pageTitle);
    expect(pageTitle).toBe('Account Login');
});


test(' @regression loginpage forgot_password exist test', async ({ lpage }) => { // removing the page destructuring since everything maintained in beforeach

    expect(await lpage.isForgotPasswordExist()).toBeTruthy();
});


test('user able to login test', async ({ lpage, homePage }) => {
    await lpage.doLogin(process.env.APP_USERNAME!,process.env.PASSWORD!);
    //expect 
    expect.soft(await homePage.isLogoutExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
});


// DD1- sequential mode - only 1 test is running with test data one by one using testdata from fixture
test('@regression login to the app using wrong credetials with data driven test', async  ({lpage, homePage, testData }) =>{

    for( let row of testData){
       await  lpage.doLogin(row.appusesrname, row.password);
       expect (await lpage.isInvalidLoginMessageDisplayedOrNot());
    }

});


//DD2 - without fixture, parallel mode , read csv dara directly and loop the test methow row wise

  let testdata= CSVHelper.readCSV('src/data/loginData.csv');

  for (let row of testdata) {
    test (`invalid login test with ${row.appusesrname} - ${row.password} `, async( {lpage}) => {
        await lpage.doLogin(row.appusesrname, row.password);
        expect(await lpage.isInvalidLoginMessageDisplayedOrNot()).toBeTruthy();
    });
  }


  // read data from excel

  
  let loginExceldata= ExcelHelper.readExcel('src/data/Opencart.xlsx', 'login');

  for (let excelrow of loginExceldata) {
    test (`invalid login testdata(excel) with ${excelrow.username} - ${excelrow.password} `, async( {lpage}) => {
        await lpage.doLogin(excelrow.username, excelrow.password);
        expect(await lpage.isInvalidLoginMessageDisplayedOrNot()).toBeTruthy();
    });
  }



  // read data from JSON

  let jsonData= JsonHelper.readJson('src/data/login.json');

  for (let jsonrow of jsonData) {
    test (`invalid login json test data with ${jsonrow.username} - ${jsonrow.password} `, async( {lpage}) => {
        await lpage.doLogin(jsonrow.username, jsonrow.password);
        expect(await lpage.isInvalidLoginMessageDisplayedOrNot()).toBeTruthy();
    });
  };

  // common test
  test('company logo exists on the productpage_BasePage test', async( { basePage})=>{

    expect(await basePage.isLogoVisible()).toBeTruthy();
})


test('footers exist on the product page test', async( { basePage})=>{

    expect(await basePage.getFootercount()).toBe(16);
});
