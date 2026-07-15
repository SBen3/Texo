"use client"
import { useSelf } from "@/liveblocks.config";
import { useMutation } from "@liveblocks/react";
import { LiveMap, LiveObject, LiveList } from "@liveblocks/client";

export const useDeleteLayers = () => {
  const selection = useSelf((me) => me.presence.selection);
  return useMutation(({storage, setMyPresence})=>{
    const liveLayers = storage.get("layers") as LiveMap<string, LiveObject<any>>;
    const liveLayersIds = storage.get("layerIds") as LiveList<string>;
    for(const id of selection){
        liveLayers.delete(id)
        const index = liveLayersIds.indexOf(id)
        liveLayersIds.delete(index)
    }
    setMyPresence({selection : []},{addToHistory : true})
  },[selection])
};

