import { Gate, NotifyStyle, Text, VMenuPlugin } from '@vespura/vmenu-plugin/client';

const plugin = VMenuPlugin.create(Text.key('example.name'));

plugin.descriptionKey = 'example.description';

// Every language needs the same keys, and English is the one vMenu falls back to when the
// player's language has no table here.
plugin.translations.add('en', {
  'example.name': 'Example Plugin (TypeScript)',
  'example.description': 'Shows what a plugin can do.',
  'example.subtitle': 'Example Plugin Menu',

  'example.greet': 'Greet {name}',
  'example.greet.desc': 'Sends yourself a greeting, to show a plugin can notify you.',
  'example.greeted': 'Hello from the example plugin!',

  'example.music': 'Background music',
  'example.music.desc': 'A checkbox that remembers itself: leave it off and it is still off after a restart.',

  'example.mood': 'Mood',
  'example.mood.desc': 'Scroll to pick a value, then press to use it.',
  'example.mood.happy': 'Happy',
  'example.mood.grumpy': 'Grumpy',
  'example.mood.picked': 'Your mood is now {mood}.',

  'example.extras': 'Extras',
  'example.extras.desc': 'A submenu of this plugin, holding the rows that need a little more room.',
  'example.extras.subtitle': 'Example Plugin (TypeScript)',

  'example.volume': 'Volume',
  'example.volume.desc': 'A slider. Move it left and right, its position is logged.',

  'example.ask': 'What is your name?',
  'example.ask.desc': "Opens vMenu's input box and shows what you typed back to you.",
  'example.ask.nice': 'Nice to meet you, {name}.',

  'example.reset': 'Reset everything',
  'example.reset.desc': 'Puts the slider and the mood back to their starting values. Asks first.',
  'example.reset.done': 'Everything is back to its starting value.',

  'example.poke': 'Poke',
  'example.poke.desc': "An action this plugin adds to every player in vMenu's Online Players menu.",
  'example.poked': 'You poked {name}.',
});

plugin.translations.add('nl', {
  'example.name': 'Voorbeeldplugin (TypeScript)',
  'example.description': 'Laat zien wat een plugin kan.',
  'example.subtitle': 'Voorbeeldplugin Menu',

  'example.greet': 'Groet {name}',
  'example.greet.desc': 'Stuurt jezelf een groet, om te laten zien dat een plugin je kan waarschuwen.',
  'example.greeted': 'Hallo vanuit de voorbeeldplugin!',

  'example.music': 'Achtergrondmuziek',
  'example.music.desc': 'Een vinkje dat zichzelf onthoudt: zet het uit en het staat na een herstart nog steeds uit.',

  'example.mood': 'Humeur',
  'example.mood.desc': 'Scroll om een waarde te kiezen en druk om hem te gebruiken.',
  'example.mood.happy': 'Vrolijk',
  'example.mood.grumpy': 'Chagrijnig',
  'example.mood.picked': 'Je humeur is nu {mood}.',

  'example.extras': "Extra's",
  'example.extras.desc': 'Een submenu van deze plugin, met de rijen die wat meer ruimte nodig hebben.',
  'example.extras.subtitle': 'Voorbeeldplugin (TypeScript)',

  'example.volume': 'Volume',
  'example.volume.desc': 'Een schuifbalk. Schuif hem heen en weer, zijn stand komt in de log.',

  'example.ask': 'Hoe heet je?',
  'example.ask.desc': 'Opent het invoerveld van vMenu en laat zien wat je hebt getypt.',
  'example.ask.nice': 'Aangenaam, {name}.',

  'example.reset': 'Alles resetten',
  'example.reset.desc': 'Zet de schuifbalk en het humeur terug op hun beginwaarde. Vraagt het eerst.',
  'example.reset.done': 'Alles staat weer op zijn beginwaarde.',

  'example.poke': 'Porren',
  'example.poke.desc': 'Een actie die deze plugin toevoegt aan elke speler in het Online Players menu van vMenu.',
  'example.poked': 'Je hebt {name} gepord.',
});

// Declared on both sides: the server half puts it in the settings template the owner
// reads, this half is what the menu below gates on.
const enabled = plugin.settings.bool('Enabled', true, "Turns the example plugin's menu on or off.");

// The bar under the banner. Without one vMenu falls back to the menu's own title.
plugin.rootMenu.subtitle = Text.key('example.subtitle');

const greet = plugin.rootMenu.addButton(Text.key('example.greet', { name: 'world' }), {
  description: Text.key('example.greet.desc'),
  gate: Gate.permission('Greet').and(Gate.setting(enabled)),
});

greet.onSelected(() => plugin.notify(NotifyStyle.Success, Text.key('example.greeted')));

const music = plugin.rootMenu.addCheckbox(Text.key('example.music'), {
  id: 'MusicEnabled',
  checked: true,
  persist: true,
  description: Text.key('example.music.desc'),
});

music.onChanged((on) => console.log(`[${plugin.resource}] Music is now ${on ? 'on' : 'off'}.`));

const moods = [Text.key('example.mood.happy'), Text.key('example.mood.grumpy')];

const mood = plugin.rootMenu.addList(Text.key('example.mood'), moods, {
  description: Text.key('example.mood.desc'),
});

mood.onSelected((index) => plugin.notify(NotifyStyle.Info, Text.key('example.mood.picked', { mood: moods[index] })));

const extras = plugin.rootMenu.addSubmenu(Text.key('example.extras'), {
  subtitle: Text.key('example.extras.subtitle'),
  description: Text.key('example.extras.desc'),
});

const volume = extras.menu.addSlider(Text.key('example.volume'), 0, 10, 5, {
  description: Text.key('example.volume.desc'),
});

volume.onMoved((_, position) => console.log(`[${plugin.resource}] Volume is now ${position}.`));

const ask = extras.menu.addButton(Text.key('example.ask'), {
  description: Text.key('example.ask.desc'),
});

ask.onSelected(async () => {
  const name = await plugin.getText(Text.key('example.ask'), { maxLength: 32 });

  if (name !== null) {
    plugin.notify(NotifyStyle.Info, Text.key('example.ask.nice', { name }));
  }
});

const reset = extras.menu.addConfirmButton(Text.key('example.reset'), {
  description: Text.key('example.reset.desc'),
});

reset.onConfirmed(() => {
  volume.position = 5;
  mood.selectedIndex = 0;

  plugin.notify(NotifyStyle.Success, Text.key('example.reset.done'));
});

// Not part of the plugin's own tree: this row is injected into every player's entry of
// vMenu's Online Players menu, and fires with whoever was selected there.
const poke = plugin.playerActions.addButton(Text.key('example.poke'), {
  description: Text.key('example.poke.desc'),
  gate: 'Poke',
});

poke.onSelected((target) => plugin.notify(NotifyStyle.Info, Text.key('example.poked', { name: target.name })));

plugin.connect().then((result) => console.log(`[${plugin.resource}] Registered with vMenu: ${result.accepted}.`));
