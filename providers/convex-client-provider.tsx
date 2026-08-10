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
import LandingPage from "@/components/landing/landing-page";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <LandingPage />
        </Unauthenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
