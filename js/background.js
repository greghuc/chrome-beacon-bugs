console.log('*** Initialising web request listener ***');

var listener = function(details) {
    console.log('\nSeen web request for: ' + details.url);
    console.log('tabId=[' + details.tabId + '] frameId=[' + details.frameId + ']');
    return {};
};

chrome.webRequest.onBeforeRequest.addListener(listener, { urls: ['<all_urls>'] }, [ 'blocking' ]);