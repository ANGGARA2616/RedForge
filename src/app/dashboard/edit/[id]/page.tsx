"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getChatbotById, updateChatbot } from "@/app/actions/chatbot";
import { ArrowLeft, Bot, Palette, Type } from "lucide-react";

export default function EditChatbotPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [chatbot, setChatbot] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getChatbotById(id).then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setChatbot(res.chatbot);
        }
        setFetching(false);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await updateChatbot(id, formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  if (fetching) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface-dark)", color: "var(--text-primary)" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-grid" />
      <nav className="navbar scrolled">
        <div className="container">
          <Link href="/" className="navbar__logo">
            <div className="navbar__logo-icon">🔥</div>
            <span className="gradient-text">RedForge</span>
          </Link>
          <div className="navbar__actions">
            <Link href="/dashboard" className="btn btn--ghost">Kembali</Link>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: 120, paddingBottom: 60, position: "relative", zIndex: 1 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ marginBottom: 40 }}>
            <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", marginBottom: 16 }}>
              <ArrowLeft size={16} /> Kembali ke Dashboard
            </Link>
            <h1 className="section-title" style={{ marginBottom: 8, fontSize: "2.5rem" }}>
              Edit <span className="gradient-text">Chatbot AI</span>
            </h1>
            <p className="section-desc">Ubah pengaturan dan persona chatbot Anda.</p>
          </div>

          {error && (
            <div style={{ padding: "12px 16px", background: "rgba(248, 113, 113, 0.1)", border: "1px solid #F87171", borderRadius: "8px", color: "#F87171", marginBottom: 24 }}>
              {error}
            </div>
          )}

          {chatbot && (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Bagian 1: Info Dasar */}
              <div className="feature-card" style={{ padding: 32 }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: "1.2rem", fontWeight: 700 }}>
                  <Bot size={24} color="var(--accent)" /> Informasi Dasar
                </h3>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Nama Chatbot</label>
                  <input id="name" name="name" type="text" className="form-input" defaultValue={chatbot.name} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="websiteUrl">URL Website</label>
                  <input id="websiteUrl" name="websiteUrl" type="url" className="form-input" defaultValue={chatbot.websiteUrl} required />
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 6 }}>Mengubah URL tidak akan menghapus knowledge base sebelumnya.</p>
                </div>
              </div>

              {/* Bagian 2: Tampilan */}
              <div className="feature-card" style={{ padding: 32 }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: "1.2rem", fontWeight: 700 }}>
                  <Palette size={24} color="var(--primary-light)" /> Kustomisasi Tampilan
                </h3>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="brandColor">Warna Utama (Brand Color)</label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <input id="brandColor" name="brandColor" type="color" defaultValue={chatbot.brandColor} style={{ width: 48, height: 48, padding: 0, border: "none", borderRadius: 8, cursor: "pointer", background: "transparent" }} />
                    <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Pilih warna yang sesuai dengan tema website Anda</span>
                  </div>
                </div>
              </div>

              {/* Bagian 3: Persona AI */}
              <div className="feature-card" style={{ padding: 32 }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: "1.2rem", fontWeight: 700 }}>
                  <Type size={24} color="#F472B6" /> Kepribadian AI
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="aiPersona">Karakter / Persona</label>
                    <select id="aiPersona" name="aiPersona" className="form-input" style={{ appearance: "auto" }} defaultValue={chatbot.aiPersona}>
                      <option value="friendly">Ramah & Membantu</option>
                      <option value="professional">Profesional & Formal</option>
                      <option value="energetic">Ceria & Energetik</option>
                      <option value="humorous">Humoris & Santai</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="aiLanguageStyle">Gaya Bahasa</label>
                    <select id="aiLanguageStyle" name="aiLanguageStyle" className="form-input" style={{ appearance: "auto" }} defaultValue={chatbot.aiLanguageStyle}>
                      <option value="standard">Bahasa Baku</option>
                      <option value="casual">Bahasa Santai / Gaul</option>
                      <option value="persuasive">Bahasa Sales / Persuasif</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 16 }}>
                <Link href="/dashboard" className="btn btn--outline btn--large">Batal</Link>
                <button type="submit" className="btn btn--primary btn--large" disabled={loading}>
                  {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
