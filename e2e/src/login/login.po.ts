import { browser, by, element, ElementFinder } from 'protractor';

export const LoginCredentials = {
  email: 'testeusz2020@gmail.com',
  password: '2%d^r%kMiyIx74Rnp'
};

export class LoginPage {

  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getLoginButton(): Promise<ElementFinder> {
    return element(by.css('.login-button'));
  }

  async changeWindow(index): Promise<void> {
    return browser.getAllWindowHandles().then(async (handles) => {
      return browser.switchTo().window(handles[index]);
    });
  };

  async fillGoogleCredentials({ email, password }): Promise<void> {
    let nextButton;
    const emailInput = element(by.id('identifierId'));
    emailInput.sendKeys(email);
    nextButton = browser.findElement(by.id('identifierNext'));
    nextButton.click();

    await browser.sleep(1500);
    const passwordInput = element(by.css('input[name=password]'));
    passwordInput.sendKeys(password);
    nextButton = browser.findElement(by.id('passwordNext'));
    nextButton.click();
    await browser.sleep(3000);
  }
}
