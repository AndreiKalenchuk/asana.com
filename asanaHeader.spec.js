import {expect} from 'chai';

describe('ASANA.COM HEADER TEST', () => {

  before('open asana', () => {
    browser.maximizeWindow();
    browser.url('https://asana.com/');
    browser.waitUntil(browser.getUrl().includes('https://asana.com/'));
  });

  it('should verify title', () => {
    expect(browser.getTitle()).eq('Manage your team’s work, projects, & tasks online · Asana');
  });

  it('should click all left links, and those inner links', () => {
    const headerLeft = $$('//li[@class="horizontalNavigation__list-item"]');
    expect(headerLeft.length).eq(4);
    const innerLinks = $$('//div[@class="navigation__dropdown__card-description"]//h4');

    for (let i = 0; i < headerLeft.length; i++) {
      headerLeft[i].click();
      for (let j = 0; j < 10; j++) {
        innerLinks[j].click();
        browser.waitUntil(browser.getTitle().includes('· Asana'));

        headerLeft[i].click();
        browser.waitUntil(browser.getTitle().includes('Manage your team’s work, projects, & tasks online · Asana'));
      }
    }
  });
  let arr = [];

  it('should change language and verify URL', () => {
    arr = ['de', 'en', 'es', 'fr', 'pt', 'ja'];
    const el = $('//div[@class="language-selector-wrapper"]//select[@name="select"]');

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 'en') continue;
      el.selectByAttribute('value', `${arr[i]}`);
      expect(browser.getUrl()).includes(`${arr[i]}`);
    }
    el.selectByAttribute('value', 'en');
    expect(browser.getUrl()).eq('https://asana.com/');
  });

  it('"Contact Sales" should click on link', () => {
    const el = $('//a[@class="navigation__link navigation__contact-sales contact-sales"]');
    el.click();
    browser.pause(500);
  });

  it(' "Contact Sales" should verify page title', () => {
    expect(browser.getTitle()).eq('Contact our Sales Team · Asana');
  });

  it('"Login Page" should click and verify Url', () => {
    const el = $('//a[@class="navigation__link navigation__sign-in hidden-logged-in"]');
    el.click();
    expect(browser.getUrl()).eq('https://asana.com/sales#login');
  });

  it(' btn should click', () => {
    browser.url('https://asana.com/');
    $('//div[@class="siteHeader-buttons hidden-device-mobile"]').click();
  });

  it('"Try for free" should verify page Url and title', () => {
    expect(browser.getUrl()).eq('https://asana.com/create-account');
    expect(browser.getTitle()).eq('Start your free trial of Asana · Asana');
  });

  it('"Try for free" should verify page header', () => {
    expect($('//h4[@class="heading -h3 -spacing-2 js-try-headline"]').getText())
      .eq('Try Asana for free');
  });

  it('"Try for free" should check email input form exist', () => {
    expect($('//input[@class="input input--email signup-email"]').isExisting()).true;
  });

  it('"Try for free" should verify button name', () => {
    const el = $('//button[@class="signupForm-submit submit -large signup-submit-"]//span[@class="signupForm-submit-text js-signupForm-submit--try"]//span');
    expect(el.getText()).eq('Try for free');
  });

  it('"Try for free" should click link privacy policy ', () => {
    $('//div[@class="textStack"]//a[text() = "Privacy Policy"]').click();
    expect(browser.getTitle()).eq('Terms · Asana');
    browser.back();
  });

  it('"Try for free" should click link Terms of Service', () => {
    $('//div[@class="textStack"]//a[text() = "Terms of Service"]').click();
    expect(browser.getTitle()).eq('Terms · Asana');
    browser.back();
  });
});