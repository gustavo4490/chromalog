type Level = 'success' | 'error' | 'warning' | 'info' | 'debug';

interface StyleMap { [K in Level]?: string }      // Browser (CSS)
type NodeStyle = [open: string, close: string];    // Node (ANSI)
type NodeStyleMap = { [K in Level]?: NodeStyle };

interface Config {
    styled: boolean;
    namespace?: string;
    transport?: 'auto' | 'browser' | 'node' | 'react-native';
    styles: StyleMap;       // CSS (browser)
    nodeStyles: NodeStyleMap; // ANSI (node/RN)
    enabled?: boolean;
}

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const isReactNative = typeof navigator !== 'undefined' && (navigator as any).product === 'ReactNative';
const isNode = typeof process !== 'undefined' && !!process.versions?.node;

const ansi = (n: number) => `\u001b[${n}m`;
const RESET = ansi(0), BOLD = ansi(1);

const defaultConfig: Config = {
    styled: true,
    enabled: true,
    transport: 'auto',
    styles: {
        success: 'color: limegreen; font-weight: bold;',
        error: 'color: crimson; font-weight: bold;',
        warning: 'color: orange; font-weight: bold;',
        info: 'color: dodgerblue; font-weight: bold;',
        debug: 'color: gray;'
    },
    nodeStyles: {
        success: [`${BOLD}${ansi(32)}`, RESET],
        error: [`${BOLD}${ansi(31)}`, RESET],
        warning: [`${BOLD}${ansi(33)}`, RESET],
        info: [`${BOLD}${ansi(34)}`, RESET],
        debug: [ansi(90), RESET]
    }
};

let cfg: Config = { ...defaultConfig };

function transport() {
    if (cfg.transport && cfg.transport !== 'auto') return cfg.transport;
    if (isBrowser) return 'browser';
    if (isReactNative) return 'react-native';
    if (isNode) return 'node';
    return 'browser';
}

function consoleFn(level: Level) {
    if (level === 'error') return console.error;
    if (level === 'warning') return console.warn;
    if (level === 'info') return console.info;
    return console.log;
}

function print(level: Level, ...args: any[]) {
    if (!cfg.enabled) return;
    const ns = cfg.namespace ? `[${cfg.namespace}] ` : '';
    const tag = `[${level.toUpperCase()}]`;
    const t = transport();

    if (!cfg.styled) {
        consoleFn(level)(`${ns}${tag}`, ...args);
        return;
    }

    if (t === 'browser') {
        const sNS = 'font-weight:600;color:#111827;';
        const sLV = cfg.styles[level] || '';
        consoleFn(level)(`%c${ns}%c${tag}`, sNS, sLV, ...args);
    } else {
        const [open, close] = cfg.nodeStyles[level] || ['', ''];
        consoleFn(level)(`${open}${ns}${tag}${close}`, ...args);
    }
}

// API pública
export const ChromaLog = {
    config(options: Partial<Config>) {
        cfg = {
            ...cfg,
            ...options,
            styles: { ...cfg.styles, ...(options.styles || {}) },
            nodeStyles: { ...cfg.nodeStyles, ...(options.nodeStyles || {}) }
        };
    },
    enable() { cfg.enabled = true; },
    disable() { cfg.enabled = false; },
    namespace(ns: string) {
        const child = Object.create(this);
        child.config({ namespace: ns });
        return child as typeof ChromaLog;
    },
    group(title: string) {
        if (transport() === 'browser' && console.group) console.group(title);
        else console.log(`--- ${title} ---`);
        return { end: () => console.groupEnd?.() };
    },
    timer(name = 'timer') {
        const start = Date.now();
        return { end: () => this.debug(`${name}: ${Date.now() - start}ms`) };
    },
    success: (...a: any[]) => print('success', ...a),
    error: (...a: any[]) => print('error', ...a),
    warning: (...a: any[]) => print('warning', ...a),
    info: (...a: any[]) => print('info', ...a),
    debug: (...a: any[]) => print('debug', ...a),
    log: (...a: any[]) => console.log(...a)
};