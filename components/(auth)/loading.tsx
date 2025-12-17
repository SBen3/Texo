import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image src="/green.svg" alt="Loading" width={50} height={50} className="animate-pulse" />
    </div>
  );
};

export default Loading;

