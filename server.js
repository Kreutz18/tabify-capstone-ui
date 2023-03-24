const express = require('express');
const puppet = require('puppeteer');
const port = process.env.PORT || 5000;
const app = express();
const parser = require('body-parser');
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
  console.log('test');
  res.send('Hello World');
});

async function scrapeUG() {
  let browser;
  try {
    console.log('Opening browser');
    browser = await puppet.launch({
      'ignoreHTTPSErrors': true
    });
  } catch (error) {
    console.log("Could not create a browser instance => :", error);
  }

  return browser;
}