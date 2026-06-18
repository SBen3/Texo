import { query } from "./_generated/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const getBoards = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const indentity = await ctx.auth.getUserIdentity();
    if (!indentity) throw new Error("Unauthorized");
    const boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

    const boardWithFavStatus = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", indentity.subject).eq("boardId", board._id),
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
    const indentity = await ctx.auth.getUserIdentity();
    if (!indentity) throw new Error("Unauthorized");
    await ctx.db.delete(args.id);
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
