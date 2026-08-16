const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
   allowedDevOrigins: ['192.168.1.9'],
};

export default nextConfig; 
