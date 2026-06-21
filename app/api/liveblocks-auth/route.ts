import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  const user = await currentUser();
  const authorization = await auth();
  if (!user || !authorization) {
    return new Response("unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const board = await convex.query(api.board.get, { boardId: room });
  if(board.orgId !== authorization.orgId) {
     return new Response("unauthorized" , {status:403});
  }

  const userInfo = {
    name: user.firstName ?? "",
    picture: user.imageUrl,
  };
  const session = liveblocks.prepareSession(user.id, { userInfo });
  if(room) {
    session.allow(room,["*:write"])
  }

  const {body , status} = await session.authorize()

  return new Response(body, { status });
}
