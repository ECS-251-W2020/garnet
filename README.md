# Garnet Overview

Garnet provides a secure and performant browser isolation solution by replaying remote browser draw commands in local browser via WebAssembly 

The Garnet consist of three major components: Browser Extension, Server, Modified Chromium.

For more details:
- Garnet Slides: https://docs.google.com/presentation/d/1dtheCxnoi7ndXLLkkXeq51FsUDQHAIiSRylsi95hqBI/edit#slide=id.g52d3a5b53d_1_0


## Project Structure
1. [Brwoser Extension](https://github.com/ECS-251-W2020/final-project-sudo/tree/master/client/web-extension) under `client/web-extension`
2. [Server](https://github.com/ECS-251-W2020/final-project-sudo/tree/master/server) under `server`
3. [Modified Chromium](https://github.com/ECS-251-W2020/chromium/tree/ac814e85cb870a6b569e184c7a60a70ff3cb19f9) under `chromium @ ac814e8`

## Setting Up Garnet Server
1. Install the prerequisites
  - [Nodejs](https://nodejs.org) (>= 10.13.0)
2. Clone the repo
  - `git clone https://github.com/ECS-251-W2020/final-project-sudo.git`
3. Compile the modified chromium to executable
  - refer to [chromium.org](https://chromium.googlesource.com/chromium/src/+/master/docs/linux/build_instructions.md)(skip "Get the code")
 4. Install dependencies
  - `cd server && npm install`
 5. Starting the server
  - `npm start`
  
## Using Garnet Client
1. Install the web extension in local browser
  - Open the Extension Management page by navigating to chrome://extensions.
  - Enable Developer Mode by clicking the toggle switch next to Developer mode.
  - Click the LOAD UNPACKED button and select the extension directory.
2. Enjoy your secure browsing experience


## Browser Extension
- Capture and send I/O events in local browser
- Verify the draw commands from server is valid (no malicious code injected)
- Display the draw commands which are sent from server

## Server
- Receive I/O events from local browser and simulate the same mouse/keyboard events on Modified Chromium
- Detect the draw command changes in Chromium and convert it to Skia JS draw command
- Send Skia JS draw command to browser extension

## Modified Chromium
- Logging Skia draw commands for server to use
