const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
   allowedDevOrigins: ['192.168.1.8'],
};

export default nextConfig; 
