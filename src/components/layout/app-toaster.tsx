"use client";

import { Toaster } from "react-hot-toast";

export function AppToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: { fontFamily: "inherit", maxWidth: "26rem" },
        success: { iconTheme: { primary: "#2f8f5b", secondary: "#fff" } },
        error: { iconTheme: { primary: "#d93f3f", secondary: "#fff" } },
      }}
    />
  );
}
