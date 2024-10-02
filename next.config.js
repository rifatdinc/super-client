/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  trailingSlash: true,
  distDir: 'build',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/.' : undefined,
  images: {
    unoptimized: true, 
  },
  
	webpack: (config, { dev }) => {
    const fileLoaderRule = config.module.rules.find(rule => 
      rule.test?.test?.('.svg')
    );
    if (dev) {
      config.devtool = 'source-map';
    }
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
