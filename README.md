<p align="center">
  <img src="/assets/screenshots/logo.png" alt="PokeDash logo" width="120">
</p>

<h1 align="center">PokeDash</h1>

<p align="center">
  A tiny desktop companion that just… exists. Pick your favorite pixel pokemon,<br>
  plop it on your desktop, and watch it idle menacingly (or adorably) while you actually get work done.
</p>

---

## What is this?

PokeDash is a lightweight desktop widget for **DankMaterialShell (DMS)** that shows a single 8-bit pokemon sitting quietly on your desktop. No walking, no chasing your cursor — just a small, idle companion with its own personality.

## Features

-  **Pick your pokemon** — choose from a built-in roster right in the plugin settings
-  **Idle animation** — pokemons play their own idle/stance animation
-  **Background styles** — transparent, DMS theme, or frosted glass

## Installation

1. Copy the `pokeDash` folder to:
   ```
   ~/.config/DankMaterialShell/plugins/pokeDash/
   ```
2. Restart DMS:
   ```
   systemctl --user restart dms
   ```
3. Add the **PokeDash** widget to your desktop from the DMS widget picker.

## Files

| File | Purpose |
|---|---|
| `plugin.json` | Plugin manifest |
| `PokeDashWidget.qml` | Main widget — renders the selected pokemon |
| `PokeDashSettings.qml` | Plugin settings panel |
| `PokeDashGenerator.js` | pokemon roster + lookup logic |
| `assets/screnshots/logo.png` | Widget logo |

## Requirements

- DankMaterialShell ≥ 1.2.0

## Author

sayan