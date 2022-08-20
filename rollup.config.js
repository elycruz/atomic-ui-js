import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import rollupSass from 'rollup-plugin-sass';
import {terser as rollupTerser} from 'rollup-plugin-terser';
import rollupTypescript from "@rollup/plugin-typescript";
import rollupFilesize from "rollup-plugin-filesize";
import typescript from 'typescript';
import tslib from 'tslib';
import cssnano from 'cssnano';
import postcss from 'postcss';

const {log} = console,

  isDev = process.argv.includes('--dev');

export default {
  input: './src/index.ts',
  output: [{
    dir: './dist',
    format: 'es',
    entryFileNames: '[name].esm.js'
  }, {
    dir: './dist',
    format: 'cjs',
    entryFileNames: '[name].cjs.js'
  }],
  external: [
    'fjl',
    'lit',
    'lit-element',
    'lit-html',
    'bootstrap'
  ],
  plugins: [
    nodeResolve(),
    rollupSass({
      outputStyle: 'compressed',
      processor: css => postcss([
        cssnano
      ])
        .process(css)
        .then(result => result.css)
    }),
    rollupTypescript({
      tsconfig: path.resolve(`./tsconfig.lib.json`),
      tslib,
      typescript
    }),
    rollupTerser({
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    rollupFilesize({
      showBrotliSize: true,
    }),
  ]
};
