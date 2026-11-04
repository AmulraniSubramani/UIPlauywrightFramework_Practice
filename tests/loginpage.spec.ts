import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let lpage: LoginPage; // global varible
let homePage: HomePage;


test.beforeEach(async ({ page }) => {
    lpage = new LoginPage(page);
    homePage = new HomePage(page);
    await lpage.gotoLoginPage(); //goto method
})

test('loginpage title test', async ({  }) => {

    const pageTitle = await lpage.getPageTitle();
    console.log('the login page title is :', pageTitle);
    expect(pageTitle).toBe('Account Login');
});


test('loginpage forgot_password exist test', async ({  }) => { // removing the page destructuring since everything maintained in beforeach

    expect(await lpage.isForgotPasswordExist()).toBeTruthy();
});


test('user able to login test',async ({})=>{
    await lpage.doLogin('anulekhasri27@gmail.com','Amulrani@123');
    //expect 
    expect.soft(await homePage.isLogoutExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
})

