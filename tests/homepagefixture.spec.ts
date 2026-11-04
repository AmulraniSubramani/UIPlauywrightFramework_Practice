import { test, expect } from "../src/fixtures/pagefixtures"


//pre-request for all test
test.beforeEach(async ({ lpage }) => {

    await lpage.gotoLoginPage(); // hit the url
    await lpage.doLogin('anulekhasri27@gmail.com', 'Amulrani@123');  // login in the application 

});

test('home page title test', async ({ homePage }) => {

    // const homePagetitle = await homePage.getHomePageTitle();
    const homePagetitle = await homePage.getPageTitle(); // which is coming from basepage
    expect(homePagetitle).toBe('My Account');
});

test('logout link is exist test', async ({ homePage }) => {
    expect(await homePage.isLogoutExist()).toBeTruthy();

});

test('home page headers test', async ({ homePage }) => {

    let allHeader: string[] = await homePage.getHomePageHeader();
    console.log('home page headers are :', allHeader);
    expect.soft(allHeader).toHaveLength(4);
    expect.soft(allHeader).toEqual([

        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter',
    ]);



    
  test('company logo exists on the productpage_BasePage test', async( { basePage})=>{

    expect(await basePage.isLogoVisible()).toBeTruthy();
})


test('footers exist on the product page test', async( { basePage})=>{

    expect(await basePage.getFootercount()).toBe(16);
});



});

