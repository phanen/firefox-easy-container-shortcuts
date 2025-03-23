browser.commands.onCommand.addListener(
  () => browser.tabs.query({ currentWindow: true, active: true, status: 'complete' }).then((results) => {
    if (!results || results.length < 1) {
      return;
    }

    let currentTab = results[0];

    if (currentTab.url.startsWith('about')) {
      return;
    }

    browser.tabs.create({
      cookieStoreId: currentTab.cookieStoreId == 'firefox-default' ? 'firefox-container-1' : 'firefox-default',
      index: currentTab.index + 1,
      url: currentTab.url,
      pinned: currentTab.pinned,
    });
    browser.tabs.remove(currentTab.id);
  })
);
