import PageHeader from "../components/layout/PageHeader";
import QuotexSection from "../components/home/QuotexSection";
import TutorialVideo from "../components/home/TutorialVideo";

export default function QuotexGuide() {
  return (
    <>
      <PageHeader
        eyebrow="Broker Setup"
        title="Quotex Account Guide"
        description="Everything you need to create a Quotex account, in one place."
      />
      <QuotexSection />
      <TutorialVideo />
    </>
  );
}
