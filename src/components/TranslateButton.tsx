import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

function getIsTamil() {
  return document.cookie.includes("googtrans=/en/ta");
}

function setLanguage(tamil: boolean) {
  const host = window.location.hostname;
  if (tamil) {
    document.cookie = `googtrans=/en/ta; path=/`;
    document.cookie = `googtrans=/en/ta; path=/; domain=${host}`;
  } else {
    document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = `googtrans=; path=/; domain=${host}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
  window.location.reload();
}

export function GoogleTranslateLoader() {
  useEffect(() => {
    const id = "google-translate-script";
    if (document.getElementById(id)) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ta",
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    const script = document.createElement("script");
    script.id = id;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div id="google_translate_element" className="hidden" aria-hidden />;
}

export function TranslateButton({ className = "" }: { className?: string }) {
  const [tamil, setTamil] = useState(false);

  useEffect(() => {
    setTamil(getIsTamil());
  }, []);

  return (
    <button
      type="button"
      onClick={() => setLanguage(!tamil)}
      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-white/20 text-white/90 hover:text-gold hover:border-gold/50 ${className}`}
      aria-label={tamil ? "Switch to English" : "Translate to Tamil"}
    >
      <Languages size={16} />
      {tamil ? "English" : "தமிழ்"}
    </button>
  );
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          id: string,
        ) => void;
      };
    };
  }
}
