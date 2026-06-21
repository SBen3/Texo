"use client"
import { Info } from "./info"
import { Participant } from "./participant"
import { Toolbar } from "./toolbar"
import { useSelf } from "@/liveblocks.config"

 interface CanvasProps {
    boardId: string;
  }

export const Canvas = ({ boardId }: CanvasProps) => {
    const info = useSelf(me=>me.info)
    return (
        <div>
            <Info />
            <Participant />
            <Toolbar /> 
        </div>
    )
}   
