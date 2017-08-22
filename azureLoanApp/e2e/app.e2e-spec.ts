import { AzureLoanAppPage } from './app.po';

describe('azure-loan-app App', () => {
  let page: AzureLoanAppPage;

  beforeEach(() => {
    page = new AzureLoanAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
