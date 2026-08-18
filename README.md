# vMenu Example Plugin

A complete, working plugin for [vMenu Enhanced](https://github.com/TomGrobbe/vMenu), the version of vMenu that runs on FiveM Enhanced. It exists to be read and copied. Everything a plugin can do is in here once, with a comment next to it.

The written documentation lives at [docs.vespura.com](https://docs.vespura.com/vmenu/enhanced/plugins/), for players, server owners and developers alike. This README covers this repository specifically.

## What a plugin actually is

A plugin is just a normal FiveM resource of your own, written in C#. It does not live inside vMenu, it does not patch vMenu, and vMenu does not need to know it exists before it starts. Your resource says hello to vMenu over an event, hands it a description of the menu you want, and vMenu draws that menu inside itself under a **Plugins** entry on its main menu.

That means you can ship your plugin on its own, and a server owner installs it by dropping a folder in their resources, exactly like any other resource.

There are two halves, and both are in this repository.

The **client** half (`client/`) describes the menu. Buttons, checkboxes, lists, sliders, submenus, the lot. It also holds your translations, and it decides which rows are hidden or locked based on permissions and settings.

The **server** half (`server/`) declares the things a server owner controls: the permissions your plugin wants to hand out, and the settings they can change. It is the server that decides who may do what, because anything a game client sends can be faked.

## Building it

You need the .NET SDK, version 10 or newer. Then, from this folder:

```
dotnet build -c Release
```

That produces a ready to use resource in `build/vMenu.ExamplePlugin/`:

```
build/vMenu.ExamplePlugin/
    fxmanifest.lua      the resource manifest, copied here by the build
    README.md           this file, copied here by the build
    client/             the client assembly and everything it depends on
    server/             the server assembly and everything it depends on
```

The two halves each get their own folder on purpose. The client and the server packages both ship a file called `CitizenFX.Base.dll`, and they are not the same file. Put them in one folder and one of the two overwrites the other, which breaks whichever side lost.

Copy that `vMenu.ExamplePlugin` folder into your server's `resources` folder and add `ensure vMenu.ExamplePlugin` to your `server.cfg`. It does not matter whether it starts before or after vMenu, the two find each other either way.

## Where the packages come from

The two NuGet packages this plugin uses come straight from nuget.org, nothing else to set up:

- [`vMenu.Enhanced.ClientAPI`](https://www.nuget.org/packages/vMenu.Enhanced.ClientAPI/), used by the client half
- [`vMenu.Enhanced.ServerAPI`](https://www.nuget.org/packages/vMenu.Enhanced.ServerAPI/), used by the server half

They pull in [`vMenu.Enhanced.PluginContracts`](https://www.nuget.org/packages/vMenu.Enhanced.PluginContracts/) by themselves, which is the shared protocol between vMenu and a plugin and not something you reference on your own.

Both versions are pinned in one place, `Directory.Packages.props`, one line each. The package version always matches the vMenu Enhanced release it belongs to, so set it to the vMenu version your server actually runs, and raise it when you update vMenu. It is pinned rather than floating on purpose. A plugin that quietly follows whatever is newest is a plugin that breaks on a vMenu release nobody tested it against, and while Enhanced is in alpha that happens often enough to matter.

vMenu Enhanced is still in alpha, so the versions are prerelease ones like `0.0.1-alpha.69`. NuGet only offers you a prerelease when you ask for it by name, which pinning does.

## Permissions and settings

Start the plugin once, with vMenu running. vMenu then writes two template files for the server owner, both named after your resource:

```
vMenu.Enhanced/config/plugins/vMenu.ExamplePlugin.permissions.cfg.example
vMenu.Enhanced/config/plugins/vMenu.ExamplePlugin.configuration.cfg.example
```

They work exactly like vMenu's own templates. Copy each one, drop the `.example` off the copy's name, edit the copy, and execute it from `server.cfg` above the line that starts vMenu:

```
exec @vMenu.Enhanced/config/plugins/vMenu.ExamplePlugin.permissions.cfg
exec @vMenu.Enhanced/config/plugins/vMenu.ExamplePlugin.configuration.cfg
ensure vMenu.Enhanced
```

Every plugin gets its own pair like this, in that one `plugins` folder. Nothing of yours is written into vMenu's own `permissions.cfg` or `configuration.cfg`, so a server owner who removes your plugin deletes the files carrying its name and is done.

The names in those files are built from your resource name. This plugin declares a permission called `Greet`, and it comes out as `vMenu.Enhanced.Plugins.vMenu_ExamplePlugin.Greet`. Dots and dashes in a resource name are not allowed inside a permission name, so they turn into underscores.

## Making it your own

Copy this whole folder, then change these, in order:

1. `ResourceName` in `Directory.Build.props`. This is the folder name on the server, and it is the name vMenu knows your plugin by, so it is also what its permissions and settings are named after.
2. The folder name of the repository itself, and `vMenu.ExamplePlugin.slnx`.
3. `name`, `description`, `author` and `url` in `fxmanifest.lua`.
4. The namespaces and the assembly names in `client/ExamplePlugin.Client.csproj` and `server/ExamplePlugin.Server.csproj`. If you rename the assemblies, rename them in `fxmanifest.lua` too.
5. Your translation keys in `client/Main.cs`. They are only looked up inside your own plugin, so a key called `example.greet` never collides with vMenu's or with another plugin's.

If your plugin adds a NuGet package of its own, remember that the client half is downloaded by every player rather than read off the server's disk. Anything new that appears in `build/vMenu.ExamplePlugin/client/` needs a line in the `files` block of `fxmanifest.lua`, or players get an assembly load error the moment they open the menu.

## A tour of the example

The client half builds this menu:

- **Greet world**, a button. It is gated on the `Greet` permission and on the `Enabled` setting at the same time, so it disappears when the owner turns either of them off.
- **Background music**, a checkbox that is saved. Untick it, restart the server, and it is still unticked, because it is stored in your resource's own key value store.
- **Mood**, a list you scroll through and then press.
- **Extras**, a submenu, holding a slider, a row that opens vMenu's text input box, and a row that asks you to confirm before it does anything.

It also adds one row outside its own tree: a **Poke** action that shows up under **Plugin Actions** inside every player's entry in vMenu's Online Players menu. When it fires, it is told which player was selected. That row is gated on the `Poke` permission, which the server half marks as staff only, so the generated template suggests it to `group.admin` rather than to everybody.

Every row has a description, the line of text vMenu shows at the bottom of the screen while the row is highlighted. Write one for every row you add. A menu where half the rows explain themselves and the other half say nothing looks broken, and players will assume it is.
