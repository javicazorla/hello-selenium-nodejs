const { Builder, By, Key, until, Capabilities } = require('selenium-webdriver')
const assert = require('assert')

describe('google-devops', function() {
  this.timeout(50000)
  let driver
  let vars
  let capabilities = new Capabilities().setBrowserName("operablink")

  beforeEach(async function() {
	 driver = new Builder()
        .usingServer("http://localhost:4444/wd/hub")
        .withCapabilities(capabilities)
        .build();


    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('google-devops', async function() {
    await driver.get("https://www.google.com/")

    // Versión mejorada del profesor para quitarl el iframe / pop up de Google
    let frame = await driver.findElement(By.xpath('//iframe'))

    if(frame) {
      driver.switchTo().frame(frame)
      let button = await driver.wait(until.elementLocated(By.id('introAgreeButton')))
      await button.click()
      driver.switchTo().defaultContent()
    }

    await driver.findElement(By.name("q")).click()
    await driver.findElement(By.name("q")).sendKeys("devops")
    await driver.findElement(By.name("q")).sendKeys(Key.ENTER)
    await driver.wait(until.elementLocated(By.xpath("//div[@id=\'rso\']/div[3]/div/div/div/a/h3/span"))).click()
  })
})
