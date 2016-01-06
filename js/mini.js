$(function() {
  $('.button.maxi').on('click', function() {
      chrome.app.window.current().close();
      chrome.app.window.get('player').show();
      chrome.app.window.get('lectures').show();
  });
  return $('.button.close').on('click', function() {
    chrome.app.window.current().close();
    if (chrome.app.window.get('player')) {
      chrome.app.window.get('player').close();
      chrome.app.window.get('lectures').close();
    }
  });
});
