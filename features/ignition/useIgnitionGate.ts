const IGNITION_SEEN_KEY = "cosmosphyr:ignition-seen";

export const IGNITION_DONE_EVENT = "cosmosphyr:ignition-done";

function readStore(store: Storage): boolean {
  return store.getItem(IGNITION_SEEN_KEY) === "1";
}

function writeStore(store: Storage): void {
  store.setItem(IGNITION_SEEN_KEY, "1");
}

function notifyIgnitionDone(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(IGNITION_DONE_EVENT));
}

export function getIgnitionSeen(): boolean {
  if (typeof window === "undefined") return false;

  try {
    if (readStore(window.localStorage)) return true;
  } catch {
    // ignore
  }

  try {
    if (readStore(window.sessionStorage)) return true;
  } catch {
    // ignore
  }

  return false;
}

export function setIgnitionSeen(): void {
  if (typeof window === "undefined") return;

  try {
    writeStore(window.localStorage);
    notifyIgnitionDone();
    return;
  } catch {
    // fall through to sessionStorage
  }

  try {
    writeStore(window.sessionStorage);
    notifyIgnitionDone();
  } catch {
    notifyIgnitionDone();
  }
}
