import { expect, Page, test } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

//globle level declartion
let lpage: LoginPage;
let homePage: HomePage;

//pre-request for all test
test.beforeEach(async ({ page }) => {
    lpage = new LoginPage(page);  // creating object for loginpage
    await lpage.gotoLoginPage(); // hit the url
    await lpage.doLogin('anulekhasri27@gmail.com', 'Amulrani@123');  // login in the application 
    homePage = new HomePage(page);
});

test('home page title test', async ({ }) => {

    const homePagetitle = await homePage.getPageTitle();
    expect(homePagetitle).toBe('My Account');
});

test('logout link is exist test', async ({ }) => {
    expect(await homePage.isLogoutExist()).toBeTruthy();

});

test('home page headers test', async ({ }) => {

    let allHeader: string[] = await homePage.getHomePageHeader();
    console.log('home page headers are :', allHeader);
    expect.soft(allHeader).toHaveLength(4);
    expect.soft(allHeader).toEqual([

        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter',
    ]);


    
});



