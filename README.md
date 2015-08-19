# What is this?
This project is a Chrome-browser extension that replicates two similar Chrome bugs:
* [navigator.sendBeacon web requests should be accounted to the originating frame(id)](https://code.google.com/p/chromium/issues/detail?id=522124)
* [window.onunload 'beacon' web requests should be accounted to the originating frame(id)](https://code.google.com/p/chromium/issues/detail?id=522129)

To replicate the bugs:
* Download this extension (git clone..)
* Load this extension into Chrome using chrome://extensions/
* Take a note of the extension id
* For each bug, the extension contains a web-page that replicates it. Load each page in a new Chrome tab, and follow the instructions:
  * navigator.sendBeacon: chrome-extension://INSERT-EXTENSIONID-HERE/beacon-test.html 
  * window.onload beacon: chrome-extension://INSERT-EXTENSIONID-HERE/onunload-beacon-test.html
 
## Can I skip to the problem details?

Sure. The problem is that Chrome does not account asynchronously-made beacon web-requests to the web-page that actually made the call. This can be seen when using the chrome.webRequest API, which lets extensions observe/intercept web-requests: the tabId+frameId of the intercepted beacon web-request do not match the tabId+frameId of the web-page that actually made the call.

For example, using this demonstration extension, we loaded chrome-extension://INSERT-EXTENSIONID-HERE/beacon-test.html and saw in the extension's console:
```
Seen web request for: chrome-extension://empbiabaidecimmlofaoeafoefnfnmae/beacon-test.html
tabId=[57] frameId=[0]

Seen web request for: https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Apuleuis.jpg/1280px-Apuleuis.jpg
tabId=[-1] frameId=[-2]
```

The first web request is the demo-page loaded in a Chrome tab. The second web request is a navigator.sendBeacon call made from that page (to a random wikipedia image).

Note that the tabId+frameId of the beacon call (-1 and -2) do not match that of the web-page call (57 and 0). This is the bug.

The same problem can be seen when a 'beacon'-style web-request is made using the window.onunload img.src hack. We load chrome-extension://INSERT-EXTENSIONID-HERE/beacon-test.html and saw:
```
Seen web request for: chrome-extension://empbiabaidecimmlofaoeafoefnfnmae/onunload-beacon-test.html
tabId=[68] frameId=[0]

Seen web request for: https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Apuleuis.jpg/1280px-Apuleuis.jpg
tabId=[-1] frameId=[-2]
```

Same bug: the tabId+frameId of the 'beacon' window.onunload img.src web-request don't match that of the originating page.
