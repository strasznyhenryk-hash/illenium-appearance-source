fx_version 'cerulean'
game "gta5"

author "ZRadio"
version '1.0.0'
description 'ZRadio - Oldschool Radio for FiveM'

lua54 'yes'

ui_page 'build/index.html'

shared_script {
    "@ox_lib/init.lua",
    "shared/**"
}

client_script {
    '@bl_bridge/imports/client.lua',
    'client/interface.lua',
    'client/function.lua',
    'client/event.lua',
    'client/nui.lua'
}

server_script {
    '@bl_bridge/imports/server.lua',
    "server/main.lua",
}

files {
    'build/**',
    'locales/*.json'
}

dependencies {
    'pma-voice',
    'ox_lib',
    '/onesync',
    'bl_bridge'
}
