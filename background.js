browser.commands.onCommand.addListener(
  () => browser.tabs.query({ highlighted: true }).then((results) => {
    if (!results || results.length < 1) {
      return;
    }
    results.forEach((tab) => {
      if (tab.url.startsWith('about')) {
        return;
      }
      browser.tabs.create({
        cookieStoreId: tab.cookieStoreId == 'firefox-default' ? 'firefox-container-1' : 'firefox-default',
        index: tab.index + 1,
        url: tab.url,
        pinned: tab.pinned,
      });
      browser.tabs.remove(tab.id);
    });
  })
);
