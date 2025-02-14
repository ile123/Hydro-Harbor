"use client";

import { useAppContext } from "@/context/app-context";

export default function Greeting() {
  const { globalState } = useAppContext();

  return (
    <>
      {globalState.user ? (
        <h1>Hello, {globalState.user.fullName}</h1>
      ) : (
        <h1>Welcome to the Hydro Harbor store.</h1>
      )}
    </>
  );
}
