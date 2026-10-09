# vMenu Example Plugin, TypeScript

## What is it

The TypeScript version of the example plugin. Resource name `vMenu.ExamplePlugin.TypeScript`.

## Where do I look

| File | Contains |
| --- | --- |
| `src/client.ts` | The menu, translations and gates |
| `src/server.ts` | Permissions and settings |
| `build.mjs` | Bundles each half into one script FiveM can load |
| `fxmanifest.lua` | The manifest |

API docs: [TypeScript setup](https://docs.vespura.com/vmenu/enhanced/plugins/typescript/).

## Building this example

1. Install Node.js 22 or newer.
2. Run `npm ci` and then `npm run build` in this folder.
3. Copy `build/vMenu.ExamplePlugin.TypeScript/` into your server's `resources` folder and `ensure` it.

## Making your own plugin

1. In your own resource folder, install the plugin API at the vMenu Enhanced version your server runs, plus esbuild:
   ```
   npm init -y
   npm install @vespura/vmenu-plugin@<your vMenu version> --save-exact
   npm install esbuild --save-dev
   ```
2. Write `src/client.ts` (import from `@vespura/vmenu-plugin/client`) and `src/server.ts` (import from `@vespura/vmenu-plugin/server`).
3. Bundle each into one plain script, `dist/client.js` and `dist/server.js`, with esbuild's `format: 'iife'`. [`build.mjs`](build.mjs) shows how.
4. Add an `fxmanifest.lua` with `client_script 'dist/client.js'` and `server_script 'dist/server.js'`, then `ensure` the resource.
