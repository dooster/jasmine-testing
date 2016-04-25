/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    //the first test suite is used to ensure that the RSS feed menu has the correct
    //conrent to allow users to be able to toggle between the various RSS feeds
    describe('RSS Feeds', function() {

        //first we test to see if the allFeeds variable, which will be attached to the siding menu in app
        //is defined and has a length greater than a single element, to ensure that our navigation will work.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //The second test loops through allFeeds and ensures that each element of allFeeds has
        //a defined URL which is not an empty string to ensure that each feed is properly linked to the menu
        it('have defined URLs', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        //The final test in the suite again loops through allFeeds and ensures that each item has a defined name
        //that is not an empty string
        it('have defined names', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    //The second test suite checks the CSS properties of the menu and the application at load time
    describe('The menu', function() {

        //Onload, the application is tested to ensure that the body has class `menu-hidden`,
        //ensuring that the menu is not displayed
        it('should be hidden by default', function() {
            expect($('body')).toHaveClass('menu-hidden');
        });

        //The second test ensures that when the hamburger menu is clicked in the application
        //the CSS properties on the page change, and the class `menu-hidden` is toggled
        //The functionalities below are provided by Jasmine-Jquery
        it('should change visibility when clicked', function(){
            $('.menu-icon-link').click();
            expect($('body')).not.toHaveClass('menu-hidden');

            $('.menu-icon-link').click();
            expect($('body')).toHaveClass('menu-hidden');
        });
    });

    //The 'Initial Entries' suite tests the `loadFeed` function, ensuring that content through the Udacity API is delivered
    describe('Initial Entries', function() {

        var container = $('.feed');

        //this function block ensures that the code is run correctly, even though `loadFeed`'s API call is async
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        //The test then ensures that after `loadFeed` is called, the feed should not be empty and should contain
        //child DOM elements
        it('should have at least a single entry in the feed container', function(done) {
            expect(container).not.toBeEmpty();
            done();
        });
    });

    //The final test suite tests to ensure that the various feeds load and display different content
    describe('New Feed Selection', function() {
        var oldFeed, newFeed;

        //This function block ensures that the asyc API call can be tested properly. It then saves the html results from
        //the feed to a variable `oldFeed`.
        beforeEach(function(done) {
            loadFeed(2, done);
            oldFeed = $('.feed').html();
        });

        //This test then calls `loadFeed` a second time with a different feed set to be loaded
        it('should change the content of the feed container', function() {
            //helped by discussion here https://discussions.udacity.com/t/psa-two-important-notes-about-jquery-jasmine-jquery/36742
            loadFeed(0);
            //The results of that new API call are then stored in a variable as HTML
            newFeed = $('.feed').html();

            //And the two feeds are then compared against each other to ensure that they are not the same and
            //that the feed's HTML did indeed change.
            expect(newFeed).not.toBe(oldFeed);
        });
    });
}());
