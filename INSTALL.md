# Redesigned illenium-appearance — gotowa paczka (drop-in)

## TL;DR — jeden plik, wszystko w środku

**Pobierz**: [`illenium-appearance-redesigned.zip`](https://github.com/strasznyhenryk-hash/illenium-appearance-source/raw/release/redesigned-ui-ready/illenium-appearance-redesigned.zip)

W środku cały zasób `illenium-appearance/` (bazowany na oficjalnym iLLenium **v5.7.0**) z już podmienionym frontendem.

## Instalacja

1. Zatrzymaj serwer FiveM (albo wyłącz zasób: `stop illenium-appearance`)
2. W `resources/[standalone]/` (albo gdzie trzymasz illenium) **usuń cały stary folder** `illenium-appearance/`
3. Wypakuj ZIP i wrzuć folder `illenium-appearance/` w to samo miejsce
4. Wystartuj serwer (albo `ensure illenium-appearance`)

Jeżeli masz swój zmodyfikowany `shared/config.lua`, `shared/blacklist.lua`, `shared/peds.lua`, `shared/tattoos.lua` — **skopiuj je ze swojej kopii zapasowej** do nowego folderu, zanim odpalisz serwer. Paczka zawiera domyślne wartości iLLenium.

## Co jest w paczce

- Cały `illenium-appearance` v5.7.0 ze strony iLLeniumStudios (Lua client/server/shared, locales, SQL, fxmanifest)
- Podmieniony `web/dist/` — mój redesign UI (tab-based layout, czerwony akcent, Gender card na DNA)

## Czego paczka **nie** zmienia

- Żadna Lua logika
- Żadne configi (poza tym że są defaultowe iLLenium v5.7.0 — musisz wrzucić swoje jeśli miałeś edytowane)
- Żadne data files (peds/tattoos)

## Źródła

- Upstream: https://github.com/iLLeniumStudios/illenium-appearance/releases/tag/v5.7.0
- Redesign frontend source: [PR #1](https://github.com/strasznyhenryk-hash/illenium-appearance-source/pull/1)
