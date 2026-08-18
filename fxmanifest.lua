-- Example vMenu Enhanced plugin.
--
-- This file is copied into build/vMenu.ExamplePlugin/ on every build, next to the client and
-- server folders the two projects write into. Copy that whole folder into your server's
-- resources and `ensure vMenu.ExamplePlugin`.

fx_version 'cerulean'
games { 'gta5' }

name 'vMenu Example Plugin'
description 'Shows how to build a vMenu Enhanced plugin in C#.'
author 'Tom Grobbe'
url 'https://github.com/TomGrobbe/vMenu.ExamplePlugin/'

-- Everything the client half needs, because a client assembly and its dependencies are
-- downloaded rather than read off the server's disk. Add a line here for every DLL that
-- shows up in build/vMenu.ExamplePlugin/client/ after adding a package reference.
files {
    'client/CitizenFX.Base.dll',
    'client/CitizenFX.FiveM.Shared.dll',
    'client/CitizenFX.FiveM.Client.dll',

    'client/MessagePack.dll',
    'client/MessagePack.Annotations.dll',

    'client/Microsoft.NET.StringTools.dll',

    'client/Newtonsoft.Json.dll',

    'client/vMenu.Enhanced.PluginContracts.dll',
    'client/vMenu.Enhanced.ClientAPI.dll',
}

client_script 'client/ExamplePlugin.Client.dll'

-- The server side loads from disk, so its dependencies need no files entry of their own.
server_script 'server/ExamplePlugin.Server.dll'
