// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
export type Level = 'success' | 'error' | 'warning' | 'info';
export type StyleMap = Record<Level, string>;

export interface Config {
  /** Use CSS-styled console output (`%c`). */
  styled: boolean;
  /** Master switch to enable/disable all styled logs. */
  enabled: boolean;
  /** CSS styles per level (browser). */
  styles: StyleMap;
}

/** Allows partial style updates when calling `config()` */
export type ConfigUpdate = {
  styled?: boolean;
  enabled?: boolean;
  styles?: Partial<StyleMap>;
};

// ─────────────────────────────────────────────────────────────────────────────
// Defaults (auto light/dark)
// ─────────────────────────────────────────────────────────────────────────────
const prefersDark =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const light: StyleMap = {
  success: 'color: limegreen; font-weight: bold;',
  error: 'color: crimson; font-weight: bold;',
  warning: 'color: orange; font-weight: bold;',
  info: 'color: dodgerblue; font-weight: bold;'
};

const dark: StyleMap = {
  success: 'color: #22c55e; font-weight: 700;',
  error: 'color: #f87171; font-weight: 700;',
  warning: 'color: #f59e0b; font-weight: 700;',
  info: 'color: #60a5fa; font-weight: 700;'
};

const defaultConfig: Config = {
  styled: true,
  enabled: true,
  styles: prefersDark ? dark : light
};

let currentConfig: Config = { ...defaultConfig };

// ─────────────────────────────────────────────────────────────────────────────
// Internals
// ─────────────────────────────────────────────────────────────────────────────
const ICON: Record<Level, string> = {
  success: '✅',
  info: 'ℹ️',
  warning: '⚠️',
  error: '🛑'
};

const METHOD: Record<Level, (...a: any[]) => void> = {
  success: console.log,
  info: console.info,
  warning: console.warn,
  error: console.error
};

const getStyles = (level: Level): string =>
  currentConfig.styled ? currentConfig.styles[level] : '';

const print = (level: Level, ...args: any[]) => {
  if (!currentConfig.enabled) return;
  const method = METHOD[level] || console.log;
  const icon = ICON[level];
  const style = getStyles(level);

  if (style) {
    method(`%c${icon} [${level.toUpperCase()}]`, style, ...args);
  } else {
    method(`${icon} [${level.toUpperCase()}]`, ...args);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
/**
 * Public API
 */
// ─────────────────────────────────────────────────────────────────────────────
export const ChromaLog = {
  /**
   * Update global configuration. `styles` accepts partial updates.
   */
  config(options: ConfigUpdate) {
    const { styles, ...rest } = options;
    const nextStyles: StyleMap = {
      ...currentConfig.styles,
      ...(styles ?? {})
    };

    currentConfig = {
      ...currentConfig,
      ...rest,
      styles: nextStyles
    };
  },

  /** Enable styled logs. */
  enable() {
    currentConfig.enabled = true;
  },

  /** Disable styled logs (silences formatted output). */
  disable() {
    currentConfig.enabled = false;
  },

  // Level methods
  success: (...args: any[]) => print('success', ...args),
  error: (...args: any[]) => print('error', ...args),
  warning: (...args: any[]) => print('warning', ...args),
  info: (...args: any[]) => print('info', ...args),

  // Raw passthrough (no level badge)
  log: (...args: any[]) => console.log(...args)
};
