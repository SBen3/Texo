import { ClientSideSuspense } from "@liveblocks/react"
import { RoomProvider } from "../liveblocks.config"

interface RoomProps {
    roomId: string;
    children: React.ReactNode;
    fallback: React.ReactNode; 
}
export const Room = ({roomId , children, fallback} : RoomProps) => {
    return (
        <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
            <ClientSideSuspense fallback={fallback}>
            {()=> children}
            </ClientSideSuspense>
        </RoomProvider>
    )
}