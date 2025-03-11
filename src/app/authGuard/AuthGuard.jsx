"use client";
import { redirect } from "next/navigation";
import { getLocalStorageItem } from "../utils/localStorageUtils/getLocalStorageItem";
import { useLayoutEffect } from "react";

export default function AuthGuard({ children }) {
  const isUserLoggedIn = getLocalStorageItem("isUserLoggedIn");

  useLayoutEffect(() => {
    if (!isUserLoggedIn) {
      redirect("/login");
    }
  }, []);

  return <>{children}</>;
}
