// const pattern = '*://*/*'
const pattern = 'https://google.com/*'
const redirectUrl = browser.runtime.getURL('index.html')

function redirect(requestDetails) {
  console.log('Redirecting: ' + requestDetails.url)
  return {
    redirectUrl
  }
}

browser.webRequest.onBeforeRequest.addListener(redirect, { urls: [pattern] }, [
  'blocking'
])
