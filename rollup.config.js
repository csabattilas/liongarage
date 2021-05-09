import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';

// Static assets will vary depending on the application
const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: 'apollo-server/public/node_modules' },
    { src: 'src/assets', dest: 'apollo-server/public/src'},
    { src: 'index-prod.html', dest: 'apollo-server/public', rename: (name, extension, _) => `${name.replace('-prod','')}.${extension}` },
  ],
};

// The main JavaScript bundle for modern browsers that support
// JavaScript modules and other ES2015+ features.
const config = {
  input: 'out-tsc/src/lion-garage.js',
  output: {
    dir: 'apollo-server/public/src/components',
    format: 'es',
  },
  plugins: [
    minifyHTML(),
    copy(copyConfig),
    resolve(),
  ],
  preserveEntrySignatures: false,
};

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(terser());
}

export default config;
