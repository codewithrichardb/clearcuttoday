/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google user content
      'avatars.githubusercontent.com', // GitHub avatars
      'platform-lookaside.fbsbx.com', // Facebook avatars
      's.gravatar.com', // Gravatar
      'firebasestorage.googleapis.com' // Firebase Storage
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
