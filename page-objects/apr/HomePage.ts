import BasePage from "../BasePage";

export default class HomePage extends BasePage {

    /** Selectors start **/
    private get airportInputField() { return this.page.locator('#form-input-airport')};
    private get airportList(){ return this.page.locator('.dropdown-list-item')};
    private get checkInDate() { return this.page.locator('#form-input-start-date')};
    private get submitBtn() { return this.page.locator('.form [type="submit"]')};
    /** Selectors end **/

    async searchAndSelectAirport(slug: string, airport: string) {
        await this.airportInputField.waitFor({state: "visible"});
        await this.airportInputField.fill(slug);
        await this.airportList.waitFor({state: "visible"});
        await this.airportList.filter({hasText: airport}).click();
    }

    async selectDates() {
        const checkInDate = await this.returnDatepickerSelector(2);
        const checkOutDate = await this.returnDatepickerSelector(5);

        await this.checkInDate.click();
        await this.page.locator(checkInDate).click();
        await this.page.locator(checkOutDate).click();

    }

    private async returnDatepickerSelector(numberOfDaysAhead: number) {
        const date = new Date();
        date.setDate(date.getDate() + numberOfDaysAhead);
        return `.id-${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}.in-month`;
    }

    async submitSearch() {
        await this.submitBtn.click();
    }
}