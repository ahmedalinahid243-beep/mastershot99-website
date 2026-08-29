import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import Reveal from "../ui/Reveal";

export default function DisclaimerPreview() {
  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-8 py-14">
      <Reveal>
        <div className="rounded-2xl border border-line-strong bg-charcoal p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4">
          <ShieldAlert className="text-gold-bright shrink-0" size={22} />
          <div>
            <h3 className="font-display text-ink">Risk Disclaimer</h3>
            <p className="mt-2 text-sm text-ink-dim leading-relaxed">
              Trading involves substantial risk and is not suitable for everyone. Content shared by MasterShot99
              is for educational and informational purposes only and does not guarantee any specific outcome.
              Past performance does not indicate future results.
            </p>
            <Link to="/disclaimer" className="mt-3 inline-block text-sm text-gold-bright hover:underline">
              Read full disclaimer →
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
