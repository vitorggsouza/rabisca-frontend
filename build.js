import * as esbuild from 'esbuild';

const isWatchMode = process.argv.includes('--watch');

const cssConfiguration = {
  entryPoints: {
    'main.min': './source/css/main.css',
    'home.min': './source/css/views/home.css'
  },
  bundle: true,
  sourcemap: isWatchMode,
  minify: !isWatchMode,
  outdir: './public/assets/css',
  loader: {
    '.woff': 'file',
    '.woff2': 'file'
  }
};

const javascriptConfiguration = {
  entryPoints: {
    'main.min': './source/javascript/main.js'
  },
  bundle: true,
  sourcemap: isWatchMode,
  minify: !isWatchMode,
  outdir: './public/assets/javascript'
};

const main = async () => {
  if (isWatchMode) {
    const cssContext = await esbuild.context(cssConfiguration);
    const javascriptContext = await esbuild.context(javascriptConfiguration);

    await Promise.all([cssContext.watch(), javascriptContext.watch()]);

    console.log('Watching for changes...');
  } else {
    await Promise.all([esbuild.build(cssConfiguration), esbuild.build(javascriptConfiguration)]);

    console.log('Build completed successfully.');
  }
};

try {
  await main();
} catch (error) {
  console.error('Build failed:', error);

  process.exit(1);
}