-- Everything declared here ends up in vMenu.Enhanced/config/plugins/, as
-- vMenu.ExamplePlugin.Lua.permissions.cfg.example and vMenu.ExamplePlugin.Lua.configuration.cfg.example
-- for the server owner to copy.
local declaration = vMenu.ServerPluginDeclaration('Example Plugin (Lua)')
    :AddPermission('Greet', 'Lets someone use the greet button.')
    :AddPermission('Poke', 'Lets someone poke other players.', true)
    :AddBoolSetting('Enabled', true, "Turns the example plugin's greeting menu item on or off.")

CreateThread(function()
    local result = vMenu.Server.Register(declaration)

    print(('[%s] Registered with vMenu: %s.'):format(GetCurrentResourceName(), tostring(result.Accepted)))
end)
