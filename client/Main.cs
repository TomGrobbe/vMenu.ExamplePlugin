using CitizenFX.FiveM.Client;
using CitizenFX.FiveM.Shared;
using CitizenFX.FiveM.Shared.Script;

using vMenu.Enhanced.ClientAPI;

namespace ExamplePlugin.Client;

public sealed class Main : IScript
{
    public async void Initialize()
    {
        var plugin = VMenuPlugin.Create(Text.Key("example.name"));

        plugin.DescriptionKey = "example.description";

        AddTranslations(plugin);

        // Declared on both sides: the server half puts it in the settings template the owner
        // reads, this half is what the menu below gates on.
        var enabled = plugin.Settings.Bool("Enabled", true, "Turns the example plugin's menu on or off.");

        // The bar under the banner. Without one vMenu falls back to the menu's own title.
        plugin.RootMenu.Subtitle = Text.Key("example.subtitle");

        var greet = plugin.RootMenu.AddButton(Text.Key("example.greet", ("name", Text.Literal("world"))));
        greet.Description = Text.Key("example.greet.desc");
        greet.Gate = PluginGate.Permission("Greet") & PluginGate.Setting(enabled);
        greet.Selected += () => plugin.Notify(NotifyStyle.Success, Text.Key("example.greeted"));

        var music = plugin.RootMenu.AddCheckbox(
            Text.Key("example.music"),
            initiallyChecked: true,
            id: "MusicEnabled",
            persist: true);

        music.Description = Text.Key("example.music.desc");
        music.Changed += on => SharedAPI.Log.Info($"[ExamplePlugin] Music is now {(on ? "on" : "off")}.");

        var mood = plugin.RootMenu.AddList(
            Text.Key("example.mood"),
            new Text[] { Text.Key("example.mood.happy"), Text.Key("example.mood.grumpy") });

        mood.Description = Text.Key("example.mood.desc");
        mood.Selected += index => plugin.Notify(
            NotifyStyle.Info,
            Text.Key("example.mood.picked", ("mood", MoodName(index))));

        var extras = plugin.RootMenu.AddSubmenu(
            Text.Key("example.extras"),
            subtitle: Text.Key("example.extras.subtitle"));

        extras.Description = Text.Key("example.extras.desc");

        var volume = extras.Menu.AddSlider(Text.Key("example.volume"), min: 0, max: 10, position: 5);
        volume.Description = Text.Key("example.volume.desc");
        volume.Moved += (_, position) => SharedAPI.Log.Info($"[ExamplePlugin] Volume is now {position}.");

        var ask = extras.Menu.AddButton(Text.Key("example.ask"));
        ask.Description = Text.Key("example.ask.desc");
        ask.Selected += async () =>
        {
            if (await plugin.GetTextAsync(Text.Key("example.ask"), maxLength: 32) is { } name)
            {
                plugin.Notify(NotifyStyle.Info, Text.Key("example.ask.nice", ("name", Text.Literal(name))));
            }
        };

        var reset = extras.Menu.AddConfirmButton(Text.Key("example.reset"));
        reset.Description = Text.Key("example.reset.desc");
        reset.Confirmed += () =>
        {
            volume.Position = 5;
            mood.SelectedIndex = 0;

            plugin.Notify(NotifyStyle.Success, Text.Key("example.reset.done"));
        };

        // Not part of the plugin's own tree: this row is injected into every player's entry of
        // vMenu's Online Players menu, and fires with whoever was selected there.
        var poke = plugin.PlayerActions.AddButton(Text.Key("example.poke"));
        poke.Description = Text.Key("example.poke.desc");
        poke.Gate = PluginGate.Permission("Poke");
        poke.Selected += target => plugin.Notify(
            NotifyStyle.Info,
            Text.Key("example.poked", ("name", Text.Literal(target.Name))));

        var result = await plugin.ConnectAsync();

        API.Log.Info($"[ExamplePlugin] Registered with vMenu: {result.Accepted}.");
    }

    private static Text MoodName(int index) =>
        index == 0 ? Text.Key("example.mood.happy") : Text.Key("example.mood.grumpy");

    // Every language needs the same keys, and English is the one vMenu falls back to when the
    // player's language has no table here.
    private static void AddTranslations(VMenuPlugin plugin)
    {
        plugin.Translations.Add("en", new Dictionary<string, string>
        {
            ["example.name"] = "Example Plugin",
            ["example.description"] = "Shows what a plugin can do.",
            ["example.subtitle"] = "Example Plugin Menu",

            ["example.greet"] = "Greet {name}",
            ["example.greet.desc"] = "Sends yourself a greeting, to show a plugin can notify you.",
            ["example.greeted"] = "Hello from the example plugin!",

            ["example.music"] = "Background music",
            ["example.music.desc"] = "A checkbox that remembers itself: leave it off and it is still off after a restart.",

            ["example.mood"] = "Mood",
            ["example.mood.desc"] = "Scroll to pick a value, then press to use it.",
            ["example.mood.happy"] = "Happy",
            ["example.mood.grumpy"] = "Grumpy",
            ["example.mood.picked"] = "Your mood is now {mood}.",

            ["example.extras"] = "Extras",
            ["example.extras.desc"] = "A submenu of this plugin, holding the rows that need a little more room.",
            ["example.extras.subtitle"] = "Example Plugin",

            ["example.volume"] = "Volume",
            ["example.volume.desc"] = "A slider. Move it left and right, its position is logged.",

            ["example.ask"] = "What is your name?",
            ["example.ask.desc"] = "Opens vMenu's input box and shows what you typed back to you.",
            ["example.ask.nice"] = "Nice to meet you, {name}.",

            ["example.reset"] = "Reset everything",
            ["example.reset.desc"] = "Puts the slider and the mood back to their starting values. Asks first.",
            ["example.reset.done"] = "Everything is back to its starting value.",

            ["example.poke"] = "Poke",
            ["example.poke.desc"] = "An action this plugin adds to every player in vMenu's Online Players menu.",
            ["example.poked"] = "You poked {name}.",
        });

        plugin.Translations.Add("nl", new Dictionary<string, string>
        {
            ["example.name"] = "Voorbeeldplugin",
            ["example.description"] = "Laat zien wat een plugin kan.",
            ["example.subtitle"] = "Voorbeeldplugin Menu",

            ["example.greet"] = "Groet {name}",
            ["example.greet.desc"] = "Stuurt jezelf een groet, om te laten zien dat een plugin je kan waarschuwen.",
            ["example.greeted"] = "Hallo vanuit de voorbeeldplugin!",

            ["example.music"] = "Achtergrondmuziek",
            ["example.music.desc"] = "Een vinkje dat zichzelf onthoudt: zet het uit en het staat na een herstart nog steeds uit.",

            ["example.mood"] = "Humeur",
            ["example.mood.desc"] = "Scroll om een waarde te kiezen en druk om hem te gebruiken.",
            ["example.mood.happy"] = "Vrolijk",
            ["example.mood.grumpy"] = "Chagrijnig",
            ["example.mood.picked"] = "Je humeur is nu {mood}.",

            ["example.extras"] = "Extra's",
            ["example.extras.desc"] = "Een submenu van deze plugin, met de rijen die wat meer ruimte nodig hebben.",
            ["example.extras.subtitle"] = "Voorbeeldplugin",

            ["example.volume"] = "Volume",
            ["example.volume.desc"] = "Een schuifbalk. Schuif hem heen en weer, zijn stand komt in de log.",

            ["example.ask"] = "Hoe heet je?",
            ["example.ask.desc"] = "Opent het invoerveld van vMenu en laat zien wat je hebt getypt.",
            ["example.ask.nice"] = "Aangenaam, {name}.",

            ["example.reset"] = "Alles resetten",
            ["example.reset.desc"] = "Zet de schuifbalk en het humeur terug op hun beginwaarde. Vraagt het eerst.",
            ["example.reset.done"] = "Alles staat weer op zijn beginwaarde.",

            ["example.poke"] = "Porren",
            ["example.poke.desc"] = "Een actie die deze plugin toevoegt aan elke speler in het Online Players menu van vMenu.",
            ["example.poked"] = "Je hebt {name} gepord.",
        });
    }
}
