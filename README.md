# Garnet Overview

Garnet provides a secure and performant browser isolation solution by replaying remote browser draw commands in local browser via WebAssembly 

The Garnet consist of three major components: [Browser Extension](#browser-extension), [Server](#server), [Modified Chromium](#modified-chromium).

![Garnet Archetecture](https://github.com/ECS-251-W2020/final-project-sudo/blob/update-readme/garnet-architecture.png)

For more details:
- Garnet Presentation Slides: https://docs.google.com/presentation/d/1dtheCxnoi7ndXLLkkXeq51FsUDQHAIiSRylsi95hqBI/edit#slide=id.g52d3a5b53d_1_0
- Garnet Presentation Video + Demo: https://youtu.be/0yOjzBg866k

## Project Structure
1. [Brwoser Extension](https://github.com/ECS-251-W2020/final-project-sudo/tree/master/client/web-extension) under `client/web-extension/`

    Key files:
    - `manifest.json`: extension manifest file which contains info such as version, name, script path
    - `background.js`: script also run in background which delegate the request to server
    - `index.html + index.js`: create canvas for display draw commands(from server) via WebAssembly
2. [Server](https://github.com/ECS-251-W2020/final-project-sudo/tree/master/server) under `server/`

    Key files:
    - `index.js`: start chromium base on request; listen to the file that Chromium write draw command to and convert the draw commands to Skia JS draw commands; send Skia JS draw command to browser extension
3. [Modified Chromium](https://github.com/ECS-251-W2020/chromium/tree/ac814e85cb870a6b569e184c7a60a70ff3cb19f9) under `chromium @ ac814e8/`

    Key files:
    - `ui/gfx/render_text.cc`, `chromium/ui/gfx/canvas_skia.cc`: chromium internal text rendering commands
    - `chromium/third_party/skia/src/core/SkCanvas.cpp`: SkCanvas draw commands for basic shapes and images

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
    - Open the Extension Management page by navigating to `chrome://extensions`.
    - Enable Developer Mode by clicking the toggle switch next to Developer mode.
    - Click the `LOAD UNPACKED` button and select the extension directory.
2. Enjoy your secure browsing experience

## Browser Extension
1. Capture and send I/O events in local browser
2. Verify the draw commands from server is valid (no malicious code injected)
3. Display the draw commands which are sent from server via WebAssembly

## Server
1. Receive I/O events from local browser and simulate the same mouse/keyboard events on Modified Chromium
2. Listen to the file that Chromium write draw command to and convert the draw commands to Skia JS draw commands
3. Send Skia JS draw command to browser extension

## Modified Chromium
1. Logging draw commands (`Skia` draw commands, `ui/gfx` commands) to a temp file which is listened by server
