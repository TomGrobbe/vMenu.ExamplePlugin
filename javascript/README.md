# vMenu Example Plugin, JavaScript

## What is it

The plain JavaScript version of the example plugin, no build step. Resource name `vMenu.ExamplePlugin.JavaScript`.

## Where do I look

| File | Contains |
| --- | --- |
| `client.js` | The menu, translations and gates |
| `server.js` | Permissions and settings |
| `vmenu.js` | The plugin API |
| `fxmanifest.lua` | The manifest |

API docs: [JavaScript setup](https://docs.vespura.com/vmenu/enhanced/plugins/javascript/). Want a bundler and types? See the [TypeScript example](../typescript/).

## Building this example

Nothing to build. Copy this folder into your server's `resources` folder, rename it to `vMenu.ExamplePlugin.JavaScript` and `ensure` it.

## Making your own plugin

1. Take `vmenu.js` from the `plugin-api` folder of the vMenu Enhanced zip your server runs, and put it in your resource.
2. Load it before your own scripts in `fxmanifest.lua`:
   ```lua
   shared_script 'vmenu.js'
   client_script 'client.js'
   server_script 'server.js'
   ```
3. Use the global `vMenu` object in your scripts, for example `const { VMenuPlugin } = vMenu;`, then `ensure` the resource.

When you update vMenu, replace `vmenu.js` with the one from the new zip.
