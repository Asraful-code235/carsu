"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/action";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Check if we're in the browser environment before accessing window
  if (typeof window !== 'undefined' && (window !== window.parent || !!window.opener)) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div>
      {pending ? (
        "Disabling draft mode..."
      ) : (
        <button type="button" onClick={disable}>
          Disable draft mode
        </button>
      )}
    </div>
  );
}