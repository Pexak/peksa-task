import { LoginCredentials, LoginPage } from './login.po';
import { browser } from 'protractor';
import { DetailsPage } from '../details/details.po';

const browserSleep = 3000;

fdescribe('login page', () => {
  let loginPage: LoginPage;
  let detailsPage: DetailsPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    detailsPage = new DetailsPage();
  });

  it('should display login button', async () => {
    await loginPage.navigateTo();
    const loginBtn = await loginPage.getLoginButton();
    expect(loginBtn.isPresent()).toBe(true);
  });

  it('should login via google', async () => {
    await browser.sleep(browserSleep);
    (await loginPage.getLoginButton()).click();
    await browser.sleep(browserSleep);
    await loginPage.changeWindow(1);
    await browser.waitForAngularEnabled(false);
    await loginPage.fillGoogleCredentials(LoginCredentials);
    await loginPage.changeWindow(0);
    await browser.waitForAngularEnabled(true);

    const cardTitle = (await detailsPage.getCardTitle()).getText();
    const cardSubTitle = (await detailsPage.getCardSubTitle()).getText();
    expect(cardTitle).toBe('Pantera Testeusz');
    expect(cardSubTitle).toBe('testeusz2020@gmail.com');
  });

});
