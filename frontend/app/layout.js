import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/custom.css";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import Footer from "../components/Footer";
import ThemeTransition from "../components/ThemeTransition";
// import ClientScript from "../components/ClientScript"; // Temporarily disabled to fix hydration issues
// import PageTransition from "../components/PageTransition"; // Temporarily disabled to fix hydration issues

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FytrLance",
  description: "A collaborative platform where talent meets opportunity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <UserProvider>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <ThemeTransition />
                {/* <ClientScript /> Temporarily disabled to fix hydration issues */}
                <div className="flex-grow">
                  {children}
                </div>
                <Footer />
              </div>
            </AuthProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
