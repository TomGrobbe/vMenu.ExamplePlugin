# vMenu Example Plugin, C#

## What is it

The C# version of the example plugin. Resource name `vMenu.ExamplePlugin.CSharp`.

## Where do I look

| File | Contains |
| --- | --- |
| `client/Main.cs` | The menu, translations and gates |
| `server/Main.cs` | Permissions and settings |
| `fxmanifest.lua` | The manifest. Every client DLL is listed under `files` |
| `Directory.Build.props` | The resource name and output folders |
| `Directory.Packages.props` | The plugin API version |

API docs: [C# setup](https://docs.vespura.com/vmenu/enhanced/plugins/csharp/).

## Building this example

1. Install the .NET 10 SDK.
2. Run `dotnet build -c Release` in this folder.
3. Copy `build/vMenu.ExamplePlugin.CSharp/` into your server's `resources` folder and `ensure` it.

## Making your own plugin

1. Create two class library projects targeting `net10.0`, one for the client and one for the server.
2. Add the NuGet packages at the vMenu Enhanced version your server runs:
   ```
   dotnet add Client package vMenu.Enhanced.ClientAPI --version <your vMenu version>
   dotnet add Server package vMenu.Enhanced.ServerAPI --version <your vMenu version>
   ```
3. Build each into its own folder, `client/` and `server/`, with `CopyLocalLockFileAssemblies` on. [`Directory.Build.props`](Directory.Build.props) shows how.
4. Write an `fxmanifest.lua` that lists every client DLL under `files`, then `ensure` the resource. The [C# setup](https://docs.vespura.com/vmenu/enhanced/plugins/csharp/) page has the full manifest.
