"use strict";

let _tabs = null;
let _pageAction = null;

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  if (tab.url.includes('ocjene.skole.hr/pregled/ocjene/')) {
    _pageAction.show(tab.id);
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
if (typeof browser === "undefined") {
  _pageAction = chrome.pageAction;
  _tabs = chrome.tabs;
}
else {
  _tabs = browser.tabs;
  _pageAction = browser.pageAction;
}

/*
Each time a tab is updated, reset the page action for that tab.
*/
_tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

