import { AdminCard } from "../components/FormControls";
import { Images } from "lucide-react";

export default function ImageLibrary() {
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Image Library</h1>
      <p className="mt-1 text-sm text-ink-dim">A shared media library across Results, Events, and the Trader photo.</p>
      <div className="mt-6">
        <AdminCard title="Supabase Storage">
          <div className="flex flex-col items-center gap-3 py-10 text-ink-dim">
            <Images size={28} />
            <p className="text-sm text-center max-w-sm">
              This library will list every file uploaded through the Admin Panel once connected to Supabase
              Storage. For now, upload images directly from the Results, Events, Trader, and Brand sections.
            </p>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
