import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import ResultsPage from "./pages/Results";
import HowToJoin from "./pages/HowToJoin";
import QuotexGuide from "./pages/QuotexGuide";
import Events from "./pages/Events";
import FAQPage from "./pages/FAQPage";
import Disclaimer from "./pages/Disclaimer";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

import { AdminAuthProvider } from "./admin/AdminAuth";
import AdminLogin from "./admin/AdminLogin";
import RequireAdminAuth from "./admin/RequireAdminAuth";
import AdminDashboard from "./admin/AdminDashboard";
import HeroEditor from "./admin/sections/HeroEditor";
import BrandEditor from "./admin/sections/BrandEditor";
import TraderEditor from "./admin/sections/TraderEditor";
import TelegramEditor from "./admin/sections/TelegramEditor";
import SocialEditor from "./admin/sections/SocialEditor";
import QuotexEditor from "./admin/sections/QuotexEditor";
import ResultsManager from "./admin/sections/ResultsManager";
import VideoEditor from "./admin/sections/VideoEditor";
import EventsManager from "./admin/sections/EventsManager";
import AnnouncementsManager from "./admin/sections/AnnouncementsManager";
import FAQEditor from "./admin/sections/FAQEditor";
import DisclaimerEditor from "./admin/sections/DisclaimerEditor";
import TranslationsEditor from "./admin/sections/TranslationsEditor";
import SEOEditor from "./admin/sections/SEOEditor";
import ImageLibrary from "./admin/sections/ImageLibrary";
import SettingsPage from "./admin/sections/SettingsPage";

function PublicRoutes() {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/how-to-join" element={<HowToJoin />} />
        <Route path="/quotex-guide" element={<QuotexGuide />} />
        <Route path="/events" element={<Events />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PublicLayout>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAdminAuth><AdminDashboard /></RequireAdminAuth>} />
        <Route path="/admin/hero" element={<RequireAdminAuth><HeroEditor /></RequireAdminAuth>} />
        <Route path="/admin/brand" element={<RequireAdminAuth><BrandEditor /></RequireAdminAuth>} />
        <Route path="/admin/trader" element={<RequireAdminAuth><TraderEditor /></RequireAdminAuth>} />
        <Route path="/admin/telegram" element={<RequireAdminAuth><TelegramEditor /></RequireAdminAuth>} />
        <Route path="/admin/social" element={<RequireAdminAuth><SocialEditor /></RequireAdminAuth>} />
        <Route path="/admin/quotex" element={<RequireAdminAuth><QuotexEditor /></RequireAdminAuth>} />
        <Route path="/admin/results" element={<RequireAdminAuth><ResultsManager /></RequireAdminAuth>} />
        <Route path="/admin/videos" element={<RequireAdminAuth><VideoEditor /></RequireAdminAuth>} />
        <Route path="/admin/events" element={<RequireAdminAuth><EventsManager /></RequireAdminAuth>} />
        <Route path="/admin/announcements" element={<RequireAdminAuth><AnnouncementsManager /></RequireAdminAuth>} />
        <Route path="/admin/faq" element={<RequireAdminAuth><FAQEditor /></RequireAdminAuth>} />
        <Route path="/admin/disclaimer" element={<RequireAdminAuth><DisclaimerEditor /></RequireAdminAuth>} />
        <Route path="/admin/translations" element={<RequireAdminAuth><TranslationsEditor /></RequireAdminAuth>} />
        <Route path="/admin/seo" element={<RequireAdminAuth><SEOEditor /></RequireAdminAuth>} />
        <Route path="/admin/images" element={<RequireAdminAuth><ImageLibrary /></RequireAdminAuth>} />
        <Route path="/admin/settings" element={<RequireAdminAuth><SettingsPage /></RequireAdminAuth>} />
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </AdminAuthProvider>
  );
}
