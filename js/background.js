var launchMiniPlayer;

launchMiniPlayer = function(cookies, lectures, watched_lectures, url) {
    return chrome.app.window.create('player.html', {
      id: 'player',
      frame: 'none',
      alwaysOnTop: true,
      focused: false,
      innerBounds: {
        width: 275,
        height: 155,
        left: screen.availWidth - 275 - 10,
        top: screen.availHeight - 155 - 10,
        minWidth: 275,
        minHeight: 155
      }
    },
    function(window) {
        window.contentWindow.getURL = function() {
            return url;
        };
        window.contentWindow.getLectures = function() {
            return lectures;
        };
        window.contentWindow.getWatchedLectures = function() {
            return watched_lectures;
        };
        window.contentWindow.getCookieFunction = function() {
                var ret = "function createCookie(name,value,days) { \
                    if (days) { \
                        var date = new Date(); \
                        date.setTime(date.getTime()+(days*24*60*60*1000)); \
                        var expires = '; expires='+date.toGMTString(); \
                    } \
                else var expires = ''; \
                document.cookie = name+'='+value+expires+'; path=/'; \
            } \
            ";
            for (var i = 0; i < cookies.length; i++) {
                ret += "createCookie('" + cookies[i].name + "','" + cookies[i].value + "'," + "30);";
            }
            return ret;
        };
    });
};

chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
    return launchMiniPlayer(message.cookies, message.lectures, message.watched_lectures, message.url);
});
