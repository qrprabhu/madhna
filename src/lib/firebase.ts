import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from "firebase/auth";

function createFirebaseApp(): FirebaseApp {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const appId = import.meta.env.VITE_FIREBASE_APP_ID;

  if (!apiKey || !authDomain || !projectId || !appId) {
    throw new Error(
      "Missing Firebase environment variable(s). Set VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, and VITE_FIREBASE_APP_ID in your environment.",
    );
  }

  return initializeApp({ apiKey, authDomain, projectId, appId });
}

let _app: FirebaseApp | undefined;

export function getFirebaseAuth() {
  if (!_app) _app = createFirebaseApp();
  return getAuth(_app);
}

/** Normalizes a user-entered phone number to E.164, defaulting to the +91 (India) country code. */
export function toE164(rawPhone: string) {
  const digits = rawPhone.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? digits : `+91${digits}`;
}

export { RecaptchaVerifier, signInWithPhoneNumber };
export type { ConfirmationResult };
