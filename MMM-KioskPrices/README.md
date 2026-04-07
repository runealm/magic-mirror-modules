# MMM-KioskPrices

A [MagicMirror²](https://magicmirror.builders/) module that displays a price list from a local JSON file. Designed for sports clubs, canteens or any venue with a kiosk.

![MagicMirror²](https://img.shields.io/badge/MagicMirror²-v2.15+-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- Displays a simple price list with item name and price
- Reads from a local `prices.json` file — no external API needed
- Updates automatically every minute without restarting MagicMirror
- Easy to update prices by editing a single JSON file

## Installation

```bash
cd ~/MagicMirror/modules
cp -r MMM-KioskPrices ~/MagicMirror/modules/
```

## Configuration

Add to your `config/config.js`:

```javascript
{
    module: "MMM-KioskPrices",
    position: "top_left",
    config: {
        title: "🥤 Kiosk",
    }
},
```

## Updating Prices

Edit the `prices.json` file in the module folder:

```bash
nano ~/MagicMirror/modules/MMM-KioskPrices/prices.json
```

Example `prices.json`:

```json
[
    { "name": "Vaffel",     "price": 20 },
    { "name": "Brus",       "price": 25 },
    { "name": "Kaffe",      "price": 15 },
    { "name": "Sjokolade",  "price": 20 },
    { "name": "Bolle",      "price": 15 },
    { "name": "Vann",       "price": 10 }
]
```

Changes are picked up automatically within 1 minute — no restart needed.

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `title` | `"🥤 Kiosk"` | Header title displayed above the price list |
| `updateInterval` | `60000` | How often to check for price updates (ms) |

## License

MIT
