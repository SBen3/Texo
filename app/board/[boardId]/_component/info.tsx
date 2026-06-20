"use client";

export const Info = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-4 py-2 shadow-md">
      <p className="text-sm font-medium">TODO: Information about the board</p>
    </div>
  );
};

Info.Skeleton = () => {
  return (
    <div className="w-[300px] h-10 absolute top-2 left-2 bg-gray-200 rounded-md px-4 py-2 shadow-md animate-pulse"></div>
  );
};
