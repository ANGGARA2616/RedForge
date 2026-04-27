"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createChatbot } from "@/app/actions/chatbot";
import { ArrowLeft, Bot, Palette, Type, Database } from "lucide-react";

export default function CreateChatbotPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showApi, setShowApi] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await createChatbot(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

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
              Buat <span className="gradient-text">Chatbot AI</span>
            </h1>
            <p className="section-desc">Atur identitas dan persona chatbot untuk website Anda.</p>
          </div>

          {error && (
            <div style={{ padding: "12px 16px", background: "rgba(248, 113, 113, 0.1)", border: "1px solid #F87171", borderRadius: "8px", color: "#F87171", marginBottom: 24 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Bagian 1: Info Dasar */}
            <div className="feature-card" style={{ padding: 32 }}>
              <h3 style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: "1.2rem", fontWeight: 700 }}>
                <Bot size={24} color="var(--accent)" /> Informasi Dasar
              </h3>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Nama Chatbot</label>
                <input id="name" name="name" type="text" className="form-input" placeholder="Contoh: Asisten TokoBaju" required />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="websiteUrl">URL Website</label>
                <input id="websiteUrl" name="websiteUrl" type="url" className="form-input" placeholder="https://www.tokobaju.com" required />
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 6 }}>AI akan mempelajari konten dari website ini secara otomatis.</p>
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
                  <input id="brandColor" name="brandColor" type="color" defaultValue="#7C3AED" style={{ width: 48, height: 48, padding: 0, border: "none", borderRadius: 8, cursor: "pointer", background: "transparent" }} />
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
                  <select id="aiPersona" name="aiPersona" className="form-input" style={{ appearance: "auto" }}>
                    <option value="friendly">Ramah & Membantu (Default)</option>
                    <option value="professional">Profesional & Formal</option>
                    <option value="energetic">Ceria & Energetik</option>
                    <option value="humorous">Humoris & Santai</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="aiLanguageStyle">Gaya Bahasa</label>
                  <select id="aiLanguageStyle" name="aiLanguageStyle" className="form-input" style={{ appearance: "auto" }}>
                    <option value="standard">Bahasa Baku (Default)</option>
                    <option value="casual">Bahasa Santai / Gaul</option>
                    <option value="persuasive">Bahasa Sales / Persuasif</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bagian 4: Custom API (Opsional, Collapsible) */}
            <div className="feature-card" style={{ padding: 32 }}>
              <button
                type="button"
                onClick={() => setShowApi(!showApi)}
                style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "var(--text-primary)", fontSize: "1.2rem", fontWeight: 700, cursor: "pointer", padding: 0, width: "100%" }}
              >
                <Database size={24} color="#06B6D4" />
                Integrasi Data Real-Time
                <span style={{ marginLeft: "auto", fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 400, background: "rgba(6,182,212,0.1)", padding: "4px 10px", borderRadius: 20 }}>Opsional</span>
              </button>

              {showApi && (
                <div style={{ marginTop: 20 }}>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 20, lineHeight: 1.6 }}>
                    Hubungkan chatbot ke API website Anda agar bisa mengakses data terbaru seperti stok produk, harga, atau ketersediaan. Anda bisa mengatur ini nanti melalui menu Edit.
                  </p>
                  <div className="form-group">
                    <label className="form-label" htmlFor="customApiUrl">URL API Endpoint</label>
                    <input id="customApiUrl" name="customApiUrl" type="url" className="form-input" placeholder="https://website-anda.com/api/redforge/data" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="customApiKey">API Key (jika ada)</label>
                    <input id="customApiKey" name="customApiKey" type="password" className="form-input" placeholder="Opsional — untuk keamanan API Anda" />
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 16 }}>
              <Link href="/dashboard" className="btn btn--outline btn--large">Batal</Link>
              <button type="submit" className="btn btn--primary btn--large" disabled={loading}>
                {loading ? "Menyimpan..." : "Buat Chatbot"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
