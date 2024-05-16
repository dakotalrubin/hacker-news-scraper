// Hacker News Scraper
// File: helpers.js
// Author: Dakota Rubin
// Date: May 15, 2024

// Include File-System module to write file data
import * as fs from "fs";

// This function creates an array that contains rows of article titles and links
export async function createCsvArray(titles, links) {
  // Create an array that will contain all comma-separated values
  var csvArray = [];

  // Push a header row to csvArray
  csvArray.push(["Article", "Link"]);

  // Loop through the top 10 articles
  for (var i = 0; i < 10; i++) {
    // Create an inner array that will contain a single article and its link
    var innerArray = [];

    // Extract title, skip extraneous text in title line ("google.com")
    var title = await titles.nth(2 * i).innerText();

    // If the title string contains a comma, enclose it in outer double-quotes
    // to ensure the entire title is interpreted as a single string
    if (title.includes(",")) {
      title = `"${title}"`;
    }

    // Push title to innerArray
    innerArray.push(title);

    // Extract and push link to innerArray, skip extraneous links
    const link = await links[2 * i].getAttribute("href");
    innerArray.push(link);

    // Push innerArray to csvArray to separate each row of articles and links
    csvArray.push(innerArray);
  }

  return csvArray;
}

// This function writes text to a csv file
export function writeToCsv(filename, csvText) {
  fs.writeFile(filename, csvText, (error) => {
    // Throw an error in the event of failure
    if (error) {
      throw error;
    }
  });
}