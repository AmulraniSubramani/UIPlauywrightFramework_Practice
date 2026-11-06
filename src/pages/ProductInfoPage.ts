import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { threadCpuUsage } from "node:process";


export class ProductInfoPage extends BasePage {

    //private locators

    private readonly header: Locator;
    private readonly productImage: Locator;
    private readonly productMetaData: Locator;
    private readonly productPrice: Locator;
    private map: Map<string, string | number>; // class level declaration


    constructor(page: Page) {
        super(page)
        this.header = page.getByRole('heading', { level: 1 });
        this.productImage = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPrice = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string | number>();

    };


    //actions
    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    };

    async getImagesCount(): Promise<number> {

        await this.productImage.first().waitFor({state : 'visible'});
        // await this.page.waitForTimeout(5000);
        return await this.productImage.count();
    };


/**
 * 
 * @return this method is returning the actual product data : header,images,metadata,pricing data
 * 
*/
    async getProductInformation() : Promise<Map<string,string | number>> {
        this.map.set('ProductHeader', await this.getProductHeader());
        this.map.set('ProductImages', await this.getImagesCount());
        await this.getProductMetaData();
        await this.getProductPrice();
        return this.map;
    }

    // Brand: Apple
    // Product Code: Product 18
    // Reward Points: 800
    // Availability: Out Of Stock
    private async getProductMetaData(): Promise<void> {
        let metaData = await this.productMetaData.allInnerTexts();
        for (let data of metaData) {
            let meta = data.split(':');
            let metakey = meta[0].trim();
            let metavalue = meta[1].trim();
            this.map.set(metakey, metavalue);

        }
    }

    //getProductprice
    // $2,000.00
    // Ex Tax: $2,000.00
    private async getProductPrice(): Promise<void> {
        let priceData = await this.productPrice.allInnerTexts();// it return string of array 
        let product_price = priceData[0].trim();
        let exTax_Price = priceData[1].split(':')[1].trim();
        this.map.set('ProductPrice', product_price);
        this.map.set('ExTaxPrice', exTax_Price);



    }

}
    