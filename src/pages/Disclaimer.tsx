import PageHeader from "../components/layout/PageHeader";
import { useContent } from "../store/ContentContext";

const SECTIONS = [
  {
    title: "General Disclaimer",
    body: "The information provided on this website and through the MasterShot99 Telegram channel is for general informational and educational purposes only. It does not constitute financial, investment, or trading advice, and should not be treated as such.",
  },
  {
    title: "Trading Risk",
    body: "Trading in financial markets, including binary options, carries a high level of risk and may not be suitable for all individuals. You could lose some or all of your invested capital. Only trade with funds you can afford to lose.",
  },
  {
    title: "No Guarantee of Profit",
    body: "MasterShot99 does not guarantee any specific outcome, profit, or win rate. No signal, update, or piece of content shared should be interpreted as a promise of financial gain.",
  },
  {
    title: "Past Performance",
    body: "Any past performance discussed or implied is not indicative of future results. Market conditions change, and previous outcomes do not guarantee similar results going forward.",
  },
  {
    title: "Educational / Informational Purpose",
    body: "All content, signals, and updates are shared for educational and informational purposes to support your own independent analysis — not as instructions to be followed without your own judgment.",
  },
  {
    title: "User Responsibility",
    body: "You are solely responsible for your own trading decisions. Always conduct your own research, verify information independently, and consider consulting a licensed financial advisor before trading.",
  },
  {
    title: "Third-Party Platforms",
    body: "MasterShot99 is not affiliated with, endorsed by, or responsible for any third-party broker or platform. Review the terms, conditions, and risks of any third-party platform before creating an account or trading.",
  },
  {
    title: "Referral Disclosure",
    body: "Some links on this website, including the Quotex account link, are referral links. MasterShot99 may receive a benefit if you sign up through these links. This does not affect your terms with the platform, and you are not obligated to use them.",
  },
  {
    title: "Risk Management",
    body: "Never trade with money you cannot afford to lose. Use proper risk management, set clear limits, and avoid trading based on emotion or pressure to \"catch up\" on losses.",
  },
];

export default function Disclaimer() {
  const { content } = useContent();
  return (
    <>
      <PageHeader
        eyebrow="Please Read"
        title="Disclaimer"
        description="Please read this page carefully before using MasterShot99 or any linked third-party platform."
      />
      <section className="section-pad mx-auto max-w-3xl px-5 sm:px-8">
        <div className="space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-lg text-gold-bright">{s.title}</h2>
              <p className="mt-2 text-sm text-ink-dim leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-xs text-ink-dim border-t border-line pt-6">
          Last reviewed alongside the {content.settings.brandName} website. If you have questions about this
          disclaimer, please contact us via the details on the Contact page.
        </p>
      </section>
    </>
  );
}
