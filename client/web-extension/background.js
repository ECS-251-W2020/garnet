const pattern = 'https://*/*'
const extensionPageUrl = browser.runtime.getURL('index.html')

function redirect(requestDetails) {
  console.log('Redirecting: ' + requestDetails.url)

  return {
    redirectUrl: extensionPageUrl
  }
}

browser.webRequest.onBeforeRequest.addListener(redirect, { urls: [pattern] }, [
  'blocking'
])
