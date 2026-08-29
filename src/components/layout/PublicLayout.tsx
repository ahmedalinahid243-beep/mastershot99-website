import type { ReactNode } from "react";
import AnnouncementTicker from "./AnnouncementTicker";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementTicker />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
