/** @type {import('next').NextConfig} */
module.exports = {
  webpack5: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // https://github.com/project-serum/anchor/issues/244#issuecomment-918334381
      config.resolve.fallback.fs = false
    }
    return config
  },
}
