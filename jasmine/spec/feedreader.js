/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        // This tests makes sure that the allFeeds variable has been defined and that it is not empty.  
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This test loops through each feed in the allFeeds and ensures that it has a URL defined and that the URL is not empty.
        it('each feed has a URL defined', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // This test loops through each feed in the allFeeds and ensures that it has a name defined and that the name is not empty.
        it('each feed has a name defined', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe('The Menu', function(){

        // This test ensures that the menu element is hidden by default.
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         // This test ensures that the menu changes visibility when the menu icon is clicked.
         it('changes visibility when clicked', function(){
            var iconMenu = $('a.menu-icon-link');
            
            // show menu first click
            iconMenu.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            
            // hide menu second click
            iconMenu.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
    });

    describe('Initial Entries', function(){

        // Runs before each test to ensure that the loadFeed function has finished
        beforeEach(function(done){
            loadFeed(0, done);
        });

        // This test ensures that when the loadFeed function is called and completes its work, there is at least one single entry element within the feed container.
        it('at least one feed present', function(){
            var feedEntry = $('.feed .entry');
            expect(feedEntry.length).toBeGreaterThan(0);
        });

    });

    describe('New Feed Selection', function(){

        var prevFeed,
            currentFeed;

        beforeEach(function(done){
            loadFeed(0, function(){
                // store the content from the feed container to prevFeed
                prevFeed = $('.feed').html();
                // load current feed
                loadFeed(1, done);
            });
        });

        // This test ensures thet when a new feed is loaded by the loadFeed function, the content actually changes.
        it('content changes when new feed is loaded', function(){
            currentFeed = $('.feed').html();
            expect(currentFeed).not.toBe(prevFeed);
        });

    });

}());
