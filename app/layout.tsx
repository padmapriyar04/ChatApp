import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import TopNavbar from "@/components/Navbar/TopNavbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <ToastContainer
            hideProgressBar
            className="z-50"
            position="top-center"
          />
          <TopNavbar />
          <main className="container mx-auto p-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
