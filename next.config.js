/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        domains: ['sandbox.env.eflorista.com.br']
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
