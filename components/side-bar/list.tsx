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
    <>
      <ul>
        {userMemberships.data?.map((membership) => (
          <Item
            id={membership.organization.id}
            item={membership.organization.name}
            image={membership.organization.imageUrl}
          />
        ))}
      </ul>
    </>
  );
};

export default ListOfOrganizations;
