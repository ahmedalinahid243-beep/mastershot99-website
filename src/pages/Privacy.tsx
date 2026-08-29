import PageHeader from "../components/layout/PageHeader";

const SECTIONS = [
  { title: "Information We Collect", body: "We may collect information you voluntarily provide, such as when you contact us, and standard technical data (like browser type and general location) collected automatically when you visit this website." },
  { title: "How We Use Information", body: "Information collected is used to operate and improve this website, respond to inquiries, and understand general visitor trends. We do not sell your personal information." },
  { title: "Third-Party Links", body: "This website links to third-party platforms, including Telegram, Facebook, TikTok, WhatsApp, and Quotex. We are not responsible for the privacy practices of these third parties — please review their own privacy policies." },
  { title: "Cookies", body: "This website may use basic cookies or similar technologies to support core functionality and understand site usage." },
  { title: "Data Security", body: "We take reasonable steps to protect information handled through this website, though no method of transmission over the internet is completely secure." },
  { title: "Your Choices", body: "You may choose not to provide certain information, though this may limit your ability to use some features of this website." },
  { title: "Changes to This Policy", body: "This Privacy Policy may be updated from time to time. Continued use of the website after changes indicates acceptance of the updated policy." },
];

export default function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
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
