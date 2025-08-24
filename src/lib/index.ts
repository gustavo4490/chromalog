type Level = 'success' | 'error' | 'warning' | 'info';

interface StyleMap { [K in Level]?: string; }

interface Config {
    styled: boolean;
    enabled: boolean;
    styles: StyleMap;          // CSS (browser)
}

// pick theme based on system color scheme
const prefersDark = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-color-scheme: dark)').matches;

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

const ICON: Record<Level, string> = {
    success: '✅', info: 'ℹ️', warning: '⚠️', error: '🛑'
};

const METHOD: Record<Level, (...a: any[]) => void> = {
    success: console.log,
    info: console.info,
    warning: console.warn,
    error: console.error
};

const getStyles = (level: Level) =>
    currentConfig.styled ? currentConfig.styles[level] || '' : '';

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

export const ChromaLog = {
    // global configuration
    config(options: Partial<Config>) {
        currentConfig = {
            ...currentConfig,
            ...options,
            styles: { ...currentConfig.styles, ...(options.styles || {}) }
        };
    },

    // quick toggles
    enable() { currentConfig.enabled = true; },
    disable() { currentConfig.enabled = false; },

    // logging methods
    success: (...args: any[]) => print('success', ...args),
    error: (...args: any[]) => print('error', ...args),
    warning: (...args: any[]) => print('warning', ...args),
    info: (...args: any[]) => print('info', ...args),

    // raw console.log passthrough
    log: (...args: any[]) => console.log(...args)
};

export type { Config, StyleMap, Level };
