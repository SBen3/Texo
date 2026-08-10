
"use client";

import SearchUi from "./searchUi";
import FavUi from "./favUi";
import BoardUi from "./boardUi";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import BoardCard from "./side-bar/Boards/boardCard";
import CreateBoard from "./newBoardButton";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const boards = useQuery(api.boards.getBoards, { orgId, ...query });

  if (boards === undefined) {
    return (
      <div className="m-3">
        <h1 className="mb-4 text-4xl font-black uppercase tracking-tighter text-black">
          {query.favorites ? "Favorites Team" : "Boards Team"}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <CreateBoard orgId={orgId} disabled />
          <BoardCard.skeleton />
          <BoardCard.skeleton />
          <BoardCard.skeleton />
        </div>
      </div>
    );
  }

  if (!boards.length && query.search) {
    return (
      <div>
        <SearchUi />
      </div>
    );
  }

  if (!boards.length && query.favorites) {
    return (
      <div>
        <FavUi />
      </div>
    );
  }

  if (!boards.length) {
    return (
      <div>
        <BoardUi />
      </div>
    );
  }

  return (
    <div className="m-3">
      <h1 className="mb-4 text-4xl font-black uppercase tracking-tighter text-black">
        {query.favorites ? "Favorites Team" : "Boards Team"}
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <CreateBoard orgId={orgId} disabled={false} />
        {boards.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;