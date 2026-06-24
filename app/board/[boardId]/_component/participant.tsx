"use client";

export const Participant = () => {
  return (
    <div className="absolute top-2 right-2 bg-white rounded-md px-4 py-2 shadow-md">
      <p className="text-sm font-medium">List of users</p>
    </div>
  );
};

export const ParticipantSkeleton = () => {
  return (
    <div className="w-[180px] h-10 absolute top-2 right-2 bg-gray-200 rounded-md px-4 py-2 shadow-md animate-pulse"></div>
  );
};