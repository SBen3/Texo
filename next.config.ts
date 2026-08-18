const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
   allowedDevOrigins: ['192.168.1.6'],
};

export default nextConfig; 
