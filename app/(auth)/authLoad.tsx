import Image from "next/image";

export default function AuthLoad() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Image src="/icon.svg" alt="Texo" width={50} height={50} className="animate-pulse" />
    </div>
  );
}
