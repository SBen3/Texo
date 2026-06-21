import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const images = [
  "/placeholder/1.png",
  "/placeholder/2.png",
  "/placeholder/3.png",
  "/placeholder/4.png",
];
export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageUrl = images[randomIndex];
    const board = await ctx.db.insert("boards", {
      orgId: args.orgId,
      title: args.title,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: imageUrl,
    });
    return board;
  },
});

export const addFavorite = mutation({
  args: {
    boardId: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db.get(args.boardId);
    if (!board) throw new Error("Board not found");

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id),
      )
      .unique();

    if (existingFavorite) throw new Error("Board already favorited");

    await ctx.db.insert("userFavorites", {
      userId, 
      boardId: board._id,
      orgId: args.orgId,
    });
  },
});

export const removeFavorite = mutation({
  args: {
    boardId: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db.get(args.boardId);
    if (!board) throw new Error("Board not found");

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id),
      )
      .unique();

    if (!existingFavorite) throw new Error("Favorite not found");

    await ctx.db.delete(existingFavorite._id);
  },
});

export const get = query({
  args: {
    boardId: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.boardId);
    if (!board) throw new Error("Board not found");
    return board;
  },
});