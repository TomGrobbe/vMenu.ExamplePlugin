-- Example vMenu Enhanced plugin, written in TypeScript.
--
-- `npm run build` copies this file into build/vMenu.ExamplePlugin.TypeScript/, next to the bundled
-- client.js and server.js. Copy that whole folder into your server's resources and
-- `ensure vMenu.ExamplePlugin.TypeScript`.

fx_version 'cerulean'
games { 'gta5' }

name 'vMenu Example Plugin (TypeScript)'
description 'Shows how to build a vMenu Enhanced plugin in TypeScript.'
author 'Tom Grobbe'
version 'versiongoeshere'
url 'https://github.com/TomGrobbe/vMenu.ExamplePlugin/'

-- The plugin API from npm is bundled into both files, so nothing else needs loading.
client_script 'client.js'
server_script 'server.js'
