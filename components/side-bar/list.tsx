"use client";

import { useOrganizationList } from "@clerk/nextjs";
import Item from "./item";

const ListOfOrganizations = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships) {
    return null;
  }

  return (
    <ul className="flex flex-col items-center gap-1">
      {userMemberships.data?.map((membership) => (
        <Item
          key={membership.organization.id}
          id={membership.organization.id}
          item={membership.organization.name}
          image={membership.organization.imageUrl}
        />
      ))}
    </ul>
  );
};

export default ListOfOrganizations;