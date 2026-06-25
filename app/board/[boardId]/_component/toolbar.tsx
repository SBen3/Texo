"use client";
import { ToolButton } from "./tool-button";
import {
  Circle,
  MousePointer,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";

export const Toolbar = () => {
  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
      {/* Drawing tools */}
      <div className="bg-white rounded-md shadow-md p-1 flex flex-col">
        <ToolButton
          label="MousePointer"
          icon={MousePointer}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="Type"
          icon={Type}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="Pencil"
          icon={Pencil}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="Square"
          icon={Square}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="Circle"
          icon={Circle}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="StickyNote"
          icon={StickyNote}
          isActive={false}
          onClick={() => {}}
        />
      </div>

      {/* Undo / Redo */}
      <div className="bg-white rounded-md shadow-md p-1 flex flex-col">
        <ToolButton
          label="Undo"
          icon={Undo2}
          isActive={false}
          onClick={() => {}}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          isActive={false}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
      <div className="flex flex-col gap-1 ">
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-1 ">
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-[100px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};
