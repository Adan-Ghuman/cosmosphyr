"use client";

import {
  IGNITION_DONE_EVENT,
  getIgnitionSeen,
} from "@/features/ignition/useIgnitionGate";
import { useLayoutEffect, useState } from "react";

export function useIgnitionAbsent(): boolean {
  const [absent, setAbsent] = useState(false);

  useLayoutEffect(() => {
    if (getIgnitionSeen()) {
      setAbsent(true);
      return;
    }

    const markDone = () => setAbsent(true);
    window.addEventListener(IGNITION_DONE_EVENT, markDone);

    const poll = window.setInterval(() => {
      if (getIgnitionSeen()) {
        markDone();
        window.clearInterval(poll);
      }
    }, 150);

    return () => {
      window.removeEventListener(IGNITION_DONE_EVENT, markDone);
      window.clearInterval(poll);
    };
  }, []);

  return absent;
}
