import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Hint from "../hint";

interface ItemProps {
  id: string;
  image: string;
  item: string;
}

const Item = ({ id, image, item }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActive = organization?.id === id;

  const onclick = () => {
    if (!setActive) return null;
    setActive({ organization: id });
  };

  return (
    <div>
      <Hint label={item} side="right" align="center" sideOffset={5} alignOffset={0}>
        <button
          onClick={onclick}
          className={cn(
            "relative m-1 block overflow-hidden rounded-none border-2 border-black transition-all duration-200",
            isActive
              ? "shadow-[3px_3px_0px_0px_#F0C020] grayscale-0"
              : "shadow-none grayscale hover:-translate-y-1 hover:grayscale-0"
          )}
        >
          <Image src={image} alt={item} width={32} height={32} className="block" />
          {isActive && (
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-black bg-[#D02020]" />
          )}
        </button>
      </Hint>
    </div>
  );
};

export default Item;