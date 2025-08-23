import { ChromaLog } from './lib';

// Small helper to print section headers in the console
const section = (title: string) =>
  console.log('%c' + title, 'font-weight:700;font-size:14px;margin-top:12px;');

// 1) Default styles
section('1) Default styles');
ChromaLog.success('User registered successfully!');
ChromaLog.info('Fetching data from the API...');
ChromaLog.warning('The session token will expire soon.');
ChromaLog.error('Error connecting to the server.');

// 2) Custom styles (badge-like look)
section('2) Custom styles');
ChromaLog.config({
  styles: {
    success:
      'color:white;background:forestgreen;padding:2px 8px;border-radius:4px;',
    info: 'color:white;background:dodgerblue;padding:2px 8px;border-radius:4px;',
    warning: 'color:black;background:orange;padding:2px 8px;border-radius:4px;',
    error: 'color:white;background:crimson;padding:2px 8px;border-radius:4px;',
  },
});
ChromaLog.success('Custom style applied!');
ChromaLog.info('Styled info');
ChromaLog.warning('Styled warning');
ChromaLog.error('Styled error');

// 3) Toggle styles OFF and then back ON
section('3) Disable styles');
ChromaLog.config({ styled: false });
ChromaLog.info('Styles are OFF (plain output).');
ChromaLog.config({ styled: true }); // restore styled output

// 4) URL-driven config (try: ?styled=0 or ?success=color:purple;font-weight:bold;)
section('4) URL-driven config');
const params = new URLSearchParams(location.search);
if (params.get('styled') === '0') ChromaLog.config({ styled: false });
const successStyle = params.get('success');
if (successStyle) ChromaLog.config({ styles: { success: successStyle } });
ChromaLog.success(
  'URL config demo → try ?styled=0 or ?success=color:purple;font-weight:bold;'
);

// 5) Mini timer demo to showcase async timing
section('5) Mini timer demo');
const t0 = performance.now();
setTimeout(() => {
  const ms = Math.round(performance.now() - t0);
  ChromaLog.info(`Fake async finished in ${ms}ms`);
}, 400);
