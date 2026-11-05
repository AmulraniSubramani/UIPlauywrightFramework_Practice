import { Locator, Page } from "@playwright/test";

export class BasePage {

    protected readonly page: Page; // protected means only within the class or class of the class only access

    //common locators across all pages

    protected readonly logo: Locator;
    protected readonly footerlink: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;
    protected readonly currency: Locator;
    protected readonly cartButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByAltText('naveenopencart');
        this.searchBox = page.getByPlaceholder('Search');
        this.searchIcon = page.locator('div#search  button');
        this.currency = page.locator('#form-currency');
        this.footerlink = page.locator('footer a');
        this.cartButton = page.locator('div.btn-group.btn-block');
    }

    //common functions 
    async isLogoVisible(): Promise<boolean> {
        return await this.logo.isVisible();
    };

    async isSearchBox(): Promise<boolean> {
        return await this.searchBox.isVisible();
    };
    async isSearchIcon(): Promise<boolean> {
        return await this.searchIcon.isVisible();
    };

    async isCurrencyBoxVisible(): Promise<boolean> {
        return await this.currency.isVisible();
    };


    async iscartButtonVisible(): Promise<boolean> {
        return await this.cartButton.isVisible();
    };
    async getFootercount(): Promise<number> {
        return await this.footerlink.count();
    };

    async getFooterText(): Promise<String[]> {
        return await this.footerlink.allInnerTexts();
    };

    //page level generic methods 

    async getPageTitle() : Promise<string>{
       return await  this.page.title();
    };

    
     getCurretPageTitle(): string {
       return this.page.url();
    };

    async waitforPageLoad(){
       await this.page.waitForLoadState('load');
    };

    async takeScreenShot(name :string){
        return await this.page.screenshot({
            fullPage: true,
            path: `reports/screenshot/${name}.png`
        });
    }
}