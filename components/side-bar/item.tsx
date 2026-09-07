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
      <Hint label={item} side="right" align="center" sideOffset={10} alignOffset={0}>
        <button
          onClick={onclick}
          className={cn(
            "relative block overflow-hidden rounded-full transition-all duration-200",
            isActive
              ? "ring-2 ring-lime-400 ring-offset-0 ring-offset-midnight"
              : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
          )}
        >
          <Image src={image} alt={item} width={36} height={36} className="block" />
        </button>
      </Hint>
    </div>
  );
};

export default Item;
