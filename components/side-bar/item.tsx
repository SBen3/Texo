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
    <>
      <div>
        <Hint
          label={item}
          side="right"
          align="center"
          sideOffset={5}
          alignOffset={0}
        >
          <Image
            src={image}
            alt={item}
            onClick={() => {
              onclick();
            }}
            width={30}
            height={30}
            className={cn(
              "rounded-md m-1 opacity-50",
              isActive && "opacity-100"
            )}
          />
        </Hint>
      </div>
    </>
  );
};

export default Item;
