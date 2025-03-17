// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  images: {
    domains: ['i.ibb.co'],
  },
 
env: {
  BASE_URL: process.env.BASE_URL,
  IMGBB_URL: process.env.ORGADO_IMGBB_KEY,
}
};


