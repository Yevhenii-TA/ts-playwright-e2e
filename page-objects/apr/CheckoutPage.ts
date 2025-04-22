import BasePage from "../BasePage";
import { expect } from "playwright/test";
import {Page} from "@playwright/test";
import {faker} from "@faker-js/faker/locale/ar";

export default class CheckoutPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private get summarySection() { return this.page.locator('.summary')};
    private get emailInputField() { return this.page.locator('[name="email"]')};
    private get continueBtn() { return this.page.getByLabel('Continue')};
    private get firstNameInputField() { return this.page.locator('[name="fname"]')};
    private get lastNameInputField() { return this.page.locator('[name="lname"]')};
    private get zipCodeInputField() { return this.page.locator('[name="ship-zip"]')};
    private get phoneInputField() { return this.page.locator('[name="phone"]')};
    private get paymentCCOption() { return this.page.locator('.braintree-option__card')};
    private get completeReservationBtn() { return this.page.locator('[name="complete"]')};


    async enterEmailAndContinue(email: string) {
        await expect(this.emailInputField).toBeVisible();
        await this.emailInputField.fill(email);
        await this.continueBtn.click();
    }

    async enterPersonalDetails(personFakeData: any) {
        await expect(this.firstNameInputField).toBeVisible();
        await this.firstNameInputField.fill(personFakeData.firstName);
        await this.lastNameInputField.fill(personFakeData.lastName);
        await this.zipCodeInputField.fill(personFakeData.zip);
        await this.phoneInputField.fill(personFakeData.phone);
    }

    async fillInCCPaymentDetails() {
        const creditCardDates = await this.returnCurrentMonth() + '/' + await this.returnFutureYear(false);

        await this.paymentCCOption.click();

        await this.page.frameLocator('#braintree-hosted-field-number')
            .locator('#credit-card-number')
            .fill(faker.finance.creditCardNumber());

        await this.page.frameLocator('#braintree-hosted-field-expirationDate')
            .locator('#expiration')
            .fill(creditCardDates);

        await this.page.frameLocator('#braintree-hosted-field-cvv')
            .locator('#cvv')
            .fill(faker.finance.creditCardCVV());

        await expect(this.completeReservationBtn).toBeEnabled();
    }
}