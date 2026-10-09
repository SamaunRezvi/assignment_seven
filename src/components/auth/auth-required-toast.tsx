"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

const TOAST_ID = "auth-required";

/** Explains why the visitor landed on the sign in page after a protected redirect. */
export function AuthRequiredToast() {
  useEffect(() => {
    toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।", { id: TOAST_ID });
  }, []);

  return null;
}
