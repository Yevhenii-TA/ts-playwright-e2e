import BasePage from "../BasePage";
import { expect } from "playwright/test";
import { Page, BrowserContext } from "@playwright/test";
import ProductDetailPage from "./ProductDetailPage";

export default class SearchResultPage extends BasePage {
    private readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        super(page);
        this.context = context;
    }

    private get loaderSpinner() { return this.page.locator('.loading-ring')};
    private get parkingProductCard() { return this.page.locator('.list > :nth-child(2) > div > a')};

    async waitSearchResultsLoaded() {
        await expect(this.loaderSpinner).toBeVisible();
        await this.page.reload({waitUntil: 'load'});
        await expect(this.loaderSpinner).not.toBeVisible();
    }

    async selectProduct(randomProduct: boolean = true) {
        const productNumber = randomProduct ? await this.returnRandomProductNumber() : 0;
        // handle second tab
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.parkingProductCard.nth(productNumber).click()
        ]);
        await newPage.waitForLoadState('load');

        return new ProductDetailPage(newPage);
    }

    private async returnRandomProductNumber() { // will be extended to accept parking and hotel products
        const numberOfProducts = await this.parkingProductCard.count();
        if (numberOfProducts === 0) {
            throw new Error('No products found to return a random product number');
        }
        return numberOfProducts === 1 ? 0 : Math.floor(Math.random() * numberOfProducts);
    }
}