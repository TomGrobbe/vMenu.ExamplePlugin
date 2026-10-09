import { ServerPluginDeclaration, VMenuServer } from '@vespura/vmenu-plugin/server';

declare function GetCurrentResourceName(): string;

// Everything declared here ends up in vMenu.Enhanced/config/plugins/, as
// vMenu.ExamplePlugin.TypeScript.permissions.cfg.example and vMenu.ExamplePlugin.TypeScript.configuration.cfg.example
// for the server owner to copy.
const declaration = new ServerPluginDeclaration('Example Plugin (TypeScript)')
  .addPermission('Greet', 'Lets someone use the greet button.')
  .addPermission('Poke', 'Lets someone poke other players.', true)
  .addBoolSetting('Enabled', true, "Turns the example plugin's greeting menu item on or off.");

VMenuServer.register(declaration).then((result) => console.log(`[${GetCurrentResourceName()}] Registered with vMenu: ${result.accepted}.`));
