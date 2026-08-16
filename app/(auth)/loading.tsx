import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image src="/icon.png" alt="Loading" width={50} height={50} className="animate-bounce" />
    </div>
  );
};

export default Loading;

