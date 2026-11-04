import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage{


    //private locators
    private readonly emailID:Locator;
    private readonly password:Locator;
    private readonly loginBtn:Locator;
    private readonly forgotPasswordLink:Locator;
    private readonly logo:Locator;
    private readonly loginErrorMsg:Locator;

    constructor(page: Page){
        super(page);
        this.emailID=page.getByRole('textbox', {name: 'E-Mail Address'});
        this.password=page.getByRole('textbox', {name: 'Password', exact : true});
        this.loginBtn=page.getByRole('button', {name: 'Login', exact : true});
        this.forgotPasswordLink=page.getByRole('link', { name: 'Forgotten Password' }).first()
        this.logo=page.getByAltText('naveenopencart');
        this.loginErrorMsg=page.locator('.alert.alert-danger.alert-dismissible');
    };

    // public page action or methods - by default,if not writing any access modifier, its consider as a public 

    async gotoLoginPage() : Promise<void>{
        await this.page.goto('opencart/index.php?route=account/login');
    };

    async getPageTitle() : Promise <string>{
        return await this.page.title()
    };

    async isForgotPasswordExist(): Promise<Boolean>{
        return await this.forgotPasswordLink.isVisible();
    }
    async doLogin(userName: string, password: string) : Promise<void>{
        
        console.log(`user credentials ${userName} : ${password}`);
        await this.emailID.fill(userName);
        await this.password.fill(password);
        await this.loginBtn.click();

        };

        async isInvalidLoginMessageDisplayedOrNot(): Promise<boolean>{
           return await this.loginErrorMsg.isVisible();
        }

};
