-- Example vMenu Enhanced plugin, written in plain JavaScript.
--
-- Copy this folder into your server's resources, rename it to vMenu.ExamplePlugin.JavaScript and
-- `ensure vMenu.ExamplePlugin.JavaScript`. The release zip already has the right folder name.

fx_version 'cerulean'
games { 'gta5' }

name 'vMenu Example Plugin (JavaScript)'
description 'Shows how to build a vMenu Enhanced plugin in plain JavaScript.'
author 'Tom Grobbe'
version 'versiongoeshere'
url 'https://github.com/TomGrobbe/vMenu.ExamplePlugin/'

-- The plugin API, copied from the plugin-api folder of the vMenu Enhanced zip this plugin was built against. Loaded first on
-- both sides, so the client and server scripts below can use the global vMenu object.
shared_script 'vmenu.js'

client_script 'client.js'
server_script 'server.js'
