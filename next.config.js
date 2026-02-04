const withAntdLess = require('next-plugin-antd-less')

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = () => {
  const env = {
    NEXT_APP_ENV: process.env.NEXT_APP_ENV,
  }
  const config = {
    output: 'standalone',
    reactStrictMode: true,
    transpilePackages: ['antd'],
    poweredByHeader: false,
    productionBrowserSourceMaps: true,
    env,
    publicRuntimeConfig: env,
    compiler: {
      // Remove `console.*` output except `console.error`
      removeConsole: isProd ?
        {
          exclude: ['error'],
        } :
        false,
      // Uncomment this to suppress all logs.
      // removeConsole: true,
    },
    lessLoaderOptions: {
      // cssModules: true,
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: {},
      },
    },
    serverComponentsExternalPackages: ["@prisma/client"],
    webpack(config) {
      config.module.rules.forEach((rule) => {
        const { oneOf } = rule
        if (oneOf) {
          oneOf.forEach((one) => {
            if (!`${one.issuer?.and}`.includes('_app')) return
            one.issuer.and = [path.resolve(__dirname)]
          })
        }
      })
      return config
    },
  }
  return config
}

module.exports = withAntdLess(nextConfig())