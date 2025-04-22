import { Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

export default class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /** Selectors start **/
    private get cookieModal() { return this.page.locator('.ot-sdk-container')}
    private get cookieModalAccept() { return this.page.locator('#onetrust-accept-btn-handler')}
    /** Selectors end **/

    async openPage(url: string) {
        await this.page.route('**/*', async (route) => {
            const url = route.request().url();

            // block requests to ad networks and other 3rd parties
            if (url.includes('analytics') || url.includes('ads') || url.includes('stats'))
                await route.abort(); // block "if" statement
            else
                await route.continue(); // allow for other valid requests
        });

        await this.page.goto(url, { waitUntil: 'load' });
        await this.page.waitForResponse(session => {
            return session.url().includes('session') && session.status() === 200
        }, {timeout: 10000})
    }

    async acceptCookies() {
        // trigger OneTrust
        do {
            await this.page.mouse.move (200 , 200, {steps: 100});
            await this.page.mouse.click(200 , 200);
        } while (await this.cookieModal.isHidden())

        await this.cookieModalAccept.click();
    }

    async getFakeUserDetails() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zip: faker.location.zipCode(),
            country: faker.location.country(),
        }
    }

    async returnCurrentMonth() {
        const currentMonth = (new Date().getMonth() + 1);
        return currentMonth < 10 ? '0' + currentMonth.toString() : currentMonth.toString();
    }

    async returnFutureYear(isFullYear: boolean) {
        const fullYear = (new Date().getFullYear() + 2).toString();
        return isFullYear ? fullYear : fullYear.slice(-2);
    }

}