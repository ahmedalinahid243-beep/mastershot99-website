import { useRef, useState } from "react";
import { useContent } from "../../store/ContentContext";
import { AdminCard, Field, TextInput, TextArea, ToggleRow, SaveBar } from "../components/FormControls";
import { Upload, PlayCircle } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export default function VideoEditor() {
  const { content, setContent } = useContent();
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const videoRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof typeof content.video>(key: K, value: (typeof content.video)[K]) {
    setContent((prev) => ({ ...prev, video: { ...prev.video, [key]: value } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  async function uploadFile(file: File, folder: string) {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "application/octet-stream",
    });
    if (error) {
      console.error("Upload failed:", error.message);
      alert("Upload failed: " + error.message);
      return null;
    }
    const { data } = supabase.storage.from("site-images").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    const url = await uploadFile(f, "videos");
    if (url) update("videoUrl", url);
    setUploading(false);
  }

  async function handleThumbChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    const url = await uploadFile(f, "thumbnails");
    if (url) update("thumbnailUrl", url);
    setUploading(false);
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
              <button disabled={uploading} onClick={() => videoRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2 text-xs text-ink hover:border-gold-dim hover:text-gold-bright">
                <Upload size={13} /> {uploading ? "Uploading..." : "Upload Video"}
              </button>
              <button disabled={uploading} onClick={() => thumbRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-3 py-2 text-xs text-ink hover:border-gold-dim hover:text-gold-bright">
                <Upload size={13} /> {uploading ? "Uploading..." : "Upload Thumbnail"}
              </button>
              <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
              <input ref={thumbRef} type="file" accept="image/*" className="hidden" onChange={handleThumbChange} />
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
