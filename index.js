// Hacker News Scraper
// File: index.js
// Author: Dakota Rubin
// Date: May 15, 2024

// Required framework import
import { chromium } from "playwright";

// Custom function imports
import { createCsvArray, writeToCsv } from "./helpers.js";

// This function scrapes Hacker News for its top 10 articles and links
async function saveHackerNewsArticles() {
  // Launch web browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Hacker News
  await page.goto("https://news.ycombinator.com");

  // Extract all article titles and links
  const titles = page.locator(".titleline").locator("a");
  const links = await page.locator(".titleline").getByRole("link").all();

  // Create an array that contains rows of article titles and links
  const csvArray = await createCsvArray(titles, links);

  // Close the web browser to save processing resources
  await browser.close();

  // Convert the csvArray into text format
  const csvText = csvArray.map(row => row.join(",")).join("\n");

  // Write csvText string to csv file named "top_10_articles.csv"
  writeToCsv("top_10_articles.csv", csvText);
}

(async () => {
  await saveHackerNewsArticles();
})();