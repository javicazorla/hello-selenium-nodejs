#!/usr/bin/env node

const {Builder, By, Key, until} = require('selenium-webdriver');
const { urlContains } = require('selenium-webdriver/lib/until');

(async function hello() {

        // Instanciamos el driver
        let driver = new Builder()
                        .forBrowser('firefox')
                        .build();

        await driver.get('https://www.stackoverflow.com/');

        // Búsqueda en Stackoverflow 
        await driver.findElement(By.name('q')).sendKeys('selenium',Key.ENTER);

        // Mostrar los resultados por consola
        let qs = await driver.wait(until.elementsLocated(By.className('question-summary')));

        for (let q of qs) {

                let titleElem = await q.findElement(By.className("question-hyperlink"));
                let descElem = await q.findElement(By.className("excerpt"));
                let userElem = await q.findElement(By.css(".user-details a"));

                let title = await titleElem.getText();
                let link = await titleElem.getAttribute("href");
                let desc = await descElem.getText();
                let user = await userElem.getText();

                console.log(title+"-->"+user+"-->"+link);
        }
})();
