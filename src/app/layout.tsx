import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "flag-icons/css/flag-icons.min.css";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Hasta Formu | Dr. Ömer Parıldar",
  description: "Estetik ve plastik cerrahi hasta bilgi formu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${sans.variable} ${serif.variable} h-full overflow-x-clip`}
    >
      <body className="min-h-full max-w-full overflow-x-clip font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
