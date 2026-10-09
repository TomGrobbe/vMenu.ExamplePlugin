# vMenu Example Plugin

## What is it

A working [vMenu Enhanced](https://github.com/TomGrobbe/vMenu) plugin, written once per language. All four build the same menu. Copy the one for your language and make it your own.

## Where do I look for my language

| Language | Folder | Plugin API |
| --- | --- | --- |
| C# | [`csharp/`](csharp/) | NuGet `vMenu.Enhanced.ClientAPI` and `vMenu.Enhanced.ServerAPI` |
| Lua | [`lua/`](lua/) | `vmenu.lua` |
| JavaScript | [`javascript/`](javascript/) | `vmenu.js` |
| TypeScript | [`typescript/`](typescript/) | npm `@vespura/vmenu-plugin` |

Full API docs: [docs.vespura.com](https://docs.vespura.com/vmenu/enhanced/plugins/developing/).

## How to use

1. Download `vMenu.ExamplePlugin.<Language>.zip` from the [latest release](https://github.com/TomGrobbe/vMenu.ExamplePlugin/releases/latest).
2. Unzip it into your server's `resources` folder.
3. Add `ensure vMenu.ExamplePlugin.<Language>` to `server.cfg`.
4. Start the server once. vMenu writes the plugin's permission and setting templates to `vMenu.Enhanced/config/plugins/`.

To start your own plugin, see "Making your own plugin" in your language's folder.
