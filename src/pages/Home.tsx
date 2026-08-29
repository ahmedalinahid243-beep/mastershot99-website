import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import TraderProfile from "../components/home/TraderProfile";
import HowItWorks from "../components/home/HowItWorks";
import Features from "../components/home/Features";
import Results from "../components/home/Results";
import TelegramCTA from "../components/home/TelegramCTA";
import QuotexSection from "../components/home/QuotexSection";
import TutorialVideo from "../components/home/TutorialVideo";
import EventsPreview from "../components/home/EventsPreview";
import FaqSection from "../components/home/FaqSection";
import DisclaimerPreview from "../components/home/DisclaimerPreview";
import FinalCTA from "../components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <TraderProfile />
      <HowItWorks />
      <Features />
      <Results />
      <TelegramCTA />
      <QuotexSection />
      <TutorialVideo />
      <EventsPreview />
      <FaqSection />
      <DisclaimerPreview />
      <FinalCTA />
    </>
  );
}
