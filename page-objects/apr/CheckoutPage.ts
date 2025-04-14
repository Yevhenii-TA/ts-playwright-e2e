import BasePage from "../BasePage";
import { expect } from "playwright/test";
import {Page} from "@playwright/test";

export default class CheckoutPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private get summarySection() { return this.page.locator('.summary')};

    async testFunction() {
        await this.page.waitForLoadState('load');
        await expect(this.summarySection).toBeVisible();
    }
}