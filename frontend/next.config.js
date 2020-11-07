const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    images: {
        deviceSizes: [640, 768, 1024, 1280],
        iconSizes: [],
        domains: [],
        path: '/_next/image',
        loader: 'default',
    },
})


