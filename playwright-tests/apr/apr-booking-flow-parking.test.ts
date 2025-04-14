import {test} from "@playwright/test";
import HomePage from "../../page-objects/apr/HomePage";
import {APR_LOCATIONS} from "../../fixtures/apr/airports";
import BasePage from "../../page-objects/BasePage";
import SearchResultPage from "../../page-objects/apr/SearchResultPage";

const location = APR_LOCATIONS.parking[1] // TODO: find a way to run multiple locations

test.describe("APR Booking Flows", ()=> {

    test("Parking Booking Flow", async ({ page, context }) => {
        const basePage = new BasePage(page);
        const homePage = new HomePage(page);
        const searchResultPage = new SearchResultPage(page, context);

        await basePage.openPage('https://airportparkingreservations.com/');
        await basePage.acceptCookies();
        await homePage.searchAndSelectAirport(location.slug, location.name);
        await homePage.selectDates();
        await homePage.submitSearch();

        await searchResultPage.waitSearchResultsLoaded();
        // call here to get newPage as context of ProductDetailPage
        const productDetailPage = await searchResultPage.selectProduct();
        // to pass existing context into CheckoutPage
        const checkoutPage = await productDetailPage.reserveParking();
        await checkoutPage.testFunction();
    })

})

