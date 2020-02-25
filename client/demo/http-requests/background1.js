function logURL (requestDetails) {
  console.log('Loading: ' + requestDetails.url)
}

browser.webRequest.onBeforeRequest.addListener(logURL, { urls: ['<all_urls>'] })
// intercept all URL requests
