"use client"
import { Info } from "./info"
import { Participant } from "./participant"
import { Toolbar } from "./toolbar"

 

export const Canvas = () => {
    return (
        <div>
            <Info />
            <Participant />
            <Toolbar /> 
        </div>
    )
}   
