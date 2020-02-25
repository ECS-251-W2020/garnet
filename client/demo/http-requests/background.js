var pattern = 'https://mdn.mozillademos.org/*'

function redirect (requestDetails) {
  console.log('Redirecting: ' + requestDetails.url)
  return {
    redirectUrl:
      'https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif'
  }
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: [pattern], types: ['image'] },
  ['blocking']
)

// intercept requests
// (1) to URLs residing under "https://mdn.mozillademos.org/"
// (2) for image resources.
// intercept conditions can be modified according to our needs further
