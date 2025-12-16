"use client";
import { SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
  useQuery,
} from "convex/react";

export default function Home() {
  return (
    <>
      <Unauthenticated>
        <SignInButton></SignInButton>
      </Unauthenticated>

      <Authenticated>
        <SignOutButton></SignOutButton>
        <h1>hello</h1>
      </Authenticated>
    </>
  );
}
