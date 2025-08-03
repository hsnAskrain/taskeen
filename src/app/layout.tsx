import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-context";
import { NavigationProvider } from "@/context/navigation-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "نظام ادارة التسكين - العتبة العسكرية المقدسة",
  description: "نظام ادارة التسكين بالعتبة العسكرية المقدسة - العراق",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('taskeen-ui-theme') || 'light';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const resolvedTheme = theme === 'system' ? systemTheme : theme;
                document.documentElement.classList.add(resolvedTheme);
                document.documentElement.style.colorScheme = resolvedTheme;
              } catch (e) {
                document.documentElement.classList.add('light');
                document.documentElement.style.colorScheme = 'light';
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <NavigationProvider>
            {children}
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}