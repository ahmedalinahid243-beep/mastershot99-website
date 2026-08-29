import { useRef, useState } from "react";
import { useContent } from "../../store/ContentContext";
import { AdminCard, Field, TextInput, TextArea, ToggleRow, SaveBar } from "../components/FormControls";
import { Upload, PlayCircle } from "lucide-react";

export default function VideoEditor() {
  const { content, setContent } = useContent();
  const [saved, setSaved] = useState(false);
  const videoRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof typeof content.video>(key: K, value: (typeof content.video)[K]) {
    setContent((prev) => ({ ...prev, video: { ...prev.video, [key]: value } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Tutorial Video</h1>
      <p className="mt-1 text-sm text-ink-dim">The Quotex account walkthrough video.</p>
      <div className="mt-6">
        <AdminCard title="Video">
          <div className="flex items-center gap-4">
            <div className="h-16 w-24 rounded-lg border border-line bg-void flex items-center justify-center overflow-hidden">
              {content.video.thumbnailUrl ? <img src={content.video.thumbnailUrl} className="h-full w-full object-cover" /> : <PlayCircle size={18} className="text-ink-dim" />}
            </div>
            <div className="flex gap-2">
              <button onClick={() => videoRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2 text-xs text-ink hover:border-gold-dim hover:text-gold-bright">
                <Upload size={13} /> Upload Video
              </button>
              <button onClick={() => thumbRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2 text-xs text-ink hover:border-gold-dim hover:text-gold-bright">
                <Upload size={13} /> Upload Thumbnail
              </button>
              <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) update("videoUrl", URL.createObjectURL(f)); }} />
              <input ref={thumbRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) update("thumbnailUrl", URL.createObjectURL(f)); }} />
            </div>
          </div>
          <Field label="Title"><TextInput value={content.video.title} onChange={(e) => update("title", e.target.value)} /></Field>
          <Field label="Description"><TextArea value={content.video.description} onChange={(e) => update("description", e.target.value)} rows={3} /></Field>
          <ToggleRow label="Published" checked={content.video.published} onChange={(v) => update("published", v)} />
          <SaveBar saved={saved} />
        </AdminCard>
      </div>
    </div>
  );
}
