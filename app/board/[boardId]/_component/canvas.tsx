"use client"
import { Info } from "./info"
import { Participant } from "./participant"
import { Toolbar } from "./toolbar"

 interface CanvasProps {
    boardId: string;
  }

export const Canvas = ({ boardId }: CanvasProps) => {
    return (
        <div>
            <Info />
            <Participant />
            <Toolbar /> 
        </div>
    )
}   
