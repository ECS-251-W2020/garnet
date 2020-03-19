# Garnet

Garnet is a secure and performant browser isolation prototype that replays remote browser draw commands in local browser via WebAssembly. 

## Overview

Garnet consists of three major components: [Browser Extension](#browser-extension), [Server](#server) and [Modified Chromium](#modified-chromium).

![Garnet Archetecture](https://github.com/ECS-251-W2020/final-project-sudo/blob/update-readme/garnet-architecture.png)

### Browser Extension

- Capture and send I/O events in local browser
- Verify the draw commands from server is valid (no malicious code injected)
- Render the draw commands which are sent from server via Skia's WebAssembly build

### Server

- Receive I/O events from local browser and simulate the same mouse/keyboard events on Modified Chromium
- Listen to the file that Chromium write draw command to and convert the draw commands to Skia JS draw commands
- Send Skia JS draw command to browser extension

### Modified Chromium

- Logging draw commands (`Skia` draw commands, `ui/gfx` commands) to a temp file which is listened by server

For more details:

- [Garnet Presentation Slides](https://docs.google.com/presentation/d/1dtheCxnoi7ndXLLkkXeq51FsUDQHAIiSRylsi95hqBI/edit#slide=id.g52d3a5b53d_1_0)
- [Garnet Presentation Video + Demo](https://youtu.be/0yOjzBg866k)

## Project Structure

Here we present where major components are located and their key files.

- [Brwoser Extension](client/web-extension): `client/web-extension/`
    - `manifest.json`: extension manifest file which contains info such as version, name, script path
    - `background.js`: script also run in background which delegate the request to server
    - `index.html + index.js`: create canvas for display draw commands(from server) via WebAssembly
- [Server](server): `server/`
    - `index.js`: start chromium base on request; listen to the file that Chromium write draw command to and convert the draw commands to Skia JS draw commands; send Skia JS draw command to browser extension
- [Modified Chromium](https://github.com/ECS-251-W2020/chromium/tree/ac814e85cb870a6b569e184c7a60a70ff3cb19f9): `chromium @ ac814e8/`
    - `ui/gfx/render_text.cc`, `chromium/ui/gfx/canvas_skia.cc`: chromium internal text rendering commands
    - `chromium/third_party/skia/src/core/SkCanvas.cpp`: SkCanvas draw commands for basic shapes and images

## Development

### Server

1. Install [Nodejs](https://nodejs.org) (>= 10.13.0).

2. Clone the repo:

```
git clone https://github.com/ECS-251-W2020/final-project-sudo.git
cd final-project-sudo
```

3. Setup chromium submodule:

```
git submodule init
git submodule update
```

Compile the modified chromium to executable. Refer to [chromium.org](https://chromium.googlesource.com/chromium/src/+/master/docs/linux/build_instructions.md)(skip "Get the code")

4. Install dependencies:

```
cd server
npm install
```

5. Start the server:

```
npm start
```
  
### Client

Install the web extension in local browser:

1. Open the Extension Management page by navigating to `chrome://extensions`.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the `LOAD UNPACKED` button and select the extension directory.
4. Enjoy your secure browsing experience
