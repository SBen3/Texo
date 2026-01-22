 import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
      authorId: identity.subject ,
      authorName: identity.name!,
      imageUrl: imageUrl,
    });
    return board;
  },
});
 