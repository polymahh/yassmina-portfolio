/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "images.ctfassets.net",
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/projects",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
