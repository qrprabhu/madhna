import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { GoogleTranslateLoader } from "@/components/TranslateButton";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero text-white px-4">
      <div className="text-center">
        <h1 className="text-8xl font-display font-black text-gradient-gold">404</h1>
        <p className="mt-3 text-white/80">Page not found</p>
        <Link to="/" className="inline-block mt-6 btn-primary-gold px-6 py-3 rounded-full">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 btn-primary-gold px-6 py-3 rounded-full"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vanni Arasu MLA — Tindivanam | VCK" },
      { name: "description", content: "Official website of Vanni Arasu, MLA Tindivanam. Submit petitions, track progress, and witness public works." },
      { property: "og:title", content: "Vanni Arasu MLA — Voice of the People" },
      { property: "og:description", content: "Voice of the People, Strength of Tindivanam." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const loc = useLocation();
  const isAdmin = loc.pathname.startsWith("/admin") || loc.pathname.startsWith("/login");
  return (
    <QueryClientProvider client={queryClient}>
      {!isAdmin && <SiteHeader />}
      <main className={isAdmin ? "" : "min-h-screen"}>
        <Outlet />
      </main>
      {!isAdmin && <SiteFooter />}
      {!isAdmin && <MobileStickyCTA />}
      {!isAdmin && <GoogleTranslateLoader />}
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
