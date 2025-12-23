import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div className="w-full p-2 bg-purple-700 flex justify-between ">
        <input type="text" placeholder="write here ..."  className="bg-white text-black w-[60%] "/>
        <UserButton />
    </div>
  );
};

export default NavBar;