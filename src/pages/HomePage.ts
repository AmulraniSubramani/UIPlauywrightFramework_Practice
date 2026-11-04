import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

    //private locators 

    private readonly logoutLink: Locator;
    private readonly headers:Locator;
    // private readonly search : Locator;
    // private readonly searchIcn: Locator;


    constructor (page:Page){
        super(page);
        this.logoutLink=page.getByRole('link', { name: 'Logout', exact : true})
        this.headers=page.getByRole('heading',{level : 2});
        // this.search= page.getByRole('textbox', {name: 'Search', exact: true});
        // this.searchIcn= page.locator('.fa.fa-search');

       
    };

   

    async isLogoutExist() : Promise<boolean>{
        return await this.logoutLink.isVisible();
    };

    async getHomePageHeader() : Promise<string[]>{
      return  await this.headers.allInnerTexts();
    };
    
    async doSearch(searchKey: string) : Promise<void>{
        console.log(`search key, ${searchKey}`);
        await this.searchBox.fill(searchKey);
        await this.searchIcon.click();
        

        // await this.search.fill(searchKey);
        // await this.searchIcn.click();
 
};

}