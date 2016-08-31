// auth Specs
// =====================================================================================================================
// - check incorrect login error message
// - check correct user login/logout
// - check login/logout of new one users

var EC = protractor.ExpectedConditions;
var site = 'http://localhost:9000/';

describe('AUTH Specs', function () {

	it('Open main site page', function (done) {
		browser.get(site + '#/');
 		done();
	});

	it('Login button should be disabled at Login page load', function (done) {
		browser.get(site + '#/');
		var submit = element(by.css('button[type="submit"]'));
		// expect(submit.getAttribute('disabled')).toBe('disabled');
		expect(submit.isEnabled()).toBe(false);
		done();

	});

	it('incorrect login error message', function (done) {
		browser.get(site + '#/');
		var login = element(by.model('vm.user.email'));
		var password = element(by.model('vm.user.password'));
		var submit = element(by.css('button[type="submit"]'));
		login.clear();
		password.clear();

		login.sendKeys('the_most_incredible_email@website.com');
		password.sendKeys('123');

		//button click
		submit.click();

		// md-toast
		var toast = element(by.css('.md-toast-text');
		browser.wait(toast.isPresent);

		expect(mdToast.getText()).toEqual('Error: User not found');
		done();
	});

	//
	// it('send text', function(done){
	//     element(by.model('greeting')).clear();
	//     element(by.model('greeting')).sendKeys(text);
	//     done();
	// });
	//
	// it('input text should be no reversed', function(done){
	//     expect(element(by.css('[name=noReverse]')).getText()).toEqual(text);
	//     done();
	// });
	//
	// it('input text should be reversed', function(done){
	//     expect(element(by.css('[name=reverse]')).getText()).toEqual(reversed);
	//     done();
	// });
	//
	// it('input text should be reversed and uppercase', function(done){
	//     expect(element(by.css('[name=reverseUpperCase]')).getText()).toEqual(reversed.toUpperCase());
	//     done();
	// });
});
