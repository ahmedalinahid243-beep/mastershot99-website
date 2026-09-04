import type { ReactNode } from "react";
import AnnouncementTicker from "./AnnouncementTicker";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SplashScreen from "./SplashScreen";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SplashScreen />
      <AnnouncementTicker />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
