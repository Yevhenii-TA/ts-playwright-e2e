import { Page, expect } from "@playwright/test";
import BasePage from "../BasePage";
import CheckoutPage from "./CheckoutPage";

export default class ProductDetailPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private get reserveParkingBtn() { return this.page.locator('.checkout [type="submit"]')};
    private get reserveModalContinueBtn() { return this.page.locator('[name="continue"]')};
    private get reserveModalCheckoutBtn() { return this.page.locator('.details > button')};


    async reserveParking() {
        await expect(this.reserveParkingBtn).toBeVisible();
        await this.reserveParkingBtn.click();
        await this.reserveModalContinueBtn.click();
        await this.reserveModalCheckoutBtn.click();

        return new CheckoutPage(this.page);
    }
}