// auth Specs
// =====================================================================================================================
//- check incorrect login error message
//- check correct user login/logout
// - check login/logout of new one users


var site = 'http://localhost:9000/';
var EC = protractor.ExpectedConditions;

describe('revers check:', function(){
    var text = 'qweqweqwe';
    var reversed = 'ewqewqewq';

    it('open site', function(done){
        browser.get(site+'');
        // browser.wait(EC.visibilityOf(element(by.model('greeting'))), browser.allScriptsTimeout);

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
