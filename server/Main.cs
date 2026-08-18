using CitizenFX.FiveM.Server;
using CitizenFX.FiveM.Shared.Script;

using vMenu.Enhanced.ServerAPI;

namespace ExamplePlugin.Server;

public sealed class Main : IScript
{
    public async void Initialize()
    {
        // Everything declared here ends up in vMenu.Enhanced/config/plugins/vMenu.ExamplePlugin/,
        // as a permissions template and a settings template for the server owner to copy.
        var declaration = new ServerPluginDeclaration("Example Plugin")
            .AddPermission("Greet", "Lets someone use the greet button.")
            .AddPermission("Poke", "Lets someone poke other players.", staffOnly: true)
            .AddBoolSetting("Enabled", true, "Turns the example plugin's menu on or off.");

        var result = await VMenuServer.RegisterAsync(declaration);

        API.Log.Info($"[ExamplePlugin] Registered with vMenu: {result.Accepted}.");
    }
}
