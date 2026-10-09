-- Example vMenu Enhanced plugin, written in Lua.
--
-- Copy this folder into your server's resources, rename it to vMenu.ExamplePlugin.Lua and
-- `ensure vMenu.ExamplePlugin.Lua`. The release zip already has the right folder name.

fx_version 'cerulean'
games { 'gta5' }
lua54 'yes'

name 'vMenu Example Plugin (Lua)'
description 'Shows how to build a vMenu Enhanced plugin in Lua.'
author 'Tom Grobbe'
version 'versiongoeshere'
url 'https://github.com/TomGrobbe/vMenu.ExamplePlugin/'

-- The plugin API, copied from the plugin-api folder of the vMenu Enhanced zip this plugin was built against. Loaded first on
-- both sides, so the client and server scripts below can use the global vMenu table.
shared_script 'vmenu.lua'

client_script 'client.lua'
server_script 'server.lua'
