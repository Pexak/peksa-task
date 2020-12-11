
import { by, element, ElementFinder } from 'protractor';
export class DetailsPage {

  async getCardTitle(): Promise<ElementFinder> {
    return element(by.css('.mat-card-title'));
  }

  async getCardSubTitle(): Promise<ElementFinder> {
    return element(by.css('.mat-card-subtitle'));
  }
}
