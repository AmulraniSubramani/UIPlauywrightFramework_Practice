import { homedir } from "node:os";
import { test, expect } from "../src/fixtures/pagefixtures"

//before each
test.beforeEach(async ({ lpage, homePage }) => {

    await lpage.gotoLoginPage();
    await lpage.doLogin(process.env.APP_USERNAME!, process.env.PASSWORD!);

});



test('verify product imagecount test', async ({ homePage, searchRPage, productInfo }) => {

    await homePage.doSearch('macbook');
    await searchRPage.selectProduct('MacBook Pro');
    let imageCount = await productInfo.getImagesCount();
    console.log('iamgecount : ', imageCount);
    expect(imageCount).toBe(4);
});

test('verify productInformation data test', async ({ homePage, searchRPage, productInfo }) => {
    
    await homePage.doSearch('macbook');
    await searchRPage.selectProduct('MacBook Pro');
    let actualProductInfo = await productInfo.getProductInformation();
    console.log('the actual product details:', actualProductInfo);
    expect.soft(actualProductInfo.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfo.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfo.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfo.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfo.get('Availability')).toBe('Out Of Stock');
    expect.soft(actualProductInfo.get('ProductPrice')).toBe('$2,000.00');

});


// common test
test('company logo exists on the productpage test', async( { productInfo})=>{

    expect(await productInfo.isLogoVisible()).toBeTruthy();
})


//Or 
test('company logo exists on the productpage_BasePage test', async( { basePage})=>{

    expect(await basePage.isLogoVisible()).toBeTruthy();
})


test('footers exist on the product page test', async( { basePage})=>{

    expect(await basePage.getFootercount()).toBe(16);
});

