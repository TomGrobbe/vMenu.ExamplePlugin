local resource = GetCurrentResourceName()
local plugin = vMenu.CreatePlugin(vMenu.Text.Key('example.name'))

plugin:SetDescriptionKey('example.description')

-- Every language needs the same keys, and English is the one vMenu falls back to when the
-- player's language has no table here.
plugin.Translations:Add('en', {
    ['example.name'] = 'Example Plugin (Lua)',
    ['example.description'] = 'Shows what a plugin can do.',
    ['example.subtitle'] = 'Example Plugin Menu',

    ['example.greet'] = 'Greet {name}',
    ['example.greet.desc'] = 'Sends yourself a greeting, to show a plugin can notify you.',
    ['example.greeted'] = 'Hello from the example plugin!',

    ['example.music'] = 'Background music',
    ['example.music.desc'] = 'A checkbox that remembers itself: leave it off and it is still off after a restart.',

    ['example.mood'] = 'Mood',
    ['example.mood.desc'] = 'Scroll to pick a value, then press to use it.',
    ['example.mood.happy'] = 'Happy',
    ['example.mood.grumpy'] = 'Grumpy',
    ['example.mood.picked'] = 'Your mood is now {mood}.',

    ['example.extras'] = 'Extras',
    ['example.extras.desc'] = 'A submenu of this plugin, holding the rows that need a little more room.',
    ['example.extras.subtitle'] = 'Example Plugin (Lua)',

    ['example.volume'] = 'Volume',
    ['example.volume.desc'] = 'A slider. Move it left and right, its position is logged.',

    ['example.ask'] = 'What is your name?',
    ['example.ask.desc'] = "Opens vMenu's input box and shows what you typed back to you.",
    ['example.ask.nice'] = 'Nice to meet you, {name}.',

    ['example.reset'] = 'Reset everything',
    ['example.reset.desc'] = 'Puts the slider and the mood back to their starting values. Asks first.',
    ['example.reset.done'] = 'Everything is back to its starting value.',

    ['example.poke'] = 'Poke',
    ['example.poke.desc'] = "An action this plugin adds to every player in vMenu's Online Players menu.",
    ['example.poked'] = 'You poked {name}.',
})

plugin.Translations:Add('nl', {
    ['example.name'] = 'Voorbeeldplugin (Lua)',
    ['example.description'] = 'Laat zien wat een plugin kan.',
    ['example.subtitle'] = 'Voorbeeldplugin Menu',

    ['example.greet'] = 'Groet {name}',
    ['example.greet.desc'] = 'Stuurt jezelf een groet, om te laten zien dat een plugin je kan waarschuwen.',
    ['example.greeted'] = 'Hallo vanuit de voorbeeldplugin!',

    ['example.music'] = 'Achtergrondmuziek',
    ['example.music.desc'] = 'Een vinkje dat zichzelf onthoudt: zet het uit en het staat na een herstart nog steeds uit.',

    ['example.mood'] = 'Humeur',
    ['example.mood.desc'] = 'Scroll om een waarde te kiezen en druk om hem te gebruiken.',
    ['example.mood.happy'] = 'Vrolijk',
    ['example.mood.grumpy'] = 'Chagrijnig',
    ['example.mood.picked'] = 'Je humeur is nu {mood}.',

    ['example.extras'] = "Extra's",
    ['example.extras.desc'] = 'Een submenu van deze plugin, met de rijen die wat meer ruimte nodig hebben.',
    ['example.extras.subtitle'] = 'Voorbeeldplugin (Lua)',

    ['example.volume'] = 'Volume',
    ['example.volume.desc'] = 'Een schuifbalk. Schuif hem heen en weer, zijn stand komt in de log.',

    ['example.ask'] = 'Hoe heet je?',
    ['example.ask.desc'] = 'Opent het invoerveld van vMenu en laat zien wat je hebt getypt.',
    ['example.ask.nice'] = 'Aangenaam, {name}.',

    ['example.reset'] = 'Alles resetten',
    ['example.reset.desc'] = 'Zet de schuifbalk en het humeur terug op hun beginwaarde. Vraagt het eerst.',
    ['example.reset.done'] = 'Alles staat weer op zijn beginwaarde.',

    ['example.poke'] = 'Porren',
    ['example.poke.desc'] = 'Een actie die deze plugin toevoegt aan elke speler in het Online Players menu van vMenu.',
    ['example.poked'] = 'Je hebt {name} gepord.',
})

-- Declared on both sides: the server half puts it in the settings template the owner
-- reads, this half is what the menu below gates on.
local enabled = plugin.Settings:Bool('Enabled', true, "Turns the example plugin's menu on or off.")

-- The bar under the banner. Without one vMenu falls back to the menu's own title.
plugin.RootMenu:SetSubtitle(vMenu.Text.Key('example.subtitle'))

local greet = plugin.RootMenu:AddButton(vMenu.Text.Key('example.greet', { name = 'world' }), {
    Description = vMenu.Text.Key('example.greet.desc'),
    Gate = vMenu.Gate.Permission('Greet') & vMenu.Gate.Setting(enabled),
})

greet:OnSelected(function()
    plugin:Notify('success', vMenu.Text.Key('example.greeted'))
end)

local music = plugin.RootMenu:AddCheckbox(vMenu.Text.Key('example.music'), {
    Id = 'MusicEnabled',
    Checked = true,
    Persist = true,
    Description = vMenu.Text.Key('example.music.desc'),
})

music:OnChanged(function(on)
    print(('[%s] Music is now %s.'):format(resource, on and 'on' or 'off'))
end)

local moods = { vMenu.Text.Key('example.mood.happy'), vMenu.Text.Key('example.mood.grumpy') }

local mood = plugin.RootMenu:AddList(vMenu.Text.Key('example.mood'), moods, {
    Description = vMenu.Text.Key('example.mood.desc'),
})

mood:OnSelected(function(index)
    plugin:Notify('info', vMenu.Text.Key('example.mood.picked', { mood = moods[index] }))
end)

local extras = plugin.RootMenu:AddSubmenu(vMenu.Text.Key('example.extras'), {
    Subtitle = vMenu.Text.Key('example.extras.subtitle'),
    Description = vMenu.Text.Key('example.extras.desc'),
})

local volume = extras.Menu:AddSlider(vMenu.Text.Key('example.volume'), 0, 10, 5, {
    Description = vMenu.Text.Key('example.volume.desc'),
})

volume:OnMoved(function(_, position)
    print(('[%s] Volume is now %d.'):format(resource, position))
end)

local ask = extras.Menu:AddButton(vMenu.Text.Key('example.ask'), {
    Description = vMenu.Text.Key('example.ask.desc'),
})

-- Event handlers run in a thread of their own, so waiting for the player's answer is fine here.
ask:OnSelected(function()
    local name = plugin:GetText(vMenu.Text.Key('example.ask'), { MaxLength = 32 })

    if name then
        plugin:Notify('info', vMenu.Text.Key('example.ask.nice', { name = name }))
    end
end)

local reset = extras.Menu:AddConfirmButton(vMenu.Text.Key('example.reset'), {
    Description = vMenu.Text.Key('example.reset.desc'),
})

reset:OnConfirmed(function()
    volume:SetPosition(5)
    mood:SetSelectedIndex(1)

    plugin:Notify('success', vMenu.Text.Key('example.reset.done'))
end)

-- Not part of the plugin's own tree: this row is injected into every player's entry of
-- vMenu's Online Players menu, and fires with whoever was selected there.
local poke = plugin.PlayerActions:AddButton(vMenu.Text.Key('example.poke'), {
    Description = vMenu.Text.Key('example.poke.desc'),
    Gate = 'Poke',
})

poke:OnSelected(function(target)
    plugin:Notify('info', vMenu.Text.Key('example.poked', { name = target.Name }))
end)

CreateThread(function()
    local result = plugin:Connect()

    print(('[%s] Registered with vMenu: %s.'):format(resource, tostring(result.Accepted)))
end)
