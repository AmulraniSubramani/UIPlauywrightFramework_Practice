
import { homedir } from "node:os";
import { test, expect } from "../src/fixtures/pagefixtures"
import { HomePage } from "../src/pages/HomePage";
import { serialize } from "node:v8";
import { SearchResultPage } from "../src/pages/SearchResultPage";
import { CSVHelper } from "../src/utils/CSVHelper";


//before each
test.beforeEach(async ({lpage,homePage}) =>{

    await lpage.gotoLoginPage();
    await lpage.doLogin(process.env.APP_USERNAME!,process.env.PASSWORD!);
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
});


const productData= CSVHelper.readCSV('src/data/product.csv');
for (let row of productData){
test (`verify search  result count test , $ {row.searchkey} - ${row.productname}`,async ({homePage, searchRPage})=>{
   await homePage.doSearch(row.searchkey);
    expect (await  searchRPage.getProductResultsCount()).toBe(Number(row.resultcount));
});
}


for(const row of productData){

test (`verify user is able to land on the prodcuct page ${row.searchkey}, ${row.productname}` ,async( { homePage, searchRPage,page}) =>{
await homePage.doSearch(row.searchkey);
await searchRPage.selectProduct(row.productname);
expect (await page.title()).toBe(row.productname);

})
};

//common test
test('company logo exists on the productpage_BasePage test', async( { basePage})=>{

    expect(await basePage.isLogoVisible()).toBeTruthy();
})


test('footers exist on the product page test', async( { basePage})=>{

    expect(await basePage.getFootercount()).toBe(16);
});
