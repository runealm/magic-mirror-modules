# MMM-Ordensmann

A [MagicMirror²](https://magicmirror.builders/) module that displays a monthly duty roster from a local JSON file. Shows the current and next month automatically based on the system date.

![MagicMirror²](https://img.shields.io/badge/MagicMirror²-v2.15+-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- Displays current and next month's duty person(s)
- Reads from a local `schedule.json` file — no external API needed
- Updates automatically every hour
- Transparent background — works on any background color or image
- Text shadow ensures readability on both light and dark backgrounds

## Installation

```bash
cp -r MMM-Ordensmann ~/MagicMirror/modules/
```

## Configuration

Add to your `config/config.js`:

```javascript
{
    module: "MMM-Ordensmann",
    position: "bottom_center",
    config: {
        title: "🦺 Ordensmann",
    }
},
```

## Updating the Schedule

Edit the `schedule.json` file in the module folder:

```bash
nano ~/MagicMirror/modules/MMM-Ordensmann/schedule.json
```

Example `schedule.json`:

```json
[
    { "year": 2026, "month": 1,  "name": "Rune" },
    { "year": 2026, "month": 2,  "name": "Thomas" },
    { "year": 2026, "month": 3,  "name": "Jan Erik og Chris" },
    { "year": 2026, "month": 4,  "name": "Magne" },
    { "year": 2026, "month": 5,  "name": "Vidar" },
    { "year": 2026, "month": 6,  "name": "Jon" },
    { "year": 2026, "month": 7,  "name": "Rune" },
    { "year": 2026, "month": 8,  "name": "Thomas" },
    { "year": 2026, "month": 9,  "name": "Jan Erik" },
    { "year": 2026, "month": 10, "name": "Magne" },
    { "year": 2026, "month": 11, "name": "Vidar" },
    { "year": 2026, "month": 12, "name": "Jon" }
]
```

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `title` | `"🦺 Ordensmann"` | Header title displayed above the roster |
| `scheduleFile` | `"schedule.json"` | Path to the schedule file |
| `updateInterval` | `3600000` | How often to check for updates (ms) |

## Display

The module always shows:
- **Current month** — displayed in full brightness
- **Next month** — displayed in a dimmed style

## License

MIT
