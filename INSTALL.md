# Redesigned UI — drop-in instructions

Ten branch zawiera już zbudowane pliki frontendu (`web/dist/`). Nie musisz nic budować.

## Co podmienić w Twoim `illenium-appearance` na serwerze

W Twoim zasobie `resources/[standalone]/illenium-appearance/` (albo gdziekolwiek go trzymasz):

1. Usuń stary folder `web/dist/` (całą zawartość)
2. Skopiuj z tego repo `web/dist/index.html` i `web/dist/assets/*.js` do `illenium-appearance/web/dist/`
3. Restart zasobu na serwerze:
   ```
   refresh
   ensure illenium-appearance
   ```

Pliki `game/`, `fxmanifest.lua`, `locales/`, `peds.json`, `tattoos.json`, Lua logika — **niczego z tego nie ruszaj**. Redesign jest tylko frontendem.

## Jak pobrać tylko te 2 pliki

- `web/dist/index.html` → https://github.com/strasznyhenryk-hash/illenium-appearance-source/raw/release/redesigned-ui-ready/web/dist/index.html
- `web/dist/assets/index.2b02af77.js` → https://github.com/strasznyhenryk-hash/illenium-appearance-source/raw/release/redesigned-ui-ready/web/dist/assets/index.2b02af77.js

(Po podmianie stary plik `index.*.js` w Twoim zasobie ma inną nazwę hash — usuń go, wrzuć nowy, `index.html` już referuje właściwą nazwę.)

## Albo cały ZIP z GitHub

Na stronie brancha kliknij **Code → Download ZIP**:
https://github.com/strasznyhenryk-hash/illenium-appearance-source/archive/refs/heads/release/redesigned-ui-ready.zip

Z ZIP-a weź tylko folder `web/dist/` i wrzuć do swojego zasobu.
