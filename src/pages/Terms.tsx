import PageHeader from "../components/layout/PageHeader";

const SECTIONS = [
  { title: "Acceptance of Terms", body: "By accessing or using this website and joining the MasterShot99 Telegram community, you agree to these Terms & Conditions." },
  { title: "Use of Content", body: "Content on this website and in the Telegram channel is provided for informational and educational purposes only, as described in the Disclaimer." },
  { title: "No Financial Advice", body: "Nothing on this website or shared through the Telegram channel constitutes financial, investment, or trading advice. Consult a licensed professional for advice specific to your situation." },
  { title: "Third-Party Platforms", body: "Use of third-party platforms linked from this website, including Quotex, is subject to that platform's own terms and conditions, which you should review independently." },
  { title: "Intellectual Property", body: "The MasterShot99 name, logo, and original content on this website belong to MasterShot99 and may not be copied or reused without permission." },
  { title: "Limitation of Liability", body: "MasterShot99 is not liable for any losses, damages, or outcomes resulting from the use of this website, its content, or any linked third-party platform." },
  { title: "Changes to These Terms", body: "These Terms & Conditions may be updated periodically. Continued use of the website after changes indicates acceptance of the updated terms." },
];

export default function Terms() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" />
      <section className="section-pad mx-auto max-w-3xl px-5 sm:px-8 space-y-10">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-lg text-gold-bright">{s.title}</h2>
            <p className="mt-2 text-sm text-ink-dim leading-relaxed">{s.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
