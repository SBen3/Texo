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
import LandingPage from "@/components/landing/landing-page";
import AuthLoad from "@/app/(auth)/authLoad";

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
          <AuthLoad />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
