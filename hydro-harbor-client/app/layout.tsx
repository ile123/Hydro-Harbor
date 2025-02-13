import type { Metadata } from "next";
import "./globals.css";
import NavigationBar from "@/components/navigation-bar";
import { AppProvider } from "@/context/app-context";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata: Metadata = {
  title: "Hydro Harbor",
  description: "Best store for all of your diving needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <CookiesProvider>
            <NavigationBar />
            <main className="flex items-center justify-center h-screen">
              {children}
            </main>
          </CookiesProvider>
        </AppProvider>
      </body>
    </html>
  );
}
