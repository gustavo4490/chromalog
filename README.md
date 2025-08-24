
# chromalog — Pretty Console Badges for the Browser (TypeScript)
[![npm version](https://img.shields.io/npm/v/@hunab/chromalog.svg)](https://www.npmjs.com/package/@hunab/chromalog)
[![npm downloads](https://img.shields.io/npm/dm/@hunab/chromalog.svg)](https://www.npmjs.com/package/@hunab/chromalog)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@hunab/chromalog.svg)](https://bundlephobia.com/package/@hunab/chromalog)
![types](https://img.shields.io/badge/TypeScript-ready-blue)
[![license](https://img.shields.io/badge/license-MIT-black.svg)](#license)

**chromalog** is a tiny, dependency-free logger that prints **colored, badge-style messages** in the browser console. It helps you quickly scan successes, infos, warnings and errors in large traces. Built in TypeScript.

> Keywords: *browser console logger, colored console logs, styled console, TypeScript logger, React logger, JavaScript logging utility, console badges, pretty logs, console formatter, logging library for frontend.*

---

## Features
- ✅ **Colored badges** per level: `success`, `info`, `warning`, `error`.
- ✅ Uses the **right console method** per level (`console.info`, `console.warn`, `console.error`).
- ✅ **Level icons** (✅ ℹ️ ⚠️ 🛑) for faster scanning.
- ✅ **Auto light/dark theme** based on `prefers-color-scheme`.
- ✅ **Enable/disable** globally via `chromalog.config({ enabled: false })`.
- ✅ Zero dependencies, **TypeScript** typings, tiny footprint.

---

## Install

```bash
npm i @hunab/chromalog
# or
yarn add @hunab/chromalog
# or
pnpm add @hunab/chromalog
```

CDN:
```html
<script type="module">
  import { chromalog } from 'https://unpkg.com/@hunab/chromalog/dist/index.es.js';
  chromalog.info('Hello from CDN!');
</script>
```

---

## Quick Start

```ts
import { chromalog } from '@hunab/chromalog';

chromalog.success('User registered successfully!');
chromalog.info('Fetching data from the API...');
chromalog.warning('The session token will expire soon.');
chromalog.error('Error connecting to the server.');
```

---

## Customize Styles

```ts
chromalog.config({
  styles: {
    success: 'color:white;background:forestgreen;padding:2px 8px;border-radius:4px;',
    info: 'color:white;background:dodgerblue;padding:2px 8px;border-radius:4px;',
    warning: 'color:black;background:orange;padding:2px 8px;border-radius:4px;',
    error: 'color:white;background:crimson;padding:2px 8px;border-radius:4px;'
  }
});

chromalog.success('Custom style applied!');
```

---

## Disable / Enable (Production Toggle)

Silence logs globally (e.g., on production):

```ts
chromalog.config({ enabled: false }); // disable all styled logs
// later...
chromalog.config({ enabled: true }); // re-enable
```

You can wire this to your build env:

```ts
chromalog.config({ enabled: import.meta.env.DEV });
```

---

## URL-Driven Config (for demos)

Tweak styles **without changing code** during demos:

- `?styled=0` → disables styles.
- `?success=color:purple;font-weight:bold;` → overrides the `success` badge CSS.

Demo handler (already used in the demo app):

```ts
const params = new URLSearchParams(location.search);
if (params.get('styled') === '0') chromalog.config({ styled: false });
const successStyle = params.get('success');
if (successStyle) chromalog.config({ styles: { success: successStyle } });
```

Optional quick links for your demo page:

```html
<p>
  Try:
  <a href="?styled=0">?styled=0</a> |
  <a href="?success=color:purple;font-weight:bold;">?success=purple+bold</a>
</p>
```

---

## API

```ts
type Level = 'success' | 'error' | 'warning' | 'info';
type StyleMap = Record<Level, string>;

interface Config {
  styled: boolean;
  enabled: boolean;
  styles: StyleMap;
}

type ConfigUpdate = {
  styled?: boolean;
  enabled?: boolean;
  styles?: Partial<StyleMap>;
};

// Update config (styles supports partial updates)
chromalog.config(options: ConfigUpdate);
chromalog.enable();  // enable styled logs
chromalog.disable(); // disable styled logs

// Methods
chromalog.success(...args: any[]): void;
chromalog.info(...args: any[]): void;
chromalog.warning(...args: any[]): void;
chromalog.error(...args: any[]): void;
chromalog.log(...args: any[]): void; // raw console.log passthrough
```

---

## Screenshot

<p align="center">
  <img src="docs/screenshot.png" alt="chromalog console screenshot with colored badges for success, info, warning, and error" width="900" />
</p>

---

## Browser Support

chromalog uses the `%c` console formatter, supported by all modern browsers (Chrome, Edge, Firefox, Safari). If a browser doesn’t support `%c`, it will fall back to plain text.

---

## Contributing

- Fork → create branch → PR (add tests/examples when relevant).
- Follow **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`…).
- Run `npm run build` before opening the PR.

---

## Roadmap
- Namespaces and filters (e.g. `auth:*`, `cart:*`).
- Optional Node/React Native ANSI fallback.
- Grouped logs and lightweight timers.
- Theme presets (ocean / sunset / mono).

---

## License

MIT © 2025 Hunab Labs
