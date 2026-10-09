# vMenu Example Plugin, Lua

## What is it

The Lua version of the example plugin. Resource name `vMenu.ExamplePlugin.Lua`.

## Where do I look

| File | Contains |
| --- | --- |
| `client.lua` | The menu, translations and gates |
| `server.lua` | Permissions and settings |
| `vmenu.lua` | The plugin API |
| `fxmanifest.lua` | The manifest |

API docs: [Lua setup](https://docs.vespura.com/vmenu/enhanced/plugins/lua/).

## Building this example

Nothing to build. Copy this folder into your server's `resources` folder, rename it to `vMenu.ExamplePlugin.Lua` and `ensure` it.

## Making your own plugin

1. Take `vmenu.lua` from the `plugin-api` folder of the vMenu Enhanced zip your server runs, and put it in your resource.
2. Load it before your own scripts in `fxmanifest.lua`:
   ```lua
   lua54 'yes'
   shared_script 'vmenu.lua'
   client_script 'client.lua'
   server_script 'server.lua'
   ```
3. Use the global `vMenu` table in your scripts, for example `local plugin = vMenu.CreatePlugin('My Plugin')`, then `ensure` the resource.

Calls that wait for vMenu (`Connect`, `GetText`, `Server.Register`) must run inside `CreateThread` or a menu event handler. When you update vMenu, replace `vmenu.lua` with the one from the new zip.
