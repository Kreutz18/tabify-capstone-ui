let webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const {Actions} = require("selenium-webdriver/lib/input");
require("chromedriver");

const chromeOptions = new chrome.Options();
chromeOptions.excludeSwitches("enable-logging");

let driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
let actions = new Actions(driver);

async function testLogin() {
  await driver.get("http://localhost:3000/home");
  await driver.get("http://localhost:3000/login");
  
  await driver.findElement(webdriver.By.css('#login-username')).sendKeys('');
  await driver.findElement(webdriver.By.css('#login-password')).sendKeys('');
  await driver.findElement(webdriver.By.css('#login-button')).click();
  
  await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//button[@data-testid='auth-accept']"))).click();
}

async function testCreatePlaylist() {
  await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//a[@id='nav-playlist-link']"))).click();
  await driver.wait(webdriver.until.elementLocated(webdriver.By.css('#create-playlist-button'))).click();
  await driver.findElement(webdriver.By.css('#create-playlist-name')).sendKeys('selenium-test-playlist-1');
  await driver.findElement(webdriver.By.css('#create-playlist-submit-btn')).click();
}

async function testAddSongToPlaylist() {
  await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[contains(text(), 'selenium-test-playlist-1')]"))).click();
  await driver.wait(webdriver.until.elementLocated(webdriver.By.css('#slide-panel-btn'))).click();

  let search = await driver.wait(webdriver.until.elementIsVisible(driver.findElement(webdriver.By.xpath("//input[@id='search-song-input']"))));
  await search.sendKeys("Red Hot Chili Peppers");
  await driver.wait(search.sendKeys(webdriver.Key.ENTER),5000);

  await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[@id='track-result-0']")), 10000).click();
  await driver.findElement(webdriver.By.className("slide-pane__close")).click();
}

async function testMusicPlayer() {

  let tableRowButton = await driver.wait(webdriver.until.elementLocated(webdriver.By.id('trackTableRowItem-0')), 6000);
  await actions.doubleClick(tableRowButton).perform();
  await timeout(10000);
  await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//button[@class='rswp__toggle _ControlsButtonRSWP __3hmsj']")), 6000).click();
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testRemoveSongFromPlaylist() {
  let dropdown = await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[@id='dropdown-toggle-0']")));
  await dropdown.findElement(webdriver.By.id('dropdown-chevron-icon')).click();
  await driver.wait(webdriver.until.elementIsVisible(driver.findElement(webdriver.By.id('dropdown-delete-0')))).click();
}

async function testDeletePlaylist() {
  await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//a[@id='nav-playlist-link']"))).click();
  await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[contains(text(), 'selenium-test-playlist-1')]"))).click();
  await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[@id='delete-playlist-btn']"))).click();
  await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//button[@id='confirm-delete-playlist-btn']"))).click();
}


async function testApp() {
  await testLogin();
  await testCreatePlaylist();
  await testAddSongToPlaylist();
  await testMusicPlayer();
  await testRemoveSongFromPlaylist();
  await testDeletePlaylist();

  await timeout(2000);
  driver.close();
}

testApp();