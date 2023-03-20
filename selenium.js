let webdriver = require("selenium-webdriver");
require("chromedriver");

let driver = new webdriver.Builder().forBrowser("chrome").build();

async function testLogin() {
  await driver.get("http://localhost:3000/home");
  await driver.get("http://localhost:3000/login");
  
  await driver.findElement(webdriver.By.css('#login-username')).sendKeys('jesse_kreutzberger@yahoo.com');
  await driver.findElement(webdriver.By.css('#login-password')).sendKeys('ShCSbX4VS9uA402tm!hT');
  await driver.findElement(webdriver.By.css('#login-button')).click();
  
  let acceptButton = await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//button[@data-testid='auth-accept']")));
  driver.wait(acceptButton.click(), 5000);
}

async function testCreatePlaylist() {
  await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//a[@id='nav-playlist-link']"))).click();
  await driver.wait(webdriver.until.elementLocated(webdriver.By.css('#create-playlist-button'))).click();
  await driver.findElement(webdriver.By.css('#create-playlist-name')).sendKeys('test-playlist-1');
  await driver.findElement(webdriver.By.css('#create-playlist-submit-btn')).click();
}

async function testAddSongToPlaylist() {
  let children = await driver.wait(webdriver.until.elementLocated(webdriver.By.className('list-item'))).click();
  console.log(children);
  // await children.click()
}

async function testApp() {
  await testLogin();
  await testCreatePlaylist();
  await testAddSongToPlaylist();
}

testApp();