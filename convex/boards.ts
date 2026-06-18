import { query } from "./_generated/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const getBoards = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // If the favorites query parameter is present, fetch only the user's favorite boards for the given orgId
    if (args.favorites) {
      const favoriteRecords = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId),
        )
        .order("desc")
        .collect();

      const ids = favoriteRecords.map((f) => f.boardId);
      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board) => ({
        ...board,
        isFavorite: true,
      }));
    }
    // If the search query parameter is present, perform a search on the boards' titles for the given orgId
      if (args.search) {
      const boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", args.search!).eq("orgId", args.orgId)
        )
        .collect();

      const boardWithFavStatus = boards.map((board) =>
        ctx.db
          .query("userFavorites")
          .withIndex("by_user_board", (q) =>
            q.eq("userId", identity.subject).eq("boardId", board._id)
          )
          .unique()
          .then((favorite) => ({ ...board, isFavorite: !!favorite }))
      );

      return Promise.all(boardWithFavStatus);
    }

    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

    const boardWithFavStatus = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id),
        )
        .unique()
        .then((favorite) => ({
          ...board,
          isFavorite: !!favorite,
        }));
    });
    return Promise.all(boardWithFavStatus);
  },
});
export const remove = mutation({
  args: { id: v.id("boards") },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    await ctx.db.delete(args.id);

    const existingFavorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", identity.subject).eq("boardId", args.id),
      )
      .unique();

    if (existingFavorites) await ctx.db.delete(existingFavorites._id);
  },
});
export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const title = args.title.trim();
    if (!title) throw new Error("Title cannot be empty");
    if (title.length > 60) throw new Error("Title too long");

    const boards = await ctx.db.patch(args.id, { title });

    const updatedBoard = await ctx.db.get(args.id);

    return boards;
  },
});
