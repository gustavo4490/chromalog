interface StyleMap {
    [key: string]: string;
}

interface Config {
    styled: boolean;
    styles: StyleMap;
}

// Default configuration
const defaultConfig: Config = {
    styled: true,
    styles: {
        success: 'color: limegreen; font-weight: bold;',
        error: 'color: crimson; font-weight: bold;',
        warning: 'color: orange; font-weight: bold;',
        info: 'color: dodgerblue; font-weight: bold;',
    },
};

let currentConfig = { ...defaultConfig };

// Function to get the styles
const getStyles = (category: string) => {
    return currentConfig.styled ? currentConfig.styles[category] : '';
};

// The main logger function
const log = (category: string, ...args: any[]) => {
    const styles = getStyles(category);
    if (styles) {
        console.log(`%c[${category.toUpperCase()}]`, styles, ...args);
    } else {
        console.log(`[${category.toUpperCase()}]`, ...args);
    }
};

// The library's public API
export const ChromaLog = {
    // Method to configure styles
    config: (options: Partial<Config>) => {
        currentConfig = {
            ...currentConfig,
            ...options,
            styles: {
                ...currentConfig.styles,
                ...options.styles,
            },
        };
    },

    // Logging methods by category
    success: (...args: any[]) => log('success', ...args),
    error: (...args: any[]) => log('error', ...args),
    warning: (...args: any[]) => log('warning', ...args),
    info: (...args: any[]) => log('info', ...args),
    log: (...args: any[]) => console.log(...args), // Generic log without a category
};