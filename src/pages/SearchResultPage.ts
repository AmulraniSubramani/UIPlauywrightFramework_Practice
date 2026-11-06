import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { promises } from "node:dns";


export class SearchResultPage extends BasePage{

    //private locators 
    private readonly  searchResults : Locator;


    constructor (page : Page){
        super(page);
        this.searchResults= page.locator('div.product-layout');
    };

    //actions

    async getProductResultsCount(): Promise<Number>{
        return await  this.searchResults.count();
    };

    async selectProduct(productName: string) : Promise<void>{
        await this.page.getByRole('link', { name: productName, exact : true}).first().click();
        
    }

}