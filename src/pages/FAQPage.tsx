import PageHeader from "../components/layout/PageHeader";
import { FaqAccordion } from "../components/home/FaqSection";

export default function FAQPage() {
  return (
    <>
      <PageHeader eyebrow="Support" title="Frequently Asked Questions" />
      <section className="section-pad mx-auto max-w-7xl px-5 sm:px-8">
        <FaqAccordion />
      </section>
    </>
  );
}
