import { defineConfig } from '@playwright/test';

const width = process.env.VIEWPORT_WIDTH || 1920;
const height = process.env.VIEWPORT_HEIGHT || 1080;

export default defineConfig({
    testDir: './playwright-tests',
    timeout: 120000,
    retries: 1,
    reporter: [ ["line"],
        [
        "allure-playwright",
        {
            resultsDir: "allure-results",
        },
    ]],
    use: {
        browserName: 'chromium',
        viewport: { width: Number(width), height: Number(height) },
        headless: true,
        screenshot: 'only-on-failure',
        video: 'off',
        trace: 'off'
    },
    expect: {
        timeout: 15_000,
    },
});