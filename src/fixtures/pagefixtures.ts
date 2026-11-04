
import {test as BaseTest} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CSVHelper } from "../utils/CSVHelper";
import { SearchResultPage } from "../pages/SearchResultPage";
import {ProductInfoPage } from "../pages/ProductInfoPage";
import { BasePage } from "../pages/BasePage";

//define types of pages fixtures

type pageFixtures = {
    lpage: LoginPage;
    homePage: HomePage;
    testData: Record<string, string>[]; 
    searchRPage :SearchResultPage;
    productInfo: ProductInfoPage;
    basePage: BasePage;
    
};


//extends playwright baseTest

export let test=BaseTest.extend<pageFixtures>({
    
    lpage : async ( {page}, use) =>{
        let lpage= new LoginPage(page);
        await use(lpage);
    },
     basePage : async ( {page}, use) =>{
        let basePage= new BasePage(page);
        await use(basePage);
    },

    homePage : async({page}, use) =>{
        let homePage= new HomePage(page);
        await use(homePage);
    },
    
    searchRPage : async({page}, use) =>{
        let searchRPage= new SearchResultPage(page);
        await use(searchRPage);
    },

    productInfo : async ({page}, use) =>{
        let productInfo = new  ProductInfoPage(page);
        await use(productInfo);

    },
    testData :async({ }, use) => {
        let testData= CSVHelper.readCSV('src/data/loginData.csv');
        await use(testData);
    } 
});

export {expect} from "@playwright/test";
