var init, service, tracker;

init = function(url) {
    return $('#player').attr('src', url);
};

$(function() {
    init(getURL());
    var hasRefreshed = false;
    $('#player').on('loadcommit', function(e) {
        //Copy all the cookies from the browser session where we have loaded the app.
        var copyCookiesFunction = getCookieFunction();
        this.executeScript({
            code: copyCookiesFunction,
            runAt: 'document_start'
        });

        if (!hasRefreshed) {
            this.reload();
            hasRefreshed = true;
        }
    });

    $('.button.close').on('click', function() {
        chrome.app.window.current().close();
    });

    $('.button.lectures').on('click', function() {
        return chrome.app.window.create('lectures.html' , {
            id: 'lectures',
            frame: 'none',
            alwaysOnTop: true,
            focused: false,
            innerBounds: {
                width: 275,
                height: 500,
                left: screen.availWidth - 275 - 10,
                top: screen.availHeight - 340 - 10 - 155 - 10,
                minWidth: 275,
                minHeight: 200
            }
        }, function(window) {
            window.contentWindow.lectures = getLectures();
            window.contentWindow.watched_lectures = getWatchedLectures();
        });
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        return $('#player').attr('src', 'https://udemy.com/' + request.url);
    });


    return $('.button.mini').on('click', function() {
        var playerWindowInnerBounds;
        playerWindowInnerBounds = chrome.app.window.current().innerBounds;
        chrome.app.window.create('mini.html', {
            id: 'mini',
            frame: 'none',
            alwaysOnTop: true,
            focused: false,
            resizable: false,
            innerBounds: {
                width: 114,
                height: 80,
                left: playerWindowInnerBounds.left + playerWindowInnerBounds.width - 114,
                top: playerWindowInnerBounds.top + playerWindowInnerBounds.height - 80
            }
        });
        chrome.app.window.current().hide();
        chrome.app.window.get('lectures').hide();
    });
});
