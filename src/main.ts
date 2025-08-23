import { ChromaLog } from './lib';

// Test logs with default styles
ChromaLog.success('User registered successfully!');
ChromaLog.info('Fetching data from the API...');
ChromaLog.warning('The session token will expire soon.');
ChromaLog.error('Error connecting to the server.');

// Test customization
ChromaLog.config({
  styles: {
    success: 'color: white; background: forestgreen; padding: 2px 8px; border-radius: 4px;',
  },
  // You can also disable the styles
  // styled: false,
});

ChromaLog.success('Custom style applied!');