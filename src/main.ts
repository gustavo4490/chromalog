import { chromalog } from './lib';

// Small helper to print section headers in the console
const section = (title: string) =>
  console.log('%c' + title, 'font-weight:700;font-size:14px;margin-top:12px;');

// 1) Default styles
section('1) Default styles');
chromalog.success('User registered successfully!');
chromalog.info('Fetching data from the API...');
chromalog.warning('The session token will expire soon.');
chromalog.error('Error connecting to the server.');

// 2) Custom styles (badge-like look)
section('2) Custom styles');
chromalog.config({
  styles: {
    success:
      'color:white;background:forestgreen;padding:2px 8px;border-radius:4px;',
    info: 'color:white;background:dodgerblue;padding:2px 8px;border-radius:4px;',
    warning: 'color:black;background:orange;padding:2px 8px;border-radius:4px;',
    error: 'color:white;background:crimson;padding:2px 8px;border-radius:4px;',
  },
});
chromalog.success('Custom style applied!');
chromalog.info('Styled info');
chromalog.warning('Styled warning');
chromalog.error('Styled error');

// 3) Toggle styles OFF and then back ON
section('3) Disable styles');
chromalog.config({ styled: false });
chromalog.info('Styles are OFF (plain output).');
chromalog.config({ styled: true }); // restore styled output

// 4) URL-driven config (try: ?styled=0 or ?success=color:purple;font-weight:bold;)
section('4) URL-driven config');
const params = new URLSearchParams(location.search);
if (params.get('styled') === '0') chromalog.config({ styled: false });
const successStyle = params.get('success');
if (successStyle) chromalog.config({ styles: { success: successStyle } });
chromalog.success(
  'URL config demo → try ?styled=0 or ?success=color:purple;font-weight:bold;'
);

// 5) Mini timer demo to showcase async timing
section('5) Mini timer demo');
const t0 = performance.now();
setTimeout(() => {
  const ms = Math.round(performance.now() - t0);
  chromalog.info(`Fake async finished in ${ms}ms`);
}, 400);
