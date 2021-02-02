#!/usr/bin/env node

const {Builder, By, Key, until} = require('selenium-webdriver');

(async function hello() {
	let driver = new Builder()
					.forBrowser('firefox')
					.build();

	await driver.get('https://www.google.com/');

	// Aceptar el Pop Up que aparece (es un frame)
	await driver.switchTo().frame(0);
	await driver.findElement(By.id("introAgreeButton")).click();

	// Volvemos al contenido de la página
	await driver.switchTo().defaultContent();
	
	// Búsqueda en Google
	await driver.findElement(By.name('q')).sendKeys('devops',Key.ENTER);

})();