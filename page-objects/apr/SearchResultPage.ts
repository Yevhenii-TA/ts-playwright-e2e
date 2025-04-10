import BasePage from "../BasePage";

export default class SearchResultPage extends BasePage {

    private get loaderSpinner() { return this.page.locator('.loading-ring')};

    async waitSearchResultsLoaded() {
        await this.loaderSpinner.isVisible();
        await this.loaderSpinner.isHidden();
    }
}