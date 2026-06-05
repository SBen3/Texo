"use client";

import { ReactNode } from "react";
import { ClerkProvider, SignInButton, useAuth } from "@clerk/nextjs";
import {
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading } from "convex/react";
import Loading from "@/app/(auth)/loading";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
            <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#74c476]/20 blur-3xl" />
            <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <button
              className="
          relative z-10
          px-10 py-4
          rounded-full
          border border-[#74c476]/40
          bg-white
          text-black
          text-lg font-semibold
          shadow-[0_0_30px_rgba(116,196,118,0.25)]
          transition-all duration-300
          hover:scale-105
          hover:bg-[#74c476]
          hover:text-white
          hover:shadow-[0_0_40px_rgba(116,196,118,0.5)]
          active:scale-95
        "
            >
              <SignInButton />
            </button>
          </div>
        </Unauthenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
