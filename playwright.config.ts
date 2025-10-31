import { defineConfig, devices } from '@playwright/test';
import path from 'path';

//require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  testMatch: '**/*.test.ts',

  testIgnore: '**/utils/**',

  timeout: 30_000,

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /*  Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }], ['list']],

  /* Configure projects for major browsers */
  /* See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    navigationTimeout: 5_000,
    
    // baseURL: process.env.BASE_URL,
    baseURL: 'https://traineeautomation.azurewebsites.net/api/',
    trace: 'on-first-retry', // 'off', 'on', 'retain-on-failure'
    
    /* Do screenshot if test fails. */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    /* Run browser in non-headless mode */
    headless: true, // true by default

    /* Browser window size */
   //viewport: { width: 1280, height: 720 },

    // locale: 'en-US',
    // timezoneId: 'America/Los_Angeles',

    /* Additional options for browser context */
    launchOptions: {
    args: ['--start-maximized']
    }
  },

   /* Configure projects for major browsers */
   projects: [
    // {
    //   name: 'chromium',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //   },
    // },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // Example of usage tags in tests for specific browser
    // {
    //   name: 'Desktop_Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    //   grep: [new RegExp("@desktop")],
    // },
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   timeout: 120 * 1000,
  //   reuseExistingServer: !process.env.CI,
  // },
});