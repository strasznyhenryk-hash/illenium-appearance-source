fx_version 'cerulean'
game "gta5"

author "ZRadio"
version '2.0.0'
description 'ZRadio - Oldschool Radio with Battery & Break System'

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
