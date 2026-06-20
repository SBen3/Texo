"use client";

export const Toolbar = () => {
  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
      {/* Drawing tools */}
      <div className="bg-white rounded-md shadow-md p-1 flex flex-col">
        <div>Pencil</div>
        <div>Square</div>
        <div>Circle</div>
        <div>Ellipsis</div>
      </div>

      {/* Undo / Redo */}
      <div className="bg-white rounded-md shadow-md p-1 flex flex-col">
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  );
};

Toolbar.Skeleton = () => {
  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
      <div className="flex flex-col gap-1 ">
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      < div className="flex flex-col gap-1 ">
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};
