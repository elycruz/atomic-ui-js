import nextMdx from '@next/mdx';
import path from 'node:path';
import url from 'url';
import CopyPlugin from 'copy-webpack-plugin';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: '../../dist/atomic-ui-js-site',
  basePath: '/atomic-ui-js',
  trailingSlash: true,
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'src/css'),
      path.join(__dirname, '../../packages')
    ],
  },
  webpack: (
    config,
    {buildId, dev, isServer, defaultLoaders, nextRuntime, webpack}
  ) => {
    const copyPlugin = new CopyPlugin({
      patterns: [
        '**/*.md'
      ],
    });

    if (config.devServer)
      config.devServer.writeToDisk = true;
    else
      config.devServer = {writeToDisk: true};

    if (config.plugins)
      config.plugins.push(copyPlugin);
    else
      config.plugins = [copyPlugin];

    // Important: return the modified config
    return config;
  }
}

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
